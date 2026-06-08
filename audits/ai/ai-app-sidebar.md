## ai-app-sidebar — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 49 | animation duration/easing | `var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | Clean — tier-1 motion tokens, no fallback. |
| 51 | display (hidden host) | `none` | Yes | Legitimate raw keyword. |
| 56 | height | `100%` | Yes | Legitimate percentage. |
| 57 | background | `var(--cg-color-surface-sidebar-background)` | Yes | Correct tier-2 sidebar surface. |
| 58 | border-right | `var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-border)` | Yes | Correct tier-1 width + tier-2 color. |
| 59 | width | `var(--ai-sidebar-width, 240px)` | **No** | Comma-fallback with bare magic px. `--ai-sidebar-width` is a fine public hook, but fallback must be the tier-3 token `var(--cg-component-sidebar-width)` (280px), not `240px`. |
| 61 | transition | `width var(--cg-transition-duration-default) var(--cg-transition-easing-default)` | Yes | Explicit property, tokenized — not `transition: all`. |
| 64 | width (collapsed) | `var(--ai-sidebar-collapsed-width, 56px)` | **No** | Comma-fallback with bare magic px. Fallback should be `var(--cg-component-sidebar-collapsed-width)` (64px). |
| 71 | background (btn) | `none` | Yes | Legitimate keyword. |
| 72 | border | `none` | Yes | Legitimate keyword. |
| 73 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-sidebar-border)` | Yes | Correct. |
| 74 | color | `var(--cg-color-surface-sidebar-text)` | Yes | Correct tier-2. |
| 75 | padding | `var(--cg-spacing-12)` | Yes | Tokenized. (See touch-target note in §4.) |
| 77 | font-size | `var(--cg-font-size-sm)` | Yes | 14px — meets body-min. |
| 78 | transition | `color ...fast ...default` | Yes | Explicit, tokenized. |
| 81 | color (hover) | `var(--cg-color-surface-base-text)` | Yes | Correct tier-2. |
| 84 | outline | `var(--cg-border-width-100) solid var(--cg-color-focus-ring)` | Yes | Correct tier-1 width + tier-2 focus token. |
| 85 | outline-offset | `calc(-1 * var(--cg-border-width-100))` | Yes | Tokenized calc. |
| 91 | padding | `var(--cg-spacing-8) 0` | Yes | Tokenized; `0` legitimate. |
| 95 | padding | `var(--cg-spacing-8) var(--cg-spacing-16) var(--cg-spacing-4)` | Yes | Tokenized. |
| 96 | font-size | `var(--cg-font-size-xs)` | Yes | Section eyebrow label, not body text — xs acceptable for uppercase category label. |
| 97 | font-weight | `var(--cg-font-weight-semibold)` | Yes | Tokenized. |
| 99 | letter-spacing | `var(--cg-letter-spacing-wide)` | Yes | Real tier-1 token (0.025em). |
| 100 | color | `var(--cg-color-surface-sidebar-text)` | Yes | Correct. |
| 107 | padding (collapsed) | `0` | Yes | Legitimate. |
| 113 | gap | `var(--cg-spacing-8)` | Yes | Tokenized. |
| 114 | width | `100%` | Yes | Percentage. |
| 115 | padding | `var(--cg-spacing-8) var(--cg-spacing-16)` | Yes | Tokenized (touch-target note §4). |
| 118 | color | `var(--cg-color-surface-sidebar-text)` | Yes | Correct. |
| 119 | font-size | `var(--cg-font-size-sm)` | Yes | 14px body min met. |
| 125–128 | transition | `background-color/color/transform ...fast ...default` | Yes | Explicit enumerated list — compliant. |
| 132 | padding (collapsed) | `var(--cg-spacing-8) 0` | Yes | Tokenized. |
| 135 | background (hover) | `var(--cg-color-surface-sidebar-hover-background)` | Yes | Correct tier-2. |
| 136 | color (hover) | `var(--cg-color-surface-base-text)` | Yes | Correct. |
| 138 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | Real tier-1 token (0.97). |
| 140 | outline (focus) | `var(--cg-border-width-100) solid var(--cg-color-focus-ring)` | Yes | Correct. |
| 141 | outline-offset | `calc(-1 * var(--cg-border-width-100))` | Yes | Tokenized. |
| 144 | background (current) | `var(--cg-color-surface-sidebar-active-background)` | Yes | Correct tier-2 active surface. |
| 145 | color (current) | `var(--cg-color-surface-base-text)` | Yes | Correct. |
| 150 | width (icon) | `var(--cg-spacing-16)` | Yes | Tokenized icon slot. |
| 152 | font-size (icon) | `var(--cg-font-size-sm)` | Yes | Tokenized. |
| 153 | color (icon) | `inherit` | Yes | Legitimate. |
| 167 | padding (badge) | `var(--cg-spacing-1) var(--cg-spacing-6)` | Yes | Tokenized. |
| 168 | font-size (badge) | `var(--cg-font-size-xs)` | Yes | Badge label, xs acceptable. |
| 169 | font-weight (badge) | `var(--cg-font-weight-semibold)` | Yes | Tokenized. |
| 170 | border-radius (badge) | `var(--cg-border-radius-100)` | Yes | Tier-1 radius; acceptable (no tier-3 sidebar-badge radius exists). |
| 171 | background (badge) | `var(--cg-overlay-accent-strong)` | **No** | Tier-1 overlay used as a semantic badge fill. There is a dedicated tier-2 `--cg-color-badge-background-default`. Wrong tier. |
| 172 | color (badge) | `var(--cg-color-surface-base-text)` | **No** | Badge text should pair with the badge bg: use `--cg-color-badge-text-default`. |

All other declarations are clean. No raw hex/rgba in CSS, no banned `--cg-gray/red/blue/brand-*`, no `transition: all`, no made-up token names.

### 2. Styling Audit
- **Border radius:** Only the badge uses radius (`--cg-border-radius-100`) — appropriate for a small pill counter. The sidebar shell and items are intentionally square-edged, which is correct for a full-height app rail.
- **Spacing generosity:** Consistent 8/16/12 rhythm from the scale; section title gets a clear top/bottom breath. Adequate but on the dense side (see touch targets).
- **Font-size accessibility:** Item and collapse-button body text are `--cg-font-size-sm` (14px) — meets the 14px minimum. Section title and badge are `xs`, acceptable as uppercase eyebrow/counter labels rather than body copy.
- **Translucent vs solid borders:** Borders use `--cg-color-surface-sidebar-border` (semantic) with `--cg-border-width-50` hairline — correct, not a raw 1px.
- **Transitions:** Fully explicit and enumerated (width; and background-color/color/transform on items). No `transition: all`. Motion tokens used throughout, and the file imports `reducedMotion` for prefers-reduced-motion handling. Strong.
- **Dark-theme background:** `--cg-color-surface-sidebar-background` is a dedicated dark-first sidebar surface — suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.item` base + `.sidebar` shell, sidebar-text color | None. |
| Hover | Yes | `.item:hover` bg + text brighten; `.collapse-btn:hover` text brighten | None. |
| Active/Press | Yes | `.item:active { transform: scale(--cg-interaction-press-scale) }` | None — good tactile feedback. |
| Focus-visible | Yes | `.item:focus-visible` and `.collapse-btn:focus-visible` ring + negative offset | None — correct focus token + inset offset. |
| Disabled | N/A | — | Items are data-driven nav buttons with no disabled affordance in `SidebarItem`. Justification: no disabled state modeled in the data interface. |
| Loading | N/A | — | Static data-driven list; no async per-item loading concept. Host has fade-in entrance only. |
| Error | N/A | — | Sidebar renders provided sections; no error surface. Justification: error display is the parent app's concern. |
| Success | N/A | — | Not applicable to a navigation rail. |
| Selected/Current | Yes (extra) | `.item[aria-current="true"]` active background + brighter text | Works, but `aria-current="true"` is non-standard for nav; `page` is the correct value (see §4). |

