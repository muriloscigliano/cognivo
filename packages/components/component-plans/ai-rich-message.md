# ai-rich-message — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Avatar size | `32px` | Should use `var(--cg-spacing-32, 32px)` |
| Avatar border-radius | `50%` | OK |
| `.bubble-body` border-radius | `var(--cg-border-radius-150, 12px)` | OK |
| `.bubble-body` padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | OK |
| User bubble border-radius | `12px 12px 4px 12px` | Should use `var(--cg-border-radius-150) var(--cg-border-radius-150) var(--cg-border-radius-50) var(--cg-border-radius-150)` |
| `.text p` margin | `0 0 8px` | Should use `var(--cg-spacing-8, 8px)` |
| `.text code` padding | `1px 5px` | Should use `var(--cg-spacing-1) var(--cg-spacing-6)` |
| `.actions` padding-top | `var(--cg-spacing-12)` | OK |
| `.actions` border-top | `1px solid var(--cg-color-surface-container-border)` | OK |
| `.action-btn` padding/border/font | Tokenized | OK |
| `.action-btn` transition | `all 150ms ease` | Overly broad — should target specific properties |
| `.timestamp` styles | Tokenized | OK |
| Entrance animation | `fadeSlideIn` | OK |
| `.bubble` max-width | `80%`, `70%` | Magic numbers — could be CSS props |

### States Audit
| State | Supported | Notes |
|---|---|---|
| User message | Yes | Accent background, reversed layout |
| Assistant message | Yes | Dark card background |
| System message | Yes | Dashed border, italic |
| With avatar image | Yes | `<img>` tag |
| Initials fallback | Yes | Role-based initials |
| With text | Yes | Paragraph splitting |
| With embedded cards | Yes | Dynamic element creation |
| With action buttons | Yes | Below bubble |
| With timestamp | Yes | Below actions |
| With slot content | Yes | Inside bubble-body |
| Empty text | Yes | Returns nothing |
| Loading | No | Missing loading state |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Action button click | OK | Fires `ai-message-action` |
| Card action bubbling | OK | Fires `ai-message-card-action` |
| Card creation | OK | Dynamic createElement with allowlist |
| Card type validation | OK | Allowlist prevents arbitrary elements |
| Card cleanup | OK | AbortController for listeners |
| Focus | OK | `tabindex="0"` on message |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="article"` | OK | On message container |
| `aria-label` | OK | "{role} message" |
| `tabindex="0"` | OK | Focusable |
| Avatar `aria-hidden` | OK | Decorative |
| Actions `role="group"` | OK | With aria-label |
| Action buttons `aria-label` | OK | Label text |
| Image alt text | OK | "{role} avatar" |
| Card unavailable fallback | OK | Graceful degradation |

## Style Fixes Needed
1. Tokenize avatar size to `var(--cg-spacing-32, 32px)`
2. Tokenize user bubble compound border-radius with individual tokens
3. Tokenize `.text p` margin with spacing token
4. Tokenize `.text code` padding with spacing tokens
5. Replace `.action-btn` `transition: all` with specific properties
6. Consider making max-width values customizable via CSS custom props

## Interaction Fixes Needed
1. Add loading state (skeleton bubble)
2. Consider adding copy-message action built-in
3. Card type allowlist should be extensible (prop or static method)
4. Consider adding `aria-roledescription` for richer message context

## Test Spec

### Unit Tests
- `it('renders assistant message with AI avatar and dark bubble')`
- `it('renders user message with reversed layout and accent bubble')`
- `it('renders system message with dashed border and italic')`
- `it('renders avatar image when src provided')`
- `it('falls back to initials when no avatar src')`
- `it('splits text into paragraphs')`
- `it('renders slot content inside bubble')`
- `it('renders action buttons below bubble')`
- `it('fires ai-message-action on action button click')`
- `it('renders embedded cards from cards prop')`
- `it('blocks unknown card types with fallback')`
- `it('fires ai-message-card-action from card events')`
- `it('renders timestamp below message')`
- `it('renders nothing for empty text')`
- `it('has correct ARIA (role=article, aria-label, tabindex)')`
- `it('avatar is aria-hidden')`
- `it('actions have role=group with aria-label')`
- `it('cleans up card listeners on disconnect')`

### Visual Regression
- User message with accent styling
- Assistant message with cards and actions
- System message with dashed border
- Message with long text (paragraph splitting)
- Message with timestamp
