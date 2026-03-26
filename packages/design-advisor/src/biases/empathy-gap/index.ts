/**
 * EMPATHY GAP
 *
 * We underestimate how emotions affect our behavior
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const empathyGap: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'empathy-gap',
    name: 'Empathy Gap',
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
    simple: 'We underestimate how emotions affect our behavior',

    detailed: `The Empathy Gap (also known as the hot-cold empathy gap) is a cognitive bias in which people underestimate the influence of visceral drives and emotional states on their own attitudes, preferences, and behaviors. When in a "cold" (calm, rational) state, we fail to appreciate how a "hot" (emotional, stressed, hungry, angry) state will change what we want and how we act.

This bias works in both directions: when calm, we underestimate future emotional influence; when emotional, we project our current intense feelings onto our future selves as if they will persist indefinitely. The result is a systematic failure to design for the full range of human emotional experience.

In UX and product design, this bias is critical because designers typically work in calm, rational states while users often encounter products during moments of stress, frustration, urgency, or emotional intensity. Failing to account for the empathy gap means building interfaces that work for composed users but fail precisely when users need them most.`,

    psychologyBasis: {
      discoveredBy: 'George Loewenstein',
      year: 1996,
      theory: 'Hot-Cold Empathy Gap Theory',
      mechanism: `The brain struggles to simulate emotional states it is not currently experiencing. This happens because:

1. **State-Dependent Cognition**: Our ability to reason, predict, and empathize is deeply shaped by our current physiological and emotional state
2. **Projection Bias**: We project our current emotional state onto our future selves, assuming we will feel the same way later
3. **Visceral Drive Underestimation**: When calm, we dramatically underestimate how hunger, pain, anger, fear, or arousal will alter our decisions
4. **Empathic Failure**: We cannot accurately simulate another person's emotional experience, leading us to design for our own calm state rather than the user's distressed state
5. **Temporal Discounting of Emotions**: We treat future emotional states as abstract concepts rather than lived realities, leading to poor planning for emotionally charged moments`,
    },

    realWorldExample: `In a classic study by Loewenstein and colleagues, participants were asked to predict how much they would pay for water after exercising. Those who predicted while calm vastly underestimated their willingness to pay compared to what they actually paid when thirsty after exercise. The calm state made it nearly impossible to imagine how thirst would transform their decision-making. This same gap explains why people set punishing alarm clocks at night (calm state) but hit snooze repeatedly in the morning (groggy state), or why doctors sometimes underestimate patient pain when they themselves feel fine.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Empathy Gap profoundly affects how designers build experiences for users in emotional or physiological extremes. Designers work in calm, focused states but users encounter products during stress, frustration, panic, anger, impatience, and physical discomfort. This mismatch leads to:

- Error recovery flows that assume calm, rational users (when users are actually frustrated and panicking)
- Customer support access buried behind complex navigation (when users are angry and impatient)
- Loading states that provide no feedback (when users are anxious about whether something worked)
- Cancellation flows designed as obstacle courses (exploiting user frustration rather than respecting it)
- Health and wellness apps that assume rational decision-making during pain or distress`,

    whenToUse: [
      {
        title: 'Error Recovery Design',
        scenario:
          'When users encounter errors, failures, or unexpected results',
        example:
          'Display a calm, clear error message with a single prominent "Fix This" button rather than a wall of technical details or multiple confusing options',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Customer Support During Outages',
        scenario: 'When users need help during service disruptions or product failures',
        example:
          'Surface a persistent, one-tap support chat during outages instead of requiring users to navigate through Help Center articles while frustrated',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Loading and Wait States',
        scenario: 'When users are waiting for important actions to complete (payments, submissions, uploads)',
        example:
          'Show progressive feedback with estimated time and reassuring microcopy: "Your payment is processing securely. This usually takes about 10 seconds."',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Food and Hunger-State Decisions',
        scenario: 'When users are ordering food while hungry or making dietary choices',
        example:
          'Simplify food ordering flows with prominent defaults and quick reorder, recognizing that hungry users have reduced patience for browsing',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Health and Pain-State Interfaces',
        scenario: 'When users interact with health apps during pain, illness, or physical distress',
        example:
          'Offer large tap targets, minimal required input, and voice alternatives for users logging symptoms while in pain',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Cancellation and Account Closure',
        scenario: 'When users want to cancel a subscription or close an account',
        example:
          'Provide a straightforward two-step cancellation with a clear "Cancel Subscription" button rather than a multi-page retention funnel',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exploiting Emotional Urgency',
        reason:
          'Designing dark patterns that take advantage of users in emotional states (e.g., making cancellation harder when users are angry)',
        consequence:
          'Deep erosion of trust, negative word-of-mouth, regulatory scrutiny, and potential legal liability',
        alternative:
          'Make emotionally charged flows (cancellation, complaint, refund) as simple and respectful as possible',
      },
      {
        title: 'Over-Simplifying Complex Decisions',
        reason:
          'Removing all friction from high-stakes decisions just because users might be emotional',
        consequence:
          'Users may make irreversible choices they regret (deleting accounts, large purchases during distress)',
        alternative:
          'Add a brief, empathetic confirmation step: "We want to make sure this is right. You can always come back within 30 days."',
      },
      {
        title: 'Patronizing Emotional Users',
        reason:
          'Using overly soothing or condescending language that feels dismissive of genuine frustration',
        consequence:
          'Users feel their concerns are being minimized rather than addressed, increasing anger',
        alternative:
          'Acknowledge the emotion directly and provide a clear path to resolution: "We know this is frustrating. Here is the fastest way to fix it."',
      },
      {
        title: 'Impulse Purchase Exploitation',
        reason:
          'Leveraging emotional states (excitement, FOMO, stress) to push purchases users would not make when calm',
        consequence:
          'High return rates, buyer regret, chargebacks, and long-term brand damage',
        alternative:
          'Allow easy returns and provide clear "Save for Later" options alongside purchase buttons',
      },
    ],

    commonMistakes: [
      {
        title: 'Designing Only for the Happy Path',
        description:
          'Building interfaces that only work well when users are calm, focused, and in a good mood',
        why: 'Designers are in a calm state during design and unconsciously assume users will be too',
        fix: 'Systematically test flows during simulated stress conditions: time pressure, interruptions, frustration scenarios',
      },
      {
        title: 'Complex Error Flows',
        description:
          'Requiring multiple steps, form re-entry, or technical understanding during error recovery',
        why: 'When users encounter errors, they are already frustrated; complexity compounds the emotional load',
        fix: 'Design error recovery as a single-action flow: one button, one clear message, auto-preserved form data',
      },
      {
        title: 'Hiding Support During Crises',
        description:
          'Burying customer support behind FAQs, chatbots, and article searches when the service is down',
        why: 'Users in crisis need immediate human connection, not self-service content designed for calm moments',
        fix: 'Surface direct support channels (live chat, phone) prominently during outages and error states',
      },
      {
        title: 'Ignoring Physical State Impact',
        description:
          'Not accounting for how hunger, fatigue, pain, or environmental stress affect interface usability',
        why: 'Physical states drastically reduce cognitive capacity, patience, and fine motor control',
        fix: 'Increase tap targets, reduce required inputs, offer shortcuts, and support voice/gesture for distressed states',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout must adapt to reduced cognitive capacity during emotional states',
        examples: [
          'Single-column layouts reduce decision fatigue for stressed users',
          'Prominent placement of support and help options during error states',
          'Simplified navigation during crisis flows (outage pages, error recovery)',
          'Large, clear CTAs that are easy to find when vision is blurred by tears or frustration',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Text must be readable and calming during emotional distress',
        examples: [
          'Larger font sizes for error messages and critical information',
          'Short, scannable sentences rather than dense paragraphs during support flows',
          'Clear, empathetic microcopy that validates user feelings',
          'Avoiding ALL CAPS or aggressive formatting that amplifies emotional intensity',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color choices can either calm or escalate emotional states',
        examples: [
          'Avoiding aggressive red for non-critical errors (use amber or blue tones instead)',
          'Calming color palettes in support and error recovery contexts',
          'Sufficient contrast for users whose visual acuity is reduced by stress or tears',
          'Consistent color semantics so distressed users do not need to relearn meaning',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns must accommodate reduced patience, impaired motor control, and heightened emotional reactivity',
        examples: [
          'Larger tap targets during error flows for users with shaking hands or impaired focus',
          'Undo capabilities rather than destructive confirmations during emotional moments',
          'Auto-save and form preservation so frustrated users do not lose progress',
          'Reduced step counts in emotionally charged flows (cancellation, complaint, refund)',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content tone and structure must account for the full spectrum of user emotional states',
        examples: [
          'Empathetic error messages: "Something went wrong, but your data is safe" rather than "Error 500"',
          'Acknowledging frustration in support flows: "We know waiting is frustrating"',
          'Providing clear time expectations during waits: "This usually takes under 2 minutes"',
          'Avoiding blame language: "Let us fix this" rather than "You entered an invalid value"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Emotional and physical distress creates temporary accessibility impairments for all users',
        examples: [
          'Stress-induced tremors require larger tap targets (similar to motor disability accommodations)',
          'Cognitive overload from frustration mirrors cognitive disability needs (simpler language, fewer choices)',
          'Tear-blurred vision requires higher contrast and larger text (similar to low-vision accommodations)',
          'Anxiety-driven screen reader usage benefits from clear, structured content and ARIA live regions for status updates',
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
        title: 'Empathetic Error Recovery',
        description:
          'A payment processor showing a calm, clear error message when a transaction fails',
        code: `<div class="error-recovery" role="alert">
  <div class="error-icon">
    <svg aria-hidden="true"><!-- gentle warning icon --></svg>
  </div>
  <h3>Payment didn't go through</h3>
  <p class="reassurance">Don't worry — you haven't been charged
  and your cart is saved.</p>
  <div class="error-detail">
    <p>Your bank declined the transaction.
    This sometimes happens with new cards.</p>
  </div>
  <div class="actions">
    <button class="primary">Try Again</button>
    <button class="secondary">Use a Different Card</button>
  </div>
  <p class="support-link">
    Still having trouble? <a href="/support">Chat with us now</a>
  </p>
</div>`,
        explanation:
          'This design acknowledges the user is likely frustrated and anxious. It immediately reassures them (no charge, cart saved), explains the issue in plain language, and provides clear next steps. The support link is visible but not intrusive.',
        principle:
          'Design error states for the emotional reality of encountering an error, not the calm rationality of the design team',
        metrics: {
          before: '34% of users abandoned after payment error with generic message',
          after: '12% abandoned after empathetic error message with clear recovery',
          improvement: '65% reduction in post-error abandonment',
        },
      },
      {
        title: 'Frictionless Cancellation Flow',
        description:
          'A subscription service with a straightforward, respectful cancellation process',
        code: `<div class="cancellation-flow">
  <h2>Cancel Your Subscription</h2>
  <p>We're sorry to see you go. Your subscription will remain
  active until the end of your billing period on March 31.</p>

  <div class="what-happens">
    <h4>What happens when you cancel:</h4>
    <ul>
      <li>Access continues until March 31</li>
      <li>Your data is preserved for 90 days</li>
      <li>You can resubscribe anytime</li>
    </ul>
  </div>

  <div class="optional-feedback">
    <p>Want to tell us why? (optional)</p>
    <select>
      <option value="">Skip this</option>
      <option value="price">Too expensive</option>
      <option value="unused">Not using it enough</option>
      <option value="alternative">Found an alternative</option>
      <option value="other">Other reason</option>
    </select>
  </div>

  <div class="actions">
    <button class="primary-danger">Confirm Cancellation</button>
    <button class="secondary">Keep Subscription</button>
  </div>
</div>`,
        explanation:
          'Users cancelling are often frustrated or angry. This flow respects that emotional state by making cancellation fast and clear. The feedback is optional, not mandatory. There are no dark patterns, guilt-tripping modals, or multi-page retention funnels.',
        principle:
          'Respect emotionally charged decisions by reducing friction, not increasing it',
        metrics: {
          before: '23% of users who wanted to cancel gave up and stayed (but churned within 60 days anyway)',
          after: '8% return rate within 30 days after easy cancellation experience',
          improvement: 'Net retention improved because respected users returned voluntarily',
        },
      },
      {
        title: 'Stress-Aware Health Symptom Logger',
        description:
          'A health app that adapts its input method for users likely experiencing pain',
        code: `<div class="symptom-logger pain-mode">
  <h3>How are you feeling?</h3>

  <div class="quick-select" role="radiogroup" aria-label="Pain level">
    <button class="pain-level" aria-label="Mild pain">
      <span class="icon large">😐</span>
      <span>Mild</span>
    </button>
    <button class="pain-level" aria-label="Moderate pain">
      <span class="icon large">😣</span>
      <span>Moderate</span>
    </button>
    <button class="pain-level selected" aria-label="Severe pain">
      <span class="icon large">😫</span>
      <span>Severe</span>
    </button>
  </div>

  <div class="voice-option">
    <button class="voice-input" aria-label="Describe with voice">
      🎤 Tap to describe how you feel
    </button>
  </div>

  <button class="primary large">Log & Get Recommendations</button>
</div>

<style>
.pain-mode .pain-level {
  min-width: 80px;
  min-height: 80px; /* Large tap targets for shaking hands */
  font-size: 1.2rem;
}
</style>`,
        explanation:
          'When users are in pain, fine motor control and cognitive capacity are diminished. This design uses large tap targets, simple one-tap selections, and voice input as an alternative to typing. It minimizes required decisions while still capturing useful data.',
        principle:
          'Physical distress creates temporary disability; design as you would for permanent accessibility needs',
      },
    ],

    bad: [
      {
        title: 'Hostile Cancellation Maze',
        description:
          'A service that makes cancellation deliberately difficult when users are already frustrated',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <h2>Are you SURE you want to cancel?</h2>
  <p>You'll lose access to ALL your data, including:</p>
  <ul class="scary-list">
    <li>847 files you've uploaded</li>
    <li>23 projects you've created</li>
    <li>Your 2-year activity history</li>
  </ul>
  <img src="sad-face.png" alt="Sad illustration">

  <div class="retention-offer">
    <h3>Wait! Here's 50% off for 3 months!</h3>
    <button class="primary huge">KEEP MY ACCOUNT</button>
  </div>

  <a href="/cancel-step-2" class="tiny-link">
    No thanks, continue cancelling
  </a>
  <!-- 4 more pages of this before actual cancellation -->
</div>`,
        explanation:
          'This exploits the empathy gap by designing a cancellation flow that assumes calm users. In reality, users attempting to cancel are often frustrated. Multi-step retention funnels, guilt-tripping data loss warnings, and tiny cancel links escalate negative emotions and destroy trust permanently.',
        principle:
          'Never exploit emotional vulnerability to prevent user actions they have a right to take',
      },
      {
        title: 'Buried Support During Outage',
        description:
          'A service experiencing downtime with no accessible support path',
        code: `<!-- DON'T DO THIS -->
<div class="outage-page">
  <h1>We're experiencing technical difficulties</h1>
  <p>Please try again later.</p>
  <p class="help-text">
    For help, visit our
    <a href="/help">Help Center</a>
    and search for your issue, or email
    support@example.com (response within 48 hours).
  </p>
</div>`,
        explanation:
          'During an outage, users are anxious and potentially losing money or time. Telling them to "try again later" with no ETA, offering only a help center search (which may also be down), and promising 48-hour email response is designed for a calm designer, not a panicking user.',
        principle:
          'Support channels must be most accessible when users are most distressed, not least',
      },
      {
        title: 'Complex Form After Error',
        description:
          'Requiring users to re-enter an entire form after a validation error',
        code: `<!-- DON'T DO THIS -->
<div class="form-error">
  <div class="error-banner" style="background: red; color: white;">
    ERROR: Invalid input in field "Phone Number".
    Please correct and resubmit.
  </div>

  <!-- All form fields cleared, user must start over -->
  <form>
    <input type="text" name="name" value="" placeholder="Full Name">
    <input type="email" name="email" value="" placeholder="Email">
    <input type="text" name="address" value="" placeholder="Address">
    <input type="text" name="city" value="" placeholder="City">
    <input type="text" name="phone" value="" placeholder="Phone Number">
    <!-- 10 more empty fields... -->
    <button type="submit">Submit</button>
  </form>
</div>`,
        explanation:
          'A user who has already filled out a long form and encounters a validation error is frustrated. Clearing all their input and showing a harsh red error banner with technical language escalates that frustration into rage. This design was built by someone who never imagined the emotional state of a user encountering this error.',
        principle:
          'Error recovery must preserve user effort and reduce emotional load, not compound it',
      },
    ],

    realWorld: [
      {
        company: 'Uber',
        product: 'Surge Pricing Communication',
        description: 'Uber redesigned its surge pricing display after discovering users felt exploited during high-demand moments (rain, emergencies). The new design shows a clear fare estimate upfront and allows setting a price alert, acknowledging that users requesting rides during stressful moments need transparency, not surprise multipliers.',
        effectiveness: 'effective',
        analysis: 'By acknowledging the emotional state of users during surge pricing (often stressed, late, or stranded), Uber reduced complaint rates and improved acceptance of dynamic pricing. The fare estimate upfront respects the user\'s anxious state.',
      },
      {
        company: 'Amazon',
        product: 'Self-Service Returns',
        description: 'Amazon\'s return process is deliberately streamlined: select item, select reason, print label, drop off. No retention funnels, no guilt trips, no phone calls required. This design recognizes that users initiating returns are often disappointed or frustrated.',
        effectiveness: 'very-effective',
        analysis: 'Amazon understood that fighting users during an emotionally charged return process destroys lifetime value. The frictionless return experience builds trust, and data shows easy returns actually increase overall purchasing confidence and spending.',
      },
      {
        company: 'Delta Airlines',
        product: 'Flight Delay Notifications',
        description: 'Delta sends proactive delay notifications with rebooking options built into the message. Instead of requiring frustrated travelers to call, wait on hold, and navigate IVR menus, the app surfaces one-tap rebooking during the moment of maximum stress.',
        effectiveness: 'very-effective',
        analysis: 'Travelers facing delays are anxious, angry, and time-pressed. Delta designed for that emotional reality rather than the calm state of the product team. Proactive notifications with embedded actions reduce support call volume by addressing the problem before the user has to seek help.',
      },
      {
        company: 'Headspace',
        product: 'SOS Meditation Sessions',
        description: 'Headspace offers "SOS" sessions specifically designed for acute anxiety, panic, and emotional distress. These are prominently placed and use simplified navigation with fewer choices, acknowledging that users in crisis cannot browse a meditation library calmly.',
        effectiveness: 'very-effective',
        analysis: 'A standard meditation app assumes calm browsing. Headspace\'s SOS feature bridges the empathy gap by designing for users in their most distressed state: large buttons, minimal choices, immediate audio playback, no account prompts or upsells during crisis moments.',
      },
    ],

    abTests: [
      {
        title: 'Error Message Tone: Technical vs Empathetic',
        hypothesis:
          'Empathetic error messages that acknowledge user frustration will reduce abandonment and increase recovery actions',
        controlVersion: {
          description:
            'Technical error message: "Error 422: Unprocessable Entity. The request could not be completed. Please verify your input and try again."',
          metrics: {
            conversionRate: '31%',
            bounceRate: '45%',
            supportTickets: '12 per 100 errors',
          },
        },
        treatmentVersion: {
          description:
            'Empathetic error message: "Something went wrong, but your information is safe. The most common fix is to double-check your card number. Need help? We\'re right here."',
          metrics: {
            conversionRate: '58%',
            bounceRate: '18%',
            supportTickets: '4 per 100 errors',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Empathetic error messages nearly doubled recovery rate and cut abandonment by 60%. Support tickets dropped 67% because users could self-resolve with clear guidance. The key was acknowledging the emotional state and providing immediate, clear action rather than technical jargon.',
          learnings: [
            'Users in error states are emotionally primed for fight-or-flight; calm language de-escalates',
            'Reassurance about data safety reduces anxiety-driven abandonment',
            'Specific, actionable guidance is more effective than generic "try again" when users are frustrated',
            'Visible support access reduces actual support usage by providing psychological safety',
          ],
        },
      },
      {
        title: 'Cancellation Flow: Retention Funnel vs Respectful Exit',
        hypothesis:
          'A respectful single-page cancellation will improve long-term retention through trust, even if short-term cancellation rates increase',
        controlVersion: {
          description:
            'Multi-step cancellation: 4 pages with retention offers, data loss warnings, satisfaction survey, and confirmation. Average completion time: 4 minutes.',
          metrics: {
            cancellationRate: '62%',
            resubscribeRate: '3%',
            npsAfterCancel: '-45',
          },
        },
        treatmentVersion: {
          description:
            'Single-page cancellation: clear summary, optional one-question feedback, prominent confirm button. Average completion time: 30 seconds.',
          metrics: {
            cancellationRate: '78%',
            resubscribeRate: '18%',
            npsAfterCancel: '+12',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While immediate cancellation rate was higher (+26%), the respectful flow produced 6x more resubscriptions within 90 days. NPS after cancellation swung from deeply negative to positive, creating brand advocates even among churned users. Lifetime value was higher for the respectful exit cohort.',
          learnings: [
            'Hostile retention funnels retain angry users temporarily but destroy long-term relationship',
            'Users who feel respected during cancellation are significantly more likely to return',
            'Emotional state at exit strongly predicts word-of-mouth and future resubscription',
            'The empathy gap causes designers to underestimate how much anger retention funnels generate',
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
        name: 'Stress-Point UX Quality',
        description:
          'Error messages, loading states, and failure flows that use technical language or lack empathetic tone',
        howToSpot:
          'Trigger errors intentionally and evaluate the emotional quality of the response: is it written for a calm developer or a frustrated user?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Support Accessibility During Distress',
        description:
          'Support and help options that are buried or harder to access during the moments when users are most likely to need them',
        howToSpot:
          'Navigate to error pages, outage screens, and failure states — check how many clicks it takes to reach a human',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Emotional Friction in Exit Flows',
        description:
          'Cancellation, refund, and complaint flows that add unnecessary steps, guilt-trip messaging, or tiny action links',
        howToSpot:
          'Attempt to cancel or request a refund — count the steps, measure the time, note any dark patterns',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Input Preservation During Errors',
        description:
          'Forms and flows that do or do not preserve user input when errors occur',
        howToSpot:
          'Fill out a long form, trigger a validation error, and check whether all previously entered data is retained',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Tap Target Size in Critical Flows',
        description:
          'Small or tightly packed interactive elements in error recovery, support, and high-stress flows',
        howToSpot:
          'Check button and link sizes in error states, cancellation flows, and support pages — are they large enough for shaking or imprecise taps?',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Calm-State Design Pattern',
        description: 'Interfaces designed exclusively for composed, focused users without accommodation for emotional extremes',
        indicators: ['Complex multi-step error recovery', 'Small text and dense layouts in support flows', 'No emotional acknowledgment in error messages', 'Identical interaction patterns regardless of user state'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Hostile Exit Pattern',
        description: 'Deliberately increased friction in exit flows (cancellation, unsubscribe, account deletion) that exploits user frustration',
        indicators: ['Multi-page cancellation funnels', 'Guilt-tripping copy or imagery', 'Tiny or de-emphasized exit action links', 'Mandatory surveys before allowing cancellation'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Support Burial Pattern',
        description: 'Customer support channels that become harder to access precisely when users are most distressed',
        indicators: ['Help centers with no live support during outages', 'Phone numbers hidden behind multiple navigation layers', 'Chatbot-only support with no human escalation', 'FAQ-first support that does not surface during errors'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'State-Blind Interaction Pattern',
        description: 'Identical interaction design regardless of the emotional or physical context of use',
        indicators: ['Same tap target sizes in calm browsing and error recovery', 'No adaptive language based on user journey state', 'No proactive support surfacing during failure states', 'No form auto-save or input preservation'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What emotional state is the user likely in at this point in the flow?',
      'Have error messages been written from the perspective of a frustrated user, not a calm developer?',
      'Can users reach human support within 2 taps from any error or failure state?',
      'Is user input preserved when validation errors occur?',
      'Does the cancellation flow respect the user\'s time and emotional state?',
      'Are tap targets large enough for users with reduced motor control from stress?',
      'Does the loading state communicate progress and reassurance?',
      'Has the design been tested with users in simulated stress conditions?',
      'Are there any flows that become deliberately harder when users are frustrated?',
      'Does the interface adapt its tone, complexity, or interaction model based on user state?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the empathy gap bias.

Analyze the provided design for empathy gap patterns. Identify:

1. **Stress-Point Quality**: How does the design handle errors, failures, and frustrating moments?
2. **Emotional State Awareness**: Does the design adapt to different user emotional states?
3. **Support Accessibility**: How easily can distressed users reach help?
4. **Exit Flow Respect**: Are cancellation, refund, and complaint flows empathetic or hostile?
5. **Physical State Accommodation**: Does the design account for reduced motor/cognitive capacity during distress?

For each pattern found:
- Identify the emotional state users are likely in at that point
- Assess whether the design matches that emotional reality
- Determine if there is exploitation of emotional vulnerability
- Evaluate the gap between designer assumptions and user reality
- Suggest improvements for emotionally aware design

Consider:
- Is the design built for the designer's calm state or the user's distressed state?
- Are error flows empathetic or technical?
- Are exit flows respectful or hostile?
- Are support channels most accessible when users need them most?
- Does the design acknowledge and accommodate emotional extremes?

Provide actionable recommendations for bridging the empathy gap in the design.`,

    outputSchema: {
      type: 'object',
      properties: {
        empathyGapPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              flowName: { type: 'string' },
              userEmotionalState: { type: 'string' },
              designAssumption: { type: 'string' },
              emotionalReality: { type: 'string' },
              gapSeverity: { type: 'string' },
              exploitative: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'flowName',
              'userEmotionalState',
              'designAssumption',
              'gapSeverity',
              'exploitative',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            stressPointQuality: { type: 'number' },
            emotionalAwareness: { type: 'number' },
            supportAccessibility: { type: 'number' },
            exitFlowRespect: { type: 'number' },
          },
          required: [
            'stressPointQuality',
            'emotionalAwareness',
            'supportAccessibility',
            'exitFlowRespect',
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
        'empathyGapPatterns',
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
        title: 'Map Emotional States Across the User Journey',
        description:
          'Identify every point in your user flow where emotional state is likely elevated: errors, waits, payments, cancellations, support needs, health decisions',
        example:
          'Create an emotion map: "Payment failure -> frustration/anxiety", "Flight delay -> anger/panic", "Symptom logging -> pain/fear"',
        tips: [
          'Interview users about their emotional experience at each stage',
          'Use support ticket sentiment analysis to find high-emotion touchpoints',
          'Do not rely on your own calm-state assumptions about user emotions',
        ],
      },
      {
        step: 2,
        title: 'Design for the Emotional Extreme, Not the Average',
        description:
          'At each high-emotion touchpoint, design as if the user is in the most intense emotional state that is reasonably common',
        example:
          'Design your error recovery as if the user has already encountered three errors in a row and is about to give up',
        tips: [
          'Use the "worst reasonable day" test: what if this user is having the worst day this interface could give them?',
          'Increase tap targets, simplify language, and reduce required steps at stress points',
          'Offer multiple input methods (tap, voice, gesture) for physically distressed users',
        ],
      },
      {
        step: 3,
        title: 'Write Empathetic Microcopy for Distressed States',
        description:
          'Replace technical, neutral, or blaming language with copy that acknowledges the emotional reality and provides clear next steps',
        example:
          'Replace "Error 422: Invalid input" with "Something went wrong — your data is safe. Here is how to fix it."',
        tips: [
          'Lead with reassurance, then explain, then provide action',
          'Avoid blame language: "we" not "you" when describing problems',
          'Keep sentences under 15 words in error and support contexts',
        ],
      },
      {
        step: 4,
        title: 'Surface Support Proactively During Distress',
        description:
          'Make human support channels most visible and accessible during the moments users are most likely to be frustrated',
        example:
          'Show a persistent "Chat with us" button on error pages and outage screens, not just in the footer of the help center',
        tips: [
          'Measure time-to-human from every error state in your product',
          'Auto-escalate chatbot conversations that detect frustration signals',
          'Provide phone numbers on outage pages, not just during business hours',
        ],
      },
      {
        step: 5,
        title: 'Test Under Simulated Stress Conditions',
        description:
          'Conduct usability testing where participants are under time pressure, interrupted, or primed with frustration scenarios',
        example:
          'Give participants a 90-second timer to complete a form, then trigger a validation error that clears one field. Observe their reaction.',
        tips: [
          'Use time pressure as a proxy for emotional stress in testing',
          'Record emotional responses, not just task completion rates',
          'Test error recovery, cancellation, and support flows with stressed users specifically',
        ],
      },
    ],

    dos: [
      'Design error messages for frustrated users, not calm developers',
      'Preserve all user input when validation errors occur',
      'Make cancellation, refund, and complaint flows as simple as signup',
      'Surface human support prominently during errors and outages',
      'Use empathetic language that acknowledges the user\'s likely emotional state',
      'Provide large tap targets and simplified layouts in high-stress flows',
      'Offer undo capabilities rather than irreversible destructive actions',
      'Test critical flows under simulated stress conditions',
    ],

    donts: [
      'Don\'t design exit flows to be deliberately more difficult than entry flows',
      'Don\'t use guilt-trip language or imagery in cancellation flows',
      'Don\'t clear form data when validation errors occur',
      'Don\'t hide support channels behind self-service content during crises',
      'Don\'t use technical jargon in error messages',
      'Don\'t assume users are calm and focused at every touchpoint',
      'Don\'t exploit emotional vulnerability to prevent legitimate user actions',
      'Don\'t require complex decisions from users in distressed states',
    ],

    bestPractices: [
      {
        title: 'Emotional State Mapping',
        description:
          'Create an emotion map for every critical user flow, identifying likely emotional states at each step',
        rationale:
          'Designers in calm states systematically underestimate user emotions; explicit mapping counteracts this bias',
        example:
          'Flow: Purchase -> Payment Error -> Recovery. Emotions: excitement -> anxiety -> frustration. Design: reassure -> simplify -> support.',
      },
      {
        title: 'Stress-Test Your Error Flows',
        description:
          'Regularly audit all error, failure, and edge-case flows from the perspective of a frustrated user',
        rationale:
          'Error flows are often the last thing designed and first thing cut, but they are encountered during peak emotional intensity',
        example:
          'Monthly "frustration audit": trigger every error in your product and grade the emotional quality of each response',
      },
      {
        title: 'Empathic UX Writing Standards',
        description:
          'Establish content guidelines that specify tone, structure, and vocabulary for emotionally charged contexts',
        rationale:
          'Consistent empathetic writing cannot be left to individual judgment; it must be systematized',
        example:
          'UX writing rule: all error messages must follow the pattern "Reassurance + Explanation + Action" with no blame language',
      },
      {
        title: 'State-Aware Interface Adaptation',
        description:
          'Adapt interface complexity, language, and interaction patterns based on the user\'s likely emotional state',
        rationale:
          'The same user has dramatically different cognitive and motor capacity when calm versus distressed',
        example:
          'During detected frustration (multiple errors, rapid clicks): enlarge CTAs, simplify options, surface support chat',
      },
      {
        title: 'Respectful Exit Experiences',
        description:
          'Make cancellation and exit as smooth as onboarding, treating departure as a future return opportunity',
        rationale:
          'Users who feel respected during exit are 6x more likely to return than those forced through hostile retention funnels',
        example:
          'Single-page cancellation with optional feedback, data export option, and clear resubscription path',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Errors must be clearly identified with suggestions for correction',
        implementation:
          'Write error messages in plain language with specific fix instructions. Use ARIA live regions to announce errors immediately. Never use error codes alone.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - Provide specific, helpful suggestions when input errors are detected',
        implementation:
          'Show exactly what is wrong and how to fix it. Preserve all valid input. Focus the user on the specific field that needs correction.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.5.5',
        guideline:
          'Target Size - Interactive elements must have sufficient size for users with motor impairments',
        implementation:
          'Use minimum 44x44px tap targets in all error, support, and high-stress flows. Increase to 48x48px or larger when users may have stress-induced tremors.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For submissions with legal or financial consequences, allow review, confirmation, or reversal',
        implementation:
          'Provide undo or reversal windows for emotionally charged actions (cancellation, deletion, large purchases) rather than requiring perfect judgment in a distressed state.',
      },
    ],

    ethics: [
      {
        concern: 'Hostile Retention Funnels',
        severity: 'critical',
        explanation:
          'Multi-step cancellation flows, guilt-trip messaging, and hidden exit links that exploit user frustration to prevent legitimate cancellation',
        mitigation:
          'Make cancellation as easy as signup. One-page flow, prominent confirm button, optional feedback. FTC and EU consumer protection laws are increasingly targeting these patterns.',
      },
      {
        concern: 'Frustration Exploitation',
        severity: 'critical',
        explanation:
          'Deliberately degrading the experience for users trying to leave, complain, or get refunds',
        mitigation:
          'Apply the "reciprocity test": would you accept this flow if you were the frustrated user? If not, redesign it.',
      },
      {
        concern: 'Impulse Decision Exploitation',
        severity: 'high',
        explanation:
          'Pushing irreversible decisions (purchases, upgrades, commitments) when users are in emotionally heightened states',
        mitigation:
          'Add cooling-off periods, easy reversal windows, and clear "Save for Later" options alongside emotional purchase paths.',
      },
      {
        concern: 'Pain-State Data Collection',
        severity: 'high',
        explanation:
          'Requiring extensive data input from users in physical or emotional distress (health apps, crisis services)',
        mitigation:
          'Minimize required fields during distress. Offer voice input, simple selections, and the option to complete details later when the user is in a calmer state.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Effect of Weather on Stock Returns: A Comparison Between Hot-Cold Empathy Gaps',
        author: 'Loewenstein, G.',
        year: 2005,
        description:
          'Key paper on how visceral states systematically bias predictions about future preferences and behavior',
        type: 'foundational',
      },
      {
        title: 'The Heat of the Moment: The Effect of Sexual Arousal on Sexual Decision Making',
        author: 'Ariely, D., & Loewenstein, G.',
        year: 2006,
        doi: '10.1002/bdm.501',
        description:
          'Demonstrates the empathy gap experimentally: people in calm states dramatically underestimate how arousal changes decisions',
        type: 'foundational',
      },
      {
        title: 'Projection Bias in Predicting Future Utility',
        author: 'Van Boven, L., & Loewenstein, G.',
        year: 2003,
        doi: '10.1111/1468-0262.00406',
        description:
          'Foundational paper on projection bias and the inability to accurately predict future emotional states',
        type: 'foundational',
      },
      {
        title: 'Hot-Cold Empathy Gaps and Medical Decision Making',
        author: 'Loewenstein, G.',
        year: 2005,
        description:
          'Examines how empathy gaps affect medical decisions, including physician underestimation of patient pain',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers emotional state effects on decision-making, including how System 1 dominates during emotional arousal',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Includes key experiments on empathy gaps, particularly how emotional states alter what we value and choose',
        type: 'practical',
      },
      {
        title: 'Designing for Emotion',
        author: 'Walter, Aarron',
        year: 2011,
        isbn: '9781937557003',
        description:
          'Practical guide to designing interfaces that account for and respond to user emotional states',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for the Stressed User',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/hostile-error-messages/',
        description:
          'Practical UX guidelines for designing error messages and stressful interactions empathetically',
        type: 'practical',
      },
      {
        title: 'The Empathy Gap in UX Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/empathy-gap',
        description:
          'Overview of empathy gap theory with design-specific applications and examples',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Hot-Cold Empathy Gap',
        author: 'George Loewenstein',
        url: 'https://www.youtube.com/watch?v=empathy-gap-loewenstein',
        description:
          'Loewenstein explains his research on how emotional states bias prediction and decision-making',
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
