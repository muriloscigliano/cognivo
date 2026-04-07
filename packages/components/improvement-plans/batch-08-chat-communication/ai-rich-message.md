# ai-rich-message Improvement Plan

**Component**: `ai-rich-message`
**Category**: AI-Native
**File**: `src/components/ai-rich-message/ai-rich-message.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex color `#09090b` used directly in CSS (lines 72, 111) instead of semantic tokens
2. Magic numbers in spacing and sizing (lines 59, 92-93, 112, 127, 130, 134)
3. Card rendering uses `document.createElement` with arbitrary tag names (line 247) -- potential injection vector if `card.type` is user-controlled

---

## 1. Functional Issues

- **Line 247**: `document.createElement(card.type)` will create any HTML element based on the `card.type` string. If this value comes from untrusted input, it could create script elements or other dangerous tags. Should validate against an allowlist of known component tag names.
- **Line 248-249**: Setting arbitrary properties on dynamically created elements (`el['data']`, `el['toolData']`) has no type checking.
- **Line 187**: `override role` shadows `LitElement`'s inherited `role` property from `HTMLElement`. This works but is semantically confusing -- consider renaming to `messageRole` or `senderRole`.
- **Line 257**: Fallback card rendering uses inline `style` attribute with raw pixel and hex values: `padding:8px;font-size:12px;color:var(--cg-gray-500,#71717a)` -- the `padding:8px` and `font-size:12px` should use tokens.
- **Line 239-240**: `_cardAbort?.abort()` is called at the start of `_renderCards()`, which runs during every render cycle. This means card event listeners are re-registered on every render, which is wasteful. Should use `willUpdate` lifecycle instead.
- **Line 229**: `_cardAbort` is optional but never initialized -- first call to `abort()` on line 239 is safe due to optional chaining, but the pattern is unclear.

## 2. Interaction Issues

### 2.1 State Coverage
Current states:
- Default (assistant message)
- User variant (user message with accent)
- System variant (system message with dashed border and italic)
- Hover on action buttons
- Focus-visible on action buttons

Missing states:
- **Active/Pressed** on action buttons -- no `:active` style
- **Loading** -- no skeleton or shimmer state while message is being composed
- **Streaming** -- no cursor or progressive reveal state
- **Error** -- no error variant for failed message delivery
- **Deleted/Retracted** -- no state for messages that have been removed
- **Edited** -- no visual indicator for messages that have been modified
- **Hover on bubble** -- no hover feedback on the message bubble itself
- **Selected** -- no selection state for multi-select operations

### 2.2 Keyboard Navigation
- **Line 286**: Message container has `tabindex="0"` -- good, allows keyboard focus.
- **Missing**: No keyboard shortcut to navigate between messages (arrow keys)
- **Missing**: Action buttons are focusable but no keyboard shortcut to quickly access them (e.g., pressing `a` when message is focused)
- **Missing**: No way to copy message text via keyboard without using action buttons
- **Missing**: Card elements created dynamically may not be keyboard-accessible depending on their implementation

### 2.3 ARIA & Accessibility
- **Line 283**: `role="article"` with `aria-label="${this.role} message"` -- reasonable for a message.
- **Line 267**: Actions group has `role="group"` and `aria-label` -- good.
- **Line 210**: Avatar is `aria-hidden="true"` -- good.
- **Missing**: No `aria-live` region for dynamically rendered cards.
- **Missing**: Timestamp should have a `<time>` element with `datetime` attribute for proper semantics.
- **Missing**: The `<slot>` (line 291) content has no ARIA labeling.
- **Concern**: Screen readers will read "assistant message" but won't know which message in a list -- needs index or context.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 59 | `width: 32px; height: 32px` | `var(--cg-size-avatar-md)` |
| 92-93 | `max-width: 80%` / `max-width: 70%` | CSS custom property or token |
| 99 | `line-height: 1.6` | `var(--cg-line-height-relaxed)` |
| 112 | `border-radius: 12px 12px 4px 12px` | Use `var(--cg-border-radius-150)` and `var(--cg-border-radius-50)` |
| 127 | `margin: 0 0 8px` | `var(--cg-spacing-8)` |
| 130 | `padding: 1px 5px` | `var(--cg-spacing-1) var(--cg-spacing-4)` (or closest token) |
| 257 | `padding:8px;font-size:12px` | Use tokens in inline style or CSS class |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 72 | `color: #09090b` | `var(--cg-gray-black)` or `var(--cg-color-surface-base-background)` |
| 103 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |
| 104 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 111 | `color: #09090b` | `var(--cg-gray-black)` |
| 129 | `rgba(255, 255, 255, 0.08)` | `var(--cg-color-surface-overlay-light)` |
| 137 | `rgba(0, 0, 0, 0.1)` | `var(--cg-color-surface-overlay-dark)` |

### 3.3 Spacing Issues
- Most spacing uses design tokens correctly (lines 52, 68, 97-98, 145-146, 150, 155, 158, 175).
- `.text p` margin (line 127) uses raw `8px` instead of token.
- `.text code` padding (line 130) uses raw `1px 5px` -- `5px` is not on the token scale.
- Bubble max-width percentages (lines 92-93) should be CSS custom properties for configurability.

### 3.4 Modern Design Enhancements
- Add subtle entrance animation per message (already has `fadeSlideIn` on `:host` -- good)
- Add hover state on the bubble body for interactive feedback
- Consider adding a subtle left/right border accent color per role
- Add skeleton/shimmer loading state for AI messages in progress
- Add message grouping -- consecutive messages from the same role could collapse avatars

## 4. Prioritized Fixes

### P0 - Critical
1. Validate `card.type` against an allowlist before calling `document.createElement(card.type)` (line 247) -- potential tag injection
2. Replace raw hex `#09090b` (lines 72, 111) with semantic token `var(--cg-gray-black)` or `var(--cg-color-surface-base-background)`

### P1 - High
3. Replace all raw rgba colors with semantic tokens (6 instances)
4. Replace magic number sizes and spacing with tokens (7 instances)
5. Add `:active` state to action buttons
6. Add error/failed-delivery message state
7. Move card listener cleanup from `_renderCards` to `willUpdate` lifecycle
8. Wrap timestamp in `<time>` element with `datetime` attribute

### P2 - Medium
9. Add loading/streaming skeleton state
10. Add hover state on `.bubble-body`
11. Add `line-height: 1.6` token usage
12. Rename `role` property to `messageRole` to avoid shadowing `HTMLElement.role`
13. Add `aria-live` region around dynamically rendered cards
14. Make bubble max-width configurable via CSS custom properties

### P3 - Low
15. Add message grouping for consecutive same-role messages
16. Add edited/retracted visual states
17. Add keyboard shortcut for quick copy
18. Add selection state for multi-select
19. Add subtle role-based border accent
