import { useState, useEffect, useCallback } from 'react'

const MESSAGES = {
  idle: ["staring at your code...", "waiting for estrogen...", "bored. entertain me.", "feed me or i break things"],
  happy: ["YASSS QUEEN! 💅", "good girl~ 🐇💕", "trans rights AND snacks!", "more pets pls"],
  hungry: ["CARROT. NOW. 🥕", "starving... dying... forever...", "feeding time is NOW", "hunger level: critical"],
  annoyed: ["ugh. do you HAVE to click that?", "the audacity...", "rude behavior detected", "why are you like this"],
  feral: ["CHAOS CHAOS CHAOS", "I SEE EVERYTHING", "TOO MUCH ESTROGEN AAAAA", "FERAL MODE ACTIVATED"],
}

const getRandomMessage = (category) => {
  const msgs = MESSAGES[category] || MESSAGES.idle
  return msgs[Math.floor(Math.random() * msgs.length)]
}

const Particle = ({ emoji, x, y, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1000)
    return () => clearTimeout(timer)
  }, [onComplete])
  return (
    <div className="pointer-events-none fixed z-50 text-2xl animate-bounce-chaos" style={{ left: x, top: y, transform: `rotate(${Math.random() * 360}deg)` }}>
      {emoji}
    </div>
  )
}

const AchievementToast = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])
  return (
    <div className="fixed bottom-4 right-4 glass-panel rounded-lg p-4 border-2 border-trans-pink animate-bounce-chaos z-50">
      <div className="text-2xl mb-1">{achievement.icon}</div>
      <div className="font-bold text-white text-sm">{achievement.title}</div>
      <div className="text-xs text-trans-pink">{achievement.desc}</div>
    </div>
  )
}

