## ai-badge — Manual Review

> **Context:** `ai-badge` is a **deprecated shim** (`@deprecated`, removal slated for v0.6.0). It does not render any visual UI of its own — it instantiates `<ai-confidence-badge>` in light-of-shadow, forwards every reactive property 1:1, and re-fires the inner `ai-confidence-badge-click` event under the legacy `ai-badge-click` name. All visual/token/state responsibility lives in `<ai-confidence-badge>`; this element is a pure pass-through wrapper.

### 1. Token Audit (every CSS value)

The component has exactly one inline style declaration plus the shared `hostBase` mixin.

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | `static styles` includes `hostBase` | (shared style module, out of scope) | Yes | None |
| 28 | `:host { display: inline-block; }` | `display: inline-block` — keyword, no value token required | Yes | None |

There are **no** color, spacing, radius, font-size, border, or transition declarations in this file. No magic numbers, no hex, no tier-1 palette colors, no comma-fallbacks, no `transition: all`. Nothing to audit beyond the single `display` keyword.

### 2. Styling Audit

- **Border radius:** N/A — no radius declared here. Owned by `<ai-confidence-badge>` (uses `--cg-component-ai-badge-radius-{sm,md,lg}`, which exist in the component vocab).
- **Spacing:** N/A — no padding/margin/gap in this file.
- **Font-size accessibility (14px min):** N/A — no typography declared here.
- **Translucent vs solid borders:** N/A — no borders declared.
- **Transitions explicit vs all + motion tokens:** N/A — no transitions declared. No `transition: all` violation present.
- **Dark-theme suitability:** N/A — no colors declared; inherits whatever `<ai-confidence-badge>` resolves.

`display: inline-block` is the correct host display for an inline confidence pill so it sizes to content and flows in text. No styling concerns.

### 3. States Audit

This element renders no interactive surface itself; all states are delegated to `<ai-confidence-badge>`. The shim's only behavioral responsibility is event re-dispatch.

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Delegated | `<ai-confidence-badge>` renders with forwarded props | None at this layer |
| Hover | Delegated | Owned by inner element | None at this layer |
| Active/Press | Delegated | Owned by inner element | None at this layer |
| Focus-visible | Delegated | Owned by inner element | None at this layer |
| Disabled | N/A | No `disabled` property on shim or inner badge | Confidence badge has no disabled concept |
| Loading | N/A | Static confidence score display, not async | No loading state by design |
| Error | N/A | Badge visualizes a numeric confidence score, not a status; no error mode | By design |
| Success | N/A | Score-driven, not pass/fail | By design |

### 4. Interaction Audit

