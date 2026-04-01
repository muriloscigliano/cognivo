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

  it('renders h1 headings', async () => {
    await create({ text: '# Heading One' });
    const md = el.shadowRoot!.querySelector('.md')!;
    expect(md.querySelector('h1')).not.toBeNull();
    expect(md.querySelector('h1')!.textContent).toBe('Heading One');
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
});
