/**
 * Parser public API.
 *
 * Provides `parse()`, `createParser()`, and `createStreamingParser()`.
 */

import { tokenize } from './tokenizer.js';
import { split, parseTokens } from './ast.js';
import { autoClose } from './auto-close.js';
import { resolveNode } from './resolver.js';
import { mapNode } from './mapper.js';
import { emptyResult, buildResult } from './result.js';
import { createStreamParser } from './streaming.js';
import type { ASTNode } from './ast.js';
import type {
  ParseResult,
  ParamMap,
  ParamDef,
  LibraryJSONSchema,
  Parser,
  StreamParser,
} from '../types.js';

// Re-export types used by consumers
export type { ASTNode } from './ast.js';

/**
 * Parse a complete generative UI lang string in one pass.
 *
 * @param input - Full source text (may be partial/streaming)
 * @param cat   - Optional param map for positional-arg → named-prop mapping
 */
export function parse(input: string, cat?: ParamMap): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) return emptyResult();

  const { text, wasIncomplete } = autoClose(trimmed);
  const stmts = split(tokenize(text));
  if (!stmts.length) return emptyResult(wasIncomplete);

  const syms = new Map<string, ASTNode>();
  let firstId = '';
  for (const s of stmts) {
    syms.set(s.id, parseTokens(s.tokens));
    if (!firstId) firstId = s.id;
  }

  return buildResult(syms, firstId, wasIncomplete, stmts.length, cat);
}

/**
 * Compile a LibraryJSONSchema into a ParamMap for the parser.
 */
function compileSchema(schema: LibraryJSONSchema): ParamMap {
  const map: ParamMap = new Map();
  const defs = schema.$defs ?? {};

  for (const [name, def] of Object.entries(defs)) {
    const properties = def.properties ?? {};
    const required = def.required ?? [];
    const params: ParamDef[] = Object.keys(properties).map((k) => ({
      name: k,
      required: required.includes(k),
      defaultValue: (properties[k] as Record<string, unknown>)?.default as unknown,
    }));
    map.set(name, { params });
  }

  return map;
}

/**
 * Create a one-shot parser from a library JSON Schema.
 *
 * @example
 * ```ts
 * const parser = createParser(library.toJSONSchema());
 * const result = parser.parse(generatedText);
 * ```
 */
export function createParser(schema: LibraryJSONSchema): Parser {
  const paramMap = compileSchema(schema);
  return {
    parse(input: string): ParseResult {
      return parse(input, paramMap);
    },
  };
}

/**
 * Create a streaming parser from a library JSON Schema.
 *
 * @example
 * ```ts
 * const sp = createStreamingParser(library.toJSONSchema());
 * for await (const chunk of stream) {
 *   const result = sp.push(chunk);
 *   render(result);
 * }
 * ```
 */
export function createStreamingParser(schema: LibraryJSONSchema): StreamParser {
  return createStreamParser(compileSchema(schema));
}
