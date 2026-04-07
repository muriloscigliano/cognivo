# ai-translation-panel — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: None found. PASS.
- **Reduced motion**: PASS — disables host animation and loading dot animations.
- **Issues**:
  - `.text-area` is read-only display — no editable source text input. Limits interactivity.
  - Loading dots animation (`dotPulse`) is local but could use shared keyframes.

### States Audit

| State | .translate-btn | .copy-btn | .lang-select | .alt-item |
|---|---|---|---|---|
| Default | PASS | PASS | PASS | PASS |
| Hover | PASS (opacity) | PASS (color+border) | N/A | PASS (border) |
| Active | MISSING | MISSING | N/A | MISSING |
| Focus-visible | PASS | PASS | PASS | PASS |
| Disabled | PASS (opacity+cursor) | MISSING | MISSING | N/A |
| Loading | PASS (dots animation) | N/A | N/A | N/A |
| Error | MISSING | MISSING | MISSING | MISSING |

### Interaction Audit
- Language selects fire change events. PASS.
- Translate button fires `ai-translation-request`. PASS.
- Copy buttons use `navigator.clipboard` and fire `ai-translation-copy`. PASS.
- Alternative selection fires `ai-translation-select-alt`. PASS.
- Alt items have keyboard support. PASS.
- **Issue**: Source text is display-only — no textarea for user input.
- **Issue**: No swap languages button (common UX pattern for translation).
- **Issue**: Copy button has no success feedback (checkmark or text change).
- **Issue**: Confidence badge uses `isLow` threshold of 0.7 — not configurable.
- **Issue**: `_showAlts` state is declared but never used.

## Style Fixes Needed

1. Add active/pressed state for buttons.
2. Add error state styling for failed translations.
3. Remove unused `_showAlts` state variable.
4. Add responsive stacking for narrow viewports (panes should stack vertically).
5. Add transition for confidence badge color changes.

## Interaction Fixes Needed

1. Add editable source text area (textarea or contenteditable).
2. Add swap languages button between source and target panes.
3. Add copy success feedback (brief "Copied!" text or checkmark icon).
4. Make confidence threshold configurable via property.
5. Add error state display for failed translations.
6. Add character/word count display.
7. Consider adding auto-translate on source text change (with debounce).

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders source and target panes with language selectors | render |
| 2 | Confidence badge shows correct percentage and color class | render |
| 3 | Low confidence (< 0.7) shows warning style badge | render |
| 4 | Loading state shows animated dots in target pane | render |
| 5 | Translate button fires `ai-translation-request` with correct detail | interaction |
| 6 | Translate button disabled when loading or no source text | interaction |
| 7 | Language select change updates `sourceLang`/`targetLang` | interaction |
| 8 | Copy button fires `ai-translation-copy` with text and side | interaction |
| 9 | Alternative translations render when provided | render |
| 10 | Clicking alternative fires `ai-translation-select-alt` | interaction |
| 11 | Alternative items support keyboard Enter/Space | a11y |
| 12 | Focus-visible rings on all interactive elements | a11y |
| 13 | Placeholder text shows when source/target text is empty | render |
| 14 | Reduced motion disables loading dot animation | a11y |
