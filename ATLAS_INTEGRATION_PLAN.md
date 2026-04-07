# AI Interaction Atlas Integration Plan

**Project:** Cognivo × AI Interaction Atlas
**Created:** 2026-04-03
**Estimated Effort:** 53-66 developer-days (12-16 weeks solo, 6-8 weeks with 2 devs)

---

## Executive Summary

Integrate the `@quietloudlab/ai-interaction-atlas` (178 patterns, 6 dimensions, 4-layer model, Apache 2.0) into Cognivo's monorepo. The Atlas is the vocabulary; Cognivo is the implementation. Together they create the only AI design system with both the language to describe patterns AND the components to build them.

**Final state:** 140 components (up from 125), Atlas-aware design advisor with workflow audit, reorganized showcase with Pattern Explorer, and cross-referenced cognitive biases.

---

## Phase 1: Foundation — Atlas Data Bridge (Weeks 1-2, ~6 days)

### Goal
Install Atlas package, create TypeScript integration layer, build data bridge.

### Files to Create
| File | Purpose |
|------|---------|
| `packages/design-advisor/src/atlas/types.ts` | Bridge types: AtlasPatternCard, AtlasDimension, AtlasLayer |
| `packages/design-advisor/src/atlas/atlas-registry.ts` | Singleton registry (mirrors BiasRegistry pattern): getAll, getByDimension, getByLayer, query, getRelated |
| `packages/design-advisor/src/atlas/mappings/component-pattern-map.ts` | Static map: 88 AI components → Atlas pattern IDs |
| `packages/design-advisor/src/atlas/mappings/bias-pattern-map.ts` | Cross-reference: Atlas patterns → cognitive bias IDs |
| `packages/design-advisor/src/atlas/index.ts` | Module exports |

### Files to Modify
| File | Change |
|------|--------|
| `packages/design-advisor/package.json` | Add `@quietloudlab/ai-interaction-atlas: ^1.0.10` |
| `packages/design-advisor/src/index.ts` | Add Atlas exports section |

### Key Mappings (examples)
- `ai-chat` → Generate, Converse, Respond
- `ai-thinking` → Reason, Process
- `ai-guardrail` → Constrain, Verify, Filter
- `ai-confidence-slider` → Calibrate, Score
- `ai-rag-panel` → Retrieve, Synthesize
- `ai-diff-panel` → Compare, Transform
- `ai-workflow-builder` → Orchestrate, Plan

### Bias Cross-References (examples)
- Recommend pattern → anchoring-bias, bandwagon-effect, authority-bias
- Compare pattern → contrast-effect, decoy-effect, framing-effect
- Summarize pattern → availability-heuristic, duration-neglect, confirmation-bias
- Adapt pattern → confirmation-bias, filter-bubble, status-quo-bias
- Generate pattern → authority-bias, automation-bias

---

## Phase 2: Design Advisor Enhancement (Weeks 3-5, ~9 days)

### Goal
Atlas pattern cards, workflow audit engine, component recommendation engine.

### Files to Create
| File | Purpose |
|------|---------|
| `packages/design-advisor/src/components/atlas-pattern-card.ts` | `<atlas-pattern-card>` web component — expandable card with I/O spec, UX notes, relations |
| `packages/design-advisor/src/components/atlas-library.ts` | `<atlas-library>` — browsable/filterable view of 178 patterns |
| `packages/design-advisor/src/atlas/workflow-audit.ts` | Audit engine: input component tags → output layer coverage, bias risks, gaps, recommendations |
| `packages/design-advisor/src/atlas/recommend.ts` | Given pattern/intent → recommend Cognivo components |

### Workflow Audit API
```typescript
interface WorkflowAuditInput {
  componentTags: string[];
  workflowName?: string;
}

interface WorkflowAuditResult {
  patterns: AtlasPatternCard[];           // Covered patterns
  layers: Record<AtlasLayer, number>;     // Coverage per layer
  biasRisks: BiasRisk[];                  // Triggered biases + severity
  gaps: AtlasGap[];                       // Missing patterns/layers
  recommendations: Recommendation[];       // Suggested additions
}
```

---

## Phase 3: New Components (Weeks 4-9, ~22 days)

### Goal
Build 15 new AI components filling Atlas pattern gaps. Total rises from 125 to 140.

### Tier 1 — Core Gaps (Weeks 4-5)

| Component | Atlas Pattern | Props | Key Feature |
|-----------|--------------|-------|-------------|
| `ai-scenario-panel` | Simulate | scenarios, activeScenario, showComparison | Side-by-side hypothetical outcomes with probability |
| `ai-transform-slider` | Transform | beforeContent, afterContent, mode (slider/side-by-side/overlay), position | Draggable before/after divider |
| `ai-consent-manager` | Consent | consents[], mode (inline/modal/banner), granularity | Grouped toggles with required indicators |
| `ai-voice-panel` | Voice Command | state (idle/listening/processing), transcript, waveformData, pushToTalk | Circular waveform viz + live transcript |
| `ai-detection-canvas` | Detect | src, detections[], showLabels, showConfidence, interactive | Bounding box overlays on images |

### Tier 2 — Important Gaps (Weeks 6-7)

| Component | Atlas Pattern | Key Feature |
|-----------|--------------|-------------|
| `ai-translation-panel` | Translate | Split pane source/target with alternatives |
| `ai-personalization-dash` | Adapt | User preference profile with impact preview |
| `ai-segmentation-viewer` | Segment | Colored mask overlays with legend |
| `ai-similarity-card` | Match | Two items side-by-side with score bridge |
| `ai-labeling-board` | Organize/Label | Kanban-style drag-and-drop labeling |

