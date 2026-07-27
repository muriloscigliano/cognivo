#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { runAudit } from './commands/audit.js';
import { listComponents, getComponent } from './commands/components.js';
import { findTokens, tokenFor } from './commands/tokens.js';

const HELP = `cognivo — Cognivo design-system CLI

Usage:
  cognivo audit <file|-> [--json]   Audit HTML against Cognivo rules ('-' = stdin)
  cognivo components list [--category <id>]
  cognivo components get <tag> [--json]
  cognivo tokens find <query>
  cognivo tokens for <css-property>
  cognivo evals [run|live|replay] [flags]   (requires @cognivo/evals)
  cognivo help
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
        options: { category: { type: 'string' } },
      });
      const r = listComponents(values.category ? { category: values.category } : {});
      console.log(r.text);
      return r.exitCode;
    }
    if (sub === 'get') {
      const { values, positionals } = parseArgs({
        args: subRest,
        allowPositionals: true,
        options: { json: { type: 'boolean', default: false } },
      });
      const tag = positionals[0];
      if (!tag) {
        console.error('components get: missing <tag> argument');
        return 2;
      }
      const r = getComponent(tag, { json: values.json });
      console.log(r.text);
      return r.exitCode;
    }
    console.error(`components: unknown subcommand "${sub ?? ''}" (expected list|get)`);
    return 2;
  }

  if (command === 'tokens') {
    const [sub, ...subRest] = rest;
    if (sub === 'find' || sub === 'for') {
      const { positionals } = parseArgs({ args: subRest, allowPositionals: true, options: {} });
      const arg = positionals[0];
      if (!arg) {
        console.error(`tokens ${sub}: missing <${sub === 'find' ? 'query' : 'css-property'}> argument`);
        return 2;
      }
      const r = sub === 'find' ? findTokens(arg) : tokenFor(arg);
      console.log(r.text);
      return r.exitCode;
    }
    console.error(`tokens: unknown subcommand "${sub ?? ''}" (expected find|for)`);
    return 2;
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
