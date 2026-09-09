# 🐇 bunny.exe

> Tamagotchi × shitpost generator × developer companion × chaos engine

A tiny desktop/web app that acts like an unhinged digital bunny living inside your computer.

## Features (v0.1)

- 🐇 ASCII bunny with mood-based appearances
- 📊 Three stats: hunger, happiness, chaos
- 😊 Five moods: suspicious, content, excited, annoyed, feral
- 🎮 Three actions: feed, pet, annoy
- 💬 Random unhinged dialogue
- 💾 Persistent state (survives page refresh!)
- ✨ Animations and CSS effects
- 🔥 FERAL mode when chaos reaches 100%

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

When chaos reaches 80%+, the bunny enters **FERAL MODE**:
- The UI starts shaking
- Buttons bounce around
- The bunny's appearance changes
- Everything gets progressively more unhinged

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

### v0.2 — Make it chaotic
- [ ] 100+ bunny messages
- [ ] Random events
- [ ] Rare "feral" state improvements
- [ ] Particle effects
- [ ] Different bunny outfits
- [ ] Statistics tracking
- [ ] Desktop notifications

### v0.3 — Make it yours
- [ ] Estrogen Mode™ (progressive pink/sparkle overload)
- [ ] Achievements system
- [ ] More fourth-wall breaking
- [ ] Custom bunny names

## Why This Project?

This project teaches:
- JavaScript state management
- React hooks (useState, useEffect)
- localStorage for persistence
- CSS animations
- Component architecture
- Git workflow with meaningful commits

And most importantly: **it's actually fun to work on.**

---

*"why are you coding"* — bunny.exe
