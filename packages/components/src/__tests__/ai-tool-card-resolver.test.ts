import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiToolCardResolver } from '../components/ai-tool-card-resolver/ai-tool-card-resolver.js';

if (!customElements.get('ai-tool-card-resolver')) {
  customElements.define('ai-tool-card-resolver', AiToolCardResolver);
}

describe('ai-tool-card-resolver', () => {
  let el: AiToolCardResolver;

  beforeEach(async () => {
    el = document.createElement('ai-tool-card-resolver') as AiToolCardResolver;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders the fallback JSON view when no tool name is set', () => {
    expect(el.shadowRoot!.querySelector('.fallback')).not.toBeNull();
  });

  it('shows loading skeleton when loading', async () => {
    el.loading = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.skeleton')).not.toBeNull();
  });

  it('resolves a registered, defined component', async () => {
    if (!customElements.get('x-defined-card')) {
      customElements.define('x-defined-card', class extends HTMLElement {});
    }
    el.registry = { widget: 'x-defined-card' };
    el.toolName = 'widget';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resolved x-defined-card')).not.toBeNull();
  });

  it('falls back (not empty node) for a registered but undefined tag', async () => {
    el.registry = { ghost: 'x-never-defined-card' };
    el.toolName = 'ghost';
    await el.updateComplete;
    // Must NOT place an inert undefined element inside .resolved.
    expect(el.shadowRoot!.querySelector('.resolved')).toBeNull();
    expect(el.shadowRoot!.querySelector('.fallback')).not.toBeNull();
  });

  it('re-renders and resolves once a lazily-defined tag upgrades', async () => {
    el.registry = { lazy: 'x-lazy-card' };
    el.toolName = 'lazy';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resolved')).toBeNull();

    customElements.define('x-lazy-card', class extends HTMLElement {});
    await customElements.whenDefined('x-lazy-card');
    // allow the whenDefined().then requestUpdate to flush
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.resolved x-lazy-card')).not.toBeNull();
  });

  it('does not dispatch an error event during a normal resolve', async () => {
    if (!customElements.get('x-ok-card')) {
      customElements.define('x-ok-card', class extends HTMLElement {});
    }
    let errored = false;
    el.addEventListener('ai-tool-card-error', () => { errored = true; });
    el.registry = { ok: 'x-ok-card' };
    el.toolName = 'ok';
    await el.updateComplete;
    expect(errored).toBe(false);
  });

  it('does not error or leave a stale error when switching to an unresolved tool', async () => {
    // Guards against render-time state mutation (F1): resolution failure must
    // not fire the error event, and must not throw a "scheduled an update after
    // update completed" during render.
    let errored = false;
    el.addEventListener('ai-tool-card-error', () => { errored = true; });
    el.registry = { ghost: 'x-unregistered-card' };
    el.toolName = 'ghost';
    await el.updateComplete;
    await el.updateComplete;
    // Undefined tag -> fallback, no error event (fallback, not error, is shown).
    expect(errored).toBe(false);
    expect(el.shadowRoot!.querySelector('.fallback')).not.toBeNull();
  });
});
