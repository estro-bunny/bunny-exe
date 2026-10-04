import test from 'node:test'
import assert from 'node:assert/strict'

// Minimal browser stand-ins so store.js can load under node.
const mem = {}
globalThis.localStorage = { getItem: (k) => mem[k] ?? null, setItem: (k, v) => { mem[k] = v } }
globalThis.window = { addEventListener() {} }
globalThis.document = { getElementById: () => null }
globalThis.confirm = () => true
globalThis.innerWidth = 800
globalThis.innerHeight = 600

const { E, ACH, rollDay } = await import('../src/store.js')
const fresh = () => { E.resetAll() }

test('upgrade costs scale with level and spend hearts', () => {
  fresh(); E.SV.w = 100
  E.buy('life', 60, 4)               // level 0 -> 1 costs 60
  assert.equal(E.SV.U.life, 1); assert.equal(E.SV.w, 40)
  E.buy('life', 120, 4)              // can't afford level 2
  assert.equal(E.SV.U.life, 1); assert.equal(E.SV.w, 40)
})

test('upgrades stop at max level', () => {
  fresh(); E.SV.w = 1e6; E.SV.U.mag = 4
  E.buy('mag', 50, 4)
  assert.equal(E.SV.U.mag, 4)
})

test('skills unlock once and cost hearts', () => {
  fresh(); E.SV.w = 100
  E.bsk('cpp', 40)
  assert.deepEqual(E.SV.sk2, ['cpp']); assert.equal(E.SV.w, 60)
})

test('skins: buy, then equip owned skin for free', () => {
  fresh(); E.SV.w = 100
  E.skin(2, 70)
  assert.equal(E.SV.skin, 2); assert.equal(E.SV.w, 30); assert.ok(E.SV.sk.includes(2))
  E.skin(0, 0)
  assert.equal(E.SV.skin, 0); assert.equal(E.SV.w, 30)
  E.skin(5, 175)                     // too expensive: nothing changes
  assert.equal(E.SV.skin, 0); assert.ok(!E.SV.sk.includes(5))
})

test('generators cost lines of code and raise lines/sec', () => {
  fresh(); E.SV.loc = 20
  E.bg(0, 15)
  assert.equal(E.SV.gen[0], 1); assert.equal(E.SV.loc, 5); assert.equal(E.lps(), 1)
  E.bg(0, 20)                        // not enough lines
  assert.equal(E.SV.gen[0], 1)
})

test('feeding the pet costs 5 hearts and resets hunger', () => {
  fresh(); E.SV.w = 5; E.SV.fed = Date.now() - 6000 * 90
  const before = E.mood()
  globalThis.document = { getElementById: () => null, createElement: () => ({ style: { setProperty() {} }, remove() {} }), body: { appendChild() {} } }
  E.pet({ clientX: 0, clientY: 0 }, 1)
  assert.equal(E.SV.w, 0); assert.ok(E.mood() > before)
})

test('achievements unlock from save data', () => {
  fresh()
  const first = ACH.find((a) => a[0] === 'first')
  assert.equal(first[3](), false)
  E.SV.runs = 1
  assert.equal(first[3](), true)
})

test('save survives a reload and fills missing fields', () => {
  fresh(); E.SV.w = 42; E.save()
  const raw = JSON.parse(mem.ebx_v2)
  assert.equal(raw.w, 42)
  assert.ok(Array.isArray(raw.sk2) && Array.isArray(raw.ach) && raw.gen.length === 4)
})

test('daily streak: same day pays once, next day continues, a gap resets', () => {
  const s = { day: '', streak: 0, w: 0 }
  assert.equal(rollDay(s, '2026-10-04'), 7); assert.equal(s.streak, 1)
  assert.equal(rollDay(s, '2026-10-04'), 0); assert.equal(s.w, 7)
  assert.equal(rollDay(s, '2026-10-05'), 9); assert.equal(s.streak, 2)
  assert.equal(rollDay(s, '2026-10-08'), 7); assert.equal(s.streak, 1)
})

test('streak reward is capped at 30', () => {
  const s = { day: '2026-12-31', streak: 40, w: 0 }
  assert.equal(rollDay(s, '2027-01-01'), 30); assert.equal(s.streak, 41)  // also crosses a year boundary
})

test('backdrops: buy once, then switch freely', () => {
  fresh(); E.SV.w = 150
  E.theme(1, 120)
  assert.equal(E.SV.theme, 1); assert.equal(E.SV.w, 30)
  E.theme(0, 0); E.theme(1, 120)
  assert.equal(E.SV.theme, 1); assert.equal(E.SV.w, 30)
  E.theme(2, 200)                    // too expensive
  assert.equal(E.SV.theme, 1); assert.ok(!E.SV.themes.includes(2))
})

test('characters: buy, switch, and cannot afford', () => {
  fresh(); E.SV.w = 160
  E.char(1, 150)
  assert.equal(E.SV.char, 1); assert.equal(E.SV.w, 10); assert.ok(E.SV.chars.includes(1))
  E.char(0, 0); assert.equal(E.SV.char, 0)
  E.char(2, 250); assert.equal(E.SV.char, 0); assert.ok(!E.SV.chars.includes(2))
})
