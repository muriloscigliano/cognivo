import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';

/**
 * Shadow-DOM piercing tests. happy-dom supports `attachShadow({ mode: 'open' })`;
 * we exercise that to verify the Observer descends into shadow content and produces
 * a nested SceneGraph at `node.shadowRoot`.
 */

describe('scan() — shadow DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('pierces an open shadow root and produces a nested SceneGraph', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>Inside shadow</button>';

    const graph = scan(host);

    expect(graph.root.shadowRoot).toBeDefined();
    expect(graph.root.shadowRoot!.root.tag).toBe('button');
    expect(graph.root.shadowRoot!.nodes.find((n) => n.tag === 'button')).toBeDefined();
  });

  it('captures both light-DOM children and shadow children', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const lightChild = document.createElement('span');
    lightChild.textContent = 'light';
    host.appendChild(lightChild);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<p>shadow paragraph</p>';

    const graph = scan(host);

    // Light children remain in the top-level nodes.
    expect(graph.nodes.find((n) => n.tag === 'span' && n.text === 'light')).toBeDefined();
    // Shadow children live in the nested graph.
    expect(graph.root.shadowRoot!.nodes.find((n) => n.tag === 'p')).toBeDefined();
  });

  it('handles deeply nested shadow content', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<section><article><h2>Title</h2></article></section>';

    const graph = scan(host);
    const shadowNodes = graph.root.shadowRoot!.nodes;

    expect(shadowNodes.find((n) => n.tag === 'section')).toBeDefined();
    expect(shadowNodes.find((n) => n.tag === 'article')).toBeDefined();
    expect(shadowNodes.find((n) => n.tag === 'h2')).toBeDefined();
  });

  it('shadow-content node ids do not collide with light-DOM ids of identical structure', () => {
    // A button at the same position-path appears in both light and shadow.
    document.body.innerHTML = '<div><button>X</button></div>';
    const host = document.body.firstElementChild as HTMLDivElement;
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>X</button>';

    const graph = scan(host);

    const lightButton = graph.nodes.find((n) => n.tag === 'button')!;
    const shadowButton = graph.root.shadowRoot!.nodes.find((n) => n.tag === 'button')!;

    expect(lightButton.id).not.toBe(shadowButton.id);
  });

  it('returns undefined shadowRoot when host has no shadow attached', () => {
    document.body.innerHTML = '<div></div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    expect(graph.root.shadowRoot).toBeUndefined();
  });

  it('respects pierceShadowDOM: false', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>Inside shadow</button>';

    const graph = scan(host, { pierceShadowDOM: false });
    expect(graph.root.shadowRoot).toBeUndefined();
  });

  it('produces deterministic ids on re-scan of shadow content', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>persistent</button>';

    const a = scan(host);
    const b = scan(host);

    expect(a.root.shadowRoot!.root.id).toBe(b.root.shadowRoot!.root.id);
    expect(a.root.shadowRoot!.nodes.map((n) => n.id)).toEqual(
      b.root.shadowRoot!.nodes.map((n) => n.id)
    );
  });
});
