/**
 * FOCUSING ILLUSION
 *
 * We overemphasize one aspect when making judgments
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const focusingIllusion: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'focusing-illusion',
    name: 'Focusing Illusion',
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
    simple: 'We overemphasize one aspect when making judgments',

    detailed: `The Focusing Illusion is a cognitive bias where people overweight the importance of whatever aspect of life or a decision they are currently thinking about. As Daniel Kahneman famously stated: "Nothing in life is as important as you think it is while you are thinking about it."

When attention is drawn to a particular attribute -- a product feature, a metric, a life circumstance -- that attribute temporarily dominates our judgment, crowding out all other relevant factors. The illusion is not that the focused-on aspect is unimportant, but that we treat it as far more important than it actually is relative to other factors.

In UX and product design, this bias is exploited whenever a hero section spotlights a single feature, a dashboard highlights one KPI, or a keynote dedicates an entire slide to one capability. Users come to believe the focused-on element is the defining characteristic of the product, even when dozens of other features contribute equally to its value.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain overweights whatever aspect of a situation currently occupies focal attention. This happens because:

1. **Attentional Dominance**: Whatever is in the spotlight of attention receives disproportionate weight in evaluation and judgment
2. **Neglect of Absent Information**: Factors not currently in focus are underweighted or ignored entirely -- "what you see is all there is" (WYSIATI)
3. **Emotional Amplification**: Focused-on attributes trigger stronger emotional responses, which further inflate their perceived importance
4. **Substitution Heuristic**: When asked a hard question ("How happy are you with your life?"), we substitute an easier one based on whatever is salient ("How do I feel about what I'm thinking about right now?")
5. **Duration Neglect**: We fail to account for how briefly we will actually focus on the attribute in daily life, overestimating its ongoing impact`,
    },

    realWorldExample: `Kahneman and Schkade (1998) asked people: "How much happier do you think Californians are than Midwesterners?" Both Californians and Midwesterners predicted Californians would be significantly happier, citing climate and lifestyle. In reality, there was no meaningful difference in life satisfaction. The question focused attention on climate, causing respondents to overweight it while neglecting the many other factors (commute times, cost of living, social ties) that actually determine happiness.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Focusing Illusion profoundly affects how users perceive products, features, and value. When a design draws attention to a single attribute, users overweight that attribute in their overall evaluation. Designers can leverage this to:

- Elevate perceived product value by spotlighting the most impressive capability
- Shape feature perception through hero sections that make one feature feel like the whole product
- Influence decision-making through single-metric dashboards that define success by one KPI
- Drive feature adoption by giving a spotlight moment to underused capabilities
- Frame product identity through focused keynote-style presentations`,

    whenToUse: [
      {
        title: 'Hero Section Feature Spotlight',
        scenario:
          'When introducing a product or major feature to new users',
        example:
          'Dedicate the entire hero section to one transformative capability, making it feel like the product\'s defining feature',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Single-Metric KPI Dashboards',
        scenario: 'When users need to focus on the most important outcome metric',
        example:
          'Display one large, prominent KPI (e.g., revenue growth) that becomes the user\'s primary success indicator',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Launch Announcements',
        scenario: 'When launching a new feature and wanting maximum perceived impact',
        example:
          'Dedicate an entire page or modal to the new feature, Apple-keynote style, making it feel monumental',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Focus Screens',
        scenario: 'When introducing users to key product capabilities one at a time',
        example:
          'Show one feature per onboarding screen with full-bleed visuals, so each capability gets its "moment"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Comparison Simplification',
        scenario: 'When helping users choose between options by highlighting differentiators',
        example:
          'Focus the comparison on the single attribute where your product excels (e.g., speed, price, or ease of use)',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Complex Multi-Factor Decisions',
        reason:
          'Focusing on one factor causes users to neglect other critical considerations',
        consequence:
          'Users make lopsided decisions they later regret when unconsidered factors become relevant',
        alternative:
          'Present a balanced scorecard or multi-criteria view that shows all relevant factors',
      },
      {
        title: 'Health or Safety Dashboards',
        reason:
          'Spotlighting one metric can cause dangerous neglect of other warning signs',
        consequence:
          'Critical but unfocused metrics go unnoticed, leading to missed warnings or harm',
        alternative:
          'Use multi-metric dashboards with threshold alerts for all critical indicators',
      },
      {
        title: 'Product Misrepresentation',
        reason:
          'Making one feature seem like the whole product sets false expectations',
        consequence:
          'Users sign up for the spotlight feature and churn when they discover the product is broader or different than expected',
        alternative:
          'Balance feature spotlights with honest product overviews showing the full picture',
      },
      {
        title: 'Financial Planning Interfaces',
        reason:
          'Focusing on returns while neglecting risk, fees, or liquidity distorts investment decisions',
        consequence:
          'Users make poor financial choices based on an incomplete picture',
        alternative:
          'Present returns alongside risk metrics, fees, and time horizon in equal visual weight',
      },
    ],

    commonMistakes: [
      {
        title: 'Single-Metric Tunnel Vision',
        description:
          'Designing dashboards around one hero metric while hiding everything else',
        why: 'Users optimize for the visible metric and neglect all other important factors',
        fix: 'Show the primary metric prominently but include secondary metrics in a visible supporting role',
      },
      {
        title: 'Hero Section Overload',
        description:
          'Dedicating so much space to one feature that users assume the product does only that',
        why: 'The focusing illusion makes the spotlighted feature feel like 90% of the product\'s value',
        fix: 'Follow the hero with a clear "and also" section showing breadth of capabilities',
      },
      {
        title: 'Neglecting the Unfocused',
        description:
          'Never rotating which features get the spotlight, so some capabilities are perpetually invisible',
        why: 'Users can\'t value what they never focus on; un-spotlighted features get zero perceived importance',
        fix: 'Rotate spotlight features seasonally or based on user segment to ensure broad discovery',
      },
      {
        title: 'Spotlight Without Substance',
        description:
          'Using the focusing illusion to inflate a mediocre feature rather than genuinely valuable ones',
        why: 'Users will eventually discover the feature doesn\'t deliver, destroying trust',
        fix: 'Only spotlight features that genuinely deliver outsized value; the illusion amplifies but doesn\'t create value',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines what receives focal attention and therefore disproportionate weight in judgment',
        examples: [
          'Full-width hero sections make one feature feel like the entire product',
          'Single-metric dashboard cards draw all attention to one KPI',
          'One-feature-per-screen onboarding creates intense focus moments',
          'Whitespace isolation makes the focused element feel uniquely important',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography scale creates attention hierarchies that trigger the focusing illusion',
        examples: [
          'Oversized hero headlines make one benefit feel like the only benefit',
          'Large standalone numbers (e.g., "99.9% uptime") dominate perceived value',
          'Single-stat callouts become the user\'s mental model of the product',
          'Small supporting text gets ignored, reinforcing the focus on the headline',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color contrast draws focus to specific elements, amplifying their perceived importance',
        examples: [
          'A single accent-colored metric stands out as "the number that matters"',
          'Monochrome designs with one color pop direct all attention to the focused element',
          'Green/red coding on one metric makes it feel like the sole indicator of health',
          'Desaturated surrounding content reinforces the spotlight on the colored element',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive focus states and animations direct attention and inflate perceived importance',
        examples: [
          'Animated spotlight transitions make a feature feel like a major reveal',
          'Hover states that expand one metric while dimming others create temporary focus',
          'Drill-down interactions that isolate one data point inflate its importance',
          'Auto-scrolling to a single feature section forces focus and overweighting',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy determines which aspects of the product occupy the user\'s attention',
        examples: [
          'One-feature-per-slide keynote presentations make each feature feel revolutionary',
          'Case studies focused on a single metric make that metric seem like the only outcome',
          'Blog posts about one capability shape the product\'s perceived identity',
          'Email campaigns highlighting one feature per message create serial focus moments',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Assistive technology reading order determines which content receives focus for different users',
        examples: [
          'Screen reader users encounter content sequentially, so the first item gets disproportionate focus',
          'Skip links can bypass spotlight content, reducing the focusing illusion for keyboard users',
          'Alt text on hero images can reinforce or counterbalance the visual focus',
          'ARIA live regions that announce one metric repeatedly amplify its perceived importance',
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
        title: 'One-Feature Hero with Breadth Below',
        description:
          'Landing page with a focused hero section followed by a multi-feature overview',
        code: `<section class="hero">
  <h1>Search your entire codebase in milliseconds</h1>
  <p class="hero-subtitle">Instant full-text search across every file, branch, and commit.</p>
  <div class="hero-demo">
    <img src="search-demo.gif" alt="Searching 50,000 files in 0.3 seconds">
  </div>
  <button class="primary">Try It Free</button>
</section>

<section class="also-includes">
  <h2>And that's just the beginning</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <h3>AI Code Review</h3>
      <p>Automated suggestions on every pull request</p>
    </div>
    <div class="feature-card">
      <h3>Team Analytics</h3>
      <p>Understand velocity, quality, and bottlenecks</p>
    </div>
    <div class="feature-card">
      <h3>Security Scanning</h3>
      <p>Catch vulnerabilities before they ship</p>
    </div>
  </div>
</section>`,
        explanation:
          'The hero section uses the focusing illusion ethically: the search speed capability gets its moment, creating a strong first impression. But the "And that\'s just the beginning" section immediately broadens the user\'s view, preventing them from believing search is the entire product.',
        principle:
          'Use focusing illusion for initial impact, then deliberately broaden the frame',
        metrics: {
          before: '23% explored features beyond hero section',
          after: '61% explored features beyond hero section with "just the beginning" prompt',
          improvement: '165% increase in feature discovery while maintaining hero impact',
        },
      },
      {
        title: 'Spotlight KPI with Supporting Context',
        description:
          'Dashboard showing one hero metric with supporting metrics visible',
        code: `<div class="dashboard-header">
  <div class="hero-metric">
    <span class="metric-label">Monthly Recurring Revenue</span>
    <span class="metric-value">$142,800</span>
    <span class="metric-delta positive">+12.3% vs last month</span>
  </div>
  <div class="supporting-metrics">
    <div class="metric-small">
      <span class="label">Churn Rate</span>
      <span class="value">2.1%</span>
    </div>
    <div class="metric-small">
      <span class="label">New Customers</span>
      <span class="value">47</span>
    </div>
    <div class="metric-small">
      <span class="label">Avg. Revenue/User</span>
      <span class="value">$89</span>
    </div>
    <div class="metric-small">
      <span class="label">Customer Satisfaction</span>
      <span class="value">4.6/5</span>
    </div>
  </div>
</div>`,
        explanation:
          'MRR gets the spotlight treatment, leveraging the focusing illusion to make revenue growth feel like the primary success signal. But churn, new customers, ARPU, and satisfaction are all visible, preventing tunnel vision on revenue alone.',
        principle:
          'Spotlight the most important metric while keeping the full picture visible',
      },
      {
        title: 'Feature-Per-Slide Onboarding',
        description:
          'Onboarding flow dedicating one screen per key feature',
        code: `<div class="onboarding-carousel">
  <div class="onboarding-slide active" data-step="1">
    <div class="slide-visual">
      <img src="collab-demo.png" alt="Real-time collaboration demo">
    </div>
    <h2>Work together in real time</h2>
    <p>See your team's changes instantly. No more "who has the latest version?"</p>
    <div class="progress">
      <span class="dot active"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <button class="next">Next</button>
  </div>
  <!-- Slides 2 and 3 spotlight different features -->
</div>`,
        explanation:
          'Each onboarding slide gives one feature its undivided spotlight moment, leveraging the focusing illusion to make each capability feel significant. The progress dots signal there is more to come, managing expectations about product breadth.',
        principle:
          'Sequential focus moments let each feature shine without overshadowing others',
      },
    ],

    bad: [
      {
        title: 'Single-Metric Dashboard with No Context',
        description:
          'Dashboard showing only one metric with no supporting data',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <div class="hero-metric-only">
    <h2>Your Performance</h2>
    <span class="giant-number">847</span>
    <span class="label">Tasks Completed</span>
  </div>
  <!-- No other metrics visible. No quality, no satisfaction, no trends. -->
</div>`,
        explanation:
          'By showing only "tasks completed", the dashboard causes users to optimize entirely for task volume. Quality, customer satisfaction, collaboration, and strategic work all become invisible and therefore worthless in the user\'s mind.',
        principle:
          'Never let the focusing illusion reduce a multi-dimensional outcome to a single number',
      },
      {
        title: 'Hero Section That IS the Product Page',
        description:
          'Landing page that only showcases one feature with no indication of breadth',
        code: `<!-- DON'T DO THIS -->
<div class="landing-page">
  <section class="hero full-page">
    <h1>The Fastest Data Import You've Ever Seen</h1>
    <p>Import millions of rows in seconds. That's it. That's the product.</p>
    <video autoplay loop src="import-demo.mp4"></video>
    <button class="cta">Start Importing</button>
  </section>
  <!-- Nothing else. No other features mentioned. -->
</div>`,
        explanation:
          'Making data import the entire landing page causes users to believe the product is just an import tool. The focusing illusion hides the analytics, collaboration, and visualization features that make up 80% of the product\'s value.',
        principle:
          'Do not let a single-feature spotlight become the user\'s entire mental model of your product',
      },
      {
        title: 'Comparison Page Focused on One Dimension',
        description:
          'Product comparison highlighting only the dimension where you win',
        code: `<!-- DON'T DO THIS -->
<div class="comparison">
  <h2>Why We're Better</h2>
  <table>
    <tr>
      <th>Speed</th>
      <td class="us winner">0.3s</td>
      <td class="them">2.1s</td>
    </tr>
  </table>
  <!-- Only shows speed. Hides features, price, support, integrations
       where competitors may be stronger. -->
</div>`,
        explanation:
          'Focusing the entire comparison on speed -- the one dimension where you win -- exploits the focusing illusion to make users believe speed is the only thing that matters. This is misleading when users also need integrations, support, and features.',
        principle:
          'Single-dimension comparisons exploit the focusing illusion to mislead',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Keynote Presentations',
        url: 'https://www.apple.com/apple-events/',
        description:
          'Apple dedicates entire keynote slides -- sometimes 2-3 minutes each -- to a single feature (e.g., "the best camera we\'ve ever made"). By giving each feature its own focused moment, Apple makes every individual capability feel revolutionary, even incremental improvements.',
        effectiveness: 'very-effective',
        analysis:
          'The one-feature-per-slide approach is a masterclass in the focusing illusion. Each feature feels monumental during its spotlight, and the sequential presentation prevents features from diluting each other. Users leave believing the product has ten revolutionary improvements.',
      },
      {
        company: 'Stripe',
        product: 'Single-Metric Dashboard',
        url: 'https://dashboard.stripe.com',
        description:
          'Stripe\'s dashboard prominently displays total revenue as the hero metric, making revenue feel like the single most important measure of business health. Supporting metrics exist but are visually subordinate.',
        effectiveness: 'effective',
        analysis:
          'The hero metric approach leverages the focusing illusion to give users a clear "north star." However, Stripe balances this by showing supporting metrics (payments, customers, disputes) in a secondary tier, preventing pure tunnel vision.',
      },
      {
        company: 'Peloton',
        product: 'Leaderboard & Output Score',
        url: 'https://www.onepeloton.com',
        description:
          'Peloton prominently displays a single "output" number during rides, making users hyper-focus on this metric. The focusing illusion causes riders to optimize for output while potentially neglecting form, recovery, and holistic fitness.',
        effectiveness: 'effective',
        analysis:
          'Effective at driving engagement and motivation through a single focused metric. However, the focusing illusion can cause unhealthy overtraining when users define their fitness entirely by one number.',
      },
      {
        company: 'Spotify',
        product: 'Wrapped Campaign',
        url: 'https://www.spotify.com/wrapped/',
        description:
          'Spotify Wrapped focuses users on one statistic per screen: top artist, minutes listened, top genre. Each metric gets a full-screen spotlight moment, making each feel significant and share-worthy.',
        effectiveness: 'very-effective',
        analysis:
          'Sequential focus moments turn routine listening data into viral content. Each stat feels monumental because it occupies the user\'s entire attention for that screen. The one-stat-per-screen format is pure focusing illusion design.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard: Single Hero Metric vs Multi-Metric Grid',
        hypothesis:
          'A single hero metric will increase user focus and engagement but may reduce decision quality',
        controlVersion: {
          description:
            'Dashboard showing 6 equally-sized metric cards in a grid: revenue, churn, NPS, active users, support tickets, uptime',
          metrics: {
            conversionRate: '71% reported feeling "in control"',
            timeOnPage: '4:12',
            scrollDepth: '85%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard with one oversized revenue metric as hero, plus 5 smaller supporting metrics below the fold',
          metrics: {
            conversionRate: '89% reported feeling "in control"',
            timeOnPage: '2:45',
            scrollDepth: '42%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Users felt more "in control" with the single hero metric (89% vs 71%) and spent less time before taking action. However, they were 3x less likely to notice a churn rate spike, demonstrating the focusing illusion\'s double edge.',
          learnings: [
            'Single-metric focus increases perceived clarity and control',
            'Users engage faster when one metric dominates attention',
            'Critical secondary metrics can be dangerously neglected',
            'Best approach: hero metric with visible supporting metrics and threshold alerts',
          ],
        },
      },
      {
        title: 'Landing Page: One Feature Hero vs Multi-Feature Overview',
        hypothesis:
          'Focusing the hero on a single feature will create stronger product perception than showing multiple features',
        controlVersion: {
          description:
            'Hero section listing 5 features with icons: "Fast search, AI review, team analytics, security scanning, and integrations"',
          metrics: {
            conversionRate: '3.1%',
            timeOnPage: '1:48',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Hero section focused entirely on search speed with demo animation, followed by "Also includes" section listing other features',
          metrics: {
            conversionRate: '5.4%',
            timeOnPage: '2:33',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The single-feature hero increased conversions by 74%. Users who saw the focused hero could articulate the product\'s value in one sentence, while multi-feature users struggled to describe what the product does.',
          learnings: [
            'Focusing illusion creates a clearer mental model and stronger value perception',
            'Users need one memorable thing to anchor their understanding',
            'The "also includes" section successfully broadened perception after initial focus',
            'Multi-feature heroes dilute rather than strengthen product perception',
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
        name: 'Single-Feature Hero',
        description:
          'A full-width or full-screen section dedicated to one feature or benefit',
        howToSpot:
          'Look for hero sections, splash screens, or modals that showcase only one capability with large visuals and minimal supporting content',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Oversized Solo Metric',
        description:
          'One number displayed dramatically larger than all other data on the page',
        howToSpot:
          'Look for giant standalone numbers, single-KPI dashboards, or metrics that visually dominate the entire viewport',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'One-Per-Screen Layout',
        description:
          'Content structured so only one concept, feature, or data point is visible at a time',
        howToSpot:
          'Look for carousel slides, onboarding screens, or keynote-style layouts showing one item per view',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Whitespace Isolation',
        description:
          'A single element surrounded by generous whitespace, making it the sole focus of attention',
        howToSpot:
          'Check for elements with disproportionate padding or margin that isolate them from surrounding content',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Single-Dimension Comparison',
        description:
          'Comparison tables or graphics that highlight only one attribute across options',
        howToSpot:
          'Look for comparison pages that emphasize speed, price, or one feature while minimizing or hiding other dimensions',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Spotlight Feature Pattern',
        description: 'One feature receives disproportionate visual real estate and attention',
        indicators: [
          'Full-width hero dedicated to a single capability',
          'Feature launch pages with one feature per page',
          'Keynote-style "one slide, one idea" layouts',
          'Product tours that linger on one feature',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Hero Metric Pattern',
        description: 'One KPI is visually dominant, creating tunnel vision on a single outcome measure',
        indicators: [
          'Single oversized number at top of dashboard',
          'One metric with color/animation while others are muted',
          'Gamification around a single score or number',
          'Leaderboards ranked by one dimension',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Sequential Focus Pattern',
        description: 'Content presented one item at a time so each gets an isolated spotlight moment',
        indicators: [
          'Onboarding carousels with one feature per slide',
          'Spotify Wrapped-style one-stat-per-screen reveals',
          'Product announcement emails with one feature per section',
          'Scroll-triggered animations revealing one item at a time',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Selective Comparison Pattern',
        description: 'Comparisons that focus on a single favorable dimension while hiding others',
        indicators: [
          'Comparison tables with only one row',
          '"We\'re X times faster" without mentioning other factors',
          'Single-attribute product positioning',
          'Reviews or quotes about one specific aspect',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the design give disproportionate visual weight to one feature or metric?',
      'Is there a single hero element that might become the user\'s entire mental model?',
      'Are important secondary factors visible or buried below the fold?',
      'Does the dashboard focus on one KPI while hiding other critical health indicators?',
      'Is the comparison showing all relevant dimensions or just the favorable ones?',
      'Would a user who only sees the hero section have an accurate understanding of the product?',
      'Are spotlight features rotated, or does one capability permanently dominate?',
      'Do onboarding flows give each feature its own focus moment, or pile everything together?',
      'Is the focused-on attribute genuinely the most important, or just the easiest to showcase?',
      'Could the focused element cause users to neglect critical secondary information?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the focusing illusion.

Analyze the provided design for focusing illusion patterns. Identify:

1. **Spotlight Elements**: Features, metrics, or content that receive disproportionate attention
2. **Neglected Factors**: Important information that is hidden, minimized, or absent
3. **Single-Metric Focus**: Dashboards or interfaces that reduce complex outcomes to one number
4. **Sequential Focus**: Content structured to give isolated spotlight moments to individual items
5. **Selective Comparisons**: Comparisons that highlight one favorable dimension while hiding others

For each pattern found:
- Identify what is being focused on and what is being neglected
- Assess whether the focus accurately reflects relative importance
- Determine if neglected factors could lead to poor decisions
- Evaluate whether the design broadens the frame after the initial focus
- Suggest improvements for balanced information architecture

Consider:
- Is the focused element genuinely the most important, or just the easiest to showcase?
- Could users make poor decisions by overweighting the spotlighted attribute?
- Does the design eventually broaden the user's view, or maintain tunnel vision?
- Are there critical secondary metrics or features that deserve more visibility?
- Is the focusing illusion being used to inform users or to mislead them?

Provide actionable recommendations for ethical, balanced use of attention focus.`,

    outputSchema: {
      type: 'object',
      properties: {
        focusPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              focusedElement: { type: 'string' },
              neglectedFactors: { type: 'string' },
              importanceAccuracy: { type: 'string' },
              potentialHarm: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'focusedElement',
              'neglectedFactors',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            focusConcentration: { type: 'number' },
            informationBalance: { type: 'number' },
            frameBroadening: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'focusConcentration',
            'informationBalance',
            'frameBroadening',
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
        'focusPatterns',
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
        title: 'Identify the Spotlight Element',
        description:
          'Determine which feature, metric, or benefit deserves the user\'s focused attention',
        example:
          'Goal: Make users understand that "instant search" is the product\'s key differentiator',
        tips: [
          'Choose the attribute that genuinely matters most to your target users',
          'Validate with user research that the spotlight element matches real needs',
          'Consider whether the spotlight changes for different user segments',
        ],
      },
      {
        step: 2,
        title: 'Design the Focus Moment',
        description:
          'Create a dedicated visual space where the spotlight element gets undivided attention',
        example:
          'Full-width hero section with animated search demo, zero competing elements',
        tips: [
          'Use whitespace, scale, and isolation to maximize focus',
          'Remove competing visual elements from the spotlight area',
          'Consider one-feature-per-screen for onboarding flows',
        ],
      },
      {
        step: 3,
        title: 'Broaden the Frame',
        description:
          'After the focus moment, deliberately expand the user\'s view to include other important factors',
        example:
          'Follow the search hero with "And that\'s just the beginning" section showing 4 more features',
        tips: [
          'Use transitional language ("Also includes", "Plus", "And that\'s just the beginning")',
          'Show secondary features in a grid or list immediately after the spotlight',
          'Ensure the broadening section is above the fold or has clear scroll cues',
        ],
      },
      {
        step: 4,
        title: 'Balance Dashboard Metrics',
        description:
          'If using a hero metric, ensure supporting metrics are visible and not hidden',
        example:
          'Large MRR hero metric with churn, NPS, active users, and support tickets visible below',
        tips: [
          'Supporting metrics should be visible without scrolling',
          'Add threshold alerts for secondary metrics so spikes aren\'t missed',
          'Rotate the hero metric periodically to prevent permanent tunnel vision',
        ],
      },
      {
        step: 5,
        title: 'Test for Tunnel Vision',
        description:
          'Measure whether users are neglecting important factors due to the focusing illusion',
        example:
          'Ask users: "What does this product do?" If they only mention the hero feature, the frame needs broadening',
        tips: [
          'Run comprehension tests: can users name at least 3 product capabilities?',
          'Monitor whether secondary metrics are being reviewed in dashboards',
          'Track whether users discover and use non-spotlighted features',
        ],
      },
    ],

    dos: [
      'Give important features dedicated spotlight moments for maximum impact',
      'Follow focus moments with frame-broadening content showing the full picture',
      'Use single-metric heroes for dashboards, with supporting metrics visible',
      'Rotate spotlight features to ensure broad discovery over time',
      'Use sequential focus (one per screen) for onboarding to make each feature memorable',
      'Validate that the spotlighted element is genuinely the most important for users',
      'Add threshold alerts for non-spotlighted metrics in dashboards',
      'Test user comprehension to ensure the focusing illusion isn\'t creating tunnel vision',
    ],

    donts: [
      'Don\'t let a single-feature hero become the user\'s entire mental model of your product',
      'Don\'t design single-metric dashboards without visible supporting indicators',
      'Don\'t use single-dimension comparisons to hide weaknesses',
      'Don\'t spotlight a mediocre feature just because it\'s easy to demonstrate',
      'Don\'t permanently focus on one feature while letting others remain invisible',
      'Don\'t use the focusing illusion to distract from genuine product limitations',
      'Don\'t reduce complex multi-factor decisions to one dimension',
      'Don\'t neglect secondary metrics in health or safety contexts',
    ],

    bestPractices: [
      {
        title: 'Spotlight Then Broaden',
        description:
          'Give each key feature an intense focus moment, then immediately broaden the user\'s frame',
        rationale:
          'The focusing illusion creates impact; broadening prevents tunnel vision',
        example:
          'Hero section for one feature, then "Plus everything you need" grid below',
      },
      {
        title: 'Hero Metric with Safety Net',
        description:
          'Use a prominent hero metric in dashboards but add threshold alerts for secondary metrics',
        rationale:
          'Users will focus on the hero metric; alerts ensure critical changes elsewhere aren\'t missed',
        example:
          'Large revenue number as hero, with red alert badges on churn or NPS if they cross thresholds',
      },
      {
        title: 'Rotate the Spotlight',
        description:
          'Periodically change which feature or metric receives the spotlight treatment',
        rationale:
          'Permanent focus on one element makes other capabilities invisible to users',
        example:
          'Monthly rotation of dashboard hero metric; seasonal rotation of landing page hero feature',
      },
      {
        title: 'Multi-Dimension Comparisons',
        description:
          'When comparing products or options, show all relevant dimensions, not just the favorable one',
        rationale:
          'Single-dimension comparisons exploit the focusing illusion to mislead users',
        example:
          'Comparison table with speed, features, price, support, and integrations -- not just speed',
      },
      {
        title: 'Sequential Focus for Onboarding',
        description:
          'Use one-feature-per-screen layouts during onboarding to give each capability its moment',
        rationale:
          'Sequential focus makes each feature feel significant without features competing for attention',
        example:
          'Onboarding carousel: slide 1 = collaboration, slide 2 = analytics, slide 3 = integrations',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure spotlight elements have semantic equivalents for screen readers',
        implementation:
          'Use proper heading levels and ARIA labels so screen reader users perceive the same emphasis hierarchy as sighted users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Reading order should reflect the intended focus hierarchy',
        implementation:
          'Ensure DOM order places the spotlight element first, matching the visual focus, so screen readers encounter it with the same priority',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings to signal focus transitions',
        implementation:
          'Label spotlight sections and broadening sections with descriptive headings so all users understand the content structure',
      },
    ],

    ethics: [
      {
        concern: 'Feature Misrepresentation',
        severity: 'high',
        explanation:
          'Spotlighting one feature so intensely that users believe the product is only that feature, leading to mismatched expectations',
        mitigation:
          'Always follow spotlight sections with frame-broadening content. Ensure marketing accurately represents the product\'s full scope.',
      },
      {
        concern: 'Metric Tunnel Vision',
        severity: 'critical',
        explanation:
          'Single-metric dashboards causing users to neglect critical health, safety, or business indicators',
        mitigation:
          'Always display supporting metrics visibly. Add threshold alerts for secondary metrics. Never use single-metric views for health or safety contexts.',
      },
      {
        concern: 'Selective Comparison',
        severity: 'high',
        explanation:
          'Focusing comparisons on one favorable dimension to hide weaknesses or mislead users',
        mitigation:
          'Show multi-dimensional comparisons. Disclose when a comparison is limited to one attribute. Link to full comparison data.',
      },
      {
        concern: 'Attention Manipulation',
        severity: 'medium',
        explanation:
          'Using the focusing illusion to distract users from product limitations, hidden costs, or important disclaimers',
        mitigation:
          'Ensure important information (pricing, limitations, terms) is never in the neglected zone of a spotlight layout. Critical details should be visible without requiring users to look past the focused element.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Would You Be Happier If You Were Richer? A Focusing Illusion',
        author: 'Kahneman, D., Krueger, A. B., Schkade, D., Schwarz, N., & Stone, A.',
        year: 2006,
        doi: '10.1126/science.1129688',
        url: 'https://science.sciencemag.org/content/312/5782/1908',
        description:
          'Landmark paper demonstrating that people overestimate the impact of income on happiness due to the focusing illusion',
        type: 'foundational',
      },
      {
        title: 'Does Living in California Make People Happy? A Focusing Illusion in Judgments of Life Satisfaction',
        author: 'Schkade, D. A., & Kahneman, D.',
        year: 1998,
        doi: '10.1111/1467-9280.00066',
        description:
          'The classic study showing that focusing on climate causes people to overestimate happiness differences between Californians and Midwesterners',
        type: 'foundational',
      },
      {
        title: 'The Focusing Illusion in Judgments of Well-Being',
        author: 'Kahneman, D., & Schkade, D.',
        year: 1998,
        description:
          'Explores how focusing on any single life domain distorts overall well-being judgments',
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
          'Chapter 38 covers the focusing illusion in depth, including the famous quote: "Nothing in life is as important as you think it is while you are thinking about it"',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores how the focusing illusion causes people to mispredict what will make them happy, relevant to product satisfaction and feature prioritization',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Focusing Illusion in Product Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/focusing-illusion/',
        description:
          'Practical guide to how the focusing illusion affects product perception and feature evaluation in UX design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Focusing Illusion - Daniel Kahneman',
        author: 'TED',
        url: 'https://www.youtube.com/watch?v=XgRlrBl-7Yg',
        description:
          'Kahneman explains how the focusing illusion distorts our judgments about happiness, income, and life satisfaction',
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
