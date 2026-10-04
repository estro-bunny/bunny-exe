import { E } from '../store'
import { useSave } from '../useSave'

const SKT = [
  ['cpp', 'C++', '+10% score', 40, null],
  ['ts', 'TypeScript', 'Free type-error shield each run', 60, null],
  ['py', 'Python', 'Floatier jumps', 60, null],
  ['react', 'React', 'Hearts charge chaos +3', 120, 'ts'],
  ['vite', 'Vite', 'Runs start with 30% chaos', 150, 'react'],
  ['git', 'Git', 'Revert: survive one fatal hit', 200, 'py'],
  ['linux', 'Linux', 'Stronger heart magnet', 250, 'git'],
]

export default function Skills() {
  const SV = useSave()
  const has = (k) => SV.sk2.includes(k)
  return (
    <>
      <div className="card"><h2>Skill Tree</h2>Unlock skills with ♡. Each one is a real perk in Chaos Run.</div>
      <div className="grid">
        {SKT.map(([k, name, desc, cost, req]) => {
          const owned = has(k), locked = req && !has(req)
          return (
            <div className="card up" key={k}>
              <b>{owned ? '✦ ' : ''}{name}</b>
              <small>{desc}{req ? ` · needs ${req}` : ''}</small>
              <button className="btn" disabled={owned || locked || SV.w < cost} onClick={() => E.bsk(k, cost)}>
                {owned ? 'Unlocked' : locked ? 'Locked' : `♡ ${cost}`}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
