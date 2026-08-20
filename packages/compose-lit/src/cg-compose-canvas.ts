/**
 * @cognivo/compose-lit — <cg-compose-canvas>
 *
 * The visible modify loop. Holds a base composition + a provenance log, renders
 * through the GhostRenderer, and orchestrates: compose → lint (retry on
 * violation) → render; then modify → preview diff as ghost → commit/discard.
 *
 * It does NOT talk to an LLM directly. The caller injects a `ComposeClient`
 * (the §8 seam) that turns prompts into trees/diffs — so this component is
 * testable with a fake client and swappable between the v0.1 direct-adapter
 * client and the v0.3 core `compose` intent.
 */

import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import type { ElementNode, Library } from '@cognivo/gen-ui';
import {
  lint,
  formatRetryFeedback,
  hashTree,
  ProvenanceLog,
  proposeComposition,
  StaleDiffError,
} from '@cognivo/compose';
import type {
  CompositionDiff,
  LayoutGrammar,
  GrammarViolation,
  ComposeClient,
} from '@cognivo/compose';
import { GhostRenderer } from './ghost-renderer.js';

/** Per-page-load instance counter so proposal ids never collide across canvases. */
let canvasSeq = 0;

@customElement('cg-compose-canvas')
export class CgComposeCanvas extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }
    .surface {
      min-height: var(--cg-spacing-4xl, 4rem);
    }
    .pending {
      display: flex;
      gap: var(--cg-spacing-sm);
      padding: var(--cg-spacing-sm);
      border-top: var(--cg-border-width-thin) solid var(--cg-color-surface-border-default);
    }
    button {
      font-family: var(--cg-font-family-sans);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-xs) var(--cg-spacing-md);
      border-radius: var(--cg-radius-md);
      border: var(--cg-border-width-thin) solid transparent;
      cursor: pointer;
    }
    .commit {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
    }
    .discard {
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      border-color: var(--cg-color-action-secondary-border-default);
    }
  `;

  /** The component library — passed straight to the renderer. */
  @property({ attribute: false }) library!: Library;
  /** Host-configured layout grammar. */
  @property({ attribute: false }) grammar!: LayoutGrammar;
  /** The client that turns prompts into trees/diffs. */
  @property({ attribute: false }) client!: ComposeClient;
  /** Max grammar-retry rounds before surfacing the violations to the user. */
  @property({ type: Number }) maxRetries = 2;
  /** Run id stamped on emitted composition proposals (agent-contract bridge). */
  @property() runId = 'compose-canvas';

  /** True while a candidate diff is previewed and awaiting commit/discard. */
  @state() private pendingCandidate: ElementNode | null = null;

  private renderer: GhostRenderer | null = null;
  private baseTree: ElementNode | null = null;
  private log = new ProvenanceLog();

  override firstUpdated(): void {
    this.renderer = new GhostRenderer(this.library);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.renderer?.destroy();
  }

  private get surface(): HTMLElement {
    return this.renderRoot.querySelector('.surface') as HTMLElement;
  }

  /** The current committed composition, or null. */
  get tree(): ElementNode | null {
    return this.baseTree;
  }

  /** The provenance log for this session. */
  get provenance(): ProvenanceLog {
    return this.log;
  }

  /**
   * Compose from a prompt: ask the client, lint, retry with feedback up to
   * `maxRetries`, then render the first clean tree as the solid base. If it never
   * lints clean, renders the last attempt and emits `compose-violations`.
   *
   * A top-level compose starts a fresh provenance session — the resulting tree is
   * entry #0, so any prior session's history is discarded.
   */
  async compose(prompt: string, now: number): Promise<ElementNode> {
    this.log = new ProvenanceLog();
    let feedback: string | undefined;
    let tree = await this.client.compose(prompt);
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const violations = lint(tree, this.grammar);
      if (violations.length === 0) break;
      this.emitViolations(violations);
      if (attempt === this.maxRetries) break;
      feedback = formatRetryFeedback(violations);
      tree = await this.client.compose(prompt, feedback);
    }
    this.baseTree = tree;
    this.renderer?.renderBase(tree, this.surface);
    this.log.record({ prompt, diff: null, treeHash: hashTree(tree), ts: now });
    this.pendingCandidate = null;
    return tree;
  }

  /**
   * Propose a modification: ask the client for a diff, wrap it as a governed
   * ActionProposal (agent-contract bridge — emitted as `composition-proposal`
   * whether it lints clean or not, so consumers see WHY a change was blocked),
   * and if clean render it as a ghost preview awaiting commit/discard.
   *
   * Loop closure contract: on a clean modify the ghost + pending state exist
   * BEFORE `composition-proposal` dispatches, so a listener may synchronously
   * `commit(now)` (approve) or `discard()` (reject) and both take effect.
   * `commit`/`discard` emit `composition-resolved` with the proposal id so a
   * host can feed the decision into a core run session (`run.resolve`).
   *
   * A stale diff (the tree moved while the client was thinking) is surfaced as
   * a `composition-stale` event + `{ stale: true }`, never as a throw. Empty
   * diffs are a no-op (`{ noop: true }`). Lint failures on a modify are
   * surfaced (not auto-retried here — the caller decides).
   */
  async proposeModify(prompt: string): Promise<{
    ok: boolean;
    violations: GrammarViolation[];
    stale?: boolean;
    noop?: boolean;
  }> {
    if (!this.baseTree || !this.renderer) throw new Error('proposeModify before compose');
    const diff = await this.client.modify(prompt, this.baseTree);
    if (diff.ops.length === 0) {
      return { ok: false, violations: [], noop: true };
    }

    let proposal;
    let violations: GrammarViolation[];
    try {
      ({ proposal, violations } = proposeComposition({
        id: `${this.canvasToken}-p${this.proposalSeq++}`,
        runId: this.runId,
        prompt,
        baseTree: this.baseTree,
        diff,
        grammar: this.grammar,
      }));
    } catch (error) {
      if (error instanceof StaleDiffError) {
        this.dispatchEvent(new CustomEvent('composition-stale', {
          detail: { message: error.message },
          bubbles: true,
          composed: true,
        }));
        return { ok: false, violations: [], stale: true };
      }
      throw error;
    }

    if (violations.length > 0) {
      this.dispatchEvent(new CustomEvent('composition-proposal', {
        detail: { proposal, violations },
        bubbles: true,
        composed: true,
      }));
      this.emitViolations(violations);
      return { ok: false, violations };
    }

    // Preview + pending state FIRST — the event's listeners must be able to
    // commit (pending exists) or discard (and have it stick).
    const candidate = this.renderer.previewDiff(diff);
    this.pendingCandidate = candidate;
    this.pendingDiff = diff;
    this.pendingPrompt = prompt;
    this.pendingProposalId = proposal.id;
    this.dispatchEvent(new CustomEvent('composition-proposal', {
      detail: { proposal, violations },
      bubbles: true,
      composed: true,
    }));
    return { ok: true, violations: [] };
  }

  private pendingDiff: CompositionDiff | null = null;
  private pendingPrompt = '';
  private pendingProposalId: string | null = null;
  private proposalSeq = 0;
  private readonly canvasToken = `c${canvasSeq++}`;

  /** Commit the previewed candidate: it becomes the new base and is logged. */
  commit(now: number): void {
    if (!this.pendingCandidate || !this.renderer || !this.pendingDiff) return;
    const candidate = this.pendingCandidate;
    const proposalId = this.pendingProposalId;
    this.renderer.commit(candidate);
    this.baseTree = candidate;
    this.log.record({
      prompt: this.pendingPrompt,
      diff: this.pendingDiff,
      treeHash: hashTree(candidate),
      ts: now,
    });
    this.clearPending();
    this.dispatchEvent(new CustomEvent('composition-committed', {
      detail: { tree: candidate, proposalId },
    }));
    this.emitResolved(proposalId, 'approved');
  }

  /** Discard the previewed candidate and restore the base. */
  discard(): void {
    const proposalId = this.pendingProposalId;
    const hadPending = this.pendingCandidate !== null;
    this.renderer?.discard();
    this.clearPending();
    if (hadPending) this.emitResolved(proposalId, 'rejected');
  }

  private emitResolved(proposalId: string | null, decision: 'approved' | 'rejected'): void {
    if (proposalId === null) return;
    this.dispatchEvent(new CustomEvent('composition-resolved', {
      detail: { proposalId, decision },
      bubbles: true,
      composed: true,
    }));
  }

  private clearPending(): void {
    this.pendingCandidate = null;
    this.pendingDiff = null;
    this.pendingPrompt = '';
    this.pendingProposalId = null;
  }

  private emitViolations(violations: GrammarViolation[]): void {
    this.dispatchEvent(new CustomEvent('compose-violations', { detail: { violations } }));
  }

  override render() {
    return html`
      <div class="surface"></div>
      ${this.pendingCandidate
        ? html`
            <div class="pending" role="group" aria-label="Pending composition change">
              <button class="commit" @click=${() => this.commit(this.nowFallback())}>Commit</button>
              <button class="discard" @click=${() => this.discard()}>Discard</button>
            </div>
          `
        : null}
    `;
  }

  /**
   * The engine never calls Date.now(). For UI-driven commit clicks we still need a
   * timestamp; callers who care about deterministic provenance call commit(now)
   * directly. This fallback exists only for the built-in buttons.
   */
  private nowFallback(): number {
    return Date.now();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-compose-canvas': CgComposeCanvas;
  }
}
