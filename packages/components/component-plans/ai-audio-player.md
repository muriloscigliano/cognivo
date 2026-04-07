# ai-audio-player — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | WARN | `.title { font-weight: 600 }`, `.speed-btn { font-weight: 700 }` — raw values |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | `.play-btn { transition: transform 100ms ease }`, `.progress-fill { transition: width 100ms linear }` — raw values |
| Waveform gap | WARN | `.waveform { gap: 2px }` — raw pixel |
| Wave bar widths | WARN | `.wave-bar { min-width: 2px; max-width: 4px }` — raw pixels |
| Progress track | WARN | `.progress-track { height: 4px }`, `.progress-fill { border-radius: 2px }` — raw pixels |
| Play button | WARN | `.play-btn { width: 40px; height: 40px }` — raw pixels |
| Reduced motion | PASS | Has `@media (prefers-reduced-motion: reduce)` block |
| Host animation | WARN | `200ms` without token reference |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Player with play button, waveform, progress |
| Playing | YES | Pause icon shown, animation running |
| Paused | YES | Play icon shown, animation stopped |
| Hover | YES | Play button scale on hover |
| Active/Pressed | YES | Play button press scale |
| Focus | YES | Focus-visible outlines on all buttons |
| Disabled | NO | No disabled state |
| Loading | NO | No loading state for audio buffering |
| Ended | YES | Resets to start, fires event |
| Error | NO | No error state for failed audio load |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Play/Pause | YES | Toggles playback, fires events |
| Seek click | YES | Click on progress track to seek |
| Seek keyboard | YES | ArrowRight/Left (+/-5s), Home/End |
| Speed cycle | YES | Cycles through 1x, 1.5x, 2x |
| Waveform visual | YES | Decorative bars colored by progress |
| Events | YES | `ai-audio-play`, `ai-audio-pause`, `ai-audio-end` |
| ARIA slider | YES | `role="slider"` with valuemin/max/now on progress |
| Region | YES | `role="region" aria-label` on player |
| Audio lifecycle | YES | connectedCallback/disconnectedCallback manage audio |

## Style Fixes Needed
1. Replace `.title { font-weight: 600 }` with `var(--cg-font-weight-semibold, 600)`
2. Replace `.speed-btn { font-weight: 700 }` with `var(--cg-font-weight-bold, 700)`
3. Replace transition raw values with `var(--cg-motion-duration-fast, 100ms)` and easing tokens
4. Replace `.waveform { gap: 2px }` with `var(--cg-spacing-2, 2px)`
5. Replace wave bar widths with token-based values
6. Replace `.progress-track { height: 4px }` with `var(--cg-spacing-4, 4px)`
7. Replace `.play-btn` fixed size with token-based sizing
8. Replace host animation `200ms` with motion token
9. Add `rounded` attribute variant support

## Interaction Fixes Needed
1. Add loading/buffering state with spinner or skeleton waveform
2. Add error state for failed audio loads (catch in connectedCallback)
3. Add disabled state preventing all interaction
4. Seek slider needs `aria-valuetext` with formatted time
5. Add volume control
6. Add mute button
7. `title` property overrides HTMLElement.title — may cause issues, consider renaming to `heading` or `trackTitle`
8. Waveform bars are randomly generated — should accept data prop or be deterministic based on src
9. Speed button should show available speeds or use a dropdown

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders player with title and time | Unit |
| 2 | Play button shows play icon initially | Unit |
| 3 | Play click changes to pause icon | Interaction |
| 4 | Play click fires `ai-audio-play` | Event |
| 5 | Pause click fires `ai-audio-pause` | Event |
| 6 | Time display formats correctly (m:ss) | Unit |
| 7 | Waveform renders 40 bars | Unit |
| 8 | Progress bar width updates with current time | Unit |
| 9 | Seek click updates position | Interaction |
| 10 | ArrowRight advances 5 seconds | Keyboard |
| 11 | ArrowLeft rewinds 5 seconds | Keyboard |
| 12 | Home key seeks to start | Keyboard |
| 13 | End key seeks to end | Keyboard |
| 14 | Speed button cycles through speeds | Interaction |
| 15 | Audio end fires `ai-audio-end` and resets | Event |
| 16 | Disconnected callback cleans up audio | Lifecycle |
| 17 | src change reloads audio | Unit |
| 18 | Progress slider has ARIA attributes | A11y |
| 19 | Focus-visible on all buttons | A11y |
| 20 | Reduced motion disables transitions | A11y |
| 21 | Snapshot: default paused state | Visual |
| 22 | Snapshot: playing at 50% | Visual |
