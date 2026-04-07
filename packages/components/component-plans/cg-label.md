# cg-label

**Tag**: `<cg-label>`
**File**: `src/components/cg-label/cg-label.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: N/A (form label)
- Padding: None on the label itself; host has `margin-bottom: var(--cg-spacing-4, 4px)` -- tokenized
- Font sizes: Label `var(--cg-font-size-sm, 14px)`, hint `var(--cg-font-size-xs, 12px)`, error `var(--cg-font-size-xs, 12px)` -- all tokenized
- Colors: Label `var(--cg-color-surface-base-text, #fafafa)`, required `var(--cg-color-status-error-text, #ef4444)`, hint `var(--cg-color-surface-tertiary-text, #71717a)`, error `var(--cg-color-status-error-text, #ef4444)` -- all tokenized
- Borders: None
- Transitions: None -- missing transition for error state appearance
- Background: None (transparent, correct)

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean token usage |
| Hover | ❌ | ❌ | N/A for a label |
| Active/Press | ❌ | ❌ | N/A |
| Focus | ❌ | ❌ | N/A (label delegates focus to input via `for`) |
| Disabled | ✅ | ✅ | Reduced opacity and `cursor: not-allowed` -- correct |
| Loading | ❌ | ❌ | N/A |
| Error | ✅ | ✅ | Error text replaces hint text -- correct pattern |
| Success | ❌ | ❌ | No success state (could be useful for form validation) |

### Interaction Audit
- Keyboard: Native `<label>` element with `for` attribute -- clicking label focuses associated input. Correct.
- ARIA: Required asterisk has `aria-hidden="true"` -- correct. Error text has `role="alert"` -- correct for live error announcements.
- Events: None -- correct for a label component.

## Style Fixes Needed
1. Add transition for error/hint swap: `transition: opacity var(--cg-motion-duration-fast, 100ms) ease`
2. Consider adding `size` variants (sm, md, lg) to match form field sizing
3. Label `font-weight: var(--cg-font-weight-medium, 500)` -- correct
4. Hint/error `line-height: var(--cg-line-height-snug, 1.375)` -- correct
5. Disabled opacity uses `var(--cg-opacity-disabled, 0.5)` -- correct

## Interaction Fixes Needed
1. The `htmlFor` property uses `for` attribute mapping, but in Shadow DOM the `for` attribute on `<label>` cannot cross shadow boundaries. The label's `for` will not automatically associate with an input outside the shadow root. Consider using `aria-labelledby` or slotting the input inside the label.
2. Add optional `success` state with green text for positive validation feedback
3. Error text `role="alert"` will announce every time it renders -- consider `aria-live="polite"` instead for less aggressive announcements
4. Consider adding `aria-describedby` integration so the hint/error text can be linked to the form field

## Test Spec
```typescript
describe('cg-label', () => {
  it('renders label text');
  it('renders slot content');
  it('renders required asterisk when required is true');
  it('required asterisk is aria-hidden');
  it('renders hint text');
  it('renders error text instead of hint when error is set');
  it('error text has role="alert"');
  it('disabled state reduces opacity');
  it('disabled state sets cursor to not-allowed');
  it('label has for attribute when htmlFor is set');
  it('uses design tokens for all font sizes');
  it('uses design tokens for all colors');
});
```
