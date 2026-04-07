# cg-stack

**Tag**: `<cg-stack>`
**File**: `src/components/cg-stack/cg-stack.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: N/A (layout component)
- Padding: None (layout component, correct)
- Font sizes: None (layout component, correct)
- Colors: None (layout component, correct)
- Borders: None
- Transitions: None
- Background: None (transparent, correct)

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean flexbox layout |
| Hover | ❌ | ❌ | N/A for layout component |
| Active/Press | ❌ | ❌ | N/A |
| Focus | ❌ | ❌ | N/A |
| Disabled | ❌ | ❌ | N/A |
| Loading | ❌ | ❌ | N/A |
| Error | ❌ | ❌ | N/A |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: N/A (layout component, no interaction)
- ARIA: None needed for a layout container
- Events: None -- correct for layout component

## Style Fixes Needed
1. The `wrap` property only supports `true | false` via boolean, but CSS has `wrap="reverse"` -- the TypeScript type is `boolean` but the CSS expects a string value `"reverse"`. Fix: change `wrap` to `wrap: boolean | 'reverse' = false` or add separate `wrapReverse` prop.
2. Gap tokens look correct. No fixes needed for gap values.
3. Consider adding `inline` prop: `:host([inline]) { display: inline-flex; }` for inline layout contexts
4. Consider adding `fullHeight` prop: `:host([fullHeight]) { height: 100%; }` to complement existing `full` (width)

## Interaction Fixes Needed
1. The `wrap` attribute handling is inconsistent -- boolean `true` maps to `wrap=""` attribute, but the CSS rule `:host([wrap="reverse"])` would require `wrap="reverse"` which can't be set with a boolean property. Need to change to a string property: `@property({ reflect: true }) wrap: 'none' | 'wrap' | 'reverse' = 'none'`
2. Consider adding `role="group"` or `role="list"` as an optional prop for semantic grouping

## Test Spec
```typescript
describe('cg-stack', () => {
  it('renders slot content');
  it('defaults to column direction');
  it('applies row direction');
  it('applies row-reverse direction');
  it('applies column-reverse direction');
  it('applies gap variants (none, xs, sm, md, lg, xl, 2xl)');
  it('applies align variants (start, center, end, stretch, baseline)');
  it('applies justify variants (start, center, end, between, around, evenly)');
  it('applies wrap when wrap attribute is set');
  it('applies full width when full attribute is set');
  it('uses design tokens for all gap values');
});
```
