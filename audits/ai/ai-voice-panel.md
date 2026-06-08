## ai-voice-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 41 | animation duration | `var(--cg-transition-duration-default)` | Yes | — |
| 41 | animation easing | `var(--cg-transition-easing-ease-out)` | Yes | — |
| 48 | gap | `var(--cg-spacing-20)` | Yes | — |
| 49 | padding | `var(--cg-spacing-32) var(--cg-spacing-24)` | Yes | — |
| 50 | background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 51 | border width | `var(--cg-border-width-50)` | Yes | — |
| 51 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 52 | border-radius | `var(--cg-border-radius-200)` | Yes | — |
| 57 | font-size | `var(--cg-font-size-xs)` | Tier-1 valid, but this is the primary state label (uppercase prompt). xs may render <14px — acceptable as a label, see §2 | — |
| 58 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 60 | letter-spacing | `var(--cg-letter-spacing-wide)` | Yes (explicitly allowed) | — |
| 61 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 63 | color (listening) | `var(--cg-color-surface-base-text)` | Yes | — |
| 64 | color (processing) | `var(--cg-color-status-warning-text-default)` | Generic status; AI lifecycle state. Recommend `--cg-color-ai-thinking-text` — see §6 | Consider |
| 65 | color (error) | `var(--cg-color-status-error-text-default)` | Generic status; AI lifecycle state. Recommend `--cg-color-ai-error-text` — see §6 | Consider |
| 70-71 | width/height (mic-area) | `var(--cg-spacing-80)` | Yes | — |
| 80 | inset | `var(--cg-spacing-4)` | Yes | — |
| 81 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 82 | border width | `var(--cg-border-width-100)` | Yes | — |
| 82 | border color | `var(--cg-color-action-primary-background-default)` | Yes (documented pulse-ring accent) | — |
| 87 | animation `2s` | literal | @keyframes duration literal — not flagged | — |
| 87 | easing | `var(--cg-transition-easing-default)` | Yes | — |
| 89-90 | animation-delay `0.6s`/`1.2s` | literal | Stagger timing literals — borderline; no token scale for these — see §2 | — |
| 93-94 | keyframe transform/opacity | literals | @keyframes positions — not flagged | — |
| 99-100 | width/height (mic-btn) | `var(--cg-spacing-64)` | Yes | — |
| 101 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 102 | border width | `var(--cg-border-width-100)` | Yes | — |
| 102 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 103 | background | `var(--cg-color-surface-base-background)` | Yes | — |
| 104 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 109-113 | transition | explicit property list, `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes (explicit, not `all`) | — |
| 118 | border-color hover | `var(--cg-color-input-border-hover)` | Yes | — |
| 119 | color hover | `var(--cg-color-surface-base-text)` | Yes | — |
| 121 | transform active | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 124-126 | box-shadow focus | `0 0 0 2px ...`, `0 0 0 3px ...` | bare px in box-shadow offsets/spread — see §2; not in flagged px categories | — |
| 125 | box-shadow color | `var(--cg-color-surface-base-background)` | Yes (inner ring) | — |
| 126 | box-shadow color | `var(--cg-overlay-accent-strong)` | Yes (focus ring — though `--cg-color-focus-ring` exists; see §4) | — |
| 129 | border-color listening | `var(--cg-color-action-primary-background-default)` | Yes | — |
| 130 | color listening | `var(--cg-color-surface-base-text)` | Yes | — |
| 131 | background listening | `var(--cg-overlay-accent-subtle)` | Yes | — |
| 134-135 | processing colors | `var(--cg-color-status-warning-text-default)` | AI state; see §6 | Consider |
| 138-139 | error colors | `var(--cg-color-status-error-text-default)` | AI state; see §6 | Consider |
| 143 | opacity disabled | `0.4` | Literal opacity — allowed | — |
| 147-148 | svg width/height | `var(--cg-spacing-24)` | Yes | — |
| 152 | spinner animation `1s linear` | literal | timing literal — borderline | — |
| 159 | min-height | `var(--cg-spacing-40)` | Yes | — |
| 162 | font-size transcript | `var(--cg-font-size-sm)` | Yes (≥14px) | — |
| 163 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 164 | line-height | `var(--cg-line-height-relaxed)` | Yes | — |
| 167 | font-size interim | `var(--cg-font-size-sm)` | Yes | — |
| 168 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 170 | line-height | `var(--cg-line-height-relaxed)` | Yes | — |
| 173 | font-size error-msg | `var(--cg-font-size-sm)` | Yes | — |
| 174 | color | `var(--cg-color-status-error-text-default)` | AI error state; see §6 | Consider |
| 175 | line-height | `var(--cg-line-height-normal)` | Yes | — |
| 178-180 | unsupported-msg | `--cg-font-size-sm`, `--cg-color-input-text-placeholder`, `--cg-line-height-normal` | Yes | — |
| 185 | font-size ptt-hint | `var(--cg-font-size-xs)` | Tier-1 valid; secondary hint text — see §2 | — |
| 186 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 190 | border-radius none | `0` | Allowed | — |
| 191 | border-radius sm | `var(--cg-border-radius-50)` | Yes | — |
| 192 | border-radius md | `var(--cg-border-radius-100)` | Yes | — |
| 193 | border-radius lg | `var(--cg-border-radius-200)` | Yes | — |

No comma-fallback `var(--token, fallback)` patterns. No raw hex/rgba. No tier-1 palette colors (`--cg-gray/red/blue/green/brand-*`). No `transition: all`. No made-up tokens — every `var()` reference resolves to the vocab.

### 2. Styling Audit

- **Border radius:** Panel `--cg-border-radius-200` with `rounded` variants (none/50/100/200). Mic button and pulse rings use `--cg-border-radius-full`. Consistent and token-driven.
- **Spacing:** Vertical gap `--cg-spacing-20`, generous panel padding `--cg-spacing-32 / --cg-spacing-24`, transcript `min-height --cg-spacing-40`. Mic area 80, button 64, icon 24 — all on the token scale. Good breathing room.
- **Font-size accessibility:** Body/transcript/error/unsupported text all use `--cg-font-size-sm` (≥14px) — compliant. State label (line 57) and PTT hint (line 185) use `--cg-font-size-xs`. These are an uppercase status caption and a secondary hint, not body copy, so xs is defensible; flagged only as a watch item if xs resolves below ~12px.
- **Translucent vs solid borders:** Card border `--cg-color-surface-cards-border` (translucent semantic) — good for dark theme layering. Listening background uses `--cg-overlay-accent-subtle` (translucent accent wash) — appropriate.
- **Transitions explicit vs all:** Lines 109-113 enumerate border-color, color, background, transform individually — no `transition: all`. Uses `--cg-transition-duration-fast` + easing tokens. Compliant.
- **Motion tokens:** Host fade-in uses duration/easing tokens. However the pulse-ring keyframe duration `2s`, stagger delays `0.6s`/`1.2s` (lines 87/89/90), and spinner `1s linear` (line 152) are literal timings. There is no tier-1 token for animation loop durations/delays, so these are acceptable but worth a note. `prefers-reduced-motion` is honored (lines 195-198 plus the imported `reducedMotion` style) — disables pulse and spinner. Good.
- **Dark-theme suitability:** Strong. Surface-cards background + translucent borders + accent overlay washes are designed for dark-first. No hardcoded light values.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.mic-btn` idle styling; label "Tap to speak" / "Hold to talk" | None |
| Hover | Yes | `.mic-btn:hover` border + text color shift (lines 117-120) | None |
| Active/Press | Yes | `.mic-btn:active` `scale(--cg-interaction-press-scale)` (line 121) | None |
| Focus-visible | Yes | `.mic-btn:focus-visible` double-ring box-shadow (122-127) | Uses `--cg-overlay-accent-strong`; `--cg-color-focus-ring` token exists and is the semantic intent — see §4. Bare px spread values (cosmetic). |
| Disabled | Yes | `.mic-btn:disabled` opacity 0.4 + not-allowed; bound to `unsupported` via `?disabled` (lines 142-145, 435) | None |
| Loading | Yes | `processing` state → spinner icon + `cursor: wait` + warning color (133-137, 152, 411) | Color is generic warning; AI-state token recommended — see §6 |
| Error | Yes | `error` state → X icon, error color, role="alert" message (138-141, 414, 450-451) | Color is generic status-error; AI-error token recommended — see §6 |
| Success | N/A | No explicit success/complete visual; `onend` resets to `idle` (line 299, which is a redundant `? 'idle' : 'idle'` ternary — dead branch, logic smell not a token issue). Final transcript is the success signal. | Minor: line 299 ternary always yields `'idle'`; could surface a brief complete/success state using `--cg-color-ai-complete-text`. Design note, not a token violation. |

