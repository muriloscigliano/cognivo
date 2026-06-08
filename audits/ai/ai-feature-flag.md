## ai-feature-flag — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 35 | background | `--cg-color-surface-base-background` | Yes | — |
| 36 | color | `--cg-color-surface-base-text` | Yes | — |
| 37 | border width / color | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 38 | border-radius | `--cg-border-radius-150` | Yes | — |
| 39 | padding | `--cg-spacing-16` | Yes | — |
| 40 | animation duration | `200ms` literal + `--cg-transition-easing-ease-out` | Borderline | `200ms` is a bare literal; could be `--cg-transition-duration-default`. Minor. |
| 48 | padding-bottom | `--cg-spacing-12` | Yes | — |
| 49 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 50 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 54 | font-size | `--cg-font-size-sm` | Yes | — |
| 55 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 60 | padding | `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 61 | border-radius | `--cg-border-radius-full` | Yes | — |
| 62 | font-size | `--cg-font-size-xs` | Yes (badge, not body) | — |
| 63 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 65 | letter-spacing | `0.05em` | OK (em, not banned) | — |
| 66 | background | `--cg-overlay-accent-subtle` | OK (tier-1 overlay, permitted) | — |
| 67 | color | `--cg-color-surface-base-text` | Yes | — |
| 71 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 75 | width | `100%` | OK | — |
| 76 | background | `--cg-color-surface-overlay` | **NO — token does not exist** | Replace with `--cg-color-input-background-default` |
| 77 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 78 | border-radius | `--cg-border-radius-100` | Yes | — |
| 79 | padding | `--cg-spacing-8` / `--cg-spacing-12` | Yes | — |
| 80 | color | `--cg-color-surface-base-text` | Yes | — |
| 81 | font-size | `--cg-font-size-sm` | Yes | — |
| 87 | placeholder color | `--cg-color-input-text-placeholder` | Yes | — |
| 91 | outline | `2px solid --cg-overlay-accent-strong` | **NO — color** | Use `--cg-color-focus-ring` for outline color (2px width acceptable) |
| 92 | outline-offset | `-2px` | OK (negative inset offset) | — |
| 96 | font-size | `--cg-font-size-xs` | Yes (label) | — |
| 97 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 98 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 100 | letter-spacing | `0.05em` | OK | — |
| 101 | margin | `--cg-spacing-12` / `--cg-spacing-6` | Yes | — |
| 107 | gap | `--cg-spacing-4` | Yes | — |
| 113 | gap | `--cg-spacing-12` | Yes | — |
| 114 | padding | `--cg-spacing-8` / `--cg-spacing-12` | Yes | — |
| 115 | background | `--cg-color-surface-overlay` | **NO — token does not exist** | Replace with `--cg-color-surface-inset-background` |
| 116 | border-radius | `--cg-border-radius-100` | Yes | — |
| 117 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 122 | hover border-color | `--cg-color-surface-cards-border` | Works but no visual change (same as default) | Should be `--cg-color-surface-cards-hover-border` |
| 125 | transform scale | `--cg-interaction-press-scale` | Yes (exists in dist) | — |
| 129 | outline | `2px solid --cg-overlay-accent-strong` | **NO — color** | Use `--cg-color-focus-ring` |
| 130 | outline-offset | `--cg-outline-offset-default` | Yes (exists in dist) | — |
| 139 | font-size | `--cg-font-size-sm` | Yes | — |
| 140 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 141 | margin-bottom | `--cg-spacing-2` | Yes | — |
| 145 | font-size | `--cg-font-size-xs` | OK (secondary desc text) | — |
| 146 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 153 | padding | `--cg-spacing-2` / `--cg-spacing-6` | Yes | — |
| 154 | border-radius | `--cg-border-radius-50` | Yes | — |
| 155 | font-size | `--cg-font-size-xs` | OK (badge) | — |
| 156 | background | `--cg-overlay-dark-subtle` | OK (tier-1 overlay, permitted) | — |
| 157 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 164 | width | `--cg-spacing-32` | Works; dedicated `--cg-component-switch-width` exists | Consider `--cg-component-switch-width` |
| 165 | height | `--cg-spacing-20` | Works; dedicated `--cg-component-switch-height` exists | Consider `--cg-component-switch-height` |
| 179 | track background | `--cg-color-surface-base-background` | **NO — semantic** | Use `--cg-color-toggle-background-off` |
| 180 | border-radius | `--cg-border-radius-full` | Yes | — |
| 181 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 183 | transition | `background ...-fast ...-default` | Yes (explicit) | — |
| 189-190 | thumb width/height | `--cg-spacing-12` | Yes | — |
| 191 | border-radius | `50%` | OK | — |
| 192 | thumb background (off) | `--cg-color-input-text-placeholder` | **NO — semantic** | Use `--cg-color-toggle-thumb-off` |
| 193-194 | top/left | `--cg-spacing-2` | Yes | — |
| 195 | transition | explicit `transform`, `background` | Yes | — |
| 199 | track background (on) | `--cg-overlay-accent-medium` | **NO — semantic** | Use `--cg-color-toggle-background-on` |
| 200 | border-color (on) | `--cg-color-surface-base-text` | Weak (uses body text color as border) | Use `--cg-color-toggle-background-on` |
| 204 | translateX | `--cg-spacing-16` | Yes | — |
| 205 | thumb background (on) | `--cg-color-action-primary-background-default` | **NO — semantic** | Use `--cg-color-toggle-thumb-on` |
| 209 | outline | `2px solid --cg-overlay-accent-strong` | **NO — color** | Use `--cg-color-focus-ring` (or `--cg-color-toggle-border-focus`) |
| 210 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 214 | font-size | `--cg-font-size-xs` | OK (count caption) | — |
| 215 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 216 | margin-top | `--cg-spacing-12` | Yes | — |
| 222 | padding | `--cg-spacing-24` | Yes | — |
| 223 | color | `--cg-color-input-text-placeholder` | Could use `--cg-color-empty-state-text-secondary` | Minor |
| 224 | font-size | `--cg-font-size-sm` | Yes | — |
| 228-232 | rounded variants | `0` / `--cg-border-radius-50/100/150/full` | Yes | — |

### 2. Styling Audit

- **Border radius:** Consistent tier-1 radius tokens; configurable `rounded` variants are well-formed. Good.
- **Spacing:** Entirely on the spacing scale (`--cg-spacing-*`). Clean.
- **Font-size accessibility:** Body/primary text (`.flag-name`, `.search-input`, `h3`, `.empty`) all `--cg-font-size-sm` (14px) — compliant. Secondary/caption text (`.flag-desc`, `.flag-env`, `.group-label`, `.count`, `.env-badge`) at `--cg-font-size-xs` is acceptable for badges/captions, but `.flag-desc` (line 145) is meaningful descriptive content rendered at xs — borderline for sustained reading; acceptable as secondary metadata.
- **Translucent vs solid borders:** Borders use solid `--cg-color-surface-cards-border` — fine. Env-badge/flag-env backgrounds use translucent overlays (`--cg-overlay-accent-subtle`, `--cg-overlay-dark-subtle`) which is intentional layering and dark-safe.
- **Transitions:** All transitions enumerate explicit properties (`background`, `transform`) — no `transition: all`. Motion uses `--cg-transition-duration-fast` / `--cg-transition-easing-default` tokens. The host `animation` (line 40) uses a bare `200ms` literal instead of `--cg-transition-duration-default` — minor.
- **Dark-theme suitability:** Surface/text/border tokens are theme-aware; toggle on-state currently leans on generic overlay/action tokens rather than the dedicated toggle family, which weakens the on/off contrast story in dark mode (see Fixes).

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.flag-item`, `.toggle-track` base styling | — |
| Hover | Partial | `.flag-item:hover` sets `border-color` to the **same** default token | No visible hover change — should use `--cg-color-surface-cards-hover-border` |
| Active/Press | Yes | `.flag-item:active` scales via `--cg-interaction-press-scale` | — |
| Focus-visible | Yes | search input, flag-item, toggle input all have `:focus-visible` outlines | Color uses generic `--cg-overlay-accent-strong` instead of `--cg-color-focus-ring` |
| Disabled | N/A | No disabled flag concept in the data model | Acceptable — flags are enable/disable toggles, not a disabled UI state |
| Loading | N/A | Static panel, no async fetch state | Acceptable for current scope; an async-loading skeleton would be a nice future addition |
| Error | N/A | No validation/error path | Acceptable |
| Success | Partial | "on" toggle conveys enabled; empty state has `role="status"` | The empty state (`.empty`) covers the no-results case well |

