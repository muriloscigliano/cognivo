import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import type { CognivoCatalog } from '@cognivo/mcp-server/catalog-types';
import { formatComponentIndex, type CommandResult } from './components.js';
import { renderClaudeContext } from '../templates/context-claude.md.js';
import { renderCursorContext } from '../templates/context-cursor.js';
import { renderAgentsContext } from '../templates/context-agents.md.js';

const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

export const MARKER_PREFIX = '<!-- cognivo-context';

export type AgentKind = 'claude' | 'cursor' | 'codex';

const AGENT_FILES: Record<AgentKind, string> = {
  claude: 'CLAUDE.md',
  cursor: '.cursorrules',
  codex: 'AGENTS.md',
};

const AGENT_RENDERERS: Record<AgentKind, (core: string) => string> = {
  claude: renderClaudeContext,
  cursor: renderCursorContext,
  codex: renderAgentsContext,
};

// Self-check block mirrored from the repo root AGENTS.md, with the preamble
// adapted for consumers (the cognivo CLI replaces the repo-local skill docs).
const SELF_CHECK = `## Self-check before writing Cognivo UI code

Answer these before generating anything. If you can't answer all three, query
the Cognivo CLI (\`cognivo components get <tag>\`, \`cognivo tokens for <prop>\`)
BEFORE writing code:

1. Which component confirms a destructive action, and what makes it different
   from a generic modal? (\`cg-alert-dialog\` — \`alertdialog\` ARIA role and
   danger styling, vs. generic \`cg-modal\`.)
2. What's the correct token tier for text color — and which tier is banned in
   component CSS? (Tier 2 semantic like \`--cg-color-text-*\`; Tier 1 palette
   tokens like \`--cg-gray-*\` are banned.)
3. What prop does \`cg-input\` use for its accessible label? (\`label\`.)`;

function catalogVersion(cat: CognivoCatalog): string {
  const fromMeta = cat.meta?.version;
  if (typeof fromMeta === 'string' && fromMeta.length > 0) return fromMeta;
  const pkg = require('@cognivo/mcp-server/package.json') as { version: string };
  return pkg.version;
}

function buildCore(cat: CognivoCatalog): string {
  return `## Workflow

1. \`cognivo components list\` — find the right component (\`--dense\` for a compact index).
2. \`cognivo components get <tag>\` — read its props, events, and slots.
3. \`cognivo tokens for <css-property>\` — find the right token for any style.

## Rules

- Prefer \`cg-*\`/\`ai-*\` components over raw HTML elements.
- Never use raw hex or px values — use \`var(--cg-*)\` design tokens.
- Tier 1 palette tokens (\`--cg-gray-*\`, \`--cg-blue-*\`, ...) are banned in
  component CSS; use Tier 2 semantic tokens (\`--cg-color-text-*\`, ...).
- Run \`cognivo audit <file>\` on generated markup before finishing.

${SELF_CHECK}

## Component index

${formatComponentIndex(cat)}`;
}

/**
 * Pure: full file content for one agent, including the version marker header.
 */
export function generateContext(agent: AgentKind, cat: CognivoCatalog, version: string): string {
  return `${MARKER_PREFIX} v${version} -->\n${AGENT_RENDERERS[agent](buildCore(cat))}`;
}

export interface ContextOptions {
  agent: AgentKind | 'all';
  force?: boolean;
  path?: string;
}

export function runContext(opts: ContextOptions): CommandResult {
  const agents: AgentKind[] =
    opts.agent === 'all' ? ['claude', 'cursor', 'codex'] : [opts.agent];
  if (agents.some((a) => !(a in AGENT_FILES))) {
    return {
      exitCode: 2,
      text: `Unknown agent "${opts.agent}". Expected claude|cursor|codex|all.`,
    };
  }

  const dir = resolve(opts.path ?? process.cwd());
  mkdirSync(dir, { recursive: true });
  const version = catalogVersion(catalog);
  const lines: string[] = [];

  for (const agent of agents) {
    const file = join(dir, AGENT_FILES[agent]);
    const content = generateContext(agent, catalog, version);
    if (existsSync(file)) {
      const existing = readFileSync(file, 'utf8');
      if (!existing.includes(MARKER_PREFIX)) {
        if (!opts.force) {
          lines.push(
            `skip ${AGENT_FILES[agent]} — exists without the cognivo-context marker (use --force to overwrite)`,
          );
          continue;
        }
        writeFileSync(file, content);
        lines.push(`overwrite ${AGENT_FILES[agent]} — forced over a file without the marker`);
        continue;
      }
      writeFileSync(file, content);
      lines.push(`regenerated ${AGENT_FILES[agent]}`);
      continue;
    }
    writeFileSync(file, content);
    lines.push(`wrote ${AGENT_FILES[agent]}`);
  }

  return { exitCode: 0, text: lines.join('\n') };
}
