/**
 * L3 store regression test (spec §5 Scenario E, §6).
 * Run from repo root:  node docs/specs/dynamic-interfaces/spec-store.test.mjs
 *
 * Covers: immutable versioning, parentVersion lineage, getActive, append-only
 * rollback, multi-spec isolation, and re-validation-on-load (including the
 * unknown-component case the parser does NOT reject on its own).
 */
import { createParser, validateTokenUsage, cognivoLibrary } from '../../../packages/gen-ui/dist/index.js';
import { INBOX_DATASET, evaluateGovernance } from './fixtures.mjs';
import { SURFACES } from './surfaces.mjs';
import { InterfaceSpecStore, createMemoryBackend } from './spec-store.mjs';

const parser = createParser(cognivoLibrary.toJSONSchema());
const validator = (tree) => {
  const r = parser.parse(tree);
  r.meta.tokenViolations = validateTokenUsage(r.root);
  const g = evaluateGovernance(r, cognivoLibrary);
  return { ok: g.governancePass, errors: [...g.validationErrors, ...g.tokenViolations] };
};

let t = 0;
const now = () => '2026-06-21T00:00:' + String(t++).padStart(2, '0') + 'Z';
const store = new InterfaceSpecStore({ backend: createMemoryBackend(), validator, now });

const U = 'user-1', S = 'inbox-main', SCHEMA = INBOX_DATASET.schemaId;
let ok = true;
const check = (c, m) => { console.log((c ? '  ok  ' : '  FAIL') + ' ' + m); if (!c) ok = false; };

const v1 = await store.save({ userId: U, specId: S, schemaId: SCHEMA, intent: 'show as list', tree: SURFACES.list.gen(INBOX_DATASET) });
check(v1.version === 1 && v1.parentVersion === undefined, 'v1 version=1, no parent');

const v2 = await store.save({ userId: U, specId: S, schemaId: SCHEMA, intent: 'task list', tree: SURFACES.tasks.gen(INBOX_DATASET) });
check(v2.version === 2 && v2.parentVersion === 1, 'v2 version=2, parent=1');

await store.save({ userId: U, specId: S, schemaId: SCHEMA, intent: 'calendar', tree: SURFACES.calendar.gen(INBOX_DATASET) });
check((await store.getActive(U, S)).version === 3, 'getActive returns latest (v3)');
check((await store.versions(U, S)).map((h) => h.version).join(',') === '1,2,3', 'versions ascending 1,2,3');

const v4 = await store.rollback(U, S, 1);
check(v4.version === 4 && v4.tree === v1.tree, 'rollback creates v4 cloning v1 tree (append-only)');
check((await store.versions(U, S)).length === 4, 'history grew to 4 — nothing deleted');

check((await store.revalidateOnLoad(U, S)).valid === true, 'revalidateOnLoad: active spec valid');

await store.save({ userId: U, specId: 'broken', schemaId: SCHEMA, intent: 'bad', tree: 'root = Nonexistent("x")' });
const bad = await store.revalidateOnLoad(U, 'broken');
check(bad.valid === false && bad.errors.length > 0, 'revalidateOnLoad: catches unknown-component spec the parser accepts');

check((await store.listSpecs(U)).length === 2, 'listSpecs: 2 distinct interfaces');

console.log(ok ? '\nALL L3 CHECKS PASSED' : '\nSOME CHECKS FAILED');
process.exit(ok ? 0 : 1);
