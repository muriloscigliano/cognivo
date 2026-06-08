## ai-audio-player — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | animation duration | `var(--cg-transition-duration-fast)` | Yes | — |
| 28 | animation easing | `var(--cg-transition-easing-ease-out)` | Yes | — |
| 35 | gap | `var(--cg-spacing-12)` | Yes | — |
| 36 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 37 | background | `var(--cg-color-surface-container-background)` | Yes | tier-2 surface, correct |
| 38 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 39 | border-radius | `var(--cg-border-radius-150)` | Yes | tier-1 radius acceptable; no tier-3 audio token exists |
| 43–44 | width/height (play-btn) | `var(--cg-spacing-40)` | Tokenized but 40px | Touch target < 44px (see §4) |
| 45 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 46 | border | `none` | Yes | legitimate |
| 47 | background | `var(--cg-color-action-primary-background-default)` | Yes | tier-2, correct |
| 48 | color | `var(--cg-color-action-primary-text-default)` | Yes | — |
| 54 | padding | `0` | Yes | legitimate |
| 55 | transition | `transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | explicit property, good |
| 57 | transform | `scale(1.05)` | Yes | unitless scale factor, legitimate |
| 58 | transform | `scale(var(--cg-interaction-press-scale))` | Yes | real tier-1 interaction token |
| 60 | outline | `none` | Yes | replaced by box-shadow ring |
| 61 | box-shadow | `0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | Yes | `0 0 0` are offset/blur, token ring color, correct |
| 69 | gap | `var(--cg-spacing-6)` | Yes | — |
| 79 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 80 | font-size | `var(--cg-font-size-sm)` | Yes | 14px title, AA-ok |
| 81 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 88 | color (time) | `var(--cg-color-surface-container-outlined)` | Yes | tier-2, valid |
| 89 | font-size | `var(--cg-font-size-xs)` | Acceptable | xs on a numeric timestamp (not body copy) — borderline but OK |
| 90 | font-variant-numeric | `tabular-nums` | Yes | good for timecodes |
| 97 | gap | `var(--cg-spacing-2)` | Yes | — |
| 98 | height (waveform) | `var(--cg-spacing-24)` | Yes | — |
| 103 | min-width | `var(--cg-spacing-2)` | Yes | — |
| 104 | max-width | `var(--cg-spacing-4)` | Yes | — |
| 105 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 106 | transition | `background var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | explicit |
| 109 | background (past) | `var(--cg-color-action-primary-background-default)` | Yes | progress fill = accent, correct |
| 112 | background (future) | `var(--cg-color-surface-cards-border)` | Yes | — |
| 116 | width | `100%` | Yes | percentage, legitimate |
| 117 | height (track) | `var(--cg-spacing-4)` | Yes | — |
| 118 | background | `var(--cg-color-surface-cards-border)` | Yes | — |
| 119 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 124 | height (fill) | `100%` | Yes | percentage |
| 125 | background | `var(--cg-color-action-primary-background-default)` | Yes | — |
| 127 | transition | `width var(--cg-transition-duration-fast) var(--cg-transition-easing-linear)` | Yes | explicit, linear easing apt for progress |
| 131 | background | `none` | Yes | — |
| 132 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 133 | color | `var(--cg-color-surface-container-outlined)` | Yes | — |
| 134 | font-size | `var(--cg-font-size-xs)` | Acceptable | "1x"/"2x" pill label, not body |
| 135 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 136 | padding | `var(--cg-spacing-4) var(--cg-spacing-8)` | Tokenized but small | Contributes to < 44px target (see §4) |
| 137 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 141–143 | transition | `color …, background-color …` (explicit list) | Yes | enumerated, no `transition: all` |
| 147 | background (hover) | `var(--cg-color-action-tertiary-background-hover)` | Yes | tier-2, valid |
| 151 | box-shadow | `0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | Yes | — |
| 154–155 | transition (reduced-motion) | `none` | Yes | correct override |

**No token-vocabulary violations.** Every color is tier-2 semantic, every spacing/radius/motion value is a real token, no comma-fallbacks, no raw hex/rgba, no banned `--cg-gray-*`/`--cg-brand-*` palette colors, no `transition: all`, no made-up token names. The only defects are dimensional (touch-target sizing), not token defects.

