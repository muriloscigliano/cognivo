# cg-navbar.spec.md — Component Specification

> Source of truth for `<cg-navbar>` v2. Audits, tests, and implementation reconcile against this.
>
> v1 had a 5×3 variant matrix (mostly broken), `::slotted(a)` styling that blocked deeper interactivity, and a static active state. v2 collapses variants to 3 coherent options, uses a programmatic items API for the nav links (so we can render a sliding indicator), keeps slots for brand/center/end, and adds proper keyboard nav.

---

## Purpose

Top-of-page navigation bar. Renders a logo/brand area, a primary nav with an animated sliding indicator behind the active item, optional center content (search/breadcrumb), and an end region for CTAs/profile. Three coherent visual variants (`solid` / `glass` / `floating`). Mobile-responsive with a slide-down panel.

---

## Category

`navigation`

---

## API

### Properties

| Name | Type | Default | Reflect | Description |
|------|------|---------|---------|-------------|
| `items` | `NavItem[]` | `[]` | no | Primary nav items. Rendered internally (NOT via slot) so the component can control the active indicator and roving tabindex. |
| `active` | `string` | `''` | no | The `value` of the active `NavItem`. Drives the sliding indicator. Consumer wires this to their router. |
| `variant` | `'solid' \| 'glass' \| 'floating'` | `'solid'` | yes | Visual treatment. `solid` = standard top bar; `glass` = blurred translucent; `floating` = pill-shaped detached bar with margin. |
| `sticky` | `boolean` | `false` | yes | Position-sticky to top with `z-index-500`. |
| `bordered` | `boolean` | `false` | yes | Bottom border (only meaningful when `variant !== 'floating'`). |
| `compactOnScroll` | `boolean` | `false` | yes | Shrinks height + adds elevation after scrolling past 16px (IntersectionObserver). |
| `mobileBreakpoint` | `number` | `768` | no | Breakpoint (px) below which links collapse into the menu button. |
| `mobileOpen` | `boolean` | `false` | yes (`mobile-open`) | Drives the mobile panel open/closed state. |
| `brandHref` | `string` | `''` | no | If set, brand becomes a clickable anchor. |

### `NavItem` interface

```ts
export interface NavItem {
  /** Stable identifier — what `active` matches against. */
  value: string;
  /** Visible text. */
  label: string;
  /** Href for the underlying anchor. */
  href: string;
  /** Optional leading icon (SVG markup string or icon name resolvable by cg-icon). */
  icon?: string;
  /** Keyboard hint, rendered as a small `cg-kbd` chip on the right. */
  kbd?: string;
  /** Marks the item disabled. */
  disabled?: boolean;
  /** Optional badge text (e.g., "New"). */
  badge?: string;
  /** Open in a new tab. */
  external?: boolean;
}
```

### Slots

| Name | Description |
|------|-------------|
| `brand` | Brand area (leftmost). Logo + name. |
| `center` | Optional center content (search, breadcrumbs, etc). Hidden below `mobileBreakpoint`. |
| `end` | Right region for actions (auth, theme toggle, profile). |
| `mobile-menu` | Optional override for the mobile panel content. If absent, the panel renders `items` as a vertical list. |

### Events

| Name | Detail | When fired |
|------|--------|------------|
| `cg-navbar-toggle` | `{ open: boolean }` | Mobile menu opened/closed. |
| `cg-navbar-select` | `{ value: string, item: NavItem }` | A nav item is activated (click or Enter/Space). Consumer typically routes from this. |

### Methods (public)

| Signature | Description |
|-----------|-------------|
| `closeMobileMenu(): void` | Programmatic close (e.g., on route change). |

---

## States matrix

| State | Required? | Implementation note |
|-------|-----------|---------------------|
| Default | Required | Items rendered with sliding indicator at `active`. |
| Hover | Required | Item bg shifts to `--cg-color-action-tertiary-background-hover`, slight `translateY(-1px)` lift. Optional ghost indicator preview. |
| Active/Press | Required | `transform: scale(var(--cg-interaction-press-scale))`. |
| Focus-visible | Required | 2-layer offset/width ring (`--cg-focus-ring-offset` + `--cg-focus-ring-width` pattern). Roving tabindex — Tab lands on the active item only; arrow keys navigate within. |
| Disabled (per-item) | Required | `aria-disabled="true"`, `pointer-events: none`, `opacity: 0.5`. |
| Compact (scroll) | Optional | Height shrinks 64 → 56px when `compactOnScroll && scrolled`. |
| Mobile open | Required | Slide-down panel with item stagger animation. Escape closes. |
| Loading / Error / Success | n/a | Not applicable for a nav bar. |

---

## Tier-3 tokens (this component owns)

Already exist in `tier3-component/components.json` under `component.navbar`:

| Token | Purpose |
|-------|---------|
| `--cg-component-navbar-height` | 64px standard height. |
| `--cg-component-navbar-padding-x` | 24px x-padding. |

**To add (v2)**:

| Token | Purpose |
|-------|---------|
| `--cg-component-navbar-height-compact` | 56px shrunk height when `compactOnScroll && scrolled`. |
| `--cg-component-navbar-item-padding-x` | 16px per-item x-padding. |
| `--cg-component-navbar-item-padding-y` | 8px per-item y-padding. |
| `--cg-component-navbar-item-gap` | 4px gap between items. |
| `--cg-component-navbar-floating-margin` | 12px outer margin for floating variant. |

---

## Tier-2 tokens (this component consumes)

