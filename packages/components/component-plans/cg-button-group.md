# cg-button-group

**Tag**: `<cg-button-group>`
**File**: `src/components/cg-button-group/cg-button-group.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Uses `--cg-border-radius-150` (12px) token for attached mode corners. Good.
- Padding: None on the container (appropriate).
- Font sizes: N/A (container component).
- Colors: None directly — inherits from children.
- Borders: `margin-left: -1px` for attached mode overlap — fine structural pattern.
- Transitions: None on container (appropriate).
- Background: None (appropriate).

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Flex layout with gap |
| Hover | ❌ | N/A | Container — no hover state needed |
| Active/Press | ❌ | N/A | Container — no active state needed |
| Focus | ❌ | N/A | Container — no focus state needed |
| Disabled | ❌ | ❌ | Missing: should propagate disabled to children or dim the group |
| Loading | ❌ | N/A | Not applicable for a layout container |
| Error | ❌ | N/A | Not applicable |
| Success | ❌ | N/A | Not applicable |

### Interaction Audit
- Keyboard: No keyboard handling — delegates to child buttons (correct).
- ARIA: `role="group"` on the container div — correct. Missing `aria-label` prop for accessible group naming.
- Events: None fired (appropriate — children fire their own events).

## Style Fixes Needed

1. **Line 40**: `:host([attached]) { gap: 0; }` — this sets gap on `host`, but the gap is controlled on `div[role="group"]`. Should be `:host([attached]) div[role="group"] { gap: 0; }` instead, or rely on the `gap="none"` semantic. Currently the gap:0 on host has no effect since the flex container is the inner div.
2. **Line 44**: `margin-left: -1px` — hardcoded, should use `calc(-1 * var(--cg-border-width-50, 1px))` to stay in sync with button border width.
3. **Line 60**: `margin-top: -1px` (vertical attached) — same fix, use `calc(-1 * var(--cg-border-width-50, 1px))`.
4. Missing `aria-label` pass-through — the `div[role="group"]` needs an `aria-label` attribute bound to a prop.

## Interaction Fixes Needed

1. Add a `label` property and bind it to `aria-label` on the group div for accessible group naming.
2. Add an optional `disabled` boolean prop that visually dims the group (opacity) and sets `pointer-events: none`.
3. Attached mode only works for `<cg-button>` via `::slotted(*)` — consider if `border-radius: 0` actually penetrates Shadow DOM of slotted children. It likely does NOT since `::slotted()` only styles the host of slotted elements, not their shadow roots. This may need a CSS custom property approach or require children to support a `grouped` attribute.

## Test Spec

```typescript
describe('cg-button-group', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default state correctly')
  it('renders a div with role="group"')

  // Props
  it('direction — switches between row and column')
  it('gap — applies correct spacing token')
  it('align — sets justify-content')
  it('attached — removes gap and adjusts border-radius')

  // Slots
  it('renders slotted buttons')

  // Attached mode
  it('first child gets left-side border-radius in row mode')
  it('last child gets right-side border-radius in row mode')
  it('only-child gets full border-radius')
  it('vertical attached adjusts top/bottom margins and radii')

  // Keyboard
  it('delegates keyboard to child buttons')

  // Accessibility
  it('has role="group"')
  it('has aria-label when label prop is set')
});
```
