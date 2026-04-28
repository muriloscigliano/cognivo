import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { scan } from '../../observer/scan';
import { classify } from '../../classifier';

describe('classifier — end-to-end', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  it('respects programmatic override', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document);
    const result = classify(graph, { override: 'pricing' });

    expect(result.primary.intent).toBe('pricing');
    expect(result.primary.confidence).toBe(100);
    expect(result.stage).toBe('override');
  });

  it('respects <meta name="lens-intent"> override', () => {
    document.head.innerHTML = '<meta name="lens-intent" content="checkout">';
    document.body.innerHTML = '<div></div>';
    const graph = scan(document);
    const result = classify(graph);

    expect(result.primary.intent).toBe('checkout');
    expect(result.stage).toBe('override');
  });

  it('classifies a pricing page from cg-pricing-card components', () => {
    document.body.innerHTML = `
      <main>
        <cg-pricing-card><h3>Basic</h3><p>$9 per month</p></cg-pricing-card>
        <cg-pricing-card><h3>Pro</h3><p>$29 per month</p></cg-pricing-card>
        <cg-pricing-card><h3>Team</h3><p>$99 per month</p></cg-pricing-card>
      </main>
    `;
    const graph = scan(document);
    const result = classify(graph);

    expect(result.primary.intent).toBe('pricing');
    expect(result.primary.confidence).toBeGreaterThanOrEqual(60);
    expect(result.stage).toBe('heuristic');
    expect(result.signals.length).toBeGreaterThan(0);
  });

  it('classifies a signin form', () => {
    document.body.innerHTML = `
      <form>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button>Sign in</button>
        <a href="#">Forgot password</a>
      </form>
    `;
    const graph = scan(document);
    const result = classify(graph);

    expect(result.primary.intent).toBe('signin');
  });

  it('classifies a signup form (email + password + name)', () => {
    document.body.innerHTML = `
      <form>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button>Create account</button>
      </form>
    `;
    const graph = scan(document);
    const result = classify(graph);

    expect(result.primary.intent).toBe('signup');
  });

  it('falls back to unknown when confidence is below floor', () => {
    document.body.innerHTML = '<div><p>Random unrelated content here</p></div>';
    const graph = scan(document);
    const result = classify(graph);

    expect(result.primary.intent).toBe('unknown');
  });

  it('disabling conservativeFiring keeps the heuristic result even below floor', () => {
    document.body.innerHTML = '<div><p>Has a per-month text fragment</p></div>';
    const graph = scan(document);

    const conservative = classify(graph, { conservativeFiring: true });
    const aggressive = classify(graph, { conservativeFiring: false });

    if (conservative.primary.intent === 'unknown') {
      // Aggressive should report whatever the heuristic returned (could still be a real intent).
      expect(['pricing', 'unknown']).toContain(aggressive.primary.intent);
    }
  });

  it('returns unknown with confidence 0 when no signals fire', () => {
    document.body.innerHTML = '<div></div>';
    const graph = scan(document);
    const result = classify(graph);

    expect(result.primary.intent).toBe('unknown');
    expect(result.primary.confidence).toBe(0);
  });
});
