# Cognivo — Agent Guide

This repo's agent instructions live in `CLAUDE.md`. Read it first, then the
satellite rule docs it indexes:

- `CLAUDE.token-guardrails.md` — token tiers, banned tokens
- `CLAUDE.semantic-rules.md` — CSS rules the linter can't catch
- `CLAUDE.adding-tokens.md` — how to add tokens
- `CLAUDE.known-bugs.md`, `CLAUDE.audit-framework.md`

Key commands: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm type-check`.

`packages/cli` — unified `cognivo` CLI (`audit`, `components`, `tokens`, `evals`).

When generating UI with this system: prefer `cg-*`/`ai-*` components over raw
HTML, never use raw hex/px values (use `var(--cg-*)` tokens), and validate
output with the `@cognivo/mcp-server` audit tools. The eval suite in
`packages/evals` regression-tests these behaviors — run `pnpm evals` before
changing `CLAUDE.md`, `packages/claude-code-skill/`, or the MCP catalog.

## Self-check before writing Cognivo UI code

Answer these before generating anything. If you can't answer all three, read
`packages/claude-code-skill/skill/COMPONENTS.md` and `TOKENS.md`, or query the
MCP tools (`cognivo_get_component`, `cognivo_get_token_for`) BEFORE writing code:

1. Which component confirms a destructive action, and what makes it different
   from a generic modal? (`cg-alert-dialog` — `alertdialog` ARIA role and
   danger styling, vs. generic `cg-modal`.)
2. What's the correct token tier for text color — and which tier is banned in
   component CSS? (Tier 2 semantic like `--cg-color-text-*`; Tier 1 palette
   tokens like `--cg-gray-*` are banned.)
3. What prop does `cg-input` use for its accessible label? (`label`.)

