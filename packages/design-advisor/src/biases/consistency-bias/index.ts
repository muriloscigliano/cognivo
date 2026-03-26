/**
 * CONSISTENCY BIAS
 *
 * We falsely remember past attitudes and behaviors as more
 * similar to current ones than they actually were.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const consistencyBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'consistency-bias',
    name: 'Consistency Bias',
    aliases: ['Consistency Effect', 'Retrospective Consistency', 'Memory Consistency Distortion'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'self-perception',
      'preference-tracking',
      'longitudinal',
      'identity',
      'attitude-change',
      'history-revision',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We falsely remember past attitudes and behaviors as more similar to current ones than they actually were.',

    detailed: `Consistency bias is a memory distortion in which people reconstruct their past attitudes, beliefs, and behaviors to align more closely with their present ones. Rather than accurately recalling how they once felt, individuals revise their personal history so that it appears more coherent and stable over time.

This happens because the brain treats memory as reconstructive rather than reproductive. When asked to recall a past preference or opinion, we use our current state as a starting point and work backward, filling in gaps with what "makes sense" given who we are now. The result is a smoothed-out narrative that underestimates genuine change.

In UX design, consistency bias is critical for features that surface historical data: preference timelines, recommendation evolution, settings histories, and user journey mapping. Designers must decide whether to show users an accurate record of their past behavior (which may feel foreign) or a curated narrative that flatters their sense of continuity. Understanding this bias helps create experiences that honestly reflect growth while remaining emotionally comfortable.`,

    psychologyBasis: {
      discoveredBy: 'Michael Ross and colleagues',
      year: 1989,
      theory: 'Implicit Theories of Stability and Change',
      mechanism: `The brain reconstructs past attitudes using current ones as an anchor, then adjusts insufficiently. This happens because:

1. **Current-State Anchoring**: When asked about a past belief, we start from our present belief and project it backward
2. **Narrative Coherence**: The self-concept demands a stable, consistent identity story, so the brain smooths out discontinuities
3. **Selective Retrieval**: Memories consistent with current attitudes are easier to access; inconsistent memories are suppressed or reinterpreted
4. **Schema-Driven Recall**: We use implicit theories about personal stability ("I've always been this way") to reconstruct memory
5. **Effort Minimization**: Accurately separating past from present attitudes requires cognitive effort the brain avoids

The distortion is automatic and largely unconscious -- people genuinely believe their reconstructed memories are accurate.`,
    },

    realWorldExample: `In a classic study by Ross (1989), participants reported their attitudes on various social issues, then were re-surveyed months later after their attitudes had shifted. When asked to recall their original positions, they systematically misremembered them as closer to their current views. People who had become more liberal remembered always being more liberal; those who shifted conservative recalled having always leaned that way. The actual change was significantly larger than what participants believed had occurred.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Consistency bias affects how users perceive their own history within a product. It shapes how they interpret preference changes, respond to longitudinal data, and evaluate personal growth. Designers can leverage this to:

- Surface preference evolution in ways that feel empowering rather than dissonant
- Build recommendation systems that acknowledge taste changes honestly
- Design settings histories that help users understand their own behavioral shifts
- Create user journey maps that balance accuracy with emotional comfort
- Frame "Your taste has evolved" features that celebrate growth instead of creating identity threat`,

    whenToUse: [
      {
        title: 'Preference History Displays',
        scenario:
          'When showing users how their preferences or behaviors have changed over time',
        example:
          'Spotify Wrapped showing genre shifts year-over-year with a positive "Your taste evolved" framing',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Recommendation Evolution',
        scenario: 'When explaining why recommendations have changed for a user',
        example:
          'Netflix showing "Because you recently enjoyed thrillers" rather than implying the user always liked thrillers',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Settings and Configuration History',
        scenario: 'When providing audit trails or change logs of user settings',
        example:
          'Dashboard showing notification preference changes over time so users understand why their current setup exists',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'User Journey Mapping',
        scenario: 'When visualizing a user\'s progression through a product or learning path',
        example:
          'A fitness app charting goal changes over months, showing how ambitions evolved from "lose weight" to "build strength"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Longitudinal Data Displays',
        scenario: 'When presenting users with their own historical data across long time periods',
        example:
          'Financial app showing risk tolerance changes alongside market conditions that influenced them',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Identity-Threatening Contexts',
        reason:
          'Bluntly showing users how much they have changed can threaten their sense of identity',
        consequence:
          'Users may reject the data, distrust the product, or disengage entirely',
        alternative:
          'Frame changes as growth or evolution rather than contradiction. Use gentle, positive language.',
      },
      {
        title: 'Sensitive Attitude Changes',
        reason:
          'Surfacing past political, religious, or deeply personal attitudes can be harmful',
        consequence:
          'Privacy violations, emotional distress, or social consequences if shared',
        alternative:
          'Avoid surfacing sensitive historical attitudes. Focus on behavioral data like media preferences rather than inferred beliefs.',
      },
      {
        title: 'Weaponizing Past Behavior',
        reason:
          'Using historical data to guilt users or manipulate decisions is unethical',
        consequence:
          'User distrust, churn, and potential reputational harm',
        alternative:
          'Present historical data as informational, never as ammunition for conversion pressure.',
      },
      {
        title: 'Inaccurate Historical Data',
        reason:
          'If historical tracking was incomplete or unreliable, presenting it as authoritative is misleading',
        consequence:
          'Users make decisions based on flawed personal history, reinforcing false narratives',
        alternative:
          'Clearly label data completeness and date ranges. Don\'t present partial data as comprehensive history.',
      },
    ],

    commonMistakes: [
      {
        title: 'Assuming Users Remember Accurately',
        description:
          'Designing features that ask users to recall past preferences without providing records',
        why: 'Consistency bias means users will report past preferences as matching current ones, producing inaccurate data',
        fix: 'Store and display actual historical data rather than relying on user recall',
      },
      {
        title: 'Abrupt Change Reveals',
        description:
          'Showing dramatic before/after comparisons of user behavior without context',
        why: 'Large discrepancies between remembered and actual past behavior create cognitive dissonance and discomfort',
        fix: 'Introduce change data gradually, with framing that normalizes evolution ("Most users\' tastes shift over time")',
      },
      {
        title: 'Flattering the False Narrative',
        description:
          'Reinforcing the user\'s belief that they haven\'t changed when they clearly have',
        why: 'While comfortable, this prevents users from benefiting from self-awareness and better recommendations',
        fix: 'Gently surface real changes with supportive framing. Accuracy serves users better than false comfort.',
      },
      {
        title: 'Ignoring Change in Recommendations',
        description:
          'Treating user preferences as static when they have evolved significantly',
        why: 'Users\' consistency bias makes them believe their tastes are stable, but serving stale recommendations frustrates them',
        fix: 'Continuously update preference models and explain changes: "We noticed you\'ve been exploring new genres"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how temporal data and preference histories are presented',
        examples: [
          'Timeline layouts can reveal or obscure the magnitude of preference changes',
          'Side-by-side comparisons of past vs present make changes salient',
          'Progressive disclosure of history prevents overwhelming identity challenges',
          'Vertical timelines naturally convey evolution and growth',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography signals how to interpret historical vs current data',
        examples: [
          'Muted type for historical data reduces identity threat from past views',
          'Present-tense headings anchor attention to current preferences',
          'Quotation styling for past statements frames them as distinct from current self',
          'Progressive font weight from past (light) to present (bold) conveys evolution',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can soften or sharpen the contrast between past and present states',
        examples: [
          'Gradient transitions from past to present suggest smooth evolution rather than abrupt change',
          'Desaturated colors for historical data make the past feel distant',
          'Consistent color coding across time helps users track specific preferences',
          'Warm/cool color shifts can emotionally frame change as positive or neutral',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactions determine how users explore and confront their own history',
        examples: [
          'Scrubbing timelines let users discover changes at their own pace',
          'Opt-in "See how you\'ve changed" features respect user agency',
          'Hover states revealing historical context keep change data secondary',
          'Progressive reveal of change magnitude prevents shock',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether change feels threatening or empowering',
        examples: [
          '"Your taste has evolved" is empowering; "You used to like this" is threatening',
          'Growth-oriented language normalizes change ("Exploring new territory")',
          'Contextualizing change ("After you moved to Portland, you started...") adds meaning',
          'Comparative language should celebrate breadth, not imply inconsistency',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible presentation of temporal data is essential for all users to understand their history',
        examples: [
          'Screen reader announcements must convey temporal context ("In 2023, your top genre was...")',
          'Timeline visualizations need text alternatives describing the trajectory',
          'Color-only change indicators fail for color-blind users; add labels',
          'Keyboard navigation through historical data should follow chronological order',
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
        title: 'Preference Evolution Timeline',
        description:
          'Music streaming app showing how listening tastes have evolved over time with positive framing',
        code: `<section class="taste-evolution">
  <h2>Your Music Journey</h2>
  <p class="subtitle">Your taste has grown and evolved -- here's your story</p>

  <div class="timeline">
    <div class="year" data-year="2023">
      <h3>2023</h3>
      <div class="top-genres">
        <span class="genre">Indie Rock</span>
        <span class="genre">Folk</span>
        <span class="genre">Ambient</span>
      </div>
      <p class="insight">You were deep in your acoustic phase</p>
    </div>

    <div class="year current" data-year="2024">
      <h3>2024</h3>
      <div class="top-genres">
        <span class="genre">Electronic</span>
        <span class="genre">Jazz</span>
        <span class="genre">Indie Rock</span>
      </div>
      <p class="insight">You discovered electronic and jazz this year!</p>
    </div>
  </div>

  <div class="evolution-note">
    <p>Most listeners' tastes shift every 8-12 months.
    Your exploration of new genres puts you in the top 15% of adventurous listeners.</p>
  </div>
</section>`,
        explanation:
          'Frames taste change as a "journey" and "evolution" rather than inconsistency. Normalizes change with the "most listeners" statistic. Celebrates exploration rather than implying fickleness.',
        principle:
          'Frame preference changes as growth to work with consistency bias rather than against it',
        metrics: {
          before: '23% engagement with year-review features (raw before/after comparison)',
          after: '61% engagement with evolution-framed year review',
          improvement: '165% increase in engagement with personal history features',
        },
      },
      {
        title: 'Recommendation Change Explanation',
        description:
          'Streaming service explaining why recommendations have shifted',
        code: `<div class="recommendation-context">
  <h3>Why You're Seeing This</h3>
  <div class="preference-shift">
    <div class="shift-visual">
      <span class="past">Comedies (6 months ago)</span>
      <span class="arrow">&rarr;</span>
      <span class="present">Thrillers (now)</span>
    </div>
    <p>Over the past few months, you've gravitated toward thrillers
    and suspense. We've updated your recommendations to match.</p>
    <div class="actions">
      <button class="secondary">Still show me comedies too</button>
      <button class="primary">Looks right</button>
    </div>
  </div>
</div>`,
        explanation:
          'Transparently shows the preference shift rather than silently changing recommendations. Gives users control to correct the model, respecting that they may not realize their tastes have changed.',
        principle:
          'Transparent change communication builds trust and improves recommendation accuracy',
      },
      {
        title: 'Goal Evolution Tracker',
        description:
          'Fitness app showing how user goals have naturally evolved',
        code: `<section class="goal-history">
  <h2>Your Fitness Evolution</h2>

  <div class="goal-timeline">
    <div class="goal past">
      <span class="date">Jan 2024</span>
      <span class="label">Lose 20 lbs</span>
      <span class="status achieved">Achieved</span>
    </div>
    <div class="goal past">
      <span class="date">Apr 2024</span>
      <span class="label">Run a 5K</span>
      <span class="status achieved">Achieved</span>
    </div>
    <div class="goal current">
      <span class="date">Now</span>
      <span class="label">Build muscle strength</span>
      <span class="status active">In Progress</span>
    </div>
  </div>

  <p class="insight">Your goals have naturally evolved from weight loss
  to performance. This progression is common among committed athletes.</p>
</section>`,
        explanation:
          'Shows goal changes as a natural progression rather than abandoned commitments. Users with consistency bias might not remember their original goal was weight loss, so the timeline provides accurate context while framing change positively.',
        principle:
          'Accurate history with positive framing helps users appreciate their own growth',
      },
    ],

    bad: [
      {
        title: 'Confrontational Change Reveal',
        description:
          'Social media app bluntly showing attitude contradictions',
        code: `<!-- DON'T DO THIS -->
<div class="contradiction-alert">
  <h2>You've Changed Your Mind!</h2>
  <div class="then-vs-now">
    <div class="then">
      <h3>What You Said in 2022:</h3>
      <blockquote>"I'll never switch to electric cars"</blockquote>
    </div>
    <div class="now">
      <h3>What You Just Liked:</h3>
      <p>Tesla Model 3 Review: "Best Car I've Driven"</p>
    </div>
  </div>
  <p>Looks like you weren't so consistent after all!</p>
</div>`,
        explanation:
          'Framing attitude change as contradiction or hypocrisy triggers identity threat. Users will feel attacked, defensive, and distrustful of a platform that weaponizes their own history against them.',
        principle:
          'Never frame preference changes as inconsistency or hypocrisy',
      },
      {
        title: 'Guilt-Driven Re-engagement',
        description:
          'App using past behavior to guilt users into returning',
        code: `<!-- DON'T DO THIS -->
<div class="guilt-notification">
  <h2>Remember When You Used To Care?</h2>
  <p>You used to meditate every day for 45 days straight.</p>
  <p>Now it's been 3 months since your last session.</p>
  <p>Your past self would be disappointed.</p>
  <button class="primary">Come Back to Who You Were</button>
</div>`,
        explanation:
          'Using consistency bias to guilt users by contrasting past commitment with current behavior is manipulative. The phrase "your past self would be disappointed" weaponizes the desire for self-consistency.',
        principle:
          'Never weaponize personal history to manipulate behavior through guilt',
      },
      {
        title: 'Silent Preference Overwrite',
        description:
          'Recommendation system that silently overwrites historical preferences',
        code: `<!-- DON'T DO THIS -->
<div class="recommendations">
  <h3>Because You Love Thrillers</h3>
  <!-- User historically loved comedies but recently watched 2 thrillers -->
  <!-- System has completely overwritten comedy preference -->
  <!-- No comedy recommendations shown at all -->
  <!-- No way to see or restore previous preferences -->
  <div class="movie-grid">
    <div class="movie">Gone Girl</div>
    <div class="movie">Zodiac</div>
    <div class="movie">Se7en</div>
  </div>
</div>`,
        explanation:
          'Silently erasing historical preferences and presenting the new state as if it was always the user\'s taste reinforces consistency bias in a harmful way. Users lose access to their actual preference history and can\'t course-correct.',
        principle:
          'Don\'t reinforce consistency bias by erasing evidence of genuine change',
      },
    ],

    realWorld: [
      {
        company: 'Spotify',
        product: 'Spotify Wrapped',
        description: 'Spotify Wrapped shows year-over-year listening data, revealing how tastes have evolved. By framing shifts as "Your music journey" and celebrating genre exploration, it surfaces real change without threatening identity. Users often express surprise at how different their 2022 vs 2024 tastes are.',
        effectiveness: 'very-effective',
        analysis: 'Wrapped works because it frames change as discovery and growth. The social sharing mechanic turns what could be an identity-threatening reveal into a celebration, reducing defensive reactions to genuine attitude shifts.',
      },
      {
        company: 'Facebook',
        product: 'Facebook Memories / On This Day',
        description: 'Facebook Memories surfaces posts from years ago, often revealing past attitudes, interests, and relationships that no longer reflect the current user. Users frequently report surprise or discomfort at past views, directly experiencing consistency bias when they realize they\'ve changed more than they thought.',
        effectiveness: 'effective',
        analysis: 'The feature works well for nostalgic content but can backfire when it surfaces past opinions or relationships the user has since moved away from. Facebook added controls to filter out certain time periods and people, acknowledging the discomfort of confronting genuine change.',
      },
      {
        company: 'Netflix',
        product: 'Viewing History and Taste Profile',
        description: 'Netflix maintains detailed viewing history and evolves recommendations as tastes shift. The "Because you watched X" explanations help users understand why their feed has changed, providing transparency about preference evolution without explicitly calling out inconsistency.',
        effectiveness: 'effective',
        analysis: 'Netflix balances consistency bias by explaining recommendation changes in terms of recent behavior rather than confronting long-term attitude shifts. This respects the user\'s sense of stable identity while still adapting to genuine change.',
      },
      {
        company: 'Goodreads',
        product: 'Reading Challenge Year-Over-Year',
        description: 'Goodreads shows annual reading statistics including genre breakdowns over multiple years. Users can see how their reading habits have shifted, often revealing that they\'ve moved from fiction to non-fiction or discovered entirely new genres they now consider core to their identity.',
        effectiveness: 'effective',
        analysis: 'The annual format creates natural comparison points. Users who believe they\'ve "always loved sci-fi" can see that they only started reading it two years ago, gently correcting consistency bias through data.',
      },
    ],

    abTests: [
      {
        title: 'Preference Change Framing: Growth vs Neutral vs Raw Data',
        hypothesis:
          'Growth-oriented framing of preference changes will increase engagement compared to neutral or raw data presentations',
        controlVersion: {
          description:
            'Year review showing raw data: "2023: 70% comedy, 30% drama. 2024: 20% comedy, 80% drama" with no interpretive framing',
          metrics: {
            conversionRate: '18%',
            timeOnPage: '0:45',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'Year review with growth framing: "Your Viewing Evolution: You\'ve expanded into drama this year, discovering critically acclaimed series. Your palette has broadened."',
          metrics: {
            conversionRate: '47%',
            timeOnPage: '2:30',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Growth-framed preference history saw 161% higher engagement. Users shared growth-framed reviews 3.2x more often. Post-survey showed 78% of treatment users said the review "felt accurate" vs 41% for control, despite identical underlying data.',
          learnings: [
            'Framing matters more than data accuracy for user acceptance',
            'Users reject raw data that contradicts their sense of consistency',
            'Growth language transforms identity threat into identity enhancement',
            'Social sharing increases when change is framed as positive evolution',
          ],
        },
      },
      {
        title: 'Recommendation Transparency: Explained vs Silent Updates',
        hypothesis:
          'Explaining why recommendations changed will increase trust and satisfaction',
        controlVersion: {
          description:
            'Recommendations silently updated based on recent behavior, no explanation provided for changes',
          metrics: {
            conversionRate: '12%',
            clickThroughRate: '8%',
          },
        },
        treatmentVersion: {
          description:
            'Recommendations updated with explanation: "We noticed you\'ve been exploring jazz lately. Here are some picks based on your evolving taste." Plus option to revert.',
          metrics: {
            conversionRate: '22%',
            clickThroughRate: '19%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Transparent preference change communication increased click-through by 137%. Users who saw explanations rated recommendation quality 4.2/5 vs 3.1/5 for silent updates. Only 8% used the revert option, suggesting most appreciated the acknowledged change.',
          learnings: [
            'Users prefer knowing why recommendations changed rather than silent updates',
            'Transparency about preference shifts builds trust rather than threatening identity',
            'Giving users control over preference changes reduces anxiety about inconsistency',
            'Framing changes as "evolving taste" is more accepted than "you changed your mind"',
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
        name: 'Temporal Comparison Displays',
        description:
          'Side-by-side or timeline comparisons of user preferences, behaviors, or attitudes across time periods',
        howToSpot:
          'Look for "then vs now", yearly reviews, before/after comparisons, or historical preference data',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Preference History Features',
        description:
          'Features that surface past user choices, settings, or behaviors alongside current ones',
        howToSpot:
          'Look for "Your history", change logs, preference timelines, or "On This Day" features',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Recommendation Evolution Indicators',
        description:
          'Signals showing that recommendations or content feeds have changed based on shifting user behavior',
        howToSpot:
          'Look for "Because you recently...", "New for you", or unexplained recommendation shifts',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Identity Continuity Language',
        description:
          'Copy that reinforces or challenges the user\'s sense of stable identity over time',
        howToSpot:
          'Look for phrases like "You\'ve always loved...", "Your taste has evolved", or "Remember when you..."',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Longitudinal Data Visualizations',
        description:
          'Charts, graphs, or timelines showing user behavior or preferences over extended periods',
        howToSpot:
          'Look for year-over-year charts, trend lines, or multi-period comparison dashboards',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Year-in-Review Pattern',
        description: 'Annual summaries that surface how user behavior and preferences have changed year over year',
        indicators: ['Wrapped-style yearly summaries', 'Year-over-year comparison stats', 'Top categories or genres by year', '"Your year" personalized reviews'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Preference Drift Pattern',
        description: 'Recommendation systems that silently adapt to changing preferences without acknowledging the shift',
        indicators: ['Changed recommendations with no explanation', 'Category proportions shifting over time', 'New content types appearing in feeds', 'Historical preferences no longer represented'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Memory Prompt Pattern',
        description: 'Features that surface past content, posts, or behaviors to the user',
        indicators: ['"On this day" or "Memories" features', 'Resurfaced old posts or content', 'Historical activity notifications', 'Anniversary or milestone reminders'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Goal Evolution Pattern',
        description: 'Tracking features that record how user goals, settings, or intentions have changed over time',
        indicators: ['Goal history timelines', 'Settings change logs', 'Milestone progression displays', 'Modified target tracking'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the design surface historical user preferences or behaviors?',
      'How are preference changes framed -- as growth, inconsistency, or neutrally?',
      'Can users see how their tastes or behaviors have evolved over time?',
      'Are recommendation changes explained or silently applied?',
      'Does the language reinforce stable identity ("you\'ve always...") or acknowledge change?',
      'Is historical data presented with empowering or threatening framing?',
      'Are users given control over how much of their history is surfaced?',
      'Could surfacing past attitudes create identity threat or emotional distress?',
      'Is the system preserving accurate historical data or overwriting it with current preferences?',
      'Are temporal comparisons designed to celebrate growth rather than expose inconsistency?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in consistency bias (the tendency to misremember past attitudes as similar to current ones).

Analyze the provided design for consistency bias patterns. Identify:

1. **Preference History Features**: How past user preferences, behaviors, or attitudes are surfaced
2. **Change Framing**: How changes in user behavior are communicated (growth vs inconsistency vs silent)
3. **Temporal Comparisons**: Side-by-side or timeline comparisons of past vs present states
4. **Recommendation Evolution**: How recommendation shifts are explained or hidden
5. **Identity Language**: Copy that reinforces or challenges the user's sense of stable identity

For each pattern found:
- Identify how it interacts with users' natural tendency to misremember past attitudes
- Assess whether the framing respects identity while maintaining accuracy
- Determine if historical data is preserved or overwritten
- Evaluate whether change is framed as growth, contradiction, or ignored
- Suggest improvements for honest yet supportive change communication

Consider:
- Is the design helping users appreciate genuine growth or reinforcing false consistency?
- Could surfacing past attitudes create identity threat or emotional distress?
- Are recommendation changes transparent and user-controllable?
- Is historical preference data accurately preserved?
- Does the framing normalize change or stigmatize it?

Provide actionable recommendations for ethical, supportive handling of preference evolution.`,

    outputSchema: {
      type: 'object',
      properties: {
        consistencyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              historicalDataHandling: { type: 'string' },
              changeFraming: { type: 'string' },
              identityImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'historicalDataHandling',
              'changeFraming',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            historicalAccuracy: { type: 'number' },
            changeFramingQuality: { type: 'number' },
            identitySafety: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'historicalAccuracy',
            'changeFramingQuality',
            'identitySafety',
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
        'consistencyPatterns',
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
        title: 'Preserve Accurate Historical Data',
        description:
          'Store actual historical preferences, settings, and behaviors rather than overwriting them with current values',
        example:
          'Maintain a timestamped log of preference changes rather than only storing current state',
        tips: [
          'Use append-only data stores for preference history',
          'Record the context of each change (what triggered it)',
          'Never silently overwrite historical preferences with current ones',
        ],
      },
      {
        step: 2,
        title: 'Frame Change as Growth',
        description:
          'When surfacing preference evolution, use language that frames change as positive development',
        example:
          '"Your taste has evolved" rather than "You changed your mind" or "You used to like different things"',
        tips: [
          'Use words like "evolved", "discovered", "explored", "expanded"',
          'Avoid words like "inconsistent", "changed", "abandoned", "quit"',
          'Normalize change with social proof ("Most users\' preferences shift...")',
        ],
      },
      {
        step: 3,
        title: 'Provide User Control Over History',
        description:
          'Let users choose how much of their history is surfaced and in what context',
        example:
          'Settings for "Show me my preference history" with granular controls for time range and categories',
        tips: [
          'Make history features opt-in, not forced',
          'Allow users to hide specific time periods or categories',
          'Give users agency in how change is presented',
        ],
      },
      {
        step: 4,
        title: 'Explain Recommendation Changes',
        description:
          'Transparently communicate when and why recommendations shift based on evolving preferences',
        example:
          '"We noticed you\'ve been exploring jazz. Here are recommendations based on your recent interests."',
        tips: [
          'Always explain why recommendations changed',
          'Let users override or revert recommendation changes',
          'Don\'t claim users "always liked" things they recently discovered',
        ],
      },
      {
        step: 5,
        title: 'Test for Identity Safety',
        description:
          'Validate that preference history features don\'t trigger identity threat or discomfort',
        example:
          'User research sessions specifically testing emotional responses to "then vs now" comparisons',
        tips: [
          'Watch for defensive reactions in user testing',
          'Test with users who have changed significantly vs those who haven\'t',
          'Iterate on framing based on emotional response data',
        ],
      },
    ],

    dos: [
      'Store accurate historical preference data with timestamps',
      'Frame preference changes as growth, evolution, or exploration',
      'Explain recommendation changes transparently',
      'Give users control over how much history is surfaced',
      'Normalize change with social proof and supportive language',
      'Celebrate preference breadth and exploration',
      'Provide context for why preferences may have shifted',
      'Use gradual reveal for large preference discrepancies',
    ],

    donts: [
      'Don\'t frame preference changes as inconsistency or hypocrisy',
      'Don\'t weaponize past behavior to guilt users into current actions',
      'Don\'t silently overwrite historical preferences with current ones',
      'Don\'t surface sensitive past attitudes without user consent',
      'Don\'t force confrontation with past opinions or behaviors',
      'Don\'t claim users "always loved" things they recently discovered',
      'Don\'t use past behavior to manipulate current purchasing decisions',
      'Don\'t present partial historical data as comprehensive truth',
    ],

    bestPractices: [
      {
        title: 'Growth Framing Over Contradiction',
        description:
          'Always frame preference changes as positive evolution rather than exposing inconsistency',
        rationale:
          'Growth framing works with consistency bias by extending the self-narrative rather than breaking it',
        example:
          '"Your taste has expanded to include jazz" rather than "You stopped listening to rock"',
      },
      {
        title: 'Transparent Recommendation Evolution',
        description:
          'Explain why recommendations change and give users control over the transition',
        rationale:
          'Users whose consistency bias tells them they haven\'t changed will be confused by silently shifting recommendations',
        example:
          '"Based on your recent activity, we think you might enjoy..." with option to say "Not quite right"',
      },
      {
        title: 'Contextual Change Attribution',
        description:
          'When possible, attribute preference changes to external context rather than internal inconsistency',
        rationale:
          'Attributing change to circumstances ("After moving to Portland...") is less identity-threatening than implying personality change',
        example:
          '"Since starting your new role, your reading has shifted toward leadership and management"',
      },
      {
        title: 'Graduated History Reveal',
        description:
          'Introduce historical data gradually rather than presenting dramatic before/after contrasts',
        rationale:
          'Abrupt reveals of large changes overwhelm consistency bias defense mechanisms, causing rejection',
        example:
          'Start with recent data and allow users to scrub backward through time at their own pace',
      },
      {
        title: 'Dual-Track Recommendations',
        description:
          'Maintain recommendations for both historical and current preferences',
        rationale:
          'Users may not realize how much their tastes have changed and still want access to older preference categories',
        example:
          'Show "Based on your current interests" alongside "From your all-time favorites"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Temporal data must have semantic structure',
        implementation:
          'Use proper time elements, ordered lists, and ARIA labels to convey chronological relationships in preference histories',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to distinguish past vs present preferences',
        implementation:
          'Combine color with labels, icons, and text to distinguish historical from current data. Desaturated colors for past data need text reinforcement.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Timeline sections need clear temporal headings',
        implementation:
          'Label time periods clearly ("Your 2023 Preferences", "Current") so screen reader users understand temporal context',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Timeline visualizations need text alternatives',
        implementation:
          'Provide text descriptions of preference change trends for users who cannot perceive visual timelines',
      },
    ],

    ethics: [
      {
        concern: 'Identity Threat',
        severity: 'high',
        explanation:
          'Revealing large discrepancies between past and present attitudes can threaten a user\'s sense of self-continuity',
        mitigation:
          'Frame changes as growth. Use gradual reveals. Normalize change with social proof. Give users control over what history is surfaced.',
      },
      {
        concern: 'History Weaponization',
        severity: 'critical',
        explanation:
          'Using past behavior or attitudes to guilt, shame, or manipulate users into current actions',
        mitigation:
          'Never use historical data as leverage for engagement, purchases, or behavior change. Historical data should inform, not coerce.',
      },
      {
        concern: 'Privacy of Past Selves',
        severity: 'high',
        explanation:
          'Past attitudes and behaviors may reflect a person the user no longer identifies with, and surfacing them can be a privacy violation of their former self',
        mitigation:
          'Let users control what historical data is surfaced and to whom. Allow deletion of historical preference data. Don\'t share past preferences publicly without explicit consent.',
      },
      {
        concern: 'False Consistency Reinforcement',
        severity: 'medium',
        explanation:
          'Reinforcing the user\'s false belief that they haven\'t changed, preventing beneficial self-awareness',
        mitigation:
          'Balance comfort with accuracy. Gently surface genuine changes when it serves the user (better recommendations, self-awareness) using supportive framing.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Relation of Implicit Theories to the Construction of Personal Histories',
        author: 'Ross, M.',
        year: 1989,
        doi: '10.1037/0033-295X.96.2.341',
        description:
          'Foundational paper demonstrating how implicit theories of stability lead people to reconstruct past attitudes as consistent with present ones',
        type: 'foundational',
      },
      {
        title: 'The Stability of Self-Concept: Implications for Research and Practice',
        author: 'Markus, H.',
        year: 1986,
        description:
          'Explores how self-schemas create consistency in self-perception and memory, leading to systematic reconstruction of past attitudes',
        type: 'foundational',
      },
      {
        title: 'Biased Reconstruction of Past Attitudes and Behavior',
        author: 'Ross, M., & Conway, M.',
        year: 1986,
        description:
          'Comprehensive review of research showing systematic memory distortion toward current attitudes',
        type: 'advanced',
      },
      {
        title: 'Self-Concept and Identity',
        author: 'Oyserman, D., Elmore, K., & Smith, G.',
        year: 2012,
        description:
          'Modern framework for understanding how self-concept stability biases influence memory and decision-making',
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
          'Covers memory biases including consistency effects and the distinction between experiencing and remembering selves',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores how people misremember past preferences and misjudge how much they have changed, directly relevant to consistency bias',
        type: 'practical',
      },
      {
        title: 'The Seven Sins of Memory',
        author: 'Schacter, Daniel L.',
        year: 2001,
        isbn: '9780618219193',
        description:
          'Categorizes consistency bias under "bias" as one of the seven fundamental memory distortions',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The End of History Illusion',
        author: 'Quoidbach, J., Gilbert, D. T., & Wilson, T. D.',
        url: 'https://www.science.org/doi/10.1126/science.1229294',
        description:
          'Demonstrates that people consistently underestimate how much they will change in the future, a close relative of consistency bias',
        type: 'foundational',
      },
    ],

    videos: [
      {
        title: 'The Psychology of Your Future Self',
        author: 'Dan Gilbert (TED Talk)',
        url: 'https://www.ted.com/talks/dan_gilbert_the_psychology_of_your_future_self',
        description:
          'Accessible overview of how people misjudge personal change, closely related to consistency bias',
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
      'hindsight-bias',       // Both involve reconstructing the past to match the present
      'confirmation-bias',    // Seeking information that confirms current views reinforces false consistency
      'self-serving-bias',    // Remembering past behavior more favorably aligns with consistency
      'choice-supportive-bias', // Post-decision rationalization creates false consistency with past choices
    ],

    conflicts: [
      'change-bias',          // Some contexts make people overestimate rather than underestimate change
      'rosy-retrospection',   // Remembering the past as better (not necessarily consistent with present)
    ],

    confusedWith: [
      'confirmation-bias',    // Confirmation bias is about seeking new info; consistency bias is about reconstructing memory
      'hindsight-bias',       // Hindsight is "I knew it all along"; consistency is "I always felt this way"
      'status-quo-bias',      // Status quo is preference for current state; consistency is memory of past matching current
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'attitude-consistency',
        'preference-stability-illusion',
      ],
    },
  },
};
