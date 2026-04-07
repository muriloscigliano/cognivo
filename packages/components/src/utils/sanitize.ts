/**
 * HTML sanitizer for XSS prevention.
 * Strips dangerous tags, event handler attributes, and dangerous URL protocols
 * from HTML strings before innerHTML assignment.
 */

const DANGEROUS_TAGS = /<(script|iframe|object|embed|form|style|link|meta|base)\b[^]*?(?:\/>|<\/\1>)/gi;
const DANGEROUS_ATTRS = /\s+on\w+\s*=\s*["'][^"']*["']|\s+on\w+\s*=\s*\S+/gi;
const DANGEROUS_URLS = /(href|src|action)\s*=\s*["']\s*(javascript|data|vbscript):/gi;

export function sanitizeHTML(html: string): string {
  return html
    .replace(DANGEROUS_TAGS, '')
    .replace(DANGEROUS_ATTRS, '')
    .replace(DANGEROUS_URLS, '$1="about:blank"');
}
