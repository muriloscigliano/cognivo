/**
 * ESCALATION OF COMMITMENT
 *
 * We increase commitment to a failing course of action
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const escalationCommitment: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'escalation-commitment',
    name: 'Escalation of Commitment',
    aliases: ['Sunk Cost Fallacy', 'Concorde Effect', 'Irrational Escalation', 'Commitment Bias'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.EMOTIONAL,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'decision-making',
      'sunk-cost',
      'investment',
      'persistence',
      'retention',
      'cancellation',
      'commitment',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We increase commitment to a failing course of action',

    detailed: `Escalation of commitment is a decision-making bias where individuals continue investing time, money, or effort into a failing course of action because of their prior investment, even when objective evidence suggests they should stop. The more someone has already invested, the harder it becomes to walk away — regardless of future prospects.

This bias is driven by loss aversion, self-justification, and the desire for consistency. People feel that abandoning a course of action "wastes" their prior investment, even though that investment is already gone (a sunk cost) and cannot be recovered. The emotional weight of admitting failure compounds the rational calculation.

In product and UX design, escalation of commitment appears in subscription cancellation flows, project management tools, investment platforms, and any context where users have accumulated history, data, or spending. Ethical designers must provide clear exit ramps and honest progress indicators rather than exploiting users' reluctance to abandon sunk costs.`,

    psychologyBasis: {
      discoveredBy: 'Barry M. Staw',
      year: 1976,
      theory: 'Self-Justification Theory / Sunk Cost Research',
      mechanism: `The brain resists abandoning a course of action in which resources have already been invested. This happens because:

1. **Self-Justification**: People justify prior decisions by continuing to invest, avoiding the admission that the original decision was wrong
2. **Loss Aversion**: The pain of "losing" what has already been invested feels greater than the rational cost of continuing
3. **Completion Desire**: Humans have a deep-seated need to finish what they start (Zeigarnik effect), making abandonment psychologically uncomfortable
4. **Consistency Motivation**: People want to appear consistent in their decisions, both to themselves and others
5. **Sunk Cost Weighting**: The brain incorrectly treats irrecoverable past costs as relevant to future decisions, even though only future costs and benefits should matter

The mechanism is emotionally driven — the larger the prior investment, the stronger the compulsion to continue, regardless of objective prospects for success.`,
    },

    realWorldExample: `The Concorde supersonic jet is the classic example. Both the British and French governments continued funding the aircraft for decades despite mounting evidence it would never be commercially viable. By the time it was clear the project was failing, so much money had been spent that neither government could justify "wasting" the investment by cancelling. The result: billions more were poured into a plane that never turned a profit. The project became so synonymous with this bias that economists call it the "Concorde Fallacy."`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Escalation of commitment profoundly affects how users interact with products they've invested time, money, or effort into. Designers can either exploit this bias — making it painful to leave — or respect it by providing honest assessments and clear exit paths. Key areas include:

- Subscription cancellation flows that guilt-trip or create friction
- Project management tools that don't signal when to pivot or stop
- Investment platforms that don't encourage portfolio reassessment
- Loyalty programs that reward continued spending regardless of value
- Onboarding flows that front-load effort to increase switching costs`,

    whenToUse: [
      {
        title: 'Honest Progress Dashboards',
        scenario:
          'When helping users evaluate whether to continue investing in a project or goal',
        example:
          'Show objective metrics alongside investment totals so users can make rational continue-or-stop decisions',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Clear Exit Ramps',
        scenario: 'When users need to cancel, downgrade, or abandon a commitment',
        example:
          'Provide a simple, guilt-free cancellation flow that acknowledges the user\'s decision and offers data export',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Pivot Suggestions in Project Tools',
        scenario: 'When a user\'s project shows signs of stalling or failing',
        example:
          'Proactively suggest "It looks like progress has stalled. Would you like to archive this project or adjust the scope?"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Investment Rebalancing Prompts',
        scenario: 'When users hold losing positions or underperforming investments',
        example:
          'Prompt users to review underperforming assets with objective data, separating past losses from future prospects',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Value Reports',
        scenario: 'When helping users evaluate whether a subscription is worth continuing',
        example:
          'Send periodic "Here\'s what you used this month" reports so users can make informed renewal decisions',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Retention-at-All-Costs Flows',
        reason:
          'Exploiting sunk cost psychology to prevent users from cancelling is manipulative',
        consequence:
          'Users feel trapped, leave negative reviews, and distrust the brand permanently',
        alternative:
          'Make cancellation easy and offer a genuine reason to stay (pause, downgrade, discount) without guilt',
      },
      {
        title: 'Guilt-Based Retention Messaging',
        reason:
          'Reminding users how much they\'ve invested to discourage leaving is exploitative',
        consequence:
          'Users feel manipulated, leading to resentment and vocal criticism',
        alternative:
          'Focus on future value, not past investment. Show what they\'ll gain by staying, not what they\'ll "lose"',
      },
      {
        title: 'Artificial Switching Costs',
        reason:
          'Making it technically difficult to export data or migrate away locks users in through escalation',
        consequence:
          'Regulatory risk, user resentment, and eventual mass exodus when alternatives emerge',
        alternative:
          'Offer easy data export and migration tools. Compete on value, not lock-in',
      },
      {
        title: 'Hidden Cancellation Flows',
        reason:
          'Burying cancellation options deep in settings exploits users\' reluctance to invest more effort in leaving',
        consequence:
          'FTC complaints, chargebacks, negative press, and loss of trust',
        alternative:
          'Make cancellation as easy to find as sign-up. One-click cancel with confirmation',
      },
    ],

    commonMistakes: [
      {
        title: 'Dark Pattern Cancellation Flows',
        description:
          'Multi-step cancellation with guilt-tripping messages like "Are you sure? You\'ll lose all your data!"',
        why: 'Exploits escalation of commitment by making the act of leaving feel like an additional loss',
        fix: 'One-click cancellation with optional feedback. Offer data export and the ability to reactivate later',
      },
      {
        title: 'Investment Reminders as Retention',
        description:
          'Showing "You\'ve been a member for 3 years!" or "You\'ve spent $2,400 with us" when users try to leave',
        why: 'Uses sunk cost language to trigger escalation bias and prevent rational exit decisions',
        fix: 'Focus on future value: "Here\'s what you\'ll have access to if you stay" rather than past spending',
      },
      {
        title: 'No Signals When to Stop',
        description:
          'Project or investment tools that never suggest pivoting, pausing, or cutting losses',
        why: 'Users continue investing because the tool provides no objective checkpoint for reassessment',
        fix: 'Build in milestone reviews, stall detection, and honest progress assessments',
      },
      {
        title: 'Gamification That Punishes Quitting',
        description:
          'Streak counters, level systems, or badges that are lost on cancellation',
        why: 'Artificial investment creates psychological switching costs that exploit escalation bias',
        fix: 'Let users pause streaks, preserve progress, or reactivate without penalty',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how visible exit options and progress assessments are',
        examples: [
          'Cancellation buttons buried in deep settings pages exploit escalation bias',
          'Prominent "Review your progress" dashboards help users make rational decisions',
          'Side-by-side comparison of investment vs returns enables honest assessment',
          'Clear navigation to account management prevents feeling trapped',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis affects how sunk cost information and exit options are perceived',
        examples: [
          'Large, bold sunk cost figures ("You\'ve invested $5,000!") trigger escalation',
          'Subtle, small cancel links reduce discoverability of exit paths',
          'Clear, neutral language in cancellation flows respects user autonomy',
          'Warning text size and weight influences perceived severity of leaving',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color can either guilt users into staying or provide neutral, clear exit paths',
        examples: [
          'Red "cancel" buttons paired with green "stay" buttons frame leaving as dangerous',
          'Neutral, equally-weighted button colors for stay/leave respect user choice',
          'Progress bars using achievement colors (gold, green) increase perceived investment',
          'Warning colors on exit pages trigger loss aversion and escalation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns around cancellation and commitment directly exploit or respect this bias',
        examples: [
          'Multi-step cancellation wizards increase friction and trigger escalation',
          'One-click cancellation with confirmation respects user decision',
          '"Are you sure?" modals with investment reminders exploit sunk cost psychology',
          'Pause-instead-of-cancel options provide healthy intermediate alternatives',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users feel guilty about leaving or empowered to make good decisions',
        examples: [
          '"You\'ll lose all your progress" exploits escalation of commitment',
          '"Your data will be available for 30 days if you change your mind" respects autonomy',
          'Objective progress reports help users evaluate continued investment rationally',
          '"We\'re sorry to see you go" vs "Don\'t throw away 3 years of work!" — framing matters',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility of exit paths must be equal to accessibility of sign-up paths',
        examples: [
          'Screen reader users must be able to find cancellation options easily',
          'Keyboard navigation to cancel must not require more steps than to subscribe',
          'ARIA labels on cancel flows should be clear and non-manipulative',
          'Cognitive accessibility: cancellation language should be simple and direct',
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
        title: 'Netflix Easy Cancellation',
        description:
          'Simple, guilt-free cancellation flow with clear options',
        code: `<div class="cancellation-flow">
  <h3>Cancel Membership</h3>
  <p>Your membership will continue until the end of your billing period
     on March 28. You won't be charged again.</p>

  <div class="options">
    <button class="primary">Finish Cancellation</button>
    <button class="secondary">Go Back</button>
  </div>

  <p class="reassurance">
    You can restart your membership anytime.
    Your profile and preferences will be saved for 10 months.
  </p>
</div>`,
        explanation:
          'Netflix makes cancellation a two-click process with no guilt-tripping. They acknowledge the decision, preserve user data, and make reactivation easy. This respects user autonomy rather than exploiting sunk cost psychology.',
        principle:
          'Easy exit paths build trust and often lead to higher reactivation rates',
        metrics: {
          before: 'Industry average: 15% of users who want to cancel complete the process',
          after: 'Netflix: 95% completion rate, 30% reactivate within 3 months',
          improvement: 'Respecting users leads to higher lifetime value through voluntary return',
        },
      },
      {
        title: 'Honest Project Health Dashboard',
        description:
          'Project management tool showing objective progress signals',
        code: `<div class="project-health">
  <h3>Project Health Check</h3>

  <div class="status warning">
    <span class="indicator">Needs Attention</span>
    <p>This project has been inactive for 3 weeks</p>
  </div>

  <div class="metrics">
    <div class="metric">
      <span class="label">Completed</span>
      <span class="value">23%</span>
    </div>
    <div class="metric">
      <span class="label">Original deadline</span>
      <span class="value overdue">2 months ago</span>
    </div>
    <div class="metric">
      <span class="label">Team velocity</span>
      <span class="value declining">Declining</span>
    </div>
  </div>

  <div class="actions">
    <button class="primary">Reassess Scope</button>
    <button class="secondary">Archive Project</button>
    <button class="tertiary">Continue As-Is</button>
  </div>
</div>`,
        explanation:
          'Instead of silently letting users pour more time into a stalled project, this dashboard proactively surfaces objective health signals and offers actionable alternatives including archiving. The "Archive Project" option provides a dignified exit ramp.',
        principle:
          'Proactive health checks help users overcome escalation bias with objective data',
      },
      {
        title: 'Subscription Usage Report',
        description:
          'Monthly email showing actual usage vs subscription cost',
        code: `<div class="usage-report">
  <h3>Your Monthly Value Report</h3>

  <div class="usage-summary">
    <div class="stat">
      <span class="label">Features used this month</span>
      <span class="value">3 of 25</span>
    </div>
    <div class="stat">
      <span class="label">Your plan</span>
      <span class="value">Pro ($49/mo)</span>
    </div>
    <div class="stat">
      <span class="label">Suggested plan</span>
      <span class="value highlight">Basic ($19/mo) covers your usage</span>
    </div>
  </div>

  <div class="actions">
    <button class="primary">Downgrade to Basic</button>
    <button class="secondary">Keep Pro Plan</button>
  </div>
</div>`,
        explanation:
          'Proactively telling users they could save money builds enormous trust. Rather than exploiting the sunk cost of being on a higher plan, this approach helps users make rational decisions about continued investment.',
        principle:
          'Transparent usage reporting combats escalation of commitment with honest data',
        metrics: {
          before: '8% voluntary downgrades, 12% churn',
          after: '15% voluntary downgrades, 4% churn',
          improvement: 'Lower churn despite more downgrades — users who feel respected stay longer',
        },
      },
    ],

    bad: [
      {
        title: 'Guilt-Trip Cancellation Flow',
        description:
          'Multi-step cancellation that reminds users of sunk costs',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <h2>Are you really sure?</h2>
  <div class="guilt-stats">
    <p class="large-number">You've been a loyal member for <strong>847 days</strong></p>
    <p>You've built <strong>156 projects</strong> with us</p>
    <p>Your team has logged <strong>2,340 hours</strong> in the platform</p>
    <p class="warning">All of this will be gone forever if you cancel.</p>
  </div>
  <button class="danger">I still want to cancel (Step 2 of 5)</button>
  <button class="primary large">Keep My Account!</button>
</div>`,
        explanation:
          'This design deliberately exploits escalation of commitment by surfacing sunk cost data (days, projects, hours) at the moment of cancellation. The "Step 2 of 5" creates additional friction, and the warning about losing everything triggers loss aversion on top of sunk cost psychology.',
        principle:
          'Never use sunk cost reminders to prevent users from making autonomous exit decisions',
      },
      {
        title: 'Hidden Cancellation Path',
        description:
          'Cancellation buried behind multiple navigational layers',
        code: `<!-- DON'T DO THIS -->
<!-- Settings > Account > Billing > Subscription > Manage > Cancel -->
<div class="settings-page">
  <nav class="settings-nav">
    <a href="/settings/profile">Profile</a>
    <a href="/settings/notifications">Notifications</a>
    <a href="/settings/privacy">Privacy</a>
    <a href="/settings/account">Account</a>
    <!-- Cancel is 5 clicks deep from here -->
  </nav>
  <!-- No direct cancel link visible anywhere -->
</div>`,
        explanation:
          'Hiding the cancellation option deep in navigation exploits escalation of commitment by making the effort to cancel feel like yet another investment. Users who have already invested significant effort just finding the option are more likely to give up and stay.',
        principle:
          'Exit paths should be as discoverable as entry paths — hiding them exploits sunk cost psychology',
      },
      {
        title: 'Investment-Shaming Retention Modal',
        description:
          'Popup that frames cancellation as wasting your investment',
        code: `<!-- DON'T DO THIS -->
<dialog class="retention-modal">
  <h2>Don't throw away your investment!</h2>
  <div class="investment-summary">
    <p>Total spent: <strong class="red">$2,847.00</strong></p>
    <p>That's like throwing away:</p>
    <ul>
      <li>A vacation to Hawaii</li>
      <li>142 fancy coffees</li>
      <li>A new MacBook</li>
    </ul>
  </div>
  <p class="emotional">Your data, your projects, your history —
     all gone. Are you sure you want to waste all that money?</p>
  <button class="small muted">Yes, waste my money and cancel</button>
  <button class="large primary">Save my investment!</button>
</dialog>`,
        explanation:
          'This is a textbook dark pattern that exploits escalation of commitment. It reframes past spending as something that can be "saved" by continuing to spend, uses vivid comparisons to amplify the perceived loss, and shames the user\'s decision with loaded language ("waste my money").',
        principle:
          'Past spending is a sunk cost — framing continued subscription as "saving" that investment is manipulative',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Cancellation Flow',
        url: 'https://www.netflix.com',
        description: 'Netflix offers one of the simplest cancellation flows in the industry: two clicks, no guilt-tripping, data preserved for 10 months, and easy reactivation. This approach respects user autonomy and results in high reactivation rates.',
        effectiveness: 'very-effective',
        analysis: 'By not exploiting escalation of commitment, Netflix builds trust. Users who feel free to leave are more likely to return. Their reactivation rate is significantly higher than competitors with adversarial cancellation flows.',
      },
      {
        company: 'Basecamp',
        product: 'Account Cancellation',
        url: 'https://www.basecamp.com',
        description: 'Basecamp provides a straightforward cancellation with full data export. They explicitly avoid guilt-tripping and have publicly committed to ethical cancellation practices.',
        effectiveness: 'very-effective',
        analysis: 'Basecamp treats easy cancellation as a brand value. Users trust the product more when they know they can leave freely, paradoxically increasing retention through reduced anxiety about commitment.',
      },
      {
        company: 'Adobe',
        product: 'Creative Cloud Cancellation',
        description: 'Adobe Creative Cloud requires navigating through multiple retention screens, early termination fees, and sunk cost reminders ("You\'ve been a member for X years"). This exploits escalation of commitment and generates significant user resentment.',
        effectiveness: 'somewhat-effective',
        analysis: 'While this approach reduces short-term cancellations, it generates enormous negative sentiment. Users feel trapped and actively seek alternatives, leading to competitor adoption when viable options emerge.',
      },
      {
        company: 'Peloton',
        product: 'Subscription & Equipment',
        description: 'Peloton users who bought a $2,000+ bike feel compelled to maintain the $44/mo subscription to justify the hardware investment, even if they rarely ride. The physical equipment acts as a constant sunk cost reminder.',
        effectiveness: 'effective',
        analysis: 'The hardware investment creates powerful escalation of commitment. Users maintain subscriptions far longer than usage would justify because cancelling feels like "wasting" the bike purchase. This is a structural example of the bias, not necessarily a deliberate dark pattern.',
      },
    ],

    abTests: [
      {
        title: 'Cancellation Flow: Guilt-Trip vs Clean Exit',
        hypothesis:
          'A clean, respectful cancellation flow will result in higher reactivation rates despite higher immediate cancellation completion',
        controlVersion: {
          description:
            'Multi-step cancellation with sunk cost reminders: "You\'ve been with us 2 years, built 45 projects, invested $1,200"',
          metrics: {
            conversionRate: '34% complete cancellation',
            reactivationRate: '8% reactivate within 6 months',
          },
        },
        treatmentVersion: {
          description:
            'Two-step cancellation with no guilt: "We\'re sorry to see you go. Your data will be saved for 90 days."',
          metrics: {
            conversionRate: '78% complete cancellation',
            reactivationRate: '27% reactivate within 6 months',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While more users completed cancellation in the clean flow, the reactivation rate was 3.4x higher. Net revenue over 12 months was 18% higher for the respectful cancellation group because returning users had higher engagement and longer subsequent retention.',
          learnings: [
            'Guilt-tripping reduces immediate cancellations but destroys long-term trust',
            'Users who feel free to leave are far more likely to return voluntarily',
            'Sunk cost reminders increase resentment, not loyalty',
            'Easy cancellation is a competitive advantage, not a weakness',
          ],
        },
      },
      {
        title: 'Usage Reports: Honest Downgrade Suggestions vs No Communication',
        hypothesis:
          'Proactively suggesting downgrades will reduce churn despite increasing downgrades',
        controlVersion: {
          description:
            'No usage reports. Users on Pro plan ($49/mo) who use only Basic features receive no communication about plan fit.',
          metrics: {
            conversionRate: '14% monthly churn',
            averageOrderValue: '$49/mo while active',
          },
        },
        treatmentVersion: {
          description:
            'Monthly usage report showing "You used 3 of 25 Pro features. Basic ($19/mo) covers your usage. Downgrade?"',
          metrics: {
            conversionRate: '5% monthly churn',
            averageOrderValue: '$31/mo average (mix of Pro and Basic)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Despite 22% of users downgrading from Pro to Basic, total churn dropped by 64%. The honest approach built trust that kept users in the ecosystem. 12-month LTV was 23% higher for the treatment group.',
          learnings: [
            'Honesty about value reduces churn more than silence',
            'Users who feel over-charged eventually leave entirely rather than downgrade',
            'Escalation of commitment (staying on expensive plan) eventually breaks, and users leave angry',
            'Proactive right-sizing prevents the trust-destroying moment of realization',
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
        name: 'Sunk Cost Reminders',
        description:
          'Display of accumulated investment (time, money, data) at decision points like cancellation or downgrade',
        howToSpot:
          'Look for "You\'ve been a member for X days" or "You\'ve created X projects" shown during exit flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Asymmetric Button Styling',
        description:
          'Cancel/leave buttons styled to discourage clicking while "stay" buttons are prominent and inviting',
        howToSpot:
          'Compare the visual weight, size, and color of "cancel" vs "keep" buttons in retention flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Multi-Step Exit Friction',
        description:
          'Cancellation or exit processes that require many more steps than sign-up',
        howToSpot:
          'Count the clicks required to cancel vs the clicks required to subscribe. Look for "Step X of Y" in cancel flows',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Loss-Framed Language',
        description:
          'Messaging that frames leaving as losing or wasting past investment',
        howToSpot:
          'Look for words like "lose", "waste", "throw away", "gone forever" in cancellation or downgrade flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Hidden Exit Paths',
        description:
          'Cancellation or account deletion options buried deep in navigation',
        howToSpot:
          'Try to find the cancel button from the main dashboard. Count navigation levels required.',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Guilt-Trip Retention Pattern',
        description: 'Showing accumulated investment data when users attempt to leave, framing departure as waste',
        indicators: [
          'Investment summaries shown during cancellation',
          '"You\'ve built X projects" or "X years as a member" messaging',
          'Emotional language about losing progress',
          'Comparisons of money spent to tangible goods ("That\'s like throwing away a vacation!")',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Adversarial Cancellation Pattern',
        description: 'Making the cancellation process deliberately difficult to complete',
        indicators: [
          'More steps to cancel than to subscribe',
          'Requiring phone calls to cancel online services',
          'Multiple "Are you sure?" confirmations',
          'Cancellation button hidden or de-emphasized',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Artificial Lock-In Pattern',
        description: 'Creating technical or procedural barriers to switching that exploit accumulated investment',
        indicators: [
          'No data export functionality',
          'Proprietary formats that prevent migration',
          'Loss of history, analytics, or content upon cancellation',
          'Annual contracts with hefty early termination fees',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Streak & Progress Hostage Pattern',
        description: 'Using gamification elements that are lost upon leaving, creating artificial sunk costs',
        indicators: [
          'Streak counters that reset on cancellation',
          'Levels, badges, or points that cannot be preserved',
          '"You\'ll lose your 500-day streak!" warnings',
          'No pause or hibernation option for streaks',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'How many clicks does it take to cancel compared to sign up?',
      'Does the cancellation flow show sunk cost information (time, money, projects)?',
      'Are exit buttons visually de-emphasized compared to "stay" buttons?',
      'Is there guilt-tripping language in retention or cancellation flows?',
      'Can users export their data before leaving?',
      'Is the cancellation option easy to find from the main navigation?',
      'Does the product proactively help users assess whether their investment is paying off?',
      'Are there honest progress or usage reports that help users evaluate continued commitment?',
      'Do gamification elements (streaks, badges) create artificial switching costs?',
      'Is there a pause or hibernation option as an alternative to full cancellation?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in escalation of commitment (sunk cost fallacy).

Analyze the provided design for escalation of commitment patterns. Identify:

1. **Sunk Cost Exploitation**: Where the design reminds users of past investment to discourage leaving
2. **Exit Friction**: How difficult it is to cancel, downgrade, or leave compared to signing up
3. **Loss Framing**: Whether departure is framed as losing/wasting past investment
4. **Lock-In Mechanisms**: Technical or procedural barriers that exploit accumulated investment
5. **Healthy Exit Ramps**: Whether the design provides honest assessments and easy exit paths

For each pattern found:
- Identify whether it exploits or respects user autonomy
- Assess the severity of manipulation
- Determine ethical implications
- Suggest improvements for honest, user-respecting design
- Evaluate whether exit paths are as accessible as entry paths

Consider:
- Is the cancellation process proportionate to the sign-up process?
- Does the design show sunk cost information at decision points?
- Are users given honest usage or progress data to evaluate continued investment?
- Is there guilt-tripping or loss-framing language in retention flows?
- Are there clear alternatives to full cancellation (pause, downgrade, export)?

Provide actionable recommendations for ethical handling of user commitment.`,

    outputSchema: {
      type: 'object',
      properties: {
        escalationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              sunkCostExploitation: { type: 'string' },
              exitFriction: { type: 'string' },
              lossFraming: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'sunkCostExploitation',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            exitFrictionScore: { type: 'number' },
            sunkCostExploitationScore: { type: 'number' },
            userAutonomyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'exitFrictionScore',
            'sunkCostExploitationScore',
            'userAutonomyScore',
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
        'escalationPatterns',
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
        title: 'Audit Your Exit Paths',
        description:
          'Map every point where users can cancel, downgrade, delete, or leave, and compare friction to entry paths',
        example:
          'If sign-up takes 2 clicks, cancellation should take no more than 3',
        tips: [
          'Count clicks for cancel vs sign-up and aim for parity',
          'Ensure cancel is findable within 2 navigation levels',
          'Test with real users — can they find the cancel button in under 60 seconds?',
        ],
      },
      {
        step: 2,
        title: 'Remove Sunk Cost Language',
        description:
          'Eliminate messaging that reminds users of past investment during exit flows',
        example:
          'Replace "You\'ve spent $2,400 with us!" with "We\'re sorry to see you go. Here\'s how to export your data."',
        tips: [
          'Review all cancellation copy for loss-framing language',
          'Remove investment summaries from exit flows',
          'Focus messaging on future value, not past spending',
        ],
      },
      {
        step: 3,
        title: 'Build Honest Progress Assessments',
        description:
          'Create dashboards and reports that help users objectively evaluate their investment',
        example:
          'Monthly email: "You used 3 of 25 features. The Basic plan at $19/mo covers your usage."',
        tips: [
          'Show usage data relative to plan tier',
          'Proactively suggest right-sizing',
          'Include objective metrics, not just vanity numbers',
        ],
      },
      {
        step: 4,
        title: 'Provide Intermediate Options',
        description:
          'Offer alternatives between "keep everything" and "lose everything"',
        example:
          'Pause subscription for 1-3 months, downgrade to free tier with data preserved, export and archive',
        tips: [
          'Pause options reduce cancellation by 20-40%',
          'Downgrade paths keep users in the ecosystem',
          'Data export builds trust even if some users leave',
        ],
      },
      {
        step: 5,
        title: 'Design for Voluntary Return',
        description:
          'Make it easy for users who leave to come back, preserving their data and history',
        example:
          'Preserve account data for 90+ days. One-click reactivation with all history intact.',
        tips: [
          'Users who leave easily return more often',
          'Preserved data is a strong reactivation incentive',
          'Welcome-back flows should acknowledge the return warmly',
        ],
      },
    ],

    dos: [
      'Make cancellation as easy as sign-up — aim for click parity',
      'Offer data export before and during cancellation',
      'Provide honest usage reports that help users evaluate plan fit',
      'Offer pause and downgrade as alternatives to full cancellation',
      'Preserve user data for a reasonable period after cancellation',
      'Focus retention messaging on future value, not past investment',
      'Build proactive "cut your losses" features in project and investment tools',
      'Make reactivation simple for users who return',
    ],

    donts: [
      'Don\'t show sunk cost summaries during cancellation flows',
      'Don\'t use guilt-tripping language ("You\'ll lose everything!")',
      'Don\'t make cancellation require more steps than sign-up',
      'Don\'t hide the cancel option deep in navigation',
      'Don\'t require phone calls to cancel online services',
      'Don\'t frame leaving as "wasting" past investment',
      'Don\'t use asymmetric button styling to discourage exit',
      'Don\'t destroy user data immediately upon cancellation',
    ],

    bestPractices: [
      {
        title: 'Click Parity for Entry and Exit',
        description:
          'The number of clicks to cancel should be proportionate to the number of clicks to sign up',
        rationale:
          'Asymmetric friction exploits escalation of commitment and erodes user trust',
        example:
          'If sign-up is 3 clicks, cancellation should be 3-4 clicks maximum',
      },
      {
        title: 'Proactive Value Reporting',
        description:
          'Regularly show users how much value they\'re getting relative to their investment',
        rationale:
          'Honest reporting builds trust and helps users make rational continuation decisions',
        example:
          'Monthly "Your subscription value" email showing features used, time saved, and plan fit',
      },
      {
        title: 'Pause Before Cancel',
        description:
          'Offer subscription pause as a lower-stakes alternative to cancellation',
        rationale:
          'Pause options respect the user\'s desire to step back without forcing an all-or-nothing decision',
        example:
          '"Not ready to cancel? Pause your subscription for 1, 2, or 3 months instead."',
      },
      {
        title: 'Future-Focused Retention',
        description:
          'When attempting retention, focus on what users will gain by staying, not what they\'ll lose by leaving',
        rationale:
          'Gain framing is ethical and effective; loss framing exploits sunk cost psychology',
        example:
          '"Stay and get access to our new AI features launching next month" vs "Don\'t throw away 2 years of data!"',
      },
      {
        title: 'Milestone Check-Ins for Projects',
        description:
          'Build automatic review points into project and investment tools to prompt objective reassessment',
        rationale:
          'Users naturally escalate commitment without external checkpoints; structured reviews break the cycle',
        example:
          'At 50% and 75% milestones: "Here\'s your progress vs original goals. Continue, adjust scope, or archive?"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.4.4',
        guideline:
          'Link Purpose - Cancellation and exit links must have clear, descriptive text',
        implementation:
          'Use explicit link text like "Cancel subscription" not vague "Manage account" that obscures the exit path',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation - Exit paths must be consistently located and labeled',
        implementation:
          'Place cancellation options in the same location across all account management pages. Use consistent terminology.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to differentiate cancel vs stay buttons',
        implementation:
          'Ensure cancel and stay buttons are distinguishable by text, size, and position, not just color (red vs green).',
      },
      {
        wcagLevel: 'A',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All exit paths must be fully keyboard accessible',
        implementation:
          'Cancellation flows must be completable via keyboard alone, with logical tab order and visible focus indicators.',
      },
    ],

    ethics: [
      {
        concern: 'Sunk Cost Exploitation',
        severity: 'critical',
        explanation:
          'Deliberately showing investment summaries (time, money, data) during cancellation to discourage exit',
        mitigation:
          'Remove all sunk cost reminders from exit flows. Focus messaging on what happens next, not what was invested.',
      },
      {
        concern: 'Adversarial Exit Friction',
        severity: 'critical',
        explanation:
          'Making cancellation deliberately more difficult than sign-up (more steps, hidden options, phone requirements)',
        mitigation:
          'Achieve click parity between entry and exit. Make cancellation findable within 2 navigation levels. Never require phone calls for online service cancellation.',
      },
      {
        concern: 'Guilt-Based Retention',
        severity: 'high',
        explanation:
          'Using emotional language, loss framing, or shame to prevent users from leaving',
        mitigation:
          'Use neutral, respectful language in all exit flows. Offer genuine value as a reason to stay, never guilt.',
      },
      {
        concern: 'Data Hostage-Taking',
        severity: 'high',
        explanation:
          'Refusing data export or immediately deleting user data upon cancellation to increase switching costs',
        mitigation:
          'Provide comprehensive data export in standard formats. Preserve data for at least 30-90 days after cancellation.',
      },
      {
        concern: 'Artificial Lock-In',
        severity: 'medium',
        explanation:
          'Using proprietary formats, lack of interoperability, or contractual penalties to prevent departure',
        mitigation:
          'Support standard data formats. Provide migration guides. Offer flexible billing without punitive exit terms.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Knee-Deep in the Big Muddy: A Study of Escalating Commitment to a Chosen Course of Action',
        author: 'Staw, B. M.',
        year: 1976,
        doi: '10.1016/0030-5073(76)90005-2',
        description:
          'The foundational paper that identified and named escalation of commitment as a distinct decision-making phenomenon',
        type: 'foundational',
      },
      {
        title: 'Escalation of Commitment to a Failing Course of Action: Toward Theoretical Progress',
        author: 'Brockner, J.',
        year: 1992,
        doi: '10.5465/amr.1992.4279030',
        description:
          'Comprehensive theoretical framework integrating self-justification, prospect theory, and organizational factors in escalation behavior',
        type: 'foundational',
      },
      {
        title: 'The Escalation of Commitment to a Course of Action',
        author: 'Staw, B. M., & Ross, J.',
        year: 1987,
        description:
          'Expanded model identifying project, psychological, social, and organizational determinants of escalation',
        type: 'advanced',
      },
      {
        title: 'De-Escalation Strategies: A Conceptual and Empirical Review',
        author: 'Simonson, I., & Staw, B. M.',
        year: 1992,
        description:
          'Research on interventions that help decision-makers overcome escalation of commitment',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Extensive coverage of sunk cost fallacy and escalation of commitment within the broader framework of cognitive biases',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Practical examples of how sunk costs influence everyday decisions including subscriptions and purchases',
        type: 'practical',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Discusses sunk cost effects and mental accounting, including the "Concorde Fallacy" and how it applies to everyday economic decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Dark Patterns in UX: How Interfaces Exploit Sunk Cost Psychology',
        author: 'Brignull, Harry',
        url: 'https://www.deceptive.design/',
        description:
          'Catalog of deceptive design patterns including those that exploit escalation of commitment',
        type: 'practical',
      },
      {
        title: 'The Ethics of Persuasive Design',
        author: 'Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L.',
        year: 2018,
        description:
          'Academic examination of dark patterns in UX design, including exit friction and sunk cost exploitation',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'The Sunk Cost Fallacy',
        author: 'TED-Ed',
        url: 'https://www.youtube.com/watch?v=vpnxd31y0Fo',
        description:
          'Animated explanation of sunk cost fallacy and escalation of commitment with everyday examples',
        type: 'foundational',
      },
      {
        title: 'Why You Keep Playing a Game You Hate',
        author: 'Game Maker\'s Toolkit',
        url: 'https://www.youtube.com/watch?v=7h0xPRMRjhI',
        description:
          'Analysis of how games exploit escalation of commitment through time investment and progress systems',
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
      'loss-aversion', // Loss aversion amplifies the pain of abandoning sunk costs
      'status-quo-bias', // Preference for current state reinforces continued commitment
      'endowment-effect', // Overvaluing what we already "own" (our investment, progress)
      'consistency-bias', // Desire to appear consistent drives continued commitment
    ],

    conflicts: [
      'zero-risk-bias', // Desire for certainty can override commitment to risky ongoing projects
      'fresh-start-effect', // Temporal landmarks can break escalation cycles
    ],

    confusedWith: [
      'sunk-cost-fallacy', // Often used interchangeably but escalation is the behavioral pattern, sunk cost is the reasoning error
      'loss-aversion', // Related but distinct: loss aversion is about potential losses, escalation is about justifying past investment
      'status-quo-bias', // Overlaps but status quo is broader preference for current state
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'sunk-cost-fallacy',
        'concorde-effect',
        'plan-continuation-bias',
      ],
    },
  },
};
