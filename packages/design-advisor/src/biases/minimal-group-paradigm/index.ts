/**
 * MINIMAL GROUP PARADIGM
 *
 * Even arbitrary, trivial group distinctions lead to ingroup favoritism
 * and outgroup discrimination.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const minimalGroupParadigm: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'minimal-group-paradigm',
    name: 'Minimal Group Paradigm',
    aliases: ['Minimal Group Effect', 'Ingroup Bias', 'Arbitrary Group Favoritism'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'group-identity',
      'ingroup-bias',
      'social-categorization',
      'team-dynamics',
      'belonging',
      'tribalism',
      'community',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'Even arbitrary, trivial group distinctions lead to ingroup favoritism and outgroup discrimination.',

    detailed: `The Minimal Group Paradigm demonstrates that merely categorizing people into groups — even on completely arbitrary or meaningless criteria — is sufficient to trigger ingroup favoritism and outgroup discrimination. People do not need shared history, personal relationships, or competing interests to prefer "their" group. The mere act of categorization is enough.

In Henri Tajfel's foundational experiments, participants were assigned to groups based on trivial criteria like preference for paintings by Klee vs Kandinsky, or even by a coin flip. Despite knowing the assignment was meaningless, participants consistently allocated more resources to ingroup members and discriminated against outgroup members.

In product design, this bias has profound implications for any feature involving teams, cohorts, badges, labels, or group assignments. Designers can harness group identity to increase engagement and belonging, but must be cautious about fostering unhealthy rivalry, exclusion, or toxic tribalism.`,

    psychologyBasis: {
      discoveredBy: 'Henri Tajfel',
      year: 1970,
      theory: 'Social Identity Theory',
      mechanism: `The brain automatically categorizes people into "us" vs "them" and derives self-esteem from group membership. This happens because:

1. **Social Categorization**: The cognitive system spontaneously sorts people into groups, even on trivial dimensions
2. **Social Identification**: Once categorized, individuals internalize group membership as part of their self-concept
3. **Social Comparison**: People compare their ingroup favorably against outgroups to maintain positive self-esteem
4. **Self-Esteem Maintenance**: Favoring the ingroup and devaluing the outgroup enhances personal identity and self-worth
5. **Automatic Activation**: This process is largely unconscious — group favoritism emerges without deliberate intent or awareness`,
    },

    realWorldExample: `In Tajfel's 1970 experiment, teenage boys were shown paintings by Klee and Kandinsky and told they were grouped by artistic preference (though assignment was actually random). When asked to allocate money between anonymous ingroup and outgroup members, boys consistently gave more to their own "group" — even sacrificing total earnings to maintain a relative advantage over the outgroup. A completely meaningless label created measurable discrimination within minutes.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Minimal Group Paradigm affects how users behave whenever group distinctions are introduced in an interface. Even superficial categorization — team colors, badge tiers, cohort labels — can trigger powerful ingroup loyalty and outgroup bias. Designers can leverage this to:

- Increase engagement through team-based features and group identity
- Foster belonging and retention via cohort or community membership
- Drive healthy competition through team challenges and leaderboards
- Build brand loyalty by creating exclusive groups or tiers
- Strengthen onboarding by assigning new users to welcoming cohorts`,

    whenToUse: [
      {
        title: 'Team-Based Gamification',
        scenario:
          'When motivating users through collaborative competition',
        example:
          'Assign users to color-coded teams during a fitness challenge — "Team Blue" vs "Team Orange" — to boost participation through group identity',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Cohort-Based Onboarding',
        scenario: 'When onboarding new users and building early engagement',
        example:
          'Group new users into named onboarding cohorts ("Spring 2026 Cohort") so they bond with peers and feel belonging from day one',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Community Building',
        scenario: 'When fostering long-term user communities',
        example:
          'Create workspace teams, guilds, or chapters that give members a shared identity and purpose',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Badge and Tier Systems',
        scenario: 'When creating loyalty or achievement frameworks',
        example:
          'Award membership badges (Gold, Silver, Bronze) that create aspirational group identities users want to maintain',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'A/B Group Identity',
        scenario: 'When running beta programs or feature rollouts',
        example:
          'Label beta testers as "Pioneers" or "Early Access" — the group label itself increases engagement and feedback quality',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Divisive or Exclusionary Contexts',
        reason:
          'Group distinctions can amplify discrimination based on real-world identities',
        consequence:
          'Users from marginalized groups may face compounded exclusion or hostility',
        alternative:
          'Use inclusive, opt-in grouping that emphasizes shared goals rather than competition between groups',
      },
      {
        title: 'High-Stakes Collaboration',
        reason:
          'Artificial group boundaries can undermine cross-team collaboration',
        consequence:
          'Teams hoard information, refuse to help outgroup members, or sabotage shared objectives',
        alternative:
          'Use rotating or overlapping group structures that prevent rigid us-vs-them dynamics',
      },
      {
        title: 'Sensitive or Personal Topics',
        reason:
          'Group identity can suppress individual expression in contexts requiring personal vulnerability',
        consequence:
          'Users conform to perceived group norms rather than sharing authentic perspectives',
        alternative:
          'Provide individual-first interactions with optional group sharing',
      },
      {
        title: 'Permanent or Rigid Assignments',
        reason:
          'Fixed group assignment can create entrenched factions and resentment',
        consequence:
          'Long-term tribalism, toxic rivalry, and user churn from those on the "losing" side',
        alternative:
          'Rotate group assignments, allow transfers, or use time-limited team structures',
      },
    ],

    commonMistakes: [
      {
        title: 'Creating Toxic Rivalry',
        description:
          'Designing group competition that rewards sabotage or outgroup hostility',
        why: 'The minimal group effect amplifies competition — even mild framing can escalate',
        fix: 'Reward ingroup cooperation, not outgroup defeat. Use metrics that measure group achievement, not relative dominance',
      },
      {
        title: 'Permanent Losing Groups',
        description:
          'Allowing some groups to consistently lose, causing disengagement',
        why: 'Being in a chronically losing group erodes self-esteem and triggers churn',
        fix: 'Balance group compositions, rotate memberships, or use handicapping systems to maintain competitive equity',
      },
      {
        title: 'Ignoring Outgroup Effects',
        description:
          'Focusing only on ingroup bonding without monitoring outgroup discrimination',
        why: 'Ingroup favoritism automatically produces outgroup devaluation',
        fix: 'Measure cross-group interactions, monitor for hostility, and create structured positive inter-group contact',
      },
      {
        title: 'Overly Meaningful Labels',
        description:
          'Using group labels that map onto real-world stereotypes or hierarchies',
        why: 'Labels like "Leaders" vs "Followers" or culturally loaded terms reinforce harmful power dynamics',
        fix: 'Use neutral, arbitrary labels (colors, animals, abstract names) that carry no implicit hierarchy',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how group boundaries are visually communicated',
        examples: [
          'Separate columns or sections for different teams reinforce group identity',
          'Shared spaces between groups can encourage cross-group interaction',
          'Leaderboard positioning makes group status salient',
          'Group-specific areas or "home bases" strengthen belonging',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment signals group membership and status',
        examples: [
          'Group names in bold create stronger identity attachment',
          'Distinct type styles per group reinforce differentiation',
          'Member count and activity stats strengthen group salience',
          'Inclusive language in headers reduces outgroup hostility',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color is the most powerful tool for creating instant group identity',
        examples: [
          'Team colors create immediate visual ingroup markers',
          'Color-coded avatars, borders, and badges signal membership',
          'Consistent color palettes per group strengthen identification',
          'Neutral or shared colors can reduce intergroup tension',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive features shape how groups form, compete, and collaborate',
        examples: [
          'Team chat channels create ingroup communication spaces',
          'Group challenges and shared goals activate collective identity',
          'Voting or allocation mechanics expose ingroup favoritism',
          'Cross-group collaboration features can bridge divides',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether groups compete or cooperate',
        examples: [
          '"Your team" language activates group identity and belonging',
          'Comparative messaging ("Team A vs Team B") intensifies rivalry',
          'Shared mission statements promote cooperation over competition',
          'Group achievement narratives reinforce collective identity',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Group identity features must be perceivable by all users',
        examples: [
          'Color-coded groups need text or icon alternatives for color-blind users',
          'Screen readers must convey group membership and status clearly',
          'Group-based navigation must be keyboard accessible',
          'Badge and tier systems need non-visual equivalents',
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
        title: 'Team-Based Fitness Challenge',
        description:
          'Health app assigning users to color-coded teams for a monthly step challenge',
        code: `<div class="team-challenge">
  <h3>March Step Challenge</h3>
  <div class="your-team">
    <div class="team-badge team-blue">
      <span class="team-icon">🔵</span>
      <span class="team-name">Team Sapphire</span>
    </div>
    <p class="member-count">247 members</p>
    <div class="team-progress">
      <div class="progress-bar blue" style="width: 72%"></div>
      <span class="steps">1,847,320 steps</span>
    </div>
  </div>
  <div class="leaderboard">
    <div class="team-row current">
      <span class="rank">2nd</span>
      <span class="name">Team Sapphire</span>
      <span class="steps">1,847,320</span>
    </div>
    <div class="team-row">
      <span class="rank">1st</span>
      <span class="name">Team Ember</span>
      <span class="steps">1,923,105</span>
    </div>
  </div>
  <p class="encouragement">Your team is only 75,785 steps behind! Keep going!</p>
</div>`,
        explanation:
          'Arbitrary color-coded team assignment creates instant group identity. Users feel motivated not just for personal fitness but for their team. The gap-closing message activates ingroup cooperation.',
        principle:
          'Arbitrary group labels create real belonging and cooperative motivation',
        metrics: {
          before: '34% completed the solo challenge',
          after: '61% completed the team-based challenge',
          improvement: '79% increase in challenge completion with team identity',
        },
      },
      {
        title: 'Cohort-Based Onboarding',
        description:
          'Learning platform grouping new users into named onboarding cohorts',
        code: `<div class="cohort-welcome">
  <div class="cohort-badge">
    <span class="cohort-icon">🌱</span>
    <h3>Spring 2026 Cohort</h3>
    <p class="tagline">You're one of 48 learners starting together</p>
  </div>
  <div class="cohort-feed">
    <h4>Your Cohort's Progress</h4>
    <div class="milestone">
      <span class="avatar">MK</span>
      <p><strong>Maria K.</strong> completed Module 2</p>
    </div>
    <div class="milestone">
      <span class="avatar">JR</span>
      <p><strong>James R.</strong> shared their first project</p>
    </div>
  </div>
  <div class="cohort-stats">
    <div class="stat">
      <span class="number">73%</span>
      <span class="label">Cohort completion rate</span>
    </div>
    <div class="stat">
      <span class="number">12</span>
      <span class="label">Active discussions</span>
    </div>
  </div>
</div>`,
        explanation:
          'Naming the cohort and showing peer activity creates group identity that drives retention. Users feel accountable to their cohort peers, not just themselves.',
        principle:
          'Cohort identity transforms isolated learning into shared journey',
        metrics: {
          before: '28% course completion for solo learners',
          after: '52% course completion for cohort-based learners',
          improvement: '86% increase in completion through cohort identity',
        },
      },
      {
        title: 'Inclusive Badge System',
        description:
          'Community platform using achievement badges without rigid hierarchy',
        code: `<div class="member-badges">
  <h4>Your Contributions</h4>
  <div class="badge-grid">
    <div class="badge earned">
      <span class="badge-icon">💡</span>
      <span class="badge-name">Idea Starter</span>
      <span class="badge-desc">Started 5 discussions</span>
    </div>
    <div class="badge earned">
      <span class="badge-icon">🤝</span>
      <span class="badge-name">Collaborator</span>
      <span class="badge-desc">Helped 10 members</span>
    </div>
    <div class="badge available">
      <span class="badge-icon">🔍</span>
      <span class="badge-name">Researcher</span>
      <span class="badge-desc">Share 3 resources</span>
    </div>
  </div>
  <p class="identity-note">You share the Collaborator badge with 342 members</p>
</div>`,
        explanation:
          'Badges create micro-group identities (all "Collaborators" share a bond) without rigid hierarchy. Multiple badge types mean multiple group memberships, preventing a single us-vs-them divide.',
        principle:
          'Overlapping group memberships reduce intergroup conflict while maintaining belonging',
      },
    ],

    bad: [
      {
        title: 'Toxic Rivalry Leaderboard',
        description:
          'Gaming platform pitting permanent teams against each other with hostile framing',
        code: `<!-- DON'T DO THIS -->
<div class="faction-war">
  <h2>FACTION WAR: Crush the Enemy!</h2>
  <div class="faction red">
    <h3>Blood Legion</h3>
    <p class="kills">Enemies Destroyed: 12,847</p>
    <p class="taunt">The weak shall fall!</p>
  </div>
  <div class="faction blue">
    <h3>Shadow Order</h3>
    <p class="kills">Enemies Destroyed: 11,932</p>
    <p class="taunt">Show no mercy!</p>
  </div>
  <p class="locked">Your faction is permanent. Choose wisely.</p>
</div>`,
        explanation:
          'Permanent faction assignment with hostile language ("crush", "enemy", "no mercy") amplifies the worst aspects of minimal group bias. Users internalize aggression toward the outgroup, creating toxic community dynamics.',
        principle:
          'Never combine permanent group assignment with hostile competitive framing',
      },
      {
        title: 'Hierarchical Group Labels',
        description:
          'SaaS platform using group names that imply superiority',
        code: `<!-- DON'T DO THIS -->
<div class="user-tiers">
  <div class="tier elite">
    <h3>Elite Leaders</h3>
    <span class="count">Top 1%</span>
    <p>Exclusive access, priority support</p>
  </div>
  <div class="tier standard">
    <h3>Regular Users</h3>
    <span class="count">Everyone else</span>
    <p>Standard features only</p>
  </div>
</div>`,
        explanation:
          'Labels like "Elite Leaders" vs "Regular Users" create explicit hierarchy. The "everyone else" framing makes the majority feel devalued. This triggers resentment rather than aspiration.',
        principle:
          'Avoid group labels that explicitly demean or diminish lower-tier members',
      },
      {
        title: 'Exclusionary Beta Group',
        description:
          'Product launch that alienates non-beta users',
        code: `<!-- DON'T DO THIS -->
<div class="beta-announcement">
  <h2>You weren't selected for Beta access</h2>
  <p>Our hand-picked Beta Insiders are already using
  the new features you've been waiting for.</p>
  <div class="beta-feed">
    <p>"This is amazing!" - Beta Insider</p>
    <p>"Can't believe everyone else has to wait!" - Beta Insider</p>
  </div>
  <p>Maybe next time. Stay on the waitlist.</p>
</div>`,
        explanation:
          'Showing excluded users what they are missing while emphasizing the exclusive ingroup creates resentment and churn. The dismissive tone ("maybe next time") compounds the outgroup devaluation.',
        principle:
          'Exclusion messaging should empathize with non-members, not flaunt ingroup privilege',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Workspace Teams and Channels',
        description:
          'Slack organizes users into workspaces and channels that create layered group identities. Users feel strong belonging to their workspace (company) and channels (teams), driving daily engagement and loyalty to the platform.',
        effectiveness: 'very-effective',
        analysis:
          'Workspace identity is so strong that users resist switching to competitors. Channel-level groups create micro-identities that layer on top of workspace identity, strengthening overall platform attachment.',
      },
      {
        company: 'GitHub',
        product: 'Organizations and Teams',
        description:
          'GitHub organizations create developer group identity with shared repos, team pages, and contribution graphs. Organization membership badges on profiles signal belonging.',
        effectiveness: 'very-effective',
        analysis:
          'Organization membership becomes part of developer professional identity. The public display of org badges on profiles leverages minimal group paradigm to create platform lock-in through social identity.',
      },
      {
        company: 'Duolingo',
        product: 'League System',
        description:
          'Duolingo places users in weekly leagues (Bronze, Silver, Gold, etc.) where they compete with ~30 strangers. Users feel attachment to their league tier even though groups are arbitrary and temporary.',
        effectiveness: 'effective',
        analysis:
          'Temporary, rotating group assignment prevents permanent rivalry while still activating group identity. League tier labels create aspiration. Weekly resets maintain freshness and prevent toxic entrenchment.',
      },
      {
        company: 'Peloton',
        product: 'Team-Based Challenges',
        description:
          'Peloton assigns users to color-coded teams during seasonal challenges. Users ride for their team, with collective leaderboards tracking group performance.',
        effectiveness: 'very-effective',
        analysis:
          'Arbitrary color team assignment creates remarkably strong identity. Users change their profile colors, add team hashtags, and rally teammates — all from a random assignment. Classic minimal group paradigm in action.',
      },
      {
        company: 'Hogwarts (Cultural Reference)',
        product: 'House System',
        description:
          'The Hogwarts house system (Gryffindor, Slytherin, etc.) is perhaps the most famous example. Pottermore\'s sorting quiz has been taken hundreds of millions of times, with people strongly identifying with their assigned house.',
        effectiveness: 'very-effective',
        analysis:
          'Demonstrates how arbitrary group assignment can create lifelong identity attachment. People buy house merchandise, argue about house traits, and feel genuine pride — all from a fictional sorting algorithm.',
      },
    ],

    abTests: [
      {
        title: 'Solo vs Team-Based Challenge Completion',
        hypothesis:
          'Assigning users to arbitrary teams will increase challenge completion rates',
        controlVersion: {
          description:
            'Individual fitness challenge: "Complete 10,000 steps daily for 30 days"',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '2:10',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Same challenge but users assigned to random color-coded teams of ~50, with team leaderboard and chat',
          metrics: {
            conversionRate: '61%',
            timeOnPage: '4:45',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Arbitrary team assignment nearly doubled completion rates. Users reported feeling "accountable to my team" despite never meeting teammates. Team chat usage was high, with users encouraging each other and coordinating activity.',
          learnings: [
            'Arbitrary group assignment creates real social bonds and accountability',
            'Team identity increases engagement even without prior relationships',
            'Group chat amplified the effect by making team membership salient daily',
            'Users who joined mid-challenge adopted team identity within 24 hours',
          ],
        },
      },
      {
        title: 'Badge Groups: Shared Identity vs Individual Achievement',
        hypothesis:
          'Showing badge holders as a group will increase badge pursuit behavior',
        controlVersion: {
          description:
            'Individual achievement badge: "You earned the Contributor badge" (personal notification only)',
          metrics: {
            conversionRate: '18%',
            clickThroughRate: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Group identity badge: "You\'re now a Contributor — join 1,247 other Contributors in the Contributor community"',
          metrics: {
            conversionRate: '31%',
            clickThroughRate: '47%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Framing badges as group membership rather than individual achievement increased pursuit by 72%. Users engaged more with badge-related features and reported higher satisfaction with the badge system.',
          learnings: [
            'Group identity framing is more motivating than individual achievement framing',
            'Showing the number of group members validates the identity and increases desirability',
            'Users spent more time in badge-specific community spaces',
            'The effect was strongest for users who had fewer existing social connections on the platform',
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
        name: 'Team Color Coding',
        description:
          'Distinct colors assigned to different user groups, teams, or cohorts',
        howToSpot:
          'Look for color-coded avatars, borders, backgrounds, or badges that differentiate groups',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Group Labels and Names',
        description:
          'Named teams, cohorts, tiers, or factions that categorize users',
        howToSpot:
          'Look for team names, tier labels, cohort identifiers, or faction branding in the interface',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Membership Badges',
        description:
          'Visual indicators of group membership displayed on profiles or content',
        howToSpot:
          'Check for badge icons, tier indicators, or group logos on user profiles and posts',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Group Leaderboards',
        description:
          'Rankings that compare groups rather than individuals',
        howToSpot:
          'Look for team scores, group rankings, or collective progress bars',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Us vs Them Language',
        description:
          'Content that emphasizes group boundaries through comparative or competitive language',
        howToSpot:
          'Check for phrases like "your team", "beat them", "our group", or competitive framing between groups',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Arbitrary Assignment Pattern',
        description: 'Users assigned to groups based on trivial or random criteria',
        indicators: [
          'Random team assignment during onboarding',
          'Color or animal group assignment without meaningful basis',
          'Cohort grouping by sign-up date or arbitrary cutoff',
          'Quiz-based sorting into personality or style groups',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Group Competition Pattern',
        description: 'Groups pitted against each other in challenges, rankings, or resource allocation',
        indicators: [
          'Team leaderboards and comparative scores',
          'Group challenges with winners and losers',
          'Inter-group competitions with rewards',
          'Comparative messaging between groups',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Identity Marker Pattern',
        description: 'Visual or textual markers that signal group membership throughout the interface',
        indicators: [
          'Color-coded profile elements',
          'Group badges or icons on user content',
          'Team-specific UI themes or customization',
          'Group name displayed alongside username',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Exclusive Access Pattern',
        description: 'Features, content, or spaces restricted to specific groups',
        indicators: [
          'Group-only channels or forums',
          'Tier-gated features or content',
          'Beta or early access for selected groups',
          'VIP or exclusive community areas',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are users categorized into groups, teams, or cohorts?',
      'How are group assignments determined — are they arbitrary or meaningful?',
      'Are group boundaries visually reinforced through color, badges, or labels?',
      'Is there competition or comparison between groups?',
      'Could group dynamics create exclusion or hostility toward outgroup members?',
      'Are group assignments permanent or rotational?',
      'Do group labels imply hierarchy or superiority?',
      'Is cross-group collaboration encouraged or discouraged by the design?',
      'How might users in a chronically "losing" group feel?',
      'Are there mechanisms to prevent toxic tribalism from emerging?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the minimal group paradigm and social identity theory.

Analyze the provided design for minimal group paradigm patterns. Identify:

1. **Group Categorization**: How users are sorted into groups, teams, or cohorts
2. **Identity Markers**: Visual or textual signals of group membership (colors, badges, labels)
3. **Intergroup Dynamics**: Competition, comparison, or collaboration between groups
4. **Ingroup Favoritism**: Features that may privilege ingroup members over outgroup members
5. **Exclusion Risk**: How non-members or outgroup members might feel

For each pattern found:
- Identify how group identity is created and reinforced
- Assess whether the group distinction is arbitrary or meaningful
- Determine if intergroup dynamics are healthy or potentially toxic
- Evaluate whether outgroup members are devalued or excluded
- Suggest improvements for inclusive, constructive group design

Consider:
- Could arbitrary grouping create unintended discrimination?
- Are group labels neutral or do they imply hierarchy?
- Is there a risk of permanent "losing" groups causing disengagement?
- Do cross-group collaboration mechanisms exist?
- Are there accessibility issues with how group identity is communicated?

Provide actionable recommendations for ethical, inclusive group design.`,

    outputSchema: {
      type: 'object',
      properties: {
        groupPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              groupMechanism: { type: 'string' },
              identityStrength: { type: 'string' },
              intergroupDynamic: { type: 'string' },
              exclusionRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'groupMechanism',
              'identityStrength',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            belongingScore: { type: 'number' },
            exclusionRisk: { type: 'number' },
            rivalryIntensity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'belongingScore',
            'exclusionRisk',
            'rivalryIntensity',
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
        'groupPatterns',
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
        title: 'Define the Group Purpose',
        description:
          'Determine why you are creating groups and what behavioral outcome you want',
        example:
          'Goal: Increase course completion by 50% through cohort-based social accountability',
        tips: [
          'Be explicit about what group identity should achieve',
          'Choose between competition, cooperation, or blended dynamics',
          'Consider whether groups serve users or only business metrics',
        ],
      },
      {
        step: 2,
        title: 'Design Group Assignment',
        description:
          'Choose how users are categorized — random, self-selected, or criteria-based',
        example:
          'Randomly assign users to one of four color-coded teams during onboarding',
        tips: [
          'Random assignment prevents self-selection bias',
          'Self-selection gives users agency but may create unbalanced groups',
          'Avoid criteria that map onto real-world demographics or hierarchies',
        ],
      },
      {
        step: 3,
        title: 'Create Identity Markers',
        description:
          'Design visual and textual signals that make group membership salient',
        example:
          'Assign team colors, names, and badges that appear on profiles and in activity feeds',
        tips: [
          'Use neutral, non-hierarchical names (colors, animals, abstract concepts)',
          'Make identity markers visible but not overwhelming',
          'Ensure markers are accessible (not color-only)',
        ],
      },
      {
        step: 4,
        title: 'Build Group Interaction Spaces',
        description:
          'Provide channels for ingroup bonding and cross-group collaboration',
        example:
          'Create team chat channels and a shared "all teams" forum',
        tips: [
          'Ingroup spaces strengthen belonging',
          'Cross-group spaces prevent isolation and hostility',
          'Moderation is essential in competitive contexts',
        ],
      },
      {
        step: 5,
        title: 'Monitor and Balance',
        description:
          'Track group dynamics and intervene when rivalry becomes toxic or groups become unbalanced',
        example:
          'Dashboard showing inter-group sentiment, cross-group interactions, and churn by group',
        tips: [
          'Set alerts for declining cross-group interaction',
          'Rotate or rebalance groups if one consistently underperforms',
          'Survey users about group experience regularly',
        ],
      },
    ],

    dos: [
      'Use neutral, non-hierarchical group labels',
      'Rotate group assignments periodically to prevent entrenchment',
      'Provide both ingroup spaces and cross-group collaboration opportunities',
      'Reward group cooperation, not just competitive victory',
      'Balance group sizes and compositions for fairness',
      'Make group membership visible but not the only identity dimension',
      'Create multiple overlapping group memberships to reduce rigid tribalism',
      'Monitor for toxic intergroup dynamics and intervene early',
    ],

    donts: [
      'Don\'t use group labels that imply hierarchy or superiority',
      'Don\'t create permanent, rigid group assignments without opt-out',
      'Don\'t reward groups for sabotaging or diminishing outgroups',
      'Don\'t show excluded users what they\'re missing in a dismissive way',
      'Don\'t allow chronically losing groups to persist without rebalancing',
      'Don\'t map group assignments onto real-world demographic categories',
      'Don\'t design competitive framing so intense that it breeds hostility',
      'Don\'t ignore the experience of users who don\'t want group affiliation',
    ],

    bestPractices: [
      {
        title: 'Use Overlapping Group Memberships',
        description:
          'Assign users to multiple groups across different dimensions (team, cohort, interest)',
        rationale:
          'Multiple group memberships prevent any single us-vs-them divide from dominating',
        example:
          'User is in Team Blue for challenges, Spring 2026 Cohort for onboarding, and Photography Circle for interests',
      },
      {
        title: 'Rotate Group Assignments',
        description:
          'Periodically shuffle group compositions to prevent rigid factions',
        rationale:
          'Rotation maintains the positive effects of group identity while preventing entrenchment and toxic rivalry',
        example:
          'Weekly league resets in Duolingo keep competition fresh without permanent losers',
      },
      {
        title: 'Reward Cooperation Over Domination',
        description:
          'Design reward structures that incentivize helping teammates, not destroying opponents',
        rationale:
          'Cooperative framing harnesses ingroup motivation without amplifying outgroup hostility',
        example:
          'Score teams on total steps walked, not on "beating" the other team',
      },
      {
        title: 'Design Inclusive Outgroup Experiences',
        description:
          'Ensure users outside a group still feel valued and included',
        rationale:
          'Exclusion messaging can drive churn faster than inclusion messaging drives engagement',
        example:
          'Non-beta users see "You\'ll get access soon — here\'s what to look forward to" rather than "You weren\'t selected"',
      },
      {
        title: 'Provide Opt-Out Without Penalty',
        description:
          'Allow users to leave or not join groups without losing access to features',
        rationale:
          'Forced group membership feels coercive and alienates individualistic users',
        example:
          'Group challenges exist alongside individual tracks with equivalent rewards',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to signal group membership',
        implementation:
          'Combine team colors with text labels, icons, or patterns so color-blind users can identify their group',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Group membership must be conveyed semantically',
        implementation:
          'Use ARIA labels and semantic HTML to convey group membership, status, and leaderboard position to assistive technologies',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Group sections need clear headings',
        implementation:
          'Label group areas, leaderboards, and team spaces with descriptive headings accessible to screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Group identity colors must meet contrast requirements',
        implementation:
          'Team colors used in text or on backgrounds must maintain 4.5:1 contrast ratio for readability',
      },
    ],

    ethics: [
      {
        concern: 'Toxic Tribalism',
        severity: 'critical',
        explanation:
          'Group features can escalate into bullying, harassment, or coordinated hostility toward outgroups',
        mitigation:
          'Monitor inter-group interactions, implement moderation, and use cooperative rather than hostile competitive framing',
      },
      {
        concern: 'Exclusion and Marginalization',
        severity: 'high',
        explanation:
          'Users outside exclusive groups may feel devalued, especially if exclusion maps onto real-world inequities',
        mitigation:
          'Ensure group assignment is fair and random, provide inclusive messaging for non-members, and avoid criteria that correlate with demographics',
      },
      {
        concern: 'Manufactured Loyalty',
        severity: 'medium',
        explanation:
          'Using arbitrary group identity to create platform lock-in through social bonds rather than product value',
        mitigation:
          'Ensure group features genuinely enhance user experience, not just switching costs. Let group benefits complement product value.',
      },
      {
        concern: 'Compulsory Group Identity',
        severity: 'high',
        explanation:
          'Forcing users into group assignments without consent or opt-out violates user autonomy',
        mitigation:
          'Make group participation optional, provide individual alternatives, and allow users to leave groups without penalty',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Experiments in Intergroup Discrimination',
        author: 'Tajfel, H.',
        year: 1970,
        doi: '10.1038/scientificamerican1170-96',
        description:
          'The foundational paper introducing the minimal group paradigm, demonstrating ingroup favoritism from arbitrary categorization',
        type: 'foundational',
      },
      {
        title: 'Social Categorization and Intergroup Behaviour',
        author: 'Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C.',
        year: 1971,
        doi: '10.1002/ejsp.2420010202',
        description:
          'The full experimental series establishing that trivial group distinctions produce systematic ingroup favoritism and outgroup discrimination',
        type: 'foundational',
      },
      {
        title: 'An Integrative Theory of Intergroup Conflict',
        author: 'Tajfel, H., & Turner, J. C.',
        year: 1979,
        description:
          'Introduces Social Identity Theory, the theoretical framework explaining why minimal groups produce discrimination',
        type: 'advanced',
      },
      {
        title: 'Self-Categorization Theory',
        author: 'Turner, J. C., Hogg, M. A., Oakes, P. J., Reicher, S. D., & Wetherell, M. S.',
        year: 1987,
        description:
          'Extends Social Identity Theory to explain how self-categorization into groups shapes cognition and behavior',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Human Groups and Social Categories',
        author: 'Tajfel, Henri',
        year: 1981,
        isbn: '9780521280730',
        description:
          'Tajfel\'s comprehensive account of social categorization, including the minimal group paradigm experiments',
        type: 'foundational',
      },
      {
        title: 'Social Identity and Intergroup Relations',
        author: 'Tajfel, Henri (Ed.)',
        year: 1982,
        isbn: '9780521153652',
        description:
          'Collection of key papers on social identity theory and its implications for intergroup behavior',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Covers how group identity and social investment create product engagement loops',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Minimal Group Paradigm and its Minimal Psychology',
        author: 'Hornsey, Matthew J.',
        url: 'https://doi.org/10.1027/1864-9335/a000127',
        description:
          'Modern review of the minimal group paradigm and its implications for understanding group behavior',
        type: 'advanced',
      },
      {
        title: 'Building Online Communities: Lessons from Social Psychology',
        author: 'Kraut, R. E., & Resnick, P.',
        url: 'https://mitpress.mit.edu/9780262016575/',
        description:
          'Practical guide to applying group psychology research to online community design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Social Identity Theory - Tajfel and Turner',
        author: 'Sprouts Learning',
        url: 'https://www.youtube.com/watch?v=lF5gIlnGGNI',
        description:
          'Animated explanation of Social Identity Theory and the minimal group paradigm experiments',
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
      'social-proof',       // Group membership amplifies social proof signals
      'bandwagon-effect',   // People join groups they see others joining
      'commitment-bias',    // Group identity strengthens commitment to platform
      'loss-aversion',      // Fear of losing group status drives retention
    ],

    conflicts: [
      'individuation',      // Group identity can suppress individual expression
      'reactance',          // Forced group assignment can trigger psychological resistance
    ],

    confusedWith: [
      'ingroup-bias',       // Minimal group is the mechanism; ingroup bias is the outcome
      'tribalism',          // Tribalism implies deeper cultural roots; minimal group is about arbitrary assignment
      'social-identity',    // Social identity is the broader theory; minimal group is the paradigm demonstrating it
    ],

    hierarchy: {
      parent: 'social-identity-theory',
      children: [
        'ingroup-favoritism',
        'outgroup-derogation',
        'group-polarization',
      ],
    },
  },
};
