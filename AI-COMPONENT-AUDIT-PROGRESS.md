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
| 6 | ai-accessibility-report | ⬜ | | | |
| 7 | ai-action-preview | ⬜ | | | |
| 8 | ai-agent-card | ⬜ | | | |
| 9 | ai-agent-steps | ⬜ | | | |
| 10 | ai-alert-card | ⬜ | | | |
| ... | (remaining 81) | ⬜ | | | |

**Batch 1 complete (val):** 17 fixes applied across 3 components; type-check green. Playground proposals captured in each report (not yet applied to registry.ts).

## Notes / Findings
- **ai-thinking**: near-clean. Possible semantic mismatch using `--cg-color-surface-container-outlined` as a text color (L56,75-77); cancel button touch target <44px. Neither a hard defect.
- Survey false-positive caveat: "banned color" hits are mostly `@cssprop` docs; "raw px" hits mostly legit (%, keyframes, hairlines). Real violations concentrated (e.g. ai-rich-message hex fallbacks L262/274).
