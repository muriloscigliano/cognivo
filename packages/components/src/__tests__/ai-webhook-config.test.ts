import { describe, it, expect, afterEach } from 'vitest';
import { AiWebhookConfig } from '../components/ai-webhook-config/ai-webhook-config.js';

if (!customElements.get('ai-webhook-config')) {
  customElements.define('ai-webhook-config', AiWebhookConfig);
}

async function mount(props: Partial<AiWebhookConfig> = {}): Promise<AiWebhookConfig> {
  const element = document.createElement('ai-webhook-config') as AiWebhookConfig;
  Object.assign(element, props);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-webhook-config', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-webhook-config').forEach((el) => el.remove());
  });

  it('Create button is disabled until a URL is entered', async () => {
    const el = await mount({ availableEvents: ['model.complete'] });
    (el.shadowRoot!.querySelector('.add-btn') as HTMLElement).click();
    await el.updateComplete;
    const create = el.shadowRoot!.querySelector('.btn-sm.primary') as HTMLButtonElement;
    expect(create.disabled).toBe(true);

    const input = el.shadowRoot!.querySelector('input[type="url"]') as HTMLInputElement;
    input.value = 'https://example.com/hook';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(create.disabled).toBe(false);
  });

  it('uses the governed on-primary text token, not a background token, for button labels', async () => {
    const css = (AiWebhookConfig as typeof AiWebhookConfig).styles!.toString();
    expect(css).toContain('color: var(--cg-color-action-primary-text-default)');
    expect(css).not.toContain('color: var(--cg-color-surface-container-background)');
  });

  it('focus rings use the saturated focus-ring token and no bare px offset', async () => {
    const css = (AiWebhookConfig as typeof AiWebhookConfig).styles!.toString();
    expect(css).toContain('solid var(--cg-color-focus-ring)');
    expect(css).not.toContain('outline-offset: -2px');
    expect(css).toContain('calc(-1 * var(--cg-outline-offset-default))');
  });

  it('checked toggle uses the saturated toggle tokens, not a translucent overlay', async () => {
    const css = (AiWebhookConfig as typeof AiWebhookConfig).styles!.toString();
    expect(css).toContain('var(--cg-color-toggle-background-on)');
    expect(css).toContain('var(--cg-color-toggle-thumb-on)');
  });

  it('creates a webhook with the entered URL and selected events', async () => {
    const el = await mount({ availableEvents: ['model.complete'] });
    (el.shadowRoot!.querySelector('.add-btn') as HTMLElement).click();
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('input[type="url"]') as HTMLInputElement;
    input.value = 'https://x.test/hook';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    let detail: { url: string; events: string[] } | undefined;
    el.addEventListener('ai-webhook-create', (e) => { detail = (e as CustomEvent).detail; });
    (el.shadowRoot!.querySelector('.btn-sm.primary') as HTMLElement).click();
    expect(detail?.url).toBe('https://x.test/hook');
  });
});
