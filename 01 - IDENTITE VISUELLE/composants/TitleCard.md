# TitleCard

L'écran-titre animé ouvre chaque chapitre vidéo : il pose le module, le titre et l'enjeu chiffré en 5 secondes.

**Séquence (≈ 5 s, 16:9, thème Studio)**

| Temps | Ce qui se passe | Tokens |
| --- | --- | --- |
| 0 – 1,2 s | Balayage `brand` en diagonale montante : on change de scène. | `dur-scene`, `ease-in-out` |
| 1,0 s | Surtitre « MODULE 3 · PUBLICITÉ » + filet bleu. | `overline`, `dur-slow`, `ease-out` |
| 1,1 – 2,6 s | Trois chevrons montent l'un après l'autre (la flèche du logo), point `volt` au sommet. | `ease-rise`, `dur-scene` |
| 1,25 – 1,4 s | Titre en deux lignes, mot-clé en `brand-strong`. | `display`, `dur-slow` |
| 2,0 – 3,4 s | Compteur en `mono` jusqu'à l'objectif, éclat `volt` à l'arrivée. | `figure` |
| 1,0 – 6,2 s | Barre `brand` en bas : le temps de l'écran. | — |

**Règles**
- Titre : 6 mots maximum, sur 2 lignes. Le mot-clé (celui que dit la voix off) en `brand-strong`.
- Le chiffre doit être **réaliste et expliqué** dans la leçon (objectif, pas promesse).
- Zone de sécurité 64px (`space-8`) sur tous les bords ; en 9:16, le texte passe en haut et les chevrons en bas.
- L'écran-titre suit l'ouverture du logo (LogoMotion). La musique est encore à plein niveau ; elle s'efface en fondu dès que la voix commence, sur l'arrivée du titre.
- Pendant l'écran-titre, le petit logo de coin est masqué.
- *Réduire les animations* : pas de balayage, tout apparaît en fondu, le chiffre s'affiche directement.
- Le consommateur fournit le module, le titre (2 lignes), le mot-clé, le chiffre et son libellé.
