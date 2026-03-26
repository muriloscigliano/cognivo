/**
 * CONFORMITY BIAS
 *
 * We change our behavior to match the group
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const conformityBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'conformity-bias',
    name: 'Conformity Bias',
    aliases: [],
    category: BiasCategory.SOCIAL,
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
    simple: 'We change our behavior to match the group',

    detailed: `Conformity bias is the tendency to adjust our behavior, opinions, and decisions to align with group norms and social expectations, even when those norms conflict with our personal judgment or beliefs. This bias is driven by two primary motivations: normative influence (the desire to be accepted and avoid social rejection) and informational influence (the assumption that the group possesses more knowledge than the individual).

In product design, conformity bias shapes how users interact with social features, collaborative tools, and community-driven platforms. Users tend to follow established patterns, adopt majority opinions, and align their behavior with visible group norms. This can be beneficial when it encourages adoption of best practices and consistent UI patterns, but harmful when it suppresses independent thought or creates echo chambers.

Designers must thoughtfully balance leveraging conformity to drive consistency and adoption against the ethical imperative to protect individual expression, enable dissent, and prevent groupthink in collaborative environments.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain adjusts behavior and thinking to match group norms due to social pressure, even against personal judgment. This happens because:

1. **Normative Influence**: Humans have a deep need for social acceptance and fear rejection, so they align with the majority to avoid standing out
2. **Informational Influence**: When uncertain, people look to others for cues about correct behavior, assuming the group knows better
3. **Social Identity**: People conform to signal membership in valued groups and reinforce their social identity
4. **Cognitive Ease**: Following established norms requires less cognitive effort than independently evaluating every decision
5. **Compliance Escalation**: Once initial conformity occurs, people rationalize their behavior and become more committed to the group position

The mechanism operates both consciously (strategic compliance) and unconsciously (internalized belief change), making it particularly powerful in shaping long-term behavior patterns.`,
    },

    realWorldExample: `In Solomon Asch's classic 1951 experiments, participants were asked to match line lengths — a trivially easy task. When confederates in the group unanimously gave obviously wrong answers, 75% of participants conformed to the incorrect group answer at least once, and the overall conformity rate was approximately 33%. Many participants reported knowing the answer was wrong but going along with the group to avoid standing out. This demonstrated the extraordinary power of group pressure even for clear, objective judgments.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Conformity bias profoundly affects how users interact with social features, collaborative tools, and community-driven platforms. Users naturally gravitate toward established patterns and majority positions. Designers can leverage this to:

- Enforce design system consistency and platform conventions across products
- Drive adoption of style guides, coding standards, and best practices
- Encourage participation through visible community standards and norms
- Guide user behavior through social indicators like ratings, votes, and usage counts
- Establish trust through familiar, platform-native interaction patterns`,

    whenToUse: [
      {
        title: 'Design System Adoption',
        scenario:
          'When encouraging teams to follow established component libraries and patterns',
        example:
          'Show adoption metrics ("94% of teams use this component") and highlight teams that follow the design system',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Platform Convention Alignment',
        scenario: 'When building apps that should feel native to iOS, Android, or web',
        example:
          'Follow Human Interface Guidelines or Material Design so users encounter familiar patterns that match their expectations',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Community Standards Enforcement',
        scenario: 'When establishing norms for content quality and behavior in community platforms',
        example:
          'Display community guidelines prominently and show that most users follow them: "98% of posts meet our quality standards"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Best Practices',
        scenario: 'When guiding new users toward effective usage patterns',
        example:
          'Show how most successful users set up their profiles or configure their workspace to encourage similar behavior',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Consistent UI Patterns',
        scenario: 'When users need to learn new features quickly',
        example:
          'Use familiar navigation patterns, button placements, and interaction models that match what users expect from similar tools',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Voting Before Discussion',
        reason:
          'Public voting before open discussion forces premature conformity to early votes',
        consequence:
          'Later participants align with early votes rather than sharing independent opinions, producing biased results',
        alternative:
          'Collect anonymous votes first, then reveal results and open discussion, or use blind voting mechanisms',
      },
      {
        title: 'Peer Pressure in Collaborative Decisions',
        reason:
          'Visible agreement indicators in collaborative tools can suppress dissent',
        consequence:
          'Team members withhold valid concerns to avoid being the lone dissenter, leading to groupthink',
        alternative:
          'Provide anonymous feedback channels, private ideation phases, and structured disagreement protocols',
      },
      {
        title: 'Public Endorsement Displays',
        reason:
          'Showing who liked, approved, or endorsed content before others evaluate it creates bandwagon pressure',
        consequence:
          'Users agree with popular or senior opinions rather than forming independent judgments',
        alternative:
          'Hide endorsement counts during evaluation periods, or show them only after the user has provided their own input',
      },
      {
        title: 'Creative or Innovative Contexts',
        reason:
          'Conformity pressure suppresses novel ideas and creative thinking',
        consequence:
          'Teams converge on safe, conventional solutions rather than exploring innovative approaches',
        alternative:
          'Use brainwriting, anonymous ideation, and structured divergent-thinking exercises before convergence',
      },
    ],

    commonMistakes: [
      {
        title: 'Showing Vote Counts Before User Votes',
        description:
          'Displaying how many people liked, upvoted, or agreed with something before the user makes their own choice',
        why: 'Users anchor to the visible majority opinion and suppress their independent judgment',
        fix: 'Hide aggregate counts until after the user has submitted their own response, then reveal community sentiment',
      },
      {
        title: 'Mandatory Public Feedback',
        description:
          'Requiring all feedback, reviews, or opinions to be publicly attributed with names and avatars',
        why: 'Users self-censor and conform to perceived group norms when their identity is visible',
        fix: 'Offer anonymous feedback options alongside public ones, especially for critical or dissenting opinions',
      },
      {
        title: 'Uniformity Over Usability',
        description:
          'Enforcing design consistency so rigidly that unique user needs or use cases are ignored',
        why: 'Treating conformity as an absolute rule rather than a guideline stifles necessary adaptation',
        fix: 'Build flexible design systems with clear extension points and documented variance patterns',
      },
      {
        title: 'Ignoring Minority Perspectives',
        description:
          'Designing interfaces that only surface majority opinions and hide dissenting views',
        why: 'Minority voices often carry important information; suppressing them creates dangerous blind spots',
        fix: 'Actively surface diverse perspectives, highlight thoughtful dissenting opinions, and create space for minority views',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout establishes visual norms that signal expected behavior and interaction patterns',
        examples: [
          'Consistent navigation placement creates strong conformity expectations',
          'Grid-based layouts with familiar card patterns signal how content should be consumed',
          'Prominent placement of community activity feeds reinforces group norms',
          'Sidebar chat or comment panels make social signals constantly visible',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography conventions create expectations for content hierarchy and tone',
        examples: [
          'Consistent heading styles across a platform create a unified voice users conform to',
          'Style guides for user-generated content establish writing norms',
          'Formatting templates for posts or comments signal expected quality',
          'Consistent label text ("Agree", "Approve") shapes participation norms',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color systems create associations and signal group identity',
        examples: [
          'Brand colors create community identity and belonging',
          'Status indicators (green for approved, red for rejected) establish social norms around quality',
          'Highlighting popular or trending items with accent colors amplifies conformity pressure',
          'Consistent color usage across platform features creates expectation of uniformity',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns directly mediate social influence and group pressure',
        examples: [
          'Like and upvote buttons with visible counts create immediate conformity pressure',
          'Real-time typing indicators in chat show others are watching, increasing self-censorship',
          'Public reaction emoji on messages signal expected emotional responses',
          'Follow/subscribe counts influence whether users join communities',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content presentation determines which group norms are visible and influential',
        examples: [
          'Sorting by "most popular" amplifies majority opinions and suppresses minority views',
          'Displaying user counts ("10,000 people are doing this") creates normative pressure',
          'Trending sections establish what the group considers important',
          'Community guidelines and "what others are doing" sections set behavioral expectations',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility standards themselves rely on conformity to established patterns and conventions',
        examples: [
          'Following WCAG conventions ensures predictable interactions for assistive technology users',
          'Consistent ARIA patterns across components create reliable screen reader experiences',
          'Standard keyboard navigation patterns (Tab, Enter, Escape) depend on conformity to conventions',
          'Focus management following established patterns ensures users with disabilities can navigate predictably',
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
        title: 'Platform-Native Design Patterns',
        description:
          'Mobile app following iOS Human Interface Guidelines for familiar, expected interactions',
        code: `<div class="ios-nav-bar">
  <button class="back-button">
    <span class="chevron">&#8249;</span> Back
  </button>
  <h1 class="nav-title">Settings</h1>
  <button class="action-button">Done</button>
</div>

<div class="settings-list">
  <div class="setting-group">
    <div class="setting-row">
      <span class="setting-label">Notifications</span>
      <label class="toggle-switch">
        <input type="checkbox" checked>
        <span class="slider"></span>
      </label>
    </div>
    <div class="setting-row">
      <span class="setting-label">Dark Mode</span>
      <span class="chevron-right">&#8250;</span>
    </div>
  </div>
</div>`,
        explanation:
          'By conforming to iOS navigation patterns (back chevron, centered title, toggle switches, grouped list rows), users instantly know how to interact with the app. Familiarity reduces cognitive load and builds trust.',
        principle:
          'Conforming to platform conventions leverages existing mental models for faster adoption',
        metrics: {
          before: '45% task completion on first attempt with custom navigation',
          after: '89% task completion on first attempt with platform-native patterns',
          improvement: '98% increase in first-attempt task success',
        },
      },
      {
        title: 'Design System Adoption Dashboard',
        description:
          'Internal tool showing team adoption of shared component library',
        code: `<section class="adoption-dashboard">
  <h2>Component Library Adoption</h2>

  <div class="adoption-stats">
    <div class="stat-card">
      <span class="stat-number">94%</span>
      <span class="stat-label">Teams using shared components</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">2,847</span>
      <span class="stat-label">Component instances in production</span>
    </div>
  </div>

  <div class="team-leaderboard">
    <h3>Teams Leading Adoption</h3>
    <div class="team-row"><span>Platform Team</span><span>100%</span></div>
    <div class="team-row"><span>Commerce Team</span><span>97%</span></div>
    <div class="team-row"><span>Growth Team</span><span>91%</span></div>
  </div>

  <p class="encouragement">Join 47 teams already using the shared system</p>
</section>`,
        explanation:
          'Showing high adoption rates and a leaderboard leverages conformity bias to encourage remaining teams to adopt the design system. Teams see that non-adoption is the exception, not the norm.',
        principle:
          'Visible adoption metrics create positive conformity pressure toward consistency',
      },
      {
        title: 'Anonymous Feedback Before Group Discussion',
        description:
          'Collaborative tool collecting independent input before revealing group opinions',
        code: `<div class="feedback-flow">
  <!-- Phase 1: Independent Input -->
  <div class="phase active">
    <h3>Step 1: Share Your Perspective</h3>
    <p class="instruction">Your response is private until everyone submits</p>
    <textarea placeholder="What do you think about this proposal?"></textarea>
    <button class="primary">Submit Anonymously</button>
    <p class="status">7 of 12 team members have submitted</p>
  </div>

  <!-- Phase 2: Revealed after all submit -->
  <div class="phase locked">
    <h3>Step 2: Review All Perspectives</h3>
    <p class="locked-message">Unlocks after all team members submit</p>
  </div>

  <!-- Phase 3: Discussion -->
  <div class="phase locked">
    <h3>Step 3: Group Discussion</h3>
    <p class="locked-message">Unlocks after review phase</p>
  </div>
</div>`,
        explanation:
          'By collecting anonymous opinions before revealing them, this design prevents early responses from anchoring the group. Each person gives their honest assessment without conformity pressure, leading to more diverse and authentic input.',
        principle:
          'Separating independent input from group discussion protects against premature conformity',
        metrics: {
          before: '23% of team members shared dissenting views in open discussion',
          after: '61% shared dissenting views through anonymous-first process',
          improvement: '165% increase in diverse perspectives surfaced',
        },
      },
    ],

    bad: [
      {
        title: 'Public Voting Before Discussion',
        description:
          'Team tool showing real-time vote counts as people vote on proposals',
        code: `<!-- DON'T DO THIS -->
<div class="proposal-vote">
  <h3>Should we migrate to the new framework?</h3>

  <div class="vote-options">
    <button class="vote-yes">
      <span class="count">8</span> Yes, migrate
      <div class="voter-avatars">
        <img src="cto.jpg" alt="CTO" title="Sarah (CTO)">
        <img src="lead.jpg" alt="Tech Lead" title="Mike (Tech Lead)">
        <!-- more avatars... -->
      </div>
    </button>
    <button class="vote-no">
      <span class="count">1</span> No, stay current
      <div class="voter-avatars">
        <img src="junior.jpg" alt="Junior Dev" title="Alex (Junior Dev)">
      </div>
    </button>
  </div>

  <p class="prompt">Cast your vote!</p>
</div>`,
        explanation:
          'Showing vote counts, senior titles, and avatars before everyone has voted creates massive conformity pressure. Remaining voters see that the CTO and Tech Lead voted yes, making them unlikely to dissent. The lone "No" voter is publicly exposed.',
        principle:
          'Never show vote counts, voter identities, or seniority signals during active voting',
      },
      {
        title: 'Visible Like Counts Pressuring Agreement',
        description:
          'Discussion forum where like counts and endorser names are visible before users form their own opinion',
        code: `<!-- DON'T DO THIS -->
<div class="discussion-post">
  <div class="post-header">
    <img src="manager.jpg" alt="Manager">
    <span class="author">Director of Engineering</span>
  </div>
  <p>"I think we should standardize on React for all projects."</p>
  <div class="engagement">
    <span class="likes">
      <strong>47 likes</strong> including VP of Product, CTO, and 3 other leaders
    </span>
    <span class="comments">12 comments (all supportive)</span>
  </div>
  <div class="reply-box">
    <textarea placeholder="Add your comment..."></textarea>
    <p class="note">Your response will be visible to all 200 team members</p>
  </div>
</div>`,
        explanation:
          'Displaying high like counts from senior leaders before users respond creates extreme conformity pressure. The note about visibility to 200 members further discourages dissent. Anyone with a different perspective will self-censor.',
        principle:
          'High-authority endorsements with visible counts suppress independent thinking in collaborative tools',
      },
      {
        title: 'Peer Pressure Subscription Nudge',
        description:
          'SaaS tool showing colleague activity to pressure adoption',
        code: `<!-- DON'T DO THIS -->
<div class="upgrade-modal">
  <h2>Your Team Is Leaving You Behind!</h2>
  <div class="colleague-list">
    <p><strong>Sarah</strong> upgraded to Pro 2 hours ago</p>
    <p><strong>Mike</strong> upgraded to Pro yesterday</p>
    <p><strong>Jessica</strong> upgraded to Pro last week</p>
  </div>
  <p class="pressure">You're the ONLY person on your team still on Free.</p>
  <p class="shame">Don't be the bottleneck.</p>
  <button class="urgent">Upgrade Now to Keep Up</button>
</div>`,
        explanation:
          'This uses conformity bias manipulatively by explicitly shaming the user for not conforming. Revealing specific colleague actions and framing the user as a "bottleneck" creates social pressure that exploits the fear of being different.',
        principle:
          'Never weaponize conformity bias to shame users into purchasing decisions',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Human Interface Guidelines',
        url: 'https://developer.apple.com/design/human-interface-guidelines/',
        description: 'Apple enforces strict conformity through HIG, ensuring all iOS apps share consistent navigation patterns, gestures, and visual language. Apps that deviate are rejected from the App Store, creating a powerful conformity mechanism that benefits users through predictability.',
        effectiveness: 'very-effective',
        analysis: 'Apple leverages conformity bias at the ecosystem level: developers conform to HIG, users develop strong mental models, and the consistency creates a premium experience. The enforcement mechanism (App Store review) ensures compliance, and the result is that users can switch between apps with minimal learning curve.',
      },
      {
        company: 'Instagram',
        product: 'Visual Aesthetic Culture',
        url: 'https://www.instagram.com',
        description: 'Instagram created conformity around visual aesthetics — specific color palettes, composition styles, and filter choices become "the norm." Users conform to trending aesthetic styles (flat lay, golden hour, minimalist) to gain social approval through likes and follows.',
        effectiveness: 'effective',
        analysis: 'Instagram demonstrates both positive and negative conformity: it raised visual quality standards but also created pressure to present an idealized, homogeneous version of life. The visible like counts (before they were optionally hidden) amplified conformity pressure significantly.',
      },
      {
        company: 'Reddit',
        product: 'Upvote/Downvote System',
        url: 'https://www.reddit.com',
        description: 'Reddit\'s visible vote counts create strong conformity effects. Highly upvoted comments attract more upvotes (bandwagon effect), while downvoted comments get further downvoted. Early votes disproportionately determine final scores, and users self-censor to avoid downvotes.',
        effectiveness: 'somewhat-effective',
        analysis: 'Reddit illustrates conformity bias as a double-edged sword. The system surfaces popular content efficiently, but creates echo chambers and suppresses minority viewpoints. Reddit experimented with hiding scores for a period after posting to reduce conformity bias, showing awareness of the problem.',
      },
      {
        company: 'Figma',
        product: 'Design System Libraries',
        url: 'https://www.figma.com',
        description: 'Figma enables design conformity through shared component libraries. When a team publishes a library, all members see update notifications and adoption rates. The tool makes conformity to the design system the path of least resistance.',
        effectiveness: 'very-effective',
        analysis: 'Figma leverages positive conformity by making the design system the easiest option. Auto-layout, shared styles, and component overrides create a system where conforming is easier than deviating. This leads to genuine consistency improvements without heavy-handed enforcement.',
      },
    ],

    abTests: [
      {
        title: 'Anonymous vs Public Feedback Collection',
        hypothesis:
          'Anonymous feedback before revealing group sentiment will produce more diverse and honest responses',
        controlVersion: {
          description:
            'Standard discussion thread where comments are public, names are shown, and previous responses are visible before contributing',
          metrics: {
            conversionRate: '34%',
            scrollDepth: '55%',
            uniquePerspectives: '3 distinct viewpoints',
          },
        },
        treatmentVersion: {
          description:
            'Anonymous-first collection where each person submits independently, then all responses are revealed simultaneously for discussion',
          metrics: {
            conversionRate: '78%',
            scrollDepth: '82%',
            uniquePerspectives: '8 distinct viewpoints',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Anonymous-first collection more than doubled participation (78% vs 34%) and surfaced 167% more unique viewpoints. Critically, 3 of the anonymous perspectives directly contradicted the manager\'s position — perspectives that never appeared in the public version.',
          learnings: [
            'Conformity pressure in public forums suppresses over 60% of unique perspectives',
            'Anonymous collection is especially impactful when authority figures participate',
            'The quality of discussion improved after reveal, because diverse starting points generated richer debate',
            'Junior team members showed the largest increase in participation with anonymous-first design',
          ],
        },
      },
      {
        title: 'Hidden vs Visible Vote Counts on Feature Requests',
        hypothesis:
          'Hiding vote counts until after a user votes will lead to more varied voting patterns',
        controlVersion: {
          description:
            'Feature request board showing current vote counts and top voter names before users cast their vote',
          metrics: {
            conversionRate: '62%',
            clickThroughRate: '45%',
            voteDistribution: '80% of votes on top 3 items',
          },
        },
        treatmentVersion: {
          description:
            'Feature request board where vote counts are hidden until the user submits their own vote; afterwards, community votes are revealed',
          metrics: {
            conversionRate: '71%',
            clickThroughRate: '68%',
            voteDistribution: '55% of votes on top 3 items',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Hiding vote counts reduced bandwagon voting significantly. The top 3 items received 55% of votes (vs 80%), revealing a much flatter, more representative distribution of user preferences. Product teams gained better signal about true user priorities.',
          learnings: [
            'Visible vote counts create a strong bandwagon effect where popular items get more popular',
            'Hidden counts led to 2 feature requests entering the top 5 that never appeared there in the control',
            'Users reported feeling more empowered and listened-to in the hidden-count version',
            'The data quality improvement helped product teams make better prioritization decisions',
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
        name: 'Public Agreement Counters',
        description:
          'Visible like counts, upvote tallies, or approval indicators shown before users form their own opinion',
        howToSpot:
          'Look for numeric counters next to content (thumbs up, hearts, upvote arrows) that are visible before user interaction',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Social Proof Badges',
        description:
          'Labels showing how many people chose an option, follow a trend, or adopted a behavior',
        howToSpot:
          'Check for "X people chose this", "Most Popular", "Trending", or "N users recommend" badges',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Authority Endorsement Displays',
        description:
          'Showing names, titles, or avatars of high-status individuals who endorsed or chose something',
        howToSpot:
          'Look for "Recommended by [Title]", executive avatars next to choices, or "endorsed by leadership" signals',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Uniformity Indicators',
        description:
          'Visual signals that everyone is doing the same thing, creating pressure to conform',
        howToSpot:
          'Check for leaderboards, adoption dashboards, "everyone is using" messaging, or compliance percentages',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Public Identity Attribution',
        description:
          'User names, photos, or titles displayed alongside feedback, votes, or opinions',
        howToSpot:
          'Check if opinions, votes, or feedback are attributed with names, avatars, or job titles rather than being anonymous',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Bandwagon Display Pattern',
        description: 'Prominently showing that the majority has chosen a particular option, creating pressure to join',
        indicators: [
          'Vote or like counts visible before user participates',
          '"Most Popular" or "Best Seller" labels based on user behavior',
          'Real-time activity feeds showing others\' choices',
          'Percentage bars showing majority preference',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Social Pressure Voting Pattern',
        description: 'Voting or feedback systems where individual choices are publicly visible, discouraging dissent',
        indicators: [
          'Public voting with visible voter identities',
          'Named endorsements or approvals',
          'Sequential public feedback (later responses influenced by earlier ones)',
          'Visible "who agreed" lists',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Conformity Enforcement Pattern',
        description: 'Design systems or platforms that enforce uniformity through metrics, scoring, or compliance tracking',
        indicators: [
          'Compliance dashboards showing adoption percentages',
          'Deviation warnings or alerts when users diverge from norms',
          'Automated enforcement of style guides or templates',
          'Team leaderboards ranked by conformity',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Echo Chamber Pattern',
        description: 'Content sorting and display that amplifies majority opinions and hides minority views',
        indicators: [
          'Sort by "most popular" as default',
          'Downvoted or low-engagement content hidden or collapsed',
          'Recommendation algorithms favoring majority preferences',
          'No mechanism to surface dissenting or minority perspectives',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are vote counts, like counts, or approval numbers visible before users form their own opinion?',
      'Can users provide feedback anonymously, or is attribution always required?',
      'Are high-authority endorsements (executives, influencers) prominently displayed alongside choices?',
      'Does the interface sort by popularity as default, potentially creating bandwagon effects?',
      'Is there a mechanism for dissent or minority perspectives to be heard?',
      'Are collaborative decisions preceded by independent input collection?',
      'Do adoption dashboards or compliance metrics create pressure to conform rather than think independently?',
      'Are users told "everyone is doing X" in ways that suppress alternative approaches?',
      'Is platform convention conformity benefiting users or just enforcing rigidity?',
      'Are there private channels for feedback that might differ from the group consensus?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in conformity bias and social influence.

Analyze the provided design for conformity bias patterns. Identify:

1. **Social Pressure Indicators**: Visible vote counts, like tallies, or agreement displays that influence user opinions
2. **Public vs Private Input**: Whether users can provide anonymous feedback or if all input is publicly attributed
3. **Authority Conformity**: How endorsements from high-status individuals affect group behavior
4. **Platform Conformity**: Adherence to platform conventions and design system patterns
5. **Echo Chamber Risk**: Whether design amplifies majority opinions while suppressing minority views

For each pattern found:
- Identify the type and location of conformity pressure
- Assess whether it helps users (positive conformity) or suppresses independent thought (negative conformity)
- Determine if there are mechanisms to protect dissent and minority perspectives
- Evaluate whether anonymous alternatives exist for sensitive decisions
- Suggest improvements for balancing consistency with independent expression

Consider:
- Is the design leveraging conformity to help users (familiar patterns) or to manipulate them (social pressure)?
- Are collaborative features collecting independent input before revealing group opinions?
- Do visible vote counts or endorsements create bandwagon effects?
- Are minority perspectives given adequate visibility?
- Is there a healthy balance between consistency and individual expression?

Provide actionable recommendations for ethical use of conformity while protecting independent thought.`,

    outputSchema: {
      type: 'object',
      properties: {
        conformityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              conformityType: { type: 'string' },
              pressure: { type: 'string' },
              protectsIndependence: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'conformityType',
              'pressure',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            socialPressure: { type: 'number' },
            independenceProtection: { type: 'number' },
            platformConformity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'socialPressure',
            'independenceProtection',
            'platformConformity',
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
        'conformityPatterns',
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
        title: 'Identify Conformity Points',
        description:
          'Map all locations in your product where social influence or group norms affect user behavior',
        example:
          'Audit: voting features, comment systems, collaborative tools, onboarding flows, adoption dashboards',
        tips: [
          'Look for anywhere users can see what others have chosen or think',
          'Identify places where authority figures\' opinions are visible',
          'Map collaborative decision-making flows and their visibility settings',
        ],
      },
      {
        step: 2,
        title: 'Classify as Positive or Negative Conformity',
        description:
          'Determine which conformity pressures help users and which suppress independent thought',
        example:
          'Positive: following platform navigation conventions. Negative: public voting before discussion.',
        tips: [
          'Positive conformity reduces cognitive load through familiar patterns',
          'Negative conformity suppresses dissent and creates groupthink',
          'Consider whether the conformity serves users or just serves the platform',
        ],
      },
      {
        step: 3,
        title: 'Protect Independent Input',
        description:
          'For decisions requiring honest opinions, ensure anonymous or private input before revealing group sentiment',
        example:
          'Use anonymous-first feedback: collect all responses privately, then reveal them simultaneously',
        tips: [
          'Hide vote counts until after user submits their own vote',
          'Offer anonymous options for sensitive feedback',
          'Separate ideation from evaluation in collaborative workflows',
        ],
      },
      {
        step: 4,
        title: 'Leverage Positive Conformity Thoughtfully',
        description:
          'Use conformity for consistency and best-practice adoption without creating rigid uniformity',
        example:
          'Show design system adoption rates to encourage consistency, but provide clear extension mechanisms',
        tips: [
          'Make the conforming path the easiest path (good defaults)',
          'Show adoption metrics to encourage best practices',
          'Build flexibility into systems so necessary deviations are supported',
        ],
      },
      {
        step: 5,
        title: 'Surface Minority Perspectives',
        description:
          'Actively create mechanisms for diverse viewpoints to be heard and valued',
        example:
          'Add a "Dissenting View" section in decision documents; sort by "most thoughtful" not just "most popular"',
        tips: [
          'Don\'t default to sorting by popularity alone',
          'Create UI space for alternative perspectives',
          'Reward quality of contribution, not just agreement with majority',
        ],
      },
    ],

    dos: [
      'Follow established platform conventions to leverage users\' existing mental models',
      'Use design system consistency to reduce cognitive load and increase predictability',
      'Collect anonymous feedback before revealing group opinions in collaborative contexts',
      'Hide vote counts until after user participation to prevent bandwagon effects',
      'Provide anonymous feedback channels for sensitive or critical opinions',
      'Surface and value minority perspectives alongside majority views',
      'Make design system adoption easy and rewarding rather than forced',
      'Test collaborative features for conformity pressure and groupthink risk',
    ],

    donts: [
      'Don\'t show vote counts or approval indicators before users form independent opinions',
      'Don\'t display authority figures\' choices prominently to pressure others into agreement',
      'Don\'t require all feedback to be publicly attributed with names and titles',
      'Don\'t sort exclusively by popularity, which creates echo chambers',
      'Don\'t shame users for deviating from the majority choice',
      'Don\'t use conformity pressure to drive purchasing decisions',
      'Don\'t enforce design consistency so rigidly that legitimate use-case variations are impossible',
      'Don\'t hide mechanisms for dissent or minority perspectives',
    ],

    bestPractices: [
      {
        title: 'Anonymous-First Collaboration',
        description:
          'Collect independent input before revealing group sentiment in collaborative decision-making',
        rationale:
          'Independent input followed by group discussion produces more diverse perspectives and better decisions than open discussion alone',
        example:
          'Use blind voting or anonymous brainstorming before opening group discussion',
      },
      {
        title: 'Delayed Social Signals',
        description:
          'Hide vote counts, like tallies, and endorsements until after users provide their own input',
        rationale:
          'Early social signals create bandwagon effects that distort the true distribution of opinions',
        example:
          'Show "Vote to see results" instead of current tallies, then reveal counts after submission',
      },
      {
        title: 'Convention with Flexibility',
        description:
          'Follow platform conventions and design systems while providing documented escape hatches for edge cases',
        rationale:
          'Rigid uniformity breaks when legitimate exceptions arise; flexible systems maintain consistency where it matters while accommodating necessary variance',
        example:
          'Design system with clear variant patterns and documented guidelines for when and how to extend',
      },
      {
        title: 'Diverse Perspective Surfacing',
        description:
          'Actively design mechanisms to surface minority viewpoints alongside majority ones',
        rationale:
          'Minority opinions often carry critical information; suppressing them leads to groupthink and blind spots',
        example:
          'Add "Alternative View" highlights, sort options beyond popularity, and amplify thoughtful dissent',
      },
      {
        title: 'Measure Conformity Impact',
        description:
          'Track whether social features increase conformity at the expense of diversity of thought',
        rationale:
          'Without measurement, conformity pressure silently suppresses valuable perspectives',
        example:
          'Compare opinion diversity metrics before and after adding social features; A/B test anonymous vs public feedback',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure social influence indicators have semantic equivalents',
        implementation:
          'Use ARIA labels to convey vote counts, popularity badges, and social proof elements so screen reader users receive the same conformity cues as visual users',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Follow consistent patterns that users expect',
        implementation:
          'Maintain consistent component behavior and naming across the interface so users with cognitive disabilities can rely on established patterns',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for social features and voting',
        implementation:
          'Label voting, feedback, and collaborative sections clearly so all users understand the social context and can participate independently',
      },
    ],

    ethics: [
      {
        concern: 'Suppression of Dissent',
        severity: 'critical',
        explanation:
          'Design patterns that make it socially costly to disagree with the majority, such as public voting with identity attribution or visible endorsement from authority figures',
        mitigation:
          'Provide anonymous feedback options, collect independent input before group reveal, and create explicit mechanisms for dissenting views to be heard safely.',
      },
      {
        concern: 'Social Pressure Purchasing',
        severity: 'critical',
        explanation:
          'Using conformity bias to pressure users into purchases by showing colleague activity or shaming non-adoption',
        mitigation:
          'Never use colleague behavior or social pressure as a primary purchasing motivator. Focus on product value, not fear of social exclusion.',
      },
      {
        concern: 'Echo Chamber Creation',
        severity: 'high',
        explanation:
          'Sorting and recommendation algorithms that amplify majority views while hiding minority perspectives, creating feedback loops of conformity',
        mitigation:
          'Offer diverse sorting options, surface quality minority perspectives, and avoid defaulting exclusively to popularity-based ranking.',
      },
      {
        concern: 'Forced Uniformity',
        severity: 'medium',
        explanation:
          'Enforcing design or behavioral conformity so rigidly that legitimate user needs or cultural differences are suppressed',
        mitigation:
          'Build flexibility into systems, document when deviation is appropriate, and respect diverse user needs and cultural contexts.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Effects of Group Pressure upon the Modification and Distortion of Judgments',
        author: 'Asch, S. E.',
        year: 1951,
        description:
          'The foundational paper demonstrating conformity bias through the classic line-length experiments',
        type: 'foundational',
      },
      {
        title: 'A Study of Normative and Informational Social Influences upon Individual Judgment',
        author: 'Deutsch, M., & Gerard, H. B.',
        year: 1955,
        doi: '10.1037/h0046408',
        description:
          'Distinguished between normative influence (desire to fit in) and informational influence (assuming the group is correct)',
        type: 'foundational',
      },
      {
        title: 'An Experimental Study of the Formation of Norms',
        author: 'Sherif, M.',
        year: 1936,
        description:
          'Early experiments using the autokinetic effect to demonstrate how group norms form and influence individual perception',
        type: 'foundational',
      },
      {
        title: 'Behavioral Study of Obedience',
        author: 'Milgram, S.',
        year: 1963,
        doi: '10.1037/h0040525',
        description:
          'Extended conformity research to obedience, showing extreme conformity to authority',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on social proof and conformity with practical applications to design and marketing',
        type: 'practical',
      },
      {
        title: 'The Wisdom of Crowds',
        author: 'Surowiecki, James',
        year: 2005,
        isbn: '9780385721707',
        description:
          'Explores when group conformity produces wisdom vs groupthink, with design implications for collaborative tools',
        type: 'practical',
      },
      {
        title: 'Groupthink: Psychological Studies of Policy Decisions and Fiascoes',
        author: 'Janis, Irving',
        year: 1982,
        isbn: '9780395317044',
        description:
          'Foundational work on how conformity in groups leads to poor decisions, essential for designing collaborative tools',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Social Proof: Why We Look to Others for What We Should Think and Do',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/social-proof-ux/',
        description:
          'Practical UX guide to conformity and social proof in interface design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Asch Conformity Experiment',
        author: 'Asch, Solomon',
        url: 'https://www.youtube.com/watch?v=TYIh4MkcfJA',
        description:
          'Video recreation of the classic Asch line experiment showing conformity in action',
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
      'recency-effect',
      'von-restorff-effect',
      'loss-aversion',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'recency-bias',
      'salience-bias',
      'vividness-effect',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'recency-bias',
        'salience-bias',
      ],
    },
  },
};
