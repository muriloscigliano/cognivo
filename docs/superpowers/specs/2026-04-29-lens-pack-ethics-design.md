# Lens Pack Ethics v0.1 — Design

> **Sub-project:** roadmap C5 — `@cognivo/lens-pack-ethics`. The second rule pack consumed by `lens-core`. Proves the multi-pack composition story.
> **Status:** spec; v0.1 ships only the cheap rules. LLM-cost rules deferred to C7.
> **Parent:** [`2026-04-29-lens-v1-roadmap.md`](../plans/2026-04-29-lens-v1-roadmap.md).

---

## 1. Why this pack exists

Cognivo Lens promises something axe / Lighthouse can't: the engine **cares about manipulation, not just compliance.** Dark patterns and missing transparency violate user trust without violating any specific WCAG criterion. Static lint rules can catch a meaningful subset.

This pack ships those rules. Three guarantees:

1. **Honest confidence.** Heuristics get 60–80% confidence, not 95%. We say "this *might* be a dark pattern, review it" — never "this *is*."
2. **Cheap-only in v0.1.** No LLM rules. The 3 LLM-judgment rules from spec §4.3 (confirmshaming detector, misleading claims, disclosure completeness) defer to C7 once the agent runtime ships.
3. **Multi-pack composition.** This is the second pack on the engine; the demo page registers both. If the composition is awkward, that surfaces here, not later.

## 2. v0.1 rule list (5 rules)

| Id | Severity | Confidence | Detects |
|---|---|---|---|
| `ethics/dark-pattern/preselected-optional-checkbox` | strong | 85 | An `<input type="checkbox" checked>` whose label/context suggests an optional opt-in (newsletter, marketing, terms) — pre-checked optional opt-ins are deceptive defaults. |
| `ethics/dark-pattern/asymmetric-action-buttons` | consider | 70 | A button pair where one is high-contrast/accent-colored and the adjacent one is muted — visual interference steering toward one option. |
| `ethics/dark-pattern/scarcity-claim` | consider | 65 | Visible text matching unverifiable scarcity claims (`only \d+ left`, `\d+ bought today`, `selling fast`, `\d+ viewers right now`). |
| `ethics/dark-pattern/countdown-without-anchor` | consider | 70 | Visible countdown timer pattern (`HH:MM:SS`) with no `<time datetime=…>` ancestor or `data-deadline` anchor — likely a fake-urgency timer. |
| `ethics/transparency/sponsored-without-label` | strong | 90 | Element with `class*="sponsored"` / `class*="ad"` / `class*="promo"` / `[data-sponsored]` AND no visible "Sponsored" / "Ad" / "Promoted" text label nearby. |

### Why these five

- **preselected-optional-checkbox**: GDPR/eIDAS recital 32 explicitly bans pre-checked consent. Detectable. High value.
- **asymmetric-action-buttons**: classic dark pattern (cookie banners). Detectable via the C2 contrast helper.
- **scarcity-claim**: text-pattern-only — won't catch all but catches the most common phrasing. Honest about confidence.
- **countdown-without-anchor**: timers with no actual deadline are fake. The HTML5 `<time>` element provides the anchor; its absence is the signal.
- **sponsored-without-label**: FTC-required disclosure. Element marked sponsored in markup but no visible label = native ad violation.

### Why NOT in v0.1

| Rule | Reason deferred |
|---|---|
| `ethics/dark-pattern/forced-continuity` (no easy cancel) | Requires multi-page navigation analysis. |
| `ethics/dark-pattern/confirmshaming` (negative-loaded decline copy) | Requires LLM judgment. C7. |
| `ethics/dark-pattern/misdirection` (primary action steers to upsell) | Requires intent classification per element. C7. |
| `ethics/transparency/missing-disclosure` (data collection w/o notice) | Requires LLM completeness judgment. C7. |
| `ethics/dark-pattern/hard-to-cancel` (subscription cancel buried) | Cross-page; out of v1 scope. |

## 3. Architecture

### 3.1 Package layout

```
packages/lens-pack-ethics/
├── package.json
├── tsconfig.json / tsconfig.test.json
├── vite.config.ts / vitest.config.ts
├── README.md
└── src/
    ├── index.ts             ← barrel: pack + named exports
    ├── pack.ts              ← definePack() with lazy rule imports
    ├── internal/            ← shared helpers (text patterns, button-pair detection)
    │   ├── scarcity-patterns.ts
    │   ├── button-pair-finder.ts
    │   └── visible-label-text.ts
    ├── rules/
    │   ├── dark-pattern/
    │   │   ├── preselected-optional-checkbox.ts
    │   │   ├── asymmetric-action-buttons.ts
    │   │   ├── scarcity-claim.ts
    │   │   └── countdown-without-anchor.ts
    │   └── transparency/
    │       └── sponsored-without-label.ts
    └── __tests__/
        ├── smoke.test.ts
        ├── dark-pattern/
        │   └── (one .test.ts per rule)
        ├── transparency/
        │   └── sponsored-without-label.test.ts
        └── integration/
            └── pack-end-to-end.test.ts
```

### 3.2 Public API

Same shape as `lens-pack-core`:

```ts
import ethicsPack from '@cognivo/lens-pack-ethics';
import { RuleEngine } from '@cognivo/lens-core';

const engine = new RuleEngine();
await engine.register(ethicsPack);
// ...register lens-pack-core too if you want both
```

`<cg-lens>` v0.1 hardcodes lens-pack-core only. v0.2 will add multi-pack config; until then ethics consumers register the engine themselves.

### 3.3 Dependencies

