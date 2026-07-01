#!/usr/bin/env node
/**
 * verify-publish.mjs — publish-integrity preflight.
 *
 * WHY THIS EXISTS: @cognivo/components@0.8.0 shipped to npm depending on
 * @cognivo/core@0.4.0, but core was never published — so every consumer
 * `npm install @cognivo/components` 404s. A client hit this. This script makes
 * that class of failure impossible to ship again.
 *
 * It checks, for every PUBLIC workspace package:
 *   1. It builds an output (dist/ present, `files` allowlist non-empty).
 *   2. Every @cognivo/* dependency it declares is EITHER also being published
 *      in this run OR already exists on npm at the required version.
 *   3. No raw `workspace:*` / `link:` specifier survives into what would ship
 *      (guards against `npm publish` bypassing pnpm/changesets rewriting).
 *
 * Run BEFORE publishing:  node scripts/verify-publish.mjs
 * Exit non-zero on any integrity problem, with a plain-English report.
 *
 * No network writes. Read-only npm registry lookups only.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkgsDir = join(root, 'packages');

/** Read every workspace package.json under packages/. */
function loadPackages() {
  const out = [];
  for (const name of readdirSync(pkgsDir)) {
    const pj = join(pkgsDir, name, 'package.json');
    if (!existsSync(pj)) continue;
    try {
      const json = JSON.parse(readFileSync(pj, 'utf8'));
      out.push({ dir: join(pkgsDir, name), json });
    } catch {
      out.push({ dir: join(pkgsDir, name), json: null, parseError: pj });
    }
  }
  return out;
}

/** npm registry version lookup; null if 404/unpublished. Cached. */
const npmCache = new Map();
function npmVersions(name) {
  if (npmCache.has(name)) return npmCache.get(name);
  let versions = [];
  try {
    const out = execSync(`npm view ${name} versions --json 2>/dev/null`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const parsed = JSON.parse(out);
    versions = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    versions = []; // 404 / never published
  }
  npmCache.set(name, versions);
  return versions;
}

const pkgs = loadPackages();
const problems = [];
const warnings = [];

// The set of @cognivo/* names that are PUBLIC (would be published this run).
const publicNames = new Set(
  pkgs.filter((p) => p.json && p.json.private !== true).map((p) => p.json.name),
);
const localVersion = new Map(pkgs.filter((p) => p.json).map((p) => [p.json.name, p.json.version]));

for (const { dir, json, parseError } of pkgs) {
  if (parseError) {
    problems.push(`Unparseable package.json: ${parseError}`);
    continue;
  }
  if (json.private === true) continue; // private packages never publish — skip.

  const label = `${json.name}@${json.version}`;

  // 1. Build output present.
  const distPath = join(dir, 'dist');
  const hasDist = existsSync(distPath) && statSync(distPath).isDirectory();
  if (!hasDist) {
    problems.push(`${label}: no dist/ — run the build before publishing.`);
  }
  if (!Array.isArray(json.files) || json.files.length === 0) {
    problems.push(`${label}: empty or missing "files" — the tarball may ship nothing or everything.`);
  }

  // 2 + 3. Every @cognivo/* dep must be publishable-consistent.
  const allDeps = { ...(json.dependencies || {}), ...(json.peerDependencies || {}) };
  for (const [depName, spec] of Object.entries(allDeps)) {
    if (!depName.startsWith('@cognivo/')) continue;

    // A raw workspace/link spec means whatever publishes this didn't rewrite it.
    const raw = String(spec);
    const isWorkspace = raw.startsWith('workspace:') || raw.startsWith('link:');

    // The version this dep will resolve to once published: for workspace:*,
    // it's the sibling's local version (what pnpm/changesets writes on publish).
    const resolvedVersion = isWorkspace ? localVersion.get(depName) : raw.replace(/^[\^~]/, '');

    const publishedThisRun = publicNames.has(depName);
    const onNpm = npmVersions(depName);
    const satisfiedOnNpm = resolvedVersion && onNpm.includes(resolvedVersion);

    if (!publishedThisRun && onNpm.length === 0) {
      problems.push(
        `${label}: depends on ${depName} (${raw}) which is NOT on npm and NOT in this workspace as public — install will 404.`,
      );
    } else if (!publishedThisRun && !satisfiedOnNpm) {
      problems.push(
        `${label}: needs ${depName}@${resolvedVersion}, but npm only has [${onNpm.join(', ') || 'none'}] — version gap will break install.`,
      );
    } else if (publishedThisRun && !isWorkspace) {
      warnings.push(
        `${label}: pins ${depName}@${raw} by exact version but it's a workspace sibling — prefer workspace:* so publish keeps them in lockstep.`,
      );
    }
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
const line = '─'.repeat(72);
console.log(line);
console.log('  @cognivo publish-integrity preflight');
console.log(line);
console.log(`  public packages checked: ${publicNames.size}`);
for (const w of warnings) console.log(`  ⚠️  ${w}`);
if (problems.length === 0) {
  console.log('  ✅ No integrity problems. Safe to publish (with pnpm/changesets).');
  console.log(line);
  process.exit(0);
}
console.log(`  ❌ ${problems.length} blocking problem(s):`);
for (const p of problems) console.log(`     • ${p}`);
console.log(line);
console.log('  Publishing now would ship a broken/partial release. Fix the above first.');
process.exit(1);
