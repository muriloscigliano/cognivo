# Cognivo vs. AI Agent Patterns Playbook — Analysis

**67 patterns reviewed. Here's what matters for us.**

---

## TL;DR

Cognivo already implements ~8 patterns well. **12 more are directly useful** and would transform it from an "AI component library" into an "AI agent-powered design system." The rest are either overkill for now or only relevant at massive scale.

---

## Part 1: What We Already Have

These patterns are live in Cognivo today. No action needed — just awareness.

| # | Pattern | Where in Cognivo | Quality |
|---|---------|-----------------|---------|
| 1 | **Central Registry** | `BiasRegistry` — 180 biases in a `Map`, singleton, queryable | Solid |
| 4 | **Processor Pipeline** | `BaseAiClient` → validate → `executeIntent` → parse | Partial (2-step, not full pipeline) |
| 6 | **Context Engineering** | `ContextBuilder` fluent API — dataset, selection, meta, timeframe | Clean |
| 17 | **Tool Registry + Validation** | Intent schemas + `isAiIntent()` validator + JSON Schema strict mode | Good |
| 19 | **Schema Compatibility** | `AiClient` interface abstracts provider; OpenAI schemas separate | Foundation ready |
| 36 | **Workflow: Prompt Chaining** | ai-chat: user input → build context → call LLM → parse → render | Simple chain |
| 44 | **Agentic Model Loop** | `runIntent()` / `streamIntent()` — single-turn loop | Single-turn only |
| 49 | **Structured Outputs** | OpenAI JSON Schema `strict: true` per intent | Excellent |

**Assessment:** Cognivo has a clean foundation. The patterns it uses are well-implemented. The gap is that everything is **single-turn, stateless, and fixed** — no memory, no retry, no dynamic tools, no guardrails.

---

## Part 2: High-Value Patterns to Implement

These 12 patterns directly solve problems Cognivo has today. Ordered by impact.

### Tier A: Transform the Product (implement first)

---

#### Pattern 7: Context Compaction for Long-Running Agents
**Why it matters:** ai-chat currently sends ONLY the latest user message. No conversation history. Each request is isolated — users can't say "elaborate on that" or "now compare Q3."

**What to build:**
```
ContextBuilder
  .withConversationHistory(messages)   // ← NEW: pass prior turns
  .withDataset(data)
  .withMeta({ userQuestion })
  .build()
```

Keep the last N messages. When history gets long, summarize older turns into a system message (the compaction pattern). The LLM gets continuity without token explosion.

**Effort:** Small. Add `conversationHistory: Message[]` to `AiContext`, pass it in the prompt.

**Files:** `packages/core/src/context/types.ts`, `packages/adapter-openai/src/prompts.ts`, `packages/components/src/components/ai-chat/ai-chat.ts`

---

#### Pattern 50: Guardrail-as-Processor (Tripwire)
**Why it matters:** Zero safety layer. User input goes directly into the prompt. No output filtering. This is a P0 for any production AI product.

**What to build:**
- **Input guard:** Before calling OpenAI, check for prompt injection patterns, excessive length, known attack vectors
- **Output guard:** After parsing response, check for hallucinated confidence (always 0.95?), PII leakage, off-topic responses

```typescript
// Input pipeline
const guards = [
  promptInjectionGuard,    // Detect "ignore previous instructions"
  inputLengthGuard,        // Max 2000 chars
  rateLimitGuard,          // Max 10 requests/minute
];

// Output pipeline
const outputGuards = [
  confidenceRangeGuard,    // confidence must be 0-1
  hallucationGuard,        // Check explanation references actual data
];
```

**Effort:** Medium. Create a `GuardPipeline` in core that wraps `runIntent`.

**Files:** New `packages/core/src/guards/` directory

---

#### Pattern 45: Model Fallback Chains
**Why it matters:** If OpenAI is down or rate-limited, Cognivo fails completely. No retry, no fallback.

