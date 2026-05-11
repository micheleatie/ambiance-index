# Audit Taxonomie - Lot 04

Date : 2026-05-11

## Portée

Audit des références 61 à 80 de `data/references_seed.json`. Ce lot couvre la fin des références matière/mémoire/high-tech et le début des références paysage/eau/climat/nature.

Critères appliqués :

- garder les caractéristiques physiques du côté des dispositifs, matières, contextes sonores ou thermiques observables ;
- garder les effets visuels, sonores, thermiques, olfactifs, affectifs, mémoriels et interprétatifs du côté des ressentis ;
- corriger les intentions quand elles confondent programme réel, relation au site, récit symbolique ou simple effet sensible.

Sources de travail : `data/reference_analysis_lot_3_validated.json`, `data/reference_analysis_lot_4_validated.json`, `data/reference_design_intentions_v1.json`, `data/reference_sensory_enrichment_v1.json` et les sources propres aux fiches.

## Corrections Appliquées

- Centre culturel Jean-Marie Tjibaou : ajout de `climate_intention:ventiler naturellement`, car la ventilation passive est centrale dans le rapport au vent.
- Terminal de l'aéroport du Kansai : remplacement de `social_intention:travailler` par `social_intention:rassembler`, faute de tag `transiter`, et ajout de `climate_intention:ventiler naturellement`.
- Guggenheim Bilbao : remplacement de `site_intention:cadrer le paysage` par `site_intention:ouvrir sur la ville`, et ajout de `symbolic_intention:faire icône`.
- Vitra Design Museum : retrait de `spatial_intention:plan libre`, trop peu adapté à ce bâtiment fragmenté.
- Tate Modern : remplacement de `symbolic_intention:commémorer` par `symbolic_intention:moderniser une institution`, la mémoire industrielle restant portée par les effets de mémoire.
- Dominus Winery : remplacement de `social_intention:rassembler` par `social_intention:travailler`, et ajout de `climate_intention:exploiter l'inertie`.
- Beijing National Stadium : retrait de `material_intention:exprimer le brut`, car l'enjeu est plutôt structurel et iconique.
- MASP : retrait du doublon `site_intention:cadrer le paysage`, déjà couvert par `site_intention:ouvrir sur la ville`, et remplacement de `symbolic_intention:représenter le pouvoir` par `symbolic_intention:moderniser une institution`.
- SESC Pompéia : remplacement de `symbolic_intention:commémorer` par `symbolic_intention:mettre en scène le quotidien`.
- Villa d'Este : retrait de `social_intention:rassembler`, trop générique pour la logique paysagère et hydraulique.
- Taj Mahal : retrait de `social_intention:se retirer`, la logique mémorielle étant déjà portée par `symbolic_intention:commémorer`.
- Ryōan-ji : remplacement de `site_intention:cadrer le paysage` par `site_intention:s'isoler du contexte`, et remplacement de `social_intention:rassembler` par `social_intention:se retirer`.
- Ise Jingū : retrait de `climate_intention:rafraîchir par l'eau`, non étayé par les tags physiques actuels, et ajout de `symbolic_intention:renouveler une tradition`.
- Casa Gilardi : remplacement de `site_intention:cadrer le paysage` par `site_intention:s'isoler du contexte`, retrait de `social_intention:rassembler` et `social_intention:se retirer`, ajout de `perceptual_intention:surprendre`.
- 21st Century Museum of Contemporary Art, Kanazawa : remplacement de `site_intention:cadrer le paysage` par `site_intention:ouvrir sur la ville`, et ajout de `social_intention:démocratiser la culture`.
- Rolex Learning Center : retrait de `site_intention:ouvrir sur la ville`, trop urbain pour ce campus, et ajout de `spatial_intention:parcours fluide`.

## Synthèse Par Référence

