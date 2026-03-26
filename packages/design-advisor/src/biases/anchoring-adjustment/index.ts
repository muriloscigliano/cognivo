/**
 * ANCHORING AND ADJUSTMENT
 *
 * We adjust insufficiently from initial anchors
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const anchoringAdjustment: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'anchoring-adjustment',
    name: 'Anchoring and Adjustment',
    aliases: [],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'judgment',
      'perception',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We adjust insufficiently from initial anchors',

    detailed: `Anchoring and Adjustment is a cognitive heuristic where people make estimates by starting from an initial value (the anchor) and then adjusting to yield a final answer. The critical insight is that these adjustments are typically insufficient -- people stop adjusting too soon, leaving their final estimate biased toward the anchor.

Unlike anchoring bias broadly (which encompasses all anchor-based distortions), anchoring and adjustment specifically describes the effortful, serial adjustment process. People generate candidate values, test whether they are acceptable, and stop as soon as they reach a plausible answer. Because this process is effortful and terminates at the first acceptable value, the final estimate remains too close to the starting point.

In UX and product design, this manifests whenever interfaces provide starting values -- default slider positions, pre-filled form fields, suggested amounts, or initial estimates. Users adjust from these starting points but rarely move far enough, making the choice of default values a powerful lever for shaping outcomes.`,

    psychologyBasis: {
      discoveredBy: 'Amos Tversky and Daniel Kahneman',
      year: 1974,
      theory: 'Heuristics and Biases Research Program',
      mechanism: `People use a serial adjustment process that starts from an anchor and moves incrementally toward a final estimate. This process is insufficient because:

1. **Effortful Processing**: Adjustment requires deliberate cognitive effort; people stop when they reach a "good enough" answer
2. **Satisficing**: The first plausible value encountered during adjustment is accepted, even if further adjustment would be more accurate
3. **Asymmetric Stopping Rules**: People are more likely to stop adjusting in the direction away from the anchor than toward it
4. **Working Memory Constraints**: Holding the anchor while generating adjustments taxes working memory, causing premature termination
5. **Confirmation Bias Interaction**: Once a plausible value is reached, people seek confirming evidence rather than continuing to adjust

Epley and Gilovich (2006) showed that self-generated anchors produce adjustment-based anchoring, while externally provided anchors produce anchoring through selective accessibility -- a distinct mechanism.`,
    },

    realWorldExample: `When asked "What is the boiling point of water on top of Mount Everest?", most people start from the known sea-level boiling point of 100°C (212°F) and adjust downward. However, they typically estimate around 85-90°C, when the actual answer is approximately 70°C (158°F). The anchor of 100°C is strong, and people's downward adjustment stops well short of the correct value.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Anchoring and adjustment directly shapes outcomes whenever an interface provides a starting value that users can modify. Because users adjust insufficiently, the initial value has outsized influence on the final choice. Designers can leverage this to:

- Set strategic default positions on sliders and range selectors
- Pre-fill form fields with beneficial starting values
- Suggest donation, tip, or contribution amounts that raise the average
- Provide initial estimates that shape final user inputs
- Position starting bids or opening offers to influence negotiation outcomes`,

    whenToUse: [
      {
        title: 'Default Slider Positions',
        scenario:
          'When users need to select a value within a range using a slider control',
        example:
          'Set a savings contribution slider default to 10% rather than 0%, knowing users will adjust down less than they would adjust up',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Pre-Filled Form Values',
        scenario: 'When forms require numeric inputs like quantities, amounts, or ratings',
        example:
          'Pre-fill a subscription quantity field with 3 seats instead of 1, since users will adjust down to 2 rather than up to 2 from 1',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Suggested Tip Amounts',
        scenario: 'When prompting users to leave a tip or gratuity',
        example:
          'Present tip options starting at 20%, 25%, 30% with 25% pre-selected, knowing users adjust minimally from the default',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Donation Preset Amounts',
        scenario: 'When collecting charitable donations with suggested amounts',
        example:
          'Default-select the $50 option among $25, $50, $100, $250 choices to anchor expectations higher than a blank custom field would',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Initial Estimates in Calculators',
        scenario: 'When providing calculators, estimators, or projection tools',
        example:
          'Pre-populate a retirement calculator with a 15% savings rate as the starting point, producing higher final selections',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Medical Dosage Inputs',
        reason:
          'Insufficient adjustment from a wrong default could lead to dangerous over- or under-dosing',
        consequence:
          'Patient harm from dosages that remain anchored to incorrect defaults',
        alternative:
          'Require explicit entry with no default, or use weight-based auto-calculation with prominent verification',
      },
      {
        title: 'Financial Planning for Vulnerable Users',
        reason:
          'Anchoring users to high commitment amounts can cause financial hardship',
        consequence:
          'Users overcommit because they adjust insufficiently down from a high default',
        alternative:
          'Show a range of options without pre-selection, or default to the most conservative option',
      },
      {
        title: 'Legal or Contractual Agreements',
        reason:
          'Pre-filled contract terms exploit insufficient adjustment to lock users into unfavorable terms',
        consequence:
          'Users accept terms too close to the pre-filled values without adequate negotiation',
        alternative:
          'Present blank fields or balanced starting points with clear guidance on typical ranges',
      },
      {
        title: 'Accessibility-Sensitive Contexts',
        reason:
          'Screen reader users may not perceive default values as easily, making adjustment harder',
        consequence:
          'Assistive technology users are more susceptible to anchor effects from defaults they cannot easily inspect',
        alternative:
          'Announce default values explicitly and provide clear instructions for adjustment',
      },
    ],

    commonMistakes: [
      {
        title: 'Setting Unrealistic Default Values',
        description:
          'Choosing a default so extreme that users reject the entire control or abandon the form',
        why: 'If the anchor is implausible, users distrust the interface rather than adjusting from it',
        fix: 'Set defaults within the plausible range -- high enough to benefit from insufficient adjustment but realistic enough to be credible',
      },
      {
        title: 'Ignoring Bidirectional Adjustment',
        description:
          'Assuming users only adjust in one direction from the anchor',
        why: 'Some users need to adjust up and others down; a poorly chosen anchor hurts one group while helping another',
        fix: 'Segment users and test defaults with different groups to find the optimal anchor point',
      },
      {
        title: 'No Visible Scale or Range Context',
        description:
          'Providing a default value without showing the full range of possible values',
        why: 'Without range context, users cannot calibrate their adjustment and may accept the default unchanged',
        fix: 'Always display the full range (min/max labels, tick marks) so users can make informed adjustments',
      },
      {
        title: 'Manipulative Pre-Population',
        description:
          'Pre-filling quantities, subscription lengths, or add-ons at exploitatively high values',
        why: 'Users adjust down insufficiently and end up purchasing more than intended, eroding trust',
        fix: 'Use defaults that serve the user\'s genuine interest, not just revenue maximization',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines where default values and starting points appear, affecting how strongly they anchor',
        examples: [
          'Slider controls with visible default positions anchor adjustment range',
          'Pre-selected options in prominent positions receive less scrutiny and adjustment',
          'Form fields positioned early in a flow anchor expectations for later fields',
          'Calculator results shown above the fold anchor user estimates before scrolling to details',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Font size and weight of default values affect how strongly they anchor',
        examples: [
          'Large, bold default numbers on sliders create stronger anchors',
          'Pre-filled values in prominent type styles receive less adjustment',
          'Small, subtle default text may be overlooked entirely, weakening the anchor',
          'Number formatting (currency symbols, decimal places) affects perceived magnitude of the anchor',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color treatment of defaults and suggested values affects anchor strength',
        examples: [
          'Highlighted or color-emphasized defaults create stronger anchors',
          'Muted default values signal they are suggestions, encouraging more adjustment',
          'Color-coded ranges on sliders help users calibrate their adjustments',
          'Green/positive coloring on defaults implies endorsement, reducing adjustment',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive controls with starting positions are the primary vehicle for anchoring and adjustment',
        examples: [
          'Slider default positions directly anchor the adjustment range',
          'Stepper controls with initial values anchor the increment/decrement range',
          'Pre-selected radio buttons or dropdown defaults anchor choices',
          'Drag-to-adjust interfaces anchor to the initial handle position',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Suggested values, example amounts, and reference numbers in content text serve as anchors',
        examples: [
          '"Most customers choose X" anchors adjustment toward X',
          'Example calculations with specific numbers anchor user inputs',
          'Placeholder text showing sample values anchors form entries',
          'Instructional content mentioning specific amounts anchors expectations',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users may experience anchor effects differently depending on how defaults are communicated',
        examples: [
          'Screen readers announcing default values create auditory anchors',
          'Keyboard users adjusting steppers may make smaller incremental adjustments',
          'Voice control users may state absolute values rather than adjusting from defaults',
          'ARIA value attributes on range inputs must accurately communicate current position',
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
        title: 'Strategic Default Tip Amounts',
        description:
          'Ride-sharing app presenting tip options with a beneficial default pre-selected',
        code: `<div class="tip-selector">
  <h3>Add a tip for your driver</h3>
  <div class="tip-options">
    <button class="tip-amount">15%</button>
    <button class="tip-amount selected">20%</button>
    <button class="tip-amount">25%</button>
    <button class="tip-amount">30%</button>
    <button class="tip-amount custom">Custom</button>
  </div>
  <p class="tip-context">
    <span class="average">Average tip for this route: 22%</span>
  </p>
</div>`,
        explanation:
          'Pre-selecting 20% anchors users to a reasonable tip. Most users adjust minimally (to 15% or 25%) rather than entering a dramatically different custom amount. The "average tip" text provides a secondary anchor that reinforces generous tipping.',
        principle:
          'Strategic defaults exploit insufficient adjustment to raise average outcomes',
        metrics: {
          before: 'Average tip with blank custom field: $2.40',
          after: 'Average tip with 20% pre-selected: $4.80',
          improvement: '100% increase in average tip amount',
        },
      },
      {
        title: 'Pre-Populated Savings Rate Slider',
        description:
          'Retirement planning tool with a beneficial default contribution rate',
        code: `<div class="savings-slider">
  <label for="contribution">Monthly Contribution Rate</label>
  <div class="slider-container">
    <span class="min-label">0%</span>
    <input type="range" id="contribution"
      min="0" max="30" value="12" step="1">
    <span class="max-label">30%</span>
  </div>
  <div class="current-value">
    <strong>12%</strong> of your income
  </div>
  <p class="guidance">Financial advisors recommend 10-15% for retirement</p>
</div>`,
        explanation:
          'Setting the slider default to 12% (within the recommended range) anchors users to a healthy savings rate. Users who might have started at 3-5% on a blank field instead adjust down from 12% to perhaps 8-10%, still a significantly better outcome.',
        principle:
          'Beneficial defaults combined with range guidance produce better user outcomes through insufficient adjustment',
      },
      {
        title: 'Smart Form Pre-Population',
        description:
          'E-commerce checkout pre-filling quantity based on common purchase patterns',
        code: `<div class="product-quantity">
  <label>Quantity</label>
  <div class="stepper">
    <button class="decrement" aria-label="Decrease quantity">-</button>
    <input type="number" value="2" min="1" max="99"
      aria-label="Quantity">
    <button class="increment" aria-label="Increase quantity">+</button>
  </div>
  <p class="suggestion">
    Most customers buy 2-3 for best value
  </p>
</div>`,
        explanation:
          'Pre-filling quantity at 2 instead of 1 anchors users higher. Many users accept the default; those who adjust typically go to 1 (one step down) rather than the 3+ they might reach adjusting up from 1. The suggestion text provides a secondary anchor reinforcing multi-unit purchase.',
        principle:
          'Default quantities anchor purchase behavior through insufficient downward adjustment',
        metrics: {
          before: 'Average units per order (default 1): 1.3',
          after: 'Average units per order (default 2): 1.8',
          improvement: '38% increase in units per order',
        },
      },
    ],

    bad: [
      {
        title: 'Manipulative Pre-Filled Insurance Add-Ons',
        description:
          'Travel booking site pre-selecting expensive insurance at checkout',
        code: `<!-- DON'T DO THIS -->
<div class="insurance-upsell">
  <h3>Travel Protection</h3>
  <div class="option selected">
    <input type="radio" name="insurance" value="premium" checked>
    <label>
      <strong>Premium Coverage - $89.99</strong>
      <p>Full trip protection + medical + baggage</p>
    </label>
  </div>
  <div class="option">
    <input type="radio" name="insurance" value="basic">
    <label>Basic Coverage - $29.99</label>
  </div>
  <div class="option decline">
    <input type="radio" name="insurance" value="none">
    <label>No thanks, I'll risk it</label>
  </div>
</div>`,
        explanation:
          'Pre-selecting the most expensive insurance option exploits insufficient adjustment. Users who would never have chosen $89.99 insurance accept it because adjusting away from the default requires effort. The "I\'ll risk it" framing on the decline option adds guilt.',
        principle:
          'Never pre-select the most expensive option to exploit insufficient adjustment at the user\'s expense',
      },
      {
        title: 'Deceptive Default Subscription Length',
        description:
          'SaaS product defaulting to annual billing to exploit adjustment inertia',
        code: `<!-- DON'T DO THIS -->
<div class="billing-toggle">
  <div class="toggle-option">Monthly</div>
  <label class="switch">
    <input type="checkbox" checked>
    <span class="slider"></span>
  </label>
  <div class="toggle-option active">
    Annual <span class="save-badge">Save 40%!</span>
  </div>
  <p class="price">$299/year</p>
  <small style="color: #aaa; font-size: 0.7em;">
    That's just $24.92/month!
  </small>
</div>`,
        explanation:
          'Defaulting to annual billing exploits the tendency to insufficiently adjust away from the default commitment level. Users who would prefer monthly are anchored to the annual plan and may not switch because the "Save 40%!" framing makes adjustment feel like a loss.',
        principle:
          'Defaults that lock users into larger commitments than they intend are manipulative anchoring',
      },
      {
        title: 'Inflated Default Donation Amount',
        description:
          'Charity page defaulting to an unreasonably high amount to exploit adjustment',
        code: `<!-- DON'T DO THIS -->
<div class="donation-form">
  <h2>Make a Difference Today</h2>
  <div class="amount-input">
    <span class="currency">$</span>
    <input type="number" value="500" class="donation-amount">
  </div>
  <p class="guilt-text">Every dollar counts. Can you really
  put a price on a child's future?</p>
  <button class="donate-btn">Donate Now</button>
</div>`,
        explanation:
          'Pre-filling $500 as the default donation amount is exploitative. Most donors intended to give $20-50 but feel anchored to the $500 starting point. Even with adjustment, they end up donating more than comfortable, leading to regret and reduced future giving.',
        principle:
          'Extreme default values that exploit insufficient adjustment destroy trust and long-term engagement',
      },
    ],

    realWorld: [
      {
        company: 'Uber',
        product: 'Tip Selection',
        url: 'https://www.uber.com',
        description: 'After rides, Uber presents pre-set tip amounts (typically 15%, 20%, 25%, and a custom option) with one amount pre-highlighted. Users anchor to the suggested amounts and adjust minimally, resulting in higher average tips than a blank tip field would produce.',
        effectiveness: 'very-effective',
        analysis: 'Uber\'s tip UI is a textbook example of anchoring and adjustment. The pre-set percentages anchor expectations, and the highlighted default exploits insufficient adjustment. Average tip amounts increased significantly after switching from a blank field to pre-set options.',
      },
      {
        company: 'Wikipedia',
        product: 'Donation Banner',
        url: 'https://donate.wikimedia.org',
        description: 'Wikipedia\'s annual donation drive uses pre-set amounts ($2.75, $5, $10, $20, $50) with a middle option pre-selected. The preset amounts anchor donors higher than an empty field, and the pre-selection reduces friction while exploiting insufficient adjustment.',
        effectiveness: 'very-effective',
        analysis: 'Wikipedia carefully tests which default amount to pre-select. Pre-selecting $5 instead of leaving a blank field increased both conversion rate and average donation. Users who would have given $2-3 in a blank field give $5 because they don\'t adjust down.',
      },
      {
        company: 'Zillow',
        product: 'Home Value Estimates (Zestimate)',
        description: 'Zillow\'s Zestimate provides an initial home value estimate that anchors all subsequent thinking about property value. Buyers and sellers adjust from this number but rarely deviate far, even when the Zestimate may be inaccurate for specific properties.',
        effectiveness: 'very-effective',
        analysis: 'The Zestimate is one of the most powerful real-world anchors in any industry. Research shows listing prices and final sale prices cluster tightly around Zestimates, demonstrating how an algorithmically-generated starting point anchors all parties\' adjustments.',
      },
      {
        company: 'eBay',
        product: 'Starting Bid / Buy It Now',
        url: 'https://www.ebay.com',
        description: 'eBay auction starting bids anchor bidders\' valuations. Items with $0.99 starting bids often sell for less than identical items with higher starting bids, because bidders adjust insufficiently upward from the low anchor.',
        effectiveness: 'effective',
        analysis: 'Research by Ku, Galinsky, and Murnighan (2006) showed that lower starting prices on eBay auctions led to lower final prices, directly demonstrating insufficient upward adjustment from anchors. Sellers who understand this set strategic starting bids.',
      },
    ],

    abTests: [
      {
        title: 'Tip Defaults: Pre-Selected 20% vs Blank Custom Field',
        hypothesis:
          'Pre-selecting a 20% tip option will increase average tip amount due to insufficient adjustment',
        controlVersion: {
          description:
            'Tip screen with blank custom input field and text: "Add a tip for your driver"',
          metrics: {
            conversionRate: '61%',
            averagePrice: '$3.20',
          },
        },
        treatmentVersion: {
          description:
            'Tip screen with 15%, 20%, 25%, 30% buttons, 20% pre-selected, plus custom option',
          metrics: {
            conversionRate: '78%',
            averagePrice: '$5.60',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Pre-set tip amounts with a 20% default increased both tipping rate (+28%) and average tip (+75%). Users anchored to the 20% default and adjusted minimally. Most selected the pre-selected amount or one adjacent option.',
          learnings: [
            'Default selection is the single strongest predictor of final choice',
            'Users overwhelmingly select the pre-selected option or adjust by one step',
            'Custom field usage dropped from 100% (control) to 8% (treatment)',
            'Higher defaults produced higher averages but lower tipping rates above 25%',
          ],
        },
      },
      {
        title: 'Savings Slider Default: 5% vs 12% Starting Position',
        hypothesis:
          'A higher default slider position will produce higher final savings rate selections',
        controlVersion: {
          description:
            'Retirement savings slider defaulting to 5% contribution rate, range 0-30%',
          metrics: {
            conversionRate: '72%',
            averagePrice: '6.2%',
          },
        },
        treatmentVersion: {
          description:
            'Retirement savings slider defaulting to 12% contribution rate, range 0-30%',
          metrics: {
            conversionRate: '68%',
            averagePrice: '10.8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Despite slightly lower completion rate (-4%), the higher default produced 74% higher average contribution rate. Users adjusted down from 12% less than they adjusted up from 5%, consistent with insufficient adjustment theory. The net financial benefit to users was overwhelmingly positive.',
          learnings: [
            'Higher defaults produce meaningfully higher final selections despite some dropout',
            'Downward adjustment from a high anchor is smaller than upward adjustment from a low anchor',
            '34% of users in the treatment group accepted the 12% default without any adjustment',
            'The "right" default depends on balancing conversion rate against average outcome',
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
        name: 'Pre-Filled Input Values',
        description:
          'Form fields, number inputs, or text areas that load with a value already entered',
        howToSpot:
          'Look for input fields that show a number or text on page load rather than being empty or showing placeholder text',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Default Slider Positions',
        description:
          'Slider or range controls that start at a position other than the minimum',
        howToSpot:
          'Check if sliders load with the handle positioned away from zero or the left edge',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Pre-Selected Options',
        description:
          'Radio buttons, checkboxes, or toggle switches that are already selected on load',
        howToSpot:
          'Look for form controls with a checked or selected state before user interaction',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Suggested Amount Buttons',
        description:
          'Preset amount options (tips, donations, quantities) with one highlighted or pre-selected',
        howToSpot:
          'Look for button groups with monetary or numeric values where one has active/selected styling',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Reference Numbers in Context',
        description:
          'Numbers mentioned in instructional text, labels, or helper text near input controls',
        howToSpot:
          'Check for "most customers choose X", "recommended: Y", or "average: Z" near adjustable inputs',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Default Value Pattern',
        description: 'Input controls pre-loaded with values that users can adjust',
        indicators: [
          'Form inputs with non-empty value attributes',
          'Sliders positioned away from minimum on page load',
          'Number steppers starting at values above 1',
          'Pre-checked radio buttons or checkboxes',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Suggested Amount Pattern',
        description: 'Discrete options presented as starting points for tips, donations, or quantities',
        indicators: [
          'Button groups with monetary values and one pre-selected',
          'Preset amount chips or pills above a custom input',
          'Tiered option cards with a "recommended" indicator',
          'Amount selectors with highlighted default',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Contextual Anchor Pattern',
        description: 'Reference numbers in surrounding content that anchor adjustment of nearby controls',
        indicators: [
          '"Average" or "typical" values mentioned near inputs',
          '"Most popular" or "most chosen" labels near options',
          'Example values in placeholder text or helper text',
          'Peer comparison data adjacent to adjustable controls',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Progressive Commitment Pattern',
        description: 'Multi-step flows where early defaults anchor later adjustments',
        indicators: [
          'Wizard flows carrying forward values from earlier steps',
          'Calculator results used as defaults in subsequent inputs',
          'Estimates from one tool feeding into another as starting values',
          'Previous session values loaded as new session defaults',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there any form fields pre-filled with values on page load?',
      'Where are sliders and range controls positioned by default?',
      'Are any radio buttons, checkboxes, or toggles pre-selected?',
      'Are suggested amounts presented, and if so, which is highlighted or pre-selected?',
      'Do surrounding text or labels contain reference numbers near adjustable inputs?',
      'Are "most popular", "recommended", or "average" labels used to anchor choices?',
      'Could the default values cause harm if users accept them without adjustment?',
      'Are defaults set to benefit the user or primarily the business?',
      'Do users have clear visibility into the full range of possible adjustments?',
      'Are pre-filled values appropriate for the full range of user segments?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the anchoring and adjustment heuristic.

Analyze the provided design for anchoring and adjustment patterns. Identify:

1. **Default Values**: Pre-filled inputs, slider positions, pre-selected options
2. **Suggested Amounts**: Preset tip, donation, or quantity options
3. **Contextual Anchors**: Reference numbers in labels, helper text, or surrounding content
4. **Adjustment Affordances**: How easy or difficult it is for users to adjust from defaults
5. **Progressive Anchors**: Values carried forward from earlier steps in a flow

For each anchor found:
- Identify the starting value and the likely adjustment range
- Assess whether insufficient adjustment helps or harms the user
- Determine if the default serves user interests or primarily business interests
- Evaluate whether the full adjustment range is clearly visible
- Suggest improvements for ethical, user-centered default values

Consider:
- Is the default value realistic and within the plausible range for most users?
- Does the interface make it easy to adjust away from the default?
- Are there contextual anchors reinforcing or conflicting with the default?
- Could vulnerable users be harmed by insufficient adjustment from these defaults?
- Is the adjustment mechanism accessible to all users (keyboard, screen reader, etc.)?

Provide actionable recommendations for ethical, beneficial use of anchoring and adjustment.`,

    outputSchema: {
      type: 'object',
      properties: {
        anchorPoints: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              defaultValue: { type: 'string' },
              likelyAdjustmentRange: { type: 'string' },
              servesUser: { type: 'boolean' },
              adjustmentEase: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'defaultValue',
              'servesUser',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            defaultQuality: { type: 'number' },
            adjustmentClarity: { type: 'number' },
            userBenefit: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'defaultQuality',
            'adjustmentClarity',
            'userBenefit',
            'ethicalScore',
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
        'anchorPoints',
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
        title: 'Identify Adjustable Controls',
        description:
          'Map all inputs where users select values: sliders, steppers, amount selectors, dropdowns, and form fields',
        example:
          'Audit: tip selector, savings slider, quantity stepper, donation amounts, subscription length',
        tips: [
          'Include both explicit controls (sliders) and implicit ones (pre-filled fields)',
          'Consider contextual numbers in labels and helper text as soft anchors',
          'Map the full user flow to find carry-forward anchors between steps',
        ],
      },
      {
        step: 2,
        title: 'Choose Ethical Default Values',
        description:
          'Set defaults that serve user interests while acknowledging that users will adjust insufficiently',
        example:
          'Set retirement contribution default to 12% (within recommended range) rather than 3% (below recommended) or 25% (unrealistically high)',
        tips: [
          'Defaults should be within the range that genuinely benefits users',
          'Consider what happens if a user accepts the default unchanged -- is that a good outcome?',
          'Test defaults with user research to ensure they feel appropriate, not manipulative',
        ],
      },
      {
        step: 3,
        title: 'Make the Full Range Visible',
        description:
          'Ensure users can see the complete range of possible values, not just the default',
        example:
          'Show min/max labels on sliders, display the full set of tip options, reveal the custom input prominently',
        tips: [
          'Min and max labels on range controls help users calibrate adjustments',
          'Show the custom/other option prominently, not hidden behind a button',
          'Use tick marks or step indicators to show the adjustment scale',
        ],
      },
      {
        step: 4,
        title: 'Provide Contextual Reference Points',
        description:
          'Add honest contextual information to help users make informed adjustments',
        example:
          '"Average tip for this route: 22%" or "Financial advisors recommend 10-15%"',
        tips: [
          'Reference points should be truthful and verifiable',
          'Show peer data ("most customers choose...") to provide social calibration',
          'Avoid using reference points that conflict with the default to reduce confusion',
        ],
      },
      {
        step: 5,
        title: 'Test Adjustment Behavior',
        description:
          'Measure how much users actually adjust from defaults and whether outcomes are beneficial',
        example:
          'A/B test: Default tip at 15% vs 20% vs 25%. Measure average tip, tipping rate, and user satisfaction',
        tips: [
          'Track the distribution of final values, not just the average',
          'Measure user satisfaction and regret alongside conversion metrics',
          'Test with different user segments to find appropriate defaults for each',
          'Monitor long-term effects (churn, repeat usage) not just immediate conversion',
        ],
      },
    ],

    dos: [
      'Set defaults that genuinely benefit users when accepted without adjustment',
      'Show the full range of possible values clearly (min/max, all options)',
      'Provide honest contextual anchors (averages, recommendations, peer data)',
      'Make it easy to adjust from the default with clear, accessible controls',
      'Test defaults with real users to ensure they feel appropriate, not manipulative',
      'Use defaults to help users overcome inertia toward beneficial actions (saving, protecting)',
      'Document and justify your choice of default values',
      'Consider different defaults for different user segments when appropriate',
    ],

    donts: [
      'Don\'t pre-select the most expensive or most profitable option as the default',
      'Don\'t hide the full range of choices behind extra clicks or tiny text',
      'Don\'t use defaults to lock users into commitments they haven\'t explicitly chosen',
      'Don\'t set unrealistically high defaults to exploit insufficient downward adjustment',
      'Don\'t use pre-filled values for legally binding fields (contracts, agreements)',
      'Don\'t carry forward values from one context to an unrelated context as defaults',
      'Don\'t make adjustment controls inaccessible or hard to operate',
      'Don\'t use misleading contextual anchors ("average" values that aren\'t actually average)',
    ],

    bestPractices: [
      {
        title: 'The "Accepted Unchanged" Test',
        description:
          'Ask whether each default value produces a good outcome if the user accepts it without any adjustment',
        rationale:
          'A significant percentage of users will accept defaults unchanged; the default IS the choice for these users',
        example:
          'If a 12% savings rate default is accepted unchanged, that\'s a good outcome. If a $500 donation default is accepted unchanged, that may cause financial stress.',
      },
      {
        title: 'Transparent Range Communication',
        description:
          'Always show the full range of possible values alongside any default',
        rationale:
          'Users cannot make informed adjustments if they don\'t know the boundaries of the possible range',
        example:
          'Slider with 0%-30% labels, tick marks at 5% intervals, and current value displayed prominently',
      },
      {
        title: 'Segment-Appropriate Defaults',
        description:
          'Use different default values for different user segments when user context is known',
        rationale:
          'A $100 donation default is appropriate for a high-income donor but exploitative for a student',
        example:
          'New users see a conservative default; returning high-value users see a default based on their history',
      },
      {
        title: 'Pair Defaults with Honest Context',
        description:
          'Accompany every default with truthful contextual information that helps calibrate adjustment',
        rationale:
          'Honest context (peer behavior, expert recommendations) helps users adjust more accurately',
        example:
          '"Default: 20% tip. Average tip on this platform: 18%. Typical range: 15-25%."',
      },
      {
        title: 'Monitor and Adjust Defaults Over Time',
        description:
          'Regularly review whether default values still serve user interests as conditions change',
        rationale:
          'What was a beneficial default a year ago may be exploitative or outdated today',
        example:
          'Quarterly review of default tip percentages, savings rates, and suggested amounts against actual user outcomes',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Ensure default values are programmatically exposed to assistive technology',
        implementation:
          'Use proper aria-valuenow, aria-valuemin, aria-valuemax on range inputs. Pre-filled form values must be accessible via the value attribute.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Changing a default value should not cause unexpected context changes',
        implementation:
          'Adjusting a slider or changing a pre-selected option should not trigger page navigation, form submission, or focus changes without warning.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Default and suggested values must be conveyed through structure, not just visual styling',
        implementation:
          'Use aria-label or visible label text to identify which option is the default. Don\'t rely solely on color or position to indicate the pre-selected choice.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All adjustment controls must be fully operable via keyboard',
        implementation:
          'Sliders must support arrow keys for fine adjustment. Stepper buttons must be keyboard-focusable. Custom amount fields must be reachable via Tab.',
      },
    ],

    ethics: [
      {
        concern: 'Exploitative Defaults',
        severity: 'critical',
        explanation:
          'Setting defaults to maximize revenue rather than serve user interests, knowing users will adjust insufficiently',
        mitigation:
          'Apply the "accepted unchanged" test: if the default is accepted as-is, would the user be satisfied? If not, the default is exploitative. Choose defaults that benefit users.',
      },
      {
        concern: 'Hidden Commitment Anchoring',
        severity: 'critical',
        explanation:
          'Pre-selecting subscription lengths, add-ons, or commitment levels that users would not have chosen independently',
        mitigation:
          'Never pre-select commitment levels. Default to the lowest commitment option and let users actively choose to increase.',
      },
      {
        concern: 'Inflated Reference Points',
        severity: 'high',
        explanation:
          'Displaying fabricated "average" or "typical" values as contextual anchors to inflate adjustments',
        mitigation:
          'All reference points ("average tip", "most customers choose") must be based on real, current data. Cite the source and update regularly.',
      },
      {
        concern: 'Vulnerable User Exploitation',
        severity: 'critical',
        explanation:
          'Using high defaults with populations who are less likely to adjust (elderly users, those with cognitive disabilities, users in distress)',
        mitigation:
          'Use conservative defaults for contexts where vulnerable users are likely. Provide extra-clear adjustment mechanisms and confirmation steps.',
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
          'The foundational paper that introduced anchoring and adjustment as a cognitive heuristic',
        type: 'foundational',
      },
      {
        title: 'The Anchoring-and-Adjustment Heuristic: Why the Adjustments Are Insufficient',
        author: 'Epley, N., & Gilovich, T.',
        year: 2006,
        doi: '10.1111/j.1467-9280.2006.01704.x',
        description:
          'Seminal paper explaining why adjustments from self-generated anchors are systematically insufficient',
        type: 'foundational',
      },
      {
        title: 'Putting Adjustment Back in the Anchoring and Adjustment Heuristic',
        author: 'Epley, N., & Gilovich, T.',
        year: 2001,
        doi: '10.1111/1467-9280.00346',
        description:
          'Distinguished anchoring-and-adjustment (self-generated anchors) from selective accessibility (externally provided anchors)',
        type: 'advanced',
      },
      {
        title: 'When Effortful Thinking Influences Judgmental Anchoring: Differential Effects of Forewarning and Incentives on Self-Generated and Externally Provided Anchors',
        author: 'Epley, N., & Gilovich, T.',
        year: 2005,
        description:
          'Showed that motivation and forewarning reduce anchoring from self-generated but not externally provided anchors',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of anchoring and adjustment by its co-discoverer, including the distinction between adjustment and priming mechanisms',
        type: 'foundational',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R., & Sunstein, C.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Practical framework for using defaults and anchors ethically as "nudges" to improve decision-making',
        type: 'practical',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Vivid examples of anchoring effects in pricing, negotiation, and everyday decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Power of Defaults in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/the-power-of-defaults/',
        description:
          'Practical guide to setting effective defaults in user interfaces, grounded in anchoring and adjustment research',
        type: 'practical',
      },
      {
        title: 'Default Effect: How to Leverage Defaults in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/the-default-effect',
        description:
          'UX-focused guide with design patterns for ethical default values',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Anchoring and Adjustment: Why Your First Guess Matters',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=jq8DyBHNEH4',
        description:
          'Animated explanation of the anchoring and adjustment heuristic with everyday examples',
        type: 'foundational',
      },
    ],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'anchoring-bias',
      'default-effect',
      'status-quo-bias',
      'loss-aversion',
    ],

    conflicts: [
      'reactance',
      'information-bias',
    ],

    confusedWith: [
      'anchoring-bias',
      'priming',
      'default-effect',
    ],

    hierarchy: {
      parent: 'anchoring-bias',
      children: [],
    },
  },
};