**What to build:**
```typescript
const client = new FallbackClient([
  new OpenAiClient({ model: 'gpt-4o-mini' }),      // Primary
  new OpenAiClient({ model: 'gpt-3.5-turbo' }),    // Cheaper fallback
  // Future: new AnthropicClient({ model: 'haiku' })
]);
```

On `RateLimitError` or timeout → try next provider. Log which model served each request.

**Effort:** Small. Wrap `AiClient` in a `FallbackClient` that iterates through a list.

**Files:** New `packages/core/src/client/fallback.ts`

---

#### Pattern 12: Self-Refine (Iterative Improvement)
**Why it matters:** The design-advisor's `recommend()` function uses a naive linear scoring system. An LLM could dramatically improve recommendation quality by critiquing and refining its own suggestions.

**What to build:**
```
Step 1: LLM generates initial bias recommendations for a design context
Step 2: LLM critiques: "Are these relevant? Did I miss obvious biases?"
Step 3: LLM refines based on self-critique
```

This turns the bias advisor from a keyword-matching engine into an intelligent design consultant.

**Effort:** Medium. New `packages/design-advisor/src/ai-recommend.ts` that calls `runIntent` twice (generate + refine).

---

### Tier B: Production Hardening (implement second)

---

#### Pattern 46: Model Routing (Cost Optimization)
**Why it matters:** Not every question needs GPT-4o. "What is anchoring bias?" is a simple lookup. "Analyze this 500-row dataset for anomalies" needs a powerful model.

**What to build:**
- Simple questions (definition lookups, short explanations) → `gpt-4o-mini` ($0.15/M)
- Complex questions (forecast, anomaly detection, multi-step analysis) → `gpt-4o` ($2.50/M)

Route based on: intent type + dataset size + question complexity.

**Effort:** Small. Add a `routeModel(intent, context)` function in the adapter.

**Files:** `packages/adapter-openai/src/router.ts`

---

#### Pattern 47: Semantic Caching
**Why it matters:** Users often ask similar questions about the same dataset. "Why did revenue drop?" and "Explain the revenue decline" should return the same cached response.

**What to build:**
- Hash `intent + dataset + question` → check cache
- For exact matches: return cached response instantly
- For semantic similarity (future): embed query, cosine similarity > 0.95 → return cached

Start with exact-match caching (trivial), graduate to semantic later.

**Effort:** Small for exact cache. Medium for semantic.

**Files:** New `packages/core/src/cache/` directory

---

#### Pattern 58: Provider Health & Circuit Breaker
**Why it matters:** If OpenAI has degraded performance (high latency, frequent errors), keep hammering it wastes time and money.

**What to build:**
- Track success/failure per provider over a sliding window
- After N failures in M seconds → circuit OPEN (reject immediately)
- After cooldown → HALF-OPEN (try one request)
- On success → CLOSED (resume normal)

**Effort:** Small. ~50 lines wrapping the API call.

**Files:** `packages/adapter-openai/src/health.ts`

---

#### Pattern 53: Observability Span Hierarchy
**Why it matters:** When a request fails or is slow, you need to know WHERE. Was it the prompt building? The API call? The response parsing?

**What to build:**
```
INTENT_RUN (root span)
  ├── CONTEXT_BUILD (1ms)
  ├── GUARD_INPUT (2ms)
  ├── PROMPT_BUILD (1ms)
  ├── API_CALL (3200ms)  ← bottleneck
  ├── RESPONSE_PARSE (1ms)
  └── GUARD_OUTPUT (1ms)
```

Log: intent, model, tokens_in, tokens_out, duration_ms, cost_usd, success/failure.

**Effort:** Medium. Create a `SpanCollector` that wraps each step.

**Files:** New `packages/core/src/observability/` directory

---

### Tier C: Differentiation (implement when ready to scale)

---

