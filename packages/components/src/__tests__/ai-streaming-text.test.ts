import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiStreamingText } from '../components/ai-streaming-text/ai-streaming-text.js';

if (!customElements.get('ai-streaming-text')) {
  customElements.define('ai-streaming-text', AiStreamingText);
}

describe('ai-streaming-text', () => {
  let el: AiStreamingText;

  beforeEach(async () => {
    el = document.createElement('ai-streaming-text') as AiStreamingText;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders with shadow root', () => {
    expect(el.shadowRoot).toBeDefined();
  });

  it('shows empty state when no content and not streaming', () => {
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
  });

  it('renders content when set', async () => {
    el.content = 'Hello world';
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.container');
    expect(container).not.toBeNull();
    expect(container!.textContent).toContain('Hello world');
  });

  it('renders container when streaming', async () => {
    el.content = 'Hello';
    el.streaming = true;
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.container');
    expect(container).not.toBeNull();
    expect(container!.textContent).toContain('Hello');
  });

  it('shows empty state when content is cleared and not streaming', async () => {
    el.content = '';
    el.streaming = false;
    await el.updateComplete;
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
  });

  it('append() adds content and sets streaming', async () => {
    el.appendText('Hello ');
    await el.updateComplete;
    expect(el.content).toBe('Hello ');
    expect(el.streaming).toBe(true);

    el.appendText('world');
    await el.updateComplete;
    expect(el.content).toBe('Hello world');
  });

  it('complete() stops streaming', async () => {
    el.appendText('Done');
    await el.updateComplete;
    expect(el.streaming).toBe(true);

    el.complete();
    await el.updateComplete;
    expect(el.streaming).toBe(false);
  });

  it('reset() clears content and streaming', async () => {
    el.appendText('test');
    el.reset();
    await el.updateComplete;
    expect(el.content).toBe('');
    expect(el.streaming).toBe(false);
  });

  it('dispatches ai-streaming-chunk on append', async () => {
    let detail: any = null;
    el.addEventListener('ai-streaming-chunk', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    el.appendText('token');
    expect(detail).not.toBeNull();
    expect(detail.chunk).toBe('token');
  });

  it('dispatches ai-streaming-complete on complete', async () => {
    let fired = false;
    el.addEventListener('ai-streaming-complete', () => { fired = true; });
    el.content = 'done';
    el.complete();
    expect(fired).toBe(true);
  });

  it('has role="status" and aria-live', async () => {
    el.content = 'test';
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.container');
    expect(container!.getAttribute('role')).toBe('status');
    expect(container!.getAttribute('aria-live')).toBe('polite');
  });

  it('sanitizes javascript: URLs in markdown', async () => {
    el.content = '[click](javascript:alert(1))';
    el.markdown = true;
    await el.updateComplete;
    const html = el.shadowRoot!.querySelector('.container span')?.innerHTML || '';
    expect(html).not.toContain('javascript:');
    expect(html).toContain('href="#"');
  });
});
