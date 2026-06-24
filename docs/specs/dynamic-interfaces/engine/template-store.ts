/**
 * Dynamic Software Interfaces — W2: per-user template version store (the moat).
 * Plan: ../02-build-plan-phase-S-W.md. Architecture §L4 (corpus + personalization).
 *
 * Every generated InterfaceTemplate is persisted per user, immutable and
 * versioned, with parentVersion lineage. This corpus IS the moat (architecture
 * §2): it's why a user comes back (their accumulated, personal interfaces) AND
 * the proprietary signal for personalization. Undo is first-class — restoring an
 * earlier version re-renders via the same reconciler (no hard cut), and rollback
 * is append-only (history is never destroyed, so it stays auditable).
 *
 * Env-agnostic backend: IndexedDB in the browser, in-memory in Node/tests.
 */

import { type InterfaceTemplate } from './template.js';

export interface StoredTemplate {
  templateId: string;
  userId: string;
  version: number;
  /** The NL intent that produced it. */
  intent: string;
  /** The template artifact (structure + bindings — not a data snapshot). */
  template: InterfaceTemplate;
  createdAt: string;
  parentVersion?: number;
}

export interface TemplateBackend {
  put(row: StoredTemplate): Promise<void>;
  all(userId: string): Promise<StoredTemplate[]>;
  clear(): Promise<void>;
}

// ─── In-memory backend (Node / tests) ─────────────────────────────────────────
export function createMemoryTemplateBackend(): TemplateBackend {
  const rows = new Map<string, StoredTemplate>();
  const key = (r: StoredTemplate) => `${r.userId}::${r.templateId}::${r.version}`;
  return {
    async put(row) { rows.set(key(row), row); },
    async all(userId) { return [...rows.values()].filter((r) => r.userId === userId); },
    async clear() { rows.clear(); },
  };
}

// ─── IndexedDB backend (browser) ──────────────────────────────────────────────
export function createIdbTemplateBackend(dbName = 'cognivo-di-templates'): TemplateBackend {
  const STORE = 'templates';
  const open = () =>
    new Promise<IDBDatabase>((resolve, reject) => {
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
  const pk = (r: StoredTemplate) => `${r.userId}::${r.templateId}::${r.version}`;
  return {
    async put(row) {
      const db = await open();
      await new Promise<void>((res, rej) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put({ ...row, pk: pk(row) });
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
      db.close();
    },
    async all(userId) {
      const db = await open();
      const out = await new Promise<StoredTemplate[]>((res, rej) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).index('byUser').getAll(userId);
        req.onsuccess = () => res((req.result ?? []) as StoredTemplate[]);
        req.onerror = () => rej(req.error);
      });
      db.close();
      return out.map(({ ...rest }) => rest);
    },
    async clear() {
      const db = await open();
      await new Promise<void>((res, rej) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).clear();
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
      db.close();
    },
  };
}

function defaultBackend(): TemplateBackend {
  return typeof indexedDB !== 'undefined' ? createIdbTemplateBackend() : createMemoryTemplateBackend();
}

export class TemplateStore {
  private backend: TemplateBackend;
  private now: () => string;
  constructor(opts: { backend?: TemplateBackend; now?: () => string } = {}) {
    this.backend = opts.backend ?? defaultBackend();
    this.now = opts.now ?? (() => new Date().toISOString());
  }

  /** Append a new immutable version of a template. */
  async save(args: { userId: string; templateId: string; intent: string; template: InterfaceTemplate }): Promise<StoredTemplate> {
    const history = await this.versions(args.userId, args.templateId);
    const parentVersion = history.length ? history[history.length - 1].version : undefined;
    const row: StoredTemplate = {
      templateId: args.templateId,
      userId: args.userId,
      version: (parentVersion ?? 0) + 1,
      intent: args.intent,
      template: args.template,
      createdAt: this.now(),
      ...(parentVersion ? { parentVersion } : {}),
    };
    await this.backend.put(row);
    return row;
  }

  /** All versions of a template, ascending. */
  async versions(userId: string, templateId: string): Promise<StoredTemplate[]> {
    const all = await this.backend.all(userId);
    return all.filter((r) => r.templateId === templateId).sort((a, b) => a.version - b.version);
  }

  /** The latest (active) version, or null. */
  async getActive(userId: string, templateId: string): Promise<StoredTemplate | null> {
    const v = await this.versions(userId, templateId);
    return v.length ? v[v.length - 1] : null;
  }

  /**
   * Undo: restore an earlier version by CLONING it as a new latest version
   * (append-only — history is never destroyed). Returns the new active row.
   */
  async undoTo(userId: string, templateId: string, targetVersion: number): Promise<StoredTemplate> {
    const history = await this.versions(userId, templateId);
    const target = history.find((r) => r.version === targetVersion);
    if (!target) throw new Error(`undoTo: version ${targetVersion} not found for ${templateId}`);
    return this.save({
      userId, templateId,
      intent: `undo → v${targetVersion}: ${target.intent}`,
      template: target.template,
    });
  }

  /** One-step undo: restore the version before the current active one. */
  async undo(userId: string, templateId: string): Promise<StoredTemplate | null> {
    const history = await this.versions(userId, templateId);
    if (history.length < 2) return null; // nothing to undo to
    const prev = history[history.length - 2];
    return this.undoTo(userId, templateId, prev.version);
  }

  /** Distinct templates (interfaces) a user has — the corpus. */
  async corpus(userId: string): Promise<StoredTemplate[]> {
    const all = await this.backend.all(userId);
    const byId = new Map<string, StoredTemplate>();
    for (const r of all) {
      const cur = byId.get(r.templateId);
      if (!cur || r.version > cur.version) byId.set(r.templateId, r);
    }
    return [...byId.values()];
  }

  async clear(): Promise<void> { return this.backend.clear(); }
}
