import type { Persona } from '../types/persona.js';

/**
 * Author a Persona. Enforces the three ethical guardrails baked into the data
 * model (Spec §8.6):
 *   1. Functional-only — we don't enforce identity at TS-level but we *require*
 *      a non-empty `framing` so the UI can always show what the persona means.
 *   2. Evidence required — at least one citation entry.
 *   3. Framing visible — `framing` must be a non-empty string.
 */
export function definePersona(persona: Persona): Persona {
  if (!persona.id || typeof persona.id !== 'string') {
    throw new Error('lens-core: definePersona() requires a non-empty id.');
  }
  if (!persona.framing || persona.framing.trim().length === 0) {
    throw new Error(
      `lens-core: definePersona(${persona.id}) requires a non-empty framing string (Spec §8.6).`
    );
  }
  if (!Array.isArray(persona.citations) || persona.citations.length === 0) {
    throw new Error(
      `lens-core: definePersona(${persona.id}) requires at least one citation (Spec §8.6).`
    );
  }
  if (!persona.evidenceLevel) {
    throw new Error(
      `lens-core: definePersona(${persona.id}) requires evidenceLevel.`
    );
  }
  return persona;
}
