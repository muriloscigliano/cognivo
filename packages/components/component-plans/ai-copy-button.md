# ai-copy-button — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Default variant styles | Mostly tokenized | OK |
| Minimal variant styles | tokenized | OK |
| Icon-only variant styles | tokenized | OK |
| Copied state color | `var(--cg-color-status-success-text)` | OK |
| Error state color | `var(--cg-color-status-error-text)` | OK |
| Error shake animation | `var(--cg-motion-duration-slow, 300ms)` | OK |
| Disabled opacity | `0.5` | Should use `var(--cg-opacity-disabled, 0.5)` or similar |
| Disabled cursor | `var(--cg-cursor-not-allowed, not-allowed)` | OK — good custom prop |
| Press scale | `var(--cg-interaction-press-scale, 0.97)` | OK |
| Focus-visible | `outline: 2px solid var(--cg-brand-ai-accent)` | OK |
| Transition | `background 150ms ease, color 150ms ease, transform 100ms ease` | Durations should use motion tokens |
| Entrance animation | `fadeSlideIn 200ms` | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default | Yes | Copy icon + label |
| Hover | Yes | Brighter color/background |
| Active (press) | Yes | Scale down |
| Focus-visible | Yes | Brand accent outline |
| Copied (success) | Yes | Checkmark + "Copied!" green |
| Error | Yes | X icon + "Failed" red + shake |
| Disabled | Yes | Opacity 0.5, no pointer events |
| Default variant | Yes | Bordered button |
| Minimal variant | Yes | Text-only |
| Icon-only variant | Yes | Just icon, label hidden |
| Reduced motion | Yes | No shake on error |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Click to copy | OK | Clipboard API with fallback |
| Clipboard fallback | OK | textarea + execCommand for insecure contexts |
| Success feedback | OK | 2s timeout (configurable) |
| Error feedback | OK | 2s timeout (configurable) |
| Events: ai-copy-success | OK | With copied value |
| Events: ai-copy-error | OK | With error message |
| Timer cleanup | OK | On disconnect |
| Disabled prevention | OK | Early return on disabled |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="button"` | Redundant | Already a `<button>` — remove role |
| `tabindex="0"` | Redundant | Already a `<button>` — remove tabindex |
| `aria-label` | OK | Dynamic based on state |
| `aria-disabled` | OK | Reflects disabled prop |
| Focus-visible | OK | Outline style |
| Status announcement | Missing | No `aria-live` region for "Copied!" / "Failed" feedback |

## Style Fixes Needed
1. Tokenize transition durations with `var(--cg-motion-duration-normal, 150ms)`
2. Consider tokenizing disabled opacity
3. No major CSS token issues — well-implemented

## Interaction Fixes Needed
1. Remove redundant `role="button"` from `<button>` element
2. Remove redundant `tabindex="0"` from `<button>` element
3. Add `aria-live="polite"` region for copy status announcement to screen readers
4. Consider adding keyboard shortcut hint (e.g., Ctrl+C context)

## Test Spec

### Unit Tests
- `it('renders with default variant and label')`
- `it('copies value to clipboard on click')`
- `it('shows "Copied!" state after successful copy')`
- `it('resets copied state after timeout')`
- `it('shows "Failed" state on clipboard error')`
- `it('resets error state after timeout')`
- `it('fires ai-copy-success with value on copy')`
- `it('fires ai-copy-error with error on failure')`
- `it('does not copy when disabled')`
- `it('does not copy when value is empty')`
- `it('uses textarea fallback when clipboard API unavailable')`
- `it('applies default variant styling')`
- `it('applies minimal variant styling')`
- `it('applies icon-only variant (hides label)')`
- `it('shows correct icon per state (copy/check/x)')`
- `it('applies press scale on active')`
- `it('has focus-visible outline')`
- `it('has aria-label reflecting current state')`
- `it('cleans up timer on disconnect')`
- `it('uses configurable timeout')`
- `it('no shake animation in reduced-motion mode')`

### Visual Regression
- Default variant (idle, hover, copied, error)
- Minimal variant
- Icon-only variant
- Disabled state
