import { useEffect, useState } from 'react'
import { E, SKINS, HERO } from '../store'
import { useSave } from '../useSave'

const LINES = ["Hi. I'm EstroBunny_xo.", 'trans girl · developer · menace', 'Silly girls change the world.', 'Still here. Still building. ♡']
const TOOLS = ['C++', 'C#', 'JavaScript', 'TypeScript', 'Python', 'React', 'Vite', 'Tailwind', 'Node.js', 'Git', 'GitHub', 'Linux', 'Windows', 'VS Code']

function Typer() {
  const [txt, setTxt] = useState('')
  useEffect(() => {
    let i = 0, c = 0, d = 1
    const id = setInterval(() => {
      c += d
      setTxt(LINES[i].slice(0, c))
      if (c >= LINES[i].length + 14) d = -1
      if (c <= 0) { d = 1; i = (i + 1) % LINES.length }
    }, 70)
    return () => clearInterval(id)
  }, [])
  return <div className="big caret">{txt}</div>
}

function PetCard() {
  const SV = useSave()
  const [, tick] = useState(0)
  useEffect(() => { const id = setInterval(() => tick((n) => n + 1), 3000); return () => clearInterval(id) }, [])
  const m = Math.round(E.mood())
  const text = m > 70 ? `bunny is vibing ♡ (${m}%)` : m > 30 ? `bunny wants attention (${m}%)` : `bunny needs caffeine ☕ (${m}%)`
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Pet Bunny</h2>
      <img src={SKINS[SV.skin]} alt="" style={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid #ff8fc8', animation: 'bn 1s infinite alternate' }} />
      <div style={{ margin: '8px 0' }}>{text}</div>
      <button className="btn" onClick={(e) => E.pet(e, 0)}>💗 pet</button>{' '}
      <button className="btn" onClick={(e) => E.pet(e, 1)}>☕ feed (5 ♡)</button>
    </div>
  )
}

export default function Home({ go }) {
  const SV = useSave()
  return (
    <>
      <div className="card hero">
        <img src={HERO} alt="EstroBunny" onClick={(e) => E.conf(e)} style={{ cursor: 'pointer' }} />
        <div>
          <Typer />
          <div className="stripe" />
          <div style={{ color: 'var(--mut)' }}>Builds things that shouldn't exist but absolutely should.</div>
          <br />
          <button className="btn" onClick={() => go('game')}>▶ Play Chaos Run</button>
        </div>
      </div>
      <div className="grid">
        <PetCard />
        <div className="card">
          <h2>Stats</h2>
          <div style={{ lineHeight: 1.9 }}>
            🐰 Name: EstroBunny_xo<br />💗 Alignment: Chaotic Cute<br />🏳️‍⚧️ Status: Still Here™<br />
            💻 Class: Developer<br />🧠 Brain: 37 tabs, 2 braincells<br />☕ Fuel: questionable decisions<br />
            🔥 Streak: {SV.streak} day{SV.streak === 1 ? '' : 's'}<br />
            🎮 Best run: {SV.best} · Runs: {SV.runs}
          </div>
        </div>
        <div className="card"><h2>Toolbox</h2><div className="chips">{TOOLS.map((t) => <span key={t}>{t}</span>)}</div></div>
        <div className="card">
          <h2>Project philosophy</h2>
          I don't build things because they're practical. I build them because I wonder if I can. 🔧 experiment · 🧪 prototype · 💥 break things · 🛠️ rebuild · 🦄 something cool emerges
        </div>
        <div className="card">
          <h2>Currently flirting with</h2>
          <div className="chips"><span>AI-assisted nonsense</span><span>pretty interfaces</span><span>dev tools</span><span>game projects</span><span>pastel everything</span></div>
          <br /><a style={{ color: 'var(--pink)' }} href="https://github.com/Estro-Bunny" target="_blank" rel="noopener noreferrer">github.com/Estro-Bunny</a>
        </div>
      </div>
    </>
  )
}
