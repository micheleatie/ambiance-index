import { TILE_PALETTES } from "./constants";
import type {
  AppState,
  ReferenceRecord,
  RubricMeta,
  TagLabel,
  TaxonomyDataset,
  TaxonomyFamily,
  TilePalette
} from "./types";

export function getFilteredReferences(state: AppState): ReferenceRecord[] {
  const selectedGroups = groupSelectedTagsByRubric(state);
  const results = state.references.filter((reference) => {
    const tags = getAllTags(reference);
    const matchesTags = matchesSelectedGroups(tags, selectedGroups);
    const matchesQuery = !state.query || getSearchText(state, reference).includes(state.query);
    return matchesTags && matchesQuery;
  });

  return results.sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name, "fr");
    if (state.sort === "period") return String(a.year).localeCompare(String(b.year), "fr");
    return scoreReference(state, b) - scoreReference(state, a) || a.name.localeCompare(b.name, "fr");
  });
}

export function scoreReference(state: AppState, reference: ReferenceRecord): number {
  const tags = getAllTags(reference);
  let score = 0;
  for (const tag of state.selectedTags) {
    if (tags.includes(tag)) score += 5;
  }
  if (state.query && getSearchText(state, reference).includes(state.query)) score += 2;
  return score + reference.sources.length * 0.2 + reference.keywords_fr.length * 0.05;
}

export function groupSelectedTagsByRubric(state: AppState): string[][] {
  const groups = new Map<string, string[]>();
  for (const tag of state.selectedTags) {
    const rubricId = getRubricId(tag);
    if (!groups.has(rubricId)) groups.set(rubricId, []);
    groups.get(rubricId)?.push(tag);
  }
  return [...groups.values()];
}

export function matchesSelectedGroups(referenceTags: string[], selectedGroups: string[][]): boolean {
  return selectedGroups.every((group) => group.some((tag) => referenceTags.includes(tag)));
}

export function countTags(references: ReferenceRecord[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const reference of references) {
    for (const tag of getAllTags(reference)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

export function countUsedRubrics(families: TaxonomyFamily[], counts: Map<string, number>): number {
  return families.reduce((total, family) => {
    const used = family.rubrics.filter((rubric) =>
      rubric.values.some((value) => counts.get(makeTag(rubric.id, value)))
    );
    return total + used.length;
  }, 0);
}

export function getAllTags(reference: ReferenceRecord): string[] {
  return [
    ...(reference.physical_tags ?? []),
    ...(reference.subjective_tags ?? []),
    ...(reference.intention_tags ?? [])
  ];
}

export function getSearchText(state: AppState, reference: ReferenceRecord): string {
  const tagText = getAllTags(reference).map((tag) => {
    const label = getTagLabel(state, tag);
    return `${label.rubric} ${label.value}`;
  });
  return [
    reference.name,
    reference.architect_or_period,
    reference.location,
    reference.year,
    ...reference.keywords_fr,
    ...tagText
  ]
    .join(" ")
    .toLowerCase();
}

export function getTagLabel(state: AppState, tag: string): TagLabel {
  const rubricId = getRubricId(tag);
  const value = getTagValue(tag);
  const rubric = state.rubricLookup.get(rubricId);
  return {
    rubric: rubric?.label ?? rubricId,
    value,
    familyId: rubric?.familyId ?? "unknown"
  };
}

export function getTagFamilyClass(state: AppState, tag: string): string {
  const familyId = getTagLabel(state, tag).familyId;
  if (familyId === "design_intentions") return "intention";
  return familyId === "physical" || familyId === "experience_devices" ? "physical" : "subjective";
}

export function getPalette(reference: ReferenceRecord): TilePalette {
  const found = getAllTags(reference)
    .map((tag) => getRubricId(tag))
    .find((rubric) => TILE_PALETTES[rubric]);
  return found ? TILE_PALETTES[found] : TILE_PALETTES.default;
}

export function getReferenceAmbianceTags(reference: ReferenceRecord): string[] {
  return [
    ...(reference.physical_tags ?? []).slice(0, 2),
    ...(reference.subjective_tags ?? []).slice(0, 2)
  ];
}

export function getReferenceIntentionTags(reference: ReferenceRecord): string[] {
  return (reference.intention_tags ?? []).slice(0, 2);
}

export function getAllRubrics(state: AppState): RubricMeta[] {
  return getTaxonomy(state).families.flatMap((family) =>
    family.rubrics.map((rubric) => ({
      ...rubric,
      familyId: family.id,
      familyLabel: family.label
    }))
  );
}

export function getRubricMeta(state: AppState, rubricId: string): RubricMeta {
  if (rubricId === "general") {
    return {
      id: "general",
      label: "Observation générale",
      familyId: "expert_notes",
      familyLabel: "Annotations expertes"
    };
  }

  const rubric = state.rubricLookup.get(rubricId);
  return {
    id: rubricId,
    label: rubric?.label ?? rubricId,
    familyId: rubric?.familyId ?? "unknown",
    familyLabel: rubric?.familyLabel ?? "Rubrique non reconnue",
    micro_rubrics: rubric?.micro_rubrics,
    values: rubric?.values
  };
}

export function getTaxonomy(state: AppState): TaxonomyDataset {
  if (!state.taxonomy) {
    throw new Error("Taxonomie non chargée.");
  }
  return state.taxonomy;
}

export function makeTag(rubricId: string, value: string): string {
  return `${rubricId}:${value}`;
}

export function getRubricId(tag: string): string {
  return tag.split(":")[0] ?? tag;
}

function getTagValue(tag: string): string {
  const separatorIndex = tag.indexOf(":");
  return separatorIndex >= 0 ? tag.slice(separatorIndex + 1) : tag;
}
