import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiToolIndicator } from '../components/ai-tool-indicator/ai-tool-indicator.js';

if (!customElements.get('ai-tool-indicator')) {
  customElements.define('ai-tool-indicator', AiToolIndicator);
}

describe('ai-tool-indicator', () => {
  let el: AiToolIndicator;

  beforeEach(async () => {
    el = document.createElement('ai-tool-indicator') as AiToolIndicator;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders with shadow root', () => {
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders nothing when tools array is empty', () => {
    expect(el.shadowRoot!.querySelector('.tools')).toBeNull();
  });

  it('renders tool badges for each tool', async () => {
    el.tools = [
      { name: 'web_search', status: 'loading' },
      { name: 'database', status: 'complete' },
    ];
    await el.updateComplete;
    const tools = el.shadowRoot!.querySelectorAll('.tool');
    expect(tools.length).toBe(2);
  });

  it('humanizes tool names', async () => {
    el.tools = [{ name: 'web_search', status: 'loading' }];
    await el.updateComplete;
    const name = el.shadowRoot!.querySelector('.tool-name');
    expect(name!.textContent?.trim()).toBe('Searching the web');
  });

  it('shows spinner for loading tools', async () => {
    el.tools = [{ name: 'search', status: 'loading' }];
    await el.updateComplete;
    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).not.toBeNull();
  });

  it('shows checkmark for complete tools', async () => {
    el.tools = [{ name: 'search', status: 'complete' }];
    await el.updateComplete;
    const check = el.shadowRoot!.querySelector('.check');
    expect(check).not.toBeNull();
    expect(check!.querySelector('svg') || check!.innerHTML.length > 0).toBeTruthy();
  });

  it('shows error icon for error tools', async () => {
    el.tools = [{ name: 'search', status: 'error' }];
    await el.updateComplete;
    const err = el.shadowRoot!.querySelector('.error-icon');
    expect(err).not.toBeNull();
  });

  it('applies correct status class', async () => {
    el.tools = [
      { name: 'a', status: 'loading' },
      { name: 'b', status: 'complete' },
      { name: 'c', status: 'error' },
    ];
    await el.updateComplete;
    const tools = el.shadowRoot!.querySelectorAll('.tool');
    expect(tools[0]!.classList.contains('loading')).toBe(true);
    expect(tools[1]!.classList.contains('complete')).toBe(true);
    expect(tools[2]!.classList.contains('error')).toBe(true);
  });

  it('dispatches ai-tool-click on click', async () => {
    el.tools = [{ name: 'test', status: 'complete' }];
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('ai-tool-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    (el.shadowRoot!.querySelector('.tool') as HTMLElement).click();
    expect(detail).not.toBeNull();
    expect(detail.index).toBe(0);
    expect(detail.tool.name).toBe('test');
  });

  it('has role="status" on container', async () => {
    el.tools = [{ name: 'test', status: 'loading' }];
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.tools');
    expect(container!.getAttribute('role')).toBe('status');
  });

  it('tools have role="button" and tabindex', async () => {
    el.tools = [{ name: 'test', status: 'loading' }];
    await el.updateComplete;
    const tool = el.shadowRoot!.querySelector('.tool');
    expect(tool!.getAttribute('role')).toBe('button');
    expect(tool!.getAttribute('tabindex')).toBe('0');
  });

  it('humanizes unknown tool names', async () => {
    el.tools = [{ name: 'custom_api_call', status: 'loading' }];
    await el.updateComplete;
    const name = el.shadowRoot!.querySelector('.tool-name');
    expect(name!.textContent?.trim()).toBe('Custom Api Call');
  });
});
