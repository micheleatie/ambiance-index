# Audit Taxonomie - Lot 01

Date : 2026-05-11

## Portée

Audit des 20 premières références de `data/references_seed.json`, avec un contrôle de cohérence entre :

- caractéristiques physiques : éléments observables ou dispositifs ;
- effets ressentis : perception, sensation, affect, interprétation ;
- intentions de conception : stratégie de projet, seulement quand elle est explicitement documentée ou prudemment inférée.

Cette passe ne constitue pas une nouvelle recherche bibliographique exhaustive. Elle s'appuie sur les sources et fichiers de validation déjà présents dans le dépôt, notamment `data/reference_analysis_lot_1_validated.json` et `data/reference_sensory_enrichment_v1.json`.

## Corrections Appliquées

- Panthéon : retrait de `site_intention:cadrer le paysage`, car l'oculus cadre surtout le ciel et la lumière, pas un paysage ; retrait de `social_intention:se retirer`, trop fragile pour ce lieu.
- Fallingwater : remplacement de `vegetal_aspect:organique` par `vegetal_aspect:naturel`, car `organique` ne décrit pas une présence végétale observable ; réintroduction ensuite de `symbolic_effect:organique` comme lecture interprétative.
- Fondation Beyeler et autres références du corpus : déplacement de `material_aspect:toit léger` vers `spatial_device:toiture`, car une toiture est un dispositif architectural, pas une matière ou une surface.

## Synthèse Par Référence

