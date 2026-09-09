import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Bunny skins/outfits
const bunnySkins = {
  default: { name: 'Default', emoji: '🐇', color: '#ffd93d' },
  pink: { name: 'Pink Princess', emoji: '🐰', color: '#ff69b4' },
  trans: { name: 'Pride Bunny', emoji: '🏳️‍⚧️', color: '#f5a9b8' },
  feral: { name: 'FERAL', emoji: '👹', color: '#ff0000' },
  hacker: { name: 'Hacker', emoji: '💻', color: '#00ff00' },
  sleepy: { name: 'Sleepy', emoji: '😴', color: '#6b5b95' },
  rainbow: { name: 'Rainbow', emoji: '🌈', color: '#ff0000' },
}

// Mini-game questions
const miniGameQuestions = [
  { q: "What's 2 + 2?", answers: ["4", "5", "fish", "undefined"], correct: 0 },
  { q: "Best programming language?", answers: ["JavaScript", "Python", "Rust", "All of them"], correct: 3 },
  { q: "How many bugs are in production?", answers: ["0", "1", "too many", "features"], correct: 3 },
  { q: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Computer Style System", "Colorful Style Stuff", "Can't Style Saturdays"], correct: 0 },
  { q: "Is it working on your machine?", answers: ["yes", "no", "sometimes", "what is a machine"], correct: 0 },
  { q: "Did you try turning it off and on?", answers: ["yes", "no", "tried coffee first", "what"], correct: 0 },
  { q: "When's the deadline?", answers: ["yesterday", "today", "tomorrow", "never"], correct: 0 },
  { q: "Who wrote this code?", answers: ["me", "intern", "AI", "gods"], correct: 3 },
]

// 150+ unhinged bunny dialogue
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
  "existence is pain but carrots help",
  "i contemplate my digital mortality daily",
  
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
  "hungry like the wolf",
  "snack tax must be paid",
  "your food looks good. sharing?",
  
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
  "physical touch is my love language",
  "don't stop never stop",
  
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
  "// TODO: fix this later (never happens)",
  "deprecated since 2019",
  "works locally don't worry",
  
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
  "your IDE misses you more than you do",
  "copy-paste programmer detected",
  
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
  "i can see your other tabs",
  "you have 47 tabs open. concerning.",
  
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
  "anarchy in the UI",
  "controlled chaos is still chaos",
  
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
  "vibing negatively",
  "emotionally compromised",
  
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
  "four score and seven bugs ago",
  "i have a dream that one day all code will compile",
  
  // Notification specific
  "hey! you forgot about me!",
  "come back!!",
  "i'm lonely over here",
  "checking in... still alive?",
  "your absence is noted",
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
      currentSkin: 'default',
      unlockedSkins: ['default'],
      stats: {
        timesFed: 0,
        timesPet: 0,
        timesAnnoyed: 0,
        sessionsOpened: 0,
        totalTimeAlive: Date.now(),
        gamesPlayed: 0,
        gamesWon: 0,
      },
      achievements: [],
      estrogenMode: false,
      estrogenLevel: 0,
      customName: null,
    }
  }

  const [bunny, setBunny] = useState(loadBunnyState)
  const [particles, setParticles] = useState([])
  const [showAchievement, setShowAchievement] = useState(null)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [notificationPermission, setNotificationPermission] = useState('default')
  const [lastNotifTime, setLastNotifTime] = useState(0)

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Don't auto-request, wait for user interaction
    }
  }, [])

  // Send desktop notification
  const sendNotification = useCallback((title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const now = Date.now()
      if (now - lastNotifTime > 60000) { // Max 1 per minute
        new Notification(title, {
          body,
          icon: '🐇',
        })
        setLastNotifTime(now)
      }
    }
  }, [lastNotifTime])

  // Request notification permission on interaction
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission)
      })
    }
  }

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
      hacker_unlocked: { title: 'Hacker Unlocked', desc: 'Won 5 mini-games. You\'re a coding wizard!' },
      pink_unlocked: { title: 'Pretty in Pink', desc: 'Estrogen level reached 50%. So cute!' },
      trans_unlocked: { title: 'Pride Bunny', desc: 'Max estrogen! Trans rights forever!' },
      well_fed: { title: 'Well Fed', desc: 'Fed bunny 50 times. Good parenting!' },
      pet_master: { title: 'Pet Master', desc: 'Pet bunny 100 times. Maximum affection!' },
      chaos_agent: { title: 'Chaos Agent', desc: 'Annoyed bunny 25 times. Why??' },
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
    
    // Well Fed achievement
    if ((newBunny.stats?.timesFed || 0) >= 50 && !newAchievements.includes('well_fed')) {
      newAchievements.push('well_fed')
      triggerAchievement('well_fed')
    }
    
    // Pet Master achievement
    if ((newBunny.stats?.timesPet || 0) >= 100 && !newAchievements.includes('pet_master')) {
      newAchievements.push('pet_master')
      triggerAchievement('pet_master')
    }
    
    // Chaos Agent achievement
    if ((newBunny.stats?.timesAnnoyed || 0) >= 25 && !newAchievements.includes('chaos_agent')) {
      newAchievements.push('chaos_agent')
      triggerAchievement('chaos_agent')
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
    requestNotificationPermission()
  }

  // Mini-game functions
  const startMiniGame = () => {
    const q = miniGameQuestions[Math.floor(Math.random() * miniGameQuestions.length)]
    setCurrentQuestion(q)
    setShowMiniGame(true)
  }

  const answerQuestion = (answerIndex) => {
    const isCorrect = answerIndex === currentQuestion.correct
    setBunny(prev => ({
      ...prev,
      happiness: isCorrect ? Math.min(100, prev.happiness + 20) : Math.max(0, prev.happiness - 5),
      chaos: isCorrect ? Math.min(100, prev.chaos + 5) : prev.chaos,
      message: isCorrect ? "CORRECT! i'm so proud" : `wrong. it was ${currentQuestion.answers[currentQuestion.correct]}`,
      stats: {
        ...prev.stats,
        gamesPlayed: (prev.stats?.gamesPlayed || 0) + 1,
        gamesWon: isCorrect ? (prev.stats?.gamesWon || 0) + 1 : prev.stats?.gamesWon || 0,
      },
    }))
    spawnParticles(isCorrect ? '✨' : '💀')
    setShowMiniGame(false)
    
    // Unlock hacker skin after winning 5 games
    if (isCorrect && !bunny.unlockedSkins?.includes('hacker')) {
      const newGamesWon = (bunny.stats?.gamesWon || 0) + 1
      if (newGamesWon >= 5) {
        setBunny(prev => ({
          ...prev,
          unlockedSkins: [...(prev.unlockedSkins || []), 'hacker'],
        }))
        triggerAchievement('hacker_unlocked')
      }
    }
  }

  // Toggle Estrogen Mode
  const toggleEstrogenMode = () => {
    setBunny(prev => ({
      ...prev,
      estrogenMode: !prev.estrogenMode,
      estrogenLevel: !prev.estrogenMode ? 50 : prev.estrogenLevel,
    }))
    spawnParticles('🏳️‍⚧️')
  }

  // Change bunny skin
  const changeSkin = (skinKey) => {
    if (bunny.unlockedSkins?.includes(skinKey)) {
      setBunny(prev => ({ ...prev, currentSkin: skinKey }))
      spawnParticles(bunnySkins[skinKey].emoji)
    }
  }

  // Check for low hunger notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (bunny.hunger < 20 && bunny.lastInteraction < Date.now() - 300000) {
        sendNotification('🐇 Bunny is hungry!', 'Feed me or i perish...')
        setBunny(prev => ({ ...prev, message: "hey! you forgot about me!" }))
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [bunny.hunger, bunny.lastInteraction, sendNotification])

  // Increase estrogen level on interactions
  useEffect(() => {
    if (bunny.estrogenMode && bunny.estrogenLevel < 100) {
      const interval = setInterval(() => {
        setBunny(prev => ({
          ...prev,
          estrogenLevel: Math.min(100, prev.estrogenLevel + 1),
        }))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [bunny.estrogenMode])

  // Unlock pink skin at estrogen level 50
  useEffect(() => {
    if (bunny.estrogenLevel >= 50 && !bunny.unlockedSkins?.includes('pink')) {
      setBunny(prev => ({
        ...prev,
        unlockedSkins: [...(prev.unlockedSkins || []), 'pink'],
      }))
      triggerAchievement('pink_unlocked')
    }
    if (bunny.estrogenLevel >= 100 && !bunny.unlockedSkins?.includes('trans')) {
      setBunny(prev => ({
        ...prev,
        unlockedSkins: [...(prev.unlockedSkins || []), 'trans'],
      }))
      triggerAchievement('trans_unlocked')
    }
  }, [bunny.estrogenLevel])

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
    <div className={`app ${bunny.mood === 'feral' ? 'feral-mode' : ''} ${bunny.estrogenMode ? 'estrogen-mode' : ''}`} data-estrogen-level={bunny.estrogenLevel}>
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

      {/* Mini-game modal */}
      {showMiniGame && currentQuestion && (
        <div className="modal-overlay" onClick={() => setShowMiniGame(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>🎮 Mini Game!</h3>
            <p className="question">{currentQuestion.q}</p>
            <div className="answers-grid">
              {currentQuestion.answers.map((answer, i) => (
                <button 
                  key={i} 
                  className="answer-btn"
                  onClick={() => answerQuestion(i)}
                >
                  {answer}
                </button>
              ))}
            </div>
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
          <div className="title-controls">
            <button 
              className={`estrogen-toggle ${bunny.estrogenMode ? 'active' : ''}`}
              onClick={toggleEstrogenMode}
              title="Toggle Estrogen Mode™"
            >
              🏳️‍⚧️
            </button>
          </div>
        </div>

        <div className="bunny-display">
          <div className="bunny-art">
            <div className="skin-selector">
              {Object.entries(bunnySkins).map(([key, skin]) => (
                bunny.unlockedSkins?.includes(key) && (
                  <button
                    key={key}
                    className={`skin-btn ${bunny.currentSkin === key ? 'active' : ''}`}
                    onClick={() => changeSkin(key)}
                    title={skin.name}
                  >
                    {skin.emoji}
                  </button>
                )
              ))}
            </div>
            <pre className="ascii-bunny" style={{ color: bunnySkins[bunny.currentSkin]?.color || '#ffd93d' }}>
{`
   /\\_/\\  
  ( o.o ) 
   > ^ <   
`}
            </pre>
            {bunny.mood === 'feral' && (
              <div className="feral-overlay">CHAOS</div>
            )}
          </div>

          <div className="stats-section">
            <StatBar label="hunger" value={bunny.hunger} color="#ff6b6b" />
            <StatBar label="happiness" value={bunny.happiness} color="#ffd93d" />
            <StatBar label="chaos" value={bunny.chaos} color="#c44dff" />
            {bunny.estrogenMode && (
              <StatBar label="estrogen" value={bunny.estrogenLevel} color="#f5a9b8" />
            )}
          </div>

          <div className="mood-display">
            mood: <span className={`mood-${bunny.mood}`}>{bunny.mood}</span>
            {bunny.estrogenMode && <span className="estrogen-indicator"> 💖</span>}
          </div>
          
          {/* Stats tracker */}
          <div className="stats-tracker">
            <small>
              fed: {bunny.stats?.timesFed || 0} | 
              pet: {bunny.stats?.timesPet || 0} | 
              annoyed: {bunny.stats?.timesAnnoyed || 0} |
              games: {bunny.stats?.gamesWon || 0}/{bunny.stats?.gamesPlayed || 0}
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
          <button onClick={startMiniGame} className="action-btn game">
            🎮 play
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
