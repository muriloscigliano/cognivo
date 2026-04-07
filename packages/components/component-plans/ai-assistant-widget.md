# ai-assistant-widget — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Issues below.
- **Magic numbers**:
  - `.fab` uses `width: 56px; height: 56px; border-radius: 50%; font-size: 24px` — should use tokens.
  - `:host` positions use `bottom: 24px; right/left: 24px` — should use spacing tokens.
  - `.panel` uses `width: 360px; height: 480px; bottom: 72px` — should use tokens or custom properties.
  - `.close-btn` uses `font-size: 18px; padding: 4px` — partial tokenization.
  - `.send-btn` uses `width: 40px; height: 40px; font-size: 18px` — should use tokens.
  - `.msg` uses `max-width: 85%` — acceptable design decision.
- **Reduced motion**: PASS — disables panel animation and FAB transitions.
- **Issues**:
  - FAB uses `box-shadow: none` which overrides any inherited shadow. Intentional but removes elevation.
  - Panel is fixed positioned — correct for floating widget.

### States Audit

| State | .fab | .send-btn | .input-field | .close-btn |
|---|---|---|---|---|
| Default | PASS | PASS | PASS | PASS |
| Hover | PASS (brightness+scale) | PASS (brightness) | N/A | PASS (color) |
| Open | PASS (rotate 45deg) | N/A | N/A | N/A |
| Focus-visible | PASS (outline) | PASS (outline) | PASS (border) | PASS (outline) |
| Disabled | N/A | PASS (opacity+cursor) | N/A | N/A |
| Loading | MISSING | MISSING | MISSING | N/A |

### Interaction Audit
- FAB toggles expanded state. PASS.
- Open/close fires `ai-assistant-open`/`ai-assistant-close`. PASS.
- Send fires `ai-assistant-send` with message text. PASS.
- Enter key sends message. PASS.
- Auto-scroll to bottom on new messages. PASS.
- Auto-focus input on open. PASS.
- `aria-expanded` on FAB. PASS.
- Panel has `role="dialog"`. PASS.
- Messages area has `role="log"` with `aria-live="polite"`. PASS.
- **Issue**: FAB shows "+" when open and speech bubble emoji when closed — emoji may render inconsistently.
- **Issue**: No Escape key to close panel.
- **Issue**: No focus trap inside dialog panel.
- **Issue**: Messages are not managed by the component — parent must handle send and update messages array.
- **Issue**: No typing indicator for AI responses.
- **Issue**: `z-index: 9999` is hardcoded — could conflict with other high-z elements.

## Style Fixes Needed

1. Replace raw pixel dimensions on FAB, panel, send-btn with tokens.
2. Replace position offsets (`24px`, `72px`) with spacing tokens.
3. Replace `border-radius: 50%` with `var(--cg-border-radius-full)`.
4. Replace emoji icons with SVG for cross-platform consistency.
5. Standardize focus ring to box-shadow pattern.
6. Add loading/typing indicator styling.
7. Make panel dimensions configurable via CSS custom properties.

## Interaction Fixes Needed

1. Add Escape key handler to close panel.
2. Add focus trap inside dialog panel when open.
3. Return focus to FAB when panel closes.
4. Add typing indicator state (AI is thinking...).
5. Add loading state for send button while awaiting response.
6. Replace emoji FAB icon with SVG.
7. Add `z-index` as configurable CSS custom property.
8. Consider adding message timestamps.
9. Consider adding Shift+Enter for multiline input.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders FAB button in collapsed state | render |
| 2 | FAB click toggles panel visibility | interaction |
| 3 | Panel renders with header, messages, and input area | render |
| 4 | Welcome message shows when messages array is empty | render |
| 5 | Messages render with correct role classes (user/ai) | render |
| 6 | User messages align right, AI messages align left | render |
| 7 | Typing in input and pressing Enter fires `ai-assistant-send` | interaction |
| 8 | Send button disabled when input is empty | interaction |
| 9 | Opening panel fires `ai-assistant-open` | interaction |
| 10 | Closing panel fires `ai-assistant-close` | interaction |
| 11 | FAB has correct `aria-expanded` attribute | a11y |
| 12 | Panel has `role="dialog"` with `aria-label` | a11y |
| 13 | Messages area has `role="log"` with `aria-live` | a11y |
| 14 | Input auto-focuses when panel opens | interaction |
| 15 | Position attribute controls FAB placement (bottom-right/bottom-left) | render |
| 16 | Close button in panel header closes panel | interaction |
