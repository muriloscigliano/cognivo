# Motion & Effects Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 4 original effect components (`cg-border-beam`, `cg-liquid`, `cg-liquid-item`, `ai-thinking-orb`), a pure-CSS motion recipe layer (`@cognivo/tokens/motion.css`), full registration/tests/docs, and a portable `docs/EFFECTS-AND-MOTION.md` report.

**Spec:** `docs/superpowers/specs/2026-08-20-motion-effects-suite-design.md`

**Architecture:** Components follow the single-file Lit-3 pattern in `packages/components/src/components/<tag>/<tag>.ts` with pure-TS engines in `src/utils/` (pulse-driver, spring, orb-renderer). Motion recipes are hand-authored CSS at `packages/tokens/css/motion.css`, copied to `dist/` by a new build step, built entirely on EXISTING `--cg-motion-*` / `--cg-transition-*` / `--cg-spacing-*` tokens (no new tier-1 tokens).

**Tech Stack:** Lit 3, TypeScript strict (exactOptionalPropertyTypes — never assign `undefined` to optional props), Vitest + happy-dom, Style Dictionary v4 tokens pipeline, zod (gen-ui defs).

---

## Registration checklist (applies to EVERY new component — Tasks 2, 4, 6)

| # | File | Change |
|---|---|---|
| 1 | `packages/components/src/components/<tag>/<tag>.ts` | component |
| 2 | `packages/components/src/index.ts` | named import + name in export block under a NEW comment `// ── Wave 12: Motion & Effects ──` (wave comment feeds MCP catalog; regex needs `Wave \d+`) |
| 3 | `packages/components/src/foundation.ts` (cg-*) or `ai.ts` (ai-*) | `export * from './components/<tag>/<tag>.js';` appended in a new `// ── Motion & Effects ──` block |
| 4 | `packages/components/src/__tests__/<tag>.test.ts` | tests (guard `if (!customElements.get(tag)) customElements.define(...)`) |
| 5 | `packages/gen-ui/src/cognivo-library.ts` | `defineComponent` export + entry in `ALL_COMPONENTS` + name in a `componentGroups` entry (else 'Ungrouped') + bump the "196 components" header comment |
| 6 | `packages/adapter-react/src/components/<Pascal>.ts` + `src/index.ts` export | `createWrapper('<tag>', [props], {})` |
| 7 | `packages/adapter-vue/src/components/<Pascal>.ts` + `src/index.ts` export | `createVueWrapper('<tag>', {props}, {})` — gated by `node scripts/check-vue-coverage.mjs` |

gen-ui `name` convention: drop `Cg` prefix (`BorderBeam`, `Liquid`, `LiquidItem`), keep `Ai` (`AiThinkingOrb`).
Parity gate: `cd packages/gen-ui && pnpm vitest run src/__tests__/registry-parity.test.ts` — a component directory without a gen-ui registration FAILS CI (empty ALLOWLIST).

Per-task quality gates (run after every task):
```bash
cd packages/components && pnpm vitest run src/__tests__/<new>.test.ts
pnpm --filter @cognivo/components type-check || pnpm type-check
pnpm lint
```

---

### Task 1: `pulse-driver.ts` + `cg-border-beam` tokens

**Files:**
- Create: `packages/components/src/utils/pulse-driver.ts`
- Modify: `packages/tokens/tier3-component/components.json` (auto-globbed — just edit)
- Test: `packages/components/src/__tests__/pulse-driver.test.ts`

- [ ] **Step 1:** Add tier-3 tokens to `tier3-component/components.json` under the top-level `component` object:

```json
"border-beam": {
  "color": { "$type": "color", "$value": "{color.action.primary.background.default}" },
  "width": { "$type": "dimension", "$value": "{border.width.100}" },
  "radius": { "$type": "dimension", "$value": "{border.radius.200}" }
}
```
(Verify ref paths against existing entries in the same file before committing — reuse whatever path `--cg-color-action-primary-background-default` and `--cg-component-card-radius` already use.)

- [ ] **Step 2:** `pnpm --filter @cognivo/tokens build` then `grep "component-border-beam" packages/tokens/dist/index.css` → expect 3 vars.

- [ ] **Step 3:** Write failing test `pulse-driver.test.ts`: subscribing schedules rAF; callback receives monotonic phase 0..1; unsubscribe stops callbacks; loop sleeps (no rAF scheduled) when 0 subscribers. Stub `requestAnimationFrame`/`performance.now` with vi.fn timers.

- [ ] **Step 4:** Implement `pulse-driver.ts`:

