# ai-empty-state Improvement Plan

**Component**: `ai-empty-state`
**Category**: AI-Native
**File**: `src/components/ai-empty-state/ai-empty-state.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error on lines 148-149 -- broken reduced-motion media query with `button { transition: none; }` and stray closing brace
2. Uses non-standard token names (`--cg-color-bg-secondary`, `--cg-color-border-primary`, `--cg-color-text-primary`, `--cg-color-text-secondary`) that don't match the project convention
3. Magic numbers in `.title` (`margin: 0 0 8px`), `.description` (`margin: 0 0 24px`, `max-width: 320px`), and `.icon-wrapper` (`width/height: 72px`)

---

## 1. Functional Issues

- **CSS syntax error**: Lines 148-149 -- `button { transition: none; }` followed by `}` appears after the `.extra` rule. This was likely meant to be inside a `@media (prefers-reduced-motion: reduce)` block but the media query wrapper is missing. This may cause style parsing errors.
- **Non-standard token names**: Uses `--cg-color-bg-secondary`, `--cg-color-border-primary`, `--cg-color-text-primary`, `--cg-color-text-secondary` (lines 60-62, 89, 95, 129) which don't match the project's `--cg-color-surface-*` / `--cg-gray-*` naming convention. These tokens likely always fall back to hardcoded values.
- **Raw hex in error variant title**: Line 71 -- `color: #fca5a5` is a raw hex color not behind any token.
- **Action button `aria-label` missing**: Line 175 -- the action button has no `aria-label`. The button text content serves as the accessible name, which is fine, but when used programmatically the label should be more descriptive.
- **`role="status"` on container**: Line 166 -- `role="status"` triggers screen reader live announcements. For a static empty state that's always visible, `role="status"` may cause unnecessary announcements. `role="region"` would be more appropriate.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Uses non-standard tokens |
| Hover (button) | Yes | Yes | `filter: brightness(1.1)` |
| Active/Pressed (button) | Yes | Yes | Uses `--cg-interaction-press-scale` |
| Focus (button) | Yes | Yes | `--cg-brand-ai-accent` outline |
| Disabled | **No** | N/A | No disabled state for action button |
| Loading | **No** | N/A | No loading variant |
| Error variant | Yes | Partial | `#fca5a5` raw hex |
| Search variant | Yes | Partial | Uses non-standard tokens |
| AI variant | Yes | Yes | Uses `--cg-brand-ai-accent` |

### 2.2 Keyboard Navigation
- Action button is a `<button>` element -- natively keyboard accessible. Good.
- Focus-visible styling with outline. Good.
- No other interactive elements to navigate.
- **Container is not focusable** -- appropriate for a static display component.

### 2.3 ARIA & Accessibility
- `role="status"` may cause excessive screen reader announcements for a static component.
- Icon wrapper has `aria-hidden="true"`. Good.
- Title is an `<h3>` which provides heading structure. Good.
- **No `aria-describedby`** linking title to description for richer screen reader context.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 32 | `animation: fadeSlideIn 200ms` | Use `--cg-motion-duration-fast` token |
| 39 | `max-width: 400px` | Consider a layout token or remove constraint |
| 47 | `width: 72px; height: 72px` | `--cg-spacing-72` or `--cg-icon-size-xl` |
| 48 | `border-radius: 50%` | `--cg-border-radius-full` (or `50%` is standard CSS) |
| 55 | `transition: transform 200ms ease` | `--cg-motion-duration-fast`, `--cg-motion-easing-default` |
| 93 | `margin: 0 0 8px` | `--cg-spacing-8` |
| 99 | `margin: 0 0 24px` | `--cg-spacing-24` |
| 100 | `max-width: 320px` | Layout token or configurable |
| 41 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 42 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 41 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 42 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 60 | `--cg-color-bg-secondary, #27272a` | Should be `--cg-gray-800` or `--cg-color-surface-container-background` |
| 61 | `--cg-color-border-primary, #3f3f46` | Should be `--cg-gray-700` |
| 66 | `rgba(239, 68, 68, 0.1)` | `--cg-color-status-error-bg` |
| 67 | `rgba(239, 68, 68, 0.3)` | `--cg-color-status-error-border` |
| 71 | `#fca5a5` | `--cg-red-300` or `--cg-color-status-error-text-muted` |
| 75 | `rgba(234, 179, 8, 0.1)` | `--cg-color-status-warning-bg` |
| 76 | `rgba(234, 179, 8, 0.3)` | `--cg-color-status-warning-border` |
| 81 | `rgba(223, 255, 97, 0.08)` | `--cg-color-brand-ai-bg-faint` |
| 82 | `rgba(223, 255, 97, 0.25)` | `--cg-color-brand-ai-border-subtle` |
| 89 | `--cg-color-text-primary, #fafafa` | Should be `--cg-color-surface-base-text` |
| 95 | `--cg-color-text-secondary, #a1a1aa` | Should be `--cg-gray-400` |
| 99 | `line-height: 1.6` | `--cg-line-height-relaxed` |

### 3.3 Typography Issues
- Font sizes use `--cg-font-size-*` tokens. Good.
- Font-weight `700` and `600` used directly -- should use tokens.
- `line-height: 1.6` (line 99) should use `--cg-line-height-relaxed`.

### 3.4 Spacing Issues
- Margin values `8px` and `24px` (lines 93, 99) should use `--cg-spacing-*` tokens.
- `max-width` values are layout constraints -- acceptable as non-tokenized or should have component-specific custom properties.

### 3.5 Modern Design Enhancements
- Add subtle floating animation on the icon wrapper (gentle bob/pulse).
- Add illustration slot for custom SVG artwork.
- Add secondary action button option.
- Add `compact` size variant for inline empty states.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** on lines 148-149 -- wrap `button { transition: none; }` in proper `@media (prefers-reduced-motion: reduce)` block.

### P1 - High
2. **Replace non-standard token names** -- `--cg-color-bg-secondary`, `--cg-color-border-primary`, `--cg-color-text-primary`, `--cg-color-text-secondary` should use project-standard `--cg-color-surface-*`, `--cg-gray-*` tokens.
3. **Replace raw hex `#fca5a5`** (line 71) with a semantic color token.
4. **Replace raw `rgba()` variant colors** (lines 66-67, 75-76, 81-82) with semantic status tokens.
5. **Change `role="status"` to `role="region"`** for static empty state display.

### P2 - Medium
6. **Tokenize spacing magic numbers** -- `margin: 0 0 8px`, `margin: 0 0 24px`, `width/height: 72px`.
7. **Replace raw overlay `rgba()` colors** (lines 41-42) with design tokens.
8. **Add disabled state** for action button.
9. **Tokenize font-weight values** with `--cg-font-weight-bold`/`--cg-font-weight-semibold`.
10. **Tokenize `line-height: 1.6`** with `--cg-line-height-relaxed`.

### P3 - Low
11. **Add illustration slot** for custom SVG/image artwork.
12. **Add secondary action button** option.
13. **Add `compact` size variant**.
14. **Add gentle icon animation** (floating bob effect).
15. **Replace `filter: brightness(1.1)`** with explicit hover color token.
