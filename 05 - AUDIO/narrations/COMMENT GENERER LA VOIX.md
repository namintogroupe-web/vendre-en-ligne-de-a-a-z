# Générer la voix d'une leçon (ElevenLabs)

On garde la **même voix que l'ancienne formation Digital Pro**, pour que les apprenants reconnaissent le formateur.

## Réglages

| Réglage | Valeur |
| --- | --- |
| Voix | **Tony – Warm, Dynamic Podcast Narrator** (français, accent africain) |
| Modèle | Eleven v4 |
| Stabilité | 50 % |
| Similarité | 75 % |
| Format | MP3, 44,1 kHz |

## Étapes

1. Ouvre le fichier `NARRATION 0.1.txt` (puis 0.2, 0.3…).
2. Copie **tout** le texte dans ElevenLabs, sans rien changer : chaque phrase doit rester identique au fichier, car le moteur vidéo cale l'animation phrase par phrase.
3. Garde les retours à la ligne : ils créent les petites respirations dont le moteur a besoin pour se caler.
4. Génère, écoute, puis télécharge le MP3.
5. Renomme-le **`VOIX 0.1.mp3`** (même numéro que la leçon) et range-le dans `05 - AUDIO\voix\` sur l'ordinateur.
6. Préviens Claude : la vidéo finale est assemblée automatiquement (logo animé, musique en fondu, effets sonores, sous-titres calés sur la voix).

## Vérifications avant d'envoyer

- La voix ne doit **pas être coupée à la fin** : il faut une seconde de silence après le dernier mot. Sinon, le moteur refuse le fichier.
- Si un mot est mal prononcé (par exemple un nom de marque), régénère seulement ce passage, ou écris-le comme il se prononce dans le fichier texte. Préviens Claude du changement pour mettre à jour le storyboard.
- Les nombres sont écrits en lettres quand la prononciation compte (« quatorze jours », « module trois »).

## Musique et effets sonores

On réutilise ceux de l'ancienne formation :
- `musique-learning-flow.wav` : le thème Digital Pro.
- `sfx_logo`, `sfx_swoosh`, `sfx_pop`, `sfx_hit` : les effets sonores.

Les fichiers audio restent sur l'ordinateur et dans le Drive, **pas sur GitHub**.

### Effets futuristes à ajouter (facultatif)

Pour aller plus loin dans le style premium et futuriste, ces 4 effets peuvent être générés avec **ElevenLabs Sound Effects**. Range-les dans `05 - AUDIO\sfx\` sous ces noms : le moteur les utilisera dès qu'ils seront là.

| Fichier | Prompt ElevenLabs |
| --- | --- |
| `sfx_riser.wav` | Futuristic synth riser, 1.5 seconds, clean and premium, rising filtered sweep ending on a soft bright tone, no drums |
| `sfx_click.wav` | Futuristic glassy UI tap, very short, crisp and clean, premium interface click, subtle |
| `sfx_data.wav` | Soft digital data blips, short sequence of tiny high-tech beeps, gentle and modern, very short |
| `sfx_valid.wav` | Bright futuristic success chime, short luminous synth chord, premium and positive, clean tail |
