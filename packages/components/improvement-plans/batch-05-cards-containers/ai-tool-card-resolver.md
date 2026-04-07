# ai-tool-card-resolver Improvement Plan

**Component**: `ai-tool-card-resolver`
**Category**: AI-Native
**File**: `src/components/ai-tool-card-resolver/ai-tool-card-resolver.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. `_resolveComponent()` creates a new DOM element on every render call (line 157-182) -- no caching, causes memory leaks and broken state
2. Raw `rgba()` overlay colors in box-shadow and gradient (lines 41-42)
3. Duplicate `:focus-visible` rule (lines 124-127) applies a generic box-shadow that may conflict with resolved component focus styles

---

## 1. Functional Issues

- **Element creation on every render**: `_renderResolved()` (line 236) calls `_resolveComponent()` which calls `document.createElement(tag)` on every render cycle. This creates a new element each time, losing internal state of the resolved component. Should cache the resolved element and only recreate when `toolName`, `toolData`, or `registry` changes.
- **AbortController cleanup race condition**: Line 162 aborts previous listeners, but the new element is created and may not be in the DOM yet. If `_resolveComponent()` is called rapidly, orphaned elements accumulate.
- **No retry mechanism**: When resolution fails (line 176), the error state is permanent. No way to retry resolution.
- **Fallback JSON display has no copy button**: The raw JSON fallback (lines 194-209) shows tool data but provides no way to copy it.
- **`max-height: 200px` hardcoded**: Line 98 -- fallback JSON container has a fixed max-height that should be a token or configurable.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (resolved) | Yes | Yes | Rendered component in `.resolved` div |
| Hover | **No** | N/A | No hover state on the card wrapper |
| Active/Pressed | **No** | N/A | Not interactive at wrapper level |
| Focus | Yes | Partial | Generic `:focus-visible` with box-shadow |
| Disabled | **No** | N/A | Missing entirely |
| Loading | Yes | Yes | Skeleton with shimmer |
| Error | Yes | Yes | Red error icon and text |
| Fallback | Yes | Yes | JSON display with tool name |

### 2.2 Keyboard Navigation
- Outer card has `tabindex="0"` (line 227). May cause confusing focus if resolved component is also interactive.
- No keyboard interaction on the wrapper itself -- appropriate since it's a pass-through container.

### 2.3 ARIA & Accessibility
- `role="region"` with `aria-label="Tool card: {name}"` on outer wrapper. Good.
- Loading skeleton has `role="status"` with `aria-label`. Good.
- Error state has `role="alert"`. Good.
- Fallback JSON has `role="log"`. Reasonable.
- **Concern**: `tabindex="0"` on the outer wrapper when resolved component is interactive creates a double-focus trap. Consider removing `tabindex` when resolved component is rendered.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 39 | `--cg-border-radius-200, 12px` | Correct token usage, fallback acceptable |
| 41 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 42 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 54 | `height: 14px` | Use `--cg-spacing-14` or `--cg-spacing-16` |
| 98 | `max-height: 200px` | Should be configurable or use a spacing multiple |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 41 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 42 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |

### 3.3 Typography Issues
- All font sizes use `--cg-font-size-*` tokens. Good.
- Fallback JSON uses `--cg-font-family-mono`. Good.

### 3.4 Spacing Issues
- All spacing values use `--cg-spacing-*` tokens. Good.
- Skeleton line widths use percentages. Acceptable.

### 3.5 Modern Design Enhancements
- Add resolution animation -- fade/scale transition when component resolves from skeleton.
- Add tool icon in the card header for better identification.
- Add copy button on fallback JSON view.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Cache resolved element** -- do not call `document.createElement` on every render. Cache by `toolName + registry[toolName]` and update `toolData` property on the cached element. Recreate only when tag changes.

### P1 - High
2. **Remove `tabindex="0"` when resolved component is rendered** -- avoid double-focus trap.
3. **Replace raw `rgba()` overlay colors** (lines 41-42) with design tokens.
4. **Remove or scope the generic `:focus-visible` rule** (lines 124-127) -- it applies to all focusable descendants which may break resolved component styles.
5. **Fix AbortController cleanup** -- ensure old elements are properly dereferenced.

### P2 - Medium
6. **Add retry mechanism** for failed resolutions -- retry button in error state.
7. **Add copy button to fallback JSON view**.
8. **Replace `max-height: 200px`** (line 98) with a configurable value or token.
9. **Add resolution transition** -- smooth fade from skeleton to resolved content.

### P3 - Low
10. **Add hover state on card wrapper** for visual consistency.
11. **Add disabled state** with reduced opacity.
12. **Tokenize skeleton line height `14px`** (line 54) with spacing token.