| # | Référence | Verdict taxonomique | Points de vigilance |
| --- | --- | --- | --- |
| 1 | Panthéon | Physique et effets cohérents après correction. | Les effets sonores restent des inférences prudentes depuis le grand volume et l'usage rituel, pas des citations acoustiques directes. |
| 2 | Sainte-Chapelle | Physique cohérent : lumière colorée, vitrail, hauteur perçue. | `initiatique` et les effets sonores sont interprétatifs/inférés ; à sourcer plus finement si l'app affiche un niveau de preuve. |
| 3 | Alhambra et Generalife | Eau, parcours, pénombre, fraîcheur et odeurs sont bien séparés entre aspects et ressentis. | `thermal_effect:humide` et `olfactory_effect:humide` décrivent deux sensations différentes ; garder les deux seulement si l'eau/jardin est central dans la lecture. |
| 4 | Fallingwater | Correction faite : la relation au vivant devient `vegetal_aspect:naturel`, tandis que `organique` reste possible comme effet interprétatif. | Les odeurs et effets thermiques sont inférés depuis eau, roche et site naturel ; pas encore des propos experts directs. |
| 5 | Casa Luis Barragán | Couleur, pénombre, patine et progression sont cohérents comme aspects ; intimité, silence et mystère comme effets. | `olfactory_effect:végétal` reste une inférence depuis le jardin. |
| 6 | Ronchamp | Lumière filtrée/colorée, béton et effet d'épaisseur sont cohérents. | Les effets sonores sont plausibles pour une chapelle mais restent à documenter par citation ou observation. |
| 7 | Salk Institute | Axe, canal, travertin, exposition et horizon sont bien séparés. | `sound_aspect:naturel/aquatique/extérieur` relève du contexte sonore du site, pas d'un ressenti. |
| 8 | Kimbell Art Museum | Lumière diffuse/réfléchie, voûte, béton/travertin sont solides ; calme/concentration relèvent bien du ressenti. | Les effets sonores de musée (`feutré`, `mat`, `murmuré`) sont des inférences prudentes. |
| 9 | Phillips Exeter Library | Atrium, alcôve, brique, bois et usage studieux sont cohérents. | Les sons de bibliothèque (`silencieux`, `feutré`, `murmuré`) sont plausibles mais à relier à une source si possible. |
| 10 | Church of the Light | Lumière, clair-obscur, béton et fente sont solides ; `vide`, `sacré`, `contemplatif` sont correctement en effets. | `climate_intention:exploiter l'inertie` est une inférence matérielle, pas forcément une intention explicitée par Ando. |
| 11 | Therme Vals | Eau, pierre, pénombre, chaleur, humidité et odeur chlorée sont bien séparés. | `mystérieux` reste interprétatif ; les effets sonores et olfactifs sont inférés depuis bain/eau/pierre. |
| 12 | Bruder Klaus Field Chapel | Béton, oculus, obscurité et odeur fumée sont cohérents. | `sublime` et `mystique` sont des lectures interprétatives ; à distinguer d'une description experte si l'interface ajoute des preuves. |
| 13 | Kolumba Museum | Brique, perforation, lumière diffuse, progression et mémoire sont cohérents. | `ruine` reste dans la rubrique transformation ; à re-discuter si l'on veut le rapprocher de `mémoire et temps`. |
| 14 | Jewish Museum Berlin | Béton, ombre, parcours contraint, vide, absence, oppression et froid sont bien classés. | Les effets sonores (`creux`, `résonant`) sont pertinents mais doivent être considérés comme inférences si aucune citation acoustique n'est ajoutée. |
| 15 | Chapel of St. Ignatius | Lumière colorée/réfléchie, volumes, lanternes et spiritualité sont cohérents. | `volume` est physique, mais les "volumes lumineux" sont à la limite entre dispositif spatial et dispositif lumineux. |
| 16 | Cy Twombly Gallery | Plâtre, toile, lumière filtrée, calme et concentration sont cohérents. | `doux` est corporel/perceptif ; le garder comme effet, pas comme matière. |
| 17 | Fondation Beyeler | Correction faite : `toiture` devient dispositif spatial ; verdure, lumière filtrée et paysage sont cohérents. | `équilibré` est affectif et interprétatif ; il doit rester un effet ressenti. |
| 18 | Hagia Sophia | Dôme/voûte, lumière diffuse/zénithale, pierre, monumentalité et sacré sont cohérents. | Effets sonores du grand volume plausibles mais à distinguer d'une citation experte. |
| 19 | Grande Mosquée-Cathédrale de Cordoue | Pénombre, pierre, parcours exploratoire, vaste/labyrinthique et sacré sont cohérents. | `labyrinthique` est interprétatif/perceptif, pas un aspect physique brut ; le classement en effet interprétatif est correct. |
| 20 | Cathédrale de Chartres | Vitrail, lumière filtrée/colorée, hauteur/monumentalité, sacré et mémoire historique sont cohérents. | Les effets sonores sont inférés depuis le volume liturgique. |

## Règles Retenues Pour La Suite

- Un tag sonore comme `bruit mécanique`, `aquatique`, `public`, `extérieur` reste une source ou un contexte sonore.
- Un tag sonore comme `réverbérant`, `feutré`, `ample`, `cérémoniel`, `murmuré` reste un effet sonore ressenti.
- Un tag thermique comme `ventilé` ou `exposé` reste un contexte physique.
- Un tag thermique comme `chaud`, `frais`, `froid`, `humide`, `sec` reste une sensation ressentie.
- Une odeur est toujours un effet olfactif ressenti ; la source observable doit être portée par une autre rubrique physique.
- Les intentions doivent être lues comme des stratégies de projet ou des inférences pédagogiques, pas automatiquement comme des propos d'experts.

## À Vérifier Dans Les Lots Suivants

- Contrôler `organique` lorsqu'il apparaît dans `Présence végétale et vivant`, car il relève souvent d'une forme ou d'un discours plutôt que d'une présence du vivant. Il peut en revanche être utilisé comme `symbolic_effect:organique` quand la lecture formelle inspirée du vivant est claire.
- Revoir `ruine`, `réparation` et `fragment` pour décider s'ils appartiennent plutôt à transformation, mémoire, ou les deux.
- Ajouter à terme un champ de niveau de preuve par tag si l'interface doit distinguer clairement citation experte, source institutionnelle, paraphrase et inférence prudente.
