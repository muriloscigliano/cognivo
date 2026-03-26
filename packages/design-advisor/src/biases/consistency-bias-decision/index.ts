/**
 * CONSISTENCY BIAS (DECISION)
 *
 * Once a decision or position is taken, people feel compelled
 * to behave consistently with it, even when new information
 * suggests changing course.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const consistencyBiasDecision: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'consistency-bias-decision',
    name: 'Consistency Bias (Decision)',
    aliases: ['Commitment Bias', 'Consistency Principle', 'Commitment-Consistency Effect'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.SOCIAL,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'commitment',
      'consistency',
      'preference-persistence',
      'habit',
      'self-image',
      'past-behavior',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Once we commit to a decision, we feel compelled to stay consistent with it.',

    detailed: `Consistency bias in decision-making describes the powerful tendency for people to align their current choices with previous commitments, beliefs, and behaviors. Once a person takes a position, makes a choice, or establishes a pattern, they experience internal pressure to act consistently with that commitment—even when new evidence or changed circumstances suggest a different course of action would be more beneficial.

This bias operates through the deep human need to appear (and feel) consistent. Inconsistency is associated with confusion, dishonesty, and unreliability, while consistency is valued as a sign of rationality, stability, and trustworthiness. As a result, once users adopt a preference, select a setting, or commit to a workflow, they are surprisingly resistant to changing course.

In product and UX design, consistency bias manifests as preference persistence, decision confirmation, and habitual interaction patterns. Designers can honor this bias ethically by remembering user preferences, maintaining consistent interaction paradigms, and respecting past choices—while also providing clear, low-friction pathways to update decisions when circumstances genuinely change.`,

    psychologyBasis: {
      discoveredBy: 'Leon Festinger / Robert Cialdini',
      year: 1957,
      theory: 'Cognitive Dissonance Theory / Commitment and Consistency Principle',
      mechanism: `Once a decision or position is taken, the brain activates several mechanisms to maintain consistency:

1. **Cognitive Dissonance Reduction**: After a commitment, contradictory information creates psychological discomfort (dissonance), which the brain resolves by rationalizing the original decision rather than reconsidering it
2. **Self-Perception Alignment**: People infer their attitudes from their own past behavior—"I chose this before, so I must prefer it"
3. **Effort Justification**: The more effort invested in a decision, the more strongly people defend it to avoid admitting wasted effort
4. **Identity Anchoring**: Decisions become part of self-identity; changing course threatens self-concept ("I'm the kind of person who...")
5. **Social Signaling**: Consistency signals reliability to others; changing positions feels socially costly

This mechanism is largely automatic—people don't consciously decide to be consistent; the drive operates below awareness and shapes choices before deliberate evaluation occurs.`,
    },

    realWorldExample: `In Festinger's classic 1957 study, participants who were paid only $1 to lie about a boring task rated it as significantly more enjoyable than those paid $20. The low-paid group couldn't justify the lie through payment, so they unconsciously shifted their attitudes to align with their behavior—maintaining consistency between what they said and what they believed. This demonstrates how powerfully the need for consistency reshapes even our private evaluations of experience.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Consistency bias profoundly shapes how users interact with products over time. Once users establish preferences, adopt workflows, or commit to choices, they develop strong resistance to change. Designers can leverage this to:

- Persist user preferences and settings to reinforce commitment
- Build habit-forming interaction patterns that feel natural to repeat
- Honor past decisions to create a sense of product loyalty and trust
- Use progressive commitment (foot-in-the-door) to guide users toward deeper engagement
- Reduce decision fatigue by defaulting to previous choices`,

    whenToUse: [
      {
        title: 'Preference Persistence',
        scenario:
          'When users have established preferences or customizations',
        example:
          'Remember display settings, sort orders, and view modes across sessions so users never have to re-establish their preferences',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Progressive Commitment',
        scenario: 'When guiding users from trial to full adoption',
        example:
          'Start with a small ask (create a free account), then build on that commitment (complete profile, invite teammates, upgrade plan)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Decision Confirmation',
        scenario: 'When users have just made a significant choice',
        example:
          'After purchase, reinforce the decision with confirmation messaging: "Great choice! Here\'s why customers love this product."',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Consistent Interaction Patterns',
        scenario: 'When designing repeated user workflows',
        example:
          'Maintain the same interaction patterns across features (e.g., swipe-to-archive works everywhere, not just in one view)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Settings Memory',
        scenario: 'When users configure tools or dashboards',
        example:
          'Persist dashboard layouts, filter configurations, and display preferences so returning users find everything as they left it',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Re-engagement Based on Past Behavior',
        scenario: 'When bringing inactive users back to the product',
        example:
          'Show returning users their past activity and progress: "You were 70% through this course—pick up where you left off"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Outdated or Harmful Preferences',
        reason:
          'Blindly honoring past choices can lock users into suboptimal configurations when better options exist',
        consequence:
          'Users miss improvements because the system never surfaces alternatives to their established patterns',
        alternative:
          'Periodically surface gentle prompts: "We\'ve added new options since you last configured this. Would you like to review?"',
      },
      {
        title: 'Sunk Cost Exploitation',
        reason:
          'Using past commitment to pressure users into continuing with a poor experience',
        consequence:
          'Users feel trapped and resentful, leading to churn when they finally break free',
        alternative:
          'Make it easy to change course. Honor past investment without weaponizing it.',
      },
      {
        title: 'Subscription Cancellation Dark Patterns',
        reason:
          'Exploiting consistency bias to make cancellation difficult or guilt-inducing',
        consequence:
          'Regulatory scrutiny, user backlash, and brand damage when users feel manipulated',
        alternative:
          'Provide clear, frictionless cancellation with honest retention offers',
      },
      {
        title: 'Safety-Critical Decisions',
        reason:
          'Consistency with past choices should never override new safety information',
        consequence:
          'Users may persist with unsafe settings because they "always did it this way"',
        alternative:
          'Override preference persistence for safety-critical updates; explain why the change is necessary',
      },
    ],

    commonMistakes: [
      {
        title: 'Resetting User Preferences',
        description:
          'Losing user customizations after updates, migrations, or session expiration',
        why: 'Violates the consistency contract—users expect their choices to persist',
        fix: 'Store preferences durably (server-side or local storage with sync) and preserve them across updates',
      },
      {
        title: 'Forcing Re-decisions',
        description:
          'Requiring users to re-make decisions they already made (re-selecting settings, re-confirming choices)',
        why: 'Creates friction and signals that the system doesn\'t respect previous commitments',
        fix: 'Default to the user\'s last choice and only ask for re-confirmation when something has materially changed',
      },
      {
        title: 'Inconsistent Interaction Patterns',
        description:
          'Different gestures, shortcuts, or flows for similar actions across the product',
        why: 'Breaks the consistency mental model users have built, causing confusion and errors',
        fix: 'Establish and document interaction patterns; apply them uniformly across all features',
      },
      {
        title: 'Ignoring Preference Evolution',
        description:
          'Never updating or re-evaluating persistent preferences as the product evolves',
        why: 'Users may be locked into legacy configurations that no longer serve them well',
        fix: 'Periodically invite users to review preferences, especially after major feature additions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout consistency reinforces spatial memory and habitual navigation',
        examples: [
          'Consistent placement of navigation, actions, and content across pages builds muscle memory',
          'Persisting dashboard widget positions so users always find data where they left it',
          'Maintaining consistent grid structures so spatial patterns transfer between screens',
          'Preserving sidebar collapse state, panel sizes, and view configurations',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic consistency signals stability and reinforces reading patterns',
        examples: [
          'Consistent heading hierarchy helps users predict content structure',
          'Stable font choices across sessions reinforce brand familiarity',
          'Consistent label formatting reduces re-learning effort',
          'Maintaining text size preferences for accessibility needs',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color consistency builds reliable meaning associations over time',
        examples: [
          'Consistent use of semantic colors (red=error, green=success) across all features',
          'Persisting dark/light mode preference across sessions and devices',
          'Stable category colors so users don\'t re-learn color meanings',
          'Honoring user-selected accent or theme colors',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction consistency is the strongest driver of habitual product use',
        examples: [
          'Consistent gestures (swipe, long-press, double-tap) build transferable muscle memory',
          'Maintaining keyboard shortcuts across product areas rewards power users',
          'Consistent confirmation/cancellation button placement prevents errors',
          'Honoring user-established workflows and not rearranging steps after updates',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content consistency shapes expectations and reduces cognitive load for returning users',
        examples: [
          'Consistent terminology prevents confusion ("save" vs "publish" vs "submit")',
          'Persistent sort order and filter state lets users resume work without setup',
          'Consistent content structure helps users skim familiar layouts efficiently',
          'Remembering preferred content density (compact vs comfortable vs spacious)',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility preference persistence is essential for users who depend on specific configurations',
        examples: [
          'Persisting text size, contrast, and motion reduction preferences across sessions',
          'Maintaining assistive technology configurations through updates',
          'Consistent focus order and landmark structure aids screen reader navigation',
          'Honoring reduced-motion preferences globally, not per-page',
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
        title: 'Preference-Aware Dashboard',
        description:
          'Analytics dashboard that remembers every user customization',
        code: `<div class="dashboard" data-layout="user-custom">
  <header class="dashboard-header">
    <h2>Your Dashboard</h2>
    <span class="last-modified">Layout last updated by you 3 days ago</span>
  </header>

  <!-- Widgets in user's custom order, persisted server-side -->
  <div class="widget" data-position="user-set" style="grid-area: 1/1/2/3;">
    <h3>Revenue (your pinned metric)</h3>
    <div class="chart" data-view="line" data-range="30d"><!-- user's preferred view --></div>
  </div>

  <div class="widget" data-position="user-set" style="grid-area: 1/3/2/4;">
    <h3>Active Users</h3>
    <div class="chart" data-view="bar" data-range="7d"><!-- user's preferred view --></div>
  </div>

  <div class="preferences-bar">
    <button class="subtle">Reset to Default Layout</button>
  </div>
</div>`,
        explanation:
          'Every widget position, chart type, date range, and pinned metric is persisted across sessions. Users return to exactly the workspace they built. A subtle "reset" option respects autonomy without pushing change.',
        principle:
          'Honor past decisions by persisting every user customization; provide escape hatches without pressure',
        metrics: {
          before: '41% of users re-configured dashboard each session',
          after: '3% needed to re-configure; daily active usage up 28%',
          improvement: '93% reduction in setup friction, 28% increase in engagement',
        },
      },
      {
        title: 'Progressive Commitment Onboarding',
        description:
          'Step-by-step onboarding that builds on each small commitment',
        code: `<div class="onboarding-flow">
  <!-- Step 1: Tiny commitment -->
  <div class="step completed">
    <span class="check">✓</span>
    <p>Created free account</p>
  </div>

  <!-- Step 2: Builds on step 1 -->
  <div class="step completed">
    <span class="check">✓</span>
    <p>Added your first project</p>
  </div>

  <!-- Step 3: Builds on step 2 -->
  <div class="step current">
    <span class="progress">3/5</span>
    <p>Invite a teammate to collaborate</p>
    <p class="context">You've already set up "Marketing Dashboard"—
    sharing it takes 10 seconds.</p>
  </div>

  <!-- Progress reinforcement -->
  <div class="commitment-summary">
    <p>You're 60% set up. Your preferences and work are saved.</p>
  </div>
</div>`,
        explanation:
          'Each step references what the user has already done, leveraging consistency: "You already created a project, so inviting a teammate is the natural next step." Progress display reinforces commitment.',
        principle:
          'Small commitments create momentum; reference past actions to make next steps feel consistent and natural',
        metrics: {
          before: '23% completed full onboarding',
          after: '52% completed full onboarding',
          improvement: '126% increase in onboarding completion',
        },
      },
      {
        title: 'Post-Purchase Decision Reinforcement',
        description:
          'Confirmation page that validates the user\'s choice',
        code: `<div class="order-confirmation">
  <h2>Great Choice!</h2>
  <div class="product-summary">
    <img src="product.jpg" alt="Premium Wireless Headphones">
    <h3>Premium Wireless Headphones</h3>
    <p class="price">$149.99</p>
  </div>

  <div class="social-validation">
    <div class="stat">
      <strong>4.8/5</strong> average rating from 2,340 verified buyers
    </div>
    <blockquote class="recent-review">
      "Best headphones I've ever owned. The noise cancellation
      is incredible for focus work." — Maya, 2 days ago
    </blockquote>
  </div>

  <div class="next-steps">
    <h4>Make the Most of Your Purchase</h4>
    <a href="/setup-guide">Set up your headphones</a>
    <a href="/spotify-integration">Connect to Spotify</a>
  </div>
</div>`,
        explanation:
          'After purchase, social proof and positive reviews reinforce the decision, reducing buyer\'s remorse. Next steps channel consistency momentum into product engagement.',
        principle:
          'Reinforce recent decisions with validation to strengthen commitment and reduce regret',
      },
    ],

    bad: [
      {
        title: 'Guilt-Driven Cancellation Flow',
        description:
          'Subscription cancellation that exploits consistency bias to prevent leaving',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <h2>Are you sure you want to cancel?</h2>
  <p>You've been a member for <strong>2 years and 3 months</strong>.</p>
  <p>You've completed <strong>147 workouts</strong> with us.</p>
  <p>You'll lose access to <strong>all your saved routines</strong>.</p>

  <div class="guilt-trip">
    <img src="sad-trainer.jpg" alt="Disappointed trainer">
    <p>"We'll miss you. Your fitness journey was going so well..."</p>
  </div>

  <button class="primary large">Keep My Membership</button>
  <a href="#" style="color: #999; font-size: 0.7em;">I still want to cancel</a>
</div>`,
        explanation:
          'This weaponizes past commitment data to guilt users into staying. Emphasizing sunk costs, using emotional manipulation, and making cancellation visually difficult are dark patterns that exploit consistency bias.',
        principle:
          'Never weaponize past commitment data to trap users in unwanted decisions',
      },
      {
        title: 'Forced Preference Lock-In',
        description:
          'System that makes it impossible to change established preferences',
        code: `<!-- DON'T DO THIS -->
<div class="settings-locked">
  <h3>Display Settings</h3>
  <div class="setting disabled">
    <label>Theme: Dark Mode</label>
    <span class="lock-icon">🔒</span>
    <p class="help-text">You selected Dark Mode during setup.
    Contact support to change this setting.</p>
  </div>
  <div class="setting disabled">
    <label>Language: English (US)</label>
    <span class="lock-icon">🔒</span>
    <p class="help-text">Language cannot be changed after
    account creation.</p>
  </div>
</div>`,
        explanation:
          'Locking users into initial decisions without ability to self-serve changes violates user autonomy. Consistency should be the default, not a constraint.',
        principle:
          'Consistency should be the default behavior, never an enforced constraint that removes user agency',
      },
      {
        title: 'Ignoring Changed Circumstances',
        description:
          'App that blindly repeats past orders without checking relevance',
        code: `<!-- DON'T DO THIS -->
<div class="reorder-prompt">
  <h3>Time for your weekly order!</h3>
  <p>We've placed your usual order automatically:</p>
  <ul>
    <li>12x Baby Formula (Stage 1)</li>
    <li>Newborn Diapers (Size N)</li>
    <li>Nursing Pads</li>
  </ul>
  <p class="note">Same as your last 8 orders</p>
  <button class="primary">Confirm & Pay $89.99</button>
</div>`,
        explanation:
          'Auto-repeating baby supply orders without considering that the child has likely grown past Stage 1 formula and Size N diapers. Blind consistency ignores that user needs evolve.',
        principle:
          'Consistency should be intelligent—account for the fact that user needs change over time',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Preference Persistence & Taste Profiles',
        url: 'https://www.netflix.com',
        description:
          'Netflix builds detailed taste profiles from viewing history and uses them to personalize every aspect of the experience—from recommendations to artwork to row ordering. Users who establish a pattern (e.g., watching documentaries) see their interface reshape around that pattern, reinforcing consistency.',
        effectiveness: 'very-effective',
        analysis:
          'Netflix leverages consistency bias at massive scale. Once users establish viewing patterns, the algorithm reinforces those patterns through personalized recommendations. The "Continue Watching" row is a direct application—honoring the commitment to finish what was started. Separate profiles per user ensure each person\'s consistency is maintained independently.',
      },
      {
        company: 'Amazon',
        product: 'Purchase History & Reorder Suggestions',
        url: 'https://www.amazon.com',
        description:
          'Amazon surfaces "Buy it again" and "Subscribe & Save" based on purchase history. Past buying decisions become anchors for future recommendations, and the platform makes repeating previous choices effortless.',
        effectiveness: 'very-effective',
        analysis:
          'Amazon exploits consistency bias ethically by making repeated purchases frictionless. "Buy it again" respects the user\'s past decision while making repetition easy. Subscribe & Save takes this further—converting a one-time purchase into an automatic recurring commitment.',
      },
      {
        company: 'Spotify',
        product: 'Taste Profiles & Discover Weekly',
        url: 'https://www.spotify.com',
        description:
          'Spotify builds evolving taste profiles from listening habits and uses them to generate personalized playlists. Discover Weekly introduces new music consistent with established preferences, making exploration feel safe and familiar.',
        effectiveness: 'very-effective',
        analysis:
          'Spotify demonstrates intelligent consistency—it doesn\'t just repeat what users already like, but introduces new content that\'s consistent with their taste profile. This creates a virtuous cycle where users trust recommendations because they align with established preferences, reinforcing engagement.',
      },
      {
        company: 'Duolingo',
        product: 'Streak System & Commitment Devices',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo\'s streak counter leverages consistency bias by making daily practice a visible commitment. The longer the streak, the stronger the consistency pressure to maintain it.',
        effectiveness: 'effective',
        analysis:
          'The streak system is a powerful consistency device—once users have a 30-day streak, the psychological cost of breaking it is high. Duolingo reinforces this with "streak freeze" purchases and friend leaderboards, layering social consistency on top of personal commitment.',
      },
    ],

    abTests: [
      {
        title: 'Preference Persistence vs Fresh Start',
        hypothesis:
          'Persisting user preferences from previous sessions will increase engagement over a clean-slate experience',
        controlVersion: {
          description:
            'Dashboard loads with default settings each session—users must re-apply filters, sort orders, and view preferences every time',
          metrics: {
            conversionRate: '56%',
            timeOnPage: '8:20',
            returnRate: '34%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard loads with all user preferences persisted—filters, sort orders, pinned widgets, and view modes exactly as last configured',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '12:45',
            returnRate: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Persisting preferences increased return rate by 71% and time-on-page by 53%. Users who found their workspace exactly as they left it felt respected and productive. Satisfaction surveys showed "remembers my setup" was the #2 reason for product loyalty.',
          learnings: [
            'Preference persistence is a hygiene factor—users expect it and are frustrated by its absence',
            'Power users with complex custom configurations showed the largest engagement gains',
            'Even simple preferences (sort order, list/grid view) significantly impacted return rates',
            'Server-side persistence outperformed local-only storage due to cross-device consistency',
          ],
        },
      },
      {
        title: 'Progressive Commitment vs All-at-Once Onboarding',
        hypothesis:
          'Breaking onboarding into small sequential commitments will outperform a single comprehensive setup',
        controlVersion: {
          description:
            'Single-page onboarding form with 12 fields covering profile, preferences, integrations, and team setup all at once',
          metrics: {
            conversionRate: '31%',
            timeOnPage: '4:10',
            completionRate: '27%',
          },
        },
        treatmentVersion: {
          description:
            'Five-step progressive onboarding: (1) name + email, (2) one preference, (3) first project, (4) one integration, (5) invite a teammate—each step referencing what was already completed',
          metrics: {
            conversionRate: '64%',
            timeOnPage: '6:30',
            completionRate: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Progressive commitment more than doubled completion rates. Each small step created consistency pressure to continue. References to past steps ("You\'ve already created your project—now share it") made the next action feel like a natural extension, not a new demand.',
          learnings: [
            'Small initial commitments created strong consistency momentum',
            'Referencing completed steps in the prompt for the next step was critical to the effect',
            'Step 1 had near-100% completion; each subsequent step had lower drop-off than the control\'s single form',
            'Users who completed all 5 steps had 3x higher 30-day retention than control completers',
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
        name: 'Preference Persistence Indicators',
        description: 'Visual signals that the system remembers and applies user preferences',
        howToSpot: 'Look for "Your settings", "Last used", "Continue where you left off" labels, or personalized layouts that differ from defaults',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Commitment Progress Displays',
        description: 'Progress bars, streaks, completion percentages that reference past behavior',
        howToSpot: 'Check for streak counters, step indicators, completion bars, or "You\'ve done X so far" messaging',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Past Decision References',
        description: 'UI elements that explicitly mention or build upon previous user choices',
        howToSpot: 'Look for "Based on your previous choice", "Your usual order", "Recommended for you" based on history',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Sunk Cost Messaging',
        description: 'Content that emphasizes what users have already invested (time, money, effort)',
        howToSpot: 'Watch for "You\'ve invested X hours", "Member since", or progress-loss warnings during exit flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Consistent Interaction Patterns',
        description: 'Uniform gesture, shortcut, and flow patterns across product areas',
        howToSpot: 'Test whether the same action (delete, save, share) works identically across all sections of the product',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Preference Persistence Pattern',
        description: 'System remembers and re-applies user choices across sessions and devices',
        indicators: ['Filters, sorts, and view modes persist between sessions', 'Dashboard layouts saved and restored', 'Theme and display preferences synchronized', 'Recently used items surfaced prominently'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Progressive Commitment Pattern',
        description: 'Small sequential asks that build on previous commitments',
        indicators: ['Multi-step onboarding referencing completed steps', 'Foot-in-the-door techniques (free trial → paid)', 'Graduated feature adoption paths', '"You\'re X% complete" progress indicators'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Decision Reinforcement Pattern',
        description: 'Post-decision messaging that validates and reinforces the choice made',
        indicators: ['Post-purchase confirmation with social proof', '"Great choice" messaging after selections', 'Reviews and ratings shown after commitment', 'Success metrics displayed after adoption'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Sunk Cost Exploitation Pattern',
        description: 'Using past investment to discourage changing or leaving',
        indicators: ['Cancel flows highlighting time/money invested', 'Progress-loss warnings during unsubscribe', '"You\'ll lose" messaging in exit flows', 'Difficult preference reset or account deletion'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the system remember and re-apply user preferences across sessions?',
      'Are past user decisions referenced when prompting new ones?',
      'Is there a progressive commitment flow (small ask → larger ask)?',
      'Are post-decision experiences designed to reinforce the choice?',
      'Does exit/cancellation flow respect user autonomy or exploit sunk costs?',
      'Are interaction patterns consistent across all product areas?',
      'Can users easily update or change previous decisions?',
      'Is the system intelligent about preference evolution (needs change over time)?',
      'Are streaks, progress counters, or commitment displays used? If so, are they motivating or guilt-inducing?',
      'Is consistency bias being used to benefit users or to trap them?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in consistency bias and commitment psychology.

Analyze the provided design for consistency bias (decision variant) patterns. Identify:

1. **Preference Persistence**: How well the system remembers and honors past user choices
2. **Progressive Commitment**: Whether small commitments are used to build toward larger ones
3. **Decision Reinforcement**: Post-decision messaging that validates user choices
4. **Interaction Consistency**: Whether interaction patterns are uniform across the product
5. **Sunk Cost Exploitation**: Whether past investment is used to trap rather than serve users

For each pattern found:
- Identify how consistency bias is being leveraged
- Assess whether it serves the user or exploits them
- Determine if users can easily change past decisions when needed
- Evaluate whether the system accounts for evolving user needs
- Suggest improvements for ethical, user-beneficial consistency

Consider:
- Is preference persistence comprehensive and cross-device?
- Are progressive commitment flows referencing past steps naturally?
- Do exit flows respect user autonomy or weaponize past commitment?
- Is the system smart about when past preferences may be outdated?
- Are interaction patterns genuinely consistent or superficially so?

Provide actionable recommendations for ethical, effective use of consistency bias.`,

    outputSchema: {
      type: 'object',
      properties: {
        consistencyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              description: { type: 'string' },
              servesUser: { type: 'boolean' },
              preferenceEvolutionHandled: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'description',
              'servesUser',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            preferencePersistence: { type: 'number' },
            interactionConsistency: { type: 'number' },
            commitmentEthics: { type: 'number' },
            changeability: { type: 'number' },
          },
          required: [
            'preferencePersistence',
            'interactionConsistency',
            'commitmentEthics',
            'changeability',
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
        'consistencyPatterns',
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
        title: 'Audit Current Preference Persistence',
        description:
          'Map every user decision point and determine which choices are persisted, which are lost, and which should be remembered',
        example:
          'Audit reveals: sort order resets on page reload, theme persists, filter selections are lost between sessions',
        tips: [
          'Catalog every user-configurable setting and interaction state',
          'Test persistence across sessions, devices, and updates',
          'Prioritize high-frequency decisions for persistence',
        ],
      },
      {
        step: 2,
        title: 'Implement Durable Preference Storage',
        description:
          'Build infrastructure to persist user decisions across sessions, devices, and product updates',
        example:
          'Server-side preference store with local cache fallback, syncing sort orders, view modes, and layout configurations',
        tips: [
          'Use server-side storage for cross-device consistency',
          'Implement local storage as offline fallback',
          'Version preferences to handle schema changes during updates',
        ],
      },
      {
        step: 3,
        title: 'Design Progressive Commitment Flows',
        description:
          'Structure onboarding and adoption as a series of small, sequential commitments that build on each other',
        example:
          'Step 1: Create account (30 sec) → Step 2: Name your workspace → Step 3: Add first item → Step 4: Invite teammate',
        tips: [
          'Start with the smallest possible commitment',
          'Reference completed steps when prompting the next one',
          'Show progress to reinforce momentum',
        ],
      },
      {
        step: 4,
        title: 'Build Decision Reinforcement',
        description:
          'After significant user decisions, provide confirmation and validation that reinforces the choice',
        example:
          'Post-upgrade: "Welcome to Pro! Here are 3 features your plan unlocks that 89% of Pro users love."',
        tips: [
          'Use social proof to validate decisions',
          'Provide immediate value after commitment',
          'Avoid over-the-top celebration that feels insincere',
        ],
      },
      {
        step: 5,
        title: 'Ensure Changeability',
        description:
          'Make it easy for users to update or reverse past decisions when their needs evolve',
        example:
          'Every persistent preference has a visible, one-click way to change it. Cancellation is as easy as sign-up.',
        tips: [
          'Provide clear "reset to defaults" options',
          'Make cancellation/downgrade straightforward',
          'Periodically prompt preference review after major changes',
        ],
      },
    ],

    dos: [
      'Persist user preferences across sessions, devices, and updates',
      'Reference past decisions when prompting new ones to create natural flow',
      'Maintain consistent interaction patterns across all product areas',
      'Reinforce good decisions with validation and social proof',
      'Make it easy to update or change past decisions',
      'Use progressive commitment to guide adoption naturally',
      'Remember accessibility preferences globally and durably',
      'Show returning users their progress and past work',
    ],

    donts: [
      'Don\'t weaponize sunk costs to prevent users from leaving',
      'Don\'t lock users into decisions they can\'t reverse',
      'Don\'t reset preferences after updates or migrations',
      'Don\'t use guilt or loss messaging to exploit past commitment',
      'Don\'t assume past preferences are still optimal without checking',
      'Don\'t force users to re-make decisions they already made',
      'Don\'t apply consistency pressure to safety-critical choices',
      'Don\'t make cancellation harder than sign-up',
    ],

    bestPractices: [
      {
        title: 'Smart Defaults from History',
        description:
          'Use past behavior to set intelligent defaults for future decisions',
        rationale:
          'Reduces decision fatigue while respecting established patterns',
        example:
          'Pre-fill shipping address, payment method, and delivery preferences from last order',
      },
      {
        title: 'Gentle Preference Review Prompts',
        description:
          'Periodically invite users to review long-standing preferences, especially after major product changes',
        rationale:
          'Prevents users from being locked into outdated configurations by inertia',
        example:
          '"We\'ve added 5 new notification options since you last updated your preferences. Take a quick look?"',
      },
      {
        title: 'Cross-Device Consistency',
        description:
          'Sync user preferences and state across all devices seamlessly',
        rationale:
          'Consistency should extend beyond a single device to the entire product experience',
        example:
          'Theme, language, notification settings, and workspace layout sync via account, not local storage',
      },
      {
        title: 'Ethical Exit Flows',
        description:
          'Design cancellation and exit flows that respect user autonomy while making honest retention offers',
        rationale:
          'Users who leave easily are more likely to return; trapped users become vocal detractors',
        example:
          'Cancellation flow: clear button → optional reason → honest offer (pause, downgrade) → immediate confirmation',
      },
      {
        title: 'Commitment Transparency',
        description:
          'Be upfront about what commitments entail and what changes with each decision',
        rationale:
          'Informed consistency is ethical; uninformed lock-in is manipulation',
        example:
          'Before annual billing commitment: "This saves you 20%. You can switch to monthly at any renewal."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Persist accessibility preferences as first-class settings',
        implementation:
          'Store text size, contrast mode, reduced motion, and screen reader preferences server-side and apply them immediately on every page load, before any content renders.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Maintain consistent keyboard navigation patterns across all features',
        implementation:
          'Ensure Tab order, keyboard shortcuts, and focus management follow the same patterns everywhere. Document and test consistency.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation - Navigation mechanisms must be consistent across pages',
        implementation:
          'Main navigation, breadcrumbs, and landmark structure should be identical in position and order across the entire product.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Components with same function must be identified consistently',
        implementation:
          'Use identical labels, icons, and ARIA roles for the same function across all pages (e.g., "Save" is always "Save", never "Submit" or "Apply").',
      },
    ],

    ethics: [
      {
        concern: 'Sunk Cost Exploitation',
        severity: 'critical',
        explanation:
          'Using accumulated investment (time, money, data) to guilt users into continuing against their wishes',
        mitigation:
          'Design exit flows that acknowledge past value without weaponizing it. Make data export easy. Offer pause or downgrade alternatives without guilt.',
      },
      {
        concern: 'Preference Lock-In',
        severity: 'high',
        explanation:
          'Making it technically or procedurally difficult to change established preferences or decisions',
        mitigation:
          'Every preference should be changeable through self-service. Cancellation should be as easy as sign-up. Settings should always be editable.',
      },
      {
        concern: 'Manipulative Progressive Commitment',
        severity: 'high',
        explanation:
          'Using foot-in-the-door techniques to extract commitments users wouldn\'t have made if asked directly',
        mitigation:
          'Be transparent about the full journey. Don\'t hide the final ask. Each step should provide genuine value independent of later steps.',
      },
      {
        concern: 'Outdated Preference Harm',
        severity: 'medium',
        explanation:
          'Blindly applying past preferences when user needs have changed, potentially causing harm or poor experience',
        mitigation:
          'Build intelligence into persistence: flag preferences that may be outdated, prompt periodic review, and surface new options.',
      },
      {
        concern: 'Dark Pattern Retention',
        severity: 'critical',
        explanation:
          'Using consistency bias in cancellation flows to prevent users from leaving (roach motel pattern)',
        mitigation:
          'Follow FTC guidelines and EU consumer protection standards. Make unsubscribe/cancel no harder than subscribe/sign-up.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Theory of Cognitive Dissonance',
        author: 'Festinger, L.',
        year: 1957,
        description:
          'The foundational work establishing that inconsistency between beliefs and behavior creates psychological discomfort that drives attitude change toward consistency',
        type: 'foundational',
      },
      {
        title: 'Compliance Without Pressure: The Foot-in-the-Door Technique',
        author: 'Freedman, J. L., & Fraser, S. C.',
        year: 1966,
        doi: '10.1037/h0023552',
        description:
          'Classic study showing that small initial commitments dramatically increase compliance with larger subsequent requests',
        type: 'foundational',
      },
      {
        title: 'Commitment and Behavior Change: Evidence from the Field',
        author: 'Cialdini, R. B., & Guadagno, R. E.',
        year: 2004,
        description:
          'Research demonstrating how public commitments create stronger consistency pressure than private ones',
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
          'Chapter on Commitment and Consistency is the definitive practical treatment of how consistency bias operates in persuasion and decision-making',
        type: 'foundational',
      },
      {
        title: 'A Theory of Cognitive Dissonance',
        author: 'Festinger, Leon',
        year: 1957,
        isbn: '9780804709118',
        description:
          'The original theory explaining why people change attitudes to match behavior, rather than the reverse',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Practical framework for using commitment and consistency to build products that create habitual use patterns',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Commitment and Consistency Principle in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/commitment-consistency-ux/',
        description:
          'Practical guide to applying commitment and consistency principle in user experience design',
        type: 'practical',
      },
      {
        title: 'Progressive Disclosure and Progressive Commitment in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/progressive-disclosure',
        description:
          'How to structure commitment flows that feel natural rather than manipulative',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Science of Persuasion: Commitment & Consistency',
        author: 'Cialdini, Robert',
        url: 'https://www.youtube.com/watch?v=cFdCzN7RYbw',
        description:
          'Cialdini explains the commitment and consistency principle with real-world examples',
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
      'sunk-cost-fallacy',      // Past investment reinforces consistency pressure
      'status-quo-bias',        // Preference for current state aligns with consistency
      'endowment-effect',       // Ownership of choices increases their perceived value
      'social-proof',           // Others' consistency validates our own
      'loss-aversion',          // Fear of losing progress reinforces commitment
    ],

    conflicts: [
      'novelty-bias',           // Desire for new experiences conflicts with consistency
      'information-bias',       // New information can break consistency patterns
    ],

    confusedWith: [
      'status-quo-bias',        // Related but different: status quo is inertia, consistency is active alignment
      'sunk-cost-fallacy',      // Consistency is about identity alignment, sunk cost is about past investment
      'confirmation-bias',      // Confirmation bias filters information; consistency bias drives behavior
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'preference-persistence',
        'commitment-escalation',
        'foot-in-the-door',
      ],
    },
  },
};
