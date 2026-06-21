/**
 * Dynamic Software Interfaces — F0: shared contracts (single source of truth).
 *
 * Plan: ../plans/F0-contracts.md.  Build principle: no shortcuts — real types,
 * frozen before anything sits on them.
 *
 * The headline construct is FieldBinding: the typed reference an LLM emits
 * instead of a raw string. It is what makes the field firewall REAL (F1) rather
 * than a sentence in a prompt. A prop value that points at data is a FieldBinding;
 * the resolver (F1) refuses to bind a key that isn't in the dataset's fields[],
 * and the governance gate (F2) turns that refusal into a blocked render.
 */

// ─── Dataset (the L1 → L2 boundary; spec §3.1) ────────────────────────────────

export type FieldType = 'text' | 'date' | 'number' | 'bool' | 'enum' | 'url';

export interface FieldDef {
  /** Stable key the surface binds to, e.g. "subject". */
  key: string;
  type: FieldType;
  /** Human label, e.g. "Subject". */
  label: string;
  /** Allowed values when type === 'enum'. */
  enumValues?: string[];
}

export interface DatasetEnvelope<T = Record<string, unknown>> {
  /** e.g. "inbox.message.v1" — the surface keys its layout off this. */
  schemaId: string;
  /** The ONLY fields a surface may reference. The firewall is defined here. */
  fields: FieldDef[];
  items: T[];
  meta?: Record<string, unknown>;
}

// ─── Bound values (no more opaque strings) ────────────────────────────────────

/**
 * A typed reference to a dataset field. THE key new construct vs. the prototype.
 * An LLM emits `{ kind: 'field', key: 'subject' }`, never a bare "subject"
 * string the parser can't distinguish from literal display text.
 */
export interface FieldBinding {
  kind: 'field';
  key: string;
}

/** A literal value the surface displays as-is (not data-bound). */
export interface LiteralValue {
  kind: 'literal';
  value: string | number | boolean;
}

/** A prop value is exactly one of these — bindable or literal, never ambiguous. */
export type BoundValue = FieldBinding | LiteralValue;

// ─── Per-user artifact (the moat corpus; spec §3.2) ───────────────────────────

export interface InterfaceSpec {
  specId: string;
  userId: string;
  /** Must match the DatasetEnvelope it renders. */
  schemaId: string;
  /** Monotonic; owned by the L3 store. */
  version: number;
  /** The NL prompt that produced it ("make it a task list"). */
  intent: string;
  /** DSL source text — canonical, diffable, re-validatable (spec §3.2). */
  tree: string;
  /** Optional theme overrides (tier-2 tokens) from the theme generator. */
  themeOverride?: Record<string, unknown>;
  createdAt: string;
  /** Lineage for rollback / undo. */
  parentVersion?: number;
}

// ─── Structured governance rejection (F2 returns these) ───────────────────────

export type GovernanceCode =
  | 'unknown-component'
  | 'undeclared-field'
  | 'token-violation'
  | 'arity'
  | 'a11y'
  | 'parse';

export interface GovernanceRejection {
  code: GovernanceCode;
  /** Human-readable; surfaced to the user in plain language (vision §5.4). */
  message: string;
  /** Where in the tree, when known (e.g. component typeName or field key). */
  where?: string;
}

// ─── Factories + guards (the firewall predicate lives here) ───────────────────

export function field(key: string): FieldBinding {
  return { kind: 'field', key };
}

export function literal(value: string | number | boolean): LiteralValue {
  return { kind: 'literal', value };
}

export function isFieldBinding(v: unknown): v is FieldBinding {
  return (
    typeof v === 'object' &&
    v !== null &&
    (v as { kind?: unknown }).kind === 'field' &&
    typeof (v as { key?: unknown }).key === 'string'
  );
}

export function isLiteralValue(v: unknown): v is LiteralValue {
  if (typeof v !== 'object' || v === null) return false;
  const k = (v as { kind?: unknown }).kind;
  const val = (v as { value?: unknown }).value;
  return (
    k === 'literal' &&
    (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean')
  );
}

/**
 * The firewall predicate: is `key` a field this dataset actually declares?
 * F1 calls this at resolve time; F2 turns a false result into a blocked render.
 */
export function hasField(envelope: DatasetEnvelope, key: string): boolean {
  return envelope.fields.some((f) => f.key === key);
}

/** Look up a field definition, or undefined. */
export function getField(envelope: DatasetEnvelope, key: string): FieldDef | undefined {
  return envelope.fields.find((f) => f.key === key);
}
