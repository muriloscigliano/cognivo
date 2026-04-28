import type {
  ClassifierSignal,
  IntentClassification,
  PageIntent,
} from '../types/classifier.js';
import type { SceneGraph } from '../types/scene-graph.js';
import {
  extractUrlSignals,
  extractComponentSignals,
  extractFormShapeSignals,
  extractTextSignals,
} from './signals/index.js';
import { softmax } from '../helpers/math.js';

interface HeuristicResult {
  intent: PageIntent;
  confidence: number;
  signals: ClassifierSignal[];
}

/**
 * Stage 2 — Heuristic classifier (Spec §5.2).
 *
 * Pure function, no network. Runs all signal extractors, sums weights per
 * intent, applies softmax, picks the top-1.
 */
export function heuristicClassify(scene: SceneGraph): HeuristicResult {
  const signals: ClassifierSignal[] = [
    ...extractUrlSignals(scene),
    ...extractComponentSignals(scene),
    ...extractFormShapeSignals(scene),
    ...extractTextSignals(scene),
  ];

  if (signals.length === 0) {
    return { intent: 'unknown', confidence: 0, signals };
  }

  const totals = new Map<PageIntent, number>();
  for (const signal of signals) {
    totals.set(signal.intent, (totals.get(signal.intent) ?? 0) + signal.weight);
  }

  // Softmax over intent totals to get probabilities. We *don't* include `unknown`
  // here; if no signals came in we already returned. The classifier orchestrator
  // (classifier/index.ts) decides whether to *fall back* to 'unknown' based on floors.
  const intents = [...totals.keys()];
  const probabilities = softmax(intents.map((i) => totals.get(i)!));

  let maxIdx = 0;
  for (let i = 1; i < probabilities.length; i++) {
    if (probabilities[i]! > probabilities[maxIdx]!) maxIdx = i;
  }

  const intent = intents[maxIdx]!;
  const confidence = Math.round(probabilities[maxIdx]! * 100);

  return { intent, confidence, signals };
}

/**
 * Build the IntentClassification record from a heuristic result.
 * Single-intent for v1 — multi-intent regional classification lands later.
 */
export function buildClassification(result: HeuristicResult, stage: IntentClassification['stage']): IntentClassification {
  return {
    primary: { intent: result.intent, confidence: result.confidence },
    secondary: [],
    signals: result.signals,
    stage,
  };
}
