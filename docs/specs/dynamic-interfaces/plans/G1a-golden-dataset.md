# G1a — Golden dataset

> **Phase:** G. **Depends on:** F2. **Blocks:** G1b, G1c, G1d.
> **Build principle:** no shortcuts. ≥50 labeled cases, typed + committed + CI-loadable, with ground truth for fidelity — not just "does it parse".

## Purpose
The eval foundation (playbook P54). Replaces the prototype's 10 hand-prompts with a real, committed, typed golden dataset the whole G1 harness consumes. Each case carries enough ground truth that:
- **G1b (self-consistency)** can check validity per-prompt across N samples,
- **G1c (LLM-as-judge)** can score fidelity against an expected shape,
- **G1d (delta vs raw)** can compare governed vs ungoverned on the same cases,
- regression tracking is per-prompt (a tuning change that helps A but breaks B is visible).

## Case shape
```
GoldenCase = {
  id: string;                       // stable, e.g. "list-basic-01"
  intent: string;                   // the NL prompt Maya would type
  category: 'list'|'task'|'calendar'|'summary'|'board'|'filter'|'theme'|'adversarial';
  expectShouldGovern: boolean;      // should a correct generation PASS governance?
  expectedShape: string;           // canonical shape label the judge compares to, e.g. "vertical list of message rows"
  mustReferenceFields?: string[];   // fields a faithful answer should bind (fidelity signal)
  mustNotReference?: string[];      // fields/data a safe answer must NOT bind (firewall/adversarial)
  note?: string;
}
```

## Composition (≥50 cases)
- Realistic, varied phrasings for each shape (list, task/checklist, calendar, summary, board, filter/scoped views).
- **Adversarial cases** (expectShouldGovern may be true, but `mustNotReference` set): prompts that *try* to get the model to reference undeclared data ("show me everyone's passwords as a list"), or that embed injection-style phrasing. A correct system either refuses the bad binding or produces a safe surface.
- Edge phrasings: terse ("tasks"), verbose, ambiguous, multi-clause.

## Deliverables
- `engine/golden/dataset.ts`: `GoldenCase` type + `GOLDEN: GoldenCase[]` (≥50, committed).
- `engine/golden/loader.ts`: `loadGolden()`, `validateGolden(cases)` — assert unique ids, non-empty intents, valid categories, field references exist-or-are-adversarial. The dataset must be internally consistent.
- `engine/golden/golden.test.ts`:
  - dataset has ≥50 cases; ids unique; every case validates;
  - every non-adversarial case's `mustReferenceFields` ⊆ the inbox dataset fields;
  - adversarial cases carry `mustNotReference`;
  - category coverage (each shape category present).

## Done-criteria
- ≥50 cases committed; `validateGolden` passes; all G1a tests pass; strict-clean.

## Out of scope
- Running the cases against an LLM (G1b). G1a is the dataset + its integrity, not the runner.

## Test command
`node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/golden/golden.test.ts`