#### Pattern 61: Prompt Caching (KV Cache Reuse)
**Why it matters:** The system prompt + intent instructions are identical across requests. With Anthropic or OpenAI prompt caching, these tokens are processed once and reused — 50-90% cost reduction on the static prefix.

**What to build:** Order prompt content by stability:
1. System prompt (never changes) ← cache breakpoint
2. Intent instructions (per-intent, stable)
3. Dataset + user question (changes every request)

**Prerequisite:** Anthropic adapter (explicit `cache_control` breakpoints) or OpenAI (automatic prefix matching).

---

#### Pattern 62: Extended Thinking
**Why it matters:** Complex bias analysis (e.g., "audit this e-commerce checkout for manipulative patterns") benefits from the model thinking deeply before answering.

**What to build:**
```typescript
// For complex intents, enable thinking
if (intent === AiIntent.DETECT_ANOMALY || intent === AiIntent.OPTIMIZE) {
  options.thinking = { budget_tokens: 10000 };
}
```

**Prerequisite:** Anthropic adapter (Claude supports `thinking` blocks).

---

#### Pattern 37: Agent-as-Tool Delegation
**Why it matters:** A "design audit agent" could delegate to specialized sub-agents:
- Bias detection agent (uses the 180-bias registry)
- Accessibility agent (WCAG checks)
- Performance agent (layout/rendering analysis)
- Copy agent (tone, clarity, persuasion)

Each returns a focused report. The coordinator synthesizes into a full audit.

**Effort:** Large. This is a major architectural evolution.

---

#### Pattern 22: DSPy (Programming Not Prompting)
**Why it matters:** Cognivo's prompts in `prompts.ts` are hand-crafted templates. DSPy would let you declare `"dataset, question -> explanation, bullets, confidence"` and auto-optimize the prompt through evaluation.

**Practical value:** If you ever need to tune prompt quality systematically (A/B test prompts, optimize for specific metrics), DSPy replaces guesswork with measurement.

**Prerequisite:** Python-based workflow (DSPy is Python). Could be a separate evaluation pipeline.

---

## Part 3: Interesting but Not Yet Relevant

These patterns solve problems Cognivo doesn't have today. Note them for the future.

| # | Pattern | Why Not Yet | When It Becomes Relevant |
|---|---------|-------------|--------------------------|
| 9 | ReAct Loop | Cognivo doesn't need tool-calling loops yet | When agents browse designs, call APIs, iterate |
| 10 | Reflexion | No multi-attempt tasks | When agents retry failed analyses |
| 11 | Tree of Thoughts | Overkill for current intents | Complex multi-step reasoning tasks |
| 14 | Plan-and-Execute | No multi-step agent workflows | Full design audit with 10+ steps |
| 15 | LLM Compiler | No parallel tool execution needs | Multi-agent design review |
| 23 | Working Memory | No long-running agent sessions | Persistent design advisor sessions |
| 24 | Semantic Recall | No cross-session memory | "Remember what we discussed last week" |
| 25 | AUDN Memory | No fact management | User preference learning over time |
| 26 | MemGPT Tiered | No memory pressure | 100K+ conversation histories |
| 30 | RAPTOR | No document hierarchy | Searching across bias documentation |
| 34 | GraphRAG | No entity relationships in queries | "How do biases relate to each other?" |
| 38 | Swarm Handoffs | No multi-agent system | Specialized agent teams |
| 39 | Graph Orchestration | No complex workflows | Multi-step audit pipelines |
| 40 | Role-Based Crews | No role specialization | "Senior UX reviewer" + "Junior dev" agents |
| 41 | Multi-Agent Debate | No consensus needs | Conflicting design recommendations |
| 42 | Mixture-of-Agents | No multi-model blending | Frontier quality from cheap models |
| 59 | A2A Protocol | No external agent communication | Federated design review services |
| 60 | MCP | No external tool ecosystem | Plugin marketplace |
| 64 | Computer Use | No GUI interaction | Screenshot-based design audit |

