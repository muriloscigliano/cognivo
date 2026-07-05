import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cognivoLibrary } from '../cognivo-library.js';

// ─────────────────────────────────────────────────────────────────────────────
// Registry ⇄ component-directory parity
//
// Component directory names in packages/components/src/components/ are exactly
// their custom-element tag names (cg-*, ai-*, bias-*). This test keeps
// cognivo-library.ts honest in both directions:
//   1. No orphans — every registered tagName has a real component behind it
//      (an LLM emitting an unregistered tag gets the Unknown fallback).
//   2. No gaps — every shipped component is generatable, unless deliberately
//      excluded via ALLOWLIST below.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Component directories that intentionally have NO gen-ui registration.
 * Keep this list SHORT and justify every entry — an entry here means an LLM
 * can never emit that component.
 *
 * Currently empty: even behavior primitives (cg-portal, cg-focus-scope,
 * cg-visually-hidden) are registered so generated trees can use them for
 * a11y and overlay composition.
 */
const ALLOWLIST: string[] = [];

const componentsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../..',
  'components/src/components',
);

const componentTags = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const registeredTags = Object.values(cognivoLibrary.components)
  .map((def) => def.tagName)
  .sort();

describe('registry parity', () => {
  it('found the components package (sanity)', () => {
    expect(componentTags.length).toBeGreaterThan(100);
  });

  it('has no duplicate tagNames in the registry', () => {
    const seen = new Set<string>();
    const dupes = registeredTags.filter((tag) => {
      if (seen.has(tag)) return true;
      seen.add(tag);
      return false;
    });
    expect(dupes).toEqual([]);
  });

  it('every registered tagName exists as a component directory (no orphans)', () => {
    const dirSet = new Set(componentTags);
    const orphans = registeredTags.filter((tag) => !dirSet.has(tag));
    expect(orphans).toEqual([]);
  });

  it('every component directory is registered (or explicitly allowlisted)', () => {
    const registeredSet = new Set(registeredTags);
    const missing = componentTags.filter(
      (tag) => !registeredSet.has(tag) && !ALLOWLIST.includes(tag),
    );
    expect(missing).toEqual([]);
  });

  it('ALLOWLIST contains no stale entries (registered or nonexistent tags)', () => {
    const dirSet = new Set(componentTags);
    const registeredSet = new Set(registeredTags);
    const stale = ALLOWLIST.filter(
      (tag) => registeredSet.has(tag) || !dirSet.has(tag),
    );
    expect(stale).toEqual([]);
  });
});