Also present: `unsupported` state (browser without SpeechRecognition) with dedicated icon + message — well covered.

### 4. Interaction Audit

- **Keyboard:** `_handleKeyDown` / `_handleKeyUp` handle Enter and Space, with `preventDefault`. Push-to-talk maps keydown→start, keyup→stop; toggle mode maps to `_handleMicClick`. Solid. Native `<button>` is focusable by default.
- **ARIA:** Panel `role="region"` + `aria-label="Voice input"` (line 427). Mic button has dynamic `aria-label` (Start/Stop recording) and `aria-pressed` reflecting listening (436-437). Error message `role="alert"` (451). Interim transcript `aria-live="polite"` (460). Pulse rings `aria-hidden="true"`. Strong coverage. Minor: the PTT hint has `id="ptt-hint"` (line 469) but the mic button has no `aria-describedby="ptt-hint"` to link it — the hint is unannounced. Final transcript `<div class="transcript">` is not in a live region, so completed results aren't announced to SR users (only interim is). Recommend `aria-live` on the transcript or `aria-describedby` linkage.
- **CustomEvents:** `ai-voice-start`, `ai-voice-stop`, `ai-voice-result` ({transcript, isFinal}), `ai-voice-error` ({error, message}). All `bubbles: true, composed: true`. Note: the `@fires` JSDoc for `ai-voice-error` documents `{error: string}` but the actual detail also includes `message` (line 292) — doc/impl drift, harmless. Detail shapes are otherwise correct.
- **Touch targets:** Mic button is `--cg-spacing-64` (64px) square — exceeds the 44px minimum. Excellent. (No enlargement needed.)

