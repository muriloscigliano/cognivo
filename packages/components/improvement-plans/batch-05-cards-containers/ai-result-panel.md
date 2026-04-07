# ai-result-panel Improvement Plan

**Component**: `ai-result-panel`
**Category**: AI-Native
**File**: `src/components/ai-result-panel/ai-result-panel.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` border color on line 47 (`rgba(223, 255, 97, 0.12)`) -- should be a semantic token
2. Tabs lack `role="tablist"` / `role="tab"` / `role="tabpanel"` ARIA pattern -- screen readers cannot navigate tabs
3. Duplicate `:focus-visible` rule on lines 285-288 overrides component-specific focus styles with a generic box-shadow

---

## 1. Functional Issues

- **Tab ARIA pattern missing**: Tabs on lines 431-435 use plain `<button>` elements without `role="tablist"`, `role="tab"`, `aria-selected`, or `role="tabpanel"`. Screen readers treat them as generic buttons.
- **Tab keyboard navigation incomplete**: No arrow key navigation between tabs (WAI-ARIA Tabs pattern requires Left/Right arrow key support).
- **`_handleCopy` uses optional chaining without feedback**: Line 334 -- `navigator.clipboard?.writeText(text)` silently fails if clipboard API is unavailable. No visual confirmation of copy success.
- **Collapse toggle has no keyboard handler**: Line 411 -- header div has `@click` but no `@keydown` for Enter/Space. The collapsible header is not a `<button>` element.
- **Empty state always shows panel shell**: Line 404 -- when no explanation and not streaming, the empty message still renders inside a `.panel` div. This is acceptable but the empty state could be more visually polished.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Token-based background/border |
| Hover | Partial | Yes | Header buttons have hover styles, driver items have hover |
| Active/Pressed | **No** | N/A | No press feedback on any interactive elements |
| Focus | Yes | Yes | `--cg-brand-ai-accent` focus rings on buttons |
| Disabled | **No** | N/A | No disabled state for panel or individual tabs |
| Loading/Streaming | Yes | Yes | Uses `<ai-thinking>` sub-component |
| Collapsed | Yes | Yes | Body hidden via display:none |
| Error | **No** | N/A | No error state for failed analysis |

### 2.2 Keyboard Navigation
- **Collapsible header not keyboard accessible**: `<div class="header">` is not a button and has no `tabindex`, `role`, or `@keydown`. Keyboard users cannot toggle collapse.
- **Tabs not keyboard navigable with arrow keys**: Only Tab key moves between tab buttons. WAI-ARIA tabs pattern requires arrow keys.
- **Sort button accessible**: Has hover state. Good.
- **Copy/Export buttons accessible**: Have focus-visible styles. Good.

### 2.3 ARIA & Accessibility
- Panel has `role="region"` with `aria-label`. Good.
- **Tabs missing ARIA**: No `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, or `role="tabpanel"`.
- **Collapsible header missing** `role="button"`, `tabindex="0"`, `aria-expanded`.
- Data table is a proper `<table>` with `<thead>` and `<th>`. Good.
- Source links use `rel="noopener"`. Good.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 47 | `rgba(223, 255, 97, 0.12)` | `--cg-color-brand-ai-border-subtle` |
| 49 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 50 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 91 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 206 | `rgba(255, 255, 255, 0.02)` | `--cg-color-surface-overlay-faint` |
| 287 | `0 0 0 2px ... 0 0 0 4px` | Double-ring pattern should use a mixin or token |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 47 | `rgba(223, 255, 97, 0.12)` | `--cg-color-brand-ai-border-subtle` |
| 91 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |

### 3.3 Typography Issues
- All font sizes use `--cg-font-size-*` tokens. Good.
- Font-weight `600` on header-btn (line 83) should use `--cg-font-weight-semibold`.

### 3.4 Spacing Issues
- All spacing values use `--cg-spacing-*` tokens. Good.

### 3.5 Modern Design Enhancements
- Add animated driver bar fill on first render (staggered entrance).
- Add copy success toast/feedback indicator.
- Add data table row hover highlight.
- Add tab change transition animation.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Implement WAI-ARIA Tabs pattern** -- add `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, and arrow key navigation.
2. **Make collapsible header keyboard accessible** -- either wrap in a `<button>` or add `tabindex="0"`, `role="button"`, `aria-expanded`, and `@keydown` handler.

### P1 - High
3. **Replace `rgba(223, 255, 97, 0.12)` border** (line 47) with `--cg-color-brand-ai-border-subtle` token.
4. **Replace raw overlay `rgba()` values** (lines 49-50) with design tokens.
5. **Remove duplicate `:focus-visible` rule** (lines 285-288) -- it overrides component-specific focus styles.
6. **Add copy success feedback** -- visual confirmation when clipboard write succeeds.

### P2 - Medium
7. **Add error state** -- show error message when analysis fails.
8. **Add active/pressed state** on interactive buttons.
9. **Tokenize font-weight `600`** references with `--cg-font-weight-semibold`.
10. **Add data table row hover styles** with token-based highlight.

### P3 - Low
11. **Add staggered driver bar entrance animation**.
12. **Add tab transition animation** between tab content views.
13. **Add export format options dropdown** instead of hardcoded `json`.
