#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { runAudit } from './commands/audit.js';
import { listComponents, getComponent } from './commands/components.js';
import { findTokens, tokenFor } from './commands/tokens.js';
import { runEvalsPassthrough } from './commands/evals.js';
import { runContext } from './commands/context.js';

const HELP = `cognivo — Cognivo design-system CLI

Usage:
  cognivo audit <file|-> [--json]   Audit HTML against Cognivo rules ('-' = stdin)
  cognivo components list [--category <id>] [--dense]
  cognivo components get <tag> [--json] [--dense]
  cognivo tokens find <query> [--dense]
  cognivo tokens for <css-property> [--dense]
  cognivo evals [run|live|replay] [flags]   (requires @cognivo/evals)
  cognivo context [--agent claude|cursor|codex|all] [--force] [--path <dir>]
  cognivo help

--dense: token-efficient one-line-per-entity output for AI context windows
`;

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString('utf8');
}

async function main(): Promise<number> {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === 'help' || command === '--help') {
    console.log(HELP);
    return 0;
  }

  if (command === 'audit') {
    const { values, positionals } = parseArgs({
      args: rest,
      allowPositionals: true,
      options: { json: { type: 'boolean', default: false } },
    });
    const file = positionals[0];
    if (!file) {
      console.error('audit: missing <file|-> argument');
      return 2;
    }
    const html = file === '-' ? await readStdin() : readFileSync(file, 'utf8');
    const r = runAudit(html, { json: values.json });
    console.log(r.text);
    return r.exitCode;
  }

  if (command === 'components') {
    const [sub, ...subRest] = rest;
    if (sub === 'list') {
      const { values } = parseArgs({
        args: subRest,
        allowPositionals: true,
        options: {
          category: { type: 'string' },
          dense: { type: 'boolean', default: false },
        },
      });
      const r = listComponents({
        ...(values.category ? { category: values.category } : {}),
        dense: values.dense,
      });
      console.log(r.text);
      return r.exitCode;
    }
    if (sub === 'get') {
      const { values, positionals } = parseArgs({
        args: subRest,
        allowPositionals: true,
        options: {
          json: { type: 'boolean', default: false },
          dense: { type: 'boolean', default: false },
        },
      });
      const tag = positionals[0];
      if (!tag) {
        console.error('components get: missing <tag> argument');
        return 2;
      }
      const r = getComponent(tag, { json: values.json, dense: values.dense });
      console.log(r.text);
      return r.exitCode;
    }
    console.error(`components: unknown subcommand "${sub ?? ''}" (expected list|get)`);
    return 2;
  }

  if (command === 'tokens') {
    const [sub, ...subRest] = rest;
    if (sub === 'find' || sub === 'for') {
      const { values, positionals } = parseArgs({
        args: subRest,
        allowPositionals: true,
        options: { dense: { type: 'boolean', default: false } },
      });
      const arg = positionals[0];
      if (!arg) {
        console.error(`tokens ${sub}: missing <${sub === 'find' ? 'query' : 'css-property'}> argument`);
        return 2;
      }
      const r = sub === 'find' ? findTokens(arg, { dense: values.dense }) : tokenFor(arg, { dense: values.dense });
      console.log(r.text);
      return r.exitCode;
    }
    console.error(`tokens: unknown subcommand "${sub ?? ''}" (expected find|for)`);
    return 2;
  }

  if (command === 'evals') {
    return runEvalsPassthrough(rest);
  }

  if (command === 'context') {
    const { values } = parseArgs({
      args: rest,
      allowPositionals: true,
      options: {
        agent: { type: 'string', default: 'all' },
        force: { type: 'boolean', default: false },
        path: { type: 'string' },
      },
    });
    const r = runContext({
      agent: values.agent as 'claude' | 'cursor' | 'codex' | 'all',
      force: values.force,
      ...(values.path ? { path: values.path } : {}),
    });
    console.log(r.text);
    return r.exitCode;
  }

  console.error(`Unknown command: ${command}\n\n${HELP}`);
  return 2;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  },
);
