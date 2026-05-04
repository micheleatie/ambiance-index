# Méthode Corpus 100 Et Extraction Des Ambiances

## Principe

La plateforme ne doit pas commencer par imposer une taxonomie fermée. Elle doit partir de références architecturales très connues, collecter les discours disponibles sur ces références, puis stabiliser progressivement un vocabulaire d'ambiances.

Le flux de travail est donc :

```text
référence connue -> sources en ligne -> mots et expressions extraits -> familles d'ambiances -> tags validés
```

## Étape 1 : Corpus Candidat

Le fichier `data/reference_candidates_100.json` contient 100 références candidates.

Une référence candidate n'est pas encore une fiche validée. Elle indique seulement :

- le nom du lieu ;
- l'architecte, la période ou le contexte ;
- le lieu et la date ;
- le type de programme ;
- quelques axes canoniques supposés ;
- des termes de recherche pour trouver les sources.

Les axes canoniques ne sont pas encore des tags définitifs. Ils servent à orienter la recherche documentaire.

## Étape 2 : Collecte Des Sources

Pour chaque référence, collecter idéalement 3 à 5 sources :

- une source officielle du lieu, musée, monument, architecte ou fondation ;
- une source patrimoniale si elle existe, par exemple UNESCO ou monument national ;
- une source pédagogique ou critique, par exemple ArchDaily Classics, Docomomo, Pritzker, MoMA, Dezeen, The Architectural Review ;
- une source complémentaire si le lieu est surtout connu par la littérature ou les expositions.

À ce stade, on ne copie pas de longs textes. On garde surtout les URL, le titre de la source, le type de source et les passages courts vraiment utiles.

## Étape 3 : Extraction Des Mots

Pour chaque source, relever les mots et expressions qui décrivent :

- les phénomènes physiques : lumière, ombre, matière, texture, son, eau, air, chaleur, froid, odeur, couleur, paysage, parcours, échelle ;
- les dispositifs spatiaux : seuil, filtre, cadrage, vide, compression, dilatation, rampe, cour, atrium, alcôve ;
- les effets subjectifs : calme, sacré, intime, oppressant, mémoriel, joyeux, austère, mystérieux, contemplatif, stimulant.

Chaque mot extrait doit garder une trace minimale :

```json
{
  "term": "lumière diffuse",
  "source_id": "source courte",
  "evidence_type": "mot exact | paraphrase prudente | inférence",
  "confidence": "low | medium | high"
}
```

## Étape 4 : Normalisation

Les mots extraits sont ensuite regroupés dans le vocabulaire contrôlé.

Exemples :

- `soft light`, `diffused daylight`, `lumière douce` -> `light:diffuse`
- `raw concrete`, `béton brut`, `exposed concrete` -> `material_texture:béton` et éventuellement `material_texture:brut`
- `silence`, `quiet`, `stillness` -> selon le contexte `sound:silencieux` ou `calm_contemplation:calme`
- `disorientation`, `void`, `absence` -> selon le contexte `movement_path:contraint`, `spatiality:vide`, `memory_absence:absent`

La règle importante : ne pas confondre un phénomène physique et un effet ressenti.

Exemple :

- `béton` est physique ;
- `austère` est subjectif ;
- `béton froid` peut devenir `material_texture:béton`, `thermal_air:froid` et, si les sources le justifient, `unease_oppression:austère`.

## Étape 5 : Fiche Indexée

Une référence peut entrer dans `data/references_seed.json` seulement lorsqu'elle a :

- au moins deux sources exploitables ;
- au moins trois tags physiques ;
- au moins deux tags subjectifs ;
- des mots figuratifs utiles pour la recherche ;
- un niveau de confiance clair ou une note indiquant ce qui reste à vérifier.

## Lots De Travail

Pour éviter un corpus artificiel, traiter les 100 références par lots de 20 :

1. 20 références sacrées, lumineuses ou muséales.
2. 20 références modernistes et domestiques.
3. 20 références matière, béton, tactilité, ruine, mémoire.
4. 20 références paysage, eau, climat, jardin, nature.
5. 20 références publiques, urbaines, sociales ou contemporaines.

À la fin de chaque lot, vérifier si les combinaisons de filtres dans le prototype donnent plus de résultats.

## Qualité Attendue

Un tag est acceptable si :

- il correspond à un mot récurrent dans plusieurs sources ;
- ou il est fortement justifié par une source experte ;
- ou il est une inférence évidente depuis une description physique précise.

Un tag est fragile si :

- il vient d'une seule description promotionnelle ;
- il repose seulement sur une impression visuelle non sourcée ;
- il mélange cause matérielle et effet sensible.

Les tags fragiles peuvent rester dans un fichier de travail, mais ils ne doivent pas être présentés comme validés.
