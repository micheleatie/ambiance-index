# Audit Transversal De La Taxonomie

Date : 2026-05-11

## Portée

Passe transversale après l'audit des lots 1 à 6, sur les 120 références de `data/references_seed.json`.

Objectif : repérer les termes qui restaient cohérents localement mais problématiques à l'échelle du corpus, surtout quand un même mot glissait entre caractéristique physique, effet ressenti et ambiance symbolique.

## Correction Principale

`sound_effect:cérémoniel` a été retiré.

Raison : `cérémoniel` ne décrit pas une qualité d'écoute comparable à `réverbérant`, `feutré`, `silencieux`, `ample` ou `murmuré`. Il décrit plutôt le registre culturel ou symbolique d'un lieu : rite, solennité, liturgie, cérémonie.

Corrections appliquées :

- retrait de `cérémoniel` dans la rubrique `sound_effect` de `data/taxonomy_seed.json` ;
- remplacement de `sound_effect:cérémoniel` par `symbolic_atmosphere:rituel` pour les lieux religieux ou rituels ;
- remplacement par `symbolic_atmosphere:solennel` pour les lieux civiques déjà concernés ;
- remplacement des mots-clés libres `son cérémoniel` par `ambiance rituelle` ou `ambiance solennelle` ;
- mise à jour du thème rapide `Son et rituel` dans `app/src/constants.ts`, qui utilise maintenant `sound_effect:silencieux` avec `symbolic_atmosphere:sacré` et `symbolic_atmosphere:rituel`.

## Cas Conservé

`sound_effect:intime` est conservé uniquement pour Walt Disney Concert Hall.

Raison : dans le contexte d'une salle de concert, l'intimité peut désigner une qualité acoustique perçue, différente de l'intimité affective d'une maison, d'une bibliothèque ou d'un espace domestique. Les autres cas d'`intime` ont été déplacés vers `affective_effect:intime`.

## Règle Retenue

- Un terme sonore doit décrire ce que l'on entend ou la manière dont le son se propage.
- Un terme rituel, sacré, cérémoniel ou solennel doit aller dans `symbolic_atmosphere`.
- Un terme d'intimité doit aller dans `affective_effect`, sauf si le contexte acoustique est explicite.
