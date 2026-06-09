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
| 34 | cg-form | ⬜ | |
| 35 | cg-hover-card | ⬜ | |
| 36 | cg-icon | ⬜ | |
| 37 | cg-image | ⬜ | |
| 38 | cg-image-block | ⬜ | |
| 39 | cg-image-gallery | ⬜ | |
| 40 | cg-input | ⬜ | |
| 41 | cg-kbd | ⬜ | |
| 42 | cg-label | ⬜ | |
| 43 | cg-link | 🔧 | dual focus-ring widths tokenized, underline bottom -1px → border-width-50. (kept surface-base-background offset — focus-ring-offset is dark-only) |
| 44 | cg-list | ⬜ | |
| 45 | cg-listbox | 🔧 | P0: added missing focus ring (was no visible focus indicator, WCAG 2.4.7). DEFERRED: aria-activedescendant, outlined-as-text |
| 46 | cg-markdown | ⬜ | |
| 47 | cg-menubar | ⬜ | |
| 48 | cg-meter | ⬜ | |
| 49 | cg-metric-card | ⬜ | |
| 50 | cg-modal | ⬜ | |
| 51 | cg-navbar | ⬜ | |
| 52 | cg-navigation-menu | ⬜ | nav landmark unnamed (from system audit) |
| 53 | cg-number-input | ⬜ | |
| 54 | cg-otp-input | ⬜ | |
| 55 | cg-pagination | ⬜ | |
| 56 | cg-password-input | ⬜ | |
| 57 | cg-phone-input | ⬜ | |
| 58 | cg-popover | ⬜ | |
| 59 | cg-portal | ⬜ | |
| 60 | cg-progress-bar | ⬜ | |
| 61 | cg-radio | ⬜ | |
| 62 | cg-radio-group | ⬜ | |
| 63 | cg-rating | ⬜ | |
| 64 | cg-resizable | ⬜ | |
| 65 | cg-scroll-area | ⬜ | |
| 66 | cg-segmented-control | ⬜ | |
| 67 | cg-select | ⬜ | |
| 68 | cg-separator | ⬜ | |
| 69 | cg-sheet | ⬜ | |
| 70 | cg-sidebar | ✅ | redesigned (commit 90db886) — collapsed state, active accent, icon contract |
| 71 | cg-skeleton | ⬜ | |
| 72 | cg-slider | ⬜ | |
| 73 | cg-spinner | ⬜ | |
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
