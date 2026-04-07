# ai-agent-card — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.card` background | `rgba(255, 255, 255, 0.03)` | No | Raw rgba |
| `.card` border | `rgba(255, 255, 255, 0.08)` | No | Raw rgba |
| `.card` border-radius | `12px` | No | Should use `--cg-border-radius-200` |
| `.card` transition | `all 150ms` | No | Non-specific `all`, duration not tokenized |
| `.card:hover` border-color | `rgba(255, 255, 255, 0.15)` | No | Raw rgba |
| `.card:focus-visible` box-shadow | `rgba(223, 255, 97, 0.25)` | No | Should use focus ring token |
| `.header` border-bottom | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.handoff` border-bottom | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.caps` border-top | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| Rounded variants | Raw `4px`, `8px`, `12px`, `99999px` | No | Should reference tokens |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (idle) | Yes | |
| Hover | Yes | Border shift + translateY |
| Focus-visible | Yes | Box-shadow focus ring |
| Active (thinking/acting) | Yes | Accent border, pulsing dot |
| Done | Yes | Green status dot |
| Error | Yes | Red status dot + label |
| Pressed/active | No | Missing :active state |
| Disabled | No | No disabled property |
| Loading/skeleton | No | No skeleton state |

### Interaction Audit
- Click dispatches `ai-agent-select` - OK
- Pause button dispatches `ai-agent-pause` with stopPropagation - OK
- Cancel button dispatches `ai-agent-cancel` with stopPropagation - OK
- Keyboard: Enter/Space on card triggers click (inline handler) - OK
- Actions only shown when `isActive` - OK
- Card uses `tabindex="0"` and `role="article"` - OK
- `override role` property shadows HTMLElement.role — potential TS issue

## Style Fixes Needed

1. **Replace raw rgba backgrounds** on `.card` with overlay tokens
2. **Replace raw rgba borders** on `.card` with `var(--cg-color-surface-container-border)`
3. **Replace raw border-radius** `12px` with `var(--cg-border-radius-200, 12px)`
4. **Tokenize transition** from `all 150ms` to specific properties with `var(--cg-motion-duration-fast)`
5. **Replace raw hover border** with `var(--cg-color-surface-border-hover)`
6. **Replace raw focus ring** with shared focus token
7. **Replace raw rgba dividers** in `.header`, `.handoff`, `.caps` with border token
8. **Tokenize rounded variants** to use `var(--cg-border-radius-*)` tokens

## Interaction Fixes Needed

1. **Add `:active` press state** for card interaction feedback
2. **Add `disabled` property** with aria-disabled and visual muting
3. **Add loading/skeleton state** for async agent data
4. **Fix `override role` property** — conflicts with HTMLElement.role, rename to `agentRole` or similar
5. **Add `aria-live="polite"` on status region** so status changes (idle->thinking->done) are announced
6. **Keyboard handler should be a named method** instead of inline lambda for testability

## Test Spec

### Unit Tests
- [ ] renders with name, role, status, task, capabilities
- [ ] shows pulsing status dot for `thinking` and `acting`
- [ ] shows green dot for `done`, red for `error`, gray for `idle`
- [ ] shows pause/cancel action buttons only when status is `thinking` or `acting`
- [ ] renders handoff chain with arrows between steps, last step highlighted as "current"
- [ ] renders capability chips
- [ ] renders default robot SVG avatar when no avatar prop provided
- [ ] renders custom avatar string when provided

### Event Tests
- [ ] dispatches `ai-agent-select` on card click with name, role, status
- [ ] dispatches `ai-agent-pause` on pause button click without triggering card click
- [ ] dispatches `ai-agent-cancel` on cancel button click without triggering card click
- [ ] Enter/Space on card fires select event

### Accessibility Tests
- [ ] card has `role="article"` and `tabindex="0"`
- [ ] card `aria-label` includes agent name and status
- [ ] action buttons have `aria-label` ("Pause agent", "Cancel agent")
- [ ] focus ring visible on card and action buttons

### Visual Regression Tests
- [ ] snapshot: idle agent card
- [ ] snapshot: thinking agent with task and handoff chain
- [ ] snapshot: error state
- [ ] snapshot: done state with capabilities
