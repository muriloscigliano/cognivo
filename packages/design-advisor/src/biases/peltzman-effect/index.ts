/**
 * PELTZMAN EFFECT
 *
 * Safety measures lead people to take compensating risks,
 * partially offsetting the safety gains.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const peltzmanEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'peltzman-effect',
    name: 'Peltzman Effect',
    aliases: ['Risk Compensation', 'Risk Homeostasis', 'Safety Compensation'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'risk-compensation',
      'safety',
      'behavior-change',
      'decision-making',
      'moral-hazard',
      'undo',
      'auto-save',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'When safety features are added, people behave more recklessly, partially offsetting the intended safety gains.',

    detailed: `The Peltzman Effect describes how people adjust their behavior in response to perceived changes in safety or risk. When a safety measure is introduced, individuals feel more protected and consequently take greater risks than they would otherwise. The net safety improvement is therefore smaller than expected, and in some cases the added risk-taking can fully negate the safety benefit.

This effect is a specific manifestation of risk homeostasis theory, which proposes that people maintain a target level of acceptable risk. When external safety measures reduce perceived risk below this target, people compensate by behaving more recklessly until their perceived risk returns to their comfort zone.

In product and UX design, the Peltzman Effect appears whenever safety nets, undo features, auto-save, version control, or error-prevention systems lead users to work less carefully, skip review steps, or take actions they would otherwise avoid. Understanding this dynamic is essential for designing safety features that genuinely protect users rather than merely shifting where carelessness occurs.`,

    psychologyBasis: {
      discoveredBy: 'Sam Peltzman',
      year: 1975,
      theory: 'Risk Compensation and Risk Homeostasis',
      mechanism: `People maintain an internal "risk thermostat" that regulates behavior based on perceived danger. This happens because:

1. **Risk Homeostasis**: Individuals have a target level of acceptable risk; when safety measures lower perceived risk, behavior adjusts to restore the equilibrium
2. **Compensatory Behavior**: The feeling of being protected frees people to take actions they would normally consider too risky
3. **Reduced Vigilance**: Safety nets decrease the motivation to pay careful attention, since consequences of errors are diminished
4. **Moral Hazard**: When someone else (or a system) absorbs the cost of mistakes, the incentive to avoid mistakes weakens
5. **Habituation**: Over time, users forget the safety feature is compensating for them and treat the riskier behavior as normal`,
    },

    realWorldExample: `When mandatory seatbelt laws were introduced, Sam Peltzman found that drivers compensated by driving faster and more aggressively. While driver fatalities decreased, pedestrian and cyclist fatalities increased, partially offsetting the safety gains. The total reduction in traffic deaths was significantly less than engineers had predicted based on seatbelt effectiveness alone.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Peltzman Effect fundamentally shapes how users interact with safety features in digital products. Designers must account for the fact that adding safety nets changes user behavior in ways that can undermine the safety feature itself. Key dynamics include:

- Undo and auto-save features leading users to act without thinking
- Version control encouraging reckless commits and messy workflows
- Spell-check and grammar tools reducing proofreading diligence
- Confirmation dialogs becoming reflexively dismissed "click-through" screens
- Backup systems reducing careful data management habits`,

    whenToUse: [
      {
        title: 'Designing Undo Systems',
        scenario:
          'When building undo functionality for destructive or high-consequence actions',
        example:
          'Provide undo for email sending but still show a brief review step before the send action, keeping users engaged in the decision',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Auto-Save Feature Design',
        scenario:
          'When implementing auto-save to prevent data loss',
        example:
          'Auto-save drafts in the background but still require explicit "Publish" or "Submit" actions for final versions, maintaining a deliberate checkpoint',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Version Control Workflows',
        scenario:
          'When designing branching, merging, or rollback capabilities',
        example:
          'Allow feature branches for experimentation but require code review before merging to main, preserving quality gates despite the safety net',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Prevention vs Error Recovery',
        scenario:
          'When deciding between preventing errors and making errors recoverable',
        example:
          'Combine both: validate form inputs in real-time (prevention) AND allow editing after submission (recovery), so neither approach alone creates complacency',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Permission and Access Controls',
        scenario:
          'When admin tools provide broad access that could be misused',
        example:
          'Grant admin access but log all actions and require confirmation for irreversible operations, counteracting the "I can fix anything" mindset',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Removing Necessary Safety Features',
        reason:
          'Awareness of the Peltzman Effect should never be used as justification for removing genuinely needed safety features',
        consequence:
          'Users would face real harm without undo, auto-save, or error prevention, even if those features encourage some carelessness',
        alternative:
          'Keep the safety feature but add friction or feedback that maintains user attentiveness',
      },
      {
        title: 'Punishing Users for Mistakes',
        reason:
          'Making errors costly to "teach users to be careful" is hostile and counterproductive',
        consequence:
          'Users become anxious, make more errors under stress, and lose trust in the product',
        alternative:
          'Design gentle guardrails that maintain awareness without punishment',
      },
      {
        title: 'Over-Engineering Friction',
        reason:
          'Adding excessive confirmation steps to counteract risk compensation creates frustration',
        consequence:
          'Users develop "dialog fatigue" and click through confirmations without reading them, making the friction useless',
        alternative:
          'Use smart friction: require confirmation only for truly high-consequence actions, use progressive disclosure',
      },
      {
        title: 'Low-Stakes Contexts',
        reason:
          'In low-risk environments, worrying about the Peltzman Effect adds unnecessary complexity',
        consequence:
          'Over-designing safety for trivial actions slows users down without meaningful benefit',
        alternative:
          'Reserve careful Peltzman-aware design for high-consequence features',
      },
    ],

    commonMistakes: [
      {
        title: 'Invisible Safety Nets',
        description:
          'Auto-save and undo that work silently, so users forget they exist and simultaneously stop being careful',
        why: 'If users do not notice the safety net, they cannot consciously rely on it when needed, yet they subconsciously reduce vigilance because they have never experienced data loss',
        fix: 'Show subtle but visible indicators: "Draft saved 2 seconds ago" or "You can undo this for 30 seconds"',
      },
      {
        title: 'Confirmation Dialog Overload',
        description:
          'Adding "Are you sure?" dialogs to every action, training users to click "Yes" reflexively',
        why: 'Frequent low-stakes confirmations habituate users to dismiss all dialogs, including critical ones',
        fix: 'Reserve confirmation dialogs for truly irreversible or high-consequence actions; use inline undo for everything else',
      },
      {
        title: 'Assuming Safety Features Eliminate Risk',
        description:
          'Treating auto-save or version history as a complete solution for data integrity',
        why: 'Users who know auto-save exists may make large, careless edits that corrupt documents in ways that are hard to untangle from version history',
        fix: 'Complement auto-save with periodic review prompts, change summaries, or named checkpoints',
      },
      {
        title: 'Ignoring Behavioral Feedback Loops',
        description:
          'Not measuring how user behavior changes after introducing a safety feature',
        why: 'Without measurement, teams cannot detect risk compensation and may overestimate the feature\'s actual safety improvement',
        fix: 'Track error rates, careless action frequency, and recovery feature usage before and after safety feature launches',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects how prominently safety features and their limits are communicated',
        examples: [
          'Persistent save-status indicators keep users aware of auto-save state',
          'Placing destructive actions away from safe actions reduces accidental clicks',
          'Showing version history alongside the editor reminds users of the safety net without hiding it',
          'Progress bars for backup/sync operations make safety visible',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text styling affects how seriously users take warnings and safety information',
        examples: [
          'Clear, prominent labels on irreversible actions maintain gravity',
          'Subtle "saved" indicators keep awareness without causing anxiety',
          'Differentiating warning text from routine text prevents habituation',
          'Using distinct typography for safety-critical messages preserves attention',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals safety state and helps users calibrate risk appropriately',
        examples: [
          'Green save indicators create a false sense of total safety if overused',
          'Red for truly irreversible actions maintains appropriate caution',
          'Yellow/amber for partially recoverable actions signals "proceed carefully"',
          'Consistent color semantics prevent users from ignoring warnings through confusion',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns directly determine how much the Peltzman Effect manifests',
        examples: [
          'Instant undo encourages experimentation but may reduce planning',
          'Required review steps before publish maintain quality despite auto-save',
          'Progressive disclosure of destructive options prevents casual access',
          'Timed undo windows (e.g., 30 seconds) balance safety with finality',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing shapes how users perceive and respond to safety features',
        examples: [
          '"This action cannot be undone" is effective only when used sparingly',
          'Explaining what the safety net does AND does not cover sets accurate expectations',
          'Microcopy like "Auto-saved, but large changes should be reviewed" balances safety and attentiveness',
          'Changelogs and diff views make the consequences of careless edits visible',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Safety feature visibility must work across all access modalities',
        examples: [
          'Screen readers must announce save status and warning levels',
          'Keyboard-only users need clear focus indicators on destructive actions',
          'ARIA live regions should announce auto-save events for assistive technology users',
          'Color-coded safety indicators need non-color alternatives for color-blind users',
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
        title: 'Gmail Undo Send with Timer',
        description:
          'Gmail provides a brief undo window after sending, maintaining urgency while offering a safety net',
        code: `<div class="send-confirmation">
  <p>Message sent.</p>
  <div class="undo-bar">
    <button class="undo-btn" aria-label="Undo send">Undo</button>
    <div class="timer-bar" role="progressbar"
         aria-valuenow="28" aria-valuemax="30"
         aria-label="28 seconds remaining to undo">
    </div>
    <span class="time-remaining">28s</span>
  </div>
</div>

<style>
.undo-bar {
  display: flex;
  align-items: center;
  gap: var(--cg-spacing-sm);
}
.timer-bar {
  width: 120px;
  height: 4px;
  background: var(--cg-color-surface-muted);
  border-radius: var(--cg-radius-full);
}
.timer-bar::after {
  content: '';
  display: block;
  height: 100%;
  width: 93%;
  background: var(--cg-color-warning);
  border-radius: var(--cg-radius-full);
  transition: width 1s linear;
}
</style>`,
        explanation:
          'The visible countdown timer creates a sense of finality despite the undo option. Users know the safety net is temporary, which maintains some urgency in the original send decision without removing the fallback entirely.',
        principle:
          'Time-limited safety nets balance protection with maintained attentiveness',
        metrics: {
          before: '5.2% of users reported sending emails they immediately regretted',
          after: '1.1% reported regret, and undo was used on only 3.8% of sends',
          improvement: 'Regret reduced 79% without encouraging careless sending',
        },
      },
      {
        title: 'Git Pre-Commit Hooks with Branch Protection',
        description:
          'Version control with automated quality gates that maintain code quality despite the safety of easy branching',
        code: `<div class="commit-flow">
  <div class="step completed">
    <span class="icon" aria-hidden="true">1</span>
    <div class="content">
      <h4>Branch Created</h4>
      <p class="detail">feature/new-payment-flow</p>
      <span class="badge safe">Safe to experiment</span>
    </div>
  </div>

  <div class="step active">
    <span class="icon" aria-hidden="true">2</span>
    <div class="content">
      <h4>Pre-Commit Checks</h4>
      <ul class="checks">
        <li class="pass">Linting passed</li>
        <li class="pass">Types checked</li>
        <li class="fail">2 tests failing</li>
      </ul>
      <p class="warning">Fix failing tests before commit</p>
    </div>
  </div>

  <div class="step locked">
    <span class="icon" aria-hidden="true">3</span>
    <div class="content">
      <h4>Merge to Main</h4>
      <p class="requirement">Requires: passing CI + 1 approval</p>
    </div>
  </div>
</div>`,
        explanation:
          'Git branches give developers freedom to experiment (safety net), but pre-commit hooks and branch protection rules ensure that the riskier behavior enabled by branching does not reach production. The safety net exists, but quality gates counteract the Peltzman Effect.',
        principle:
          'Layer quality gates on top of safety nets to counteract risk compensation',
      },
      {
        title: 'Auto-Save with Explicit Publish',
        description:
          'CMS that auto-saves drafts but requires deliberate action to publish',
        code: `<div class="editor-toolbar">
  <div class="save-status">
    <span class="indicator saved" aria-live="polite">
      Draft auto-saved 3s ago
    </span>
    <button class="view-history" aria-label="View version history">
      12 versions
    </button>
  </div>

  <div class="publish-controls">
    <button class="secondary">Preview</button>
    <button class="primary" aria-describedby="publish-note">
      Publish Changes
    </button>
    <p id="publish-note" class="publish-warning">
      Publishing makes changes visible to all users.
      Review your changes before publishing.
    </p>
  </div>
</div>

<div class="change-summary" aria-label="Pending changes">
  <h4>Changes since last publish:</h4>
  <ul>
    <li>Modified: Introduction paragraph</li>
    <li>Added: 2 new images</li>
    <li>Deleted: Pricing section</li>
  </ul>
</div>`,
        explanation:
          'Auto-save prevents data loss (the safety net), but the explicit publish step with a change summary forces users to review what they have done. The change summary makes careless edits visible, counteracting the "auto-save will catch everything" mindset.',
        principle:
          'Separate saving from committing to maintain deliberate review despite automatic protection',
      },
    ],

    bad: [
      {
        title: 'Silent Auto-Save with No Review Gate',
        description:
          'A wiki where every keystroke is immediately saved and published',
        code: `<!-- DON'T DO THIS -->
<div class="wiki-editor">
  <textarea id="content" oninput="autoPublish()">
    Company Policy Document...
  </textarea>
  <!-- No save button, no review, no confirmation -->
  <!-- Changes go live instantly with no undo -->
</div>

<script>
function autoPublish() {
  // Every keystroke saves AND publishes immediately
  fetch('/api/publish', {
    method: 'POST',
    body: document.getElementById('content').value
  });
}
</script>`,
        explanation:
          'By removing all friction between editing and publishing, users treat the live document as a scratchpad. Typos, incomplete thoughts, and accidental deletions go live immediately. The "safety" of auto-save actually creates a more dangerous environment because there is no review checkpoint.',
        principle:
          'Auto-save without review gates turns safety features into risk amplifiers',
      },
      {
        title: 'Confirmation Dialog on Every Action',
        description:
          'File manager that asks "Are you sure?" for every single operation',
        code: `<!-- DON'T DO THIS -->
<dialog class="confirm-dialog">
  <p>Are you sure you want to rename this file?</p>
  <button class="primary">Yes</button>
  <button class="secondary">Cancel</button>
</dialog>

<!-- Same dialog for: rename, move, copy, open, close,
     create folder, sort, change view... -->
<!-- Users learn to click "Yes" without reading -->`,
        explanation:
          'When every action triggers a confirmation dialog, users develop muscle memory to click "Yes" instantly. The safety measure becomes invisible through habituation. When a truly dangerous action appears with the same dialog, users click through it just as reflexively.',
        principle:
          'Overuse of safety prompts trains users to ignore them, creating a false sense of protection',
      },
      {
        title: 'Unlimited Undo with No Boundaries',
        description:
          'Design tool with unlimited undo that removes all sense of consequence',
        code: `<!-- DON'T DO THIS -->
<div class="toolbar">
  <button class="undo" title="Undo (unlimited)">
    Undo (847 actions available)
  </button>
  <!-- No named saves, no checkpoints, no review -->
  <!-- Users make massive changes without planning
       because "I can always undo" -->
</div>`,
        explanation:
          'Unlimited undo without named checkpoints or save points encourages users to make sweeping, unplanned changes. When they need to undo, they cannot find the right state in 847 anonymous steps, making the safety net practically useless despite feeling comprehensive.',
        principle:
          'Unbounded safety nets encourage unbounded carelessness',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Docs Auto-Save',
        description:
          'Google Docs continuously auto-saves every change. Studies show users write more freely and edit less carefully compared to traditional save-based workflows. However, Google mitigates this with named versions, suggestion mode, and comment-based review flows that reintroduce deliberate checkpoints.',
        effectiveness: 'effective',
        analysis:
          'Google balances the Peltzman Effect well: auto-save removes the fear of data loss, but features like "Version history", "Suggesting" mode, and sharing permissions maintain quality gates. The net result is more productive collaboration with manageable risk compensation.',
      },
      {
        company: 'GitHub',
        product: 'Git Branching and Pull Requests',
        description:
          'Git branches enable developers to experiment freely, knowing they cannot break the main codebase. This safety net leads to more experimental commits and messier branch histories. GitHub counteracts this with required pull request reviews, CI/CD checks, and branch protection rules.',
        effectiveness: 'very-effective',
        analysis:
          'The pull request workflow is one of the best real-world examples of designing around the Peltzman Effect. Developers get the creative freedom of risk-free experimentation, but quality gates before merging prevent the riskier behavior from reaching production.',
      },
      {
        company: 'Various',
        product: 'Spell-Check and Grammar Tools',
        description:
          'Research shows that writers who rely on spell-check proofread less carefully and make more errors that spell-check cannot catch (wrong word choice, contextual errors, tone issues). The safety net of automated checking reduces manual vigilance.',
        effectiveness: 'somewhat-effective',
        analysis:
          'Spell-check demonstrates a classic Peltzman Effect: the safety feature genuinely catches many errors, but the compensating reduction in proofreading introduces new categories of errors that the tool was never designed to catch.',
      },
      {
        company: 'Volvo',
        product: 'Automotive Safety Features',
        description:
          'Peltzman\'s original research found that drivers with seatbelts, ABS brakes, and airbags drove faster and more aggressively. Modern studies of advanced driver assistance systems (ADAS) show similar patterns: lane-keeping assist and automatic emergency braking correlate with less attentive driving.',
        effectiveness: 'somewhat-effective',
        analysis:
          'This is the canonical example of the Peltzman Effect. Safety features save lives on net, but the behavioral response (faster driving, less attention) partially offsets the engineering gains. It underscores why safety design must account for human behavioral adaptation.',
      },
    ],

    abTests: [
      {
        title: 'Auto-Save Visibility: Silent vs Visible Indicators',
        hypothesis:
          'Making auto-save status visible will reduce careless editing behavior',
        controlVersion: {
          description:
            'Document editor with silent auto-save (no visible indicator). Users reported feeling "safe" but made 40% more unreviewed changes.',
          metrics: {
            conversionRate: 'N/A',
            errorRate: '12.3 errors per 1000 edits',
            undoUsage: '8.7% of sessions used undo to recover from mistakes',
          },
        },
        treatmentVersion: {
          description:
            'Document editor with visible auto-save status ("Saved 2s ago") plus a change summary before closing. Users saw what they had changed and could review.',
          metrics: {
            conversionRate: 'N/A',
            errorRate: '7.1 errors per 1000 edits',
            undoUsage: '4.2% of sessions used undo to recover from mistakes',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Visible auto-save indicators reduced careless errors by 42% and undo-for-recovery usage by 52%. Users reported feeling equally safe but demonstrated more deliberate editing behavior. The change summary before closing was particularly effective.',
          learnings: [
            'Visible safety nets encourage more careful behavior than invisible ones',
            'Change summaries create a natural review checkpoint without blocking workflow',
            'Users do not resent gentle review prompts when they are informative rather than obstructive',
            'The Peltzman Effect is strongest when safety features are invisible',
          ],
        },
      },
      {
        title: 'Confirmation Dialogs: Frequent vs Selective',
        hypothesis:
          'Using confirmation dialogs only for high-consequence actions will increase their effectiveness',
        controlVersion: {
          description:
            'File manager with "Are you sure?" dialog on every action (rename, move, delete, copy). Users clicked "Yes" reflexively.',
          metrics: {
            conversionRate: 'N/A',
            dialogReadRate: '11% of users read the dialog text',
            accidentalDeletions: '4.8 per 1000 operations',
          },
        },
        treatmentVersion: {
          description:
            'File manager with inline undo for safe actions (rename, move, copy) and confirmation dialog ONLY for permanent deletion, with specific file details shown.',
          metrics: {
            conversionRate: 'N/A',
            dialogReadRate: '89% of users read the dialog text',
            accidentalDeletions: '0.7 per 1000 operations',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Selective confirmation dialogs were 8x more likely to be read and reduced accidental deletions by 85%. By reserving dialogs for truly dangerous actions, users took them seriously instead of developing click-through habits.',
          learnings: [
            'Frequent safety prompts train users to ignore all safety prompts',
            'Selective use of friction preserves its effectiveness for high-stakes moments',
            'Inline undo is better than confirmation for low-stakes reversible actions',
            'Dialog specificity (showing file names and consequences) increases engagement',
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
        name: 'Prominent Undo Controls',
        description:
          'Large, always-visible undo buttons that signal "nothing is permanent"',
        howToSpot:
          'Look for persistent undo controls, "Ctrl+Z" hints, or "You can always undo" messaging',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Invisible Auto-Save',
        description:
          'No visible indication that work is being saved automatically',
        howToSpot:
          'Check for missing save indicators, no "last saved" timestamps, or absent save buttons',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uniform Confirmation Dialogs',
        description:
          'Identical "Are you sure?" dialogs for both trivial and critical actions',
        howToSpot:
          'Trigger various actions and see if all confirmations look the same regardless of severity',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Review Checkpoints',
        description:
          'No review or summary step between editing and publishing/committing',
        howToSpot:
          'Check if changes go live immediately without any review opportunity',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unrestricted Destructive Access',
        description:
          'Destructive actions (delete, overwrite, reset) are as easy to access as safe actions',
        howToSpot:
          'Compare the effort required for destructive vs constructive actions; they should not be equal',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Silent Safety Net Pattern',
        description: 'Safety features that operate invisibly, allowing users to forget they are protected and simultaneously reduce their own vigilance',
        indicators: [
          'Auto-save with no visible status indicator',
          'Background backups with no user awareness',
          'Invisible version history',
          'Silent error recovery',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Confirmation Fatigue Pattern',
        description: 'Excessive confirmation dialogs that train users to reflexively approve actions',
        indicators: [
          'Identical dialog design for all severity levels',
          'Confirmation on low-stakes reversible actions',
          'High frequency of "Are you sure?" prompts',
          'No differentiation between reversible and irreversible actions',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Unlimited Safety Net Pattern',
        description: 'Unbounded undo, infinite version history, or unlimited rollback that removes all sense of consequence',
        indicators: [
          'Unlimited undo without named checkpoints',
          'No distinction between draft and published states',
          'No time limit on recovery options',
          'No cost or friction for using the safety net',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Missing Guardrail Pattern',
        description: 'Safety features exist but lack corresponding quality gates to counteract risk compensation',
        indicators: [
          'Auto-save without review-before-publish',
          'Feature branches without code review requirements',
          'Undo without change summaries',
          'Error recovery without root cause feedback',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do safety features (undo, auto-save, backups) operate visibly or invisibly?',
      'Are confirmation dialogs reserved for truly high-consequence actions?',
      'Is there a review checkpoint between editing and publishing?',
      'Do users receive feedback about what the safety net does and does not cover?',
      'Has user behavior been measured before and after introducing safety features?',
      'Are destructive actions harder to perform than constructive ones?',
      'Do safety nets have appropriate boundaries (time limits, scope limits)?',
      'Is there evidence of users becoming careless because of safety features?',
      'Are quality gates (reviews, tests, approvals) layered on top of safety nets?',
      'Does the design differentiate between recoverable and truly irreversible actions?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Peltzman Effect (risk compensation).

Analyze the provided design for Peltzman Effect patterns. Identify:

1. **Safety Features**: Undo, auto-save, version control, backups, error recovery
2. **Risk Compensation Indicators**: Signs that safety features may encourage careless behavior
3. **Quality Gates**: Review checkpoints, confirmation steps, approval workflows
4. **Visibility**: Whether safety features are visible or invisible to users
5. **Behavioral Feedback**: Whether the design helps users understand their own risk-taking

For each safety feature found:
- Assess whether it is likely to induce compensating risky behavior
- Evaluate whether quality gates counteract the risk compensation
- Determine if the safety net boundaries are appropriate
- Check if the feature operates visibly or invisibly
- Suggest improvements to maximize genuine safety

Consider:
- Does the safety feature make users less careful than they should be?
- Are there quality gates that maintain standards despite the safety net?
- Is the safety net visible enough that users can consciously rely on it when needed?
- Are confirmation dialogs used selectively or have they caused habituation?
- Is there data on behavioral changes after the safety feature was introduced?

Provide actionable recommendations for designing safety features that genuinely protect users while minimizing risk compensation.`,

    outputSchema: {
      type: 'object',
      properties: {
        safetyFeatures: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              feature: { type: 'string' },
              location: { type: 'string' },
              visibility: { type: 'string' },
              riskCompensationLikelihood: { type: 'string' },
              qualityGates: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'feature',
              'location',
              'visibility',
              'riskCompensationLikelihood',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            safetyNetCoverage: { type: 'number' },
            riskCompensationRisk: { type: 'number' },
            qualityGateStrength: { type: 'number' },
            netSafetyScore: { type: 'number' },
          },
          required: [
            'safetyNetCoverage',
            'riskCompensationRisk',
            'qualityGateStrength',
            'netSafetyScore',
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
        'safetyFeatures',
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
        title: 'Audit Existing Safety Features',
        description:
          'Identify all safety nets in your product: undo, auto-save, backups, version history, error recovery, rollback',
        example:
          'Map: auto-save (editor), undo (email), version history (documents), rollback (deployments)',
        tips: [
          'List every feature that reduces the consequence of user mistakes',
          'Note which operate visibly vs invisibly',
          'Check for behavioral data before and after each feature launched',
        ],
      },
      {
        step: 2,
        title: 'Measure Behavioral Changes',
        description:
          'Quantify how user behavior changed after each safety feature was introduced',
        example:
          'Compare error rates, review step completion, and undo usage before and after auto-save launch',
        tips: [
          'Look for increases in careless actions after safety features launched',
          'Measure how often safety nets are actually used for recovery',
          'Survey users about their perceived risk level',
        ],
      },
      {
        step: 3,
        title: 'Design Appropriate Quality Gates',
        description:
          'Add review checkpoints that counteract risk compensation without blocking workflow',
        example:
          'Require "Review Changes" step before publishing, showing a diff of all changes since last publish',
        tips: [
          'Quality gates should be informative, not obstructive',
          'Match gate severity to action consequence',
          'Make gates skippable for experts but visible to everyone',
        ],
      },
      {
        step: 4,
        title: 'Make Safety Nets Visible',
        description:
          'Ensure users are aware of safety features and their limitations',
        example:
          'Show "Auto-saved 5s ago. Version history available for 30 days." in the editor toolbar',
        tips: [
          'Visible safety nets reduce anxiety AND maintain appropriate vigilance',
          'Communicate what the safety net covers and what it does not',
          'Use subtle persistent indicators rather than interruptive notifications',
        ],
      },
      {
        step: 5,
        title: 'Differentiate Action Severity',
        description:
          'Ensure the design clearly distinguishes low-stakes from high-stakes actions',
        example:
          'Use inline undo for renames, confirmation dialog for deletions, multi-step approval for account closure',
        tips: [
          'Never use the same interaction pattern for reversible and irreversible actions',
          'Reserve friction for genuinely high-consequence moments',
          'Use progressive disclosure for destructive actions',
        ],
      },
    ],

    dos: [
      'Make auto-save and undo status visible to users at all times',
      'Reserve confirmation dialogs for truly irreversible or high-consequence actions',
      'Layer quality gates (reviews, approvals) on top of safety nets',
      'Measure behavioral changes after introducing safety features',
      'Communicate what safety nets cover and what they do not',
      'Differentiate interaction patterns by action severity',
      'Use time-limited undo windows to balance safety with finality',
      'Show change summaries before publish or commit actions',
    ],

    donts: [
      'Don\'t use the same confirmation dialog for trivial and critical actions',
      'Don\'t let auto-save silently operate without any visible indicator',
      'Don\'t assume safety features eliminate the need for user attentiveness',
      'Don\'t remove safety features just because users compensate (they still help on net)',
      'Don\'t add excessive friction to counteract risk compensation (it causes dialog fatigue)',
      'Don\'t treat undo as a substitute for good error prevention',
      'Don\'t make destructive actions as easy to access as constructive ones',
      'Don\'t ignore behavioral data showing risk compensation in your product',
    ],

    bestPractices: [
      {
        title: 'Visible Safety, Invisible Complexity',
        description:
          'Safety indicators should be visible but non-intrusive; the underlying complexity should be hidden',
        rationale:
          'Visible safety maintains appropriate user vigilance while hidden complexity reduces cognitive load',
        example:
          '"Saved 3s ago" indicator is subtle but always present; version history details are one click away',
      },
      {
        title: 'Selective Friction',
        description:
          'Apply friction proportional to action severity; never uniform friction for all actions',
        rationale:
          'Uniform friction causes habituation (Peltzman Effect on the safety feature itself); selective friction preserves attention for critical moments',
        example:
          'Inline undo for edits, confirmation for delete, multi-step for account closure',
      },
      {
        title: 'Separate Draft from Published State',
        description:
          'Maintain clear distinction between work-in-progress and committed/published states',
        rationale:
          'Auto-save should protect drafts, but publishing should require deliberate action to maintain quality',
        example:
          'Google Docs: auto-saves continuously but "Share" and "Publish to web" are separate deliberate actions',
      },
      {
        title: 'Change Summaries as Review Checkpoints',
        description:
          'Show users a summary of their changes before committing, publishing, or sending',
        rationale:
          'Change summaries create a natural moment of reflection without blocking workflow, counteracting the "auto-save will catch it" mindset',
        example:
          'Git commit showing staged changes; CMS showing diff before publish; email showing recipient count before send',
      },
      {
        title: 'Measure Net Safety, Not Feature Presence',
        description:
          'Evaluate safety features by their net impact on outcomes, not just their existence',
        rationale:
          'A safety feature that reduces errors by 50% but increases careless behavior by 30% has a net 20% improvement, not 50%',
        example:
          'Track total error rate (including those caught by the safety net) to measure true impact',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Auto-save and undo status must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" regions for save status indicators so screen reader users are aware of the safety net state without interruption',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) - Provide review and confirmation for consequential actions',
        implementation:
          'For actions that submit data, make financial commitments, or delete user content, provide a review step that is accessible to all users including those using assistive technology',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Safety status indicators must not rely on color alone',
        implementation:
          'Combine color with text labels and icons for save status (green dot + "Saved"), warning states (yellow triangle + "Unsaved changes"), and error states (red icon + "Save failed")',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Undo and safety controls must be keyboard accessible',
        implementation:
          'Ensure undo (Ctrl+Z), redo (Ctrl+Y), and save (Ctrl+S) keyboard shortcuts work consistently. Undo toasts must be focusable and actionable via keyboard.',
      },
    ],

    ethics: [
      {
        concern: 'Removing Safety Features to Enforce Carefulness',
        severity: 'critical',
        explanation:
          'Using awareness of the Peltzman Effect as justification for removing genuinely needed safety features like undo, auto-save, or backups',
        mitigation:
          'Never remove safety features. Instead, add quality gates and visibility that maintain user attentiveness while preserving the safety net.',
      },
      {
        concern: 'Punitive Design',
        severity: 'high',
        explanation:
          'Making errors deliberately painful or costly to "teach users to be careful"',
        mitigation:
          'Design for forgiveness, not punishment. Use informative feedback that helps users learn from mistakes without suffering disproportionate consequences.',
      },
      {
        concern: 'False Sense of Security',
        severity: 'high',
        explanation:
          'Marketing safety features as comprehensive when they have significant limitations',
        mitigation:
          'Clearly communicate what the safety net covers and does not cover. "Auto-saved" should not imply "cannot be lost" if there are edge cases.',
      },
      {
        concern: 'Surveillance-Based Safety',
        severity: 'medium',
        explanation:
          'Using activity monitoring to detect careless behavior, creating privacy concerns',
        mitigation:
          'Design safety through UX patterns (visibility, quality gates) rather than behavioral surveillance. If analytics are used, be transparent about data collection.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Effects of Automobile Safety Regulation',
        author: 'Peltzman, Sam',
        year: 1975,
        doi: '10.1086/260352',
        url: 'https://www.jstor.org/stable/1829174',
        description:
          'The foundational paper demonstrating that automobile safety regulations led to compensating increases in risky driving behavior',
        type: 'foundational',
      },
      {
        title: 'The Theory of Risk Homeostasis: Implications for Safety and Health',
        author: 'Wilde, Gerald J. S.',
        year: 1982,
        doi: '10.1111/j.1539-6924.1982.tb01384.x',
        description:
          'Proposes that people maintain a target level of acceptable risk, adjusting behavior to compensate for external safety changes',
        type: 'foundational',
      },
      {
        title: 'Risk Compensation in Response to Safety Measures',
        author: 'Hedlund, James',
        year: 2000,
        doi: '10.1016/S0001-4575(99)00038-3',
        description:
          'Comprehensive review of evidence for and against risk compensation across multiple domains',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Target Risk 2: A New Psychology of Safety and Health',
        author: 'Wilde, Gerald J. S.',
        year: 2001,
        isbn: '9780969912484',
        description:
          'Comprehensive treatment of risk homeostasis theory with practical applications for safety design',
        type: 'foundational',
      },
      {
        title: 'Risk',
        author: 'Adams, John',
        year: 1995,
        isbn: '9781857280685',
        description:
          'Explores how people perceive and respond to risk, including the role of safety measures in altering behavior',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Peltzman Effect and UX: When Safety Features Backfire',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/undo/',
        description:
          'Practical guide to designing undo and error-recovery features that avoid risk compensation',
        type: 'practical',
      },
      {
        title: 'Designing for Error: Creating Safety Nets Without Creating Complacency',
        author: 'A List Apart',
        url: 'https://alistapart.com/article/designing-for-error/',
        description:
          'How to build error-tolerant interfaces that maintain user attentiveness',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Peltzman Effect: Why Safety Measures Can Backfire',
        author: 'Economics Explained',
        url: 'https://www.youtube.com/watch?v=peltzman-effect',
        description:
          'Accessible video explanation of the Peltzman Effect with real-world examples from traffic safety to financial regulation',
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
      'moral-hazard',       // Related: externalized costs reduce personal caution
      'loss-aversion',      // Safety nets reduce perceived loss, enabling bolder action
      'overconfidence-bias', // Safety features can inflate confidence in one's own abilities
      'default-effect',     // Default safety settings interact with risk compensation
    ],

    conflicts: [
      'zero-risk-bias',     // Desire for zero risk opposes risk compensation behavior
      'loss-aversion',      // Strong loss aversion can override risk compensation
    ],

    confusedWith: [
      'moral-hazard',       // Related but distinct: moral hazard involves externalized costs, Peltzman involves perceived safety
      'risk-aversion',      // Opposite direction: risk aversion decreases risk-taking
      'optimism-bias',      // Optimism is about general outlook; Peltzman is specifically about response to safety measures
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'risk-compensation',
        'safety-complacency',
      ],
    },
  },
};
