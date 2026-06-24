/**
 * Dynamic Software Interfaces — M1: pipeline governance + execution.
 * Plan: ../03-frontier-plan.md (Phase M). Design: multi-agent panel.
 *
 * governPipeline(): validate a DataPipeline BEFORE it runs — fail-closed,
 *   collect-all (never early-stop), structured GovernanceRejection codes.
 * resolvePipeline(): execute a GOVERNED pipeline over live data — PURE, no eval,
 *   no I/O, no clock except an injected `now` (deterministic + testable). It
 *   re-governs internally and returns output:null on any rejection (defense in
 *   depth, mirroring how govern() re-calls resolveTree). Output is a
 *   DatasetEnvelope whose fields === the proven outputSchema, so the template
 *   resolver binds it with ZERO changes.
 */

import { type DatasetEnvelope, type FieldDef, type GovernanceRejection } from './contracts.js';
import {
  type DataPipeline,
  type DataOp,
  type DataManifest,
  type FilterOp,
  type DeriveOp,
  type GroupOp,
  type AggregateOp,
  type PipelineGovernResult,
  type PipelineResolveResult,
  grantFor,
  ORDERED_TYPES,
  ORDERED_OPERATORS,
  NO_VALUE_OPERATORS,
} from './data-op.js';

// Derived-field output types for each closed built-in (used to prove outputSchema).
const DERIVE_OUTPUT: Record<DeriveOp['fn'], FieldDef['type']> = {
  dateBucket: 'enum',
  isOverdue: 'bool',
  lowercase: 'text',
  wordCount: 'number',
  domainOf: 'text',
};
const AGGREGATE_OUTPUT_NUMERIC = new Set(['count', 'sum', 'avg']);

// ─── Governance ───────────────────────────────────────────────────────────────

/**
 * Track the "live schema" as ops add fields (derive/group/aggregate). A field
 * reference is valid if it's in the live schema; an `as` output key must be new.
 */
function liveKeys(env: DatasetEnvelope): Set<string> {
  return new Set(env.fields.map((f) => f.key));
}

export function governPipeline(
  pipeline: DataPipeline,
  env: DatasetEnvelope,
  manifest: DataManifest,
): PipelineGovernResult {
  const rejections: GovernanceRejection[] = [];
  const reject = (code: GovernanceRejection['code'], message: string, where?: string) =>
    rejections.push({ code, message, where });

  if (pipeline.schemaId !== env.schemaId) {
    reject('parse', `Pipeline schemaId "${pipeline.schemaId}" != dataset "${env.schemaId}".`);
  }
  if (pipeline.ops.length > manifest.policy.maxOps) {
    reject('arity', `Pipeline has ${pipeline.ops.length} ops > policy max ${manifest.policy.maxOps}.`);
  }

  const keys = liveKeys(env);
  const fieldType = (k: string): FieldDef['type'] | undefined =>
    env.fields.find((f) => f.key === k)?.type;

  const requireField = (k: string, where: string): boolean => {
    if (!keys.has(k)) { reject('undeclared-field', `Field "${k}" is not available at this step.`, where); return false; }
    return true;
  };
  const requirePermit = (field: string, kind: DataOp['kind'], where: string): boolean => {
    const g = grantFor(manifest, field);
    if (!g || !g.ops.includes(kind)) {
      reject('parse', `Vendor does not permit "${kind}" on field "${field}".`, where);
      return false;
    }
    return true;
  };

  for (const op of pipeline.ops) {
    switch (op.kind) {
      case 'filter': {
        const where = `filter:${op.field}`;
        if (requireField(op.field, where) && requirePermit(op.field, 'filter', where)) {
          const g = grantFor(manifest, op.field)!;
          if (g.filterOperators && !g.filterOperators.includes(op.operator)) {
            reject('parse', `Operator "${op.operator}" not permitted on "${op.field}".`, where);
          }
          if (ORDERED_OPERATORS.has(op.operator) && !ORDERED_TYPES.has(fieldType(op.field) ?? '')) {
            reject('parse', `Ordered operator "${op.operator}" needs an ordered field; "${op.field}" is ${fieldType(op.field)}.`, where);
          }
          if (!NO_VALUE_OPERATORS.has(op.operator) && op.value === undefined) {
            reject('parse', `Operator "${op.operator}" requires a value.`, where);
          }
        }
        break;
      }
      case 'sort': {
        const where = `sort:${op.field}`;
        if (requireField(op.field, where)) requirePermit(op.field, 'sort', where);
        break;
      }
      case 'limit': {
        if (op.count > manifest.policy.maxRows) {
          reject('parse', `limit ${op.count} > policy maxRows ${manifest.policy.maxRows}.`, 'limit');
        }
        if (op.count < 0) reject('parse', 'limit must be non-negative.', 'limit');
        break;
      }
      case 'derive': {
        const where = `derive:${op.from}->${op.as}`;
        if (requireField(op.from, where) && requirePermit(op.from, 'derive', where)) {
          const g = grantFor(manifest, op.from)!;
          if (g.deriveFns && !g.deriveFns.includes(op.fn)) {
            reject('parse', `derive fn "${op.fn}" not permitted on "${op.from}".`, where);
          }
        }
        if (keys.has(op.as)) reject('parse', `derive output "${op.as}" collides with an existing field.`, where);
        else keys.add(op.as); // now available to later ops
        break;
      }
      case 'group': {
        const where = `group:${op.by}`;
        if (requireField(op.by, where)) requirePermit(op.by, 'group', where);
        for (const k of [op.keyAs, op.countAs]) {
          if (keys.has(k)) reject('parse', `group output "${k}" collides with an existing field.`, where);
        }
        // after group, the shape is (keyAs, countAs) — replace the live keys
        keys.clear(); keys.add(op.keyAs); keys.add(op.countAs);
        break;
      }
      case 'aggregate': {
        const where = 'aggregate';
        const out = new Set<string>();
        for (const e of op.entries) {
          if (requireField(e.field, where) && requirePermit(e.field, 'aggregate', where)) {
            const g = grantFor(manifest, e.field)!;
            if (g.aggregateFns && !g.aggregateFns.includes(e.fn)) {
              reject('parse', `aggregate fn "${e.fn}" not permitted on "${e.field}".`, where);
            }
          }
          if (out.has(e.as)) reject('parse', `aggregate output "${e.as}" duplicated.`, where);
          out.add(e.as);
        }
        keys.clear(); for (const k of out) keys.add(k);
        break;
      }
      default:
        reject('unknown-component', `Unknown op kind.`, 'pipeline');
    }
  }

  // Prove outputSchema matches the live keys after all ops.
  const declared = new Set(pipeline.outputSchema.map((f) => f.key));
  for (const k of keys) if (!declared.has(k)) reject('parse', `outputSchema is missing produced field "${k}".`, 'outputSchema');
  for (const f of pipeline.outputSchema) if (!keys.has(f.key)) reject('parse', `outputSchema declares "${f.key}" the ops do not produce.`, 'outputSchema');

  return { ok: rejections.length === 0, rejections };
}

