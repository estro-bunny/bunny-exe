# 🐰 EstroBunny_XO OS

Chaos Run + upgrades, skins, skill tree, achievements, terminal, pet bunny. *Still here ♡*

## Run it
```
npm install
npm run dev      # local
npm run build    # outputs dist/
```
Deploy: push to `main`, then in the repo go to Settings → Pages → Source: GitHub Actions.

## Features
Chaos Run (3 playable characters, bosses, power-ups, daily seed, 3 backdrops) · Rhythm (2 songs) · Debug the Bug · Compile clicker · skins · skill tree · achievements · daily streak · terminal · pet bunny

## Tests
`npm test` runs the economy tests (upgrades, skills, skins, clicker, pet, achievements, save format).

## Install it as an app (PWA)
After deploying (needs HTTPS, which GitHub Pages gives you):
- **Android / Chrome / Edge:** menu → Install app
- **iPhone (Safari):** Share → Add to Home Screen
It then runs fullscreen and offline. To ship an update to installed copies, bump `VERSION` in `public/sw.js`.

## Structure
- `src/App.jsx` – header, tab nav and the tab sections
- `src/components/` – migrated tabs (Wisdom, Terminal, Shop, Skills, Awards, Collection, Compile, DebugBug, Rhythm, Game)
- `src/game/chaosRun.js` – the Chaos Run engine
- `src/useSave.js` – hook that re-renders components when the save changes
- `public/manifest.webmanifest`, `public/sw.js`, `public/icons/` – PWA files
- `public/img/` – your art (skins, wallpaper, hero)
- Tailwind is installed and ready for new components

## Architecture
- `src/store.js` – save data (localStorage), economy actions, sound, confetti, achievements
- `src/useSave.js` – hook: re-render when the save changes
- `src/components/` – one component per tab
- `src/game/chaosRun.js` – the Chaos Run engine (plain JS); Debug + Rhythm keep their loops inside their components

## Done
The legacy shell is gone: everything is React. Ideas next: split `store.js` into slices, add tests for the economy actions, move the engines' canvas drawing into smaller modules.
