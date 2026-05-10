import type { AnnotationAction, ConfidenceLevel, TilePalette } from "./types";

export const PRESETS: Record<string, string[]> = {
  light: ["light:filtrée", "light:colorée"],
  water: ["water:source", "water:bassin", "wellbeing_restoration:ressourçant"],
  sound: ["sound:réverbérant", "sound:cérémoniel", "sacred_ritual:sacré", "sacred_ritual:rituel"],
  concept: [
    "site_intention:cadrer le paysage",
    "site_intention:fusionner avec la nature",
    "climate_intention:filtrer la lumière",
    "climate_intention:rafraîchir par l'eau"
  ],
  memory: ["memory_absence:mémoriel", "memory_absence:absent"],
  refuge: ["intimacy_refuge:refuge", "inspiration_concentration:studieux"],
  matter: ["material_texture:pierre", "material_texture:béton"]
};

export const ANNOTATION_ACTIONS: ReadonlyArray<readonly [AnnotationAction, string]> = [
  ["confirm", "Confirmer"],
  ["nuance", "Nuancer"],
  ["correct", "Corriger"],
  ["add", "Ajouter"],
  ["source_check", "Source à vérifier"],
  ["note", "Note"]
];

export const CONFIDENCE_LEVELS: ReadonlyArray<readonly [ConfidenceLevel, string]> = [
  ["high", "Haute"],
  ["medium", "Moyenne"],
  ["low", "Faible"],
  ["to_review", "À relire"]
];

export const EXPERT_IDENTITY_STORAGE_KEY = "expert-annotation-author:v2";
export const SUBMISSION_CLIENT_ID_STORAGE_KEY = "expert-annotation-submission-client:v1";
export const SUBMISSION_LOG_STORAGE_KEY = "expert-annotation-submission-log:v1";

export const ANNOTATION_SUBMISSION_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxuTsNoS_Yv1613O8Ir4B0JL2zAEEUY0Hft5o88iHjek0seawidT6F_4zNAA3tOq1c/exec";

export const ANNOTATION_FIELD_LIMITS = {
  expert_name: 120,
  expert_role: 160,
  expert_organization: 160,
  contact_email: 254,
  note: 1600,
  source: 300
} as const;

export const ANNOTATION_MIN_NOTE_LENGTH = 20;

export const ANNOTATION_RATE_LIMIT = {
  maxSubmissions: 3,
  windowMs: 10 * 60 * 1000
} as const;

export const TILE_PALETTES: Record<string, TilePalette> = {
  light: ["#e9d184", "#f7f3de", "#d4b35d", "#fffaf0"],
  water: ["#356c8b", "#d5e4e6", "#6a8c8e", "#f3f6f3"],
  sound: ["#49515f", "#d8d2c2", "#8a6f45", "#f4f1ea"],
  site_intention: ["#61715f", "#d9dfcc", "#a36f3b", "#f4f1ea"],
  spatial_intention: ["#514e59", "#d8d2c2", "#7c765f", "#f7f7f4"],
  material_texture: ["#8c7861", "#d5c5ad", "#5d544b", "#eee8de"],
  shadow_contrast: ["#242621", "#b8b19f", "#5b5a52", "#efeade"],
  color: ["#9b3f2f", "#d8a34f", "#2f6c76", "#f2e8d2"],
  memory_absence: ["#35363a", "#d8d5cc", "#7b7480", "#f2f0eb"],
  nature_living: ["#627c48", "#dfe9cc", "#889a65", "#f5f7ed"],
  default: ["#9b3f2f", "#d9d3c6", "#356c8b", "#f7f7f4"]
};
