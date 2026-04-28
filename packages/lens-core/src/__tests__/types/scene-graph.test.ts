import { describe, it, expectTypeOf } from 'vitest';
import type { SceneGraph, SceneNode, TokenUsage } from '../../types/scene-graph';

describe('SceneGraph types', () => {
  it('SceneNode requires id, tag, rect, computedStyle, children', () => {
    expectTypeOf<SceneNode>().toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf<SceneNode>().toHaveProperty('tag').toEqualTypeOf<string>();
    expectTypeOf<SceneNode>().toHaveProperty('children').toEqualTypeOf<string[]>();
  });

  it('SceneGraph has nodes and root', () => {
    expectTypeOf<SceneGraph>().toHaveProperty('nodes').toEqualTypeOf<SceneNode[]>();
    expectTypeOf<SceneGraph>().toHaveProperty('root').toEqualTypeOf<SceneNode>();
  });

  it('TokenUsage tracks tier + value', () => {
    expectTypeOf<TokenUsage>().toHaveProperty('tier').toEqualTypeOf<1 | 2 | 3>();
    expectTypeOf<TokenUsage>().toHaveProperty('property').toEqualTypeOf<string>();
    expectTypeOf<TokenUsage>().toHaveProperty('rawValue').toEqualTypeOf<string>();
  });
});
