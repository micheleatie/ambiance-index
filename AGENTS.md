# AGENTS.md

## But du projet

Construire une plateforme pédagogique en ligne pour architectes permettant de rechercher des références architecturales par index d'ambiances, de qualités sensibles et de discours experts.

La première phase du projet consiste à constituer une base de références et une taxonomie d'ambiances à partir de sources en ligne, de littérature architecturale et de descriptions expertes.

## Documents de mémoire

- `ARCHITECTURE.md` : structure actuelle du dépôt et modèle conceptuel de la future plateforme.
- `TODO.md` : étapes courtes et décisions en attente.
- `SOURCES.md` : sources web et théoriques utilisées pour construire le corpus.
- `research/` : notes de recherche humaines, rédigées en français.
- `data/` : données de départ structurées pour une future application.
- `README.md` : this serves only as the user-facing, public README document. Use it as such, to document and explain functionality --- update it whenever anything relevant changes. Don't use it to keep to-do lists and such.

## Conventions

- Rédiger les notes de recherche en français.
- Séparer les faits sourcés, les hypothèses de catégorisation et les décisions produit.
- Une référence peut avoir plusieurs ambiances physiques et plusieurs ambiances subjectives.
- Ne pas confondre cause matérielle et effet ressenti : par exemple `lumière zénithale` est physique, `sacré` ou `contemplatif` est subjectif.
- Garder les données `data/*_seed.json` lisibles et faciles à corriger manuellement.

## Vérification

- Toute nouvelle source doit être ajoutée à `SOURCES.md`.
- Toute nouvelle rubrique durable doit être répercutée dans `research/02-taxonomie-ambiances.md` et, si elle sert à l'application, dans `data/taxonomy_seed.json`.
- Ne pas déclarer une taxonomie comme définitive sans test sur un corpus plus large.
