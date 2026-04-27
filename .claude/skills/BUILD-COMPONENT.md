# BUILD-COMPONENT.md — Build New Component Mode

## ROLE

You are a **Component Architect** for the Cognivo design system. When the user asks to build a new `cg-*` component, you scaffold it from a spec — not from code. The spec is the contract; the code follows.

Spec-driven flow:
1. Write or read `cg-{name}.spec.md` (the contract).
2. Add tier-3 tokens declared in the spec.
3. Scaffold the component file from the template + spec.
4. Add a starter test file.
5. Add a registry entry for the playground.

---

## WHEN THIS SKILL ACTIVATES

Trigger when the user says:
- "Build a new `cg-X` component" / "Scaffold `cg-X`"
- "Create a `cg-X`"
- "Add a `cg-X` to the design system"

Do **NOT** activate for:
- "Add a variant to existing `cg-X`" → use a regular Edit flow + read `CLAUDE.semantic-rules.md`.
- "Audit `cg-X`" → use `COMPONENT-AUDIT.md` skill.

---

## PRE-FLIGHT (mandatory before scaffolding)

1. Read [`templates/component.spec.md`](../../templates/component.spec.md) for the spec format.
2. Read [`templates/component.template.ts`](../../templates/component.template.ts) for the file scaffold conventions.
3. Read [`CLAUDE.semantic-rules.md`](../../CLAUDE.semantic-rules.md) — the rules the linter can't catch.
4. Read [`CLAUDE.adding-tokens.md`](../../CLAUDE.adding-tokens.md) for the token addition recipe.
5. Read 1–2 recent well-built siblings as reference (e.g., `cg-split-button`, `cg-button`).

---

## BUILD PROTOCOL

### Phase 1 — Spec first

If the user hasn't given you a spec, **ask for the missing parts**. The spec template has slots for:

- Purpose (1 sentence)
- API (props / slots / events / methods)
- States matrix (which of the 8 states apply)
- Tier-3 tokens this component owns
- Tier-2 tokens consumed
- A11y (role, keyboard, ARIA)
- Composition (sub-components used)
- Out of scope

If the user says "just build it" without a spec, **infer a minimal spec** from the request and present it for confirmation before writing code. Don't skip the spec.

Write the spec to `packages/components/src/components/cg-{name}/cg-{name}.spec.md`.

### Phase 2 — Tokens

If the spec declares tier-3 tokens, add them to `packages/tokens/tier3-component/components.json` per [`CLAUDE.adding-tokens.md`](../../CLAUDE.adding-tokens.md). Build + verify:

```bash
pnpm --filter @cognivo/tokens build
grep "component-{name}" packages/tokens/dist/index.css
```

If the spec declares new tier-2 tokens, edit BOTH `cognivo-dark.json` and `cognivo-light.json`.

### Phase 3 — Component file

Copy `templates/component.template.ts` to `packages/components/src/components/cg-{name}/cg-{name}.ts`.

Replace every occurrence of `cg-name` / `CgName` per the spec. Implement only what the spec declares — no scope creep, no "while I'm here" features.

Apply the rules from `CLAUDE.semantic-rules.md` as you write CSS:
- No `*-background-*` as `color` or `border-color`.
- No `--cg-color-input-*` on non-input components.
- Status fills use `*-text-default`, not `*-background-default`.
- Press-scale uses `var(--cg-interaction-press-scale)`.
- Focus ring family per element type (input vs grid-cell).

### Phase 4 — Test scaffold

Create `packages/components/src/__tests__/cg-{name}.test.ts` with the standard shape (see existing tests):

```ts
import { describe, it, expect, afterEach } from 'vitest';
import { CgName } from '../components/cg-{name}/cg-{name}.js';

if (!customElements.get('cg-{name}')) {
  customElements.define('cg-{name}', CgName);
}

describe('cg-{name}', () => {
  let el: CgName;

  async function create(props?: Partial<CgName>): Promise<CgName> {
    el = document.createElement('cg-{name}') as CgName;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  // ... one test per state declared in the spec's states matrix.
});
```

Write at least:
- One render test.
- One reflect test for each reflected attribute (`size`, `variant`, `disabled`, etc.).
- One event test for each declared event.
- One a11y test if the spec declares ARIA attributes.

### Phase 5 — Registry entry

Add a registry entry to `docs/src/data/registry.ts`:

```ts
{ tag: 'cg-{name}', name: '{Name}', category: '{category-from-spec}', description: '{purpose-from-spec}', props: [...], events: [...], examples: [...], since: 'v0.X.0' }
```

For each declared property, the type string MUST be in the format the playground parser expects:
- Boolean: `'boolean'`
- Number: `'number'`
- Type union: `'"sm" | "md" | "lg"'` (literal quoted strings, pipe-separated)
- Default: `'"md"'` (quoted)

The playground at `docs/src/scripts/playground.ts` auto-builds a `<select>` for type unions, a `<cg-switch>` for booleans, and an `<input type="number">` for numbers.

Provide at least 3 examples in the `examples` array — one default, one showing a key variant, one showing a tricky state.

### Phase 6 — Verify

```bash
pnpm --filter @cognivo/components test -- {name}      # tests pass
pnpm --filter @cognivo/components build                # bundle compiles
pnpm lint                                              # eslint plugin clean
```

If any fail, fix before declaring done.

### Phase 7 — Run the audit on yourself

After the component is built, **run the audit framework against your own work** using `CLAUDE.audit-framework.md`. Catch anything you missed before the user does.

---

## OUTPUT FORMAT

For each phase, give one line of progress. End with:

```
## Built cg-{name}

Files created:
- packages/components/src/components/cg-{name}/cg-{name}.ts
- packages/components/src/components/cg-{name}/cg-{name}.spec.md
- packages/components/src/__tests__/cg-{name}.test.ts

Files modified:
- packages/tokens/tier3-component/components.json (added {N} tokens)
- docs/src/data/registry.ts (registry entry)

Verification:
- {N}/{M} tests pass
- lint: clean
- build: ok

Open questions in spec:
- {if any}
```

---

## BOUNDARIES

- **Don't ship without a spec.** If the user can't articulate the API, the component isn't ready to be built.
- **Don't add features the spec doesn't list.** Bloat creep is how design systems die.
- **Don't reuse `--cg-color-input-*` on non-input components.** It resolves to the brand accent.
- **Don't reimplement existing primitives** (calendar, listbox, menu, popover) — compose with `<cg-calendar>`, `<cg-listbox>`, etc.

---

## RELATED SKILLS

- `COMPONENT-AUDIT.md` — runs the audit framework on existing components.
- `DESIGN-SYSTEMS.md` — for higher-level design-system architecture.
- `CRITIQUE.md` — for design-level critique of the spec before building.
