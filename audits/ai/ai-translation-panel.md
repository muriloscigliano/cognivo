## ai-translation-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 37 | animation duration/easing | `--cg-transition-duration-default` / `--cg-transition-easing-default` | Yes | — |
| 41 | background | `--cg-color-surface-cards-background` | Yes | — |
| 42 | border width/color | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 43 | border-radius | `--cg-border-radius-200` | Yes | — |
| 51 | gap | `--cg-spacing-8` | Yes | — |
| 52 | padding | `--cg-spacing-16` / `--cg-spacing-20` | Yes | — |
| 53 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | Yes | — |
| 56-57 | icon width/height | `--cg-spacing-20` | Yes (sizing via spacing scale, acceptable) | — |
| 58 | icon color | `--cg-color-surface-base-text` | Yes | — |
| 62-64 | title font-size/weight/color | `--cg-font-size-sm` / `--cg-font-weight-bold` / `--cg-color-surface-base-text` | Yes | — |
| 74 | pane padding | `--cg-spacing-16` / `--cg-spacing-20` | Yes | — |
| 77 | pane gap | `--cg-spacing-12` | Yes | — |
| 80-81 | divider width/background | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | Yes | — |
| 88 | pane-header gap | `--cg-spacing-8` | Yes | — |
| 92 | lang-select min-width | `--cg-spacing-96` | Yes (spacing scale, acceptable) | — |
| 97-99 | text-area font/color/line-height | `--cg-font-size-sm` / `--cg-color-surface-base-text` / `--cg-line-height-relaxed` | Yes | — |
| 100 | text-area min-height | `--cg-spacing-80` | Yes (spacing scale) | — |
| 104 | muted color | `--cg-color-input-text-placeholder` | Yes | — |
| 111 | loading-dots gap | `--cg-spacing-4` | Yes | — |
| 112 | loading-dots padding | `--cg-spacing-8` 0 | Yes | — |
| 116-117 | dot width/height | `--cg-spacing-6` | Yes (spacing scale) | — |
| 117 | dot radius | `--cg-border-radius-full` | Yes | — |
| 118 | dot background | `--cg-color-action-primary-background-default` | Yes | — |
| 119 | dot opacity | `0.4` | N/A (opacity unitless) | — |
| 120,122-124 | animation timing/keyframes | literal `1s`/`0.15s`/`0.3s`/`50%` | N/A (keyframe + timing literals) | — |
| 128 | alternatives border-top | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | Yes | — |
| 129 | alternatives padding | `--cg-spacing-12` / `--cg-spacing-20` | Yes | — |
| 132-134 | alt-label font/weight/color | `--cg-font-size-xs` / `--cg-font-weight-semibold` / `--cg-color-input-text-placeholder` | Yes (label, xs OK) | — |
| 136 | letter-spacing | `--cg-letter-spacing-wide` | Yes (valid) | — |
| 137 | margin-bottom | `--cg-spacing-8` | Yes | — |
| 142 | alt-list gap | `--cg-spacing-6` | Yes | — |
| 148 | alt-item gap | `--cg-spacing-8` | Yes | — |
| 149 | alt-item padding | `--cg-spacing-8` / `--cg-spacing-12` | Yes | — |
| 150 | alt-item background | `--cg-color-surface-container-background` | Yes | — |
| 151 | alt-item border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 152 | alt-item radius | `--cg-border-radius-100` | Yes | — |
| 154-156 | transition (border-color, background) | explicit props + `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes (explicit, not `all`) | — |
| 159 | hover border-color | `--cg-color-input-border-hover` | Yes | — |
| 160 | hover background | `--cg-overlay-dark-subtle` | Valid token, but dark-overlay hover darkens in a dark-first theme (wrong direction) | Recommend `--cg-color-surface-cards-hover-background` |
| 162 | active transform scale | `--cg-interaction-press-scale` | Yes | — |
| 166-167 | focus box-shadow | `0 0 0 2px var(--cg-color-surface-base-background)`, `0 0 0 4px var(--cg-color-focus-ring)` | Yes (offsets/spread literals allowed; tokens valid) | — |
| 170-171 | alt-text font/color | `--cg-font-size-sm` / `--cg-color-surface-base-text` | Yes | — |
| 174-175 | alt-conf font/color | `--cg-font-size-xs` / `--cg-color-input-text-placeholder` | Yes (metadata, xs OK) | — |
| 181 | translate-bar border-top | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | Yes | — |
| 182 | translate-bar padding | `--cg-spacing-12` / `--cg-spacing-20` | Yes | — |
| 188-191 | rounded variants | `0` / `--cg-border-radius-50` / `--cg-border-radius-100` / `--cg-border-radius-200` | Yes | — |
| 195 | reduced-motion opacity | `0.6` | N/A (unitless opacity) | — |

### 2. Styling Audit
- **Border radius**: All radii from tier-1 scale (`-50`/`-100`/`-200`/`-full`), with a configurable `rounded` reflected attribute mapping cleanly to tokens. Consistent and compliant.
- **Spacing**: Entirely from the `--cg-spacing-*` scale; no magic px. Sizing of icon, dot, min-heights, and min-width also pulls from the spacing scale (acceptable, no dedicated tier-3 family exists for this component).
- **Font-size accessibility**: Body text (header title, text-area, alt-text) uses `--cg-font-size-sm` (14px) — meets the 14px floor. `--cg-font-size-xs` only appears on the uppercase alt-label and confidence percentages (true labels/metadata), which is acceptable.
- **Translucent vs solid borders**: All borders use solid semantic surface tokens (`-cards-border`, `-cards-divider`). Good.
- **Transitions**: Explicit property lists (`border-color`, `background`) with motion tokens — no `transition: all`. Animations gated behind `prefers-reduced-motion`. Compliant.
- **Dark-theme suitability**: Mostly strong (semantic surface/text tokens adapt). One concern: the alt-item hover uses `--cg-overlay-dark-subtle`, which darkens the surface on hover — backwards for a dark-first system where hover should lift/lighten. A semantic hover-surface token reads better in dark mode.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.panel` / `.pane` / `.text-area` base styles; muted placeholder variant | None |
| Hover | Yes | `.alt-item:hover` border + background change | Hover background darkens (`--cg-overlay-dark-subtle`) rather than lightening — wrong direction for dark-first |
| Active/Press | Yes | `.alt-item:active` uses `--cg-interaction-press-scale` | None |
| Focus-visible | Yes | `.alt-item:focus-visible` dual-ring box-shadow with `--cg-color-focus-ring` + base-background offset; outline removed but replaced by ring | None — proper visible focus |
| Disabled | Yes (delegated) | Translate `cg-button` `?disabled` when loading or no source text; alt-items have no disabled state (N/A — always actionable) | None |
| Loading | Yes | `loading` prop drives animated `.loading-dots` with `role="status"` and `aria-label`; translate button shows `?loading` + "Translating..." | None |
| Error | No | No error prop/branch for failed translation | N/A — component models success-path translation only; no error contract defined. Consider an error/empty-result state for robustness |
| Success | Yes | Confidence badge (success/warning variant), copy buttons flip to "Copied"/check icon with `status="success"` and 2s reset | None |

