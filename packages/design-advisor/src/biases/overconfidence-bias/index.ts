/**
 * OVERCONFIDENCE BIAS
 *
 * We overestimate our knowledge, abilities, and predictions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const overconfidenceBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'overconfidence-bias',
    name: 'Overconfidence Bias',
    aliases: [],
    category: BiasCategory.COGNITIVE,
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
    simple: 'We overestimate our knowledge, abilities, and predictions',

    detailed: `Overconfidence Bias is a systematic tendency for people to be more confident in their own abilities, knowledge, and predictions than objective accuracy warrants. It manifests in three primary forms: overestimation (thinking you perform better than you do), overplacement (thinking you are better than others), and overprecision (excessive certainty that your beliefs are correct).

This bias is pervasive across domains — from financial trading to medical diagnosis to software development. People consistently rate their confidence higher than their accuracy. When asked questions and then asked how sure they are, people who say they are "99% certain" are wrong roughly 40% of the time.

In UX and product design, overconfidence bias means users will skip safety warnings, override guardrails, dismiss confirmation dialogs without reading them, and attempt complex operations beyond their skill level. Designers must build appropriate friction, calibration feedback, and progressive permission systems that protect overconfident users from costly mistakes without patronizing experienced ones.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Overconfidence arises from several converging cognitive mechanisms:

1. **Confirmation Bias Feedback Loop**: People selectively seek and remember evidence that confirms their existing beliefs, inflating their sense of being right
2. **Illusion of Knowledge**: The mere familiarity with a domain creates a false sense of deep understanding — knowing terminology is mistaken for knowing mechanics
3. **Insufficient Consideration of Alternatives**: People generate one hypothesis and fail to adequately consider how likely competing explanations might be
4. **Calibration Failure**: The internal "confidence meter" is poorly calibrated — subjective certainty does not track objective accuracy
5. **Self-Serving Attribution**: Successes are attributed to skill while failures are attributed to bad luck, gradually inflating confidence over time

The mechanism is automatic and self-reinforcing — each unchallenged overconfident decision strengthens the belief that one's judgment is reliable.`,
    },

    realWorldExample: `In a landmark study by Lichtenstein, Fischhoff, and Phillips (1982), participants answered general-knowledge questions and rated their confidence in each answer. When participants said they were "100% certain," they were wrong approximately 20% of the time. At the "90% confident" level, error rates were around 40-50%. This miscalibration between confidence and accuracy is one of the most robust findings in cognitive psychology and has been replicated across cultures, expertise levels, and domains.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Overconfidence Bias profoundly affects how users interact with interfaces, especially around dangerous or irreversible actions. Users routinely believe they understand systems better than they do, skip safety warnings, and override protective guardrails. Designers must account for this by:

- Building confirmation dialogs for irreversible actions that demand genuine engagement
- Implementing progressive permission escalation for complex or risky operations
- Adding confidence calibration feedback to prediction and estimation tools
- Designing appropriate friction that slows overconfident users without blocking competent ones
- Creating skill-based interfaces that reveal complexity gradually`,

    whenToUse: [
      {
        title: 'Irreversible Action Confirmation',
        scenario:
          'When users are about to perform destructive or irreversible operations',
        example:
          'Require typing the resource name to confirm deletion, preventing reflexive "yes" clicking from overconfident users',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Confidence Calibration in Predictions',
        scenario: 'When users make forecasts, estimates, or predictions within the product',
        example:
          'Show a calibration chart comparing users\' past confidence ratings against actual outcomes, helping them see where certainty exceeds accuracy',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Progressive Permission Escalation',
        scenario: 'When users access increasingly powerful or risky features',
        example:
          'Require users to complete a walkthrough of consequences before granting access to bulk operations, force-push, or admin-level changes',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Safety Check Friction',
        scenario: 'When users are about to bypass established safety guardrails',
        example:
          'Add a brief "cooling off" delay or multi-step confirmation before allowing users to disable security features like 2FA or firewall rules',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Skill-Based Interface Disclosure',
        scenario: 'When novice users attempt expert-level operations',
        example:
          'Show contextual warnings when a user with limited history attempts an advanced configuration, offering guided alternatives',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Expert Power-User Workflows',
        reason:
          'Excessive friction frustrates genuinely expert users who know what they are doing',
        consequence:
          'Power users abandon the product for tools that respect their competence',
        alternative:
          'Use progressive disclosure: light friction by default, with an "expert mode" that reduces confirmations after demonstrated competence',
      },
      {
        title: 'Low-Stakes Reversible Actions',
        reason:
          'Adding overconfidence guardrails to trivial, easily undoable actions wastes user time',
        consequence:
          'Users develop "confirmation fatigue" and stop reading any warnings at all',
        alternative:
          'Reserve friction for truly irreversible or high-impact actions; use undo instead of confirm for low-stakes changes',
      },
      {
        title: 'Time-Critical Emergency Interfaces',
        reason:
          'In genuine emergencies, slowing users down with calibration checks can cause harm',
        consequence:
          'Delayed action in urgent situations (e.g., emergency shutdowns, security incident response)',
        alternative:
          'Provide rapid-action paths with post-action review and audit trails instead of pre-action friction',
      },
      {
        title: 'Accessibility-Sensitive Contexts',
        reason:
          'Complex confirmation patterns (typing to confirm, multi-step flows) can be barriers for users with motor or cognitive disabilities',
        consequence:
          'Excluding users who cannot complete complex confirmation interactions',
        alternative:
          'Offer multiple confirmation methods and ensure all friction patterns are keyboard-accessible and screen-reader compatible',
      },
    ],

    commonMistakes: [
      {
        title: 'Dismissible Warning Dialogs',
        description:
          'Using generic "Are you sure?" dialogs that users click through reflexively without reading',
        why: 'Overconfident users develop muscle memory for dismissing standard confirmation patterns without engaging with the content',
        fix: 'Require active engagement: type the resource name, select the specific consequence from a list, or wait a brief delay before the confirm button becomes active',
      },
      {
        title: 'Letting Users Disable All Safety Checks',
        description:
          'Providing a single toggle to disable all warnings and confirmations permanently',
        why: 'Users overestimate their ability to operate safely without guardrails; one bad outcome can be catastrophic',
        fix: 'Allow granular suppression of specific warnings, with periodic re-confirmation for critical safety checks',
      },
      {
        title: 'Hiding Complexity Behind Simple Controls',
        description:
          'Making dangerous operations look as simple as routine ones (e.g., a single "Deploy" button with no visibility into what changes)',
        why: 'Users who cannot see the complexity will not respect it, leading to overconfident actions with unseen consequences',
        fix: 'Show a summary of what will happen before execution: files changed, services affected, users impacted',
      },
      {
        title: 'Uniform Friction Regardless of Risk',
        description:
          'Applying the same confirmation level to renaming a file and deleting an entire database',
        why: 'When everything has the same warning level, users learn to ignore all warnings equally',
        fix: 'Scale friction to consequence: no confirmation for undo-able actions, light confirmation for moderate actions, heavy friction for irreversible ones',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently safety information and confirmation flows are presented',
        examples: [
          'Confirmation dialogs that interrupt workflow demand attention for irreversible actions',
          'Inline warnings placed directly adjacent to dangerous controls are more effective than distant banners',
          'Progressive disclosure layouts reveal complexity as users go deeper, preventing overconfident leaps',
          'Placing consequence summaries above action buttons forces users to see impact before confirming',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography signals severity and demands appropriate attention for safety-critical information',
        examples: [
          'Bold, larger text for irreversible consequences increases the chance users actually read warnings',
          'Monospace or code-style text for resource names being deleted makes the target concrete',
          'Subdued typography on dangerous action buttons (vs. prominent "Cancel") inverts the default choice',
          'Clear, scannable bullet points for consequences are read more than paragraph-format warnings',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals danger levels and helps overconfident users pause before acting',
        examples: [
          'Red/destructive color on delete buttons signals irreversibility',
          'Yellow/amber for warnings that users might bypass helps differentiate from routine actions',
          'Muted/disabled appearance for dangerous actions until prerequisites are met',
          'Color-coded risk levels (green/yellow/red) on operation summaries help users gauge severity',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns are the primary defense against overconfident actions',
        examples: [
          'Type-to-confirm patterns (e.g., "type DELETE to confirm") prevent reflexive clicking',
          'Delayed activation of confirm buttons forces a pause for reflection',
          'Multi-step confirmation flows for high-impact operations proportional to risk',
          'Undo mechanisms as safety nets when pre-action friction is insufficient',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content determines whether users understand what they are about to do and its consequences',
        examples: [
          'Specific consequence descriptions ("This will permanently delete 1,247 customer records") vs. generic warnings',
          'Showing who else will be affected by the action reduces self-focused overconfidence',
          'Displaying historical data about mistake frequency calibrates user expectations',
          'Plain-language summaries of technical operations help users assess their actual understanding',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Confirmation and friction patterns must be accessible to all users regardless of ability',
        examples: [
          'Type-to-confirm fields must support screen readers with clear labels explaining what to type and why',
          'Timed delays must not disadvantage users with motor impairments; provide alternative confirmation methods',
          'Color-coded risk signals must include text labels and icons for colorblind users',
          'Multi-step confirmation flows must be keyboard-navigable with clear focus management',
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
        title: 'Type-to-Confirm Deletion',
        description:
          'Cloud platform requiring users to type the resource name before irreversible deletion',
        code: `<dialog class="delete-confirmation">
  <h3>Delete Production Database?</h3>
  <div class="consequence-summary">
    <p class="warning">This action is <strong>permanent and irreversible</strong>.</p>
    <ul>
      <li>1,247 customer records will be permanently deleted</li>
      <li>All associated backups will be removed in 30 days</li>
      <li>3 dependent services will lose their data source</li>
    </ul>
  </div>
  <label for="confirm-input">
    Type <code>prod-customers-db</code> to confirm deletion:
  </label>
  <input id="confirm-input" type="text" placeholder="prod-customers-db" autocomplete="off">
  <div class="actions">
    <button class="secondary">Cancel</button>
    <button class="danger" disabled>Delete Forever</button>
  </div>
</dialog>`,
        explanation:
          'Requiring users to type the specific resource name defeats reflexive confirmation clicking. It forces the user to engage with exactly what they are deleting, countering the overconfident assumption that "I know what I\'m doing."',
        principle:
          'Active engagement confirmation prevents overconfident reflexive actions on irreversible operations',
        metrics: {
          before: '4.2% of deletions were accidental (generic "Are you sure?" dialog)',
          after: '0.3% of deletions were accidental (type-to-confirm)',
          improvement: '93% reduction in accidental deletions',
        },
      },
      {
        title: 'Confidence Calibration Dashboard',
        description:
          'Prediction platform showing users how their confidence compares to their actual accuracy',
        code: `<section class="calibration-dashboard">
  <h3>Your Prediction Calibration</h3>
  <div class="calibration-chart">
    <div class="axis-label">Perfect calibration (dotted line)</div>
    <div class="calibration-row">
      <span class="confidence-label">90% confident</span>
      <div class="bar" style="width: 62%">
        <span class="actual">62% correct</span>
      </div>
      <span class="gap overconfident">28% overconfident</span>
    </div>
    <div class="calibration-row">
      <span class="confidence-label">70% confident</span>
      <div class="bar" style="width: 58%">
        <span class="actual">58% correct</span>
      </div>
      <span class="gap overconfident">12% overconfident</span>
    </div>
    <div class="calibration-row">
      <span class="confidence-label">50% confident</span>
      <div class="bar" style="width: 51%">
        <span class="actual">51% correct</span>
      </div>
      <span class="gap calibrated">Well calibrated</span>
    </div>
  </div>
  <p class="insight">Your high-confidence predictions tend to be overconfident.
  Consider widening your uncertainty ranges.</p>
</section>`,
        explanation:
          'Showing users their actual calibration data — how often they were right when they said they were confident — provides concrete feedback that counters the illusion of knowledge. Over time, this feedback loop improves calibration.',
        principle:
          'Feedback on calibration accuracy trains users to align confidence with actual knowledge',
        metrics: {
          before: 'Average overconfidence gap: 28% (users 90% sure, 62% correct)',
          after: 'Average overconfidence gap: 12% after 3 months of calibration feedback',
          improvement: '57% reduction in overconfidence gap',
        },
      },
      {
        title: 'Progressive Permission Escalation',
        description:
          'Git hosting platform requiring acknowledgment before allowing force-push',
        code: `<dialog class="force-push-warning">
  <h3>Force Push to <code>main</code></h3>
  <div class="risk-assessment">
    <span class="risk-badge critical">HIGH RISK</span>
    <p>Force-pushing rewrites shared history. This will affect:</p>
    <ul>
      <li><strong>4 team members</strong> with local checkouts of main</li>
      <li><strong>2 open pull requests</strong> targeting main</li>
      <li><strong>CI/CD pipeline</strong> currently running on commit abc1234</li>
    </ul>
  </div>
  <div class="alternative-suggestion">
    <h4>Safer alternative:</h4>
    <code>git revert abc1234 && git push</code>
    <p>This preserves history and won't break teammates' work.</p>
  </div>
  <label>
    <input type="checkbox"> I understand this will rewrite shared history
  </label>
  <label>
    <input type="checkbox"> I have notified affected team members
  </label>
  <div class="actions">
    <button class="primary">Use Safe Revert Instead</button>
    <button class="danger" disabled>Force Push Anyway</button>
  </div>
</dialog>`,
        explanation:
          'Instead of simply allowing or blocking the force push, this pattern shows the specific impact, offers a safer alternative, and requires explicit acknowledgment of consequences. The "Force Push Anyway" button stays disabled until all checkboxes are checked.',
        principle:
          'Showing specific impact and safer alternatives gives overconfident users concrete reasons to reconsider',
      },
    ],

    bad: [
      {
        title: 'Generic "Are You Sure?" Dialog',
        description:
          'Using a vague confirmation dialog for a destructive action',
        code: `<!-- DON'T DO THIS -->
<dialog class="confirm-dialog">
  <p>Are you sure?</p>
  <div class="actions">
    <button class="secondary">No</button>
    <button class="primary">Yes</button>
  </div>
</dialog>`,
        explanation:
          'Generic confirmation dialogs provide zero friction against overconfidence. Users click "Yes" reflexively without even reading the text. The dialog tells them nothing about what they are confirming or what the consequences are.',
        principle:
          'Vague confirmations are invisible to overconfident users — they add a click without adding thought',
      },
      {
        title: 'One-Click Disable for All Safety Warnings',
        description:
          'Letting users permanently disable all confirmation dialogs at once',
        code: `<!-- DON'T DO THIS -->
<div class="settings">
  <label>
    <input type="checkbox" id="disable-warnings">
    Don't show warnings again
  </label>
  <p class="hint">You can always re-enable from Settings.</p>
</div>`,
        explanation:
          'Allowing users to disable all warnings with a single checkbox caters directly to overconfidence bias. Users disable warnings after one or two successful operations, then eventually make a costly mistake with no guardrail in place.',
        principle:
          'Never let users remove all safety nets — overconfidence grows with each successful bypass',
      },
      {
        title: 'Hidden Complexity Behind Simple Button',
        description:
          'Making a dangerous bulk operation look as simple as a routine action',
        code: `<!-- DON'T DO THIS -->
<div class="admin-panel">
  <h3>User Management</h3>
  <p>247 users selected</p>
  <button class="primary">Delete Users</button>
  <!-- No summary of consequences, no confirmation,
       no mention of associated data that will be lost -->
</div>`,
        explanation:
          'Deleting 247 user accounts is presented with the same visual weight as any other button click. There is no indication of what data will be lost, what downstream effects will occur, or any opportunity for the user to reconsider. Overconfident admins will click without realizing the full scope.',
        principle:
          'Dangerous operations must look dangerous — visual simplicity should not mask consequence severity',
      },
    ],

    realWorld: [
      {
        company: 'AWS',
        product: 'Resource Deletion',
        url: 'https://aws.amazon.com/console/',
        description: 'AWS requires users to type "delete" or the resource name to confirm deletion of critical infrastructure like S3 buckets, EC2 instances, and CloudFormation stacks. Some resources additionally require typing "permanently delete" when the action cannot be undone.',
        effectiveness: 'very-effective',
        analysis: 'Type-to-confirm is one of the strongest patterns against overconfidence bias. It transforms a reflexive click into an intentional act. AWS\'s layered approach — simple confirm for recoverable deletions, type-to-confirm for permanent ones — scales friction appropriately to consequence.',
      },
      {
        company: 'GitHub',
        product: 'Repository and Branch Protection',
        url: 'https://github.com',
        description: 'GitHub requires typing the full repository name (owner/repo) to confirm repository deletion. Force-push to protected branches requires admin override. Branch protection rules prevent overconfident developers from pushing directly to main.',
        effectiveness: 'very-effective',
        analysis: 'GitHub combines multiple anti-overconfidence patterns: type-to-confirm for deletion, permission escalation for dangerous git operations, and preemptive protection rules that prevent mistakes before they happen.',
      },
      {
        company: 'WordPress',
        product: 'Admin Actions',
        url: 'https://wordpress.org',
        description: 'WordPress uses a "Trash" intermediate state before permanent deletion, requires re-entering password for critical admin changes, and shows a 30-day recovery window for deleted content. Plugin deactivation shows dependency warnings.',
        effectiveness: 'effective',
        analysis: 'The "Trash" pattern is an elegant anti-overconfidence mechanism: it lets users act quickly while providing a safety net. The 30-day window acknowledges that overconfident deletions often are not noticed until days later.',
      },
      {
        company: 'Robinhood',
        product: 'Trading Risk Warnings',
        url: 'https://robinhood.com',
        description: 'Robinhood shows risk warnings for options trading, requires users to demonstrate knowledge before accessing margin trading, and displays profit/loss scenarios. After regulatory pressure, they added multi-step confirmations for risky trades.',
        effectiveness: 'somewhat-effective',
        analysis: 'Trading platforms face extreme overconfidence bias — novice traders consistently overestimate their skill. Robinhood\'s progressive disclosure of risk features is good, but the gamified UI elements can counteract the friction by making trading feel casual.',
      },
    ],

    abTests: [
      {
        title: 'Delete Confirmation: Generic Dialog vs Type-to-Confirm',
        hypothesis:
          'Type-to-confirm will significantly reduce accidental deletions compared to a standard "Are you sure?" dialog',
        controlVersion: {
          description:
            'Standard modal dialog: "Are you sure you want to delete this resource?" with Yes/No buttons',
          metrics: {
            conversionRate: '95.8% clicked Yes (proceeded with deletion)',
            clickThroughRate: '4.2% accidental deletion rate (restored within 24h)',
          },
        },
        treatmentVersion: {
          description:
            'Type-to-confirm dialog showing specific resource name, consequences, and requiring exact name input before Delete button activates',
          metrics: {
            conversionRate: '87.3% completed confirmation (proceeded with deletion)',
            clickThroughRate: '0.3% accidental deletion rate (restored within 24h)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Type-to-confirm reduced accidental deletions by 93%. The 8.5% of users who abandoned the flow were largely users who realized they were about to delete the wrong resource — exactly the overconfident users the pattern is designed to catch.',
          learnings: [
            'Active engagement confirmation is dramatically more effective than passive yes/no',
            'Showing specific consequences (resource name, affected data) caused 12% of users to reconsider',
            'Users did not report frustration with the extra step for irreversible actions',
            'The pattern was less effective for frequently repeated deletions — consider "expert mode" after N confirmed deletions',
          ],
        },
      },
      {
        title: 'Calibration Feedback: With vs Without Accuracy History',
        hypothesis:
          'Showing users their historical prediction accuracy will reduce overconfidence in future predictions',
        controlVersion: {
          description:
            'Prediction input with standard confidence slider (0-100%) and no historical feedback',
          metrics: {
            conversionRate: '28% overconfidence gap (users 90% confident were 62% correct)',
            timeOnPage: '0:45 average time on prediction page',
          },
        },
        treatmentVersion: {
          description:
            'Prediction input with confidence slider plus calibration chart showing past confidence vs. accuracy, personalized to the user',
          metrics: {
            conversionRate: '12% overconfidence gap after 3 months (users 90% confident were 78% correct)',
            timeOnPage: '1:30 average time on prediction page',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Calibration feedback reduced the overconfidence gap by 57% over three months. Users spent more time on predictions, indicating deeper consideration rather than snap judgments. Accuracy actually improved — better-calibrated confidence led to better decisions.',
          learnings: [
            'Personal calibration data is more persuasive than general warnings about overconfidence',
            'Improvement was gradual — took 3+ months for significant calibration improvement',
            'Users who saw their calibration data voluntarily widened their confidence intervals',
            'The effect was strongest for users who were most overconfident initially',
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
        name: 'Weak Confirmation Patterns',
        description:
          'Generic "Are you sure?" dialogs or single-click confirmations for destructive actions',
        howToSpot:
          'Look for standard yes/no modals preceding delete, remove, or overwrite operations with no specificity about consequences',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Safety Friction',
        description:
          'Destructive or irreversible actions that have no confirmation step at all',
        howToSpot:
          'Identify actions that cannot be undone (delete, deploy, send, publish) and check whether they have any pre-action confirmation or consequence preview',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Dismissable Warning Patterns',
        description:
          'Warnings with "Don\'t show again" checkboxes or global disable toggles',
        howToSpot:
          'Check settings panels and warning dialogs for permanent dismissal options, especially for safety-critical warnings',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uncalibrated Confidence Displays',
        description:
          'User-entered confidence or certainty values displayed without any accuracy feedback',
        howToSpot:
          'Look for confidence sliders, certainty ratings, or prediction inputs that have no historical accuracy comparison',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Uniform Risk Treatment',
        description:
          'All actions — trivial and catastrophic — use the same confirmation pattern and visual weight',
        howToSpot:
          'Compare the confirmation flow for low-stakes actions (rename) vs. high-stakes actions (delete all) and check if they are identical',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Skipped Warning Pattern',
        description: 'Users bypassing or rapidly dismissing safety warnings and confirmation dialogs',
        indicators: [
          'Sub-second confirmation dialog dismissal times',
          'High click-through rate on warning modals (>95%)',
          'Users enabling "don\'t show again" options',
          'Accidental actions followed by immediate undo or support tickets',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Overridden Safety Check Pattern',
        description: 'Users systematically disabling or working around protective guardrails',
        indicators: [
          'Safety toggles set to "off" in user settings',
          'Repeated use of "skip" or "override" options',
          'Escalation requests to bypass permission controls',
          'Users copying admin commands from forums without understanding them',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Uncalibrated Confidence Display Pattern',
        description: 'User-entered confidence values that consistently exceed actual accuracy',
        indicators: [
          'Confidence ratings clustered at 80-100% regardless of domain difficulty',
          'No historical accuracy data presented alongside confidence inputs',
          'Prediction tools without calibration feedback loops',
          'Certainty expressed without consideration of alternatives',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Complexity Underestimation Pattern',
        description: 'Users attempting advanced operations without adequate preparation or understanding',
        indicators: [
          'High failure rates on first attempts at complex operations',
          'Users skipping tutorials or documentation before advanced features',
          'Support tickets from users surprised by consequences of actions they initiated',
          'Novice users immediately navigating to expert settings',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are irreversible actions protected by confirmation patterns that require genuine engagement (not just a click)?',
      'Do destructive operations show specific consequences (what exactly will be deleted/changed/affected)?',
      'Can users permanently disable safety warnings for critical actions?',
      'Is the confirmation friction proportional to the severity of the action?',
      'Do prediction or estimation tools provide calibration feedback showing past accuracy?',
      'Are complex operations visually distinguished from routine ones?',
      'Is there progressive permission escalation for increasingly risky features?',
      'Do users see who and what else will be affected by their actions?',
      'Are there undo mechanisms as safety nets for actions where pre-action friction would be excessive?',
      'Does the interface provide safer alternatives before allowing dangerous operations?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in overconfidence bias.

Analyze the provided design for overconfidence bias vulnerabilities and protective patterns. Identify:

1. **Destructive Actions**: Operations that are irreversible or high-impact, and how they are guarded
2. **Confirmation Patterns**: Whether confirmations require genuine engagement or are reflexively dismissable
3. **Safety Guardrails**: Presence and dismissability of warning systems and protective friction
4. **Confidence Calibration**: Whether user confidence inputs have accuracy feedback mechanisms
5. **Progressive Disclosure**: Whether complexity is revealed gradually or exposed all at once

For each pattern found:
- Identify whether it protects against or enables overconfident behavior
- Assess the severity of potential consequences if an overconfident user proceeds
- Determine if the friction level is proportional to the risk
- Evaluate whether the pattern is accessible and non-patronizing
- Suggest improvements for appropriate friction design

Consider:
- Can a user reflexively click through all safety mechanisms?
- Are consequences clearly described before the point of no return?
- Is there a way for users to disable all safety warnings?
- Do complex operations look appropriately complex?
- Are there undo mechanisms as safety nets?
- Is the friction calibrated to expertise level (novice vs expert)?

Provide actionable recommendations for protecting users from overconfident mistakes while respecting expert competence.`,

    outputSchema: {
      type: 'object',
      properties: {
        overconfidenceVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              action: { type: 'string' },
              consequenceSeverity: { type: 'string' },
              currentProtection: { type: 'string' },
              overconfidenceRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'action',
              'consequenceSeverity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            frictionCalibration: { type: 'number' },
            consequenceVisibility: { type: 'number' },
            safetyNetCoverage: { type: 'number' },
            expertiseAdaptation: { type: 'number' },
          },
          required: [
            'frictionCalibration',
            'consequenceVisibility',
            'safetyNetCoverage',
            'expertiseAdaptation',
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
        'overconfidenceVulnerabilities',
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
        title: 'Map Consequence Severity',
        description:
          'Identify every action in your interface and classify it by reversibility and impact severity',
        example:
          'Create a matrix: rename (low/reversible), delete record (medium/soft-delete), delete database (critical/irreversible)',
        tips: [
          'Consider downstream effects — deleting a user may cascade to their content, subscriptions, and team memberships',
          'Classify both direct consequences and indirect ones',
          'Consider time-delayed consequences that users won\'t notice immediately',
        ],
      },
      {
        step: 2,
        title: 'Design Proportional Friction',
        description:
          'Match the confirmation friction to the severity level — no friction for trivial actions, maximum friction for irreversible ones',
        example:
          'Low risk: no confirm. Medium risk: single confirm with consequence preview. High risk: type-to-confirm with consequence list. Critical: multi-step with waiting period.',
        tips: [
          'Never use the same confirmation pattern for all severity levels',
          'Users learn to ignore friction that feels disproportionate',
          'Reserve the strongest patterns for truly irreversible actions',
        ],
      },
      {
        step: 3,
        title: 'Show Specific Consequences',
        description:
          'Replace generic warnings with concrete descriptions of exactly what will happen',
        example:
          'Instead of "Are you sure?" show "This will permanently delete 1,247 records, cancel 3 active subscriptions, and remove access for 12 team members"',
        tips: [
          'Use real numbers from the current context, not generic text',
          'Mention who else will be affected',
          'Describe what cannot be recovered',
        ],
      },
      {
        step: 4,
        title: 'Offer Safer Alternatives',
        description:
          'Before allowing a dangerous action, prominently suggest a less risky way to achieve the same goal',
        example:
          'Before permanent deletion, offer archiving. Before force-push, suggest revert. Before disabling 2FA, offer recovery codes.',
        tips: [
          'Make the safe alternative the primary/default action',
          'Explain why the alternative is safer',
          'Make the dangerous option available but visually secondary',
        ],
      },
      {
        step: 5,
        title: 'Build Safety Nets',
        description:
          'For actions where pre-action friction would be excessive, provide post-action recovery mechanisms',
        example:
          'Soft-delete with 30-day recovery, undo within 10 seconds of action, automatic backups before destructive operations',
        tips: [
          'Communicate the safety net before the action ("You can undo this for 30 days")',
          'Make recovery discoverable and simple',
          'Log all destructive actions for audit trails',
        ],
      },
      {
        step: 6,
        title: 'Implement Calibration Feedback',
        description:
          'For prediction, estimation, or confidence-related features, show users how their confidence compares to their actual accuracy over time',
        example:
          'After 20+ predictions, show a calibration chart: "When you said 90% confident, you were right 65% of the time"',
        tips: [
          'Require sufficient data before showing calibration (avoid small sample conclusions)',
          'Frame calibration feedback as helpful, not judgmental',
          'Celebrate improvement in calibration over time',
        ],
      },
    ],

    dos: [
      'Scale confirmation friction proportionally to consequence severity',
      'Show specific, contextual consequences rather than generic warnings',
      'Require active engagement (type-to-confirm) for irreversible operations',
      'Offer safer alternatives prominently before allowing dangerous actions',
      'Provide undo mechanisms and recovery windows as safety nets',
      'Implement progressive permission escalation for complex features',
      'Show calibration feedback for user predictions and confidence ratings',
      'Display who and what else will be affected by an action',
      'Use visual differentiation to make dangerous operations look appropriately serious',
      'Allow expert mode with reduced friction after demonstrated competence',
    ],

    donts: [
      'Don\'t use generic "Are you sure?" dialogs for destructive actions',
      'Don\'t allow users to permanently disable all safety warnings with one toggle',
      'Don\'t apply identical confirmation patterns to trivial and catastrophic actions',
      'Don\'t hide the consequences of complex operations behind simple-looking controls',
      'Don\'t let users skip directly to expert features without demonstrated understanding',
      'Don\'t display user confidence ratings without calibration feedback',
      'Don\'t remove friction from irreversible actions just because power users complain',
      'Don\'t rely solely on documentation to prevent overconfident mistakes — build protection into the interface',
    ],

    bestPractices: [
      {
        title: 'Type-to-Confirm for Irreversible Actions',
        description:
          'Require users to type the exact name of the resource being deleted or the word "delete" before allowing irreversible operations',
        rationale:
          'This pattern breaks the reflexive click-through behavior that overconfident users exhibit with standard confirmation dialogs',
        example:
          'AWS S3 bucket deletion: "To confirm deletion, type the name of the bucket" with the Delete button disabled until input matches',
      },
      {
        title: 'Consequence Previews with Real Data',
        description:
          'Show a detailed summary of what will happen, using actual counts and names from the current context',
        rationale:
          'Generic warnings are invisible to overconfident users; specific, personal consequences demand attention',
        example:
          '"Deleting workspace \'Acme Corp\' will remove: 1,247 documents, 89 team members\' access, 12 active integrations"',
      },
      {
        title: 'Prominent Safer Alternatives',
        description:
          'Always suggest a less destructive way to achieve the user\'s goal before allowing the dangerous path',
        rationale:
          'Overconfident users often choose the most direct path without considering alternatives; presenting options forces consideration',
        example:
          'Before permanent delete, show "Archive Instead" as the primary button, with "Delete Permanently" as a secondary destructive action',
      },
      {
        title: 'Graduated Permission Systems',
        description:
          'Require users to demonstrate understanding before granting access to increasingly powerful features',
        rationale:
          'Users overestimate their readiness for complex operations; graduated access ensures genuine competence',
        example:
          'Trading platform requiring quiz completion before enabling options trading; CI/CD requiring successful test deployment before production access',
      },
      {
        title: 'Cooling-Off Periods for Critical Decisions',
        description:
          'Introduce brief delays before executing high-stakes actions, giving overconfident users time to reconsider',
        rationale:
          'The urgency of the moment amplifies overconfidence; even a 5-second delay engages reflective thinking',
        example:
          'Domain transfer: "Your transfer will begin in 5 days. You can cancel at any time before then."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) - For pages that cause legal, financial, or data consequences, submissions are reversible, checked, or confirmed',
        implementation:
          'Provide type-to-confirm with clear labels, alternative confirmation methods for motor-impaired users, and screen-reader-announced consequences before the confirm action',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to indicate danger level',
        implementation:
          'Combine red/destructive colors with text labels ("Permanently Delete"), icons (warning triangle), and semantic HTML to ensure all users perceive the danger level',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All confirmation patterns must be operable via keyboard',
        implementation:
          'Ensure type-to-confirm fields, checkboxes, and delayed-activation buttons are fully keyboard-accessible with logical tab order and visible focus indicators',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Consequence information must be communicated to assistive technology',
        implementation:
          'Use ARIA live regions to announce consequence summaries, disabled button state changes, and confirmation completion to screen readers',
      },
    ],

    ethics: [
      {
        concern: 'Weaponized Friction',
        severity: 'high',
        explanation:
          'Using overconfidence-based friction patterns to prevent users from exercising legitimate choices (e.g., making account deletion excessively difficult)',
        mitigation:
          'Apply friction proportionally to genuine risk. Legitimate user actions (closing account, exporting data, canceling subscriptions) should not be buried in excessive confirmation flows.',
      },
      {
        concern: 'Patronizing Expert Users',
        severity: 'medium',
        explanation:
          'Applying maximum friction to all users regardless of demonstrated expertise can be disrespectful and counterproductive',
        mitigation:
          'Implement expertise-aware friction: reduce confirmations for users with demonstrated competence while maintaining guardrails for novices. Never remove safety nets entirely.',
      },
      {
        concern: 'False Sense of Security',
        severity: 'high',
        explanation:
          'Adding superficial confirmation dialogs that feel protective but are trivially bypassed, giving designers and organizations false confidence that users are protected',
        mitigation:
          'Test confirmation patterns with actual users. Measure accidental action rates. Iterate on patterns that users click through reflexively.',
      },
      {
        concern: 'Exploiting Overconfidence',
        severity: 'critical',
        explanation:
          'Designing interfaces that deliberately exploit overconfidence to get users to make purchases, commitments, or data-sharing decisions they would not make with full understanding',
        mitigation:
          'Use overconfidence awareness to protect users, not exploit them. Add friction before costly mistakes, not after. Show consequences clearly before the point of no return.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Calibration of Probabilities: The State of the Art to 1980',
        author: 'Lichtenstein, S., Fischhoff, B., & Phillips, L. D.',
        year: 1982,
        description:
          'Comprehensive review establishing that human confidence consistently exceeds accuracy across domains — the foundational work on calibration and overconfidence',
        type: 'foundational',
      },
      {
        title: 'The Trouble with Overconfidence',
        author: 'Moore, D. A., & Healy, P. J.',
        year: 2008,
        doi: '10.1037/a0013087',
        description:
          'Distinguishes three forms of overconfidence (overestimation, overplacement, overprecision) and shows they are distinct phenomena with different causes',
        type: 'foundational',
      },
      {
        title: 'Overconfidence and the Big Five',
        author: 'Schaefer, P. S., Williams, C. C., Goodie, A. S., & Campbell, W. K.',
        year: 2004,
        description:
          'Examines how personality traits relate to overconfidence, with implications for designing for different user populations',
        type: 'advanced',
      },
      {
        title: 'Debiasing Overconfidence in the Decision to Trade',
        author: 'Glaser, M., & Weber, M.',
        year: 2007,
        description:
          'Demonstrates that calibration training and feedback can reduce overconfident financial trading behavior',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Extensive coverage of overconfidence as a fundamental feature of System 1 thinking, with practical implications for decision design',
        type: 'foundational',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136716',
        description:
          'Demonstrates how calibration training dramatically improves prediction accuracy by reducing overconfidence',
        type: 'practical',
      },
      {
        title: 'The Signal and the Noise',
        author: 'Silver, Nate',
        year: 2012,
        isbn: '9780143125082',
        description:
          'Explores overconfidence in forecasting across domains from elections to earthquakes, with lessons for building prediction interfaces',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Error Prevention',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/slips/',
        description:
          'Practical UX patterns for preventing user errors, many of which address overconfidence-driven mistakes',
        type: 'practical',
      },
      {
        title: 'Confirmation Dialogs Can Prevent User Errors — If Done Correctly',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/confirmation-dialog/',
        description:
          'Evidence-based guidelines for designing confirmation patterns that actually prevent errors rather than being reflexively dismissed',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Danger of Overconfidence',
        author: 'TED-Ed',
        url: 'https://www.youtube.com/watch?v=LvHnSnNNOc4',
        description:
          'Animated explanation of overconfidence bias with examples from everyday decision-making',
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
