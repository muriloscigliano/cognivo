## ai-sidebar — Manual Review

> **Context:** `ai-sidebar` is a **deprecated thin shim** (slated for removal in v0.6.0). It is NOT a standalone visual component. It imports and renders `<ai-app-sidebar>`, forwards three props (`sections`, `collapsed`, `active-id`), and re-fires that element's events under legacy names. All visual/structural styling, states, and interaction live in `ai-app-sidebar` — they should be audited there, not here.

### 1. Token Audit (every CSS value)

The component declares essentially no CSS of its own. Its `static styles` is `[hostBlock, css\`:host { display: block; height: 100%; }\`]`.

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 30 | `:host { display }` | `block` (keyword) | ✅ | None — keyword, not a token candidate |
| 30 | `:host { height }` | `100%` | ✅ | None — `%` is allowed (fills parent app-shell slot); not a magic px |
| 30 (via `hostBlock`) | `font-family` | `var(--cg-font-family-primary)` | ✅ | None — real tier-1 token |
| 30 (via `hostBlock`) | `box-sizing` | `border-box` (keyword) | ✅ | None |
| 30 (via `hostBlock`) | `transition` | `color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | ✅ | None — explicit property (not `all`), both tokens real |

No hex, no rgba, no tier-1 palette colors, no comma-fallbacks, no magic px, no `transition: all`. **Token audit is clean.**

### 2. Styling Audit
- **Border radius:** N/A — none declared (shim has no chrome of its own).
- **Spacing:** N/A — no padding/margin/gap declared.
- **Font-size accessibility:** N/A — no text rendered directly; no font-size declared. The inherited `hostBlock` sets only `font-family`, no size.
- **Translucent vs solid borders:** N/A — no borders declared.
- **Transitions explicit vs all + motion tokens:** Inherited `hostBlock` transition is explicit (`color`, not `all`) and uses `--cg-transition-duration-fast` / `--cg-transition-easing-default`. Compliant.
- **Dark-theme suitability:** No hard-coded colors at all; fully inherits semantic theming from `ai-app-sidebar`. Dark-first safe.

### 3. States Audit
This shim owns no interactive state — it forwards to `ai-app-sidebar`, which owns all visual states. The only state it tracks is `collapsed` (synced from the child's collapse event so the reflected attribute stays correct for selectors/SSR).

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | N/A | Delegated to `ai-app-sidebar` | Audit visual default there |
| Hover | N/A | Delegated to `ai-app-sidebar` | — |
| Active/Press | N/A | Delegated to `ai-app-sidebar` | — |
| Focus-visible | N/A | Delegated to `ai-app-sidebar` | — |
| Disabled | N/A | No disabled concept on a nav shell | — |
| Loading | N/A | Not an async-state surface | — |
| Error | N/A | Not an AI-lifecycle surface (despite `ai-` prefix, no thinking/streaming/error state shown) | No `--cg-color-ai-*` tokens applicable |
| Success | N/A | — | — |

Note: `collapsed` is reflected (`reflect: true`, line 33) and re-synced on the child's collapse event (line 55) — correct, prevents drift between the legacy attribute and the real child state.

### 4. Interaction Audit
- **Keyboard:** N/A here — keyboard navigation belongs to `ai-app-sidebar`. The shim adds no focusable elements.
- **ARIA roles/labels/states:** None added by the shim, and correctly so — adding a wrapper `role` would create a duplicate/competing landmark over the child's. The child should own `nav`/`aria-current`/`aria-expanded`.
- **CustomEvents + detail correctness:**
  - `ai-sidebar-item-click` (lines 48–52): forwards `(e as CustomEvent).detail` verbatim from the child's `ai-app-sidebar-item-click`; `bubbles: true, composed: true`. JSDoc (line 17) types detail as `{id: string, label: string}`. Correct pass-through.
  - `ai-sidebar-collapse` (lines 54–59): forwards detail verbatim, also writes `this.collapsed = detail.collapsed` before re-dispatch; `bubbles/composed: true`. JSDoc (line 18) types `{collapsed: boolean}`. Correct.
  - Deprecation `console.warn` fires once (module-level `warned` guard, lines 26/38–45). Reasonable.
- **Touch targets ≥44px:** N/A — no tappable elements of its own; targets live in `ai-app-sidebar`.

### 5. Visual Design Check
Not directly applicable — this element renders no visible chrome; it is a transparent forwarding wrapper around `ai-app-sidebar`. There is nothing to judge for radius, breathing room, dividers, or typography hierarchy at this layer. Visual showcase-readiness must be assessed on `ai-app-sidebar`. From a code-hygiene standpoint the shim is minimal, correct, and clean.

**One-word verdict:** strong (as a deprecation shim — correct, minimal, token-clean; defers all visuals to `ai-app-sidebar`).

### 6. Fixes Needed
No fixes needed — component is compliant. It is a deprecation shim with no token violations, no magic numbers, no hard-coded colors, and correct event/attribute forwarding. All substantive styling, states, a11y, and interaction should be audited on `ai-app-sidebar` (`packages/components/src/components/ai-app-sidebar/ai-app-sidebar.ts`), which is the real implementation.

### Research-backed enhancements

> These target the real implementation, `ai-app-sidebar` — the shim itself should stay chrome-free. They reflect 2025-era sidebar conventions from shadcn/ui, HeroUI v3, Linear, and Vercel.

1. **Add a drag-to-resize `SidebarRail` affordance, not just a collapse toggle.** shadcn/ui ships a dedicated `SidebarRail` — a thin hit-target along the trailing edge that doubles as both a click-to-collapse zone and a drag handle to set custom width, persisting the value (cookie/localStorage). Our component only exposes a binary `collapsed` boolean. Add a `--cg-component-sidebar-width` tier-3 token + a draggable rail so users can tune density, and persist it across reloads. (Source: [shadcn/ui Sidebar — SidebarRail](https://ui.shadcn.com/docs/components/radix/sidebar))

2. **Icon-rail collapsed mode with hover-reveal flyouts, instead of a hard hide.** The modern "collapsed-first" pattern keeps a narrow icon rail visible when collapsed and reveals each section's label/children as a floating popover on hover or focus, preserving navigation while reclaiming space. Today `collapsed` appears to fully shrink the panel; switch to `icon` + `offcanvas` collapse variants so dense dashboards stay one-click navigable. (Source: [shadcn sidebar dashboard patterns, DEV Community](https://dev.to/wrap-pixel/shadcn-sidebar-examples-3k06))

3. **Sticky `SidebarHeader` / scrollable `SidebarContent` / sticky `SidebarFooter` three-zone layout.** shadcn formalizes a sticky-top header (brand/workspace switcher), a single scroll region in the middle, and a sticky-bottom footer (user/account menu). If our sections render as one flat scroll list, restructure into these three slots so the workspace switcher and account menu never scroll out of reach. (Source: [shadcn/ui Sidebar — header/content/footer](https://ui.shadcn.com/docs/components/radix/sidebar))

4. **Collapsible nav groups with a spring-eased disclosure micro-interaction.** Wrap each section in a Collapsible so groups expand/collapse with a height + chevron-rotate transition. Use our existing `--cg-transition-duration-fast` with an ease-out (or spring-like) curve, animating `grid-template-rows`/`max-height` and the chevron `transform` explicitly (never `transition: all`). This matches Linear's quiet, low-amplitude disclosure motion. (Source: [shadcn/ui Collapsible](https://ui.shadcn.com/docs/components/radix/collapsible))

5. **Route-aware active state via `aria-current="page"` plus an animated active indicator.** Linear/Vercel sidebars render a persistent left accent bar or pill behind the active item that slides between items rather than snapping. Drive the visual from `aria-current` on the active row (not a class alone) so the a11y signal and the indicator share one source of truth, and animate the indicator's `transform`/`opacity` with motion tokens. (Source: [shadcn/ui Sidebar — active item + aria](https://ui.shadcn.com/docs/components/radix/sidebar))

6. **Keyboard-first command affordance.** Modern sidebars (Vercel, Linear) pair the nav with a `⌘K`-style trigger and expose a documented collapse shortcut (shadcn defaults to `⌘B`). Surface a visible keyboard hint on the collapse control and wire focus management on toggle (return focus to the trigger when collapsing) so the rail is fully operable without a pointer. (Source: [shadcn/ui Sidebar — keyboard shortcut & focus management](https://ui.shadcn.com/docs/components/radix/sidebar))

**Sources:**
- [shadcn/ui — Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar)
- [shadcn/ui — Collapsible](https://ui.shadcn.com/docs/components/radix/collapsible)
- [shadcn sidebar examples for modern dashboards (DEV Community)](https://dev.to/wrap-pixel/shadcn-sidebar-examples-3k06)
- [HeroUI v3](https://heroui.com/)
