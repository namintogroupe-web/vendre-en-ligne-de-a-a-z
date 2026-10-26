// Digital Pro — moteur vidéo v2.
// DATA (injecté par build.py) : {chip,total,intro,logo:{ink,arrow,p,r,o,ll,lr},scenes:[{type,…,t0,t1,seg:[…]}],caps:[[t0,t1,txt]]}
// Toutes les animations sont des animations CSS à délai absolu : render.js les fige image par image.
(function () {
  const D = window.DATA, CUES = window.CUES = [];
  window.DURATION = D.total;
  const $ = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const OUT = 'cubic-bezier(.16,1,.3,1)', IO = 'cubic-bezier(.65,0,.35,1)', RISE = 'cubic-bezier(.34,1.56,.64,1)';
  // fill 'both' seulement pour la première animation d'une propriété ; les suivantes en 'forwards'
  function A(el, name, dur, at, opt = {}) {
    const s = `${name} ${dur}s ${opt.ease || OUT} ${opt.fill || 'both'} ${Math.max(0, at).toFixed(3)}s${opt.iter ? ' ' + opt.iter : ''}`;
    el.style.animation = el.style.animation ? el.style.animation + ',' + s : s;
  }
  const cue = (t, n, g) => CUES.push([+Math.max(0, t).toFixed(3), n, g || 1]);
  const kf = (name, frames) => { const st = document.getElementById('kf') || document.head.appendChild(Object.assign(document.createElement('style'), { id: 'kf' })); st.textContent += `@keyframes ${name}{${frames}}`; };
  const ICON = {
    digital: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M10 8l4 2-4 2z"/>',
    physical: '<path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
    medal: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13 7 21l5-3 5 3-1.5-8"/>',
    rise: '<path d="M4 18 L18 6"/><path d="M10 6h8v8"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
  };
  const svg = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24">${ICON[k]}</svg>`;

  const stage = $('div'); stage.id = 'stage'; document.body.appendChild(stage);
  stage.appendChild(Object.assign($('div'), { id: 'bg' }));

  // ---------- scènes ----------
  const R = {};
  function sceneBox(d, i) {
    const s = $('div', 'scene s-' + d.type); stage.appendChild(s);
    A(s, 'fadeIn', .5, d.t0);
    A(s, 'fadeOut', .45, d.t1 - .45, { fill: 'forwards' });
    if (i > 0) cue(d.t0 - .7, 'swoosh');
    return s;
  }
  const seg = (d, k) => d.seg[Math.min(k, d.seg.length - 1)];

  R.title = (s, d) => {
    s.innerHTML = `<svg class="chev" viewBox="0 0 520 640"><g><path d="M60 620 260 420 460 620" opacity=".18"/></g><g><path d="M60 420 260 220 460 420" opacity=".45"/></g><g><path d="M60 220 260 20 460 220"/></g></svg>
      <div class="txt"><div class="over">${d.over}</div><div class="t"><span><i>${d.l1}</i></span><span><i>${d.l2}</i></span></div><div class="sub">${d.sub}</div></div>`;
    s.querySelectorAll('.chev g').forEach((g, k) => A(g, 'rise', 1.1, d.t0 + .1 + (2 - k) * .14, { ease: RISE }));
    A(s.querySelector('.over'), 'up', .6, d.t0 + .2);
    s.querySelectorAll('.t i').forEach((e, k) => A(e, 'upMask', .7, d.t0 + .35 + k * .14));
    A(s.querySelector('.sub'), 'up', .6, d.t0 + .8);
  };

  R.notif = (s, d) => {
    s.innerHTML = `<div class="phone"><div class="notch"></div><div class="clock">${d.time}</div><div class="date">mardi 14 octobre</div>
      <div class="note"><div class="ic">D</div><div><div class="a">${d.app} · maintenant</div><div class="m">${d.msg}</div></div></div></div>
      <div class="kw">${d.kw.split(' ').reduce((a, w, k, arr) => { const half = Math.ceil(arr.length / 2); (k < half ? a[0] : a[1]).push(w); return a; }, [[], []]).map(l => `<span><i>${l.join(' ')}</i></span>`).join('')}</div>
      ${d.example ? '<div class="tagx">EXEMPLE</div>' : ''}`;
    A(s.querySelector('.phone'), 'up', .8, d.t0);
    A(s.querySelector('.note'), 'notifIn', .6, seg(d, 1), { ease: RISE }); cue(seg(d, 1), 'pop', 1.2);
    s.querySelectorAll('.kw i').forEach((e, k) => A(e, 'upMask', .7, seg(d, 2) + k * .14));
  };

  R.statement = (s, d) => {
    s.innerHTML = `<div class="wrap">${d.lines.map(l => `<div class="ln"><i>${l}</i></div>`).join('')}${d.foot ? `<div class="foot">${d.foot}</div>` : ''}</div>`;
    s.querySelectorAll('.ln i').forEach((e, k) => { const t = seg(d, k); A(e, 'upMask', .7, t); });
    const last = s.querySelectorAll('.ln')[d.lines.length - 1]; if (d.lines.length > 2) cue(seg(d, d.lines.length - 1), 'hit', .8);
    if (d.foot) A(s.querySelector('.foot'), 'up', .6, seg(d, d.lines.length));
  };

  R.welcome = (s, d) => {
    s.innerHTML = `<div class="wrap"><div class="over">${d.over}</div><div class="t"><span class="shine">${d.title}</span></div><div class="tg">${d.tag}</div></div>`;
    A(s.querySelector('.over'), 'up', .6, d.t0 + .1);
    const t = s.querySelector('.t'); A(t, 'pop', .9, d.t0 + .25, { ease: RISE }); cue(d.t0 + .25, 'hit', .7);
    A(s.querySelector('.shine'), 'shine', 1.6, d.t0 + 1.0, { ease: IO });
    A(s.querySelector('.tg'), 'up', .6, seg(d, 1));
  };

  R.path = (s, d) => {
    const x0 = 210, y0 = 860, dx = 300, dy = -86;
    let h = `<div class="head"><div class="over">${d.over}</div><div class="h">${d.heading}</div></div>
      <svg class="track" viewBox="0 0 1920 1080"><path d="M${x0} ${y0} L${x0 + dx * 5} ${y0 + dy * 5}" stroke="#2a2d33" stroke-width="10" stroke-linecap="round"/>
      <path class="lit" d="M${x0} ${y0} L${x0 + dx * 5} ${y0 + dy * 5}" stroke="#006cfb" stroke-width="10" stroke-linecap="round" stroke-dasharray="1520" stroke-dashoffset="1520"/></svg>`;
    d.steps.forEach((st, k) => {
      const x = x0 + dx * k - 48, y = y0 + dy * k - 48;
      h += `<div class="st${k === 5 ? ' last' : ''}" style="left:${x}px;top:${y}px"><div class="dot">${k + 1}</div><div class="on">${k + 1}</div><div class="tt">${st[0]}</div><div class="ds">${st[1]}</div></div>`;
    });
    s.innerHTML = h;
    A(s.querySelector('.head'), 'up', .6, d.t0 + .1);
    // la ligne bleue avance d'étape en étape
    const lit = s.querySelector('path.lit'); let fr = '0%{stroke-dashoffset:1520}';
    const t1 = seg(d, 1), tN = seg(d, 6) + .3, span = tN - t1;
    d.steps.forEach((st, k) => { const t = seg(d, st[2]); const p = Math.max(0, Math.min(100, (t - t1) / span * 100)); fr += `${p.toFixed(2)}%{stroke-dashoffset:${(1520 - 1520 * k / 5).toFixed(0)}}`; });
    kf('pathLit', fr + '100%{stroke-dashoffset:0}'); A(lit, 'pathLit', span, t1, { ease: 'linear' });
    s.querySelectorAll('.st').forEach((e, k) => {
      const t = seg(d, d.steps[k][2]);
      A(e.querySelector('.on'), 'pop', .55, t, { ease: RISE }); cue(t, 'pop');
      A(e.querySelector('.tt'), 'lit', .4, t); A(e.querySelector('.ds'), 'lit', .4, t);
    });
  };

  R.doors = (s, d) => {
    s.innerHTML = `<div class="head"><div class="over">${d.over}</div></div><div class="cards">${d.cards.map(c => `<div class="card"><div class="ic">${svg(c[0])}</div><h3>${c[1]}</h3><p>${c[2]}</p><div class="bar"></div></div>`).join('')}</div><div class="note">${d.note[0]}</div>`;
    A(s.querySelector('.head'), 'up', .6, d.t0 + .1);
    s.querySelectorAll('.card').forEach((c, k) => { const t = seg(d, d.cards[k][3]); A(c, 'up', .7, t); cue(t, 'pop'); A(c.querySelector('.bar'), 'grow', .9, t + .3); });
    A(s.querySelector('.note'), 'up', .6, seg(d, d.note[1]));
  };

  R.finale = (s, d) => {
    let days = ''; for (let k = 1; k <= 14; k++) days += `<div class="day${k === 14 ? ' l' : ''}">${k}<i>${k === 14 ? '✓' : k}</i></div>`;
    s.innerHTML = `<div class="head"><div class="over">${d.over}</div><div class="h">${d.heading}</div></div><div class="days">${days}</div>
      <div class="badge"><div class="medal">${svg('medal')}</div><span>${d.badge}</span></div>`;
    A(s.querySelector('.head'), 'up', .6, d.t0 + .1);
    const t = seg(d, 1); s.querySelectorAll('.day').forEach((e, k) => { A(e, 'up', .45, t + k * .07); A(e.querySelector('i'), 'lit', .3, t + .8 + k * .12); });
    cue(t + .8 + 13 * .12, 'pop', 1.2);
    A(s.querySelector('.badge'), 'pop', .7, seg(d, 2), { ease: RISE }); cue(seg(d, 2), 'hit', .8);
  };

  R.demo = (s, d) => {
    s.innerHTML = `<div class="head"><div class="over">${d.over}</div><div class="h">${d.heading}</div></div>
      <div class="steps">${d.steps.map((st, k) => `<div class="stp"><div class="nw"><div class="n">${k + 1}</div><div class="n on">${k + 1}</div></div>${st[0]}</div>`).join('')}</div>
      <div class="phone"><div class="notch"></div><div class="drv">
        <div class="top"><div class="search">Rechercher dans Drive</div></div>
        <div class="ttl">Mon Drive</div><div class="crumb">MON BUSINESS</div>
        <div class="list">
          <div class="row doc r0"><div class="fi"></div>Facture_octobre.pdf</div>
          <div class="row doc r1"><div class="fi"></div>Photos_produits</div>
          <div class="row nf"><div class="fi" style="background:#0b57d0"></div><b>MON BUSINESS</b></div>
          <div class="row sub s1"><div class="fi"></div>1 - PRODUIT</div>
          <div class="row sub s2"><div class="fi"></div>2 - VENTE</div>
          <div class="row sub s3"><div class="fi"></div>3 - PUBLICITÉ</div>
        </div>
        <div class="fab">+</div>
        <div class="sheet"><div class="it"><div class="sq">▭</div>Dossier</div><div class="it"><div class="sq">↑</div>Importer</div><div class="it"><div class="sq">⌗</div>Scanner</div></div>
        <div class="dlg"><h4>Nouveau dossier</h4><div class="inp"><i style="--w:7.4em">MON BUSINESS</i></div><div class="btns">Annuler &nbsp;&nbsp;&nbsp; Créer</div></div>
      </div><div class="tap"></div></div>`;
    A(s.querySelector('.head'), 'up', .6, d.t0 + .1);
    A(s.querySelector('.phone'), 'up', .8, d.t0 + .2);
    // étapes de gauche
    s.querySelectorAll('.stp').forEach((e, k) => { const t = seg(d, d.steps[k][1]); A(e, 'lit', .3, t); A(e.querySelector('.n.on'), 'pop', .5, t, { ease: RISE }); });
    const q = c => s.querySelector(c), tap = q('.tap');
    const taps = []; const T = (t, x, y) => taps.push([t, x, y]);
    // fichiers déjà présents
    A(q('.r0'), 'lit', .3, d.t0 + .5); A(q('.r1'), 'lit', .3, d.t0 + .6);
    // « + »
    const tPlus = seg(d, 2) + .6; T(tPlus, 279, 655);
    A(q('.sheet'), 'sheetIn', .45, tPlus + .35, { ease: OUT });
    // « Dossier »
    const tDos = seg(d, 3) + .4; T(tDos, 7, 419);
    A(q('.sheet'), 'sheetOut', .35, tDos + .3, { fill: 'forwards', ease: IO });
    A(q('.dlg'), 'pop', .45, tDos + .45, { ease: RISE });
    // saisie
    const tTyp = seg(d, 4); A(q('.dlg .inp i'), 'type', 1.3, tTyp, { ease: 'steps(12,end)' });
    cue(tTyp, 'data', .8);
    const tCre = tTyp + 1.9; T(tCre, 250, 461);
    A(q('.dlg'), 'fadeOut', .3, tCre + .3, { fill: 'forwards' });
    A(q('.nf'), 'pop', .5, tCre + .5, { ease: RISE }); cue(tCre + .5, 'pop', 1.2);
    // entrer dans le dossier
    const tIn = seg(d, 5) + .3; T(tIn, 0, 395);
    ['.r0', '.r1', '.nf', '.ttl'].forEach(c => A(q(c), 'fadeOut', .3, tIn + .35, { fill: 'forwards' }));
    A(q('.crumb'), 'fadeIn', .35, tIn + .45);
    // 3 sous-dossiers
    const tSub = seg(d, 6) + .4;
    ['.s1', '.s2', '.s3'].forEach((c, k) => { A(q(c), 'pop', .45, tSub + k * .7, { ease: RISE }); cue(tSub + k * .7, 'pop'); });
    // positions verticales : sous-dossiers à la place des fichiers
    q('.s1').style.cssText += ';position:absolute;top:0;left:0;right:0'; q('.s2').style.cssText += ';position:absolute;top:84px;left:0;right:0'; q('.s3').style.cssText += ';position:absolute;top:168px;left:0;right:0';
    // cercle de clic (un seul élément, animé à chaque clic)
    let fr = '', last = d.t0, frames = [];
    taps.forEach(([t, x, y], k) => { tap.style.left = x + 'px'; tap.style.top = y + 'px'; });
    taps.forEach(([t, x, y], k) => { const n = 'tap' + k; kf(n, `0%{opacity:0;transform:scale(1.6);left:${x}px;top:${y}px}30%{opacity:1;transform:scale(1);left:${x}px;top:${y}px}80%{opacity:1;left:${x}px;top:${y}px}100%{opacity:0;transform:scale(.9);left:${x}px;top:${y}px}`); A(tap, n, .7, t - .2, { fill: k === 0 ? 'both' : 'forwards' }); cue(t, 'click', 1); });
  };

  R.pause = (s, d) => {
    s.innerHTML = `<div class="wrap"><div class="ic"><i></i><i></i></div><div class="lb">PAUSE PRATIQUE</div><div class="task">${d.task}</div>
      <div class="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,.25)"/><circle class="rg" cx="50" cy="50" r="40" stroke="#c8f53a" stroke-dasharray="251" stroke-linecap="round"/></svg>${d.minutes} min · mets la vidéo en pause</div></div>`;
    A(s.querySelector('.ic'), 'pop', .7, d.t0 + .1, { ease: RISE }); cue(d.t0 + .1, 'hit', .7);
    A(s.querySelector('.task'), 'up', .6, d.t0 + .35);
    A(s.querySelector('.ring'), 'up', .6, d.t0 + .6);
    A(s.querySelector('.rg'), 'ring', Math.max(2, d.t1 - d.t0 - 1), d.t0 + .8, { ease: 'linear' });
  };

  R.check = (s, d) => {
    s.innerHTML = `<div class="wrap"><div class="ok">${svg('check')}</div><h2>${d.text}</h2><p>${d.sub}</p></div>`;
    A(s.querySelector('.ok'), 'pop', .7, d.t0 + .1, { ease: RISE }); cue(d.t0 + .1, 'valid', 1);
    A(s.querySelector('.ok path'), 'dash', .5, d.t0 + .45);
    A(s.querySelector('h2'), 'up', .6, d.t0 + .4); A(s.querySelector('p'), 'up', .6, seg(d, 1));
  };

  R.recap = (s, d) => {
    s.innerHTML = `<div class="box"><div class="lab">${svg('rise')}À retenir</div><ol>${d.items.map((it, k) => `<li><span>${k + 1}.</span><div>${it}</div></li>`).join('')}</ol></div>`;
    A(s.querySelector('.box'), 'up', .7, d.t0 + .1); cue(d.t0 + .1, 'hit', .9);
    s.querySelectorAll('li').forEach((e, k) => { const t = seg(d, k + 1); A(e, 'up', .55, t); cue(t, 'pop'); });
  };

  R.next = (s, d) => {
    s.innerHTML = `<div class="wrap"><div class="prog"><i></i></div><div class="pl">${d.done} / ${d.of} leçons</div><div class="btn">Leçon suivante →</div><div class="lb2">${d.label}</div></div>`;
    const bar = s.querySelector('.prog i'); bar.style.width = (d.done / d.of * 100) + '%';
    A(s.querySelector('.prog'), 'up', .6, d.t0 + 1.4); A(bar, 'grow', .9, d.t0 + 1.7);
    A(s.querySelector('.pl'), 'up', .5, d.t0 + 1.8);
    A(s.querySelector('.btn'), 'pop', .7, d.t0 + 2.2, { ease: RISE }); cue(d.t0 + 2.2, 'pop', 1.2);
    A(s.querySelector('.lb2'), 'up', .5, d.t0 + 2.5);
  };

  D.scenes.forEach((d, i) => { const s = sceneBox(d, i); (R[d.type] || (() => { }))(s, d); });

  // ---------- chip ----------
  const chip = $('div', null, D.chip); chip.id = 'chip'; stage.appendChild(chip);
  A(chip, 'fadeIn', .6, D.intro + .6);
  D.scenes.forEach(d => { if (d.type === 'pause') { A(chip, 'fadeOut', .3, d.t0, { fill: 'forwards' }); A(chip, 'fadeIn', .4, d.t1, { fill: 'forwards' }); } });
  A(chip, 'fadeOut', .4, D.scenes[D.scenes.length - 1].t0, { fill: 'forwards' });

  // ---------- logo animé ----------
  const L = D.logo, logo = $('div'); logo.id = 'logo';
  logo.innerHTML = `<div class="glow"></div>` + ['ink', 'arrow', 'll', 'p', 'r', 'o', 'lr'].map(k => `<img class="${k}" src="${L[k]}">`).join('');
  stage.appendChild(logo);
  const il = $('div'); il.id = 'iline'; stage.appendChild(il);
  const CEN = 'translate(400px,296px) scale(1.628)', BUG = 'translate(1722px,64px) scale(.1948)', BUG_L = 'translate(64px,64px) scale(.1948)', END = 'translate(547px,190px) scale(1.2)';
  const li = c => logo.querySelector('.' + c);
  kf('lgHold', `from{transform:${CEN}}to{transform:${CEN}}`);
  kf('lgToBug', `from{transform:${CEN}}to{transform:${BUG}}`);
  kf('lgToEnd', `from{transform:${BUG}}to{transform:${END}}`);
  kf('ilGrow', 'from{width:0;opacity:1}60%{width:760px;opacity:1}to{width:980px;opacity:0}');
  kf('arrowIn', 'from{opacity:0;transform:translate(-110px,140px);filter:blur(10px)}to{opacity:1;transform:none;filter:blur(0)}');
  kf('inkIn', 'from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}');
  kf('llIn', 'from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0 0 0 0)}');
  kf('drop', 'from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}');
  kf('glowP', '0%{opacity:0;transform:scale(.4)}40%{opacity:1;transform:scale(1.1)}100%{opacity:0;transform:scale(1.5)}');
  kf('flash', '0%{filter:brightness(1)}35%{filter:brightness(1.7) drop-shadow(0 0 24px rgba(0,108,251,.95))}100%{filter:brightness(1)}');
  A(logo, 'lgHold', D.intro, 0, { ease: 'linear' });
  A(il, 'ilGrow', .8, .05); cue(0, 'logo');
  A(li('arrow'), 'arrowIn', .95, .3, { ease: RISE });
  A(logo.querySelector('.glow'), 'glowP', 1.2, 1.0);
  A(li('ink'), 'inkIn', .75, .8, { ease: IO });
  ['p', 'r', 'o'].forEach((c, k) => A(li(c), 'drop', .55, 1.4 + k * .11));
  A(li('ll'), 'llIn', .55, 1.75); A(li('lr'), 'inkIn', .55, 1.75);
  A(li('arrow'), 'flash', .8, 2.3, { fill: 'none' });
  A(logo, 'lgToBug', 1.0, D.intro - .2, { ease: IO, fill: 'forwards' });
  // reflet discret toutes les ~45 s
  for (let t = D.intro + 40; t < D.total - 15; t += 45) A(li('arrow'), 'flash', .7, t, { fill: 'none' });
  // masqué pendant les pauses pratiques
  D.scenes.forEach(d => { if (d.type === 'pause') { A(logo, 'fadeOut', .3, d.t0, { fill: 'forwards' }); A(logo, 'fadeIn', .4, d.t1, { fill: 'forwards' }); } });
  // clôture : retour au centre
  const tEnd = D.scenes[D.scenes.length - 1].t0;
  A(logo, 'lgToEnd', 1.1, tEnd, { ease: IO, fill: 'forwards' });
  A(logo.querySelector('.glow'), 'glowP', 1.2, tEnd + 1.0, { fill: 'forwards' });
  cue(D.total - 2.2, 'hit', .9);

  // ---------- sous-titres ----------
  const caps = $('div'); caps.id = 'caps'; stage.appendChild(caps);
  D.caps.forEach(([a, b, t]) => { const c = $('div', 'cap', t); caps.appendChild(c); A(c, 'fadeIn', .12, a, { ease: 'linear' }); A(c, 'fadeOut', .12, b, { fill: 'forwards', ease: 'linear' }); });
})();
