# Digital Pro

> Apprendre à vendre en ligne, de l'idée à la vente, en français simple.

Ce système est la base visuelle de **toute la formation Digital Pro** : la plateforme de cours, les vidéos narrées et animées, les supports à télécharger et les visuels de promotion. Tout ce qui porte le nom Digital Pro part d'ici : mêmes couleurs, mêmes polices, mêmes mouvements.

L'idée centrale vient du logo : **la flèche qui monte**. Chaque écran, chaque animation raconte la même chose à l'apprenant : *tu progresses, étape par étape, et tes ventes montent*.

---

## 1. La personnalité

| Digital Pro est… | …et jamais |
| --- | --- |
| **Clair** : une idée par écran, des mots simples | Technique pour impressionner |
| **Sérieux** : des chiffres réels, des étapes vérifiables | Une promesse « devenir riche vite » |
| **Énergique** : du mouvement, du contraste, du rythme | Criard, clignotant, surchargé |
| **Proche** : on tutoie, on encourage | Familier ou moqueur |
| **Premium** : soin du détail, du silence, de l'espace | Luxe froid et distant |

## 2. La voix : français facile et soigné

La formation s'adresse à **tout le monde**, y compris aux personnes qui lisent peu ou qui débutent avec le numérique. La règle : *si un enfant de 12 ans comprend la phrase, elle est bonne.*

**Règles d'écriture**

- **Une phrase = une idée.** 15 mots maximum en moyenne à l'écran, 20 en voix off.
- **On tutoie** l'apprenant : « Tu vas créer ta page ». Chaleureux et direct.
- **Verbes d'action en tête** des consignes : « Clique », « Copie », « Publie ».
- **Un mot technique = une explication tout de suite.** « Le *pixel* (un petit code qui compte tes visiteurs) ».
- **Des exemples locaux et concrets** : prix en FCFA, paiement Orange Money / Wave / MTN, un produit qu'on connaît.
- **Jamais de promesse de gain garanti.** On dit « voici comment augmenter tes chances », pas « tu vas gagner 1 million ».
- **Orthographe et typographie soignées** : espace insécable avant `: ; ! ?`, guillemets « français », majuscules accentuées (« À retenir », « État »).

**Exemples**

| ✗ À éviter | ✓ Digital Pro |
| --- | --- |
| « Optimisez le taux de conversion de votre landing page. » | « Faisons en sorte que plus de visiteurs achètent sur ta page. » |
| « Configurez le webhook de paiement. » | « On relie ton paiement à ta boutique. Comme ça, chaque vente s'enregistre toute seule. » |
| « Scalez vos campagnes. » | « Quand une publicité marche, on augmente son budget, petit à petit. » |

