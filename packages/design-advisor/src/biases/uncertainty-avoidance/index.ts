/**
 * UNCERTAINTY AVOIDANCE
 *
 * Strong discomfort with ambiguity and unknown outcomes
 * leading to preference for structure, rules, and predictability.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const uncertaintyAvoidance: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'uncertainty-avoidance',
    name: 'Uncertainty Avoidance',
    aliases: ['Ambiguity Aversion', 'Intolerance of Uncertainty', 'Need for Closure'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'ambiguity',
      'predictability',
      'structure',
      'clarity',
      'risk-perception',
      'decision-making',
      'cultural-dimension',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People feel strong discomfort with ambiguity and unknown outcomes, leading them to prefer structure, explicit rules, and predictable experiences.',

    detailed: `Uncertainty avoidance describes the degree to which individuals feel threatened by ambiguous or unknown situations. People high in uncertainty avoidance prefer clear rules, structured environments, and predictable outcomes. They seek explicit instructions, avoid risk, and gravitate toward familiar patterns.

Originally identified as a cultural dimension by Geert Hofstede, uncertainty avoidance also operates at the individual cognitive level. When faced with ambiguity, the brain triggers anxiety responses that drive people toward rigid thinking, rule-following, and resistance to novel or unfamiliar experiences.

In UX and product design, uncertainty avoidance manifests as user frustration with unclear affordances, unpredictable navigation, vague error messages, and missing feedback. Designers who understand this bias create interfaces with clear labels, predictable patterns, explicit instructions, progress indicators, and strong confirmation mechanisms -- reducing cognitive load and anxiety throughout the user journey.`,

    psychologyBasis: {
      discoveredBy: 'Geert Hofstede',
      year: 1980,
      theory: 'Cultural Dimensions Theory / Ambiguity Aversion',
      mechanism: `The brain treats ambiguity as a threat signal, triggering stress responses that drive rigid, rule-bound behavior. This happens because:

1. **Threat Detection**: The amygdala interprets ambiguous situations as potentially dangerous, activating fight-or-flight responses
2. **Cognitive Closure Need**: Uncertain states are cognitively expensive to maintain; the brain seeks resolution through rules and structure
3. **Loss Aversion Amplification**: Unknown outcomes are weighted more negatively than known negative outcomes (the Ellsberg Paradox)
4. **Pattern Completion**: The brain aggressively fills gaps in information, preferring any answer to no answer
5. **Anxiety Cascade**: Prolonged ambiguity generates escalating anxiety, reducing working memory capacity and degrading decision quality

This mechanism is automatic -- users don't consciously choose to avoid uncertainty; they experience genuine discomfort that drives them toward structured, predictable interactions.`,
    },

    realWorldExample: `In the Ellsberg Paradox (1961), participants were shown two urns: one containing 50 red and 50 black balls (known probabilities), and another with 100 balls of unknown red/black distribution. Most people strongly preferred to bet on the known urn, even though the expected value was identical. This demonstrates that people don't just dislike risk -- they specifically avoid ambiguity and unknown probabilities. In UI terms, users will abandon a flow with unclear outcomes even when the actual risk is low, simply because the uncertainty itself feels threatening.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Uncertainty avoidance profoundly affects how users interact with interfaces, especially during unfamiliar tasks, complex workflows, and high-stakes decisions. Designers can address this by:

- Providing clear affordances so users always know what elements do
- Using predictable, consistent navigation patterns across the product
- Writing explicit instructions and labels that leave no room for ambiguity
- Reducing ambiguity in forms, error states, and confirmation flows
- Showing progress indicators and system status at all times
- Offering undo/rollback options to reduce fear of irreversible actions`,

    whenToUse: [
      {
        title: 'Form Design and Data Entry',
        scenario:
          'When users must provide information, especially in multi-step or unfamiliar forms',
        example:
          'Show clear field labels, input format examples, inline validation, and character counts so users know exactly what is expected',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Navigation and Wayfinding',
        scenario: 'When users need to find features or move through a product',
        example:
          'Use consistent navigation patterns, breadcrumbs, and clear page titles so users always know where they are and how to get back',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Handling and Recovery',
        scenario: 'When something goes wrong or user input is invalid',
        example:
          'Show specific error messages explaining what went wrong and exactly how to fix it, rather than generic "Something went wrong" messages',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding and First-Run Experiences',
        scenario: 'When new users encounter the product for the first time',
        example:
          'Provide guided tours, tooltips, and sample data so users can explore safely without fear of breaking things',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Destructive or Irreversible Actions',
        scenario: 'When actions cannot be undone, such as deletion or submission',
        example:
          'Show clear confirmation dialogs explaining consequences, offer undo windows, and visually distinguish destructive actions from safe ones',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Progress and System Status',
        scenario: 'When users are waiting for processes to complete',
        example:
          'Use progress bars with estimated time, step indicators in multi-step flows, and clear loading states so users know the system is working',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exploratory or Creative Interfaces',
        reason:
          'Over-constraining the experience can stifle creativity and discovery',
        consequence:
          'Users might feel restricted and unable to explore freely',
        alternative:
          'Provide structured starting points but allow open-ended exploration with easy undo',
      },
      {
        title: 'Expert or Power-User Tools',
        reason:
          'Experienced users may find excessive guidance patronizing and slow',
        consequence:
          'Expert users abandon tools that treat them like beginners',
        alternative:
          'Offer progressive disclosure: clear defaults for beginners, shortcuts and flexibility for experts',
      },
      {
        title: 'Gamified or Playful Experiences',
        reason:
          'Some uncertainty drives engagement in games and playful interactions',
        consequence:
          'Removing all surprise eliminates the delight and curiosity that drives engagement',
        alternative:
          'Maintain uncertainty in reward mechanics while keeping core navigation and controls predictable',
      },
      {
        title: 'Innovation Adoption Contexts',
        reason:
          'Overly familiar patterns can prevent users from discovering new capabilities',
        consequence:
          'Novel features go unnoticed because the interface is too conservative',
        alternative:
          'Introduce novelty gradually with clear explanations and the option to revert',
      },
    ],

    commonMistakes: [
      {
        title: 'Vague Error Messages',
        description:
          'Showing generic error text like "An error occurred" without explanation or next steps',
        why: 'Users cannot resolve the issue and experience heightened anxiety about what went wrong',
        fix: 'Provide specific error descriptions and actionable recovery steps: "Your password must contain at least 8 characters, including one number"',
      },
      {
        title: 'Missing Progress Indicators',
        description:
          'Multi-step flows without step counts, progress bars, or time estimates',
        why: 'Users don\'t know how much effort remains, triggering abandonment anxiety',
        fix: 'Show "Step 2 of 4" indicators, progress bars, and estimated completion times',
      },
      {
        title: 'Ambiguous Button Labels',
        description:
          'Using vague labels like "Submit", "Continue", or "OK" without context',
        why: 'Users don\'t know what will happen when they click, causing hesitation',
        fix: 'Use action-specific labels: "Place Order", "Save Draft", "Delete Account" that describe the outcome',
      },
      {
        title: 'Inconsistent Patterns',
        description:
          'Navigation, controls, or layouts that change behavior across different sections',
        why: 'Users cannot build reliable mental models, increasing cognitive load with each interaction',
        fix: 'Establish and maintain consistent design patterns: same position for navigation, same behavior for similar controls',
      },
      {
        title: 'No Undo or Recovery Path',
        description:
          'Destructive actions without confirmation, undo, or recovery options',
        why: 'Fear of irreversible consequences prevents users from taking action at all',
        fix: 'Provide confirmation dialogs for destructive actions, undo windows (e.g., "Undo" toast for 10 seconds), and recovery options',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Predictable layouts reduce spatial uncertainty and help users build reliable mental models',
        examples: [
          'Consistent placement of navigation, actions, and content across all pages',
          'Familiar layout patterns (F-pattern, Z-pattern) that match user expectations',
          'Clear visual grouping of related elements reduces ambiguity about relationships',
          'Consistent grid systems create predictable content placement',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Clear typography hierarchy reduces ambiguity about content importance and structure',
        examples: [
          'Consistent heading hierarchy signals content organization',
          'Clear label typography distinguishes labels from values and placeholders',
          'Readable font sizes reduce strain and uncertainty about content',
          'Monospaced fonts for code or data entry signal expected input format',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Consistent color semantics create predictable meaning across the interface',
        examples: [
          'Red consistently means error or danger across all components',
          'Green consistently signals success or safe actions',
          'Consistent use of brand colors for interactive vs static elements',
          'Color-coded status indicators (red/yellow/green) provide instant clarity',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Predictable interactions are the primary way to reduce uncertainty avoidance anxiety',
        examples: [
          'Hover states preview what will happen before clicking',
          'Consistent click/tap behavior across similar elements',
          'Clear affordances (buttons look clickable, links look navigable)',
          'Immediate feedback after every action confirms the system responded',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Clear, explicit content eliminates ambiguity about what to do and what to expect',
        examples: [
          'Explicit instructions before form fields ("Enter your 10-digit phone number")',
          'Confirmation messages that describe what just happened',
          'Tooltips and help text that explain unfamiliar terms or features',
          'Clear next-step guidance after completing actions',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible interfaces reduce uncertainty for users who rely on assistive technology',
        examples: [
          'ARIA labels provide clear context for screen reader users navigating unfamiliar interfaces',
          'Focus indicators show keyboard users exactly where they are',
          'Skip links and landmarks provide predictable navigation structure',
          'Alt text on icons and images removes ambiguity about their meaning',
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
        title: 'Explicit Form with Inline Validation',
        description:
          'Registration form with clear labels, format hints, and real-time validation',
        code: `<form class="registration-form">
  <div class="field">
    <label for="email">Email address</label>
    <input type="email" id="email" placeholder="you@example.com"
           aria-describedby="email-hint" />
    <span id="email-hint" class="hint">We'll send a verification link to this address</span>
  </div>

  <div class="field">
    <label for="password">Password</label>
    <input type="password" id="password"
           aria-describedby="password-requirements" />
    <div id="password-requirements" class="requirements">
      <span class="met">At least 8 characters</span>
      <span class="met">One uppercase letter</span>
      <span class="unmet">One number</span>
      <span class="unmet">One special character (!@#$%)</span>
    </div>
  </div>

  <button type="submit" class="primary">Create Account</button>
  <p class="reassurance">You can change all settings later. No credit card required.</p>
</form>`,
        explanation:
          'Every field has a clear label, format example, and real-time validation. Users know exactly what is expected and can see their progress toward meeting requirements. The reassurance text reduces commitment anxiety.',
        principle:
          'Explicit expectations and real-time feedback eliminate input uncertainty',
        metrics: {
          before: '34% form completion rate with generic validation on submit',
          after: '67% form completion rate with inline validation and hints',
          improvement: '97% increase in form completion rate',
        },
      },
      {
        title: 'Multi-Step Flow with Clear Progress',
        description:
          'Checkout process with step indicator, progress bar, and time estimate',
        code: `<div class="checkout-flow">
  <nav class="progress-indicator" aria-label="Checkout progress">
    <ol>
      <li class="completed" aria-current="false">
        <span class="step-number">1</span>
        <span class="step-label">Shipping</span>
      </li>
      <li class="current" aria-current="step">
        <span class="step-number">2</span>
        <span class="step-label">Payment</span>
      </li>
      <li class="upcoming">
        <span class="step-number">3</span>
        <span class="step-label">Review</span>
      </li>
    </ol>
    <div class="progress-bar" role="progressbar"
         aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-fill" style="width: 66%"></div>
    </div>
    <p class="time-estimate">About 2 minutes remaining</p>
  </nav>

  <section class="step-content">
    <h2>Payment Details</h2>
    <!-- form content -->
  </section>

  <div class="step-actions">
    <button class="secondary">Back to Shipping</button>
    <button class="primary">Continue to Review</button>
  </div>
</div>`,
        explanation:
          'Users always know where they are (step 2 of 3), how far they have come (66% progress bar), and how long it will take (2 minutes). Back buttons provide escape routes, reducing commitment anxiety.',
        principle:
          'Clear progress and time estimates reduce abandonment from unknown scope',
        metrics: {
          before: '52% checkout completion without progress indicator',
          after: '71% checkout completion with step indicator and time estimate',
          improvement: '37% increase in checkout completion',
        },
      },
      {
        title: 'Specific Error Messages with Recovery Actions',
        description:
          'Error state with clear explanation and actionable recovery steps',
        code: `<div class="error-state" role="alert">
  <div class="error-icon" aria-hidden="true">
    <svg><!-- warning icon --></svg>
  </div>

  <h3>Payment could not be processed</h3>

  <p class="error-detail">
    Your card ending in <strong>4242</strong> was declined by your bank.
    This usually happens when the billing address doesn't match your
    card's registered address.
  </p>

  <div class="recovery-actions">
    <h4>What you can do:</h4>
    <ol>
      <li>
        <button class="link">Update your billing address</button>
        to match the address on your card statement
      </li>
      <li>
        <button class="link">Try a different payment method</button>
      </li>
      <li>
        <button class="link">Contact your bank</button>
        to authorize the transaction
      </li>
    </ol>
  </div>

  <p class="reassurance">Your order has been saved and no charges were made.</p>
</div>`,
        explanation:
          'The error message explains what happened (card declined), why it likely happened (address mismatch), and provides three specific recovery actions. The reassurance that no charges were made reduces anxiety about the failed state.',
        principle:
          'Specific errors with clear recovery paths turn uncertainty into confident action',
      },
    ],

    bad: [
      {
        title: 'Vague Error with No Recovery Path',
        description:
          'Generic error message that provides no explanation or next steps',
        code: `<!-- DON'T DO THIS -->
<div class="error">
  <p>Something went wrong. Please try again later.</p>
  <button>OK</button>
</div>`,
        explanation:
          'Users have no idea what went wrong, whether their data was saved, or what "later" means. The vague message creates maximum uncertainty and anxiety. "OK" is not an action; it just dismisses the problem.',
        principle:
          'Vague errors are the worst form of uncertainty -- users cannot act on information they don\'t have',
      },
      {
        title: 'Mystery Navigation',
        description:
          'Icon-only navigation without labels or tooltips',
        code: `<!-- DON'T DO THIS -->
<nav class="sidebar">
  <button><svg><!-- abstract icon --></svg></button>
  <button><svg><!-- abstract icon --></svg></button>
  <button><svg><!-- abstract icon --></svg></button>
  <button><svg><!-- abstract icon --></svg></button>
  <button><svg><!-- abstract icon --></svg></button>
</nav>`,
        explanation:
          'Users must guess what each icon means. Without labels, tooltips, or established conventions, every click is a gamble. This forces trial-and-error navigation, which high-uncertainty-avoidance users will refuse to do.',
        principle:
          'Unlabeled icons force users to gamble on outcomes, triggering avoidance behavior',
      },
      {
        title: 'Unpredictable Destructive Action',
        description:
          'Delete action without confirmation or undo option',
        code: `<!-- DON'T DO THIS -->
<div class="item-actions">
  <button class="action" onclick="deleteItem()">
    <svg><!-- trash icon --></svg>
  </button>
  <!-- Item is permanently deleted on click. No confirmation. No undo. -->
</div>`,
        explanation:
          'A single accidental click permanently destroys data. No confirmation dialog, no undo option, and the icon-only button with no label means users might click it by mistake. This creates paralyzing fear of interacting with the interface.',
        principle:
          'Irreversible actions without safeguards create fear that prevents all interaction',
      },
    ],

    realWorld: [
      {
        company: 'German Enterprise Software (SAP)',
        product: 'SAP ERP Interfaces',
        description: 'SAP interfaces reflect Germany\'s high uncertainty avoidance culture (UAI 65): explicit field labels, strict input validation, comprehensive help documentation, structured workflows with clear step sequences, and detailed confirmation screens before any transaction.',
        effectiveness: 'very-effective',
        analysis: 'SAP\'s structured approach matches its enterprise user base, who prioritize accuracy and auditability over speed. Every action is explicit and reversible, which builds deep trust in high-stakes business contexts.',
      },
      {
        company: 'Stripe',
        product: 'Stripe Checkout',
        description: 'Stripe\'s checkout flow uses inline validation, real-time card type detection, clear error messages, progress indicators, and explicit security badges. Every step communicates exactly what will happen before the user commits.',
        effectiveness: 'very-effective',
        analysis: 'By reducing ambiguity at every step of payment, Stripe achieves industry-leading conversion rates. The explicit security indicators and clear form feedback address the heightened uncertainty avoidance users feel during financial transactions.',
      },
      {
        company: 'Apple',
        product: 'iOS System Dialogs',
        description: 'iOS uses specific, descriptive button labels in confirmation dialogs ("Delete 3 Photos" instead of "OK"), provides undo in many contexts (shake to undo, Recently Deleted folder), and shows clear system status in the status bar.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s approach to destructive actions is exemplary: specific labels describe the consequence, red coloring signals danger, and a 30-day recovery period for deleted photos eliminates the finality anxiety that prevents action.',
      },
      {
        company: 'TurboTax',
        product: 'Tax Filing Flow',
        description: 'TurboTax uses a highly structured step-by-step flow with progress tracking, contextual help, real-time calculations, and constant reassurance ("You\'re on track for a $2,400 refund"). Users always know where they are and what comes next.',
        effectiveness: 'very-effective',
        analysis: 'Tax filing is inherently high-anxiety. TurboTax addresses uncertainty avoidance by breaking an overwhelming task into small, predictable steps with constant feedback and reassurance about outcomes.',
      },
    ],

    abTests: [
      {
        title: 'Form Validation: Submit-Time vs Inline Real-Time',
        hypothesis:
          'Real-time inline validation will reduce form abandonment by eliminating uncertainty about input correctness',
        controlVersion: {
          description:
            'Registration form that validates all fields on submit, showing all errors at the top of the form',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '4:12',
            errorRate: '68% of first submissions had errors',
          },
        },
        treatmentVersion: {
          description:
            'Registration form with real-time inline validation showing green checkmarks for valid fields and specific error messages as users type',
          metrics: {
            conversionRate: '67%',
            timeOnPage: '2:45',
            errorRate: '12% of submissions had errors',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Real-time validation nearly doubled completion rates and cut time-on-page by 35%. Users felt confident at each field rather than anxious about discovering errors only after submitting. Error rate dropped by 82% because users corrected issues in real time.',
          learnings: [
            'Immediate feedback eliminates uncertainty about whether input is correct',
            'Users prefer knowing requirements upfront rather than discovering them through errors',
            'Green checkmarks provide positive reinforcement that reduces anxiety',
            'Specific inline messages are far more actionable than error summaries at page top',
          ],
        },
      },
      {
        title: 'Button Labels: Generic vs Action-Specific',
        hypothesis:
          'Specific button labels that describe the outcome will increase click-through rates',
        controlVersion: {
          description:
            'Checkout page with generic button labels: "Submit", "Continue", "OK"',
          metrics: {
            conversionRate: '41%',
            clickThroughRate: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Checkout page with specific button labels: "Place Order - $49.99", "Continue to Payment", "Save and Exit"',
          metrics: {
            conversionRate: '58%',
            clickThroughRate: '73%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Specific labels increased conversion by 41% and click-through by 33%. Users reported feeling more confident because they knew exactly what each button would do before clicking.',
          learnings: [
            'Generic labels create a micro-uncertainty at every decision point',
            'Including the price in the final CTA eliminates last-second price anxiety',
            '"Save and Exit" as an alternative reduces commitment pressure',
            'Action-specific labels serve as implicit confirmation of user intent',
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
        name: 'Missing Field Labels',
        description:
          'Form fields that rely on placeholder text instead of persistent labels',
        howToSpot:
          'Look for input fields where the only hint disappears when users start typing',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Progress Indicators',
        description:
          'Multi-step flows without step counts, progress bars, or breadcrumbs',
        howToSpot:
          'Check multi-step processes for any indicator of current position and total steps',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Generic Error States',
        description:
          'Error messages that lack specificity, explanation, or recovery guidance',
        howToSpot:
          'Trigger error states and check if messages explain what happened and how to fix it',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Ambiguous Button Labels',
        description:
          'Buttons labeled with generic text like "Submit", "OK", or "Continue" without context',
        howToSpot:
          'Review all CTAs and check if the label describes the specific action outcome',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Inconsistent Navigation',
        description:
          'Navigation elements that change position, behavior, or appearance across pages',
        howToSpot:
          'Navigate through multiple sections and verify navigation remains consistent',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Ambiguous Interaction Pattern',
        description:
          'Interactive elements whose outcome cannot be predicted before clicking',
        indicators: [
          'Icon-only buttons without labels or tooltips',
          'Links that don\'t indicate destination or action',
          'Buttons with generic labels ("Submit", "Go")',
          'Controls that change behavior depending on hidden context',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Feedback Pattern',
        description:
          'Actions that complete without clear confirmation or status update',
        indicators: [
          'Form submissions with no success message',
          'Save actions without visual confirmation',
          'Background processes with no loading state',
          'Status changes without notification',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Irreversible Action Pattern',
        description:
          'Destructive or permanent actions without confirmation or undo mechanisms',
        indicators: [
          'Delete buttons without confirmation dialogs',
          'Form submissions with no way to edit afterward',
          'Account actions (close, downgrade) without review step',
          'Batch operations without preview of affected items',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Structural Ambiguity Pattern',
        description:
          'Interface layouts where relationships between elements are unclear',
        indicators: [
          'Labels visually distant from their associated fields',
          'Grouped items without clear boundaries or headings',
          'Actions that could apply to multiple adjacent elements',
          'Nested menus with unclear hierarchy',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users predict the outcome of every interactive element before clicking?',
      'Do all form fields have persistent, visible labels (not just placeholders)?',
      'Are error messages specific enough to guide recovery?',
      'Do multi-step flows show current position and total steps?',
      'Are destructive actions protected by confirmation dialogs?',
      'Is there an undo mechanism for important actions?',
      'Does the navigation remain consistent across all sections?',
      'Do loading states communicate that the system is processing?',
      'Are button labels specific to the action they perform?',
      'Can users easily find help or documentation when confused?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in uncertainty avoidance.

Analyze the provided design for uncertainty avoidance issues. Identify:

1. **Ambiguous Affordances**: Elements whose purpose or outcome is unclear
2. **Missing Feedback**: Actions that lack confirmation, progress, or status indicators
3. **Vague Content**: Labels, errors, or instructions that leave room for interpretation
4. **Inconsistent Patterns**: Navigation, controls, or layouts that break user expectations
5. **Irreversible Actions**: Destructive operations without safeguards

For each issue found:
- Identify where ambiguity exists and its severity
- Assess the anxiety level it creates for users
- Determine if it could cause abandonment or errors
- Suggest specific improvements to reduce uncertainty
- Evaluate whether appropriate recovery paths exist

Consider:
- Do users always know where they are and what to do next?
- Can users predict the outcome of every action before taking it?
- Are error states clear enough for users to self-recover?
- Is the interface consistent enough to build reliable mental models?
- Are high-stakes actions protected by appropriate safeguards?
- Does the design account for varying levels of uncertainty tolerance?

Provide actionable recommendations for reducing ambiguity and increasing predictability.`,

    outputSchema: {
      type: 'object',
      properties: {
        uncertaintyIssues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              ambiguitySource: { type: 'string' },
              anxietyLevel: { type: 'string' },
              abandonmentRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'ambiguitySource',
              'anxietyLevel',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            clarityScore: { type: 'number' },
            predictabilityScore: { type: 'number' },
            feedbackScore: { type: 'number' },
            recoverabilityScore: { type: 'number' },
          },
          required: [
            'clarityScore',
            'predictabilityScore',
            'feedbackScore',
            'recoverabilityScore',
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
        'uncertaintyIssues',
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
        title: 'Audit Ambiguity Points',
        description:
          'Walk through every user flow and identify where users might be unsure about what to do or what will happen',
        example:
          'Map each screen and label every element where the outcome is not immediately obvious',
        tips: [
          'Pay special attention to forms, navigation, and destructive actions',
          'Test with users unfamiliar with the product',
          'Check error states, empty states, and edge cases',
        ],
      },
      {
        step: 2,
        title: 'Add Explicit Labels and Instructions',
        description:
          'Replace vague labels with specific, action-oriented text that describes outcomes',
        example:
          'Change "Submit" to "Place Order - $49.99"; change "Error" to "Invalid email format. Example: name@company.com"',
        tips: [
          'Use verb + object pattern for buttons: "Save Draft", "Delete Account"',
          'Add format hints to form fields: "MM/DD/YYYY"',
          'Include help text for complex or unfamiliar fields',
        ],
      },
      {
        step: 3,
        title: 'Implement Consistent Patterns',
        description:
          'Ensure navigation, controls, and feedback behave identically across all sections',
        example:
          'Navigation is always in the same position, save buttons always look and behave the same way',
        tips: [
          'Create and follow a component library with documented behaviors',
          'Use the same color semantics everywhere (red = error, green = success)',
          'Maintain consistent interaction patterns for similar actions',
        ],
      },
      {
        step: 4,
        title: 'Add Feedback and Progress',
        description:
          'Ensure every user action produces visible feedback and multi-step flows show progress',
        example:
          'Show "Saved successfully" toast after save, progress bar during uploads, step indicators in wizards',
        tips: [
          'Every click should produce visible feedback within 100ms',
          'Long operations need progress indicators or spinners',
          'Multi-step flows need step counts and progress bars',
        ],
      },
      {
        step: 5,
        title: 'Protect Against Irreversibility',
        description:
          'Add confirmation dialogs, undo mechanisms, and recovery paths for destructive actions',
        example:
          'Confirmation: "Delete 3 files permanently?" with specific file names listed; Undo: "Files deleted. Undo (10s)"',
        tips: [
          'Confirmation dialogs should describe the specific consequence',
          'Undo windows give users a safety net that encourages action',
          'Soft-delete with recovery period is better than hard-delete',
        ],
      },
      {
        step: 6,
        title: 'Test with Uncertainty-Sensitive Users',
        description:
          'Validate designs with users who are unfamiliar with the product or domain',
        example:
          'Recruit first-time users and measure task completion without assistance',
        tips: [
          'Watch for hesitation, hovering, and re-reading as uncertainty signals',
          'Ask users to predict what will happen before they click',
          'Measure time-to-confidence, not just task completion',
        ],
      },
    ],

    dos: [
      'Use specific, action-descriptive button labels ("Place Order", not "Submit")',
      'Show persistent field labels that remain visible during and after input',
      'Provide inline validation with specific, actionable error messages',
      'Display progress indicators in multi-step flows (step X of Y)',
      'Use confirmation dialogs for destructive or irreversible actions',
      'Maintain consistent navigation and control patterns across all sections',
      'Offer undo mechanisms for important actions',
      'Show system status during loading, processing, and transitions',
      'Provide help text and tooltips for unfamiliar or complex features',
      'Use predictable, conventional design patterns users already understand',
    ],

    donts: [
      'Don\'t use placeholder text as the only label for form fields',
      'Don\'t show generic errors like "Something went wrong" without recovery steps',
      'Don\'t allow destructive actions without confirmation',
      'Don\'t change navigation patterns between different sections',
      'Don\'t use icon-only controls without labels or tooltips',
      'Don\'t leave users without feedback after submitting forms or triggering actions',
      'Don\'t hide critical information behind hover-only interactions',
      'Don\'t use ambiguous language that could be interpreted multiple ways',
      'Don\'t make users guess input formats (show examples and masks)',
      'Don\'t create silent failures where errors occur without user notification',
    ],

    bestPractices: [
      {
        title: 'Progressive Disclosure with Clear Paths',
        description:
          'Reveal complexity gradually while always showing the user where they are and what comes next',
        rationale:
          'Overwhelming users with all options at once creates decision paralysis; hiding everything creates uncertainty',
        example:
          'Show 3 primary options with a "More options" expansion that reveals advanced settings',
      },
      {
        title: 'Predictable Interaction Feedback',
        description:
          'Every interactive element should provide immediate, consistent feedback on hover, click, and completion',
        rationale:
          'Feedback closes the action-outcome loop, confirming the system received and processed user input',
        example:
          'Button shows hover state -> click animation -> loading spinner -> success toast',
      },
      {
        title: 'Defensive Design for Destructive Actions',
        description:
          'Protect users from accidental damage with escalating safeguards proportional to the consequence',
        rationale:
          'Fear of irreversible mistakes prevents users from taking any action, including safe ones',
        example:
          'Minor action: undo toast. Major action: confirmation dialog. Critical action: type-to-confirm ("Type DELETE to confirm")',
      },
      {
        title: 'Structured Empty States',
        description:
          'Empty states should guide users toward their first action with clear, specific instructions',
        rationale:
          'A blank screen is maximum ambiguity; users don\'t know what to do first',
        example:
          'Empty project list: "Create your first project" button + sample project template + guided tutorial link',
      },
      {
        title: 'Consistent Semantic Color System',
        description:
          'Use color consistently to communicate meaning: red = error/danger, green = success, yellow = warning, blue = information',
        rationale:
          'Consistent color semantics let users instantly understand status without reading text',
        example:
          'All error states use the same red, all success states use the same green, across every component',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide labels or instructions when content requires user input',
        implementation:
          'Every form field must have a visible, persistent <label> element. Placeholder text is not a substitute for labels. Include format requirements in help text.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Identify and describe errors in text',
        implementation:
          'Error messages must identify the field in error, describe what went wrong, and suggest how to fix it. Use aria-invalid and aria-describedby to connect errors to fields.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation - Navigation mechanisms that are repeated on multiple pages occur in the same relative order',
        implementation:
          'Keep navigation elements in the same position and order on every page. Avoid rearranging menus based on usage or context.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Components with the same functionality are identified consistently',
        implementation:
          'Use the same labels, icons, and behavior for functionally identical components. A search icon should always mean search.',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Urgency',
        severity: 'high',
        explanation:
          'Creating artificial time pressure that exploits uncertainty anxiety to force hasty decisions',
        mitigation:
          'Only show countdown timers or urgency indicators when the time constraint is real and meaningful to the user.',
      },
      {
        concern: 'Weaponized Complexity',
        severity: 'critical',
        explanation:
          'Deliberately making cancellation, unsubscription, or returns confusing to prevent users from leaving',
        mitigation:
          'Make exit paths as clear and predictable as entry paths. Cancellation should be as easy as sign-up.',
      },
      {
        concern: 'False Reassurance',
        severity: 'high',
        explanation:
          'Using security badges, guarantees, or reassurance text that is misleading or unsubstantiated',
        mitigation:
          'Only display trust indicators that are accurate and verifiable. Don\'t show security badges without actual security measures.',
      },
      {
        concern: 'Learned Helplessness',
        severity: 'medium',
        explanation:
          'Over-constraining the interface so much that users cannot learn or grow confident with the product',
        mitigation:
          'Provide structure for beginners but allow users to graduate to less constrained modes as they gain experience.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Culture\'s Consequences: International Differences in Work-Related Values',
        author: 'Hofstede, G.',
        year: 1980,
        description:
          'The foundational work introducing uncertainty avoidance as a cultural dimension, based on IBM employee surveys across 40 countries',
        type: 'foundational',
      },
      {
        title: 'Risk, Ambiguity, and the Savage Axioms',
        author: 'Ellsberg, D.',
        year: 1961,
        doi: '10.2307/1884324',
        description:
          'Introduced the Ellsberg Paradox demonstrating that people prefer known risks over unknown risks (ambiguity aversion)',
        type: 'foundational',
      },
      {
        title: 'Intolerance of Uncertainty and Information Processing',
        author: 'Dugas, M. J., Hedayati, M., Karavidas, A., et al.',
        year: 2005,
        description:
          'Explores how intolerance of uncertainty affects cognitive processing, attention, and interpretation of ambiguous information',
        type: 'advanced',
      },
      {
        title: 'A Smooth Sea Never Made a Skilled Sailor: The Role of Uncertainty in Software Design',
        author: 'Reinecke, K., & Bernstein, A.',
        year: 2013,
        description:
          'Research on how cultural uncertainty avoidance affects preferences for structured vs. flexible software interfaces',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Cultures and Organizations: Software of the Mind',
        author: 'Hofstede, G., Hofstede, G. J., & Minkov, M.',
        year: 2010,
        isbn: '9780071664189',
        description:
          'Updated edition of Hofstede\'s cultural dimensions theory with comprehensive coverage of uncertainty avoidance across societies',
        type: 'foundational',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Practical UX guide whose core thesis -- minimize cognitive effort -- directly addresses uncertainty avoidance in interface design',
        type: 'practical',
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman, Don',
        year: 2013,
        isbn: '9780465050659',
        description:
          'Foundational work on affordances, feedback, and mental models -- all mechanisms that reduce interaction uncertainty',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Reducing User Uncertainty in Digital Interfaces',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/uncertainty/',
        description:
          'Practical guidelines for reducing uncertainty through clear feedback, progressive disclosure, and predictable patterns',
        type: 'practical',
      },
      {
        title: 'Error Message Guidelines',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/error-message-guidelines/',
        description:
          'How to write error messages that reduce uncertainty and guide users toward recovery',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Hofstede\'s Cultural Dimensions: Uncertainty Avoidance',
        author: 'Hofstede Insights',
        url: 'https://www.youtube.com/watch?v=V0YgGdzmFtA',
        description:
          'Overview of uncertainty avoidance as a cultural dimension with examples from different societies',
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
      'status-quo-bias',       // Preference for current state reduces uncertainty
      'loss-aversion',         // Fear of loss amplifies uncertainty anxiety
      'mere-exposure-effect',  // Familiarity reduces perceived uncertainty
      'default-effect',        // Defaults provide safe choices in uncertain situations
    ],

    conflicts: [
      'curiosity-gap',        // Uncertainty can drive exploration when framed as curiosity
      'novelty-seeking',      // Some users seek novel experiences despite uncertainty
    ],

    confusedWith: [
      'risk-aversion',        // Risk aversion is about known probabilities; uncertainty avoidance is about unknown ones
      'loss-aversion',        // Related but distinct: loss aversion is about outcomes, uncertainty avoidance is about ambiguity
      'status-quo-bias',      // Overlaps but status quo bias is broader than uncertainty-specific avoidance
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'ambiguity-aversion',
        'need-for-closure',
        'intolerance-of-uncertainty',
      ],
    },
  },
};
