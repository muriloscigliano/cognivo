/**
 * MOOD CONGRUENT MEMORY
 *
 * We recall memories that match our current mood.
 * Happy users remember happy experiences; frustrated users remember frustrations.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const moodCongruentMemory: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'mood-congruent-memory',
    name: 'Mood Congruent Memory',
    aliases: ['Mood-Dependent Recall', 'Emotional Memory Bias', 'Affect-Congruent Retrieval'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'emotion',
      'mood',
      'feedback',
      'timing',
      'engagement',
      'satisfaction',
      'retention',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We recall memories that match our current mood — happy moods surface happy memories, sad moods surface sad ones.',

    detailed: `Mood Congruent Memory is a cognitive phenomenon in which a person's current emotional state biases which memories they retrieve. When users are in a positive mood, they are more likely to recall positive past experiences with a product; when frustrated or unhappy, they disproportionately recall past frustrations and failures.

This creates a self-reinforcing loop: a user who just completed a task successfully is in a positive state and will recall other positive interactions, inflating their overall satisfaction. Conversely, a user who just hit an error will recall previous errors, making the product feel more unreliable than it statistically is.

In UX design, this bias has profound implications for when and how you solicit feedback, request reviews, time re-engagement campaigns, and handle error recovery. The emotional context of a request fundamentally shapes the response you will receive and the memories users access when forming their answer.`,

    psychologyBasis: {
      discoveredBy: 'Gordon H. Bower',
      year: 1981,
      theory: 'Associative Network Theory of Memory and Emotion',
      mechanism: `Current mood activates emotion nodes in an associative memory network, which spread activation to memories encoded with the same emotional tone. This happens because:

1. **Emotional Encoding**: Memories are stored with emotional metadata — the feeling present during encoding becomes part of the memory trace
2. **Spreading Activation**: Current mood activates an emotion node in memory, which spreads activation to all memories linked to that emotion
3. **Retrieval Matching**: The brain preferentially retrieves memories whose emotional signature matches the current state
4. **Confirmation Loop**: Retrieved mood-congruent memories reinforce the current mood, creating a self-sustaining cycle
5. **Asymmetric Strength**: The effect is stronger for positive moods recalling positive memories than for negative moods recalling negative ones (though both occur)`,
    },

    realWorldExample: `In Bower's 1981 experiments, participants who were hypnotically induced into a happy mood recalled significantly more happy childhood memories, while those induced into a sad mood recalled more sad ones — even though all participants had equivalent life histories. Matt et al. (1992) replicated this in clinical settings, showing that depressed patients recalled disproportionately more negative life events, while recovered patients showed balanced recall.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Mood Congruent Memory affects how users evaluate your product based on their emotional state at the moment of evaluation. Designers can leverage this to:

- Time feedback requests after positive interactions to capture more favorable and accurate reviews
- Avoid asking for evaluations during or immediately after error flows
- Design re-engagement strategies that prime positive emotional states before asking for commitment
- Create emotional state-aware UX that adapts messaging based on interaction context
- Structure support follow-ups to rebuild positive associations after negative experiences`,

    whenToUse: [
      {
        title: 'Review and Rating Prompts',
        scenario:
          'When asking users to rate or review the product',
        example:
          'Prompt for an app store review immediately after a user completes a milestone, achieves a goal, or receives positive results',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feedback Request Timing',
        scenario: 'When collecting NPS scores or satisfaction surveys',
        example:
          'Trigger satisfaction surveys after successful task completions rather than at random intervals or after error recovery',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Re-engagement Campaigns',
        scenario: 'When bringing lapsed users back to the product',
        example:
          'Re-engagement emails that reference past successes ("Remember when you hit your goal last month?") to prime positive recall before asking users to return',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Upsell and Upgrade Prompts',
        scenario: 'When presenting premium features or plan upgrades',
        example:
          'Show upgrade prompts after users experience the value of a feature, not during frustrating limitations',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Post-Error Recovery',
        scenario: 'When rebuilding confidence after a negative experience',
        example:
          'After resolving a support ticket, follow up with a summary of the resolution plus a reminder of recent successful interactions to shift mood before requesting feedback',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'During Error Flows',
        reason:
          'Users in a frustrated state will recall other frustrations, compounding negative sentiment',
        consequence:
          'Feedback collected during errors will be disproportionately negative and may not reflect overall experience',
        alternative:
          'Wait for a successful interaction before requesting feedback; acknowledge the error and resolve it first',
      },
      {
        title: 'Manipulating Critical Feedback',
        reason:
          'Deliberately timing all feedback requests to positive moments suppresses legitimate complaints',
        consequence:
          'You lose visibility into real product problems; users with persistent issues never get heard',
        alternative:
          'Balance timing-optimized feedback with always-available feedback channels and proactive issue detection',
      },
      {
        title: 'High-Stakes Decisions',
        reason:
          'Users in an artificially elevated mood may commit to subscriptions or purchases they later regret',
        consequence:
          'Increased refund rates, chargebacks, and long-term trust erosion',
        alternative:
          'Provide cooling-off periods and clear cancellation paths for significant financial commitments',
      },
      {
        title: 'Support Escalation Contexts',
        reason:
          'Attempting to shift mood during active complaints can feel dismissive or tone-deaf',
        consequence:
          'Users feel their concerns are being minimized, increasing frustration',
        alternative:
          'Fully resolve the issue first, then use mood-congruent strategies in follow-up communications',
      },
    ],

    commonMistakes: [
      {
        title: 'Random Feedback Timing',
        description:
          'Requesting reviews or ratings at arbitrary moments without considering user emotional state',
        why: 'A user who just encountered a bug will recall other bugs; their review reflects accumulated frustration, not overall experience',
        fix: 'Map your user journey to identify emotional peaks (task completion, achievements) and trigger feedback requests at those moments',
      },
      {
        title: 'Asking During Onboarding Friction',
        description:
          'Prompting for ratings during complex setup or configuration steps',
        why: 'New users facing difficulty are in a negative emotional state and will evaluate the product through that lens',
        fix: 'Delay review prompts until after the user has experienced core value — the "aha moment"',
      },
      {
        title: 'Ignoring Emotional Context in Re-engagement',
        description:
          'Sending generic "We miss you" messages without priming positive recall',
        why: 'Lapsed users may have left due to frustration; a generic message does nothing to shift their recall toward positive experiences',
        fix: 'Reference specific past successes, completed projects, or achieved goals in re-engagement messaging',
      },
      {
        title: 'Suppressing All Negative Feedback',
        description:
          'Only collecting feedback during positive moments, creating a blind spot for real issues',
        why: 'While timing matters, exclusively positive-moment feedback creates an echo chamber that hides product problems',
        fix: 'Maintain always-available feedback channels and conduct periodic unbiased research alongside optimized timing',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines the emotional journey through a page, influencing what mood users are in when they reach key actions',
        examples: [
          'Placing review prompts after success confirmations rather than after error messages',
          'Positioning achievement celebrations before upsell sections',
          'Structuring flows so positive milestones precede feedback requests',
          'Separating error recovery from evaluation touchpoints',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text tone and language can reinforce or shift emotional state',
        examples: [
          'Warm, encouraging language after task completion primes positive recall',
          'Celebratory headlines at achievement moments reinforce positive mood',
          'Empathetic, solution-focused language during errors prevents mood spiral',
          'Reminder text referencing past successes primes positive memory retrieval',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces emotional tone and can support mood-congruent design',
        examples: [
          'Green success states prime positive emotional context for adjacent actions',
          'Warm, inviting tones at feedback prompt moments support positive mood',
          'Neutral, calming tones during error recovery prevent mood escalation',
          'Celebration colors (gold, bright green) at achievement moments reinforce positive state',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction timing is the primary lever — when you ask matters more than how',
        examples: [
          'Triggering review prompts after successful task completion, not after errors',
          'Delaying satisfaction surveys until after positive interaction sequences',
          'Timing upgrade prompts to follow feature discovery moments',
          'Scheduling re-engagement outreach to reference known positive experiences',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing can prime specific emotional recall, shifting the memories users access',
        examples: [
          'Referencing past successes in re-engagement emails primes positive recall',
          'Achievement summaries before feedback requests shift retrieval toward positive memories',
          'Post-resolution follow-ups that acknowledge the fix and highlight reliability rebuild positive associations',
          'Personalized success metrics ("You completed 47 tasks this month!") prime accomplishment recall',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Emotional tone must be conveyed through multiple channels, not just visual cues',
        examples: [
          'Screen reader announcements should convey celebratory tone at achievement moments',
          'Success states need non-visual indicators (sound, haptic) to prime positive mood',
          'Error recovery messaging should be empathetic regardless of modality',
          'ARIA live regions should communicate positive milestones to support mood-congruent timing',
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
        title: 'Post-Achievement Review Prompt',
        description:
          'Fitness app prompting for a review immediately after user completes a personal record',
        code: `<div class="achievement-screen">
  <div class="celebration">
    <h2>New Personal Record!</h2>
    <p class="record-detail">You ran 5K in 24:32 — 1:15 faster than your previous best!</p>
    <div class="confetti" aria-hidden="true"></div>
  </div>

  <div class="streak-summary">
    <p>You've completed <strong>23 workouts</strong> this month</p>
    <p>That's your most active month ever!</p>
  </div>

  <div class="review-prompt" role="complementary">
    <p>Loving your progress? Share your experience!</p>
    <button class="primary">Rate Us on the App Store</button>
    <button class="text-link">Maybe Later</button>
  </div>
</div>`,
        explanation:
          'The review prompt appears at the peak of a positive emotional moment — after a personal record. The user is happy, proud, and likely to recall other positive training experiences when forming their review.',
        principle:
          'Positive mood at the moment of evaluation surfaces positive memories, producing more favorable and comprehensive reviews',
        metrics: {
          before: '2.1% review prompt acceptance rate (random timing)',
          after: '8.7% review prompt acceptance rate (post-achievement timing)',
          improvement: '314% increase in review submissions, average rating increased from 3.8 to 4.6',
        },
      },
      {
        title: 'Success-Primed Feedback Survey',
        description:
          'SaaS tool showing a task completion summary before requesting NPS feedback',
        code: `<div class="task-complete">
  <div class="success-banner">
    <span class="icon" aria-hidden="true">&#10003;</span>
    <h3>Report Generated Successfully</h3>
    <p>Your Q4 Revenue Analysis is ready — 47 data sources processed in 12 seconds.</p>
  </div>

  <div class="recent-wins">
    <h4>Your recent activity</h4>
    <ul>
      <li>12 reports generated this week</li>
      <li>3 dashboards shared with your team</li>
      <li>Saved approximately 6 hours vs manual analysis</li>
    </ul>
  </div>

  <div class="nps-prompt">
    <p>Quick question: How likely are you to recommend us to a colleague?</p>
    <div class="nps-scale" role="radiogroup" aria-label="Likelihood to recommend, 0 to 10">
      <button role="radio" aria-checked="false">0</button>
      <!-- ... -->
      <button role="radio" aria-checked="false">10</button>
    </div>
  </div>
</div>`,
        explanation:
          'The "recent wins" summary primes positive memory retrieval before the NPS question. Users in a positive state recall other positive interactions, producing scores that reflect their best experiences.',
        principle:
          'Summarizing recent successes shifts memory retrieval toward positive experiences before evaluation',
      },
      {
        title: 'Post-Resolution Follow-Up',
        description:
          'Support system following up after resolving an issue, rebuilding positive associations before requesting feedback',
        code: `<div class="followup-email">
  <h3>Your issue has been resolved</h3>
  <p>We fixed the export problem you reported on Tuesday.
     Your data is now exporting correctly.</p>

  <div class="resolution-summary">
    <h4>What we did</h4>
    <p>Our team identified a formatting edge case with large datasets
       and deployed a fix within 4 hours of your report.</p>
  </div>

  <div class="positive-context">
    <h4>Your account at a glance</h4>
    <ul>
      <li>247 successful exports this quarter</li>
      <li>99.6% uptime for your workspace</li>
      <li>Your team has saved 120+ hours using automated reports</li>
    </ul>
  </div>

  <div class="feedback-request">
    <p>How was your support experience?</p>
    <a href="/feedback" class="button">Share Feedback</a>
  </div>
</div>`,
        explanation:
          'After resolving a negative experience, the follow-up first confirms the fix, then provides positive account context before requesting feedback. This shifts the user from frustration recall to balanced or positive recall.',
        principle:
          'Rebuilding positive emotional context after error resolution shifts mood-congruent retrieval before feedback collection',
      },
    ],

    bad: [
      {
        title: 'Review Prompt During Error Flow',
        description:
          'App requesting a review immediately after an error or crash',
        code: `<!-- DON'T DO THIS -->
<div class="error-screen">
  <h2>Something went wrong</h2>
  <p>We couldn't save your document. Please try again.</p>
  <button class="retry">Try Again</button>

  <div class="review-prompt">
    <p>Enjoying our app? Leave us a review!</p>
    <button>Rate on App Store</button>
  </div>
</div>`,
        explanation:
          'Requesting a review during an error state guarantees negative recall. The user is frustrated, and their current mood will cause them to recall every past frustration, bug, and inconvenience — producing a disproportionately negative review.',
        principle:
          'Never request evaluations when users are in a negative emotional state — mood-congruent recall will amplify negativity',
      },
      {
        title: 'Upsell During Frustration',
        description:
          'Showing a premium upgrade prompt when user hits a limitation or error',
        code: `<!-- DON'T DO THIS -->
<div class="limit-reached">
  <h3>Storage Limit Reached</h3>
  <p>You've used all 5GB of your free storage.
     Your upload has been rejected.</p>

  <div class="upsell">
    <h4>Upgrade to Pro for unlimited storage!</h4>
    <p>Only $19.99/month</p>
    <button class="primary">Upgrade Now</button>
  </div>
</div>`,
        explanation:
          'The user just had their upload rejected — they are frustrated. Asking them to pay money at this moment associates the product with frustration and limitation. Their mood-congruent recall will surface every past limitation, making the upgrade feel like a ransom rather than added value.',
        principle:
          'Paywalls during frustration create negative associations with the premium tier, reducing long-term upgrade conversion',
      },
      {
        title: 'Ignoring Emotional Context in Surveys',
        description:
          'Sending satisfaction surveys at fixed intervals regardless of recent user experience',
        code: `<!-- DON'T DO THIS -->
<div class="survey-popup">
  <h3>Monthly Satisfaction Survey</h3>
  <p>It's been 30 days since your last survey.
     How satisfied are you with our product?</p>
  <div class="rating-scale">
    <button>Very Unsatisfied</button>
    <button>Unsatisfied</button>
    <button>Neutral</button>
    <button>Satisfied</button>
    <button>Very Satisfied</button>
  </div>
</div>`,
        explanation:
          'A time-based survey ignores the user\'s emotional context entirely. If this pops up during a difficult task or after an error, the response will be skewed negative. If it interrupts a flow, it creates frustration that contaminates the response.',
        principle:
          'Fixed-interval surveys without emotional context awareness produce unreliable data contaminated by whatever mood the user happens to be in',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'App Store Review Prompt API',
        description: 'Apple\'s SKStoreReviewController guidelines recommend prompting for reviews after positive in-app events. Apple limits review prompts to 3 per year and encourages developers to trigger them after successful task completions, leveraging mood-congruent memory for higher ratings.',
        effectiveness: 'very-effective',
        analysis: 'Apps using event-triggered review prompts (post-purchase, post-achievement) consistently achieve 0.5-1.0 star higher average ratings compared to random-timing prompts. Apple\'s own guidelines embed mood-congruent memory principles.',
      },
      {
        company: 'Uber',
        product: 'Post-Ride Rating',
        description: 'Uber asks for driver ratings immediately after ride completion, when the most recent interaction (arrival at destination) is fresh. For smooth rides, this captures positive mood. Uber also delays prompts after reported issues until resolution.',
        effectiveness: 'effective',
        analysis: 'Immediate post-ride rating captures the emotional state of arrival. For most rides (smooth), this produces positive ratings. The design also separates rating from tipping, so mood-congruent recall affects each independently.',
      },
      {
        company: 'Headspace',
        product: 'Post-Meditation Check-In',
        description: 'Headspace asks "How are you feeling?" after meditation sessions — a moment when users are typically calm and positive. The app then uses this positive state to encourage streak continuation, session booking, and subscription upgrades.',
        effectiveness: 'very-effective',
        analysis: 'By anchoring engagement prompts to post-meditation calm (a reliably positive emotional state), Headspace maximizes the likelihood of positive recall about the product and future commitment.',
      },
      {
        company: 'Airbnb',
        product: 'Post-Trip Review Timing',
        description: 'Airbnb sends review requests shortly after checkout, when the overall trip experience is fresh and typically positive (vacation afterglow). They also prompt hosts after receiving a positive guest review, leveraging the host\'s elevated mood.',
        effectiveness: 'effective',
        analysis: 'The "vacation afterglow" effect means guests are in a positive mood at review time, recalling highlights over minor inconveniences. This produces the consistently high review averages that Airbnb\'s marketplace depends on.',
      },
    ],

    abTests: [
      {
        title: 'Review Prompt Timing: Post-Success vs Random',
        hypothesis:
          'Prompting for reviews after successful task completion will produce higher ratings and acceptance rates than random timing',
        controlVersion: {
          description:
            'App store review prompt triggered at random intervals (every 10th app open)',
          metrics: {
            conversionRate: '2.1%',
            averageRating: '3.8',
          },
        },
        treatmentVersion: {
          description:
            'App store review prompt triggered after completing a workout, achieving a personal record, or reaching a streak milestone',
          metrics: {
            conversionRate: '8.7%',
            averageRating: '4.6',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Post-success prompts increased review acceptance by 314% and average rating by 0.8 stars. Users in a positive mood were more willing to take the extra step of leaving a review and recalled more positive product experiences when writing.',
          learnings: [
            'Emotional state at the moment of request dramatically affects both willingness and content of reviews',
            'Post-achievement prompts feel natural and non-intrusive — users perceive them as celebration, not interruption',
            'The quality (length, detail) of reviews also improved — positive mood led to more expansive recall',
            'Effect was strongest for users with 2+ weeks of usage, suggesting a bank of positive memories is needed',
          ],
        },
      },
      {
        title: 'NPS Survey: Context-Primed vs Cold',
        hypothesis:
          'Showing users a summary of their recent successes before an NPS question will increase scores',
        controlVersion: {
          description:
            'Standard NPS question presented without context: "How likely are you to recommend us?"',
          metrics: {
            responseRate: '12%',
            npsScore: '34',
          },
        },
        treatmentVersion: {
          description:
            'NPS question preceded by personalized success summary: tasks completed, time saved, goals achieved this month',
          metrics: {
            responseRate: '19%',
            npsScore: '52',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Priming users with their own success metrics shifted mood-congruent retrieval toward positive experiences. NPS increased by 18 points and response rate increased by 58%, suggesting the summary also increased engagement with the survey itself.',
          learnings: [
            'Personalized success summaries are more effective than generic positive messaging',
            'Users who saw their own metrics gave longer, more detailed responses',
            'The priming effect was strongest for power users who had more positive experiences to recall',
            'Caution: this technique should supplement, not replace, unbiased feedback channels',
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
        name: 'Post-Success Feedback Prompts',
        description: 'Review or rating requests positioned immediately after success confirmations or achievement celebrations',
        howToSpot: 'Look for review prompts, NPS surveys, or rating requests that appear directly after success screens, completion messages, or achievement notifications',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Emotional Priming Content',
        description: 'Success summaries, achievement recaps, or positive statistics shown before evaluation requests',
        howToSpot: 'Look for personalized stats, "your recent wins," or accomplishment summaries placed immediately before feedback forms or rating requests',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Error-Adjacent Requests',
        description: 'Feedback or upgrade prompts positioned within error flows or limitation messages',
        howToSpot: 'Check if any evaluation requests, upsells, or review prompts appear on error pages, limit-reached screens, or after failed operations',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Celebration-Gated Actions',
        description: 'Important asks (upgrades, referrals, reviews) gated behind celebration moments',
        howToSpot: 'Look for patterns where the product celebrates something and immediately follows with a request — the celebration may be priming mood-congruent recall',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Achievement-Triggered Prompt Pattern',
        description: 'Review or feedback requests triggered by positive in-app events rather than time-based intervals',
        indicators: [
          'Review prompts after task completion or goal achievement',
          'Rating requests following positive outcomes (purchase success, milestone)',
          'Feedback forms shown after "congratulations" or celebration screens',
          'NPS surveys triggered by usage milestones',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Positive Recall Priming Pattern',
        description: 'Showing users summaries of past successes immediately before asking for evaluation or commitment',
        indicators: [
          'Personalized success metrics before NPS surveys',
          '"Your recent activity" summaries before renewal prompts',
          'Achievement recaps before upgrade offers',
          'Past project summaries in re-engagement emails',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Emotional State-Aware Routing Pattern',
        description: 'Different UX paths based on inferred user emotional state (success path vs error path)',
        indicators: [
          'Feedback requests absent from error flows but present in success flows',
          'Different follow-up sequences for resolved vs unresolved support tickets',
          'Upsell prompts only appearing after positive interactions',
          'Re-engagement content personalized to past positive experiences',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'When are users asked for reviews or ratings — after positive events or at random?',
      'Are feedback requests ever shown during or immediately after error states?',
      'Is there content that primes positive recall before evaluation requests?',
      'Do re-engagement messages reference past positive experiences specifically?',
      'Are upsell prompts timed to follow value-delivery moments or frustration moments?',
      'Is there a separate, always-available feedback channel for negative experiences?',
      'Are survey timing strategies suppressing legitimate negative feedback?',
      'Does the post-error recovery flow rebuild positive associations before requesting evaluation?',
      'Are celebration moments being used authentically or primarily as mood manipulation?',
      'Has the feedback timing strategy been validated against unbiased research methods?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in mood congruent memory.

Analyze the provided design for mood congruent memory patterns. Identify:

1. **Feedback Timing**: When users are asked for reviews, ratings, or evaluations relative to their emotional state
2. **Emotional Priming**: Content that shifts user mood before important requests
3. **Error-Adjacent Requests**: Asks that occur during or after negative emotional states
4. **Re-engagement Strategy**: How past positive experiences are referenced to prime recall
5. **Mood-Aware Routing**: Whether the UX adapts based on inferred emotional context

For each pattern found:
- Identify the emotional state the user is likely in at that moment
- Assess whether the timing leverages or conflicts with mood-congruent recall
- Determine if the pattern is ethical (informing vs manipulating)
- Suggest timing and context improvements
- Evaluate whether negative feedback channels remain accessible

Consider:
- Is the design timing feedback requests to positive moments exclusively?
- Are error flows free of evaluation requests and upsell prompts?
- Does re-engagement messaging prime positive recall specifically?
- Are there always-available feedback channels for legitimate complaints?
- Is the mood-congruent strategy producing accurate or skewed feedback data?

Provide actionable recommendations for ethical, effective timing of user interactions.`,

    outputSchema: {
      type: 'object',
      properties: {
        moodCongruentPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              inferredMood: { type: 'string' },
              timingAssessment: { type: 'string' },
              moodCongruenceEffect: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'inferredMood',
              'timingAssessment',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            feedbackTimingScore: { type: 'number' },
            emotionalAwareness: { type: 'number' },
            negativeFeedbackAccess: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'feedbackTimingScore',
            'emotionalAwareness',
            'negativeFeedbackAccess',
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
        'moodCongruentPatterns',
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
        title: 'Map Emotional Peaks in the User Journey',
        description:
          'Identify the moments where users are most likely in a positive emotional state — task completions, achievements, milestones, successful outcomes',
        example:
          'Fitness app: post-workout completion, new personal record, streak milestone. SaaS: report generated, project completed, team invited successfully.',
        tips: [
          'Use analytics to find moments with highest engagement and lowest churn',
          'Interview users about their most satisfying moments with the product',
          'Map the emotional journey from onboarding through power-user stages',
        ],
      },
      {
        step: 2,
        title: 'Align Feedback Requests to Positive Peaks',
        description:
          'Move review prompts, NPS surveys, and satisfaction checks to follow positive emotional moments',
        example:
          'Trigger app store review prompt after user achieves their third workout streak, not after their 10th app open',
        tips: [
          'Use event-based triggers, not time-based intervals',
          'Limit prompt frequency (Apple recommends max 3 per year)',
          'Make prompts feel like a natural extension of the celebration',
        ],
      },
      {
        step: 3,
        title: 'Remove Requests from Error Flows',
        description:
          'Audit all error, limitation, and failure flows to ensure no evaluation requests, upsells, or review prompts appear',
        example:
          'Remove upgrade upsell from "storage limit reached" error; instead, show it after the user successfully uploads a file later',
        tips: [
          'Create a separate "error path" UX that focuses purely on resolution',
          'Delay any asks until the user has recovered and completed a positive action',
          'Use error moments for empathy, not extraction',
        ],
      },
      {
        step: 4,
        title: 'Prime Positive Recall Before Asks',
        description:
          'Show personalized success metrics or recent accomplishments before requesting feedback or commitment',
        example:
          'Before NPS survey: "This month, you completed 34 tasks and saved an estimated 12 hours"',
        tips: [
          'Use real, personalized data — generic praise is less effective',
          'Keep the summary brief and factual, not manipulative',
          'Ensure the data is accurate — wrong numbers destroy trust',
        ],
      },
      {
        step: 5,
        title: 'Maintain Unbiased Feedback Channels',
        description:
          'Ensure users can always submit negative feedback regardless of timing optimization',
        example:
          'Persistent "Help & Feedback" menu item available from any screen, plus post-support-resolution surveys',
        tips: [
          'Always-available feedback should be easy to find, not hidden',
          'Periodically run unbiased random-sample surveys for calibration',
          'Compare optimized feedback data against unbiased channels to detect skew',
        ],
      },
    ],

    dos: [
      'Time review and rating prompts to follow positive interactions and achievements',
      'Show personalized success summaries before asking for evaluations',
      'Reference specific past successes in re-engagement campaigns',
      'Wait for error resolution and a subsequent positive interaction before requesting feedback',
      'Design celebration moments that feel authentic, not manufactured for extraction',
      'Maintain always-accessible feedback channels for complaints and issues',
      'Validate timing-optimized feedback against unbiased research methods',
      'Use post-resolution follow-ups to rebuild positive associations',
    ],

    donts: [
      'Don\'t request reviews or ratings during or immediately after errors',
      'Don\'t show upsell prompts when users hit limitations or experience failures',
      'Don\'t send satisfaction surveys at fixed intervals without emotional context',
      'Don\'t suppress negative feedback by only collecting at positive moments',
      'Don\'t manufacture fake celebrations just to prime mood for an ask',
      'Don\'t ignore the emotional state of users in re-engagement campaigns',
      'Don\'t use mood manipulation for high-stakes financial commitments',
      'Don\'t assume all users are in the same emotional state at the same journey point',
    ],

    bestPractices: [
      {
        title: 'Event-Triggered Feedback Over Time-Triggered',
        description:
          'Replace time-based feedback intervals with event-based triggers tied to positive user outcomes',
        rationale:
          'Event-based timing aligns feedback requests with predictably positive emotional states, producing higher response rates and more representative data',
        example:
          'Replace "survey every 30 days" with "survey after 5th successful report generation"',
      },
      {
        title: 'Celebrate Then Ask',
        description:
          'Always deliver the celebration or success confirmation fully before making any request',
        rationale:
          'Rushing to the ask before the positive moment is felt reduces both mood-congruent benefit and user trust',
        example:
          'Show achievement animation and stats for 2-3 seconds before revealing the review prompt below',
      },
      {
        title: 'Post-Resolution Mood Rebuilding',
        description:
          'After resolving negative experiences, explicitly rebuild positive context before requesting evaluation',
        rationale:
          'Users who just had an issue resolved are in a mixed emotional state; positive context tips recall toward resolution satisfaction',
        example:
          'Support follow-up: confirm fix, show account health metrics, then ask "How was your support experience?"',
      },
      {
        title: 'Calibrate with Unbiased Data',
        description:
          'Regularly compare timing-optimized feedback against random-sample or unbiased feedback to detect and correct skew',
        rationale:
          'Exclusive positive-moment feedback creates blind spots; calibration ensures you see real product issues',
        example:
          'Run quarterly unbiased random surveys and compare NPS against event-triggered NPS to measure gap',
      },
      {
        title: 'Segment by Emotional Journey',
        description:
          'Different user segments have different emotional peaks — map and target separately',
        rationale:
          'Power users, new users, and churning users have different emotional journeys and need different timing strategies',
        example:
          'New users: prompt after first "aha moment." Power users: prompt after milestone achievement. Re-engaged users: prompt after first successful return session.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure emotional context is conveyed semantically, not just visually',
        implementation:
          'Use ARIA live regions to announce achievements and celebrations so screen reader users experience the same emotional priming before feedback requests',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Ensure celebration moments and subsequent prompts are not time-limited',
        implementation:
          'Allow users to dismiss and return to feedback prompts; don\'t auto-dismiss celebration screens before users can process them',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.1',
        guideline:
          'On Focus - Feedback prompts should not appear unexpectedly on focus',
        implementation:
          'Feedback prompts triggered by achievements should be visually and semantically connected to the success event, not appearing as unrelated pop-ups',
      },
    ],

    ethics: [
      {
        concern: 'Feedback Suppression',
        severity: 'critical',
        explanation:
          'Only collecting feedback during positive moments systematically suppresses legitimate complaints and product issues',
        mitigation:
          'Maintain always-available negative feedback channels. Run periodic unbiased surveys. Compare optimized feedback against unbiased baselines.',
      },
      {
        concern: 'Manufactured Celebration',
        severity: 'high',
        explanation:
          'Creating fake or inflated achievements solely to manufacture a positive mood before an ask',
        mitigation:
          'Celebrations should be genuine and proportional to actual accomplishments. Users detect inauthenticity.',
      },
      {
        concern: 'Mood Manipulation for Purchases',
        severity: 'high',
        explanation:
          'Using mood-congruent priming to push users toward financial commitments they might not make in a neutral state',
        mitigation:
          'Provide cooling-off periods for significant purchases. Ensure cancellation is easy. Don\'t gate pricing information behind emotional priming.',
      },
      {
        concern: 'Vulnerable Emotional States',
        severity: 'critical',
        explanation:
          'Exploiting user emotional states in health, wellness, or mental health apps where mood is particularly sensitive',
        mitigation:
          'In health-related contexts, prioritize user wellbeing over engagement metrics. Never use emotional states as conversion levers for vulnerable populations.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Mood and Memory',
        author: 'Bower, G. H.',
        year: 1981,
        doi: '10.1037/0003-066X.36.2.129',
        description:
          'The foundational paper establishing mood congruent memory through the associative network theory of emotion and memory',
        type: 'foundational',
      },
      {
        title: 'Mood-Congruent Recall of Affectively Toned Stimuli: A Meta-Analytic Review',
        author: 'Matt, G. E., Vazquez, C., & Campbell, W. K.',
        year: 1992,
        doi: '10.1016/0272-7358(92)90116-P',
        description:
          'Comprehensive meta-analysis confirming mood congruent memory effects across clinical and non-clinical populations',
        type: 'foundational',
      },
      {
        title: 'Affect and Cognition: The Hard Interface',
        author: 'Bower, G. H., & Forgas, J. P.',
        year: 2001,
        description:
          'Updated model of how affect influences memory encoding, retrieval, and judgment, with implications for decision-making',
        type: 'advanced',
      },
      {
        title: 'Feelings as Information: Informational and Motivational Functions of Affective States',
        author: 'Schwarz, N., & Clore, G. L.',
        year: 1988,
        description:
          'Complementary theory showing how current mood is used as information for judgments and evaluations',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Memory and Emotion: The Making of Lasting Memories',
        author: 'McGaugh, James L.',
        year: 2003,
        isbn: '9780231120227',
        description:
          'Comprehensive exploration of how emotion modulates memory formation and retrieval',
        type: 'foundational',
      },
      {
        title: 'Affect in Social Thinking and Behavior',
        author: 'Forgas, Joseph P.',
        year: 2006,
        isbn: '9781841694542',
        description:
          'Detailed coverage of mood-congruent effects in social judgment and behavior, with design implications',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Timing Matters: The Psychology of When to Ask for Reviews',
        author: 'UX Collective',
        url: 'https://uxdesign.cc/timing-matters-review-prompts',
        description:
          'Practical guide to timing feedback requests based on emotional state research',
        type: 'practical',
      },
    ],

    videos: [],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'peak-end-rule',       // Peak emotional moments and endings shape overall memory evaluation
      'recency-effect',      // Recent positive events are more accessible and mood-congruent
      'halo-effect',         // Positive mood creates halo that extends to overall product perception
      'emotional-contagion', // Positive UI tone can shift user mood toward congruent positive recall
    ],

    conflicts: [
      'negativity-bias',     // Negativity bias can override mood-congruent positive recall
      'availability-heuristic', // Available negative memories may resist mood-congruent filtering
    ],

    confusedWith: [
      'mood-dependent-memory',   // Mood-dependent = same mood aids retrieval; mood-congruent = matching valence aids retrieval
      'state-dependent-learning', // State-dependent is broader (physical state); mood-congruent is specifically emotional valence
      'affect-heuristic',         // Affect heuristic is using current mood as information; mood-congruent is about memory retrieval
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'positivity-offset',
        'rosy-retrospection',
      ],
    },
  },
};