**Mots réservés** — toujours écrits pareil : *page de vente*, *tunnel de vente*, *campagne*, *publicité* (pas « pub » à l'écrit), *Mobile Money*, *paiement*, *produit digital*, *produit physique*.

## 3. Le logo

Le logo officiel est dans **Assets › Logos** (`digital-pro-logo.png`).

- **Espace de protection** : autour du logo, laisser au minimum la hauteur du mot « PRO ».
- **Taille minimale** : 120px de large à l'écran, 30 mm à l'impression.
- **Fonds autorisés** : `paper` clair (le fond d'origine) ou blanc. Sur un fond sombre ou une vidéo, poser le logo dans une pastille `paper` en `radius-lg`, en attendant une version négative officielle.
- **Interdit** : déformer, changer les couleurs, ajouter une ombre, mettre le logo sur une photo chargée, recréer le logo avec une police.

> La flèche du logo est le **motif signature** : on la reprend comme forme (chevrons, diagonale qui monte) dans les animations. On ne redessine jamais le logo lui-même.

## 4. Les couleurs

Trois couleurs portent la marque, le reste sert à lire et à informer.

| Rôle | Token | Quand l'utiliser |
| --- | --- | --- |
| **Bleu Digital Pro** | `brand` | Bouton principal, progression, flèche, élément actif. La couleur qu'on reconnaît. |
| **Encre** | `ink` | Titres, texte, grands aplats sombres dans les vidéos. |
| **Volt** | `volt` | **Un seul** appel à l'action fort par écran, un chiffre de vente qui « explose » dans l'animation. Rare = puissant. |
| Fond | `paper`, `surface`, `surface-sunken` | Les couches de l'interface, du fond vers l'avant. |
| Texte secondaire | `ink-muted` | Durées, légendes, métadonnées. |
| Lien dans un texte | `brand-strong` | Mots colorés à lire (contraste garanti). |
| États | `success`, `warning`, `danger` + leurs `-tint` | Réussi, attention, à éviter. Toujours avec une icône ou un mot, jamais la couleur seule. |

**Proportions conseillées par écran** : 70 % fonds (`paper`/`surface`), 20 % `ink`, 8 % `brand`, 2 % `volt`.

**Deux thèmes** : *Clair* pour la plateforme et les documents, *Studio (sombre)* pour les vidéos, les écrans-titres et le mode nuit. Le bleu `brand` est le même dans les deux.

**Contraste** : tous les couples texte/fond du système passent 4.5:1 dans les deux thèmes. Le texte `volt` n'existe pas sur fond clair (1.2:1) : en clair, volt est un **fond** avec du texte `on-volt`.

## 5. La typographie

| Famille | Police | Rôle |
| --- | --- | --- |
| `display` | **Unbounded** (Google Fonts) | Titres larges et affirmés, comme le « DIGITAL » du logo. Titres de module, écrans vidéo. |
| `sans` | **Manrope** (Google Fonts) | Tout le texte à lire : leçons, interface, sous-titres. Très lisible, chiffres nets. |
| `mono` | **JetBrains Mono** (Google Fonts) | Prix, chiffres de vente, liens UTM, codes. |

- Texte à lire : **`body-l` (18px)** par défaut dans les leçons, jamais moins de **16px**.
- Titres en `display` : **pas plus de 6 mots**. En dessous de 24px, on passe en `sans` gras (`h3`).
- **`overline`** (capitales espacées) rappelle le « P R O » du logo : surtitre de module ou de chapitre.
- Longueur de ligne : 60 à 72 caractères maximum.

## 6. Les formes et l'espace

- Grille de **4px**. Espacements : `space-1` à `space-9`.
- Coins arrondis : `radius-md` pour les boutons, `radius-lg` pour les cartes, `radius-pill` pour les puces et barres.
- Ombres légères (`shadow-1`, `shadow-2`). Le halo `glow-brand` est réservé au **moment fort** : bouton principal survolé, flèche qui arrive en haut.

## 7. Les animations : puissantes et maîtrisées

Les vidéos de la formation sont **narrées et animées**. Le mouvement doit impressionner *et* aider à comprendre. Règle d'or : **chaque mouvement explique quelque chose.**

**Le langage de mouvement Digital Pro**

1. **La montée** — tout ce qui progresse monte en diagonale, de bas-gauche vers haut-droite, comme la flèche du logo (`ease-rise`, `dur-scene`). C'est la signature : début de module, vente réussie, résultat de campagne.
2. **Le texte cinétique** — les mots-clés de la voix off apparaissent à l'écran au moment où ils sont prononcés, en `display`, un ou trois mots à la fois.
3. **Le zoom guidé** — pendant une démonstration (Shopify, Systeme.io, Meta…), la caméra zoome sur la zone où cliquer, un cercle `brand` marque le clic.
4. **Le compteur** — les chiffres (ventes, FCFA, clics) défilent jusqu'à leur valeur en `mono`, puis un éclat `volt`.
5. **Le balayage** — transition entre scènes : un aplat `brand` ou `ink` traverse l'écran en diagonale montante (`ease-in-out`, `dur-scene`).

**Les vitesses**

| Token | Durée | Pour |
| --- | --- | --- |
| `dur-fast` | 160ms | Survol, appui |
| `dur-base` | 280ms | Ouverture, onglet, encadré |
| `dur-slow` | 600ms | Titre qui entre, barre qui se remplit |
| `dur-scene` | 1200ms | Transition de scène, montée de la flèche |

**Ce qu'on ne fait pas** : rebonds partout, rotation 3D gratuite, texte qui clignote, plus de deux mouvements en même temps, effets « glitch ». Sur la plateforme, on respecte le réglage *Réduire les animations* de l'appareil : les éléments apparaissent alors en fondu simple.

## 8. Le son : voix off et musique

| Élément | Réglage |
| --- | --- |
| **Voix off** | Claire, posée, souriante. Débit ≈ 140 mots/minute. Volume de sortie autour de **−16 LUFS** (standard web/mobile). |
| **Musique de fond** | **Très basse** : 20 à 25 dB sous la voix pendant qu'on parle. Instrumentale, sans paroles, tempo 90–110 BPM, plutôt électro douce / afro-house légère. |
| **Respirations** | La musique remonte un peu (≈ −8 dB sous la voix) seulement dans les transitions sans parole. |
| **Effets sonores** | Discrets et rares : un « whoosh » léger pour le balayage, un petit tintement pour une vente réussie. |
| **Licence** | Uniquement des musiques et effets **libres de droits avec licence commerciale**. Garder la preuve de licence pour chaque vidéo. |

**Sous-titres obligatoires** sur toutes les vidéos (en `sans`, `body-l`, texte `ink` clair sur bandeau sombre à 80 %) : beaucoup regardent sur téléphone, sans le son.

## 9. Tous les écrans

La formation doit être belle et lisible partout.

| Format | Taille | Usage | Zone de sécurité |
| --- | --- | --- | --- |
| **16:9** | 1920 × 1080 | Vidéos de cours, ordinateur, TV | 64px (`space-8`) sur chaque bord |
| **9:16** | 1080 × 1920 | Version mobile, Reels, TikTok, Stories | 120px en haut, 320px en bas (boutons des applis) |
| **1:1** | 1080 × 1080 | Posts, vignettes de module | 64px |
| **4:5** | 1080 × 1350 | Publicités Facebook / Instagram | 64px |

**Plateforme de cours** : conçue d'abord pour le téléphone (360px), puis tablette (768px) et ordinateur (1280px et plus). Zones tactiles de **44px minimum**. Une seule colonne sur mobile.

## 10. Structure d'une leçon

Chaque leçon suit le même rythme, pour que l'apprenant se sente en confiance :

1. **L'accroche** (10–20 s) — un problème concret : « Ta page reçoit des visites, mais personne n'achète ? »
2. **L'objectif** — « À la fin de cette leçon, tu sauras… » (une seule chose).
3. **La démonstration** — à l'écran, étape par étape, avec zoom guidé.
4. **À retenir** — l'encadré récapitulatif (3 points maximum).
5. **Ton action** — un exercice à faire tout de suite, avec le bouton `volt`.

Durée cible : **5 à 12 minutes** par leçon.

## 11. Icônes et images

- Icônes **au trait**, 2px, coins arrondis, grille 24px, couleur `ink` ou `brand`. Une bibliothèque libre comme *Lucide* convient.
- Les **logos des plateformes** (Shopify, Meta, TikTok, Orange Money…) ne s'affichent qu'en respectant les règles de chaque marque. Dans le système, les puces plateforme sont en **texte**.
- Photos : vraies personnes, vrais produits, lumière naturelle, entrepreneurs d'Afrique francophone. Pas de banque d'images clichée (poignées de main, liasses de billets).

## 12. Accessibilité

- Contraste 4.5:1 pour tout texte, 3:1 pour les contrôles et icônes — vérifié dans les deux thèmes.
- Focus clavier visible partout (`focus`).
- Couleur jamais seule : toujours une icône ou un mot (« Réussi », « Attention »).
- Sous-titres sur 100 % des vidéos, transcription téléchargeable.
- Réglage *Réduire les animations* respecté.
