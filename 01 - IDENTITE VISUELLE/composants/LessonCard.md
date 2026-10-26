# LessonCard

La carte de leçon montre une leçon dans la liste d'un module, avec sa vignette, son état et sa durée.

- Structure : `a.dp-lesson` > `.dp-thumb` (vignette 16:9) + bloc texte (`.dp-meta`, `h3`).
- États : **Terminée** (`dp-badge--done`), **En cours** (`dp-lesson--active` + `dp-badge--now` + mini-barre de progression, `aria-current="step"`), **À venir** (`dp-badge--todo`).
- Titre de leçon : une action concrète, 7 mots maximum (« Créer ta page de vente sur Systeme.io »).
- Vignette par défaut : fond `ink` + chevrons `brand` qui montent (motif de la flèche du logo) + bouton lecture blanc. Une vraie capture de la leçon peut la remplacer.
- Une seule colonne sur mobile ; vignette réduite à 88px sous 420px.
- Le consommateur fournit le titre, le numéro, la durée, l'état, le pourcentage vu et le lien.
