# Plateforme De Références Architecturales Par Ambiances

Ce projet prépare une plateforme pédagogique pour architectes. L'objectif est de permettre la recherche de références architecturales à partir d'index d'ambiances : lumière, son, matière, température, odeur, parcours, intimité, monumentalité, mystère, mémoire, etc.

La phase actuelle combine une base de recherche et un premier prototype navigable.

## Contenu Actuel

- `research/02-taxonomie-ambiances.md` décrit les catégories et micro-rubriques.
- `research/03-corpus-references.md` liste les premières références architecturales à indexer.
- `data/taxonomy_seed.json` et `data/references_seed.json` donnent une base structurée pour une future application.
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

Le prototype charge les JSON depuis `data/`, donc il doit être servi par un petit serveur local plutôt qu'ouvert directement en `file://`.

## Prochaine Étape

Améliorer les fiches références : images, citations courtes sourcées, score de pertinence pédagogique et annotations exportables.
