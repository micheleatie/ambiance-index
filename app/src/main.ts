import { loadSeedData } from "./data/loadData";
import { getAppElements } from "./dom";
import { bindEvents } from "./events";
import { renderApp, renderLoadError } from "./render";
import { createInitialState, buildRubricLookup } from "./state";

const state = createInitialState();
const els = getAppElements();

function renderCurrentState(): void {
  renderApp(state, els, {
    toggleTag,
    selectReference
  });
}

function toggleTag(tag: string): void {
  if (state.selectedTags.has(tag)) {
    state.selectedTags.delete(tag);
  } else {
    state.selectedTags.add(tag);
  }
  state.activePreset = null;
  renderCurrentState();
}

function selectReference(referenceId: string): void {
  state.selectedReferenceId = referenceId;
  renderCurrentState();
}

async function init(): Promise<void> {
  try {
    const { taxonomy, referencesDataset } = await loadSeedData();
    state.taxonomy = taxonomy;
    state.references = referencesDataset.references;
    buildRubricLookup(state);
    state.selectedReferenceId = state.references[0]?.id ?? null;
    bindEvents(state, els, {
      render: renderCurrentState,
      toggleTag
    });
    renderCurrentState();
  } catch (error) {
    renderLoadError(els, error);
  }
}

void init();
