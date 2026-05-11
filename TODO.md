# TODO

## Fait

- [x] Créer la mémoire locale du projet.
- [x] Cadrer la plateforme et son modèle conceptuel.
- [x] Produire une première taxonomie des ambiances.
- [x] Produire un premier corpus de références emblématiques.
- [x] Créer des données structurées de départ pour la future application.
- [x] Créer un premier prototype web statique avec recherche, filtres, fiches et annotation locale.
- [x] Vérifier le prototype : chargement JSON, recherche, thèmes rapides, annotation locale, responsive mobile et console navigateur.
- [x] Créer un corpus candidat de 100 références connues à sourcer et analyser.
- [x] Formaliser la méthode sources -> mots extraits -> tags contrôlés.
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
- [x] Renommer le dépôt GitHub en `ambiance-index`, activer GitHub Pages avec la source GitHub Actions et vérifier l'URL publique.
- [x] Préparer le flux de suggestion public modéré avec Google Apps Script, Google Sheets privée et soumission en arrière-plan depuis l'interface.
- [x] Corriger l'affichage mobile des longs panneaux de filtres pour éviter le chevauchement entre `Ambiances` et `Intentions architecturales`.
- [x] Clarifier la taxonomie existante : caractéristiques physiques, effets ressentis et intentions de conception.
- [x] Reclasser la taxonomie autour de caractéristiques physiques et d'effets ressentis par registre perceptif.
- [x] Intégrer les anciennes rubriques de seuils, cadrages, filtres et strates aux caractéristiques physiques ou aux effets ressentis, et séparer les effets thermiques des effets corporels.
- [x] Resserrer `Couleur` et `Éléments architecturaux` sur des valeurs observables, puis rattacher les termes interprétatifs comme mystérieux, abstrait ou étrange aux effets symboliques.
- [x] Regrouper ouvertures, vues, cadrages et abris en une seule rubrique, et déplacer compression/dilatation vers les effets visuels.
- [x] Déplacer `intime` des effets corporels vers les effets affectifs, en gardant l'usage sonore séparé.
- [x] Remplacer les rubriques `Formes...` et `Ouvertures...` par `Dispositifs lumineux` et `Dispositifs spatiaux`, déplacer les qualités de transparence/cadrage vers les effets visuels et retirer `volume lumineux`.
- [x] Séparer les effets affectifs des effets d'ambiance, déplacer `impressionnant` vers les interprétatifs et rattacher `abrité` / `refuge` aux affectifs.
- [x] Déplacer `convivial` et `généreux` des effets d'ambiance vers les effets affectifs pour mieux distinguer tonalité relationnelle et régime d'usage.
- [x] Déplacer `inspirant` et `stimulant` des effets d'ambiance vers les effets symboliques et interprétatifs.
- [x] Séparer les ambiances d'usage, les ambiances symboliques/de milieu et les effets interprétatifs ; retirer `sauvage` / `domestiqué` des caractéristiques végétales.
- [x] Déplacer `domestique` vers les ambiances d'usage/programme et remplacer `domestiqué` par `jardiné` pour éviter la confusion.
- [x] Déplacer `douloureux` et `mélancolique` des effets de mémoire vers les effets affectifs.
- [x] Déplacer `Traces et strates` hors des caractéristiques physiques vers les ambiances d'usage, programme et transformation.
- [x] Renommer `Effets thermiques` en `Effets thermiques ressentis` et déplacer les odeurs vers `Effets olfactifs ressentis` en retirant `clos`.
- [x] Distinguer les caractéristiques acoustiques physiques des effets sonores ressentis.
- [x] Simplifier l'acoustique : garder seulement les sources/contextes sonores côté caractéristiques et déplacer les qualités d'écoute vers les effets ressentis.
- [x] Séparer les sources/contextes thermiques des effets thermiques ressentis et clarifier que l'odorat reste traité comme effet ressenti.
- [x] Clarifier `bruit mécanique`, replacer `humide` / `sec` dans les effets thermiques, retirer `tempéré`, `minéral` et `ancien` des effets ressentis ambigus.
- [x] Déplacer `strate` des ambiances d'usage vers les effets de mémoire et de temps.
- [x] Auditer le lot 1 de 20 références et corriger les reclassements évidents avant finalisation.
- [x] Auditer le lot 2 de 20 références, corriger les intentions de programme trop générales et retirer les usages ambigus de `organique` / `exprimer le brut`.
- [x] Auditer le lot 3 de 20 références, préciser les programmes (`soigner`, `exposer`, `travailler`, `célébrer`) et corriger les relations au site urbain ou mémoriel.
- [x] Auditer le lot 4 de 20 références, corriger les intentions de site/paysage, les programmes trop larges et les confusions entre mémoire, icône et quotidien.
- [x] Auditer le lot 5 de 20 références, corriger les relations urbaines trop paysagères, les programmes publics trop génériques et les intentions matérielles abusives.
- [x] Auditer le lot 6 de 20 références, corriger les icônes, infrastructures, logements expérimentaux et reconversions du canon complémentaire.
- [x] Faire une passe transversale sur les 120 références et déplacer `cérémoniel` hors des effets sonores vers les ambiances symboliques.
- [x] Réintroduire `organique` comme effet interprétatif pour la Sagrada Família, sans le confondre avec une présence végétale.
- [x] Déplacer `jardiné` vers les caractéristiques végétales et ajouter `organique` à d'autres références comme effet interprétatif.
- [x] Ajouter les métadonnées SEO, la balise Google Search Console et un sitemap XML public.

## À Faire Ensuite

- [ ] Vérifier une soumission depuis le site public après redéploiement Apps Script.
- [ ] Définir le fichier canonique des annotations approuvées et le processus de passage de Google Sheets vers `data/`.
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
