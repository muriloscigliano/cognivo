/**
 * BYSTANDER EFFECT
 *
 * We're less likely to help when others are present
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const bystanderEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'bystander-effect',
    name: 'Bystander Effect',
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
    simple: 'We\'re less likely to help when others are present',

    detailed: `The Bystander Effect is a social psychological phenomenon where individuals are less likely to offer help or take action when other people are present. The greater the number of bystanders, the less likely any one person is to help. This occurs because responsibility becomes diffused across the group — each person assumes someone else will act.

In digital product design, the bystander effect manifests whenever users are part of a group context: shared Slack channels, open-source repositories, group emails, collaborative documents, or community forums. When a request is directed at "everyone," it often reaches no one.

Understanding this bias is critical for designing systems that drive individual accountability, prompt specific action, and avoid the trap of group-addressed appeals that nobody responds to.`,

    psychologyBasis: {
      discoveredBy: 'John Darley and Bibb Latané',
      year: 1968,
      theory: 'Diffusion of Responsibility',
      mechanism: `When multiple people witness an event or receive a request, responsibility is psychologically distributed among all observers. This happens because:

1. **Diffusion of Responsibility**: Each individual feels less personal obligation because the burden is shared — "someone else will handle it"
2. **Pluralistic Ignorance**: People look to others for cues on how to act; if nobody is responding, each person interprets inaction as a signal that action is unnecessary
3. **Evaluation Apprehension**: Individuals fear being judged for overreacting or intervening inappropriately, so they hold back
4. **Social Influence**: The larger the group, the more each person calibrates their behavior to the passive majority
5. **Audience Inhibition**: People are less willing to act when they feel others are watching and might evaluate them negatively

The effect is strongest when the situation is ambiguous, when the group is large, and when individuals do not feel uniquely responsible.`,
    },

    realWorldExample: `In 1964, Kitty Genovese was attacked outside her apartment in New York City. Reports at the time claimed 38 neighbors witnessed or heard the attack but none called the police — each assumed someone else already had. While the specifics have been debated, the case inspired Darley and Latané's landmark experiments confirming that people in groups are dramatically slower to act than individuals alone.

In a controlled experiment, participants who believed they were the only witness to someone having a seizure helped 85% of the time. When they believed four others were also listening, only 31% intervened.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Bystander Effect profoundly impacts how users respond to calls to action, task assignments, and collaborative responsibilities in digital products. Designers can counteract this bias to:

- Increase response rates by directing requests to specific individuals rather than groups
- Drive task completion by assigning clear ownership instead of shared responsibility
- Boost engagement in collaborative tools by making individual contributions visible
- Improve conversion on donation and volunteer appeals by making them personal
- Reduce dropped tasks in workflows by eliminating ambiguous group assignments`,

    whenToUse: [
      {
        title: 'Task Assignment in Collaborative Tools',
        scenario:
          'When work needs to be completed in a team environment',
        example:
          'Assign specific reviewers to pull requests rather than requesting "team review" — @username assignment gets 3x faster response',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Personalized Calls to Action',
        scenario: 'When seeking donations, sign-ups, or volunteer action from a group',
        example:
          '"Sarah, your $25 contribution can provide meals for a family this week" instead of "We need your help"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Incident Response and Escalation',
        scenario: 'When critical issues need immediate attention in on-call or support systems',
        example:
          'Auto-assign a single on-call engineer with their name displayed, rather than alerting the whole team',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Community Moderation',
        scenario: 'When harmful content needs to be flagged or reported in online communities',
        example:
          'Show "You are the first person to see this — report it?" rather than relying on the crowd to moderate',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feedback and Review Requests',
        scenario: 'When seeking input on documents, designs, or proposals',
        example:
          'Tag specific people for specific sections: "@Alex please review the pricing section" rather than "Please review this doc"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Brainstorming and Open Ideation',
        reason:
          'Assigning individual responsibility can stifle creative, open-ended group participation',
        consequence:
          'People may feel constrained or pressured, reducing creative output',
        alternative:
          'Use anonymous contribution mechanisms or round-robin ideation before assigning ownership',
      },
      {
        title: 'Sensitive or Emotionally Charged Situations',
        reason:
          'Singling out individuals to act on sensitive matters can feel coercive or unfair',
        consequence:
          'Users may feel targeted, resentful, or anxious about being publicly called out',
        alternative:
          'Provide private, optional channels for action and let people self-select',
      },
      {
        title: 'Low-Stakes Community Participation',
        reason:
          'Over-personalizing trivial requests can feel heavy-handed and annoying',
        consequence:
          'Users may feel micro-managed and disengage from the community entirely',
        alternative:
          'Reserve direct personal appeals for high-impact situations; use lighter prompts for casual engagement',
      },
      {
        title: 'Situations Requiring Collective Consensus',
        reason:
          'Forcing individual ownership on decisions that genuinely need group input undermines collaborative process',
        consequence:
          'Premature individual action without group alignment, leading to conflict',
        alternative:
          'Use structured group decision processes (voting, polls) with clear deadlines',
      },
    ],

    commonMistakes: [
      {
        title: 'Generic Group Appeals',
        description:
          'Sending requests to "everyone" or "the team" without specifying who should act',
        why: 'Each person assumes someone else will handle it, so nobody does',
        fix: 'Always assign a specific owner or directly address an individual by name',
      },
      {
        title: 'Unassigned Tickets and Tasks',
        description:
          'Creating work items in project management tools without assigning them to anyone',
        why: 'Unowned tasks sit in backlogs indefinitely because no single person feels accountable',
        fix: 'Require an assignee before a ticket can be created or moved to "ready" status',
      },
      {
        title: 'Broadcasting Alerts to Large Groups',
        description:
          'Sending critical alerts to an entire channel or mailing list instead of a specific responder',
        why: 'The larger the group, the longer the response time — everyone waits for someone else to act first',
        fix: 'Implement rotation-based assignment (on-call) and escalation to a named individual',
      },
      {
        title: 'Passive Volunteer Requests',
        description:
          'Asking "Can someone help with this?" in a meeting or group chat',
        why: 'Social dynamics in groups cause people to wait for others to volunteer first',
        fix: 'Ask a specific person directly, or use a structured volunteer sign-up with visible slots',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines whether responsibility feels individual or diffused across a group context',
        examples: [
          'Individual task cards with avatar and name create visible ownership',
          'Group dashboards without personal sections diffuse responsibility',
          'Personal notification panels drive individual action more than group feeds',
          'Assigned item counts in navigation badges create personal accountability',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text personalization and direct address affect whether users feel individually called to act',
        examples: [
          'Using "You" and the user\'s name increases personal responsibility',
          'Generic "Users should..." language diffuses ownership',
          'Bold @mentions in group contexts draw individual attention',
          'Personal greetings ("Alex, 3 items need your review") drive action',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color can signal personal responsibility through individual assignment indicators',
        examples: [
          'Personal avatar colors next to assigned tasks signal ownership',
          'Color-coded responsibility (your items in blue, team items in gray) separates personal from group',
          'Highlighted @mentions in a distinct color draw individual attention in group contexts',
          'Status colors on personally assigned items create urgency for the individual',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines whether action feels personally required or optionally shared',
        examples: [
          'Direct @mention notifications require personal response vs passive channel updates',
          'Individual "Accept/Decline" buttons create binary personal commitment',
          'Assigning tasks through drag-to-person interaction creates visible personal ownership',
          'Review request buttons that auto-assign the requester eliminate ambiguity',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users feel individually responsible or lost in a crowd',
        examples: [
          '"@Sarah, please review this PR" gets 3x faster response than "Team, please review"',
          '"You are 1 of 3 people who can help" creates specific individual responsibility',
          'Personal impact statements ("Your $25 feeds one family") outperform group appeals',
          'Named task assignment in commit messages creates traceable accountability',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must ensure personal responsibility cues reach all users equally',
        examples: [
          'Screen readers must announce @mentions and personal assignments clearly',
          'ARIA live regions should announce when a task is assigned to the current user',
          'Keyboard-accessible accept/decline flows for personally assigned items',
          'Clear notification sounds for personal vs group alerts help distinguish responsibility level',
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
        title: 'Direct Reviewer Assignment',
        description:
          'Code review tool assigning specific reviewers instead of requesting group review',
        code: `<div class="pr-review-request">
  <h3>Review Requested</h3>
  <div class="assigned-reviewer">
    <img src="avatar-sarah.jpg" alt="Sarah Chen" class="avatar">
    <div class="reviewer-info">
      <p class="name"><strong>@sarah-chen</strong> — please review</p>
      <p class="context">You're assigned because you own the auth module</p>
      <p class="deadline">Due by Thursday 5pm</p>
    </div>
    <div class="actions">
      <button class="primary">Start Review</button>
      <button class="secondary">Decline & Reassign</button>
    </div>
  </div>
</div>`,
        explanation:
          'By naming a specific reviewer, providing context for why they were chosen, and setting a deadline, the request eliminates diffusion of responsibility. The individual feels uniquely accountable.',
        principle:
          'Direct personal assignment eliminates bystander effect by making responsibility unambiguous',
        metrics: {
          before: '48-hour average review time with "team review" requests',
          after: '14-hour average review time with assigned reviewers',
          improvement: '71% reduction in review turnaround time',
        },
      },
      {
        title: 'Personalized Donation Appeal',
        description:
          'Fundraising page using personal stories and individual impact framing',
        code: `<div class="donation-appeal">
  <h2>Marcus needs your help, Sarah</h2>
  <div class="story">
    <img src="marcus.jpg" alt="Marcus, age 8">
    <p>Marcus is 8 years old and needs surgery to walk again.
    <strong>Your $25</strong> covers one day of his recovery.</p>
  </div>
  <div class="progress">
    <div class="bar" style="width: 67%"></div>
    <p><strong>847 people</strong> have donated. You can be #848.</p>
  </div>
  <div class="amounts">
    <button class="amount">$25 — 1 day of recovery</button>
    <button class="amount selected">$75 — 3 days of recovery</button>
    <button class="amount">$150 — 1 week of recovery</button>
  </div>
</div>`,
        explanation:
          'The appeal addresses the user by name, connects their specific contribution to a concrete outcome for a named individual, and positions them as a specific numbered donor rather than an anonymous member of the crowd.',
        principle:
          'Personal framing with concrete individual impact overcomes bystander diffusion',
        metrics: {
          before: '2.1% conversion with generic "Help children in need" appeal',
          after: '6.8% conversion with personalized individual appeal',
          improvement: '224% increase in donation conversion rate',
        },
      },
      {
        title: 'Individual Task Assignment in Project Board',
        description:
          'Project management tool requiring explicit ownership for every task',
        code: `<div class="task-card assigned">
  <div class="task-header">
    <span class="priority high">HIGH</span>
    <span class="id">#1247</span>
  </div>
  <h4>Fix authentication timeout bug</h4>
  <div class="owner">
    <img src="avatar-alex.jpg" alt="" class="avatar-sm">
    <span class="owner-name">Assigned to <strong>@alex</strong></span>
  </div>
  <div class="meta">
    <span class="due">Due: Mar 22</span>
    <span class="status">In Progress</span>
  </div>
</div>

<!-- Contrast: unassigned card shows warning -->
<div class="task-card unassigned warning">
  <div class="task-header">
    <span class="priority high">HIGH</span>
    <span class="id">#1248</span>
  </div>
  <h4>Update API rate limits</h4>
  <div class="owner missing">
    <span class="warning-icon">⚠️</span>
    <span>No owner assigned — <button class="link">claim this task</button></span>
  </div>
</div>`,
        explanation:
          'Every task card prominently displays its owner. Unassigned tasks are visually flagged with a warning state, making the absence of ownership impossible to ignore and easy to claim.',
        principle:
          'Visible ownership and flagged unassignment prevent tasks from falling through the cracks',
      },
    ],

    bad: [
      {
        title: 'Generic Group Email Request',
        description:
          'Sending a vague request to an entire team mailing list',
        code: `<!-- DON'T DO THIS -->
<div class="email">
  <div class="header">
    <span class="to">To: engineering-team@company.com</span>
    <span class="subject">Subject: Code review needed</span>
  </div>
  <div class="body">
    <p>Hi team,</p>
    <p>Someone please review PR #4521 when you get a chance.</p>
    <p>Thanks!</p>
  </div>
</div>`,
        explanation:
          'Addressing "the team" with "someone please" is a textbook bystander effect trigger. Every recipient assumes a colleague will handle it. The PR will sit unreviewed for days.',
        principle:
          'Generic group appeals with no named owner trigger maximum diffusion of responsibility',
      },
      {
        title: 'Unassigned Support Tickets',
        description:
          'Support queue where tickets are visible to all agents but assigned to none',
        code: `<!-- DON'T DO THIS -->
<div class="ticket-queue">
  <h3>Open Tickets (47 unassigned)</h3>
  <div class="ticket">
    <span class="priority urgent">URGENT</span>
    <p>Customer data export failing</p>
    <span class="assigned">Assigned to: <em>Unassigned</em></span>
    <span class="age">Open for 6 hours</span>
  </div>
  <div class="ticket">
    <span class="priority urgent">URGENT</span>
    <p>Payment processing error</p>
    <span class="assigned">Assigned to: <em>Unassigned</em></span>
    <span class="age">Open for 4 hours</span>
  </div>
  <p class="footer">Please pick up tickets from the queue</p>
</div>`,
        explanation:
          'A large pool of unassigned tickets visible to many agents creates classic bystander effect. Each agent assumes another will pick them up, especially the difficult ones. Urgent tickets age for hours with no owner.',
        principle:
          'Shared queues without auto-assignment create responsibility vacuums',
      },
      {
        title: 'Passive Community Moderation',
        description:
          'Relying on the community to flag harmful content without personal prompts',
        code: `<!-- DON'T DO THIS -->
<div class="content-report">
  <p class="small-text">
    If you see something that violates our guidelines,
    please let us know.
  </p>
  <a href="#report" class="subtle-link">Report content</a>
</div>`,
        explanation:
          'A passive, barely visible report mechanism relies on someone in the crowd to take initiative. The subtle styling signals that reporting is optional and unimportant. Most users will assume others have already reported it.',
        principle:
          'Passive, group-directed moderation appeals produce minimal individual action',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: '@mention System',
        url: 'https://slack.com',
        description:
          'Slack\'s @username mentions cut through group noise by directing messages to specific individuals. A message in #general with "@sarah can you handle this?" gets a response far faster than "can someone handle this?" The visual highlight and personal notification create individual accountability.',
        effectiveness: 'very-effective',
        analysis:
          'Slack\'s @mention system is one of the most effective bystander-effect countermeasures in modern software. By making personal address easy and visually distinct, it shifts group communication from diffused to directed. The notification system ensures the named individual sees the request even in high-volume channels.',
      },
      {
        company: 'GitHub',
        product: 'Assigned Reviewers and CODEOWNERS',
        url: 'https://github.com/features/code-review',
        description:
          'GitHub\'s reviewer assignment and CODEOWNERS file automatically assign specific reviewers to pull requests based on file paths. Instead of hoping someone from the team reviews, the system names individuals who are personally responsible.',
        effectiveness: 'very-effective',
        analysis:
          'CODEOWNERS eliminates the bystander effect entirely for code review by removing the question of "who should review this?" Auto-assignment based on file ownership ensures every PR has a named, accountable reviewer. Teams using CODEOWNERS see dramatically faster review cycles.',
      },
      {
        company: 'GoFundMe',
        product: 'Personal Fundraising Pages',
        url: 'https://www.gofundme.com',
        description:
          'GoFundMe campaigns feature a single named beneficiary with their photo and personal story. Donors see exactly who they are helping and what their specific contribution achieves. The platform frames giving as a personal act, not a crowd contribution.',
        effectiveness: 'very-effective',
        analysis:
          'By personalizing both the recipient and the donor\'s impact ("Your $50 covers Maria\'s medication for a week"), GoFundMe counters the bystander effect that plagues generic charity appeals. Named individuals with stories convert far better than abstract causes.',
      },
      {
        company: 'Wikipedia',
        product: 'WikiProject Task Lists',
        url: 'https://en.wikipedia.org/wiki/Wikipedia:WikiProject',
        description:
          'Wikipedia\'s WikiProject system breaks massive editing tasks into specific, claimable work items. Instead of "this article needs improvement," contributors see "This section needs 3 citations — claim this task." Individual sign-up sheets track who committed to what.',
        effectiveness: 'effective',
        analysis:
          'WikiProjects convert the overwhelming scope of Wikipedia maintenance into individually claimable tasks. The sign-up mechanism creates visible personal commitment, and progress tracking shows exactly who contributed what. This counters the bystander effect that would otherwise paralyze contributors facing millions of articles needing work.',
      },
    ],

    abTests: [
      {
        title: 'Code Review: Team Request vs Named Reviewer',
        hypothesis:
          'Assigning a specific named reviewer will reduce review turnaround time compared to requesting team review',
        controlVersion: {
          description:
            'PR review request posted in team Slack channel: "Team, PR #4521 needs review. Please take a look when you can."',
          metrics: {
            timeToFirstReview: '47 hours',
            reviewCompletionRate: '62%',
            averageReviewers: '0.8',
          },
        },
        treatmentVersion: {
          description:
            'PR review request with auto-assigned reviewer: "@sarah-chen you\'ve been assigned to review PR #4521 (auth module changes). Due by Thursday."',
          metrics: {
            timeToFirstReview: '11 hours',
            reviewCompletionRate: '94%',
            averageReviewers: '1.3',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Named reviewer assignment reduced time-to-first-review by 77% and increased completion rate by 52%. Interestingly, the named reviewer treatment also attracted more voluntary additional reviewers (1.3 vs 0.8), suggesting that one person taking action breaks the bystander effect for others.',
          learnings: [
            'Direct assignment is dramatically more effective than group requests',
            'Named responsibility creates a cascading effect — once one person acts, others follow',
            'Providing context for why someone was chosen ("you own auth module") increases acceptance',
            'Clear deadlines compound the effect of personal assignment',
          ],
        },
      },
      {
        title: 'Donation Page: Generic Appeal vs Personal Impact',
        hypothesis:
          'Personalized donation appeals addressing the user by name with specific impact framing will outperform generic group appeals',
        controlVersion: {
          description:
            'Generic donation page: "Help children in need. Every donation makes a difference. Donate now."',
          metrics: {
            conversionRate: '2.3%',
            averageDonation: '$28',
            clickThroughRate: '4.1%',
          },
        },
        treatmentVersion: {
          description:
            'Personalized appeal: "Sarah, your $25 gives Marcus clean water for a month. 312 people have helped — be #313." with named child, photo, and specific impact.',
          metrics: {
            conversionRate: '7.1%',
            averageDonation: '$47',
            clickThroughRate: '12.8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Personalized appeals tripled conversion rate and increased average donation by 68%. The combination of addressing the donor by name, naming a specific beneficiary, and framing their contribution as uniquely impactful eliminated the bystander diffusion of generic charity appeals.',
          learnings: [
            'Personal address ("Sarah") triggers individual responsibility',
            'Named beneficiaries create emotional connection that generic causes cannot',
            'Specific impact framing ("your $25 = 1 month of water") makes contribution feel meaningful',
            'Numbered donor position ("be #313") creates individual identity within the group',
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
        name: 'Generic Group Address',
        description:
          'Calls to action or requests addressed to "everyone", "the team", "someone", or unspecified groups',
        howToSpot:
          'Look for language like "Can someone...", "Team, please...", "If anyone...", or buttons labeled generically without personal context',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Unassigned Work Items',
        description:
          'Tasks, tickets, or responsibilities with no assigned owner visible in the interface',
        howToSpot:
          'Check task boards, ticket queues, and to-do lists for items missing an assignee avatar or name',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Shared Queues Without Auto-Assignment',
        description:
          'Work queues visible to all team members where items must be manually claimed',
        howToSpot:
          'Look for support queues, review lists, or task pools that rely on voluntary pickup rather than automatic rotation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Impersonal Notification Patterns',
        description:
          'Alerts and notifications sent to groups or channels without naming a specific responsible party',
        howToSpot:
          'Check notification templates for group-addressed messages vs individually-addressed ones',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Passive Report/Flag Mechanisms',
        description:
          'Content moderation or issue reporting relying on crowd initiative with subtle, optional controls',
        howToSpot:
          'Look for small, low-contrast "Report" links with no personal prompt or encouragement to act',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Diffused Ownership Pattern',
        description: 'Responsibilities shared among a group with no clear individual accountable',
        indicators: [
          'Tasks or tickets without an assigned owner',
          'Group emails or channel messages requesting action from "anyone"',
          'Collaborative documents with no section owners',
          'Shared inboxes where messages are addressed to the group',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Volunteer-Based Assignment Pattern',
        description: 'System relies on individuals volunteering rather than being directly assigned',
        indicators: [
          '"Pick up a task" or "Claim this item" language without prompting specific users',
          'Open queues with no rotation or auto-assignment logic',
          'Meeting agendas asking "Who wants to take this?"',
          'Community contribution models with no task claiming mechanism',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Anonymous Crowd Appeal Pattern',
        description: 'Requests for action directed at an undifferentiated mass of users',
        indicators: [
          'Donation pages with generic "Help us" language and no personal framing',
          'Community guidelines asking users to "be kind" without enforcement mechanism',
          '"Report this content" buttons with no personal prompt',
          'Petition pages without individual commitment visibility',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Invisible Contribution Pattern',
        description: 'Individual contributions or inaction are not visible to others, removing social accountability',
        indicators: [
          'No visibility into who has or has not reviewed a document',
          'Anonymous voting without participation tracking',
          'Group tasks with no progress attribution',
          'Feedback requests where non-response is invisible',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are calls to action directed at specific individuals or generic groups?',
      'Does every task, ticket, or work item have a named owner?',
      'Can users see who is responsible for what in collaborative contexts?',
      'Are notifications personally addressed or group-broadcast?',
      'Does the system auto-assign responsibilities or rely on voluntary claiming?',
      'Is individual contribution and inaction visible to the team?',
      'Are escalation paths directed to named individuals or shared groups?',
      'Do report/flag mechanisms actively prompt individual users or passively wait?',
      'Are deadlines paired with personal accountability (who + when)?',
      'In group contexts, does the design make each person feel uniquely responsible?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the bystander effect and diffusion of responsibility.

Analyze the provided design for bystander effect patterns. Identify:

1. **Diffused Responsibility**: Where ownership is shared among a group with no individual accountable
2. **Generic Group Appeals**: Calls to action addressed to "everyone" or "someone" rather than named individuals
3. **Unassigned Work Items**: Tasks, tickets, or responsibilities without a clear owner
4. **Passive Participation**: Systems relying on voluntary action rather than directed assignment
5. **Invisible Accountability**: Contexts where individual contribution or inaction is not visible

For each pattern found:
- Identify where responsibility is diffused
- Assess how many people share the unassigned responsibility
- Determine the likely response rate and delay
- Evaluate whether the design could be personalized
- Suggest specific changes to create individual accountability

Consider:
- Are requests directed at specific people or generic groups?
- Does every task have a named owner with a deadline?
- Is individual contribution and inaction visible?
- Do notification systems distinguish personal from group alerts?
- Are escalation paths clear and individually assigned?

Provide actionable recommendations for creating personal responsibility and eliminating diffusion.`,

    outputSchema: {
      type: 'object',
      properties: {
        bystanderPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              groupSize: { type: 'string' },
              responsibilityClarity: { type: 'string' },
              likelyResponseRate: { type: 'string' },
              personalizable: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'responsibilityClarity',
              'personalizable',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            diffusionLevel: { type: 'number' },
            personalAddressScore: { type: 'number' },
            ownershipClarity: { type: 'number' },
            accountabilityScore: { type: 'number' },
          },
          required: [
            'diffusionLevel',
            'personalAddressScore',
            'ownershipClarity',
            'accountabilityScore',
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
        'bystanderPatterns',
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
        title: 'Audit Group-Addressed Requests',
        description:
          'Identify every place in your product where requests, tasks, or calls to action are directed at groups rather than individuals',
        example:
          'Scan Slack integrations, email templates, notification copy, and task boards for "team", "someone", "anyone" language',
        tips: [
          'Search notification templates for generic group address patterns',
          'Review task management workflows for unassigned states',
          'Check escalation paths for group-broadcast vs individual-directed alerts',
        ],
      },
      {
        step: 2,
        title: 'Implement Direct Personal Assignment',
        description:
          'Replace group requests with named individual assignments wherever possible',
        example:
          'Change PR review from "Team, please review" to "@sarah-chen please review (you own auth module)"',
        tips: [
          'Use CODEOWNERS-style automatic assignment based on expertise',
          'Include context for why the person was chosen',
          'Provide a "decline and reassign" option to avoid trapping people',
        ],
      },
      {
        step: 3,
        title: 'Make Ownership Visible',
        description:
          'Ensure every task, ticket, and responsibility displays its owner prominently with avatar and name',
        example:
          'Show assignee avatar on every task card; flag unassigned items with a warning state',
        tips: [
          'Use avatars and names, not just initials or IDs',
          'Make unassigned items visually distinct (warning color, icon)',
          'Show ownership in list views, not just detail views',
        ],
      },
      {
        step: 4,
        title: 'Personalize Calls to Action',
        description:
          'Address users by name and frame their contribution as individually meaningful',
        example:
          '"Alex, your review is the last one needed to merge this PR" instead of "Reviews needed"',
        tips: [
          'Use the user\'s name in notification copy',
          'Frame individual impact concretely ("your $25 feeds one family")',
          'Show how many others have already acted ("Join 312 others")',
        ],
      },
      {
        step: 5,
        title: 'Build Accountability Transparency',
        description:
          'Make individual contribution and inaction visible to the relevant group',
        example:
          'Show review status per reviewer: "Sarah: approved, Alex: pending, Jordan: not started"',
        tips: [
          'Display participation status in collaborative contexts',
          'Send reminders to non-responders by name',
          'Track and surface response time metrics per individual',
        ],
      },
    ],

    dos: [
      'Address users by name in requests and calls to action',
      'Assign every task and ticket to a specific named individual',
      'Auto-assign responsibilities using rotation, expertise, or CODEOWNERS-style rules',
      'Make individual ownership visible with avatars and names on every work item',
      'Flag unassigned items with warning states to prevent responsibility gaps',
      'Frame individual contributions with concrete, specific impact',
      'Provide "decline and reassign" options so assignment feels fair, not forced',
      'Show participation status so non-response is visible to the team',
    ],

    donts: [
      'Don\'t send requests to "the team" or "someone" without naming a specific owner',
      'Don\'t allow tasks to exist without an assigned individual',
      'Don\'t rely on voluntary claiming from shared queues for critical work',
      'Don\'t broadcast alerts to large groups when one person should respond',
      'Don\'t use passive language like "If anyone has time..." for important requests',
      'Don\'t make individual inaction invisible in collaborative contexts',
      'Don\'t assume group awareness equals group action',
      'Don\'t remove personal agency by over-automating — let individuals accept or decline',
    ],

    bestPractices: [
      {
        title: 'Name a Single Owner for Every Responsibility',
        description:
          'Every task, ticket, review, and action item should have exactly one named person accountable',
        rationale:
          'Research shows that naming a single responsible person increases completion rates by 50-200% compared to group assignment',
        example:
          'Require an assignee field before a Jira ticket can move to "Ready" status',
      },
      {
        title: 'Use @mentions Instead of Channel Posts',
        description:
          'In group communication tools, direct requests to specific individuals using @mentions',
        rationale:
          'Slack data shows @mentioned messages get 3x faster response than channel-broadcast requests',
        example:
          '"@alex can you deploy the hotfix?" instead of "Can someone deploy the hotfix?"',
      },
      {
        title: 'Auto-Assign with Context',
        description:
          'Automatically assign responsibilities based on expertise, rotation, or ownership, and explain why',
        rationale:
          'Auto-assignment eliminates the decision gap where everyone waits for someone else to volunteer',
        example:
          'GitHub CODEOWNERS auto-assigns reviewers with a message: "You\'re assigned because you own /src/auth"',
      },
      {
        title: 'Make Non-Response Visible',
        description:
          'Show who has and has not responded, reviewed, or completed their assigned task',
        rationale:
          'Visible accountability creates social pressure that counters the bystander effect',
        example:
          'Google Docs showing "Awaiting review from: Sarah (2 days), Alex (1 day)" in the document header',
      },
      {
        title: 'Frame Individual Impact Concretely',
        description:
          'Show each person exactly what their specific action will accomplish',
        rationale:
          'Concrete personal impact ("your review unblocks 3 engineers") motivates far more than abstract group benefit',
        example:
          '"Your code review is the last one needed — merging will unblock the sprint"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure assignment and ownership information is programmatically exposed',
        implementation:
          'Use ARIA labels on task cards to announce assignee: aria-label="Task: Fix auth bug, assigned to Sarah Chen, due March 22"',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Announce personal assignment changes without requiring focus',
        implementation:
          'Use ARIA live regions to announce when a task is assigned to the current user: "You have been assigned to review PR #4521"',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings that distinguish personal tasks from group tasks',
        implementation:
          'Separate "Your Assigned Tasks (3)" from "Team Tasks" with clear heading hierarchy',
      },
    ],

    ethics: [
      {
        concern: 'Coercive Personal Pressure',
        severity: 'high',
        explanation:
          'Over-personalizing requests can feel manipulative or guilt-inducing, especially when individuals cannot easily decline',
        mitigation:
          'Always provide a clear "decline and reassign" option. Frame assignment as a request, not a mandate. Avoid guilt-based language.',
      },
      {
        concern: 'Public Shaming of Non-Responders',
        severity: 'critical',
        explanation:
          'Making inaction visible can cross into public shaming if individuals have legitimate reasons for not responding',
        mitigation:
          'Show participation status to relevant stakeholders only, not publicly. Allow private status explanations. Distinguish between "not yet started" and "declined."',
      },
      {
        concern: 'Unfair Burden Distribution',
        severity: 'high',
        explanation:
          'Auto-assignment systems can overload certain individuals if not properly balanced',
        mitigation:
          'Implement fair rotation, track workload per person, and allow individuals to flag when they are at capacity. Review assignment distribution regularly.',
      },
      {
        concern: 'Manufactured Urgency',
        severity: 'medium',
        explanation:
          'Using personal address combined with false deadlines to pressure unnecessary action',
        mitigation:
          'Only pair personal assignment with genuine deadlines. Be transparent about actual urgency levels. Allow individuals to push back on timelines.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Bystander Intervention in Emergencies: Diffusion of Responsibility',
        author: 'Darley, J. M., & Latané, B.',
        year: 1968,
        doi: '10.1037/h0025589',
        description:
          'The foundational paper establishing the bystander effect through controlled experiments on diffusion of responsibility',
        type: 'foundational',
      },
      {
        title: 'The Bystander-Effect: A Meta-Analytic Review on Bystander Intervention in Dangerous and Non-Dangerous Emergencies',
        author: 'Fischer, P., Krueger, J. I., Greitemeyer, T., Vogrincic, C., Kastenmüller, A., Frey, D., Heene, M., Wicher, M., & Kainbacher, M.',
        year: 2011,
        doi: '10.1037/a0023304',
        description:
          'Comprehensive meta-analysis of 50+ years of bystander effect research, confirming the effect while identifying moderating factors',
        type: 'advanced',
      },
      {
        title: 'Group Inhibition of Bystander Intervention in Emergencies',
        author: 'Latané, B., & Darley, J. M.',
        year: 1968,
        doi: '10.1037/h0026570',
        description:
          'Companion paper establishing pluralistic ignorance as a mechanism underlying the bystander effect',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'The Unresponsive Bystander: Why Doesn\'t He Help?',
        author: 'Latané, B., & Darley, J. M.',
        year: 1970,
        isbn: '9780139388538',
        description:
          'The definitive book on the bystander effect by its original researchers, covering experiments and theory',
        type: 'foundational',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on social proof covers how group behavior inhibits individual action, directly related to bystander dynamics',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Bystander Effect in Online Communities',
        author: 'Markey, P. M.',
        year: 2000,
        url: 'https://doi.org/10.1016/S0747-5632(00)00016-6',
        description:
          'Early research on how the bystander effect manifests in digital communication and online group settings',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Bystander Effect — Why Don\'t We Help?',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=z4S1LLrSzVE',
        description:
          'Animated explanation of the bystander effect with Darley and Latané\'s original experiments',
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
