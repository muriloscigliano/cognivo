/**
 * OBEDIENCE BIAS
 *
 * We comply with authority even when it conflicts with our values
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const obedienceBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'obedience-bias',
    name: 'Obedience Bias',
    aliases: ['Authority Bias', 'Milgram Effect', 'Blind Obedience'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'authority',
      'compliance',
      'social-influence',
      'decision-making',
      'permission',
      'hierarchy',
      'trust',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We comply with authority even when it conflicts with our values.',

    detailed: `Obedience bias is the tendency to follow orders or directives from authority figures even when those orders conflict with personal judgment, ethics, or self-interest. In digital products, authority figures are replaced by system prompts, admin interfaces, automated workflows, and institutional branding that project legitimacy.

Users routinely accept cookie consent banners without reading them, agree to lengthy EULAs they never examine, and execute system-suggested actions without verification. The bias is amplified when interfaces use official-looking design language, formal tone, or institutional symbols that signal authority.

In product design, obedience bias shows up in permission hierarchies, confirmation dialogs that users click through reflexively, admin commands executed without double-checking, and automated compliance workflows that override individual scrutiny. Designers must balance leveraging legitimate authority (to guide users toward safe actions) against exploiting blind compliance (to extract consent users never meaningfully gave).`,

    psychologyBasis: {
      discoveredBy: 'Stanley Milgram',
      year: 1963,
      theory: 'Obedience to Authority',
      mechanism: `Humans have a deeply ingrained tendency to defer to perceived authority, rooted in social hierarchies. This happens because:

1. **Agentic State Shift**: Individuals shift from an autonomous state to an "agentic state" where they see themselves as agents carrying out another's wishes, reducing personal responsibility
2. **Legitimacy of Authority**: Systems, institutions, and interfaces that project legitimacy (uniforms, official design, formal language) trigger automatic deference
3. **Gradual Commitment**: Small initial acts of compliance escalate to larger ones through incremental commitment (foot-in-the-door)
4. **Diffusion of Responsibility**: When a system or authority "tells" the user to act, the user feels less personally responsible for the outcome
5. **Social Cost of Disobedience**: Refusing to comply with system prompts feels risky — users fear breaking something, losing access, or violating rules`,
    },

    realWorldExample: `In Milgram's 1963 experiment, 65% of participants administered what they believed were lethal electric shocks to another person simply because an experimenter in a lab coat told them to continue. Participants showed visible distress but obeyed the authority figure despite their personal moral objections. This demonstrated the extraordinary power of perceived authority over individual judgment.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Obedience bias profoundly affects how users interact with system prompts, permission requests, admin interfaces, and automated workflows. Users tend to follow system directives without critical evaluation, especially when the interface projects authority through formal design, institutional branding, or imperative language. Designers can leverage this to:

- Guide users toward secure, safe actions through authoritative prompts
- Establish trust through consistent, professional system messaging
- Create effective permission hierarchies that reflect real organizational authority
- Design confirmation flows that command appropriate attention for high-stakes actions
- Build compliance workflows that genuinely protect users`,

    whenToUse: [
      {
        title: 'Security-Critical Actions',
        scenario:
          'When users need to follow specific security protocols without deviation',
        example:
          'Use authoritative, clear system messaging: "Your organization requires two-factor authentication. Enable it now to maintain access."',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Safety Guardrails',
        scenario: 'When preventing users from making dangerous or irreversible mistakes',
        example:
          'System-level warnings that block destructive actions: "This operation will permanently delete all user data. Administrator approval required."',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Compliance Workflows',
        scenario: 'When regulatory or legal requirements demand specific user actions',
        example:
          'Step-by-step compliance checklists with institutional authority: "Federal regulation requires you to verify identity before proceeding."',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Best Practices',
        scenario: 'When guiding new users through recommended setup steps',
        example:
          'Authoritative setup wizard: "Recommended by your IT department: Configure backup settings before using this workspace."',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Admin Permission Hierarchies',
        scenario: 'When enforcing organizational role-based access control',
        example:
          'Clear authority indicators showing which actions require elevated permissions and why',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Consent Collection',
        reason:
          'Using authoritative design to pressure users into giving consent they do not understand',
        consequence:
          'Users agree to data collection, terms, or permissions without informed consent, creating legal and ethical liability',
        alternative:
          'Present consent requests in neutral, clear language with genuine opt-out options. Avoid imperative framing.',
      },
      {
        title: 'Upsells and Purchases',
        reason:
          'Making purchase prompts look like system requirements exploits obedience bias',
        consequence:
          'Users purchase products or upgrades they do not need, eroding trust when they realize the manipulation',
        alternative:
          'Clearly distinguish commercial prompts from system messages. Never disguise sales as system requirements.',
      },
      {
        title: 'Dark Pattern Confirmations',
        reason:
          'Using authoritative language to make cancellation or opt-out feel like disobedience',
        consequence:
          'Users feel trapped, leading to resentment, negative reviews, and regulatory scrutiny',
        alternative:
          'Make opt-out and cancellation flows as straightforward as opt-in flows.',
      },
      {
        title: 'Overriding User Autonomy',
        reason:
          'System prompts that force users into specific choices without explanation undermine trust',
        consequence:
          'Users lose confidence in the system and may abandon the product entirely',
        alternative:
          'Explain the reason behind recommendations. Let users make informed choices rather than demanding compliance.',
      },
    ],

    commonMistakes: [
      {
        title: 'Reflexive Confirmation Dialogs',
        description:
          'Overusing system-level confirmation dialogs trains users to click "OK" without reading',
        why: 'When every action triggers a confirmation, users develop automatic compliance and stop evaluating the prompts',
        fix: 'Reserve confirmation dialogs for genuinely high-stakes actions. Use progressive disclosure and undo instead of constant confirmations.',
      },
      {
        title: 'Fake System Messages',
        description:
          'Styling marketing or upsell content to look like system notifications',
        why: 'Users will comply initially but feel betrayed when they discover the manipulation, destroying long-term trust',
        fix: 'Maintain clear visual distinction between system messages and promotional content. Use different styling, color, and placement.',
      },
      {
        title: 'Missing Verification Steps for Admin Actions',
        description:
          'Allowing powerful admin commands to execute without adequate verification',
        why: 'Admins are also subject to obedience bias — they may execute commands from automated systems or senior staff without questioning them',
        fix: 'Require explicit confirmation for destructive admin actions. Show impact previews: "This will affect 12,847 user accounts."',
      },
      {
        title: 'Authority Without Explanation',
        description:
          'Issuing directives without explaining why the action is required',
        why: 'Blind compliance without understanding leads to errors when context changes and the directive no longer applies',
        fix: 'Always explain the reason behind system requirements. "Enable 2FA because your account has admin privileges" is better than "Enable 2FA."',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout position signals authority level and urgency of system messages',
        examples: [
          'Top-of-page banners with system-level styling command immediate obedience',
          'Modal dialogs that block interaction force compliance before proceeding',
          'Inline warnings feel less authoritative than full-screen interruptions',
          'Placement within admin panels vs user-facing areas signals authority scope',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Formal, institutional typography reinforces authority and compliance',
        examples: [
          'System fonts and monospace text signal technical authority',
          'Imperative language ("You must", "Required") triggers obedience responses',
          'All-caps warnings command attention and compliance',
          'Formal tone creates institutional authority that users defer to',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals authority level and urgency of system directives',
        examples: [
          'Red and yellow warning colors signal system-level urgency',
          'Blue and gray system colors project institutional calm authority',
          'Official brand colors on prompts increase perceived legitimacy',
          'Color differentiation between system messages and user content prevents confusion',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users comply reflexively or thoughtfully',
        examples: [
          'Single-click confirmations on destructive actions enable reflexive compliance',
          'Typed confirmation ("type DELETE to confirm") forces deliberate engagement',
          'Auto-advancing workflows bypass user judgment entirely',
          'Permission request timing affects whether users read or reflexively accept',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether system messages trigger blind compliance or informed action',
        examples: [
          'Imperative language ("You must update now") commands obedience without explanation',
          'Explanatory framing ("Update required to fix security vulnerability CVE-2024-1234") enables informed compliance',
          'Institutional voice ("Your organization requires...") leverages organizational authority',
          'Passive phrasing ("An update is available") reduces authority pressure appropriately',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Authority cues must be perceivable by all users to ensure equitable compliance',
        examples: [
          'Screen reader users may miss visual authority cues (badges, colors, positioning)',
          'ARIA roles and live regions must convey urgency level of system messages',
          'Keyboard-only users need equal ability to dismiss or comply with prompts',
          'Authority indicators should not rely solely on color or visual styling',
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
        title: 'Deliberate Admin Action Confirmation',
        description:
          'Admin interface requiring typed confirmation for destructive bulk operations',
        code: `<dialog class="admin-confirm">
  <div class="system-badge">
    <span class="icon">&#9888;</span>
    <span>Administrator Action Required</span>
  </div>
  <h3>Delete All Inactive User Accounts</h3>
  <div class="impact-preview">
    <p><strong>Affected accounts:</strong> 3,247 users</p>
    <p><strong>Data removed:</strong> Profiles, preferences, saved items</p>
    <p><strong>Reversible:</strong> No — this action is permanent</p>
  </div>
  <div class="reason">
    <p>This action was requested by: IT Policy #4421 (Annual cleanup)</p>
    <p>Approved by: Sarah Chen, IT Director</p>
  </div>
  <label>
    Type <strong>DELETE 3247 ACCOUNTS</strong> to confirm:
    <input type="text" placeholder="Type confirmation phrase" />
  </label>
  <div class="actions">
    <button class="secondary">Cancel</button>
    <button class="danger" disabled>Confirm Deletion</button>
  </div>
</dialog>`,
        explanation:
          'Typed confirmation forces the admin to engage deliberately rather than reflexively clicking "OK". Showing the impact preview, the authority chain, and the irreversibility ensures informed compliance rather than blind obedience.',
        principle:
          'High-stakes authority actions require deliberate, informed compliance — not reflexive clicks',
        metrics: {
          before: '14% of admins reported accidentally executing bulk operations',
          after: '1.2% accidental executions with typed confirmation',
          improvement: '91% reduction in accidental destructive admin actions',
        },
      },
      {
        title: 'Transparent Permission Request',
        description:
          'App permission request that explains why access is needed and provides genuine choice',
        code: `<div class="permission-request">
  <h3>Camera Access</h3>
  <p class="reason">
    <strong>Why we need this:</strong> To scan documents for your
    expense reports. Photos stay on your device until you submit them.
  </p>
  <p class="scope">
    <strong>What we access:</strong> Camera only (not photo library)
  </p>
  <div class="actions">
    <button class="primary">Allow Camera Access</button>
    <button class="secondary">Not Now</button>
    <button class="text-link">Enter expenses manually instead</button>
  </div>
</div>`,
        explanation:
          'Instead of a bare system prompt that triggers reflexive acceptance or denial, this explains why permission is needed, what data is accessed, and provides a genuine alternative. Users comply from understanding, not from obedience.',
        principle:
          'Informed consent replaces blind compliance when authority is transparent about its reasons',
      },
      {
        title: 'Contextual Compliance Workflow',
        description:
          'Regulatory compliance flow that explains each requirement and its purpose',
        code: `<div class="compliance-flow">
  <div class="step active">
    <div class="requirement-badge">Required by GDPR Article 15</div>
    <h4>Verify Your Identity</h4>
    <p>Before we can share your data export, we need to confirm
    you are the account holder. This protects your information
    from unauthorized access.</p>
    <div class="verification">
      <button class="primary">Verify via Email</button>
      <button class="secondary">Verify via Phone</button>
    </div>
    <details>
      <summary>Why is this required?</summary>
      <p>Under GDPR, we must verify identity before releasing
      personal data to prevent unauthorized disclosure.</p>
    </details>
  </div>
</div>`,
        explanation:
          'The compliance requirement is clearly attributed to a specific regulation, the reason is explained, and users can learn more if they want. This transforms blind regulatory compliance into informed participation.',
        principle:
          'Cite the specific authority behind requirements so users understand why they are complying',
      },
    ],

    bad: [
      {
        title: 'Cookie Consent Dark Pattern',
        description:
          'Cookie banner that uses authoritative styling to push users toward "Accept All"',
        code: `<!-- DON'T DO THIS -->
<div class="cookie-banner" style="background: #1a1a1a; color: white;">
  <p>This site uses cookies for essential functionality.
  By continuing, you agree to our cookie policy.</p>
  <div class="actions">
    <button class="primary"
      style="background: #0066ff; padding: 12px 32px; font-size: 1.1em;">
      Accept All Cookies
    </button>
    <button style="color: #666; font-size: 0.8em; border: none;
      background: none;">
      Manage preferences
    </button>
  </div>
</div>`,
        explanation:
          'The authoritative dark background, the misleading "essential functionality" framing, and the visually dominant "Accept All" button exploit obedience bias. The manage-preferences option is deliberately de-emphasized to discourage exercise of choice.',
        principle:
          'Never use authoritative design language to manufacture consent users did not meaningfully give',
      },
      {
        title: 'Fake System Notification for Upsell',
        description:
          'Marketing prompt disguised as a system notification',
        code: `<!-- DON'T DO THIS -->
<div class="system-notification" style="background: #fff3cd;
  border-left: 4px solid #ffc107;">
  <span class="system-icon">&#9888;</span>
  <div>
    <strong>Action Required</strong>
    <p>Your account is limited. Upgrade to Pro to unlock full
    functionality and prevent service interruption.</p>
    <button class="primary">Upgrade Now</button>
  </div>
</div>`,
        explanation:
          'This styles a commercial upsell as a system warning with "Action Required" framing. Users who have been trained to obey system messages will click "Upgrade" reflexively, believing their service is at risk. This is deceptive and erodes trust.',
        principle:
          'Never disguise commercial messages as system notifications — users will feel manipulated when they realize the deception',
      },
      {
        title: 'EULA Wall Without Summary',
        description:
          'Forcing users through a lengthy legal document with only an "I Agree" button',
        code: `<!-- DON'T DO THIS -->
<div class="eula-wall">
  <h3>Terms of Service</h3>
  <div class="scroll-box" style="height: 200px; overflow: scroll;
    font-size: 0.75em;">
    <!-- 15,000 words of legal text -->
  </div>
  <label>
    <input type="checkbox" required />
    I have read and agree to the Terms of Service
  </label>
  <button class="primary">Continue</button>
</div>`,
        explanation:
          'No reasonable user reads 15,000 words of legal text, yet the interface demands they affirm they did. This exploits obedience bias to extract legal consent that users never meaningfully gave. The checkbox creates a false record of informed agreement.',
        principle:
          'Requiring users to affirm they read unreadable documents exploits obedience to extract hollow consent',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iOS App Permissions',
        description: 'iOS permission dialogs explain what each app wants to access and why, with clear Allow/Don\'t Allow options. Apple requires developers to include a purpose string explaining the reason for each permission request.',
        effectiveness: 'very-effective',
        analysis: 'By forcing developers to explain why permissions are needed, Apple transforms blind obedience ("Allow because the system says so") into informed consent. Users can evaluate whether the stated reason justifies the access.',
      },
      {
        company: 'GitHub',
        product: 'Repository Deletion Confirmation',
        description: 'GitHub requires users to type the full repository name before deleting it. The interface explains the consequences and requires exact text match, preventing reflexive confirmation.',
        effectiveness: 'very-effective',
        analysis: 'Typed confirmation counteracts reflexive compliance. By requiring users to engage with the specific name of what they are destroying, GitHub ensures the admin action is deliberate rather than an automatic response to a system prompt.',
      },
      {
        company: 'GDPR Cookie Banners',
        product: 'EU Cookie Consent Requirements',
        description: 'GDPR requires "reject all" to be as easy as "accept all" in cookie banners. Many sites violate this by making acceptance the visually dominant, easy path while hiding rejection behind multiple clicks.',
        effectiveness: 'somewhat-effective',
        analysis: 'Well-implemented GDPR banners with equal Accept/Reject options reduce obedience-driven consent from 95%+ to around 50-60%, revealing how much "consent" was actually blind compliance with authoritative system prompts.',
      },
      {
        company: 'AWS',
        product: 'IAM Permission Boundaries',
        description: 'AWS IAM uses explicit permission boundaries, role assumption logging, and multi-step verification for destructive operations. Admin actions show the blast radius before execution.',
        effectiveness: 'effective',
        analysis: 'By showing what will be affected before an admin executes a command, AWS transforms "obey the command" into "evaluate the command." The friction is proportional to the potential damage, ensuring deliberate compliance for high-stakes actions.',
      },
    ],

    abTests: [
      {
        title: 'Permission Request: Bare Prompt vs Explained Prompt',
        hypothesis:
          'Explaining why a permission is needed will change acceptance rates and improve user trust',
        controlVersion: {
          description:
            'Standard system permission dialog: "App wants to access your location. Allow / Deny"',
          metrics: {
            conversionRate: '74%',
            trustScore: '5.2/10',
            regretRate: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Explained permission request: "We use your location to show nearby restaurants. Location is not stored or shared. Allow / Not Now / Enter location manually"',
          metrics: {
            conversionRate: '61%',
            trustScore: '8.1/10',
            regretRate: '4%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the explained prompt had a lower raw acceptance rate (-18%), the users who accepted were far more satisfied. Trust scores increased 56% and permission regret (revoking within 7 days) dropped 83%. The lower acceptance rate actually reflected users making informed choices rather than blindly obeying.',
          learnings: [
            'Lower compliance rate can indicate healthier user decision-making',
            'Informed consent produces more stable permissions (fewer revocations)',
            'Users who understand the reason are more engaged with the feature',
            'Transparent authority builds long-term trust even if short-term compliance drops',
          ],
        },
      },
      {
        title: 'Admin Confirmation: Click vs Typed Confirmation',
        hypothesis:
          'Requiring typed confirmation for destructive admin actions will reduce accidental execution',
        controlVersion: {
          description:
            'Standard confirmation dialog: "Are you sure you want to delete? Yes / Cancel"',
          metrics: {
            accidentalDeletion: '12.4%',
            timeToComplete: '1.8s',
            supportTickets: '34/month',
          },
        },
        treatmentVersion: {
          description:
            'Typed confirmation: "Type the project name to confirm deletion" with impact preview showing affected data',
          metrics: {
            accidentalDeletion: '0.8%',
            timeToComplete: '8.2s',
            supportTickets: '3/month',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Typed confirmation reduced accidental deletions by 94% and support tickets by 91%. The added friction (6.4 seconds) was negligible for an irreversible action. Several admins reported catching errors when they had to type the project name and realized it was the wrong one.',
          learnings: [
            'Reflexive click-through on confirmation dialogs is a major source of admin errors',
            'Proportional friction for destructive actions dramatically reduces mistakes',
            'Typed confirmation forces users to engage with what they are doing',
            'Impact previews help admins verify scope before committing',
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
        name: 'System-Style Prompts',
        description:
          'Messages styled to look like system or OS-level notifications when they are actually application-level or marketing content',
        howToSpot:
          'Look for warning icons, system colors (yellow/red banners), and imperative language on non-critical prompts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Asymmetric Action Buttons',
        description:
          'Consent or confirmation dialogs where the compliant action is visually dominant and the alternative is de-emphasized',
        howToSpot:
          'Compare button sizes, colors, and positioning between "accept" and "decline" options',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Imperative Language',
        description:
          'Use of commanding language like "You must", "Required", "Action needed" for non-critical or optional actions',
        howToSpot:
          'Check whether the language matches the actual urgency and whether the action is genuinely required',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Authority Badges',
        description:
          'Official-looking badges, seals, or institutional branding used to lend legitimacy to prompts',
        howToSpot:
          'Look for shield icons, checkmark seals, or institutional logos on prompts that are actually self-serving',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Single-Click Destructive Actions',
        description:
          'High-impact admin or system actions that can be triggered with a single click confirmation',
        howToSpot:
          'Check whether destructive operations (delete, deploy, revoke) have proportional friction',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Reflexive Consent Pattern',
        description: 'Consent flows designed to be clicked through without reading, exploiting trained obedience to system prompts',
        indicators: ['Cookie banners with dominant "Accept All" button', 'EULA checkboxes with unreadable content', 'Permission requests without explanation', 'Auto-advancing consent screens'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Disguised Authority Pattern',
        description: 'Commercial or optional prompts styled to look like system-level requirements',
        indicators: ['Upsell messages using warning/system styling', '"Action Required" language on optional features', 'Marketing notifications in system notification channels', 'Upgrade prompts that imply service will stop'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Insufficient Verification Pattern',
        description: 'High-stakes actions that can be completed with minimal friction, relying on users\' tendency to obey system prompts',
        indicators: ['Single-click deletion of bulk data', 'Admin commands without impact preview', 'Automated workflows without human review checkpoints', 'Cascading operations triggered by one confirmation'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Hierarchical Pressure Pattern',
        description: 'Interface design that leverages organizational hierarchy to pressure compliance',
        indicators: ['Messages attributed to "your manager" or "your organization"', 'Compliance deadlines without explanation', 'Role-based prompts that imply consequences for non-compliance', 'Shared dashboards that expose individual compliance status'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are system-level prompts genuinely system-level, or are they styled marketing/upsell messages?',
      'Do confirmation dialogs provide enough information for informed decision-making?',
      'Are "accept" and "decline" options given equal visual weight?',
      'Do destructive admin actions have friction proportional to their impact?',
      'Are permission requests accompanied by clear explanations of why access is needed?',
      'Can users distinguish between required actions and optional recommendations?',
      'Do automated workflows include human review checkpoints for high-stakes operations?',
      'Is imperative language ("You must", "Required") used only for genuinely mandatory actions?',
      'Are EULA and terms presented with readable summaries, not just walls of legal text?',
      'Does the interface exploit organizational hierarchy to pressure compliance unfairly?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in obedience bias and authority compliance.

Analyze the provided design for obedience bias patterns. Identify:

1. **Authority Signals**: System-level styling, institutional branding, imperative language, or official badges that trigger compliance
2. **Consent Flows**: How the interface collects user consent — whether it enables informed choice or exploits reflexive obedience
3. **Confirmation Patterns**: Whether high-stakes actions have proportional friction or rely on single-click compliance
4. **Permission Hierarchies**: How admin, system, and user authority levels are communicated and enforced
5. **Disguised Authority**: Marketing, upsell, or optional prompts that are styled as system requirements

For each pattern found:
- Identify the authority signal and its source (system, organization, regulation, or fabricated)
- Assess whether the authority is legitimate and proportional
- Determine if users can meaningfully evaluate and refuse
- Evaluate whether compliance is informed or reflexive
- Suggest improvements for transparent, ethical authority

Consider:
- Are system prompts creating informed compliance or blind obedience?
- Do users have genuine, easy-to-exercise alternatives to compliance?
- Are commercial interests disguised as system requirements?
- Do destructive actions have friction proportional to their consequences?
- Are authority cues accessible to all users (screen readers, keyboard)?

Provide actionable recommendations for ethical, transparent authority design.`,

    outputSchema: {
      type: 'object',
      properties: {
        obediencePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              authoritySource: { type: 'string' },
              legitimacy: { type: 'string' },
              complianceType: { type: 'string' },
              userAutonomy: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'authoritySource',
              'legitimacy',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            authorityTransparency: { type: 'number' },
            consentQuality: { type: 'number' },
            frictionProportionality: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'authorityTransparency',
            'consentQuality',
            'frictionProportionality',
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
        'obediencePatterns',
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
        title: 'Audit Authority Signals',
        description:
          'Identify all places in your interface where system prompts, warnings, or directives trigger user compliance',
        example:
          'Map every confirmation dialog, permission request, consent banner, and system notification in your product',
        tips: [
          'Include both genuine system messages and styled-to-look-like-system messages',
          'Note which prompts are mandatory vs optional',
          'Identify any commercial messages using system-level styling',
        ],
      },
      {
        step: 2,
        title: 'Classify Authority Legitimacy',
        description:
          'For each authority signal, determine whether the authority is legitimate and proportional',
        example:
          'Security requirements from IT policy = legitimate. Upsell styled as system warning = illegitimate.',
        tips: [
          'Legitimate: security, safety, regulatory, organizational policy',
          'Questionable: engagement metrics, retention tricks, growth hacks',
          'Illegitimate: disguised marketing, fabricated urgency, fake system alerts',
        ],
      },
      {
        step: 3,
        title: 'Match Friction to Stakes',
        description:
          'Ensure that the difficulty of compliance is proportional to the impact of the action',
        example:
          'Deleting a draft = simple undo. Deleting all user data = typed confirmation with impact preview.',
        tips: [
          'Low stakes: simple click or automatic with undo',
          'Medium stakes: explicit confirmation with clear description',
          'High stakes: typed confirmation, impact preview, cooling-off period',
          'Critical: multi-party approval, audit trail, delayed execution',
        ],
      },
      {
        step: 4,
        title: 'Design for Informed Compliance',
        description:
          'Replace blind obedience with informed consent by explaining why each action is required',
        example:
          '"Required by your organization\'s security policy (Policy #4421)" instead of just "Required"',
        tips: [
          'Cite the specific authority: regulation, policy, or technical requirement',
          'Explain the consequence of non-compliance honestly',
          'Provide alternatives where possible',
        ],
      },
      {
        step: 5,
        title: 'Test for Reflexive Compliance',
        description:
          'Measure whether users are engaging with prompts or clicking through reflexively',
        example:
          'Track time-on-dialog, scroll depth on terms, and permission revocation rates',
        tips: [
          'Short time-on-dialog suggests reflexive compliance',
          'High permission revocation rates suggest uninformed acceptance',
          'A/B test explained vs unexplained prompts',
        ],
      },
    ],

    dos: [
      'Explain why each permission, action, or requirement is needed',
      'Match friction to the stakes and reversibility of each action',
      'Provide genuine, easy-to-use alternatives to compliance',
      'Cite specific authority sources (regulations, policies, technical requirements)',
      'Use typed confirmation for irreversible, high-impact actions',
      'Show impact previews before destructive operations',
      'Maintain clear visual distinction between system messages and marketing',
      'Design equal-weight accept and decline options for consent',
      'Include human review checkpoints in automated compliance workflows',
      'Provide readable summaries of legal terms alongside full text',
    ],

    donts: [
      'Don\'t disguise marketing or upsell messages as system notifications',
      'Don\'t use imperative language ("You must") for optional actions',
      'Don\'t make the compliant option visually dominant while hiding alternatives',
      'Don\'t require users to affirm reading documents they cannot reasonably read',
      'Don\'t use organizational hierarchy to pressure compliance without justification',
      'Don\'t allow single-click execution of destructive bulk operations',
      'Don\'t auto-advance consent flows without user engagement',
      'Don\'t fabricate urgency ("Act now or lose access") for non-urgent actions',
      'Don\'t conflate "recommended" with "required" in system messaging',
      'Don\'t remove undo/recovery options to force careful compliance',
    ],

    bestPractices: [
      {
        title: 'Proportional Friction',
        description:
          'Scale the difficulty of confirming an action to the severity and reversibility of its consequences',
        rationale:
          'Low-stakes actions should be frictionless; high-stakes actions should require deliberate engagement',
        example:
          'Archive a file: one click. Delete a database table: typed confirmation with row count preview.',
      },
      {
        title: 'Authority Attribution',
        description:
          'Always cite the specific source of authority behind any requirement',
        rationale:
          'Users who understand why they are complying make better decisions and trust the system more',
        example:
          '"Required by HIPAA (45 CFR 164.312)" instead of "Required for security."',
      },
      {
        title: 'Genuine Opt-Out',
        description:
          'Make declining or opting out as easy and visible as accepting or complying',
        rationale:
          'True consent requires a genuine, frictionless alternative to compliance',
        example:
          'Cookie banner with equal-sized "Accept All" and "Reject All" buttons, same visual weight.',
      },
      {
        title: 'Impact Previews',
        description:
          'Show users exactly what will happen before they confirm a high-stakes action',
        rationale:
          'Obedience bias causes users to act without evaluating consequences; previews force evaluation',
        example:
          '"This will remove 3,247 user accounts and delete 14.2 GB of associated data."',
      },
      {
        title: 'Deliberate Confirmation',
        description:
          'For irreversible actions, require engagement that cannot be performed reflexively',
        rationale:
          'Typed confirmation, delay timers, or multi-step flows prevent reflexive compliance',
        example:
          'Type the resource name, wait 10 seconds, then confirm — for permanent deletion operations.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Authority signals must be conveyed through structure, not just visual styling',
        implementation:
          'Use ARIA roles (role="alert", role="alertdialog") and semantic HTML to ensure screen readers convey urgency and authority level, not just visual cues like color or size.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Authority and urgency must not rely on color alone',
        implementation:
          'Combine color with icons, text labels, and ARIA attributes so that authority signals are perceivable without color vision.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All compliance and refusal actions must be keyboard accessible',
        implementation:
          'Ensure both "accept" and "decline" buttons are keyboard-focusable and that focus order does not bias toward compliance.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Compliance actions must not trigger automatically without explicit user confirmation',
        implementation:
          'Never auto-submit consent or approval forms. Require explicit activation of submit controls.',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Consent',
        severity: 'critical',
        explanation:
          'Designing consent flows that exploit obedience to extract agreement users never meaningfully gave',
        mitigation:
          'Provide equal-weight accept/decline options, readable summaries, and genuine alternatives. Track engagement metrics to verify informed consent.',
      },
      {
        concern: 'Disguised Authority',
        severity: 'critical',
        explanation:
          'Styling commercial prompts (upsells, engagement nudges) as system-level requirements',
        mitigation:
          'Maintain strict visual and structural separation between system messages and promotional content. Never use system notification channels for marketing.',
      },
      {
        concern: 'Hierarchical Pressure',
        severity: 'high',
        explanation:
          'Using organizational authority to pressure users into actions that serve the organization at the user\'s expense',
        mitigation:
          'Explain the reason behind organizational requirements. Provide escalation paths for users who disagree with mandated actions.',
      },
      {
        concern: 'Confirmation Theater',
        severity: 'high',
        explanation:
          'Requiring users to check "I have read and agree" when the content is deliberately unreadable',
        mitigation:
          'Provide plain-language summaries, highlight key terms, and never require affirmation of reading documents longer than users can reasonably review.',
      },
      {
        concern: 'Asymmetric Friction',
        severity: 'medium',
        explanation:
          'Making compliance easy (one click) but making refusal difficult (multiple steps, hidden options)',
        mitigation:
          'Apply the same interaction cost to acceptance and refusal. If "Accept All" is one click, "Reject All" must also be one click.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Behavioral Study of Obedience',
        author: 'Milgram, S.',
        year: 1963,
        doi: '10.1037/h0040525',
        description:
          'The foundational experiment demonstrating that ordinary people will obey authority figures to the point of administering what they believe are lethal electric shocks',
        type: 'foundational',
      },
      {
        title: 'Replicating Milgram: Would People Still Obey Today?',
        author: 'Burger, J. M.',
        year: 2009,
        doi: '10.1037/a0014473',
        description:
          'Partial replication of Milgram\'s experiment showing obedience rates remain remarkably consistent decades later',
        type: 'foundational',
      },
      {
        title: 'Obedience to Authority: An Experimental View',
        author: 'Milgram, S.',
        year: 1974,
        description:
          'Milgram\'s comprehensive analysis of his obedience experiments, including variations and theoretical framework',
        type: 'foundational',
      },
      {
        title: 'The Social Psychology of Obedience Towards Authority: An Empirical Tribute to Stanley Milgram',
        author: 'Haslam, S. A., Reicher, S. D., & Birney, M. E.',
        year: 2014,
        description:
          'Modern reanalysis of Milgram\'s work incorporating contemporary social identity theory',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Obedience to Authority',
        author: 'Milgram, Stanley',
        year: 1974,
        isbn: '9780061765216',
        description:
          'The definitive account of the Milgram experiments on obedience and authority, with implications for ethics and society',
        type: 'foundational',
      },
      {
        title: 'The Lucifer Effect: Understanding How Good People Turn Evil',
        author: 'Zimbardo, Philip',
        year: 2007,
        isbn: '9780812974447',
        description:
          'Stanford Prison Experiment researcher explores how situational authority transforms behavior, extending Milgram\'s findings',
        type: 'foundational',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on authority as one of the six principles of persuasion, with practical implications for design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Dark Patterns: Deception vs. Honesty in UI Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/dark-patterns/',
        description:
          'Analysis of deceptive design patterns that exploit obedience bias and authority signals in interfaces',
        type: 'practical',
      },
      {
        title: 'Consent and Cookie Banners: Dark Patterns in Practice',
        author: 'Nouwens, M., Liccardi, I., Veale, M., Karger, D., & Kagal, L.',
        url: 'https://dl.acm.org/doi/10.1145/3313831.3376321',
        description:
          'CHI 2020 study of how cookie consent interfaces exploit obedience bias to manufacture consent',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Milgram Experiment (1962) — Original Footage',
        author: 'Stanley Milgram',
        url: 'https://www.youtube.com/watch?v=rdrKCilEhC0',
        description:
          'Original footage from Milgram\'s obedience experiments showing participants following authority despite visible distress',
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
      'authority-bias',
      'social-proof',
      'status-quo-bias',
      'default-effect',
      'halo-effect',
    ],

    conflicts: [
      'reactance',
      'autonomy-bias',
    ],

    confusedWith: [
      'authority-bias',
      'conformity-bias',
      'compliance',
    ],

    hierarchy: {
      parent: 'social-influence',
      children: [
        'authority-compliance',
        'institutional-trust',
      ],
    },
  },
};
