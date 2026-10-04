import { E } from '../store'
import { useSave } from '../useSave'

export default function Awards() {
  const SV = useSave()
  const { ACH } = E
  return (
    <>
      <div className="card"><h2>Achievements</h2>Each unlock pays +10 ♡.</div>
      <div className="grid">
        {ACH.map(([id, name, desc]) => {
          const done = SV.ach.includes(id)
          return (
            <div className="card up" key={id} style={{ opacity: done ? 1 : 0.45 }}>
              <b>{done ? '🏆' : '🔒'} {name}</b><small>{desc}</small>
            </div>
          )
        })}
      </div>
    </>
  )
}
