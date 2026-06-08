## ai-memory-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | background | `--cg-color-surface-cards-background` | ✅ | — |
| 29 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 30 | border-radius | `--cg-border-radius-100` | ✅ | — |
| 35 | border-radius | `0` | ✅ | 0 is allowed |
| 36 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 37 | border-radius | `--cg-border-radius-100` | ✅ | — |
| 38 | border-radius | `--cg-border-radius-150` | ✅ | — |
| 42-44 | background/border/radius | transparent / none / 0 | ✅ | inline variant reset, allowed |
| 50 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | ✅ | — |
| 53 | padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | — |
| 54 | font-size | `--cg-font-size-sm` | ✅ | — |
| 54 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 55 | color | `--cg-color-surface-container-outlined` | ✅ | tier-2 muted text |
| 57 | border-bottom | `--cg-border-width-100` solid transparent | ✅ | — |
| 59 | transition | color `--cg-transition-duration-fast` `--cg-transition-easing-default` | ✅ | explicit property |
| 61 | color | `--cg-color-surface-base-text` | ✅ | — |
| 63-64 | color/border | `--cg-color-action-primary-background-default` | ⚠️ | action-*-background used as text/border accent; tier-2 so allowed, but see §2 note |
| 65 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 68 | font-size | `--cg-font-size-xs` | ✅ | count badge, metadata |
| 69 | margin-left | `--cg-spacing-4` | ✅ | — |
| 70 | opacity | `0.5` | ✅ | unitless opacity allowed |
| 74 | padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | — |
| 76 | width | `100%` | ✅ | % allowed |
| 77 | padding | `--cg-spacing-12` `--cg-spacing-16` | ✅ | — |
| 78 | border-radius | `--cg-border-radius-100` | ✅ | — |
| 79 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | ✅ | — |
| 80 | background/color | transparent / `--cg-color-surface-base-text` | ✅ | — |
| 81 | font-size | `--cg-font-size-xs` | ❌ | body INPUT text < 14px → `--cg-font-size-sm` |
| 83 | border-color (focus) | `--cg-color-input-border-focus` | ✅ | — |
| 84 | placeholder color | `--cg-color-surface-container-outlined` | ⚠️ | works, but `--cg-color-input-text-placeholder` is the dedicated token (see §2) |
| 87 | max-height | `320px` | ❌ | bare magic px; no matching token exists — flagged, no verified fix |
| 87 | padding | `--cg-spacing-12` `0` | ✅ | — |
| 90 | gap | `--cg-spacing-8` | ✅ | — |
| 91 | padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | — |
| 92 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 93 | margin | `0` `--cg-spacing-8` | ✅ | — |
| 94 | transition | background `--cg-transition-duration-fast` `--cg-transition-easing-default` | ✅ | explicit |
| 97 | background (hover) | `--cg-overlay-dark-subtle` | ✅ | tier-1 overlay, allowed |
| 98 | background (pinned) | `--cg-overlay-accent-subtle` | ✅ | tier-1 overlay, allowed |
| 101 | gap | `--cg-spacing-12` | ✅ | — |
| 105-107 | font-size/color/weight | `--cg-font-size-xs` / `--cg-color-action-primary-background-default` / `--cg-font-weight-medium` | ⚠️ | xs OK (label); action-bg-as-text accent (see §2) |
| 112 | font-size/color | `--cg-font-size-xs` / `--cg-color-surface-container-outlined` | ✅ | metadata caption |
| 117 | font-size/color | `--cg-font-size-sm` / `--cg-color-surface-base-text` | ✅ | body content meets 14px min |
| 118 | line-height | `--cg-line-height-snug` | ✅ | — |
| 123 | top/right | `--cg-spacing-8` / `--cg-spacing-16` | ✅ | — |
| 124 | gap | `--cg-spacing-2` | ✅ | — |
| 125 | transition | opacity `--cg-transition-duration-fast` `--cg-transition-easing-default` | ✅ | explicit |
| 130 | width/height | `--cg-spacing-20` / `--cg-spacing-20` | ✅ | sized from scale (~20px button, see §4) |
| 132 | color | `--cg-color-surface-container-outlined` | ✅ | — |
| 134 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 135 | transition | color `--cg-transition-duration-fast` `--cg-transition-easing-default` | ✅ | explicit |
| 137 | svg width/height | `--cg-spacing-12` / `--cg-spacing-12` | ✅ | — |
| 138 | color (hover) | `--cg-color-surface-base-text` | ✅ | — |
| 139 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | ❌ | bare `3px` spread → `var(--cg-focus-ring-width)` |
| 140 | color | `--cg-color-action-primary-background-default` | ⚠️ | action-bg as icon accent (see §2) |
| 143 | padding | `--cg-spacing-24` `--cg-spacing-20` | ✅ | — |
| 144 | color | `--cg-color-surface-container-outlined` | ✅ | — |
| 145 | font-size | `--cg-font-size-xs` | ✅ | empty-state caption |
| 150 | padding | `--cg-spacing-6` `--cg-spacing-12` | ✅ | — |
| 151 | font-size | `--cg-font-size-xs` | ⚠️ | compact variant content drops below 14px; density tradeoff (see §2) |

