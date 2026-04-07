# cg-code-block — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.wrapper` background | `rgba(255, 255, 255, 0.03)` | Raw RGBA — should use overlay token |
| `.wrapper` border-radius | `8px` | Should use `var(--cg-border-radius-100, 8px)` |
| `.wrapper` border | `1px solid rgba(255, 255, 255, 0.08)` | Raw RGBA — needs token |
| `.header` padding | `8px 16px` | Should use spacing tokens |
| `.header` border-bottom | `1px solid rgba(255, 255, 255, 0.06)` | Raw RGBA — needs token |
| `.header` gap | `8px` | Should use `var(--cg-spacing-8, 8px)` |
| `.filename` font-size | `11px` | Magic number — should use `var(--cg-font-size-2xs, 11px)` |
| `.language` font-size | `11px` | Same |
| `.language` padding | `2px 8px` | Should use spacing tokens |
| `.language` border-radius | `4px` | Should use `var(--cg-border-radius-50, 4px)` |
| `.language` background | `rgba(255, 255, 255, 0.06)` | Raw RGBA |
| `pre` padding | `16px` | Should use `var(--cg-spacing-16, 16px)` |
| `pre` font-size | `13px` | Should use `var(--cg-font-size-sm, 13px)` or closest token |
| `pre` line-height | `1.6` | Should use `var(--cg-line-height-relaxed, 1.625)` |
| Line number `margin-right` | `16px` | Should use spacing token |
| Line number `padding-right` | `12px` | Should use spacing token |
| Line number border | `1px solid rgba(255, 255, 255, 0.06)` | Raw RGBA |
| `.collapsed` max-height | `300px` | Magic number — could be CSS prop |
| `.expand-bar` margin-top | `calc(-1 * var(--cg-spacing-32, 32px))` | OK (token used) |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default | Yes | Code displayed |
| With filename | Yes | Header shows filename |
| With language | Yes | Language badge |
| Line numbers | Yes | Counter-based |
| Word wrap | Yes | Via `wrap` attribute |
| Collapsible | Yes | Max height with expand |
| Expanded | Yes | Full height |
| Copy idle | Yes | Copy button |
| Copy success | Yes | "Copied" with checkmark, green |
| Highlighted | Yes | Basic syntax highlighting |
| Empty | Partial | No empty state handling |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Copy to clipboard | OK | navigator.clipboard API |
| Expand/collapse | OK | Toggle button |
| Syntax highlighting | Partial | Basic regex-based — no full parser |
| Copy feedback | OK | 2s timeout for "Copied" state |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| Copy button `aria-label` | OK | "Copy code to clipboard" |
| Copy status `role="status"` | OK | Live region for "Copied!" |
| `aria-live="polite"` | OK | On sr-only status |
| Code block semantics | Partial | Uses `<pre>` but no `role="code"` |
| Expand button | Missing | No `aria-expanded` on expand button |
| Focus management | Missing | No focus-visible on expand button |

## Style Fixes Needed
1. Replace `.wrapper` background with `var(--cg-overlay-white-faint, rgba(255, 255, 255, 0.03))`
2. Replace `.wrapper` border with `1px solid var(--cg-color-surface-elevated-border, rgba(255, 255, 255, 0.08))`
3. Replace `.wrapper` border-radius with `var(--cg-border-radius-100, 8px)`
4. Tokenize all padding/margin values in header, pre, line numbers
5. Tokenize all font-size values to closest design token
6. Replace all raw RGBA backgrounds/borders with overlay/border tokens
7. Tokenize `.language` padding and border-radius
8. Add focus-visible styles for expand button

## Interaction Fixes Needed
1. Add `aria-expanded` to the expand button
2. Add `focus-visible` styling for the expand button
3. Add empty state handling (display a message when code is empty)
4. Consider adding keyboard shortcut for copy (Ctrl+C when code block is focused)
5. Expand button should scroll into view or maintain scroll position

## Test Spec

### Unit Tests
- `it('renders code content')`
- `it('renders filename in header when provided')`
- `it('renders language badge when provided')`
- `it('renders terminal dots in header')`
- `it('copies code to clipboard on copy button click')`
- `it('shows "Copied" state after copy')`
- `it('resets copy state after timeout')`
- `it('renders line numbers when line-numbers attribute set')`
- `it('wraps text when wrap attribute set')`
- `it('collapses long code when collapsible and code exceeds 15 lines')`
- `it('expands code on expand button click')`
- `it('does not show expand when code is under 15 lines')`
- `it('applies basic syntax highlighting (keywords, strings, comments, numbers)')`
- `it('has correct ARIA on copy button and status region')`
- `it('applies rounded variants')`
- `it('renders empty when no code provided')`

### Visual Regression
- Code block with filename + language
- Code block with line numbers
- Code block collapsed state
- Code block expanded state
- Code block with syntax highlighting (JS)
