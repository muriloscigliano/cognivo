## ai-accessibility-report — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 40 | animation duration/easing | `--cg-transition-duration-default` / `--cg-transition-easing-ease-out` | Yes | None |
| 42 | display:none (`[hidden]`) | none | Yes | None |
| 47 | gap | `--cg-spacing-16` | Yes | None |
| 48 | padding-bottom | `--cg-spacing-12` | Yes | None |
| 49 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | None |
| 50 | margin-bottom | `--cg-spacing-16` | Yes | None |
| 55-56 | width/height | `--cg-spacing-64` | Yes (acceptable; no tier-3 meter token used, but spacing-64 ≈ 64px is reasonable) | None |
| 57 | flex-shrink:0 | literal 0 | Yes | None |
| 61-62 | svg width/height | `--cg-spacing-64` | Yes | None |
| 63 | transform rotate(-90deg) | literal | Yes (geometry, not a design value) | None |
| 67-69 | score-bg fill/stroke/stroke-width | none / `--cg-color-surface-cards-border` / `5` | Borderline | `stroke-width: 5` is a raw SVG geometry value (unitless, paired with viewBox 0 0 64 64); acceptable as SVG drawing geometry, not a CSS box dimension. No design token exists for stroke width. Acceptable. |
| 72-76 | score-fg fill/stroke-width/linecap/transition | none / `5` / round / `--cg-transition-duration-slow` `--cg-transition-easing-default` | Yes (stroke-width geometry as above) | None |
| 79-86 | score-text position/inset/font | `--cg-font-size-lg` / `--cg-font-weight-bold` | Yes | None |
| 91-92 | flex:1 / min-width:0 | literal | Yes | None |
| 95-98 | title font-size/weight/margin/color | `--cg-font-size-sm` / `--cg-font-weight-semibold` / `--cg-spacing-4` / `--cg-color-surface-base-text` | Yes | None |
| 102-104 | pass-count font-size/color | `--cg-font-size-xs` / `--cg-color-surface-container-outlined` | Borderline a11y | `--cg-font-size-xs` is below 14px body min. This is secondary metadata ("X of Y checks passed"), a documented acceptable use of xs for caption/meta text. Acceptable but note below. |
| 104 | margin-bottom | `--cg-spacing-6` | Yes | None |
| 110-112 | breakdown gap/font-size/color | `--cg-spacing-12` / `--cg-font-size-xs` / `--cg-color-surface-container-outlined` | Borderline (xs = metadata badges) | Acceptable — secondary count labels |
| 118 | breakdown-item gap | `--cg-spacing-4` | Yes | None |
| 123-124 | sev-dot width/height/radius | `--cg-spacing-8` / `--cg-border-radius-full` | Yes | None |
| 127-129 | sev-dot backgrounds | `--cg-color-status-error/warning/info-text-default` | Yes (semantic status tier-2) | None |
| 134 | issue-list gap | `--cg-spacing-6` | Yes | None |
| 138-141 | issue-item radius/border/transition | `--cg-border-radius-100` / `--cg-border-width-50` `--cg-color-surface-cards-border` / `--cg-transition-duration-fast` `--cg-transition-easing-default` (explicit `border-color`) | Yes | None |
| 144 | hover border-color | `--cg-color-surface-cards-hover-border` | Yes | None |
| 150-151 | issue-header gap/padding | `--cg-spacing-8` / `--cg-spacing-8` `--cg-spacing-12` | Yes | None |
| 153-158 | background transparent / border none / width 100% / font | `--cg-font-size-sm` | Yes | None |
| 160-162 | transition (explicit background-color, transform) | `--cg-transition-duration-fast` `--cg-transition-easing-default` | Yes (no `transition: all`) | None |
| 165 | hover background | `--cg-color-surface-cards-hover-background` | Yes | None |
| 167 | active transform scale | `--cg-interaction-press-scale` | Yes (interaction token) | None |
| 170 | focus box-shadow | `--cg-border-width-100` `--cg-color-focus-ring` | Yes | None |
| 178-180 | sev-icon colors | `--cg-color-status-error/warning/info-text-default` | Yes | None |
| 184-185 | issue-rule font-weight/color | `--cg-font-weight-medium` / `--cg-color-surface-base-text` | Yes | None |
| 192-193 | chevron color/transition | `--cg-color-surface-container-outlined` / `--cg-transition-duration-fast` `--cg-transition-easing-default` (explicit transform) | Yes | None |
| 201-204 | level-badge padding/radius/font | `--cg-spacing-2` `--cg-spacing-6` / `--cg-border-radius-50` / `--cg-font-size-xs` `--cg-font-weight-bold` | Yes (xs acceptable for badge) | None |
| 208-209 | level-A bg/text | `--cg-color-status-info-background-default` / `--cg-color-status-info-text-default` | Yes | None |
| 212-213 | level-AA bg/text | `--cg-color-status-warning-background-default` / `--cg-color-status-warning-text-default` | Yes | None |
| 216-217 | level-AAA bg/text | `--cg-overlay-accent-subtle` / `--cg-color-accent-text` | Yes (both in vocab) | None |
| 221-223 | issue-details padding/border-top/font | `--cg-spacing-8/12/12/32` / `--cg-border-width-50` `--cg-color-surface-cards-border` / `--cg-font-size-xs` | Borderline (xs body) | Detail description body text at xs (<14px) — see note below |
| 226 | gap | `--cg-spacing-8` | Yes | None |
| 230-231 | issue-desc color/line-height | `--cg-color-surface-container-outlined` / `--cg-line-height-normal` | Yes | None |
| 237-243 | issue-element padding/bg/radius/font | `--cg-spacing-2` `--cg-spacing-8` / `--cg-color-action-tertiary-background-hover` / `--cg-border-radius-50` / `--cg-font-family-mono` `--cg-font-size-xs` / `--cg-color-surface-base-text` | Yes (code snippet, mono xs acceptable) | None |
| 249-255 | issue-fix gap/padding/bg/border/radius/color/line-height | `--cg-spacing-6` / `--cg-spacing-6` `--cg-spacing-8` / `--cg-overlay-accent-subtle` / `--cg-border-width-50` `--cg-overlay-accent-strong` / `--cg-border-radius-50` / `--cg-color-surface-base-text` / `--cg-line-height-normal` | Yes | None |
| 258-259 | issue-fix-label weight/color | `--cg-font-weight-semibold` / `--cg-color-accent-text` | Yes | None |
| 265-267 | empty padding/color/font | `--cg-spacing-24` / `--cg-color-surface-container-outlined` / `--cg-font-size-sm` | Yes | None |
| 271 | gap | `--cg-spacing-8` | Yes | None |
| 274 | empty cg-icon color | `--cg-color-status-success-text-default` | Yes | None |
| 291-294 (TS) | `_getScoreColor()` return values | `--cg-color-status-success/warning/error-text-default` | Yes (semantic, returned as `var(...)` strings) | Minor logic note: bands `>=70` and `>=50` both return warning — redundant but not a token violation |

