#!/usr/bin/env node

import { execFile } from "node:child_process";
import { mkdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const datasetPath = resolve(repoRoot, "data/references_seed.json");
const imageDir = resolve(repoRoot, "public/images/references");
const publicImagePrefix = "images/references";
const commonsHost = "commons.wikimedia.org";
const userAgent = "AmbianceIndexImageImporter/0.1 (local repository asset import)";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");
const checkOnly = args.has("--check");
const limit = getNumberArg("--limit");
const delayMs = getNumberArg("--delay-ms") ?? 700;
const timeoutMs = getNumberArg("--timeout-ms") ?? 20_000;
const execFileAsync = promisify(execFile);

function getNumberArg(name) {
  const prefix = `${name}=`;
  const value = process.argv.slice(2).find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`Invalid ${name}: ${value}`);
  }
  return parsed;
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function isCommonsSource(sourceUrl) {
  try {
    return new URL(sourceUrl).hostname === commonsHost;
  } catch {
    return false;
  }
}

function getImageExtensionFromUrl(imageUrl) {
  try {
    const extension = extname(new URL(imageUrl).pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(extension)) {
      return extension === ".jpeg" ? ".jpg" : extension;
    }
  } catch {
    // Fall through to the current default.
  }

  return ".jpg";
}

function makeSafeFileName(referenceId, extension) {
  const safeId = referenceId
    .normalize("NFKD")
    .replace(/[^\w-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${safeId || "reference"}${extension}`;
}

async function fileExists(path) {
  try {
    const fileStat = await stat(path);
    return fileStat.isFile() && fileStat.size > 0;
  } catch {
    return false;
  }
}

async function removeFile(path) {
  try {
    await unlink(path);
  } catch {
    // Missing temporary files are harmless.
  }
}

async function downloadImage(url, outputPath) {
  const temporaryPath = `${outputPath}.download`;
  await removeFile(temporaryPath);

  try {
    await execFileAsync(
      "curl",
      [
        "-fL",
        "-sS",
        "--connect-timeout",
        "10",
        "--max-time",
        String(Math.ceil(timeoutMs / 1000)),
        "-A",
        userAgent,
        "-H",
        "Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "-o",
        temporaryPath,
        url
      ],
      { maxBuffer: 1024 * 1024 }
    );

    const imageStat = await stat(temporaryPath);
    if (!imageStat.isFile() || imageStat.size === 0) {
      throw new Error("Downloaded file is empty");
    }

    await rename(temporaryPath, outputPath);
  } catch (error) {
    await removeFile(temporaryPath);
    const stderr = typeof error === "object" && error && "stderr" in error ? String(error.stderr).trim() : "";
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(stderr || message);
  }
}

async function main() {
  const dataset = JSON.parse(await readFile(datasetPath, "utf8"));
  const commonsReferences = dataset.references.filter((reference) =>
    isCommonsSource(reference.image?.source_url)
  );
  const selectedReferences = typeof limit === "number" ? commonsReferences.slice(0, limit) : commonsReferences;

  const report = {
    totalReferences: dataset.references.length,
    commonsReferences: commonsReferences.length,
    selectedReferences: selectedReferences.length,
    downloaded: 0,
    skippedExisting: 0,
    updatedMetadata: 0,
    failed: []
  };

  if (!dryRun && !checkOnly) {
    await mkdir(imageDir, { recursive: true });
  }

  for (const reference of selectedReferences) {
    const imageUrl = reference.image?.url;
    if (!imageUrl) continue;

    let extension = getImageExtensionFromUrl(imageUrl);
    let fileName = makeSafeFileName(reference.id, extension);
    let outputPath = join(imageDir, fileName);
    const localUrl = `${publicImagePrefix}/${fileName}`;

    try {
      const hasExistingLocal = reference.image.local_url && (await fileExists(resolve(repoRoot, "public", reference.image.local_url)));
      if (checkOnly) {
        if (!hasExistingLocal) {
          report.failed.push({ id: reference.id, name: reference.name, reason: "Missing local file" });
        }
        continue;
      }

      if (hasExistingLocal && !force) {
        report.skippedExisting += 1;
        continue;
      }

      if (!force && (await fileExists(outputPath))) {
        reference.image.local_url = localUrl;
        report.skippedExisting += 1;
        report.updatedMetadata += 1;
        continue;
      }

      if (dryRun) {
        report.updatedMetadata += reference.image.local_url === localUrl ? 0 : 1;
        continue;
      }

      extension = getImageExtensionFromUrl(imageUrl);
      fileName = makeSafeFileName(reference.id, extension);
      outputPath = join(imageDir, fileName);
      const finalLocalUrl = `${publicImagePrefix}/${fileName}`;

      if (!force && (await fileExists(outputPath))) {
        report.skippedExisting += 1;
      } else {
        await downloadImage(imageUrl, outputPath);
        report.downloaded += 1;
      }

      if (reference.image.local_url !== finalLocalUrl) {
        reference.image.local_url = finalLocalUrl;
        report.updatedMetadata += 1;
      }
    } catch (error) {
      report.failed.push({
        id: reference.id,
        name: reference.name,
        url: imageUrl,
        reason: error instanceof Error ? error.message : String(error)
      });
    }

    if (!dryRun && !checkOnly) {
      await sleep(delayMs);
    }
  }

  if (!dryRun && !checkOnly) {
    await writeFile(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`);
  }

  console.log(JSON.stringify(report, null, 2));

  if (report.failed.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
