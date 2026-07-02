import { describe, it, expect, afterEach } from 'vitest';
import { CgNavigationMenu } from '../components/cg-navigation-menu/cg-navigation-menu.js';

if (!customElements.get('cg-navigation-menu')) {
  customElements.define('cg-navigation-menu', CgNavigationMenu);
}

describe('cg-navigation-menu', () => {
  let el: CgNavigationMenu;

  async function create(): Promise<CgNavigationMenu> {
    el = document.createElement('cg-navigation-menu') as CgNavigationMenu;
    el.items = [
      {
        label: 'Products',
        sections: [
          { heading: 'Core', links: [{ title: 'Analytics', description: 'Dashboards' }] },
        ],
      },
      { label: 'Pricing', sections: [{ links: [{ title: 'Plans' }] }] },
    ];
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM and nav role', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('nav[role="navigation"]')).not.toBeNull();
  });

  it('renders trigger buttons', async () => {
    await create();
    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    expect(triggers.length).toBe(2);
  });

  it('triggers expose disclosure semantics (expanded + controls when open)', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    // Not an ARIA menu (no menu keyboard model) — plain disclosure buttons
    expect(trigger.hasAttribute('aria-haspopup')).toBe(false);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.hasAttribute('aria-controls')).toBe(false);
    trigger.click();
    await el.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe('cg-navigation-menu-panel');
  });

  it('opens panel on click', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.panel')).not.toBeNull();
  });

  it('dispatches cg-navigation-menu-select on link click', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-navigation-menu-select', (e: Event) => { detail = (e as CustomEvent).detail; });
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    trigger.click();
    await el.updateComplete;
    const link = el.shadowRoot!.querySelector<HTMLButtonElement>('.link')!;
    link.click();
    expect(detail?.link).toBe('Analytics');
  });
});
