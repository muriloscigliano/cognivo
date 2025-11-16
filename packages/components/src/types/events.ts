import type { AiIntent, AiResult } from '@cognivo/core';

/**
 * Custom event types for AI components
 */

export interface AiInvokeEventDetail {
  intent: AiIntent;
  context: unknown;
}

export interface AiResultEventDetail {
  intent: AiIntent;
  result: AiResult;
}

export interface AiErrorEventDetail {
  intent: AiIntent;
  error: Error;
}

/**
 * Custom event classes
 */
export class AiInvokeEvent extends CustomEvent<AiInvokeEventDetail> {
  constructor(detail: AiInvokeEventDetail) {
    super('ai:invoke', {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export class AiResultEvent extends CustomEvent<AiResultEventDetail> {
  constructor(detail: AiResultEventDetail) {
    super('ai:result', {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

export class AiErrorEvent extends CustomEvent<AiErrorEventDetail> {
  constructor(detail: AiErrorEventDetail) {
    super('ai:error', {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Type augmentation for HTMLElementEventMap
 */
declare global {
  interface HTMLElementEventMap {
    'ai:invoke': AiInvokeEvent;
    'ai:result': AiResultEvent;
    'ai:error': AiErrorEvent;
  }
}