// ─── Execution (pure; injected `now`) ─────────────────────────────────────────

type Row = Record<string, unknown>;

function deriveValue(fn: DeriveOp['fn'], v: unknown, now: Date): unknown {
  switch (fn) {
    case 'isOverdue': return v != null && new Date(String(v)).getTime() < now.getTime();
    case 'dateBucket': {
      if (v == null) return 'later';
      const t = new Date(String(v)).getTime();
      const day = 86_400_000;
      const diff = t - now.getTime();
      if (diff < 0) return 'overdue';
      if (diff < day) return 'today';
      if (diff < 7 * day) return 'this-week';
      return 'later';
    }
    case 'lowercase': return String(v ?? '').toLowerCase();
    case 'wordCount': return String(v ?? '').trim() === '' ? 0 : String(v).trim().split(/\s+/).length;
    case 'domainOf': { const s = String(v ?? ''); const at = s.indexOf('@'); return at >= 0 ? s.slice(at + 1) : s; }
  }
}

/**
 * Type-correct comparator (audit H2). The comparison strategy is fixed by the
 * DECLARED field type, never by the runtime JS type of one operand — so
 * [10, 9, "100", 2] no longer sorts lexicographically because one value is a
 * string. number → numeric; date → epoch; text/enum → locale string.
 */
function compareTyped(a: unknown, b: unknown, type: FieldDef['type'] | undefined): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (type === 'number') return Number(a) - Number(b);
  if (type === 'date') return new Date(String(a)).getTime() - new Date(String(b)).getTime();
  return String(a).localeCompare(String(b));
}

function applyFilter(rows: Row[], op: FilterOp, type: FieldDef['type'] | undefined): Row[] {
  const want = op.value?.value;
  return rows.filter((r) => {
    const v = r[op.field];
    switch (op.operator) {
      case 'eq': return v === want;
      case 'neq': return v !== want;
      case 'lt': return compareTyped(v, want, type) < 0;
      case 'lte': return compareTyped(v, want, type) <= 0;
      case 'gt': return compareTyped(v, want, type) > 0;
      case 'gte': return compareTyped(v, want, type) >= 0;
      case 'in': return Array.isArray(want) ? want.includes(v) : String(want).split(',').includes(String(v));
      case 'nin': return Array.isArray(want) ? !want.includes(v) : !String(want).split(',').includes(String(v));
      case 'contains': return String(v ?? '').toLowerCase().includes(String(want ?? '').toLowerCase());
      case 'isEmpty': return v == null || v === '';
      case 'isNotEmpty': return v != null && v !== '';
    }
  });
}

