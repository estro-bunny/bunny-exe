import { E } from '../store'
import { useSave } from '../useSave'

const UP = [
  ['life', '♥ Extra Heart', 'Start each run with +1 life', 4, 60],
  ['rate', '⚡ Chaos Charge', 'Fill the chaos meter 25% faster', 5, 40],
  ['mag', '🧲 Heart Magnet', 'Always pull pickups toward you', 4, 50],
  ['dur', '✦ Long Chaos', '+1 second of chaos mode', 5, 45],
]

export default function Shop() {
  const SV = useSave()
  return (
    <>
      <div className="card"><h2>Chaos Upgrades</h2>Spend hearts earned in Chaos Run. Progress saves in this browser.</div>
      <div className="grid">
        {UP.map(([k, name, desc, max, base]) => {
          const lvl = SV.U[k], cost = base * (lvl + 1), maxed = lvl >= max
          return (
            <div className="card up" key={k}>
              <b>{name}</b><small>{desc}</small>
              <div className="lv">{Array.from({ length: max }, (_, i) => <i key={i} className={i < lvl ? 'f' : ''} />)}</div>
              <button className="btn" disabled={maxed || SV.w < cost} onClick={() => E.buy(k, cost, max)}>
                {maxed ? 'MAXED ✦' : `Buy · ♡ ${cost}`}
              </button>
            </div>
          )
        })}
      </div>
      <br /><button className="btn" onClick={() => E.resetAll()}>reset save</button>
    </>
  )
}
