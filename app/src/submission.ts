import {
  ANNOTATION_FIELD_LIMITS,
  ANNOTATION_MIN_NOTE_LENGTH,
  ANNOTATION_RATE_LIMIT,
  ANNOTATION_SUBMISSION_ENDPOINT,
  SUBMISSION_CLIENT_ID_STORAGE_KEY,
  SUBMISSION_LOG_STORAGE_KEY
} from "./constants";
import type {
  AnnotationSubmissionPayload,
  ReferenceRecord,
  RubricMeta,
  SubmissionRateStatus
} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMISSION_TIMEOUT_MS = 15000;

export function createAnnotationSubmissionPayload(
  reference: ReferenceRecord,
  data: FormData,
  rubric: RubricMeta
): AnnotationSubmissionPayload {
  return {
    reference_id: reference.id,
    reference_name: reference.name,
    reference_architect_or_period: reference.architect_or_period,
    reference_location: reference.location,
    reference_year: reference.year,
    rubric_id: rubric.id,
    rubric_label: rubric.label,
    family_id: rubric.familyId,
    family_label: rubric.familyLabel,
    action: cleanFormValue(data, "action"),
    confidence: cleanFormValue(data, "confidence"),
    author_name: cleanFormValue(data, "expert_name"),
    author_role: cleanFormValue(data, "expert_role"),
    author_organization: cleanFormValue(data, "expert_organization"),
    contact_email: cleanFormValue(data, "contact_email"),
    note: cleanFormValue(data, "note"),
    source: cleanFormValue(data, "source"),
    page_url: window.location.href,
    consent_publish: data.get("consent_publish") ? "yes" : "",
    honeypot: cleanFormValue(data, "honeypot"),
    user_agent: navigator.userAgent,
    client_id: getOrCreateSubmissionClientId()
  };
}

export function validateAnnotationSuggestion(data: FormData): string | null {
  const expertName = cleanFormValue(data, "expert_name");
  const expertRole = cleanFormValue(data, "expert_role");
  const rubricId = cleanFormValue(data, "rubric_id");
  const note = cleanFormValue(data, "note");
  const email = cleanFormValue(data, "contact_email");

  if (!expertName || !expertRole || !rubricId || !note) {
    return "Nom, fonction, rubrique et note obligatoires.";
  }
  if (note.length < ANNOTATION_MIN_NOTE_LENGTH) {
    return `Note trop courte : ${ANNOTATION_MIN_NOTE_LENGTH} caractères minimum.`;
  }
  if (note.length > ANNOTATION_FIELD_LIMITS.note) {
    return `Note trop longue : ${ANNOTATION_FIELD_LIMITS.note} caractères maximum.`;
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    return "Email de contact invalide.";
  }
  if (!data.get("consent_publish")) {
    return "Accord de publication obligatoire pour soumettre.";
  }
  return null;
}

export function validateLocalAnnotationDraft(data: FormData): string | null {
  const expertName = cleanFormValue(data, "expert_name");
  const expertRole = cleanFormValue(data, "expert_role");
  const rubricId = cleanFormValue(data, "rubric_id");
  const note = cleanFormValue(data, "note");

  if (!expertName || !expertRole || !rubricId || !note) {
    return "Nom, fonction, rubrique et note obligatoires.";
  }
  if (note.length > ANNOTATION_FIELD_LIMITS.note) {
    return `Note trop longue : ${ANNOTATION_FIELD_LIMITS.note} caractères maximum.`;
  }
  return null;
}

export function getSubmissionRateStatus(now = Date.now()): SubmissionRateStatus {
  const recentTimestamps = getRecentSubmissionTimestamps(now);
  const oldest = recentTimestamps[0] ?? now;
  const retryAfterMs = Math.max(0, ANNOTATION_RATE_LIMIT.windowMs - (now - oldest));
  const remaining = Math.max(0, ANNOTATION_RATE_LIMIT.maxSubmissions - recentTimestamps.length);

  return {
    allowed: recentTimestamps.length < ANNOTATION_RATE_LIMIT.maxSubmissions,
    remaining,
    retryAfterMs
  };
}

export function recordSubmissionTimestamp(now = Date.now()): void {
  try {
    const timestamps = [...getRecentSubmissionTimestamps(now), now];
    localStorage.setItem(SUBMISSION_LOG_STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    // If storage is unavailable, keep the submission flow usable.
  }
}

export function formatRetryAfter(ms: number): string {
  const minutes = Math.max(1, Math.ceil(ms / 60000));
  return `${minutes} min`;
}

export async function submitAnnotationSuggestion(
  payload: AnnotationSubmissionPayload
): Promise<void> {
  if (!ANNOTATION_SUBMISSION_ENDPOINT) {
    throw new Error("Aucun point d'envoi configuré.");
  }

  await submitWithHiddenIframe(ANNOTATION_SUBMISSION_ENDPOINT, payload);
}

function submitWithHiddenIframe(
  endpoint: string,
  payload: AnnotationSubmissionPayload
): Promise<void> {
  return new Promise((resolve, reject) => {
    const id = `annotation-submission-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    const form = document.createElement("form");
    let submitted = false;
    let settled = false;

    const cleanup = (): void => {
      window.clearTimeout(timeout);
      form.remove();
      iframe.remove();
    };
    const settle = (callback: () => void): void => {
      if (settled) return;
      settled = true;
      cleanup();
      callback();
    };

    const timeout = window.setTimeout(() => {
      settle(() => reject(new Error("Délai d'envoi dépassé.")));
    }, SUBMISSION_TIMEOUT_MS);

    iframe.name = id;
    iframe.title = "Annotation submission";
    iframe.hidden = true;
    iframe.addEventListener("load", () => {
      if (!submitted) return;
      settle(resolve);
    });

    form.method = "post";
    form.action = endpoint;
    form.target = id;
    form.acceptCharset = "UTF-8";
    form.hidden = true;

    for (const [name, value] of Object.entries(payload)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.append(input);
    }

    document.body.append(iframe, form);
    submitted = true;
    form.submit();
  });
}

function getRecentSubmissionTimestamps(now: number): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(SUBMISSION_LOG_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((value): value is number => typeof value === "number" && Number.isFinite(value))
      .filter((timestamp) => now - timestamp < ANNOTATION_RATE_LIMIT.windowMs)
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

function getOrCreateSubmissionClientId(): string {
  try {
    const existing = localStorage.getItem(SUBMISSION_CLIENT_ID_STORAGE_KEY);
    if (existing) return existing;

    const id =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SUBMISSION_CLIENT_ID_STORAGE_KEY, id);
    return id;
  } catch {
    return "storage-unavailable";
  }
}

function cleanFormValue(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}
