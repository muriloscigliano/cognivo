# ai-alert-card — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.card` padding | Token mix | Partial | Left padding `--cg-spacing-20` is good |
| `.card` transition | `box-shadow 150ms ease, transform 150ms ease` | Partial | Duration not tokenized |
| `.card:hover` transform | `translateY(-1px)` | OK | But no :active state |
| `.card.critical` animation | `pulse-glow 2s ease-in-out infinite` | No | Duration not tokenized |
| `.action-btn.critical:hover` | `filter: brightness(0.9)` | No | Inconsistent with other urgency hover patterns |
| `.message` border-bottom | Uses `var(--cg-color-surface-container-border)` | Yes | OK |
| All other colors/spacing | Properly tokenized | Yes | Good use of semantic tokens |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (info) | Yes | Blue left border |
| Warning | Yes | Yellow left border |
| Urgent | Yes | Orange left border |
| Critical | Yes | Red left border + pulse animation |
| Hover | Yes | translateY(-1px) |
| Focus-visible | Yes | Outline on action-btn and dismiss |
| Dismissed | No | No dismiss animation/transition |
| Disabled | No | No disabled state |
| Loading | No | No loading/skeleton state |
| Pressed/active | No | Missing :active state |

### Interaction Audit
- Action button dispatches `ai-alert-action` - OK
- Dismiss button dispatches `ai-alert-dismiss` - OK
- Card has `role="alert"` - OK for urgent notifications
- Card has `tabindex="0"` - OK
- Keyboard navigation: no explicit keydown handler on card itself
- `aria-label` includes urgency and title - OK
- No keyboard handler for card-level interaction (only buttons have click handlers)

## Style Fixes Needed

1. **Tokenize transition durations** in `.card` to use `var(--cg-motion-duration-fast)`
2. **Tokenize critical pulse animation duration** to use motion token
3. **Normalize critical button hover** — use `var(--cg-red-500)` background instead of `filter: brightness(0.9)` for consistency
4. **Add focus-visible on card element** — card is focusable but has no visible focus indicator

## Interaction Fixes Needed

1. **Add `:active` press state** on action button (scale or darken)
2. **Add dismiss animation** — fade out or slide out before removal
3. **Add loading/skeleton state** for async alert data
4. **Add `disabled` prop** for action button disabled state
5. **Add keyboard handler on card** — since it has `tabindex="0"`, Enter/Space should do something (e.g., expand or focus action)
6. **Validate `role="alert"`** — only appropriate for urgent content; `info` urgency should use `role="status"` instead
7. **Add `aria-live` consideration** — `role="alert"` implies `aria-live="assertive"`, which may be too aggressive for info-level alerts

## Test Spec

### Unit Tests
- [ ] renders with title, message, urgency, deadline, actionLabel
- [ ] renders correct urgency-colored left border for each urgency level
- [ ] renders urgency-specific icon for info, warning, urgent, critical
- [ ] renders deadline badge when `deadline` prop provided
- [ ] renders action button only when `actionLabel` provided
- [ ] renders dismiss button when `dismissible=true` (default), hides when false
- [ ] critical urgency has pulse-glow animation class

### Event Tests
- [ ] dispatches `ai-alert-action` on action button click with title and urgency
- [ ] dispatches `ai-alert-dismiss` on dismiss button click with title
- [ ] events have `bubbles: true` and `composed: true`

### Accessibility Tests
- [ ] card has `role="alert"` and `aria-label` containing urgency and title
- [ ] action button has `aria-label` matching actionLabel
- [ ] dismiss button has `aria-label="Dismiss alert"`
- [ ] deadline badge has `aria-label` with deadline text
- [ ] focus-visible outlines on action and dismiss buttons
- [ ] focus-visible indicator on card itself

### Visual Regression Tests
- [ ] snapshot: info alert with deadline
- [ ] snapshot: critical alert with pulse animation
- [ ] snapshot: warning alert with action button
- [ ] snapshot: alert without dismiss button