```ts
export interface PulseSubscriber { (phase: number): void }
// module-level: subscribers Set, single rAF loop, ~30fps frame gate
// (skip frame if now - last < 33ms), phase = (now / periodMs) % 1 per subscriber period.
export function subscribePulse(periodMs: number, cb: PulseSubscriber): () => void
```
Loop starts on first subscribe, cancels rAF when the set empties. No Date.now in tests — inject `now` via performance.now stub.

- [ ] **Step 5:** Run test → PASS. Commit: `feat(components): shared pulse rAF driver + border-beam tier-3 tokens`.

### Task 2: `cg-border-beam`

**Files:**
- Create: `packages/components/src/components/cg-border-beam/cg-border-beam.ts`
- Modify: `index.ts`, `foundation.ts`, gen-ui `cognivo-library.ts`, both adapters (per checklist)
- Test: `packages/components/src/__tests__/cg-border-beam.test.ts`

- [ ] **Step 1:** Failing tests: renders shadow root + `.beam` overlay; slot renders content; `variant` reflects (`beam`|`line`|`pulse`, default `beam`); `active` default true, setting false adds `.idle` class and fires `cg-border-beam-deactivate`; `duration` sets `--cg-beam-duration` inline style; `intensity` clamps to [0,1]; pulse variant subscribes/unsubscribes pulse-driver on connect/disconnect (spy on module).

- [ ] **Step 2:** Implement. Key CSS (all tokens, structure per `templates/component.template.ts`):

```css
:host { display: inline-block; position: relative; }
@property --cg-beam-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.beam {
  position: absolute; inset: 0; pointer-events: none;
  border-radius: var(--cg-component-border-beam-radius);
  padding: var(--cg-component-border-beam-width);
  background: conic-gradient(from var(--cg-beam-angle),
    transparent 0%, var(--cg-component-border-beam-color) 12%, transparent 24%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: beam-rotate var(--cg-beam-duration, 4s) linear infinite;
  opacity: var(--cg-beam-intensity, 1);
}
@keyframes beam-rotate { to { --cg-beam-angle: 360deg; } }
/* line variant: thinner arc (4% band); pulse variant: no rotation, opacity driven by pulse-driver via --cg-beam-pulse */
@media (prefers-reduced-motion: reduce) { .beam { animation: none; } }
```
Props: `variant` (reflect), `active` (Boolean reflect), `duration` (Number ms), `intensity` (Number), `radius` (Number px → inline `--cg-component-border-beam-radius`). Events `cg-border-beam-activate`/`-deactivate` (bubbles, composed) on `active` change. Pulse subscription in `updated()` keyed on `variant`/`active`; teardown in `disconnectedCallback`.

- [ ] **Step 3:** Tests PASS. **Step 4:** Full registration per checklist (gen-ui def with `biasHints: ['attentional-bias']` — verify id exists in design-advisor, else use the closest real id via `grep -r "salience\|attentional" packages/design-advisor/src`). **Step 5:** parity test + type-check + lint PASS. Commit.

### Task 3: `orb-renderer.ts` (pure engine)

**Files:**
- Create: `packages/components/src/utils/orb-renderer.ts`
- Test: `packages/components/src/__tests__/orb-renderer.test.ts`

- [ ] **Step 1:** Failing tests: `ORB_STATES` has the 9 states; `computeOrbDots(state, t, sizePx)` returns dots `{x, y, r, alpha}[]` all within `[0, sizePx]` bounds and alpha [0,1] for every state at t = 0, 0.25, 0.7, 3.9; deterministic (same t → same dots); `sm` layout (≤24px) returns ≤8 dots, `lg` returns ≥16; `done` state converges (dots at t=10 ≈ dots at t=11).

- [ ] **Step 2:** Implement. Pure math, no canvas dependency:

```ts
export const ORB_STATES = ['thinking','searching','solving','listening','connecting','streaming','composing','idle','done'] as const;
export type OrbState = typeof ORB_STATES[number];
export interface OrbDot { x: number; y: number; r: number; alpha: number }
export function computeOrbDots(state: OrbState, t: number, sizePx: number): OrbDot[]
export function drawOrbFrame(ctx: CanvasRenderingContext2D, dots: OrbDot[], color: string, dpr: number): void
export const ORB_STATE_LABELS: Record<OrbState, string>  // aria-label defaults
```
Each state = parametric dot field (rings/spirals/waves) using sin/cos of `t` with per-state frequency/phase constants. Pseudo-random jitter via deterministic hash of dot index (no Math.random). `drawOrbFrame` = clear + arc fills only.

- [ ] **Step 3:** PASS, commit: `feat(components): deterministic orb-renderer engine (9 agent states)`.

### Task 4: `ai-thinking-orb`

**Files:**
- Create: `packages/components/src/components/ai-thinking-orb/ai-thinking-orb.ts`
- Modify: registration checklist files (`ai.ts` barrel)
- Test: `packages/components/src/__tests__/ai-thinking-orb.test.ts`

