/**
 * AST node types and recursive descent parser.
 *
 * Converts a flat token stream into an Abstract Syntax Tree.
 * Handles: component calls, literals, arrays, objects, references.
 */

import { type Token, TokenType } from './tokenizer.js';

// ─────────────────────────────────────────────────────────────────────────────
// AST node types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Discriminated union representing every value in a generative UI expression.
 * The `k` field is the discriminant.
 */
export type ASTNode =
  | { k: 'Comp'; name: string; args: ASTNode[] }
  | { k: 'Str'; v: string }
  | { k: 'Num'; v: number }
  | { k: 'Bool'; v: boolean }
  | { k: 'Null' }
  | { k: 'Arr'; els: ASTNode[] }
  | { k: 'Obj'; entries: [string, ASTNode][] }
  | { k: 'Ref'; n: string }
  | { k: 'Ph'; n: string };

// ─────────────────────────────────────────────────────────────────────────────
// Statement splitting
// ─────────────────────────────────────────────────────────────────────────────

export interface RawStmt {
  id: string;
  tokens: Token[];
}

/**
 * Split a flat token stream into individual statements.
 *
 * Each statement has the form `identifier = expression`. Statements are
 * separated by newlines at depth 0 (newlines inside brackets are ignored).
 * Invalid lines (no `=`, or no identifier) are silently skipped.
 */
export function split(tokens: Token[]): RawStmt[] {
  const stmts: RawStmt[] = [];
  let pos = 0;

  while (pos < tokens.length) {
    // Skip blank lines
    while (pos < tokens.length && tokens[pos]!.t === TokenType.Newline) pos++;
    if (pos >= tokens.length || tokens[pos]!.t === TokenType.EOF) break;

    // Expect: Ident|Type = expression
    const tok = tokens[pos]!;
    if (tok.t !== TokenType.Ident && tok.t !== TokenType.Type) {
      while (pos < tokens.length && tokens[pos]!.t !== TokenType.Newline && tokens[pos]!.t !== TokenType.EOF) pos++;
      continue;
    }
    const id = tok.v as string;
    pos++;

    // Must be followed by `=`
    if (pos >= tokens.length || tokens[pos]!.t !== TokenType.Equals) {
      while (pos < tokens.length && tokens[pos]!.t !== TokenType.Newline && tokens[pos]!.t !== TokenType.EOF) pos++;
      continue;
    }
    pos++;

    // Collect expression tokens until a depth-0 newline or EOF
    const expr: Token[] = [];
    let depth = 0;
    while (pos < tokens.length && tokens[pos]!.t !== TokenType.EOF) {
      const tt = tokens[pos]!.t;
      if (tt === TokenType.Newline && depth <= 0) break;
      if (tt === TokenType.Newline) { pos++; continue; }
      if (tt === TokenType.LParen || tt === TokenType.LBrack || tt === TokenType.LBrace) depth++;
      else if (tt === TokenType.RParen || tt === TokenType.RBrack || tt === TokenType.RBrace) depth--;
      expr.push(tokens[pos]!);
      pos++;
    }

    if (expr.length) stmts.push({ id, tokens: expr });
  }

  return stmts;
}

// ─────────────────────────────────────────────────────────────────────────────
// Expression parser (recursive descent)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parse a token array into an AST node.
 */
export function parseTokens(tokens: Token[]): ASTNode {
  let pos = 0;
  const cur = (): Token => tokens[pos] ?? { t: TokenType.EOF };
  const adv = () => { pos++; };
  const eat = (kind: TokenType) => { if (cur().t === kind) adv(); };

  function parseExpr(): ASTNode {
    const tok = cur();

    if (tok.t === TokenType.Type) {
      // PascalCase followed by `(` → component call; otherwise a reference
      return tokens[pos + 1]?.t === TokenType.LParen
        ? parseComp()
        : (adv(), { k: 'Ref', n: tok.v as string });
    }
    if (tok.t === TokenType.Str) { adv(); return { k: 'Str', v: tok.v as string }; }
    if (tok.t === TokenType.Num) { adv(); return { k: 'Num', v: tok.v as number }; }
    if (tok.t === TokenType.True) { adv(); return { k: 'Bool', v: true }; }
    if (tok.t === TokenType.False) { adv(); return { k: 'Bool', v: false }; }
    if (tok.t === TokenType.Null) { adv(); return { k: 'Null' }; }
    if (tok.t === TokenType.LBrack) return parseArr();
    if (tok.t === TokenType.LBrace) return parseObj();
    if (tok.t === TokenType.Ident) { adv(); return { k: 'Ref', n: tok.v as string }; }

    adv();
    return { k: 'Null' }; // unknown token — treat as null
  }

  function parseComp(): ASTNode {
    const name = cur().v as string;
    adv();
    eat(TokenType.LParen);
    const args: ASTNode[] = [];
    while (cur().t !== TokenType.RParen && cur().t !== TokenType.EOF) {
      args.push(parseExpr());
      if (cur().t === TokenType.Comma) adv();
    }
    eat(TokenType.RParen);
    return { k: 'Comp', name, args };
  }

  function parseArr(): ASTNode {
    adv(); // skip [
    const els: ASTNode[] = [];
    while (cur().t !== TokenType.RBrack && cur().t !== TokenType.EOF) {
      els.push(parseExpr());
      if (cur().t === TokenType.Comma) adv();
    }
    eat(TokenType.RBrack);
    return { k: 'Arr', els };
  }

  function parseObj(): ASTNode {
    adv(); // skip {
    const entries: [string, ASTNode][] = [];
    while (cur().t !== TokenType.RBrace && cur().t !== TokenType.EOF) {
      const kt = cur();
      const key =
        kt.t === TokenType.Ident || kt.t === TokenType.Str || kt.t === TokenType.Type || kt.t === TokenType.Num
          ? (adv(), String(kt.v))
          : (adv(), '?');
      eat(TokenType.Colon);
      entries.push([key, parseExpr()]);
      if (cur().t === TokenType.Comma) adv();
    }
    eat(TokenType.RBrace);
    return { k: 'Obj', entries };
  }

  return parseExpr();
}
