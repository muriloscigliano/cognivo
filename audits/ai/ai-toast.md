## ai-toast — Manual Review

### 1. Token Audit (every CSS value)

The component's entire stylesheet is a single rule (lines 43-45):

```css
:host { display: contents; }
```

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 44 | display | `contents` (keyword, no token) | Yes | None — `contents` is a CSS keyword, not a tokenizable value. Correct choice for a transparent wrapper so the inner `cg-toaster` participates directly in layout. |

There are no other CSS declarations. `ai-toast` is a thin delegating wrapper around `cg-toaster`; all visual styling (border radius, colors, spacing, transitions, AI-state colors, the brand-accented left border, sparkle icon) lives in `cg-toaster.ts` and is selected via `.position`, `.max`, and the `variant: 'ai'` default. No tokens are referenced in this file, so there is nothing to misalign.

### 2. Styling Audit

- **Border radius:** Not set here. The `rounded` property (line 47, default `'lg'`) is declared and reflected but is NOT forwarded to `cg-toaster` in `render()` (lines 97-105) — see Fixes. No radius token is consumed in this file.
- **Spacing:** None defined locally; delegated to `cg-toaster`.
- **Font-size accessibility (14px min body):** No typography defined here; delegated to `cg-toaster`. Verify the 14px floor in the `cg-toaster` audit.
- **Translucent vs solid borders:** N/A in this file.
- **Transitions explicit vs `all` + motion tokens:** No transitions declared. No `transition: all` present. Clean.
- **Dark-theme suitability:** `display: contents` is theme-agnostic; the wrapper inherits whatever `cg-toaster` renders, which is dark-first. No concern.

No styling violations in this file. The styling surface is intentionally empty.

### 3. States Audit

`ai-toast` is a controller/host element, not an interactive surface. Visual states live on the rendered toasts inside `cg-toaster`.

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `:host { display: contents }`; renders `cg-toaster` with `position`, `max`, dismiss listener | None |
| Hover | N/A | Host has no visual surface; hover belongs to individual toasts in `cg-toaster` | Audit in cg-toaster |
| Active/Press | N/A | No pressable surface on the host | Audit in cg-toaster |
| Focus-visible | N/A | Host is not focusable; focus management is per-toast (close button) inside cg-toaster | Audit in cg-toaster |
| Disabled | N/A | A toast stack has no disabled concept | — |
| Loading | Partial | `type: 'ai'` with `duration: 0` (persistent) is the documented "thinking" pattern (line 13); state visuals come from cg-toaster's `ai` variant | None here |
| Error | Yes (data) | `show(msg, { type: 'error' })` maps to `variant: 'error'` (lines 64-77) | Error VISUALS are in cg-toaster; this file only routes the variant |
| Success | Yes (data) | `show(msg, { type: 'success' })` maps to `variant: 'success'` | Same as above |

State coverage at the wrapper level is appropriate. All visual state rendering is correctly delegated.

### 4. Interaction Audit

- **Keyboard keys:** None handled in this file. Dismiss-on-keyboard (e.g. Escape, close-button focus) is owned by `cg-toaster`. The wrapper does not intercept or block keyboard interaction.
- **ARIA roles/labels/states:** None set on the host. The host uses `display: contents`, so it contributes no box/role itself; the live-region / `role="status"|"alert"` semantics must come from `cg-toaster`. Confirm in the cg-toaster audit that toasts announce via an aria-live region. This wrapper does not add or break ARIA.
- **CustomEvents + detail correctness:**
  - Re-dispatches `ai-toast-dismiss` (lines 90-94) with `{ bubbles: true, composed: true, detail: { id, reason: 'auto' } }`. The `id` is correctly forwarded from the inner event's `detail.id`.
  - BUG: `reason` is hard-coded to `'auto'` (line 93) for every dismissal, including user-initiated (click) and programmatic (`clear()`) dismissals. The inner `cg-toaster-dismiss` event very likely carries its own `reason`; flattening it to `'auto'` makes the public event's `reason` field misleading. See Fixes / report flag.
  - The JSDoc `@fires` (line 21) advertises `{id, reason}` but does not document the value space — fine, but the hard-coded value undermines it.
  - `dismiss()` (line 80) and `clear()` (line 84) are programmatic API; they do not emit `ai-toast-dismiss` from this wrapper directly (only the inner event echo does). Acceptable.
- **Touch targets ≥44px:** No interactive elements rendered by this file; close-button touch sizing is a `cg-toaster` concern.

### 5. Visual Design Check

This file renders no visuals of its own — it is a `display: contents` pass-through to `cg-toaster` with the `ai` variant as the default differentiator. There is nothing to assess for radius, breathing room, dividers, or typography hierarchy at this layer; all of that is inherited. The showcase-readiness of the AI toast depends entirely on `cg-toaster`'s `ai` variant styling. As a wrapper, the implementation is clean and idiomatic.

One-word verdict: adequate

### 6. Fixes Needed

No token violations exist in this file (the only CSS is `display: contents`, which is correct). The issues below are correctness/wiring defects, not token defects, so they are reported here rather than as token fixes:

