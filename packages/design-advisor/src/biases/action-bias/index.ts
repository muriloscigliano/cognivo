/**
 * ACTION BIAS
 *
 * We prefer action over inaction even when inaction is better
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const actionBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'action-bias',
    name: 'Action Bias',
    aliases: ['Action Bias', 'Doing Something Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'action',
      'inaction',
      'decision-making',
      'control-illusion',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We prefer action over inaction even when inaction is better',

    detailed: `Action bias is the human tendency to favor doing something over doing nothing, even when taking action produces a worse outcome. When faced with uncertainty or pressure, people feel compelled to act because inaction feels passive, irresponsible, or psychologically uncomfortable—even when standing still is the optimal strategy.

This bias is driven by the deep-seated belief that effort equals progress. Doing nothing feels like giving up or losing control, while doing something—anything—provides a sense of agency and the illusion of control. In many social and professional contexts, being seen as "doing something" is rewarded more than thoughtful inaction, reinforcing the pattern.

In UX and product design, action bias manifests as over-featured dashboards, excessive notification systems, gamified engagement loops, and interfaces that pressure users into constant activity. Understanding this bias is critical for designing calm technology that supports deliberate, meaningful action rather than anxious, compulsive clicking.`,

    psychologyBasis: {
      discoveredBy: 'Patt & Zeckhauser',
      year: 2000,
      theory: 'Action Bias Theory',
      mechanism: `The brain defaults to action because inaction feels psychologically threatening. This happens because:

1. **Regret Asymmetry**: People anticipate more regret from inaction than from action—"at least I tried" feels better than "I did nothing"
2. **Illusion of Control**: Taking action provides a sense of agency, even when the outcome is random or predetermined
3. **Social Accountability**: Others judge inaction more harshly than failed action—"Why didn't you do something?" is a common criticism
4. **Effort Justification**: People equate effort with value, so doing more feels inherently productive
5. **Loss Aversion Overlap**: The fear of losing something by not acting outweighs the rational assessment that action may cause harm

The mechanism is automatic—under pressure or uncertainty, the brain's default is to move, act, intervene, even when analysis would suggest waiting.`,
    },

    realWorldExample: `In a landmark study by Bar-Eli et al. (2007), researchers analyzed 286 penalty kicks in professional soccer. They found that goalkeepers dived left or right 94% of the time, even though staying in the center would have given them a 33.3% chance of saving the goal—higher than diving left (14.2%) or right (12.6%). Goalkeepers knew that staying still was statistically better, but the psychological cost of being seen doing nothing while a goal was scored was too high. Diving and missing felt more acceptable than standing still and missing.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Action bias profoundly affects how designers build interfaces and how users interact with them. Designers fall prey to it by adding unnecessary features, buttons, and engagement hooks. Users fall prey to it by clicking, swiping, and engaging compulsively even when doing nothing would serve them better. Designers can address this to:

- Reduce cognitive load by removing unnecessary action points from dashboards
- Design calm notification systems that surface only genuinely actionable information
- Create mindful action prompts that encourage deliberation before committing
- Build interfaces that reward thoughtful decision-making over raw activity
- Reduce feature bloat by questioning whether each interactive element earns its place`,

    whenToUse: [
      {
        title: 'Calm Dashboard Design',
        scenario:
          'When building monitoring dashboards or analytics views',
        example:
          'Show only actionable alerts with clear next steps, hiding stable metrics behind progressive disclosure',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Mindful Notification Systems',
        scenario: 'When designing notification and alert systems',
        example:
          'Batch non-urgent notifications into daily digests instead of pushing each one individually',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Deliberation Prompts',
        scenario: 'When users are about to take consequential or irreversible actions',
        example:
          'Show a brief pause screen: "You can also wait and decide later—here is what happens if you do nothing"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Prioritization',
        scenario: 'When deciding which interactive elements to include in an interface',
        example:
          'Audit action buttons per screen—if there are more than 3 primary actions, consolidate or remove low-value ones',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Engagement Ethics',
        scenario: 'When building gamification, streaks, or engagement loops',
        example:
          'Allow users to pause streaks or mute engagement nudges without penalty, respecting that inaction can be healthy',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine Emergencies',
        reason:
          'In true emergency contexts (fire, security breach, medical alert), immediate action is appropriate',
        consequence:
          'Slowing users down in genuine emergencies can cause real harm',
        alternative:
          'Reserve urgent, action-forcing UI patterns for genuine emergencies only—this preserves their effectiveness',
      },
      {
        title: 'Onboarding Activation',
        reason:
          'New users often need encouragement to take first actions that build familiarity',
        consequence:
          'Over-applying calm design during onboarding can lead to abandonment',
        alternative:
          'Use action-encouraging patterns during onboarding, then transition to calmer patterns as users gain proficiency',
      },
      {
        title: 'Time-Sensitive Opportunities',
        reason:
          'Some actions genuinely have deadlines (sale ending, event registration closing)',
        consequence:
          'Users may miss legitimate opportunities if the interface de-emphasizes timely action',
        alternative:
          'Clearly communicate real deadlines but avoid manufacturing false urgency',
      },
      {
        title: 'Safety-Critical Interventions',
        reason:
          'When user inaction leads to real danger (expired credentials, unpatched vulnerabilities)',
        consequence:
          'Reducing action pressure on safety flows can leave users exposed',
        alternative:
          'Use clear, honest urgency for safety-critical actions; distinguish them from engagement nudges',
      },
    ],

    commonMistakes: [
      {
        title: 'Button Overload',
        description:
          'Filling every screen with action buttons, CTAs, and interactive elements because "users need options"',
        why: 'Designers assume more actions = more empowerment, but it actually increases cognitive load and decision fatigue',
        fix: 'Audit action density per screen. Ask: "What is the ONE thing a user should do here?" Remove or demote everything else.',
      },
      {
        title: 'Notification Spam',
        description:
          'Sending push notifications, emails, and in-app alerts for every possible event',
        why: 'Teams assume more engagement touchpoints = more retention, but notification fatigue causes users to disable all notifications',
        fix: 'Implement notification tiers: critical (immediate), important (daily digest), informational (weekly summary). Let users control each.',
      },
      {
        title: 'Gamified Activity Pressure',
        description:
          'Using streaks, badges, and activity scores that punish users for not engaging daily',
        why: 'Gamification can exploit action bias, making users feel anxious about inaction rather than genuinely motivated',
        fix: 'Allow streak freezes, make badges optional, never penalize healthy breaks. Reward quality of engagement over quantity.',
      },
      {
        title: 'Dashboard Feature Creep',
        description:
          'Continuously adding widgets, charts, and controls to dashboards because stakeholders request them',
        why: 'Each new element adds action pressure—users feel they should be monitoring and acting on everything shown',
        fix: 'Implement progressive disclosure. Default view shows only actionable items. Detailed views available on demand.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines action density—how many clickable, interactive elements compete for attention',
        examples: [
          'Dense button grids create pressure to act on everything',
          'Whitespace and breathing room reduce action anxiety',
          'Progressive disclosure hides secondary actions behind intentional interaction',
          'Single-action-per-screen layouts promote deliberate decisions',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography signals urgency and action pressure through weight, size, and emphasis',
        examples: [
          'Bold, urgent CTAs ("ACT NOW!") amplify action bias',
          'Calm, neutral language ("Review when ready") counteracts it',
          'Exclamation marks and capitalization create false urgency',
          'Informational text that explains consequences of waiting reduces bias',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color creates urgency signals that pressure users into action',
        examples: [
          'Red notification badges trigger immediate action impulse',
          'Muted, neutral palettes for non-urgent information reduce action pressure',
          'Overuse of accent colors on every interactive element dilutes importance hierarchy',
          'Green/blue calm tones for informational states reduce compulsive clicking',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns either encourage compulsive action or support deliberate decision-making',
        examples: [
          'Pull-to-refresh enables compulsive checking behavior',
          'Infinite scroll rewards constant activity over intentional browsing',
          'Confirmation dialogs with "wait" option encourage deliberation',
          'Cooldown timers on consequential actions reduce impulsive decisions',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users feel compelled to act or empowered to wait',
        examples: [
          '"You have 5 unread messages" pressures action; "5 messages available when you are ready" does not',
          'Loss-framed CTAs ("Don\'t miss out!") exploit action bias',
          'Presenting the "do nothing" option explicitly normalizes deliberation',
          'Explaining consequences of both action and inaction enables informed choice',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must account for action pressure on users with cognitive disabilities or anxiety disorders',
        examples: [
          'Flashing notification indicators can cause anxiety in users with cognitive disabilities',
          'Screen reader users experience action pressure through urgent ARIA live regions',
          'Timed actions disproportionately affect users who need more processing time',
          'Clear "skip" or "dismiss" options reduce action pressure for all users',
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
        title: 'Quiet Dashboard with Actionable Highlights',
        description:
          'Analytics dashboard that surfaces only items requiring human attention',
        code: `<div class="dashboard-quiet">
  <header class="dashboard-header">
    <h2>System Overview</h2>
    <span class="status-badge calm">All Systems Normal</span>
  </header>

  <section class="attention-needed" aria-label="Items needing attention">
    <h3>1 Item Needs Your Attention</h3>
    <div class="action-card">
      <span class="severity medium">Medium</span>
      <p><strong>SSL certificate expires in 14 days</strong></p>
      <p class="context">Auto-renewal is configured. Review if you want to change providers.</p>
      <div class="actions">
        <button class="primary">Review Certificate</button>
        <button class="secondary">Dismiss — Auto-renew Will Handle It</button>
      </div>
    </div>
  </section>

  <details class="stable-metrics">
    <summary>View all metrics (12 stable, 0 degraded)</summary>
    <!-- Detailed metrics hidden by default -->
  </details>
</div>`,
        explanation:
          'Only one actionable item is surfaced. Stable metrics are hidden behind progressive disclosure. The dismiss option explicitly validates inaction ("Auto-renew Will Handle It"), reducing pressure to act on something that does not require intervention.',
        principle:
          'Surface only what requires human judgment; hide stable state behind progressive disclosure',
        metrics: {
          before: '47 widgets on dashboard, users spent 12 min/day checking, took action on 2% of items',
          after: '1-3 highlighted items, users spent 2 min/day, took action on 78% of items shown',
          improvement: '83% reduction in checking time, 39x improvement in action relevance',
        },
      },
      {
        title: 'Batched Notification Digest',
        description:
          'Communication tool that batches non-urgent notifications into a daily summary',
        code: `<div class="notification-digest">
  <h3>Your Daily Summary</h3>
  <p class="timestamp">Tuesday, March 18 — 9:00 AM</p>

  <div class="digest-section">
    <h4>Requires Your Response (2)</h4>
    <ul class="action-list">
      <li>
        <span class="avatar">JK</span>
        <p><strong>Jake</strong> requested your review on "Q1 Report"</p>
        <button class="compact-action">Review</button>
      </li>
      <li>
        <span class="avatar">MR</span>
        <p><strong>Maria</strong> asked a question in #design-system</p>
        <button class="compact-action">Reply</button>
      </li>
    </ul>
  </div>

  <div class="digest-section muted">
    <h4>For Your Awareness (14)</h4>
    <p class="summary">14 messages in 3 channels. Nothing requires your action.</p>
    <button class="text-link">Browse if interested</button>
  </div>
</div>`,
        explanation:
          'Notifications are batched into a daily digest, separating items that require response from informational items. The "Nothing requires your action" label explicitly validates not clicking through, reducing notification-driven action pressure.',
        principle:
          'Separate actionable from informational; explicitly validate that most items need no response',
      },
      {
        title: 'Mindful Trading Confirmation',
        description:
          'Investment platform that encourages deliberation before executing trades',
        code: `<dialog class="trade-confirmation">
  <h3>Review Your Trade</h3>
  <div class="trade-details">
    <p>Buy 50 shares of ACME Corp at ~$142.30</p>
    <p class="total">Estimated total: $7,115.00</p>
  </div>

  <div class="deliberation-prompt">
    <h4>Before you proceed:</h4>
    <ul>
      <li>Your portfolio is already 28% tech stocks</li>
      <li>ACME is up 12% today — consider whether this is reactive</li>
      <li>You have made 3 trades today (your monthly average is 2)</li>
    </ul>
  </div>

  <div class="actions">
    <button class="primary">Confirm Trade</button>
    <button class="secondary">Save to Watchlist Instead</button>
    <button class="text-link">Cancel</button>
  </div>

  <p class="reassurance">There is no penalty for waiting.
  This stock will still be available tomorrow.</p>
</dialog>`,
        explanation:
          'The confirmation dialog provides contextual information that helps users recognize reactive trading (action bias in finance). The watchlist alternative offers a middle path between full action and full inaction, and the reassurance text explicitly counters urgency pressure.',
        principle:
          'Provide context that reveals action bias, offer middle-ground alternatives, and normalize waiting',
        metrics: {
          before: '23% of trades were reversed within 24 hours (regret indicator)',
          after: '8% of trades reversed; 31% moved to watchlist first; user satisfaction +18%',
          improvement: '65% reduction in regretted trades',
        },
      },
    ],

    bad: [
      {
        title: 'Action-Overloaded Dashboard',
        description:
          'Dashboard crammed with buttons, widgets, and action items demanding constant attention',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard-overloaded">
  <div class="alert-bar">
    <span class="badge red">7 alerts</span>
    <span class="badge orange">12 warnings</span>
    <span class="badge blue">23 updates</span>
    <span class="badge green">5 opportunities</span>
  </div>

  <div class="widget-grid">
    <div class="widget">
      <h4>Revenue</h4>
      <button>Optimize</button>
      <button>Forecast</button>
      <button>Export</button>
    </div>
    <div class="widget">
      <h4>Users</h4>
      <button>Segment</button>
      <button>Engage</button>
      <button>Analyze</button>
    </div>
    <div class="widget">
      <h4>Performance</h4>
      <button>Tune</button>
      <button>Scale</button>
      <button>Monitor</button>
    </div>
  </div>

  <div class="action-bar">
    <button class="pulse">Take Action Now!</button>
  </div>
</div>`,
        explanation:
          'Every widget has multiple action buttons. 47 total interactive elements compete for attention. The pulsing "Take Action Now!" button creates artificial urgency. Users feel overwhelmed and anxious that they are missing something, leading to either compulsive clicking or complete disengagement.',
        principle:
          'More actions does not mean more empowerment—it means more cognitive load and action anxiety',
      },
      {
        title: 'Aggressive Notification Pressure',
        description:
          'App that sends constant notifications pressuring engagement',
        code: `<!-- DON'T DO THIS -->
<div class="notification-barrage">
  <div class="push-notification urgent">
    <p>You haven't opened the app in 2 hours!</p>
    <button>Open Now</button>
  </div>
  <div class="push-notification">
    <p>3 people posted since you last checked</p>
    <button>See What You're Missing</button>
  </div>
  <div class="push-notification">
    <p>Your streak is about to expire! 🔥</p>
    <button>Keep Your 47-Day Streak!</button>
  </div>
  <div class="push-notification">
    <p>Daily challenge available — don't fall behind!</p>
    <button>Start Challenge</button>
  </div>
</div>`,
        explanation:
          'Four notifications in rapid succession, each exploiting action bias with different pressure tactics: guilt ("haven\'t opened"), FOMO ("what you\'re missing"), loss aversion ("streak about to expire"), and competitive pressure ("don\'t fall behind"). This creates anxiety-driven engagement, not genuine value.',
        principle:
          'Notification pressure exploits action bias, creating compulsive engagement and eventual burnout',
      },
      {
        title: 'Gamified Activity Score That Punishes Rest',
        description:
          'Platform that uses an activity score to pressure constant engagement',
        code: `<!-- DON'T DO THIS -->
<div class="activity-dashboard">
  <div class="score-ring declining">
    <span class="score">62</span>
    <span class="label">Activity Score</span>
    <span class="trend negative">↓ Declining</span>
  </div>

  <p class="warning">Your activity score has dropped 15 points this week.
  Top performers maintain scores above 90.</p>

  <h4>Boost Your Score:</h4>
  <ul class="boost-actions">
    <li>Post an update (+5 pts)</li>
    <li>Comment on 3 posts (+3 pts)</li>
    <li>Share a resource (+4 pts)</li>
    <li>Complete daily check-in (+2 pts)</li>
  </ul>

  <button class="urgent">Boost Score Now</button>
</div>`,
        explanation:
          'The activity score creates a number that can only be maintained through constant action. The "declining" indicator and comparison to "top performers" create anxiety. The suggested actions are busywork—they exist to boost the score, not to create genuine value. This is action bias weaponized as a retention mechanism.',
        principle:
          'Gamified activity metrics weaponize action bias, rewarding busywork over meaningful contribution',
      },
    ],

    realWorld: [
      {
        company: 'Bar-Eli et al.',
        product: 'Soccer Goalkeeper Study',
        description: 'Research on 286 penalty kicks showed goalkeepers dive left or right 94% of the time, despite staying center having the highest save probability (33.3%). The psychological cost of inaction (standing still while a goal is scored) outweighs the statistical benefit.',
        effectiveness: 'very-effective',
        analysis: 'The foundational study demonstrating action bias. Goalkeepers know the statistics but cannot overcome the social and psychological pressure to "do something." This directly parallels how users and designers feel compelled to add features, click buttons, and engage with every notification.',
      },
      {
        company: 'Slack',
        product: 'Notification System',
        description: 'Slack\'s default notification settings push alerts for every message in every channel, creating constant action pressure. The red badge count and desktop notifications exploit action bias by making users feel they must respond to everything immediately. Many organizations report "Slack fatigue" as a result.',
        effectiveness: 'somewhat-effective',
        analysis: 'Effective for engagement metrics but harmful for productivity and wellbeing. Slack has gradually added notification controls (Do Not Disturb, channel muting, scheduled digests), acknowledging the problem. The tension between engagement metrics and user wellbeing is a textbook action bias trade-off.',
      },
      {
        company: 'Robinhood',
        product: 'Trading App',
        description: 'Robinhood\'s confetti animations on trades, push notifications about price movements, and one-tap trading interface encourage frequent trading. Research consistently shows that frequent trading (overtrading) reduces investor returns due to fees and emotional decision-making.',
        effectiveness: 'effective',
        analysis: 'Highly effective at driving engagement metrics (trades per user) but detrimental to user financial outcomes. The app exploits action bias by making trading feel fun, easy, and urgent, when the optimal strategy for most investors is to trade infrequently. Robinhood faced regulatory scrutiny partly due to these patterns.',
      },
      {
        company: 'Basecamp',
        product: 'Hey Email',
        description: 'Hey email was designed explicitly to counter action bias in email. It removes read receipts, batches notifications, separates "need to reply" from "FYI" messages, and defaults to calm—no badge counts, no push notifications. Users report reduced email anxiety.',
        effectiveness: 'very-effective',
        analysis: 'A deliberately anti-action-bias product. By removing urgency signals and separating actionable from informational email, Hey demonstrates that calm technology can be a competitive advantage. User retention is high despite lower engagement metrics, suggesting that reduced action pressure builds loyalty.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard Action Density: Full Controls vs Quiet Dashboard',
        hypothesis:
          'Reducing action density on dashboards will improve both user satisfaction and decision quality',
        controlVersion: {
          description:
            'Standard dashboard with 47 interactive widgets, action buttons on every card, and real-time alert badges',
          metrics: {
            conversionRate: '12% meaningful actions taken (of total clicks)',
            timeOnPage: '14:23 average session',
            scrollDepth: '89%',
          },
        },
        treatmentVersion: {
          description:
            'Quiet dashboard showing only 1-3 actionable items, stable metrics behind progressive disclosure, and batched non-urgent alerts',
          metrics: {
            conversionRate: '78% meaningful actions taken (of total clicks)',
            timeOnPage: '3:12 average session',
            scrollDepth: '45%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The quiet dashboard reduced total clicks by 82% but increased meaningful actions by 41%. Users reported significantly lower anxiety (NPS +32 points) and felt more confident in their decisions. Session time dropped 78% because users accomplished their goals faster.',
          learnings: [
            'Fewer actions led to better decisions, not worse ones',
            'Users explicitly praised the calm interface in feedback surveys',
            'Action-relevant metrics improved despite fewer total interactions',
            'Power users initially resisted but adopted after 2-week adjustment period',
          ],
        },
      },
      {
        title: 'Notification Frequency: Real-Time vs Daily Digest',
        hypothesis:
          'Batching notifications into a daily digest will reduce notification fatigue without reducing important engagement',
        controlVersion: {
          description:
            'Real-time push notifications for all channel activity, direct messages, and system updates (~35/day average)',
          metrics: {
            clickThroughRate: '8% of notifications clicked',
            conversionRate: '3% led to meaningful response',
          },
        },
        treatmentVersion: {
          description:
            'Critical notifications only in real-time (DMs, @mentions), everything else in a daily digest at 9 AM',
          metrics: {
            clickThroughRate: '34% of digest items viewed',
            conversionRate: '22% led to meaningful response',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Daily digest users responded to 7x more items meaningfully despite seeing fewer total notifications. Real-time users experienced notification blindness—they dismissed most alerts reflexively. Digest users reported 41% less workplace anxiety.',
          learnings: [
            'Notification volume has diminishing (and eventually negative) returns',
            'Batching preserved important engagement while eliminating anxiety-driven checking',
            'Users who switched to digest did not miss any critical information',
            'The key insight: most "urgent" notifications are not actually urgent',
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
        name: 'Action Button Density',
        description:
          'High concentration of buttons, CTAs, and interactive elements per screen',
        howToSpot:
          'Count the number of distinct action buttons visible without scrolling. More than 3-4 primary actions indicates action bias in the design.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Notification Badge Overload',
        description:
          'Multiple red badges, counters, and alert indicators competing for attention',
        howToSpot:
          'Look for red dot indicators, numeric badges, and exclamation marks. Count how many simultaneous urgency signals are visible.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Pulsing or Animated CTAs',
        description:
          'Buttons or elements that pulse, glow, or animate to demand immediate action',
        howToSpot:
          'Look for CSS animations, pulsing borders, or glowing effects on action elements that create urgency through motion.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Activity Scores and Streaks',
        description:
          'Gamified metrics that decline when users are inactive, pressuring constant engagement',
        howToSpot:
          'Look for declining indicators, streak counters with expiry warnings, or activity scores with "boost" actions.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing "Do Nothing" Options',
        description:
          'Dialogs and flows that only offer action options with no explicit "wait" or "skip" path',
        howToSpot:
          'Check confirmation dialogs and decision points for whether inaction is presented as a valid, non-negative option.',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Action Overload Pattern',
        description: 'Screens with excessive interactive elements that create decision fatigue and action pressure',
        indicators: ['More than 4 primary action buttons per screen', 'Every card or widget has its own action buttons', 'Multiple competing CTAs in the same viewport', 'No clear single primary action per view'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Engagement Pressure Pattern',
        description: 'Systems that create anxiety around inaction through notifications, streaks, and activity metrics',
        indicators: ['Streak counters with expiry warnings', 'Activity scores that decline over time', 'Push notifications triggered by user absence', '"You\'re falling behind" or "Don\'t miss out" language'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Inaction Path Pattern',
        description: 'Decision flows that present only action options, with no explicit path for deliberate inaction',
        indicators: ['Confirmation dialogs without "wait" or "decide later" options', 'Forced choices with no "skip" path', 'Onboarding flows that require immediate decisions', 'No "dismiss" or "not now" on non-critical prompts'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Real-Time Urgency Pattern',
        description: 'Interfaces that create artificial urgency through real-time updates and live counters',
        indicators: ['Live-updating counters or tickers', 'Real-time notification streams', '"X people are viewing this right now" indicators', 'Countdown timers on non-time-sensitive actions'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many distinct action buttons are visible on this screen without scrolling?',
      'Is there a clear single primary action, or are multiple actions competing for attention?',
      'Does this dialog present "wait" or "do nothing" as a valid, non-negative option?',
      'How many notifications does this system send per day? How many require actual user action?',
      'Are there gamified elements (streaks, scores, badges) that decline with inaction?',
      'Does the interface create urgency through animation, color, or language when no real urgency exists?',
      'Can users accomplish their goal with fewer clicks or interactions?',
      'Is this feature/button earning its place, or was it added because "users might want it"?',
      'Would a user be worse off if they did nothing right now? If not, why is the UI pressuring action?',
      'Are notification frequency and urgency signals proportional to actual importance?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in action bias and calm technology.

Analyze the provided design for action bias patterns. Identify:

1. **Action Density**: Number and prominence of interactive elements per screen
2. **Urgency Signals**: Notifications, badges, timers, and language creating pressure to act
3. **Inaction Paths**: Whether doing nothing is presented as a valid, non-negative option
4. **Engagement Pressure**: Gamification, streaks, or metrics that punish inaction
5. **Feature Bloat**: Interactive elements that exist "just in case" rather than serving clear user needs

For each pattern found:
- Identify the action pressure mechanism
- Assess whether the action is genuinely necessary or artificially pressured
- Determine if inaction is a valid option that the UI should support
- Evaluate whether the design serves user goals or engagement metrics
- Suggest improvements for calmer, more deliberate interaction design

Consider:
- Are users being pressured to act when waiting would serve them better?
- Does the notification frequency match the actual importance of events?
- Is the UI designing for meaningful engagement or compulsive engagement?
- Are there adequate "do nothing" and "decide later" paths?
- Does gamification reward quality or quantity of engagement?

Provide actionable recommendations for reducing unnecessary action pressure while preserving genuinely useful interactions.`,

    outputSchema: {
      type: 'object',
      properties: {
        actionBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              actionPressure: { type: 'string' },
              isActionNecessary: { type: 'boolean' },
              inactionPathExists: { type: 'boolean' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'actionPressure',
              'isActionNecessary',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            actionDensityScore: { type: 'number' },
            urgencyProportionality: { type: 'number' },
            inactionSupportScore: { type: 'number' },
            calmTechnologyScore: { type: 'number' },
          },
          required: [
            'actionDensityScore',
            'urgencyProportionality',
            'inactionSupportScore',
            'calmTechnologyScore',
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
        'actionBiasPatterns',
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
        title: 'Audit Action Density',
        description:
          'Count every interactive element (buttons, links, toggles, inputs) on each screen and classify them as essential, useful, or optional',
        example:
          'Dashboard audit reveals 47 action elements. 3 are essential (respond to alerts), 8 are useful (view details), 36 are optional (export, customize, share variants).',
        tips: [
          'Screenshot each screen and circle every clickable element',
          'Classify each as: essential (user needs this NOW), useful (user may need this), or optional (nice to have)',
          'Target: no more than 3-4 primary actions visible at any time',
        ],
      },
      {
        step: 2,
        title: 'Design for Progressive Disclosure',
        description:
          'Move non-essential actions behind intentional interaction layers (menus, expandable sections, detail views)',
        example:
          'Dashboard default shows only 3 actionable alerts. "View all metrics" expander reveals detailed widgets. Per-widget actions in contextual menus.',
        tips: [
          'Default state shows only what requires immediate human judgment',
          'Secondary actions available through hover menus or expandable sections',
          'Advanced actions in dedicated detail views',
        ],
      },
      {
        step: 3,
        title: 'Implement Notification Tiers',
        description:
          'Classify all notifications by genuine urgency and deliver them through appropriate channels',
        example:
          'Critical (security breach): immediate push. Important (team @mention): batched hourly. Informational (someone posted): daily digest.',
        tips: [
          'Audit every notification type: how many are truly time-sensitive?',
          'Default to the calmest delivery method; let users escalate if needed',
          'Never use urgent delivery for engagement-driven notifications',
        ],
      },
      {
        step: 4,
        title: 'Add Explicit Inaction Paths',
        description:
          'For every decision point, present "do nothing" or "decide later" as a valid, non-stigmatized option',
        example:
          'Trade confirmation includes "Save to watchlist instead" and "There is no penalty for waiting"',
        tips: [
          'Frame inaction positively: "Decide when you are ready" not "Skip"',
          'Provide context for what happens if the user does nothing',
          'Never use guilt or loss language for inaction options',
        ],
      },
      {
        step: 5,
        title: 'Test for Calm Technology Principles',
        description:
          'Measure whether your interface supports deliberate engagement rather than compulsive engagement',
        example:
          'Survey users: "Do you feel pressured to check this app?" "Do you feel anxious when you haven\'t opened it?" Scores above 3/5 indicate action bias in the design.',
        tips: [
          'Track meaningful actions vs total interactions (ratio should increase)',
          'Monitor user-reported anxiety and pressure metrics',
          'Measure regret indicators (undo, reverse, cancel within 24 hours)',
        ],
      },
    ],

    dos: [
      'Design for deliberate action—make the primary action clear and singular',
      'Batch non-urgent notifications into digests to reduce action pressure',
      'Present "do nothing" and "decide later" as valid, positive options',
      'Use progressive disclosure to hide secondary and tertiary actions',
      'Provide context that helps users distinguish urgent from non-urgent',
      'Allow users to pause, mute, or customize engagement features',
      'Reward quality of engagement over quantity (thoughtful contribution over daily check-in)',
      'Design dashboards that highlight only items requiring human judgment',
    ],

    donts: [
      'Don\'t fill every screen with action buttons "just in case"',
      'Don\'t use streaks, scores, or badges that punish healthy inaction',
      'Don\'t send push notifications for non-urgent events',
      'Don\'t use pulsing, flashing, or animated CTAs for non-emergency actions',
      'Don\'t frame inaction as failure ("You\'re falling behind!", "Don\'t miss out!")',
      'Don\'t create artificial urgency with countdown timers on non-time-sensitive actions',
      'Don\'t measure success by engagement volume—measure by outcome quality',
      'Don\'t require immediate decisions when users would benefit from deliberation',
    ],

    bestPractices: [
      {
        title: 'One Primary Action Per Screen',
        description:
          'Each screen should have a single, clear primary action. Secondary and tertiary actions should be visually subordinate.',
        rationale:
          'Multiple competing primary actions create decision paralysis and pressure users to act on everything rather than the most important thing.',
        example:
          'Email inbox: primary action is "Reply to messages needing response." Archive, label, and forward are secondary actions in a contextual menu.',
      },
      {
        title: 'Calm Notification Design',
        description:
          'Default to the calmest notification method. Use urgent delivery only for genuinely time-sensitive events.',
        rationale:
          'Notification fatigue is action bias at scale. When everything is urgent, nothing is urgent, and users either burn out or tune out entirely.',
        example:
          'Basecamp\'s Hey email: no badge counts, no push by default, daily digest for non-urgent mail.',
      },
      {
        title: 'Explicit Inaction Validation',
        description:
          'When presenting decision points, explicitly state what happens if the user does nothing and frame it positively when appropriate.',
        rationale:
          'Users often act out of anxiety about inaction. Providing a clear "nothing bad happens if you wait" message reduces compulsive action.',
        example:
          'Investment app: "This stock will still be available tomorrow. There is no penalty for waiting."',
      },
      {
        title: 'Action Audit Ritual',
        description:
          'Regularly audit every screen for action density. For each interactive element, ask: "Would the user be worse off without this?"',
        rationale:
          'Feature creep is action bias in product development. Teams add features because inaction (not building) feels irresponsible.',
        example:
          'Monthly "action density audit": screenshot every screen, count interactive elements, justify each one.',
      },
      {
        title: 'Measure Outcomes, Not Engagement',
        description:
          'Track whether users achieved their goals, not whether they clicked a lot.',
        rationale:
          'Engagement metrics reward action bias in the product itself. High click counts may indicate confusion or compulsion, not satisfaction.',
        example:
          'Replace "daily active users" with "users who accomplished their primary task" as the north star metric.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Users must be able to extend or disable time limits',
        implementation:
          'Never use countdown timers to pressure action unless there is a genuine server-side deadline. If timers are necessary, provide pause, extend, and disable options.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Avoid flashing content',
        implementation:
          'Pulsing CTAs and flashing notification badges can trigger seizures. Use subtle, non-flashing indicators for attention. This also reduces action pressure for all users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on red badges for urgency',
        implementation:
          'Combine color with text labels, icons, and ARIA attributes so that urgency signals are accessible to screen reader users and color-blind users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Ensure status updates are announced appropriately',
        implementation:
          'Use ARIA live regions judiciously. Announcing every notification via assertive live region creates overwhelming action pressure for screen reader users. Reserve assertive for genuine urgency.',
      },
    ],

    ethics: [
      {
        concern: 'Engagement Addiction',
        severity: 'critical',
        explanation:
          'Designing interfaces that exploit action bias to create compulsive engagement patterns resembling behavioral addiction',
        mitigation:
          'Implement daily usage limits, screen time awareness, and easy opt-out from gamification features. Measure user wellbeing alongside engagement metrics.',
      },
      {
        concern: 'Notification Manipulation',
        severity: 'high',
        explanation:
          'Using push notifications to create anxiety about inaction, especially triggered by absence ("You haven\'t logged in today!")',
        mitigation:
          'Never send notifications triggered by user absence. Let users set notification preferences during onboarding and respect those choices.',
      },
      {
        concern: 'Artificial Urgency',
        severity: 'high',
        explanation:
          'Creating false time pressure through countdown timers, expiring offers, or "limited availability" when no real constraint exists',
        mitigation:
          'Only use urgency signals for genuine time constraints. If an offer truly expires, state the real deadline. If it does not, do not pretend it does.',
      },
      {
        concern: 'Inaction Guilt',
        severity: 'medium',
        explanation:
          'Using language that frames healthy inaction as failure ("Your streak is dying!", "You\'re falling behind your peers")',
        mitigation:
          'Frame engagement positively ("Welcome back!") rather than framing absence negatively. Never compare user activity to peers in a way that induces guilt.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Action Bias Among Elite Soccer Goalkeepers: The Case of Penalty Kicks',
        author: 'Bar-Eli, M., Azar, O. H., Ritov, I., Keidar-Levin, Y., & Schein, G.',
        year: 2007,
        doi: '10.1016/j.joep.2006.07.001',
        description:
          'The landmark study analyzing 286 penalty kicks showing goalkeepers prefer action (diving) over optimal inaction (staying center)',
        type: 'foundational',
      },
      {
        title: 'The Detectability and Effects of Action Bias',
        author: 'Patt, A., & Zeckhauser, R.',
        year: 2000,
        description:
          'Foundational paper establishing action bias as a distinct cognitive phenomenon and exploring its effects on decision-making under uncertainty',
        type: 'foundational',
      },
      {
        title: 'Omission Bias and Pertussis Vaccination',
        author: 'Ritov, I., & Baron, J.',
        year: 1990,
        doi: '10.1007/BF00122574',
        description:
          'Explores the complementary omission bias (preferring inaction) and its relationship to action bias in medical decision-making',
        type: 'advanced',
      },
      {
        title: 'Designing Calm Technology',
        author: 'Case, A.',
        year: 2015,
        description:
          'Practical framework for designing technology that informs without demanding attention, directly addressing action bias in interface design',
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
          'Comprehensive coverage of cognitive biases including the role of action bias in decision-making under uncertainty',
        type: 'foundational',
      },
      {
        title: 'Calm Technology: Principles and Patterns for Non-Intrusive Design',
        author: 'Case, Amber',
        year: 2015,
        isbn: '9781491925881',
        description:
          'Design principles for technology that respects user attention and counters action bias through calm interface patterns',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'While focused on engagement, this book reveals how action bias is exploited in product design—useful for understanding what to avoid',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Action Bias: Why We Feel Compelled to Act',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/action-bias',
        description:
          'Accessible overview of action bias with examples from sports, medicine, and technology',
        type: 'practical',
      },
      {
        title: 'Calm Technology',
        author: 'Weiser, M., & Brown, J. S.',
        url: 'https://calmtech.com/',
        description:
          'The original Xerox PARC paper on designing technology that does not demand constant attention',
        type: 'foundational',
      },
    ],

    videos: [
      {
        title: 'The Art of Not Doing',
        author: 'TED-Ed',
        url: 'https://www.youtube.com/watch?v=action-bias-ted',
        description:
          'Animated explanation of action bias with examples from sports, investing, and everyday decisions',
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
