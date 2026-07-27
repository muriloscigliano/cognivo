import { createRequire } from 'node:module';
import { auditPage } from '@cognivo/mcp-server/audit';
import { validateUsage } from '@cognivo/mcp-server/validate';
import type { CognivoCatalog } from '@cognivo/mcp-server/catalog-types';

const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

export interface AuditResult {
  exitCode: number; // 0 = pass, 1 = violations
  text: string;
}

/** Shared with the eval suite's deterministic scorer — same rules, same truth. */
export function runAudit(html: string, opts: { json?: boolean } = {}): AuditResult {
  const audit = auditPage({ html, strict: false });
  const usage = validateUsage(catalog, { html });
  const usageHasErrors = /### Errors \([1-9]/.test(usage);
  const valid = audit.valid && !usageHasErrors;

  if (opts.json) {
    return {
      exitCode: valid ? 0 : 1,
      text: JSON.stringify({ valid, issues: audit.issues, usageReport: usage }, null, 2),
    };
  }

  const lines: string[] = [];
  for (const i of audit.issues) lines.push(`${i.level.toUpperCase().padEnd(7)} [${i.rule}] <${i.tag}> ${i.message}`);
  if (!usage.startsWith('All clear')) lines.push(usage);
  lines.push(valid ? 'OK: markup follows Cognivo rules.' : 'FAIL: violations found.');
  return { exitCode: valid ? 0 : 1, text: lines.join('\n') };
}
