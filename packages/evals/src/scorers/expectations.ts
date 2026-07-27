import type { Expectations } from '../types.js';

export interface ExpectationScore {
  pass: boolean;
  failures: string[];
  tagsFound: string[];
}

const TAG_RE = /<((?:cg|ai|bias)-[a-z0-9-]+)\b/g;

/**
 * Component-choice grading: did the agent reach for the right component
 * without being told which one? Hidden from the prompt by construction.
 */
export function scoreExpectations(html: string, expect: Expectations): ExpectationScore {
  const tagsFound = [...html.matchAll(TAG_RE)].map((m) => m[1]!);
  const found = new Set(tagsFound);
  const failures: string[] = [];

  for (const group of expect.anyOf ?? []) {
    if (!group.some((t) => found.has(t))) {
      failures.push(`none of [${group.join(', ')}] used — found: ${[...found].join(', ') || '(no cognivo tags)'}`);
    }
  }
  for (const tag of expect.mustUseTags ?? []) {
    if (!found.has(tag)) failures.push(`required <${tag}> not used`);
  }
  for (const tag of expect.forbidTags ?? []) {
    if (found.has(tag)) failures.push(`forbidden <${tag}> used`);
  }

  return { pass: failures.length === 0, failures, tagsFound };
}
