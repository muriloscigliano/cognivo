/**
 * RESTRAINT BIAS
 *
 * We overestimate our ability to resist temptation and control impulses
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const restraintBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'restraint-bias',
    name: 'Restraint Bias',
    aliases: ['Self-Control Illusion', 'Impulse Overconfidence', 'Temptation Underestimation'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'self-control',
      'temptation',
      'impulse',
      'willpower',
      'screen-time',
      'spending-limits',
      'digital-wellbeing',
      'habit-formation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People overestimate their ability to resist temptation and control their impulses.',

    detailed: `Restraint bias is a cognitive bias in which people overestimate their capacity to control impulsive behavior. This overconfidence in self-control leads individuals to expose themselves to greater temptation, believing they can resist it, which paradoxically increases the likelihood of giving in.

In digital product design, restraint bias is central to features like screen time controls, spending limits, notification management, and distraction-blocking tools. Users consistently believe they can "just check one more thing" or "stop whenever they want," but the data shows otherwise. Understanding this bias is essential for designing interventions that genuinely protect users from overconsumption.

The bias has significant ethical implications: products can either exploit it (designing for maximum engagement knowing users overestimate their ability to disengage) or design against it (building guardrails that account for the gap between perceived and actual self-control).`,

    psychologyBasis: {
      discoveredBy: 'Loran Nordgren, Joop van der Pligt, and Frenk van Harreveld',
      year: 2009,
      theory: 'Restraint Bias and the Illusion of Self-Restraint',
      mechanism: `People systematically overestimate their ability to control impulses when in a "cold" (non-tempted) state. This happens because:

1. **Hot-Cold Empathy Gap**: When not currently tempted, people cannot accurately predict how strongly they will feel impulses in the future
2. **Metacognitive Error**: People confuse their intention to resist with their actual capacity to resist
3. **Exposure Escalation**: Overconfidence leads to voluntarily placing oneself in tempting situations, increasing exposure
4. **Visceral Underweighting**: Abstract reasoning about self-control fails to account for the power of visceral, in-the-moment urges
5. **Past Success Inflation**: People recall instances of successful restraint more readily than failures, reinforcing overconfidence`,
    },

    realWorldExample: `In Nordgren et al.'s 2009 study, participants who rated themselves as having high self-control chose to expose themselves to greater temptation (e.g., keeping snacks closer at hand during a diet). Ironically, those who expressed the most confidence in their restraint were the most likely to succumb. Similarly, people who believe they can limit their phone use to "just five minutes" typically end up scrolling for 30+ minutes because they underestimated the pull of variable-reward content.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Restraint bias profoundly affects how users interact with digital products designed for engagement. Users believe they can control their usage, spending, and attention, but consistently fail to do so. Designers can leverage this understanding to:

- Build effective screen time and usage controls that account for overconfidence
- Design spending limit features that intervene before, not after, the tipping point
- Create notification management systems that reduce temptation exposure
- Implement distraction-blocking features with commitment mechanisms
- Frame self-control tools around realistic expectations rather than user overconfidence`,

    whenToUse: [
      {
        title: 'Screen Time and Usage Controls',
        scenario:
          'When helping users manage time spent on apps or devices',
        example:
          'Implement "take a break" reminders that require active dismissal rather than passive auto-close, since users overestimate their ability to self-regulate',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Spending Limit Features',
        scenario: 'When users set budgets or spending caps for purchases, subscriptions, or in-app spending',
        example:
          'Require a cooling-off period before allowing users to override their own spending limits, acknowledging they set limits in a "cold" rational state',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Notification Management',
        scenario: 'When designing notification preferences and do-not-disturb features',
        example:
          'Default to bundled notification delivery rather than real-time, reducing the number of temptation triggers users must resist',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Distraction-Blocking Features',
        scenario: 'When building focus mode or distraction-free interfaces',
        example:
          'Offer commitment-based focus modes that cannot be instantly overridden, since users will overestimate their ability to stay focused with easy exit available',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Consumption Limits',
        scenario: 'When helping users manage binge consumption of content',
        example:
          'Show "Are you still watching?" prompts with a brief pause before playback resumes, creating a decision point rather than passive continuation',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Gambling and High-Risk Interactions',
        scenario: 'When users engage with gambling, trading, or other high-risk financial products',
        example:
          'Offer self-exclusion tools with mandatory waiting periods for re-entry, recognizing users will want to override limits when tempted',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine User Autonomy',
        reason:
          'Over-paternalistic controls can frustrate users who genuinely need unrestricted access',
        consequence:
          'Users feel infantilized and abandon the product for alternatives without guardrails',
        alternative:
          'Make controls opt-in with clear explanations, respecting informed autonomy while making guardrails easily accessible',
      },
      {
        title: 'Emergency or Urgent Contexts',
        reason:
          'Blocking access or enforcing delays can be dangerous when immediate action is needed',
        consequence:
          'Users cannot reach critical information or complete urgent tasks',
        alternative:
          'Allow override paths for genuine emergencies with post-hoc review rather than preventive blocking',
      },
      {
        title: 'Professional Workflows',
        reason:
          'Usage limits designed for casual consumers can impede professional work',
        consequence:
          'Lost productivity and frustration for power users who need extended sessions',
        alternative:
          'Offer separate profiles or modes for professional use that adjust or disable consumer-oriented limits',
      },
      {
        title: 'Exploiting the Bias for Engagement',
        reason:
          'Designing products that rely on users overestimating their self-control is manipulative',
        consequence:
          'User harm through overconsumption, addiction patterns, and eroded trust',
        alternative:
          'Design for genuine user wellbeing; build features that help users achieve their actual goals',
      },
    ],

    commonMistakes: [
      {
        title: 'Easily Overridden Limits',
        description:
          'Making usage or spending limits trivially easy to dismiss or bypass',
        why: 'Users set limits when rational but will override them when tempted, which is exactly when limits matter most',
        fix: 'Add friction to override actions: confirmation dialogs, cooling-off periods, or requiring a secondary authentication step',
      },
      {
        title: 'Setting Controls Only at Setup',
        description:
          'Asking users to configure self-control settings only during onboarding',
        why: 'Users in a "cold" state set unrealistic limits they cannot maintain, or skip setup entirely',
        fix: 'Prompt periodic review of limits based on actual usage data, showing the gap between intended and actual behavior',
      },
      {
        title: 'Passive Warnings Without Intervention',
        description:
          'Showing informational alerts about usage but taking no action',
        why: 'Users acknowledge warnings and immediately dismiss them; information alone does not counteract in-the-moment impulses',
        fix: 'Pair warnings with active interventions: pause content, require a deliberate choice to continue, or introduce a brief delay',
      },
      {
        title: 'Blaming Users for Low Willpower',
        description:
          'Designing messaging that frames limit-breaking as a personal failure',
        why: 'Restraint bias is a universal cognitive limitation, not a character flaw; shaming increases disengagement with controls',
        fix: 'Use neutral, supportive language: "You have used your planned time. Would you like to continue or save it for later?"',
      },
      {
        title: 'Ignoring Variable Reward Loops',
        description:
          'Building self-control features without addressing the engagement mechanics that make them necessary',
        why: 'Usage limits fight against variable-reward dopamine loops; the limits will lose unless the underlying mechanics are also addressed',
        fix: 'Reduce variable reward intensity alongside adding controls: batch notifications, remove infinite scroll, show progress endpoints',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how easily users encounter temptation triggers and self-control tools',
        examples: [
          'Infinite scroll layouts eliminate natural stopping points, defeating self-regulation',
          'Prominent placement of usage dashboards increases self-awareness',
          'Endpoint indicators (page numbers, progress bars) create natural pause points',
          'Placing self-control settings in accessible locations rather than buried in menus',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text presentation affects how users perceive and engage with usage data and limits',
        examples: [
          'Clear, large typography for usage statistics makes consumption visible',
          'Gentle but unambiguous language in limit-reached states',
          'Readable timer displays that stay present during usage',
          'Accessible formatting for self-control settings and explanations',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals can reinforce or undermine self-control awareness',
        examples: [
          'Gradual color shifts (green to amber to red) as usage approaches limits',
          'Calming palettes in wind-down or break states to reduce re-engagement urge',
          'Grayscale modes that reduce visual reward and make content less compelling',
          'Neutral tones for limit notifications to avoid anxiety while maintaining attention',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether self-control features are effective or merely performative',
        examples: [
          'Requiring active opt-in to continue past limits rather than passive dismissal',
          'Adding deliberate friction (multi-step confirmation) to override self-imposed limits',
          'Auto-pause rather than auto-play as default behavior',
          'Commitment devices that lock in choices made during rational "cold" states',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing affects whether users engage realistically with their self-control limitations',
        examples: [
          'Showing actual vs intended usage data to close the perception gap',
          'Framing break reminders around benefits ("You have been focused for 2 hours") rather than restrictions',
          'Providing context on typical usage patterns so users calibrate expectations',
          'Using empathetic, non-judgmental language for limit notifications',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Self-control tools must be equally accessible and effective for all users',
        examples: [
          'Screen reader announcements for usage warnings and limit states',
          'Keyboard-accessible controls for all self-regulation features',
          'Haptic or audio feedback for usage milestones on mobile devices',
          'Ensuring color-based usage indicators have non-color alternatives',
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
        title: 'Screen Time Dashboard with Active Intervention',
        description:
          'Mobile OS showing usage data with automatic intervention when limits are reached',
        code: `<div class="screen-time-dashboard">
  <h3>Today's Screen Time</h3>
  <div class="usage-ring" role="progressbar" aria-valuenow="85" aria-valuemax="100">
    <span class="time-used">3h 24m</span>
    <span class="time-limit">of 4h limit</span>
  </div>

  <div class="app-breakdown">
    <div class="app-usage warning">
      <span class="app-name">Social Media</span>
      <div class="usage-bar" style="width: 90%"></div>
      <span class="time">1h 48m / 2h limit</span>
      <span class="status">12 min remaining</span>
    </div>
  </div>

  <div class="limit-reached-overlay" hidden>
    <h3>You've reached your Social Media limit</h3>
    <p>You planned to spend 2 hours today. You've used 2h 01m.</p>
    <button class="primary">OK, I'll stop</button>
    <button class="secondary" disabled data-enable-after="60">
      Allow 15 more minutes (available in 60s)
    </button>
  </div>
</div>`,
        explanation:
          'The dashboard makes usage visible and the limit overlay requires an active choice. The delayed override button adds friction that accounts for the gap between perceived and actual self-control. Users must wait before extending, creating a decision point rather than an impulse action.',
        principle:
          'Effective self-control features add friction to override actions, not to compliance',
        metrics: {
          before: '23% of users stayed within self-set limits with instant dismiss',
          after: '61% of users stayed within limits with delayed override',
          improvement: '165% increase in limit adherence with friction-based intervention',
        },
      },
      {
        title: 'Spending Limit with Cooling-Off Period',
        description:
          'E-commerce or in-app purchase system with user-set spending limits and override friction',
        code: `<div class="spending-limit-modal">
  <h3>Monthly Spending Limit Reached</h3>
  <div class="spending-summary">
    <div class="stat">
      <span class="label">Your limit</span>
      <span class="value">$50.00</span>
    </div>
    <div class="stat">
      <span class="label">Spent this month</span>
      <span class="value warning">$48.75</span>
    </div>
    <div class="stat">
      <span class="label">This purchase</span>
      <span class="value">$12.99</span>
    </div>
  </div>

  <p class="context">You set this limit on March 1st.
  Most users who override their limits report regretting it within 24 hours.</p>

  <div class="actions">
    <button class="primary">Not now, thanks</button>
    <button class="secondary">Increase limit (24h wait)</button>
  </div>
</div>`,
        explanation:
          'The spending limit requires a 24-hour cooling-off period to increase, preventing impulsive overrides. The regret statistic helps users anticipate their future feelings, countering the hot-cold empathy gap.',
        principle:
          'Cooling-off periods bridge the gap between impulsive desire and rational preference',
      },
      {
        title: 'Content Binge Prevention with Progress Endpoint',
        description:
          'Streaming service with active check-in and visible progress',
        code: `<div class="binge-check" role="dialog" aria-label="Continue watching?">
  <div class="session-info">
    <p class="duration">You've been watching for 2 hours</p>
    <div class="progress-context">
      <span>Episode 4 of 8</span>
      <div class="progress-bar" style="width: 50%"></div>
    </div>
  </div>

  <h3>Still watching?</h3>
  <p>Taking breaks helps you enjoy the show more.</p>

  <div class="actions">
    <button class="primary">Take a break</button>
    <button class="secondary">Watch one more episode</button>
    <button class="tertiary">Set a reminder for tomorrow</button>
  </div>
</div>`,
        explanation:
          'The check-in shows session duration and series progress, making consumption visible. Offering a reminder for tomorrow provides a positive alternative to stopping cold, and framing breaks as enhancing enjoyment reframes the intervention positively.',
        principle:
          'Visible progress and positive framing make self-regulation feel rewarding rather than restrictive',
      },
    ],

    bad: [
      {
        title: 'Instantly Dismissible Usage Warning',
        description:
          'Screen time notification that can be swiped away without friction',
        code: `<!-- DON'T DO THIS -->
<div class="usage-toast" data-auto-dismiss="3s">
  <p>You've used Instagram for 2 hours today</p>
  <button class="dismiss">OK</button>
</div>`,
        explanation:
          'A toast notification that auto-dismisses after 3 seconds provides zero effective intervention. Users tap "OK" reflexively without engaging with the information. This gives the illusion of a self-control feature while being functionally useless.',
        principle: 'Frictionless warnings are performative, not protective',
      },
      {
        title: 'Exploiting Overconfidence in Self-Control',
        description:
          'Social media app encouraging unlimited engagement with a token "you control your experience" message',
        code: `<!-- DON'T DO THIS -->
<div class="welcome-back">
  <h2>Welcome back! You're in control.</h2>
  <p>Set your own limits anytime in settings.</p>
  <div class="feed" data-infinite-scroll="true">
    <!-- Variable-reward infinite scroll feed -->
  </div>
</div>
<footer class="settings-link" style="color: #ccc; font-size: 0.7rem;">
  <a href="/settings/time">Manage screen time</a>
</footer>`,
        explanation:
          'Telling users they are "in control" while presenting an infinite scroll feed with variable rewards exploits restraint bias directly. The self-control settings are buried, while the engagement mechanics are maximized. This deliberately leverages the gap between perceived and actual self-control.',
        principle: 'Never exploit overconfidence in self-control for engagement metrics',
      },
      {
        title: 'Spending Limit with Instant Override',
        description:
          'Budget feature that lets users bypass their own limits with a single tap',
        code: `<!-- DON'T DO THIS -->
<div class="budget-alert">
  <p>You've hit your $50 budget this month.</p>
  <button class="primary">Keep Shopping</button>
  <button class="secondary">View Budget</button>
</div>`,
        explanation:
          'The primary action is "Keep Shopping," which actively encourages override. The budget feature exists only to satisfy a corporate responsibility checkbox while being designed to fail. No cooling-off period, no context, no friction.',
        principle: 'Self-control features must be designed to succeed, not to be bypassed',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iOS Screen Time',
        url: 'https://support.apple.com/en-us/108806',
        description:
          'Apple Screen Time lets users set daily app limits with usage reports. When limits are reached, apps are grayed out with an option to extend. However, the "Ignore Limit" option is easily accessible, which undermines effectiveness for many users.',
        effectiveness: 'effective',
        analysis:
          'Pioneering implementation that raised awareness of digital wellbeing. The usage dashboard is excellent, but the single-tap "Ignore Limit" option underestimates restraint bias. More friction on the override would significantly improve outcomes.',
      },
      {
        company: 'YouTube',
        product: 'Take a Break Reminders',
        url: 'https://support.google.com/youtube/answer/9012523',
        description:
          'YouTube allows users to set reminders that pause video playback after a chosen interval. The reminder pauses the video and requires active dismissal before playback resumes.',
        effectiveness: 'effective',
        analysis:
          'Good use of active interruption rather than passive notification. Pausing playback creates a genuine decision point. Could be improved by showing cumulative session data and making the interval recommendation smarter based on usage patterns.',
      },
      {
        company: 'GamStop',
        product: 'Gambling Self-Exclusion',
        url: 'https://www.gamstop.co.uk/',
        description:
          'GamStop is a UK self-exclusion scheme that blocks users from all licensed online gambling sites for a chosen period (6 months, 1 year, or 5 years). Once activated, it cannot be reversed until the period expires.',
        effectiveness: 'very-effective',
        analysis:
          'One of the strongest implementations of restraint bias countermeasures. The irrevocable commitment period directly addresses the fact that users will want to override their limits when tempted. The mandatory waiting period for re-entry prevents impulsive reversal.',
      },
      {
        company: 'Instagram',
        product: 'Daily Time Limit',
        url: 'https://about.instagram.com/features/screen-time-management',
        description:
          'Instagram offers a daily time limit feature that shows a notification when the limit is reached. Users can dismiss the notification and continue using the app immediately.',
        effectiveness: 'somewhat-effective',
        analysis:
          'The feature exists but is designed to be easily overridden, which fails to account for restraint bias. The single-tap dismissal means the feature is most likely to fail exactly when it is most needed: when users are deeply engaged and their self-control is lowest.',
      },
      {
        company: 'Netflix',
        product: 'Are You Still Watching?',
        description:
          'Netflix pauses playback after several consecutive episodes and asks "Are you still watching?" requiring a button press to continue.',
        effectiveness: 'effective',
        analysis:
          'Creates a natural stopping point in an otherwise frictionless consumption experience. The pause forces a conscious decision to continue, countering the tendency to passively consume beyond intended limits. Originally implemented to save bandwidth, it serves as an effective restraint bias intervention.',
      },
    ],

    abTests: [
      {
        title: 'Usage Limit Override: Instant vs Delayed',
        hypothesis:
          'Adding a 60-second delay before allowing limit override will increase adherence to self-set limits',
        controlVersion: {
          description:
            'Screen time limit reached with instant "Ignore for 15 minutes" button',
          metrics: {
            conversionRate: '77%',
            timeOnPage: '0:02',
          },
        },
        treatmentVersion: {
          description:
            'Screen time limit reached with 60-second countdown before "Extend 15 minutes" becomes available, plus usage context showing weekly trend',
          metrics: {
            conversionRate: '39%',
            timeOnPage: '0:47',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The delayed override reduced limit-breaking by 49%. The 60-second wait allowed the initial impulse to subside, and many users chose to stop during the wait. Usage context helped users recognize patterns in their behavior.',
          learnings: [
            'Even brief delays significantly reduce impulsive override of self-set limits',
            'Users who saw their weekly usage trend were 2x more likely to stop',
            'The delay allows the "hot" impulsive state to cool, restoring rational decision-making',
            'Most users who waited the full 60 seconds still chose to stop rather than extend',
          ],
        },
      },
      {
        title: 'Spending Limit: Self-Set vs Guided Recommendation',
        hypothesis:
          'Users who receive data-informed limit recommendations will set more realistic limits and adhere better than those who self-set without guidance',
        controlVersion: {
          description:
            'Open-ended "Set your monthly spending limit" input with no guidance',
          metrics: {
            conversionRate: '34%',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Guided limit setting showing: "Users like you typically spend $X/month. We recommend a limit of $Y." with adjustable slider anchored to the recommendation',
          metrics: {
            conversionRate: '58%',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Guided recommendations increased limit-setting adoption by 71%. Users with guided limits set more realistic amounts and were 40% more likely to stay within them over 30 days. Self-set limits were typically 2-3x higher than actual spending, reflecting restraint bias overconfidence.',
          learnings: [
            'Users dramatically overestimate their self-control when setting limits without guidance',
            'Data-informed recommendations anchor users to realistic expectations',
            'Showing peer comparison data reduces overconfidence in self-restraint',
            'Guided limits had 40% better adherence over 30 days compared to self-set limits',
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
        name: 'Infinite Scroll Without Endpoints',
        description:
          'Content feeds that load continuously without natural stopping points or progress indicators',
        howToSpot:
          'Look for feeds that never end, lack page numbers, and provide no sense of completion or progress',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Auto-Play Mechanics',
        description:
          'Content that automatically advances to the next item without user action',
        howToSpot:
          'Check for auto-play video, auto-advance stories, or countdown timers to next episode',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Buried Self-Control Settings',
        description:
          'Usage management features hidden deep in settings menus rather than surfaced prominently',
        howToSpot:
          'Navigate to screen time, usage limit, or notification settings and count the number of taps or clicks required',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Frictionless Override Buttons',
        description:
          'Self-set limits that can be bypassed with a single tap and no delay',
        howToSpot:
          'Trigger a usage limit and observe whether the override requires any friction (delay, confirmation, re-authentication)',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Usage Visibility',
        description:
          'Absence of time-spent, money-spent, or consumption metrics visible during use',
        howToSpot:
          'Check whether session duration, spending totals, or consumption counts are visible during active use',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Engagement Maximization Without Guardrails',
        description: 'Product designed for maximum time-on-site with no self-regulation tools',
        indicators: [
          'Infinite scroll with variable-reward content',
          'No usage timer or session awareness features',
          'Auto-play enabled by default',
          'No limit-setting or break-reminder features',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Performative Self-Control Pattern',
        description: 'Self-regulation features that exist but are designed to be ineffective',
        indicators: [
          'Usage limits with instant single-tap override',
          'Spending caps that can be raised without any delay',
          'Break reminders that auto-dismiss',
          'Settings buried 4+ levels deep in navigation',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Effective Commitment Device Pattern',
        description: 'Self-control features designed with genuine friction and commitment mechanics',
        indicators: [
          'Cooling-off periods before limit overrides',
          'Irrevocable commitments for set periods',
          'Usage data shown alongside limit controls',
          'Progressive friction (easy to set, hard to undo)',
        ],
        severity: ImpactLevel.LOW,
        confidence: 'high',
      },
      {
        name: 'Cold-State Setting Pattern',
        description: 'Self-control configured only during calm, rational moments without ongoing adjustment',
        indicators: [
          'Onboarding-only limit configuration',
          'No periodic review prompts based on actual usage',
          'No gap analysis between intended and actual behavior',
          'Static limits that do not adapt to usage patterns',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the product have natural stopping points or does content flow infinitely?',
      'Can users set usage or spending limits, and how accessible are these controls?',
      'How much friction exists when users try to override their own self-set limits?',
      'Is session duration or consumption data visible during active use?',
      'Does auto-play or auto-advance require opt-in or opt-out?',
      'Are self-control features designed to succeed or merely to exist?',
      'Is there a cooling-off period before limit overrides take effect?',
      'Does the product show users the gap between their intended and actual usage?',
      'Are break reminders active interventions (pausing content) or passive notifications?',
      'Does the design exploit users\' overconfidence in their self-control for engagement?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in restraint bias and digital wellbeing.

Analyze the provided design for restraint bias patterns. Identify:

1. **Self-Control Features**: Usage limits, spending caps, break reminders, and their effectiveness
2. **Override Friction**: How easy or difficult it is to bypass self-set limits
3. **Engagement Mechanics**: Auto-play, infinite scroll, variable rewards that exploit overconfidence in self-control
4. **Usage Visibility**: Whether consumption data (time, money, quantity) is visible during use
5. **Commitment Devices**: Features that lock in rational choices made in "cold" states

For each pattern found:
- Assess whether self-control features are genuinely effective or performative
- Evaluate the friction level for overriding self-set limits
- Determine if engagement mechanics exploit restraint bias
- Check whether usage data helps users calibrate their self-control expectations
- Evaluate ethical implications of the design's relationship to user self-control

Consider:
- Are users likely to overestimate their ability to self-regulate with this product?
- Do self-control features account for the hot-cold empathy gap?
- Is the product designed to help users achieve their stated goals or to maximize engagement?
- Are there commitment mechanisms that bridge the gap between intention and behavior?
- How does the design handle the moment when a user tries to override their own limits?

Provide actionable recommendations for ethical, effective self-control design.`,

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
              selfControlEffectiveness: { type: 'string' },
              overrideFriction: { type: 'string' },
              exploitsOverconfidence: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'selfControlEffectiveness',
              'overrideFriction',
              'exploitsOverconfidence',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            selfControlSupport: { type: 'number' },
            overrideFriction: { type: 'number' },
            usageVisibility: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'selfControlSupport',
            'overrideFriction',
            'usageVisibility',
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
          'Map where in the user journey people are most likely to overestimate their self-control',
        example:
          'Users believe they can scroll social media for "just 5 minutes" but average 28 minutes per session',
        tips: [
          'Analyze session length data vs user-reported intended usage',
          'Identify where auto-play, infinite scroll, or variable rewards are strongest',
          'Survey users about their perceived vs actual usage patterns',
        ],
      },
      {
        step: 2,
        title: 'Design Commitment Devices',
        description:
          'Create mechanisms that let users bind their future behavior during rational moments',
        example:
          'Let users set a daily app limit of 30 minutes that requires a 24-hour wait to increase',
        tips: [
          'Make limits easy to set but hard to override',
          'Offer graduated commitment levels (gentle reminder, hard stop, locked out)',
          'Allow users to choose their own friction level',
        ],
      },
      {
        step: 3,
        title: 'Add Override Friction',
        description:
          'When users hit their self-set limits, require deliberate effort to continue',
        example:
          'Show a 60-second countdown and usage context before allowing a limit extension',
        tips: [
          'Delays as short as 30-60 seconds are effective',
          'Show usage data during the wait to reinforce rational thinking',
          'Never make the override the primary or default action',
        ],
      },
      {
        step: 4,
        title: 'Make Consumption Visible',
        description:
          'Surface usage data during active sessions so users can self-calibrate',
        example:
          'Show a subtle but persistent timer: "You have been browsing for 45 minutes"',
        tips: [
          'Keep usage indicators unobtrusive but visible',
          'Show trend data (today vs average) for context',
          'Use color coding to indicate proximity to self-set limits',
        ],
      },
      {
        step: 5,
        title: 'Create Natural Stopping Points',
        description:
          'Build breaks and endpoints into consumption flows',
        example:
          'After every 3 episodes, show a summary screen with "Continue tomorrow?" option',
        tips: [
          'Replace infinite scroll with paginated or chunked content',
          'Default to manual advance rather than auto-play',
          'Celebrate completion of natural units (episodes, chapters, sessions)',
        ],
      },
      {
        step: 6,
        title: 'Close the Perception Gap',
        description:
          'Regularly show users the difference between their intended and actual behavior',
        example:
          'Weekly report: "You planned to use social media 1hr/day. Your average was 2hr 37min."',
        tips: [
          'Present data without judgment or shame',
          'Offer actionable suggestions based on the gap',
          'Let users adjust limits based on realistic expectations',
        ],
      },
    ],

    dos: [
      'Design self-control features with genuine friction for overrides',
      'Show usage data during active sessions to maintain awareness',
      'Offer commitment devices that bind future behavior during rational states',
      'Create natural stopping points in consumption flows',
      'Use cooling-off periods before allowing limit increases',
      'Show the gap between intended and actual usage without judgment',
      'Default to protective settings (opt-out of auto-play, notifications bundled)',
      'Let users choose their commitment level (gentle, moderate, strict)',
      'Test self-control features under temptation conditions, not just during setup',
      'Design override paths that are deliberate, not impulsive',
    ],

    donts: [
      'Don\'t design self-control features that are trivially easy to bypass',
      'Don\'t exploit users\' overconfidence in their self-control for engagement',
      'Don\'t use infinite scroll with variable rewards and no stopping points',
      'Don\'t default to auto-play or auto-advance without user opt-in',
      'Don\'t bury usage management settings deep in menus',
      'Don\'t shame users for exceeding limits; use neutral supportive language',
      'Don\'t treat self-control features as a checkbox; design them to work',
      'Don\'t show usage warnings that auto-dismiss without requiring action',
      'Don\'t make "continue" the primary action when limits are reached',
      'Don\'t ignore the hot-cold empathy gap when designing limit-setting flows',
    ],

    bestPractices: [
      {
        title: 'Asymmetric Friction',
        description:
          'Make it easy to set limits but hard to override them; easy to reduce engagement but hard to increase it',
        rationale:
          'Users set limits during rational "cold" states but override them during impulsive "hot" states; friction should protect the rational choice',
        example:
          'One tap to set a 1-hour daily limit, but 24-hour wait + confirmation to increase it',
      },
      {
        title: 'Progressive Intervention',
        description:
          'Escalate intervention intensity as usage approaches and exceeds limits',
        rationale:
          'Gentle reminders work for some users; others need stronger intervention to counteract in-the-moment impulses',
        example:
          'At 80%: subtle indicator. At 100%: pause + message. At override: delay + usage context. At 150%: require PIN entry',
      },
      {
        title: 'Peer-Calibrated Limits',
        description:
          'Show users how their usage compares to similar users when setting limits',
        rationale:
          'Users overestimate their self-control; seeing peer data helps calibrate realistic expectations',
        example:
          '"Users in your age group typically spend 45 min/day. You currently average 2h 10m."',
      },
      {
        title: 'Positive Framing for Breaks',
        description:
          'Frame stopping as a positive action rather than a restriction',
        rationale:
          'Restriction framing triggers reactance; benefit framing encourages voluntary compliance',
        example:
          '"Great session! Taking a break now will help you enjoy it more next time" instead of "You have exceeded your limit"',
      },
      {
        title: 'Irrevocable Commitment Option',
        description:
          'Offer a strict mode that cannot be undone for a chosen period',
        rationale:
          'For users who recognize their restraint bias, an irrevocable option provides the strongest protection',
        example:
          'GamStop-style self-exclusion: block access for 6 months with no override possible',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Usage data and limit states must be semantically conveyed',
        implementation:
          'Use ARIA roles, progress bars, and live regions to announce usage milestones and limit states to screen reader users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to indicate usage levels or limit states',
        implementation:
          'Combine color indicators (green/amber/red) with text labels, icons, and semantic HTML to convey usage status',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Users must be able to adjust or disable time-based interactions',
        implementation:
          'Ensure countdown timers for override delays are accessible and allow users with motor disabilities adequate time to interact',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Usage warnings and limit notifications must be announced to assistive technology',
        implementation:
          'Use aria-live regions for usage warnings so screen reader users receive the same self-control support as sighted users',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Overconfidence for Engagement',
        severity: 'critical',
        explanation:
          'Designing products that maximize engagement while knowing users overestimate their ability to self-regulate consumption',
        mitigation:
          'Build genuine self-control features with real friction. Align business metrics with user wellbeing, not just time-on-site.',
      },
      {
        concern: 'Performative Self-Control Features',
        severity: 'high',
        explanation:
          'Implementing usage limits that are trivially easy to bypass, creating an illusion of user empowerment without actual protection',
        mitigation:
          'Test self-control features under temptation conditions. Measure actual adherence rates, not just feature adoption.',
      },
      {
        concern: 'Targeting Vulnerable Populations',
        severity: 'critical',
        explanation:
          'Children, people with addiction tendencies, and those with impulse control disorders are disproportionately affected by restraint bias exploitation',
        mitigation:
          'Implement stronger default protections for vulnerable users. Enable parental controls. Partner with addiction specialists for high-risk product categories.',
      },
      {
        concern: 'Dark Pattern: Asymmetric Friction Favoring Engagement',
        severity: 'high',
        explanation:
          'Making it frictionless to continue consuming but requiring multiple steps to set limits or take breaks',
        mitigation:
          'Reverse the asymmetry: make it frictionless to set limits and take breaks, and require deliberate action to continue past limits.',
      },
      {
        concern: 'Paternalism vs Autonomy',
        severity: 'medium',
        explanation:
          'Overly aggressive self-control features can restrict legitimate user autonomy and feel condescending',
        mitigation:
          'Offer graduated commitment levels. Let users choose their protection intensity. Always explain why features exist and let informed users opt out.',
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
          'The foundational paper demonstrating that overconfidence in self-control leads to greater temptation exposure and increased impulsive behavior',
        type: 'foundational',
      },
      {
        title: 'The Devil You Know: The Effect of Contact on Self-Control',
        author: 'Nordgren, L. F., van der Pligt, J., & van Harreveld, F.',
        year: 2007,
        description:
          'Earlier work exploring how exposure to temptation affects self-control outcomes, a precursor to the restraint bias research',
        type: 'foundational',
      },
      {
        title: 'The Hot/Cold Empathy Gap and the Prediction of Self-Control',
        author: 'Loewenstein, G.',
        year: 2005,
        description:
          'Explores the systematic failure to predict one\'s own behavior under visceral influence, a key mechanism underlying restraint bias',
        type: 'advanced',
      },
      {
        title: 'Digital Wellbeing and Persuasive System Design',
        author: 'Lyngs, U., et al.',
        year: 2019,
        description:
          'Examination of how digital products interact with self-control limitations and strategies for ethical design',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Willpower: Rediscovering the Greatest Human Strength',
        author: 'Baumeister, Roy F., & Tierney, John',
        year: 2011,
        isbn: '9780143122234',
        description:
          'Comprehensive overview of self-control research including the limits of willpower and implications for design',
        type: 'foundational',
      },
      {
        title: 'Irresistible: The Rise of Addictive Technology and the Business of Keeping Us Hooked',
        author: 'Alter, Adam',
        year: 2017,
        isbn: '9780735222847',
        description:
          'Explores how technology exploits self-control weaknesses and the restraint bias in particular',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'The engagement design model that restraint bias countermeasures must contend with',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Digital Wellbeing Tools Are Mostly Ineffective, Study Finds',
        author: 'Lyngs, U., et al.',
        url: 'https://dl.acm.org/doi/10.1145/3313831.3376672',
        description:
          'Research showing that most screen time tools fail because they do not account for restraint bias and the hot-cold empathy gap',
        type: 'practical',
      },
      {
        title: 'Designing for Digital Wellbeing',
        author: 'Google Design',
        url: 'https://design.google/library/designing-for-digital-wellbeing',
        description:
          'Google\'s framework for building products that support user self-regulation',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We Can\'t Resist Temptation',
        author: 'Nordgren, Loran',
        url: 'https://www.youtube.com/watch?v=OdWZvwEMCRY',
        description:
          'Talk by the researcher who discovered restraint bias, explaining the core mechanism and implications',
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
      'present-bias',          // Preferring immediate gratification amplifies restraint bias
      'optimism-bias',         // General overconfidence feeds into self-control overestimation
      'planning-fallacy',      // Unrealistic plans parallel unrealistic self-control expectations
      'hot-cold-empathy-gap',  // The mechanism underlying restraint bias
      'hyperbolic-discounting', // Discounting future consequences during temptation
    ],

    conflicts: [
      'loss-aversion',         // Fear of losing progress can motivate self-control
      'status-quo-bias',       // Default settings can support or undermine self-regulation
    ],

    confusedWith: [
      'optimism-bias',         // Both involve overconfidence but in different domains
      'dunning-kruger-effect', // Overestimation of ability, but for skills rather than self-control
      'planning-fallacy',      // Similar overconfidence but about time estimation rather than impulse control
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'hot-cold-empathy-gap',
        'impulse-overconfidence',
      ],
    },
  },
};
