/**
 * HOT HAND FALLACY
 *
 * We believe success streaks will continue
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const hotHandFallacy: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'hot-hand-fallacy',
    name: 'Hot Hand Fallacy',
    aliases: ['Hot Hand Effect', 'Streak Bias', 'Momentum Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'streaks',
      'momentum',
      'gambling',
      'performance',
      'pattern-recognition',
      'randomness',
      'decision-making',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We believe success streaks will continue',

    detailed: `The Hot Hand Fallacy is the mistaken belief that a person who has experienced success with a random event has a greater chance of further success in additional attempts. People perceive "streaks" in sequences of random outcomes and expect those streaks to continue, even when each event is statistically independent.

The term originates from basketball, where players and fans believe a player who has made several consecutive shots is more likely to make the next one — they have a "hot hand." Research by Gilovich, Vallone, and Tversky (1985) demonstrated that this perceived streak effect did not exist in actual shooting data; the sequences were consistent with random variation.

In UX and product design, the hot hand fallacy drives engagement through streak displays, momentum indicators, and "you're on a roll" messaging. Users who see a winning or success streak are more likely to continue engaging, take risks, or increase investment — even when past outcomes have no bearing on future ones. This makes it a powerful but ethically sensitive pattern in gaming, trading, fitness, and learning interfaces.`,

    psychologyBasis: {
      discoveredBy: 'Thomas Gilovich, Robert Vallone, and Amos Tversky',
      year: 1985,
      theory: 'Cognitive Bias Research / Representativeness Heuristic',
      mechanism: `The brain misidentifies patterns in random sequences and expects those patterns to persist. This happens because:

1. **Representativeness Heuristic**: People judge short sequences against their mental model of what "random" looks like, and streaks feel non-random
2. **Pattern Detection Overreach**: The brain is wired to find patterns, even in genuinely random data — a streak of successes triggers the pattern-matching circuitry
3. **Confirmation Bias Reinforcement**: Once a streak is noticed, people selectively remember hits and forget misses, strengthening the illusion
4. **Causal Attribution**: People instinctively assign causal explanations to streaks ("they're in the zone," "this strategy is working") rather than accepting randomness
5. **Emotional Momentum**: Success creates positive arousal and confidence, which feels like a genuine shift in ability or luck

The mechanism is deeply intuitive — even when told outcomes are independent, people struggle to override the feeling that a streak carries predictive power.`,
    },

    realWorldExample: `In the original 1985 study, Gilovich, Vallone, and Tversky analyzed shooting records of the Philadelphia 76ers and found no evidence of streak shooting. The probability of making a shot was actually slightly lower after a made shot than after a miss. Yet 91% of surveyed basketball fans believed a player was more likely to make a shot after making two or three in a row. The "hot hand" was a compelling illusion driven by pattern perception in random data.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Hot Hand Fallacy affects how users perceive momentum, streaks, and performance trajectories in interfaces. When users see a series of successes, they believe the trend will continue, leading to increased engagement, risk-taking, and investment. Designers can leverage this to:

- Increase retention through streak counters and momentum displays
- Motivate continued engagement with "you're on a roll" messaging
- Drive risk-taking through win streak indicators (ethically questionable in some contexts)
- Boost confidence in learning platforms with consecutive success indicators
- Encourage persistence by framing performance as momentum rather than discrete events`,

    whenToUse: [
      {
        title: 'Learning and Education Platforms',
        scenario:
          'When encouraging users to maintain practice habits and build skills',
        example:
          'Show a "5-day streak" badge and "You got the last 8 questions right — keep going!" to build learner confidence',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Fitness and Health Tracking',
        scenario: 'When motivating users to maintain healthy habits',
        example:
          'Display workout streak counters with "You\'re on a 12-day streak — don\'t break the chain!" messaging',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Productivity Tools',
        scenario: 'When encouraging consistent task completion and workflow habits',
        example:
          'Show completed-task streaks: "3rd task closed this hour — you\'re on fire!" with momentum animations',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Content Creation Platforms',
        scenario: 'When encouraging consistent publishing or contribution',
        example:
          'GitHub-style contribution graphs showing consecutive days of activity, reinforcing momentum',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Sales and Performance Dashboards',
        scenario: 'When displaying team or individual performance trends',
        example:
          'Highlight consecutive wins or deals closed with "3 deals in a row — momentum is building"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Gambling and Betting Interfaces',
        reason:
          'Streak displays in gambling contexts exploit the hot hand fallacy to encourage continued betting on independent events',
        consequence:
          'Users increase bets after wins, believing the streak will continue, leading to significant financial losses',
        alternative:
          'Show clear statistical odds, session totals, and responsible gambling warnings instead of streak counts',
      },
      {
        title: 'Financial Trading Platforms',
        reason:
          'Momentum indicators on individual trades can encourage overconfidence and excessive risk-taking',
        consequence:
          'Traders increase position sizes after consecutive wins, leading to outsized losses when the "streak" ends',
        alternative:
          'Present portfolio performance over meaningful time horizons with risk metrics, not trade-by-trade streaks',
      },
      {
        title: 'Medical Decision-Making',
        reason:
          'Past diagnostic successes do not predict accuracy of future diagnoses',
        consequence:
          'Clinicians may become overconfident after a streak of correct diagnoses, reducing thoroughness',
        alternative:
          'Encourage systematic protocol adherence regardless of recent outcomes',
      },
      {
        title: 'High-Stakes Decisions with Independent Outcomes',
        reason:
          'Any context where individual events are statistically independent and mistakes carry serious consequences',
        consequence:
          'Users may take inappropriate risks based on false confidence from recent successes',
        alternative:
          'Present each decision on its own merits with clear probability information',
      },
    ],

    commonMistakes: [
      {
        title: 'Streak Displays in Gambling Contexts',
        description:
          'Showing win streaks, hot numbers, or "lucky" indicators in games of chance',
        why: 'Each outcome is independent; streak displays create the false impression that wins predict future wins',
        fix: 'Remove streak indicators from chance-based outcomes; show cumulative statistics and probability information instead',
      },
      {
        title: 'Confusing Streaks with Skill Improvement',
        description:
          'Presenting random variance as evidence of improving ability',
        why: 'Short-term streaks in performance are often noise, not signal — attributing them to skill creates false confidence',
        fix: 'Show long-term trend lines and rolling averages rather than highlighting short streaks',
      },
      {
        title: 'Punishing Streak Breaks Too Harshly',
        description:
          'Resetting streak counters to zero after a single miss, causing frustration and abandonment',
        why: 'Harsh streak resets exploit loss aversion alongside hot hand fallacy, causing anxiety rather than motivation',
        fix: 'Use "freeze" mechanics, grace periods, or partial streak recovery to maintain motivation without manipulation',
      },
      {
        title: 'Ignoring Individual Baselines',
        description:
          'Treating all users\' streaks as equally meaningful regardless of their baseline performance',
        why: 'A 5-question streak means different things for a beginner vs an expert; false momentum signals can mislead',
        fix: 'Calibrate streak messaging to user ability level and historical performance',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently streaks and momentum indicators are displayed',
        examples: [
          'Streak counters placed prominently in headers or dashboards anchor attention to momentum',
          'Progress bars showing consecutive successes create visual momentum',
          'Leaderboards sorted by current streak emphasize hot hand perception',
          'Timeline layouts highlighting winning sequences reinforce pattern perception',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment of streak numbers and momentum messaging affects perceived significance',
        examples: [
          'Large, bold streak numbers (e.g., "🔥 12") feel more significant than small inline text',
          'Exclamatory messaging ("You\'re on fire!") amplifies the perceived streak importance',
          'Countdown typography for streak-at-risk creates urgency through hot hand framing',
          'Animated number transitions when streaks increase reinforce momentum feeling',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color intensification tied to streak length amplifies hot hand perception',
        examples: [
          'Warming colors (yellow to orange to red) as streaks grow create "heating up" sensation',
          'Green success colors on consecutive wins reinforce positive momentum',
          'Flame or fire-themed color palettes explicitly reference being "hot"',
          'Desaturated or cool colors when streaks break signal momentum loss',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions that reward and celebrate streaks are the primary driver of hot hand engagement',
        examples: [
          'Celebratory animations on streak milestones (confetti, flame effects) reinforce momentum belief',
          'Haptic feedback intensifying with streak length creates physical reinforcement',
          'Progressive rewards unlocked by streak length incentivize continued engagement',
          'Push notifications about streaks at risk leverage hot hand fallacy + loss aversion',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether streaks are presented as meaningful patterns or random variance',
        examples: [
          '"You\'re on a roll!" messaging explicitly frames random success as predictive momentum',
          '"3 wins in a row" is more compelling than "3 out of last 5" — selective framing amplifies streaks',
          'Historical streak records ("Your longest streak: 15") set anchors for future streak pursuit',
          'Peer comparison ("Top 10% streak!") adds social reinforcement to hot hand perception',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Streak indicators must be perceivable by all users, and their motivational impact should be equitable',
        examples: [
          'Screen readers should announce streak status so visually impaired users get the same motivational cues',
          'Color-based "heating up" indicators need non-color alternatives (icons, text labels)',
          'Animated celebrations should respect prefers-reduced-motion settings',
          'Streak-based rewards should not create unfair advantages for users who can engage more frequently',
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
        title: 'Learning Streak with Encouragement',
        description:
          'Language learning app showing practice streak to encourage daily habit formation',
        code: `<div class="streak-display">
  <div class="streak-header">
    <span class="flame-icon">🔥</span>
    <span class="streak-count">7</span>
    <span class="streak-label">Day Streak!</span>
  </div>
  <p class="streak-message">You've practiced every day this week. Keep it up!</p>
  <div class="streak-calendar">
    <span class="day completed">M</span>
    <span class="day completed">T</span>
    <span class="day completed">W</span>
    <span class="day completed">T</span>
    <span class="day completed">F</span>
    <span class="day completed">S</span>
    <span class="day completed">S</span>
  </div>
  <p class="streak-context">Daily practice builds lasting habits.
  Your vocabulary retention is 34% higher on streak days.</p>
</div>`,
        explanation:
          'Uses streak momentum to encourage a genuinely beneficial habit (daily practice). Crucially, it grounds the streak in real data — vocabulary retention is measurably better with consistent practice, so the "momentum" messaging aligns with genuine skill building.',
        principle:
          'Hot hand framing is ethical when the streak genuinely correlates with better outcomes',
        metrics: {
          before: '42% of users practiced 5+ days per week without streak display',
          after: '67% of users practiced 5+ days per week with streak display',
          improvement: '60% increase in consistent daily practice',
        },
      },
      {
        title: 'Fitness Momentum with Streak Freeze',
        description:
          'Workout app showing exercise streak with humane "freeze" mechanic for rest days',
        code: `<div class="workout-streak">
  <h3>🏋️ Workout Streak: 15 Days</h3>
  <div class="streak-bar">
    <!-- Visual bar showing 15 consecutive days -->
  </div>
  <div class="streak-protection">
    <p>Rest days are important! You have 2 streak freezes available.</p>
    <button class="freeze-btn">Use Streak Freeze for Today</button>
  </div>
  <p class="health-note">Recovery is part of progress.
  Taking a rest day won't erase your gains.</p>
</div>`,
        explanation:
          'Leverages streak motivation for healthy habit formation while acknowledging that rest is essential. Streak freezes prevent the anxiety and guilt that come from breaking streaks, making the feature motivating without being punishing.',
        principle:
          'Ethical streak design includes escape valves that prevent the bias from causing harm',
      },
      {
        title: 'Sales Dashboard with Contextual Streaks',
        description:
          'CRM showing deal-closing streak alongside historical context',
        code: `<div class="sales-performance">
  <div class="current-streak">
    <h3>Current Streak: 4 Deals Closed</h3>
    <p class="encouragement">Great momentum this week!</p>
  </div>
  <div class="context-panel">
    <div class="stat">
      <span class="label">Your average close rate</span>
      <span class="value">32%</span>
    </div>
    <div class="stat">
      <span class="label">Current pipeline probability</span>
      <span class="value">28%</span>
    </div>
    <p class="insight">Each deal is evaluated independently.
    Past wins don't change the odds on your next opportunity,
    but consistent effort builds relationships that compound.</p>
  </div>
</div>`,
        explanation:
          'Celebrates momentum to keep motivation high while providing statistical context. The insight message gently corrects the hot hand assumption — past wins don\'t predict future ones — while still framing effort positively.',
        principle:
          'Responsible streak displays pair momentum messaging with honest probability context',
      },
    ],

    bad: [
      {
        title: 'Casino Win Streak Encouragement',
        description:
          'Online casino highlighting win streaks to encourage continued betting',
        code: `<!-- DON'T DO THIS -->
<div class="hot-streak-banner">
  <h2 style="color: gold; text-shadow: 0 0 10px orange;">
    🔥🔥🔥 YOU'RE ON FIRE! 🔥🔥🔥
  </h2>
  <p>3 WINS IN A ROW!</p>
  <p style="font-size: 1.5em;">Your luck is HOT — keep playing!</p>
  <div class="streak-meter">
    <div class="fill" style="width: 60%; background: linear-gradient(red, orange);">
      HEATING UP...
    </div>
  </div>
  <button class="bet-more">DOUBLE YOUR BET — RIDE THE STREAK!</button>
</div>`,
        explanation:
          'This directly exploits the hot hand fallacy in a context where outcomes are purely random. Slot spins and roulette outcomes are independent events — a "win streak" has zero predictive power. The "double your bet" prompt causes real financial harm.',
        principle:
          'Never use hot hand framing to encourage risk-taking on independent random events',
      },
      {
        title: 'Trading Platform Momentum Indicator',
        description:
          'Stock trading app showing "hot streak" after consecutive profitable trades',
        code: `<!-- DON'T DO THIS -->
<div class="trading-streak">
  <div class="streak-badge hot">
    <span class="fire">🔥</span>
    <span>5 Winning Trades in a Row!</span>
  </div>
  <p>You're reading the market perfectly.</p>
  <div class="suggestion">
    <p>Momentum traders increase position size during hot streaks.</p>
    <button class="increase-position">Increase Position Size</button>
  </div>
</div>`,
        explanation:
          'Encouraging increased position sizes based on a short streak of wins is dangerous. Individual trade outcomes in volatile markets contain significant randomness, and increasing bet size during a perceived "hot streak" is a well-documented path to catastrophic loss.',
        principle:
          'Hot hand framing in financial contexts encourages overconfidence and outsized risk',
      },
      {
        title: 'Punitive Streak Reset',
        description:
          'App that harshly punishes users for breaking a streak',
        code: `<!-- DON'T DO THIS -->
<div class="streak-lost">
  <h2 style="color: red;">💔 STREAK LOST!</h2>
  <p>Your 47-day streak is GONE FOREVER.</p>
  <p>You're back to Day 0.</p>
  <div class="shame-stats">
    <p>You were in the top 3% of streakers.</p>
    <p>Now you're starting over with the beginners.</p>
  </div>
  <button class="restart">Start Over from Zero</button>
</div>`,
        explanation:
          'Punitive streak resets exploit loss aversion alongside the hot hand fallacy. Users feel genuine grief and shame about losing a long streak, which can cause unhealthy compulsive usage or complete abandonment. The shaming language ("back with beginners") is manipulative.',
        principle:
          'Streak mechanics should motivate, not punish — harsh resets cause anxiety and abandonment',
      },
    ],

    realWorld: [
      {
        company: 'Duolingo',
        product: 'Practice Streak Counter',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo\'s iconic streak counter shows consecutive days of practice, with streak freezes available as a safety net. The flame icon intensifies with longer streaks, and users receive push notifications warning when their streak is at risk.',
        effectiveness: 'very-effective',
        analysis:
          'Duolingo\'s streak is one of the most effective engagement mechanics in consumer apps. It leverages hot hand momentum ("don\'t break the chain") combined with loss aversion. The streak freeze feature shows ethical awareness, preventing the anxiety of losing a long streak to a single missed day.',
      },
      {
        company: 'DraftKings',
        product: 'Win Streak Displays',
        url: 'https://www.draftkings.com',
        description:
          'Sports betting platforms show users their recent win/loss records and highlight winning streaks, sometimes with "hot" or "on fire" badges. These streak indicators encourage continued betting after wins.',
        effectiveness: 'effective',
        analysis:
          'While effective at driving engagement, this is a concerning application. Sports betting outcomes involve significant randomness, and streak displays exploit the hot hand fallacy to encourage continued wagering. Responsible gambling features are often less prominent than streak celebrations.',
      },
      {
        company: 'Spotify',
        product: 'Listening Streaks (Wrapped)',
        url: 'https://www.spotify.com',
        description:
          'Spotify Wrapped highlights listening streaks — consecutive days listening to an artist, longest daily listening streaks, and genre consistency. Users share these streaks as social proof of their music dedication.',
        effectiveness: 'very-effective',
        analysis:
          'A benign and engaging use of streak psychology. Listening streaks don\'t involve risk or financial decisions, so the hot hand framing is purely motivational. The social sharing aspect adds viral growth, and the annual Wrapped event turns streaks into anticipated milestones.',
      },
      {
        company: 'Robinhood',
        product: 'Portfolio Performance Display',
        url: 'https://www.robinhood.com',
        description:
          'Robinhood\'s portfolio graph uses green for gains and shows consecutive-day gains prominently. While not explicitly showing "streaks," the running green line creates a visual momentum effect that encourages continued trading.',
        effectiveness: 'effective',
        analysis:
          'The continuous green line during multi-day gains creates implicit hot hand perception — users feel their portfolio is "on a roll." This visual momentum contributed to increased trading frequency among retail investors, which research has shown often decreases returns due to overtrading.',
      },
    ],

    abTests: [
      {
        title: 'Learning App: Streak Display vs No Streak Display',
        hypothesis:
          'Showing a visible streak counter will increase daily return rate and lesson completion',
        controlVersion: {
          description:
            'Learning app with standard progress tracking (lessons completed, XP earned) but no streak counter or momentum messaging',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '8:12',
            scrollDepth: '65%',
          },
        },
        treatmentVersion: {
          description:
            'Same app with prominent streak counter, flame icon that grows with streak length, and "You\'re on a 5-day roll!" messaging after completing a lesson',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '11:45',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The streak display increased daily return rate by 53%. Users with visible streaks completed 35% more lessons per session and were 2.4x more likely to return the next day. The effect was strongest for streaks of 3-14 days.',
          learnings: [
            'Streak counters are most motivating in the 3-14 day range; very long streaks can become anxiety-inducing',
            'Flame/fire iconography significantly outperformed neutral streak counters (numbers only)',
            'Users who lost streaks without a freeze option had 40% higher churn than those with freeze mechanics',
            'The hot hand effect diminished for advanced users who had internalized the habit independently',
          ],
        },
      },
      {
        title: 'Fitness App: "You\'re on a Roll" vs Neutral Progress',
        hypothesis:
          'Momentum-framed messaging will increase workout frequency compared to neutral progress reporting',
        controlVersion: {
          description:
            'Neutral post-workout summary: "Workout complete. 3 workouts this week. 12 total this month."',
          metrics: {
            conversionRate: '41%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Momentum-framed summary: "3 workouts in a row this week — you\'re building unstoppable momentum! Keep the streak alive tomorrow."',
          metrics: {
            conversionRate: '58%',
            clickThroughRate: '34%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Momentum framing increased next-day return rate by 41% and click-through on "Schedule Next Workout" by 89%. Users in the treatment group reported feeling more motivated and more confident in their fitness trajectory.',
          learnings: [
            'Hot hand framing is particularly effective for habit formation where consistency genuinely matters',
            'Momentum messaging works best immediately after a success, not hours later',
            'Users who received momentum messaging but then missed a day reported higher frustration — streak freeze mechanics are essential',
            'The effect was strongest for users in their first 30 days of using the app',
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
        name: 'Streak Counters',
        description:
          'Numeric displays of consecutive successes, days active, or wins in a row',
        howToSpot:
          'Look for numbers paired with fire/flame icons, "X in a row" labels, or day-count badges',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Momentum Indicators',
        description:
          'Visual elements that suggest building momentum — progress bars that accelerate, warming colors, growing flames',
        howToSpot:
          'Check for color gradients that intensify (cool to warm), animated elements that speed up, or size increases tied to consecutive successes',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Streak-at-Risk Warnings',
        description:
          'Notifications or UI elements warning that a streak is about to be lost',
        howToSpot:
          'Look for countdown timers paired with streak displays, "Don\'t lose your streak!" messaging, or dimming flame icons',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Win/Success Sequence Displays',
        description:
          'Visual sequences showing recent outcomes (W-W-W-L-W-W) with emphasis on winning runs',
        howToSpot:
          'Check for outcome histories where wins are visually prominent (larger, brighter, colored) while losses are minimized',
        severity: ImpactLevel.HIGH,
      },
      {
        name: '"On Fire" / "Hot" Labels',
        description:
          'Explicit text or badges labeling a user or entity as "hot," "on fire," "on a roll," or similar momentum language',
        howToSpot:
          'Search for fire emojis, flame animations, "hot streak" badges, or superlative momentum language',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Streak Counter Pattern',
        description: 'Prominent display of consecutive successes or activity days with visual escalation',
        indicators: [
          'Numeric counter with flame or fire icon',
          'Calendar or timeline showing consecutive completed days',
          '"X days in a row" or "X wins in a row" text',
          'Counter resets to zero on a miss',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Momentum Escalation Pattern',
        description: 'Visual or interactive elements that intensify as a streak grows, creating a sense of building heat',
        indicators: [
          'Colors warming from cool to hot as streak lengthens',
          'Animations becoming more dramatic with consecutive successes',
          'Rewards or badges unlocked at streak milestones',
          'Typography or icon size increasing with streak length',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Loss Aversion Streak Pattern',
        description: 'Using fear of losing a streak to drive engagement, combining hot hand with loss aversion',
        indicators: [
          'Push notifications about streak-at-risk',
          '"Don\'t lose your X-day streak!" messaging',
          'Countdown timers before streak expires',
          'Streak freeze mechanics that require purchase or action',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Selective Outcome Highlighting Pattern',
        description: 'Emphasizing wins and successes in recent history while downplaying losses or misses',
        indicators: [
          'Win/loss records where wins are visually prominent',
          '"Recent wins" section without equivalent "recent losses"',
          'Performance graphs emphasizing upward sequences',
          'Achievement notifications for wins but silence for losses',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are consecutive successes or activity days displayed as a "streak"?',
      'Does the interface use fire, flame, or heat metaphors for performance?',
      'Do visual elements intensify (color, size, animation) as streaks grow?',
      'Are users warned about losing their streak with urgency messaging?',
      'Does the streak display imply that future success is more likely because of past success?',
      'Are wins displayed more prominently than losses in outcome histories?',
      'Is there a harsh penalty (reset to zero) for breaking a streak?',
      'Are streak mechanics used in contexts where outcomes are genuinely independent (gambling, trading)?',
      'Does the interface provide statistical context alongside streak displays?',
      'Are there humane mechanisms (freezes, grace periods) to prevent streak anxiety?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the hot hand fallacy.

Analyze the provided design for hot hand fallacy patterns. Identify:

1. **Streak Displays**: Counters, timelines, or indicators showing consecutive successes or activity
2. **Momentum Framing**: Language or visuals suggesting that current success predicts future success
3. **Escalation Mechanics**: Elements that intensify (color, animation, rewards) as streaks grow
4. **Streak Protection/Loss**: Warnings about losing streaks, freeze mechanics, reset penalties
5. **Outcome Selectivity**: Whether wins are displayed more prominently than losses

For each pattern found:
- Identify what behavior the streak mechanic is encouraging
- Assess whether outcomes are genuinely correlated (habit building) or independent (gambling)
- Determine if the framing is honest about probability vs creating false momentum
- Evaluate ethical implications, especially in financial or gambling contexts
- Suggest improvements for responsible streak design

Consider:
- Does the streak genuinely correlate with better outcomes (learning retention, fitness gains)?
- Are users being encouraged to take risks based on false momentum?
- Are there humane escape valves (freezes, grace periods) to prevent streak anxiety?
- Is the hot hand framing helping users build real habits, or exploiting pattern perception?
- Are vulnerable populations (problem gamblers, compulsive users) adequately protected?

Provide actionable recommendations for ethical, effective streak design.`,

    outputSchema: {
      type: 'object',
      properties: {
        streakPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              streakContext: { type: 'string' },
              outcomeDependence: { type: 'string' },
              escalationLevel: { type: 'string' },
              riskLevel: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'streakContext',
              'outcomeDependence',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            streakProminence: { type: 'number' },
            momentumFraming: { type: 'number' },
            outcomeIndependence: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'streakProminence',
            'momentumFraming',
            'outcomeIndependence',
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
        'streakPatterns',
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
        title: 'Assess Outcome Dependence',
        description:
          'Determine whether the outcomes in your context are genuinely correlated (practice builds skill) or independent (each event is random)',
        example:
          'Language learning: Daily practice genuinely improves retention — streaks are correlated with outcomes. Slot machines: Each spin is independent — streaks are meaningless.',
        tips: [
          'If outcomes are independent, streak displays are ethically questionable',
          'If outcomes are correlated (habit building, skill development), streaks can be beneficial',
          'Document your reasoning for why streak mechanics are appropriate in your context',
        ],
      },
      {
        step: 2,
        title: 'Design the Streak Display',
        description:
          'Create a clear, motivating visual representation of the streak that encourages engagement without creating anxiety',
        example:
          'Use a flame icon with a day count, a calendar with filled-in days, or a simple "X in a row" counter',
        tips: [
          'Keep the display simple — the number and a clear icon',
          'Use warm, encouraging colors rather than aggressive urgency',
          'Show the streak in context of overall progress, not in isolation',
        ],
      },
      {
        step: 3,
        title: 'Add Escalation Milestones',
        description:
          'Create meaningful milestone celebrations at streak thresholds to maintain motivation over time',
        example:
          'Bronze badge at 7 days, Silver at 30, Gold at 100 — with unlock messages celebrating consistency',
        tips: [
          'Space milestones to match the difficulty curve (early milestones closer together)',
          'Make milestone rewards intrinsically motivating, not just extrinsic badges',
          'Celebrate the behavior (consistency) rather than the outcome (winning)',
        ],
      },
      {
        step: 4,
        title: 'Implement Humane Streak Protection',
        description:
          'Add streak freezes, grace periods, or partial recovery to prevent the anxiety and compulsion that harsh streak resets cause',
        example:
          'Give users 1 free streak freeze per week, with option to earn more through activity',
        tips: [
          'Never let a single missed day destroy a 100-day streak — that is punitive, not motivating',
          'Streak freezes should be readily available, not paywalled',
          'Consider "streak recovery" where users can restore a recently broken streak within 24-48 hours',
        ],
      },
      {
        step: 5,
        title: 'Provide Honest Context',
        description:
          'Pair streak displays with information that helps users understand what the streak means (and doesn\'t mean)',
        example:
          'Alongside a 10-day learning streak, show: "Your test scores are 23% higher when you practice daily"',
        tips: [
          'Show correlation data when available (practice consistency correlates with outcomes)',
          'Never imply that a streak guarantees future success in uncertain domains',
          'Use streak as motivation for effort, not as prediction of results',
        ],
      },
    ],

    dos: [
      'Use streak mechanics to encourage genuinely beneficial habits (learning, exercise, creativity)',
      'Provide streak freezes and grace periods to prevent anxiety',
      'Show streaks in context of overall progress and long-term trends',
      'Celebrate consistency and effort, not just winning',
      'Pair streak displays with honest information about what they mean',
      'Design escalation milestones that maintain long-term motivation',
      'Test whether your streak mechanics improve or harm user wellbeing',
      'Make streak mechanics opt-out for users who find them stressful',
    ],

    donts: [
      'Don\'t use streak displays in gambling or purely random contexts',
      'Don\'t imply that past success predicts future success when outcomes are independent',
      'Don\'t harshly reset long streaks to zero without protection mechanics',
      'Don\'t use streak-at-risk notifications to create anxiety and compulsive behavior',
      'Don\'t encourage increased risk-taking (larger bets, bigger positions) based on streaks',
      'Don\'t hide losses while highlighting wins in outcome displays',
      'Don\'t paywall streak freezes — making protection a premium feature is exploitative',
      'Don\'t design streak mechanics that make users feel guilty for taking necessary breaks',
    ],

    bestPractices: [
      {
        title: 'Match Streak to Genuine Outcome Correlation',
        description:
          'Only use streak mechanics when consistency genuinely leads to better outcomes',
        rationale:
          'Streaks in learning, fitness, and creative practice correlate with real improvement. Streaks in gambling and trading do not.',
        example:
          'Duolingo streaks are ethical because daily practice genuinely improves language retention',
      },
      {
        title: 'Build in Humane Escape Valves',
        description:
          'Always include streak freezes, grace periods, or partial recovery mechanisms',
        rationale:
          'Without escape valves, streak mechanics create anxiety and compulsive behavior that harms user wellbeing',
        example:
          'Offer 1-2 free streak freezes per week, with 24-hour grace period for accidental misses',
      },
      {
        title: 'Celebrate Effort Over Outcome',
        description:
          'Frame streaks around consistency of effort rather than consecutive wins',
        rationale:
          'Effort streaks are always within user control; outcome streaks may be random',
        example:
          '"7 days of practice" is better than "7 correct answers in a row" — the former rewards effort, the latter rewards luck',
      },
      {
        title: 'Provide Statistical Context',
        description:
          'Show what the streak actually means in terms of measurable outcomes',
        rationale:
          'Grounding the streak in real data prevents users from overinterpreting random variance',
        example:
          '"Your 14-day streak correlates with 28% better recall in weekly assessments"',
      },
      {
        title: 'Diminish Streak Emphasis Over Time',
        description:
          'Reduce the prominence of streak mechanics for long-term users who have internalized the habit',
        rationale:
          'Once a habit is established (typically after 60-90 days), streak anxiety becomes counterproductive',
        example:
          'Transition from prominent daily streak counter to weekly/monthly consistency summaries for established users',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Streak status must be conveyed through semantic structure, not just visual elements',
        implementation:
          'Use ARIA labels on streak counters (aria-label="7 day practice streak") so screen readers convey the same motivational information',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to indicate streak status',
        implementation:
          'Pair warming colors with text labels ("Heating up!", "On fire!"), icons, and numeric indicators so color-blind users perceive streak intensity',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below - Streak celebration animations must not flash excessively',
        implementation:
          'Ensure confetti, flame, and celebration animations flash fewer than 3 times per second and respect prefers-reduced-motion',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Streak expiration timers must be adjustable or extendable',
        implementation:
          'If streaks have a daily deadline, allow users to adjust their "day reset" time and provide generous grace periods',
      },
    ],

    ethics: [
      {
        concern: 'Gambling Exploitation',
        severity: 'critical',
        explanation:
          'Using streak displays in gambling contexts to encourage continued betting on independent random outcomes',
        mitigation:
          'Never display win streaks, "hot" indicators, or momentum messaging in gambling interfaces. Show session time, total spent, and odds instead.',
      },
      {
        concern: 'Compulsive Engagement',
        severity: 'high',
        explanation:
          'Streak mechanics can create anxiety and compulsive daily engagement, especially when combined with harsh reset penalties',
        mitigation:
          'Implement streak freezes, grace periods, and opt-out mechanisms. Monitor for signs of compulsive usage and intervene.',
      },
      {
        concern: 'Financial Risk Escalation',
        severity: 'critical',
        explanation:
          'Encouraging increased financial risk (larger bets, bigger trading positions) based on recent winning streaks',
        mitigation:
          'Never suggest increasing financial exposure based on recent outcomes. Provide risk warnings and position-sizing guidance.',
      },
      {
        concern: 'False Skill Attribution',
        severity: 'medium',
        explanation:
          'Framing random success streaks as evidence of skill or ability, leading to overconfidence',
        mitigation:
          'Distinguish between effort streaks (practice days) and outcome streaks (consecutive wins). Provide base rate context.',
      },
      {
        concern: 'Vulnerable User Exploitation',
        severity: 'high',
        explanation:
          'Users with addictive tendencies, problem gambling histories, or compulsive personalities are disproportionately affected by streak mechanics',
        mitigation:
          'Offer streak-free modes, implement usage limits, and provide clear paths to disable all streak notifications and displays.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Hot Hand in Basketball: On the Misperception of Random Sequences',
        author: 'Gilovich, T., Vallone, R., & Tversky, A.',
        year: 1985,
        doi: '10.1016/0010-0285(85)90010-6',
        description:
          'The foundational paper that identified the hot hand fallacy by analyzing basketball shooting data',
        type: 'foundational',
      },
      {
        title: 'Surprised by the Hot Hand Fallacy? A Truth in the Law of Small Numbers',
        author: 'Miller, J. B., & Sanjurjo, A.',
        year: 2018,
        doi: '10.3982/ECTA14943',
        description:
          'Revealed a statistical bias in the original study\'s methodology, showing there may be a small hot hand effect after all',
        type: 'advanced',
      },
      {
        title: 'The Gambler\'s and Hot-Hand Fallacies: Theory and Applications',
        author: 'Rabin, M., & Vayanos, D.',
        year: 2010,
        doi: '10.1093/restud/rdp038',
        description:
          'Theoretical framework unifying the gambler\'s fallacy and hot hand fallacy as related phenomena',
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
          'Comprehensive coverage of how humans misperceive randomness and find patterns in noise, including the hot hand fallacy',
        type: 'foundational',
      },
      {
        title: 'The Drunkard\'s Walk: How Randomness Rules Our Lives',
        author: 'Mlodinow, Leonard',
        year: 2008,
        isbn: '9780307275172',
        description:
          'Accessible exploration of how humans misunderstand randomness, with detailed discussion of streak perception',
        type: 'practical',
      },
      {
        title: 'Fooled by Randomness',
        author: 'Taleb, Nassim Nicholas',
        year: 2005,
        isbn: '9780812975215',
        description:
          'How humans confuse luck with skill, with applications to trading, sports, and business decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Hot Hand Fallacy: Cognitive Mistakes or Equilibrium Adjustments?',
        author: 'Arkes, J.',
        url: 'https://www.nber.org/papers/w22624',
        description:
          'Analysis of how the hot hand fallacy applies in competitive and economic contexts',
        type: 'advanced',
      },
      {
        title: 'Streaks in UX: Using the Hot Hand Effect Responsibly',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies/duolingo-habit-retention',
        description:
          'Case study on how Duolingo uses streak mechanics for habit formation',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Hot Hand Fallacy',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=bPZFQ6ivIUs',
        description:
          'Accessible explanation of the hot hand fallacy with sports examples and recent research updates',
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
      'loss-aversion', // Streak-at-risk warnings combine hot hand with loss aversion
      'sunk-cost-fallacy', // "I've built a 50-day streak, I can't stop now"
      'social-proof', // Peer streak comparisons reinforce engagement
      'gambler-fallacy', // Related but opposite: expecting streaks to end vs continue
    ],

    conflicts: [
      'gambler-fallacy', // Opposite expectation about random sequences
      'base-rate-neglect', // Hot hand ignores base rates of success probability
    ],

    confusedWith: [
      'gambler-fallacy', // Both involve misperception of random sequences but in opposite directions
      'confirmation-bias', // Selectively noticing hits during a "hot" period
      'clustering-illusion', // Seeing patterns in random data, broader than hot hand
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'streak-bias',
        'momentum-illusion',
      ],
    },
  },
};
