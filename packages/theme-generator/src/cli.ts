#!/usr/bin/env node
/**
 * cognivo-theme CLI — deterministic, zero-dep.
 *
 * Usage:
 *   cognivo-theme "<description>" [--dark] [--raw]
 *
 * Flags:
 *   --dark   Prefer a dark-mode palette when available.
 *   --raw    Emit the raw Palette object instead of tier-2 tokens.
 *   --help   Print usage.
 *
 * On success, writes JSON to stdout (no extra framing) so consumers can pipe
 * into a file. On error, writes a human message to stderr and exits non-zero.
 */
import { generateTheme } from './index.js';

function printUsage(stream: NodeJS.WriteStream): void {
  stream.write(
    'Usage: cognivo-theme "<description>" [--dark] [--raw]\n' +
      '\n' +
      'Examples:\n' +
      '  cognivo-theme "warm ocean professional"\n' +
      '  cognivo-theme "cyberpunk neon" --dark\n' +
      '  cognivo-theme "forest calm" --raw\n',
  );
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  printUsage(process.stdout);
  process.exit(0);
}

const darkFlag = args.includes('--dark');
const rawFlag = args.includes('--raw');
const description = args.filter((a) => !a.startsWith('--')).join(' ').trim();

if (!description) {
  printUsage(process.stderr);
  process.exit(1);
}

try {
  const theme = generateTheme({
    description,
    preferDark: darkFlag,
    raw: rawFlag,
  });
  process.stdout.write(`${JSON.stringify(theme, null, 2)}\n`);
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  process.stderr.write(`cognivo-theme: ${msg}\n`);
  process.exit(2);
}
