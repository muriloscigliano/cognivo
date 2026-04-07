# ai-insight-card Improvement Plan

**Component**: `ai-insight-card`
**Category**: AI-Native
**File**: `src/components/ai-insight-card/ai-insight-card.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex colors in `.icon-area` variants (lines 90-94) -- `#60a5fa`, `#f87171`, `#fbbf24` used directly
2. CSS syntax error: extra closing brace on line 221 breaks the skeleton styles block
3. Using `.innerHTML` for icon rendering (line 311) -- XSS vector and bypasses Lit's template system

---

## 1. Functional Issues

- **`.innerHTML` usage on line 311**: `<div class="icon-area" .innerHTML=${this._getIcon()}>` bypasses Lit's safe templating and is a potential XSS vector if icon data were ever user-controlled. Should use `unsafeHTML` directive from `lit/directives/unsafe-html.js` or refactor to use template literals.
- **CSS syntax error on line 221**: Extra `}` closes the `.skel-line:nth-child(3)` rule but also prematurely closes the parent `css` block, causing subsequent rules (rounded variants, lines 223-228) to potentially be ignored by some parsers.
- **No `declare global` block**: Missing TypeScript global element map declaration (unlike other components in this batch). The class is exported but not registered in `HTMLElementTagNameMap`.
- **Actions only visible on hover**: Lines 168-169 -- action buttons (bookmark, dismiss) only appear on hover, making them completely inaccessible on touch devices and invisible to keyboard users.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Token-based background/border |
| Hover | Yes | Yes | Border color change, shadow lift, translateY |
| Active/Pressed | **No** | N/A | No press feedback |
| Focus | Yes | Yes | `--cg-brand-ai-accent` outline |
| Disabled | **No** | N/A | Missing entirely |
| Loading | Yes | Yes | Skeleton with shimmer animation |
| Error | **No** | N/A | No error state |
| Selected | Yes | Partial | Border accent + `rgba(223, 255, 97, 0.04)` background |
| Expanded | Yes | Yes | Line clamp removed |
| Dismissed | **No** | N/A | Dismiss event fires but card doesn't visually dismiss |

### 2.2 Keyboard Navigation
- Card is focusable with `tabindex="0"` and has `@keydown` handler (line 278) for Enter/Space. Good.
- **Action buttons inaccessible via keyboard**: Actions are `opacity: 0` until hover (line 168). Keyboard-only users can tab to them but cannot see them. Need `:focus-within` rule to show actions.

### 2.3 ARIA & Accessibility
- `role="article"` with `aria-label` on the card. Appropriate.
- Action buttons have `aria-label` attributes. Good.
- Skeleton has `aria-label="Loading insight"`. Good.
- Source links use `rel="noopener"`. Good.
- **Missing `aria-expanded`** on expandable cards to indicate current expansion state.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 52 | `inset 0 1px 0 0` | Use shadow token or `--cg-shadow-inner-subtle` |
| 53 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 52 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 67 | `rgba(223, 255, 97, 0.04)` | `--cg-color-brand-ai-bg-subtle` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 90 | `rgba(59, 130, 246, 0.12)`, `#60a5fa` | `--cg-color-status-info-bg`, `--cg-color-status-info-text-default` |
| 91 | `rgba(223, 255, 97, 0.12)` | `--cg-color-brand-ai-bg-subtle` |
| 92 | `rgba(239, 68, 68, 0.12)`, `#f87171` | `--cg-color-status-error-bg`, `--cg-color-status-error-text-default` |
| 93 | `rgba(245, 158, 11, 0.12)`, `#fbbf24` | `--cg-color-status-warning-bg`, `--cg-color-status-warning-text-default` |
| 94 | `rgba(34, 197, 94, 0.12)` | `--cg-color-status-success-bg` |
| 67 | `rgba(223, 255, 97, 0.04)` | `--cg-color-brand-ai-bg-faint` |

### 3.3 Typography Issues
- All font-size values use `--cg-font-size-*` tokens. Good.
- Letter-spacing uses `--cg-letter-spacing-wide` token. Good.

### 3.4 Spacing Issues
- All spacing values use `--cg-spacing-*` tokens. Good.

### 3.5 Modern Design Enhancements
- Add subtle type-specific glow on the icon area.
- Add confidence bar visualization instead of just badge.
- Add slide-in animation for expanded sources section.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error on line 221** -- remove the extra closing brace that breaks the stylesheet.
2. **Replace `.innerHTML` with `unsafeHTML` directive** (line 311) or refactor `_getIcon()` to return `TemplateResult`.
3. **Show actions on `:focus-within`** -- add `.card:focus-within .actions { opacity: 1; }` so keyboard users can see action buttons.

### P1 - High
4. **Replace raw hex colors in `.icon-area` variants** (lines 90-94) with semantic tokens.
5. **Add `aria-expanded` attribute** when card is expandable.
6. **Add active/pressed state** visual feedback.
7. **Add visual dismiss behavior** -- currently only fires event, card stays visible.
8. **Add `declare global` HTMLElementTagNameMap** for TypeScript consumers.

### P2 - Medium
9. **Replace raw `rgba()` background colors** in `.icon-area` and `.selected` with semantic tokens.
10. **Add disabled state** with reduced opacity and no interaction.
11. **Add error state** for failed insight loading.
12. **Replace `inset 0 1px 0 0 rgba(...)` shadow** with design token.

### P3 - Low
13. **Add confidence bar visualization** as alternative to badge.
14. **Add animated expand/collapse transition** for sources section.
15. **Memoize `_getIcon()` result** since it only depends on `this.type`.
