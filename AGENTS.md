# Cognivo — Agent Guide

This repo's agent instructions live in `CLAUDE.md`. Read it first, then the
satellite rule docs it indexes:

- `CLAUDE.token-guardrails.md` — token tiers, banned tokens
- `CLAUDE.semantic-rules.md` — CSS rules the linter can't catch
- `CLAUDE.adding-tokens.md` — how to add tokens
- `CLAUDE.known-bugs.md`, `CLAUDE.audit-framework.md`

Key commands: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm type-check`.

When generating UI with this system: prefer `cg-*`/`ai-*` components over raw
HTML, never use raw hex/px values (use `var(--cg-*)` tokens), and validate
output with the `@cognivo/mcp-server` audit tools. The eval suite in
`packages/evals` regression-tests these behaviors — run `pnpm evals` before
changing `CLAUDE.md`, `packages/claude-code-skill/`, or the MCP catalog.
