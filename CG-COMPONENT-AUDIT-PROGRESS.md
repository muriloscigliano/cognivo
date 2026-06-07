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
| 1 | cg-accordion | ⬜ | |
| 2 | cg-alert-dialog | ⬜ | |
| 3 | cg-aspect-ratio | ⬜ | |
| 4 | cg-autocomplete | ⬜ | |
| 5 | cg-avatar | ⬜ | |
| 6 | cg-avatar-group | ⬜ | |
| 7 | cg-badge | ⬜ | |
| 8 | cg-badge-group | ⬜ | |
| 9 | cg-breadcrumbs | ⬜ | |
| 10 | cg-button | ⬜ | |
| 11 | cg-button-group | ⬜ | |
| 12 | cg-calendar | ⬜ | |
| 13 | cg-callout | ⬜ | |
| 14 | cg-card | ⬜ | |
| 15 | cg-carousel | ⬜ | |
| 16 | cg-chart | ⬜ | |
| 17 | cg-checkbox | ⬜ | |
| 18 | cg-chip | ⬜ | |
| 19 | cg-code-block | ⬜ | |
| 20 | cg-collapsible | ⬜ | |
| 21 | cg-color-picker | ⬜ | |
| 22 | cg-combobox | ⬜ | |
| 23 | cg-command | ⬜ | |
| 24 | cg-context-menu | ⬜ | |
| 25 | cg-date-picker | ⬜ | |
| 26 | cg-date-range-picker | ⬜ | |
| 27 | cg-date-time-picker | ⬜ | |
| 28 | cg-drawer | ⬜ | |
| 29 | cg-dropdown | ⬜ | |
| 30 | cg-empty-state | ⬜ | |
| 31 | cg-file-input | ⬜ | |
| 32 | cg-focus-scope | ⬜ | |
| 33 | cg-follow-up | ⬜ | |
| 34 | cg-form | ⬜ | |
| 35 | cg-hover-card | ⬜ | |
| 36 | cg-icon | ⬜ | |
| 37 | cg-image | ⬜ | |
| 38 | cg-image-block | ⬜ | |
| 39 | cg-image-gallery | ⬜ | |
| 40 | cg-input | ⬜ | |
| 41 | cg-kbd | ⬜ | |
| 42 | cg-label | ⬜ | |
| 43 | cg-link | ⬜ | |
| 44 | cg-list | ⬜ | |
| 45 | cg-listbox | ⬜ | |
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
