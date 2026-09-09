import { useState, useEffect, useCallback } from 'react'

// ASCII Bunny Arts
const bunnyArts = {
  normal: [
    "   /\\_/\\   ",
    "  ( o.o )  ",
    "   > ^ <   ",
  ],
  happy: [
    "   /\\_/\\   ",
    "  ( ^.^ )  ",
    "   > ω <   ",
  ],
  feral: [
    "   /╲_╱\\   ",
    "  ( ಠ_ಠ )  ",
    "   > 🔪 <  ",
  ],
  hacker: [
    "   /\\_/\\   ",
    "  ( 0_0 )  ",
    "   > _ <   ",
  ],
  pride: [
    "   /\\_/\\   ",
    "  ( 🏳️‍⚧️ )  ",
    "   > 💕 <  ",
  ],
}

// Messages
const messages = {
  idle: [
    "why are you like this",
    "touch grass simulator loading...",
    "i've seen your search history",
    "compiling feelings.exe",
    "buffering personality...",
    "404: motivation not found",
    "your code smells but i love you",
    "it compiles? ship it!",
  ],
  hungry: [
    "FEED ME CARROT OR ELSE",
    "starving in digital void",
    "hunger level: critical",
    "feeding time or i riot",
    "carrot deficit emergency",
  ],
  happy: [
    "best human ever!!",
    "purrr... i mean bunny sounds",
    "chaos level: optimal",
    "you get me",
    "we're so back",
  ],
  annoyed: [
    "stop poking me",
    "i have boundaries",
    "this is harassment",
    "calling the bunny police",
    "unsubscribing from this interaction",
  ],
  feral: [
    "EVERYTHING IS FINE",
    "CHAOS CHAOS CHAOS",
    "SYSTEM FAILURE IMMINENT",
    "ABORT ABORT ABORT",
    "🔥🔥🔥 LET IT BURN 🔥🔥🔥",
  ],
  hacker: [
    "accessing mainframe...",
    "bypassing firewall...",
    "downloading more RAM",
    "hacking the planet",
    "sudo feed me",
  ],
}

// Achievements
const achievementsList = [
  { id: 'first_feed', name: 'First Feeding', desc: 'You fed the creature', icon: '🥕' },
  { id: 'pet_master', name: 'Pet Master', desc: 'Pet bunny 50 times', icon: '💕' },
  { id: 'chaos_agent', name: 'Chaos Agent', desc: 'Reach 100% chaos', icon: '🔥' },
  { id: 'feral_mode', name: 'FERAL', desc: 'Unleash the beast', icon: '😈' },
  { id: 'pink_princess', name: 'Pretty in Pink', desc: 'Reach 50% estrogen', icon: '🎀' },
  { id: 'pride_bunny', name: 'Pride Bunny', desc: 'Max estrogen mode', icon: '🏳️‍⚧️' },
  { id: 'hacker', name: 'Hacker Unlocked', desc: 'Win 5 mini-games', icon: '💻' },
  { id: 'well_fed', name: 'Well Fed', desc: 'Feed bunny 50 times', icon: '🍽️' },
]

