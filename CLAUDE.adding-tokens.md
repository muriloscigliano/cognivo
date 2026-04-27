# CLAUDE.adding-tokens.md — How to add tokens

> 5-step recipe for adding tier-2 (semantic) or tier-3 (component) tokens. Tier-1 primitives are added rarely and require a system-level decision; not covered here.

---

## TL;DR

1. **Decide tier** (3 → 2). See decision tree below.
2. **Edit JSON** under `packages/tokens/`.
3. **Build**: `pnpm --filter @cognivo/tokens build`.
4. **Verify**: `grep "your-token-name" packages/tokens/dist/index.css`.
5. **Reference** in component CSS as `var(--cg-your-token-name)`.

---

## Decision tree: which tier?

```
Is this value specific to ONE component (radius/height/padding/gap of cg-foo)?
├─ Yes → Tier 3: --cg-component-foo-{prop}
│        File: packages/tokens/tier3-component/components.json
│
└─ No → Is this a COLOR with semantic meaning (action, surface, status, etc.)?
        ├─ Yes → Tier 2: --cg-color-{purpose}-{state}
        │        Files: packages/tokens/tier2-semantic/cognivo-{dark,light}.json
        │        (must add to BOTH theme files)
        │
        └─ No → Is it a generic primitive (spacing, font, etc.) that doesn't exist?
                Almost never. Talk to the design system owner before adding.
                File: packages/tokens/tier1-core/core.json
```

---

## Tier 3 (component) — recipe

**Goal**: add `--cg-component-foo-radius` (and any sibling tokens for the component).

### Step 1 — Edit `tier3-component/components.json`

```json
{
  "component": {
    "foo": {
      "radius": { "$type": "dimension", "$value": "{border.radius.150}" },
      "padding": {
        "sm": { "$type": "dimension", "$value": "{spacing.8}" },
        "md": { "$type": "dimension", "$value": "{spacing.12}" },
        "lg": { "$type": "dimension", "$value": "{spacing.16}" }
      }
    }
  }
}
```

**Naming**:
- Path keys are dot-separated; output token name is hyphen-joined: `component.foo.radius` → `--cg-component-foo-radius`.
- Sub-paths for variants: `component.foo.padding.md` → `--cg-component-foo-padding-md`.
- Reference other tokens with curly-brace path: `{border.radius.150}` resolves at build time.

### Step 2 — Build

```bash
pnpm --filter @cognivo/tokens build
```

The build runs Style Dictionary v4, regenerates `packages/tokens/dist/index.css`, and runs the WCAG contrast validator. If contrast fails, fix the token before merging.

### Step 3 — Verify

```bash
grep "component-foo-radius" packages/tokens/dist/index.css
# Should print:
#   --cg-component-foo-radius: var(--cg-border-radius-150);
```

If empty: the path/name is wrong. Check the JSON for typos, rebuild.

### Step 4 — Use in component

```ts
static override styles = css`
  :host { border-radius: var(--cg-component-foo-radius); }
`;
```

---

## Tier 2 (semantic) — recipe

**Goal**: add a new semantic color, e.g., `--cg-color-foo-text` and `--cg-color-foo-background`.

### Step 1 — Edit BOTH theme files

`packages/tokens/tier2-semantic/cognivo-dark.json`:

```json
{
  "color": {
    "foo": {
      "text": { "$type": "color", "$value": "{gray.100}" },
      "background": { "$type": "color", "$value": "{gray.900}" }
    }
  }
}
```

`packages/tokens/tier2-semantic/cognivo-light.json` (same shape, light values):

```json
{
  "color": {
    "foo": {
      "text": { "$type": "color", "$value": "{gray.900}" },
      "background": { "$type": "color", "$value": "{gray.100}" }
    }
  }
}
```

**Both files must have the same shape**. Missing one will cause the wrong theme to fall back to the default value or be undefined.

### Step 2 — Add a `$description` if the purpose isn't obvious from the name

```json
"foo": {
  "$description": "Soft accent for callouts. NOT for status — use status-* for success/warning/error.",
  ...
}
```

Especially important for decorative or potentially-confusable token sets. Future engineers will read this.

### Step 3 — Build + verify

Same as Tier 3:

```bash
pnpm --filter @cognivo/tokens build
grep "color-foo-text" packages/tokens/dist/index.css
```

You should see two lines (one for each theme):

```
--cg-color-foo-text: var(--cg-gray-900);   ← light
--cg-color-foo-text: var(--cg-gray-100);   ← dark
```

### Step 4 — WCAG check

The build script validates contrast for known fg/bg pairs. If your new token shows up in a `(failed)` line, the dark + light values aren't both passing AA. Adjust until both pass.

---

## Naming conventions

| Tier | Pattern | Example |
|------|---------|---------|
| 3 | `--cg-component-{name}-{prop}` | `--cg-component-button-radius` |
| 3 with variants | `--cg-component-{name}-{prop}-{size-or-variant}` | `--cg-component-button-padding-md` |
| 2 colors | `--cg-color-{purpose}-{state}` | `--cg-color-action-primary-background-default` |
| 2 colors with variant | `--cg-color-{purpose}-{property}-{state}` | `--cg-color-action-primary-text-default` |
| 1 spacing | `--cg-spacing-{n}` (multiples of 2 or 4 only) | `--cg-spacing-12` |

**Don't invent intermediate values.** Spacing scale is `0,1,2,4,6,8,12,16,20,24,32,40,48,…`. There is no `10`. There is no `14`. If you need one, talk to the design system owner — they exist for a reason.

---

## Updating an existing token

When a designer asks to retune a token (e.g., make `--cg-color-action-primary-background-default` slightly darker):

1. Change only the leaf value in `cognivo-dark.json` and/or `cognivo-light.json`.
2. Build + verify.
3. **Diff `dist/index.css` against main** — confirm only the leaf changed; if many derived tokens changed, that's expected (any `*-background-default` references will inherit). Note any cascading changes in the PR description.
4. Run the components test suite if any visual regressions are likely.

---

## Adding a NEW kind of token (decorative, animation curve, etc.)

If you're inventing a new category (e.g., "tag palette colors"):

1. **Justify**: is this needed system-wide, or only in one component? If only one, use Tier 3.
2. **Consider naming** carefully. The category name will appear in 100+ usages. Avoid clever names.
3. **Add `$description`** explaining what the category is for AND what it's NOT for.
4. **Add to BOTH themes**, even if the values are the same — keeps the schema symmetric.
5. **Document** in this file or `CLAUDE.token-guardrails.md` if it's a system-wide pattern.

Example of a good `$description`: see the `tag-palette` proposal in `CLAUDE.semantic-rules.md` (the description explicitly says "NOT semantic — purely visual variety for chips/labels", so future engineers don't misuse them as status colors).

---

## Common mistakes

- **Adding to dark only**: light theme breaks. Check both files.
- **Hyphens in token paths**: JSON paths use dots, not hyphens. Use `"action-primary"` as a single key only if the JSON structure already nests it that way (look at neighbors).
- **Reference paths missing braces**: `"$value": "gray.500"` → renders the literal string `gray.500`. Must be `"{gray.500}"`.
- **Building tokens without rebuilding components**: components consume the generated CSS at build time. After adding tokens, also rebuild components if they were already built: `pnpm --filter @cognivo/components build`.
- **Forgetting the WCAG validator**: the build emits a contrast report at the end. Read it. Failed pairs block the build.
