/**
 * EGOCENTRIC BIAS
 *
 * The tendency to overestimate one's own contribution
 * or importance relative to others in a group.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const egocentricBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'egocentric-bias',
    name: 'Egocentric Bias',
    aliases: ['Self-Serving Attribution', 'Egocentric Attribution', 'I Did More Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.SOCIAL,
    ],
    tags: [
      'collaboration',
      'attribution',
      'memory',
      'self-perception',
      'team-dynamics',
      'contribution',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People overestimate their own contribution or importance relative to others in a group.',

    detailed: `Egocentric bias is a cognitive bias in which individuals overestimate the extent of their own contributions to a joint effort or group outcome. When team members are asked to estimate their individual contributions, the sum of all self-assessments routinely exceeds 100%, because each person inflates their own share.

This bias arises because people have richer, more accessible memories of their own actions than of others' actions. You remember the late nights you put in, the ideas you proposed, the problems you solved — but you have limited visibility into what your collaborators did independently.

In UX design, egocentric bias is critical for collaborative tools, team dashboards, contribution tracking, and any interface where shared ownership or credit attribution is involved. Failing to account for this bias leads to resentment, disengagement, and conflict among team members who all feel undervalued.`,

    psychologyBasis: {
      discoveredBy: 'Michael Ross and Fiore Sicoly',
      year: 1979,
      theory: 'Egocentric Biases in Availability and Attribution',
      mechanism: `The bias stems from differential availability of self-relevant information in memory. This happens because:

1. **Retrieval Asymmetry**: People have direct access to memories of their own contributions but must infer or recall others' contributions from limited observation
2. **Encoding Advantage**: Our own actions are encoded with rich sensory and emotional context, making them more vivid and accessible
3. **Selective Attention**: We naturally attend more to our own efforts during collaboration than to teammates' efforts
4. **Generation Effect**: Ideas we generate ourselves are better remembered than ideas others generate, even in brainstorming sessions
5. **Motivational Component**: Self-enhancement motives amplify the tendency to recall personal contributions favorably`,
    },

    realWorldExample: `Ross and Sicoly (1979) asked married couples to independently estimate their own contribution to household tasks (cleaning, cooking, childcare, etc.). When each spouse's self-reported percentage was summed, the total consistently exceeded 100% — often by 20-40 percentage points. Each partner genuinely believed they did more than half the work, not out of dishonesty, but because their own efforts were simply more memorable and vivid than their partner's.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Egocentric bias profoundly affects how users perceive fairness, credit, and ownership in collaborative interfaces. Designers must account for this to:

- Present contribution data objectively to reduce disputes and resentment
- Design attribution systems that make all team members' work visible
- Build dashboards that surface the full picture of collaborative effort
- Create feedback loops that acknowledge individual contributions without inflating self-perception
- Foster team cohesion by making invisible contributions visible`,

    whenToUse: [
      {
        title: 'Contribution Tracking in Collaborative Tools',
        scenario:
          'When displaying who did what in shared projects, documents, or codebases',
        example:
          'Show objective contribution metrics (edits, commits, comments) with clear attribution rather than relying on self-reported effort',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Team Dashboards',
        scenario: 'When building dashboards that display team performance and individual contributions',
        example:
          'Present all team members\' contributions side by side with equal visual weight, using objective data like completed tasks or hours logged',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Credit Attribution in Shared Projects',
        scenario: 'When assigning credit or recognition for collaborative work',
        example:
          'Use automated contribution logs rather than manual credit assignment to reduce egocentric inflation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Peer Review and Feedback',
        scenario: 'When collecting or displaying peer evaluations in team settings',
        example:
          'Include both self-assessment and peer-assessment views to reveal perception gaps',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Shared Ownership Interfaces',
        scenario: 'When managing shared resources, accounts, or responsibilities',
        example:
          'Display responsibility distribution transparently with clear ownership indicators and activity history',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Individual Performance Reviews',
        reason:
          'Surfacing comparative contribution data in individual reviews can create defensiveness',
        consequence:
          'Employees may feel surveilled or unfairly compared, damaging morale and trust',
        alternative:
          'Use contribution data for team-level insights; keep individual reviews focused on personal growth and goals',
      },
      {
        title: 'Competitive Team Environments',
        reason:
          'Exposing granular contribution differences in highly competitive settings can fuel rivalry',
        consequence:
          'Team members may optimize for visible metrics rather than actual value, or sabotage peers',
        alternative:
          'Emphasize team outcomes and collective achievements over individual contribution rankings',
      },
      {
        title: 'Creative Collaboration',
        reason:
          'Quantifying contributions to creative work (ideas, design direction) is inherently reductive',
        consequence:
          'People whose contributions are qualitative rather than quantitative feel undervalued',
        alternative:
          'Supplement quantitative metrics with qualitative acknowledgment of different contribution types',
      },
      {
        title: 'Sensitive Relationship Contexts',
        reason:
          'Exposing contribution imbalances in personal or family-shared tools can cause conflict',
        consequence:
          'Relationship tension when one partner feels their invisible labor is being quantified',
        alternative:
          'Focus on task completion and coordination rather than comparative contribution metrics',
      },
    ],

    commonMistakes: [
      {
        title: 'Only Tracking Visible Contributions',
        description:
          'Counting only commits, edits, or messages while ignoring review, mentoring, and coordination work',
        why: 'Invisible labor (code review, planning, unblocking others) is real contribution that egocentric bias already underweights in others\' perception',
        fix: 'Track and display diverse contribution types: reviews, comments, approvals, mentoring sessions, not just direct output',
      },
      {
        title: 'Relying on Self-Reported Contribution',
        description:
          'Asking team members to estimate their own contribution percentage',
        why: 'Egocentric bias guarantees self-reports will sum to well over 100%, creating unfairness',
        fix: 'Use objective, automated tracking rather than self-assessment for contribution metrics',
      },
      {
        title: 'Equal-Split Default Assumption',
        description:
          'Defaulting to equal credit distribution regardless of actual contribution',
        why: 'While it avoids egocentric inflation, it demotivates high contributors and enables free-riding',
        fix: 'Use data-driven attribution that reflects actual activity while acknowledging different contribution types',
      },
      {
        title: 'Leaderboard-Style Rankings',
        description:
          'Ranking team members by contribution volume in competitive leaderboards',
        why: 'Quantity metrics reward busywork over impact and trigger defensive egocentric responses',
        fix: 'Show contribution distribution without competitive ranking; emphasize team progress toward shared goals',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whose contributions are most visible and prominent',
        examples: [
          'Placing the current user\'s contributions first reinforces egocentric perspective',
          'Side-by-side team contribution views provide balanced perspective',
          'Activity timelines showing all contributors reduce self-serving memory gaps',
          'Dashboard layouts that default to "My Contributions" vs "Team Contributions" frame perception differently',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis can amplify or mitigate egocentric perception',
        examples: [
          'Bold emphasis on the current user\'s name in contributor lists reinforces self-focus',
          'Equal typographic weight for all contributors promotes balanced perception',
          'Contributor labels with role descriptions acknowledge different contribution types',
          'Summary text framing ("You and 4 others" vs "5 team members") shifts perspective',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding in contribution displays affects perception of relative effort',
        examples: [
          'Bright color for own contributions vs muted for others amplifies egocentric view',
          'Distinct but equal-saturation colors for each contributor promote fairness',
          'Heat maps of activity can make invisible contributions visible',
          'Contribution pie charts with balanced color palettes reduce self-serving interpretation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive features determine which perspective users default to',
        examples: [
          'Defaulting to "My Work" view reinforces egocentric perspective; "Team View" counteracts it',
          'Hover states revealing who contributed to specific elements increase attribution awareness',
          'Toggle between self-view and team-view helps users calibrate their perception',
          'Activity feeds showing real-time teammate actions make others\' work visible',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing shapes whether users see contributions egocentrically or collectively',
        examples: [
          '"Your contributions this week" frames egocentrically; "Team progress this week" frames collectively',
          'Contribution summaries listing all contributors reduce self-serving recall',
          'Notification language ("You edited" vs "3 people edited") shifts attribution',
          'Achievement messages crediting the team counteract individual inflation',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible contribution displays must convey balanced attribution through all modalities',
        examples: [
          'Screen readers should announce all contributors, not just the current user',
          'Contribution charts need text alternatives that include all team members\' data',
          'Keyboard navigation through contributor lists should give equal access to all members\' work',
          'ARIA labels on contribution visualizations should describe relative proportions, not just the user\'s share',
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
        title: 'Balanced Team Contribution Dashboard',
        description:
          'Project management tool showing all team members\' contributions with equal visual weight',
        code: `<div class="team-contributions">
  <h3>Sprint 14 — Team Contributions</h3>
  <div class="contribution-chart">
    <div class="member" style="--share: 28%">
      <span class="avatar">AS</span>
      <span class="name">Alice S.</span>
      <span class="metrics">14 tasks, 8 reviews, 3 mentoring sessions</span>
      <div class="bar" aria-label="28% of team output"></div>
    </div>
    <div class="member" style="--share: 24%">
      <span class="avatar">BT</span>
      <span class="name">Bob T.</span>
      <span class="metrics">11 tasks, 12 reviews, 5 unblocks</span>
      <div class="bar" aria-label="24% of team output"></div>
    </div>
    <div class="member" style="--share: 26%">
      <span class="avatar">CD</span>
      <span class="name">Carol D.</span>
      <span class="metrics">13 tasks, 6 reviews, 2 docs written</span>
      <div class="bar" aria-label="26% of team output"></div>
    </div>
    <div class="member" style="--share: 22%">
      <span class="avatar">DM</span>
      <span class="name">Dan M.</span>
      <span class="metrics">9 tasks, 15 reviews, 4 architecture decisions</span>
      <div class="bar" aria-label="22% of team output"></div>
    </div>
  </div>
  <p class="note">Contributions include tasks, code reviews, mentoring,
  documentation, and unblocking — not just direct output.</p>
</div>`,
        explanation:
          'Shows all team members with equal visual emphasis and tracks diverse contribution types (reviews, mentoring, unblocking), not just task completion. This counters egocentric bias by making invisible labor visible.',
        principle:
          'Equal visual weight and diverse metrics reduce egocentric over-claiming',
        metrics: {
          before: 'Team satisfaction with credit attribution: 5.2/10',
          after: 'Team satisfaction with credit attribution: 8.1/10',
          improvement: '56% increase in perceived fairness of contribution tracking',
        },
      },
      {
        title: 'Multi-Contributor Document History',
        description:
          'Collaborative document showing rich edit history with all contributors\' changes',
        code: `<div class="document-history">
  <h3>Document Contributors</h3>
  <div class="timeline">
    <div class="edit" data-author="alice">
      <span class="time">2h ago</span>
      <span class="author">Alice</span>
      <span class="action">Restructured sections 2-4</span>
    </div>
    <div class="edit" data-author="bob">
      <span class="time">3h ago</span>
      <span class="author">Bob</span>
      <span class="action">Added data tables and citations</span>
    </div>
    <div class="edit" data-author="carol">
      <span class="time">5h ago</span>
      <span class="author">Carol</span>
      <span class="action">Reviewed and left 12 comments</span>
    </div>
    <div class="edit" data-author="you">
      <span class="time">6h ago</span>
      <span class="author">You</span>
      <span class="action">Drafted introduction and conclusion</span>
    </div>
  </div>
  <div class="summary">
    <p>4 contributors · 47 edits · 12 comments · 3 review rounds</p>
  </div>
</div>`,
        explanation:
          'The detailed timeline makes every contributor\'s work visible, countering the tendency to remember only one\'s own edits. The summary line reinforces that this was a collective effort.',
        principle:
          'Visible edit history with all contributors reduces egocentric recall distortion',
      },
      {
        title: 'Self-vs-Team Perception Calibration',
        description:
          'Tool that helps users see the gap between self-assessed and objective contribution',
        code: `<div class="perception-calibration">
  <h3>Contribution Perception Check</h3>
  <div class="comparison">
    <div class="self-estimate">
      <h4>Your Estimate</h4>
      <p class="percentage">45%</p>
      <p class="label">of project work</p>
    </div>
    <div class="objective-data">
      <h4>Tracked Activity</h4>
      <p class="percentage">28%</p>
      <p class="label">of project work</p>
    </div>
    <div class="gap-indicator">
      <p class="gap">+17% perception gap</p>
      <p class="context">This is normal — everyone overestimates
      their own contribution by 15-20% on average.</p>
    </div>
  </div>
  <p class="reassurance">This doesn't mean your work isn't valued.
  It means memory naturally emphasizes your own effort.
  Your teammates experience the same effect.</p>
</div>`,
        explanation:
          'Directly surfaces the egocentric gap in a non-judgmental way, normalizing it as a universal cognitive pattern rather than a personal failing. Builds awareness without blame.',
        principle:
          'Calibration tools that normalize the bias help users adjust without defensiveness',
        metrics: {
          before: 'Average self-estimated contribution: 42% (team of 4)',
          after: 'Average self-estimated contribution: 31% (team of 4) after calibration',
          improvement: '26% reduction in egocentric over-claiming after using calibration tool',
        },
      },
    ],

    bad: [
      {
        title: 'Self-Centric Default Dashboard',
        description:
          'Team tool that defaults to showing only the current user\'s contributions',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <h2>Your Amazing Contributions!</h2>
  <div class="hero-stat">
    <span class="number">47</span>
    <span class="label">tasks completed this month</span>
  </div>
  <div class="hero-stat">
    <span class="number">#1</span>
    <span class="label">top contributor this sprint</span>
  </div>
  <p class="motivational">You're carrying the team! Keep it up!</p>
  <!-- Team contributions buried in a secondary tab -->
</div>`,
        explanation:
          'Celebrates individual contributions in isolation, reinforcing egocentric bias. The "carrying the team" language actively undermines appreciation for teammates. Team view being secondary makes others\' work invisible.',
        principle:
          'Self-centric defaults amplify egocentric bias rather than counteracting it',
      },
      {
        title: 'Competitive Contribution Leaderboard',
        description:
          'Ranking team members by a single metric',
        code: `<!-- DON'T DO THIS -->
<div class="leaderboard">
  <h3>Top Contributors This Week</h3>
  <ol>
    <li class="gold">Alice — 23 commits</li>
    <li class="silver">Bob — 18 commits</li>
    <li class="bronze">Carol — 14 commits</li>
    <li class="last">Dan — 7 commits</li>
  </ol>
  <p>Step it up, team! Only top contributors get recognized.</p>
</div>`,
        explanation:
          'Single-metric leaderboards reward volume over value (Dan might have done crucial architecture work). The competitive framing combines with egocentric bias to create resentment: everyone feels they deserve higher ranking.',
        principle:
          'Single-metric competitive rankings amplify egocentric resentment and reward gaming',
      },
      {
        title: 'Self-Reported Credit Assignment',
        description:
          'Asking team members to claim credit percentages',
        code: `<!-- DON'T DO THIS -->
<form class="credit-form">
  <h3>How much did you contribute to this project?</h3>
  <input type="range" min="0" max="100" value="50">
  <p>Your contribution: <span class="value">50%</span></p>
  <button type="submit">Submit My Contribution</button>
</form>`,
        explanation:
          'Self-reported contribution will always sum to well over 100% due to egocentric bias. This creates a lose-lose: either the system shows inflated numbers (dishonest) or adjusts them down (feels unfair to everyone).',
        principle:
          'Never rely on self-reported contribution percentages — egocentric bias guarantees inflation',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Docs Version History',
        description: 'Google Docs shows a detailed version history with color-coded highlights per contributor, making every person\'s edits visible in context. Users can see exactly who wrote or changed each section, countering the tendency to overweight their own contributions.',
        effectiveness: 'very-effective',
        analysis: 'Color-coded attribution per contributor directly counteracts egocentric recall by providing objective evidence of who did what. The visual format makes invisible contributions (edits, restructuring, commenting) visible alongside original authorship.',
      },
      {
        company: 'GitHub',
        product: 'Commit Attribution & Blame View',
        description: 'GitHub\'s contribution graph, commit history, and blame view provide objective, timestamped records of every contributor\'s work. The insights tab shows contribution distribution across all team members with multiple metrics (commits, additions, deletions, reviews).',
        effectiveness: 'very-effective',
        analysis: 'Objective, automated tracking eliminates self-reporting bias. Multiple metrics (not just commit count) acknowledge different contribution types. The blame view makes authorship transparent at the line level, leaving no room for egocentric inflation.',
      },
      {
        company: 'Figma',
        product: 'Version History & Multiplayer Cursors',
        description: 'Figma\'s real-time multiplayer cursors and version history show exactly who is working on what. Named cursors, timestamped versions, and contributor avatars make collaboration transparent. Users can replay the full design history to see each person\'s changes.',
        effectiveness: 'effective',
        analysis: 'Real-time visibility of teammates\' activity counters egocentric bias by making others\' contributions continuously visible, not just during retrospective review. The ability to replay history provides objective evidence against inflated self-assessment.',
      },
      {
        company: 'Slack',
        product: 'Channel Analytics',
        description: 'Slack\'s analytics show message volume, reaction patterns, and participation rates across team members. While primarily for workspace admins, these metrics provide objective data about communication contribution patterns.',
        effectiveness: 'effective',
        analysis: 'Objective participation metrics help managers identify contribution imbalances that egocentric bias might obscure. However, message volume alone can be misleading — quality of contribution matters more than quantity of messages.',
      },
    ],

    abTests: [
      {
        title: 'Team Dashboard: Self-First vs Team-First Default',
        hypothesis:
          'Defaulting to a team view will reduce egocentric over-claiming and improve team satisfaction',
        controlVersion: {
          description:
            'Dashboard defaults to "My Contributions" tab showing the user\'s individual stats prominently, with team view available in secondary tab',
          metrics: {
            conversionRate: 'Self-estimated contribution: 41% avg (team of 4)',
            timeOnPage: '2:15 on My tab, 0:30 on Team tab',
            scrollDepth: 'Team satisfaction: 5.8/10',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard defaults to "Team Progress" view showing all members\' contributions side by side, with individual drill-down available',
          metrics: {
            conversionRate: 'Self-estimated contribution: 29% avg (team of 4)',
            timeOnPage: '3:45 on Team tab, 1:10 on individual views',
            scrollDepth: 'Team satisfaction: 7.9/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Team-first default reduced egocentric over-claiming by 29% and improved team satisfaction by 36%. Users spent more time reviewing teammates\' work and reported feeling more aware of others\' contributions.',
          learnings: [
            'Default view strongly shapes self-perception of contribution',
            'Team-first framing naturally calibrates egocentric bias',
            'Users appreciated seeing teammates\' invisible work (reviews, mentoring)',
            'Self-estimated contribution moved closer to objective 25% for 4-person team',
          ],
        },
      },
      {
        title: 'Attribution: Single Metric vs Multi-Metric Contribution Display',
        hypothesis:
          'Showing multiple contribution types will improve perceived fairness',
        controlVersion: {
          description:
            'Contribution dashboard showing only task completion counts per team member',
          metrics: {
            conversionRate: 'Perceived fairness: 5.4/10',
            clickThroughRate: 'Team conflict incidents: 3.2/month',
          },
        },
        treatmentVersion: {
          description:
            'Contribution dashboard showing tasks, reviews, mentoring, documentation, and coordination metrics per team member',
          metrics: {
            conversionRate: 'Perceived fairness: 8.2/10',
            clickThroughRate: 'Team conflict incidents: 1.1/month',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Multi-metric attribution increased perceived fairness by 52% and reduced team conflict by 66%. Team members whose contributions were primarily in reviews, mentoring, or coordination felt significantly more valued.',
          learnings: [
            'Single-metric attribution penalizes non-obvious contributions',
            'Making invisible labor visible directly reduces egocentric conflict',
            'Teams with multi-metric tracking reported higher psychological safety',
            'Contributors shifted effort toward under-tracked activities once they became visible',
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
        name: 'Self-Centric Default Views',
        description:
          'Dashboards that default to showing the current user\'s contributions without team context',
        howToSpot:
          'Check if the default landing view highlights "My" contributions, tasks, or activity without showing teammates',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single-Metric Contribution Displays',
        description:
          'Contribution tracking based on a single quantitative metric (commits, tasks, messages)',
        howToSpot:
          'Look for leaderboards or rankings based on one number; check if review, mentoring, and coordination work is tracked',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Self-Reported Credit Systems',
        description:
          'Interfaces that ask users to estimate or claim their own contribution percentage',
        howToSpot:
          'Look for input fields, sliders, or forms asking "How much did you contribute?"',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unequal Visual Weight in Contributor Displays',
        description:
          'Current user\'s contributions displayed with more prominence than teammates\'',
        howToSpot:
          'Compare visual treatment (size, color, position) of the user\'s data vs teammates\' data in contribution views',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Attribution on Shared Work',
        description:
          'Collaborative outputs that don\'t show who contributed what',
        howToSpot:
          'Check if shared documents, designs, or code show contributor history and per-person attribution',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Individual Hero Pattern',
        description: 'Design that celebrates individual contributors while minimizing team effort',
        indicators: [
          '"Top Contributor" badges or rankings',
          'Individual achievement notifications without team context',
          'Leaderboards ranking team members competitively',
          'Hero metrics highlighting one person\'s output',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Invisible Labor Pattern',
        description: 'Contribution tracking that only counts direct output, ignoring supporting work',
        indicators: [
          'Only commits/tasks counted, not reviews or mentoring',
          'No tracking of coordination, planning, or unblocking',
          'Documentation and knowledge-sharing not attributed',
          'Meeting facilitation and conflict resolution not measured',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Self-Serving Default Pattern',
        description: 'Default views and framing that reinforce the user\'s own perspective',
        indicators: [
          'Landing page defaults to "My Work" or "My Contributions"',
          'Notifications emphasize user\'s achievements over team\'s',
          'Summary emails highlight individual stats first',
          'Activity feeds filtered to self by default',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Contribution Inflation Pattern',
        description: 'Systems that enable or encourage inflated self-assessment',
        indicators: [
          'Self-reported contribution percentages',
          'Manual credit claiming without validation',
          'No comparison between self-assessment and objective data',
          'Absence of peer assessment or 360-degree feedback',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the default view show team contributions or only individual contributions?',
      'Are multiple contribution types tracked (code, reviews, mentoring, coordination)?',
      'Is contribution data based on objective tracking or self-reporting?',
      'Do all team members receive equal visual weight in contribution displays?',
      'Is there a mechanism for users to see how their perception compares to objective data?',
      'Are invisible contributions (reviews, mentoring, unblocking) surfaced and attributed?',
      'Does the framing emphasize collective achievement or individual competition?',
      'Can users easily view teammates\' contributions alongside their own?',
      'Are contribution metrics gameable (rewarding volume over value)?',
      'Is the system designed to reduce egocentric over-claiming or amplify it?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in egocentric bias and collaborative attribution.

Analyze the provided design for egocentric bias patterns. Identify:

1. **Attribution Systems**: How contributions are tracked, measured, and displayed
2. **Default Perspectives**: Whether views default to self-centric or team-centric framing
3. **Contribution Visibility**: Which types of work are visible vs invisible in the interface
4. **Competitive vs Collaborative Framing**: Whether the design promotes individual competition or team cohesion
5. **Self-Reporting Risks**: Any reliance on self-assessed contribution data

For each pattern found:
- Identify whether it amplifies or mitigates egocentric bias
- Assess the impact on team dynamics and perceived fairness
- Determine if contribution tracking is comprehensive or narrow
- Evaluate whether invisible labor is surfaced
- Suggest improvements for balanced attribution

Consider:
- Does the design help users calibrate their self-perception?
- Are all contribution types (direct output, reviews, mentoring, coordination) visible?
- Is there risk of contribution gaming (optimizing for tracked metrics)?
- Does the framing promote team cohesion or individual competition?
- Are there accessibility implications for contribution displays?

Provide actionable recommendations for ethical, balanced contribution attribution.`,

    outputSchema: {
      type: 'object',
      properties: {
        egocentricPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              amplifiesOrMitigates: { type: 'string' },
              contributionTypes: { type: 'string' },
              fairnessImpact: { type: 'string' },
              teamDynamicsEffect: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'amplifiesOrMitigates',
              'fairnessImpact',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            attributionBalance: { type: 'number' },
            contributionVisibility: { type: 'number' },
            teamCohesionScore: { type: 'number' },
            fairnessScore: { type: 'number' },
          },
          required: [
            'attributionBalance',
            'contributionVisibility',
            'teamCohesionScore',
            'fairnessScore',
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
        'egocentricPatterns',
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
        title: 'Audit Contribution Tracking',
        description:
          'Identify all types of contributions in your collaborative tool and determine which are currently tracked and visible',
        example:
          'Map contribution types: direct output (code, designs, writing), reviews, mentoring, coordination, documentation, unblocking, planning',
        tips: [
          'Interview team members about work they do that feels unrecognized',
          'Observe collaboration patterns to identify invisible labor',
          'List both quantitative (commits, tasks) and qualitative (mentoring, decisions) contributions',
        ],
      },
      {
        step: 2,
        title: 'Implement Objective Attribution',
        description:
          'Build automated tracking for as many contribution types as possible, reducing reliance on self-reporting',
        example:
          'Track commits, pull request reviews, comments, approvals, documentation edits, meeting facilitation — all automatically',
        tips: [
          'Use existing tool integrations (Git, project management, communication) for objective data',
          'Avoid relying on self-reported effort or contribution percentages',
          'Timestamp and attribute all actions automatically',
        ],
      },
      {
        step: 3,
        title: 'Design Team-First Default Views',
        description:
          'Make the default dashboard or landing view show team-level contribution data rather than individual-only data',
        example:
          'Default to "Team Sprint Progress" showing all members\' contributions, with drill-down to individual views',
        tips: [
          'Show all contributors with equal visual weight by default',
          'Make individual views available but not the default',
          'Use framing language that emphasizes collective achievement',
        ],
      },
      {
        step: 4,
        title: 'Surface Diverse Contribution Types',
        description:
          'Display multiple metrics that capture different forms of contribution, not just direct output',
        example:
          'Show cards for: Tasks Completed, Reviews Given, People Mentored, Docs Written, Blockers Removed',
        tips: [
          'Give equal visual weight to all contribution types',
          'Help users understand that reviews and mentoring are as valuable as direct output',
          'Avoid single-metric leaderboards that reward one type of work',
        ],
      },
      {
        step: 5,
        title: 'Build Calibration Mechanisms',
        description:
          'Help users compare their perception of their contribution with objective data to build self-awareness',
        example:
          'Optional "Perception Check": compare self-estimated contribution % with tracked activity, with normalizing messaging',
        tips: [
          'Frame the gap as normal and universal, not as personal failing',
          'Use non-judgmental language: "Everyone overestimates by 15-20% — it\'s human"',
          'Make calibration optional and private to avoid defensiveness',
        ],
      },
    ],

    dos: [
      'Default to team-level contribution views rather than individual-centric views',
      'Track and display multiple contribution types (output, reviews, mentoring, coordination)',
      'Use automated, objective tracking rather than self-reported contribution',
      'Give all team members equal visual weight in contribution displays',
      'Frame achievements as team accomplishments with individual acknowledgment',
      'Normalize egocentric bias — help users understand it\'s universal, not personal',
      'Provide calibration tools that compare self-perception with objective data',
      'Make invisible contributions (reviews, unblocking, mentoring) visible and valued',
    ],

    donts: [
      'Don\'t default to showing only the current user\'s contributions',
      'Don\'t rank team members on single-metric leaderboards',
      'Don\'t rely on self-reported contribution percentages for credit attribution',
      'Don\'t celebrate individual "heroes" without acknowledging team support',
      'Don\'t track only direct output while ignoring review, coordination, and mentoring',
      'Don\'t use competitive framing for collaborative teams',
      'Don\'t give the current user\'s data more visual prominence than teammates\'',
      'Don\'t make contribution metrics easily gameable (optimizing for volume over value)',
    ],

    bestPractices: [
      {
        title: 'Team-First Default with Individual Drill-Down',
        description:
          'Default dashboard shows team progress and all contributions; individual detail available on demand',
        rationale:
          'Team-first framing naturally calibrates egocentric bias by making others\' work visible immediately',
        example:
          'Sprint dashboard shows team velocity, all members\' contributions, and shared goals before any individual stats',
      },
      {
        title: 'Multi-Metric Attribution',
        description:
          'Track and display diverse contribution types with equal visual weight',
        rationale:
          'Single metrics create blind spots that egocentric bias exploits; diverse metrics capture the full picture',
        example:
          'Contribution cards: Code (commits), Quality (reviews), Knowledge (docs), Support (mentoring, unblocking)',
      },
      {
        title: 'Automated Objective Tracking',
        description:
          'Use system-generated activity data rather than self-reported estimates',
        rationale:
          'Self-reporting is inherently distorted by egocentric bias; automated data provides ground truth',
        example:
          'Integrate with Git, project management tools, and communication platforms for automatic attribution',
      },
      {
        title: 'Perception Calibration Tools',
        description:
          'Optional, private tools that help users compare their perception with objective data',
        rationale:
          'Awareness of the bias is the first step to correcting it; calibration builds self-awareness without blame',
        example:
          '"Perception Check" widget: "You estimated 40%. Tracked data shows 26%. The gap is normal — studies show everyone overestimates by ~15%."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Contribution data for all team members must be semantically structured',
        implementation:
          'Use proper table markup or list structures for contribution displays so screen readers convey all team members\' data, not just the current user\'s',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Don\'t rely only on color to distinguish contributors',
        implementation:
          'Combine color coding with text labels, patterns, or icons so color-blind users can distinguish between different team members\' contributions',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content — Contribution charts and graphs need text alternatives',
        implementation:
          'Provide alt text for contribution visualizations that includes all team members\' data proportionally, not just the current user\'s share',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Use clear headings that frame contribution data as team-level',
        implementation:
          'Label sections as "Team Contributions" rather than "Your Contributions" to set balanced expectations for all users including screen reader users',
      },
    ],

    ethics: [
      {
        concern: 'Surveillance and Privacy',
        severity: 'critical',
        explanation:
          'Granular contribution tracking can feel like workplace surveillance, especially for lower-performing team members',
        mitigation:
          'Make individual contribution data private by default. Share team-level aggregates publicly and individual details only with the individual and their direct manager, with consent.',
      },
      {
        concern: 'Metric Gaming',
        severity: 'high',
        explanation:
          'When contributions are tracked and visible, people optimize for tracked metrics rather than actual value',
        mitigation:
          'Track diverse contribution types and rotate which metrics are emphasized. Focus on outcomes and team goals rather than individual activity volume.',
      },
      {
        concern: 'Contribution Shaming',
        severity: 'high',
        explanation:
          'Making contribution data transparent can inadvertently shame lower-contributing members who may have valid reasons (illness, personal issues, different role scope)',
        mitigation:
          'Never rank or compare individuals publicly. Show contribution data in context of role expectations. Allow private rather than public contribution views.',
      },
      {
        concern: 'Reinforcing Power Dynamics',
        severity: 'medium',
        explanation:
          'Contribution tracking systems often favor visible, technical work over invisible emotional and coordination labor, disadvantaging certain roles and demographics',
        mitigation:
          'Explicitly track and value coordination, mentoring, conflict resolution, and emotional labor. Audit which contribution types are visible and valued.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Egocentric Biases in Availability and Attribution',
        author: 'Ross, M., & Sicoly, F.',
        year: 1979,
        doi: '10.1037/0022-3514.37.3.322',
        description:
          'The foundational paper demonstrating egocentric bias in married couples\' contribution estimates',
        type: 'foundational',
      },
      {
        title: 'Egocentric Bias in Team Attribution',
        author: 'Savitsky, K., Van Boven, L., Epley, N., & Wight, W.',
        year: 2005,
        description:
          'Extended egocentric bias research to team settings, showing over-claiming scales with group size',
        type: 'advanced',
      },
      {
        title: 'The Spotlight Effect and the Illusion of Transparency',
        author: 'Gilovich, T., Medvec, V. H., & Savitsky, K.',
        year: 2000,
        description:
          'Related research on how people overestimate the salience of their own actions to others',
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
          'Covers egocentric bias as part of broader cognitive bias research, with sections on self-serving attribution',
        type: 'foundational',
      },
      {
        title: 'The Person and the Situation',
        author: 'Ross, L., & Nisbett, R. E.',
        year: 1991,
        isbn: '9781905177073',
        description:
          'Explores how situational factors and self-serving biases shape attribution in social contexts',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Designing for Fair Attribution in Collaborative Tools',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/attribution-collaborative-tools/',
        description:
          'Practical guide to designing contribution tracking that accounts for egocentric bias',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why You Think You Do More Than You Actually Do',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=EkQe-jqUvSQ',
        description:
          'Accessible explanation of egocentric bias with everyday examples',
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
      'self-serving-bias',     // Attributing success to self, failure to others
      'spotlight-effect',      // Overestimating how much others notice our contributions
      'false-consensus',       // Assuming others share our view of fair contribution
      'dunning-kruger-effect', // Overestimating competence compounds egocentric over-claiming
    ],

    conflicts: [
      'social-loafing',       // Reduced effort in groups contradicts egocentric over-claiming
      'diffusion-of-responsibility', // Claiming less ownership conflicts with egocentric inflation
    ],

    confusedWith: [
      'self-serving-bias',     // Related but distinct: self-serving is about success/failure attribution
      'narcissism',            // Egocentric bias is universal, not a personality disorder
      'illusory-superiority',  // Overlaps but is about ability, not contribution
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'contribution-over-claiming',
        'credit-hoarding',
      ],
    },
  },
};
