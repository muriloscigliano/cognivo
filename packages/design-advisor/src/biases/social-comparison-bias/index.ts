/**
 * SOCIAL COMPARISON BIAS
 *
 * We evaluate ourselves by comparing to others;
 * upward and downward comparisons shape satisfaction and motivation.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const socialComparisonBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'social-comparison-bias',
    name: 'Social Comparison Bias',
    aliases: ['Social Comparison Theory', 'Upward Comparison', 'Downward Comparison', 'Relative Performance Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'social',
      'comparison',
      'motivation',
      'self-evaluation',
      'competition',
      'leaderboards',
      'ranking',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We evaluate our own worth, abilities, and progress by comparing ourselves to others rather than using objective standards.',

    detailed: `Social comparison bias describes the tendency to evaluate oneself—abilities, opinions, achievements, and status—by comparing to other people rather than relying on absolute measures. Leon Festinger proposed that humans have a fundamental drive to assess themselves, and in the absence of objective criteria, they turn to those around them.

Comparisons come in two forms. **Upward comparisons** (comparing to someone perceived as better) can inspire motivation but often produce dissatisfaction, envy, and reduced self-esteem. **Downward comparisons** (comparing to someone perceived as worse off) tend to boost self-esteem and satisfaction but can breed complacency or contempt.

In product design, social comparison is activated whenever users can see other users' performance, progress, status, or output. Leaderboards, progress bars benchmarked against peers, social feeds, achievement badges, and "you vs. average" displays all trigger this bias. Designers must balance motivational benefits against the risk of demoralizing users who fall on the wrong side of the comparison.`,

    psychologyBasis: {
      discoveredBy: 'Leon Festinger',
      year: 1954,
      theory: 'Social Comparison Theory',
      mechanism: `Humans evaluate themselves by comparing to others because objective self-assessment is often impossible. This happens through several pathways:

1. **Self-Evaluation Drive**: People have an innate need to know where they stand, and they satisfy it by looking at peers
2. **Upward Comparison**: Comparing to superior others can motivate improvement but frequently lowers satisfaction and self-esteem
3. **Downward Comparison**: Comparing to inferior others protects self-esteem but can reduce effort and growth
4. **Similarity Hypothesis**: People prefer comparing to those they perceive as similar—same role, demographic, or starting point
5. **Selective Exposure**: Users selectively attend to comparisons that confirm their desired self-image, ignoring disconfirming data

The comparison process is largely automatic—people begin evaluating themselves against peers the moment relative information is visible, even when they are told the comparison is irrelevant.`,
    },

    realWorldExample: `A software developer checks GitHub and sees a peer's contribution graph filled with green squares while their own has gaps. Despite shipping a major feature that week, they feel unproductive because the visual comparison suggests lower output. The metric (commit frequency) does not capture the quality or impact of work, yet the social comparison triggers dissatisfaction. This illustrates how upward comparison to a visible but incomplete metric can override objective self-assessment.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Social comparison bias affects every interface that exposes relative standing, peer activity, or community benchmarks. Designers can harness it to:

- Motivate users through aspirational peer benchmarks ("top performers did X")
- Reinforce progress with downward comparisons ("you're ahead of 73% of users")
- Drive engagement through competitive leaderboards and ranking systems
- Increase retention by surfacing peer activity and social accountability
- Shape perception of value by showing what peers have achieved with the product

However, unchecked social comparison can demoralize lower-performing users, amplify anxiety in social feeds, and create toxic competition.`,

    whenToUse: [
      {
        title: 'Progress Motivation',
        scenario:
          'When users need encouragement to continue or accelerate their progress',
        example:
          'Show "You\'re in the top 10% of learners this month" to boost confidence and sustain effort',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Competitive Engagement',
        scenario: 'When healthy competition can drive feature adoption or activity',
        example:
          'Display a weekly leaderboard for sales teams, showing top performers with opt-in visibility',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Norm Setting',
        scenario: 'When you want to communicate expected behavior or usage levels',
        example:
          'Show "Teams like yours typically complete onboarding in 3 days" to set a peer-based benchmark',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Goal Calibration',
        scenario: 'When helping users set realistic goals based on peer outcomes',
        example:
          'Display median and top-quartile performance to help users choose an achievable target',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Social Accountability',
        scenario: 'When shared visibility helps users stay committed',
        example:
          'Fitness challenges where friends can see each other\'s weekly step counts',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Mental Health Contexts',
        reason:
          'Social comparison in wellness, therapy, or recovery apps can worsen anxiety and depression',
        consequence:
          'Users may feel inadequate comparing their recovery pace to others, leading to disengagement or harm',
        alternative:
          'Show only personal progress over time; compare the user to their own past performance',
      },
      {
        title: 'Beginner Onboarding',
        reason:
          'New users compared to power users will feel overwhelmed and incompetent',
        consequence:
          'High early churn as beginners conclude the product "isn\'t for them"',
        alternative:
          'Compare new users only to other beginners or to their own day-1 baseline',
      },
      {
        title: 'Financial or Salary Displays',
        reason:
          'Income comparisons can breed resentment, envy, and workplace toxicity',
        consequence:
          'Decreased morale, increased turnover, or legal exposure',
        alternative:
          'Show anonymized market-rate ranges rather than individual peer data',
      },
      {
        title: 'Creative or Subjective Work',
        reason:
          'Comparing creative outputs reduces intrinsic motivation and originality',
        consequence:
          'Users converge toward "safe" popular styles instead of exploring their own voice',
        alternative:
          'Showcase diverse examples without ranking; celebrate variety over performance',
      },
    ],

    commonMistakes: [
      {
        title: 'Unwinnable Leaderboards',
        description:
          'Showing all-time leaderboards dominated by early adopters or power users that newcomers can never climb',
        why: 'Users in the bottom 80% see no path to improvement and disengage',
        fix: 'Use time-windowed leaderboards (weekly, monthly) and segment by cohort or skill level',
      },
      {
        title: 'Forced Visibility',
        description:
          'Making social comparison data visible by default with no way to opt out',
        why: 'Not every user is motivated by competition; many find it stressful',
        fix: 'Let users toggle comparison features on or off; default to personal-progress view',
      },
      {
        title: 'Incomplete Metrics',
        description:
          'Comparing users on a single metric that doesn\'t capture the full picture',
        why: 'A user who writes fewer but higher-quality contributions looks "worse" on a quantity-only leaderboard',
        fix: 'Show multi-dimensional comparisons or let users choose which metric to compare',
      },
      {
        title: 'Upward-Only Comparisons',
        description:
          'Always showing top performers without any downward comparison context',
        why: 'Constant exposure to people doing better erodes motivation for the majority',
        fix: 'Balance "top performers" with "you\'re ahead of X%" messaging',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently peer data is displayed relative to personal data',
        examples: [
          'Leaderboard placement above personal stats anchors attention to ranking',
          'Side-by-side peer comparison panels invite direct evaluation',
          'Progress bars benchmarked against peers are more salient than standalone bars',
          'Feed layouts (social timelines) create continuous comparison loops',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment affects how comparisons are perceived emotionally',
        examples: [
          'Large, bold rank numbers ("You are #47") feel more competitive than prose',
          'Positive framing ("Top 10%!") vs neutral framing ("#47 of 500") shifts affect',
          'Highlighting peer names in bold increases personal connection to comparison',
          'Small, muted percentile text reduces comparison salience',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding makes relative standing immediately visible and emotionally charged',
        examples: [
          'Green/red for above/below average creates instant judgment',
          'Gold, silver, bronze tiers reinforce competitive ranking',
          'Gradient heat maps on contribution graphs signal activity intensity',
          'Neutral colors reduce emotional charge of comparison data',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive comparison features can amplify or moderate the bias',
        examples: [
          'Hover to compare your stats with a peer deepens evaluation',
          'Opt-in leaderboard toggle gives users control over comparison',
          'Filtering by "people like me" makes comparisons feel fairer',
          'Animated rank changes draw attention to relative movement',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether comparisons motivate or demoralize',
        examples: [
          '"You\'re in the top 10%" (downward comparison) boosts confidence',
          '"Top performers completed 5x more" (upward comparison) can inspire or discourage',
          'Showing peer averages normalizes typical behavior',
          'Highlighting personal bests alongside peer data balances comparison with self-progress',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Comparison data must be perceivable and understandable for all users',
        examples: [
          'Screen readers must convey ranking context, not just raw numbers',
          'Color-coded rankings need text or icon alternatives for color-blind users',
          'Leaderboard navigation must be keyboard-accessible',
          'ARIA labels should describe relative standing ("Your rank: 12 out of 200")',
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
        title: 'Segmented Weekly Leaderboard',
        description:
          'Fitness app showing a weekly challenge leaderboard segmented by activity level',
        code: `<div class="leaderboard">
  <h3>This Week's Walking Challenge</h3>
  <div class="segment-tabs">
    <button class="active">Your Group (Intermediate)</button>
    <button>All Participants</button>
  </div>
  <ol class="rankings">
    <li class="rank">
      <span class="position">1</span>
      <span class="name">Alex M.</span>
      <span class="steps">62,340 steps</span>
    </li>
    <li class="rank you">
      <span class="position">4</span>
      <span class="name">You</span>
      <span class="steps">48,210 steps</span>
      <span class="badge">Top 15%</span>
    </li>
    <li class="rank">
      <span class="position">5</span>
      <span class="name">Jordan K.</span>
      <span class="steps">45,880 steps</span>
    </li>
  </ol>
  <p class="context">You're ahead of 85% of intermediate walkers this week!</p>
  <p class="personal">Your best week: 53,100 steps (2 weeks ago)</p>
</div>`,
        explanation:
          'Segmenting by activity level ensures fair comparison. Showing the user\'s percentile (top 15%) provides a motivating downward comparison, while the personal best gives a self-referenced target. Weekly reset keeps the leaderboard accessible to all.',
        principle:
          'Segmented, time-windowed comparisons with downward-comparison framing sustain motivation without demoralizing',
        metrics: {
          before: '38% weekly active users in challenges with all-time global leaderboard',
          after: '61% weekly active users with segmented weekly leaderboard',
          improvement: '60% increase in sustained challenge participation',
        },
      },
      {
        title: 'Peer Benchmark with Personal Progress',
        description:
          'Learning platform showing user progress compared to peers alongside personal trajectory',
        code: `<div class="progress-comparison">
  <h3>Your Learning Progress</h3>
  <div class="chart">
    <div class="bar you" style="width: 68%">
      <span class="label">You: 68% complete</span>
    </div>
    <div class="bar average" style="width: 52%">
      <span class="label">Avg learner: 52%</span>
    </div>
    <div class="bar top" style="width: 89%">
      <span class="label">Top 10%: 89%</span>
    </div>
  </div>
  <p class="insight">You're progressing 30% faster than average.
  At this pace, you'll finish 2 weeks ahead of most learners.</p>
  <p class="personal-trend">Last month you completed 4 modules.
  This month: 6 modules — a 50% improvement!</p>
</div>`,
        explanation:
          'Shows the user they are above average (downward comparison for confidence) while providing an aspirational top-10% target (upward comparison for motivation). The personal trend line anchors self-improvement independent of peers.',
        principle:
          'Balanced upward and downward comparisons with personal progress data prevent discouragement',
      },
      {
        title: 'Opt-In Team Comparison Dashboard',
        description:
          'Project management tool with toggleable team performance visibility',
        code: `<div class="team-dashboard">
  <div class="view-toggle">
    <button class="active">My Performance</button>
    <button>Team Comparison</button>
  </div>

  <div class="my-stats">
    <div class="stat">
      <span class="value">23</span>
      <span class="label">Tasks completed this sprint</span>
      <span class="trend up">+5 from last sprint</span>
    </div>
    <div class="stat">
      <span class="value">94%</span>
      <span class="label">On-time delivery</span>
      <span class="context">Team average: 87%</span>
    </div>
  </div>
</div>`,
        explanation:
          'Defaults to personal performance view, making team comparison opt-in. Users who thrive on competition can toggle it on; those who find it stressful see only their own trajectory. The subtle "team average" note provides light context without forcing a full comparison.',
        principle:
          'Opt-in comparison respects individual differences in comparison sensitivity',
      },
    ],

    bad: [
      {
        title: 'All-Time Unwinnable Leaderboard',
        description:
          'Gaming platform with a permanent leaderboard dominated by day-one players',
        code: `<!-- DON'T DO THIS -->
<div class="leaderboard">
  <h2>Top Players of All Time</h2>
  <ol>
    <li>xXProGamerXx — 2,847,291 XP (joined 2019)</li>
    <li>ElitePlayer99 — 2,103,445 XP (joined 2019)</li>
    <li>OGChampion — 1,998,332 XP (joined 2020)</li>
  </ol>
  <p class="your-rank">Your rank: #48,291 of 50,000</p>
  <p>Keep playing to climb the leaderboard!</p>
</div>`,
        explanation:
          'A new player at rank #48,291 sees no realistic path to the top. The upward comparison to players with years of accumulated XP is demoralizing, not motivating. This design drives churn among new and casual users.',
        principle:
          'All-time leaderboards without segmentation punish newcomers and reward only incumbents',
      },
      {
        title: 'Forced Social Feed Comparison',
        description:
          'Professional network forcing users to see peers\' highlight reels with no opt-out',
        code: `<!-- DON'T DO THIS -->
<div class="feed">
  <div class="update">
    <p><strong>Sarah</strong> just got promoted to VP of Engineering!</p>
    <span class="reactions">1,247 reactions</span>
  </div>
  <div class="update">
    <p><strong>Marcus</strong> completed his MBA at Stanford!</p>
    <span class="reactions">892 reactions</span>
  </div>
  <div class="update">
    <p><strong>Lisa</strong> raised $10M Series A!</p>
    <span class="reactions">2,103 reactions</span>
  </div>
  <div class="prompt">
    <p>What have you been up to? Share an update!</p>
  </div>
</div>`,
        explanation:
          'A curated stream of peers\' peak achievements creates relentless upward comparison. Users see everyone else\'s highlight reel and compare it to their own ordinary day. The prompt to "share an update" adds pressure. This pattern is linked to decreased well-being and increased anxiety.',
        principle:
          'Unfiltered highlight-reel feeds amplify upward comparison and reduce user well-being',
      },
      {
        title: 'Public Shaming Through Comparison',
        description:
          'Sales dashboard publicly displaying bottom performers',
        code: `<!-- DON'T DO THIS -->
<div class="sales-board">
  <h3>Sales Performance — Q1</h3>
  <div class="top-performers" style="background: green; color: white;">
    <h4>Top Sellers</h4>
    <p>Jake: $245,000 | Maria: $198,000</p>
  </div>
  <div class="bottom-performers" style="background: red; color: white;">
    <h4>Needs Improvement</h4>
    <p>Tom: $23,000 | Priya: $31,000</p>
  </div>
</div>`,
        explanation:
          'Publicly labeling bottom performers with red styling creates humiliation rather than motivation. This weaponizes downward comparison for others while inflicting shame on those named. It damages psychological safety and team trust.',
        principle:
          'Never use social comparison to publicly shame — it destroys trust and motivation',
      },
    ],

    realWorld: [
      {
        company: 'LinkedIn',
        product: 'Profile Views & Search Appearances',
        description: 'LinkedIn shows users how many people viewed their profile and how they rank compared to connections. "Your profile was viewed 47 times — you appeared in 12% more searches than last week." This triggers upward comparison with highly-viewed connections and motivates profile optimization.',
        effectiveness: 'effective',
        analysis: 'LinkedIn uses peer comparison to drive engagement. The relative framing ("12% more") provides self-referenced progress, but the profile-view count invites comparison to connections with higher numbers, encouraging users to post more and optimize their profiles.',
      },
      {
        company: 'Strava',
        product: 'Segment Leaderboards & Clubs',
        description: 'Strava ranks athletes on specific route segments, showing their time relative to the KOM/QOM (King/Queen of the Mountain) and friends. Clubs create smaller comparison pools. Users can see exactly how they rank among peers on every run or ride.',
        effectiveness: 'very-effective',
        analysis: 'Strava expertly layers comparison: global leaderboard for the competitive, friend-filtered view for the social, and personal records for the self-improvement-focused. Segment-level granularity means even mid-pack athletes can find segments where they rank well.',
      },
      {
        company: 'Fitbit',
        product: 'Workweek Hustle & Weekend Warrior Challenges',
        description: 'Fitbit lets friends challenge each other to step competitions over set time periods. Participants see real-time step counts and relative rankings throughout the challenge window, with push notifications when someone overtakes them.',
        effectiveness: 'effective',
        analysis: 'Time-bounded challenges with friend groups create manageable comparison pools. The real-time updates and "someone just passed you" notifications leverage loss aversion alongside social comparison. However, fitness-level mismatches can demoralize less active participants.',
      },
      {
        company: 'Instagram',
        product: 'Social Feed & Follower Counts',
        description: 'Instagram exposes follower counts, like counts, and a curated feed of peers\' best moments. Users constantly compare their life, appearance, and popularity to others\' highlight reels. The platform amplifies upward comparison with algorithmically boosted aspirational content.',
        effectiveness: 'effective',
        analysis: 'Instagram is effective at driving engagement through social comparison but has documented negative effects on user well-being, particularly among younger users. The hiding of like counts in some regions was a direct response to the harmful effects of comparison-driven metrics.',
      },
    ],

    abTests: [
      {
        title: 'Leaderboard Framing: Rank Position vs Percentile',
        hypothesis:
          'Showing "top X%" percentile framing will sustain engagement better than raw rank position for users outside the top 20',
        controlVersion: {
          description:
            'Learning platform showing raw rank: "Your rank: #847 of 5,000 learners"',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '2:10',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Learning platform showing percentile: "You\'re in the top 17% of learners — ahead of 4,153 people!"',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '3:40',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Percentile framing with downward-comparison language ("ahead of 4,153 people") increased return visits by 53%. Raw rank (#847) felt discouraging even though it represents the same position. Users reported feeling "accomplished" vs "mediocre" for identical standing.',
          learnings: [
            'Downward-comparison framing ("ahead of X") is more motivating than position framing ("#847")',
            'Absolute numbers of people "behind" the user make their lead feel tangible',
            'Effect was strongest for users ranked 50th–85th percentile',
            'Users in the bottom 20% were equally discouraged by both framings — consider hiding comparison for this cohort',
          ],
        },
      },
      {
        title: 'Opt-In vs Default-On Peer Comparison',
        hypothesis:
          'Making peer comparison opt-in will reduce churn among comparison-sensitive users without decreasing engagement among competitive users',
        controlVersion: {
          description:
            'Productivity app showing team comparison dashboard by default for all users',
          metrics: {
            conversionRate: '71%',
            clickThroughRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Productivity app defaulting to personal-only view with a "Compare with team" toggle',
          metrics: {
            conversionRate: '78%',
            clickThroughRate: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Opt-in comparison reduced 30-day churn by 18%. Competitive users (42% of total) toggled comparison on and engaged at the same rate as the control group. Comparison-sensitive users (58%) stayed longer and reported higher satisfaction. Net engagement was higher in the treatment.',
          learnings: [
            'A significant portion of users are harmed by forced social comparison',
            'Competitive users will seek out comparison features regardless of default',
            'Opt-in preserves motivation for those who benefit while protecting those who do not',
            'Default-off with easy toggle is the ethical and effective middle ground',
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
        name: 'Leaderboards and Rankings',
        description:
          'Ordered lists showing users ranked by performance, activity, or achievement',
        howToSpot:
          'Look for numbered lists, rank badges, podium displays, or "Top N" sections',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Percentile or "You vs Average" Displays',
        description:
          'Messaging that positions the user relative to a peer group average or percentile',
        howToSpot:
          'Look for "You\'re in the top X%", "ahead of X users", or bar charts comparing user to average',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Peer Activity Feeds',
        description:
          'Streams of peer achievements, milestones, or status updates that invite comparison',
        howToSpot:
          'Look for social feeds, activity timelines, or notification streams showing what peers accomplished',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Achievement and Badge Systems',
        description:
          'Visible badges, trophies, or achievement levels that differ across users',
        howToSpot:
          'Look for profile badges, streak indicators, tier labels (Gold, Silver, Bronze), or achievement galleries',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Contribution or Activity Visualizations',
        description:
          'Heat maps, graphs, or charts showing user activity intensity over time',
        howToSpot:
          'Look for contribution grids (like GitHub), activity calendars, or streak displays',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Competitive Ranking Pattern',
        description: 'Users are explicitly ranked against peers in a visible leaderboard',
        indicators: [
          'Numbered position in a list',
          'Movement indicators (up/down arrows)',
          'Crown or trophy for top positions',
          'Visible rank on user profiles',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Peer Benchmark Pattern',
        description: 'User performance shown relative to a group average or median',
        indicators: [
          '"You vs Average" displays',
          'Percentile rankings',
          '"X% of users do this" messaging',
          'Benchmark lines on progress charts',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Social Achievement Pattern',
        description: 'Peer accomplishments surfaced in feeds, notifications, or profiles',
        indicators: [
          '"Congratulate X on their promotion" prompts',
          'Achievement feeds showing peer milestones',
          'Visible badge or tier differences between users',
          'Follower or connection count displays',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Progress Comparison Pattern',
        description: 'User progress displayed alongside or benchmarked against peer progress',
        indicators: [
          'Side-by-side progress bars',
          '"Teams like yours" benchmark messaging',
          'Cohort comparison charts',
          'Completion-rate averages shown alongside personal rate',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are users\' performances or achievements visible to other users?',
      'Is there a leaderboard, ranking, or competitive display?',
      'Is the user compared to an average, median, or peer group?',
      'Can users see peers\' activity, progress, or status?',
      'Is comparison segmented fairly (by cohort, skill level, or time window)?',
      'Is comparison opt-in or forced?',
      'Does the framing use upward comparison ("top performers"), downward comparison ("you\'re ahead of X%"), or both?',
      'Are bottom-performing users shamed or identified publicly?',
      'Could the comparison data be incomplete or misleading?',
      'Has the design been tested for negative emotional impact on lower-performing users?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in social comparison bias.

Analyze the provided design for social comparison patterns. Identify:

1. **Comparison Surfaces**: Where users can see peer performance, progress, or status
2. **Comparison Direction**: Whether comparisons are upward (to better performers), downward (to worse performers), or lateral (to similar peers)
3. **Framing**: How comparison data is presented — rank position, percentile, absolute numbers, visual encodings
4. **Segmentation**: Whether comparisons are fair (same cohort, time window, skill level)
5. **Opt-In vs Forced**: Whether users can control comparison visibility

For each pattern found:
- Identify who benefits and who is harmed by the comparison
- Assess whether the comparison is motivating or demoralizing
- Determine if the comparison metric is complete or misleading
- Evaluate whether users can opt out
- Suggest improvements for ethical, balanced social comparison

Consider:
- Are upward comparisons balanced with downward context?
- Could lower-performing users be demoralized or shamed?
- Is the comparison metric representative of real performance?
- Does the design allow for individual differences in comparison sensitivity?
- Are there accessibility concerns with how comparison data is presented?

Provide actionable recommendations for motivating comparison design.`,

    outputSchema: {
      type: 'object',
      properties: {
        comparisonPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              direction: { type: 'string' },
              framing: { type: 'string' },
              segmentation: { type: 'string' },
              motivatingOrDemoralizing: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'direction',
              'framing',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            comparisonBalance: { type: 'number' },
            fairness: { type: 'number' },
            optInControl: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'comparisonBalance',
            'fairness',
            'optInControl',
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
        'comparisonPatterns',
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
        title: 'Identify the Comparison Goal',
        description:
          'Determine what outcome the comparison should drive: motivation, norm-setting, accountability, or celebration',
        example:
          'Goal: Motivate mid-tier learners to complete their course by showing they are ahead of average',
        tips: [
          'Define the target user segment that benefits from comparison',
          'Choose the comparison direction (upward, downward, or lateral) that best serves the goal',
          'Consider who might be harmed by the comparison',
        ],
      },
      {
        step: 2,
        title: 'Choose Fair Comparison Groups',
        description:
          'Segment users into meaningful peer groups so comparisons feel relevant and achievable',
        example:
          'Compare users to others who started the same month, have similar usage patterns, or are in the same role',
        tips: [
          'Use cohort-based comparison (same start date, tier, or segment)',
          'Avoid comparing beginners to power users',
          'Let users choose their comparison group when possible',
        ],
      },
      {
        step: 3,
        title: 'Frame Comparisons Constructively',
        description:
          'Use language and visuals that motivate rather than shame or discourage',
        example:
          'Say "You\'re ahead of 73% of learners" instead of "You\'re ranked #135 of 500"',
        tips: [
          'Use percentile framing for users above the median',
          'Pair upward comparisons with actionable next steps',
          'Show personal improvement alongside peer comparison',
        ],
      },
      {
        step: 4,
        title: 'Make Comparison Opt-In',
        description:
          'Default to personal progress view and let users toggle peer comparison on',
        example:
          'Show "My Progress" by default with a "Compare with peers" toggle',
        tips: [
          'Respect that not everyone is motivated by competition',
          'Save user preference for future sessions',
          'Consider hiding comparison for the bottom quartile',
        ],
      },
      {
        step: 5,
        title: 'Measure Emotional Impact',
        description:
          'Track not just engagement but also well-being, satisfaction, and churn across user segments',
        example:
          'Survey users: "How did seeing the leaderboard make you feel?" Segment results by rank quartile.',
        tips: [
          'Monitor churn rates for bottom-quartile users after comparison exposure',
          'Track sentiment alongside engagement metrics',
          'A/B test comparison on vs off and measure long-term retention, not just clicks',
        ],
      },
    ],

    dos: [
      'Segment leaderboards by cohort, skill level, or time window for fair comparison',
      'Balance upward comparisons with downward-comparison context ("you\'re ahead of X%")',
      'Show personal progress alongside peer benchmarks',
      'Make peer comparison opt-in, not forced',
      'Use time-windowed rankings (weekly, monthly) so newcomers can compete',
      'Frame comparisons constructively with actionable next steps',
      'Celebrate diverse forms of achievement, not just a single metric',
      'Test comparison features for negative emotional impact on lower-performing users',
    ],

    donts: [
      'Don\'t publicly identify or shame bottom performers',
      'Don\'t show all-time leaderboards that newcomers can never climb',
      'Don\'t compare users on incomplete or misleading metrics',
      'Don\'t force social comparison on users who haven\'t opted in',
      'Don\'t use social comparison in mental health, therapy, or recovery contexts',
      'Don\'t compare creative or subjective work with competitive rankings',
      'Don\'t rely solely on upward comparisons that demoralize the majority',
      'Don\'t expose salary, income, or revenue comparisons between individuals without consent',
    ],

    bestPractices: [
      {
        title: 'Use Percentile Framing Over Rank Position',
        description:
          'Show "You\'re in the top 15%" rather than "You\'re ranked #127 of 850"',
        rationale:
          'Percentile framing emphasizes how many people the user is ahead of (downward comparison), while rank position emphasizes distance from the top (upward comparison)',
        example:
          '"You\'re ahead of 723 learners this month!" next to a progress bar',
      },
      {
        title: 'Pair Peer Comparison with Self-Comparison',
        description:
          'Always show the user\'s own trend alongside peer data',
        rationale:
          'Self-referenced progress provides a stable sense of improvement even when peer ranking fluctuates',
        example:
          'Bar chart showing "You vs Average" next to a line chart of "Your progress over time"',
      },
      {
        title: 'Time-Window Leaderboards',
        description:
          'Reset leaderboards weekly or monthly so all users start fresh',
        rationale:
          'Prevents incumbent advantage, gives newcomers a chance to compete, and keeps competition fresh',
        example:
          '"This Week\'s Top Performers" resets every Monday at midnight',
      },
      {
        title: 'Segment by Similarity',
        description:
          'Compare users to peers who are similar in experience, role, or starting point',
        rationale:
          'Festinger\'s similarity hypothesis: comparisons to similar others are more meaningful and motivating',
        example:
          '"Among teams your size (10–20 people), you\'re in the top quartile"',
      },
      {
        title: 'Protect the Bottom Quartile',
        description:
          'Hide or soften comparison data for users who are significantly below average',
        rationale:
          'Users in the bottom 25% are most likely to be demoralized and churn; comparison hurts rather than helps them',
        example:
          'Show personal progress only for bottom-quartile users; reveal peer comparison as they improve',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Ranking and comparison data must be semantically structured',
        implementation:
          'Use ordered lists for leaderboards, table elements for comparison grids, and ARIA labels to convey rank context (e.g., aria-label="Your rank: 4th out of 30")',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Don\'t rely on color alone to indicate relative standing',
        implementation:
          'Combine green/red ranking colors with text labels ("Above average", "Below average"), icons (arrows), or patterns',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard — Leaderboards and comparison toggles must be keyboard navigable',
        implementation:
          'Ensure leaderboard rows are focusable, comparison toggles are operable via keyboard, and rank changes are announced via ARIA live regions',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages — Rank changes and comparison updates must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" for rank updates and comparison data changes so screen reader users are informed without interruption',
      },
    ],

    ethics: [
      {
        concern: 'Public Shaming',
        severity: 'critical',
        explanation:
          'Identifying bottom performers by name or displaying them in a "needs improvement" section causes humiliation and psychological harm',
        mitigation:
          'Never publicly identify low performers. Show aggregate data (averages, distributions) instead of individual bottom-rank names. Provide private feedback.',
      },
      {
        concern: 'Anxiety and Reduced Well-Being',
        severity: 'high',
        explanation:
          'Constant upward comparison in social feeds and leaderboards is linked to increased anxiety, depression, and reduced self-esteem',
        mitigation:
          'Make comparison opt-in. Balance upward with downward comparisons. Show personal progress alongside peer data. Monitor well-being metrics.',
      },
      {
        concern: 'Metric Gaming',
        severity: 'high',
        explanation:
          'When users are compared on a single metric, they optimize for that metric at the expense of quality, health, or other values',
        mitigation:
          'Use multi-dimensional comparison or qualitative assessments. Rotate featured metrics. Avoid single-number rankings for complex work.',
      },
      {
        concern: 'Inequitable Comparison',
        severity: 'high',
        explanation:
          'Comparing users who have unequal resources, time, or starting positions creates unfair judgment',
        mitigation:
          'Segment comparison groups by relevant factors (experience, resources, role). Normalize data before comparing. Acknowledge structural advantages.',
      },
      {
        concern: 'Addictive Comparison Loops',
        severity: 'medium',
        explanation:
          'Notifications like "someone just passed you!" exploit loss aversion to create compulsive checking behavior',
        mitigation:
          'Limit comparison-based notifications. Let users set notification frequency. Avoid triggering loss-aversion language for comparison features.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Theory of Social Comparison Processes',
        author: 'Festinger, L.',
        year: 1954,
        doi: '10.1177/001872675400700202',
        description:
          'The foundational paper introducing social comparison theory — the origin of the concept that humans evaluate their abilities and opinions by comparing to others',
        type: 'foundational',
      },
      {
        title: 'Upward and Downward Social Comparisons: Bidirectional Consequences for the Self',
        author: 'Buunk, B. P., & Gibbons, F. X.',
        year: 2007,
        description:
          'Comprehensive review of how upward and downward comparisons differentially affect self-evaluation and motivation',
        type: 'advanced',
      },
      {
        title: 'Social Comparison, Social Media, and Self-Esteem',
        author: 'Vogel, E. A., Rose, J. P., Roberts, L. R., & Eckles, K.',
        year: 2014,
        doi: '10.1037/a0036740',
        description:
          'Empirical study showing that social media use involving upward social comparison reduces self-esteem and positive self-evaluation',
        type: 'case-study',
      },
      {
        title: 'The Effects of Social Comparison Direction on Motivation and Performance',
        author: 'Garcia, S. M., Tor, A., & Schiff, T. M.',
        year: 2013,
        description:
          'Examines when upward comparison motivates versus when it discourages, and the role of perceived closeness to the comparison target',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Social Comparison and Social Psychology',
        author: 'Guimond, S. (Ed.)',
        year: 2006,
        isbn: '9780521545662',
        description:
          'Comprehensive academic volume covering social comparison theory from its origins to modern applications',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Covers variable social rewards and comparison mechanics in product design — practical for understanding leaderboard and feed design',
        type: 'practical',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'The chapter on social proof directly connects to social comparison mechanisms in persuasive design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Dangers of Social Comparison in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/social-comparison/',
        description:
          'Practical UX guidance on when social comparison helps and when it harms user experience',
        type: 'practical',
      },
      {
        title: 'Designing Ethical Leaderboards',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/gamification-leaderboards',
        description:
          'Guidelines for designing leaderboards that motivate without demoralizing',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Social Comparison Theory Explained',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/watch?v=qJxATPIqRv8',
        description:
          'Accessible overview of Festinger\'s social comparison theory with modern examples',
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
      'social-proof',        // Seeing peer behavior reinforces comparison-driven choices
      'bandwagon-effect',    // Wanting to join what peers are doing amplifies comparison
      'loss-aversion',       // "Someone just passed you" leverages loss aversion via comparison
      'status-quo-bias',     // Peer comparison can break or reinforce status quo
      'scarcity-bias',       // Limited top spots make leaderboard positions feel scarce
    ],

    conflicts: [
      'intrinsic-motivation', // External comparison can undermine internal motivation
      'autonomy-bias',        // Forced comparison reduces sense of control
    ],

    confusedWith: [
      'social-proof',        // Social proof is about following others; social comparison is about evaluating self against others
      'relative-deprivation', // Related but focuses on perceived injustice rather than self-evaluation
      'envy',                // Envy is an emotional outcome of upward comparison, not the bias itself
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'upward-comparison',
        'downward-comparison',
        'lateral-comparison',
      ],
    },
  },
};