---

## Part 4: Implementation Roadmap

Based on the analysis, here's the recommended order:

### Phase 1: Core Resilience (Week 1)
1. **Conversation history** in ContextBuilder + ai-chat (Pattern 7)
2. **Input/output guardrails** (Pattern 50)
3. **Retry + fallback** (Pattern 45)

### Phase 2: Cost & Performance (Week 2)
4. **Model routing** by intent complexity (Pattern 46)
5. **Exact-match caching** (Pattern 47)
6. **Circuit breaker** (Pattern 58)

### Phase 3: Intelligence (Week 3)
7. **Self-refine** for bias recommendations (Pattern 12)
8. **Observability spans** (Pattern 53)

### Phase 4: Differentiation (Week 4+)
9. **Prompt caching** with Anthropic adapter (Pattern 61)
10. **Extended thinking** for complex analysis (Pattern 62)
11. **Agent delegation** for full design audits (Pattern 37)

---

## Part 5: Pattern-to-Package Mapping

Where each pattern lands in the monorepo:

| Pattern | Package | New or Modify |
|---------|---------|---------------|
| Conversation History | `core` + `adapter-openai` + `components` | Modify all 3 |
| Guardrails | `core` | New `src/guards/` |
| Fallback Client | `core` | New `src/client/fallback.ts` |
| Model Routing | `adapter-openai` | New `src/router.ts` |
| Caching | `core` | New `src/cache/` |
| Circuit Breaker | `adapter-openai` | New `src/health.ts` |
| Self-Refine | `design-advisor` | New `src/ai-recommend.ts` |
| Observability | `core` | New `src/observability/` |
| Prompt Caching | New `adapter-anthropic` | New package |
| Extended Thinking | `adapter-anthropic` | Same new package |
| Agent Delegation | `core` | New `src/agents/` |

---

## Appendix: Patterns That Don't Apply

| # | Pattern | Why |
|---|---------|-----|
| 2 | Dynamic Config | Cognivo is a library, not a multi-tenant SaaS — static config is fine |
| 3 | Request Context with Security Keys | No multi-tenant auth needed |
| 5 | Message List with Source Tracking | Overkill until conversation memory exists |
| 8 | Progressive Context Disclosure | No codebase exploration — data is passed explicitly |
| 13 | CRITIC (Tool-Verified) | No external verification tools for design analysis |
| 16 | Self-Consistency (Voting) | Too expensive for component-level AI calls |
| 18 | Multi-Source Tool Composition | Single tool source (OpenAI) |
| 20 | Tool Suspend/Resume | No human-approval workflows |
| 21 | Agent-Friendly Tool Design | No tools for agents to call |
| 27 | Generative Agents Memory | No persistent agent personas |
| 28 | Observational Memory | No long-term user modeling |
| 29 | Memory Decay | No memory system to decay |
| 31 | Corrective RAG | No RAG pipeline |
| 32 | Self-RAG | No retrieval system |
| 33 | Adaptive RAG | No RAG pipeline |
| 35 | Agentic RAG | No retrieval tools |
| 43 | Sub-Agent Architecture | No sub-agents |
| 48 | Workflow Suspend/Resume | No long-running workflows |
| 51 | Prompt Injection Defense | Covered by Guardrails (Pattern 50) |
| 52 | Constitutional AI | No RLHF/fine-tuning pipeline |
| 54 | Golden Dataset Testing | Good practice but not Cognivo-specific architecture |
| 55 | LLM-as-Judge | No evaluation pipeline yet |
| 56 | Composite Domain Storage | No database layer |
| 57 | Auto-Init Proxy | No storage initialization |
| 65 | Agentic Coding | Not a coding agent |
| 66 | Multi-Modal Agents | No vision input yet |
| 67 | OCTANE Prompt Framework | Useful at scale (20+ agents), premature now |
