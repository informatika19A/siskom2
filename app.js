/* ============================================================
   DOKTER KOMPUTER — logika aplikasi
   ============================================================ */
(function () {
'use strict';

const C = window.CONFIG, M = window.MATERI, D = window.DATA;
const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const TPS = ['tp1', 'tp2', 'tp3', 'tp4'];
const LET = 'ABCDE';
const SIMKEY = { tp1: 's1', tp2: 's2', tp3: 's3', tp4: 's4' };

/* ---------- util ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rp = h => 'Rp ' + (h * 1000).toLocaleString('id-ID');
const avg = a => { const b = a.filter(x => x != null && !isNaN(x)); return b.length ? b.reduce((x, y) => x + y, 0) / b.length : null; };
const fmt = x => x == null ? '–' : (Math.round(x * 10) / 10).toString().replace('.', ',');
const num = x => (x === '' || x == null || isNaN(Number(x))) ? null : Number(x);
const parseJ = s => { if (s && typeof s === 'object') return s; try { return JSON.parse(s); } catch (e) { return null; } };
const initials = n => String(n).trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();

let toastT;
function toast(msg, kind) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.className = 'toast show ' + (kind || '');
  t.textContent = msg;
  clearTimeout(toastT);
  toastT = setTimeout(() => { t.className = 'toast'; }, 3400);
}

/* ---------- state ---------- */
const S = { view: 'login', tab: 'materi', tmp: {}, dash: null, dashPw: null };
let user = store.get('skx_user', null);
let prog = null;

function progKey() { return 'skx_prog_' + user.nis + '_' + user.kelas; }
function freshProg() { return { pre: null, sim: {}, refleksi: null, post: null, draft: { a: {}, viol: { paste: 0, tab: 0 } } }; }
function loadProg() {
  prog = store.get(progKey(), null) || freshProg();
  if (!prog.sim) prog.sim = {};
  if (!prog.draft) prog.draft = { a: {}, viol: { paste: 0, tab: 0 } };
}
function saveProg() { store.set(progKey(), prog); }

/* ---------- pengiriman ke Google Sheet ---------- */
function logLocal(p) {
  const l = store.get('skx_log', []);
  l.push(p);
  if (l.length > 800) l.splice(0, l.length - 800);
  store.set('skx_log', l);
}
function flushQueue() {
  if (!C.SCRIPT_URL) return;
  const q = store.get('skx_queue', []);
  if (!q.length) return;
  store.set('skx_queue', []);
  q.forEach(p => {
    fetch(C.SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(p) })
      .catch(() => { const r = store.get('skx_queue', []); r.push(p); store.set('skx_queue', r); });
  });
}
async function send(p) {
  const full = Object.assign({ jenis: p.jenis, waktu: new Date().toISOString(), nama: user.nama, nis: user.nis, kelas: user.kelas, tanggal: user.tanggal }, p);
  logLocal(full);
  if (!C.SCRIPT_URL) { toast('💾 Tersimpan di perangkat ini (mode demo)'); return; }
  const body = JSON.stringify(full);
  try {
    const r = await fetch(C.SCRIPT_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
    const j = await r.json();
    if (j.ok) toast('✅ Tersimpan ke Google Sheet', 'ok');
    else toast('⚠️ Server menolak data: ' + (j.error || ''), 'warn');
  } catch (e) {
    try {
      await fetch(C.SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
      toast('📨 Data dikirim ke Google Sheet', 'ok');
    } catch (e2) {
      const q = store.get('skx_queue', []); q.push(full); store.set('skx_queue', q);
      toast('⚠️ Koneksi bermasalah. Data akan dikirim ulang nanti.', 'warn');
    }
  }
}

/* ---------- navigasi ---------- */
function go(view, tab) {
  S.view = view;
  if (tab) S.tab = tab;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function unlocked(v) {
  const pre = !!prog.pre;
  if (v === 'home' || v === 'pre') return true;
  if (/^tp\d$/.test(v)) return pre;
  if (v === 'refleksi') return pre && TPS.every(t => prog.sim[t]);
  if (v === 'post') return !!prog.refleksi;
  return true;
}
function lockMsg(v) {
  if (/^tp\d$/.test(v)) return 'Kerjakan Pre-test dulu ya 📝';
  if (v === 'refleksi') return 'Selesaikan keempat simulasi dulu 🎮';
  if (v === 'post') return 'Isi Refleksi Belajar dulu ya 🪞';
  return '';
}
function milestones() { return [!!prog.pre].concat(TPS.map(t => !!prog.sim[t]), [!!prog.refleksi, !!prog.post]); }

const NAV = [
  { v: 'home', e: '🏠', t: 'Beranda' },
  { v: 'pre', e: '📝', t: 'Pre-test' },
  { v: 'tp1', e: '🔌', t: 'Tujuan 1: Driver' },
  { v: 'tp2', e: '🧠', t: 'Tujuan 2: Perangkat Keras' },
  { v: 'tp3', e: '🌡️', t: 'Tujuan 3: Restart & Macet' },
  { v: 'tp4', e: '🛠️', t: 'Tujuan 4: Aneka Masalah' },
  { v: 'refleksi', e: '🪞', t: 'Refleksi Belajar' },
  { v: 'post', e: '🏁', t: 'Post-test' }
];
function navDone(v) {
  if (v === 'pre') return !!prog.pre;
  if (/^tp\d$/.test(v)) return !!prog.sim[v];
  if (v === 'refleksi') return !!prog.refleksi;
  if (v === 'post') return !!prog.post;
  return false;
}

/* ---------- shell ---------- */
function shell(inner) {
  const nav = NAV.map(n => {
    const lock = !unlocked(n.v);
    return `<button class="nav-i ${S.view === n.v ? 'on' : ''} ${lock ? 'lock' : ''}" data-act="nav" data-v="${n.v}">
      <span class="nav-e">${n.e}</span><span class="nav-t">${n.t}</span><span class="nav-s">${lock ? '🔒' : (navDone(n.v) ? '✅' : '')}</span></button>`;
  }).join('');
  const pct = Math.round(milestones().filter(Boolean).length / 7 * 100);
  return `<div class="shell">
    <header class="topbar">
      <div class="brand"><span class="logo">🩺</span><div><b>SISTEM KOMPUTER</b><small>Informatika Kelas X</small></div></div>
      <div class="who"><span class="avatar">${esc(initials(user.nama))}</span>
        <div class="who-t"><b>${esc(user.nama)}</b><small>${esc(user.kelas)} · NIS ${esc(user.nis)}</small></div>
        <button class="btn sm ghost" data-act="logout">Keluar</button></div>
    </header>
    <div class="layout">
      <nav class="side card"><div class="side-prog"><div class="bar"><i style="width:${pct}%"></i></div><small>Progres belajar ${pct}%</small></div>${nav}</nav>
      <main class="main">${inner}</main>
    </div></div>`;
}

/* ============================ LOGIN ============================ */
function viewLogin() {
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  return `<div class="login-wrap">
    <section class="hero card t-blue">
      <div class="hero-badge">🩺 Media Pembelajaran Interaktif · Informatika Kelas X</div>
      <h1>SISTEM KOMPUTER</h1>
      <p class="hero-sub">Berbagai Permasalahan Penggunaan Komputer</p>
      <p class="lead">Periksa driver, pilih perangkat keras yang tepat, tangani komputer yang restart dan macet, lalu jadilah teknisi andal!</p>
      <ul class="goals">${TPS.map(t => `<li><span>${M[t].emoji}</span>${esc(M[t].tujuan)}</li>`).join('')}</ul>
    </section>
    <section class="card login-card">
      <h2>👋 Yuk, masuk dulu</h2>
      <form data-form="login" novalidate>
        <label>Nama Lengkap<input name="nama" autocomplete="off" placeholder="Contoh: Ahmad Fauzi"></label>
        <label>NIS<input name="nis" inputmode="numeric" autocomplete="off" placeholder="Nomor Induk Siswa"></label>
        <div class="row2">
          <label>Tanggal<input type="date" name="tanggal" value="${today}"></label>
          <label>Kelas<select name="kelas"><option value="">Pilih kelas…</option>${C.KELAS.map(k => `<option>${esc(k)}</option>`).join('')}</select></label>
        </div>
        <div class="err" id="login-err"></div>
        <button class="btn primary block" type="submit">Mulai Belajar 🚀</button>
      </form>
      <button class="linkbtn" data-act="goto-dash">🔐 Dashboard Guru</button>
    </section>
    <div class="login-foot">SISTEM KOMPUTER 2 – MPI Informatika 2026 oleh Herry Kurniawan</div></div>`;
}

/* ============================ BERANDA ============================ */
function viewHome() {
  const ms = milestones(), done = ms.filter(Boolean).length, pct = Math.round(done / 7 * 100);
  const steps = [
    { v: 'pre', e: '📝', t: 'Pre-test', d: '10 soal pemanasan: 5 pilihan ganda + 5 pilihan ganda kompleks', c: 'yellow' },
    { v: 'tp1', e: '🔌', t: M.tp1.judul, d: 'Materi, simulasi Device Manager, dan dunia nyata', c: 'blue' },
    { v: 'tp2', e: '🧠', t: M.tp2.judul, d: 'Materi dan simulasi merakit komputer sesuai kebutuhan', c: 'mint' },
    { v: 'tp3', e: '🌡️', t: M.tp3.judul, d: 'Materi dan simulasi diagnosa restart & macet total', c: 'coral' },
    { v: 'tp4', e: '🛠️', t: M.tp4.judul, d: 'Materi dan klinik aneka masalah komputer', c: 'violet' },
    { v: 'refleksi', e: '🪞', t: 'Refleksi Belajar', d: 'Kenali cara belajarmu: regulasi diri dan metakognisi', c: 'yellow' },
    { v: 'post', e: '🏁', t: 'Post-test', d: '8 soal uraian (tiap tujuan: 1 biasa + 1 HOTS)', c: 'coral' }
  ];
  return `<section class="card home-hero t-blue">
      <div><span class="chip">Halo, ${esc(user.nama.split(' ')[0])}! 👋</span>
      <h1>Selamat datang di SISTEM KOMPUTER</h1>
      <p>Selesaikan petualangan berikut secara berurutan. Setiap langkah membuka langkah berikutnya.</p></div>
      <div class="ring" style="--p:${pct}"><b>${pct}%</b><small>${done}/7 langkah</small></div>
    </section>
    <h2 class="sec-t">🗺️ Peta Petualangan</h2>
    <div class="steps-grid">${steps.map((s, i) => {
      const lock = !unlocked(s.v), ok = navDone(s.v);
      return `<button class="step card c-${s.c} ${lock ? 'lock' : ''} ${ok ? 'done' : ''}" data-act="nav" data-v="${s.v}">
        <span class="step-n">${i + 1}</span><span class="step-e">${s.e}</span>
        <b>${esc(s.t)}</b><p>${esc(s.d)}</p>
        <span class="step-s">${lock ? '🔒 Terkunci' : (ok ? '✅ Selesai' : '▶️ Mulai')}</span></button>`;
    }).join('')}</div>`;
}

/* ============================ TES (PRE & POST) ============================ */
function normalize(t) { return ' ' + String(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() + ' '; }

function viewPre() {
  if (prog.pre) return preResult();
  const T = S.tmp.pre || (S.tmp.pre = { pg: [], pgk: D.prePGK.map(() => []) });
  const pg = D.prePG.map((q, i) => `<div class="q card"><div class="qn">${i + 1}</div><p class="qt">${esc(q.q)}</p>
    ${q.o.map((o, j) => `<label class="opt"><input type="radio" name="pg${i}" value="${j}" data-chg="pre-pg" data-i="${i}" ${T.pg[i] === j ? 'checked' : ''}><b>${LET[j]}</b><span>${esc(o)}</span></label>`).join('')}</div>`).join('');
  const pgk = D.prePGK.map((q, i) => `<div class="q card"><div class="qn">${i + 6}</div><p class="qt">${esc(q.q)}</p><span class="hintline">Pilih lebih dari satu jawaban</span>
    ${q.o.map((o, j) => `<label class="opt"><input type="checkbox" value="${j}" data-chg="pre-pgk" data-i="${i}" ${T.pgk[i].indexOf(j) > -1 ? 'checked' : ''}><b>${LET[j]}</b><span>${esc(o)}</span></label>`).join('')}</div>`).join('');
  return `<section class="card page-head t-yellow"><div class="tp-emoji">📝</div><div><span class="chip">Mulai di sini</span><h1>Pre-test</h1>
      <p>Santai saja! Tes ini untuk mengetahui seberapa jauh kamu sudah paham. Nilainya bukan penentu, melainkan titik awal belajarmu.</p></div></section>
    <h2 class="sec-t">Bagian A · Pilihan Ganda (5 soal)</h2>${pg}
    <h2 class="sec-t">Bagian B · Pilihan Ganda Kompleks (5 soal)</h2>${pgk}
    <div class="center"><button class="btn primary big" data-act="pre-submit">Kirim Jawaban 📨</button></div>`;
}
function preResult() {
  const p = prog.pre;
  const chip = (ok, n) => `<span class="rchip ${ok ? 'ok' : 'no'}">${n} ${ok ? '✓' : '✗'}</span>`;
  const msg = p.total >= 80 ? 'Wah, pondasimu sudah kuat! Tetap ikuti simulasi untuk mempertajamnya.' : (p.total >= 50 ? 'Bagus, kamu sudah punya dasar. Materi berikut akan melengkapinya.' : 'Tidak apa-apa! Justru itu alasan kamu belajar. Perhatikan materi dan simulasi dengan teliti.');
  return `<section class="card page-head t-yellow"><div class="tp-emoji">📝</div><div><span class="chip">Pre-test selesai</span><h1>Hasil Pre-test</h1><p>${msg}</p></div>
    <div class="score-badge big">${p.total}<small>dari 100</small></div></section>
    <div class="grid-2"><div class="card"><h3>Bagian A · Pilihan Ganda</h3><p class="muted">Skor ${p.skorPG}/50</p><div class="rchips">${p.pgBenar.map((b, i) => chip(b, i + 1)).join('')}</div></div>
    <div class="card"><h3>Bagian B · PG Kompleks</h3><p class="muted">Skor ${p.skorPGK}/50 (benar jika semua pilihan tepat)</p><div class="rchips">${p.pgkBenar.map((b, i) => chip(b, i + 6)).join('')}</div></div></div>
    <div class="callout tip"><b>🔎 Catatan:</b> kunci jawaban tidak ditampilkan. Kamu akan menemukan jawabannya sambil membaca materi dan mencoba simulasi.</div>
    <div class="center"><button class="btn primary big" data-act="nav" data-v="tp1">Mulai Petualangan 🚀</button></div>`;
}

function viewPost() {
  if (prog.post) return postDone();
  const dr = prog.draft;
  const groups = TPS.map(t => {
    const qs = D.post.filter(q => q.tp === t);
    return `<h2 class="sec-t">${M[t].emoji} Tujuan ${M[t].no}: ${esc(M[t].judul)}</h2>` + qs.map(q => {
      const n = D.post.indexOf(q) + 1;
      return `<div class="q card noselect" data-q="${q.id}"><div class="qn">${n}</div>
        <span class="badge ${q.tipe === 'HOTS' ? 'hots' : 'biasa'}">${q.tipe === 'HOTS' ? '🔥 HOTS' : '📘 Biasa'}</span>
        <p class="qt">${esc(q.soal)}</p>
        <textarea data-guard data-chg="post-ans" data-id="${q.id}" rows="${q.tipe === 'HOTS' ? 8 : 6}" placeholder="Ketik jawabanmu sendiri di sini…" spellcheck="false" autocomplete="off" autocapitalize="off">${esc(dr.a[q.id] || '')}</textarea>
        <div class="cnt" data-cnt="${q.id}">${(dr.a[q.id] || '').length} karakter</div></div>`;
    }).join('');
  }).join('');
  return `<section class="card page-head t-coral"><div class="tp-emoji">🏁</div><div><span class="chip">Tahap akhir</span><h1>Post-test</h1>
      <p>Jawablah dengan kalimatmu sendiri. Menyalin dan menempel dinonaktifkan: <b>semua jawaban harus diketik manual</b>.</p></div></section>
    <div class="callout warn"><b>🛡️ Aturan pengerjaan:</b> jangan berpindah tab atau jendela, dan jangan mencoba paste. Aktivitas tersebut tercatat dan dilaporkan kepada guru. Jawabanmu tersimpan sementara di perangkat ini bila halaman ter-refresh.</div>
    ${groups}
    <div class="center"><button class="btn primary big" data-act="post-submit">Kirim Post-test 🏁</button></div>`;
}
function scorePost() {
  return D.post.map(q => {
    const txt = prog.draft.a[q.id] || '';
    const n = normalize(txt);
    const cocok = q.konsep.filter(k => k.kata.some(w => n.indexOf(' ' + normalize(w).trim()) > -1)).map(k => k.l);
    const skor = Math.round(Math.min(1, cocok.length / q.perlu) * 125) / 10;
    return { id: q.id, jawaban: txt, skor, cocok };
  });
}
function postDone() {
  const p = prog.post;
  return `<section class="card page-head t-coral"><div class="tp-emoji">🎉</div><div><span class="chip">Selesai!</span><h1>Hebat, kamu menyelesaikan semuanya!</h1>
    <p>Jawaban post-test sudah terkirim. Nilai akhir akan diperiksa oleh gurumu.</p></div></section>
    <div class="grid-3">
      <div class="card stat"><small>Pre-test</small><b>${prog.pre ? prog.pre.total : '–'}</b></div>
      <div class="card stat"><small>Rata-rata simulasi</small><b>${fmt(avg(TPS.map(t => prog.sim[t] ? prog.sim[t].skor : null)))}</b></div>
      <div class="card stat"><small>Pelanggaran tercatat</small><b>${p.viol.paste + p.viol.tab}</b></div>
    </div>
    <div class="callout tip"><b>🌟 Langkah berikutnya:</b> bacalah kembali bagian materi yang masih terasa sulit, lalu praktikkan “Tantangan di rumah” pada setiap tujuan.</div>
    <div class="center"><button class="btn" data-act="nav" data-v="home">Kembali ke Beranda 🏠</button></div>`;
}

/* ============================ TUJUAN (MATERI / SIMULASI / TERAPAN) ============================ */
function viewTP(id) {
  const m = M[id];
  const tabs = [['materi', '📖 Materi'], ['simulasi', '🎮 Simulasi'], ['terapan', '🌏 Dunia Nyata']];
  let body;
  if (S.tab === 'materi') {
    body = m.sections.map(s => `<article class="card sec"><h2>${esc(s.h)}</h2>${s.html}</article>`).join('') +
      `<div class="center"><button class="btn primary big" data-act="tab" data-t="simulasi">Lanjut ke Simulasi 🎮</button></div>`;
  } else if (S.tab === 'simulasi') {
    body = ({ tp1: sim1, tp2: sim2, tp3: sim3, tp4: sim4 })[id]();
  } else {
    body = `<div class="grid-3">${m.terapan.map(t => `<div class="card mini"><div class="mini-e">${t.e}</div><b>${esc(t.h)}</b><p>${esc(t.p)}</p></div>`).join('')}</div>
      <div class="callout tip"><b>🏠 ${esc(m.tantangan)}</b></div>`;
  }
  return `<section class="card tp-head t-${m.warna}"><div class="tp-emoji">${m.emoji}</div>
      <div><span class="chip">Tujuan ${m.no}</span><h1>${esc(m.judul)}</h1><p>${esc(m.tujuan)}</p></div>
      ${prog.sim[id] ? `<div class="score-badge">⭐ ${prog.sim[id].skor}<small>skor terbaik</small></div>` : ''}</section>
    <div class="tabs t-${m.warna}">${tabs.map(t => `<button class="tab ${S.tab === t[0] ? 'on' : ''}" data-act="tab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
    <div class="t-${m.warna}">${body}</div>`;
}

function finishSim(tp, score, extra) {
  const prev = prog.sim[tp];
  const best = prev ? Math.max(prev.skor, score) : score;
  prog.sim[tp] = { skor: best, terakhir: score, percobaan: (prev ? prev.percobaan : 0) + 1 };
  saveProg();
  send({ jenis: 'simulasi', tp, skor: score, terbaik: best, percobaan: prog.sim[tp].percobaan, detail: JSON.stringify(extra || {}) });
}
function simDone(tp, score, detail) {
  const m = M[tp];
  const next = TPS.indexOf(tp) < 3 ? `<button class="btn primary" data-act="nav" data-v="${TPS[TPS.indexOf(tp) + 1]}">Tujuan berikutnya ➜</button>` :
    `<button class="btn primary" data-act="nav" data-v="${unlocked('refleksi') ? 'refleksi' : 'home'}">${unlocked('refleksi') ? 'Lanjut ke Refleksi 🪞' : 'Kembali ke Beranda'}</button>`;
  const msg = score >= 85 ? 'Luar biasa! Kamu sudah seperti teknisi profesional. 🏆' : (score >= 65 ? 'Bagus! Sedikit lagi menuju mahir. 💪' : 'Kamu sudah menyelesaikannya. Ulangi untuk meningkatkan skor! 🌱');
  return `<div class="card result"><div class="ring" style="--p:${score}"><b>${score}</b><small>skor</small></div>
    <h2>Simulasi selesai!</h2><p>${msg}</p>${detail || ''}
    <div class="center gap"><button class="btn" data-act="sim-reset" data-tp="${tp}">🔁 Ulangi simulasi</button>
    <button class="btn mint" data-act="tab" data-t="terapan">🌏 Lihat dunia nyata</button>${next}</div></div>`;
}

/* ---------- SIMULASI 1: Device Manager ---------- */
const ST_ICON = { ok: '🔹', warn: '⚠️', unknown: '❓', disabled: '⬇️' };
function sim1() {
  const T = S.tmp.s1 || (S.tmp.s1 = { i: 0, sel: null, bp: 0, ba: 0, hint: false, solved: false, pts: [], fb: null, done: false, score: 0 });
  const K = D.sim1;
  if (T.done) return simDone('tp1', T.score, `<p class="muted">Poin tiap kasus: ${T.pts.join(' · ')}</p>`);
  const c = K.kasus[T.i];
  const cats = []; c.dev.forEach(d => { if (cats.indexOf(d.cat) < 0) cats.push(d.cat); });
  const tree = cats.map(cat => `<div class="dm-cat">▾ ${esc(cat)}</div>` + c.dev.filter(d => d.cat === cat).map(d =>
    `<button class="dm-dev ${T.sel === d.id ? 'sel' : ''}" data-act="s1-sel" data-id="${d.id}" ${T.solved ? 'disabled' : ''}><span class="dm-ic">${ST_ICON[d.st]}</span>${esc(d.n)}</button>`).join('')).join('');
  const sd = c.dev.find(d => d.id === T.sel);
  const prop = sd ? `<div class="prop"><b>${esc(sd.n)}</b>
      <div class="prop-row"><span>Device status</span><p>${esc(sd.s || 'Perangkat ini berfungsi dengan baik.')}</p></div>
      ${sd.info ? `<div class="prop-row"><span>Info driver</span><p>${esc(sd.info)}</p></div>` : ''}</div>`
    : '<div class="prop empty">👈 Klik sebuah perangkat untuk melihat <i>Properties</i>-nya.</div>';
  const acts = K.aksi.map(a => `<button class="act-btn" data-act="s1-act" data-id="${a.id}" ${(!T.sel || T.solved) ? 'disabled' : ''}><span>${a.e}</span>${esc(a.n)}</button>`).join('');
  const fb = T.fb ? `<div class="fb ${T.fb.ok ? 'ok' : 'no'}">${esc(T.fb.msg)}</div>` : '';
  const why = T.solved ? `<div class="callout tip"><b>📘 Penjelasan:</b> ${esc(c.why)}</div>
      <div class="center"><button class="btn primary" data-act="s1-next">${T.i < K.kasus.length - 1 ? 'Kasus berikutnya ➜' : 'Selesai 🎉'}</button></div>` : '';
  return `<div class="sim-head"><span class="chip">Kasus ${T.i + 1} dari ${K.kasus.length}</span><b>${esc(c.judul)}</b><span class="muted">Poin: ${T.pts.reduce((a, b) => a + b, 0)}</span></div>
    <div class="card"><p>📖 ${esc(c.cerita)}</p><p class="muted">Langkah: (1) temukan perangkat yang bermasalah, (2) baca <i>Properties</i>, (3) pilih tindakan perbaikan yang tepat.</p></div>
    <div class="dm-grid">
      <div class="devwin"><div class="devwin-bar"><i></i><i></i><i></i><span>Device Manager</span></div><div class="devwin-body">${tree}</div></div>
      <div class="card"><h3>🔎 Properties</h3>${prop}<h3>🧰 Tindakan perbaikan</h3><div class="acts">${acts}</div>${fb}
        ${!T.solved ? `<button class="btn ghost sm" data-act="s1-hint">💡 Petunjuk (−3 poin)</button>${T.hint ? `<div class="callout tip">${esc(c.hint)}</div>` : ''}` : ''}</div>
    </div>${why}`;
}

/* ---------- SIMULASI 2: Rakit Komputer ---------- */
function sim2() {
  const T = S.tmp.s2 || (S.tmp.s2 = { sc: 0, pick: {}, best: {}, res: null, done: false, score: 0 });
  const K = D.sim2;
  if (T.done) return simDone('tp2', T.score, `<p class="muted">Skor tiap skenario: ${K.sc.map((s, i) => s.n + ' = ' + T.best[i]).join(' · ')}</p>`);
  const sc = K.sc[T.sc];
  const comps = ['cpu', 'ram', 'sto', 'gpu'];
  const cost = comps.reduce((a, c) => a + (T.pick[c] ? K.opsi[c].find(o => o.id === T.pick[c]).h : 0), 0);
  const over = cost > sc.budget, pctB = Math.min(100, Math.round(cost / sc.budget * 100));
  const tabs = K.sc.map((s, i) => `<button class="tab ${T.sc === i ? 'on' : ''}" data-act="s2-sc" data-i="${i}">${s.e} ${esc(s.n)} ${T.best[i] != null ? '✅' : ''}</button>`).join('');
  const lists = comps.map(c => `<div class="card"><h3>${esc(K.nama[c])}</h3><div class="optgrid">${K.opsi[c].map(o =>
    `<button class="part ${T.pick[c] === o.id ? 'on' : ''}" data-act="s2-pick" data-c="${c}" data-id="${o.id}"><b>${esc(o.n)}</b><small>${esc(o.d)}</small><span>${o.h ? rp(o.h) : 'Gratis'}</span></button>`).join('')}</div></div>`).join('');
  let res = '';
  if (T.res && T.res.sc === T.sc) {
    const r = T.res;
    res = `<div class="card result"><div class="ring" style="--p:${r.pct}"><b>${r.pct}</b><small>skor</small></div>
      <h2>${r.pct >= 85 ? 'Rekomendasi sangat tepat! 🏆' : (r.pct >= 60 ? 'Cukup baik, masih bisa dioptimalkan 💪' : 'Belum sesuai kebutuhan, coba lagi 🌱')}</h2>
      ${r.over ? `<div class="fb no">💸 Biaya ${rp(r.cost)} melebihi anggaran ${rp(sc.budget)} (−20 poin).</div>` : `<div class="fb ok">✅ Biaya ${rp(r.cost)} masih dalam anggaran ${rp(sc.budget)}.</div>`}
      <div class="rows">${r.rows.map(x => `<div class="rrow"><b>${esc(K.nama[x.c])}: ${esc(x.n)}</b><span class="stars">${'⭐'.repeat(x.p)}${'☆'.repeat(3 - x.p)}</span><p>${esc(x.why)}</p></div>`).join('')}</div></div>`;
  }
  const allDone = K.sc.every((s, i) => T.best[i] != null);
  return `<div class="tabs inner">${tabs}</div>
    <div class="card"><h3>${sc.e} ${esc(sc.n)}</h3><p>📖 ${esc(sc.cerita)}</p></div>
    <div class="build-grid"><div>${lists}</div>
      <aside class="card sticky"><h3>🧾 Rincian</h3>
        ${comps.map(c => `<div class="bill"><span>${esc(K.nama[c])}</span><b>${T.pick[c] ? rp(K.opsi[c].find(o => o.id === T.pick[c]).h) : '–'}</b></div>`).join('')}
        <div class="bill tot"><span>Total</span><b>${rp(cost)}</b></div>
        <div class="bar ${over ? 'over' : ''}"><i style="width:${pctB}%"></i></div><small class="muted">Anggaran ${rp(sc.budget)}</small>
        <button class="btn primary block" data-act="s2-eval" ${comps.every(c => T.pick[c]) ? '' : 'disabled'}>Evaluasi Rakitan ✅</button>
        ${allDone ? '<button class="btn mint block" data-act="s2-finish">Selesaikan Simulasi 🎉</button>' : '<small class="muted">Selesaikan keempat skenario untuk menutup simulasi.</small>'}
      </aside></div>${res}`;
}

/* ---------- pengendali kasus (sim 3 dan 4) ---------- */
function initCase(key) { return S.tmp[key] || (S.tmp[key] = { i: 0, step: 1, bad: [], tries: 0, solved: false, cur: 0, pts: [], phase: 'cases', done: false, score: 0 }); }
function caseView(key, cases, head) {
  const T = S.tmp[key], c = cases[T.i], q = T.step === 1 ? c.q1 : c.q2;
  const gauges = c.panel.map(p => `<div class="gauge lv-${p.lv}"><div class="g-top"><span>${esc(p.l)}</span><b>${esc(p.v)}</b></div>${p.pct != null ? `<div class="g-bar"><i style="width:${p.pct}%"></i></div>` : ''}</div>`).join('');
  const opts = q.o.map((o, j) => `<button class="opt-btn ${T.bad.indexOf(j) > -1 ? 'bad' : ''} ${T.solved && j === q.k ? 'good' : ''}" data-act="cs-ans" data-key="${key}" data-j="${j}" ${(T.bad.indexOf(j) > -1 || T.solved) ? 'disabled' : ''}><b>${LET[j]}</b>${esc(o)}</button>`).join('');
  const fb = T.solved ? `<div class="fb ok">✅ Tepat! ${esc(q.why)}</div>` : (T.bad.length ? '<div class="fb no">❌ Belum tepat. Pelajari datanya lalu coba pilihan lain.</div>' : '');
  const last = T.i === cases.length - 1 && T.step === 2;
  return `<div class="sim-head"><span class="chip">Kasus ${T.i + 1} dari ${cases.length}</span><b>${esc(c.judul)}</b><span class="muted">${head}</span></div>
    <div class="card"><p>📖 ${esc(c.cerita)}</p><div class="gauges">${gauges}</div></div>
    <div class="card"><h3>${T.step === 1 ? '🔎 Tahap 1: Diagnosa' : '🛠️ Tahap 2: Tindakan'}</h3><p class="qt">${esc(q.t)}</p><div class="optlist">${opts}</div>${fb}
      ${T.solved ? `<div class="center"><button class="btn primary" data-act="cs-next" data-key="${key}">${last ? (key === 's4' ? 'Lanjut ke susun urutan ➜' : 'Selesai 🎉') : (T.step === 1 ? 'Ke tahap 2 ➜' : 'Kasus berikutnya ➜')}</button></div>` : ''}</div>`;
}
function csAnswer(key, j) {
  const T = S.tmp[key], cases = key === 's3' ? D.sim3 : D.sim4.kasus;
  const q = T.step === 1 ? cases[T.i].q1 : cases[T.i].q2;
  if (T.solved) return;
  if (j === q.k) { T.cur += [50, 30, 15][Math.min(T.tries, 2)]; T.solved = true; }
  else { T.bad.push(j); T.tries++; }
  render();
}
function csNext(key) {
  const T = S.tmp[key], cases = key === 's3' ? D.sim3 : D.sim4.kasus;
  if (T.step === 1) { T.step = 2; T.bad = []; T.tries = 0; T.solved = false; render(); return; }
  T.pts.push(T.cur);
  if (T.i < cases.length - 1) { T.i++; T.step = 1; T.bad = []; T.tries = 0; T.solved = false; T.cur = 0; render(); return; }
  if (key === 's3') {
    T.score = Math.round(avg(T.pts)); T.done = true;
    finishSim('tp3', T.score, { pts: T.pts });
  } else {
    T.phase = 'order'; T.casesAvg = avg(T.pts);
    const urut = D.sim4.urut;
    T.order = urut.awal.slice(); T.att = 0; T.checked = null; T.ordScore = null;
  }
  render();
}

function sim3() {
  const T = initCase('s3');
  if (T.done) return simDone('tp3', T.score, `<p class="muted">Skor tiap kasus: ${T.pts.join(' · ')}</p>`);
  return caseView('s3', D.sim3, 'Skor kasus ini: ' + T.cur);
}

/* ---------- SIMULASI 4: klinik + urutan ---------- */
function sim4() {
  const T = initCase('s4');
  if (T.done) return simDone('tp4', T.score, `<p class="muted">Rata-rata kasus: ${fmt(T.casesAvg)} · Skor urutan langkah: ${T.ordScore}</p>`);
  if (T.phase === 'cases') return caseView('s4', D.sim4.kasus, 'Bagian A: klinik masalah');
  const U = D.sim4.urut;
  const list = T.order.map((id, idx) => {
    const st = U.steps.find(s => s.id === id);
    const mark = T.checked ? (T.checked[idx] ? '✅' : '❌') : '';
    return `<div class="ord ${T.checked ? (T.checked[idx] ? 'good' : 'bad') : ''}"><span class="ord-n">${idx + 1}</span><span class="ord-t">${esc(st.t)}</span>
      <span class="ord-b"><button data-act="ord-up" data-i="${idx}" ${idx === 0 || T.ordScore != null ? 'disabled' : ''}>▲</button><button data-act="ord-dn" data-i="${idx}" ${idx === T.order.length - 1 || T.ordScore != null ? 'disabled' : ''}>▼</button></span><span>${mark}</span></div>`;
  }).join('');
  const fin = T.ordScore != null;
  const correct = T.checked ? T.checked.filter(Boolean).length : 0;
  return `<div class="sim-head"><span class="chip">Bagian B</span><b>${esc(U.judul)}</b><span class="muted">Percobaan: ${T.att}/3</span></div>
    <div class="card"><p>📖 ${esc(U.cerita)}</p><div class="ordlist">${list}</div>
      ${T.checked ? `<div class="fb ${correct === T.order.length ? 'ok' : 'no'}">${correct === T.order.length ? '🎉 Urutan sudah benar!' : `Baru ${correct} dari ${T.order.length} langkah yang berada di posisi tepat.`}</div>` : ''}
      <div class="center gap">${fin ? '<button class="btn primary" data-act="ord-finish">Lihat hasil akhir 🎉</button>' : '<button class="btn primary" data-act="ord-check">Periksa urutan ✅</button>'}</div></div>`;
}
function ordCheck() {
  const T = S.tmp.s4, U = D.sim4.urut;
  const key = U.steps.map(s => s.id);
  T.att++;
  T.checked = T.order.map((id, i) => id === key[i]);
  const c = T.checked.filter(Boolean).length;
  if (c === key.length) { T.ordScore = Math.max(55, 100 - 15 * (T.att - 1)); }
  else if (T.att >= 3) { T.ordScore = Math.round(c / key.length * 50); T.order = key.slice(); T.checked = key.map(() => true); toast('Urutan yang benar ditampilkan. Pelajari alurnya ya!', 'warn'); }
  render();
}
function ordFinish() {
  const T = S.tmp.s4;
  T.score = Math.round(T.casesAvg * 0.7 + T.ordScore * 0.3);
  T.done = true;
  finishSim('tp4', T.score, { kasus: T.pts, urutan: T.ordScore });
  render();
}

/* ============================ REFLEKSI ============================ */
function viewRefleksi() {
  if (prog.refleksi) return reflResult();
  const R = D.refl;
  const T = S.tmp.ref || (S.tmp.ref = { lk: [], st: [], c0: 40, c1: 70, mood: null });
  const lk = R.likert.map((s, i) => `<div class="card lk"><p>${i + 1}. ${esc(s)}</p><div class="scale">${R.skala.map((n, j) => `<label class="sc"><input type="radio" name="lk${i}" value="${j + 1}" data-chg="ref-lk" data-i="${i}" ${T.lk[i] === j + 1 ? 'checked' : ''}><span><b>${j + 1}</b><small>${n}</small></span></label>`).join('')}</div></div>`).join('');
  const moods = R.moods.map((m, j) => `<label class="mood"><input type="radio" name="mood" value="${j}" data-chg="ref-mood" ${T.mood === j ? 'checked' : ''}><span><i>${m.e}</i>${m.n}</span></label>`).join('');
  const stems = R.stems.map((s, i) => `<div class="card noselect"><p class="qt">${i + 1}. ${esc(s)}</p>
    <textarea data-guard data-chg="ref-stem" data-i="${i}" rows="3" placeholder="Tulis spontan, apa adanya. Tidak ada jawaban benar atau salah." spellcheck="false" autocomplete="off">${esc(T.st[i] || '')}</textarea></div>`).join('');
  return `<section class="card page-head t-yellow"><div class="tp-emoji">🪞</div><div><span class="chip">Mengenal diri</span><h1>Refleksi Belajar</h1>
      <p>Tidak ada nilai benar atau salah. Jawablah jujur untuk mengenali caramu belajar, mengatur diri, dan berpikir tentang pikiranmu sendiri.</p></div></section>
    <h2 class="sec-t">1️⃣ Seberapa sering ini terjadi padamu?</h2>${lk}
    <h2 class="sec-t">2️⃣ Keyakinan diri</h2>
    <div class="card"><p>Seberapa yakin kamu mampu memperbaiki masalah komputer sederhana?</p>
      <div class="slider"><label>Sebelum belajar: <b id="c0v">${T.c0}</b>%<input type="range" min="0" max="100" step="5" value="${T.c0}" data-chg="ref-c0"></label>
      <label>Sesudah belajar: <b id="c1v">${T.c1}</b>%<input type="range" min="0" max="100" step="5" value="${T.c1}" data-chg="ref-c1"></label></div></div>
    <h2 class="sec-t">3️⃣ Perasaan belajarku hari ini</h2><div class="moods">${moods}</div>
    <h2 class="sec-t">4️⃣ Lanjutkan kalimat ini (tulis spontan!)</h2>${stems}
    <div class="center"><button class="btn primary big" data-act="ref-submit">Kirim Refleksi 💌</button></div>`;
}
function reflDims(lk) { return D.refl.dims.map(d => ({ n: d.n, v: avg(d.idx.map(i => lk[i])), tip: d.tip })); }
function reflResult() {
  const r = prog.refleksi, dims = r.dims;
  const lowest = dims.slice().sort((a, b) => a.v - b.v)[0];
  const sims = avg(TPS.map(t => prog.sim[t] ? prog.sim[t].skor : null));
  let cal = 'Keyakinanmu cukup selaras dengan hasil simulasimu. Itu tanda kesadaran diri yang baik! 🎯';
  if (sims != null) {
    if (r.c1 - sims > 20) cal = `Keyakinanmu (${r.c1}%) lebih tinggi daripada rata-rata simulasimu (${fmt(sims)}). Coba uji dirimu lagi sebelum merasa yakin penuh. 🔍`;
    else if (sims - r.c1 > 20) cal = `Hasil simulasimu (${fmt(sims)}) lebih tinggi daripada keyakinanmu (${r.c1}%). Kamu mampu lebih dari yang kamu kira! 🌟`;
  }
  return `<section class="card page-head t-yellow"><div class="tp-emoji">🪞</div><div><span class="chip">Refleksi terkirim</span><h1>Profil Belajarmu</h1><p>Berikut gambaran singkat dari jawabanmu.</p></div></section>
    <div class="card">${dims.map(d => `<div class="dimrow"><span>${esc(d.n)}</span><div class="bar"><i style="width:${d.v / 5 * 100}%"></i></div><b>${fmt(d.v)}</b></div>`).join('')}</div>
    <div class="callout tip"><b>🎯 Area untuk dikembangkan: ${esc(lowest.n)}.</b> ${esc(lowest.tip)}</div>
    <div class="callout"><b>🧭 Kalibrasi diri:</b> ${cal}</div>
    <div class="center"><button class="btn primary big" data-act="nav" data-v="post">Lanjut ke Post-test 🏁</button></div>`;
}

/* ============================ DASHBOARD GURU ============================ */
function groupLog(log) {
  const g = { login: [], pretest: [], simulasi: [], refleksi: [], posttest: [] };
  log.forEach(r => { if (g[r.jenis]) g[r.jenis].push(r); });
  return g;
}
async function fetchDash(pw) {
  if (!C.SCRIPT_URL) return groupLog(store.get('skx_log', []));
  const r = await fetch(C.SCRIPT_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'dashboard', pw }) });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || 'Gagal memuat data');
  return j.data;
}
function aggregate(data) {
  const map = {};
  const get = r => {
    const k = String(r.nis || '').trim() + '|' + String(r.kelas || '').trim();
    return map[k] || (map[k] = { nis: String(r.nis || ''), nama: r.nama, kelas: r.kelas, tanggal: r.tanggal, sim: {}, pre: null, post: null, ref: null });
  };
  (data.login || []).forEach(r => { get(r); });
  (data.pretest || []).forEach(r => { get(r).pre = { total: num(r.total), pg: num(r.skor_pg), pgk: num(r.skor_pgk), detail: parseJ(r.detail), jpg: r.jawaban_pg, jpgk: r.jawaban_pgk }; });
  (data.simulasi || []).forEach(r => { get(r).sim[r.tp] = { skor: num(r.terbaik), percobaan: num(r.percobaan) }; });
  (data.refleksi || []).forEach(r => { get(r).ref = r; });
  (data.posttest || []).forEach(r => { get(r).post = r; });
  return Object.values(map).sort((a, b) => (a.kelas || '').localeCompare(b.kelas || '') || (a.nama || '').localeCompare(b.nama || ''));
}
function viewDash() {
  const d = S.dash;
  if (!d || !d.rows) {
    return `<div class="login-wrap one"><section class="card login-card"><h2>🔐 Dashboard Guru</h2>
      <p class="muted">Masukkan kata sandi untuk memantau hasil belajar murid.</p>
      <form data-form="dashpw"><label>Kata sandi<input type="password" name="pw" autocomplete="off" placeholder="••••••••" ${C.SCRIPT_URL ? '' : 'disabled'}></label>
      ${C.SCRIPT_URL ? '' : '<div class="callout warn">Mode demo: <code>SCRIPT_URL</code> belum diisi, jadi dashboard hanya membaca data yang tersimpan di browser ini dan tidak memakai kata sandi.</div>'}
      <div class="err">${d && d.error ? esc(d.error) : ''}</div>
      <button class="btn primary block" type="submit">${d && d.loading ? 'Memuat…' : 'Masuk'}</button></form>
      <button class="linkbtn" data-act="dash-back">⬅ Kembali ke halaman murid</button></section></div>`;
  }
  const rows = d.rows;
  const st = k => rows.filter(r => !k || r.kelas === k);
  const pre = a => avg(a.map(r => r.pre ? r.pre.total : null));
  const post = a => avg(a.map(r => r.post ? num(r.post.skor_estimasi) : null));
  const simAvg = a => avg(a.map(r => avg(TPS.map(t => r.sim[t] ? r.sim[t].skor : null))));
  const klasList = C.KELAS;
  const chart = klasList.map(k => {
    const a = st(k), p1 = pre(a), p2 = post(a);
    return `<div class="cg"><div class="cbars"><div class="cb pre" style="height:${(p1 || 0)}%"><span>${fmt(p1)}</span></div><div class="cb post" style="height:${(p2 || 0)}%"><span>${fmt(p2)}</span></div></div><b>${esc(k)}</b><small>${a.length} murid</small></div>`;
  }).join('');
  return `<div class="dash">
    <header class="topbar"><div class="brand"><span class="logo">📊</span><div><b>Dashboard Guru</b><small>SISTEM KOMPUTER · Informatika Kelas X</small></div></div>
      <div class="who"><button class="btn sm" data-act="dash-refresh">🔄 Muat ulang</button><button class="btn sm" data-act="dash-csv">⬇️ Unduh CSV</button><button class="btn sm ghost" data-act="dash-back">Keluar</button></div></header>
    <main class="dash-main">
      ${d.demo ? '<div class="callout warn">Mode demo: menampilkan data yang tersimpan di browser ini saja.</div>' : ''}
      <div class="stats">
        <div class="card stat"><small>Total murid</small><b>${rows.length}</b></div>
        <div class="card stat"><small>Sudah pre-test</small><b>${rows.filter(r => r.pre).length}</b></div>
        <div class="card stat"><small>Sudah post-test</small><b>${rows.filter(r => r.post).length}</b></div>
        <div class="card stat"><small>Rerata pre-test</small><b>${fmt(pre(rows))}</b></div>
        <div class="card stat"><small>Rerata simulasi</small><b>${fmt(simAvg(rows))}</b></div>
        <div class="card stat"><small>Rerata post-test*</small><b>${fmt(post(rows))}</b></div>
      </div>
      <div class="card"><h3>📈 Rata-rata per kelas</h3><div class="chart">${chart}</div><div class="legend"><span class="lg pre"></span>Pre-test <span class="lg post"></span>Post-test (estimasi)</div></div>
      <div class="card"><div class="filters"><select data-chg="dash-kelas"><option value="">Semua kelas</option>${klasList.map(k => `<option>${esc(k)}</option>`).join('')}</select>
        <input placeholder="Cari nama atau NIS…" data-chg="dash-q"></div>
        <div class="tbl-wrap"><table class="tbl dtbl"><thead><tr><th>No</th><th>Nama</th><th>Kelas</th><th>NIS</th><th>Pre</th><th>TP1</th><th>TP2</th><th>TP3</th><th>TP4</th><th>Refleksi</th><th>Post*</th><th>Pelanggaran</th><th></th></tr></thead><tbody id="dash-body"></tbody></table></div>
        <p class="muted">*Nilai post-test adalah <b>estimasi otomatis</b> berdasarkan kata kunci konsep. Gunakan tombol Detail untuk membaca jawaban murid dan mengoreksinya.</p></div>
    </main></div>`;
}
function filteredRows() {
  const d = S.dash; if (!d || !d.rows) return [];
  const q = (d.q || '').toLowerCase();
  return d.rows.filter(r => (!d.fk || r.kelas === d.fk) && (!q || (r.nama || '').toLowerCase().indexOf(q) > -1 || r.nis.indexOf(q) > -1));
}
function dashRowVals(r) {
  const v = r.post ? (num(r.post.pelanggaran_paste) || 0) + (num(r.post.pelanggaran_tab) || 0) : null;
  return { post: r.post ? num(r.post.skor_estimasi) : null, viol: v };
}
function renderDashTable() {
  const body = document.getElementById('dash-body'); if (!body) return;
  const rows = filteredRows();
  body.innerHTML = rows.length ? rows.map((r, i) => {
    const x = dashRowVals(r);
    return `<tr><td>${i + 1}</td><td><b>${esc(r.nama)}</b></td><td>${esc(r.kelas)}</td><td>${esc(r.nis)}</td>
      <td>${r.pre ? r.pre.total : '–'}</td>${TPS.map(t => `<td>${r.sim[t] ? r.sim[t].skor : '–'}</td>`).join('')}
      <td>${r.ref ? '✅' : '–'}</td><td>${x.post != null ? fmt(x.post) : '–'}</td><td>${x.viol == null ? '–' : (x.viol > 0 ? `<span class="rchip no">${x.viol}</span>` : '0')}</td>
      <td><button class="btn sm" data-act="dash-detail" data-k="${esc(r.nis)}|${esc(r.kelas)}">Detail</button></td></tr>`;
  }).join('') : '<tr><td colspan="13" class="muted center">Belum ada data.</td></tr>';
}
function detailHtml(r) {
  const x = r.pre;
  const pretest = x ? `<p>Skor PG: <b>${x.pg}</b>/50 · Skor PG kompleks: <b>${x.pgk}</b>/50 · Total: <b>${x.total}</b></p>
    <p class="muted">Jawaban PG: ${esc(x.jpg || '-')}<br>Jawaban PG kompleks: ${esc(x.jpgk || '-')}</p>
    ${x.detail ? `<div class="rchips">${(x.detail.pg || []).map((b, i) => `<span class="rchip ${b ? 'ok' : 'no'}">${i + 1} ${b ? '✓' : '✗'}</span>`).join('')}${(x.detail.pgk || []).map((b, i) => `<span class="rchip ${b ? 'ok' : 'no'}">${i + 6} ${b ? '✓' : '✗'}</span>`).join('')}</div>` : ''}` : '<p class="muted">Belum mengerjakan.</p>';
  const sims = `<div class="rchips">${TPS.map(t => `<span class="rchip ${r.sim[t] ? 'ok' : 'no'}">${t.toUpperCase()}: ${r.sim[t] ? r.sim[t].skor + ' (' + r.sim[t].percobaan + 'x)' : '–'}</span>`).join('')}</div>`;
  let ref = '<p class="muted">Belum mengisi.</p>';
  if (r.ref) {
    const lk = String(r.ref.likert || '').split(',').map(Number);
    const dims = lk.length === 10 ? reflDims(lk) : [];
    const mood = D.refl.moods[num(r.ref.mood)];
    ref = `${dims.map(d => `<div class="dimrow"><span>${esc(d.n)}</span><div class="bar"><i style="width:${d.v / 5 * 100}%"></i></div><b>${fmt(d.v)}</b></div>`).join('')}
      <p>Keyakinan diri: sebelum <b>${esc(r.ref.konf_sebelum)}%</b> → sesudah <b>${esc(r.ref.konf_sesudah)}%</b> · Perasaan: ${mood ? mood.e + ' ' + mood.n : '–'}</p>
      ${D.refl.stems.map((s, i) => `<div class="ans"><small>${esc(s)}</small><p>${esc(r.ref['kalimat_' + (i + 1)] || '–')}</p></div>`).join('')}`;
  }
  let post = '<p class="muted">Belum mengerjakan.</p>';
  if (r.post) {
    const rin = parseJ(r.post.rincian) || [];
    post = `<p>Estimasi nilai: <b>${fmt(num(r.post.skor_estimasi))}</b> · Paste dicoba: <b>${esc(r.post.pelanggaran_paste)}</b> · Keluar tab: <b>${esc(r.post.pelanggaran_tab)}</b></p>` +
      D.post.map((q, i) => `<div class="ans"><small><span class="badge ${q.tipe === 'HOTS' ? 'hots' : 'biasa'}">${q.tipe}</span> ${M[q.tp].emoji} Soal ${i + 1}: ${esc(q.soal)}</small>
        <p>${esc(r.post['jawaban_' + (i + 1)] || '–')}</p>
        <div class="ansm">Estimasi skor: <b>${esc(r.post['skor_' + (i + 1)])}</b>/12,5 · Konsep terdeteksi: ${(rin[i] && rin[i].length) ? esc(rin[i].join('; ')) : '–'}</div></div>`).join('');
  }
  return `<h2>${esc(r.nama)} <small>· ${esc(r.kelas)} · NIS ${esc(r.nis)}</small></h2>
    <h3>📝 Pre-test</h3>${pretest}<h3>🎮 Simulasi</h3>${sims}<h3>🪞 Refleksi</h3>${ref}<h3>🏁 Post-test</h3>${post}`;
}
function showModal(html) {
  modalRoot.innerHTML = `<div class="modal-bg" data-act="modal-close"><div class="modal card"><button class="btn sm modal-x" data-act="modal-close">✖ Tutup</button>${html}</div></div>`;
}
function exportCSV() {
  const rows = filteredRows();
  const head = ['Nama', 'Kelas', 'NIS', 'Pre-test', 'TP1', 'TP2', 'TP3', 'TP4', 'Refleksi', 'Post-test (estimasi)', 'Pelanggaran'];
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const lines = [head.map(q).join(',')].concat(rows.map(r => {
    const x = dashRowVals(r);
    return [r.nama, r.kelas, "'" + r.nis, r.pre ? r.pre.total : '', ...TPS.map(t => r.sim[t] ? r.sim[t].skor : ''), r.ref ? 'Ya' : '', x.post == null ? '' : x.post, x.viol == null ? '' : x.viol].map(q).join(',');
  }));
  const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'rekap-dokter-komputer.csv';
  document.body.appendChild(a); a.click(); a.remove();
}
async function dashLoad(pw) {
  S.dash = { loading: true }; render();
  try {
    const data = await fetchDash(pw);
    S.dashPw = pw;
    S.dash = { rows: aggregate(data), fk: '', q: '', demo: !C.SCRIPT_URL };
  } catch (e) { S.dash = { error: 'Gagal: ' + e.message }; }
  render();
}

/* ============================ RENDER ============================ */
function render() {
  document.body.classList.toggle('is-login', S.view === 'login');
  if (S.view === 'login') app.innerHTML = viewLogin();
  else if (S.view === 'dash') app.innerHTML = viewDash();
  else {
    let inner;
    if (S.view === 'home') inner = viewHome();
    else if (S.view === 'pre') inner = viewPre();
    else if (S.view === 'refleksi') inner = viewRefleksi();
    else if (S.view === 'post') inner = viewPost();
    else inner = viewTP(S.view);
    app.innerHTML = shell(inner);
  }
  afterRender();
}
function afterRender() {
  guardTextareas(app);
  if (S.view === 'dash') renderDashTable();
}

/* ---------- anti copy-paste ---------- */
function violation(msg) {
  if (S.view === 'post' && prog && !prog.post) { prog.draft.viol.paste++; saveProg(); }
  toast(msg || '🚫 Copy-paste dinonaktifkan. Ketik jawabanmu sendiri ya!', 'warn');
}
function guardTextareas(root) {
  root.querySelectorAll('textarea[data-guard]').forEach(ta => {
    let last = ta.value;
    ['paste', 'copy', 'cut', 'drop', 'dragover', 'contextmenu'].forEach(ev => ta.addEventListener(ev, e => {
      e.preventDefault();
      if (ev === 'paste' || ev === 'drop') violation();
    }));
    ta.addEventListener('keydown', e => {
      const k = (e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (k === 'v' || k === 'c' || k === 'x' || k === 'insert')) { e.preventDefault(); if (k === 'v') violation(); }
      else if (e.shiftKey && k === 'insert') { e.preventDefault(); violation(); }
    });
    ta.addEventListener('beforeinput', e => {
      if (/^insertFromPaste|^insertFromDrop|^insertFromYank/.test(e.inputType || '')) { e.preventDefault(); violation(); }
    });
    ta.addEventListener('input', e => {
      if (ta.value.length - last.length > 25 && !e.isComposing) { ta.value = last; violation(); }
      else last = ta.value;
    });
  });
}
document.addEventListener('copy', e => { if ((S.view === 'post' || S.view === 'refleksi') && !(e.target && e.target.closest && e.target.closest('input,select'))) e.preventDefault(); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden && S.view === 'post' && prog && !prog.post) { prog.draft.viol.tab++; saveProg(); }
});

/* ---------- aksi (klik) ---------- */
const ACT = {
  nav(el) {
    const v = el.dataset.v;
    if (!unlocked(v)) { toast('🔒 ' + lockMsg(v), 'warn'); return; }
    go(v, 'materi');
  },
  tab(el) { S.tab = el.dataset.t; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
  logout() { if (confirm('Keluar dari sesi ini? Progresmu tetap tersimpan di perangkat ini.')) { store.del('skx_user'); user = null; prog = null; S.tmp = {}; go('login'); } },
  'goto-dash'() { S.dash = null; go('dash'); },
  'dash-back'() { S.dash = null; S.dashPw = null; go(user ? 'home' : 'login'); },
  'dash-refresh'() { dashLoad(S.dashPw || ''); },
  'dash-csv'() { exportCSV(); },
  'dash-detail'(el) {
    const [nis, kelas] = el.dataset.k.split('|');
    const r = S.dash.rows.find(x => x.nis === nis && x.kelas === kelas);
    if (r) showModal(detailHtml(r));
  },
  'modal-close'(el, e) { if (e.target === el || el.classList.contains('modal-x')) modalRoot.innerHTML = ''; },
  'pre-submit'() {
    const T = S.tmp.pre;
    const miss = D.prePG.filter((q, i) => T.pg[i] == null).length + D.prePGK.filter((q, i) => !T.pgk[i].length).length;
    if (miss && !confirm('Masih ada ' + miss + ' soal yang belum dijawab. Kirim sekarang?')) return;
    if (!miss && !confirm('Kirim jawaban pre-test sekarang?')) return;
    const pgBenar = D.prePG.map((q, i) => T.pg[i] === q.k);
    const pgkBenar = D.prePGK.map((q, i) => T.pgk[i].slice().sort().join(',') === q.k.slice().sort().join(','));
    const skorPG = pgBenar.filter(Boolean).length * 10, skorPGK = pgkBenar.filter(Boolean).length * 10;
    prog.pre = { pg: T.pg, pgk: T.pgk, skorPG, skorPGK, total: skorPG + skorPGK, pgBenar, pgkBenar };
    saveProg();
    send({ jenis: 'pretest', skor_pg: skorPG, skor_pgk: skorPGK, total: skorPG + skorPGK,
      jawaban_pg: D.prePG.map((q, i) => T.pg[i] == null ? '-' : LET[T.pg[i]]).join(','),
      jawaban_pgk: D.prePGK.map((q, i) => T.pgk[i].slice().sort().map(j => LET[j]).join('') || '-').join(' | '),
      detail: JSON.stringify({ pg: pgBenar, pgk: pgkBenar }) });
    render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  'sim-reset'(el) { delete S.tmp[SIMKEY[el.dataset.tp]]; render(); },

  /* sim 1 */
  's1-sel'(el) { const T = S.tmp.s1; if (T.solved) return; T.sel = el.dataset.id; render(); },
  's1-hint'() { const T = S.tmp.s1; if (!T.hint) { T.hint = true; } render(); },
  's1-act'(el) {
    const T = S.tmp.s1, c = D.sim1.kasus[T.i];
    if (!T.sel || T.solved) return;
    const a = el.dataset.id;
    if (T.sel !== c.target) { T.bp++; T.fb = { ok: false, msg: '🤔 Perangkat itu berfungsi normal. Cari perangkat yang punya tanda masalah atau status bermasalah di Properties.' }; }
    else if (a !== c.aksi) { T.ba++; T.fb = { ok: false, msg: '❌ ' + (c.salah[a] || 'Tindakan ini belum tepat untuk masalah tersebut.') + ' Coba tindakan lain.' }; }
    else { T.solved = true; const pts = Math.max(5, 25 - 5 * T.bp - 5 * T.ba - (T.hint ? 3 : 0)); T.pts[T.i] = pts; T.fb = { ok: true, msg: '✅ Tepat! +' + pts + ' poin' }; }
    render();
  },
  's1-next'() {
    const T = S.tmp.s1;
    if (T.i < D.sim1.kasus.length - 1) { T.i++; T.sel = null; T.bp = 0; T.ba = 0; T.hint = false; T.solved = false; T.fb = null; }
    else { T.score = T.pts.reduce((a, b) => a + b, 0); T.done = true; finishSim('tp1', T.score, { pts: T.pts }); }
    render();
  },

  /* sim 2 */
  's2-sc'(el) { const T = S.tmp.s2; T.sc = +el.dataset.i; T.pick = {}; T.res = null; render(); },
  's2-pick'(el) { S.tmp.s2.pick[el.dataset.c] = el.dataset.id; render(); },
  's2-eval'() {
    const T = S.tmp.s2, K = D.sim2, sc = K.sc[T.sc];
    const comps = ['cpu', 'ram', 'sto', 'gpu'];
    let pts = 0, cost = 0;
    const rows = comps.map(c => { const o = K.opsi[c].find(x => x.id === T.pick[c]); const p = sc.poin[c][o.id]; pts += p; cost += o.h; return { c, n: o.n, p, why: sc.why[c] }; });
    const over = cost > sc.budget;
    let pct = Math.round(pts / 12 * 100); if (over) pct = Math.max(0, pct - 20);
    T.best[T.sc] = Math.max(T.best[T.sc] == null ? 0 : T.best[T.sc], pct);
    T.res = { sc: T.sc, pts, pct, over, cost, rows };
    render();
  },
  's2-finish'() {
    const T = S.tmp.s2;
    T.score = Math.round(avg(D.sim2.sc.map((s, i) => T.best[i])));
    T.done = true; finishSim('tp2', T.score, { skenario: T.best }); render();
  },

  /* sim 3 & 4 */
  'cs-ans'(el) { csAnswer(el.dataset.key, +el.dataset.j); },
  'cs-next'(el) { csNext(el.dataset.key); },
  'ord-up'(el) { const T = S.tmp.s4, i = +el.dataset.i; if (i > 0) { [T.order[i - 1], T.order[i]] = [T.order[i], T.order[i - 1]]; T.checked = null; render(); } },
  'ord-dn'(el) { const T = S.tmp.s4, i = +el.dataset.i; if (i < T.order.length - 1) { [T.order[i + 1], T.order[i]] = [T.order[i], T.order[i + 1]]; T.checked = null; render(); } },
  'ord-check'() { ordCheck(); },
  'ord-finish'() { ordFinish(); },

  /* refleksi & post */
  'ref-submit'() {
    const T = S.tmp.ref, R = D.refl;
    for (let i = 0; i < R.likert.length; i++) if (!T.lk[i]) { toast('Lengkapi pernyataan nomor ' + (i + 1) + ' dulu ya 🙏', 'warn'); return; }
    if (T.mood == null) { toast('Pilih perasaan belajarmu dulu ya 🙂', 'warn'); return; }
    for (let i = 0; i < R.stems.length; i++) if ((T.st[i] || '').trim().length < 10) { toast('Lanjutkan kalimat nomor ' + (i + 1) + ' (minimal 10 karakter).', 'warn'); return; }
    if (!confirm('Kirim refleksi sekarang?')) return;
    const dims = reflDims(T.lk);
    prog.refleksi = { lk: T.lk.slice(), dims, c0: T.c0, c1: T.c1, mood: T.mood, st: T.st.slice() };
    saveProg();
    const p = { jenis: 'refleksi', likert: T.lk.join(','), dimensi: JSON.stringify(dims.map(d => ({ n: d.n, v: Math.round(d.v * 10) / 10 }))), konf_sebelum: T.c0, konf_sesudah: T.c1, mood: T.mood };
    T.st.forEach((s, i) => { p['kalimat_' + (i + 1)] = s; });
    send(p);
    render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  'post-submit'() {
    const short = [];
    D.post.forEach((q, i) => { const t = (prog.draft.a[q.id] || '').trim(); if (t.length < (q.tipe === 'HOTS' ? 50 : 30)) short.push(i + 1); });
    if (short.length) { toast('Jawaban nomor ' + short.join(', ') + ' masih terlalu singkat. Lengkapi dulu ya ✍️', 'warn'); return; }
    if (!confirm('Kirim post-test sekarang? Jawaban tidak dapat diubah setelah dikirim.')) return;
    const res = scorePost();
    const total = Math.round(res.reduce((a, r) => a + r.skor, 0) * 10) / 10;
    const v = prog.draft.viol;
    prog.post = { skor: total, viol: { paste: v.paste, tab: v.tab } };
    const p = { jenis: 'posttest', skor_estimasi: total, pelanggaran_paste: v.paste, pelanggaran_tab: v.tab, rincian: JSON.stringify(res.map(r => r.cocok)) };
    res.forEach((r, i) => { p['jawaban_' + (i + 1)] = r.jawaban; p['skor_' + (i + 1)] = r.skor; });
    saveProg();
    send(p);
    render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
app.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (el && ACT[el.dataset.act]) ACT[el.dataset.act](el, e);
});
modalRoot.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (el && ACT[el.dataset.act]) ACT[el.dataset.act](el, e);
});

/* ---------- perubahan input ---------- */
const CHG = {
  'pre-pg'(el) { S.tmp.pre.pg[+el.dataset.i] = +el.value; },
  'pre-pgk'(el) {
    const a = S.tmp.pre.pgk[+el.dataset.i], v = +el.value, k = a.indexOf(v);
    if (el.checked && k < 0) a.push(v); else if (!el.checked && k > -1) a.splice(k, 1);
  },
  'post-ans'(el) {
    prog.draft.a[el.dataset.id] = el.value; saveProg();
    const c = app.querySelector('[data-cnt="' + el.dataset.id + '"]'); if (c) c.textContent = el.value.length + ' karakter';
  },
  'ref-lk'(el) { S.tmp.ref.lk[+el.dataset.i] = +el.value; },
  'ref-mood'(el) { S.tmp.ref.mood = +el.value; },
  'ref-stem'(el) { S.tmp.ref.st[+el.dataset.i] = el.value; },
  'ref-c0'(el) { S.tmp.ref.c0 = +el.value; const b = document.getElementById('c0v'); if (b) b.textContent = el.value; },
  'ref-c1'(el) { S.tmp.ref.c1 = +el.value; const b = document.getElementById('c1v'); if (b) b.textContent = el.value; },
  'dash-kelas'(el) { S.dash.fk = el.value; renderDashTable(); },
  'dash-q'(el) { S.dash.q = el.value; renderDashTable(); }
};
['input', 'change'].forEach(ev => app.addEventListener(ev, e => {
  const el = e.target;
  if (el && el.dataset && el.dataset.chg && CHG[el.dataset.chg]) CHG[el.dataset.chg](el);
}));

/* ---------- formulir ---------- */
app.addEventListener('submit', e => {
  const f = e.target;
  if (!f.dataset || !f.dataset.form) return;
  e.preventDefault();
  if (f.dataset.form === 'login') {
    const v = n => (f.elements[n].value || '').trim();
    const err = document.getElementById('login-err');
    let m = '';
    if (v('nama').length < 3) m = 'Nama lengkap minimal 3 huruf.';
    else if (!/^\d{3,15}$/.test(v('nis'))) m = 'NIS harus berupa angka (3–15 digit).';
    else if (!v('tanggal')) m = 'Tanggal wajib diisi.';
    else if (C.KELAS.indexOf(v('kelas')) < 0) m = 'Pilih kelas ' + C.KELAS.join(' atau ') + '.';
    if (m) { err.textContent = '⚠️ ' + m; return; }
    user = { nama: v('nama'), nis: v('nis'), tanggal: v('tanggal'), kelas: v('kelas') };
    store.set('skx_user', user);
    S.tmp = {};
    loadProg();
    send({ jenis: 'login' });
    flushQueue();
    go('home');
  } else if (f.dataset.form === 'dashpw') {
    const pw = f.elements.pw ? f.elements.pw.value : '';
    if (C.SCRIPT_URL && !pw) return;
    dashLoad(pw);
  }
});

/* ---------- mulai ---------- */
if (user && user.nis) { loadProg(); S.view = 'home'; flushQueue(); } else { user = null; S.view = 'login'; }
render();

})();
