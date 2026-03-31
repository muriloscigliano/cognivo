import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CgAccordion, type AccordionItem } from '../components/cg-accordion/cg-accordion.js';

// Register the custom element if not already registered
if (!customElements.get('cg-accordion')) {
  customElements.define('cg-accordion', CgAccordion);
}

const sampleItems: AccordionItem[] = [
  { value: 'item1', trigger: 'First Item', content: 'Content for first item' },
  { value: 'item2', trigger: 'Second Item', content: 'Content for second item' },
  { value: 'item3', trigger: 'Third Item', content: 'Content for third item' },
];

describe('cg-accordion', () => {
  let el: CgAccordion;

  beforeEach(async () => {
    el = document.createElement('cg-accordion') as CgAccordion;
    el.items = sampleItems;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('renders with shadow DOM', () => {
    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('items closed by default', () => {
    const openItems = el.shadowRoot!.querySelectorAll('.item.open');
    expect(openItems.length).toBe(0);
  });

  it('renders all items', () => {
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).toBe(3);
  });

  it('click opens item', async () => {
    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    (triggers[0] as HTMLElement).click();
    await el.updateComplete;

    const openItems = el.shadowRoot!.querySelectorAll('.item.open');
    expect(openItems.length).toBe(1);
  });

  it('dispatches cg-accordion-change with open items and toggled value', async () => {
    let detail: { open: string[]; toggled: string } | null = null;
    el.addEventListener('cg-accordion-change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    (triggers[0] as HTMLElement).click();
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail!.toggled).toBe('item1');
    expect(detail!.open).toContain('item1');
  });

  it('multiple mode allows multiple open', async () => {
    el.multiple = true;
    await el.updateComplete;

    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    (triggers[0] as HTMLElement).click();
    await el.updateComplete;
    (triggers[1] as HTMLElement).click();
    await el.updateComplete;

    const openItems = el.shadowRoot!.querySelectorAll('.item.open');
    expect(openItems.length).toBe(2);
  });

  it('single mode closes others when one opens', async () => {
    el.multiple = false;
    await el.updateComplete;

    const triggers = el.shadowRoot!.querySelectorAll('.trigger');

    // Open first
    (triggers[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.item.open').length).toBe(1);

    // Open second — first should close
    (triggers[1] as HTMLElement).click();
    await el.updateComplete;

    const openItems = el.shadowRoot!.querySelectorAll('.item.open');
    expect(openItems.length).toBe(1);
    // Verify the second one is open, not the first
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items[0]!.classList.contains('open')).toBe(false);
    expect(items[1]!.classList.contains('open')).toBe(true);
  });

  it('clicking an open item closes it', async () => {
    const triggers = el.shadowRoot!.querySelectorAll('.trigger');

    (triggers[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.item.open').length).toBe(1);

    (triggers[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.item.open').length).toBe(0);
  });

  it('chevron is present for each item', () => {
    const chevrons = el.shadowRoot!.querySelectorAll('.chevron');
    expect(chevrons.length).toBe(3);
  });

  it('chevron rotates on open (open class triggers CSS rotation)', async () => {
    const styles = CgAccordion.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('rotate(180deg)');
  });

  it('default variant is "default"', () => {
    expect(el.variant).toBe('default');
    expect(el.getAttribute('variant')).toBe('default');
  });

  it('variant attribute reflects (card)', async () => {
    el.variant = 'card';
    await el.updateComplete;
    expect(el.getAttribute('variant')).toBe('card');
  });

  it('variant attribute reflects (bordered)', async () => {
    el.variant = 'bordered';
    await el.updateComplete;
    expect(el.getAttribute('variant')).toBe('bordered');
  });

  it('focus-visible ring exists in styles', () => {
    const styles = CgAccordion.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('focus-visible');
  });

  it('content height animates with grid-template-rows', () => {
    const styles = CgAccordion.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('grid-template-rows');
    expect(cssText).toContain('0fr');
    expect(cssText).toContain('1fr');
  });

  it('triggers have aria-expanded attribute', () => {
    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    triggers.forEach(trigger => {
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('aria-expanded is "true" when item is open', async () => {
    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    (triggers[0] as HTMLElement).click();
    await el.updateComplete;

    const updatedTriggers = el.shadowRoot!.querySelectorAll('.trigger');
    expect(updatedTriggers[0]!.getAttribute('aria-expanded')).toBe('true');
    expect(updatedTriggers[1]!.getAttribute('aria-expanded')).toBe('false');
  });

  it('disabled item cannot be toggled', async () => {
    el.items = [
      { value: 'a', trigger: 'Enabled', content: 'Content' },
      { value: 'b', trigger: 'Disabled', content: 'Content', disabled: true },
    ];
    await el.updateComplete;

    const triggers = el.shadowRoot!.querySelectorAll('.trigger');
    const disabledTrigger = triggers[1] as HTMLButtonElement;
    expect(disabledTrigger.disabled).toBe(true);
  });

  it('defaultOpen opens specified items on first render', async () => {
    const el2 = document.createElement('cg-accordion') as CgAccordion;
    el2.items = sampleItems;
    el2.defaultOpen = ['item2'];
    document.body.appendChild(el2);
    await el2.updateComplete;
    // firstUpdated sets _openItems which triggers another render
    await el2.updateComplete;

    const openItems = el2.shadowRoot!.querySelectorAll('.item.open');
    expect(openItems.length).toBe(1);

    el2.remove();
  });

  it('content region has role="region"', () => {
    const regions = el.shadowRoot!.querySelectorAll('[role="region"]');
    expect(regions.length).toBe(3);
  });
});
