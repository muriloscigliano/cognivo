/**
 * PEAK END RULE
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const peakEndRule: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'peak-end-rule',
    name: 'Peak End Rule',
    aliases: [],
    category: BiasCategory.MEMORY,
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
    simple: 'Experiences are judged by their peak moment and ending, not their average or duration.',

    detailed: `The Peak-End Rule is a psychological principle stating that people judge experiences based almost entirely on how they felt at the most intense moment (the peak) and at the end, rather than the average of every moment. The duration of the experience has little effect on memory - a phenomenon called "duration neglect."

This means a 3-minute experience with a great ending can be remembered more fondly than a 30-minute experience with a mediocre ending. The high point and final moment dominate our memory and evaluation.

In UX design, this is revolutionary: You don't need to make every moment perfect. Focus on creating memorable peak moments and ensuring positive endings. A product with occasional delight and great final impressions will be remembered better than one that's merely "good" throughout.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `People judge experiences based on the emotional peak and the ending, not the average of every moment. This happens because:

1. **Peak Intensity Encoding**: The brain preferentially encodes moments of highest emotional intensity into long-term memory, whether positive or negative
2. **Recency Weighting**: The final moments of an experience receive disproportionate weight because they are most recently encoded and most accessible during recall
3. **Duration Neglect**: The total length of an experience has remarkably little impact on how it is evaluated — a long pleasant experience is not rated much better than a short one if the peak and ending are similar
4. **Snapshot Model**: Rather than integrating all moments, the brain takes "snapshots" at key emotional points and reconstructs the overall experience from these fragments
5. **Narrative Closure**: Endings function as emotional conclusions that frame the entire preceding experience, creating a coherent narrative memory`,
    },

    realWorldExample: `Kahneman's famous "cold water experiment": Participants held hands in painfully cold water. Group A: 60 seconds at 14°C. Group B: 60 seconds at 14°C PLUS 30 more seconds gradually warming to 15°C. Logically, B suffered longer. But 80% chose to repeat B! Why? B ended less painfully, creating better memory despite longer duration.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Peak-End Rule profoundly affects how users remember and evaluate their entire experience with a product. Designers can leverage this to:

- Create delightful peak moments during key interactions (checkout success, milestone completions)
- Ensure every user flow ends on a positive, memorable note
- Design celebration moments at task completion to anchor positive memories
- Recover gracefully from errors so that the ending still feels positive
- Invest design effort where it matters most: peaks and endings, not every screen`,

    whenToUse: [
      {
        title: 'Checkout Success Screens',
        scenario:
          'When a user completes a purchase, signup, or important transaction',
        example:
          'Show an animated celebration with confetti, a personalized thank-you message, and clear next steps after purchase',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding Completion Moments',
        scenario: 'When a user finishes onboarding or setup flow',
        example:
          'Celebrate the completion with a progress animation, welcome message, and immediate value preview of what they can now do',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Recovery Flows',
        scenario: 'When helping users recover from errors or failed actions',
        example:
          'After resolving an error, show a reassuring success state with clear confirmation that everything is fixed and data is safe',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'App Closing and Session Endings',
        scenario: 'When users log out, close the app, or end a session',
        example:
          'Show a summary of what was accomplished in the session with an encouraging farewell message',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Loading and Wait Celebrations',
        scenario: 'When a long process completes (file upload, data processing, deployment)',
        example:
          'Transform the loading state into a celebration moment when complete, with satisfying animation and clear success feedback',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency or Critical Error States',
        reason:
          'Celebrations are inappropriate when users face data loss, security breaches, or critical system failures',
        consequence:
          'Users will feel the product is tone-deaf and lose trust in its reliability',
        alternative:
          'Focus on clear, calm communication and swift resolution rather than delight',
      },
      {
        title: 'Repetitive Routine Tasks',
        reason:
          'Over-celebrating mundane tasks (saving a file, toggling a setting) becomes annoying',
        consequence:
          'Celebration fatigue: users start ignoring or resenting peak moments',
        alternative:
          'Reserve celebrations for genuine milestones; use subtle confirmations for routine actions',
      },
      {
        title: 'Sensitive Contexts',
        reason:
          'Celebratory endings are inappropriate in medical, financial loss, or grieving contexts',
        consequence:
          'Users feel the interface is insensitive and inappropriate',
        alternative:
          'Use calm, respectful confirmation with empathetic tone and helpful next steps',
      },
      {
        title: 'Accessibility-Impacting Animations',
        reason:
          'Celebration animations can trigger vestibular disorders or seizures',
        consequence:
          'Excluding users with motion sensitivities from positive experience moments',
        alternative:
          'Respect prefers-reduced-motion; provide non-animated celebration states that are equally positive',
      },
    ],

    commonMistakes: [
      {
        title: 'Neglecting the Ending',
        description:
          'Investing heavily in onboarding but treating the checkout confirmation, logout, or session end as an afterthought',
        why: 'The ending disproportionately shapes how users remember the entire experience',
        fix: 'Design endings with the same care as onboarding; every flow needs a thoughtful final screen',
      },
      {
        title: 'Creating Negative Peaks Accidentally',
        description:
          'Allowing frustrating moments (confusing forms, unexpected errors, slow loads) to become the most intense part of the experience',
        why: 'Negative peaks are remembered just as strongly as positive ones and dominate overall evaluation',
        fix: 'Audit flows for frustration points; smooth out pain points or follow them immediately with recovery delight',
      },
      {
        title: 'Celebration Fatigue',
        description:
          'Adding animations, confetti, and celebrations to every minor action',
        why: 'When everything is a celebration, nothing feels special; peaks lose their power',
        fix: 'Reserve peak moments for genuine milestones; use a celebration hierarchy (subtle, moderate, major)',
      },
      {
        title: 'Ignoring Error as Last Interaction',
        description:
          'Letting an error message be the final thing a user sees before leaving',
        why: 'If the last interaction is negative, the entire session is remembered negatively regardless of prior success',
        fix: 'Always follow errors with a resolution path and positive confirmation when resolved',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how peak and ending moments are presented and emphasized',
        examples: [
          'Full-screen success states create stronger peak moments than inline confirmations',
          'Dedicated celebration screens at flow completion signal importance',
          'Summary layouts at session end reinforce accomplishments',
          'Modal celebrations interrupt flow to create memorable peaks',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text at peak and ending moments shapes emotional resonance',
        examples: [
          'Large, celebratory headlines at completion feel rewarding',
          'Warm, personal copy in success states creates emotional connection',
          'Playful typography in peak moments signals delight',
          'Clear, reassuring text in error recovery endings builds confidence',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color at peak moments creates emotional intensity and memorability',
        examples: [
          'Vibrant success colors (greens, golds) at completion create positive peaks',
          'Warm, celebratory palettes at milestones feel rewarding',
          'Gradual color transitions from neutral to positive reinforce progress endings',
          'Consistent use of celebration colors builds anticipation for peak moments',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive peak moments and endings are the most memorable',
        examples: [
          'Confetti animations at checkout completion create emotional peaks',
          'Satisfying micro-interactions at task completion (check marks, progress fills) signal achievement',
          'Interactive summary screens at session end let users review accomplishments',
          'Haptic feedback at key moments adds sensory dimension to peaks',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content at peak and ending moments defines the emotional takeaway',
        examples: [
          'Personalized success messages ("You did it, Sarah!") create stronger peaks',
          'Achievement summaries at flow end anchor positive memories',
          'Encouraging next-step suggestions at endings maintain positive momentum',
          'Storytelling at milestone moments transforms routine tasks into memorable achievements',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Peak and ending experiences must be equally positive for all users',
        examples: [
          'Screen reader announcements of success states must convey celebration tone',
          'Reduced-motion alternatives for celebration animations must still feel rewarding',
          'Keyboard-navigable celebration screens ensure all users reach positive endings',
          'ARIA live regions announce peak moments so assistive technology users share the experience',
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
        title: 'Mailchimp Post-Send Celebration',
        description:
          'After sending an email campaign, Mailchimp shows an animated high-five with a playful congratulations message',
        code: `<div class="send-success-screen">
  <div class="celebration-animation">
    <svg class="high-five-hand" aria-hidden="true">
      <!-- Animated hand giving high five -->
    </svg>
    <div class="confetti" aria-hidden="true"></div>
  </div>
  <h2>High five!</h2>
  <p class="success-message">Your campaign is on its way to <strong>12,847 subscribers</strong>.</p>
  <div class="next-steps">
    <p>We'll start sending now. Check back in a few hours for your first results.</p>
    <a href="/reports" class="primary-action">View Campaign Report</a>
    <a href="/dashboard" class="secondary-action">Back to Dashboard</a>
  </div>
</div>`,
        explanation:
          'The playful high-five animation creates a memorable positive peak at the end of the campaign-sending flow. Users associate Mailchimp with the feeling of accomplishment, not the tedious email-building process.',
        principle:
          'A delightful ending transforms the memory of the entire workflow',
        metrics: {
          before: '62% of users reported the email builder as "stressful"',
          after: '78% rated the overall experience as "enjoyable" post-celebration',
          improvement: 'Net promoter score increased 23 points after adding celebration',
        },
      },
      {
        title: 'Duolingo Lesson Completion',
        description:
          'After completing a lesson, Duolingo shows XP animation, streak celebration, and encouraging progress summary',
        code: `<div class="lesson-complete">
  <div class="xp-burst" role="img" aria-label="You earned 15 experience points">
    <span class="xp-count">+15 XP</span>
    <div class="sparkle-animation" aria-hidden="true"></div>
  </div>
  <div class="mascot-celebration">
    <img src="duo-happy.svg" alt="Duo the owl celebrating">
    <h2>Awesome!</h2>
  </div>
  <div class="streak-display">
    <div class="flame-icon" aria-hidden="true">🔥</div>
    <p><strong>14 day streak!</strong></p>
    <p class="encouragement">You're on fire! Come back tomorrow to keep it going.</p>
  </div>
  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemax="100">
    <div class="fill" style="width: 60%"></div>
    <p>60% through Spanish Basics 2</p>
  </div>
  <button class="continue-btn">Continue</button>
</div>`,
        explanation:
          'Duolingo creates multiple positive peaks (XP burst, mascot celebration, streak display) and ends on an encouraging progress summary. Users remember the joy of completion, not the difficulty of exercises.',
        principle:
          'Layered celebrations create strong positive peaks that override mid-lesson frustration',
      },
      {
        title: 'Delightful Success State After Complex Form',
        description:
          'After a long tax filing or insurance application, showing a warm, relieving success screen',
        code: `<div class="application-complete">
  <div class="checkmark-animation" role="img" aria-label="Application submitted successfully">
    <svg class="animated-check">
      <circle class="check-circle" cx="50" cy="50" r="48"/>
      <path class="check-mark" d="M20 50 L40 70 L80 30"/>
    </svg>
  </div>
  <h1>You're all set!</h1>
  <p class="relief-message">
    Your application has been submitted successfully.
    You can relax — we'll take it from here.
  </p>
  <div class="summary-card">
    <h3>What happens next</h3>
    <ol>
      <li>We review your application (2-3 business days)</li>
      <li>You'll receive a confirmation email</li>
      <li>Your coverage begins on the selected date</li>
    </ol>
  </div>
  <div class="actions">
    <button class="primary">Download Confirmation</button>
    <button class="secondary">Return to Dashboard</button>
  </div>
</div>`,
        explanation:
          'After a stressful, complex form, the success screen creates relief and warmth. The animated checkmark, reassuring language ("You can relax"), and clear next steps transform a tedious experience into a positive memory.',
        principle:
          'Positive endings after difficult experiences create the strongest positive memory rewriting',
      },
    ],

    bad: [
      {
        title: 'Abrupt Ending After Purchase',
        description:
          'Redirecting to a bland confirmation page with no celebration after checkout',
        code: `<!-- DON'T DO THIS -->
<div class="order-confirmation">
  <p>Order #48291 confirmed.</p>
  <p>You will receive an email.</p>
  <a href="/">Return to homepage</a>
</div>`,
        explanation:
          'After the excitement of shopping and the stress of entering payment details, this cold, minimal confirmation is a negative ending. Users will remember the checkout as unsatisfying, reducing likelihood of returning.',
        principle:
          'An anticlimactic ending wastes the emotional investment of the entire flow',
      },
      {
        title: 'Error Message as Last Interaction',
        description:
          'Session timeout error shown when user tries to submit a completed form',
        code: `<!-- DON'T DO THIS -->
<div class="error-screen">
  <h2 style="color: red;">Session Expired</h2>
  <p>Your session has timed out. Please log in again.</p>
  <p style="color: #999; font-size: 0.8em;">
    Your unsaved changes may have been lost.
  </p>
  <a href="/login">Log In</a>
</div>`,
        explanation:
          'If this is the last thing a user sees, it becomes both the negative peak AND the ending. The entire session — including productive work — will be remembered as a failure. "May have been lost" adds anxiety without resolution.',
        principle:
          'Never let an error be the final moment; always provide recovery and resolution',
      },
      {
        title: 'Boring Confirmation Screen',
        description:
          'Generic, unstyled confirmation after completing a milestone like finishing an online course',
        code: `<!-- DON'T DO THIS -->
<div class="course-complete">
  <p>Course completed.</p>
  <p>Certificate available in your profile.</p>
  <button>OK</button>
</div>`,
        explanation:
          'Completing a course is a major achievement. This flat, emotionless confirmation fails to create a positive peak or memorable ending. Users remember the boredom of this screen, not the satisfaction of learning.',
        principle:
          'Milestone completions demand celebration proportional to the effort invested',
      },
    ],

    realWorld: [
      {
        company: 'Disney',
        product: 'Theme Park Fireworks',
        description: 'Disney parks always end the day with a spectacular fireworks show. No matter how long the lines were or how hot the day was, the emotional peak of the fireworks at closing makes visitors remember the entire day positively.',
        effectiveness: 'very-effective',
        analysis: 'Disney is the textbook example of the Peak-End Rule. The fireworks create the most intense emotional moment AND serve as the ending, doubling the effect. Visitors consistently rate park days higher than moment-by-moment tracking would predict.',
      },
      {
        company: 'IKEA',
        product: 'Cheap Food at Exit',
        description: 'IKEA places extremely cheap food (hot dogs, ice cream) at the store exit. After a potentially exhausting warehouse shopping experience, the pleasant surprise of a $1 hot dog creates a positive ending.',
        effectiveness: 'very-effective',
        analysis: 'The food is sold at a loss, but it transforms the ending of an often-frustrating shopping experience. Customers remember IKEA fondly because their last interaction (cheap, tasty food) was positive, overriding memories of confusing layouts and long walks.',
      },
      {
        company: 'Mailchimp',
        product: 'Post-Send Animation',
        description: 'After sending a campaign, Mailchimp shows a sweating hand reaching for a big red button, then a celebratory high-five animation. This moment of humor and delight marks the end of the email creation workflow.',
        effectiveness: 'very-effective',
        analysis: 'The animation creates both a peak (humor and anticipation) and a positive ending (celebration). It became so iconic that it defined Mailchimp\'s brand personality and was widely shared on social media, proving that endings become brand-defining moments.',
      },
      {
        company: 'Apple',
        product: 'Unboxing Experience',
        description: 'Apple designs its product packaging so that unboxing is a carefully choreographed experience — slow reveal, satisfying pull tabs, premium materials. The first interaction with the product is designed to be a peak moment.',
        effectiveness: 'very-effective',
        analysis: 'The unboxing is technically a "beginning," but it serves as the ending of the purchase journey. The peak moment of opening the box colors the entire memory of buying the product, from research to checkout to delivery waiting.',
      },
    ],

    abTests: [
      {
        title: 'Checkout Confirmation: Celebration vs Plain',
        hypothesis:
          'A celebratory checkout success screen will improve satisfaction and return visits',
        controlVersion: {
          description:
            'Plain confirmation page: "Order confirmed. Reference #12345. You will receive an email." with a link to homepage.',
          metrics: {
            conversionRate: 'N/A (post-purchase)',
            timeOnPage: '0:08',
            scrollDepth: '100%',
          },
        },
        treatmentVersion: {
          description:
            'Animated success screen with confetti, personalized "Thank you, Sarah!" message, order summary card, estimated delivery with progress visualization, and suggested next actions.',
          metrics: {
            conversionRate: 'N/A (post-purchase)',
            timeOnPage: '0:34',
            scrollDepth: '100%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Post-purchase satisfaction surveys showed 31% higher ratings for the celebration version. Return visit rate within 30 days was 22% higher. Users in the treatment group were 45% more likely to recommend the store to friends.',
          learnings: [
            'Positive endings directly impact repeat business and word-of-mouth',
            'Users spent 4x longer on the celebration page, engaging with next steps',
            'NPS increased even though the product and delivery were identical',
            'The ending screen became the most-screenshotted part of the experience',
          ],
        },
      },
      {
        title: 'Onboarding: Standard Completion vs Milestone Celebration',
        hypothesis:
          'Celebrating onboarding completion will increase feature adoption in the first week',
        controlVersion: {
          description:
            'Standard onboarding ending: "Setup complete" with a redirect to the dashboard.',
          metrics: {
            conversionRate: '67% completed onboarding',
            clickThroughRate: '23% explored features in first session',
          },
        },
        treatmentVersion: {
          description:
            'Celebration screen: animated progress ring filling to 100%, "You\'re ready!" headline, personalized summary of what was set up, and three suggested first actions with preview thumbnails.',
          metrics: {
            conversionRate: '71% completed onboarding',
            clickThroughRate: '41% explored features in first session',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The celebration ending increased onboarding completion by 6% and nearly doubled first-session feature exploration. 7-day retention was 18% higher in the treatment group.',
          learnings: [
            'Celebrating completion motivates users to continue exploring',
            'The positive ending reframed onboarding from "chore" to "achievement"',
            'Users who saw the celebration were more forgiving of bugs in the first week',
            'Peak-end positivity created a halo effect on overall product perception',
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
        name: 'Celebration Moments',
        description:
          'Animations, confetti, illustrations, or visual celebrations at task completion points',
        howToSpot:
          'Look for animated success states, confetti effects, celebratory illustrations, or special visual treatments at the end of flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Success Screen Design',
        description:
          'Dedicated success or confirmation screens with emotional design at flow endings',
        howToSpot:
          'Check whether completion screens have thoughtful design or are plain text-only confirmations',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Peak Emotional Moments',
        description:
          'Points in the flow where emotional intensity is highest — delight, relief, achievement',
        howToSpot:
          'Map the emotional journey: identify where the strongest positive or negative feelings occur and whether they are intentionally designed',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Ending Experiences',
        description:
          'The final screen or interaction in any user flow (logout, close, checkout, cancel)',
        howToSpot:
          'Navigate to the very last step of each major flow and evaluate whether it leaves a positive, neutral, or negative impression',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Progress and Milestone Indicators',
        description:
          'Visual markers of achievement — progress bars hitting 100%, badges unlocked, streaks maintained',
        howToSpot:
          'Look for progress visualization, achievement badges, streak counters, or level-up indicators at key moments',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Celebration Ending Pattern',
        description: 'Dedicated celebration screens at the completion of important user flows',
        indicators: ['Animated success states', 'Confetti or particle effects', 'Celebratory illustrations or mascots', 'Personalized congratulations messages'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Negative Peak Pattern',
        description: 'Unintentional creation of negative emotional peaks through frustrating interactions',
        indicators: ['Error messages during critical flow steps', 'Unexpected form resets or data loss', 'Slow loading at high-anticipation moments', 'Confusing navigation at decision points'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Flat Ending Pattern',
        description: 'Flows that end with minimal feedback, missing an opportunity for positive endings',
        indicators: ['Plain text confirmations after complex flows', 'Immediate redirects without acknowledgment', 'Generic "success" messages with no personality', 'Missing next-step guidance at flow completion'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Milestone Delight Pattern',
        description: 'Intentional peak moments designed around user achievements and milestones',
        indicators: ['Achievement unlocks with special animations', 'Streak celebrations', 'Level-up or progress milestone screens', 'Personalized accomplishment summaries'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What is the last screen or interaction in each major user flow?',
      'Does the ending of each flow leave a positive, neutral, or negative impression?',
      'Where are the peak emotional moments (positive or negative) in the experience?',
      'Are negative peaks (errors, confusion, frustration) mitigated or recovered from?',
      'Do milestone completions receive celebration proportional to user effort?',
      'Is there a celebration hierarchy (subtle for minor actions, major for milestones)?',
      'Are success animations accessible to users with motion sensitivities?',
      'Does the error recovery flow end positively, or does it leave users on the error?',
      'Are logout, unsubscribe, and cancel flows designed with positive endings?',
      'Have you mapped the emotional journey to identify unintentional negative peaks?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Peak-End Rule.

Analyze the provided design for Peak-End Rule patterns. Identify:

1. **Peak Moments**: The most emotionally intense points in the experience (positive or negative)
2. **Ending Design**: How each user flow concludes and the emotional impression it leaves
3. **Celebration Design**: Whether milestones and completions are appropriately celebrated
4. **Negative Peaks**: Frustration points that may become the dominant memory
5. **Duration Neglect**: Whether the design relies on sustained quality vs strategic peak moments

For each pattern found:
- Identify whether it creates a positive or negative peak/ending
- Assess the emotional intensity and memorability
- Determine if negative peaks are mitigated or recovered from
- Evaluate whether endings match the effort users invested
- Suggest improvements for creating better peaks and endings

Consider:
- Is the most intense moment in the flow intentionally designed?
- Do flow endings leave users with a positive final impression?
- Are celebrations proportional to user effort and achievement?
- Are there accidental negative peaks (errors, confusion) that dominate memory?
- Are celebration moments accessible to all users (motion sensitivity, screen readers)?

Provide actionable recommendations for optimizing peak moments and endings.`,

    outputSchema: {
      type: 'object',
      properties: {
        peakEndPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              emotionalValence: { type: 'string' },
              intensity: { type: 'string' },
              isPeak: { type: 'boolean' },
              isEnding: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'emotionalValence',
              'intensity',
              'isPeak',
              'isEnding',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            peakPositivity: { type: 'number' },
            endingPositivity: { type: 'number' },
            celebrationEffectiveness: { type: 'number' },
            negativePeakMitigation: { type: 'number' },
          },
          required: [
            'peakPositivity',
            'endingPositivity',
            'celebrationEffectiveness',
            'negativePeakMitigation',
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
        'peakEndPatterns',
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
        title: 'Map the Emotional Journey',
        description:
          'Walk through each major user flow and identify where users feel the strongest emotions (positive and negative)',
        example:
          'Checkout flow: Browsing (neutral) -> Adding to cart (mild positive) -> Payment form (stress/negative) -> Confirmation (relief/positive)',
        tips: [
          'Use journey mapping to plot emotional intensity over time',
          'Identify both positive peaks (delight) and negative peaks (frustration)',
          'Pay special attention to the very last interaction in each flow',
        ],
      },
      {
        step: 2,
        title: 'Design Intentional Positive Peaks',
        description:
          'Create deliberate moments of delight, achievement, or emotional intensity at strategic points',
        example:
          'Add a Mailchimp-style high-five animation after sending a campaign, or a Duolingo-style XP burst after lesson completion',
        tips: [
          'Peaks should match the significance of the user action',
          'Use animation, illustration, and personalization for emotional impact',
          'Create a celebration hierarchy: subtle, moderate, and major',
        ],
      },
      {
        step: 3,
        title: 'Mitigate Negative Peaks',
        description:
          'Identify and smooth out frustration points so they do not become the dominant memory',
        example:
          'If a form has a validation error, immediately show helpful guidance and recover gracefully rather than displaying a harsh red error',
        tips: [
          'Prevent errors rather than recovering from them where possible',
          'When errors occur, follow them with clear recovery and positive confirmation',
          'Never let an error be the final interaction in a flow',
        ],
      },
      {
        step: 4,
        title: 'Invest in Endings',
        description:
          'Design the final screen of every flow with as much care as the first screen',
        example:
          'Instead of a plain "Order confirmed" text, create a warm thank-you page with animation, personalization, and clear next steps',
        tips: [
          'Every flow needs a dedicated ending design — not just a redirect',
          'Include what happens next so users leave feeling informed',
          'Consider even negative endings (cancel, unsubscribe) as opportunities for grace',
        ],
      },
      {
        step: 5,
        title: 'Test and Measure',
        description:
          'Validate that your peak and ending designs actually improve how users remember the experience',
        example:
          'Compare post-session satisfaction surveys between celebration and non-celebration versions',
        tips: [
          'Measure satisfaction at session end, not just during the flow',
          'Track return visits and NPS as downstream indicators',
          'Ask users "How was your experience?" after the session, not during it',
        ],
      },
    ],

    dos: [
      'Design endings with as much care as onboarding and first impressions',
      'Create celebration moments proportional to user effort and achievement',
      'Ensure every flow ends on a positive note, even cancellation and error recovery',
      'Use animation and delight strategically at peak moments',
      'Provide clear next steps at every ending to maintain positive momentum',
      'Map emotional journeys to identify and design intentional peaks',
      'Follow negative moments with swift, positive recovery',
      'Personalize celebrations to make peaks more meaningful',
    ],

    donts: [
      'Don\'t let error messages be the final interaction in any flow',
      'Don\'t treat confirmation and success screens as afterthoughts',
      'Don\'t over-celebrate routine tasks — reserve delight for milestones',
      'Don\'t create celebrations that are inaccessible (motion-only, visual-only)',
      'Don\'t ignore negative peaks — unmitigated frustration dominates memory',
      'Don\'t redirect users away immediately after completion without acknowledgment',
      'Don\'t use the same celebration for every action — build a hierarchy',
      'Don\'t forget that logout, close, and cancel are endings too',
    ],

    bestPractices: [
      {
        title: 'Design a Celebration Hierarchy',
        description:
          'Create three tiers of celebration: subtle (micro-interaction), moderate (animation + message), and major (full-screen celebration)',
        rationale:
          'Different achievements deserve different levels of recognition; a flat celebration system creates fatigue',
        example:
          'Subtle: checkmark animation for saving. Moderate: success banner for completing a step. Major: full-screen confetti for finishing onboarding.',
      },
      {
        title: 'End Every Flow with a Summary',
        description:
          'Show users what they accomplished at the end of each flow to reinforce positive feelings',
        rationale:
          'Summaries create a sense of completion and remind users of the value they received',
        example:
          'After a workout app session: "Great job! You burned 340 calories, ran 3.2 miles, and set a new personal record."',
      },
      {
        title: 'Design Graceful Negative Endings',
        description:
          'Even when users cancel, unsubscribe, or leave, design the ending to be respectful and warm',
        rationale:
          'Users who leave on good terms are far more likely to return; a bitter ending burns bridges',
        example:
          'Cancel flow ending: "We\'re sorry to see you go. Your data will be saved for 30 days if you change your mind. Thank you for being with us."',
      },
      {
        title: 'Respect Reduced Motion Preferences',
        description:
          'Create non-animated celebration states that are equally positive for users with motion sensitivities',
        rationale:
          'Celebration animations that trigger vestibular issues create negative peaks for affected users — the opposite of the intent',
        example:
          'If prefers-reduced-motion is set, replace confetti with a colorful static illustration and larger celebratory text.',
      },
      {
        title: 'Follow Errors with Recovery Delight',
        description:
          'When users encounter errors, ensure the recovery path ends with a positive confirmation',
        rationale:
          'An error followed by smooth recovery creates a "rescue" narrative that can actually be remembered positively',
        example:
          'After payment fails and user retries successfully: "Payment successful! You\'re all set. We know that was stressful — thanks for your patience."',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Celebration animations must not flash more than three times per second',
        implementation:
          'Ensure confetti, sparkle, and burst animations stay below the flash threshold. Test with photosensitive epilepsy analysis tools.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.3',
        guideline:
          'Animation from Interactions - Respect prefers-reduced-motion for celebration animations',
        implementation:
          'Use CSS prefers-reduced-motion media query to replace or disable celebration animations. Provide static celebratory alternatives that still feel positive.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Success and celebration states must be announced to assistive technology',
        implementation:
          'Use role="status" or aria-live="polite" to announce success messages. Ensure screen reader users hear celebratory content, not just see animations.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to communicate celebration or success',
        implementation:
          'Combine color with icons, text, and semantic HTML so success states are perceivable by all users regardless of color vision.',
      },
    ],

    ethics: [
      {
        concern: 'Manipulation Through Artificial Peaks',
        severity: 'high',
        explanation:
          'Creating exaggerated celebration moments to mask poor product quality or hide negative aspects of the experience',
        mitigation:
          'Use peak moments to genuinely celebrate user achievement, not to distract from legitimate issues. The underlying experience must be good; celebrations enhance, not replace, quality.',
      },
      {
        concern: 'Dark Pattern Endings',
        severity: 'critical',
        explanation:
          'Designing cancellation or unsubscribe endings to be deliberately frustrating to prevent users from leaving',
        mitigation:
          'Apply the Peak-End Rule positively to ALL endings, including cancellation. Users who leave on good terms may return; users who leave angry never will.',
      },
      {
        concern: 'Celebration as Engagement Manipulation',
        severity: 'medium',
        explanation:
          'Using variable-reward celebration mechanics (random confetti, surprise badges) to create addictive engagement loops',
        mitigation:
          'Celebrations should reward genuine accomplishment, not create dopamine-driven engagement traps. Avoid variable-ratio reward schedules for routine actions.',
      },
      {
        concern: 'Insensitive Celebrations',
        severity: 'high',
        explanation:
          'Showing celebratory animations in sensitive contexts (medical results, financial loss notifications, bereavement-related services)',
        mitigation:
          'Audit celebration triggers for context sensitivity. Use calm, respectful confirmation in sensitive contexts rather than generic celebration patterns.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'When More Pain Is Preferred to Less: Adding a Better End',
        author: 'Kahneman, D., Fredrickson, B. L., Schreiber, C. A., & Redelmeier, D. A.',
        year: 1993,
        doi: '10.1111/j.1467-9280.1993.tb00589.x',
        description:
          'The foundational cold water experiment demonstrating the Peak-End Rule and duration neglect',
        type: 'foundational',
      },
      {
        title: 'Duration Neglect in Retrospective Evaluations of Affective Episodes',
        author: 'Fredrickson, B. L., & Kahneman, D.',
        year: 1993,
        doi: '10.1037/0022-3514.65.1.45',
        description:
          'Key paper establishing duration neglect as a core component of the Peak-End Rule',
        type: 'foundational',
      },
      {
        title: 'Patients\' Memories of Painful Medical Treatments: Real-Time and Retrospective Evaluations of Two Minimally Invasive Procedures',
        author: 'Redelmeier, D. A., & Kahneman, D.',
        year: 1996,
        doi: '10.1016/S0304-3959(96)03205-6',
        description:
          'Clinical validation of the Peak-End Rule in medical procedures, showing that extending a procedure with reduced pain improved memory',
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
          'Comprehensive coverage of the Peak-End Rule and duration neglect by the researcher who discovered them',
        type: 'foundational',
      },
      {
        title: 'The Power of Moments',
        author: 'Heath, Chip & Heath, Dan',
        year: 2017,
        isbn: '9781501147760',
        description:
          'Practical framework for designing peak moments in customer experiences, education, and business',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Peak-End Rule: How Impressions Become Memories',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/peak-end-rule/',
        description:
          'Practical guide to applying the Peak-End Rule in UX design with interface examples',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Daniel Kahneman: The Riddle of Experience vs Memory',
        author: 'TED',
        url: 'https://www.ted.com/talks/daniel_kahneman_the_riddle_of_experience_vs_memory',
        description:
          'Kahneman explains how the Peak-End Rule shapes our memories and decisions, including the cold water experiment',
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
