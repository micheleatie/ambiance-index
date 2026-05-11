# Audit Taxonomie - Lot 06

Date : 2026-05-11

## Portée

Audit des références 101 à 120 de `data/references_seed.json`. Ce lot correspond au canon complémentaire ajouté après le corpus initial de 100 références : grands équipements iconiques, infrastructures publiques, logements expérimentaux, reconversions et espaces culturels.

Critères appliqués :

- conserver les caractéristiques physiques dans les rubriques observables : matière, lumière, parcours, eau, sources sonores, exposition thermique ;
- conserver les effets ressentis dans les registres visuel, sonore, thermique, olfactif, affectif, corporel, mémoriel ou interprétatif ;
- éviter les intentions trop générales quand elles masquent le programme réel, notamment `rassembler`, `démocratiser la culture`, `cadrer le paysage` ou `exprimer le brut`.

Sources de travail : `data/reference_analysis_lot_6_expanded_canon.json`, `data/references_seed.json` et les sources propres aux fiches du lot 6.

## Corrections Appliquées

- Oslo Opera House : retrait de `site_intention:cadrer le paysage`; la relation principale est mieux décrite par `fusionner avec la nature` et `ouvrir sur la ville`.
- Yokohama International Passenger Terminal : remplacement de `symbolic_intention:moderniser une institution` par `symbolic_intention:exprimer une identité`, plus adapté à une infrastructure portuaire.
- TWA Flight Center : retrait de `material_intention:exprimer le brut`, déjà mieux décrit par `material_intention:faire monolithe` et `structure_intention:faire forme porteuse`.
- Yale Center for British Art : retrait de `sound_effect:intime`, car l'intimité est déjà portée par `affective_effect:intime`.
- Habitat 67 : retrait de `social_intention:rassembler`, trop générique pour le programme d'habitat, et retrait de `symbolic_intention:moderniser une institution`.
- Vanna Venturi House : déplacement de `sound_effect:intime` vers `affective_effect:intime`.
- Walden 7 : retrait de `material_intention:exprimer le brut`, moins pertinent que les intentions spatiales de labyrinthe et de fragmentation.
- Fondation Louis Vuitton : retrait de `site_intention:cadrer le paysage`; la relation au parc est mieux portée par `fusionner avec la nature`, la transparence et l'effet de paysage.
- Coupole du Reichstag : retrait de `social_intention:démocratiser la culture`, car l'enjeu est politique et civique plutôt que culturel.
- Bibliothèque Sainte-Geneviève : déplacement de `sound_effect:intime` vers `affective_effect:intime`.

## Synthèse Par Référence

