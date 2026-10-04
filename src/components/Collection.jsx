import { E } from '../store'
import { useSave } from '../useSave'

export default function Collection() {
  const SV = useSave()
  const { SKINS, SN, WALL, THEMES, CHARS } = E
  return (
    <>
      <div className="card"><h2>Bunny Collection</h2>Unlock skins with ♡. The equipped one becomes your Chaos Run sprite.</div>
      <div className="grid s">
        {SKINS.map((src, i) => {
          const owned = SV.sk.includes(i), equipped = SV.skin === i, cost = i * 35
          return (
            <div className="card up" key={i} style={{ alignItems: 'center', textAlign: 'center' }}>
              <img src={src} alt="" style={{ width: 90, height: 90, borderRadius: '50%', border: `2px solid ${equipped ? '#6ecbff' : '#ff8fc8'}` }} />
              <b>{SN[i]}</b>
              <button className="btn" disabled={!owned && SV.w < cost} onClick={() => E.skin(i, cost)}>
                {equipped ? 'Equipped ✦' : owned ? 'Equip' : `♡ ${cost}`}
              </button>
            </div>
          )
        })}
      </div>
      <div className="card"><h2>Playable Characters</h2>Each one plays differently in Chaos Run.</div>
      <div className="grid">
        {CHARS.map((c, i) => {
          const owned = SV.chars.includes(i), equipped = (SV.char || 0) === i
          return (
            <div className="card up" key={c.n} style={{ borderColor: equipped ? c.ring : undefined }}>
              <b style={{ color: c.ring }}>{c.n}</b>
              <small>{c.ab}</small>
              <button className="btn" disabled={!owned && SV.w < c.cost} onClick={() => E.char(i, c.cost)}>
                {equipped ? 'Playing ✦' : owned ? 'Play as' : `♡ ${c.cost}`}
              </button>
            </div>
          )
        })}
      </div>
      <div className="card"><h2>Chaos Run Backdrops</h2>Change the skyline behind your run.</div>
      <div className="grid">
        {THEMES.map((t, i) => {
          const owned = SV.themes.includes(i), equipped = (SV.theme || 0) === i
          return (
            <div className="card up" key={t.n}>
              <div style={{ height: 50, borderRadius: 8, background: `linear-gradient(${t.sky[0]}, ${t.sky[1]})`, borderBottom: `3px solid ${t.line}` }} />
              <b>{t.n}</b>
              <button className="btn" disabled={!owned && SV.w < t.cost} onClick={() => E.theme(i, t.cost)}>
                {equipped ? 'Equipped ✦' : owned ? 'Equip' : `♡ ${t.cost}`}
              </button>
            </div>
          )
        })}
      </div>
      <div className="card" style={{ textAlign: 'center' }}>
        <img src={WALL} alt="" style={{ maxWidth: '100%', borderRadius: 14, border: '2px solid var(--pink)' }} />
      </div>
    </>
  )
}
