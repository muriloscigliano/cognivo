/**
 * PROPORTION DOMINANCE
 *
 * People prefer options presented as higher proportions or percentages,
 * even when absolute values suggest otherwise.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const proportionDominance: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'proportion-dominance',
    name: 'Proportion Dominance',
    aliases: ['Ratio Bias', 'Denominator Neglect', 'Percentage Bias'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'proportions',
      'percentages',
      'ratios',
      'framing',
      'numeracy',
      'decision-making',
      'discount-framing',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We prefer options with higher proportions or percentages, even when absolute numbers tell a different story.',

    detailed: `Proportion dominance is a cognitive bias where people evaluate options based on ratios and percentages rather than absolute values. A "50% discount" feels more compelling than "save $5," even when both describe the same $10 item. Similarly, "90% complete" feels more motivating than "9 of 10 tasks done," despite conveying identical information.

This bias arises because the human brain processes proportions as inherently meaningful signals of magnitude and progress. Larger percentages trigger stronger emotional responses regardless of the underlying absolute quantities. A 90% survival rate feels dramatically better than a 10% mortality rate, even though they describe the same outcome.

In product and UX design, proportion dominance profoundly affects how users perceive discounts, evaluate progress, interpret completion rates, and compare options. Designers who understand this bias can frame numerical information to align with user goals---presenting savings as percentages when proportions are large, using completion percentages to motivate task finishing, and choosing ratio-based displays that accurately represent value while leveraging natural cognitive tendencies.`,

    psychologyBasis: {
      discoveredBy: 'Paul Slovic, Melissa Finucane, Ellen Peters, and Donald G. MacGregor',
      year: 2002,
      theory: 'Affect Heuristic and Evaluability Framework',
      mechanism: `The brain evaluates proportions as more emotionally resonant and cognitively accessible than absolute numbers. This happens because:

1. **Ratio Processing**: Proportions map naturally to an internal "more vs less" scale---50% instantly registers as "half," while $5 requires context to evaluate
2. **Denominator Neglect**: People focus on the numerator (what is gained or lost) relative to a denominator, but neglect whether the denominator itself is meaningful
3. **Evaluability Gap**: Percentages are self-contained and evaluable without context, while absolute numbers require reference points to interpret
4. **Affect Loading**: Round, large percentages (90%, 50%) trigger stronger affective responses than equivalent absolute values
5. **Mental Scaling**: The brain treats 0-100% as a universal scale, making proportions feel comparable across domains even when the underlying quantities differ vastly`,
    },

    realWorldExample: `In a classic study, participants were asked to choose between two urns for a lottery. Urn A had 1 winning marble out of 10 (10% chance). Urn B had 8 winning marbles out of 100 (8% chance). Despite Urn A having objectively better odds, many participants chose Urn B because 8 winning marbles "felt" like more than 1 winning marble. The absolute count of favorable outcomes dominated their judgment over the actual proportion---a direct demonstration of how ratio-based thinking can be overridden by numerosity, and how proportion framing shapes perceived value.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Proportion dominance affects how users perceive value, progress, and risk whenever numerical information is displayed. The choice between presenting data as percentages versus absolute numbers fundamentally shifts user perception. Designers can leverage this to:

- Frame discounts as percentages for low-price items (50% off) and as absolute values for high-price items (save $200)
- Display progress as completion percentages to maximize motivational effect
- Present success rates and match ratios to encourage action
- Choose between "X of Y" and "Z%" formats based on which framing best serves user understanding
- Structure comparison displays so proportional advantages are clear and honest`,

    whenToUse: [
      {
        title: 'Discount and Savings Displays',
        scenario:
          'When presenting discounts on lower-priced items where the percentage is impressive',
        example:
          'Show "Save 50%" on a $10 item rather than "Save $5"---the proportion feels more significant',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Progress Indicators',
        scenario: 'When motivating users to complete multi-step processes or onboarding flows',
        example:
          'Display "85% complete" rather than "17 of 20 steps done" to create stronger completion motivation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Donation Matching',
        scenario: 'When encouraging charitable contributions or crowdfunding participation',
        example:
          'Frame as "Your donation is 200% matched" rather than "For every $1, we add $2"---the ratio amplifies perceived impact',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Success Rate Communication',
        scenario: 'When building confidence in a product, process, or outcome',
        example:
          'Show "98% uptime" rather than "downtime of approximately 7 hours per year" to emphasize reliability',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Completion Rate Badges',
        scenario: 'When gamifying learning, training, or profile completeness',
        example:
          'Display "Profile 90% complete" with a progress ring rather than "9 of 10 fields filled"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Comparative Value Displays',
        scenario: 'When showing how one option outperforms another',
        example:
          'Show "3x faster" or "200% more storage" rather than raw numbers when the ratio is compelling',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'High-Value Absolute Savings',
        reason:
          'For expensive items, the absolute dollar amount saved is more impressive than the percentage',
        consequence:
          '"Save 5% on your $2,000 purchase" sounds small; "Save $100" sounds significant',
        alternative:
          'Use absolute values when the dollar amount is large and the percentage is small',
      },
      {
        title: 'Medical or Health Decisions',
        reason:
          'Proportion framing can distort perception of medical risks and benefits',
        consequence:
          '"99% survival rate" and "1% mortality rate" feel very different despite being identical, potentially biasing treatment decisions',
        alternative:
          'Present both absolute and relative risk information side by side, using natural frequencies (e.g., "1 in 100 patients")',
      },
      {
        title: 'Small Sample Sizes',
        reason:
          'Percentages from small samples are misleading---"100% of users love it" from 3 reviews',
        consequence:
          'Users may assume large-scale validation when the sample is tiny',
        alternative:
          'Show absolute numbers when sample sizes are small: "3 out of 3 users rated 5 stars"',
      },
      {
        title: 'Financial Product Comparisons',
        reason:
          'Percentage returns without absolute context can mislead investors',
        consequence:
          '"200% return" on a $10 investment ($20 gain) sounds better than "10% return" on $10,000 ($1,000 gain)',
        alternative:
          'Always show both percentage and absolute returns in financial contexts',
      },
    ],

    commonMistakes: [
      {
        title: 'Using Percentages When Absolutes Are More Meaningful',
        description:
          'Showing "Save 2%" on a $5,000 item instead of "Save $100"',
        why: 'Small percentages feel trivial even when the absolute savings are substantial',
        fix: 'Apply the "Rule of 100": use percentages for items under $100, absolute values for items over $100',
      },
      {
        title: 'Mixing Proportion Formats Inconsistently',
        description:
          'Showing "50% off" on one product and "Save $3" on another in the same view',
        why: 'Inconsistent framing makes comparison difficult and creates cognitive friction',
        fix: 'Use a consistent numerical format within the same comparison context',
      },
      {
        title: 'Percentage Without Denominator Context',
        description:
          'Displaying "95% satisfaction rate" without mentioning the sample size or total respondents',
        why: 'Users cannot evaluate the reliability of the proportion without knowing the base',
        fix: 'Include sample context: "95% satisfaction rate (from 2,400 responses)"',
      },
      {
        title: 'Inflating Proportions Through Cherry-Picked Denominators',
        description:
          'Choosing denominators that make proportions look artificially impressive',
        why: 'Manipulative proportion framing erodes trust when users discover the real numbers',
        fix: 'Use honest, standard denominators and be transparent about what is being measured',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how proportional information is presented and compared',
        examples: [
          'Progress bars and completion rings leverage proportion dominance visually',
          'Side-by-side percentage comparisons create immediate ratio evaluation',
          'Discount badges positioned near prices anchor proportional savings',
          'Dashboard layouts with percentage-based KPIs shape performance perception',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Number formatting and size directly affect how proportions are perceived',
        examples: [
          'Large percentage numbers (50% OFF) create stronger proportional impact than small text',
          'Percentage signs rendered larger than the number amplify the ratio signal',
          'Strikethrough original prices paired with percentage savings reinforce value',
          'Tabular number formatting enables accurate proportion comparison',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces proportional framing through emotional association',
        examples: [
          'Green progress fills reinforce positive completion proportions',
          'Red discount percentages create urgency around savings ratios',
          'Color gradients on progress bars visualize proportional advancement',
          'High-contrast percentage badges draw attention to ratio-based value',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements that update proportions create real-time engagement with ratios',
        examples: [
          'Animated progress bars filling from 0% to current value dramatize proportional progress',
          'Sliders showing percentage allocation make ratio trade-offs tangible',
          'Real-time discount calculators switching between % and $ amount reveal framing effects',
          'Hover states revealing "X of Y" behind percentages provide transparency',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing---choosing percentages vs absolutes---is the core lever for proportion dominance',
        examples: [
          '"Save 50%" vs "Save $5" on a $10 item dramatically shifts perceived value',
          '"90% complete" vs "9 of 10 done" changes completion motivation',
          '"3x faster" vs "loads in 2 seconds instead of 6" provides different evaluation frames',
          '"Match rate: 200%" vs "We add $2 for every $1" alters donation willingness',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Proportional displays must be perceivable and understandable by all users',
        examples: [
          'Screen readers must announce both percentage and absolute values for progress bars',
          'Progress bar visuals need text alternatives conveying completion proportion',
          'Color-only proportion indicators (red/green fills) need non-color alternatives',
          'Percentage-heavy displays may confuse users with low numeracy---provide plain-language alternatives',
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
        title: 'Smart Discount Framing by Price',
        description:
          'E-commerce platform using percentage framing for low-price items and absolute framing for high-price items',
        code: `<div class="product-card low-price">
  <h3>Wireless Earbuds</h3>
  <div class="price-block">
    <span class="original">$20</span>
    <span class="discount-badge">50% OFF</span>
    <span class="sale-price">$10</span>
  </div>
</div>

<div class="product-card high-price">
  <h3>4K Television</h3>
  <div class="price-block">
    <span class="original">$2,000</span>
    <span class="discount-badge">Save $400</span>
    <span class="sale-price">$1,600</span>
  </div>
</div>`,
        explanation:
          'The earbuds use "50% OFF" because the proportion is impressive while "$10 off" sounds trivial. The TV uses "Save $400" because "$400 saved" sounds substantial while "20% off" sounds modest. This follows the Rule of 100: percentages for items under $100, absolutes for items over $100.',
        principle:
          'Match numerical framing to whichever format---percentage or absolute---creates the more compelling representation of value',
        metrics: {
          before: '3.1% conversion with uniform percentage discounts',
          after: '4.7% conversion with adaptive discount framing',
          improvement: '52% increase in conversion by matching frame to price level',
        },
      },
      {
        title: 'Completion Percentage Progress Ring',
        description:
          'Profile setup using percentage completion to motivate finishing',
        code: `<div class="profile-completion">
  <svg class="progress-ring" viewBox="0 0 120 120" role="progressbar"
       aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
       aria-label="Profile completion: 90%">
    <circle class="ring-bg" cx="60" cy="60" r="52" />
    <circle class="ring-fill" cx="60" cy="60" r="52"
            stroke-dasharray="327" stroke-dashoffset="33" />
    <text x="60" y="60" class="percentage">90%</text>
    <text x="60" y="76" class="label">Complete</text>
  </svg>
  <div class="remaining">
    <p>Just 1 step left to finish your profile!</p>
    <button class="primary">Add profile photo</button>
  </div>
</div>`,
        explanation:
          'Displaying "90% Complete" with a nearly-full ring creates a strong near-completion motivation. The proportion dominance effect makes "90%" feel closer to done than "9 of 10 steps." The visual ring reinforces the ratio by showing how little remains.',
        principle:
          'Percentage-based progress with visual reinforcement maximizes completion motivation through proportion dominance',
        metrics: {
          before: '54% profile completion rate with step-count display ("Step 9 of 10")',
          after: '71% profile completion rate with percentage ring',
          improvement: '31% increase in full profile completion',
        },
      },
      {
        title: 'Donation Match Ratio Display',
        description:
          'Nonprofit donation page using match ratios to amplify perceived impact',
        code: `<div class="donation-match">
  <div class="match-banner">
    <span class="match-ratio">3x</span>
    <span class="match-text">Your Impact</span>
  </div>
  <p class="explanation">
    Every dollar you give is <strong>tripled</strong> by our matching sponsors.
  </p>
  <div class="impact-visual">
    <div class="your-donation">
      <span class="amount">$25</span>
      <span class="label">You give</span>
    </div>
    <span class="arrow">&#8594;</span>
    <div class="total-impact">
      <span class="amount highlighted">$75</span>
      <span class="label">Total impact</span>
    </div>
  </div>
  <p class="ratio-context">
    Your $25 becomes $75 thanks to 200% matching.
  </p>
</div>`,
        explanation:
          'The "3x Your Impact" ratio framing makes the donation feel three times more powerful. The 200% match rate and visual showing $25 becoming $75 leverage proportion dominance to amplify perceived value. Both the ratio and absolute outcome are shown for transparency.',
        principle:
          'Ratio-based impact framing with transparent absolute values maximizes donor motivation ethically',
      },
    ],

    bad: [
      {
        title: 'Misleading Percentage on Tiny Sample',
        description:
          'App store review summary using percentages from a tiny number of reviews',
        code: `<!-- DON'T DO THIS -->
<div class="reviews-summary">
  <div class="rating-bar">
    <span class="stars">5 stars</span>
    <div class="bar"><div class="fill" style="width: 100%"></div></div>
    <span class="percent">100%</span>
  </div>
  <p class="total">Based on user reviews</p>
  <!-- Actually only 2 reviews total -->
</div>`,
        explanation:
          '"100% five-star reviews" sounds overwhelmingly positive, but with only 2 reviews it is statistically meaningless. The proportion dominance effect makes "100%" feel like universal acclaim. Hiding the sample size exploits this bias.',
        principle:
          'Never use impressive percentages from tiny samples without disclosing sample size',
      },
      {
        title: 'Percentage Discounts That Obscure Poor Value',
        description:
          'Showing inflated percentage discounts calculated from artificially high "original" prices',
        code: `<!-- DON'T DO THIS -->
<div class="deal-card">
  <span class="badge">75% OFF!</span>
  <span class="original-price">$80.00</span>
  <span class="sale-price">$20.00</span>
  <!-- The item was never actually sold at $80 -->
</div>`,
        explanation:
          'The "75% OFF" proportion dominates perception, making users feel they are getting extraordinary value. But if $80 was never the real price, the proportion is fabricated. Users anchor to the impressive ratio rather than evaluating the $20 price on its own merits.',
        principle:
          'Fabricated proportions through inflated reference prices are deceptive and erode trust',
      },
      {
        title: 'Hiding Absolute Risk Behind Relative Percentages',
        description:
          'Health app showing relative risk reduction without absolute context',
        code: `<!-- DON'T DO THIS -->
<div class="health-insight">
  <h3>Great news!</h3>
  <p class="stat">
    <span class="big-number">50%</span>
    <span class="label">lower risk</span>
  </p>
  <p>Your exercise routine reduces heart disease risk by 50%!</p>
  <!-- Actual reduction: from 2% to 1% baseline risk -->
</div>`,
        explanation:
          '"50% lower risk" sounds transformative, but the absolute reduction is from 2% to 1%---a 1 percentage point change. Proportion dominance makes the relative reduction feel enormous while the absolute change is modest. Medical and health contexts demand both frames.',
        principle:
          'In health contexts, always present both relative and absolute risk to prevent proportion dominance from distorting medical decisions',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: 'Lightning Deals',
        description: 'Amazon displays "Save 40%" on low-priced items and "Save $150" on high-priced electronics. This adaptive framing leverages proportion dominance by choosing whichever numerical representation feels most compelling for the price range.',
        effectiveness: 'very-effective',
        analysis: 'Amazon applies the Rule of 100 at scale. Percentage framing on sub-$100 items makes savings feel substantial, while absolute framing on premium items makes the dollar value tangible. This dual approach maximizes perceived value across product categories.',
      },
      {
        company: 'LinkedIn',
        product: 'Profile Strength Meter',
        description: 'LinkedIn shows profile completeness as a percentage with labels like "All-Star" at 100%. The percentage-based progress bar leverages proportion dominance to motivate users to add more profile information.',
        effectiveness: 'very-effective',
        analysis: 'The percentage framing makes 70% feel close to done (proportion dominance) while "7 of 10 sections" might feel like there is still a lot left. Combined with aspirational labels, this drives completion rates significantly higher than raw step counts would.',
      },
      {
        company: 'Kickstarter',
        product: 'Funding Progress Bars',
        description: 'Kickstarter prominently displays "245% funded" on successful campaigns. The proportion exceeding 100% creates a powerful social proof signal that leverages proportion dominance to attract additional backers.',
        effectiveness: 'very-effective',
        analysis: 'Showing percentages above 100% exploits proportion dominance by making success feel overwhelming. "245% funded" creates stronger momentum perception than "$245,000 of $100,000 goal" because the ratio signals disproportionate demand.',
      },
      {
        company: 'Duolingo',
        product: 'Daily Goal Progress',
        description: 'Duolingo shows lesson progress as a percentage ring filling up, combined with XP points. The circular progress indicator uses proportion dominance to make 80% completion feel compellingly close to 100%.',
        effectiveness: 'effective',
        analysis: 'The percentage ring leverages proportion dominance visually---the small remaining gap at 80% creates stronger completion urge than "4 of 5 lessons done." The visual proportion reinforces the numerical one.',
      },
    ],

    abTests: [
      {
        title: 'Discount Framing: Percentage vs Absolute on Mid-Range Items',
        hypothesis:
          'Percentage framing will outperform absolute framing for items in the $20-$80 range',
        controlVersion: {
          description:
            'Product cards showing absolute savings: "Save $15" on a $50 item',
          metrics: {
            conversionRate: '3.8%',
            clickThroughRate: '11%',
            perceivedValue: '6.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Product cards showing percentage savings: "30% OFF" on the same $50 item',
          metrics: {
            conversionRate: '5.4%',
            clickThroughRate: '16%',
            perceivedValue: '7.8/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Percentage framing increased conversions by 42% for mid-range items. Users reported feeling they were getting a "better deal" with 30% off, even though $15 savings is identical. The proportion dominated their value assessment.',
          learnings: [
            'Proportion dominance is strongest for items where the percentage sounds large (>20%)',
            'Users rated perceived value 26% higher with percentage framing',
            'Click-through from browse to product detail increased 45% with percentage badges',
            'Effect weakened for items over $100 where absolute savings became more impressive',
          ],
        },
      },
      {
        title: 'Progress Display: Percentage vs Step Count',
        hypothesis:
          'Percentage-based progress display will increase onboarding completion rates',
        controlVersion: {
          description:
            'Onboarding flow showing "Step 7 of 10" with step dots',
          metrics: {
            completionRate: '58%',
            dropOffAtStep7: '23%',
            timeToComplete: '12:30',
          },
        },
        treatmentVersion: {
          description:
            'Onboarding flow showing "70% complete" with a progress bar',
          metrics: {
            completionRate: '72%',
            dropOffAtStep7: '11%',
            timeToComplete: '11:15',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Percentage progress increased completion by 24%. The biggest impact was at the 70-90% range where proportion dominance creates a strong near-completion pull. Drop-off at the equivalent of step 7 was cut in half.',
          learnings: [
            'Proportion dominance creates strongest effect above 60% completion',
            'Users reported feeling "almost done" earlier with percentage framing',
            'Step-count display made remaining work feel more daunting ("3 more steps")',
            'Percentage framing also reduced average completion time by 10%',
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
        name: 'Percentage Badges',
        description:
          'Prominent percentage displays on discounts, savings, or ratings (e.g., "50% OFF", "98% uptime")',
        howToSpot:
          'Look for large percentage numbers in badges, banners, or callout boxes',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Progress Bars and Rings',
        description:
          'Circular or linear progress indicators showing completion as a proportion',
        howToSpot:
          'Check for filled/unfilled bar or ring patterns with percentage labels',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Ratio Comparisons',
        description:
          'Multiplier-based framing like "3x faster", "200% match", or "10x ROI"',
        howToSpot:
          'Look for "X times" or multiplier language used to compare quantities',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Absolute Context',
        description:
          'Percentages displayed without corresponding absolute numbers or sample sizes',
        howToSpot:
          'Check whether percentage claims include denominators, sample sizes, or raw counts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Adaptive Discount Framing',
        description:
          'Different numerical formats (% vs $) used for similar discount types across different price points',
        howToSpot:
          'Compare discount presentation across low-price and high-price items in the same interface',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Percentage-Over-Absolute Pattern',
        description: 'Consistently choosing percentage framing when the proportion is large, even if the absolute value would be more informative',
        indicators: [
          '"50% off" on $10 items instead of "save $5"',
          'Rating displayed as "98%" instead of "49 out of 50"',
          '"90% complete" instead of step counts',
          'Percentage-based KPI dashboards without absolute context',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Completion Proportion Pattern',
        description: 'Progress and completion shown as percentages to leverage near-completion motivation',
        indicators: [
          'Profile completion rings or bars with percentage labels',
          'Course progress displayed as percentage rather than lesson count',
          'Goal progress as "75% of target" rather than absolute values',
          'Filling visual indicators (progress bars, gauges)',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Ratio Amplification Pattern',
        description: 'Using multiplier or ratio framing to make comparisons feel more dramatic',
        indicators: [
          '"3x faster" instead of specific time savings',
          '"200% more storage" instead of absolute GB differences',
          '"Match rate: 300%" instead of dollar-for-dollar description',
          'ROI presented as multiples rather than dollar amounts',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Selective Proportion Display Pattern',
        description: 'Switching between percentage and absolute framing depending on which looks more impressive',
        indicators: [
          'Percentages for low-price discounts, absolute values for high-price discounts',
          'Relative risk reduction without absolute risk context',
          'Percentage growth rates without baseline context',
          'Conversion improvements shown as percentages of small bases',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are discounts displayed as percentages, absolute values, or both?',
      'Is progress shown as a percentage or as a step count?',
      'Do percentage claims include sample sizes or absolute denominators?',
      'Are ratio comparisons (3x, 200%) paired with absolute numbers?',
      'Is the choice of percentage vs absolute framing consistent within the same view?',
      'Could switching between percentage and absolute framing change user perception?',
      'Are there completion indicators using proportion-based visuals (progress bars, rings)?',
      'Do health or financial displays show both relative and absolute numbers?',
      'Are small-sample percentages clearly labeled with sample sizes?',
      'Does the proportional framing serve user understanding or primarily serve conversion goals?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in proportion dominance (also known as ratio bias or denominator neglect).

Analyze the provided design for proportion dominance patterns. Identify:

1. **Percentage Framing**: Where percentages are used instead of absolute values (and vice versa)
2. **Progress Proportions**: How completion, progress, and goals are numerically framed
3. **Discount Ratios**: Whether savings are shown as percentages or absolute amounts, and whether the choice maximizes perceived value
4. **Ratio Comparisons**: Use of multipliers (3x, 200%) vs absolute differences
5. **Missing Context**: Percentages without denominators, sample sizes, or absolute reference

For each pattern found:
- Identify whether the proportional framing helps or misleads users
- Assess whether absolute values would serve users better in specific contexts
- Determine if the framing is ethical and transparent
- Check for the Rule of 100 application (percentages for items under $100, absolutes for items over $100)
- Evaluate whether both frames are available for informed decision-making

Consider:
- Are percentages being used to inflate perceived value deceptively?
- Do progress indicators use proportion framing to motivate or to obscure?
- Are health, financial, or safety contexts providing both relative and absolute numbers?
- Is sample size or denominator context provided alongside percentage claims?
- Would switching frames change user decisions, and is that change beneficial?

Provide actionable recommendations for honest, effective use of proportional framing.`,

    outputSchema: {
      type: 'object',
      properties: {
        proportionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentFraming: { type: 'string' },
              alternativeFraming: { type: 'string' },
              perceptionImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'currentFraming',
              'perceptionImpact',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            proportionClarity: { type: 'number' },
            framingConsistency: { type: 'number' },
            absoluteContextProvided: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'proportionClarity',
            'framingConsistency',
            'absoluteContextProvided',
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
        'proportionPatterns',
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
        title: 'Audit Current Numerical Displays',
        description:
          'Inventory every place your interface shows numbers, percentages, ratios, or proportional indicators',
        example:
          'Map all discount badges, progress bars, success rates, comparison metrics, and KPI displays',
        tips: [
          'Note whether each display uses percentage, absolute, ratio, or mixed framing',
          'Identify the price range or context for each numerical display',
          'Flag any percentages that lack denominator or sample size context',
        ],
      },
      {
        step: 2,
        title: 'Apply the Rule of 100',
        description:
          'For discount and savings displays, use percentage framing for items under $100 and absolute framing for items over $100',
        example:
          '$30 item: show "Save 33%" not "Save $10". $500 item: show "Save $100" not "Save 20%"',
        tips: [
          'This heuristic aligns with how proportion dominance works across price ranges',
          'Test the threshold for your specific market---it may be $50 or $200 depending on audience',
          'When in doubt, show both formats',
        ],
      },
      {
        step: 3,
        title: 'Design Progress as Proportions',
        description:
          'Convert step-based progress indicators to percentage-based displays',
        example:
          'Replace "Step 4 of 5" with "80% complete" and a progress bar',
        tips: [
          'The proportional display is most motivating above 60% completion',
          'Use visual progress (bars, rings) to reinforce the numerical proportion',
          'Consider showing both percentage and steps for accessibility',
        ],
      },
      {
        step: 4,
        title: 'Add Absolute Context to Percentages',
        description:
          'Wherever you display a percentage, ensure the absolute values are accessible',
        example:
          '"98% uptime (approximately 7 hours downtime per year)" or "95% satisfaction (from 2,400 responses)"',
        tips: [
          'The absolute context can be secondary (smaller text, tooltip, expandable)',
          'For critical domains (health, finance), absolute context must be equally prominent',
          'Always include sample sizes for survey or rating percentages',
        ],
      },
      {
        step: 5,
        title: 'Test Both Frames',
        description:
          'A/B test percentage vs absolute framing to measure actual user behavior differences',
        example:
          'Test "Save 30%" vs "Save $15" on a $50 product and measure conversion',
        tips: [
          'Track not just conversion but also perceived value and trust metrics',
          'Test across different price points to find your framing threshold',
          'Check whether users feel manipulated by either framing',
        ],
      },
    ],

    dos: [
      'Use percentage framing for small-value savings where the proportion is impressive',
      'Use absolute framing for large-value savings where the dollar amount is impressive',
      'Show completion progress as percentages with visual reinforcement (bars, rings)',
      'Include sample sizes and denominators alongside percentage claims',
      'Present both relative and absolute numbers in health and financial contexts',
      'Use consistent numerical framing within the same comparison view',
      'Apply the Rule of 100 as a starting heuristic for discount framing',
      'Test proportional framing with your actual user segments',
    ],

    donts: [
      'Don\'t use percentages from tiny sample sizes without disclosure',
      'Don\'t show only relative risk reduction in health contexts---always include absolute risk',
      'Don\'t inflate proportions by choosing artificial or fabricated denominators',
      'Don\'t mix percentage and absolute framing inconsistently in the same comparison',
      'Don\'t use proportion framing to disguise poor value (e.g., "75% off" a never-real price)',
      'Don\'t hide absolute context that would change user decisions',
      'Don\'t rely solely on percentage-based progress for accessibility---provide text alternatives',
      'Don\'t use ratio amplification ("10x faster") without absolute benchmarks',
    ],

    bestPractices: [
      {
        title: 'The Rule of 100',
        description:
          'For items priced under $100, use percentage discounts. For items over $100, use absolute dollar savings.',
        rationale:
          'Proportion dominance makes percentages feel larger for low-price items, while absolute values feel larger for high-price items',
        example:
          '$30 item: "Save 33%" (not "Save $10"). $500 item: "Save $100" (not "Save 20%")',
      },
      {
        title: 'Dual-Frame Transparency',
        description:
          'In critical contexts (health, finance, safety), always present both percentage and absolute values side by side',
        rationale:
          'Users deserve to evaluate information in both frames to make truly informed decisions',
        example:
          '"This treatment reduces risk by 50% (from 2 in 100 to 1 in 100 patients)"',
      },
      {
        title: 'Near-Completion Proportion Pull',
        description:
          'Use percentage-based progress displays especially when users are above 60% completion',
        rationale:
          'Proportion dominance creates strongest motivation when the "remaining gap" appears small relative to the total',
        example:
          'Show "85% complete---just add a profile photo to finish!" with a nearly-full progress ring',
      },
      {
        title: 'Honest Ratio Comparisons',
        description:
          'When using multiplier framing (3x, 200%), always provide the absolute baseline for context',
        rationale:
          'Ratios without baselines can be misleading: "3x faster" could mean 3 seconds vs 1 second or 3 hours vs 1 hour',
        example:
          '"3x faster page loads (1.2s vs industry average 3.6s)"',
      },
      {
        title: 'Sample Size Disclosure',
        description:
          'Always show the denominator or sample size alongside percentage-based claims',
        rationale:
          '"100% satisfaction" from 3 users and from 3,000 users are fundamentally different claims',
        example:
          '"4.9 out of 5 stars (from 12,847 reviews)" rather than just "98% positive"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Progress bar proportions must have programmatic equivalents',
        implementation:
          'Use role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax. Include a text alternative stating both percentage and absolute values.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t convey proportion information through color alone',
        implementation:
          'Progress bars and completion indicators must include text labels (percentage or step count) alongside color fills.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for visual proportion indicators',
        implementation:
          'Charts, gauges, and rings showing proportions must have descriptive alt text or aria-labels conveying the exact proportion and absolute values.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Clarify what proportions represent',
        implementation:
          'When showing percentages, provide context labels explaining what 100% represents (e.g., "90% of your 10GB storage used").',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated Reference Proportions',
        severity: 'critical',
        explanation:
          'Calculating percentage discounts from artificially inflated "original" prices to create impressive proportions',
        mitigation:
          'Only calculate percentages from genuine, documented original prices. Comply with advertising standards requiring prices to have been offered for a substantial period.',
      },
      {
        concern: 'Medical Risk Distortion',
        severity: 'critical',
        explanation:
          'Presenting only relative risk reduction (e.g., "50% lower risk") without absolute context, which can dramatically distort medical decisions',
        mitigation:
          'Always present both relative and absolute risk in health contexts. Use natural frequencies ("1 in 100") alongside percentages.',
      },
      {
        concern: 'Small-Sample Percentage Inflation',
        severity: 'high',
        explanation:
          'Using impressive percentages from tiny samples (e.g., "100% of users recommend us" from 4 reviews)',
        mitigation:
          'Always disclose sample sizes. Consider minimum thresholds before displaying percentage-based claims.',
      },
      {
        concern: 'Selective Frame Switching',
        severity: 'high',
        explanation:
          'Strategically choosing percentage or absolute framing depending on which hides unfavorable information',
        mitigation:
          'Establish consistent framing rules applied uniformly. Provide both frames for informed comparison.',
      },
      {
        concern: 'Progress Proportion Manipulation',
        severity: 'medium',
        explanation:
          'Inflating completion percentages by counting trivial steps (e.g., agreeing to terms = 20% complete) to create false momentum',
        mitigation:
          'Weight progress proportions by effort or value, not by step count. Be transparent about what each proportion segment represents.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Affect Heuristic in Judgments of Risks and Benefits',
        author: 'Slovic, P., Finucane, M. L., Peters, E., & MacGregor, D. G.',
        year: 2002,
        doi: '10.1017/S1930297500005952',
        description:
          'Key paper on how affective responses to proportions and ratios drive risk judgments, foundational to understanding proportion dominance',
        type: 'foundational',
      },
      {
        title: 'Proportion Dominance and Generosity',
        author: 'Bartels, D. M.',
        year: 2006,
        doi: '10.1016/j.joep.2005.08.004',
        description:
          'Demonstrates how people are more generous when outcomes are framed as proportions rather than absolute amounts',
        type: 'foundational',
      },
      {
        title: 'Ratio Bias in the Real World: How Numeracy and Probability Format Affect Lottery Choices',
        author: 'Bonner, C., & Newell, B. R.',
        year: 2008,
        doi: '10.1016/j.jbdm.2007.09.002',
        description:
          'Demonstrates proportion dominance in real-world lottery choices and the role of numeracy in moderating the effect',
        type: 'advanced',
      },
      {
        title: 'When More of a Good Thing Is Bad: How Extra Information Can Reduce the Attractiveness of Ratios',
        author: 'Hsee, C. K., & Zhang, J.',
        year: 2010,
        description:
          'Explores evaluability theory and how proportion-based framing interacts with information quantity',
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
          'Covers denominator neglect and proportion processing as key features of System 1 thinking',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Practical examples of how relative and proportional thinking drives consumer decisions',
        type: 'practical',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'The contrast principle chapter directly relates to proportion-based value perception',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Rule of 100: Should You Use Percentage or Dollar Discounts?',
        author: 'Jonah Berger',
        url: 'https://jonahberger.com/the-rule-of-100/',
        description:
          'Practical application of proportion dominance to discount framing, with the Rule of 100 heuristic',
        type: 'practical',
      },
      {
        title: 'How Number Format Affects Decision Making',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/number-format/',
        description:
          'UX research on how numerical format (percentages vs absolutes) affects user comprehension and decisions',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We Misjudge Probabilities',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=R13BD8qKeTg',
        description:
          'Visual explanation of ratio bias and denominator neglect with compelling demonstrations',
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
      'anchoring-bias', // Proportions can serve as numerical anchors
      'framing-effect', // Proportion vs absolute is a framing choice
      'loss-aversion', // "Lose 50% of savings" leverages both proportion dominance and loss aversion
      'decoy-effect', // Decoy proportions make target options look better
    ],

    conflicts: [
      'base-rate-neglect', // Understanding base rates counters proportion dominance
      'information-bias', // More numerical context can weaken proportional framing
    ],

    confusedWith: [
      'framing-effect', // Proportion dominance is a specific type of framing effect
      'anchoring-bias', // Both involve numerical reference points but through different mechanisms
      'denominator-neglect', // Closely related---denominator neglect is a mechanism underlying proportion dominance
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'ratio-bias',
        'denominator-neglect',
      ],
    },
  },
};
