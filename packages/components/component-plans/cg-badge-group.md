# cg-badge-group

**Tag**: `<cg-badge-group>`
**File**: `src/components/cg-badge-group/cg-badge-group.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-100, 8px)` on overflow indicator — good.
- Padding: `2px 8px` on overflow indicator — hardcoded, should use spacing tokens.
- Font sizes: `var(--cg-font-size-xs, 12px)` label and overflow — good.
- Colors: `--cg-color-surface-tertiary-text` (label, overflow text), `--cg-color-action-secondary-background-default` (overflow bg). Good tokens.
- Borders: None (appropriate for container).
- Transitions: None.
- Background: `--cg-color-action-secondary-background-default` overflow pill.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Flex wrap layout |
| Hover | ❌ | N/A | Container — not applicable |
| Active/Press | ❌ | N/A | Not applicable |
| Focus | ❌ | N/A | Not applicable |
| Disabled | ❌ | ❌ | Missing — should dim the group |
| Loading | ❌ | ❌ | Missing |
| Error | ❌ | N/A | Not applicable |
| Success | ❌ | N/A | Not applicable |

### Interaction Audit
- Keyboard: No keyboard handling — delegates to child badges (correct).
- ARIA: `role="group"` with `aria-label` on badges container. Good.
- Events: None fired (appropriate — children fire their own events).

## Style Fixes Needed

1. **Line 47**: `padding: 2px 8px` → `padding: var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)`
2. **Line 27**: Label `letter-spacing: 0.04em` — should use `--cg-letter-spacing-wide` or similar token if available.
3. The overflow count uses `cursor: default` — good, prevents confusion about clickability.
4. Consider adding hover state on overflow pill (tooltip showing hidden items on hover).

## Interaction Fixes Needed

1. The `max` prop controls visibility but only through overflow calculation, not actual DOM clipping. The slot still renders all children — the component relies on CSS or the parent to limit visible items. The overflow count is calculated from `total - max`, but the slot content is not actually hidden. This needs fixing: either use `::slotted(:nth-child(n+${max+1})) { display: none; }` or manage visibility programmatically.
2. Add `disabled` prop that propagates to child badges.
3. Consider making the overflow indicator interactive (clickable to expand/show all).

## Test Spec

```typescript
describe('cg-badge-group', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders slotted badges')
  it('renders label when provided')

  // Props
  it('label — shows label above badges')
  it('gap — applies xs/sm/md/lg spacing')
  it('max — shows overflow count')
  it('total — used for overflow calculation')

  // Overflow
  it('shows "+N" when total > max')
  it('hides overflow when max=0 (show all)')
  it('overflow shows correct count')

  // Accessibility
  it('badges container has role="group"')
  it('has aria-label on container')
  it('overflow has title for tooltip')
});
```
