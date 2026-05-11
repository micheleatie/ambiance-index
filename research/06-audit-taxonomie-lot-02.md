# Audit Taxonomie - Lot 02

Date : 2026-05-11

## Portée

Audit des références 21 à 40 de `data/references_seed.json`, avec le même critère que le lot 01 :

- caractéristiques physiques : dispositifs, matières, contextes ou éléments observables ;
- effets ressentis : perception visuelle, corporelle, sonore, thermique, olfactive, affective, symbolique ou mémorielle ;
- intentions de conception : stratégie de projet, seulement quand elle est explicitement documentée ou prudemment inférée.

Cette passe n'est pas une nouvelle recherche bibliographique exhaustive. Elle s'appuie sur les fichiers déjà présents dans le dépôt, notamment `data/reference_analysis_lot_1_validated.json`, `data/reference_analysis_lot_2_validated.json`, `data/reference_sensory_enrichment_v1.json` et les sources enregistrées dans les fiches.

## Corrections Appliquées

- Sagrada Família : retrait de `vegetal_aspect:organique`, puis réintroduction de `symbolic_effect:organique`. Le terme décrit ici une analogie formelle ou structurelle, pas une présence végétale observable.
- Menil Collection : déplacement de l'ancien usage ambigu de `jardiné` vers `vegetal_aspect:verdure`, car il décrivait surtout un milieu paysager observable autour du bâtiment.
- Teshima Art Museum, Guggenheim Museum et Crown Hall : remplacement de `social_intention:rassembler` par une intention de programme plus précise (`exposer` ou `étudier`).
- Pavillon de Barcelone : remplacement de `social_intention:habiter` par `social_intention:exposer`, car le pavillon relève de la représentation/exposition plus que de l'habitat.
- Farnsworth House : retrait de `symbolic_intention:commémorer`, trop fragile pour une maison manifeste.
- Seagram Building : retrait de `site_intention:cadrer le paysage`, remplacé par une relation plus juste à la ville déjà présente dans la fiche.
- Villa Savoye, Maison Curutchet, Cathédrale de Brasília et Guggenheim Museum : retrait de `material_intention:exprimer le brut` quand le béton ne suffit pas à prouver une intention de brutalité matérielle.
- Chichu Art Museum et Teshima Art Museum : remplacement de `exprimer le brut` par `faire monolithe`, plus cohérent avec l'effet de masse enterrée ou continue.

## Synthèse Par Référence