### 4. Interaction Audit
- **Keyboard**: Alt-items are `tabindex="0"` with `role="option"` and a keydown handler for `Enter`/`Space` (with `preventDefault`). Language selectors and buttons are native `cg-*` components (keyboard-handled internally). Good coverage.
- **ARIA roles/labels/states**: `role="region"` + `aria-label="Translation"` on the panel; divider is `aria-hidden`; loading dots `role="status"` + `aria-label="Translating"`; alt-list `role="listbox"` + `aria-label`, items `role="option"`. Copy buttons have descriptive `label` attrs. Solid. Minor gap: `role="option"` items do not expose `aria-selected` (listbox options should ideally carry selection state), but since selection dispatches an event rather than persisting a selected item, this is borderline acceptable.
- **CustomEvents**: Three events, all `bubbles: true, composed: true` (correctly cross Shadow DOM). Detail payloads match documented `@fires`: `ai-translation-request` → `{sourceText, sourceLang, targetLang}`; `ai-translation-select-alt` → `{text, confidence}`; `ai-translation-copy` → `{text, side}`. Correct.
- **Touch targets**: Alt-items have `~8-12px` padding around `sm` text — likely below the 44px target height. Copy buttons and selects are `size="sm"`. These are sizing/design considerations (noted, not token violations).

### 5. Visual Design Check
- **Modern/sleek?** Yes — split-pane grid with a thin center divider, confidence badge, animated loading dots, and an alternatives list is a clean, contemporary translation UI.
- **Radius**: Configurable and token-driven; default `lg` (200) on the panel with 100-radius alt chips — good nesting.
- **Breathing room**: Generous 16/20 padding in header and panes, 12 gaps. Good.
- **Dividers**: Uses semantic divider tokens for header, center column, alternatives, and translate bar — well-structured separation.
- **Typography hierarchy**: Bold sm title, relaxed-line-height sm body, xs uppercase wide-tracked label, xs muted confidence — clear hierarchy.
- **HeroUI/Vercel showcase-ready?** Yes, with one polish item (hover should lighten, not darken, in dark mode).
- **One-word verdict:** strong