### 4. Interaction Audit

- **Keyboard:** Flag rows have `tabindex="0"` and a `keydown` handler for `Enter` (line 278). **Space is not handled** — for a `listitem`-role interactive row, Space should also activate (and default Space scroll should be prevented). The toggle uses a native `<input type="checkbox">`, so Space/Enter toggling works natively for it.
- **ARIA:** `role="list"` / `role="listitem"` with `aria-label` on the lists; checkbox has `aria-label="Toggle {name}"`; search input has `aria-label`; empty state has `role="status"`. Solid coverage. Note: a clickable `listitem` (row click fires `ai-flag-click`) is a non-standard interactive role — `button`/`link` semantics would be more correct, but this is a design call.
- **CustomEvents:** `ai-flag-toggle` detail `{id, name, enabled: !flag.enabled}` and `ai-flag-click` detail `{id, name}` — both `bubbles: true, composed: true`. Toggle handler correctly `stopPropagation()`s so the row click doesn't double-fire. JSDoc (lines 16-17) documents detail as `{id, enabled}` / `{id}` but code also emits `name` — doc is slightly under-specified (not a violation, but worth syncing).
- **Touch targets:** Flag rows are comfortably ≥44px (padding 8/12 + two text lines). The toggle switch is `--cg-spacing-32` × `--cg-spacing-20` (≈32×20px) — **below the 44px touch-target minimum**. This is a sizing/design change, not a token violation (noted here, excluded from fixes).

