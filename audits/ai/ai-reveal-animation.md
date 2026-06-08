## ai-reveal-animation — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 34 | `opacity: 0` | literal `0` | Yes | None — bare `0` is allowed |
| 35 | `will-change: transform, opacity` | keyword | Yes | None |
| 39 | `opacity: 0` | literal `0` | Yes | None |
| 42 | `transform: translateY(var(--cg-spacing-24)` | `--cg-spacing-24` | **No** | **Malformed — missing closing `)` on the `transform` value. Token is real; the `var()`/`translateY()` parens are unbalanced.** |
| 46 | `transform: scale(0.85)` | unitless scalar | Yes | None — animation geometry |
| 50 | `transform: perspective(600px) rotateX(-15deg)` | `600px` / `-15deg` | Yes | None — 3D transform geometry, not a sizing/layout magic number |
| 55 | `animation: reveal-fade var(--_duration) var(--_delay) ease both` | runtime vars + `ease` | Yes | `--_duration`/`--_delay` are JS-injected runtime vars (not design tokens); `ease` is a keyword. Acceptable (see §2 note) |
| 58 | `animation: ... var(--cg-transition-easing-materialize) both` | `--cg-transition-easing-materialize` | Yes | None — valid tier-1 easing token (vocab line 1198) |
| 61 | `animation: ... var(--cg-transition-easing-materialize) both` | `--cg-transition-easing-materialize` | Yes | None |
| 64 | `animation: ... var(--cg-transition-easing-materialize) both` | `--cg-transition-easing-materialize` | Yes | None |
| 69 | `opacity: 1` | literal `1` | Yes | None |
| 70 | `transform: none` | keyword | Yes | None |
| 71 | `animation: none` | keyword | Yes | None |
| 75-77 | `@keyframes reveal-fade` opacity 0→1 | literals | Yes | None — keyframe positions exempt |
| 80 | `@keyframes reveal-slide-up` `transform: translateY(var(--cg-spacing-24)` | `--cg-spacing-24` | **No** | **Same malformed `var()` — missing closing `)`. Token valid, parens unbalanced.** |
| 81 | `transform: translateY(0)` | literal `0` | Yes | None |
| 84-87 | `@keyframes reveal-scale` scale 0.85→1 | unitless scalars | Yes | None — keyframe geometry |
| 89-92 | `@keyframes reveal-flip` perspective/rotateX | `600px` / deg | Yes | None — keyframe 3D geometry |
| 174 | inline `--_duration: ${duration}ms; --_delay: ${delay}ms;` | JS runtime values | Yes | None — user-supplied animation timing injected as runtime custom props, not styling tokens |

### 2. Styling Audit

