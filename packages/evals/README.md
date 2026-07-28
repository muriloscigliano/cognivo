# @cognivo/evals

Design-system evals — a regression suite that verifies AI agents actually use
Cognivo components and tokens correctly. Inspired by
[Design systems need evals](https://blog.murphytrueman.com/design-systems-need-evals/):
grounding docs tell the agent what the system is; evals check the agent listened.

## How it works

Intent-level prompts (e.g. *"Add a confirmation before someone deletes their
account"*) are run through an agent. The expected component is **never named in
the prompt** — a pass must reflect the system steering the agent, not the prompt
spelling out the answer. Each output is graded by three scorers:

1. **Deterministic** (`scorers/deterministic.ts`) — wraps the same
   `auditPage`/`validateUsage` rules the MCP server enforces: unknown
   components, missing required props, raw hex/px, tier-1 tokens, a11y
   structure. Errors fail the sample.
2. **Expectations** (`scorers/expectations.ts`) — hidden component-choice
   checks: did it reach for `cg-alert-dialog` over a hand-rolled `<div>`?
3. **Judge** (`scorers/judge.ts`) — rubrics for judgement calls. `MockJudge`
   scores offline via deterministic hints (abstains at 0.5 when a rubric has
   none); `LiteLLMJudge` does real LLM-as-judge scoring on live runs.

Each case is sampled N times (default 3); a case passes only if **every**
sample passes (worst-of-N). The gate (`gate.ts`) requires worst-of-N ≥ 80% and
mean ≥ 90% — tune there if noise builds, never by weakening scorers.

## Commands

```bash
pnpm evals          # offline gate (CI) — MockAgent + MockJudge, no API key
pnpm evals:live     # live run against the real model, records a baseline
pnpm evals:replay   # re-grade the latest recorded baseline through current scorers
```

Live runs go through the **shared LiteLLM proxy** (OpenAI-compatible
`/chat/completions`, plain fetch — no provider SDK). Config via env or
repo-root `.env`:

- `LITELLM_API_KEY` (required) — proxy key
- `LITELLM_BASE_URL` (default `http://localhost:4000`)
- `LITELLM_MODEL` (default `claude-opus-4-8` — a proxy-side alias; `--model`
  on the CLI overrides it)

They also run in GitHub Actions via the `Evals (live)` workflow (manual
dispatch or weekly), which reads `LITELLM_API_KEY` from secrets and
`LITELLM_BASE_URL` from repo variables.

`replay` exists to catch validator drift offline: baselines recorded from live
runs are re-graded whenever `audit-page`, the catalog, or the dataset changes —
no API cost.

## Adding a case

Edit `src/dataset.ts`. Rules enforced by `src/__tests__/dataset.test.ts`:

- Every tag in `expect` must exist in the generated catalog.
- The prompt must not contain the name of any expected component (hidden-answer
  rule — this is what makes a pass meaningful).
- Give rubrics `offlineHints` where a deterministic signal exists, so MockJudge
  can score them offline; leave them off for live-judge-only judgement calls.

## Reading a NO-GO

The console report lists each failing case with its worst sample's issues.
Common causes: catalog renamed/removed a tag (update dataset or fix the
catalog), `audit-page` learned a new rule (fix the mock if it's genuinely
better output, or the case if expectations shifted), or — on live runs — the
model/grounding actually regressed. That's the signal the suite exists for.
