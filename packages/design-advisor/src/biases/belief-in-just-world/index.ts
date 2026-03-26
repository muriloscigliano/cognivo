/**
 * BELIEF IN A JUST WORLD
 *
 * People need to believe the world is fair — that good behavior
 * leads to good outcomes and bad behavior leads to bad outcomes.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const beliefInJustWorld: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'belief-in-just-world',
    name: 'Belief in a Just World',
    aliases: ['Just-World Hypothesis', 'Just-World Fallacy', 'Deservingness Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'fairness',
      'meritocracy',
      'reward-systems',
      'gamification',
      'trust',
      'motivation',
      'reputation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People need to believe the world is fair — that good behavior leads to good outcomes and bad behavior leads to bad outcomes.',

    detailed: `The Belief in a Just World is a cognitive bias in which people assume that the world is fundamentally fair and orderly. Individuals who hold this belief tend to think that people "get what they deserve" — that effort, merit, and moral behavior are reliably rewarded, while laziness, cheating, or immoral behavior are reliably punished.

This belief serves a deep psychological need: it gives people a sense of control and predictability. If the world is fair, then personal effort matters and outcomes are not random. However, this belief can also lead people to blame victims ("they must have done something wrong") or to over-attribute success to personal merit while ignoring systemic factors.

In product design, this bias has profound implications for gamification, reputation systems, ranking algorithms, and any feature that connects user effort to visible outcomes. Users expect transparency, proportionality, and consistency in how rewards are distributed. Violations of perceived fairness — opaque algorithms, unexplained rank changes, invisible criteria — trigger strong negative reactions because they threaten the user's belief that the system is just.`,

    psychologyBasis: {
      discoveredBy: 'Melvin J. Lerner',
      year: 1965,
      theory: 'Just-World Theory',
      mechanism: `People are motivated to believe the world is a place where individuals get what they deserve. This happens because:

1. **Need for Control**: Believing outcomes are predictable (effort = reward) gives a sense of personal agency and safety
2. **Threat Reduction**: A just world is less threatening — if bad things only happen to those who deserve them, I can protect myself by being good
3. **Cognitive Consistency**: People resolve the discomfort of witnessing undeserved suffering by reinterpreting events to fit a just-world narrative
4. **Social Contract**: The belief underpins cooperation — if fairness is guaranteed, investing effort and following rules makes sense
5. **Identity Protection**: People who work hard need to believe their effort will be fairly rewarded, or the effort feels meaningless`,
    },

    realWorldExample: `Lerner's foundational experiment (1966) showed participants a video of a person receiving painful electric shocks. When told the shocks would continue with no resolution, participants derogated the victim — rating them as less likeable and deserving of their fate. This demonstrated that people will distort their perception of others to maintain the belief that outcomes are deserved, rather than accept that suffering can be random and unjust.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Belief in a Just World deeply affects how users perceive reward systems, rankings, algorithmic decisions, and effort-outcome relationships in interfaces. Designers can leverage this to:

- Build trust through transparent, meritocratic reward systems where effort visibly leads to outcomes
- Increase motivation by making the connection between user actions and rewards crystal clear
- Design fair ranking algorithms that users perceive as equitable and deserved
- Create achievement systems where criteria are explicit and attainable
- Reduce churn by ensuring users never feel the system is arbitrary or unfair`,

    whenToUse: [
      {
        title: 'Reputation and Karma Systems',
        scenario:
          'When building systems where user contributions earn visible standing',
        example:
          'Display clear criteria for reputation levels: "Answer 50 questions with 10+ upvotes to reach Gold status"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Gamification and Achievement Systems',
        scenario: 'When motivating users through badges, levels, or milestones',
        example:
          'Show progress bars with explicit criteria: "Complete 3 more projects to unlock Advanced Designer badge"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Transparent Reward Programs',
        scenario: 'When connecting user effort to tangible rewards or benefits',
        example:
          'Loyalty program showing exactly how many points each action earns and what rewards they unlock',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Fair Ranking and Matching',
        scenario: 'When ranking users, content, or products algorithmically',
        example:
          'Explain ranking factors: "Your listing ranks based on response time (30%), reviews (40%), and completion rate (30%)"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Performance Reviews and Feedback',
        scenario: 'When providing evaluations or assessments of user performance',
        example:
          'Show specific, objective criteria alongside ratings so users understand exactly why they received their score',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and Skill Building',
        scenario: 'When guiding users through a learning or mastery path',
        example:
          'Progressive skill tree showing clear prerequisites and unlocks: "Complete Module 3 to access Advanced Analytics"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Situations With Systemic Inequality',
        reason:
          'Meritocratic framing can mask structural advantages or disadvantages beyond user control',
        consequence:
          'Users facing systemic barriers feel blamed for outcomes they cannot control, leading to frustration and attrition',
        alternative:
          'Acknowledge contextual factors and provide multiple pathways to success that account for different starting points',
      },
      {
        title: 'Unpredictable or Random Outcomes',
        reason:
          'Framing random outcomes as deserved creates false expectations and eventual disillusionment',
        consequence:
          'Users lose trust when they discover outcomes are not actually tied to effort or merit',
        alternative:
          'Be transparent about probabilistic or random elements; do not dress up chance as merit',
      },
      {
        title: 'Victim-Blaming Contexts',
        reason:
          'Just-world framing can lead users to blame others (or themselves) for outcomes beyond their control',
        consequence:
          'Harmful attribution patterns, reduced empathy, and toxic community dynamics',
        alternative:
          'Design systems that separate effort from uncontrollable factors and avoid implying that negative outcomes are always deserved',
      },
      {
        title: 'Opaque Algorithmic Decisions',
        reason:
          'Claiming fairness while using opaque algorithms erodes trust when users cannot verify the claim',
        consequence:
          'Users who cannot understand ranking criteria assume the system is rigged against them',
        alternative:
          'Provide algorithm transparency: explain ranking factors, weights, and how users can improve their standing',
      },
    ],

    commonMistakes: [
      {
        title: 'Invisible Criteria',
        description:
          'Creating achievement or ranking systems without explaining how they work',
        why: 'Users assume the system is unfair if they cannot see the rules, violating their just-world expectation',
        fix: 'Publish clear, specific criteria for every rank, badge, or reward tier',
      },
      {
        title: 'Disproportionate Rewards',
        description:
          'Reward systems where small differences in effort produce huge differences in outcomes',
        why: 'Winner-take-all dynamics feel unjust to users who contributed significant effort but received nothing',
        fix: 'Design graduated reward tiers so that incremental effort always produces incremental reward',
      },
      {
        title: 'Retroactive Rule Changes',
        description:
          'Changing criteria for achievements or rankings after users have invested effort',
        why: 'Violates the implicit contract that effort under the old rules would be fairly rewarded',
        fix: 'Grandfather existing progress when changing systems, or provide clear migration paths',
      },
      {
        title: 'False Meritocracy Claims',
        description:
          'Claiming the system is fair when it demonstrably advantages certain users over others',
        why: 'Users who discover the gap between claimed and actual fairness lose all trust in the platform',
        fix: 'Audit systems for bias regularly and be honest about limitations and ongoing improvements',
      },
      {
        title: 'Ignoring Context',
        description:
          'Treating all users as having equal opportunity when starting conditions differ',
        why: 'New users competing against veterans in the same ranking feel the system is rigged',
        fix: 'Provide cohort-based comparisons, beginner tiers, or handicapping mechanisms',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how transparently effort-reward connections are displayed',
        examples: [
          'Progress indicators showing how far users are from the next reward',
          'Side-by-side comparisons of criteria met vs criteria remaining',
          'Leaderboards with visible ranking factors, not just positions',
          'Achievement dashboards that connect specific actions to specific outcomes',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography signals the importance and clarity of fairness information',
        examples: [
          'Clear, readable criteria text that does not hide important rules in fine print',
          'Bold emphasis on key ranking factors to signal transparency',
          'Consistent formatting for reward tiers to imply systematic fairness',
          'Accessible font sizes for all criteria and rules documentation',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color reinforces perceived fairness through consistent status signaling',
        examples: [
          'Consistent color coding for achievement tiers (bronze, silver, gold) that implies earned progression',
          'Green for positive progress and earned rewards',
          'Neutral tones for unearned/locked states to avoid implying punishment',
          'Warning colors only for genuine rule violations, not for unmet optional criteria',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive feedback loops are the primary mechanism for reinforcing perceived fairness',
        examples: [
          'Immediate feedback when actions contribute to progress or reputation',
          'Real-time point accrual visible as users complete qualifying actions',
          'Clear undo/appeal mechanisms when users disagree with algorithmic decisions',
          'Hover states explaining why specific items are ranked where they are',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users perceive the system as just or arbitrary',
        examples: [
          'Explicit documentation of how rankings, rewards, and penalties are calculated',
          'Success stories that accurately represent typical outcomes, not just outliers',
          'Messaging that connects effort to outcome: "You earned this because..."',
          'Honest acknowledgment when outcomes involve factors beyond user control',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Fairness must extend to accessible design — all users deserve equal opportunity to succeed',
        examples: [
          'Achievement criteria and progress must be perceivable by screen reader users',
          'Color-coded tiers must have text or icon alternatives for color-blind users',
          'Keyboard-navigable leaderboards and achievement interfaces',
          'Time-based challenges must accommodate users who need more time',
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
        title: 'Transparent Reputation System',
        description:
          'Q&A platform with clear, visible criteria for reputation levels',
        code: `<div class="reputation-dashboard">
  <h3>Your Reputation: 2,847 points</h3>
  <div class="current-level">
    <span class="level-badge gold">Gold Contributor</span>
    <p>Earned by reaching 2,500+ reputation points</p>
  </div>

  <div class="point-breakdown">
    <h4>How You Earned Points</h4>
    <ul class="earnings">
      <li>
        <span class="action">Answer accepted</span>
        <span class="points">+15 points each</span>
        <span class="count">142 times</span>
      </li>
      <li>
        <span class="action">Answer upvoted</span>
        <span class="points">+10 points each</span>
        <span class="count">87 times</span>
      </li>
      <li>
        <span class="action">Question upvoted</span>
        <span class="points">+5 points each</span>
        <span class="count">23 times</span>
      </li>
    </ul>
  </div>

  <div class="next-level">
    <h4>Next Level: Platinum (5,000 points)</h4>
    <div class="progress-bar" role="progressbar"
         aria-valuenow="2847" aria-valuemin="2500" aria-valuemax="5000">
      <div class="fill" style="width: 14%"></div>
    </div>
    <p>2,153 points to go</p>
  </div>
</div>`,
        explanation:
          'Every point is accounted for with a visible, understandable action. Users can see exactly what they did to earn their status and what they need to do next. This satisfies the just-world expectation: effort is visibly and proportionally rewarded.',
        principle:
          'Transparent effort-reward mapping reinforces the belief that the system is fair and meritocratic',
        metrics: {
          before: '34% of users actively contributed content',
          after: '58% of users actively contributed after transparent reputation launch',
          improvement: '71% increase in user contributions with visible, fair reward system',
        },
      },
      {
        title: 'Fair Ranking Algorithm Explainer',
        description:
          'Marketplace showing sellers exactly how their ranking is calculated',
        code: `<div class="ranking-explainer">
  <h3>Your Seller Ranking: #47 of 1,200</h3>

  <div class="ranking-factors">
    <h4>Your Ranking Breakdown</h4>
    <div class="factor">
      <span class="label">Customer Reviews (40%)</span>
      <div class="bar" style="width: 92%"></div>
      <span class="score">4.6 / 5.0</span>
    </div>
    <div class="factor">
      <span class="label">Response Time (30%)</span>
      <div class="bar" style="width: 78%"></div>
      <span class="score">2.1 hours avg</span>
    </div>
    <div class="factor">
      <span class="label">Order Completion (20%)</span>
      <div class="bar" style="width: 95%"></div>
      <span class="score">98.2%</span>
    </div>
    <div class="factor">
      <span class="label">Return Rate (10%)</span>
      <div class="bar" style="width: 88%"></div>
      <span class="score">1.8%</span>
    </div>
  </div>

  <div class="improvement-tips">
    <h4>How to Improve</h4>
    <p>Your biggest opportunity: <strong>Response Time</strong>.
    Reducing average response from 2.1h to under 1h could move you
    to the top 30.</p>
  </div>
</div>`,
        explanation:
          'The ranking factors are explicit, weighted, and actionable. Sellers know exactly what determines their position and what they can do to improve. This satisfies the just-world need: rank is earned through measurable, controllable behaviors.',
        principle:
          'Algorithmic transparency converts opaque rankings into perceived meritocracy',
      },
      {
        title: 'Achievement System with Clear Criteria',
        description:
          'Learning platform with explicit, attainable achievement milestones',
        code: `<div class="achievements">
  <h3>Your Achievements</h3>

  <div class="achievement earned">
    <span class="icon" aria-hidden="true">&#x2705;</span>
    <div class="details">
      <h4>First Steps</h4>
      <p>Complete your first course</p>
      <span class="date">Earned March 2, 2026</span>
    </div>
  </div>

  <div class="achievement earned">
    <span class="icon" aria-hidden="true">&#x2705;</span>
    <div class="details">
      <h4>Consistent Learner</h4>
      <p>Study for 7 consecutive days</p>
      <span class="date">Earned March 10, 2026</span>
    </div>
  </div>

  <div class="achievement in-progress">
    <span class="icon" aria-hidden="true">&#x1F512;</span>
    <div class="details">
      <h4>Knowledge Sharer</h4>
      <p>Help 10 other learners with their questions</p>
      <div class="progress">
        <div class="bar" style="width: 70%"></div>
        <span>7 / 10 completed</span>
      </div>
    </div>
  </div>

  <div class="achievement locked">
    <span class="icon" aria-hidden="true">&#x1F512;</span>
    <div class="details">
      <h4>Master Analyst</h4>
      <p>Score 90%+ on all Advanced Analytics assessments</p>
    </div>
  </div>
</div>`,
        explanation:
          'Each achievement has a clear, specific criterion that is entirely within the user\'s control. Progress is visible and incremental. Users know exactly what they must do and can see themselves getting closer. No hidden requirements, no arbitrary gates.',
        principle:
          'Clear, attainable criteria make achievement systems feel fair and motivating',
      },
    ],

    bad: [
      {
        title: 'Opaque Ranking Algorithm',
        description:
          'Marketplace with hidden ranking factors that frustrate sellers',
        code: `<!-- DON'T DO THIS -->
<div class="seller-dashboard">
  <h3>Your Visibility Score: Low</h3>
  <p>Your listings are not being shown to many buyers.</p>
  <p class="help-text">Improve your score by being a better seller.</p>
  <button>Learn More</button>
  <!-- "Learn More" leads to a generic FAQ with no specific criteria -->
</div>`,
        explanation:
          'The system tells sellers their score is "Low" without explaining why or how to improve. "Be a better seller" is vague and feels arbitrary. This violates the just-world expectation because users cannot see the connection between their effort and their outcomes.',
        principle:
          'Opaque systems feel unjust — users who cannot see the rules assume the game is rigged',
      },
      {
        title: 'Winner-Take-All Contest',
        description:
          'Platform where only the top contributor gets any reward',
        code: `<!-- DON'T DO THIS -->
<div class="contest">
  <h2>Monthly Creator Contest</h2>
  <p>The creator with the most engagement this month wins $10,000!</p>
  <div class="leaderboard">
    <div class="leader">#1: @PowerUser (142,000 engagements)</div>
    <div class="you">#847: You (230 engagements)</div>
  </div>
  <p>Keep creating to win!</p>
</div>`,
        explanation:
          'A single massive prize for the top person means 99.9% of participants receive nothing regardless of effort. Users who contributed significant work but cannot compete with power users feel the system is fundamentally unfair. This destroys motivation for the vast majority.',
        principle:
          'Winner-take-all dynamics violate proportional fairness — effort without any reward feels unjust',
      },
      {
        title: 'Retroactive Devaluation',
        description:
          'Loyalty program that changes point values after users have earned them',
        code: `<!-- DON'T DO THIS -->
<div class="loyalty-update">
  <h3>Important Update to Your Rewards</h3>
  <p>We've updated our rewards program! Points now require
  2x the previous amount for redemption.</p>
  <p>Your 5,000 points were worth $50. They are now worth $25.</p>
  <p class="small">We're always working to improve your experience.</p>
</div>`,
        explanation:
          'Users earned points under a contract that promised specific value. Changing the terms retroactively is a direct violation of the just-world compact: users did the right thing (earned points through engagement) but are now punished with devalued rewards. This destroys trust completely.',
        principle:
          'Retroactive rule changes violate the fairness contract and destroy platform trust',
      },
    ],

    realWorld: [
      {
        company: 'Stack Overflow',
        product: 'Reputation System',
        description:
          'Stack Overflow awards specific, documented reputation points for each contribution type: +15 for accepted answers, +10 for answer upvotes, +5 for question upvotes. Privileges are unlocked at transparent thresholds. Users can see exactly how they earned every point.',
        effectiveness: 'very-effective',
        analysis:
          'The system works because every point is traceable to a specific action, criteria are public, and privileges are earned through demonstrated expertise. Users trust the system because it is visibly meritocratic.',
      },
      {
        company: 'Reddit',
        product: 'Karma System',
        description:
          'Reddit karma is earned through upvotes on posts and comments. While the exact algorithm is somewhat opaque, the core mechanism (good content = upvotes = karma) is clear. Karma serves as a visible reputation signal.',
        effectiveness: 'effective',
        analysis:
          'Karma works as a fairness signal because the core loop (contribute value, earn reputation) is transparent. However, the opaque conversion rate from upvotes to karma and the inability to spend karma limit its motivational power compared to more transparent systems.',
      },
      {
        company: 'Uber',
        product: 'Driver Ratings',
        description:
          'Uber drivers receive a star rating from riders after each trip. Drivers below 4.6 stars receive warnings, and those consistently below threshold may be deactivated. Riders also see driver ratings before accepting rides.',
        effectiveness: 'effective',
        analysis:
          'The rating system reinforces just-world beliefs by connecting service quality to visible outcomes. However, it has been criticized for rating biases based on factors outside driver control (traffic, passenger mood) — a limitation of applying just-world framing to partially uncontrollable outcomes.',
      },
      {
        company: 'Duolingo',
        product: 'XP and Leagues',
        description:
          'Duolingo awards XP for completing lessons, with clear point values per activity. Users compete in weekly leagues with transparent scoring. Promotion and demotion criteria are explicit.',
        effectiveness: 'very-effective',
        analysis:
          'The system excels because every XP point maps to a specific learning action, league standings update in real time, and promotion/demotion thresholds are visible. Users perceive the system as fair because effort directly and predictably produces results.',
      },
    ],

    abTests: [
      {
        title: 'Transparent vs Opaque Ranking Criteria',
        hypothesis:
          'Showing explicit ranking factors will increase seller satisfaction and engagement',
        controlVersion: {
          description:
            'Seller dashboard showing rank position only: "You are ranked #47 out of 1,200 sellers"',
          metrics: {
            conversionRate: '22%',
            timeOnPage: '0:45',
            satisfactionScore: '3.1/5',
          },
        },
        treatmentVersion: {
          description:
            'Seller dashboard showing rank with full factor breakdown, weights, individual scores, and actionable improvement tips',
          metrics: {
            conversionRate: '38%',
            timeOnPage: '3:20',
            satisfactionScore: '4.4/5',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Transparent criteria increased seller engagement by 73% and satisfaction by 42%. Sellers who could see exactly what determined their rank were significantly more likely to take improvement actions. Trust in the platform increased measurably.',
          learnings: [
            'Transparency directly satisfies the just-world need: visible rules feel fair',
            'Actionable criteria convert frustration into motivation',
            'Sellers spent 4x longer engaging with transparent dashboards',
            'Support tickets about "unfair rankings" dropped 61%',
          ],
        },
      },
      {
        title: 'Graduated vs Winner-Take-All Rewards',
        hypothesis:
          'Distributing rewards across multiple tiers will increase participation',
        controlVersion: {
          description:
            'Monthly contest with a single $5,000 prize for the top contributor',
          metrics: {
            participationRate: '8%',
            contentCreated: '1,200 pieces',
            repeatParticipation: '12%',
          },
        },
        treatmentVersion: {
          description:
            'Monthly contest with tiered rewards: Top 1 gets $1,000, Top 10 get $200, Top 50 get $50, Top 100 get a badge',
          metrics: {
            participationRate: '34%',
            contentCreated: '4,800 pieces',
            repeatParticipation: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Graduated rewards increased participation by 325% and content volume by 300%. More users felt they had a realistic chance of earning something, satisfying the fairness expectation that effort should produce proportional reward.',
          learnings: [
            'Proportional rewards satisfy just-world expectations far better than winner-take-all',
            'Users who earned smaller rewards were more motivated than those who earned nothing',
            'Repeat participation surged because users believed effort would be rewarded',
            'Total cost was similar ($5,000 vs ~$4,500) but impact was dramatically higher',
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
        name: 'Reputation Indicators',
        description:
          'Badges, levels, karma scores, or reputation points displayed alongside user profiles',
        howToSpot:
          'Look for numeric scores, tier badges, or level indicators near usernames or avatars',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Progress Toward Rewards',
        description:
          'Progress bars, completion percentages, or "X more to unlock" indicators',
        howToSpot:
          'Look for visual progress indicators that connect current effort to future rewards',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Ranking Displays',
        description:
          'Leaderboards, position indicators, or comparative rankings',
        howToSpot:
          'Look for ordered lists of users, position numbers, or competitive standings',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Achievement Criteria',
        description:
          'Explicit or implicit criteria for earning badges, levels, or rewards',
        howToSpot:
          'Check whether criteria are clearly stated, vaguely implied, or entirely hidden',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Fairness Messaging',
        description:
          'Language emphasizing meritocracy, earned status, or deserved outcomes',
        howToSpot:
          'Look for phrases like "you earned this", "based on your performance", "fairly ranked"',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Meritocratic Reward Pattern',
        description: 'Systems where visible effort maps to visible rewards through transparent criteria',
        indicators: [
          'Point-per-action reward structures',
          'Published criteria for each reward tier',
          'Visible progress tracking toward goals',
          'Clear documentation of how rankings are calculated',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Opaque Fairness Pattern',
        description: 'Systems that claim fairness but hide the mechanism — triggering distrust',
        indicators: [
          'Rankings without visible criteria',
          'Algorithmic decisions without explanation',
          '"Improve your score" without actionable specifics',
          'Rewards that appear arbitrary or inconsistent',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Proportional Effort Pattern',
        description: 'Reward systems where incremental effort produces incremental results',
        indicators: [
          'Graduated reward tiers rather than winner-take-all',
          'Linear or near-linear effort-to-reward curves',
          'Multiple pathways to earning recognition',
          'Rewards for consistency, not just peak performance',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Fairness Violation Pattern',
        description: 'Design elements that contradict users\' expectations of a fair system',
        indicators: [
          'Retroactive rule changes that devalue earned rewards',
          'Pay-to-win mechanics in ostensibly meritocratic systems',
          'Invisible penalties or shadowbanning without explanation',
          'Inconsistent enforcement of rules across users',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are the criteria for earning rewards, ranks, or badges explicitly documented?',
      'Can users trace their current standing to specific actions they took?',
      'Is the effort-to-reward ratio proportional and predictable?',
      'Are ranking algorithms transparent enough for users to understand their position?',
      'Do all users have equal opportunity to succeed, given the system design?',
      'Are there winner-take-all dynamics that could discourage the majority?',
      'Have reward criteria ever been changed retroactively?',
      'Can users appeal or contest algorithmic decisions they perceive as unfair?',
      'Does the system acknowledge factors outside user control that affect outcomes?',
      'Are fairness claims backed by actual algorithmic transparency?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Belief in a Just World bias.

Analyze the provided design for just-world patterns. Identify:

1. **Effort-Reward Transparency**: How clearly user effort maps to visible outcomes
2. **Ranking Fairness**: Whether ranking criteria are transparent and perceived as equitable
3. **Achievement Systems**: Whether criteria are explicit, attainable, and proportional
4. **Algorithm Transparency**: How well users understand algorithmic decisions affecting them
5. **Fairness Violations**: Any patterns that contradict users' expectations of fairness

For each pattern found:
- Identify whether it reinforces or violates just-world expectations
- Assess whether the fairness claim is genuine or performative
- Determine if criteria are transparent enough for users to trust the system
- Evaluate whether proportionality is maintained (effort = proportional reward)
- Suggest improvements for perceived and actual fairness

Consider:
- Are users able to see the direct connection between their actions and their outcomes?
- Are there hidden factors that affect outcomes but are not communicated?
- Could any design element be perceived as arbitrary, unfair, or rigged?
- Are there winner-take-all dynamics that discourage most participants?
- Is fairness equitable across different user segments and ability levels?

Provide actionable recommendations for building systems users perceive as genuinely fair.`,

    outputSchema: {
      type: 'object',
      properties: {
        fairnessPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              transparencyLevel: { type: 'string' },
              proportionality: { type: 'string' },
              perceivedFairness: { type: 'string' },
              actualFairness: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'transparencyLevel',
              'perceivedFairness',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            transparencyScore: { type: 'number' },
            proportionalityScore: { type: 'number' },
            equityScore: { type: 'number' },
            trustScore: { type: 'number' },
          },
          required: [
            'transparencyScore',
            'proportionalityScore',
            'equityScore',
            'trustScore',
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
        'fairnessPatterns',
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
        title: 'Audit Effort-Reward Connections',
        description:
          'Map every user action to its outcome and verify the connection is visible, proportional, and predictable',
        example:
          'Create a matrix: Action (answer a question) -> Reward (+15 rep) -> Visibility (shown in profile)',
        tips: [
          'Document every action that earns or costs reputation/points',
          'Verify that higher effort consistently produces higher reward',
          'Check that the mapping is visible to users, not just internal',
        ],
      },
      {
        step: 2,
        title: 'Publish Transparent Criteria',
        description:
          'Make all ranking, reward, and achievement criteria publicly documented and easily accessible',
        example:
          'Create a "How Rankings Work" page showing factors, weights, and calculation method',
        tips: [
          'Use simple language, not legalese or technical jargon',
          'Show concrete examples of how criteria translate to outcomes',
          'Keep criteria documentation up to date when changes occur',
        ],
      },
      {
        step: 3,
        title: 'Design Proportional Rewards',
        description:
          'Ensure that incremental effort always produces incremental reward — avoid cliff effects and winner-take-all',
        example:
          'Instead of one $5,000 prize, create tiers: $1,000 + $500 + $200 + $100 + badges',
        tips: [
          'Map the effort-to-reward curve and check for dead zones',
          'Ensure there is always a next achievable milestone',
          'Reward consistency and persistence, not just peak performance',
        ],
      },
      {
        step: 4,
        title: 'Build Appeal Mechanisms',
        description:
          'Provide clear pathways for users to contest or understand decisions they perceive as unfair',
        example:
          'Add an "Why this ranking?" tooltip and a "Request Review" button for algorithmic decisions',
        tips: [
          'Never punish users without explanation',
          'Provide specific reasons for negative actions (demotions, removals)',
          'Respond to appeals within a committed timeframe',
        ],
      },
      {
        step: 5,
        title: 'Test for Perceived Fairness',
        description:
          'Measure whether users actually perceive the system as fair, not just whether it is technically fair',
        example:
          'Survey users: "On a scale of 1-5, how fair do you think the ranking system is?" Correlate with engagement',
        tips: [
          'Perceived fairness matters more than actual fairness for motivation',
          'Test with users from different segments and experience levels',
          'Track fairness perception over time, especially after system changes',
        ],
      },
    ],

    dos: [
      'Publish clear, specific criteria for every rank, badge, and reward tier',
      'Show users exactly how their actions translate into outcomes',
      'Design graduated reward tiers so incremental effort always pays off',
      'Provide appeal mechanisms for algorithmic decisions',
      'Grandfather existing progress when changing reward systems',
      'Acknowledge factors outside user control that affect outcomes',
      'Audit systems for systemic biases regularly',
      'Reward consistency and improvement, not just absolute performance',
    ],

    donts: [
      'Don\'t hide ranking criteria behind vague "proprietary algorithm" claims',
      'Don\'t create winner-take-all systems that discourage the majority',
      'Don\'t change reward criteria retroactively without compensating affected users',
      'Don\'t claim meritocracy if the system demonstrably advantages certain groups',
      'Don\'t punish users without clear, specific explanations',
      'Don\'t use just-world framing to blame users for systemic problems',
      'Don\'t mix paid advantages into ostensibly meritocratic systems without disclosure',
      'Don\'t ignore the gap between perceived fairness and actual fairness',
    ],

    bestPractices: [
      {
        title: 'Radical Transparency in Rankings',
        description:
          'Show every factor, its weight, and the user\'s score on each — let users verify fairness themselves',
        rationale:
          'Users who can verify fairness trust the system far more than users who must take it on faith',
        example:
          'Seller dashboard: "Reviews (40%): 4.6/5 | Response Time (30%): 2.1h | Completion (20%): 98% | Returns (10%): 1.8%"',
      },
      {
        title: 'Proportional Reward Curves',
        description:
          'Design reward systems where every increment of effort produces a visible increment of reward',
        rationale:
          'Dead zones where effort produces no visible progress violate fairness expectations and kill motivation',
        example:
          'XP system where every action earns points, with milestones every 100 points rather than every 10,000',
      },
      {
        title: 'Cohort-Based Fairness',
        description:
          'Compare users to peers at similar levels rather than the entire population',
        rationale:
          'New users competing against veterans in global rankings perceive the system as rigged',
        example:
          '"You are #3 among sellers who joined this quarter" alongside global rank',
      },
      {
        title: 'Explain Algorithmic Decisions',
        description:
          'Whenever an algorithm affects a user\'s outcome, explain why in human-readable terms',
        rationale:
          'Unexplained algorithmic actions feel arbitrary and unjust, even when they are technically correct',
        example:
          '"Your post was not recommended because it received 3 reports for inaccuracy. Here is what you can do..."',
      },
      {
        title: 'Separate Controllable from Uncontrollable Factors',
        description:
          'Clearly distinguish between outcomes users can influence and those affected by external factors',
        rationale:
          'Blaming users for uncontrollable outcomes (market conditions, algorithm changes) violates fairness',
        example:
          '"Your sales dropped 15% this month. 10% was market-wide; 5% was due to slower response times you can improve."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Achievement criteria and progress must be programmatically determinable',
        implementation:
          'Use proper ARIA roles for progress bars, landmark roles for leaderboards, and semantic HTML for criteria lists so screen reader users can access fairness information.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Tier and achievement status must not rely on color alone',
        implementation:
          'Supplement color-coded tiers (bronze, silver, gold) with text labels and icons so color-blind users can perceive their status.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All achievement and ranking interfaces must be fully keyboard navigable',
        implementation:
          'Ensure leaderboards, achievement panels, and ranking dashboards are fully operable via keyboard with visible focus indicators.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Time-based challenges must accommodate users who need more time',
        implementation:
          'Provide extensions or alternative pathways for timed challenges. Users with disabilities should have equitable opportunity to earn achievements.',
      },
    ],

    ethics: [
      {
        concern: 'False Meritocracy',
        severity: 'critical',
        explanation:
          'Claiming a system is fair and meritocratic when it demonstrably advantages certain users over others due to systemic factors',
        mitigation:
          'Audit for bias regularly. Be honest about limitations. Provide multiple pathways to success that account for different starting conditions.',
      },
      {
        concern: 'Victim Blaming',
        severity: 'critical',
        explanation:
          'Just-world framing can lead users or systems to attribute negative outcomes to personal failings when systemic factors are responsible',
        mitigation:
          'Always separate controllable from uncontrollable factors. Never imply that all negative outcomes are deserved.',
      },
      {
        concern: 'Retroactive Devaluation',
        severity: 'high',
        explanation:
          'Changing reward criteria after users have earned rewards under the original terms',
        mitigation:
          'Grandfather existing rewards. If changes are necessary, provide conversion at fair rates and communicate changes well in advance.',
      },
      {
        concern: 'Pay-to-Win in Meritocratic Systems',
        severity: 'high',
        explanation:
          'Allowing paid advantages in systems presented as meritocratic undermines fairness',
        mitigation:
          'Clearly disclose paid boosts. Separate paid and organic rankings. Do not present pay-to-win systems as purely meritocratic.',
      },
      {
        concern: 'Algorithmic Opacity',
        severity: 'medium',
        explanation:
          'Using opaque algorithms while claiming fairness creates a gap between perception and reality',
        mitigation:
          'Publish ranking factors and weights. Provide explanations for individual decisions. Allow users to audit their own data.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Belief in a Just World: A Fundamental Delusion',
        author: 'Lerner, M. J.',
        year: 1980,
        description:
          'The foundational book-length treatment of just-world theory by its originator, establishing the experimental basis and implications of the belief',
        type: 'foundational',
      },
      {
        title: 'Beyond the Justice Motive: A Review of Research on the Belief in a Just World',
        author: 'Hafer, C. L., & Begue, L.',
        year: 2005,
        doi: '10.1016/j.paid.2004.09.009',
        description:
          'Comprehensive review of 40 years of just-world research, covering individual differences, cross-cultural findings, and adaptive functions',
        type: 'foundational',
      },
      {
        title: 'Reactions to the Victim in a Just or Unjust World',
        author: 'Lerner, M. J., & Simmons, C. H.',
        year: 1966,
        description:
          'The original experiment demonstrating that observers derogate innocent victims to maintain just-world beliefs',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'The Belief in a Just World: A Fundamental Delusion',
        author: 'Lerner, Melvin J.',
        year: 1980,
        isbn: '9780306404955',
        description:
          'The definitive work on just-world theory, establishing the psychological need to believe in fairness and its consequences',
        type: 'foundational',
      },
      {
        title: 'Responses to Victimizations and Belief in a Just World',
        author: 'Furnham, Adrian',
        year: 2003,
        description:
          'Examination of how just-world beliefs shape responses to victims and perceived fairness in social systems',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'Gamification and the Just World: How Fairness Drives Engagement',
        author: 'UX Collective',
        url: 'https://uxdesign.cc/gamification-fairness/',
        description:
          'Practical guide to applying just-world principles in gamification and reward system design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Just World Fallacy',
        author: 'You Are Not So Smart',
        url: 'https://youarenotsosmart.com/2010/06/07/the-just-world-fallacy/',
        description:
          'Accessible explanation of just-world bias with real-world examples and implications',
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
      'effort-heuristic',
      'reciprocity',
      'social-proof',
      'endowment-effect',
    ],

    conflicts: [
      'learned-helplessness',
      'fundamental-attribution-error',
    ],

    confusedWith: [
      'meritocracy-bias',
      'fundamental-attribution-error',
      'system-justification',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'deservingness-heuristic',
        'victim-blaming',
      ],
    },
  },
};
