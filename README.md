# Ambiance Index

Ce projet prépare une plateforme pédagogique pour architectes. L'objectif est de permettre la recherche de références architecturales à partir d'index d'ambiances : lumière, son, matière, température, odeur, parcours, intimité, monumentalité, mystère, mémoire, etc.

La phase actuelle combine une base de recherche et un premier prototype navigable.

## Contenu Actuel

- `research/02-taxonomie-ambiances.md` décrit les catégories et micro-rubriques.
- `research/03-corpus-references.md` liste les premières références architecturales à indexer.
- `research/04-methode-corpus-100-et-extraction.md` décrit la méthode d'analyse des textes vers les mots et tags.
- `data/taxonomy_seed.json` et `data/references_seed.json` donnent une base structurée pour une future application. La base indexée contient actuellement 120 références.
- `data/reference_candidates_100.json` conserve la première liste cible de 100 références maintenant indexées.
- `data/reference_analysis_lot_1_light_sacred_museums.json` contient le premier scan de sources et de mots d'ambiance pour 20 références.
- `data/reference_analysis_lot_1_validated.json` distingue les tags forts, moyens et fragiles du premier lot.
- `data/reference_analysis_lot_2_modernist_domestic.json` contient le scan du lot moderniste/domestique.
- `data/reference_analysis_lot_2_validated.json` distingue les tags forts, moyens et fragiles du deuxième lot.
- `data/reference_analysis_lot_3_material_memory.json` contient le scan du lot matière/mémoire.
- `data/reference_analysis_lot_3_validated.json` distingue les tags forts, moyens et fragiles du troisième lot.
- `data/reference_analysis_lot_4_landscape_climate.json` contient le scan du lot paysage/eau/climat/nature.
- `data/reference_analysis_lot_4_validated.json` distingue les tags forts, moyens et fragiles du quatrième lot.
- `data/reference_analysis_lot_5_public_contemporary.json` contient le scan du dernier lot public/urbain/contemporain.
- `data/reference_analysis_lot_5_validated.json` distingue les tags forts, moyens et fragiles du cinquième lot.
- `data/reference_analysis_lot_6_expanded_canon.json` contient un lot complémentaire de 20 références canoniques et publiques pour élargir les combinaisons.
- `data/reference_sensory_enrichment_v1.json` documente une passe transversale d'enrichissement des qualités sonores, olfactives, thermiques et immersives.
- `data/reference_design_intentions_v1.json` documente une troisième couche d'indexation : les intentions de conception.
- `app/` contient un prototype web statique Vite + TypeScript pour explorer la base et saisir des annotations expertes locales par rubrique.
- `SOURCES.md` garde les sources utilisées.

## Lancer Le Prototype

Prérequis recommandé : Node.js 24 LTS.

Depuis la racine du projet :

```sh
npm install
npm run dev
```

Puis ouvrir :

```text
http://127.0.0.1:4173/
```

Si le port `4173` est déjà occupé, Vite proposera un autre port.

Commandes utiles :

```sh
npm run typecheck
npm run build
npm run preview
```

Le prototype est prévu pour être déployé sur GitHub Pages après renommage du dépôt en `ambiance-index`, avec une URL de projet du type `https://micheleatie.github.io/ambiance-index/`.

Les données canoniques restent dans `data/` et sont importées au moment du build. Les annotations expertes saisies dans l'interface sont stockées dans le navigateur et peuvent être exportées en JSON depuis la fiche d'une référence. Une annotation demande un nom, une fonction ou un rôle, une rubrique, une note et un niveau de confiance ; l'organisation et la source courte restent optionnelles. Une annotation peut être ajoutée par le bouton de la fiche ou avec ⌘+Entrée depuis le champ de note. Le bouton `Retirer` archive localement l'annotation au lieu de la supprimer définitivement.

## Prochaine Étape

Activer GitHub Pages après renommage du dépôt, puis ajouter un flux de suggestion public modéré, probablement via GitHub Issue Forms dans un premier temps.
