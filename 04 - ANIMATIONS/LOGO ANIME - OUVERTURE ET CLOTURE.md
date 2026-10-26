# LogoMotion

Le logo animé est présent dans chaque vidéo de la formation : il ouvre, reste discret pendant la leçon, puis clôt.

**Séquence (exemple en 16:9, thème Studio)**

| Temps | Logo | Son |
| --- | --- | --- |
| 0 – 0,7 s | Un filet `brand` traverse le centre. | Début du riser |
| 0,3 – 1,2 s | La flèche monte en diagonale (`ease-rise`), du flou au net. | Impact grave à l'arrivée |
| 0,8 – 1,5 s | « DIGITAL » se révèle de gauche à droite (`ease-in-out`). | — |
| 1,4 – 1,9 s | P, R, O tombent l'un après l'autre (110 ms d'écart). | Micro-bips |
| 1,75 – 2,3 s | Les filets s'étirent vers l'extérieur. | — |
| 2,3 – 3,0 s | Éclat sur la flèche (`glow-brand`). | Scintillement, la musique est à plein niveau |
| 3,4 – 4,4 s | Le logo glisse vers son coin et devient petit (7 % de la largeur). | Whoosh numérique ; la voix commence, la musique s'efface en 2 s |
| Pendant la leçon | Fixe, 90 % d'opacité, reflet bref sur la flèche toutes les ~45 s. S'écarte vers le coin opposé si l'action s'y passe. | Pas de musique |
| ≈ 10 dernières s | Revient au centre, éclat, bouton « Leçon suivante ». | La musique revient en fondu, impact final |

**Fichiers** : les 7 calques (encre positive ou négative, flèche, P, R, O, filet gauche, filet droit) sont dans Assets › Logos. Ils sont tirés du logo original pixel pour pixel. On les superpose à la même position : chaque calque fait la taille du logo entier.

**Règles**
- Version négative sur fond sombre, positive sur fond clair.
- Le logo ne recouvre jamais une information : voir **LogoPlacement**.
- *Réduire les animations* : logo fixe dans son coin, sans ouverture animée.
- Pour la production vidéo (After Effects, Premiere, CapCut…) : importer les 7 calques PNG et reprendre les temps et courbes ci-dessus. Une version vectorielle (SVG) officielle donnera un rendu encore plus net en 4K.
