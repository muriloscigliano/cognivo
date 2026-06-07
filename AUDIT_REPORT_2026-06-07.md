# Cognivo System Audit — 2026-06-07

Deep multi-agent audit of the system packages (not the marketing/docs landing pages).
Method: 10 parallel cluster auditors → adversarial verification of every finding → synthesis.
65 findings survived verification. The 4 P0 blockers below have been **FIXED** (see "Status").

---

## Verdict

The component *logic* is largely sound. The crisis was in **build, publish, governance
enforcement, and infra** — the project's own quality gates were not enforcing quality.
Headline: the token-governance linter never ran (plugin never built), so violations spread.

---

## P0 — Blockers — ✅ ALL FIXED

| # | Issue | Fix applied |
|---|---|---|
| P0-1 | MCP server crashed on startup (ENOENT reading `dist/catalog/catalog.json`, never produced by build) | Added `copy:catalog` build step copying `src/catalog/catalog.json` → `dist/catalog/`; added `server-smoke.test.ts` startup guard; turbo output noted. |
| P0-2 | Lint fully broken on clean checkout (`@cognivo/eslint-plugin/dist` never built → ESLint crash) | Added `prelint` hook to root `package.json` that builds the plugin before `eslint .`. |
| P0-3 | `lens-core` type-check failed: two competing `FixManifest` interfaces (TS2308) | Renamed the agent's interface to `AgentFixProposal` (kept `types/fix.ts` `FixManifest` canonical); updated all agent-cluster consumers + barrel. |
| P0-4 | Broken types shipped anyway (`pnpm build` exited 0 despite TS2308) | Gated `lens-core` build on `tsc --noEmit` (`"build": "tsc --noEmit && vite build"`). |

Bonus fixed during P0-2 work: 1 hard `no-unreachable` ESLint error in
`lens-core/src/agent/create-agent.ts` (dead `yield` after `throw` in NoOpAgent).

---

## P1 — Real defects — NOT YET FIXED (recommended next)

### Core AI client
- Circuit-breaker half-open limit is dead code — `core/src/resilience/circuit-breaker.ts:24,65` (`halfOpenAttempts` never incremented). `halfOpenMaxAttempts` has zero effect.
- Cache keys omit request options (model, temperature, systemPrompt, maxTokens) — `caching/cached-client.ts:105-111`, `semantic-cached-client.ts:35-37`. Different model/prompt → wrong cached result returned.
- FallbackClient replays stream from scratch after mid-stream failure — `resilience/fallback-client.ts:88-102`. Partial primary chunks + full fallback chunks concatenated → garbled stream.
- GuardedClient applies NO guardrails to `streamIntent` — `guardrails/guarded-client.ts:142-151`. Trivial prompt-injection/PII bypass via the stream path.

### Adapters
- React `CgDateRangePicker` / `CgSidebar` pass empty eventMap → `onCgDateRangeChange`/`onCgSidebarToggle` never fire.
- Vue `CgDateRangePicker` / `CgSidebar` / `CgDateTimePicker` pass empty eventMap → same, `@cg-*` events never forwarded.
- Anthropic `enablePromptCache` is a complete no-op — `adapter-anthropic/src/client.ts:68-73` (cacheManager built, never used). Users pay full input-token cost.
- OpenAI `streamIntent` omits `response_format`/`json_schema` — `adapter-openai/src/client.ts:157-166`. "Guaranteed valid JSON" false on stream path.
- Missing `CgPhoneInput` wrapper in BOTH React + Vue adapters (drift test red).

### Tokens
- `pnpm generate` defaults to wrong palette — `tokens/generate-from-palette.cjs:20` (`eco-dashboard.json`; committed tokens are `stockify-dark.json`). The documented command silently corrupts the design system.
- Manifest silently drops 30 dark-only tokens — `tokens/scripts/manifest-lib.mjs:286` (iterates `:root` only). `--cg-color-focus-ring`, `accent-background/border` etc. absent from manifest.

### Components — undefined tokens that break rendering (user-visible)
- Orphan `--cg-color-status-{error,warning,success,info}-text` (missing `-default`) — ~21 refs / 9 files (e.g. `ai-debug-console.ts:168-170`, `ai-cost-dashboard.ts:119`). Status colors render transparent.
- Orphan `--cg-color-surface-base` (missing `-background`) — 9 refs / 5 files (e.g. `ai-api-key-manager.ts:36`, `ai-webhook-config.ts:39,102,233`). Panels transparent.
- `cg-button` spinner uses undefined `--cg-icon-size-md` (no fallback) — `cg-button.ts:150-151`. Loading spinner collapses to ~2px dot.
- `cg-toaster` uses undefined `--cg-border-width-200` + `--cg-spacing-10` — `cg-toaster.ts:87,127`.
- `cg-badge-group` uses undefined `--cg-color-surface-tertiary-text` (no fallback) — `cg-badge-group.ts:25,45`.

### a11y / privacy
- `cg-navigation-menu` `<nav role="navigation">` has no accessible name — `cg-navigation-menu.ts:222`. Violates project's own rule.
- "Privacy-first" analytics captures passwords/OTP/search verbatim — `analytics/src/capture.ts:94` (length-truncate only, no field redaction; registry includes `cg-password-change`, `cg-otp-change`, `ai-search-query`).

---

## P2 — Quality / coverage (grouped, not fixed)

- ~35 `cg-*` components use `*-background-default` as `color:`/`border-color:` (Semantic Rule 1). Renders OK today only because brand == accent-text == `#dfff61`.
- ~78 bare-px lines across `ai-*`/`bias-*`; `lens-ui` ships raw `rgba()` box-shadows + bare px (violates its own token law).
- `gen-ui-lit` renderer: ZERO tests (`--passWithNoTests` hides it). eslint-plugin (504 LOC): ZERO tests. SSR async paths untested. MCP injection/error paths untested.
- `no-fake-tokens` regex omits 8 of 15 palette families (amber, cyan, indigo, pink, slate, stone, teal, zinc).
- `reportMatch` discards `match.index` → violations report at the quasi start line, not the offending line.
- `fast-uri` (2 HIGH) via `mcp-server > @modelcontextprotocol/sdk` is the ONLY shipped-runtime vuln; fix with pnpm `override fast-uri >=3.1.2`. Other 6 critical + 27 high advisories are dev/build/test/docs tooling only.

### Docs drift (`CLAUDE.md` — "single source of truth")
- Claims 16 packages; actual 20 (4 `lens-*` undocumented).
- Claims 183 components (88/89/6); actual 186 (89/91/6).
- "0.4.0 unless noted" violated by 4 lens packages (0.1–0.2) + adapter-anthropic (0.3.0, also `private:true` while docs list it public).
- MCP tool descriptions stale: "8 tools" (12 registered), "143 components", "1,800+ tokens" (actual 1731).

---

## Recommended fix order (remaining)

1. Pin canonical palette (`generate-from-palette.cjs` → `stockify-dark.json`) + CI no-diff check — BEFORE any token work.
2. Fix the undefined-token rendering bugs (status-text, surface-base, button spinner, toaster, badge-group); extend `no-orphan-tokens`.
3. Add `CgPhoneInput` wrappers + wire empty event maps (React & Vue).
4. Core streaming/resilience: guardrail bypass + circuit-breaker first, then cache-key options + fallback replay.
5. nav landmark name; manifest dark-token drift; analytics PII redaction; Anthropic prompt-cache no-op.
6. Add missing test suites (eslint-plugin, gen-ui-lit, MCP adversarial); `fast-uri` override; P2 token cleanup; reconcile `CLAUDE.md` counts.
