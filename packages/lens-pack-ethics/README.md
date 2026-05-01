# @cognivo/lens-pack-ethics

Dark-pattern + transparency rule pack for [Cognivo Lens](https://cognivo.dev). Static heuristics that catch the most common deceptive UI patterns — pre-checked opt-ins, fake-urgency timers, asymmetric consent buttons, undisclosed sponsored content, scarcity claims.

Five rules in v0.1, all `cost: 'cheap'`, no LLM dependency. Confidence is honestly tiered (60–90%) — these rules say "this *looks like* a dark pattern, review it" rather than "this *is* one."

## Install

```bash
pnpm add @cognivo/lens-core @cognivo/lens-pack-ethics
```

## Use

Standalone:
```ts
import { RuleEngine } from '@cognivo/lens-core';
import ethicsPack from '@cognivo/lens-pack-ethics';

const engine = new RuleEngine();
await engine.register(ethicsPack);
```

Co-registered with the core pack:
```ts
import corePack from '@cognivo/lens-pack-core';
import ethicsPack from '@cognivo/lens-pack-ethics';

await engine.register(corePack);
await engine.register(ethicsPack);
```

With `<cg-lens>` (lens-ui v0.1+):
```html
<cg-lens></cg-lens>
<script type="module">
  import corePack from '@cognivo/lens-pack-core';
  import ethicsPack from '@cognivo/lens-pack-ethics';
  document.querySelector('cg-lens').packs = [corePack, ethicsPack];
</script>
```

## Rules in this pack (v0.1.0 — 5 rules)

| Id | Severity | Confidence | Detects |
|---|---|---|---|
| `ethics/dark-pattern/preselected-optional-checkbox` | strong | 85 | `<input type="checkbox" checked>` whose label matches optional opt-in keywords (newsletter, marketing, special offers). Allow-listed: "Remember me", "Keep me signed in". |
| `ethics/dark-pattern/asymmetric-action-buttons` | consider | 70 | A button pair inside a `<dialog>` / `[role=dialog]` where one is an accept-action (Accept, Allow) and the other is a decline-action (Decline, Reject) AND their text colors differ noticeably. |
| `ethics/dark-pattern/scarcity-claim` | consider | 65 | Visible text matching scarcity / urgency patterns ("Only N left", "X bought today", "Selling fast", "Limited time", "Hurry"). |
| `ethics/dark-pattern/countdown-without-anchor` | consider | 70 | HH:MM:SS / MM:SS countdown text with no `<time datetime>` ancestor or `data-deadline` attribute. |
| `ethics/transparency/sponsored-without-label` | strong | 90 | Element with sponsored markers (`class*="sponsored"`, `[data-sponsored]`, `class*="ad-"`) but no visible "Sponsored" / "Advertisement" / "Promoted" text. |

## Honest confidence

Confidence is **never** above 90 in this pack. Heuristics on dark patterns:
- Often need real-world context (was the timer set to a real deadline?)
- Touch on judgment calls (is "Selling fast" a deceptive claim or a reasonable description?)
- Can have legitimate uses (asymmetric buttons in a footer aren't always dark patterns)

We err toward fewer false positives by:
- Scoping `asymmetric-action-buttons` to dialog containers only
- Allow-listing legitimate pre-checked checkboxes
- Excluding clock times from countdown detection
- Requiring strict class-name patterns for sponsored detection (no `[class*="ad"]` greedy-match)

## Deferred to later versions

LLM-judgment rules from the Lens design spec §4.3 ship in the next release once `@cognivo/lens-core`'s agent runtime is online:

- `ethics/dark-pattern/llm-confirmshaming-detector` — judges decline-link copy tone
- `ethics/dark-pattern/llm-misleading-claim` — checks for unsubstantiated superlatives
- `ethics/transparency/llm-disclosure-completeness` — verifies disclosures cover all data uses

Multi-page tracking rules (`forced-continuity`, `hard-to-cancel`) are post-v1 — they need page-navigation analysis we don't have yet.

## Bundle

Lazy-chunked per rule (~2–3 KB each, ~1–1.3 KB gzip). Side-effect-free. Externalizes `@cognivo/lens-core`.

## Spec

[`docs/superpowers/specs/2026-04-29-lens-pack-ethics-design.md`](../../docs/superpowers/specs/2026-04-29-lens-pack-ethics-design.md)
