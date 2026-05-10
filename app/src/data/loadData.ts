import referencesSeed from "../../../data/references_seed.json";
import taxonomySeed from "../../../data/taxonomy_seed.json";
import type { ReferencesDataset, TaxonomyDataset } from "../types";

export interface LoadedSeedData {
  taxonomy: TaxonomyDataset;
  referencesDataset: ReferencesDataset;
}

export async function loadSeedData(): Promise<LoadedSeedData> {
  return {
    taxonomy: taxonomySeed as TaxonomyDataset,
    referencesDataset: referencesSeed as ReferencesDataset
  };
}
