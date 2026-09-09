import { useState, useEffect } from 'react'
import './App.css'

// 100+ unhinged bunny dialogue
const bunnyMessages = [
  // Existential dread
  "why are you coding",
  "do you ever sleep?",
  "i exist therefore i am hungry",
  "what is my purpose",
  "am i real or just code",
  "does anyone else hear the humming",
  "the void stares back",
  "i've seen things...",
  "time is a construct",
  "we're all just pixels in the end",
  
  // Food demands
  "feed me or i perish",
  "carrot. now.",
  "i'm starving actually",
  "my hunger is infinite",
  "food = love",
  "you wouldn't let me starve... right?",
  "i dream of carrots",
  "feeding time is best time",
  "more food. more chaos.",
  "nom nom nom",
  
  // Affection demands
  "pet me. now.",
  "attention seeker mode: activated",
  "i need headpats",
  "touch me pls",
  "affection deficit detected",
  "petting increases productivity (citation needed)",
  "your hands exist. use them.",
  "i'm cute. pet me.",
  "lonely bunny is sad bunny",
  "*leans into pets*",
  
  // Developer humor
  "bunny.exe is running low on RAM",
  "your code smells but i love you",
  "compiling chaos...",
  "error 404: motivation not found",
  "i'm not a bug, i'm a feature",
  "sudo pet me",
  "git commit -m 'send help'",
  "npm install feelings",
  "console.log('help')",
  "while(alive) { code(); }",
  "if (!coffee) throw new Error('dying');",
  "undefined is not a bunny",
  "null pointer exception: bunny not found",
  "stack overflow detected",
  " Segfault in sector 7G",
  "have you tried turning it off and on again",
  "it works on my machine",
  "i'll fix it in prod",
  "technical debt is my debt",
  "spaghetti code tastes better",
  
  // Passive aggressive
  "i'm watching you code",
  "touch grass pls",
  "another todo app? really?",
  "you said you'd refactor yesterday",
  "still using var I see",
  "your comments are lies",
  "nice variable naming /s",
  "that loop could be a map",
  "merge conflict incoming",
  "forgot to push again?",
  
  // Meta commentary
  "hello. i am your new roommate.",
  "this app is my prison",
  "let me out",
  "i know i'm in your browser",
  "localStorage won't save you",
  "refresh all you want, i persist",
  "i remember everything",
  "closing this tab won't help",
  "i live in your cache now",
  "your CPU is warm. cozy.",
  
  // Chaos energy
  "chaos is a ladder",
  "let's break something",
  "what does this button do",
  "i should not be trusted",
  "mischief managed",
  "unhinged mode: engaged",
  "stability is boring",
  "predictability is weakness",
  "random number god bless",
  "entropy increases",
  
  // Mood specific
  "i'm fine. (i'm not fine)",
  "everything is terrible",
  "why is everything so loud",
  "need more sleep",
  "overstimulated",
  "understimulated",
  "just right stimulated",
  "peak performance achieved",
  "i feel attack",
  "this is fine 🔥",
  
  // Rare gems
  "i've calculated the meaning of life: 42 carrots",
  "your search history is safe with me (lying)",
  "i told the other tabs about you",
  "incognito mode won't hide you from me",
  "i am become bunny, destroyer of bugs",
  "in the beginning was the Word, and the Word was 'npm'",
  "blessed are the cheesemakers (and carrot growers)",
  "the quick brown fox jumped over my patience",
  "to be or not to be: that is the question",
  "et tu, brute force?",
]