| # | Référence | Verdict taxonomique | Points de vigilance |
| --- | --- | --- | --- |
| 21 | Notre-Dame de Paris | Lumière colorée, vitrail, voûte, pierre, hauteur, sacré et mémoire historique sont cohérents. | Les effets sonores et `climate_intention:exploiter l'inertie` restent des inférences prudentes depuis le grand volume et la masse maçonnée. |
| 22 | Sagrada Família | Correction faite : `organique` n'est plus une présence végétale, mais reste comme effet interprétatif. Lumière colorée, verticalité, sacré et effet impressionnant sont cohérents. | Garder `structure arborescente` comme mot-clé précis, avec `organique` comme lecture formelle. |
| 23 | Couvent de La Tourette | Béton brut, lumière zénithale/colorée, parcours progressif, ascèse et étude sont bien distingués. | Les effets sonores restent plausibles pour le volume conventuel mais non mesurés. |
| 24 | Menil Collection | Correction faite : le contexte paysager devient `vegetal_aspect:verdure`. Calme, domesticité et lumière diffuse sont cohérents. | Si l'on veut insister sur un paysage composé, utiliser désormais `vegetal_aspect:jardiné`, pas une ambiance symbolique. |
| 25 | Chichu Art Museum | Masse bétonnée, lumière naturelle variable, introversion et silence sont cohérents ; `faire monolithe` est plus juste que `exprimer le brut`. | `site_intention:cadrer le paysage` est à lire largement comme cadrage du site/ciel, pas comme panorama ouvert. |
| 26 | Teshima Art Museum | Eau, vent, nature, ventilation, humidité ressentie et ressourcement sont bien séparés. | Le son aquatique et le vent décrivent des sources/contextes ; `enveloppant` et `silencieux` restent des effets. |
| 27 | Louvre Abu Dhabi | Lumière filtrée, perforation, eau, contexte sonore extérieur et fraîcheur ressentie sont cohérents. | `thermal_effect:humide` et `thermal_effect:frais` doivent être compris comme ressentis, pas comme mesures de confort. |
| 28 | Institut du Monde Arabe | Claustra, métal, lumière filtrée, ombres découpées et ambiance intellectuelle sont cohérents. | Les effets symboliques restent liés au dispositif culturel et technique, pas à une sensation purement visuelle. |
| 29 | Guggenheim Museum New York | Atrium, rampe, oculus, parcours fluide, effet guidant et programme d'exposition sont cohérents. | Le contexte sonore public et la réverbération sont plausibles, mais gagneraient à être sourcés si affichés comme preuve. |
| 30 | Cathédrale de Brasília | Vitrail, béton, lumière intense/colorée, monumentalité, sacré et effet majestueux sont cohérents. | Le béton est gardé comme matière ; l'intention de brutalisme a été retirée. |
| 31 | Villa Rotonda | Axe, ordre, pierre, symétrie, panorama et centralité sont cohérents. | `majestueux` est une interprétation, pas une caractéristique physique. |
| 32 | Katsura Imperial Villa | Bois, eau, végétation, saison, parcours sinueux, cadrage et sérénité sont bien séparés. | Odeurs boisées/végétales et son feutré restent des inférences sensorielles. |
| 33 | Villa Savoye | Béton blanc, parcours progressif/fluide, ouverture, cadrage et rationalité sont cohérents. | Le béton ne suffit pas à justifier `exprimer le brut`, donc l'intention a été retirée. |
| 34 | Unité d'habitation de Marseille | Béton brut, parcours traversant, hauteur, monumentalité, domesticité et convivialité sont cohérents. | `site_intention:cadrer le paysage` reste acceptable via les vues et loggias, mais c'est une inférence à expliciter plus tard. |
| 35 | Maison Curutchet | Béton, filtre, promenade, cadrage, domesticité et rationalité sont cohérents. | Comme pour la Villa Savoye, l'intention de brutalisme matériel a été retirée. |
| 36 | Pavillon de Barcelone | Matières, eau miroir, lumière réfléchie, plan libre, transparence et abstraction sont cohérents. | Correction faite : la fonction est `exposer`, pas `habiter`. |
| 37 | Farnsworth House | Verre, métal, transparence, ouverture au paysage et contexte sonore naturel sont cohérents. | `memory_effect:fragile` reste une lecture patrimoniale ; l'intention de commémoration a été retirée. |
| 38 | Villa Tugendhat | Verre, métal, pierre, lumière naturelle, plan libre, domesticité et transparence sont cohérents. | Les effets `stimulant` et `calme` relèvent bien de l'interprétation/affect, pas de l'aspect physique. |
| 39 | Seagram Building | Verre, métal, teinte dorée, structure, transparence, travail et austérité sont cohérents. | La relation au site est urbaine ; le cadrage paysager a été retiré. |
| 40 | S. R. Crown Hall | Verre, métal, grand volume ouvert, ambiance studieuse et intention d'étude sont cohérents. | `impressionnant` reste interprétatif, pas corporel ni affectif. |

## Règles Retenues Pour La Suite

- `organique` ne doit plus être utilisé comme présence végétale : si le terme désigne une structure, une géométrie ou une analogie, le classer comme `symbolic_effect:organique` et garder un mot-clé plus précis comme `structure arborescente`, `peau courbe` ou `architecture intégrée au site`.
- Un bâtiment d'exposition ne doit pas recevoir automatiquement `rassembler` : préférer `exposer` quand le programme principal est muséal ou pavillonnaire.
- Une école, bibliothèque ou halle pédagogique doit utiliser `étudier` quand l'usage principal est l'apprentissage ou le travail intellectuel.
- Le béton ne signifie pas automatiquement `exprimer le brut` : garder cette intention seulement quand le brut est central dans le discours ou l'expression matérielle.
- Les effets sonores, thermiques et olfactifs enrichis restent souvent des inférences pédagogiques ; il faudra un champ de niveau de preuve si l'app doit distinguer citation experte, source institutionnelle et hypothèse prudente.
