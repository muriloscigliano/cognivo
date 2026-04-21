# Cognivo Bias Wrappers

Six behavioral primitives. Each wraps slotted content and applies a genuine psychological nudge. Use them when the psychology actually fits. Refuse to use them for dark patterns.

## `bias-anchoring`

- **When:** comparing a current value to a reference (sale prices, discount offers, before/after improvements).
- **Props:** `anchor` (old/reference value), `current` (new value), `label` (optional savings badge).
- **Rationale:** people judge a price/quality relative to the first number they see; a higher anchor makes the current value feel lower.
- **Avoid when:** there's no meaningful reference value, or the anchor is fabricated.

```html
<bias-anchoring anchor="$199" current="$99" label="Save $100">
  <cg-card>...</cg-card>
</bias-anchoring>
```

## `bias-scarcity`

- **When:** limited time, stock, or popularity genuinely applies.
- **Props:** `type` (`time` | `stock` | `popularity`), `deadline` (ISO or ms), `remaining` (count), `threshold` (when to show).
- **Rationale:** loss aversion — the fear of missing out accelerates decisions.
- **Avoid when:** inventing urgency that doesn't exist. This is the fastest path to a dark pattern.

```html
<bias-scarcity type="stock" remaining="3" threshold="5">
  <cg-button variant="primary">Buy now</cg-button>
</bias-scarcity>
```

## `bias-social-proof`

- **When:** showing real usage, purchase, or rating counts.
- **Props:** `count`, `type` (`viewing` | `purchased` | `rated`), `avatars` (optional array of avatar URLs).
- **Rationale:** people follow peers' signals when they're uncertain.
- **Avoid when:** count < 10 (feels weak or fake), or numbers are fabricated. If the metric is genuine but small, prefer `bias-authority` instead.

```html
<bias-social-proof count="2400" type="purchased"></bias-social-proof>
```

## `bias-authority`

- **When:** real endorsements, certifications, or expert/brand affiliations.
- **Props:** `source`, `kind` (`verified` | `endorsed` | `certified` | `featured`), `href` (evidence link).
- **Rationale:** credible third-party signals transfer trust.
- **Avoid when:** the endorsement is fabricated, misleading, or the "certification" is self-awarded.

```html
<bias-authority source="Stripe, Vercel, Linear" kind="featured"></bias-authority>
```

## `bias-commitment`

- **When:** multi-step flows where progressive commitment improves completion (onboarding, KYC, long forms).
- **Props:** `step`, `total`, `show-progress`. Children marked `data-step="N"` appear on their step.
- **Rationale:** small initial commitments increase follow-through (Cialdini, consistency principle).
- **Avoid when:** the user benefits from seeing the full form upfront (short flows, tax/legal forms).

```html
<bias-commitment step="2" total="4" show-progress>
  <div data-step="1">...</div>
  <div data-step="2">...</div>
</bias-commitment>
```

## `bias-reciprocity`

- **When:** genuine value is given before asking (free trial, free chapter, free shipping, template gift).
- **Props:** `gift` (description), `icon`, `prominence` (`low` | `medium` | `high`).
- **Rationale:** receiving creates a felt obligation to return the gesture.
- **Avoid when:** the "gift" isn't actually valuable, or it's a paywalled preview framed as a gift.

```html
<bias-reciprocity gift="Free 14-day trial — no credit card" icon="gift" prominence="high">
  <cg-button variant="primary">Start free</cg-button>
</bias-reciprocity>
```

## Choosing between biases

| Context | Recommended |
|---|---|
| Pricing with multiple tiers | `bias-anchoring` (middle tier) + `bias-social-proof` |
| Limited-edition product | `bias-scarcity` (stock) |
| Time-boxed promotion | `bias-scarcity` (time) |
| Fresh product, few users | `bias-authority` (skip social-proof until count is strong) |
| Long signup/KYC | `bias-commitment` |
| Top-of-funnel CTA | `bias-reciprocity` |

## Never combine more than two biases on a single surface

Stacking creates the "hard sell" feeling and reduces credibility. Pick the one that best matches the user's current mental state.
