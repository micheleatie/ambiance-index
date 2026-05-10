export interface AppElements {
  datasetCount: HTMLElement;
  resetButton: HTMLButtonElement;
  activeFilterCount: HTMLElement;
  searchInput: HTMLInputElement;
  filters: HTMLElement;
  sortSelect: HTMLSelectElement;
  selectedTags: HTMLElement;
  resultsSummary: HTMLElement;
  resultsList: HTMLElement;
  detailEmpty: HTMLElement;
  detailCard: HTMLElement;
  quickThemes: HTMLElement;
}

export function getAppElements(): AppElements {
  return {
    datasetCount: getRequiredElement("#dataset-count"),
    resetButton: getRequiredElement("#reset-button"),
    activeFilterCount: getRequiredElement("#active-filter-count"),
    searchInput: getRequiredElement("#search-input"),
    filters: getRequiredElement("#filters"),
    sortSelect: getRequiredElement("#sort-select"),
    selectedTags: getRequiredElement("#selected-tags"),
    resultsSummary: getRequiredElement("#results-summary"),
    resultsList: getRequiredElement("#results-list"),
    detailEmpty: getRequiredElement("#detail-empty"),
    detailCard: getRequiredElement("#detail-card"),
    quickThemes: getRequiredElement(".quick-themes")
  };
}

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Élément introuvable : ${selector}`);
  }
  return element;
}
