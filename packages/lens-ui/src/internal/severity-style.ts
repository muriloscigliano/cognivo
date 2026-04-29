import type { Severity } from '@cognivo/lens-core';

/**
 * Map a finding severity to the Cognivo design token that styles its pin /
 * badge color. We use the `*-text-default` tokens (saturated, visible) per
 * CLAUDE Semantic Rule 2 — `*-background-*` is too translucent to read on a
 * crowded page.
 */
const SEVERITY_TOKEN: Record<Severity, string> = {
  blocker: 'var(--cg-color-status-error-text-default, #ef4444)',
  strong: 'var(--cg-color-status-warning-text-default, #f59e0b)',
  consider: 'var(--cg-color-status-info-text-default, #3b82f6)',
  positive: 'var(--cg-color-status-success-text-default, #22c55e)',
};

const SEVERITY_LABEL: Record<Severity, string> = {
  blocker: 'Blocker',
  strong: 'Strong',
  consider: 'Consider',
  positive: 'Positive',
};

const SEVERITY_RANK: Record<Severity, number> = {
  blocker: 0,
  strong: 1,
  consider: 2,
  positive: 3,
};

export function severityColor(severity: Severity): string {
  return SEVERITY_TOKEN[severity];
}

export function severityLabel(severity: Severity): string {
  return SEVERITY_LABEL[severity];
}

export function severityRank(severity: Severity): number {
  return SEVERITY_RANK[severity];
}
