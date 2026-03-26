/**
 * SCARCITY BIAS
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const scarcityBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'scarcity-bias',
    name: 'Scarcity Bias',
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
    simple: 'Things seem more valuable when they\'re scarce or limited',

    detailed: `Scarcity Bias is the tendency to assign higher value to items that are or appear to be scarce, limited, or in short supply. The harder something is to obtain, the more valuable it seems - even if nothing about the item itself has changed.

This operates through multiple mechanisms: evolutionary psychology (scarce resources were historically life-critical), loss aversion (we might miss out), and social proof (if it's scarce, others must want it). The combination creates powerful urgency and desire.

In design and marketing, scarcity is one of the most powerful conversion tools. "Only 3 left!" "Sale ends in 2 hours!" "Limited edition" - these phrases trigger immediate action by transforming casual interest into urgent need.

However, scarcity tactics must be genuine. Fake scarcity is unethical and often illegal, creating short-term gains but long-term brand damage.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Limited availability increases perceived value through several converging psychological mechanisms:

1. **Commodity Theory**: Items that are restricted in availability are perceived as more desirable and valuable than abundant items
2. **Reactance Theory**: When freedom to obtain something is threatened (limited supply), the desire to have it intensifies
3. **Loss Aversion**: The fear of missing out (FOMO) is psychologically stronger than the pleasure of gaining, making scarce items feel urgent
4. **Social Proof Inference**: If something is scarce, we infer that others must want it, validating its desirability
5. **Competition Arousal**: Knowing others are competing for the same limited resource triggers primal competitive instincts

The mechanism is largely automatic - scarcity signals bypass rational evaluation and trigger urgency-driven decision-making.`,
    },

    realWorldExample: `Cialdini's cookie jar study: Participants rated cookies more valuable when jar had 2 cookies vs 10 cookies - identical cookies, only difference was perceived scarcity. Further, cookies became MOST valuable when participants were told the jar recently went from 10 to 2 (newly scarce), triggering urgency and competitive desire.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Scarcity Bias profoundly affects how users perceive value, urgency, and desirability in interfaces. When supply appears limited, demand increases almost reflexively. Designers can leverage this to:

- Drive conversion through countdown timers and stock indicators
- Increase perceived value with limited editions and exclusive access
- Create urgency with time-bound offers and expiring deals
- Build anticipation through waitlists and invite-only launches
- Encourage early adoption with early-bird pricing and founding member perks`,

    whenToUse: [
      {
        title: 'Limited Inventory Displays',
        scenario:
          'When genuinely limited stock needs to be communicated to users',
        example:
          'Show real-time inventory count: "Only 3 left in stock" when the number is truthful and dynamically updated',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Time-Bound Offers',
        scenario: 'When a discount or promotion has a genuine expiration date',
        example:
          'Display a countdown timer for a real sale ending at midnight, with the timer removed once the sale genuinely ends',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Early-Bird Pricing',
        scenario: 'When rewarding early adopters with a genuine price advantage',
        example:
          '"First 100 subscribers get 40% off forever" with a live counter showing remaining spots',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Exclusive Access',
        scenario: 'When capacity is genuinely limited and access must be controlled',
        example:
          'Invite-only beta with a waitlist, providing genuine early access to features that need controlled rollout',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Seasonal or Limited Editions',
        scenario: 'When products are genuinely produced in limited quantities',
        example:
          '"Limited run of 500 units" for a genuinely small-batch product with edition numbering',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Event Registration',
        scenario: 'When venue capacity or resource limits restrict attendance',
        example:
          '"Only 12 seats remaining" for a workshop with a real capacity cap, updated in real time',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Essential Services',
        reason:
          'Creating artificial urgency around essential services (healthcare, utilities, etc.) is manipulative',
        consequence:
          'Users make panic-driven decisions about critical needs, leading to poor outcomes and eroded trust',
        alternative:
          'Present essential services with clear, calm information and adequate time for decision-making',
      },
      {
        title: 'Fake or Artificial Scarcity',
        reason:
          'Manufacturing false urgency when supply is not actually limited',
        consequence:
          'User distrust, regulatory penalties (FTC), brand damage, and potential legal liability',
        alternative:
          'Use genuine value propositions and honest inventory/availability data',
      },
      {
        title: 'Subscription or Recurring Purchases',
        reason:
          'Scarcity pressure on ongoing commitments leads to regretful sign-ups',
        consequence:
          'High churn rates, negative reviews, and support burden from users who felt pressured',
        alternative:
          'Offer free trials, transparent pricing, and easy cancellation instead of urgency tactics',
      },
      {
        title: 'Financial or Legal Decisions',
        reason:
          'Pressure tactics on high-stakes financial decisions is unethical and often illegal',
        consequence:
          'Suboptimal financial commitments, buyer remorse, and regulatory scrutiny',
        alternative:
          'Provide clear information, comparison tools, and adequate decision-making time',
      },
    ],

    commonMistakes: [
      {
        title: 'Permanent "Limited Time" Offers',
        description:
          'Running a "limited time" sale that never actually ends, or immediately restarting it',
        why: 'Users quickly learn the urgency is fake, destroying credibility of all future scarcity signals',
        fix: 'Only use time limits for genuinely time-bound offers. When the timer ends, the offer ends.',
      },
      {
        title: 'Fake Stock Counters',
        description:
          'Displaying "Only 2 left!" when inventory is plentiful and restocks continuously',
        why: 'Dishonest inventory signals violate consumer trust and can breach FTC guidelines',
        fix: 'Connect stock indicators to real inventory data. If you restock regularly, show restock dates instead.',
      },
      {
        title: 'Overusing Urgency Signals',
        description:
          'Adding countdown timers, low-stock warnings, and "act now" messaging to every page',
        why: 'Urgency fatigue makes users immune to all scarcity signals, including legitimate ones',
        fix: 'Reserve scarcity indicators for genuinely scarce items. Use sparingly to maintain impact.',
      },
      {
        title: 'Scarcity Without Context',
        description:
          'Showing "Only 5 left" without information about restock schedules or alternatives',
        why: 'Users panic-buy without understanding the full picture, leading to regret and returns',
        fix: 'Provide context: restock dates, alternative sizes/colors, and waitlist options alongside scarcity data.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout placement determines how prominently scarcity signals capture attention',
        examples: [
          'Stock indicators near the "Add to Cart" button create purchase urgency at the decision point',
          'Countdown timers in sticky headers maintain urgency awareness during browsing',
          'Limited-availability badges on product cards drive click-through from listing pages',
          'Waitlist position indicators above the fold reinforce exclusivity',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment of scarcity messaging affects urgency perception',
        examples: [
          'Bold, red "Only 2 left" text creates more urgency than subtle gray text',
          'Countdown timer typography with monospaced numbers feels more precise and urgent',
          'ALL CAPS "LIMITED EDITION" conveys exclusivity but can feel aggressive',
          'Small, honest restock info in regular weight balances urgency with transparency',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals urgency levels and scarcity severity',
        examples: [
          'Red/orange for critical low stock creates immediate urgency',
          'Yellow/amber for moderate stock levels signals "act soon"',
          'Green availability indicators provide contrast that makes red scarcity feel more urgent',
          'Gold/premium colors on "exclusive" or "limited edition" items convey luxury scarcity',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Dynamic interactions make scarcity feel real-time and pressing',
        examples: [
          'Live countdown timers ticking down create visceral urgency',
          'Stock numbers that decrement as others purchase create competitive pressure',
          '"Someone just bought this" toast notifications combine scarcity with social proof',
          'Waitlist position updates ("You moved from #47 to #23") maintain engagement',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Scarcity language and framing drive urgency and perceived value',
        examples: [
          '"Only 3 left in stock" is more urgent than "Limited availability"',
          '"Sale ends in 2:14:33" is more pressing than "Limited time offer"',
          '"Join 2,847 people on the waitlist" combines scarcity with social proof',
          '"Edition 42 of 500" makes each unit feel unique and collectible',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Scarcity signals must be perceivable by all users without causing distress',
        examples: [
          'Screen readers must announce stock levels and countdown changes without excessive verbosity',
          'Color-coded urgency (red/yellow/green) needs text labels for color-blind users',
          'Countdown timers should not auto-update ARIA live regions too frequently',
          'Users with cognitive disabilities need adequate time; avoid creating undue pressure',
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
        title: 'Honest Real-Time Inventory',
        description:
          'E-commerce product page showing genuine stock levels connected to real inventory data',
        code: `<div class="product-availability">
  <div class="stock-indicator low-stock">
    <span class="stock-icon" aria-hidden="true">&#9679;</span>
    <span class="stock-text">Only 3 left in stock</span>
  </div>
  <p class="restock-info">
    More expected <strong>March 28</strong>
    &mdash; <a href="/notify-me">Get notified when restocked</a>
  </p>
  <p class="purchase-rate">12 sold in the last 24 hours</p>
</div>`,
        explanation:
          'Stock count is connected to real inventory. Restock date provides context so users can make informed decisions. The "notify me" option respects users who prefer to wait.',
        principle:
          'Genuine scarcity with transparent context enables informed urgency',
        metrics: {
          before: '3.2% conversion with no stock indicator',
          after: '5.8% conversion with honest stock + restock info',
          improvement: '81% increase in conversion with maintained trust scores',
        },
      },
      {
        title: 'Genuine Limited Edition with Edition Numbering',
        description:
          'Product launch for a genuinely limited-run item with transparent production numbers',
        code: `<div class="limited-edition">
  <span class="edition-badge">Limited Edition</span>
  <h3>Anniversary Collection Jacket</h3>
  <div class="edition-details">
    <p class="production-run">Limited run of <strong>500 units</strong></p>
    <div class="progress-bar" role="progressbar"
         aria-valuenow="387" aria-valuemin="0" aria-valuemax="500"
         aria-label="387 of 500 units remaining">
      <div class="progress-fill" style="width: 77.4%"></div>
    </div>
    <p class="remaining">387 of 500 remaining</p>
    <p class="edition-number">Your unit will be numbered #114</p>
  </div>
</div>`,
        explanation:
          'The production run is genuinely limited. A progress bar shows real remaining inventory. Edition numbering makes each purchase feel unique. No fake urgency, just transparent scarcity.',
        principle:
          'Transparent limited editions create legitimate exclusivity and collectible value',
      },
      {
        title: 'Early-Bird Pricing with Live Counter',
        description:
          'SaaS launch offering genuine early-bird pricing with a real spot counter',
        code: `<section class="early-bird-offer">
  <h2>Early Bird Pricing</h2>
  <p class="offer-detail">
    First <strong>200 subscribers</strong> lock in
    <strong>40% off forever</strong>
  </p>
  <div class="spots-remaining">
    <span class="count">47</span>
    <span class="label">spots remaining at this price</span>
  </div>
  <div class="price-comparison">
    <span class="early-price">$29<span>/mo</span></span>
    <span class="regular-price">Regular price: $49/mo</span>
  </div>
  <button class="cta-primary">Claim Your Spot</button>
  <p class="guarantee">30-day money-back guarantee. Cancel anytime.</p>
</section>`,
        explanation:
          'The early-bird cap is real and the counter is live. The money-back guarantee reduces pressure. Regular price is shown for context, not manipulation.',
        principle:
          'Genuine scarcity rewards early adopters while maintaining trust through guarantees',
        metrics: {
          before: '8% sign-up rate with standard pricing page',
          after: '22% sign-up rate with early-bird scarcity + guarantee',
          improvement: '175% increase in launch sign-ups',
        },
      },
    ],

    bad: [
      {
        title: 'Fake Countdown Timer That Resets',
        description:
          'E-commerce site with a countdown timer that resets when it reaches zero',
        code: `<!-- DON'T DO THIS -->
<div class="fake-urgency">
  <h2 style="color: red;">FLASH SALE ENDS IN:</h2>
  <div class="countdown" style="font-size: 2em; color: red;">
    02:14:33
  </div>
  <p>After this, price goes back to $199!</p>
</div>

<script>
  // Timer resets to 3 hours on every page load
  let seconds = 3 * 60 * 60;
  setInterval(() => {
    seconds--;
    if (seconds <= 0) seconds = 3 * 60 * 60; // Reset!
    updateDisplay(seconds);
  }, 1000);
</script>`,
        explanation:
          'The countdown is fake - it resets on every visit and never actually expires. This is deceptive, violates FTC guidelines on false urgency, and destroys trust when users notice.',
        principle:
          'Fake countdowns are deceptive, illegal in many jurisdictions, and damage long-term brand trust',
      },
      {
        title: 'Artificial Stock Limits on Abundant Products',
        description:
          'Showing permanently low stock on mass-produced items that restock continuously',
        code: `<!-- DON'T DO THIS -->
<div class="product-card">
  <h3>Basic Cotton T-Shirt</h3>
  <p class="price">$19.99</p>
  <div class="stock-warning" style="color: red;">
    <strong>Only 2 left!</strong> Order soon!
  </div>
  <!-- This t-shirt has 10,000 units in warehouse
       and restocks weekly -->
</div>`,
        explanation:
          'Claiming "Only 2 left" for a mass-produced item with thousands in stock is dishonest. Users who discover the truth lose trust in all future stock indicators.',
        principle:
          'Never fabricate scarcity for abundant products - users will discover the deception',
      },
      {
        title: 'Permanent "Limited Time" Offer',
        description:
          'A sale that has been running continuously for months but claims to be ending soon',
        code: `<!-- DON'T DO THIS -->
<div class="banner-sale">
  <p style="font-size: 1.5em; color: red;">
    LIMITED TIME ONLY! 50% OFF EVERYTHING!
  </p>
  <p>This offer won't last! Act NOW before it's too late!</p>
  <!-- This exact banner has been live since January 2024 -->
</div>`,
        explanation:
          'A "limited time" offer that never ends is false advertising. The FTC has taken action against companies for perpetual "sales". Users become numb to urgency and distrust the brand.',
        principle:
          'Permanent sales masquerading as limited-time offers violate consumer protection laws',
      },
    ],

    realWorld: [
      {
        company: 'Booking.com',
        product: 'Hotel Listings',
        url: 'https://www.booking.com',
        description: 'Booking.com displays "Only 2 rooms left at this price" alongside "14 people are looking at this property right now." The combination of quantity scarcity and competitive pressure creates strong urgency to book immediately.',
        effectiveness: 'very-effective',
        analysis: 'Dual scarcity signals (low stock + active competition) are highly effective at driving immediate bookings. However, the accuracy of these numbers has been questioned by regulators, with the UK ASA and EU requiring that such claims be verifiable.',
      },
      {
        company: 'Amazon',
        product: 'Product Listings',
        url: 'https://www.amazon.com',
        description: 'Amazon shows "Only 3 left in stock - order soon" with orange warning text on product pages. For deal items, countdown timers show when Lightning Deals expire. Stock levels are connected to real inventory data.',
        effectiveness: 'very-effective',
        analysis: 'Amazon\'s stock indicators are connected to real inventory systems, making the scarcity genuine. The orange warning color and position near the "Add to Cart" button create urgency at the exact decision point.',
      },
      {
        company: 'Supreme',
        product: 'Weekly Drops',
        url: 'https://www.supremenewyork.com',
        description: 'Supreme releases limited quantities of new items every Thursday at 11am. Items frequently sell out in seconds, creating intense demand and a thriving resale market where items sell for multiples of retail.',
        effectiveness: 'very-effective',
        analysis: 'Supreme\'s scarcity is genuine - they deliberately produce small quantities. This transforms a clothing brand into a cultural phenomenon where scarcity IS the product. The model works because scarcity is consistent and real, never faked.',
      },
      {
        company: 'Clubhouse',
        product: 'Invite-Only Launch',
        description: 'Clubhouse launched as invite-only, requiring existing users to invite new ones. This created artificial exclusivity that drove massive demand, with invites selling on eBay and the app reaching a $4B valuation before opening to all.',
        effectiveness: 'effective',
        analysis: 'Invite-only scarcity drove explosive initial growth through exclusivity and FOMO. However, when Clubhouse opened to everyone, the perceived value dropped sharply. The scarcity was the appeal - removing it removed the magic. A cautionary tale about building on scarcity alone.',
      },
    ],

    abTests: [
      {
        title: 'Stock Indicator: Honest Count vs No Indicator',
        hypothesis:
          'Showing genuine low-stock counts will increase conversion without harming trust',
        controlVersion: {
          description:
            'Product page with no stock information displayed, just standard "Add to Cart" button',
          metrics: {
            conversionRate: '3.2%',
            cartAbandonment: '68%',
            returnRate: '8%',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing "Only X left in stock" (real data) with restock date and notify-me option',
          metrics: {
            conversionRate: '5.8%',
            cartAbandonment: '52%',
            returnRate: '7.5%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Honest stock indicators increased conversion by 81% and reduced cart abandonment by 24%. Return rates stayed stable, suggesting purchases were intentional, not panic-driven. Trust scores remained high because the information was verifiably accurate.',
          learnings: [
            'Genuine scarcity signals drive urgency without eroding trust',
            'Including restock dates reduces panic buying and returns',
            'The "notify me" option captures demand that would otherwise be lost',
            'Effect is strongest for items with stock under 10 units',
          ],
        },
      },
      {
        title: 'Countdown Timer: Real Deadline vs Fake Recurring Timer',
        hypothesis:
          'A genuine countdown to a real deadline will outperform a fake timer long-term',
        controlVersion: {
          description:
            'Fake 3-hour countdown timer that resets on each visit, running perpetually',
          metrics: {
            conversionRate: '7.1%',
            repeatPurchaseRate: '12%',
            trustScore: '5.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Real countdown to genuine sale end date, with no sale shown after expiry',
          metrics: {
            conversionRate: '6.3%',
            repeatPurchaseRate: '28%',
            trustScore: '8.1/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the fake timer had slightly higher initial conversion (+13%), the real timer led to 133% higher repeat purchase rates and 56% higher trust scores over 6 months. Lifetime customer value was 2.4x higher with honest scarcity.',
          learnings: [
            'Fake urgency wins short-term but loses long-term',
            'Trust is the compounding metric - honest scarcity builds it',
            'Repeat customers are worth 5-7x more than one-time panic buyers',
            'Users who discover fake timers tell others, creating negative word-of-mouth',
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
          'Ticking countdown clocks showing hours, minutes, seconds until an offer expires',
        howToSpot:
          'Look for animated timer elements near CTAs or in banners, especially with red/orange colors',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Low Stock Indicators',
        description:
          'Text or badges showing limited remaining inventory ("Only X left")',
        howToSpot:
          'Look for orange/red text near "Add to Cart" buttons, often with warning icons or exclamation marks',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Limited-Time Language',
        description:
          'Words like "limited", "exclusive", "ending soon", "last chance", "while supplies last"',
        howToSpot:
          'Scan headings, banners, and CTA buttons for urgency-inducing language',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'FOMO Notifications',
        description:
          'Toast messages or popups showing other users\' recent purchases or viewing activity',
        howToSpot:
          'Look for "X people are viewing this" or "Someone in [city] just bought this" notifications',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Progress Bars for Availability',
        description:
          'Visual bars showing how much stock has been claimed or how many spots are taken',
        howToSpot:
          'Look for horizontal bars with "X% claimed" or "X of Y remaining" labels',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Exclusive Access Indicators',
        description:
          'Badges, labels, or gating showing invite-only, members-only, or waitlist access',
        howToSpot:
          'Look for lock icons, "invite only", "exclusive", or waitlist sign-up forms',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Quantity Scarcity Pattern',
        description: 'Limited stock or inventory indicators creating urgency to purchase before items run out',
        indicators: ['"Only X left in stock" messages', 'Low stock warning badges', 'Sold-out indicators on related items', 'Stock level progress bars'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Time Scarcity Pattern',
        description: 'Countdown timers or deadlines creating urgency to act before an offer expires',
        indicators: ['Countdown clocks (hours:minutes:seconds)', '"Sale ends in..." banners', '"Last day" or "Ending soon" labels', 'Flash sale or lightning deal frameworks'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Access Scarcity Pattern',
        description: 'Exclusive or restricted access creating desire through exclusivity',
        indicators: ['Invite-only sign-ups', 'Waitlist position indicators', '"Members only" or "VIP" access gates', 'Beta access with limited slots'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Social Competition Pattern',
        description: 'Showing other users competing for the same scarce resource',
        indicators: ['"X people are looking at this" messages', '"Someone just purchased" toast notifications', 'Real-time viewer counts', 'Recent purchase activity feeds'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there countdown timers? Do they correspond to real deadlines?',
      'Are stock indicators connected to real inventory data?',
      'Does the "limited time" offer actually end when claimed?',
      'Are "Only X left" claims verifiably accurate?',
      'Do FOMO notifications reflect real user activity?',
      'Is the scarcity genuine or artificially manufactured?',
      'Are users given enough context (restock dates, alternatives) to make informed decisions?',
      'Does the urgency level match the actual scarcity?',
      'Are vulnerable users (anxious, financially stressed) protected from excessive pressure?',
      'Would this scarcity claim withstand FTC or consumer protection scrutiny?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in scarcity bias.

Analyze the provided design for scarcity bias patterns. Identify:

1. **Quantity Scarcity**: Stock indicators, inventory counts, "only X left" messaging
2. **Time Scarcity**: Countdown timers, expiration dates, "limited time" language
3. **Access Scarcity**: Invite-only, waitlists, exclusive access, member-only features
4. **Social Competition**: "X people viewing", recent purchase notifications, demand indicators
5. **Manufactured vs Genuine**: Whether the scarcity signals reflect real limitations

For each pattern found:
- Identify the scarcity type and its location in the interface
- Assess whether the scarcity is genuine or artificially manufactured
- Determine if it creates healthy urgency or manipulative pressure
- Evaluate compliance with FTC guidelines and consumer protection laws
- Suggest improvements for ethical, effective scarcity communication

Consider:
- Are countdown timers connected to real deadlines or do they reset?
- Are stock counts from real inventory or fabricated?
- Does the design provide context (restock dates, alternatives)?
- Are vulnerable users protected from excessive urgency?
- Is there a pattern of "permanent sales" or perpetual scarcity?

Provide actionable recommendations for genuine, transparent scarcity design.`,

    outputSchema: {
      type: 'object',
      properties: {
        scarcityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              scarcitySignal: { type: 'string' },
              genuineness: { type: 'string' },
              urgencyLevel: { type: 'string' },
              potentialManipulation: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'scarcitySignal',
              'genuineness',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            genuinenessScore: { type: 'number' },
            urgencyLevel: { type: 'number' },
            transparencyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'genuinenessScore',
            'urgencyLevel',
            'transparencyScore',
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
        'scarcityPatterns',
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
        title: 'Identify Genuine Scarcity',
        description:
          'Determine what is actually limited: inventory, time, access, or capacity',
        example:
          'A workshop has 30 physical seats. This is genuine capacity scarcity worth communicating.',
        tips: [
          'Only use scarcity signals for genuinely limited resources',
          'Never manufacture artificial limits on abundant items',
          'Document the real constraint that creates the scarcity',
        ],
      },
      {
        step: 2,
        title: 'Connect to Real Data',
        description:
          'Ensure all scarcity indicators are driven by live, accurate data sources',
        example:
          'Stock count pulls from inventory API; countdown timer syncs to server-side sale end date',
        tips: [
          'Never hardcode stock numbers or timer values',
          'Use server-side timestamps for countdowns to prevent manipulation',
          'Update indicators in real time as inventory changes',
        ],
      },
      {
        step: 3,
        title: 'Provide Context',
        description:
          'Give users enough information to make informed decisions alongside scarcity signals',
        example:
          '"Only 3 left in stock. More expected March 28. Get notified when restocked."',
        tips: [
          'Include restock dates when available',
          'Offer waitlist or notification alternatives',
          'Show historical availability patterns if relevant',
        ],
      },
      {
        step: 4,
        title: 'Design Appropriate Urgency Levels',
        description:
          'Match visual urgency to actual scarcity severity',
        example:
          'Red warning for last 3 units, amber for last 10, green for 10+',
        tips: [
          'Use a tiered color system reflecting actual stock levels',
          'Reserve high-urgency treatment (red, animations) for genuine low stock',
          'Avoid creating panic through excessive visual urgency',
        ],
      },
      {
        step: 5,
        title: 'Test and Validate Ethics',
        description:
          'Verify that scarcity signals improve user experience and would withstand regulatory scrutiny',
        example:
          'A/B test scarcity indicators while monitoring trust scores, return rates, and customer satisfaction',
        tips: [
          'Monitor return rates - high returns indicate pressure-driven purchases',
          'Track trust scores alongside conversion metrics',
          'Ask: "Would I be comfortable explaining this tactic to a regulator?"',
          'Review FTC guidelines on urgency and scarcity claims',
        ],
      },
    ],

    dos: [
      'Connect all scarcity indicators to real, live data sources',
      'Provide context alongside scarcity signals (restock dates, alternatives)',
      'End time-limited offers when the timer reaches zero',
      'Use tiered urgency levels that match actual stock severity',
      'Offer waitlist or notification options for sold-out items',
      'Be transparent about production quantities for limited editions',
      'Test that scarcity drives informed urgency, not panic buying',
      'Respect users who choose to wait by providing restock notifications',
    ],

    donts: [
      'Don\'t use countdown timers that reset or never actually expire',
      'Don\'t display fake stock levels ("Only 2 left!" for mass-produced items)',
      'Don\'t run permanent "limited time" offers that never end',
      'Don\'t manufacture artificial scarcity for abundant digital goods',
      'Don\'t combine multiple scarcity signals to create excessive pressure',
      'Don\'t use scarcity tactics on essential services or vulnerable populations',
      'Don\'t hide restock information to make scarcity seem permanent',
      'Don\'t use "X people are viewing this" with fabricated numbers',
    ],

    bestPractices: [
      {
        title: 'Genuine Scarcity Only',
        description:
          'Every scarcity signal must reflect a real constraint: limited inventory, real deadline, actual capacity',
        rationale:
          'Fake scarcity is detectable, destroys trust, and invites regulatory action. Genuine scarcity builds credibility.',
        example:
          'Connect "Only X left" to real inventory API, not hardcoded values',
      },
      {
        title: 'Scarcity + Context = Trust',
        description:
          'Always pair scarcity signals with contextual information that helps users decide',
        rationale:
          'Context transforms pressure into informed urgency. Users appreciate transparency.',
        example:
          '"Only 3 left" + "More expected March 28" + "Get notified" link',
      },
      {
        title: 'Tiered Urgency Design',
        description:
          'Use progressive visual urgency that scales with actual scarcity severity',
        rationale:
          'Treating every item as "urgent" creates urgency fatigue and numbs users to real scarcity',
        example:
          'Green (10+ in stock) -> Amber (3-10 left) -> Red (1-2 left) -> "Sold out" with notify option',
      },
      {
        title: 'Honor Your Deadlines',
        description:
          'When a timer expires or a limit is reached, follow through. End the sale. Close enrollment.',
        rationale:
          'Following through proves the scarcity is real. Users learn your deadlines matter.',
        example:
          'Sale price reverts to regular price at midnight. No extensions, no "just kidding."',
      },
      {
        title: 'Measure Trust Alongside Conversion',
        description:
          'Track trust scores, return rates, and repeat purchase rates alongside conversion metrics',
        rationale:
          'Fake scarcity may boost short-term conversions but damages the metrics that drive long-term revenue',
        example:
          'Dashboard showing conversion rate, trust score, return rate, and repeat purchase rate together',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Scarcity indicators must be semantically meaningful',
        implementation:
          'Use ARIA labels on stock indicators and countdown timers. Ensure screen readers announce "Only 3 left in stock" not just the number.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on red/green to indicate stock levels',
        implementation:
          'Combine color with text labels ("Low stock", "In stock"), icons, and semantic HTML so color-blind users perceive urgency correctly.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Countdown timers should not pressure users who need more time',
        implementation:
          'Ensure countdown timers do not prevent completing a purchase. If a user has an item in cart, honor the price even if the timer expires during checkout.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Dynamic scarcity updates must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" for stock updates and aria-live="assertive" only for critical low-stock alerts. Avoid excessive live region updates from countdown timers.',
      },
    ],

    ethics: [
      {
        concern: 'Fake Scarcity',
        severity: 'critical',
        explanation:
          'Manufacturing false urgency through fake countdown timers, fabricated stock levels, or artificial limits on abundant products',
        mitigation:
          'Connect all scarcity indicators to real data. Audit regularly for accuracy. Treat fake scarcity as a P0 trust violation.',
      },
      {
        concern: 'Perpetual Sales',
        severity: 'critical',
        explanation:
          'Running "limited time" offers that never actually end, violating FTC guidelines and consumer expectations',
        mitigation:
          'Set real end dates and honor them. Log sale periods for compliance audits. Never restart the same sale immediately.',
      },
      {
        concern: 'Pressure on Vulnerable Users',
        severity: 'high',
        explanation:
          'Scarcity tactics disproportionately pressure anxious users, compulsive buyers, and those in financial hardship',
        mitigation:
          'Provide cooling-off periods, easy returns, and avoid excessive urgency stacking (multiple scarcity signals on one page).',
      },
      {
        concern: 'Dark Pattern Stacking',
        severity: 'high',
        explanation:
          'Combining scarcity with other dark patterns (hidden costs, confirm-shaming, roach motels) to create manipulative funnels',
        mitigation:
          'Audit entire user flows for dark pattern combinations. Scarcity should stand alone as honest information, not be amplified by manipulative tactics.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Effects of Supply and Demand on Ratings of Object Value',
        author: 'Worchel, S., Lee, J., & Adewole, A.',
        year: 1975,
        description:
          'The foundational "cookie jar" experiment showing that identical cookies were rated as more desirable and valuable when scarce (2 in jar) vs abundant (10 in jar)',
        type: 'foundational',
      },
      {
        title: 'Commodity Theory: An Applied Analysis of the Role of Unavailability in Consumer Demand',
        author: 'Brock, T. C., & Brannon, L. A.',
        year: 1992,
        description:
          'Comprehensive review of commodity theory showing that scarcity increases perceived value across diverse consumer contexts',
        type: 'foundational',
      },
      {
        title: 'Scarcity Appeals in Advertising: The Role of Need for Uniqueness and Fear of Missing Out',
        author: 'Gupta, S., & Gentry, J. W.',
        year: 2019,
        description:
          'Modern research connecting scarcity effectiveness to individual differences in FOMO and need for uniqueness',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter 7 covers the scarcity principle in depth - one of Cialdini\'s six principles of influence. Includes the cookie jar study and extensive real-world applications.',
        type: 'foundational',
      },
      {
        title: 'Scarcity: Why Having Too Little Means So Much',
        author: 'Mullainathan, Sendhil & Shafir, Eldar',
        year: 2013,
        isbn: '9780805092646',
        description:
          'Deep exploration of how scarcity (of time, money, resources) affects cognition and decision-making, with implications for ethical design',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Covers how scarcity and limited offers affect consumer behavior and willingness to pay, with practical experiments',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Scarcity in UX: The Psychological Bias That Became a Dark Pattern',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/scarcity-principle-ux/',
        description:
          'Practical guide on ethical vs manipulative scarcity in digital product design',
        type: 'practical',
      },
      {
        title: 'FTC Guidelines on Advertising Claims of Scarcity',
        author: 'Federal Trade Commission',
        url: 'https://www.ftc.gov/business-guidance/resources/advertising-faqs',
        description:
          'Official FTC guidance on legally compliant scarcity and urgency claims in advertising',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Scarcity Principle: How to Use It Ethically',
        author: 'Cialdini, Robert',
        url: 'https://www.youtube.com/watch?v=cLfANKISaKI',
        description:
          'Cialdini explains the scarcity principle from Influence, with guidance on ethical application',
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
