import { E } from '../store'
import { useEffect, useRef } from 'react'

const WORDS = ['const', 'let x', 'git push', 'npm i', 'null', 'NaN', 'async', 'await', 'bunny', 'chaos', 'still here', 'cute', 'merge', 'sudo', 'rm -rf bug', 'TODO', 'segfault', 'return', 'while(1)', 'caffeine', 'undefined', 'hrt', 'compile', 'silly girls']
const fresh = () => ({ on: 0, bugs: [], sc: 0, li: 3, kills: 0, t: 0 })

export default function DebugBug() {
  const cv = useRef(null)
  const input = useRef(null)
  const game = useRef(fresh())

  const start = () => {
    game.current = { ...fresh(), on: 1 }
    input.current.value = ''
    input.current.focus()
  }

  const onInput = () => {
    const d = game.current
    if (!d.on) return
    const v = input.current.value.toLowerCase()
    const i = d.bugs.findIndex((b) => b.w.toLowerCase() === v)
    if (i < 0) return
    const bug = d.bugs.splice(i, 1)[0]
    d.sc += 10 + bug.w.length * 2
    d.kills++
    E.SV.bugs = (E.SV.bugs || 0) + 1
    input.current.value = ''
    E.snd(600 + Math.min(d.kills, 15) * 30, 0.08, 'sine', 0.07)
    if (d.kills % 10 === 0) {
      d.sc += d.bugs.length * 15
      d.bugs = []
      E.tst('CHAOS BURST ✦ all bugs squashed')
      E.snd(900, 0.3, 'sawtooth', 0.06)
    }
  }

  useEffect(() => {
    const x = cv.current.getContext('2d')
    let raf
    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (E.tab !== 'bug') return
      const d = game.current
      d.t++
      if (d.on) {
        if (d.t % Math.max(30, 95 - d.kills * 2) === 0) {
          d.bugs.push({ w: WORDS[Math.floor(Math.random() * WORDS.length)], x: 70 + Math.random() * 540, y: -10, v: (0.6 + d.kills * 0.02) * (0.8 + Math.random() * 0.6) })
        }
        d.bugs.forEach((b) => { b.y += b.v })
        const hit = d.bugs.filter((b) => b.y > 390)
        if (hit.length) {
          d.bugs = d.bugs.filter((b) => b.y <= 390)
          d.li -= hit.length
          E.snd(120, 0.25, 'sawtooth', 0.08)
          if (d.li <= 0) {
            d.on = 0
            const reward = Math.floor(d.sc / 10)
            E.SV.w += reward
            E.SV.dbest = Math.max(E.SV.dbest || 0, d.sc)
            E.SV.runs++
            E.save()
            E.tst(`debug over · ${d.sc} pts · +${reward} ♡`)
          }
        }
      }
      const typed = input.current.value.toLowerCase()
      x.fillStyle = '#12081f'; x.fillRect(0, 0, 800, 450)
      x.strokeStyle = '#ff8fc8'; x.lineWidth = 3
      x.beginPath(); x.moveTo(0, 400); x.lineTo(800, 400); x.stroke()
      x.textAlign = 'center'
      for (const b of d.bugs) {
        const match = typed && b.w.toLowerCase().startsWith(typed)
        x.font = '24px sans-serif'; x.fillStyle = '#fff'; x.fillText('🐛', b.x, b.y)
        x.font = 'bold 18px monospace'
        const w = x.measureText(b.w).width + 20
        x.fillStyle = '#000'; x.fillRect(b.x - w / 2, b.y + 8, w, 28)
        x.strokeStyle = match ? '#6ecbff' : '#ff8fc8'; x.lineWidth = 2
        x.strokeRect(b.x - w / 2, b.y + 8, w, 28)
        x.fillStyle = match ? '#6ecbff' : '#ffe6f4'; x.fillText(b.w, b.x, b.y + 28)
      }
      x.textAlign = 'left'; x.font = 'bold 20px sans-serif'; x.fillStyle = '#ffe6f4'
      x.fillText('♥'.repeat(Math.max(0, d.li)) + '  score ' + d.sc, 16, 32)
      x.textAlign = 'center'
      if (!d.on) {
        x.fillStyle = '#0b0615dd'; x.fillRect(0, 0, 800, 450)
        x.fillStyle = '#ff8fc8'; x.font = 'bold 34px sans-serif'; x.fillText('DEBUG THE BUG', 400, 180)
        x.fillStyle = '#ffe6f4'; x.font = '18px sans-serif'
        x.fillText('type each word before the bug hits the ground', 400, 220)
        x.fillText('every 10 bugs = chaos burst · best ' + (E.SV.dbest || 0), 400, 250)
        x.fillStyle = '#6ecbff'; x.fillText('tap here or press Enter to start', 400, 300)
      }
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div style={{ width: 'min(100%, calc((100vh - 260px) * 16 / 9))', margin: '0 auto' }}>
        <canvas ref={cv} width={800} height={450} onClick={start}
          style={{ width: '100%', border: '2px solid var(--pink)', borderRadius: 12, background: '#12081f', cursor: 'pointer' }} />
      </div>
      <input ref={input} placeholder="type the words to squash bugs..." autoComplete="off" autoCapitalize="off"
        onInput={onInput} onKeyDown={(e) => { if (e.key === 'Enter' && !game.current.on) start() }}
        style={{ width: 'min(100%, 500px)', display: 'block', margin: '10px auto', background: '#05020a', color: 'var(--pink)', border: '1px solid var(--pink)', borderRadius: 8, padding: 10, fontFamily: 'monospace' }} />
    </>
  )
}
