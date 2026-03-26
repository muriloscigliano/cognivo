/**
 * PROCRASTINATION BIAS
 *
 * We delay tasks despite knowing it will make things worse
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const procrastinationBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'procrastination-bias',
    name: 'Procrastination Bias',
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
    simple: 'We delay tasks despite knowing it will make things worse',

    detailed: `Procrastination bias is the systematic tendency to delay important tasks in favor of less important but more immediately satisfying ones, even when we know the delay will lead to worse outcomes. It reflects a failure of self-regulation where present-biased preferences override long-term goals.

This bias is driven by temporal discounting: future rewards feel less valuable than immediate ones, and future costs feel less painful than present ones. The result is that people chronically postpone effortful tasks—filing taxes, starting a project, scheduling a health checkup—substituting easy, low-value activities instead.

In product and UX design, procrastination bias directly affects task completion rates, onboarding flows, subscription renewals, and any workflow requiring sustained effort. Designers who understand procrastination can break large tasks into small steps, create momentum through progress indicators, and use timely nudges to help users follow through on their own intentions.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Procrastination arises from the interplay of temporal discounting, task aversion, and impaired self-regulation. This happens because:

1. **Temporal Discounting**: The brain heavily discounts future rewards, making distant benefits feel less motivating than immediate comfort
2. **Task Aversion**: Tasks perceived as difficult, boring, or ambiguous trigger negative emotions that the brain seeks to avoid
3. **Intention-Action Gap**: People form genuine intentions to act but fail to translate them into behavior when the moment arrives
4. **Present Bias**: Immediate gratification from avoiding effort outweighs the abstract cost of future consequences
5. **Optimism About Future Self**: People assume their future self will be more motivated, disciplined, or have more time

The mechanism is largely automatic—the emotional avoidance response kicks in before rational planning can override it, leading to repeated cycles of delay.`,
    },

    realWorldExample: `Students consistently delay studying for exams despite knowing they perform worse when cramming. Research by Steel (2007) found that 80-95% of college students procrastinate, with the average student losing about 1/3 of their day to procrastination. Even when students set specific study schedules, the intention-action gap causes them to substitute low-effort activities (social media, cleaning, snacking) until deadline pressure finally overrides the avoidance response.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Procrastination bias affects how users approach tasks that require effort, commitment, or multiple steps. Users chronically delay onboarding, form completion, subscription management, and goal-oriented workflows. Designers can counter this by:

- Breaking large tasks into small, immediately actionable steps
- Creating momentum through progress indicators and streaks
- Using deadline reminders and countdown timers to make future costs feel present
- Providing "just do 5 minutes" low-commitment entry points
- Rewarding task initiation, not just completion
- Reducing perceived effort through smart defaults and pre-filled data`,

    whenToUse: [
      {
        title: 'Task Breakdown',
        scenario:
          'When users face a large, complex task that feels overwhelming',
        example:
          'Break "Complete your profile" into 5 micro-steps with individual progress bars: add photo, write bio, set preferences, connect accounts, verify email',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Streak and Momentum Builders',
        scenario: 'When users need to maintain consistent engagement over time',
        example:
          'Show a streak counter ("7 days in a row!") and visualize progress chains that users feel reluctant to break',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Deadline Reminders',
        scenario: 'When tasks have deadlines that users tend to forget or ignore until too late',
        example:
          'Send progressive urgency reminders: "Tax filing due in 30 days" then "15 days" then "3 days left — most people need 2 hours to complete"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Low-Commitment Entry Points',
        scenario: 'When users avoid starting because the full task feels too large',
        example:
          'Offer a "Just 5 minutes" mode that lowers the barrier to starting, knowing that once started, most users continue',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Smart Defaults and Pre-fills',
        scenario: 'When form completion or setup tasks create friction that leads to delay',
        example:
          'Pre-fill forms with sensible defaults so the user only needs to review and confirm rather than create from scratch',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'High-Stakes Irreversible Actions',
        reason:
          'Rushing users past procrastination on critical decisions can lead to poorly considered choices',
        consequence:
          'Users may make financial, legal, or health decisions without adequate reflection',
        alternative:
          'For irreversible decisions, provide decision aids and checklists rather than urgency nudges',
      },
      {
        title: 'Guilt-Based Pressure',
        reason:
          'Shaming users for delays creates negative associations with the product',
        consequence:
          'Users feel anxious, avoid the product entirely, or churn from negative emotional associations',
        alternative:
          'Use encouraging, forward-looking language: "Pick up where you left off" instead of "You haven\'t logged in for 14 days"',
      },
      {
        title: 'Artificial Urgency',
        reason:
          'Creating fake deadlines or false scarcity to push action is manipulative',
        consequence:
          'Users lose trust when they realize urgency was manufactured, damaging long-term retention',
        alternative:
          'Use real deadlines and genuine consequences; be transparent about timing',
      },
      {
        title: 'Cognitive Overload Contexts',
        reason:
          'Anti-procrastination nudges can overwhelm users who are already stressed',
        consequence:
          'Additional pressure on overloaded users increases avoidance rather than action',
        alternative:
          'Detect user state and reduce notifications when engagement signals suggest overwhelm',
      },
    ],

    commonMistakes: [
      {
        title: 'Overwhelming Task Lists',
        description:
          'Presenting users with long, undifferentiated task lists that make everything feel equally urgent',
        why: 'Long lists trigger task aversion — the brain sees the total effort and shuts down',
        fix: 'Prioritize ruthlessly, show only 1-3 next actions, and hide the rest behind progressive disclosure',
      },
      {
        title: 'No Prioritization Signals',
        description:
          'Failing to indicate which tasks matter most or which to do first',
        why: 'Without clear priority, users default to easiest tasks or avoid choosing entirely',
        fix: 'Add priority flags, suggested order, or "Start here" indicators to guide action',
      },
      {
        title: 'Distant Deadlines Without Milestones',
        description:
          'Showing a deadline far in the future with no intermediate checkpoints',
        why: 'Distant deadlines feel abstract and non-urgent, triggering "I\'ll do it later" responses',
        fix: 'Break deadlines into milestones: "Week 1: Research, Week 2: Draft, Week 3: Review"',
      },
      {
        title: 'Ignoring Task Initiation',
        description:
          'Focusing all rewards and feedback on task completion rather than task starting',
        why: 'The hardest part of procrastination is starting — completion rewards don\'t help overcome the initiation barrier',
        fix: 'Celebrate starting: "Great, you\'ve begun! Here\'s your first step..." with immediate positive feedback',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether tasks feel approachable or overwhelming',
        examples: [
          'Single-column task flows feel less overwhelming than grid layouts with many options',
          'Progressive disclosure hides complexity until the user is ready',
          'Prominent "next action" placement reduces decision paralysis',
          'Whitespace around tasks reduces visual overwhelm and perceived effort',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text presentation affects perceived effort and urgency',
        examples: [
          'Short, action-oriented labels ("Add photo" vs "Complete profile photo upload") reduce perceived effort',
          'Time estimates in task headers ("2 min") lower the barrier to starting',
          'Bold next-action text draws attention to the immediate step',
          'Smaller text for completed steps creates a sense of forward progress',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals urgency, progress, and priority to counter procrastination',
        examples: [
          'Progress bar colors shifting from red to green reinforce momentum',
          'Warm urgency colors on approaching deadlines make future costs feel present',
          'Muted colors on completed items create visual reward for progress',
          'Priority color coding helps users identify what to do next',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns directly determine whether users start, continue, or abandon tasks',
        examples: [
          'One-click task initiation reduces the friction that enables procrastination',
          'Auto-save removes the fear of losing progress that discourages starting',
          'Inline editing eliminates the "open a new screen" barrier',
          'Undo support reduces anxiety about making mistakes, encouraging action',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing shapes whether tasks feel approachable or daunting',
        examples: [
          '"Just 5 minutes" framing makes tasks feel low-commitment',
          'Showing time estimates ("Takes about 3 min") reduces uncertainty that fuels delay',
          'Success stories from peers create social motivation to act',
          'Concrete next-step instructions eliminate ambiguity that triggers avoidance',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design reduces friction that disproportionately affects users who already struggle with task initiation',
        examples: [
          'Keyboard shortcuts for quick task actions reduce effort barriers',
          'Screen reader-friendly progress indicators keep momentum visible for all users',
          'Clear focus management guides users through multi-step tasks without confusion',
          'Reduced motion alternatives maintain progress feedback without distraction',
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
        title: 'Micro-Step Task Breakdown',
        description:
          'Onboarding flow that breaks profile completion into tiny, rewarding steps',
        code: `<div class="onboarding-steps">
  <h3>Set up your profile — Step 2 of 5</h3>
  <div class="progress-bar">
    <div class="progress-fill" style="width: 40%"></div>
  </div>
  <p class="time-estimate">About 1 minute</p>

  <div class="current-step">
    <h4>Add a profile photo</h4>
    <p>People are 3x more likely to connect with you when you have a photo.</p>
    <button class="primary">Upload Photo</button>
    <button class="secondary">Skip for now</button>
  </div>

  <div class="completed-steps">
    <p class="done">✓ Name added</p>
  </div>
</div>`,
        explanation:
          'Breaking the full profile into 5 small steps with time estimates makes each step feel trivially easy. The progress bar creates momentum, and the skip option removes pressure while the social proof nudges action.',
        principle:
          'Small steps with visible progress overcome the initiation barrier that causes procrastination',
        metrics: {
          before: '23% completed full profile with single-page form',
          after: '67% completed full profile with micro-step flow',
          improvement: '191% increase in profile completion rate',
        },
      },
      {
        title: 'Streak-Based Momentum',
        description:
          'Learning app using streak visualization to maintain daily engagement',
        code: `<div class="streak-tracker">
  <h3>Your Learning Streak</h3>
  <div class="streak-display">
    <span class="streak-count">7</span>
    <span class="streak-label">days in a row!</span>
  </div>

  <div class="week-view">
    <span class="day completed">M</span>
    <span class="day completed">T</span>
    <span class="day completed">W</span>
    <span class="day completed">T</span>
    <span class="day completed">F</span>
    <span class="day completed">S</span>
    <span class="day completed today">S</span>
  </div>

  <div class="nudge">
    <p>Just 5 minutes keeps your streak alive!</p>
    <button class="primary">Start Today's Lesson</button>
  </div>
</div>`,
        explanation:
          'The streak visualization creates loss aversion — users don\'t want to break their chain. The "just 5 minutes" framing makes the commitment feel tiny, overcoming the initiation barrier.',
        principle:
          'Streaks leverage loss aversion to override procrastination, while low-commitment framing lowers the starting barrier',
        metrics: {
          before: '18% daily return rate without streak',
          after: '52% daily return rate with streak tracker',
          improvement: '189% increase in daily active engagement',
        },
      },
      {
        title: 'Progressive Deadline Reminders',
        description:
          'Tax preparation app with escalating urgency as deadline approaches',
        code: `<div class="deadline-reminder">
  <div class="urgency-banner warning">
    <div class="countdown">
      <span class="days-left">15</span>
      <span class="label">days until tax deadline</span>
    </div>
    <div class="effort-estimate">
      <p>Most people need <strong>2-3 hours</strong> to complete filing.</p>
      <p>You've completed <strong>2 of 6 sections</strong>.</p>
    </div>
    <div class="next-action">
      <p>Next: Enter your W-2 information (about 10 min)</p>
      <button class="primary">Continue Filing</button>
    </div>
  </div>
</div>`,
        explanation:
          'Combining countdown with effort estimate makes the deadline feel concrete. Showing completed progress creates momentum, while the specific next action with time estimate removes ambiguity.',
        principle:
          'Making future costs feel present and reducing ambiguity about next steps overcomes temporal discounting',
      },
    ],

    bad: [
      {
        title: 'Overwhelming Undifferentiated Task List',
        description:
          'Project management tool showing all tasks with no prioritization',
        code: `<!-- DON'T DO THIS -->
<div class="task-list">
  <h2>Your Tasks (47)</h2>
  <ul>
    <li>Update project documentation</li>
    <li>Review pull request #234</li>
    <li>Fix login bug</li>
    <li>Write Q3 report</li>
    <li>Schedule team meeting</li>
    <li>Update dependencies</li>
    <li>... 41 more tasks</li>
  </ul>
  <p class="footer">Due dates range from today to next month</p>
</div>`,
        explanation:
          'A flat list of 47 tasks with no priority, no grouping, and no clear starting point triggers overwhelming task aversion. Users see the total effort and immediately switch to something easier.',
        principle:
          'Undifferentiated task lists amplify procrastination by maximizing perceived effort and decision cost',
      },
      {
        title: 'Distant Deadline Without Milestones',
        description:
          'Course platform showing only the final due date weeks away',
        code: `<!-- DON'T DO THIS -->
<div class="course-assignment">
  <h3>Final Project</h3>
  <p>Write a 5,000-word research paper on your chosen topic.</p>
  <p class="due-date">Due: March 30 (6 weeks from now)</p>
  <button class="secondary">Start Writing</button>
</div>`,
        explanation:
          'A large task with a distant deadline and no intermediate milestones is procrastination fuel. "6 weeks" feels like plenty of time, so users delay until the last minute. No guidance on how to break the task down.',
        principle:
          'Distant deadlines without milestones exploit temporal discounting, making future costs feel negligible',
      },
      {
        title: 'Guilt-Based Re-engagement',
        description:
          'Fitness app shaming users for inactivity',
        code: `<!-- DON'T DO THIS -->
<div class="re-engagement">
  <h2>You've been gone for 14 days...</h2>
  <p>Your fitness goals aren't going to achieve themselves.</p>
  <p>You've lost all your progress. Your streak is at 0.</p>
  <div class="sad-graphic">
    <img src="disappointed-mascot.svg" alt="Sad mascot">
  </div>
  <button class="primary">Try Again</button>
</div>`,
        explanation:
          'Guilt and shame increase negative associations with the task, making future procrastination MORE likely, not less. Highlighting lost progress destroys motivation rather than building it.',
        principle:
          'Shame-based messaging amplifies the negative emotions that drive procrastination in the first place',
      },
    ],

    realWorld: [
      {
        company: 'Todoist',
        product: 'Priority Flags and Today View',
        url: 'https://todoist.com',
        description:
          'Todoist uses priority flags (P1-P4) with color coding and a focused "Today" view that shows only immediately relevant tasks. This prevents overwhelm from the full task list and guides users to the most important next action.',
        effectiveness: 'very-effective',
        analysis:
          'By filtering to a focused daily view with clear priority signals, Todoist reduces the decision cost that fuels procrastination. Users see 5-10 tasks instead of 50, making initiation feel manageable.',
      },
      {
        company: 'Habitica',
        product: 'Gamified Task Completion',
        url: 'https://habitica.com',
        description:
          'Habitica turns task completion into an RPG where completing tasks earns experience points, gold, and equipment for your avatar. Skipping tasks causes your character to lose health.',
        effectiveness: 'very-effective',
        analysis:
          'By making task completion immediately rewarding (XP, loot) and task avoidance immediately costly (health loss), Habitica reverses the temporal discounting that drives procrastination. Future benefits become present rewards.',
      },
      {
        company: 'Trello',
        product: 'Visual Kanban Progress',
        url: 'https://trello.com',
        description:
          'Trello\'s board layout provides visual progress as cards move from "To Do" to "In Progress" to "Done." The physical act of dragging cards creates a satisfying sense of accomplishment.',
        effectiveness: 'effective',
        analysis:
          'Visual progress tracking makes abstract task completion feel concrete and rewarding. The drag interaction provides immediate tactile feedback that reinforces task initiation.',
      },
      {
        company: 'Forest',
        product: 'Focus Timer',
        url: 'https://www.forestapp.cc',
        description:
          'Forest app plants a virtual tree when you start a focus session. If you leave the app before the timer ends, the tree dies. Over time, users grow a virtual forest representing their focused work.',
        effectiveness: 'very-effective',
        analysis:
          'Forest leverages loss aversion (don\'t kill the tree) and visible accumulation (growing forest) to make the abstract benefit of focus feel immediate and tangible. The commitment device of the timer overcomes the initiation barrier.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Single Page vs Micro-Steps',
        hypothesis:
          'Breaking onboarding into micro-steps with progress indicators will increase completion rates',
        controlVersion: {
          description:
            'Single-page onboarding form with 12 fields: name, email, photo, bio, preferences, etc.',
          metrics: {
            conversionRate: '23%',
            timeOnPage: '4:12',
            bounceRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Five-step wizard with 2-3 fields per step, progress bar, time estimates per step, and "skip for now" option on each step',
          metrics: {
            conversionRate: '67%',
            timeOnPage: '5:45',
            bounceRate: '12%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Micro-step onboarding nearly tripled completion rates. Despite taking longer total time, users were far more likely to start and continue. The "skip for now" option was used sparingly (8% of steps) but dramatically reduced abandonment.',
          learnings: [
            'Breaking large tasks into visible micro-steps overcomes the initiation barrier',
            'Time estimates per step reduce uncertainty that fuels procrastination',
            'Skip options reduce pressure and paradoxically increase completion',
            'Progress bars create momentum — users who complete step 2 almost always finish all 5',
          ],
        },
      },
      {
        title: 'Re-engagement: Guilt vs Encouragement',
        hypothesis:
          'Encouraging re-engagement messages will outperform guilt-based ones for returning lapsed users',
        controlVersion: {
          description:
            'Email: "You\'ve been away for 2 weeks. You\'re falling behind on your goals. Don\'t let your progress go to waste."',
          metrics: {
            clickThroughRate: '3.2%',
            conversionRate: '1.1%',
          },
        },
        treatmentVersion: {
          description:
            'Email: "Welcome back! Your workspace is right where you left it. Here\'s your next small step — it takes about 2 minutes."',
          metrics: {
            clickThroughRate: '11.4%',
            conversionRate: '7.8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Encouraging messages with a specific low-effort next step outperformed guilt-based messages by 7x on conversion. Guilt messages actually increased unsubscribe rates by 23%.',
          learnings: [
            'Guilt amplifies the negative emotions that drive procrastination',
            'Specific low-effort next steps overcome the initiation barrier',
            'Framing return as easy ("right where you left it") reduces perceived effort',
            'Shame-based messaging damages long-term relationship with the product',
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
        name: 'Overwhelming Task Display',
        description: 'Large, undifferentiated lists of tasks or action items without clear prioritization',
        howToSpot: 'Look for long lists without priority indicators, grouping, or suggested starting points',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Progress Indicators',
        description: 'Multi-step workflows or long-term tasks without visible progress tracking',
        howToSpot: 'Check for absence of progress bars, step counters, completion percentages, or streak indicators',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Distant Deadlines Without Milestones',
        description: 'Due dates shown far in the future with no intermediate checkpoints',
        howToSpot: 'Look for single deadline dates on large tasks without suggested milestones or weekly targets',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'High-Effort Entry Points',
        description: 'Task starting points that require significant commitment upfront',
        howToSpot: 'Check for large forms, complex setup flows, or tasks described without time estimates',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absence of Time Estimates',
        description: 'Tasks and actions presented without indicating how long they take',
        howToSpot: 'Look for buttons and task labels that lack duration information like "takes 2 min"',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Task Overwhelm Pattern',
        description: 'Interface presents too many undifferentiated tasks, triggering avoidance',
        indicators: ['More than 10 visible tasks without grouping', 'No priority flags or color coding', 'No "start here" or suggested next action', 'All tasks appear equally important'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Momentum Pattern',
        description: 'No mechanisms to build or maintain engagement momentum over time',
        indicators: ['No streak tracking or habit visualization', 'No progress accumulation display', 'No celebration of task initiation or completion', 'No re-engagement nudges for lapsed users'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Effort Ambiguity Pattern',
        description: 'Tasks presented without clear scope, making them feel larger than they are',
        indicators: ['No time estimates on tasks', 'No step counts for multi-step processes', 'No "quick win" identification', 'Large tasks not broken into sub-tasks'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Guilt-Based Motivation Pattern',
        description: 'Re-engagement or notification copy that shames users for inactivity',
        indicators: ['Language emphasizing failure or falling behind', 'Lost streak or progress highlighted negatively', 'Disappointed mascots or negative imagery', 'Comparison to other users\' activity'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are large tasks broken into small, visible steps with progress tracking?',
      'Is there a clear "next action" highlighted for the user at all times?',
      'Do tasks include time estimates to reduce effort uncertainty?',
      'Are there momentum builders like streaks, chains, or progress visualizations?',
      'Do deadlines include intermediate milestones for large tasks?',
      'Is there a low-commitment entry point ("just 5 minutes") for difficult tasks?',
      'Does the re-engagement messaging use encouragement rather than guilt?',
      'Are task lists prioritized with clear signals about what to do first?',
      'Is task initiation rewarded, not just completion?',
      'Does the interface reduce friction at task starting points (pre-fills, defaults, auto-save)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in procrastination bias and self-regulation failure.

Analyze the provided design for procrastination-inducing and procrastination-reducing patterns. Identify:

1. **Task Presentation**: How tasks are displayed — are they broken down, prioritized, and scoped?
2. **Effort Perception**: Does the design make tasks feel manageable or overwhelming?
3. **Momentum Mechanisms**: Are there streaks, progress bars, or accumulation displays?
4. **Initiation Friction**: How easy is it to start a task? Are there low-commitment entry points?
5. **Deadline Framing**: Are deadlines presented with milestones? Do they create appropriate urgency?
6. **Re-engagement Tone**: Do notifications and nudges use encouragement or guilt?

For each pattern found:
- Identify whether it increases or decreases procrastination
- Assess the severity of the impact on task completion
- Determine if anti-procrastination nudges are ethical and user-respecting
- Suggest improvements for helping users follow through on their intentions

Consider:
- Are tasks presented in a way that triggers avoidance?
- Is there a clear, low-effort next action visible at all times?
- Do progress indicators create momentum or feel performative?
- Are deadlines made concrete with milestones and time estimates?
- Is re-engagement messaging encouraging or guilt-inducing?

Provide actionable recommendations for reducing procrastination while respecting user autonomy.`,

    outputSchema: {
      type: 'object',
      properties: {
        procrastinationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              effect: { type: 'string' },
              severity: { type: 'string' },
              taskCompletionImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'effect',
              'severity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            taskBreakdown: { type: 'number' },
            momentumBuilding: { type: 'number' },
            effortClarity: { type: 'number' },
            initiationFriction: { type: 'number' },
          },
          required: [
            'taskBreakdown',
            'momentumBuilding',
            'effortClarity',
            'initiationFriction',
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
        'procrastinationPatterns',
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
        title: 'Identify Procrastination-Prone Tasks',
        description:
          'Map your user journey to find tasks where users commonly delay, abandon, or avoid action',
        example:
          'Analytics show 62% of users start onboarding but only 23% complete it within 7 days',
        tips: [
          'Look for high drop-off points in multi-step flows',
          'Identify tasks with long average time-to-completion',
          'Survey users about tasks they find difficult to start',
        ],
      },
      {
        step: 2,
        title: 'Break Tasks Into Micro-Steps',
        description:
          'Decompose large tasks into small, individually completable steps that take 2-5 minutes each',
        example:
          'Turn "Complete your profile" into: 1) Add name, 2) Upload photo, 3) Write bio, 4) Set preferences, 5) Connect accounts',
        tips: [
          'Each step should feel trivially easy on its own',
          'Show progress after each step to build momentum',
          'Allow steps to be completed in any order when possible',
        ],
      },
      {
        step: 3,
        title: 'Add Time Estimates and Progress Indicators',
        description:
          'Show how long each task takes and visualize overall progress to reduce effort ambiguity',
        example:
          '"Step 3 of 5 — About 2 minutes" with a progress bar showing 60% complete',
        tips: [
          'Time estimates should be slightly generous (under-promise, over-deliver)',
          'Use multiple progress indicators: step count, percentage, time remaining',
          'Celebrate milestones to reinforce momentum',
        ],
      },
      {
        step: 4,
        title: 'Create Low-Commitment Entry Points',
        description:
          'Offer easy ways to start tasks that lower the initiation barrier',
        example:
          '"Just review your settings" instead of "Complete your account setup (15 fields required)"',
        tips: [
          'Use "just 5 minutes" or "one quick step" framing',
          'Pre-fill as much as possible so users review rather than create',
          'Auto-save everything so users never lose progress',
        ],
      },
      {
        step: 5,
        title: 'Build Momentum Mechanisms',
        description:
          'Add streaks, chains, and accumulation displays that users want to maintain',
        example:
          'Daily streak counter with visual chain, plus weekly summary showing cumulative progress',
        tips: [
          'Make streaks forgiving — allow 1 miss without breaking the chain',
          'Show both current streak and longest streak for motivation',
          'Provide "streak freeze" options rather than harsh resets',
        ],
      },
      {
        step: 6,
        title: 'Design Ethical Re-engagement',
        description:
          'When users lapse, bring them back with encouragement, not guilt',
        example:
          '"Welcome back! Your workspace is ready. Here\'s a quick 2-minute task to get rolling again."',
        tips: [
          'Never shame users for inactivity',
          'Highlight what they CAN do, not what they missed',
          'Offer a low-effort re-entry task to rebuild momentum',
          'Respect notification preferences and avoid pestering',
        ],
      },
    ],

    dos: [
      'Break large tasks into small, visible micro-steps',
      'Show time estimates for every task to reduce effort uncertainty',
      'Create momentum through streaks, progress bars, and accumulation displays',
      'Offer low-commitment entry points like "just 5 minutes"',
      'Reward task initiation, not just completion',
      'Use encouraging, forward-looking re-engagement messaging',
      'Add milestones to distant deadlines',
      'Pre-fill forms and provide smart defaults to reduce effort',
      'Auto-save everything so users never lose progress',
      'Highlight one clear "next action" at all times',
    ],

    donts: [
      'Don\'t present long, undifferentiated task lists without prioritization',
      'Don\'t show distant deadlines without intermediate milestones',
      'Don\'t use guilt or shame to motivate lapsed users',
      'Don\'t create artificial urgency with fake deadlines or false scarcity',
      'Don\'t require large upfront commitments to start a task',
      'Don\'t highlight lost progress or broken streaks negatively',
      'Don\'t overwhelm users with too many notifications or nudges',
      'Don\'t ignore the difference between task initiation and task completion',
      'Don\'t present tasks without time estimates or effort indicators',
      'Don\'t punish users who take breaks or return after absence',
    ],

    bestPractices: [
      {
        title: 'The Two-Minute Rule',
        description:
          'If a task can be done in two minutes, prompt the user to do it immediately rather than adding it to a list',
        rationale:
          'Small tasks on lists create overhead; immediate completion eliminates procrastination opportunity',
        example:
          'When a user gets a notification requiring a simple response, show an inline reply field rather than navigating to a separate screen',
      },
      {
        title: 'Progressive Effort Disclosure',
        description:
          'Show only the immediate next step, not the full scope of remaining work',
        rationale:
          'Seeing the total effort remaining triggers avoidance; focusing on one step makes action feel manageable',
        example:
          'Show "Step 3: Add your payment method (1 min)" instead of "3 of 8 steps remaining (estimated 12 minutes)"',
      },
      {
        title: 'Forgiving Streak Design',
        description:
          'Allow streak freezes, grace periods, or partial credit rather than binary all-or-nothing streaks',
        rationale:
          'Harsh streak breaks create shame spirals where users abandon entirely after one miss',
        example:
          'Duolingo-style streak freeze: "You missed yesterday, but your streak is protected! Keep going today."',
      },
      {
        title: 'Implementation Intentions',
        description:
          'Help users set specific when-where-how plans for completing tasks',
        rationale:
          'Research shows implementation intentions ("I will do X at Y time in Z location") double follow-through rates',
        example:
          'After creating a task, prompt: "When will you work on this?" with calendar integration for scheduling',
      },
      {
        title: 'Temptation Bundling',
        description:
          'Pair difficult tasks with enjoyable elements to reduce aversion',
        rationale:
          'Combining a dreaded task with something pleasant reduces the negative emotional response that drives procrastination',
        example:
          'Allow users to play background music or earn points during tedious data entry tasks',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Progress indicators must be semantically meaningful',
        implementation:
          'Use ARIA progressbar roles with aria-valuenow, aria-valuemin, and aria-valuemax so screen reader users can track task progress',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Task steps must have clear, descriptive headings',
        implementation:
          'Each micro-step should have a descriptive heading that communicates both the action and the effort involved',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Tasks must clearly communicate what is required',
        implementation:
          'Provide clear labels, time estimates, and instructions for each step to reduce cognitive overhead that exacerbates procrastination',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Deadline countdowns must be accessible',
        implementation:
          'Ensure countdown timers and deadline reminders work with screen readers and do not rely solely on visual urgency cues like color',
      },
    ],

    ethics: [
      {
        concern: 'Artificial Urgency',
        severity: 'high',
        explanation:
          'Creating fake deadlines or manufactured scarcity to pressure action',
        mitigation:
          'Only use real deadlines with genuine consequences. Be transparent about why timing matters.',
      },
      {
        concern: 'Guilt-Based Manipulation',
        severity: 'critical',
        explanation:
          'Shaming users for inactivity or broken streaks to drive re-engagement',
        mitigation:
          'Use encouraging, forward-looking messaging. Celebrate return rather than punishing absence.',
      },
      {
        concern: 'Addictive Streak Design',
        severity: 'high',
        explanation:
          'Designing streaks that create unhealthy obligation or anxiety about breaking chains',
        mitigation:
          'Build forgiving streak systems with freezes and grace periods. Never make users feel trapped by their streaks.',
      },
      {
        concern: 'Notification Overload',
        severity: 'medium',
        explanation:
          'Sending excessive reminders and nudges that become pestering rather than helpful',
        mitigation:
          'Respect notification preferences, provide granular controls, and reduce frequency for users who don\'t engage with reminders.',
      },
      {
        concern: 'Exploiting Self-Regulation Difficulties',
        severity: 'critical',
        explanation:
          'Users with ADHD or executive function challenges are more susceptible to procrastination — aggressive nudges can increase anxiety',
        mitigation:
          'Provide customizable nudge intensity, allow users to set their own pace, and avoid one-size-fits-all pressure.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Nature of Procrastination: A Meta-Analytic and Theoretical Review of Quintessential Self-Regulatory Failure',
        author: 'Steel, P.',
        year: 2007,
        doi: '10.1037/0033-2909.133.1.65',
        description:
          'The definitive meta-analysis of procrastination research, synthesizing findings from 691 correlations and proposing Temporal Motivation Theory',
        type: 'foundational',
      },
      {
        title: 'Procrastination and Obedience',
        author: 'Akerlof, G. A.',
        year: 1991,
        doi: '10.1257/aer.81.2.1',
        description:
          'Nobel laureate economist\'s analysis of procrastination as a rational failure caused by hyperbolic time discounting',
        type: 'foundational',
      },
      {
        title: 'Temporal Motivation Theory: A New Approach to Persistent Problems in Self-Regulation',
        author: 'Steel, P., & König, C. J.',
        year: 2006,
        doi: '10.1037/0033-295X.113.4.636',
        description:
          'Integrative theory explaining procrastination through expectancy, value, delay, and impulsiveness',
        type: 'advanced',
      },
      {
        title: 'Implementation Intentions: Strong Effects of Simple Plans',
        author: 'Gollwitzer, P. M.',
        year: 1999,
        doi: '10.1037/0003-066X.54.7.493',
        description:
          'Research showing that specific if-then plans dramatically increase follow-through on intentions',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'The Procrastination Equation',
        author: 'Steel, Piers',
        year: 2011,
        isbn: '9780061703621',
        description:
          'Comprehensive overview of procrastination science by the leading researcher in the field',
        type: 'foundational',
      },
      {
        title: 'Solving the Procrastination Puzzle',
        author: 'Pychyl, Timothy A.',
        year: 2013,
        isbn: '9780399168123',
        description:
          'Practical strategies for overcoming procrastination based on research from the Procrastination Research Group',
        type: 'practical',
      },
      {
        title: 'Atomic Habits',
        author: 'Clear, James',
        year: 2018,
        isbn: '9780735211292',
        description:
          'Practical framework for building habits and overcoming procrastination through tiny changes — directly applicable to UX design patterns',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Why We Procrastinate and How to Stop',
        author: 'Pychyl, Timothy A.',
        url: 'https://www.psychologytoday.com/us/blog/dont-delay',
        description:
          'Ongoing blog by leading procrastination researcher with practical insights',
        type: 'practical',
      },
      {
        title: 'Designing for Behavior Change: Applying Psychology and Behavioral Economics',
        author: 'Wendel, Stephen',
        url: 'https://www.oreilly.com/library/view/designing-for-behavior/9781449367947/',
        description:
          'UX-focused guide covering procrastination-reducing design patterns',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Inside the Mind of a Master Procrastinator',
        author: 'Urban, Tim',
        url: 'https://www.ted.com/talks/tim_urban_inside_the_mind_of_a_master_procrastinator',
        description:
          'Popular TED Talk explaining the psychology of procrastination with humor and insight',
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
