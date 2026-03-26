/**
 * JUST WORLD HYPOTHESIS
 *
 * The need to believe the world is fundamentally fair,
 * leading to rationalizing others' misfortune as deserved.
 * This variant focuses on the hypothesis as a framework
 * for understanding behavior in systems and product design.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const justWorldHypothesis: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'just-world-hypothesis',
    name: 'Just World Hypothesis',
    aliases: ['Just World Fallacy', 'Deserved Outcomes Bias', 'Fairness Assumption'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'fairness',
      'reward-systems',
      'meritocracy',
      'gamification',
      'equity',
      'trust',
      'transparency',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We believe the world is fundamentally fair and that people get what they deserve, leading us to rationalize outcomes as earned.',

    detailed: `The Just World Hypothesis is the deep-seated need to believe that the world operates fairly, that good actions are rewarded and bad actions are punished. When confronted with evidence that contradicts this belief, people rationalize the outcome rather than abandon the belief: victims are blamed for their misfortune, and successful people are assumed to have earned their position through merit alone.

In product design, this bias has profound implications for how users perceive reward systems, ranking algorithms, competition mechanics, and platform fairness. Users enter platforms expecting meritocratic outcomes. When the system appears unfair, opaque, or arbitrary, it violates this expectation and erodes trust. Conversely, when systems demonstrate transparent fairness, users engage more deeply and attribute their outcomes to personal effort.

Designers must build systems that genuinely reward effort and skill rather than exploiting the just-world belief to mask inequitable mechanics. Transparent algorithms, fair matchmaking, equitable reward distribution, and clear promotion criteria all reinforce justified trust rather than false meritocracy.`,

    psychologyBasis: {
      discoveredBy: 'Melvin J. Lerner',
      year: 1980,
      theory: 'Just World Theory',
      mechanism: `The need to believe in a just world is a fundamental cognitive motivation that serves as a psychological buffer against existential anxiety. The mechanism operates through several processes:

1. **Deservingness Attribution**: When observing outcomes, people automatically attribute them to the recipient's character or actions rather than situational factors
2. **Victim Derogation**: When a victim cannot be helped, observers derogate the victim to maintain the belief that the world is fair ("they must have done something to deserve it")
3. **Effort-Outcome Linking**: People assume a direct, proportional relationship between effort invested and rewards received, even in systems where randomness or structural factors dominate
4. **System Justification**: The just-world belief motivates people to defend existing systems and hierarchies as fair, even when evidence shows inequality
5. **Threat Response**: When confronted with clear evidence of unfairness, people experience cognitive dissonance and seek to restore the belief through rationalization

This mechanism is deeply automatic and serves an adaptive function: it allows people to plan for the future, invest effort, and tolerate short-term costs in expectation of long-term rewards.`,
    },

    realWorldExample: `In Lerner's foundational experiments (1966), participants watched a confederate receive electric shocks for giving wrong answers. When told the shocks would continue with no option to help, observers began to derogate the victim, rating them as less likeable and less deserving of sympathy. Rather than accept that an innocent person was suffering unfairly, participants convinced themselves the victim must have done something to deserve it. This demonstrates the powerful, automatic nature of just-world thinking: we would rather blame the victim than accept that the world can be arbitrary and unjust.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Just World Hypothesis shapes how users perceive fairness, merit, and earned outcomes in digital products. Users bring a deep expectation that effort should equal reward, that systems should be transparent, and that rankings reflect genuine merit. Designers can leverage this understanding to:

- Build transparent scoring and ranking systems that reinforce genuine meritocracy
- Design fair reward distributions that visibly connect effort to outcome
- Create equitable gamification that motivates without masking structural advantages
- Establish clear promotion and advancement criteria that users trust
- Surface algorithm transparency to satisfy users' need to understand why outcomes occur`,

    whenToUse: [
      {
        title: 'Transparent Scoring Systems',
        scenario:
          'When users are evaluated, ranked, or scored by the platform',
        example:
          'Show exactly how a seller rating is calculated: response time (30%), completion rate (30%), customer reviews (40%), with each factor visible to the user',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Fair Matchmaking',
        scenario: 'When matching users for competition, collaboration, or marketplace transactions',
        example:
          'Display skill-based matchmaking criteria so users understand why they are matched with specific opponents or partners, reinforcing that outcomes reflect ability',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Equitable Reward Distribution',
        scenario: 'When distributing rewards, bonuses, or recognition across users',
        example:
          'Show a clear breakdown of how rewards are calculated: "You earned 850 points this week: 400 from completed tasks, 300 from quality bonus, 150 from streak bonus"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Clear Promotion Criteria',
        scenario: 'When users advance through levels, tiers, or status systems',
        example:
          'Display progress toward next tier with specific, achievable milestones: "Complete 5 more verified deliveries to reach Gold status (currently 45/50)"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Algorithm Transparency',
        scenario: 'When algorithmic decisions affect user visibility, earnings, or opportunities',
        example:
          'Explain why content was recommended or suppressed: "This post reached fewer people because it was posted during low-activity hours" rather than offering no explanation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Appeals and Dispute Resolution',
        scenario: 'When users feel they have been treated unfairly by the system',
        example:
          'Provide a clear appeals process with human review, timeline, and transparent criteria for resolution',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Masking Structural Inequality',
        reason:
          'Using meritocracy framing to hide systemic advantages some users have over others',
        consequence:
          'Disadvantaged users blame themselves for poor outcomes instead of recognizing system-level issues, leading to disengagement and churn',
        alternative:
          'Acknowledge structural factors openly. Show how starting conditions differ and provide equalizing mechanisms.',
      },
      {
        title: 'Blame-the-User Error Messaging',
        reason:
          'Framing system failures or unfair outcomes as user mistakes exploits just-world thinking',
        consequence:
          'Users internalize blame for platform failures, creating frustration and learned helplessness',
        alternative:
          'Clearly distinguish between user errors and system limitations. Own platform failures transparently.',
      },
      {
        title: 'False Meritocracy in Pay-to-Win Systems',
        reason:
          'Presenting paid advantages as earned achievements violates genuine fairness',
        consequence:
          'Users who cannot pay feel the system is rigged, destroying trust and community cohesion',
        alternative:
          'Separate cosmetic purchases from competitive advantages. Clearly label paid boosts.',
      },
      {
        title: 'Opaque Algorithmic Penalties',
        reason:
          'Penalizing users without explanation exploits their tendency to self-blame',
        consequence:
          'Users assume they did something wrong even when the system is at fault, leading to anxiety and over-compliance',
        alternative:
          'Always explain why a penalty was applied, what triggered it, and how to resolve it.',
      },
    ],

    commonMistakes: [
      {
        title: 'Fake Transparency',
        description:
          'Showing a scoring formula that does not actually reflect how decisions are made',
        why: 'Users eventually discover the gap between stated and actual criteria, destroying trust permanently',
        fix: 'Ensure displayed criteria genuinely match the underlying algorithm. Audit regularly for drift.',
      },
      {
        title: 'Ignoring Starting Conditions',
        description:
          'Treating all users as equal when some have significant structural advantages',
        why: 'New users or disadvantaged users cannot compete fairly, and the meritocracy framing makes them blame themselves',
        fix: 'Implement handicapping, cohort-based competition, or separate tracks for different experience levels.',
      },
      {
        title: 'Punitive Deactivation Without Appeal',
        description:
          'Deactivating accounts or reducing visibility without explanation or recourse',
        why: 'Users cannot correct behavior they do not understand is wrong, and just-world thinking causes them to accept unjust treatment',
        fix: 'Always provide specific reasons for actions, clear paths to appeal, and timelines for resolution.',
      },
      {
        title: 'Gamification That Rewards Time Over Skill',
        description:
          'Systems where accumulated hours matter more than quality of contribution',
        why: 'Undermines meritocratic framing because outcomes reflect availability, not ability',
        fix: 'Weight quality metrics alongside quantity. Recognize efficiency and impact, not just volume.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how fairness information is perceived and whether scoring feels transparent',
        examples: [
          'Leaderboards with visible scoring criteria reinforce perceived fairness',
          'Progress bars showing clear advancement paths satisfy meritocratic expectations',
          'Side-by-side comparisons of user metrics vs requirements build trust in promotion systems',
          'Dashboard layouts that surface algorithmic reasoning reduce perceived arbitrariness',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy signals what the system values and how seriously it takes fairness',
        examples: [
          'Bold, prominent display of scoring criteria signals transparency commitment',
          'Clear labeling of earned vs purchased items maintains fairness perception',
          'Consistent formatting of rules and criteria builds trust in system fairness',
          'Readable explanations of algorithmic decisions reduce opacity anxiety',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color communicates reward status, fairness signals, and system trustworthiness',
        examples: [
          'Green for earned achievements and gold for tier status reinforce merit associations',
          'Distinct colors for earned vs purchased items maintain fairness perception',
          'Warning colors for policy violations feel justified when paired with clear explanations',
          'Neutral colors for algorithmic explanations prevent emotional manipulation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions determine whether users feel they have agency and fair opportunity within the system',
        examples: [
          'Appeal buttons on every penalty notification restore sense of procedural fairness',
          'Interactive scoring breakdowns let users explore how their performance maps to outcomes',
          'Feedback mechanisms that show direct impact of actions reinforce effort-reward connection',
          'Opt-in competitive features let users choose their level of exposure to ranking systems',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users perceive the system as fair or arbitrary',
        examples: [
          'Explaining "why" behind every algorithmic decision satisfies fairness expectations',
          'Success stories that include effort context prevent survivorship bias',
          'Policy documentation written in plain language builds trust in system rules',
          'Failure feedback that attributes outcomes accurately (user vs system) prevents unjust self-blame',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility determines whether fairness mechanisms are available to all users regardless of ability',
        examples: [
          'Screen reader-accessible scoring breakdowns ensure fairness information reaches all users',
          'Keyboard-navigable appeal processes prevent exclusion from dispute resolution',
          'Alt text on achievement badges and tier indicators communicates earned status to non-visual users',
          'Accessible documentation of rules and criteria ensures equitable understanding of system mechanics',
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
        title: 'Transparent Rating Breakdown',
        description:
          'Gig platform showing workers exactly how their rating is calculated with actionable improvement paths',
        code: `<div class="rating-breakdown">
  <h3>Your Performance Score: 4.7 / 5.0</h3>
  <div class="score-factors">
    <div class="factor">
      <label>On-Time Completion</label>
      <div class="bar" style="width: 95%">95%</div>
      <span class="weight">Weight: 30%</span>
    </div>
    <div class="factor">
      <label>Customer Satisfaction</label>
      <div class="bar" style="width: 88%">88%</div>
      <span class="weight">Weight: 40%</span>
    </div>
    <div class="factor">
      <label>Response Time</label>
      <div class="bar" style="width: 92%">92%</div>
      <span class="weight">Weight: 20%</span>
    </div>
    <div class="factor">
      <label>Completion Rate</label>
      <div class="bar" style="width: 100%">100%</div>
      <span class="weight">Weight: 10%</span>
    </div>
  </div>
  <div class="improvement-tip">
    <p><strong>Tip:</strong> Improving Customer Satisfaction by 5% would
    raise your score to 4.9 and qualify you for Premium status.</p>
  </div>
</div>`,
        explanation:
          'By showing exact weights and scores for each factor, workers understand precisely how their rating is determined. The improvement tip connects effort to outcome, reinforcing fair meritocracy. Users trust the system because they can verify it.',
        principle:
          'Transparent scoring reinforces legitimate just-world expectations by connecting effort to visible outcomes',
        metrics: {
          before: '34% of workers trusted the rating system was fair',
          after: '78% of workers trusted the rating system was fair',
          improvement: '129% increase in perceived fairness after transparency redesign',
        },
      },
      {
        title: 'Fair Matchmaking with Skill Display',
        description:
          'Competitive platform showing why two users were matched and what factors determined the pairing',
        code: `<div class="matchmaking-card">
  <h3>Match Found</h3>
  <div class="match-comparison">
    <div class="player you">
      <span class="label">You</span>
      <span class="skill">Skill Rating: 1,420</span>
      <span class="record">Win Rate: 54%</span>
      <span class="games">128 matches played</span>
    </div>
    <div class="vs">VS</div>
    <div class="player opponent">
      <span class="label">Opponent</span>
      <span class="skill">Skill Rating: 1,445</span>
      <span class="record">Win Rate: 52%</span>
      <span class="games">135 matches played</span>
    </div>
  </div>
  <p class="match-quality">
    <strong>Match Quality: Excellent</strong> — Skill ratings within 2% range.
    Outcome will be determined by performance, not matchmaking advantage.
  </p>
</div>`,
        explanation:
          'Showing comparable skill ratings and explicitly stating that outcome depends on performance satisfies the just-world expectation. Users accept losses more gracefully when they know the match was fair.',
        principle:
          'Visible fairness in competition reduces frustration and blame-shifting',
      },
      {
        title: 'Equitable Reward Distribution with Explanation',
        description:
          'Marketplace platform showing how earnings are calculated with clear fee breakdowns',
        code: `<div class="earnings-breakdown">
  <h3>Delivery Earnings — Today</h3>
  <div class="earning-item">
    <div class="delivery">
      <span class="route">Order #4821 — 3.2 mi</span>
      <span class="time">Completed in 22 min</span>
    </div>
    <div class="calculation">
      <div class="line"><span>Base pay</span><span>$4.50</span></div>
      <div class="line"><span>Distance bonus</span><span>$1.60</span></div>
      <div class="line"><span>Peak hour bonus</span><span>$2.00</span></div>
      <div class="line"><span>Customer tip</span><span>$5.00</span></div>
      <div class="line total"><span>Total</span><span>$13.10</span></div>
    </div>
  </div>
  <p class="formula-link">
    <a href="/how-pay-works">See how your pay is calculated</a>
  </p>
</div>`,
        explanation:
          'Breaking down every component of earnings with clear formulas allows workers to verify fairness. The link to full documentation signals institutional commitment to transparency. Workers can predict their earnings, reinforcing the effort-reward connection.',
        principle:
          'Detailed reward breakdowns turn abstract fairness claims into verifiable reality',
        metrics: {
          before: '41% of drivers felt pay was calculated fairly',
          after: '67% of drivers felt pay was calculated fairly',
          improvement: '63% increase in perceived pay fairness',
        },
      },
    ],

    bad: [
      {
        title: 'Opaque Algorithmic Suppression',
        description:
          'Content platform reducing creator visibility without explanation',
        code: `<!-- DON'T DO THIS -->
<div class="analytics-dashboard">
  <h3>Your Content Performance</h3>
  <div class="metric down">
    <span class="label">Reach</span>
    <span class="value">-73%</span>
    <span class="period">vs last month</span>
  </div>
  <div class="metric down">
    <span class="label">Impressions</span>
    <span class="value">-68%</span>
  </div>
  <p class="suggestion">Try posting more engaging content
  to improve your reach.</p>
</div>`,
        explanation:
          'The platform reduced reach due to algorithm changes but framed it as a content quality problem. This exploits just-world thinking: creators blame themselves ("my content must be worse") instead of recognizing a system change they cannot control. The vague "try posting more engaging content" compounds the harm.',
        principle:
          'Never exploit just-world bias to shift blame for system decisions onto users',
      },
      {
        title: 'False Meritocracy Leaderboard',
        description:
          'A leaderboard mixing free and paying users without distinguishing purchased advantages',
        code: `<!-- DON'T DO THIS -->
<div class="leaderboard">
  <h3>Top Performers This Week</h3>
  <ol>
    <li>ProGamer99 — 12,450 pts</li>
    <li>ElitePlayer — 11,200 pts</li>
    <li>NightOwl — 10,890 pts</li>
    <li>FreeUser42 — 4,230 pts</li>
    <li>NewbieHere — 3,100 pts</li>
  </ol>
  <p class="motivation">Work harder to climb the ranks!</p>
</div>`,
        explanation:
          'The top players purchased XP boosters and premium items that multiply their score. Free users see the leaderboard, assume it reflects skill, and blame themselves for low ranking. The "work harder" message compounds the false meritocracy by implying effort alone determines position.',
        principle:
          'Mixing paid advantages with skill-based rankings creates false meritocracy that exploits just-world thinking',
      },
      {
        title: 'Punitive Deactivation Without Explanation',
        description:
          'Gig platform deactivating a worker with no clear reason or appeal path',
        code: `<!-- DON'T DO THIS -->
<div class="account-notice">
  <h3>Account Deactivated</h3>
  <p>Your account has been deactivated due to
  violation of our community guidelines.</p>
  <p>This decision is final.</p>
  <small>For more information, review our Terms of Service.</small>
</div>`,
        explanation:
          'No specific violation cited, no evidence provided, no appeal process. The vague reference to "community guidelines" exploits just-world thinking: the worker assumes they must have done something wrong. In reality, the deactivation may be algorithmic error, biased reporting, or quota management.',
        principle:
          'Unexplained penalties exploit just-world bias by making users accept unjust treatment as deserved',
      },
    ],

    realWorld: [
      {
        company: 'Uber',
        product: 'Driver Rating System',
        description: 'Uber shows drivers their rating breakdown with specific trip feedback, acceptance rate, and cancellation rate. However, the system has been criticized for opacity in how ratings translate to deactivation thresholds, creating anxiety among drivers who internalize blame for low ratings that may reflect passenger bias.',
        effectiveness: 'somewhat-effective',
        analysis: 'Partial transparency satisfies surface-level just-world expectations but the hidden deactivation threshold exploits it. Drivers blame themselves for ratings influenced by factors outside their control (traffic, restaurant delays, passenger prejudice).',
      },
      {
        company: 'Lyft',
        product: 'Driver Rewards Tiers',
        description: 'Lyft offers Silver, Gold, and Platinum tiers based on rides completed and rating maintained. Criteria are publicly documented with specific thresholds. However, market conditions (ride availability, surge pricing) create unequal opportunities across regions.',
        effectiveness: 'effective',
        analysis: 'Clear tier criteria satisfy just-world expectations. Drivers can see exactly what is needed to advance. The structural inequality across markets is the primary weakness, as drivers in lower-demand areas face harder advancement despite equal effort.',
      },
      {
        company: 'Upwork',
        product: 'Job Success Score',
        description: 'Upwork calculates a Job Success Score that determines freelancer visibility and badge status. The score considers client feedback, long-term relationships, and contract outcomes, but the exact formula is proprietary, leading to confusion and self-blame when scores drop unexpectedly.',
        effectiveness: 'somewhat-effective',
        analysis: 'The opaque formula creates a false meritocracy perception. Freelancers assume their score reflects work quality, but algorithmic factors (client behavior, market conditions) significantly influence it. Those with dropping scores blame their own performance rather than system opacity.',
      },
      {
        company: 'Spotify',
        product: 'Spotify for Artists Analytics',
        description: 'Spotify provides artists with detailed streaming analytics, playlist placement data, and audience demographics. However, the algorithmic playlist curation process remains opaque, leading artists to blame their music quality when streams decline due to algorithm changes.',
        effectiveness: 'somewhat-effective',
        analysis: 'Surface analytics satisfy transparency expectations, but the hidden editorial and algorithmic playlist decisions exploit just-world thinking. Artists internalize declining streams as a quality problem rather than an algorithmic one.',
      },
    ],

    abTests: [
      {
        title: 'Rating Transparency: Opaque vs Detailed Breakdown',
        hypothesis:
          'Showing detailed rating breakdowns will increase worker satisfaction and retention',
        controlVersion: {
          description:
            'Worker dashboard showing only aggregate rating: "Your rating: 4.3 / 5.0" with no breakdown or explanation',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '0:45',
            scrollDepth: '20%',
          },
        },
        treatmentVersion: {
          description:
            'Worker dashboard showing rating with per-factor breakdown, weights, trend over time, and specific improvement suggestions',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '3:20',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Detailed breakdowns more than doubled trust in the rating system. Workers who understood their rating were 45% less likely to churn in the following month. The transparency reinforced legitimate just-world expectations by connecting specific actions to specific outcomes.',
          learnings: [
            'Transparency does not just feel better; it measurably improves retention',
            'Workers who see breakdowns focus on improvable factors rather than feeling helpless',
            'Trend lines showing improvement over time were the most engaging element',
            'Workers shared transparent dashboards with peers, creating positive word-of-mouth',
          ],
        },
      },
      {
        title: 'Appeal Process: No Appeal vs Structured Appeal',
        hypothesis:
          'Providing a structured appeal process will reduce negative sentiment after penalties',
        controlVersion: {
          description:
            'Penalty notification with final decision: "Your account has been restricted. This decision is final."',
          metrics: {
            conversionRate: '5%',
            clickThroughRate: '12%',
          },
        },
        treatmentVersion: {
          description:
            'Penalty notification with specific violation, evidence, and structured 3-step appeal process with timeline and human review guarantee',
          metrics: {
            conversionRate: '38%',
            clickThroughRate: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The structured appeal process transformed negative experiences into trust-building opportunities. Even users whose appeals were denied reported higher platform trust because the process felt fair. Procedural justice satisfied just-world expectations better than outcome favorability.',
          learnings: [
            'Procedural fairness matters more than outcome favorability for trust',
            'Users who appealed and lost were still 3x more likely to remain than those with no appeal option',
            'Specific violation details reduced repeat violations by 60%',
            'Human review guarantee was the most trust-building element',
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
        name: 'Opaque Scoring Displays',
        description:
          'Aggregate scores or ratings without visible calculation methodology',
        howToSpot:
          'Look for single numbers or stars with no breakdown, formula, or explanation of contributing factors',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Blame-Shifting Language',
        description:
          'Messaging that frames system limitations as user performance problems',
        howToSpot:
          'Look for phrases like "try harder", "improve your content", "be more engaging" without specifying what the system changed',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Undifferentiated Leaderboards',
        description:
          'Rankings that mix users with different advantages without disclosure',
        howToSpot:
          'Check whether paid users, experienced users, and new users compete on the same board without context',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Appeal Mechanisms',
        description:
          'Penalty or restriction notices without any path to contest the decision',
        howToSpot:
          'Look for "this decision is final" language, absence of contact options, or circular help documentation',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Meritocracy Framing Without Evidence',
        description:
          'Claims of fairness or equal opportunity without visible supporting mechanisms',
        howToSpot:
          'Look for aspirational fairness language ("everyone has equal opportunity") without concrete evidence of equitable systems',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'False Meritocracy Pattern',
        description: 'System presents outcomes as merit-based while hiding structural advantages or algorithmic factors',
        indicators: [
          'Leaderboards mixing paid and free users',
          'Success stories without acknowledging advantages',
          'Rankings that correlate with tenure or spending rather than skill',
          'Motivational messaging implying effort alone determines outcomes',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Blame Displacement Pattern',
        description: 'System failures or algorithmic changes framed as user performance issues',
        indicators: [
          'Declining metrics paired with "improve your content" messaging',
          'Vague policy violations without specific evidence',
          'Performance drops coinciding with algorithm updates but explained as quality issues',
          'Error messages that imply user fault for system bugs',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Opacity-as-Fairness Pattern',
        description: 'System hides decision-making while claiming to be fair',
        indicators: [
          'Proprietary algorithms described as "fair" without disclosure',
          'Black-box scoring systems with no factor visibility',
          'Policy documents that describe rules but not enforcement criteria',
          'Automated decisions with no human review option',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Equitable Transparency Pattern',
        description: 'System genuinely connects effort to outcome with visible, verifiable mechanisms',
        indicators: [
          'Detailed scoring breakdowns with factor weights',
          'Clear advancement criteria with progress tracking',
          'Appeal processes with human review and timelines',
          'Algorithm explanation alongside every decision',
        ],
        severity: ImpactLevel.LOW,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are scoring and ranking criteria visible and verifiable by users?',
      'Do users with paid advantages compete on the same leaderboards as free users?',
      'When metrics decline, does the messaging distinguish between user actions and system changes?',
      'Is there a structured appeal process for every punitive action?',
      'Are success stories presented with context about starting conditions and advantages?',
      'Does the system provide specific, actionable improvement paths tied to visible criteria?',
      'Are algorithmic decisions explained with enough detail for users to understand and verify?',
      'Do error messages accurately attribute fault between user and system?',
      'Are reward formulas genuinely reflective of the actual calculation, not marketing fiction?',
      'Does the design account for structural differences between user groups?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Just World Hypothesis and fairness perception.

Analyze the provided design for patterns that exploit or appropriately address users' need to believe the world is fair. Identify:

1. **Meritocracy Signals**: How the system communicates that effort leads to reward
2. **Scoring Transparency**: Whether users can verify how outcomes are determined
3. **Blame Attribution**: Whether system failures are accurately attributed or shifted to users
4. **Structural Equity**: Whether the system accounts for unequal starting conditions
5. **Procedural Fairness**: Whether penalties, restrictions, and decisions have fair processes

For each pattern found:
- Identify whether it reinforces genuine fairness or exploits just-world beliefs
- Assess whether users can verify the system's fairness claims
- Determine if disadvantaged users are harmed by meritocracy framing
- Evaluate whether appeal and dispute processes exist and are accessible
- Suggest improvements for genuine equity and transparency

Consider:
- Is the system genuinely fair, or does it use fairness language to mask inequality?
- Do users blame themselves for outcomes caused by algorithmic changes or structural factors?
- Are scoring criteria visible, accurate, and verifiable?
- Does the system provide equitable opportunity or merely claim to?
- Are appeal processes accessible and effective for all users?

Provide actionable recommendations for building systems that satisfy just-world expectations through genuine fairness rather than exploitation.`,

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
              genuineFairness: { type: 'boolean' },
              transparencyLevel: { type: 'string' },
              blameAttribution: { type: 'string' },
              vulnerableUserImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'genuineFairness',
              'transparencyLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            scoringTransparency: { type: 'number' },
            proceduralFairness: { type: 'number' },
            structuralEquity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'scoringTransparency',
            'proceduralFairness',
            'structuralEquity',
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
        title: 'Audit Your Reward Mechanics',
        description:
          'Map every system where users are scored, ranked, rewarded, or penalized and identify what factors actually determine outcomes',
        example:
          'Discover that driver ratings are 40% influenced by factors outside driver control (traffic, restaurant delays)',
        tips: [
          'List every scoring system, ranking, tier, and reward mechanism',
          'Identify which factors users can control vs which are structural or random',
          'Document the gap between stated fairness and actual mechanics',
        ],
      },
      {
        step: 2,
        title: 'Make Scoring Transparent',
        description:
          'Show users exactly how their scores, ratings, and rankings are calculated with factor weights and individual contributions',
        example:
          'Display: "Your score: 4.3 = On-time (4.8 x 30%) + Quality (4.0 x 40%) + Communication (4.2 x 30%)"',
        tips: [
          'Show factor weights and individual scores for each component',
          'Provide trend data so users can see improvement over time',
          'Link to detailed documentation of the scoring methodology',
        ],
      },
      {
        step: 3,
        title: 'Build Equitable Competition',
        description:
          'Ensure rankings and competitions account for structural differences between users',
        example:
          'Separate leaderboards by experience level, or use handicapping to equalize starting conditions',
        tips: [
          'Segment competitions by experience, region, or resource level',
          'Clearly label any paid advantages that affect rankings',
          'Provide multiple paths to recognition that reward different strengths',
        ],
      },
      {
        step: 4,
        title: 'Implement Procedural Fairness',
        description:
          'Create structured appeal processes for every punitive action with human review, specific evidence, and clear timelines',
        example:
          'Every account restriction includes: specific violation, evidence, 48-hour appeal window, human reviewer guarantee',
        tips: [
          'Never issue a penalty without a specific, cited reason',
          'Provide appeal mechanisms that are accessible and responsive',
          'Guarantee human review for consequential decisions',
        ],
      },
      {
        step: 5,
        title: 'Attribute Outcomes Accurately',
        description:
          'When metrics change, clearly distinguish between user-driven and system-driven factors',
        example:
          'Instead of "Your reach declined", show "Algorithm update on March 5 changed content distribution. Your content quality metrics remain strong."',
        tips: [
          'Flag algorithm changes that affect user metrics',
          'Distinguish user performance from market or system factors',
          'Never suggest users "try harder" when the system changed',
        ],
      },
      {
        step: 6,
        title: 'Validate with Affected Users',
        description:
          'Test fairness perceptions with users at different levels of the system, especially those who are disadvantaged',
        example:
          'Interview bottom-quartile users to understand whether they blame themselves or the system for their position',
        tips: [
          'Survey fairness perception across user segments',
          'Pay special attention to new users and disadvantaged groups',
          'Track whether transparency changes reduce self-blame for system issues',
        ],
      },
    ],

    dos: [
      'Show exactly how scores, ratings, and rankings are calculated',
      'Provide structured appeal processes for every punitive action',
      'Distinguish user-driven outcomes from system-driven changes in messaging',
      'Segment competitions by experience level or resource availability',
      'Label paid advantages clearly and separately from earned achievements',
      'Flag algorithm changes that affect user metrics proactively',
      'Provide actionable, specific improvement paths tied to visible criteria',
      'Guarantee human review for consequential automated decisions',
    ],

    donts: [
      'Don\'t use vague "try harder" messaging when system factors caused outcome changes',
      'Don\'t mix paid and organic advantages on the same leaderboard without disclosure',
      'Don\'t issue penalties without specific evidence and appeal paths',
      'Don\'t claim meritocracy without demonstrable equitable mechanics',
      'Don\'t hide algorithmic decision-making behind proprietary secrecy',
      'Don\'t blame users for system failures or algorithm changes',
      'Don\'t present structural advantages as earned achievements',
      'Don\'t use "this decision is final" without genuine appeal options',
    ],

    bestPractices: [
      {
        title: 'Transparent Scoring with Factor Visibility',
        description:
          'Show every factor that contributes to a user\'s score, with weights and individual ratings',
        rationale:
          'Users who can verify scoring trust the system and focus on improvable factors rather than feeling helpless',
        example:
          'Rating dashboard: On-time (4.8, 30%), Quality (4.0, 40%), Communication (4.2, 30%) = 4.3 overall',
      },
      {
        title: 'Proactive Algorithm Change Notifications',
        description:
          'Notify users before or immediately after algorithm changes that affect their metrics',
        rationale:
          'Prevents users from blaming themselves for metric changes caused by system updates',
        example:
          'Banner: "On March 5, we updated our content distribution algorithm. Some creators may see temporary changes in reach. Your content quality metrics are unaffected."',
      },
      {
        title: 'Equitable Gamification Design',
        description:
          'Design achievement and tier systems that reward quality and skill, not just volume or spending',
        rationale:
          'Genuine meritocracy satisfies just-world expectations without exploiting users who cannot buy advantages',
        example:
          'Separate "Skill Rating" (earned through performance) from "Member Level" (earned through tenure and spending)',
      },
      {
        title: 'Procedural Justice in Disputes',
        description:
          'Every dispute resolution process should have clear steps, timelines, evidence sharing, and human review',
        rationale:
          'Research shows procedural fairness matters more than outcome favorability for trust maintenance',
        example:
          'Appeal flow: 1) View specific violation + evidence, 2) Submit response with context, 3) Human review within 48h, 4) Decision with detailed explanation',
      },
      {
        title: 'Structural Equity Acknowledgment',
        description:
          'Acknowledge when structural factors create unequal starting conditions rather than framing all outcomes as purely merit-based',
        rationale:
          'Honest acknowledgment builds deeper trust than false meritocracy claims that users eventually see through',
        example:
          'New seller onboarding: "New sellers typically take 2-3 months to build visibility. Here are tools to accelerate your growth." vs "All sellers have equal opportunity!"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Scoring breakdowns must be semantically structured',
        implementation:
          'Use tables or definition lists for score factors with proper headers and labels so screen reader users can navigate scoring criteria independently.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Appeal processes must have clear, descriptive headings',
        implementation:
          'Label each step of appeal processes with descriptive headings so all users can navigate the dispute resolution flow.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Violations and penalties must specify what went wrong',
        implementation:
          'Every penalty notification must identify the specific violation, not just reference general guidelines. Use ARIA live regions for dynamic penalty updates.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Tier status and achievement indicators must not rely on color alone',
        implementation:
          'Combine color with text labels, icons, and patterns for tier badges and achievement indicators so they are perceivable by users with color vision deficiencies.',
      },
    ],

    ethics: [
      {
        concern: 'False Meritocracy',
        severity: 'critical',
        explanation:
          'Framing outcomes as purely merit-based when structural advantages (paid features, tenure, region) significantly influence results',
        mitigation:
          'Disclose all factors that influence outcomes, including those users cannot control. Separate earned achievements from purchased advantages.',
      },
      {
        concern: 'Victim Blaming in System Design',
        severity: 'critical',
        explanation:
          'Using messaging that implies users deserve poor outcomes when system factors (algorithm changes, bugs, biased reporting) are the actual cause',
        mitigation:
          'Always attribute outcomes accurately. When system changes affect user metrics, proactively disclose the system factor rather than suggesting user improvement.',
      },
      {
        concern: 'Opaque Algorithmic Punishment',
        severity: 'critical',
        explanation:
          'Penalizing users through algorithmic decisions without explanation, evidence, or appeal, exploiting their tendency to accept the penalty as deserved',
        mitigation:
          'Every algorithmic penalty must include specific reason, evidence, timeline, and structured appeal process with human review.',
      },
      {
        concern: 'Exploitation of Self-Blame',
        severity: 'high',
        explanation:
          'Designing systems where users internalize blame for poor outcomes that are actually caused by system design, market conditions, or randomness',
        mitigation:
          'Provide context for outcomes: distinguish between user-controlled factors, system factors, and random variation. Normalize outcome variation.',
      },
      {
        concern: 'Inequitable Competition',
        severity: 'high',
        explanation:
          'Presenting competition as fair while allowing paying users, experienced users, or structurally advantaged users to dominate without disclosure',
        mitigation:
          'Segment competitions fairly. Clearly label advantages. Provide multiple recognition paths that reward different strengths.',
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
          'The foundational monograph establishing the Just World Hypothesis as a fundamental cognitive motivation, documenting its origins, mechanisms, and consequences',
        type: 'foundational',
      },
      {
        title: 'The Justice Motive in Everyday Life',
        author: 'Ross, M., & Miller, D. T.',
        year: 2002,
        description:
          'Comprehensive collection of research on how the justice motive influences everyday behavior, attribution, and social judgment',
        type: 'advanced',
      },
      {
        title: 'Reactions to Victims and Belief in a Just World',
        author: 'Lerner, M. J., & Simmons, C. H.',
        year: 1966,
        doi: '10.1037/h0024056',
        description:
          'The original experiment demonstrating that observers derogate innocent victims to maintain just-world beliefs',
        type: 'foundational',
      },
      {
        title: 'The Role of Fairness in Automated Decision Making',
        author: 'Binns, R.',
        year: 2018,
        description:
          'Analysis of how algorithmic decision-making interacts with fairness perceptions and just-world beliefs in digital platforms',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'The Belief in a Just World: A Fundamental Delusion',
        author: 'Lerner, Melvin J.',
        year: 1980,
        isbn: '9780306404955',
        description:
          'The definitive work on the Just World Hypothesis by the psychologist who identified and named it',
        type: 'foundational',
      },
      {
        title: 'The Myth of Meritocracy',
        author: 'McNamee, Stephen J., & Miller, Robert K.',
        year: 2009,
        isbn: '9780742561670',
        description:
          'Examines how just-world beliefs sustain meritocracy narratives despite structural inequality',
        type: 'practical',
      },
      {
        title: 'Weapons of Math Destruction',
        author: 'O\'Neil, Cathy',
        year: 2016,
        isbn: '9780553418835',
        description:
          'How algorithmic systems create false meritocracies and exploit just-world beliefs at scale',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Fairness and Transparency in Ranking',
        author: 'ACM Conference on Fairness, Accountability, and Transparency',
        url: 'https://facctconference.org/',
        description:
          'Research community focused on algorithmic fairness and transparency in automated systems',
        type: 'practical',
      },
      {
        title: 'The Just World Hypothesis and User Trust in Platform Economies',
        author: 'Rosenblat, A., & Stark, L.',
        url: 'https://datasociety.net/',
        description:
          'Research on how gig economy platforms leverage and exploit workers\' just-world beliefs',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Just World Fallacy',
        author: 'Vsauce2',
        url: 'https://www.youtube.com/watch?v=dvqjCBN8cFk',
        description:
          'Accessible explanation of the Just World Hypothesis with everyday examples and implications',
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
      'fundamental-attribution-error',
      'system-justification-bias',
      'halo-effect',
      'meritocracy-bias',
    ],

    conflicts: [
      'learned-helplessness',
      'external-locus-of-control',
    ],

    confusedWith: [
      'belief-in-just-world',
      'fundamental-attribution-error',
      'victim-blaming',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'victim-derogation',
        'system-justification',
        'meritocracy-assumption',
      ],
    },
  },
};
