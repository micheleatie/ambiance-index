#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const datasetPath = resolve(repoRoot, "data/references_seed.json");
const commonsHost = "commons.wikimedia.org";
const userAgent = "AmbianceIndexRightsAudit/0.1 (local repository rights audit)";

const args = new Set(process.argv.slice(2));
const writeMetadata = args.has("--write-metadata");

function sanitizeText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCommonsTitle(sourceUrl) {
  const url = new URL(sourceUrl);
  if (url.hostname !== commonsHost) return null;

  const title = decodeURIComponent(url.pathname.replace(/^\/wiki\//, ""));
  return title ? title.replace(/_/g, " ") : null;
}

function normalizeLicenseUrl(value) {
  const licenseUrl = String(value || "").trim();
  if (licenseUrl.startsWith("http://creativecommons.org/")) {
    return licenseUrl.replace("http://", "https://");
  }
  return licenseUrl;
}

function classifyNonCommonsImage(reference) {
  const sourceUrl = reference.image?.source_url || "";
  let host = "";
  try {
    host = new URL(sourceUrl).hostname;
  } catch {
    host = "";
  }

  if (host === "whc.unesco.org") {
    return {
      id: reference.id,
      name: reference.name,
      host,
      status: "limited-license",
      license: "UNESCO WHC license 19 (BY-NC-ND)",
      license_url: "https://whc.unesco.org/en/licenses/19/",
      author: "Oliver Martin-Gambier",
      issue: "Usage limité par les conditions UNESCO World Heritage Centre : attribution, usage non commercial et pas de dérivés.",
      action: "Conserver le fichier exact et son attribution pour le site pédagogique non commercial actuel ; remplacer si le projet devient commercial ou nécessite des images modifiées."
    };
  }

  return {
    id: reference.id,
    name: reference.name,
    host,
    status: "needs-permission",
    issue: "Aucune licence ouverte de réutilisation large n'est enregistrée dans les données pour cette source.",
    action: "Ne pas afficher avant obtention d'une autorisation écrite ou d'une image de remplacement sous licence ouverte."
  };
}

async function fetchCommonsMetadata(references) {
  const commonsReferences = references
    .map((reference) => ({
      reference,
      title: parseCommonsTitle(reference.image?.source_url || "")
    }))
    .filter((entry) => entry.title);

  const metadata = new Map();
  for (let index = 0; index < commonsReferences.length; index += 50) {
    const chunk = commonsReferences.slice(index, index + 50);
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      prop: "imageinfo",
      iiprop: "extmetadata|url",
      titles: chunk.map((entry) => entry.title).join("|")
    });

    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`, {
      headers: { "Api-User-Agent": userAgent }
    });

    if (!response.ok) {
      throw new Error(`Commons API request failed with HTTP ${response.status}`);
    }

    const payload = await response.json();
    for (const page of Object.values(payload.query?.pages || {})) {
      const entry = chunk.find((item) => item.title === page.title);
      if (!entry) continue;

      const extmetadata = page.imageinfo?.[0]?.extmetadata || {};
      metadata.set(entry.reference.id, {
        title: page.title,
        missing: Boolean(page.missing),
        license: sanitizeText(extmetadata.LicenseShortName?.value),
        license_url: normalizeLicenseUrl(extmetadata.LicenseUrl?.value),
        usage_terms: sanitizeText(extmetadata.UsageTerms?.value),
        attribution_required: /^true$/i.test(sanitizeText(extmetadata.AttributionRequired?.value)),
        author: sanitizeText(extmetadata.Artist?.value),
        credit_line: sanitizeText(extmetadata.Credit?.value),
        restrictions: sanitizeText(extmetadata.Restrictions?.value)
      });
    }
  }

  return metadata;
}

function applyRightsMetadata(reference, commonsRecord) {
  if (!reference.image) return;

  if (commonsRecord) {
    reference.image.rights_status = "open-license";
    if (commonsRecord.author) {
      reference.image.author = commonsRecord.author;
    } else {
      delete reference.image.author;
      reference.image.rights_note = "Auteur non renseigné dans les métadonnées Commons ; vérifier la page source avant réutilisation avancée.";
    }

    if (commonsRecord.license) reference.image.license = commonsRecord.license;
    if (commonsRecord.license_url) reference.image.license_url = commonsRecord.license_url;
    return;
  }

  const nonCommons = classifyNonCommonsImage(reference);
  reference.image.rights_status = nonCommons.status;
  reference.image.rights_note = nonCommons.issue;

  if (nonCommons.author) reference.image.author = nonCommons.author;
  if (nonCommons.license) reference.image.license = nonCommons.license;
  if (nonCommons.license_url) reference.image.license_url = nonCommons.license_url;
}

async function main() {
  const dataset = JSON.parse(await readFile(datasetPath, "utf8"));
  const commonsMetadata = await fetchCommonsMetadata(dataset.references);
  const commonsRecords = [];
  const nonCommonsRecords = [];

  for (const reference of dataset.references) {
    const commonsRecord = commonsMetadata.get(reference.id);
    if (commonsRecord) {
      commonsRecords.push({
        id: reference.id,
        name: reference.name,
        source_url: reference.image?.source_url,
        ...commonsRecord
      });
    } else if (reference.image) {
      nonCommonsRecords.push(classifyNonCommonsImage(reference));
    }

    if (writeMetadata) {
      applyRightsMetadata(reference, commonsRecord);
    }
  }

  const byLicense = commonsRecords.reduce((summary, record) => {
    const license = record.license || "UNKNOWN";
    summary[license] = (summary[license] || 0) + 1;
    return summary;
  }, {});

  const report = {
    totalReferences: dataset.references.length,
    commons: {
      count: commonsRecords.length,
      byLicense,
      problematic: commonsRecords.filter(
        (record) => record.missing || !record.license || /non.?free|fair use|copyrighted/i.test(`${record.license} ${record.usage_terms}`)
      ),
      attributionRequired: commonsRecords.filter((record) => record.attribution_required).length,
      missingAuthor: commonsRecords.filter((record) => record.attribution_required && !record.author)
    },
    nonCommons: {
      count: nonCommonsRecords.length,
      records: nonCommonsRecords
    }
  };

  if (writeMetadata) {
    await writeFile(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`);
  }

  console.log(JSON.stringify(report, null, 2));

  if (report.commons.problematic.length || nonCommonsRecords.some((record) => record.status === "needs-permission")) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
