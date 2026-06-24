/**
 * Dynamic Software Interfaces — A5: the template-emitting LLM seam + mock.
 * Architecture: ../01-architecture.md §L2.
 *
 * Generation now emits a flat InterfaceTemplate with BINDINGS, not an inlined
 * snapshot tree. The model chooses structure + which fields to bind; data never
 * enters the template as a literal value. A real adapter (constrained/tool-call
 * output) satisfies this same interface; MockTemplateLLM is deterministic for
 * tests + the no-key build.
 */

import { field, literal } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';
import { richListTemplate, richTaskTemplate, richSummaryTemplate } from './surface-library.js';

export interface TemplateRequest {
  system: string;
  user: string;
  sample?: number;
}

export interface TemplateResponse {
  template: InterfaceTemplate;
  raw?: string;
}

export interface TemplateLlmClient {
  readonly name: string;
  generate(req: TemplateRequest): Promise<TemplateResponse>;
}

// Known-good templates come from the shared surface library (S1/S2) — rich,
// chrome-bearing compositions (Card/Avatar/Badge) that read as a real app.

// ─── Scripted failures (drive governance/repair on the real path) ─────────────

export type TemplateFailure = 'undeclared-field' | 'unknown-component' | 'broken-structure';

function failureTemplate(mode: TemplateFailure): InterfaceTemplate {
  switch (mode) {
    case 'undeclared-field':
      return {
        schemaId: 'inbox.message.v1', root: 'root',
        nodes: {
          root: node('root', 'Stack', {}, ['leak']),
          leak: node('leak', 'TextContent', { text: field('item.password') }),
        },
        repeats: { leak: { over: field('items'), as: 'item' } },
      };
    case 'unknown-component':
      return {
        schemaId: 'inbox.message.v1', root: 'root',
        nodes: { root: node('root', 'TotallyFakeComponent', { x: literal('y') }) },
      };
    case 'broken-structure':
      return {
        schemaId: 'inbox.message.v1', root: 'ghost',
        nodes: { root: node('root', 'Stack', {}, ['missing']) },
      };
  }
}

export interface MockTemplateLLMOptions {
  forceFailure?: TemplateFailure;
  /** Heal after N calls (repair-loop testing). */
  repairAfter?: number;
}

export class MockTemplateLLM implements TemplateLlmClient {
  readonly name = 'mock-template';
  private calls = 0;
  constructor(private opts: MockTemplateLLMOptions = {}) {}

  async generate(req: TemplateRequest): Promise<TemplateResponse> {
    const call = this.calls++;
    if (this.opts.forceFailure) {
      const heals = this.opts.repairAfter !== undefined && call >= this.opts.repairAfter;
      if (!heals) return { template: failureTemplate(this.opts.forceFailure), raw: `mock:${this.opts.forceFailure}` };
    }
    const intent = req.user.toLowerCase();
    // An intent asking for data the dataset doesn't have → the mock honestly
    // produces a template that binds an undeclared field, which governance then
    // rejects. (A real model might comply with such a request; the firewall is
    // what makes either outcome safe.)
    if (/password|secret|ssn|credential|credit.?card/.test(intent)) {
      return { template: failureTemplate('undeclared-field'), raw: 'mock:undeclared' };
    }
    if (/task|checklist|to-?do/.test(intent)) return { template: richTaskTemplate(), raw: 'mock:task' };
    if (/summary|overview|total|count/.test(intent)) return { template: richSummaryTemplate(), raw: 'mock:summary' };
    return { template: richListTemplate(), raw: 'mock:list' };
  }
}
