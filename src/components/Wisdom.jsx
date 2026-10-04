import { E } from '../store'
import { useState } from 'react'

const WIS = [
  "Good girls cause problems.",
  "Cute doesn't mean harmless.",
  "If it works, don't touch it.",
  "If it doesn't work, blame the compiler.",
  "If the compiler agrees, become suspicious.",
  "Trans girls change the world, one bug at a time.",
  "Be kind to yourself.",
  "Still here. Still building. Still causing problems.",
  "Spent 14 hours on it. Worth it.",
  "More chaos, pls.",
  "Silly girls change the world.",
  "Hydrate. Then caffeinate. In that order.",
  "Commit early. Panic later.",
  "Cuter. Stronger. Gayer. Always.",
]

export default function Wisdom() {
  const [text, setText] = useState('press the button ♡')
  const pick = () => {
    setText(WIS[Math.floor(Math.random() * WIS.length)] + ' ♡')
    E.snd(520 + Math.random() * 300, 0.15, 'triangle', 0.06)
  }
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Random Bunny Wisdom</h2>
      <div className="big" style={{ minHeight: '3.5em' }}>{text}</div>
      <button className="btn" onClick={pick}>🐇 consult the bunny</button>
    </div>
  )
}