/**
 * Group with a hard cardinality cap (audit H1). Stops building buckets the
 * moment distinct keys exceed maxGroups and signals overflow, so a high-
 * cardinality group can't allocate one bucket per row before any cap applies.
 */
function applyGroup(rows: Row[], op: GroupOp, maxGroups: number): { rows: Row[]; overflow: boolean } {
  const buckets = new Map<string, number>();
  const order: string[] = [];
  for (const r of rows) {
    const k = String(r[op.by] ?? '');
    if (!buckets.has(k)) {
      if (buckets.size >= maxGroups) return { rows: [], overflow: true };
      buckets.set(k, 0); order.push(k);
    }
    buckets.set(k, buckets.get(k)! + 1);
  }
  return { rows: order.sort().map((k) => ({ [op.keyAs]: k, [op.countAs]: buckets.get(k)! })), overflow: false };
}

function applyAggregate(rows: Row[], op: AggregateOp, typeOf: (k: string) => FieldDef['type'] | undefined): Row[] {
  const out: Row = {};
  for (const e of op.entries) {
    const nums = rows.map((r) => Number(r[e.field])).filter((n) => !Number.isNaN(n));
    const t = typeOf(e.field);
    switch (e.fn) {
      case 'count': out[e.as] = rows.length; break;
      case 'sum': out[e.as] = nums.reduce((a, b) => a + b, 0); break;
      case 'avg': out[e.as] = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0; break;
      case 'min': out[e.as] = rows.reduce<unknown>((m, r) => (m === undefined || compareTyped(r[e.field], m, t) < 0 ? r[e.field] : m), undefined); break;
      case 'max': out[e.as] = rows.reduce<unknown>((m, r) => (m === undefined || compareTyped(r[e.field], m, t) > 0 ? r[e.field] : m), undefined); break;
    }
  }
  return [out];
}

export function resolvePipeline(
  pipeline: DataPipeline,
  env: DatasetEnvelope,
  manifest: DataManifest,
  ctx: { now?: Date } = {},
): PipelineResolveResult {
  // Defense in depth: never execute an ungoverned pipeline.
  const gov = governPipeline(pipeline, env, manifest);
  if (!gov.ok) return { output: null, rejections: gov.rejections };

  const now = ctx.now ?? new Date(0); // deterministic default; callers inject real now
  let rows: Row[] = env.items.map((r) => ({ ...(r as Row) }));

  // Track field types as the schema evolves (derive adds typed fields). Used by
  // the type-correct comparator (H2). group/aggregate replace the schema.
  const types = new Map<string, FieldDef['type']>(env.fields.map((f) => [f.key, f.type]));
  const typeOf = (k: string) => types.get(k);

  for (const op of pipeline.ops) {
    switch (op.kind) {
      case 'filter': rows = applyFilter(rows, op, typeOf(op.field)); break;
      case 'sort': {
        const dir = op.direction === 'desc' ? -1 : 1;
        const t = typeOf(op.field);
        rows = rows
          .map((r, i) => [r, i] as const)
          .sort(([a, ai], [b, bi]) => { const c = compareTyped(a[op.field], b[op.field], t) * dir; return c !== 0 ? c : ai - bi; })
          .map(([r]) => r);
        break;
      }
      case 'limit': rows = rows.slice(0, op.count); break;
      case 'derive':
        rows = rows.map((r) => ({ ...r, [op.as]: deriveValue(op.fn, r[op.from], now) }));
        types.set(op.as, DERIVE_OUTPUT[op.fn]);
        break;
      case 'group': {
        const g = applyGroup(rows, op, manifest.policy.maxGroups);
        if (g.overflow) {
          return { output: null, rejections: [{ code: 'parse', message: `group on "${op.by}" produced > ${manifest.policy.maxGroups} groups (cardinality cap).`, where: 'group' }] };
        }
        rows = g.rows;
        types.clear(); types.set(op.keyAs, 'text'); types.set(op.countAs, 'number');
        break;
      }
      case 'aggregate':
        rows = applyAggregate(rows, op, typeOf);
        types.clear();
        for (const e of op.entries) types.set(e.as, AGGREGATE_OUTPUT_NUMERIC.has(e.fn) ? 'number' : (typeOf(e.field) ?? 'text'));
        break;
    }
  }
  if (rows.length > manifest.policy.maxRows) rows = rows.slice(0, manifest.policy.maxRows);

  return {
    output: { schemaId: pipeline.schemaId, fields: pipeline.outputSchema, items: rows },
    rejections: [],
  };
}
