/**
 * IN GROUP BIAS
 *
 * We favor our own group over others
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const inGroupBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'in-group-bias',
    name: 'In Group Bias',
    aliases: ['In-Group Favoritism', 'In-Group/Out-Group Bias', 'Intergroup Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'community',
      'belonging',
      'group-identity',
      'social-dynamics',
      'exclusion',
      'membership',
      'tribalism',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We favor our own group over others',

    detailed: `In-group bias is the tendency to give preferential treatment to people who belong to the same group as oneself, while being indifferent or hostile toward those in out-groups. This bias operates on any dimension of group membership: nationality, team affiliation, subscription tier, platform ecosystem, or even arbitrary labels assigned in experiments.

In product design, in-group bias profoundly shapes how users engage with community features, collaborative tools, membership programs, and social platforms. Users feel stronger loyalty, trust, and satisfaction when they perceive themselves as part of an "in-group" within a product. Conversely, designs that create rigid in-group/out-group divides can alienate new users, reinforce elitism, and damage long-term growth.

Designers must balance the power of group identity to foster belonging and engagement against the risk of exclusion, gatekeeping, and toxic tribalism. The goal is to build communities that feel welcoming and meaningful without creating hostile boundaries.`,

    psychologyBasis: {
      discoveredBy: 'Henri Tajfel',
      year: 1970,
      theory: 'Social Identity Theory',
      mechanism: `The brain categorizes people into "us" (in-group) and "them" (out-group) automatically and rapidly. This happens because:

1. **Social Categorization**: We instinctively sort people into groups based on shared traits, labels, or affiliations, even minimal or arbitrary ones
2. **Social Identification**: We derive part of our self-esteem from the groups we belong to, motivating us to view our groups favorably
3. **Social Comparison**: We evaluate our group relative to out-groups, favoring our own to maintain positive self-concept
4. **Minimal Group Paradigm**: Tajfel's experiments showed that even random, meaningless group assignments (e.g., "over-estimators" vs "under-estimators") are enough to trigger favoritism
5. **Oxytocin and Bonding**: Neurochemical bonding within groups increases trust for in-group members while simultaneously increasing suspicion of outsiders

This mechanism is automatic and deeply rooted in evolutionary survival, where group cohesion meant protection and resource sharing.`,
    },

    realWorldExample: `In Tajfel's minimal group experiments (1970), participants were assigned to groups based on trivial preferences (e.g., which painter they preferred, Klee or Kandinsky). Despite having no history, no interaction, and no real stakes, participants consistently allocated more resources to members of their own arbitrary group and less to the other group. This demonstrated that the mere act of categorization is enough to trigger favoritism, no real conflict or competition required.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `In-group bias shapes how users relate to communities, teams, and membership structures within products. Designers can leverage this to:

- Build strong community engagement through shared identity and belonging
- Increase retention by making users feel part of something meaningful
- Drive collaboration through team pride and shared goals
- Create meaningful membership tiers that reward loyalty without alienating newcomers
- Personalize experiences to reinforce group identity and shared values`,

    whenToUse: [
      {
        title: 'Community Building',
        scenario:
          'When fostering a sense of belonging among users of a platform or product',
        example:
          'Slack workspaces with custom emoji, shared channels, and team-specific rituals that build identity',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Team Collaboration Tools',
        scenario: 'When designing features that require group coordination and trust',
        example:
          'Shared dashboards, team activity feeds, and collective progress indicators that reinforce "we are in this together"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Membership and Loyalty Programs',
        scenario: 'When rewarding long-term users and encouraging continued engagement',
        example:
          'Tiered membership badges (Gold, Platinum) with exclusive perks that make members feel valued without shaming non-members',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding into Communities',
        scenario: 'When introducing new users to an existing community or team',
        example:
          'Welcome rituals, mentorship pairing, and "getting started" guides that immediately make newcomers feel like insiders',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Personalization by Cohort',
        scenario: 'When tailoring experiences to specific user groups or segments',
        example:
          'Showing content relevant to a user\'s industry, role, or interest group, reinforcing that the product "gets" them',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exclusionary Tier Systems',
        reason:
          'Creating rigid membership tiers that make lower-tier users feel inferior or locked out',
        consequence:
          'New users feel alienated, churn increases, and the community becomes elitist',
        alternative:
          'Design tiers that celebrate progress and provide aspirational paths rather than creating visible hierarchies of worth',
      },
      {
        title: 'Content Gatekeeping',
        reason:
          'Hiding essential or educational content behind membership walls that divide users into haves and have-nots',
        consequence:
          'Out-group users feel resentful, reducing word-of-mouth growth and creating hostility',
        alternative:
          'Provide core value to all users, reserve premium features for convenience or advanced use cases',
      },
      {
        title: 'Competitive Group Dynamics',
        reason:
          'Pitting user groups against each other in ways that foster hostility rather than healthy engagement',
        consequence:
          'Toxic tribalism, harassment between groups, and community fragmentation',
        alternative:
          'Frame competition as collaborative challenges, emphasize shared goals over group rivalry',
      },
      {
        title: 'Identity-Based Discrimination',
        reason:
          'Allowing group features to become vectors for discrimination based on race, gender, or other protected characteristics',
        consequence:
          'Legal liability, user harm, platform toxicity, and reputational damage',
        alternative:
          'Build robust moderation, anti-discrimination policies, and inclusive group formation features',
      },
    ],

    commonMistakes: [
      {
        title: 'Creating Visible "Second-Class" Users',
        description:
          'Making free or lower-tier users visually distinct in ways that signal inferiority (grayed-out profiles, restricted badges)',
        why: 'Out-group users internalize the stigma and leave rather than upgrading',
        fix: 'Give all users a dignified experience; differentiate tiers through added value, not visible diminishment',
      },
      {
        title: 'Over-Emphasizing Exclusivity',
        description:
          'Marketing membership as "exclusive" so aggressively that non-members feel unwelcome',
        why: 'Excessive exclusivity shrinks the potential user base and creates resentment',
        fix: 'Balance exclusivity messaging with welcoming language and clear paths to join',
      },
      {
        title: 'Neglecting New Member Integration',
        description:
          'Established communities that make no effort to welcome or onboard new members',
        why: 'New users feel like outsiders in an impenetrable in-group and leave',
        fix: 'Design explicit onboarding flows, mentorship systems, and "new member" visibility that helps newcomers integrate',
      },
      {
        title: 'Encouraging Toxic Tribalism',
        description:
          'Gamification or features that reward attacking or excluding out-group members',
        why: 'Short-term engagement gains come at the cost of long-term community health',
        fix: 'Reward inclusive behaviors, collaborative achievements, and cross-group interactions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how group membership, community spaces, and team features are visually organized',
        examples: [
          'Dedicated team or group spaces with distinct visual identity',
          'Member-only sections separated from public content',
          'Community feeds and activity streams that reinforce shared identity',
          'Group dashboards showing collective progress and achievements',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text and labels signal group membership, status, and belonging',
        examples: [
          'Member badge labels ("Pro Member", "Founding Member") next to usernames',
          'Inclusive vs exclusive language in headings and CTAs',
          '"We" and "our" language that reinforces group identity',
          'Welcome messages that signal belonging vs gatekeeping copy that signals exclusion',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color establishes group identity, membership status, and community belonging',
        examples: [
          'Team or group-specific color themes and accents',
          'Tier-based color coding (gold, silver, bronze) for membership levels',
          'Custom brand colors for workspaces or communities',
          'Color-coded badges and avatars that signal group affiliation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions define how users engage with their group and encounter out-group members',
        examples: [
          'Invitation flows that make adding group members feel welcoming',
          'Shared reactions, emoji, and expressions unique to the group',
          'Collaborative editing and co-creation features that build team bonds',
          'Cross-group interaction patterns that bridge in-group/out-group divides',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy determines whether group features build belonging or create exclusion',
        examples: [
          'Personalized feeds showing content from group members first',
          'Shared histories, milestones, and "remember when" content that reinforces bonds',
          'Inclusive language in community guidelines and onboarding',
          'Exclusive content that rewards membership without punishing non-members',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility determines whether group features are inclusive across abilities and contexts',
        examples: [
          'Group identity signals (badges, colors) must be perceivable by all users, including those with visual impairments',
          'Community features must be fully navigable via keyboard and screen readers',
          'Audio-based communities (voice channels) must provide alternatives for deaf/hard-of-hearing users',
          'Group onboarding must accommodate users with cognitive disabilities',
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
        title: 'Inclusive Community Onboarding',
        description:
          'A platform that welcomes new members with a guided introduction and mentor pairing',
        code: `<div class="community-welcome">
  <h3>Welcome to the Team!</h3>
  <div class="welcome-steps">
    <div class="step completed">
      <span class="icon">1</span>
      <p><strong>You're in!</strong> You're now part of the Design Systems community.</p>
    </div>
    <div class="step current">
      <span class="icon">2</span>
      <p><strong>Meet your mentor</strong></p>
      <div class="mentor-card">
        <img src="mentor.jpg" alt="Alex Rivera, Senior Member">
        <p><strong>Alex Rivera</strong> has been a member for 2 years</p>
        <p class="note">Alex will help you get oriented and answer questions</p>
        <button class="primary">Say Hello</button>
      </div>
    </div>
    <div class="step upcoming">
      <span class="icon">3</span>
      <p><strong>Introduce yourself</strong> in the #introductions channel</p>
    </div>
  </div>
  <p class="stat">94% of mentored members are still active after 6 months</p>
</div>`,
        explanation:
          'New members immediately feel like insiders through personal mentorship, clear onboarding steps, and warm language. The design builds in-group identity without creating barriers.',
        principle:
          'Inclusive onboarding transforms outsiders into insiders through personal connection and guided integration',
        metrics: {
          before: '38% of new members active after 30 days (no onboarding)',
          after: '71% of new members active after 30 days (with mentor onboarding)',
          improvement: '87% increase in new member retention',
        },
      },
      {
        title: 'Team Identity in Collaborative Tools',
        description:
          'A project management tool that builds team pride through shared achievements',
        code: `<section class="team-dashboard">
  <header class="team-header">
    <div class="team-identity">
      <img src="team-logo.svg" alt="Phoenix Team logo">
      <h2>Team Phoenix</h2>
      <span class="badge">12 members</span>
    </div>
    <div class="team-streak">
      <span class="flame">14-day streak</span>
      <p>Every member contributed this sprint</p>
    </div>
  </header>

  <div class="team-milestones">
    <h3>Our Achievements</h3>
    <div class="milestone">
      <span class="icon trophy"></span>
      <p><strong>100 tasks completed</strong> this quarter</p>
    </div>
    <div class="milestone">
      <span class="icon star"></span>
      <p><strong>Zero blockers</strong> for 3 consecutive sprints</p>
    </div>
  </div>

  <div class="team-activity">
    <h3>Recent Team Activity</h3>
    <ul>
      <li>Maria shipped the new dashboard</li>
      <li>James resolved 5 bugs in one day</li>
      <li>The team hit 98% sprint completion</li>
    </ul>
  </div>
</section>`,
        explanation:
          'Shared team identity (logo, name), collective achievements, and visible individual contributions build pride and cohesion. The focus is on "we" accomplishments, not individual rankings.',
        principle:
          'Collective achievement displays build group identity and intrinsic motivation to contribute',
      },
      {
        title: 'Welcoming Membership Tiers',
        description:
          'A membership system that rewards loyalty while keeping the door open for newcomers',
        code: `<div class="membership-tiers">
  <div class="current-tier">
    <h3>You're a <strong>Silver Member</strong></h3>
    <p>You've been with us for 6 months. Thank you!</p>
    <div class="perks">
      <p>Your perks: Priority support, community badge, monthly digest</p>
    </div>
  </div>

  <div class="next-tier">
    <h3>Gold is within reach</h3>
    <div class="progress-bar">
      <div class="filled" style="width: 72%"></div>
    </div>
    <p>72% there. 3 more months of activity unlocks Gold perks.</p>
    <ul class="upcoming-perks">
      <li>Early access to new features</li>
      <li>Exclusive AMA sessions</li>
      <li>Custom profile theme</li>
    </ul>
  </div>

  <p class="inclusive-note">
    All members enjoy full platform access.
    Tiers unlock bonus perks to say thanks.
  </p>
</div>`,
        explanation:
          'Tiers celebrate loyalty and progress without restricting core functionality. The "inclusive note" explicitly communicates that non-upgraded users are not second-class citizens.',
        principle:
          'Membership tiers should add value for insiders without subtracting value from outsiders',
      },
    ],

    bad: [
      {
        title: 'Elitist Gatekeeping',
        description:
          'A platform that visually shames free-tier users and locks basic features behind paywalls',
        code: `<!-- DON'T DO THIS -->
<div class="profile-card free-user">
  <img src="avatar.jpg" alt="User" class="grayscale">
  <h3>Jamie <span class="badge locked">Free</span></h3>
  <p class="restricted">You can't post in this community.</p>
  <p class="restricted">You can't see member profiles.</p>
  <p class="restricted">You can't join group chats.</p>
  <div class="upgrade-wall">
    <p>Unlock the REAL experience.</p>
    <button class="upgrade">Upgrade to Premium ($29/mo)</button>
    <small>Free users have limited access</small>
  </div>
</div>`,
        explanation:
          'Graying out free users, listing restrictions prominently, and calling premium the "REAL experience" creates a hostile in-group/out-group dynamic. Free users feel punished, not motivated.',
        principle:
          'Never design features that visually stigmatize or shame users who have not paid or upgraded',
      },
      {
        title: 'Toxic Competitive Group Features',
        description:
          'A platform that pits communities against each other with hostile leaderboards',
        code: `<!-- DON'T DO THIS -->
<div class="group-war">
  <h2>Community WAR: Who's the Best?</h2>
  <div class="leaderboard">
    <div class="group winner">
      <h3>#designers <span class="crown">DOMINATING</span></h3>
      <p>1,247 posts this week</p>
    </div>
    <div class="group loser">
      <h3>#developers <span class="skull">LOSING</span></h3>
      <p>892 posts this week</p>
    </div>
  </div>
  <p class="taunt">Developers, step it up or get kicked!</p>
</div>`,
        explanation:
          'Framing groups as adversaries with "war" language, winners/losers, and threats of removal encourages toxic tribalism. Members attack out-group users rather than collaborating.',
        principle:
          'Competition between groups must be collaborative and respectful, never hostile or threatening',
      },
      {
        title: 'Exclusionary "Insider" Language',
        description:
          'A platform that uses jargon and insider references that alienate new users',
        code: `<!-- DON'T DO THIS -->
<div class="community-feed">
  <div class="post">
    <p>If you know, you know. OG members remember the Great Migration.</p>
    <span class="reactions">
      <span class="insider-emoji" title="Only OGs understand">IYKYK (47)</span>
    </span>
  </div>
  <div class="new-user-experience">
    <p class="confused">You joined 2 days ago. You have no context.</p>
    <p class="no-help">No glossary. No history. No explanation.</p>
  </div>
</div>`,
        explanation:
          'Inside jokes and references without context create an invisible wall. New members cannot participate meaningfully, reinforcing that they do not truly belong.',
        principle:
          'Community features must provide context and accessibility for newcomers, not reward only veterans',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Workspace Identity',
        description: 'Slack builds strong in-group identity through custom workspace names, logos, emoji, and channels. Each workspace feels like a distinct team "home" with its own culture and rituals, fostering deep belonging.',
        effectiveness: 'very-effective',
        analysis: 'Custom emoji, channel naming conventions, and workspace branding let teams create unique cultural identities. The key insight is that Slack provides the tools for identity without imposing it, letting each group build its own sense of belonging organically.',
      },
      {
        company: 'Discord',
        product: 'Server Communities',
        description: 'Discord servers function as distinct communities with roles, permissions, custom emotes, and shared channels. Members identify strongly with their servers, creating loyalty and daily engagement.',
        effectiveness: 'very-effective',
        analysis: 'The role system creates micro-in-groups within servers (moderators, verified members, etc.) that increase engagement. However, poorly managed servers can become exclusionary. Discord mitigates this with onboarding screens and rules channels for new members.',
      },
      {
        company: 'LinkedIn',
        product: 'Alumni and Group Networks',
        description: 'LinkedIn leverages school alumni networks, company affiliations, and professional groups to create instant in-group connections. Seeing "also attended MIT" or "former colleague at Google" triggers in-group trust.',
        effectiveness: 'effective',
        analysis: 'Shared institutional identity (alumni, company) creates immediate trust and willingness to connect. LinkedIn surfaces these affiliations prominently because in-group recognition dramatically increases connection acceptance rates and message response rates.',
      },
      {
        company: 'Apple',
        product: 'Ecosystem Identity',
        description: 'Apple creates powerful in-group identity through blue iMessage bubbles vs green SMS, AirDrop exclusivity, and seamless ecosystem integration. Users identify as "Apple people" and perceive non-Apple users as out-group.',
        effectiveness: 'very-effective',
        analysis: 'The blue vs green bubble distinction is one of the most powerful in-group/out-group signals in consumer tech. It creates social pressure to remain in the Apple ecosystem. While effective for retention, it has drawn criticism for creating social stigma around non-iPhone users, particularly among younger demographics.',
      },
    ],

    abTests: [
      {
        title: 'Community Onboarding: Self-Service vs Mentor-Guided',
        hypothesis:
          'Pairing new members with a mentor will increase retention by creating immediate in-group connection',
        controlVersion: {
          description:
            'Self-service onboarding with documentation links and a welcome email',
          metrics: {
            conversionRate: '38%',
            timeOnPage: '2:10',
            scrollDepth: '35%',
          },
        },
        treatmentVersion: {
          description:
            'Mentor-guided onboarding with personal welcome, paired mentor, and guided first interactions',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '8:45',
            scrollDepth: '92%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Mentor-guided onboarding nearly doubled 30-day retention. New members who received a personal mentor message within the first hour were 3x more likely to post their first message within 48 hours. The sense of being personally welcomed into the group was the strongest driver.',
          learnings: [
            'Personal human connection is the fastest path to in-group identification',
            'Automated welcome messages were far less effective than personal ones',
            'New members who interacted with their mentor within 24 hours had 89% 30-day retention',
            'The mentor relationship often evolved into lasting community friendships',
          ],
        },
      },
      {
        title: 'Membership Tiers: Exclusive Messaging vs Inclusive Messaging',
        hypothesis:
          'Inclusive tier messaging will improve upgrade rates compared to exclusionary messaging',
        controlVersion: {
          description:
            'Tier page emphasizing what free users cannot do: "Upgrade to unlock features you are missing"',
          metrics: {
            conversionRate: '4.1%',
            clickThroughRate: '8%',
          },
        },
        treatmentVersion: {
          description:
            'Tier page celebrating progress and adding perks: "You have been with us 3 months! Unlock bonus perks as a thank-you"',
          metrics: {
            conversionRate: '9.3%',
            clickThroughRate: '22%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Inclusive, progress-based messaging more than doubled upgrade conversions. Users responded to feeling valued and recognized rather than feeling restricted and excluded. The framing shift from "you are missing out" to "you have earned this" leveraged in-group pride instead of out-group shame.',
          learnings: [
            'Celebrating membership duration builds loyalty and upgrade motivation',
            'Restriction-focused messaging triggers reactance and resentment',
            'Progress bars toward the next tier increased engagement by 34%',
            'Users who upgraded via inclusive messaging had 2x higher long-term retention',
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
        name: 'Membership Badges and Labels',
        description:
          'Visual indicators of group membership, status, or tier displayed on profiles, posts, or avatars',
        howToSpot:
          'Look for badges, colored borders, tier labels (Gold, Pro, OG), or icons next to usernames',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Exclusive Access Indicators',
        description:
          'Lock icons, "members only" labels, or gated sections that signal restricted content',
        howToSpot:
          'Check for locked icons, blurred content previews, or "upgrade to access" overlays',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Group Identity Branding',
        description:
          'Custom colors, logos, themes, or visual identity for teams, workspaces, or communities',
        howToSpot:
          'Look for team logos, custom color themes, branded headers, or community-specific visual elements',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Us vs Them Language',
        description:
          'Copy that emphasizes division between members and non-members, or between competing groups',
        howToSpot:
          'Check for "exclusive", "members only", "outsiders", "join the elite", or competitive group language',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Insider Signals',
        description:
          'Custom emoji, jargon, inside references, or cultural artifacts that only established members understand',
        howToSpot:
          'Look for custom reactions, acronyms without explanation, or references to shared history',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Tiered Membership Pattern',
        description: 'Visible hierarchy of user tiers with different privileges and visual treatment',
        indicators: ['Badge or label differences between tiers', 'Feature access varying by membership level', 'Visual distinction between free and paid users', 'Upgrade prompts at feature boundaries'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Community Boundary Pattern',
        description: 'Clear delineation between community insiders and outsiders',
        indicators: ['Gated content or conversations', 'Invitation-only access', 'Approval workflows for joining', 'Different views for members vs non-members'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Group Identity Pattern',
        description: 'Features designed to reinforce shared identity within a team or community',
        indicators: ['Custom branding or theming for groups', 'Shared achievements or milestones', 'Group-specific channels or spaces', 'Collective statistics or progress tracking'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Affiliation Signal Pattern',
        description: 'Displaying shared group affiliations to build instant trust between users',
        indicators: ['"Also a member of..." badges', 'Shared company, school, or group indicators', 'Mutual connection or group highlights', 'Alumni or team affiliation displays'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there visible membership tiers or status indicators?',
      'How does the interface treat non-members vs members differently?',
      'Is content or functionality gated behind group membership?',
      'Does the design use "us vs them" language or framing?',
      'Are there features that build shared group identity (custom branding, shared achievements)?',
      'How are new members welcomed and integrated into the community?',
      'Do insider signals (jargon, custom emoji, references) alienate newcomers?',
      'Are group boundaries designed to be permeable or rigid?',
      'Is there competitive framing between different groups?',
      'Does the tier system celebrate progress or shame lower-tier users?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in in-group bias and social identity dynamics.

Analyze the provided design for in-group bias patterns. Identify:

1. **Group Membership Signals**: Badges, tiers, labels, or visual indicators that distinguish insiders from outsiders
2. **Community Boundaries**: How the design separates members from non-members
3. **Belonging Mechanisms**: Features that build shared identity, pride, and cohesion within groups
4. **Exclusion Patterns**: Elements that alienate, stigmatize, or gatekeep against out-group users
5. **Onboarding Integration**: How new users are welcomed and incorporated into existing groups

For each pattern found:
- Identify whether it builds belonging or creates exclusion
- Assess whether group boundaries are permeable and welcoming
- Determine if tier systems reward loyalty without punishing non-members
- Evaluate the risk of toxic tribalism or hostile group dynamics
- Suggest improvements for inclusive community design

Consider:
- Does the design help users feel they belong without making others feel excluded?
- Are membership tiers additive (bonus perks) or subtractive (locked features)?
- Is insider language accessible to newcomers?
- Could group features enable discrimination or harassment?
- Are cross-group interactions encouraged or discouraged?

Provide actionable recommendations for building inclusive, healthy group dynamics.`,

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
              groupDynamic: { type: 'string' },
              inclusiveness: { type: 'string' },
              exclusionRisk: { type: 'string' },
              belongingScore: { type: 'number' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'groupDynamic',
              'inclusiveness',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            belongingScore: { type: 'number' },
            inclusionScore: { type: 'number' },
            exclusionRisk: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'belongingScore',
            'inclusionScore',
            'exclusionRisk',
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
        title: 'Define Your Community Identity',
        description:
          'Establish the shared values, purpose, and identity that will unite your user community',
        example:
          'Goal: Create a design community where members feel they belong to a supportive peer group',
        tips: [
          'Ground identity in shared purpose, not exclusion of others',
          'Allow sub-groups to form naturally around interests or teams',
          'Define community values that emphasize inclusion and mutual support',
        ],
      },
      {
        step: 2,
        title: 'Design Inclusive Onboarding',
        description:
          'Create welcoming paths that transform new users from outsiders to insiders quickly',
        example:
          'Pair every new member with a mentor and guide them through their first community interactions',
        tips: [
          'Personal welcome messages outperform automated ones by 3x',
          'Provide context for insider references and community history',
          'Make the first contribution easy and celebrated',
        ],
      },
      {
        step: 3,
        title: 'Build Group Identity Features',
        description:
          'Provide tools for groups to develop shared identity through customization and shared experiences',
        example:
          'Custom team logos, shared channels, collective achievements, and group milestones',
        tips: [
          'Let groups create their own culture rather than imposing one',
          'Shared achievements build stronger bonds than individual rewards',
          'Visual identity (colors, logos) increases group cohesion measurably',
        ],
      },
      {
        step: 4,
        title: 'Create Permeable Boundaries',
        description:
          'Design group boundaries that are clear enough to create identity but open enough to welcome newcomers',
        example:
          'Open communities with visible activity that lets potential members see what it is like before joining',
        tips: [
          'Show community activity to non-members to generate interest',
          'Make joining easy with minimal barriers',
          'Provide guest or preview access before requiring commitment',
        ],
      },
      {
        step: 5,
        title: 'Monitor and Moderate Group Dynamics',
        description:
          'Actively manage the balance between healthy group pride and toxic tribalism',
        example:
          'Track cross-group interactions, flag exclusionary language, and reward inclusive behaviors',
        tips: [
          'Set up automated detection for exclusionary or hostile language',
          'Reward members who help newcomers or bridge group divides',
          'Regularly survey members about belonging and inclusion',
        ],
      },
    ],

    dos: [
      'Build shared identity around purpose, values, and accomplishments',
      'Welcome newcomers explicitly with onboarding rituals and mentorship',
      'Make group boundaries permeable and inviting, not rigid and hostile',
      'Celebrate collective achievements alongside individual ones',
      'Provide tools for groups to develop their own culture and identity',
      'Design membership tiers that add perks without restricting core features',
      'Encourage cross-group interactions and collaboration',
      'Provide context and glossaries for insider references and jargon',
    ],

    donts: [
      'Don\'t visually stigmatize or diminish non-members or lower-tier users',
      'Don\'t use "exclusive" language that frames non-members as lesser',
      'Don\'t pit groups against each other with hostile competition or rankings',
      'Don\'t gate essential features behind membership walls',
      'Don\'t allow insider culture to become impenetrable to newcomers',
      'Don\'t reward exclusionary behavior or gatekeeping',
      'Don\'t ignore the risk of group features enabling discrimination',
      'Don\'t create membership systems that feel like social hierarchies of worth',
    ],

    bestPractices: [
      {
        title: 'Additive Tiers, Not Subtractive',
        description:
          'Design membership tiers that add bonus perks rather than restricting baseline functionality',
        rationale:
          'Users who feel punished for not paying will churn; users who feel rewarded for loyalty will upgrade',
        example:
          '"Gold members get early access and custom themes" vs "Free users cannot post or view profiles"',
      },
      {
        title: 'Welcome Rituals for New Members',
        description:
          'Create structured onboarding moments that make newcomers feel immediately included',
        rationale:
          'The first 24 hours determine whether a new member identifies as part of the group or remains an outsider',
        example:
          'Automated welcome thread, mentor pairing, "introduce yourself" prompt, and first-contribution celebration',
      },
      {
        title: 'Bridge Groups, Don\'t Silo Them',
        description:
          'Design features that encourage interaction between different groups and communities',
        rationale:
          'Siloed groups develop increasingly insular identities; cross-pollination keeps communities healthy',
        example:
          'Cross-team project spaces, inter-community events, shared forums for different user groups',
      },
      {
        title: 'Celebrate Collective Progress',
        description:
          'Highlight group achievements and milestones rather than only individual rankings',
        rationale:
          'Collective achievements build group pride without creating internal competition',
        example:
          '"Our community helped 10,000 users this quarter" instead of "Top 10 individual contributors"',
      },
      {
        title: 'Transparent Group Norms',
        description:
          'Make community values, guidelines, and expectations visible and accessible to all',
        rationale:
          'Explicit norms prevent toxic in-group behavior and help newcomers integrate faster',
        example:
          'Visible community guidelines, code of conduct, and moderation policies on every community page',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure group membership signals are conveyed through semantic structure, not just visuals',
        implementation:
          'Use ARIA labels for badges, proper heading levels for group sections, and semantic HTML so screen reader users understand group membership context',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely solely on color to communicate membership tier or group identity',
        implementation:
          'Combine color-coded tiers with text labels, icons, and ARIA attributes so all users can perceive membership status',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for community spaces and group features',
        implementation:
          'Label group sections, member lists, and community areas with descriptive headings navigable by screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for group participation and joining processes',
        implementation:
          'Ensure join flows, invitation processes, and community contribution forms have clear, accessible labels and instructions',
      },
    ],

    ethics: [
      {
        concern: 'Exclusion and Alienation',
        severity: 'critical',
        explanation:
          'Group features can create hostile in-group/out-group dynamics that alienate non-members or new users',
        mitigation:
          'Design permeable group boundaries, welcome newcomers explicitly, and never stigmatize non-members visually or through copy.',
      },
      {
        concern: 'Toxic Tribalism',
        severity: 'critical',
        explanation:
          'Competitive group features can escalate into harassment, bullying, and discrimination between groups',
        mitigation:
          'Frame competition as collaborative challenges, moderate inter-group interactions, and reward inclusive behaviors over aggressive ones.',
      },
      {
        concern: 'Discrimination Vectors',
        severity: 'critical',
        explanation:
          'Group features can become tools for discrimination based on race, gender, religion, or other protected characteristics',
        mitigation:
          'Implement robust moderation, anti-discrimination policies, and reporting mechanisms. Monitor group formation for exclusionary patterns.',
      },
      {
        concern: 'Social Pressure and Coercion',
        severity: 'high',
        explanation:
          'Strong in-group identity can pressure members to conform, silence dissent, or engage in groupthink',
        mitigation:
          'Design for individual expression within groups, support anonymous feedback, and encourage diverse perspectives within communities.',
      },
      {
        concern: 'Elitist Tier Systems',
        severity: 'high',
        explanation:
          'Membership tiers can create visible social hierarchies that mirror real-world inequality',
        mitigation:
          'Design tiers around added perks, not restricted access. Ensure core functionality is available to all users regardless of tier.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Social Categorization and Intergroup Behaviour',
        author: 'Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C.',
        year: 1971,
        doi: '10.1002/ejsp.2420010202',
        description:
          'The foundational minimal group experiments demonstrating that mere categorization triggers in-group favoritism',
        type: 'foundational',
      },
      {
        title: 'An Integrative Theory of Intergroup Conflict',
        author: 'Tajfel, H., & Turner, J. C.',
        year: 1979,
        description:
          'The seminal paper introducing Social Identity Theory, explaining how group membership shapes self-concept and behavior',
        type: 'foundational',
      },
      {
        title: 'The Psychology of Prejudice: Ingroup Love or Outgroup Hate?',
        author: 'Brewer, M. B.',
        year: 1999,
        doi: '10.1111/0022-4537.00126',
        description:
          'Distinguishes between in-group favoritism and out-group hostility, showing that preference for one\'s group does not necessarily require hostility toward others',
        type: 'advanced',
      },
      {
        title: 'Oxytocin Promotes Human Ethnocentrism',
        author: 'De Dreu, C. K. W., Greer, L. L., Van Kleef, G. A., Shalvi, S., & Handgraaf, M. J. J.',
        year: 2011,
        doi: '10.1073/pnas.1015316108',
        description:
          'Demonstrates the neurochemical basis of in-group bias, showing oxytocin increases in-group favoritism while potentially increasing out-group derogation',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Social Identity and Intergroup Relations',
        author: 'Tajfel, Henri',
        year: 1982,
        isbn: '9780521153652',
        description:
          'The foundational work on Social Identity Theory by the researcher who first demonstrated minimal group effects',
        type: 'foundational',
      },
      {
        title: 'Belonging: The Science of Creating Connection and Bridging Divides',
        author: 'Allen, Kelly-Ann',
        year: 2020,
        isbn: '9780367347529',
        description:
          'Modern synthesis of belonging research with practical implications for design and community building',
        type: 'practical',
      },
      {
        title: 'The Art of Community: Building the New Age of Participation',
        author: 'Bacon, Jono',
        year: 2012,
        isbn: '9781449312060',
        description:
          'Practical guide to community design that addresses in-group dynamics, onboarding, and inclusive culture',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Belonging',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/belonging/',
        description:
          'UX-focused guide on designing community features that foster belonging without exclusion',
        type: 'practical',
      },
      {
        title: 'The In-Group/Out-Group Effect in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/in-group-bias-in-ux',
        description:
          'Overview of how in-group bias manifests in digital product design with examples',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Henri Tajfel\'s Minimal Group Experiments',
        author: 'Social Psychology',
        url: 'https://www.youtube.com/watch?v=ZLvBJjGJlJo',
        description:
          'Explanation of the foundational experiments that revealed in-group favoritism from mere categorization',
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
      'bandwagon-effect',
      'mere-exposure-effect',
      'halo-effect',
    ],

    conflicts: [
      'fundamental-attribution-error',
    ],

    confusedWith: [
      'conformity-bias',
      'bandwagon-effect',
      'authority-bias',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'out-group-homogeneity',
        'minimal-group-effect',
      ],
    },
  },
};