- **Border radius:** None used. This is a transparent layout wrapper around slotted content — N/A and correct (no surface of its own).
- **Spacing:** Only the slide-up offset uses a token (`--cg-spacing-24`). Good — no magic numbers for layout. The 3D `600px`/`-15deg`/`0.85` values are animation geometry, not spacing/sizing, so they are exempt.
- **Font-size accessibility:** N/A — component renders no text of its own; it only wraps a `<slot>`.
- **Translucent vs solid borders:** N/A — no borders.
- **Transitions explicit vs `all` + motion tokens:** No `transition: all` anywhere. Animations are named `@keyframes` with explicit `animation` shorthand. Easing uses the design-token `--cg-transition-easing-materialize` for slide/scale/flip — good. **Minor:** the `fade` variant (line 55) uses the raw CSS keyword `ease` instead of a motion token such as `--cg-transition-easing-default`; for consistency it should use a token, but a bare CSS easing keyword is not a hard token violation.
- **Dark-theme suitability:** No colors declared, so the component is theme-agnostic and inherits correctly under dark-first. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.wrapper { opacity: 0 }` + per-type hidden transform | Initial hidden state is correct |
| Hover | N/A | — | Non-interactive animation wrapper; hover has no meaning |
| Active/Press | N/A | — | Non-interactive |
| Focus-visible | N/A | — | `role="presentation"`, not focusable; focus belongs to slotted content |
| Disabled | N/A | — | No disabled concept for a reveal wrapper |
| Loading | N/A | — | The reveal itself is the transition; no separate loading affordance |
| Error | N/A | — | No error surface |
| Success | Partial | `.wrapper.done` (opacity 1, transform none) is the post-reveal resting state; `ai-reveal-complete` fires on `animationend` | Functional; this is a presentation completion, not a semantic success state |
| Reduced-motion | Yes | `reducedMotion` shared style + `connectedCallback` marks `_done` and dispatches `ai-reveal-complete` via rAF | Good — respects `prefers-reduced-motion` and still emits the completion event |

### 4. Interaction Audit

- **Keyboard:** N/A — purely presentational wrapper; no interactive controls. Correct.
- **ARIA:** `role="presentation"` is appropriate. `aria-hidden` toggles `true` while hidden/not-done and `false` once visible/done — sensible so AT doesn’t announce content mid-animation.
- **CustomEvents:** `ai-reveal-complete` dispatched with `{ bubbles: true, composed: true }` so it escapes the shadow boundary — correct. Fired once via `{ once: true }` plus an `AbortController` aborted on disconnect and on visibility change, preventing duplicate/leaked listeners. Solid. Minor: the event carries no `detail` (e.g. `{ type }`); consumers can’t tell which animation completed. Enhancement, not a defect.
- **Touch targets:** N/A — non-interactive.

### 5. Visual Design Check

Modern/sleek: Yes — four well-chosen entrance animations (fade, slide-up, scale, flip) with tokenized `materialize` easing give a polished "AI result materializing" feel. Radius/breathing room/dividers/typography: N/A (transparent wrapper, no chrome of its own) — it correctly defers all surface styling to slotted content, the right abstraction. `will-change` is set up front and released to `auto` after `animationend`, a thoughtful performance touch. Showcase-ready as an infrastructure primitive. One-word verdict: **strong** (contingent on fixing the malformed `var()` that currently breaks the slide-up transform).

### 6. Fixes Needed

1. **Line 42** — malformed `var()` / unbalanced parentheses.
   - Current: `transform: translateY(var(--cg-spacing-24);`
   - Fixed: `transform: translateY(var(--cg-spacing-24));`
   - Why: `translateY(` is never closed (the single `)` closes `var(`). This invalidates the whole `transform` declaration, so the slide-up initial offset silently fails. Token `--cg-spacing-24` is valid; only the closing paren is missing.

2. **Line 80** — same malformed `var()` inside the `reveal-slide-up` keyframe `from`.
   - Current: `from { opacity: 0; transform: translateY(var(--cg-spacing-24); }`
   - Fixed: `from { opacity: 0; transform: translateY(var(--cg-spacing-24)); }`
   - Why: Identical unbalanced-paren bug; the keyframe start transform is dropped, so the slide-up animation has no vertical travel. Token valid; only the closing paren missing.

Additional (non-token, not in fixes array): line 55 `fade` uses raw CSS `ease` instead of a motion easing token like `--cg-transition-easing-default`, unlike the other three variants which use `--cg-transition-easing-materialize`; recommend tokenizing for consistency. The `ai-reveal-complete` event could optionally include `detail: { type: this.type }` so listeners know which reveal finished.

### Research-backed enhancements

1. **Add a `blur-in` reveal variant (scale + opacity + backdrop blur).** The dominant 2025 reveal pattern across Magic UI / shadcn ecosystems is "Blur Fade" and the "materializing" Rich Popover effect — content that fades up from a frosted-glass blur (`filter: blur(8px) → blur(0)` synchronized with opacity/scale), which reads as content "coming into focus" rather than just sliding. This maps perfectly onto Cognivo's `materialize` easing token and the AI "result materializing" narrative this component already targets. Add it as a fifth `type` and animate `filter` (token the blur radius as a tier-3 `--cg-component-reveal-blur` rather than a magic `8px`). Source: [Blur Fade — Magic UI / animation-svelte](https://animation-svelte.vercel.app/magic/blur-fade), [SmoothUI: 15 animated shadcn components](https://smoothui.dev/blog/shadcn-ui-animated-components).

2. **Support staggered child reveal, not just whole-wrapper reveal.** Motion Primitives and the shadcn animated-list/animated-text components all converge on *staggered* entrance (children animate in sequence with an incrementing delay) as the signature modern feel — a single block fade now reads as dated. Expose a `stagger` boolean + `stagger-step` (ms) that walks assigned slot children and sets each one's `--_delay` to `index * step`, reusing the existing runtime-custom-prop mechanism (`--_duration`/`--_delay`) you already inject at line 174. This is the single highest-impact upgrade for an AI component that reveals lists of sources/suggestions. Source: [Motion Primitives — All Shadcn](https://allshadcn.com/tools/motion-primitives/), [Shadcn Animated List](https://shadcnspace.com/components/animated-list).

3. **Add an `intersection`/`on-visible` trigger mode (reveal-on-scroll).** Every 2025 reveal kit (Magic UI Blur Fade, Motion Primitives) defaults to firing the reveal when the element scrolls into the viewport via `IntersectionObserver`, not on mount. Currently this component reveals immediately in `connectedCallback`, which wastes the animation for off-screen content and triggers all reveals at once on a long AI result page. Add a `trigger="mount" | "visible"` prop; in `visible` mode, observe self and start the animation on first intersection (and respect the existing reduced-motion short-circuit). Source: [Blur Fade — Magic UI](https://animation-svelte.vercel.app/magic/blur-fade), [SmoothUI](https://smoothui.dev/blog/shadcn-ui-animated-components).

4. **Spring-style easing token instead of plain `ease`/`materialize` for scale/flip.** Framer-Motion-driven libraries (which back nearly all the shadcn motion components) use spring physics, giving reveals a slight overshoot-and-settle that feels more alive than a static cubic-bezier. Where physics isn't available in pure CSS, the standard approximation is a `linear()` easing function or an overshoot bezier (e.g. `cubic-bezier(0.34, 1.56, 0.64, 1)`). Recommend adding a `--cg-transition-easing-spring` tier-1 token and using it for the `scale`/`flip` variants where a subtle bounce reinforces the "pop" of arrival. Source: [Motion Primitives — All Shadcn](https://allshadcn.com/tools/motion-primitives/), [Super 7 Shadcn Animation Library](https://shadcnstudio.com/blog/shadcn-animation-library).

5. **Emit a `ai-reveal-start` event alongside `ai-reveal-complete`, with `detail: { type }` on both.** Modern animated-component APIs expose lifecycle callbacks (`onAnimationStart`/`onAnimationComplete` in the Motion Primitives / Framer Motion model) so parents can orchestrate sequences — e.g. start a typewriter once the container reveal begins, or chain a stagger across sibling cards. Pairing this with the `detail.type` payload already noted in §6 turns the component from a fire-once primitive into a composable orchestration node. Source: [Motion Primitives — All Shadcn](https://allshadcn.com/tools/motion-primitives/).

Sources:
- [Blur Fade — Magic UI / animation-svelte](https://animation-svelte.vercel.app/magic/blur-fade)
- [Motion Primitives — All Shadcn](https://allshadcn.com/tools/motion-primitives/)
- [SmoothUI: 15 animated shadcn components](https://smoothui.dev/blog/shadcn-ui-animated-components)
- [Shadcn Animated List](https://shadcnspace.com/components/animated-list)
- [Super 7 Shadcn Animation Library](https://shadcnstudio.com/blog/shadcn-animation-library)
