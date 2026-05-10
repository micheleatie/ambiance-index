import type { AppState } from "./types";

export function createInitialState(): AppState {
  return {
    taxonomy: null,
    references: [],
    rubricLookup: new Map(),
    selectedTags: new Set(),
    query: "",
    sort: "relevance",
    selectedReferenceId: null,
    activePreset: null
  };
}

export function buildRubricLookup(state: AppState): void {
  state.rubricLookup.clear();
  if (!state.taxonomy) return;

  for (const family of state.taxonomy.families) {
    for (const rubric of family.rubrics) {
      state.rubricLookup.set(rubric.id, {
        ...rubric,
        familyId: family.id,
        familyLabel: family.label
      });
    }
  }
}