1. **`rounded` property is dead** — Lines 47 + 97-105. `rounded` is declared and reflected but never forwarded to `cg-toaster` in `render()`. Either forward it (e.g. `.rounded=${this.rounded}` if `cg-toaster` accepts it) or remove the property. As written it is a public API that does nothing.
   - Current: `<cg-toaster .position=${this.position} .max=${this.maxQueue} ...>`
   - Fix: forward the prop or delete `rounded` (line 47). Verify `cg-toaster`'s property name before forwarding — do not invent one.

2. **`reason` is always `'auto'`** — Line 93. The re-dispatched `ai-toast-dismiss` hard-codes `reason: 'auto'`, discarding the real dismissal reason from the inner `cg-toaster-dismiss` event. Forward the inner reason instead, e.g. `reason: (ce.detail as { reason?: string }).reason ?? 'auto'`, after confirming the inner event's detail shape in `cg-toaster.ts`.

3. **Inner-event detail typing** — Lines 88-89. `e` is typed as `CustomEvent<{ id: string }>`, which omits `reason`; widen the type to match what `cg-toaster` actually emits so fix #2 type-checks.

These are JS/TS behavior fixes with no token component, so the structured `fixes` array (token-verified CSS defects only) is empty.

### Research-backed enhancements

Modern 2025-era toast UX has consolidated around Sonner (the default `shadcn/ui` toaster, ~40M weekly downloads) and the Radix/Vercel/Linear interaction model. Measured against that bar, `ai-toast` (and the `cg-toaster` it delegates to) should pursue the following concrete upgrades:

1. **Momentum-based swipe-to-dismiss, not just a close button.** Sonner dismisses on a *fast* swipe even when the drag distance is short, because it tracks pointer velocity rather than a fixed distance threshold ([emilkowal.ski — Building a toast component](https://emilkowal.ski/ui/building-a-toast-component)). `cg-toaster` should add pointer-drag handling with a velocity check, and `ai-toast` should surface the resulting reason through the dismiss event — directly fixing Fix #2 by adding a `'swipe'` reason value alongside `'auto'`, `'click'`, and `'programmatic'`.

2. **Physical stacking with collapse-on-hover.** The Sonner/Vercel pattern renders the queue as a depth stack (3 visible, scaled and translated behind the front toast) that *expands to a full list on hover/focus* ([shadcn.io — Sonner](https://www.shadcn.io/ui/sonner), [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast)). This is a `cg-toaster` layout change, but `ai-toast`'s `maxQueue` prop should map to "visible stack depth" rather than a hard show/hide cap, so older AI toasts peek behind rather than vanish.

3. **Per-type auto-dismiss durations.** Best practice is to dismiss success faster than errors, and to keep important/assertive messages persistent ([LogRocket — React toast libraries compared 2025](https://blog.logrocket.com/react-toast-libraries-compared-2025/)). `ai-toast.show()` already accepts `duration`, but the type→duration default is uniform; set sensible defaults (e.g. success ~3s, error 0/persistent, `ai` thinking 0/persistent) so callers get the right behavior without passing `duration` every time.

4. **A visible countdown / progress affordance on auto-dismissing toasts.** Linear and the current Sonner builds animate a thin progress bar (or shrinking border) so users perceive the remaining lifetime and aren't surprised by disappearance ([shadcnstudio.com — Sonner](https://shadcnstudio.com/docs/components/sonner)). Add a `--cg-component-toast-progress-*` driven bar in `cg-toaster` that pauses on hover/focus (the same interaction that expands the stack), reinforcing enhancement #2.

5. **Correct ARIA live-region politeness per type.** Modern guidance is `aria-live="assertive"` (or `role="alert"`) for errors and `polite`/`role="status"` for success/info, with focus managed so SRs announce reliably ([LogRocket 2025](https://blog.logrocket.com/react-toast-libraries-compared-2025/), [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast)). The §4 audit flagged that live-region semantics live in `cg-toaster` and are unverified — they should be politeness-mapped by variant, with the `ai`/`error` variants escalating to assertive.

6. **Action-button affordance with an "undo" slot.** Sonner's signature pattern is a toast that carries a primary action (commonly Undo) inline ([medium — shadcn Sonner](https://medium.com/@rivainasution/shadcn-ui-react-series-part-19-sonner-modern-toast-notifications-done-right-903757c5681f)). For an AI-native library this is high value: a generated/streamed result toast that offers "Undo" or "Regenerate" inline. Extend `ai-toast.show()` options with an optional `action: { label, onClick }` and render it inside `cg-toaster` as a tier-2-colored secondary button meeting the 44px touch target.

Sources:
- [Building a toast component — emilkowal.ski](https://emilkowal.ski/ui/building-a-toast-component)
- [Sonner — shadcn.io](https://www.shadcn.io/ui/sonner)
- [Shadcn Sonner — shadcnstudio.com](https://shadcnstudio.com/docs/components/sonner)
- [Toast — Radix Primitives](https://www.radix-ui.com/primitives/docs/components/toast)
- [Comparing the top React toast libraries (2025) — LogRocket](https://blog.logrocket.com/react-toast-libraries-compared-2025/)
- [Sonner: Modern Toast Notifications Done Right — Stackademic/Medium](https://medium.com/@rivainasution/shadcn-ui-react-series-part-19-sonner-modern-toast-notifications-done-right-903757c5681f)
