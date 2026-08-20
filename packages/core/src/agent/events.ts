/**
 * Agent Interaction Contract — Plan 04: the run/proposal/action event union.
 *
 * The provider-neutral streaming contract for agent runs. Adapters translate
 * SDK streams into THIS union; UIs consume it without knowing the provider.
 * Discriminated on `type`. Every event carries `runId` and a caller-supplied
 * `ts` (milliseconds) — the engine never calls Date.now() itself.
 *
 * Deliberately absent: any `confidence` field. Trust rides on grounding
 * provenance and the gate, not on a self-reported scalar.
 */
import type { ActionProposal } from './proposal.js';
import type { Gate, RunContext } from './gate.js';
import type { Decision } from './trust-ledger.js';
import type { ActionReceipt } from './receipt.js';

/** Fields shared by every agent event. */
export interface AgentEventBase {
  runId: string;
  /** Caller-supplied timestamp in ms. */
  ts: number;
}

export interface RunStartedEvent extends AgentEventBase {
  type: 'run.started';
  goal: string;
}

export interface StepStartedEvent extends AgentEventBase {
  type: 'step.started';
  stepId: string;
  summary: string;
}

export interface ProposalEmittedEvent extends AgentEventBase {
  type: 'proposal.emitted';
  proposal: ActionProposal;
  /** The gate computed for this proposal at emission time. */
  gate: Gate;
}

export interface ProposalResolvedEvent extends AgentEventBase {
  type: 'proposal.resolved';
  proposalId: string;
  decision: Decision;
  /** Present when decision === 'edited': the human's modification. */
  patch?: unknown;
}

/**
 * An execution attempt settled. The receipt's own `status` distinguishes
 * 'executed' from 'failed' — a failed ACTION still yields this event;
 * `run.failed` is reserved for run-level aborts.
 */
export interface ActionExecutedEvent extends AgentEventBase {
  type: 'action.executed';
  receipt: ActionReceipt;
}

export interface RunCheckpointEvent extends AgentEventBase {
  type: 'run.checkpoint';
  /**
   * The run state accrued so far. Currently the Plan-02 RunContext
   * (cumulative blast radius); Plan 06 widens this shape into RunCheckpoint
   * without renaming the field.
   */
  checkpoint: RunContext;
}

export interface RunFailedEvent extends AgentEventBase {
  type: 'run.failed';
  /** The step that failed, when attributable. */
  stepId?: string;
  error: string;
  recoverable: boolean;
  /** Human-readable note on what partial state was recovered, if any. */
  partialRecovery?: string;
}

export interface RunCompletedEvent extends AgentEventBase {
  type: 'run.completed';
  receipts: ActionReceipt[];
}

export type AgentEvent =
  | RunStartedEvent
  | StepStartedEvent
  | ProposalEmittedEvent
  | ProposalResolvedEvent
  | ActionExecutedEvent
  | RunCheckpointEvent
  | RunFailedEvent
  | RunCompletedEvent;

export const AGENT_EVENT_TYPES = [
  'run.started',
  'step.started',
  'proposal.emitted',
  'proposal.resolved',
  'action.executed',
  'run.checkpoint',
  'run.failed',
  'run.completed',
] as const;

export type AgentEventType = (typeof AGENT_EVENT_TYPES)[number];

const GATES = ['auto', 'notify', 'confirm', 'confirm_typed'] as const;
const DECISIONS = ['approved', 'edited', 'rejected'] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Shallow envelope check on a wire proposal: identity + classification fields. */
function looksLikeProposal(value: unknown): boolean {
  return isRecord(value)
    && typeof value['id'] === 'string'
    && typeof value['tool'] === 'string'
    && typeof value['summary'] === 'string'
    && Array.isArray(value['provenance']);
}

/** Shallow envelope check on a wire receipt. */
function looksLikeReceipt(value: unknown): boolean {
  return isRecord(value)
    && typeof value['proposalId'] === 'string'
    && typeof value['tool'] === 'string'
    && (value['status'] === 'executed' || value['status'] === 'failed');
}

function looksLikeRunContext(value: unknown): boolean {
  return isRecord(value)
    && typeof value['runId'] === 'string'
    && isRecord(value['cumulativeBlastRadius']);
}

/** Per-type payload validation beyond the shared envelope. Fails closed. */
const PAYLOAD_CHECKS: Record<AgentEventType, (e: Record<string, unknown>) => boolean> = {
  'run.started': (e) => typeof e['goal'] === 'string',
  'step.started': (e) => typeof e['stepId'] === 'string' && typeof e['summary'] === 'string',
  'proposal.emitted': (e) =>
    looksLikeProposal(e['proposal']) && (GATES as readonly string[]).includes(e['gate'] as string),
  'proposal.resolved': (e) =>
    typeof e['proposalId'] === 'string' && (DECISIONS as readonly string[]).includes(e['decision'] as string),
  'action.executed': (e) => looksLikeReceipt(e['receipt']),
  'run.checkpoint': (e) => looksLikeRunContext(e['checkpoint']),
  'run.failed': (e) => typeof e['error'] === 'string' && typeof e['recoverable'] === 'boolean',
  'run.completed': (e) => Array.isArray(e['receipts']) && (e['receipts'] as unknown[]).every(looksLikeReceipt),
};

/**
 * Structural runtime guard for untrusted event payloads (SSE frames, worker
 * messages). Fails closed: unknown types, malformed envelopes, out-of-enum
 * gate/decision values, non-finite timestamps, and payloads whose nested
 * proposal/receipt/checkpoint lack their identity fields are all refused.
 * Deep semantic validation (e.g. assertWellFormed) remains the consumer's
 * job — this is the wire-shape gate.
 */
export function isAgentEvent(value: unknown): value is AgentEvent {
  if (!isRecord(value)) return false;
  const type = value['type'];
  if (typeof type !== 'string') return false;
  if (!(AGENT_EVENT_TYPES as readonly string[]).includes(type)) return false;
  if (typeof value['runId'] !== 'string') return false;
  if (typeof value['ts'] !== 'number' || !Number.isFinite(value['ts'])) return false;
  return PAYLOAD_CHECKS[type as AgentEventType](value);
}
