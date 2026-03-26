/**
 * SPACING EFFECT
 *
 * We remember information better with spaced repetition
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const spacingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'spacing-effect',
    name: 'Spacing Effect',
    aliases: [],
    category: BiasCategory.MEMORY,
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
    simple: 'We remember information better with spaced repetition',

    detailed: `The spacing effect is a memory phenomenon where information is better retained when learning sessions are distributed over time rather than concentrated into a single session. This is one of the most robust findings in cognitive psychology, consistently replicated across diverse tasks, age groups, and materials.

In UX design, the spacing effect has profound implications for onboarding flows, educational features, notification strategies, and any experience where users need to learn and retain information. Products that space out their teaching moments—through drip campaigns, progressive feature education, and timed reminders—see dramatically higher retention and engagement.

Designers who understand this bias avoid the temptation to front-load all information in a single session. Instead, they distribute learning across multiple touchpoints, using spaced intervals optimized for long-term memory retention rather than short-term comprehension.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Information is better retained when learning sessions are spaced over time rather than massed together. This happens because:

1. **Encoding Variability**: Each spaced session encodes information in a slightly different context, creating multiple retrieval pathways in memory
2. **Retrieval Practice**: Spacing forces the brain to actively retrieve information each session, strengthening the memory trace through effortful recall
3. **Consolidation Windows**: Sleep and time between sessions allow memory consolidation processes to stabilize and integrate new information
4. **Deficient Processing**: Massed repetition leads to diminishing returns—the brain treats repeated immediate exposure as redundant and reduces encoding effort
5. **Contextual Reinstatement**: Varied temporal contexts during spaced sessions create richer associative networks, making recall more flexible and robust`,
    },

    realWorldExample: `In Hermann Ebbinghaus's foundational memory experiments (1885), he discovered that distributing study sessions across multiple days produced dramatically better retention than cramming the same total study time into one session. A student who studies vocabulary for 10 minutes across 5 separate days will remember far more words after a month than one who studies for 50 minutes straight. This finding has been replicated thousands of times and forms the basis of modern spaced repetition systems like Anki and Duolingo.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Spacing Effect affects how users learn, retain, and build habits around products. Designers can leverage this to:

- Create drip onboarding campaigns that teach features progressively over days or weeks
- Space notification reminders at optimal intervals for habit formation
- Design progressive feature education that introduces complexity gradually
- Time re-engagement messages to arrive when memory starts to fade
- Build learning apps and tutorials that maximize long-term retention`,

    whenToUse: [
      {
        title: 'Onboarding Flows',
        scenario:
          'When introducing new users to a complex product with many features',
        example:
          'Send a welcome email on Day 1, introduce core feature on Day 3, teach advanced feature on Day 7, and prompt power-user workflow on Day 14',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Education',
        scenario: 'When teaching users about new or underused features',
        example:
          'Introduce one new feature per week via contextual tooltips that appear when the user is in a relevant workflow',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Habit Formation',
        scenario: 'When helping users build consistent usage habits',
        example:
          'Send reminders at increasing intervals (1 day, 3 days, 7 days) to reinforce newly learned behaviors',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Learning Applications',
        scenario: 'When building educational products or training modules',
        example:
          'Use spaced repetition algorithms to resurface flashcards or quiz questions at optimal review intervals',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Re-engagement Campaigns',
        scenario: 'When bringing back lapsed users with reminders of value',
        example:
          'Schedule re-engagement emails at 3, 7, 14, and 30 days after last activity, each highlighting a different value proposition',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Urgent Actions',
        reason:
          'When users need to complete a critical task immediately, spacing out information delays action',
        consequence:
          'Users may fail to complete time-sensitive tasks like security updates or payment deadlines',
        alternative:
          'Present all necessary information at once for urgent flows, with clear priority ordering',
      },
      {
        title: 'Simple One-Time Tasks',
        reason:
          'Spacing adds unnecessary complexity when the task is simple and non-recurring',
        consequence:
          'Users feel patronized or frustrated by drawn-out explanations of obvious features',
        alternative:
          'Use inline help or single-step tooltips for simple, self-evident features',
      },
      {
        title: 'Notification Fatigue Contexts',
        reason:
          'Users already overwhelmed by notifications will disengage from spaced messages',
        consequence:
          'Increased unsubscribe rates, notification permissions revoked, negative brand perception',
        alternative:
          'Consolidate messages and let users control frequency preferences',
      },
      {
        title: 'Expert Users',
        reason:
          'Experienced users already familiar with concepts find spaced repetition condescending',
        consequence:
          'Power users feel slowed down and may abandon the product for faster alternatives',
        alternative:
          'Provide skip options or advanced mode that lets experts access all information at once',
      },
    ],

    commonMistakes: [
      {
        title: 'Front-Loading All Information',
        description:
          'Cramming every feature, tip, and tutorial into the first session or day-one onboarding',
        why: 'Users experience cognitive overload and retain almost nothing from information-dense first sessions',
        fix: 'Spread onboarding across 7-14 days, introducing one concept per touchpoint at optimal intervals',
      },
      {
        title: 'Spacing Too Widely',
        description:
          'Setting intervals so far apart that users forget the previous lesson entirely',
        why: 'If the gap is too long, the spacing benefit disappears because retrieval fails completely',
        fix: 'Start with shorter intervals (1-2 days) and gradually increase as knowledge solidifies',
      },
      {
        title: 'Uniform Spacing for All Content',
        description:
          'Using the same interval for simple and complex material alike',
        why: 'Simple concepts need fewer repetitions at longer intervals; complex concepts need more frequent review',
        fix: 'Adapt spacing intervals based on content difficulty and user performance signals',
      },
      {
        title: 'No Progress Tracking',
        description:
          'Repeating the same content without tracking what users have already mastered',
        why: 'Re-teaching mastered content wastes time and annoys users, while skipping weak areas leaves gaps',
        fix: 'Track user comprehension through engagement signals, quizzes, or feature usage, and adapt content accordingly',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout supports spacing by revealing content progressively over time',
        examples: [
          'Progressive disclosure panels that unlock additional sections over multiple sessions',
          'Dashboard widgets that introduce new data views across successive logins',
          'Onboarding checklists that surface one task per day rather than all at once',
          'Tutorial overlays that highlight different UI regions on each visit',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography can signal new vs. reviewed content in spaced learning',
        examples: [
          'New content styled with emphasis to distinguish from previously seen material',
          'Fading or muted styles for already-mastered items in review sequences',
          'Progress indicators using typographic weight to show mastery levels',
          'Consistent heading hierarchy across spaced lessons for cognitive continuity',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding can reinforce spacing phases and mastery states',
        examples: [
          'Green for mastered items, yellow for due-for-review, red for overdue in spaced repetition',
          'Color-coded progress bars showing spacing schedule completion',
          'Subtle background color changes to signal new learning session vs. review session',
          'Streak indicators using color intensity to show spacing consistency',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction timing and pacing are the primary mechanism for implementing spacing',
        examples: [
          'Timed tooltip sequences that introduce features across multiple sessions',
          'Spaced notification schedules optimized for memory retention curves',
          'Interactive quizzes that resurface at increasing intervals based on performance',
          'Contextual prompts that appear only when the user returns after a spacing interval',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content sequencing and repetition strategy determine spacing effectiveness',
        examples: [
          'Drip email sequences that build on previous lessons with spaced intervals',
          'In-app messages that revisit key concepts with new examples each session',
          'Tutorial content chunked into digestible lessons with built-in review',
          'Help documentation structured for progressive discovery over multiple visits',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Spacing strategies must accommodate different learning speeds and abilities',
        examples: [
          'User-adjustable spacing intervals for different learning paces',
          'Multiple modalities (visual, auditory, text) across spaced sessions for inclusive learning',
          'Screen reader announcements that clearly distinguish new content from review content',
          'Keyboard-navigable progress indicators showing position in spaced learning sequence',
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
        title: 'Spaced Repetition Language Learning',
        description:
          'Language app using algorithmically-timed review sessions for vocabulary retention',
        code: `<div class="lesson-session">
  <h3>Daily Review</h3>
  <div class="review-queue">
    <div class="card due-now">
      <p class="word">Bonjour</p>
      <p class="last-seen">Last reviewed: 3 days ago</p>
      <p class="next-review">Optimal review: Today</p>
      <div class="difficulty-buttons">
        <button class="hard">Hard (review in 1 day)</button>
        <button class="good">Good (review in 7 days)</button>
        <button class="easy">Easy (review in 14 days)</button>
      </div>
    </div>
  </div>
  <div class="session-stats">
    <span>5 cards due today</span>
    <span>Streak: 12 days</span>
    <span>Retention rate: 91%</span>
  </div>
</div>`,
        explanation:
          'The app schedules reviews at increasing intervals based on how well the user knows each item. Easy items are spaced further apart; difficult items are reviewed sooner. This optimizes retention while minimizing study time.',
        principle:
          'Algorithmically optimized spacing intervals maximize retention per minute of study time',
        metrics: {
          before: '23% vocabulary retention after 30 days with massed study',
          after: '87% vocabulary retention after 30 days with spaced repetition',
          improvement: '278% increase in long-term retention',
        },
      },
      {
        title: 'Progressive Onboarding Drip Campaign',
        description:
          'SaaS product introducing features gradually over two weeks via email',
        code: `<div class="onboarding-timeline">
  <div class="step completed">
    <span class="day">Day 1</span>
    <h4>Welcome & Core Setup</h4>
    <p>Set up your workspace and invite your first teammate</p>
    <span class="status">Completed</span>
  </div>
  <div class="step completed">
    <span class="day">Day 3</span>
    <h4>Create Your First Project</h4>
    <p>Learn to organize work with projects and tasks</p>
    <span class="status">Completed</span>
  </div>
  <div class="step active">
    <span class="day">Day 7</span>
    <h4>Automate Repetitive Work</h4>
    <p>Set up your first automation to save 2+ hours/week</p>
    <span class="status">Today's lesson</span>
  </div>
  <div class="step upcoming">
    <span class="day">Day 14</span>
    <h4>Advanced Reporting</h4>
    <p>Build dashboards to track team performance</p>
    <span class="status">Coming soon</span>
  </div>
</div>`,
        explanation:
          'Each feature is introduced days apart, giving users time to practice and internalize the previous lesson before moving on. The spacing allows real usage between touchpoints, reinforcing learning through application.',
        principle:
          'Spaced onboarding touchpoints allow practice and consolidation between lessons',
        metrics: {
          before: '18% feature adoption with day-1 feature tour covering all features',
          after: '52% feature adoption with 14-day drip onboarding campaign',
          improvement: '189% increase in feature adoption through spaced education',
        },
      },
      {
        title: 'Spaced Feature Tutorial Tooltips',
        description:
          'App that introduces contextual tips spread across multiple user sessions',
        code: `<div class="contextual-tip" data-session="3">
  <div class="tip-header">
    <span class="tip-badge">Tip 3 of 8</span>
    <span class="tip-progress">
      <span class="dot completed"></span>
      <span class="dot completed"></span>
      <span class="dot active"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </span>
  </div>
  <h4>Keyboard Shortcuts</h4>
  <p>Press <kbd>Cmd+K</kbd> to open the command palette
  and access any action instantly.</p>
  <div class="tip-actions">
    <button class="try-it">Try it now</button>
    <button class="dismiss">Got it</button>
  </div>
</div>`,
        explanation:
          'Only one tip is shown per session, with a progress indicator showing the overall learning journey. Users are not overwhelmed and each tip gets full attention. The spacing between sessions allows the previous tip to be practiced before the next is introduced.',
        principle:
          'One concept per session with progress visibility maximizes retention and reduces overwhelm',
      },
    ],

    bad: [
      {
        title: 'Feature Dump on First Launch',
        description:
          'App showing every feature in a 15-step tour on the very first session',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-tour">
  <div class="tour-overlay">
    <h3>Welcome! Let's show you EVERYTHING!</h3>
    <p>Step 1 of 15</p>
    <div class="tour-content">
      <p>Here's the dashboard, and over here are your projects,
      and this button creates tasks, and here's the calendar,
      and these are automations, and this is reporting,
      and here's team management, and here's settings...</p>
    </div>
    <div class="tour-progress">
      <span>1</span><span>2</span><span>3</span><span>4</span>
      <span>5</span><span>6</span><span>7</span><span>8</span>
      <span>9</span><span>10</span><span>11</span><span>12</span>
      <span>13</span><span>14</span><span>15</span>
    </div>
    <button>Next (14 more steps...)</button>
  </div>
</div>`,
        explanation:
          'Cramming 15 feature explanations into a single first-launch tour overwhelms users. Research shows users retain less than 10% of massed information. Most users will skip or rush through, learning nothing.',
        principle:
          'Massed presentation causes cognitive overload and near-zero retention for later items',
      },
      {
        title: 'All Training Modules Required Day One',
        description:
          'Enterprise app forcing users to complete every training module before accessing the product',
        code: `<!-- DON'T DO THIS -->
<div class="mandatory-training">
  <h2>Complete All Training Before You Start</h2>
  <div class="training-list">
    <div class="module">Module 1: Basics (15 min)</div>
    <div class="module">Module 2: Projects (20 min)</div>
    <div class="module">Module 3: Tasks (15 min)</div>
    <div class="module">Module 4: Team Management (25 min)</div>
    <div class="module">Module 5: Reporting (20 min)</div>
    <div class="module">Module 6: Integrations (15 min)</div>
    <div class="module">Module 7: Advanced Settings (20 min)</div>
  </div>
  <p class="total-time">Total estimated time: 2 hours 10 minutes</p>
  <p class="warning">You must complete all modules to access the app.</p>
</div>`,
        explanation:
          'Forcing 2+ hours of training in a single session violates the spacing effect. Users will rush through to gain access, retain almost nothing, and then struggle with the actual product. This creates frustration and support burden.',
        principle:
          'Massed training sessions produce minimal long-term retention regardless of duration',
      },
      {
        title: 'Notification Barrage on Day One',
        description:
          'App sending every tip, suggestion, and tutorial in the first 24 hours',
        code: `<!-- DON'T DO THIS -->
<div class="notification-stack">
  <div class="notification">
    <span class="time">9:00 AM</span>
    <p>Welcome! Here's how to create your first project...</p>
  </div>
  <div class="notification">
    <span class="time">9:15 AM</span>
    <p>Did you know you can invite teammates?</p>
  </div>
  <div class="notification">
    <span class="time">9:30 AM</span>
    <p>Try our automation feature to save time!</p>
  </div>
  <div class="notification">
    <span class="time">10:00 AM</span>
    <p>Set up integrations with your favorite tools!</p>
  </div>
  <div class="notification">
    <span class="time">10:30 AM</span>
    <p>Have you tried the reporting dashboard?</p>
  </div>
  <div class="notification">
    <span class="time">11:00 AM</span>
    <p>Pro tip: Use keyboard shortcuts for faster work!</p>
  </div>
</div>`,
        explanation:
          'Six notifications in three hours creates notification fatigue and teaches users to ignore your messages entirely. Each subsequent notification gets less attention. Users may disable notifications altogether, eliminating future engagement opportunities.',
        principle:
          'Massed notifications train users to ignore rather than engage with your content',
      },
    ],

    realWorld: [
      {
        company: 'Duolingo',
        product: 'Spaced Repetition Algorithm',
        url: 'https://www.duolingo.com',
        description: 'Duolingo uses a sophisticated spaced repetition algorithm to schedule vocabulary reviews at optimal intervals. Words you know well are reviewed less frequently, while difficult words resurface sooner. The daily lesson structure encourages consistent spaced practice.',
        effectiveness: 'very-effective',
        analysis: 'Duolingo\'s spacing algorithm is central to their learning effectiveness. By combining spaced repetition with streak mechanics and daily reminders, they maintain engagement while optimizing retention. Their research shows spaced learners retain 3-4x more vocabulary than massed learners.',
      },
      {
        company: 'Anki',
        product: 'Flashcard Spacing System',
        url: 'https://apps.ankiweb.net',
        description: 'Anki is built entirely around the spacing effect, using the SM-2 algorithm to calculate optimal review intervals for each flashcard. Cards are scheduled based on individual performance history, with intervals ranging from minutes to months.',
        effectiveness: 'very-effective',
        analysis: 'Anki is the gold standard for spaced repetition software. Medical students, language learners, and professionals use it to memorize vast amounts of information with minimal daily study time. The adaptive scheduling ensures no time is wasted reviewing already-mastered material.',
      },
      {
        company: 'Intercom',
        product: 'Drip Message Campaigns',
        url: 'https://www.intercom.com',
        description: 'Intercom enables SaaS companies to build drip onboarding sequences that send targeted in-app messages and emails spaced over days and weeks. Messages are triggered by user behavior and time intervals, introducing features progressively.',
        effectiveness: 'effective',
        analysis: 'Intercom\'s drip campaign tools embody the spacing effect for product onboarding. By spacing educational messages across the user journey rather than front-loading them, their customers see significantly higher feature adoption and activation rates.',
      },
      {
        company: 'HubSpot',
        product: 'Email Sequence Workflows',
        url: 'https://www.hubspot.com',
        description: 'HubSpot\'s email sequence tools allow marketers to create spaced nurture campaigns that educate prospects over weeks. Each email builds on the previous one, with configurable delays between messages optimized for engagement.',
        effectiveness: 'effective',
        analysis: 'HubSpot\'s sequence tools apply the spacing effect to marketing education and lead nurturing. Spaced email sequences consistently outperform batch sends in open rates, click-through rates, and conversion, because each message benefits from the consolidation period between sends.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Day-1 Tour vs 14-Day Drip Campaign',
        hypothesis:
          'Spacing onboarding across 14 days will increase feature adoption compared to a single day-1 tour',
        controlVersion: {
          description:
            'Full product tour on first login: 12-step walkthrough covering all major features in one session (approximately 8 minutes)',
          metrics: {
            conversionRate: '18%',
            timeOnPage: '8:12',
            scrollDepth: '100%',
          },
        },
        treatmentVersion: {
          description:
            'Spaced onboarding: one feature introduced per session across 14 days via contextual tooltips and drip emails, each taking about 1 minute',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '1:15 per session',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The spaced onboarding campaign nearly tripled feature adoption (18% to 52%). Users in the drip group could accurately recall and use features 30 days later, while day-1 tour users had forgotten most features within a week. Total time investment was similar but distributed more effectively.',
          learnings: [
            'Spaced onboarding produces dramatically better long-term retention than massed tours',
            'Users prefer shorter, contextual lessons over long upfront tours',
            'Feature usage correlates strongly with spaced introduction timing',
            'Day-1 tour users showed 68% skip rate by step 8 of 12',
          ],
        },
      },
      {
        title: 'Notification Timing: Daily vs Spaced Intervals',
        hypothesis:
          'Increasing spacing intervals for educational notifications will improve engagement and retention',
        controlVersion: {
          description:
            'Daily tip notifications sent every 24 hours for 10 consecutive days',
          metrics: {
            conversionRate: '12%',
            clickThroughRate: '8%',
          },
        },
        treatmentVersion: {
          description:
            'Spaced tip notifications at expanding intervals: Day 1, Day 3, Day 7, Day 14, Day 21, Day 30 (6 tips total instead of 10)',
          metrics: {
            conversionRate: '31%',
            clickThroughRate: '22%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Despite sending fewer notifications (6 vs 10), the spaced group had 158% higher conversion and 175% higher click-through rate. Users did not develop notification fatigue and each message received genuine attention. Unsubscribe rate was 3x lower in the spaced group.',
          learnings: [
            'Fewer, well-spaced notifications outperform frequent daily notifications',
            'Expanding intervals match the memory consolidation curve',
            'Notification fatigue is a real threat that spacing mitigates',
            'Users rated spaced notifications as "helpful" vs daily ones as "annoying"',
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
        name: 'Onboarding Timeline',
        description: 'Multi-day or multi-session onboarding schedules with visible progression',
        howToSpot: 'Look for day markers, session numbers, or timeline visuals in onboarding flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Drip Campaign Indicators',
        description: 'Sequenced emails or notifications with time-based triggers',
        howToSpot: 'Check email or notification settings for scheduled sequences with delays between messages',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Progressive Feature Unlocks',
        description: 'Features or content revealed over multiple sessions rather than all at once',
        howToSpot: 'Look for locked items, "coming in next session" labels, or phased rollout indicators',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Review Scheduling UI',
        description: 'Interfaces showing when items are due for review or practice',
        howToSpot: 'Look for due dates, review queues, or interval indicators in learning interfaces',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Streak and Consistency Trackers',
        description: 'Visual indicators encouraging regular, spaced engagement',
        howToSpot: 'Look for streak counters, daily check-in prompts, or calendar-based progress visualizations',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Spaced Onboarding Pattern',
        description: 'Onboarding content distributed across multiple sessions or days rather than presented all at once',
        indicators: ['Multi-day onboarding timelines', 'One feature per session introductions', 'Drip email sequences triggered by signup date', 'Progressive tutorial unlocks'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Spaced Repetition Algorithm Pattern',
        description: 'Adaptive scheduling that resurfaces content at expanding intervals based on user performance',
        indicators: ['Review queues with variable intervals', 'Difficulty-based scheduling adjustments', 'Retention-optimized timing', 'Performance-adaptive content surfacing'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Notification Spacing Pattern',
        description: 'Educational or engagement notifications sent at deliberate intervals rather than in bursts',
        indicators: ['Expanding delay between messages', 'Behavior-triggered spacing', 'Configurable notification frequency', 'Anti-fatigue throttling'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Massed Presentation Anti-Pattern',
        description: 'All information presented in a single overwhelming session, indicating spacing is NOT being used',
        indicators: ['15+ step onboarding tours', 'All features shown on first login', 'Multiple notifications in rapid succession', 'Mandatory lengthy training before access'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Is onboarding content distributed across multiple sessions or crammed into one?',
      'Are educational notifications spaced over days/weeks or sent in rapid succession?',
      'Does the product introduce features progressively or all at once?',
      'Are there mechanisms to resurface previously taught concepts for review?',
      'Do spacing intervals adapt based on user performance or engagement?',
      'Is there a visible learning timeline or progression indicator?',
      'Can users control the pacing of educational content?',
      'Are reminder notifications timed based on memory retention curves?',
      'Is there evidence of notification fatigue from too-frequent messaging?',
      'Does the design allow time for practice between learning sessions?',
      'Are complex concepts broken into smaller chunks delivered over multiple sessions?',
      'Is there a mechanism to detect and skip already-mastered material?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the spacing effect and spaced repetition.

Analyze the provided design for spacing effect patterns. Identify:

1. **Onboarding Timing**: How learning content is distributed across sessions and time
2. **Notification Spacing**: How educational or engagement messages are timed
3. **Progressive Disclosure**: Whether features are introduced gradually or all at once
4. **Review Mechanisms**: Whether the design resurfaces content for spaced review
5. **Interval Optimization**: Whether spacing intervals are optimized for retention

For each pattern found:
- Identify whether the design uses effective spacing or falls into massed presentation
- Assess the spacing intervals and whether they align with retention research
- Determine if the pacing accommodates different learning speeds
- Evaluate whether users can control their own spacing preferences
- Suggest improvements for retention-optimized spacing

Consider:
- Is onboarding content crammed into the first session or spaced across days?
- Are notifications spaced at intervals that optimize retention, or do they cause fatigue?
- Does the design allow consolidation time between learning moments?
- Are there mechanisms to adapt spacing based on user performance?
- Is the spacing accessible and inclusive for users with different learning needs?

Provide actionable recommendations for implementing effective spacing strategies.`,

    outputSchema: {
      type: 'object',
      properties: {
        spacingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentSpacing: { type: 'string' },
              optimalSpacing: { type: 'string' },
              retentionImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'currentSpacing',
              'retentionImpact',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            spacingQuality: { type: 'number' },
            onboardingDistribution: { type: 'number' },
            notificationPacing: { type: 'number' },
            retentionOptimization: { type: 'number' },
          },
          required: [
            'spacingQuality',
            'onboardingDistribution',
            'notificationPacing',
            'retentionOptimization',
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
        'spacingPatterns',
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
        title: 'Identify What Needs to Be Retained',
        description:
          'Determine which information, features, or behaviors users need to remember long-term',
        example:
          'Goal: Users should remember how to use the 5 core features within 30 days of signup',
        tips: [
          'Prioritize features with the highest impact on user success',
          'Distinguish between one-time tasks (no spacing needed) and recurring knowledge',
          'Map the full set of concepts users need to learn in their first month',
        ],
      },
      {
        step: 2,
        title: 'Design the Spacing Schedule',
        description:
          'Create a timeline that distributes learning across multiple sessions with expanding intervals',
        example:
          'Day 1: Core setup, Day 3: First project, Day 7: Automation, Day 14: Reporting, Day 30: Advanced features',
        tips: [
          'Start with shorter intervals (1-3 days) and expand gradually',
          'Follow the Ebbinghaus forgetting curve: review before memory fades completely',
          'Keep each session focused on a single concept or feature',
        ],
      },
      {
        step: 3,
        title: 'Build Review Mechanisms',
        description:
          'Create touchpoints that reinforce previously taught concepts alongside new material',
        example:
          'Each weekly email references the previous lesson before introducing the new topic',
        tips: [
          'Include brief recaps of previous lessons in each new session',
          'Use contextual reminders when users are in relevant workflows',
          'Track which concepts need reinforcement based on usage patterns',
        ],
      },
      {
        step: 4,
        title: 'Implement Adaptive Spacing',
        description:
          'Adjust spacing intervals based on individual user performance and engagement',
        example:
          'If a user hasn\'t used the feature taught on Day 3, send a reminder on Day 5 before moving to the Day 7 lesson',
        tips: [
          'Monitor feature usage as a proxy for comprehension',
          'Shorten intervals for struggling users, lengthen for advanced users',
          'Allow users to request more or less frequent touchpoints',
        ],
      },
      {
        step: 5,
        title: 'Measure Retention Outcomes',
        description:
          'Track whether spaced delivery actually improves long-term retention and feature adoption',
        example:
          'Compare 30-day feature usage between users who received spaced vs massed onboarding',
        tips: [
          'Measure retention at 7, 14, 30, and 90 days post-introduction',
          'Track both recall (can they find the feature?) and usage (do they use it?)',
          'A/B test different spacing intervals to find optimal timing for your product',
        ],
      },
    ],

    dos: [
      'Distribute onboarding across multiple sessions over days or weeks',
      'Start with shorter intervals and gradually expand as knowledge solidifies',
      'Include brief reviews of previous material in each new learning session',
      'Adapt spacing intervals based on individual user performance',
      'Keep each learning touchpoint focused on a single concept',
      'Allow users to control the pacing of their learning experience',
      'Use contextual triggers to deliver lessons when they are most relevant',
      'Track retention metrics to validate your spacing strategy',
    ],

    donts: [
      'Don\'t cram all features into a single first-launch onboarding tour',
      'Don\'t send all educational notifications in the first 24 hours',
      'Don\'t use uniform spacing intervals for content of varying difficulty',
      'Don\'t force users to complete all training before accessing the product',
      'Don\'t ignore signs of notification fatigue from too-frequent messaging',
      'Don\'t assume one spacing schedule works for all user segments',
      'Don\'t skip review and reinforcement of previously introduced concepts',
      'Don\'t space content so widely that users forget the previous lesson entirely',
    ],

    bestPractices: [
      {
        title: 'Follow the Forgetting Curve',
        description:
          'Schedule reviews just before the point where users would forget the material',
        rationale:
          'Ebbinghaus\'s forgetting curve shows memory decays exponentially; reviewing at the inflection point maximizes retention per review session',
        example:
          'Review after 1 day, then 3 days, then 7 days, then 14 days, then 30 days',
      },
      {
        title: 'One Concept Per Session',
        description:
          'Limit each learning touchpoint to a single feature or concept',
        rationale:
          'Focused sessions prevent interference between concepts and allow each to be fully encoded before the next is introduced',
        example:
          'Monday email teaches project creation; Thursday email teaches task management; next Monday teaches automation',
      },
      {
        title: 'Interleave Review with New Material',
        description:
          'Each session should briefly revisit previous concepts before introducing new ones',
        rationale:
          'Interleaving strengthens retrieval pathways and helps users build connections between concepts',
        example:
          'Day 7 email: "Last week you set up your first project. Now let\'s automate your workflow within it."',
      },
      {
        title: 'Use Contextual Triggers',
        description:
          'Deliver spaced lessons when users are in the relevant context, not on a rigid schedule',
        rationale:
          'Learning is most effective when it can be immediately applied; contextual delivery enables instant practice',
        example:
          'Show the "automation" tooltip when the user is manually repeating a task for the third time',
      },
      {
        title: 'Provide User Control Over Pacing',
        description:
          'Let users speed up, slow down, or skip parts of the spaced learning sequence',
        rationale:
          'Different users learn at different speeds; forced pacing frustrates both fast and slow learners',
        example:
          'Include "Show me everything" option for power users and "Slow down" for those who need more time',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure spaced learning progress is semantically conveyed',
        implementation:
          'Use proper ARIA progress indicators and semantic HTML to convey learning stage, completion status, and upcoming sessions to assistive technologies',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Allow users to control the timing of spaced content delivery',
        implementation:
          'Provide settings for notification frequency, session pacing, and the ability to pause or resume spaced learning sequences',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.5',
        guideline:
          'Help - Context-sensitive help available for spaced learning content',
        implementation:
          'Ensure users can access previously shown tips and tutorials on demand, not only when the spacing schedule surfaces them',
      },
    ],

    ethics: [
      {
        concern: 'Manipulative Engagement Loops',
        severity: 'high',
        explanation:
          'Using spaced notifications primarily to drive engagement metrics rather than genuine learning',
        mitigation:
          'Ensure every spaced touchpoint provides genuine educational value. Measure learning outcomes, not just opens and clicks.',
      },
      {
        concern: 'Withholding Critical Information',
        severity: 'critical',
        explanation:
          'Spacing out information that users need immediately (e.g., safety instructions, terms of service changes)',
        mitigation:
          'Never space critical or time-sensitive information. Apply spacing only to educational and progressive learning content.',
      },
      {
        concern: 'Notification Fatigue and Annoyance',
        severity: 'medium',
        explanation:
          'Even well-spaced notifications can become unwelcome if users didn\'t opt in or can\'t opt out',
        mitigation:
          'Always provide clear unsubscribe and frequency controls. Respect user preferences and reduce frequency for disengaged users.',
      },
      {
        concern: 'Forced Pacing Excluding Users',
        severity: 'high',
        explanation:
          'Rigid spacing schedules that prevent eager learners from progressing or slow learners from catching up',
        mitigation:
          'Allow users to accelerate, decelerate, or access all content on demand while maintaining recommended spacing as default.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Memory: A Contribution to Experimental Psychology',
        author: 'Ebbinghaus, H.',
        year: 1885,
        description:
          'The foundational work that discovered the spacing effect and the forgetting curve through systematic self-experimentation',
        type: 'foundational',
      },
      {
        title: 'Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention',
        author: 'Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H.',
        year: 2006,
        doi: '10.1111/j.1467-9280.2006.01693.x',
        description:
          'Comprehensive study determining optimal spacing intervals for different retention periods, providing practical scheduling guidelines',
        type: 'advanced',
      },
      {
        title: 'Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis',
        author: 'Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D.',
        year: 2006,
        doi: '10.1037/0033-2909.132.3.354',
        description:
          'Meta-analysis of 254 studies confirming the robustness of the spacing effect across diverse learning contexts',
        type: 'foundational',
      },
      {
        title: 'Making Things Hard on Yourself, But in a Good Way: Creating Desirable Difficulties to Enhance Learning',
        author: 'Bjork, E. L., & Bjork, R. A.',
        year: 2011,
        description:
          'Explores how spacing creates "desirable difficulty" that strengthens long-term memory despite feeling harder in the moment',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Make It Stick: The Science of Successful Learning',
        author: 'Brown, P. C., Roediger, H. L., & McDaniel, M. A.',
        year: 2014,
        isbn: '9780674729018',
        description:
          'Practical guide to applying spaced practice and other evidence-based learning strategies',
        type: 'practical',
      },
      {
        title: 'How We Learn: The Surprising Truth About When, Where, and Why It Happens',
        author: 'Carey, Benedict',
        year: 2014,
        isbn: '9780812984293',
        description:
          'Accessible overview of the spacing effect and its implications for everyday learning',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Spaced Repetition: A Guide to the Technique',
        author: 'Gwern Branwen',
        url: 'https://www.gwern.net/Spaced-repetition',
        description:
          'Comprehensive guide to spaced repetition research and practical implementation',
        type: 'practical',
      },
      {
        title: 'The Spacing Effect: How to Improve Learning and Maximize Retention',
        author: 'Farnam Street',
        url: 'https://fs.blog/spacing-effect/',
        description:
          'Accessible introduction to the spacing effect with practical applications',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How to Remember More of What You Learn with Spaced Repetition',
        author: 'Thomas Frank',
        url: 'https://www.youtube.com/watch?v=Z-zNHHpXoMM',
        description:
          'Practical video guide to applying spaced repetition for learning and retention',
        type: 'practical',
      },
    ],

    demos: [
      {
        title: 'Nicky Case - How to Remember Anything Forever-ish',
        author: 'Nicky Case',
        url: 'https://ncase.me/remember/',
        description:
          'Interactive comic explaining spaced repetition with a hands-on demonstration',
        type: 'practical',
      },
    ],
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