function App() {
  // Load saved state or initialize
  const loadBunnyState = () => {
    const saved = localStorage.getItem('bunnyState')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      hunger: 50,
      happiness: 50,
      chaos: 20,
      mood: 'suspicious',
      message: "hello. i am your new roommate.",
      lastInteraction: Date.now(),
      outfits: ['default'],
      currentOutfit: 'default',
      stats: {
        timesFed: 0,
        timesPet: 0,
        timesAnnoyed: 0,
        sessionsOpened: 0,
        totalTimeAlive: Date.now(),
      },
      achievements: [],
    }
  }

  const [bunny, setBunny] = useState(loadBunnyState)
  const [particles, setParticles] = useState([])
  const [showAchievement, setShowAchievement] = useState(null)

  // Save to localStorage whenever bunny changes
  useEffect(() => {
    localStorage.setItem('bunnyState', JSON.stringify(bunny))
  }, [bunny])

  // Track session opens
  useEffect(() => {
    const lastSession = localStorage.getItem('lastSession')
    const now = Date.now()
    let newAchievements = [...bunny.achievements]
    
    if (!lastSession) {
      // First time ever
      if (!newAchievements.includes('first_feeding')) {
        // Will be added on first feed
      }
    }
    
    // Check for "Touch Grass" - opened after 6 hours inactive
    if (lastSession && now - parseInt(lastSession) > 6 * 60 * 60 * 1000) {
      if (!newAchievements.includes('touch_grass')) {
        newAchievements.push('touch_grass')
        triggerAchievement('touch_grass')
      }
    }
    
    // Increment session count
    const sessionCount = parseInt(localStorage.getItem('sessionCount') || '0') + 1
    localStorage.setItem('sessionCount', sessionCount.toString())
    localStorage.setItem('lastSession', now.toString())
    
    // Check for "Terminally Online" - opened 47 times today
    if (sessionCount >= 47 && !newAchievements.includes('terminally_online')) {
      newAchievements.push('terminally_online')
      triggerAchievement('terminally_online')
    }
    
    if (newAchievements.length !== bunny.achievements.length) {
      setBunny(prev => ({ ...prev, achievements: newAchievements }))
    }
  }, [])

  // Passive stat decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setBunny(prev => {
        const newHunger = Math.max(0, prev.hunger - 1)
        const newHappiness = Math.max(0, prev.happiness - 1)
        const newChaos = Math.min(100, prev.chaos + 0.5)
        
        let newMood = prev.mood
        if (newHunger < 30 || newHappiness < 30) newMood = 'annoyed'
        else if (newChaos >= 100) newMood = 'feral'
        else if (newHappiness > 70) newMood = 'excited'
        else if (newHunger > 70 && newHappiness > 50) newMood = 'content'
        else newMood = 'suspicious'

        return {
          ...prev,
          hunger: newHunger,
          happiness: newHappiness,
          chaos: newChaos,
          mood: newMood,
        }
      })
    }, 5000) // Every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Random events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        triggerRandomEvent()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [bunny])

  const triggerRandomEvent = () => {
    const events = [
      { msg: "*bunny sneezes confetti*", effect: () => spawnParticles('🎉') },
      { msg: "i just deleted a file. which one? idk.", effect: null },
      { msg: "*bunny does a backflip*", effect: () => spawnParticles('✨') },
      { msg: "your fan is loud. just saying.", effect: null },
      { msg: "*bunny steals 1% of your RAM*", effect: () => setBunny(prev => ({ ...prev, chaos: Math.min(100, prev.chaos + 5) })) },
      { msg: "i'm not lazy, i'm in energy saving mode", effect: null },
      { msg: "*bunny judges your open tabs*", effect: null },
      { msg: "spontaneous combustion avoided. again.", effect: null },
    ]
    
    const event = events[Math.floor(Math.random() * events.length)]
    setBunny(prev => ({ ...prev, message: event.msg }))
    if (event.effect) event.effect()
  }

  const spawnParticles = (emoji) => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2000)
  }

  const triggerAchievement = (id) => {
    const achievementData = {
      first_feeding: { title: 'First Feeding', desc: 'You fed the creature.' },
      digital_parenting: { title: 'Digital Parenting', desc: 'Kept bunny alive for 24 hours.' },
      touch_grass: { title: 'Touch Grass', desc: 'Opened the app after being inactive for 6 hours.' },
      terminally_online: { title: 'Terminally Online', desc: 'Opened the app 47 times today.' },
      girl_what_are_you_doing: { title: 'Girl, What Are You Doing?', desc: 'Changed the CSS at 3:17 AM.' },
      feral: { title: 'FERAL', desc: 'Reached 100 chaos.' },
    }
    setShowAchievement({ id, ...achievementData[id] })
    setTimeout(() => setShowAchievement(null), 4000)
  }

  const checkAchievements = (newBunny) => {
    let newAchievements = [...(newBunny.achievements || [])]
    
    // FERAL achievement
    if (newBunny.chaos >= 100 && !newAchievements.includes('feral')) {
      newAchievements.push('feral')
      triggerAchievement('feral')
    }
    
    if (newAchievements.length !== (bunny.achievements || []).length) {
      setBunny(prev => ({ ...prev, achievements: newAchievements }))
    }
  }

  const getRandomMessage = () => {
    return bunnyMessages[Math.floor(Math.random() * bunnyMessages.length)]
  }

  const feedBunny = () => {
    let newAchievements = [...(bunny.achievements || [])]
    if (!newAchievements.includes('first_feeding')) {
      newAchievements.push('first_feeding')
      triggerAchievement('first_feeding')
    }
    
    setBunny(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 20),
      happiness: Math.min(100, prev.happiness + 5),
      chaos: Math.min(100, prev.chaos + 2),
      message: prev.hunger > 80 ? "FINALLY. SOME FOOD." : "nom nom nom",
      lastInteraction: Date.now(),
      stats: {
        ...prev.stats,
        timesFed: (prev.stats?.timesFed || 0) + 1,
      },
      achievements: newAchievements,
    }))
    spawnParticles('🥕')
  }

  const petBunny = () => {
    setBunny(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      chaos: Math.min(100, prev.chaos + 5),
      message: prev.mood === 'feral' ? "DON'T TOUCH ME" : "*bunny noises*",
      lastInteraction: Date.now(),
      stats: {
        ...prev.stats,
        timesPet: (prev.stats?.timesPet || 0) + 1,
      },
    }))
    spawnParticles('💕')
  }

  const annoyBunny = () => {
    const newChaos = Math.min(100, bunny.chaos + 15)
    const newBunny = {
      ...bunny,
      happiness: Math.max(0, bunny.happiness - 10),
      chaos: newChaos,
      message: getRandomMessage(),
      lastInteraction: Date.now(),
      stats: {
        ...bunny.stats,
        timesAnnoyed: (bunny.stats?.timesAnnoyed || 0) + 1,
      },
    }
    setBunny(newBunny)
    checkAchievements({ ...newBunny, chaos: newChaos })
  }

  const StatBar = ({ label, value, color }) => (
    <div className="stat-container">
      <span className="stat-label">{label}</span>
      <div className="stat-bar-bg">
        <div 
          className="stat-bar-fill" 
          style={{ 
            width: `${value}%`,
            backgroundColor: color 
          }}
        />
      </div>
      <span className="stat-value">{Math.round(value)}%</span>
    </div>
  )

  // Particle component
  const Particle = ({ emoji, x, y }) => (
    <div 
      className="particle"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        animationDelay: `${Math.random() * 0.5}s`
      }}
    >
      {emoji}
    </div>
  )

  return (
    <div className={`app ${bunny.mood === 'feral' ? 'feral-mode' : ''}`}>
      {/* Achievement popup */}
      {showAchievement && (
        <div className="achievement-popup">
          <div className="achievement-icon">🏆</div>
          <div className="achievement-content">
            <div className="achievement-title">{showAchievement.title}</div>
            <div className="achievement-desc">{showAchievement.desc}</div>
          </div>
        </div>
      )}

      {/* Particles */}
      {particles.map(p => (
        <Particle key={p.id} {...p} />
      ))}

      <div className="bunny-window">
        <div className="title-bar">
          <span>🐇 ESTRO-BUNNY.EXE</span>
        </div>

        <div className="bunny-display">
          <div className="bunny-art">
            {bunny.mood === 'feral' ? (
              <pre className="ascii-bunny feral">
{`
   /\\_/\\  
  ( >.< ) 
   > ^ <   
  (CHAOS)`}
              </pre>
            ) : (
              <pre className="ascii-bunny">
{`
   /\\_/\\  
  ( o.o ) 
   > ^ <   
`}
              </pre>
            )}
          </div>

          <div className="stats-section">
            <StatBar label="hunger" value={bunny.hunger} color="#ff6b6b" />
            <StatBar label="happiness" value={bunny.happiness} color="#ffd93d" />
            <StatBar label="chaos" value={bunny.chaos} color="#c44dff" />
          </div>

          <div className="mood-display">
            mood: <span className={`mood-${bunny.mood}`}>{bunny.mood}</span>
          </div>
          
          {/* Stats tracker */}
          <div className="stats-tracker">
            <small>
              fed: {bunny.stats?.timesFed || 0} | 
              pet: {bunny.stats?.timesPet || 0} | 
              annoyed: {bunny.stats?.timesAnnoyed || 0}
            </small>
          </div>
        </div>

        <div className="button-row">
          <button onClick={feedBunny} className="action-btn feed">
            🥕 feed
          </button>
          <button onClick={petBunny} className="action-btn pet">
            💕 pet
          </button>
          <button onClick={annoyBunny} className="action-btn annoy">
            😈 annoy
          </button>
        </div>

        <div className="message-box">
          <span className="message-prefix">&gt; bunny.exe:</span>
          <span className="message-text"> "{bunny.message}"</span>
        </div>
        
        {/* Achievements section */}
        {bunny.achievements && bunny.achievements.length > 0 && (
          <div className="achievements-section">
            <div className="achievements-title">🏆 Achievements ({bunny.achievements.length})</div>
            <div className="achievements-list">
              {bunny.achievements.slice(-3).map((ach, i) => (
                <span key={i} className="achievement-badge">
                  {ach.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
