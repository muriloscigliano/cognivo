/**
 * RESTRAINT BIAS (DECISION)
 *
 * We overestimate our ability to control impulses, leading to decisions
 * that increase exposure to temptation and ultimately more impulsive behavior.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const restraintBiasDecision: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'restraint-bias-decision',
    name: 'Restraint Bias (Decision)',
    aliases: ['Self-Control Illusion', 'Impulse Overconfidence', 'Hot-Cold Empathy Gap (Self-Control)'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'self-control',
      'temptation',
      'impulse',
      'pre-commitment',
      'decision-making',
      'willpower',
      'friction',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We overestimate our ability to resist temptation, so we put ourselves in situations where we are more likely to give in.',

    detailed: `Restraint bias is a cognitive bias in which people overestimate their capacity for impulse control. This overconfidence leads individuals to expose themselves to greater temptation than they can actually handle, resulting in more impulsive behavior than if they had acknowledged their limitations from the start.

The bias is particularly relevant to decision-making because it occurs at the point of choice: when people decide whether to enter tempting situations, they believe they will be able to resist. A person who thinks they can browse an online store "just to look" ends up purchasing impulsively. A user who believes they can check social media for "just a minute" loses an hour.

In product and UX design, restraint bias has profound implications. Designers can either exploit this bias (making it easy to fall into unintended usage patterns) or counteract it (building pre-commitment tools, proactive limits, and mindful friction that protect users from their own overconfidence in self-control).`,

    psychologyBasis: {
      discoveredBy: 'Loran F. Nordgren, Frenk van Harreveld, and Joop van der Pligt',
      year: 2009,
      theory: 'Restraint Bias and the Illusion of Self-Restraint',
      mechanism: `Overconfidence in self-control leads to decisions that increase temptation exposure, resulting in more impulsive behavior. This happens because:

1. **Cold-State Forecasting**: When not currently tempted (cold state), people underestimate how powerful urges will feel in the moment (hot state)
2. **Willpower Overestimation**: People treat willpower as a stable trait rather than a depletable, context-dependent resource
3. **Exposure Escalation**: Overconfidence leads to voluntarily increasing proximity to temptation (e.g., "I can handle just browsing")
4. **Feedback Failure**: Successes at resisting reinforce overconfidence, while failures are attributed to external factors rather than flawed self-assessment
5. **Present Bias Blindness**: People fail to account for how their preferences will shift when temptation is immediate rather than abstract`,
    },

    realWorldExample: `In Nordgren et al.'s 2009 study, smokers who rated their self-control as high were more likely to expose themselves to temptation (e.g., keeping cigarettes nearby while trying to quit) and consequently more likely to relapse. Those who acknowledged their vulnerability and avoided temptation entirely had significantly higher quit rates. The same pattern applies to digital behavior: users who believe they can "just check" notifications or "quickly browse" a feed consistently underestimate how much time and attention they will lose.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Restraint bias affects how users make decisions about engaging with tempting features, time-consuming content, and impulse-driven actions. Designers can counteract this bias to protect users by:

- Offering proactive limits that users set before entering tempting situations
- Building pre-commitment devices that lock in intentions while users are in a "cold" rational state
- Reducing temptation exposure through thoughtful information architecture
- Adding mindful friction at decision points where impulsive behavior is likely
- Providing clear feedback on actual behavior versus intended behavior`,

    whenToUse: [
      {
        title: 'Pre-Set Spending Limits',
        scenario:
          'When users shop, browse marketplaces, or make in-app purchases',
        example:
          'Allow users to set a monthly spending cap before they start browsing, with clear alerts as they approach the limit',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Screen Time Limits',
        scenario: 'When users engage with content feeds, social media, or entertainment apps',
        example:
          'Let users define daily time limits in advance, with progressive warnings and a "wind down" mode as the limit approaches',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Focus and Distraction Blocking',
        scenario: 'When users need to concentrate on work or study tasks',
        example:
          'Provide a "focus mode" that blocks distracting features during work hours, configured in advance when the user is in a calm, rational state',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Cooling-Off Periods',
        scenario: 'When users make high-stakes or emotionally driven decisions',
        example:
          'Add a 24-hour delay for purchases above a user-defined threshold, allowing the impulse to subside before commitment',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription and Commitment Reviews',
        scenario: 'When users sign up for recurring services or auto-renewals',
        example:
          'Show a summary of total annual cost and require explicit confirmation before converting a trial to a paid subscription',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency or Time-Sensitive Actions',
        reason:
          'Friction designed to slow impulsive behavior can be dangerous when speed is required',
        consequence:
          'Users may be unable to complete urgent actions (account recovery, safety features, emergency contacts)',
        alternative:
          'Exempt emergency flows from friction and cooling-off periods; use contextual awareness to distinguish urgency from impulse',
      },
      {
        title: 'Accessibility-Critical Interactions',
        reason:
          'Pre-commitment barriers can create cognitive overload for users with disabilities',
        consequence:
          'Users with cognitive disabilities may be unable to configure limits or navigate friction patterns',
        alternative:
          'Provide simple defaults with easy opt-out; never make friction the only path through a flow',
      },
      {
        title: 'Low-Stakes Decisions',
        reason:
          'Adding friction to trivial choices frustrates users without meaningful benefit',
        consequence:
          'User annoyance, abandonment, and perception that the product is paternalistic',
        alternative:
          'Reserve pre-commitment devices for high-impact decisions; keep low-stakes interactions frictionless',
      },
      {
        title: 'Paternalistic Overreach',
        reason:
          'Imposing limits without user consent undermines autonomy and trust',
        consequence:
          'Users feel controlled rather than supported, leading to resentment and workarounds',
        alternative:
          'Always let users opt in to limits; frame tools as empowering, not restrictive',
      },
    ],

    commonMistakes: [
      {
        title: 'Making Limits Easy to Override in the Moment',
        description:
          'Allowing users to dismiss spending caps or time limits with a single tap when temptation is highest',
        why: 'The whole point of pre-commitment is to bind future behavior; easy overrides defeat the purpose',
        fix: 'Require a deliberate, multi-step process to override limits (e.g., wait 10 minutes, re-enter a reason, or require returning to settings)',
      },
      {
        title: 'Setting Limits Only After Overuse',
        description:
          'Prompting users to set limits only after they have already overshot their intentions',
        why: 'Restraint bias means users underestimate temptation; limits must be set in a calm, rational state before exposure',
        fix: 'Prompt limit-setting during onboarding or account setup, before the user encounters tempting content',
      },
      {
        title: 'Framing Limits as Punishment',
        description:
          'Presenting time or spending limits with negative language like "You have been blocked"',
        why: 'Negative framing triggers reactance and makes users want to remove the limits',
        fix: 'Frame limits positively: "You reached your goal for today" or "Your budget is protected"',
      },
      {
        title: 'Ignoring the Hot-Cold Empathy Gap',
        description:
          'Designing limit-setting UIs that are only accessible during moments of temptation',
        why: 'Users in a "hot" state will set permissive limits or skip setup entirely',
        fix: 'Separate the limit-setting context from the temptation context; surface configuration during calm, goal-oriented moments',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines proximity to temptation and visibility of self-regulation tools',
        examples: [
          'Placing spending-limit settings prominently in account dashboards, not buried in menus',
          'Positioning "focus mode" toggles in primary navigation for easy pre-commitment',
          'Separating browsing from purchasing flows to reduce impulse exposure',
          'Using progressive disclosure to prevent overwhelming users with tempting options all at once',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing shapes how users perceive limits and self-control tools',
        examples: [
          'Using empowering language ("Your daily goal") rather than restrictive language ("Time limit reached")',
          'Clear, readable display of remaining budget or time to maintain awareness',
          'Typography hierarchy that elevates limit status over tempting content',
          'Gentle, supportive tone in limit notifications rather than alarmist phrasing',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals progress toward limits and frames self-regulation positively',
        examples: [
          'Green-to-amber-to-red gradient showing approach to spending or time limits',
          'Calming colors in "wind down" modes to reduce arousal and temptation',
          'Neutral tones for limit-reached states rather than aggressive reds',
          'Distinct visual treatment for "focus mode" that feels intentional, not punitive',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines whether users can meaningfully pre-commit and resist impulse',
        examples: [
          'Multi-step override process for pre-set limits prevents impulsive dismissal',
          'Confirmation dialogs at spending thresholds require deliberate acknowledgment',
          'Automatic session-end animations that gracefully close tempting experiences',
          'Delayed-action patterns for high-value purchases (cart holds, wishlists)',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy determines whether users are informed about their actual behavior versus their perceived self-control',
        examples: [
          'Weekly usage summaries comparing intended limits with actual behavior',
          'Contextual nudges: "You planned to spend 15 minutes. It has been 45."',
          'Pre-commitment prompts: "How long do you want to browse today?"',
          'Educational content explaining the restraint bias to build self-awareness',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Self-regulation tools must be accessible to all users, including those with cognitive disabilities',
        examples: [
          'Simple, clear limit-setting interfaces that do not require complex configuration',
          'Screen reader announcements for approaching and reaching limits',
          'Keyboard-accessible focus mode toggles and limit controls',
          'Sensible defaults for users who cannot or choose not to configure limits',
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
        title: 'Pre-Set Spending Limit Before Shopping',
        description:
          'E-commerce app prompting users to set a budget before browsing',
        code: `<div class="budget-setup">
  <h3>Set Your Shopping Budget</h3>
  <p class="subtitle">Decide how much you want to spend before you browse.
  You can change this later from Settings.</p>

  <div class="budget-options">
    <button class="budget-amount">$25</button>
    <button class="budget-amount selected">$50</button>
    <button class="budget-amount">$100</button>
    <input type="number" placeholder="Custom amount" class="custom-budget">
  </div>

  <div class="budget-controls">
    <label>
      <input type="checkbox" checked>
      Warn me at 80% of my budget
    </label>
    <label>
      <input type="checkbox">
      Require 10-minute wait for purchases over budget
    </label>
  </div>

  <button class="primary">Set Budget & Start Shopping</button>
</div>`,
        explanation:
          'By prompting budget-setting before the user enters the browsing experience, this design captures intentions while the user is in a rational "cold" state. The progressive warnings and optional cooling-off period protect against impulse spending.',
        principle:
          'Pre-commitment in cold states protects against hot-state impulsivity',
        metrics: {
          before: '38% of users exceeded their intended spending by more than 50%',
          after: '12% of users exceeded their intended spending by more than 50%',
          improvement: '68% reduction in unintended overspending',
        },
      },
      {
        title: 'Screen Time Limit with Graceful Wind-Down',
        description:
          'Social media app with user-configured daily time limits',
        code: `<div class="time-limit-active">
  <div class="time-remaining">
    <div class="progress-ring" data-percent="85">
      <span class="time">7 min left</span>
    </div>
    <p class="goal-label">of your 45-minute daily goal</p>
  </div>

  <div class="wind-down-notice">
    <h4>Winding down for today</h4>
    <p>You set this limit to have more time for other things.</p>
    <p class="reflection">You have scrolled past 142 posts today.</p>
  </div>

  <div class="actions">
    <button class="primary">Close App</button>
    <button class="secondary" disabled data-enable-in="300">
      Add 15 Minutes (available in 5 min)
    </button>
  </div>
</div>`,
        explanation:
          'The wind-down notice reminds users of their own stated reason for setting the limit. The extension button is deliberately delayed by 5 minutes, creating friction that lets the impulse to continue subside. The post count provides behavioral feedback.',
        principle:
          'Delayed override options let impulses fade before users can dismiss limits',
        metrics: {
          before: 'Average session: 67 minutes, 78% of users exceeded their intended time',
          after: 'Average session: 41 minutes, 23% of users exceeded their intended time',
          improvement: '55% reduction in sessions exceeding user-defined limits',
        },
      },
      {
        title: 'Focus Mode with Distraction Blocking',
        description:
          'Productivity app that blocks tempting features during work hours',
        code: `<div class="focus-mode-setup">
  <h3>Schedule Focus Time</h3>
  <p>Block distracting features so you can concentrate.</p>

  <div class="schedule">
    <div class="time-block">
      <label>Weekdays</label>
      <span class="hours">9:00 AM - 12:00 PM</span>
      <span class="hours">2:00 PM - 5:00 PM</span>
    </div>
  </div>

  <div class="blocked-features">
    <h4>During focus time, these are paused:</h4>
    <ul>
      <li><input type="checkbox" checked> Social feed notifications</li>
      <li><input type="checkbox" checked> Non-urgent messages</li>
      <li><input type="checkbox" checked> Content recommendations</li>
      <li><input type="checkbox"> All notifications</li>
    </ul>
  </div>

  <div class="override-policy">
    <label>
      <input type="radio" name="override" value="strict" checked>
      Strict: Cannot override during focus time
    </label>
    <label>
      <input type="radio" name="override" value="moderate">
      Moderate: 5-minute wait to override
    </label>
  </div>

  <button class="primary">Activate Focus Schedule</button>
</div>`,
        explanation:
          'Users configure focus blocks in advance, choosing what to block and how strict the override policy should be. Setting this up during calm planning moments (not during a distraction crisis) leverages cold-state rationality.',
        principle:
          'Scheduling limits in advance separates intention-setting from temptation exposure',
      },
    ],

    bad: [
      {
        title: 'Easily Dismissed Time Limit',
        description:
          'Screen time warning that can be bypassed with a single tap',
        code: `<!-- DON'T DO THIS -->
<div class="time-warning">
  <p>You have been using this app for 2 hours.</p>
  <button class="primary large">OK, Got It</button>
</div>`,
        explanation:
          'A single-tap dismissal provides zero meaningful friction. Users in a "hot" state will tap through this without engaging with the message. The notification becomes noise that trains users to ignore warnings.',
        principle:
          'Single-tap dismissals provide no real protection against restraint bias',
      },
      {
        title: 'Exploiting Overconfidence in Self-Control',
        description:
          'Streaming service encouraging "just one more" with auto-play',
        code: `<!-- DON'T DO THIS -->
<div class="autoplay-prompt">
  <h3>Next Episode Starting in 5 seconds...</h3>
  <div class="countdown-bar" style="animation: shrink 5s linear;"></div>
  <p class="small">You can always stop after this one.</p>
  <button class="tiny muted">Cancel</button>
</div>`,
        explanation:
          'The phrase "You can always stop after this one" directly exploits restraint bias by reinforcing the user\'s overconfidence in future self-control. The tiny cancel button and auto-play default make continuing the path of least resistance.',
        principle:
          'Never exploit the illusion of future self-control to drive engagement',
      },
      {
        title: 'Limits Set Only During Temptation',
        description:
          'Shopping app that only shows budget tools at checkout',
        code: `<!-- DON'T DO THIS -->
<div class="checkout">
  <h3>Your Cart: $347.82</h3>
  <p class="budget-note">Want to set a spending limit?</p>
  <button class="text-link small">Set budget</button>
  <button class="primary large">Complete Purchase</button>
</div>`,
        explanation:
          'Offering budget-setting at the moment of highest temptation (checkout with a full cart) is ineffective. Users in a "hot" state with dopamine-driven anticipation will not set meaningful limits. The tiny link versus the large purchase button makes the choice architecture exploitative.',
        principle:
          'Limit-setting tools presented during peak temptation are ineffective and deceptive',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iOS Screen Time',
        description: 'Apple\'s Screen Time feature lets users set daily app limits, schedule downtime, and review weekly usage reports. Limits are configured in Settings (a calm context) and enforced during app use. Users can extend time but must navigate to Settings to do so, adding meaningful friction.',
        effectiveness: 'very-effective',
        analysis: 'The separation between limit-setting (Settings app) and limit-enforcement (in-app) is a textbook pre-commitment device. The weekly report builds awareness of the gap between perceived and actual usage, directly countering restraint bias.',
      },
      {
        company: 'Various',
        product: 'Browser Focus Extensions (Freedom, Cold Turkey, LeechBlock)',
        description: 'Browser extensions that block distracting websites during scheduled focus periods. Users configure blocklists and schedules in advance. Strict modes make it impossible to override the block without restarting the computer or waiting for the scheduled end time.',
        effectiveness: 'very-effective',
        analysis: 'These tools succeed specifically because they acknowledge that users cannot trust their in-the-moment self-control. The strictest modes remove the override option entirely, which is the most honest design response to restraint bias.',
      },
      {
        company: 'Various',
        product: 'Gambling Self-Exclusion Programs',
        description: 'Online gambling platforms offer self-exclusion tools where users can ban themselves from the platform for defined periods (weeks, months, or permanently). Once activated, the exclusion cannot be reversed during the exclusion period, even if the user contacts support.',
        effectiveness: 'effective',
        analysis: 'Self-exclusion programs are the strongest form of pre-commitment device. They work because they are designed around the assumption that future self-control will fail. The irreversibility during the exclusion period is critical to their effectiveness.',
      },
      {
        company: 'Various',
        product: 'Diet and Nutrition Apps (MyFitnessPal, Noom)',
        description: 'Diet apps let users set caloric or nutritional goals in advance, log meals, and receive alerts when approaching limits. Noom adds psychological coaching that explicitly addresses overconfidence in willpower and teaches environmental design strategies.',
        effectiveness: 'effective',
        analysis: 'The most effective diet apps go beyond tracking to address the psychology of restraint bias directly. By teaching users that willpower is unreliable and that environmental control (not eating near temptation) matters more, they counteract the core mechanism of the bias.',
      },
    ],

    abTests: [
      {
        title: 'Pre-Set Budget vs No Budget: E-Commerce Spending',
        hypothesis:
          'Users who set a budget before browsing will spend closer to their intended amount than users without budget tools',
        controlVersion: {
          description:
            'Standard e-commerce browsing experience with no budget-setting prompt',
          metrics: {
            conversionRate: '14.2%',
            averageOrderValue: '$127',
            postPurchaseRegret: '34%',
          },
        },
        treatmentVersion: {
          description:
            'Budget-setting prompt shown before browsing: "How much do you want to spend today?" with preset options and alerts at 80% of budget',
          metrics: {
            conversionRate: '15.8%',
            averageOrderValue: '$89',
            postPurchaseRegret: '11%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While average order value decreased by 30%, post-purchase regret dropped by 68% and return rates dropped by 41%. Conversion rate actually increased because users felt safer making purchases. Net revenue was comparable due to fewer returns, and customer lifetime value increased by 22% over 6 months.',
          learnings: [
            'Users who feel in control buy more confidently with less regret',
            'Lower individual order values were offset by higher retention and repeat purchases',
            'Budget tools built trust and increased long-term engagement',
            'Post-purchase regret is a leading indicator of churn; reducing it improves LTV',
          ],
        },
      },
      {
        title: 'Screen Time Limits: Easy Override vs Delayed Override',
        hypothesis:
          'A 5-minute delay before allowing users to extend their time limit will reduce total session duration',
        controlVersion: {
          description:
            'Time limit notification with immediate "Add 15 Minutes" button',
          metrics: {
            averageSessionDuration: '72 min',
            limitExtensions: '3.2 per user per day',
            userSatisfaction: '5.8/10',
          },
        },
        treatmentVersion: {
          description:
            'Time limit notification with "Add 15 Minutes" button disabled for 5 minutes, showing countdown and reminder of user\'s stated goal',
          metrics: {
            averageSessionDuration: '48 min',
            limitExtensions: '0.7 per user per day',
            userSatisfaction: '7.4/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The 5-minute delay reduced limit extensions by 78% and average session time by 33%. Crucially, user satisfaction increased because users felt the app was helping them achieve their stated goals rather than undermining them.',
          learnings: [
            'Brief friction is sufficient to break the impulse cycle; most users do not wait for the override',
            'Reminding users of their own stated reason for the limit increases acceptance',
            'Users report higher satisfaction when products help them maintain self-imposed limits',
            'The feeling of self-control is more satisfying than the content they would have consumed',
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
        name: 'Missing Pre-Commitment Tools',
        description:
          'No visible budget, time, or usage limit controls in account or settings areas',
        howToSpot:
          'Check Settings, Account, and Dashboard areas for any self-regulation features',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single-Tap Limit Dismissals',
        description:
          'Time or usage warnings that can be dismissed with one tap and no friction',
        howToSpot:
          'Trigger a time limit or usage warning and observe how easily it can be bypassed',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Auto-Play and Auto-Continue Patterns',
        description:
          'Content that auto-advances without requiring deliberate user action to continue',
        howToSpot:
          'Look for auto-play video, auto-scroll feeds, or countdown-to-next patterns',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: '"Just One More" Language',
        description:
          'Copy that reinforces overconfidence in future self-control ("You can always stop later")',
        howToSpot:
          'Read microcopy around continuation prompts, upsells, and engagement hooks',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Limit-Setting Buried in Menus',
        description:
          'Self-regulation tools hidden deep in settings rather than surfaced proactively',
        howToSpot:
          'Count the number of taps or clicks required to find and configure usage limits',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Temptation Escalation Pattern',
        description: 'Design that progressively increases exposure to tempting content without check-in points',
        indicators: ['Infinite scroll with no natural stopping points', 'Progressively more personalized recommendations', 'Auto-play or auto-advance between content items', 'No session duration feedback'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Override Undermining Pattern',
        description: 'Self-regulation tools that are technically present but designed to be easily bypassed',
        indicators: ['Single-tap limit dismissal', 'Extension options presented more prominently than "stop" options', 'Limits that reset daily without cumulative tracking', 'No separation between limit-setting and limit-override contexts'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Cold-State Neglect Pattern',
        description: 'Absence of opportunities to set intentions before entering tempting experiences',
        indicators: ['No onboarding prompt for usage goals', 'Budget tools only available at checkout', 'Limit-setting UI only accessible during active sessions', 'No weekly or monthly goal-setting prompts'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Behavioral Feedback Absence Pattern',
        description: 'No visibility into the gap between intended and actual behavior',
        indicators: ['No usage summaries or reports', 'No comparison of planned versus actual spending or time', 'No trend data showing behavior over time', 'No reflection prompts after sessions'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users set spending, time, or usage limits before entering tempting experiences?',
      'How many steps are required to dismiss or override a self-imposed limit?',
      'Are limit-setting tools accessible in a calm context (settings, onboarding) or only during temptation?',
      'Does the design include auto-play, auto-scroll, or auto-continue patterns?',
      'Is there microcopy that reinforces overconfidence in self-control ("You can always stop")?',
      'Do users receive feedback comparing their intended limits with actual behavior?',
      'Are pre-commitment devices framed positively (goal achievement) or negatively (restriction)?',
      'Can users choose the strictness of their override policy?',
      'Are there natural stopping points in content consumption flows?',
      'Does the product provide weekly or monthly behavioral summaries?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in restraint bias and self-control in decision-making.

Analyze the provided design for restraint bias patterns. Identify:

1. **Pre-Commitment Opportunities**: Whether users can set limits before encountering temptation
2. **Override Friction**: How easy or hard it is to bypass self-imposed limits
3. **Temptation Exposure**: Design patterns that increase proximity to impulsive actions
4. **Behavioral Feedback**: Whether users see data on their actual vs intended behavior
5. **Cold-State vs Hot-State Design**: Whether limit-setting and limit-enforcement are appropriately separated

For each pattern found:
- Identify whether it exploits or counteracts restraint bias
- Assess the effectiveness of any pre-commitment devices
- Determine if override friction is appropriately calibrated
- Evaluate ethical implications of the design's relationship to user self-control
- Suggest improvements for supporting genuine user autonomy

Consider:
- Does the design assume users have more self-control than they actually do?
- Are there auto-play, infinite scroll, or "just one more" patterns?
- Can users meaningfully pre-commit to their intentions?
- Is behavioral feedback provided to close the intention-action gap?
- Are self-regulation tools accessible, well-framed, and effective?

Provide actionable recommendations for ethical, user-empowering design.`,

    outputSchema: {
      type: 'object',
      properties: {
        restraintPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              exploitsOrCounteracts: { type: 'string' },
              overrideFriction: { type: 'string' },
              coldHotStateSeparation: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'exploitsOrCounteracts',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            preCommitmentScore: { type: 'number' },
            overrideFrictionScore: { type: 'number' },
            behavioralFeedbackScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'preCommitmentScore',
            'overrideFrictionScore',
            'behavioralFeedbackScore',
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
        'restraintPatterns',
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
        title: 'Identify Temptation Points',
        description:
          'Map every point in the user journey where impulsive behavior is likely (spending, time, attention)',
        example:
          'Audit: browsing feeds, checkout flows, auto-play content, notification taps, in-app purchases',
        tips: [
          'Interview users about moments they later regretted',
          'Analyze session data for patterns of overuse or overspending',
          'Look for features with high engagement but low satisfaction scores',
        ],
      },
      {
        step: 2,
        title: 'Design Pre-Commitment Devices',
        description:
          'Create tools that let users set limits during calm, rational moments before temptation arises',
        example:
          'Add budget-setting to onboarding: "How much do you want to spend per month?"',
        tips: [
          'Present limit-setting during account setup or at the start of sessions',
          'Offer sensible defaults that users can customize',
          'Frame limits as goals rather than restrictions',
        ],
      },
      {
        step: 3,
        title: 'Calibrate Override Friction',
        description:
          'Make it possible but not trivial to override limits, so impulses can subside',
        example:
          'Disable "extend time" button for 5 minutes after limit is reached; show the user\'s stated reason for the limit',
        tips: [
          'Time-delayed overrides (3-10 minutes) are effective without being punitive',
          'Let users choose their own override strictness level',
          'Never make overrides impossible (respect autonomy) but do make them deliberate',
        ],
      },
      {
        step: 4,
        title: 'Provide Behavioral Feedback',
        description:
          'Show users the gap between their intended behavior and their actual behavior',
        example:
          'Weekly summary: "You set a goal of 30 min/day. Your average this week was 52 min/day."',
        tips: [
          'Use neutral, non-judgmental language in feedback',
          'Show trends over time, not just snapshots',
          'Celebrate when users meet their self-set goals',
        ],
      },
      {
        step: 5,
        title: 'Add Natural Stopping Points',
        description:
          'Break continuous experiences into discrete segments with decision points',
        example:
          'After every 5 items in a feed, show a "Continue browsing?" prompt with session time displayed',
        tips: [
          'Replace infinite scroll with paginated or chunked content',
          'Insert reflection moments between content units',
          'Make "stop" as easy and visible as "continue"',
        ],
      },
    ],

    dos: [
      'Offer pre-commitment tools during calm, rational moments (onboarding, settings)',
      'Frame limits as personal goals and achievements, not restrictions',
      'Add meaningful friction to override self-imposed limits',
      'Provide regular feedback comparing intended versus actual behavior',
      'Create natural stopping points in continuous consumption experiences',
      'Let users choose their own strictness level for overrides',
      'Celebrate when users successfully maintain their self-set limits',
      'Separate limit-setting UI from temptation contexts',
    ],

    donts: [
      'Don\'t exploit restraint bias by reinforcing overconfidence in self-control',
      'Don\'t use "You can always stop later" or similar language that assumes future willpower',
      'Don\'t make self-imposed limits dismissable with a single tap',
      'Don\'t hide self-regulation tools deep in settings menus',
      'Don\'t present limit-setting only during moments of peak temptation',
      'Don\'t frame reaching a limit as failure or punishment',
      'Don\'t design auto-play or infinite scroll without opt-in pre-commitment tools',
      'Don\'t impose limits paternalistically; always let users opt in',
    ],

    bestPractices: [
      {
        title: 'Separate Intention from Action',
        description:
          'Ensure limit-setting happens in a different context and time from limit-enforcement',
        rationale:
          'The hot-cold empathy gap means decisions made during temptation do not reflect genuine preferences',
        example:
          'Budget configured in Settings on Sunday; enforced during shopping on Wednesday',
      },
      {
        title: 'Progressive Friction',
        description:
          'Increase friction gradually as users approach and exceed their limits rather than creating a hard wall',
        rationale:
          'Gradual friction feels supportive rather than restrictive; hard stops feel punitive',
        example:
          'At 80%: gentle reminder. At 100%: 5-minute pause. At 120%: requires re-entering goal to continue',
      },
      {
        title: 'Positive Framing of Limits',
        description:
          'Present limits as achievements and self-care rather than deprivation',
        rationale:
          'Positive framing reduces reactance and increases long-term adherence to self-imposed limits',
        example:
          '"You protected 2 hours for family time this week" instead of "You were blocked for 2 hours"',
      },
      {
        title: 'Behavioral Transparency',
        description:
          'Give users clear, honest data about their actual usage patterns',
        rationale:
          'Restraint bias persists partly because people do not see accurate data about their own behavior',
        example:
          'Weekly email: "You estimated 20 min/day on social media. Your actual average was 53 min/day."',
      },
      {
        title: 'User-Controlled Strictness',
        description:
          'Let users choose how hard it should be to override their own limits',
        rationale:
          'Different users have different levels of self-awareness; one-size-fits-all frustrates some and under-protects others',
        example:
          'Three modes: Gentle (reminder only), Moderate (5-min delay), Strict (cannot override until tomorrow)',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Limit status and progress must be conveyed semantically',
        implementation:
          'Use ARIA live regions to announce approaching limits and progress updates for screen reader users',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All pre-commitment controls must be keyboard accessible',
        implementation:
          'Ensure budget sliders, time-limit selectors, and focus-mode toggles can be operated with keyboard alone',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Limit-setting interfaces must have clear labels and guidance',
        implementation:
          'Provide descriptive labels explaining what each limit does, with examples of typical values',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Delayed override timers must be adjustable for users who need more time',
        implementation:
          'Allow users with disabilities to adjust override delay durations; provide alternatives to time-based friction',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Overconfidence in Self-Control',
        severity: 'critical',
        explanation:
          'Designing engagement patterns that rely on users overestimating their ability to stop (auto-play, infinite scroll, "just one more")',
        mitigation:
          'Add genuine pre-commitment tools, natural stopping points, and behavioral feedback. Never use copy that reinforces the illusion of unlimited willpower.',
      },
      {
        concern: 'Performative Self-Regulation Tools',
        severity: 'high',
        explanation:
          'Offering time or spending limits that are trivially easy to bypass, creating an illusion of user empowerment without real protection',
        mitigation:
          'Ensure override friction is meaningful (time delays, multi-step processes). Test whether limits actually change behavior, not just whether they exist.',
      },
      {
        concern: 'Paternalistic Design Without Consent',
        severity: 'high',
        explanation:
          'Imposing limits or friction on users who did not request it, undermining autonomy',
        mitigation:
          'All pre-commitment tools must be opt-in. Frame tools as empowering, not restrictive. Always allow users to adjust or remove limits they no longer want.',
      },
      {
        concern: 'Vulnerable Populations',
        severity: 'critical',
        explanation:
          'Users with addiction, compulsive behavior, or impulse control disorders are disproportionately affected by restraint bias exploitation',
        mitigation:
          'Provide robust self-exclusion options. Partner with mental health organizations. Make the strongest pre-commitment tools easy to find and activate.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Restraint Bias: How the Illusion of Self-Restraint Promotes Impulsive Behavior',
        author: 'Nordgren, L. F., van Harreveld, F., & van der Pligt, J.',
        year: 2009,
        doi: '10.1111/j.1467-9280.2009.02468.x',
        description:
          'The foundational paper demonstrating that overconfidence in self-control leads to greater temptation exposure and more impulsive behavior',
        type: 'foundational',
      },
      {
        title: 'The Devil You Know: The Effect of Contact on Self-Control',
        author: 'Nordgren, L. F., van Harreveld, F., & van der Pligt, J.',
        year: 2009,
        description:
          'Follow-up research showing that proximity to temptation directly undermines self-control, even when people believe they can resist',
        type: 'advanced',
      },
      {
        title: 'The Hot/Cold Empathy Gap and the Under-Prediction of Own Behavior',
        author: 'Loewenstein, G.',
        year: 2005,
        description:
          'Research on why people fail to predict how they will behave in emotionally charged states, underpinning the cold-state forecasting error in restraint bias',
        type: 'foundational',
      },
      {
        title: 'Pre-Commitment and Self-Control: Theory and Application',
        author: 'Bryan, G., Karlan, D., & Nelson, S.',
        year: 2010,
        description:
          'Review of pre-commitment devices as tools for overcoming self-control failures in economic and behavioral contexts',
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
          'Comprehensive coverage of cognitive biases including the mechanisms underlying overconfidence and self-control failures',
        type: 'foundational',
      },
      {
        title: 'Irresistible: The Rise of Addictive Technology and the Business of Keeping Us Hooked',
        author: 'Alter, Adam',
        year: 2017,
        isbn: '9780735222847',
        description:
          'Explores how technology exploits self-control limitations, directly relevant to designing ethical digital experiences',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'While focused on engagement, provides insight into the mechanisms that restraint bias-aware design should counteract',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Digital Wellbeing',
        author: 'Google Design',
        url: 'https://design.google/library/designing-for-digital-wellbeing',
        description:
          'Google\'s approach to building self-regulation tools that address overconfidence in self-control',
        type: 'practical',
      },
      {
        title: 'Time Well Spent and Humane Technology',
        author: 'Center for Humane Technology',
        url: 'https://www.humanetech.com/',
        description:
          'Framework for designing technology that respects user attention and self-control limitations',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Restraint Bias: Why We Overestimate Our Self-Control',
        author: 'Decision Lab',
        url: 'https://thedecisionlab.com/biases/restraint-bias',
        description:
          'Clear explanation of restraint bias with behavioral examples and design implications',
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
      'present-bias',
      'optimism-bias',
      'planning-fallacy',
      'loss-aversion',
    ],

    conflicts: [
      'status-quo-bias',
      'default-effect',
    ],

    confusedWith: [
      'optimism-bias',
      'overconfidence-effect',
      'hyperbolic-discounting',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'impulse-spending',
        'digital-overuse',
        'temptation-exposure',
      ],
    },
  },
};