### 5. Visual Design Check

Clean, modern panel: rounded container, configurable radius variants, grouped Enabled/Disabled sections, search, count footer, and an animated entrance. Good breathing room via consistent spacing tokens and a clear header divider. Typography hierarchy is sensible (semibold header, medium flag names, xs muted descriptions/captions). The main weaknesses are (1) the toggle "on" state borrowing generic overlay/action colors instead of the dedicated toggle family, slightly muddying the most important visual signal in the component, and (2) a no-op hover state. Once the toggle family and a real hover border land, this is showcase-ready. **Verdict: adequate.**

### 6. Fixes Needed

1. **Line 76** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-input-background-default);`. `--cg-color-surface-overlay` does not exist (only `-scrim-dark`/`-scrim-light` variants); the search field should use the input-background semantic token.
2. **Line 115** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-surface-inset-background);`. Same nonexistent token; flag rows are inset wells.
3. **Line 179** — `background: var(--cg-color-surface-base-background);` → `background: var(--cg-color-toggle-background-off);`. Toggle off-state should use the dedicated toggle token.
4. **Line 192** — `background: var(--cg-color-input-text-placeholder);` → `background: var(--cg-color-toggle-thumb-off);`. Toggle thumb (off) should use the toggle-thumb token, not a placeholder-text color.
5. **Line 199** — `background: var(--cg-overlay-accent-medium);` → `background: var(--cg-color-toggle-background-on);`. Toggle on-state track must use the semantic on token, not a generic overlay.
6. **Line 205** — `background: var(--cg-color-action-primary-background-default);` → `background: var(--cg-color-toggle-thumb-on);`. Toggle thumb (on) should use the toggle-thumb-on token.
7. **Line 91** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: 2px solid var(--cg-color-focus-ring);`. Focus ring color should be the dedicated focus-ring token.
8. **Line 129** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: 2px solid var(--cg-color-focus-ring);`. Same.
9. **Line 209** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: 2px solid var(--cg-color-focus-ring);`. Same.
10. **Line 122** — `border-color: var(--cg-color-surface-cards-border);` → `border-color: var(--cg-color-surface-cards-hover-border);`. Hover currently re-applies the default border, producing no visible change.

Non-token flags (described, excluded from fixes array):
- **Line 200** — toggle "on" `border-color: var(--cg-color-surface-base-text)` uses body-text color as a border; ideally the toggle-on family, but `--cg-color-toggle-background-on` is a background token. Left as a flag.
- **Line 278** — keyboard handler only listens for `Enter`; add `Space` activation (with `preventDefault`) for the interactive row.
- **Toggle touch target** (lines 164-165) — ~32×20px, below 44px minimum; enlarge or expand the hit area (design change).
- **Line 40** — host `animation` uses bare `200ms`; could use `--cg-transition-duration-default`.

### Research-backed enhancements

Modern 2025-era feature-flag and toggle patterns (HeroUI v3 on React Aria, Linear's settings rows, Vercel/shadcn switch + command palette) converge on a few concrete moves this component is missing:

1. **Optimistic toggle with a pending/"saving" micro-state, not just on/off.** Feature flags almost always write to a backend, so the most modern pattern (Vercel dashboard flag toggles, LaunchDarkly's panel) is an optimistic flip plus a transient pending affordance: dim the thumb to ~70% opacity and run a 1–1.2s subtle pulse on the track until confirmation, reverting on failure. The current component is purely static (States Audit marks Loading/Error as "N/A"), which is the single biggest gap versus a real flag UI. Add a per-flag `pending`/`error` state driving a `--cg-color-toggle-background-on` → muted variant, so a failed write visibly snaps back instead of silently lying. (Pattern source: Vercel/LaunchDarkly optimistic-flag toggles.)

2. **Spring-eased thumb travel instead of linear `transform` transition.** Line 195 transitions `transform` on a generic fast/default curve; HeroUI v3 and Linear's switches use a short overshoot spring (e.g. `cubic-bezier(0.34, 1.56, 0.64, 1)` over ~180–220ms) so the thumb settles with a tiny bounce. This reads as the defining "premium toggle" tell in 2025 UIs. Define a `--cg-transition-easing-spring` tier-1 token and apply it only to the thumb `transform` to keep motion governed by tokens. (Pattern source: HeroUI v3 / Linear switch motion.)

3. **`/`-key focus on the search input + inline match highlighting.** Linear and shadcn's `Command` palette set the convention that any filterable list is one keystroke away: bind a global `/` (or Cmd/Ctrl+K) to focus `.search-input`, render a small kbd hint (`/`) right-aligned inside the field, and bold the matched substring in `.flag-name` results. This turns the existing search from a passive field into the primary navigation affordance for long flag lists. (Pattern source: Linear / shadcn Command + cmdk.)

4. **Promote the row to real `button`/`switch` semantics with a denser two-line layout.** The Interaction Audit already flags the `listitem`-with-click anti-pattern and the no-op hover. The modern Linear settings-row pattern is: the whole row is the hit target, `role="switch"` + `aria-checked` lives on the row (the visual switch is decorative), hover reveals a faint `--cg-color-surface-cards-hover-border` plus a 1px left accent bar, and the env/percentage metadata sits as muted trailing chips. This fixes the 44px touch-target miss (Line 113), the missing Space activation (Line 278), and the dead hover (Line 122) in one structural change. (Pattern source: Linear settings rows / Radix Switch a11y model.)

5. **Rollout-percentage affordance, not just binary on/off.** 2025 flag panels (Vercel, Statsig, HeroUI data-display patterns) increasingly show partial rollouts: a thin progress sliver under the flag name (e.g. "32% of users") using `--cg-color-toggle-background-on` at low alpha as a fill. Even if the data model stays boolean today, reserving a `rollout?: number` slot and rendering a 2px token-driven bar future-proofs the component toward gradual-rollout UX and adds information density the current single-line row lacks. (Pattern source: Vercel/Statsig progressive-rollout flag UIs.)

6. **Grouped sections with sticky count headers and a subtle staggered entrance.** The panel already groups Enabled/Disabled; modern dense lists (shadcn data tables, Linear grouped views) make those group labels sticky on scroll and apply a 20–30ms stagger to `.flag-item` entrance rather than animating the whole host once (Line 40). Drive the stagger off `--cg-transition-duration-fast` with an index-based delay so it stays token-governed and respects `prefers-reduced-motion`. (Pattern source: shadcn data-table / Linear grouped-list aesthetics.)

Sources: [shadcn/ui](https://ui.shadcn.com/), [HeroUI v3](https://heroui.com/), [Vercel Academy — shadcn/ui Core Concepts](https://vercel.com/academy/shadcn-ui/core-concepts), [ShadCN UI 2026 guide (Jishu Labs)](https://jishulabs.com/blog/shadcn-ui-component-library-guide-2026), [UI Component Libraries 2025 (Varbintech)](https://varbintech.com/blog/ui-component-libraries-5-must-try-picks-for-next-js-in-2025).
