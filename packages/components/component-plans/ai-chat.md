# ai-chat — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.chat` background | `rgba(255, 255, 255, 0.02)` | Raw RGBA — needs overlay token |
| `.chat` border-radius | `12px` | Should use `var(--cg-border-radius-150, 12px)` |
| `.chat` border | `1px solid rgba(255, 255, 255, 0.08)` | Raw RGBA |
| `.bubble` border-radius | `12px` | Should use token |
| `.bubble` font-size | `14px` | Should use `var(--cg-font-size-sm, 14px)` |
| `.bubble` line-height | `1.6` | Should use `var(--cg-line-height-relaxed, 1.625)` |
| `.bubble` border | `1px solid rgba(255, 255, 255, 0.06)` | Raw RGBA |
| User bubble background | `rgba(223, 255, 97, 0.10)` | Should use `var(--cg-overlay-brand-faint)` |
| User bubble border | `rgba(223, 255, 97, 0.15)` | Should use `var(--cg-overlay-brand-border)` |
| User bubble color | `#fafafa` | Raw hex — should use token |
| AI bubble background | `rgba(255, 255, 255, 0.04)` | Raw RGBA |
| AI bubble color | `#fafafa` | Raw hex |
| `.bubble` border-bottom-right-radius | `4px` | Should use token |
| Input border | `1px solid rgba(255, 255, 255, 0.08)` | Raw RGBA |
| Input border-radius | `8px` | Should use token |
| Input font-size | `14px` | Should use token |
| Input background | `rgba(255, 255, 255, 0.05)` | Raw RGBA |
| Input color | `#fafafa` | Raw hex |
| `.send-btn` height | `36px` | Magic number |
| `.send-btn` border-radius | `8px` | Should use token |
| `.send-btn` color | `#000` | Raw hex |
| `.toast` background | `#111` (in related toast) | Raw hex |
| Multiple `150ms` transitions | Hardcoded | Should use motion tokens |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Empty (no messages) | Yes | Welcome message |
| No AI client | Yes | Setup prompt |
| Messages list | Yes | User + AI bubbles |
| Streaming | Yes | Blinking cursor |
| Thinking | Yes | ai-thinking component |
| Error message | Yes | Red error bubble |
| Copy message | Yes | Copied state feedback |
| Regenerate | Yes | Button dispatches event |
| Rate (up/down) | Yes | Button dispatches event |
| Follow-up chips | Yes | Clickable suggestions |
| Scroll to bottom | Yes | Button when scrolled up |
| Stop generating | Yes | Abort button |
| Version navigation | Yes | Multi-version messages |
| Disabled input | Yes | During streaming/thinking |
| IME composition | Yes | Composition events handled |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Send message | OK | Enter key or button |
| Streaming API | OK | `streamResponse()` and `completeStream()` |
| Stop generation | OK | AbortController |
| Copy | OK | Clipboard API |
| Rate | OK | Events dispatched |
| Regenerate | OK | Events dispatched |
| Scroll management | OK | Auto-scroll + manual scroll button |
| IME support | OK | compositionstart/end |
| Export conversation | OK | Markdown export method |
| Focus management | Partial | No focus trap, no initial focus on input |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| Messages `role="log"` | OK | With aria-live="polite" |
| Input `aria-label` | OK | "Chat message input" |
| Send button `aria-label` | OK | "Send message" |
| Scroll button `aria-label` | OK | "Scroll to bottom" |
| Action buttons `title` | OK | Copy, Regenerate, etc. |
| Message roles | Missing | No `aria-label` per message identifying sender |
| Focus-visible | OK | Global `:focus-visible` rule |
| Keyboard only usage | Partial | Actions only visible on hover (not focus-within working?) |
| Screen reader message flow | Partial | aria-live may be too noisy during streaming |

## Style Fixes Needed
1. Replace all raw RGBA values with overlay/border tokens
2. Replace all raw hex colors (#fafafa, #000) with semantic tokens
3. Tokenize all border-radius values
4. Tokenize all font-size and line-height values
5. Tokenize `.send-btn` height
6. Replace all hardcoded transition durations with motion tokens
7. Replace input background/border with semantic tokens

## Interaction Fixes Needed
1. Add `aria-label` per message (e.g., "User message" / "AI response")
2. Auto-focus input when component mounts (if appropriate)
3. Consider throttling aria-live updates during streaming to avoid SR noise
4. Ensure `.actions` are visible on `:focus-within` (currently only `:hover`) — verify CSS
5. Add message `id` attributes for aria-describedby on version nav

## Test Spec

### Unit Tests
- `it('renders empty state with welcome message when no messages')`
- `it('renders setup prompt when aiClient is null')`
- `it('sends message on Enter key press')`
- `it('sends message on send button click')`
- `it('does not send empty messages')`
- `it('disables input during streaming')`
- `it('disables input during thinking')`
- `it('shows thinking indicator during AI processing')`
- `it('renders user messages with accent bubble')`
- `it('renders AI messages with neutral bubble')`
- `it('renders error messages with error styling')`
- `it('shows blinking cursor during streaming')`
- `it('shows stop button during streaming/thinking')`
- `it('fires ai-message-sent event on send')`
- `it('fires ai-response-received on completion')`
- `it('fires ai-error on failure')`
- `it('copies message on copy button click')`
- `it('fires ai-chat-regenerate on retry button')`
- `it('fires ai-chat-rate on rate buttons')`
- `it('renders follow-up chips after response')`
- `it('sends follow-up text on chip click')`
- `it('shows scroll-to-bottom button when scrolled up')`
- `it('scrolls to bottom on button click')`
- `it('handles message version navigation')`
- `it('supports IME composition (no early send)')`
- `it('exports conversation as markdown')`
- `it('applies rounded variants')`

### Visual Regression
- Chat with mixed user/AI messages
- Streaming state with cursor
- Thinking state
- Error message
- Follow-up chips visible
- Empty state
