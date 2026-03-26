/**
 * FALSE UNIQUENESS EFFECT
 *
 * We underestimate how common our abilities and positive traits are,
 * believing our good qualities are rarer than they actually are.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const falseUniquenessEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'false-uniqueness-effect',
    name: 'False Uniqueness Effect',
    aliases: ['Uniqueness Bias', 'False Distinctiveness'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'self-perception',
      'social-comparison',
      'personalization',
      'exclusivity',
      'identity',
      'motivation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We underestimate how many others share our positive traits and abilities, believing our good qualities are rarer than they are.',

    detailed: `The false uniqueness effect is a cognitive bias in which people underestimate how common their desirable behaviors, abilities, and positive attributes are in the general population. While the related false consensus effect leads people to overestimate agreement with their opinions, the false uniqueness effect works in the opposite direction for traits we value: we assume fewer people share our strengths than actually do.

This bias serves a self-enhancement function. By believing our positive traits are rare, we maintain a sense of distinctiveness and self-worth. We think we are more talented, more disciplined, or more ethical than the average person -- and we assume fewer others match us than is actually the case.

In product design, this bias is a powerful lever for engagement and retention. When interfaces affirm a user's sense of uniqueness -- through personalized stats, exclusive access, or "you're special" messaging -- they tap into a deep psychological need for distinctiveness. Users are primed to believe these messages because the false uniqueness effect already makes them feel their qualities are rare.`,

    psychologyBasis: {
      discoveredBy: 'Jerry Suls and Frederick Wan',
      year: 1987,
      theory: 'Self-Enhancement and Social Comparison Theory',
      mechanism: `The false uniqueness effect arises from several interacting cognitive processes:

1. **Self-Enhancement Motivation**: People are motivated to see themselves favorably, and believing one's strengths are rare enhances self-esteem
2. **Limited Social Sampling**: We have limited access to others' inner traits and abilities, so we underestimate how common our qualities are
3. **Spotlight Effect**: We have vivid, detailed knowledge of our own efforts and abilities but only surface-level awareness of others'
4. **Selective Comparison**: We tend to compare ourselves against a mental image of the "average person" that underestimates population diversity
5. **Confirmation Bias**: We notice and remember instances where others lack our traits more readily than instances where they share them

The effect is automatic and ego-protective -- we genuinely believe our positive qualities set us apart, even when objective data shows they are widespread.`,
    },

    realWorldExample: `In Suls and Wan's (1987) research, participants were asked to estimate what percentage of other people shared their healthy behaviors (like exercising regularly or eating well). Those who engaged in these behaviors consistently underestimated how many others did the same. A person who exercised daily might guess only 15% of peers did the same, when the actual figure was closer to 40%. The effect was specific to desirable behaviors -- for undesirable habits, people showed the opposite pattern (false consensus).`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The false uniqueness effect profoundly shapes how users respond to personalization, exclusivity, and identity-affirming features. Because users already believe their positive traits are rare, interfaces that confirm this belief feel accurate and compelling. Designers can leverage this to:

- Increase engagement through personalized "you're special" messaging and unique-to-you statistics
- Drive feature adoption by framing access as exclusive or earned through rare qualities
- Build emotional connection by reflecting users' sense of distinctiveness back to them
- Motivate continued use through uniqueness indicators and achievement differentiation
- Strengthen brand loyalty by making users feel the product "gets" their individuality`,

    whenToUse: [
      {
        title: 'Personalized Achievement Messaging',
        scenario:
          'When showing users their progress, stats, or accomplishments',
        example:
          'Display "You\'re in the top 5% of active readers this month" to affirm effort and distinctiveness',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Exclusive Access Framing',
        scenario: 'When offering beta features, early access, or invite-only experiences',
        example:
          'Frame beta access as "Selected for your usage pattern" rather than "Random selection"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Personalized Taste Profiles',
        scenario: 'When showing users their preferences, habits, or taste data',
        example:
          'Spotify Wrapped-style summaries that highlight what makes the user\'s listening unique',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Uniqueness Indicators',
        scenario: 'When differentiating user contributions or profiles',
        example:
          'Show rare achievement badges, unique skill combinations, or distinctive usage patterns',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Onboarding Personalization',
        scenario: 'When welcoming new users and making them feel valued',
        example:
          'Highlight what makes their signup special: "You\'re one of the first 500 designers to join"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Performance Comparisons That Discourage',
        reason:
          'Uniqueness messaging that implies others are far behind can create toxic competitiveness',
        consequence:
          'Users may develop inflated self-assessments or dismiss peer contributions',
        alternative:
          'Frame uniqueness as complementary ("Your unique strengths add to the team") rather than superior',
      },
      {
        title: 'False Scarcity or Manufactured Exclusivity',
        reason:
          'If "exclusive" access is actually available to everyone, users will feel manipulated when they discover the truth',
        consequence:
          'Severe trust erosion, brand damage, and user churn when the illusion breaks',
        alternative:
          'Use genuine personalization data rather than fabricated uniqueness claims',
      },
      {
        title: 'Health or Skill Assessments',
        reason:
          'Telling users their health behaviors or skills are unusually good can reduce motivation to improve',
        consequence:
          'Users may become complacent about areas where growth is still needed',
        alternative:
          'Provide accurate benchmarks and emphasize growth trajectories over rank',
      },
      {
        title: 'Collaborative Environments',
        reason:
          'Over-emphasizing individual uniqueness can undermine team cohesion',
        consequence:
          'Team members may devalue others\' contributions or resist collaboration',
        alternative:
          'Balance individual recognition with team accomplishments and shared identity',
      },
    ],

    commonMistakes: [
      {
        title: 'Fabricating Uniqueness Stats',
        description:
          'Showing "You\'re in the top X%" numbers that are inflated or entirely made up',
        why: 'Users who discover the deception lose all trust in the platform\'s data and messaging',
        fix: 'Use real data. If you can\'t compute genuine percentiles, use qualitative affirmation instead',
      },
      {
        title: 'Everyone Is Special (So No One Is)',
        description:
          'Giving every user the same "unique" badge or exclusive status, diluting the meaning',
        why: 'When uniqueness is universal, it becomes meaningless and users feel patronized',
        fix: 'Create genuinely differentiated tiers, or highlight truly distinctive usage patterns',
      },
      {
        title: 'Uniqueness Without Substance',
        description:
          'Telling users they are unique without backing it up with specific, meaningful data',
        why: 'Vague flattery feels hollow; users want to see what specifically makes them distinct',
        fix: 'Ground uniqueness messaging in concrete behaviors, stats, or contributions the user can verify',
      },
      {
        title: 'Ignoring Cultural Context',
        description:
          'Applying Western-style individualism messaging in collectivist cultures',
        why: 'In many cultures, standing out is not inherently desirable and uniqueness messaging can feel alienating',
        fix: 'Adapt messaging to cultural values; in collectivist contexts, frame contributions as unique value to the group',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines where uniqueness-affirming elements appear and how prominent they are',
        examples: [
          'Personalized dashboard cards highlighting unique user stats',
          'Profile sections showcasing rare achievements or distinctive patterns',
          'Hero sections on year-in-review pages emphasizing individual distinctiveness',
          'Dedicated "Your Uniqueness" sections in settings or profile views',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography choices amplify or diminish the emotional impact of uniqueness messaging',
        examples: [
          'Large, bold percentile numbers ("Top 3%") feel authoritative and affirming',
          'Personalized headlines using the user\'s name increase sense of individual attention',
          'Italic or handwritten-style fonts can add warmth to personal messages',
          'Number formatting (e.g., "1 of 47") feels more exclusive than percentages',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals exclusivity, rarity, and achievement tier',
        examples: [
          'Gold, platinum, or gradient colors signal rare or elite status',
          'Unique color assignments per user (e.g., "Your color is...") reinforce individuality',
          'Muted palette for common items vs vibrant for rare achievements',
          'Brand-exclusive colors for premium or early-access features',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive moments create memorable experiences of personal distinctiveness',
        examples: [
          'Reveal animations for personalized stats create anticipation and delight',
          'Share-to-social flows for unique achievements amplify identity signaling',
          'Interactive comparisons ("See how you compare") satisfy curiosity while affirming uniqueness',
          'Unlock animations for rare badges make the achievement feel earned and special',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content wording is the primary vehicle for uniqueness affirmation',
        examples: [
          '"Your taste is unlike anyone else\'s" creates emotional resonance',
          'Specific data points ("You discovered 23 artists before they went mainstream") feel credible',
          'Comparative language ("Only 8% of users have explored this deeply") triggers false uniqueness confirmation',
          'Personalized narratives ("Your year was defined by...") create identity stories',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Uniqueness-affirming features must be equally compelling for all users',
        examples: [
          'Screen reader announcements for achievement unlocks and unique stats',
          'Alt text that conveys the significance of visual uniqueness indicators',
          'Keyboard-navigable share flows for personalized content',
          'Sufficient contrast on badge and tier indicators so visual distinctiveness is perceivable',
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
        title: 'Personalized Year-in-Review',
        description:
          'Music streaming service creating a shareable summary of the user\'s unique listening habits',
        code: `<div class="wrapped-summary">
  <h2>Your 2025 Wrapped</h2>
  <div class="uniqueness-stats">
    <div class="stat-card">
      <span class="big-number">Top 2%</span>
      <p>of all listeners for <strong>Radiohead</strong></p>
    </div>
    <div class="stat-card">
      <span class="big-number">23</span>
      <p>artists you discovered before they hit 10K listeners</p>
    </div>
    <div class="stat-card">
      <span class="big-number">47</span>
      <p>unique genres explored — most listeners stick to 12</p>
    </div>
  </div>
  <p class="taste-summary">
    Your listening personality: <strong>The Explorer</strong>
    — only 6% of listeners are this adventurous.
  </p>
  <button class="share-btn">Share Your Wrapped</button>
</div>`,
        explanation:
          'Each stat is grounded in real data and highlights genuinely distinctive patterns. The "Explorer" personality label gives the user a unique identity. The share button leverages social identity signaling.',
        principle:
          'Data-backed uniqueness affirmation creates authentic emotional connection',
        metrics: {
          before: '22% of users shared generic stats cards',
          after: '68% of users shared personalized uniqueness summaries',
          improvement: '209% increase in social sharing and organic reach',
        },
      },
      {
        title: 'Achievement Badges with Genuine Rarity',
        description:
          'Learning platform showing rare achievements based on real completion data',
        code: `<div class="achievement-earned">
  <div class="badge rare">
    <img src="deep-diver-badge.svg" alt="Deep Diver badge — rare achievement">
    <span class="rarity">Rare — earned by 3.2% of learners</span>
  </div>
  <h3>Deep Diver</h3>
  <p>You completed all 8 advanced modules in Machine Learning,
     including 3 optional deep-dive projects.</p>
  <p class="context">Most learners complete 2-3 modules.
     You went well beyond the typical path.</p>
  <button class="secondary">Add to Profile</button>
</div>`,
        explanation:
          'The badge rarity is computed from real completion data, not fabricated. The description explains specifically what the user did that was distinctive, and the context provides honest comparison without inflating the claim.',
        principle:
          'Genuine rarity indicators backed by real data sustain long-term credibility',
      },
      {
        title: 'Profile Uniqueness Highlights',
        description:
          'Professional network showing what makes a user\'s profile distinctive',
        code: `<div class="profile-insights">
  <h3>What Makes You Stand Out</h3>
  <ul class="uniqueness-list">
    <li>
      <span class="icon">🔍</span>
      <p>You appeared in <strong>847 searches</strong> this week</p>
      <span class="comparison">3.4x more than typical profiles in your field</span>
    </li>
    <li>
      <span class="icon">🎯</span>
      <p>Your skill combination of <strong>UX Research + Data Science</strong> is shared by only <strong>1 in 200</strong> professionals in your area</p>
    </li>
    <li>
      <span class="icon">📈</span>
      <p>Your profile strength is in the <strong>top 12%</strong> for your industry</p>
    </li>
  </ul>
  <p class="cta-hint">Complete 2 more sections to reach the top 5%</p>
</div>`,
        explanation:
          'Each uniqueness claim is specific and verifiable. The skill combination stat uses genuine intersection data. The profile search count provides concrete evidence of visibility. The CTA gives a path to further distinction.',
        principle:
          'Specific, verifiable uniqueness claims drive engagement without deception',
        metrics: {
          before: '15% profile completion rate with generic prompts',
          after: '41% profile completion rate with uniqueness-driven prompts',
          improvement: '173% increase in profile completion',
        },
      },
    ],

    bad: [
      {
        title: 'Fabricated Exclusivity',
        description:
          'App telling every single user they are in the "top 1%" with no real data',
        code: `<!-- DON'T DO THIS -->
<div class="fake-exclusive">
  <h2>Congratulations! You're in the Top 1%!</h2>
  <p>Your skills are truly exceptional. Very few people
  can match your level of expertise.</p>
  <button>Claim Your VIP Status</button>
  <!-- This message is shown to ALL users regardless of actual performance -->
</div>`,
        explanation:
          'When every user receives the same "top 1%" message, the claim is a lie. Users who compare notes will immediately recognize the manipulation, and trust in all platform messaging collapses.',
        principle:
          'Fabricated uniqueness destroys credibility when exposed',
      },
      {
        title: 'Hollow Uniqueness Flattery',
        description:
          'Vague "you\'re special" messaging with no specific data or substance',
        code: `<!-- DON'T DO THIS -->
<div class="empty-flattery">
  <h2>You're Unlike Anyone Else!</h2>
  <p>Your journey is truly one of a kind.
  Nobody does it quite like you.</p>
  <p>You bring something special to everything you do.</p>
  <button>Continue Being Amazing</button>
</div>`,
        explanation:
          'Generic flattery without any specific, data-backed claims feels hollow and patronizing. Users recognize empty praise and it diminishes trust in the platform\'s ability to provide genuine insights.',
        principle:
          'Unsubstantiated flattery is worse than no message at all',
      },
      {
        title: 'Uniqueness That Discourages Growth',
        description:
          'Telling users they\'re already at the top, removing motivation to improve',
        code: `<!-- DON'T DO THIS -->
<div class="false-ceiling">
  <h2>You've Mastered It All!</h2>
  <div class="stats">
    <span class="perfect">100% Mastery</span>
    <span class="rank">Top 0.1% globally</span>
  </div>
  <p>There's nothing left to learn. You're the best.</p>
  <!-- No growth path, no next steps, no nuance -->
</div>`,
        explanation:
          'Declaring total mastery eliminates growth motivation. It also sets unrealistic expectations that will be shattered when the user encounters new challenges. Effective platforms always show a next horizon.',
        principle:
          'Uniqueness messaging should motivate growth, not declare a false finish line',
      },
    ],

    realWorld: [
      {
        company: 'Spotify',
        product: 'Spotify Wrapped / Taste Profiles',
        description: 'Spotify tells users "Your taste is uniquely yours" and provides detailed stats on listening habits, rare artist discoveries, and genre diversity. Wrapped becomes a viral social phenomenon as users eagerly share what makes their taste "unique."',
        effectiveness: 'very-effective',
        analysis: 'Spotify taps directly into false uniqueness by providing data that confirms what users already want to believe -- that their taste is distinctive. The shareability creates a feedback loop: sharing unique stats signals identity, which drives more engagement.',
      },
      {
        company: 'LinkedIn',
        product: 'Profile Views & Search Appearances',
        description: 'LinkedIn notifies users "You appeared in 326 searches this week" and "Your profile is in the top 8% for your industry." These stats highlight professional distinctiveness and drive profile optimization.',
        effectiveness: 'very-effective',
        analysis: 'By quantifying professional visibility, LinkedIn leverages false uniqueness to drive engagement. Users are motivated to maintain or increase their distinctive status, leading to more content creation and profile updates.',
      },
      {
        company: 'Apple',
        product: 'Think Different Campaign & Product Identity',
        description: 'Apple\'s "Think Different" campaign and product design philosophy positions users as creative nonconformists. Owning Apple products becomes a signal of distinctiveness and elevated taste.',
        effectiveness: 'very-effective',
        analysis: 'Apple exploits false uniqueness at a brand level: millions of users simultaneously believe they are part of a select group of creative thinkers. The premium pricing reinforces the exclusivity illusion.',
      },
      {
        company: 'GitHub',
        product: 'Contribution Graph & Profile Achievements',
        description: 'GitHub\'s contribution graph and achievement badges (Arctic Code Vault Contributor, etc.) highlight rare or distinctive developer contributions, making users feel their open-source involvement is exceptional.',
        effectiveness: 'effective',
        analysis: 'The visual contribution graph creates a unique fingerprint for each developer. Rare achievement badges (like Arctic Code Vault) have genuine scarcity, making the uniqueness claim credible.',
      },
      {
        company: 'Duolingo',
        product: 'Streak & League Rankings',
        description: 'Duolingo shows users their streak length relative to other learners and places them in competitive leagues. "Top 5% of learners this week" messaging affirms learning dedication as a rare trait.',
        effectiveness: 'effective',
        analysis: 'By framing consistent practice as a rare achievement, Duolingo activates false uniqueness to sustain motivation. Users who believe few others match their dedication are more likely to maintain streaks.',
      },
    ],

    abTests: [
      {
        title: 'Personalized Uniqueness Stats vs Generic Encouragement',
        hypothesis:
          'Personalized uniqueness stats will drive higher engagement than generic motivational messaging',
        controlVersion: {
          description:
            'Dashboard showing "Great job! Keep up the good work. You\'re making progress." with no comparative data',
          metrics: {
            conversionRate: '18%',
            timeOnPage: '0:45',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard showing "You\'re in the top 12% of active users this month. Your engagement pattern is shared by only 1 in 8 users." with specific, data-backed uniqueness indicators',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '2:10',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Personalized uniqueness stats nearly doubled engagement. Users spent 189% more time exploring their data and were significantly more likely to share their stats or complete suggested next actions.',
          learnings: [
            'Specific percentile data is far more compelling than generic praise',
            'Users who saw uniqueness stats returned 2.3x more frequently over the next week',
            'The effect was strongest for users who were already moderately engaged',
            'Over-indexing on uniqueness (e.g., "top 0.01%") actually reduced credibility',
          ],
        },
      },
      {
        title: 'Exclusive Beta Access: Merit-Based vs Random Selection',
        hypothesis:
          'Framing beta access as merit-based will increase activation rates',
        controlVersion: {
          description:
            'Beta invitation: "You\'ve been randomly selected to try our new feature. Click here to explore."',
          metrics: {
            conversionRate: '24%',
            clickThroughRate: '31%',
          },
        },
        treatmentVersion: {
          description:
            'Beta invitation: "Based on your usage patterns, you\'re among a select group of power users invited to try our new feature. Your feedback is especially valuable."',
          metrics: {
            conversionRate: '52%',
            clickThroughRate: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Merit-based framing more than doubled activation. Users who believed they were selected for their distinctive usage patterns felt a sense of earned privilege and were also 3x more likely to provide feedback.',
          learnings: [
            'False uniqueness makes users value access they believe was earned over access given randomly',
            'Merit-framed users provided 3x more feedback, feeling their input was uniquely valuable',
            'The effect was consistent across user segments and experience levels',
            'Transparency about selection criteria increased trust without reducing the uniqueness effect',
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
        name: 'Percentile Indicators',
        description:
          '"Top X%" labels, leaderboard positions, or rank badges that highlight user standing',
        howToSpot:
          'Look for numerical rankings, percentile badges, or tier labels (Gold, Platinum, Elite)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Personalized "You" Language',
        description:
          'Messaging that directly addresses the user with phrases like "Your unique...", "Only you...", "Unlike anyone else..."',
        howToSpot:
          'Check headings and notification text for second-person uniqueness claims',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Rarity Badges and Scarcity Labels',
        description:
          'Visual indicators of rare achievements, exclusive access, or limited-group membership',
        howToSpot:
          'Look for badges with rarity tiers, "exclusive" labels, or "early adopter" indicators',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Comparison Statistics',
        description:
          'Data comparing the user favorably against averages, peers, or population benchmarks',
        howToSpot:
          'Check for "X times more than average", "compared to other users", or visual bar charts showing the user ahead',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Identity Labels and Personality Types',
        description:
          'Assigning users a distinctive personality type, archetype, or identity label based on their behavior',
        howToSpot:
          'Look for personality quiz results, user type assignments, or archetype labels ("The Explorer", "The Pioneer")',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Personalized Uniqueness Dashboard',
        description: 'Dedicated section or page highlighting what makes the user distinctive',
        indicators: [
          'Year-in-review or wrapped-style summaries',
          'Profile insight cards with comparative stats',
          'Personalized recommendations framed as taste-matching',
          'Usage pattern summaries emphasizing rarity',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Exclusive Access Framing',
        description: 'Feature access positioned as earned or merit-based rather than broadly available',
        indicators: [
          '"You\'ve been selected" or "Invited based on your..." language',
          'Beta access tied to usage patterns or expertise',
          'VIP or insider programs with qualification criteria',
          'Waitlist positioning that implies selectivity',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Achievement Rarity System',
        description: 'Gamification elements that emphasize how few users achieve specific milestones',
        indicators: [
          'Badges with rarity percentages',
          'Achievement unlock notifications with scarcity data',
          'Leaderboard positions highlighting top-percentile performance',
          'Streak or consistency metrics compared to population averages',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Identity Affirmation Pattern',
        description: 'Reflecting user behavior back as a distinctive identity or personality type',
        indicators: [
          'Personality type assignments based on usage data',
          '"Your style is..." or "You are a..." categorizations',
          'Taste profiles that emphasize individuality',
          'Behavioral summaries framed as character traits',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface tell users they are in a special percentile or tier?',
      'Are uniqueness claims backed by real, verifiable data?',
      'Is the same "exclusive" message shown to all users, or is it genuinely differentiated?',
      'Does the uniqueness messaging encourage growth, or does it create complacency?',
      'Are personalized stats specific and credible, or vague and flattering?',
      'Could users who compare notes discover that the uniqueness claims are fabricated?',
      'Is there cultural sensitivity in how individuality and distinctiveness are framed?',
      'Does the design balance individual recognition with community belonging?',
      'Are rarity indicators based on actual population data or arbitrary thresholds?',
      'Does the uniqueness framing serve user goals or primarily business engagement metrics?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the false uniqueness effect.

Analyze the provided design for false uniqueness effect patterns. Identify:

1. **Uniqueness Claims**: "Top X%", "only you", "unlike anyone else" messaging
2. **Personalized Data**: Stats, graphs, or summaries that highlight individual distinctiveness
3. **Exclusivity Framing**: Beta access, VIP tiers, or invite-only features positioned as merit-based
4. **Identity Labels**: Personality types, archetypes, or categories assigned to users
5. **Achievement Rarity**: Badges, milestones, or accomplishments with scarcity indicators

For each pattern found:
- Identify what claim of uniqueness is being made
- Assess whether the claim is backed by real data or fabricated
- Determine if it motivates growth or creates complacency
- Evaluate cultural appropriateness and inclusivity
- Suggest improvements for authentic, ethical uniqueness affirmation

Consider:
- Are the uniqueness claims verifiable and honest?
- Could users who compare notes discover the claims are universal/fake?
- Does the messaging serve user self-development or just engagement metrics?
- Is there a healthy balance between individual distinction and community belonging?
- Are there accessibility implications for how uniqueness is communicated?

Provide actionable recommendations for ethical, data-backed uniqueness design.`,

    outputSchema: {
      type: 'object',
      properties: {
        uniquenessPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              claim: { type: 'string' },
              dataBackedAssessment: { type: 'string' },
              motivationalImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'claim',
              'dataBackedAssessment',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            authenticityScore: { type: 'number' },
            motivationalBalance: { type: 'number' },
            culturalSensitivity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'authenticityScore',
            'motivationalBalance',
            'culturalSensitivity',
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
        'uniquenessPatterns',
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
        title: 'Identify Genuine Distinctiveness Data',
        description:
          'Determine what real, measurable aspects of user behavior or achievement are actually distinctive',
        example:
          'Analyze usage data to find genuinely rare patterns: skill combinations, exploration depth, consistency streaks',
        tips: [
          'Use actual population percentiles, not arbitrary thresholds',
          'Identify behaviors that genuinely vary across users',
          'Avoid creating "uniqueness" from universal behaviors',
        ],
      },
      {
        step: 2,
        title: 'Craft Specific, Credible Claims',
        description:
          'Create uniqueness messaging grounded in specific, verifiable data points',
        example:
          'Instead of "You\'re special!", show "Your combination of Python + UX Research is shared by only 1 in 200 professionals in your region"',
        tips: [
          'Include the specific behavior or trait being highlighted',
          'Provide the comparison baseline (population, peer group, time period)',
          'Let users drill into the data behind the claim',
        ],
      },
      {
        step: 3,
        title: 'Design the Affirmation Experience',
        description:
          'Create a presentation that makes uniqueness discovery feel rewarding and shareable',
        example:
          'Progressive reveal of uniqueness stats with animations, culminating in a shareable summary card',
        tips: [
          'Use progressive disclosure to build anticipation',
          'Make the summary visually distinctive and share-ready',
          'Include both the stat and why it matters',
        ],
      },
      {
        step: 4,
        title: 'Connect Uniqueness to Growth',
        description:
          'Link the uniqueness insight to a next step, challenge, or growth path',
        example:
          'After showing "Top 5% in engagement", suggest "Users like you also excelled at advanced analytics — try it?"',
        tips: [
          'Always pair uniqueness with a next horizon',
          'Frame growth as deepening distinctiveness, not losing it',
          'Avoid declaring total mastery or a finish line',
        ],
      },
      {
        step: 5,
        title: 'Validate and Iterate',
        description:
          'Test that uniqueness messaging drives positive outcomes without negative side effects',
        example:
          'A/B test uniqueness stats vs generic encouragement; measure engagement, retention, and user satisfaction',
        tips: [
          'Watch for inflated self-assessment or reduced effort',
          'Monitor social comparison dynamics in community features',
          'Gather qualitative feedback on how the messaging feels',
        ],
      },
    ],

    dos: [
      'Use real, verifiable data to back uniqueness claims',
      'Be specific about what makes the user distinctive',
      'Connect uniqueness to actionable growth paths',
      'Create shareable formats that let users signal their identity',
      'Differentiate uniqueness tiers genuinely (not everyone can be top 1%)',
      'Consider cultural context when framing individuality',
      'Balance individual distinction with community belonging',
      'Let users opt out of comparative or competitive messaging',
    ],

    donts: [
      'Don\'t fabricate percentiles or rankings to flatter users',
      'Don\'t give every user the same "exclusive" message',
      'Don\'t use vague flattery without specific data backing',
      'Don\'t declare mastery or completion — always show a next step',
      'Don\'t ignore collectivist cultural values that may not prize individual uniqueness',
      'Don\'t create toxic competition by framing uniqueness as superiority',
      'Don\'t use uniqueness messaging to manipulate users into spending or upgrading',
      'Don\'t highlight uniqueness in areas where accurate self-assessment matters (health, safety)',
    ],

    bestPractices: [
      {
        title: 'Data-Backed Uniqueness',
        description:
          'Ground every uniqueness claim in real population data and transparent methodology',
        rationale:
          'Authentic data sustains credibility; fabricated claims collapse when users compare notes',
        example:
          'Compute actual percentiles from real user data and show the sample size: "Top 5% of 12,847 active users"',
      },
      {
        title: 'Uniqueness as Motivation, Not Destination',
        description:
          'Frame distinctive achievements as stepping stones, not finish lines',
        rationale:
          'Users who believe they\'ve "arrived" disengage; users who see a growth path stay motivated',
        example:
          '"You\'re in the top 10% for this skill — the top 5% also mastered advanced techniques. Ready to level up?"',
      },
      {
        title: 'Shareable Identity Artifacts',
        description:
          'Create visually distinctive, personalized artifacts that users want to share',
        rationale:
          'Sharing uniqueness stats serves dual purposes: user identity expression and organic growth',
        example:
          'Spotify Wrapped-style cards with unique color palettes derived from user data',
      },
      {
        title: 'Cultural Adaptability',
        description:
          'Adapt uniqueness framing for different cultural contexts',
        rationale:
          'Individualism-focused messaging resonates in some cultures but alienates in others',
        example:
          'In collectivist markets, frame as "Your unique contribution to the community" rather than "You\'re better than others"',
      },
      {
        title: 'Honest Comparison Baselines',
        description:
          'Always disclose who the user is being compared against and over what time period',
        rationale:
          'Ambiguous comparisons ("top X%") without context are easy to game and hard to trust',
        example:
          '"Top 8% among designers in your region, based on activity in the last 90 days (n=4,231)"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for uniqueness badges and visual indicators',
        implementation:
          'Include descriptive alt text for rarity badges (e.g., "Deep Diver badge — earned by 3.2% of learners") and ensure screen readers announce achievement unlocks',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to convey rarity or tier',
        implementation:
          'Combine color with labels, icons, and text descriptions for tier indicators (e.g., "Gold tier" label alongside gold coloring)',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure uniqueness data is semantically structured',
        implementation:
          'Use proper headings, lists, and ARIA labels for uniqueness dashboards so all users can navigate and understand the data',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated Uniqueness',
        severity: 'critical',
        explanation:
          'Showing all users the same "top 1%" or "exclusive" message regardless of actual data',
        mitigation:
          'Compute genuine percentiles from real data. If real data is unavailable, use qualitative affirmation instead of quantitative claims.',
      },
      {
        concern: 'Complacency Induction',
        severity: 'high',
        explanation:
          'Telling users they have already mastered something, reducing motivation to improve in areas where growth matters',
        mitigation:
          'Always pair uniqueness recognition with a visible growth path. Frame achievement as a milestone, not a finish line.',
      },
      {
        concern: 'Manufactured Exclusivity',
        severity: 'high',
        explanation:
          'Creating artificial scarcity or exclusivity (e.g., "invite-only" features available to everyone) to exploit the desire for distinctiveness',
        mitigation:
          'Be transparent about selection criteria. If access is broadly available, don\'t frame it as exclusive.',
      },
      {
        concern: 'Toxic Comparison',
        severity: 'medium',
        explanation:
          'Uniqueness messaging that frames success as being better than others, fostering unhealthy competition',
        mitigation:
          'Frame uniqueness as personal distinctiveness, not superiority. Emphasize unique contributions rather than rankings.',
      },
      {
        concern: 'Cultural Insensitivity',
        severity: 'medium',
        explanation:
          'Individualism-heavy messaging that alienates users from collectivist cultural backgrounds',
        mitigation:
          'Offer culturally adapted variants. In collectivist contexts, emphasize unique value brought to the group or community.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Uniqueness Seeking and the False Uniqueness Effect',
        author: 'Suls, J., & Wan, C. K.',
        year: 1987,
        description:
          'Foundational research demonstrating that people underestimate the commonality of their desirable behaviors and abilities',
        type: 'foundational',
      },
      {
        title: 'The False Consensus Effect: An Egocentric Bias in Social Perception and Attribution Processes',
        author: 'Ross, L., Greene, D., & House, P.',
        year: 1977,
        doi: '10.1016/0022-1031(77)90049-X',
        description:
          'Seminal paper on false consensus, the complementary bias to false uniqueness — people overestimate consensus for opinions but underestimate it for abilities',
        type: 'foundational',
      },
      {
        title: 'Differential Contributions of Majority and Minority Influence',
        author: 'Goethals, G. R.',
        year: 1986,
        description:
          'Research on how social comparison processes lead people to view their positive attributes as more distinctive than they are',
        type: 'advanced',
      },
      {
        title: 'A Need for Uniqueness Scale',
        author: 'Snyder, C. R., & Fromkin, H. L.',
        year: 1980,
        description:
          'Developed a measure of individual differences in the need for uniqueness, showing its role in consumer behavior and self-perception',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Uniqueness: The Human Pursuit of Difference',
        author: 'Snyder, C. R., & Fromkin, H. L.',
        year: 1980,
        isbn: '9780306404450',
        description:
          'Comprehensive treatment of uniqueness motivation, including how people construct and maintain a sense of distinctiveness',
        type: 'foundational',
      },
      {
        title: 'The Social Animal',
        author: 'Aronson, Elliot',
        year: 2018,
        isbn: '9781464144189',
        description:
          'Covers false uniqueness within the broader context of social cognition, self-perception, and social comparison',
        type: 'foundational',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on scarcity and exclusivity relates directly to how false uniqueness is leveraged in marketing and product design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Psychology Behind Spotify Wrapped',
        author: 'UX Collective',
        url: 'https://uxdesign.cc/the-psychology-behind-spotify-wrapped',
        description:
          'Analysis of how Spotify Wrapped leverages false uniqueness, identity signaling, and social sharing',
        type: 'practical',
      },
      {
        title: 'Designing for the Need for Uniqueness',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/personalization-ux/',
        description:
          'Practical guide to personalization design that respects and leverages the need for distinctiveness',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'False Uniqueness and False Consensus Effects',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/test-prep/mcat/processing-the-environment/social-perception-and-behavior/v/false-uniqueness-effect',
        description:
          'Clear explanation of both false uniqueness and false consensus effects with examples',
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
      'social-proof', // "Join 10,000 others" + "but you're in the top 5%" work together
      'scarcity-bias', // Exclusive access feels more valuable when framed as rare
      'endowment-effect', // Users value their unique achievements more once earned
      'ikea-effect', // Self-built uniqueness (customization) increases perceived value
    ],

    conflicts: [
      'false-consensus-effect', // Opposite direction: overestimating opinion agreement
      'bandwagon-effect', // "Everyone is doing it" conflicts with "you're unique"
    ],

    confusedWith: [
      'false-consensus-effect', // Related but opposite: consensus for opinions, uniqueness for abilities
      'illusory-superiority', // Broader "better than average" effect vs specifically underestimating trait commonality
      'spotlight-effect', // Overestimating how much others notice us, vs underestimating how many share our traits
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'uniqueness-seeking',
        'distinctiveness-motivation',
      ],
    },
  },
};
