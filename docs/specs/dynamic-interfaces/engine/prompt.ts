/**
 * Dynamic Software Interfaces — G0: prompt assembly.
 *
 * Plan: ../plans/G0-generation.md.  Composes the system rules + F3 injection
 * defense + few-shot examples + the declared fields the model may bind to.
 *
 * Few-shot examples are passed in (a tuned, versioned asset measured against the
 * golden dataset — vision §6 / playbook P6), not hard-coded here.
 */

import { type DatasetEnvelope } from './contracts.js';
import { wrapDataset, DATA_INSTRUCTION_CLAUSE, type InjectionFlag } from './injection-defense.js';

export interface AssembleOptions {
  /** Tuned few-shot DSL examples (as JSON or DSL strings). */
  examples?: string[];
  /** Override the base system rules (rarely needed). */
  systemRulesOverride?: string;
}

export interface AssembledPrompt {
  system: string;
  user: string;
  /** Injection flags surfaced from the dataset (for observability / result). */
  flags: InjectionFlag[];
}

const BASE_SYSTEM_RULES = [
  'You generate a UI surface as a structured component tree.',
  'You may ONLY bind to the declared fields listed below. Never invent a field.',
  'A data-bound prop must be a field binding { kind: "field", key: "<declaredKey>" }.',
  'A constant must be a literal { kind: "literal", value: <string|number|boolean> }.',
  'Use only components from the provided library. Interactive components must have a label.',
].join('\n');

/**
 * Assemble the system + user prompt for a generation request.
 * The system prompt carries: rules + injection-hierarchy clause + declared
 * fields + few-shot examples. The user prompt carries: the intent + the
 * delimited, injection-neutralized dataset.
 */
export function assemblePrompt(
  intent: string,
  env: DatasetEnvelope,
  opts: AssembleOptions = {},
): AssembledPrompt {
  const wrapped = wrapDataset(env);

  const fieldsBlock = env.fields
    .map((f) => `- ${f.key} (${f.type})${f.enumValues ? ` one of [${f.enumValues.join(', ')}]` : ''}`)
    .join('\n');

  const systemParts = [
    opts.systemRulesOverride ?? BASE_SYSTEM_RULES,
    '',
    '## Instruction hierarchy',
    DATA_INSTRUCTION_CLAUSE,
    '',
    '## Declared fields (the ONLY fields you may bind to)',
    fieldsBlock,
  ];
  if (opts.examples?.length) {
    systemParts.push('', '## Examples', ...opts.examples);
  }

  // User message: the intent, then the delimited+neutralized dataset.
  const dataLines = wrapped.delimitedItems
    .map((item, i) => `Item ${i}: ${env.fields.map((f) => `${f.key}=${item[f.key]}`).join(' ')}`)
    .join('\n');

  const user = [
    `Intent: ${intent}`,
    '',
    `Dataset (${env.items.length} items, schema ${env.schemaId}):`,
    dataLines,
  ].join('\n');

  return { system: systemParts.join('\n'), user, flags: wrapped.flags };
}
