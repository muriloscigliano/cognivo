import { createWrapper } from '../create-wrapper.js';
export const AiGuardrail = /* @__PURE__ */ createWrapper('ai-guardrail', ['status', 'checks', 'blockedContent', 'allowOverride', 'severityLevel'],
  {
    onReveal: 'ai-guardrail-reveal',
    onReport: 'ai-guardrail-report',
    onOverride: 'ai-guardrail-override',
  }
);
