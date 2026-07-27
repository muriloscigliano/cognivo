import { createRequire } from 'node:module';
import { auditPage } from '@cognivo/mcp-server/audit';
import { validateUsage } from '@cognivo/mcp-server/validate';
import type { CognivoCatalog } from '@cognivo/mcp-server/catalog-types';

export interface DeterministicScore {
  pass: boolean;
  /** Human-readable issue lines (severity-prefixed). */
  issues: string[];
}

// createRequire sidesteps tsconfig JSON-import-attribute config differences.
const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

/**
 * The mechanical grader: generated output must pass the same audit/validate
 * rules the MCP server enforces for interactive agents. Errors fail the
 * sample; warnings are reported but tolerated (tune here if noise builds).
 */
export function scoreDeterministic(html: string): DeterministicScore {
  const issues: string[] = [];

  const audit = auditPage({ html, strict: false });
  for (const i of audit.issues) {
    issues.push(`${i.level}: [${i.rule}] <${i.tag}> ${i.message}`);
  }

  const usage = validateUsage(catalog, { html });
  if (!usage.startsWith('All clear')) {
    for (const line of usage.split('\n')) {
      const trimmed = line.replace(/^\d+\.\s*/, '').trim();
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('- Use')) {
        // validateUsage doesn't machine-tag severity; its "Errors" section
        // precedes "Warnings". Treat error-section lines as errors.
        issues.push(trimmed);
      }
    }
  }

  const hasError =
    audit.issues.some((i) => i.level === 'error') ||
    /### Errors \([1-9]/.test(usage);

  return { pass: !hasError, issues };
}
