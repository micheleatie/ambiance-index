import {
  canWithdrawAnnotation,
  getAnnotationActionLabel,
  getAnnotationAuthorLabel,
  getConfidenceLabel,
  getSavedExpertIdentity,
  getStoredAnnotations
} from "./annotations";
import {
  ANNOTATION_ACTIONS,
  ANNOTATION_FIELD_LIMITS,
  ANNOTATION_MIN_NOTE_LENGTH,
  CONFIDENCE_LEVELS
} from "./constants";
import type { AppElements } from "./dom";
import {
  countTags,
  countUsedRubrics,
  getAllRubrics,
  getAllTags,
  getFilteredReferences,
  getPalette,
  getReferenceAmbianceTags,
  getReferenceFamilyTags,
  getReferenceIntentionTags,
  getRubricMeta,
  getTagFamilyClass,
  getTagLabel,
  getTaxonomy,
  makeTag
} from "./references";
import type { AppState, ExpertAnnotation, ReferenceRecord, Rubric, RubricMeta, TaxonomyFamily } from "./types";
import { escapeAttribute, escapeHtml, formatCount, formatDateTime } from "./utils/format";

export interface RenderHandlers {
  toggleTag(tag: string): void;
  selectReference(referenceId: string): void;
}

export function renderApp(state: AppState, els: AppElements, handlers: RenderHandlers): void {
  const results = getFilteredReferences(state);
  if (!results.some((reference) => reference.id === state.selectedReferenceId)) {
    state.selectedReferenceId = results[0]?.id ?? null;
  }

  els.datasetCount.textContent = `${state.references.length} références · ${state.rubricLookup.size} rubriques`;
  els.activeFilterCount.textContent = formatCount(state.selectedTags.size, "filtre");

  renderPresetButtons(state, els);
  renderFilters(state, els, handlers);
  renderSelectedTags(state, els, handlers);
  renderResults(state, els, results, handlers);
  renderDetail(state, els, results);
}

export function renderLoadError(els: AppElements, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  els.datasetCount.textContent = "Données indisponibles";
  els.resultsSummary.textContent = "Le prototype n'a pas pu charger les fichiers JSON.";
  els.resultsList.innerHTML = `
    <div class="empty-state">
      ${escapeHtml(message)}. Lance le serveur local avec npm run dev.
    </div>
  `;
}

function renderPresetButtons(state: AppState, els: AppElements): void {
  els.quickThemes.querySelectorAll<HTMLButtonElement>("button[data-preset]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === state.activePreset);
  });
}

function renderFilters(state: AppState, els: AppElements, handlers: RenderHandlers): void {
  const taxonomy = getTaxonomy(state);
  const counts = countTags(state.references);
  const ambianceFamilies = taxonomy.families.filter((family) => family.id !== "design_intentions");
  const intentionFamilies = taxonomy.families.filter((family) => family.id === "design_intentions");

  els.filters.innerHTML = `
    <section class="filter-box" aria-label="Ambiances">
      <div class="filter-box-header">
        <h3>Ambiances</h3>
        <span>${formatCount(countUsedRubrics(ambianceFamilies, counts), "rubrique")}</span>
      </div>
      <div class="filter-list">
        ${ambianceFamilies.map((family) => renderFamilyFilters(state, family, counts, "chip")).join("")}
      </div>
    </section>

    <section class="filter-box intentions-filter-box" aria-label="Intentions architecturales">
      <div class="filter-box-header">
        <h3>Intentions architecturales</h3>
        <span>${formatCount(countUsedRubrics(intentionFamilies, counts), "rubrique")}</span>
      </div>
      <div class="filter-list">
        ${intentionFamilies.map((family) => renderFamilyFilters(state, family, counts, "list")).join("")}
      </div>
    </section>
  `;

  els.filters.querySelectorAll<HTMLButtonElement>("button[data-tag]").forEach((button) => {
    const tag = button.dataset.tag;
    if (tag) button.addEventListener("click", () => handlers.toggleTag(tag));
  });
}