### 6. Fixes Needed
1. **Line 160** — alt-item hover background.
   - Current: `background: var(--cg-overlay-dark-subtle);`
   - Fixed: `background: var(--cg-color-surface-cards-hover-background);`
   - Why: `--cg-overlay-dark-subtle` darkens the surface on hover, which is the wrong direction for a dark-first theme (hover should lighten/lift). The semantic `--cg-color-surface-cards-hover-background` token expresses the intended interactive surface state and adapts correctly across themes. Token verified present in the colors vocab (line 285).

Additional flags (not token violations — design changes, not in fixes array):
- Alt-items (`role="option"`) likely fall below the 44px touch-target minimum; consider increasing min-height for touch.
- No error/failed-translation state branch exists; consider an error state using the AI-state family (e.g. `--cg-color-ai-error-text`/`-background`/`-border`) for a failed translation, consistent with the AI lifecycle convention.
- `role="option"` items do not expose `aria-selected`; if a selected alternative is ever persisted, add it.

### Research-backed enhancements

Modern reference points: shadcn/ui's composition-first card primitives, Linear's near-black dense/technical surfaces with a single accent, and Vercel's stark ink-on-canvas hierarchy with restrained motion as the only decorative system.

1. **Center "swap languages" affordance on the divider.** The split-pane already has a thin center column — promote it from a passive divider into an interactive 32px circular swap button (source ⇄ target), the way Linear/Vercel collapse a structural element into a single high-value control instead of adding a separate toolbar. On click, animate a 180° icon rotation plus a brief crossfade of the two pane texts so the swap reads as a physical exchange, not a reload. Pairs naturally with the existing `ai-translation-request` event (re-emit with swapped `sourceLang`/`targetLang`).

2. **Streaming token reveal instead of binary loading dots.** The current `.loading-dots` is a fixed "thinking" indicator. Modern AI panels (shadcn.io's AI-native components) render translation output progressively — append target text token-by-token with a 1px blinking caret at the tail and a per-line fade-in. This removes the all-or-nothing wait, signals an LLM is producing the result, and gives the panel a contemporary generative feel. Gate the fade behind `prefers-reduced-motion` (the component already respects it) and keep `role="status"` on the streaming region.

3. **Inline confidence as a per-segment underline, not just a trailing badge.** Beyond the single confidence badge, adopt a diff/inline-annotation pattern: underline low-confidence spans with a dotted 1px border tinted from the AI-state family (`--cg-color-ai-warning-*`), revealing the alternative on hover/focus. This is the "inline diff" treatment Linear uses for review surfaces — it surfaces uncertainty exactly where it lives instead of forcing the user to scan a separate alternatives list.

4. **Raise alternative-row density and target affordances (touch + hover).** Section 4 flagged alt-items below the 44px touch minimum. Lift min-height to a 44px target, and on hover/focus reveal a right-aligned "Use" pill (fade + 4px slide-in) rather than relying on whole-row click — a Vercel-style progressive-disclosure affordance that makes the action explicit while keeping the resting state calm and dense. Replace the darkening `--cg-overlay-dark-subtle` hover with the lightening `--cg-color-surface-cards-hover-background` already prescribed in Fixes (#1) so the lift reads correctly in dark-first.

5. **Add error and empty states with a one-line retry, matching the AI lifecycle.** Section 3 notes no error branch. Introduce an `error` state using the AI-state tokens (`--cg-color-ai-error-text`/`-background`/`-border`) rendered as a compact inline row inside the target pane with a single "Retry" `cg-button` (size `sm`), plus a quiet empty state ("Enter text to translate") in place of the placeholder. shadcn's pattern is to keep these states inside the same card shell rather than swapping the whole component — preserves layout stability and avoids a jarring reflow.

6. **Persist and reflect the chosen alternative (`aria-selected` + accent border).** When an alternative is selected, mark its row `aria-selected="true"` and apply a 2px left accent border (`--cg-color-action-primary-background-default`), the lightweight selection convention shadcn/Linear use for list/option rows. This closes the a11y gap from Section 4 and gives the interaction a persistent, legible result instead of a fire-and-forget event.

Sources: [shadcn/ui](https://ui.shadcn.com/), [shadcn.io — AI-Native Component Library](https://www.shadcn.io/), [Vercel Academy — Anatomy of shadcn/ui Components](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).
