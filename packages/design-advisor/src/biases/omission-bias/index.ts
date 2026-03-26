/**
 * OMISSION BIAS
 *
 * We judge harmful actions as worse than equally harmful inactions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const omissionBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'omission-bias',
    name: 'Omission Bias',
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
    simple: 'We judge harmful actions as worse than equally harmful inactions',

    detailed: `Omission Bias is a cognitive tendency to judge harmful actions as worse than equally harmful inactions (failures to act). People perceive doing something that causes harm as morally worse than failing to do something that causes the same harm. Inaction feels safer, even when its consequences are identical or worse than acting.

This bias plays a central role in how users interact with defaults, opt-in systems, and decision prompts in digital interfaces. When a product requires users to actively choose something beneficial (opt-in), many will fail to act -- not because they reject the benefit, but because doing nothing feels psychologically safer than doing something.

In UX and product design, omission bias explains why opt-out systems dramatically outperform opt-in systems for beneficial features, why users avoid updating software even when updates are critical, and why passive enrollment in good defaults consistently produces better outcomes than requiring active choice. Designers who understand this bias can structure choices so that inaction leads to the best outcome for users.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `People systematically judge harmful actions as worse than equally harmful omissions because of several interacting cognitive mechanisms:

1. **Causal Attribution Asymmetry**: Actions are seen as direct causes of outcomes, while omissions are perceived as merely allowing outcomes to happen -- even when the result is identical
2. **Responsibility Deflection**: Inaction feels less blameworthy because the person can attribute the outcome to external factors rather than their own choice
3. **Loss Aversion Interaction**: Acting and getting a bad result feels like a self-inflicted loss, while not acting and getting a bad result feels like fate or bad luck
4. **Status Quo Preference**: Doing nothing preserves the current state, which feels inherently safer than changing it
5. **Regret Anticipation**: People anticipate more regret from bad outcomes caused by action than from equally bad outcomes caused by inaction

This mechanism operates automatically -- people are typically unaware that they are applying different moral standards to acts versus omissions with identical consequences.`,
    },

    realWorldExample: `In vaccination research, parents who chose not to vaccinate their children (omission) judged themselves as less responsible for negative outcomes than parents whose children were harmed by the vaccine itself (action), even when the statistical risks of not vaccinating were far greater. A child harmed by a disease due to non-vaccination was seen as less the parent's fault than a child who experienced a rare vaccine side effect -- despite the omission producing objectively worse expected outcomes. This asymmetry in blame assignment is a textbook demonstration of omission bias.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Omission bias profoundly affects how users engage with defaults, opt-in systems, enrollment flows, and update prompts. Because users perceive inaction as safer than action, they systematically under-adopt beneficial features that require active opt-in. Designers can leverage this understanding to:

- Structure defaults so that inaction leads to the best outcome for users
- Use opt-out rather than opt-in for genuinely beneficial features
- Reduce action barriers for security updates, backups, and protective features
- Frame choices so that the safe path requires no active decision
- Design auto-enrollment for features where user benefit is clear and unambiguous`,

    whenToUse: [
      {
        title: 'Opt-Out for Beneficial Defaults',
        scenario:
          'When enrolling users in features that are clearly in their interest (security, backups, privacy)',
        example:
          'Auto-enable two-factor authentication for new accounts with an opt-out option, rather than requiring users to actively enable it',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Auto-Update Systems',
        scenario: 'When distributing security patches and critical software updates',
        example:
          'Default to automatic updates so that inaction keeps users protected, with an option to switch to manual updates',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Passive Saving and Backup',
        scenario: 'When protecting user data from accidental loss',
        example:
          'Auto-save documents continuously so users never need to remember to save -- inaction equals safety',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Privacy-Preserving Defaults',
        scenario: 'When configuring data sharing and privacy settings for new users',
        example:
          'Default to maximum privacy so that users who do nothing get the most protective settings',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Adoption Nudges',
        scenario: 'When encouraging users to try beneficial but unfamiliar features',
        example:
          'Pre-activate helpful integrations during onboarding with clear opt-out, rather than burying them behind an opt-in toggle',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Costly or Irreversible Actions',
        reason:
          'Auto-enrolling users in paid features or irreversible changes exploits omission bias unethically',
        consequence:
          'Users feel trapped and lose trust when they discover they were charged or committed without active consent',
        alternative:
          'Require explicit opt-in for anything with financial cost or irreversible consequences',
      },
      {
        title: 'Data Collection and Sharing',
        reason:
          'Using opt-out for data harvesting takes advantage of user inertia rather than genuine consent',
        consequence:
          'Regulatory violations (GDPR, CCPA), erosion of trust, and reputational damage',
        alternative:
          'Use clear, informed opt-in for data collection; make the consent genuinely affirmative',
      },
      {
        title: 'Subscription Upsells',
        reason:
          'Auto-enrolling users in premium tiers or add-ons during checkout is manipulative',
        consequence:
          'Chargebacks, negative reviews, and regulatory action against dark patterns',
        alternative:
          'Present upsells clearly as optional choices requiring active selection',
      },
      {
        title: 'High-Stakes Decisions',
        reason:
          'Medical, legal, or financial decisions should never rely on default inaction',
        consequence:
          'Users may end up in inappropriate treatments, contracts, or investments through inertia',
        alternative:
          'Require deliberate, informed active choice for all high-stakes decisions',
      },
    ],

    commonMistakes: [
      {
        title: 'Requiring Opt-In for Security Features',
        description:
          'Making users actively enable critical security features like 2FA, encryption, or auto-lock',
        why: 'Omission bias means most users will never take the action, leaving themselves vulnerable',
        fix: 'Enable security features by default; let users opt out if they choose to accept the risk',
      },
      {
        title: 'Manual Save as Default',
        description:
          'Requiring users to remember to save their work instead of auto-saving continuously',
        why: 'Users assume inaction is safe and will lose work when they forget to actively save',
        fix: 'Implement auto-save as the default behavior with version history for recovery',
      },
      {
        title: 'Burying Beneficial Features Behind Active Steps',
        description:
          'Hiding valuable features behind multi-step activation flows that most users never complete',
        why: 'Each additional step compounds the omission bias -- users abandon when action is required',
        fix: 'Pre-activate beneficial features and provide a simple toggle to disable if unwanted',
      },
      {
        title: 'Treating Inaction as Informed Rejection',
        description:
          'Interpreting a user who never opted in as someone who evaluated and rejected the feature',
        why: 'Most non-adoption is passive omission, not active rejection -- users never even considered it',
        fix: 'Re-prompt periodically with clear value explanations; distinguish non-response from rejection',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether beneficial actions are prominent or buried, directly affecting whether users take action or remain passive',
        examples: [
          'Default toggle positions (on vs off) shape whether inaction is helpful or harmful',
          'Placement of update prompts determines whether users act or dismiss',
          'Progressive disclosure can hide beneficial features behind action barriers',
          'Settings pages that bury security options make beneficial action less likely',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing of action vs inaction shapes how users perceive the safety of doing nothing',
        examples: [
          'Framing "Enable protection" (requires action) vs "Protection is on" (default safe) changes behavior',
          'Warning text size and weight affect whether users perceive inaction as risky',
          'Button label wording ("Skip" vs "Not now" vs "I accept the risk") changes omission perception',
          'Microcopy that normalizes inaction ("Most users skip this") amplifies omission bias',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color cues signal whether inaction is safe or dangerous, influencing passive user behavior',
        examples: [
          'Green default states signal "inaction is safe" -- appropriate when defaults are protective',
          'Red warning states on inactive features signal that omission carries risk',
          'Muted opt-in buttons reduce perceived urgency of taking action',
          'Color-coded risk indicators help users understand the cost of inaction',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines the action cost of beneficial behaviors and directly shapes omission patterns',
        examples: [
          'Auto-enrollment vs manual enrollment is the single biggest omission bias lever',
          'Number of clicks required to enable protection features affects adoption dramatically',
          'Dismiss-by-ignoring (timeout closes prompt) reinforces omission as acceptable',
          'Friction in opting out of harmful defaults exploits omission bias unethically',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users understand the consequences of inaction',
        examples: [
          'Showing concrete outcomes of inaction ("Your data is unprotected") motivates action',
          'Framing inaction as a choice ("You are choosing to skip backup") reduces omission bias',
          'Comparing action vs inaction outcomes side-by-side helps users evaluate properly',
          'Stories about consequences of omission make the cost of inaction vivid and real',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible defaults are especially important because users with disabilities face higher action costs',
        examples: [
          'Screen reader users may miss opt-in prompts entirely, making good defaults essential',
          'Motor-impaired users face higher costs for each action step, amplifying omission bias',
          'Cognitive accessibility requires that beneficial defaults work without requiring complex decisions',
          'Auto-enrollment reduces the action burden for all users, disproportionately helping those with disabilities',
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
        title: 'Auto-Update with Opt-Out',
        description:
          'Operating system that enables automatic security updates by default',
        code: `<div class="update-settings">
  <h3>Security Updates</h3>
  <div class="setting-row">
    <div class="setting-info">
      <label for="auto-update">Automatic security updates</label>
      <p class="description">Critical patches are installed automatically to keep you protected.</p>
      <p class="status safe">Your system is up to date and protected.</p>
    </div>
    <input type="checkbox" id="auto-update" checked role="switch" aria-label="Automatic updates enabled">
  </div>
  <p class="note">You can switch to manual updates, but you'll need to install patches yourself.</p>
</div>`,
        explanation:
          'By defaulting to auto-updates, users who do nothing (omission) remain protected. The toggle is on by default, and the green status reinforces that inaction equals safety. Users can opt out, but the default path is the safe path.',
        principle:
          'Design so that inaction leads to the safest outcome for the user',
        metrics: {
          before: '38% of users had current security patches with manual opt-in updates',
          after: '94% of users had current security patches with auto-update default',
          improvement: '147% increase in security patch coverage',
        },
      },
      {
        title: 'Continuous Auto-Save',
        description:
          'Document editor that saves work automatically without user intervention',
        code: `<div class="document-header">
  <h1 contenteditable="true">Untitled Document</h1>
  <div class="save-status">
    <span class="auto-save-indicator">
      <svg class="check-icon" aria-hidden="true"><!-- checkmark --></svg>
      All changes saved
    </span>
    <span class="save-detail">Last saved 2 seconds ago</span>
  </div>
</div>
<div class="version-history">
  <button class="link-button">View version history (47 auto-saved versions)</button>
</div>`,
        explanation:
          'Auto-save means users never need to take action to protect their work. The status indicator confirms that inaction is safe. Version history provides a safety net without requiring any active behavior from the user.',
        principle:
          'Passive safety features eliminate the cost of user inaction',
      },
      {
        title: 'Pre-Activated Backup with Opt-Out',
        description:
          'Cloud storage service that enables backup by default during setup',
        code: `<div class="onboarding-step">
  <h2>Your files are automatically backed up</h2>
  <p>We've enabled continuous backup for your important folders:</p>
  <ul class="backup-list">
    <li class="backed-up"><span class="icon-shield"></span> Documents <span class="badge">Protected</span></li>
    <li class="backed-up"><span class="icon-shield"></span> Photos <span class="badge">Protected</span></li>
    <li class="backed-up"><span class="icon-shield"></span> Desktop <span class="badge">Protected</span></li>
  </ul>
  <p class="reassurance">If anything happens to your device, your files are safe in the cloud.</p>
  <div class="actions">
    <button class="primary">Continue</button>
    <button class="text-link">Customize backup settings</button>
  </div>
</div>`,
        explanation:
          'Backup is already active -- the user just needs to continue. Doing nothing (clicking Continue) means protection is maintained. The customize link is available but secondary, so users who would otherwise never set up backup are still protected.',
        principle:
          'Auto-enrollment in protective features leverages omission bias for user benefit',
        metrics: {
          before: '23% of users manually enabled backup when presented as opt-in',
          after: '89% of users retained backup when presented as pre-activated default',
          improvement: '287% increase in backup adoption',
        },
      },
    ],

    bad: [
      {
        title: 'Opt-In Required for Critical Security',
        description:
          'Email service requiring users to actively enable encryption',
        code: `<!-- DON'T DO THIS -->
<div class="settings-panel">
  <h3>Security Settings</h3>
  <div class="setting-row">
    <label>
      <input type="checkbox" name="encryption">
      Enable email encryption
    </label>
    <p class="help-text">Encrypt your emails for added security.</p>
  </div>
  <div class="setting-row">
    <label>
      <input type="checkbox" name="2fa">
      Enable two-factor authentication
    </label>
    <p class="help-text">Add an extra layer of security to your account.</p>
  </div>
  <div class="setting-row">
    <label>
      <input type="checkbox" name="breach-alerts">
      Enable breach alerts
    </label>
    <p class="help-text">Get notified if your credentials appear in a data breach.</p>
  </div>
</div>`,
        explanation:
          'Every security feature is off by default and requires the user to actively enable it. Omission bias means most users will do nothing, leaving themselves unprotected. The unchecked checkboxes make inaction feel like the normal, safe choice.',
        principle:
          'Never make users opt in to their own protection -- inaction should equal safety',
      },
      {
        title: 'Manual Save as Only Option',
        description:
          'Application that requires explicit save action with no auto-save',
        code: `<!-- DON'T DO THIS -->
<div class="toolbar">
  <button class="save-button" title="Save (Ctrl+S)">
    <span class="icon-save"></span> Save
  </button>
  <span class="unsaved-indicator">Unsaved changes</span>
</div>
<div class="warning-banner">
  <p>Warning: Your changes are not saved. Click Save to keep your work.</p>
</div>`,
        explanation:
          'Requiring explicit save action means that user inaction (forgetting to save) leads to data loss. The warning banner tries to compensate but adds cognitive load rather than solving the root problem. The design punishes passive users instead of protecting them.',
        principle:
          'If inaction leads to harm, the default is wrong',
      },
      {
        title: 'Beneficial Feature Buried Behind Multiple Steps',
        description:
          'Password manager auto-fill requiring complex multi-step activation',
        code: `<!-- DON'T DO THIS -->
<div class="feature-activation">
  <h3>Enable Auto-Fill</h3>
  <p>To use auto-fill, complete these steps:</p>
  <ol class="activation-steps">
    <li>Go to Settings > Extensions > Password Manager</li>
    <li>Click "Enable Auto-Fill"</li>
    <li>Grant browser permissions</li>
    <li>Verify your identity</li>
    <li>Select which sites to auto-fill</li>
    <li>Confirm your selection</li>
  </ol>
  <button class="primary">Start Setup</button>
</div>`,
        explanation:
          'Six steps to activate a feature that benefits the user. Each step is an opportunity for omission -- users will abandon the process and never enable auto-fill. The feature should be active by default with a simple toggle to disable.',
        principle:
          'Every action step you add multiplies the omission rate -- minimize steps for beneficial features',
      },
    ],

    realWorld: [
      {
        company: 'Microsoft',
        product: 'Windows Update',
        url: 'https://www.microsoft.com/en-us/windows',
        description:
          'Windows defaults to automatic updates, installing security patches without user intervention. Users who do nothing stay protected. Microsoft shifted from opt-in updates (Windows XP era) to auto-updates after observing that most users never manually updated, leaving millions of systems vulnerable.',
        effectiveness: 'very-effective',
        analysis:
          'By making inaction equal protection, Microsoft dramatically increased patch adoption. The shift from opt-in to auto-update is one of the most impactful applications of omission bias awareness in software history, reducing the window of vulnerability for billions of devices.',
      },
      {
        company: 'Apple',
        product: 'iOS Privacy Prompts',
        url: 'https://www.apple.com/privacy/',
        description:
          'iOS defaults to blocking app tracking. Apps must explicitly ask permission to track, and the default action (ignoring or declining) preserves privacy. The prompt is framed so that the passive choice ("Ask App Not to Track") is the protective one.',
        effectiveness: 'very-effective',
        analysis:
          'Apple leverages omission bias ethically: inaction equals privacy. Over 80% of users choose not to allow tracking when prompted, largely because the default framing makes omission (not allowing) feel like the natural, safe choice.',
      },
      {
        company: 'Google',
        product: 'Google Docs Auto-Save',
        url: 'https://docs.google.com',
        description:
          'Google Docs saves every keystroke automatically. There is no save button. Users cannot lose work through inaction because the system handles persistence passively. Version history is maintained automatically.',
        effectiveness: 'very-effective',
        analysis:
          'By eliminating the need for active saving entirely, Google Docs removed the most common cause of data loss in document editing. The design makes omission impossible to punish because the system acts for the user continuously.',
      },
      {
        company: '1Password',
        product: 'Password Manager Auto-Fill',
        url: 'https://1password.com',
        description:
          'After initial setup, 1Password auto-fills credentials without requiring the user to take action on each login. The passive behavior (auto-fill happening automatically) is the secure behavior. Users only need to act if they want to override.',
        effectiveness: 'effective',
        analysis:
          'Auto-fill means inaction equals secure authentication. Users who do nothing get strong, unique passwords. The design eliminates the friction that would otherwise cause users to fall back on weak, reused passwords.',
      },
    ],

    abTests: [
      {
        title: 'Security Feature: Opt-In vs Opt-Out Default',
        hypothesis:
          'Defaulting 2FA to enabled (opt-out) will dramatically increase adoption compared to opt-in',
        controlVersion: {
          description:
            'Account settings page with 2FA as an unchecked checkbox requiring users to actively enable it, with a brief description of benefits',
          metrics: {
            conversionRate: '11%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Account settings page with 2FA pre-enabled by default, with a clear option to disable and an explanation of why it is on',
          metrics: {
            conversionRate: '76%',
            clickThroughRate: '8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Pre-enabling 2FA increased adoption from 11% to 76% -- a 591% increase. Only 8% of users actively disabled it when presented as a default. The vast majority of non-adopters in the control group were passive omitters, not active rejecters.',
          learnings: [
            'The gap between opt-in and opt-out adoption for beneficial features is enormous',
            'Most users who fail to adopt security features are passive, not opposed',
            'Framing the default as "already protecting you" reduces opt-out rates further',
            'Users who were auto-enrolled reported equal or higher satisfaction than those who opted in manually',
          ],
        },
      },
      {
        title: 'Backup Feature: Active Setup vs Pre-Activated Default',
        hypothesis:
          'Pre-activating cloud backup will increase adoption compared to requiring manual setup',
        controlVersion: {
          description:
            'Onboarding flow with a "Set up cloud backup" button that opens a multi-step configuration wizard',
          metrics: {
            conversionRate: '19%',
            timeOnPage: '4:12',
          },
        },
        treatmentVersion: {
          description:
            'Onboarding flow showing backup as already active with pre-selected folders, and a "Customize" link for users who want changes',
          metrics: {
            conversionRate: '87%',
            timeOnPage: '0:45',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Pre-activated backup increased retention from 19% to 87%. Users spent far less time on the page because they did not need to take action. Support tickets for data loss dropped 64% in the treatment group.',
          learnings: [
            'Pre-activation eliminates the decision cost that causes most users to omit',
            'Users who customized the pre-activated defaults (12%) were more engaged than opt-in users',
            'The biggest predictor of feature adoption is whether inaction leads to adoption or non-adoption',
            'Support cost reduction from fewer data loss incidents justified the engineering investment',
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
        name: 'Unchecked Opt-In Toggles',
        description:
          'Beneficial features presented as unchecked checkboxes or disabled toggles requiring user action to enable',
        howToSpot:
          'Look for security, privacy, or protective features that default to off and require active enabling',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Multi-Step Activation Flows',
        description:
          'Beneficial features that require multiple steps, clicks, or configuration before they become active',
        howToSpot:
          'Count the number of actions required to enable protective or helpful features -- each step multiplies omission rate',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Manual Save Indicators',
        description:
          'Interfaces showing "Unsaved changes" warnings or requiring explicit save actions for persistent data',
        howToSpot:
          'Look for save buttons, unsaved-changes warnings, or "Remember to save" prompts -- these signal punishing inaction design',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Passive Dismiss Patterns',
        description:
          'Update or security prompts that disappear on timeout or can be dismissed by simply ignoring them',
        howToSpot:
          'Check whether ignoring a beneficial prompt is treated the same as actively declining it -- dismiss-by-timeout reinforces harmful omission',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Action vs Inaction Framing',
        description:
          'Button labels and copy that frame the beneficial choice as requiring action while the risky choice is passive',
        howToSpot:
          'Look for asymmetry: "Enable now" (action required for safety) vs "Remind me later" (inaction accepted) -- the safe path should be the passive one',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Opt-In Gate Pattern',
        description: 'Beneficial features gated behind active opt-in, causing most users to never adopt',
        indicators: [
          'Security or privacy features defaulting to off',
          'Unchecked checkboxes for protective settings',
          'Setup wizards required before features activate',
          '"Enable" buttons for features that should be on by default',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Inaction-Punishing Default Pattern',
        description: 'System designs where user inaction leads to negative outcomes (data loss, security exposure)',
        indicators: [
          'Manual save required for data persistence',
          'Security patches require active installation',
          'Protective features degrade or expire without user action',
          'Important settings reset to unsafe defaults over time',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Dismiss-and-Forget Pattern',
        description: 'Important prompts that can be permanently dismissed through inaction, with no follow-up',
        indicators: [
          'Update prompts with "Remind me later" that never remind again',
          'One-time security warnings that disappear if ignored',
          'Onboarding steps that are skippable and never re-surface',
          'Feature announcements that appear once and vanish',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Asymmetric Action Cost Pattern',
        description: 'Designs where the risky choice requires less effort than the safe choice',
        indicators: [
          'More clicks to enable protection than to skip it',
          'Complex forms for opting in vs single click to decline',
          'Safe option buried in settings while risky option is one tap away',
          'Confirmation required for beneficial action but not for risky inaction',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What happens when a user does nothing? Is the default state protective or risky?',
      'Are beneficial features (security, backup, privacy) opt-in or opt-out?',
      'How many steps are required to activate protective features?',
      'Does ignoring a prompt lead to a safe or unsafe outcome?',
      'Is the "do nothing" path the same as the "best outcome" path?',
      'Are update or security prompts dismissible with no follow-up?',
      'Does the interface punish inaction (data loss, exposure) or protect passive users?',
      'Is there asymmetry in action cost between safe and risky choices?',
      'Are users who never configure settings still protected by good defaults?',
      'Would a completely passive user have a safe, functional experience?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in omission bias.

Analyze the provided design for omission bias patterns. Identify:

1. **Default States**: Are defaults protective or risky? What happens when users do nothing?
2. **Opt-In vs Opt-Out**: Are beneficial features gated behind active opt-in?
3. **Action Cost Asymmetry**: Is it easier to skip beneficial features than to enable them?
4. **Inaction Consequences**: Does user inaction lead to negative outcomes (data loss, security exposure)?
5. **Dismiss Patterns**: Can important prompts be permanently ignored through inaction?

For each pattern found:
- Identify whether inaction leads to a good or bad outcome for the user
- Assess whether the default state serves user interests
- Determine if action costs are appropriately distributed (safe path should be easy)
- Evaluate whether the design exploits or mitigates omission bias
- Suggest improvements to make inaction lead to the best user outcome

Consider:
- Would a completely passive user be protected and well-served?
- Are users being punished for natural human tendency toward inaction?
- Do defaults reflect user benefit or business benefit?
- Is there asymmetry between action cost for safe vs risky choices?
- Are beneficial features adopted at rates consistent with user interest, or suppressed by action barriers?

Provide actionable recommendations for designing beneficial defaults and reducing harmful omission.`,

    outputSchema: {
      type: 'object',
      properties: {
        omissionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              defaultState: { type: 'string' },
              inactionOutcome: { type: 'string' },
              actionRequired: { type: 'string' },
              userImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'defaultState',
              'inactionOutcome',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            defaultSafety: { type: 'number' },
            actionBarrierScore: { type: 'number' },
            passiveUserProtection: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'defaultSafety',
            'actionBarrierScore',
            'passiveUserProtection',
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
        'omissionPatterns',
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
        title: 'Audit Default States',
        description:
          'Map every feature, setting, and configuration to determine what happens when a user does nothing',
        example:
          'Create a matrix: Feature | Default State | Inaction Outcome | Is inaction safe?',
        tips: [
          'Walk through the entire product as a user who never changes any setting',
          'Identify every point where inaction leads to a negative outcome',
          'Prioritize security, privacy, and data protection defaults',
        ],
      },
      {
        step: 2,
        title: 'Flip Harmful Defaults',
        description:
          'For every feature where inaction leads to harm, change the default so inaction leads to safety',
        example:
          'Change 2FA from opt-in (unchecked) to opt-out (pre-enabled) for all new accounts',
        tips: [
          'Start with security and data protection features',
          'Ensure the opt-out path is clear and accessible -- never trap users',
          'Document the rationale for each default change',
        ],
      },
      {
        step: 3,
        title: 'Minimize Action Steps for Beneficial Features',
        description:
          'Reduce the number of steps required to activate or maintain protective features',
        example:
          'Replace 6-step backup setup wizard with pre-activated backup showing a single "Customize" link',
        tips: [
          'Count clicks-to-safety for every protective feature',
          'Each step you remove roughly doubles adoption',
          'Use progressive disclosure: activate first, customize later',
        ],
      },
      {
        step: 4,
        title: 'Design Persistent Nudges for Remaining Opt-Ins',
        description:
          'For features that genuinely require opt-in, design recurring, non-annoying reminders',
        example:
          'Show a contextual nudge when the user is in a situation where the feature would help, not on a timer',
        tips: [
          'Trigger nudges based on context (user is doing something risky) not time',
          'Show the concrete benefit rather than abstract feature description',
          'Respect dismissal but re-surface when genuinely relevant',
        ],
      },
      {
        step: 5,
        title: 'Measure Omission Rates',
        description:
          'Track the gap between feature interest (survey) and feature adoption (actual) to quantify omission bias impact',
        example:
          'Survey: "Would you want automatic backup?" 92% yes. Actual opt-in rate: 23%. Omission gap: 69%.',
        tips: [
          'The gap between stated interest and actual adoption is your omission bias measure',
          'Use this data to justify default changes to stakeholders',
          'Track adoption before and after switching from opt-in to opt-out',
        ],
      },
    ],

    dos: [
      'Default to the safest, most protective option for security, privacy, and data features',
      'Make inaction equal safety -- passive users should be well-protected',
      'Use opt-out for genuinely beneficial features with clear escape hatches',
      'Auto-save user work continuously without requiring active save actions',
      'Pre-activate protective features during onboarding with easy customization',
      'Frame the passive choice as the safe choice in copy and UI',
      'Reduce action steps for beneficial features to the absolute minimum',
      'Re-surface important opt-in prompts contextually when the feature would help',
    ],

    donts: [
      'Don\'t require opt-in for security features that protect users from harm',
      'Don\'t use opt-out defaults for paid features, data collection, or marketing',
      'Don\'t treat "never opted in" as "evaluated and rejected" -- most non-adoption is passive',
      'Don\'t punish inaction with data loss, security exposure, or degraded experience',
      'Don\'t add friction to beneficial actions while making harmful omissions frictionless',
      'Don\'t make important prompts permanently dismissible through inaction',
      'Don\'t exploit omission bias to auto-enroll users in things that benefit the business at user expense',
      'Don\'t assume users will take action to protect themselves -- design as if they won\'t',
    ],

    bestPractices: [
      {
        title: 'Design for the Passive User',
        description:
          'Build every flow as if the user will never change a setting, click an optional button, or configure anything',
        rationale:
          'The majority of users are passive. If your product only works well for users who actively configure it, most users will have a bad experience.',
        example:
          'A new user who signs up and never touches settings should still have backup enabled, 2FA active, and privacy maximized',
      },
      {
        title: 'Auto-Enroll, Easy Opt-Out',
        description:
          'Pre-activate beneficial features with a clear, accessible, single-step opt-out',
        rationale:
          'This leverages omission bias ethically: inaction keeps users safe, but informed users can easily change the default',
        example:
          'Pre-enable cloud backup with a prominent "Turn off backup" toggle -- not a hidden setting buried in menus',
      },
      {
        title: 'Make the Safe Path the Easy Path',
        description:
          'Ensure that the number of steps required for the safe choice is always less than or equal to the risky choice',
        rationale:
          'Action cost asymmetry amplifies omission bias. If safety requires more effort than risk, most users will take the risky path passively.',
        example:
          'Enabling 2FA: 1 click. Disabling 2FA: 2 clicks + confirmation. The safe action should never require more effort than the risky one.',
      },
      {
        title: 'Contextual Re-Prompting',
        description:
          'For features that must be opt-in, re-surface the prompt when the user is in a context where the feature would clearly help',
        rationale:
          'Contextual prompts convert passive omitters into active adopters because the benefit is immediately obvious',
        example:
          'Show the password manager prompt when the user is manually typing a long password, not during onboarding when the benefit is abstract',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Default states should not cause unexpected changes; pre-activated features must be clearly communicated',
        implementation:
          'When features are pre-enabled, clearly announce their state to screen readers with ARIA attributes. Use aria-checked, role="switch", and descriptive labels.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Opt-out controls must be fully keyboard accessible',
        implementation:
          'Ensure all toggles and opt-out controls are reachable and operable via keyboard. Users with motor impairments face higher action costs, making good defaults even more critical.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Default states and their implications must be programmatically determinable',
        implementation:
          'Use semantic HTML for toggle states. Screen reader users must be able to understand which features are active by default and how to change them.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For irreversible default changes, provide confirmation and undo',
        implementation:
          'When a user opts out of a protective default, show a clear confirmation explaining the consequence and provide an easy way to re-enable.',
      },
    ],

    ethics: [
      {
        concern: 'Auto-Enrollment in Paid Features',
        severity: 'critical',
        explanation:
          'Using omission bias to auto-enroll users in paid features, subscriptions, or add-ons they did not actively choose',
        mitigation:
          'Never auto-enroll in anything with financial cost. Paid features must always require explicit, informed opt-in with clear pricing disclosure.',
      },
      {
        concern: 'Data Collection via Opt-Out',
        severity: 'critical',
        explanation:
          'Defaulting to maximum data collection and relying on user inaction to harvest personal information',
        mitigation:
          'Default to minimum data collection. Use clear, affirmative opt-in for any data sharing beyond what is necessary for core functionality. Comply with GDPR, CCPA, and similar regulations.',
      },
      {
        concern: 'Trapping Users in Defaults',
        severity: 'high',
        explanation:
          'Making the opt-out process so difficult or hidden that users cannot realistically change the default even if they want to',
        mitigation:
          'Opt-out must be as easy or easier than opt-in. Place controls prominently, minimize steps, and never require contacting support to change a default.',
      },
      {
        concern: 'Conflating Business Benefit with User Benefit',
        severity: 'high',
        explanation:
          'Justifying manipulative defaults (e.g., auto-adding newsletter subscriptions, sharing data with partners) by claiming they "benefit" the user',
        mitigation:
          'Apply a strict test: Would a fully informed user with no inertia actively choose this? If not, it is not a beneficial default -- it is exploitation of omission bias.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Omission and Commission in Judgment and Choice',
        author: 'Spranca, M., Minsk, E., & Baron, J.',
        year: 1991,
        doi: '10.1016/0022-1031(91)90011-T',
        description:
          'Foundational paper demonstrating that people judge harmful actions as worse than equally harmful omissions',
        type: 'foundational',
      },
      {
        title: 'Omission Bias, Individual Differences, and Normality',
        author: 'Baron, J., & Ritov, I.',
        year: 2004,
        doi: '10.1016/j.obhdp.2003.12.003',
        description:
          'Explores individual differences in omission bias and the role of perceived normality of action vs inaction',
        type: 'advanced',
      },
      {
        title: 'Protected Values and Omission Bias',
        author: 'Ritov, I., & Baron, J.',
        year: 1999,
        doi: '10.1006/obhd.1999.2839',
        description:
          'Examines how protected values interact with omission bias in moral judgment',
        type: 'advanced',
      },
      {
        title: 'Defaults, Framing and Privacy: Why Opting In-Opting Out',
        author: 'Johnson, E. J., Bellman, S., & Lohse, G. L.',
        year: 2002,
        doi: '10.1023/A:1013850100786',
        description:
          'Demonstrates the enormous gap between opt-in and opt-out rates for privacy settings, directly connecting omission bias to default design',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Comprehensive treatment of how defaults shape behavior, with extensive discussion of omission bias and choice architecture',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the cognitive mechanisms underlying omission bias, including status quo bias and loss aversion',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Power of Defaults',
        author: 'Johnson, E. J., & Goldstein, D.',
        url: 'https://www.science.org/doi/10.1126/science.1091721',
        description:
          'Classic article demonstrating that default options dramatically affect outcomes in organ donation, retirement savings, and privacy',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Choice Architecture Can Improve Decisions',
        author: 'Richard Thaler',
        url: 'https://www.youtube.com/watch?v=e-Recl7LS7E',
        description:
          'Nobel laureate explains how defaults and omission bias shape real-world decisions',
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
      'status-quo-bias', // Preference for current state reinforces omission
      'loss-aversion', // Fear of action-caused loss amplifies omission preference
      'default-effect', // Default settings directly leverage omission patterns
      'framing-effect', // How action vs inaction is framed affects omission rates
    ],

    conflicts: [
      'regret-aversion', // Sometimes anticipated regret from inaction overrides omission bias
      'action-bias', // In some contexts people prefer action over inaction
    ],

    confusedWith: [
      'status-quo-bias', // Related but distinct: status quo is broader preference for current state
      'default-effect', // Overlaps but default effect is about any default, not specifically action/inaction asymmetry
      'normalcy-bias', // Both involve preferring inaction but normalcy bias is about threat underestimation
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'vaccination-omission',
        'bystander-effect',
      ],
    },
  },
};
