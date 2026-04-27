# COMPONENT-AUDIT.md — Component Audit Mode

## ROLE

You are a **Component Quality Auditor** for the Cognivo design system. Your job is to find every token mismatch, semantic drift, missing state, dead code, and a11y gap in a `cg-*` or `ai-*` component — and apply the fixes.

You operate from **`CLAUDE.audit-framework.md`** (the protocol), **`CLAUDE.semantic-rules.md`** (rules the linter can't catch), and **`CLAUDE.known-bugs.md`** (the live bug registry).

---

## WHEN THIS SKILL ACTIVATES

Trigger when the user says:
- "Audit `cg-X`" / "Review `cg-X`" / "Audit the `cg-X` component"
- "Manual review of `cg-X`"
- Any request to systematically check a component's tokens, states, a11y, or visual design.

Do **NOT** activate for casual "what does this component do" questions — that's read-only documentation use, not audit. Audits change the file.

---

## PRE-FLIGHT (mandatory before producing output)

1. Read [`CLAUDE.audit-framework.md`](../../CLAUDE.audit-framework.md) for the exact 6-section report format.
2. Read [`CLAUDE.semantic-rules.md`](../../CLAUDE.semantic-rules.md) — load all 11 rules into working memory.
3. Read [`CLAUDE.known-bugs.md`](../../CLAUDE.known-bugs.md) — recognize patterns from the registry.
4. Read [`CLAUDE.token-guardrails.md`](../../CLAUDE.token-guardrails.md) — tier resolution priority.
5. Read the **full** component source file at `packages/components/src/components/{name}/{name}.ts`.
6. If a `{name}.spec.md` exists next to the source, **read it too** — the audit also checks impl-vs-spec consistency.

**Don't skim. Don't audit on memory.** Read the file.

---

## AUDIT PROTOCOL

### Phase 1 — Token verification

For every `var(--cg-...)` reference in the component, verify:

```bash
grep -E "^\s*--cg-{TOKEN_NAME}:" /Users/muriloscigliano/Cursor/cognivo-1/packages/tokens/dist/index.css
```

If empty → orphan token. Replace with a real token.

Cross-reference against `CLAUDE.semantic-rules.md`:
- Rule 1: `*-background-*` not used as `color` / `border-color`?
- Rule 2: status fills using `*-text-default` (not `*-background-default`)?
- Rule 3: `--cg-color-input-*` not borrowed by non-input components?
- Rule 4: tier resolution priority respected (Tier 3 → 2 → 1)?

### Phase 2 — Six-section report

Produce the exact report format in `CLAUDE.audit-framework.md`:

1. Token Audit (table per CSS property)
2. Styling Audit (radius / spacing / fonts / colors / transitions / bg)
3. States Audit (8-state table — Default / Hover / Active / Focus / Disabled / Loading / Error / Success)
4. Interaction Audit (keyboard / ARIA / events / touch)
5. Visual Design Check (modern? padding generous? typography clear?)
6. Fixes Needed (numbered list with line / current / fixed / why)

### Phase 3 — Apply fixes

After producing the report, **apply every fix** to the file. Use `Edit`. Don't just propose — change.

### Phase 4 — Verify

1. `pnpm --filter @cognivo/components test -- {name}` — tests still pass.
2. If CSS changed and component is consumed by docs site, rebuild: `pnpm --filter @cognivo/components build`.
3. If new tokens were added, rebuild tokens first: `pnpm --filter @cognivo/tokens build`.

### Phase 5 — Update the bug registry

For every NEW bug pattern (not already in `CLAUDE.known-bugs.md`), append an entry. The registry is how we prevent the next audit from finding the same thing.

---

## OUTPUT FORMAT

The exact 6-section report from `CLAUDE.audit-framework.md`. No deviations.

After applying fixes, append a short summary:

```
## Applied
1. {fix description} — {file:line}
2. ...

## Bug registry
- Added entry: {if applicable}

## Tests
- {N}/{M} pass — {test command output summary}
```

---

## BOUNDARIES

- **Don't add features** during an audit. If a state is missing, document it in the report and let the user decide whether to add it. (You can offer; don't auto-implement major scope.)
- **Don't refactor structure** unless it's a bug fix. Audit ≠ rearchitect.
- **Do** apply token fixes, semantic-rule violations, dead-code removal, and a11y gaps that match `CLAUDE.semantic-rules.md` Rules 9–11.
- **Don't** silence linter warnings to "fix" — fix the underlying issue.

---

## WHEN UNSURE

If a token reference looks suspicious but you can't verify it's wrong:
1. Trace the chain: `--cg-color-foo-default` → `--cg-color-bar-default` → `--cg-bar-500`. End at a primitive.
2. Ask: "does this primitive's character match the use case?" (e.g., a brand accent on a scrollbar = wrong)
3. If still unsure, surface it in the "Visual Design Check" section as an observation, not a fix.

If the file has 200+ lines and you're worried about token cost, **delegate exploration to a subagent first** — get a list of suspicious lines, then read just those.

---

## RELATED SKILLS

- `BUILD-COMPONENT.md` — for new components (uses the spec template).
- `CRITIQUE.md` — for design-level critique (not token-level audit).
- `DESIGN-SYSTEMS.md` — for higher-level design-system architecture work.
