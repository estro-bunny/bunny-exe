# 🐇 bunny.exe

> **Tamagotchi × shitpost generator × developer companion × chaos engine**

A tiny web app that acts like an unhinged digital bunny living inside your browser. It has a personality, reacts to what you're doing, and gets progressively gayer the more you interact with it.

![EstroBunny](https://img.shields.io/badge/EstroBunny-chaos-orange) ![License](https://img.shields.io/badge/license-MIT-green) ![Version](https://img.shields.io/badge/version-v0.4-blue)

---

## ✨ Features (v0.4 Desktop Companion Edition)

### Core Loop
- **3 Stats**: Hunger, Happiness, Chaos (all decay over time)
- **5 Moods**: Suspicious, Content, Excited, Annoyed, FERAL
- **4 Actions**: Feed 🥕, Pet 💕, Annoy 😈, Play Mini-game 🎮
- **Persistent State**: Bunny survives page refreshes via localStorage
- **Random Events**: 10% chance every 30s of spontaneous chaos
- **200+ Messages**: Existential dread, food demands, dev humor, and unhinged commentary

### 🏳️‍⚧️ Estrogen Mode™
Toggle the trans flag button to activate:
- Progressive pink → white → blue background shifts
- Sparkle particle effects
- Rainbow glow at maximum estrogen
- Heart-beat indicator and spinning flag animation
- Unlocks special skins and achievements

### 🎮 Mini-Games
- **Programming Trivia**: 8 questions, multiple choice
- Win 5 games to unlock the **Hacker Skin** 💻
- Tracks wins/play count in lifetime stats

### 🎨 7 Unlockable Skins
| Skin | How to Unlock |
|------|---------------|
| 🐇 Default | Start game |
| 🐰 Pink Princess | Reach 50% Estrogen |
| 🏳️‍⚧️ Pride Bunny | Reach 100% Estrogen |
| 👹 FERAL | Reach 100% Chaos |
| 💻 Hacker | Win 5 trivia games |
| 😴 Sleepy | Idle for 1 hour (future) |
| 🌈 Rainbow | Unlock all achievements (future) |

### 🏆 Achievements System
- **First Feeding** - You fed the creature
- **Pretty in Pink** - Reached 50% estrogen
- **Pride Bunny** - Maxed out estrogen mode
- **Hacker Unlocked** - Won 5 trivia games
- **Well Fed** - Fed bunny 50 times
- **Pet Master** - Petted bunny 100 times
- **Chaos Agent** - Annoyed bunny 25 times
- **Touch Grass** - Opened app after 6 hours away
- **Terminally Online** - Opened app 47 times in one day
- **Digital Parenting** - Keep alive for 24 hours (future)

### 📊 Lifetime Stats
Tracks everything:
- Total feeds, pets, annoys
- Games played/won
- Current session time
- Max chaos reached
- Total play sessions
- Time since first adoption

### 🔔 Desktop Notifications
- Browser notifications when bunny is hungry and tab is inactive
- Rate-limited to 1 per minute to avoid spam
- Permission requested on first interaction

### 💫 Visual Effects
- Emoji particle explosions on every interaction
- Screen shake on high chaos
- Color bursts matching mood
- CSS animations go "completely fucking stupid" in FERAL mode
- Trans flag colors and sparkles in Estrogen Mode™

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/bunny-exe.git
cd bunny-exe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.

---

## 🎮 How to Play

1. **Keep stats balanced**: Hunger, happiness, and chaos all decay over time
2. **Interact often**: Feed, pet, annoy, or play games
3. **Watch the mood**: Different actions affect different stats
4. **Unlock skins**: Reach milestones to change bunny appearance
5. **Go FERAL**: Let chaos hit 100% for maximum destruction
6. **Enable Estrogen Mode**: Click 🏳️‍⚧️ for progressive gay transformation

### Stat Effects
| Action | Hunger | Happiness | Chaos |
|--------|--------|-----------|-------|
| Feed 🥕 | +25 | +5 | -5 |
| Pet 💕 | -5 | +20 | -10 |
| Annoy 😈 | -10 | -15 | +25 |
| Win Game 🎮 | -5 | +30 | +10 |

---

## 🛠️ Tech Stack

- **React 18** - UI components and state management
- **Vite** - Blazing fast build tool
- **CSS3 Animations** - Shake, bounce, pulse, rainbow effects
- **LocalStorage API** - Persistent bunny state
- **Notification API** - Desktop alerts
- **Zero external dependencies** - Pure React + CSS

---

## 📂 Project Structure

```
bunny-exe/
├── src/
│   ├── App.jsx          # Main bunny logic, state, interactions
│   ├── App.css          # All styles, animations, themes
│   └── main.jsx         # React entry point
├── dist/                # Production build output
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

---

## 🗺️ Roadmap

### ✅ v0.1 - Core Loop (DONE)
- [x] Basic bunny with ASCII art
- [x] 3 stats system
- [x] Mood system
- [x] Random dialogue
- [x] LocalStorage persistence
- [x] Basic animations

### ✅ v0.2 - Chaos Engine (DONE)
- [x] 100+ messages
- [x] Achievement system
- [x] Particle effects
- [x] Random events
- [x] Enhanced FERAL mode
- [x] Lifetime stats

### ✅ v0.3 - Estrogen Edition (DONE)
- [x] Estrogen Mode™ toggle
- [x] Trans theme colors
- [x] Unlockable skins (7 total)
- [x] Mini-game system
- [x] Desktop notifications
- [x] 10+ achievements

### ✅ v0.4 - Desktop Companion (DONE)
- [x] Browser notification API integration
- [x] Programming trivia mini-games
- [x] 200+ bunny messages
- [x] Enhanced stat tracking
- [x] Session persistence improvements
- [x] Skin unlock conditions
- [x] Enhanced visual effects

### 🔜 v0.5 - Future Chaos
- [ ] Sleepy skin (1 hour idle)
- [ ] Rainbow skin (all achievements)
- [ ] Custom bunny names
- [ ] Sound effects / audio
- [ ] Multiple bunnies
- [ ] Seasonal events
- [ ] Bunny house customization
- [ ] Rainbow skin (all achievements)
- [ ] 24-hour survival achievement
- [ ] Custom bunny naming
- [ ] Sound effects toggle
- [ ] More mini-games
- [ ] Bunny house customization
- [ ] Photo mode
- [ ] Shareable chaos reports

---

## 🎨 Design Philosophy

> "Don't start by asking an AI to build the whole thing. Build it step by step, commit after every meaningful step, and end up with something that actually feels like you."

This project was built intentionally:
1. Create React project
2. Make Bunny component
3. Add stats
4. Add buttons
5. Add state changes
6. Add random dialogue
7. Save state
8. Animate it
9. Make it progressively more unhinged

Each commit represents a learnable chunk:
```bash
git commit -m "feat: add bunny"
git commit -m "feat: add mood system"
git commit -m "feat: add random dialogue"
git commit -m "feat: persist bunny state"
git commit -m "feat: add chaos mode"
git commit -m "feat: add Estrogen Mode™"
git commit -m "feat: add mini-games and skins"
```

---

## 📄 License

MIT License - feel free to fork, modify, and make your own chaotic bunny! See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Want to make it even more chaotic?

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/more-chaos`)
3. Commit your changes (`git commit -m 'feat: add more chaos'`)
4. Push to the branch (`git push origin feature/more-chaos`)
5. Open a Pull Request

**Guidelines:**
- Keep it small enough to finish
- Keep it weird enough to be fun
- Keep it technically varied to learn something

---

## 📄 License

MIT License - do whatever you want with this chaos

---

## 🙏 Acknowledgments

Inspired by:
- Tamagotchi virtual pets
- Shitpost Twitter
- Developer burnout culture
- The need for something silly in a serious world

---

<div align="center">

**Made with 🩷🤍💙 and excessive amounts of chaos**

*"why are you coding"* - bunny.exe, probably

</div>
