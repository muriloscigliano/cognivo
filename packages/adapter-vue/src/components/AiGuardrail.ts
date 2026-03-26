import { createVueWrapper } from '../create-wrapper.js';
export const AiGuardrail = createVueWrapper('ai-guardrail', {
  status: { type: [String, Array, Object, Number, Boolean] },
  checks: { type: [String, Array, Object, Number, Boolean] },
  blockedContent: { type: [String, Array, Object, Number, Boolean] },
  allowOverride: { type: [String, Array, Object, Number, Boolean] },
  severityLevel: { type: [String, Array, Object, Number, Boolean] },
}, {});