### 4. Interaction Audit
- **Keyboard:** Each item and the collapse control are native `<button>`s, so Enter/Space activation is free, and Tab focus order works. **Missing:** Arrow-key roving navigation between items — expected for a `menu`/`menubar` pattern, and the items are explicitly given `role="menuitem"`.
- **ARIA roles:** **Mismatch.** Items use `role="menuitem"` (line 215) but the container is `role="navigation"` (line 203). `menuitem` is only valid inside a `menu`/`menubar`. For an app nav rail the items should not carry `menuitem` at all — a `<nav>` of links/buttons is the correct pattern. Either drop `role="menuitem"` (let them be plain buttons in the nav) or switch the container to `menubar` + add arrow-key roving. Recommended: drop `menuitem`.
- **ARIA states:** `aria-current` is toggled per item (line 218), good — but value is `'true'`/`'false'`. The spec value for the current page in navigation is `aria-current="page"`. `aria-label=${item.label}` on the button (line 219) is redundant with the visible label text but harmless.
- **`aria-label`:** Nav landmark labelled "Sidebar navigation" (line 203); collapse button has a dynamic, state-aware label (line 207) — excellent.
- **CustomEvents:** `ai-app-sidebar-collapse` (detail `{collapsed}`) and `ai-app-sidebar-item-click` (detail `{id, label}`) both `bubbles: true, composed: true` — correct and detail matches the documented `@fires` JSDoc. Clean.
- **Touch targets:** Items are `font-size-sm` text + `spacing-8` vertical padding ≈ ~30–32px tall; collapse button is `spacing-12` padding + ~14px glyph ≈ ~38px. Both fall **below the 44px** target. The collapse button in collapsed mode (56px-wide rail) is the most-affected primary control. Recommend a `min-height` on `.item` and `.collapse-btn`.

