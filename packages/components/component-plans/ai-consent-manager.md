# ai-consent-manager — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `.required-badge` uses `font-size: 10px` and `padding: 1px` — should use tokens.
- **Reduced motion**: Missing `@media (prefers-reduced-motion)` block.
- **Issues**:
  - Toggle dimensions (`width: 36px`, `height: 20px`, thumb `16px`) are raw pixel values without tokens.
  - Thumb position offset (`top: 2px`, `left: 2px`) are raw values.

### States Audit

| State | .toggle | .btn-primary | .btn-secondary |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | N/A (track only) | PASS (opacity) | PASS (border+color) |
| Active/Checked | PASS (accent bg) | N/A | N/A |
| Focus-visible | PASS (box-shadow) | PASS (box-shadow) | PASS (box-shadow) |
| Disabled | PASS (opacity+cursor) | MISSING | MISSING |
| Loading | MISSING | MISSING | MISSING |
| Error | MISSING | MISSING | MISSING |

### Interaction Audit
- Toggle fires `ai-consent-change`. PASS.
- Required items are disabled and always checked. PASS.
- Accept All / Reject All / Save buttons work correctly. PASS.
- Category grouping renders correctly. PASS.
- **Issue**: `title` property uses `override` keyword — conflicts with HTMLElement.title.
- **Issue**: No loading state for async consent saving.
- **Issue**: Reject All preserves required items. PASS — but no visual confirmation feedback.
- **Issue**: No `role="group"` on toggle groups or `role="switch"` on individual toggles.

## Style Fixes Needed

1. Replace `font-size: 10px` and `padding: 1px` in `.required-badge` with tokens.
2. Tokenize toggle dimensions: use `--cg-spacing-*` for width/height/thumb.
3. Add `@media (prefers-reduced-motion)` to disable toggle transition.
4. Add active/pressed state for buttons (`.btn:active`).
5. Add disabled state for primary and secondary buttons.

## Interaction Fixes Needed

1. Rename `title` property to avoid HTMLElement.title conflict (or document the override).
2. Add `role="switch"` to toggle inputs for better screen reader semantics.
3. Add loading state with spinner on Save button for async operations.
4. Add success/confirmation feedback after save (brief checkmark or toast).
5. Add `aria-describedby` linking toggle to its description text.
6. Consider adding a "changes unsaved" indicator.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Returns nothing when `consents` array is empty | render |
| 2 | Renders all consent items with labels and descriptions | render |
| 3 | Required items show "Required" badge | render |
| 4 | Required items have disabled toggles that are always checked | interaction |
| 5 | Toggling a non-required item fires `ai-consent-change` | interaction |
| 6 | Accept All checks all items and fires `ai-consent-save` | interaction |
| 7 | Reject All unchecks non-required items and fires `ai-consent-save` | interaction |
| 8 | Save button fires `ai-consent-save` with correct consents map | interaction |
| 9 | Category labels render when items have `category` property | render |
| 10 | Toggle shows accent background when checked | render |
| 11 | Focus-visible ring appears on toggles and buttons | a11y |
| 12 | Region has correct `aria-label` | a11y |
| 13 | Banner mode applies different border-radius | render |
| 14 | Required toggles cannot be toggled by click | interaction |
