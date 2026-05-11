# Audit Taxonomie - Lot 03

Date : 2026-05-11

## Portée

Audit des références 41 à 60 de `data/references_seed.json`. Ce lot recoupe deux lots de sources déjà validées : la fin du lot moderniste/domestique et le début du lot matière/mémoire/high-tech.

Contrôle appliqué :

- caractéristiques physiques : matière, lumière, parcours, seuil, eau, végétation, source sonore ou contexte thermique observable ;
- effets ressentis : perception visuelle, effet sonore, effet thermique, affect, ambiance d'usage, mémoire ou interprétation ;
- intentions de conception : stratégie de projet, programme ou relation au site, sans déduire automatiquement une intention depuis un matériau isolé.

Sources de travail : `data/reference_analysis_lot_2_validated.json`, `data/reference_analysis_lot_3_validated.json`, `data/reference_design_intentions_v1.json`, `data/reference_sensory_enrichment_v1.json` et les sources propres à chaque fiche.

## Corrections Appliquées

- Unity Temple : remplacement de `social_intention:se retirer` par `social_intention:célébrer`, plus cohérent avec le programme religieux et communautaire.
- Bauhaus Dessau : remplacement de `site_intention:cadrer le paysage` par `site_intention:ouvrir sur la ville`, retrait de `material_intention:exprimer le brut`, ajout de `material_intention:chercher la transparence`, retrait de `climate_intention:exploiter l'inertie`.
- Paimio Sanatorium : remplacement de `social_intention:étudier` par `social_intention:soigner`, retrait de `material_intention:exprimer le brut`, ajout de `climate_intention:ventiler naturellement`.
- Glass House : remplacement de `material_intention:rendre tactile` par `material_intention:chercher la transparence`.
- Maison de Verre : remplacement de `site_intention:cadrer le paysage` par `site_intention:s'isoler du contexte`, retrait de `social_intention:se retirer`.
- Cimetière Brion : remplacement de `site_intention:reconvertir l'existant` par `site_intention:composer avec l'existant`.
- Musée de Castelvecchio : remplacement de `material_intention:exprimer le brut` par `material_intention:rendre tactile`.
- Olivetti Showroom : remplacement de `social_intention:rassembler` par `social_intention:exposer`.
- Assemblée nationale du Bangladesh : remplacement de `symbolic_intention:sacraliser` par `symbolic_intention:représenter le pouvoir`.
- Row House in Sumiyoshi : remplacement de `site_intention:cadrer le paysage` par `site_intention:s'isoler du contexte`.
- Mémorial aux Juifs assassinés d'Europe : remplacement de `site_intention:reconvertir l'existant` par `site_intention:composer avec l'existant`, retrait de `social_intention:se retirer`.
- Centre Pompidou : retrait de `material_intention:exprimer le brut`, ajout de `social_intention:démocratiser la culture`, remplacement de `symbolic_intention:représenter le pouvoir` par `symbolic_intention:moderniser une institution`.
- Lloyd's Building : remplacement de `site_intention:cadrer le paysage` par `site_intention:ouvrir sur la ville`, remplacement de `social_intention:démocratiser la culture` par `social_intention:travailler`.

## Synthèse Par Référence

