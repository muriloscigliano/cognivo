/**
 * DECOY EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const decoyEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'decoy-effect',
    name: 'Decoy Effect',
    aliases: ['Asymmetric Dominance Effect', 'Attraction Effect'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'pricing',
      'choice-architecture',
      'relative-preference',
      'menu-design',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Adding an inferior third option makes one of the original options more attractive.',

    detailed: `The Decoy Effect is a phenomenon where introducing a third option that is asymmetrically dominated (clearly inferior to one option but not the other) shifts preferences toward the dominating option. The decoy isn't meant to be chosen - it exists to make another option look better by comparison.

For example: A small popcorn costs $3, large costs $7. Add a medium for $6.50. Suddenly the large seems like a great deal (only 50¢ more for much more popcorn!). The medium is the decoy - it makes the large more attractive.

This violates rational choice theory. The presence of an irrelevant alternative shouldn't change preferences between the original options, but it does - dramatically. Studies show decoys can increase preference for the target option by 20-40%.

In design and pricing, decoys are powerful tools for guiding users toward desired choices without restricting options or using obvious manipulation.`,

    psychologyBasis: {
      discoveredBy: 'Huber, Payne, & Puto',
      year: 1982,
      theory: 'Decoy Effect Theory',
      mechanism: `The brain evaluates options relative to each other rather than on absolute merit. Asymmetric dominance exploits this by introducing a third option that is clearly worse than one alternative (the target) but not clearly worse than the other (the competitor). This works because:

1. **Asymmetric Dominance**: The decoy is dominated by the target on all attributes, making the target appear objectively superior in at least one comparison
2. **Relative Evaluation**: People evaluate options in context rather than in isolation; adding a reference point changes the perceived value of existing options
3. **Justification Effect**: The decoy gives users a clear reason to prefer the target ("it's obviously better than X"), providing cognitive justification for their choice
4. **Perceptual Contrast**: The decoy makes the target's strengths more salient by providing a nearby inferior comparison point
5. **Choice Simplification**: In a complex decision, the decoy creates an easy dominance relationship that simplifies the decision process`,
    },

    realWorldExample: `National Geographic subscription study: Print-only for $59, print+web for $125. Only 16% chose print+web. Then added decoy: Web-only $59, Print-only $125, Print+Web $125. Now 84% chose print+web! The print-only option at $125 (dominated decoy) made print+web seem like incredible value. Same exact outcome price ($125) went from 16% to 84% selection.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Decoy Effect profoundly influences how users evaluate and choose between options. By strategically introducing an asymmetrically dominated third option, designers can guide users toward preferred choices. This applies to:

- Pricing tiers and subscription plans where a decoy tier shifts selection toward the target plan
- Product bundles where adding an inferior bundle makes the premium bundle seem like better value
- Plan comparison tables where feature/price asymmetry steers decisions
- Subscription options where annual vs monthly pricing uses a decoy to favor one billing cycle
- Menu design where item placement and sizing create asymmetric dominance`,

    whenToUse: [
      {
        title: 'Pricing Tier Design',
        scenario:
          'When offering multiple pricing tiers and wanting to guide users to a specific plan',
        example:
          'Add a mid-tier plan priced close to the premium plan but with significantly fewer features, making premium the obvious better value',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Subscription Plan Selection',
        scenario: 'When users choose between monthly and annual billing',
        example:
          'Show monthly ($15/mo), 6-month ($13/mo), and annual ($10/mo). The 6-month plan acts as a decoy making annual look like the clear winner',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Product Bundle Comparison',
        scenario: 'When offering product bundles or package deals',
        example:
          'Individual item ($30), partial bundle ($55 for 2 items), full bundle ($60 for 4 items). The partial bundle is the decoy.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Plan Comparison',
        scenario: 'When presenting feature sets across different plan levels',
        example:
          'Basic (5 features), Plus (7 features at 90% of Pro price), Pro (15 features). Plus acts as decoy for Pro.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Size/Quantity Upselling',
        scenario: 'When offering different sizes or quantities of a product',
        example:
          'Small coffee $3.50, Medium $5.80, Large $6.00. The medium makes the large seem like a no-brainer for just 20 cents more.',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Binary Critical Decisions',
        reason:
          'Adding a decoy to critical binary decisions (accept/decline terms, medical consent) is manipulative',
        consequence:
          'Users make uninformed choices on high-stakes decisions due to artificial framing',
        alternative:
          'Present options clearly and neutrally, allowing users to decide based on genuine merits',
      },
      {
        title: 'Transparent Comparison Requirements',
        reason:
          'Regulated industries (finance, healthcare) may require unbiased option presentation',
        consequence:
          'Legal liability, regulatory penalties, loss of professional credibility',
        alternative:
          'Present all options with equal emphasis and clear, factual descriptions',
      },
      {
        title: 'Budget-Constrained Users',
        reason:
          'Decoys designed to push users toward expensive options can harm users with limited budgets',
        consequence:
          'Users overspend beyond their means, leading to cancellations, refunds, and resentment',
        alternative:
          'Highlight the best value option for each budget level; allow filtering by price',
      },
      {
        title: 'Simple Two-Option Choices',
        reason:
          'Adding an artificial third option to a naturally two-option decision feels forced',
        consequence:
          'Users perceive manipulation, reducing trust and increasing decision fatigue',
        alternative:
          'Present two genuine options with clear differentiation on their own merits',
      },
    ],

    commonMistakes: [
      {
        title: 'Making the Decoy Too Obvious',
        description:
          'Creating a decoy option so clearly inferior that users recognize the manipulation',
        why: 'Users feel patronized and lose trust when the decoy is transparently bad',
        fix: 'Make the decoy a plausible option that someone could genuinely consider, even if it is dominated',
      },
      {
        title: 'Wrong Dominance Direction',
        description:
          'Creating a decoy that accidentally makes the wrong option more attractive',
        why: 'If the decoy is dominated by the competitor instead of the target, it pushes users away from your goal',
        fix: 'Map out attribute comparisons carefully: the decoy must be worse than the target on at least one key dimension while being similar or equal on others',
      },
      {
        title: 'Too Many Options',
        description:
          'Adding multiple decoys or too many tiers, creating choice overload',
        why: 'The decoy effect works best with 3 options; more creates paradox of choice',
        fix: 'Stick to 3 options: target, competitor, and one decoy. Remove unnecessary tiers.',
      },
      {
        title: 'Ignoring Attribute Alignment',
        description:
          'Creating a decoy that differs on irrelevant attributes rather than the ones users care about',
        why: 'The decoy only works when it highlights the target\'s advantage on dimensions that matter to users',
        fix: 'Research which attributes drive user decisions and construct the decoy around those specific dimensions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines how options are compared and which dominance relationships are visible',
        examples: [
          'Side-by-side pricing tables make asymmetric dominance immediately visible',
          'Column ordering affects which option is compared to the decoy first',
          'Vertical stacking can obscure dominance relationships that columns reveal',
          'Center-positioned target option with decoy adjacent maximizes the effect',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text styling can emphasize or de-emphasize the value gap between decoy and target',
        examples: [
          'Bold pricing on the target option draws comparison to the nearby decoy',
          'Feature lists with checkmarks vs dashes highlight what the decoy lacks',
          'Typography scale can signal which plan is the "intended" choice',
          'Strikethrough or muted text on decoy features emphasizes inferiority',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding reinforces which option dominates and which is the decoy',
        examples: [
          'Highlighting the target tier with a distinct brand color draws attention',
          'Muted or gray styling on the decoy reduces its appeal without hiding it',
          'Green checkmarks vs red X marks make feature gaps visceral',
          'A "Recommended" or "Best Value" badge in accent color steers attention',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements can reinforce the decoy effect through hover states and comparisons',
        examples: [
          'Hover tooltips showing per-unit or per-feature cost expose decoy inefficiency',
          'Feature comparison toggles that highlight differences reinforce dominance',
          'Pre-selected default on the target option anchors user preference',
          'Slider controls that show value curves expose the decoy\'s poor ratio',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing and feature descriptions are the primary mechanism for constructing asymmetric dominance',
        examples: [
          'Feature lists that align across tiers make dominance relationships scannable',
          'Value-per-dollar callouts expose the decoy\'s poor economics',
          'Descriptive plan names ("Essential" vs "Professional" vs "Enterprise") frame expectations',
          'Savings calculations ("Save $X vs Middle Tier") make the target\'s advantage concrete',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'All users must be able to perceive the option set and compare attributes, including screen reader users',
        examples: [
          'Table markup with proper headers allows screen readers to compare across plans',
          'ARIA labels on pricing cards should describe the value proposition, not just the price',
          'Keyboard navigation order should present all options before requiring a selection',
          'Visual dominance cues (color, badges) need text equivalents for non-visual users',
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
        title: 'SaaS Pricing with Strategic Middle Tier',
        description:
          'Three-tier pricing where the middle option is a decoy making the Pro plan compelling',
        code: `<div class="pricing-grid">
  <div class="plan basic">
    <h3>Starter</h3>
    <div class="price">$9<span>/month</span></div>
    <ul>
      <li>5 projects</li>
      <li>1 GB storage</li>
      <li>Email support</li>
    </ul>
    <button>Get Started</button>
  </div>
  <div class="plan decoy">
    <h3>Plus</h3>
    <div class="price">$39<span>/month</span></div>
    <ul>
      <li>10 projects</li>
      <li>5 GB storage</li>
      <li>Email support</li>
    </ul>
    <button>Choose Plus</button>
  </div>
  <div class="plan target">
    <h3>Pro</h3>
    <span class="badge">Best Value</span>
    <div class="price">$45<span>/month</span></div>
    <ul>
      <li>Unlimited projects</li>
      <li>50 GB storage</li>
      <li>Priority support</li>
      <li>API access</li>
      <li>Analytics</li>
    </ul>
    <button class="primary">Choose Pro</button>
  </div>
</div>`,
        explanation:
          'The Plus plan at $39 offers only marginally more than Starter but costs 4x as much. Pro at $45 (only $6 more than Plus) offers dramatically more value. Plus is the decoy that makes Pro look like an incredible deal.',
        principle:
          'Asymmetric dominance: the decoy is close in price to the target but far inferior in value',
        metrics: {
          before: '55% Starter, 30% Pro (no middle tier)',
          after: '25% Starter, 8% Plus, 67% Pro (with decoy)',
          improvement: '123% increase in Pro tier selection',
        },
      },
      {
        title: 'Subscription Billing Cycle with Decoy',
        description:
          'Annual vs monthly pricing using a semi-annual decoy',
        code: `<div class="billing-options">
  <div class="option">
    <h4>Monthly</h4>
    <div class="price">$15<span>/month</span></div>
    <p class="total">$180/year</p>
  </div>
  <div class="option decoy">
    <h4>Semi-Annual</h4>
    <div class="price">$13<span>/month</span></div>
    <p class="total">$156/year</p>
    <p class="savings">Save 13%</p>
  </div>
  <div class="option target">
    <h4>Annual</h4>
    <span class="badge">Best Value</span>
    <div class="price">$10<span>/month</span></div>
    <p class="total">$120/year</p>
    <p class="savings">Save 33%</p>
  </div>
</div>`,
        explanation:
          'The semi-annual plan saves only 13% for a 6-month commitment. Annual saves 33% for 12 months. The semi-annual decoy makes the annual plan\'s savings look dramatically better by comparison, while the commitment increase feels incremental.',
        principle:
          'The decoy makes the target\'s savings-to-commitment ratio appear far superior',
      },
      {
        title: 'Product Size Upsell',
        description:
          'Beverage sizing where a medium size is priced as a decoy for the large',
        code: `<div class="size-options">
  <div class="size">
    <span class="label">Small</span>
    <span class="volume">12 oz</span>
    <span class="price">$3.50</span>
  </div>
  <div class="size decoy">
    <span class="label">Medium</span>
    <span class="volume">16 oz</span>
    <span class="price">$5.80</span>
  </div>
  <div class="size target">
    <span class="label">Large</span>
    <span class="volume">24 oz</span>
    <span class="price">$6.00</span>
    <span class="callout">Only 20¢ more!</span>
  </div>
</div>`,
        explanation:
          'Medium is 33% more volume than Small but 66% more expensive. Large is 50% more volume than Medium for just 20 cents more. The medium\'s poor value ratio makes the large seem like a bargain.',
        principle:
          'Price-per-unit asymmetry makes the target option feel like the only rational choice',
        metrics: {
          before: '40% Small, 35% Medium, 25% Large (without decoy pricing)',
          after: '30% Small, 12% Medium, 58% Large (with decoy pricing)',
          improvement: '132% increase in Large size selection',
        },
      },
    ],

    bad: [
      {
        title: 'Transparent Decoy with No Plausibility',
        description:
          'A decoy so obviously bad that users feel insulted',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-grid">
  <div class="plan">
    <h3>Basic</h3>
    <div class="price">$10/month</div>
    <ul><li>10 features</li></ul>
  </div>
  <div class="plan">
    <h3>Standard</h3>
    <div class="price">$99/month</div>
    <ul><li>2 features</li></ul>
  </div>
  <div class="plan">
    <h3>Premium</h3>
    <div class="price">$99/month</div>
    <ul><li>All features</li></ul>
  </div>
</div>`,
        explanation:
          'The Standard plan at $99 with only 2 features is so obviously a sham that users will feel manipulated. No reasonable person would consider it a real option, breaking trust.',
        principle:
          'Decoys must be plausible options, not transparently fake choices',
      },
      {
        title: 'Decoy Pushing Toward Harmful Upsell',
        description:
          'Using a decoy to push users into plans they cannot afford or do not need',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-grid">
  <div class="plan">
    <h3>Freelancer</h3>
    <div class="price">$5/month</div>
    <p>1 user only</p>
  </div>
  <div class="plan">
    <h3>Team</h3>
    <div class="price">$195/month</div>
    <p>3 users, basic features</p>
  </div>
  <div class="plan featured">
    <h3>Enterprise</h3>
    <div class="price">$199/month</div>
    <p>Unlimited users, all features</p>
  </div>
</div>`,
        explanation:
          'A solo freelancer does not need an Enterprise plan. The $195 "Team" decoy is designed to push individuals into a $199 Enterprise plan they will never use. This is manipulative upselling.',
        principle:
          'Never use decoys to push users toward options that do not match their actual needs',
      },
      {
        title: 'Multiple Competing Decoys',
        description:
          'Adding multiple decoy options creates confusion instead of clarity',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-grid">
  <div class="plan"><h3>Basic</h3><p>$10</p></div>
  <div class="plan"><h3>Basic+</h3><p>$18</p></div>
  <div class="plan"><h3>Standard</h3><p>$22</p></div>
  <div class="plan"><h3>Standard+</h3><p>$28</p></div>
  <div class="plan"><h3>Pro</h3><p>$30</p></div>
  <div class="plan"><h3>Enterprise</h3><p>$99</p></div>
</div>`,
        explanation:
          'Six tiers with multiple potential decoys creates paradox of choice. Users cannot determine dominance relationships and abandon the decision entirely.',
        principle:
          'The decoy effect works best with exactly 3 options; more tiers dilute the effect and increase cognitive load',
      },
    ],

    realWorld: [
      {
        company: 'The Economist',
        product: 'Subscription Options',
        url: 'https://www.economist.com/subscribe',
        description:
          'The famous example from Dan Ariely: The Economist offered Web-only ($59), Print-only ($125), and Print+Web ($125). The Print-only option at the same price as Print+Web was a decoy that made Print+Web seem like incredible value. Without the decoy, most chose Web-only; with it, most chose Print+Web.',
        effectiveness: 'very-effective',
        analysis:
          'This is the textbook decoy effect case. The dominated Print-only option shifted preference from 68% Web-only to 84% Print+Web. Revenue per subscriber nearly doubled. The decoy made the comparison trivially easy: same price, more value.',
      },
      {
        company: 'Apple',
        product: 'iPhone Lineup',
        url: 'https://www.apple.com/iphone/',
        description:
          'Apple positions the iPhone lineup so that the base model acts as a decoy for the Pro. The standard iPhone is priced close to the Pro but lacks key features (camera, display, materials), making the Pro feel like much better value for the incremental cost.',
        effectiveness: 'very-effective',
        analysis:
          'By narrowing the price gap between standard and Pro while widening the feature gap, Apple creates asymmetric dominance that pushes buyers toward Pro models, increasing average selling price significantly.',
      },
      {
        company: 'AMC Theatres',
        product: 'Popcorn Sizing',
        description:
          'Movie theaters commonly price Small ($5), Medium ($7.50), Large ($8). The medium\'s poor value ratio (50% more expensive than small for modest size increase) makes the large (only $0.50 more) seem like the smart choice.',
        effectiveness: 'very-effective',
        analysis:
          'Classic size-based decoy. The medium exists primarily to make the large look like a bargain. Most customers choose the large, maximizing revenue per transaction with high-margin product.',
      },
      {
        company: 'Mailchimp',
        product: 'Email Marketing Plans',
        url: 'https://mailchimp.com/pricing/',
        description:
          'Mailchimp positions its Standard plan as a value bridge between Essentials and Premium. The Standard plan is priced close to Premium but lacks key automation and analytics features, creating asymmetric dominance favoring Premium for power users.',
        effectiveness: 'effective',
        analysis:
          'By making the Standard-to-Premium price gap small relative to the feature gap, Mailchimp uses decoy dynamics to push growth-stage companies toward Premium, significantly increasing ARPU.',
      },
      {
        company: 'Williams-Sonoma',
        product: 'Bread Maker Strategy',
        description:
          'Williams-Sonoma initially struggled to sell a $275 bread maker. They introduced a larger model at $429. The expensive model (decoy) rarely sold, but the original $275 model\'s sales nearly doubled as it now seemed like a reasonable middle-ground.',
        effectiveness: 'very-effective',
        analysis:
          'A classic asymmetric dominance case in physical retail. The $429 model reframed the $275 model from "expensive bread maker" to "the sensible choice." This is decoy + anchoring working together.',
      },
    ],

    abTests: [
      {
        title: 'SaaS Pricing: Two Tiers vs Three Tiers with Decoy',
        hypothesis:
          'Adding a decoy middle tier will increase premium plan conversion',
        controlVersion: {
          description:
            'Pricing page with two plans: Basic ($9/mo) and Pro ($45/mo)',
          metrics: {
            conversionRate: '14.2%',
            averagePrice: '$22',
            proTierConversion: '35%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page with three plans: Basic ($9/mo), Plus ($39/mo, limited features), Pro ($45/mo, all features). Plus acts as decoy.',
          metrics: {
            conversionRate: '16.8%',
            averagePrice: '$37',
            proTierConversion: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The decoy Plus tier nearly doubled Pro conversion (35% to 67%). Users perceived Pro as excellent value at only $6 more than Plus. Total conversion also improved by 18%, suggesting the decoy reduced decision difficulty.',
          learnings: [
            'A decoy priced close to the target but with far fewer features dramatically shifts preference',
            'The decoy itself was chosen by only 8% of users, confirming its role as a reference point',
            'Total conversion improved because the 3-option set gave users a clearer "best choice"',
            'Effect was strongest for new customers who had no prior pricing reference',
          ],
        },
      },
      {
        title: 'E-commerce Bundle: Product Bundle Decoy',
        hypothesis:
          'A partial bundle decoy will increase full bundle purchases',
        controlVersion: {
          description:
            'Product page showing individual item ($30) and full bundle ($60 for 4 items)',
          metrics: {
            conversionRate: '8.1%',
            bundleRate: '28%',
            averageOrderValue: '$38',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing individual item ($30), partial bundle ($55 for 2 items), and full bundle ($60 for 4 items). Partial bundle is the decoy.',
          metrics: {
            conversionRate: '9.4%',
            bundleRate: '52%',
            averageOrderValue: '$51',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The partial bundle decoy ($55 for 2 items vs $60 for 4 items) made the full bundle look like incredible value. Bundle adoption jumped from 28% to 52%, and AOV increased 34%.',
          learnings: [
            'Partial bundles at nearly the same price as full bundles are highly effective decoys',
            'Users could articulate why the full bundle was "obviously" better, showing the decoy provided justification',
            'The partial bundle was chosen by only 6% of buyers, confirming its decoy role',
            'Repeat customers were less susceptible to the decoy than first-time buyers',
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
        name: 'Three-Option Layout',
        description:
          'Exactly three options presented side by side, often with one visually highlighted',
        howToSpot:
          'Look for pricing tables, plan comparisons, or product selections with exactly three choices, one of which is badged as "Best Value" or "Recommended"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Asymmetric Value Gap',
        description:
          'One option is priced very close to another but offers substantially less value',
        howToSpot:
          'Compare price-to-feature ratios across options; look for one option that seems like a poor deal relative to a nearby option',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Feature Checklist Asymmetry',
        description:
          'Feature comparison tables where one column has noticeably fewer checkmarks but a similar price',
        howToSpot:
          'Count checkmarks or included features per tier and compare against price ratios; a dominated option will have fewer features at a comparable price',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Size/Quantity Pricing Gaps',
        description:
          'Product sizes where the price gap between two adjacent options is disproportionately small',
        howToSpot:
          'Calculate price-per-unit for each size; look for one size with dramatically worse value efficiency than its neighbor',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Visual De-emphasis of Middle Option',
        description:
          'The middle or decoy option is styled less prominently than the target option',
        howToSpot:
          'Check if one option lacks a badge, uses muted colors, or has a less prominent CTA compared to an adjacent option at a similar price',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Price Clustering Pattern',
        description:
          'Two options priced very close together with vastly different feature sets',
        indicators: [
          'Two pricing tiers within 15% of each other in price',
          'The cheaper of the two clustered options has significantly fewer features',
          'The more expensive clustered option is highlighted as "Best Value"',
          'A third option exists at a much lower price point',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Dominated Option Pattern',
        description:
          'One option is objectively worse than another on all compared attributes',
        indicators: [
          'Same or higher price with fewer features',
          'Same features with higher price',
          'Worse terms (shorter commitment) with minimal savings',
          'No unique advantage over the dominating option',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Three-Tier Asymmetry Pattern',
        description:
          'Three tiers where the middle tier provides poor value relative to both neighbors',
        indicators: [
          'Middle tier priced much closer to top tier than bottom tier',
          'Middle tier feature set much closer to bottom tier than top tier',
          'Top tier badged as recommended or best value',
          'Middle tier rarely shown as the selected or popular option',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Bundle Decoy Pattern',
        description:
          'Partial bundle priced close to full bundle to make full bundle seem like the better deal',
        indicators: [
          'Partial bundle costs 80-95% of full bundle price',
          'Full bundle includes 2x or more items/features than partial',
          '"Save X%" callout on the full bundle',
          'Per-item cost visibly worse on partial bundle',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there exactly three options presented for comparison?',
      'Is one option clearly dominated by another on all key attributes?',
      'Are two options priced very close together with a large feature gap?',
      'Does removing one option change which of the remaining options you would prefer?',
      'Is there a "Best Value" or "Recommended" badge on one specific option?',
      'Is the price-per-unit or price-per-feature significantly worse for one option?',
      'Does one option seem to exist primarily to make another look good?',
      'Would a rational person ever choose the suspected decoy over the target?',
      'Is the decoy subtle enough to be plausible, or is it obviously fake?',
      'Is the decoy being used ethically to simplify choice, or to manipulate toward an overpriced option?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the decoy effect (asymmetric dominance effect).

Analyze the provided design for decoy effect patterns. Identify:

1. **Option Architecture**: How many options are presented and how they are structured
2. **Dominance Relationships**: Whether any option is asymmetrically dominated by another
3. **Price-Value Asymmetry**: Price gaps vs feature gaps between adjacent options
4. **Visual Steering**: Badges, highlighting, or emphasis that reinforces the decoy effect
5. **Target Identification**: Which option the decoy is designed to make attractive

For each decoy pattern found:
- Identify the target (intended choice), competitor (alternative), and decoy
- Map the attribute dimensions where dominance occurs
- Assess whether the decoy is plausible or transparently fake
- Evaluate whether the decoy genuinely helps users choose or manipulates them
- Determine ethical implications

Consider:
- Does the decoy help users identify genuinely better value, or does it obscure fair comparison?
- Is the pricing structure honest, or is the decoy masking inflated pricing?
- Would removing the decoy change the user's preference? If so, is that manipulation?
- Are there accessibility implications (can all users perceive the comparison)?
- Is the decoy effect combined with other biases (anchoring, loss aversion)?

Provide actionable recommendations for ethical, effective choice architecture.`,

    outputSchema: {
      type: 'object',
      properties: {
        decoyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              target: { type: 'string' },
              decoy: { type: 'string' },
              competitor: { type: 'string' },
              dominanceDimensions: { type: 'array', items: { type: 'string' } },
              plausibility: { type: 'string' },
              effectiveness: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'target',
              'decoy',
              'dominanceDimensions',
              'plausibility',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            choiceArchitectureClarity: { type: 'number' },
            decoyEffectiveness: { type: 'number' },
            ethicalScore: { type: 'number' },
            userBenefit: { type: 'number' },
          },
          required: [
            'choiceArchitectureClarity',
            'decoyEffectiveness',
            'ethicalScore',
            'userBenefit',
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
        'decoyPatterns',
        'overallAssessment',
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
        title: 'Identify the Target Option',
        description:
          'Determine which option you want users to choose, based on genuine value alignment with user needs',
        example:
          'Goal: Increase Pro plan selection from 35% to 60%, because Pro genuinely fits most users\' needs',
        tips: [
          'The target should be the option that delivers the best value for most users',
          'Ensure the target is not overpriced; decoys amplify existing value, not create false value',
          'Consider user segments: different segments may have different ideal targets',
        ],
      },
      {
        step: 2,
        title: 'Design the Decoy',
        description:
          'Create a third option that is asymmetrically dominated by the target on key attributes',
        example:
          'Pro is $45/mo with 15 features. Create Plus at $39/mo with only 7 features. Plus is dominated by Pro.',
        tips: [
          'Price the decoy within 10-20% of the target for maximum effect',
          'Ensure the decoy is clearly worse than the target but not laughably bad',
          'The decoy should not be dominated by the competitor (the cheaper option)',
          'Focus dominance on the 1-2 attributes users care most about',
        ],
      },
      {
        step: 3,
        title: 'Arrange the Option Layout',
        description:
          'Position options so the dominance relationship between decoy and target is immediately visible',
        example:
          'Place decoy and target in adjacent columns in a pricing table so comparison is effortless',
        tips: [
          'Adjacent placement is critical: decoy and target must be easy to compare',
          'Use consistent attribute rows so users can scan horizontally',
          'Consider reading order: left-to-right cultures scan from left',
          'Three columns is optimal; avoid more than four options',
        ],
      },
      {
        step: 4,
        title: 'Add Visual Reinforcement',
        description:
          'Use badges, color, and emphasis to guide attention without being heavy-handed',
        example:
          'Add "Best Value" badge to Pro, use brand accent color on its column, mute the decoy slightly',
        tips: [
          'A single "Recommended" or "Best Value" badge on the target is sufficient',
          'Do not visually hide the decoy; it needs to be seen to work',
          'Ensure the decoy still looks like a real, selectable option',
          'Make all pricing and features equally readable across all tiers',
        ],
      },
      {
        step: 5,
        title: 'Validate with A/B Testing',
        description:
          'Measure the impact of the decoy by testing with and without it',
        example:
          'A/B test: 2-tier pricing (no decoy) vs 3-tier pricing (with decoy). Track tier selection rates.',
        tips: [
          'Track selection rate per tier, not just overall conversion',
          'Monitor the decoy\'s selection rate; if it is above 15%, it may not be functioning as a decoy',
          'Check for negative signals: increased bounce rate or cart abandonment',
          'Test different decoy price points to find the optimal gap',
        ],
      },
      {
        step: 6,
        title: 'Audit for Ethical Compliance',
        description:
          'Ensure the decoy is helping users identify genuine value, not tricking them into overspending',
        example:
          'Ask: "If I removed the decoy, would users still be happy with the target choice?" If yes, the decoy is ethical.',
        tips: [
          'The target option should deliver genuine value at its price point',
          'Users should not feel deceived if they later learn about the decoy strategy',
          'Avoid using decoys on vulnerable populations or for essential services',
          'Document the rationale for your choice architecture',
        ],
      },
    ],

    dos: [
      'Use decoys to help users identify genuinely better value among options',
      'Price the decoy within 10-20% of the target for maximum effect',
      'Make the decoy a plausible option, not a transparently fake choice',
      'Place the decoy adjacent to the target for easy comparison',
      'Test the decoy effect with A/B testing to validate its impact',
      'Use visual cues (badges, color) to reinforce the target without hiding the decoy',
      'Ensure all options are honestly described with accurate features and pricing',
      'Consider different decoy strategies for different user segments',
      'Document your choice architecture decisions for team alignment',
      'Combine the decoy with anchoring (show premium first) for compound effect',
    ],

    donts: [
      'Don\'t create decoys so obviously bad they insult user intelligence',
      'Don\'t use decoys to push users toward options that don\'t match their needs',
      'Don\'t add more than one decoy; stick to a clean 3-option set',
      'Don\'t hide the decoy\'s features or pricing; transparency is essential',
      'Don\'t use decoys in contexts requiring unbiased decision-making (medical, legal)',
      'Don\'t inflate the target\'s price and then use a decoy to make it seem reasonable',
      'Don\'t change the decoy configuration frequently; consistency builds trust',
      'Don\'t rely solely on the decoy effect; the target must offer genuine value',
      'Don\'t use decoys to exploit budget-constrained or vulnerable users',
      'Don\'t create a decoy that accidentally dominates the target',
    ],

    bestPractices: [
      {
        title: 'The 10-20% Rule',
        description:
          'Price the decoy within 10-20% of the target price for maximum asymmetric dominance',
        rationale:
          'If the gap is too large, the decoy doesn\'t create a meaningful comparison; too close and the feature gap seems suspicious',
        example:
          'Target at $45/mo, Decoy at $39/mo (13% less) with 50% fewer features',
      },
      {
        title: 'Feature Salience Alignment',
        description:
          'Ensure the decoy is inferior on the attributes users care most about',
        rationale:
          'Dominance on irrelevant attributes doesn\'t shift preference; it must be on the decision-driving dimensions',
        example:
          'If users care most about storage, make the decoy\'s storage dramatically lower than the target\'s',
      },
      {
        title: 'Plausibility Testing',
        description:
          'The decoy should be a plan someone could plausibly choose, even if few do',
        rationale:
          'Implausible decoys signal manipulation and destroy trust; plausible ones feel like genuine choice architecture',
        example:
          'Give the decoy a real name, a real value proposition, and a coherent feature set',
      },
      {
        title: 'Value Transparency',
        description:
          'Show per-unit or per-feature cost comparisons that expose the decoy\'s inefficiency naturally',
        rationale:
          'Rather than hiding the math, let users discover the dominance themselves for a stronger effect',
        example:
          'Show "$4.50/feature" on decoy vs "$3.00/feature" on target in a subtle cost-per-feature line',
      },
      {
        title: 'Ethical Decoy Litmus Test',
        description:
          'Ask: "Would I be comfortable if users discovered this was a decoy?"',
        rationale:
          'If the answer is no, the decoy is manipulative rather than helpful choice architecture',
        example:
          'A decoy that helps users find better value passes the test; one that hides inflated pricing does not',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Pricing tables must use semantic markup so screen readers can compare across tiers',
        implementation:
          'Use <table> with proper <th> headers for each plan, and <td> for features. Ensure comparison is possible by navigating column-by-column.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely solely on color to indicate the recommended option',
        implementation:
          'Combine color highlighting with text labels ("Best Value", "Recommended"), ARIA labels, and icons to ensure all users perceive the recommendation.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Each pricing tier must have a clear, descriptive heading',
        implementation:
          'Use heading elements (h3, h4) for plan names. Include price in the heading or immediately after for screen reader discoverability.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - DOM order must match visual presentation order',
        implementation:
          'Ensure pricing tiers appear in the same order in the DOM as they do visually. Do not use CSS to reorder columns, as this confuses screen reader users.',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured False Value',
        severity: 'critical',
        explanation:
          'Inflating the target\'s price and using a decoy to make the inflated price seem reasonable',
        mitigation:
          'The target option must deliver genuine value at its price point. The decoy should reveal existing value, not manufacture it. Benchmark pricing against actual market rates.',
      },
      {
        concern: 'Exploiting Choice Overload',
        severity: 'high',
        explanation:
          'Using the decoy to push users into decisions they haven\'t fully evaluated',
        mitigation:
          'Ensure all option information is clear and accessible. Provide tools for users to compare at their own pace (feature comparison tables, FAQ).',
      },
      {
        concern: 'Vulnerable Population Targeting',
        severity: 'critical',
        explanation:
          'Using decoys to push budget-constrained users, elderly users, or users in distress toward expensive options',
        mitigation:
          'Remove or reduce decoy effects for users showing price sensitivity signals. Offer clear budget-friendly recommendations.',
      },
      {
        concern: 'Opaque Choice Architecture',
        severity: 'medium',
        explanation:
          'Users are unaware they are being influenced by a strategically designed option set',
        mitigation:
          'While full disclosure isn\'t required, ensure all options are honestly described. Provide comparison tools that let users evaluate objectively.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Adding Asymmetrically Dominated Alternatives: Violations of Regularity and the Similarity Hypothesis',
        author: 'Huber, J., Payne, J. W., & Puto, C.',
        year: 1982,
        doi: '10.1086/208899',
        description:
          'The foundational paper introducing the decoy effect (asymmetric dominance effect) and demonstrating that adding a dominated alternative can increase preference for the dominating option',
        type: 'foundational',
      },
      {
        title: 'The Attraction Effect in Information Visualization',
        author: 'Dimara, E., Bezerianos, A., & Dragicevic, P.',
        year: 2017,
        doi: '10.1109/TVCG.2016.2598594',
        description:
          'Demonstrates the decoy effect in data visualization contexts, showing that how options are visually presented affects the strength of asymmetric dominance',
        type: 'advanced',
      },
      {
        title: 'Context-Dependent Preferences',
        author: 'Simonson, I.',
        year: 1989,
        doi: '10.1177/002224378902600401',
        description:
          'Extended the decoy effect research to show how context and compromise effects interact in consumer choice',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Contains the famous Economist subscription experiment and extensive discussion of how decoys shape real-world decisions',
        type: 'foundational',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, Richard H., & Sunstein, Cass R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Discusses choice architecture and how option design (including decoys) influences decisions, with ethical frameworks for applying these techniques',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Provides the cognitive science foundation for understanding why relative comparison (System 1) dominates absolute evaluation in choice',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Decoy Effect: How You Are Influenced to Choose Without Really Knowing It',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/decoy-effect',
        description:
          'Accessible overview of the decoy effect with real-world examples in pricing, marketing, and product design',
        type: 'practical',
      },
      {
        title: 'Designing Ethical Choice Architecture',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/',
        description:
          'Guidelines for using choice architecture patterns including decoys in UX design responsibly',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Are We in Control of Our Own Decisions?',
        author: 'Dan Ariely (TED Talk)',
        url: 'https://www.ted.com/talks/dan_ariely_are_we_in_control_of_our_own_decisions',
        description:
          'Ariely presents The Economist subscription experiment and explains how decoys shape our choices, one of the most-viewed TED talks on behavioral economics',
        type: 'foundational',
      },
      {
        title: 'The Decoy Effect',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=ep6YKRBVgME',
        description:
          'Short animated explanation of asymmetric dominance with pricing and product examples',
        type: 'practical',
      },
    ],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'social-proof',
      'recency-effect',
      'von-restorff-effect',
      'loss-aversion',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'recency-bias',
      'salience-bias',
      'vividness-effect',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'recency-bias',
        'salience-bias',
      ],
    },
  },
};
