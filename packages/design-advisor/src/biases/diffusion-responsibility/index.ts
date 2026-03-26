/**
 * DIFFUSION OF RESPONSIBILITY
 *
 * We feel less responsible when others are present.
 * Each individual in a group feels their personal obligation
 * is reduced as group size increases.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const diffusionResponsibility: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'diffusion-responsibility',
    name: 'Diffusion of Responsibility',
    aliases: ['Bystander Effect', 'Social Loafing', 'Responsibility Dilution'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'group-dynamics',
      'accountability',
      'ownership',
      'collaboration',
      'task-assignment',
      'team-tools',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People feel less personally responsible for taking action when others are present or share the responsibility.',

    detailed: `Diffusion of responsibility is a social-psychological phenomenon in which each individual in a group feels less personally accountable for outcomes as the group grows larger. When responsibility is shared, each person assumes someone else will act, leading to inaction or reduced effort from everyone.

This bias originates from bystander effect research: in emergencies, the more bystanders present, the less likely any single person is to help. The same principle applies in teams, organizations, and digital products. When a task has no clear owner, everyone assumes someone else will handle it.

In product design, diffusion of responsibility directly impacts collaborative tools, team workflows, notification systems, and any interface where multiple users share tasks or decisions. Effective design counteracts this bias by making individual ownership explicit, tracking personal contributions, and ensuring every action has a clear responsible party.`,

    psychologyBasis: {
      discoveredBy: 'John Darley and Bibb Latané',
      year: 1968,
      theory: 'Bystander Intervention Research',
      mechanism: `Each person feels less responsible when part of a group because responsibility is diluted among group members. This happens through several interacting processes:

1. **Responsibility Dilution**: As group size increases, each individual's perceived share of responsibility decreases proportionally
2. **Pluralistic Ignorance**: When no one acts, each person assumes the situation must not require action, reinforcing inaction
3. **Evaluation Apprehension**: Fear of being judged for acting incorrectly in front of others inhibits response
4. **Social Loafing**: Individuals exert less effort when their contributions are pooled with others and not individually identifiable
5. **Audience Inhibition**: The presence of others creates self-consciousness that discourages taking initiative

The effect is strongest when roles are ambiguous, tasks lack assigned owners, and individual contributions are not visible or measured.`,
    },

    realWorldExample: `In the classic 1968 experiment by Darley and Latané, participants heard a fellow student having a seizure over an intercom. When participants believed they were the only listener, 85% sought help. When they believed four others were also listening, only 31% acted. The presence of other potential helpers dramatically reduced each individual's sense of personal responsibility to intervene.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Diffusion of responsibility affects how users behave in collaborative and team-based interfaces. When multiple people share access to a task, project, or decision, each individual feels less compelled to act. Designers can counteract this by:

- Making task ownership explicit with clear individual assignees
- Tracking and displaying individual contributions visibly
- Using direct @mentions and personal notifications rather than group-wide alerts
- Defining roles and responsibilities through RACI-like frameworks in the UI
- Breaking shared tasks into individually owned subtasks
- Creating accountability through transparent activity logs`,

    whenToUse: [
      {
        title: 'Task Assignment Interfaces',
        scenario:
          'When tasks or tickets need clear ownership in project management tools',
        example:
          'Require a single assignee for every task; show unassigned tasks as warnings that demand immediate ownership',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Code Review and Approval Workflows',
        scenario:
          'When multiple reviewers are requested but none take action',
        example:
          'Assign a primary reviewer with a deadline, and show individual review status for each person separately',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Incident Response and Escalation',
        scenario:
          'When critical issues require immediate action from a team',
        example:
          'Auto-assign a single on-call responder rather than alerting the entire team; rotate responsibility on a schedule',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Collaborative Document Editing',
        scenario:
          'When multiple editors share responsibility for content quality',
        example:
          'Show individual cursors, attribution for each paragraph, and personal edit history so contributions are visible',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Team Communication Channels',
        scenario:
          'When messages in group channels go unanswered because no one feels personally responsible',
        example:
          'Use @mentions to direct questions to specific people rather than posting to the channel at large',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Brainstorming and Ideation',
        reason:
          'Over-assigning individual ownership can stifle creative collaboration',
        consequence:
          'Team members may not contribute ideas outside their assigned area',
        alternative:
          'Use structured brainstorming with individual idea generation followed by group synthesis',
      },
      {
        title: 'Psychological Safety Contexts',
        reason:
          'Excessive individual accountability can create blame culture and fear',
        consequence:
          'Team members avoid taking risks or reporting problems to avoid personal blame',
        alternative:
          'Balance individual ownership with blameless post-mortem culture and shared learning',
      },
      {
        title: 'Early-Stage Exploration',
        reason:
          'Premature ownership assignment constrains exploration when roles are still forming',
        consequence:
          'People only work within their assigned scope, missing cross-functional insights',
        alternative:
          'Define ownership once scope is clear; use shared exploration phases with time-boxed handoff',
      },
      {
        title: 'Community-Driven Platforms',
        reason:
          'Forcing single ownership contradicts community collaboration models',
        consequence:
          'Discourages organic contributions from community members',
        alternative:
          'Use contribution tracking and recognition systems instead of exclusive ownership',
      },
    ],

    commonMistakes: [
      {
        title: 'Assigning Tasks to Teams Instead of Individuals',
        description:
          'Labeling a task as owned by "the design team" or "engineering" rather than a specific person',
        why: 'When everyone is responsible, no one is responsible. Group assignments trigger diffusion.',
        fix: 'Always assign a single DRI (Directly Responsible Individual) for every task, even within team contexts',
      },
      {
        title: 'Broadcasting Notifications to Everyone',
        description:
          'Sending alerts to an entire channel or group instead of the person who should act',
        why: 'Group notifications create bystander effects where each recipient assumes someone else will respond',
        fix: 'Route notifications to the specific assignee; use @mentions for follow-ups',
      },
      {
        title: 'Hiding Individual Contribution Data',
        description:
          'Showing only team-level metrics without visibility into who contributed what',
        why: 'Without visible individual contributions, social loafing increases and top contributors burn out',
        fix: 'Display individual activity logs, contribution graphs, and personal progress alongside team metrics',
      },
      {
        title: 'No Escalation Path for Unowned Items',
        description:
          'Allowing tasks to remain unassigned indefinitely without escalation or alerting',
        why: 'Unassigned items persist because each team member assumes someone else will claim them',
        fix: 'Set time-based escalation rules: unassigned items auto-escalate to a manager or rotate to next person',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how ownership and individual responsibility are communicated',
        examples: [
          'Avatar placement next to tasks makes ownership immediately visible',
          'Unassigned task sections with visual warnings draw attention to ownership gaps',
          'Individual contribution panels alongside team dashboards show personal accountability',
          'RACI matrices integrated into project views clarify who does what',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis signals who is responsible and what requires individual action',
        examples: [
          'Bold assignee names next to task titles reinforce ownership',
          'Personal action items in distinct typographic weight vs. team items',
          'Due date typography with owner name creates urgency tied to a person',
          'Status labels like "Awaiting YOUR review" personalize responsibility',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding distinguishes individual vs. shared responsibility and highlights gaps',
        examples: [
          'User-specific color coding for assigned tasks vs. unassigned items',
          'Red/warning colors for items that have no owner',
          'Personal contribution heat maps using individual color assignments',
          'Distinct avatar colors making individual presence visible in group contexts',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users feel personally compelled to act',
        examples: [
          'Direct @mentions triggering personal notifications rather than group alerts',
          'Explicit "Claim this task" buttons making ownership an active choice',
          'Individual approval workflows requiring each reviewer to act independently',
          'Personal dashboards showing "Your tasks" separately from team tasks',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users perceive responsibility as personal or shared',
        examples: [
          '"You are the assignee" vs. "The team is responsible" messaging',
          'Personalized action items: "3 items waiting for YOUR input"',
          'Individual contribution summaries in team reports',
          'Clear role definitions in onboarding and project setup',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible design ensures ownership signals reach all users regardless of ability',
        examples: [
          'Screen reader announcements of task ownership: "Assigned to you"',
          'Keyboard-accessible claim/assign actions for task ownership',
          'ARIA labels on avatars identifying the responsible person',
          'Accessible notification preferences ensuring personal alerts reach assistive technology users',
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
        title: 'Single Assignee with Accountability',
        description:
          'Project management tool requiring a single owner for every task with visible assignment',
        code: `<div class="task-card">
  <div class="task-header">
    <h4>Redesign checkout flow</h4>
    <span class="priority high">High Priority</span>
  </div>
  <div class="task-assignee">
    <img class="avatar" src="maria.jpg" alt="Maria Santos">
    <div class="assignee-info">
      <span class="name">Maria Santos</span>
      <span class="role">DRI - Design Lead</span>
    </div>
  </div>
  <div class="task-meta">
    <span class="due-date">Due: March 25</span>
    <span class="status in-progress">In Progress</span>
  </div>
</div>

<div class="task-card unassigned">
  <div class="task-header">
    <h4>Write API documentation</h4>
    <span class="warning-badge">No Owner</span>
  </div>
  <div class="task-assignee empty">
    <div class="empty-avatar">?</div>
    <button class="claim-btn">Claim This Task</button>
  </div>
  <p class="escalation-notice">
    Auto-escalates to Tech Lead in 24 hours if unclaimed
  </p>
</div>`,
        explanation:
          'Every task has a visible, single assignee (DRI). Unassigned tasks are visually flagged with a warning and include a "Claim This Task" button. Auto-escalation prevents items from languishing without an owner.',
        principle:
          'Explicit individual ownership with escalation paths eliminates diffusion of responsibility',
        metrics: {
          before: '34% of tasks remained unassigned for 48+ hours',
          after: '6% of tasks remained unassigned after adding claim buttons and auto-escalation',
          improvement: '82% reduction in orphaned tasks',
        },
      },
      {
        title: 'Individual Contribution Tracking',
        description:
          'Team dashboard showing individual contributions alongside team progress',
        code: `<section class="team-dashboard">
  <h2>Sprint Progress</h2>
  <div class="team-progress">
    <div class="progress-bar" style="width: 72%">72% Complete</div>
  </div>

  <h3>Individual Contributions</h3>
  <div class="contribution-list">
    <div class="contributor">
      <img class="avatar" src="alex.jpg" alt="Alex Kim">
      <span class="name">Alex Kim</span>
      <div class="contribution-bar" style="width: 85%">
        <span>12/14 tasks</span>
      </div>
    </div>
    <div class="contributor">
      <img class="avatar" src="jordan.jpg" alt="Jordan Lee">
      <span class="name">Jordan Lee</span>
      <div class="contribution-bar" style="width: 60%">
        <span>6/10 tasks</span>
      </div>
    </div>
    <div class="contributor lagging">
      <img class="avatar" src="sam.jpg" alt="Sam Chen">
      <span class="name">Sam Chen</span>
      <div class="contribution-bar" style="width: 25%">
        <span>2/8 tasks</span>
      </div>
      <span class="nudge">Needs attention</span>
    </div>
  </div>
</section>`,
        explanation:
          'Displaying each person\'s individual progress alongside the team total makes contributions visible and countable. Social loafing is reduced because everyone can see who is carrying their weight.',
        principle:
          'Visible individual contributions reduce social loafing and increase personal accountability',
      },
      {
        title: 'RACI Matrix in Project Setup',
        description:
          'Clear role definition at project kickoff with individual accountability',
        code: `<table class="raci-matrix">
  <thead>
    <tr>
      <th>Task</th>
      <th>Responsible</th>
      <th>Accountable</th>
      <th>Consulted</th>
      <th>Informed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>UX Research</td>
      <td><span class="avatar-chip">Maria S.</span></td>
      <td><span class="avatar-chip">David R.</span></td>
      <td><span class="avatar-chip">Alex K.</span></td>
      <td>Engineering Team</td>
    </tr>
    <tr>
      <td>API Design</td>
      <td><span class="avatar-chip">Jordan L.</span></td>
      <td><span class="avatar-chip">Sam C.</span></td>
      <td><span class="avatar-chip">Maria S.</span></td>
      <td>Design Team</td>
    </tr>
    <tr>
      <td>Security Review</td>
      <td><span class="avatar-chip">Sam C.</span></td>
      <td><span class="avatar-chip">David R.</span></td>
      <td>Legal</td>
      <td>All Teams</td>
    </tr>
  </tbody>
</table>`,
        explanation:
          'A RACI matrix defines exactly who is Responsible (does the work), Accountable (owns the outcome), Consulted, and Informed. Each cell has a specific person, eliminating ambiguity about who should act.',
        principle:
          'Structured role definition at project start prevents diffusion before it begins',
      },
    ],

    bad: [
      {
        title: 'Team-Wide Assignment with No Individual Owner',
        description:
          'Task assigned to an entire team with no single person responsible',
        code: `<!-- DON'T DO THIS -->
<div class="task-card">
  <h4>Fix production bug #4521</h4>
  <div class="assignee">
    <span class="team-icon">👥</span>
    <span>Assigned to: Engineering Team</span>
  </div>
  <p class="status">Status: Open</p>
  <p class="comment">Can someone take a look at this?</p>
</div>`,
        explanation:
          'Assigning a critical bug to "Engineering Team" means no single person feels responsible. Each engineer assumes a colleague will handle it. The vague "Can someone take a look?" reinforces that no one in particular needs to act.',
        principle:
          'Group assignments without a DRI guarantee diffusion of responsibility',
      },
      {
        title: 'Group Channel Alert with No Personal Targeting',
        description:
          'Critical alert sent to a group channel instead of the responsible individual',
        code: `<!-- DON'T DO THIS -->
<div class="channel-message">
  <div class="channel-name">#engineering-general (47 members)</div>
  <div class="message">
    <span class="bot-name">AlertBot</span>
    <p>⚠️ Production database CPU at 95%. Someone should investigate.</p>
  </div>
  <div class="reactions">
    <span>👀 3</span>
    <span>👍 2</span>
  </div>
  <p class="no-reply">No replies for 45 minutes</p>
</div>`,
        explanation:
          'Broadcasting a critical alert to 47 people with "someone should investigate" is the digital bystander effect. Everyone sees the alert, assumes a colleague is handling it, and nobody acts. Reactions replace action.',
        principle:
          'Broadcasting urgent alerts to groups without a named responder triggers bystander inaction',
      },
      {
        title: 'Hidden Contribution Data in Team Metrics',
        description:
          'Dashboard showing only aggregate team output with no individual visibility',
        code: `<!-- DON'T DO THIS -->
<div class="team-stats">
  <h3>Q1 Team Performance</h3>
  <div class="metric">
    <span class="number">147</span>
    <span class="label">Tasks Completed</span>
  </div>
  <div class="metric">
    <span class="number">23</span>
    <span class="label">Features Shipped</span>
  </div>
  <div class="metric">
    <span class="number">4.2/5</span>
    <span class="label">Customer Satisfaction</span>
  </div>
  <!-- No individual contribution data shown -->
</div>`,
        explanation:
          'Showing only team-level metrics hides who actually did the work. Top contributors feel unrecognized, underperformers face no accountability, and social loafing increases because individual effort is invisible.',
        principle:
          'Aggregate-only metrics mask individual contributions and enable social loafing',
      },
    ],

    realWorld: [
      {
        company: 'Atlassian',
        product: 'Jira Assignees',
        description:
          'Jira requires a single assignee per issue. Unassigned tickets are flagged in sprint views and backlog grooming. Boards visually show each person\'s work-in-progress, making individual load and contribution transparent.',
        effectiveness: 'very-effective',
        analysis:
          'By enforcing single ownership per ticket and making WIP visible per person, Jira counteracts diffusion. Teams using Jira assignees consistently report fewer dropped tasks than teams using shared ownership models.',
      },
      {
        company: 'GitHub',
        product: 'CODEOWNERS',
        description:
          'GitHub\'s CODEOWNERS file automatically assigns specific reviewers based on file paths. Instead of requesting review from an entire team, specific individuals are tagged. Each reviewer\'s status (approved, changes requested, pending) is shown independently.',
        effectiveness: 'very-effective',
        analysis:
          'CODEOWNERS transforms code review from a group responsibility into individual obligations. Review completion rates improve significantly because each person sees their name and pending status, eliminating the assumption that someone else will review.',
      },
      {
        company: 'Slack',
        product: '@mention System',
        description:
          'Slack\'s @mention system allows users to direct messages to specific people within group channels. @here and @channel exist but best practice guides recommend @person for action items. Mentioned users receive elevated notifications.',
        effectiveness: 'effective',
        analysis:
          'Direct @mentions convert group messages into personal requests, reducing bystander effects. However, @channel and @here can still trigger diffusion when used for action items, which is why Slack recommends specific mentions.',
      },
      {
        company: 'Asana',
        product: 'Task Ownership & My Tasks',
        description:
          'Asana provides a personal "My Tasks" view that aggregates all individually assigned work. Tasks cannot have multiple assignees; subtasks must each have their own owner. The product actively discourages shared ownership.',
        effectiveness: 'very-effective',
        analysis:
          'Asana\'s design philosophy explicitly fights diffusion of responsibility. The "My Tasks" view creates a personal accountability dashboard, and the single-assignee constraint forces teams to define who owns each piece of work.',
      },
    ],

    abTests: [
      {
        title: 'Task Assignment: Individual vs Team',
        hypothesis:
          'Tasks assigned to a single individual will be completed faster than tasks assigned to a team',
        controlVersion: {
          description:
            'Tasks labeled "Assigned to: Design Team" with no individual owner, visible in shared team board',
          metrics: {
            conversionRate: '47%',
            timeOnPage: '72 hours avg completion',
            scrollDepth: '23% abandoned',
          },
        },
        treatmentVersion: {
          description:
            'Tasks assigned to a specific person with their avatar, name, and due date visible. "My Tasks" view for personal accountability.',
          metrics: {
            conversionRate: '81%',
            timeOnPage: '28 hours avg completion',
            scrollDepth: '7% abandoned',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Individual assignment increased completion rate by 72% and reduced average time-to-completion by 61%. Abandonment dropped from 23% to 7%. Teams reported clearer expectations and less duplicated effort.',
          learnings: [
            'Single assignees complete tasks 2.5x faster than team-assigned tasks',
            'Personal dashboards ("My Tasks") increase engagement with assigned work',
            'Auto-escalation for overdue individual tasks further reduces abandonment',
            'Teams still collaborate effectively even with single DRI; collaboration is not ownership',
          ],
        },
      },
      {
        title: 'Alert Routing: Group Channel vs Individual Page',
        hypothesis:
          'Routing alerts to the on-call individual will reduce incident response time compared to group channel alerts',
        controlVersion: {
          description:
            'Critical alerts posted to #incidents channel (35 members) with message: "Production issue detected. Please investigate."',
          metrics: {
            conversionRate: '62% acknowledged within SLA',
            clickThroughRate: '18 min avg first response',
          },
        },
        treatmentVersion: {
          description:
            'Critical alerts routed to specific on-call person via direct message and phone notification, with their name displayed in the incident channel as the assigned responder.',
          metrics: {
            conversionRate: '94% acknowledged within SLA',
            clickThroughRate: '4 min avg first response',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Individual alert routing improved SLA compliance by 52% and reduced first response time by 78%. The named responder in the channel also reduced confusion about who was handling the incident.',
          learnings: [
            'Direct personal alerts eliminate the bystander effect entirely',
            'Showing the assigned responder publicly prevents duplicate investigation',
            'Rotation schedules for on-call duty distribute the load fairly',
            'Escalation to a backup individual (not a group) handles cases where the primary is unavailable',
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
        name: 'Missing Assignee Indicators',
        description:
          'Tasks, tickets, or action items without a visible individual owner',
        howToSpot:
          'Look for empty avatar slots, "Unassigned" labels, or tasks attributed to teams rather than people',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Group-Only Notifications',
        description:
          'Alerts and notifications directed at channels or teams without @mentioning specific individuals',
        howToSpot:
          'Check notification routing: are critical alerts going to groups or to the responsible individual?',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Aggregate-Only Metrics',
        description:
          'Dashboards showing team totals without individual contribution breakdowns',
        howToSpot:
          'Look for metrics pages that only show team numbers; check if individual views exist',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Ambiguous Role Definitions',
        description:
          'Project or feature views that lack clarity on who is responsible for what',
        howToSpot:
          'Check if the interface clearly shows who is the DRI for each workstream, milestone, or deliverable',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Passive Action Language',
        description:
          'Interface copy using passive voice or non-specific references like "someone should" or "the team needs to"',
        howToSpot:
          'Read action prompts and alerts for passive constructions that avoid naming a responsible person',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Ownerless Task Pattern',
        description:
          'Tasks or issues that lack a single assigned individual and persist unowned',
        indicators: [
          'Empty assignee fields in task management views',
          'Tasks attributed to teams or departments rather than people',
          'No escalation path for unclaimed work items',
          'Backlogs with high percentages of unassigned items',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Broadcast Alert Pattern',
        description:
          'Critical notifications sent to entire groups without individual targeting',
        indicators: [
          'Alerts posted to group channels without @mentions',
          'Email notifications sent to distribution lists for action items',
          'Incident alerts without a named on-call responder',
          'Passive language in alerts: "please investigate", "someone should look"',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Invisible Contribution Pattern',
        description:
          'Team environments where individual work is not visible or tracked',
        indicators: [
          'No individual activity logs or contribution graphs',
          'Only team-level metrics on dashboards',
          'No attribution on completed work items',
          'Shared accounts or anonymous contributions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Ambiguous RACI Pattern',
        description:
          'Projects or workflows where roles and responsibilities are undefined or unclear',
        indicators: [
          'No RACI or role definition in project setup',
          'Multiple people listed as "responsible" for the same deliverable',
          'Overlapping responsibilities without clear boundaries',
          'No distinction between consulted and responsible parties',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does every task or action item have a single, named assignee?',
      'Are critical alerts routed to a specific individual rather than a group?',
      'Can each team member see their personal contributions and responsibilities?',
      'Is there a clear RACI or role definition for the project or workflow?',
      'Do unassigned items trigger warnings or auto-escalation?',
      'Are notifications personalized (e.g., @mention) rather than broadcast?',
      'Does the interface use active, personal language ("You need to...") rather than passive ("Someone should...")?',
      'Is individual contribution data visible alongside team metrics?',
      'Are there escalation paths for when the assigned person does not act?',
      'Does the onboarding flow define each person\'s specific role and responsibilities?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in diffusion of responsibility and the bystander effect.

Analyze the provided design for diffusion of responsibility patterns. Identify:

1. **Ownership Clarity**: Whether tasks, issues, and action items have clear individual owners
2. **Notification Targeting**: Whether alerts go to specific individuals or are broadcast to groups
3. **Contribution Visibility**: Whether individual contributions are visible and tracked
4. **Role Definition**: Whether roles and responsibilities are clearly defined (RACI or similar)
5. **Escalation Paths**: Whether unowned or unacted-upon items have escalation mechanisms

For each pattern found:
- Identify where responsibility diffusion is likely occurring
- Assess whether individual accountability is sufficient
- Determine if the design encourages or prevents bystander effects
- Evaluate the balance between individual accountability and blame culture
- Suggest specific improvements to clarify ownership

Consider:
- Are tasks assigned to individuals or teams?
- Do notifications create personal urgency or get lost in group channels?
- Can team members see their individual progress and contributions?
- Are there mechanisms to prevent tasks from remaining unowned?
- Is the accountability model transparent and fair?

Provide actionable recommendations for increasing individual ownership without creating toxic blame culture.`,

    outputSchema: {
      type: 'object',
      properties: {
        ownershipPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              ownershipClarity: { type: 'string' },
              diffusionRisk: { type: 'string' },
              currentAssignment: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'ownershipClarity',
              'diffusionRisk',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            ownershipClarity: { type: 'number' },
            notificationTargeting: { type: 'number' },
            contributionVisibility: { type: 'number' },
            escalationCoverage: { type: 'number' },
          },
          required: [
            'ownershipClarity',
            'notificationTargeting',
            'contributionVisibility',
            'escalationCoverage',
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
        'ownershipPatterns',
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
        title: 'Audit Current Ownership Gaps',
        description:
          'Identify all tasks, workflows, and processes where responsibility is shared or ambiguous',
        example:
          'Review project boards for unassigned items; audit notification routing for group-only alerts',
        tips: [
          'Count the percentage of tasks without individual assignees',
          'Map notification flows to see where group broadcasts replace personal routing',
          'Interview team members about unclear responsibilities',
        ],
      },
      {
        step: 2,
        title: 'Enforce Single-Owner Assignment',
        description:
          'Design task and ticket interfaces to require a single DRI (Directly Responsible Individual)',
        example:
          'Make the assignee field required before a task can be moved to "In Progress"',
        tips: [
          'Allow only one assignee per task; use subtasks for shared work',
          'Show unassigned items prominently with warning indicators',
          'Provide easy "Claim" buttons on unowned tasks',
        ],
      },
      {
        step: 3,
        title: 'Personalize Notifications',
        description:
          'Route alerts and action items to specific individuals rather than groups',
        example:
          'Critical alerts page the on-call person directly; the incident channel shows who is responding',
        tips: [
          'Use @mentions for action items within group channels',
          'Set up on-call rotations for incident response',
          'Personal notification preferences ensure alerts reach the right person',
        ],
      },
      {
        step: 4,
        title: 'Make Individual Contributions Visible',
        description:
          'Display personal contribution data alongside team metrics',
        example:
          'Add contribution graphs, personal task completion rates, and individual activity feeds',
        tips: [
          'Show individual progress bars on team dashboards',
          'Attribution on completed work items (who closed this, who reviewed)',
          'Personal "My Tasks" or "My Reviews" views',
        ],
      },
      {
        step: 5,
        title: 'Build Escalation Paths',
        description:
          'Create automated escalation for unowned or unacted-upon items',
        example:
          'Unassigned items auto-escalate to team lead after 24 hours; overdue tasks trigger reminders to assignee then manager',
        tips: [
          'Time-based escalation prevents items from languishing',
          'Escalate to a specific person, not a group',
          'Track escalation frequency to identify systemic ownership gaps',
        ],
      },
    ],

    dos: [
      'Assign a single DRI (Directly Responsible Individual) for every task',
      'Use @mentions to direct action items to specific people',
      'Display individual contribution data alongside team metrics',
      'Define roles clearly using RACI matrices or similar frameworks',
      'Build auto-escalation for unassigned or overdue items',
      'Use personal language: "You need to review this" not "This needs review"',
      'Show unassigned items with visual warnings to prompt ownership',
      'Create personal dashboards ("My Tasks") for individual accountability',
      'Track and celebrate individual contributions to reinforce ownership',
      'Rotate shared responsibilities (on-call, triage) on a clear schedule',
    ],

    donts: [
      'Don\'t assign tasks to teams or groups without a single individual owner',
      'Don\'t broadcast critical alerts to channels without @mentioning the responsible person',
      'Don\'t show only aggregate team metrics without individual breakdowns',
      'Don\'t use passive language like "someone should" or "the team needs to"',
      'Don\'t allow tasks to remain unassigned indefinitely without escalation',
      'Don\'t create blame culture; accountability is not punishment',
      'Don\'t hide individual contributions behind team-level dashboards',
      'Don\'t assume that adding more people to a task makes it more likely to get done',
      'Don\'t rely on "shared ownership" for critical deliverables',
      'Don\'t send all notifications at the same priority level; personal action items need elevation',
    ],

    bestPractices: [
      {
        title: 'One Task, One Owner',
        description:
          'Every work item has exactly one person who is responsible for its completion',
        rationale:
          'Single ownership eliminates the "I thought someone else was doing it" problem',
        example:
          'Jira tickets with required assignee field; Asana tasks with single-owner constraint',
      },
      {
        title: 'Personal Notification Routing',
        description:
          'Action items reach the specific person who should act, not a group',
        rationale:
          'Direct personal alerts eliminate the bystander effect that occurs with group notifications',
        example:
          'PagerDuty routing to on-call individual; Slack @mentions for code review requests',
      },
      {
        title: 'Visible Individual Contributions',
        description:
          'Each person\'s work is tracked, displayed, and recognized separately from team totals',
        rationale:
          'When contributions are visible, social loafing decreases and intrinsic motivation increases',
        example:
          'GitHub contribution graphs; sprint burndown by individual; personal review completion rate',
      },
      {
        title: 'Escalation by Default',
        description:
          'Unowned or overdue items automatically escalate to a specific person after a defined period',
        rationale:
          'Automated escalation ensures no task falls through the cracks due to diffusion',
        example:
          'Unassigned bug auto-assigns to team lead after 24 hours; overdue PR review escalates to engineering manager',
      },
      {
        title: 'Accountability Without Blame',
        description:
          'Make ownership clear while maintaining psychological safety and blameless culture',
        rationale:
          'Excessive individual blame creates fear and reduces initiative; healthy accountability balances clarity with safety',
        example:
          'Blameless post-mortems with action items assigned to individuals; celebrating ownership, not punishing mistakes',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure ownership information is programmatically determinable',
        implementation:
          'Use ARIA labels on assignee avatars and task ownership indicators so screen readers announce who is responsible for each item',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to indicate ownership status',
        implementation:
          'Combine color with text labels and icons for unassigned/assigned states: use "Unassigned" text alongside red warning icon, not just a red border',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for personal task views',
        implementation:
          'Label personal sections clearly: "Your Assigned Tasks", "Your Pending Reviews", "Items Awaiting Your Action"',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Announce ownership changes and escalations',
        implementation:
          'Use ARIA live regions to announce when tasks are assigned, reassigned, or escalated so all users are aware of ownership changes',
      },
    ],

    ethics: [
      {
        concern: 'Surveillance Culture',
        severity: 'high',
        explanation:
          'Excessive individual tracking can feel like surveillance, reducing trust and autonomy',
        mitigation:
          'Focus on outcome visibility rather than activity monitoring. Show what was completed, not keystrokes or hours logged. Give users control over what detail is shared.',
      },
      {
        concern: 'Blame Culture',
        severity: 'critical',
        explanation:
          'Over-emphasis on individual accountability can create a blame culture where people fear taking ownership of difficult tasks',
        mitigation:
          'Pair individual ownership with blameless post-mortems. Celebrate ownership and initiative. Frame accountability as clarity, not punishment.',
      },
      {
        concern: 'Inequitable Workload Distribution',
        severity: 'high',
        explanation:
          'Visible contribution tracking can create pressure to take on more work, disadvantaging those with caregiving or other responsibilities',
        mitigation:
          'Measure quality and impact, not just quantity. Account for different work types (mentoring, planning) that may not show as task completion. Ensure equitable assignment practices.',
      },
      {
        concern: 'Privacy of Performance Data',
        severity: 'medium',
        explanation:
          'Making individual contribution data public can be embarrassing or stigmatizing for underperformers',
        mitigation:
          'Share detailed individual data with the person and their manager only. Show team-level individual contributions in aggregate categories. Allow opt-in to public contribution displays.',
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
          'The foundational paper demonstrating that individuals are less likely to help when others are present, establishing diffusion of responsibility as a social-psychological phenomenon',
        type: 'foundational',
      },
      {
        title: 'Diffusion of Responsibility as a Determinant of Risk Taking by Groups',
        author: 'Wallach, M. A., Kogan, N., & Bem, D. J.',
        year: 1964,
        doi: '10.1037/h0042190',
        description:
          'Demonstrates that group decision-making leads to riskier choices because responsibility for outcomes is diffused across members',
        type: 'foundational',
      },
      {
        title: 'Many Hands Make Light the Work: The Causes and Consequences of Social Loafing',
        author: 'Latané, B., Williams, K., & Harkins, S.',
        year: 1979,
        doi: '10.1037/0022-3514.37.6.822',
        description:
          'Foundational research on social loafing showing that individuals reduce effort when working in groups, with effort decreasing as group size increases',
        type: 'foundational',
      },
      {
        title: 'The Unresponsive Bystander: Why Doesn\'t He Help?',
        author: 'Latané, B., & Darley, J. M.',
        year: 1970,
        description:
          'Comprehensive study of the bystander effect with multiple experiments showing how diffusion of responsibility operates in various contexts',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Unresponsive Bystander: Why Doesn\'t He Help?',
        author: 'Latané, Bibb & Darley, John M.',
        year: 1970,
        isbn: '9780139386138',
        description:
          'The definitive book on bystander effect and diffusion of responsibility by the researchers who discovered the phenomenon',
        type: 'foundational',
      },
      {
        title: 'Social Psychology',
        author: 'Aronson, Elliot',
        year: 2018,
        isbn: '9780134641287',
        description:
          'Comprehensive social psychology textbook with detailed coverage of diffusion of responsibility, social loafing, and group dynamics',
        type: 'foundational',
      },
      {
        title: 'Team of Teams: New Rules of Engagement for a Complex World',
        author: 'McChrystal, Stanley',
        year: 2015,
        isbn: '9781591847489',
        description:
          'Practical framework for combating diffusion of responsibility in organizations through shared consciousness and empowered execution',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How to Assign Responsibility in Product Teams',
        author: 'Atlassian',
        url: 'https://www.atlassian.com/team-playbook/plays/roles-and-responsibilities',
        description:
          'Practical guide for defining individual roles and responsibilities in product teams to prevent diffusion',
        type: 'practical',
      },
      {
        title: 'The RACI Matrix: Your Blueprint for Project Success',
        author: 'Project Management Institute',
        url: 'https://www.pmi.org/',
        description:
          'Guide to implementing RACI matrices that assign clear individual accountability for project tasks',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Bystander Effect - Why Don\'t We Help?',
        author: 'Vsauce',
        url: 'https://www.youtube.com/watch?v=OSsPfbup0ac',
        description:
          'Accessible explanation of diffusion of responsibility and the bystander effect with real-world examples',
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
      'social-loafing',       // Reduced effort in groups, closely related mechanism
      'bystander-effect',     // The emergency-specific manifestation of diffusion
      'groupthink',           // Group dynamics reducing individual critical thinking
      'pluralistic-ignorance', // Misreading group inaction as evidence nothing is wrong
    ],

    conflicts: [
      'social-facilitation',  // Presence of others sometimes increases individual effort
      'spotlight-effect',     // Feeling overly observed can increase personal responsibility
    ],

    confusedWith: [
      'social-loafing',       // Overlaps but social loafing is specifically about effort reduction
      'bystander-effect',     // Specific case of diffusion in emergency contexts
      'free-rider-problem',   // Economic concept related but focused on incentive structures
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'bystander-effect',
        'social-loafing',
      ],
    },
  },
};