### 5. Visual Design Check
Modern and clean: dedicated sidebar surface tokens, smooth width transition on collapse, press-scale micro-interaction, dynamic collapse affordance, and an entrance fade. Square edges suit a full-height rail; the badge pill adds the one needed accent. Typography hierarchy is clear (uppercase tracked eyebrow → 14px items → xs counter). Dividers exist under the collapse button and via the border-right. Two things hold it back from a HeroUI/Vercel showcase bar: the under-44px touch targets and the `menuitem`-without-`menu` ARIA mismatch. Token hygiene is otherwise near-perfect. Verdict: **adequate**.

### 6. Fixes Needed
1. **Line 59 — px comma-fallback.** Current: `width: var(--ai-sidebar-width, 240px);` → Fixed: `width: var(--ai-sidebar-width, var(--cg-component-sidebar-width));`. Why: a bare magic `240px` fallback violates the no-magic-number rule; the real tier-3 token `--cg-component-sidebar-width` (280px) is the correct default source.
2. **Line 64 — px comma-fallback.** Current: `width: var(--ai-sidebar-collapsed-width, 56px);` → Fixed: `width: var(--ai-sidebar-collapsed-width, var(--cg-component-sidebar-collapsed-width));`. Why: same — replace magic `56px` with the tier-3 `--cg-component-sidebar-collapsed-width` (64px), which also fixes the under-44px-wide collapsed rail.
3. **Line 171 — badge background wrong tier.** Current: `background: var(--cg-overlay-accent-strong);` → Fixed: `background: var(--cg-color-badge-background-default);`. Why: a tier-1 overlay should not be a semantic badge fill; the dedicated tier-2 badge token is the correct choice.
4. **Line 172 — badge text token.** Current: `color: var(--cg-color-surface-base-text);` → Fixed: `color: var(--cg-color-badge-text-default);`. Why: badge text must pair with the badge background token for guaranteed contrast.
5. **Line 215 — invalid ARIA role.** Current: `role="menuitem"` → Fixed: remove the `role="menuitem"` attribute (leave the native `<button>` inside the `role="navigation"` landmark). Why: `menuitem` is only valid inside a `menu`/`menubar`; here it produces a broken AX tree and implies arrow-key navigation that isn't wired up.
6. **Line 218 — aria-current value.** Current: `aria-current=${item.id === this.activeId ? 'true' : 'false'}` → Fixed: `aria-current=${item.id === this.activeId ? 'page' : 'false'}`. Why: `page` is the correct `aria-current` token for the active item in a navigation landmark.
7. **Touch targets (lines 67–79 `.collapse-btn`, 110–129 `.item`).** Add `min-height: var(--cg-spacing-48);` (48px) to `.collapse-btn` and `.item` so primary nav controls meet the 44px minimum. Why: WCAG 2.5.8 / touch ergonomics — current ~30–38px controls are under target.

