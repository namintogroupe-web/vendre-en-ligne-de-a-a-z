# Button

Le bouton déclenche une action : commencer une leçon, valider un exercice, lancer une étape.

| Variante | Classe | Quand |
| --- | --- | --- |
| Principal | `dp-btn dp-btn--primary` | L'action normale de l'écran (« Commencer la leçon », « Suivant »). Fond `brand`, texte `on-brand`. |
| Volt | `dp-btn dp-btn--volt` | **Une seule fois par écran**, pour l'action qui fait passer à l'acte (« Je lance ma campagne », « Je publie ma page »). |
| Secondaire | `dp-btn dp-btn--secondary` | Action à côté du principal (« Revoir la vidéo »). Bordure `line-strong`. |
| Discret | `dp-btn dp-btn--ghost` | Action légère (« Télécharger le résumé »). Texte `brand-strong`. |
| Grand | `+ dp-btn--lg` | Fin de leçon, écran mobile. 56px de haut. |

**Règles**
- Libellé = **un verbe + un objet**, 4 mots maximum. Pas de « Cliquez ici ».
- Hauteur minimale 44px (zone tactile). Sur mobile, le bouton de fin de leçon prend toute la largeur.
- Icône facultative, à droite : flèche → pour avancer, flèche diagonale ↗ pour une action de croissance.
- État désactivé : expliquer **pourquoi** à côté (« Termine la leçon 3 pour débloquer »).
- Le consommateur fournit le libellé, l'icône éventuelle et l'action.
