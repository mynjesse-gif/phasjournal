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

const Tests = {
  favorOnPass: 'favorOnPass',
  eliminateOnPass: 'eliminateOnPass',
  eliminateOnFail: 'eliminateOnFail',
  none: 'none'
};

const Ghosts = [
  { key:'spirit', name:'Spirit', evidences:['emf5','spiritBox','ghostWriting'],
    abilities:'Geen unieke jacht modifiers; smudge geeft langere cooldown.',
    notes:'Standaardgedrag; smudge geeft langere cooldown.',
    tests:[
      {id:'spirit-smudge-cooldown', title:'Smudge-cooldown meten', howTo:'Smudge tijdens jacht en meet tijd tot volgende mogelijke jacht; Spirit is langer dan gemiddeld.', effect:Tests.favorOnPass, notes:'Gebruik timer.'}
    ]
  },
  { key:'wraith', name:'Wraith', evidences:['emf5','spiritBox','dots'],
    abilities:'Mijdt vaak zout; kan bij spelers verschijnen.',
    notes:'Zelden voetstappen in zout (kan wel).',
    tests:[
      {id:'wraith-salt', title:'Zout-voetstappen check', howTo:'Leg zout op routes en check UV/geluid na erdoor lopen.', effect:Tests.favorOnPass, notes:'Indicatief, niet absoluut.'}
    ]
  },
  { key:'banshee', name:'Banshee', evidences:['fingerprints','ghostOrbs','dots'],
    abilities:'Target één speler; unieke parabolic scream.',
    notes:'De scream is zeldzaam.',
    tests:[
      {id:'banshee-parabolic', title:'Parabolic “scream”', howTo:'Richt parabolic op geestenlocatie en luister naar scream.', effect:Tests.favorOnPass, notes:'Zeer indicatief.'}
    ]
  },
  { key:'goryo', name:'Goryo', evidences:['emf5','fingerprints','dots'],
    abilities:'DOTS meestal alleen op camera zonder spelers in de kamer.',
    notes:'DOTS in persoon is zeldzaam.',
    tests:[
      {id:'goryo-dots-camera', title:'DOTS alleen op camera', howTo:'Plaats DOTS + camera; verlaat de kamer; DOTS zichtbaar via camera?', effect:Tests.favorOnPass, notes:'Als DOTS in persoon → geen Goryo.'},
      {id:'goryo-dots-inperson', title:'DOTS in persoon', howTo:'Blijf in de kamer en kijk of DOTS in persoon zichtbaar zijn.', effect:Tests.eliminateOnPass, notes:'Positief ⇒ Goryo uitsluiten.'}
    ]
  },
  { key:'deogen', name:'Deogen', evidences:['spiritBox','ghostWriting','dots'],
    abilities:'Weet altijd waar je bent; langzaam dichtbij, snel ver weg.',
    notes:'Loop dichtbij om snelheid te testen.',
    tests:[
      {id:'deogen-speed', title:'Snelheid dichtbij vs ver', howTo:'Forceer jacht; observeer extreem traag dichtbij.', effect:Tests.favorOnPass, notes:'Veilig testen met cover.'}
    ]
  },
  { key:'raiju', name:'Raiju', evidences:['emf5','ghostOrbs','dots'],
    abilities:'Sneller bij elektronica.',
    notes:'Zet devices uit voor controle.',
    tests:[
      {id:'raiju-electronics', title:'Elektronica versnelling', howTo:'Laat meerdere apparaten aan tijdens jacht en kijk of snelheid toeneemt.', effect:Tests.favorOnPass}
    ]
  },
  { key:'obake', name:'Obake', evidences:['emf5','fingerprints','ghostOrbs'],
    abilities:'Ongewone vingerafdrukken die sneller vervagen.',
    notes:'Let op 6-vinger prints.',
    tests:[
      {id:'obake-fingerprints', title:'Afwijkende vingerafdrukken', howTo:'Check UV op deuren/ramen; 6 vingers/snelle fade.', effect:Tests.favorOnPass}
    ]
  },
  { key:'mimic', name:'The Mimic', evidences:['spiritBox','fingerprints','freezing'],
    abilities:'Imiteert anderen; vaak extra “vals” orbs.',
    notes:'Orbs als vierde bewijs.',
    tests:[
      {id:'mimic-orbs', title:'Extra orbs', howTo:'Zie je orbs terwijl bewijs geen orbs vereist? Verdacht voor Mimic.', effect:Tests.favorOnPass}
    ]
  },
];

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
    const open = ()=> openDialog(g);
    const rowClick = ()=> open();
    row.addEventListener('click', rowClick);
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

function openDialog(g) {
  const dlg = document.getElementById('ghostDialog');
  document.getElementById('dlgName').textContent = g.name;
  const ev = document.getElementById('dlgEvidence'); ev.innerHTML='';
  g.evidences.forEach(k => ev.appendChild(chip(Evidence.find(e=>e.key===k).name)));
  document.getElementById('dlgAbilities').textContent = g.abilities;
  const notesWrap = document.getElementById('dlgNotesWrap');
  if (g.notes) { notesWrap.classList.remove('hide'); document.getElementById('dlgNotes').textContent=g.notes; } else { notesWrap.classList.add('hide'); }
  const circleBtn = document.getElementById('dlgCircle');
  const crossBtn = document.getElementById('dlgCross');
  circleBtn.classList.toggle('active', state.circled.has(g.key));
  crossBtn.classList.toggle('active', state.crossed.has(g.key));
  circleBtn.onclick = () => { state.circled.has(g.key)?state.circled.delete(g.key):state.circled.add(g.key); saveState(); renderList(); openDialog(g); };
  crossBtn.onclick = () => { state.crossed.has(g.key)?state.crossed.delete(g.key):state.crossed.add(g.key); saveState(); renderList(); openDialog(g); };
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
