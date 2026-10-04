import { useEffect, useState } from 'react'
import { E, SKINS } from './store'
import { useSave } from './useSave'
import Home from './components/Home.jsx'
import Game from './components/Game.jsx'
import Shop from './components/Shop.jsx'
import Collection from './components/Collection.jsx'
import Compile from './components/Compile.jsx'
import Rhythm from './components/Rhythm.jsx'
import DebugBug from './components/DebugBug.jsx'
import Skills from './components/Skills.jsx'
import Awards from './components/Awards.jsx'
import Terminal from './components/Terminal.jsx'
import Wisdom from './components/Wisdom.jsx'

const TABS = [
  ['home', '🐰 Home', Home], ['game', '🎮 Chaos Run', Game], ['shop', '⚡ Upgrades', Shop],
  ['gal', '🖼️ Collection', Collection], ['code', '☕ Compile', Compile], ['rhy', '🎵 Rhythm', Rhythm],
  ['bug', '🐛 Debug', DebugBug], ['skl', '🌳 Skills', Skills], ['awd', '🏆 Awards', Awards],
  ['term', '💻 Terminal', Terminal], ['wis', '🔮 Wisdom', Wisdom],
]

export default function App() {
  const SV = useSave()
  const [tab, setTab] = useState('home')
  const [music, setMusic] = useState(false)
  useEffect(() => { E.tab = tab }, [tab]) // the canvas engines read this every frame

  return (
    <>
      <header>
        <img src={SKINS[SV.skin]} alt="" />
        <h1>♡ EstroBunny_XO OS ♡</h1>
        <button className="btn" style={{ padding: '4px 12px' }} onClick={E.ctheme}>🌈</button>
        <button className="btn" style={{ padding: '4px 12px' }} onClick={() => setMusic(E.mus())}>{music ? '🔊' : '🎵'}</button>
        <span id="wal">♡ {SV.w}</span>
      </header>
      <nav id="nav">
        {TABS.map(([id, label]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{label}</button>
        ))}
      </nav>
      <main>
        {TABS.map(([id, , Comp]) => (
          <section key={id} id={id} className={tab === id ? 'on' : ''}><Comp go={setTab} /></section>
        ))}
      </main>
      <div id="toast" />
    </>
  )
}