### 2. Styling Audit
- **Border radius:** `--cg-border-radius-150` container with `-full` pills/buttons — modern, consistent. Appropriate.
- **Spacing:** 12/16 padding, 12 gap — generous and balanced for a compact horizontal player.
- **Font-size accessibility:** Title is `--cg-font-size-sm` (14px) which meets the 14px minimum. Timecode and speed label are `--cg-font-size-xs` — these are numeric/label glyphs, not body copy, so acceptable; no body text falls below 14px.
- **Translucent vs solid borders:** Borders use `--cg-color-surface-cards-border` (semantic, theme-aware). Good.
- **Transitions:** All explicit property lists (`transform`, `background`, `color`, `background-color`, `width`) — no `transition: all`. Motion tokens used throughout, and a `prefers-reduced-motion` block disables the animated transitions. Strong.
- **Dark-theme background:** `--cg-color-surface-container-background` with `--cg-color-surface-cards-border` is dark-first appropriate.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.player`, `.play-btn`, `.speed-btn`, `.progress-track` base styles | None |
| Hover | Yes | `.play-btn:hover` scale(1.05); `.speed-btn:hover` color + tertiary bg | None |
| Active/Press | Partial | `.play-btn:active` uses `--cg-interaction-press-scale` | `.speed-btn` and `.progress-track` have no active/press feedback |
| Focus-visible | Partial | `.play-btn:focus-visible` and `.speed-btn:focus-visible` ring | **`.progress-track` (role=slider, tabindex=0) has NO `:focus-visible` style** — keyboard focus on the seek bar is invisible (a11y defect) |
| Disabled | No (N/A) | — | No disabled prop modeled; a player with empty `src` still renders interactive controls. Acceptable as N/A but a no-src disabled affordance would be an improvement |
| Loading | No (N/A) | `_loaded` state tracked in JS but never surfaced in UI | N/A for visual states, but the buffering/loading moment has no indicator |
| Error | No | `play().catch()` silently resets `_playing` (line 218-220) | Audio load/play failure is swallowed with no UI and no `ai-audio-error` event |
| Success | N/A | — | Not a submit/confirm component; playback-end fires `ai-audio-end`. Justified N/A |

### 4. Interaction Audit
- **Keyboard:** Seek bar supports ArrowRight/ArrowLeft (±5s), Home, End — solid. The **play/pause and speed buttons are native `<button>`s** so Enter/Space work for free. Missing: Space-to-toggle-play at the component/region level (common audio convention), and Up/Down on the slider.
- **ARIA:** `role="region"` with `aria-label` on the player; `role="slider"` with `aria-valuemin`/`aria-valuemax`/`aria-valuenow` on the track — correct and well-formed. `aria-label` on play button toggles "Play"/"Pause". Waveform correctly `aria-hidden="true"` (decorative). Speed button has `aria-label="Playback speed"` but its **value (`1x`/`1.5x`/`2x`) is only conveyed visually** — no `aria-pressed` or value announcement on change, so screen-reader users don't hear the speed update.
- **CustomEvents:** `ai-audio-play`, `ai-audio-pause`, `ai-audio-end` all dispatched with `bubbles: true, composed: true`. However the JSDoc-documented events have **empty `detail`** — no `currentTime`/`duration`/`speed` payload, limiting host integration. No `ai-audio-seek` or `ai-audio-error` event despite those actions occurring.
- **Touch targets:** Play button is **40×40px** (`--cg-spacing-40`) — **below the 44px minimum**. Speed button is ~24px tall (xs font + 4px vertical padding) — **well below 44px**. Progress track is **4px tall** — the clickable hit area is far below 44px (hairline seek bar). These are the principal defects.

### 5. Visual Design Check
Clean, compact, modern horizontal player: circular accent play button, decorative randomized waveform, thin full-radius progress fill, and a tertiary speed pill. Radius language is consistent (full pills + 150 container). Breathing room is good (12/16 padding). Typography hierarchy reads well (semibold title vs muted tabular timecode). It uses semantic tokens throughout and respects reduced-motion. It would largely pass a HeroUI/Vercel-style showcase, but two things hold it back from "strong": the seek bar has no visible keyboard-focus ring, and the touch targets (40px button, ~24px pill, 4px track) are below the 44px accessibility floor — visible under scrutiny on touch/keyboard. Verdict: **adequate**.

### 6. Fixes Needed
1. **Line 43-44 — play button touch target.** Current: `width: var(--cg-spacing-40); height: var(--cg-spacing-40);` → Fixed: `width: var(--cg-spacing-48); height: var(--cg-spacing-48);` Why: 40px is below the 44px minimum interactive touch target; `--cg-spacing-48` clears it.
2. **Line 149-152 / progress-track — missing focus-visible on the slider.** The `.progress-track` is `role="slider" tabindex="0"` but has no focus style, so keyboard focus is invisible (a11y P0). Add a rule:
   ```css
   .progress-track:focus-visible {
     outline: none;
     box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
   }
   ```
   Why: every keyboard-focusable interactive element must show a visible focus indicator.
3. **Line 130-144 — speed button touch target.** The speed pill is ~24px tall (xs font + `--cg-spacing-4` vertical padding). Add a `min-height: var(--cg-spacing-40);` (or raise to 44 via min-block-size) and increase vertical padding so the control reaches a usable hit area. Why: control is well below the 44px touch-target floor.

Notes: items below are quality recommendations, not token defects — (a) populate CustomEvent `detail` with `{ currentTime, duration }` and add `ai-audio-error`; (b) reflect speed change to assistive tech (announce/`aria-label` update on `_cycleSpeed`); (c) surface the swallowed `play().catch()` failure (line 218) with an error state/event. The token layer itself is fully compliant.

### Research-backed enhancements

- **Canvas waveform with hover-scrub preview, not a flat range slider.** Render a real amplitude waveform (WaveSurfer.js / canvas-based, as in Austin UI and ElevenLabs UI). On pointer-move over the track, show a thin vertical playhead-preview line plus a floating timestamp bubble before the user commits the click — this makes scrubbing feel precise instead of guessed. Split the bar fill into "played" vs "unplayed" color (tier-2 `--cg-color-action-primary` vs a muted surface) so progress reads at a glance.

- **Live reactive bar visualizer for the AI/streaming state.** Since this is AI-native, when audio is being generated/streamed, swap the static waveform for an animated bar visualizer driven by amplitude (ElevenLabs UI's live-waveform pattern). Bars should ease toward a calm resting state when paused rather than freezing abruptly — a 150-200ms decay reads as "alive."

- **Make the play/pause control a morphing micro-interaction.** Animate the play triangle into the pause bars (and into a loading spinner during buffering) using a single SVG with tweened paths, instead of swapping icons. This is the Linear/Vercel-style affordance where one control fluidly expresses three states. Remember the Lit gotcha: use the `svg` template, not `html`, for the icon children.

- **Add the states this component type usually ships incomplete.** Beyond default/playing/paused, explicitly design: **buffering/loading** (skeleton-shimmer over the waveform), **error** (failed to load — with a retry affordance), **empty** (no source yet), and **live/indeterminate** (streaming audio with unknown duration, so hide the total-time and show an elapsed-only counter). Per the project's 8-state quality bar, these are currently the easy ones to miss.

- **Density + speed/volume affordances inline, revealed on hover.** Add a playback-speed chip (1x → 1.5x → 2x cycling) and a volume control that expands from a single icon into a vertical/horizontal slider on hover or focus — keeps the default footprint tight (shadcn/dialog-audio-player density) while exposing power-user controls without a settings menu.

- **Keyboard + accessible scrub map.** Space = play/pause, arrows = ±5s seek, shift+arrow = ±1s fine seek, with the timeline exposed as an ARIA slider announcing "1:23 of 4:10." Podcast players increasingly pair waveform scrubbing with a synced transcript/caption region for navigation and a11y — worth a `transcript` slot if the AI source provides one.

Sources: [Austin UI audio player + waveform hooks](https://allshadcn.com/tools/austin-ui/), [ElevenLabs UI audio components](https://allshadcn.com/components/elevenlabs-ui/), [Reba Design System waveform components](https://rebadesign.systems/), [shadcn dialog audio player](https://www.shadcn.io/blocks/dialog-audio-player)

### Playground proposal

Current playground (src + title + duration) is fine, but a richer example better showcases the component: provide a real/streamable src, a longer human title to demonstrate ellipsis truncation, and a duration that exercises the timecode formatter. Suggested defaults:

<ai-audio-player
  src="/audio/podcast-ep12.mp3"
  title="Episode 12: AI Safety and the Alignment Problem"
  duration="1842"
></ai-audio-player>

This exercises title ellipsis (white-space: nowrap + text-overflow), the 30:42 timecode formatting, and the seek/speed controls. No registry change required — proposal only.

---
*cleanliness: needs-work | fixes proposed: 3*
