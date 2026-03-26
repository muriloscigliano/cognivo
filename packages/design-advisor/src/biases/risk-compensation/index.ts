/**
 * RISK COMPENSATION
 *
 * People take more risks when they feel protected by safety measures.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const riskCompensation: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'risk-compensation',
    name: 'Risk Compensation',
    aliases: ['Peltzman Effect', 'Risk Homeostasis', 'Safety Paradox'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'risk-taking',
      'safety',
      'behavior-change',
      'decision-making',
      'protection',
      'overconfidence',
      'undo',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People take more risks when they feel protected by safety measures, often offsetting the intended benefit of those measures.',

    detailed: `Risk compensation is a behavioral tendency where people adjust their behavior in response to perceived changes in risk. When a safety measure makes people feel more protected, they often respond by taking greater risks, partially or fully offsetting the safety benefit.

This effect was first identified in traffic safety research: when anti-lock brakes (ABS) were introduced, drivers didn't crash less often -- they drove faster and followed more closely, consuming the safety margin ABS provided. The same pattern appears across domains: protective equipment, safety regulations, insurance, and digital safeguards all trigger compensatory risk-taking.

In product and UX design, risk compensation is especially relevant. Features like auto-save, undo, version history, and backup systems are designed to protect users -- but they can inadvertently encourage careless behavior. Users who know they can undo may act impulsively. Users who know backups exist may skip careful review. Understanding this dynamic helps designers build safety nets that protect without breeding recklessness.`,

    psychologyBasis: {
      discoveredBy: 'Sam Peltzman',
      year: 1975,
      theory: 'Risk Homeostasis Theory (expanded by Gerald Wilde, 1982)',
      mechanism: `People maintain a target level of risk they find acceptable. When external safety measures reduce perceived risk below this target, they compensate by taking more risks until equilibrium is restored. This happens because:

1. **Risk Thermostat**: People have an internal "acceptable risk" set-point and adjust behavior to maintain it
2. **Perceived vs Actual Safety**: Safety measures change perception of risk faster than they change actual risk
3. **Moral Licensing**: Feeling protected grants psychological "permission" to be less cautious
4. **Effort Reduction**: Safety nets reduce the perceived cost of mistakes, making careful effort feel unnecessary
5. **Habituation**: Repeated exposure to safety features erodes awareness of underlying dangers`,
    },

    realWorldExample: `When cars were equipped with ABS brakes, researchers expected accident rates to drop significantly. Instead, Peltzman (1975) found that drivers with ABS drove more aggressively -- following more closely, braking later, and taking corners faster. The safety benefit of better braking was partially consumed by riskier driving. The same pattern appeared with seatbelt laws: mandated seatbelts reduced driver fatalities but increased pedestrian fatalities, as drivers felt safer and drove less cautiously around pedestrians.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Risk compensation directly affects how users interact with safety features, undo mechanisms, backup systems, and error-prevention tools. When users know a safety net exists, their behavior changes in predictable ways:

- Auto-save features can reduce careful saving habits and intentional checkpointing
- Undo functionality can encourage impulsive, reckless editing
- Version history can reduce the care taken with each version
- Backup systems can make users less careful with original data
- Safety warnings, when ever-present, can become invisible and ignored
- Error prevention UI can breed overconfidence in complex workflows`,

    whenToUse: [
      {
        title: 'Undo and Recovery Design',
        scenario:
          'When designing undo, revert, or recovery mechanisms for destructive actions',
        example:
          'Provide undo for email sending but still show a confirmation step with key details (recipients, attachments) to maintain user attentiveness',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Auto-Save Systems',
        scenario: 'When implementing automatic saving or syncing of user work',
        example:
          'Auto-save continuously but surface explicit "checkpoint" moments where users review and name their progress, preserving deliberate intent',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Data Protection Messaging',
        scenario: 'When communicating backup or data protection status to users',
        example:
          'Show that backups exist but still emphasize that recovery takes time and some data may be lost, so care remains warranted',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Permission and Access Controls',
        scenario: 'When users have broad permissions or admin access',
        example:
          'Even with role-based recovery, require confirmation for bulk operations and show impact previews before execution',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Security Tool Communication',
        scenario: 'When users rely on antivirus, firewalls, or security software',
        example:
          'Show protection status without creating false sense of invulnerability -- "Protected against known threats" rather than "You are completely safe"',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency or Crisis Interfaces',
        reason:
          'In emergency contexts, users need maximum confidence in safety systems to act decisively',
        consequence:
          'Undermining trust in safety measures during emergencies can cause paralysis or panic',
        alternative:
          'In crisis UI, emphasize reliability of safety systems. Apply risk compensation awareness only to routine workflows',
      },
      {
        title: 'Accessibility-Critical Flows',
        reason:
          'Users with disabilities may depend on undo and safety features as essential accommodations, not luxuries',
        consequence:
          'Adding friction to safety features could disproportionately harm users who need them most',
        alternative:
          'Maintain full undo capability but add optional review prompts that can be customized per user preference',
      },
      {
        title: 'Novice User Onboarding',
        reason:
          'New users need confidence that mistakes are recoverable to explore and learn',
        consequence:
          'Warning novices about risk compensation could increase anxiety and reduce exploration',
        alternative:
          'Let safety nets work fully for new users; introduce deliberate checkpoints as users gain experience',
      },
      {
        title: 'High-Anxiety Contexts',
        reason:
          'Some users already experience excessive caution; adding friction increases anxiety without benefit',
        consequence:
          'Overly cautious users become even more paralyzed and less productive',
        alternative:
          'Use adaptive friction that scales based on user behavior patterns, not blanket warnings',
      },
    ],

    commonMistakes: [
      {
        title: 'Invisible Safety Nets',
        description:
          'Making safety features so seamless that users forget risks still exist',
        why: 'When auto-save and undo are invisible, users lose awareness that their actions have consequences and stop being deliberate',
        fix: 'Surface subtle indicators of safety state -- show last save time, version count, or recovery window so users remain aware without being interrupted',
      },
      {
        title: 'Cry-Wolf Warnings',
        description:
          'Showing so many safety warnings that users learn to dismiss them all',
        why: 'Frequent low-severity warnings train users to click past all warnings, including critical ones',
        fix: 'Reserve prominent warnings for genuinely dangerous actions. Use tiered severity (info, caution, danger) with distinct visual treatments',
      },
      {
        title: 'False Certainty in Recovery',
        description:
          'Promising complete, instant recovery when reality involves data loss or delay',
        why: 'Users who believe recovery is perfect have zero incentive for caution',
        fix: 'Be honest about recovery limitations: "Undo available for 30 seconds" or "Backup restores may take up to 24 hours and exclude files modified in the last hour"',
      },
      {
        title: 'Removing All Friction from Destructive Actions',
        description:
          'Making it as easy to delete, overwrite, or publish as it is to edit',
        why: 'Equal effort for safe and destructive actions means users don\'t pause to consider consequences',
        fix: 'Apply proportional friction: low-risk actions are frictionless, high-risk actions require an extra deliberate step (confirm, type to confirm, review)',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects visibility of safety indicators and proximity of destructive actions',
        examples: [
          'Placing delete buttons far from save buttons reduces accidental destructive actions',
          'Showing backup status in persistent UI keeps safety awareness present',
          'Grouping destructive actions in a separate zone with distinct styling',
          'Positioning undo controls where they are findable but not as primary actions',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography differentiates severity levels and maintains warning salience',
        examples: [
          'Distinct typographic treatment for destructive action labels (weight, case)',
          'Warning text that uses clear, specific language over generic "Are you sure?"',
          'Version labels and timestamps that are readable but not obtrusive',
          'Recovery limitation text that is legible, not buried in fine print',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals risk levels and differentiates safe from dangerous actions',
        examples: [
          'Red for destructive actions maintains awareness even when undo exists',
          'Graduated color severity (yellow caution, orange warning, red danger) prevents warning fatigue',
          'Muted safety indicators that communicate protection without creating false invulnerability',
          'Distinct color treatment for "protected" vs "unprotected" states',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether safety features breed carelessness or maintain awareness',
        examples: [
          'Progressive confirmation for high-impact actions (click, then confirm, then execute)',
          'Delayed execution ("Sending in 5 seconds... Undo") preserves user attention',
          'Requiring specific input to confirm destructive actions (type folder name to delete)',
          'Soft-delete patterns that allow recovery but show clear consequences',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users perceive safety realistically or with false confidence',
        examples: [
          '"Your work is backed up" vs "Your work is backed up. Recovery may take up to 1 hour."',
          'Describing undo windows: "You can undo for 30 seconds" sets realistic expectations',
          'Impact previews: "This will affect 2,847 records" grounds the action in consequences',
          'Specific, honest recovery language replaces vague reassurance',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible safety features must protect without creating barriers',
        examples: [
          'Screen reader announcements for safety state changes (auto-saved, backup complete)',
          'Keyboard-accessible undo with clear focus management after action reversal',
          'Confirmation dialogs that are properly labeled and navigable',
          'Warning severity communicated through ARIA roles, not color alone',
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
        title: 'Gmail Delayed Send with Undo',
        description:
          'Email sending with a brief delay and undo option that keeps users attentive',
        code: `<div class="send-confirmation">
  <div class="toast-notification">
    <span class="message">Message sent.</span>
    <button class="undo-btn">Undo</button>
    <div class="timer-bar" style="animation: shrink 5s linear;"></div>
  </div>
</div>

<!-- Before sending, a confirmation step shows: -->
<dialog class="send-review">
  <h3>Review Before Sending</h3>
  <div class="review-details">
    <p><strong>To:</strong> 47 recipients (All Engineering)</p>
    <p><strong>Subject:</strong> Database Migration - Action Required</p>
    <p class="attachment-warning">No attachments. You mentioned "attached" in your message.</p>
  </div>
  <div class="actions">
    <button class="secondary">Edit Message</button>
    <button class="primary">Send Now</button>
  </div>
</dialog>`,
        explanation:
          'The undo window provides a safety net, but the pre-send review step surfaces key details (recipient count, missing attachments) that keep users attentive. The safety net exists without eliminating deliberate review.',
        principle:
          'Combine safety nets with lightweight review moments to prevent risk compensation from undermining careful behavior',
        metrics: {
          before: '4.2% of emails recalled within undo window (no review step)',
          after: '1.8% of emails recalled (with review step), 67% fewer "reply-all" mistakes',
          improvement: '57% reduction in emails needing undo, showing review prevented errors proactively',
        },
      },
      {
        title: 'Proportional Friction for Destructive Actions',
        description:
          'Graduated confirmation requirements based on action severity',
        code: `<!-- Low risk: single click, immediate undo -->
<div class="action-low-risk">
  <button class="delete-item">Remove item</button>
  <!-- On click: toast with "Undo" for 10 seconds -->
</div>

<!-- Medium risk: confirm dialog -->
<dialog class="action-medium-risk">
  <h3>Delete this project?</h3>
  <p>This will remove 23 files and 4 collaborators' access.</p>
  <p class="recovery-info">You can restore from trash for 30 days.</p>
  <div class="actions">
    <button class="secondary">Cancel</button>
    <button class="danger">Delete Project</button>
  </div>
</dialog>

<!-- High risk: type-to-confirm -->
<dialog class="action-high-risk">
  <h3>Permanently delete your account?</h3>
  <p>This will erase all data, subscriptions, and history. This cannot be undone.</p>
  <label>
    Type <strong>DELETE MY ACCOUNT</strong> to confirm:
    <input type="text" placeholder="Type here..." />
  </label>
  <button class="danger" disabled>Permanently Delete</button>
</dialog>`,
        explanation:
          'Friction scales with consequence severity. Low-risk actions remain fast with undo. High-risk actions require deliberate typed confirmation, ensuring the safety net of "trash" doesn\'t make users treat account deletion casually.',
        principle:
          'Match friction to risk level so safety features prevent carelessness proportionally',
      },
      {
        title: 'Honest Backup Status Communication',
        description:
          'Cloud backup indicator that communicates protection without false invulnerability',
        code: `<div class="backup-status">
  <div class="status-indicator protected">
    <span class="icon">&#9679;</span>
    <span class="label">Backed up</span>
    <span class="detail">Last backup: 12 min ago</span>
  </div>
  <div class="backup-details">
    <p class="caveat">Changes in the last 15 minutes may not be recoverable.</p>
    <p class="recovery-time">Full restore takes approximately 2-4 hours.</p>
  </div>
</div>

<style>
.backup-status {
  padding: var(--cg-space-3);
  border-left: 3px solid var(--cg-color-success-muted);
  background: var(--cg-color-surface-subtle);
}
.caveat {
  color: var(--cg-color-text-secondary);
  font-size: var(--cg-font-size-sm);
}
</style>`,
        explanation:
          'Shows backup protection honestly: yes, data is backed up, but recent changes may be lost, and recovery takes hours. This prevents the false assumption that "backups mean I never need to be careful."',
        principle:
          'Honest communication of safety limits maintains appropriate caution without undermining confidence',
      },
    ],

    bad: [
      {
        title: 'Invisible Auto-Save Creating False Security',
        description:
          'Auto-save with no visibility that trains users to never manually save or review',
        code: `<!-- DON'T DO THIS -->
<div class="editor">
  <!-- Auto-save runs silently every 2 seconds -->
  <!-- No save indicator, no version history, no checkpoint UI -->
  <!-- User has no idea when last save occurred -->
  <!-- User overwrites colleague's changes without knowing -->
  <div class="content" contenteditable="true">
    Document content here...
  </div>
</div>`,
        explanation:
          'Silent auto-save with zero visibility means users never think about saving, reviewing, or checkpointing. They overwrite others\' work, make sweeping changes without thinking, and assume everything is perfectly recoverable -- until it isn\'t.',
        principle:
          'Invisible safety nets eliminate all user awareness of risk, maximizing compensatory carelessness',
      },
      {
        title: 'Overpromising Recovery Capabilities',
        description:
          'Backup marketing that promises perfect, instant recovery',
        code: `<!-- DON'T DO THIS -->
<div class="backup-promo">
  <h2>Never Lose Anything, Ever!</h2>
  <p>Our AI-powered backup protects EVERY file, EVERY change,
     EVERY second. 100% recovery guaranteed!</p>
  <p>Delete whatever you want -- we've got your back!</p>
  <button class="primary">Enable Total Protection</button>
</div>`,
        explanation:
          'Promising 100% perfect recovery encourages users to treat all data as disposable. When the inevitable edge case occurs (corrupted backup, sync conflict, retention limit), users are devastated because they took zero precautions.',
        principle:
          'Overpromising safety directly amplifies risk compensation -- users calibrate carelessness to match promised protection',
      },
      {
        title: 'Warning Fatigue Through Over-Warning',
        description:
          'Every action triggers a safety warning, training users to dismiss them all',
        code: `<!-- DON'T DO THIS -->
<dialog class="confirm-dialog">
  <h3>Are you sure?</h3>
  <p>You are about to change the font size.</p>
  <button>Cancel</button>
  <button>Continue</button>
</dialog>

<!-- Same dialog for: changing font, moving a paragraph,
     adding an image, renaming a file, changing color,
     AND deleting the entire document -->`,
        explanation:
          'When every trivial action triggers the same confirmation dialog, users develop muscle memory to click "Continue" without reading. When a genuinely dangerous action uses the same dialog, they click through it just as reflexively.',
        principle:
          'Uniform warnings for all risk levels teach users to ignore all warnings, making high-risk actions feel as safe as low-risk ones',
      },
    ],

    realWorld: [
      {
        company: 'Volvo',
        product: 'ABS Braking Systems',
        description: 'When ABS brakes were introduced, studies found drivers followed more closely and braked later, consuming much of the safety benefit through riskier driving behavior. Accident rates did not drop as much as engineering improvements predicted.',
        effectiveness: 'somewhat-effective',
        analysis: 'The foundational real-world example of risk compensation. Engineering a safer car changed driver behavior in ways that offset safety gains. Modern adaptive cruise control faces similar challenges.',
      },
      {
        company: 'Google Docs',
        product: 'Real-Time Auto-Save + Version History',
        description: 'Google Docs auto-saves every keystroke and maintains full version history. This created a culture of "just type" where users rarely review before sharing. However, version history provides a visible recovery path that maintains some awareness.',
        effectiveness: 'effective',
        analysis: 'Google partially mitigates risk compensation by making version history visible and accessible. Users know they can recover, but they can also see the trail of changes, which creates some accountability.',
      },
      {
        company: 'GitHub',
        product: 'Branch Protection and Pull Reviews',
        description: 'GitHub prevents direct pushes to main branches, requiring pull requests and reviews. This safety measure could cause developers to be less careful in feature branches ("reviewers will catch it"), but the review process itself maintains quality by adding human checkpoints.',
        effectiveness: 'effective',
        analysis: 'By making the safety measure (branch protection) require active human participation (code review), GitHub converts a passive safety net into an active quality gate, reducing risk compensation.',
      },
      {
        company: 'Norton / McAfee',
        product: 'Antivirus Software',
        description: 'Studies show users with antivirus software installed are more likely to visit risky websites, download unverified files, and click suspicious links. The perceived protection from antivirus reduces cautious browsing behavior.',
        effectiveness: 'somewhat-effective',
        analysis: 'Antivirus is a textbook case of risk compensation in digital security. Users who feel "protected" take risks that antivirus cannot fully mitigate, such as phishing attacks and social engineering.',
      },
    ],

    abTests: [
      {
        title: 'Undo Availability: Silent vs Visible Recovery Window',
        hypothesis:
          'Making the undo time window visible will reduce impulsive destructive actions',
        controlVersion: {
          description:
            'Silent undo: after deleting files, a small "Undo" link appears with no timer indication. Users assume undo is always available.',
          metrics: {
            conversionRate: '34% of deletions were undone within 60 seconds',
            timeOnPage: 'Average 1.2 seconds between delete click and next action',
          },
        },
        treatmentVersion: {
          description:
            'Visible undo window: after deleting files, a toast shows "Undo available for 30 seconds" with a shrinking progress bar. After 30 seconds, toast disappears.',
          metrics: {
            conversionRate: '18% of deletions were undone',
            timeOnPage: 'Average 3.8 seconds between delete click and next action',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'When users could see the undo window shrinking, they paused to consider whether the deletion was correct. Fewer deletions needed undoing because users were more deliberate. The visible time limit prevented the assumption that undo was infinite.',
          learnings: [
            'Visible recovery limits reduce impulsive destructive behavior',
            'Users who see a countdown pause to evaluate their action',
            'Unlimited undo perception leads to higher rates of careless deletion',
            'The optimal undo window balances safety with appropriate urgency',
          ],
        },
      },
      {
        title: 'Backup Messaging: "Fully Protected" vs "Protected with Limits"',
        hypothesis:
          'Honest backup messaging will lead to better user data practices without reducing backup adoption',
        controlVersion: {
          description:
            'Backup promotion: "Your data is 100% protected. Never worry about losing files again!"',
          metrics: {
            conversionRate: '72% enabled backup',
            clickThroughRate: '23% of users maintained any local copies of important files',
          },
        },
        treatmentVersion: {
          description:
            'Backup promotion: "Your data is backed up every 15 minutes. Recent changes and files over 5GB require manual backup. Recovery takes 1-4 hours."',
          metrics: {
            conversionRate: '68% enabled backup',
            clickThroughRate: '61% of users maintained local copies of important files',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Honest messaging barely reduced backup adoption (68% vs 72%) but dramatically increased responsible data practices (61% vs 23% keeping local copies). When users understood backup limits, they maintained appropriate caution.',
          learnings: [
            'Honest safety messaging barely reduces feature adoption',
            'Users who understand limits maintain better personal safety practices',
            'Overpromising protection creates dangerous overconfidence',
            'Specific limitations (time window, size limit) are more effective than vague caveats',
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
        name: 'Invisible Safety Nets',
        description:
          'Auto-save, auto-backup, or undo features with no visible indicator of their presence or limits',
        howToSpot:
          'Check if the interface shows when last save occurred, what the undo window is, or what backup coverage exists',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uniform Confirmation Dialogs',
        description:
          'Same confirmation pattern used for trivial and critical actions, training dismissal',
        howToSpot:
          'Trigger various actions and check if confirmations vary by severity or are identical',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Overpromising Safety Copy',
        description:
          'Marketing or UI copy that promises perfect, unlimited, or instant recovery',
        howToSpot:
          'Look for "never lose", "100% protected", "always recoverable" language without caveats',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Friction Gradient',
        description:
          'Destructive actions require the same effort as non-destructive actions',
        howToSpot:
          'Compare the interaction cost of editing vs deleting, saving vs publishing, or creating vs destroying',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Impact Previews',
        description:
          'Destructive actions execute without showing what will be affected',
        howToSpot:
          'Check if bulk operations, deletions, or permission changes show scope before execution',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Silent Safety Net Pattern',
        description:
          'Safety features operate entirely in the background with no user-facing indicators',
        indicators: [
          'Auto-save with no visible save indicator',
          'Backup running without status display',
          'Undo available but not communicated',
          'Version history exists but is buried in menus',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Warning Fatigue Pattern',
        description:
          'Excessive or uniform warnings that train users to dismiss all confirmations',
        indicators: [
          'Same dialog for trivial and critical actions',
          'Generic "Are you sure?" without specific consequences',
          'More than 3 warnings in a typical workflow',
          'No visual distinction between warning severity levels',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'False Invulnerability Pattern',
        description:
          'UI messaging that creates perception of complete, unlimited protection',
        indicators: [
          '"100% protected" or "never lose data" claims',
          'No mention of recovery time, limits, or exclusions',
          'Security status shown as binary (safe/unsafe) without nuance',
          'Backup indicators showing only "protected" without details',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Flat Friction Pattern',
        description:
          'All actions require the same interaction cost regardless of consequence',
        indicators: [
          'One-click delete for both single items and entire collections',
          'Same button style for save and publish',
          'No additional confirmation for irreversible vs reversible actions',
          'Bulk operations as easy as single-item operations',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users see when their work was last saved or backed up?',
      'Do destructive actions require more effort than non-destructive ones?',
      'Are confirmation dialogs differentiated by severity level?',
      'Does the UI communicate recovery limitations honestly?',
      'Are warnings reserved for genuinely dangerous actions?',
      'Do bulk operations show impact previews before execution?',
      'Is there a visible undo window with a clear time limit?',
      'Does safety messaging avoid overpromising protection?',
      'Are high-risk actions visually distinguished from low-risk actions?',
      'Do safety features maintain user awareness without creating anxiety?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in risk compensation (the Peltzman Effect).

Analyze the provided design for risk compensation patterns. Identify:

1. **Safety Net Visibility**: Are auto-save, undo, backup, or recovery features visible or hidden?
2. **Friction Gradient**: Do destructive actions require more effort than non-destructive ones?
3. **Warning Calibration**: Are warnings differentiated by severity or uniform?
4. **Recovery Messaging**: Does the UI honestly communicate recovery limitations?
5. **Behavioral Incentives**: Do safety features inadvertently encourage careless behavior?

For each pattern found:
- Identify the safety feature and how it might trigger risk compensation
- Assess whether the design maintains appropriate user caution
- Determine if warnings are calibrated to action severity
- Evaluate whether recovery promises match actual capability
- Suggest improvements for balancing safety with awareness

Consider:
- Are invisible safety nets removing all incentive for careful behavior?
- Do uniform warnings train users to dismiss critical alerts?
- Does the messaging overpromise protection or recovery?
- Is friction proportional to the risk of each action?
- How do power users vs novices experience safety features differently?

Provide actionable recommendations for safety features that protect without breeding recklessness.`,

    outputSchema: {
      type: 'object',
      properties: {
        riskCompensationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              safetyFeature: { type: 'string' },
              compensatoryRisk: { type: 'string' },
              location: { type: 'string' },
              severity: { type: 'string' },
              userAwarenessLevel: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'safetyFeature',
              'compensatoryRisk',
              'location',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            safetyNetVisibility: { type: 'number' },
            frictionGradient: { type: 'number' },
            warningCalibration: { type: 'number' },
            recoveryHonesty: { type: 'number' },
          },
          required: [
            'safetyNetVisibility',
            'frictionGradient',
            'warningCalibration',
            'recoveryHonesty',
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
        'riskCompensationPatterns',
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
        title: 'Audit Your Safety Features',
        description:
          'Identify all safety nets in your product: undo, auto-save, backup, version history, trash, recovery tools',
        example:
          'Map: auto-save (every 10s), undo (unlimited), trash (30 days), backup (daily), version history (90 days)',
        tips: [
          'List every feature that reduces the consequence of user mistakes',
          'Note which are visible to users and which are invisible',
          'Identify where safety features might encourage carelessness',
        ],
      },
      {
        step: 2,
        title: 'Classify Actions by Risk Level',
        description:
          'Categorize all user actions into risk tiers: low (easily reversible), medium (recoverable with effort), high (irreversible or costly)',
        example:
          'Low: edit text, move item. Medium: delete file, change permissions. High: delete account, publish to production, bulk delete.',
        tips: [
          'Consider both direct impact and blast radius',
          'Account for whether undo/recovery exists for each action',
          'Factor in the user\'s likely intent and frequency of mistakes',
        ],
      },
      {
        step: 3,
        title: 'Design Proportional Friction',
        description:
          'Match confirmation effort to risk level -- frictionless for low-risk, deliberate for high-risk',
        example:
          'Low: immediate action + undo toast. Medium: confirm dialog with impact summary. High: type-to-confirm with cooling period.',
        tips: [
          'Never use the same confirmation for all risk levels',
          'Include specific impact details, not generic "Are you sure?"',
          'Make friction informative, not merely obstructive',
        ],
      },
      {
        step: 4,
        title: 'Communicate Safety Limits Honestly',
        description:
          'Show what safety features protect and what they do not, including time windows and recovery costs',
        example:
          'Show "Auto-saved 30 seconds ago. Undo available for 10 more seconds. Backup runs nightly."',
        tips: [
          'State recovery time windows explicitly',
          'Mention exclusions or limitations of backup/recovery',
          'Avoid absolute promises like "never lose data"',
        ],
      },
      {
        step: 5,
        title: 'Make Safety State Visible',
        description:
          'Surface safety indicators (save status, backup status, undo availability) in the UI without interrupting workflow',
        example:
          'Persistent status bar showing "All changes saved" or "Unsaved changes (auto-save in 5s)"',
        tips: [
          'Use subtle, persistent indicators rather than modal interruptions',
          'Show timestamps for last save and backup',
          'Differentiate between "saved locally" and "backed up remotely"',
        ],
      },
      {
        step: 6,
        title: 'Monitor and Adjust',
        description:
          'Track whether safety features are changing user behavior and adjust friction accordingly',
        example:
          'Measure: undo usage rate, deletion frequency, error recovery requests, data loss incidents',
        tips: [
          'High undo rates may indicate users are being too impulsive',
          'Low undo rates after adding friction indicate improved deliberateness',
          'Watch for user complaints about excessive friction and calibrate',
        ],
      },
    ],

    dos: [
      'Show safety feature status (last save time, backup state, undo window) persistently in the UI',
      'Scale friction proportionally to action severity',
      'Use specific impact previews before destructive actions ("This will affect 47 users")',
      'Communicate recovery limitations honestly (time, coverage, exclusions)',
      'Reserve prominent warnings for genuinely critical actions',
      'Provide undo with visible time windows rather than infinite silent undo',
      'Use distinct visual treatments for different warning severity levels',
      'Allow users to create intentional checkpoints alongside auto-save',
    ],

    donts: [
      'Don\'t make all safety features invisible -- users need awareness to maintain appropriate caution',
      'Don\'t use the same confirmation dialog for trivial and critical actions',
      'Don\'t promise "100% protection" or "never lose data" when limitations exist',
      'Don\'t show warnings for low-risk actions -- it trains users to ignore all warnings',
      'Don\'t make destructive actions as easy as non-destructive ones',
      'Don\'t hide recovery limitations in fine print or terms of service',
      'Don\'t assume safety features will change user behavior for the better',
      'Don\'t add friction without providing information -- friction should educate, not just obstruct',
    ],

    bestPractices: [
      {
        title: 'Proportional Friction',
        description:
          'Match the interaction cost of an action to its consequence severity',
        rationale:
          'When delete is as easy as edit, users don\'t distinguish between them. Graduated friction maintains awareness proportional to risk.',
        example:
          'Single click for reversible edits, confirm dialog for file deletion, type-to-confirm for account deletion',
      },
      {
        title: 'Visible Recovery Windows',
        description:
          'Show undo availability with explicit time limits or scope boundaries',
        rationale:
          'Invisible, unlimited undo creates false perception of zero consequence. Visible limits maintain appropriate caution.',
        example:
          'Toast: "Message sent. Undo (5s remaining)" with shrinking progress bar',
      },
      {
        title: 'Impact Previews',
        description:
          'Before destructive actions, show exactly what will be affected',
        rationale:
          'Abstract warnings ("Are you sure?") are ignored. Specific impact data ("247 files, 12 collaborators affected") prompts genuine consideration.',
        example:
          'Delete project dialog showing file count, collaborator count, and affected integrations',
      },
      {
        title: 'Tiered Warning System',
        description:
          'Use visually distinct treatments for info, caution, warning, and danger levels',
        rationale:
          'Uniform warnings train dismissal. Distinct severity levels preserve the signal value of critical warnings.',
        example:
          'Blue info for advisory, yellow for caution, orange for warning, red for danger -- each with unique icon and layout',
      },
      {
        title: 'Honest Safety Communication',
        description:
          'State what safety features cover and what they don\'t, including recovery time and effort',
        rationale:
          'Users calibrate their caution to their belief about safety. Honest communication maintains realistic caution without creating anxiety.',
        example:
          '"Backups run every 6 hours. Changes in the last 6 hours require manual export to recover."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) - For pages that cause legal commitments or financial transactions, submissions are reversible, checked, or confirmed',
        implementation:
          'Implement confirmation steps for destructive or high-stakes actions with clear impact summaries readable by screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Status messages can be programmatically determined without receiving focus',
        implementation:
          'Use ARIA live regions for auto-save status, undo availability, and backup state announcements',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Color is not used as the only visual means of conveying information',
        implementation:
          'Combine color with icons, text labels, and ARIA roles to communicate warning severity levels',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Headings and labels describe topic or purpose',
        implementation:
          'Use descriptive headings in confirmation dialogs that state the specific action and consequence, not generic "Are you sure?"',
      },
    ],

    ethics: [
      {
        concern: 'False Safety Promises',
        severity: 'critical',
        explanation:
          'Promising perfect protection that doesn\'t exist causes users to abandon all personal precautions',
        mitigation:
          'State recovery capabilities honestly, including time windows, coverage gaps, and effort required. Never claim 100% protection.',
      },
      {
        concern: 'Weaponized Friction',
        severity: 'high',
        explanation:
          'Using excessive friction on cancellation or downgrade actions while keeping upgrade frictionless is manipulative',
        mitigation:
          'Apply friction based on consequence severity, not business preference. Cancellation friction should match upgrade friction.',
      },
      {
        concern: 'Warning Desensitization',
        severity: 'high',
        explanation:
          'Deliberately overusing warnings to desensitize users, then presenting a critical action with the same warning pattern',
        mitigation:
          'Reserve warnings for genuinely risky actions. Use tiered severity with distinct visual treatments.',
      },
      {
        concern: 'Asymmetric Safety Information',
        severity: 'medium',
        explanation:
          'Prominently displaying safety features during onboarding but hiding their limitations in fine print',
        mitigation:
          'Present safety capabilities and limitations together. Make limitation information as accessible as feature promotion.',
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
        description:
          'The foundational paper demonstrating that auto safety regulations led to offsetting behavioral changes in drivers',
        type: 'foundational',
      },
      {
        title: 'The Theory of Risk Homeostasis: Implications for Safety and Health',
        author: 'Wilde, Gerald J.S.',
        year: 1982,
        doi: '10.2190/56GE-KN5C-EM5B-NHBR',
        description:
          'Expanded risk compensation into a general theory of risk homeostasis, proposing that people maintain a target level of acceptable risk',
        type: 'foundational',
      },
      {
        title: 'Risk Compensation and Bicycle Helmets',
        author: 'Adams, John',
        year: 1995,
        description:
          'Analysis of how bicycle helmet laws affected cycling behavior, finding evidence of risk compensation in helmet-wearing cyclists',
        type: 'case-study',
      },
      {
        title: 'The Effect of Mandatory Seatbelt Laws on Driving Behavior and Traffic Fatalities',
        author: 'Cohen, A., & Einav, L.',
        year: 2003,
        doi: '10.1162/003465303322369834',
        description:
          'Modern analysis confirming Peltzman\'s findings with updated data on seatbelt laws and driving behavior',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Risk',
        author: 'Adams, John',
        year: 1995,
        isbn: '9781857280685',
        description:
          'Comprehensive treatment of risk compensation theory with examples from traffic safety, public health, and policy',
        type: 'foundational',
      },
      {
        title: 'Target Risk 2: A New Psychology of Safety and Health',
        author: 'Wilde, Gerald J.S.',
        year: 2001,
        isbn: '9780969912408',
        description:
          'Updated theory of risk homeostasis with practical implications for safety design and policy',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Broader context for risk-related cognitive biases including risk perception and decision-making under uncertainty',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Peltzman Effect and the Design of Safer Products',
        author: 'Design Research Society',
        url: 'https://www.designresearchsociety.org/',
        description:
          'How product designers can account for risk compensation when designing safety features',
        type: 'practical',
      },
      {
        title: 'Does Antivirus Software Make Users Less Careful?',
        author: 'Security Research Group',
        url: 'https://www.usenix.org/',
        description:
          'Research on risk compensation in digital security contexts',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Peltzman Effect: Why Safety Measures Can Backfire',
        author: 'Economics Explained',
        url: 'https://www.youtube.com/results?search_query=peltzman+effect',
        description:
          'Accessible explanation of risk compensation with real-world examples from traffic safety',
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
      'overconfidence-bias', // Feeling protected amplifies existing overconfidence
      'optimism-bias', // Safety nets feed "it won't happen to me" thinking
      'moral-licensing', // "I was safe before, so I can take a risk now"
      'habituation', // Repeated safety leads to ignoring underlying risks
    ],

    conflicts: [
      'loss-aversion', // Fear of loss can override risk compensation
      'status-quo-bias', // Preferring inaction can resist risky behavior changes
    ],

    confusedWith: [
      'moral-hazard', // Related but moral hazard involves asymmetric information between parties
      'overconfidence-bias', // Overlaps but overconfidence is broader than safety-induced risk-taking
      'normalcy-bias', // Both involve underestimating risk, but through different mechanisms
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'peltzman-effect',
        'safety-paradox',
        'warning-fatigue',
      ],
    },
  },
};
