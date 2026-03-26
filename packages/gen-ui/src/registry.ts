/**
 * Component registry — defineComponent() + createLibrary()
 *
 * Framework-agnostic: uses `tagName` (Web Component custom element name)
 * instead of React.FC. The renderer is separate (gen-ui-lit, adapter-react, etc.).
 *
 * Key difference from OpenUI: Cognivo components map to Web Component tags,
 * not React renderers. This makes the library work in any framework.
 */

import { z } from 'zod';
import { generatePrompt } from './prompt/generator.js';
import type { LibraryJSONSchema } from './types.js';

// ─── Sub-component type ──────────────────────────────────────────────────────

/**
 * Runtime shape of a parsed sub-component element as seen by parent renderers.
 */
export type SubComponentOf<P> = {
  type: 'element';
  typeName: string;
  props: P;
  partial: boolean;
};

// ─── ComponentDefinition ─────────────────────────────────────────────────────

/**
 * A fully defined component with name, tag, schema, description,
 * and a `.ref` for type-safe cross-referencing in parent schemas.
 */
export interface ComponentDefinition<T extends z.ZodObject<any> = z.ZodObject<any>> {
  name: string;
  /** Web Component custom element tag name, e.g. "ai-insight-card". */
  tagName: string;
  props: T;
  description: string;
  /** Cognitive biases this component leverages (for prompt injection). */
  biasHints?: string[];
  /** Use in parent schemas: `z.array(ChildComponent.ref)` */
  ref: z.ZodType<SubComponentOf<z.infer<T>>>;
}

/**
 * Define a component with name, tagName, schema, and description.
 * Registers the Zod schema globally and returns a `.ref` for parent schemas.
 *
 * @example
 * ```ts
 * const InsightCard = defineComponent({
 *   name: 'InsightCard',
 *   tagName: 'ai-insight-card',
 *   props: z.object({
 *     title: z.string(),
 *     description: z.string(),
 *     confidence: z.number().optional(),
 *   }),
 *   description: 'Displays an AI-generated insight with confidence level',
 *   biasHints: ['anchoring-bias', 'framing-effect'],
 * });
 * ```
 */
export function defineComponent<T extends z.ZodObject<any>>(config: {
  name: string;
  tagName: string;
  props: T;
  description: string;
  biasHints?: string[];
}): ComponentDefinition<T> {
  (config.props as any).register(z.globalRegistry, { id: config.name });
  return {
    ...config,
    ref: config.props as unknown as z.ZodType<SubComponentOf<z.infer<T>>>,
  };
}

// ─── Groups & Prompt ──────────────────────────────────────────────────────────

export interface ComponentGroup {
  name: string;
  components: string[];
  notes?: string[];
}

export interface BiasPromptContext {
  designType?: 'web' | 'mobile' | 'desktop';
  userGoals?: string[];
  industry?: string;
}

export interface PromptOptions {
  preamble?: string;
  additionalRules?: string[];
  examples?: string[];
  /** Inject cognitive bias guidance into the prompt. */
  biasContext?: BiasPromptContext;
  /** Add design token governance rules (--cg-* enforcement). */
  tokenGovernance?: boolean;
}

// ─── Library ──────────────────────────────────────────────────────────────────

export interface Library {
  readonly components: Record<string, ComponentDefinition>;
  readonly componentGroups: ComponentGroup[] | undefined;
  readonly root: string | undefined;

  /** Generate an LLM system prompt from this library. */
  prompt(options?: PromptOptions): string;

  /**
   * Returns a JSON Schema document for the entire library.
   * All component schemas are in `$defs`, keyed by component name.
   */
  toJSONSchema(): LibraryJSONSchema;

  /** Get the tag name for a component by its definition name. */
  getTagName(componentName: string): string | undefined;
}

export interface LibraryDefinition {
  components: ComponentDefinition[];
  componentGroups?: ComponentGroup[];
  root?: string;
}

/**
 * Create a component library from an array of defined components.
 *
 * @example
 * ```ts
 * const library = createLibrary({
 *   components: [InsightCard, Badge, ThinkingIndicator],
 *   root: 'Stack',
 *   componentGroups: [
 *     { name: 'Display', components: ['InsightCard', 'Badge'] },
 *     { name: 'Feedback', components: ['ThinkingIndicator'] },
 *   ],
 * });
 * ```
 */
export function createLibrary(input: LibraryDefinition): Library {
  const componentsRecord: Record<string, ComponentDefinition> = {};
  for (const comp of input.components) {
    if (!z.globalRegistry.has(comp.props)) {
      comp.props.register(z.globalRegistry, { id: comp.name });
    }
    componentsRecord[comp.name] = comp;
  }

  if (input.root && !componentsRecord[input.root]) {
    const available = Object.keys(componentsRecord).join(', ');
    throw new Error(
      `[createLibrary] Root component "${input.root}" was not found in components. Available: ${available}`,
    );
  }

  const library: Library = {
    components: componentsRecord,
    componentGroups: input.componentGroups,
    root: input.root,

    prompt(options?: PromptOptions): string {
      return generatePrompt(library, options);
    },

    toJSONSchema(): LibraryJSONSchema {
      const combinedSchema = z.object(
        Object.fromEntries(
          Object.entries(componentsRecord).map(([k, v]) => [k, v.props]),
        ) as any,
      );
      return z.toJSONSchema(combinedSchema) as LibraryJSONSchema;
    },

    getTagName(componentName: string): string | undefined {
      return componentsRecord[componentName]?.tagName;
    },
  };

  return library;
}
