# ai-chat Improvement Plan

**Component**: `ai-chat`
**Category**: AI-Native
**File**: `src/components/ai-chat/ai-chat.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Numerous magic numbers and raw rgba colors throughout CSS (lines 54, 58, 88-89, 99, 118, 120-121, 125, 128-131, 137, 144, 163, 197, 234-235, 244, 249-250, 325-327)
2. Using `.innerHTML` for markdown rendering (line 623) is an XSS risk despite sanitization -- no CSP-compatible approach
3. Missing active/pressed states on interactive buttons; incomplete keyboard navigation for action buttons

---

## 1. Functional Issues

- **Line 474**: Streaming uses a magic string `'msg-stream'` as a sentinel ID. If `_genId()` ever produces this ID, collisions occur. Use a Symbol or a dedicated boolean flag instead.
- **Line 426**: `runIntent` is cast via `as any`, losing all type safety. Define a proper interface for the AI client response.
- **Line 574-592**: The `_renderMarkdown` method uses `.innerHTML` (line 623) which bypasses Lit's template safety. While basic escaping is done, nested patterns (e.g., `<code>` inside `<pre>`) can produce malformed HTML. Consider a proper markdown-to-TemplateResult renderer or a trusted types approach.
- **Line 504-509**: `exportConversation()` is public but has no unit test surface -- missing edge case handling for empty versions array.
- **Line 361**: `chatDataset` typed as `unknown[]` provides no type safety for consumers.
- **Line 549-555**: `_switchVersion` mutates `msg.activeVersion` directly on the object inside the array, then triggers reactivity by spreading. This works but is fragile -- a stale reference could skip reactivity.
- **Line 50-51**: `min-height: 400px` and `max-height: 800px` are hardcoded, preventing flexible embedding.

## 2. Interaction Issues

### 2.1 State Coverage
Current states implemented:
- Default (idle)
- Streaming (in-progress)
- Thinking (loading)
- Error (on AI failure)
- Disabled (input when streaming)
- Copied (temporary feedback)
- Empty (no messages / no client)

Missing states:
- **Active/Pressed** on send button, action buttons, follow-up chips -- no `:active` style
- **Focus** on follow-up chips and stop button (no `:focus-visible` specific rule beyond global)
- **Rate selected** -- thumbs up/down have no persistent "selected" state after clicking; user cannot see their rating
- **Reconnecting/Offline** -- no network error recovery state
- **Max messages reached** -- `maxMessages` property exists (line 368) but is never enforced

### 2.2 Keyboard Navigation
- **Line 557-562**: Only Enter sends messages; no Escape to clear input, no Ctrl+Enter for newline (since it is an `<input>` not `<textarea>`)
- **Action buttons** (Copy, Retry, Thumbs): visible only on hover (line 179), inaccessible to keyboard-only users unless they Tab into the message. Need `:focus-within` support (line 180 does have this -- good).
- **Follow-up chips**: No keyboard shortcut to cycle through chips (e.g., arrow keys)
- **Scroll-to-bottom button**: Not in tab order relative to other controls -- placement is absolute
- **Version navigation buttons** (line 641-643): Have proper disabled states but no `aria-label`

### 2.3 ARIA & Accessibility
- **Line 611**: `role="log"` with `aria-live="polite"` is correct for the message list.
- **Line 623**: `.innerHTML` bypasses screen reader DOM updates from Lit -- screen readers may not announce new AI content correctly since Lit doesn't manage those nodes.
- **Line 621**: Avatar has `aria-hidden="true"` -- good.
- **Missing**: Action buttons lack `aria-label` on thumbs up/down (lines 634-635 have `title` but no `aria-label`).
- **Missing**: No `role="status"` on the streaming cursor for screen reader announcement.
- **Missing**: The empty state at line 612-616 should have `role="status"`.
- **Missing**: Stop button (line 663) has no `aria-label`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 51 | `min-height: 400px` | `--cg-size-chat-min-height` or remove constraint |
| 52 | `max-height: 800px` | `--cg-size-chat-max-height` or remove constraint |
| 75 | `max-width: 85%` | Token or CSS custom property |
| 77 | `animation: slideIn 250ms` | `var(--cg-motion-duration-fast)` |
| 82 | `translateY(8px)` | `var(--cg-spacing-8)` |
| 88-89 | `width: 28px; height: 28px` | `var(--cg-size-avatar-sm)` |
| 93 | `line-height: 1.5` | `var(--cg-line-height-normal)` |
| 111 | `line-height: 1.5` | `var(--cg-line-height-normal)` |
| 113-114 | `blur(8px)` | `var(--cg-blur-sm)` |
| 120 | `border-bottom-right-radius: 4px` | `var(--cg-border-radius-50)` |
| 125 | `border-bottom-left-radius: 4px` | `var(--cg-border-radius-50)` |
| 138 | `padding: 2px` | `var(--cg-spacing-2)` |
| 149 | `line-height: 1.5` | `var(--cg-line-height-normal)` |
| 162 | `width: 2px; height: 14px` | Token-based cursor size |
| 164 | `margin-left: 1px` | `var(--cg-spacing-1)` |
| 188 | `padding: 2px` | `var(--cg-spacing-2)` |
| 232 | `margin: 0 auto 8px` | `var(--cg-spacing-8)` |
| 249-250 | `bottom: 76px; right: 20px; width: 32px; height: 32px` | Tokens |
| 398 | `> 100` | Named constant |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 54 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 58 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |
| 99 | `rgba(34, 197, 94, 0.15)` | `var(--cg-color-success-container)` |
| 115 | `rgba(255, 255, 255, 0.06)` | Token |
| 118 | `rgba(34, 197, 94, 0.12)` | `var(--cg-color-success-container)` |
| 128 | `rgba(239, 68, 68, 0.1)` | `var(--cg-color-error-container)` |
| 130 | `rgba(239, 68, 68, 0.2)` | `var(--cg-color-error-container-border)` |
| 137 | `rgba(255, 255, 255, 0.06)` | Token |
| 144 | `rgba(0, 0, 0, 0.3)` | Token |
| 197 | `rgba(255, 255, 255, 0.04)` | Token |
| 234 | `rgba(239, 68, 68, 0.1)` | `var(--cg-color-error-container)` |
| 235 | `rgba(239, 68, 68, 0.2)` | Token |
| 244 | `rgba(239, 68, 68, 0.15)` | Token |
| 325-327 | `rgba(223, 255, 97, 0.3/0.05)` | Token |

### 3.3 Spacing Issues
- Inconsistent use of spacing tokens: some paddings use tokens (line 65: `var(--cg-spacing-20)`), while nearby values use raw numbers (line 138: `padding: 2px`).
- The `.chat` container uses `min-height`/`max-height` magic numbers that should be configurable CSS custom properties.

### 3.4 Modern Design Enhancements
- Add subtle hover elevation on message bubbles
- Add typing indicator animation (beyond the simple thinking state)
- Consider glass-morphism consistency -- `backdrop-filter: blur(8px)` is only on `.bubble` but not on the panel itself
- Add smooth scroll-snap behavior for long conversations
- Message entry animation `slideIn` should use design system motion tokens

## 4. Prioritized Fixes

### P0 - Critical
1. Replace `.innerHTML` usage (line 623) with a CSP-safe rendering approach or use Lit's `unsafeHTML` directive with DOMPurify sanitization
2. Add `aria-label` to thumbs up/down buttons (lines 634-635)
3. Add `aria-label` to stop button (line 663)

### P1 - High
4. Replace all raw rgba colors with semantic design tokens (14 instances)
5. Replace all magic number sizes with tokens or CSS custom properties (18+ instances)
6. Add `:active` / pressed states to send button, action buttons, follow-up chips
7. Add persistent "rated" visual state for thumbs up/down
8. Enforce `maxMessages` property -- currently declared but never used
9. Add `role="status"` to streaming cursor and empty welcome state

### P2 - Medium
10. Replace `as any` cast on aiClient (line 426) with proper typing
11. Add Escape key handler to clear input
12. Add `aria-label` to version navigation buttons
13. Convert `<input>` to `<textarea>` to support multi-line messages
14. Make `min-height`/`max-height` configurable via CSS custom properties
15. Use motion tokens for all animations (`slideIn`, `blink`)

### P3 - Low
16. Add offline/reconnecting state
17. Add scroll-snap behavior for message list
18. Add character count / limit indicator on input
19. Support drag-and-drop file attachments
20. Add message timestamp display
