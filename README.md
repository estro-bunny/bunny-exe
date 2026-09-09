# 🐇 bunny.exe

> Tamagotchi × shitpost generator × developer companion × chaos engine

A tiny desktop/web app that acts like an unhinged digital bunny living inside your computer.

## Features (v0.2)

- 🐇 ASCII bunny with mood-based appearances
- 📊 Three stats: hunger, happiness, chaos
- 😊 Five moods: suspicious, content, excited, annoyed, feral
- 🎮 Three actions: feed, pet, annoy
- 💬 **100+ unhinged bunny messages** (categorized by topic!)
- 💾 Persistent state (survives page refresh!)
- ✨ Animations and CSS effects
- 🔥 FERAL mode when chaos reaches 100%
- 🎉 **Particle effects** on interactions
- 🏆 **Achievements system** with popup notifications
- 📈 **Stats tracking** (times fed, pet, annoyed)
- 🎲 **Random events** every 30 seconds
- 📜 **Recent achievements** display

## Tech Stack

- **React** - Components, hooks, state management
- **Vite** - Blazing fast build tool
- **CSS** - Animations, responsive UI, ridiculous styling
- **localStorage** - Bunny persistence between sessions

## Getting Started

```bash
npm install
npm run dev
```

## How to Play

1. **Feed** the bunny (🥕) - Increases hunger, slightly increases happiness
2. **Pet** the bunny (💕) - Increases happiness, slightly increases chaos
3. **Annoy** the bunny (😈) - Decreases happiness, significantly increases chaos

Stats decay over time, so check back regularly!

When chaos reaches 100%, the bunny enters **FERAL MODE**:
- The UI starts shaking violently
- Buttons bounce around
- The bunny's appearance changes (red glitching ASCII)
- Everything gets progressively more unhinged

## Achievements

Unlock these by playing:

| Achievement | How to Unlock |
|-------------|---------------|
| 🏆 First Feeding | Feed the bunny for the first time |
| 🏆 Touch Grass | Open the app after 6 hours of inactivity |
| 🏆 Terminally Online | Open the app 47 times in one day |
| 🏆 FERAL | Reach 100% chaos |
| 🏆 Digital Parenting | Keep bunny alive for 24 hours |
| 🏆 Girl, What Are You Doing? | Change CSS at 3:17 AM (manual) |

## Message Categories

The bunny has 100+ messages organized by theme:

- **Existential dread** - "what is my purpose"
- **Food demands** - "carrot. now."
- **Affection demands** - "pet me. now."
- **Developer humor** - "npm install feelings"
- **Passive aggressive** - "your code smells but i love you"
- **Meta commentary** - "localStorage won't save you"
- **Chaos energy** - "entropy increases"
- **Rare gems** - "i've calculated the meaning of life: 42 carrots"

## Random Events

Every 30 seconds, there's a 10% chance of a random event:

- "*bunny sneezes confetti*" 🎉
- "*bunny does a backflip*" ✨
- "*bunny steals 1% of your RAM*"
- And more!

## Project Structure

```
bunny-exe/
├── src/
│   ├── App.jsx      # Main bunny logic & component
│   ├── App.css      # All the styles & animations
│   └── main.jsx     # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Roadmap (Future Versions)

### v0.3 — Make it yours
- [ ] Estrogen Mode™ (progressive pink/sparkle overload as happiness increases)
- [ ] More achievements (20+ total)
- [ ] Custom bunny names
- [ ] Different bunny outfits/skins
- [ ] Desktop notifications
- [ ] Statistics dashboard
- [ ] Sound effects (optional)
- [ ] Mobile responsive improvements

### v1.0 — Peak chaos
- [ ] Multiple bunnies
- [ ] Bunny breeding (god help us)
- [ ] Mini-games
- [ ] Plugin system
- [ ] Shareable achievement cards

## Why This Project?

This project teaches:
- JavaScript state management
- React hooks (useState, useEffect)
- localStorage for persistence
- CSS animations and keyframes
- Component architecture
- Event handling
- Git workflow with meaningful commits

And most importantly: **it's actually fun to work on.**

---

*Current Version: v0.2*

*"why are you coding"* — bunny.exe
