# Ajustement Jardiné Et Organique

Date : 2026-05-11

## Décision

`jardiné` est déplacé vers les caractéristiques physiques, dans `vegetal_aspect`.

Raison : le terme décrit une présence végétale composée, cultivée ou paysagèrement organisée. Il relève donc davantage de l'observable que d'une ambiance symbolique.

## Corrections Appliquées

- Ajout de `jardiné` à `vegetal_aspect` dans `data/taxonomy_seed.json`.
- Retrait de `jardiné` de `symbolic_atmosphere`.
- Remplacement de `symbolic_atmosphere:jardiné` par `vegetal_aspect:jardiné` pour :
  - Cuadra San Cristóbal ;
  - 21st Century Museum of Contemporary Art, Kanazawa ;
  - Rolex Learning Center.

## Organique

`organique` reste dans `symbolic_effect`.

Raison : le terme décrit une lecture formelle, structurelle ou symbolique inspirée du vivant. Il ne doit pas être confondu avec une présence végétale réelle.

Ajout de `symbolic_effect:organique` pour les références où cette lecture est suffisamment claire :

- Fallingwater ;
- Sagrada Família ;
- Teshima Art Museum ;
- Villa Mairea ;
- Centre culturel Jean-Marie Tjibaou ;
- Guggenheim Museum Bilbao ;
- Sendai Mediatheque ;
- TWA Flight Center ;
- Fondation Louis Vuitton.

## Règle Retenue

- `vegetal_aspect:jardiné` = paysage planté, jardin, patio végétalisé ou composition végétale observable.
- `symbolic_effect:organique` = lecture formelle ou symbolique inspirée du vivant.
- Ne pas utiliser `organique` pour remplacer une végétation observable ; utiliser `végétal`, `verdure`, `naturel`, `saisonnier` ou `jardiné`.