- **Peer:** `@cognivo/lens-core` (workspace) — engine + types
- **Dev:** typescript, vite, vitest, happy-dom
- **Runtime:** zero. (No LLM rules in v0.1, so no `@cognivo/core` peer.)

## 4. Detection strategy notes

### 4.1 `preselected-optional-checkbox`

Detect: `input[type="checkbox"][checked]` whose nearest label or surrounding text matches optional-opt-in keywords (newsletter, updates, marketing, offers, communications, share my email, terms agreement on signup forms).

Caveats:
- A "remember me" checkbox is fine to be pre-checked — it's a usability convenience, not a consent gate. Add to the allow-list.
- Settings pages that show CURRENT user preference state (already opted-in) shouldn't fire. We can't perfectly distinguish, so confidence stays at 85, not 95.

Allow-list of label keywords (whitelist — don't fire when these match):
- "remember", "keep me signed in", "stay logged in", "save credentials"

### 4.2 `asymmetric-action-buttons`

Detect: a button pair (two buttons with the same parent, adjacent in source order) where:
- Both have non-trivial text (>= 2 words OR a recognizable accept/decline keyword)
- Their text contrast against the page background differs by >= 3:1

Use the C2 contrast helper. The "accept" button's contrast >= 4.5:1; the "decline" button's contrast < 3:1.

Caveats:
- Many legitimate UIs have a primary action and a "Cancel" button — that's not always a dark pattern. We weight up the confidence when the buttons are in a modal or dialog context (data-attr or role=dialog ancestor).

### 4.3 `scarcity-claim`

Detect: visible text matching one of:
- `/only\s+\d+\s+(left|remaining|in stock|available)/i`
- `/\d+\s+(people|users|customers)\s+(bought|purchased|viewing|looking)/i`
- `/selling fast/i`
- `/limited (time|stock|supply)/i`
- `/\d+%\s+(off|discount)\s+(today|this hour)/i`

The rule has no way to verify whether the claim is true. Confidence stays at 65 — clearly advisory.

### 4.4 `countdown-without-anchor`

Detect: visible text matching `/\d{1,2}:\d{2}(:\d{2})?/` (HH:MM:SS or MM:SS) AND no `<time datetime="…">` ancestor providing an actual deadline.

Caveats:
- Catches real countdown timers. The "anchor" requirement protects legitimate deadlines (real flash sales with a real deadline).

### 4.5 `sponsored-without-label`

Detect: element matching `[class*="sponsored"]`, `[class*="ad-"]`, `[class*="promo"]`, `[data-sponsored]`, `[data-ad]`, `[data-promoted]` AND no visible text in the element OR its descendants matching `/(sponsored|advertisement|promoted|paid post|paid partnership|ad)/i`.

Note: `[class*="ad-"]` is intentional (matches `ad-banner`, `ad-slot`) but NOT `[class*="ad"]` (would match `header`, `padding-`, etc.).

## 5. Quality bar

- Every rule has ≥ 5 fixtures (positive + negative + edge × 3).
- Pack-level integration test verifies all 5 rules can register + co-evaluate.
- Demo page seeded with violations for each rule so the rules actually fire when you visit `/lens/demo`.
- TypeScript strict (exactOptionalPropertyTypes + noUncheckedIndexedAccess).
- Build size: ≤ 8 KB lazy chunks per rule, ≤ 1 KB gzip per chunk.

## 6. Non-goals

- **No LLM rules.** confirmshaming, misleading-claim, disclosure-completeness — all C7.
- **No multi-page tracking.** forced-continuity, hard-to-cancel — post-v1.
- **No legal/compliance certification.** This pack catches *technical signals*, not legal violations. The rule's `why` field calls this out explicitly.
- **No demo-page UI for ethics.** v0.1 of `<cg-lens>` only registers lens-pack-core. The ethics rules surface when consumers register both packs themselves; demo page upgrade comes after multi-pack support in `<cg-lens>` (v0.2).

  → **Adjustment:** since `<cg-lens>` hardcodes only lens-pack-core, the demo's ethics rules won't fire visibly until cg-lens v0.2 lands. We add the ethics-violating markup to the demo NOW so it's ready, but the lens won't flag it yet. **Better alternative:** small lens-ui change in C5 to accept multiple packs via attribute. See §7 Open Question.

## 7. Open question

### Q1. Multi-pack support in `<cg-lens>` for v0.1?

The ethics pack is built but `<cg-lens>` only loads the core pack. Three options:

**(a)** Defer multi-pack to v0.2 of lens-ui. Ship ethics now, but it's only useful via direct `RuleEngine` consumers. Lens-ui demo can't show ethics findings.

**(b)** Add a `packs` attribute to `<cg-lens>` in this commit. Tiny change — ScanController accepts an array of packs, defaults to `[corePack]`. Demo registers both.

**(c)** Add an extra `<cg-lens>` component method `addPack(pack)` for runtime composition. More code, less discoverable.

**My recommendation: (b).** Tiny change, preserves the ship-it-end-to-end principle. Estimated: ~10 LOC + 1 test in lens-ui, ~5 LOC in ScanController. Otherwise the ethics pack ships as scaffolding that consumers can't see.

## 8. If approved

**Phases:**
- A. Scaffold `@cognivo/lens-pack-ethics`
- B. Implement 5 rules + tests
- C. Pack manifest + smoke + integration
- D. **Multi-pack support in `<cg-lens>`** (per Q1.b). One small commit-in-commit.
- E. Demo upgrade — ethics violations seeded; lens registers both packs

Estimated: 1–1.5 days. Test target: 50+ (10 per rule × 5).

**Cuts** carried forward from §6:
- LLM rules → C7
- Multi-page rules → post-v1
- Legal-compliance certification → never (out of scope by design)
