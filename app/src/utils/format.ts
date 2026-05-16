export function formatCount(count: number, singular: string): string {
  return `${count} ${singular}${count > 1 ? "s" : ""}`;
}

export function formatDateTime(value: string): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function escapeAttribute(value: unknown): string {
  return escapeHtml(value);
}

export function normalizeExternalHttpUrl(value: unknown): string | null {
  const urlText = String(value ?? "").trim();
  if (!urlText) return null;

  try {
    const url = new URL(urlText);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export function normalizeRelativeAssetUrl(value: unknown): string | null {
  const pathText = String(value ?? "").trim();
  if (!pathText || pathText.startsWith("//") || pathText.includes("\0")) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(pathText)) return null;

  const normalized = pathText.replace(/^\.?\//, "");
  if (!normalized || normalized.startsWith("../") || normalized.includes("/../")) return null;

  return normalized;
}
