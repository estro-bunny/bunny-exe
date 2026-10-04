// The app's single source of truth: save data, game-economy actions, sound, confetti.
// Components read it through useSave(); the canvas engines get `E` passed in.
// asset(): the single-file build injects data URIs in window.__ASSETS; normal builds use the paths
const asset = (p) => (typeof window !== 'undefined' && window.__ASSETS && window.__ASSETS[p]) || p
export const SKINS = Array.from({ length: 13 }, (_, i) => asset(`img/skin-${i}.jpg`))
export const WALL = asset('img/wall.jpg')
export const HERO = asset('img/hero.jpg')
export const CHARS = [
  { n: 'Classic Bunny', cost: 0, ab: 'Double jump', ring: '#ff8fc8' },
  { n: 'Hoodie Bunny', cost: 150, ab: 'Dash (D): burst forward, smash bugs, brief invincibility. Single jump.', ring: '#6ecbff' },
  { n: 'Plush Bunny', cost: 250, ab: 'Glide: hold jump while falling to float', ring: '#ffffff' },
]
export const THEMES = [
  { n: 'Neon City', cost: 0, sky: ['#150a2b', '#3a0f4a'], moon: '#ff8fc8', far: '#241042', near: '#1a0d33', win1: '#ff8fc8', win2: '#6ecbff', ground: '#0d0618', line: '#ff8fc8' },
  { n: 'Sakura Night', cost: 120, sky: ['#2a0f2f', '#7a2a5a'], moon: '#ffe6f4', far: '#4a1a45', near: '#33102f', win1: '#ffd1e8', win2: '#ffb0d6', ground: '#1a0a1a', line: '#ffb0d6' },
  { n: 'Server Room', cost: 200, sky: ['#031524', '#0a3a4a'], moon: '#6ecbff', far: '#07283a', near: '#04202e', win1: '#6ecbff', win2: '#a8ffd8', ground: '#02101a', line: '#6ecbff' },
]
export const SN = ['Peace ✌', 'Plush Hug', 'Shades', 'Hoodie Wink', 'Pride Pin', 'Estro Fuel', 'Nerd Mode', 'Bow Baby', 'Bubblegum', 'Sassy Shades', 'Headphones', 'Cutie', 'Fluffy Original']
export const GEN = [['37 browser tabs', 1, 15], ['Second braincell', 5, 100], ['Monster ×3', 20, 500], ['AI bullied into writing code', 100, 3000]]
const KEY = 'ebx_v2'

const base = () => ({ w: 0, best: 0, runs: 0, hearts: 0, U: { life: 0, rate: 0, mag: 0, dur: 0 }, sk: [0], skin: 0, loc: 0, gen: [0, 0, 0, 0], sk2: [], ach: [], boss: 0, fed: Date.now(), themes: [0], theme: 0, chars: [0], char: 0, day: '', streak: 0 })
function norm(s) {
  s.U = Object.assign({ life: 0, rate: 0, mag: 0, dur: 0 }, s.U)
  const d = base()
  for (const k of ['sk', 'sk2', 'ach', 'gen', 'themes', 'chars']) s[k] = s[k] || d[k]
  for (const k of ['skin', 'loc', 'boss', 'fed']) s[k] = s[k] || d[k]
  return s
}
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) return norm(Object.assign(base(), s)) } catch (e) { /* fresh save */ }
  return base()
}
let SV = load()

// --- change notification (useSave subscribes to this) ---
const subs = new Set()
let ver = 0
export const subscribe = (cb) => { subs.add(cb); return () => subs.delete(cb) }
export const getVersion = () => ver
function emit() { ver++; subs.forEach((f) => f()) }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(SV)) } catch (e) { /* storage blocked */ } }
function save() { norm(SV); persist(); emit() }

// --- sound ---
let AC = null
function snd(f, d = 0.1, ty = 'square', v = 0.05) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)()
    const o = AC.createOscillator(), a = AC.createGain()
    o.type = ty; o.frequency.value = f; a.gain.value = v
    o.connect(a); a.connect(AC.destination); o.start()
    a.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + d)
    o.stop(AC.currentTime + d)
  } catch (e) { /* audio blocked */ }
}

// --- ui helpers (plain DOM: the toast and confetti sit outside React's tree) ---
let toastTimer
function tst(m) {
  const t = document.getElementById('toast')
  if (!t) return
  t.textContent = m; t.style.display = 'block'
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.style.display = 'none' }, 2500)
}
function conf(e, n = 16) {
  const EM = ['💗', '🐰', '✨', '⚡', '💙', '🤍']
  for (let i = 0; i < n; i++) {
    const d = document.createElement('span')
    d.className = 'cf'; d.textContent = EM[i % 6]
    d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px'
    d.style.setProperty('--dx', (Math.random() - 0.5) * 400 + 'px')
    d.style.setProperty('--dy', (Math.random() - 0.9) * 400 + 'px')
    document.body.appendChild(d)
    setTimeout(() => d.remove(), 1400)
  }
  snd(600 + Math.random() * 400, 0.15, 'sine', 0.07)
}
function ctheme() { document.body.classList.toggle('cx'); snd(300, 0.3, 'sawtooth', 0.06) }

// --- music ---
let mo = false
const NO = [220, 262, 330, 392, 330, 262, 196, 262]
function step(i) {
  if (!mo) return
  const f = NO[i % 8] * (E.chaosOn ? 2 : 1)
  snd(f, 0.18, 'triangle', 0.035)
  if (i % 4 === 0) snd(f / 2, 0.3, 'sine', 0.05)
  setTimeout(() => step(i + 1), E.chaosOn ? 110 : 210)
}
function mus() { mo = !mo; if (mo) step(0); return mo }

