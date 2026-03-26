/**
 * GROUPTHINK
 *
 * Groups make irrational decisions to maintain harmony
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const groupthink: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'groupthink',
    name: 'Groupthink',
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
    simple: 'Groups make irrational decisions to maintain harmony',

    detailed: `Groupthink is a psychological phenomenon that occurs within a group of people in which the desire for harmony or conformity overrides realistic appraisal of alternatives. Group members suppress dissenting opinions, fail to critically analyze assumptions, and converge on a consensus that may be deeply flawed.

The phenomenon is driven by social pressure, a shared illusion of invulnerability, collective rationalization, and self-censorship. Members who hold opposing views stay silent to avoid disrupting group cohesion, and the group develops an illusion of unanimity where silence is interpreted as agreement.

In product design, groupthink profoundly impacts collaborative tools, team decision-making interfaces, voting and feedback systems, and any feature where groups must reach consensus. Designers must actively build mechanisms that protect minority opinions, encourage structured dissent, and prevent premature convergence on solutions.`,

    psychologyBasis: {
      discoveredBy: 'Irving Janis',
      year: 1972,
      theory: 'Groupthink Theory',
      mechanism: `The desire for group harmony overrides realistic appraisal of alternatives through several reinforcing mechanisms:

1. **Conformity Pressure**: Individuals suppress their true opinions to align with the perceived group consensus, fearing social rejection or exclusion
2. **Illusion of Unanimity**: Silence is interpreted as agreement, creating a false sense that everyone agrees when many are simply self-censoring
3. **Self-Censorship**: Members withhold dissenting views, doubts, and counterarguments to avoid being seen as disruptive or disloyal
4. **Mindguards**: Some members actively shield the group from information that might challenge the emerging consensus
5. **Authority Bias Amplification**: When leaders express preferences early, subordinates align their stated views accordingly, even when they privately disagree

The mechanism is self-reinforcing: the more unanimous the group appears, the stronger the pressure to conform, which further silences dissent.`,
    },

    realWorldExample: `The Bay of Pigs invasion (1961) is the classic example studied by Janis. President Kennedy's advisory team — composed of brilliant individuals — unanimously supported an invasion plan that was deeply flawed. Advisors who privately had serious doubts stayed silent because everyone else appeared to agree. Arthur Schlesinger later admitted he self-censored his objections. The group's desire for cohesion produced a catastrophic foreign policy decision that none of the individuals would have endorsed alone.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Groupthink affects how users behave in collaborative interfaces, team decision-making tools, and any feature involving group consensus. Designers can either reinforce groupthink (leading to poor collective decisions) or actively counter it by:

- Building anonymous input mechanisms that protect minority opinions
- Designing structured dissent workflows that normalize disagreement
- Creating blind voting systems where preferences are hidden until everyone has voted
- Implementing devil's advocate tools that systematically challenge consensus
- Separating ideation from evaluation phases to prevent premature convergence`,

    whenToUse: [
      {
        title: 'Anonymous Feedback Systems',
        scenario:
          'When teams need to provide honest input on proposals, designs, or decisions',
        example:
          'Anonymous survey tool where individual responses are hidden until all participants have submitted, preventing conformity pressure',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Blind Voting Mechanisms',
        scenario: 'When teams must vote on options, priorities, or directions',
        example:
          'Voting interface where choices are submitted simultaneously and results are revealed only after all votes are cast',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Structured Dissent Tools',
        scenario: 'When teams are evaluating important decisions and need to surface objections',
        example:
          'Pre-mortem exercise tool that asks each member to independently write why a plan might fail before group discussion',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Devil\'s Advocate Assignment',
        scenario: 'When consensus forms too quickly and alternatives need exploration',
        example:
          'Rotating "challenger" role in retrospective tools that assigns one team member to argue the opposing position',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Independent Ideation Before Discussion',
        scenario: 'When brainstorming or generating ideas collaboratively',
        example:
          'Brainwriting tool where each participant writes ideas independently before any are shared with the group',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency Consensus Situations',
        reason:
          'In crisis situations, structured dissent processes can dangerously slow decision-making',
        consequence:
          'Critical response time is lost while the team works through dissent protocols',
        alternative:
          'Designate a clear decision-maker for emergencies while preserving post-incident review mechanisms',
      },
      {
        title: 'Low-Stakes Routine Decisions',
        reason:
          'Applying heavy anti-groupthink mechanisms to trivial decisions creates decision fatigue',
        consequence:
          'Team members become frustrated with excessive process for choices that don\'t warrant it',
        alternative:
          'Reserve structured dissent and anonymous voting for high-impact decisions; use simple majority for routine matters',
      },
      {
        title: 'Already Fragmented Teams',
        reason:
          'Teams with excessive conflict don\'t suffer from groupthink — they have the opposite problem',
        consequence:
          'Adding devil\'s advocate tools to an already-combative team amplifies dysfunction',
        alternative:
          'Focus on alignment and trust-building tools instead of dissent-surfacing mechanisms',
      },
      {
        title: 'Individual Creative Work',
        reason:
          'Anti-groupthink patterns are irrelevant when a single person is making decisions',
        consequence:
          'Unnecessarily complex collaborative workflows for individual tasks',
        alternative:
          'Apply groupthink countermeasures only to genuine group decision points',
      },
    ],

    commonMistakes: [
      {
        title: 'Public Voting Before Discussion',
        description:
          'Showing vote counts or individual votes in real-time as people cast them',
        why: 'Early voters anchor the group; later voters conform to the emerging majority rather than expressing their true preference',
        fix: 'Hide all votes until the voting period closes, then reveal results simultaneously',
      },
      {
        title: 'Visible Leader Preferences',
        description:
          'Allowing managers or team leads to express preferences before the team has weighed in',
        why: 'Authority bias compounds groupthink — subordinates align with the leader\'s stated position to avoid appearing disloyal',
        fix: 'Leaders should submit input last, or use anonymous channels where authority is invisible',
      },
      {
        title: 'Equating Silence with Agreement',
        description:
          'Interpreting a lack of objections as consensus ("no objections? great, we\'re aligned!")',
        why: 'Self-censorship is the primary mechanism of groupthink; silence often masks suppressed disagreement',
        fix: 'Require explicit affirmation from each participant, or use anonymous polling to surface hidden dissent',
      },
      {
        title: 'No Anonymity Options',
        description:
          'Forcing all feedback, votes, and critiques to be attributed to named individuals',
        why: 'Attribution creates social risk for dissenters, especially in hierarchical teams',
        fix: 'Offer anonymous input modes for sensitive decisions; let users choose between attributed and anonymous feedback',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether group opinions are visible before individual input, shaping conformity pressure',
        examples: [
          'Placing vote tallies prominently pressures late voters to conform',
          'Showing team member avatars next to their choices reveals who disagrees with whom',
          'Sidebar displaying "who\'s already submitted" creates social pressure to participate without deliberation',
          'Separating individual input areas from group results prevents premature anchoring',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text hierarchy and emphasis can amplify or diminish the visibility of majority vs minority positions',
        examples: [
          'Larger font for majority opinion and smaller for minority marginalizes dissent',
          'Equal typographic weight for all viewpoints normalizes disagreement',
          'Bold labels like "Team Consensus" on preliminary votes create false unanimity',
          'Displaying dissenting views in muted or smaller text discourages future dissent',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding can stigmatize dissent or normalize cognitive diversity',
        examples: [
          'Red highlighting for minority opinions signals "wrong" or "problematic"',
          'Green for majority and red for minority creates conformity pressure through color semantics',
          'Neutral, equal-weight colors for all positions normalizes disagreement',
          'Using warm, positive colors for dissenting views explicitly encourages diverse thinking',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users can express independent opinions free from group pressure',
        examples: [
          'Real-time collaborative cursors reveal who is doing what, creating performance pressure',
          'Sequential input (one after another) allows early responses to anchor later ones',
          'Simultaneous reveal after independent input protects opinion independence',
          'Reaction emoji visible in real-time creates bandwagon conformity effects',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing and labeling can either reinforce consensus pressure or encourage productive disagreement',
        examples: [
          'Prompts like "Does everyone agree?" pressure conformity; "What concerns do you have?" invites dissent',
          'Labeling the majority view as "team decision" before final vote presumes consensus',
          'Including structured prompts for objections normalizes critical thinking',
          'Framing disagreement as "cognitive diversity" rather than "conflict" reduces social cost of dissent',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must ensure all users can participate independently without being influenced by others\' visible choices',
        examples: [
          'Screen reader order that announces others\' votes before the user\'s own input field creates anchoring',
          'Keyboard focus that forces navigation through existing responses before reaching input biases opinion',
          'Aria-live regions announcing vote tallies in real-time pressure conformity for assistive tech users',
          'Anonymous modes must be equally accessible to all users regardless of input method',
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
        title: 'Anonymous Feedback Before Group Discussion',
        description:
          'Retrospective tool collecting independent input before revealing team responses',
        code: `<div class="retro-board">
  <h3>Sprint Retrospective</h3>
  <p class="phase-label">Phase 1: Independent Reflection (5 min remaining)</p>
  <p class="instruction">Write your thoughts privately. All responses will be
  revealed simultaneously when the timer ends.</p>

  <div class="input-section">
    <label for="went-well">What went well?</label>
    <textarea id="went-well" placeholder="Your response is anonymous..."></textarea>
  </div>

  <div class="input-section">
    <label for="improve">What should we improve?</label>
    <textarea id="improve" placeholder="Your response is anonymous..."></textarea>
  </div>

  <div class="hidden-results">
    <p>Team responses will appear here after everyone submits.</p>
    <span class="status">4 of 6 team members have submitted</span>
  </div>

  <button class="primary" disabled>Reveal All Responses</button>
</div>`,
        explanation:
          'By collecting all input anonymously and revealing it simultaneously, no one\'s opinion anchors or influences others. The timer creates a clear separation between independent thinking and group discussion.',
        principle:
          'Separate independent ideation from group discussion to prevent conformity pressure',
        metrics: {
          before: '2.3 unique themes per retrospective with open discussion format',
          after: '5.8 unique themes per retrospective with anonymous-first format',
          improvement: '152% increase in diversity of ideas surfaced',
        },
      },
      {
        title: 'Blind Voting with Simultaneous Reveal',
        description:
          'Priority voting tool where all votes are hidden until the voting period closes',
        code: `<div class="voting-session">
  <h3>Feature Priority Vote</h3>
  <p class="instruction">Rank your top 3 priorities. Votes are hidden until
  all participants have voted.</p>

  <div class="options">
    <label class="vote-option">
      <input type="checkbox" name="priority" value="search">
      <span>Advanced Search</span>
    </label>
    <label class="vote-option">
      <input type="checkbox" name="priority" value="collab">
      <span>Real-time Collaboration</span>
    </label>
    <label class="vote-option">
      <input type="checkbox" name="priority" value="api">
      <span>Public API</span>
    </label>
    <label class="vote-option">
      <input type="checkbox" name="priority" value="mobile">
      <span>Mobile App</span>
    </label>
  </div>

  <div class="vote-status">
    <span class="count">7 of 10 votes submitted</span>
    <span class="note">Results hidden until all votes are in</span>
  </div>

  <button class="primary">Submit My Vote</button>
</div>`,
        explanation:
          'Hiding vote tallies until everyone has voted prevents bandwagon effects. Each person votes based on their genuine assessment rather than conforming to the emerging majority.',
        principle:
          'Blind voting eliminates real-time conformity pressure and protects independent judgment',
        metrics: {
          before: '78% of votes matched the first 3 voters\' choices (visible voting)',
          after: '41% vote overlap with blind voting — much more distributed preferences',
          improvement: '47% reduction in conformity clustering',
        },
      },
      {
        title: 'Structured Pre-Mortem Exercise',
        description:
          'Decision-making tool that systematically surfaces potential failures before commitment',
        code: `<div class="pre-mortem">
  <h3>Pre-Mortem: New Pricing Model</h3>
  <p class="scenario">Imagine it's 6 months from now and this pricing change
  has <strong>failed badly</strong>. What went wrong?</p>

  <div class="individual-input">
    <label for="failure-reason">Write one reason it failed:</label>
    <textarea id="failure-reason"
      placeholder="Be specific — what exactly went wrong?"></textarea>
    <button class="secondary">Add Another Reason</button>
  </div>

  <div class="submitted-reasons">
    <h4>Team's Failure Scenarios (anonymous, 12 submitted)</h4>
    <ul class="reason-list">
      <li class="reason">
        <span class="votes">4 votes</span>
        <p>Enterprise customers churned because per-seat pricing
        penalized large teams</p>
      </li>
      <li class="reason">
        <span class="votes">3 votes</span>
        <p>Free tier users never converted because the upgrade
        path was confusing</p>
      </li>
    </ul>
  </div>
</div>`,
        explanation:
          'The pre-mortem technique inverts the social dynamic: instead of requiring courage to disagree with a plan, it requires creativity to imagine failures. This reframes dissent as a valued contribution rather than disloyalty.',
        principle:
          'Reframe dissent as a creative exercise to bypass self-censorship mechanisms',
      },
    ],

    bad: [
      {
        title: 'Public Voting with Real-Time Tallies',
        description:
          'Feature voting board showing live vote counts and who voted for what',
        code: `<!-- DON'T DO THIS -->
<div class="feature-vote">
  <h3>Vote for Next Sprint Priority</h3>

  <div class="option leading">
    <span class="votes">7 votes</span>
    <span class="feature">Dashboard Redesign</span>
    <div class="voters">
      <img src="cto.jpg" alt="Sarah (CTO)" title="Sarah (CTO)">
      <img src="lead.jpg" alt="Mike (Tech Lead)" title="Mike (Tech Lead)">
      <img src="pm.jpg" alt="Alex (PM)" title="Alex (PM)">
      <span>+4 more</span>
    </div>
  </div>

  <div class="option">
    <span class="votes">1 vote</span>
    <span class="feature">API Performance</span>
    <div class="voters">
      <img src="junior.jpg" alt="Kim (Junior Dev)">
    </div>
  </div>

  <button class="primary">Cast Your Vote</button>
</div>`,
        explanation:
          'Showing live vote counts, voter identities, and especially that leadership has already voted creates overwhelming conformity pressure. The junior developer who voted differently is visibly isolated, discouraging future dissent.',
        principle:
          'Never display vote tallies, voter identities, or authority figures\' choices before voting closes',
      },
      {
        title: 'Leader Opinion Before Team Input',
        description:
          'Design review tool where the manager\'s feedback is shown first',
        code: `<!-- DON'T DO THIS -->
<div class="design-review">
  <h3>Design Review: New Onboarding Flow</h3>

  <div class="leader-comment pinned">
    <img src="director.jpg" alt="James, Design Director">
    <div class="comment">
      <strong>James (Design Director)</strong>
      <span class="badge">Approved</span>
      <p>"Love this direction! The animation work is fantastic.
      Ship it as-is. Great job team!"</p>
      <span class="timestamp">Posted 2 hours ago</span>
    </div>
  </div>

  <div class="team-input">
    <h4>Add Your Review</h4>
    <textarea placeholder="Share your thoughts..."></textarea>
    <div class="rating">
      <label>Your Rating:</label>
      <select>
        <option>Approve</option>
        <option>Request Changes</option>
        <option>Reject</option>
      </select>
    </div>
  </div>
</div>`,
        explanation:
          'Pinning the design director\'s enthusiastic approval at the top — before anyone else can comment — makes it socially costly for team members to raise concerns. The "Approved" badge and effusive praise create enormous pressure to agree.',
        principle:
          'Authority figures\' opinions shown before team input suppress honest feedback and trigger conformity',
      },
      {
        title: 'Emoji Reactions Creating Bandwagon Conformity',
        description:
          'Message thread where early emoji reactions create visible consensus',
        code: `<!-- DON'T DO THIS -->
<div class="message-thread">
  <div class="message">
    <strong>Product Manager:</strong>
    <p>I think we should drop the API and focus entirely on the
    no-code builder. Thoughts?</p>
    <div class="reactions">
      <span class="reaction popular">👍 12</span>
      <span class="reaction popular">🎉 8</span>
      <span class="reaction popular">💯 6</span>
      <span class="reaction">🤔 1</span>
    </div>
  </div>

  <div class="reply-prompt">
    <textarea placeholder="Reply..."></textarea>
  </div>
</div>`,
        explanation:
          'Visible emoji reaction counts create a powerful bandwagon effect. The overwhelming positive reactions (12 thumbs up, 8 celebrations) make the single thinking-face emoji seem like an outlier. Team members with concerns will self-censor rather than be the second "thinking face."',
        principle:
          'Visible reaction counts on proposals create conformity pressure that silences minority concerns',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Emoji Reactions',
        description: 'Slack\'s emoji reaction system creates visible bandwagon effects. When a manager posts a proposal and early reactions are overwhelmingly positive, later team members face social pressure to add positive reactions rather than raising concerns. The reaction counts act as a real-time conformity meter.',
        effectiveness: 'somewhat-effective',
        analysis: 'While reactions are useful for lightweight feedback, they become a groupthink amplifier on important decisions. The visibility of who reacted with what, combined with reaction counts, creates conformity pressure. Slack lacks built-in anonymous polling for high-stakes decisions.',
      },
      {
        company: 'Google',
        product: 'Google Docs Comments',
        description: 'Google Docs\' comment system shows author names and allows "resolve" actions visible to all. In document reviews, once a senior team member comments approvingly, junior reviewers tend to only add minor formatting suggestions rather than substantive critiques.',
        effectiveness: 'somewhat-effective',
        analysis: 'The attribution model in Google Docs comments works well for accountability but creates groupthink in review processes. There is no anonymous comment mode, and the visible hierarchy of who said what makes dissent socially costly.',
      },
      {
        company: 'Figma',
        product: 'Collaborative Design',
        description: 'Figma\'s real-time collaboration shows cursor positions and who is looking at what. During design critiques, designers can see when the design director is hovering over a section, creating implicit pressure. The "observation effect" influences what critiques get voiced.',
        effectiveness: 'effective',
        analysis: 'Figma\'s real-time collaboration is excellent for coordination but can amplify groupthink during critiques. Seeing authority figures\' cursors and real-time comments creates conformity pressure. Teams that use Figma effectively often supplement it with anonymous critique tools.',
      },
      {
        company: 'GitHub',
        product: 'Pull Request Reviews',
        description: 'GitHub PR reviews show who approved, who requested changes, and in what order. When a senior engineer approves first, subsequent reviewers are measurably less likely to request changes, even when issues exist in the code.',
        effectiveness: 'effective',
        analysis: 'GitHub\'s transparent review system is good for accountability but creates groupthink in code review. Research from Microsoft (2018) found that the order of reviews significantly influences subsequent reviewers. The "Approved" badge from a respected engineer anchors later reviews.',
      },
    ],

    abTests: [
      {
        title: 'Feature Priority Voting: Public vs Blind',
        hypothesis:
          'Blind voting will produce more diverse priority rankings than public voting',
        controlVersion: {
          description:
            'Public voting board showing real-time vote counts and voter names as people vote, with the tech lead\'s vote visible first',
          metrics: {
            conversionRate: '92% voted for the same top 3 as leadership',
            clickThroughRate: '15% of voters changed their vote after seeing results',
            timeOnPage: '0:45 average time to vote',
          },
        },
        treatmentVersion: {
          description:
            'Blind voting where all votes are hidden until the deadline, no voter identities shown, results revealed simultaneously',
          metrics: {
            conversionRate: '54% overlap with leadership\'s top 3',
            clickThroughRate: '0% changed votes (not possible in blind mode)',
            timeOnPage: '2:10 average time to vote (more deliberation)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Blind voting produced dramatically more diverse results. The 92% agreement in public voting was revealed to be conformity, not genuine consensus. Blind voting surfaced two high-priority items that never appeared in public voting rounds because they contradicted the tech lead\'s stated preference.',
          learnings: [
            'Public voting dramatically inflates apparent consensus',
            'Blind voting surfaces hidden priorities that conformity suppresses',
            'Participants spent 2.8x longer deliberating when votes were private',
            'Two critical issues were surfaced that had been suppressed for months',
          ],
        },
      },
      {
        title: 'Design Critique: Leader-First vs Anonymous-First',
        hypothesis:
          'Anonymous critique before leader feedback will surface more actionable issues',
        controlVersion: {
          description:
            'Design review where the design director\'s feedback is shown first, followed by team comments',
          metrics: {
            conversionRate: '1.4 critical issues found per review',
            timeOnPage: '12 min average review duration',
            scrollDepth: '85% of reviews agreed with director\'s assessment',
          },
        },
        treatmentVersion: {
          description:
            'Anonymous critique phase where all team members submit feedback independently before any comments are visible, then director feedback is shown last',
          metrics: {
            conversionRate: '4.1 critical issues found per review',
            timeOnPage: '22 min average review duration',
            scrollDepth: '43% of reviews aligned with director\'s eventual assessment',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Anonymous-first reviews found nearly 3x more critical issues. The 85% agreement in leader-first reviews was largely conformity, not independent assessment. When feedback was anonymous, team members raised usability concerns, accessibility gaps, and technical debt issues they had previously self-censored.',
          learnings: [
            'Leader-first feedback suppresses roughly 65% of critical observations',
            'Anonymous input surfaces accessibility and usability issues that attributed feedback misses',
            'Review quality improved even after removing anonymity in later phases',
            'Teams reported higher psychological safety after adopting anonymous-first reviews',
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
        name: 'Public Vote Displays',
        description:
          'Real-time vote tallies, voter avatars, or percentage bars visible before all votes are cast',
        howToSpot: 'Look for live counters, progress bars, or ranked lists that update as individuals vote',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Authority Preference Indicators',
        description:
          'Leader or manager opinions, approvals, or preferences displayed before team members have provided input',
        howToSpot: 'Check if senior stakeholders\' comments, reactions, or votes appear first or are pinned prominently',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Reaction Count Bandwagons',
        description:
          'Emoji reactions or likes with visible counts on proposals or decisions, creating a conformity signal',
        howToSpot: 'Look for reaction bars with counts that create an obvious majority/minority split before discussion',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Unanimous Agreement Displays',
        description:
          'UI elements celebrating or highlighting unanimous agreement ("Everyone agrees!") without verifying genuine consensus',
        howToSpot: 'Check for green checkmarks, celebration animations, or "consensus reached" labels that appear before structured dissent',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Named Attribution on Sensitive Feedback',
        description:
          'All feedback, critiques, and votes attributed to named individuals with no anonymous option',
        howToSpot: 'Look for avatar + name on every comment, review, or vote — especially in hierarchical team contexts',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Sequential Opinion Anchoring',
        description: 'Opinions, votes, or feedback displayed in the order they were submitted, allowing early responders to anchor later ones',
        indicators: ['Chronological comment threads on proposals', 'First-come-first-displayed vote results', 'Real-time comment feeds during decision-making', 'Chat-style input for team decisions'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Authority-First Pattern',
        description: 'Design leaders, managers, or senior stakeholders\' preferences are visible before the team provides input',
        indicators: ['Pinned or highlighted manager comments', 'Leader approval badges visible during review', 'Senior team member reactions appearing first', 'Manager-set agendas framing all discussion'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Conformity Feedback Loop',
        description: 'Real-time visibility of group opinion that reinforces itself as more people conform',
        indicators: ['Live poll results updating as votes come in', 'Emoji reaction counts growing visibly', 'Percentage bars showing current majority', '"X people agree" social proof on decisions'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Dissent Mechanisms',
        description: 'No structured way to disagree, raise concerns, or provide anonymous counter-opinions',
        indicators: ['Only "approve" or "like" options (no "concerns" button)', 'No anonymous input mode for sensitive decisions', 'No devil\'s advocate or pre-mortem tools', 'Comments require name attribution with no opt-out'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can team members provide input anonymously when the decision is sensitive or high-stakes?',
      'Are votes hidden until all participants have submitted their choices?',
      'Does the interface show leader/authority preferences before team members have given input?',
      'Are emoji reactions or vote counts visible in real-time, creating bandwagon pressure?',
      'Is there a structured mechanism for surfacing dissent (pre-mortem, devil\'s advocate, etc.)?',
      'Does the UI equate silence with agreement, or does it require explicit affirmation?',
      'Are minority opinions given equal visual weight as majority opinions?',
      'Can users change their votes after seeing others\' choices (indicating social pressure)?',
      'Is there a separate ideation phase before group evaluation begins?',
      'Does the design celebrate unanimity without verifying it is genuine consensus?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in groupthink and collective decision-making.

Analyze the provided design for groupthink patterns. Identify:

1. **Conformity Pressure Points**: Where group opinion visibility might suppress individual judgment
2. **Authority Bias Amplifiers**: Where leader preferences are visible before team input
3. **Anonymity Gaps**: Where attributed feedback on sensitive topics may silence dissent
4. **Dissent Mechanisms**: Whether structured disagreement tools exist
5. **Voting and Feedback Flows**: Whether input is collected independently before group discussion

For each pattern found:
- Identify the specific groupthink mechanism being triggered (conformity, self-censorship, mindguarding, etc.)
- Assess the severity based on the decision's importance and the team's power dynamics
- Determine whether minority opinions are protected or suppressed
- Evaluate if the design normalizes or stigmatizes disagreement
- Suggest specific countermeasures (anonymous mode, blind voting, pre-mortem, etc.)

Consider:
- Does the interface allow independent thinking before group influence?
- Are authority figures' opinions sequenced after team input?
- Is there a way to disagree without social cost?
- Does the design treat unanimity as a goal or as a warning sign?
- Are collaborative features designed for coordination or for consensus pressure?

Provide actionable recommendations for designing collaborative tools that protect cognitive diversity.`,

    outputSchema: {
      type: 'object',
      properties: {
        groupthinkPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              mechanism: { type: 'string' },
              conformityPressure: { type: 'string' },
              dissentProtection: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'mechanism',
              'conformityPressure',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            anonymityLevel: { type: 'number' },
            dissentProtection: { type: 'number' },
            authorityBiasRisk: { type: 'number' },
            cognitiveDiversityScore: { type: 'number' },
          },
          required: [
            'anonymityLevel',
            'dissentProtection',
            'authorityBiasRisk',
            'cognitiveDiversityScore',
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
        'groupthinkPatterns',
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
        title: 'Identify Group Decision Points',
        description:
          'Map all the places in your product where groups make decisions, provide feedback, or reach consensus',
        example:
          'Audit: sprint planning votes, design reviews, feature prioritization, retrospectives, PR reviews',
        tips: [
          'Focus on high-stakes decisions where dissent matters most',
          'Include informal decision points like chat discussions and emoji reactions',
          'Consider the power dynamics in each group context',
        ],
      },
      {
        step: 2,
        title: 'Separate Ideation from Evaluation',
        description:
          'Design workflows that collect individual input before any group discussion or visibility',
        example:
          'In a retrospective tool, give everyone 5 minutes to write independently before revealing all responses simultaneously',
        tips: [
          'Use timers or submission gates to enforce independent thinking phases',
          'Clearly label phases: "Individual Reflection" then "Group Discussion"',
          'Prevent peeking at others\' responses during the individual phase',
        ],
      },
      {
        step: 3,
        title: 'Implement Blind Voting',
        description:
          'For any decision requiring votes, hide all results until every participant has voted',
        example:
          'Priority voting tool shows "7 of 10 votes submitted" but reveals zero results until all 10 are in',
        tips: [
          'Set clear deadlines for voting periods',
          'Show submission progress without revealing content',
          'Reveal all results simultaneously with equal visual weight',
        ],
      },
      {
        step: 4,
        title: 'Add Anonymity Options',
        description:
          'Provide anonymous input modes for sensitive decisions, critiques, and feedback',
        example:
          'Toggle between "Post as [Your Name]" and "Post Anonymously" for design review comments',
        tips: [
          'Default to anonymous for high-stakes decisions',
          'Make the anonymous option clearly visible and easy to use',
          'Ensure anonymity is genuine (no admin backdoor to reveal identities)',
        ],
      },
      {
        step: 5,
        title: 'Build Structured Dissent Mechanisms',
        description:
          'Create explicit tools for surfacing objections, risks, and alternative viewpoints',
        example:
          'Add a "Pre-Mortem" button to any decision workflow that prompts: "Imagine this failed. Why?"',
        tips: [
          'Make dissent a required step, not an optional extra',
          'Use prompts that make disagreement feel constructive, not adversarial',
          'Rotate devil\'s advocate roles so dissent is normalized',
        ],
      },
      {
        step: 6,
        title: 'Sequence Authority Input Last',
        description:
          'Ensure leaders and senior stakeholders provide input after the team, not before',
        example:
          'In design review, the design director\'s feedback is queued but hidden until all team members have submitted',
        tips: [
          'Educate leaders on why their early input suppresses team feedback',
          'Use system-level controls (not just guidelines) to enforce sequencing',
          'Allow leaders to submit early but display their input last',
        ],
      },
    ],

    dos: [
      'Collect individual input before revealing group opinions',
      'Implement blind voting for all team decisions',
      'Provide anonymous feedback options for sensitive topics',
      'Build structured dissent tools (pre-mortems, devil\'s advocate rotation)',
      'Sequence authority input after team input',
      'Treat unanimity as a warning sign, not a success metric',
      'Give minority opinions equal visual weight as majority opinions',
      'Use explicit affirmation rather than treating silence as agreement',
    ],

    donts: [
      'Don\'t show real-time vote tallies while voting is still open',
      'Don\'t display leader preferences before the team has weighed in',
      'Don\'t celebrate unanimous agreement without verifying genuine consensus',
      'Don\'t require name attribution on all feedback — offer anonymous options',
      'Don\'t use color coding that stigmatizes minority positions (red for dissenters)',
      'Don\'t allow emoji reactions to substitute for structured feedback on important decisions',
      'Don\'t interpret silence as agreement in collaborative tools',
      'Don\'t design collaborative features that make dissent socially visible and costly',
    ],

    bestPractices: [
      {
        title: 'Anonymous-First, Attributed-Second',
        description:
          'Collect anonymous input first, then allow optional attribution after all responses are visible',
        rationale:
          'This captures honest opinions while still enabling accountability and discussion',
        example:
          'Retrospective tool: anonymous sticky notes phase, then optional "claim your note" for discussion',
      },
      {
        title: 'Simultaneous Reveal',
        description:
          'Reveal all group input at the same time rather than showing responses as they arrive',
        rationale:
          'Sequential display creates anchoring; simultaneous reveal preserves independence',
        example:
          'Show "8 of 10 submitted" progress, then reveal all 10 responses at once when complete',
      },
      {
        title: 'Structured Pre-Mortem as Default',
        description:
          'Include a pre-mortem step in every significant decision workflow',
        rationale:
          'Pre-mortems reframe dissent as creative contribution, bypassing self-censorship',
        example:
          'Before any "ship it" decision, prompt: "Imagine this failed in 6 months. List 3 reasons why."',
      },
      {
        title: 'Rotate Devil\'s Advocate Role',
        description:
          'Automatically assign a rotating "challenger" role in team decision tools',
        rationale:
          'Making dissent a formal role removes the social cost of disagreeing',
        example:
          'Sprint planning tool assigns one team member per sprint to argue against the proposed plan',
      },
      {
        title: 'Treat Unanimity as a Signal to Investigate',
        description:
          'When a vote or decision is unanimous, trigger a follow-up prompt rather than celebrating',
        rationale:
          'True unanimity is rare; apparent unanimity often masks suppressed dissent',
        example:
          'If 100% agree, show: "Unanimous agreement detected. Would anyone like to share concerns anonymously?"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure anonymous and attributed modes are equally accessible',
        implementation:
          'Anonymous input toggles must be keyboard accessible and announced by screen readers. Ensure anonymous mode does not degrade the input experience for assistive technology users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to distinguish majority from minority opinions',
        implementation:
          'Combine color with text labels, icons, or patterns. Never use red/green coding that stigmatizes dissent or implies correctness of the majority.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All voting, feedback, and dissent mechanisms must be fully keyboard accessible',
        implementation:
          'Blind voting interfaces, anonymous toggles, and pre-mortem tools must work entirely via keyboard navigation without requiring mouse interaction.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Announce voting status and result reveals accessibly',
        implementation:
          'Use aria-live regions to announce "voting open", "X of Y submitted", and "results revealed" without requiring page refresh or visual-only indicators.',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Consensus',
        severity: 'critical',
        explanation:
          'Designing voting or feedback tools that make unanimity appear natural when it is actually manufactured by conformity pressure',
        mitigation:
          'Implement blind voting, anonymous input, and structured dissent. Treat unanimous outcomes as signals requiring investigation, not celebration.',
      },
      {
        concern: 'Suppression of Minority Perspectives',
        severity: 'critical',
        explanation:
          'Collaborative tools that make dissent socially costly effectively silence minority viewpoints, which may represent the most important information',
        mitigation:
          'Provide robust anonymous feedback mechanisms. Ensure minority opinions receive equal visual prominence. Normalize disagreement in UI copy and interaction patterns.',
      },
      {
        concern: 'Authority Bias Amplification',
        severity: 'high',
        explanation:
          'Displaying leaders\' preferences before team input leverages authority bias to manufacture agreement',
        mitigation:
          'Enforce input sequencing where authority figures go last. Use system-level controls rather than relying on leaders to voluntarily wait.',
      },
      {
        concern: 'False Sense of Team Alignment',
        severity: 'high',
        explanation:
          'Conformity-driven consensus creates a false sense that the team is aligned, when dissent is merely hidden. This leads to poor decisions and eventual team dysfunction.',
        mitigation:
          'Build regular anonymous pulse checks. Track vote-change rates as a proxy for conformity pressure. Surface disagreement data to team leaders.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Victims of Groupthink: A Psychological Study of Foreign-Policy Decisions and Fiascoes',
        author: 'Janis, I. L.',
        year: 1972,
        description:
          'The foundational work introducing groupthink theory through analysis of major policy failures',
        type: 'foundational',
      },
      {
        title: 'Groupthink: Psychological Studies of Policy Decisions and Fiascoes',
        author: 'Janis, I. L.',
        year: 1982,
        description:
          'Revised and expanded edition with additional case studies and refined groupthink model',
        type: 'foundational',
      },
      {
        title: 'The Robust Beauty of Majority Rules in Group Decisions',
        author: 'Hastie, R., & Kameda, T.',
        year: 2005,
        doi: '10.1037/0033-295X.112.2.494',
        description:
          'Research on when majority rules work well and when they fail due to groupthink dynamics',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Wiser: Getting Beyond Groupthink to Make Groups Smarter',
        author: 'Sunstein, Cass R., & Hastie, Reid',
        year: 2015,
        isbn: '9781422122990',
        description:
          'Practical framework for designing group decision-making processes that overcome groupthink',
        type: 'practical',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136693',
        description:
          'How structured disagreement and cognitive diversity improve group prediction accuracy',
        type: 'practical',
      },
      {
        title: 'Rebel Ideas: The Power of Diverse Thinking',
        author: 'Syed, Matthew',
        year: 2019,
        isbn: '9781529348408',
        description:
          'How cognitive diversity counters groupthink and drives better collective outcomes',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How to Fight Groupthink in Collaborative Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/groupthink/',
        description:
          'Practical UX design strategies for mitigating groupthink in collaborative tools',
        type: 'practical',
      },
      {
        title: 'The Abilene Paradox: When Teams Agree on Something No One Wants',
        author: 'Harvey, Jerry B.',
        url: 'https://www.sciencedirect.com/science/article/pii/0090261688900286',
        description:
          'Classic article on managed agreement — a groupthink variant where groups choose actions no individual member actually wants',
        type: 'foundational',
      },
    ],

    videos: [
      {
        title: 'Groupthink: The Brainstorming Myth',
        author: 'Jonah Lehrer / The New Yorker',
        url: 'https://www.youtube.com/watch?v=9K8W4ooygUU',
        description:
          'How traditional brainstorming amplifies groupthink and what structured alternatives work better',
        type: 'practical',
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
      'authority-bias',
      'conformity-bias',
    ],

    conflicts: [
      'devils-advocate-effect',
      'cognitive-diversity',
    ],

    confusedWith: [
      'social-proof',
      'bandwagon-effect',
      'herd-mentality',
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'conformity-bias',
        'pluralistic-ignorance',
      ],
    },
  },
};