| # | Référence | Verdict taxonomique | Points de vigilance |
| --- | --- | --- | --- |
| 41 | Robie House | Brique, bois, lumière filtrée, domesticité, chaleur et protection sont cohérents. | `site_intention:cadrer le paysage` reste acceptable via les fenêtres, vues et extensions horizontales, mais à garder comme intention de cadrage, pas comme effet visuel. |
| 42 | Unity Temple | Correction faite : l'usage est `célébrer`, pas `se retirer`. Béton, lumière zénithale/colorée, pénombre, sacré et intimité sont cohérents. | `material_intention:exprimer le brut` est conservé car le béton armé est central dans le caractère du bâtiment. |
| 43 | Taliesin West | Pierre, béton, toiture, lumière diffuse, vent, exposition et sécheresse sont bien séparés. | `sauvage` reste une ambiance de milieu liée au désert, pas une caractéristique végétale. |
| 44 | Bauhaus Dessau | Correction faite : rapport urbain, transparence, structure/grille et programme d'étude sont plus justes que paysage/brut/inertie. | Le béton reste une matière physique, mais il ne suffit pas ici à porter une intention de brutalité. |
| 45 | Villa Mairea | Bois, pierre, végétation, lumière tamisée, parcours fluide, intimité et ressourcement sont cohérents. | Les odeurs boisées/végétales et le son feutré restent des inférences sensorielles. |
| 46 | Paimio Sanatorium | Correction faite : le programme est le soin ; la ventilation devient une intention climatique explicite. | `visual_effect:chaud` décrit une qualité chromatique ressentie, pas une température. |
| 47 | Säynätsalo Town Hall | Brique, bois, végétation, entrée progressive, ambiance civique, convivialité et pouvoir public sont cohérents. | `représenter le pouvoir` doit être compris comme pouvoir civique local, pas monumental autoritaire. |
| 48 | Eames House | Verre, métal, polychromie, végétation, domesticité ludique et stimulation sont cohérents. | La légèreté/modularité reste dans les mots-clés faute de rubrique formelle dédiée. |
| 49 | Glass House | Correction faite : l'intention matérielle relève de la transparence, pas de la tactilité. | Les effets `abstrait` et `irréel` sont interprétatifs, non physiques. |
| 50 | Maison de Verre | Correction faite : la façade translucide isole du contexte plutôt qu'elle ne cadre un paysage ; l'effet caché/opaque reste ressenti. | La double dimension maison/cabinet médical pourrait recevoir plus tard une intention d'usage plus précise si la taxonomie s'élargit. |
| 51 | Cimetière Brion | Eau, béton brut, transition, mémoire, mélancolie, rituel et fraîcheur ressentie sont cohérents. | `se retirer` est conservé ici comme usage de recueillement, mais il reste à manier avec prudence. |
| 52 | Musée de Castelvecchio | Correction faite : Scarpa relève davantage de la tactilité et du détail que du brut. Réparation, strates et parcours guidant sont cohérents. | `commémorer` reste acceptable comme intention mémorielle large, mais pourrait devenir `composer avec l'existant` si l'on veut éviter la redondance symbolique. |
| 53 | Olivetti Showroom | Correction faite : le lieu expose des produits et un univers matériel ; il ne relève pas d'abord de `rassembler`. | L'eau/son aquatique et l'odeur humide sont des inférences faibles à sourcer si elles deviennent visibles comme preuves. |
| 54 | Assemblée nationale du Bangladesh | Correction faite : le symbole principal est civique/politique (`représenter le pouvoir`), tandis que `spirituel` reste une ambiance ressentie. | Le caractère quasi sacré doit rester dans l'effet d'ambiance, pas nécessairement dans l'intention. |
| 55 | Temple de l'Eau | Béton, bassin, végétation, descente progressive, lumière colorée, rituel et sacré sont cohérents. | Les effets humides/frais sont ressentis issus de l'eau, pas des mesures de confort. |
| 56 | Row House in Sumiyoshi | Correction faite : le projet s'isole du contexte urbain plutôt qu'il ne cadre un paysage. Béton, cour exposée et domesticité austère sont cohérents. | Les tags climatiques restent liés à l'exposition de la cour ouverte. |
| 57 | Chapelle Saint-Benoît | Bois, toiture, lanterne, lumière diffuse, paysage, protection et chaleur affective sont cohérents. | Les effets olfactifs et sonores restent des inférences depuis le bois et l'usage cultuel. |
| 58 | Mémorial aux Juifs assassinés d'Europe | Correction faite : le mémorial compose avec un site historique mais ne reconvertit pas un bâtiment existant ; l'usage est porté par `commémorer`, pas par `se retirer`. | `labyrinthique` reste interprétatif ; le parcours physique est `contraint`. |
| 59 | Centre Pompidou | Correction faite : l'enjeu est structure visible, ville, exposition et démocratisation culturelle, pas brutalité matérielle ni représentation du pouvoir. | `bruit mécanique` reste une source sonore ; `amplifié` reste un effet sonore. |
| 60 | Lloyd's Building | Correction faite : le bâtiment relève du travail et de l'institution financière, pas de la démocratisation culturelle ; le rapport au site est urbain. | Les effets high-tech `étrange`, `stimulant`, `impressionnant` sont interprétatifs. |

## Règles Retenues Pour La Suite

- Ne pas transformer automatiquement `béton` en `material_intention:exprimer le brut`. Garder cette intention seulement si la matérialité brute est centrale dans le discours ou l'expression du projet.
- Distinguer le programme réel du bâtiment : `soigner`, `exposer`, `travailler`, `étudier`, `célébrer` ou `habiter` doivent être choisis avec précision.
- Pour les bâtiments urbains ou techniques, ne pas utiliser `cadrer le paysage` par défaut. Préférer `ouvrir sur la ville` ou `s'isoler du contexte` quand la relation principale est urbaine.
- `commémorer` suffit souvent pour les mémoriaux ; éviter d'ajouter `se retirer` si le retrait n'est pas explicitement un programme ou un dispositif.
- Les rubriques sonores, thermiques et olfactives restent utiles, mais beaucoup de valeurs sont encore des hypothèses pédagogiques à relier plus tard à des citations ou niveaux de preuve.
