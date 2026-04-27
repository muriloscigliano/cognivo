# CLAUDE.audit-framework.md — Component Audit Protocol

> Versioned, copy-paste-ready audit prompt. Use this when reviewing any `cg-*` or `ai-*` component.
>
> Output is a structured 6-section report + applied fixes. The agent skill `.claude/skills/COMPONENT-AUDIT.md` triggers on "audit `cg-*`" / "review `cg-*`" and uses this framework.

---

## Pre-flight: load context

Before auditing a component, the agent must have loaded:
1. [`CLAUDE.token-guardrails.md`](./CLAUDE.token-guardrails.md) — the tier system.
2. [`CLAUDE.semantic-rules.md`](./CLAUDE.semantic-rules.md) — the linter-can't-catch rules.
3. [`CLAUDE.known-bugs.md`](./CLAUDE.known-bugs.md) — known bug patterns.
4. The component's spec if one exists at `packages/components/src/components/{name}/{name}.spec.md`.

---

## The audit prompt (copy-paste, replace `{COMPONENT_NAME}`)

```
Review the component {COMPONENT_NAME} manually, line by line.

Read the FULL source file at:
/Users/muriloscigliano/Cursor/cognivo-1/packages/components/src/components/{COMPONENT_NAME}/{COMPONENT_NAME}.ts

Then produce this EXACT report:

## {COMPONENT_NAME} — Manual Review

### 1. Token Audit (every CSS value)
For EVERY CSS property in the file, check:
- Is it using the correct tier? (Tier 3 → Tier 2 → Tier 1)
- Is there a fallback? (there should NOT be — we removed all fallbacks)
- Is the token name the REAL token from the system, not a made-up name?

Report as a table:
| Line | Property | Current Token | Correct? | Fix Needed |
|------|----------|---------------|----------|------------|

Reference the REAL tokens:
- Tier 3: --cg-component-{name}-{prop}
- Tier 2 colors: --cg-color-{purpose}-{state}
- Tier 1 generic: --cg-spacing-*, --cg-font-size-*, --cg-font-weight-*, --cg-border-width-*, --cg-border-radius-*, --cg-line-height-*, --cg-icon-size-*, --cg-transition-duration-*

Flag any:
- Raw px/hex/rgba values not in var()
- Fallback values (var(--token, fallback))
- Made-up token names that don't exist (verify against packages/tokens/dist/index.css)
- Tier 1 palette colors used directly
- Wrong tier
- Semantic mismatches (see CLAUDE.semantic-rules.md):
  - *-background-* used as color or border-color
  - --cg-color-input-* used on non-input components

### 2. Styling Audit
- Border radius: appropriate for component type? Modern?
- Spacing/padding: generous enough? Consistent with system?
- Font sizes: accessible (≥14px for body)?
- Colors: using translucent borders (rgba) or solid hex?
- Transitions: explicit properties or "all"? Using motion tokens?
- Background: appropriate for dark theme?

### 3. States Audit
| State | Exists? | Implementation | Issues |
|-------|---------|----------------|--------|
| Default | | | |
| Hover | | | |
| Active/Press | | | |
| Focus-visible | | | |
| Disabled | | | |
| Loading | | | |
| Error | | | |
| Success | | | |

For each state: does CSS exist? Is feedback clear? Are tokens correct?

### 4. Interaction Audit
- Keyboard: what keys work? What's missing?
- ARIA: roles, labels, states — what's correct, what's wrong?
  - Live region present for state-change announcements?
  - Focus management on add/remove?
  - Landmark roles named?
- Events: what CustomEvents are fired? Are details correct?
- Touch: min 44px touch targets?

### 5. Visual Design Check
- Does it look modern and sleek?
- Is the border radius appropriate?
- Is there enough breathing room (padding/gap)?
- Are divider lines present where needed?
- Is the typography hierarchy clear?
- Would this look good in a HeroUI/Vercel-style showcase?

### 6. Fixes Needed
Numbered list of EVERY fix, with:
- Line number
- Current code
- Fixed code
- Why

Apply ALL fixes to the file and write it back.
```

---

## Token verification step

For every `var(--cg-...)` reference flagged as suspicious, verify it exists:

```bash
grep -E "^\s*--cg-{full-token-name}:" /Users/muriloscigliano/Cursor/cognivo-1/packages/tokens/dist/index.css
```

If empty → orphan token (will be caught by `@cognivo/no-orphan-tokens` lint rule once added). Replace with a real token.

---

## Common patterns to look for

### Token mismatches (cross-reference `CLAUDE.semantic-rules.md`)
- `color: var(--cg-*-background-*)` → use `--cg-color-accent-text` or `*-text-default`
- `border-color: var(--cg-*-background-*)` → use `*-border-default`
- `--cg-color-input-border-hover` on non-input → `--cg-color-surface-cards-border-strong`
- Status fills using `*-background-default` → switch to `*-text-default`

### Broken tokens
- `--cg-spacing-10` (doesn't exist; use `8` or `12`)
- Made-up tier-3 names — verify in `tier3-component/components.json` first

### Composition violations
- Reimplementing a calendar grid → use `<cg-calendar>`
- Reimplementing menu/listbox → use `<cg-listbox>` or `roving-index` util
- Wrapping a child that already has chrome (border + bg + radius) inside another chromed container → strip parent chrome

### A11y gaps
- `role="region"` without `aria-label` → drop the role
- Live region missing for add/remove flows → add the `.sr-only` pattern (Rule 10 in `CLAUDE.semantic-rules.md`)
- Focus management missing on remove → add `updateComplete.then(...)` focus shift (Rule 11)

### Dead code
- Declared `@state()` / `@property()` never read → delete + remove unused decorator imports
- Unused render expressions like `${condition ? nothing : nothing}` → delete
- Prop values declared but with no CSS path → either implement the path or remove the value from the type union

---

## After applying fixes

1. Run the component's tests: `pnpm --filter @cognivo/components test -- {component-name}`
2. If you changed CSS, rebuild the dist: `pnpm --filter @cognivo/components build`
3. If you added new tokens: rebuild tokens first: `pnpm --filter @cognivo/tokens build`
4. If anything is significant or surprising, append a new entry to [`CLAUDE.known-bugs.md`](./CLAUDE.known-bugs.md).
5. Update the playground registry entry at `docs/src/data/registry.ts` if new props/examples are warranted.

---

## Bundling tip for context efficiency

When reviewing a complex component, **delegate exploration to a subagent** rather than reading every related file in the main context. Reserve the main context for the actual fixes.

Pattern:
- Subagent: "list every file that imports `<cg-X>` and report 1-line usage of each."
- Main: read only the files where the subagent identified meaningful coupling.