### Research-backed enhancements

- **Icon-rail collapse mode, not just hide/show.** Add a third collapse state where the sidebar shrinks to a 48px icon rail (icons stay visible, labels disappear) instead of fully sliding out — this is shadcn/ui's `collapsible="icon"` pattern and Linear's default. Pair it with hover-to-peek: hovering the collapsed rail floats the full-width panel over content without reflowing the layout. Persist the chosen state to `localStorage`. ([shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar))

- **Composable sticky header/footer regions.** Split the component into `SidebarHeader` (workspace/model switcher) and `SidebarFooter` (user/account + collapse trigger) that stay pinned while the middle nav scrolls independently. The scrollable middle should fade its top/bottom edges (mask-image gradient) so overflow reads as continuous rather than abruptly clipped. ([shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar))

- **Active-item treatment beyond a background fill.** Modern Vercel/Linear sidebars mark the active route with a subtle left accent bar (2px) plus a slightly raised surface token, and animate it with a shared-layout transition so the indicator slides between items rather than hard-cutting. Use `--cg-color-action-primary-*` for the accent and an explicit `transform`/`opacity` transition (never `transition: all`).

- **AI-native states the component likely lacks.** As an `ai-*` component it should expose: a *streaming/generating* state on nav entries (e.g. a live conversation getting a title — show a shimmer skeleton row), a *new/unread* dot affordance, and an *empty state* for "no conversations yet" with a primary CTA. Add 8-state coverage (default, hover, active, focus-visible, disabled, loading, error, empty) — sidebars are routinely shipped missing focus-visible and empty.

- **Keyboard + command affordances.** Add a `SidebarTrigger` with a visible `Cmd/Ctrl+B` shortcut hint (the de-facto toggle binding across shadcn/Vercel apps), full roving-tabindex arrow-key navigation between menu items, and proper ARIA (`role="navigation"`, `aria-current="page"` on the active item, `aria-expanded` on collapsible groups). ([shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar))

- **Density + micro-interaction polish.** Tighten the default row height to a compact ~32–36px with token-driven padding for the information-dense feel Linear/shadcn favor, give collapsible nav groups an animated chevron + height transition, and add a 150–200ms ease on icon-rail label fade so collapse feels intentional rather than instant. Provide a `density` attribute (`comfortable` | `compact`) so consumers can opt up. ([Next.js + shadcn admin template, Vercel](https://vercel.com/templates/next.js/next-js-and-shadcn-ui-admin-dashboard))

### Playground proposal

Current data-driven example is fine in shape. Suggest a richer default that exercises active state, multiple sections, badges, and the collapse control so reviewers see all states at once:

<ai-app-sidebar active-id="chat" .sections=${[
  { title: 'Workspace', items: [
    { id: 'chat', label: 'Chat', icon: '💬', badge: '3' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'history', label: 'History', icon: '🕘' }
  ]},
  { title: 'Account', items: [
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'billing', label: 'Billing', icon: '💳', badge: 'New' }
  ]}
]}></ai-app-sidebar>

(Do not edit the registry — proposal only.)

---
*cleanliness: needs-work | fixes proposed: 6*