| # | Référence | Verdict taxonomique | Points de vigilance |
| --- | --- | --- | --- |
| 61 | Centre culturel Jean-Marie Tjibaou | Bois, métal, verre, végétation, vent, ventilation et mémoire culturelle sont cohérents. | Les odeurs boisées/végétales restent des inférences depuis les matériaux et le site. |
| 62 | Terminal de l'aéroport du Kansai | Toiture, métal, verre, lumière diffuse, flux, ventilation et clarté d'orientation sont cohérents. | `rassembler` est un palliatif : une future taxonomie devrait ajouter `transiter` ou `accueillir des flux`. |
| 63 | Guggenheim Bilbao | Correction faite : la relation est urbaine et iconique. Matières réfléchissantes, parcours exploratoire et effets monumentaux sont cohérents. | `visual_effect:paysage` décrit la perception du site/Nervión, pas une caractéristique physique. |
| 64 | Walt Disney Concert Hall | Métal, bois, lumière réfléchie, parcours fluide et effets sonores musicaux sont cohérents. | `démocratiser la culture` est conservé comme intention d'équipement culturel public. |
| 65 | Vitra Design Museum | Correction faite : le bâtiment relève davantage du parcours exploratoire et du labyrinthe que du plan libre. | Les effets `étrange`, `abstrait` et `suggestif` sont interprétatifs. |
| 66 | Tate Modern | Correction faite : la reconversion modernise l'institution ; la mémoire industrielle reste un effet de temps. | `exprimer le brut` reste acceptable ici car la matérialité industrielle est centrale. |
| 67 | Dominus Winery | Correction faite : le programme relève du travail/productif ; la masse de pierre porte aussi une logique d'inertie. | Le terme ancien `tempéré` reste exclu de l'app ; on garde plutôt les intentions climatiques précises. |
| 68 | Beijing National Stadium | Correction faite : l'enjeu est la structure visible, l'événement et l'icône, pas l'expression brute de la matière. | `grandiose` et `impressionnant` restent des effets interprétatifs. |
| 69 | MASP | Correction faite : relation urbaine, démocratisation culturelle et modernisation institutionnelle sont plus justes. | `exprimer le brut` reste acceptable pour l'expression du béton et de la structure suspendue. |
| 70 | SESC Pompéia | Correction faite : la reconversion met en scène le quotidien collectif plus qu'elle ne commémore. | Le projet garde à la fois `reconvertir l'existant` et `composer avec l'existant`, car les deux stratégies sont visibles. |
| 71 | Villa d'Este | Eau, fontaines, végétation, axe, fraîcheur et effets sonores continus sont bien séparés. | L'usage social reste volontairement non forcé ; la force du projet est paysagère, hydraulique et perceptive. |
| 72 | Taj Mahal | Correction faite : la mémoire est portée par `commémorer`, sans ajouter un programme de retrait. | La mélancolie est affective, tandis que le mémoriel relève du temps et du récit funéraire. |
| 73 | Ryōan-ji | Correction faite : le jardin s'isole du contexte et soutient un retrait contemplatif. | `sec` reste un effet thermique/atmosphérique ressenti du jardin sec, pas une mesure. |
| 74 | Ise Jingū | Correction faite : le cycle de reconstruction relève de `renouveler une tradition`; le rafraîchissement par l'eau a été retiré. | `sauvage` reste une ambiance de milieu liée à la forêt sacrée. |
| 75 | Casa Gilardi | Correction faite : le projet est introverti et domestique ; le cadrage de paysage et les intentions sociales trop larges sont retirés. | L'effet de surprise est plus juste que `rassembler` pour la séquence eau/couleur/lumière. |
| 76 | Cuadra San Cristóbal | Eau, couleur rose, terre, sons aquatiques, cadrage et identité sont cohérents. | `séquence rituelle` reste une hypothèse liée aux seuils et portails ; à sourcer plus finement. |
| 77 | Fondation Cartier | Verre, métal, végétation, saison, reflet, transparence et jardin sont cohérents. | `cadrer le paysage` et `fusionner avec la nature` peuvent coexister car le jardin est à la fois cadre et milieu. |
| 78 | Bloch Building, Nelson-Atkins Museum | Verre, lumière diffuse, paysage, parcours sinueux, douceur et contemplation sont cohérents. | Le dispositif ancien `volume lumineux` reste reformulé par lumière diffuse, verre et effet guidant. |
| 79 | 21st Century Museum of Contemporary Art | Correction faite : ouverture urbaine, transparence et démocratisation culturelle sont plus justes que simple cadrage du paysage. | `jardiné` est désormais traité comme caractéristique végétale/paysagère, pas comme ambiance symbolique. |
| 80 | Rolex Learning Center | Correction faite : le campus conserve `cadrer le paysage` et `fusionner avec la nature`, mais pas `ouvrir sur la ville`; le parcours fluide est ajouté. | `jardiné` est désormais traité comme présence paysagère composée liée aux patios et au paysage intérieur. |

## Règles Retenues Pour La Suite

- Ajouter à terme des intentions de programme manquantes : `transiter`, `produire`, `accueillir`, `jouer`, car `rassembler` sert parfois de compromis trop large.
- Ne pas confondre mémoire industrielle et commémoration : une reconversion peut produire un effet mémoriel sans avoir pour intention principale de commémorer.
- Pour les jardins introvertis ou maisons refermées, préférer `s'isoler du contexte` à `cadrer le paysage` quand la relation principale est l'intériorité.
- Pour les équipements culturels très ouverts, `démocratiser la culture` peut compléter `exposer`, mais ne doit pas remplacer le programme réel.
- Les valeurs sensorielles ajoutées par enrichissement restent souvent des inférences ; il faut conserver cette prudence dans les futures fiches de justification.
