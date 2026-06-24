/**
 * Dynamic Software Interfaces — S3: semantic-fit guardrail (playbook P50).
 * Plan: ../02-build-plan-phase-S-W.md. Vision §5.3.
 *
 * Governance answers "is this VALID?" (parses, governs, binds declared fields).
 * It does NOT answer "is this a GOOD FIT for the data?" A calendar over data
 * where almost nothing has a date is valid but useless — and rendering it
 * silently is the "Imagined Competence" failure (a confident, empty surface).
 *
 * S3 inspects the (template, data) pair and returns advisory FIT notes. These do
 * NOT block render (the surface is valid) — they let the workspace surface a
 * metacognitive suggestion: "only 1 of 12 messages has a due date — a list may
 * fit better." Honest, non-fabricated, computed from real data.
 */

import { type DatasetEnvelope } from './contracts.js';
import { type InterfaceTemplate, templateFieldKeys } from './template.js';

export interface FitNote {
  severity: 'warn' | 'info';
  message: string;
  /** Suggested alternative intent, if any. */
  suggestion?: string;
}

/** Fraction of items where a field has a non-empty value. */
function coverage(env: DatasetEnvelope, key: string): number {
  if (env.items.length === 0) return 0;
  const present = env.items.filter((it) => {
    const v = (it as Record<string, unknown>)[key];
    return v !== null && v !== undefined && v !== '' && v !== false;
  }).length;
  return present / env.items.length;
}

/** Which field a template is "keyed on" — heuristic from its bound fields. */
function keyedFields(t: InterfaceTemplate): string[] {
  return templateFieldKeys(t).map((k) => (k.includes('.') ? k.split('.')[1] : k));
}

const DATEY = ['dueDate', 'date', 'receivedAt', 'scheduledAt'];
const GROUPY = ['priority', 'labels', 'status', 'category'];

/**
 * Compute advisory fit notes for a generated template against the live data.
 * Pure, deterministic, computed from real coverage — never fabricated.
 */
export function semanticFit(template: InterfaceTemplate, env: DatasetEnvelope, intent = ''): FitNote[] {
  const notes: FitNote[] = [];
  const fields = keyedFields(template);
  const lower = intent.toLowerCase();

  if (env.items.length === 0) {
    notes.push({ severity: 'info', message: 'There’s no data to show yet.' });
    return notes;
  }

  // Calendar / date-keyed surface over data with sparse dates → poor fit.
  const isCalendar = /calendar|agenda|month|week|schedule/.test(lower) || fields.some((f) => DATEY.includes(f));
  if (isCalendar) {
    const dateField = DATEY.find((d) => env.fields.some((f) => f.key === d));
    if (dateField) {
      const cov = coverage(env, dateField);
      if (cov < 0.34) {
        notes.push({
          severity: 'warn',
          message: `Only ${Math.round(cov * 100)}% of items have a ${dateField} — a calendar will look mostly empty.`,
          suggestion: 'show as a list',
        });
      }
    }
  }

  // Board/grouped surface where the grouping field is near-uniform → weak grouping.
  const isBoard = /board|kanban|column|group/.test(lower);
  if (isBoard) {
    const groupField = GROUPY.find((g) => fields.includes(g) || env.fields.some((f) => f.key === g));
    if (groupField) {
      const distinct = new Set(env.items.map((it) => String((it as Record<string, unknown>)[groupField] ?? ''))).size;
      if (distinct <= 1) {
        notes.push({
          severity: 'warn',
          message: `All items share the same ${groupField} — a board would have a single column.`,
          suggestion: 'show as a list',
        });
      }
    }
  }

  // Summary over very few items → a list is usually clearer.
  if (/summary|overview|dashboard/.test(lower) && env.items.length < 3) {
    notes.push({
      severity: 'info',
      message: `Only ${env.items.length} items — a summary adds little over a plain list.`,
      suggestion: 'show as a list',
    });
  }

  return notes;
}
