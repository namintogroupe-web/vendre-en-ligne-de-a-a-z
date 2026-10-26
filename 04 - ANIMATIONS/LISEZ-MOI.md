# 04 - ANIMATIONS

- `moteur/` — le moteur vidéo Digital Pro v2 (repris de l'ancienne formation, aux nouvelles règles de la charte) :
  - `engine.css`, `engine.js` : les scènes animées (logo animé, titres, chemin, démonstration téléphone, pause pratique, À retenir, clôture).
  - `build.py` : cale l'animation et les sous-titres sur la voix, puis mixe musique et effets sonores.
  - `render.js` : rend la page image par image (Playwright + ffmpeg).
- `storyboards/` — une scène par plan du script, avec les phrases exactes de la voix.
- `LOGO ANIME - OUVERTURE ET CLOTURE.md` — la séquence du logo.

Fabriquer une vidéo :

```
python3 build.py ../storyboards/module-00.json 0-1 --assets DOSSIER_AUDIO --out SORTIE --audio "VOIX 0.1.mp3"
```

Sans `--audio`, on obtient un aperçu sans voix au minutage estimé.
Le dossier `--assets` contient `logo/` (les 7 calques), `music.wav` et les `sfx_*.wav`.
