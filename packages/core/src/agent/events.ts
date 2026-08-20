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

/** Per-type required fields beyond the shared envelope. Fails closed. */
const REQUIRED_FIELDS: Record<AgentEventType, Array<[key: string, kind: string]>> = {
  'run.started': [['goal', 'string']],
  'step.started': [['stepId', 'string'], ['summary', 'string']],
  'proposal.emitted': [['proposal', 'object'], ['gate', 'string']],
  'proposal.resolved': [['proposalId', 'string'], ['decision', 'string']],
  'action.executed': [['receipt', 'object']],
  'run.checkpoint': [['checkpoint', 'object']],
  'run.failed': [['error', 'string'], ['recoverable', 'boolean']],
  'run.completed': [['receipts', 'array']],
};

function fieldMatches(value: unknown, kind: string): boolean {
  if (kind === 'array') return Array.isArray(value);
  if (kind === 'object') return typeof value === 'object' && value !== null;
  return typeof value === kind;
}

/**
 * Structural runtime guard for untrusted event payloads (SSE frames, worker
 * messages). Fails closed: unknown types and malformed envelopes are refused.
 */
export function isAgentEvent(value: unknown): value is AgentEvent {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  const type = candidate['type'];
  if (typeof type !== 'string') return false;
  if (!(AGENT_EVENT_TYPES as readonly string[]).includes(type)) return false;
  if (typeof candidate['runId'] !== 'string') return false;
  if (typeof candidate['ts'] !== 'number' || Number.isNaN(candidate['ts'])) return false;
  const required = REQUIRED_FIELDS[type as AgentEventType];
  return required.every(([key, kind]) => fieldMatches(candidate[key], kind));
}
