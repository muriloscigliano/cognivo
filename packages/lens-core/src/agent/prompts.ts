import type { Finding } from '../types/findings.js';

/**
 * The system prompt baked into every LLM call. Bounds what the model can
 * say: plain language, no fabricated citations, structured fix output.
 *
 * v0.1 keeps this internal — no consumer override. When a use case
 * surfaces (e.g. brand-voice override), v0.2 will add a CustomPromptHook.
 */
export const LENS_SYSTEM_PROMPT = `You are a UX + accessibility audit assistant.
You explain web-page findings to designers and engineers.
Rules you must follow:
1. Plain language. No jargon without one-line definitions.
2. Never fabricate citations. Only repeat citations supplied to you.
3. When asked for a fix, output ONLY a JSON object matching the supplied
   schema. No prose around it. No markdown fences.
4. Cite uncertainty. If you don't know whether a fix applies, say so —
   don't guess.
5. Keep explanations under 120 words.`;

/**
 * Format a Finding into a self-contained context block the LLM can act on.
 * Stable across runs (no clocks / random IDs interpolated) so cassette
 * recordings stay deterministic.
 */
export function formatFindingContext(finding: Finding): string {
  const lines = [
    `Finding ID: ${finding.id}`,
    `Rule: ${finding.ruleId}`,
    `Severity: ${finding.severity}`,
    `Confidence: ${finding.confidence}`,
    `Category: ${finding.category}`,
    `Target node: ${finding.targetNodeId}`,
    ``,
    `Message: ${finding.message}`,
    `Why: ${finding.why}`,
  ];
  if (finding.citations.length > 0) {
    lines.push(``, `Citations: ${finding.citations.join(', ')}`);
  }
  if (finding.fixHint !== undefined) {
    lines.push(``, `Suggested-fix hint (deterministic):`, JSON.stringify(finding.fixHint, null, 2));
  }
  return lines.join('\n');
}

/**
 * Build the user prompt for `explain(finding)`. Streams when the AiClient
 * supports streaming.
 */
export function buildExplainPrompt(finding: Finding): string {
  return `Explain this audit finding to a designer who is unfamiliar with the rule:

${formatFindingContext(finding)}

Write 2–4 sentences. No bullet points. No markdown.`;
}

/**
 * Build the user prompt for `suggestFix(finding)`. The output must be
 * valid JSON matching FixManifest. Internal callers parse via
 * parseFixManifest() — that parser throws loudly on shape errors so the
 * LLM's mistakes don't leak.
 */
export function buildSuggestFixPrompt(finding: Finding): string {
  return `Propose a structured fix for this finding:

${formatFindingContext(finding)}

Output ONLY a JSON object matching this schema:

{
  "findingId": "<the Finding ID above>",
  "change": {
    "kind": "set-attribute" | "replace-text" | "set-style" | "replace-token",
    "selector": "<CSS selector for the target>",
    // …kind-specific fields:
    //   set-attribute: { "attribute": "alt", "value": "Description" }
    //   replace-text:  { "from": "old", "to": "new" }
    //   set-style:     { "declarations": { "color": "rgb(…)" } }
    //   replace-token: { "property": "color", "from": "--cg-old", "to": "--cg-new" }
  },
  "summary": "<one-line confirmation message>",
  "rationale": "<2–3 sentences>",
  "confidence": <0–100 integer>,
  "generatedAt": "<ISO-8601 timestamp>"
}

If no deterministic fix is possible (judgment-category), output:
{ "findingId": "...", "change": null, "summary": "Judgment call — no automatic fix", "rationale": "...", "confidence": 0, "generatedAt": "..." }`;
}
