/**
 * RISKY SHIFT
 *
 * Groups tend to make riskier decisions than individuals would alone.
 * A form of group polarization where collective discussion shifts
 * consensus toward greater risk-taking.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const riskyShift: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'risky-shift',
    name: 'Risky Shift',
    aliases: ['Choice Shift', 'Group Polarization Toward Risk', 'Risky Shift Phenomenon'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'group-dynamics',
      'risk-taking',
      'collaboration',
      'polarization',
      'decision-making',
      'team-decisions',
      'collective-judgment',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Groups tend to make riskier decisions than individuals would alone.',

    detailed: `Risky shift is a social phenomenon in which groups collectively arrive at decisions that are more extreme toward risk than any individual member would endorse on their own. When people discuss options as a group, the resulting consensus tends to shift toward greater risk-taking compared to the average of individuals' private pre-discussion preferences.

This effect arises from several interacting mechanisms: diffusion of responsibility (no single person bears full blame), social comparison (members want to appear bold), persuasive argumentation (pro-risk arguments tend to be more novel and compelling in discussion), and group identity (groups develop a shared appetite for risk that exceeds any member's personal threshold).

In product design, risky shift is critical for any collaborative or group decision-making feature: team voting tools, collective investment platforms, brainstorming interfaces, committee dashboards, and multiplayer planning tools. Designers must build in safeguards that preserve individual judgment while enabling productive group collaboration.`,

    psychologyBasis: {
      discoveredBy: 'James Stoner',
      year: 1961,
      theory: 'Group Polarization Theory',
      mechanism: `Groups polarize toward risk through several reinforcing mechanisms:

1. **Diffusion of Responsibility**: When a group makes a decision, no single member feels fully accountable for the outcome, lowering the perceived personal cost of failure
2. **Social Comparison**: Individuals want to be perceived as at least as bold as their peers; during discussion, members shift toward the riskier position to avoid appearing timid
3. **Persuasive Arguments**: Pro-risk arguments tend to be more novel and culturally valued, making them disproportionately influential during group discussion
4. **Cultural Value of Risk**: Western cultures in particular value boldness and entrepreneurship, creating social pressure toward risk-endorsing positions
5. **Informational Influence**: As discussion surfaces new risk-favoring arguments, members update their beliefs, cumulatively shifting the group toward greater risk

The shift is not always toward risk—Moscovici and Zavalloni (1969) showed it is more accurately described as group polarization, where groups move toward whatever pole the majority already leans toward. However, the risk-leaning variant is especially common in achievement, investment, and innovation contexts.`,
    },

    realWorldExample: `In Stoner's original 1961 experiment, participants read scenarios describing dilemmas (e.g., should an engineer leave a secure job for a risky startup?). Individually, they indicated the minimum probability of success they would require before recommending the risky option. After group discussion, the consensus threshold dropped significantly—groups were willing to recommend the risky option at much lower odds of success than any individual had privately endorsed. This finding has since been replicated in investment decisions, jury deliberations, military planning, and corporate strategy sessions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Risky shift directly impacts any interface where groups collaborate on decisions. Designers must understand that group features inherently push users toward riskier choices than they would make alone. This creates both opportunities and dangers:

- Group brainstorming tools may generate bolder ideas but miss cautious safeguards
- Team voting interfaces can produce consensus that no individual member fully endorses
- Collaborative investment or spending tools may lead to over-commitment
- Committee approval workflows may rubber-stamp risky proposals
- Shared planning tools may underweight worst-case scenarios`,

    whenToUse: [
      {
        title: 'Innovation and Brainstorming Tools',
        scenario:
          'When you want teams to generate bold, creative ideas without self-censoring',
        example:
          'Design brainstorming interfaces that encourage wild ideas first, then add structured evaluation phases to filter risk after ideation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Calculated Risk-Taking Platforms',
        scenario: 'When the goal is to help groups overcome excessive caution',
        example:
          'Startup pitch platforms that let teams collectively evaluate ventures, with explicit risk/reward scorecards to channel bold thinking productively',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Team Confidence Building',
        scenario: 'When groups need to commit to ambitious but achievable goals',
        example:
          'OKR-setting tools that let teams discuss and vote on stretch goals, with historical success-rate data to calibrate ambition',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Financial Decision Tools',
        reason:
          'Group investment or spending decisions are highly susceptible to risky shift, leading to over-commitment',
        consequence:
          'Teams may collectively approve budgets or investments that exceed prudent risk tolerance',
        alternative:
          'Require individual pre-vote assessments before group discussion; show individual vs group risk scores; enforce cooling-off periods',
      },
      {
        title: 'Safety-Critical Approvals',
        reason:
          'Committee approval of safety plans, medical protocols, or engineering specs can shift toward under-cautious consensus',
        consequence:
          'Groups may approve designs or procedures with insufficient safety margins',
        alternative:
          'Assign a mandatory devil\'s advocate role; require explicit sign-off on risk factors by each individual; show worst-case scenario analysis',
      },
      {
        title: 'Hiring and Personnel Decisions',
        reason:
          'Group interviews or hiring committees can polarize toward risky candidates who are charismatic but unproven',
        consequence:
          'Hiring decisions that prioritize "potential" over evidence, leading to poor fits',
        alternative:
          'Collect individual scorecards before group discussion; use structured interview criteria; weight individual assessments equally',
      },
      {
        title: 'Legal or Compliance Decisions',
        reason:
          'Groups may collectively minimize legal risks that individuals would flag as serious',
        consequence:
          'Regulatory violations, lawsuits, or compliance failures',
        alternative:
          'Require independent legal review separate from group discussion; surface individual risk flags anonymously',
      },
    ],

    commonMistakes: [
      {
        title: 'No Individual Pre-Vote Phase',
        description:
          'Jumping straight into group discussion without capturing individual opinions first',
        why: 'Once discussion begins, social comparison and persuasive arguments shift positions before private views are recorded, making the group\'s starting point already biased',
        fix: 'Always collect anonymous individual votes or assessments before opening group discussion',
      },
      {
        title: 'Missing Devil\'s Advocate Mechanism',
        description:
          'Group tools that only surface consensus without highlighting dissent',
        why: 'Without structured dissent, minority caution is drowned out by majority momentum toward risk',
        fix: 'Build in explicit devil\'s advocate features: highlight outlier votes, require risk-case arguments, or auto-assign contrarian roles',
      },
      {
        title: 'No Risk Visualization',
        description:
          'Presenting group decisions without visualizing the risk dimension',
        why: 'Abstract decisions feel less risky than they are; groups need concrete risk feedback to calibrate',
        fix: 'Show risk meters, probability distributions, worst-case scenarios, or historical failure rates alongside group decisions',
      },
      {
        title: 'Hiding Individual Variance',
        description:
          'Showing only the group consensus without revealing how much individual opinions varied',
        why: 'False consensus masking real disagreement leads to poorly supported decisions',
        fix: 'Display vote distributions, confidence intervals, or disagreement indicators alongside consensus results',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout of group decision tools determines whether individual judgment is preserved or overridden',
        examples: [
          'Side-by-side individual vs group views help users see the shift',
          'Placing individual vote capture before group discussion panels preserves private judgment',
          'Risk assessment panels positioned prominently counterbalance group momentum',
          'Dissent and minority opinion sections prevent groupthink',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text hierarchy affects how risk information is weighted in group contexts',
        examples: [
          'Bold risk warnings stand out against consensus summaries',
          'Typography that equalizes pro and con arguments prevents persuasive argument bias',
          'Clear labeling of individual vs group positions reduces confusion',
          'Warning text at appropriate weight prevents dismissal of risk factors',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding risk levels helps groups calibrate their collective risk appetite',
        examples: [
          'Red/amber/green risk indicators on group decisions provide visceral feedback',
          'Heat maps showing vote distribution reveal hidden disagreement',
          'Color-coded confidence bands on forecasts communicate uncertainty',
          'Warning colors on high-risk consensus outcomes trigger re-evaluation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines whether group tools amplify or mitigate risky shift',
        examples: [
          'Sequential reveal of individual votes before group discussion preserves independence',
          'Forced pause before finalizing high-risk group decisions enables reflection',
          'Anonymous voting reduces social comparison pressure',
          'Devil\'s advocate prompts inject structured dissent into group flow',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing in group tools influences the direction and magnitude of polarization',
        examples: [
          'Balanced pro/con framing prevents one-sided persuasive argument effects',
          'Historical base rates for similar decisions ground group judgment in data',
          'Explicit risk/reward trade-off language helps groups reason rather than react',
          'Worst-case scenario descriptions counterbalance optimism bias in groups',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible group decision tools must preserve individual judgment for all participants',
        examples: [
          'Screen reader users must have equal access to individual voting before group discussion',
          'Keyboard-navigable dissent mechanisms ensure all users can raise objections',
          'Risk visualizations need text alternatives that convey the same information',
          'Asynchronous participation options prevent time-pressure amplification of risky shift',
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
        title: 'Individual Pre-Vote Before Group Discussion',
        description:
          'Team decision tool that captures individual risk assessments before opening group deliberation',
        code: `<div class="decision-tool">
  <section class="phase individual-phase active">
    <h3>Step 1: Your Individual Assessment</h3>
    <p class="instruction">Rate the risk level before seeing others' opinions</p>
    <div class="risk-slider">
      <label>How risky is this proposal?</label>
      <input type="range" min="1" max="10" value="5" />
      <div class="scale-labels">
        <span>Very Safe</span>
        <span>Very Risky</span>
      </div>
    </div>
    <textarea placeholder="What concerns you most about this decision?"></textarea>
    <button class="primary">Submit My Assessment</button>
    <p class="note">Your vote is anonymous and locked before discussion begins</p>
  </section>

  <section class="phase group-phase locked">
    <h3>Step 2: Group Discussion</h3>
    <p class="locked-message">Opens after all members submit individual assessments</p>
  </section>
</div>`,
        explanation:
          'By requiring individual assessments before group discussion, this design preserves each person\'s independent judgment. The locked group phase prevents social comparison from contaminating initial positions.',
        principle:
          'Capture individual judgment before group influence begins to establish a true baseline',
        metrics: {
          before: 'Group decisions were 34% riskier than average individual preference',
          after: 'With pre-vote, group decisions were only 12% riskier than average individual preference',
          improvement: '65% reduction in risky shift magnitude',
        },
      },
      {
        title: 'Devil\'s Advocate Feature',
        description:
          'Collaborative tool that automatically assigns and prompts a devil\'s advocate role',
        code: `<div class="group-decision-panel">
  <div class="consensus-view">
    <h3>Team Consensus: Approve Expansion</h3>
    <div class="vote-bar">
      <div class="approve" style="width: 75%">6 Approve</div>
      <div class="reject" style="width: 25%">2 Reject</div>
    </div>
  </div>

  <div class="devils-advocate-panel">
    <div class="advocate-header">
      <span class="role-badge">Devil's Advocate: Sarah</span>
      <p>Automatically assigned to challenge the majority position</p>
    </div>
    <div class="challenge-prompts">
      <h4>Required Challenges Before Finalizing:</h4>
      <label><input type="checkbox" /> What is the worst-case scenario?</label>
      <label><input type="checkbox" /> What would make us reverse this decision in 6 months?</label>
      <label><input type="checkbox" /> What are we not seeing that a skeptic would?</label>
    </div>
  </div>

  <div class="risk-summary">
    <h4>Risk Assessment</h4>
    <div class="risk-meter" data-level="7">
      <span class="risk-label">Risk Level: 7/10</span>
    </div>
    <p class="risk-note">This exceeds the team's stated risk tolerance of 5/10</p>
  </div>
</div>`,
        explanation:
          'The devil\'s advocate role injects structured dissent into group decisions. Required challenge prompts ensure risk factors are explicitly addressed before the group can finalize a decision.',
        principle:
          'Structured dissent counterbalances the natural tendency of groups to polarize toward risk',
      },
      {
        title: 'Risk Assessment Dashboard for Group Decisions',
        description:
          'Visual dashboard showing individual vs group risk tolerance with drift indicators',
        code: `<div class="risk-dashboard">
  <h3>Decision: Launch New Market</h3>

  <div class="risk-comparison">
    <div class="individual-scores">
      <h4>Individual Risk Scores (Pre-Discussion)</h4>
      <div class="score-dots">
        <span class="dot" style="left: 30%">A</span>
        <span class="dot" style="left: 40%">B</span>
        <span class="dot" style="left: 45%">C</span>
        <span class="dot" style="left: 50%">D</span>
        <span class="dot" style="left: 55%">E</span>
      </div>
      <p class="average">Individual Average: 4.4 / 10</p>
    </div>

    <div class="group-score">
      <h4>Group Consensus (Post-Discussion)</h4>
      <div class="score-bar">
        <span class="marker" style="left: 70%">Group: 7.0</span>
      </div>
    </div>

    <div class="drift-warning">
      <span class="warning-icon">⚠</span>
      <p><strong>Risky Shift Detected:</strong> Group consensus is 59% riskier
      than the average individual assessment. Consider revisiting.</p>
    </div>
  </div>

  <div class="actions">
    <button class="secondary">Request Individual Re-Vote</button>
    <button class="secondary">Assign Devil's Advocate</button>
    <button class="primary">Proceed with Awareness</button>
  </div>
</div>`,
        explanation:
          'This dashboard makes risky shift visible by comparing individual pre-discussion scores with post-discussion group consensus. The drift warning alerts teams when their collective decision has shifted significantly toward risk.',
        principle:
          'Making risky shift visible and measurable empowers groups to self-correct',
        metrics: {
          before: 'Teams unaware of risky shift approved 78% of high-risk proposals',
          after: 'With drift visualization, teams re-evaluated 45% of high-risk proposals and revised 30%',
          improvement: '38% reduction in poorly calibrated group risk decisions',
        },
      },
    ],

    bad: [
      {
        title: 'Unstructured Group Vote Without Safeguards',
        description:
          'Team tool that jumps directly to group voting without individual assessment',
        code: `<!-- DON'T DO THIS -->
<div class="quick-vote">
  <h3>Team Vote: Should we double the marketing budget?</h3>
  <p>Current discussion has been going for 45 minutes</p>
  <div class="vote-buttons">
    <button class="approve">Yes, let's go big!</button>
    <button class="reject">No, too risky</button>
  </div>
  <p class="current">Current votes: 5 Yes, 1 No</p>
  <p class="note">Majority wins!</p>
</div>`,
        explanation:
          'This design maximizes risky shift: no individual pre-assessment, visible vote counts creating social pressure, enthusiasm-biased button labels ("let\'s go big!"), and simple majority rule with no risk analysis.',
        principle:
          'Unstructured group votes amplify risky shift by combining social pressure with no individual baseline',
      },
      {
        title: 'Public Voting with Peer Pressure',
        description:
          'Investment club tool showing who voted for what before everyone has voted',
        code: `<!-- DON'T DO THIS -->
<div class="investment-vote">
  <h3>Invest $50,000 in Crypto Startup?</h3>
  <div class="live-votes">
    <div class="voter yes">
      <img src="ceo.jpg" alt="CEO" />
      <p><strong>James (CEO)</strong> voted YES</p>
    </div>
    <div class="voter yes">
      <img src="cfo.jpg" alt="CFO" />
      <p><strong>Maria (CFO)</strong> voted YES</p>
    </div>
    <div class="voter pending">
      <img src="you.jpg" alt="You" />
      <p><strong>You</strong> — cast your vote</p>
    </div>
  </div>
  <button class="approve">Vote Yes</button>
  <button class="reject">Vote No</button>
</div>`,
        explanation:
          'Showing senior leaders\' votes before others have voted creates extreme social comparison pressure. Junior members will shift toward the riskier position to align with leadership, amplifying risky shift.',
        principle:
          'Public, sequential voting with visible authority figures maximizes social comparison and conformity pressure',
      },
      {
        title: 'Consensus Without Dissent Tracking',
        description:
          'Team tool that shows only the majority decision with no minority view',
        code: `<!-- DON'T DO THIS -->
<div class="team-decision">
  <h3>Team Decision: Approved!</h3>
  <div class="big-checkmark">✓</div>
  <p>The team has approved the aggressive expansion plan.</p>
  <p class="small">Vote: 5-3</p>
  <button class="primary">Proceed to Implementation</button>
</div>`,
        explanation:
          'This design treats a 5-3 vote as unanimous consensus. Three dissenters are invisible. No risk factors are surfaced. No reflection period is offered. The celebratory framing discourages reconsideration.',
        principle:
          'Hiding dissent and celebrating narrow majorities as consensus amplifies risky shift and suppresses valuable caution',
      },
    ],

    realWorld: [
      {
        company: 'Loomio',
        product: 'Loomio Decision Tools',
        description: 'Loomio\'s group decision platform uses a graduated consent model where members can agree, abstain, disagree, or block. Dissent is visible and valued, not suppressed. Individual positions are captured before and after discussion.',
        effectiveness: 'very-effective',
        analysis: 'By making disagreement a legitimate, structured part of the decision process, Loomio counteracts risky shift. The block mechanism ensures minority concerns about risk cannot be overridden by group momentum.',
      },
      {
        company: 'Betterment',
        product: 'Joint Investment Accounts',
        description: 'Betterment\'s joint accounts require both partners to individually set risk tolerance before presenting a blended portfolio recommendation. Each person\'s risk profile is preserved and visible.',
        effectiveness: 'effective',
        analysis: 'By capturing individual risk preferences independently and showing how the joint decision differs from each person\'s individual preference, Betterment makes risky shift transparent and gives couples tools to find genuine compromise.',
      },
      {
        company: 'Atlassian',
        product: 'DACI Decision Framework in Confluence',
        description: 'Atlassian\'s DACI framework assigns explicit roles (Driver, Approver, Contributor, Informed) in group decisions. Contributors provide input individually before the Driver synthesizes, and the Approver makes the final call with full visibility into dissent.',
        effectiveness: 'effective',
        analysis: 'Structured roles prevent diffusion of responsibility—a key driver of risky shift. Individual contribution before synthesis preserves diverse risk perspectives.',
      },
      {
        company: 'IDEO',
        product: 'Design Thinking Brainstorming',
        description: 'IDEO\'s brainstorming methodology uses individual silent ideation before group sharing, followed by structured evaluation with explicit feasibility and risk criteria.',
        effectiveness: 'very-effective',
        analysis: 'The silent ideation phase captures individual creativity without group influence. The structured evaluation phase with risk criteria channels group energy productively while preventing unchecked polarization toward risky ideas.',
      },
    ],

    abTests: [
      {
        title: 'Individual Pre-Vote vs Direct Group Discussion',
        hypothesis:
          'Requiring individual risk assessments before group discussion will reduce the magnitude of risky shift in team decisions',
        controlVersion: {
          description:
            'Team decision tool with immediate group discussion and a single group vote at the end',
          metrics: {
            conversionRate: 'N/A',
            riskShiftMagnitude: '2.6 points on 10-point scale',
            decisionQuality: '58% of decisions rated "well-calibrated" by independent reviewers',
          },
        },
        treatmentVersion: {
          description:
            'Team decision tool requiring anonymous individual risk assessment before group discussion, with individual vs group comparison shown before final vote',
          metrics: {
            conversionRate: 'N/A',
            riskShiftMagnitude: '0.9 points on 10-point scale',
            decisionQuality: '79% of decisions rated "well-calibrated" by independent reviewers',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Individual pre-votes reduced risky shift magnitude by 65%. Decision quality improved by 36%. Teams reported higher confidence in their decisions and were more likely to identify risk factors.',
          learnings: [
            'Anonymous individual assessment before group discussion dramatically reduces risky shift',
            'Showing the gap between individual and group positions triggers self-correction',
            'Teams using pre-votes identified 2.3x more risk factors than direct-discussion teams',
            'The effect was strongest for high-stakes financial and strategic decisions',
          ],
        },
      },
      {
        title: 'Devil\'s Advocate Assignment vs No Structured Dissent',
        hypothesis:
          'Auto-assigning a devil\'s advocate role will improve group decision calibration by injecting structured dissent',
        controlVersion: {
          description:
            'Standard group discussion with no assigned roles; any member may raise objections organically',
          metrics: {
            conversionRate: 'N/A',
            objectionsRaised: '1.2 per decision',
            riskFactorsIdentified: '2.1 per decision',
          },
        },
        treatmentVersion: {
          description:
            'Group discussion with auto-assigned devil\'s advocate who must complete a challenge checklist before the group can finalize',
          metrics: {
            conversionRate: 'N/A',
            objectionsRaised: '3.8 per decision',
            riskFactorsIdentified: '5.4 per decision',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Structured devil\'s advocate role tripled objections raised and more than doubled risk factors identified. Groups with devil\'s advocates made fewer post-decision reversals (8% vs 23%).',
          learnings: [
            'Organic dissent is rare in groups due to conformity pressure; it must be structured',
            'The checklist format ensures dissent is substantive, not performative',
            'Rotating the devil\'s advocate role prevents one person from being labeled as "the negative one"',
            'Teams reported that structured dissent improved trust and psychological safety',
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
        name: 'Group Vote Displays',
        description:
          'Interfaces showing group voting results, consensus indicators, or majority decisions',
        howToSpot:
          'Look for vote tallies, approval percentages, or consensus badges that obscure individual variation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Real-Time Group Sentiment',
        description:
          'Live displays of group mood, sentiment, or direction during discussion',
        howToSpot:
          'Check for live polling, sentiment meters, or group agreement indicators visible during deliberation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Individual Assessment',
        description:
          'Group decision tools with no individual input phase before collective discussion',
        howToSpot:
          'Check if the tool jumps directly to group discussion or voting without capturing individual opinions first',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Authority-Weighted Voting',
        description:
          'Visible indication of senior or influential members\' positions before others vote',
        howToSpot:
          'Look for named votes, leadership opinions shown first, or weighted voting that amplifies authority',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Celebratory Consensus Framing',
        description:
          'Group decisions presented with positive, momentum-building framing regardless of margin',
        howToSpot:
          'Check for checkmarks, success animations, or "team decided!" messaging even on narrow votes',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Unstructured Group Decision Pattern',
        description: 'Group discussion and voting with no individual baseline or structured dissent',
        indicators: [
          'Direct group discussion without individual pre-assessment',
          'Single group vote with no comparison to individual preferences',
          'No devil\'s advocate or dissent mechanism',
          'Majority-wins logic with no risk review',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Social Comparison Amplification Pattern',
        description: 'Design elements that make individual members\' positions visible during deliberation, increasing conformity pressure',
        indicators: [
          'Live vote counts visible during voting',
          'Named or attributed votes before everyone has voted',
          'Senior leaders\' positions shown prominently',
          'Peer activity indicators during decision-making',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'False Consensus Pattern',
        description: 'Group decisions presented as unanimous or strongly supported when significant dissent exists',
        indicators: [
          'Narrow votes displayed as "team decided"',
          'Dissent counts minimized or hidden',
          'No display of vote distribution or confidence intervals',
          'Skip directly to implementation without reflection',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Diffusion of Responsibility Pattern',
        description: 'Group tools that obscure individual accountability for collective risk decisions',
        indicators: [
          'Anonymous group decisions with no individual record',
          'No assigned decision owner or accountable party',
          '"The team decided" language replacing individual ownership',
          'No post-decision review or retrospective mechanism',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the tool capture individual opinions before group discussion begins?',
      'Are votes anonymous to prevent social comparison pressure?',
      'Is there a structured devil\'s advocate or dissent mechanism?',
      'Can users see the gap between individual assessments and group consensus?',
      'Are narrow or contested decisions flagged for additional review?',
      'Is risk information displayed prominently alongside group decisions?',
      'Are senior or influential members\' votes hidden until everyone has voted?',
      'Is there a cooling-off period before finalizing high-risk group decisions?',
      'Does the interface show vote distributions, not just majorities?',
      'Are worst-case scenarios presented alongside optimistic group consensus?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in group dynamics and risky shift (group polarization toward risk).

Analyze the provided design for risky shift patterns. Identify:

1. **Group Decision Mechanisms**: How groups form collective judgments and votes
2. **Individual Preservation**: Whether individual opinions are captured before group influence
3. **Dissent Structures**: How disagreement and minority positions are handled
4. **Risk Visibility**: How risk information is presented to groups during decision-making
5. **Social Comparison**: Whether design elements create conformity pressure

For each pattern found:
- Identify whether the design amplifies or mitigates risky shift
- Assess the magnitude of potential shift toward risk
- Determine if safeguards (pre-votes, devil's advocates, risk dashboards) are present
- Evaluate whether dissent is structured and valued or suppressed
- Suggest improvements to preserve individual judgment within group collaboration

Consider:
- Does the tool capture individual opinions before group discussion?
- Are votes anonymous to prevent social comparison?
- Is risk information prominently displayed during group deliberation?
- Is there a devil's advocate or structured dissent mechanism?
- Are narrow decisions flagged differently from strong consensus?
- Does the design create diffusion of responsibility?

Provide actionable recommendations for group decision tools that harness collective intelligence while mitigating destructive risky shift.`,

    outputSchema: {
      type: 'object',
      properties: {
        riskyShiftPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              mechanism: { type: 'string' },
              shiftDirection: { type: 'string' },
              magnitude: { type: 'string' },
              safeguardsPresent: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'mechanism',
              'shiftDirection',
              'safeguardsPresent',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            individualPreservation: { type: 'number' },
            dissentStructure: { type: 'number' },
            riskVisibility: { type: 'number' },
            socialComparisonMitigation: { type: 'number' },
          },
          required: [
            'individualPreservation',
            'dissentStructure',
            'riskVisibility',
            'socialComparisonMitigation',
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
        'riskyShiftPatterns',
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
        title: 'Add Individual Pre-Assessment Phase',
        description:
          'Before any group discussion, capture each member\'s independent risk assessment and position',
        example:
          'Show a private risk-rating slider and open-ended concern field that locks before group discussion opens',
        tips: [
          'Make individual assessment anonymous to prevent preemptive conformity',
          'Lock individual votes so they cannot be changed after seeing group discussion',
          'Store individual baselines for comparison with post-discussion group outcome',
        ],
      },
      {
        step: 2,
        title: 'Build Structured Dissent Mechanisms',
        description:
          'Create explicit devil\'s advocate roles and dissent capture tools',
        example:
          'Auto-assign a rotating devil\'s advocate who must complete a risk-challenge checklist before the group can finalize',
        tips: [
          'Rotate the role so no single person is always the contrarian',
          'Use checklists to make dissent substantive and actionable',
          'Display dissent prominently alongside consensus, not buried in footnotes',
        ],
      },
      {
        step: 3,
        title: 'Visualize Risk and Drift',
        description:
          'Show risk meters, individual-vs-group comparisons, and drift indicators',
        example:
          'Display a "risky shift indicator" showing how far the group consensus has moved from the average individual pre-vote',
        tips: [
          'Use color-coded risk meters (green/amber/red) for visceral feedback',
          'Show vote distributions, not just averages or majorities',
          'Surface worst-case scenarios alongside optimistic group consensus',
        ],
      },
      {
        step: 4,
        title: 'Implement Cooling-Off Periods',
        description:
          'Add mandatory reflection time before finalizing high-risk group decisions',
        example:
          'When group consensus exceeds the team\'s stated risk tolerance, require a 24-hour cooling-off period before final approval',
        tips: [
          'Scale the cooling-off period to the magnitude of risk',
          'Allow members to change their votes during the cooling-off period',
          'Send a summary of risk factors during the waiting period',
        ],
      },
      {
        step: 5,
        title: 'Preserve Accountability',
        description:
          'Ensure individual accountability is maintained even in group decisions',
        example:
          'Record and attribute individual positions; assign a named decision owner who is accountable for the outcome',
        tips: [
          'Avoid "the team decided" language; name the decision owner',
          'Log individual votes for retrospective analysis',
          'Build post-decision review mechanisms to learn from risky shift patterns',
        ],
      },
    ],

    dos: [
      'Capture individual risk assessments before group discussion',
      'Use anonymous voting to reduce social comparison pressure',
      'Build structured devil\'s advocate mechanisms into group tools',
      'Show the gap between individual assessments and group consensus',
      'Display risk visualizations prominently during group decisions',
      'Flag narrow or contested decisions for additional review',
      'Implement cooling-off periods for high-risk group decisions',
      'Rotate dissent roles so no one is permanently the contrarian',
      'Show vote distributions and confidence intervals, not just majorities',
      'Maintain individual accountability within group decision records',
    ],

    donts: [
      'Don\'t allow group discussion before individual opinions are captured',
      'Don\'t show senior leaders\' votes before everyone has voted',
      'Don\'t present narrow decisions as strong consensus',
      'Don\'t hide dissent or minority positions from the group',
      'Don\'t use "the team decided" language that diffuses individual accountability',
      'Don\'t celebrate consensus without surfacing the risk factors considered',
      'Don\'t skip risk assessment in group decision tools',
      'Don\'t allow real-time vote counts to influence remaining voters',
      'Don\'t design group tools that suppress or penalize disagreement',
      'Don\'t assume group consensus is better calibrated than individual judgment',
    ],

    bestPractices: [
      {
        title: 'Pre-Vote / Discuss / Re-Vote Pattern',
        description:
          'Capture individual positions, open discussion with structured dissent, then re-vote with drift awareness',
        rationale:
          'This three-phase pattern preserves individual judgment, enables productive debate, and makes risky shift visible and correctable',
        example:
          'Individual risk slider -> group discussion with devil\'s advocate checklist -> final vote with drift indicator',
      },
      {
        title: 'Anonymous Until Complete',
        description:
          'Keep all votes anonymous until everyone has submitted, then reveal distribution',
        rationale:
          'Prevents social comparison and authority bias from contaminating individual positions',
        example:
          'Gray avatars with "Vote pending" until all members submit; then reveal a distribution chart',
      },
      {
        title: 'Risk Tolerance Guardrails',
        description:
          'Set explicit risk tolerance thresholds and alert when group decisions exceed them',
        rationale:
          'Pre-committed risk boundaries are harder to rationalize away than ad hoc assessments',
        example:
          'Team sets risk tolerance at 5/10 during setup; decisions exceeding this trigger mandatory review and cooling-off period',
      },
      {
        title: 'Retrospective Drift Analysis',
        description:
          'After outcomes are known, show teams how their group decisions compared to individual pre-votes and actual results',
        rationale:
          'Feedback loops help teams calibrate their group decision-making over time and recognize their own risky shift patterns',
        example:
          'Quarterly report showing: individual pre-votes -> group decisions -> actual outcomes for past decisions',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure group decision state is conveyed semantically',
        implementation:
          'Use ARIA live regions to announce vote status changes; convey risk levels and dissent through text, not just color or visual position',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Risk indicators must not rely on color alone',
        implementation:
          'Pair color-coded risk meters with text labels, icons, and ARIA descriptions so all users perceive risk levels',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All group voting and dissent mechanisms must be keyboard-operable',
        implementation:
          'Ensure risk sliders, vote buttons, devil\'s advocate checklists, and decision panels are fully keyboard-navigable',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Vote status and risk warnings must be announced to assistive technology',
        implementation:
          'Use role="status" or aria-live="polite" for vote tallies and risk drift warnings so screen reader users receive timely updates',
      },
    ],

    ethics: [
      {
        concern: 'Amplifying Risky Shift for Engagement',
        severity: 'critical',
        explanation:
          'Designing group features that deliberately amplify risky shift to increase engagement, activity, or spending',
        mitigation:
          'Build safeguards (pre-votes, dissent mechanisms, cooling-off periods) into all group decision tools. Never optimize group features for risk-taking as an engagement metric.',
      },
      {
        concern: 'Suppressing Dissent',
        severity: 'critical',
        explanation:
          'Hiding minority positions or designing interfaces that make disagreement difficult or socially costly',
        mitigation:
          'Make dissent a structured, valued part of the decision process. Display vote distributions. Never penalize disagreement in the interface.',
      },
      {
        concern: 'False Consensus',
        severity: 'high',
        explanation:
          'Presenting narrow group decisions as strong consensus, obscuring the degree of disagreement',
        mitigation:
          'Always show vote distributions and margin of decision. Flag narrow votes explicitly. Never use "team decided" framing on contested outcomes.',
      },
      {
        concern: 'Diffusion of Accountability',
        severity: 'high',
        explanation:
          'Designing group tools that allow no one to be individually accountable for risky collective decisions',
        mitigation:
          'Assign named decision owners. Log individual votes. Build retrospective review mechanisms that connect decisions to outcomes.',
      },
      {
        concern: 'Authority Amplification',
        severity: 'medium',
        explanation:
          'Showing senior leaders\' votes early to disproportionately influence the group toward their position',
        mitigation:
          'Keep all votes anonymous until everyone has submitted. If authority weighting is necessary, disclose it transparently.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Comparison of Individual and Group Decisions Involving Risk',
        author: 'Stoner, J. A. F.',
        year: 1961,
        description:
          'The original master\'s thesis that discovered the risky shift phenomenon, showing that groups consistently made riskier decisions than individuals',
        type: 'foundational',
      },
      {
        title: 'The Group as a Polarizer of Attitudes',
        author: 'Moscovici, S., & Zavalloni, M.',
        year: 1969,
        doi: '10.1037/h0027568',
        description:
          'Landmark study that generalized risky shift to group polarization, showing groups move toward whatever extreme the majority already favors',
        type: 'foundational',
      },
      {
        title: 'Group Polarization: A Critical Review and Meta-Analysis',
        author: 'Isenberg, D. J.',
        year: 1986,
        doi: '10.1037/0022-3514.50.6.1141',
        description:
          'Comprehensive meta-analysis of group polarization research, confirming the robustness of the effect across diverse contexts',
        type: 'advanced',
      },
      {
        title: 'Risky Shift Phenomenon in Groups: A Social Explanation',
        author: 'Brown, R.',
        year: 1965,
        description:
          'Proposed the cultural value explanation for risky shift: risk-taking is culturally admired, so group discussion shifts preferences toward risk',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Group Dynamics',
        author: 'Forsyth, Donelson R.',
        year: 2018,
        isbn: '9781337408851',
        description:
          'Comprehensive textbook covering group polarization, risky shift, and related group decision phenomena with practical applications',
        type: 'foundational',
      },
      {
        title: 'Wiser: Getting Beyond Groupthink to Make Groups Smarter',
        author: 'Sunstein, Cass R., & Hastie, Reid',
        year: 2015,
        isbn: '9781633690615',
        description:
          'Practical guide to designing group decision processes that counteract risky shift, groupthink, and other collective reasoning failures',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Coverage of group judgment biases including risky shift and its relationship to individual cognitive biases',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Why Groups Make Riskier Decisions',
        author: 'Harvard Business Review',
        url: 'https://hbr.org/topic/decision-making',
        description:
          'Business-oriented overview of risky shift in corporate decision-making with mitigation strategies',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Group Polarization and Risky Shift',
        author: 'Social Psychology',
        url: 'https://www.youtube.com/results?search_query=risky+shift+group+polarization',
        description:
          'Educational overview of the risky shift phenomenon with experimental evidence and real-world examples',
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
      'groupthink',
      'diffusion-of-responsibility',
      'social-proof',
      'bandwagon-effect',
    ],

    conflicts: [
      'loss-aversion',
      'status-quo-bias',
    ],

    confusedWith: [
      'groupthink',
      'bandwagon-effect',
      'mob-mentality',
    ],

    hierarchy: {
      parent: 'group-polarization',
      children: [
        'cautious-shift',
      ],
    },
  },
};