| # | Référence | Verdict taxonomique | Points de vigilance |
| --- | --- | --- | --- |
| 101 | Sydney Opera House | Béton lisse, lumière intense, eau, panorama, monumentalité, icône et célébration sont cohérents. | `rassembler` est conservé car le programme associe spectacle et espace public. |
| 102 | Oslo Opera House | Pierre, bois, verre, toit public, exposition au climat, froid ressenti et convivialité sont cohérents. | `cadrer le paysage` a été retiré : le projet fusionne avec le fjord et ouvre la ville plutôt qu'il ne cadre seulement une vue. |
| 103 | Yokohama International Passenger Terminal | Parcours fluide, boucle, pont-promenade, paysage portuaire et désorientation sont cohérents. | `rassembler` reste un palliatif faute de tag `transiter`. |
| 104 | Pyramide du Louvre | Verre, métal, entrée, atrium, lumière zénithale, transparence et modernisation institutionnelle sont cohérents. | `rassembler` est acceptable ici car la pyramide organise un hall d'accueil collectif. |
| 105 | TWA Flight Center | Béton lisse, monolithe, forme porteuse, flux et imaginaire du voyage sont cohérents. | `rassembler` reste un compromis : un futur tag `transiter` serait plus exact. |
| 106 | Gateway Arch | Métal lisse, axe, hauteur, vertige, mémoire et identité nationale sont cohérents. | `commémorer` est justifié par le statut de monument mémoriel. |
| 107 | Neue Nationalgalerie | Verre, métal, plan libre, grille, transparence, abstraction et exposition sont cohérents. | Les effets solennels et rationnels restent ressentis/interprétatifs, pas physiques. |
| 108 | Yale Center for British Art | Béton, bois, travertin, atrium, lumière zénithale, étude, calme et intimité sont cohérents. | L'intimité est affective, pas une qualité sonore autonome. |
| 109 | Habitat 67 | Béton brut, fragmentation, habitat, vues, domesticité et imaginaire collectif sont cohérents. | `rassembler` a été retiré pour ne pas écraser le programme principal d'habiter. |
| 110 | Nakagin Capsule Tower | Capsules, béton, métal, bruit mécanique, contrainte spatiale, fragilité et icône métaboliste sont cohérents. | `travailler` et `habiter` coexistent car le projet mêlait usages résidentiels et professionnels. |
| 111 | Vanna Venturi House | Brique, bois, entrée, domesticité, secret, jeu postmoderne et intimité sont cohérents. | L'intime est affectif ; le sonore n'est pas documenté comme tel. |
| 112 | La Muralla Roja | Couleur, contraste, labyrinthe, horizon, exposition et imaginaire dépaysant sont cohérents. | `cadrer le paysage` est gardé car le rapport à l'horizon côtier est structurant. |
| 113 | Walden 7 | Couleurs, atrium, labyrinthe, habitat collectif, convivialité et résonance sont cohérents. | La matière brute a été retirée ; l'enjeu est plus spatial, social et symbolique. |
| 114 | High Line | Végétation, saison, parcours traversant, reconversion, ville, mémoire et calme sont cohérents. | `rassembler` est gardé comme intention d'espace public. |
| 115 | Elbphilharmonie | Verre, brique, eau, panorama, musique, vertige, reconversion et icône sont cohérents. | `cadrer le paysage` est conservé pour les vues portuaires et la relation à l'eau. |
| 116 | Fondation Louis Vuitton | Verre, lumière réfléchie, parc, eau, transparence, onirisme et icône sont cohérents. | Le cadrage du paysage a été retiré au profit de la fusion avec le parc et de la transparence. |
| 117 | Mucem | Béton, résille, lumière filtrée, mer, horizon, ponts, porosité et identité méditerranéenne sont cohérents. | Les trois intentions `ancrer`, `cadrer` et `ouvrir` sont gardées car elles décrivent des relations distinctes au site. |
| 118 | Great Court du British Museum | Verre, métal, pierre, atrium, lumière zénithale, parcours fluide et modernisation muséale sont cohérents. | `démocratiser la culture` et `rassembler` peuvent coexister ici : institution culturelle et place intérieure publique. |
| 119 | Coupole du Reichstag | Verre, rampe, lumière, ventilation, pouvoir, mémoire et orientation civique sont cohérents. | `démocratiser la culture` a été retiré : la démocratisation est politique, non culturelle. |
| 120 | Bibliothèque Sainte-Geneviève | Pierre, métal, bois, voûte, ordre, étude, calme, protection et solennité sont cohérents. | L'intime est affectif ; le sonore reste `silencieux` et `feutré`. |

## Règles Retenues Pour La Suite

- Pour les infrastructures de transport, ajouter à terme une intention `transiter` ou `accueillir des flux`, car `rassembler` reste imprécis.
- Pour les bâtiments iconiques, ne pas cumuler automatiquement `cadrer le paysage`, `ouvrir sur la ville` et `créer un repère`; il faut distinguer vue, accessibilité urbaine et rôle de signal.
- Réserver `démocratiser la culture` aux institutions culturelles ; pour les lieux politiques, parler plutôt de représentation, transparence civique ou pouvoir.
- Employer `exprimer le brut` seulement quand la matérialité brute est une stratégie claire, pas dès qu'un projet contient du béton.
- Employer `intime` comme effet affectif sauf si une source décrit explicitement une qualité acoustique intime.
