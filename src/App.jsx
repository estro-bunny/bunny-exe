import { useState, useEffect } from 'react'
import './App.css'

// Random unhinged bunny dialogue
const bunnyMessages = [
  "why are you coding",
  "feed me or i perish",
  "pet me. now.",
  "i've seen things...",
  "do you ever sleep?",
  "i'm watching you code",
  "bunny.exe is running low on RAM",
  "touch grass pls",
  "i exist therefore i am hungry",
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
    }
  }

  const [bunny, setBunny] = useState(loadBunnyState)

  // Save to localStorage whenever bunny changes
  useEffect(() => {
    localStorage.setItem('bunnyState', JSON.stringify(bunny))
  }, [bunny])

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

  const getRandomMessage = () => {
    return bunnyMessages[Math.floor(Math.random() * bunnyMessages.length)]
  }

  const feedBunny = () => {
    setBunny(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 20),
      happiness: Math.min(100, prev.happiness + 5),
      chaos: Math.min(100, prev.chaos + 2),
      message: prev.hunger > 80 ? "FINALLY. SOME FOOD." : "nom nom nom",
      lastInteraction: Date.now(),
    }))
  }

  const petBunny = () => {
    setBunny(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      chaos: Math.min(100, prev.chaos + 5),
      message: prev.mood === 'feral' ? "DON'T TOUCH ME" : "*bunny noises*",
      lastInteraction: Date.now(),
    }))
  }

  const annoyBunny = () => {
    setBunny(prev => ({
      ...prev,
      happiness: Math.max(0, prev.happiness - 10),
      chaos: Math.min(100, prev.chaos + 15),
      message: getRandomMessage(),
      lastInteraction: Date.now(),
    }))
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

  return (
    <div className={`app ${bunny.mood === 'feral' ? 'feral-mode' : ''}`}>
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
      </div>
    </div>
  )
}

export default App
