# Cadrage De La Plateforme

## Intention

Créer une plateforme pédagogique pour architectes, étudiants et enseignants permettant de retrouver des références architecturales par qualités d'ambiance plutôt que seulement par architecte, programme, date ou style.

Le principe de départ :

1. Collecter des références souvent citées dans les discours architecturaux.
2. Extraire les mots et expressions employés pour décrire leurs ambiances.
3. Classer ces mots dans une taxonomie physique et subjective.
4. Permettre une recherche par choix combinés : par exemple `lumière > diffuse`, `matière > pierre`, `subjectif > contemplatif`, `spatialité > caverneux`.
5. À long terme, permettre à des experts d'annoter les références manuellement.

## Hypothèse De Travail

Une ambiance architecturale n'est pas seulement un style visuel. Elle résulte d'un assemblage :

- paramètres physiques : lumière, son, température, humidité, matière, couleur, géométrie, air, odeur ;
- perception corporelle : mouvement, posture, tactilité, seuils, compression, dilatation ;
- effets subjectifs : calme, mystère, sacré, intimité, oppression, joie, mémoire, orientation ;
- contexte culturel : religion, deuil, rituel, domesticité, prestige, paysage, patrimoine.

La plateforme doit donc accepter plusieurs lectures d'un même lieu.

## Méthode De Constitution De La Base

### Étape 1 : Corpus Manuel

Sélectionner des références très présentes dans l'enseignement et les médias architecturaux, puis associer chaque référence à des ambiances dominantes sourcées.

Cette étape permet de construire rapidement une base pédagogique cohérente, sans attendre une extraction automatique parfaite.

### Étape 2 : Vocabulaire Contrôlé

Transformer les mots trouvés en ligne en rubriques contrôlées :

- `tamisé`, `diffus`, `zénithal` deviennent des valeurs de la rubrique `lumière`.
- `caverneux`, `stratifié`, `rugueux` deviennent des valeurs de `matière` ou `spatialité`.
- `contemplatif`, `mystique`, `apaisant` deviennent des valeurs subjectives.

### Étape 3 : Annotation Sourcée

Chaque annotation doit conserver :

- la référence ;
- la rubrique ;
- la valeur ;
- l'intensité ;
- une justification courte ;
- la source ;
- le niveau de confiance.

### Étape 4 : Interface

L'interface pourra proposer :

- recherche par mots libres ;
- filtres par ambiances physiques ;
- filtres par ambiances subjectives ;
- cartes de thèmes pédagogiques ;
- fiche détaillée avec sources, images, mots-clés et références voisines.

## Limites De Cette Première Phase

Le corpus initial n'est pas encore une mesure bibliométrique réelle. Il s'agit d'une sélection raisonnée à partir de sources reconnues, de pages officielles, de textes théoriques et de références récurrentes dans la culture architecturale. Une phase ultérieure pourra compter les occurrences dans un corpus web ou académique.