**Verdict:** No token-vocabulary violations. Every CSS value resolves to a real tier-1/2/3 token. No comma-fallbacks, no raw hex/rgba, no banned tier-1 palette colors (`--cg-gray/red/blue/green/brand-*`), no made-up token names, no `transition: all` (all transitions enumerate explicit properties). The AI-state color family does not apply here — this component reports WCAG status, not an AI lifecycle state, so `--cg-color-status-*` is the correct semantic family rather than `--cg-color-ai-*`.

### 2. Styling Audit
- **Border radius:** Appropriate. Issue items use `--cg-border-radius-100`, badges/elements/fix use `--cg-border-radius-50`, dots use `--cg-border-radius-full`. Hierarchy is sensible (smaller chips inside larger containers).
- **Spacing generosity:** Good. Header uses 16/12 gaps, issue rows 8/12 padding, empty state 24. Breathing room is consistent with the spacing scale.
- **Font-size accessibility:** Primary text (title, header button rows, empty state) uses `--cg-font-size-sm` (14px) — meets the body minimum. Secondary content uses `--cg-font-size-xs` (<14px): pass-count metadata (102), breakdown counts (111), level badges (203), and — more notably — the expanded **issue-details / issue-desc body text** (223). The description is genuine readable body content, so xs is borderline; bumping issue-details to `--cg-font-size-sm` would be the stricter, more accessible choice. Not a hard violation but worth flagging given this is an accessibility-reporting component.
- **Translucent vs solid borders:** Borders use solid `--cg-color-surface-cards-border` / hover variant and `--cg-overlay-accent-strong` on the fix callout — all token-driven, appropriate.
- **Transitions explicit vs all:** All transitions enumerate properties (border-color, background-color, transform, stroke-dashoffset). Motion tokens used throughout. `reducedMotion` style module is imported and applied. Excellent.
- **Dark-theme background suitability:** Uses surface/card semantic tokens and overlay-accent for callouts; no hardcoded light backgrounds. Dark-first compliant.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | issue-item border, header row | None |
| Hover | Yes | `.issue-item:hover` border-color (144), `.issue-header:hover` background (165) | None |
| Active/Press | Yes | `.issue-header:active { transform: scale(--cg-interaction-press-scale) }` (167) | None |
| Focus-visible | Yes | `.issue-header:focus-visible` inset box-shadow ring with `--cg-color-focus-ring` (168-171); `outline:none` is compensated by visible ring | None |
| Disabled | N/A | No disabled affordance — issue rows are always actionable toggles; nothing to disable | Justified N/A |
| Loading | N/A | Component renders provided `issues`; data fetching/streaming is the parent's concern | Justified N/A |
| Error | N/A | This is a report of a11y errors, not a component error state; severity=error issues are content, not a component error UI | Justified N/A |
| Success | Yes | Empty state (`.empty`, role=status) with success icon + "No accessibility issues found." (360-364, 274) | None — serves as the success/clean state |

