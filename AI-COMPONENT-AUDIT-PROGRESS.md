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
| 16 | ai-cache-indicator | ⬜ | |
| 17 | ai-capture-flow | ⬜ | |
| 18 | ai-changelog | ⬜ | |
| 19 | ai-chart-summary | ⬜ | |
| 20 | ai-chat | ⬜ | |
| 21 | ai-citation | ⬜ | |
| 22 | ai-collaborative-editor | ⬜ | |
| 23 | ai-command-palette | ⬜ | |
| 24 | ai-confidence-badge | ⬜ | |
| 25 | ai-confidence-slider | ⬜ | |
| 26 | ai-consent-manager | ⬜ | |
| 27 | ai-context-window | ⬜ | |
| 28 | ai-copy-button | ⬜ | |
| 29 | ai-cost-dashboard | ⬜ | |
| 30 | ai-data-card | ⬜ | |
| 31 | ai-data-lineage | ⬜ | |
| 32 | ai-data-preview | ⬜ | |
| 33 | ai-data-table | ⬜ | |
| 34 | ai-debug-console | ⬜ | |
| 35 | ai-detection-canvas | ⬜ | |
| 36 | ai-diff-panel | ⬜ | |
| 37 | ai-embedding-viz | ⬜ | |
| 38 | ai-empty-state | ⬜ | |
| 39 | ai-error-boundary | ⬜ | |
| 40 | ai-eval-scorecard | ⬜ | |
| 41 | ai-feature-flag | ⬜ | |
| 42 | ai-feedback | ⬜ | |
| 43 | ai-file-upload | ⬜ | |
| 44 | ai-form-generator | ⬜ | |
| 45 | ai-guardrail | ⬜ | |
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
