import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiThinking } from '../components/ai-thinking/ai-thinking.js';

if (!customElements.get('ai-thinking-ext')) {
  customElements.define('ai-thinking-ext', class extends AiThinking {});
}

describe('ai-thinking extended features', () => {
  let el: AiThinking;

  beforeEach(async () => {
    el = document.createElement('ai-thinking-ext') as AiThinking;
    el.delay = 0;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders spinner variant', async () => {
    el.variant = 'spinner';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.ring')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.icon')).toBeNull();
  });

  it('renders skeleton variant', async () => {
    el.variant = 'skeleton';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.skeleton')).not.toBeNull();
    const lines = el.shadowRoot!.querySelectorAll('.skeleton-line');
    expect(lines.length).toBe(3);
  });

  it('shows cancel button when cancelable', async () => {
    el.cancelable = true;
    await el.updateComplete;
    const btn = el.shadowRoot!.querySelector('.cancel');
    expect(btn).not.toBeNull();
  });

  it('hides cancel button when not cancelable', async () => {
    el.cancelable = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.cancel')).toBeNull();
  });

  it('dispatches ai-thinking-cancel on cancel click', async () => {
    el.cancelable = true;
    await el.updateComplete;
    let fired = false;
    el.addEventListener('ai-thinking-cancel', () => { fired = true; });
    (el.shadowRoot!.querySelector('.cancel') as HTMLElement).click();
    expect(fired).toBe(true);
  });

  it('shows progress bar when progress >= 0', async () => {
    el.progress = 50;
    await el.updateComplete;
    const bar = el.shadowRoot!.querySelector('.progress-bar');
    expect(bar).not.toBeNull();
    expect(bar!.getAttribute('aria-valuenow')).toBe('50');
  });

  it('hides progress bar when progress < 0', async () => {
    el.progress = -1;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.progress-bar')).toBeNull();
  });

  it('renders tool indicators', async () => {
    el.tools = [
      { name: 'web_search', status: 'loading' },
      { name: 'database', status: 'complete' },
    ];
    await el.updateComplete;
    const tools = el.shadowRoot!.querySelectorAll('.tool');
    expect(tools.length).toBe(2);
  });

  it('shows correct tool status icons', async () => {
    el.tools = [
      { name: 'a', status: 'complete' },
      { name: 'b', status: 'error' },
    ];
    await el.updateComplete;
    const tools = el.shadowRoot!.querySelectorAll('.tool');
    expect(tools[0]!.classList.contains('complete')).toBe(true);
    expect(tools[1]!.classList.contains('error')).toBe(true);
  });

  it('uses stages for display text', async () => {
    el.stages = ['Connecting...', 'Analyzing...', 'Done'];
    await el.updateComplete;
    const text = el.shadowRoot!.querySelector('.text');
    expect(text!.textContent).toBe('Connecting...');
  });

  it('hides content until delay passes', async () => {
    const delayed = document.createElement('ai-thinking-ext') as AiThinking;
    delayed.delay = 500;
    document.body.appendChild(delayed);
    await delayed.updateComplete;
    // Should not be visible yet
    expect(delayed.shadowRoot!.querySelector('.container')).toBeNull();
    delayed.remove();
  });
});
