const DATA_PATHS = {
  taxonomy: "../data/taxonomy_seed.json",
  references: "../data/references_seed.json"
};

const PRESETS = {
  light: ["light:filtrée", "light:colorée"],
  water: ["water:source", "water:bassin", "wellbeing_restoration:ressourçant"],
  memory: ["memory_absence:mémoriel", "memory_absence:absent"],
  refuge: ["intimacy_refuge:refuge", "inspiration_concentration:studieux"],
  matter: ["material_texture:pierre", "material_texture:béton"]
};

const TILE_PALETTES = {
  light: ["#e9d184", "#f7f3de", "#d4b35d", "#fffaf0"],
  water: ["#356c8b", "#d5e4e6", "#6a8c8e", "#f3f6f3"],
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
  els.filters.innerHTML = state.taxonomy.families
    .map((family) => {
      const rubrics = family.rubrics
        .map((rubric) => {
          const usedValues = rubric.values.filter((value) => counts.get(makeTag(rubric.id, value)));
          if (!usedValues.length) return "";
          const chips = usedValues
            .map((value) => {
              const tag = makeTag(rubric.id, value);
              const selected = state.selectedTags.has(tag);
              const count = counts.get(tag) ?? 0;
              return `
                <button class="tag-button ${selected ? "is-selected" : ""}" type="button" data-tag="${escapeHtml(tag)}">
                  ${escapeHtml(value)}
                  <span class="tag-count">${count}</span>
                </button>
              `;
            })
            .join("");
          return `
            <div class="filter-group">
              <h3>${escapeHtml(rubric.label)}</h3>
              <div class="tag-grid">${chips}</div>
            </div>
          `;
        })
        .join("");
      return rubrics ? `<div class="family-group" aria-label="${escapeHtml(family.label)}">${rubrics}</div>` : "";
    })
    .join("");

  els.filters.querySelectorAll("button[data-tag]").forEach((button) => {
    button.addEventListener("click", () => toggleTag(button.dataset.tag));
  });
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
            <span class="mini-tags">
              ${renderMiniTags(reference).join("")}
            </span>
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

  const noteKey = `expert-note:${selected.id}`;
  const savedNote = localStorage.getItem(noteKey) ?? "";

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

    <section class="detail-section expert-note">
      <label>
        Annotation expert locale
        <textarea id="expert-note" placeholder="Ajouter une observation, une correction ou une hypothèse d'indexation.">${escapeHtml(savedNote)}</textarea>
      </label>
      <span class="note-status" id="note-status">${savedNote ? "Annotation enregistrée dans ce navigateur." : "Aucune annotation locale."}</span>
    </section>
  `;

  const noteInput = els.detailCard.querySelector("#expert-note");
  const noteStatus = els.detailCard.querySelector("#note-status");
  noteInput.addEventListener("input", () => {
    localStorage.setItem(noteKey, noteInput.value);
    noteStatus.textContent = "Annotation enregistrée dans ce navigateur.";
  });
}

function renderMiniTags(reference) {
  const tags = [...reference.physical_tags.slice(0, 3), ...reference.subjective_tags.slice(0, 3)];
  return tags.map((tag) => renderTagPill(tag, getTagFamilyClass(tag)));
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
  const selected = [...state.selectedTags];
  const results = state.references.filter((reference) => {
    const tags = getAllTags(reference);
    const matchesTags = selected.every((tag) => tags.includes(tag));
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

function getAllTags(reference) {
  return [...reference.physical_tags, ...reference.subjective_tags];
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