function renderFamilyFilters(
  state: AppState,
  family: TaxonomyFamily,
  counts: Map<string, number>,
  variant: "chip" | "list"
): string {
  const rubrics = family.rubrics
    .map((rubric) => renderRubricFilter(state, rubric, counts, variant))
    .join("");

  if (!rubrics) return "";
  if (family.id === "design_intentions") return rubrics;

  return `
    <details class="filter-family" open>
      <summary>
        <span>${escapeHtml(family.label)}</span>
        <span>${formatCount(countUsedRubrics([family], counts), "rubrique")}</span>
      </summary>
      ${rubrics}
    </details>
  `;
}

function renderRubricFilter(
  state: AppState,
  rubric: Rubric,
  counts: Map<string, number>,
  variant: "chip" | "list"
): string {
  const usedValues = rubric.values.filter((value) => counts.get(makeTag(rubric.id, value)));
  if (!usedValues.length) return "";

  const selectedCount = usedValues.filter((value) => state.selectedTags.has(makeTag(rubric.id, value))).length;
  const items = usedValues
    .map((value) => {
      const tag = makeTag(rubric.id, value);
      const selected = state.selectedTags.has(tag);
      const count = counts.get(tag) ?? 0;
      return `
        <button class="tag-button ${variant === "list" ? "tag-button-list" : ""} ${selected ? "is-selected" : ""}" type="button" data-tag="${escapeAttribute(tag)}">
          <span class="tag-label">${escapeHtml(value)}</span>
          <span class="tag-count">${count}</span>
        </button>
      `;
    })
    .join("");

  return `
    <details class="filter-group" ${selectedCount ? "open" : ""}>
      <summary>
        <span>${escapeHtml(rubric.label)}</span>
        <span>${selectedCount ? formatCount(selectedCount, "choix") : usedValues.length}</span>
      </summary>
      <div class="${variant === "list" ? "tag-list" : "tag-grid"}">${items}</div>
    </details>
  `;
}

function renderSelectedTags(state: AppState, els: AppElements, handlers: RenderHandlers): void {
  const selected = [...state.selectedTags];
  els.selectedTags.innerHTML = selected
    .map((tag) => {
      const label = getTagLabel(state, tag);
      return `
        <span class="selected-tag">
          ${escapeHtml(label.value)}
          <span>${escapeHtml(label.rubric)}</span>
          <button type="button" aria-label="Retirer ${escapeAttribute(label.value)}" data-remove-tag="${escapeAttribute(tag)}">×</button>
        </span>
      `;
    })
    .join("");

  els.selectedTags.querySelectorAll<HTMLButtonElement>("button[data-remove-tag]").forEach((button) => {
    const tag = button.dataset.removeTag;
    if (tag) button.addEventListener("click", () => handlers.toggleTag(tag));
  });
}

function renderResults(
  state: AppState,
  els: AppElements,
  results: ReferenceRecord[],
  handlers: RenderHandlers
): void {
  const queryText = state.query ? ` pour « ${state.query} »` : "";
  const foundText = results.length === 1 ? "trouvée" : "trouvées";
  els.resultsSummary.textContent = `${formatCount(results.length, "référence")} ${foundText}${queryText}.`;

  if (!results.length) {
    els.resultsList.innerHTML = `
      <div class="empty-state">
        Aucune référence ne correspond à cette combinaison. Retire un filtre ou essaie une ambiance plus générale.
      </div>
    `;
    return;
  }

  els.resultsList.innerHTML = results
    .map((reference) => {
      const active = reference.id === state.selectedReferenceId;
      return `
        <button class="reference-card ${active ? "is-active" : ""}" type="button" data-reference-id="${escapeAttribute(reference.id)}">
          ${renderAtmosphereTile(reference)}
          <span class="reference-main">
            <span class="reference-title-row">
              <h3>${escapeHtml(reference.name)}</h3>
              <span class="reference-year">${escapeHtml(reference.year)}</span>
            </span>
            <span class="reference-meta">
              ${escapeHtml(reference.architect_or_period)} · ${escapeHtml(reference.location)}
            </span>
            ${renderReferenceTagBlock(state, "Ambiances", getReferenceAmbianceTags(reference))}
            ${renderReferenceTagBlock(state, "Intentions", getReferenceIntentionTags(reference), "intention-block")}
            <span class="keyword-row">
              ${reference.keywords_fr.slice(0, 5).map((keyword) => `<span class="keyword">${escapeHtml(keyword)}</span>`).join("")}
            </span>
          </span>
        </button>
      `;
    })
    .join("");

  els.resultsList.querySelectorAll<HTMLButtonElement>("button[data-reference-id]").forEach((button) => {
    const referenceId = button.dataset.referenceId;
    if (referenceId) button.addEventListener("click", () => handlers.selectReference(referenceId));
  });
}

