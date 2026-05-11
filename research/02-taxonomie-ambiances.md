# Taxonomie Des Ambiances

Cette taxonomie sert de base de travail pour indexer les références architecturales. Elle doit rester ouverte et révisable : une même référence peut combiner plusieurs caractéristiques physiques, plusieurs effets ressentis et plusieurs intentions de conception.

## Principe De Classement

La règle principale est de ne pas mélanger **caractéristique physique** et **sensation produite**.

- **Caractéristiques physiques** : ce que l'on peut décrire dans le projet, sans interpréter l'effet. Exemples : lumière zénithale, béton brut, bassin, atrium, voûte, parcours axial, seuil, fente, vitrail.
- **Effets ressentis** : ce que l'expérience peut produire chez le corps, la perception, l'écoute, le thermique, l'affect, l'ambiance, la mémoire ou l'imaginaire. Exemples : frais, enveloppant, silencieux, monumental, mystérieux, sacré, ressourçant.
- **Intentions de conception** : stratégie de projet supposée ou explicitée par les sources. Exemples : filtrer la lumière, cadrer le paysage, ralentir, sacraliser, exploiter l'inertie.

Exemple de tri :

- `light_aspect:zénithale` = caractéristique physique ;
- `light_device:vitrail` = caractéristique physique, car il décrit un dispositif lumineux ;
- `visual_effect:monumental` = effet visuel ressenti ;
- `symbolic_atmosphere:sacré` = ambiance symbolique ou culturelle ;
- `symbolic_effect:mystérieux` = effet interprétatif ;
- `thermal_effect:frais` = effet ressenti ;
- `climate_intention:filtrer la lumière` = intention de conception.

Un terme comme `rituel` ne doit pas être classé dans le parcours physique. On décrit le parcours par `path_aspect:progressif`, `path_aspect:sinueux`, `path_aspect:axial`, etc. Le rituel relève plutôt de `symbolic_atmosphere:rituel` ou de `spatial_intention:séquence rituelle`.

## A. Caractéristiques Physiques

Ces rubriques décrivent les caractéristiques physiques, spatiales ou sensibles du projet. Elles restent de l'ordre de l'aspect, de la configuration ou de la propriété décrite, pas de la sensation.

| Code | Rubrique | Ce que l'on décrit | Vocabulaire contrôlé |
| --- | --- | --- | --- |
| A1 | Lumière | intensité, direction, source, diffusion, variation temporelle | faible, tamisée, diffuse, intense, naturelle, zénithale, latérale, rasante, filtrée, réfléchie, colorée, variable |
| A2 | Ombre et contraste | pénombre, clair-obscur, découpe, profondeur | sombre, pénombre, clair-obscur, contrasté, profond, découpé, strié, semi-obscur |
| A3 | Couleur | teinte, dominante, polychromie | polychrome, rose, rouge, bleu, vert, doré, blanc |
| A4 | Dispositifs lumineux | prise de lumière, filtre lumineux, conduit lumineux, surface ajourée | fenêtre, oculus, fente, lanterne, vitrail, claustra, rideau, grille, perforation |
| A5 | Matière et surface | matériau, grain, rugosité, patine, poids visuel | pierre, béton, bois, métal, verre, terre, brique, travertin, brut, lisse, rugueux, poli, poreux, patiné |
| A6 | Dispositifs spatiaux | forme spatiale, type spatial, axe, retrait, abri, toiture | voûte, atrium, volume, axe, belvédère, alcôve, abri, toiture |
| A7 | Organisation spatiale et parcours | ordre, séquence, axe, promenade, détour, traversée | ordonné, progressif, sinueux, axial, fluide, contraint, exploratoire, traversant |
| A8 | Présence de l'eau | présence visible, reflet, écoulement, bassin, pluie, canal | miroir, ruisselant, bassin, fontaine, vapeur, source, cascade, canal |
| A9 | Présence végétale et vivant | végétation, saison, croissance, présence du vivant, paysage planté | végétal, saisonnier, naturel, fertile, vivant, verdure, jardiné |
| A10 | Sources et contextes acoustiques | source sonore, milieu sonore, contexte sonore | aquatique, vent, naturel, urbain, public, bruit mécanique, extérieur |
| A11 | Sources et contextes thermiques | ventilation, exposition | ventilé, exposé |
| A12 | Seuils, passages et transitions | passage entre deux régimes d'ambiance | entrée, seuil, transition, sas, porche, filtre |

Note : les indications thermiques sont distinguées selon leur rôle. `ventilé` ou `exposé` décrivent un contexte d'air ou d'exposition ; `chaud`, `frais`, `froid`, `humide` ou `sec` décrivent une sensation thermique ressentie. Les qualificatifs chromatiques ressentis comme `chaud`, `froid`, `neutre`, `sourd` ou `éclatant` sont classés en `visual_effect`, pas dans la rubrique physique `Couleur`.

