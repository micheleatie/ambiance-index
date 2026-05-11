# Architecture Du Projet

## État Actuel

Le dépôt contient une base documentaire, des données de départ et un prototype web statique Vite + TypeScript.

Objectif immédiat : utiliser GitHub Pages pour l'interface publique et Google Apps Script + Google Sheets comme file de suggestions expertes, sans exposer de données canoniques en écriture directe.

## Structure

- `AGENTS.md` : règles locales du projet.
- `README.md` : résumé utilisateur du projet.
- `TODO.md` : plan de travail.
- `SOURCES.md` : bibliographie et sources web.
- `sitemap.xml` : sitemap public du site GitHub Pages, copié dans `dist/` pendant le build.
- `robots.txt` : consignes publiques minimales pour les robots, copié dans `dist/` pendant le build.
- `research/01-cadrage-plateforme.md` : cadrage produit et méthode de constitution de la base.
- `research/02-taxonomie-ambiances.md` : taxonomie initiale des caractéristiques physiques, effets ressentis et intentions.
- `research/03-corpus-references.md` : premier corpus de références emblématiques.
- `research/04-methode-corpus-100-et-extraction.md` : méthode pour passer de 100 références candidates aux mots extraits puis aux tags validés.
- `data/taxonomy_seed.json` : version structurée de la taxonomie.
- `data/references_seed.json` : version structurée du premier corpus.
- `data/reference_candidates_100.json` : liste de contrôle du premier corpus cible de 100 références connues.
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
- `data/reference_analysis_lot_6_expanded_canon.json` : lot complémentaire de 20 références canoniques et publiques ajoutées après le corpus 100.
- `data/reference_sensory_enrichment_v1.json` : passe transversale d'enrichissement des qualités sonores, olfactives, thermiques et immersives sur le corpus.
- `data/reference_design_intentions_v1.json` : troisième couche d'indexation décrivant les intentions de conception.
- `package.json`, `tsconfig.json`, `vite.config.ts` : outillage Vite + TypeScript et scripts locaux.
- `.github/workflows/deploy-pages.yml` : build et déploiement GitHub Pages depuis `main`.
- `app/index.html` : surface du prototype et point d'entrée Vite.
- `app/styles.css` : système visuel et mise en page responsive.
- `app/src/` : application TypeScript modulaire : chargement des données, état, filtres, rendu, annotations, événements DOM et utilitaires.

## Modèle Conceptuel

La future plateforme peut être pensée autour de ces objets :

- `Reference` : bâtiment, lieu, ensemble urbain ou paysage architectural.
- `Source` : article, page officielle, livre, notice patrimoniale, entretien ou discours expert.
- `Descriptor` : mot ou expression trouvée dans une source, par exemple `lumière diffuse`, `silence`, `caverneux`.
- `Rubric` : catégorie contrôlée, par exemple `light_aspect:diffuse` ou `thermal_effect:frais`.
- `DesignIntent` : intention architecturale, par exemple `filtrer la lumière`, `rassembler`, `reconvertir l'existant`, `faire icône`.
- `Theme` : regroupement pédagogique, par exemple `lumière filtrée`, `matière et corps`, `mémoire et absence`.
- `Annotation` : lien entre une référence et une rubrique, avec intensité, justification, source et niveau de confiance.
- `ExpertNote` : annotation manuelle ajoutée par un expert, rattachée à une référence et à une rubrique, avec auteur, fonction, intervention, note, source courte, niveau de confiance et état de modération.

## Phases Probables

1. Recherche et taxonomie : corpus initial, micro-rubriques, vocabulaire contrôlé.
2. Prototype de données : import JSON/CSV, recherche filtrée, fiches références. En cours via `app/`.
3. Prototype web : interface de recherche pédagogique pour architectes. Première version créée.
4. Enrichissement : extraction de textes en ligne, suggestion automatique de mots-clés.
5. Plateforme experte : comptes, annotations manuelles, validation et révision.

## Point D'attention

La notion d'ambiance est hybride : elle combine paramètres physiques, perception corporelle, culture, mémoire et interprétation. Le modèle doit donc accepter l'incertitude, les sources contradictoires et les annotations multiples.

## Prototype Web

Le prototype est volontairement sans framework d'interface pour l'instant. Vite apporte le serveur local, le build et TypeScript, mais l'interface reste en DOM natif afin de valider le modèle de données avant d'investir dans une app React/Next.js.

Fonctions disponibles :

