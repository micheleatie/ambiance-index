# Architecture Du Projet

## État Actuel

Le dépôt contient une base documentaire, des données de départ et un premier prototype web statique.

Objectif immédiat : stabiliser un vocabulaire d'ambiances, tester les données dans une interface de recherche, puis enrichir les fiches.

## Structure

- `AGENTS.md` : règles locales du projet.
- `README.md` : résumé utilisateur du projet.
- `TODO.md` : plan de travail.
- `SOURCES.md` : bibliographie et sources web.
- `research/01-cadrage-plateforme.md` : cadrage produit et méthode de constitution de la base.
- `research/02-taxonomie-ambiances.md` : taxonomie initiale des ambiances physiques et subjectives.
- `research/03-corpus-references.md` : premier corpus de références emblématiques.
- `data/taxonomy_seed.json` : version structurée de la taxonomie.
- `data/references_seed.json` : version structurée du premier corpus.
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

Limite actuelle : les annotations restent dans le navigateur et ne sont pas encore exportées dans les fichiers du projet.