## B. Effets Ressentis

Ces rubriques décrivent le registre d'expérience. Elles ne prétendent pas mesurer objectivement le confort ou l'émotion ; elles indiquent une lecture sensible issue des sources, des descriptions ou d'une hypothèse prudente.

| Code | Rubrique | Registre | Vocabulaire contrôlé |
| --- | --- | --- | --- |
| B1 | Effets visuels | lisibilité, orientation visuelle, échelle perçue, ouverture, transparence perçue, cadrage, couleur ressentie, compression/dilatation perçue | clair, lisible, guidant, évident, structuré, caché, monumental, bas, haut, étroit, vaste, épais, ouvert, fermé, vide, symétrique, chaud, froid, neutre, sourd, éclatant, introverti, extraverti, resserrement, expansion, cadré, panoramique, horizon, paysage, transparent, opaque, poreux |
| B2 | Effets corporels | enveloppement, vertige, oppression, équilibre corporel, bien-être corporel | enveloppant, vertigineux, oppressant, instable, doux, sain, réparateur, ressourçant |
| B3 | Effets thermiques ressentis | température et état de l'air ressentis | chaud, frais, froid, humide, sec |
| B4 | Effets sonores ressentis | perception qualitative de l'écoute | silencieux, feutré, sourd, mat, absorbé, réverbérant, résonant, écho, vibrant, creux, ample, diffus, clair, amplifié, continu, masquant, intime, enveloppant, musical, murmuré |
| B5 | Effets olfactifs ressentis | famille olfactive, humidité, matière perçue | boisé, humide, végétal, fumé, terreux, chloré |
| B6 | Effets affectifs | calme, sécurité, intimité, inquiétude, douleur, tonalité relationnelle ou émotionnelle | calme, serein, paisible, méditatif, contemplatif, posé, intime, abrité, refuge, protecteur, chaleureux, convivial, généreux, austère, anxiogène, violent, équilibré, douloureux, mélancolique |
| B7 | Ambiances d'usage, programme et transformation | usage, programme, jeu, étude, situation collective, domesticité, transformation | joyeux, vivant, ludique, festif, animé, studieux, concentré, intellectuel, aspirant, domestique, ruine, réparation, fragment |
| B8 | Ambiances symboliques et de milieu | rite, sacré, relation au vivant, solennité | sacré, mystique, spirituel, liturgique, rituel, ascétique, solennel, sauvage |
| B9 | Effets interprétatifs | lecture, imaginaire, abstraction, étrangeté, valeur attribuée | rationnel, mystérieux, énigmatique, ambigu, suggestif, initiatique, abstrait, organique, étrange, irréel, dépaysant, autre, onirique, labyrinthique, secret, grandiose, sublime, majestueux, disloqué, impressionnant, inspirant, stimulant |
| B10 | Effets de mémoire et de temps | trace, couche temporelle, absence, histoire, hantise | mémoriel, absent, fragile, historique, hanté, strate |

Note : les odeurs sont classées comme effets olfactifs ressentis, pas comme caractéristiques physiques autonomes. Quand une source odorante est observable, elle est plutôt indiquée dans les caractéristiques existantes (`material_aspect:bois`, `vegetal_aspect:végétal`, `water_aspect:bassin`, `material_aspect:terre`). `minéral` et `ancien` sont retirés des effets olfactifs parce qu'ils décrivent plutôt une matière, une patine ou une mémoire du lieu qu'une odeur suffisamment claire. Les sources et contextes acoustiques décrivent d'où vient le son ou dans quel milieu il s'inscrit (`public`, `extérieur`, `urbain`, `vent`, `naturel`, `aquatique`, `bruit mécanique`) ; `bruit mécanique` désigne une source technique ou un équipement, pas une sensation. Les qualités d'écoute ou de propagation perçue (`silencieux`, `feutré`, `réverbérant`, `écho`, `mat`, `amplifié`, `continu`, `masquant`) relèvent des effets sonores ressentis. `cérémoniel` est retiré des effets sonores : il décrit une ambiance rituelle ou solennelle, pas une qualité acoustique. Les sources et contextes thermiques décrivent le milieu (`ventilé`, `exposé`) ; les effets thermiques gardent l'état ressenti (`chaud`, `frais`, `froid`, `humide`, `sec`). `tempéré` est retiré parce qu'il reste trop vague sans indicateur mesuré. `clos` est retiré parce qu'il décrit plutôt un état spatial ou une sensation d'enfermement qu'une qualité olfactive claire. `domestique` décrit une ambiance liée à l'habiter, à la maison ou au quotidien ; il relève donc des ambiances d'usage, de programme et de transformation. `strate` décrit une couche temporelle, une superposition historique ou une lecture de palimpseste ; il relève donc des effets de mémoire et de temps. `ruine`, `réparation` et `fragment` ne sont plus classés comme caractéristiques physiques isolées : ils décrivent plutôt un état de transformation, de reconversion ou de continuité d'usage. `domestiqué` est évité parce qu'il se confond trop facilement avec `domestique`. `jardiné` décrit désormais une présence végétale composée, cultivée ou paysagèrement organisée ; il relève donc de `vegetal_aspect`. `sauvage` reste une ambiance de milieu quand il décrit une lecture de nature non domestiquée plutôt qu'un relevé botanique. `organique` peut être utilisé comme effet interprétatif quand il décrit une lecture formelle ou symbolique inspirée du vivant, mais pas comme présence végétale observable. `douloureux` et `mélancolique` relèvent de l'affectif, même quand ils sont liés à la mémoire. `sacré`, `spirituel`, `mystique`, `rituel` et `solennel` décrivent des ambiances culturelles ou symboliques plutôt qu'une interprétation abstraite. `impressionnant`, `inspirant` et `stimulant` restent des effets interprétatifs, car ils décrivent une lecture, une projection ou une valeur attribuée au lieu.