### 4. Interaction Audit
- **Keyboard:** Each issue toggle is a native `<button>` (369), so Enter/Space activation and Tab focus order come for free. Focus-visible ring present. No custom key handling needed; nothing missing.
- **ARIA:**
  - Score circle: `role="meter"` with `aria-valuenow/min/max` and a descriptive `aria-label` (331-332). Correct use of meter.
  - SVG marked `aria-hidden="true"` (333) — correct, decorative duplicate of the meter value.
  - Severity icons wrapped in `aria-hidden="true"` spans (318) — correct, severity is conveyed textually in the breakdown and badge.
  - Issue list: `role="list"` + `aria-label`, items `role="listitem"` (366-368). Correct.
  - Toggle button: `aria-expanded` reflects `_expanded` set (371). Correct.
  - Empty state: `role="status"` (361) for polite announcement. Correct.
  - Minor enhancement (not a defect): the toggle button has no `aria-controls` pointing at the details panel, and the details panel has no `id`/`region` association. Functional without it, but `aria-controls` would strengthen the disclosure semantics.
- **CustomEvents:** `ai-a11y-issue-click` fired on toggle with `{ issue, index }` detail, `bubbles: true, composed: true` (305-308) — escapes shadow DOM correctly, detail matches the documented `@fires` signature (17). Correct.
- **Touch targets:** Issue header button padding is `--cg-spacing-8` (8px) top/bottom + sm font line-height ≈ ~32-34px effective height, which is **below the 44px minimum** for touch targets. The full-width button helps horizontally, but vertical height likely falls short. This is the one real accessibility concern — ironic in an accessibility-report component. Recommend a `min-height` of a 44px-equivalent token or increased vertical padding.

### 5. Visual Design Check
Modern and sleek — Lighthouse/axe-DevTools-inspired layout with a circular score meter, color-coded severity dots/badges, and clean expandable rows. Radius hierarchy is appropriate, breathing room is generous, the header divider (border-bottom) and per-issue top-border on details provide clear separation. Typography hierarchy reads well (lg bold score, semibold sm title, medium rule, xs metadata). The accent-tinted "Fix" callout is a nice touch. It would pass a HeroUI/Vercel-style showcase. Verdict: **strong**.

### 6. Fixes Needed

The component has **no token-vocabulary violations** — every value is a real, correctly-tiered token with no fallbacks, raw hex, banned palette colors, or `transition: all`. There is one genuine accessibility defect plus one borderline readability item worth addressing:

1. **Line 167 / issue-header touch target — `.issue-header` lacks a minimum height.**
   - Current: `padding: var(--cg-spacing-8) var(--cg-spacing-12);` (with no min-height) yields an effective tap height well under 44px.
   - Fixed: add `min-height: var(--cg-spacing-40);` (40px, the closest spacing token; combined with the existing 8px vertical padding the row clears the 44px target) to the `.issue-header` rule.
   - Why: WCAG 2.5.5 / 2.5.8 target-size guidance recommends ≥44px touch targets. An accessibility-audit component must itself meet this bar.

2. **Line 223 / issue-details body text size (borderline, recommended).**
   - Current: `.issue-details { ... font-size: var(--cg-font-size-xs); ... }`
   - Fixed: `font-size: var(--cg-font-size-sm);`
   - Why: The expanded `.issue-desc` is genuine readable body content (issue descriptions and fix guidance), and xs (<14px) sits below the 14px body minimum. Bumping to sm keeps the primary explanatory text at the accessible floor. (Counts/badges may remain xs as metadata.)

