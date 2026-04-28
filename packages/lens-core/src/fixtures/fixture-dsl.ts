import type { PageIntent } from '../types/classifier.js';

export interface ConfidenceRange {
  gte?: number;
  lte?: number;
}

export type FixtureExpectation =
  | { kind: 'finding'; ruleId: string; confidenceRange?: ConfidenceRange }
  | { kind: 'no-finding'; ruleId: string };

export interface FixtureSpec {
  name: string;
  html: string;
  intent: PageIntent;
  expectation: FixtureExpectation;
}

/**
 * Fluent builder for rule fixtures (Spec §11.3).
 *
 * Usage:
 *   fixture('three-tier-pricing-flat-prices')
 *     .render('<cg-pricing-card>...</cg-pricing-card>...')
 *     .withIntent('pricing')
 *     .expectFinding({ ruleId: 'cog/anchoring/weak-spread', confidenceRange: { gte: 60 } });
 */
export class FixtureBuilder {
  private html_: string = '';
  private intent_: PageIntent = 'unknown';

  constructor(private readonly name_: string) {
    if (!name_ || !name_.trim()) {
      throw new Error('lens-core: fixture() requires a non-empty name.');
    }
  }

  render(html: string): this {
    this.html_ = html;
    return this;
  }

  withIntent(intent: PageIntent): this {
    this.intent_ = intent;
    return this;
  }

  expectFinding(criteria: {
    ruleId: string;
    confidenceRange?: ConfidenceRange;
  }): FixtureSpec {
    return {
      name: this.name_,
      html: this.html_,
      intent: this.intent_,
      expectation: {
        kind: 'finding',
        ruleId: criteria.ruleId,
        ...(criteria.confidenceRange && { confidenceRange: criteria.confidenceRange }),
      },
    };
  }

  expectNoFinding(ruleId: string): FixtureSpec {
    return {
      name: this.name_,
      html: this.html_,
      intent: this.intent_,
      expectation: { kind: 'no-finding', ruleId },
    };
  }
}

/** Entry point for the fluent builder. */
export function fixture(name: string): FixtureBuilder {
  return new FixtureBuilder(name);
}
