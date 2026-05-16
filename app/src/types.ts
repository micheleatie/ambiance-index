export type SortMode = "relevance" | "name" | "period";

export interface Rubric {
  id: string;
  label: string;
  micro_rubrics?: string[];
  values: string[];
}

export interface TaxonomyFamily {
  id: string;
  label: string;
  rubrics: Rubric[];
}

export interface TaxonomyDataset {
  version: string;
  language: string;
  created: string;
  families: TaxonomyFamily[];
}

export interface ReferenceRecord {
  id: string;
  name: string;
  architect_or_period: string;
  location: string;
  year: string;
  physical_tags: string[];
  subjective_tags: string[];
  keywords_fr: string[];
  sources: string[];
  intention_tags?: string[];
  image?: ReferenceImage;
}

export interface ReferenceImage {
  url: string;
  alt: string;
  credit: string;
  source_url: string;
}

export interface ReferencesDataset {
  version: string;
  created: string;
  references: ReferenceRecord[];
}

export interface RubricMeta {
  id: string;
  label: string;
  familyId: string;
  familyLabel: string;
  micro_rubrics?: string[];
  values?: string[];
}

export interface AppState {
  taxonomy: TaxonomyDataset | null;
  references: ReferenceRecord[];
  rubricLookup: Map<string, RubricMeta>;
  selectedTags: Set<string>;
  query: string;
  sort: SortMode;
  selectedReferenceId: string | null;
  activePreset: string | null;
}

export type AnnotationAction =
  | "confirm"
  | "nuance"
  | "correct"
  | "add"
  | "source_check"
  | "note";

export type ConfidenceLevel = "high" | "medium" | "low" | "to_review";

export interface ExpertAuthor {
  name: string;
  role: string;
  organization: string;
}

export interface ExpertAnnotation {
  id: string;
  reference_id: string;
  reference_name: string;
  rubric_id: string;
  rubric_label: string;
  family_id: string;
  family_label: string;
  action: AnnotationAction | string;
  action_label: string;
  confidence: ConfidenceLevel | string;
  confidence_label: string;
  author: ExpertAuthor;
  note: string;
  source: string;
  contact_email?: string;
  created_at: string;
  moderation_status: "active" | "withdrawn" | string;
  submission_status?: "submitted" | "local" | string;
  submitted_at?: string;
  local_owner?: boolean;
  withdrawn_at?: string;
  withdrawn_by?: string;
  legacy?: boolean;
}

export interface AnnotationSubmissionPayload {
  reference_id: string;
  reference_name: string;
  reference_architect_or_period: string;
  reference_location: string;
  reference_year: string;
  rubric_id: string;
  rubric_label: string;
  family_id: string;
  family_label: string;
  action: string;
  confidence: string;
  author_name: string;
  author_role: string;
  author_organization: string;
  contact_email: string;
  note: string;
  source: string;
  page_url: string;
  consent_publish: string;
  honeypot: string;
  user_agent: string;
  client_id: string;
}

export interface SubmissionRateStatus {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export interface TagLabel {
  rubric: string;
  value: string;
  familyId: string;
}

export type TilePalette = readonly [string, string, string, string];
