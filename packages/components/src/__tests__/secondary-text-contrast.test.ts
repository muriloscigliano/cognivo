import { describe, it, expect } from 'vitest';
import { CgTable } from '../components/cg-table/cg-table.js';
import { CgToaster } from '../components/cg-toaster/cg-toaster.js';

/**
 * axe (dark theme) flagged cg-table's column headers and cg-toaster's
 * description. Both must paint the secondary-text token whose pairs
 * (`table-header-text`, `toast-description`) are hard-gated in BOTH themes by
 * packages/tokens/scripts/validate-contrast.mjs — not a border token.
 */
const cssOf = (styles: unknown) =>
  ([styles].flat(Infinity) as Array<{ cssText: string }>).map((s) => s.cssText).join('\n');
const rule = (css: string, selector: RegExp) => css.match(new RegExp(`${selector.source}\\s*\\{[^}]*\\}`))?.[0] ?? '';

describe('secondary text uses the contrast-gated token', () => {
  it('cg-table th text is --cg-color-on-surface-container-default on the container background', () => {
    const th = rule(cssOf(CgTable.styles), /(?:^|\n|\})\s*th/);
    expect(th).toContain('color: var(--cg-color-on-surface-container-default)');
    expect(th).toContain('background: var(--cg-color-surface-container-background)');
  });

  it('cg-toaster .toast-desc is --cg-color-on-surface-container-default, never a border token', () => {
    const desc = rule(cssOf(CgToaster.styles), /\.toast-desc/);
    expect(desc).toContain('color: var(--cg-color-on-surface-container-default)');
    expect(desc).not.toContain('outlined');
  });
});
