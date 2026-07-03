import { describe, it, expect, afterEach } from 'vitest';
import { CgSpinner } from '../components/cg-spinner/cg-spinner.js';

if (!customElements.get('cg-spinner')) {
  customElements.define('cg-spinner', CgSpinner);
}

describe('cg-spinner', () => {
  let el: CgSpinner;

  async function create(props?: Partial<CgSpinner>): Promise<CgSpinner> {
    el = document.createElement('cg-spinner') as CgSpinner;
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
    expect(el.shadowRoot!.querySelector('.spinner')).not.toBeNull();
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('applies size attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('default color variant is "default"', async () => {
    await create();
    expect(el.color).toBe('default');
  });

  it('applies color variant', async () => {
    await create({ color: 'accent' });
    expect(el.getAttribute('color')).toBe('accent');
  });

  it('has status role', async () => {
    await create();
    const spinner = el.shadowRoot!.querySelector('.spinner')!;
    expect(spinner.getAttribute('role')).toBe('status');
  });

  it('names the status via sr-only text without a duplicate aria-label', async () => {
    await create();
    const spinner = el.shadowRoot!.querySelector('.spinner')!;
    // aria-label + identical text content double-announces in some SR combos;
    // the sr-only child is the single source of the accessible name.
    expect(spinner.hasAttribute('aria-label')).toBe(false);
    expect(spinner.querySelector('.sr-only')!.textContent).toBe('Loading');
  });

  it('custom label is applied', async () => {
    await create({ label: 'Processing' });
    const spinner = el.shadowRoot!.querySelector('.spinner')!;
    expect(spinner.hasAttribute('aria-label')).toBe(false);
    expect(spinner.querySelector('.sr-only')!.textContent).toBe('Processing');
  });

  it('renders sr-only text', async () => {
    await create({ label: 'Working' });
    const srOnly = el.shadowRoot!.querySelector('.sr-only');
    expect(srOnly).not.toBeNull();
    expect(srOnly!.textContent).toContain('Working');
  });
});
