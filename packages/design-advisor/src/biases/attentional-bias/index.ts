/**
 * ATTENTIONAL BIAS
 *
 * Recurring thoughts and emotional state influence what we pay attention to;
 * we notice what we are primed to notice.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const attentionalBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'attentional-bias',
    name: 'Attentional Bias',
    aliases: ['Selective Attention', 'Attentional Capture', 'Threat-Related Attentional Bias'],
    category: BiasCategory.PERCEPTION,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'attention',
      'perception',
      'focus',
      'distraction',
      'notification',
      'priming',
      'emotional-salience',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We pay more attention to things that match our current emotional state, recurring thoughts, or what we have been primed to notice.',

    detailed: `Attentional bias is the tendency for our perception to be affected by recurring thoughts and emotional states. People selectively attend to stimuli that are emotionally relevant to them, whether those stimuli are threatening, rewarding, or simply aligned with their current concerns.

This means a person who is anxious about security will notice every warning icon and error message, while someone focused on completing a task will filter out peripheral content. Our attention is not neutral — it is shaped by goals, fears, desires, and recent priming.

In UX design, attentional bias has profound implications for notification design, attention management, focus modes, distraction reduction, and content prioritization. Designers who understand what users are primed to notice can structure interfaces that surface the right information at the right time while reducing cognitive noise.`,

    psychologyBasis: {
      discoveredBy: 'Colin MacLeod, Andrew Mathews, and Yair Bar-Haim',
      year: 1986,
      theory: 'Threat-Related Attentional Bias and Dot-Probe Paradigm',
      mechanism: `The brain's attentional system is biased toward stimuli that match our current emotional and cognitive state. This happens because:

1. **Emotional Priming**: Ongoing emotional states (anxiety, excitement, concern) lower the threshold for detecting related stimuli — an anxious user spots warning icons faster
2. **Goal-Directed Filtering**: Active goals create attentional templates that bias perception toward goal-relevant information and away from everything else
3. **Threat Detection Priority**: Evolutionarily, the brain prioritizes threatening or emotionally charged stimuli, making negative signals (red badges, error states) harder to ignore
4. **Habituation and Sensitization**: Repeated exposure to certain stimuli either dulls attention (notification fatigue) or heightens it (hypervigilance), depending on emotional valence
5. **Top-Down Modulation**: What we expect to see shapes what we actually notice — primed users will find information others completely overlook

This mechanism is largely automatic and pre-conscious. Users are not choosing what to attend to; their attentional system is filtering the world before conscious awareness kicks in.`,
    },

    realWorldExample: `In MacLeod, Mathews, and Tata's 1986 dot-probe experiment, anxious participants consistently detected probes faster when they appeared in the location of threatening words rather than neutral words. Non-anxious participants showed no such bias. This demonstrated that emotional state systematically shifts attentional allocation — a finding replicated hundreds of times across clinical and non-clinical populations. In digital products, this explains why a stressed user checking their bank app will immediately fixate on any red number or downward arrow, even if the overall account is healthy.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Attentional bias affects how users allocate their limited attention across an interface. Designers can leverage this understanding to:

- Reduce notification noise so important alerts are not lost in a sea of pings
- Design focus modes that respect users' current cognitive state
- Prioritize content so the most relevant information surfaces first
- Minimize distractions during critical task flows
- Structure visual hierarchies that align with users' attentional templates`,

    whenToUse: [
      {
        title: 'Notification Prioritization',
        scenario:
          'When a product generates many notifications of varying importance',
        example:
          'Categorize notifications into urgency tiers and only surface critical ones immediately, batching the rest for a daily digest',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Focus Mode Design',
        scenario: 'When users need sustained concentration on a primary task',
        example:
          'Provide a focus mode that suppresses non-essential UI elements, badges, and animations so users can direct attention to their work',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Distraction Reduction',
        scenario: 'When peripheral elements compete with the primary task for attention',
        example:
          'Dim or collapse sidebar content, mute non-critical badges, and pause animated elements during complex workflows like form completion or writing',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Important-First Content Ordering',
        scenario: 'When presenting lists, feeds, or dashboards with mixed-priority content',
        example:
          'Use intelligent sorting that surfaces actionable or time-sensitive items above informational content, aligning with users\' attentional priorities',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Contextual Information Surfacing',
        scenario: 'When the same interface serves users with different goals or emotional states',
        example:
          'Detect user context (e.g., first-time setup vs. daily use) and adjust what is visually prominent to match their likely attentional focus',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Safety-Critical Alerts',
        reason:
          'Attentional bias means users in a calm state may not notice warnings designed for anxious users, and vice versa',
        consequence:
          'Critical safety information could be missed if it only relies on emotional salience to capture attention',
        alternative:
          'Use multi-modal alerts (visual + auditory + haptic) for safety-critical information so attention is captured regardless of emotional state',
      },
      {
        title: 'Over-Aggressive Noise Reduction',
        reason:
          'Suppressing too many signals can cause users to miss legitimately important information',
        consequence:
          'Users in focus mode miss a time-sensitive alert, leading to missed deadlines or security incidents',
        alternative:
          'Allow breakthrough notifications for truly critical events even in focus mode, with clear escalation rules',
      },
      {
        title: 'Assumption of User State',
        reason:
          'Designers cannot always know a user\'s emotional state or attentional priorities',
        consequence:
          'Incorrect assumptions lead to hiding relevant content or surfacing irrelevant content',
        alternative:
          'Provide user-configurable priority settings rather than assuming what matters to each user',
      },
      {
        title: 'Exploiting Anxiety',
        reason:
          'Deliberately triggering attentional bias through fear or anxiety is manipulative',
        consequence:
          'User distress, erosion of trust, and potential psychological harm',
        alternative:
          'Design to reduce anxiety rather than exploit it — use calming design patterns and clear, reassuring language',
      },
    ],

    commonMistakes: [
      {
        title: 'Notification Overload',
        description:
          'Treating all notifications as equally important, flooding users with badges, toasts, and banners',
        why: 'When everything demands attention, attentional bias causes users to either fixate on threat-like signals or tune out entirely (notification fatigue)',
        fix: 'Implement a tiered notification system with distinct visual treatments for critical, important, and informational alerts',
      },
      {
        title: 'Ignoring Emotional Context',
        description:
          'Designing a single visual hierarchy without considering that users in different emotional states will perceive it differently',
        why: 'An anxious user and a relaxed user literally see different things first in the same interface',
        fix: 'Test designs with users in different emotional contexts and provide adjustable information density',
      },
      {
        title: 'Competing Attention Demands',
        description:
          'Placing multiple high-salience elements (red badges, animated icons, flashing indicators) on screen simultaneously',
        why: 'Multiple competing signals create attentional conflict, increasing cognitive load and decision paralysis',
        fix: 'Limit the number of high-salience elements visible at any time; sequence attention demands rather than stacking them',
      },
      {
        title: 'No Escape from Distractions',
        description:
          'Failing to offer users any way to reduce visual noise or enter a focused state',
        why: 'Users whose attention is constantly pulled by peripheral elements cannot sustain deep work',
        fix: 'Provide focus modes, collapsible panels, and notification controls that let users manage their attentional environment',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines the spatial distribution of attentional demands and focus zones',
        examples: [
          'Clean layouts with clear focal points guide attention more effectively than cluttered ones',
          'Whitespace creates attentional breathing room, reducing cognitive competition',
          'Sidebar notifications pull attention from primary content areas',
          'Progressive disclosure respects limited attentional bandwidth',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography weight and size create attentional hierarchies that guide scanning',
        examples: [
          'Bold headings capture attention before body text, establishing reading priorities',
          'Monospace or highlighted text in code editors directs attention to key tokens',
          'Consistent type scales prevent random elements from capturing unearned attention',
          'Subtle de-emphasis (lighter weight, smaller size) reduces attentional pull of secondary content',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color is the primary driver of attentional capture, especially for threat-related stimuli',
        examples: [
          'Red badges and error states exploit threat-detection priming to capture attention instantly',
          'Muted or desaturated palettes reduce attentional competition between elements',
          'Accent colors should be reserved for actionable items to maintain attentional signal integrity',
          'Color-coding notification tiers (red/amber/blue) creates an intuitive attention priority system',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Motion and interactive state changes are powerful attentional magnets',
        examples: [
          'Animations and transitions capture attention involuntarily — use sparingly for important state changes',
          'Hover states and micro-interactions should inform without distracting from the primary task',
          'Loading spinners and progress bars hold attention during waits, preventing premature abandonment',
          'Auto-playing media hijacks attention and should always be user-initiated',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content relevance and emotional tone determine whether users attend to or filter out information',
        examples: [
          'Personalized content aligned with user goals captures attention more effectively',
          'Emotionally neutral microcopy reduces unnecessary attentional capture',
          'Action-oriented language ("Review now", "Approve") directs attention to next steps',
          'Content ordered by relevance respects users\' attentional priorities',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Attentional bias interacts with assistive technology in ways that can help or hinder focus',
        examples: [
          'Screen reader users rely on heading structure and ARIA landmarks to direct attention — poor structure causes attentional disorientation',
          'ARIA live regions should be used judiciously; too many competing announcements overwhelm auditory attention',
          'Focus management after actions (modals, deletions) prevents attentional drift',
          'Reduced-motion preferences respect users who are more sensitive to motion-based attentional capture',
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
        title: 'Tiered Notification System',
        description:
          'Messaging app that categorizes notifications by urgency and only interrupts for critical ones',
        code: `<div class="notification-center">
  <section class="tier-critical" aria-label="Critical notifications">
    <div class="notification urgent" role="alert">
      <span class="icon">&#x26A0;</span>
      <p><strong>Security alert:</strong> New login from unrecognized device</p>
      <button class="primary">Review now</button>
    </div>
  </section>

  <section class="tier-digest" aria-label="Daily digest">
    <h3>Today's updates</h3>
    <ul class="digest-list">
      <li>3 new comments on your post</li>
      <li>Team standup summary available</li>
      <li>Weekly report ready to view</li>
    </ul>
  </section>
</div>

<style>
.tier-critical {
  border-left: 4px solid var(--cg-color-danger);
  background: var(--cg-color-danger-subtle);
  padding: var(--cg-space-4);
  margin-bottom: var(--cg-space-4);
}
.tier-digest {
  padding: var(--cg-space-4);
  color: var(--cg-color-text-secondary);
}
</style>`,
        explanation:
          'Critical notifications use high-salience visual treatment (red border, alert role) to capture attention via threat-detection priming. Routine updates are batched into a calm digest that does not compete for attention. This respects attentional bias rather than fighting it.',
        principle:
          'Match visual salience to actual urgency so attentional bias works for the user, not against them',
        metrics: {
          before: '67% of critical alerts missed when mixed with 20+ daily notifications',
          after: '94% of critical alerts acted on within 5 minutes after tiering',
          improvement: '40% increase in critical alert response rate',
        },
      },
      {
        title: 'Focus Mode with Breakthrough Alerts',
        description:
          'Writing application that suppresses UI chrome during composition but allows critical interruptions',
        code: `<div class="editor-container" data-mode="focus">
  <div class="editor-toolbar" aria-hidden="true" class="collapsed">
    <!-- Toolbar hidden during focus mode -->
  </div>

  <main class="writing-area">
    <textarea
      aria-label="Document editor"
      placeholder="Start writing..."
    ></textarea>
  </main>

  <div class="focus-controls">
    <button class="exit-focus" aria-label="Exit focus mode">
      Exit Focus
    </button>
    <span class="focus-timer">25:00 remaining</span>
  </div>
</div>

<style>
[data-mode="focus"] .editor-toolbar {
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.3s ease;
}
[data-mode="focus"] .editor-toolbar:hover {
  opacity: 1;
  height: auto;
}
.writing-area {
  max-width: 65ch;
  margin: 0 auto;
  padding: var(--cg-space-8);
}
</style>`,
        explanation:
          'Focus mode removes visual noise (toolbar, sidebar, badges) so the user\'s attentional system is not constantly pulled away from writing. The toolbar reappears on hover for intentional access. A breakthrough system allows truly critical alerts to surface even in focus mode.',
        principle:
          'Reduce attentional competition to support sustained focus on primary tasks',
      },
      {
        title: 'Priority Inbox with Smart Ordering',
        description:
          'Email client that orders messages by relevance and urgency rather than chronology alone',
        code: `<div class="inbox">
  <section class="priority-section" aria-label="Important and unread">
    <h3>Important</h3>
    <ul>
      <li class="email important">
        <span class="sender">CFO - Sarah Chen</span>
        <span class="subject">Q4 Budget Approval Needed</span>
        <span class="badge urgent">Action required</span>
      </li>
    </ul>
  </section>

  <section class="priority-section" aria-label="Other unread">
    <h3>Other</h3>
    <ul>
      <li class="email">
        <span class="sender">Newsletter</span>
        <span class="subject">Weekly Design Digest</span>
      </li>
      <li class="email">
        <span class="sender">HR System</span>
        <span class="subject">Timesheet reminder</span>
      </li>
    </ul>
  </section>
</div>`,
        explanation:
          'Important-first ordering aligns with users\' attentional bias toward goal-relevant information. Actionable items with clear badges surface above informational ones, so users do not need to scan everything to find what matters.',
        principle:
          'Content ordering should match attentional priority, not just recency',
      },
    ],

    bad: [
      {
        title: 'Badge Overload',
        description:
          'Application with red notification badges on every menu item simultaneously',
        code: `<!-- DON'T DO THIS -->
<nav class="sidebar">
  <a href="/inbox">Inbox <span class="badge red">23</span></a>
  <a href="/tasks">Tasks <span class="badge red">7</span></a>
  <a href="/calendar">Calendar <span class="badge red">3</span></a>
  <a href="/settings">Settings <span class="badge red">1</span></a>
  <a href="/updates">Updates <span class="badge red">45</span></a>
  <a href="/reports">Reports <span class="badge red">12</span></a>
</nav>`,
        explanation:
          'When every item has a red badge, the threat-detection system is overwhelmed. Users cannot determine what actually needs attention, so they either develop notification fatigue (ignoring all badges) or become anxious from constant attentional demands.',
        principle:
          'When everything screams for attention, nothing gets it — reserve high-salience indicators for genuinely important items',
      },
      {
        title: 'Anxiety-Exploiting Dashboard',
        description:
          'Financial app that uses alarming colors and language to keep users checking obsessively',
        code: `<!-- DON'T DO THIS -->
<div class="portfolio-dashboard">
  <div class="alert" style="background: #ff0000; color: white;">
    <h2>YOUR PORTFOLIO IS DOWN!</h2>
    <p class="loss" style="font-size: 3em;">-$1,247.83</p>
    <p>You are losing money RIGHT NOW</p>
    <p style="font-size: 0.8em;">(-0.3% today)</p>
  </div>
  <button class="panic-button">SELL EVERYTHING</button>
</div>`,
        explanation:
          'This design exploits attentional bias by priming anxiety with alarming colors and catastrophizing language. The large loss figure captures attention via threat detection, while the small percentage (-0.3%) that provides context is visually minimized. The prominent sell button encourages panic-driven action.',
        principle:
          'Never exploit attentional bias toward threats to manipulate users into impulsive decisions',
      },
      {
        title: 'No Focus Mode or Distraction Controls',
        description:
          'Productivity tool with no way to suppress peripheral UI noise',
        code: `<!-- DON'T DO THIS -->
<div class="workspace">
  <aside class="sidebar always-visible">
    <div class="chat-widget" data-auto-open="true">
      <span class="unread-badge pulse">5 new messages</span>
    </div>
    <div class="activity-feed auto-scroll">
      <p>Alex edited Document A</p>
      <p>Jordan commented on Task B</p>
      <p>New notification...</p>
    </div>
  </aside>

  <main class="document-editor">
    <!-- User trying to focus here -->
    <div class="popup-banner">Try our new feature!</div>
  </main>
</div>`,
        explanation:
          'The always-visible sidebar with pulsing badges, auto-scrolling activity feed, and popup banner create constant attentional interruptions. Users cannot suppress these distractions, forcing them to expend cognitive effort ignoring peripheral stimuli instead of focusing on their task.',
        principle:
          'Failing to provide distraction controls forces users into an unwinnable fight against their own attentional system',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Focus Modes (iOS/macOS)',
        description: 'Apple Focus modes allow users to configure which apps and people can break through during different activities (Work, Sleep, Personal). The system filters notifications at the OS level, aligning digital interruptions with the user\'s current attentional priorities.',
        effectiveness: 'very-effective',
        analysis: 'By giving users control over their attentional environment, Focus modes reduce notification fatigue and support sustained attention. The scheduled activation respects that attentional priorities change throughout the day.',
      },
      {
        company: 'Google',
        product: 'Gmail Priority Inbox',
        description: 'Gmail uses machine learning to classify emails as Important, Starred, or Everything Else, then orders the inbox to surface high-priority messages first. This aligns the visual ordering with the user\'s likely attentional priorities.',
        effectiveness: 'very-effective',
        analysis: 'Priority Inbox reduces the attentional cost of email triage by pre-filtering content so users encounter important messages before routine ones. Users report finding critical emails faster and feeling less overwhelmed by inbox volume.',
      },
      {
        company: 'Slack',
        product: 'Do Not Disturb and Notification Schedule',
        description: 'Slack allows users to pause all notifications, set notification schedules, and configure per-channel notification levels. Critical mentions can still break through DND when configured.',
        effectiveness: 'effective',
        analysis: 'Slack\'s DND and scheduling features acknowledge that constant notifications hijack attention. The breakthrough mechanism for urgent mentions balances focus protection with responsiveness to genuinely important signals.',
      },
      {
        company: 'Headspace',
        product: 'Meditation App Interface',
        description: 'Headspace uses a minimal, calming interface with muted colors, gentle animations, and no badges or red indicators. The design actively works against threat-related attentional bias to help users enter a relaxed, focused state.',
        effectiveness: 'very-effective',
        analysis: 'By eliminating high-salience visual elements that would trigger attentional capture, Headspace creates an interface that supports the user\'s goal of calm focus. The design demonstrates how understanding attentional bias can inform aesthetic and functional choices alike.',
      },
    ],

    abTests: [
      {
        title: 'Notification Tiering: Flat vs Prioritized',
        hypothesis:
          'Tiered notifications with distinct visual treatments will improve response to critical alerts',
        controlVersion: {
          description:
            'All notifications displayed in a single chronological list with identical visual treatment (blue dot)',
          metrics: {
            conversionRate: '23%',
            timeOnPage: '4:30',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'Notifications split into Critical (red, top), Important (amber, middle), and Informational (grey, bottom) tiers with distinct styling',
          metrics: {
            conversionRate: '61%',
            timeOnPage: '2:10',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Tiered notifications increased critical alert response from 23% to 61%. Users spent less time scanning because attentional bias naturally drew them to the high-salience critical tier first. Informational items saw lower engagement, but that was the intended outcome.',
          learnings: [
            'Visual differentiation between notification tiers dramatically improves critical alert response',
            'Users prefer structured attention management over flat chronological lists',
            'Reduced time-on-page is a positive signal when it means faster action on important items',
            'Three tiers is optimal — two feels too simple, four creates confusion',
          ],
        },
      },
      {
        title: 'Focus Mode: Available vs Not Available',
        hypothesis:
          'Providing a focus mode will increase task completion rate and user satisfaction',
        controlVersion: {
          description:
            'Standard editor with always-visible sidebar, notification badges, and activity feed',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '18:00',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Same editor with toggleable focus mode that hides sidebar, suppresses badges, and centers the work area',
          metrics: {
            conversionRate: '78%',
            timeOnPage: '14:00',
            scrollDepth: '90%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Task completion increased by 50% when focus mode was available. Users completed work faster (14 min vs 18 min) and reported significantly higher satisfaction scores. 68% of users activated focus mode at least once per session.',
          learnings: [
            'Users actively want tools to manage their attentional environment',
            'Reducing peripheral distractions improves both speed and quality of work',
            'Focus mode adoption was highest among power users and during long tasks',
            'Users who used focus mode were 2x more likely to return the next day',
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
        name: 'Notification Density',
        description:
          'Multiple notification indicators (badges, banners, toasts) competing for attention simultaneously',
        howToSpot:
          'Count the number of red badges, unread indicators, and alert banners visible at once — more than 3 high-salience elements indicates attentional overload',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Distraction Zones',
        description:
          'Peripheral UI elements (sidebars, chat widgets, activity feeds) that animate or update while users work',
        howToSpot:
          'Look for auto-scrolling feeds, pulsing indicators, or animated elements outside the primary content area',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Focus Controls',
        description:
          'Absence of any mechanism for users to suppress non-essential visual noise',
        howToSpot:
          'Check whether the interface offers DND mode, collapsible panels, notification settings, or distraction-free modes',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Uniform Salience',
        description:
          'All notifications or alerts using the same visual treatment regardless of urgency',
        howToSpot:
          'Check if critical errors and minor updates share the same badge color, size, and position',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Anxiety-Inducing Elements',
        description:
          'Design elements that exploit threat-detection attentional bias through alarming colors, language, or imagery',
        howToSpot:
          'Look for unnecessarily red or alarming treatments on non-critical information, catastrophizing language, or dramatic visual emphasis on negative data',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Notification Fatigue Pattern',
        description: 'Excessive notification volume leads to users ignoring all alerts, including critical ones',
        indicators: ['Many unread badges visible simultaneously', 'Users report missing important notifications', 'Low engagement with notification center', 'Users disable all notifications'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Attentional Hijacking Pattern',
        description: 'Peripheral elements steal attention from the user\'s primary task through motion, color, or sound',
        indicators: ['Auto-playing animations near work areas', 'Chat widgets that open unsolicited', 'Promotional banners over content', 'Sound or haptic alerts for non-critical events'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Anxiety Priming Pattern',
        description: 'Interface elements that trigger or exploit threat-related attentional bias to drive engagement',
        indicators: ['Red or alarming colors on routine information', 'Countdown timers creating false urgency', 'Loss-framed language for non-critical actions', 'Dramatic visual emphasis on negative metrics'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Attention-Respecting Pattern',
        description: 'Design intentionally reduces attentional demands to support user focus (positive pattern)',
        indicators: ['Focus or zen modes available', 'Notification tiering with distinct treatments', 'Collapsible sidebars and panels', 'User-configurable notification preferences'],
        severity: ImpactLevel.LOW,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'How many high-salience elements (red badges, alerts, animations) are visible at once?',
      'Can users enter a focus mode or suppress non-essential notifications?',
      'Are notifications tiered by urgency with visually distinct treatments?',
      'Do any peripheral elements animate or update while users are working on primary tasks?',
      'Is content ordered by relevance and urgency, or only by recency?',
      'Are there elements that exploit anxiety or threat detection to capture attention?',
      'Can critical alerts break through focus or DND modes?',
      'Do users have control over their notification preferences?',
      'Is the visual hierarchy aligned with actual information priority?',
      'Have we tested whether users can identify the most important element on screen within 3 seconds?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in attentional bias.

Analyze the provided design for attentional bias patterns. Identify:

1. **Notification Design**: How notifications are structured, tiered, and presented
2. **Attention Management**: Whether the interface supports or undermines user focus
3. **Focus Modes**: Availability and effectiveness of distraction-reduction features
4. **Content Prioritization**: How information is ordered and emphasized relative to importance
5. **Emotional Priming**: Whether design elements exploit threat-related attention or emotional states

For each pattern found:
- Identify what is capturing attention and whether it deserves that attention
- Assess whether the attentional demand matches the information's actual importance
- Determine if the design respects or exploits the user's attentional system
- Evaluate whether users have control over their attentional environment
- Suggest improvements for attention-respecting design

Consider:
- Are high-salience elements (red, animated, large) reserved for genuinely important signals?
- Can users focus on their primary task without constant interruption?
- Are notifications tiered by urgency with distinct visual treatments?
- Does the design exploit anxiety or threat detection to drive engagement?
- Are there accessibility implications for users with attention-related conditions (ADHD, anxiety)?

Provide actionable recommendations for ethical, attention-respecting design.`,

    outputSchema: {
      type: 'object',
      properties: {
        attentionalPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              attentionalDemand: { type: 'string' },
              urgencyMatch: { type: 'string' },
              userControl: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'attentionalDemand',
              'urgencyMatch',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            notificationDesign: { type: 'number' },
            focusSupport: { type: 'number' },
            distractionLevel: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'notificationDesign',
            'focusSupport',
            'distractionLevel',
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
        'attentionalPatterns',
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
        title: 'Audit Attentional Demands',
        description:
          'Inventory every element that competes for user attention: badges, alerts, animations, auto-updating feeds, and promotional banners',
        example:
          'Count 14 notification sources across the app, categorize each by urgency level',
        tips: [
          'Screenshot your interface and circle every attention-demanding element',
          'Track how many notifications a typical user receives per hour',
          'Map which elements animate, pulse, or change without user action',
        ],
      },
      {
        step: 2,
        title: 'Tier Notifications by Urgency',
        description:
          'Classify all notifications into tiers (critical, important, informational) and assign distinct visual treatments to each',
        example:
          'Critical: red + sound + interrupt. Important: amber + badge. Info: grey + digest only',
        tips: [
          'Limit critical tier to genuinely urgent items (security, data loss, deadlines)',
          'Use color, size, position, and modality to differentiate tiers',
          'Batch informational notifications into periodic digests',
        ],
      },
      {
        step: 3,
        title: 'Design Focus Modes',
        description:
          'Create mechanisms for users to suppress non-essential UI elements during concentrated work',
        example:
          'Add a focus toggle that hides sidebar, collapses notifications, and centers the work area',
        tips: [
          'Allow critical alerts to break through focus mode',
          'Let users schedule focus modes or tie them to calendar events',
          'Remember user preferences across sessions',
        ],
      },
      {
        step: 4,
        title: 'Prioritize Content Ordering',
        description:
          'Order lists, feeds, and dashboards by relevance and urgency, not just chronology',
        example:
          'Inbox shows actionable messages above newsletters, regardless of timestamp',
        tips: [
          'Use signals like sender importance, keywords, and user history',
          'Allow users to configure priority rules',
          'Show the sorting rationale so users trust the ordering',
        ],
      },
      {
        step: 5,
        title: 'Test with Real Attention Metrics',
        description:
          'Measure whether users can find and act on important information within your interface',
        example:
          'Task test: "Find and respond to the most urgent message" — measure time and success rate',
        tips: [
          'Use eye-tracking or click-heatmaps to see where attention actually goes',
          'Compare task completion times with and without focus modes',
          'Survey users about notification fatigue and feeling of control',
        ],
      },
    ],

    dos: [
      'Reserve high-salience visual treatments (red, large, animated) for genuinely important signals',
      'Provide focus modes or distraction-reduction features for concentrated work',
      'Tier notifications by urgency with visually distinct treatments',
      'Order content by relevance and importance, not just recency',
      'Give users control over their notification preferences and frequency',
      'Batch informational notifications into digests rather than individual interruptions',
      'Use progressive disclosure to present information at the right moment',
      'Test whether users can identify the most important element within seconds',
    ],

    donts: [
      'Don\'t use red badges or alarming colors for non-critical information',
      'Don\'t auto-play animations, videos, or sounds without user consent',
      'Don\'t treat all notifications as equally important',
      'Don\'t exploit anxiety or threat detection to drive engagement metrics',
      'Don\'t place competing high-salience elements adjacent to each other',
      'Don\'t force users to see every notification without filtering options',
      'Don\'t use notification counts as a vanity metric for "engagement"',
      'Don\'t interrupt deep-focus tasks with non-critical updates',
    ],

    bestPractices: [
      {
        title: 'Notification Budget',
        description:
          'Set a maximum number of interruptions per hour and enforce it across all notification sources',
        rationale:
          'Unlimited notifications overwhelm the attentional system and lead to fatigue — a budget forces prioritization',
        example:
          'Cap at 3 interruptions per hour; queue additional notifications for the next window',
      },
      {
        title: 'Calm Technology Principles',
        description:
          'Design notifications that inform without demanding — use peripheral awareness over direct interruption',
        rationale:
          'Not every update needs to interrupt; many can be passively available when the user is ready',
        example:
          'Show a subtle status dot that changes color rather than a pop-up toast for non-urgent updates',
      },
      {
        title: 'Context-Aware Delivery',
        description:
          'Adjust notification delivery based on what the user is currently doing',
        rationale:
          'A notification during deep focus has a much higher attentional cost than one during idle browsing',
        example:
          'Hold non-critical notifications while the user is actively typing or in a meeting',
      },
      {
        title: 'Escape Hatches',
        description:
          'Always provide a way for users to dismiss, snooze, or permanently hide attention-demanding elements',
        rationale:
          'Persistent, undismissable elements create attentional stress and reduce perceived control',
        example:
          'All banners have a close button; all badges can be marked as read; all panels can be collapsed',
      },
      {
        title: 'Attention-Aware Onboarding',
        description:
          'Introduce new features one at a time rather than overwhelming users with multiple callouts',
        rationale:
          'Multiple simultaneous feature callouts compete for attention and reduce comprehension of all of them',
        example:
          'Show one onboarding tooltip per session, triggered by relevant user action',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.2.2',
        guideline:
          'Pause, Stop, Hide - Users must be able to pause, stop, or hide moving or auto-updating content',
        implementation:
          'Provide controls to pause auto-scrolling feeds, activity streams, and animated elements that capture attention involuntarily',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not use color alone to convey notification urgency',
        implementation:
          'Combine color with icons, text labels, and ARIA attributes so all users can distinguish notification tiers',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Status messages must be programmatically determinable without receiving focus',
        implementation:
          'Use aria-live regions for notifications, with "assertive" for critical alerts and "polite" for informational updates to respect auditory attention',
      },
      {
        wcagLevel: 'AAA',
        criterion: '2.3.3',
        guideline:
          'Animation from Interactions - Motion can be disabled by the user',
        implementation:
          'Respect prefers-reduced-motion for all attention-capturing animations such as pulsing badges, sliding panels, and transition effects',
      },
    ],

    ethics: [
      {
        concern: 'Anxiety Exploitation',
        severity: 'critical',
        explanation:
          'Deliberately using alarming colors, language, or imagery to trigger threat-related attentional bias and drive compulsive checking behavior',
        mitigation:
          'Reserve alarming treatments for genuinely critical situations. Use neutral, calming design patterns for routine information. Never catastrophize minor events.',
      },
      {
        concern: 'Notification Addiction',
        severity: 'high',
        explanation:
          'Designing notification systems to maximize engagement metrics rather than user benefit, creating compulsive checking behaviors',
        mitigation:
          'Optimize for user outcomes (task completion, satisfaction) rather than engagement metrics (opens, clicks). Provide notification budgets and digests.',
      },
      {
        concern: 'Dark Pattern Attention Traps',
        severity: 'high',
        explanation:
          'Using high-salience design elements to redirect attention toward monetized content or away from opt-out controls',
        mitigation:
          'Ensure visual salience correlates with user benefit, not business revenue. Make opt-out controls as visually prominent as opt-in ones.',
      },
      {
        concern: 'ADHD and Anxiety Considerations',
        severity: 'high',
        explanation:
          'Users with ADHD or anxiety disorders are disproportionately affected by attentional demands and threat-priming in interfaces',
        mitigation:
          'Provide robust focus modes, notification controls, and calm design options. Test with neurodiverse users. Default to lower attentional demand.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Threat-Related Attentional Bias in Anxious and Nonanxious Individuals: A Meta-Analytic Study',
        author: 'Bar-Haim, Y., Lamy, D., Pergamin, L., Bakermans-Kranenburg, M. J., & van IJzendoorn, M. H.',
        year: 2007,
        doi: '10.1037/0033-2909.133.1.1',
        description:
          'Landmark meta-analysis of 172 studies confirming that anxious individuals show reliable attentional bias toward threat-related stimuli',
        type: 'foundational',
      },
      {
        title: 'Selective Processing of Threat Cues in Anxiety States',
        author: 'MacLeod, C., Mathews, A., & Tata, P.',
        year: 1986,
        doi: '10.1016/0005-7967(86)90054-6',
        description:
          'Introduced the dot-probe paradigm and demonstrated that anxiety systematically biases spatial attention toward threatening stimuli',
        type: 'foundational',
      },
      {
        title: 'Cognitive Bias Modification Approaches to Anxiety',
        author: 'MacLeod, C., & Mathews, A.',
        year: 2012,
        doi: '10.1146/annurev-clinpsy-032511-143052',
        description:
          'Reviews how attentional biases can be modified through training, with implications for designing interfaces that reduce rather than amplify anxiety',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Attention and Effort',
        author: 'Kahneman, Daniel',
        year: 1973,
        isbn: '9780130505187',
        description:
          'Foundational work on the limited-capacity model of attention, explaining why attentional competition matters for interface design',
        type: 'foundational',
      },
      {
        title: 'Calm Technology: Principles and Patterns for Non-Intrusive Design',
        author: 'Case, Amber',
        year: 2015,
        isbn: '9781491925881',
        description:
          'Practical framework for designing technology that respects attentional limits and lives at the periphery until needed',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Attention',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/designing-for-attention/',
        description:
          'Practical guide to managing user attention in digital interfaces, including notification design and focus support',
        type: 'practical',
      },
      {
        title: 'The Cost of Interrupted Work: More Speed and Stress',
        author: 'Mark, G., Gudith, D., & Klocke, U.',
        url: 'https://www.ics.uci.edu/~gmark/chi08-mark.pdf',
        description:
          'Research showing that interruptions increase task completion time by 27% and significantly raise stress levels',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'Distracted: The Erosion of Attention and the Coming Dark Age',
        author: 'Maggie Jackson',
        url: 'https://www.youtube.com/watch?v=EvnfLR8s6Cw',
        description:
          'Talk on how digital environments exploit attentional bias and what designers can do to counteract it',
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
      'change-blindness',       // Attentional bias explains why some changes are noticed and others are not
      'inattentional-blindness', // Focused attention causes users to miss unexpected stimuli
      'von-restorff-effect',     // Distinctive items capture attention more effectively
      'priming',                 // Priming shapes what the attentional system is tuned to detect
    ],

    conflicts: [
      'mere-exposure-effect',   // Repeated exposure increases liking but can decrease attentional salience
      'banner-blindness',        // Habitual inattention overrides designed attentional cues
    ],

    confusedWith: [
      'availability-heuristic', // Availability is about memory retrieval ease; attentional bias is about perceptual filtering
      'salience-bias',          // Salience bias is a specific type of attentional bias focused on prominent features
      'confirmation-bias',      // Confirmation bias affects information interpretation; attentional bias affects what is noticed
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'threat-bias',
        'reward-bias',
        'goal-directed-attention',
      ],
    },
  },
};
