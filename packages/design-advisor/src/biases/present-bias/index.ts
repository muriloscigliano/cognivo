/**
 * PRESENT BIAS
 *
 * We overvalue immediate rewards compared to future ones
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const presentBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'present-bias',
    name: 'Present Bias',
    aliases: [],
    category: BiasCategory.DECISION_MAKING,
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
    simple: 'We overvalue immediate rewards compared to future ones',

    detailed: `Present bias is the tendency for people to give stronger weight to payoffs that are closer to the present time when considering trade-offs between two future moments. People consistently prefer smaller, immediate rewards over larger, delayed rewards — even when waiting would be objectively better.

This bias is rooted in hyperbolic discounting: the rate at which we discount future rewards is not constant but declines over time. A person might prefer $100 today over $110 tomorrow, but would happily wait one extra day if both payments were a year away ($100 in 365 days vs $110 in 366 days). The "I'll start tomorrow" mentality is a hallmark of present bias — we plan to be virtuous in the future but indulgent in the present.

In product and UX design, present bias profoundly shapes how users interact with savings tools, fitness apps, subscription services, and any interface requiring delayed gratification. Ethical designers can use commitment devices and future-self visualization to help users achieve their long-term goals, while unethical patterns exploit present bias through impulsive purchases, subscription traps, and hidden long-term costs.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain disproportionately weights immediate rewards over future ones through hyperbolic discounting. This happens because:

1. **Hyperbolic Discounting**: The subjective value of a reward drops steeply for short delays but flattens for longer delays, creating time-inconsistent preferences
2. **Dual-System Processing**: The limbic (emotional) system responds strongly to immediate rewards, while the prefrontal cortex (rational planning) handles future outcomes — and the emotional system often wins
3. **Uncertainty Aversion**: The present is certain while the future is uncertain; the brain treats "a bird in the hand" as fundamentally more real
4. **Temporal Self-Discontinuity**: People perceive their future self as almost a different person, reducing empathy and motivation for future-oriented choices
5. **Visceral Factors**: Hunger, fatigue, desire, and other immediate states amplify present-focused decision-making

The mechanism creates a systematic gap between what people plan to do (exercise, save money, eat healthy) and what they actually do in the moment (skip the gym, impulse buy, choose fast food).`,
    },

    realWorldExample: `A classic demonstration of present bias: offered $100 today or $110 next week, most people take the $100 now. But offered $100 in 52 weeks or $110 in 53 weeks — the same one-week wait — most people prefer to wait for $110. This preference reversal reveals that the discount rate for immediate rewards is dramatically steeper than for future ones, violating standard economic theory of consistent time preferences.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Present bias profoundly affects how users make decisions about saving, spending, health, productivity, and any choice involving a trade-off between now and later. Designers can leverage this understanding to:

- Help users commit to long-term goals through commitment devices and precommitment features
- Provide immediate feedback and micro-rewards for behaviors with delayed payoffs
- Visualize future outcomes to bridge the gap between present and future self
- Design habit-forming UX that makes beneficial behaviors feel rewarding now
- Protect users from impulsive decisions by introducing cooling-off periods and future-cost transparency`,

    whenToUse: [
      {
        title: 'Savings and Financial Planning',
        scenario:
          'When helping users save money or invest for the future',
        example:
          'Auto-enroll users in savings with round-up features, showing projected growth to make the future feel tangible',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Health and Fitness Goals',
        scenario: 'When encouraging users to maintain exercise, diet, or wellness habits',
        example:
          'Provide immediate achievement badges, streak counters, and progress visualizations for workouts with long-term health benefits',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Behavior Change and Habit Formation',
        scenario: 'When helping users build new habits or break old ones',
        example:
          'Offer daily check-ins with immediate positive feedback (animations, celebrations) for sticking to a plan',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Commitment Devices',
        scenario: 'When users want to bind their future selves to good decisions',
        example:
          'Allow users to precommit to goals (e.g., schedule savings transfers, set screen time limits) during moments of high motivation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Subscription and Purchase Decisions',
        scenario: 'When users need to understand the long-term cost of recurring commitments',
        example:
          'Show total annual cost alongside monthly price; visualize cumulative spending over time',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Impulse Purchase Exploitation',
        reason:
          'Exploiting present bias to drive impulsive purchases users will regret',
        consequence:
          'Buyer remorse, returns, chargebacks, loss of trust, and potential regulatory issues',
        alternative:
          'Add friction for large purchases: wishlists, cooling-off periods, and total cost breakdowns',
      },
      {
        title: 'Subscription Traps',
        reason:
          'Using present bias to lock users into long-term commitments they do not fully understand',
        consequence:
          'Users feel deceived when they realize the long-term cost; leads to churn, negative reviews, and potential legal issues',
        alternative:
          'Be transparent about total commitment cost, make cancellation easy, and provide trial periods',
      },
      {
        title: 'Hiding Future Consequences',
        reason:
          'Deliberately minimizing or obscuring long-term costs, side effects, or consequences',
        consequence:
          'Erodes trust when users discover the true cost; potential regulatory penalties',
        alternative:
          'Present future costs clearly and prominently alongside immediate benefits',
      },
      {
        title: 'Exploiting Financial Vulnerability',
        reason:
          'Using present bias to sell payday loans, high-interest credit, or "buy now pay later" to vulnerable users',
        consequence:
          'Financial harm to users, debt traps, reputational damage, and regulatory scrutiny',
        alternative:
          'Show total repayment cost, interest projections, and provide financial literacy resources',
      },
    ],

    commonMistakes: [
      {
        title: 'Only Showing Monthly Cost',
        description:
          'Displaying subscription prices only as monthly amounts without annual totals',
        why: 'Users anchor to the small monthly number and fail to appreciate the cumulative long-term cost',
        fix: 'Always show both monthly and annual totals; use a cost calculator showing cumulative spend over time',
      },
      {
        title: 'No Immediate Feedback for Long-Term Goals',
        description:
          'Building savings or fitness apps that only show progress on long time horizons',
        why: 'Without immediate positive feedback, users lose motivation because the reward feels too distant',
        fix: 'Add micro-rewards, streak counters, daily milestones, and progress animations that provide immediate gratification',
      },
      {
        title: 'Ignoring the Commitment Window',
        description:
          'Not capturing user commitment during moments of peak motivation',
        why: 'Motivation is time-sensitive; users who intend to save or exercise "later" rarely follow through',
        fix: 'Offer precommitment features during high-motivation moments (after a good workout, after payday, during goal-setting)',
      },
      {
        title: 'Abstract Future Framing',
        description:
          'Describing future benefits in vague, abstract terms instead of concrete, vivid ones',
        why: 'The future self feels like a stranger; abstract benefits cannot compete with concrete present rewards',
        fix: 'Use specific, personalized projections: "In 5 years, your savings will be $23,847" instead of "Save for the future"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether immediate benefits or long-term consequences receive visual priority',
        examples: [
          'Placing future projections and long-term cost next to "Buy Now" buttons',
          'Progress dashboards that show both daily achievements and long-term trajectory',
          'Commitment device controls placed prominently during high-motivation moments',
          'Side-by-side comparison of "now" cost vs "total" cost in checkout flows',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text hierarchy affects whether users process immediate rewards or long-term costs first',
        examples: [
          'Large, bold monthly price with small annual total buries the true cost',
          'Equally weighted typography for "per month" and "total cost" creates balanced perception',
          'Future projections in prominent display type feel more real and motivating',
          'Countdown timers and streak numbers in bold create immediate engagement',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color can make immediate rewards feel exciting or future consequences feel real',
        examples: [
          'Green growth charts make future savings feel positive and achievable',
          'Red cost projections for long-term spending make consequences feel urgent',
          'Achievement badge colors create immediate dopamine hits for long-term behaviors',
          'Muted colors for immediate gratification options can reduce impulsive choices',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users act on impulse or consider long-term consequences',
        examples: [
          'One-click purchases exploit present bias; confirmation steps add beneficial friction',
          'Automatic savings transfers remove the present-biased decision from the moment',
          'Cool-down timers on large purchases help users engage rational planning',
          'Celebratory animations for saving or exercising provide immediate emotional reward',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users think about immediate pleasure or future outcomes',
        examples: [
          '"You saved $12 today!" (immediate) vs "Your retirement fund grew" (abstract) — immediate framing drives action',
          'Future-self letters or aging visualizations bridge the empathy gap with the future self',
          'Concrete projections ("$23,847 in 5 years") beat abstract promises ("Secure your future")',
          'Loss-framed future content ("You will lose $3,200/year") is more motivating than gain-framed',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must ensure all users can perceive both immediate and long-term information',
        examples: [
          'Screen readers must announce total cost and long-term projections, not just monthly price',
          'Progress visualizations need text alternatives that convey both current and projected state',
          'Commitment device interfaces must be fully keyboard accessible',
          'Color-coded savings growth must have non-color indicators for colorblind users',
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
        title: 'Round-Up Savings with Growth Projection',
        description:
          'Banking app that rounds up purchases and shows projected savings growth',
        code: `<div class="savings-roundup">
  <h3>Round-Up Savings</h3>
  <div class="today-saved">
    <span class="amount">$3.47</span>
    <span class="label">saved today from 4 purchases</span>
  </div>
  <div class="projection">
    <div class="growth-chart" role="img" aria-label="Projected savings growth chart">
      <!-- SVG line chart showing exponential growth curve -->
    </div>
    <div class="milestones">
      <div class="milestone">
        <span class="time">6 months</span>
        <span class="amount">$632</span>
      </div>
      <div class="milestone">
        <span class="time">1 year</span>
        <span class="amount">$1,284</span>
      </div>
      <div class="milestone">
        <span class="time">5 years</span>
        <span class="amount">$7,920</span>
      </div>
    </div>
  </div>
  <p class="motivation">Your future self will thank you.</p>
</div>`,
        explanation:
          'Combines an immediate reward signal ($3.47 saved today) with vivid future projections. The growth chart makes the abstract future tangible, bridging the gap between present action and future benefit.',
        principle:
          'Pair immediate micro-rewards with concrete future projections to counteract present bias',
        metrics: {
          before: '18% of users enabled round-up savings with generic pitch',
          after: '41% enabled round-up savings with growth projections',
          improvement: '128% increase in savings feature adoption',
        },
      },
      {
        title: 'Fitness App with Immediate Achievement + Long-Term Progress',
        description:
          'Workout app providing instant feedback while tracking long-term health goals',
        code: `<div class="workout-complete">
  <div class="celebration" role="status">
    <div class="animation"><!-- Confetti animation --></div>
    <h2>Workout Complete!</h2>
    <div class="immediate-stats">
      <span class="calories">342 cal burned</span>
      <span class="streak">12-day streak!</span>
    </div>
  </div>
  <div class="long-term-impact">
    <h3>Your Progress</h3>
    <div class="health-projection">
      <div class="metric">
        <span class="label">Resting heart rate</span>
        <span class="trend">68 bpm → projected 62 bpm by June</span>
      </div>
      <div class="metric">
        <span class="label">VO2 max estimate</span>
        <span class="trend">38 → projected 42 by June</span>
      </div>
    </div>
    <p class="future-you">At this pace, you'll hit your marathon goal by October.</p>
  </div>
</div>`,
        explanation:
          'The celebratory animation and streak counter provide immediate dopamine reward. The health projections make the long-term benefits tangible and personal, connecting today\'s workout to future fitness outcomes.',
        principle:
          'Immediate celebration + concrete future projection sustains motivation for long-term goals',
      },
      {
        title: 'Precommitment Feature for Spending Control',
        description:
          'Banking app letting users set spending limits during a motivated moment',
        code: `<div class="precommit-prompt">
  <h3>Set Your Weekly Budget</h3>
  <p>You're on a roll! Set a spending limit while you're feeling motivated.</p>
  <div class="budget-setter">
    <label for="weekly-limit">Weekly dining out budget</label>
    <input type="range" id="weekly-limit" min="0" max="200" value="75" />
    <div class="comparison">
      <div class="current">
        <span class="label">Last month's average</span>
        <span class="amount">$127/week</span>
      </div>
      <div class="proposed">
        <span class="label">Your new limit</span>
        <span class="amount">$75/week</span>
      </div>
      <div class="savings">
        <span class="label">Annual savings</span>
        <span class="amount highlight">$2,704</span>
      </div>
    </div>
  </div>
  <div class="commitment-options">
    <label>
      <input type="checkbox" checked />
      Notify me when I'm at 80% of my limit
    </label>
    <label>
      <input type="checkbox" />
      Lock my card when I hit the limit (hard commitment)
    </label>
  </div>
  <button class="primary">Set My Budget</button>
</div>`,
        explanation:
          'Captures the user\'s commitment during a motivated moment and provides both soft (notification) and hard (card lock) commitment devices. The annual savings projection makes the future benefit concrete.',
        principle:
          'Commitment devices made during peak motivation help users overcome future present bias',
        metrics: {
          before: 'Users exceeded dining budget 73% of weeks',
          after: 'Users with precommitment exceeded budget only 31% of weeks',
          improvement: '58% reduction in budget overruns',
        },
      },
    ],

    bad: [
      {
        title: 'One-Click Impulse Purchase Without Cost Context',
        description:
          'E-commerce app exploiting present bias with frictionless purchasing',
        code: `<!-- DON'T DO THIS -->
<div class="flash-deal">
  <h2 style="color: red;">FLASH SALE - 2 HOURS LEFT!</h2>
  <img src="product.jpg" alt="Trendy gadget">
  <div class="price">
    <span class="sale">$29.99</span>
    <span class="original">$89.99</span>
  </div>
  <button class="buy-now" style="font-size: 1.5em;">
    BUY NOW - 1 CLICK!
  </button>
  <!-- No total cost context, no "do you need this?" friction -->
  <!-- No indication this adds to a subscription or has hidden fees -->
</div>`,
        explanation:
          'Combines urgency scarcity with frictionless purchasing to exploit present bias. Users make impulsive decisions without considering whether they need the item or its true long-term cost. No cooling-off period or cost context is provided.',
        principle:
          'Never exploit present bias by removing all friction from impulsive decisions',
      },
      {
        title: 'Subscription with Hidden Long-Term Cost',
        description:
          'Streaming service showing only the monthly price, burying the annual commitment',
        code: `<!-- DON'T DO THIS -->
<div class="subscription-offer">
  <h2>Start Watching Today!</h2>
  <div class="price">
    <span class="monthly" style="font-size: 3em;">$9.99</span>
    <span class="period">/month</span>
  </div>
  <button class="subscribe">Start Free Trial</button>
  <p style="font-size: 0.6em; color: #ccc;">
    *Annual plan, billed at $119.88/year. Cancellation fee of $49
    applies if cancelled before 12 months.
  </p>
</div>`,
        explanation:
          'The giant $9.99 exploits present bias by making the immediate cost feel trivial. The annual commitment ($119.88) and cancellation fee ($49) are deliberately hidden in tiny, low-contrast text. Users commit to a large expense without understanding the true cost.',
        principle:
          'Never hide long-term costs in fine print to exploit present-biased decision-making',
      },
      {
        title: 'Credit Card Minimum Payment Without Total Cost',
        description:
          'Credit card UI showing only minimum payment, not total repayment cost',
        code: `<!-- DON'T DO THIS -->
<div class="payment-due">
  <h3>Payment Due</h3>
  <div class="balance">$4,832.17</div>
  <div class="minimum-payment">
    <label>Minimum payment</label>
    <span class="amount" style="font-size: 2em; color: green;">$48.00</span>
  </div>
  <button class="pay-minimum">Pay $48.00</button>
  <!-- No information about total interest cost -->
  <!-- No projection of how long minimum payments take -->
  <!-- No comparison of minimum vs full payment -->
</div>`,
        explanation:
          'Emphasizing the small minimum payment in large, green text exploits present bias by making the immediate cost feel painless. Without showing that minimum payments will cost $2,300+ in interest over 12 years, users are deceived about the true cost of their decision.',
        principle:
          'Financial interfaces must show long-term consequences of present-biased choices',
      },
    ],

    realWorld: [
      {
        company: 'Acorns',
        product: 'Round-Up Investing',
        url: 'https://www.acorns.com',
        description:
          'Acorns automatically rounds up everyday purchases and invests the spare change. By making saving invisible and effortless, it removes the present-biased decision from the moment. Users see their portfolio growth over time with concrete projections.',
        effectiveness: 'very-effective',
        analysis:
          'Acorns brilliantly sidesteps present bias by automating the savings decision. Users never face the "spend now vs save later" trade-off because round-ups happen automatically. The app then reinforces long-term thinking with growth projections and milestone celebrations.',
      },
      {
        company: 'Peloton',
        product: 'Workout Achievement System',
        url: 'https://www.onepeloton.com',
        description:
          'Peloton provides immediate rewards (badges, personal records, high-fives from other users) for each workout while tracking long-term fitness metrics. The leaderboard creates immediate social reward for exercise that has primarily long-term health benefits.',
        effectiveness: 'very-effective',
        analysis:
          'Peloton transforms a long-term health investment into an immediately rewarding experience. Badges, streaks, and social interaction provide the dopamine hit that present-biased brains crave, while the underlying behavior (regular exercise) delivers compounding long-term health benefits.',
      },
      {
        company: 'Noom',
        product: 'Behavior Change Program',
        url: 'https://www.noom.com',
        description:
          'Noom uses daily micro-lessons, immediate logging feedback, and gradual behavior change rather than dramatic diets. Each small action gets positive reinforcement while the program guides users toward long-term weight management.',
        effectiveness: 'effective',
        analysis:
          'Noom directly addresses present bias by breaking long-term weight loss into daily micro-behaviors. Immediate feedback (food logging, daily weight, lesson completion) makes each day feel rewarding, while cognitive behavioral techniques help users reframe the present-vs-future trade-off.',
      },
      {
        company: 'Various Banks',
        product: 'Credit Card Minimum Payment Disclosures',
        url: 'https://www.consumerfinance.gov/credit-cards/',
        description:
          'After the CARD Act of 2009, US credit card statements must show how long it takes to pay off balance with minimum payments and the total interest cost. This regulatory intervention directly combats present bias in financial decisions.',
        effectiveness: 'effective',
        analysis:
          'A regulatory response to the financial industry exploiting present bias. By requiring clear disclosure of long-term costs ("Paying minimum will take 14 years and cost $3,200 in interest"), the law forces present-biased information into the moment of decision. Studies show it increased average payments by 10-20%.',
      },
    ],

    abTests: [
      {
        title: 'Savings App: Growth Projection vs No Projection',
        hypothesis:
          'Showing concrete future savings projections will increase savings enrollment',
        controlVersion: {
          description:
            'Savings feature with generic messaging: "Start saving today for a better tomorrow. Every dollar counts."',
          metrics: {
            conversionRate: '14%',
            averageDeposit: '$25',
            retentionRate30Day: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Savings feature with personalized projection: "Save $25/week and you\'ll have $6,825 in 5 years (with 4% returns). That\'s enough for a vacation to Europe."',
          metrics: {
            conversionRate: '31%',
            averageDeposit: '$32',
            retentionRate30Day: '54%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Concrete, personalized future projections more than doubled enrollment. Users who could visualize a specific outcome (European vacation) were far more motivated than those receiving abstract encouragement. The tangible future made the present sacrifice feel worthwhile.',
          learnings: [
            'Concrete future outcomes ("European vacation") outperform abstract ("better tomorrow")',
            'Personalized projections based on user-chosen amounts feel more achievable',
            'Combining specific dollar amounts with lifestyle outcomes maximizes motivation',
            '30-day retention also improved, suggesting sustained behavior change',
          ],
        },
      },
      {
        title: 'E-commerce: Cooling-Off Period vs Instant Checkout',
        hypothesis:
          'Adding a 24-hour wishlist prompt for items over $100 will reduce returns without hurting revenue',
        controlVersion: {
          description:
            'Standard one-click checkout for all items, no friction regardless of price',
          metrics: {
            conversionRate: '8.2%',
            returnRate: '23%',
            customerSatisfaction: '3.4/5',
          },
        },
        treatmentVersion: {
          description:
            'Items over $100 get a "Save to wishlist and sleep on it" prompt with a 10% discount if purchased after 24 hours. One-click still available but secondary.',
          metrics: {
            conversionRate: '7.1%',
            returnRate: '11%',
            customerSatisfaction: '4.1/5',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While immediate conversion dipped slightly (-13%), returns dropped by 52% and customer satisfaction rose significantly. Net revenue was actually higher due to fewer returns and processing costs. Users appreciated the "nudge" to think before buying.',
          learnings: [
            'Beneficial friction for large purchases reduces regret-driven returns',
            'Users appreciate protection from their own present bias',
            'The 10% delayed-purchase discount leverages present bias ethically (rewarding patience)',
            'Net revenue improves when accounting for return costs and customer lifetime value',
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
        name: 'Immediate Reward Emphasis',
        description:
          'Prominent display of instant benefits, rewards, or gratification while future costs are minimized',
        howToSpot:
          'Look for large "Buy Now" buttons, countdown timers, flash sale banners, and instant gratification language without corresponding long-term cost information',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Hidden Long-Term Costs',
        description:
          'Small, low-contrast, or buried text showing total costs, annual commitments, or cancellation fees',
        howToSpot:
          'Check for tiny footer text about billing cycles, commitment periods, or fees that contrast with prominent monthly prices',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Frictionless Impulse Paths',
        description:
          'One-click purchase flows, auto-enrolled subscriptions, or zero-friction checkout for high-value items',
        howToSpot:
          'Look for missing confirmation steps, absent wishlists, or no cooling-off prompts for purchases over a significant amount',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Commitment Device Presence',
        description:
          'Features that help users precommit to long-term goals: auto-transfers, goal locks, scheduled actions',
        howToSpot:
          'Look for auto-save features, spending limits, goal-setting interfaces, and scheduling tools that bind future behavior',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Future Self Visualization',
        description:
          'Projections, growth charts, or future-state previews that make delayed outcomes feel tangible',
        howToSpot:
          'Check for savings growth curves, health metric projections, progress timelines, or "future you" messaging',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Immediate Gratification Pattern',
        description: 'Interface emphasizes instant rewards while delaying or hiding long-term consequences',
        indicators: [
          'Large, prominent "instant" or "now" language',
          'One-click purchasing without confirmation',
          'Countdown timers creating artificial urgency',
          'Monthly prices shown prominently, annual costs buried',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Commitment Device Pattern',
        description: 'Features allowing users to bind their future behavior during moments of motivation',
        indicators: [
          'Auto-transfer or auto-save setup flows',
          'Goal-setting with accountability features',
          'Spending limit controls',
          'Scheduled future actions that are hard to undo impulsively',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Future Projection Pattern',
        description: 'Visualizations or calculations that make future outcomes concrete and tangible',
        indicators: [
          'Savings growth charts or projections',
          'Health metric trend lines and forecasts',
          'Total cost calculators for subscriptions',
          'Personalized milestone timelines',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Micro-Reward Pattern',
        description: 'Immediate positive feedback for behaviors that have primarily long-term benefits',
        indicators: [
          'Achievement badges for saving or exercising',
          'Streak counters and daily milestones',
          'Celebratory animations after beneficial actions',
          'Social sharing of long-term progress',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface show both immediate cost and total long-term cost prominently?',
      'Are there commitment devices that help users follow through on their stated goals?',
      'Is there immediate positive feedback for behaviors with delayed payoffs?',
      'Are future outcomes visualized concretely (specific numbers, timelines, milestones)?',
      'Is there beneficial friction for impulsive high-value decisions?',
      'Does the checkout flow give users a chance to reconsider large purchases?',
      'Are subscription costs shown both monthly and annually?',
      'Does the design exploit urgency and scarcity to override deliberate thinking?',
      'Are there cooling-off periods or wishlist features for impulse-prone categories?',
      'Is the cancellation process as easy as the sign-up process?',
      'Does the design help users bridge the empathy gap with their future self?',
      'Are minimum payment UIs accompanied by total repayment cost projections?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in present bias and temporal discounting.

Analyze the provided design for present bias patterns. Identify:

1. **Immediate Reward Emphasis**: How the interface highlights instant benefits, gratification, or savings
2. **Long-Term Cost Visibility**: Whether future costs, commitments, or consequences are clearly shown or hidden
3. **Commitment Devices**: Features that help users precommit to long-term goals
4. **Future Self Connection**: How the design bridges the gap between present and future self
5. **Impulse vs Deliberation**: Whether the interface encourages impulsive or thoughtful decisions

For each pattern found:
- Identify whether present bias is being exploited or mitigated
- Assess the ethical implications of the design choice
- Determine the impact on user long-term wellbeing
- Evaluate whether commitment devices are available and effective
- Suggest improvements for ethical present bias management

Consider:
- Are long-term costs as visible as short-term benefits?
- Do commitment devices respect user autonomy while enabling better choices?
- Are future projections concrete and personalized?
- Is there beneficial friction for high-stakes impulsive decisions?
- Does the design help or harm users' long-term financial/health/productivity goals?

Provide actionable recommendations for ethical design that helps users overcome present bias.`,

    outputSchema: {
      type: 'object',
      properties: {
        presentBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              direction: { type: 'string' },
              immediateRewardEmphasis: { type: 'string' },
              longTermCostVisibility: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'direction',
              'immediateRewardEmphasis',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            immediateRewardEmphasis: { type: 'number' },
            longTermCostTransparency: { type: 'number' },
            commitmentDevicePresence: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'immediateRewardEmphasis',
            'longTermCostTransparency',
            'commitmentDevicePresence',
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
        'presentBiasPatterns',
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
        title: 'Identify Present-Future Trade-Offs',
        description:
          'Map every point in your product where users face a choice between immediate gratification and long-term benefit',
        example:
          'Goal: Identify that checkout flow, subscription sign-up, and savings enrollment all involve present-vs-future trade-offs',
        tips: [
          'Look for spending decisions, commitment decisions, and habit-formation flows',
          'Consider both directions: exploiting present bias (bad) and mitigating it (good)',
          'Map the user\'s stated long-term goals alongside their in-the-moment decisions',
        ],
      },
      {
        step: 2,
        title: 'Make Future Consequences Tangible',
        description:
          'Transform abstract future outcomes into concrete, personalized, vivid projections',
        example:
          'Instead of "Save for retirement", show "At $200/month, you\'ll have $312,000 by age 65 — enough to travel for 8 years"',
        tips: [
          'Use specific dollar amounts, dates, and lifestyle outcomes',
          'Personalize projections based on user data and choices',
          'Show growth curves and milestone timelines, not just end states',
        ],
      },
      {
        step: 3,
        title: 'Design Commitment Devices',
        description:
          'Build features that let users bind their future behavior during moments of high motivation',
        example:
          'Offer auto-transfer savings, spending limits, and goal locks that users set during goal-planning sessions',
        tips: [
          'Offer both soft commitments (reminders) and hard commitments (locks)',
          'Time commitment prompts for peak motivation moments',
          'Make it easy to set commitments but require deliberation to break them',
        ],
      },
      {
        step: 4,
        title: 'Provide Immediate Rewards for Long-Term Behaviors',
        description:
          'Create micro-rewards that make beneficial long-term behaviors feel good right now',
        example:
          'Celebrate each savings deposit with animations, badges, and streak counters',
        tips: [
          'Use streaks, badges, progress bars, and celebratory animations',
          'Make the immediate reward proportional to the long-term behavior value',
          'Vary rewards to prevent habituation',
        ],
      },
      {
        step: 5,
        title: 'Add Beneficial Friction for Impulsive Decisions',
        description:
          'Introduce thoughtful friction points that protect users from regrettable impulse decisions',
        example:
          'For purchases over $100, show a "Sleep on it" option with a wishlist save and optional 24-hour discount',
        tips: [
          'Scale friction to decision magnitude — small purchases need less',
          'Frame friction as helpful, not obstructive ("Want to think about it?")',
          'Test friction carefully to avoid hurting legitimate conversions',
        ],
      },
    ],

    dos: [
      'Show total long-term cost alongside monthly prices for all subscriptions',
      'Provide concrete, personalized future projections for savings and health goals',
      'Offer commitment devices during moments of high user motivation',
      'Create immediate micro-rewards (badges, streaks) for long-term beneficial behaviors',
      'Add cooling-off periods or wishlists for large impulse purchases',
      'Make cancellation as easy as sign-up for subscriptions',
      'Use future-self visualization to bridge the empathy gap',
      'Display both immediate and long-term consequences of financial decisions',
    ],

    donts: [
      'Don\'t hide long-term costs in fine print to exploit present bias',
      'Don\'t use countdown timers purely to create artificial urgency',
      'Don\'t make cancellation harder than enrollment (dark pattern)',
      'Don\'t show only minimum payments without total repayment cost',
      'Don\'t remove all friction from high-value impulse purchases',
      'Don\'t exploit present bias to trap users in costly subscriptions',
      'Don\'t frame immediate spending as "saving" (e.g., "You saved $30!" on a purchase)',
      'Don\'t use present bias tactics on financially vulnerable users',
    ],

    bestPractices: [
      {
        title: 'Dual Display: Now and Later',
        description:
          'Always show both the immediate cost/benefit and the long-term cost/benefit side by side',
        rationale:
          'Users cannot overcome present bias if they do not have access to future-oriented information at the moment of decision',
        example:
          'Subscription page: "$9.99/month" next to "= $119.88/year" in equal-sized text',
      },
      {
        title: 'Automate the Virtuous Choice',
        description:
          'Default to the option that aligns with users\' stated long-term goals',
        rationale:
          'Present bias means users will take the path of least resistance; make that path the beneficial one',
        example:
          'Auto-enroll in 401(k) with opt-out rather than opt-in; auto-enable savings round-ups',
      },
      {
        title: 'Celebrate Small Wins Immediately',
        description:
          'Provide instant positive feedback for each step toward a long-term goal',
        rationale:
          'The brain needs immediate reward signals to sustain long-term behavior; micro-celebrations bridge the temporal gap',
        example:
          'Show confetti animation + "You\'re $50 closer to your vacation fund!" after each savings transfer',
      },
      {
        title: 'Precommitment at Peak Motivation',
        description:
          'Offer commitment features during moments when users are most motivated and future-oriented',
        rationale:
          'Motivation fluctuates; capturing commitment during peaks helps users ride through present-biased troughs',
        example:
          'After a user completes a workout, prompt: "Want to schedule your next 3 workouts now?"',
      },
      {
        title: 'Make Future Self Real',
        description:
          'Use personalization, concrete projections, and future-self imagery to reduce temporal self-discontinuity',
        rationale:
          'People who feel connected to their future self make more future-oriented decisions',
        example:
          'Show personalized savings milestones tied to life goals: "Trip to Japan fund: 47% complete"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure long-term cost information is programmatically associated with pricing',
        implementation:
          'Use ARIA descriptions or visible labels to link monthly prices with annual totals so screen readers announce both together',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to distinguish immediate vs long-term information',
        implementation:
          'Combine color coding (green for growth, red for cost) with text labels, icons, and semantic HTML so all users perceive the distinction',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Ensure commitment devices and savings controls are fully keyboard accessible',
        implementation:
          'All sliders, goal-setting controls, and commitment toggles must be operable via keyboard with clear focus indicators',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial) - Provide confirmation for financial commitments',
        implementation:
          'Require explicit confirmation for subscriptions, auto-transfers, and spending locks. Allow users to review total costs before committing.',
      },
    ],

    ethics: [
      {
        concern: 'Subscription Traps',
        severity: 'critical',
        explanation:
          'Exploiting present bias to lock users into subscriptions they do not fully understand, with cancellation made deliberately difficult',
        mitigation:
          'Show total commitment cost prominently. Make cancellation as easy as sign-up. Provide clear reminders before renewal. Offer flexible commitment lengths.',
      },
      {
        concern: 'Hidden Long-Term Costs',
        severity: 'critical',
        explanation:
          'Burying annual costs, interest charges, or fees in fine print while emphasizing low immediate prices',
        mitigation:
          'Display total long-term cost in the same visual weight as monthly price. Use cost calculators and projections. Follow FTC and CFPB disclosure guidelines.',
      },
      {
        concern: 'Exploiting Financial Vulnerability',
        severity: 'critical',
        explanation:
          'Targeting payday loans, high-interest credit, or "buy now pay later" at users who are financially stressed and maximally present-biased',
        mitigation:
          'Show total repayment costs upfront. Provide financial literacy resources. Consider affordability checks. Offer alternatives to high-interest options.',
      },
      {
        concern: 'Artificial Urgency',
        severity: 'high',
        explanation:
          'Using fake countdown timers, false scarcity, or pressure tactics to override users\' deliberative thinking',
        mitigation:
          'Only use genuine urgency (real inventory limits, actual deadlines). Clearly distinguish real deadlines from marketing pressure. Allow saves and wishlists.',
      },
      {
        concern: 'Paternalistic Overreach',
        severity: 'medium',
        explanation:
          'Commitment devices that are too rigid, preventing users from making legitimate changes to their plans',
        mitigation:
          'Allow users to modify commitments with appropriate friction (not zero friction, not impossible). Respect user autonomy while providing guardrails.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Doing It Now or Later',
        author: 'O\'Donoghue, T., & Rabin, M.',
        year: 1999,
        doi: '10.1257/aer.89.1.103',
        description:
          'Seminal paper modeling present bias and its implications for procrastination and precommitment',
        type: 'foundational',
      },
      {
        title: 'Golden Eggs and Hyperbolic Discounting',
        author: 'Laibson, D.',
        year: 1997,
        doi: '10.1162/003355397555253',
        description:
          'Foundational economic model of present bias using hyperbolic discounting with applications to savings behavior',
        type: 'foundational',
      },
      {
        title: 'Time Discounting and Time Preference: A Critical Review',
        author: 'Frederick, S., Loewenstein, G., & O\'Donoghue, T.',
        year: 2002,
        doi: '10.1257/002205102320161311',
        description:
          'Comprehensive review of temporal discounting research, including present bias and its behavioral implications',
        type: 'advanced',
      },
      {
        title: 'Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving',
        author: 'Thaler, R. H., & Benartzi, S.',
        year: 2004,
        doi: '10.1086/380085',
        description:
          'Landmark study on using commitment devices to overcome present bias in retirement savings',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, Richard H., & Sunstein, Cass R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Foundational book on choice architecture and commitment devices for overcoming present bias',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Accessible account of behavioral economics research, including extensive coverage of present bias and temporal discounting',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of dual-system decision-making underlying present bias',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Present Bias in UX: Designing for Long-Term User Goals',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/present-bias/',
        description:
          'Practical UX guide to designing for present bias, with examples of commitment devices and future visualization',
        type: 'practical',
      },
      {
        title: 'How Behavioral Economics Can Help Design Better Products',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/behavioral-economics-in-ux',
        description:
          'Overview of behavioral economics principles including present bias applied to product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Battle Between Your Present and Future Self',
        author: 'TED-Ed (Daniel Goldstein)',
        url: 'https://www.youtube.com/watch?v=xs0eXbuFBms',
        description:
          'Animated explanation of present bias and future-self disconnect with practical implications',
        type: 'foundational',
      },
      {
        title: 'Save More Tomorrow',
        author: 'Shlomo Benartzi (TED)',
        url: 'https://www.ted.com/talks/shlomo_benartzi_saving_for_tomorrow_tomorrow',
        description:
          'TED talk on using behavioral science to overcome present bias in retirement savings',
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
      'loss-aversion', // Loss framing makes future costs feel more urgent
      'status-quo-bias', // Defaults and auto-enrollment leverage both biases
      'hyperbolic-discounting', // The mathematical model underlying present bias
      'commitment-bias', // Once committed, users follow through despite present-bias pulls
    ],

    conflicts: [
      'delayed-gratification', // The ability to overcome present bias
      'planning-fallacy', // Over-optimistic future planning conflicts with present-biased action
    ],

    confusedWith: [
      'hyperbolic-discounting', // The mechanism; present bias is the behavioral consequence
      'impulsivity', // A trait, not a bias; related but distinct
      'temporal-discounting', // Broader category that includes present bias
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'procrastination',
        'impulse-buying',
        'undersaving',
      ],
    },
  },
};