function renderDetail(state: AppState, els: AppElements, results: ReferenceRecord[]): void {
  const selected = results.find((reference) => reference.id === state.selectedReferenceId);
  els.detailEmpty.hidden = Boolean(selected);
  els.detailCard.hidden = !selected;

  if (!selected) {
    els.detailCard.innerHTML = "";
    return;
  }

  const annotations = getStoredAnnotations(selected);
  const physicalTags = getReferenceFamilyTags(state, selected, "physical");
  const subjectiveTags = getReferenceFamilyTags(state, selected, "subjective");

  els.detailCard.innerHTML = `
    ${renderAtmosphereTile(selected, "detail-visual")}
    <h2>${escapeHtml(selected.name)}</h2>
    <p class="reference-meta">${escapeHtml(selected.architect_or_period)} · ${escapeHtml(selected.location)} · ${escapeHtml(selected.year)}</p>

    <section class="detail-section">
      <h3>Caractéristiques physiques</h3>
      <div class="mini-tags">
        ${physicalTags.map((tag) => renderTagPill(state, tag, "physical")).join("")}
      </div>
    </section>

    <section class="detail-section">
      <h3>Effets ressentis</h3>
      <div class="mini-tags">
        ${subjectiveTags.map((tag) => renderTagPill(state, tag, "subjective")).join("")}
      </div>
    </section>

    <section class="detail-section intentions-detail-section">
      <h3>Intentions de conception</h3>
      ${renderGroupedTags(state, selected.intention_tags ?? [], "intention")}
    </section>

    <section class="detail-section">
      <h3>Mots figuratifs</h3>
      <div class="keyword-row">
        ${selected.keywords_fr.map((keyword) => `<span class="keyword">${escapeHtml(keyword)}</span>`).join("")}
      </div>
    </section>

    <section class="detail-section">
      <h3>Sources</h3>
      <div class="source-list">
        ${selected.sources.map((source) => `<a class="source-link" href="${escapeAttribute(source)}" target="_blank" rel="noreferrer">${escapeHtml(source)}</a>`).join("")}
      </div>
    </section>

    ${renderExpertAnnotations(state, selected, annotations)}
  `;
}

