# Architecture Du Projet

## État Actuel

Le dépôt contient une base documentaire, des données de départ et un premier prototype web statique.

Objectif immédiat : tester les combinaisons d'ambiances sur les 100 références indexées, surtout les qualités sonores et multisensorielles, puis renforcer les justifications sourcées et les niveaux de confiance.

## Structure

- `AGENTS.md` : règles locales du projet.
- `README.md` : résumé utilisateur du projet.
- `TODO.md` : plan de travail.
- `SOURCES.md` : bibliographie et sources web.
- `research/01-cadrage-plateforme.md` : cadrage produit et méthode de constitution de la base.
- `research/02-taxonomie-ambiances.md` : taxonomie initiale des ambiances physiques et subjectives.
- `research/03-corpus-references.md` : premier corpus de références emblématiques.
- `research/04-methode-corpus-100-et-extraction.md` : méthode pour passer de 100 références candidates aux mots extraits puis aux tags validés.
- `data/taxonomy_seed.json` : version structurée de la taxonomie.
- `data/references_seed.json` : version structurée du premier corpus.
- `data/reference_candidates_100.json` : liste de contrôle du corpus cible de 100 références connues.
- `data/reference_analysis_lot_1_light_sacred_museums.json` : premier scan de sources, mots extraits et tags proposés pour 20 références lumière / sacré / musées.
- `data/reference_analysis_lot_1_validated.json` : validation v0 du lot 1 avec tags forts, moyens et fragiles.
- `data/reference_analysis_lot_2_modernist_domestic.json` : scan de sources, mots extraits et tags proposés pour 20 références modernistes / domestiques.
- `data/reference_analysis_lot_2_validated.json` : validation v0 du lot 2 avec tags forts, moyens et fragiles.
- `data/reference_analysis_lot_3_material_memory.json` : scan de sources, mots extraits et tags proposés pour 20 références matière / mémoire / réemploi.
- `data/reference_analysis_lot_3_validated.json` : validation v0 du lot 3 avec tags forts, moyens et fragiles.
- `data/reference_analysis_lot_4_landscape_climate.json` : scan de sources, mots extraits et tags proposés pour 20 références paysage / eau / climat / nature.
- `data/reference_analysis_lot_4_validated.json` : validation v0 du lot 4 avec tags forts, moyens et fragiles.
- `data/reference_analysis_lot_5_public_contemporary.json` : scan de sources, mots extraits et tags proposés pour les 10 dernières références publiques / urbaines / contemporaines.
- `data/reference_analysis_lot_5_validated.json` : validation v0 du lot 5 avec tags forts, moyens et fragiles.
- `data/reference_sensory_enrichment_v1.json` : passe transversale d'enrichissement des qualités sonores, olfactives, thermiques et immersives sur les 100 références.
- `app/index.html` : surface du prototype.
- `app/styles.css` : système visuel et mise en page responsive.
- `app/app.js` : chargement des données, filtres, recherche, fiche référence et annotation locale.

## Modèle Conceptuel

La future plateforme peut être pensée autour de ces objets :

- `Reference` : bâtiment, lieu, ensemble urbain ou paysage architectural.
- `Source` : article, page officielle, livre, notice patrimoniale, entretien ou discours expert.
- `Descriptor` : mot ou expression trouvée dans une source, par exemple `lumière diffuse`, `silence`, `caverneux`.
- `Rubric` : catégorie contrôlée, par exemple `lumière.intensité` ou `subjectif.contemplatif`.
- `Theme` : regroupement pédagogique, par exemple `ambiances lumineuses`, `matière et tactilité`, `mémoire et absence`.
- `Annotation` : lien entre une référence et une rubrique, avec intensité, justification, source et niveau de confiance.
- `ExpertNote` : annotation manuelle ajoutée plus tard par un expert.

## Phases Probables

1. Recherche et taxonomie : corpus initial, micro-rubriques, vocabulaire contrôlé.
2. Prototype de données : import JSON/CSV, recherche filtrée, fiches références. En cours via `app/`.
3. Prototype web : interface de recherche pédagogique pour architectes. Première version créée.
4. Enrichissement : extraction de textes en ligne, suggestion automatique de mots-clés.
5. Plateforme experte : comptes, annotations manuelles, validation et révision.

## Point D'attention

La notion d'ambiance est hybride : elle combine paramètres physiques, perception corporelle, culture, mémoire et interprétation. Le modèle doit donc accepter l'incertitude, les sources contradictoires et les annotations multiples.

## Prototype Web

Le prototype est volontairement sans framework pour l'instant. Il permet de valider le modèle de données avant d'investir dans une app React/Next.js.

Fonctions disponibles :

- recherche libre sur nom, lieu, architecte, mots figuratifs et tags ;
- filtres par valeurs de rubriques ;
- thèmes rapides pour tester des combinaisons pédagogiques ;
- tri par pertinence, nom ou période ;
- fiche détaillée avec sources ;
- annotation expert locale stockée dans `localStorage`.

Limites actuelles :

- `data/references_seed.json` contient les 100 références candidates indexées dans l'app.
- `data/reference_candidates_100.json` conserve le corpus cible et sert maintenant de liste de contrôle complète.
- `data/reference_sensory_enrichment_v1.json` documente les ajouts sensoriels v1, avec des tags contextuels qui devront encore être transformés en citations courtes affichables.
- les fichiers `data/reference_analysis_lot_*_validated.json` contiennent les sélections v0 intégrées ou écartées.
- les annotations restent dans le navigateur et ne sont pas encore exportées dans les fichiers du projet.
