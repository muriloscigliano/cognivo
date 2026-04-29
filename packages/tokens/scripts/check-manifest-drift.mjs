#!/usr/bin/env node
// Determinism check: run the manifest builder twice over the same source CSS
// and assert byte-identical output. Catches non-determinism in the build
// (e.g. an unsorted Map iteration that produces different reverse-map order
// between runs). Not a drift check against a committed baseline — `dist/` is
// gitignored, so the manifest is regenerated on every build anyway.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCss, buildManifest, buildReverseMap } from './manifest-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_CSS = path.resolve(__dirname, '..', 'dist', 'index.css');

const css = fs.readFileSync(SRC_CSS, 'utf-8');

function snapshot() {
  const parsed = parseCss(css);
  const m = buildManifest(parsed);
  const rev = Array.from(buildReverseMap(m.entries).entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  return JSON.stringify({ hash: m.hash, themes: m.themes, entries: m.entries, reverseMap: rev });
}

const a = snapshot();
const b = snapshot();

if (a !== b) {
  console.error(`[check-manifest-drift] NON-DETERMINISTIC OUTPUT — two runs over the same CSS produced different output. Investigate Map / Set iteration order in scripts/manifest-lib.mjs.`);
  process.exit(2);
}

console.log(`[check-manifest-drift] OK — manifest builder is deterministic over ${(a.length / 1024).toFixed(0)} KB of output.`);
