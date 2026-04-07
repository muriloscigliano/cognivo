# ai-agent-card Improvement Plan

**Component**: `ai-agent-card`
**Category**: AI-Native
**File**: `src/components/ai-agent-card/ai-agent-card.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` colors in handoff-step active state (line 102: `rgba(223, 255, 97, 0.1)`)
2. Actions (pause/cancel) only visible on hover (line 123) -- inaccessible on touch and to keyboard users
3. Missing `disabled`, `loading`, and `selected` states

---

## 1. Functional Issues

- **`override role`**: Line 143 uses `override role` to shadow the native `role` property inherited from `HTMLElement`. This is technically valid but unusual -- the `role` here refers to the agent's organizational role, not the ARIA role. Could cause confusion. Consider renaming to `agentRole` or `jobRole`.
- **Actions only for active agents**: Lines 176-181 -- pause/cancel buttons only render when `isActive` (thinking/acting). If an agent is in `error` state, there's no recovery action (retry, restart).
- **No progress indicator**: For long-running tasks, no way to show progress percentage or step count.
- **Handoff chain not interactive**: Handoff steps are display-only. Consider making them clickable to navigate to that agent.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (idle) | Yes | Yes | Token-based background/border |
| Hover | Yes | Yes | Border color change, shadow elevation, translateY |
| Active (thinking/acting) | Yes | Yes | AI accent border color |
| Focus | Yes | Yes | `--cg-brand-ai-accent` outline |
| Disabled | **No** | N/A | Missing entirely |
| Loading | **No** | N/A | No skeleton state |
| Error | Yes (status dot) | Yes | Red dot indicator, but no card-level error styling |
| Done | Yes (status dot) | Yes | Green dot indicator |
| Selected | **No** | N/A | No selection state for multi-agent views |
| Pressed | **No** | N/A | No active/pressed visual |

### 2.2 Keyboard Navigation
- Card has `tabindex="0"` and inline `@keydown` handler (line 174) for Enter/Space. Good.
- **Action buttons inaccessible**: `.actions` is `opacity: 0` (line 121) until hover. Add `:focus-within` rule.
- Action buttons have proper focus-visible styles. Good.

### 2.3 ARIA & Accessibility
- `role="article"` with descriptive `aria-label` including name and status. Good.
- Pause/Cancel buttons have `aria-label`. Good.
- Avatar has `aria-hidden="true"`. Good.
- **Missing `aria-live` on status**: Status changes (idle -> thinking -> done) are not announced to screen readers. The `.status-row` should have `aria-live="polite"`.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 39 | `transition: all 150ms` | Use `--cg-motion-duration-normal` |
| 42 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 35 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 35 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 42 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 102 | `rgba(223, 255, 97, 0.1)` | `--cg-color-brand-ai-bg-subtle` |

### 3.3 Typography Issues
- All font sizes use `--cg-font-size-*` tokens. Good.
- Font weights use `700` and `600` directly -- should use `--cg-font-weight-bold` and `--cg-font-weight-semibold`.

### 3.4 Spacing Issues
- All spacing values use `--cg-spacing-*` tokens. Good.

### 3.5 Modern Design Enhancements
- Add pulsing border glow for `thinking` state (not just dot animation).
- Add task progress bar below the task text.
- Add mini sparkline/activity graph for agent performance metrics.
- Add transition animation when status changes.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Show actions on `:focus-within`** -- add `.card:focus-within .actions { opacity: 1; }` for keyboard accessibility.

### P1 - High
2. **Add `aria-live="polite"` to `.status-row`** for screen reader announcements on status changes.
3. **Replace raw `rgba()` colors** (lines 35, 42, 102) with design tokens.
4. **Rename `role` property to `agentRole`** to avoid shadowing `HTMLElement.role`.
5. **Add loading/skeleton state** for async agent list population.

### P2 - Medium
6. **Add disabled state** with reduced opacity and `pointer-events: none`.
7. **Add selected state** for multi-agent selection patterns.
8. **Add error-state card styling** -- when `status="error"`, add red border/background tint beyond just the dot.
9. **Tokenize font-weight values** -- replace raw `700`/`600` with token variables.
10. **Tokenize transition duration** on line 39.

### P3 - Low
11. **Add progress indicator** for long-running tasks.
12. **Add thinking border glow animation** beyond just the dot pulse.
13. **Add retry/restart action** for error state agents.
14. **Make handoff steps interactive** with click handlers.