// --- economy ---
function buy(k, c, max) { if (SV.w >= c && SV.U[k] < max) { SV.w -= c; SV.U[k]++; save(); snd(900, 0.15, 'sine', 0.07) } }
function bsk(k, c) { if (SV.w >= c) { SV.w -= c; SV.sk2.push(k); save(); snd(1000, 0.2, 'sine', 0.07) } }
function skin(i, c) {
  if (!SV.sk.includes(i)) { if (SV.w < c) return; SV.w -= c; SV.sk.push(i) }
  SV.skin = i; save()
}
function char(i, c) {
  if (!SV.chars.includes(i)) { if (SV.w < c) return; SV.w -= c; SV.chars.push(i) }
  SV.char = i; save()
}
function theme(i, c) {
  if (!SV.themes.includes(i)) { if (SV.w < c) return; SV.w -= c; SV.themes.push(i) }
  SV.theme = i; save()
}
const lps = () => GEN.reduce((a, g, i) => a + g[1] * SV.gen[i], 0)
function addLoc(n) { const b = Math.floor(SV.loc / 100); SV.loc += n; SV.w += Math.floor(SV.loc / 100) - b; emit() }
function bg(i, c) { if (SV.loc >= c) { SV.loc -= c; SV.gen[i]++; save(); snd(800, 0.1, 'sine', 0.07) } }
function clk(e) { addLoc(3); conf(e, 3) }
function resetAll() { if (confirm('Reset all progress?')) { SV = base(); save() } }
// Daily streak: first visit of a new day pays hearts; missing a day resets it.
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export function rollDay(s, today) {
  if (s.day === today) return 0
  const y = new Date(today + 'T00:00:00'); y.setDate(y.getDate() - 1)
  s.streak = s.day === fmt(y) ? (s.streak || 0) + 1 : 1
  s.day = today
  const r = Math.min(30, 5 + s.streak * 2)
  s.w += r
  return r
}
const mood = () => Math.max(0, Math.min(100, 100 - (Date.now() - SV.fed) / 6000))
function pet(e, feed) {
  if (feed) { if (SV.w < 5) return; SV.w -= 5; SV.fed = Date.now() } else SV.fed = Math.min(Date.now(), SV.fed + 60000)
  conf(e, 8); save()
}

export const ACH = [
  ['first', 'First Hop', 'Finish a run', () => SV.runs >= 1],
  ['tabs', '37 Tabs', 'Collect 37 hearts', () => SV.hearts >= 37],
  ['fourteen', 'Spent 14 Hours On This', 'Play 14 runs', () => SV.runs >= 14],
  ['still', 'Still Here', 'Beat a boss', () => SV.boss >= 1],
  ['boss3', 'Chaotic Menace', 'Beat 3 bosses', () => SV.boss >= 3],
  ['rich', 'Hoarder', 'Hold 500 ♡', () => SV.w >= 500],
  ['ai', 'AI Bullied', 'Buy an AI coder', () => SV.gen[3] >= 1],
  ['skins', 'Dress-up Bunny', 'Own 5 skins', () => SV.sk.length >= 5],
  ['tree', 'Full Stack', 'Unlock 4 skills', () => SV.sk2.length >= 4],
  ['bugs', 'Bug Squasher', 'Squash 100 bugs', () => (SV.bugs || 0) >= 100],
  ['squad', 'Squad Goals', 'Own all 3 characters', () => SV.chars.length >= 3],
  ['streak3', 'On Fire', 'Reach a 3-day streak', () => SV.streak >= 3],
  ['theme', 'Interior Designer', 'Own 2 backdrops', () => SV.themes.length >= 2],
  ['rhy', 'Rhythm Bunny', 'Finish a rhythm song', () => (SV.rn || 0) >= 1],
]

// `E` is what the canvas engines receive (same shape the old window.EBX had).
export const E = {
  get SV() { return SV },
  tab: 'home', chaosOn: false,
  save, tst, snd, conf, ctheme, mus, emit,
  SKINS, SN, WALL, HERO, GEN, ACH, lps, THEMES, theme, CHARS, char,
  buy, bsk, skin, bg, clk, resetAll, pet, mood,
}

if (typeof window !== 'undefined') {
  const reward = rollDay(SV, fmt(new Date()))
  if (reward) { persist(); setTimeout(() => tst(`🔥 day ${SV.streak} streak! +${reward} ♡`), 900) }
  const every = (fn, ms) => { const t = setInterval(fn, ms); if (t && t.unref) t.unref() } // unref: lets node tests exit
  every(() => { const l = lps(); if (l) addLoc(l) }, 1000)
  every(persist, 8000)
  every(() => {
    ACH.forEach((a) => {
      if (!SV.ach.includes(a[0]) && a[3]()) { SV.ach.push(a[0]); SV.w += 10; tst(`🏆 ${a[1]} +10 ♡`); save() }
    })
  }, 2000)
  const KO = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA'
  let kc = []
  window.addEventListener('keydown', (e) => {
    kc.push(e.code); kc = kc.slice(-10)
    if (kc.join() === KO) { SV.w += 500; save(); conf({ clientX: innerWidth / 2, clientY: innerHeight / 2 }, 40); document.body.classList.add('cx') }
  })
}
