# AI Annotation Improvement Plan

**Component**: `ai-annotation`
**Category**: AI-Native
**File**: `src/components/ai-annotation/ai-annotation.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Default label colors are raw hex values (`#60a5fa`, `#4ade80`, `#fbbf24`, `#f87171`, `#a78bfa`) hardcoded in the property default (lines 163-168) and injected via inline styles throughout rendering
2. CSS syntax error: stray closing brace `}` at line 153 after the `.empty` rule
3. Extensive inline style usage for dynamic colors (lines 292-294, 314) bypasses the design token system entirely

---

## 1. Functional Issues

- **CSS syntax error at line 153**: A stray `}` closes the CSS block prematurely. The `.empty` rule ends at line 152, and line 153 has an extra `}` that may break subsequent rules if any are added.
- **Selection API fragility**: The `_handleMouseUp` method (lines 190-229) uses `window.getSelection()` which has known issues within Shadow DOM. The selection range may not correctly identify text within shadow roots in all browsers. The `document.createTreeWalker` at line 205 uses `contentEl` from the shadow root, which is correct, but edge cases with annotations spanning multiple text nodes could fail.
- **No annotation update/edit**: The component fires `ai-annotation-add` and `ai-annotation-remove` events but does not handle updating the internal `annotations` array. The consumer must update the array externally. This is a valid pattern but should be documented more explicitly.
- **Color sanitization fallback**: `_sanitizeColor` (lines 233-238) falls back to `#a1a1aa` which is a raw hex value. It should fall back to `var(--cg-gray-400, #a1a1aa)`.
- **Default label colors use raw hex**: Lines 163-168 define default labels with hex colors (`#60a5fa`, `#4ade80`, etc.) instead of referencing design tokens.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Default (showing content + annotations), editable (with label selection toolbar), empty (no content).
- **Missing**: No "loading" state for when annotation processing is in progress.
- **Missing**: No "disabled" state to prevent interaction.
- **Missing**: No visual feedback when a label is selected and the user should highlight text (e.g., a cursor change or instruction).

### 2.2 ARIA & Live Regions
- Line 306: `role="document"` with `aria-label="Annotated text"` is appropriate.
- Line 290: Each annotation span has `role="note"` and `aria-label` with the label name and text, which is good.
- **Issue**: When annotations are added or removed, there is no `aria-live` region to announce the change.
- **Issue**: The toolbar label buttons (line 311) have no `aria-pressed` state to indicate selection.
- **Issue**: The editable mode's instruction to "select text to annotate" is not communicated to screen readers.
- **Improvement**: Add `aria-pressed="${this._selectedLabel === l.name}"` to label buttons.

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` and uses `fadeSlideIn` entry animation (line 40).
- **Issue**: The `.annotated-span` has `transition: opacity 150ms` (line 111) and `.annotation-label` has `transition: opacity 150ms` (line 131). These should use motion tokens for the duration.
- No problematic ongoing animations exist -- the component is largely static, which is appropriate.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 64 | `font-weight: 700` | `var(--cg-font-weight-bold, 700)` |
| 66 | `margin-right: 4px` | `var(--cg-spacing-4, 4px)` |
| 72 | `padding: 3px var(--cg-spacing-8)` | `var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px)` |
| 78 | `font-weight: 600` | `var(--cg-font-weight-semibold, 600)` |
| 85 | `width: 6px; height: 6px` | `var(--cg-spacing-6, 6px)` |
| 100 | `line-height: 1.8` | `var(--cg-line-height-loose, 1.8)` or similar |
| 108 | `padding: 1px 2px` | `var(--cg-spacing-1, 1px) var(--cg-spacing-2, 2px)` |
| 109 | `border-radius: 3px` | `var(--cg-border-radius-050, 4px)` (nearest token) |
| 111 | `transition: opacity 150ms` | `var(--cg-motion-duration-fast, 150ms)` |
| 120 | `top: -18px` | Should use a calculated value or `--cg-spacing-*` token |
| 123 | `font-size: 9px` | No standard token for 9px -- use `var(--cg-font-size-2xs, 10px)` or adjust |
| 125 | `padding: 0 4px` | `0 var(--cg-spacing-4, 4px)` |
| 126 | `border-radius: 3px` | `var(--cg-border-radius-050, 4px)` |
| 131 | `transition: opacity 150ms` | `var(--cg-motion-duration-fast, 150ms)` |
| 139 | `bottom: -3px` | Should use a spacing token |
| 141 | `height: 2px` | `var(--cg-border-width-thick, 2px)` |
| 142 | `border-radius: 1px` | `var(--cg-border-radius-025, 1px)` |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 163 | `color: '#60a5fa'` (Person default) | `var(--cg-blue-400, #60a5fa)` -- but this is in JS, not CSS |
| 164 | `color: '#4ade80'` (Organization) | `var(--cg-green-400, #4ade80)` |
| 165 | `color: '#fbbf24'` (Location) | `var(--cg-yellow-400, #fbbf24)` |
| 166 | `color: '#f87171'` (Date) | `var(--cg-red-400, #f87171)` |
| 167 | `color: '#a78bfa'` (Concept) | `var(--cg-purple-400, #a78bfa)` |
| 238 | `return '#a1a1aa'` (sanitize fallback) | Should reference a gray token |
| 241 | `'#a1a1aa'` (getLabelColor fallback) | Should reference a gray token |
| 292 | `style="background: ${color}22"` | Inline style with hex+alpha -- cannot use tokens |
| 294 | `style="background: ${color}; color: var(--cg-gray-black, #000000);"` | Background is raw color |

### 3.3 Animation Token Usage
- Line 40: `animation: fadeSlideIn 200ms` -- duration should use `var(--cg-motion-duration-fast, 200ms)`.
- Line 111: `transition: opacity 150ms` -- should use `var(--cg-motion-duration-fast, 150ms)`.
- Line 131: `transition: opacity 150ms` -- should use `var(--cg-motion-duration-fast, 150ms)`.

### 3.4 Modern Design Enhancements
- The annotation labels (popup on hover) could use a subtle backdrop blur and arrow/pointer.
- Add a selection highlight animation when creating a new annotation.
- The confidence bar could use a gradient from transparent to the label color.
- Consider a sidebar/panel mode that lists all annotations with their confidence scores.
- Add keyboard support for annotation creation (Tab through text, Enter to annotate selection).

## 4. Prioritized Fixes

### P0 - Critical
- **Fix CSS syntax error**: Remove stray `}` at line 153

### P1 - High
- Replace all raw hex colors in default `labels` property with token-compatible values or document that these are consumer-overridable defaults
- Replace inline `style="background: ${color}22"` pattern with CSS custom properties set on the element (e.g., `style="--_ann-color: ${color}"` then use `var(--_ann-color)` in CSS)
- Add `aria-pressed` to label toolbar buttons for accessibility
- Replace raw hex fallback in `_sanitizeColor` and `_getLabelColor`

### P2 - Medium
- Replace all magic numbers (font-weight, padding, margin, border-radius, line-height) with design tokens (~16 instances)
- Replace transition durations with `--cg-motion-duration-fast` token
- Add an `aria-live` region for annotation add/remove announcements
- Add a visual instruction for editable mode (e.g., "Select text and click a label to annotate")

### P3 - Low
- Add loading state for async annotation processing
- Add disabled state
- Enhance annotation label popups with backdrop blur and pointer
- Add keyboard-driven annotation creation
- Add confidence score display in a sidebar/list view
