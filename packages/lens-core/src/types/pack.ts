import type { Rule } from './rule.js';
import type { PageIntent } from './classifier.js';

/** A loadable rule import — kept lazy for code-splitting. */
export type LazyRule = () => Promise<{ default: Rule }>;

/** The pack manifest authored via `definePack()`. */
export interface RulePack {
  id: string;
  version: string;
  title: string;
  description?: string;
  /** Which intents the pack tunes against (helps the engine prioritize). */
  intents: PageIntent[];
  /** Lazy rule loaders. */
  rules: LazyRule[];
  /** Optional pack-wide config schema (Zod-shaped) — kept opaque to avoid coupling. */
  config?: { parse(input: unknown): unknown };
}