### Tier 3 — Utility (Weeks 8-9)

| Component | Atlas Pattern | Key Feature |
|-----------|--------------|-------------|
| `ai-validation-checklist` | Validate Data | Checklist with auto-run + status |
| `ai-cache-indicator` | Semantic Cache | Hit/miss status with hit rate |
| `ai-data-lineage` | Data Provenance | Node graph showing data chain |
| `ai-reward-signal` | Reward | Score with trend sparkline |
| `ai-assistant-widget` | Embedded Chat | Floating FAB → mini chat (composes ai-chat) |

### Per-Component Checklist
- [ ] Component file: `src/components/{tag}/{tag}.ts`
- [ ] Uses `@customElement`, `LitElement`, Shadow DOM
- [ ] Imports shared styles: `hostBlock`, `reducedMotion`
- [ ] All CSS values use `--cg-*` design tokens
- [ ] All states: default, hover, active, focus, disabled, loading, error, success
- [ ] Keyboard accessible, ARIA roles
- [ ] `prefers-reduced-motion` support
- [ ] Registered in showcase: `apps/gen-ui-demo/src/pages/registry.ts`
- [ ] Exported from `packages/components/src/index.ts`
- [ ] Atlas metadata in registry entry
- [ ] Cognitive bias hints documented

---

## Phase 4: Taxonomy Reorganization (Weeks 8-11, ~11 days)

### Goal
Reorganize AI components into Atlas 4-layer model, add Atlas metadata to all components.

### New Category Structure
```
Foundation (keep as-is)
├── Foundation
├── Forms
├── Data & Navigation
├── Overlays
└── Feedback

AI Components (reorganize from 7 → 6 categories)
├── AI Sensing (Inbound)      — Capture, Upload, Search, Detect, Voice
├── AI Reasoning (Internal)   — Think, Reason, Classify, Predict, Compare
├── AI Expressing (Outbound)  — Stream, Generate, Summarize, Translate, Diff
├── AI Acting (Interactive)   — Chat, Command, Workflow, Collaborate, Label
├── AI Governance             — Consent, Guardrail, Permission, Validate, Lineage
└── AI Operations             — Cost, Status, Tokens, Cache, Versioning, Model
```

### Enhanced ComponentMeta
```typescript
atlas?: {
  patterns: string[];
  layer: 'sensing' | 'reasoning' | 'expressing' | 'acting' | 'governance' | 'ops';
  ioSpec?: { inputs: string[]; outputs: string[] };
  maturity: 'experimental' | 'stable' | 'mature';
  humanOversight: 'none' | 'optional' | 'recommended' | 'required';
  risk?: string;
  tip?: string;
  antiPatterns?: string[];
  pairsWellWith?: string[];
  commonlyFollowedBy?: string[];
};
biasHints?: string[];
```

### Render Updates
- Atlas pattern badges on component pages
- Layer badge in header
- I/O spec section
- "Pairs well with" component cards
- "Bias awareness" section
- Maturity + oversight indicators
- Risk/tip/anti-pattern callouts

---

## Phase 5: Pattern Explorer & Showcase (Weeks 11-14, ~11 days)

### Goal
Pattern Explorer view, Workflow Audit UI, updated showcase navigation.

### New Showcase Views
| View | Purpose |
|------|---------|
| **Components** (existing, reorganized) | Browse by category |
| **Patterns** (new) | Browse 178 Atlas patterns, see which components cover each |
| **Audit** (new) | Drag components into a workflow, get coverage + bias analysis |
| **Biases** (existing, with Atlas cross-refs) | 184 cognitive biases with linked patterns |

### Pattern Explorer Features
- Grid of 178 patterns by dimension (6 tabs)
- Implementation status badges (implemented/partial/planned)
- Coverage dashboard: "88/178 patterns covered (49%)"
- Click pattern → see implementing components
- Visual: 4-layer concentric ring showing distribution

### Gen-UI Atlas Awareness
- Extend `ComponentDefinition` with `atlasPatterns?: string[]`
- Atlas-aware suggestions in generative UI pipeline

---

## Coverage Impact

| Metric | Before | After |
|--------|--------|-------|
| Components | 125 | 140 (+15) |
| Atlas patterns covered | ~55 | ~88 |
| Coverage percentage | ~31% | ~49% |
| Cognitive biases | 184 | 184 (+ Atlas cross-refs) |
| Showcase categories | 12 | 11 (cleaner taxonomy) |
| Design advisor features | Bias cards only | Bias cards + Pattern cards + Workflow audit + Recommendations |

---

## Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| Atlas API changes | Pin version, abstract behind AtlasRegistry facade |
| Mapping accuracy | Domain expert review of component↔pattern and bias↔pattern maps |
| Showcase performance | Lazy load Atlas data (follow existing LazyBiasRegistry pattern) |
| Category migration | Add backward-compatible aliases for old category IDs |
| Complex components (voice, labeling) | Ship MVP first, iterate |

---

## Priority Order (if time-limited)

1. **Phase 1** — Data bridge (everything depends on this)
2. **Phase 3 Tier 1** — 5 highest-value new components
3. **Phase 4** — Taxonomy reorganization (immediate UX improvement)
4. **Phase 2** — Workflow audit (the killer feature)
5. **Phase 5** — Pattern Explorer (the showcase)
6. **Phase 3 Tier 2-3** — Remaining 10 components
