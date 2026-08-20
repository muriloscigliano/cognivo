# Cognivo Effects & Motion — Portable Usage Guide

> Self-contained reference for using Cognivo's motion & effects layer in **any** project — vanilla HTML, React, Vue, Svelte, Astro, or anything else that renders HTML. Copy this file into your repo and hand it to your team (or your AI coding agent).

**What you get:**

| Piece | Package | What it is |
|---|---|---|
| `<cg-border-beam>` | `@cognivo/components` | Animated light beam traveling around any element's border |
| `<cg-liquid>` + `<cg-liquid-item>` | `@cognivo/components` | Liquid "gooey" effects — blobs that merge, morph, and spring around |
| `<ai-thinking-orb>` | `@cognivo/components` | Canvas dotted "AI is thinking" orb with 9 agent states |
| 14 motion recipes | `@cognivo/tokens/motion.css` | Pure-CSS transition classes (modal, dropdown, text swap, error shake, …) |

Everything is framework-agnostic: the components are Web Components (they work in plain HTML), and the motion recipes are plain CSS classes.

---

## 1. Install

```bash
npm install @cognivo/components @cognivo/tokens
```

```js
// once, at your app entry:
import '@cognivo/tokens';            // design token CSS variables (required)
import '@cognivo/tokens/motion.css'; // the 14 motion recipes (optional)
import '@cognivo/components';        // registers all custom elements
```

Prefer smaller bundles? Import individual components:

```js
import '@cognivo/components/cg-border-beam';
import '@cognivo/components/ai-thinking-orb';
import '@cognivo/components/cg-liquid';
import '@cognivo/components/cg-liquid-item';
```

**Dark/light theme:** tokens are dark-first; set `data-theme="dark"` or `data-theme="light"` on `<html>`. All effects (including the canvas orb) follow the theme automatically.

**Accessibility:** every effect honors `prefers-reduced-motion: reduce` out of the box — beams freeze to a static highlight, springs become instant, the orb renders one static frame, and every motion recipe collapses to opacity-only or none. You don't need to do anything.

---

## 2. `<cg-border-beam>` — traveling border light

Wrap any element. The beam is a non-interactive overlay; clicks pass through.

```html
<cg-border-beam radius="12">
  <div class="card">Featured plan</div>
</cg-border-beam>

<cg-border-beam variant="line" duration="2000" radius="8">
  <button>Upgrade</button>
</cg-border-beam>

<cg-border-beam variant="pulse" radius="16">
  <div class="card">Recording…</div>
</cg-border-beam>
```

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `beam` \| `line` \| `pulse` | `beam` | beam = wide traveling arc; line = thin fast arc; pulse = whole ring breathing |
| `active` | boolean | `true` | Turn the effect on/off (fires events below) |
| `intensity` | number 0–1 | `1` | Beam brightness |
| `duration` | number (ms) | 4000 / 2500 / 2000 | Full cycle per variant |
| `radius` | number (px) | token default | **Match your wrapped element's border-radius** |

### Events

- `cg-border-beam-activate` / `cg-border-beam-deactivate` — fired when `active` flips (bubbles, composed).

### Theming (CSS custom properties)

```css
cg-border-beam {
  --cg-component-border-beam-color: var(--cg-color-action-primary-background-default); /* beam color */
  --cg-component-border-beam-width: 1px;   /* ring thickness */
  --cg-component-border-beam-radius: 12px; /* or use the radius prop */
}
```

**Design guidance:** this engages attentional bias — it makes ONE element the most salient thing on screen. Two beams on one screen cancel each other out.

---

## 3. `<cg-liquid>` + `<cg-liquid-item>` — gooey liquid effects

A dual-layer system: an SVG silhouette layer *behind* your content gets the goo filter (gaussian blur → alpha contrast), so blobs visually merge into one liquid surface while your actual content (text, icons, images) stays perfectly crisp on top.

```html
<cg-liquid blur="8" style="height: 120px;">
  <cg-liquid-item style="width: 56px; height: 56px;">
    <img src="drop.svg" alt="" />
  </cg-liquid-item>
  <cg-liquid-item effect="move" x="70" transition="bouncy" style="width: 56px; height: 56px;">
  </cg-liquid-item>
</cg-liquid>
```