### 5. Visual Design Check

Modern and polished. The triple staggered pulse ring around a circular mic button is a recognizable, premium voice-UI pattern (Vercel/Linear-grade). Radius is generous and consistent, breathing room is ample (`--cg-spacing-32` padding, `--cg-spacing-20` gap). Typography hierarchy is clear: uppercase tracked state label → large mic affordance → transcript body → muted language badge / PTT hint. Dark-first surface tokens and translucent accent washes read as showcase-ready. No hard dividers needed given the centered vertical stack. The one polish gap is the lifecycle coloring leaning on generic status colors instead of the dedicated AI-state family, which would make the listening/processing/error progression feel more on-brand. One-word verdict: **strong**.

### 6. Fixes Needed

These are AI-lifecycle semantic-color recommendations. The component renders AI voice lifecycle states (processing/listening = thinking, error), and the convention prescribes the dedicated `--cg-color-ai-*` family over generic status colors. All replacement tokens verified present in `_token-vocab-colors.txt`.

1. **Line 64** — `.state-label.processing { color: var(--cg-color-status-warning-text-default); }` → `color: var(--cg-color-ai-thinking-text);` — Processing is an AI lifecycle (thinking) state; use the dedicated AI-state token rather than a generic warning color.

2. **Line 65** — `.state-label.error { color: var(--cg-color-status-error-text-default); }` → `color: var(--cg-color-ai-error-text);` — AI error lifecycle state should use the AI-error semantic token.

3. **Line 134** — `.mic-btn.processing { border-color: var(--cg-color-status-warning-text-default); ... }` → `border-color: var(--cg-color-ai-thinking-text);` — Match the AI thinking state.

4. **Line 135** — `.mic-btn.processing { ... color: var(--cg-color-status-warning-text-default); }` → `color: var(--cg-color-ai-thinking-text);` — Match the AI thinking state.

5. **Line 139** — `.mic-btn.error { border-color: var(--cg-color-status-error-text-default); ... }` → `border-color: var(--cg-color-ai-error-text);` — AI error semantic token.

6. **Line 141** — `.mic-btn.error { ... color: var(--cg-color-status-error-text-default); }` → `color: var(--cg-color-ai-error-text);` — AI error semantic token.

7. **Line 174** — `.error-msg { ... color: var(--cg-color-status-error-text-default); ... }` → `color: var(--cg-color-ai-error-text);` — The error message belongs to the AI error lifecycle.

**Non-token flags (design / a11y, not in the fixes array):**
- Line 299: `this._state = this._transcript ? 'idle' : 'idle';` — both ternary branches return `'idle'` (dead branch). Likely intended a `complete`/success state; consider surfacing one with `--cg-color-ai-complete-text`.
- A11y: completed transcript (`.transcript`, line 457) is not in a live region; only interim is announced. Add `aria-live` or link the PTT hint via `aria-describedby="ptt-hint"` on the mic button.
- Focus ring uses `--cg-overlay-accent-strong`; the semantic `--cg-color-focus-ring` token exists and better expresses intent (optional).
- Animation loop timings (`2s`, `0.6s`, `1.2s`, `1s`) are literals — no token scale exists for loop durations, so acceptable.

### Research-backed enhancements

