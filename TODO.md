# TODO

## Fait

- [x] Créer la mémoire locale du projet.
- [x] Cadrer la plateforme et son modèle conceptuel.
- [x] Produire une première taxonomie physique / subjective des ambiances.
- [x] Produire un premier corpus de références emblématiques.
- [x] Créer des données structurées de départ pour la future application.
- [x] Créer un premier prototype web statique avec recherche, filtres, fiches et annotation locale.
- [x] Vérifier le prototype : chargement JSON, recherche, thèmes rapides, annotation locale, responsive mobile et console navigateur.
- [x] Créer un corpus candidat de 100 références connues à sourcer et analyser.
- [x] Formaliser la méthode sources -> mots extraits -> tags physiques/subjectifs.
- [x] Créer un premier scan du lot 1 : 20 références, 3 sources minimum par référence, mots extraits et tags proposés.
- [x] Valider le lot 1 en distinguant tags forts, moyens et fragiles.
- [x] Intégrer 13 nouvelles références validées du lot 1 dans `data/references_seed.json`, ce qui porte l'app à 30 références indexées.
- [x] Traiter le lot 2 moderniste/domestique : 20 références, 60 sources, mots extraits et tags proposés.
- [x] Valider le lot 2 et intégrer 20 nouvelles références, ce qui porte l'app à 50 références indexées.
- [x] Traiter le lot 3 matière/mémoire : 20 références, 60 sources, mots extraits et tags proposés.
- [x] Valider le lot 3 et intégrer 20 nouvelles références, ce qui porte l'app à 70 références indexées.
- [x] Traiter le lot 4 paysage/eau/climat/nature : 20 références, 60 sources, mots extraits et tags proposés.
- [x] Valider le lot 4 et intégrer 20 nouvelles références, ce qui porte l'app à 90 références indexées.
- [x] Traiter le lot 5 public/urbain/contemporain : 10 références, 30 sources, mots extraits et tags proposés.
- [x] Valider le lot 5 et intégrer les 10 dernières références, ce qui porte l'app à 100 références indexées.
- [x] Enrichir transversalement les 100 références avec des qualités sonores, olfactives, thermiques et immersives v1.
- [x] Ajouter un thème rapide `Son et rituel` dans le prototype.
- [x] Vérifier le prototype après enrichissement : 100 références chargées, filtres sonores visibles, thème `Son et rituel` fonctionnel.
- [x] Corriger la logique des combinaisons : OU entre valeurs d'une même rubrique, ET entre rubriques différentes.
- [x] Ajouter une troisième couche `Intentions de conception` dans les données, les filtres et les fiches.
- [x] Annoter les 100 références avec des `intention_tags` v1.
- [x] Séparer visuellement les ambiances et les intentions dans l'interface avec deux panneaux de filtres.
- [x] Ajouter un lot 6 de 20 références canoniques complémentaires, ce qui porte l'app à 120 références indexées.
- [x] Valider le lot 6 : JSON lisible, tags normalisés, identifiants uniques et 3 sources minimum pour les nouvelles références.
- [x] Remplacer la note libre par des annotations expertes structurées par rubrique, stockées localement et exportables en JSON.
- [x] Ajouter l'identité minimale de l'expert aux annotations et remplacer la suppression directe par un retrait archivé localement.
- [x] Migrer le prototype vers Vite + TypeScript en conservant une interface statique sans framework.
- [x] Ajouter les scripts `npm run dev`, `npm run typecheck`, `npm run build` et `npm run preview`.
- [x] Ajouter un workflow GitHub Actions pour construire et déployer le site sur GitHub Pages.

## À Faire Ensuite

- [ ] Renommer le dépôt GitHub en `ambiance-index`, activer GitHub Pages avec la source GitHub Actions et vérifier l'URL publique.
- [ ] Ajouter un flux de suggestion public modéré, probablement via GitHub Issue Forms avant tout backend.
- [ ] Transformer les justifications v0 du lot 1 en citations courtes ou paraphrases affichables dans l'app.
- [ ] Tester plus finement les combinaisons multisensorielles et conceptuelles restantes, notamment silence + matière, eau + son, site + climat et parcours + matière.
- [ ] Ajouter dans l'interface un indicateur de nombre de sources et de niveau de confiance par référence.
- [ ] Relire et corriger la taxonomie avec un vocabulaire d'architecte plus précis.
- [ ] Ajouter un champ de score : fréquence de citation, autorité de la source, pertinence pédagogique.
- [ ] Décider si le prototype doit rester statique ou évoluer vers React/Next.js.
- [ ] Définir la fiche type d'une référence : images, sources, mots-clés, annotations, citations courtes, projets comparables.
- [ ] Ajouter des images ou vignettes fiables pour chaque référence.
- [ ] Définir le workflow de validation pour intégrer les exports d'annotations expertes dans les fichiers `data/`.
- [ ] Définir les vrais rôles de comptes pour les annotations : auteur, expert, modérateur et administrateur.
- [ ] Ajouter des citations courtes sourcées pour justifier les tags.

## Questions Ouvertes

- Faut-il commencer par un corpus international ou par un corpus français/européen ?
- Les références doivent-elles inclure uniquement des bâtiments visitables ou aussi des projets disparus, non construits, textes et installations ?
- Le vocabulaire doit-il rester académique ou être adapté à une recherche plus intuitive pour étudiants et praticiens ?
- Après le seuil de 120 références, faut-il continuer par lots canoniques internationaux ou rééquilibrer vers un corpus plus français/européen ?
