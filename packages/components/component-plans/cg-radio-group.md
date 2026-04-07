# cg-radio-group

**Tag**: `<cg-radio-group>`
**File**: `src/components/cg-radio-group/cg-radio-group.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: N/A (container component).
- Padding: None (appropriate).
- Font sizes: N/A.
- Colors: N/A — inherits from children.
- Borders: None.
- Transitions: None.
- Background: None.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Flex column with gap |
| Hover | ❌ | N/A | Container — delegates to children |
| Active/Press | ❌ | N/A | Delegates to children |
| Focus | ❌ | N/A | Delegates to children |
| Disabled | ✅ | ⚠️ | Propagates `disabled` to child radios programmatically — correct, but no visual dimming on the group itself |
| Loading | ❌ | ❌ | Missing — should propagate loading to children |
| Error | ❌ | ❌ | Missing — should propagate error to children |
| Success | ❌ | ❌ | Missing — should propagate success to children |

### Interaction Audit
- Keyboard: ArrowDown/ArrowRight, ArrowUp/ArrowLeft for navigation with wrapping. Home/End for first/last. Enter to select. Comprehensive WAI-ARIA radiogroup pattern.
- ARIA: `role="radiogroup"`, `aria-label`. Child radios managed for `tabindex` roving. Excellent implementation.
- Events: `cg-change` with `{value}`. Bubbles and composes. Also re-emits when child radio fires `cg-change`.

## Style Fixes Needed

1. **Line 35**: `gap: var(--cg-spacing-8, 8px)` — good.
2. **Line 40**: `gap: var(--cg-spacing-16, 16px)` for horizontal — good.
3. Consider adding an optional `error` visual treatment that wraps the group (e.g., subtle border or background tint) to indicate group-level validation state.
4. Consider adding a `helper` text area below the group for error/helper messages (like `cg-input` has).

## Interaction Fixes Needed

1. Add `error`, `success`, and `loading` boolean props that propagate to child radios (like `disabled` and `name` already do).
2. The `_handleChange` handler listens for `cg-change` on the group div — this captures child radio events correctly via event bubbling through the slot.
3. The `_syncRadios` method runs on `updated` for `value`, `name`, or `disabled` changes — this is correct but could be optimized to only sync the changed property.
4. Missing `required` prop that could propagate to children and be used for form validation at the group level.

## Test Spec

```typescript
describe('cg-radio-group', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default vertical layout')
  it('renders slotted cg-radio children')

  // Props
  it('name — propagates to all child radios')
  it('value — checks the matching child radio')
  it('disabled — disables all child radios')
  it('orientation — switches between vertical and horizontal')
  it('label — sets aria-label on group')

  // Selection
  it('clicking a radio updates the group value')
  it('deselects previous radio when new one selected')

  // Keyboard
  it('ArrowDown/ArrowRight moves to next radio')
  it('ArrowUp/ArrowLeft moves to previous radio')
  it('Home moves to first radio')
  it('End moves to last radio')
  it('navigation wraps around')
  it('skips disabled radios')

  // Tabindex roving
  it('selected radio has tabindex 0, others -1')
  it('first enabled radio gets tabindex 0 when none selected')

  // Events
  it('fires cg-change with new value on selection')

  // Accessibility
  it('has role="radiogroup"')
  it('has aria-label')
});
```
