# ai-voice-panel — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `.mic-area` uses `width: 80px; height: 80px` and `.mic-btn` uses `width: 64px; height: 64px` — should use tokens.
- **Reduced motion**: PASS — disables pulse rings and spinner.
- **Issues**:
  - `.lang-badge` uses `font-size: 10px` — should use token.
  - Pulse ring `inset: -8px` uses raw pixel value.

### States Audit

| State | .mic-btn | State label | Transcript area |
|---|---|---|---|
| Idle | PASS | PASS | PASS |
| Listening | PASS (accent border+color) | PASS (accent color) | Shows interim |
| Processing | PASS (warning color, wait cursor) | PASS (warning color) | N/A |
| Error | PASS (error color) | PASS (error color) | PASS (error msg) |
| Hover | PASS (border+color) | N/A | N/A |
| Focus-visible | PASS (box-shadow) | N/A | N/A |
| Disabled | MISSING | MISSING | MISSING |

### Interaction Audit
- Click toggle: fires `ai-voice-start`/`ai-voice-stop`. PASS.
- Push-to-talk: pointerdown/up fires start/stop. PASS.
- Keyboard: Enter/Space for click and PTT modes. PASS.
- Processing state prevents clicks. PASS.
- **Issue**: `_errorMessage` is a private field but not `@state()` decorated — won't trigger re-render if set externally.
- **Issue**: No way to set error message from outside (no public property).
- **Issue**: No disabled property for the entire panel.
- **Issue**: PTT hint text is not connected to mic button via `aria-describedby`.

## Style Fixes Needed

1. Tokenize `.mic-area` and `.mic-btn` dimensions.
2. Replace `font-size: 10px` in `.lang-badge` with `var(--cg-font-size-2xs, 10px)`.
3. Tokenize pulse ring `inset: -8px` offset.
4. Add `.mic-btn:active` pressed state (scale down slightly).
5. Add disabled state styling for the entire panel.

## Interaction Fixes Needed

1. Add `errorMessage` as a public `@property` so parent can set error text.
2. Decorate `_errorMessage` with `@state()` or remove in favor of public property.
3. Add `disabled` property that prevents all interaction.
4. Add `aria-describedby` from mic button to PTT hint text.
5. Add visual waveform visualization during listening state (beyond pulse rings).
6. Consider adding `aria-live="assertive"` for error messages.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders idle state with mic icon and "Tap to speak" label | render |
| 2 | Renders listening state with pulse rings and accent styling | render |
| 3 | Renders processing state with spinner and wait cursor | render |
| 4 | Renders error state with X icon and error colors | render |
| 5 | Click in idle fires `ai-voice-start` | interaction |
| 6 | Click in listening fires `ai-voice-stop` | interaction |
| 7 | Click in processing does nothing | interaction |
| 8 | PTT: pointerdown fires `ai-voice-start`, pointerup fires `ai-voice-stop` | interaction |
| 9 | Keyboard Enter/Space triggers start/stop toggle | a11y |
| 10 | PTT keyboard: keydown starts, keyup stops | a11y |
| 11 | Transcript text renders when provided | render |
| 12 | Interim transcript renders with italic style | render |
| 13 | Language badge displays `language` value | render |
| 14 | PTT hint shows when `pushToTalk=true` | render |
| 15 | Reduced motion disables pulse and spinner animations | a11y |
| 16 | Mic button has correct `aria-label` for each state | a11y |
