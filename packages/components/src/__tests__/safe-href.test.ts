/**
 * Every component that renders a user-supplied href goes through the shared
 * `isSafeHref` (src/utils/safe-href.ts): a `javascript:`, `data:` or
 * `vbscript:` URL — in any case, with leading spaces / control characters or
 * tabs and newlines inside the scheme (browsers strip those) — never reaches
 * an `<a href>`. Safe URLs still do.
 */
import { describe, it, expect } from 'vitest';
import { isSafeHref, safeHref } from '../utils/safe-href.js';
import '../components/cg-link/cg-link.js';
import '../components/cg-button/cg-button.js';
import '../components/cg-breadcrumbs/cg-breadcrumbs.js';
import '../components/cg-navbar/cg-navbar.js';
import '../components/cg-image-block/cg-image-block.js';
import '../components/bias-authority/bias-authority.js';
import '../components/ai-source-graph/ai-source-graph.js';
import '../components/ai-insight-card/ai-insight-card.js';
import '../components/ai-result-panel/ai-result-panel.js';
import '../components/ai-citation/ai-citation.js';
import '../components/ai-data-card/ai-data-card.js';

const UNSAFE = [
  'javascript:alert(1)',
  'JaVaScRiPt:alert(1)',
  '  javascript:alert(1)',
  '\u0001javascript:alert(1)',
  'java\tscript:alert(1)',
  'java\nscript:alert(1)',
  'javascript\r:alert(1)',
  'data:text/html,<script>alert(1)</script>',
  'DATA:text/html;base64,PHNjcmlwdD4=',
  'vbscript:msgbox(1)',
  ' VBScript:msgbox(1)',
];
const SAFE = ['https://example.com/a', '/docs', '#section', 'mailto:hi@example.com', 'page.html', 'https://example.com/?q=javascript:x'];

/** Elements whose shadow root renders `href` as a link; each returns the element. */
const CASES: Record<string, (href: string) => HTMLElement> = {
  'cg-link': (href) => Object.assign(document.createElement('cg-link'), { href, textContent: 'x' }),
  'cg-button': (href) => Object.assign(document.createElement('cg-button'), { href, textContent: 'x' }),
  'cg-breadcrumbs': (href) => Object.assign(document.createElement('cg-breadcrumbs'), { items: [{ label: 'A', href }, { label: 'B' }] }),
  'cg-navbar items': (href) => Object.assign(document.createElement('cg-navbar'), { items: [{ label: 'A', value: 'a', href }] }),
  'cg-navbar brand': (href) => Object.assign(document.createElement('cg-navbar'), { brandHref: href }),
  'cg-image-block': (href) => Object.assign(document.createElement('cg-image-block'), { src: 'https://example.com/i.png', source: 'S', sourceUrl: href }),
  'bias-authority': (href) => Object.assign(document.createElement('bias-authority'), { source: 'S', href }),
  'ai-source-graph': (href) => Object.assign(document.createElement('ai-source-graph'), { sources: [{ id: '1', title: 'S', url: href, type: 'web' }] }),
  'ai-insight-card': (href) => Object.assign(document.createElement('ai-insight-card'), { text: 'T', expanded: true, sources: [{ title: 'S', url: href }] }),
  'ai-result-panel': (href) => Object.assign(document.createElement('ai-result-panel'), { explanation: 'E', sources: [{ title: 'S', url: href }] }),
  'ai-citation': (href) => Object.assign(document.createElement('ai-citation'), { mode: 'list', sources: [{ title: 'S', url: href }] }),
  'ai-data-card': (href) => Object.assign(document.createElement('ai-data-card'), { fields: [{ label: 'L', value: 'v', type: 'link', url: href }] }),
};

async function hrefs(make: (href: string) => HTMLElement, href: string): Promise<string[]> {
  const el = make(href);
  document.body.append(el);
  await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
  // ai-result-panel: open the Sources tab.
  const tab = el.shadowRoot!.querySelector<HTMLElement>('#tab-sources');
  if (tab) {
    tab.click();
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
  }
  const out = [...el.shadowRoot!.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')!);
  el.remove();
  return out;
}

describe('isSafeHref', () => {
  it('refuses script and data schemes in every spelling browsers accept', () => {
    for (const h of UNSAFE) expect(isSafeHref(h), JSON.stringify(h)).toBe(false);
    for (const h of SAFE) expect(isSafeHref(h), h).toBe(true);
    expect(safeHref('javascript:x')).toBeUndefined();
    expect(safeHref('')).toBeUndefined();
    expect(safeHref(undefined)).toBeUndefined();
    expect(safeHref('/a')).toBe('/a');
  });
});

describe('components never render an unsafe href', () => {
  for (const [name, make] of Object.entries(CASES)) {
    it(name, async () => {
      const ok = await hrefs(make, 'https://example.com/a');
      expect(ok, `${name} renders a safe href`).toContain('https://example.com/a');
      for (const h of UNSAFE) {
        const rendered = await hrefs(make, h);
        expect(rendered.filter((r) => !isSafeHref(r)), `${name} with ${JSON.stringify(h)}`).toEqual([]);
      }
    });
  }
});