function renderExpertAnnotations(
  state: AppState,
  reference: ReferenceRecord,
  annotations: ExpertAnnotation[]
): string {
  const expertIdentity = getSavedExpertIdentity();
  const activeAnnotations = annotations.filter((annotation) => !annotation.withdrawn_at);
  const withdrawnAnnotations = annotations.filter((annotation) => annotation.withdrawn_at);

  return `
    <section class="detail-section expert-annotations">
      <div class="annotation-header">
        <h3>Suggestions expertes</h3>
        <div class="annotation-header-actions">
          <button class="ghost-button annotation-export" type="button" ${annotations.length ? "" : "disabled"}>
            Exporter traces locales
          </button>
          <button class="ghost-button annotation-clear" type="button" data-clear-local-annotations ${annotations.length || expertIdentity.name || expertIdentity.role || expertIdentity.organization || expertIdentity.email ? "" : "disabled"}>
            Effacer local
          </button>
        </div>
      </div>

      <div class="annotation-list">
        ${
          activeAnnotations.length
            ? activeAnnotations.map((annotation) => renderExpertAnnotation(annotation)).join("")
            : `<p class="muted-line">Aucune suggestion locale.</p>`
        }
      </div>

      ${
        withdrawnAnnotations.length
          ? `
            <details class="annotation-archive">
              <summary>${formatCount(withdrawnAnnotations.length, "annotation retirée")}</summary>
              <div class="annotation-list">
                ${withdrawnAnnotations.map((annotation) => renderExpertAnnotation(annotation)).join("")}
              </div>
            </details>
          `
          : ""
      }

      <form class="annotation-form" id="expert-annotation-form">
        <div class="annotation-form-grid">
          <label>
            <span>Nom</span>
            <input name="expert_name" type="text" required autocomplete="name" maxlength="${ANNOTATION_FIELD_LIMITS.expert_name}" value="${escapeAttribute(expertIdentity.name)}" />
          </label>

          <label>
            <span>Fonction / rôle</span>
            <input name="expert_role" type="text" required maxlength="${ANNOTATION_FIELD_LIMITS.expert_role}" placeholder="Architecte, enseignant..." value="${escapeAttribute(expertIdentity.role)}" />
          </label>

          <label>
            <span>Organisation</span>
            <input name="expert_organization" type="text" maxlength="${ANNOTATION_FIELD_LIMITS.expert_organization}" placeholder="Optionnel" value="${escapeAttribute(expertIdentity.organization)}" />
          </label>

          <label>
            <span>Email de contact</span>
            <input name="contact_email" type="email" autocomplete="email" maxlength="${ANNOTATION_FIELD_LIMITS.contact_email}" placeholder="Optionnel" value="${escapeAttribute(expertIdentity.email)}" />
          </label>

          <label>
            <span>Rubrique</span>
            <select name="rubric_id" required>
              ${renderRubricOptions(state, reference)}
            </select>
          </label>

          <label>
            <span>Intervention</span>
            <select name="action">
              ${ANNOTATION_ACTIONS.filter(([value]) => value !== "note")
                .map(([value, label]) => `<option value="${escapeAttribute(value)}">${escapeHtml(label)}</option>`)
                .join("")}
            </select>
          </label>

          <label>
            <span>Confiance</span>
            <select name="confidence">
              ${CONFIDENCE_LEVELS.map(([value, label]) => `<option value="${escapeAttribute(value)}">${escapeHtml(label)}</option>`).join("")}
            </select>
          </label>

          <label class="annotation-note-field">
            <span>Note</span>
            <textarea name="note" required minlength="${ANNOTATION_MIN_NOTE_LENGTH}" maxlength="${ANNOTATION_FIELD_LIMITS.note}" placeholder="Observation experte, correction ou hypothèse d'indexation."></textarea>
          </label>

          <label class="annotation-source-field">
            <span>Source ou référence courte</span>
            <input name="source" type="text" maxlength="${ANNOTATION_FIELD_LIMITS.source}" placeholder="Optionnel : entretien, livre, page, citation courte..." />
          </label>

          <label class="annotation-consent-field">
            <input name="consent_publish" type="checkbox" value="yes" required />
            <span>J'accepte que cette contribution puisse être relue, corrigée et publiée avec mon nom et ma fonction.</span>
          </label>

          <label class="annotation-honeypot" aria-hidden="true">
            <span>Site web</span>
            <input name="honeypot" type="text" tabindex="-1" autocomplete="off" />
          </label>
        </div>

        <div class="annotation-actions">
          <div class="annotation-buttons">
            <button class="primary-button" type="submit" data-submit-annotation>Soumettre pour validation</button>
            <button class="secondary-button" type="button" data-save-local-annotation>Enregistrer localement</button>
          </div>
          <span class="note-status" id="annotation-status">Suggestion non envoyée.</span>
        </div>
      </form>
    </section>
  `;
}

function renderExpertAnnotation(annotation: ExpertAnnotation): string {
  const actionLabel = annotation.action_label ?? getAnnotationActionLabel(annotation.action);
  const confidenceLabel = annotation.confidence_label ?? getConfidenceLabel(annotation.confidence);
  const source = annotation.source?.trim();
  const authorLabel = getAnnotationAuthorLabel(annotation);
  const withdrawn = Boolean(annotation.withdrawn_at);
  const submitted = annotation.moderation_status === "submitted" || annotation.submission_status === "submitted";

  return `
    <article class="annotation-entry ${withdrawn ? "is-withdrawn" : ""}">
      <div class="annotation-entry-header">
        <div>
          <div class="annotation-entry-title">
            <span class="annotation-rubric">${escapeHtml(annotation.rubric_label)}</span>
            <span class="annotation-pill">${escapeHtml(actionLabel)}</span>
            <span class="annotation-pill confidence">${escapeHtml(confidenceLabel)}</span>
            ${submitted ? `<span class="annotation-pill submitted">Envoyée</span>` : ""}
            ${withdrawn ? `<span class="annotation-pill withdrawn">Retirée</span>` : ""}
          </div>
          <span class="annotation-author">${escapeHtml(authorLabel)}</span>
          <span class="annotation-date">
            ${escapeHtml(formatDateTime(annotation.created_at))}
            ${submitted && annotation.submitted_at ? ` · envoyée le ${escapeHtml(formatDateTime(annotation.submitted_at))}` : ""}
            ${withdrawn ? ` · retirée le ${escapeHtml(formatDateTime(annotation.withdrawn_at ?? ""))}` : ""}
          </span>
        </div>
        ${
          canWithdrawAnnotation(annotation)
            ? `<button class="annotation-delete" type="button" data-withdraw-annotation="${escapeAttribute(annotation.id)}">Retirer localement</button>`
            : ""
        }
      </div>
      <p class="annotation-note">
        ${
          withdrawn
            ? "Annotation retirée localement. Elle reste conservée dans l'export comme archive."
            : escapeHtml(annotation.note)
        }
      </p>
      ${source ? `<p class="annotation-source">${escapeHtml(source)}</p>` : ""}
    </article>
  `;
}