- recherche libre sur nom, lieu, architecte, mots figuratifs et tags ;
- filtres par valeurs de rubriques, séparés entre ambiances et intentions de conception ;
- thèmes rapides pour tester des combinaisons pédagogiques ;
- tri par pertinence, nom ou période ;
- fiche détaillée avec sources ;
- mise en page responsive : trois colonnes sur grand écran, deux colonnes `Références` + `Fiche` aux largeurs intermédiaires avec `Recherche` en panneau superposé repliable, puis pile verticale sur mobile ;
- séparation en fiche entre caractéristiques physiques, effets ressentis et intentions de conception ;
- suggestions expertes structurées par rubrique, soumises en arrière-plan vers Google Apps Script puis conservées comme traces locales exportables en JSON ;
- identité minimale de l'expert pour chaque annotation : nom, fonction ou rôle, organisation et email optionnels ;
- l'email personnel de la créatrice n'est pas publié dans le site ou les données structurées ; les emails saisis dans le formulaire restent des données de contact optionnelles propres aux contributions ;
- champs obligatoires, limites de longueur, honeypot et limitation locale à 3 soumissions par 10 minutes ;
- retrait local d'une annotation par son auteur local, conservé comme archive dans l'export plutôt que supprimé définitivement.
- effacement explicite des traces locales et de l'identité mémorisée dans le navigateur pour la référence ouverte.
- build statique déployable sur GitHub Pages avec base de production `/ambiance-index/`.
- les liens de sources sont limités aux URL `http`/`https` avant d'être rendus cliquables.

## Développement Local Et Déploiement

- Environnement recommandé : Node.js 24 LTS, indiqué dans `.nvmrc`.
- Installation : `npm install`.
- Serveur local : `npm run dev`, avec Vite servi depuis `app/` et base locale `/`.
- Vérifications : `npm run typecheck` puis `npm run build`.
- Prévisualisation production : `npm run preview`, avec base `/ambiance-index/`.
- Déploiement : GitHub Actions construit `dist/` depuis `main` et publie sur GitHub Pages.
- Configuration Vite durable : `root: "app"`, `build.outDir: "../dist"`, base de production `/ambiance-index/`.
- SEO : les métadonnées principales, la balise de vérification Google Search Console et le JSON-LD de la page d'accueil sont dans `app/index.html`; le sitemap canonique et `robots.txt` sont à la racine du dépôt et copiés vers `dist/` au build.

## Suggestions Publiques Modérées

- L'app reste statique : aucune donnée canonique n'est modifiée directement depuis le navigateur.
- Le formulaire `Suggestions expertes` poste vers l'URL Apps Script configurée dans `app/src/constants.ts`.
- L'URL Apps Script est publique par nature, mais elle ne donne accès qu'aux actions exposées par le script déployé.
- Le script Apps Script vit dans l'interface Google, pas dans le dépôt GitHub.
- La Google Sheet liée reste privée et sert seulement de file de modération.
- Le client applique les champs obligatoires, longueurs maximales, honeypot et limitation locale à 3 soumissions par 10 minutes.
- Le script Apps Script doit aussi valider côté serveur et journaliser les soumissions limitées, car les contrôles du navigateur ne sont pas fiables.
- Une suggestion ne devient publique qu'après validation manuelle et intégration dans les fichiers `data/` versionnés.

Limites actuelles :

- `data/references_seed.json` contient 120 références indexées dans l'app.
- `data/reference_candidates_100.json` conserve le premier corpus cible et sert maintenant de liste de contrôle complète pour les 100 premières références.
- `data/reference_sensory_enrichment_v1.json` documente les ajouts sensoriels v1, avec des tags contextuels qui devront encore être transformés en citations courtes affichables.
- `data/reference_design_intentions_v1.json` documente les intentions v1 ; elles doivent rester distinctes des sensations et être renforcées par citations ou annotations expertes.
- les fichiers `data/reference_analysis_lot_*_validated.json` contiennent les sélections v0 intégrées ou écartées.
- les données `data/` sont importées au build ; toute modification canonique reste une modification de fichiers JSON versionnés.
- les suggestions publiques sont seulement append dans une Google Sheet privée ; l'approbation, la correction et l'intégration dans `data/` restent manuelles.
- la limitation serveur Apps Script journalise les abus probables, mais elle repose sur un identifiant navigateur et des métadonnées déclarées, donc elle ne remplace pas la modération.
- les droits restent simulés côté navigateur : une vraie plateforme devra distinguer comptes auteurs, experts, modérateurs et administrateurs.
