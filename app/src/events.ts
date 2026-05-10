import {
  clearSavedExpertIdentity,
  clearStoredAnnotations,
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
import {
  createAnnotationSubmissionPayload,
  formatRetryAfter,
  getSubmissionRateStatus,
  recordSubmissionTimestamp,
  submitAnnotationSuggestion,
  validateAnnotationSuggestion,
  validateLocalAnnotationDraft
} from "./submission";
import type { AppState, ReferenceRecord, SortMode } from "./types";

export interface AppActions {
  render(): void;
  toggleTag(tag: string): void;
}

let lastAnnotationSaveAt = 0;
const SEARCH_OVERLAY_QUERY = "(max-width: 980px) and (min-width: 761px)";

export function bindEvents(state: AppState, els: AppElements, actions: AppActions): void {
  syncSearchPanelMode(els);

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
  els.searchToggle.addEventListener("click", () => toggleSearchPanel(els));
  window.addEventListener("resize", () => syncSearchPanelMode(els));

  els.quickThemes.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("button[data-preset]") as HTMLButtonElement | null;
    const presetId = button?.dataset.preset;
    if (!presetId) return;
    applyPreset(state, presetId, actions.render);
  });

  document.addEventListener("click", (event) => handleDetailCardClick(event, state, actions.render));
  document.addEventListener("submit", (event) => handleDetailCardSubmit(event, state, actions.render));
  document.addEventListener("input", (event) => handleDetailCardInput(event, els));
  document.addEventListener("keydown", (event) => handleDetailCardKeydown(event, state, actions.render));
  document.addEventListener("keydown", (event) => handleSearchPanelKeydown(event, els));
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

function toggleSearchPanel(els: AppElements): void {
  if (!window.matchMedia(SEARCH_OVERLAY_QUERY).matches) return;
  setSearchPanelOpen(els, !els.searchPanel.classList.contains("is-open"));
}

function syncSearchPanelMode(els: AppElements): void {
  const overlayMode = window.matchMedia(SEARCH_OVERLAY_QUERY).matches;
  els.searchPanel.classList.toggle("is-collapsible", overlayMode);
  setSearchPanelOpen(els, !overlayMode);
}

function setSearchPanelOpen(els: AppElements, open: boolean): void {
  els.searchPanel.classList.toggle("is-open", open);
  els.searchPanel.classList.toggle("is-collapsed", !open);
  els.searchToggle.setAttribute("aria-expanded", String(open));
}

function handleSearchPanelKeydown(event: KeyboardEvent, els: AppElements): void {
  if (event.key !== "Escape" || !els.searchPanel.classList.contains("is-collapsible")) return;
  setSearchPanelOpen(els, false);
  els.searchToggle.focus();
}

function handleDetailCardClick(event: MouseEvent, state: AppState, render: () => void): void {
  const selected = getSelectedReference(state);
  if (!selected) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  if (target.closest("button[data-save-local-annotation]")) {
    saveLocalAnnotationFromForm(event, state, selected, render);
    return;
  }

  if (target.closest(".annotation-export")) {
    exportAnnotations(selected, getStoredAnnotations(selected));
    return;
  }

  if (target.closest("button[data-clear-local-annotations]")) {
    clearStoredAnnotations(selected.id);
    clearSavedExpertIdentity();
    render();
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

function handleDetailCardSubmit(event: SubmitEvent, state: AppState, render: () => void): void {
  if (!(event.target instanceof HTMLFormElement) || event.target.id !== "expert-annotation-form") return;
  const selected = getSelectedReference(state);
  if (!selected) return;
  void submitExpertAnnotationFromForm(event, state, selected, render);
}

function handleDetailCardInput(event: Event, els: AppElements): void {
  const target = event.target instanceof Element ? event.target : null;
  if (!target?.matches("#expert-annotation-form textarea[name='note']")) return;
  const status = els.detailCard.querySelector("#annotation-status");
  if (status && target instanceof HTMLTextAreaElement && target.value.trim()) {
    setAnnotationStatus(status, "Suggestion prête à soumettre.");
  }
}

function handleDetailCardKeydown(event: KeyboardEvent, state: AppState, render: () => void): void {
  const target = event.target instanceof Element ? event.target : null;
  if (!target?.matches("#expert-annotation-form textarea[name='note']")) return;
  if (event.key !== "Enter" || (!event.metaKey && !event.ctrlKey)) return;
  const selected = getSelectedReference(state);
  if (!selected) return;
  void submitExpertAnnotationFromForm(event, state, selected, render);
}

function getSelectedReference(state: AppState): ReferenceRecord | undefined {
  return state.references.find((reference) => reference.id === state.selectedReferenceId);
}

function saveLocalAnnotationFromForm(
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
  const validationMessage = validateLocalAnnotationDraft(data);

  if (validationMessage) {
    setAnnotationStatus(status, validationMessage, "error");
    return;
  }

  const annotations = getStoredAnnotations(reference);
  annotations.push(createAnnotation(reference, data, getRubricMeta(state, rubricId)));
  saveExpertIdentity(data);
  saveStoredAnnotations(reference.id, annotations);
  lastAnnotationSaveAt = now;
  render();
}

async function submitExpertAnnotationFromForm(
  event: Event,
  state: AppState,
  reference: ReferenceRecord,
  render: () => void
): Promise<void> {
  event.preventDefault();
  const now = Date.now();
  if (now - lastAnnotationSaveAt < 250) return;

  const form = document.querySelector<HTMLFormElement>("#expert-annotation-form");
  const status = document.querySelector<HTMLElement>("#annotation-status");
  const submitButton = form?.querySelector<HTMLButtonElement>("button[data-submit-annotation]");
  if (!form || !status || !submitButton) return;

  const data = new FormData(form);
  const rubricId = String(data.get("rubric_id") ?? "");
  const validationMessage = validateAnnotationSuggestion(data);

  if (validationMessage) {
    setAnnotationStatus(status, validationMessage, "error");
    form.reportValidity();
    return;
  }

  const rateStatus = getSubmissionRateStatus(now);
  if (!rateStatus.allowed) {
    setAnnotationStatus(
      status,
      `Limite locale atteinte. Réessayer dans ${formatRetryAfter(rateStatus.retryAfterMs)}.`,
      "error"
    );
    return;
  }

  const rubric = getRubricMeta(state, rubricId);
  const payload = createAnnotationSubmissionPayload(reference, data, rubric);
  submitButton.disabled = true;
  setAnnotationStatus(status, "Envoi pour validation...", "pending");

  try {
    await submitAnnotationSuggestion(payload);
    recordSubmissionTimestamp();
    const submittedAt = new Date().toISOString();
    const annotations = getStoredAnnotations(reference);
    annotations.push(
      createAnnotation(reference, data, rubric, {
        moderationStatus: "submitted",
        submissionStatus: "submitted",
        submittedAt
      })
    );
    saveExpertIdentity(data);
    saveStoredAnnotations(reference.id, annotations);
    lastAnnotationSaveAt = Date.now();
    render();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Envoi impossible.";
    submitButton.disabled = false;
    setAnnotationStatus(status, message, "error");
  }
}

function setAnnotationStatus(
  status: Element,
  message: string,
  tone: "default" | "error" | "success" | "pending" = "default"
): void {
  status.textContent = message;
  status.classList.toggle("is-error", tone === "error");
  status.classList.toggle("is-success", tone === "success");
  status.classList.toggle("is-pending", tone === "pending");
}
