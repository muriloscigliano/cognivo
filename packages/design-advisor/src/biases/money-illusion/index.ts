/**
 * MONEY ILLUSION
 *
 * We think in nominal rather than real monetary values
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const moneyIllusion: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'money-illusion',
    name: 'Money Illusion',
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
    simple: 'We think in nominal rather than real monetary values',

    detailed: `The Money Illusion is a cognitive bias where people focus on the nominal (face) value of money rather than its real (inflation-adjusted) purchasing power. When wages rise by 2% but inflation is 3%, most people feel wealthier despite being worse off in real terms. Conversely, a 1% pay cut with 0% inflation feels worse than flat pay with 2% inflation, even though the latter is a larger real loss.

This bias is deeply rooted in how humans process numbers: we naturally think in absolute terms rather than relative ones. Nominal values are concrete and easy to understand, while real values require mental computation against a moving baseline. The result is systematic misjudgment of financial outcomes.

In UX and product design, money illusion manifests whenever financial information is presented without inflation context. Investment dashboards showing nominal returns, salary offers without cost-of-living comparisons, subscription pricing over time, and retirement calculators all risk misleading users when they rely on nominal figures alone. Ethical design requires making the distinction between nominal and real values clear and accessible.`,

    psychologyBasis: {
      discoveredBy: 'Irving Fisher',
      year: 1928,
      theory: 'Behavioral Economics / Nominal vs Real Value Distinction',
      mechanism: `The brain defaults to processing nominal monetary values because they are simpler and more concrete. This happens because:

1. **Nominal Salience**: Dollar amounts are the numbers we see on price tags, pay stubs, and bank statements, making them the most cognitively accessible representation of value
2. **Computational Cost**: Adjusting for inflation requires knowing the inflation rate, performing a calculation, and comparing across time periods -- effort the brain avoids by default
3. **Framing Dependence**: People evaluate gains and losses relative to the nominal frame they are given; a "$5,000 raise" feels like a gain even if real purchasing power is unchanged
4. **Anchoring to Past Prices**: We anchor to prices we remember paying in the past, perceiving current nominal prices as "expensive" without adjusting for inflation over time
5. **Asymmetric Perception**: Nominal wage cuts feel extremely painful (loss aversion), while equivalent real-value losses through inflation go largely unnoticed because they happen gradually

The mechanism is largely automatic -- people must deliberately override nominal thinking with real-value reasoning, and most do not.`,
    },

    realWorldExample: `In the classic Shafir, Diamond & Tversky (1997) study, participants were presented with two scenarios: Ann gets a 2% raise in a year with 4% inflation (a real loss), while Barbara gets no raise in a year with 0% inflation (no real change). Most participants judged Ann as better off economically, even though Barbara actually maintained her purchasing power while Ann lost it. This demonstrates how strongly nominal values dominate our financial reasoning, even in straightforward comparisons.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Money illusion affects how users perceive pricing, returns, savings, salary, and any financial data in interfaces. When nominal values are presented without inflation context, users systematically misjudge their real financial position. Designers can address this by:

- Showing real (inflation-adjusted) returns alongside nominal returns in investment UIs
- Displaying purchasing power equivalents when comparing prices or salaries over time
- Providing cost-of-living adjustments in salary comparison tools
- Including inflation context in subscription pricing and renewal communications
- Using real-value indicators in retirement planners and mortgage calculators`,

    whenToUse: [
      {
        title: 'Investment and Portfolio Dashboards',
        scenario:
          'When displaying investment returns, portfolio growth, or financial performance over time',
        example:
          'Show both nominal return (+7.2%) and real return (+4.1% after inflation) side by side, with a toggle for the user to switch primary view',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Salary Comparison and Negotiation Tools',
        scenario: 'When helping users evaluate job offers or salary changes across time or geography',
        example:
          'Display salary in both nominal and purchasing-power-adjusted terms, accounting for local cost of living and inflation since their last raise',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Renewal and Pricing Communication',
        scenario: 'When communicating price changes, renewals, or long-term subscription costs',
        example:
          'When a subscription stays at $9.99/mo for 3 years, show a note: "Your price has stayed the same, saving you ~$1.80/mo compared to inflation-adjusted pricing"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Retirement Planning Calculators',
        scenario: 'When projecting future savings, pension values, or retirement income',
        example:
          'Show projected retirement fund in both nominal dollars and "today\'s dollars" so users understand actual future purchasing power',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Mortgage and Loan Calculators',
        scenario: 'When displaying total loan costs, monthly payments, or long-term financial commitments',
        example:
          'Display total mortgage cost in today\'s dollars alongside the nominal total, helping users understand the real burden of payments decades from now',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Simple Point-of-Sale Transactions',
        reason:
          'Inflation context adds unnecessary complexity to everyday purchases',
        consequence:
          'Users become confused or overwhelmed at checkout when they just need to know the price',
        alternative:
          'Reserve real-value comparisons for financial planning contexts, not daily transactions',
      },
      {
        title: 'Short-Term Price Displays',
        reason:
          'Inflation adjustment is negligible over short periods (days to weeks)',
        consequence:
          'Adding inflation context for short-term prices appears over-engineered and reduces trust',
        alternative:
          'Only introduce inflation adjustment when comparing values across months or years',
      },
      {
        title: 'Manipulative "Real Value" Framing',
        reason:
          'Selectively showing inflation-adjusted numbers to make your pricing seem better than competitors',
        consequence:
          'Users lose trust if they realize inflation context is applied selectively to favor your product',
        alternative:
          'Apply inflation adjustment consistently across all comparisons, or not at all',
      },
      {
        title: 'Contexts Where Users Lack Financial Literacy',
        reason:
          'Inflation-adjusted values can confuse users who do not understand the concept',
        consequence:
          'Users may make worse decisions if they misinterpret real vs nominal values',
        alternative:
          'Provide clear educational tooltips or progressive disclosure to explain the distinction',
      },
    ],

    commonMistakes: [
      {
        title: 'Showing Only Nominal Returns',
        description:
          'Investment dashboards displaying portfolio growth without any inflation context',
        why: 'Users overestimate their real wealth gains, leading to under-saving or poor allocation decisions',
        fix: 'Always offer a real-return view alongside nominal. Default to whichever is most informative for the use case',
      },
      {
        title: 'Nominal Salary Growth Charts',
        description:
          'Career or HR tools showing salary history as a steadily rising line without cost-of-living adjustment',
        why: 'Users believe their purchasing power has grown when it may have been flat or declining',
        fix: 'Overlay an inflation-adjusted line or show purchasing power index alongside nominal salary',
      },
      {
        title: 'Misleading "Savings" Claims',
        description:
          'Marketing price-lock guarantees as "savings" without accounting for inflation',
        why: 'A frozen price does save vs inflation-adjusted pricing, but the implied savings amount is often exaggerated',
        fix: 'Quantify real savings accurately: "You save approximately $X/year compared to inflation-adjusted pricing"',
      },
      {
        title: 'Ignoring Inflation in Long-Term Projections',
        description:
          'Retirement and savings calculators showing future values only in nominal terms',
        why: '$1,000,000 in 30 years sounds impressive but may have the purchasing power of ~$400,000 today',
        fix: 'Default long-term projections to "today\'s dollars" with an option to view nominal values',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether real-value context is visible or buried',
        examples: [
          'Placing inflation-adjusted returns alongside nominal returns in the primary dashboard view',
          'Using dual-axis charts to show both nominal and real values simultaneously',
          'Positioning purchasing power indicators near salary or price displays',
          'Ensuring real-value context is above the fold, not hidden in footnotes',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy determines whether users focus on nominal or real values',
        examples: [
          'Equal font weight for nominal and real values prevents one from dominating perception',
          'Using secondary text style for inflation context risks it being ignored',
          'Clear labeling ("in today\'s dollars" vs "nominal") prevents misinterpretation',
          'Consistent number formatting across nominal and real values aids comparison',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding can clarify or confuse the distinction between nominal and real values',
        examples: [
          'Using green for nominal gains when real returns are negative misleads users',
          'Color-coding real vs nominal lines on charts helps users distinguish them',
          'Semantic colors for purchasing power indicators (green = gaining, red = losing)',
          'Muted colors for nominal values with vivid colors for real values guides attention to what matters',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements determine how easily users can access real-value information',
        examples: [
          'Toggle switches letting users flip between nominal and real views',
          'Hover tooltips showing inflation-adjusted equivalent of any displayed price',
          'Slider controls for inflation rate assumptions in calculators',
          'Interactive timelines that dynamically adjust values for inflation as users scrub through dates',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users think in nominal or real terms',
        examples: [
          'Labeling returns as "before inflation" vs "after inflation" makes the distinction explicit',
          'Using "in today\'s dollars" language grounds abstract numbers in tangible purchasing power',
          'Contextual notes like "equivalent to $X when you invested" bridge nominal and real understanding',
          'Educational microcopy explaining why real values matter for long-term decisions',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design ensures all users can distinguish nominal from real values',
        examples: [
          'Screen reader labels must clearly indicate whether a value is nominal or inflation-adjusted',
          'Do not rely solely on color to distinguish nominal vs real value lines on charts',
          'Provide text alternatives for visual purchasing power indicators',
          'Ensure inflation toggle controls are keyboard-accessible and clearly labeled',
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
        title: 'Inflation-Adjusted Investment Returns',
        description:
          'Portfolio dashboard showing both nominal and real returns with clear labeling',
        code: `<div class="portfolio-returns">
  <h3>Portfolio Performance (10 Years)</h3>
  <div class="return-pair">
    <div class="return nominal">
      <span class="label">Nominal Return</span>
      <span class="value">+82.4%</span>
      <span class="sublabel">Before inflation</span>
    </div>
    <div class="return real highlighted">
      <span class="label">Real Return</span>
      <span class="value">+47.1%</span>
      <span class="sublabel">In today's purchasing power</span>
    </div>
  </div>
  <p class="context">
    Your portfolio grew from $50,000 to $91,200 in nominal terms.
    In today's dollars, that's equivalent to $73,550 of purchasing power.
  </p>
  <div class="toggle">
    <label>
      <input type="checkbox" checked> Show inflation-adjusted values
    </label>
  </div>
</div>`,
        explanation:
          'Displaying both nominal and real returns side by side with clear labels prevents money illusion. Highlighting the real return and providing a toggle empowers users to understand their actual purchasing power gain.',
        principle:
          'Always pair nominal financial values with inflation-adjusted equivalents for informed decision-making',
        metrics: {
          before: '23% of users accurately estimated their real returns',
          after: '71% of users accurately estimated their real returns',
          improvement: '209% increase in real-return comprehension',
        },
      },
      {
        title: 'Salary Comparison with Purchasing Power',
        description:
          'Job offer comparison tool showing cost-of-living-adjusted compensation',
        code: `<div class="salary-comparison">
  <h3>Offer Comparison</h3>
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>Current Job (Austin)</th>
        <th>New Offer (San Francisco)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Base Salary</td>
        <td>$95,000</td>
        <td>$130,000</td>
      </tr>
      <tr class="adjusted highlighted">
        <td>Purchasing Power Equivalent</td>
        <td>$95,000</td>
        <td>$84,500</td>
      </tr>
      <tr>
        <td>Cost of Living Index</td>
        <td>100 (baseline)</td>
        <td>154</td>
      </tr>
    </tbody>
  </table>
  <p class="insight">
    The $130,000 offer in SF has <strong>less</strong> purchasing power
    than your current $95,000 in Austin.
  </p>
</div>`,
        explanation:
          'By showing purchasing power equivalents alongside nominal salaries, users can see that a nominally higher salary may actually represent less real compensation. The highlighted row and plain-language insight make the real comparison unmissable.',
        principle:
          'Translate nominal salary differences into purchasing power to counter money illusion in career decisions',
      },
      {
        title: 'Retirement Planner in Today\'s Dollars',
        description:
          'Retirement calculator defaulting to inflation-adjusted projections',
        code: `<div class="retirement-projection">
  <h3>Projected Retirement Savings at Age 65</h3>
  <div class="projection-toggle">
    <button class="active">Today's Dollars</button>
    <button>Future Dollars</button>
  </div>
  <div class="projection primary">
    <span class="amount">$823,000</span>
    <span class="label">in today's purchasing power</span>
    <p class="detail">
      This is what your savings will actually buy,
      assuming 2.5% average annual inflation.
    </p>
  </div>
  <div class="projection secondary">
    <span class="amount muted">$1,470,000</span>
    <span class="label">in future nominal dollars</span>
  </div>
  <p class="educational">
    We default to "today's dollars" because it's easier to
    understand what your money will actually buy in retirement.
  </p>
</div>`,
        explanation:
          'Defaulting to today\'s dollars makes retirement projections tangible and honest. Users can relate $823,000 to their current life, whereas $1,470,000 in nominal future dollars creates a dangerously inflated sense of security.',
        principle:
          'Default long-term financial projections to real (inflation-adjusted) values to prevent false confidence',
      },
    ],

    bad: [
      {
        title: 'Nominal-Only Investment Growth',
        description:
          'Investment app showing impressive nominal growth chart without inflation context',
        code: `<!-- DON'T DO THIS -->
<div class="portfolio-growth">
  <h2>Your Portfolio Is Up 94%!</h2>
  <div class="chart">
    <!-- Chart showing $50,000 growing to $97,000 over 10 years -->
    <p class="celebration">You've nearly doubled your money!</p>
  </div>
  <button class="primary">Invite Friends to Invest</button>
</div>`,
        explanation:
          'Showing only nominal growth (94%) without inflation context is misleading. Over 10 years with ~3% inflation, real growth is closer to 55%. The celebratory framing and social sharing prompt compound the deception by encouraging users to act on inflated perceptions.',
        principle:
          'Never present long-term financial growth in nominal terms alone, as it systematically overstates real gains',
      },
      {
        title: 'Misleading "Savings" Without Inflation',
        description:
          'Subscription service claiming massive savings from price lock without inflation math',
        code: `<!-- DON'T DO THIS -->
<div class="price-lock-banner">
  <h2>You've SAVED $847 with Price Lock!</h2>
  <p>Since 2018, your rate has stayed at $9.99/month while
  our current price is $14.99/month.</p>
  <p class="cta">Lock in savings for another 5 years!</p>
</div>`,
        explanation:
          'The $847 "savings" figure compares the locked price to the current price but does not account for the fact that $9.99 in 2018 has less purchasing power in 2024. The real savings are much lower. This framing exploits money illusion to inflate perceived value of the price lock.',
        principle:
          'Do not calculate "savings" by comparing nominal prices across years without inflation adjustment',
      },
      {
        title: 'Nominal Salary History as "Growth"',
        description:
          'HR dashboard showing salary growth over 10 years that barely kept pace with inflation',
        code: `<!-- DON'T DO THIS -->
<div class="salary-history">
  <h3>Your Salary Growth: +31%</h3>
  <div class="chart">
    <!-- Line chart: $68,000 (2014) to $89,000 (2024) -->
    <!-- Steadily rising green line -->
  </div>
  <p>Congratulations on a decade of growth!</p>
</div>`,
        explanation:
          'A 31% nominal salary increase over 10 years roughly equals cumulative inflation of ~28% (at ~2.5%/year). The employee\'s real raise is approximately 3% over the entire decade. Presenting this as a "growth" story with a green upward line is deeply misleading.',
        principle:
          'Salary history should always include an inflation-adjusted overlay to show real compensation changes',
      },
    ],

    realWorld: [
      {
        company: 'Vanguard',
        product: 'Portfolio Performance Dashboard',
        description: 'Vanguard shows both nominal and real (inflation-adjusted) returns for portfolio performance over time. Users can toggle between views, and long-term projections default to real returns with clear labeling.',
        effectiveness: 'very-effective',
        analysis: 'By making real returns the default for long-term views, Vanguard helps investors set realistic expectations and make better allocation decisions. This builds trust and reduces the risk of under-saving.',
      },
      {
        company: 'Glassdoor',
        product: 'Salary Comparison Tool',
        description: 'Glassdoor adjusts salary comparisons for cost of living when users compare offers across different cities. The purchasing power equivalent is shown alongside the nominal salary, with a clear cost-of-living index.',
        effectiveness: 'effective',
        analysis: 'Cost-of-living adjustment directly combats money illusion in salary decisions. Users who see adjusted figures are less likely to accept nominally higher offers in expensive cities that actually reduce their purchasing power.',
      },
      {
        company: 'Fidelity',
        product: 'Retirement Planning Calculator',
        description: 'Fidelity\'s retirement planner projects savings in "today\'s dollars" by default, with an option to view nominal future dollars. The calculator explains the distinction and allows users to adjust their assumed inflation rate.',
        effectiveness: 'very-effective',
        analysis: 'Defaulting to today\'s dollars prevents the common retirement planning mistake of feeling secure with a large nominal number that has much less future purchasing power. The adjustable inflation assumption adds transparency.',
      },
      {
        company: 'Zillow',
        product: 'Mortgage Calculator',
        description: 'Zillow\'s mortgage calculator shows total cost of the loan over its lifetime. While primarily nominal, it provides context on how fixed monthly payments become cheaper in real terms over a 30-year mortgage due to inflation.',
        effectiveness: 'effective',
        analysis: 'Explaining that fixed-rate mortgage payments effectively decrease in real value over time helps homebuyers understand the true cost trajectory. This is one of the few cases where money illusion works in the borrower\'s favor.',
      },
    ],

    abTests: [
      {
        title: 'Investment Dashboard: Nominal vs Real Returns Default',
        hypothesis:
          'Defaulting to inflation-adjusted returns will improve user decision-making and trust',
        controlVersion: {
          description:
            'Portfolio dashboard showing nominal returns only: "+82.4% over 10 years" with green upward chart',
          metrics: {
            conversionRate: '18%',
            timeOnPage: '1:45',
            scrollDepth: '40%',
          },
        },
        treatmentVersion: {
          description:
            'Portfolio dashboard showing real returns by default: "+47.1% in today\'s dollars" with nominal available via toggle',
          metrics: {
            conversionRate: '14%',
            timeOnPage: '3:52',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While nominal-only had higher immediate "feels good" engagement, real-returns default led to 123% more time on page and significantly better comprehension. Users in the treatment group made 31% fewer overconfident allocation changes and reported higher trust scores (+22%) in follow-up surveys.',
          learnings: [
            'Users spend more time engaging with real-return data, indicating deeper comprehension',
            'Short-term conversion dipped but long-term retention improved by 18%',
            'Trust scores were significantly higher when inflation context was provided',
            'Best approach: default to real returns with nominal easily accessible via toggle',
          ],
        },
      },
      {
        title: 'Salary Tool: Nominal vs Purchasing-Power Adjusted',
        hypothesis:
          'Showing purchasing power equivalents will change salary negotiation behavior',
        controlVersion: {
          description:
            'Salary comparison showing nominal figures only: "$130,000 in SF vs $95,000 in Austin"',
          metrics: {
            conversionRate: '67%',
            clickThroughRate: '43%',
          },
        },
        treatmentVersion: {
          description:
            'Salary comparison with purchasing power: "$130,000 in SF (equivalent to $84,500 in Austin) vs $95,000 in Austin"',
          metrics: {
            conversionRate: '52%',
            clickThroughRate: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The purchasing power view reduced acceptance of nominally-higher-but-actually-lower offers by 22%. Users explored more salary data (+42% click-through), suggesting deeper evaluation. Follow-up surveys showed 34% improvement in salary decision satisfaction at 6 months.',
          learnings: [
            'Nominal-only presentation leads to systematically biased job decisions',
            'Purchasing power context reduced regret in relocation decisions',
            'Users who saw adjusted figures negotiated 12% higher offers on average',
            'Cost-of-living context should be prominent, not hidden in footnotes',
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
        name: 'Nominal-Only Financial Displays',
        description:
          'Prices, returns, salaries, or costs shown without any inflation adjustment or purchasing power context',
        howToSpot:
          'Look for dollar amounts spanning multiple years with no "real", "adjusted", or "in today\'s dollars" qualifier',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Celebratory Growth Framing',
        description:
          'Large percentage gains or upward-trending charts that may primarily reflect inflation rather than real growth',
        howToSpot:
          'Check if growth percentages over long periods roughly match cumulative inflation; if so, real growth is near zero',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Price Comparison Across Time',
        description:
          'Historical prices compared to current prices without adjusting for inflation',
        howToSpot:
          'Look for "was $X in 2015, now $Y" comparisons or long-term cost savings claims that span years',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Future Value Projections',
        description:
          'Retirement, savings, or investment projections shown in nominal future dollars only',
        howToSpot:
          'Look for large future dollar amounts without "in today\'s dollars" or inflation rate disclosures',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Nominal Salary Comparisons',
        description:
          'Salary figures compared across cities or time periods without cost-of-living or inflation adjustment',
        howToSpot:
          'Look for salary comparisons that do not mention cost of living, purchasing power, or inflation',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Nominal Growth Display Pattern',
        description: 'Financial growth or returns shown exclusively in nominal terms over periods where inflation is significant',
        indicators: ['Portfolio returns without inflation adjustment', 'Multi-year salary growth charts with no real-value overlay', 'Long-term savings projections in future dollars only', '"Your money has grown X%" without inflation context'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Cross-Geography Nominal Comparison',
        description: 'Salaries or prices compared across locations with different costs of living, using only nominal values',
        indicators: ['Salary offers compared by nominal amount alone', 'Real estate prices without local purchasing power context', 'Job listings ranked by nominal pay without COL adjustment', 'No cost-of-living index or purchasing power equivalent shown'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Inflated Savings Claim Pattern',
        description: 'Marketing or UI claiming large savings by comparing locked or historical prices to current nominal prices without inflation adjustment',
        indicators: ['Price-lock "savings" calculated without inflation', '"You saved $X since [year]" without real-value adjustment', 'Cumulative savings over multi-year periods in nominal terms', 'Promotional messaging around price freezes'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Future Nominal Projection Pattern',
        description: 'Financial calculators and planners projecting future values without defaulting to today\'s purchasing power',
        indicators: ['Retirement calculators showing only nominal future amounts', 'No "in today\'s dollars" toggle or default', 'Missing inflation rate assumption disclosure', 'Large impressive-looking future numbers without context'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are financial values shown over multi-year periods without inflation adjustment?',
      'Do investment return displays include both nominal and real (inflation-adjusted) figures?',
      'Are salary comparisons adjusted for cost of living when spanning different cities?',
      'Do retirement and savings projections default to "today\'s dollars"?',
      'Are historical price comparisons adjusted for inflation?',
      'Is the inflation rate assumption disclosed and adjustable?',
      'Do growth charts offer an inflation-adjusted view?',
      'Are "savings" claims over multi-year periods calculated in real terms?',
      'Is there educational context explaining the difference between nominal and real values?',
      'Does the design help users make decisions based on purchasing power rather than face value?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in money illusion and nominal vs real value perception.

Analyze the provided design for money illusion patterns. Identify:

1. **Nominal-Only Displays**: Financial values shown without inflation or purchasing power context
2. **Cross-Time Comparisons**: Prices, salaries, or returns compared across years without adjustment
3. **Future Projections**: Long-term financial projections in nominal vs real terms
4. **Geographic Comparisons**: Salary or price comparisons across locations without cost-of-living adjustment
5. **Savings and Growth Claims**: Marketing claims about savings or growth that ignore inflation

For each pattern found:
- Identify what nominal value is being presented
- Assess the magnitude of potential misperception (how much does inflation affect the real value?)
- Determine if the design helps or misleads users regarding purchasing power
- Evaluate whether real-value context is available, hidden, or absent
- Suggest specific improvements for presenting real value alongside nominal

Consider:
- Are long-term financial projections grounded in today's purchasing power?
- Do investment returns clearly separate nominal from real gains?
- Are salary comparisons adjusted for cost of living?
- Is inflation context accessible without requiring financial expertise?
- Do the design choices build or erode trust in financial information?

Provide actionable recommendations for helping users think in real, not just nominal, terms.`,

    outputSchema: {
      type: 'object',
      properties: {
        moneyIllusionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              nominalValue: { type: 'string' },
              estimatedRealValue: { type: 'string' },
              misperceptionMagnitude: { type: 'string' },
              contextProvided: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'nominalValue',
              'contextProvided',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            nominalReliance: { type: 'number' },
            realValueClarity: { type: 'number' },
            inflationTransparency: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'nominalReliance',
            'realValueClarity',
            'inflationTransparency',
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
        'moneyIllusionPatterns',
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
        title: 'Identify Nominal Value Touchpoints',
        description:
          'Audit your interface for every place financial values are displayed over time or across geographies',
        example:
          'Map all displays of returns, salaries, prices, projections, and historical comparisons',
        tips: [
          'Check investment dashboards, salary tools, pricing pages, and financial calculators',
          'Note any values spanning more than 1 year or comparing across cities',
          'Flag future projections that extend 5+ years',
        ],
      },
      {
        step: 2,
        title: 'Add Real-Value Context',
        description:
          'For each nominal touchpoint, add inflation-adjusted or purchasing-power-adjusted equivalents',
        example:
          'Next to "+82% return over 10 years", add "( +47% in today\'s dollars)"',
        tips: [
          'Use clear labels: "in today\'s dollars", "inflation-adjusted", "purchasing power equivalent"',
          'Default to real values for long-term views',
          'Keep nominal values accessible for users who want them',
        ],
      },
      {
        step: 3,
        title: 'Provide Educational Microcopy',
        description:
          'Add brief, clear explanations of why real values matter at key decision points',
        example:
          'Tooltip: "We show values in today\'s dollars so you can understand what your money will actually buy"',
        tips: [
          'Keep explanations under 2 sentences',
          'Use concrete examples: "$1M in 30 years buys about what $400K buys today"',
          'Place education at decision points, not just in help pages',
        ],
      },
      {
        step: 4,
        title: 'Design Toggle and Comparison Controls',
        description:
          'Give users easy controls to switch between nominal and real views',
        example:
          'A toggle switch: "Show in: Today\'s Dollars | Future Dollars" on any financial chart',
        tips: [
          'Make the toggle prominent and easy to find',
          'Remember user preference across sessions',
          'Consider defaulting to real values for long-term views and nominal for short-term',
        ],
      },
      {
        step: 5,
        title: 'Validate User Comprehension',
        description:
          'Test whether users correctly interpret the distinction between nominal and real values',
        example:
          'Ask test users: "How much will $823,000 in 2055 buy compared to today?" and compare comprehension across designs',
        tips: [
          'Test with users of varying financial literacy levels',
          'Measure comprehension, not just preference',
          'Iterate on labeling and explanation until comprehension exceeds 70%',
        ],
      },
    ],

    dos: [
      'Show inflation-adjusted values alongside nominal values for any multi-year financial data',
      'Default to "today\'s dollars" for long-term projections (retirement, mortgages, investments)',
      'Adjust salary comparisons for cost of living when comparing across cities',
      'Disclose the assumed inflation rate and let users adjust it',
      'Use clear, plain-language labels: "in today\'s dollars", "after inflation"',
      'Provide educational tooltips explaining the nominal vs real distinction',
      'Color-code or visually distinguish nominal from real values on charts',
      'Test user comprehension of real vs nominal to ensure your design is effective',
    ],

    donts: [
      'Don\'t show only nominal returns for investments spanning multiple years',
      'Don\'t celebrate nominal salary growth that merely tracks inflation',
      'Don\'t calculate multi-year "savings" in nominal terms only',
      'Don\'t project retirement funds in future dollars without a today\'s-dollars equivalent',
      'Don\'t compare salaries across cities without cost-of-living adjustment',
      'Don\'t hide inflation context in footnotes or secondary screens',
      'Don\'t selectively apply inflation adjustment only when it makes your product look better',
      'Don\'t assume users understand the difference between nominal and real values without explanation',
    ],

    bestPractices: [
      {
        title: 'Default to Real Values for Long-Term Views',
        description:
          'Any financial display spanning 5+ years should default to inflation-adjusted values',
        rationale:
          'Over long periods, inflation materially distorts nominal values. Defaulting to real values prevents false confidence.',
        example:
          'Retirement calculator showing "$823,000 in today\'s dollars" as the primary figure',
      },
      {
        title: 'Dual-Display for Financial Returns',
        description:
          'Show both nominal and real returns simultaneously with clear labeling',
        rationale:
          'Users need both perspectives: nominal for tax and accounting purposes, real for understanding actual wealth change',
        example:
          'Dashboard card: "Nominal Return: +82.4% | Real Return: +47.1% (after 2.5% avg inflation)"',
      },
      {
        title: 'Purchasing Power Indicators',
        description:
          'Add visual indicators showing whether purchasing power is increasing, flat, or declining',
        rationale:
          'A simple up/down/flat indicator communicates real-value trends instantly without requiring financial calculation',
        example:
          'Green up arrow: "Your purchasing power grew 2.1% this year" vs red down: "Purchasing power declined 0.8%"',
      },
      {
        title: 'Inflation Assumption Transparency',
        description:
          'Always disclose the inflation rate used in calculations and let users modify it',
        rationale:
          'Hidden assumptions undermine trust; user-adjustable rates build confidence in projections',
        example:
          'Footer note: "Calculations assume 2.5% annual inflation (historical US average). Adjust this assumption."',
      },
      {
        title: 'Contextual Education at Decision Points',
        description:
          'Provide brief explanations of money illusion at moments when users make financial decisions',
        rationale:
          'Just-in-time education is more effective than upfront tutorials for improving decision quality',
        example:
          'Before accepting a job offer: "This salary is 15% higher nominally, but 8% lower in purchasing power due to cost-of-living differences"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure nominal vs real value distinction is conveyed semantically',
        implementation:
          'Use proper ARIA labels and semantic HTML to indicate whether values are nominal or inflation-adjusted, so screen readers convey the distinction',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely solely on color to distinguish nominal from real values',
        implementation:
          'Combine color coding with text labels, icons, or patterns to differentiate nominal and real-value lines on charts',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label all financial values as nominal or inflation-adjusted',
        implementation:
          'Use explicit labels like "Nominal Return" and "Real Return (inflation-adjusted)" rather than relying on visual context alone',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Ensure inflation toggle controls are accessible',
        implementation:
          'Nominal/real toggle switches must have accessible names, keyboard operability, and announce state changes to assistive technology',
      },
    ],

    ethics: [
      {
        concern: 'Misleading Growth Presentations',
        severity: 'critical',
        explanation:
          'Presenting nominal growth as real wealth increase when it primarily reflects inflation',
        mitigation:
          'Always show real returns alongside nominal. Default to inflation-adjusted values for periods where inflation materially affects the total.',
      },
      {
        concern: 'Inflated Savings Claims',
        severity: 'high',
        explanation:
          'Calculating "savings" over multi-year periods in purely nominal terms, overstating the benefit',
        mitigation:
          'Compute and display savings in real terms. Be honest that a frozen nominal price still loses value due to inflation.',
      },
      {
        concern: 'Exploiting Financial Illiteracy',
        severity: 'critical',
        explanation:
          'Relying on users not understanding inflation to make financial products appear more attractive',
        mitigation:
          'Provide clear educational context. Design for comprehension, not exploitation of the gap between nominal and real understanding.',
      },
      {
        concern: 'Nominal Salary Framing',
        severity: 'high',
        explanation:
          'Presenting nominal raises as real compensation increases when they merely match or trail inflation',
        mitigation:
          'HR and salary tools should show purchasing power changes alongside nominal changes. A 2% raise with 3% inflation is a pay cut in real terms.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Money Illusion',
        author: 'Shafir, E., Diamond, P., & Tversky, A.',
        year: 1997,
        doi: '10.2307/2946696',
        description:
          'The foundational experimental paper demonstrating money illusion in controlled settings, showing people systematically confuse nominal and real value changes',
        type: 'foundational',
      },
      {
        title: 'The Money Illusion',
        author: 'Fisher, Irving',
        year: 1928,
        description:
          'The original book coining the term "money illusion" and documenting how people fail to adjust for inflation in economic decisions',
        type: 'foundational',
      },
      {
        title: 'Money Illusion in the Stock Market: The Modigliani-Cohn Hypothesis',
        author: 'Cohen, R. B., Polk, C., & Vuolteenaho, T.',
        year: 2005,
        doi: '10.1093/qje/120.2.639',
        description:
          'Evidence that even sophisticated stock market investors exhibit money illusion by failing to properly discount for inflation',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Animal Spirits',
        author: 'Akerlof, George A. & Shiller, Robert J.',
        year: 2009,
        isbn: '9780691145921',
        description:
          'Extensive discussion of money illusion as one of the key "animal spirits" driving economic behavior, with chapters on its impact on wage setting and pricing',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Covers money illusion in the context of behavioral economics, including its role in wage stickiness and consumer behavior',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Why We Fail to Account for Inflation',
        author: 'Benartzi, Shlomo',
        url: 'https://hbr.org/behavioral-economics',
        description:
          'Practical analysis of how money illusion affects retirement planning and investment decisions, with design recommendations',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Money Illusion Explained',
        author: 'Khan Academy Economics',
        url: 'https://www.khanacademy.org/economics-finance-domain',
        description:
          'Clear explanation of nominal vs real values with interactive examples',
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
