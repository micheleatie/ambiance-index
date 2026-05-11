# Audit Taxonomie - Lot 05

Date : 2026-05-11

## Portée

Audit des références 81 à 100 de `data/references_seed.json`. Ce lot couvre des équipements culturels, publics, sportifs, institutionnels et urbains de la fin du corpus initial de 100 références.

Critères appliqués :

- garder les caractéristiques physiques du côté des matières, dispositifs spatiaux, sources sonores et contextes thermiques observables ;
- garder les effets ressentis du côté des effets visuels, sonores, thermiques, olfactifs, affectifs, symboliques, mémoriels ou corporels ;
- corriger les intentions trop générales quand elles remplacent le programme réel, la stratégie urbaine ou la logique constructive.

Sources de travail : `data/reference_analysis_lot_4_validated.json`, `data/reference_analysis_lot_5_validated.json`, `data/reference_design_intentions_v1.json`, `data/reference_sensory_enrichment_v1.json` et les sources propres aux fiches.

## Corrections Appliquées

- Louvre-Lens : remplacement de `symbolic_intention:commémorer` par `site_intention:composer avec l'existant`, car la mémoire du bassin minier reste présente sans être une commémoration stricte.
- Sendai Mediatheque : retrait de `site_intention:cadrer le paysage`, déjà mieux couvert par `site_intention:ouvrir sur la ville`.
- Tama Art University Library : remplacement de `material_intention:exprimer le brut` par `material_intention:rendre tactile`.
- Niterói Contemporary Art Museum : remplacement de `material_intention:exprimer le brut` par `structure_intention:faire forme porteuse`.
- London Aquatics Centre : remplacement de `social_intention:démocratiser la culture` par `social_intention:rassembler`, plus adapté au programme sportif public.
- Boa Nova Tea House : remplacement de `material_intention:exprimer le brut` par `material_intention:rendre tactile`, et de `social_intention:habiter` par `social_intention:se retirer`.
- Stade municipal de Braga : retrait de `spatial_intention:plan libre`, peu adapté au stade taillé dans le site.
- Gando Primary School : remplacement de `site_intention:cadrer le paysage` par `site_intention:ancrer dans le site`, ajout de `climate_intention:protéger du soleil` et `climate_intention:ventiler naturellement`.
- Heydar Aliyev Center : remplacement de `site_intention:cadrer le paysage` par `site_intention:créer un repère`, et retrait de `material_intention:exprimer le brut`.
- National Museum of Western Art : remplacement de `material_intention:exprimer le brut` par `material_intention:rendre tactile`.
- Nordic Pavilion : retrait de `material_intention:exprimer le brut`, remplacement de `social_intention:rassembler` par `social_intention:exposer`, ajout de `climate_intention:filtrer la lumière`.
- Kiasma Museum : retrait de `material_intention:exprimer le brut`, trop générique pour ce cas.
- Seattle Central Library : retrait de `site_intention:cadrer le paysage`, doublon par rapport à `site_intention:ouvrir sur la ville`.
- CCTV Headquarters : retrait de `site_intention:cadrer le paysage`, remplacement de `social_intention:démocratiser la culture` par `social_intention:travailler`.
- Casa da Música : retrait de `site_intention:cadrer le paysage`; déplacement de `sound_effect:intime` vers `affective_effect:intime`.
- Kunsthal Rotterdam : retrait de `site_intention:cadrer le paysage`, déjà couvert par l'ouverture urbaine.
- Congrès national du Brésil : retrait de `material_intention:exprimer le brut`, remplacement de `social_intention:démocratiser la culture` par `social_intention:rassembler`, retrait de `sound_effect:cérémoniel`.
- MAXXI : remplacement de `site_intention:cadrer le paysage` par `site_intention:ouvrir sur la ville`, retrait de `material_intention:exprimer le brut`, ajout de `spatial_intention:parcours fluide`.

## Synthèse Par Référence

