import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';
import { createSceneQuery } from '../../helpers/scene-query';

describe('scene-query', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('find() returns nodes matching a tag selector', () => {
    document.body.innerHTML = '<div><button>a</button><button>b</button><span>c</span></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const buttons = q.find('button');
    expect(buttons).toHaveLength(2);
  });

  it('find() supports comma-separated alternatives', () => {
    document.body.innerHTML = '<div><button>a</button><a href="#">b</a><span>c</span></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const interactive = q.find('button, a');
    expect(interactive).toHaveLength(2);
  });

  it('find() supports attribute presence', () => {
    document.body.innerHTML = '<div><button disabled>a</button><button>b</button></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const disabled = q.find('button[disabled]');
    expect(disabled).toHaveLength(1);
  });

  it('find() supports attribute equality', () => {
    document.body.innerHTML =
      '<div><cg-button variant="primary">a</cg-button><cg-button variant="ghost">b</cg-button></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const primary = q.find('cg-button[variant=primary]');
    expect(primary).toHaveLength(1);
    expect(primary[0]!.text).toBe('a');
  });

  it('find() supports multiple attribute filters', () => {
    document.body.innerHTML = `
      <div>
        <cg-button variant="primary" size="md">a</cg-button>
        <cg-button variant="primary" size="sm">b</cg-button>
        <cg-button variant="ghost" size="md">c</cg-button>
      </div>
    `;
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const result = q.find('cg-button[variant=primary][size=md]');
    expect(result).toHaveLength(1);
    expect(result[0]!.text).toBe('a');
  });

  it('find() with universal selector returns all nodes', () => {
    document.body.innerHTML = '<div><span>a</span><p>b</p></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const all = q.find('*');
    expect(all.length).toBeGreaterThanOrEqual(3);
  });

  it('find() walks shadow trees by default', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>shadow button</button>';

    const graph = scan(host);
    const q = createSceneQuery(graph);

    const buttons = q.find('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]!.text).toBe('shadow button');
  });

  it('first() returns the first match', () => {
    document.body.innerHTML = '<div><button>a</button><button>b</button></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    const button = q.first('button');
    expect(button).toBeDefined();
    expect(button!.text).toBe('a');
  });

  it('first() returns undefined when nothing matches', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    expect(q.first('button')).toBeUndefined();
  });

  it('throws on empty selector', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);

    expect(() => q.find('')).toThrow(/lens-core/);
    expect(() => q.find('   ')).toThrow(/lens-core/);
  });

  it('exposes the raw scene graph', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document.body.firstElementChild as Element);
    const q = createSceneQuery(graph);
    expect(q.raw).toBe(graph);
  });

  it('find() resolves [role=...] by reading the lifted node.role property', () => {
    // scan() lifts `role` out of attributes onto node.role, so without a
    // fallback the selector grammar would silently match zero. This test
    // pins the contract that callers can write `*[role=button]` naturally.
    document.body.innerHTML =
      '<div role="button">a</div><div role="dialog">b</div><div>c</div>';
    const graph = scan(document.body.firstElementChild!.parentElement as Element);
    const q = createSceneQuery(graph);
    expect(q.find('*[role=button]')).toHaveLength(1);
    expect(q.find('*[role=dialog]')).toHaveLength(1);
    expect(q.find('*[role]')).toHaveLength(2);
  });
});
