import { describe, it, expect, beforeEach } from 'vitest';
import { LitRenderer } from '../lit-renderer.js';
import type { ElementNode, ParseResult, Library } from '@cognivo/gen-ui';

/** Minimal library stub — renderer only needs getTagName. */
const library = {
  getTagName: (typeName: string) =>
    ({ Stack: 'cg-stack', Text: 'cg-text', Button: 'cg-button' } as Record<string, string>)[typeName] ?? null,
} as unknown as Library;

function el(typeName: string, props: Record<string, unknown> = {}, partial = false): ElementNode {
  return { type: 'element', typeName, props, partial };
}

function result(root: ElementNode | null, incomplete = false, extraMeta: Record<string, unknown> = {}): ParseResult {
  return { root, meta: { incomplete, ...extraMeta } } as unknown as ParseResult;
}

describe('LitRenderer', () => {
  let container: HTMLElement;
  let renderer: LitRenderer;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    renderer = new LitRenderer(library);
  });

  // ── Basic rendering ──

  it('renders a tree of registered components inside a trust wrapper', () => {
    renderer.render(result(el('Stack', { gap: 'md', children: [el('Text', { text: 'Hello' })] })), container);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.getAttribute('data-ai-generated')).toBe('true');
    expect(wrapper.getAttribute('role')).toBe('region');
    const stack = wrapper.querySelector('cg-stack')!;
    expect(stack).not.toBeNull();
    expect(stack.getAttribute('gap')).toBe('md');
    expect(stack.querySelector('cg-text')).not.toBeNull();
  });

  it('renders an unknown-component fallback instead of throwing', () => {
    renderer.render(result(el('Hallucinated', { foo: 1 })), container);
    const fallback = container.querySelector('[data-unknown="true"]')!;
    expect(fallback).not.toBeNull();
    expect(fallback.textContent).toContain('Hallucinated');
  });

  it('shows ai-thinking while streaming with no root yet', () => {
    renderer.render(result(null, true), container);
    expect(container.querySelector('ai-thinking')).not.toBeNull();
  });

  it('surfaces parse errors as a visible error element', () => {
    renderer.render(result(el('Stack')), container);
    renderer.update(result(null, false, { parseError: 'bad json' }));
    const err = container.querySelector('[data-gen-ui-error="true"]')!;
    expect(err.textContent).toContain('bad json');
  });

  // ── Untrusted-input hardening ──

  it('refuses innerHTML/outerHTML/srcdoc props from the tree', () => {
    renderer.render(
      result(el('Text', { innerHTML: '<img src=x onerror=alert(1)>', outerHTML: '<b>x</b>', srcdoc: 'x' })),
      container,
    );
    const text = container.querySelector('cg-text')!;
    expect(text.innerHTML).toBe('');
    expect(text.hasAttribute('innerHTML')).toBe(false);
    expect(text.hasAttribute('srcdoc')).toBe(false);
  });

  it('refuses on* event-handler props and attributes', () => {
    renderer.render(result(el('Button', { onclick: 'alert(1)', onmouseover: 'alert(2)' })), container);
    const btn = container.querySelector('cg-button')!;
    expect(btn.hasAttribute('onclick')).toBe(false);
    expect(btn.hasAttribute('onmouseover')).toBe(false);
    expect((btn as HTMLElement).onclick).toBeNull();
  });

  it('strips javascript: and data:text URLs but keeps safe ones', () => {
    renderer.render(result(el('Button', { href: 'javascript:alert(1)' })), container);
    expect(container.querySelector('cg-button')!.hasAttribute('href')).toBe(false);

    renderer.render(result(el('Button', { href: 'https://example.com/docs' })), container);
    expect(container.querySelector('cg-button')!.getAttribute('href')).toBe('https://example.com/docs');

    renderer.render(result(el('Button', { src: 'data:text/html,<script>x</script>' })), container);
    expect(container.querySelector('cg-button')!.hasAttribute('src')).toBe(false);

    renderer.render(result(el('Button', { src: 'data:image/png;base64,AAAA' })), container);
    expect(container.querySelector('cg-button')!.getAttribute('src')).toBe('data:image/png;base64,AAAA');
  });

  it('caps tree depth instead of blowing the stack', () => {
    let node = el('Text', { text: 'leaf' });
    for (let i = 0; i < 200; i++) node = el('Stack', { children: [node] });
    expect(() => renderer.render(result(node), container)).not.toThrow();
    // The tree renders down to the cap, then truncates
    expect(container.querySelectorAll('cg-stack').length).toBeGreaterThan(10);
    expect(container.querySelectorAll('cg-stack').length).toBeLessThan(200);
  });

  // ── Streaming-stable updates ──

  it('keeps the same DOM nodes when a stream appends children', () => {
    const first = result(el('Stack', { children: [el('Text', { text: 'one' })] }), true);
    renderer.render(first, container);
    const stackBefore = container.querySelector('cg-stack')!;
    const textBefore = container.querySelector('cg-text')!;

    const second = result(
      el('Stack', { children: [el('Text', { text: 'one' }), el('Text', { text: 'two' })] }),
      true,
    );
    renderer.update(second);

    // Same element identities — state/focus/animations survive the chunk
    expect(container.querySelector('cg-stack')).toBe(stackBefore);
    expect(container.querySelector('cg-text')).toBe(textBefore);
    expect(container.querySelectorAll('cg-text').length).toBe(2);
  });

  it('updates changed primitive props in place', () => {
    renderer.render(result(el('Text', { text: 'draft' })), container);
    const before = container.querySelector('cg-text')!;
    renderer.update(result(el('Text', { text: 'final' })));
    const after = container.querySelector('cg-text')!;
    expect(after).toBe(before);
    expect(after.getAttribute('text')).toBe('final');
  });

  it('rebuilds when the root component type changes', () => {
    renderer.render(result(el('Stack')), container);
    renderer.update(result(el('Text', { text: 'now a text' })));
    expect(container.querySelector('cg-stack')).toBeNull();
    expect(container.querySelector('cg-text')).not.toBeNull();
  });

  it('toggles the streaming shimmer as nodes complete', () => {
    renderer.render(result(el('Text', { text: 'x' }, true), true), container);
    const text = container.querySelector('cg-text')!;
    expect(text.getAttribute('data-partial')).toBe('true');
    expect(text.querySelector('[data-partial-indicator]')).not.toBeNull();

    renderer.update(result(el('Text', { text: 'x' }, false), false));
    expect(text.hasAttribute('data-partial')).toBe(false);
    expect(text.querySelector('[data-partial-indicator]')).toBeNull();
  });

  it('flips the wrapper streaming flag off when the stream completes', () => {
    renderer.render(result(el('Stack'), true), container);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.getAttribute('data-streaming')).toBe('true');
    renderer.update(result(el('Stack'), false));
    expect(wrapper.hasAttribute('data-streaming')).toBe(false);
  });

  it('removes trailing children on non-streaming shrink', () => {
    renderer.render(
      result(el('Stack', { children: [el('Text', { text: 'a' }), el('Text', { text: 'b' })] })),
      container,
    );
    renderer.update(result(el('Stack', { children: [el('Text', { text: 'a' })] })));
    expect(container.querySelectorAll('cg-text').length).toBe(1);
  });

  // ── Lifecycle ──

  it('destroy clears the container', () => {
    renderer.render(result(el('Stack')), container);
    renderer.destroy();
    expect(container.children.length).toBe(0);
  });
});
