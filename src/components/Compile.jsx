import { E } from '../store'
import { useSave } from '../useSave'

export default function Compile() {
  const SV = useSave()
  const { GEN, lps } = E
  return (
    <>
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Compile Chaos</h2>
        <div className="big">{Math.floor(SV.loc).toLocaleString()} lines</div>
        <div style={{ color: 'var(--mut)' }}>{lps()} lines/sec</div>
        <br />
        <button className="btn" style={{ fontSize: 44, padding: '14px 28px' }} onClick={(e) => E.clk(e)}>⚡</button>
        <br />
        <small style={{ color: 'var(--mut)' }}>tap the can · every 100 lines of code = +1 ♡</small>
      </div>
      <div className="grid">
        {GEN.map((g, i) => {
          const cost = Math.ceil(g[2] * Math.pow(1.35, SV.gen[i]))
          return (
            <div className="card up" key={i}>
              <b>{g[0]} ×{SV.gen[i]}</b>
              <small>+{g[1]} lines/sec</small>
              <button className="btn" disabled={SV.loc < cost} onClick={() => E.bg(i, cost)}>{cost} lines</button>
            </div>
          )
        })}
      </div>
    </>
  )
}
