import type { FixManifest } from '../types/fix.js';
import type { CheckResult, VerifierCheck } from './types.js';

/**
 * Token-validity check (Spec §9.4):
 * Suggested CSS must reference only `var(--cg-*)` tokens — no raw hex,
 * no banned tier-1 palette tokens, no untokenized values.
 */
const RAW_HEX_RE = /#[0-9a-fA-F]{3,8}\b/;
const RAW_RGB_RE = /\brgba?\([^)]*\)/i;
const BANNED_TIER1 = [
  '--cg-gray-',
  '--cg-red-',
  '--cg-blue-',
  '--cg-green-',
  '--cg-yellow-',
  '--cg-brand-ai-accent',
  '--cg-brand-primary-',
];

function runTokenValidity(manifest: FixManifest): CheckResult {
  const cssOverride = manifest.preview?.cssOverrides ?? '';
  const declarations = manifest.changes
    .filter((c) => /\.css|\.ts$/.test(c.path) || c.path.endsWith('.svelte'))
    .map((c) => c.after)
    .join('\n');

  const candidate = `${cssOverride}\n${declarations}`;

  if (RAW_HEX_RE.test(candidate)) {
    return {
      checkId: 'token-validity',
      passed: false,
      reason: 'Fix introduces a raw hex color. Use a var(--cg-color-*) token instead.',
    };
  }

  if (RAW_RGB_RE.test(candidate)) {
    return {
      checkId: 'token-validity',
      passed: false,
      reason: 'Fix introduces a raw rgb()/rgba() value. Use a var(--cg-color-*) token.',
    };
  }

  for (const banned of BANNED_TIER1) {
    if (candidate.includes(banned)) {
      return {
        checkId: 'token-validity',
        passed: false,
        reason: `Fix references banned tier-1 token "${banned}*". Use a tier-2 semantic token.`,
      };
    }
  }

  return { checkId: 'token-validity', passed: true };
}

export const checkTokenValidity: VerifierCheck = Object.assign(runTokenValidity, {
  checkId: 'token-validity' as const,
});
