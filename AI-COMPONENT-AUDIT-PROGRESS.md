# AI Component Manual Audit — Progress Tracker

**Started:** 2026-07-05
**Scope:** All 91 `ai-*` components in `packages/components/src/components/` (the 89 `cg-*` audit completed 2026-07-05 — see CG-COMPONENT-AUDIT-PROGRESS.md).
**Method:** Same proven wave process — multi-agent audit wave (verified findings) → fixes applied → build/lint/test green → commit per batch. 15 components per wave.

**Convention reminders (same as cg audit):**
- NO `var(--token, fallback)` comma-fallbacks. Tier 3 → 2 → 1; colors tier-2 semantic.
- Complete inline `<svg>` inside `html\`\`` is FINE (known false positive). Interpolated SVG fragments need `svg\`\``.
- `surface-container-outlined`-as-text is the house muted-text convention.
- Status fills use `*-text-default`; backgrounds-as-foreground is the #1 recurring bug class.
- ai-* specifics: streaming/loading states must be announced (aria-busy/live regions); confidence/status must not be color-only; agent actions need accessible names.

## Legend
- ✅ clean — reviewed, no fixes needed
- 🔧 fixed — fixes applied
- ⬜ not started

## Status (91 components)

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | ai-ab-test | 🔧 | A1: winner border bg-token → border token, vote results announced (live region — cg-button shadow blocks host aria-pressed), swap announces vote-clear, region→group, bg transition enumerated; +6 tests |
| 2 | ai-accessibility-report | 🔧 | A1: 4/4 — dead score branch (Lighthouse buckets), aria-controls disclosure wiring (+[hidden] display fix), static chip off action-hover token, score clamped for meter contract; +6 tests |
| 3 | ai-action-preview | 🔧 | A1: 16/16 — P0 contrast on critical confirm → text-inverse, real alertdialog contract (Escape, cancel autofocus), confirmed/disabled states, countdown pauses on focus/hover + role=timer, 7 token fixes; +6 tests |
| 4 | ai-agent-card | 🔧 | A1: 11/11 — role prop hijacked host ARIA → agentRole/agent-role (migrated: adapters, gen-ui schema, docs), current-step logic fixed, status live region, inset-shadow accents (no layout shift), actions/badge overlap; +6 tests. FOLLOW-UP filed: keyboard path for clickable steps |
| 5 | ai-agent-steps | 🔧 | A1: 5/5 — detail stacks, per-step sr-only status (was color-only), completion live region, connector centered, complete-step press states; +6 tests |
| 6 | ai-alert-card | 🔧 | A1: 9/9 — P0 message text = bg-fill token as color (INVISIBLE), urgent tier fainter than info fixed, 300ms strobe → shimmer token, 2-layer ring, tokenized exit/press, dismiss clearance; +6 tests |
| 7 | ai-analytics-chart | 🔧 | A1: P0 chart INVISIBLE (nested html`` in svg → wrong namespace) fixed with svg``, x-order preserved, keyboard/SR hit-circles, empty state, palette-token default colors (color now optional), dead code removed; +5 tests incl. namespace regression |
| 8 | ai-annotation | 🔧 | A1: 11/11 — P0 keyboard operability (role=button spans, keyup creation), unreachable remove event wired, dark-only token → cross-theme, hues sanitized, aria-pressed toolbar; +6 tests |
| 9 | ai-api-key-manager | 🔧 | A1: 12/12 — 2 token contract fixes, brightness() → hover token, per-key copy labels, Copied! live region, press states, SVG icons replace emoji, timer leak; +6 tests |
| 10 | ai-app-sidebar | 🔧 | A1: P0 active state never rendered (aria-current true vs page) + distinct active chrome (accent bar), menuitem role dropped, badges in accessible names, aria-expanded on collapse, sidebar-icon token |
| 11 | ai-assistant-widget | 🔧 | A1: 12/15 — double-Escape, false aria-modal, focus returns to FAB, brightness() → hover tokens, message roles announced, corner-anchored scaleIn. DEFERRED: panel-width tier-3 token, loading state (new API), title→heading rename (system-wide pass) |
| 12 | ai-audio-player | 🔧 | A1: 11/11 — error state + event (was none), _loaded wired, stale-playback on src swap fixed, play() promise handled, speed/slider a11y, track hit area, reconnect playbackRate; +6 tests |
| 13 | ai-avatar | 🔧 | A1: 4/4 — 2-layer focus ring, reduced-motion + eased hover scale, role guard, ifDefined attr forwarding; +5 tests |
| 14 | ai-badge | ✅ | A1: manually audited (wave auditor died) — clean deprecation shim over ai-confidence-badge; dual-event escape noted as deliberate migration behavior |
| 15 | ai-batch-progress | 🔧 | A1: 13/13 — retry button triple token break, lime ETA flash, tier-3 track tokens, role=status transitions, percent clamps, press states; +6 tests |
| 16 | ai-cache-indicator | 🔧 | A2 6/6: hover no-op → border-strong, raw-3px rings tokenized, named progressbar, loading pulse, disabled-cache guard; +5 tests |
| 17 | ai-capture-flow | 🔧 | A2 5/5: bg-as-fg contrast on primary/step-dots, filter() hover → token, disabled matrix, role group not navigation, live progress; +5 tests |
| 18 | ai-changelog | 🔧 | A2 4/4: nested-interactive → version is the button, chart-token badge → status-warning, hover no-op, tokenized ring; +5 tests |
| 19 | ai-chart-summary | 🔧 | A2 5/5: keyboard-activatable trends + focus ring, trend-icon svg tokenized, direction-colored arrows, press state |
| 20 | ai-chat | 🔧 | A2 4/4: empty/version/tail tokens (text-intent, radius family), nested live region removed (parent role=log owns it) |
| 21 | ai-citation | 🔧 | A2 6/6: aria-expanded disclosure, static +N badge (no false affordance), list-mode relevance titles (was color-only), open-state distinct |
| 22 | ai-collaborative-editor | 🔧 | A2 6/6: dead hover removed, opacity/focus-ring/read-only tokenized, stats live region, cursor caret+label polish; +tests |
| 23 | ai-command-palette | 🔧 | A2 3/3: dead rounded prop removed, loading/emptyText forwarded to cg-command, doc fix; +7 tests |
| 24 | ai-confidence-badge | 🔧 | A2 4/4: role status→button, min/max-width tokens, disabled state (guards + tabindex/aria) |
| 25 | ai-confidence-slider | 🔧 | A2 4/4: focus-ring/thumb-border tokens, distribution bars now %-height (magic 32/2px gone), redundant aria-value* dropped; +6 tests |
| 26 | ai-consent-manager | 🔧 | A2 3/3: P0 per-switch aria-label (were nameless), row dividers/hover/focus-within, non-vanishing empty-state panel |
| 27 | ai-context-window | 🔧 | A2 3/3: P0 bar segments keyboard-operable buttons + focus ring, tooltip focus parity, over-budget widths clamped + flagged |
| 28 | ai-copy-button | 🔧 | A2 5/5: opacity/focus-ring tokens, icon aria-hidden, empty-value disable, aria-label only when icon-only |
| 29 | ai-cost-dashboard | 🔧 | A2 2/2: focus-ring width tokenized, full-width row press feedback scale→background |
| 30 | ai-data-card | 🔧 | A2 4/4: P0 dead footer buttons (@cg-click→@click), P0 missing cg-icon import (copy glyph invisible), nested-interactive rows fixed, dead code removed; +tests |
| 31 | ai-data-lineage | 🔧 | A3 4/4: focus ring tokenized, node aria-pressed + on-path context, role=list ordered flow, press state |
| 32 | ai-data-preview | 🔧 | A3 8/8: row hover visible on dark, cancel/confirm token fixes, JSON-bool code token, empty-data disabled, region aria-labelledby |
| 33 | ai-data-table | 🔧 | A3 6/6+bonus: sort-arrow SVG in html`` → svg`` (invisible icons), accent-text sort states, anomaly cells keyboard-operable, empty role=status, configurable label |
| 34 | ai-debug-console | 🔧 | A3: nested-interactive toggle → native button, focus outlines/dot radius tokenized, press states |
| 35 | ai-detection-canvas | 🔧 | A3 3/3: bbox role gated on interactive, keyboard tooltip focus, overridable imageAlt |
| 36 | ai-diff-panel | 🔧 | A3 5/5: mode toggle aria group + aria-pressed, active-pill/track overlay tokens, hover state, unchanged lines not tab stops |
| 37 | ai-embedding-viz | 🔧 | A3 5/5: cluster palette → chart tokens (raw hex gone), role=img→group, border-token-as-text fixed, hover accent + selected state |
| 38 | ai-empty-state | ✅ | A3: audited clean — deprecation shim over cg-empty-state |
| 39 | ai-error-boundary | 🔧 | A3 2/2: message → base body-text token, warning icon 24px, dead font-size removed |
| 40 | ai-eval-scorecard | 🔧 | A3 6/6: focus-ring token, aria-expanded/controls disclosure, keyboard fires metric-click, non-expandable rows not fake buttons, unknown grades neutral |
| 41 | ai-feature-flag | 🔧 | A3 5/5: 3 focus outlines tokenized, Space activation, letter-spacing/radius tokens, on-state track solid pill |
| 42 | ai-feedback | 🔧 | A3 5/5: dead font-size removed, star aria-pressed, submit always-present/disabled-driven, showComment latch → internal state |
| 43 | ai-file-upload | 🔧 | A3 2/2: AI prompt drives placeholder (visible dropzone text) not label, error/success/helper/max-files forwarded |
| 44 | ai-form-generator | 🔧 | A3 P0×3: @cg-click→@click submit (dead), missing ai-thinking import (blank loading), missing cg-label import (invisible select errors); + error summary + focus-first-invalid |
| 45 | ai-guardrail | 🔧 | A3 6/6: P0 blocked-content reveal keyboard/SR-operable, role=status not alert, focus-ring/blur tokens, high severity distinct |
| 46 | ai-heatmap | ⬜ | |
| 47 | ai-insight-card | ⬜ | |
| 48 | ai-json-viewer | ⬜ | |
| 49 | ai-keyboard-shortcuts | ⬜ | |
| 50 | ai-kpi-grid | ⬜ | |
| 51 | ai-labeling-board | ⬜ | |
| 52 | ai-memory-panel | ⬜ | |
| 53 | ai-model-comparison | ⬜ | |
| 54 | ai-model-selector | ⬜ | |
| 55 | ai-notification-center | ⬜ | |
| 56 | ai-onboarding | ⬜ | |
| 57 | ai-permission-gate | ⬜ | |
| 58 | ai-personalization-dash | ⬜ | |
| 59 | ai-presence | ⬜ | |
| 60 | ai-progress-steps | ⬜ | |
| 61 | ai-prompt-editor | ⬜ | |
| 62 | ai-prompt-template | ⬜ | |
| 63 | ai-rag-panel | ⬜ | |
| 64 | ai-reasoning-tree | ⬜ | |
| 65 | ai-result-panel | ⬜ | |
| 66 | ai-reveal-animation | ⬜ | |
| 67 | ai-reward-signal | ⬜ | |
| 68 | ai-rich-message | ⬜ | |
| 69 | ai-scenario-panel | ⬜ | |
| 70 | ai-search | ⬜ | |
| 71 | ai-segmentation-viewer | ⬜ | |
| 72 | ai-sidebar | ⬜ | |
| 73 | ai-similarity-card | ⬜ | |
| 74 | ai-source-graph | ⬜ | |
| 75 | ai-status-page | ⬜ | |
| 76 | ai-streaming-text | ⬜ | |
| 77 | ai-test-runner | ⬜ | |
| 78 | ai-thinking | ⬜ | |
| 79 | ai-timeline | ⬜ | |
| 80 | ai-toast | ⬜ | |
| 81 | ai-token-tracker | ⬜ | |
| 82 | ai-tool-card-resolver | ⬜ | |
| 83 | ai-tool-indicator | ⬜ | |
| 84 | ai-transform-slider | ⬜ | |
| 85 | ai-translation-panel | ⬜ | |
| 86 | ai-usage-meter | ⬜ | |
| 87 | ai-validation-checklist | ⬜ | |
| 88 | ai-version-selector | ⬜ | |
| 89 | ai-voice-panel | ⬜ | |
| 90 | ai-webhook-config | ⬜ | |
| 91 | ai-workflow-builder | ⬜ | |
