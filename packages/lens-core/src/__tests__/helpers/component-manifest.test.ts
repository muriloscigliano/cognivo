import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';
import { getComponentManifest } from '../../helpers/component-manifest';

describe('getComponentManifest', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('infers manifest from cg-* prefix', () => {
    document.body.innerHTML = '<cg-button variant="primary">x</cg-button>';
    const graph = scan(document.body.firstElementChild as Element);
    const manifest = getComponentManifest(graph.root);

    expect(manifest).toBeDefined();
    expect(manifest!.tagName).toBe('cg-button');
    expect(manifest!.variant).toBe('primary');
  });

  it('infers manifest from ai-* prefix', () => {
    document.body.innerHTML = '<ai-assistant-widget></ai-assistant-widget>';
    const graph = scan(document.body.firstElementChild as Element);
    const manifest = getComponentManifest(graph.root);

    expect(manifest).toBeDefined();
    expect(manifest!.tagName).toBe('ai-assistant-widget');
  });

  it('infers manifest from bias-* prefix', () => {
    document.body.innerHTML = '<bias-anchoring><span>x</span></bias-anchoring>';
    const graph = scan(document.body.firstElementChild as Element);
    const manifest = getComponentManifest(graph.root);

    expect(manifest).toBeDefined();
    expect(manifest!.tagName).toBe('bias-anchoring');
  });

  it('returns undefined for plain HTML nodes', () => {
    document.body.innerHTML = '<div><button>x</button></div>';
    const graph = scan(document.body.firstElementChild as Element);
    expect(getComponentManifest(graph.root)).toBeUndefined();
  });

  it('captures variant + state from attributes', () => {
    document.body.innerHTML =
      '<cg-button variant="ghost" data-state="loading">x</cg-button>';
    const graph = scan(document.body.firstElementChild as Element);
    const manifest = getComponentManifest(graph.root);

    expect(manifest!.variant).toBe('ghost');
    expect(manifest!.state).toBe('loading');
  });

  it('initializes engagedBiasIds as empty array', () => {
    document.body.innerHTML = '<cg-button>x</cg-button>';
    const graph = scan(document.body.firstElementChild as Element);
    const manifest = getComponentManifest(graph.root);
    expect(manifest!.engagedBiasIds).toEqual([]);
  });

  it('returns the existing manifest if Observer attached one', () => {
    document.body.innerHTML = '<cg-button>x</cg-button>';
    const graph = scan(document.body.firstElementChild as Element);
    graph.root.componentManifest = {
      tagName: 'cg-button',
      engagedBiasIds: ['anchoring-bias'],
      variant: 'primary',
    };
    const manifest = getComponentManifest(graph.root);
    expect(manifest!.engagedBiasIds).toEqual(['anchoring-bias']);
  });
});
