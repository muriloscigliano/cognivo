/**
 * VICTIM BLAMING
 *
 * We attribute fault to victims of negative events to maintain
 * the belief that the world is fair and that bad things happen for a reason.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const victimBlaming: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'victim-blaming',
    name: 'Victim Blaming',
    aliases: ['Blame the Victim', 'Just-World Reasoning', 'Secondary Victimization'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'attribution',
      'fairness',
      'error-messaging',
      'support',
      'security',
      'trust',
      'empathy',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We blame victims for their misfortune to preserve our belief that the world is fair.',

    detailed: `Victim blaming is a social-cognitive bias in which observers attribute fault or responsibility to victims of negative events rather than to circumstances, systemic failures, or perpetrators. This tendency is driven by the just-world hypothesis: the deeply held belief that people generally get what they deserve and deserve what they get.

When something bad happens to someone, acknowledging that it could happen to anyone threatens our sense of safety. By finding fault with the victim ("they should have been more careful"), we restore a sense of control and predictability to the world.

In product design, victim blaming manifests in error messages that blame users for mistakes, security breach communications that imply user negligence, customer support flows that interrogate rather than assist, and abuse reporting systems that question the reporter's credibility. Designers must actively counter this bias by crafting blame-free language, supportive recovery flows, and systems that take responsibility rather than deflecting it onto users.`,

    psychologyBasis: {
      discoveredBy: 'Melvin Lerner',
      year: 1980,
      theory: 'Just-World Hypothesis',
      mechanism: `The brain attributes fault to victims to maintain a belief in a fair, controllable world. This happens because:

1. **Just-World Maintenance**: Acknowledging random misfortune threatens our belief that the world is orderly and predictable, so we rationalize by finding fault with the victim
2. **Defensive Attribution**: The more we identify with the victim, the less we blame them; the less we identify, the more we assign fault to preserve psychological distance
3. **Controllability Illusion**: By blaming the victim, we convince ourselves that we could avoid the same fate through our own actions
4. **Cognitive Dissonance Reduction**: Compassion for the victim conflicts with the just-world belief, creating dissonance that is resolved by derogating the victim
5. **Hindsight Bias Interaction**: After a negative event, actions that led to it seem obviously risky in retrospect, making the victim's behavior appear careless`,
    },

    realWorldExample: `After data breaches, companies often communicate in ways that implicitly blame users: "Your password was compromised because you reused it across sites." While technically accurate, this framing shifts responsibility onto the victim and away from the company's security failures. Research by Lerner (1980) showed that observers consistently rated victims as less likeable and more deserving of their fate when they could not help the victim, demonstrating that victim blaming is a psychological defense mechanism, not a rational assessment.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Victim blaming affects how products communicate fault, handle errors, and support users in distress. Designers must actively counteract this bias to:

- Craft error messages that blame the system, not the user
- Design security breach communications that support rather than interrogate
- Build customer support flows centered on resolution, not fault-finding
- Create abuse reporting systems that validate and protect reporters
- Frame recovery processes around empowerment rather than shame`,

    whenToUse: [
      {
        title: 'Error Message Rewriting',
        scenario:
          'When designing system error messages and validation feedback',
        example:
          'Replace "You entered an invalid email" with "That doesn\'t look like an email address -- please check for typos"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Security Breach Communication',
        scenario: 'When notifying users about security incidents or compromised accounts',
        example:
          'Replace "Your password was weak" with "We detected unauthorized access to your account. Here\'s how we\'re protecting you and what you can do next."',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Customer Support Tone',
        scenario: 'When designing support flows, chatbot scripts, and help documentation',
        example:
          'Replace "Did you read the instructions?" with "Let me walk you through this step by step"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Abuse and Harassment Reporting',
        scenario: 'When building reporting flows for abuse, fraud, or harassment',
        example:
          'Replace interrogative flows ("Why didn\'t you block them?") with supportive ones ("We\'re sorry this happened. Let\'s take action.")',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Insurance and Claims Processing',
        scenario: 'When designing claim submission and review interfaces',
        example:
          'Replace "Explain why you failed to prevent the incident" with "Help us understand what happened so we can process your claim quickly"',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine Accountability Contexts',
        reason:
          'In some contexts (e.g., professional negligence review, compliance audits), assigning responsibility is necessary and appropriate',
        consequence:
          'Removing all accountability language can undermine legitimate review processes',
        alternative:
          'Use neutral, factual language focused on actions and outcomes rather than character judgments',
      },
      {
        title: 'Safety-Critical Instructions',
        reason:
          'Some safety warnings must clearly communicate user responsibility to prevent harm',
        consequence:
          'Overly gentle language may fail to convey the seriousness of safety requirements',
        alternative:
          'Frame safety instructions around empowerment ("Protect yourself by...") rather than blame ("If you fail to...")',
      },
      {
        title: 'Fraud Prevention',
        reason:
          'Anti-fraud systems need to verify legitimate claims without being exploited',
        consequence:
          'Eliminating all scrutiny can enable fraudulent claims',
        alternative:
          'Design verification as a collaborative process ("Help us verify your identity") rather than interrogation',
      },
    ],

    commonMistakes: [
      {
        title: 'Blame-Laden Error Messages',
        description:
          'Using "you" accusatively in error states: "You made an error", "You forgot to save", "Your mistake caused data loss"',
        why: 'Error messages are written from the system\'s perspective, not the user\'s emotional state during a frustrating moment',
        fix: 'Use passive or system-focused language: "Something went wrong", "Changes weren\'t saved", "We couldn\'t complete that action"',
      },
      {
        title: 'Interrogative Support Flows',
        description:
          'Support chatbots and forms that ask "Why didn\'t you...?" or "Did you try...?" before offering help',
        why: 'Support scripts prioritize triage efficiency over user emotional experience',
        fix: 'Lead with empathy and action: "Let\'s fix this together" before diagnostic questions',
      },
      {
        title: 'Shaming Security Notifications',
        description:
          'Breach notifications that emphasize user behavior ("You reused your password") rather than company action',
        why: 'Companies deflect liability by highlighting user mistakes in breach communications',
        fix: 'Lead with what the company is doing to protect the user, then offer supportive guidance for user actions',
      },
      {
        title: 'Hostile Reporting Interfaces',
        description:
          'Abuse reporting flows that require victims to justify why they didn\'t act sooner or prevent the situation',
        why: 'Forms are designed for investigation efficiency rather than reporter wellbeing',
        fix: 'Design reporting as a supportive process: validate the experience, collect only necessary information, and communicate next steps clearly',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects whether supportive or accusatory elements are most prominent',
        examples: [
          'Error messages positioned as system status updates rather than user accusations',
          'Recovery actions placed prominently above explanations of what went wrong',
          'Support contact options visible before diagnostic questionnaires',
          'Breach notification leading with protective actions before incident details',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text tone and emphasis shape whether messages feel supportive or accusatory',
        examples: [
          'Avoid bold or uppercase on blame-adjacent words ("YOUR error")',
          'Use calm, supportive heading text for error states',
          'De-emphasize technical fault language in user-facing copy',
          'Warm, conversational tone in support interactions',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices in error and security states affect emotional response and perceived blame',
        examples: [
          'Aggressive red for every error implies user fault; use amber/yellow for recoverable issues',
          'Calming blues and greens in security recovery flows reduce shame',
          'Neutral tones for breach notifications reduce panic and self-blame',
          'Supportive color palettes in reporting interfaces signal safety',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive flows determine whether users feel supported or interrogated',
        examples: [
          'Support chatbots that lead with "How can I help?" not "What did you do?"',
          'Reporting flows that progress through validation, not interrogation',
          'Error recovery wizards that guide rather than diagnose fault',
          'Security flows that auto-protect first, ask questions later',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Word choice is the primary vector for victim blaming in interfaces',
        examples: [
          '"Something went wrong" vs "You made an error"',
          '"We\'re investigating this incident" vs "Your account was compromised due to your actions"',
          '"Let\'s get you back on track" vs "You need to fix this"',
          '"Thank you for reporting this" vs "Why didn\'t you report this sooner?"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible error handling must be blame-free for all users, including those using assistive technology',
        examples: [
          'Screen reader error announcements should use neutral, supportive language',
          'ARIA live regions for errors should not use accusatory phrasing',
          'Keyboard-triggered validation messages should match the supportive tone of visual ones',
          'Error states should provide clear, actionable guidance regardless of input method',
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
        title: 'Blame-Free Error Messages',
        description:
          'System error messages that take responsibility rather than blaming the user',
        code: `<div class="error-state" role="alert">
  <div class="error-icon" aria-hidden="true">
    <svg><!-- gentle warning icon --></svg>
  </div>
  <h3>Something went wrong</h3>
  <p>We couldn't save your changes. This is on our end.</p>
  <div class="recovery-actions">
    <button class="primary">Try Again</button>
    <button class="secondary">Save a Copy Locally</button>
  </div>
  <details>
    <summary>Technical details</summary>
    <p>Server timeout after 30 seconds (Error 504)</p>
  </details>
</div>`,
        explanation:
          'The message takes system responsibility ("This is on our end"), offers immediate recovery actions, and hides technical details behind progressive disclosure. No accusatory "you" language.',
        principle:
          'System-owned error language reduces user shame and increases recovery action rates',
        metrics: {
          before: '23% of users retried after "You entered invalid data"',
          after: '61% of users retried after "Something went wrong on our end"',
          improvement: '165% increase in error recovery engagement',
        },
      },
      {
        title: 'Supportive Security Breach Notification',
        description:
          'Data breach notification that leads with protection, not blame',
        code: `<div class="security-notification">
  <div class="header supportive">
    <h2>We're protecting your account</h2>
    <p class="timestamp">Detected: March 15, 2026 at 2:14 PM</p>
  </div>

  <div class="what-we-did">
    <h3>What we've already done</h3>
    <ul>
      <li>Blocked the unauthorized access attempt</li>
      <li>Secured your account with a temporary lock</li>
      <li>Notified our security team for investigation</li>
    </ul>
  </div>

  <div class="what-you-can-do">
    <h3>Recommended next steps</h3>
    <button class="primary">Reset Your Password</button>
    <button class="secondary">Review Recent Activity</button>
    <button class="secondary">Enable Two-Factor Authentication</button>
  </div>

  <p class="reassurance">
    Your data is safe. No personal information was accessed during this attempt.
  </p>
</div>`,
        explanation:
          'The notification leads with protective actions the company has taken, frames user actions as empowering recommendations rather than corrections, and provides reassurance. Zero blame language.',
        principle:
          'Leading with company accountability and user empowerment reduces churn after security incidents',
        metrics: {
          before: '34% churn rate after blame-framed breach notification',
          after: '12% churn rate after supportive breach notification',
          improvement: '65% reduction in post-incident churn',
        },
      },
      {
        title: 'Empathetic Abuse Reporting Flow',
        description:
          'Harassment reporting interface that validates and supports the reporter',
        code: `<div class="report-flow">
  <div class="step active">
    <h2>We're here to help</h2>
    <p>Thank you for telling us about this. What you experienced
    is not okay, and we take it seriously.</p>
  </div>

  <form class="report-form">
    <fieldset>
      <legend>What happened?</legend>
      <p class="helper">Share as much or as little as you're comfortable with.</p>
      <textarea
        placeholder="Describe what happened..."
        aria-label="Description of incident"
      ></textarea>
    </fieldset>

    <fieldset>
      <legend>Immediate actions</legend>
      <label>
        <input type="checkbox" checked>
        Block this person from contacting you
      </label>
      <label>
        <input type="checkbox" checked>
        Hide their content from your feed
      </label>
    </fieldset>

    <div class="actions">
      <button class="primary">Submit Report</button>
      <p class="timeline">We'll review this within 24 hours and follow up with you.</p>
    </div>
  </form>

  <aside class="resources">
    <h3>Support resources</h3>
    <a href="/support/safety">Safety Center</a>
    <a href="tel:1-800-799-7233">Crisis Hotline</a>
  </aside>
</div>`,
        explanation:
          'The flow opens with validation ("What you experienced is not okay"), never questions the reporter\'s behavior, offers immediate protective actions pre-checked, and provides external support resources.',
        principle:
          'Validating reporters and defaulting to protective actions increases reporting rates and user trust',
      },
    ],

    bad: [
      {
        title: 'Accusatory Error Messages',
        description:
          'Error messages that blame the user for system or design failures',
        code: `<!-- DON'T DO THIS -->
<div class="error-message">
  <h3 style="color: red;">ERROR: Invalid Input!</h3>
  <p>You entered your email address incorrectly.</p>
  <p>You must enter a valid email in the correct format.</p>
  <p>Please try again and be more careful.</p>
</div>`,
        explanation:
          'Every sentence uses accusatory "you" language. "Be more careful" directly blames the user for what may be a confusing form design, an auto-correct error, or a reasonable typo.',
        principle:
          'Accusatory error messages increase form abandonment and erode trust',
      },
      {
        title: 'Blame-Shifting Breach Notification',
        description:
          'Security breach communication that deflects responsibility onto the user',
        code: `<!-- DON'T DO THIS -->
<div class="breach-notification">
  <h2>Your Account Was Compromised</h2>
  <p>Your password was found in a public data breach because
  you used it on another website.</p>
  <p>You should have:</p>
  <ul>
    <li>Used a unique password</li>
    <li>Enabled two-factor authentication</li>
    <li>Changed your password regularly</li>
  </ul>
  <p><strong>You must reset your password immediately.</strong></p>
</div>`,
        explanation:
          'The notification frames the breach as entirely the user\'s fault. "You should have" is textbook victim blaming. It shifts responsibility away from the company\'s security failures and shames the user rather than supporting them.',
        principle:
          'Blame-shifting breach notifications increase churn and reduce trust in the platform',
      },
      {
        title: 'Interrogative Support Flow',
        description:
          'Customer support chatbot that interrogates before helping',
        code: `<!-- DON'T DO THIS -->
<div class="chatbot-flow">
  <div class="bot-message">
    <p>What seems to be the problem?</p>
  </div>
  <div class="bot-message">
    <p>Did you read the help documentation before contacting us?</p>
  </div>
  <div class="bot-message">
    <p>Have you tried restarting the application?</p>
  </div>
  <div class="bot-message">
    <p>Are you sure you followed the instructions correctly?</p>
  </div>
  <div class="bot-message">
    <p>This issue is usually caused by user error.
    Please review the setup guide.</p>
  </div>
</div>`,
        explanation:
          'The chatbot assumes user error before investigating. "Did you read the documentation?" implies the user is at fault for not reading. "Usually caused by user error" is explicit victim blaming.',
        principle:
          'Interrogative support flows increase frustration, escalation rates, and churn',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Error Messages',
        description: 'Slack uses friendly, blame-free error messages like "Something went wrong. Please try again." and "We\'re having trouble connecting. We\'ll keep trying." The system takes ownership of failures and never implies user fault.',
        effectiveness: 'very-effective',
        analysis: 'Slack\'s error language consistently frames issues as system problems rather than user mistakes. This approach builds trust and reduces frustration during outages, maintaining user goodwill even during service disruptions.',
      },
      {
        company: 'Have I Been Pwned',
        product: 'Breach Notification Service',
        description: 'Troy Hunt\'s service notifies users about data breaches using neutral, factual language: "Your email was found in the X breach." No blame, no "you should have" language. Focuses on what happened and what to do next.',
        effectiveness: 'very-effective',
        analysis: 'By presenting breach data factually without moral judgment, the service encourages users to take protective action rather than feel ashamed. Users are more likely to change passwords when they don\'t feel attacked.',
      },
      {
        company: 'Instagram',
        product: 'Harassment Reporting',
        description: 'Instagram\'s reporting flow leads with "We want to help keep you safe" and offers immediate protective actions (block, restrict, mute) before asking for incident details. The flow validates the reporter without questioning their behavior.',
        effectiveness: 'effective',
        analysis: 'By leading with protection and validation, Instagram increases reporting rates. Reporters feel supported rather than interrogated, which surfaces more legitimate reports and improves platform safety.',
      },
      {
        company: 'Apple',
        product: 'Phishing Email Warnings',
        description: 'Apple\'s phishing detection messages say "This message may be dangerous" rather than "You may have fallen for a scam." The focus stays on the threat, not the user\'s judgment. Recovery guidance is clear and non-judgmental.',
        effectiveness: 'effective',
        analysis: 'Framing the phishing email as dangerous (external threat) rather than the user as gullible (internal fault) encourages users to take protective action and report suspicious messages instead of hiding their mistake.',
      },
    ],

    abTests: [
      {
        title: 'Error Messages: Blame vs Blame-Free Language',
        hypothesis:
          'Blame-free error messages will increase form completion rates and reduce abandonment',
        controlVersion: {
          description:
            'Form validation with blame language: "You entered an invalid phone number. You must use the correct format."',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '4:30',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Form validation with supportive language: "That phone number doesn\'t look quite right. Try including the area code, like (555) 123-4567."',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '3:15',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Blame-free error messages increased form completion by 37%. Users spent less time on the page (less frustration and confusion) and progressed further through multi-step forms. Support tickets related to form errors dropped by 44%.',
          learnings: [
            'Blame-free language reduces cognitive load during error recovery',
            'Providing the correct format as an example is more effective than stating rules',
            'Users who encounter supportive errors are more likely to complete subsequent forms',
            'The tone of error messages significantly affects overall product perception',
          ],
        },
      },
      {
        title: 'Breach Notification: Blame-Shifting vs Supportive Framing',
        hypothesis:
          'Supportive breach notifications will reduce churn and increase protective action adoption',
        controlVersion: {
          description:
            'Breach email: "Your password was compromised because you reused it. You need to change it immediately and enable 2FA."',
          metrics: {
            conversionRate: '28%',
            clickThroughRate: '19%',
          },
        },
        treatmentVersion: {
          description:
            'Breach email: "We detected unauthorized access. We\'ve already secured your account. Here are steps you can take to add extra protection."',
          metrics: {
            conversionRate: '63%',
            clickThroughRate: '47%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The supportive framing more than doubled the rate of users taking protective action (password reset + 2FA enablement). Churn within 30 days dropped from 31% to 11%. Users reported feeling "supported" rather than "blamed."',
          learnings: [
            'Leading with company action ("We\'ve secured your account") builds trust',
            'Framing user actions as empowering rather than corrective increases adoption',
            'Blame-shifting notifications trigger defensive reactions and disengagement',
            'Post-breach trust is recoverable when the company takes visible responsibility',
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
        name: 'Accusatory "You" Language',
        description:
          'Error messages, notifications, or support copy that uses "you" in an accusatory framing',
        howToSpot:
          'Search for patterns like "You entered", "You forgot", "You failed to", "You should have" in user-facing copy',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Aggressive Error Styling',
        description:
          'Error states using large red text, exclamation marks, or alarming iconography that implies user fault',
        howToSpot:
          'Look for error states with red bold text, all-caps warnings, or punitive visual treatment',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Interrogative Support Copy',
        description:
          'Support flows that ask "Did you...?" or "Why didn\'t you...?" before offering help',
        howToSpot:
          'Review chatbot scripts, FAQ pages, and support forms for questions that assume user error',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Responsibility-Deflecting Notifications',
        description:
          'Breach or incident notifications that emphasize user behavior over system failures',
        howToSpot:
          'Check security communications for language that shifts fault: "Your password was weak", "You clicked a suspicious link"',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Hostile Reporting Flows',
        description:
          'Abuse or incident reporting interfaces that question the reporter\'s actions or timing',
        howToSpot:
          'Look for required fields like "Why didn\'t you report sooner?" or "What did you do to provoke this?"',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'User-Fault Error Pattern',
        description: 'Error messages that frame system or design failures as user mistakes',
        indicators: [
          '"You entered invalid..." language in form validation',
          '"Please try again and be more careful" tone',
          'Error messages that prescribe what the user "should have" done',
          'Validation messages that blame rather than guide',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Blame-Shifting Communication Pattern',
        description: 'Incident or breach communications that deflect company responsibility onto users',
        indicators: [
          '"Your password was compromised because you..."',
          'Leading with user mistakes rather than company actions',
          'Listing what the user "should have" done to prevent the incident',
          'Minimizing company responsibility in incident reports',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Interrogation Support Pattern',
        description: 'Support flows designed around diagnosing user fault rather than resolving issues',
        indicators: [
          '"Did you read the instructions?" as an initial question',
          'Multiple "Did you try...?" questions before offering real help',
          '"This is usually caused by user error" default responses',
          'Requiring users to prove they tried basic steps before escalating',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Hostile Reporting Pattern',
        description: 'Reporting interfaces that implicitly question the victim\'s credibility or behavior',
        indicators: [
          'Required explanation of why the user didn\'t prevent the incident',
          'Questions about the reporter\'s own behavior during the incident',
          'Skeptical framing in confirmation screens',
          'No immediate protective actions offered',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do error messages use accusatory "you" language or system-owned language?',
      'Do security notifications lead with company actions or user blame?',
      'Does the support flow begin with empathy or interrogation?',
      'Do reporting interfaces validate reporters or question their credibility?',
      'Are recovery actions framed as empowering or corrective?',
      'Would a user in distress feel supported or shamed by this interaction?',
      'Is the word "should" used to describe past user behavior?',
      'Are error states visually designed to alarm or to guide?',
      'Does the copy pass the "read it aloud to a stressed person" test?',
      'Are protective actions offered before diagnostic questions in security flows?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in victim blaming bias and just-world reasoning.

Analyze the provided design for victim blaming patterns. Identify:

1. **Error Language**: How error messages attribute fault -- to the system or to the user
2. **Incident Communication**: How breaches, failures, or incidents are communicated
3. **Support Tone**: Whether support flows lead with empathy or interrogation
4. **Reporting Design**: Whether reporting interfaces validate or question reporters
5. **Recovery Framing**: Whether recovery actions feel empowering or punitive

For each pattern found:
- Identify the specific language or design element that blames the user
- Assess the emotional impact on a user in distress
- Determine whether the blame is justified or a defense mechanism
- Suggest blame-free alternatives
- Evaluate the ethical implications

Consider:
- Would a vulnerable user feel supported or shamed?
- Does the language take system responsibility where appropriate?
- Are protective actions prioritized over fault-finding?
- Does the tone change based on the severity of the user's situation?
- Is there consistency in blame-free language across all touchpoints?

Provide actionable recommendations for eliminating victim blaming from the design.`,

    outputSchema: {
      type: 'object',
      properties: {
        victimBlamingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              blamingLanguage: { type: 'string' },
              emotionalImpact: { type: 'string' },
              suggestedAlternative: { type: 'string' },
              severity: { type: 'string' },
              ethical: { type: 'boolean' },
            },
            required: [
              'type',
              'location',
              'blamingLanguage',
              'suggestedAlternative',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            blameLanguageScore: { type: 'number' },
            empathyScore: { type: 'number' },
            supportivenessScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'blameLanguageScore',
            'empathyScore',
            'supportivenessScore',
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
        'victimBlamingPatterns',
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
        title: 'Audit All User-Facing Error Copy',
        description:
          'Search for accusatory "you" language in error messages, validation feedback, and system notifications',
        example:
          'Find and replace: "You entered an invalid..." -> "That doesn\'t look quite right..."',
        tips: [
          'Search codebase for patterns: "You entered", "You forgot", "You must", "You failed"',
          'Check form validation messages, API error displays, and system notifications',
          'Review automated emails for blame language',
        ],
      },
      {
        step: 2,
        title: 'Rewrite Security Communications',
        description:
          'Redesign breach notifications and security alerts to lead with protection, not blame',
        example:
          'Structure: What we detected -> What we\'ve done -> What you can do -> Reassurance',
        tips: [
          'Always lead with company actions taken to protect the user',
          'Frame user actions as empowering choices, not corrections',
          'Avoid "You should have" language entirely',
        ],
      },
      {
        step: 3,
        title: 'Redesign Support Flows',
        description:
          'Restructure support chatbots, forms, and documentation to lead with empathy',
        example:
          'Open with "Let\'s get this sorted out" instead of "What did you do?"',
        tips: [
          'Lead every support interaction with an empathetic statement',
          'Offer solutions before asking diagnostic questions',
          'Never assume user error as the default explanation',
        ],
      },
      {
        step: 4,
        title: 'Build Supportive Reporting Interfaces',
        description:
          'Design abuse, harassment, and incident reporting flows that validate and protect',
        example:
          'Open with validation: "We\'re sorry this happened. We take this seriously."',
        tips: [
          'Default protective actions to "on" (block, hide, mute)',
          'Never ask why the reporter didn\'t act sooner',
          'Provide external support resources alongside internal reporting',
        ],
      },
      {
        step: 5,
        title: 'Establish a Blame-Free Language Guide',
        description:
          'Create a style guide with approved and prohibited phrases for user-facing copy',
        example:
          'Prohibited: "You made an error" / Approved: "Something went wrong"',
        tips: [
          'Include specific before/after examples for common scenarios',
          'Train support staff and content writers on the guide',
          'Integrate blame-detection linting into content review processes',
        ],
      },
    ],

    dos: [
      'Use system-owned language in error messages ("Something went wrong" not "You made an error")',
      'Lead security notifications with what the company has done to protect the user',
      'Open support interactions with empathy before diagnostic questions',
      'Validate abuse reporters immediately and offer protective actions',
      'Frame recovery actions as empowering choices, not punitive corrections',
      'Provide clear, actionable next steps in every error or incident state',
      'Test all user-facing copy by reading it aloud to someone in a stressed state',
      'Default protective actions to "on" in reporting flows',
    ],

    donts: [
      'Don\'t use accusatory "you" language in error messages',
      'Don\'t lead breach notifications with what the user did wrong',
      'Don\'t require users to prove they tried basic steps before offering help',
      'Don\'t question reporters\' behavior or timing in abuse reporting flows',
      'Don\'t use "You should have..." in any user-facing communication',
      'Don\'t frame security best practices as things the user "failed" to do',
      'Don\'t design support flows that assume user error as the default',
      'Don\'t use aggressive red styling for recoverable errors',
    ],

    bestPractices: [
      {
        title: 'The "Stressed User" Test',
        description:
          'Read every error message, notification, and support script aloud as if speaking to someone who is stressed, frustrated, or afraid',
        rationale:
          'Users encountering errors or security issues are already in a negative emotional state; blame language amplifies distress',
        example:
          'Read "You entered invalid data" to a stressed person vs "Let\'s try that again -- here\'s the format we need"',
      },
      {
        title: 'System-First Attribution',
        description:
          'Default to attributing errors and issues to the system, not the user, unless there is a specific safety reason to do otherwise',
        rationale:
          'Most "user errors" are actually design failures; the system should own the problem',
        example:
          '"We couldn\'t process that" instead of "You submitted incorrect information"',
      },
      {
        title: 'Protection-First Security',
        description:
          'In security incidents, lead with protective actions taken, then offer empowering next steps',
        rationale:
          'Users who feel protected maintain trust; users who feel blamed disengage',
        example:
          'Structure: "We blocked the attempt" -> "Your data is safe" -> "Optional extra steps"',
      },
      {
        title: 'Empathy-First Support',
        description:
          'Every support interaction should begin with acknowledgment and empathy before any diagnostic questions',
        rationale:
          'Users in need of support are already frustrated; interrogation increases escalation rates',
        example:
          '"I\'m sorry you\'re experiencing this. Let me help." before "Can you describe what happened?"',
      },
      {
        title: 'Validating Reporting Flows',
        description:
          'Abuse and incident reporting should open with validation and close with clear next steps',
        rationale:
          'Reporters who feel validated are more likely to complete reports and remain on the platform',
        example:
          'Open: "Thank you for reporting this." Close: "We\'ll review within 24 hours."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification -- Errors must be identified and described in text without blaming the user',
        implementation:
          'Use descriptive, supportive error text that identifies the issue and suggests correction without accusatory language. "Email address needs an @ symbol" not "You forgot the @".',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion -- Provide constructive suggestions for fixing errors',
        implementation:
          'Offer specific, helpful correction suggestions rather than generic blame. Show examples of correct input format alongside the error.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships -- Error states must be semantically conveyed without relying on blame-laden visual cues alone',
        implementation:
          'Use ARIA roles and properties to convey error states. Ensure screen reader announcements use the same blame-free language as visual error messages.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages -- Status messages must be programmatically determinable without blaming language',
        implementation:
          'ARIA live regions announcing errors should use supportive phrasing. "Changes could not be saved" not "You failed to save your changes".',
      },
    ],

    ethics: [
      {
        concern: 'User Shaming',
        severity: 'critical',
        explanation:
          'Error messages and notifications that shame users for mistakes, making them feel stupid or incompetent',
        mitigation:
          'Adopt system-owned error language universally. Treat every error as a design failure, not a user failure. Train content teams on empathetic copy.',
      },
      {
        concern: 'Breach Responsibility Deflection',
        severity: 'critical',
        explanation:
          'Companies shifting blame to users for security breaches that were caused or enabled by inadequate company security',
        mitigation:
          'Lead breach notifications with company accountability and protective actions. Avoid language that implies the user caused the breach.',
      },
      {
        concern: 'Reporter Intimidation',
        severity: 'critical',
        explanation:
          'Reporting flows that discourage legitimate reports by questioning the reporter\'s behavior, credibility, or timing',
        mitigation:
          'Design reporting as a supportive process. Validate reporters immediately. Never require justification for reporting.',
      },
      {
        concern: 'Support Gatekeeping',
        severity: 'high',
        explanation:
          'Support flows that require users to prove they aren\'t at fault before receiving help',
        mitigation:
          'Provide help first, diagnose second. Never make support conditional on the user proving they followed instructions.',
      },
      {
        concern: 'Vulnerable User Impact',
        severity: 'critical',
        explanation:
          'Blame language disproportionately harms users who are already vulnerable: abuse victims, phishing targets, elderly users, users with cognitive disabilities',
        mitigation:
          'Design all copy for the most vulnerable user. What feels neutral to a confident user can feel devastating to a vulnerable one.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Belief in a Just World: A Fundamental Delusion',
        author: 'Lerner, M. J.',
        year: 1980,
        description:
          'The foundational work on just-world hypothesis and how it drives victim blaming behavior',
        type: 'foundational',
      },
      {
        title: 'Blaming the Victim',
        author: 'Ryan, W.',
        year: 1971,
        description:
          'Coined the term "blaming the victim" and analyzed how systemic failures are attributed to individuals',
        type: 'foundational',
      },
      {
        title: 'Defensive Attribution Hypothesis Revisited',
        author: 'Shaver, K. G.',
        year: 1970,
        description:
          'Research on how observer similarity to victims affects blame attribution and defensive distancing',
        type: 'advanced',
      },
      {
        title: 'The Role of the Just-World Belief in Victim Blaming and Secondary Victimization',
        author: 'Hafer, C. L., & Begue, L.',
        year: 2005,
        doi: '10.1207/s15327957pspr0902_4',
        description:
          'Meta-analysis of just-world research and its implications for how institutions treat victims',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Blaming the Victim',
        author: 'Ryan, William',
        year: 1971,
        isbn: '9780394717623',
        description:
          'The seminal book that identified and named victim blaming as a systemic social phenomenon',
        type: 'foundational',
      },
      {
        title: 'The Belief in a Just World: A Fundamental Delusion',
        author: 'Lerner, Melvin J.',
        year: 1980,
        isbn: '9780306404955',
        description:
          'Comprehensive exploration of the just-world hypothesis and its psychological consequences',
        type: 'foundational',
      },
      {
        title: 'Mistakes Were Made (But Not by Me)',
        author: 'Tavris, Carol & Aronson, Elliot',
        year: 2007,
        isbn: '9780156033909',
        description:
          'Explores how cognitive dissonance leads to self-justification and victim blaming in individuals and institutions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Empathetic Error Messages: A UX Writing Guide',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/error-message-guidelines/',
        description:
          'Practical guidelines for writing blame-free, helpful error messages',
        type: 'practical',
      },
      {
        title: 'The Language of Trust: How Word Choice Affects User Experience',
        author: 'UX Collective',
        url: 'https://uxdesign.cc/the-language-of-trust/',
        description:
          'How language patterns in interfaces build or erode user trust, with emphasis on error states',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Just World Fallacy',
        author: 'Vsauce',
        url: 'https://www.youtube.com/watch?v=4HwBBCUp0rM',
        description:
          'Accessible explanation of the just-world hypothesis and how it drives victim blaming',
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
      'fundamental-attribution-error', // Overattributing behavior to character rather than circumstances
      'just-world-hypothesis', // The underlying belief system that drives victim blaming
      'hindsight-bias', // "They should have known" reasoning after negative events
      'defensive-attribution', // Blaming victims to maintain personal sense of safety
    ],

    conflicts: [
      'empathy-gap', // Understanding the victim's emotional state counteracts blame
      'actor-observer-bias', // We blame others' character but our own circumstances
    ],

    confusedWith: [
      'fundamental-attribution-error', // Related but broader than victim blaming
      'just-world-hypothesis', // The belief system, not the behavior itself
      'hindsight-bias', // Overlaps but operates on a different mechanism
    ],

    hierarchy: {
      parent: 'attribution-bias',
      children: [
        'secondary-victimization',
        'defensive-attribution',
      ],
    },
  },
};