function renderRubricOptions(state: AppState, reference: ReferenceRecord): string {
  const usedRubricIds = new Set(getAllTags(reference).map((tag) => tag.split(":")[0]));
  const usedRubrics = [...usedRubricIds]
    .map((rubricId) => getRubricMeta(state, rubricId ?? ""))
    .filter((rubric) => rubric.id !== "general");
  const allRubrics = getAllRubrics(state).filter((rubric) => !usedRubricIds.has(rubric.id));

  return `
    <option value="">Choisir une rubrique</option>
    <option value="general">Observation générale</option>
    ${
      usedRubrics.length
        ? `
          <optgroup label="Rubriques de cette référence">
            ${usedRubrics.map((rubric) => renderRubricOption(rubric)).join("")}
          </optgroup>
        `
        : ""
    }
    <optgroup label="Toutes les rubriques">
      ${allRubrics.map((rubric) => renderRubricOption(rubric)).join("")}
    </optgroup>
  `;
}

function renderRubricOption(rubric: RubricMeta): string {
  return `<option value="${escapeAttribute(rubric.id)}">${escapeHtml(rubric.familyLabel)} · ${escapeHtml(rubric.label)}</option>`;
}

function renderReferenceTagBlock(state: AppState, label: string, tags: string[], className = ""): string {
  if (!tags.length) return "";
  return `
    <span class="reference-tag-block ${className}">
      <span class="tag-block-label">${escapeHtml(label)}</span>
      <span class="mini-tags">
        ${tags.map((tag) => renderTagPill(state, tag, getTagFamilyClass(state, tag))).join("")}
      </span>
    </span>
  `;
}

function renderGroupedTags(state: AppState, tags: string[], className = ""): string {
  if (!tags.length) return `<p class="muted-line">Non renseigné.</p>`;
  const groups = new Map<string, Array<{ tag: string; value: string }>>();
  for (const tag of tags) {
    const label = getTagLabel(state, tag);
    if (!groups.has(label.rubric)) groups.set(label.rubric, []);
    groups.get(label.rubric)?.push({ tag, value: label.value });
  }

  return `
    <div class="grouped-tags">
      ${[...groups]
        .map(
          ([rubric, entries]) => `
          <div class="grouped-tag-row">
            <span class="grouped-tag-label">${escapeHtml(rubric)}</span>
            <span class="mini-tags">
              ${entries.map((entry) => `<span class="mini-tag ${className}">${escapeHtml(entry.value)}</span>`).join("")}
            </span>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function renderTagPill(state: AppState, tag: string, fallbackClass = ""): string {
  const label = getTagLabel(state, tag);
  return `<span class="mini-tag ${fallbackClass}">${escapeHtml(label.rubric)} · ${escapeHtml(label.value)}</span>`;
}

function renderAtmosphereTile(reference: ReferenceRecord, className = "atmosphere-tile"): string {
  const palette = getPalette(reference);
  const classes = className.includes("atmosphere-tile") ? className : `atmosphere-tile ${className}`;
  return `
    <span
      class="${classes}"
      style="--tone-a:${palette[0]};--tone-b:${palette[1]};--tone-c:${palette[2]};--tone-d:${palette[3]}"
      aria-hidden="true"
    ></span>
  `;
}
