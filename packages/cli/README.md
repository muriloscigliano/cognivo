# @cognivo/cli

Unified `cognivo` CLI for the Cognivo design system: audit generated UI,
query the component/token catalog, and run the design-system evals.

**Private / workspace-only** — run from the Cognivo monorepo via
`node packages/cli/dist/cli.js <command>` or link the `cognivo` bin.

## Commands

### `cognivo audit <file|-> [--json]`

Audit HTML against Cognivo rules (raw hex/px, tier-1 tokens, raw HTML where a
`cg-*` component exists, …). Pass `-` to read from stdin.

```bash
cognivo audit output.html
cat output.html | cognivo audit - --json
```

### `cognivo components list [--category <id>] [--dense]`

List catalog components, optionally filtered by category.

```bash
cognivo components list
cognivo components list --category forms
```

### `cognivo components get <tag> [--json] [--dense]`

Full detail for one component: props, slots, events, example.

```bash
cognivo components get cg-alert-dialog
```

### `cognivo tokens find <query> [--dense]`

Substring search over token name/category/subcategory.

```bash
cognivo tokens find surface
```

### `cognivo tokens for <css-property> [--dense]`

Suggest tokens for a CSS property, tier 3 > tier 2 > tier 1.

```bash
cognivo tokens for color
```

### `cognivo evals [run|live|replay] [flags]`

Passthrough to `@cognivo/evals`. **Requires the monorepo checkout** — the
evals package is private and ships with the Cognivo repo, not the npm CLI.
Outside a monorepo the command prints a friendly error and exits 2.

```bash
cognivo evals run --mode mock   # offline gate (CI)
cognivo evals live --record     # live run via LiteLLM proxy (LITELLM_API_KEY)
cognivo evals replay            # re-grade the latest recorded baseline
```

### `cognivo context [--agent claude|cursor|codex|all] [--force] [--path <dir>]`

Generate agent-grounding files into a consumer project, derived from the
installed catalog version: `CLAUDE.md` (claude), `.cursorrules` (cursor),
`AGENTS.md` (codex). Defaults: `--agent all`, `--path` = cwd.

Content: the 3-step CLI workflow, behavioral rules (no raw hex/px, tier-1
tokens banned, run `cognivo audit`), the self-check block, and a dense
`tag description` component index — all stamped with a
`<!-- cognivo-context v<N> -->` marker header. Re-runs regenerate
marker-bearing files in place; a file without the marker is skipped with a
warning unless `--force` (never clobbers hand-written files).

```bash
cognivo context                      # all three files into cwd
cognivo context --agent codex --path ./my-app
```

## `--dense` flag

Available on `components list`, `components get`, `tokens find`, and
`tokens for`: token-efficient one-line-per-entity output (no headers, no
markdown) for pasting into AI agent context windows.

## Exit codes

- `0` — success / audit passed / eval gate GO
- `1` — audit found violations / eval gate NO-GO
- `2` — usage error, no matches, or `evals` outside the monorepo