### Research-backed enhancements

- **Severity-grouped, expandable issue rows with deep-link affordance.** Mirror the Vercel Accessibility Audit Tool: each row collapses to a one-line summary (rule + element + impact) and expands to reveal the WCAG 2.2 success-criterion link, a code snippet of the offending node, and a "how to fix" block. Group rows under collapsible severity sections (Critical / Serious / Moderate / Minor) with sticky section headers, so a 200-issue report stays scannable instead of an undifferentiated list. ([Vercel Accessibility Audit Tool](https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool))

- **Animated radial/ring score with a count-up transition.** Lead with a single WCAG conformance score (0–100 or A/AA/AAA badge) rendered as an SVG ring that animates from 0 to its value on mount and re-tweens when the report re-streams. Use a tokenized status color ramp (`--cg-color-status-*`) so the ring shifts hue with the grade — Linear/Vercel-style "one number that matters" framing over a wall of raw counts. ([20 Dashboard UI/UX Principles 2025](https://medium.com/@allclonescript/20-best-dashboard-ui-ux-design-principles-you-need-in-2025-30b661f2f795))

- **"Automated vs. needs-human-review" split, made explicit.** Since automated tooling catches only ~30% of real barriers, surface a distinct segment (chip or divided meter) for "needs manual review" items rather than burying them. A subtle striped/dashed fill on that segment signals "not auto-verifiable" — sets honest expectations and is a genuine differentiator for an AI-native report. ([TestParty Audit Reports Guide 2025](https://testparty.ai/blog/accessibility-audit-reports-complete-guide-for-2025))

- **Streaming skeleton + progressive issue insertion.** As an AI-native component, issues should stream in: render shimmer skeleton rows first, then insert each finding with a short fade/slide-up (staggered, ~40ms apart, respecting `prefers-reduced-motion`). The score ring should update live as findings accumulate. This makes the long-running audit feel responsive instead of a blank-then-dump.

- **Inline filter/density toolbar.** Add a shadcn/Linear-style header toolbar: severity filter pills, a free-text rule filter, and a compact/comfortable density toggle. Pair with a per-rule count badge so users can jump straight to "12 contrast failures." Keeps high-issue-count reports navigable. ([Web Accessibility Evaluation Tools — W3C WAI](https://www.w3.org/WAI/test-evaluate/tools/list/))

- **Eat-your-own-dogfood states + copy/export actions.** The report itself must model accessibility: visible focus rings on every expandable row, full keyboard nav (arrow-to-row, Enter-to-expand), `aria-live="polite"` announcing streamed counts, and an explicit empty/passing state ("No violations found" with a celebratory but calm treatment). Add per-issue "copy selector" and a top-level "export report" affordance for handoff. ([Orbix — Accessibility Best Practices 2025](https://www.orbix.studio/blogs/accessibility-uiux-design-best-practices-2025))

### Playground proposal

Current playground example is adequate but thin. Suggest a richer default that exercises multiple severities, WCAG levels, the optional element + fix fields, and the totalChecks/pass-count display:

<ai-accessibility-report
  score="72"
  title="Page Audit — /checkout"
  total-checks="48"
  .issues=${[
    { rule: 'color-contrast', level: 'AA', severity: 'error',
      element: 'button.cta', description: 'Text contrast ratio is 3.1:1 against the background.',
      fix: 'Increase contrast to at least 4.5:1 for normal text.' },
    { rule: 'image-alt', level: 'A', severity: 'error',
      element: 'img.hero', description: 'Image is missing an alt attribute.',
      fix: 'Add descriptive alt text, or alt="" if decorative.' },
    { rule: 'landmark-unique', level: 'AA', severity: 'warning',
      description: 'Two <nav> landmarks lack distinguishing labels.',
      fix: 'Add aria-label to each navigation region.' },
    { rule: 'heading-order', level: 'AAA', severity: 'info',
      description: 'Heading levels skip from h2 to h4.' }
  ]}
></ai-accessibility-report>

Also worth showcasing the clean/success state in a second example (empty .issues=${[]} with score="100") so the empty-state success UI is visible in the showcase. This is a playground suggestion only — do not edit the registry.

---
*cleanliness: minor | fixes proposed: 2*
