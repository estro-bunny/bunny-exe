import { E } from '../store'
import { useState, useRef, useEffect } from 'react'

function makeCommands(E) {
  return {
    help: () => "help neofetch ls fortune streak whoami hearts skills coffee hrt chaos --max · sudo be-kind-to-yourself · git blame bunny · clear",
    whoami: () => 'estrobunny_xo — trans girl, developer, menace. still here.',
    'git blame bunny': () => 'bunny (100%) — "more chaos pls"',
    hrt: () => 'hits different ♡',
    ls: () => 'chaos.exe  cute.dll  still_here.txt  node_modules/ (do not open)',
    streak: () => `🔥 ${E.SV.streak} day streak`,
    fortune: () => ['today you will ship something unhinged.', 'the bug was a missing semicolon. it is always a missing semicolon.', 'drink water. then chaos.', 'you are the main character of this repo.'][Math.floor(Math.random() * 4)],
    neofetch: () => `bunny@chaos\nOS: EstroBunny OS\nShell: sudo be-kind-to-yourself\nHearts: ${E.SV.w}\nBosses beaten: ${E.SV.boss}\nStreak: ${E.SV.streak}d\nSkins: ${E.SV.sk.length}/13\nBrain: 37 tabs, 2 braincells`,
    coffee: () => '☕ brewing... brain tabs: 38',
    hearts: () => '♡ ' + E.SV.w,
    skills: () => E.SV.sk2.join(', ') || 'none yet — try the Skills tab',
    'chaos --max': () => {
      document.body.classList.toggle('cx')
      return 'CHAOS LEVEL: MAXIMUM ✦'
    },
    'sudo be-kind-to-yourself': () => {
      if (!E.SV.kind) {
        E.SV.kind = 1
        E.SV.w += 15
        E.save()
        return 'permission granted. drink water. you are doing great. +15 ♡'
      }
      return 'already root on kindness ♡'
    },
  }
}

export default function Terminal() {
  const [lines, setLines] = useState(["type 'help' ♡"])
  const [value, setValue] = useState('')
  const box = useRef(null)

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight
  }, [lines])

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') return setLines([])
    const fn = makeCommands(E)[cmd]
    const out = fn ? fn() : `command not found: ${cmd} (blame the compiler)`
    setLines((l) => [...l, '$ ' + cmd, out])
  }

  return (
    <div className="card">
      <h2>bunny@chaos:~$</h2>
      <div id="tout" ref={box}>{lines.join('\n')}</div>
      <input
        id="tin"
        value={value}
        placeholder="command..."
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { run(value); setValue('') } }}
      />
    </div>
  )
}
