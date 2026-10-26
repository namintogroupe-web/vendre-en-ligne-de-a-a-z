# ProgressTrack

La barre de progression montre à l'apprenant où il en est : dans un module, et dans tout le parcours.

- **Barre de module** : `.dp-progress` > `.dp-progress__head` (titre + compteur `4/6` en `mono`) + `.dp-progress__track` > `.dp-progress__bar`. Rôle `progressbar` avec `aria-valuenow`.
- **Parcours en étapes** : une case par grande étape (Produit, Page, Paiement, Publicité, Automatiser). Étapes finies en `brand`, étape en cours en `brand-strong` gras avec `aria-current="step"`, étapes à venir en `ink-muted`.
- La barre se remplit à l'arrivée (`dur-slow`, `ease-out`) : c'est la petite récompense visuelle. Désactivée si *Réduire les animations*.
- Toujours afficher le chiffre à côté de la barre : la couleur seule ne suffit pas.
- Le consommateur fournit le titre, le nombre fait / total et la liste des étapes.
