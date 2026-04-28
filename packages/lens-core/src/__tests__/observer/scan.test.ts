import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';

/**
 * These tests run under vitest's `environment: 'happy-dom'` so `document` and
 * `window` are happy-dom instances. They behave compatibly with real DOM for
 * the read-only APIs the Observer uses (tagName, children, getComputedStyle,
 * getBoundingClientRect, role attributes).
 */

describe('scan() — basic DOM walk', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('produces a SceneGraph for a Document with body content', () => {
    document.body.innerHTML = '<main><h1>Hello</h1><p>world</p></main>';
    const graph = scan(document);

    expect(graph.root.tag).toBe('html');
    expect(graph.nodes.length).toBeGreaterThanOrEqual(4); // html, body, main, h1, p
    expect(graph.nodes.find((n) => n.tag === 'main')).toBeDefined();
    expect(graph.nodes.find((n) => n.tag === 'h1')).toBeDefined();
    expect(graph.nodes.find((n) => n.tag === 'p')).toBeDefined();
  });

  it('produces a SceneGraph for an Element', () => {
    document.body.innerHTML = '<div><button>Click me</button><span>label</span></div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);

    expect(graph.root.tag).toBe('div');
    expect(graph.root.children).toHaveLength(2);
    expect(graph.nodes.find((n) => n.tag === 'button')).toBeDefined();
    expect(graph.nodes.find((n) => n.tag === 'span')).toBeDefined();
  });

  it('parent → children references are correct', () => {
    document.body.innerHTML = '<div><span></span><p></p></div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);

    expect(graph.root.children).toHaveLength(2);
    const span = graph.nodes.find((n) => n.tag === 'span')!;
    const p = graph.nodes.find((n) => n.tag === 'p')!;
    expect(span.parent).toBe(graph.root.id);
    expect(p.parent).toBe(graph.root.id);
  });

  it('captures trimmed text content', () => {
    document.body.innerHTML = '<button>   Sign up free   </button>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    expect(graph.root.text).toBe('Sign up free');
  });

  it('truncates text over maxTextLength', () => {
    const long = 'a'.repeat(2000);
    document.body.innerHTML = `<p>${long}</p>`;
    const root = document.body.firstElementChild as Element;
    const graph = scan(root, { maxTextLength: 100 });
    expect(graph.root.text!.length).toBe(100);
  });

  it('captures aria role', () => {
    document.body.innerHTML = '<div role="button">click</div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    expect(graph.root.role).toBe('button');
  });

  it('marks display:none as not visible', () => {
    document.body.innerHTML = '<div style="display:none">hidden</div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    expect(graph.root.visible).toBe(false);
  });

  it('marks aria-hidden as not visible', () => {
    document.body.innerHTML = '<div aria-hidden="true">hidden</div>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);
    expect(graph.root.visible).toBe(false);
  });

  it('produces deterministic node ids across rescans of unchanged DOM', () => {
    document.body.innerHTML = '<div><span>hello</span></div>';
    const root = document.body.firstElementChild as Element;
    const a = scan(root);
    const b = scan(root);
    expect(a.root.id).toBe(b.root.id);
    expect(a.nodes.map((n) => n.id)).toEqual(b.nodes.map((n) => n.id));
  });

  it('changes ids when text content changes', () => {
    document.body.innerHTML = '<button>before</button>';
    const root1 = document.body.firstElementChild as Element;
    const a = scan(root1);

    document.body.innerHTML = '<button>after</button>';
    const root2 = document.body.firstElementChild as Element;
    const b = scan(root2);

    expect(a.root.id).not.toBe(b.root.id);
  });

  it('walks deeply nested DOM', () => {
    document.body.innerHTML =
      '<section><div><article><h2>Title</h2><p>Body</p></article></div></section>';
    const root = document.body.firstElementChild as Element;
    const graph = scan(root);

    const tags = graph.nodes.map((n) => n.tag);
    expect(tags).toContain('section');
    expect(tags).toContain('div');
    expect(tags).toContain('article');
    expect(tags).toContain('h2');
    expect(tags).toContain('p');
  });

  it('produces a viewport reading', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document);
    expect(typeof graph.viewport.width).toBe('number');
    expect(typeof graph.viewport.height).toBe('number');
  });

  it('includes ISO timestamp in snapshottedAt', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document);
    expect(graph.snapshottedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('throws clearly when given a malformed input', () => {
    expect(() => scan({} as unknown as Document)).toThrow(/lens-core/);
  });
});
