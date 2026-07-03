import { describe, it, expect, afterEach } from 'vitest';
import { CgButton } from '../components/cg-button/cg-button.js';

if (!customElements.get('cg-button')) {
  customElements.define('cg-button', CgButton);
}

describe('cg-button', () => {
  let el: CgButton;

  async function create(props?: Partial<CgButton>): Promise<CgButton> {
    el = document.createElement('cg-button') as CgButton;
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

  // ── Rendering ──

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
  });

  // ── Default property values ──

  it('default variant is primary', async () => {
    await create();
    expect(el.variant).toBe('primary');
    expect(el.getAttribute('variant')).toBe('primary');
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  // ── Variant attribute reflects ──

  it('variant="secondary" reflects to attribute', async () => {
    await create({ variant: 'secondary' });
    expect(el.getAttribute('variant')).toBe('secondary');
  });

  it('variant="tertiary" reflects to attribute', async () => {
    await create({ variant: 'tertiary' });
    expect(el.getAttribute('variant')).toBe('tertiary');
  });

  // ── Size attribute reflects ──

  it('size="sm" reflects to attribute', async () => {
    await create({ size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('size="lg" reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  // ── Disabled ──

  it('disabled prevents click by disabling the native button', async () => {
    await create({ disabled: true });
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.disabled).toBe(true);
  });

  it('disabled attribute reflects on host', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  // ── Loading ──

  it('loading shows spinner element', async () => {
    await create({ loading: true });
    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).not.toBeNull();
  });

  it('loading hides text via transparent color (loading attribute on host)', async () => {
    await create({ loading: true });
    expect(el.hasAttribute('loading')).toBe(true);
  });

  it('loading sets aria-busy="true" on button', async () => {
    await create({ loading: true });
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('aria-busy="false" when not loading', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-busy')).toBe('false');
  });

  it('loading disables the native button (pointer-events none)', async () => {
    await create({ loading: true });
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.disabled).toBe(true);
  });

  it('spinner is not present when not loading', async () => {
    await create();
    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).toBeNull();
  });

  // ── Full width ──

  it('full attribute reflects on host', async () => {
    await create({ full: true });
    expect(el.hasAttribute('full')).toBe(true);
  });

  // ── Type danger ──

  it('type="danger" reflects to attribute', async () => {
    await create({ type: 'danger' });
    expect(el.getAttribute('type')).toBe('danger');
  });

  // ── Slots ──

  it('has a default slot for label text', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).not.toBeNull();
  });

  it('has prefix slot', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot[name="prefix"]');
    expect(slot).not.toBeNull();
  });

  it('has suffix slot', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot[name="suffix"]');
    expect(slot).not.toBeNull();
  });

  // ── Button setup ──

  it('button has position relative', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector('button')!;
    const styles = getComputedStyle(btn);
    expect(styles.position).toBe('relative');
  });

  // ── Focus ring ──

  it('button has focus-visible styles defined (box-shadow rule exists)', async () => {
    await create();
    // Verify the button element exists with proper structure for focus-visible
    const btn = el.shadowRoot!.querySelector('button');
    expect(btn).not.toBeNull();
    // The focus-visible CSS rule is defined in the static styles — we verify the button renders
    // and the host styles include the rule by checking the adoptedStyleSheets
    const sheets = el.shadowRoot!.adoptedStyleSheets ?? [];
    const hasRule = sheets.some(sheet => {
      try {
        return [...sheet.cssRules].some(r => r.cssText.includes('focus-visible'));
      } catch { return false; }
    });
    expect(hasRule).toBe(true);
  });

  // ── Press scale ──

  it('button has active scale styles defined (press-scale rule exists)', async () => {
    await create();
    const sheets = el.shadowRoot!.adoptedStyleSheets ?? [];
    const hasRule = sheets.some(sheet => {
      try {
        return [...sheet.cssRules].some(r => r.cssText.includes('active'));
      } catch { return false; }
    });
    expect(hasRule).toBe(true);
  });

  // ── Label prop ──

  it('renders label prop as aria-label on button', async () => {
    await create({ label: 'Submit form' });
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Submit form');
  });

  // ── Dynamic updates ──

  it('toggling loading dynamically shows/hides spinner', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.spinner')).toBeNull();

    el.loading = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.spinner')).not.toBeNull();

    el.loading = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.spinner')).toBeNull();
  });

  it('changing variant dynamically updates attribute', async () => {
    await create({ variant: 'primary' });
    expect(el.getAttribute('variant')).toBe('primary');

    el.variant = 'secondary';
    await el.updateComplete;
    expect(el.getAttribute('variant')).toBe('secondary');
  });

  // ── Themeable disabled state (regression: no opacity smudge) ──

  function cssText(): string {
    const sheets = el.shadowRoot!.adoptedStyleSheets ?? [];
    return sheets
      .flatMap(sheet => {
        try {
          return [...sheet.cssRules].map(r => r.cssText);
        } catch {
          return [];
        }
      })
      .join('\n');
  }

  it('exposes part="button" so consumers can theme the button', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('part')).toBe('button');
  });

  it('disabled state uses themeable action-disable tokens per variant, not opacity dimming', async () => {
    await create({ disabled: true });
    const css = cssText();
    // The disabled color must come from the semantic disable tokens (themeable on a re-pointed brand)…
    expect(css).toContain('--cg-color-action-primary-background-disable');
    expect(css).toContain('--cg-color-action-secondary-background-disable');
    expect(css).toContain('--cg-color-action-tertiary-background-disable');
    // …and the button:disabled rule must not fall back to fractional opacity (the smudge bug).
    const disabledRule = cssText()
      .split('\n')
      .find(rule => /button:disabled\b/.test(rule) && !/:not\(:disabled\)/.test(rule)) ?? '';
    expect(disabledRule).not.toMatch(/opacity:\s*0?\.\d/);
  });
});