The current pulse-ring is a decorative, audio-agnostic loop — it pulses at a fixed 2s cadence whether the user is speaking, silent, or shouting. Modern 2025-era voice UIs have moved past the static pulse to **input-reactive** visualization. The following are concrete, component-specific upgrades.

1. **Replace the fixed-cadence pulse ring with an amplitude-reactive waveform.** ElevenLabs UI's `Live Waveform` and Pipecat's `Circular Waveform` both drive bar height / orb radius from the live mic amplitude via the Web Audio `AnalyserNode`, rendered on Canvas with `requestAnimationFrame` at 60fps ([ElevenLabs Live Waveform](https://ui.elevenlabs.io/docs/components/live-waveform), [Pipecat Circular Waveform](https://voiceuikit.pipecat.ai/visualizers/circular-waveform)). For this component, keep the existing circular mic-area footprint but render a thin circular spectrum around the `--cg-spacing-80` ring that scales with RMS amplitude. This gives the user real-time confirmation the mic is *hearing them* — the decorative triple-ring stagger only confirms the mic is "on," not that audio is registering. Gate the canvas behind `prefers-reduced-motion` (already honored for the pulse) by falling back to the current static ring.

2. **Add a deliberate "thinking" dwell on the processing transition.** Per the 2026 AI micro-animation guidance, a programmed 1–1.5s delay paired with animation mimics human cognitive processing and makes the AI feel more organic rather than instantaneous ([Groovyweb AI UX trends 2026](https://www.groovyweb.co/blog/ui-ux-design-trends-ai-apps-2026)). The current `processing` state jumps straight to a `1s linear` spinner. Swap the generic spinner for a morph: the reactive waveform from (1) should *collapse inward* into a slow breathing orb on entering `processing`, holding for ~1.2s before the transcript settles. This also resolves the dead `'idle' : 'idle'` ternary at line 299 by giving it a real `complete` state to transition through (use `--cg-color-ai-complete-text`).

3. **Keep micro-animations in the 100–300ms band; the press/hover transitions are correct, the lifecycle ones are not.** The 2026 guidance is explicit: state-change micro-animations should be 100–300ms, purposeful, and restrained ([Groovyweb](https://www.groovyweb.co/blog/ui-ux-design-trends-ai-apps-2026)). The `--cg-transition-duration-fast` hover/press feedback (lines 109-113) already fits. But state *color* changes between idle → listening → processing → error currently snap instantly. Add an explicit `transition` on `border-color, color, background-color` for the `.mic-btn` state classes so the listening/processing/error palette shifts ease over ~200ms instead of hard-cutting — small but it makes the lifecycle read as one continuous signal.

4. **Surface live transcription inline as the "heartbeat," not just below the button.** Modern voice-first patterns show instant transcription *in the input affordance itself* while speaking, treating the streaming text as the primary feedback loop rather than a separate region ([UI Deploy VUI patterns 2025](https://ui-deploy.com/blog/voice-user-interface-design-patterns-complete-vui-development-guide-2025)). The interim transcript currently lives in a muted block under the mic with `min-height: --cg-spacing-40`. Consider promoting the interim text to render directly beneath/around the orb with a subtle character-reveal fade so the user's eye stays on one focal point — and wire the *final* transcript into an `aria-live="polite"` region (the §4 a11y gap), since right now only interim is announced.

5. **Add a persistent active-mic trust indicator.** Voice UIs in 2025 treat a clear, always-visible "mic is hot" signal as a trust/privacy requirement, not decoration ([Uiverse voice components 2025](https://uiverse.io/blog/voice-enabled-ui-components-the-new-frontier-in-2025)). The component communicates listening only via border color + the pulse. Add a small persistent recording dot (using `--cg-color-action-primary-background-default`, already the accent) with the elapsed time or a steady "Listening" affordance that does not depend on motion — so reduced-motion users and at-a-glance users both get the privacy-relevant signal.

6. **Tighten density toward the Linear/Vercel "calm panel" aesthetic.** The current `--cg-spacing-32 / --cg-spacing-24` padding with a centered stack is solid, but 2025 reference panels (Linear, Vercel) pair generous breathing room with a *single* dominant focal element and demote everything else to low-contrast metadata. The PTT hint, language badge, and state label are three competing captions. Recommend collapsing the state label into the orb's micro-copy and demoting the PTT hint + language badge into one muted metadata footer row (`--cg-font-size-xs`, `--cg-color-input-text-placeholder`) so the orb is unambiguously the hero — consistent with the restrained, hierarchy-first direction in the [2026 AI UI trends roundup](https://www.groovyweb.co/blog/ui-ux-design-trends-ai-apps-2026).
