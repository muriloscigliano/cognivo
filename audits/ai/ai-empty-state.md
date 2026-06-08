## ai-empty-state — Manual Review

> **Context:** `ai-empty-state` is a **deprecated forwarding shim** (removal slated for v0.6.0). It owns no visual styling of its own — it renders a `<cg-empty-state variant=…>` and optionally forwards a `<cg-button slot="actions">`. Its only styles are the shared `hostBlock` helper plus a one-line `:host([hidden]) { display: none; }` reset. All real layout/typography/state styling lives in `cg-empty-state` and `cg-button`, which are out of scope for this file's audit.

### 1. Token Audit (every CSS value)

The component declares only two style sources. There is no `static styles` CSS block with component-specific declarations.

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 31 | `styles` → `hostBlock` (imported) | `display: block`, `font-family: var(--cg-font-family-primary)`, `box-sizing: border-box`, `transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | ✅ | None — shared helper; uses real tier-1 tokens, explicit transition property (not `all`) |
| 31 | `:host([hidden]) display` | `none` | ✅ | None — `none` is allowed |

No raw hex, no rgba, no magic px, no tier-1 palette colors, no comma-fallbacks, no `transition: all`, no made-up tokens. Every token referenced (`--cg-font-family-primary`, `--cg-transition-duration-fast`, `--cg-transition-easing-default`) exists in `_token-vocab-tier1.txt`.

### 2. Styling Audit

- **Border radius:** N/A — no radius declared here; inherited from `cg-empty-state`.
- **Spacing:** N/A — no padding/margin/gap declared; layout owned by `cg-empty-state`.
- **Font-size accessibility (14px min):** N/A — no font-size set; only `font-family` via `hostBlock`. Body-text sizing is `cg-empty-state`'s concern.
- **Translucent vs solid borders:** N/A — no borders declared.
- **Transitions explicit vs all + motion tokens:** ✅ `hostBlock` uses an explicit `transition: color …` with tier-1 duration + easing tokens. No `transition: all`.
- **Dark-theme suitability:** ✅ — no hard-coded colors; theming flows entirely through `cg-empty-state` semantic tokens.

### 3. States Audit

State styling is delegated to the inner `cg-empty-state` / `cg-button`. This shim only manages the deprecation warning and action-event forwarding.

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ (forwarded) | Renders `cg-empty-state` with `variant`, `title`, `description`; optional `icon` slot and `action` button | None |
| Hover | N/A | Visual hover belongs to `cg-button` / `cg-empty-state` | Out of scope for the shim |
| Active/Press | N/A | Owned by `cg-button` | Out of scope |
| Focus-visible | N/A | Owned by `cg-button` (focusable action) | Out of scope |
| Disabled | N/A | No disabled API on this shim | Not applicable |
| Loading | N/A | Empty-state is a terminal display, not a loading surface | Not applicable |
| Error | ✅ (forwarded) | `variant="error"` passed through to `cg-empty-state` | None |
| Success | N/A | No success variant in the empty-state contract | Not applicable |

### 4. Interaction Audit

- **Keyboard:** No custom key handling. The action is a real `<cg-button>`, which provides native button keyboard semantics (Enter/Space). ✅
- **ARIA roles/labels/states:** None added at the shim level; relies on `cg-button` / `cg-empty-state` semantics. The action button's accessible name comes from `actionLabel` text content. Acceptable for a shim; no missing ARIA introduced here.
- **CustomEvents + detail correctness:** `_handleAction` (line 51-53) dispatches `ai-empty-action` with `{ bubbles: true, composed: true }` — correct for crossing the shadow boundary. No `detail` payload, which matches the documented legacy event contract (`@fires` on line 18). ✅
- **Touch targets ≥44px:** The action target is `cg-button`; its sizing is governed there, not in this file. Not a token violation in this component.

### 5. Visual Design Check

This file produces no independent visuals — it is a pass-through to `cg-empty-state`. There is nothing to assess for radius/breathing-room/typography here; the showcase quality is entirely a function of `cg-empty-state`. The shim itself is clean, minimal, and correctly scoped.

One-word verdict: **strong** (as a deprecated shim: minimal, compliant, correctly delegating).

### 6. Fixes Needed

No fixes needed — component is compliant. It is a deprecated forwarding shim with no component-specific CSS; the only styles come from the shared, already-compliant `hostBlock` helper and a `display: none` hidden reset. No token violations, no magic numbers, no comma-fallbacks, no `transition: all`, no invented tokens.

**Non-token flags (informational, not in fixes array):**
- The component is deprecated (removal v0.6.0); no remediation work is warranted beyond eventual deletion.
- Action button accessibility (touch target ≥44px, focus ring) and all AI-state coloring (e.g. `--cg-color-ai-error-text` for `variant="error"`) live in `cg-empty-state` / `cg-button` — audit those files to verify the AI-state token family is applied.

### Research-backed enhancements

> Scope note: this shim has no visuals of its own. The suggestions below target the **`cg-empty-state` host it forwards to** (where the real layout/UX lives) and the **AI-native props this shim could pass through** before its v0.6.0 removal. Each is actionable in that downstream component.

1. **Adopt the shadcn `Empty` compound anatomy as the forwarded slot contract.** shadcn's 2025 `Empty` primitive standardizes a fixed stack — `media` (icon/illustration) → `title` → `description` → `content` (actions) — rather than a flat title+description+single-button. The shim currently only forwards `icon`, `title`, `description`, and one `action`. Expand the forwarding contract to a `content`/`actions` slot that accepts a **primary + secondary action pair** (e.g. "Generate" + "Learn more"), which is the dominant 2025 empty-state CTA pattern. (Source: shadcn/ui `Empty`/`Item` utilities — ui.shadcn.com; Vercel Academy "Compound Components and Advanced Composition".)

2. **Treat the empty state as feature education, not a dead end (Linear pattern).** Linear designs empty states as contextual onboarding that teaches the feature the user just landed on. For the AI variant specifically, the forwarded `description` should be replaced by a short "what this surface does + one example prompt" block, ideally a clickable example chip that pre-fills and dispatches the `ai-empty-action` event. This turns the zero-data moment into first-run activation. (Source: Setproduct "Empty State UI design"; Mobbin empty-state glossary — empty state as new-feature education.)

3. **Add a distinct `loading`/streaming variant — currently marked N/A but wrong for an AI surface.** The audit lists Loading as "not applicable," but AI-native empty states are frequently the *pre-stream* state that transitions into generated content. Add a `variant="generating"` that swaps the static icon for a subtle skeleton-shimmer or pulsing-dot affordance using `--cg-color-ai-*` tokens, so the empty container morphs into the streaming result rather than flashing/unmounting. (Source: shadcn.io AI-native component patterns; Setproduct on empty-states-as-transitions.)

4. **Micro-animation on mount — a gentle entrance, not a hard appear.** 2025 craft-tier empty states (Linear/Vercel aesthetic) fade-and-rise the media+title on first paint (≈150–200ms, `--cg-transition-duration-fast` + ease-out, ~8px translateY). Gate it behind `prefers-reduced-motion`. This is purely additive in `cg-empty-state` and signals polish at the exact moment users decide whether to stay. (Source: Vercel design-language craft notes; Medium "Empty State Design: The Most Overlooked UX Pattern.")

5. **Hover/press affordance on the example/CTA region (interaction density).** The audit correctly delegates button hover to `cg-button`, but if example-prompt chips are added (suggestion 2) they need their own hover/focus-visible states using tier-2 `--cg-color-surface-hover` / `--cg-color-action-primary-*`. Modern empty states reward exploration with responsive micro-feedback on every interactive element, not just the single primary button. (Source: shadcn/ui consistent micro-pattern utilities; Mobbin best-practices.)

6. **Tonal/illustration density tuning per variant.** Vercel's language is restrained — near-white canvas, ink type, accent reserved for hero/multi-color mesh moments. Apply the same restraint to variants: `error` should NOT get celebratory color, while a `success`/`done` variant (currently absent) warrants the one moment of accent. Recommend the forwarded `variant` map explicitly to muted vs. accented `--cg-color-ai-*` tokens so the emotional tone matches the state rather than applying uniform styling. (Source: Vercel design-language aesthetic; Setproduct on tone/clarity balance.)

Sources: [shadcn/ui](https://ui.shadcn.com/) · [Vercel Academy — Compound Components](https://vercel.com/academy/shadcn-ui/compound-components-and-advanced-composition) · [Setproduct — Empty State UI design](https://www.setproduct.com/blog/empty-state-ui-design) · [Mobbin — Empty State](https://mobbin.com/glossary/empty-state) · [Medium — Empty State Design: The Most Overlooked UX Pattern](https://medium.com/@vioscott/%EF%B8%8F-empty-state-design-the-most-overlooked-ux-pattern-in-modern-frontend-5b2406255a14) · [shadcn.io — AI-Native Component Library](https://www.shadcn.io/)
