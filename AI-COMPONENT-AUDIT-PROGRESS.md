# AI Component Manual Audit — Progress Tracker

**Started:** 2026-06-08
**Scope:** All 91 `ai-*` components in `packages/components/src/components/`.
**Per component:** 6-section manual review (token audit, styling, states, interaction, visual design, fixes) → apply real fixes → online research for design enhancement → refresh playground example in `docs/src/data/registry.ts`.

**Reports written to:** `audits/ai/<component>.md`
**Convention reminder:** NO `var(--token, fallback)` comma-fallbacks. Tier 3 → 2 → 1. Colors must be tier-2 semantic. `@cssprop` JSDoc defaults are documentation, NOT violations.

## Legend
- ✅ clean — report written, no fixes needed
- 🔧 fixed — report written, fixes applied
- 🔬 research done
- 🎮 playground refreshed
- ⬜ not started

## Status (91 components)

| # | Component | Report | Fixes | Research | Playground |
|---|-----------|--------|-------|----------|------------|
| 1 | ai-thinking | ✅ | none (2 flags) | ⬜ | ⬜ |
| 2 | ai-ab-test | ✅ | none (clean) | 🔬 | proposed |
| 3 | ai-rich-message | 🔧 | 4 applied | 🔬 | proposed |
| 4 | ai-cache-indicator | 🔧 | 5 applied | 🔬 | proposed |
| 5 | ai-data-table | 🔧 | 8 applied | 🔬 | proposed |
| 6 | ai-accessibility-report | ✅ | 2 applied | 🔬 | proposed |
| 7 | ai-action-preview | 🔧 | 4 applied | 🔬 | proposed |
| 8 | ai-agent-card | ✅ | none (clean) | 🔬 | proposed |
| 9 | ai-agent-steps | 🔧 | 6 applied | 🔬 | proposed |
| 10 | ai-alert-card | 🔧 | 4 applied (1 rej) | 🔬 | proposed |
| 11 | ai-analytics-chart | 🔧 | 4 applied | 🔬 | proposed |
| 12 | ai-annotation | 🔧 | 1 applied | 🔬 | proposed |
| 13 | ai-api-key-manager | 🔧 | 4 applied (1 defer) | 🔬 | proposed |
| 14 | ai-app-sidebar | 🔧 | 5 applied (1 defer) | 🔬 | proposed |
| 15 | ai-assistant-widget | 🔧 | 0 applied (3 defer) | 🔬 | proposed |
| 16 | ai-audio-player | 🔧 | 1 applied (2 defer) | 🔬 | proposed |
| 17 | ai-avatar | ✅ | none (clean) | 🔬 | proposed |
| ... | (remaining 74) | ⬜ | | | |

**Batch 1 complete (val):** 17 fixes across 3 components; type-check green.
**Batch 2 complete:** 31 fixes across 9 components; type-check green.

### Deferred / rejected items (need a human design decision, NOT applied)
- **ai-assistant-widget L80** `width: 360px` — agent proposed invented token `--cg-component-ai-chat-width` (doesn't exist). Needs a real tier-3 token added to `@cognivo/tokens`, or accept 360px as a documented exception.
- **ai-alert-card L51** — kept `--cg-elevation-2` (valid); agent's fix would have introduced raw `4px 12px`.
- **ai-app-sidebar L215** `role="menuitem"` — orphaned (no `role="menu"` parent). Either remove the role (bare buttons, valid) or wrap items in a proper `role="menu"`. Design decision deferred.
- **Touch-target enlargements (32→48 / 40→48 / 4→8px padding)** in ai-assistant-widget, ai-audio-player, ai-api-key-manager — valid a11y improvements but are visual/design changes, not token violations. Deferred for design sign-off.

Playground proposals captured in each report (not yet applied to registry.ts).

## Notes / Findings
- **ai-thinking**: near-clean. Possible semantic mismatch using `--cg-color-surface-container-outlined` as a text color (L56,75-77); cancel button touch target <44px. Neither a hard defect.
- Survey false-positive caveat: "banned color" hits are mostly `@cssprop` docs; "raw px" hits mostly legit (%, keyframes, hairlines). Real violations concentrated (e.g. ai-rich-message hex fallbacks L262/274).
