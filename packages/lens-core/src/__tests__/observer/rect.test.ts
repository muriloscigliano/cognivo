import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';

describe('scan() — rect resolution', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('every node has all 8 numeric rect fields', () => {
    document.body.innerHTML = '<div><span>hi</span></div>';
    const graph = scan(document);

    for (const node of graph.nodes) {
      expect(typeof node.rect.x).toBe('number');
      expect(typeof node.rect.y).toBe('number');
      expect(typeof node.rect.width).toBe('number');
      expect(typeof node.rect.height).toBe('number');
      expect(typeof node.rect.top).toBe('number');
      expect(typeof node.rect.left).toBe('number');
      expect(typeof node.rect.right).toBe('number');
      expect(typeof node.rect.bottom).toBe('number');
    }
  });

  it('shadow-DOM nodes also receive rect data', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>X</button>';

    const graph = scan(host);
    const shadowButton = graph.root.shadowRoot!.nodes.find((n) => n.tag === 'button')!;
    expect(typeof shadowButton.rect.x).toBe('number');
    expect(typeof shadowButton.rect.width).toBe('number');
  });

  it('applies window scroll offset to rect coordinates', () => {
    document.body.innerHTML = '<div></div>';
    const root = document.body.firstElementChild as Element;

    const view = root.ownerDocument!.defaultView!;
    const originalScrollX = view.scrollX;
    const originalScrollY = view.scrollY;

    try {
      Object.defineProperty(view, 'scrollX', { value: 100, configurable: true });
      Object.defineProperty(view, 'scrollY', { value: 200, configurable: true });

      const graph = scan(root);
      // happy-dom returns 0 for getBoundingClientRect, so x/y should equal scroll offsets.
      expect(graph.root.rect.x).toBe(100);
      expect(graph.root.rect.y).toBe(200);
      expect(graph.root.rect.left).toBe(100);
      expect(graph.root.rect.top).toBe(200);
    } finally {
      Object.defineProperty(view, 'scrollX', { value: originalScrollX, configurable: true });
      Object.defineProperty(view, 'scrollY', { value: originalScrollY, configurable: true });
    }
  });
});
