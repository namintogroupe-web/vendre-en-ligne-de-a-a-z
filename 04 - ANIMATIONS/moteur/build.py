#!/usr/bin/env python3
"""Digital Pro — fabrique une leçon vidéo (moteur v2).

python3 build.py STORYBOARD.json 0-1 --assets DIR --out DIR [--audio voix.mp3] [--fps 30] [--html-only]

Sans --audio : minutage estimé, aperçu sans voix (fichier « -apercu »).
Avec --audio : l'animation et les sous-titres se calent sur les pauses de la voix (ElevenLabs, voix « Tony »).
DIR assets : logo/ (7 calques PNG), music.wav, sfx_logo.wav, sfx_swoosh.wav, sfx_pop.wav, sfx_hit.wav.

Règles son (charte § 8) :
- la musique ouvre avec le logo à plein niveau, puis s'efface en 2 s dès que la voix commence ;
- pas de musique pendant la leçon ;
- elle revient en fondu (3 s) sur la dernière phrase, sous la voix, puis porte la clôture.
"""
import json, re, subprocess, sys, os, argparse, math, base64
HERE = os.path.dirname(os.path.abspath(__file__))
INTRO = 3.6   # ouverture du logo, sans voix
TAIL = 5.5    # clôture après le dernier mot

def segs_of(sb):
    out = []
    for si, sc in enumerate(sb['scenes']):
        for k, s in enumerate(sc['say']):
            say = s if isinstance(s, str) else s['say']
            cap = s if isinstance(s, str) else s.get('cap', say)
            out.append({'scene': si, 'k': k, 'say': say, 'cap': cap})
    return out

def weight(t):
    return len(t) + 6 * len(re.findall(r'[.:;!?…]', t)) + 3 * t.count(',')

