// ---- Data ----
const Evidence = [
  {key:'emf5', name:'EMF 5', icon:'⚡️'},
  {key:'spiritBox', name:'Spirit Box', icon:'📻'},
  {key:'fingerprints', name:'Vingerafdrukken', icon:'🖐️'},
  {key:'ghostWriting', name:'Ghost Writing', icon:'✍️'},
  {key:'ghostOrbs', name:'Ghost Orbs', icon:'🟡'},
  {key:'freezing', name:'Vrieskou', icon:'❄️'},
  {key:'dots', name:'DOTS Projector', icon:'🔹'},
];

const NORMAL_LOS_NOTE = "Meeste geesten: basis 1.7 m/s, versnellen tot 1.65× bij zicht (≈2.8 m/s) en zakken langzaam terug.";
const Blink = {
  standard: { label: "Standaard", details: "Zichtbaar 0.08–0.30s / onzichtbaar 0.10–0.92s per flikker-set." },
  moreVisible: { label: "Meer zichtbaar", details: "Oni & Deogen: gemiddeld langer zichtbaar en korter onzichtbaar." },
  phantomLike: { label: "Phantom (meer onzichtbaar)", details: "Zichtbaar 0.08–0.30s / onzichtbaar 0.70–1.92s." }
};

// 24 ghosts
const Ghosts = [
  { key:'spirit', name:'Spirit', evidences:['emf5','spiritBox','ghostWriting'],
    abilities:'Geen speciale hunt modifiers. Smudge werkt langer tegen deze geest.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'wraith', name:'Wraith', evidences:['emf5','spiritBox','dots'],
    abilities:'Mijdt vaak zout; kan bij spelers verschijnen.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'phantom', name:'Phantom', evidences:['spiritBox','fingerprints','dots'],
    abilities:'Kijken naar de geest drain’t sanity. Foto laat hem verdwijnen.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'phantomLike' },
  { key:'poltergeist', name:'Poltergeist', evidences:['spiritBox','fingerprints','ghostWriting'],
    abilities:'Kan meerdere objecten tegelijk gooien; sterker met veel throwables.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'banshee', name:'Banshee', evidences:['fingerprints','ghostOrbs','dots'],
    abilities:'Target één speler; unieke parabolic “scream”.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'jinn', name:'Jinn', evidences:['emf5','fingerprints','freezing'],
    abilities:'Sneller bij zicht op afstand met stroom aan.',
    speed:{ summary: "2.5 m/s bij zicht (>3m) met stroom aan; anders normaal.", min:1.7, max:2.5, special:'2.5 m/s met stroom aan & LoS' }, blink:'standard' },
  { key:'mare', name:'Mare', evidences:['spiritBox','ghostOrbs','ghostWriting'],
    abilities:'Sterker in het donker; zet graag lichten uit.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'revenant', name:'Revenant', evidences:['ghostOrbs','ghostWriting','freezing'],
    abilities:'Zeer snel zodra hij je ziet; zeer traag zonder target.',
    speed:{ summary: "1.0 m/s zonder target; 3.0 m/s bij zicht; remt terug.", min:1.0, max:3.0, special:'Sneller bij zicht' }, blink:'standard' },
  { key:'shade', name:'Shade', evidences:['emf5','ghostWriting','freezing'],
    abilities:'Schuw; weinig events; jaagt niet dichtbij spelers.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'demon', name:'Demon', evidences:['fingerprints','ghostWriting','freezing'],
    abilities:'Kan zeer vroeg jagen; kortere smudge-cooldown.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'yurei', name:'Yurei', evidences:['ghostOrbs','freezing','dots'],
    abilities:'Sterke sanity drain via deur-event.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'oni', name:'Oni', evidences:['emf5','freezing','dots'],
    abilities:'Meer zichtbaar tijdens hunts; actiever bij spelers; geen airball event.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'moreVisible' },
  { key:'yokai', name:'Yokai', evidences:['spiritBox','ghostOrbs','dots'],
    abilities:'Hoort stemmen slecht tijdens jacht (~2.5m).',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'Klein stem-bereik' }, blink:'standard' },
  { key:'hantu', name:'Hantu', evidences:['fingerprints','ghostOrbs','freezing'],
    abilities:'Snelheid stijgt in kou; adembevriezing bij stroom uit.',
    speed:{ summary: "Temp-afhankelijk: ~1.4–2.7 m/s (kouder = sneller).", min:1.4, max:2.7, special:'Temp-gebonden' }, blink:'standard' },
  { key:'goryo', name:'Goryo', evidences:['emf5','fingerprints','dots'],
    abilities:'DOTS meestal alleen via camera en zonder spelers in kamer.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'myling', name:'Myling', evidences:['emf5','fingerprints','ghostWriting'],
    abilities:'Voetstappen zijn stiller/hoorbaar op kortere afstand; meer parabolic geluiden.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'Voetstappen hoor je pas dichterbij' }, blink:'standard' },
  { key:'onryo', name:'Onryo', evidences:['spiritBox','ghostOrbs','freezing'],
    abilities:'Vlammen voorkomen jacht; 3 kaarsen doven kan jacht triggeren.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'' }, blink:'standard' },
  { key:'twins', name:'The Twins', evidences:['emf5','spiritBox','freezing'],
    abilities:'Dubbele interacties; wisselende loopsnelheid.',
    speed:{ summary: "Hoofd 1.5 m/s; decoy 1.9 m/s; verder normale regels.", min:1.5, max:1.9, special:'Twee snelheden' }, blink:'standard' },
  { key:'raiju', name:'Raiju', evidences:['emf5','ghostOrbs','dots'],
    abilities:'Sneller dichtbij actieve elektronica; groter storingsbereik.',
    speed:{ summary: "2.5 m/s in radius van actieve elektronica; anders normaal.", min:1.7, max:2.5, special:'2.5 m/s bij elektronica' }, blink:'standard' },
  { key:'obake', name:'Obake', evidences:['emf5','fingerprints','ghostOrbs'],
    abilities:'Ongewone prints; verdwijnen sneller; kan kort shapeshiften.',
    speed:{ summary: NORMAL_LOS_NOTE, min:1.7, max:2.8, special:'Kan shapeshiften' }, blink:'standard' },
  { key:'mimic', name:'The Mimic', evidences:['spiritBox','fingerprints','freezing'],
    abilities:'Imiteert andere geesten; toont vaak extra “vals” orbs.',
    speed:{ summary: "Volgt snelheid/gedrag van het geïmiteerde type.", min:1.4, max:3.0, special:'Variabel (imitatie)' }, blink:'standard' },
  { key:'moroi', name:'Moroi', evidences:['spiritBox','ghostWriting','freezing'],
    abilities:'Sneller bij lage sanity; smudge verblindt 50% langer.',
    speed:{ summary: "Basis 1.5–2.25 m/s (lage sanity sneller); met LoS max ≈3.71 m/s.", min:1.5, max:3.71, special:'Sanity-gebonden' }, blink:'standard' },
  { key:'deogen', name:'Deogen', evidences:['spiritBox','ghostWriting','dots'],
    abilities:'Weet altijd waar je bent; razendsnel ver weg, extreem traag dichtbij.',
    speed:{ summary: "Afstand-afhankelijk: ~0.4 m/s (dichtbij) tot 3.0 m/s (ver).", min:0.4, max:3.0, special:'Afstand-gebonden' }, blink:'moreVisible' },
  { key:'thaye', name:'Thaye', evidences:['ghostOrbs','ghostWriting','dots'],
    abilities:'Heel sterk/snel in het begin; wordt trager en zwakker na verloop.',
    speed:{ summary: "Start 2.75 m/s; daalt in stappen tot ~1.0 m/s.", min:1.0, max:2.75, special:'Wordt trager met tijd' }, blink:'standard' },
];

// Minimal tests (can be expanded later)
const TestEffects = { favorOnPass:'favorOnPass', eliminateOnPass:'eliminateOnPass', eliminateOnFail:'eliminateOnFail', none:'none' };
const testsByKey = {
  'banshee': [{id:'banshee-parabolic', title:'Parabolic “scream”', howTo:'Luister met parabolic in geestenruimte naar de unieke Banshee scream.', effect:TestEffects.favorOnPass, notes:'Zeldzaam maar sterk signaal.'}],
  'goryo': [
    {id:'goryo-dots-camera', title:'DOTS alleen op camera', howTo:'Plaats DOTS + camera; verlaat de kamer en kijk via camera.', effect:TestEffects.favorOnPass},
    {id:'goryo-dots-inperson', title:'DOTS in persoon', howTo:'Zie je DOTS duidelijk in persoon? Goryo onwaarschijnlijk.', effect:TestEffects.eliminateOnPass}
  ],
  'obake': [{id:'obake-fingerprints', title:'Afwijkende vingerafdrukken', howTo:'Zoek 6-vinger prints / snelle fade met UV.', effect:TestEffects.favorOnPass}],
  'deogen': [{id:'deogen-speed', title:'Snel dichtbij vs ver', howTo:'Forceer jacht en observeer: extreem traag dichtbij.', effect:TestEffects.favorOnPass}],
  'raiju': [{id:'raiju-electronics', title:'Elektronica versnelling', howTo:'Laat meerdere devices aan en observeer snelheidsboost.', effect:TestEffects.favorOnPass}],
  'spirit': [{id:'spirit-smudge', title:'Smudge-cooldown', howTo:'Smudge tijdens jacht; langere preventietijd wijst op Spirit.', effect:TestEffects.favorOnPass}],
  'wraith': [{id:'wraith-salt', title:'Zout voetstappen', howTo:'Leg zout en check UV/geluid na erdoor lopen.', effect:TestEffects.favorOnPass}],
  'mimic': [{id:'mimic-orbs', title:'Extra “vals” orbs', howTo:'Zie je orbs terwijl bewijs geen orbs vraagt? Verdacht.', effect:TestEffects.favorOnPass}]
};
Ghosts.forEach(g => g.tests = testsByKey[g.key] || []);

// ---- State (LocalStorage) ----
const LS = {
  selected: 'pj_selectedEvidence_v1',
  excluded: 'pj_excludedEvidence_v1',
  circled: 'pj_circled_v1',
  crossed: 'pj_crossed_v1',
  results: 'pj_testResults_v1'
};

const state = {
  selected: new Set(JSON.parse(localStorage.getItem(LS.selected) || '[]')),
  excluded: new Set(JSON.parse(localStorage.getItem(LS.excluded) || '[]')),
  circled: new Set(JSON.parse(localStorage.getItem(LS.circled) || '[]')),
  crossed: new Set(JSON.parse(localStorage.getItem(LS.crossed) || '[]')),
  results: JSON.parse(localStorage.getItem(LS.results) || '{}'),
  onlyPossible: true,
  search: ''
};

function saveState() {
  localStorage.setItem(LS.selected, JSON.stringify([...state.selected]));
  localStorage.setItem(LS.excluded, JSON.stringify([...state.excluded]));
  localStorage.setItem(LS.circled, JSON.stringify([...state.circled]));
  localStorage.setItem(LS.crossed, JSON.stringify([...state.crossed]));
  localStorage.setItem(LS.results, JSON.stringify(state.results));
}

// ---- UI helpers ----
const $ = sel => document.querySelector(sel);

function renderEvidenceChips() {
  const wrap = $('#evidenceChips');
  wrap.innerHTML = '';
  Evidence.forEach(ev => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = `${ev.icon} ${ev.name}`;
    if (state.selected.has(ev.key)) chip.classList.add('on');
    else if (state.excluded.has(ev.key)) chip.classList.add('off');
    chip.addEventListener('click', () => {
      if (!state.selected.has(ev.key) && !state.excluded.has(ev.key)) {
        state.selected.add(ev.key);
      } else if (state.selected.has(ev.key)) {
        state.selected.delete(ev.key);
        state.excluded.add(ev.key);
      } else {
        state.excluded.delete(ev.key);
      }
      saveState(); renderEvidenceChips(); renderList();
    });
    wrap.appendChild(chip);
  });
}

function ghostMatchesFilters(g) {
  const hasAll = [...state.selected].every(k => g.evidences.includes(k));
  const hasNone = ![...state.excluded].some(k => g.evidences.includes(k));
  return hasAll && hasNone;
}

function renderList() {
  const list = $('#ghostList');
  list.innerHTML = '';
  const only = $('#onlyPossible').checked;
  const pool = (only ? Ghosts.filter(ghostMatchesFilters) : Ghosts)
    .filter(g => !state.search ? true : g.name.toLowerCase().includes(state.search.toLowerCase()));
  pool.forEach(g => {
    const row = document.createElement('div');
    row.className = 'row-item';
    const main = document.createElement('div'); main.className='row-main';
    const title = document.createElement('div'); title.className='row-title'; title.textContent = g.name;
    const sub = document.createElement('div'); sub.className='row-sub';
    const evidencesText = g.evidences.map(k => Evidence.find(e=>e.key===k)?.name).join(' • ');
    const results = state.results[g.key] || {};
    const anyPos = g.tests.some(t => results[t.id] === 'positief');
    const anyNeg = g.tests.some(t => results[t.id] === 'negatief');
    const badges = (anyPos? ' — ✅ test positief' : '') + (anyNeg? (anyPos?' · ':' — ') + '❌ test negatief' : '');
    sub.textContent = evidencesText + badges;
    main.append(title, sub);
    const actions = document.createElement('div'); actions.className='row-actions';
    const cBtn = document.createElement('button'); cBtn.className='circle'; cBtn.textContent='○';
    const xBtn = document.createElement('button'); xBtn.className='cross'; xBtn.textContent='✕';
    cBtn.classList.toggle('active', state.circled.has(g.key));
    xBtn.classList.toggle('active', state.crossed.has(g.key));
    cBtn.onclick = (e)=>{ state.circled.has(g.key)?state.circled.delete(g.key):state.circled.add(g.key); saveState(); renderList(); e.stopPropagation();};
    xBtn.onclick = (e)=>{ state.crossed.has(g.key)?state.crossed.delete(g.key):state.crossed.add(g.key); saveState(); renderList(); e.stopPropagation();};
    row.addEventListener('click', () => openDialog(g));
    actions.append(cBtn, xBtn);
    row.append(main, actions);
    list.appendChild(row);
  });
}

function chip(name) {
  const el = document.createElement('div');
  el.className='chip';
  el.textContent = name;
  return el;
}

function setKV(container, data) {
  container.innerHTML = '';
  for (const [k,v] of Object.entries(data)) {
    const kEl = document.createElement('div'); kEl.textContent = k; kEl.style.color = 'var(--muted)';
    const vEl = document.createElement('div'); vEl.textContent = v;
    container.appendChild(kEl); container.appendChild(vEl);
  }
}

function openDialog(g) {
  const dlg = document.getElementById('ghostDialog');
  document.getElementById('dlgName').textContent = g.name;
  const ev = document.getElementById('dlgEvidence'); ev.innerHTML='';
  g.evidences.forEach(k => ev.appendChild(chip(Evidence.find(e=>e.key===k).name)));
  document.getElementById('dlgAbilities').textContent = g.abilities;
  const notesWrap = document.getElementById('dlgNotesWrap');
  if (g.notes) { notesWrap.classList.remove('hide'); document.getElementById('dlgNotes').textContent=g.notes; } else { notesWrap.classList.add('hide'); }

  // Speed
  const sp = document.getElementById('dlgSpeed');
  const speedText = `${g.speed.summary}${g.speed.special ? ' ('+g.speed.special+')' : ''}`;
  setKV(sp, { 'Samenvatting': speedText, 'Min-max (m/s)': `${g.speed.min} – ${g.speed.max}` });

  // Blink
  const bl = document.getElementById('dlgBlink');
  const profile = Blink[g.blink] || Blink.standard;
  setKV(bl, { 'Profiel': profile.label, 'Details': profile.details });

  // Mark buttons
  const circleBtn = document.getElementById('dlgCircle');
  const crossBtn = document.getElementById('dlgCross');
  circleBtn.classList.toggle('active', state.circled.has(g.key));
  crossBtn.classList.toggle('active', state.crossed.has(g.key));
  circleBtn.onclick = () => { state.circled.has(g.key)?state.circled.delete(g.key):state.circled.add(g.key); saveState(); renderList(); openDialog(g); };
  crossBtn.onclick = () => { state.crossed.has(g.key)?state.crossed.delete(g.key):state.crossed.add(g.key); saveState(); renderList(); openDialog(g); };

  // Tests
  const testsWrap = document.getElementById('dlgTests'); testsWrap.innerHTML='';
  (g.tests||[]).forEach(t => {
    const div = document.createElement('div'); div.className='test';
    const h5 = document.createElement('h5'); h5.textContent=t.title;
    const p = document.createElement('p'); p.textContent=t.howTo;
    div.append(h5,p);
    if (t.notes) { const n=document.createElement('p'); n.className='badge'; n.textContent='💡 '+t.notes; div.append(n); }
    const controls=document.createElement('div'); controls.className='controls';
    const sel=document.createElement('select');
    ['onbekend','positief','negatief'].forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v[0].toUpperCase()+v.slice(1); sel.append(o); });
    const res = (state.results[g.key]||{})[t.id] || 'onbekend';
    sel.value = res;
    sel.onchange = () => {
      const v = sel.value;
      state.results[g.key] = state.results[g.key] || {};
      state.results[g.key][t.id] = v;
      if (t.effect==='favorOnPass' && v==='positief') state.circled.add(g.key);
      if (t.effect==='eliminateOnPass' && v==='positief') state.crossed.add(g.key);
      if (t.effect==='eliminateOnFail' && v==='negatief') state.crossed.add(g.key);
      saveState(); renderList();
    };
    controls.appendChild(sel);
    div.append(controls);
    testsWrap.append(div);
  });

  document.getElementById('dlgClose').onclick = () => dlg.close();
  dlg.showModal();
}

// Events
document.getElementById('btnReset').onclick = () => {
  state.selected.clear(); state.excluded.clear();
  saveState(); renderEvidenceChips(); renderList();
};
document.getElementById('onlyPossible').onchange = ()=> renderList();
document.getElementById('search').oninput = e => { state.search = e.target.value; renderList(); };
document.getElementById('btnAbout').onclick = ()=> document.getElementById('aboutDialog').showModal();
document.getElementById('aboutClose').onclick = ()=> document.getElementById('aboutDialog').close();

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

// Init
renderEvidenceChips(); renderList();