export default function App() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('bunny-stats')
    return saved ? JSON.parse(saved) : {
      hunger: 50,
      happiness: 50,
      chaos: 20,
      energy: 80,
      lifetimeFeeds: 0,
      lifetimePets: 0,
      lifetimeAnnoys: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      sessions: 0,
      createdAt: Date.now(),
    }
  })

  const [mood, setMood] = useState('normal')
  const [message, setMessage] = useState(messages.idle[0])
  const [estrogenMode, setEstrogenMode] = useState(false)
  const [estrogenLevel, setEstrogenLevel] = useState(0)
  const [particles, setParticles] = useState([])
  const [achievements, setAchievements] = useState([])
  const [showAchievement, setShowAchievement] = useState(null)
  const [isFeral, setIsFeral] = useState(false)
  const [skin, setSkin] = useState('default')
  const [miniGame, setMiniGame] = useState(null)
  const [notification, setNotification] = useState(null)

  // Save stats
  useEffect(() => {
    localStorage.setItem('bunny-stats', JSON.stringify(stats))
  }, [stats])

  // Unlock achievements
  const unlockAchievement = useCallback((id) => {
    if (!achievements.includes(id)) {
      setAchievements(prev => [...prev, id])
      const achievement = achievementsList.find(a => a.id === id)
      setShowAchievement(achievement)
      setTimeout(() => setShowAchievement(null), 3000)
    }
  }, [achievements])

  // Check achievements
  useEffect(() => {
    if (stats.lifetimeFeeds >= 1) unlockAchievement('first_feed')
    if (stats.lifetimeFeeds >= 50) unlockAchievement('well_fed')
    if (stats.lifetimePets >= 50) unlockAchievement('pet_master')
    if (stats.chaos >= 100) unlockAchievement('chaos_agent')
    if (estrogenLevel >= 50) unlockAchievement('pink_princess')
    if (estrogenLevel >= 100) unlockAchievement('pride_bunny')
    if (stats.gamesWon >= 5) unlockAchievement('hacker')
  }, [stats, estrogenLevel, unlockAchievement])

  // Determine mood and skin
  useEffect(() => {
    if (stats.chaos >= 100) {
      setMood('feral')
      setIsFeral(true)
      setSkin('feral')
    } else if (estrogenLevel >= 100) {
      setMood('happy')
      setSkin('pride')
    } else if (estrogenLevel >= 50) {
      setMood('happy')
      setSkin('pink')
    } else if (stats.hunger < 30) {
      setMood('hungry')
      setSkin('default')
    } else if (stats.happiness > 70) {
      setMood('happy')
      setSkin('default')
    } else if (stats.happiness < 30) {
      setMood('annoyed')
      setSkin('default')
    } else {
      setMood('normal')
      setSkin('default')
    }
  }, [stats, estrogenLevel])

  // Random messages
  useEffect(() => {
    const interval = setInterval(() => {
      const category = mood === 'feral' ? 'feral' : 
                       stats.hunger < 30 ? 'hungry' : 
                       mood
      const msgs = messages[category] || messages.idle
      setMessage(msgs[Math.floor(Math.random() * msgs.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [mood, stats.hunger])

  // Stats decay
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 2),
        happiness: Math.max(0, prev.happiness - 1),
        chaos: Math.min(100, Math.max(0, prev.chaos + 0.5)),
        energy: Math.max(0, prev.energy - 1),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Particle system
  const spawnParticles = (emoji, count = 10) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10 - 5,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 2000)
  }

  // Actions
  const feed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 20),
      happiness: Math.min(100, prev.happiness + 10),
      chaos: Math.min(100, prev.chaos + 5),
      lifetimeFeeds: prev.lifetimeFeeds + 1,
    }))
    spawnParticles('🥕')
    setMessage("tasty carrot!!")
  }

  const pet = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      chaos: Math.min(100, prev.chaos + 3),
      lifetimePets: prev.lifetimePets + 1,
    }))
    spawnParticles('💕')
    setMessage("*purrs violently*")
  }

  const annoy = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.max(0, prev.happiness - 20),
      chaos: Math.min(100, prev.chaos + 15),
      lifetimeAnnoys: prev.lifetimeAnnoys + 1,
    }))
    spawnParticles('😈')
    setMessage("STOP THAT")
  }

  const toggleEstrogen = () => {
    setEstrogenMode(!estrogenMode)
    if (!estrogenMode) {
      setEstrogenLevel(prev => Math.min(100, prev + 10))
      spawnParticles('🏳️‍⚧️', 20)
    }
  }

  const bunnyArt = bunnyArts[skin] || bunnyArts.normal

  return (
    <div className={`min-h-screen relative overflow-hidden ${isFeral ? 'shake' : ''}`}>
      {/* CRT Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50" />
      
      {/* Grid Background */}
      <div className="grid-bg fixed inset-0 opacity-30" />

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 transition-all duration-1000"
        style={{
          background: estrogenMode 
            ? `linear-gradient(${estrogenLevel}deg, #ff69b4, #ffffff, #00bfff)`
            : 'linear-gradient(135deg, #050505 0%, #1a1a2e 100%)',
          opacity: estrogenMode ? 0.3 : 1,
        }}
      />

      {/* Achievement Toast */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-void-black border-4 border-neon-green p-4 rounded-lg shadow-lg shadow-neon-green">
            <div className="text-2xl">{showAchievement.icon}</div>
            <div className="text-neon-green font-bold">{showAchievement.name}</div>
            <div className="text-xs text-gray-300">{showAchievement.desc}</div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header */}
        <header className="w-full max-w-2xl mb-8">
          <div className="flex justify-between items-center bg-void-black/80 backdrop-blur border-4 border-neon-green p-4 rounded-lg">
            <h1 className="text-4xl glitch-text text-neon-pink" data-text="🐇 ESTRO-BUNNY.EXE">
              🐇 ESTRO-BUNNY.EXE
            </h1>
            <button
              onClick={toggleEstrogen}
              className={`px-4 py-2 border-4 font-bold transition-all ${
                estrogenMode 
                  ? 'border-pink-500 bg-pink-500 text-white rainbow' 
                  : 'border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black'
              }`}
            >
              🏳️‍⚧️ {estrogenMode ? `${estrogenLevel}%` : 'ENABLE'}
            </button>
          </div>
        </header>

        {/* Bunny Display */}
        <div className={`relative mb-8 p-8 border-4 ${
          isFeral 
            ? 'border-red-600 bg-red-900/50 shake' 
            : 'border-neon-green bg-void-black/80'
        } backdrop-blur rounded-lg ${estrogenMode && estrogenLevel >= 100 ? 'rainbow' : ''}`}>
          
          {/* ASCII Bunny */}
          <pre className={`text-2xl md:text-4xl font-bold leading-tight ${
            isFeral ? 'text-red-500' : 'text-neon-green'
          } ${estrogenMode ? 'rainbow' : ''}`}>
            {bunnyArt.join('\n')}
          </pre>

          {/* Mood Text */}
          <div className="mt-4 text-center">
            <p className={`text-xl ${isFeral ? 'text-red-500 shake' : 'text-neon-yellow'}`}>
              mood: {mood.toUpperCase()}
            </p>
            <p className="text-lg text-gray-300 mt-2">"{message}"</p>
          </div>
        </div>

        {/* Stats Bars */}
        <div className="w-full max-w-md mb-8 space-y-3">
          {[
            { label: 'hunger', value: stats.hunger, color: 'bg-orange-500' },
            { label: 'happiness', value: stats.happiness, color: 'bg-pink-500' },
            { label: 'chaos', value: stats.chaos, color: 'bg-red-500' },
            { label: 'energy', value: stats.energy, color: 'bg-blue-500' },
          ].map(stat => (
            <div key={stat.label} className="bg-void-black/80 border-2 border-neon-green p-2 rounded">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neon-green">{stat.label}</span>
                <span className="text-gray-300">{Math.round(stat.value)}%</span>
              </div>
              <div className="h-4 bg-gray-800 rounded overflow-hidden">
                <div 
                  className={`h-full ${stat.color} transition-all duration-500`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}

          {/* Estrogen Bar */}
          {estrogenMode && (
            <div className="bg-void-black/80 border-2 border-pink-500 p-2 rounded">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-pink-500">✨ estrogen</span>
                <span className="text-gray-300">{estrogenLevel}%</span>
              </div>
              <div className="h-4 bg-gray-800 rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-white to-blue-500 transition-all duration-500"
                  style={{ width: `${estrogenLevel}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={feed}
            className="px-8 py-4 text-xl border-4 border-orange-500 bg-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-black font-bold rounded-lg transition-all hover:scale-110 active:scale-95"
          >
            🥕 FEED
          </button>
          <button
            onClick={pet}
            className="px-8 py-4 text-xl border-4 border-pink-500 bg-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-black font-bold rounded-lg transition-all hover:scale-110 active:scale-95"
          >
            💕 PET
          </button>
          <button
            onClick={annoy}
            className="px-8 py-4 text-xl border-4 border-red-500 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-black font-bold rounded-lg transition-all hover:scale-110 active:scale-95"
          >
            😈 ANNOY
          </button>
        </div>

        {/* Lifetime Stats */}
        <div className="w-full max-w-md bg-void-black/80 backdrop-blur border-2 border-neon-blue p-4 rounded-lg">
          <h3 className="text-xl text-neon-blue mb-3 font-bold">📊 LIFETIME STATS</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-300">Feeds:</div>
            <div className="text-neon-green text-right">{stats.lifetimeFeeds}</div>
            <div className="text-gray-300">Pets:</div>
            <div className="text-neon-green text-right">{stats.lifetimePets}</div>
            <div className="text-gray-300">Annoys:</div>
            <div className="text-neon-green text-right">{stats.lifetimeAnnoys}</div>
            <div className="text-gray-300">Sessions:</div>
            <div className="text-neon-green text-right">{stats.sessions}</div>
            <div className="text-gray-300">Achievements:</div>
            <div className="text-neon-green text-right">{achievements.length}/{achievementsList.length}</div>
          </div>
        </div>

        {/* Achievements List */}
        <div className="w-full max-w-md mt-8 bg-void-black/80 backdrop-blur border-2 border-neon-yellow p-4 rounded-lg">
          <h3 className="text-xl text-neon-yellow mb-3 font-bold">🏆 ACHIEVEMENTS</h3>
          <div className="grid grid-cols-4 gap-2">
            {achievementsList.map(ach => (
              <div
                key={ach.id}
                className={`aspect-square flex items-center justify-center border-2 rounded ${
                  achievements.includes(ach.id)
                    ? 'border-neon-green bg-neon-green/20'
                    : 'border-gray-700 bg-gray-900/50 opacity-50'
                }`}
                title={achievements.includes(ach.id) ? ach.name : 'Locked'}
              >
                {achievements.includes(ach.id) ? (
                  <span className="text-2xl">{ach.icon}</span>
                ) : (
                  <span className="text-xl">🔒</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed text-2xl pointer-events-none z-40 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translate(${particle.vx}px, ${particle.vy}px)`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  )
}
