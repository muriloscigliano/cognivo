/**
 * CAUTIOUS SHIFT
 *
 * Groups make more conservative decisions than individuals would,
 * especially when stakes are high or consequences are visible.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const cautiousShift: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'cautious-shift',
    name: 'Cautious Shift',
    aliases: ['Group Cautiousness', 'Conservative Shift', 'Risk-Averse Group Polarization'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'group-dynamics',
      'risk-aversion',
      'consensus',
      'approval-workflows',
      'decision-making',
      'collaboration',
      'safety',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Groups make more conservative decisions than individuals would',

    detailed: `Cautious shift is a form of group polarization where collective decision-making produces more risk-averse outcomes than any individual member would choose alone. When a group deliberates on a decision with visible consequences or high stakes, members tend to advocate for safer options, and the group converges on a more conservative position than the average individual preference.

This phenomenon arises because group discussion amplifies shared concerns about downside risk. Members who voice caution receive social reinforcement, while those who advocate bold action face pressure to justify potential negative outcomes to the entire group. The diffusion of responsibility paradoxically increases caution: no single person wants to be accountable for a group-endorsed risk that fails.

In product design, cautious shift profoundly affects multi-stakeholder approval workflows, team review processes, and consensus-building tools. Designers must account for the tendency of groups to over-index on safety, which can slow down decision velocity, block beneficial changes, and create approval bottlenecks.`,

    psychologyBasis: {
      discoveredBy: 'James Stoner',
      year: 1961,
      theory: 'Group Polarization and Choice Shift',
      mechanism: `Groups sometimes shift toward more cautious decisions than individuals, especially when stakes are high or consequences are visible. This happens because:

1. **Social Responsibility Diffusion**: When outcomes affect the whole group, members feel collective accountability and err on the side of caution
2. **Persuasive Arguments Effect**: Cautious arguments carry more weight in high-stakes discussions because the downside of a wrong bold decision is more vivid than the upside of a right one
3. **Social Comparison**: Members compare their risk tolerance to the group norm and adjust toward perceived safety to avoid standing out as reckless
4. **Accountability Pressure**: Each member imagines having to justify a risky choice to others if it goes wrong, leading to more conservative positions
5. **Loss Salience in Groups**: Potential losses become more salient when discussed collectively, as each person adds their own fears and concerns to the deliberation`,
    },

    realWorldExample: `In software engineering, a single developer might feel confident deploying a code change directly to production. But when the same change goes through a team code review with three reviewers, the group often requests additional tests, documentation, and staging validation before approving the merge. The group's collective caution exceeds what any individual reviewer would have required alone, especially when the change touches critical paths like payments or authentication.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Cautious shift affects how groups make decisions in collaborative interfaces. Designers building group approval workflows, multi-stakeholder decision tools, and consensus-building features must account for the tendency of groups to become overly conservative. This can be leveraged to:

- Strengthen safeguards for high-risk actions through multi-person approval
- Build trust and accountability in collaborative workflows
- Prevent catastrophic errors by requiring consensus on destructive actions
- Balance decision velocity against appropriate caution through tiered approval
- Design approval chains that match risk level to required consensus`,

    whenToUse: [
      {
        title: 'Multi-Person Approval for High-Risk Actions',
        scenario:
          'When a single mistake could cause significant damage or is irreversible',
        example:
          'Require two or more approvals before deploying to production, deleting large datasets, or executing financial transactions above a threshold',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Team Review Before Deployment',
        scenario: 'When changes affect shared systems, infrastructure, or user-facing features',
        example:
          'Mandate code review by at least two team members before merging to main branch, with automated checks and a sign-off checklist',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Consensus Requirements for Policy Changes',
        scenario: 'When organizational policies, access controls, or configurations are being modified',
        example:
          'Require majority approval from a governance committee before changing security policies, pricing structures, or data retention rules',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Escalation Workflows',
        scenario: 'When initial reviewers encounter edge cases or ambiguity',
        example:
          'Provide an escalation path where uncertain reviewers can pull in additional stakeholders rather than approving or rejecting alone',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Staged Rollouts with Checkpoints',
        scenario: 'When releasing changes to progressively larger audiences',
        example:
          'Design canary deployment interfaces where each expansion stage requires team consensus before proceeding to the next percentage',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Low-Stakes Routine Decisions',
        reason:
          'Requiring group consensus for trivial changes creates unnecessary friction and slows velocity',
        consequence:
          'Team frustration, approval fatigue, and bottlenecks on non-critical work',
        alternative:
          'Allow individual autonomy for low-risk actions; reserve group approval for high-impact decisions',
      },
      {
        title: 'Time-Critical Emergency Response',
        reason:
          'Cautious shift can dangerously delay action when immediate response is needed',
        consequence:
          'Slower incident response, extended outages, or missed intervention windows',
        alternative:
          'Designate single-authority emergency protocols with post-action group review',
      },
      {
        title: 'Creative and Exploratory Work',
        reason:
          'Group caution can stifle innovation, experimentation, and bold ideas',
        consequence:
          'Overly safe, incremental outcomes that fail to explore new territory',
        alternative:
          'Use individual or small-team autonomy for experimentation, with group review only at key milestones',
      },
      {
        title: 'Already Over-Cautious Teams',
        reason:
          'Adding more approval layers to risk-averse teams amplifies existing conservatism',
        consequence:
          'Decision paralysis, excessive bureaucracy, and inability to ship',
        alternative:
          'Reduce approval requirements and empower individuals with clear decision frameworks',
      },
    ],

    commonMistakes: [
      {
        title: 'Over-Engineering Approval Chains',
        description:
          'Requiring too many approvers for every action, regardless of risk level',
        why: 'Each additional approver amplifies cautious shift, creating compounding conservatism',
        fix: 'Tier approval requirements by risk level: low-risk (self-serve), medium (one reviewer), high (multi-approval)',
      },
      {
        title: 'Treating All Decisions as High-Stakes',
        description:
          'Applying the same consensus requirements to trivial and critical decisions alike',
        why: 'Creates approval fatigue and trains users to rubber-stamp reviews',
        fix: 'Implement risk classification that automatically routes decisions to appropriate approval levels',
      },
      {
        title: 'No Deadline on Group Decisions',
        description:
          'Allowing approval requests to linger indefinitely without time pressure',
        why: 'Without deadlines, cautious shift compounds as each reviewer waits for others to approve first',
        fix: 'Set SLA timers on approvals with auto-escalation and fallback to designated decision-makers',
      },
      {
        title: 'Hiding Individual Accountability',
        description:
          'Anonymous approval processes where no individual is responsible for the final decision',
        why: 'Anonymity removes personal accountability, leading to diffusion of responsibility and excessive caution',
        fix: 'Make approvals transparent with named reviewers and clear ownership of the final sign-off',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how approval workflows, review panels, and consensus indicators are presented',
        examples: [
          'Approval status dashboards showing who has reviewed and who is pending',
          'Side-by-side comparison views for group decision-making',
          'Progress indicators showing consensus state (approved, pending, blocked)',
          'Risk-level badges that visually communicate required approval depth',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text hierarchy communicates risk levels and urgency of group decisions',
        examples: [
          'Bold risk-level labels that signal required caution to reviewers',
          'Clear status text showing approval state at a glance',
          'Hierarchy distinguishing critical warnings from informational notes',
          'Timestamps and SLA indicators showing approval urgency',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding communicates approval states, risk levels, and decision urgency',
        examples: [
          'Red/amber/green status indicators for approval pipeline stages',
          'Risk-level color coding (critical red, high orange, medium yellow, low green)',
          'Muted vs vibrant colors distinguishing approved from pending items',
          'Warning colors on actions that require additional approval',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how group decisions are collected, sequenced, and resolved',
        examples: [
          'Sequential vs parallel approval workflows affecting decision speed',
          'One-click approve/reject with optional comment for low-friction review',
          'Escalation buttons that pull in additional stakeholders',
          'Blocking vs non-blocking review requirements',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing shapes how reviewers perceive risk and make approval decisions',
        examples: [
          'Change summaries that contextualize impact for reviewers',
          'Risk assessment text explaining why multi-approval is required',
          'Historical context showing similar past decisions and their outcomes',
          'Clear descriptions of what happens if the action is approved vs rejected',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible approval workflows ensure all team members can participate in group decisions',
        examples: [
          'Keyboard-navigable approval buttons and review interfaces',
          'Screen reader announcements for approval state changes',
          'Clear focus indicators on approve/reject actions',
          'Accessible status indicators that do not rely solely on color',
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
        title: 'Tiered Approval Workflow',
        description:
          'Deployment pipeline with risk-based approval requirements',
        code: `<div class="deployment-approval">
  <h3>Deploy to Production</h3>
  <div class="risk-badge high">High Risk — 2 approvals required</div>

  <div class="change-summary">
    <p><strong>Changes:</strong> Payment processing logic update</p>
    <p><strong>Impact:</strong> All checkout flows</p>
    <p><strong>Rollback:</strong> Automated, &lt;2 min</p>
  </div>

  <div class="approvals">
    <div class="approver approved">
      <span class="avatar">JC</span>
      <span class="name">Jamie Chen</span>
      <span class="status approved">Approved</span>
      <span class="time">12 min ago</span>
    </div>
    <div class="approver pending">
      <span class="avatar">KR</span>
      <span class="name">Kim Rivera</span>
      <span class="status pending">Pending review</span>
      <span class="sla">SLA: 2h remaining</span>
    </div>
  </div>

  <button class="deploy" disabled>Deploy (1/2 approvals)</button>
</div>`,
        explanation:
          'Risk-based approval tiers harness cautious shift proportionally. High-risk changes get multi-person review while showing clear progress, SLA timers prevent indefinite delays, and rollback information reduces excessive caution.',
        principle:
          'Match group consensus requirements to actual risk level',
        metrics: {
          before: 'All deployments required 3 approvals, average deploy time: 4.2 hours',
          after: 'Tiered approval (1-3 based on risk), average deploy time: 1.1 hours',
          improvement: '74% faster deployments with maintained safety record',
        },
      },
      {
        title: 'Multi-Signature Action Confirmation',
        description:
          'Financial platform requiring multiple approvals for large transfers',
        code: `<div class="transfer-approval">
  <h3>Wire Transfer — $250,000</h3>

  <div class="approval-requirement">
    <p>Transfers over $50,000 require approval from 2 authorized signers</p>
  </div>

  <div class="approval-chain">
    <div class="signer completed">
      <span class="check">&#10003;</span>
      <div>
        <p class="name">Sarah Okafor — CFO</p>
        <p class="action">Approved &amp; signed</p>
      </div>
    </div>
    <div class="signer awaiting">
      <span class="pending-icon">&#9711;</span>
      <div>
        <p class="name">Marcus Lee — Treasurer</p>
        <p class="action">Awaiting signature</p>
      </div>
    </div>
  </div>

  <div class="audit-trail">
    <a href="/audit/transfer-8821">View full audit trail</a>
  </div>
</div>`,
        explanation:
          'Multi-signature workflows apply cautious shift constructively for high-value financial actions. Named signers create accountability, threshold-based requirements avoid unnecessary friction on small transfers, and an audit trail provides transparency.',
        principle:
          'Use group caution as a protective mechanism for irreversible, high-value actions',
      },
      {
        title: 'Code Review with Context',
        description:
          'Pull request review interface that provides risk context to reviewers',
        code: `<div class="pull-request">
  <h3>PR #482: Update auth token rotation</h3>
  <div class="risk-analysis">
    <span class="risk-label critical">Security-Critical</span>
    <p>Touches authentication flow — requires security team review</p>
  </div>

  <div class="review-checklist">
    <label><input type="checkbox"> Token expiry logic validated</label>
    <label><input type="checkbox"> Backward compatibility confirmed</label>
    <label><input type="checkbox"> Staging tests passing</label>
    <label><input type="checkbox"> Security review complete</label>
  </div>

  <div class="reviewers">
    <div class="reviewer">
      <span class="name">Alex — Backend Lead</span>
      <span class="status approved">Approved</span>
    </div>
    <div class="reviewer">
      <span class="name">Priya — Security Engineer</span>
      <span class="status changes-requested">Changes Requested</span>
    </div>
  </div>

  <p class="merge-status blocked">Merge blocked — security review required</p>
</div>`,
        explanation:
          'The review interface channels cautious shift productively by providing a structured checklist, risk labels, and domain-specific reviewer requirements. This ensures caution is applied where it matters (security) rather than uniformly.',
        principle:
          'Guide group caution toward specific risk areas rather than blanket conservatism',
      },
    ],

    bad: [
      {
        title: 'Approval Chain for Everything',
        description:
          'Requiring multi-person approval for trivial changes',
        code: `<!-- DON'T DO THIS -->
<div class="approval-required">
  <h3>Update button color: blue to blue-500</h3>
  <div class="risk-badge">Standard — 3 approvals required</div>
  <p>Pending approval from:</p>
  <ul>
    <li>Engineering Lead — Pending (2 days)</li>
    <li>Design Lead — Pending (3 days)</li>
    <li>Product Manager — Pending (5 days)</li>
  </ul>
  <p class="warning">Cannot merge until all 3 approve</p>
</div>`,
        explanation:
          'Requiring three approvals for a trivial CSS change creates unnecessary bottlenecks. Cautious shift compounds across approvers, and each person hesitates to be the first to approve a change they consider beneath their review threshold. The result is multi-day delays for zero-risk work.',
        principle:
          'Never apply high-stakes approval workflows to low-stakes decisions',
      },
      {
        title: 'Anonymous Group Veto',
        description:
          'Allowing any anonymous group member to block without accountability',
        code: `<!-- DON'T DO THIS -->
<div class="approval-status">
  <h3>Feature Launch: New onboarding flow</h3>
  <p>5 of 6 stakeholders approved</p>
  <p class="blocked">BLOCKED — 1 anonymous objection</p>
  <p class="note">Objector identity hidden for psychological safety</p>
  <button disabled>Launch (blocked)</button>
</div>`,
        explanation:
          'Anonymous blocking amplifies cautious shift without accountability. A single person can indefinitely block group decisions without having to justify their position or engage in constructive dialogue. This creates a culture of veto-driven paralysis.',
        principle:
          'Group caution requires transparency and accountability to be constructive',
      },
      {
        title: 'No Emergency Override',
        description:
          'Multi-approval workflow with no mechanism for urgent bypass',
        code: `<!-- DON'T DO THIS -->
<div class="incident-response">
  <h3>CRITICAL: Production database at 98% capacity</h3>
  <div class="alert">Service degradation in progress</div>

  <div class="action-required">
    <p>Scale database cluster</p>
    <p class="blocked">Requires approval from 3 infrastructure leads</p>
    <p>Currently approved: 1 of 3</p>
    <p>Next reviewer online in: 6 hours (different timezone)</p>
  </div>

  <button disabled>Scale Database (2 more approvals needed)</button>
</div>`,
        explanation:
          'Applying standard multi-approval workflows to emergency situations can cause catastrophic delays. Cautious shift is counterproductive when the cost of inaction exceeds the cost of a wrong action.',
        principle:
          'Always provide emergency override mechanisms for time-critical situations',
      },
    ],

    realWorld: [
      {
        company: 'GitHub',
        product: 'Branch Protection Rules',
        description: 'GitHub allows repository owners to require pull request reviews from one or more designated reviewers before merging. Teams can enforce required reviews from code owners for specific file paths, channeling cautious shift to critical areas like security, infrastructure, and API contracts.',
        effectiveness: 'very-effective',
        analysis: 'By making review requirements configurable per branch and path, GitHub lets teams calibrate cautious shift to match actual risk. This prevents both under-review of critical changes and over-review of trivial ones.',
      },
      {
        company: 'Fireblocks',
        product: 'Multi-Sig Crypto Wallets',
        description: 'Cryptocurrency custody platforms like Fireblocks require multiple private key holders to sign transactions above configurable thresholds. A $10 transfer might need one signature, while a $1M transfer requires 3-of-5 key holders to approve.',
        effectiveness: 'very-effective',
        analysis: 'Threshold-based multi-signature schemes are a direct application of cautious shift as a security mechanism. The group consensus requirement scales proportionally with the value at risk, preventing both single-point-of-failure theft and unnecessary friction on small transactions.',
      },
      {
        company: 'Stripe',
        product: 'Team Approval for API Key Rotation',
        description: 'Stripe requires team-level approval before rotating production API keys, ensuring that key changes are coordinated across integrations and do not inadvertently break live payment flows.',
        effectiveness: 'effective',
        analysis: 'The approval requirement harnesses cautious shift to prevent uncoordinated changes to critical authentication credentials. The group review ensures all downstream dependencies are accounted for before the change executes.',
      },
      {
        company: 'Google',
        product: 'Launch Review (LRC)',
        description: 'Google uses a formal Launch Review Committee process for significant product launches. Multiple stakeholders from engineering, legal, privacy, and security must sign off before a product ships to users. The process has been credited with catching significant issues but also criticized for slowing velocity.',
        effectiveness: 'effective',
        analysis: 'Google LRC demonstrates both the benefit and cost of cautious shift at scale. The group review catches issues that individual reviewers miss, but the multi-stakeholder requirement can delay launches by weeks when any single reviewer raises concerns.',
      },
    ],

    abTests: [
      {
        title: 'Single Approver vs Dual Approver for Deployments',
        hypothesis:
          'Requiring two approvers for production deployments will reduce incident rate without significantly slowing deployment velocity',
        controlVersion: {
          description:
            'Single approver required for all production deployments, with automated test suite',
          metrics: {
            conversionRate: '94% approval rate',
            timeOnPage: 'Average approval time: 18 min',
            scrollDepth: 'Incident rate: 2.3 per 100 deploys',
          },
        },
        treatmentVersion: {
          description:
            'Two approvers required for production deployments, with automated test suite and risk classification',
          metrics: {
            conversionRate: '89% approval rate',
            timeOnPage: 'Average approval time: 47 min',
            scrollDepth: 'Incident rate: 0.8 per 100 deploys',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Dual approval reduced production incidents by 65% while increasing average approval time by 29 minutes. The cautious shift effect meant that each reviewer caught different classes of issues, and the group was more likely to request staging validation.',
          learnings: [
            'Second reviewers caught 34% of issues that first reviewers missed',
            'Approval time increase was less than expected due to parallel review',
            'Risk classification helped reduce dual-approval overhead for low-risk changes',
            'Teams with dual approval developed stronger review cultures over time',
          ],
        },
      },
      {
        title: 'Consensus Required vs Majority Rules for Feature Flags',
        hypothesis:
          'Majority approval (rather than full consensus) for feature flag changes will maintain safety while improving velocity',
        controlVersion: {
          description:
            'Full consensus (3/3 team leads) required to enable feature flags in production',
          metrics: {
            conversionRate: 'Average flag enable time: 3.2 days',
            clickThroughRate: 'Flag rollback rate: 1.2%',
          },
        },
        treatmentVersion: {
          description:
            'Majority approval (2/3 team leads) required, with 24h cool-down and auto-rollback capability',
          metrics: {
            conversionRate: 'Average flag enable time: 0.8 days',
            clickThroughRate: 'Flag rollback rate: 1.8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Majority approval reduced flag enable time by 75% with only a marginal increase in rollback rate. The full consensus model suffered from extreme cautious shift where a single hesitant reviewer could block the entire team.',
          learnings: [
            'Full consensus amplifies cautious shift to the most risk-averse member',
            'Majority approval preserved most safety benefits while unblocking velocity',
            'Auto-rollback capability reduced reviewer anxiety about approving',
            'The 24h cool-down period provided a natural checkpoint without adding approvers',
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
        name: 'Multi-Approval Indicators',
        description: 'Multiple approval slots, signature lines, or review checkboxes',
        howToSpot: 'Look for approval chains showing multiple named reviewers with individual status indicators',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Consensus Progress Bars',
        description: 'Visual indicators showing progress toward group agreement (e.g., 2/3 approved)',
        howToSpot: 'Look for fractional approval counts, progress indicators, or quorum status displays',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Blocking Status Indicators',
        description: 'Red or amber states showing that an action is blocked pending additional approval',
        howToSpot: 'Look for disabled action buttons with explanatory text about missing approvals',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Risk Classification Labels',
        description: 'Badges or labels categorizing actions by risk level to determine approval requirements',
        howToSpot: 'Look for "Critical", "High Risk", "Low Risk" labels that map to different approval thresholds',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Tiered Approval Pattern',
        description: 'Different approval requirements based on action risk level or impact scope',
        indicators: [
          'Risk classification determining number of required approvers',
          'Threshold-based escalation (e.g., amount > $50K requires additional sign-off)',
          'Domain-specific reviewers required for certain file paths or systems',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Sequential Gate Pattern',
        description: 'Actions must pass through multiple review stages in sequence',
        indicators: [
          'Pipeline-style workflows with stage gates',
          'Each stage requires different reviewer or team sign-off',
          'Progression blocked until current stage is approved',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Consensus Requirement Pattern',
        description: 'All or majority of designated group members must agree before proceeding',
        indicators: [
          'Quorum requirements for decisions',
          'Voting or polling interfaces',
          'Unanimous or majority approval thresholds',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Peer Review Pattern',
        description: 'Mandatory review by one or more peers before an action is finalized',
        indicators: [
          'Code review requirements on pull requests',
          'Document review workflows with tracked changes',
          'Design review checkpoints in project timelines',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the workflow require multiple people to approve before an action can proceed?',
      'Are approval requirements scaled to match the risk level of the action?',
      'Is there an emergency override mechanism for time-critical situations?',
      'Can a single dissenter block the entire group from proceeding?',
      'Are approvers identified by name with clear accountability?',
      'Is there an SLA or deadline on approval decisions to prevent indefinite delays?',
      'Do low-risk actions have appropriately lightweight approval processes?',
      'Are reviewers given sufficient context to make informed approval decisions?',
      'Is there a mechanism to resolve disagreement among approvers?',
      'Does the approval workflow distinguish between blocking and advisory reviews?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in cautious shift and group polarization.

Analyze the provided design for cautious shift patterns. Identify:

1. **Group Approval Workflows**: Multi-person sign-off, consensus requirements, review chains
2. **Risk Classification**: How actions are categorized by risk level and mapped to approval depth
3. **Blocking Mechanisms**: How individual or group dissent prevents action
4. **Decision Velocity**: Whether group caution creates appropriate or excessive friction
5. **Emergency Overrides**: Whether time-critical situations have bypass mechanisms

For each pattern found:
- Identify the group decision mechanism and its participants
- Assess whether the caution level is proportional to actual risk
- Determine if the workflow creates productive safety or counterproductive paralysis
- Evaluate whether accountability is clear and transparent
- Suggest improvements for balancing safety and velocity

Consider:
- Is the approval depth proportional to the actual risk of the action?
- Can a single person block the group unnecessarily?
- Are there emergency override mechanisms for time-critical decisions?
- Does the workflow create approval fatigue for low-risk actions?
- Are reviewers given adequate context to make informed decisions?

Provide actionable recommendations for harnessing cautious shift productively.`,

    outputSchema: {
      type: 'object',
      properties: {
        cautiousShiftPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              groupSize: { type: 'number' },
              approvalThreshold: { type: 'string' },
              riskProportionality: { type: 'string' },
              velocityImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'riskProportionality',
              'velocityImpact',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            cautionLevel: { type: 'number' },
            velocityScore: { type: 'number' },
            riskAlignment: { type: 'number' },
            accountabilityScore: { type: 'number' },
          },
          required: [
            'cautionLevel',
            'velocityScore',
            'riskAlignment',
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
        'cautiousShiftPatterns',
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
        title: 'Classify Action Risk Levels',
        description:
          'Categorize all actions in your system by their risk level and potential impact',
        example:
          'Low: UI tweaks, copy changes. Medium: feature flags, config changes. High: production deploys, data migrations. Critical: security credentials, financial transactions.',
        tips: [
          'Base classification on reversibility, blast radius, and consequence severity',
          'Automate risk classification where possible (e.g., file paths, transaction amounts)',
          'Review and update classifications as the system evolves',
        ],
      },
      {
        step: 2,
        title: 'Map Approval Requirements to Risk',
        description:
          'Define how many approvers are required at each risk level',
        example:
          'Low: self-serve. Medium: 1 reviewer. High: 2 reviewers. Critical: 2 reviewers + domain expert.',
        tips: [
          'Fewer approvers for lower risk to prevent approval fatigue',
          'Require domain-specific reviewers for specialized risk areas',
          'Consider parallel vs sequential review based on urgency',
        ],
      },
      {
        step: 3,
        title: 'Design the Approval Interface',
        description:
          'Build clear, low-friction approval workflows with adequate context for reviewers',
        example:
          'Show change summary, risk classification, impact scope, rollback plan, and approval status in a single view',
        tips: [
          'Provide one-click approve/reject with optional comments',
          'Show what changed and why, not just what needs approval',
          'Display risk context so reviewers can calibrate their caution',
        ],
      },
      {
        step: 4,
        title: 'Add SLA Timers and Escalation',
        description:
          'Set time limits on approval decisions with automatic escalation paths',
        example:
          'Approval SLA of 2 hours for high-risk changes; auto-escalate to backup reviewer after timeout',
        tips: [
          'Make SLA visible to both requester and reviewer',
          'Auto-notify reviewers as deadline approaches',
          'Designate backup approvers for timezone coverage',
        ],
      },
      {
        step: 5,
        title: 'Build Emergency Override Mechanisms',
        description:
          'Create bypass paths for time-critical situations with post-action audit',
        example:
          'Break-glass procedure: single authorized person can override multi-approval with mandatory post-incident review',
        tips: [
          'Log all override actions with full audit trail',
          'Require post-action review of all overrides',
          'Limit override authority to designated incident commanders',
        ],
      },
    ],

    dos: [
      'Scale approval requirements proportionally to action risk level',
      'Provide clear context and change summaries to reviewers',
      'Set SLA timers on approval decisions to prevent indefinite delays',
      'Build emergency override mechanisms for time-critical situations',
      'Make individual approver identity and decisions transparent',
      'Allow self-serve for genuinely low-risk actions',
      'Provide rollback information to reduce reviewer anxiety',
      'Track approval metrics to identify bottlenecks and optimize',
    ],

    donts: [
      'Don\'t require the same approval depth for all actions regardless of risk',
      'Don\'t allow anonymous blocking without accountability',
      'Don\'t design approval workflows without emergency bypass mechanisms',
      'Don\'t let approval requests sit indefinitely without escalation',
      'Don\'t require full consensus when majority agreement is sufficient',
      'Don\'t apply group approval to creative or exploratory work',
      'Don\'t hide the risk classification from reviewers',
      'Don\'t create approval chains longer than three stages',
    ],

    bestPractices: [
      {
        title: 'Risk-Proportional Approval Depth',
        description:
          'Automatically determine required approvers based on the classified risk level of the action',
        rationale:
          'Prevents both under-review of critical changes and over-review of trivial ones',
        example:
          'Payment logic changes require security + backend lead approval; CSS changes are self-serve',
      },
      {
        title: 'Parallel Review with Aggregation',
        description:
          'Allow multiple reviewers to review simultaneously rather than sequentially',
        rationale:
          'Sequential review compounds delay; parallel review maintains safety while preserving velocity',
        example:
          'All three required reviewers are notified simultaneously and can approve in any order',
      },
      {
        title: 'Contextual Decision Support',
        description:
          'Provide reviewers with relevant historical data, risk analysis, and rollback plans',
        rationale:
          'Informed reviewers make faster, better decisions with appropriate (not excessive) caution',
        example:
          'Show: "Similar changes deployed 12 times in past month with 0 incidents. Auto-rollback enabled."',
      },
      {
        title: 'Approval Metrics Dashboard',
        description:
          'Track approval times, bottlenecks, override frequency, and incident correlation',
        rationale:
          'Data-driven optimization of approval workflows prevents both under- and over-caution',
        example:
          'Dashboard showing median approval time by risk level, reviewer response times, and post-deploy incident rates',
      },
      {
        title: 'Distinguish Blocking from Advisory Reviews',
        description:
          'Separate mandatory blocking reviews from optional advisory feedback',
        rationale:
          'Not all reviewer input needs to block progress; advisory reviews add value without creating bottlenecks',
        example:
          'Security review is blocking; UX review is advisory with 48h comment window',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Approval states must be conveyed semantically, not just visually',
        implementation:
          'Use ARIA live regions to announce approval state changes. Ensure status indicators have text equivalents beyond color coding.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Risk levels and approval states must not rely solely on color',
        implementation:
          'Combine color with icons, text labels, and patterns. Use "Approved" text alongside green checkmark, "Blocked" text alongside red indicator.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All approval actions must be keyboard accessible',
        implementation:
          'Ensure approve, reject, escalate, and comment actions are reachable via keyboard navigation with clear focus indicators.',
      },
    ],

    ethics: [
      {
        concern: 'Decision Paralysis',
        severity: 'high',
        explanation:
          'Excessive approval requirements can paralyze teams and prevent beneficial actions from proceeding',
        mitigation:
          'Implement risk-proportional approval with SLA timers and escalation paths. Regularly audit whether approval depth matches actual risk.',
      },
      {
        concern: 'Accountability Diffusion',
        severity: 'high',
        explanation:
          'When everyone must approve, no one feels individually responsible for the decision outcome',
        mitigation:
          'Assign clear ownership with named final decision-makers. Make approval history transparent and auditable.',
      },
      {
        concern: 'Minority Veto Power',
        severity: 'medium',
        explanation:
          'Consensus requirements give disproportionate power to the most cautious member, who can block the group',
        mitigation:
          'Use majority approval rather than unanimous consent. Provide escalation mechanisms for resolving disagreement.',
      },
      {
        concern: 'Innovation Suppression',
        severity: 'medium',
        explanation:
          'Overly cautious group review processes can prevent bold, innovative ideas from advancing',
        mitigation:
          'Exempt experimental and exploratory work from full approval workflows. Use staged rollouts with post-launch review instead.',
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
          'The foundational master\'s thesis that first documented choice shift in groups, sparking decades of group polarization research',
        type: 'foundational',
      },
      {
        title: 'The Group Polarization Phenomenon',
        author: 'Myers, D. G., & Lamm, H.',
        year: 1976,
        doi: '10.1037/0033-2909.83.4.602',
        description:
          'Comprehensive review establishing that groups polarize toward both risk and caution depending on initial group tendency and stake visibility',
        type: 'foundational',
      },
      {
        title: 'Group Polarization: A Critical Review and Meta-Analysis',
        author: 'Isenberg, D. J.',
        year: 1986,
        doi: '10.1037/0022-3514.50.6.1141',
        description:
          'Meta-analysis confirming group polarization effects including cautious shift across diverse experimental paradigms',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Group Dynamics',
        author: 'Forsyth, Donelson R.',
        year: 2018,
        isbn: '9781337408851',
        description:
          'Comprehensive textbook covering group polarization, choice shift, and cautious shift in organizational and social contexts',
        type: 'foundational',
      },
      {
        title: 'Wiser: Getting Beyond Groupthink to Make Groups Smarter',
        author: 'Sunstein, Cass R., & Hastie, Reid',
        year: 2015,
        isbn: '9781422122990',
        description:
          'Practical analysis of how groups can make better decisions, including managing cautious and risky shift tendencies',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How Group Dynamics Affect Decisions',
        author: 'Harvard Business Review',
        url: 'https://hbr.org/topic/decision-making',
        description:
          'Practical guides on managing group decision-making dynamics in organizational settings',
        type: 'practical',
      },
    ],

    videos: [],

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
      'loss-aversion',
    ],

    conflicts: [
      'risky-shift',
      'overconfidence-bias',
    ],

    confusedWith: [
      'groupthink',
      'risky-shift',
      'status-quo-bias',
    ],

    hierarchy: {
      parent: 'group-polarization',
      children: [
        'approval-chain-effect',
        'consensus-conservatism',
      ],
    },
  },
};
