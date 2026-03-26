/**
 * ANTICIPATED REGRET
 *
 * Making decisions based on avoiding future regret
 * rather than maximizing current value.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const anticipatedRegret: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'anticipated-regret',
    name: 'Anticipated Regret',
    aliases: ['Regret Aversion', 'Prospective Regret', 'Fear of Missing Out'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'decision-making',
      'urgency',
      'fomo',
      'scarcity',
      'loss-aversion',
      'conversion',
      'retention',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People make decisions based on avoiding future regret rather than maximizing current value.',

    detailed: `Anticipated regret is a decision-making bias where people evaluate choices not by their expected utility, but by imagining how much regret they would feel if they chose poorly. Instead of asking "What gives me the most value?", people ask "What choice will I regret least?"

This asymmetry means that potential losses and missed opportunities weigh more heavily than equivalent gains. The emotional simulation of future regret — picturing yourself after having missed a deal, lost access, or failed to act — drives behavior more powerfully than rational cost-benefit analysis.

In product and UX design, anticipated regret is the engine behind FOMO messaging, limited-time offers, countdown timers, and "last chance" CTAs. When used ethically, it can help users make timely decisions they genuinely benefit from. When exploited, it creates anxiety, impulsive purchases, and eroded trust.`,

    psychologyBasis: {
      discoveredBy: 'Marcel Zeelenberg, Wilco W. van Dijk, and colleagues',
      year: 1996,
      theory: 'Regret Theory / Decision Affect Theory',
      mechanism: `The brain simulates future emotional states to guide present decisions. This happens because:

1. **Affective Forecasting**: People mentally simulate how they will feel after each possible outcome, and regret is among the most aversive emotions simulated
2. **Omission vs Commission Asymmetry**: People anticipate more regret from action (commission) in the short term, but more regret from inaction (omission) in the long term
3. **Counterfactual Thinking**: The ease of imagining "what could have been" amplifies anticipated regret — the closer the alternative, the stronger the regret
4. **Loss Amplification**: Anticipated regret magnifies perceived losses relative to equivalent gains, making missed opportunities feel worse than missed savings
5. **Temporal Compression**: Urgency cues (countdowns, deadlines) compress the decision window, intensifying the regret simulation`,
    },

    realWorldExample: `A shopper sees a jacket they like at $120. They hesitate. The next day, the store emails: "Only 2 left in your size — and the 20% off sale ends tonight." The shopper doesn't buy because they calculated the jacket is now worth $96. They buy because they vividly imagine the regret of missing the deal — checking back tomorrow, seeing "Sold Out", and kicking themselves. The anticipated regret of inaction overpowers the rational assessment of need.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Anticipated regret profoundly affects how users evaluate time-sensitive decisions, limited offers, and irreversible actions. Designers can leverage this to:

- Create urgency through countdown timers and expiration messaging
- Drive action with "don't miss out" and "last chance" framing
- Encourage feature adoption by previewing what users would lose
- Reduce churn by showing what departing users will miss
- Frame upgrades around what users are missing rather than what they gain`,

    whenToUse: [
      {
        title: 'Limited-Time Offers',
        scenario:
          'When presenting genuinely time-bound promotions or discounts',
        example:
          'Show a countdown timer with "Sale ends in 2h 14m — you\'ll pay full price after" to create genuine urgency around a real deadline',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Preview for Upgrades',
        scenario: 'When encouraging users to upgrade from free to paid tiers',
        example:
          'Let free users briefly experience a premium feature, then show "You\'ll lose access to Advanced Analytics in 3 days" rather than "Upgrade to get Advanced Analytics"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Cart Abandonment Recovery',
        scenario: 'When re-engaging users who left items in their cart',
        example:
          'Email showing "Your saved items are selling fast — 3 of 5 items now low stock" with specific items they browsed',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Churn Prevention',
        scenario: 'When users initiate cancellation of a subscription',
        example:
          'Show personalized data: "You\'ll lose your 847 saved playlists and 3 years of listening history" during the cancellation flow',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Early-Bird and Pre-Launch',
        scenario: 'When offering early access or pre-launch pricing',
        example:
          'Display "Lock in $29/mo forever — price goes to $49/mo after launch" with a clear date',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Waitlist and Exclusivity',
        scenario: 'When managing access to limited-availability products',
        example:
          'Show "237 people ahead of you — spots are filling fast" to motivate users to act when their turn comes',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'High-Stakes Financial Decisions',
        reason:
          'Regret-driven urgency can push users into loans, investments, or purchases they cannot afford',
        consequence:
          'Financial harm, buyer\'s remorse, refund requests, and destroyed trust',
        alternative:
          'Provide comparison tools, cooling-off periods, and transparent cost breakdowns without artificial urgency',
      },
      {
        title: 'Healthcare and Medical Choices',
        reason:
          'Fear of regret can cause patients to rush into treatments or skip informed consent',
        consequence:
          'Poor health outcomes, legal liability, and harm to vulnerable users',
        alternative:
          'Present balanced information with adequate time for reflection and professional consultation',
      },
      {
        title: 'Fabricated Scarcity',
        reason:
          'Fake countdown timers, false "low stock" warnings, and invented deadlines are deceptive',
        consequence:
          'Loss of trust when users discover the manipulation; regulatory risk; brand damage',
        alternative:
          'Only use urgency messaging when the scarcity or deadline is genuine and verifiable',
      },
      {
        title: 'Children and Vulnerable Users',
        reason:
          'Young users and those in emotional distress are disproportionately affected by regret-based messaging',
        consequence:
          'Anxiety, compulsive purchasing behavior, and exploitation of vulnerability',
        alternative:
          'Remove urgency cues entirely for underage users; provide neutral decision frameworks',
      },
    ],

    commonMistakes: [
      {
        title: 'Permanent Urgency',
        description:
          'Running "last chance" sales that never actually end, or resetting countdown timers',
        why: 'Users learn the urgency is fake and become immune to all future messaging',
        fix: 'Only use urgency when it is genuine. If a sale ends, it must actually end. Rotate promotions with real start and end dates.',
      },
      {
        title: 'Regret Without Value',
        description:
          'Creating fear of missing out on something the user does not actually want or need',
        why: 'Forced FOMO on irrelevant offers creates annoyance, not conversion',
        fix: 'Ensure the offer is genuinely relevant to the user\'s interests and behavior before applying regret messaging',
      },
      {
        title: 'Overloading Urgency Cues',
        description:
          'Stacking countdown timers, low-stock warnings, "people watching" alerts, and flash sale banners simultaneously',
        why: 'Multiple urgency signals feel manipulative and create decision paralysis, not action',
        fix: 'Use one clear urgency signal per decision context. Let the most relevant cue do the work.',
      },
      {
        title: 'Ignoring Post-Purchase Regret',
        description:
          'Optimizing for conversion through regret but ignoring buyer\'s remorse after purchase',
        why: 'High-pressure tactics increase returns, refunds, and negative reviews',
        fix: 'Pair urgency with strong return policies, confirmation emails, and post-purchase reassurance',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines where and how urgency cues appear relative to decision points',
        examples: [
          'Countdown timers positioned near the CTA button amplify urgency at the decision moment',
          'Low-stock indicators placed next to product images make scarcity feel tangible',
          'Sticky banners for time-limited offers keep the deadline visible throughout browsing',
          'Exit-intent overlays trigger regret simulation at the moment of departure',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment affects how urgent and consequential regret messaging feels',
        examples: [
          'Bold countdown text creates visual urgency without requiring color',
          'Small, muted "offer expires" text reduces perceived pressure — useful for ethical balance',
          'Large "Last Chance" headings anchor the sense of finality',
          'Strikethrough on expiring prices reinforces what will be lost',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals urgency intensity and emotional weight of potential regret',
        examples: [
          'Red countdown timers signal critical urgency and time pressure',
          'Orange and amber "limited stock" badges signal moderate urgency',
          'Muted gray for expired offers reinforces the finality of missed opportunities',
          'Green "still available" messaging provides relief from anticipated regret',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements are the primary trigger for anticipated regret behaviors',
        examples: [
          'Live countdown timers create real-time pressure that intensifies as time decreases',
          'Hover states showing "Almost gone!" on products amplify urgency at the micro-interaction level',
          'Cart reminders with stock depletion warnings re-trigger regret simulation',
          'Trial expiration progress bars make the countdown to loss tangible',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Copy is the most direct lever for triggering anticipated regret',
        examples: [
          '"Don\'t miss out" and "Last chance" directly invoke regret simulation',
          '"You\'ll lose access to..." frames the decision as a potential loss, not a gain forgone',
          'Personalized messaging ("Your saved items are selling fast") makes regret feel specific and real',
          '"Join 10,000 others who already..." combines social proof with fear of being left behind',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Urgency cues must be perceivable by all users without creating undue anxiety',
        examples: [
          'Screen reader announcements for countdown timers must convey urgency without creating panic',
          'Flashing or animated urgency elements must respect prefers-reduced-motion',
          'Color-based urgency signals (red timers) need text alternatives for color-blind users',
          'Auto-updating content (live stock counts) must use ARIA live regions appropriately',
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
        title: 'Transparent Limited-Time Discount',
        description:
          'E-commerce site with a genuine flash sale and honest countdown',
        code: `<div class="flash-sale-banner">
  <h3>Flash Sale — Ends Tonight at Midnight</h3>
  <div class="countdown" aria-live="polite" aria-label="Time remaining">
    <span class="hours">05</span>:<span class="minutes">42</span>:<span class="seconds">18</span>
  </div>
  <p class="sale-detail">20% off all running shoes. Sale price disappears at midnight EST.</p>
  <p class="reassurance">Not sure? You can return any item within 30 days, no questions asked.</p>
  <button class="primary">Shop the Sale</button>
</div>`,
        explanation:
          'The countdown creates genuine urgency around a real deadline. The return policy reassurance reduces anxiety about regret-driven impulse purchases, leading to confident decisions rather than panicked ones.',
        principle:
          'Genuine urgency paired with safety nets drives confident action, not anxious impulse',
        metrics: {
          before: '3.2% conversion on regular product pages',
          after: '8.7% conversion during flash sale with countdown + return reassurance',
          improvement: '172% increase in conversion with lower return rate than expected',
        },
      },
      {
        title: 'Trial Expiration with Value Summary',
        description:
          'SaaS product showing what the user will lose when their trial ends',
        code: `<div class="trial-expiring">
  <h3>Your free trial ends in 3 days</h3>
  <div class="value-summary">
    <h4>Here's what you've built so far:</h4>
    <ul class="achievements">
      <li><strong>14 dashboards</strong> with live data connections</li>
      <li><strong>3 automated reports</strong> saving you ~4 hours/week</li>
      <li><strong>847 rows</strong> of cleaned and transformed data</li>
    </ul>
    <p class="consequence">After your trial, these will become read-only.
    You won't be able to edit, update, or create new ones.</p>
  </div>
  <div class="actions">
    <button class="primary">Upgrade to Keep Everything — $29/mo</button>
    <button class="secondary">Export My Data</button>
  </div>
</div>`,
        explanation:
          'Instead of generic "upgrade now" messaging, the design shows the specific, personalized value the user has created — making the potential regret of losing it concrete and real. The export option provides an ethical escape hatch.',
        principle:
          'Personalized loss framing is more compelling than generic upgrade prompts',
        metrics: {
          before: '12% trial-to-paid conversion with generic upgrade prompt',
          after: '28% trial-to-paid conversion with personalized value summary',
          improvement: '133% increase in trial conversion',
        },
      },
      {
        title: 'Honest Low-Stock Indicator',
        description:
          'Product page showing real inventory data without exaggeration',
        code: `<div class="product-availability">
  <div class="stock-status low">
    <span class="icon" aria-hidden="true">&#9679;</span>
    <span>Only 3 left in stock</span>
  </div>
  <p class="restock-info">Usually restocks in 2-3 weeks.
  <a href="/notify-me">Get notified when back in stock</a></p>
  <button class="primary">Add to Cart</button>
  <p class="shipping-note">Order within 4h 12m for next-day delivery</p>
</div>`,
        explanation:
          'Real stock data creates legitimate urgency. The restock timeline gives context (it is not gone forever, but you will wait). The notify-me option shows honesty — if you miss it, there is a path forward.',
        principle:
          'Authentic scarcity with honest context builds trust while motivating action',
      },
    ],

    bad: [
      {
        title: 'Fake Countdown Timer',
        description:
          'A "limited time" offer with a countdown that resets on page refresh',
        code: `<!-- DON'T DO THIS -->
<div class="fake-urgency">
  <h2 style="color: red;">HURRY! This deal expires in:</h2>
  <div class="countdown">
    <!-- Timer resets to 23:59:59 on every page load -->
    <span>23</span>:<span>59</span>:<span>59</span>
  </div>
  <p>Once this timer hits zero, the price goes back to $299!</p>
  <button>BUY NOW BEFORE IT'S TOO LATE!</button>
</div>`,
        explanation:
          'The countdown is fabricated — it resets on every visit. Users who discover this (and they will) lose all trust. This is a textbook dark pattern that exploits anticipated regret through deception.',
        principle:
          'Fake urgency is a dark pattern that destroys trust when discovered',
      },
      {
        title: 'Guilt-Driven Decline Copy',
        description:
          'Modal popup with manipulative "no thanks" microcopy',
        code: `<!-- DON'T DO THIS -->
<div class="popup-offer">
  <h2>Get 50% Off Today Only!</h2>
  <p>Join 50,000 smart shoppers saving money every day.</p>
  <button class="primary">Yes, I want to save money!</button>
  <button class="dismiss">No thanks, I prefer paying full price
  and missing out on great deals forever.</button>
</div>`,
        explanation:
          'The dismissal copy weaponizes anticipated regret by making the user feel foolish for declining. This is "confirmshaming" — a manipulative pattern that creates resentment, not loyalty.',
        principle:
          'Confirmshaming exploits regret aversion to punish users for saying no',
      },
      {
        title: 'Fabricated Social Urgency',
        description:
          'Fake "X people viewing this" notifications to manufacture FOMO',
        code: `<!-- DON'T DO THIS -->
<div class="social-urgency">
  <div class="viewer-count">
    <!-- Random number between 15-45, changes every few seconds -->
    <span class="pulse-dot"></span>
    <p>37 people are looking at this right now!</p>
  </div>
  <div class="recent-purchase">
    <!-- Fake notification with random name and city -->
    <p>Sarah from Denver just purchased this item 2 minutes ago!</p>
  </div>
  <p class="warning">This item may sell out soon!</p>
</div>`,
        explanation:
          'Fabricated viewer counts and fake purchase notifications manufacture false social proof to trigger anticipated regret. When users realize the notifications are generated, trust is irrecoverably broken.',
        principle:
          'Fabricated social urgency is deceptive and erodes brand credibility',
      },
    ],

    realWorld: [
      {
        company: 'Booking.com',
        product: 'Hotel Listings',
        url: 'https://www.booking.com',
        description:
          'Booking.com is the canonical example of anticipated regret in product design. Listings display "Only 2 rooms left!", "Booked 5 times in the last 24 hours", and "12 people are looking at this property right now." Each message triggers a different facet of regret simulation — scarcity, social proof, and competitive urgency.',
        effectiveness: 'very-effective',
        analysis:
          'Highly effective at driving bookings but controversial. Multiple EU regulators have investigated these practices. The messaging works because hotel inventory is genuinely limited, but the intensity and stacking of urgency cues pushes into manipulative territory.',
      },
      {
        company: 'Amazon',
        product: 'Lightning Deals',
        url: 'https://www.amazon.com/deals',
        description:
          'Amazon Lightning Deals feature a progress bar showing "72% claimed", a countdown timer to deal expiration, and a hard cutoff. Once gone, the deal is genuinely gone. Users see the deal depleting in real time, intensifying anticipated regret with each percentage point.',
        effectiveness: 'very-effective',
        analysis:
          'Effective because the scarcity is real — Lightning Deals have genuine inventory limits and time bounds. The progress bar is a masterclass in anticipated regret: users can see the window closing, making inaction feel increasingly costly.',
      },
      {
        company: 'Supreme',
        product: 'Limited Edition Drops',
        url: 'https://www.supremenewyork.com',
        description:
          'Supreme releases limited quantities of products at specific times with no restocks. Items regularly sell out in seconds. The brand has built its entire identity around anticipated regret — if you do not act immediately, the item is gone forever, and resale prices can be 10x retail.',
        effectiveness: 'very-effective',
        analysis:
          'The most extreme example of anticipated regret driving value. By making scarcity the core brand proposition, Supreme has turned anticipated regret into a loyalty mechanism. Users develop automated purchasing behavior to avoid future regret.',
      },
      {
        company: 'Duolingo',
        product: 'Streak Freeze',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo warns users they are about to lose their learning streak and offers a "streak freeze" as a save. The notification "You\'ll lose your 47-day streak!" triggers anticipated regret about losing progress, driving daily engagement.',
        effectiveness: 'effective',
        analysis:
          'Effective and largely ethical — the streak represents genuine user effort, so the anticipated regret of losing it is proportional to real investment. The streak freeze mechanic provides a safety valve that reduces anxiety while maintaining engagement.',
      },
    ],

    abTests: [
      {
        title: 'Cart Abandonment Email: Discount vs Regret Framing',
        hypothesis:
          'Framing abandoned items as potential regret will outperform a simple discount offer',
        controlVersion: {
          description:
            'Cart abandonment email: "Come back! Here\'s 10% off your cart items."',
          metrics: {
            conversionRate: '5.8%',
            clickThroughRate: '14%',
            averageOrderValue: '$67',
          },
        },
        treatmentVersion: {
          description:
            'Cart abandonment email: "Still thinking about the Blue Runner Jacket? Only 2 left in your size. 3 people have added it to their cart since you left." No discount offered.',
          metrics: {
            conversionRate: '8.3%',
            clickThroughRate: '21%',
            averageOrderValue: '$89',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Regret-framed messaging outperformed the discount by 43% on conversion and 50% on click-through, while maintaining a higher AOV (no discount margin erosion). Users who converted via regret framing also had a lower return rate, suggesting more committed purchases.',
          learnings: [
            'Anticipated regret is a stronger motivator than a 10% discount for abandoned carts',
            'Specific, personalized scarcity (your size, your item) is more effective than generic urgency',
            'Removing the discount actually increased AOV while improving conversion',
            'Post-purchase satisfaction was higher, suggesting the regret framing aligned with genuine desire',
          ],
        },
      },
      {
        title: 'Trial Expiration: Generic vs Personalized Loss Preview',
        hypothesis:
          'Showing users what they personally will lose increases trial-to-paid conversion',
        controlVersion: {
          description:
            'Generic trial expiration banner: "Your free trial ends in 3 days. Upgrade now to keep all premium features."',
          metrics: {
            conversionRate: '11.2%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Personalized loss preview: "Your trial ends in 3 days. You\'ll lose access to your 14 dashboards, 3 automated reports, and 847 rows of cleaned data. These will become read-only."',
          metrics: {
            conversionRate: '26.4%',
            clickThroughRate: '38%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Personalized loss framing more than doubled conversion. Users who saw their specific data and work at risk converted at 2.4x the rate. The effect was strongest for users who had invested significant time during the trial.',
          learnings: [
            'Personalized anticipated regret dramatically outperforms generic urgency',
            'The more a user has invested, the stronger the anticipated regret effect',
            'Specific, concrete losses (14 dashboards) outperform abstract ones (premium features)',
            'Users who converted via personalized messaging had higher 90-day retention',
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
        name: 'Countdown Timers',
        description:
          'Live timers counting down to the end of an offer, sale, or availability window',
        howToSpot:
          'Look for ticking clocks, hour:minute:second displays, or "Ends in X hours" text near CTAs',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Low-Stock Warnings',
        description:
          'Messages indicating limited remaining inventory or availability',
        howToSpot:
          'Look for "Only X left", "Almost gone", "Limited stock" messaging near product listings or add-to-cart buttons',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'FOMO Messaging',
        description:
          'Copy explicitly designed to trigger fear of missing out on an opportunity',
        howToSpot:
          'Look for "Don\'t miss out", "Last chance", "You\'ll regret it", or "Act now" language in CTAs and banners',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Social Competition Cues',
        description:
          'Indicators showing other users competing for the same limited resource',
        howToSpot:
          'Look for "X people viewing this", "X people have this in their cart", or recent purchase notifications',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Expiration and Loss Previews',
        description:
          'Messaging that shows users what they will lose if they do not act',
        howToSpot:
          'Look for "You\'ll lose access to...", trial expiration warnings, or "Your data will be deleted" messaging',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Urgency Stack Pattern',
        description: 'Multiple urgency cues layered onto a single decision point (timer + stock + viewers)',
        indicators: ['Countdown timer near CTA', 'Stock level warning below price', '"X people viewing" notification', 'Flash sale banner at page top'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Loss Preview Pattern',
        description: 'Showing users what they will specifically lose if they do not act',
        indicators: ['Personalized data summaries in trial expiration flows', '"You\'ll lose access to..." framing', 'Before/after comparison of account state', 'Feature lockout previews in cancellation flows'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Competitive Scarcity Pattern',
        description: 'Framing the purchase as a competition with other users for limited supply',
        indicators: ['Real-time viewer counts', 'Recent purchase notifications', '"Selling fast" badges', 'Waitlist position indicators'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Confirmshaming Pattern',
        description: 'Using guilt-laden decline copy to make users feel regret about saying no',
        indicators: ['Manipulative "no thanks" button text', 'Self-deprecating decline options', 'Shaming language in dismissal copy', 'Emotional manipulation in modal dialogs'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are there countdown timers, and do they represent genuine deadlines?',
      'Do low-stock warnings reflect real inventory data?',
      'Is "X people viewing this" based on actual concurrent users?',
      'Does the urgency messaging reset or persist after the stated deadline?',
      'Are users given adequate time to make informed decisions despite urgency cues?',
      'Does the decline/dismiss copy shame users for saying no?',
      'Is the anticipated regret proportional to the actual consequence of inaction?',
      'Are there escape hatches (return policies, restocking, notifications) that reduce anxiety?',
      'Would a user feel manipulated if they understood how the urgency was implemented?',
      'Is the regret messaging personalized to the user\'s actual situation and investment?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in anticipated regret and regret aversion.

Analyze the provided design for anticipated regret patterns. Identify:

1. **Urgency Mechanisms**: Countdown timers, deadlines, expiration messaging
2. **Scarcity Signals**: Low-stock indicators, limited availability, exclusive access
3. **Loss Framing**: "You'll lose...", "Don't miss out", what-you'll-miss messaging
4. **Social Competition**: "X people viewing", recent purchase notifications, waitlist positions
5. **Confirmshaming**: Manipulative decline copy that guilts users into action

For each pattern found:
- Identify whether the urgency or scarcity is genuine or fabricated
- Assess the proportionality of regret messaging to actual consequences
- Determine if there are adequate safety nets (return policies, restocking)
- Evaluate whether the user has sufficient time and information for an informed decision
- Check for confirmshaming or guilt-based manipulation

Consider:
- Is the anticipated regret helping users make timely decisions they benefit from?
- Or is it creating anxiety and impulsive behavior that harms users?
- Are urgency cues genuine and verifiable?
- Is there an ethical escape path for users who choose not to act?
- Are vulnerable users (children, financially stressed) protected?

Provide actionable recommendations for ethical, effective use of anticipated regret.`,

    outputSchema: {
      type: 'object',
      properties: {
        regretPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              mechanism: { type: 'string' },
              genuineness: { type: 'string' },
              proportionality: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'mechanism',
              'genuineness',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            urgencyIntensity: { type: 'number' },
            genuinenessScore: { type: 'number' },
            proportionality: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'urgencyIntensity',
            'genuinenessScore',
            'proportionality',
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
        'regretPatterns',
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
        title: 'Identify Genuine Urgency',
        description:
          'Determine whether there is a real, time-bound constraint that justifies urgency messaging',
        example:
          'A flash sale with fixed inventory, a conference with limited seats, or a trial with a real expiration date',
        tips: [
          'Only use urgency cues when the scarcity or deadline is real',
          'Document the source of truth for any countdown or stock count',
          'If the urgency is not genuine, use value-based persuasion instead',
        ],
      },
      {
        step: 2,
        title: 'Frame the Potential Regret',
        description:
          'Help users understand what they would specifically miss or lose by not acting',
        example:
          '"You\'ll lose access to your 14 dashboards" rather than "Upgrade to keep premium features"',
        tips: [
          'Use personalized, concrete losses over generic messaging',
          'Frame around what the user has already invested or built',
          'Show the specific future state if they do not act',
        ],
      },
      {
        step: 3,
        title: 'Provide Safety Nets',
        description:
          'Reduce anxiety by offering return policies, undo options, or notification alternatives',
        example:
          '"Not sure? Buy now and return within 30 days, no questions asked" or "Notify me when back in stock"',
        tips: [
          'Safety nets increase conversion by reducing the regret of acting',
          'Offer "notify me" options for users who choose not to act now',
          'Make return and refund policies prominent near urgency messaging',
        ],
      },
      {
        step: 4,
        title: 'Calibrate Intensity',
        description:
          'Match the urgency intensity to the actual stakes and timeline of the decision',
        example:
          'A 24-hour flash sale warrants a countdown timer; a product that restocks weekly does not',
        tips: [
          'Use one urgency signal per decision point, not a stack of five',
          'Higher-stakes decisions need lower urgency intensity and more information',
          'Test different intensity levels to find the ethical optimum',
        ],
      },
      {
        step: 5,
        title: 'Measure Post-Decision Satisfaction',
        description:
          'Track not just conversion but also return rates, satisfaction, and retention',
        example:
          'Compare 30-day return rates for urgency-driven purchases vs. standard purchases',
        tips: [
          'High conversion with high returns indicates manipulative urgency',
          'Measure NPS or satisfaction scores segmented by urgency exposure',
          'Monitor support tickets related to regret-driven purchases',
        ],
      },
    ],

    dos: [
      'Use countdown timers only for genuine, verifiable deadlines',
      'Show real inventory data when indicating limited stock',
      'Personalize loss framing to the user\'s actual usage and investment',
      'Provide escape hatches: return policies, restock notifications, data export',
      'Pair urgency with adequate information for informed decision-making',
      'Test that urgency-driven conversions have comparable retention and satisfaction',
      'Respect prefers-reduced-motion for animated urgency elements',
      'Use clear, honest decline copy that respects the user\'s choice',
    ],

    donts: [
      'Don\'t use countdown timers that reset on page refresh',
      'Don\'t fabricate viewer counts or purchase notifications',
      'Don\'t use confirmshaming or guilt-laden decline copy',
      'Don\'t stack multiple urgency cues on a single decision point',
      'Don\'t apply urgency messaging to children or vulnerable users',
      'Don\'t create urgency for high-stakes financial or medical decisions',
      'Don\'t use "last chance" messaging that repeats indefinitely',
      'Don\'t hide safety nets (return policies) to amplify urgency',
    ],

    bestPractices: [
      {
        title: 'Genuine Scarcity Only',
        description:
          'Every urgency cue must be backed by real, verifiable data — real stock counts, real deadlines, real viewer numbers',
        rationale:
          'Fabricated scarcity is a dark pattern that erodes trust and invites regulatory scrutiny',
        example:
          'Pull stock data from inventory system in real time; hard-code sale end dates that are honored',
      },
      {
        title: 'Personalize the Loss',
        description:
          'Show users what they specifically have at stake, not generic "premium features"',
        rationale:
          'Personalized anticipated regret is 2-3x more effective than generic messaging and feels helpful rather than manipulative',
        example:
          '"You\'ll lose your 847 saved songs" is more compelling and honest than "You\'ll lose access to our music library"',
      },
      {
        title: 'Offer the Anti-Regret Path',
        description:
          'Provide options that let users avoid regret without necessarily converting now',
        rationale:
          'Wishlist, notify-me, and save-for-later options convert users who are not ready now but will be later',
        example:
          '"Save to wishlist" and "Notify me when back in stock" buttons alongside urgency messaging',
      },
      {
        title: 'Post-Purchase Reassurance',
        description:
          'After an urgency-driven conversion, immediately reduce buyer\'s remorse with confirmation and flexibility',
        rationale:
          'Reducing post-purchase regret improves retention, reduces returns, and builds trust for future urgency messaging',
        example:
          'Order confirmation showing "Great choice! 30-day free returns if you change your mind" with easy cancellation path',
      },
      {
        title: 'Urgency Rotation',
        description:
          'Rotate promotional events with genuine start and end dates rather than running permanent "limited time" offers',
        rationale:
          'Permanent urgency teaches users to ignore it; genuine rotation maintains credibility and effectiveness',
        example:
          'Monthly flash sales on different categories, each with real 48-hour windows and genuine inventory allocation',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Users must be able to extend, disable, or be warned about time limits',
        implementation:
          'Provide mechanisms to pause or extend countdown timers. Alert users before time-limited offers expire with adequate lead time.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Urgency must not be communicated through color alone',
        implementation:
          'Pair red countdown timers with text labels ("Ends in 2 hours"), icons, and semantic HTML so all users perceive the urgency.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Dynamic urgency updates must be announced to assistive technology',
        implementation:
          'Use ARIA live regions for countdown timers and stock level changes. Use role="timer" for countdowns and aria-live="polite" for stock updates.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Animated urgency cues must not flash excessively',
        implementation:
          'Ensure pulsing "low stock" indicators and countdown animations do not flash more than 3 times per second. Respect prefers-reduced-motion.',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated Scarcity',
        severity: 'critical',
        explanation:
          'Fake countdown timers, false low-stock warnings, and invented viewer counts are deceptive',
        mitigation:
          'Only use urgency cues backed by real data. Document the source of truth for every urgency signal. Audit regularly.',
      },
      {
        concern: 'Confirmshaming',
        severity: 'critical',
        explanation:
          'Guilt-laden decline copy ("No, I don\'t want to save money") weaponizes anticipated regret against user autonomy',
        mitigation:
          'Use neutral, respectful decline copy. "No thanks" is sufficient. Never shame users for their choices.',
      },
      {
        concern: 'Anxiety-Driven Purchases',
        severity: 'high',
        explanation:
          'Excessive urgency can cause impulsive purchases that users later regret, leading to returns and lost trust',
        mitigation:
          'Pair urgency with safety nets (return policies, cooling-off periods). Track return rates for urgency-driven conversions.',
      },
      {
        concern: 'Vulnerable User Exploitation',
        severity: 'critical',
        explanation:
          'Children, financially stressed users, and those with anxiety disorders are disproportionately affected by regret-based messaging',
        mitigation:
          'Disable or reduce urgency cues for users identified as minors. Avoid urgency in financial hardship contexts (debt, late payments).',
      },
      {
        concern: 'Permanent Urgency',
        severity: 'high',
        explanation:
          'Never-ending "limited time" offers and perpetual countdowns are deceptive and erode all urgency credibility',
        mitigation:
          'When a deadline passes, honor it. Rotate promotions with genuine windows. Never restart a countdown.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Effect of Anticipated Regret on Risk-Averse and Risk-Seeking Behavior',
        author: 'Zeelenberg, M., Beattie, J., van der Pligt, J., & de Vries, N. K.',
        year: 1996,
        doi: '10.1016/0749-5978(96)00009-3',
        description:
          'Foundational paper demonstrating how anticipated regret shifts decision-making away from expected value maximization',
        type: 'foundational',
      },
      {
        title: 'A Theory of Anticipated Regret and Behavioral Choice',
        author: 'Loomes, G., & Sugden, R.',
        year: 1982,
        doi: '10.2307/2232669',
        description:
          'Introduced regret theory as an alternative to expected utility theory, proposing that people factor anticipated regret into choices',
        type: 'foundational',
      },
      {
        title: 'Consequences of Regret Aversion: Effects of Expected Feedback on Risky Decision Making',
        author: 'Zeelenberg, M., & Beattie, J.',
        year: 1997,
        doi: '10.1006/obhd.1997.2700',
        description:
          'Demonstrates how the expectation of feedback about forgone outcomes increases regret aversion and risk-averse behavior',
        type: 'advanced',
      },
      {
        title: 'Anticipated Regret and Time-Inconsistent Preferences',
        author: 'Sarver, T.',
        year: 2008,
        doi: '10.1016/j.jet.2007.08.004',
        description:
          'Explores how anticipated regret creates time-inconsistent preferences and affects dynamic decision-making',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Paradox of Choice: Why More Is Less',
        author: 'Schwartz, Barry',
        year: 2004,
        isbn: '9780060005696',
        description:
          'Explores how anticipated regret increases with the number of available options, leading to decision paralysis and reduced satisfaction',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Examines affective forecasting errors — why people are poor at predicting how much regret they will actually feel',
        type: 'practical',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Covers how anticipated regret and loss aversion drive irrational consumer behavior, with direct design implications',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Dark Patterns: Deception vs. Honesty in UI Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/dark-patterns/',
        description:
          'Analysis of how urgency, scarcity, and confirmshaming exploit anticipated regret as dark patterns',
        type: 'practical',
      },
      {
        title: 'FOMO and Urgency in E-Commerce: When It Works and When It Backfires',
        author: 'Baymard Institute',
        url: 'https://baymard.com/blog/urgency-scarcity',
        description:
          'Research-based analysis of urgency and scarcity tactics in e-commerce, with effectiveness data',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Psychology of Regret',
        author: 'TED - Barry Schwartz',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'Barry Schwartz explains how anticipated regret paralyzes decisions and reduces satisfaction with choices',
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
      'loss-aversion',       // Anticipated regret amplifies loss framing
      'scarcity-bias',       // Limited availability intensifies regret of inaction
      'social-proof',        // "Others are buying" increases fear of missing out
      'urgency-effect',      // Time pressure compresses the regret simulation window
      'endowment-effect',    // Users value what they have more, making loss-framed regret stronger
    ],

    conflicts: [
      'analysis-paralysis',  // Too much urgency can freeze rather than motivate
      'status-quo-bias',     // Preference for current state can resist regret-driven action
    ],

    confusedWith: [
      'loss-aversion',       // Related but distinct: loss aversion is about valuing losses more; anticipated regret is about simulating future emotional states
      'fomo',                // FOMO is a symptom; anticipated regret is the underlying mechanism
      'sunk-cost-fallacy',   // Both involve emotional investment but sunk cost looks backward, anticipated regret looks forward
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'fomo',
        'regret-aversion',
        'inaction-inertia',
      ],
    },
  },
};
