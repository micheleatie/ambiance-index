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
