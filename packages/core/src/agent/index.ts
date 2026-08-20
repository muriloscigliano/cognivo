/**
 * @cognivo/core — Agent interaction contract (Plans 01–04).
 *
 * Grounding provenance, reversibility classification, blast radius, the
 * ActionProposal type, the gate + trust ledger, receipts, and the
 * run/proposal/action event union with its typed stream.
 */
export type { Provenance } from './provenance.js';
export { isInferenceOnly } from './provenance.js';

export type { Reversibility, BlastScope, BlastRadius } from './reversibility.js';
export { mergeBlastRadius, blastBucket } from './reversibility.js';

export type { ActionProposal } from './proposal.js';
export { isHardStop, assertWellFormed } from './proposal.js';

export type { Gate, RunContext } from './gate.js';
export { gate, emptyRunContext } from './gate.js';

export type { TrustLedger, Decision } from './trust-ledger.js';
export { InMemoryTrustLedger, ledgerKey } from './trust-ledger.js';

export type { ActionReceipt, ActionOutcome } from './receipt.js';
export { toReceipt } from './receipt.js';

export type {
  AgentEvent,
  AgentEventType,
  AgentEventBase,
  RunStartedEvent,
  StepStartedEvent,
  ProposalEmittedEvent,
  ProposalResolvedEvent,
  ActionExecutedEvent,
  RunCheckpointEvent,
  RunFailedEvent,
  RunCompletedEvent,
} from './events.js';
export { AGENT_EVENT_TYPES, isAgentEvent } from './events.js';

export type { AgentEventListener } from './event-stream.js';
export { AgentEventStream } from './event-stream.js';

export type { AgentRun, AgentRunOptions } from './run-session.js';
export { createAgentRun } from './run-session.js';
