# ai-progress-steps Improvement Plan

**Component**: `ai-progress-steps`
**Category**: AI-Native
**File**: `src/components/ai-progress-steps/ai-progress-steps.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers in dot sizes, font-weight, duration font-size, and margin values
2. Semantic role mismatch: steps use `role="listitem"` inside `role="list"` but each step is a `<button>`, making it a clickable list -- consider `role="group"` with `role="button"` semantics
3. No keyboard navigation between phases (arrow keys); every button is individually tabbable

---

## 1. Functional Issues

- **Line 183-184**: Each step is a `<button>` with `role="listitem"` inside a `<div role="list">`. Using `role="listitem"` on a button is semantically questionable. The button already implies interactivity; wrapping in a list is acceptable but consider using `role="progressbar"` or `role="group"` semantics instead.
- **Line 40-41**: Container has `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` and `background-image: linear-gradient(...)` with raw rgba values. Should use overlay tokens.
- **Line 112-113**: The error dot uses `rgba(239, 68, 68, 0.15)` -- raw rgba, should use `var(--cg-overlay-danger-subtle)`.
- **Line 117-118**: Pulse keyframes use `rgba(223, 255, 97, 0.3)` and `rgba(223, 255, 97, 0)` -- raw rgba values.
- No empty state handling: if `phases` is an empty array, renders an empty div.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Pending | Yes | Yes | Border and text colors via tokens |
| Active | Yes | Partial | Pulse animation uses raw rgba (line 117) |
| Complete | Yes | Yes | Accent color fill |
| Error | Yes | Partial | Background uses raw rgba (line 112) |
| Hover | No | N/A | No hover state on step buttons |
| Focus-visible | Yes | Yes | Accent outline (line 62) |
| Disabled | No | N/A | No disabled phase state |
| Loading | No | N/A | Active pulse serves as loading indicator -- adequate |

### 2.2 Keyboard Navigation
- Each step button has `tabindex="0"` (line 184) -- all phases are in the tab order
- **Missing**: No arrow key navigation between phases. Should use roving tabindex pattern: only active/current phase has `tabindex="0"`, others get `tabindex="-1"`, and arrow keys move focus
- **Missing**: No Home/End key support
- **Missing**: No `@keydown` handler at the container level for inter-phase navigation

### 2.3 ARIA & Accessibility
- Container has `role="list"` and `aria-label="Progress steps"` (line 177) -- good
- Each step has `aria-label="${label}: ${status}"` (line 186) -- good
- **Missing**: No `aria-current="step"` on the active phase
- **Missing**: Progress semantics -- could add `aria-valuemin`, `aria-valuemax`, `aria-valuenow` at the container level to indicate overall progress

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 87-88 | `width: 28px; height: 28px` (dot) | `var(--cg-size-step-dot, 28px)` |
| 93 | `font-weight: 600` | `var(--cg-font-weight-semibold, 600)` |
| 97 | `transition: all 200ms ease` | `var(--cg-motion-duration-fast, 200ms)` |
| 117 | `rgba(223, 255, 97, 0.3)` | `var(--cg-overlay-accent-medium)` |
| 118 | `6px` in box-shadow | `var(--cg-ring-width-lg, 6px)` |
| 128 | `font-weight: 500` | `var(--cg-font-weight-medium, 500)` |
| 143 | `font-size: 10px` (duration) | `var(--cg-font-size-2xs, 10px)` |
| 144 | `margin-top: 2px` | `var(--cg-spacing-2, 2px)` |
| 149 | `width: 22px; height: 22px` (compact dot) | `var(--cg-size-step-dot-compact, 22px)` |
| 77 | `transition: background 200ms ease` (line) | `var(--cg-motion-duration-fast, 200ms)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 40 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-white-subtle)` |
| 41 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-white-ultra-subtle)` |
| 112 | `rgba(239, 68, 68, 0.15)` | `var(--cg-overlay-danger-subtle)` |
| 117 | `rgba(223, 255, 97, 0.3)` | `var(--cg-overlay-accent-medium)` |
| 118 | `rgba(223, 255, 97, 0)` | `transparent` (OK in keyframes) |

### 3.3 Spacing Issues
- Dot gap within step-row is managed by flex layout -- clean
- Info section uses `margin-top: var(--cg-spacing-6)` -- good
- Duration has raw `margin-top: 2px` (line 144) -- needs token

### 3.4 Modern Design Enhancements
- Add hover state on step buttons (subtle background highlight)
- Add `:active` press scale feedback
- Consider adding a "skipped" status with strikethrough label
- Add connecting line animation (grow from left to right as phases complete)

## 4. Prioritized Fixes

### P0 - Critical
1. Implement roving tabindex pattern for keyboard navigation (arrow keys between phases)
2. Add `aria-current="step"` on the active phase

### P1 - High
3. Replace all 10 magic number values with design tokens
4. Replace 4 raw rgba color values with overlay tokens
5. Add hover state on step buttons
6. Add empty state handling for empty `phases` array

### P2 - Medium
7. Add `:active` press feedback on step buttons
8. Add overall progress semantics (`aria-valuenow` based on completed phases)
9. Consider `role="group"` instead of `role="list"` for clickable phases

### P3 - Low
10. Add "skipped" status type
11. Add connecting line grow animation
12. Add disabled phase state
