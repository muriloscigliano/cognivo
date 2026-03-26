/**
 * INGROUP FAVORITISM
 *
 * We give preferential treatment to members of groups we identify with
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const ingroupFavoritism: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'ingroup-favoritism',
    name: 'Ingroup Favoritism',
    aliases: ['Ingroup Bias', 'Ingroup Preference', 'Intergroup Bias', 'Favoritism Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.ATTRIBUTION,
    ],
    tags: [
      'group-identity',
      'preferential-treatment',
      'membership',
      'community',
      'trust',
      'belonging',
      'exclusivity',
      'loyalty',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We give preferential treatment to members of groups we identify with.',

    detailed: `Ingroup favoritism is the tendency to give preferential treatment, allocate more resources, extend greater trust, and make more positive evaluations of people who belong to the same group as ourselves. This bias goes beyond mere identification with a group; it actively shapes how we distribute benefits, interpret behavior, and extend opportunities.

The effect is remarkably robust. Henri Tajfel's minimal group paradigm experiments demonstrated that even arbitrary, meaningless group assignments (such as being told you prefer Klee vs Kandinsky paintings) are sufficient to trigger preferential resource allocation toward ingroup members and discrimination against outgroup members. People will sacrifice absolute gains to maintain a relative advantage for their ingroup.

In product design, ingroup favoritism profoundly influences how users engage with membership tiers, community features, team-based tools, referral programs, and alumni networks. When users feel they belong to a group within a product, they extend more trust to fellow members, engage more deeply, and become more resistant to switching. Designers must balance the engagement benefits of group identity against the risks of exclusion, tribalism, and unfair treatment of non-members.`,

    psychologyBasis: {
      discoveredBy: 'Henri Tajfel',
      year: 1970,
      theory: 'Social Identity Theory / Minimal Group Paradigm',
      mechanism: `Ingroup favoritism arises from the intersection of social categorization, social identity, and social comparison. The mechanism operates through several stages:

1. **Social Categorization**: The brain automatically classifies people into "us" and "them" based on any available cue (team, membership tier, company, school, etc.)
2. **Social Identity**: Part of our self-concept derives from group memberships, so enhancing the group enhances the self
3. **Preferential Resource Allocation**: We direct more resources, attention, and opportunities toward ingroup members to strengthen the group (and by extension, ourselves)
4. **Positive Attribution**: We interpret ingroup members' behavior more charitably, attributing successes to ability and failures to circumstance
5. **Trust Extension**: We extend more trust and assume better intentions from ingroup members, lowering barriers to cooperation

This mechanism is automatic and does not require personal knowledge of the other person. Mere shared category membership is sufficient to trigger preferential treatment.`,
    },

    realWorldExample: `In Tajfel's 1970 minimal group paradigm experiments, schoolboys were randomly assigned to groups based on trivial criteria (preference for abstract paintings). When asked to allocate money between an ingroup member and an outgroup member, boys consistently gave more to their own group. Critically, they often chose options that maximized the difference between groups over options that would have given their own group more in absolute terms. The mere act of categorization, with no prior interaction, history, or competition, was enough to produce systematic favoritism.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Ingroup favoritism affects how users perceive membership, trust fellow users, engage with community features, and respond to exclusive benefits. Designers can leverage this to:

- Build strong community engagement through team and group features
- Increase retention through membership perks and exclusive access
- Drive referral behavior by rewarding existing members for bringing in new ones
- Create trust networks where verified group members receive preferential treatment
- Design tiered experiences where belonging to higher tiers confers tangible advantages`,

    whenToUse: [
      {
        title: 'Team-Based Collaboration',
        scenario:
          'When designing features that benefit from group cohesion and shared identity',
        example:
          'Team workspaces with shared branding, custom roles, and team-only channels that foster collective identity',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Referral Programs',
        scenario: 'When growing the user base through existing member networks',
        example:
          'Give existing members and their referrals mutual benefits: "You both get a free month when they join"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Membership Tiers',
        scenario: 'When creating loyalty programs or premium membership levels',
        example:
          'Offer exclusive content, early access, or special badges that signal membership status to others',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Community Moderation',
        scenario: 'When establishing trust hierarchies in user-generated content platforms',
        example:
          'Long-standing community members gain moderator tools, verified badges, and elevated visibility',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Alumni and Network Features',
        scenario: 'When connecting users through shared institutional or organizational backgrounds',
        example:
          'Surface shared alma mater, past employers, or professional associations to build instant rapport',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Marketplace Fairness',
        reason:
          'Ingroup favoritism can lead to discriminatory treatment of sellers or buyers from different groups',
        consequence:
          'Marketplace bias, unequal opportunity, and potential legal liability',
        alternative:
          'Use blind matching or merit-based systems that de-emphasize group identity in transactional contexts',
      },
      {
        title: 'Hiring and Evaluation Tools',
        reason:
          'Group-based favoritism reinforces systemic bias in talent decisions',
        consequence:
          'Homogeneous teams, discrimination lawsuits, and reduced diversity of thought',
        alternative:
          'Design structured evaluation tools that emphasize skills and qualifications over shared background',
      },
      {
        title: 'Content Moderation Decisions',
        reason:
          'Ingroup favoritism causes moderators to be lenient with their own group and harsh with outsiders',
        consequence:
          'Unfair enforcement, echo chambers, and community toxicity',
        alternative:
          'Implement blind moderation, cross-group review panels, and consistent rule enforcement',
      },
      {
        title: 'Public Service and Government Platforms',
        reason:
          'Preferential treatment based on group membership violates principles of equal access',
        consequence:
          'Discrimination, public backlash, and legal violations',
        alternative:
          'Design for universal access with no group-based advantages in core services',
      },
    ],

    commonMistakes: [
      {
        title: 'Creating Toxic Exclusivity',
        description:
          'Making non-members feel so excluded that they disengage rather than aspire to join',
        why: 'Overly exclusive experiences alienate potential users and create resentment',
        fix: 'Provide a clear path to membership and ensure non-members still have a valuable core experience',
      },
      {
        title: 'Empty Group Identity',
        description:
          'Creating membership tiers or groups that lack genuine shared purpose or meaningful differentiation',
        why: 'Arbitrary groups without substance feel manipulative and fail to generate real belonging',
        fix: 'Ensure group membership confers genuine value and connects to real shared interests or goals',
      },
      {
        title: 'Ignoring Outgroup Hostility',
        description:
          'Fostering strong ingroup identity without monitoring for outgroup antagonism',
        why: 'Strong group bonds often correlate with hostility toward outsiders, leading to toxicity',
        fix: 'Design cross-group interactions, shared goals, and norms that reward inclusive behavior',
      },
      {
        title: 'Static Group Boundaries',
        description:
          'Making group membership permanently fixed rather than allowing natural movement',
        why: 'Rigid boundaries prevent growth, punish changing interests, and feel oppressive',
        fix: 'Allow users to join, leave, and move between groups fluidly based on evolving interests',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how group membership and exclusive content are visually separated',
        examples: [
          'Members-only sections visually distinguished from public content',
          'Team dashboards with shared layouts that reinforce group identity',
          'Gated content areas that signal exclusive access',
          'Group-specific navigation elements or sidebars',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment signals membership status and group hierarchy',
        examples: [
          'Member names displayed with special formatting or badges',
          'Exclusive content headings styled differently from public content',
          'Tier-specific labels and status indicators near usernames',
          'Group-branded typography in team or community spaces',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding reinforces group identity and distinguishes membership levels',
        examples: [
          'Team colors applied to avatars, borders, and UI elements',
          'Gold, silver, bronze color schemes for membership tiers',
          'Group-specific accent colors in community spaces',
          'Premium color treatments for exclusive content areas',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions differ based on group membership, shaping perceived fairness and belonging',
        examples: [
          'Members-only actions (early access, priority support, exclusive tools)',
          'Referral flows that reward bringing ingroup members',
          'Team-specific collaboration features unavailable to solo users',
          'Community voting or moderation powers granted by membership status',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content access and personalization based on group membership drives engagement and retention',
        examples: [
          'Members-only articles, videos, or resources',
          'Personalized feeds that prioritize content from fellow group members',
          'Exclusive announcements and early previews for premium tiers',
          'Group-specific onboarding content and tutorials',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Group-based features must remain accessible regardless of membership status',
        examples: [
          'Screen reader users must be informed of membership-gated content without confusion',
          'Badge and tier indicators need text alternatives, not just color or icons',
          'Keyboard navigation must work consistently across member and non-member experiences',
          'Gated content should degrade gracefully with clear explanations of why access is restricted',
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
        title: 'Team Workspace with Shared Identity',
        description:
          'Collaboration tool providing team-branded workspaces that foster group cohesion',
        code: `<div class="team-workspace">
  <header class="team-header" style="border-left: 4px solid var(--team-color);">
    <img src="team-logo.svg" alt="Acme Design Team" class="team-logo">
    <div class="team-info">
      <h2>Acme Design Team</h2>
      <span class="member-count">12 members</span>
      <span class="badge team-badge">Pro Team</span>
    </div>
  </header>
  <nav class="team-nav">
    <a href="#projects" class="active">Team Projects</a>
    <a href="#members">Members</a>
    <a href="#shared">Shared Library</a>
    <a href="#discussions">Team Discussions</a>
  </nav>
  <section class="team-feed">
    <div class="activity">
      <img src="avatar-maria.jpg" alt="" class="avatar">
      <p><strong>Maria</strong> shared a new design system update</p>
      <span class="time">2 hours ago</span>
    </div>
  </section>
</div>`,
        explanation:
          'The team workspace creates shared identity through custom branding, team-specific navigation, and a feed of member activity. Members feel invested in the group identity, increasing collaboration and retention.',
        principle:
          'Shared visual identity and dedicated spaces strengthen ingroup bonds and increase engagement',
        metrics: {
          before: '45% weekly active collaboration rate with generic workspaces',
          after: '72% weekly active collaboration rate with team-branded workspaces',
          improvement: '60% increase in team collaboration frequency',
        },
      },
      {
        title: 'Mutual-Benefit Referral Program',
        description:
          'Referral system that rewards both the existing member and the new member equally',
        code: `<div class="referral-card">
  <h3>Invite Your Network</h3>
  <p class="value-prop">You and your friend both get <strong>1 free month</strong></p>

  <div class="referral-benefits">
    <div class="benefit you">
      <span class="icon" aria-hidden="true">&#x1f464;</span>
      <p><strong>You get</strong></p>
      <p>1 month free + 500 bonus credits</p>
    </div>
    <div class="benefit-connector" aria-hidden="true">+</div>
    <div class="benefit friend">
      <span class="icon" aria-hidden="true">&#x1f464;</span>
      <p><strong>They get</strong></p>
      <p>1 month free + priority onboarding</p>
    </div>
  </div>

  <div class="referral-input">
    <label for="referral-email">Friend's email</label>
    <input id="referral-email" type="email" placeholder="colleague@company.com">
    <button class="primary">Send Invite</button>
  </div>

  <p class="stats">You've referred <strong>3 people</strong> this month</p>
</div>`,
        explanation:
          'The mutual-benefit structure leverages ingroup favoritism ethically. Existing members feel they are extending their group privileges to friends, while new members feel welcomed into an established community.',
        principle:
          'Mutual rewards transform referrals from transactions into acts of group inclusion',
      },
      {
        title: 'Progressive Membership Benefits',
        description:
          'Tiered membership system with transparent, aspirational benefits',
        code: `<div class="membership-tiers">
  <div class="tier current" aria-current="true">
    <span class="tier-badge silver">Silver Member</span>
    <h4>Your Current Benefits</h4>
    <ul>
      <li>Early access to new features</li>
      <li>Members-only community forum</li>
      <li>Monthly exclusive newsletter</li>
    </ul>
    <p class="progress">3 months until Gold status</p>
  </div>

  <div class="tier next">
    <span class="tier-badge gold">Gold Member</span>
    <h4>Unlock at 12 Months</h4>
    <ul>
      <li>Everything in Silver, plus:</li>
      <li>Priority customer support</li>
      <li>Beta feature access</li>
      <li>Annual member summit invitation</li>
    </ul>
    <div class="progress-bar" role="progressbar"
         aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="fill" style="width: 75%"></div>
    </div>
  </div>
</div>`,
        explanation:
          'Transparent tier progression gives members a clear path upward. Current benefits reinforce belonging while aspirational tiers drive continued engagement without making non-members feel punished.',
        principle:
          'Aspirational membership tiers motivate through inclusion, not exclusion',
        metrics: {
          before: '68% annual retention with flat membership',
          after: '84% annual retention with tiered membership',
          improvement: '24% increase in annual member retention',
        },
      },
    ],

    bad: [
      {
        title: 'Punitive Non-Member Experience',
        description:
          'Deliberately degrading the experience for non-members to pressure upgrades',
        code: `<!-- DON'T DO THIS -->
<div class="content-page">
  <article class="blurred-content">
    <h2>10 Advanced Design Patterns</h2>
    <p class="teaser">These exclusive patterns will transform your...</p>
    <div class="blur-overlay">
      <div class="upgrade-nag">
        <h3>MEMBERS ONLY</h3>
        <p>You're missing out! 50,000 members already have access.</p>
        <p class="fomo">This article is being read by 237 members right now.</p>
        <button class="urgent">Join Now Before It's Too Late!</button>
      </div>
    </div>
  </article>
  <!-- Showing 5 more blurred articles in a row -->
</div>`,
        explanation:
          'Aggressively gating content with FOMO-driven language and blurred content creates resentment rather than aspiration. Non-members feel punished, not invited. The urgency language exploits anxiety rather than communicating genuine value.',
        principle:
          'Punitive exclusion breeds resentment; aspirational exclusivity builds desire',
      },
      {
        title: 'Discriminatory Community Moderation',
        description:
          'Applying different rules to ingroup members vs newcomers',
        code: `<!-- DON'T DO THIS -->
<div class="moderation-panel">
  <div class="reported-post">
    <div class="user-info">
      <span class="badge veteran">Founding Member</span>
      <span class="name">OG_User_2019</span>
    </div>
    <p class="post-content">[Clearly violates community guidelines]</p>
    <div class="mod-actions">
      <button class="soft-action">Send Friendly Reminder</button>
      <small>Founding members get 3 warnings before action</small>
    </div>
  </div>

  <div class="reported-post">
    <div class="user-info">
      <span class="badge new">New Member</span>
      <span class="name">NewUser_2024</span>
    </div>
    <p class="post-content">[Same type of violation]</p>
    <div class="mod-actions">
      <button class="harsh-action">Suspend Account</button>
      <small>New accounts: zero tolerance policy</small>
    </div>
  </div>
</div>`,
        explanation:
          'Applying different enforcement standards based on membership tenure is discriminatory. Founding members receive leniency while newcomers face harsh penalties for identical behavior, creating a hostile environment for new users.',
        principle:
          'Community rules must be applied consistently regardless of group membership status',
      },
      {
        title: 'Artificial Tribal Competition',
        description:
          'Pitting user groups against each other to drive engagement through hostility',
        code: `<!-- DON'T DO THIS -->
<div class="team-battle">
  <h2>TEAM RED vs TEAM BLUE - Weekly War!</h2>
  <div class="scoreboard">
    <div class="team-red">
      <h3>Team Red: 12,450 pts</h3>
      <p>CRUSHING the competition!</p>
    </div>
    <div class="team-blue">
      <h3>Team Blue: 11,200 pts</h3>
      <p>Falling behind... step it up!</p>
    </div>
  </div>
  <div class="trash-talk">
    <h4>Battle Chat</h4>
    <p>"Blue team is pathetic lol" - RedWarrior99</p>
    <p>"Red cheaters detected" - BlueDefender</p>
  </div>
</div>`,
        explanation:
          'Deliberately fostering antagonism between groups drives toxic engagement. While short-term metrics may spike, this creates a hostile environment, drives away moderate users, and can escalate into harassment.',
        principle:
          'Competition should motivate performance, not dehumanize the outgroup',
      },
    ],

    realWorld: [
      {
        company: 'LinkedIn',
        product: 'Alumni Features',
        url: 'https://www.linkedin.com',
        description:
          'LinkedIn surfaces shared alma mater connections prominently in profiles and search results. Users see "You both attended Stanford" or "147 alumni work here," activating ingroup favoritism to drive connection acceptance and engagement.',
        effectiveness: 'very-effective',
        analysis:
          'By surfacing shared educational background, LinkedIn leverages one of the strongest ingroup cues in professional contexts. Connection acceptance rates are significantly higher when shared institutions are highlighted, and alumni networks become self-reinforcing engagement loops.',
      },
      {
        company: 'Discord',
        product: 'Server Roles and Perks',
        url: 'https://discord.com',
        description:
          'Discord servers offer role-based access to channels, custom colors, priority in voice channels, and server-specific emojis. Boosters and long-term members receive visible perks that signal their status within the community.',
        effectiveness: 'very-effective',
        analysis:
          'Discord transforms server membership into layered group identity. Visible role colors and exclusive channels create strong belonging signals. Server boosters receive tangible perks that reinforce their investment in the community.',
      },
      {
        company: 'Costco',
        product: 'Membership Model',
        url: 'https://www.costco.com',
        description:
          'Costco requires paid membership to shop. Executive members get 2% cash back and exclusive hours. The membership card itself becomes an identity signal, and members become evangelists who recommend Costco to their network.',
        effectiveness: 'very-effective',
        analysis:
          'Costco turns a transaction barrier into a belonging mechanism. Paying for membership creates sunk cost commitment, but more importantly, it creates an ingroup identity. Members feel part of an exclusive club and actively recruit others, driving organic growth.',
      },
      {
        company: 'Amazon',
        product: 'Prime Membership',
        url: 'https://www.amazon.com/prime',
        description:
          'Amazon Prime creates a two-tier shopping experience: Prime members get free shipping, early access to deals, exclusive content, and visible "Prime" badges. Non-Prime shoppers see what they are missing on every product page.',
        effectiveness: 'very-effective',
        analysis:
          'Prime membership creates one of the strongest digital ingroup effects in e-commerce. Members develop an identity around their Prime status, perceive the platform as "theirs," and spend significantly more. The visible divide between Prime and non-Prime pricing reinforces the value of membership.',
      },
    ],

    abTests: [
      {
        title: 'Team Features: Individual vs Group-Branded Workspace',
        hypothesis:
          'Team-branded workspaces with shared identity elements will increase collaboration and retention',
        controlVersion: {
          description:
            'Standard workspace with individual accounts, no team branding. Users collaborate via sharing links.',
          metrics: {
            conversionRate: '45%',
            timeOnPage: '12 min avg session',
            bounceRate: '32%',
          },
        },
        treatmentVersion: {
          description:
            'Team-branded workspace with shared logo, team colors, member directory, and team activity feed. Visible "Team" badge on all member profiles.',
          metrics: {
            conversionRate: '67%',
            timeOnPage: '23 min avg session',
            bounceRate: '18%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Team-branded workspaces increased collaboration rate by 49% and nearly doubled session duration. The shared visual identity created a sense of belonging that motivated members to contribute more frequently and stay longer.',
          learnings: [
            'Shared visual identity (team logo, colors) is a powerful belonging signal',
            'Team activity feeds increase individual contribution through social accountability',
            'Member directories with roles and avatars strengthen interpersonal bonds',
            'Effect was strongest for teams of 5-15 members; very large groups diluted the effect',
          ],
        },
      },
      {
        title: 'Referral Program: Individual Reward vs Mutual Benefit',
        hypothesis:
          'Mutual benefit referrals (both parties rewarded) will outperform referrer-only rewards',
        controlVersion: {
          description:
            'Referral program: "Refer a friend and get $20 credit." Only the referrer benefits.',
          metrics: {
            conversionRate: '8.2%',
            clickThroughRate: '15%',
          },
        },
        treatmentVersion: {
          description:
            'Mutual benefit referral: "You and your friend both get $15 credit." Both parties benefit, framed as group inclusion.',
          metrics: {
            conversionRate: '14.7%',
            clickThroughRate: '28%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Mutual benefit referrals nearly doubled conversion. Referrers felt they were sharing a privilege rather than exploiting a friend, and referred users felt welcomed into a community rather than used as a transaction.',
          learnings: [
            'Mutual rewards reframe referral from transaction to group inclusion',
            'Referrers were more comfortable sharing when their friend also benefited',
            'Referred users had 23% higher 90-day retention than self-acquired users',
            'The act of extending group benefits strengthened the referrer\'s own identification with the product',
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
        name: 'Membership Badges and Tier Indicators',
        description:
          'Visual markers distinguishing members from non-members or between membership levels',
        howToSpot:
          'Look for badges, colored borders, special icons, or tier labels next to usernames or in profile areas',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Gated Content Indicators',
        description:
          'Visual signals that content or features are restricted to certain groups',
        howToSpot:
          'Look for lock icons, "Members Only" labels, blurred previews, or upgrade prompts on content',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Group-Specific Branding',
        description:
          'Custom colors, logos, or themes applied to team or community spaces',
        howToSpot:
          'Check for team-colored accents, custom avatars, group logos, or personalized workspace themes',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Exclusive Benefit Callouts',
        description:
          'Prominent messaging about benefits available only to group members',
        howToSpot:
          'Look for "Prime members get...", "Exclusive for Gold tier", or "Members save X%" messaging',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Shared Identity Signals',
        description:
          'UI elements that surface shared group membership between users',
        howToSpot:
          'Look for "You both attended...", "3 mutual connections in...", or "Fellow member" indicators',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Tiered Access Pattern',
        description: 'Features, content, or capabilities unlocked progressively based on membership level',
        indicators: [
          'Lock icons on features with "Upgrade to unlock" prompts',
          'Tier comparison tables showing escalating benefits',
          'Progress bars toward next membership level',
          'Clear differentiation between free and premium experiences',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Referral Loop Pattern',
        description: 'Mechanisms that reward existing members for bringing in new members',
        indicators: [
          'Referral code or link sharing features',
          'Mutual benefit reward messaging',
          'Referral progress tracking and leaderboards',
          'Social sharing prompts tied to membership benefits',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Community Identity Pattern',
        description: 'Design elements that reinforce shared group identity among members',
        indicators: [
          'Team or group branding (colors, logos, names)',
          'Member directories and role hierarchies',
          'Group activity feeds and shared dashboards',
          'Exclusive communication channels for members',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Preferential Treatment Pattern',
        description: 'Differential service quality based on group membership',
        indicators: [
          'Priority queues or support for members',
          'Early access to features, sales, or content',
          'Enhanced capabilities for paying members',
          'Different UI experiences for members vs non-members',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are there visible membership tiers that distinguish user groups?',
      'Does the design create clear ingroup/outgroup boundaries?',
      'Are certain features or content restricted by group membership?',
      'Is there a referral system that rewards bringing in new members?',
      'Do visual elements (badges, colors, borders) signal membership status?',
      'Are community rules applied equally across membership levels?',
      'Does the design surface shared group identity between users?',
      'Is there a clear and fair path from non-member to member?',
      'Could the group dynamics foster outgroup hostility or discrimination?',
      'Are non-members given a valuable experience, or are they deliberately punished?',
      'Does membership-gated content serve users or just extract revenue?',
      'Are there safeguards against ingroup favoritism in moderation or governance?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in ingroup favoritism and social identity theory.

Analyze the provided design for ingroup favoritism patterns. Identify:

1. **Group Boundaries**: How the design creates or reinforces ingroup/outgroup distinctions
2. **Preferential Treatment**: Differences in features, access, or experience based on group membership
3. **Identity Signals**: Visual and interactive elements that signal shared group membership
4. **Inclusion Mechanics**: How new users are invited into groups and what barriers exist
5. **Outgroup Impact**: How non-members or outgroup members are treated

For each pattern found:
- Identify the groups being created and the benefits allocated to each
- Assess whether preferential treatment is proportionate and justified
- Determine if group dynamics could foster exclusion or hostility
- Evaluate whether non-members have a fair path to membership
- Suggest improvements for ethical group-based design

Consider:
- Is the design creating genuine community or artificial tribalism?
- Are membership benefits proportionate to membership cost?
- Could group dynamics lead to discrimination or harassment?
- Are moderation and governance applied equally across groups?
- Does the design foster healthy competition or destructive rivalry?

Provide actionable recommendations for ethical, inclusive use of group identity in design.`,

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
              ingroupBenefits: { type: 'string' },
              outgroupImpact: { type: 'string' },
              fairnessAssessment: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'ingroupBenefits',
              'outgroupImpact',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            inclusionScore: { type: 'number' },
            fairnessScore: { type: 'number' },
            communityHealth: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'inclusionScore',
            'fairnessScore',
            'communityHealth',
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
        title: 'Define Meaningful Group Boundaries',
        description:
          'Establish groups based on genuine shared interests, goals, or roles rather than arbitrary distinctions',
        example:
          'Create team workspaces around projects or departments, not random assignments',
        tips: [
          'Groups should reflect real user needs and relationships',
          'Avoid creating divisions that serve only business metrics',
          'Consider whether the group distinction adds genuine value to members',
        ],
      },
      {
        step: 2,
        title: 'Design Proportionate Benefits',
        description:
          'Ensure membership benefits are proportionate to the cost or commitment of joining',
        example:
          'Premium members who pay $20/month get early access and priority support, not just a badge',
        tips: [
          'Map specific benefits to specific membership levels',
          'Ensure core functionality remains accessible to all users',
          'Make the value proposition clear and honest',
        ],
      },
      {
        step: 3,
        title: 'Create Clear Paths to Membership',
        description:
          'Ensure non-members understand how to join and can see a realistic path to membership',
        example:
          'Show progress toward membership milestones: "Complete 3 more projects to unlock Gold tier"',
        tips: [
          'Avoid gatekeeping that feels arbitrary or punitive',
          'Communicate membership requirements transparently',
          'Celebrate milestones on the path to membership',
        ],
      },
      {
        step: 4,
        title: 'Monitor Outgroup Impact',
        description:
          'Regularly assess how non-members and outgroup users experience the product',
        example:
          'Survey non-members: "Do you feel excluded?" Track conversion vs abandonment rates for gated content',
        tips: [
          'Track metrics for both members and non-members separately',
          'Watch for signs of resentment or hostility toward outgroup users',
          'Ensure the non-member experience is still valuable and respectful',
        ],
      },
      {
        step: 5,
        title: 'Enforce Equal Governance',
        description:
          'Apply community rules, moderation standards, and policies consistently across all groups',
        example:
          'Same violation triggers same consequences regardless of membership tier or tenure',
        tips: [
          'Document and publish moderation standards',
          'Use blind moderation where possible',
          'Audit moderation decisions for group-based bias',
        ],
      },
    ],

    dos: [
      'Create groups around genuine shared interests, goals, or professional contexts',
      'Offer meaningful benefits that justify the cost or commitment of membership',
      'Provide clear, achievable paths from non-member to member',
      'Design referral programs that benefit both referrer and referee equally',
      'Surface shared group membership as a trust signal in professional contexts',
      'Allow users to belong to multiple groups simultaneously',
      'Foster inter-group collaboration alongside healthy competition',
      'Apply community rules consistently across all membership levels',
    ],

    donts: [
      'Don\'t deliberately degrade the non-member experience to pressure upgrades',
      'Don\'t create arbitrary groups with no genuine shared purpose',
      'Don\'t allow membership status to override community standards or moderation',
      'Don\'t foster outgroup hostility or encourage tribalistic competition',
      'Don\'t make membership requirements opaque or unreachable',
      'Don\'t use FOMO-driven language to pressure membership purchases',
      'Don\'t apply different rules or leniency based on membership tier',
      'Don\'t lock essential functionality behind membership paywalls',
    ],

    bestPractices: [
      {
        title: 'Aspirational, Not Punitive Exclusivity',
        description:
          'Design membership to make non-members aspire to join, not feel punished for not being members',
        rationale:
          'Punitive exclusion creates resentment and churn; aspirational exclusivity drives organic conversion',
        example:
          'Show a preview of members-only content with "Join to see more" rather than blurring content with "UPGRADE NOW!"',
      },
      {
        title: 'Mutual-Benefit Referrals',
        description:
          'Design referral programs where both the referrer and the new member receive equal benefits',
        rationale:
          'Mutual rewards reframe referral as sharing group membership rather than exploiting friends for personal gain',
        example:
          '"You and your friend both get 1 month free" instead of "Refer a friend and YOU get $20"',
      },
      {
        title: 'Cross-Group Bridges',
        description:
          'Design interactions that bring different groups together around shared goals',
        rationale:
          'Reducing outgroup hostility while maintaining healthy ingroup identity leads to more sustainable communities',
        example:
          'Cross-team challenges, inter-community events, or shared spaces where different groups collaborate',
      },
      {
        title: 'Transparent Tier Progression',
        description:
          'Show users exactly where they stand, what they need to do to advance, and what benefits await',
        rationale:
          'Transparency builds trust and motivation; opaque systems feel manipulative',
        example:
          'Progress bar showing "75% to Gold tier" with clear list of benefits at each level',
      },
      {
        title: 'Consistent Governance',
        description:
          'Apply rules, moderation, and policies equally regardless of membership status',
        rationale:
          'Unequal enforcement corrodes trust and drives away new users who feel treated unfairly',
        example:
          'Same violation, same consequence, whether the user is a founding member or joined yesterday',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Membership status and tier information must be programmatically determinable',
        implementation:
          'Use ARIA labels and semantic HTML to convey membership badges, tier levels, and gated content status to screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to indicate membership tier or group identity',
        implementation:
          'Combine tier colors with text labels, icons, and patterns so colorblind users can distinguish membership levels',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label members-only sections and gated content',
        implementation:
          'Use descriptive headings like "Members-Only Resources" and provide clear context for why content is restricted',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for membership enrollment and tier advancement',
        implementation:
          'Membership requirements, benefits, and enrollment flows must be clearly labeled and navigable by keyboard and screen reader',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Exclusion',
        severity: 'critical',
        explanation:
          'Deliberately degrading the non-member experience to coerce upgrades rather than creating genuine membership value',
        mitigation:
          'Ensure core functionality is valuable for all users. Membership should add value, not remove artificial restrictions.',
      },
      {
        concern: 'Outgroup Discrimination',
        severity: 'critical',
        explanation:
          'Ingroup favoritism features can encourage hostility, harassment, or discrimination toward non-members or competing groups',
        mitigation:
          'Monitor cross-group interactions, enforce anti-harassment policies equally, and design features that reward collaboration over antagonism.',
      },
      {
        concern: 'Unequal Moderation',
        severity: 'high',
        explanation:
          'Applying different standards or consequences based on membership status creates a two-tier justice system',
        mitigation:
          'Implement blind moderation, publish clear standards, and audit decisions for membership-based bias.',
      },
      {
        concern: 'Exploiting Belonging Needs',
        severity: 'high',
        explanation:
          'Using humans\' deep need for belonging to extract excessive payments or lock users into ecosystems',
        mitigation:
          'Price membership fairly, allow easy cancellation, and don\'t weaponize community pressure to prevent churn.',
      },
      {
        concern: 'Reinforcing Real-World Bias',
        severity: 'critical',
        explanation:
          'Digital group features can amplify real-world discrimination based on race, gender, class, or other protected characteristics',
        mitigation:
          'Audit group formation patterns for demographic bias, ensure diverse representation in featured groups, and prevent groups organized around exclusionary identities.',
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
          'The foundational minimal group paradigm experiments demonstrating that mere categorization triggers intergroup discrimination and ingroup favoritism',
        type: 'foundational',
      },
      {
        title: 'In-group bias in the minimal intergroup situation: A cognitive-motivational analysis',
        author: 'Brewer, M. B.',
        year: 1979,
        doi: '10.1037/0033-2909.86.2.307',
        description:
          'Key analysis distinguishing ingroup favoritism from outgroup derogation, showing that bias primarily manifests as preferential treatment rather than active hostility',
        type: 'foundational',
      },
      {
        title: 'An Integrative Theory of Intergroup Conflict',
        author: 'Tajfel, H., & Turner, J. C.',
        year: 1979,
        description:
          'Foundational paper establishing Social Identity Theory, explaining how group membership shapes self-concept and drives intergroup behavior',
        type: 'foundational',
      },
      {
        title: 'The Psychology of Prejudice: Ingroup Love and Outgroup Hate?',
        author: 'Brewer, M. B.',
        year: 1999,
        doi: '10.1111/0022-4537.00126',
        description:
          'Demonstrates that ingroup favoritism is more about preferential allocation than outgroup hostility, with implications for reducing discrimination',
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
          'Comprehensive treatment of Social Identity Theory by its originator, covering minimal group paradigm, social categorization, and intergroup behavior',
        type: 'foundational',
      },
      {
        title: 'The Social Psychology of Intergroup Relations',
        author: 'Austin, W. G., & Worchel, S.',
        year: 1979,
        isbn: '9780818503344',
        description:
          'Classic collection covering the psychological mechanisms behind intergroup behavior including ingroup favoritism',
        type: 'foundational',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on social proof and group dynamics illustrates how ingroup favoritism drives compliance and persuasion',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Community: How Group Identity Shapes UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/community-ux/',
        description:
          'Practical UX guide on leveraging group identity in digital product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Minimal Group Paradigm',
        author: 'Sprouts Psychology',
        url: 'https://www.youtube.com/watch?v=KMes1f0Rj-M',
        description:
          'Animated explanation of Tajfel\'s minimal group experiments and their implications for understanding ingroup favoritism',
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
      'social-proof',       // Group membership signals influence others' behavior
      'bandwagon-effect',   // Popularity of a group drives more people to join
      'endowment-effect',   // Members overvalue their membership once they have it
      'sunk-cost-fallacy',  // Investment in group membership makes leaving harder
      'scarcity-bias',      // Limited membership slots increase perceived value
    ],

    conflicts: [
      'fundamental-attribution-error', // Ingroup favoritism grants charitable interpretations
      'just-world-hypothesis',         // Ingroup favoritism biases fairness judgments
    ],

    confusedWith: [
      'social-proof',       // Social proof is about following the crowd; ingroup favoritism is about preferring your group
      'halo-effect',        // Halo effect generalizes from one trait; ingroup favoritism generalizes from group membership
      'mere-exposure-effect', // Familiarity drives liking; ingroup favoritism drives preferential treatment
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'team-bias',
        'tribal-loyalty',
        'alumni-preference',
      ],
    },
  },
};
