/**
 * DENOMINATION EFFECT
 *
 * We're less likely to spend large bills than equivalent small bills
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const denominationEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'denomination-effect',
    name: 'Denomination Effect',
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
    simple: 'We\'re less likely to spend large bills than equivalent small bills',

    detailed: `The Denomination Effect is a cognitive bias where people are less likely to spend money when it is represented as a single large denomination (e.g., a $100 bill) compared to an equivalent amount in smaller denominations (e.g., five $20 bills). "Breaking a large bill" feels psychologically painful in a way that spending small bills does not.

This bias extends far beyond physical currency. In digital interfaces, it manifests whenever value is chunked, subdivided, or reframed into smaller-seeming units. Monthly vs. annual pricing, in-app currency systems, micro-transactions, and token-based economies all exploit or trigger the denomination effect.

In UX and product design, the denomination effect is a powerful lever for pricing presentation, payment flow design, and spending behavior. When costs are broken into small, digestible units, users perceive them as less painful and are more willing to spend. Conversely, showing a single large total can trigger loss aversion and spending hesitation.`,

    psychologyBasis: {
      discoveredBy: 'Priya Raghubir and Joydeep Srivastava',
      year: 2009,
      theory: 'Mental Accounting and Transaction Utility Theory',
      mechanism: `The brain assigns different psychological weight to money depending on its denomination or framing, not just its objective value. This happens because:

1. **Mental Accounting**: Large denominations are mentally categorized as "wealth" or "savings," while small denominations are categorized as "spending money" — making large bills harder to part with
2. **Pain of Breaking**: Spending a large bill triggers a discrete, salient loss event — the moment of "breaking" the bill feels like a threshold crossing that amplifies loss aversion
3. **Perceived Fungibility Failure**: Objectively, $100 in one bill equals $100 in small bills, but the brain treats them as different "accounts" with different spending thresholds
4. **Granularity Effect**: Small denominations feel individually insignificant — each small payment falls below the threshold of conscious spending pain
5. **Aggregation Blindness**: When spending in small increments, people lose track of cumulative totals because each transaction feels trivial

The mechanism is largely automatic — people do not consciously decide to spend more with small bills; the reduced pain of each small transaction simply lowers the barrier to spending.`,
    },

    realWorldExample: `In Raghubir and Srivastava's experiments, participants given a single $1 bill were significantly less likely to spend it than participants given four quarters — even though the value was identical. The $1 bill felt like a unit of savings, while quarters felt like loose change meant for spending.

This same principle explains why people spend more freely with a Starbucks card balance ($14.75 remaining) than they would handing over a $5 bill for a latte. The card balance is already "spent" in their mental accounting — each purchase just reduces a number rather than requiring a discrete spending decision.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Denomination Effect profoundly affects how users perceive cost, make purchasing decisions, and manage spending in digital interfaces. Designers can leverage this to:

- Frame pricing in smaller units (daily, per-use) to reduce perceived cost
- Design in-app currency systems that abstract away real-money spending pain
- Chunk large commitments into smaller, more palatable payments
- Present subscription pricing in monthly terms even when billed annually
- Create token or credit economies where spending feels less like real money`,

    whenToUse: [
      {
        title: 'Subscription Pricing Display',
        scenario:
          'When presenting annual or long-term subscription pricing to users',
        example:
          'Show "$2.99/day" or "$8.25/month" instead of "$1,091/year" for a premium service',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Micro-Transaction Framing',
        scenario: 'When selling add-ons, upgrades, or small digital goods',
        example:
          'Price individual features at "$0.99 each" rather than bundling into a "$29.99 pack" to encourage incremental purchases',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Payment Plan Presentation',
        scenario: 'When offering installment or financing options for expensive items',
        example:
          'Show "4 easy payments of $24.99" alongside the $99.99 total price',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Donation or Tip Framing',
        scenario: 'When encouraging charitable giving or tipping',
        example:
          'Frame as "the cost of a coffee per week" instead of "$260/year" to make donations feel smaller',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'In-App Currency Systems',
        scenario: 'When designing virtual currency or token-based economies',
        example:
          'Convert real dollars to gems/coins/credits so spending 500 gems feels less painful than spending $4.99',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Total Cost Transparency',
        reason:
          'Breaking costs into tiny denominations can obscure the true total expenditure',
        consequence:
          'Users overspend without realizing cumulative costs, leading to regret and churn',
        alternative:
          'Always show cumulative totals alongside per-unit pricing so users can make informed decisions',
      },
      {
        title: 'Financial Planning Interfaces',
        reason:
          'Denomination framing can distort users\' understanding of their actual financial commitments',
        consequence:
          'Users underestimate recurring expenses, leading to budget problems and resentment toward your product',
        alternative:
          'Present costs in multiple time frames (daily, monthly, annual) and emphasize total commitment',
      },
      {
        title: 'Children and Vulnerable Users',
        reason:
          'In-app currencies specifically exploit denomination effect on users with lower financial literacy',
        consequence:
          'Children or vulnerable users spend far more than intended, causing real financial harm',
        alternative:
          'Show real-money equivalents for all in-app purchases, add spending limits and parental controls',
      },
      {
        title: 'Regulatory or Compliance Contexts',
        reason:
          'Many jurisdictions require clear total-cost disclosure for financial products',
        consequence:
          'Legal liability, regulatory fines, and forced design changes',
        alternative:
          'Lead with the total cost and use denomination framing only as supplementary context',
      },
    ],

    commonMistakes: [
      {
        title: 'Hiding the True Total',
        description:
          'Showing only per-day or per-use pricing without ever revealing the annual or lifetime total',
        why: 'Users feel deceived when they realize how much they actually spent, destroying trust and increasing churn',
        fix: 'Always show the total cost clearly — use small denominations for framing, but never hide the real number',
      },
      {
        title: 'Over-Abstracting with Virtual Currency',
        description:
          'Creating complex currency conversion rates (1 gem = $0.0073) that prevent users from understanding real costs',
        why: 'Deliberate obfuscation erodes trust and invites regulatory scrutiny',
        fix: 'Use simple, intuitive conversion rates (100 coins = $1) and always show real-money equivalents at checkout',
      },
      {
        title: 'Inconsistent Denomination Framing',
        description:
          'Showing per-month pricing on the marketing page but per-year billing at checkout',
        why: 'The sudden denomination switch feels like a bait-and-switch, triggering distrust at the critical conversion moment',
        fix: 'Maintain consistent framing throughout the funnel, showing both per-month and annual totals at every step',
      },
      {
        title: 'Ignoring Cumulative Spend Tracking',
        description:
          'Designing micro-transaction systems without any way for users to see their total spend',
        why: 'Without cumulative visibility, users cannot self-regulate, leading to spending regret and negative brand sentiment',
        fix: 'Provide spend history, monthly summaries, and optional spending alerts in the user dashboard',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how pricing denominations are displayed and compared',
        examples: [
          'Per-day pricing displayed in large text with annual total in smaller text below',
          'Payment plan options laid out as equal-sized cards, making installments feel routine',
          'In-app store layouts that show virtual currency prices without real-money equivalents',
          'Side-by-side monthly vs annual comparison layouts that frame monthly as the default',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Text size and weight directly affect which denomination feels primary',
        examples: [
          'Large, bold "$2.99/day" with smaller, lighter "$1,091/year" creates denomination framing through hierarchy',
          'Micro-transaction prices in small, understated type reduce perceived spending pain',
          'Strikethrough on annual price with bold monthly price reframes the reference denomination',
          'Virtual currency amounts displayed in playful, non-financial typefaces feel less like real money',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can reinforce which denomination feels like the "real" price',
        examples: [
          'Green on per-day price signals affordability and savings',
          'Muted gray on total annual price de-emphasizes the larger number',
          'Bright, game-like colors on virtual currency distances it from real money',
          'Red on the "full price" with green on installment amounts frames the denomination shift',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Spending interactions design determines how denomination framing affects behavior',
        examples: [
          'One-tap micro-purchases reduce friction and spending deliberation',
          'Pre-loaded wallet balances shift the spending decision to the loading event, not each purchase',
          'Subscription auto-renewal converts a large annual decision into passive monthly charges',
          'Slider controls for donation amounts let users adjust denomination without typing a number',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing is the primary vehicle for denomination effect in interfaces',
        examples: [
          '"Less than the cost of a coffee per day" reframes $1,400/year into a trivial daily denomination',
          '"Just 50 gems!" obscures the real-money cost through virtual denomination',
          '"4 easy payments of $24.99" chunks a $99.99 price into smaller psychological units',
          'Usage-based pricing ("$0.002 per API call") makes costs feel negligible until they aggregate',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Denomination framing must be transparent and navigable for all users',
        examples: [
          'Screen readers should announce both per-unit and total prices, not just the smaller denomination',
          'Users with cognitive disabilities may struggle with virtual currency conversions',
          'Total cost summaries must be programmatically associated with per-unit prices',
          'Spending history and cumulative totals should be keyboard-navigable and screen-reader friendly',
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
        title: 'Transparent Daily Pricing with Annual Total',
        description:
          'Subscription service showing per-day cost alongside clear annual total',
        code: `<div class="pricing-card">
  <h3>Premium Plan</h3>
  <div class="price-primary">
    <span class="amount">$2.99</span>
    <span class="period">/day</span>
  </div>
  <p class="price-context">Billed annually at <strong>$1,091/year</strong></p>
  <ul class="benefits">
    <li>Unlimited access to all features</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
  </ul>
  <button class="cta">Start Free Trial</button>
</div>`,
        explanation:
          'The per-day framing ($2.99) makes the cost feel small and manageable, but the annual total is clearly visible. Users benefit from the denomination framing while maintaining full cost awareness.',
        principle:
          'Small denomination framing reduces spending pain while transparency preserves trust',
        metrics: {
          before: '8.2% conversion with "$1,091/year" as primary price',
          after: '14.7% conversion with "$2.99/day" as primary price (annual total visible)',
          improvement: '79% increase in subscription conversion',
        },
      },
      {
        title: 'In-App Currency with Real-Money Equivalents',
        description:
          'Mobile game store showing virtual currency alongside real dollar amounts',
        code: `<div class="store-item">
  <img src="power-boost.png" alt="Power Boost">
  <h4>Power Boost</h4>
  <div class="price-row">
    <span class="gem-price">💎 200 Gems</span>
    <span class="real-price">≈ $1.99 USD</span>
  </div>
  <button class="buy-btn">Purchase</button>
</div>

<div class="wallet-summary">
  <p>Your balance: 💎 1,450 Gems <span class="equiv">≈ $14.50 USD</span></p>
  <p class="spent-this-month">Spent this month: $23.47</p>
</div>`,
        explanation:
          'The virtual currency makes individual purchases feel lighter, but real-money equivalents and monthly spend tracking keep users informed. This balances the denomination effect with ethical transparency.',
        principle:
          'Virtual currency can reduce purchase friction while real-money disclosure prevents overspending',
      },
      {
        title: 'Charitable Donation with Relatable Framing',
        description:
          'Nonprofit donation page using everyday cost comparisons',
        code: `<div class="donation-framing">
  <h3>Help a Child Learn to Read</h3>
  <div class="amount-options">
    <button class="amount selected">
      <span class="daily">$1.67/day</span>
      <span class="monthly">$50/month</span>
    </button>
    <button class="amount">
      <span class="daily">$0.83/day</span>
      <span class="monthly">$25/month</span>
    </button>
    <button class="amount">
      <span class="daily">$3.33/day</span>
      <span class="monthly">$100/month</span>
    </button>
  </div>
  <p class="comparison">That's less than your daily coffee.</p>
  <p class="annual-total">Annual commitment: <strong>$600</strong></p>
</div>`,
        explanation:
          'Framing donations as daily amounts and comparing to everyday expenses makes generosity feel accessible. The annual total is disclosed so donors understand their full commitment.',
        principle:
          'Relatable small-denomination framing increases willingness to give while showing the real total maintains informed consent',
        metrics: {
          before: 'Average donation: $35/month with monthly-only framing',
          after: 'Average donation: $52/month with daily framing + annual disclosure',
          improvement: '49% increase in average recurring donation',
        },
      },
    ],

    bad: [
      {
        title: 'Hidden Total Behind Micro-Pricing',
        description:
          'SaaS tool advertising per-day price without showing total cost anywhere',
        code: `<!-- DON'T DO THIS -->
<div class="pricing">
  <h3>Pro Plan</h3>
  <div class="price">
    <span class="amount" style="font-size: 3rem;">$0.99</span>
    <span class="period">/day</span>
  </div>
  <p>Less than a cup of coffee!</p>
  <button>Subscribe Now</button>
  <!-- No annual total shown anywhere -->
  <!-- Actual annual cost: $361.35 — never disclosed until billing -->
</div>`,
        explanation:
          'Showing only the per-day price deliberately exploits the denomination effect to hide a $361 annual commitment. Users cannot make an informed spending decision when the real total is never shown.',
        principle:
          'Denomination framing without total cost disclosure is deceptive, not persuasive',
      },
      {
        title: 'Deliberately Opaque Virtual Currency',
        description:
          'Mobile game using confusing conversion rates to obscure real costs',
        code: `<!-- DON'T DO THIS -->
<div class="store">
  <h3>Buy StarCoins</h3>
  <div class="pack">
    <span>550 StarCoins</span>
    <span class="price">$4.99</span>
  </div>
  <div class="pack">
    <span>1,200 StarCoins</span>
    <span class="price">$9.99</span>
  </div>

  <!-- In the game shop, prices like: -->
  <div class="item">
    <span>Legendary Sword: 875 StarCoins</span>
    <!-- Users can't easily calculate this is ~$7.95 -->
    <!-- No real-money equivalent shown -->
  </div>
</div>`,
        explanation:
          'The non-round conversion rate (550 coins = $4.99, i.e., ~$0.00907/coin) makes it nearly impossible to calculate real costs. This deliberately exploits denomination abstraction to prevent informed spending decisions.',
        principle:
          'Obscure virtual currency conversions are designed to bypass rational spending evaluation',
      },
      {
        title: 'Micro-Transaction Dark Pattern with No Spend Tracking',
        description:
          'App with frequent small purchases and no cumulative spend visibility',
        code: `<!-- DON'T DO THIS -->
<div class="boost-prompt">
  <p>You're out of energy! Refill for just</p>
  <span class="price" style="color: green;">$0.99</span>
  <button class="buy">Refill Now!</button>
  <!-- This prompt appears 5-8 times per play session -->
  <!-- No monthly spend summary exists anywhere in the app -->
  <!-- Average user spends $47/month without realizing it -->
</div>`,
        explanation:
          'Each $0.99 purchase feels trivial, but the app is designed to prompt them repeatedly. Without any cumulative spending visibility, users have no way to realize they are spending $47+/month on energy refills.',
        principle:
          'Repeated micro-transactions without spend tracking weaponize the denomination effect against users',
      },
    ],

    realWorld: [
      {
        company: 'Supercell',
        product: 'Clash of Clans Gem Economy',
        description: 'Clash of Clans uses gems as an intermediary currency. Players buy gems with real money, then spend gems on in-game items. The two-step abstraction — real money to gems, gems to items — creates double denomination distancing. Individual gem purchases feel trivial even as cumulative spending reaches hundreds of dollars.',
        effectiveness: 'very-effective',
        analysis: 'The gem system is one of the most effective denomination effect implementations in mobile gaming. Non-round exchange rates and tiered gem packs make mental arithmetic difficult. Average revenue per paying user is extremely high because each gem transaction feels small and disconnected from real money.',
      },
      {
        company: 'Starbucks',
        product: 'Starbucks Card & App Balance',
        description: 'Starbucks encourages loading money onto a card or app balance. Once loaded, purchases feel like drawing down a balance rather than spending money. The "pain of paying" shifts from each coffee purchase to the less frequent reload event.',
        effectiveness: 'very-effective',
        analysis: 'By converting cash into a pre-loaded balance, Starbucks shifts the spending pain to the loading moment. Each $5.75 latte just reduces a number — it does not trigger a new spending decision. Card users spend 20-30% more than cash users because of this denomination reframing.',
      },
      {
        company: 'Netflix',
        product: 'Monthly Subscription Pricing',
        description: 'Netflix displays pricing as "$15.49/month" rather than "$185.88/year." Auto-renewal means users make one decision and then pay in small, recurring increments that fall below the threshold of active spending deliberation.',
        effectiveness: 'very-effective',
        analysis: 'Monthly framing combined with auto-renewal is a textbook denomination effect application. Each $15.49 charge feels trivial. Users rarely calculate that they spend nearly $186/year. The small monthly denomination reduces churn by keeping each billing cycle below the "is this worth it?" evaluation threshold.',
      },
      {
        company: 'Apple',
        product: 'App Store Micro-Pricing',
        description: 'The App Store popularized $0.99 as a standard app price. At this denomination, purchasing feels nearly free. In-app purchases follow the same pattern — small individual prices that aggregate into significant spending.',
        effectiveness: 'effective',
        analysis: 'Apple established that $0.99 is psychologically a different category from $1.00+. The sub-dollar denomination puts app purchases into the "impulse" mental account rather than the "deliberate purchase" account. This denomination framing drove the app economy\'s growth.',
      },
    ],

    abTests: [
      {
        title: 'Subscription Pricing: Annual Total vs Per-Day Framing',
        hypothesis:
          'Showing per-day pricing will increase subscription sign-ups compared to annual pricing',
        controlVersion: {
          description:
            'Pricing page showing "$1,091/year" as the primary price display for the premium plan',
          metrics: {
            conversionRate: '8.2%',
            averageRevenuePerUser: '$1,091',
            trialToPayConversion: '34%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page showing "$2.99/day" as primary price with "$1,091/year" in smaller text below',
          metrics: {
            conversionRate: '14.7%',
            averageRevenuePerUser: '$1,091',
            trialToPayConversion: '51%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Per-day framing nearly doubled conversion rate. The identical annual price generated the same revenue per user, but far more users signed up. Trial-to-paid conversion also increased significantly because users anchored to the small daily cost during their trial.',
          learnings: [
            'Small denomination framing dramatically reduces perceived cost without changing actual price',
            'Users who signed up via per-day framing showed no difference in churn, suggesting no "buyer\'s remorse"',
            'Showing the annual total alongside per-day price maintained trust without reducing conversion lift',
            'Effect was strongest for price-sensitive segments and weakest for enterprise buyers',
          ],
        },
      },
      {
        title: 'In-App Purchases: Direct Dollar Pricing vs Virtual Currency',
        hypothesis:
          'Virtual currency will increase in-app purchase frequency compared to direct dollar pricing',
        controlVersion: {
          description:
            'Game store showing all items with direct USD prices ($0.99, $2.99, $4.99)',
          metrics: {
            conversionRate: '3.1%',
            averagePurchasesPerMonth: '1.8',
            averageMonthlySpend: '$4.23',
          },
        },
        treatmentVersion: {
          description:
            'Game store using coin currency (100 coins = $1.00) with real-money equivalent shown in small text',
          metrics: {
            conversionRate: '7.4%',
            averagePurchasesPerMonth: '4.2',
            averageMonthlySpend: '$9.87',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Virtual currency more than doubled both purchase frequency and monthly spend. The abstraction layer reduced the psychological pain of each transaction. Importantly, showing real-money equivalents did not negate the effect — the denomination reframing still reduced spending friction.',
          learnings: [
            'Virtual currency creates a denomination buffer that reduces per-transaction spending pain',
            'Purchase frequency increased more than purchase size, suggesting the effect lowers the spending threshold',
            'Real-money equivalents provide ethical transparency without eliminating the conversion benefit',
            'Users who could see their cumulative monthly spend reported higher satisfaction than those who could not',
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
        name: 'Per-Unit Price Emphasis',
        description:
          'Pricing displayed in small time units (per day, per hour, per use) with larger text or bolder weight than the total',
        howToSpot:
          'Look for small-denomination prices displayed more prominently than total costs — larger font, brighter color, or higher position',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Virtual Currency Display',
        description:
          'Prices shown in non-dollar units like gems, coins, credits, tokens, or points',
        howToSpot:
          'Check for any intermediary currency between the user and real money, especially with non-round conversion rates',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Installment Framing',
        description:
          'Payments broken into multiple smaller amounts ("4 easy payments of $24.99")',
        howToSpot:
          'Look for installment language, "split pay" options, or buy-now-pay-later framing that chunks a single price into smaller pieces',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Everyday Comparison Language',
        description:
          'Cost compared to familiar small expenses ("less than a cup of coffee")',
        howToSpot:
          'Watch for analogies to daily expenses like coffee, lunch, or streaming services used to minimize perceived cost',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'De-Emphasized Total Cost',
        description:
          'Annual or lifetime total shown in smaller, lighter, or less prominent typography',
        howToSpot:
          'Compare the visual weight of per-unit pricing to total cost — if the total is significantly de-emphasized, denomination framing is at work',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Micro-Denomination Pricing Pattern',
        description: 'Primary price shown in the smallest reasonable time unit to minimize perceived cost',
        indicators: ['Per-day or per-hour pricing as primary display', 'Annual or monthly total in smaller or secondary text', '"Just $X/day" or "Only $X/month" language', 'Coffee or lunch cost comparisons'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Virtual Currency Abstraction Pattern',
        description: 'Intermediary currency that creates psychological distance from real money',
        indicators: ['Custom currency names (gems, coins, credits, stars)', 'Non-round conversion rates that prevent easy mental math', 'Currency bundles with bonus amounts obscuring per-unit cost', 'No real-money equivalent shown at point of purchase'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Payment Chunking Pattern',
        description: 'Single price broken into multiple smaller installments or payments',
        indicators: ['"X easy payments of $Y" language', 'Buy-now-pay-later integration', 'Financing or installment plan options', 'Split payment presentation as default view'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Spending Opacity Pattern',
        description: 'Micro-transactions without cumulative spend visibility',
        indicators: ['Repeated small purchases with no spend summary', 'No monthly or weekly spending totals', 'No spending alerts or budget tools', 'Purchase history buried or absent'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What denomination or time unit is the primary price displayed in?',
      'Is the total cost (annual, lifetime) clearly visible alongside per-unit pricing?',
      'Is there an intermediary currency between users and real money?',
      'Can users easily calculate the real-money cost of virtual currency purchases?',
      'Are micro-transactions repeated frequently without cumulative spend tracking?',
      'Is payment broken into installments, and is the total clearly disclosed?',
      'Are everyday cost comparisons ("less than a coffee") used to minimize perceived price?',
      'Does the visual hierarchy emphasize the small denomination over the total cost?',
      'Can users access a clear history of their cumulative spending?',
      'Are vulnerable users (children, impulsive spenders) protected with spending controls?',
      'Is the denomination framing consistent across marketing, pricing page, and checkout?',
      'Does the implementation prioritize user financial awareness or spending maximization?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the denomination effect.

Analyze the provided design for denomination effect patterns. Identify:

1. **Price Denomination**: How prices are broken down — per day, per month, per use, or as a total
2. **Virtual Currency**: Any intermediary currencies that abstract real-money costs
3. **Payment Chunking**: Installment or split-payment presentations
4. **Total Cost Visibility**: Whether cumulative or total costs are clearly disclosed
5. **Spending Friction**: How much deliberation each purchase requires

For each pattern found:
- Identify the denomination framing used and its location
- Assess whether total costs are transparently disclosed
- Determine if virtual currencies have clear real-money equivalents
- Evaluate whether cumulative spending is trackable by users
- Check for ethical safeguards (spending limits, parental controls, spend summaries)

Consider:
- Is the denomination framing helping users budget, or hiding true costs?
- Can users easily calculate their total spending commitment?
- Are virtual currency conversion rates designed for clarity or obfuscation?
- Are micro-transactions repeatable without cumulative spend visibility?
- Are vulnerable users protected?
- Is denomination framing consistent across all touchpoints?

Provide actionable recommendations for ethical, transparent use of denomination framing.`,

    outputSchema: {
      type: 'object',
      properties: {
        denominationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              denominationUsed: { type: 'string' },
              totalCostVisible: { type: 'boolean' },
              realMoneyEquivalent: { type: 'boolean' },
              cumulativeTrackingAvailable: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'denominationUsed',
              'totalCostVisible',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            transparencyScore: { type: 'number' },
            denominationClarity: { type: 'number' },
            spendingVisibility: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'transparencyScore',
            'denominationClarity',
            'spendingVisibility',
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
        'denominationPatterns',
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
        title: 'Choose the Right Denomination',
        description:
          'Select a time unit or currency denomination that makes the price feel accessible without being deceptive',
        example:
          'A $120/year service shown as "$10/month" or "$0.33/day" — choose the denomination that is honest and relatable for your audience',
        tips: [
          'Per-month is standard for subscriptions; per-day works for premium services',
          'Avoid per-hour or per-minute framing unless the product is actually used that way',
          'Match the denomination to how users actually experience the product',
        ],
      },
      {
        step: 2,
        title: 'Always Disclose the Total Cost',
        description:
          'Show the full cost alongside the per-unit price so users can make informed decisions',
        example:
          'Primary: "$9.99/month" — Secondary: "Billed annually at $119.88"',
        tips: [
          'Total cost should be visible without scrolling or clicking',
          'Use clear, readable type — not tiny gray text',
          'Show both the per-unit and total price at checkout confirmation',
        ],
      },
      {
        step: 3,
        title: 'Design Virtual Currency for Clarity',
        description:
          'If using virtual currency, make conversion rates simple and show real-money equivalents',
        example:
          '100 coins = $1.00, with "$2.50" shown next to "250 coins" at every purchase point',
        tips: [
          'Use round, intuitive conversion rates (100:1, 10:1)',
          'Show real-money equivalent at point of purchase, not just at the coin store',
          'Display total real-money spent in user account settings',
        ],
      },
      {
        step: 4,
        title: 'Provide Cumulative Spend Tracking',
        description:
          'Give users visibility into their total spending, especially for micro-transaction systems',
        example:
          'Dashboard showing "You\'ve spent $47.23 this month on in-app purchases"',
        tips: [
          'Show monthly and yearly spend summaries',
          'Offer optional spending alerts or budget limits',
          'Make spend history easily accessible, not buried in settings',
        ],
      },
      {
        step: 5,
        title: 'Test Denomination Framing Impact',
        description:
          'A/B test different denomination framings to find the optimal balance of conversion and user satisfaction',
        example:
          'Test: "$2.99/day" vs "$89.99/month" vs "$1,091/year" — measure conversion, churn, and satisfaction',
        tips: [
          'Measure not just conversion but also 90-day retention and satisfaction',
          'Track whether users who convert via small-denomination framing churn at higher rates',
          'Survey users about perceived value and cost awareness',
        ],
      },
    ],

    dos: [
      'Show per-unit pricing alongside total cost for full transparency',
      'Use simple, intuitive conversion rates for virtual currencies',
      'Display real-money equivalents at every virtual currency purchase point',
      'Provide cumulative spend tracking and monthly spend summaries',
      'Offer optional spending alerts and budget controls',
      'Match denomination framing to how users actually experience the product',
      'Maintain consistent denomination framing across marketing, pricing, and checkout',
      'Test denomination framing impact on both conversion and long-term satisfaction',
    ],

    donts: [
      'Don\'t hide total cost behind micro-denomination pricing',
      'Don\'t use deliberately confusing virtual currency conversion rates',
      'Don\'t design micro-transaction systems without cumulative spend visibility',
      'Don\'t target children or vulnerable users with denomination abstraction without safeguards',
      'Don\'t switch denomination framing between marketing page and checkout',
      'Don\'t use per-second or per-minute pricing to make costs seem negligible',
      'Don\'t obscure the reload/purchase frequency that drives real spending',
      'Don\'t omit real-money equivalents from virtual currency purchase screens',
    ],

    bestPractices: [
      {
        title: 'Dual-Denomination Display',
        description:
          'Always show both the small denomination (primary) and total cost (secondary) together',
        rationale:
          'Users benefit from the accessibility of small-unit framing while maintaining full cost awareness',
        example:
          'Primary: "$9.99/month" — Below: "Billed annually at $119.88 (save 17%)"',
      },
      {
        title: 'Transparent Virtual Currency',
        description:
          'Use round conversion rates and show real-money cost at every purchase point',
        rationale:
          'Users should always be able to quickly estimate real cost — opacity breeds distrust and regret',
        example:
          '100 gems = $1.00, with "~$3.50" shown next to "350 gems" on every item',
      },
      {
        title: 'Cumulative Spend Dashboard',
        description:
          'Provide a clear spend summary accessible from the main navigation',
        rationale:
          'Informed users who can track spending are more satisfied and less likely to churn from regret',
        example:
          '"This month: $23.47 across 12 purchases. Last month: $18.92"',
      },
      {
        title: 'Vulnerable User Safeguards',
        description:
          'Implement spending controls for children, optional budget limits, and cool-down periods for large purchases',
        rationale:
          'Ethical denomination framing protects vulnerable users from unintended overspending',
        example:
          'Parental spending limit of $20/month, confirmation prompt after 5 purchases in one session',
      },
      {
        title: 'Consistent Framing Across Funnel',
        description:
          'Use the same denomination framing from ad to landing page to checkout to billing email',
        rationale:
          'Denomination switches between touchpoints feel like bait-and-switch and destroy trust',
        example:
          'If marketing says "$9.99/month," the checkout should show "$9.99/month (billed as $119.88/year)" — not just "$119.88"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Both per-unit and total prices must be programmatically associated',
        implementation:
          'Use aria-describedby to connect per-unit pricing to total cost disclosure so screen readers announce both together',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Don\'t rely only on color to de-emphasize total cost',
        implementation:
          'Ensure total cost text meets contrast requirements even when styled as secondary. Don\'t use gray-on-white to hide the real price.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Price sections need clear, descriptive headings',
        implementation:
          'Label pricing sections clearly: "Monthly cost," "Annual total," "Your spending summary" so all users can navigate to cost information',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions — Virtual currency purchases need clear real-money labeling',
        implementation:
          'Every purchase button must have a label or adjacent text showing real-money cost, not just virtual currency amount',
      },
    ],

    ethics: [
      {
        concern: 'Total Cost Obfuscation',
        severity: 'critical',
        explanation:
          'Showing only per-day or per-use pricing without any total cost disclosure deliberately prevents informed spending decisions',
        mitigation:
          'Always display total cost (annual, per billing cycle) alongside per-unit pricing. Make the total visible without requiring user action.',
      },
      {
        concern: 'Virtual Currency Opacity',
        severity: 'critical',
        explanation:
          'Non-round conversion rates and missing real-money equivalents are designed to prevent users from understanding what they are spending',
        mitigation:
          'Use simple conversion rates (100:1). Show real-money equivalents at every purchase point. Provide total real-money spend in account settings.',
      },
      {
        concern: 'Exploiting Children and Vulnerable Users',
        severity: 'critical',
        explanation:
          'In-app currency systems and micro-transactions disproportionately affect users with lower financial literacy or impulse control',
        mitigation:
          'Implement parental controls, spending limits, cool-down periods, and age-appropriate real-money disclosures. Comply with COPPA and similar regulations.',
      },
      {
        concern: 'Cumulative Spending Blindness',
        severity: 'high',
        explanation:
          'Repeated micro-transactions without spend tracking can lead users to unknowingly spend far more than they intended',
        mitigation:
          'Provide cumulative spend tracking, monthly summaries, optional budget alerts, and prominent purchase history.',
      },
      {
        concern: 'Denomination Bait-and-Switch',
        severity: 'high',
        explanation:
          'Advertising "$2.99/day" but billing $1,091/year without clear connection between the two feels deceptive',
        mitigation:
          'Maintain consistent denomination framing. Show both representations at checkout. Never surprise users with a total they were not shown.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Denomination Effect',
        author: 'Raghubir, P., & Srivastava, J.',
        year: 2009,
        doi: '10.1016/j.jcps.2008.09.002',
        description:
          'The foundational paper demonstrating that people spend less when money is in large denominations versus equivalent small denominations',
        type: 'foundational',
      },
      {
        title: 'Mental Accounting Matters',
        author: 'Thaler, R. H.',
        year: 1999,
        doi: '10.1002/(SICI)1099-0771(199912)12:4<183::AID-BDM318>3.0.CO;2-F',
        description:
          'Foundational work on mental accounting theory, which underpins the denomination effect\'s mechanism of assigning different psychological weight to equivalent amounts',
        type: 'foundational',
      },
      {
        title: 'The Red and the Black: Mental Accounting of Savings and Debt',
        author: 'Prelec, D., & Loewenstein, G.',
        year: 1998,
        description:
          'Research on the "pain of paying" and how payment format affects spending behavior — closely related to denomination framing',
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
          'Covers denomination effects and mental accounting in consumer behavior with accessible real-world examples',
        type: 'practical',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Richard Thaler\'s account of mental accounting theory and its real-world applications, including denomination and spending behavior',
        type: 'foundational',
      },
      {
        title: 'Dollars and Sense',
        author: 'Ariely, Dan, & Kreisler, Jeff',
        year: 2017,
        isbn: '9780062651204',
        description:
          'Dedicated exploration of how people think about money, including denomination effects, mental accounting, and the pain of paying',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Psychology of Pricing: How Denomination Effects Influence Spending',
        author: 'Behavioral Scientist',
        url: 'https://behavioralscientist.org/',
        description:
          'Practical overview of denomination effect applications in pricing and product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We Spend Coins but Save Bills — The Denomination Effect',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/results?search_query=denomination+effect+behavioral+economics',
        description:
          'Video explanation of the denomination effect with consumer behavior examples',
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
      'anchoring-bias',       // Price anchoring works with denomination framing
      'loss-aversion',        // "Breaking" a large bill triggers loss aversion
      'framing-effect',       // Denomination is a specific type of framing
      'mental-accounting',    // Denomination effect operates through mental accounts
    ],

    conflicts: [
      'sunk-cost-fallacy',    // Large upfront payments can increase commitment via sunk cost
    ],

    confusedWith: [
      'anchoring-bias',       // Both affect price perception but through different mechanisms
      'framing-effect',       // Denomination is a subset of framing, often conflated
      'money-illusion',       // Both involve misperception of monetary value
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'micro-transaction-bias',
        'virtual-currency-effect',
      ],
    },
  },
};
