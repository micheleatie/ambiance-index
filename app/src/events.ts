import {
  createAnnotation,
  exportAnnotations,
  getStoredAnnotations,
  saveExpertIdentity,
  saveStoredAnnotations,
  withdrawAnnotation
} from "./annotations";
import { PRESETS } from "./constants";
import type { AppElements } from "./dom";
import { getRubricMeta } from "./references";
import type { AppState, ReferenceRecord, SortMode } from "./types";

export interface AppActions {
  render(): void;
  toggleTag(tag: string): void;
}

let lastAnnotationSaveAt = 0;

export function bindEvents(state: AppState, els: AppElements, actions: AppActions): void {
  els.searchInput.addEventListener("input", (event) => {
    const input = event.currentTarget as HTMLInputElement;
    state.query = input.value.trim().toLowerCase();
    state.activePreset = null;
    actions.render();
  });

  els.sortSelect.addEventListener("change", (event) => {
    const select = event.currentTarget as HTMLSelectElement;
    state.sort = select.value as SortMode;
    actions.render();
  });

  els.resetButton.addEventListener("click", () => resetState(state, els, actions.render));

  els.quickThemes.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("button[data-preset]") as HTMLButtonElement | null;
    const presetId = button?.dataset.preset;
    if (!presetId) return;
    applyPreset(state, presetId, actions.render);
  });

  document.addEventListener("click", (event) => handleDetailCardClick(event, state, actions.render));
  document.addEventListener("pointerdown", (event) => handleDetailCardPointerDown(event, state, actions.render));
  document.addEventListener("submit", (event) => handleDetailCardSubmit(event, state, actions.render));
  document.addEventListener("input", (event) => handleDetailCardInput(event, els));
  document.addEventListener("keydown", (event) => handleDetailCardKeydown(event, state, actions.render));
}

export function resetState(state: AppState, els: AppElements, render: () => void): void {
  state.selectedTags.clear();
  state.query = "";
  state.sort = "relevance";
  state.activePreset = null;
  state.selectedReferenceId = state.references[0]?.id ?? null;
  els.searchInput.value = "";
  els.sortSelect.value = "relevance";
  render();
}

export function applyPreset(state: AppState, presetId: string, render: () => void): void {
  state.activePreset = state.activePreset === presetId ? null : presetId;
  state.selectedTags.clear();
  for (const tag of PRESETS[state.activePreset ?? ""] ?? []) {
    state.selectedTags.add(tag);
  }
  render();
}

function handleDetailCardClick(event: MouseEvent, state: AppState, render: () => void): void {
  const selected = getSelectedReference(state);
  if (!selected) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  if (target.closest("button[data-add-annotation]")) {
    saveExpertAnnotationFromForm(event, state, selected, render);
    return;
  }

  if (target.closest(".annotation-export")) {
    exportAnnotations(selected, getStoredAnnotations(selected));
    return;
  }

  const withdrawButton = target.closest("button[data-withdraw-annotation]") as HTMLButtonElement | null;
  const annotationId = withdrawButton?.dataset.withdrawAnnotation;
  if (annotationId) {
    const annotations = getStoredAnnotations(selected).map((annotation) =>
      annotation.id === annotationId ? withdrawAnnotation(annotation) : annotation
    );
    saveStoredAnnotations(selected.id, annotations);
    render();
  }
}

function handleDetailCardPointerDown(event: PointerEvent, state: AppState, render: () => void): void {
  const selected = getSelectedReference(state);
  if (!selected) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target?.closest("button[data-add-annotation]")) return;
  saveExpertAnnotationFromForm(event, state, selected, render);
}

function handleDetailCardSubmit(event: SubmitEvent, state: AppState, render: () => void): void {
  if (!(event.target instanceof HTMLFormElement) || event.target.id !== "expert-annotation-form") return;
  const selected = getSelectedReference(state);
  if (!selected) return;
  saveExpertAnnotationFromForm(event, state, selected, render);
}

function handleDetailCardInput(event: Event, els: AppElements): void {
  const target = event.target instanceof Element ? event.target : null;
  if (!target?.matches("#expert-annotation-form textarea[name='note']")) return;
  const status = els.detailCard.querySelector("#annotation-status");
  if (status && target instanceof HTMLTextAreaElement && target.value.trim()) {
    status.textContent = "Annotation prête à ajouter.";
  }
}

function handleDetailCardKeydown(event: KeyboardEvent, state: AppState, render: () => void): void {
  const target = event.target instanceof Element ? event.target : null;
  if (!target?.matches("#expert-annotation-form textarea[name='note']")) return;
  if (event.key !== "Enter" || (!event.metaKey && !event.ctrlKey)) return;
  const selected = getSelectedReference(state);
  if (!selected) return;
  saveExpertAnnotationFromForm(event, state, selected, render);
}

function getSelectedReference(state: AppState): ReferenceRecord | undefined {
  return state.references.find((reference) => reference.id === state.selectedReferenceId);
}

function saveExpertAnnotationFromForm(
  event: Event,
  state: AppState,
  reference: ReferenceRecord,
  render: () => void
): void {
  event.preventDefault();
  const now = Date.now();
  if (now - lastAnnotationSaveAt < 250) return;

  const form = document.querySelector<HTMLFormElement>("#expert-annotation-form");
  const status = document.querySelector<HTMLElement>("#annotation-status");
  if (!form || !status) return;

  const data = new FormData(form);
  const rubricId = String(data.get("rubric_id") ?? "");
  const note = String(data.get("note") ?? "").trim();
  const expertName = String(data.get("expert_name") ?? "").trim();
  const expertRole = String(data.get("expert_role") ?? "").trim();

  if (!expertName || !expertRole || !rubricId || !note) {
    status.textContent = "Nom, fonction, rubrique et note obligatoires.";
    return;
  }

  const annotations = getStoredAnnotations(reference);
  annotations.push(createAnnotation(reference, data, getRubricMeta(state, rubricId)));
  saveExpertIdentity(data);
  saveStoredAnnotations(reference.id, annotations);
  lastAnnotationSaveAt = now;
  render();
}
