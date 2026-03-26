/**
 * HYPERBOLIC DISCOUNTING
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const hyperbolicDiscounting: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'hyperbolic-discounting',
    name: 'Hyperbolic Discounting',
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
    simple: 'We heavily prefer rewards available now over larger rewards available later, with our preferences reversing illogically as both options move further into the future.',

    detailed: `Hyperbolic Discounting is the tendency to disproportionately prefer smaller, immediate rewards over larger, delayed rewards—and to inconsistently reverse these preferences when both options are equally delayed into the future.

**The Paradox**:

**Now**:
- Would you rather have $10 today or $15 in a week?
- Most people choose $10 today

**Future**:
- Would you rather have $10 in 52 weeks or $15 in 53 weeks?
- Most people choose $15 in 53 weeks (same one-week delay!)

This inconsistency reveals that we don't discount future rewards at a constant rate (exponential discounting). Instead, we use **hyperbolic discounting**: the value of a reward drops dramatically as it moves from "now" to "soon," but drops much more slowly as it moves from "far" to "farther."

**Mathematical Pattern**:
- **Exponential** (rational): Value = Reward / (1 + k×t)
- **Hyperbolic** (actual): Value = Reward / (1 + k×t)^a where a < 1

The hyperbolic curve creates steep drops for near-term delays and flatter curves for far-future delays.

**Key Manifestations**:

1. **Present Bias**: Now is special; we heavily favor immediate gratification
2. **Preference Reversal**: "I'll exercise tomorrow" → tomorrow comes → "I'll exercise tomorrow"
3. **Procrastination**: Immediate costs (effort to start) outweigh delayed benefits (completed work)
4. **Impulsivity**: Can't resist immediate temptations even when we value long-term goals
5. **Dynamic Inconsistency**: Our future self wants different things than our present self

**Real-World Examples**:

- **Diet**: "I'll start eating healthy tomorrow" → tomorrow → order dessert today
- **Savings**: Know we should save for retirement, but spend on immediate wants
- **Exercise**: Value being fit (long-term) but skip gym (immediate discomfort)
- **Procrastination**: Delay work (immediate relief) despite deadline stress (future pain)
- **Subscription Fees**: Pay monthly (now) rather than annual (larger immediate cost, lower total)
- **Credit Cards**: Buy now, pay later (discounting future financial pain)

**In Digital Products**:

**User Behavior**:
- Click "Remind me later" on beneficial updates (future benefit, immediate interruption cost)
- Skip security steps (immediate friction, delayed risk)
- Choose free shipping with delay over fast paid shipping
- Binge content now, regret wasted time later
- Skip saving/backing up data until after disaster

**Product Design Exploitation**:
- Free trials that auto-convert to paid (immediate gain, delayed cost)
- "Buy now, pay later" schemes
- Countdown timers creating false urgency
- One-click purchases reducing friction for impulsive buying
- Infinite scroll exploiting preference for immediate next-item reward

The design challenge: Should we exploit present bias for business gain, or help users make decisions aligned with their long-term interests?`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `People prefer smaller, immediate rewards over larger, delayed rewards because the brain's reward system assigns disproportionately high value to "now." The present value of a future reward drops steeply for short delays, then levels off for longer delays, forming a hyperbolic (rather than exponential) discount curve. This happens because:

1. **Limbic System Activation**: Immediate rewards activate the brain's mesolimbic dopamine pathway, producing strong emotional pull toward instant gratification
2. **Prefrontal Cortex Override Failure**: The rational planning system (prefrontal cortex) struggles to override the emotional reward system when immediate options are available
3. **Temporal Construal**: Near-future events are processed concretely (vivid, emotional), while far-future events are abstract (less motivating)
4. **Uncertainty Discounting**: The brain treats delay as implicit risk—a reward available now is certain, while a future reward might not materialize
5. **Visceral State Influence**: Current desires (hunger, fatigue, boredom) amplify the value of immediate relief and diminish the appeal of delayed benefits

The result is dynamic inconsistency: our future self makes plans that our present self systematically violates when the moment of choice arrives.`,
    },

    realWorldExample: `**The Fitness App Paradox**:

**Sunday Night (Planning Mode)**:
- User: "I'm going to work out 5x this week! I'll wake up at 6am and run every morning before work."
- Downloads fitness app, sets ambitious goals
- Feels motivated, excited about future fit self
- Long-term benefits (health, appearance, energy) feel compelling
- Immediate costs (early wake-up, exercise discomfort) feel manageable when they're in the future

**Monday Morning 6am (Execution Mode)**:
- Alarm goes off
- Immediate cost: Bed is warm and comfortable, body is tired, it's dark outside
- Immediate benefit of hitting snooze: 30 more minutes of sleep
- Delayed benefit of working out: Months away fitness, abstract health
- User hits snooze
- Later justifies: "I'll go to the gym after work instead"

**Monday Evening (Re-Planning)**:
- After work, tired from day
- Immediate cost: Gym requires changing, driving, sweating, discomfort
- Immediate benefit: Can go home, relax, watch TV, eat dinner
- Delayed benefit: Still that abstract future fitness
- User: "I'm too tired today. I'll definitely go tomorrow."
- **Preference reversal**: Tomorrow becomes today, pattern repeats

**Result**:
- User wanted to work out 5x/week
- Actually works out 0-1x/week
- Blames "lack of motivation" (actually: hyperbolic discounting)
- Continues paying for gym membership (more present bias: canceling requires immediate effort)
- Future self keeps making plans; present self keeps choosing comfort

**Product Design That Exploits This**:

**Free Trials**:
- "Try free for 30 days, then $9.99/month"
- Present self: "Free now! Awesome!" (immediate benefit)
- Future self: "$9.99/month" (delayed cost, heavily discounted)
- Day 30: Canceling requires immediate effort; keeping subscription is passive
- User pays for months/years of subscription they don't use

**One-Click Purchasing**:
- "Buy now with 1-click"
- Present self: "I want this! So easy!" (immediate satisfaction, minimal friction)
- Future self: Credit card bill (delayed pain, discounted)
- Result: Impulsive purchases that future self regrets

**Auto-Play & Infinite Scroll**:
- "Next episode starts in 5 seconds..."
- Present self: "One more episode!" (immediate entertainment)
- Future self: "I stayed up too late, missed morning workout" (delayed regret)
- Result: Binge behavior that violates user's long-term interests

The pattern: Immediate benefits are vivid and compelling; delayed costs are abstract and easy to discount.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Hyperbolic Discounting profoundly shapes how users interact with digital products. Users disproportionately value immediate rewards, instant feedback, and zero-delay experiences. Designers can leverage this to:

- Increase engagement by providing instant gratification and immediate feedback loops
- Boost conversions with "instant access" framing and minimal time-to-value
- Drive purchases through "buy now, pay later" and one-click checkout patterns
- Improve onboarding by front-loading value and deferring complexity
- Reduce churn by making the immediate experience rewarding while building long-term habits`,

    whenToUse: [
      {
        title: 'Instant Access CTAs',
        scenario:
          'When users are deciding whether to sign up, purchase, or engage with a product',
        example:
          'Use "Get Instant Access" or "Start Free Now" instead of "Sign Up for Our Service" to emphasize immediacy',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'One-Click Checkout',
        scenario: 'When reducing friction in the purchase flow to capitalize on buying intent',
        example:
          'Amazon-style one-click purchasing removes delay between desire and acquisition, leveraging present bias',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Immediate Rewards in Onboarding',
        scenario: 'When new users need motivation to complete setup steps',
        example:
          'Award badges, unlock features, or show a quick win within the first 60 seconds of onboarding',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Free Trial Conversion',
        scenario: 'When converting free users to paid plans',
        example:
          'Offer full access immediately with payment deferred: "Try everything free for 14 days, pay only if you love it"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Gamification Reward Loops',
        scenario: 'When sustaining engagement in learning, fitness, or productivity apps',
        example:
          'Deliver small immediate rewards (points, streaks, animations) for each completed action rather than only long-term outcomes',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Instant Download vs Shipping',
        scenario: 'When offering both digital and physical product options',
        example:
          'Highlight "Download instantly" for digital products vs multi-day shipping for physical ones to drive digital sales',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Long-Term Financial Decisions',
        reason:
          'Exploiting present bias can lead users into debt, subscriptions they cannot afford, or poor financial choices',
        consequence:
          'Users accumulate BNPL debt, forget about trial conversions, or make impulsive purchases they regret',
        alternative:
          'Show total cost prominently, include cooling-off periods, and provide clear cancellation paths',
      },
      {
        title: 'Health and Safety Contexts',
        reason:
          'Encouraging impulsive action in medical, dietary, or safety contexts can cause real harm',
        consequence:
          'Users skip important steps, ignore warnings, or make hasty health decisions they later regret',
        alternative:
          'Build in deliberate pauses, require confirmation steps, and present long-term consequences clearly',
      },
      {
        title: 'Children and Vulnerable Users',
        reason:
          'Young users and those with impulse-control challenges are especially susceptible to present bias exploitation',
        consequence:
          'Excessive in-app purchases, addictive usage patterns, and financial harm to families',
        alternative:
          'Implement spending limits, parental controls, and deliberate friction for high-stakes actions',
      },
      {
        title: 'Subscription Dark Patterns',
        reason:
          'Using present bias to trap users in subscriptions they forget or struggle to cancel is manipulative',
        consequence:
          'Regulatory penalties, brand damage, class-action lawsuits, and loss of user trust',
        alternative:
          'Make cancellation as easy as sign-up, send renewal reminders, and be transparent about recurring charges',
      },
    ],

    commonMistakes: [
      {
        title: 'Hiding Delayed Costs',
        description:
          'Emphasizing "free now" or "pay later" while burying the actual future cost in fine print',
        why: 'Users feel deceived when the bill arrives, destroying trust and increasing churn',
        fix: 'Show both the immediate benefit and the future cost with equal visual prominence',
      },
      {
        title: 'Removing All Friction Indiscriminately',
        description:
          'Making every action instant and frictionless, including high-stakes decisions',
        why: 'Zero friction on important choices (large purchases, data deletion, account changes) leads to regret and support burden',
        fix: 'Add proportional friction: instant for low-stakes, confirmation steps for high-stakes actions',
      },
      {
        title: 'Over-Rewarding Short-Term at Expense of Long-Term',
        description:
          'Flooding users with immediate dopamine hits (badges, notifications, streaks) without building lasting value',
        why: 'Users become dependent on extrinsic rewards and disengage when novelty wears off',
        fix: 'Pair immediate rewards with progress toward meaningful long-term goals the user cares about',
      },
      {
        title: 'Ignoring Preference Reversal in Retention',
        description:
          'Assuming users who signed up enthusiastically will stay engaged without ongoing immediate value',
        why: 'The present bias that drove sign-up also drives cancellation: when the next payment is "now," the cost feels larger',
        fix: 'Continuously deliver immediate value; remind users of recent benefits before renewal dates',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how quickly users reach value and perceive immediacy',
        examples: [
          'Above-the-fold CTAs with "instant" language reduce perceived delay',
          'Progress bars showing immediate advancement create a sense of instant reward',
          'Placing the primary action prominently reduces time-to-value',
          'Showing product previews or demos above the fold delivers instant gratification',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing shapes whether users perceive value as immediate or delayed',
        examples: [
          '"Get it now" vs "Order today" creates different urgency perceptions',
          'Bold, large "Instant" or "Immediate" labels emphasize zero delay',
          'Small print for future costs reduces perceived weight of delayed charges',
          'Countdown typography ("Starts in 3... 2... 1...") creates temporal urgency',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals immediacy, urgency, and reward availability',
        examples: [
          'Green "Available Now" badges signal immediate reward availability',
          'Bright, saturated CTA colors create urgency and action impulse',
          'Pulsing or glowing effects on "instant" actions draw attention to immediacy',
          'Muted tones on delayed options (shipping, waiting periods) reduce their appeal',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction speed and feedback timing directly exploit or mitigate present bias',
        examples: [
          'One-click actions minimize the gap between desire and fulfillment',
          'Instant visual feedback (animations, confetti, checkmarks) rewards action immediately',
          'Auto-play and auto-advance remove the delay cost of choosing to continue',
          'Skeleton screens and optimistic UI make load times feel instant',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users focus on immediate or future value',
        examples: [
          '"Start streaming now" vs "Subscribe to our service" frames value as immediate',
          '"Pay in 4 easy installments" reduces the perceived immediate cost of purchase',
          'Showing what you get today vs what you pay later leverages temporal asymmetry',
          '"Instant download" vs "Ships in 3-5 days" drives digital product preference',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must ensure immediacy cues are perceivable by all users and that present bias exploitation does not disproportionately harm users with cognitive disabilities',
        examples: [
          'Screen reader users may miss visual urgency cues (pulsing, color, countdown animations)',
          'ARIA live regions should announce time-sensitive offers so all users receive urgency signals equally',
          'Cognitive accessibility: users with impulse-control challenges need visible cooling-off affordances',
          'Ensure "cancel" and "opt out" paths are as accessible as "buy now" paths',
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
        title: 'Ethical Instant Access with Transparent Future Cost',
        description:
          'SaaS product offering instant access with clear future pricing',
        code: `<div class="trial-offer">
  <h3>Start Building Today</h3>
  <div class="instant-value">
    <span class="badge-instant">Instant Access</span>
    <p>Full features, no credit card required</p>
  </div>
  <button class="primary-cta">Get Instant Access — Free for 14 Days</button>
  <div class="future-cost">
    <p>Then <strong>$29/month</strong> — cancel anytime with one click</p>
    <p class="reminder">We'll email you 3 days before your trial ends</p>
  </div>
</div>`,
        explanation:
          'Leverages present bias with "Instant Access" framing while being transparent about future cost. The reminder notice and easy cancellation language build trust and reduce regret.',
        principle:
          'Pair immediate gratification with honest future cost disclosure',
        metrics: {
          before: '8% trial sign-up with generic "Start Free Trial" button',
          after: '14% trial sign-up with "Get Instant Access" + transparent pricing',
          improvement: '75% increase in trial starts with lower cancellation-related support tickets',
        },
      },
      {
        title: 'Immediate Reward Onboarding',
        description:
          'App delivering a quick win within the first 60 seconds of use',
        code: `<div class="onboarding-instant-win">
  <h3>Your First Report is Ready!</h3>
  <div class="instant-result">
    <div class="report-preview">
      <span class="generated-badge">Generated in 3 seconds</span>
      <div class="preview-content">
        <p class="insight">Your website loads 2.3s slower than competitors</p>
        <p class="action">We found 4 quick fixes — see them now</p>
      </div>
    </div>
  </div>
  <button class="primary">See Your Full Report</button>
  <p class="progress">Step 1 of 3 complete — unlock deeper insights next</p>
</div>`,
        explanation:
          'Delivers immediate, personalized value before asking the user to invest further time. The instant result validates the sign-up decision and creates momentum through present bias.',
        principle:
          'Front-load value to leverage present bias for onboarding completion',
      },
      {
        title: 'Gamified Learning with Immediate Feedback',
        description:
          'Educational app providing instant rewards for each completed lesson',
        code: `<div class="lesson-complete">
  <div class="instant-reward">
    <div class="animation-burst"><!-- confetti animation --></div>
    <h3>Lesson Complete!</h3>
    <div class="reward-earned">
      <span class="xp">+50 XP</span>
      <span class="streak">7-day streak!</span>
    </div>
  </div>
  <div class="long-term-progress">
    <div class="progress-bar" style="width: 35%"></div>
    <p>35% toward your "Conversational Spanish" goal</p>
    <p class="estimate">At this pace, you'll reach it in 6 weeks</p>
  </div>
  <button class="primary">Next Lesson — Earn 50 More XP</button>
</div>`,
        explanation:
          'Provides instant gratification (XP, streak, confetti) while connecting it to meaningful long-term progress. Bridges the gap between immediate reward and delayed benefit.',
        principle:
          'Use immediate micro-rewards as stepping stones toward long-term goals',
      },
    ],

    bad: [
      {
        title: 'Hidden BNPL True Cost',
        description:
          'Buy Now Pay Later service hiding total cost and interest',
        code: `<!-- DON'T DO THIS -->
<div class="bnpl-offer">
  <h2>Get It Now — Pay Just $12.50!</h2>
  <p class="big-text">4 easy payments of $12.50</p>
  <button class="buy-now">Buy Now, Pay Later!</button>
  <small style="color: #ccc; font-size: 0.6em;">
    *Total cost $50.00 + $8.99 late fees per missed payment.
    19.9% APR on overdue balances. See terms.
  </small>
</div>`,
        explanation:
          'Exploits present bias by making the immediate payment feel tiny while hiding the total cost and severe late fee penalties in barely-readable fine print. Users focus on "$12.50 now" and discount the future pain.',
        principle:
          'Never exploit present bias to hide future financial harm',
      },
      {
        title: 'Manipulative Free Trial Auto-Conversion',
        description:
          'Free trial that makes cancellation deliberately difficult',
        code: `<!-- DON'T DO THIS -->
<div class="trial-signup">
  <h2>Try FREE for 7 Days!</h2>
  <p>Full access to everything, instantly!</p>
  <form>
    <input type="text" placeholder="Credit card number" required>
    <button class="cta">Start My Free Trial</button>
  </form>
  <small style="color: #ddd; font-size: 0.5em;">
    Auto-renews at $49.99/mo. To cancel, call 1-800-XXX
    between 9am-5pm EST, Mon-Fri only.
  </small>
</div>`,
        explanation:
          'Combines present bias ("FREE! Instantly!") with dark patterns: requires credit card upfront, auto-converts at high price, and makes cancellation deliberately friction-heavy. This exploits the same temporal asymmetry it uses for sign-up.',
        principle:
          'Cancellation friction should never exceed sign-up friction',
      },
      {
        title: 'Addictive Instant Reward Loop Without Value',
        description:
          'Mobile game using endless dopamine hits to drive in-app purchases',
        code: `<!-- DON'T DO THIS -->
<div class="reward-popup">
  <h2>YOU WON! Claim Your Prize NOW!</h2>
  <div class="spinning-wheel"><!-- flashy animation --></div>
  <p>Open this chest for FREE! (Next free chest in 23:59:59)</p>
  <button class="primary pulse">OPEN NOW!</button>
  <button class="secondary">Skip Wait — Buy 5 Chests for $4.99</button>
  <div class="urgency">This offer expires in 2:34!</div>
</div>`,
        explanation:
          'Combines instant reward (free chest), artificial delay (24-hour wait), urgency (countdown), and present bias (pay to skip wait) to manipulate impulsive spending. No genuine value is exchanged.',
        principle:
          'Don\'t manufacture artificial delays to exploit the desire for instant gratification',
      },
    ],

    realWorld: [
      {
        company: 'Klarna',
        product: 'Buy Now Pay Later',
        url: 'https://www.klarna.com',
        description:
          'Klarna lets shoppers split purchases into 4 interest-free installments. "Pay in 4" reduces the immediate cost perception from $200 to "just $50 today," leveraging present bias to increase purchase likelihood.',
        effectiveness: 'very-effective',
        analysis:
          'Highly effective at driving conversion—merchants report 20-30% higher average order values. However, raises ethical concerns as younger users accumulate multiple BNPL obligations, each feeling small individually but adding up to significant debt. The immediate gratification of receiving the product now while deferring cost is a textbook hyperbolic discounting exploitation.',
      },
      {
        company: 'Amazon',
        product: 'One-Click Buy & Same-Day Delivery',
        url: 'https://www.amazon.com',
        description:
          'Amazon\'s one-click purchasing eliminates all friction between desire and purchase. Same-day and next-day delivery further collapse the delay between buying and receiving, making online shopping feel nearly as instant as in-store.',
        effectiveness: 'very-effective',
        analysis:
          'The one-click patent was worth billions because it removes the cooling-off period where present bias might fade. Same-day delivery further exploits present bias by making the reward (receiving the item) nearly immediate. Together, they create a near-zero delay between impulse and gratification.',
      },
      {
        company: 'Spotify',
        product: 'Instant Streaming vs Buying Albums',
        url: 'https://www.spotify.com',
        description:
          'Spotify disrupted music purchasing by offering instant streaming of any song. Instead of paying $10 per album (immediate cost, delayed listening), users pay $10/month for instant access to everything (immediate gratification, recurring cost they discount).',
        effectiveness: 'very-effective',
        analysis:
          'The shift from ownership to instant access is pure hyperbolic discounting at scale. Users discount the recurring $10/month subscription cost because it\'s always "future money," while the benefit (any song, right now) is always immediate. Over time, users pay far more than they would buying albums, but the per-moment cost feels negligible.',
      },
      {
        company: 'Duolingo',
        product: 'Instant XP Rewards & Streaks',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo delivers immediate rewards (XP, streak counts, celebration animations) for each 5-minute lesson, bridging the gap between the immediate effort of studying and the distant goal of language fluency.',
        effectiveness: 'effective',
        analysis:
          'Ethically leverages present bias by converting a delayed reward (fluency in months/years) into many small immediate rewards (XP now, streak now, rank now). The streak mechanic is especially powerful: the immediate loss of breaking a streak outweighs the abstract gain of one more day of study. Retention is dramatically higher than traditional language courses.',
      },
    ],

    abTests: [
      {
        title: 'CTA Framing: Instant Access vs Standard Sign-Up',
        hypothesis:
          'Immediacy-framed CTAs will increase sign-up conversions by triggering present bias',
        controlVersion: {
          description:
            'Standard sign-up page with button: "Create Your Account" and description "Sign up to access our platform"',
          metrics: {
            conversionRate: '6.2%',
            timeOnPage: '2:45',
            bounceRate: '58%',
          },
        },
        treatmentVersion: {
          description:
            'Immediacy-framed page with button: "Get Instant Access" and description "Start using all features in under 60 seconds — no credit card needed"',
          metrics: {
            conversionRate: '11.4%',
            timeOnPage: '1:52',
            bounceRate: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Immediacy framing nearly doubled conversion rate (+84%). Users spent less time deliberating (1:52 vs 2:45), suggesting the "instant" framing reduced the perceived cost of signing up. Bounce rate dropped 17 percentage points.',
          learnings: [
            '"Instant" and "now" language activates present bias and reduces deliberation',
            'Removing credit card requirement eliminates the only immediate cost, making it pure instant reward',
            'Time-to-value promises ("under 60 seconds") make the immediate benefit concrete',
            'Follow-up data showed no difference in 30-day retention, suggesting present bias drove sign-up without harming quality',
          ],
        },
      },
      {
        title: 'Checkout Flow: One-Click vs Multi-Step',
        hypothesis:
          'Reducing checkout steps will increase purchase completion by minimizing delay between intent and reward',
        controlVersion: {
          description:
            'Standard 4-step checkout: Cart Review → Shipping → Payment → Confirmation',
          metrics: {
            conversionRate: '23%',
            cartAbandonmentRate: '68%',
            averageOrderValue: '$67',
          },
        },
        treatmentVersion: {
          description:
            'One-click checkout for returning users with saved payment methods, plus "Buy Now" button on product pages',
          metrics: {
            conversionRate: '41%',
            cartAbandonmentRate: '34%',
            averageOrderValue: '$72',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'One-click checkout increased purchase completion by 78% and cut cart abandonment in half. Each checkout step was a moment where present bias could shift from "I want this now" to "this is taking too long." AOV also increased slightly, suggesting less time to second-guess add-ons.',
          learnings: [
            'Every additional checkout step is an opportunity for present bias to fade',
            'Saved payment methods remove the immediate cost of data entry',
            'Return rate was slightly higher (+3%), indicating some impulse purchases were regretted',
            'Ethical consideration: adding a brief order summary before final click maintained high conversion while reducing returns',
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
        name: 'Immediacy Language',
        description:
          'CTAs and headlines using words like "instant," "now," "immediately," "today," or "right away"',
        howToSpot:
          'Scan primary CTAs, hero sections, and promotional banners for time-urgency words that emphasize zero delay',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Deferred Cost Minimization',
        description:
          'Future costs displayed in smaller text, lighter color, or less prominent position than immediate benefits',
        howToSpot:
          'Compare visual weight of "free" or "instant" messaging against recurring charges, total costs, or renewal terms',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'One-Click Action Buttons',
        description:
          'Single-action purchase, subscribe, or commit buttons that eliminate deliberation steps',
        howToSpot:
          'Look for "Buy Now," "One-Click," or "Instant Checkout" buttons that bypass multi-step flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Instant Reward Indicators',
        description:
          'Visual elements showing immediate payoff: confetti, checkmarks, progress jumps, XP gains, or "unlocked" badges',
        howToSpot:
          'Check for celebratory animations, instant feedback after actions, or reward popups that appear immediately upon task completion',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Time-to-Value Promises',
        description:
          'Specific time claims like "Set up in 2 minutes," "Results in seconds," or "Start earning today"',
        howToSpot:
          'Look for numeric time claims in headlines, subheadings, and feature descriptions that promise rapid gratification',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'BNPL / Split Payment Pattern',
        description: 'Purchase price broken into smaller installments to reduce perceived immediate cost',
        indicators: ['"Pay in 4" or "Split into installments" messaging', 'Small per-payment amount displayed prominently', 'Total cost shown in fine print or not at all', 'Interest/fee terms minimized'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Free Trial Auto-Conversion Pattern',
        description: 'Free immediate access that converts to paid subscription after a delay',
        indicators: ['"Free for X days" with credit card required upfront', 'Auto-renewal terms in small text', 'Cancellation process harder than sign-up', 'No renewal reminder before charge'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Instant Gratification CTA Pattern',
        description: 'Call-to-action language emphasizing zero delay between action and reward',
        indicators: ['"Get instant access" or "Start now" buttons', '"Instant download" or "Stream immediately" framing', '"No waiting" or "Skip the line" promises', 'Countdown to when access begins'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Micro-Reward Loop Pattern',
        description: 'Frequent small immediate rewards designed to maintain engagement through present bias',
        indicators: ['Points, XP, or badges awarded for each small action', 'Streak counters that reward daily return', 'Progress bars that jump visibly after each step', 'Celebration animations after minor completions'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the CTA language emphasize immediacy ("instant," "now," "today")?',
      'Is the immediate benefit given more visual prominence than the delayed cost?',
      'Are future charges, renewal terms, or total costs clearly visible and readable?',
      'Does the checkout or sign-up flow minimize steps to reduce deliberation time?',
      'Is there a "buy now, pay later" or installment option that reduces perceived immediate cost?',
      'Do free trial terms clearly state when billing begins and how to cancel?',
      'Are immediate rewards (badges, XP, animations) connected to meaningful long-term outcomes?',
      'Is the cancellation path as frictionless as the sign-up path?',
      'Are time-to-value claims accurate and achievable?',
      'Could the immediacy design patterns cause financial harm to impulsive users?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in hyperbolic discounting and present bias.

Analyze the provided design for hyperbolic discounting patterns. Identify:

1. **Immediacy Framing**: How CTAs, headlines, and value propositions emphasize instant gratification
2. **Deferred Cost Presentation**: How future costs, commitments, or consequences are displayed relative to immediate benefits
3. **Friction Reduction**: How checkout, sign-up, or commitment flows minimize deliberation time
4. **Reward Timing**: When and how rewards, feedback, and value are delivered relative to user actions
5. **Temporal Asymmetry**: Whether the design exploits the gap between vivid immediate benefits and abstract future costs

For each pattern found:
- Identify whether it ethically leverages present bias or exploitatively manipulates it
- Assess whether future costs and commitments are transparently presented
- Determine if users can make informed decisions despite present bias pressure
- Evaluate whether vulnerable users (young, impulsive, financially stressed) are protected
- Suggest improvements for balancing immediate engagement with long-term user welfare

Consider:
- Is the design making future costs feel smaller than they are?
- Are immediate rewards connected to genuine long-term user value?
- Is the sign-up/purchase friction proportional to the commitment level?
- Does the design help users or just help the business at users' expense?
- Are there cooling-off mechanisms for high-stakes decisions?

Provide actionable recommendations for ethical, transparent use of immediacy in design.`,

    outputSchema: {
      type: 'object',
      properties: {
        temporalPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              immediacyLevel: { type: 'string' },
              deferredCostVisibility: { type: 'string' },
              userImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'immediacyLevel',
              'deferredCostVisibility',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            immediacyExploitation: { type: 'number' },
            costTransparency: { type: 'number' },
            frictionBalance: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'immediacyExploitation',
            'costTransparency',
            'frictionBalance',
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
        'temporalPatterns',
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
        title: 'Map the Temporal Value Chain',
        description:
          'Identify every point where users receive value (immediate) and incur cost (immediate or delayed) in your product flow',
        example:
          'Free trial: Immediate value = full access; Delayed cost = $29/month after 14 days; Immediate cost = entering email',
        tips: [
          'List all user touchpoints and classify each as immediate reward, delayed reward, immediate cost, or delayed cost',
          'Identify where temporal asymmetry exists (big immediate reward, hidden delayed cost)',
          'Map which costs users are likely to discount and which they will feel acutely',
        ],
      },
      {
        step: 2,
        title: 'Design for Ethical Immediacy',
        description:
          'Create genuine instant value that serves both user and business goals',
        example:
          'Instead of gating all value behind sign-up, show a live demo or instant preview that demonstrates real product value',
        tips: [
          'Front-load genuine value, not just dopamine hits',
          'Make the first 60 seconds of any experience rewarding and informative',
          'Ensure immediate rewards connect to outcomes users actually want long-term',
        ],
      },
      {
        step: 3,
        title: 'Make Future Costs Visible',
        description:
          'Present delayed costs with the same visual prominence as immediate benefits',
        example:
          '"Get instant access — then $29/month" with both parts in the same font size and color',
        tips: [
          'Show total cost over time, not just per-installment cost',
          'Send proactive reminders before trial conversions or renewals',
          'Display cost in context: "$29/month = $348/year"',
        ],
      },
      {
        step: 4,
        title: 'Calibrate Friction to Stakes',
        description:
          'Match the amount of deliberation friction to the size of the user commitment',
        example:
          'One-click for $5 purchase; confirmation screen for $500 purchase; cooling-off period for $5000 annual commitment',
        tips: [
          'Low-stakes actions can be instant (liking, bookmarking, free trials without credit card)',
          'Medium-stakes actions benefit from a brief summary (single purchase, monthly subscription)',
          'High-stakes actions need deliberate friction (annual commitments, large purchases, data deletion)',
        ],
      },
      {
        step: 5,
        title: 'Bridge Immediate and Long-Term Rewards',
        description:
          'Connect each immediate reward to progress toward the user\'s stated long-term goals',
        example:
          'After completing a lesson: "+50 XP! You\'re 35% toward Conversational Spanish"',
        tips: [
          'Always show micro-rewards in context of macro-progress',
          'Let users set their own long-term goals and show how today\'s actions contribute',
          'Use commitment devices: let users pre-commit to future actions while motivation is high',
        ],
      },
    ],

    dos: [
      'Deliver genuine immediate value that serves the user\'s real interests',
      'Make future costs as visible and concrete as immediate benefits',
      'Use immediacy to reduce friction on beneficial actions (security setup, data backup)',
      'Provide instant feedback and rewards tied to meaningful long-term outcomes',
      'Send proactive reminders before trial conversions and subscription renewals',
      'Make cancellation as easy as sign-up',
      'Use commitment devices to help users follow through on their long-term intentions',
      'Calibrate friction proportionally to the stakes of the decision',
    ],

    donts: [
      'Don\'t hide future costs in fine print while emphasizing "free now"',
      'Don\'t make cancellation harder than sign-up',
      'Don\'t exploit present bias to trap users in unwanted subscriptions',
      'Don\'t remove all friction from high-stakes financial decisions',
      'Don\'t design addictive instant-reward loops that provide no lasting value',
      'Don\'t use countdown timers to create false urgency on fabricated deadlines',
      'Don\'t target vulnerable users (children, financially stressed) with aggressive immediacy tactics',
      'Don\'t auto-convert free trials without clear advance notice',
    ],

    bestPractices: [
      {
        title: 'Transparent BNPL Presentation',
        description:
          'Show both per-installment cost and total cost with equal visual weight',
        rationale:
          'Users deserve to see the full financial picture, not just the discounted present-moment cost',
        example:
          '"4 payments of $25 (total: $100, 0% interest)" displayed together, same font size',
      },
      {
        title: 'Pre-Commitment Mechanisms',
        description:
          'Let users commit to future actions while their long-term motivation is high',
        rationale:
          'Present bias works in reverse: when a delayed action is far in the future, users value it more rationally',
        example:
          '"Schedule your workout for Monday at 7am" — committed on motivated Sunday night',
      },
      {
        title: 'Proportional Friction Design',
        description:
          'Scale confirmation friction to match the magnitude and reversibility of the action',
        rationale:
          'Zero friction on all actions exploits present bias; proportional friction respects it',
        example:
          'Free trial: one click. $50 purchase: order summary. $500 annual plan: summary + 24-hour cooling-off option',
      },
      {
        title: 'Renewal Transparency',
        description:
          'Proactively notify users before any automatic charge, with a one-click cancellation option',
        rationale:
          'Ethical retention is based on continued value delivery, not on exploiting users\' forgetfulness',
        example:
          'Email 3 days before renewal: "Your trial ends Friday. Keep your plan ($29/mo) or cancel in one click."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure temporal urgency cues have semantic equivalents',
        implementation:
          'Use ARIA labels and semantic HTML to convey urgency, countdown, and immediacy information so screen reader users receive the same temporal framing as sighted users',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Users must be able to extend or disable time-based urgency',
        implementation:
          'Countdown timers on offers must be pausable, extendable, or at minimum 20 seconds. Avoid artificial time pressure that disadvantages users who need more processing time',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Don\'t auto-submit or auto-purchase without explicit user confirmation',
        implementation:
          'One-click purchase must still require a deliberate action. Never auto-charge based on passive behavior (e.g., not canceling within a time window)',
      },
    ],

    ethics: [
      {
        concern: 'Predatory BNPL Practices',
        severity: 'critical',
        explanation:
          'Exploiting present bias to encourage spending beyond users\' means through installment payments that minimize perceived cost',
        mitigation:
          'Show total cost prominently. Include spending warnings. Offer affordability calculators. Never charge late fees without prominent advance notice.',
      },
      {
        concern: 'Dark Pattern Trial Conversions',
        severity: 'critical',
        explanation:
          'Requiring credit card for free trials, then making cancellation deliberately difficult to exploit present bias and forgetfulness',
        mitigation:
          'Offer trials without credit card when possible. Send multiple reminders before conversion. Make cancellation a one-click process, no phone calls required.',
      },
      {
        concern: 'Addictive Reward Loops',
        severity: 'high',
        explanation:
          'Designing instant-reward systems (variable-ratio reinforcement, streak mechanics) that exploit present bias to create compulsive usage patterns',
        mitigation:
          'Include usage awareness features (screen time, spend trackers). Allow users to set limits. Connect rewards to genuine progress, not just engagement metrics.',
      },
      {
        concern: 'Targeting Vulnerable Populations',
        severity: 'critical',
        explanation:
          'Children, young adults, and users with impulse-control difficulties are disproportionately susceptible to present bias exploitation',
        mitigation:
          'Implement age-appropriate design. Add spending limits and parental controls. Build in cooling-off periods for users who show impulsive behavior patterns.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Golden Eggs and Hyperbolic Discounting',
        author: 'Laibson, D.',
        year: 1997,
        doi: '10.1162/003355397555253',
        description:
          'Foundational economic paper modeling hyperbolic discounting and its implications for savings behavior and commitment devices',
        type: 'foundational',
      },
      {
        title: 'Time Discounting and Time Preference: A Critical Review',
        author: 'Frederick, S., Loewenstein, G., & O\'Donoghue, T.',
        year: 2002,
        doi: '10.1257/002205102320161311',
        description:
          'Comprehensive review of time discounting research, distinguishing hyperbolic from exponential models and surveying empirical evidence',
        type: 'foundational',
      },
      {
        title: 'Doing It Now or Later',
        author: 'O\'Donoghue, T., & Rabin, M.',
        year: 1999,
        doi: '10.1257/aer.89.1.103',
        description:
          'Explores how present-biased preferences lead to procrastination and impulsive behavior in economic contexts',
        type: 'advanced',
      },
      {
        title: 'Separate Neural Systems Value Immediate and Delayed Monetary Rewards',
        author: 'McClure, S. M., Laibson, D. I., Loewenstein, G., & Cohen, J. D.',
        year: 2004,
        doi: '10.1126/science.1100907',
        description:
          'fMRI study showing that immediate rewards activate limbic areas while delayed rewards engage prefrontal cortex, explaining the neural basis of hyperbolic discounting',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780300122237',
        description:
          'Covers present bias and hyperbolic discounting in the context of choice architecture and behavioral nudges',
        type: 'practical',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393080148',
        description:
          'Chronicles the development of behavioral economics with extensive coverage of time inconsistency and present bias',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the dual-system framework underlying hyperbolic discounting: System 1 (fast, impulsive) vs System 2 (slow, deliberate)',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'How Present Bias Affects UX Design Decisions',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/present-bias/',
        description:
          'Practical guide to understanding and designing for present bias in digital products',
        type: 'practical',
      },
      {
        title: 'Designing for Instant Gratification',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/instant-gratification',
        description:
          'UX-focused article on ethical use of immediacy in product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Battle Between Your Present and Future Self',
        author: 'TED-Ed (Daniel Goldstein)',
        url: 'https://www.youtube.com/watch?v=xs4qS7O6aYE',
        description:
          'Animated explanation of how hyperbolic discounting affects everyday decisions and what we can do about it',
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
