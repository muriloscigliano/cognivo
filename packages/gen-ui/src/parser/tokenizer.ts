/**
 * Lexer for generative UI lang.
 *
 * Converts raw source text into a flat token stream. Newlines are significant
 * (they separate statements at depth 0). Horizontal whitespace is skipped.
 *
 * Token types:
 * - Punctuation: ( ) [ ] { } , : =
 * - Keywords: true, false, null
 * - Literals: strings (JSON-escaped), numbers (int/float/exp)
 * - Identifiers: lowercase → Ref, PascalCase → Type (component name)
 */

export const enum TokenType {
  Newline = 0,
  LParen = 1,
  RParen = 2,
  LBrack = 3,
  RBrack = 4,
  LBrace = 5,
  RBrace = 6,
  Comma = 7,
  Colon = 8,
  Equals = 9,
  True = 10,
  False = 11,
  Null = 12,
  EOF = 13,
  Str = 14,
  Num = 15,
  Ident = 16,
  Type = 17,
}

export interface Token {
  t: TokenType;
  v?: string | number;
}

/**
 * Tokenize a source string into a flat token array.
 */
export function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = src.length;

  while (i < n) {
    // Skip horizontal whitespace (not newlines — they're significant)
    while (i < n && (src[i] === ' ' || src[i] === '\t' || src[i] === '\r')) i++;
    if (i >= n) break;

    const c = src[i]!;

    // ── Single-character punctuation ──────────────────────────────────────
    if (c === '\n') { tokens.push({ t: TokenType.Newline }); i++; continue; }
    if (c === '(') { tokens.push({ t: TokenType.LParen }); i++; continue; }
    if (c === ')') { tokens.push({ t: TokenType.RParen }); i++; continue; }
    if (c === '[') { tokens.push({ t: TokenType.LBrack }); i++; continue; }
    if (c === ']') { tokens.push({ t: TokenType.RBrack }); i++; continue; }
    if (c === '{') { tokens.push({ t: TokenType.LBrace }); i++; continue; }
    if (c === '}') { tokens.push({ t: TokenType.RBrace }); i++; continue; }
    if (c === ',') { tokens.push({ t: TokenType.Comma }); i++; continue; }
    if (c === ':') { tokens.push({ t: TokenType.Colon }); i++; continue; }
    if (c === '=') { tokens.push({ t: TokenType.Equals }); i++; continue; }

    // ── String literal: "..." ─────────────────────────────────────────────
    if (c === '"') {
      const start = i;
      i++; // skip opening quote

      let isClosed = false;
      while (i < n) {
        if (src[i] === '\\') {
          i += 2; // skip backslash + escaped char
        } else if (src[i] === '"') {
          i++;
          isClosed = true;
          break;
        } else {
          i++;
        }
      }

      const rawString = src.slice(start, i);
      try {
        const validJsonString = isClosed ? rawString : rawString + '"';
        tokens.push({ t: TokenType.Str, v: JSON.parse(validJsonString) as string });
      } catch {
        const stripped = rawString.replace(/^"|"$/g, '');
        tokens.push({ t: TokenType.Str, v: stripped });
      }
      continue;
    }

    // ── Number literal: 42, -3, 1.5, 2e10 ────────────────────────────────
    const isDigit = c >= '0' && c <= '9';
    const isNegDigit = c === '-' && i + 1 < n && src[i + 1]! >= '0' && src[i + 1]! <= '9';
    if (isDigit || isNegDigit) {
      const start = i;
      if (src[i] === '-') i++;
      while (i < n && src[i]! >= '0' && src[i]! <= '9') i++;
      if (i < n && src[i] === '.') {
        i++;
        while (i < n && src[i]! >= '0' && src[i]! <= '9') i++;
      }
      if (i < n && (src[i] === 'e' || src[i] === 'E')) {
        i++;
        if (i < n && (src[i] === '+' || src[i] === '-')) i++;
        while (i < n && src[i]! >= '0' && src[i]! <= '9') i++;
      }
      tokens.push({ t: TokenType.Num, v: +src.slice(start, i) });
      continue;
    }

    // ── Keyword or identifier ─────────────────────────────────────────────
    const isAlpha = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    if (isAlpha) {
      const start = i;
      while (
        i < n &&
        ((src[i]! >= 'a' && src[i]! <= 'z') ||
          (src[i]! >= 'A' && src[i]! <= 'Z') ||
          (src[i]! >= '0' && src[i]! <= '9') ||
          src[i] === '_')
      ) i++;

      const word = src.slice(start, i);

      if (word === 'true') { tokens.push({ t: TokenType.True }); continue; }
      if (word === 'false') { tokens.push({ t: TokenType.False }); continue; }
      if (word === 'null') { tokens.push({ t: TokenType.Null }); continue; }

      // PascalCase → component type name; lowercase → variable reference
      const kind = c >= 'A' && c <= 'Z' ? TokenType.Type : TokenType.Ident;
      tokens.push({ t: kind, v: word });
      continue;
    }

    i++; // skip any other character (e.g. @, #, emojis)
  }

  tokens.push({ t: TokenType.EOF });
  return tokens;
}