def silences(audio):
    r = subprocess.run(['ffmpeg', '-i', audio, '-af', 'silencedetect=noise=-38dB:d=0.18', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', r)]
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', audio], capture_output=True, text=True).stdout)
    return [(s, en[i] if i < len(en) else dur) for i, s in enumerate(st)], dur

def align(segs, audio):
    """Cale chaque phrase sur une pause réelle de la voix (programmation dynamique)."""
    pairs, dur = silences(audio)
    if not pairs or pairs[-1][1] < dur - 0.05 or dur - pairs[-1][0] < 0.25:
        raise SystemExit(f'Narration coupée à la fin ({audio}) : régénérer la voix avant le montage.')
    speech0 = pairs[0][1] if pairs and pairs[0][0] < 0.05 else 0.0
    speech1 = pairs[-1][0] if pairs and pairs[-1][1] >= dur - 0.05 else dur
    gaps = [p for p in pairs if p[0] > speech0 + 0.05 and p[1] < speech1 - 0.05]
    w = [weight(s['say']) for s in segs]; tot = sum(w); cum = 0; est = []
    for x in w[:-1]:
        cum += x; est.append(speech0 + (speech1 - speech0) * cum / tot)
    n, m = len(est), len(gaps); INF = 1e18
    if n == 0:
        return [(speech0, speech1)], speech1
    if m < n:
        raise SystemExit(f'Pas assez de pauses dans la voix ({m}) pour {n} phrases : laisser une respiration entre les phrases.')
    cost = [[INF] * m for _ in range(n)]; back = [[-1] * m for _ in range(n)]
    c = lambda i, j: (gaps[j][1] - est[i]) ** 2 - 2.5 * min(gaps[j][1] - gaps[j][0], 1.2)
    for j in range(m):
        cost[0][j] = c(0, j)
    for i in range(1, n):
        best, bj = INF, -1
        for j in range(m):
            if j >= 1 and cost[i - 1][j - 1] < best:
                best, bj = cost[i - 1][j - 1], j - 1
            if best < INF:
                cost[i][j] = best + c(i, j); back[i][j] = bj
    j = min(range(m), key=lambda jj: cost[n - 1][jj]); picks = [0] * n
    for i in range(n - 1, -1, -1):
        picks[i] = j; j = back[i][j]
    starts = [speech0] + [gaps[p][1] for p in picks]
    ends = [gaps[p][0] for p in picks] + [speech1]
    return list(zip(starts, ends)), speech1

def estimate(segs):
    t = 0.3; out = []
    for s in segs:
        d = weight(s['say']) / 15.5
        out.append((t, t + d)); t += d + 0.5
    return out, t - 0.5

def split_cap(text):
    if len(text) <= 64:
        return [text]
    mid = len(text) // 2
    cands = [m.end() for m in re.finditer(r'[,:;] |\. |… |\? ', text)] or [m.start() for m in re.finditer(' ', text)]
    cut = min(cands, key=lambda x: abs(x - mid))
    return split_cap(text[:cut].strip()) + split_cap(text[cut:].strip())

def b64(path):
    return 'data:image/png;base64,' + base64.b64encode(open(path, 'rb').read()).decode()

def build_data(sb, segs, times, sp_end, assets):
    off = INTRO; total = off + sp_end + TAIL; scenes = []
    for si, sc in enumerate(sb['scenes']):
        idx = [i for i, s in enumerate(segs) if s['scene'] == si]
        d = dict(sc); d.pop('say', None)
        d['seg'] = [off + times[i][0] for i in idx]
        d['t0'] = max(off + times[idx[0]][0] - 0.45, (scenes[-1]['t0'] + 1.0) if scenes else off - 0.3)
        scenes.append(d)
    for i, d in enumerate(scenes):
        d['t1'] = scenes[i + 1]['t0'] if i + 1 < len(scenes) else total
    caps = []
    for i, s in enumerate(segs):
        a = off + times[i][0]; b = off + times[i][1] + 0.25
        if i + 1 < len(segs):
            b = min(b, off + times[i + 1][0] - 0.05)
        parts = split_cap(s['cap']); L = sum(len(p) for p in parts); t = a
        for p in parts:
            dd = (b - a) * len(p) / L
            caps.append([round(t, 3), round(t + dd - 0.04, 3), p]); t += dd
    lg = os.path.join(assets, 'logo')
    logo = {'ink': b64(f'{lg}/layer-ink-light.png'), 'arrow': b64(f'{lg}/part-arrow.png'), 'p': b64(f'{lg}/part-p.png'), 'r': b64(f'{lg}/part-r.png'),
            'o': b64(f'{lg}/part-o.png'), 'll': b64(f'{lg}/part-line-left.png'), 'lr': b64(f'{lg}/part-line-right.png')}
    voice_start = off + times[0][0]
    last_seg = off + times[-1][0]
    return {'chip': sb['chip'], 'total': round(total, 3), 'intro': INTRO, 'logo': logo, 'scenes': scenes, 'caps': caps,
            'voice_start': round(voice_start, 3), 'last_seg': round(last_seg, 3)}

def page(data, path):
    css = open(os.path.join(HERE, 'engine.css')).read(); js = open(os.path.join(HERE, 'engine.js')).read()
    open(path, 'w').write(f'<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>{css}</style></head><body><script>window.DATA={json.dumps(data, ensure_ascii=False)};</script><script>{js}</script></body></html>')

def render(html, out, total, fps, workdir, parts=4):
    frames = int(math.ceil(total * fps)); per = math.ceil(frames / parts); procs = []; files = []
    cues = os.path.join(workdir, 'cues.json')
    for k in range(parts):
        f = os.path.join(workdir, f'part{k}.mp4'); files.append(f)
        procs.append(subprocess.Popen(['node', os.path.join(HERE, 'render.js'), html, f, str(k * per), str(min(frames, (k + 1) * per)), str(fps), cues if k == 0 else '']))
    for p in procs:
        if p.wait() != 0:
            raise SystemExit('rendu échoué')
    lst = os.path.join(workdir, 'parts.txt'); open(lst, 'w').write(''.join(f"file '{f}'\n" for f in files))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', out], check=True)
    return json.load(open(cues))['cues']

def mix(video, voice, cues, data, assets, out):
    total = data['total']; vs = data['voice_start']; ls = data['last_seg']
    inputs = ['-i', video]; fc = []; labels = []; n = 1
    if voice:
        d = int(INTRO * 1000); inputs += ['-i', voice]
        fc.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-16:TP=-1.5:LRA=11,adelay={d}|{d},apad,asplit=2[v][vsc]'); n += 1
    music = os.path.join(assets, 'music.wav')
    # 1) ouverture : plein niveau, fondu de sortie 2 s dès que la voix commence
    a_end = vs + 2.0
    inputs += ['-i', music]
    fc.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{a_end:.3f},volume=0.55,afade=t=in:d=0.3,afade=t=out:st={vs:.3f}:d=2.0[mA]'); n += 1
    labels.append('[mA]')
    # 2) retour sur la dernière phrase : fondu d'entrée 3 s, sous la voix, puis fin en fondu
    mb = max(1.0, total - ls); ms = int(ls * 1000)
    inputs += ['-stream_loop', '-1', '-i', music]
    fc.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=8:{8 + mb:.3f},asetpts=PTS-STARTPTS,volume=0.55,afade=t=in:d=3.0,afade=t=out:st={max(0, mb - 2.5):.3f}:d=2.5,adelay={ms}|{ms}[mB0]'); n += 1
    if voice:
        fc.append('[mB0][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=40:release=500[mB]'); labels = ['[v]', '[mA]', '[mB]']
    else:
        labels.append('[mB0]')
    gains = {'logo': 0.55, 'swoosh': 0.30, 'pop': 1.4, 'hit': 0.45, 'click': 0.6, 'data': 0.5, 'valid': 0.6, 'riser': 0.5}
    # effets futuristes facultatifs : s'ils ne sont pas encore fournis, on prend l'effet de base le plus proche
    fallback = {'click': 'pop', 'data': 'pop', 'valid': 'hit', 'riser': 'logo'}
    last = {}
    for t, name, g in cues:
        if not os.path.exists(os.path.join(assets, f'sfx_{name}.wav')) and name in fallback:
            g = g * gains[name] / gains[fallback[name]]; name = fallback[name]
        if name == 'pop' and t - last.get('pop', -9) < 0.18:
            continue
        last[name] = t
        ms = int(max(0, t - (0.03 if name in ('pop', 'hit') else 0)) * 1000)
        inputs += ['-i', os.path.join(assets, f'sfx_{name}.wav')]
        fc.append(f'[{n}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={gains[name] * g:.3f},adelay={ms}|{ms}[s{n}]'); labels.append(f'[s{n}]'); n += 1
    fc.append(f"{''.join(labels)}amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{total:.3f},alimiter=limit=0.89[a]")
    script = out + '.filter.txt'; open(script, 'w').write(';\n'.join(fc))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + inputs + ['-filter_complex_script', script, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
    os.remove(script)

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('sb'); ap.add_argument('vid'); ap.add_argument('--audio'); ap.add_argument('--assets', required=True)
    ap.add_argument('--out', required=True); ap.add_argument('--fps', type=int, default=30); ap.add_argument('--html-only', action='store_true')
    a = ap.parse_args()
    sb = json.load(open(a.sb))[a.vid]; segs = segs_of(sb)
    times, sp_end = align(segs, a.audio) if a.audio else estimate(segs)
    os.makedirs(a.out, exist_ok=True)
    data = build_data(sb, segs, times, sp_end, a.assets)
    html = os.path.join(a.out, f'{a.vid}.html'); page(data, html)
    print('durée', data['total'], 's')
    if a.html_only:
        sys.exit()
    work = os.path.join(a.out, a.vid + '-work'); os.makedirs(work, exist_ok=True)
    silent = os.path.join(work, 'silent.mp4')
    cues = render(html, silent, data['total'], a.fps, work)
    final = os.path.join(a.out, sb['file'] + ('' if a.audio else ' - apercu sans voix') + '.mp4')
    mix(silent, a.audio, cues, data, a.assets, final)
    print('ok', final)
