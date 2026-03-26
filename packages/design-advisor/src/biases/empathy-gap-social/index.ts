/**
 * EMPATHY GAP (SOCIAL)
 *
 * We underestimate others' emotional experiences and fail to
 * predict how they will feel in situations we haven't shared.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const empathyGapSocial: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'empathy-gap-social',
    name: 'Empathy Gap (Social)',
    aliases: [
      'Interpersonal Empathy Gap',
      'Social Projection Bias',
      'Emotional Perspective-Taking Failure',
    ],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'empathy',
      'emotion',
      'social-cognition',
      'perspective-taking',
      'user-frustration',
      'support-ux',
      'cross-cultural',
      'accessibility',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We underestimate others\' emotional experiences and struggle to predict how they will feel in situations different from our own.',

    detailed: `The Social Empathy Gap is a cognitive bias in which people systematically fail to appreciate the intensity and nature of others' emotional states, especially when the observer is not currently experiencing a similar emotional state themselves.

When designers, product managers, or engineers are calm and knowledgeable, they struggle to understand the frustration, confusion, or anxiety that users experience during error states, complex flows, or moments of failure. This creates a fundamental disconnect: the people building the product cannot accurately model the emotional reality of the people using it.

In UX and product design, this bias leads to dismissive error messages, unhelpful support interfaces, insufficient onboarding guidance, and designs that assume a calm, rational user. It is particularly dangerous in cross-cultural contexts where emotional expression and expectations vary significantly.`,

    psychologyBasis: {
      discoveredBy: 'George Loewenstein',
      year: 1996,
      theory: 'Hot-Cold Empathy Gap Theory',
      mechanism: `The brain fails to accurately simulate others' emotional states because it anchors to its own current emotional baseline. This happens because:

1. **Projection Bias**: We project our own current emotional state onto others, assuming they feel similarly to how we feel right now
2. **Empathy Deficit in Cold States**: When we are calm ("cold" state), we cannot fully appreciate the intensity of someone else's frustration, anger, or panic ("hot" state)
3. **Curse of Knowledge**: Once we understand a system, we cannot un-know it, making it nearly impossible to simulate a novice's confusion
4. **Emotional Attenuation**: Memories of our own past emotional states fade in intensity over time, reducing our ability to recall what frustration or confusion truly felt like
5. **Social Distance**: The more different someone is from us (culturally, demographically, in ability), the harder it is to model their emotional experience`,
    },

    realWorldExample: `A software team builds an error page that says "Error 403: Forbidden." The engineers understand exactly what this means and find it perfectly clear. But for a non-technical user who just spent 20 minutes filling out a form, this message is bewildering and infuriating. They don't know what they did wrong, whether their data was saved, or what to do next. The team's inability to feel the user's frustration at that moment -- because they themselves are calm and knowledgeable -- is the social empathy gap in action.

Similarly, customer support chatbots are often designed by people who aren't frustrated, to handle people who are. The result is tone-deaf responses like "I'm sorry you're having trouble! Have you tried turning it off and on again?" delivered to someone who has already tried that five times and is on the verge of cancelling their subscription.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Social Empathy Gap profoundly affects how products handle user distress, confusion, and frustration. Designers who fail to account for this bias create experiences that feel dismissive, robotic, or hostile during the moments when users need the most support. Understanding this bias enables:

- Empathetic error messages that acknowledge frustration and provide clear next steps
- Support UX that matches the emotional intensity of the user's situation
- Frustration-aware flows that detect and respond to user struggle
- Cross-cultural design that respects different emotional norms and expectations
- Accessibility considerations that account for the emotional burden of exclusion`,

    whenToUse: [
      {
        title: 'Error States and Failure Flows',
        scenario:
          'When users encounter errors, failures, or unexpected outcomes',
        example:
          'Replace "Error 500" with "Something went wrong on our end. Your data is safe. Here\'s what you can do next..." with clear recovery actions',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Customer Support Interfaces',
        scenario: 'When designing chatbots, help centers, or support ticket systems',
        example:
          'Detect repeated contact attempts or escalating language and adjust tone, priority, and options accordingly',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Frustration-Sensitive Moments',
        scenario: 'When users are likely to be confused, stuck, or experiencing high cognitive load',
        example:
          'Offer proactive contextual help after detecting rage clicks, repeated failed attempts, or long pauses on complex forms',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Cross-Cultural Product Design',
        scenario: 'When designing for users from different cultural backgrounds',
        example:
          'Adapt tone, formality, error messaging, and support flows to respect cultural norms around emotional expression and authority',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Accessibility and Inclusive Design',
        scenario: 'When designing for users with disabilities or situational impairments',
        example:
          'Acknowledge the additional emotional burden of inaccessible design by providing patient, non-condescending alternatives and clear feedback',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and First-Run Experiences',
        scenario: 'When new users are encountering unfamiliar concepts or workflows',
        example:
          'Assume zero familiarity and provide encouraging, judgment-free guidance rather than terse instructions',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Solicitous Interruptions',
        reason:
          'Excessive empathy-driven prompts ("Are you okay? Need help?") can feel patronizing to experienced users',
        consequence:
          'Users feel condescended to, slowed down, or annoyed by unnecessary hand-holding',
        alternative:
          'Make empathetic assistance available but not intrusive. Use progressive disclosure: offer help after clear struggle signals, not preemptively',
      },
      {
        title: 'Emotional Manipulation',
        reason:
          'Simulating empathy to manipulate user decisions (fake urgency, guilt-tripping) is unethical',
        consequence:
          'Users lose trust when empathy is performative rather than genuine',
        alternative:
          'Ensure empathetic design serves the user\'s interests, not conversion metrics',
      },
      {
        title: 'Assumed Emotional States',
        reason:
          'Projecting emotions onto users who may not be feeling them creates awkward or offensive interactions',
        consequence:
          'Messages like "We know this is frustrating" feel presumptuous when the user isn\'t frustrated',
        alternative:
          'Use conditional language: "If this isn\'t what you expected..." rather than declaring the user\'s emotional state',
      },
      {
        title: 'Cultural Assumptions',
        reason:
          'Emotional norms vary significantly across cultures; Western-centric empathy patterns may alienate users',
        consequence:
          'Overly casual or emotional tone may feel unprofessional in some cultures; overly formal tone may feel cold in others',
        alternative:
          'Research target cultural norms. Offer tone options or adapt based on locale',
      },
    ],

    commonMistakes: [
      {
        title: 'Technical Error Messages',
        description:
          'Displaying raw error codes, stack traces, or jargon to non-technical users',
        why: 'Engineers who understand the error cannot feel how bewildering "ERR_CONNECTION_REFUSED" is to a regular user',
        fix: 'Write error messages in plain language. Explain what happened, whether data is safe, and what to do next',
      },
      {
        title: 'Dismissive Support Chatbots',
        description:
          'Chatbots that give cheerful, generic responses to frustrated users',
        why: 'Bot designers in a calm state cannot model the rage of a user whose account is locked and who has been in a support loop for 30 minutes',
        fix: 'Implement frustration detection (repeated queries, escalating language). Escalate to humans when emotional intensity is high',
      },
      {
        title: 'Blame-the-User Framing',
        description:
          'Error messages that imply the user did something wrong: "Invalid input", "You entered an incorrect value"',
        why: 'Designers see the "correct" input format as obvious because they designed it',
        fix: 'Use neutral framing: "We couldn\'t process this. Here\'s what we need..." Show the expected format with examples',
      },
      {
        title: 'Ignoring Emotional Context in Flows',
        description:
          'Treating all user states as equally calm and rational throughout a flow',
        why: 'Designers experience the flow in testing mode, not in real-world emotional context (rushed, anxious, confused)',
        fix: 'Map emotional states alongside user flows. Design for the worst emotional moment, not the average',
      },
      {
        title: 'One-Size-Fits-All Tone',
        description:
          'Using the same casual, chirpy tone in celebratory moments and failure moments',
        why: 'Brand voice guidelines often specify a single tone without accounting for user emotional state',
        fix: 'Create tone guidelines that adapt to context: celebratory, neutral, supportive, urgent, and recovery tones',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects how visible and accessible support and recovery options are during moments of frustration',
        examples: [
          'Error states should prominently surface recovery actions, not bury them below fold',
          'Help options should be visible at the point of struggle, not hidden in a footer menu',
          'Support chat entry points should be contextually placed near common failure points',
          'Form validation errors should appear inline next to the relevant field, not in a distant summary',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography in error and support contexts affects perceived tone and emotional safety',
        examples: [
          'ALL CAPS error messages feel like shouting at already-frustrated users',
          'Small, grey error text feels dismissive and hard to find',
          'Clear, readable type in error messages reduces cognitive load during stress',
          'Warm, human-sounding copy feels more supportive than technical jargon',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color in error and support states carries strong emotional weight',
        examples: [
          'Aggressive red error states can amplify user anxiety and frustration',
          'Softer warning colors (amber, warm tones) feel less punitive',
          'Reassuring colors (green, blue) in recovery messages reduce stress',
          'Cultural color associations vary: red means luck in some cultures, danger in others',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns during error and frustration states define the emotional quality of the experience',
        examples: [
          'Rage-click detection can trigger proactive help before the user gives up',
          'Undo actions provide emotional safety nets that reduce anxiety',
          'Auto-save prevents the devastating loss of work that designers rarely experience in testing',
          'Smooth, forgiving form validation reduces the punishing feel of repeated failures',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content tone and language are the primary vehicles for bridging or widening the empathy gap',
        examples: [
          '"Oops! Something went wrong" acknowledges fallibility without blaming the user',
          '"Your data has been saved" provides emotional relief during error states',
          'Concrete next steps ("Try this: ...") reduce helplessness',
          'Acknowledging wait times ("This usually takes 2-3 minutes") sets expectations and reduces anxiety',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Users with disabilities experience additional emotional burden from inaccessible design, compounding the empathy gap',
        examples: [
          'Screen reader users encountering unlabeled error states feel helpless, not just inconvenienced',
          'Keyboard-only users locked out of modal error dialogs experience amplified frustration',
          'Cognitive disability users need extra patience in error recovery flows, not faster timeouts',
          'Assistive technology failures create compounded frustration that designers rarely model',
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
        title: 'Empathetic Error Message with Recovery Path',
        description:
          'Payment failure page that acknowledges the user\'s frustration and provides clear, actionable next steps',
        code: `<div class="error-recovery" role="alert">
  <div class="error-icon">
    <svg aria-hidden="true"><!-- gentle warning icon --></svg>
  </div>
  <h2>Your payment didn't go through</h2>
  <p class="reassurance">Don't worry -- you haven't been charged,
  and your cart is saved.</p>

  <div class="what-happened">
    <p>This usually happens when:</p>
    <ul>
      <li>Your card issuer declined the transaction (try calling them)</li>
      <li>The card details have a typo (check the expiry date)</li>
      <li>Your card has insufficient funds</li>
    </ul>
  </div>

  <div class="actions">
    <button class="primary">Try Again with Same Card</button>
    <button class="secondary">Use a Different Payment Method</button>
    <a href="/support" class="text-link">Talk to a real person</a>
  </div>

  <p class="time-context">
    Your cart will be saved for 24 hours.
  </p>
</div>`,
        explanation:
          'This error page addresses the user\'s likely emotional state: anxiety about being charged, frustration at failure, and uncertainty about what to do. It immediately reassures (not charged, cart saved), explains possible causes without blame, and offers multiple recovery paths including human support.',
        principle:
          'Anticipate the user\'s emotional state during failure and design for it explicitly',
        metrics: {
          before: '34% of users abandoned cart after generic "Payment failed" message',
          after: '12% abandoned after empathetic error with recovery paths',
          improvement: '65% reduction in cart abandonment during payment errors',
        },
      },
      {
        title: 'Frustration-Aware Support Chatbot',
        description:
          'Support chatbot that detects escalating frustration and adapts its responses',
        code: `<div class="chat-container" role="log" aria-label="Support conversation">
  <!-- After detecting 3+ messages with negative sentiment -->
  <div class="bot-message escalation-mode">
    <p>I can see this has been a difficult experience.
    Let me skip the standard troubleshooting.</p>

    <div class="escalation-options">
      <button class="primary">
        Connect me to a support specialist now
        <span class="wait-time">Estimated wait: 2 minutes</span>
      </button>
      <button class="secondary">
        Schedule a callback at a time that works for you
      </button>
      <button class="tertiary">
        Email me a detailed solution
        <span class="detail">(response within 1 hour)</span>
      </button>
    </div>

    <p class="context-saved">I've saved everything you've told me
    so you won't have to repeat yourself.</p>
  </div>
</div>`,
        explanation:
          'The chatbot detects that the user is frustrated (repeated messages, negative sentiment) and breaks out of its standard script. It acknowledges the difficulty, skips redundant troubleshooting, offers immediate human escalation, and critically -- saves context so the user doesn\'t have to repeat themselves.',
        principle:
          'Detect emotional escalation and respond with genuine accommodation, not scripted cheerfulness',
        metrics: {
          before: '28% customer satisfaction with standard chatbot flow',
          after: '71% satisfaction with frustration-aware escalation',
          improvement: '154% improvement in CSAT for frustrated users',
        },
      },
      {
        title: 'Contextual Help During Complex Forms',
        description:
          'Tax filing form that proactively offers help when users pause or struggle',
        code: `<div class="form-field" data-complexity="high">
  <label for="deductions">Itemized Deductions</label>
  <input type="text" id="deductions" aria-describedby="deductions-help">

  <!-- Appears after 10+ seconds of inactivity on this field -->
  <div id="deductions-help" class="contextual-help" role="status">
    <p class="help-intro">Not sure what to put here? That's completely normal.</p>
    <details>
      <summary>What counts as an itemized deduction?</summary>
      <ul>
        <li>Medical expenses over 7.5% of income</li>
        <li>Mortgage interest</li>
        <li>State and local taxes (up to $10,000)</li>
      </ul>
    </details>
    <p class="reassurance">
      You can always come back and change this.
      Your progress is saved automatically.
    </p>
  </div>
</div>`,
        explanation:
          'The form recognizes that a long pause on a complex field likely indicates confusion or anxiety. Rather than waiting for the user to seek help, it proactively offers non-judgmental guidance ("That\'s completely normal") and reduces anxiety with auto-save reassurance.',
        principle:
          'Proactively bridge the empathy gap by offering help at moments of likely struggle, not just when users explicitly ask',
      },
    ],

    bad: [
      {
        title: 'Dismissive Technical Error',
        description:
          'Error page that prioritizes technical accuracy over user emotional needs',
        code: `<!-- DON'T DO THIS -->
<div class="error-page">
  <h1>Error 403: Forbidden</h1>
  <p>You do not have permission to access this resource.</p>
  <p>Contact your system administrator.</p>
</div>`,
        explanation:
          'This message is technically accurate but emotionally hostile. It uses jargon ("403", "Forbidden"), implies the user did something wrong, and offers an unhelpful next step. A frustrated user seeing this after 20 minutes of work feels blamed, confused, and abandoned.',
        principle:
          'Technical accuracy without emotional awareness creates hostile user experiences',
      },
      {
        title: 'Tone-Deaf Chatbot Cheerfulness',
        description:
          'Support bot maintaining a chipper tone while the user is clearly upset',
        code: `<!-- DON'T DO THIS -->
<div class="chat-message bot">
  <p>Hi there! 😊 I'm sorry to hear you're having trouble!</p>
  <p>Have you tried clearing your cache and cookies?
  That usually fixes things! 🎉</p>
  <p>If that doesn't work, try again later!
  We're always here to help! 💪</p>
</div>`,
        explanation:
          'When a user is frustrated -- perhaps locked out of their account or unable to complete an urgent task -- chipper emojis and exclamation marks feel mocking. The generic advice ("clear your cache") signals that the bot hasn\'t listened. "Try again later" is abandonment dressed as helpfulness.',
        principle:
          'Performative cheerfulness during user distress widens the empathy gap instead of bridging it',
      },
      {
        title: 'Blame-the-User Validation',
        description:
          'Form validation that frames every issue as a user mistake',
        code: `<!-- DON'T DO THIS -->
<div class="form-errors">
  <h3 style="color: red;">You made the following errors:</h3>
  <ul style="color: red;">
    <li>Invalid email address</li>
    <li>Password does not meet requirements</li>
    <li>Invalid phone number format</li>
    <li>You must accept the terms</li>
  </ul>
</div>`,
        explanation:
          'Labelling issues as things "you" did wrong while displaying them in aggressive red creates a punitive experience. The user may have entered their email correctly but in a slightly different format than expected. The system failed to accommodate them, but the message blames them entirely.',
        principle:
          'Never frame system limitations as user failures -- it compounds frustration with shame',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Error Messages and Loading States',
        description: 'Slack uses warm, human, and often humorous error messages ("You\'re not connected to the internet. But hey, at least you have good taste in apps.") that acknowledge the user\'s frustration while maintaining a supportive tone. Loading states include entertaining quotes rather than cold spinners.',
        effectiveness: 'very-effective',
        analysis: 'Slack\'s content design team explicitly designs for user emotional states. Their error messages acknowledge the disruption, provide reassurance, and maintain warmth without being dismissive. This bridges the empathy gap by treating error states as emotional events, not just technical ones.',
      },
      {
        company: 'Stripe',
        product: 'Developer Error Messages',
        description: 'Stripe\'s API error responses include plain-language explanations, direct links to relevant documentation, and specific suggestions for fixing the issue. Error messages explain what went wrong and why, not just that something failed.',
        effectiveness: 'very-effective',
        analysis: 'Even in a technical context, Stripe recognizes that a developer hitting an error at 2am while debugging a production issue is frustrated. Their error messages bridge the empathy gap by providing the exact information needed to resolve the issue, reducing time-to-resolution and emotional overhead.',
      },
      {
        company: 'Airbnb',
        product: 'Cross-Cultural Guest/Host Communication',
        description: 'Airbnb provides structured message templates, translation features, and cultural context hints when guests and hosts communicate across cultures. The platform anticipates misunderstandings that arise from different cultural norms around hospitality, communication style, and expectations.',
        effectiveness: 'effective',
        analysis: 'Airbnb\'s design acknowledges that hosts and guests from different cultures may have deeply different expectations and emotional responses. By providing structured communication tools, they bridge the social empathy gap between people who cannot intuitively model each other\'s cultural emotional norms.',
      },
      {
        company: 'Apple',
        product: 'Accessibility and VoiceOver Experience',
        description: 'Apple designs VoiceOver interactions with specific attention to the emotional experience of screen reader users. Error states, navigation guidance, and feedback are designed to be patient, clear, and non-condescending, acknowledging the additional cognitive load of non-visual interaction.',
        effectiveness: 'effective',
        analysis: 'Apple\'s accessibility team includes people with disabilities who can directly model the emotional experience. This bridges the social empathy gap that sighted designers naturally have when designing for blind users. The result is interactions that feel respectful rather than afterthought-bolted-on.',
      },
    ],

    abTests: [
      {
        title: 'Error Messages: Technical vs Empathetic',
        hypothesis:
          'Empathetic error messages that acknowledge user frustration will reduce abandonment and increase recovery rates',
        controlVersion: {
          description:
            'Standard technical error message: "Error: Transaction failed. Code: PAYMENT_DECLINED. Please try again."',
          metrics: {
            conversionRate: '31%',
            timeOnPage: '0:18',
            scrollDepth: '10%',
          },
        },
        treatmentVersion: {
          description:
            'Empathetic error message: "Your payment didn\'t go through -- but don\'t worry, you haven\'t been charged. This usually happens because of [3 reasons]. Here\'s what you can do: [3 options including human support]."',
          metrics: {
            conversionRate: '67%',
            timeOnPage: '1:42',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Empathetic error messages more than doubled recovery rates. Users spent significantly more time engaging with recovery options rather than immediately abandoning. The inclusion of "you haven\'t been charged" was the single most impactful element, directly addressing the user\'s primary anxiety.',
          learnings: [
            'Addressing the user\'s likely emotional concern first (Am I charged?) dramatically reduces abandonment',
            'Providing multiple recovery paths (retry, alternative, human) respects different user preferences',
            'Explaining common causes without blame reduces frustration and increases trust',
            'Users who recovered via empathetic messaging had 23% higher lifetime value',
          ],
        },
      },
      {
        title: 'Support Chat: Standard vs Frustration-Aware Escalation',
        hypothesis:
          'Detecting user frustration and proactively escalating will improve satisfaction and resolution rates',
        controlVersion: {
          description:
            'Standard chatbot flow: fixed script, escalation only when user explicitly requests it, no sentiment detection',
          metrics: {
            conversionRate: '42%',
            clickThroughRate: '28%',
          },
        },
        treatmentVersion: {
          description:
            'Frustration-aware chatbot: detects negative sentiment, repeated queries, and escalating language. Proactively offers human escalation after frustration signals, saves context for seamless handoff.',
          metrics: {
            conversionRate: '78%',
            clickThroughRate: '64%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Proactive frustration detection and escalation nearly doubled resolution rates. The key driver was context preservation: users didn\'t have to repeat their issue to the human agent, which was the #1 complaint in the control condition.',
          learnings: [
            'Users rarely explicitly ask for escalation; they either suffer through or leave entirely',
            'Proactive escalation feels like the system "gets it" and builds trust',
            'Context preservation (not repeating yourself) is as important as speed of escalation',
            'Frustration-aware flows reduced support ticket volume by 18% as faster resolution prevented follow-ups',
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
        name: 'Cold Error Messages',
        description:
          'Error states that display technical codes, jargon, or blame-the-user language without emotional awareness',
        howToSpot:
          'Look for HTTP error codes shown to end users, messages using "invalid", "incorrect", "failed", or "you must" language',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Tone-Deaf Support UI',
        description:
          'Support interfaces that maintain the same cheerful tone regardless of user emotional context',
        howToSpot:
          'Check if chatbot responses use the same casual, emoji-laden tone for account lockouts as they do for billing questions',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Recovery Paths',
        description:
          'Error or failure states that don\'t offer clear, actionable next steps for the user',
        howToSpot:
          'Look for error messages that end with "try again later" or "contact support" without providing direct access to either',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Absence of Reassurance',
        description:
          'Failure states that don\'t address the user\'s likely anxieties (data loss, charges, account status)',
        howToSpot:
          'Check whether error messages in financial, medical, or data-sensitive flows confirm the safety of user data, charges, or account status',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Punitive Visual Treatment',
        description:
          'Aggressive use of red, ALL CAPS, or warning iconography in error states that amplifies anxiety',
        howToSpot:
          'Look for bright red text blocks, exclamation mark icons, or bold uppercase text in validation and error messages',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Designer-Centric Error Pattern',
        description: 'Error messages written from the system\'s perspective rather than the user\'s emotional perspective',
        indicators: [
          'Technical error codes visible to end users',
          'Passive voice: "The request could not be processed"',
          'No explanation of impact on user\'s data or state',
          'No clear recovery actions',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Emotional Monotone Pattern',
        description: 'Interface maintains identical tone across all contexts, from success to catastrophic failure',
        indicators: [
          'Same emoji/illustration style for celebrations and errors',
          'Brand voice unchanged between help articles and error states',
          'Chatbot uses same greeting whether user is new or returning after frustration',
          'No tonal adaptation to user sentiment signals',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Assumption of Expertise Pattern',
        description: 'Interface assumes the user understands technical concepts, terminology, or system architecture',
        indicators: [
          'Instructions reference internal system names or concepts',
          'Troubleshooting steps require technical knowledge',
          'Help documentation assumes familiarity with the product',
          'Error resolution requires understanding of the system\'s internal state',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Support Abandonment Pattern',
        description: 'Support flows that make it difficult to reach a human or provide insufficient escalation paths',
        indicators: [
          'No visible path to human support',
          'Chatbot loops through script without escalation option',
          'Support contact info buried in footer or behind multiple clicks',
          'No context preservation when transitioning between support channels',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What emotional state is the user likely in when they encounter this screen?',
      'Does the error message address the user\'s probable anxiety (data safety, charges, account status)?',
      'Are recovery actions clearly visible and easy to execute?',
      'Does the tone adapt to the severity and emotional weight of the situation?',
      'Can the user reach a human if automated support is insufficient?',
      'Is context preserved when users escalate or switch support channels?',
      'Are error messages written in plain language that a non-technical user can understand?',
      'Has the team tested this flow with actual frustrated users, not just calm testers?',
      'Does the design account for cultural differences in emotional expression and expectations?',
      'Are accessibility users considered in the emotional design of error and support states?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the social empathy gap.

Analyze the provided design for social empathy gap patterns. Identify:

1. **Error State Empathy**: How the design handles user frustration during errors and failures
2. **Tone Awareness**: Whether the tone adapts to the emotional context of the interaction
3. **Recovery Support**: Quality and accessibility of recovery paths during failure states
4. **Frustration Detection**: Whether the design detects and responds to user struggle signals
5. **Cultural Sensitivity**: How well the design accounts for diverse emotional norms
6. **Accessibility Empathy**: Whether the emotional design extends to users with disabilities

For each pattern found:
- Identify the likely emotional state of the user at that moment
- Assess whether the design acknowledges or ignores that emotional state
- Determine if the tone and content are appropriate for the emotional context
- Evaluate recovery paths and support accessibility
- Suggest improvements for bridging the empathy gap

Consider:
- Would a frustrated, confused, or anxious user feel helped or dismissed by this design?
- Does the design assume the user is calm, knowledgeable, and patient?
- Are error messages written from the system's perspective or the user's perspective?
- Is support accessible without requiring the user to be calm and persistent?
- Are cross-cultural and accessibility emotional needs addressed?

Provide actionable recommendations for designing with empathy.`,

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
              userEmotionalState: { type: 'string' },
              designResponse: { type: 'string' },
              gapSeverity: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'userEmotionalState',
              'designResponse',
              'gapSeverity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            emotionalAwareness: { type: 'number' },
            toneAdaptability: { type: 'number' },
            recoveryQuality: { type: 'number' },
            culturalSensitivity: { type: 'number' },
            accessibilityEmpathy: { type: 'number' },
          },
          required: [
            'emotionalAwareness',
            'toneAdaptability',
            'recoveryQuality',
            'culturalSensitivity',
            'accessibilityEmpathy',
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
        title: 'Map Emotional States to User Flows',
        description:
          'For each step in a user flow, identify the likely emotional state of the user, especially during error and failure scenarios',
        example:
          'Payment flow: Confident (entering details) -> Anxious (waiting for processing) -> Relieved or Frustrated (success or failure)',
        tips: [
          'Use journey mapping to explicitly annotate emotional states',
          'Include "worst case" emotional states, not just average ones',
          'Interview real users about how they felt during key moments',
        ],
      },
      {
        step: 2,
        title: 'Write Error Content for the Emotional State',
        description:
          'Craft error messages that address the user\'s likely emotional concerns before providing technical information',
        example:
          'First: "Your data is safe and you haven\'t been charged." Then: "Here\'s what happened and what to do next."',
        tips: [
          'Lead with reassurance about the user\'s primary anxiety',
          'Use plain language, not technical jargon',
          'Avoid blame language ("you entered", "invalid", "incorrect")',
        ],
      },
      {
        step: 3,
        title: 'Design Adaptive Tone Systems',
        description:
          'Create tone guidelines that adapt to the emotional weight of the interaction context',
        example:
          'Define 4 tone levels: Celebratory, Neutral, Supportive, Recovery. Map each to specific UI states.',
        tips: [
          'Don\'t let brand voice override emotional appropriateness',
          'Test tone with users in simulated emotional states',
          'Create a tone matrix: context x emotion = appropriate voice',
        ],
      },
      {
        step: 4,
        title: 'Implement Frustration Detection',
        description:
          'Build systems that detect user frustration signals and adapt the experience accordingly',
        example:
          'Track rage clicks, repeated failed attempts, rapid back-navigation, and escalating support language',
        tips: [
          'Use behavioral signals, not just explicit feedback',
          'Escalate support options when frustration is detected',
          'Reduce friction and offer shortcuts to frustrated users',
        ],
      },
      {
        step: 5,
        title: 'Test with Emotionally Realistic Scenarios',
        description:
          'Conduct usability testing that simulates real emotional contexts, not just calm, controlled lab conditions',
        example:
          'Test error flows with users who have just experienced simulated task failure, time pressure, or repeated interruptions',
        tips: [
          'Use scenario-based testing with emotional priming',
          'Include users from diverse cultural backgrounds',
          'Test with users who have disabilities to uncover compounded frustration',
        ],
      },
    ],

    dos: [
      'Lead error messages with reassurance about data safety and account status',
      'Adapt tone to match the emotional weight of the interaction',
      'Provide multiple recovery paths for users in different emotional states',
      'Implement frustration detection and proactive support escalation',
      'Preserve context when users escalate between support channels',
      'Write error messages in plain, non-technical language',
      'Include human support options for high-stress situations',
      'Test designs with users in realistic emotional states, not just calm labs',
      'Account for cultural differences in emotional expression and expectations',
      'Design accessibility experiences with the same emotional care as primary flows',
    ],

    donts: [
      'Don\'t display raw error codes or technical jargon to non-technical users',
      'Don\'t blame the user for system limitations ("invalid input", "incorrect format")',
      'Don\'t maintain the same cheerful tone during user distress and celebration',
      'Don\'t require frustrated users to repeat their problem when escalating',
      'Don\'t assume all users have the same emotional response to failure',
      'Don\'t design error flows only from the perspective of calm, knowledgeable testers',
      'Don\'t use aggressive visual treatment (bright red, ALL CAPS) in error messages',
      'Don\'t simulate empathy for manipulative purposes (fake urgency, guilt)',
      'Don\'t presume the user\'s emotional state -- use conditional language',
      'Don\'t treat accessibility as a checkbox; consider the emotional experience of disabled users',
    ],

    bestPractices: [
      {
        title: 'Emotional-First Error Design',
        description:
          'Address the user\'s emotional state before providing technical details or recovery steps',
        rationale:
          'Users in distress cannot process technical information until their primary anxieties are addressed',
        example:
          '"Your work is safe. We ran into a problem saving your latest change, but everything before that is secure. Here\'s how to recover..."',
      },
      {
        title: 'Frustration-Aware Escalation',
        description:
          'Detect user struggle signals and proactively offer escalated support before the user has to ask',
        rationale:
          'Most frustrated users leave rather than explicitly requesting help. Proactive detection catches them before abandonment',
        example:
          'After 3 failed login attempts, offer password reset, account recovery, and direct human support -- don\'t just repeat "incorrect password"',
      },
      {
        title: 'Context Preservation Across Channels',
        description:
          'When users escalate from bot to human, from email to phone, or between support agents, preserve all context',
        rationale:
          'Repeating a frustrating problem amplifies frustration exponentially. It signals that the system doesn\'t value the user\'s time or effort',
        example:
          'Support agent sees: "User has been in chat for 12 minutes, described [issue], tried [these steps], last message showed frustration"',
      },
      {
        title: 'Cross-Cultural Tone Adaptation',
        description:
          'Adapt the tone, formality, and emotional register of messages based on cultural context and locale',
        rationale:
          'Casual, emoji-heavy Western tech tone may feel unprofessional in some cultures; overly formal tone may feel cold in others',
        example:
          'Japanese locale: formal, apologetic error messages. US locale: warm, conversational. German locale: direct, solution-focused.',
      },
      {
        title: 'Inclusive Emotional Design',
        description:
          'Extend the same emotional care and empathy to accessibility flows as to primary user flows',
        rationale:
          'Users with disabilities experience compounded frustration when inaccessible design is also emotionally dismissive',
        example:
          'Screen reader error messages include the same reassurance, context, and recovery options as visual error messages',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Errors must be clearly identified and described in text',
        implementation:
          'Provide empathetic, plain-language error descriptions that identify the problem and suggest resolution. Use aria-live regions to announce errors to screen readers without requiring page refresh.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - Provide suggestions to fix input errors',
        implementation:
          'Offer specific, actionable suggestions in plain language. Show the expected format with examples rather than just stating "invalid format".',
      },
      {
        wcagLevel: 'AAA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For legal, financial, or data transactions, allow review and correction',
        implementation:
          'Provide confirmation steps, undo options, and draft-saving for high-stakes flows. Frame review as a normal step, not an error-prevention measure.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure error state information is programmatically determinable',
        implementation:
          'Use ARIA roles, live regions, and proper semantic HTML so that error states, reassurance messages, and recovery options are available to all assistive technologies.',
      },
    ],

    ethics: [
      {
        concern: 'Performative Empathy',
        severity: 'high',
        explanation:
          'Simulating empathy in interface copy while the underlying system does not actually accommodate user distress (e.g., saying "We care" but offering no escalation path)',
        mitigation:
          'Ensure that empathetic language is backed by empathetic systems: real escalation paths, context preservation, and genuine support options.',
      },
      {
        concern: 'Manipulative Emotional Design',
        severity: 'critical',
        explanation:
          'Using understanding of user emotional states to manipulate decisions (e.g., triggering anxiety to drive upgrades, or guilt to prevent cancellation)',
        mitigation:
          'Empathy gap awareness should always serve the user\'s interests. Never weaponize emotional understanding for conversion or retention.',
      },
      {
        concern: 'Cultural Stereotyping',
        severity: 'high',
        explanation:
          'Over-generalizing cultural emotional norms or applying stereotypes when adapting tone across locales',
        mitigation:
          'Work with local cultural consultants. Provide user-controlled tone preferences. Avoid rigid cultural assumptions.',
      },
      {
        concern: 'Disability Emotional Patronization',
        severity: 'high',
        explanation:
          'Designing accessibility experiences that are overly cautious, slow, or patronizing in their attempt to be empathetic',
        mitigation:
          'Include users with disabilities in the design process. Empathy means respect, not condescension. Offer the same level of control and agency as primary flows.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Curse of Knowledge in Economic Settings: An Experimental Analysis',
        author: 'Camerer, C., Loewenstein, G., & Weber, M.',
        year: 1989,
        doi: '10.1086/261651',
        description:
          'Foundational work on how knowledge creates empathy gaps in predicting others\' understanding',
        type: 'foundational',
      },
      {
        title: 'Hot-Cold Empathy Gaps and Medical Decision Making',
        author: 'Loewenstein, G.',
        year: 2005,
        doi: '10.1037/0278-6133.24.4.S49',
        description:
          'Demonstrates how empathy gaps affect medical decisions and patient-provider interactions',
        type: 'foundational',
      },
      {
        title: 'Mispredicting Distress Following Romantic Breakup: Revealing the Time Course of the Affective Forecasting Error',
        author: 'Eastwick, P. W., Finkel, E. J., Krishnamurti, T., & Loewenstein, G.',
        year: 2008,
        doi: '10.1016/j.jesp.2007.07.001',
        description:
          'Shows systematic failures in predicting others\' emotional intensity across social contexts',
        type: 'advanced',
      },
      {
        title: 'Empathy Gaps for Social Pain: Why People Underestimate the Pain of Social Suffering',
        author: 'Nordgren, L. F., Banas, K., & MacDonald, G.',
        year: 2011,
        doi: '10.1037/a0020938',
        description:
          'Demonstrates that people systematically underestimate others\' social pain when not experiencing it themselves',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of cognitive biases including empathy failures in judgment and prediction',
        type: 'foundational',
      },
      {
        title: 'The War for Kindness: Building Empathy in a Fractured World',
        author: 'Zaki, Jamil',
        year: 2019,
        isbn: '9780451499257',
        description:
          'Neuroscience of empathy and how to build empathetic systems and cultures',
        type: 'practical',
      },
      {
        title: 'Mismatch: How Inclusion Shapes Design',
        author: 'Holmes, Kat',
        year: 2018,
        isbn: '9780262038881',
        description:
          'How designing for inclusion requires bridging empathy gaps between designers and users with different abilities',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Empathy Gap in Tech: Why We Build for Ourselves',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/empathy-gap/',
        description:
          'Practical guide to recognizing and bridging empathy gaps in product design',
        type: 'practical',
      },
      {
        title: 'Designing for Emotion in Error States',
        author: 'A List Apart',
        url: 'https://alistapart.com/article/designing-for-emotion/',
        description:
          'How to design error states that acknowledge and address user emotional context',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Hot-Cold Empathy Gap',
        author: 'George Loewenstein',
        url: 'https://www.youtube.com/watch?v=hot-cold-empathy-gap',
        description:
          'Original researcher explains the empathy gap theory and its implications',
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
      'curse-of-knowledge',
      'fundamental-attribution-error',
      'false-consensus-effect',
      'empathy-gap-hot-cold',
    ],

    conflicts: [
      'spotlight-effect',
    ],

    confusedWith: [
      'empathy-gap-hot-cold',
      'false-consensus-effect',
      'projection-bias',
    ],

    hierarchy: {
      parent: 'empathy-gap',
      children: [
        'cross-cultural-empathy-gap',
        'designer-user-empathy-gap',
      ],
    },
  },
};
