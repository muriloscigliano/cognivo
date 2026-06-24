/**
 * Dynamic Software Interfaces — M0: the DataOp contract (governed middleware).
 * Plan: ../03-frontier-plan.md (Phase M). Design: multi-agent panel, holes folded in.
 *
 * Build principle: constrain-then-compose, one layer DOWN from components. The
 * agent composes a DataPipeline from a VENDOR-DECLARED, VALIDATED op set over
 * DatasetEnvelope.fields. A hard gate (M1 governPipeline) blocks anything outside
 * the declared set; the resolver (M1 resolvePipeline) runs it PURE and
 * DETERMINISTIC with NO code-eval.
 *
 * THE KEY MOVE vs. a naive design: there is no free-form expression anywhere.
 * `derive`/`aggregate` are CLOSED ENUMS of vendor-allowed pure built-ins. The
 * agent selects an op id + declared field; it cannot author logic. This is the
 * field firewall (F1) extended to OPERATIONS. This makes the essay's "modify
 * middleware on the fly" real AND safe.
 */

import {
  type DatasetEnvelope,
  type FieldDef,
  type LiteralValue,
  type GovernanceRejection,
} from './contracts.js';

// ─── The op vocabulary (closed sets — the agent picks, never authors) ─────────

export type DataOpKind = 'filter' | 'sort' | 'group' | 'derive' | 'aggregate' | 'limit';

/** Comparison operators for `filter`. Closed enum — no operator injection. */
export type FilterOperator =
  | 'eq' | 'neq'
  | 'lt' | 'lte' | 'gt' | 'gte'   // ordered types only (number, date)
  | 'in' | 'nin'                   // value ∈ enumValues set
  | 'contains'                     // text substring (case-insensitive)
  | 'isEmpty' | 'isNotEmpty';      // null / '' presence

/**
 * Vendor-allowed derive functions: a CLOSED enum of pure, deterministic
 * built-ins — NOT expressions. The agent picks an id; it cannot author one.
 */
export type DeriveFnId =
  | 'dateBucket'   // date → 'today' | 'this-week' | 'overdue' | 'later'
  | 'isOverdue'    // date → bool (date < now)
  | 'lowercase'    // text → text
  | 'wordCount'    // text → number
  | 'domainOf';    // url|email-text → text

/** Vendor-allowed aggregate functions. Closed enum; each over ONE field. */
export type AggregateFnId = 'count' | 'sum' | 'avg' | 'min' | 'max';

export type SortDirection = 'asc' | 'desc';

// ─── The ops (each names declared fields only) ────────────────────────────────

export interface FilterOp {
  kind: 'filter';
  field: string;
  operator: FilterOperator;
  /** Literal only — never a second binding (field-to-field compare deferred). */
  value?: LiteralValue;
}

export interface SortOp {
  kind: 'sort';
  field: string;
  direction: SortDirection;
}

export interface LimitOp {
  kind: 'limit';
  count: number; // capped at policy.maxRows by the gate
}

/** Append a NEW computed field per row via a closed built-in. */
export interface DeriveOp {
  kind: 'derive';
  fn: DeriveFnId;
  from: string; // source field
  as: string;   // new field key (must not collide)
}

/** Partition rows into named buckets; output is a derived collection. */
export interface GroupOp {
  kind: 'group';
  by: string;      // declared field or a prior derive's `as`
  keyAs: string;   // new field: the group key
  countAs: string; // new field: the group's row count
}

/** Collapse the collection to a single summary row of computed fields. */
export interface AggregateOp {
  kind: 'aggregate';
  entries: Array<{ fn: AggregateFnId; field: string; as: string }>;
}

export type DataOp = FilterOp | SortOp | LimitOp | DeriveOp | GroupOp | AggregateOp;

// ─── The pipeline (what the agent emits) ──────────────────────────────────────

export interface DataPipeline {
  /** Must equal the bound envelope's schemaId. */
  schemaId: string;
  /** Ordered ops, applied left → right. Length capped by policy. */
  ops: DataOp[];
  /**
   * The fields the pipeline CLAIMS to produce. The resolver PROVES the actual
   * output matches this; templates bind against it (M2). This is how derive/
   * group/aggregate stay compatible with the field firewall: a derived
   * collection still has a declared FieldDef[] to bind to.
   */
  outputSchema: FieldDef[];
}

// ─── Vendor capability declaration (per-field, default-deny) ──────────────────

/** What a vendor permits for ONE field. Absence of a grant = denied. */
export interface DataCapabilityGrant {
  field: string;
  ops: DataOpKind[];
  filterOperators?: FilterOperator[];
  deriveFns?: DeriveFnId[];
  aggregateFns?: AggregateFnId[];
}

/** Global limits — a hostile pipeline cannot exceed these. */
export interface DataPolicy {
  maxRows: number;
  maxOps: number;
  maxGroups: number;
}

/** The vendor's complete data-layer contract for a dataset. */
export interface DataManifest {
  schemaId: string;
  grants: DataCapabilityGrant[];
  policy: DataPolicy;
}

// ─── Results (mirror resolver.ts / governance.ts) ─────────────────────────────

export interface PipelineGovernResult {
  ok: boolean;
  rejections: GovernanceRejection[];
}

export interface PipelineResolveResult {
  /** A derived DatasetEnvelope — same shape, so templates bind unchanged. */
  output: DatasetEnvelope | null;
  rejections: GovernanceRejection[];
}

// ─── Factories + guards (firewall predicates, like contracts.ts) ──────────────

export function grantFor(manifest: DataManifest, field: string): DataCapabilityGrant | undefined {
  return manifest.grants.find((g) => g.field === field);
}

/** The op firewall predicate: does the vendor permit `kind` on `field`? */
export function permitsOp(manifest: DataManifest, field: string, kind: DataOpKind): boolean {
  return grantFor(manifest, field)?.ops.includes(kind) ?? false;
}

export function isDataOp(v: unknown): v is DataOp {
  const k = (v as { kind?: unknown })?.kind;
  return (
    typeof v === 'object' && v !== null &&
    (k === 'filter' || k === 'sort' || k === 'group' ||
      k === 'derive' || k === 'aggregate' || k === 'limit')
  );
}

/** Field types that support ordered comparison operators (lt/lte/gt/gte). */
export const ORDERED_TYPES = new Set(['number', 'date']);
export const ORDERED_OPERATORS = new Set<FilterOperator>(['lt', 'lte', 'gt', 'gte']);
export const NO_VALUE_OPERATORS = new Set<FilterOperator>(['isEmpty', 'isNotEmpty']);
