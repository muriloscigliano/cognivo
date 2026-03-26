/**
 * HOT-COLD EMPATHY GAP
 *
 * We underestimate how visceral states (hunger, anger, pain, arousal)
 * influence our own and others' decisions and preferences.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const hotColdEmpathyGap: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'hot-cold-empathy-gap',
    name: 'Hot-Cold Empathy Gap',
    aliases: ['Empathy Gap', 'Projection Bias', 'State-Dependent Preference'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'emotion',
      'visceral-states',
      'impulse',
      'decision-making',
      'self-prediction',
      'cooling-off',
      'state-dependent',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'When calm, we cannot accurately predict how we will behave when emotional, hungry, angry, or in pain — and vice versa.',

    detailed: `The hot-cold empathy gap describes our systematic inability to appreciate how visceral drives — hunger, anger, pain, sexual arousal, fatigue, craving — transform our preferences, priorities, and decisions. In a "cold" (calm, rational) state, we underestimate how powerfully a "hot" (emotionally or physically aroused) state will override our intentions. Conversely, when in a hot state, we cannot imagine ever feeling differently.

This bias operates in both directions. A calm shopper pledges to eat healthy but fills the cart with junk food when hungry. An angry customer writes a scathing review they later regret. A user signs up for an annual plan during an excited product demo, then feels buyer's remorse the next morning.

In product and UX design, the empathy gap means users make commitments, purchases, and irreversible actions under emotional states they will not sustain. Ethical design accounts for these state transitions by building in cooling-off periods, confirmation delays, and state-aware friction that protects users from their temporary selves.`,

    psychologyBasis: {
      discoveredBy: 'George Loewenstein',
      year: 1996,
      theory: 'Visceral Factors in Decision-Making',
      mechanism: `The brain fails to simulate visceral states it is not currently experiencing. This happens because:

1. **State-Dependent Memory**: Emotional and physical states act as context cues for memory retrieval — calm states cannot access hot-state memories accurately
2. **Projection Bias**: People project their current preferences onto their future selves, assuming they will feel the same way later
3. **Visceral Override**: Hot states commandeer the prefrontal cortex, temporarily displacing long-term goals with immediate urges
4. **Empathic Failure**: We cannot accurately model others' visceral states either, leading to poor predictions about how angry, hungry, or distressed users will behave
5. **Adaptation Neglect**: We forget how quickly we adapt to or recover from intense states, overweighting current feelings in forecasts`,
    },

    realWorldExample: `In Loewenstein's classic studies, participants in a cold state predicted they could resist temptation, withstand pain, and make rational choices under pressure. When later placed in hot states (hungry, in pain, sexually aroused), they consistently behaved contrary to their cold-state predictions. Hungry grocery shoppers bought 64% more impulse items than sated shoppers, despite identical shopping lists. The cold-state self genuinely could not predict the hot-state self's behavior.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The hot-cold empathy gap profoundly affects how users make decisions in interfaces, especially around purchases, commitments, and irreversible actions. Users in emotional or visceral states (excitement, frustration, urgency, FOMO) make choices their calm selves would not endorse. Designers can leverage this understanding to:

- Build cooling-off periods before irreversible actions taken in hot states
- Add confirmation delays for high-stakes decisions made under emotional pressure
- Design state-aware UX that detects and adapts to likely emotional contexts
- Protect users from impulse decisions with gentle friction
- Time important decisions for when users are most likely in a calm, rational state`,

    whenToUse: [
      {
        title: 'Post-Purchase Cooling-Off Periods',
        scenario:
          'When users make significant financial commitments that may be driven by excitement or urgency',
        example:
          'After a high-value purchase, show a "You have 24 hours to change your mind — no questions asked" confirmation with easy cancellation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Anger-Proofing Communication Flows',
        scenario:
          'When users compose messages, reviews, or complaints while frustrated or angry',
        example:
          'Add a "Send in 5 minutes?" delay for support messages or reviews written after negative experiences, with option to edit before sending',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Sleep-On-It Purchase Reminders',
        scenario:
          'When users add expensive items to cart during late-night browsing or flash sales',
        example:
          'For purchases over a threshold, offer "Save for tomorrow — we\'ll remind you in the morning" as a prominent alternative to instant checkout',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Commitment Gates',
        scenario:
          'When users sign up for long-term commitments during an excited onboarding flow',
        example:
          'After a product demo high, show annual vs monthly options with clear total cost and a "Start monthly, upgrade anytime" recommendation',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Account Deletion Safeguards',
        scenario:
          'When frustrated users attempt to delete accounts or data after a bad experience',
        example:
          'Implement a 7-day grace period for account deletion with a "We\'ve paused your deletion — restore anytime this week" email the next day',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Rage-Click Detection',
        scenario:
          'When detecting patterns of frustration in user interactions',
        example:
          'After detecting rapid clicks or aggressive scrolling, surface a calm support option: "Having trouble? Let us help" instead of more UI',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency or Safety Flows',
        reason:
          'Cooling-off delays can be dangerous when immediate action is genuinely needed',
        consequence:
          'Users unable to report abuse, fraud, or safety concerns quickly enough',
        alternative:
          'Allow immediate action for safety-critical flows but offer post-action review for non-critical follow-ups',
      },
      {
        title: 'Exploiting Hot States for Conversion',
        reason:
          'Deliberately triggering urgency, FOMO, or excitement to drive impulse purchases is manipulative',
        consequence:
          'High return rates, buyer\'s remorse, churn, and eroded trust',
        alternative:
          'Design for calm-state decisions; build value that survives the transition to rational evaluation',
      },
      {
        title: 'Over-Paternalizing Users',
        reason:
          'Excessive friction and delays can feel condescending and obstruct legitimate urgent actions',
        consequence:
          'User frustration, perceived lack of trust, abandonment to competitors',
        alternative:
          'Make cooling-off optional and adjustable; let users set their own friction preferences',
      },
      {
        title: 'Low-Stakes Decisions',
        reason:
          'Adding delays to trivial actions creates unnecessary friction without meaningful protection',
        consequence:
          'Slowed workflows, annoyed users, reduced engagement',
        alternative:
          'Reserve state-aware friction for high-stakes, irreversible, or costly decisions only',
      },
    ],

    commonMistakes: [
      {
        title: 'Designing Only for the Calm User',
        description:
          'Testing and designing flows when users are relaxed and focused, ignoring emotional states',
        why: 'Real users interact while angry, tired, distracted, or excited — states that change behavior dramatically',
        fix: 'Test flows under simulated emotional conditions; include frustrated and fatigued users in research',
      },
      {
        title: 'Exploiting Urgency Without Safeguards',
        description:
          'Creating countdown timers, flash sales, and "last chance" pressure without any cooling-off mechanism',
        why: 'Urgency triggers hot-state decisions that lead to regret, returns, and lost trust',
        fix: 'Pair urgency with easy cancellation, generous return windows, and "save for later" options',
      },
      {
        title: 'Ignoring the Post-Decision Emotional Shift',
        description:
          'Treating the purchase moment as final without acknowledging the state transition that follows',
        why: 'Users who bought in excitement will evaluate in calm — if the value doesn\'t hold, they churn',
        fix: 'Send post-purchase reassurance, highlight value realized, and offer easy modification within a grace period',
      },
      {
        title: 'Uniform Friction for All Actions',
        description:
          'Applying the same confirmation patterns to low-stakes and high-stakes decisions',
        why: 'Users learn to click through confirmations reflexively, defeating the purpose',
        fix: 'Scale friction to stakes: simple undo for low-stakes, meaningful delays for irreversible high-stakes actions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout can place cooling-off mechanisms and confirmation steps where they intercept hot-state actions',
        examples: [
          'Position "Save for later" buttons equally prominent as "Buy now" during high-emotion flows',
          'Place confirmation summaries between action triggers and final commits',
          'Use progressive disclosure to slow down high-stakes decisions naturally',
          'Separate browsing/discovery layouts from commitment/checkout layouts',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can calm or escalate emotional states, influencing decision quality',
        examples: [
          'Use calm, measured typography in checkout flows — avoid ALL CAPS urgency',
          'Present total costs in clear, readable type rather than minimized fine print',
          'Use consistent, reassuring language in confirmation dialogs',
          'Avoid exclamation marks and urgency language in high-stakes decisions',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color strongly influences emotional arousal and can either escalate or de-escalate visceral states',
        examples: [
          'Use warm, calming colors in checkout and commitment flows to reduce impulse pressure',
          'Avoid aggressive red urgency indicators on irreversible action buttons',
          'Use neutral tones for cooling-off period UI to encourage rational reflection',
          'Reserve high-arousal colors (red, orange) for genuine alerts, not manufactured urgency',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns directly determine whether users act in hot states or pause for reflection',
        examples: [
          'Implement time-delayed sends for messages composed after negative experiences',
          'Add meaningful confirmation steps proportional to action severity',
          'Provide easy undo and grace periods for all significant actions',
          'Detect rage-click patterns and offer calm support alternatives',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users are pushed into hot states or supported in making calm decisions',
        examples: [
          'Replace "Last chance! Buy now or miss out forever!" with "This will be available — take your time"',
          'Show total annual cost alongside monthly price for subscription commitments',
          'Include "Most people take a day to decide" social proof for major purchases',
          'Frame cancellation and return policies prominently before purchase, not hidden after',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility considerations must account for how visceral states affect different users',
        examples: [
          'Ensure cooling-off mechanisms are keyboard navigable and screen reader accessible',
          'Provide clear text alternatives for urgency-based visual cues (timers, color changes)',
          'Allow users to adjust timing of delayed sends and confirmation periods',
          'Ensure that state-aware friction does not create additional barriers for users with disabilities',
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
        title: '24-Hour Return Window with Proactive Check-In',
        description:
          'E-commerce platform that proactively checks in with buyers after high-value impulse purchases',
        code: `<div class="post-purchase-checkin">
  <h3>Still happy with your purchase?</h3>
  <p class="context">You bought <strong>Premium Annual Plan</strong> yesterday
  during our flash sale. No rush — you have until tomorrow to change your mind.</p>

  <div class="purchase-summary">
    <span class="item">Premium Annual Plan</span>
    <span class="price">$299/year</span>
    <span class="monthly-equiv">($24.92/month)</span>
  </div>

  <div class="actions">
    <button class="primary">Keep My Purchase</button>
    <button class="secondary">Switch to Monthly ($34/mo)</button>
    <button class="tertiary">Cancel — Full Refund</button>
  </div>

  <p class="reassurance">87% of buyers keep their purchase after sleeping on it.</p>
</div>`,
        explanation:
          'The next-day check-in catches users after they have transitioned from the hot state (flash sale excitement) to a cold state (morning after). Offering easy modification — not just keep or cancel — respects that the user may want the product but at a different commitment level.',
        principle:
          'Bridge the empathy gap by revisiting decisions after the emotional state has shifted',
        metrics: {
          before: '18% return rate on flash sale purchases, 23% churn within 60 days',
          after: '9% return rate, 11% churn — plus 15% voluntarily upgraded after confirmation',
          improvement: '50% reduction in returns with higher long-term retention',
        },
      },
      {
        title: 'Delayed-Send for Angry Messages',
        description:
          'Communication platform that detects emotionally charged messages and offers a send delay',
        code: `<div class="message-review">
  <div class="sentiment-notice">
    <span class="icon" aria-hidden="true">&#9888;</span>
    <p>This message sounds like you might be frustrated.
    Want to send it now, or review it with fresh eyes?</p>
  </div>

  <div class="message-preview">
    <blockquote class="draft">
      "This is absolutely unacceptable. I've been waiting 3 days
      and nobody has even responded. I want a full refund immediately
      or I'm reporting this to..."
    </blockquote>
  </div>

  <div class="actions">
    <button class="primary">Send in 5 Minutes</button>
    <button class="secondary">Edit Before Sending</button>
    <button class="tertiary">Send Now</button>
  </div>

  <p class="stat">72% of users who delay edit their message to be more effective.</p>
</div>`,
        explanation:
          'The delay is framed as helping the user be more effective, not patronizing them. The option to send immediately is preserved to respect autonomy. The stat reinforces that most people benefit from the pause without shaming the current emotional state.',
        principle:
          'Introduce proportional friction for hot-state communications without removing user control',
        metrics: {
          before: '34% of angry messages led to escalation; 28% of users regretted messages within 24 hours',
          after: '12% escalation rate; 6% regret rate — and user satisfaction with support increased 40%',
          improvement: '65% reduction in message regret with improved resolution outcomes',
        },
      },
      {
        title: 'Sleep-On-It Cart Reminder',
        description:
          'Shopping app that offers a morning reminder for late-night cart items',
        code: `<div class="late-night-nudge">
  <h3>Late-Night Shopping?</h3>
  <p>It's 11:47 PM. You've added <strong>$347</strong> to your cart.</p>

  <div class="options">
    <button class="primary">
      <span class="label">Save Cart — Remind Me Tomorrow</span>
      <span class="detail">We'll text you at 9 AM with your cart</span>
    </button>
    <button class="secondary">
      <span class="label">Continue to Checkout</span>
    </button>
  </div>

  <p class="social-proof">63% of late-night shoppers prefer to decide in the morning.</p>
</div>`,
        explanation:
          'Late-night browsing is a classic hot state (fatigue + dopamine-driven browsing). The nudge is non-judgmental and frames the delay as a service, not a restriction. The social proof normalizes waiting.',
        principle:
          'Context-aware friction that matches the likely visceral state without blocking the user',
      },
    ],

    bad: [
      {
        title: 'Exploiting FOMO to Drive Hot-State Purchases',
        description:
          'Flash sale page using every urgency trick to prevent rational decision-making',
        code: `<!-- DON'T DO THIS -->
<div class="flash-sale">
  <h2 style="color: red; animation: pulse 0.5s infinite;">
    FLASH SALE ENDING IN 00:03:47!
  </h2>
  <p style="color: red;">Only 2 left in stock!</p>
  <p>Sarah from Chicago just bought this!</p>
  <p>15 people are viewing this RIGHT NOW!</p>
  <button class="buy-now" style="font-size: 2em; background: red;">
    BUY NOW BEFORE IT'S GONE FOREVER!
  </button>
  <small style="color: #ccc;">No refunds. All sales final.</small>
</div>`,
        explanation:
          'This design deliberately triggers a hot state (urgency, scarcity, social pressure) while removing all cooling-off mechanisms (no refunds). It exploits the empathy gap rather than protecting users from it. The calm user who returns tomorrow will feel manipulated.',
        principle:
          'Never manufacture hot states to drive irreversible decisions — it destroys long-term trust',
      },
      {
        title: 'No Grace Period for Account Deletion',
        description:
          'Allowing instant, permanent account deletion when users are frustrated',
        code: `<!-- DON'T DO THIS -->
<div class="delete-account">
  <h3>Delete Your Account</h3>
  <p>This action is permanent and cannot be undone.</p>
  <input type="text" placeholder="Type DELETE to confirm">
  <button class="danger">Delete Everything Now</button>
</div>`,
        explanation:
          'Users often hit "delete account" in a moment of frustration — a hot state. Without a grace period, cooling-off window, or next-day confirmation, the design allows a permanent decision driven by a temporary emotion. The typing confirmation adds friction but does not bridge the empathy gap because the user is still in the hot state when they complete it.',
        principle:
          'Irreversible actions triggered by hot states need time-based safeguards, not just friction',
      },
      {
        title: 'Ignoring Emotional Context in Review Flows',
        description:
          'Prompting users for reviews immediately after a negative experience',
        code: `<!-- DON'T DO THIS -->
<div class="review-prompt" style="display: block;">
  <!-- Shown immediately after a failed transaction -->
  <h3>Rate Your Experience!</h3>
  <div class="stars">1 2 3 4 5</div>
  <textarea placeholder="Tell us what you think!"></textarea>
  <button>Submit Review</button>
</div>`,
        explanation:
          'Asking for a review immediately after a failure or frustration guarantees a hot-state response that may not represent the user\'s considered opinion. The review will skew negative not because of product quality but because of the emotional moment. The user may regret the review once calm.',
        principle:
          'Time review requests for calm states, not immediately after emotional experiences',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: '24-Hour Return Window',
        description: 'Amazon offers a generous return policy and sends follow-up emails asking "How is your purchase?" the day after delivery. This bridges the hot-cold gap by checking in once the buying excitement has faded, allowing easy returns before the product goes unused.',
        effectiveness: 'very-effective',
        analysis: 'The return policy reduces purchase anxiety (cold state worry about hot state mistakes), paradoxically increasing purchase rates. Users buy more confidently knowing they can reverse hot-state decisions.',
      },
      {
        company: 'Gmail',
        product: 'Undo Send',
        description: 'Gmail\'s "Undo Send" feature gives users a configurable window (5-30 seconds) to recall an email after hitting send. While brief, it catches the immediate "oh no" moment when anger or carelessness produced a regrettable message.',
        effectiveness: 'effective',
        analysis: 'The feature is most valuable for hot-state sends — angry replies, premature responses, emotional messages. The short window catches the immediate regret without significantly delaying communication.',
      },
      {
        company: 'Robinhood',
        product: 'Impulse Buy Prevention (Post-Regulation)',
        description: 'After regulatory pressure, Robinhood added educational screens and confirmation steps before first-time options trades and volatile stock purchases. Users must acknowledge risks and wait through a brief educational flow before executing high-risk trades.',
        effectiveness: 'effective',
        analysis: 'The added friction addresses the hot-state problem of excitement-driven trading. Users in a FOMO state are forced through a brief cooling-off educational moment, reducing regret-driven complaints and regulatory risk.',
      },
      {
        company: 'Twitter/X',
        product: 'Reply Prompts',
        description: 'Twitter implemented prompts asking "Want to read the article before replying?" when users attempt to retweet or reply to article links they haven\'t opened. This intercepts the hot-state reaction to headlines.',
        effectiveness: 'effective',
        analysis: 'The prompt bridges the empathy gap between the hot state (outrage at a headline) and the cold state (actually reading the article). Twitter reported that 40% of users who saw the prompt chose to read first.',
      },
    ],

    abTests: [
      {
        title: 'Post-Purchase Check-In: Next-Day Email vs No Follow-Up',
        hypothesis:
          'A next-day check-in email will reduce return rates by letting users confirm or modify hot-state purchases',
        controlVersion: {
          description:
            'Standard flow: purchase confirmation email only, standard 30-day return policy',
          metrics: {
            conversionRate: '100% (already purchased)',
            returnRate: '18.2%',
            npsScore: '34',
          },
        },
        treatmentVersion: {
          description:
            'Next-day email: "Still happy? Keep, modify, or return — easy options inside." Links to one-click keep, downgrade, or cancel.',
          metrics: {
            conversionRate: '100% (already purchased)',
            returnRate: '9.4%',
            npsScore: '52',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The next-day check-in cut returns nearly in half. Users reported feeling respected and in control. 14% who were going to return instead downgraded to a lower tier, retaining revenue. NPS increased 53% because users felt the company cared about their satisfaction, not just the sale.',
          learnings: [
            'Proactive empathy-gap bridging increases trust and retention',
            'Offering modification options (not just keep/cancel) captures revenue that would otherwise be lost',
            'Users who confirm their purchase after reflection become stronger advocates',
            'The cost of the check-in system is far less than the cost of processing returns',
          ],
        },
      },
      {
        title: 'Angry Review Delay: Immediate vs 24-Hour Review Window',
        hypothesis:
          'Delaying review prompts after negative experiences will produce more constructive feedback and reduce regret-driven 1-star reviews',
        controlVersion: {
          description:
            'Review prompt shown immediately after a failed transaction or support interaction',
          metrics: {
            responseRate: '42%',
            averageRating: '1.8 stars',
            constructiveFeedback: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Review prompt sent via email 24 hours later: "We know yesterday was frustrating. We\'d love your honest feedback now that the dust has settled."',
          metrics: {
            responseRate: '31%',
            averageRating: '2.9 stars',
            constructiveFeedback: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While response rate dropped 26%, the quality of feedback improved dramatically. Average rating increased a full star, and constructive feedback nearly tripled. The delayed reviews were more specific, less emotional, and more actionable for the product team.',
          learnings: [
            'Hot-state reviews are abundant but low-quality — dominated by emotion, not insight',
            'Cold-state reviews are fewer but far more actionable and representative',
            'Acknowledging the frustration ("We know yesterday was frustrating") builds trust',
            'Better feedback quality more than compensates for lower response volume',
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
        name: 'Urgency Triggers Without Safeguards',
        description:
          'Countdown timers, "last chance" messaging, or scarcity indicators paired with irreversible actions and no cooling-off period',
        howToSpot:
          'Look for time pressure elements (timers, "ending soon") combined with "no refund" or "all sales final" policies',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Grace Periods',
        description:
          'Irreversible actions (account deletion, permanent data removal, final purchases) that execute immediately without any recovery window',
        howToSpot:
          'Check whether destructive or high-value actions offer any undo, grace period, or post-action review',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Immediate Post-Frustration Prompts',
        description:
          'Review, feedback, or rating prompts triggered immediately after errors, failures, or support interactions',
        howToSpot:
          'Look for review requests that appear right after error states, failed transactions, or negative experiences',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Late-Night or Fatigue-Context Absence',
        description:
          'High-value purchase flows that do not adjust for time of day or session duration indicators',
        howToSpot:
          'Check whether checkout flows offer any context-aware friction for late-night sessions or extended browsing',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Emotional Escalation Design',
        description:
          'Visual elements (pulsing red, ALL CAPS, aggressive animation) designed to heighten rather than calm emotional states before decisions',
        howToSpot:
          'Look for high-arousal visual treatments on action buttons and commitment prompts',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Hot-State Exploitation Pattern',
        description: 'Deliberately triggering or amplifying emotional states to drive immediate, irreversible commitments',
        indicators: [
          'Countdown timers paired with "no refund" policies',
          'Urgency messaging escalating toward a final, non-reversible action',
          'Social pressure elements ("X people watching") at checkout',
          'High-arousal visuals (red, pulsing, animated) on commitment buttons',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing State-Transition Bridge',
        description: 'No mechanism to revisit decisions after the user\'s emotional state has changed',
        indicators: [
          'No post-purchase check-in or confirmation',
          'No grace period or undo window for significant actions',
          'No "save for later" alternative to immediate commitment',
          'Absence of next-day or next-session review opportunity',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Calm-State-Only Design',
        description: 'Interfaces tested and optimized only for calm, focused users without considering emotional or stressed states',
        indicators: [
          'Complex multi-step forms for complaint or cancellation flows',
          'No rage-click detection or frustration-aware support triggers',
          'Error messages that escalate frustration rather than de-escalate',
          'Support flows that require calm, sequential navigation when users are upset',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Proportional Friction Pattern',
        description: 'Appropriate cooling-off mechanisms scaled to the stakes and reversibility of the action',
        indicators: [
          'Simple undo for low-stakes actions',
          'Confirmation dialogs for moderate-stakes actions',
          'Time-delayed execution for high-stakes irreversible actions',
          'Multi-session confirmation for life-altering decisions',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does this flow involve decisions users might make differently when calm vs emotional?',
      'Are there cooling-off periods for high-value or irreversible actions?',
      'Does the design deliberately escalate emotional states before commitment points?',
      'Is there a mechanism to revisit or modify decisions after the emotional state has shifted?',
      'Are review or feedback prompts timed to avoid capturing only hot-state reactions?',
      'Does the checkout or commitment flow adjust for time of day or session context?',
      'Are error and complaint flows designed for frustrated users, not just calm ones?',
      'Is there a "save for later" or "remind me tomorrow" alternative to immediate commitment?',
      'Do angry or frustrated users have easy paths to resolution that account for their state?',
      'Are cancellation and deletion flows protected by grace periods, not just confirmation dialogs?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the hot-cold empathy gap.

Analyze the provided design for hot-cold empathy gap patterns. Identify:

1. **Hot-State Triggers**: Elements that escalate emotional arousal before decision points (urgency, scarcity, frustration)
2. **Missing Safeguards**: High-stakes or irreversible actions without cooling-off periods or grace windows
3. **State-Transition Bridges**: Mechanisms that help users revisit decisions after emotional shifts (check-ins, undo, modification options)
4. **Emotional Context Awareness**: Whether the design adapts to likely emotional states (post-error, late-night, post-frustration)
5. **Proportional Friction**: Whether friction scales appropriately with stakes and reversibility

For each pattern found:
- Identify whether the design exploits, ignores, or mitigates the empathy gap
- Assess the emotional state users are likely in at each decision point
- Determine whether users in a cold state would endorse the same decision
- Evaluate ethical implications of the emotional design
- Suggest improvements for state-aware, ethical design

Consider:
- Are irreversible actions protected by time-based safeguards, not just confirmation dialogs?
- Does the design manufacture hot states to drive conversions?
- Are there mechanisms to bridge the gap between hot-state decisions and cold-state evaluation?
- Do complaint and cancellation flows account for frustrated users?
- Is the design respectful of user autonomy while providing protective friction?

Provide actionable recommendations for ethical, state-aware design.`,

    outputSchema: {
      type: 'object',
      properties: {
        empathyGapPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              likelyUserState: { type: 'string' },
              gapRisk: { type: 'string' },
              safeguardPresent: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'likelyUserState',
              'gapRisk',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            hotStateTriggerScore: { type: 'number' },
            safeguardCoverage: { type: 'number' },
            stateAwareness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'hotStateTriggerScore',
            'safeguardCoverage',
            'stateAwareness',
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
        title: 'Map Emotional Decision Points',
        description:
          'Identify every decision point where users are likely to be in a hot state (excited, frustrated, urgent, fatigued)',
        example:
          'Map: post-demo signup (excited), post-error feedback (frustrated), late-night checkout (fatigued), flash sale purchase (urgent)',
        tips: [
          'Walk through the user journey and tag likely emotional states at each decision',
          'Consider both positive hot states (excitement, FOMO) and negative ones (anger, frustration)',
          'Pay special attention to transitions: post-error, post-success, time-of-day shifts',
        ],
      },
      {
        step: 2,
        title: 'Classify Action Reversibility',
        description:
          'Categorize each action by reversibility and stakes to determine appropriate safeguard level',
        example:
          'Low stakes + reversible: like a post (no safeguard). High stakes + irreversible: delete account (7-day grace period)',
        tips: [
          'Create a 2x2 matrix of stakes (low/high) and reversibility (easy/impossible)',
          'High-stakes irreversible actions get the most friction',
          'Low-stakes reversible actions need only simple undo',
        ],
      },
      {
        step: 3,
        title: 'Design State-Appropriate Friction',
        description:
          'Implement cooling-off mechanisms proportional to action severity and likely emotional intensity',
        example:
          'Annual subscription after demo: "Start with monthly — upgrade anytime" as the default, with annual as the opt-in',
        tips: [
          'Friction should slow without blocking — always preserve user agency',
          'Frame delays as helpful, not restrictive',
          'Make the safeguard the default, with override available',
        ],
      },
      {
        step: 4,
        title: 'Build State-Transition Bridges',
        description:
          'Create mechanisms to revisit decisions once the user has transitioned to a different emotional state',
        example:
          'Send a next-day check-in email: "Still happy with your purchase? Keep, modify, or return with one click."',
        tips: [
          'Time bridges for when the emotional shift is likely to have occurred (next day, next session)',
          'Offer modification options, not just binary keep/cancel',
          'Use empathetic language that acknowledges the state transition',
        ],
      },
      {
        step: 5,
        title: 'Test Under Emotional Conditions',
        description:
          'Include emotionally representative scenarios in your testing — not just calm, focused users',
        example:
          'User test: "You just received a billing error for $500. Now navigate the complaint flow."',
        tips: [
          'Scenario-based testing with frustration, urgency, and excitement prompts',
          'Include fatigued users (test late in session, end of day)',
          'Measure decision quality, not just task completion',
        ],
      },
    ],

    dos: [
      'Build cooling-off periods for high-stakes irreversible decisions',
      'Offer "save for later" or "remind me tomorrow" alternatives to impulse commitment',
      'Send post-decision check-ins once the emotional state has likely shifted',
      'Design complaint and cancellation flows for frustrated users, not calm ones',
      'Scale friction proportionally to action stakes and reversibility',
      'Frame safeguards as helpful services, not restrictions',
      'Detect and respond to frustration signals (rage clicks, rapid actions)',
      'Time feedback and review requests for calm states, not immediately after negative events',
      'Preserve user autonomy — let them override safeguards when they choose to',
      'Use calming visual design in high-stakes decision flows',
    ],

    donts: [
      'Don\'t manufacture urgency or FOMO to drive hot-state decisions',
      'Don\'t allow instant, permanent account or data deletion without a grace period',
      'Don\'t prompt for reviews immediately after frustrating experiences',
      'Don\'t use high-arousal visuals (pulsing red, ALL CAPS) on irreversible action buttons',
      'Don\'t design only for calm, focused users — test for emotional states too',
      'Don\'t remove all friction from high-stakes decisions in the name of "seamless UX"',
      'Don\'t treat confirmation dialogs as sufficient safeguards for hot-state decisions',
      'Don\'t exploit emotional vulnerability (grief, anger, excitement) for conversion',
      'Don\'t pair "no refunds" with urgency-driven purchase flows',
      'Don\'t assume users will behave the same way across emotional states',
    ],

    bestPractices: [
      {
        title: 'Proportional Friction Architecture',
        description:
          'Match safeguard intensity to the combination of action stakes, reversibility, and likely emotional state',
        rationale:
          'Uniform friction trains users to click through; proportional friction signals genuine importance',
        example:
          'Undo for typos, confirm for settings changes, 24-hour grace for account deletion, 7-day review for legal commitments',
      },
      {
        title: 'State-Transition Bridging',
        description:
          'Proactively revisit significant decisions once the user has had time to shift emotional states',
        rationale:
          'Users cannot bridge the gap themselves — they need a prompt to re-evaluate in a different state',
        example:
          'Next-day email after major purchases with easy keep/modify/return options',
      },
      {
        title: 'Empathetic Error Handling',
        description:
          'Design error states and complaint flows for frustrated users, using de-escalation rather than additional demands',
        rationale:
          'Users in error states are in a hot state; additional friction increases frustration exponentially',
        example:
          'After a payment error: "We\'re sorry — here\'s what happened and what we\'re doing about it" with one-click resolution',
      },
      {
        title: 'Contextual Awareness',
        description:
          'Adjust interface behavior based on contextual signals of emotional state (time of day, session length, interaction patterns)',
        rationale:
          'Context clues indicate likely visceral states without requiring explicit self-report',
        example:
          'Offer "Save cart for morning" for checkout attempts after 11 PM on sessions longer than 45 minutes',
      },
      {
        title: 'Calm-State Default Design',
        description:
          'Design the default path for calm, rational decision-making, with hot-state paths as exception handling',
        rationale:
          'If the default flow is designed for excitement or urgency, it will exploit every user, not just hot-state ones',
        example:
          'Default to monthly billing with annual as an opt-in upgrade, rather than defaulting to annual during excited onboarding',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable — Users can extend or disable time limits on cooling-off periods and delayed sends',
        implementation:
          'Allow users to configure delay durations for undo windows, send delays, and grace periods. Provide settings for extending or shortening cooling-off mechanisms.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) — Reversible submissions, checked input, and confirmed actions for significant decisions',
        implementation:
          'All financial commitments, data deletion, and legal agreements must be reversible, reviewable, or confirmed through a time-delayed mechanism.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Don\'t rely solely on color to communicate urgency or emotional state',
        implementation:
          'Combine color-based urgency indicators with text labels, icons, and ARIA attributes so all users perceive state-related information.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Clearly label cooling-off mechanisms and safeguard options',
        implementation:
          'Use descriptive headings for grace period notices, delayed-send options, and post-decision review flows so all users can navigate them.',
      },
    ],

    ethics: [
      {
        concern: 'Hot-State Exploitation',
        severity: 'critical',
        explanation:
          'Deliberately manufacturing or amplifying emotional states (urgency, FOMO, excitement) to drive irreversible commitments while removing safeguards',
        mitigation:
          'Never pair urgency mechanics with "no refund" policies. Always provide cooling-off periods proportional to commitment size. Design for the calm-state user\'s endorsement.',
      },
      {
        concern: 'Vulnerability Exploitation',
        severity: 'critical',
        explanation:
          'Targeting users in grief, financial distress, addiction, or emotional crisis with high-pressure commitment flows',
        mitigation:
          'Implement extra safeguards for contexts associated with vulnerability. Provide easy exit paths and delayed commitments for sensitive product categories.',
      },
      {
        concern: 'Asymmetric Friction',
        severity: 'high',
        explanation:
          'Making it easy to commit in a hot state (one-click buy) but difficult to reverse in a cold state (multi-step cancellation)',
        mitigation:
          'Match cancellation friction to commitment friction. If purchase is one click, cancellation should be equally simple.',
      },
      {
        concern: 'Review Timing Manipulation',
        severity: 'medium',
        explanation:
          'Timing review prompts to capture only hot-state responses — either post-delight for inflated ratings or post-frustration for competitor damage',
        mitigation:
          'Prompt reviews after sufficient time for state transition. Offer opportunities to update reviews after the initial emotional response has settled.',
      },
      {
        concern: 'Paternalism vs Protection',
        severity: 'medium',
        explanation:
          'Overly aggressive safeguards that prevent informed, autonomous users from taking legitimate actions',
        mitigation:
          'Make safeguards the default but overridable. Let users configure their own friction preferences. Never fully block an action — add friction proportionally.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Hot-Cold Empathy Gaps and Medical Decision Making',
        author: 'Loewenstein, G.',
        year: 2005,
        doi: '10.1037/0278-6133.24.4.S49',
        description:
          'Loewenstein explores how the empathy gap distorts medical decision-making, with patients in pain making different choices than their calm selves would endorse',
        type: 'foundational',
      },
      {
        title: 'The Heat of the Moment: The Effect of Sexual Arousal on Sexual Decision Making',
        author: 'Ariely, D., & Loewenstein, G.',
        year: 2006,
        doi: '10.1016/j.jbef.2005.12.001',
        description:
          'Demonstrates that cold-state individuals dramatically underestimate how arousal changes their preferences and judgments',
        type: 'foundational',
      },
      {
        title: 'Projection Bias in Predicting Future Utility',
        author: 'Van Boven, L., & Loewenstein, G.',
        year: 2003,
        doi: '10.1111/1467-9280.02483',
        description:
          'Shows how people project their current state onto future preferences, unable to predict how different states will change their evaluations',
        type: 'advanced',
      },
      {
        title: 'Out of Control: Visceral Influences on Behavior',
        author: 'Loewenstein, G.',
        year: 1996,
        doi: '10.1006/obhd.1996.0028',
        description:
          'The foundational paper on how visceral factors (hunger, pain, craving, emotion) override rational decision-making',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Chapter on the influence of arousal on decision-making, with experiments on the hot-cold empathy gap',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Coverage of how System 1 (hot, fast) and System 2 (cold, deliberate) thinking interact in decision-making',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores affective forecasting failures — our inability to predict how future emotional states will differ from current ones',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Designing for Emotion: How to Use Psychology to Create Compelling UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/emotional-design/',
        description:
          'Practical guide to designing for emotional states in user experience, including managing hot-cold transitions',
        type: 'practical',
      },
      {
        title: 'The Role of Affect in Consumer Behavior',
        author: 'Cohen, J. B., Pham, M. T., & Andrade, E. B.',
        url: 'https://doi.org/10.4324/9781410615640',
        description:
          'Academic overview of how emotions and visceral states drive consumer decisions',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'The Hot-Cold Empathy Gap',
        author: 'Dan Ariely',
        url: 'https://www.youtube.com/watch?v=DTtBEHmiDAE',
        description:
          'Dan Ariely explains his research on how emotional states transform decision-making',
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
      'loss-aversion',       // Loss framing amplifies hot-state responses
      'scarcity-bias',       // Scarcity triggers hot states (urgency, FOMO)
      'present-bias',        // Hot states amplify preference for immediate rewards
      'affect-heuristic',    // Emotional states drive intuitive judgments
      'status-quo-bias',     // Cold-state defaults can protect against hot-state mistakes
    ],

    conflicts: [
      'rational-choice',     // Hot states override rational calculation
      'delayed-gratification', // Empathy gap undermines planned restraint
    ],

    confusedWith: [
      'affect-heuristic',     // Related but different: affect heuristic is about emotional judgments, empathy gap is about state prediction failure
      'present-bias',         // Overlaps but present bias is about time preference, empathy gap is about state-dependent preferences
      'projection-bias',      // Projection bias is a specific mechanism within the broader empathy gap phenomenon
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'projection-bias',
        'affective-forecasting-error',
      ],
    },
  },
};
