import { describe, it, expect, afterEach } from 'vitest';
import { CgProgressBar } from '../components/cg-progress-bar/cg-progress-bar.js';

if (!customElements.get('cg-progress-bar')) {
  customElements.define('cg-progress-bar', CgProgressBar);
}

describe('cg-progress-bar', () => {
  let el: CgProgressBar;

  async function create(props?: Partial<CgProgressBar>): Promise<CgProgressBar> {
    el = document.createElement('cg-progress-bar') as CgProgressBar;
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
    expect(el.shadowRoot!.querySelector('.track')).not.toBeNull();
  });

  it('default value is 0', async () => {
    await create();
    expect(el.value).toBe(0);
  });

  it('renders fill bar with correct width', async () => {
    await create({ value: 75 });
    const fill = el.shadowRoot!.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });

  it('clamps value to 0-100', async () => {
    await create({ value: 150 });
    const fill = el.shadowRoot!.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('default variant is "default"', async () => {
    await create();
    expect(el.variant).toBe('default');
    expect(el.getAttribute('variant')).toBe('default');
  });

  it('applies variant attribute', async () => {
    await create({ variant: 'success' });
    expect(el.getAttribute('variant')).toBe('success');
  });

  it('has progressbar role', async () => {
    await create({ value: 50 });
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('role')).toBe('progressbar');
    expect(track.getAttribute('aria-valuenow')).toBe('50');
  });

  it('renders label when provided', async () => {
    await create({ label: 'Upload progress' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toContain('Upload progress');
  });

  it('applies striped attribute', async () => {
    await create({ striped: true });
    expect(el.getAttribute('striped')).not.toBeNull();
  });

  it('renders indeterminate mode', async () => {
    await create({ indeterminate: true });
    expect(el.getAttribute('indeterminate')).not.toBeNull();
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('aria-busy')).toBe('true');
  });
});