- **Keyboard keys:** None handled in the shim. Keyboard behavior (if any — e.g. Enter/Space to trigger click) is the inner element's responsibility. Pass-through is appropriate.
- **ARIA roles/labels/states:** None set on the shim host, which is correct — adding ARIA here would duplicate/conflict with the inner `<ai-confidence-badge>`'s own semantics. No `aria-hidden` is applied to the wrapper, so the inner element's accessibility tree is preserved.
- **CustomEvents + detail correctness:** Lines 50–55 — `_onInnerClick` reads `(e as CustomEvent).detail` from the inner `ai-confidence-badge-click` event and re-emits it as `ai-badge-click` with `bubbles: true, composed: true` and the **same `detail` object forwarded verbatim**. This matches the documented `@fires CustomEvent<{score: number, level: string}>` contract (line 17), assuming the inner event already carries `{score, level}` — detail is passed through untouched, so correctness depends on the inner element, which is the right design for a compatibility shim.
- **Deprecation warning:** Lines 38–48 — one-time `console.warn` gated by a module-level `warned` flag. Correct (won't spam per-instance), `eslint-disable` comment present.
- **Property forwarding:** Lines 59–68 — all 7 properties forwarded. Note `size` is forwarded as an attribute (`size=${this.size}`) while the rest use property bindings (`.prop`); since `size` is a reflected string attribute on the inner element this is acceptable, though `.size=${this.size}` would be more consistent.
- **Touch targets ≥44px:** N/A at this layer — sizing is owned by `<ai-confidence-badge>`. (Confidence badges are typically small inline pills; if the inner badge is interactive, the ≥44px target is the inner element's audit item, not this shim's.)

### 5. Visual Design Check

N/A — this element contributes **zero** visual styling. It is a behavioral compatibility shim. Visual quality (radius, breathing room, dividers, typography hierarchy, showcase-readiness) must be assessed on `<ai-confidence-badge>`, the real component.

One-word verdict: **strong** (as a shim — minimal, correct, well-documented, self-deprecating with a clean migration path).

### 6. Fixes Needed

No fixes needed — component is compliant. The single CSS declaration (`display: inline-block`) requires no token, there are no color/spacing/radius/font/transition values to govern, no magic numbers, no comma-fallbacks, and no invented tokens. All visual and token responsibility correctly lives in `<ai-confidence-badge>`.

**Non-blocking observations (not token violations, no code change required):**
1. Minor consistency nit (line 62): `size` is forwarded as an attribute binding while all sibling props use property bindings; `.size=${this.size}` would unify the style. Cosmetic only — current form works because `size` reflects.
2. Confirm the inner `ai-confidence-badge-click` event's `detail` actually carries `{score, level}` so the forwarded legacy `ai-badge-click` contract on line 17 stays accurate. (Audit item for `<ai-confidence-badge>`, not this shim.)

### Research-backed enhancements

> Scope note: `ai-badge` is a behavioral shim with no visuals of its own, so these target the real surface — `<ai-confidence-badge>` (the element this shim instantiates). They are the modernizations worth carrying forward when the shim is retired in v0.6.0.

1. **Numeric-to-tick count-up on the confidence score** (Linear / Vercel "live data" feel). When the score mounts or updates, animate the displayed number from its prior value to the new one over ~250–400ms rather than snapping. Linear and Vercel dashboards use short count-up transitions on metric chips to signal "this value is real and just changed." Gate it behind `prefers-reduced-motion: reduce` (fall back to an instant set), and tie duration to an existing `--cg-motion-duration-*` token so it stays governed.

2. **Confidence as a visual fill, not just a color swap** (shadcn/HeroUI status-badge pattern). Today the level only drives the pill's color. Modern confidence indicators encode magnitude *within* the badge — e.g. a subtle inset progress arc or a left-edge fill bar whose width = `score%`, using the same tier-2 semantic color the level already resolves. This makes "0.62 vs 0.94" legible pre-attentively without reading the digits, which is the core job of a confidence badge.

3. **Tier-banded micro-iconography + tabular figures** (Vercel/shadcn density pattern). Prefix the score with a tiny level glyph (low/medium/high) rendered via Lit's `svg` template (per the CLAUDE.md icon gotcha) and set the number in `font-variant-numeric: tabular-nums` so badges in a list don't jitter width as scores change. shadcn's status badges lean on a leading dot/icon to carry meaning at small sizes where color alone fails WCAG non-text-contrast.

4. **Hover-reveal rationale tooltip, not just a click event** (HeroUI/Radix popover affordance). The shim only forwards a click. A 2025 confidence badge is expected to be *inspectable*: on hover/focus, surface a lightweight tooltip ("Confidence 0.62 — based on 3 sources") so the affordance is discoverable without a click and is keyboard/screen-reader reachable. Pair it with a `cursor: help` (non-interactive) or `cursor: pointer` (interactive) signal so users know which badges respond.

5. **Explicit focus-visible ring + ≥24px non-text target when interactive** (shadcn a11y convention). If the badge dispatches `*-click`, it must look and behave focusable: a `:focus-visible` ring from the shared focus-ring token, `role="button"`, `tabindex="0"`, and Enter/Space activation. shadcn ships every clickable badge with a visible focus ring and a minimum interactive hit area; an inline pill that only reacts to mouse clicks fails keyboard users and WCAG 2.5.8.

6. **Optional `pulse`/`live` state for streaming confidence** (Vercel "streaming" + Linear realtime pattern). For AI output that's still resolving, add a `live` boolean that renders a soft pulsing dot or shimmer until the score finalizes — the generative-UI equivalent of Vercel's streaming skeletons. This fills the currently-absent "loading" state (flagged N/A in §3) for the realtime case, again `prefers-reduced-motion`-aware.

**Sources:** [Badge — shadcn/ui](https://ui.shadcn.com/docs/components/radix/badge) · [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components) · [How shadcn's New Components Redefine Modern UI Design (2025)](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e) · [Badge Component — shadcndesign](https://www.shadcndesign.com/components/badge)
