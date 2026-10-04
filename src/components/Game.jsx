import { E } from '../store'
import { useEffect, useRef, useState } from 'react'
import { createChaosRun } from '../game/chaosRun'
import { useSave } from '../useSave'

export default function Game() {
  const SV = useSave()
  const canvas = useRef(null)
  const daily = useRef(null)
  const game = useRef(null)
  const [hud, setHud] = useState({ label: 'CHAOS 0%', disabled: true, ready: false })
  const [card, setCard] = useState(null)

  useEffect(() => {
    game.current = createChaosRun(canvas.current, E, {
      daily: () => !!daily.current?.checked,
      hud: (label, disabled, ready) =>
        setHud((h) => (h.label === label && h.disabled === disabled && h.ready === ready ? h : { label, disabled, ready })),
    })
    return () => game.current.destroy()
  }, [])

  const share = () => {
    setCard(game.current.share())
    E.tst('long-press / right-click the card to save')
  }

  return (
    <>
      <div id="wrap">
        <canvas ref={canvas} width={800} height={450} />
      </div>
      <div id="ui">
        <label><input ref={daily} type="checkbox" onChange={(e) => e.target.blur()} /> daily seed</label>
        <button className="btn" style={{ padding: '4px 12px' }} onClick={share}>📸 share card</button>
        <span>Tap / Space = jump (x2) · C = CHAOS</span>
        {SV.char === 1 && (
          <button className="btn" style={{ borderColor: '#6ecbff', color: '#6ecbff' }} onPointerDown={(e) => { e.preventDefault(); game.current.ability() }}>💨 DASH</button>
        )}
        <button id="chaos" className={hud.ready ? 'ready' : ''} disabled={hud.disabled} onClick={() => game.current.goChaos()}>
          {hud.label}
        </button>
      </div>
      {card && <img src={card} alt="share card" style={{ display: 'block', maxWidth: '100%', margin: '10px auto', borderRadius: 12 }} />}
    </>
  )
}