| Token | Where used | Resolves to |
|-------|------------|-------------|
| `--cg-color-surface-base-background` | `solid` variant nav bg | gray-100 / gray-950 |
| `--cg-color-surface-container-background` | active-pill indicator bg | white / gray-900 |
| `--cg-color-action-secondary-border-default` | nav border + indicator border | gray-200 / gray-700 |
| `--cg-color-action-tertiary-background-hover` | item hover bg | gray-100 / gray-800 |
| `--cg-color-surface-container-outlined` | resting item text | gray-500/600 |
| `--cg-color-surface-base-text` | active + hover item text | gray-950 / gray-50 |
| `--cg-shadow-elevation-sm` | active indicator elevation | system small shadow |
| `--cg-shadow-elevation-md` | nav `[elevated]` (and compact-scrolled) | system medium |
| `--cg-shadow-elevation-lg` | floating variant | system large |

Never use `*-background-*` as `color:` or `border-color:` (Rule 1, [`CLAUDE.semantic-rules.md`](../../../../../CLAUDE.semantic-rules.md)).

---

## Accessibility

- **Outer nav**: `role="navigation"` with `aria-label` (defaults to "Main navigation"; consumers can pass via `aria-label` host attribute).
- **Items list**: `role="tablist"` (since we have a sliding active indicator and arrow-key nav, the tablist semantics fit better than a plain list).
- **Each item**: `role="tab"`, `aria-selected={active}`, `tabindex={active ? '0' : '-1'}` (roving tabindex). Renders as `<a href>` so screen readers and middle-click still work.
- **Menu button**: `aria-label="Toggle menu"`, `aria-expanded`, `aria-controls={mobile-panel-id}`.
- **Mobile panel**: has an id; `aria-controls` from menu button targets it. Trap focus inside while open (Tab cycles within); Escape closes.
- **Keyboard**:
  - Tab → enters tablist at active item.
  - ArrowLeft/Right → moves between items, fires `cg-navbar-select`.
  - Home/End → first/last.
  - Escape → closes mobile menu.
  - Enter/Space on item → navigates (native `<a>`).

---

## Composition

Sub-components used internally:

| Sub-component | Why |
|---------------|-----|
| `<cg-kbd>` | Optional keyboard-shortcut chip on items with `kbd`. |
| `<cg-icon>` | Optional leading icon on items with `icon`. |

cg-navbar **does not** consume `<cg-link>` for nav items. We render `<a>` ourselves so the sliding indicator + roving tabindex + tablist semantics work. (cg-link is fine for plain links inside `slot="end"` or `slot="center"` — those stay as native slots.)

---

## Variants — visual specs

### `solid` (default)
- `background: var(--cg-color-surface-base-background)`
- No top/bottom border unless `bordered`
- Standard 64px height (56px compact)

### `glass`
- `background: color-mix(in srgb, var(--cg-color-surface-base-background) 72%, transparent)`
- `backdrop-filter: saturate(180%) blur(20px)` (with `-webkit-` prefix for Safari)
- Always renders bottom border (the only way the blur edge reads cleanly)
- Best with `sticky`

### `floating`
- Detached pill: `margin: var(--cg-component-navbar-floating-margin)` on all sides
- `border-radius: var(--cg-border-radius-full)`
- `box-shadow: var(--cg-shadow-elevation-lg)`
- Implies translucent backdrop-filter (same as glass)
- Implies `bordered` (1px border for definition)
- The internal items list does NOT add its own pill chrome (avoid card-in-card)

---

## Sliding indicator

A positioned `<span class="indicator">` inside the items list. On `firstUpdated` and any change to `active` / `items` / size, JS measures the active item's `offsetLeft` + `offsetWidth` and animates the indicator with:

```css
transition:
  transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out),
  width var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out);
```

Indicator visual:
- `background: var(--cg-color-surface-container-background)` (matches cg-segmented-control)
- `border: 1px solid var(--cg-color-action-secondary-border-default)`
- `border-radius: var(--cg-border-radius-full)`
- `box-shadow: var(--cg-shadow-elevation-sm)`
- Sits behind items via `z-index: 0` while items are `z-index: 1`

**ResizeObserver** on the items list re-measures on layout changes (responsive resize, font load, etc.).

---

## Mobile

Below `mobileBreakpoint`:
- Items list is hidden via `display: none`.
- Center slot is hidden.
- Menu button appears in the end region.
- Click menu → `mobileOpen = true` → slide-down panel renders the items as a vertical list.
- Items in mobile panel use staggered animation (`animation-delay: calc(var(--idx) * 50ms)`).
- Click any item → fires `cg-navbar-select` and auto-closes the panel.
- Escape closes; click outside closes.

---

## Form integration

Not form-associated. This is navigation, not input.

---

## Out of scope

- **Mega-menus** (multi-column dropdowns) — out of scope for v2; would warrant a separate `<cg-mega-menu>` slotted into items.
- **Search input** — consumer puts a `<cg-input>` in `slot="center"`.
- **Theme switcher** — consumer puts their toggle in `slot="end"`.
- **Avatar / profile menu** — consumer puts a `<cg-avatar>` + `<cg-dropdown>` in `slot="end"`.
- **Auto-detect active link from URL** — out of scope; consumer is expected to bind `active` to their router.
- **Scroll-driven shrink animation curves** — `compactOnScroll` is binary (compact yes/no), not a smooth interpolation tied to scroll position.

---

## Reference implementations / inspiration

- **HeroUI Navbar** — sliding indicator pattern.
- **Vercel.com nav** — clean glass + sticky + compact-on-scroll.
- **Linear marketing nav** — minimal solid variant with subtle hover.
- **cg-segmented-control** (in this repo) — the indicator math + animation.

---

## Open questions

None.
