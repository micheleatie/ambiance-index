# Audit des droits des images

Dernière vérification : 16 mai 2026.

Ce document est un audit technique des licences publiées par les sources. Ce n'est pas un avis juridique. Pour un usage éditorial/commercial ou institutionnel sensible, demander une validation juridique ou une autorisation écrite.

## Résultat

- 120 références ont une image dans `data/references_seed.json`.
- 115 images viennent de Wikimedia Commons. L'API Commons les déclare sous licence ouverte ou domaine public ; aucune page manquante ou marquée non libre n'a été trouvée.
- 100 images Commons demandent une attribution. Les métadonnées `author`, `license` et `license_url` ont été ajoutées dans les données pour que le site affiche auteur et licence dans la fiche de détail.
- 1 image, Villa Savoye, vient de l'UNESCO World Heritage Centre avec une licence limitée `BY-NC-ND`. Elle reste affichée seulement si l'image est conservée telle quelle, avec attribution, pour le site pédagogique non commercial.
- 4 images issues de sites officiels ou de fondations ne montrent pas de licence ouverte suffisante dans les sources consultées. Elles sont marquées `needs-permission` et ne sont plus affichées par le rendu public tant qu'une autorisation écrite ou une image de remplacement sous licence ouverte n'est pas disponible.

## Images à remplacer ou autoriser

| Référence | Source actuelle | Décision |
| --- | --- | --- |
| `ronchamp` | Sites Le Corbusier | Remplacer ou obtenir une autorisation écrite. |
| `cy_twombly_gallery` | Menil Collection | Remplacer ou obtenir une autorisation écrite. |
| `unite_habitation_marseille` | Le Corbusier World Heritage | Remplacer ou obtenir une autorisation écrite FLC/ADAGP. |
| `fondation_louis_vuitton` | Fondation Louis Vuitton | Remplacer ou obtenir une autorisation écrite. |

## Remplacements Commons effectués

Ces remplacements ont été choisis visuellement, importés localement et enrichis par l'audit Commons le 16 mai 2026.

- `chapel_st_ignatius` : `Seattle U St Ignatius 05`, Joe Mabel, CC BY-SA 3.0.
- `kansai_airport_terminal` : `Kansai Airport terminal 1, from the top of observation hall "sky view"`, lasta29, CC BY 2.0.
- `nelson_atkins_bloch_building` : `Bloch Building Nelson-Atkins Museum Kansas City`, Carol M. Highsmith, domaine public.
- `heydar_aliyev_center` : `HEIDAR ALIYEV CENTER WIDE ANGLE`, Avisadehh, CC0.
- `maxxi_rome` : `MAXXI Museo nazionale delle arti del XXI secolo, Roma, Italy (Unsplash)`, Alessio Lin, CC0.

Pour `ronchamp`, `unite_habitation_marseille` et `fondation_louis_vuitton`, le sujet architectural est juridiquement plus sensible, notamment parce que les sources françaises/fondations mentionnent des droits réservés ou des demandes préalables. Les remplacer par Commons doit être revérifié au cas par cas, pas seulement choisi par disponibilité visuelle. Pour `cy_twombly_gallery`, aucune image Commons directement satisfaisante n'a encore été retenue.

Note : `therme_vals` reste sous licence Commons ouverte, mais les métadonnées Commons ne renseignent pas l'auteur. La page source doit rester liée clairement et cette image doit être remplacée si une alternative équivalente avec attribution complète est trouvée.

## Sources et règles consultées

- [Wikimedia Commons - Reusing content outside Wikimedia](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia)
- [Creative Commons - Reusing CC-Licensed Content](https://creativecommons.org/reusing-cc-licensed-content/)
- [UNESCO World Heritage Centre - license 19](https://whc.unesco.org/en/licenses/19/)
- [Sites Le Corbusier - legal notice](https://sites-le-corbusier.org/en/legal-notice/)
- [Le Corbusier World Heritage - legal notices](https://lecorbusier-worldheritage.org/en/legal-notices/)
- [RPBW - legal notice](https://www.rpbw.com/legal-notice)
- [Zaha Hadid Architects - terms](https://www.zaha-hadid.com/terms/)
- [Zaha Hadid Architects - image copyright notice](https://www.zaha-hadid.com/asset_packs/please-note-that-all-images-are-copyrighted-and-cannot-be-reproduced-or-published-without-zaha-hadid-architects-consent/)
- [Fondation Louis Vuitton - terms of use](https://www.fondationlouisvuitton.fr/en/terms-of-use)
- [Menil Collection - terms and conditions](https://www.menil.org/terms-and-conditions)
- [Wikimedia Commons - Seattle U St Ignatius 05](https://commons.wikimedia.org/wiki/File:Seattle_U_St_Ignatius_05.jpg)
- [Wikimedia Commons - Kansai Airport terminal 1, from sky view](https://commons.wikimedia.org/wiki/File:Kansai_Airport_terminal_1_,from_the_top_of_observation_hall_%22sky_view%22_(16041786233).jpg)
- [Wikimedia Commons - Bloch Building Nelson-Atkins Museum Kansas City](https://commons.wikimedia.org/wiki/File:Bloch_Building_Nelson-Atkins_Museum_Kansas_City.jpg)
- [Wikimedia Commons - HEIDAR ALIYEV CENTER WIDE ANGLE](https://commons.wikimedia.org/wiki/File:HEIDAR_ALIYEV_CENTER_WIDE_ANGLE.%D7%96%D7%95%D7%95%D7%99%D7%AA_%D7%A8%D7%97%D7%91%D7%94_%D7%9E%D7%A8%D7%9B%D7%96_%D7%94%D7%99%D7%99%D7%93%D7%A8_%D7%90%D7%9C%D7%99%D7%99%D7%91.jpg)
- [Wikimedia Commons - MAXXI Museo nazionale delle arti del XXI secolo, Roma, Italy](https://commons.wikimedia.org/wiki/File:MAXXI_Museo_nazionale_delle_arti_del_XXI_secolo,_Roma,_Italy_(Unsplash).jpg)

## Vérification reproductible

Commande :

```bash
npm run images:audit-rights
```

La commande sort avec un code non nul tant qu'il reste des images `needs-permission`. C'est voulu : cela permet de ne pas oublier les cas à remplacer ou autoriser.