### 2. Styling Audit

- **Border radius:** Fully tokenized (`--cg-border-radius-50/100/150`), with a clean `rounded` prop mapping none/sm/md/lg. Good.
- **Spacing:** Every padding/margin/gap pulls from the `--cg-spacing-*` scale. No magic spacing values.
- **Font-size accessibility (14px min body):** Two concerns. (1) `.search-input` (line 81) uses `--cg-font-size-xs` — this is interactive body input text the user types into and should be `--cg-font-size-sm` (14px min). (2) The compact-variant `.memory-content` (line 151) drops to xs; this is the primary content string, not metadata — acceptable only as a deliberate density tradeoff for the sidebar variant, but worth noting. Main `.memory-content` (line 117) correctly uses sm. All other xs usages (tab-count, memory-type, memory-meta, empty) are metadata/labels/captions and are fine.
- **Translucent vs solid borders:** Panel/tabs/search borders use solid `--cg-color-surface-cards-*` tokens. Hover/pinned backgrounds use translucent `--cg-overlay-*` tokens which layer correctly over the card surface — good dark-theme practice.
- **Transitions explicit vs all + motion tokens:** No `transition: all`. Every transition enumerates a single property (color / background / opacity) and uses `--cg-transition-duration-fast` + `--cg-transition-easing-default`. Compliant. (Note: the project also exposes `--cg-motion-duration-*`/`--cg-motion-easing-*`; the `--cg-transition-*` family used here is valid.)
- **Placeholder color:** Line 84 uses `--cg-color-surface-container-outlined` for the placeholder. A dedicated `--cg-color-input-text-placeholder` token exists and is the more semantically correct choice — minor.
- **Accent text color:** Lines 63/64/106/140 use `--cg-color-action-primary-background-default` as a text/border/icon accent. It is a tier-2 semantic token so not a hard violation, but it is a *background* token being repurposed for foreground; if a primary text/accent semantic exists it would read cleaner. Left as-is (no clearer verified token for "primary accent text on card").
- **Dark-theme suitability:** Strong. Card surface + overlay layering, muted-outlined text for secondary content, and base-text for primary content all map to the dark-first palette.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.panel`, `.tab`, `.memory`, `.mem-btn` base styles | — |
| Hover | ✅ | `.tab:hover`, `.memory:hover` (bg + reveals actions), `.mem-btn:hover` | — |
| Active/Press | ⚠️ Partial | `.tab.active` reflects selected tab (state), but no `:active` press feedback on buttons | No tactile press state on tab/mem-btn; minor |
| Focus-visible | ⚠️ Partial | `.mem-btn:focus-visible` has a box-shadow ring; `.search-input:focus` has border-color change | Tabs (`.tab`) have NO focus-visible style — keyboard users can't see which tab is focused (a11y gap). Search input uses `:focus` not `:focus-visible`. |
| Disabled | N/A | No disabled affordance defined | N/A — component has no disabled mode |
| Loading | N/A | Memory arrays are passed in; no async/loading UI | N/A — caller owns data fetching |
| Error | N/A | No error surface | N/A — display-only viewer |
| Success | N/A | — | N/A — not an action-confirmation component |

Empty state IS handled (line 209-210: "No matches" / "No memories yet").

### 4. Interaction Audit

- **Keyboard keys:** Tabs and action buttons are real `<button>` elements, so Enter/Space activate natively and they are tab-focusable. However tabs are not wired as an ARIA tablist (no roving tabindex / ArrowLeft-Right), so keyboard tab-switching is one-button-at-a-time rather than the expected tab pattern.
- **ARIA roles/labels/states:** Panel has `role="region"` + `aria-label="Agent memory"` — good. Pin/Delete buttons have dynamic `aria-label` ("Pin"/"Unpin", "Delete") — good. Gaps: tab buttons lack `role="tab"`/`aria-selected`, the tab container lacks `role="tablist"`, and the memory list lacks `role="list"`/`aria-live` (new memories won't be announced). The search input has a `placeholder` but no `aria-label`/`<label>`.
- **CustomEvents + detail correctness:** Three events, all `bubbles: true, composed: true` (correctly cross the shadow boundary):
  - `ai-memory-search` → `{ query }` ✅ (debounced 250ms, line 201)
  - `ai-memory-pin` → `{ id, pinned: !m.pinned }` ✅ (emits the new pinned state)
  - `ai-memory-delete` → `{ id, type: this._activeTab }` ⚠️ JSDoc (line 5) documents `detail` as `{ id, type }` where `type` should be the memory `type` ('fact'|'preference'|…); the code instead sends the active tab ('short'|'long'). Either the JSDoc or the payload is wrong — payload/contract mismatch.
- **Touch targets ≥44px:** `.mem-btn` is `--cg-spacing-20` square (~20px) with a 12px icon — well below the 44px touch-target minimum. This is a sizing/design change (not a token violation) — recommend enlarging the hit area (e.g. padding or min 44px tap region) for touch. Tabs are tall enough (16px vertical padding + text).

### 5. Visual Design Check

Modern and clean: bordered card, tabbed short/long-term split, debounced search, hover-revealed pin/delete actions, relative timestamps, and a tasteful pinned-accent background. Radius is tokenized and configurable. Breathing room is good (16/20 padding, 8 gap). Divider usage is correct (tab underline + card border). Typography hierarchy is mostly sound (sm content, xs metadata) but the active-tab accent leans on an action-background token and the search input text is undersized. Hover-only action reveal hurts discoverability/touch and the tabs lack visible keyboard focus — these keep it just short of a flawless showcase. Verdict: **strong**.

### 6. Fixes Needed

1. **Line 81** — undersized interactive body text.
   - Current: `font: inherit; font-size: var(--cg-font-size-xs); outline: none;`
   - Fixed: `font: inherit; font-size: var(--cg-font-size-sm); outline: none;`
   - Why: the search input is body text the user reads and types; it must meet the 14px (`--cg-font-size-sm`) minimum.

2. **Line 139** — bare magic px in focus ring.
   - Current: `.mem-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); opacity: 1; }`
   - Fixed: `.mem-btn:focus-visible { outline: none; box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong); opacity: 1; }`
   - Why: `3px` is a raw magic value; `--cg-focus-ring-width` is the governed token for focus-ring thickness.

**Flagged (no verified replacement token — not auto-fixed):**
- Line 87 `max-height: 320px` is a bare magic px. No matching `--cg-component-ai-memory-panel-*` or generic max-height token exists in the vocab; needs a new tier-3 token to be added (do not invent inline).

**Non-token recommendations (design, not in fixes array):** add `role="tablist"`/`role="tab"`/`aria-selected` + arrow-key navigation and a visible `.tab:focus-visible` ring; give `.mem-btn` a ≥44px touch target; add an `aria-label` to the search input; reconcile the `ai-memory-delete` detail (`type` = memory type vs. active tab) with the JSDoc contract; consider `--cg-color-input-text-placeholder` for the placeholder.

### Research-backed enhancements

Patterns drawn from a scan of modern 2025 list-panel implementations (shadcn/ui List Panel + the new `Item`/`Empty`/`Kbd` primitives, HeroUI v3 on React Aria, Linear/Vercel command-surface conventions).

1. **Keep row actions visible at low opacity instead of hidden-until-hover (shadcn List Panel "hover-revealed row actions").** The current pin/delete buttons are fully hidden until `.memory:hover`, which is the discoverability/touch gap already flagged in §4. The shadcn list-panel convention renders the action cluster persistently at reduced opacity (~`0.4`) and lifts it to `1` on row hover/focus-within. This preserves the clean look, signals affordance to first-time and touch users, and removes the "invisible on mobile" problem. Wire it to `:focus-within` too so keyboard users see actions when tabbing into a row.

2. **Add a `density`/`size` prop (shadcn `Item size="sm"` dense-list pattern).** The compact-variant `.memory-content` currently hard-drops to `xs` (the §2 a11y tradeoff). Promote density to a first-class `size: 'comfortable' | 'compact'` prop that scales row padding (`--cg-spacing-16/20` → `--cg-spacing-8/12`) and gap while keeping content text at `--cg-font-size-sm`. Density is the right lever for an agent memory panel that can hold many rows; do it via spacing, not by shrinking readable text below 14px.

3. **Make search a real command-surface affordance with a `⌘K`/`/` `Kbd` hint (Linear/Vercel + shadcn `Kbd` primitive).** Render a trailing keyboard-shortcut chip inside the search input (a tokenized `Kbd` element) and bind a global `/` or `⌘K` to focus it. 2025 list/command panels treat search as the primary navigation verb; the hint advertises it and reduces hunting. Pairs with the missing search `aria-label` fix.

4. **Add a leading type-glyph + colored accent rail per memory row (shadcn "list rows with leading icons" + HeroUI accent conventions).** Memories already carry a `type` ('fact'|'preference'|…). Give each row a small leading icon and a 2px left accent rail keyed to the type via tier-2 status colors, so users scan by category at a glance instead of reading the `memory-type` label. This also gives the pinned state a stronger visual anchor than the current subtle overlay background alone.

5. **Use a spring/transform micro-animation for row enter/exit and pin reorder (HeroUI v3 React-Aria motion + Linear list transitions).** New memories currently just appear (and with no `aria-live`, §4). Animate row insertion with a short translate-Y + opacity fade-in (transform-based, GPU-friendly) and animate pin/unpin reordering rather than snapping. Keep it within the existing `--cg-transition-duration-fast`/`--cg-motion-*` budget and gate it behind `prefers-reduced-motion`. Motion here doubles as the visual "something changed" signal that the live-region announcement covers for screen readers.

6. **Upgrade the empty state to the structured `Empty` primitive pattern (shadcn `Empty` component, 2025).** The current empty state is a single muted caption ("No memories yet" / "No matches"). The modern pattern is a centered icon + title + one-line description + an optional primary action. For the no-results case, surface a "Clear search" action; for the truly-empty case, a one-liner on how the agent populates memory. Turns a dead end into an oriented, actionable surface.

**Sources:**
- [shadcn/ui List Panel components (Shadcnblocks)](https://www.shadcnblocks.com/components/list-panel)
- [How Shadcn's New Components Redefine Modern UI Design (2025)](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e)
- [HeroUI v3 (formerly NextUI)](https://heroui.com/)
- [shadcn/ui components index](https://ui.shadcn.com/docs/components)
