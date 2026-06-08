## ai-presence — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 55 | animation duration | `var(--cg-transition-duration-fast)` | Yes | — |
| 55 | animation easing | `var(--cg-transition-easing-default)` | Yes | — |
| 58 | `--_avatar-size` (md) | `var(--cg-spacing-32)` | Yes (32px md avatar) | — |
| 59 | `--_overlap` (md) | `var(--cg-spacing-8)` | Yes | — |
| 63 | `--_avatar-size` (sm) | `var(--cg-spacing-24)` | Yes | — |
| 64 | `--_overlap` (sm) | `var(--cg-spacing-6)` | Yes | — |
| 67 | `--_avatar-size` (lg) | `var(--cg-spacing-40)` | Yes | — |
| 68 | `--_overlap` (lg) | `var(--cg-spacing-12)` | Yes | — |
| 82 | margin-left | `calc(-1 * var(--_overlap))` | Yes | — |
| 84 | transition (transform) | `var(--cg-transition-duration-default)` / `var(--cg-transition-easing-ease-out)` | Yes | — |
| 90 | transform translateY | `calc(-1 * var(--cg-spacing-4))` | Yes | — |
| 96 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 97 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-base-background)` | Yes | — |
| 98 | background | `transparent` | Yes (allowed keyword) | — |
| 99 | padding | `0` | Yes (allowed) | — |
| 101 | transition (transform) | `var(--cg-transition-duration-fast)` / `var(--cg-transition-easing-default)` | Yes | — |
| 103 | transform scale | `var(--cg-interaction-press-scale)` | Yes | — |
| 107 | box-shadow ring | `0 0 0 2px var(--cg-color-surface-base-background)` | Magic px (`2px`) | Flag — no exact 2px ring token; describe in report (not a verified token swap) |
| 108 | box-shadow ring | `0 0 0 calc(2px + var(--cg-border-width-100)) var(--cg-color-focus-ring)` | Magic px (`2px` in calc) | Flag — same; describe in report |
| 116-117 | width/height | `var(--_avatar-size)` | Yes | — |
| 118 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 119 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-base-background)` | Yes | — |
| 120 | background | `var(--cg-color-action-tertiary-background-hover)` | Acceptable tier-2 (subtle neutral fill) | — |
| 121 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 122 | font-size | `var(--cg-font-size-xs)` | Yes (badge meta, non-body) | — |
| 123 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 124 | margin-left | `calc(-1 * var(--_overlap))` | Yes | — |
| 131 | bottom | `calc(100% + var(--cg-spacing-8))` | Yes | — |
| 133 | transform translateY | `var(--cg-spacing-2)` | Yes | — |
| 134 | background | `var(--cg-color-modal-container-background)` | Tier-2; prefer `--cg-color-surface-tooltip-background` | See §6 |
| 135 | color | `var(--cg-color-surface-base-text)` | Acceptable; tooltip text token exists | See §6 |
| 136 | padding | `var(--cg-spacing-6) var(--cg-spacing-12)` | Yes | — |
| 137 | border-radius | `var(--cg-border-radius-100)` | Acceptable; tier-3 `--cg-component-tooltip-radius` exists | See §6 |
| 138 | font-size | `var(--cg-font-size-xs)` | Yes (tooltip meta) | — |
| 139 | line-height | `var(--cg-line-height-snug)` | Yes | — |
| 140 | max-width | `var(--cg-spacing-256)` | Yes | — |
| 144-145 | transition | `var(--cg-transition-duration-fast)` / `var(--cg-transition-easing-default)` / `-ease-out` | Yes | — |
| 147 | border | `var(--cg-border-width-50) solid var(--cg-color-modal-container-border)` | Tier-2; prefer tooltip border | See §6 |
| 148 | box-shadow | `var(--cg-elevation-2)` | Yes | — |
| 156-157 | width/height (arrow) | `var(--cg-spacing-8)` | Yes | — |
| 159 | background (arrow) | `var(--cg-color-modal-container-background)` | Tier-2; prefer tooltip background | See §6 |
| 160-161 | border (arrow) | `var(--cg-border-width-50) solid var(--cg-color-modal-container-border)` | Tier-2; prefer tooltip border | See §6 |
| 164 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 171 | margin-top | `var(--cg-spacing-2)` | Yes | — |
| 172 | color (meta) | `var(--cg-color-surface-container-outlined)` | Wrong family — `-outlined` is a border/divider token, not muted text | See §6 |
| 187-188 | width/height (skeleton) | `var(--_avatar-size)` | Yes | — |
| 189 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 190 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-base-background)` | Yes | — |
| 191 | margin-left | `calc(-1 * var(--_overlap))` | Yes | — |
| 197 | gradient stop color | `var(--cg-overlay-white-strong)` | Yes (shimmer overlay) | — |
| 200 | background base | `var(--cg-color-action-tertiary-background-hover)` | Acceptable tier-2 neutral | — |
| 203 | animation | `1.5s var(--cg-transition-easing-linear) infinite` | Bare `1.5s` literal duration | Flag — no shimmer-duration token in vocab; describe in report |

### 2. Styling Audit

- **Border radius:** All radii are `--cg-border-radius-full` (avatars/skeleton/badge — correct, circular) and `--cg-border-radius-100` (tooltip). A tier-3 `--cg-component-tooltip-radius` exists and would be the more correct first choice for the tooltip. No bias/component-presence radius token exists, so `full` is fine for the circular elements.
- **Spacing:** Fully tokenized via the per-size `--_avatar-size` / `--_overlap` custom properties and `--cg-spacing-*`. Clean, no magic numbers.
- **Font-size accessibility:** Only `--cg-font-size-xs` is used, on the overflow badge ("+N") and the tooltip name/meta. These are decorative/secondary labels (badge counter, hover tooltip), not body copy, so the <14px body-text rule does not strictly apply. Still, the tooltip name is the primary identifying text on hover — consider `--cg-font-size-sm` for the name to improve legibility. Noted, not blocking.
- **Translucent vs solid borders:** Avatar outline ring uses `--cg-color-surface-base-background` (solid, intentional — it's a "cut-out" ring matching the page bg, correct technique for overlapping stacks). Tooltip border is solid via modal-container-border. Fine.
- **Transitions:** All explicit property lists (`transform`, `opacity`). No `transition: all`. Motion tokens used throughout. `prefers-reduced-motion` block (lines 207-215) correctly disables host animation, wrapper/btn transitions, tooltip transition, and skeleton shimmer. Excellent motion hygiene.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic tokens which are dark-first. Skeleton shimmer uses `--cg-overlay-white-strong` over a neutral base — works on dark. No raw colors. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Avatar stack with overlap, outline ring | — |
| Hover | Yes | `:hover` lifts wrapper (`translateY(-spacing-4)`), raises z-index to 10, reveals tooltip | Good |
| Active/Press | Yes | `.avatar-btn:active` scales by `--cg-interaction-press-scale` | Good |
| Focus-visible | Yes | `.avatar-btn:focus-visible` double box-shadow ring with `--cg-color-focus-ring`; `:focus-within` also lifts + shows tooltip | Ring uses magic `2px` literals (see §2/§6 flags) but is functional and keyboard-accessible |
| Disabled | N/A | Presence is a read-only display of users; no disabled concept | — |
| Loading | Yes | `loading` prop renders shimmer skeletons (`aria-busy`, `aria-label="Loading presence"`) | Good — count capped at 4, dark-safe shimmer |
| Error | N/A | No async fetch owned by component; consumer supplies users | — |
| Success | N/A | Not an action component | — |

### 4. Interaction Audit

- **Keyboard:** Each visible avatar is a real `<button>`, so it is natively focusable and Enter/Space activates `_handleUserClick`. `:focus-within` reveals the tooltip on keyboard focus — strong. The "+N" overflow badge is a non-interactive `<span>` (cursor: default), which is appropriate.
- **ARIA:** Container has `role="group"`, `aria-label="Active users"`, `aria-live="polite"` (presence changes announced — good). Loading container uses `aria-busy="true"` + label. Each button has a composed `aria-label` with name + status + optional last-seen. Tooltip has `role="tooltip"`. Overflow badge has `aria-label="N more users"`. ARIA coverage is thorough.
- **CustomEvents:** `ai-presence-user-click` fires with `detail: { user }`, `bubbles: true`, `composed: true` — escapes shadow DOM correctly. Matches the `@fires` JSDoc.
- **Touch targets:** md avatar button = 32px, sm = 24px, lg = 40px. All are below the 44px minimum touch target. This is a sizing/design concern (avatar stacks are conventionally compact), described here only — not a token violation.

### 5. Visual Design Check

Modern and sleek: overlapping avatar stack with cut-out outline rings, hover-lift with z-index promotion, a polished multi-line tooltip with a rotated arrow, and a dark-safe gradient shimmer skeleton. Radius is correct (circular). Breathing room via negative-margin overlap is intentional and reads well. Typography hierarchy in the tooltip (semibold name + muted meta) is appropriate. Reduced-motion fully handled. The only blemishes are the muted-meta color pointing at a border token (`-outlined`) rather than a text token, the tooltip borrowing modal tokens instead of the dedicated tooltip family, and two hard-coded `2px` literals in the focus ring. Showcase-ready after those tidy-ups.

Verdict: **strong**

### 6. Fixes Needed

1. **Line 172 — wrong token family for muted tooltip meta text.**
   - Current: `color: var(--cg-color-surface-container-outlined);`
   - Fixed: `color: var(--cg-color-surface-container-subtle);`
   - Why: `-outlined` is a border/outline token, not a text color. The meta line is secondary text; `--cg-color-surface-container-subtle` is the muted-text token in the same family and exists in the vocab. (Token verified.)

2. **Lines 134 / 159 — tooltip uses modal-container background instead of the dedicated tooltip token.**
   - Current: `background: var(--cg-color-modal-container-background);`
   - Fixed: `background: var(--cg-color-surface-tooltip-background);`
   - Why: A semantic tooltip surface family exists (`--cg-color-surface-tooltip-*`). The tooltip and its arrow should use it rather than borrowing modal tokens, so theme overrides on tooltips apply correctly. Both occurrences (panel bg line 134 and arrow bg line 159). (Token verified.)

3. **Lines 147 / 160 / 161 — tooltip border uses modal-container border instead of the tooltip border token.**
   - Current: `solid var(--cg-color-modal-container-border)`
   - Fixed: `solid var(--cg-color-surface-tooltip-border)`
   - Why: Match the dedicated tooltip family (panel border line 147, arrow border-right line 160, arrow border-bottom line 161). (Token verified.)

**Flags (no verified token swap — described, not auto-fixed):**

- **Lines 107-108 — focus ring uses hard-coded `2px` literals** inside the box-shadow (`0 0 0 2px ...` and `calc(2px + var(--cg-border-width-100))`). These are magic px on a visual ring width. There is no exact 2px ring-width token in the vocab (`--cg-border-width-100` is 1px-class). Recommend deriving the ring from border-width tokens (e.g. layering `--cg-border-width-50`/`-100`) rather than literal `2px`, but no single token cleanly equals `2px`, so no mechanical replacement is proposed.
- **Line 203 — bare `1.5s` shimmer duration literal.** No `--cg-component-*-shimmer-duration` or matching transition-duration token equals 1.5s in the vocab (`--cg-ai-effect-shimmer-duration` exists in the ALL list but is an `--cg-ai-*` tier-1 effect token, not a tier-2/3 component duration). Recommend introducing/using a shimmer-duration token; no verified drop-in available, so left as a flag.
- **Touch targets (24/32/40px) below 44px** — design/sizing consideration for the avatar buttons, not a token violation.
- **Tooltip name at `--cg-font-size-xs`** — consider `--cg-font-size-sm` for the primary identifying line; minor legibility nicety, not a strict body-text violation.

### Research-backed enhancements

Concrete modernizations for `ai-presence`, grounded in current (2025-era) presence/avatar patterns from HeroUI, shadcn/ui, Linear, and Vercel.

1. **Add a live status dot per avatar (online / idle / offline), not just the aggregate label.** HeroUI's Avatar ships a dedicated presence/badge slot positioned at the avatar corner (`isBordered` + badge composition); the de-facto realtime pattern (Linear/Figma cursors, LiveKit's shadcn agent UI) is a small colored ring-cut dot bottom-right. `ai-presence` currently encodes status only in the `aria-label` and tooltip text. Add an optional 8px (`--cg-spacing-8`) dot with the same cut-out `border` technique already used on the avatars, colored from tier-2 status tokens (`--cg-color-status-success-*` online, `-warning-*` idle, neutral subtle offline). This makes per-user state glanceable without hover — the component's core job. (Pattern: HeroUI Avatar badge slot; Linear/Figma realtime presence dots.)

2. **Animate presence join/leave instead of instant DOM swaps.** Linear and Vercel dashboards animate avatars entering a stack with a brief scale-from-0.9 + fade, and shifting the overlap on departure, so the user perceives "someone just joined." Pair the existing `aria-live="polite"` announcement with a FLIP-style enter transition on new avatars using the already-present `--cg-transition-duration-default` / `--cg-transition-easing-ease-out`, gated behind the existing `prefers-reduced-motion` block. Today new users pop in with no transition. (Pattern: Linear/Vercel realtime collaborator stacks.)

3. **Make the "+N" overflow an interactive popover, not a dead `<span>`.** shadcn/ui composes overflow counts into a Popover/HoverCard listing the hidden members; HeroUI's AvatarGroup exposes a `renderCount` for exactly this. Promote the overflow badge to a focusable `<button>` that opens a roster popover (reuse the existing tooltip surface tokens once §6 fixes land) listing every overflowed user with name + status dot. This recovers access to users currently hidden behind the cap and fixes the truncation dead-end. (Pattern: shadcn/ui HoverCard/Popover overflow; HeroUI AvatarGroup `renderCount`.)

4. **Tighten density and add a `max`/`spacing` knob.** HeroUI AvatarGroup exposes `max` and `isGrid`, and shadcn stacks tune overlap with negative `space-x`. Currently overlap is fixed per size. Expose the cap (today hard-coded at the overflow threshold) and the `--_overlap` ratio as reflected attributes so dense headers can show a tighter, more compact stack — matching the compact, information-dense aesthetic of Linear's top bar. (Pattern: HeroUI AvatarGroup `max`; Linear compact toolbar density.)

5. **Add an empty/zero-users state.** The states audit lists Empty as uncovered. shadcn and HeroUI patterns degrade gracefully to a muted placeholder ("No one here yet" / ghost avatar) rather than rendering nothing. Add a minimal empty slot using `--cg-color-surface-container-subtle` text so a 0-user room reads intentionally rather than as a layout gap. (Pattern: shadcn/ui fallback/empty composition.)

6. **Promote the tooltip name to `--cg-font-size-sm` and add a subtle elevation-on-hover.** Modern stacks (Vercel, Linear) lift the hovered avatar with a soft shadow, not just `translateY`. The component already lifts with `translateY(-spacing-4)`; layering an `--cg-elevation-2` on the hovered `.avatar-btn` (matching the tooltip's existing elevation) reinforces the depth cue and reads more "2025." Combine with the §2 note to bump the primary tooltip name to `sm` for legibility. (Pattern: Vercel/Linear hover-lift + shadow on collaborator avatars.)

Sources:
- [HeroUI Avatar (badge / AvatarGroup max, renderCount)](https://www.heroui.com/docs/components/avatar)
- [shadcn/ui Avatar](https://ui.shadcn.com/docs/components/radix/avatar)
- [shadcn/ui Components (Popover / HoverCard composition)](https://ui.shadcn.com/docs/components)
- [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
