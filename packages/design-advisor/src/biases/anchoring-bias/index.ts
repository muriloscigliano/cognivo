/**
 * ANCHORING BIAS - Complete Exemplar
 *
 * This is the GOLD STANDARD template for all bias cards.
 * Every bias must be this comprehensive.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const anchoringBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'anchoring-bias',
    name: 'Anchoring Bias',
    aliases: ['Anchoring Effect', 'Focalism', 'Anchor and Adjust'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'pricing',
      'first-impression',
      'numbers',
      'comparison',
      'decision-making',
      'reference-point',
      'estimates',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People rely too heavily on the first piece of information (the "anchor") when making decisions.',

    detailed: `Anchoring bias is a cognitive bias that causes humans to rely too heavily on the first piece of information they receive (the "anchor") when making subsequent judgments or decisions. Once an anchor is set, other judgments are made by adjusting away from that anchor, and there is a bias toward interpreting other information around the anchor.

This bias occurs even when the anchor is arbitrary, irrelevant, or obviously random. For example, if you see a $1000 jacket first, a $300 jacket will seem reasonable, but if you saw the $300 jacket first, it might seem expensive.

In design and user experience, anchoring bias is one of the most powerful tools for influencing perception, expectations, and decision-making. It's used extensively in pricing strategies, feature comparison, onboarding flows, and content presentation.`,

    psychologyBasis: {
      discoveredBy: 'Amos Tversky and Daniel Kahneman',
      year: 1974,
      theory: 'Heuristics and Biases Research Program',
      mechanism: `The brain uses the initial anchor as a reference point and makes insufficient adjustments away from it. This happens because:

1. **Selective Accessibility**: The anchor makes related information more accessible in memory
2. **Attitude Activation**: The anchor activates a positive or negative attitude that biases subsequent judgments
3. **Numeric Priming**: Numbers activate a "magnitude representation" that influences later numeric judgments
4. **Insufficient Adjustment**: People adjust from the anchor, but stop adjusting when they reach a plausible value (usually too close to the anchor)`,
    },

    realWorldExample: `In a classic experiment, participants were asked if Gandhi died before or after age 140 (absurd anchor). Then they estimated his actual age at death. Those with the high anchor guessed significantly older ages than those asked if he died before or after age 9. The anchor (140 vs 9) dramatically affected estimates, even though both were obviously wrong.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Anchoring bias profoundly affects how users perceive value, make choices, and evaluate options in interfaces. The first price, number, feature, or option users see becomes their reference point for everything that follows. Designers can leverage this to:

- Guide pricing perception by showing premium options first
- Influence feature adoption by highlighting key capabilities early
- Shape expectations through initial onboarding experiences
- Direct attention by establishing visual hierarchies
- Frame comparisons favorably using strategic ordering`,

    whenToUse: [
      {
        title: 'Pricing Pages',
        scenario:
          'When displaying multiple pricing tiers or subscription options',
        example:
          'Show the "Enterprise" plan first at $999/mo, making the "Pro" plan at $49/mo seem very affordable',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Comparisons',
        scenario: 'When comparing products or plan features side-by-side',
        example:
          'List the most advanced features first, anchoring users to premium capabilities',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Sales and Discounts',
        scenario: 'When showing original vs discounted prices',
        example:
          'Always show the original price crossed out ($199) next to the sale price ($99) to anchor to the higher value',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Progressive Disclosure',
        scenario: 'When introducing complex features or workflows',
        example:
          'Show the most powerful use case first, then reveal simpler options',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Donation Amounts',
        scenario: 'When suggesting donation or contribution amounts',
        example:
          'Start with higher amounts ($100, $50, $25) rather than lower ones ($5, $10, $20)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Sequences',
        scenario: 'When introducing new users to your product',
        example:
          'Show the most impressive or valuable feature first to set high expectations',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Accessibility-Critical Flows',
        reason:
          'Anchoring can make important safety or accessibility information less prominent',
        consequence:
          'Users might skip critical warnings or accessibility features',
        alternative:
          'Present all options equally or lead with the safest/most accessible choice',
      },
      {
        title: 'Legal or Ethical Disclosures',
        reason:
          'Using anchoring to minimize important disclosures is manipulative and often illegal',
        consequence:
          'Legal liability, loss of user trust, regulatory penalties',
        alternative:
          'Present disclosures prominently without anchoring to less important information',
      },
      {
        title: 'Medical or Financial Decisions',
        reason:
          'Anchoring can bias critical health or financial choices inappropriately',
        consequence:
          'Users might make suboptimal decisions with serious consequences',
        alternative:
          'Present information objectively without strategic anchoring',
      },
      {
        title: 'Budget-Conscious Users',
        reason:
          'Anchoring to premium options can alienate users with limited budgets',
        consequence: 'Increased bounce rate, poor conversion for entry-level tiers',
        alternative:
          'Provide clear budget-friendly options prominently alongside premium ones',
      },
    ],

    commonMistakes: [
      {
        title: 'Anchoring Too High',
        description:
          'Setting an anchor so high that subsequent options seem unrealistic or untrustworthy',
        why: 'Users will reject the entire frame as manipulative',
        fix: 'Use realistic anchors that are high but still believable for your market',
      },
      {
        title: 'Inconsistent Anchoring',
        description:
          'Using different anchors across similar contexts or changing anchors mid-experience',
        why: 'Creates confusion and destroys the anchoring effect',
        fix: 'Maintain consistent reference points throughout the user journey',
      },
      {
        title: 'Ignoring Context',
        description:
          'Using the same anchor for different user segments or markets',
        why: 'A $1000 anchor works differently in enterprise vs consumer contexts',
        fix: 'Adapt anchors to user segments, geographies, and contexts',
      },
      {
        title: 'Obvious Manipulation',
        description:
          'Making the anchoring so blatant that users feel manipulated',
        why: 'Breaks trust and can backfire',
        fix: 'Integrate anchors naturally into the design and information hierarchy',
      },
      {
        title: 'Wrong Anchor Type',
        description: 'Using price anchors when feature anchors would be more effective (or vice versa)',
        why: 'Not all decisions are price-driven; some are feature or value-driven',
        fix: 'Match the anchor type to user motivations (price, features, outcomes, etc.)',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines what users see first, establishing the primary anchor',
        examples: [
          'F-pattern layouts anchor to top-left content',
          'Hero sections anchor users to primary value propositions',
          'Above-the-fold content creates initial expectations',
          'Grid ordering affects perception of item value',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Text size, weight, and hierarchy establish anchors for importance',
        examples: [
          'Large numbers anchor price perceptions',
          'Bold headings anchor attention and importance',
          'Font size differences create value hierarchies',
          'Crossed-out text anchors to original values',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can reinforce or diminish anchoring effects through attention and emotion',
        examples: [
          'Bright colors on anchor prices draw attention',
          'Muted colors on less important options reduce their anchor effect',
          'Red often anchors negative perceptions (discounts, warnings)',
          'Premium colors (gold, black) anchor to luxury',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'First interactions and default selections become behavioral anchors',
        examples: [
          'Default selected options anchor user choices',
          'First-shown tooltips anchor feature understanding',
          'Initial slider positions anchor adjustment ranges',
          'Suggested amounts anchor user input',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content order and framing are the primary vehicles for anchoring',
        examples: [
          'First features listed anchor perceptions of product value',
          'Opening sentences anchor interpretation of paragraphs',
          'First reviews shown anchor overall sentiment perception',
          'Initial case studies anchor success expectations',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen readers and keyboard navigation create different anchor sequences',
        examples: [
          'Reading order anchors screen reader users differently than visual users',
          'Focus order establishes keyboard navigation anchors',
          'Alt text descriptions provide anchors for screen reader users',
          'ARIA labels can reinforce or contradict visual anchors',
        ],
      },
    },
  },

  //===========================================
  // EXAMPLES
  //===========================================
  examples: {
    good: [
      {
        title: 'Premium-First Pricing',
        description:
          'Pricing table showing Enterprise plan first, then Business, then Starter',
        code: `<div class="pricing-grid">
  <div class="plan premium">
    <h3>Enterprise</h3>
    <div class="price">$999<span>/month</span></div>
    <ul>
      <li>Unlimited everything</li>
      <li>24/7 support</li>
      <li>Dedicated manager</li>
    </ul>
  </div>
  <div class="plan popular">
    <h3>Business</h3>
    <div class="price">$49<span>/month</span></div>
    <span class="badge">Most Popular</span>
  </div>
  <div class="plan basic">
    <h3>Starter</h3>
    <div class="price">$9<span>/month</span></div>
  </div>
</div>`,
        explanation:
          'By showing the $999 Enterprise plan first, the $49 Business plan appears very reasonable, and even the $9 Starter plan seems like an incredible deal. Users anchor to the $999 number.',
        principle:
          'High-value anchor makes mid-tier option seem like the smart, balanced choice',
        metrics: {
          before: '35% chose Starter, 50% chose Business, 15% chose Enterprise',
          after:
            '20% chose Starter, 65% chose Business, 15% chose Enterprise',
          improvement:
            '30% increase in Business tier conversion by anchoring high',
        },
      },
      {
        title: 'Crossed-Out Original Price',
        description:
          'E-commerce product showing original price crossed out next to sale price',
        code: `<div class="product-price">
  <span class="original-price">$199.99</span>
  <span class="sale-price">$99.99</span>
  <span class="savings">Save $100!</span>
</div>

<style>
.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 1.1rem;
}
.sale-price {
  color: #e63946;
  font-size: 1.8rem;
  font-weight: bold;
}
</style>`,
        explanation:
          'The crossed-out $199.99 anchors users to a higher value, making $99.99 feel like an amazing deal even if $99.99 is the normal price.',
        principle: 'Visual price anchoring with clear reference point',
      },
      {
        title: 'Suggested Donation Amounts',
        description:
          'Charity donation form with pre-selected higher amount',
        code: `<form class="donation-form">
  <h3>Support Our Cause</h3>
  <div class="amount-options">
    <button class="amount">$250</button>
    <button class="amount selected">$100</button>
    <button class="amount">$50</button>
    <button class="amount">$25</button>
    <button class="amount custom">Other</button>
  </div>
</form>`,
        explanation:
          'Starting with $250 as the first option anchors users high. Having $100 pre-selected (still high) makes it feel like the expected amount.',
        principle:
          'High anchor + high default = increased average donation',
        metrics: {
          before: 'Average donation: $42',
          after: 'Average donation: $73',
          improvement: '74% increase in average donation amount',
        },
      },
      {
        title: 'Feature List Ordering',
        description:
          'SaaS product page listing most advanced features first',
        code: `<section class="features">
  <h2>Powerful Features</h2>
  <ul>
    <li>
      <h4>AI-Powered Analytics</h4>
      <p>Machine learning insights on all your data</p>
    </li>
    <li>
      <h4>Real-Time Collaboration</h4>
      <p>Work together with unlimited teammates</p>
    </li>
    <li>
      <h4>Advanced Security</h4>
      <p>Enterprise-grade encryption & compliance</p>
    </li>
    <li>
      <h4>Data Import</h4>
      <p>Import from CSV, Excel, or API</p>
    </li>
  </ul>
</section>`,
        explanation:
          'Leading with "AI-Powered Analytics" anchors users to think of this as a sophisticated, high-value product. Basic features like "Data Import" seem minor in comparison.',
        principle:
          'Feature anchoring sets product perception and value expectations',
      },
    ],

    bad: [
      {
        title: 'Deceptive Comparison Anchor',
        description:
          'Showing an unrealistically high "competitor price" as anchor',
        code: `<!-- DON'T DO THIS -->
<div class="price-comparison">
  <div class="competitor">
    <p>Competitors charge up to</p>
    <span class="their-price">$9,999</span>
  </div>
  <div class="our-price">
    <p>We charge only</p>
    <span class="price">$49</span>
  </div>
</div>`,
        explanation:
          'If no competitor actually charges $9,999, this is deceptive anchoring. Users will feel manipulated if they discover the lie, destroying trust.',
        principle: 'Never use dishonest anchors - it backfires',
      },
      {
        title: 'Burying the Real Price',
        description:
          'Showing a low monthly anchor but hiding the required annual commitment',
        code: `<!-- DON'T DO THIS -->
<div class="pricing">
  <div class="price">
    <span class="amount">$9</span>
    <span class="period">/month</span>
  </div>
  <small style="color: #ccc; font-size: 0.7rem;">
    *billed annually at $108
  </small>
</div>`,
        explanation:
          'Anchoring to $9/month but requiring annual payment is manipulative. Users feel deceived when they discover the real commitment.',
        principle:
          'Transparency builds trust; hidden anchors destroy it',
      },
      {
        title: 'Inconsistent Anchors',
        description:
          'Using different price anchors in different parts of the site',
        code: `<!-- DON'T DO THIS -->
<!-- On homepage: -->
<p>Plans starting at just $19/month!</p>

<!-- On pricing page: -->
<p>Our most popular plan is $199/month</p>

<!-- In email: -->
<p>Get started for only $9/month</p>`,
        explanation:
          'Conflicting anchors create confusion and erode trust. Users don\'t know what the real price is.',
        principle: 'Maintain consistent anchors across all touchpoints',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iPhone Product Pages',
        url: 'https://www.apple.com/iphone/',
        description:
          'Apple always shows the Pro Max model first, anchoring users to the highest price ($1,199+). This makes the base iPhone ($799) seem reasonably priced.',
        effectiveness: 'very-effective',
        analysis:
          'By leading with premium models, Apple successfully anchors users high, increasing average selling price. Even budget-conscious users perceive the base model as "affordable" relative to the Pro Max anchor.',
      },
      {
        company: 'Spotify',
        product: 'Premium Upsell',
        url: 'https://www.spotify.com/premium/',
        description:
          'When showing Premium family plan, Spotify displays "$16.99 for up to 6 people" instead of "$2.83 per person", anchoring to total value.',
        effectiveness: 'very-effective',
        analysis:
          'The higher number ($16.99) anchors users to more value. Breaking it down to per-person cost would create a low anchor, making Individual plan ($10.99) seem expensive by comparison.',
      },
      {
        company: 'Booking.com',
        product: 'Hotel Listings',
        url: 'https://www.booking.com',
        description:
          'Shows crossed-out "original" prices next to current prices, plus "X people looking at this property" to create scarcity anchors.',
        effectiveness: 'effective',
        analysis:
          'Dual anchoring strategy: price anchor (high original price) + scarcity anchor (social proof). Creates urgency and value perception simultaneously.',
      },
      {
        company: 'Mailchimp',
        product: 'Pricing Page',
        url: 'https://mailchimp.com/pricing/',
        description:
          'Displays "Standard" plan in center with "Recommended" badge, anchoring users to mid-tier despite showing Premium first.',
        effectiveness: 'very-effective',
        analysis:
          'Uses visual hierarchy and social proof (recommendation) to create a desirability anchor, not just a price anchor. Most users choose the recommended middle option.',
      },
      {
        company: 'Amazon',
        product: 'Product Listings',
        url: 'https://www.amazon.com',
        description:
          'Shows "List Price" crossed out next to actual price, plus "X% off" badge. Creates multiple anchors (original price, discount, savings).',
        effectiveness: 'very-effective',
        analysis:
          'Triple anchoring: list price (high), savings percentage (gain frame), absolute savings (loss aversion). One of the most effective e-commerce patterns.',
      },
    ],

    abTests: [
      {
        title: 'SaaS Pricing Page - Premium First vs Basic First',
        hypothesis:
          'Showing the premium plan first will increase mid-tier plan conversions',
        controlVersion: {
          description:
            'Pricing table with plans ordered: Basic ($9), Pro ($49), Enterprise ($299)',
          metrics: {
            conversionRate: '12.3%',
            averagePrice: '$31',
            proTierConversion: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing table with plans ordered: Enterprise ($299), Pro ($49), Basic ($9)',
          metrics: {
            conversionRate: '13.8%',
            averagePrice: '$42',
            proTierConversion: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Anchoring to the $299 Enterprise plan made the $49 Pro plan seem very reasonable. Pro tier conversion increased by 49%, and average price increased by 35%.',
          learnings: [
            'High price anchors significantly affect mid-tier perception',
            'Total conversion rate also improved (+12%), suggesting less decision paralysis',
            'Basic plan conversion dropped, but revenue impact was strongly positive',
            'Effect was stronger for enterprise customers than SMB customers',
          ],
        },
      },
      {
        title: 'E-commerce - Crossed Out Price vs No Anchor',
        hypothesis:
          'Showing original price crossed out will increase purchase rate',
        controlVersion: {
          description: 'Product page showing only sale price: $79.99',
          metrics: {
            conversionRate: '4.2%',
            averageOrderValue: '$79.99',
            perceivedValue: '6.1/10',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing original price ($129.99) crossed out, sale price $79.99, "Save $50"',
          metrics: {
            conversionRate: '6.8%',
            averageOrderValue: '$92.34',
            perceivedValue: '8.4/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The crossed-out price anchor increased conversions by 62% and perceived value by 38%. Users also bought more complementary items, increasing AOV.',
          learnings: [
            'Reference price anchoring is one of the strongest e-commerce tactics',
            'Perceived value increased even though actual price was identical',
            'Effect persisted even when users researched prices elsewhere',
            'Worked best for impulse purchases, less for considered purchases',
          ],
        },
      },
    ],
  },

  //===========================================
  // DETECTION
  //===========================================
  detection: {
    visualCues: [
      {
        name: 'Price Hierarchies',
        description:
          'Multiple prices shown with visual emphasis on one (larger, bolder, different color)',
        howToSpot:
          'Look for crossed-out prices, large vs small numbers, or premium vs budget tiers',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Ordering Patterns',
        description:
          'Content ordered from high-to-low or low-to-high (price, features, complexity)',
        howToSpot:
          'Check if items are sorted by value rather than alphabetically or by relevance',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Reference Points',
        description:
          'Explicit comparisons showing "before/after", "competitors vs us", or "original vs sale"',
        howToSpot:
          'Look for comparison language, price tables, or competitive positioning',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'First-Position Emphasis',
        description:
          'The first option is visually prominent or treated specially',
        howToSpot:
          'Check if the top-left or first item has special styling, size, or attention',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Numerical Prominence',
        description:
          'Large numbers displayed prominently, especially in headlines or hero sections',
        howToSpot:
          'Look for oversized numbers, especially in pricing, statistics, or benefits',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Premium-First Pattern',
        description:
          'Most expensive or feature-rich option shown first in list',
        indicators: [
          'Pricing table with descending prices',
          'Feature list starting with advanced capabilities',
          'Plan comparison starting with enterprise tier',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Discount Anchor Pattern',
        description:
          'Original price displayed alongside discounted price',
        indicators: [
          'Crossed-out or strikethrough prices',
          '"Was $X, now $Y" language',
          'Percentage or dollar savings highlighted',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Suggested Amount Pattern',
        description:
          'Pre-selected or recommended amounts for donations, tips, or purchases',
        indicators: [
          'Radio buttons with default selection',
          'Highlighted or "recommended" option',
          'Preset amounts above custom input',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Comparative Anchor Pattern',
        description:
          'Explicit comparison to competitors or alternatives',
        indicators: [
          '"Others charge $X, we charge $Y" messaging',
          'Competitor price comparison tables',
          'Market average vs our price',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What is the first number or price users see?',
      'Is there a crossed-out or "original" price shown?',
      'Are options ordered from high-to-low or low-to-high?',
      'Is there a pre-selected or recommended option?',
      'Are premium features or tiers shown before basic ones?',
      'Is there explicit comparison to competitors or alternatives?',
      'Do any numbers serve as reference points for others?',
      'Is the visual hierarchy emphasizing certain price points?',
      'Are there multiple anchors that might conflict?',
      'Is the anchor realistic and trustworthy?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in anchoring bias.

Analyze the provided design for anchoring bias patterns. Identify:

1. **Price Anchors**: First prices shown, crossed-out prices, reference points
2. **Feature Anchors**: Order and emphasis of capabilities
3. **Visual Anchors**: Size, position, and hierarchy creating reference points
4. **Content Anchors**: First information presented in flows
5. **Default Anchors**: Pre-selected options or suggested amounts

For each anchor found:
- Identify its type and location
- Assess its effectiveness and appropriateness
- Determine if it's ethical and transparent
- Suggest improvements if needed

Consider:
- Is the anchor helping or manipulating users?
- Are there conflicting anchors creating confusion?
- Does the anchor align with user goals?
- Is it accessible and clear to all users?

Provide actionable recommendations for improving anchoring strategy.`,

    outputSchema: {
      type: 'object',
      properties: {
        anchorsDetected: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              value: { type: 'string' },
              effectiveness: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'effectiveness',
              'ethical',
            ],
          },
        },
        overallStrategy: {
          type: 'object',
          properties: {
            clarity: { type: 'number' },
            consistency: { type: 'number' },
            ethicalScore: { type: 'number' },
            effectiveness: { type: 'number' },
          },
          required: [
            'clarity',
            'consistency',
            'ethicalScore',
            'effectiveness',
          ],
        },
        recommendations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              priority: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              expectedImpact: { type: 'string' },
            },
            required: ['priority', 'title', 'description'],
          },
        },
      },
      required: [
        'anchorsDetected',
        'overallStrategy',
        'recommendations',
      ],
    },
  },

  //===========================================
  // GUIDELINES
  //===========================================
  guidelines: {
    implementation: [
      {
        step: 1,
        title: 'Identify Your Goal',
        description:
          'Determine what you want users to choose or perceive as valuable',
        example:
          'Goal: Increase mid-tier plan conversions from 40% to 60%',
        tips: [
          'Be specific about the desired outcome',
          'Understand user motivations and price sensitivity',
          'Consider lifetime value, not just conversion rate',
        ],
      },
      {
        step: 2,
        title: 'Choose Your Anchor',
        description:
          'Select the high or low reference point that will frame subsequent options',
        example:
          'Anchor: Display $999/mo Enterprise plan first in pricing table',
        tips: [
          'Anchor should be realistic but high enough to shift perception',
          'Consider multiple anchors: price, features, social proof',
          'Test anchor effectiveness with your specific audience',
        ],
      },
      {
        step: 3,
        title: 'Design Visual Hierarchy',
        description:
          'Create clear visual emphasis on the anchor to ensure users see it first',
        example:
          'Make Enterprise plan 20% larger, position it top-left, use premium colors',
        tips: [
          'Use size, position, color, and typography for emphasis',
          'Ensure anchor is visible above the fold',
          'Don\'t make it so subtle that users miss it',
        ],
      },
      {
        step: 4,
        title: 'Present Target Option',
        description:
          'Show your desired choice after the anchor, framed favorably by comparison',
        example:
          'Display $49/mo Pro plan next to Enterprise, with "Most Popular" badge',
        tips: [
          'Position target option adjacent to anchor for easy comparison',
          'Add social proof or recommendation to reinforce choice',
          'Highlight value relative to anchor',
        ],
      },
      {
        step: 5,
        title: 'Test and Iterate',
        description:
          'Measure the impact of your anchor and refine based on data',
        example:
          'A/B test: Control (Basic first) vs Treatment (Enterprise first)',
        tips: [
          'Track conversion rates for each option',
          'Monitor average order value or plan choice',
          'Watch for negative indicators (bounce rate, cart abandonment)',
          'Test different anchor values to find optimal point',
        ],
      },
      {
        step: 6,
        title: 'Maintain Ethical Standards',
        description:
          'Ensure anchoring is helping users make good decisions, not manipulating them unfairly',
        example:
          'Verify that crossed-out "original prices" are real prices, not inflated',
        tips: [
          'Never use false or misleading anchors',
          'Disclose required commitments (annual billing, etc.)',
          'Provide clear information about all options',
          'Allow easy comparison without anchor bias',
        ],
      },
    ],

    dos: [
      'Use realistic anchors that are high but believable',
      'Show crossed-out original prices when legitimately offering discounts',
      'Lead with your most valuable features or premium options',
      'Maintain consistent anchors across your entire user experience',
      'Make anchors clearly visible and prominent',
      'Test different anchor points to find what works for your audience',
      'Use visual hierarchy to reinforce anchor effectiveness',
      'Consider different anchors for different user segments',
      'Combine anchoring with social proof (recommendations, most popular)',
      'Be transparent about pricing, commitments, and comparison',
    ],

    donts: [
      'Don\'t use false or deceptive anchors (fake "original" prices)',
      'Don\'t create conflicting anchors that confuse users',
      'Don\'t anchor so high that it seems unrealistic or manipulative',
      'Don\'t hide important information with low-emphasis anchors',
      'Don\'t use anchoring for critical safety or health information',
      'Don\'t change anchors mid-experience',
      'Don\'t rely solely on anchoring; combine with real value',
      'Don\'t use different anchors in different channels for same product',
      'Don\'t anchor to unethical comparison (non-existent competitors)',
      'Don\'t ignore accessibility implications of anchor positioning',
    ],

    bestPractices: [
      {
        title: 'Anchor High, but Realistically',
        description:
          'Set your anchor above your target, but within the realm of believability for your market',
        rationale:
          'Unrealistic anchors backfire; users reject the frame entirely',
        example:
          'For a SaaS tool, anchor to $500/mo (enterprise), not $5000/mo (unbelievable)',
      },
      {
        title: 'Use Multiple Anchor Types',
        description:
          'Combine price anchors with feature anchors and social proof anchors',
        rationale:
          'Different users respond to different anchors; layering increases effectiveness',
        example:
          'Show premium price + advanced features + "Most Popular" badge',
      },
      {
        title: 'Test Anchor Positioning',
        description:
          'Experiment with different orderings and positions for your anchor',
        rationale:
          'Anchor effectiveness varies by layout, context, and user flow',
        example:
          'Test: top-left vs center vs first-in-list for maximum impact',
      },
      {
        title: 'Make Comparisons Easy',
        description:
          'Ensure users can easily compare anchor to target option',
        rationale:
          'Anchoring works through comparison; if comparison is hard, effect weakens',
        example:
          'Side-by-side pricing tables, aligned features, clear differences',
      },
      {
        title: 'Refresh Anchors Periodically',
        description:
          'Update your anchors as market conditions, prices, or products change',
        rationale:
          'Stale anchors become less effective; users adapt to references',
        example:
          'Quarterly review of pricing anchors to match market and product evolution',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure anchor appears first in reading order',
        implementation:
          'Use proper DOM order so screen readers encounter anchor before other options. Don\'t rely solely on CSS positioning.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to emphasize anchor',
        implementation:
          'Combine color with size, position, text labels, or icons to make anchor clear to all users.',
      },
      {
        wcagLevel: 'AAA',
        criterion: '2.4.10',
        guideline:
          'Section Headings - Use clear headings for anchor and options',
        implementation:
          'Label sections clearly: "Premium Plan", "Standard Plan" etc., not just relying on visual hierarchy.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Ensure anchor text has sufficient contrast',
        implementation:
          'Crossed-out prices, large numbers, and emphasis text must meet 4.5:1 contrast ratio.',
      },
    ],

    ethics: [
      {
        concern: 'Deceptive Pricing',
        severity: 'critical',
        explanation:
          'Using fake "original" prices that were never actually charged',
        mitigation:
          'Only show crossed-out prices if they were legitimately charged for a significant period. Document price history.',
      },
      {
        concern: 'Hidden Costs',
        severity: 'critical',
        explanation:
          'Anchoring to low monthly price but hiding required annual commitment',
        mitigation:
          'Always disclose billing frequency, required commitments, and total costs prominently.',
      },
      {
        concern: 'Manipulative Comparisons',
        severity: 'high',
        explanation:
          'Comparing to non-existent competitors or inflated "market rates"',
        mitigation:
          'Only compare to real, verifiable alternatives. Cite sources for market rates.',
      },
      {
        concern: 'Exploiting Vulnerable Users',
        severity: 'critical',
        explanation:
          'Using anchoring on users in distress, financial hardship, or crisis',
        mitigation:
          'Reduce or remove anchoring for vulnerable contexts (medical, emergency, etc.)',
      },
      {
        concern: 'Cognitive Manipulation',
        severity: 'medium',
        explanation:
          'Using anchoring so aggressively that users make poor decisions',
        mitigation:
          'Provide clear, unbiased information alongside anchored options. Allow easy comparison.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        url: 'https://science.sciencemag.org/content/185/4157/1124',
        description:
          'The foundational paper that introduced anchoring bias to psychology',
        type: 'foundational',
      },
      {
        title: 'Anchoring and Adjustment in Judgments',
        author: 'Epley, N., & Gilovich, T.',
        year: 2006,
        description:
          'Modern research on the mechanisms underlying anchoring effects',
        type: 'advanced',
      },
      {
        title:
          'The Anchoring-and-Adjustment Heuristic: Why the Adjustments Are Insufficient',
        author: 'Epley, N., & Gilovich, T.',
        year: 2001,
        doi: '10.1111/1467-9280.00346',
        description:
          'Explains why people adjust insufficiently from anchors',
        type: 'advanced',
      },
      {
        title:
          'Anchoring Effects in the Classroom: Evidence from Repeated Grading',
        author: 'Schulz, J. F., & Thöni, C.',
        year: 2016,
        description:
          'Real-world evidence of anchoring effects in grading decisions',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapter on anchoring effects by Nobel Prize winner who discovered the bias',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Excellent practical examples of anchoring in pricing and decision-making',
        type: 'practical',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on contrast principle relates directly to anchoring',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Psychology of Pricing: A Guide',
        author: 'Patel, Neil',
        url: 'https://neilpatel.com/blog/the-psychology-of-pricing/',
        description:
          'Practical guide to using anchoring in pricing strategies',
        type: 'practical',
      },
      {
        title: 'How to Use Anchoring Bias in UX Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/anchoring-bias-in-ux',
        description:
          'UX-focused guide with design examples and patterns',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Anchoring Effect',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=jq8DyBHNEH4',
        description:
          'Short animated explanation of anchoring bias with examples',
        type: 'foundational',
      },
      {
        title: 'Anchoring Bias in Negotiations',
        author: 'Harvard Business Review',
        url: 'https://hbr.org/video/5244298958001/how-anchoring-bias-affects-negotiations',
        description:
          'Real-world application of anchoring in business contexts',
        type: 'practical',
      },
    ],

    demos: [
      {
        title: 'Anchoring Bias Game',
        author: 'Nicky Case',
        url: 'https://ncase.me/trust/',
        description:
          'Interactive demonstration of how anchoring affects estimates',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'framing-effect', // How info is framed affects anchor interpretation
      'loss-aversion', // Anchoring + loss framing is powerful combination
      'social-proof', // "Most popular" reinforces anchor effectiveness
      'scarcity-bias', // Limited time adds urgency to anchored price
      'decoy-effect', // Strategic anchor can act as decoy
    ],

    conflicts: [
      'information-bias', // More information can break anchor effect
      'analysis-paralysis', // Too many anchors can cause decision paralysis
    ],

    confusedWith: [
      'priming', // Related but different: priming is unconscious activation
      'framing-effect', // Overlaps but framing is broader than anchoring
      'adjustment-heuristic', // Anchoring is one type of adjustment heuristic
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'price-anchoring',
        'feature-anchoring',
        'temporal-anchoring',
      ],
    },
  },
};
