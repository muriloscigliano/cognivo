# ai-debug-console Improvement Plan

**Component**: `ai-debug-console`
**Category**: AI-Native
**File**: `src/components/ai-debug-console/ai-debug-console.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. CSS syntax error: extra closing brace on line 224 prematurely closes the style block, causing rounded variant styles (lines 227-231) to potentially be excluded
2. Raw hex colors for type dots and labels (`#60a5fa`, `#f87171` on lines 169, 171, 181, 183) without token references
3. Nested `<button>` inside `<button>` (line 286): Clear button rendered inside the toggle-bar button, which is invalid HTML

---

## 1. Functional Issues

- **Invalid nested buttons (lines 278-289)**: The clear button (line 286) is rendered inside the toggle-bar `<button>` (line 278). This is invalid HTML and causes unpredictable behavior across browsers. The `e.stopPropagation()` on line 253 mitigates click bubbling but doesn't fix the DOM invalidity.
- **CSS syntax error (line 224)**: An extra `}` after `.empty` closes the css template early. The rounded variant rules on lines 227-231 may not be included in the compiled styles.
- **`_visibleEntries` slices from end (line 241)**: `this.entries.slice(-this.maxEntries)` shows the most recent entries, which is correct for a log, but the indices in `_expanded` (line 238) reference positions in the sliced array, not the original. If entries are added dynamically, previously expanded items will shift indices and collapse unexpectedly.
- **No auto-scroll**: When new entries arrive, the panel doesn't auto-scroll to the latest entry, which is expected behavior for a debug console.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default (closed) | Yes | |
| Open | Yes | `open` property toggles panel |
| Hover | Yes | `.toggle-bar:hover`, `.entry-header:hover`, `.clear-btn:hover` |
| Active | No | No `:active` press style |
| Focus | Yes | `:focus-visible` on toggle-bar, entry-header, clear-btn |
| Disabled | No | No disabled state |
| Loading | No | No loading/connecting state |
| Error | No | No error state for malformed entries |
| Empty | Yes | `.empty` message when no entries (line 292) |
| Expanded entry | Yes | `_expanded` set per entry |

**Missing**: `:active`, disabled, loading, error states (4 missing).

### 2.2 Keyboard Navigation
- Toggle bar and entry headers are `<button>` elements -- good native keyboard support.
- Redundant `tabindex="0"` on all buttons (lines 281, 301).
- **Missing**: `Escape` key to close the panel when open.
- **Missing**: Arrow key navigation between entries.
- **Missing**: Keyboard shortcut to clear entries (e.g., when focused on the panel).

### 2.3 ARIA & Accessibility
- Good: `aria-expanded` on toggle-bar (line 279) and entry-headers (line 300).
- Good: `role="log"` on the panel (line 291) with `aria-label`.
- Good: `aria-label="Debug console"` (line 280) and `aria-label="Clear entries"` (line 287).
- **Issue**: The nested button structure (clear inside toggle) is an ARIA violation.
- **Issue**: No `aria-live` on the badge count (line 284) to announce new entries.
- **Issue**: Entry type labels (request/response/error/info) are uppercase visually but have no `aria-label` override -- screen readers will read them as typed.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 88 | `20px` | `.badge min-width/height` | `var(--cg-spacing-20, 20px)` |
| 90 | `6px` | `.badge padding` | `var(--cg-spacing-6, 6px)` |
| 94 | `10px` | `.badge font-size` | `var(--cg-font-size-2xs, 10px)` |
| 102 | `2px` | `.clear-btn padding` | `var(--cg-spacing-2, 2px)` |
| 103 | `10px` | `.clear-btn font-size` | `var(--cg-font-size-2xs, 10px)` |
| 121 | `400px` | `.panel max-height` | `var(--cg-size-100, 400px)` or CSS custom property |
| 163 | `8px` | `.type-dot width/height` | `var(--cg-spacing-8, 8px)` |
| 178 | `56px` | `.type-label min-width` | Use auto-sizing or token |
| 214 | `200px` | `.entry-content max-height` | `var(--cg-size-50, 200px)` or CSS custom property |
| 213 | `rgba(0, 0, 0, 0.2)` | `.entry-content background` | `var(--cg-color-surface-sunken)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 92 | `rgba(223, 255, 97, 0.15)` | `.badge background` | `var(--cg-brand-ai-accent-muted)` |
| 155 | `rgba(255, 255, 255, 0.02)` | `.entry-header:hover` | `var(--cg-color-surface-hover-subtle)` |
| 169 | `#60a5fa` | `.type-request` | `var(--cg-color-status-info-text-default, #60a5fa)` |
| 171 | `#f87171` | `.type-error` | `var(--cg-color-status-error-text-default, #f87171)` |
| 181 | `#60a5fa` | `.label-request` | `var(--cg-color-status-info-text-default, #60a5fa)` |
| 183 | `#f87171` | `.label-error` | `var(--cg-color-status-error-text-default, #f87171)` |
| 213 | `rgba(0, 0, 0, 0.2)` | `.entry-content background` | `var(--cg-color-surface-sunken)` |

### 3.3 Spacing Issues
- Most outer spacing uses tokens. Inner measurements (badge, type-dot, clear-btn) use magic numbers.

### 3.4 Modern Design Enhancements
- **Auto-scroll to latest entry**: Use `scrollIntoView()` in `updated()` when new entries arrive.
- **Copy button per entry**: Allow copying individual entry content to clipboard.
- **Filter by type**: Add filter buttons (request/response/error/info) to narrow the log view.
- **Syntax highlighting**: For JSON content, add basic key/value color differentiation.
- **Timestamp relative formatting**: Show "2s ago" instead of raw timestamps.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix nested button** (line 286): Move the clear button outside the toggle-bar button. Use a flex wrapper `<div>` containing the toggle button and clear button as siblings.
2. **Fix CSS syntax error** (line 224): Remove the extra closing brace after `.empty` to ensure rounded variant styles compile correctly.

### P1 - High
3. Replace raw hex colors (`#60a5fa`, `#f87171`) on lines 169, 171, 181, 183 with status tokens
4. Replace `rgba(0, 0, 0, 0.2)` (line 213) and `rgba(223, 255, 97, 0.15)` (line 92) with design tokens
5. Replace magic number dimensions (`20px`, `400px`, `200px`, `56px`) with tokens
6. Replace `font-size: 10px` (lines 94, 103) with `var(--cg-font-size-2xs, 10px)`

### P2 - Medium
7. Add `Escape` key handler to close the panel
8. Add auto-scroll to latest entry when new entries arrive
9. Fix `_expanded` index stability when entries are dynamically added
10. Add `:active` press styles on interactive elements
11. Replace `rgba(255, 255, 255, 0.02)` hover (line 155) with token
12. Remove redundant `tabindex="0"` from native buttons

### P3 - Low
13. Add copy-to-clipboard button per entry
14. Add type filter buttons (request/response/error/info)
15. Add basic JSON syntax highlighting in expanded content
16. Add `aria-live="polite"` on badge to announce new entry count
