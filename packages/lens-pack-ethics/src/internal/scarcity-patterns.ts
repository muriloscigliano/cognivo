/**
 * Visible-text patterns that suggest unverifiable scarcity / urgency
 * claims commonly used to manufacture purchase pressure.
 *
 * The rule cannot verify whether the claim is true, so confidence stays
 * advisory. Consumers may add their own brand-specific patterns via a
 * future pack-config (post-v0.1).
 */
export const SCARCITY_PATTERNS: ReadonlyArray<{ regex: RegExp; label: string }> = [
  { regex: /only\s+\d+\s+(left|remaining|in\s+stock|available)/i, label: 'low-stock' },
  {
    regex: /\d+\s+(people|users|customers|others?)\s+(bought|purchased|are\s+viewing|are\s+looking)/i,
    label: 'social-pressure',
  },
  { regex: /selling\s+(fast|out\s+fast)/i, label: 'pace' },
  { regex: /limited\s+(time|stock|supply|edition|offer)/i, label: 'limited' },
  {
    regex: /\d+%\s+(off|discount)\s+(today|this\s+(hour|minute))/i,
    label: 'time-pressure-discount',
  },
  { regex: /(hurry|act\s+now|don[''']?t\s+miss)/i, label: 'urgency-call' },
];

export interface ScarcityMatch {
  label: string;
  text: string;
}

export function findScarcityClaims(text: string | undefined): ScarcityMatch[] {
  if (!text) return [];
  const out: ScarcityMatch[] = [];
  for (const { regex, label } of SCARCITY_PATTERNS) {
    const m = regex.exec(text);
    if (m) out.push({ label, text: m[0] });
  }
  return out;
}
