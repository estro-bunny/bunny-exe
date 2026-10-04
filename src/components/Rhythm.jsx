import { E } from '../store'
import { useEffect, useRef, useState } from 'react'

const COLORS = ['#6ecbff', '#ff8fc8', '#ffffff', '#ff8fc8']
const KEYS = ['d', 'f', 'j', 'k']
const PITCH = [392, 440, 523, 587]
// step = one eighth note in ms; dens = chance of a note on beats / off-beats
const SONGS = [
  { id: 'lofi', name: 'Lo-fi Bunny · 110 BPM', bpm: 110, steps: 112, seed: 1337, dens: [0.9, 0.35], bass: [110, 110, 131, 98], mult: 1 },
  { id: 'chaos', name: 'Chaos Protocol · 140 BPM', bpm: 140, steps: 160, seed: 4242, dens: [1, 0.6], bass: [98, 123, 147, 110], mult: 1.6 },
]
for (const S of SONGS) S.step = 60000 / S.bpm / 2
const TRAVEL = 1500 // ms a heart takes to fall to the line
const LINE = 380

function rng(a) { // mulberry32: same chart every time
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const idle = () => ({ on: 0, res: 0, flash: [0, 0, 0, 0], fb: '', fbT: 0, ns: [], sc: 0, cb: 0, mx: 0, hl: 100, hits: 0, miss: 0, ph: 0, t0: 0 })

export default function Rhythm() {
  const cv = useRef(null)
  const st = useRef(idle())
  const songRef = useRef(0)
  const [songIdx, setSongIdx] = useState(0)
  const pick = (i) => { if (st.current.on) return; songRef.current = i; setSongIdx(i) }

  const start = () => {
    const S = SONGS[songRef.current], r = rng(S.seed), ns = []
    for (let k = 0; k < S.steps; k++) {
      if (r() < S.dens[k % 2]) ns.push({ k, l: Math.floor(r() * 4), T: 2000 + k * S.step })
    }
    st.current = { ...idle(), on: 1, t0: performance.now(), ns, song: S }
  }

  const hit = (lane) => {
    const y = st.current
    if (!y.on) return
    y.flash[lane] = 8
    const now = performance.now() - y.t0
    let best = null, bestD = 1e9
    for (const o of y.ns) {
      if (o.h || o.m || o.l !== lane) continue
      const d = Math.abs(o.T - now)
      if (d < bestD) { bestD = d; best = o }
    }
    if (best && bestD < 150) {
      best.h = 1
      const perfect = bestD < 60
      y.cb++
      y.mx = Math.max(y.mx, y.cb)
      y.sc += Math.floor((perfect ? 100 : 50) * (1 + Math.min(y.cb, 40) / 10))
      y.hl = Math.min(100, y.hl + 2)
      y.hits++
      y.fb = perfect ? 'PERFECT' : 'GOOD'
      y.fbT = 22
      E.snd(PITCH[lane], 0.12, 'sine', 0.08)
    }
  }

  const onPointer = (e) => {
    e.preventDefault()
    if (!st.current.on) return start()
    const box = cv.current.getBoundingClientRect()
    hit(Math.min(3, Math.max(0, Math.floor(((e.clientX - box.left) / box.width) * 4))))
  }

  useEffect(() => {
    const onKey = (e) => {
      if (E.tab !== 'rhy' || e.target.tagName === 'INPUT') return
      if (!st.current.on && (e.key === 'Enter' || e.code === 'Space')) return start()
      const lane = KEYS.indexOf(e.key.toLowerCase())
      if (lane >= 0 && !e.repeat) hit(lane)
    }
    window.addEventListener('keydown', onKey)

    const x = cv.current.getContext('2d')
    let raf
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (E.tab !== 'rhy') return
      const y = st.current
      const n = y.on ? performance.now() - y.t0 : 0
      const S = y.song || SONGS[songRef.current]
      if (y.on) {
        // backing track, scheduled on the same clock as the hearts
        while (y.ph < S.steps && 2000 + y.ph * S.step <= n) {
          const k = y.ph++
          if (k % 4 === 0) E.snd(70, 0.14, 'sine', 0.12)
          if (k % 2 === 0) E.snd(5000, 0.02, 'square', 0.012)
          if (k % 8 === 0) E.snd(S.bass[(k >> 3) % 4], 0.35, 'triangle', 0.07)
        }
        for (const o of y.ns) {
          if (!o.h && !o.m && n - o.T > 150) { o.m = 1; y.cb = 0; y.miss++; y.hl -= 8; y.fb = 'MISS'; y.fbT = 22 }
        }
        if (y.hl <= 0 || n > 2000 + S.steps * S.step + 800) {
          y.on = 0; y.res = 1
          const reward = Math.floor((y.sc / 20) * S.mult)
          E.SV.w += reward
          E.SV.rb = { ...E.SV.rb, [S.id]: Math.max((E.SV.rb || {})[S.id] || 0, y.sc) }
          E.SV.rbest = Math.max(E.SV.rbest || 0, y.sc)
          E.SV.rn = (E.SV.rn || 0) + 1
          E.SV.runs++
          E.save()
          E.tst(`song done · +${reward} ♡`)
        }
      }
      x.fillStyle = '#12081f'; x.fillRect(0, 0, 800, 450)
      for (let l = 0; l < 4; l++) {
        x.globalAlpha = 0.12 + y.flash[l] * 0.03
        x.fillStyle = COLORS[l]; x.fillRect(l * 200 + 4, 0, 192, 450)
        x.globalAlpha = 1
        if (y.flash[l] > 0) y.flash[l]--
        x.fillStyle = COLORS[l]; x.font = 'bold 20px monospace'; x.textAlign = 'center'
        x.fillText(KEYS[l].toUpperCase(), l * 200 + 100, 435)
      }
      x.strokeStyle = '#ff8fc8'; x.lineWidth = 4; x.shadowColor = '#ff4fa8'; x.shadowBlur = 12
      x.beginPath(); x.moveTo(0, LINE); x.lineTo(800, LINE); x.stroke(); x.shadowBlur = 0
      for (const o of y.ns) {
        if (o.h) continue
        const yy = LINE - ((o.T - n) / TRAVEL) * LINE
        if (yy < -30 || yy > 440) continue
        x.globalAlpha = o.m ? 0.3 : 1
        x.fillStyle = COLORS[o.l]; x.beginPath(); x.arc(o.l * 200 + 100, yy, 26, 0, 7); x.fill()
        x.fillStyle = '#1a0b2b'; x.font = 'bold 28px sans-serif'; x.fillText('♥', o.l * 200 + 100, yy + 10)
        x.globalAlpha = 1
      }
      x.fillStyle = '#2a1445'; x.fillRect(16, 16, 200, 10)
      x.fillStyle = '#6ecbff'; x.fillRect(16, 16, 2 * Math.max(0, y.hl), 10)
      x.textAlign = 'left'; x.fillStyle = '#ffe6f4'; x.font = 'bold 20px sans-serif'
      x.fillText('score ' + y.sc, 16, 50)
      if (y.cb > 2) x.fillText('x' + y.cb + ' combo', 16, 76)
      x.textAlign = 'center'
      if (y.fbT > 0) {
        y.fbT--
        x.globalAlpha = y.fbT / 22
        x.fillStyle = y.fb === 'MISS' ? '#ff4f7a' : '#fff'; x.font = 'bold 30px sans-serif'
        x.fillText(y.fb, 400, 300)
        x.globalAlpha = 1
      }
      if (!y.on) {
        x.fillStyle = '#0b0615dd'; x.fillRect(0, 0, 800, 450)
        x.fillStyle = '#ff8fc8'; x.font = 'bold 36px sans-serif'
        x.fillText(y.res ? 'SONG CLEAR' : 'RHYTHM RUN', 400, 170)
        x.fillStyle = '#ffe6f4'; x.font = '18px sans-serif'
        if (y.res) {
          const total = y.hits + y.miss
          x.fillText(`${y.sc} pts · accuracy ${total ? Math.round((y.hits / total) * 100) : 0}% · max combo ${y.mx}`, 400, 215)
          x.fillText(y.hl <= 0 ? 'the compiler won this one ♡' : 'full song survived ✦', 400, 245)
        } else {
          x.fillText('hit the hearts on the beat · best ' + ((E.SV.rb || {})[S.id] || 0), 400, 215)
        }
        x.fillStyle = '#6ecbff'
        x.fillText('tap or press Enter to ' + (y.res ? 'retry' : 'start'), 400, 300)
      }
    }
    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '0 0 10px', flexWrap: 'wrap' }}>
        {SONGS.map((S, i) => (
          <button key={S.id} className="btn" style={{ background: i === songIdx ? 'var(--pink)' : undefined, color: i === songIdx ? '#1a0b2b' : undefined }} onClick={() => pick(i)}>{S.name}</button>
        ))}
      </div>
      <div style={{ width: 'min(100%, calc((100vh - 260px) * 16 / 9))', margin: '0 auto' }}>
        <canvas ref={cv} width={800} height={450} onPointerDown={onPointer}
          style={{ width: '100%', border: '2px solid var(--pink)', borderRadius: 12, background: '#12081f', touchAction: 'none', cursor: 'pointer' }} />
      </div>
      <div style={{ textAlign: 'center', color: 'var(--mut)', fontSize: 13, marginTop: 8 }}>
        keys D · F · J · K or tap the four lanes · hit the hearts on the beat
      </div>
    </>
  )
}
