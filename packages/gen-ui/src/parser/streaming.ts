/**
 * Streaming parser with completed-statement cache.
 *
 * Maintains a buffer of accumulated text. As new chunks arrive,
 * only scans for new completed statements (depth-0 newlines) and
 * caches them. The pending (incomplete) last statement is re-parsed
 * each time. This gives O(n) per chunk, not O(n²).
 */

import type { ASTNode } from './ast.js';
import { split, parseTokens } from './ast.js';
import { tokenize } from './tokenizer.js';
import { autoClose } from './auto-close.js';
import { resolveNode } from './resolver.js';
import { mapNode } from './mapper.js';
import type { ParseResult, ParamMap, StreamParser } from '../types.js';
import { emptyResult, buildResult } from './result.js';

export function createStreamParser(cat?: ParamMap): StreamParser {
  let buf = '';
  let completedEnd = 0;
  const completedSyms = new Map<string, ASTNode>();

  let completedCount = 0;
  let firstId = '';

  function addStmt(text: string) {
    for (const s of split(tokenize(text))) {
      completedSyms.set(s.id, parseTokens(s.tokens));
      completedCount++;
      if (!firstId) firstId = s.id;
    }
  }

  function scanNewCompleted(): number {
    let depth = 0;
    let inStr = false;
    let esc = false;
    let stmtStart = completedEnd;

    for (let i = completedEnd; i < buf.length; i++) {
      const c = buf[i]!;
      if (esc) { esc = false; continue; }
      if (c === '\\' && inStr) { esc = true; continue; }
      if (c === '"') { inStr = !inStr; continue; }
      if (inStr) continue;

      if (c === '(' || c === '[' || c === '{') depth++;
      else if (c === ')' || c === ']' || c === '}') depth--;
      else if (c === '\n' && depth <= 0) {
        const t = buf.slice(stmtStart, i).trim();
        if (t) addStmt(t);
        stmtStart = i + 1;
        completedEnd = i + 1;
      }
    }

    return stmtStart;
  }

  function currentResult(): ParseResult {
    const pendingStart = scanNewCompleted();
    const pendingText = buf.slice(pendingStart).trim();

    // No pending text — all statements are complete
    if (!pendingText) {
      if (completedCount === 0) return emptyResult();
      return buildResult(completedSyms, firstId, false, completedCount, cat);
    }

    // Autoclose the incomplete last statement
    const { text: closed, wasIncomplete } = autoClose(pendingText);
    const stmts = split(tokenize(closed));

    if (!stmts.length) {
      if (completedCount === 0) return emptyResult(wasIncomplete);
      return buildResult(completedSyms, firstId, wasIncomplete, completedCount, cat);
    }

    // Merge: completed cache + re-parsed pending statement
    const allSyms = new Map(completedSyms);
    for (const s of stmts) allSyms.set(s.id, parseTokens(s.tokens));

    const fid = firstId || stmts[0]!.id;
    return buildResult(allSyms, fid, wasIncomplete, completedCount + stmts.length, cat);
  }

  let lastGoodResult: ParseResult = emptyResult();
  let lastError: string | null = null;

  return {
    push(chunk) {
      buf += chunk;
      try {
        const result = currentResult();
        lastGoodResult = result;
        lastError = null;
        return result;
      } catch (e) {
        // On parse error, return last good result with error metadata
        // instead of crashing the stream
        lastError = e instanceof Error ? e.message : String(e);
        return {
          ...lastGoodResult,
          meta: {
            ...lastGoodResult.meta,
            incomplete: true,
            parseError: lastError,
          },
        };
      }
    },
    getResult() {
      try {
        return currentResult();
      } catch {
        return lastGoodResult;
      }
    },
    /** Last parse error message, or null if no errors. */
    get lastError() { return lastError; },
  };
}
