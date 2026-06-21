/**
 * Dynamic Software Interfaces — Layer 3: per-user InterfaceSpec store.
 *
 * Spec §3.2 (the per-user artifact), §6 (sandbox: persistence + versioning +
 * re-validation on load), §5 Scenario E (versioning & rollback).
 *
 * Contract this enforces:
 *  - Specs are IMMUTABLE and versioned. save() never mutates; it appends a new
 *    version with monotonic `version` and a `parentVersion` lineage pointer.
 *  - rollback() does NOT delete — it creates a NEW version cloning an older one
 *    (so history is append-only and auditable).
 *  - Stored specs are NEVER trusted blindly. load()/getActive() return the spec;
 *    callers MUST re-validate via the injected validator (parse + govern) before
 *    rendering — revalidateOnLoad() wires that here so it can't be forgotten.
 *
 * Backend is pluggable: IndexedDB in the browser (durable, for the playground),
 * in-memory Map elsewhere (Node tests / the G1 harness). Same async API either way.
 */

// ─── In-memory backend (Node / tests) ────────────────────────────────────────
function createMemoryBackend() {
  const rows = new Map(); // key: `${userId}::${specId}::${version}` -> InterfaceSpec
  const key = (s) => `${s.userId}::${s.specId}::${s.version}`;
  return {
    async put(spec) { rows.set(key(spec), spec); },
    async all(userId) {
      return [...rows.values()].filter((s) => s.userId === userId);
    },
    async clear() { rows.clear(); },
  };
}

// ─── IndexedDB backend (browser / playground) ─────────────────────────────────
function createIdbBackend(dbName = 'cognivo-dyn-interfaces') {
  const STORE = 'interface_specs';
  function open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const os = db.createObjectStore(STORE, { keyPath: 'pk' });
          os.createIndex('byUser', 'userId', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  const pk = (s) => `${s.userId}::${s.specId}::${s.version}`;
  return {
    async put(spec) {
      const db = await open();
      await new Promise((res, rej) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put({ ...spec, pk: pk(spec) });
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
      db.close();
    },
    async all(userId) {
      const db = await open();
      const out = await new Promise((res, rej) => {
        const tx = db.transaction(STORE, 'readonly');
        const idx = tx.objectStore(STORE).index('byUser');
        const req = idx.getAll(userId);
        req.onsuccess = () => res(req.result || []);
        req.onerror = () => rej(req.error);
      });
      db.close();
      return out.map(({ pk: _pk, ...rest }) => rest);
    },
    async clear() {
      const db = await open();
      await new Promise((res, rej) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).clear();
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
      db.close();
    },
  };
}

function defaultBackend() {
  return typeof indexedDB !== 'undefined' ? createIdbBackend() : createMemoryBackend();
}

export class InterfaceSpecStore {
  /**
   * @param {object} [opts]
   * @param {object} [opts.backend] - put/all/clear async backend; defaults by env.
   * @param {(tree: string) => { ok: boolean, errors?: any[] }} [opts.validator]
   *        - re-validation gate used by revalidateOnLoad(). Inject parse+govern here.
   * @param {() => string} [opts.now] - ISO timestamp source (injectable for tests;
   *        scripts can't call Date.now()).
   */
  constructor(opts = {}) {
    this.backend = opts.backend || defaultBackend();
    this.validator = opts.validator || null;
    this.now = opts.now || (() => new Date().toISOString());
  }

  /**
   * Append a new immutable version of a spec. Returns the stored spec.
   * version = (max existing for this specId) + 1; parentVersion = prior max.
   */
  async save({ userId, specId, schemaId, intent, tree, themeOverride }) {
    if (!userId || !specId || !schemaId) throw new Error('save: userId, specId, schemaId required');
    if (typeof tree !== 'string') throw new Error('save: tree must be DSL source string (§3.2)');
    const history = await this.versions(userId, specId);
    const parentVersion = history.length ? history[history.length - 1].version : undefined;
    const version = (parentVersion || 0) + 1;
    const spec = {
      specId, userId, schemaId, version, intent: intent || '',
      tree, ...(themeOverride ? { themeOverride } : {}),
      createdAt: this.now(), ...(parentVersion ? { parentVersion } : {}),
    };
    await this.backend.put(spec);
    return spec;
  }

  /** All versions of one spec, ascending by version. */
  async versions(userId, specId) {
    const all = await this.backend.all(userId);
    return all.filter((s) => s.specId === specId).sort((a, b) => a.version - b.version);
  }

  /** The latest version of a spec (the "active" one), or null. */
  async getActive(userId, specId) {
    const v = await this.versions(userId, specId);
    return v.length ? v[v.length - 1] : null;
  }

  /** Distinct specIds for a user (one per "interface"). */
  async listSpecs(userId) {
    const all = await this.backend.all(userId);
    const byId = new Map();
    for (const s of all) {
      const cur = byId.get(s.specId);
      if (!cur || s.version > cur.version) byId.set(s.specId, s);
    }
    return [...byId.values()];
  }

  /**
   * Roll back to an earlier version by CLONING it as a new latest version
   * (append-only history; nothing is deleted). Returns the new spec.
   */
  async rollback(userId, specId, targetVersion) {
    const history = await this.versions(userId, specId);
    const target = history.find((s) => s.version === targetVersion);
    if (!target) throw new Error(`rollback: version ${targetVersion} not found for ${specId}`);
    return this.save({
      userId, specId, schemaId: target.schemaId,
      intent: `rollback to v${targetVersion}: ${target.intent}`,
      tree: target.tree, themeOverride: target.themeOverride,
    });
  }

  /**
   * Re-validation on load (§6): fetch the active spec and run it through the
   * injected validator. NEVER trust stored DSL — token rules/library may have
   * changed since it was saved. Returns { spec, valid, errors }.
   */
  async revalidateOnLoad(userId, specId) {
    const spec = await this.getActive(userId, specId);
    if (!spec) return { spec: null, valid: false, errors: [{ message: 'no spec' }] };
    if (!this.validator) return { spec, valid: true, errors: [] }; // no gate injected
    const res = this.validator(spec.tree);
    return { spec, valid: !!res.ok, errors: res.errors || [] };
  }

  async clear() { return this.backend.clear(); }
}

export { createMemoryBackend, createIdbBackend };
