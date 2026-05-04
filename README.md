# Plateforme De Références Architecturales Par Ambiances

Ce projet prépare une plateforme pédagogique pour architectes. L'objectif est de permettre la recherche de références architecturales à partir d'index d'ambiances : lumière, son, matière, température, odeur, parcours, intimité, monumentalité, mystère, mémoire, etc.

La phase actuelle combine une base de recherche et un premier prototype navigable.

## Contenu Actuel

- `research/02-taxonomie-ambiances.md` décrit les catégories et micro-rubriques.
- `research/03-corpus-references.md` liste les premières références architecturales à indexer.
- `research/04-methode-corpus-100-et-extraction.md` décrit la méthode d'analyse des textes vers les mots et tags.
- `data/taxonomy_seed.json` et `data/references_seed.json` donnent une base structurée pour une future application. La base indexée contient actuellement 100 références.
- `data/reference_candidates_100.json` conserve la liste cible de 100 références maintenant indexées.
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
- `app/` contient un prototype web statique pour explorer la base.
- `SOURCES.md` garde les sources utilisées.

## Lancer Le Prototype

Depuis la racine du projet :

```sh
python3 -m http.server 4173
```

Puis ouvrir :

```text
http://127.0.0.1:4173/app/
```

Si le port `4173` est déjà occupé, utiliser par exemple `4174` et ouvrir `http://localhost:4174/app/`.

Le prototype charge les JSON depuis `data/`, donc il doit être servi par un petit serveur local plutôt qu'ouvert directement en `file://`.

## Prochaine Étape

Tester dans le prototype les combinaisons qui étaient pauvres ou vides avant l'enrichissement, notamment lumière + matière + ambiance subjective, puis ajouter un niveau de confiance et des justifications sourcées affichables.
