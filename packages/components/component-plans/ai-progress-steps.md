# ai-progress-steps — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: `height: 2px` on `.line` — acceptable for divider. `width/height` on dot use spacing tokens.
- **Pulse animation**: `@keyframes pulse` is defined but **empty** (line 114-115) — the animation does nothing.
- **Compact mode**: Reduces dot size and hides labels via `:host([compact])`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Pending | Yes | Muted border and color |
| Active | Yes | Accent border, text color, (broken) pulse animation |
| Complete | Yes | Accent background fill with check icon |
| Error | Yes | Error border, error background, X icon |
| Hover | **No** | Steps are clickable but have no hover style |
| Focus-visible | Yes | 2px accent outline |
| Compact | Yes | Smaller dots, hidden labels |
| Empty | **No** | No empty state when phases array is empty |
| Loading | **No** | N/A |
| Disabled | **No** | No disabled state |

### Interaction Audit
- **Phase click**: Button elements fire `ai-progress-phase-click` with label, status, index.
- **Keyboard**: Native button keyboard support (Enter/Space).
- **ARIA**: `role="list"`, `role="listitem"`, `aria-label` with label and status.

## Style Fixes Needed

1. **Empty pulse animation** — `@keyframes pulse` has no keyframes. Should add: `0%, 100% { opacity: 1; } 50% { opacity: 0.6; }` (or similar).
2. **Step hover** — No hover style on `.step` button despite being clickable. Add subtle background or scale.
3. **Step active/pressed** — No `:active` press feedback.
4. **Line height** — `2px` is acceptable but consider tokenizing.
5. **Duration text** — Uses correct 2xs token for small text.
6. **Rounded variants** — Missing `:host([rounded])` support (though less relevant for a step indicator).

## Interaction Fixes Needed

1. **Empty state** — Render nothing or a message when `phases` array is empty.
2. **Phase click utility** — Clicking a completed step could navigate back (use case: wizard-style navigation).
3. **Tooltip** — Show status and duration on hover for compact mode where labels are hidden.
4. **Progress percentage** — Consider showing overall progress (e.g., "2 of 5 complete").
5. **Animated transitions** — When status changes (e.g., pending -> active), animate the transition.
6. **Responsive stacking** — On very narrow screens, steps may overflow. Consider vertical layout option.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders phase dots from `.phases` array | Unit |
| 2 | Phase dot gets correct `data-status` attribute | Unit |
| 3 | Complete phase shows check icon | Unit |
| 4 | Error phase shows X icon | Unit |
| 5 | Active phase shows filled dot icon | Unit |
| 6 | Pending phase shows number | Unit |
| 7 | Lines between phases colored correctly (done vs pending) | Unit |
| 8 | First and last lines are hidden | Unit |
| 9 | Phase click fires `ai-progress-phase-click` | Unit |
| 10 | Labels shown in normal mode | Unit |
| 11 | Labels hidden in compact mode | Visual |
| 12 | Duration shown when available | Unit |
| 13 | Dot size reduced in compact mode | Visual |
| 14 | Focus-visible ring on step buttons | A11y |
| 15 | `aria-label` includes phase label and status | A11y |
| 16 | Active phase label has primary text color | Visual |
| 17 | Complete phase label has accent color | Visual |
