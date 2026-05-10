import { ANNOTATION_ACTIONS, CONFIDENCE_LEVELS, EXPERT_IDENTITY_STORAGE_KEY } from "./constants";
import type {
  AnnotationAction,
  ConfidenceLevel,
  ExpertAnnotation,
  ExpertAuthor,
  ExpertIdentity,
  ReferenceRecord,
  RubricMeta
} from "./types";

export function createAnnotation(
  reference: ReferenceRecord,
  data: FormData,
  rubric: RubricMeta
): ExpertAnnotation {
  const action = String(data.get("action") ?? "confirm") as AnnotationAction;
  const confidence = String(data.get("confidence") ?? "high") as ConfidenceLevel;

  return {
    id: makeAnnotationId(reference.id),
    reference_id: reference.id,
    reference_name: reference.name,
    rubric_id: rubric.id,
    rubric_label: rubric.label,
    family_id: rubric.familyId,
    family_label: rubric.familyLabel,
    action,
    action_label: getAnnotationActionLabel(action),
    confidence,
    confidence_label: getConfidenceLabel(confidence),
    author: createExpertAuthor(data),
    note: String(data.get("note") ?? "").trim(),
    source: String(data.get("source") ?? "").trim(),
    created_at: new Date().toISOString(),
    moderation_status: "active",
    local_owner: true
  };
}

export function getStoredAnnotations(reference: ReferenceRecord): ExpertAnnotation[] {
  const key = getAnnotationStorageKey(reference.id);
  const legacyKey = getLegacyNoteStorageKey(reference.id);
  const migratedKey = `${legacyKey}:migrated`;
  let annotations = parseStoredAnnotations(localStorage.getItem(key));
  const legacyNote = localStorage.getItem(legacyKey)?.trim();

  if (legacyNote && !localStorage.getItem(migratedKey)) {
    annotations = [createLegacyAnnotation(reference, legacyNote), ...annotations];
    saveStoredAnnotations(reference.id, annotations);
    localStorage.setItem(migratedKey, "true");
  }

  return annotations;
}

export function parseStoredAnnotations(value: string | null): ExpertAnnotation[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((annotation): annotation is ExpertAnnotation =>
          Boolean(annotation) && typeof annotation === "object"
        )
      : [];
  } catch {
    return [];
  }
}

export function saveStoredAnnotations(referenceId: string, annotations: ExpertAnnotation[]): void {
  localStorage.setItem(getAnnotationStorageKey(referenceId), JSON.stringify(annotations));
}

export function createExpertAuthor(data: FormData): ExpertAuthor {
  return {
    name: String(data.get("expert_name") ?? "").trim(),
    role: String(data.get("expert_role") ?? "").trim(),
    organization: String(data.get("expert_organization") ?? "").trim()
  };
}

export function getSavedExpertIdentity(): ExpertIdentity {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(EXPERT_IDENTITY_STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") {
      return emptyExpertIdentity();
    }
    const identity = parsed as Partial<ExpertIdentity>;
    return {
      name: typeof identity.name === "string" ? identity.name : "",
      role: typeof identity.role === "string" ? identity.role : "",
      organization: typeof identity.organization === "string" ? identity.organization : ""
    };
  } catch {
    return emptyExpertIdentity();
  }
}

export function saveExpertIdentity(data: FormData): void {
  localStorage.setItem(EXPERT_IDENTITY_STORAGE_KEY, JSON.stringify(createExpertAuthor(data)));
}

export function getAnnotationAuthorLabel(annotation: ExpertAnnotation): string {
  const name = annotation.author?.name?.trim() || "Auteur non renseigné";
  const role = annotation.author?.role?.trim() || "fonction non renseignée";
  const organization = annotation.author?.organization?.trim();
  return organization ? `${name} · ${role} · ${organization}` : `${name} · ${role}`;
}

export function canWithdrawAnnotation(annotation: ExpertAnnotation): boolean {
  return !annotation.withdrawn_at && annotation.local_owner !== false;
}

export function withdrawAnnotation(annotation: ExpertAnnotation): ExpertAnnotation {
  if (!canWithdrawAnnotation(annotation)) return annotation;
  return {
    ...annotation,
    moderation_status: "withdrawn",
    withdrawn_at: new Date().toISOString(),
    withdrawn_by: "local_author"
  };
}

export function exportAnnotations(reference: ReferenceRecord, annotations: ExpertAnnotation[]): void {
  if (!annotations.length) return;

  const payload = {
    version: "0.1.0",
    exported_at: new Date().toISOString(),
    reference: {
      id: reference.id,
      name: reference.name,
      architect_or_period: reference.architect_or_period,
      location: reference.location,
      year: reference.year
    },
    annotations
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `annotations-expertes-${reference.id}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function getAnnotationActionLabel(action: string): string {
  return ANNOTATION_ACTIONS.find(([value]) => value === action)?.[1] ?? action;
}

export function getConfidenceLabel(confidence: string): string {
  return CONFIDENCE_LEVELS.find(([value]) => value === confidence)?.[1] ?? confidence;
}

function createLegacyAnnotation(reference: ReferenceRecord, note: string): ExpertAnnotation {
  return {
    id: `${reference.id}:legacy-note`,
    reference_id: reference.id,
    reference_name: reference.name,
    rubric_id: "general",
    rubric_label: "Observation générale",
    family_id: "expert_notes",
    family_label: "Annotations expertes",
    action: "note",
    action_label: "Note libre héritée",
    confidence: "to_review",
    confidence_label: "À relire",
    author: {
      name: "",
      role: "",
      organization: ""
    },
    note,
    source: "",
    created_at: new Date().toISOString(),
    moderation_status: "active",
    local_owner: true,
    legacy: true
  };
}

function getAnnotationStorageKey(referenceId: string): string {
  return `expert-annotations:v1:${referenceId}`;
}

function getLegacyNoteStorageKey(referenceId: string): string {
  return `expert-note:${referenceId}`;
}

function makeAnnotationId(referenceId: string): string {
  const suffix =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${referenceId}:${suffix}`;
}

function emptyExpertIdentity(): ExpertIdentity {
  return {
    name: "",
    role: "",
    organization: ""
  };
}
