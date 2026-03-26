# Benchmark: Cognivo vs OpenUI

**Date:** March 2026
**Methodology:** Same 7 UI scenarios from OpenUI's published benchmarks, implemented in both frameworks' component-lang syntax. Character count as proxy for token count (correlated at ~4 chars/token for GPT tokenizers).

---

## Track A: LLM Output Size (Token Efficiency)

Both frameworks use the same DSL syntax (positional arguments, hoisting, streaming-friendly). The difference is in component naming and prop structure.

| Scenario | OpenUI (.oui) | Cognivo (.cg) | Δ chars | Δ % |
|----------|:------------:|:-------------:|:-------:|:---:|
| simple-table | 433 | 519 | +86 | +19.8% |
| chart-with-data | 795 | 835 | +40 | +5.0% |
| contact-form | 1,117 | 1,357 | +240 | +21.4% |
| **dashboard** | **3,479** | **1,880** | **-1,599** | **-45.9%** |
| pricing-page | 4,777 | 4,546 | -231 | -4.8% |
| settings-panel | 2,367 | 2,893 | +526 | +22.2% |
| **e-commerce** | **4,171** | **3,376** | **-795** | **-19.0%** |
| **TOTAL** | **17,139** | **15,406** | **-1,733** | **-10.1%** |

### Honest assessment

**Track A results are mixed.** Cognivo is 10.1% more compact overall, but the picture varies by scenario:

**Where Cognivo wins (complex UIs):**
- Dashboard: **-45.9%** — MetricCard encodes what OpenUI needs Card+CardHeader+TextContent+TextCallout for
- E-commerce: **-19.0%** — Richer components (List, Badge, Radio, ImageGallery) reduce boilerplate
- Pricing: **-4.8%** — Accordion, List, Badge compress feature comparison

**Where OpenUI wins (simple forms):**
- Contact form: **+21.4%** — OpenUI's FormControl(label, input) pattern is more compact than our Label + Input in a Stack
- Settings panel: **+22.2%** — Same form pattern advantage
- Simple table: **+19.8%** — OpenUI's Col() helper is slightly more compact than our {key, label} objects

**Why:** Cognivo uses explicit Label + Input composition (more accessible, more flexible) instead of OpenUI's FormControl shorthand. This costs tokens but produces better-structured HTML.

**Bottom line on Track A:** Cognivo is not universally more token-efficient than OpenUI Lang. The win is on **complex, dashboard-style UIs** where richer components compress more semantics per token. On simple forms, OpenUI's shorthand wins. The total is -10.1% in Cognivo's favor because complex UIs are the more common generative UI use case.

---

## Track B: Client Bundle Size

| | Cognivo | OpenUI |
|--|---------|--------|
| **Core engine** | 62KB | 16KB |
| **Component library** | 211KB | ~200KB+ |
| **Renderer** | 9KB | (included in react-lang) |
| **Subtotal (own code)** | **282KB** | **~236KB** |
| **Framework peer dep** | Lit: 78KB gzip | React 19: 45KB gzip |
| **State management** | — | Zustand: 3KB |
| **UI primitives** | — | Radix UI (11 pkgs): ~50KB |
| **Charts** | Built-in (SVG) | Recharts: ~100KB |
| **TOTAL with deps** | **~360KB** | **~434KB+** |

**Result:** Cognivo ships **~17% smaller** total bundle, with zero React dependency.

### Dependency Comparison

| | Cognivo | OpenUI |
|--|---------|--------|
| **Framework** | Lit 3 | React 19 + ReactDOM |
| **Peer deps required** | 1 (lit) | 3+ (react, react-dom, zustand) |
| **npm packages** | 2 | 15+ (Radix, Recharts, Lucide, etc.) |
| **Works in** | Any framework | React only |
| **Chart library** | Built-in SVG | Recharts (React-specific) |
| **Style encapsulation** | Shadow DOM | CSS classes (can leak) |

---

## Track C: What Cognivo Has That OpenUI Doesn't

| Feature | OpenUI | Cognivo |
|---------|:------:|:-------:|
| Cognitive bias analysis | — | `suggestBiasesForTree()` |
| Component psychology manifest | — | `getManifest()` with engagedBiasIds |
| Bias-aware prompts | — | biasHints injected into LLM system prompt |
| Design token governance | — | `validateTokenUsage()` rejects magic values |
| Framework-agnostic | React only | Web Components (any framework) |
| Dark mode | CSS media query | CSS media query + `[data-theme]` toggle |
| Token violation detection | — | Post-parse validation |

---

## Limitations

- Character count is a proxy; actual token count requires tiktoken with a specific model encoder
- Cognivo samples are hand-authored (not model-generated) — represents ideal output
- OpenUI samples are from their published benchmarks (also hand-authored)
- Bundle sizes are unminified; gzip ratios may differ
- OpenUI has 3 years of maturity; Cognivo components are newly written

---

## Conclusion

**Token efficiency:** Mixed results. Cognivo wins on complex dashboard/e-commerce UIs (-10% overall) but loses on simple forms (+20%). The win comes from richer components (MetricCard, Chart, List) that compress semantics; the loss comes from explicit Label+Input composition vs OpenUI's FormControl shorthand. For the typical generative UI use case (dashboards, analytics, data-rich views), Cognivo is more compact.

**Bundle size:** Cognivo is ~17% smaller total with zero React dependency. Works in any framework via Web Components.

**The real differentiator:** Token efficiency is table stakes. The actual competitive advantage is what Cognivo does that OpenUI cannot:
- `suggestBiasesForTree()` — analyze any generated UI for cognitive biases
- Component manifests with `engagedBiasIds[]` — machine-readable psychology metadata
- `validateTokenUsage()` — reject LLM output that violates design token governance
- Framework-agnostic — one library works in React, Vue, Angular, and vanilla JS

**The narrative:** *OpenUI helps the model draw UI faster. Cognivo helps teams ship AI UI that users interpret correctly — with a library that knows both tokens and biases.*