## C. Intentions De Conception

Cette couche décrit ce que le projet semble chercher à organiser. Elle reste distincte des caractéristiques et des effets :

- `light_aspect:filtrée` décrit une caractéristique lumineuse ;
- `light_device:vitrail` décrit une caractéristique matérielle ou spatiale ;
- `visual_effect:monumental` décrit un effet visuel ressenti ;
- `symbolic_atmosphere:sacré` décrit une ambiance symbolique ;
- `symbolic_effect:mystérieux` décrit un effet interprétatif ;
- `climate_intention:filtrer la lumière` décrit une intention ou stratégie de conception.

| Code | Rubrique | Micro-rubriques | Vocabulaire utile |
| --- | --- | --- | --- |
| C1 | Rapport au site | implantation, paysage, ville, existant, repère | ancrer dans le site, cadrer le paysage, fusionner avec la nature, s'isoler du contexte, ouvrir sur la ville, reconvertir l'existant, composer avec l'existant, créer un repère |
| C2 | Stratégie spatiale | parcours, axe, plan, rampe, séquence, centralité | promenade architecturale, séquence rituelle, axe monumental, plan libre, rampe continue, boucle, parcours fluide, fragmentation, centralité, labyrinthe |
| C3 | Stratégie climatique | lumière, soleil, air, eau, inertie, microclimat | filtrer la lumière, protéger du soleil, ventiler naturellement, rafraîchir par l'eau, créer un microclimat, exploiter l'inertie, exposer au climat, contrôler l'éclairage |
| C4 | Intention matérielle | brut, tactilité, artisanat, transparence, légèreté, patine | exprimer le brut, rendre tactile, mettre en valeur l'artisanat, chercher la transparence, alléger la construction, faire monolithe, laisser vieillir, réemployer |
| C5 | Expression structurelle | structure visible, franchissement, suspension, grille, forme porteuse | montrer la structure, franchir, suspendre, libérer le plan, exprimer la grille, faire forme porteuse, défi gravitaire, activer l'enveloppe |
| C6 | Programme et usage | collectif, étude, soin, habitat, exposition, célébration, travail | rassembler, étudier, soigner, habiter, exposer, célébrer, démocratiser la culture, travailler, se retirer, apprendre |
| C7 | Symbolique et récit | sacré, mémoire, pouvoir, identité, tradition, institution, quotidien | sacraliser, commémorer, représenter le pouvoir, exprimer une identité, renouveler une tradition, moderniser une institution, mettre en scène le quotidien, faire icône |
| C8 | Effet perceptif recherché | lenteur, surprise, désorientation, enveloppement, intensité, apaisement, orientation | ralentir, surprendre, désorienter, envelopper, intensifier, apaiser, orienter, ouvrir l'imaginaire |

## Règles D'annotation

1. Classer d'abord le terme comme caractéristique physique, effet ressenti ou intention.
2. Ne pas mettre une sensation corporelle ou thermique dans les caractéristiques physiques.
3. Ne pas mettre une intention de projet dans les effets ressentis.
4. Garder les mots figuratifs dans `keywords_fr` même s'ils ne deviennent pas des tags contrôlés.
5. Ajouter un niveau de confiance ou une source quand l'interprétation sensible est fragile.
6. Accepter les contradictions : un même lieu peut être `calme` pour une source et `oppressant` pour une autre.

## Exemple

Pour la Chapelle de la Lumière de Tadao Ando :

- caractéristiques physiques : `light_aspect:intense`, `shadow_aspect:clair-obscur`, `material_aspect:béton`, `light_device:fente` ;
- effets ressentis : `symbolic_atmosphere:sacré`, `affective_effect:contemplatif`, `symbolic_atmosphere:solennel`, `visual_effect:monumental` ;
- intention : `climate_intention:filtrer la lumière`, `symbolic_intention:sacraliser`, `perceptual_intention:ralentir`.
