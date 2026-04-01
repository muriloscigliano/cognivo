/**
 * @cognivo/gen-ui — Core Types
 *
 * Framework-agnostic types for the generative UI pipeline.
 * These have ZERO framework dependencies (no React, no Lit, no Vue).
 */

// ─────────────────────────────────────────────────────────────────────────────
// Parse output types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A fully resolved component node from the parser.
 *
 * The parser converts generative UI lang text into a tree of these nodes.
 * Each node represents one component invocation with its positional
 * arguments mapped into named `props` via the library's Zod key order.
 */
export interface ElementNode {
  type: 'element';
  /** Component name as defined in the library (e.g. "InsightCard", "Badge"). */
  typeName: string;
  /** Named props produced by positional-to-named mapping from the schema. */
  props: Record<string, unknown>;
  /**
   * True when the parser hasn't received all tokens for this node yet
   * (streaming in progress).
   */
  partial: boolean;
}

/**
 * A prop validation error from the parser.
 * When a component has missing required props, it is redacted from the
 * output tree (dropped as null) and errors are recorded here.
 */
export interface ValidationError {
  /** Component type name, e.g. "InsightCard", "Badge". */
  component: string;
  /** JSON Pointer path within the props object, e.g. "/title", "". */
  path: string;
  /** Human-readable error message. */
  message: string;
}

/**
 * A design token violation found in generated output.
 * When an LLM generates props with raw values instead of design tokens,
 * these violations are reported as warnings.
 */
export interface TokenViolation {
  /** Component type name that contains the violation. */
  component: string;
  /** Prop name with the violating value. */
  prop: string;
  /** The raw value the LLM used (e.g. "#ff0000", "16px"). */
  value: string;
  /** Suggested design token (e.g. "--cg-color-action-primary-background-default"). */
  suggestion: string;
}

/**
 * Built-in action types for interactive components.
 */
export enum BuiltinActionType {
  ContinueConversation = 'continue_conversation',
  OpenUrl = 'open_url',
}

/**
 * Structured action event fired by interactive components.
 */
export interface ActionEvent {
  /** Action type. See `BuiltinActionType` for built-in types. */
  type: string;
  /** Action-specific params (e.g. { url } for OpenUrl). */
  params: Record<string, unknown>;
  /** Human-readable label for the action (displayed as user message in chat). */
  humanFriendlyMessage: string;
  /** Raw form state at the time of the action — all field values. */
  formState?: Record<string, unknown>;
  /** The form name that triggered this action, if any. */
  formName?: string;
}

/**
 * The output of a single `parser.parse(text)` call.
 *
 * During streaming, each chunk produces a new ParseResult as the
 * accumulated text is re-parsed. The `root` progressively resolves
 * from null → partial tree → complete tree.
 */
export interface ParseResult {
  /** The root ElementNode, or null if parsing hasn't produced one yet. */
  root: ElementNode | null;
  meta: {
    /** True if the parser detected truncated/incomplete input. */
    incomplete: boolean;
    /** Names of references used but not yet defined (dropped as null in output). */
    unresolved: string[];
    /** Total number of `identifier = Expression` statements parsed. */
    statementCount: number;
    /** Prop validation errors. Components with missing required props are listed here. */
    validationErrors: ValidationError[];
    /** Design token violations found in generated props. */
    tokenViolations: TokenViolation[];
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Parser interfaces
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The JSON Schema document produced by `library.toJSONSchema()`.
 * All component schemas live in `$defs`, keyed by component name.
 */
export interface LibraryJSONSchema {
  $defs?: Record<
    string,
    {
      properties?: Record<string, unknown>;
      required?: string[];
    }
  >;
}

/**
 * Definition of a single component parameter, extracted from JSON Schema.
 */
export interface ParamDef {
  /** Parameter name, e.g. "title", "columns". */
  name: string;
  /** Whether the parameter is required by the component. */
  required: boolean;
  /** Default value from JSON Schema — used when the required field is missing/null. */
  defaultValue?: unknown;
}

/**
 * Internal parameter map: component name → ordered list of params.
 * Used by the parser to map positional args to named props.
 */
export type ParamMap = Map<string, { params: ParamDef[] }>;

/**
 * A one-shot parser. Parse complete or auto-closed partial input.
 */
export interface Parser {
  parse(input: string): ParseResult;
}

/**
 * A streaming parser that incrementally processes chunks.
 */
export interface StreamParser {
  /** Feed the next SSE/stream chunk and get the latest ParseResult. */
  push(chunk: string): ParseResult;
  /** Get the latest ParseResult without consuming new data. */
  getResult(): ParseResult;
  /** Last parse error message, or null if no errors. */
  readonly lastError: string | null;
}
