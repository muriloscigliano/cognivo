# CG Component Manual Audit — Progress Tracker

**Started:** 2026-06-08
**Scope:** All 89 `cg-*` foundation components in `packages/components/src/components/` (excludes `ai-*` and `bias-*`).
**Per component:** 6-section manual review (token audit, styling, states, interaction, visual design, fixes) → apply real fixes **including visual redesign** → verify build/lint/test.
**Method:** Multi-agent audit waves (each agent reads one component in full against the rules), findings verified, fixes applied by main session, verified green before commit.

**Convention reminders:**
- NO `var(--token, fallback)` comma-fallbacks (lint rule `no-token-fallbacks` enforces this).
- Tier 3 → 2 → 1. Colors must be tier-2 semantic. `@cssprop` JSDoc defaults are documentation, NOT violations.
- SVG children via Lit `svg\`\`` not `html\`\``. Landmark roles need accessible names. Status fills use `*-text-default` not `*-background-default`.

## Legend
- ✅ clean — reviewed, no fixes needed
- 🔧 fixed — fixes applied
- ⬜ not started

## Status (89 components)

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | cg-accordion | 🔧 | focus-ring tokenized, chevron aria-hidden, dead import removed, open-state accent edge added |
| 2 | cg-alert-dialog | 🔧 | dangling aria-labelledby/describedby now conditional, decorative SVG aria-hidden |
| 3 | cg-aspect-ratio | 🔧 | CSS-injection fixed (styleMap + ratio validation), local vars renamed --_aspect-*, +injection test |
| 4 | cg-autocomplete | 🔧 | a11y: aria-controls/activedescendant/invalid + listbox/option ids; keyboard: scroll-into-view + ArrowUp reopen. DEFERRED: accent-text highlight (needs light-theme token add), loading state (new feature) |
| 5 | cg-avatar | 🔧 | status+type folded into accessible name (were color-only), initials text → action-secondary-text-default |
| 6 | cg-avatar-group | 🔧 | tier-3 avatar size tokens, status in aria-label + dot aria-hidden, removed !important via specificity, stagger tokenized |
| 7 | cg-badge | 🔧 | removed misapplied role=status live-region/presentation, dot aria-hidden, empty-state collapse guard |
| 8 | cg-badge-group | 🔧 | overflow text contrast (paired secondary-text), aria-label on +N, removed unimplemented "size" doc claim |
| 9 | cg-breadcrumbs | 🔧 | focus-ring tokenized (more findings pending: active-state hierarchy, dead ellipsis, max-width px) |
| 10 | cg-button | 🔧 | focus-ring tokenized (bare px → border-width-100) |
| 11 | cg-button-group | 🔧 | FIXED broken attached mode (gap on container not host), focus z-index lift, radius matches button, group aria-label, tokenized -1px overlap |
| 12 | cg-calendar | 🔧 | today accent → border token (was bg-as-border/text), nav buttons disable at min/max bounds. F1 "invisible icons" = FALSE POSITIVE (renders fine, verified). DEFERRED: roving tabindex (needs render-loop refactor+test) |
| 13 | cg-callout | 🔧 | role/aria-live conflict fixed (assertive for danger/warning), per-variant tinted surface, dropped title opacity, icon top-align, focus-ring tokenized, decorative SVG aria-hidden, keyframe px tokenized |
| 14 | cg-card | 🔧 | focus-ring tokenized |
| 15 | cg-carousel | 🔧 | tablist→group+aria-current (orphan tab pattern), aria-live off during autoplay, dot visibility fix, nav arrows discoverable (opacity 0→.65), focus-ring tokenized, _paused reactive. DEFERRED: autoplay pause control (WCAG 2.2 — new feature), scroll-index calc for multi-column |
| 16 | cg-chart | 🔧 | P0 a11y: svg role=img + data aria-label; raw-px margin tokenized; dead fallback tokens → real. DEFERRED: loading/error states, tooltip keyboard, hardcoded hex palette (larger features) |
| 17 | cg-checkbox | 🔧 | hover border → -border-checked (was -background- as border) + scoped so error/success not overridden, indeterminate boxPop animation, focus-ring tokenized. DEFERRED: 44px touch-target (needs shared --cg-spacing-44 token) |
| 18 | cg-chip | 🔧 | press-scale tokenized, max-width → spacing-192, aria-label only for icon-only (visible label names the rest). DEFERRED: role=button nesting restructure (chip-4) |
| 19 | cg-code-block | 🔧 | two-way collapse toggle + aria-expanded/controls, copy aria-label tracks copied state, letter-spacing tokenized, deleted dead tag/attr/punctuation highlight code. DEFERRED: empty/loading state |
| 20 | cg-collapsible | 🔧 | trigger transform now eased (was instant snap), card-variant open divider for clearer expanded state |
| 21 | cg-color-picker | 🔧 | P0 a11y: spectrum + hue + alpha sliders now keyboard-operable (tabindex/role=slider/aria-value*/arrow+Page+Home/End handlers) — were pointer-only |
| 22 | cg-combobox | 🔧 | keyboard-active option now distinct accent (was = hover), aria-haspopup, specific chip-remove/clear labels, aria-busy on listbox, ArrowUp opens list |
| 23 | cg-command | 🔧 | aria-activedescendant + option ids, listbox aria-label, keyboard-active accent bar (was = hover). DEFERRED: skip disabled items in nav |
| 24 | cg-context-menu | ⬜ | DEFERRED whole component: roving focus + aria-activedescendant, roving tabindex, menu name, exit anim, empty-state — all need focus-model refactor+tests |
| 25 | cg-date-picker | 🔧 | aria-controls→popover id, aria-invalid. DEFERRED: focus management (move into calendar / restore on close) |
| 26 | cg-date-range-picker | 🔧 | aria-disabled added (aria-invalid already present), end-placeholder now overridable/i18n. DEFERRED: range active-state emphasis |
| 27 | cg-date-time-picker | 🔧 | aria-disabled + aria-invalid. dtp-1 "invisible SVG" = FALSE POSITIVE (renders fine, verified). DEFERRED: focus mgmt, grid roles, keyboard nav |
| 28 | cg-drawer | 🔧 | close/back icon button resting bg was a -hover token (always looked filled) → -default (transparent ghost). DEFERRED: hardcoded setTimeout 200 sync |
| 29 | cg-dropdown | 🔧 | removed dead :host color transition. DEFERRED: trigger focusability + closed-menu AT exposure (focus-model refactor) |
| 30 | cg-empty-state | 🔧 | description/title/icon → dedicated empty-state component tokens (were outlined-as-text/icon), fixed .actions:empty never matching (slotchange-driven hide) |
| 31 | cg-file-input | 🔧 | compact focus ring → shared focusRingSingle helper (was inline 3px). DEFERRED: press states, success/error tint polish |
| 32 | cg-focus-scope | ✅ | CLEAN — headless focus-trap primitive, no token/a11y issues |
| 33 | cg-follow-up | 🔧 | focus ring → focusRingSingle helper, aria-busy on chips group during loading |
| 34 | cg-form | 🔧 | error-summary heading now has heading semantics + aria-labelledby. (other findings P2 polish — deferred) |
| 35 | cg-hover-card | 🔧 | role=tooltip → dialog (rich interactive content), Escape-to-close handler +test |
| 36 | cg-icon | 🔧 | wave4: accent bg-as-fg → accent-text, API fetch race guarded (requested-name gate), display:contents a11y span → .api-icon box. DEFERRED: dead size=xs enum (needs --cg-icon-size-50 token or API break) |
| 37 | cg-image | 🔧 | orphan --cg-transition-duration-slower → -slow (fade now animates). cg-image-1 "invisible SVG" = FALSE POSITIVE (rejected) |
| 38 | cg-image-block | 🔧 | orphan --cg-transition-duration-slower → -slow. DEFERRED: IB token + correctness P1s |
| 39 | cg-image-gallery | 🔧 | grid role=group + label, inner img alt="" (wrapper aria-label names it — was double-announced). DEFERRED: col-min token, overflow state |
| 40 | cg-input | 🔧 | placeholder as accessible-name fallback when no label, success-focus ring tokenized (3px→border-width-300) |
| 41 | cg-kbd | 🔧 | wave4: hover-token-as-resting-bg → surface-cards-background, text → cards-text (coherent family), separator sizes via tier-3 kbd font tokens. Separator outlined-as-text kept (convention) |
| 42 | cg-label | 🔧 | wave4: P0 shadow-DOM for= no-op → click-to-focus delegation (getRootNode lookup), disabled dims hint, dead transitions + host margin removed. NOTE: --cg-opacity-* tokens generate as invalid "50rem" — token-gen bug flagged |
| 43 | cg-link | 🔧 | dual focus-ring widths tokenized, underline bottom -1px → border-width-50. (kept surface-base-background offset — focus-ring-offset is dark-only) |
| 44 | cg-list | 🔧 | clickable chevron SVG aria-hidden. DEFERRED: other L2 polish |
| 45 | cg-listbox | 🔧 | P0 focus ring added + aria-activedescendant now points at highlighted option. DEFERRED: outlined-as-text |
| 46 | cg-markdown | 🔧 | wave4: GFM pipe tables implemented, task-list sr-only state text, alert bodies block-parsed, image syntax (safe protocols), heading anchors scroll in shadow DOM + deep-link, copy btn aria-live, SSR DOMParser guard, letter-spacing/decoration tokenized |
| 47 | cg-menubar | 🔧 | wave4: P0 submenus invisible (host [open] attr never set for menuListStyles reveal) FIXED, label prop for menubar name, Tab restores trigger focus, ArrowUp opens at last item, ResizeObserver re-measures underline, dead transition removed |
| 48 | cg-meter | 🔧 | wave4: track bg → loading-spinner-secondary (visible on dark), aria-valuenow clamped, aria-valuetext added, aria-disabled removed (unsupported on meter), _level() matches native <meter> midpoint-optimum semantics |
| 49 | cg-metric-card | 🔧 | wave4: P0 role=figure on clickable → role=button, spark colors saturated *-text tokens, skeleton border-token-as-fill → secondary-bg-hover, button-family focus ring, dup .spark-bar selector merged |
| 50 | cg-modal | 🔧 | wave4: P0 backdrop-click dead (container covers it) → container click w/ target guard; P0 focus trap now crosses slots (shared getFocusableElements rewrite + deepContains active-mapping); mount no longer fires spurious close; empty <h2> gone; loading overlay role=status; tertiary ramp + tokenized ring; closing clears on animationend |
| 51 | cg-navbar | 🔧 | wave4: mobile menu/menuitem roles dropped (nav links, not app menu), arrow-nav no longer selects (roving focus only), Escape restores focus to toggle, blur tokenized, mobile focus-visible/active states, dead --idx removed, slot doc honest |
| 52 | cg-navigation-menu | 🔧 | wave4: fake menu semantics dropped (disclosure pattern: aria-expanded + conditional aria-controls), @focus force-open removed, click clears hover timers, focusout closes, open state has accent underline, caret + link-icon polish. Landmark named (label prop, earlier commit) |
| 53 | cg-number-input | 🔧 | wave4: tier-3 input heights (form rows align), runaway auto-repeat fixed (window release + boundary stop), no clamp-per-keystroke (commit on blur/Enter), steppers keyboard-activatable, Home/End, loading keeps input (readonly + truthful aria-busy), paired secondary text token, tier-3 radius |
| 54 | cg-otp-input | 🔧 | wave4: caret bg-token → accent-text, stale-value re-sync guard (positions preserved), OS one-time-code autofill distributes all digits, aria-invalid on boxes, stagger tokenized, filled border stronger-not-fainter on dark, focus scale removed |
| 55 | cg-pagination | 🔧 | wave4: prev/next aria-disabled (focus not dropped at bounds), showFirst/Last usable from markup (string-aware converter, API kept), button-family focus ring, real … glyph, active cursor default, dead hover decls removed |
| 56 | cg-password-input | 🔧 | wave4: P0 no accessible name → label for/id + aria-label fallback, helper linked via aria-describedby, error/success focus rings, toggle disabled with host + tokenized ring/press, aria-pressed double-signal removed, strength label live region, validity tracks required/minLength |
| 57 | cg-phone-input | 🔧 | wave4: P0 tel input aria-label, Enter/Space toggle (was one-way), search input named + no dangling activedescendant, aria-controls → popover id, popover entrance animates (visibility not display), trigger locks while loading + press state, letter-spacing tokenized |
| 58 | cg-popover | 🔧 | wave5: P0 closed popover left keyboard-focusable (visibility toggle), hover content hoverable (scheduled open/close both surfaces, WCAG 1.4.13), ARIA popup state forwarded to slotted trigger, label prop names the dialog, hover mode no longer steals focus, no spurious close on mount |
| 59 | cg-portal | 🔧 | wave5: P0 double-mount on first connect guarded (observer leak + duplicate mount events), unmount no longer resurrects consumer-deleted nodes, focus preserved across teleport |
| 60 | cg-progress-bar | 🔧 | wave5: buffer follows status variant + opacity token, formatValue → aria-valuetext, stripe geometry tokenized, dead reduced-motion rule removed |
| 61 | cg-radio | 🔧 | wave5: P0 roving tabindex was on host not shadow label → delegatesFocus + groupTabIndex, ring/name-reflect/dot/opacity tokens, aria-busy, error/success focus rings. DEFERRED: aria-required move to group (P3-downgraded) |
| 62 | cg-radio-group | 🔧 | wave5: reversible group disabled (WeakSet), duplicate cg-change swallowed, visible label + aria-labelledby, keyboard follows focus, aria-orientation, error propagation, name clearing propagates |
| 63 | cg-rating | 🔧 | wave5: P0 invalid radiogroup/valuenow hybrid → slider pattern (stars presentational), disabled leaves tab order, press/opacity/ring/empty-star tokenized |
| 64 | cg-resizable | 🔧 | wave5: handle hit-area + ring above panes (z-index), named separator (handle-label), drag hands focus to handle, invalid 3-color background dropped, accent overlay/text tokens, min/max re-clamp |
| 65 | cg-scroll-area | 🔧 | wave5: hover scrollbars work in Firefox + reveal on keyboard focus, thumb drag state, viewport = named region, tab stop only when scrollable |
| 66 | cg-segmented-control | 🔧 | wave5: P0 keyboard-unreachable when value matched no option (roving seed), arrows skip disabled, label prop, option icons render, press state, opacity token, name reflects, indicator hidden when unmatched |
| 67 | cg-select | 🔧 | wave5: 18/18 — P0 combobox accessible name, full ARIA 1.2 wiring (controls/activedescendant/invalid/disabled), keyboard nav under search, accent-text selection, hover/highlight action tokens, tier-3 radius default restored, entrance animates, bindOutsideClick |
| 68 | cg-separator | 🔧 | wave5: doc no longer advertises nonexistent slot, host role removal no longer clobbers consumer roles |
| 69 | cg-sheet | 🔧 | wave5: body scroll lock (modal/drawer parity), snap-point drag actually works (signed delta, nearest-snap) + keyboard slider on handle, drag tracks 1:1, no spurious close on mount, divider token, saturate parity |
| 70 | cg-sidebar | ✅ | redesigned (commit 90db886) — collapsed state, active accent, icon contract |
| 71 | cg-skeleton | 🔧 | wave5: rounded overrides rescoped (circular is circular), dead animated=false → no-animation attr (+ deprecated JS alias for adapters), spinner-secondary bg token, !important width rules dropped, shared pulse keyframes |
| 72 | cg-slider | 🔧 | wave5: 13/13 — P0 double ARIA control → native input is sole accessible control (thumb presentational), pointer-up leak fixed, hover/cursor states rationalized, thumb-border/placeholder/accent/opacity/spacing tokens, error/success rings, loading hides fill |
| 73 | cg-spinner | 🔧 | wave5: bg-token-as-border → primary-border token, double announcement fixed (sr-only span is sole name), shared pulse keyframes. DEFERRED: color="accent" removal (API break) |
| 74 | cg-split-button | ⬜ | |
| 75 | cg-stack | ⬜ | |
| 76 | cg-steps | ⬜ | |
| 77 | cg-switch | ⬜ | |
| 78 | cg-table | ⬜ | |
| 79 | cg-tabs | ⬜ | |
| 80 | cg-tag-input | ⬜ | |
| 81 | cg-text | ⬜ | |
| 82 | cg-textarea | ⬜ | |
| 83 | cg-time-picker | ⬜ | |
| 84 | cg-toaster | ⬜ | partial: undefined-token fixes already applied (commit a0ad6e2) |
| 85 | cg-toggle | ⬜ | |
| 86 | cg-toggle-group | ⬜ | |
| 87 | cg-tooltip | ⬜ | |
| 88 | cg-tree-view | ⬜ | |
| 89 | cg-visually-hidden | ⬜ | |