- [ ] **Step 1:** Failing tests: renders `<canvas role="img">`; default state `thinking` with matching aria-label from `ORB_STATE_LABELS`; `label` prop overrides aria-label; `size` reflects and sets canvas CSS px (sm 20 / md 40 / lg 64); `paused=true` stops the rAF loop (spy rAF); invalid `state` falls back to `thinking`; disconnect cancels rAF; reduced-motion (stub `matchMedia`) renders exactly one frame.

- [ ] **Step 2:** Implement: rAF loop advancing `t += dt * speed`; DPR = `Math.min(devicePixelRatio, 2)`; color resolved via `getComputedStyle(this).getPropertyValue('--cg-color-surface-base-text')` once per (re)start and on `data-theme` mutation (MutationObserver on `document.documentElement`, disconnect on teardown); `IntersectionObserver` + `visibilitychange` pause (guard both for happy-dom absence: `typeof IntersectionObserver !== 'undefined'`). Canvas kept in shadow root; host CSS token-only.

- [ ] **Step 3:** PASS. **Step 4:** registration per checklist — gen-ui def `AiThinkingOrbDef`, props `z.object({ state: z.enum([...ORB_STATES]).optional(), size: z.enum(['sm','md','lg']).optional(), speed: z.number().optional(), paused: z.boolean().optional(), label: z.string().optional() })`, `biasHints: ['labor-illusion']` (verify id), group `AI-Native`. **Step 5:** gates PASS, commit.

### Task 5: `spring.ts` (pure engine)

**Files:**
- Create: `packages/components/src/utils/spring.ts`
- Test: `packages/components/src/__tests__/spring.test.ts`

- [ ] **Step 1:** Failing tests: `springToLinearEasing(preset)` returns `{ easing: string, durationMs: number }`; easing matches `/^linear\((-?[\d.]+%?( -?[\d.]+%)?(, )?)+\)$/`-ish shape (starts `linear(0`, ends `1)`); first sample 0, last sample 1; `bouncy` overshoots (some sample > 1), `smooth` never exceeds 1.001; durations positive and preset-distinct.

- [ ] **Step 2:** Implement closed-form damped harmonic oscillator:

```ts
export type SpringPreset = 'snappy' | 'smooth' | 'bouncy';
export interface SpringConfig { stiffness: number; damping: number; mass?: number }
export const SPRING_PRESETS: Record<SpringPreset, SpringConfig> = {
  snappy: { stiffness: 300, damping: 24 },
  smooth: { stiffness: 170, damping: 26 },
  bouncy: { stiffness: 220, damping: 12 },
};
export function sampleSpring(cfg: SpringConfig, tSec: number): number  // closed-form under/critically-damped solution, x0=1→0, returns 1 - x
export function springDurationMs(cfg: SpringConfig): number            // time to settle within 0.001
export function springToLinearEasing(preset: SpringPreset | SpringConfig, samples = 32): { easing: string; durationMs: number }
```

- [ ] **Step 3:** PASS, commit.

### Task 6: `cg-liquid` + `cg-liquid-item`

**Files:**
- Create: `packages/components/src/components/cg-liquid/cg-liquid.ts`, `packages/components/src/components/cg-liquid-item/cg-liquid-item.ts`
- Modify: registration checklist files (both components)
- Test: `packages/components/src/__tests__/cg-liquid.test.ts`, `cg-liquid-item.test.ts`

- [ ] **Step 1:** Failing tests — group: renders SVG layer with `<filter>` containing feGaussianBlur (stdDeviation = `blur` prop, default 6) and feColorMatrix (alpha row from `contrast`, default 18); empty state hides SVG; registering 2 items yields 2 blob rects; item removal removes its blob. Item: registers with closest `cg-liquid` on connect, unregisters on disconnect; `effect` reflects (default `morph`); `x/y/scale` produce a translate/scale transform with `linear(...)` easing + duration from `transition` preset (default `smooth`); orphan item (no group ancestor) doesn't throw.

- [ ] **Step 2:** Implement group: default slot; `<svg class="goo" aria-hidden="true">` absolutely positioned behind (`z-index` via stacking: svg first, slot content `position: relative`). Filter:

```
<feGaussianBlur in="SourceGraphic" stdDeviation="${blur}"/>
<feColorMatrix mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${-(contrast - 1) / 2}"/>
```
Use Lit `svg` template (NEVER `html` — known invisible-icon bug). Item registration API: group exposes `_registerItem(item)/_unregisterItem(item)`; item finds group via `this.closest('cg-liquid')`. Rect sync: `ResizeObserver` on each item + group; blob rect = item offset within group (offsetLeft/Top fallback for happy-dom), `rx` from item `radius` prop or computed border-radius. Morph: CSS animation on blob (`rx`/transform scale oscillation, honoring reduced-motion). Move: item sets `transition: transform <duration>ms <linearEasing>` from `spring.ts` and `transform: translate(x,y) scale(s)`; group mirrors on `transitionrun`/rAF sync (happy-dom: assert style strings only). Fill defaults `var(--cg-color-surface-cards-background)`.

- [ ] **Step 3:** PASS. **Step 4:** register BOTH components per checklist (`LiquidDef`, `LiquidItemDef`; group `Foundation` or `Utilities`; biasHints `['aesthetic-usability-effect']` — verify id). **Step 5:** gates PASS, commit.

### Task 7: `motion.css` recipe layer

**Files:**
- Create: `packages/tokens/css/motion.css`, `packages/tokens/scripts/copy-static.mjs`
- Modify: `packages/tokens/package.json` (build script chain + `"./motion.css": "./dist/motion.css"` export)
- Test: `packages/tokens/__tests__/motion-css.test.mjs` (node --test, matching existing suite runner)

- [ ] **Step 1:** Failing test (node:test): reads `css/motion.css` as text; asserts (a) every `.cg-motion-<name>` recipe block has a matching rule inside ONE `@media (prefers-reduced-motion: reduce)` section, (b) `transition: all` absent, (c) no raw hex colors, (d) all 14 recipe class names present, (e) every `var(--cg-` reference that isn't `--cg-motion-<recipe>-*` knob exists in `dist/index.css`.

- [ ] **Step 2:** Author the 14 recipes. Convention per recipe: base class + `--open`/`--active` modifier, knobs as `--cg-motion-<recipe>-*` custom props defaulting to existing tokens. Recipes: `card-resize`, `panel-reveal`, `modal`, `dropdown`, `page-nav`, `text-swap`, `text-reveal`, `number-flip`, `icon-swap`, `badge-pop`, `success-confirm`, `error-shake`, `avatar-group`, plus `stagger` helper (`--cg-motion-stagger-index`). Durations/easings ONLY from `--cg-motion-duration-{instant,fast,normal,slow,slower}` and `--cg-motion-easing-{default,enter,exit,bounce}` (already shipped, tier-2); distances default to `--cg-spacing-*`. Every recipe gets a reduced-motion collapse (opacity-only or none).

- [ ] **Step 3:** `copy-static.mjs`: `fs.cpSync(css/motion.css → dist/motion.css)`; chain into `"build"` after `build.js` (before manifest, order irrelevant but keep validate last). Add export. Update `test` script to also run the new test file.

- [ ] **Step 4:** `pnpm --filter @cognivo/tokens build && pnpm --filter @cognivo/tokens test` → PASS (contrast validator unaffected). Commit.

### Task 8: Docs pages + portable report + changeset

**Files:**
- Create: `docs/src/pages/components/border-beam.astro`, `docs/src/pages/components/liquid.astro`, `docs/src/pages/components/thinking-orb.astro`, `docs/src/pages/patterns/motion.astro` (copy frontmatter/layout from an existing page in each dir)
- Create: `docs/EFFECTS-AND-MOTION.md` (the portable report)
- Create: `.changeset/motion-effects-suite.md` (minor: components, tokens, gen-ui, adapter-react, adapter-vue — check linked-group config first per changesets memory)

- [ ] **Step 1:** Docs pages with live demos (mirror the structure of an existing component page — check `docs/src/pages/components/` for the established layout import).
- [ ] **Step 2:** Write `EFFECTS-AND-MOTION.md`, fully self-contained: install, per-component API tables (props/events/tokens/a11y), all 14 recipe snippets copy-pasteable, vanilla/React/Vue examples, theming notes. No repo-internal links.
- [ ] **Step 3:** Changeset (minor bumps). Run full gates: `pnpm build && pnpm test && pnpm type-check && pnpm lint && node scripts/check-vue-coverage.mjs`. Commit.

---

## Self-review notes
- Spec coverage: §1→T1-2, §2→T5-6, §3→T3-4, §4→T7, §5→checklist in T2/4/6, §6→per-task tests, §7→T8. Waves reordered (orb before liquid) — orb is independent; liquid depends on spring.
- Bias ids in `biasHints` MUST be verified against design-advisor's real card ids before use — treat the ids above as candidates, not facts.
- exactOptionalPropertyTypes: never pass `{ foo: undefined }` — omit keys (spread-conditional pattern used in lens-core is the house style).
- happy-dom: no real layout/canvas — engine tests are pure-math; component tests assert wiring, styles, attributes, events only. Focus via `focus()`+`activeElement` if needed.
