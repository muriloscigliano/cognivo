# ai-workflow-builder — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: `min-width: var(--cg-spacing-200, 200px)` on `.step` — custom token reference, acceptable.
- **Step types**: Five icon types (start/agent/tool/condition/end) with semantic color backgrounds.
- **Step statuses**: Five states (pending/active/complete/error/skipped) with border colors.
- **Connectors**: Vertical 2px lines between steps, green when active/complete.
- **Rounded variants**: Supported on `.container`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Pending | Yes | Default border with muted appearance |
| Active | Yes | Accent border + subtle background |
| Complete | Yes | Green border |
| Error | Yes | Red border |
| Skipped | Yes | Reduced opacity (0.5) |
| Hover | Yes | Border color change |
| Focus-visible | Yes | 2px accent outline with offset |
| Empty | Yes | "No workflow defined" message |
| Loading | **No** | No loading state |
| Disabled | **No** | No disabled step state |

### Interaction Audit
- **Step click**: Fires `ai-workflow-step-click` with id, label, type, status.
- **Keyboard**: Enter/Space on steps triggers click.
- **ARIA**: `role="figure"`, `role="list"`, `role="listitem"`.

## Style Fixes Needed

1. **Step transition** — Uses raw `150ms` instead of `var(--cg-motion-duration-fast, 150ms)`.
2. **Connector animation** — Connectors change color instantly. Consider animated fill.
3. **Active step glow** — Active step could have a subtle glow/pulse animation.
4. **Branch rendering** — `.branch` and `.branch-line` CSS exist but branching is not rendered in the template (only linear flow).
5. **Step icon background tokens** — `.step-icon.agent` uses `--cg-overlay-brand` — verify this token exists; similar components use `--cg-overlay-brand-subtle`.
6. **Step type label** — `.step-type` uses `font-size: var(--cg-font-size-3xs, 9px)` — very small. Consider `--cg-font-size-2xs` (10px) minimum.

## Interaction Fixes Needed

1. **Branch support** — `next` field in WorkflowStep exists but branching (multiple paths) is not rendered. Implement DAG branching visualization.
2. **Drag to reorder** — No drag-and-drop reordering capability. Consider adding for builder mode.
3. **Add/remove steps** — No UI for adding or removing workflow steps. Consider add-step buttons between connectors.
4. **Step detail panel** — Clicking a step fires an event but shows no detail. Consider inline expandable detail.
5. **Arrow key navigation** — No Up/Down arrow key navigation between steps.
6. **Step editing** — No inline editing of step labels or descriptions.
7. **Zoom/pan** — For complex workflows, consider zoom/pan controls.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders steps from `.steps` array | Unit |
| 2 | Step icons match step type | Unit |
| 3 | Status icons match step status | Unit |
| 4 | Step CSS class matches status | Unit |
| 5 | Connectors shown between steps | Visual |
| 6 | Active/complete connectors get `.active` class | Unit |
| 7 | Step click fires `ai-workflow-step-click` with correct detail | Unit |
| 8 | Enter/Space on step triggers click | Interaction |
| 9 | Step count shown in header | Unit |
| 10 | Heading text rendered from `heading` prop | Unit |
| 11 | Empty state shown when steps array is empty | Unit |
| 12 | Skipped steps have reduced opacity | Visual |
| 13 | Description shown when present on step | Unit |
| 14 | Focus-visible ring on steps | A11y |
| 15 | Rounded variants change container border-radius | Visual |
| 16 | First step has no preceding connector | Visual |
