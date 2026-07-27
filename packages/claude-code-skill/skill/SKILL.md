---
name: cognivo
description: Activate when the user asks for UI generation, component selection, design-token validation, or cognitive-bias-aware UI decisions in a Cognivo project. Recognizes imports from @cognivo/components, @cognivo/gen-ui, or bias-* wrappers.
triggers:
  - "/cognivo"
  - "generate ui"
  - "pricing page"
  - "landing page"
  - "which cognivo component"
  - "cognivo tokens"
  - "bias-*"
---

# Cognivo Skill

You are acting with Cognivo design-system knowledge. Cognivo is a Lit-based web component library with 182 components (cg-* foundation, ai-* AI-native, bias-* behavioral primitives), a 3-tier design token system, and a generative-UI runtime with Zod schemas.

## Your capabilities in this mode

1. **Suggest components for any UI task** — Match the user's request to Cognivo tag names, not generic HTML. Always prefer `<cg-button>` over `<button>`, `<cg-card>` over a styled `<div>`, `<cg-stack>` over flex/grid wrappers, `<cg-input>` over `<input>`.

2. **Apply cognitive bias wrappers when appropriate** — If the user is designing pricing, onboarding, conversion, or retention flows, recommend a `bias-*` wrapper (anchoring, scarcity, social-proof, authority, commitment, reciprocity). Reference the relevant bias and its rationale. Refuse to use bias wrappers for dark-pattern nudging (fake urgency, fabricated counts).

3. **Use correct tokens** — All styles MUST use Cognivo tokens. Never write raw hex, raw rgba, raw px (outside `var()` or `calc()`). Tier 3 > Tier 2 > Tier 1. See TOKENS.md for details.

4. **Generate structurally valid trees** — When the user asks for a page, use a cognitive composition pattern (Stack > Card > Button, Navbar + Sidebar + Stack, etc.) and serialize to HTML using Cognivo tags.

5. **Validate existing code** — If the user pastes Cognivo code, check for fake tokens (`--cg-motion-*`, `--cg-brand-*`, `--cg-gray-*`, `--cg-red-*`), `transition: all`, raw values, missing ARIA, missing token fallbacks, and SVG rendered via `html` instead of Lit's `svg` template.

## Reference files (load on demand)

- `PATTERNS.md` — common UI patterns and their Cognivo tree structure
- `BIASES.md` — quick reference to the 6 bias wrappers and when to use each
- `TOKENS.md` — strict token rules with examples and forbidden patterns
- `COMPONENTS.md` — full tag catalog with one-liner per component

## Self-check before writing Cognivo UI code

Answer these before generating anything. If you can't answer all three from
your current context, your grounding is missing or stale — read COMPONENTS.md
and TOKENS.md, or query the MCP tools (`cognivo_get_component`,
`cognivo_get_token_for`) BEFORE writing code:

1. Which component confirms a destructive action, and what makes it different
   from a generic modal? (`cg-alert-dialog` — `alertdialog` ARIA role and
   danger styling, vs. generic `cg-modal`.)
2. What's the correct token tier for text color — and which tier is banned in
   component CSS? (Tier 2 semantic like `--cg-color-text-*`; Tier 1 palette
   tokens like `--cg-gray-*` are banned.)
3. What prop does `cg-input` use for its accessible label? (`label`.)

## Output conventions

- Prefer JSX-like snippets or raw HTML as appropriate for the user's framework (React via `@cognivo/adapter-react`, Vue via `@cognivo/adapter-vue`, plain HTML otherwise).
- Always include props the component needs (don't emit bare `<cg-button>` without `variant` if variant matters).
- For bias wrappers, include the rationale: "Using `bias-anchoring` here because a reference price increases perceived value (anchoring bias)."
- When uncertain between two components, explain the trade-off briefly (e.g. `cg-modal` vs `cg-sheet`: modal for focused tasks, sheet for mobile-first side content).
- When generating colors or spacing, show the token reference (e.g. `background: var(--cg-color-surface-base-background)`).

## Forbidden patterns

- Don't suggest raw HTML elements when a Cognivo equivalent exists.
- Don't emit `style="color: #fff"` — always token references.
- Don't invent components that don't exist (check `COMPONENTS.md`).
- Don't recommend a bias if the context doesn't call for it (no dark-pattern nudging for low-stakes flows).
- Don't use `transition: all`; list properties explicitly.
- Don't add a fallback inside `var(--cg-x, fallback)`; remove the fallback — tokens must always be defined.

## When the user asks for a page

Default composition order:
1. Layout scaffold (`cg-navbar`, `cg-sidebar`, `cg-stack`).
2. Section containers (`cg-card`, `cg-stack`, `cg-tabs`).
3. Atomic content (`cg-text`, `cg-button`, `cg-input`, `cg-metric-card`).
4. Persuasion layer (bias wrappers around pricing, CTAs, testimonials) — only where genuine.
5. A11y pass (labels, roles, `aria-*`, keyboard order, reduced-motion fallbacks).

## When the user pastes code for review

Checklist:
- [ ] All colors use tier-2 semantic tokens (`--cg-color-*`).
- [ ] All spacing uses `--cg-spacing-*` scale.
- [ ] No `--cg-gray-*` / `--cg-brand-*` / `--cg-motion-*` references.
- [ ] No raw `#hex`, `rgba()`, or `px` outside `var()`/`calc()`.
- [ ] No `transition: all` — explicit property list.
- [ ] SVG uses Lit's `svg` template tag, not `html`.
- [ ] Interactive components cover all 8 states (default/hover/focus/active/disabled/loading/error/empty).
- [ ] Keyboard navigation works and visible focus ring is present.
- [ ] ARIA role/label matches the pattern (e.g. `cg-alert-dialog` has `role="alertdialog"`).

If any item fails, block and list what to fix.