Drive movement from JS/your framework — set `x`/`y`/`scale` and the item springs there, silhouette trailing behind:

```js
const item = document.querySelector('cg-liquid-item');
item.effect = 'move';
item.transition = 'bouncy';
item.x = 120;   // springs to x=120px with a trailing goo blob
```

### `<cg-liquid>` props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `blur` (attr) / `blurRadius` (property) | number | `6` | Goo blur sigma — higher merges blobs from farther apart |
| `contrast` | number | `18` | Alpha contrast slope — higher = crisper liquid edge |
| `fill` | string (CSS color) | card surface token | The liquid's color |

### `<cg-liquid-item>` props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `effect` | `morph` \| `move` | `morph` | morph = breathing blob in place; move = spring translation |
| `x`, `y` | number (px) | `0` | Move target offsets |
| `scale` | number | `1` | Move target scale |
| `transition` | `snappy` \| `smooth` \| `bouncy` | `smooth` | Spring preset (compiled to a CSS `linear()` easing — GPU-composited, zero per-frame JS) |
| `radius` | number (px) | pill shape | Blob corner radius |

**Notes:** items must be direct children of `<cg-liquid>`. Give items explicit sizes. Keep item backgrounds transparent — the liquid surface comes from the silhouette layer.

---

## 4. `<ai-thinking-orb>` — AI agent status orb

A dotted orb drawn on a plain 2D canvas (no WebGL, no SVG filters — identical in Chrome/Safari/Firefox). Deterministic animations; auto-pauses when offscreen or the tab is hidden.

```html
<!-- inline, next to text -->
Working on it <ai-thinking-orb size="sm" state="thinking"></ai-thinking-orb>

<!-- chat avatar -->
<ai-thinking-orb size="lg" state="searching"></ai-thinking-orb>
```

```js
// drive it from your agent loop:
orb.state = 'searching';   // tool call started
orb.state = 'streaming';   // tokens flowing
orb.state = 'done';        // settles to a calm ring
```

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `state` | see below | `thinking` | Unknown values fall back to `thinking` |
| `size` | `sm` \| `md` \| `lg` | `md` | 20 / 40 / 64 px (sm uses a simplified dot layout) |
| `speed` | number | `1` | Animation speed multiplier |
| `paused` | boolean | `false` | Freeze on the current frame |
| `label` | string | per-state | Overrides the accessible label (`role="img"`) |

### The nine states

`thinking` · `searching` · `solving` · `listening` · `connecting` · `streaming` · `composing` · `idle` · `done`

Each has a distinct hand-tuned dot choreography and a default aria-label ("AI is searching", …). Dots use your theme's text color automatically.

---

## 5. Motion recipes — `@cognivo/tokens/motion.css`

Fourteen pure-CSS motion effects. No JS, no components — just classes on your own markup. Convention: **base class = rest state, modifier = trigger**.

| Class | Trigger | Use for |
|---|---|---|
| `cg-motion-card-resize` | (automatic) | Smooth width/height changes on content swap |
| `cg-motion-panel-reveal` | `--open` | Side panel slides + fades from its edge |
| `cg-motion-modal` | `--open` | Dialog scale+fade enter, faster exit |
| `cg-motion-dropdown` | `--open` | Origin-aware menu unfold from the trigger |
| `cg-motion-page-nav` | `--exit` | Route/view enter & exit |
| `cg-motion-text-swap` | `--out` | Outgoing text lifts away, incoming settles |
| `cg-motion-text-reveal` | (on mount) | Clipped line rises into view (child element animates) |
| `cg-motion-number-flip` | `--changed` | Odometer flip for changing values |
| `cg-motion-icon-swap` | `--active` | Cross-fade + quarter-turn between two icons |
| `cg-motion-badge-pop` | (on mount) | Notification badge pops in with overshoot |
| `cg-motion-success-confirm` | (on mount) | Settle-and-glow confirmation |
| `cg-motion-error-shake` | (on mount) | Horizontal refusal shake for invalid input |
| `cg-motion-avatar-group` | `:hover` | Overlapped avatars spread apart |
| `cg-motion-stagger` | (helper) | Per-child delay via `--cg-motion-stagger-index` |

