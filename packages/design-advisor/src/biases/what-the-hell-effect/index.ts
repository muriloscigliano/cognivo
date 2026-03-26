/**
 * WHAT-THE-HELL EFFECT
 *
 * After a lapse, we abandon restraint completely
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const whatTheHellEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'what-the-hell-effect',
    name: 'What-The-Hell Effect',
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
    simple: 'After a lapse, we abandon restraint completely',

    detailed: `The What-The-Hell Effect describes the tendency for people to abandon a goal entirely after a single lapse or violation. Once a self-imposed rule or limit is broken, people disproportionately escalate their indulgence rather than minimizing the damage. The classic example is a dieter who eats a slice of cake and then thinks "I've already blown my diet, so I might as well eat the whole thing."

This effect is rooted in all-or-nothing thinking: people set rigid goals, and when those goals are violated even slightly, the perceived boundary between "on track" and "off track" collapses. The lapse removes the psychological restraint that was keeping behavior in check, leading to a counterregulatory response where the person overshoots far beyond the initial violation.

In product design, this bias is critical for any system involving streaks, habits, goals, budgets, or progress tracking. Designers who understand this effect can build recovery mechanisms that prevent small setbacks from becoming total abandonment, keeping users engaged and progressing toward their goals.`,

    psychologyBasis: {
      discoveredBy: 'C. Peter Herman and Janet Polivy',
      year: 1980,
      theory: 'Counterregulatory Eating / Boundary Model of Self-Control',
      mechanism: `After breaking a rule or failing once, the psychological boundary that maintained restraint collapses, triggering abandonment of the goal entirely. This happens because:

1. **All-or-Nothing Framing**: People set rigid binary goals (perfect streak vs. failure) with no middle ground
2. **Boundary Collapse**: Once the "diet boundary" or "goal boundary" is crossed, the restraint system shuts off entirely
3. **Counterregulation**: Instead of minimizing the lapse, people paradoxically increase the forbidden behavior ("already ruined, might as well keep going")
4. **Abstinence Violation Effect**: The emotional distress from the lapse (guilt, shame) triggers further indulgence as a coping mechanism
5. **Goal Disengagement**: The lapse is perceived as proof of failure, causing the person to disengage from the goal altogether

The effect is strongest when goals are framed as streaks, perfect records, or all-or-nothing achievements with no room for partial success.`,
    },

    realWorldExample: `In Herman and Polivy's classic 1980 study, dieters who were given a high-calorie milkshake "preload" actually ate MORE cookies afterward than dieters given nothing. Non-dieters showed the opposite, expected pattern: those who drank the milkshake ate fewer cookies. The dieters' reasoning was effectively "I've already broken my diet with the milkshake, so I might as well eat as many cookies as I want." The restraint boundary was violated, so all restraint disappeared.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The What-The-Hell Effect profoundly affects how users interact with goal-tracking, streak-based, and habit-forming products. When a user misses a day, overspends a budget, or breaks a streak, they are psychologically primed to give up entirely. Designers can counteract this by:

- Building recovery mechanisms that reduce the cost of a single lapse
- Framing progress as cumulative rather than all-or-nothing
- Offering "streak freezes" or "grace periods" that preserve momentum
- Showing partial credit for partial completion
- Using compassionate, non-judgmental messaging after setbacks`,

    whenToUse: [
      {
        title: 'Streak Recovery Systems',
        scenario:
          'When users have broken a streak or missed a goal milestone',
        example:
          'Offer a "streak freeze" that lets users protect their streak for one missed day, preserving their sense of continuity',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Habit Tracking Forgiveness',
        scenario: 'When users miss a day or fail to complete a daily habit',
        example:
          'Show "You completed 6 out of 7 days this week — that\'s still great!" instead of "Streak broken"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Budget Overspend Recovery',
        scenario: 'When users exceed a spending limit or budget category',
        example:
          'Show "You went $20 over in dining — let\'s adjust the rest of the week" instead of marking the entire budget as failed',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Graceful Goal Reset',
        scenario: 'When users fail to meet a deadline or target',
        example:
          'Offer a "restart from here" option that carries forward partial progress rather than resetting to zero',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Exercise and Fitness Rest Days',
        scenario: 'When users skip a scheduled workout or rest day',
        example:
          'Frame rest days as part of the plan: "Rest days help muscles recover — you\'re still on track"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Safety-Critical Compliance',
        reason:
          'Some rules genuinely cannot tolerate violations (medical dosing, safety protocols)',
        consequence:
          'Forgiving a lapse could lead to dangerous non-compliance',
        alternative:
          'Use clear, firm messaging for safety-critical rules while reserving forgiveness for non-critical goals',
      },
      {
        title: 'Gambling and Addiction Contexts',
        reason:
          'The what-the-hell effect can reinforce harmful behavior spirals in addictive contexts',
        consequence:
          'Users might interpret "forgiveness" as permission to continue harmful behavior',
        alternative:
          'Implement hard limits and intervention points rather than soft recovery mechanisms',
      },
      {
        title: 'Financial Risk Thresholds',
        reason:
          'Forgiving overspending in investment or trading contexts could encourage reckless behavior',
        consequence:
          'Users might take increasingly risky positions after an initial loss',
        alternative:
          'Use circuit breakers and cooling-off periods instead of soft recovery messaging',
      },
      {
        title: 'Manipulative Re-engagement',
        reason:
          'Using guilt about broken streaks to manipulate users into returning is a dark pattern',
        consequence:
          'Users feel coerced rather than supported, leading to resentment and churn',
        alternative:
          'Use supportive, low-pressure messaging that respects user autonomy',
      },
    ],

    commonMistakes: [
      {
        title: 'All-or-Nothing Streak Design',
        description:
          'Building streak systems with no recovery mechanism — one miss resets everything to zero',
        why: 'Binary streaks maximize the what-the-hell effect: a single miss feels catastrophic, so users give up entirely',
        fix: 'Add streak freezes, grace periods, or partial credit to make lapses feel recoverable',
      },
      {
        title: 'Punishing Single Failures',
        description:
          'Showing aggressive failure messaging ("Streak lost!", red X marks, disappointed mascots) after one miss',
        why: 'Punitive messaging amplifies the shame and guilt that drive counterregulatory behavior',
        fix: 'Use compassionate messaging that acknowledges the lapse and encourages continuation',
      },
      {
        title: 'No Path Back to Good Standing',
        description:
          'Designing systems where once a goal is missed, there is no meaningful way to recover',
        why: 'Without a recovery path, the only logical response to a lapse is abandonment',
        fix: 'Provide clear, achievable steps to get back on track after a setback',
      },
      {
        title: 'Rigid Binary Goal Framing',
        description:
          'Framing goals as "100% or nothing" with no recognition of partial success',
        why: 'Binary framing creates the exact all-or-nothing mindset that triggers the what-the-hell effect',
        fix: 'Frame progress on a spectrum: "You hit 80% of your goal — that\'s meaningful progress"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently failures vs. recoveries are displayed',
        examples: [
          'Progress bars showing cumulative achievement rather than binary pass/fail',
          'Recovery options positioned prominently after a lapse, not buried',
          'Streak displays that show total history rather than just current streak',
          'Dashboard layouts that emphasize overall trend rather than single-day misses',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text tone and emphasis directly affect whether a lapse feels catastrophic or recoverable',
        examples: [
          'Compassionate, encouraging copy after a miss vs. harsh failure language',
          'Using "pause" or "rest" instead of "broken" or "failed"',
          'Smaller, lighter text for the lapse vs. bold, emphasized recovery options',
          'Framing statistics positively: "6 of 7 days" not "1 day missed"',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals whether a lapse is a catastrophe or a minor setback',
        examples: [
          'Using warm yellow/orange for a missed day rather than harsh red',
          'Green recovery buttons that emphasize getting back on track',
          'Gradient progress bars showing partial completion rather than binary filled/empty',
          'Avoiding aggressive red "failure" states that amplify shame',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns after a lapse determine whether users recover or abandon',
        examples: [
          'One-tap "resume" or "get back on track" actions after a missed day',
          'Streak freeze activation that requires minimal effort',
          'Automatic grace periods that kick in without requiring user action',
          'Smooth re-entry flows that skip guilt and go straight to the next action',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing is the primary lever for preventing the what-the-hell spiral',
        examples: [
          '"It\'s OK to miss a day — what matters is coming back" messaging',
          'Showing that most successful users miss days too (normalizing lapses)',
          'Reframing "streak broken" as "new chapter started"',
          'Providing specific, actionable recovery steps rather than vague encouragement',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible recovery flows ensure all users can get back on track after a lapse',
        examples: [
          'Screen reader announcements that emphasize recovery, not failure',
          'Keyboard-accessible streak freeze and recovery actions',
          'Clear, unambiguous language that doesn\'t rely on visual color cues for status',
          'Alternative progress representations for users who cannot see progress bars',
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
        title: 'Streak Freeze Recovery',
        description:
          'Language learning app offering a streak freeze after a missed day',
        code: `<div class="streak-recovery">
  <div class="streak-status">
    <span class="streak-icon">🔥</span>
    <span class="streak-count">42-day streak</span>
    <span class="freeze-badge">Streak Freeze Used</span>
  </div>
  <p class="message">You missed yesterday, but your streak is safe!
  We used one of your streak freezes to keep you going.</p>
  <div class="actions">
    <button class="primary">Start Today's Lesson</button>
    <button class="secondary">Get More Streak Freezes</button>
  </div>
  <p class="encouragement">Most learners with 42-day streaks
  have used at least 3 freezes. You're doing great!</p>
</div>`,
        explanation:
          'The streak freeze preserves the user\'s sense of continuity and investment. By normalizing the use of freezes ("most learners use them"), it removes the shame that would trigger the what-the-hell effect.',
        principle:
          'Recovery mechanisms prevent small lapses from becoming total abandonment',
        metrics: {
          before: '38% of users returned after a missed day (no freeze)',
          after: '89% of users returned after a missed day (with freeze)',
          improvement: '134% increase in next-day retention after a lapse',
        },
      },
      {
        title: 'Compassionate Miss Messaging',
        description:
          'Fitness app showing supportive messaging after a missed workout',
        code: `<div class="missed-workout">
  <h3>Rest days are part of the plan</h3>
  <div class="weekly-progress">
    <span class="day completed">Mon ✓</span>
    <span class="day completed">Tue ✓</span>
    <span class="day completed">Wed ✓</span>
    <span class="day rest">Thu 💤</span>
    <span class="day today">Fri →</span>
    <span class="day upcoming">Sat</span>
    <span class="day upcoming">Sun</span>
  </div>
  <p class="stats">You've completed <strong>3 of 4 workouts</strong>
  this week. That's 75% — above the average of 68%!</p>
  <button class="primary">Start Friday's Workout</button>
</div>`,
        explanation:
          'By framing the missed day as a "rest day" (not a failure), showing partial completion positively (75%, above average), and presenting the next workout as a natural continuation, the design eliminates the binary pass/fail framing that triggers the what-the-hell effect.',
        principle:
          'Partial credit and positive framing keep users engaged after a lapse',
      },
      {
        title: 'Budget Overspend Recovery',
        description:
          'Budgeting app offering adjustment options after overspending in a category',
        code: `<div class="budget-recovery">
  <h3>Dining: $20 over budget</h3>
  <div class="progress-bar">
    <div class="filled" style="width: 100%"></div>
    <div class="overage" style="width: 8%"></div>
  </div>
  <p class="message">No worries — here are some easy adjustments:</p>
  <ul class="recovery-options">
    <li>
      <button class="option">Shift $20 from Entertainment
      <span class="detail">Still $45 left there</span></button>
    </li>
    <li>
      <button class="option">Spread across remaining days
      <span class="detail">Save $3.33/day for 6 days</span></button>
    </li>
    <li>
      <button class="option">Accept the overage
      <span class="detail">You're still $180 under total budget</span></button>
    </li>
  </ul>
</div>`,
        explanation:
          'Instead of marking the entire budget as "blown," the app provides concrete, achievable recovery options. Showing the user is still under total budget prevents the what-the-hell spiral of "budget\'s ruined, might as well spend freely."',
        principle:
          'Concrete recovery options prevent goal abandonment after a setback',
        metrics: {
          before: '52% of users stopped tracking after an overspend (no recovery)',
          after: '18% stopped tracking after an overspend (with recovery options)',
          improvement: '65% reduction in budget tracking abandonment',
        },
      },
    ],

    bad: [
      {
        title: 'Binary Streak Destruction',
        description:
          'Language app that destroys the entire streak with no recovery option',
        code: `<!-- DON'T DO THIS -->
<div class="streak-lost">
  <div class="broken-icon">💔</div>
  <h2 style="color: red;">Streak Lost!</h2>
  <p>Your 42-day streak has been reset to 0.</p>
  <p class="small">You missed yesterday's lesson.</p>
  <button class="primary">Start Over</button>
</div>`,
        explanation:
          'Destroying a 42-day streak over a single miss is the textbook trigger for the what-the-hell effect. The user invested 42 days of effort and now sees it as worthless, making them far more likely to quit entirely rather than start from zero.',
        principle:
          'All-or-nothing streak resets maximize the what-the-hell effect and drive user abandonment',
      },
      {
        title: 'Punitive Failure Messaging',
        description:
          'Fitness app shaming the user for missing a workout',
        code: `<!-- DON'T DO THIS -->
<div class="missed-day">
  <h2>You Didn't Show Up 😞</h2>
  <p style="color: #cc0000;">You missed your workout yesterday.
  Your consistency score has dropped from A to C.</p>
  <div class="guilt-stats">
    <p>You've now missed 3 days this month.</p>
    <p>Users who miss 3+ days are 70% less likely to reach their goals.</p>
  </div>
  <button>Try Again Tomorrow</button>
</div>`,
        explanation:
          'Shaming messaging, dramatic score drops, and threatening statistics amplify the guilt that drives the what-the-hell effect. Telling users they are "70% less likely to reach their goals" becomes a self-fulfilling prophecy.',
        principle:
          'Punitive messaging after a lapse accelerates goal abandonment rather than preventing it',
      },
      {
        title: 'No Recovery Mechanism',
        description:
          'Diet tracking app with no way to recover from a cheat meal',
        code: `<!-- DON'T DO THIS -->
<div class="daily-calories">
  <h3>Daily Calories: 2,450 / 1,800</h3>
  <div class="progress-bar over-limit">
    <div class="filled exceeded" style="width: 136%"></div>
  </div>
  <p style="color: red;">OVER LIMIT — 650 calories over your goal</p>
  <p class="small">Today's goal cannot be met.</p>
</div>`,
        explanation:
          'Declaring the day\'s goal as unmeetable with no recovery options is exactly what triggers "I already blew it, might as well eat whatever I want for the rest of the day." There is no path forward except failure.',
        principle:
          'Declaring a goal "failed" with no recovery path guarantees the what-the-hell spiral',
      },
    ],

    realWorld: [
      {
        company: 'Duolingo',
        product: 'Streak Freeze',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo allows users to purchase "streak freezes" that protect their streak when they miss a day. This prevents the devastating reset-to-zero experience that would otherwise trigger the what-the-hell effect and cause users to abandon the app entirely.',
        effectiveness: 'very-effective',
        analysis:
          'The streak freeze is one of Duolingo\'s most important retention features. By giving users a safety net, it preserves the sunk-cost investment of their streak while still encouraging daily practice. Users who use streak freezes have significantly higher long-term retention than those whose streaks are broken.',
      },
      {
        company: 'Fitbit',
        product: 'Active Zone Minutes',
        url: 'https://www.fitbit.com',
        description:
          'Fitbit shifted from rigid daily step goals to weekly Active Zone Minutes, allowing users to have low-activity days without "failing." A rest day on Tuesday can be compensated by extra activity on Wednesday.',
        effectiveness: 'effective',
        analysis:
          'By moving to a weekly aggregate model, Fitbit eliminated the daily binary pass/fail that triggers the what-the-hell effect. Users no longer feel like missing one day ruins their week.',
      },
      {
        company: 'Noom',
        product: 'Cheat Day Reframing',
        url: 'https://www.noom.com',
        description:
          'Noom\'s diet coaching app explicitly teaches users about the what-the-hell effect and reframes "cheat days" as part of a sustainable plan. Their messaging includes "one meal doesn\'t define your journey" and offers adjustment strategies.',
        effectiveness: 'very-effective',
        analysis:
          'By naming the effect and educating users about it, Noom turns a psychological vulnerability into a learning moment. Users who understand why they want to give up are better equipped to resist the impulse.',
      },
      {
        company: 'YNAB',
        product: 'Roll With the Punches',
        url: 'https://www.ynab.com',
        description:
          'YNAB (You Need A Budget) has a core philosophy called "Roll With the Punches" that explicitly encourages users to adjust their budget when they overspend, rather than abandoning the budget entirely. Overspending in one category is handled by moving money from another.',
        effectiveness: 'very-effective',
        analysis:
          'YNAB\'s recovery-first philosophy directly counteracts the what-the-hell effect in personal finance. Instead of marking a budget as "blown," the system treats overspending as a normal event that simply requires adjustment.',
      },
    ],

    abTests: [
      {
        title: 'Streak Break: Reset to Zero vs. Streak Freeze',
        hypothesis:
          'Offering a streak freeze after a missed day will improve next-day return rates compared to resetting the streak to zero',
        controlVersion: {
          description:
            'User misses a day and sees "Streak Lost! Your 30-day streak has been reset to 0. Start over."',
          metrics: {
            conversionRate: '38%',
            clickThroughRate: '22%',
          },
        },
        treatmentVersion: {
          description:
            'User misses a day and sees "Streak Freeze Used! Your 30-day streak is safe. Start today\'s lesson to keep going."',
          metrics: {
            conversionRate: '89%',
            clickThroughRate: '74%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Streak freezes more than doubled next-day return rates. Users in the control group who lost long streaks (30+ days) were the most likely to churn entirely, confirming the what-the-hell effect scales with investment size.',
          learnings: [
            'The longer the streak, the more devastating a reset is — and the more valuable a freeze becomes',
            'Users who received a freeze were 3x more likely to be active 30 days later',
            'Even users who knew the freeze was coming still practiced more consistently',
            'The "safety net" reduced anxiety and paradoxically increased daily engagement',
          ],
        },
      },
      {
        title: 'Budget Overspend: Failure Message vs. Recovery Options',
        hypothesis:
          'Showing concrete recovery options after overspending will keep users engaged with their budget',
        controlVersion: {
          description:
            'User overspends and sees "Over Budget" in red with no suggested actions',
          metrics: {
            conversionRate: '48%',
            timeOnPage: '0:12',
          },
        },
        treatmentVersion: {
          description:
            'User overspends and sees "A little over — here\'s how to adjust" with 3 concrete rebalancing options',
          metrics: {
            conversionRate: '82%',
            timeOnPage: '1:45',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Providing recovery options increased continued budget tracking by 71%. Users in the control group were significantly more likely to stop logging expenses for the remainder of the month after a single overspend.',
          learnings: [
            'Concrete recovery actions are more effective than general encouragement',
            'Showing the overspend in context of total budget ("still $180 under overall") reduces perceived severity',
            'Users preferred "shift from another category" over "spend less going forward"',
            'The what-the-hell effect was strongest in users with rigid budget categories',
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
        name: 'Binary Streak Display',
        description:
          'Streak counters that show only current streak with no recovery mechanism or history',
        howToSpot:
          'Look for prominent streak numbers that reset to zero on a miss, with no freeze or grace period',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'All-or-Nothing Progress Bars',
        description:
          'Progress indicators that show only complete/incomplete with no partial credit',
        howToSpot:
          'Look for binary progress states: filled vs. empty, checkmark vs. X, with no intermediate states',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Punitive Failure States',
        description:
          'Aggressive visual treatment of failures: red backgrounds, broken icons, dramatic loss messaging',
        howToSpot:
          'Look for red colors, broken/shattered imagery, sad emojis, or guilt-inducing language after a single miss',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Recovery Actions',
        description:
          'Failure states that show the problem but offer no path forward or recovery options',
        howToSpot:
          'Look for error/failure screens with only a "Start Over" or "OK" button and no recovery alternative',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Rigid Streak Pattern',
        description: 'Streak-based systems with no forgiveness, grace periods, or recovery mechanisms',
        indicators: ['Streak resets to zero on a single miss', 'No streak freeze or grace period', 'Binary active/broken streak states', 'No historical streak data preserved'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Binary Goal Pattern',
        description: 'Goal systems that only recognize complete success or total failure',
        indicators: ['Pass/fail goal tracking with no partial credit', '"Goal met" vs "Goal missed" with no in-between', 'Daily targets that cannot be partially completed', 'No weekly or monthly aggregation of daily goals'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Punitive Lapse Pattern',
        description: 'Negative messaging or consequences disproportionate to a single lapse',
        indicators: ['Dramatic score drops from a single miss', 'Guilt-inducing statistics about failure', 'Loss of rewards or status from one violation', 'Shaming language or disappointed mascot imagery'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Dead-End Failure Pattern',
        description: 'Failure states that offer no meaningful recovery path',
        indicators: ['Only "Start Over" as a recovery option', 'No way to adjust or rebalance after a lapse', '"Today\'s goal cannot be met" messaging', 'No carry-forward or make-up mechanisms'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What happens when a user misses a day or breaks a streak?',
      'Is there a recovery mechanism (freeze, grace period, partial credit)?',
      'Does the system use all-or-nothing goal framing?',
      'Is the failure messaging punitive or compassionate?',
      'Can users make up for a lapse on subsequent days?',
      'Does the design show partial progress positively?',
      'Are rest days or breaks normalized as part of the plan?',
      'Is there a concrete path back to "good standing" after a lapse?',
      'Do failure states offer actionable recovery options?',
      'Does the streak/goal system scale punishment proportionally to the lapse?',
      'Are long-term trends shown alongside daily performance?',
      'Does the system distinguish between a single miss and sustained disengagement?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the what-the-hell effect (counterregulatory behavior after goal violation).

Analyze the provided design for what-the-hell effect patterns. Identify:

1. **Streak/Goal Systems**: How streaks, habits, and goals are tracked and what happens when they're broken
2. **Failure States**: How the design handles lapses, misses, and violations
3. **Recovery Mechanisms**: Whether users have paths to recover from setbacks
4. **Messaging Tone**: Whether lapse messaging is punitive or compassionate
5. **Goal Framing**: Whether goals are all-or-nothing or allow partial success

For each pattern found:
- Identify whether it triggers or mitigates the what-the-hell effect
- Assess the severity of potential user abandonment
- Determine if recovery mechanisms are adequate
- Evaluate the emotional impact of failure states
- Suggest improvements for graceful failure handling

Consider:
- Does the design use rigid binary goals that collapse on violation?
- Are there recovery mechanisms (freezes, grace periods, partial credit)?
- Does the messaging normalize lapses or catastrophize them?
- Is there a clear, achievable path back to good standing?
- Does the system reward consistency over perfection?

Provide actionable recommendations for preventing the what-the-hell spiral.`,

    outputSchema: {
      type: 'object',
      properties: {
        whatTheHellPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              triggerOrMitigate: { type: 'string' },
              severity: { type: 'string' },
              recoveryMechanism: { type: 'string' },
              messagingTone: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'triggerOrMitigate',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            abandonmentRisk: { type: 'number' },
            recoveryAdequacy: { type: 'number' },
            messagingCompassion: { type: 'number' },
            goalFlexibility: { type: 'number' },
          },
          required: [
            'abandonmentRisk',
            'recoveryAdequacy',
            'messagingCompassion',
            'goalFlexibility',
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
        'whatTheHellPatterns',
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
        title: 'Audit Existing Goal Systems',
        description:
          'Identify every place in your product where users can "fail" — streaks, goals, budgets, targets, schedules',
        example:
          'Map all streak systems, daily goals, budget limits, and completion requirements',
        tips: [
          'List every binary success/failure state in the product',
          'Identify what happens at the moment of failure',
          'Note which failures have recovery mechanisms and which do not',
        ],
      },
      {
        step: 2,
        title: 'Design Recovery Mechanisms',
        description:
          'For each failure point, create a concrete recovery path that prevents total abandonment',
        example:
          'Add streak freezes for missed days, partial credit for partial completions, and budget rebalancing for overspends',
        tips: [
          'Recovery should require minimal effort — one tap or automatic',
          'Offer multiple recovery options (freeze, adjust, carry forward)',
          'Make recovery feel like a normal part of the system, not a special exception',
        ],
      },
      {
        step: 3,
        title: 'Reframe Goal Structures',
        description:
          'Shift from binary all-or-nothing goals to flexible, cumulative progress tracking',
        example:
          'Change "30-day streak" to "25 active days this month" to allow flexibility',
        tips: [
          'Use weekly/monthly aggregates instead of daily pass/fail',
          'Show percentage completion rather than binary status',
          'Normalize that 80% consistency is excellent, not a failure',
        ],
      },
      {
        step: 4,
        title: 'Write Compassionate Failure Messaging',
        description:
          'Replace punitive language with supportive, forward-looking copy that emphasizes recovery',
        example:
          'Change "Streak Lost!" to "You took a break — ready to pick up where you left off?"',
        tips: [
          'Use "pause" or "rest" instead of "broken" or "lost"',
          'Show what the user HAS accomplished, not just what they missed',
          'Include social proof: "Most successful users miss days too"',
        ],
      },
      {
        step: 5,
        title: 'Test Recovery Flows',
        description:
          'Measure next-day return rates, 7-day retention, and long-term engagement after lapses',
        example:
          'A/B test streak freeze vs. reset to zero, measuring return rates at 1, 7, and 30 days post-lapse',
        tips: [
          'Track the moment of lapse as a critical retention event',
          'Measure how many users return vs. churn after different failure experiences',
          'Segment by streak length — long-streak users are most vulnerable',
        ],
      },
    ],

    dos: [
      'Build streak freezes, grace periods, and recovery mechanisms into goal systems',
      'Frame progress cumulatively rather than as binary pass/fail',
      'Use compassionate, forward-looking messaging after lapses',
      'Show partial credit for partial completion',
      'Normalize rest days and breaks as part of a healthy pattern',
      'Provide concrete, actionable recovery steps after a setback',
      'Show users their overall trend, not just today\'s status',
      'Make recovery require minimal effort (one tap, automatic)',
    ],

    donts: [
      'Don\'t reset long streaks to zero over a single miss',
      'Don\'t use shaming or guilt-inducing language after a lapse',
      'Don\'t declare goals "failed" with no recovery option',
      'Don\'t show threatening statistics about the consequences of missing a day',
      'Don\'t use punitive visual design (red, broken icons) for minor lapses',
      'Don\'t frame goals as all-or-nothing when flexibility is possible',
      'Don\'t make the recovery path harder than the original goal',
      'Don\'t ignore the emotional impact of failure states on user retention',
    ],

    bestPractices: [
      {
        title: 'Streak Freezes Over Streak Resets',
        description:
          'Allow users to protect their streak for occasional misses, preserving their investment and motivation',
        rationale:
          'A streak freeze costs far less than losing the user entirely; the sunk-cost of the streak motivates continued engagement',
        example:
          'Duolingo\'s streak freeze: users can earn or purchase freezes that automatically protect their streak on missed days',
      },
      {
        title: 'Percentage Goals Over Binary Goals',
        description:
          'Frame goals as "X out of Y" rather than "every single day" to build in natural flexibility',
        rationale:
          'Percentage goals allow lapses without triggering the what-the-hell effect because partial success is still success',
        example:
          '"Complete 5 of 7 workouts this week" instead of "Work out every day"',
      },
      {
        title: 'Recovery-First Failure States',
        description:
          'Design every failure state to lead with recovery options rather than dwelling on the failure',
        rationale:
          'Users in the moment of lapse need a path forward, not a reminder of what went wrong',
        example:
          'After a budget overspend, immediately show rebalancing options rather than a red "Over Budget" banner',
      },
      {
        title: 'Normalize Lapses with Social Proof',
        description:
          'Show users that successful peers also miss days, normalizing the lapse and reducing shame',
        rationale:
          'Shame and guilt are the primary emotional drivers of the what-the-hell effect; social proof directly counteracts them',
        example:
          '"Users who reach 100-day streaks miss an average of 8 days along the way"',
      },
      {
        title: 'Gradual Consequences Over Cliff Edges',
        description:
          'If lapses must have consequences, make them gradual and proportional rather than catastrophic',
        rationale:
          'Proportional consequences feel fair and recoverable; cliff-edge consequences feel arbitrary and hopeless',
        example:
          'Streak "dims" after a miss (still visible, slightly reduced) rather than resetting to zero',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure recovery options are semantically conveyed, not just visually',
        implementation:
          'Use proper heading levels, ARIA labels, and semantic HTML for streak status and recovery actions so screen readers convey both the lapse and the recovery path',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to indicate streak status or failure',
        implementation:
          'Combine color with text labels, icons, and ARIA attributes to convey goal status. A red progress bar alone is insufficient — add text like "1 day missed" alongside it',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - Provide recovery suggestions when a goal or streak is broken',
        implementation:
          'When a user\'s goal state changes to "missed" or "broken," programmatically offer concrete recovery suggestions, not just a status notification',
      },
    ],

    ethics: [
      {
        concern: 'Streak Guilt Manipulation',
        severity: 'critical',
        explanation:
          'Using the threat of losing a streak to coerce daily engagement, even when it harms the user (e.g., studying while sick)',
        mitigation:
          'Provide streak freezes and rest days as first-class features. Never make users feel they must engage at the cost of their wellbeing.',
      },
      {
        concern: 'Artificial Scarcity of Recovery',
        severity: 'high',
        explanation:
          'Making recovery mechanisms scarce or expensive (e.g., charging money for streak freezes) to monetize user anxiety',
        mitigation:
          'Ensure basic recovery mechanisms are available to all users. Premium recovery features should supplement, not replace, free baseline forgiveness.',
      },
      {
        concern: 'Dark Pattern Re-engagement',
        severity: 'high',
        explanation:
          'Using guilt, shame, or FOMO to pressure users who have lapsed into returning, rather than supporting their autonomy',
        mitigation:
          'Use supportive, low-pressure messaging. Respect that some users may have intentionally stepped away.',
      },
      {
        concern: 'Exploiting Sunk Cost After Lapse',
        severity: 'medium',
        explanation:
          'Emphasizing how much a user will "lose" if they don\'t return, rather than the value of continuing',
        mitigation:
          'Frame recovery around future benefit ("keep building your skills") rather than past loss ("don\'t waste your 42-day streak").',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Breaking the Diet Habit: The Natural Weight Alternative',
        author: 'Herman, C. P., & Polivy, J.',
        year: 1983,
        description:
          'The foundational work on counterregulatory eating that identified the what-the-hell effect in dieters',
        type: 'foundational',
      },
      {
        title: 'Effects of Self-Regulatory Failure on Disinhibition of Eating',
        author: 'Cochran, W., & Tesser, A.',
        year: 1996,
        doi: '10.1037/0022-3514.70.5.967',
        description:
          'Extended the what-the-hell effect beyond dieting to general self-regulation, showing how a single failure triggers disinhibition across domains',
        type: 'advanced',
      },
      {
        title: 'Restrained and Unrestrained Eating',
        author: 'Herman, C. P., & Mack, D.',
        year: 1975,
        doi: '10.1037/h0077186',
        description:
          'Early experimental work demonstrating that dieters eat more after a high-calorie preload, the opposite of non-dieters',
        type: 'foundational',
      },
      {
        title: 'The Abstinence Violation Effect: Relapse Prevention and Treatment',
        author: 'Marlatt, G. A., & Gordon, J. R.',
        year: 1985,
        description:
          'Related work on how a single lapse in addiction recovery can trigger full relapse — the what-the-hell effect in clinical contexts',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Willpower: Rediscovering the Greatest Human Strength',
        author: 'Baumeister, Roy F., & Tierney, John',
        year: 2011,
        isbn: '9780143122234',
        description:
          'Comprehensive coverage of self-regulation failure and the what-the-hell effect in the context of willpower research',
        type: 'foundational',
      },
      {
        title: 'Atomic Habits',
        author: 'Clear, James',
        year: 2018,
        isbn: '9780735211292',
        description:
          'Practical guide to habit design that addresses the what-the-hell effect through "never miss twice" and identity-based habits',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The What-the-Hell Effect in Product Design',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies',
        description:
          'Case studies on how products like Duolingo and fitness apps handle streak-breaking and goal failure',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why One Cookie Turns Into Ten',
        author: 'BJ Fogg',
        url: 'https://www.youtube.com/results?search_query=what+the+hell+effect+psychology',
        description:
          'Explanation of the counterregulatory behavior pattern and how to design habit systems that prevent it',
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
      'loss-aversion', // Fear of losing a streak amplifies the what-the-hell effect
      'sunk-cost-fallacy', // Investment in a streak makes breaking it more devastating
      'goal-gradient-effect', // Progress toward a goal affects how devastating a lapse feels
      'social-proof', // Normalizing lapses with social proof mitigates the effect
    ],

    conflicts: [
      'fresh-start-effect', // Fresh starts can counteract what-the-hell by reframing the lapse
    ],

    confusedWith: [
      'sunk-cost-fallacy', // Related but different: sunk cost is about continuing bad investments; what-the-hell is about abandoning good ones after a lapse
      'learned-helplessness', // Similar outcome (giving up) but different trigger: repeated failure vs. single lapse
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'abstinence-violation-effect',
        'counterregulatory-eating',
      ],
    },
  },
};
