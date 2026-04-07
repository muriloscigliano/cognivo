# ai-workflow-builder Improvement Plan

**Component**: `ai-workflow-builder`
**Category**: AI-Native
**File**: `src/components/ai-workflow-builder/ai-workflow-builder.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Step icon type colors (lines 80-84) use raw rgba backgrounds and raw hex text colors -- 10 raw color values total
2. Multiple magic numbers in font-sizes (9px, 11px, 13px, 14px), dimensions (28px, 200px, 20px, 32px), and margins
3. No keyboard navigation between workflow steps (arrow keys); every step is individually tabbable with no roving tabindex

---

## 1. Functional Issues

- **Lines 80-84**: Five step icon types each have hard-coded `rgba(...)` backgrounds and raw hex color values:
  - `.start`: `rgba(34, 197, 94, 0.12)`, `color: #4ade80`
  - `.agent`: `rgba(223, 255, 97, 0.12)`, `color: #dfff61`
  - `.tool`: `rgba(59, 130, 246, 0.12)`, `color: #60a5fa`
  - `.condition`: `rgba(245, 158, 11, 0.12)`, `color: #fbbf24`
  - `.end`: `rgba(139, 92, 246, 0.12)`, `color: #a78bfa`
  These must all use semantic design tokens.
- **Line 70**: `.step.active` uses `rgba(223, 255, 97, 0.04)` -- raw rgba.
- **Line 108**: `override title` property shadows `HTMLElement.title`, which can cause confusion and warnings. Consider renaming to `heading` or `workflowTitle`.
- **Line 46**: Container styling is crammed on one line -- minor readability issue but no functional impact.
- The `next` property on `WorkflowStep` (line 32) is defined but never used in rendering. The component renders a simple linear flow, not an actual DAG. The branching capability is aspirational but unimplemented.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Pending | Yes | Yes | Default gray border from tokens |
| Active | Yes | Partial | Border token but background is raw rgba (line 70) |
| Complete | Yes | Yes | Green border token |
| Error | Yes | Yes | Red border token |
| Skipped | Yes | Partial | `opacity: 0.5` on line 73 is a magic number |
| Hover | Yes | Yes | Border color change (line 68) |
| Focus-visible | Yes | Yes | Accent outline (line 69) |
| Disabled | No | N/A | No disabled step state |
| Loading | No | N/A | No loading/spinner state within a step |
| Pressed | No | N/A | No `:active` press feedback |

### 2.2 Keyboard Navigation
- Steps have `tabindex="0"` (line 145) -- all individually tabbable
- Enter/Space handler for step click (line 147)
- **Missing**: No arrow key navigation between steps (Up/Down since it's vertical)
- **Missing**: No Home/End key support
- **Missing**: No Escape key to deselect/unfocus

### 2.3 ARIA & Accessibility
- Container has `role="figure"` with `aria-label` (line 137) -- acceptable but `role="group"` might be more semantic for an interactive flow
- Steps have `role="listitem"` (line 145) but there is no parent `role="list"` -- **ARIA violation**. The `.flow` div needs `role="list"`.
- **Missing**: No `aria-label` on individual steps (only visual text content)
- **Missing**: Step status not communicated -- should add `aria-label` combining label, type, and status
- **Missing**: No `aria-current` on active step
- Connector divs have no ARIA markup -- correct, they're decorative

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 51 | `font-size: 14px` (title) | `var(--cg-font-size-sm, 14px)` |
| 52 | `font-size: 11px` (step count) | `var(--cg-font-size-2xs, 11px)` |
| 58 | `height: 20px` (connector) | `var(--cg-spacing-20, 20px)` |
| 66 | `min-width: 200px` (step) | `var(--cg-workflow-step-min-width, 200px)` |
| 66 | `transition: all 150ms` | `var(--cg-motion-duration-normal, 150ms)` |
| 73 | `opacity: 0.5` (skipped) | `var(--cg-opacity-disabled, 0.5)` |
| 76 | `width: 28px; height: 28px` (step icon) | `var(--cg-size-workflow-icon, 28px)` |
| 87 | `font-size: 13px` (step label) | `var(--cg-font-size-sm, 13px)` |
| 88 | `font-size: 11px` (step desc) | `var(--cg-font-size-2xs, 11px)` |
| 88 | `margin-top: 2px` (step desc) | `var(--cg-spacing-2, 2px)` |
| 89 | `font-size: 9px` (step type) | `var(--cg-font-size-3xs, 9px)` |
| 89 | `letter-spacing: 0.05em` | `var(--cg-letter-spacing-wide, 0.05em)` |
| 96 | `padding: 32px` (empty) | `var(--cg-spacing-32, 32px)` |
| 96 | `font-size: 13px` (empty) | `var(--cg-font-size-sm, 13px)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 46 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-white-subtle)` |
| 47 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-white-ultra-subtle)` |
| 70 | `rgba(223, 255, 97, 0.04)` (active bg) | `var(--cg-overlay-accent-ultra-subtle)` |
| 80 | `rgba(34, 197, 94, 0.12)` (start bg) | `var(--cg-overlay-success-subtle)` |
| 80 | `#4ade80` (start text) | `var(--cg-green-400, #4ade80)` |
| 81 | `rgba(223, 255, 97, 0.12)` (agent bg) | `var(--cg-overlay-accent-subtle)` |
| 81 | `#dfff61` (agent text) | `var(--cg-brand-ai-accent, #dfff61)` |
| 82 | `rgba(59, 130, 246, 0.12)` (tool bg) | `var(--cg-overlay-info-subtle)` |
| 82 | `#60a5fa` (tool text) | `var(--cg-blue-400, #60a5fa)` |
| 83 | `rgba(245, 158, 11, 0.12)` (condition bg) | `var(--cg-overlay-warning-subtle)` |
| 83 | `#fbbf24` (condition text) | `var(--cg-yellow-400, #fbbf24)` |
| 84 | `rgba(139, 92, 246, 0.12)` (end bg) | `var(--cg-overlay-purple-subtle)` |
| 84 | `#a78bfa` (end text) | `var(--cg-purple-400, #a78bfa)` |

### 3.3 Spacing Issues
- Step padding uses tokens -- good
- Header margin uses token -- good
- Empty state padding and desc margin use raw values

### 3.4 Modern Design Enhancements
- Implement actual DAG rendering using the `next` property for branching flows
- Add step drag-and-drop reordering
- Add animated connectors (line grows as steps complete)
- Add `:active` press scale on steps
- Add a minimap or zoom controls for large workflows

## 4. Prioritized Fixes

### P0 - Critical
1. Add `role="list"` to `.flow` container -- currently `role="listitem"` on steps with no parent list is an **ARIA violation**
2. Replace all 13 raw color values (rgba and hex) with design tokens
3. Add `aria-label` on steps including label, type, and status
4. Add `aria-current="step"` on active step

### P1 - High
5. Replace all 14+ magic number values with design tokens
6. Rename `title` property to avoid shadowing `HTMLElement.title`
7. Add arrow key navigation between workflow steps
8. Replace `opacity: 0.5` with disabled opacity token

### P2 - Medium
9. Add `:active` press feedback on steps
10. Add loading/spinner state within step icons
11. Add disabled step state
12. Implement DAG branching using `next` property

### P3 - Low
13. Add step drag-and-drop reordering
14. Add animated connector growth
15. Add minimap for large workflows
16. Add collapse/expand for step descriptions