### Examples

**Modal:**
```html
<div class="cg-motion-modal" id="dialog">…</div>
<script>
  dialog.classList.toggle('cg-motion-modal--open', isOpen);
</script>
```

**Error shake (replaying an animation):**
```js
field.classList.remove('cg-motion-error-shake');
void field.offsetWidth;                    // force reflow to restart
field.classList.add('cg-motion-error-shake');
```

**Icon swap (play/pause):**
```html
<button class="cg-motion-icon-swap" id="play">
  <svg><!-- play  --></svg>
  <svg><!-- pause --></svg>
</button>
<script>
  play.addEventListener('click', () => play.classList.toggle('cg-motion-icon-swap--active'));
</script>
```

**Staggered list entrance:**
```html
<ul class="cg-motion-stagger">
  <li class="cg-motion-badge-pop" style="--cg-motion-stagger-index: 0">First</li>
  <li class="cg-motion-badge-pop" style="--cg-motion-stagger-index: 1">Second</li>
  <li class="cg-motion-badge-pop" style="--cg-motion-stagger-index: 2">Third</li>
</ul>
```

### Knobs

Each recipe exposes custom properties (defaults come from Cognivo motion tokens):

```css
.my-panel {
  --cg-motion-panel-reveal-distance: 32px;  /* slide distance */
}
.my-list {
  --cg-motion-stagger-step: 60ms;           /* delay between children */
}
```

Global pacing knobs (set on `:root` to retune everything at once):
`--cg-motion-duration-instant|fast|normal|slow|slower` (0/80/150/250/350 ms) and
`--cg-motion-easing-default|enter|exit|bounce`.

---

## 6. Framework usage

### React

```jsx
// Option A — typed wrappers:
import { CgBorderBeam, AiThinkingOrb, CgLiquid, CgLiquidItem } from '@cognivo/adapter-react';

<CgBorderBeam variant="pulse" radius={12}>
  <Card />
</CgBorderBeam>
<AiThinkingOrb state={agentState} size="md" />

// Option B — direct custom elements (React 19+ handles props natively):
<cg-border-beam variant="beam" radius="12">…</cg-border-beam>

// Motion recipes are just classNames:
<div className={`cg-motion-modal ${open ? 'cg-motion-modal--open' : ''}`}>…</div>
```

### Vue 3

```vue
<script setup>
import { CgBorderBeam, AiThinkingOrb } from '@cognivo/adapter-vue';
// (tell Vue about custom elements if using them directly:
//  app.config.compilerOptions.isCustomElement = tag => tag.startsWith('cg-') || tag.startsWith('ai-'))
</script>

<template>
  <cg-border-beam variant="line" :radius="8"><slot /></cg-border-beam>
  <ai-thinking-orb :state="agentState" size="sm" />
  <div class="cg-motion-dropdown" :class="{ 'cg-motion-dropdown--open': open }">…</div>
</template>
```

### Vanilla / any other framework

Web Components and CSS classes — nothing else to learn. Svelte, Astro, HTMX, Rails: write the tags and classes directly.

---

## 7. Under the hood (for the curious)

- **Border beam:** a conic-gradient rotated via an animated CSS `@property` angle, masked to a ring with the double-mask `mask-composite: exclude` technique. Pulse variants share ONE requestAnimationFrame loop across all instances (~30fps, sleeps when idle).
- **Liquid:** the goo filter is `feGaussianBlur` → `feColorMatrix` alpha contrast, applied only to an SVG silhouette layer so content stays sharp. Springs are sampled from the closed-form damped-oscillator solution into CSS `linear()` easings — spring physics with zero per-frame JavaScript.
- **Thinking orb:** deterministic parametric dot fields (pure functions of state + time), arc fills only, device-pixel-ratio capped at 2, IntersectionObserver-paused.

## 8. Version

Written for `@cognivo/components` ≥ 0.9 and `@cognivo/tokens` ≥ 0.9. MIT-style usage within your projects; see the packages' LICENSE files.
