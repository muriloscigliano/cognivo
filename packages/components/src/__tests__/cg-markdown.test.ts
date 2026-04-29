import { describe, it, expect, afterEach } from 'vitest';
import { CgMarkdown } from '../components/cg-markdown/cg-markdown.js';

if (!customElements.get('cg-markdown')) {
  customElements.define('cg-markdown', CgMarkdown);
}

describe('cg-markdown', () => {
  let el: CgMarkdown;

  async function create(props?: Partial<CgMarkdown>): Promise<CgMarkdown> {
    el = document.createElement('cg-markdown') as CgMarkdown;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.md')).not.toBeNull();
  });

  it('default text is empty', async () => {
    await create();
    expect(el.text).toBe('');
  });

  it('renders plain text as paragraph', async () => {
    await create({ text: 'Hello world' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.innerHTML).toContain('<p>Hello world</p>');
  });

  it('renders h1 headings with auto-anchor id + permalink', async () => {
    await create({ text: '# Heading One' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const h1 = md.querySelector('h1')!;
    expect(h1).not.toBeNull();
    // Auto-anchored headings have an id slug + a `#` permalink anchor child.
    expect(h1.id).toBe('heading-one');
    expect(h1.firstChild?.textContent?.trim()).toBe('Heading One');
    expect(h1.querySelector('a.anchor')?.getAttribute('href')).toBe('#heading-one');
  });

  it('renders h2 headings', async () => {
    await create({ text: '## Heading Two' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('h2')).not.toBeNull();
  });

  it('renders bold text', async () => {
    await create({ text: 'This is **bold** text' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('strong')).not.toBeNull();
    expect(md.querySelector('strong')!.textContent).toBe('bold');
  });

  it('renders inline code', async () => {
    await create({ text: 'Use `console.log`' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('code')).not.toBeNull();
    expect(md.querySelector('code')!.textContent).toBe('console.log');
  });

  it('renders links', async () => {
    await create({ text: 'Visit [Example](https://example.com)' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const a = md.querySelector('a');
    expect(a).not.toBeNull();
    expect(a!.getAttribute('href')).toBe('https://example.com');
  });

  it('renders italic text', async () => {
    await create({ text: 'This is *italic* text' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('em')).not.toBeNull();
  });

  // ─── Parser correctness — fixes for known bugs ─────────────────────────

  it('wraps unordered list items in <ul>', async () => {
    await create({ text: '- one\n- two\n- three' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const ul = md.querySelector('ul');
    expect(ul).not.toBeNull();
    expect(ul!.querySelectorAll('li').length).toBe(3);
    // No loose <li> outside <ul>
    expect(md.querySelector(':scope > li')).toBeNull();
  });

  it('wraps ordered list items in <ol> (not <ul>)', async () => {
    await create({ text: '1. first\n2. second\n3. third' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('ol')).not.toBeNull();
    expect(md.querySelector('ul')).toBeNull();
    expect(md.querySelector('ol')!.querySelectorAll('li').length).toBe(3);
  });

  it('does not wrap block elements in <p>', async () => {
    await create({ text: '# Title\n\nBody' });
    const md = el.shadowRoot!.querySelector('.md')!;
    // Title should be <h1>, NOT <p><h1>
    const h1 = md.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1!.parentElement?.classList.contains('md')).toBe(true);
  });

  it('does not match headings mid-line', async () => {
    await create({ text: 'Price: $100 ### limited time' });
    const md = el.shadowRoot!.querySelector('.md')!;
    // Should be a paragraph, not a heading
    expect(md.querySelector('h3')).toBeNull();
    expect(md.querySelector('p')).not.toBeNull();
    expect(md.querySelector('p')!.textContent).toContain('### limited time');
  });

  it('joins single-newline lines within a paragraph', async () => {
    await create({ text: 'Line one\nLine two\n\nLine three' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const paragraphs = md.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    // First paragraph joins lines 1 and 2 with a space
    expect(paragraphs[0]!.textContent).toBe('Line one Line two');
    expect(paragraphs[1]!.textContent).toBe('Line three');
  });

  it('strips language identifier from fenced code block', async () => {
    await create({ text: '```typescript\nconst x = 1;\n```' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const code = md.querySelector('pre code');
    expect(code).not.toBeNull();
    // Should contain the code but NOT the language label
    expect(code!.textContent).toBe('const x = 1;');
    expect(code!.textContent).not.toContain('typescript');
  });

  it('escapes HTML inside code blocks', async () => {
    await create({ text: '```\nconst fn = <T>(x: T) => x;\n```' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const code = md.querySelector('pre code');
    expect(code).not.toBeNull();
    // Text content should have the literal <T>
    expect(code!.textContent).toContain('<T>');
  });

  it('escapes HTML in paragraph text', async () => {
    await create({ text: 'Use <script>alert(1)</script> for demo' });
    const md = el.shadowRoot!.querySelector('.md')!;
    // Should NOT have created a script element
    expect(md.querySelector('script')).toBeNull();
    // Text should still contain the literal characters
    expect(md.querySelector('p')!.textContent).toContain('<script>');
  });

  it('handles URLs with parentheses in links', async () => {
    await create({ text: 'See [Wiki](https://en.wikipedia.org/wiki/Foo_(bar))' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const a = md.querySelector('a');
    expect(a).not.toBeNull();
    expect(a!.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Foo_(bar)');
  });

  it('rejects javascript: URLs in links', async () => {
    await create({ text: '[xss](javascript:alert(1))' });
    const md = el.shadowRoot!.querySelector('.md')!;
    // The rendered HTML must never contain javascript: — the parser
    // substitutes about:blank, and the sanitizer then strips unsafe
    // protocols entirely. Either way, no javascript: survives.
    expect(md.innerHTML).not.toContain('javascript:');
    const a = md.querySelector('a');
    if (a) {
      const href = a.getAttribute('href');
      // Either null (sanitizer stripped it) or a safe value
      expect(href === null || !href.includes('javascript:')).toBe(true);
    }
  });

  it('renders blockquotes', async () => {
    await create({ text: '> a quoted line\n> continuing here' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const bq = md.querySelector('blockquote');
    expect(bq).not.toBeNull();
    expect(bq!.textContent).toContain('a quoted line');
    expect(bq!.textContent).toContain('continuing here');
  });

  it('renders horizontal rule', async () => {
    await create({ text: 'Before\n\n---\n\nAfter' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('hr')).not.toBeNull();
  });

  it('does not format inside inline code', async () => {
    await create({ text: 'Use `**not bold**` here' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const code = md.querySelector('code');
    expect(code).not.toBeNull();
    // The ** should be preserved as literal text inside <code>
    expect(code!.textContent).toBe('**not bold**');
    // And there should be NO <strong> inside the code
    expect(code!.querySelector('strong')).toBeNull();
  });

  it('renders GitHub-style alert variants', async () => {
    await create({ text: '> [!WARNING]\n> Be careful here.' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const alert = md.querySelector('blockquote.alert.alert-warning');
    expect(alert).not.toBeNull();
    expect(alert!.querySelector('.alert-label')?.textContent).toBe('Warning');
    expect(alert!.querySelector('.alert-body')?.textContent).toContain('Be careful here.');
  });

  it('renders task list checkboxes', async () => {
    await create({ text: '- [ ] todo\n- [x] done' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const list = md.querySelector('ul.task-list');
    expect(list).not.toBeNull();
    const checks = list!.querySelectorAll('.task-check');
    expect(checks.length).toBe(2);
    expect(checks[0]?.classList.contains('task-check-on')).toBe(false);
    expect(checks[1]?.classList.contains('task-check-on')).toBe(true);
  });

  it('renders code block with language label + copy button', async () => {
    await create({ text: '```typescript\nconst x = 1;\n```' });
    const md = el.shadowRoot!.querySelector('.md')!;
    const block = md.querySelector('.code-block');
    expect(block).not.toBeNull();
    expect(block!.querySelector('.code-lang')?.textContent).toBe('typescript');
    expect(block!.querySelector('.code-copy')).not.toBeNull();
    expect(block!.querySelector('pre code')?.classList.contains('language-typescript')).toBe(true);
  });
});
