/**
 * NEXT-IN-LINE EFFECT
 *
 * When people are about to perform, they fail to remember
 * what the person right before them said or did, because
 * they are focused on their own upcoming performance.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const nextInLineEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'next-in-line-effect',
    name: 'Next-In-Line Effect',
    aliases: ['Next-In-Line Bias', 'Performance Anticipation Blindness'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'attention',
      'sequential-tasks',
      'performance-anxiety',
      'multi-step',
      'forms',
      'wizards',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'When about to perform, people fail to remember what the person right before them said or did, because they are focused on their own upcoming turn.',

    detailed: `The Next-In-Line Effect is a memory bias where people who are about to perform a task (speak, present, act) show significantly impaired recall of what the person immediately before them said or did. The cognitive load of anticipating one's own performance consumes working memory, leaving little capacity to encode the preceding person's contribution.

In UX and product design, this manifests whenever users move through sequential steps, multi-step forms, or queued interactions. Users fixate on the upcoming step they need to complete, causing them to forget or overlook information presented in the step they just completed or are about to leave. This has critical implications for wizards, checkout flows, onboarding sequences, and any interface where users must act in a defined order.

Designers must account for this by providing summaries, recaps, and persistent context so that information from previous steps remains accessible when it matters.`,

    psychologyBasis: {
      discoveredBy: 'Malcolm Brenner',
      year: 1973,
      theory: 'Next-In-Line Effect / Performance Anticipation and Memory',
      mechanism: `When a person knows they must perform next, cognitive resources shift from encoding external information to rehearsing their own upcoming performance. This happens because:

1. **Attentional Narrowing**: Anticipation of one's own turn narrows attention inward, away from the current speaker or content
2. **Working Memory Load**: Rehearsing what to say or do next occupies working memory, blocking encoding of incoming information
3. **Self-Focused Processing**: The shift to self-relevant processing (anxiety, planning, rehearsal) crowds out other-focused encoding
4. **Encoding Failure**: Unlike normal forgetting (retrieval failure), this is a failure to encode in the first place — the information was never stored
5. **Temporal Proximity**: The effect is strongest for the person immediately before one's own turn; earlier and later positions show better recall`,
    },

    realWorldExample: `In Brenner's original 1973 study, participants sat in a circle and each read a word aloud in turn. When asked to recall the words afterward, participants consistently failed to remember the word read by the person immediately before them — even though they heard it clearly. Their attention had shifted to preparing to read their own word. This same pattern appears in meetings, classroom introductions, and any round-robin activity: people remember what came well before and after their turn, but not what came immediately before.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Next-In-Line Effect impacts any interface where users move through sequential steps, fill out multi-part forms, or transition between tasks. Users become so focused on the next action they must take that they lose track of what they just entered or saw. Designers can mitigate this by:

- Providing persistent summaries of previous steps throughout multi-step flows
- Adding review screens before final submission so users can verify all inputs
- Showing progress indicators with step recaps, not just step numbers
- Keeping critical context visible across step transitions
- Offering recap or "what you've entered so far" panels in long workflows`,

    whenToUse: [
      {
        title: 'Multi-Step Form Summaries',
        scenario:
          'When users complete sequential form steps where earlier inputs affect later ones',
        example:
          'Show a persistent sidebar summarizing all previously entered information as the user advances through a wizard',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Review Screens Before Submission',
        scenario:
          'When users must confirm complex or high-stakes inputs before committing',
        example:
          'Display a comprehensive review screen before checkout showing shipping, billing, and order details all together',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Presentation and Meeting Recaps',
        scenario:
          'When participants take turns presenting or contributing in sequence',
        example:
          'A meeting tool that auto-generates a recap of the previous speaker\'s key points before transitioning to the next presenter',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Queue Management Interfaces',
        scenario:
          'When users are waiting in a queue and need to remember context from prior interactions',
        example:
          'A support queue system that shows the previous customer\'s resolution summary to the agent before the next ticket opens',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Step Recaps',
        scenario:
          'When onboarding flows span multiple pages or sessions',
        example:
          'Show a "Here\'s what you\'ve set up so far" summary at the start of each onboarding step',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Sequential Decision Workflows',
        scenario:
          'When users must make a series of related decisions where earlier choices constrain later ones',
        example:
          'A configuration wizard that displays all prior selections in context as each new decision is presented',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Single-Step Interactions',
        reason:
          'The next-in-line effect requires sequential steps; single-page forms are not affected',
        consequence:
          'Adding unnecessary recaps to simple flows adds clutter without benefit',
        alternative:
          'Only add step summaries when there are 3+ sequential steps with distinct inputs',
      },
      {
        title: 'Speed-Critical Flows',
        reason:
          'Forced review screens slow down users who are completing routine, low-stakes tasks',
        consequence:
          'Users become frustrated by mandatory recaps on tasks they perform frequently',
        alternative:
          'Make review screens optional or collapsible for expert/repeat users',
      },
      {
        title: 'Privacy-Sensitive Sequences',
        reason:
          'Displaying summaries of previous inputs may expose sensitive information on shared screens',
        consequence:
          'Passwords, financial details, or personal data shown in persistent summaries create security risks',
        alternative:
          'Mask or redact sensitive fields in step summaries; show confirmation without revealing full values',
      },
    ],

    commonMistakes: [
      {
        title: 'No Step Summary at All',
        description:
          'Multi-step wizards that show only the current step with no recap of prior inputs',
        why: 'Users forget what they entered in earlier steps, leading to errors, inconsistencies, and lost confidence',
        fix: 'Add a persistent or expandable summary panel showing all prior step inputs',
      },
      {
        title: 'Review Screen That Requires Scrolling',
        description:
          'A final review screen so long that users skip reading it entirely',
        why: 'If the review is overwhelming, users rubber-stamp it without actually reviewing, defeating its purpose',
        fix: 'Group review items by step with clear sections, highlight changes or flagged items, and keep it scannable',
      },
      {
        title: 'Step Numbers Without Context',
        description:
          'Progress indicators showing "Step 3 of 5" with no description of what each step covers',
        why: 'Users cannot mentally reconstruct what they did in prior steps from just a number',
        fix: 'Label progress steps with descriptive names and show completion status for each',
      },
      {
        title: 'Losing Context on Back Navigation',
        description:
          'When users go back to a previous step, the context of subsequent steps disappears',
        why: 'Users went back because they realized an earlier input was wrong, but now they cannot see how it relates to later steps',
        fix: 'Preserve all entered data and show forward-step context when navigating backward',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines whether previous-step context remains visible during sequential flows',
        examples: [
          'Sidebar summaries keep prior step data visible alongside current step inputs',
          'Accordion layouts let users expand previous steps without losing current context',
          'Split-pane layouts showing form on one side and running summary on the other',
          'Sticky headers with step recap reduce scroll-based memory loss',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy in summaries and recaps affects scannability and recall',
        examples: [
          'Bold labels for user-entered values in review screens make them scannable',
          'Smaller recap text prevents summaries from overwhelming the current step',
          'Clear typographic distinction between "what you entered" and "what to enter next"',
          'Step labels in progress bars benefit from concise, descriptive text',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding helps users distinguish completed steps from current and upcoming ones',
        examples: [
          'Green checkmarks on completed steps reinforce what has been done',
          'Muted colors for prior step summaries keep focus on current step',
          'Highlight color on changed or flagged values in review screens draws attention',
          'Progress bar fill color shows advancement through the sequence',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines how easily users can review prior steps and verify inputs',
        examples: [
          'Clickable progress steps let users jump back to review previous inputs',
          'Expandable summary sections reveal prior step details on demand',
          'Hover tooltips on progress indicators show step summaries without navigation',
          'Auto-save on step transitions prevents data loss when reviewing earlier steps',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy for recaps and summaries directly counteracts the next-in-line effect',
        examples: [
          'Concise plain-language summaries of each completed step ("You chose Standard Shipping")',
          'Confirmation copy that mirrors user intent ("Your monthly plan starts March 1")',
          'Contextual help text that references earlier inputs ("Based on the address you entered...")',
          'Review screen content organized by decision flow, not by data structure',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible sequential flows must announce step context and summaries to assistive technology',
        examples: [
          'ARIA live regions announce step completion summaries to screen readers',
          'Focus management returns to a logical point when navigating between steps',
          'Step summaries are accessible via keyboard without requiring mouse hover',
          'Screen reader users receive recap of prior inputs when entering a new step',
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
        title: 'Persistent Sidebar Summary in Multi-Step Form',
        description:
          'A checkout wizard with a running summary sidebar that updates as the user completes each step',
        code: `<div class="wizard-layout">
  <aside class="step-summary" aria-label="Your selections so far">
    <h3>Order Summary</h3>
    <div class="summary-step completed">
      <span class="step-label">1. Shipping</span>
      <p>John Doe, 123 Main St, Portland OR 97201</p>
      <a href="#step-1" class="edit-link">Edit</a>
    </div>
    <div class="summary-step completed">
      <span class="step-label">2. Payment</span>
      <p>Visa ending in 4242</p>
      <a href="#step-2" class="edit-link">Edit</a>
    </div>
    <div class="summary-step current">
      <span class="step-label">3. Review & Place Order</span>
    </div>
  </aside>

  <main class="current-step">
    <h2>Review Your Order</h2>
    <!-- Current step content -->
  </main>
</div>`,
        explanation:
          'The persistent sidebar counteracts the next-in-line effect by keeping all prior step information visible. Users do not need to remember what they entered in earlier steps because it is always on screen. Edit links let them correct mistakes without losing their place.',
        principle:
          'Persistent context summaries prevent encoding failures across sequential steps',
        metrics: {
          before: '23% of users went back to check prior step inputs; 8% abandoned at review',
          after: '7% went back; 2% abandoned at review',
          improvement: '70% reduction in back-navigation and 75% reduction in review-stage abandonment',
        },
      },
      {
        title: 'Review Screen Before Final Submission',
        description:
          'A comprehensive review page that shows all inputs organized by step before the user submits',
        code: `<section class="review-screen">
  <h2>Review Before Submitting</h2>

  <div class="review-group">
    <h3>Personal Information</h3>
    <dl>
      <dt>Name</dt>
      <dd>Jane Smith <a href="#step-1">Edit</a></dd>
      <dt>Email</dt>
      <dd>jane@example.com <a href="#step-1">Edit</a></dd>
    </dl>
  </div>

  <div class="review-group">
    <h3>Plan Selection</h3>
    <dl>
      <dt>Plan</dt>
      <dd>Professional — $49/mo <a href="#step-2">Edit</a></dd>
      <dt>Billing</dt>
      <dd>Annual (save 20%) <a href="#step-2">Edit</a></dd>
    </dl>
  </div>

  <div class="review-group">
    <h3>Team Setup</h3>
    <dl>
      <dt>Team Name</dt>
      <dd>Acme Design <a href="#step-3">Edit</a></dd>
      <dt>Members Invited</dt>
      <dd>3 members <a href="#step-3">Edit</a></dd>
    </dl>
  </div>

  <button class="primary">Confirm & Submit</button>
</section>`,
        explanation:
          'The review screen presents all previously entered information in one view, organized by the original steps. Users who were focused on the next step at each point in the wizard can now see everything together and catch errors before submitting.',
        principle:
          'Pre-submission review screens compensate for memory gaps created by sequential focus',
      },
      {
        title: 'Progress Bar with Step Recaps',
        description:
          'A progress indicator that shows not just step numbers but also a brief summary of what was completed',
        code: `<nav class="progress-bar" aria-label="Form progress">
  <ol>
    <li class="step completed" aria-current="false">
      <span class="step-number">1</span>
      <span class="step-name">Account</span>
      <span class="step-recap">jane@example.com</span>
    </li>
    <li class="step completed" aria-current="false">
      <span class="step-number">2</span>
      <span class="step-name">Profile</span>
      <span class="step-recap">Designer, Portland</span>
    </li>
    <li class="step active" aria-current="step">
      <span class="step-number">3</span>
      <span class="step-name">Preferences</span>
    </li>
    <li class="step upcoming">
      <span class="step-number">4</span>
      <span class="step-name">Confirm</span>
    </li>
  </ol>
</nav>`,
        explanation:
          'Enriched progress indicators show a brief recap of what was entered in each completed step. This lightweight reminder helps users maintain context without requiring a full sidebar summary. It is especially useful on mobile where screen real estate is limited.',
        principle:
          'Micro-recaps in progress indicators maintain sequential context at minimal UI cost',
      },
    ],

    bad: [
      {
        title: 'Wizard With No Context Between Steps',
        description:
          'A multi-step form where each step appears in isolation with no reference to prior inputs',
        code: `<!-- DON'T DO THIS -->
<div class="wizard">
  <div class="progress">Step 3 of 5</div>

  <h2>Select Your Plan</h2>
  <!-- No mention of what was entered in steps 1-2 -->
  <!-- No summary, no breadcrumbs, no recap -->

  <div class="plans">
    <button>Basic</button>
    <button>Pro</button>
    <button>Enterprise</button>
  </div>

  <button class="next">Next</button>
</div>`,
        explanation:
          'Each step is presented in total isolation. The user was focused on completing Step 2 and has already forgotten their Step 1 inputs. Now at Step 3, they may choose a plan that conflicts with information they entered earlier, with no way to verify without manually going back.',
        principle:
          'Sequential steps without context summaries amplify the next-in-line effect',
      },
      {
        title: 'Auto-Advancing Steps Without Recap',
        description:
          'A flow that automatically advances to the next step the instant the current one is completed',
        code: `<!-- DON'T DO THIS -->
<script>
  // Auto-advance on last field completion
  lastField.addEventListener('blur', () => {
    if (isValid(lastField)) {
      // Immediately show next step, no summary or pause
      showNextStep();
    }
  });
</script>`,
        explanation:
          'Auto-advancing gives users no time to review what they just entered. The transition to the next step triggers the next-in-line effect immediately — the user shifts focus to the upcoming step and loses memory of what they just completed.',
        principle:
          'Instant auto-advancement eliminates the brief window for encoding completed step information',
      },
      {
        title: 'Final Submission With No Review',
        description:
          'A multi-step checkout that goes directly from the last input step to "Order Placed" with no review',
        code: `<!-- DON'T DO THIS -->
<div class="step-final">
  <h2>Enter Payment Details</h2>
  <input type="text" placeholder="Card number">
  <input type="text" placeholder="Expiry">
  <input type="text" placeholder="CVV">

  <!-- No review of shipping address, items, or total -->
  <button class="primary" onclick="placeOrder()">
    Place Order Now
  </button>
</div>`,
        explanation:
          'Jumping from the final input step directly to order placement means users never see a consolidated view of everything they entered. The next-in-line effect ensured they were not fully encoding earlier steps, and now there is no opportunity to catch errors.',
        principle:
          'Skipping review before commitment exploits the memory gaps created by sequential focus',
      },
    ],

    realWorld: [
      {
        company: 'Shopify',
        product: 'Checkout Flow',
        description: 'Shopify checkout displays a persistent order summary sidebar throughout all steps (shipping, payment, review). Users always see their items, quantities, and running total alongside whatever step they are completing.',
        effectiveness: 'very-effective',
        analysis: 'The persistent summary directly counteracts the next-in-line effect. Users completing the payment step can glance left and verify their shipping address without navigating backward. This reduces checkout errors and abandonment.',
      },
      {
        company: 'TurboTax',
        product: 'Tax Filing Wizard',
        description: 'TurboTax provides a running summary panel and a comprehensive review screen before filing. Each section shows what was entered, with edit links. The final review organizes all inputs by category so users can verify everything.',
        effectiveness: 'very-effective',
        analysis: 'Tax filing involves dozens of sequential steps. Users completing deductions have long forgotten their income inputs. The review screen is essential for catching errors in a domain where mistakes have legal consequences.',
      },
      {
        company: 'Zoom',
        product: 'Meeting Recap / Meeting Summary',
        description: 'Zoom generates AI meeting summaries that recap what each participant said. This directly addresses the next-in-line effect in meetings where participants rehearse their own talking points instead of listening to the person before them.',
        effectiveness: 'effective',
        analysis: 'Meeting participants are classic victims of the next-in-line effect — they mentally rehearse their update while the previous person is speaking. Automated summaries restore the information that was never encoded.',
      },
      {
        company: 'Amazon',
        product: 'Checkout Review Page',
        description: 'Amazon shows a clear review page before final purchase with shipping address, payment method, items, and delivery estimate all visible. Users can modify any section with one click before placing the order.',
        effectiveness: 'very-effective',
        analysis: 'The review page ensures that information entered across multiple earlier steps (address, payment, gift options) is consolidated for verification. This compensates for the memory gaps caused by sequential step completion.',
      },
    ],

    abTests: [
      {
        title: 'Multi-Step Form: Persistent Summary vs No Summary',
        hypothesis:
          'A persistent step summary will reduce errors and back-navigation in a multi-step signup form',
        controlVersion: {
          description:
            'Standard 4-step signup wizard with progress bar showing "Step X of 4" and no recap of prior steps',
          metrics: {
            conversionRate: '62%',
            errorRate: '18%',
            backNavigationRate: '31%',
          },
        },
        treatmentVersion: {
          description:
            'Same 4-step wizard with a collapsible sidebar summarizing all prior step inputs, including edit links',
          metrics: {
            conversionRate: '78%',
            errorRate: '6%',
            backNavigationRate: '12%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The persistent summary reduced errors by 67% and back-navigation by 61%. Completion rate improved by 26%. Users reported feeling more confident about their inputs and less anxious about making mistakes.',
          learnings: [
            'Step summaries reduce cognitive load by externalizing memory',
            'Edit links in summaries are more efficient than back-button navigation',
            'Users who saw summaries completed forms 40% faster on average',
            'The effect was strongest for forms with 4+ steps',
          ],
        },
      },
      {
        title: 'Checkout: Review Screen vs Direct Submission',
        hypothesis:
          'Adding a review screen before order placement will reduce post-purchase support tickets',
        controlVersion: {
          description:
            'Checkout flow: Shipping -> Payment -> Place Order (no review step)',
          metrics: {
            conversionRate: '71%',
            supportTicketRate: '12%',
            orderModificationRate: '9%',
          },
        },
        treatmentVersion: {
          description:
            'Checkout flow: Shipping -> Payment -> Review Everything -> Place Order',
          metrics: {
            conversionRate: '69%',
            supportTicketRate: '4%',
            orderModificationRate: '3%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While conversion dipped 2% due to the extra step, support tickets dropped 67% and order modifications dropped 67%. Net customer satisfaction and operational cost savings strongly favored the review screen.',
          learnings: [
            'Review screens trade a small conversion cost for major downstream savings',
            'Users who modified their order at review would have become support tickets without it',
            'The 2% conversion drop was recovered by reducing post-purchase friction',
            'High-value orders benefited most from the review step',
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
        name: 'Missing Step Summary',
        description:
          'Multi-step flows where completed steps show no recap or summary of entered data',
        howToSpot:
          'Navigate through a wizard and check if prior step inputs are visible or referenced at any point',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Isolated Step Content',
        description:
          'Each step in a sequence shows only its own fields with no connection to previous or next steps',
        howToSpot:
          'Look for step transitions that completely replace the screen with no persistent context elements',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Numbers-Only Progress Indicators',
        description:
          'Progress bars showing only "Step 3 of 5" with no descriptive labels or recaps',
        howToSpot:
          'Check progress indicators for step names, completion summaries, or tooltips with prior step info',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No Review Before Commit',
        description:
          'Flows that go directly from the last input step to final action with no consolidated review',
        howToSpot:
          'Complete a multi-step flow end-to-end and check if there is a review/confirmation step before submission',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Sequential Isolation Pattern',
        description: 'Each step in a wizard or flow is presented in complete isolation from prior steps',
        indicators: [
          'Full-page step transitions with no persistent summary',
          'Progress bar with numbers only, no labels or recaps',
          'No edit links to return to prior steps',
          'Back button is the only way to review previous inputs',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Review Pattern',
        description: 'Multi-step flows that commit or submit without a consolidated review screen',
        indicators: [
          'Submit/confirm button on the last input step rather than a dedicated review step',
          'No consolidated view of all inputs before final action',
          'Order placed immediately after payment entry',
          'Account created immediately after last profile field',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Auto-Advance Pattern',
        description: 'Steps that automatically advance without user confirmation or pause',
        indicators: [
          'Automatic progression to next step on field completion',
          'Timer-based step transitions',
          'No explicit "Continue" or "Next" button',
          'Animations that quickly transition between steps',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Round-Robin Interaction Pattern',
        description: 'Interfaces where multiple participants take turns in sequence (presentations, meetings)',
        indicators: [
          'Sequential speaker or presenter order',
          'Turn-based contribution interfaces',
          'Queue-based customer interactions',
          'No automated recap between turns',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the multi-step flow provide a summary of prior steps?',
      'Can users see what they entered in earlier steps without navigating backward?',
      'Is there a review or confirmation screen before final submission?',
      'Do progress indicators include descriptive labels, not just step numbers?',
      'Can users easily edit prior step inputs from the current step or review screen?',
      'Is context from earlier steps preserved and visible when it affects later decisions?',
      'Does auto-advancement give users enough time to review before moving forward?',
      'In turn-based or round-robin interactions, is there a recap of the previous contribution?',
      'Are step summaries accessible to screen reader users?',
      'Does the design account for users who complete the flow across multiple sessions?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the next-in-line effect.

Analyze the provided design for next-in-line effect vulnerabilities. Identify:

1. **Sequential Step Isolation**: Steps in wizards or flows that lack context from prior steps
2. **Missing Recaps**: Absence of summaries showing what users entered in previous steps
3. **Review Gaps**: Flows that commit or submit without a consolidated review screen
4. **Auto-Advancement**: Steps that transition automatically without user confirmation
5. **Turn-Based Blindness**: Multi-participant interfaces where users rehearse their turn instead of attending to the current speaker

For each vulnerability found:
- Identify where in the sequence the memory gap is most likely
- Assess the consequence of the gap (errors, support tickets, user frustration)
- Determine whether a recap, summary, or review would mitigate the issue
- Suggest specific UI patterns to restore sequential context

Consider:
- How many steps are in the flow? (More steps = stronger effect)
- Are any steps high-stakes where errors are costly?
- Is there a review step before final commitment?
- Can users navigate back without losing data?
- Are prior step inputs referenced in later step content?

Provide actionable recommendations for mitigating the next-in-line effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        sequentialVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              stepLocation: { type: 'string' },
              vulnerabilityType: { type: 'string' },
              memoryGapRisk: { type: 'string' },
              consequence: { type: 'string' },
              mitigationStrategy: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'stepLocation',
              'vulnerabilityType',
              'memoryGapRisk',
              'consequence',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            stepCount: { type: 'number' },
            contextPersistence: { type: 'number' },
            reviewCoverage: { type: 'number' },
            backNavigationSupport: { type: 'number' },
          },
          required: [
            'stepCount',
            'contextPersistence',
            'reviewCoverage',
            'backNavigationSupport',
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
        'sequentialVulnerabilities',
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
        title: 'Audit Sequential Flows',
        description:
          'Identify all multi-step flows, wizards, and sequential interactions in your product',
        example:
          'Map out: signup wizard (4 steps), checkout (3 steps), onboarding (5 steps), settings (3 tabs)',
        tips: [
          'Count steps in each flow; flows with 3+ steps are most vulnerable',
          'Identify which steps contain information needed in later steps',
          'Note flows where errors are costly (checkout, account setup, configuration)',
        ],
      },
      {
        step: 2,
        title: 'Add Persistent Step Summaries',
        description:
          'Implement a running summary that shows prior step inputs alongside the current step',
        example:
          'Add a sidebar or collapsible panel that lists each completed step with a brief recap of entered data',
        tips: [
          'On desktop, use a persistent sidebar; on mobile, use a collapsible accordion',
          'Keep summaries concise — show key values, not full form replays',
          'Include edit links so users can correct prior steps without losing current progress',
        ],
      },
      {
        step: 3,
        title: 'Implement Review Screens',
        description:
          'Add a consolidated review step before any final submission or commitment action',
        example:
          'Before "Place Order", show all order details: items, shipping, payment, total, delivery estimate',
        tips: [
          'Organize the review by step, matching the user\'s mental model of the flow',
          'Highlight anything that might need attention (e.g., slow shipping, high total)',
          'Make edit links prominent and navigable',
        ],
      },
      {
        step: 4,
        title: 'Enrich Progress Indicators',
        description:
          'Upgrade progress bars from simple step numbers to labeled, recap-enhanced indicators',
        example:
          'Step 1: Account (jane@example.com) -> Step 2: Profile (Designer) -> Step 3: Preferences [current]',
        tips: [
          'Show the step name, not just the number',
          'Add a one-line recap of completed steps (the key value entered)',
          'Use tooltips or expandable details for more information on hover/tap',
        ],
      },
      {
        step: 5,
        title: 'Support Effortless Back Navigation',
        description:
          'Ensure users can navigate to any previous step without losing data',
        example:
          'Clicking any completed step in the progress bar returns to that step with all data preserved',
        tips: [
          'Auto-save on every step transition',
          'Preserve all entered data when navigating backward or forward',
          'Show what will be affected if a prior step is changed',
        ],
      },
    ],

    dos: [
      'Provide persistent summaries of prior steps in multi-step flows',
      'Add a review screen before any final submission or commitment',
      'Label progress indicators with descriptive step names, not just numbers',
      'Include edit links in summaries and review screens for easy correction',
      'Auto-save data on every step transition to prevent loss',
      'Show how prior inputs affect current step options when relevant',
      'Use recaps in turn-based interfaces (meetings, presentations, queues)',
      'Test multi-step flows end-to-end to identify memory gap vulnerabilities',
    ],

    donts: [
      'Don\'t present multi-step forms with no reference to prior step inputs',
      'Don\'t skip the review screen before high-stakes submissions',
      'Don\'t auto-advance steps without giving users a moment to review',
      'Don\'t use step numbers alone in progress indicators; add labels',
      'Don\'t lose user data when they navigate backward in a wizard',
      'Don\'t force users to rely on memory for inputs from 3+ steps ago',
      'Don\'t make the review screen so long that users skip reading it',
      'Don\'t assume users remember what the previous person said in a round-robin',
    ],

    bestPractices: [
      {
        title: 'Externalize Memory Across Steps',
        description:
          'Make all prior step inputs visible without requiring users to remember them',
        rationale:
          'The next-in-line effect is an encoding failure, not a retrieval failure — the information was never stored, so it cannot be recalled',
        example:
          'Persistent sidebar summary showing all completed step inputs alongside the current step',
      },
      {
        title: 'Design the Review Screen as a First-Class Step',
        description:
          'Treat the review screen as a carefully designed step, not an afterthought',
        rationale:
          'Users will catch errors in the review that they could not catch during sequential entry because they were focused on the next step',
        example:
          'Organize review by step, highlight important values, and make edit links prominent and accessible',
      },
      {
        title: 'Recap Before Each Transition',
        description:
          'Show a brief summary of what was just completed before transitioning to the next step',
        rationale:
          'A micro-pause with recap gives users a chance to encode the current step before their attention shifts to the next one',
        example:
          '"Got it — you selected the Pro plan at $49/mo, billed annually. Next: Set up your team."',
      },
      {
        title: 'Reference Prior Inputs in Context',
        description:
          'When a later step depends on an earlier input, explicitly reference that input',
        rationale:
          'Users do not remember what they entered in earlier steps; showing it in context prevents inconsistencies',
        example:
          '"Based on your Portland, OR address (Step 1), here are available shipping options..."',
      },
      {
        title: 'Auto-Generate Meeting and Presentation Recaps',
        description:
          'In turn-based collaboration tools, generate automated summaries of each participant\'s contribution',
        rationale:
          'Participants preparing for their own turn are not encoding the previous speaker\'s content; automated recaps fill the gap',
        example:
          'After each presenter finishes, show a 2-3 bullet summary before the next presenter begins',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Ensure step summaries are semantically structured for assistive technology',
        implementation:
          'Use description lists (dl/dt/dd) for review screens, proper heading hierarchy for step groups, and ARIA landmarks for summary regions',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Provide descriptive labels for each step in the progress indicator',
        implementation:
          'Label each step with a descriptive name ("Shipping Address", "Payment Method") not just a number. Use aria-current="step" on the active step.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) — Provide review before submission for consequential actions',
        implementation:
          'For legal, financial, or data-altering submissions, always provide a review step where users can verify all inputs and correct errors before committing.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages — Announce step transitions and summaries to screen readers',
        implementation:
          'Use ARIA live regions to announce step completion ("Step 2 complete: Professional plan selected") and focus management to direct attention to the new step content.',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Memory Gaps for Upsells',
        severity: 'high',
        explanation:
          'Deliberately hiding prior selections so users forget what they chose and accept more expensive options later in the flow',
        mitigation:
          'Always show prior step selections clearly. Never obscure or remove summaries to facilitate upselling.',
      },
      {
        concern: 'Hiding Terms in Early Steps',
        severity: 'critical',
        explanation:
          'Placing important terms, conditions, or commitments in early steps, knowing users will forget them by the time they submit',
        mitigation:
          'Surface all material terms in the review screen. Highlight commitments, auto-renewals, and binding agreements prominently at confirmation.',
      },
      {
        concern: 'Omitting Review for Speed',
        severity: 'high',
        explanation:
          'Skipping the review step to increase conversion velocity, knowing users will not catch errors',
        mitigation:
          'Always provide a review step for consequential actions. The small conversion cost is outweighed by reduced errors and support burden.',
      },
      {
        concern: 'Auto-Advancing Past Disclosures',
        severity: 'critical',
        explanation:
          'Auto-advancing past disclosure or consent steps so users never have time to read or process them',
        mitigation:
          'Require explicit user action (button click, checkbox) to advance past any step containing legal disclosures or consent requests.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Next-In-Line Effect',
        author: 'Brenner, M.',
        year: 1973,
        description:
          'The foundational study demonstrating that people about to perform show impaired recall of the immediately preceding person\'s contribution',
        type: 'foundational',
      },
      {
        title: 'Memory and the Next-In-Line Effect: A Replication and Extension',
        author: 'Bond, C. F., & Omar, A. S.',
        year: 1990,
        description:
          'Replication confirming the next-in-line effect and exploring its relationship to performance anxiety and self-focused attention',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of cognitive biases including memory effects in sequential processing',
        type: 'foundational',
      },
      {
        title: 'The Art of Thinking Clearly',
        author: 'Dobelli, Rolf',
        year: 2013,
        isbn: '9780062219695',
        description:
          'Accessible coverage of the next-in-line effect and related memory biases',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing Better Multi-Step Forms',
        author: 'Smashing Magazine',
        url: 'https://www.smashingmagazine.com/2017/05/better-form-design/',
        description:
          'Practical guide to multi-step form design including step summaries and review patterns',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Next-In-Line Effect and Why We Forget',
        author: 'Cognitive Psychology Explained',
        url: 'https://www.youtube.com/results?search_query=next+in+line+effect+cognitive+bias',
        description:
          'Video explanation of the next-in-line effect with everyday examples',
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
      'serial-position-effect', // Both involve memory failures in sequential contexts
      'recency-effect', // Recency and next-in-line interact in sequential recall
      'cognitive-load', // High cognitive load from anticipation drives the effect
      'chunking', // Chunking step summaries helps mitigate memory gaps
    ],

    conflicts: [
      'primacy-effect', // Primacy helps remember early steps; next-in-line impairs the step right before
    ],

    confusedWith: [
      'recency-effect', // Both involve sequence and memory, but different mechanisms
      'serial-position-effect', // Next-in-line is specific to performance anticipation, not general serial position
      'inattentional-blindness', // Related but inattentional blindness is about unexpected stimuli, not sequential performance
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'performance-anticipation-blindness',
        'sequential-encoding-failure',
      ],
    },
  },
};