| # | Référence | Verdict taxonomique | Points de vigilance |
| --- | --- | --- | --- |
| 81 | Louvre-Lens | Métal, verre, lumière diffuse, paysage, calme et silence feutré sont cohérents. | La mémoire du site minier est un effet historique et une composition avec l'existant, pas une commémoration stricte. |
| 82 | Sendai Mediatheque | Verre, métal, lumière naturelle, plan libre, transparence, ville et usage public sont cohérents. | Le rapport principal est urbain ; `cadrer le paysage` était trop paysager. |
| 83 | Tama Art University Library | Béton, verre, voûtes, lumière naturelle, étude, calme et paysage sont cohérents. | La matière est davantage tactile que brutaliste. |
| 84 | Niterói Contemporary Art Museum | Béton, miroir d'eau, parcours progressif, vue panoramique et icône sont cohérents. | L'effet irréel/impressionnant est interprétatif ; la forme relève aussi d'une intention structurelle. |
| 85 | London Aquatics Centre | Bassins, toiture, verre, métal, humidité, odeur chlorée et son amplifié sont bien séparés. | `rassembler` reste un compromis : une future taxonomie pourrait ajouter une intention sportive ou événementielle. |
| 86 | Boa Nova Tea House | Pierre, bois, béton, seuil, vent, mer, abri et intimité sont cohérents. | Le programme relève plus du retrait contemplatif que de l'habiter domestique. |
| 87 | Serralves Museum | Végétation, pierre, blanc, lumière naturelle, calme et promenade sont cohérents. | Les effets olfactifs végétaux restent inférés depuis le parc. |
| 88 | Stade municipal de Braga | Pierre, béton, extérieur, foule, monumentalité, amplification et fête sont cohérents. | `plan libre` a été retiré ; la logique principale est le site, la structure et l'événement. |
| 89 | Gando Primary School | Terre, brique, toiture, ombre, ventilation, chaleur sèche, protection et apprentissage sont cohérents. | Les intentions climatiques doivent rester visibles car elles structurent le projet. |
| 90 | Heydar Aliyev Center | Blanc, verre, plan libre, fluidité, repère urbain, pouvoir et abstraction sont cohérents. | `exprimer le brut` était contradictoire avec la continuité lisse de l'enveloppe. |
| 91 | Capitol Complex de Chandigarh | Béton brut, axe, ordre, exposition thermique, solennité et pouvoir sont cohérents. | `rassembler` reste acceptable pour le programme civique, mais pourrait être précisé à terme. |
| 92 | National Museum of Western Art | Béton, atrium, lumière zénithale, parcours et rationalité sont cohérents. | La matérialité est gardée comme tactile plutôt que comme brutaliste. |
| 93 | Nordic Pavilion | Lumière filtrée, grille, béton, végétation, fraîcheur et calme sont cohérents. | L'intention d'exposer est plus précise que `rassembler`; le filtrage lumineux doit rester explicite. |
| 94 | Kiasma Museum | Lumière variable, métal, verre, béton, parcours sinueux, eau et animation sont cohérents. | `exprimer le brut` a été retiré ; la force du projet est plutôt spatiale et perceptive. |
| 95 | Seattle Central Library | Verre, métal, atrium, parcours, transparence, étude et générosité publique sont cohérents. | La relation urbaine suffit ; le cadrage de paysage était redondant. |
| 96 | CCTV Headquarters | Verre, métal, boucle structurelle, vertige, instabilité, travail et pouvoir sont cohérents. | Le programme est un siège de travail et de production médiatique, pas une démocratisation culturelle. |
| 97 | Casa da Música | Béton, verre, son musical, réverbération, fête, intimité et repère urbain sont cohérents. | `intime` est gardé comme effet affectif ; l'acoustique reste décrite par `musical`, `clair`, `réverbérant` et `enveloppant`. |
| 98 | Kunsthal Rotterdam | Béton, métal, verre, rampe, flux public, porosité et animation sont cohérents. | L'ouverture urbaine remplace le cadrage de paysage. |
| 99 | Congrès national du Brésil | Axe, symétrie, blanc, monumentalité, solennité et pouvoir sont cohérents. | `cérémoniel` n'est pas gardé comme effet sonore faute d'indice acoustique ; il reste porté par la solennité symbolique. |
| 100 | MAXXI | Béton, verre, métal, lumière filtrée, parcours sinueux, porosité et stimulation sont cohérents. | La logique principale est le champ urbain et le parcours fluide, pas l'expression brute de la matière. |

## Règles Retenues Pour La Suite

- Réserver `site_intention:cadrer le paysage` aux projets où le cadrage visuel du paysage est vraiment structurant ; pour les équipements urbains, préférer `ouvrir sur la ville` ou `créer un repère`.
- Réserver `material_intention:exprimer le brut` aux projets où la matière brute est volontairement centrale ; sinon utiliser une intention structurelle, tactile ou retirer l'intention matérielle.
- Ne pas utiliser `social_intention:démocratiser la culture` pour les programmes sportifs, civiques ou de bureaux.
- Déplacer `intime` et `cérémoniel` hors du son quand ils décrivent surtout une tonalité affective ou symbolique plutôt qu'une qualité acoustique.
- Ajouter à terme des intentions plus précises pour les programmes manquants : sport, gouvernement, production médiatique, transit et accueil.
