const DATA_PATHS = {
  taxonomy: "../data/taxonomy_seed.json?v=lot6-v1",
  references: "../data/references_seed.json?v=lot6-v1"
};

const PRESETS = {
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

const ANNOTATION_ACTIONS = [
  ["confirm", "Confirmer"],
  ["nuance", "Nuancer"],
  ["correct", "Corriger"],
  ["add", "Ajouter"],
  ["source_check", "Source à vérifier"],
  ["note", "Note"]
];

const CONFIDENCE_LEVELS = [
  ["high", "Haute"],
  ["medium", "Moyenne"],
  ["low", "Faible"],
  ["to_review", "À relire"]
];

const EXPERT_IDENTITY_STORAGE_KEY = "expert-annotation-author:v2";

const TILE_PALETTES = {
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

const state = {
  taxonomy: null,
  references: [],
  rubricLookup: new Map(),
  selectedTags: new Set(),
  query: "",
  sort: "relevance",
  selectedReferenceId: null,
  activePreset: null
};

let lastAnnotationSaveAt = 0;

const els = {
  datasetCount: document.querySelector("#dataset-count"),
  resetButton: document.querySelector("#reset-button"),
  activeFilterCount: document.querySelector("#active-filter-count"),
  searchInput: document.querySelector("#search-input"),
  filters: document.querySelector("#filters"),
  sortSelect: document.querySelector("#sort-select"),
  selectedTags: document.querySelector("#selected-tags"),
  resultsSummary: document.querySelector("#results-summary"),
  resultsList: document.querySelector("#results-list"),
  detailEmpty: document.querySelector("#detail-empty"),
  detailCard: document.querySelector("#detail-card"),
  quickThemes: document.querySelector(".quick-themes")
};

async function init() {
  try {
    const [taxonomy, references] = await Promise.all([
      fetchJson(DATA_PATHS.taxonomy),
      fetchJson(DATA_PATHS.references)
    ]);
    state.taxonomy = taxonomy;
    state.references = references.references;
    buildRubricLookup();
    state.selectedReferenceId = state.references[0]?.id ?? null;
    bindEvents();
    render();
  } catch (error) {
    renderLoadError(error);
  }
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${path}`);
  }
  return response.json();
}

function buildRubricLookup() {
  state.rubricLookup.clear();
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

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    state.activePreset = null;
    render();
  });

  els.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  els.resetButton.addEventListener("click", resetState);

  els.quickThemes.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-preset]");
    if (!button) return;
    applyPreset(button.dataset.preset);
  });

  document.addEventListener("click", handleDetailCardClick);
  document.addEventListener("pointerdown", handleDetailCardPointerDown);
  document.addEventListener("submit", handleDetailCardSubmit);
  document.addEventListener("input", handleDetailCardInput);
  document.addEventListener("keydown", handleDetailCardKeydown);
}

function resetState() {
  state.selectedTags.clear();
  state.query = "";
  state.sort = "relevance";
  state.activePreset = null;
  state.selectedReferenceId = state.references[0]?.id ?? null;
  els.searchInput.value = "";
  els.sortSelect.value = "relevance";
  render();
}

function applyPreset(presetId) {
  state.activePreset = state.activePreset === presetId ? null : presetId;
  state.selectedTags.clear();
  for (const tag of PRESETS[state.activePreset] ?? []) {
    state.selectedTags.add(tag);
  }
  render();
}

function render() {
  const results = getFilteredReferences();
  if (!results.some((reference) => reference.id === state.selectedReferenceId)) {
    state.selectedReferenceId = results[0]?.id ?? null;
  }

  els.datasetCount.textContent = `${state.references.length} références · ${state.rubricLookup.size} rubriques`;
  els.activeFilterCount.textContent = formatCount(state.selectedTags.size, "filtre");

  renderPresetButtons();
  renderFilters();
  renderSelectedTags();
  renderResults(results);
  renderDetail(results);
}

function renderPresetButtons() {
  els.quickThemes.querySelectorAll("button[data-preset]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === state.activePreset);
  });
}

function renderFilters() {
  const counts = countTags();
  const ambianceFamilies = state.taxonomy.families.filter((family) => family.id !== "design_intentions");
  const intentionFamilies = state.taxonomy.families.filter((family) => family.id === "design_intentions");

  els.filters.innerHTML = `
    <section class="filter-box" aria-label="Ambiances">
      <div class="filter-box-header">
        <h3>Ambiances</h3>
        <span>${formatCount(countUsedRubrics(ambianceFamilies, counts), "rubrique")}</span>
      </div>
      <div class="filter-list">
        ${ambianceFamilies.map((family) => renderFamilyFilters(family, counts, "chip")).join("")}
      </div>
    </section>

    <section class="filter-box intentions-filter-box" aria-label="Intentions architecturales">
      <div class="filter-box-header">
        <h3>Intentions architecturales</h3>
        <span>${formatCount(countUsedRubrics(intentionFamilies, counts), "rubrique")}</span>
      </div>
      <div class="filter-list">
        ${intentionFamilies.map((family) => renderFamilyFilters(family, counts, "list")).join("")}
      </div>
    </section>
  `;

  els.filters.querySelectorAll("button[data-tag]").forEach((button) => {
    button.addEventListener("click", () => toggleTag(button.dataset.tag));
  });
}

function renderFamilyFilters(family, counts, variant) {
  const rubrics = family.rubrics
    .map((rubric) => renderRubricFilter(rubric, counts, variant))
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

function renderRubricFilter(rubric, counts, variant) {
  const usedValues = rubric.values.filter((value) => counts.get(makeTag(rubric.id, value)));
  if (!usedValues.length) return "";

  const selectedCount = usedValues.filter((value) => state.selectedTags.has(makeTag(rubric.id, value))).length;
  const items = usedValues
    .map((value) => {
      const tag = makeTag(rubric.id, value);
      const selected = state.selectedTags.has(tag);
      const count = counts.get(tag) ?? 0;
      return `
        <button class="tag-button ${variant === "list" ? "tag-button-list" : ""} ${selected ? "is-selected" : ""}" type="button" data-tag="${escapeHtml(tag)}">
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

function renderSelectedTags() {
  const selected = [...state.selectedTags];
  els.selectedTags.innerHTML = selected
    .map((tag) => {
      const label = getTagLabel(tag);
      return `
        <span class="selected-tag">
          ${escapeHtml(label.value)}
          <span>${escapeHtml(label.rubric)}</span>
          <button type="button" aria-label="Retirer ${escapeHtml(label.value)}" data-remove-tag="${escapeHtml(tag)}">×</button>
        </span>
      `;
    })
    .join("");

  els.selectedTags.querySelectorAll("button[data-remove-tag]").forEach((button) => {
    button.addEventListener("click", () => toggleTag(button.dataset.removeTag));
  });
}

function renderResults(results) {
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
        <button class="reference-card ${active ? "is-active" : ""}" type="button" data-reference-id="${escapeHtml(reference.id)}">
          ${renderAtmosphereTile(reference)}
          <span class="reference-main">
            <span class="reference-title-row">
              <h3>${escapeHtml(reference.name)}</h3>
              <span class="reference-year">${escapeHtml(reference.year)}</span>
            </span>
            <span class="reference-meta">
              ${escapeHtml(reference.architect_or_period)} · ${escapeHtml(reference.location)}
            </span>
            ${renderReferenceTagBlock("Ambiances", getReferenceAmbianceTags(reference))}
            ${renderReferenceTagBlock("Intentions", getReferenceIntentionTags(reference), "intention-block")}
            <span class="keyword-row">
              ${reference.keywords_fr.slice(0, 5).map((keyword) => `<span class="keyword">${escapeHtml(keyword)}</span>`).join("")}
            </span>
          </span>
        </button>
      `;
    })
    .join("");

  els.resultsList.querySelectorAll("button[data-reference-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedReferenceId = button.dataset.referenceId;
      render();
    });
  });
}

function renderDetail(results) {
  const selected = results.find((reference) => reference.id === state.selectedReferenceId);
  els.detailEmpty.hidden = Boolean(selected);
  els.detailCard.hidden = !selected;

  if (!selected) {
    els.detailCard.innerHTML = "";
    return;
  }

  const annotations = getStoredAnnotations(selected);

  els.detailCard.innerHTML = `
    ${renderAtmosphereTile(selected, "detail-visual")}
    <h2>${escapeHtml(selected.name)}</h2>
    <p class="reference-meta">${escapeHtml(selected.architect_or_period)} · ${escapeHtml(selected.location)} · ${escapeHtml(selected.year)}</p>

    <section class="detail-section">
      <h3>Ambiances physiques</h3>
      <div class="mini-tags">
        ${selected.physical_tags.map((tag) => renderTagPill(tag, "physical")).join("")}
      </div>
    </section>

    <section class="detail-section">
      <h3>Ambiances subjectives</h3>
      <div class="mini-tags">
        ${selected.subjective_tags.map((tag) => renderTagPill(tag, "subjective")).join("")}
      </div>
    </section>

    <section class="detail-section intentions-detail-section">
      <h3>Intentions de conception</h3>
      ${renderGroupedTags(selected.intention_tags ?? [], "intention")}
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

    ${renderExpertAnnotations(selected, annotations)}
  `;

}

function renderExpertAnnotations(reference, annotations) {
  const expertIdentity = getSavedExpertIdentity();
  const activeAnnotations = annotations.filter((annotation) => !annotation.withdrawn_at);
  const withdrawnAnnotations = annotations.filter((annotation) => annotation.withdrawn_at);

  return `
    <section class="detail-section expert-annotations">
      <div class="annotation-header">
        <h3>Annotations expertes</h3>
        <button class="ghost-button annotation-export" type="button" ${annotations.length ? "" : "disabled"}>
          Exporter JSON
        </button>
      </div>

      <div class="annotation-list">
        ${
          activeAnnotations.length
            ? activeAnnotations.map((annotation) => renderExpertAnnotation(annotation)).join("")
            : `<p class="muted-line">Aucune annotation active.</p>`
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
            <input name="expert_name" type="text" required autocomplete="name" value="${escapeAttribute(expertIdentity.name)}" />
          </label>

          <label>
            <span>Fonction / rôle</span>
            <input name="expert_role" type="text" required placeholder="Architecte, enseignant..." value="${escapeAttribute(expertIdentity.role)}" />
          </label>

          <label>
            <span>Organisation</span>
            <input name="expert_organization" type="text" placeholder="Optionnel" value="${escapeAttribute(expertIdentity.organization)}" />
          </label>

          <label>
            <span>Rubrique</span>
            <select name="rubric_id" required>
              ${renderRubricOptions(reference)}
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
            <textarea name="note" required placeholder="Observation experte, correction ou hypothèse d'indexation."></textarea>
          </label>

          <label class="annotation-source-field">
            <span>Source ou référence courte</span>
            <input name="source" type="text" placeholder="Optionnel : entretien, livre, page, citation courte..." />
          </label>
        </div>

        <div class="annotation-actions">
          <button class="primary-button" type="submit" data-add-annotation>Ajouter l'annotation</button>
          <span class="note-status" id="annotation-status">Stockage local navigateur.</span>
        </div>
      </form>
    </section>
  `;
}

function renderExpertAnnotation(annotation) {
  const actionLabel = annotation.action_label ?? getAnnotationActionLabel(annotation.action);
  const confidenceLabel = annotation.confidence_label ?? getConfidenceLabel(annotation.confidence);
  const source = annotation.source?.trim();
  const authorLabel = getAnnotationAuthorLabel(annotation);
  const withdrawn = Boolean(annotation.withdrawn_at);

  return `
    <article class="annotation-entry ${withdrawn ? "is-withdrawn" : ""}">
      <div class="annotation-entry-header">
        <div>
          <div class="annotation-entry-title">
            <span class="annotation-rubric">${escapeHtml(annotation.rubric_label)}</span>
            <span class="annotation-pill">${escapeHtml(actionLabel)}</span>
            <span class="annotation-pill confidence">${escapeHtml(confidenceLabel)}</span>
            ${withdrawn ? `<span class="annotation-pill withdrawn">Retirée</span>` : ""}
          </div>
          <span class="annotation-author">${escapeHtml(authorLabel)}</span>
          <span class="annotation-date">
            ${escapeHtml(formatDateTime(annotation.created_at))}
            ${withdrawn ? ` · retirée le ${escapeHtml(formatDateTime(annotation.withdrawn_at))}` : ""}
          </span>
        </div>
        ${
          canWithdrawAnnotation(annotation)
            ? `<button class="annotation-delete" type="button" data-withdraw-annotation="${escapeAttribute(annotation.id)}">Retirer</button>`
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

function renderRubricOptions(reference) {
  const usedRubricIds = new Set(getAllTags(reference).map((tag) => tag.split(":")[0]));
  const usedRubrics = [...usedRubricIds]
    .map((rubricId) => getRubricMeta(rubricId))
    .filter((rubric) => rubric.id !== "general");
  const allRubrics = getAllRubrics().filter((rubric) => !usedRubricIds.has(rubric.id));

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

function renderRubricOption(rubric) {
  return `<option value="${escapeAttribute(rubric.id)}">${escapeHtml(rubric.familyLabel)} · ${escapeHtml(rubric.label)}</option>`;
}

function handleDetailCardClick(event) {
  const selected = getSelectedReference();
  if (!selected) return;
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  if (!target) return;

  if (target.closest("button[data-add-annotation]")) {
    saveExpertAnnotationFromForm(event, selected);
    return;
  }

  if (target.closest(".annotation-export")) {
    exportAnnotations(selected, getStoredAnnotations(selected));
    return;
  }

  const withdrawButton = target.closest("button[data-withdraw-annotation]");
  if (withdrawButton) {
    const annotations = getStoredAnnotations(selected).map((annotation) =>
      annotation.id === withdrawButton.dataset.withdrawAnnotation ? withdrawAnnotation(annotation) : annotation
    );
    saveStoredAnnotations(selected.id, annotations);
    render();
  }
}

function handleDetailCardPointerDown(event) {
  const selected = getSelectedReference();
  if (!selected) return;
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  if (!target?.closest("button[data-add-annotation]")) return;
  saveExpertAnnotationFromForm(event, selected);
}

function handleDetailCardSubmit(event) {
  if (!event.target.matches("#expert-annotation-form")) return;
  const selected = getSelectedReference();
  if (!selected) return;
  saveExpertAnnotationFromForm(event, selected);
}

function handleDetailCardInput(event) {
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  if (!target?.matches("#expert-annotation-form textarea[name='note']")) return;
  const status = els.detailCard.querySelector("#annotation-status");
  if (status && target.value.trim()) {
    status.textContent = "Annotation prête à ajouter.";
  }
}

function handleDetailCardKeydown(event) {
  const target = event.target instanceof Element ? event.target : event.target.parentElement;
  if (!target?.matches("#expert-annotation-form textarea[name='note']")) return;
  if (event.key !== "Enter" || (!event.metaKey && !event.ctrlKey)) return;
  const selected = getSelectedReference();
  if (!selected) return;
  saveExpertAnnotationFromForm(event, selected);
}

function getSelectedReference() {
  return state.references.find((reference) => reference.id === state.selectedReferenceId);
}

function saveExpertAnnotationFromForm(event, reference) {
  event.preventDefault();
  const now = Date.now();
  if (now - lastAnnotationSaveAt < 250) return;
  const form = els.detailCard.querySelector("#expert-annotation-form");
  const status = els.detailCard.querySelector("#annotation-status");
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
  annotations.push(createAnnotation(reference, data));
  saveExpertIdentity(data);
  saveStoredAnnotations(reference.id, annotations);
  lastAnnotationSaveAt = now;
  render();
}

function createAnnotation(reference, data) {
  const rubric = getRubricMeta(String(data.get("rubric_id")));
  const action = String(data.get("action") ?? "confirm");
  const confidence = String(data.get("confidence") ?? "high");

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

function getStoredAnnotations(reference) {
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

function parseStoredAnnotations(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((annotation) => annotation && typeof annotation === "object") : [];
  } catch {
    return [];
  }
}

function saveStoredAnnotations(referenceId, annotations) {
  localStorage.setItem(getAnnotationStorageKey(referenceId), JSON.stringify(annotations));
}

function createLegacyAnnotation(reference, note) {
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

function createExpertAuthor(data) {
  return {
    name: String(data.get("expert_name") ?? "").trim(),
    role: String(data.get("expert_role") ?? "").trim(),
    organization: String(data.get("expert_organization") ?? "").trim()
  };
}

function getSavedExpertIdentity() {
  try {
    const parsed = JSON.parse(localStorage.getItem(EXPERT_IDENTITY_STORAGE_KEY));
    return {
      name: typeof parsed?.name === "string" ? parsed.name : "",
      role: typeof parsed?.role === "string" ? parsed.role : "",
      organization: typeof parsed?.organization === "string" ? parsed.organization : ""
    };
  } catch {
    return {
      name: "",
      role: "",
      organization: ""
    };
  }
}

function saveExpertIdentity(data) {
  localStorage.setItem(EXPERT_IDENTITY_STORAGE_KEY, JSON.stringify(createExpertAuthor(data)));
}

function getAnnotationAuthorLabel(annotation) {
  const name = annotation.author?.name?.trim() || "Auteur non renseigné";
  const role = annotation.author?.role?.trim() || "fonction non renseignée";
  const organization = annotation.author?.organization?.trim();
  return organization ? `${name} · ${role} · ${organization}` : `${name} · ${role}`;
}

function canWithdrawAnnotation(annotation) {
  return !annotation.withdrawn_at && annotation.local_owner !== false;
}

function withdrawAnnotation(annotation) {
  if (!canWithdrawAnnotation(annotation)) return annotation;
  return {
    ...annotation,
    moderation_status: "withdrawn",
    withdrawn_at: new Date().toISOString(),
    withdrawn_by: "local_author"
  };
}

function exportAnnotations(reference, annotations) {
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

function getAnnotationStorageKey(referenceId) {
  return `expert-annotations:v1:${referenceId}`;
}

function getLegacyNoteStorageKey(referenceId) {
  return `expert-note:${referenceId}`;
}

function getAllRubrics() {
  return state.taxonomy.families.flatMap((family) =>
    family.rubrics.map((rubric) => ({
      ...rubric,
      familyId: family.id,
      familyLabel: family.label
    }))
  );
}

function getRubricMeta(rubricId) {
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
    familyLabel: rubric?.familyLabel ?? "Rubrique non reconnue"
  };
}

function getAnnotationActionLabel(action) {
  return ANNOTATION_ACTIONS.find(([value]) => value === action)?.[1] ?? action;
}

function getConfidenceLabel(confidence) {
  return CONFIDENCE_LEVELS.find(([value]) => value === confidence)?.[1] ?? confidence;
}

function makeAnnotationId(referenceId) {
  const suffix =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${referenceId}:${suffix}`;
}

function renderReferenceTagBlock(label, tags, className = "") {
  if (!tags.length) return "";
  return `
    <span class="reference-tag-block ${className}">
      <span class="tag-block-label">${escapeHtml(label)}</span>
      <span class="mini-tags">
        ${tags.map((tag) => renderTagPill(tag, getTagFamilyClass(tag))).join("")}
      </span>
    </span>
  `;
}

function getReferenceAmbianceTags(reference) {
  return [
    ...(reference.physical_tags ?? []).slice(0, 2),
    ...(reference.subjective_tags ?? []).slice(0, 2)
  ];
}

function getReferenceIntentionTags(reference) {
  return (reference.intention_tags ?? []).slice(0, 2);
}

function renderGroupedTags(tags, className = "") {
  if (!tags.length) return `<p class="muted-line">Non renseigné.</p>`;
  const groups = new Map();
  for (const tag of tags) {
    const label = getTagLabel(tag);
    if (!groups.has(label.rubric)) groups.set(label.rubric, []);
    groups.get(label.rubric).push({ tag, value: label.value });
  }

  return `
    <div class="grouped-tags">
      ${[...groups]
        .map(([rubric, entries]) => `
          <div class="grouped-tag-row">
            <span class="grouped-tag-label">${escapeHtml(rubric)}</span>
            <span class="mini-tags">
              ${entries.map((entry) => `<span class="mini-tag ${className}">${escapeHtml(entry.value)}</span>`).join("")}
            </span>
          </div>
        `)
        .join("")}
    </div>
  `;
}

function renderTagPill(tag, fallbackClass = "") {
  const label = getTagLabel(tag);
  return `<span class="mini-tag ${fallbackClass}">${escapeHtml(label.rubric)} · ${escapeHtml(label.value)}</span>`;
}

function renderAtmosphereTile(reference, className = "atmosphere-tile") {
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

function getFilteredReferences() {
  const selectedGroups = groupSelectedTagsByRubric();
  const results = state.references.filter((reference) => {
    const tags = getAllTags(reference);
    const matchesTags = matchesSelectedGroups(tags, selectedGroups);
    const matchesQuery = !state.query || getSearchText(reference).includes(state.query);
    return matchesTags && matchesQuery;
  });

  return results.sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name, "fr");
    if (state.sort === "period") return String(a.year).localeCompare(String(b.year), "fr");
    return scoreReference(b) - scoreReference(a) || a.name.localeCompare(b.name, "fr");
  });
}

function scoreReference(reference) {
  const tags = getAllTags(reference);
  let score = 0;
  for (const tag of state.selectedTags) {
    if (tags.includes(tag)) score += 5;
  }
  if (state.query && getSearchText(reference).includes(state.query)) score += 2;
  return score + reference.sources.length * 0.2 + reference.keywords_fr.length * 0.05;
}

function groupSelectedTagsByRubric() {
  const groups = new Map();
  for (const tag of state.selectedTags) {
    const rubricId = tag.split(":")[0];
    if (!groups.has(rubricId)) groups.set(rubricId, []);
    groups.get(rubricId).push(tag);
  }
  return [...groups.values()];
}

function matchesSelectedGroups(referenceTags, selectedGroups) {
  return selectedGroups.every((group) => group.some((tag) => referenceTags.includes(tag)));
}

function toggleTag(tag) {
  if (state.selectedTags.has(tag)) {
    state.selectedTags.delete(tag);
  } else {
    state.selectedTags.add(tag);
  }
  state.activePreset = null;
  render();
}

function countTags() {
  const counts = new Map();
  for (const reference of state.references) {
    for (const tag of getAllTags(reference)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

function countUsedRubrics(families, counts) {
  return families.reduce((total, family) => {
    const used = family.rubrics.filter((rubric) =>
      rubric.values.some((value) => counts.get(makeTag(rubric.id, value)))
    );
    return total + used.length;
  }, 0);
}

function getAllTags(reference) {
  return [
    ...(reference.physical_tags ?? []),
    ...(reference.subjective_tags ?? []),
    ...(reference.intention_tags ?? [])
  ];
}

function getSearchText(reference) {
  const tagText = getAllTags(reference).map((tag) => {
    const label = getTagLabel(tag);
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

function getTagLabel(tag) {
  const [rubricId, value] = tag.split(":");
  const rubric = state.rubricLookup.get(rubricId);
  return {
    rubric: rubric?.label ?? rubricId,
    value: value ?? tag,
    familyId: rubric?.familyId ?? "unknown"
  };
}

function getTagFamilyClass(tag) {
  const familyId = getTagLabel(tag).familyId;
  if (familyId === "design_intentions") return "intention";
  return familyId === "physical" || familyId === "experience_devices" ? "physical" : "subjective";
}

function getPalette(reference) {
  const allTags = getAllTags(reference);
  const found = allTags.map((tag) => tag.split(":")[0]).find((rubric) => TILE_PALETTES[rubric]);
  return TILE_PALETTES[found] ?? TILE_PALETTES.default;
}

function makeTag(rubricId, value) {
  return `${rubricId}:${value}`;
}

function formatCount(count, singular) {
  return `${count} ${singular}${count > 1 ? "s" : ""}`;
}

function formatDateTime(value) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function renderLoadError(error) {
  els.datasetCount.textContent = "Données indisponibles";
  els.resultsSummary.textContent = "Le prototype n'a pas pu charger les fichiers JSON.";
  els.resultsList.innerHTML = `
    <div class="empty-state">
      ${escapeHtml(error.message)}. Lance un serveur local depuis la racine du projet, par exemple : python3 -m http.server 4173
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

init();
