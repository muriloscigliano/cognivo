import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { scan, watch } from '../../observer';
import type { SceneGraph } from '../../types/scene-graph';

/**
 * End-to-end Observer tests using Cognivo-style components: an element with an
 * open shadow root, nested structure, and mutations across light + shadow DOM.
 */

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function buildPricingCard(label: string, price: string): HTMLElement {
  // A simulated <cg-pricing-card>: custom-element-shaped, with shadow content.
  const card = document.createElement('cg-pricing-card');
  card.setAttribute('variant', 'default');
  const shadow = card.attachShadow({ mode: 'open' });
  const wrapper = document.createElement('div');
  wrapper.setAttribute('role', 'group');
  wrapper.innerHTML = `
    <h3>${label}</h3>
    <p class="price">${price}</p>
    <button>Choose ${label}</button>
  `;
  shadow.appendChild(wrapper);
  return card;
}

describe('Observer integration — Cognivo-style scenario', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="page"></main>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('scans a page with two custom-element pricing cards and pierces both shadows', () => {
    const page = document.getElementById('page')!;
    page.appendChild(buildPricingCard('Basic', '$9'));
    page.appendChild(buildPricingCard('Pro', '$29'));

    const graph = scan(page);

    // Top level: page > 2 cg-pricing-card hosts
    const cards = graph.nodes.filter((n) => n.tag === 'cg-pricing-card');
    expect(cards).toHaveLength(2);
    cards.forEach((card) => {
      expect(card.shadowRoot).toBeDefined();
      const shadowTags = card.shadowRoot!.nodes.map((n) => n.tag);
      expect(shadowTags).toContain('h3');
      expect(shadowTags).toContain('p');
      expect(shadowTags).toContain('button');
    });
  });

  it('shadow content survives light-DOM-only mutations without changing ids', () => {
    const page = document.getElementById('page')!;
    const card = buildPricingCard('Basic', '$9');
    page.appendChild(card);

    const before = scan(page);
    const beforeButton = before.nodes
      .find((n) => n.tag === 'cg-pricing-card')!
      .shadowRoot!.nodes.find((n) => n.tag === 'button')!;

    // Mutate light DOM only — append a sibling
    page.appendChild(document.createElement('aside'));

    const after = scan(page);
    const afterButton = after.nodes
      .find((n) => n.tag === 'cg-pricing-card')!
      .shadowRoot!.nodes.find((n) => n.tag === 'button')!;

    expect(afterButton.id).toBe(beforeButton.id);
  });

  it('watch() observes mutations across the page (including shadow content via host re-attachment)', async () => {
    const page = document.getElementById('page')!;
    page.appendChild(buildPricingCard('Basic', '$9'));

    const cb = vi.fn();
    const handle = watch(document, cb, { debounceMs: 30 });

    // Add a third card (light-DOM mutation)
    page.appendChild(buildPricingCard('Pro', '$29'));

    await wait(80);

    expect(cb).toHaveBeenCalled();
    const lastCall = cb.mock.calls[cb.mock.calls.length - 1]!;
    const graph = lastCall[0] as SceneGraph;
    const cards = graph.nodes.filter((n) => n.tag === 'cg-pricing-card');
    expect(cards).toHaveLength(2);

    handle.disconnect();
  });

  it('scene graphs are structured-cloneable (safe for postMessage)', () => {
    const page = document.getElementById('page')!;
    page.appendChild(buildPricingCard('Basic', '$9'));
    const graph = scan(page);

    // structuredClone fails on functions, DOM refs, etc. If our SceneGraph leaks
    // any of those, this will throw — Spec §3.3 demands postMessage compatibility.
    expect(() => structuredClone(graph)).not.toThrow();

    const cloned = structuredClone(graph);
    expect(cloned.root.tag).toBe(graph.root.tag);
    expect(cloned.nodes.length).toBe(graph.nodes.length);
  });

  it('public API surface is callable from the package barrel', () => {
    // Import path verifies tree-shake-safe public exports.
    expect(typeof scan).toBe('function');
    expect(typeof watch).toBe('function');
  });
});