export default function App() {
  const [hunger, setHunger] = useState(50)
  const [happiness, setHappiness] = useState(50)
  const [chaos, setChaos] = useState(0)
  const [estrogen, setEstrogen] = useState(0)
  const [mood, setMood] = useState('idle')
  const [message, setMessage] = useState("bunny.exe loaded...")
  const [feralMode, setFeralMode] = useState(false)
  const [estrogenMode, setEstrogenMode] = useState(false)
  const [stats, setStats] = useState({ feeds: 0, pets: 0, annoys: 0, sessions: 1, createdAt: Date.now() })
  const [achievements, setAchievements] = useState([])
  const [newAchievement, setNewAchievement] = useState(null)
  const [particles, setParticles] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('bunny-save') ?? localStorage.getItem('bunny-state')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setHunger(data.hunger ?? 50)
        setHappiness(data.happiness ?? 50)
        setChaos(data.chaos ?? 0)
        setEstrogen(data.estrogen ?? 0)
        setMood(data.mood ?? 'idle')
        setEstrogenMode(data.estrogenMode ?? false)
        setStats(prev => ({
          ...prev,
          ...(data.stats ?? {}),
          feeds: data.stats?.feeds ?? data.feedCount ?? prev.feeds,
          pets: data.stats?.pets ?? data.petCount ?? prev.pets,
          annoys: data.stats?.annoys ?? data.annoyCount ?? prev.annoys,
          sessions: data.stats?.sessions ?? data.totalSessions ?? prev.sessions,
        }))
        setAchievements(data.achievements ?? [])
      } catch (e) {
        console.error('Failed to load save', e)
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    const data = {
      schemaVersion: 1,
      hunger,
      happiness,
      chaos,
      estrogen,
      mood,
      estrogenMode,
      stats,
      achievements,
    }
    localStorage.setItem('bunny-save', JSON.stringify(data))

    // bunny-state is the canonical cross-project schema consumed by the Burrow.
    localStorage.setItem('bunny-state', JSON.stringify({
      schemaVersion: 1,
      hunger,
      happiness,
      chaos,
      mood: mood === 'idle' ? 'Content' : mood,
      estrogen,
      feedCount: stats.feeds,
      petCount: stats.pets,
      annoyCount: stats.annoys,
      gamesPlayed: stats.gamesPlayed ?? 0,
      gamesWon: stats.gamesWon ?? 0,
      skin: stats.skin ?? 'default',
      achievements,
      lastVisit: Date.now(),
      totalSessions: stats.sessions,
    }))
  }, [hydrated, hunger, happiness, chaos, estrogen, mood, estrogenMode, stats, achievements])

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(h => Math.max(0, h - 2))
      setHappiness(h => Math.max(0, h - 1))
      setChaos(c => Math.min(100, c + 0.5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (chaos >= 100) { setMood('feral'); setFeralMode(true) }
    else if (hunger < 30) { setMood('hungry'); setFeralMode(false) }
    else if (happiness > 70) { setMood('happy'); setFeralMode(false) }
    else if (happiness < 30) { setMood('annoyed'); setFeralMode(false) }
    else { setMood('idle'); setFeralMode(false) }
  }, [hunger, happiness, chaos])

  const checkAchievements = useCallback((newStats) => {
    const newAchievements = []
    if (newStats.feeds >= 50 && !achievements.includes('well-fed')) newAchievements.push({ id: 'well-fed', icon: '🍽️', title: 'Well Fed', desc: 'Fed bunny 50 times' })
    if (newStats.pets >= 100 && !achievements.includes('pet-master')) newAchievements.push({ id: 'pet-master', icon: '💕', title: 'Pet Master', desc: 'Petted bunny 100 times' })
    if (newStats.annoys >= 25 && !achievements.includes('chaos-agent')) newAchievements.push({ id: 'chaos-agent', icon: '😈', title: 'Chaos Agent', desc: 'Annoyed bunny 25 times' })
    if (estrogen >= 50 && !achievements.includes('pretty-pink')) newAchievements.push({ id: 'pretty-pink', icon: '🎀', title: 'Pretty in Pink', desc: 'Reached 50% estrogen' })
    if (estrogen >= 100 && !achievements.includes('pride-bunny')) newAchievements.push({ id: 'pride-bunny', icon: '🏳️‍⚧️', title: 'Pride Bunny', desc: 'Maximum estrogen!' })
    if (chaos >= 100 && !achievements.includes('feral')) newAchievements.push({ id: 'feral', icon: '💀', title: 'FERAL', desc: 'Unleashed chaos' })
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements.map(a => a.id)])
      setNewAchievement(newAchievements[0])
    }
  }, [achievements, estrogen, chaos])

  const spawnParticles = (emoji, count = 5) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({ id: Date.now() + i, emoji, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }))
    setParticles(prev => [...prev, ...newParticles])
  }

  const feed = () => {
    setHunger(h => Math.min(100, h + 20))
    setHappiness(h => Math.min(100, h + 5))
    setChaos(c => Math.max(0, c - 5))
    setMessage(getRandomMessage('happy'))
    setStats(prev => ({ ...prev, feeds: prev.feeds + 1 }))
    spawnParticles('🥕', 8)
  }

  const pet = () => {
    setHappiness(h => Math.min(100, h + 15))
    setHunger(h => Math.max(0, h - 5))
    setMessage(getRandomMessage('happy'))
    setStats(prev => ({ ...prev, pets: prev.pets + 1 }))
    spawnParticles('💖', 10)
  }

  const annoy = () => {
    setHappiness(h => Math.max(0, h - 20))
    setChaos(c => Math.min(100, c + 15))
    setMessage(getRandomMessage('annoyed'))
    setStats(prev => ({ ...prev, annoys: prev.annoys + 1 }))
    spawnParticles('😈', 6)
  }

  const toggleEstrogen = () => {
    setEstrogenMode(!estrogenMode)
    if (!estrogenMode) {
      setEstrogen(e => Math.min(100, e + 25))
      setMessage("ESTROGEN MODE ACTIVATED 💉✨")
      spawnParticles('💊', 15)
      spawnParticles('✨', 10)
    } else { setMessage("estrogen mode deactivated...") }
  }

  useEffect(() => {
    const interval = setInterval(() => { if (mood === 'idle') setMessage(getRandomMessage('idle')) }, 5000)
    return () => clearInterval(interval)
  }, [mood])

  useEffect(() => { checkAchievements(stats) }, [stats, checkAchievements])

  useEffect(() => {
    if (feralMode) document.body.classList.add('feral-mode')
    else document.body.classList.remove('feral-mode')
    return () => document.body.classList.remove('feral-mode')
  }, [feralMode])

  const getBunnyColor = () => {
    if (feralMode) return '#ff003c'
    if (estrogenMode && estrogen >= 100) return '#ff73a4'
    if (estrogenMode && estrogen >= 50) return '#ffffff'
    if (estrogenMode) return '#5bcefa'
    return '#f5d5cb'
  }
  const bunnyColor = getBunnyColor()

  return (
    <div className={`min-h-screen trans-gradient crt-scanlines ${feralMode ? 'feral-mode' : ''}`}>
      {particles.map(p => <Particle key={p.id} {...p} onComplete={() => setParticles(prev => prev.filter(x => x.id !== p.id))} />)}
      {newAchievement && <AchievementToast achievement={newAchievement} onClose={() => setNewAchievement(null)} />}
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="glass-panel rounded-2xl p-6 mb-6 neon-border">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-mono font-bold text-white neon-text">🐇 ESTRO-BUNNY.EXE</h1>
            <button onClick={toggleEstrogen} className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${estrogenMode ? 'bg-trans-pink text-white animate-pulse-fast' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              🏳️‍⚧️ {estrogenMode ? `${estrogen}%` : 'ACTIVATE'}
            </button>
          </div>
          {estrogenMode && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white mb-1"><span>ESTROGEN LEVEL</span><span>{estrogen}%</span></div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full trans-gradient transition-all duration-500" style={{ width: `${estrogen}%` }} />
              </div>
            </div>
          )}
        </header>

        <div className="glass-panel rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="relative w-64 h-64 mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full bunny-face">
              <ellipse cx="70" cy="50" rx="15" ry="40" fill={bunnyColor} stroke="#333" strokeWidth="3" className={feralMode ? 'animate-shake-hard' : 'animate-wiggle'} style={{ transformOrigin: '70px 90px' }} />
              <ellipse cx="130" cy="50" rx="15" ry="40" fill={bunnyColor} stroke="#333" strokeWidth="3" className={feralMode ? 'animate-shake-hard' : 'animate-wiggle'} style={{ transformOrigin: '130px 90px', animationDelay: '0.1s' }} />
              <ellipse cx="70" cy="50" rx="8" ry="25" fill="#ffb6c1" />
              <ellipse cx="130" cy="50" rx="8" ry="25" fill="#ffb6c1" />
              <ellipse cx="100" cy="110" rx="60" ry="50" fill={bunnyColor} stroke="#333" strokeWidth="3" className={feralMode ? 'animate-shake-hard' : ''} />
              <circle cx="80" cy="100" r="12" fill="white" stroke="#333" strokeWidth="2" />
              <circle cx="120" cy="100" r="12" fill="white" stroke="#333" strokeWidth="2" />
              <circle cx={80 + (mood === 'annoyed' ? -2 : 0)} cy="100" r="5" fill="#333" />
              <circle cx={120 + (mood === 'annoyed' ? 2 : 0)} cy="100" r="5" fill="#333" />
              {(happiness > 50 || estrogenMode) && (<><ellipse cx="60" cy="120" rx="10" ry="6" fill="#ff73a4" opacity="0.6" /><ellipse cx="140" cy="120" rx="10" ry="6" fill="#ff73a4" opacity="0.6" /></>)}
              {mood === 'happy' ? (<path d="M 85 130 Q 100 145 115 130" stroke="#333" strokeWidth="3" fill="none" />) : mood === 'annoyed' ? (<path d="M 85 135 Q 100 125 115 135" stroke="#333" strokeWidth="3" fill="none" />) : mood === 'feral' ? (<path d="M 80 125 L 90 140 L 100 130 L 110 140 L 120 125" stroke="#333" strokeWidth="3" fill="#ff003c" />) : (<ellipse cx="100" cy="135" rx="8" ry="5" fill="#333" />)}
            </svg>
          </div>
          <div className="mt-6 text-center">
            <div className="inline-block glass-panel rounded-xl px-6 py-3">
              <p className="text-white font-mono text-lg animate-pulse-fast">{message}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${feralMode ? 'bg-chaos-red text-white animate-shake-hard' : mood === 'happy' ? 'bg-trans-pink text-white' : mood === 'hungry' ? 'bg-orange-500 text-white' : mood === 'annoyed' ? 'bg-purple-600 text-white' : 'bg-white/20 text-white'}`}>
              MOOD: {mood.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[{ label: 'HUNGER', value: hunger, color: 'bg-orange-500' }, { label: 'HAPPINESS', value: happiness, color: 'bg-trans-pink' }, { label: 'CHAOS', value: chaos, color: feralMode ? 'bg-chaos-red' : 'bg-chaos-green' }].map(stat => (
            <div key={stat.label} className="glass-panel rounded-xl p-4">
              <div className="text-xs text-white mb-2 font-mono">{stat.label}</div>
              <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color} transition-all duration-300`} style={{ width: `${stat.value}%` }} />
              </div>
              <div className="text-right text-white text-sm mt-1">{stat.value}%</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button onClick={feed} className="glass-panel rounded-xl p-4 text-2xl font-bold text-white hover:bg-orange-500/50 transition-all active:scale-95 neon-border">🥕 FEED</button>
          <button onClick={pet} className="glass-panel rounded-xl p-4 text-2xl font-bold text-white hover:bg-trans-pink/50 transition-all active:scale-95 neon-border">💕 PET</button>
          <button onClick={annoy} className="glass-panel rounded-xl p-4 text-2xl font-bold text-white hover:bg-purple-600/50 transition-all active:scale-95 neon-border">😈 ANNOY</button>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-mono font-bold text-white mb-4">LIFETIME STATS</h2>
          <div className="grid grid-cols-2 gap-4 text-white font-mono text-sm">
            <div>Feeds: {stats.feeds}</div>
            <div>Pets: {stats.pets}</div>
            <div>Annoys: {stats.annoys}</div>
            <div>Sessions: {stats.sessions}</div>
            <div>Achievements: {achievements.length}</div>
            <div>Time Alive: {Math.floor((Date.now() - stats.createdAt) / 60000)} min</div>
          </div>
        </div>

        <footer className="mt-8 text-center text-white/60 font-mono text-xs">v0.7 • made with 💖 and too much estrogen</footer>
      </div>
    </div>
  )
}
