/**
 * DURATION NEGLECT
 *
 * How long an experience lasts has surprisingly little impact
 * on how it's remembered -- peak intensity and ending matter more.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const durationNeglect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'duration-neglect',
    name: 'Duration Neglect',
    aliases: ['Duration Insensitivity', 'Peak-End Rule Corollary'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'memory',
      'experience',
      'perception',
      'time',
      'peak-end',
      'onboarding',
      'wait-time',
      'micro-interactions',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People judge experiences by their peak intensity and ending, largely ignoring how long they lasted.',

    detailed: `Duration neglect is a cognitive bias in which the total duration of an experience has little to no effect on how that experience is retrospectively evaluated. Instead, people judge experiences primarily by their peak moment (the most intense point) and how they end -- a pattern known as the peak-end rule.

This means a short, powerful experience can be remembered more favorably than a longer, mildly pleasant one. Conversely, a brief painful moment followed by a gentle resolution is remembered more positively than a prolonged moderate discomfort that simply stops.

In UX and product design, duration neglect has profound implications for loading states, onboarding flows, wait times, checkout processes, and overall experience design. Designers who understand this bias can compress experiences without loss of perceived quality, invest disproportionately in endings and peak moments, and transform unavoidable waits into memorable micro-moments.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman, Barbara Fredrickson, and colleagues',
      year: 1993,
      theory: 'Peak-End Rule and Experienced Utility',
      mechanism: `The brain evaluates past experiences using a "snapshot model" rather than integrating the full temporal record. This happens because:

1. **Peak Encoding**: The most emotionally intense moment is encoded most strongly in memory, becoming a proxy for the whole experience
2. **Recency of Ending**: The final moments receive disproportionate weight because they are freshest in memory and signal the experience's resolution
3. **Temporal Compression**: Retrospective memory compresses long durations into highlights, discarding "filler" time
4. **Affective Forecasting Errors**: People predict future experiences based on remembered peaks, not actual duration
5. **Cognitive Economy**: Summarizing by peak and end is computationally cheaper than integrating every moment, so the brain defaults to this heuristic`,
    },

    realWorldExample: `In Kahneman's classic cold-water experiment, participants immersed one hand in 14°C water for 60 seconds (short trial) and the other hand for 60 seconds at 14°C followed by 30 additional seconds where the water was gradually warmed to 15°C (long trial -- objectively more total pain). When asked which trial they'd repeat, the majority chose the longer trial because it ended on a slightly better note. They neglected the extra 30 seconds of discomfort because the ending was less painful.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Duration neglect fundamentally changes how designers should allocate effort across user journeys. Instead of making every second equally polished, invest heavily in:

- Peak moments that deliver delight, surprise, or a sense of accomplishment
- Endings that leave users with a positive final impression
- Compressing tedious stretches rather than eliminating them entirely
- Transforming unavoidable waits into engaging micro-interactions
- Creating short, impactful experiences rather than long, mediocre ones`,

    whenToUse: [
      {
        title: 'Onboarding Flows',
        scenario:
          'When designing first-run experiences for new users',
        example:
          'Create a short, high-impact onboarding (3 steps with a "wow" moment) rather than a thorough 12-step tutorial. End with a celebratory success screen.',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Loading and Wait States',
        scenario:
          'When users must wait for data, processes, or transitions',
        example:
          'Add a delightful animation or progress narrative during a 5-second load, then reveal content with a satisfying transition. Users remember the delight, not the wait.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Checkout and Completion Flows',
        scenario:
          'When users finish a purchase, signup, or multi-step process',
        example:
          'End checkout with a confetti animation, personalized thank-you, or surprise discount for next purchase. The ending defines how users remember the entire flow.',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Error Recovery',
        scenario:
          'When users encounter and must recover from errors',
        example:
          'After a frustrating error, guide the user to resolution and end with a positive confirmation: "All fixed! Your work is saved." The recovery ending overrides the error memory.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Tutorials',
        scenario:
          'When teaching complex features through guided walkthroughs',
        example:
          'Compress the tutorial to show the most impressive capability first (peak), skip the mundane, and end with the user creating something real.',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Support Interactions',
        scenario:
          'When users engage with help, chat support, or documentation',
        example:
          'Resolve the issue and then add a small extra: "I also noticed X and fixed it for you." Ending above expectations transforms the memory of the entire interaction.',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Safety-Critical Processes',
        reason:
          'Compressing safety steps to create a shorter experience could skip essential checks',
        consequence:
          'Users may miss critical warnings or confirmations, leading to data loss or harm',
        alternative:
          'Maintain all safety steps but design each one with clear purpose and a positive completion state',
      },
      {
        title: 'Complex Decision-Making',
        reason:
          'Rushing users through important decisions to compress duration can lead to regret',
        consequence:
          'Users make uninformed choices and blame the product when outcomes are poor',
        alternative:
          'Allow natural decision time but add peak moments of clarity (comparisons, summaries) and end with confident confirmation',
      },
      {
        title: 'Legal or Compliance Flows',
        reason:
          'Minimizing time on terms, disclosures, or consent forms creates legal risk',
        consequence:
          'Uninformed consent, regulatory violations, and user distrust',
        alternative:
          'Present required information fully but use progressive disclosure and end with a clear summary of what was agreed',
      },
      {
        title: 'Learning and Skill Building',
        reason:
          'Some learning genuinely requires sustained engagement; compressing it destroys retention',
        consequence:
          'Users feel they learned something but cannot actually perform the skill',
        alternative:
          'Structure learning around spaced repetition with peak moments of mastery and celebration at each milestone',
      },
    ],

    commonMistakes: [
      {
        title: 'Polishing the Middle Instead of the Peaks',
        description:
          'Spending design effort making every step equally good rather than creating standout moments',
        why: 'Users will not remember the consistently-okay middle; they remember peaks and endings',
        fix: 'Audit your flow for peak moments. If there are none, you have a forgettable experience. Create at least one "wow" and invest heavily in the final screen.',
      },
      {
        title: 'Abrupt Endings',
        description:
          'Ending flows with generic confirmation text or immediately redirecting away',
        why: 'The ending carries disproportionate weight in memory. A flat ending makes the whole experience feel flat.',
        fix: 'Design endings deliberately: celebration, summary of achievement, or a forward-looking prompt. Give the ending 2-3 seconds of dedicated attention.',
      },
      {
        title: 'Eliminating All Wait Time',
        description:
          'Obsessing over reducing every millisecond of load time instead of making waits feel good',
        why: 'Some waits are unavoidable. A well-designed 3-second wait can feel better than an instant but jarring transition.',
        fix: 'For waits under 1 second, optimize speed. For longer waits, invest in skeleton screens, progress narratives, or engaging animations.',
      },
      {
        title: 'Long Onboarding Without Peaks',
        description:
          'Creating comprehensive onboarding that covers everything but has no memorable moments',
        why: 'Duration is ignored; only peak and end matter. A 10-minute onboarding with no peak is worse than a 2-minute one with a "wow."',
        fix: 'Cut onboarding to essentials. Front-load the most impressive feature. End with the user achieving something real.',
      },
      {
        title: 'Ignoring Negative Peaks',
        description:
          'Allowing frustrating moments (confusing forms, unexpected errors) to become the peak memory',
        why: 'Negative peaks are remembered just as strongly as positive ones and define the entire experience retrospectively',
        fix: 'Identify and smooth out the worst moments in your flow. If a negative peak is unavoidable, follow it immediately with resolution and a positive recovery.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines the rhythm and pacing of user journeys, affecting where peaks and endings occur',
        examples: [
          'Multi-step wizards can place the most impressive result at the final step',
          'Card-based layouts can build to a climactic reveal',
          'Hero sections can deliver the peak moment immediately on page load',
          'Scroll-based narratives can structure peaks in the middle and satisfying endings at the bottom',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography creates emphasis on peak moments and signals when an experience is concluding',
        examples: [
          'Large celebratory headings at completion reinforce positive endings',
          'Typeface changes can signal transitions from mundane to peak moments',
          'Success messages in bold, clear type anchor the final memory',
          'Progress indicators using typography signal approach to a satisfying conclusion',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color shifts can create emotional peaks and signal positive endings',
        examples: [
          'Transitioning from neutral to vibrant colors at peak moments creates emotional emphasis',
          'Green success states at completion anchor positive ending memory',
          'Warm, celebratory colors on completion screens create lasting positive impressions',
          'Subtle color progression through a flow creates a sense of building toward a peak',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Micro-interactions, animations, and transitions define peak moments and endings',
        examples: [
          'Confetti or particle animations at completion create memorable endings',
          'Satisfying haptic feedback at key moments creates sensory peaks',
          'Smooth, anticipatory transitions during waits transform dead time into engagement',
          'Interactive progress (e.g., pulling to refresh, swiping to complete) makes the user an active participant in the peak',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content pacing and narrative structure determine where peaks and endings fall',
        examples: [
          'Narrative progress messages during waits ("Almost there...") create anticipation peaks',
          'Personalized completion messages ("You just saved 3 hours!") anchor positive endings',
          'Surprise content reveals at mid-flow create unexpected peaks of delight',
          'Summary screens at the end reframe the entire experience through a positive lens',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'All users must be able to perceive peak moments and positive endings, regardless of ability',
        examples: [
          'Screen reader announcements at peak moments ensure non-visual users experience the same emotional highlights',
          'Haptic feedback at key moments provides peaks for users who cannot see animations',
          'Audio cues at completion create accessible endings for all users',
          'ARIA live regions announce progress and completion for assistive technology users',
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
        title: 'Short, High-Impact Onboarding',
        description:
          'A 3-step onboarding that delivers a "wow" moment and ends with celebration',
        code: `<div class="onboarding-flow">
  <!-- Step 1: Quick context -->
  <div class="step active">
    <h2>Welcome to Acme</h2>
    <p>Let's get you set up in under a minute.</p>
    <button class="next">Let's go</button>
  </div>

  <!-- Step 2: Peak moment - instant value -->
  <div class="step">
    <h2>Here's your dashboard</h2>
    <div class="live-preview" aria-label="Your personalized dashboard preview">
      <!-- AI-generated preview with user's actual data -->
    </div>
    <p class="wow-text">We analyzed your data and found 3 insights.</p>
    <button class="next">See my insights</button>
  </div>

  <!-- Step 3: Positive ending -->
  <div class="step completion">
    <div class="celebration-animation" aria-hidden="true"></div>
    <h2>You're all set!</h2>
    <p>Your first report is ready. You just saved ~2 hours.</p>
    <button class="primary">Open my report</button>
  </div>
</div>`,
        explanation:
          'Three steps instead of twelve. Step 2 delivers a peak ("we found 3 insights") using real data. Step 3 ends with celebration and a concrete benefit. Users remember the insight reveal and the celebration, not the brevity.',
        principle:
          'Short experience with deliberate peak and positive ending outperforms long, thorough onboarding',
        metrics: {
          before: '34% completed 12-step onboarding, 2.1/5 satisfaction',
          after: '89% completed 3-step onboarding, 4.6/5 satisfaction',
          improvement: '162% completion increase, 119% satisfaction increase',
        },
      },
      {
        title: 'Delightful Loading State',
        description:
          'Transforming a 4-second wait into a micro-narrative with satisfying reveal',
        code: `<div class="loading-experience">
  <!-- Phase 1: Engaging progress (0-3s) -->
  <div class="progress-narrative">
    <div class="spinner-ring" aria-hidden="true"></div>
    <p class="status" role="status" aria-live="polite">
      Crunching your numbers...
    </p>
    <!-- Status cycles through engaging messages:
      "Crunching your numbers..."
      "Found something interesting..."
      "Polishing your results..."
    -->
  </div>

  <!-- Phase 2: Satisfying reveal (3-4s) -->
  <div class="reveal-transition">
    <div class="content-shimmer" aria-hidden="true"></div>
    <!-- Content slides in with spring animation -->
  </div>

  <!-- Phase 3: Content with highlight -->
  <div class="loaded-content">
    <div class="highlight-callout">
      <span class="badge new">New insight</span>
      <p>Revenue is up 12% this week</p>
    </div>
    <!-- Rest of dashboard content -->
  </div>
</div>`,
        explanation:
          'The 4-second wait becomes a narrative journey. Engaging status messages create anticipation (mini-peaks). The spring animation reveal is the peak moment. The highlighted insight at the end is a positive ending. Users remember the insight reveal, not the wait.',
        principle:
          'Transform unavoidable waits into narrative micro-experiences with peaks and positive endings',
        metrics: {
          before: '23% perceived wait as "too long" with standard spinner',
          after: '6% perceived wait as "too long" with narrative loading',
          improvement: '74% reduction in perceived wait time dissatisfaction',
        },
      },
      {
        title: 'Checkout Completion with Celebration',
        description:
          'Ending the purchase flow with delight rather than a flat confirmation',
        code: `<div class="checkout-complete">
  <!-- Celebration animation -->
  <div class="confetti-burst" aria-hidden="true"></div>

  <!-- Positive ending content -->
  <div class="success-message">
    <div class="check-animation" role="img" aria-label="Success">
      <svg class="checkmark"><!-- animated checkmark --></svg>
    </div>
    <h2>You're all set, Sarah!</h2>
    <p class="order-summary">
      Your new workspace arrives by <strong>Thursday</strong>.
    </p>
    <div class="surprise-bonus">
      <span class="badge">Surprise!</span>
      <p>We've added a free month of Pro features to your order.</p>
    </div>
  </div>

  <div class="next-steps">
    <button class="primary">Track your order</button>
    <button class="secondary">Continue shopping</button>
  </div>
</div>`,
        explanation:
          'The confetti animation is a sensory peak. The personalized message and delivery date provide concrete resolution. The surprise bonus creates an unexpected positive peak right at the end. Users remember this ending, not the 6 form fields they filled in.',
        principle:
          'Invest disproportionately in endings -- they define how the entire experience is remembered',
      },
    ],

    bad: [
      {
        title: 'Comprehensive But Forgettable Onboarding',
        description:
          'A thorough 12-step onboarding with no peak moments or memorable ending',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding">
  <div class="progress">Step 7 of 12</div>
  <h3>Configure notification preferences</h3>
  <form>
    <label><input type="checkbox"> Email notifications</label>
    <label><input type="checkbox"> Push notifications</label>
    <label><input type="checkbox"> SMS notifications</label>
    <label><input type="checkbox"> Weekly digest</label>
  </form>
  <button>Next</button>
</div>

<!-- After 12 identical steps, ending: -->
<div class="onboarding-complete">
  <p>Setup complete.</p>
  <button>Go to dashboard</button>
</div>`,
        explanation:
          'Twelve uniformly bland steps with no peak moment. The ending is a flat "Setup complete" that creates no positive memory. Users remember tedium and an anticlimactic conclusion, regardless of how thorough the setup was.',
        principle:
          'Duration without peaks creates a forgettable experience; flat endings make it feel like a chore',
      },
      {
        title: 'Bare Spinner Loading State',
        description:
          'A generic loading spinner with no engagement or transition',
        code: `<!-- DON'T DO THIS -->
<div class="loading">
  <div class="spinner"></div>
  <p>Loading...</p>
</div>

<!-- Content appears instantly with no transition -->
<div class="content" style="display: block;">
  <table><!-- data table --></table>
</div>`,
        explanation:
          'The spinner is dead time with no peak moment. The instant content swap is jarring -- no satisfying reveal, no positive ending to the wait. Users remember "it took forever" even if the wait was only 3 seconds.',
        principle:
          'Undesigned waits feel longer because there is no peak or ending to anchor memory positively',
      },
      {
        title: 'Abrupt Post-Action Redirect',
        description:
          'Immediately redirecting after a significant action with no acknowledgment',
        code: `<!-- DON'T DO THIS -->
<script>
  async function handleSubmit() {
    await saveData();
    // Immediately redirect with no celebration or confirmation
    window.location.href = '/dashboard';
  }
</script>`,
        explanation:
          'The user completed a significant action (submission, purchase, creation) and was immediately thrown to the dashboard. No acknowledgment, no celebration, no ending. The experience has no peak and no ending, so it leaves zero positive memory.',
        principle:
          'Skipping the ending erases the emotional value of the entire experience',
      },
    ],

    realWorld: [
      {
        company: 'Disney',
        product: 'Theme Park Queue Design',
        description:
          'Disney transforms ride queues into immersive pre-show experiences with themed environments, interactive elements, and character encounters. The queue walk-through becomes part of the ride narrative. The ride itself delivers the peak, and the exit leads through themed gift shops. Guests remember the ride peak and the themed ending, not the 45-minute wait.',
        effectiveness: 'very-effective',
        analysis:
          'Disney is the gold standard for duration neglect design. By creating peaks within the queue (interactive screens, character glimpses) and ensuring the ride delivers an emotional climax followed by a themed exit, guests rate 60-minute experiences as "amazing" while rating a 10-minute experience elsewhere with no peaks as "boring."',
      },
      {
        company: 'Apple',
        product: 'Product Unboxing Experience',
        description:
          'Apple designs packaging to create a slow, satisfying reveal. The precise friction of the lid, the first glimpse of the device, the perfectly arranged accessories -- each element builds to a peak moment of powering on the device for the first time and seeing the "Hello" screen.',
        effectiveness: 'very-effective',
        analysis:
          'The unboxing takes 2-3 minutes but is remembered as a defining product moment. The peak (first power-on, "Hello" screen) and ending (device ready to use) are meticulously designed. Users forget the 5 seconds of peeling plastic but remember the reveal.',
      },
      {
        company: 'Duolingo',
        product: 'Lesson Completion Celebrations',
        description:
          'After each 3-5 minute lesson, Duolingo shows XP earned, streak count, and a celebratory animation. The lesson itself has small peaks (correct answer streaks, combo bonuses) and always ends with a colorful, encouraging completion screen.',
        effectiveness: 'very-effective',
        analysis:
          'Duolingo exploits duration neglect perfectly: short lessons with peaks (streaks, combos) and strong endings (celebration, XP reveal). Users remember the satisfaction, not the repetitive drills. This drives daily return rates above 50%.',
      },
      {
        company: 'Uber',
        product: 'Ride Wait Experience',
        description:
          'Uber replaced static "finding driver" spinners with an animated map showing nearby drivers, real-time ETA updates, and driver details. The peak is seeing "your driver is arriving" and the ending is the car appearing on the map at your location.',
        effectiveness: 'effective',
        analysis:
          'By transforming the wait into a live, visual narrative with a clear climax (driver arriving), Uber reduced cancellation rates during waits. Users perceive the same 5-minute wait as shorter when they can see progress building to a peak.',
      },
      {
        company: 'Slack',
        product: 'Onboarding Bot Messages',
        description:
          'Slack uses Slackbot to deliver a playful, conversational onboarding. Instead of a long tutorial, Slackbot sends a few friendly messages that culminate in the user sending their first message. The peak is the user\'s first real interaction; the ending is team members welcoming them.',
        effectiveness: 'effective',
        analysis:
          'Slack compresses onboarding into a series of micro-moments with a clear peak (first real message sent) and social ending (team welcome). Users remember feeling welcomed, not the mechanics they learned.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding Length: Short with Peaks vs Comprehensive',
        hypothesis:
          'A shorter onboarding with deliberate peak moments will outperform a longer, thorough onboarding in satisfaction and retention',
        controlVersion: {
          description:
            '12-step onboarding covering all features with uniform step design and a plain "Setup complete" ending',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '8:42',
            scrollDepth: '100%',
          },
        },
        treatmentVersion: {
          description:
            '3-step onboarding with a "wow" data insight at step 2 (peak), confetti and personalized achievement at step 3 (ending)',
          metrics: {
            conversionRate: '89%',
            timeOnPage: '1:54',
            scrollDepth: '100%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The shorter onboarding with peaks achieved 162% higher completion. Post-survey showed 91% of treatment users described onboarding as "delightful" vs 23% for control. 7-day retention was 68% vs 41%. Duration was irrelevant; peak and ending were everything.',
          learnings: [
            'Completion rate nearly tripled despite covering fewer features',
            'Users who completed the short onboarding discovered remaining features organically',
            'The "wow" moment at step 2 was cited by 78% of users as their favorite part',
            'The celebration ending drove 3x more social sharing of the product',
          ],
        },
      },
      {
        title: 'Loading State: Plain Spinner vs Narrative Animation',
        hypothesis:
          'A narrative loading experience with peak reveal will reduce perceived wait time compared to a plain spinner',
        controlVersion: {
          description:
            'Standard circular spinner with "Loading..." text for 4 seconds, then instant content swap',
          metrics: {
            conversionRate: '77%',
            clickThroughRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Narrative progress ("Analyzing your data... Found something interesting... Preparing your results...") for 4 seconds, then spring-animated reveal with highlighted top insight',
          metrics: {
            conversionRate: '92%',
            clickThroughRate: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Same actual wait time, but treatment users rated the wait 62% shorter. Engagement with the first piece of content increased 49% because the highlighted insight (ending) drew immediate attention. Bounce rate during loading dropped from 23% to 8%.',
          learnings: [
            'Perceived wait time is independent of actual wait time when peaks exist',
            'The narrative messages created anticipation that made the reveal more satisfying',
            'The highlighted insight at reveal served as both peak and ending simultaneously',
            'Users who experienced narrative loading returned 23% more often the next day',
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
        name: 'Flat Loading States',
        description:
          'Generic spinners or progress bars with no engaging content, narrative, or transition',
        howToSpot:
          'Look for plain spinners, "Loading..." text, or empty skeleton screens with no engaging elements',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Abrupt Endings',
        description:
          'Flows that end with plain text confirmation or immediate redirects with no celebration or acknowledgment',
        howToSpot:
          'Check final screens of wizards, checkouts, and forms for flat "Done" messages or instant redirects',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Uniform Step Design',
        description:
          'Multi-step flows where every step looks and feels identical with no standout moment',
        howToSpot:
          'Walk through the entire flow and ask: "Which step will the user remember?" If the answer is none, there is no peak.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Transitions',
        description:
          'Content appearing or disappearing instantly with no animation or reveal',
        howToSpot:
          'Look for instant show/hide, hard page navigations, or content swaps with no transition',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Lengthy Unbroken Processes',
        description:
          'Long forms, tutorials, or flows with no milestones, celebrations, or moments of delight',
        howToSpot:
          'Count the steps in a flow. If there are more than 5 with no celebratory milestone, duration neglect is not being leveraged.',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Peak-Absent Flow',
        description: 'A multi-step user journey with no standout moment of delight, surprise, or accomplishment',
        indicators: [
          'Uniform visual treatment across all steps',
          'No animation, celebration, or surprise at any point',
          'User cannot identify a "favorite moment" in the flow',
          'Every step is functional but none is memorable',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Flat Ending Pattern',
        description: 'An experience that ends with minimal acknowledgment, plain text, or an immediate redirect',
        indicators: [
          '"Done" or "Complete" with no visual emphasis',
          'Redirect to dashboard within 0-1 seconds of action',
          'No summary, celebration, or forward-looking content at the end',
          'Final screen indistinguishable from mid-flow screens',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Dead Wait Pattern',
        description: 'Loading or processing states that offer no engagement, narrative, or visual interest',
        indicators: [
          'Generic spinner or progress bar',
          'Static "Loading..." or "Please wait" text',
          'No skeleton screen, narrative, or micro-interaction',
          'Content appears with no transition or reveal',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Over-Extended Flow',
        description: 'A process that could be compressed without loss of value but is stretched across many steps',
        indicators: [
          'More than 7 steps for a simple task',
          'Steps that could be combined or eliminated',
          'Users abandoning mid-flow at similar points',
          'No peaks to justify the extended duration',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What is the single most memorable moment in this flow?',
      'How does this experience end? Is the ending designed deliberately?',
      'Could this flow be compressed to half the steps without losing value?',
      'Are loading states designed with engagement, or are they dead time?',
      'Is there at least one moment of delight, surprise, or accomplishment?',
      'Would a user describe any moment as a "wow" moment?',
      'Does the ending leave users with a positive final impression?',
      'Are transitions between states animated and satisfying?',
      'If the flow has unavoidable waits, are they transformed into micro-experiences?',
      'Are peaks and endings accessible to users with disabilities (screen readers, reduced motion)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in duration neglect and the peak-end rule.

Analyze the provided design for duration neglect patterns. Identify:

1. **Peak Moments**: Does the experience have a standout moment of delight, surprise, or accomplishment?
2. **Ending Quality**: How does the experience end? Is it designed deliberately or is it flat/abrupt?
3. **Wait State Design**: Are loading, processing, or transition states engaging or dead time?
4. **Flow Compression**: Could the experience be shorter without losing value?
5. **Transition Quality**: Are state changes animated and satisfying, or instant and jarring?

For each pattern found:
- Identify whether it leverages or ignores duration neglect
- Assess the memorability of the experience
- Determine if peaks and endings are accessible to all users
- Suggest specific improvements for peak creation and ending design

Consider:
- Is the experience investing in the moments that matter (peaks and endings)?
- Are there negative peaks (frustration, confusion) that will dominate memory?
- Could unavoidable waits be transformed into engaging micro-experiences?
- Is the flow longer than necessary without peaks to justify the duration?
- Are peaks and endings perceivable by users with visual, auditory, or motor disabilities?

Provide actionable recommendations for creating memorable peaks and positive endings.`,

    outputSchema: {
      type: 'object',
      properties: {
        durationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              peakQuality: { type: 'string' },
              endingQuality: { type: 'string' },
              memorability: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'peakQuality',
              'endingQuality',
              'memorability',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            peakMomentScore: { type: 'number' },
            endingQualityScore: { type: 'number' },
            waitStateDesign: { type: 'number' },
            flowCompression: { type: 'number' },
          },
          required: [
            'peakMomentScore',
            'endingQualityScore',
            'waitStateDesign',
            'flowCompression',
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
        'durationPatterns',
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
        title: 'Map the Experience Timeline',
        description:
          'Chart every moment in the user journey from start to finish, noting emotional intensity at each point',
        example:
          'Onboarding flow: Welcome (neutral) -> Profile setup (low) -> First insight (high!) -> Configuration (low) -> Completion (high!)',
        tips: [
          'Walk through the flow yourself and rate each moment on a -5 to +5 emotional scale',
          'Identify the current peak (highest positive) and trough (lowest negative)',
          'Note where the experience currently ends and what the user sees last',
        ],
      },
      {
        step: 2,
        title: 'Design the Peak Moment',
        description:
          'Create or amplify the single most memorable positive moment in the experience',
        example:
          'At step 2 of onboarding, show a personalized AI-generated insight from the user\'s data with a "wow" animation',
        tips: [
          'Peaks should deliver genuine value, not just visual spectacle',
          'The best peaks combine surprise with personal relevance',
          'One strong peak is better than three mediocre ones',
        ],
      },
      {
        step: 3,
        title: 'Craft the Ending',
        description:
          'Design the final moment of the experience to be deliberately positive and memorable',
        example:
          'End checkout with confetti, a personalized message, and a surprise bonus ("We added free shipping!")',
        tips: [
          'Endings should feel like a resolution, not an interruption',
          'Summarize what was achieved to create a sense of accomplishment',
          'Add an unexpected positive element (surprise discount, bonus feature)',
        ],
      },
      {
        step: 4,
        title: 'Compress the Middle',
        description:
          'Reduce or streamline the parts of the experience between peaks and endings',
        example:
          'Cut 12-step onboarding to 3 steps by combining form fields and removing optional configuration',
        tips: [
          'If a step is not a peak or ending, ask if it can be eliminated or combined',
          'Move non-essential steps to post-completion settings',
          'Use smart defaults to skip configuration steps entirely',
        ],
      },
      {
        step: 5,
        title: 'Transform Unavoidable Waits',
        description:
          'Turn loading states, processing time, and transitions into engaging micro-experiences',
        example:
          'Replace a spinner with a narrative progress sequence and a satisfying reveal animation',
        tips: [
          'For waits under 1 second, optimize for speed (no animation needed)',
          'For 1-4 second waits, use skeleton screens with shimmer effects',
          'For 4+ second waits, use narrative progress, tips, or interactive elements',
        ],
      },
      {
        step: 6,
        title: 'Eliminate Negative Peaks',
        description:
          'Identify and smooth out frustrating, confusing, or painful moments that could become the dominant memory',
        example:
          'Replace a confusing form validation error with inline guidance that prevents the error from occurring',
        tips: [
          'Test with real users to find moments of frustration you may have missed',
          'If a negative moment is unavoidable (e.g., error), follow it with immediate resolution and a positive recovery',
          'Never let the last moment be negative -- if an error occurs, guide to recovery before ending',
        ],
      },
    ],

    dos: [
      'Invest disproportionate design effort in peak moments and endings',
      'Create at least one "wow" moment in every multi-step flow',
      'End every flow with deliberate celebration, acknowledgment, or forward momentum',
      'Compress experiences to their essential moments when possible',
      'Transform unavoidable waits into engaging, narrative micro-experiences',
      'Use animation and transitions to create satisfying reveals after waits',
      'Design error recovery to end positively, overriding the negative peak of the error itself',
      'Test which moments users remember to validate your peak and ending design',
    ],

    donts: [
      'Don\'t spread design effort uniformly across all steps -- prioritize peaks and endings',
      'Don\'t end flows with flat "Done" text or immediate redirects',
      'Don\'t use generic spinners for waits longer than 1 second',
      'Don\'t create long flows without peak moments to justify the duration',
      'Don\'t let negative moments (errors, confusion) be the last thing users experience',
      'Don\'t assume shorter is always better -- a slightly longer experience with a great peak can outperform a shorter flat one',
      'Don\'t ignore the ending to focus only on the beginning (first impressions matter, but last impressions persist)',
      'Don\'t skip transitions and reveals -- instant content swaps waste an opportunity for a positive peak',
    ],

    bestPractices: [
      {
        title: 'The Peak-End Audit',
        description:
          'For every user flow, identify the peak and the ending. If you cannot name them, redesign.',
        rationale:
          'Users remember peaks and endings. If your flow has neither, it will be forgotten or remembered as tedious.',
        example:
          'Walk through checkout flow. Peak: seeing savings total. Ending: confetti + order confirmation. If neither exists, add them.',
      },
      {
        title: 'Ending > Beginning',
        description:
          'Allocate more design polish to the final screen than the first screen of any flow',
        rationale:
          'First impressions drive engagement, but last impressions drive memory and return behavior. The ending is what users carry with them.',
        example:
          'Spend 2x the design time on the completion screen vs the welcome screen of onboarding',
      },
      {
        title: 'Narrative Waits',
        description:
          'Replace dead wait time with progress narratives that build anticipation toward a reveal',
        rationale:
          'Narrative waits create an anticipation arc with a mini-peak (the reveal), making the same duration feel shorter and more positive',
        example:
          '"Analyzing your data... Found 3 trends... Preparing your report..." followed by a slide-in reveal',
      },
      {
        title: 'Compression Without Loss',
        description:
          'Remove steps that add duration but no peak, value, or necessary information',
        rationale:
          'Extra duration without peaks makes the entire experience feel longer and more tedious in retrospect',
        example:
          'Move "notification preferences" out of onboarding and into settings. Users can configure later; onboarding should only have peaks.',
      },
      {
        title: 'Recovery Endings',
        description:
          'After any error or negative experience, ensure the recovery process ends on a positive note',
        rationale:
          'A negative peak followed by a positive ending is remembered more favorably than a consistently neutral experience',
        example:
          'After a payment error: guide to resolution, confirm success, and add "We also applied a 5% discount for the trouble."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Celebration animations must not flash more than 3 times per second',
        implementation:
          'Use gentle confetti, fade-ins, or slide animations for peak moments. Avoid strobing or rapid flashing effects. Respect prefers-reduced-motion.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Peak moments and completion states must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" for progress narratives and aria-live="assertive" for completion announcements. Ensure screen readers announce peak moments.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Users must be able to control or extend timed transitions',
        implementation:
          'If a celebration screen auto-advances, provide a way to pause or extend it. Don\'t auto-redirect away from completion screens too quickly.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Peak moments and endings should not rely solely on color',
        implementation:
          'Combine color changes with text, icons, sounds, and haptics so all users can perceive peak and ending moments.',
      },
    ],

    ethics: [
      {
        concern: 'Disguising Poor Experiences',
        severity: 'high',
        explanation:
          'Using peak-end design to make genuinely bad experiences seem acceptable in retrospect',
        mitigation:
          'Duration neglect should enhance good experiences, not mask bad ones. Fix underlying problems first, then add peaks and endings.',
      },
      {
        concern: 'Manipulative Urgency',
        severity: 'medium',
        explanation:
          'Compressing experiences to create artificial urgency or prevent deliberation',
        mitigation:
          'Compress tedious steps, not decision-making time. Never rush users past important choices to create a false sense of speed.',
      },
      {
        concern: 'Addictive Loops',
        severity: 'high',
        explanation:
          'Creating intense peaks and celebratory endings to hook users into compulsive repeat behavior',
        mitigation:
          'Design peaks to deliver genuine value, not empty dopamine hits. Allow natural stopping points and avoid dark patterns that exploit duration neglect for engagement metrics.',
      },
      {
        concern: 'Excluding Users from Peaks',
        severity: 'critical',
        explanation:
          'Peak moments that rely on animation, sound, or color exclude users with disabilities from the most memorable part of the experience',
        mitigation:
          'Ensure peaks are multi-modal: visual, textual, auditory, and haptic. Every user should be able to perceive the peak and ending.',
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
          'The foundational cold-water experiment demonstrating that adding a mildly painful period to the end of a painful experience makes it preferred, proving duration neglect',
        type: 'foundational',
      },
      {
        title: 'Duration Neglect in Retrospective Evaluations of Affective Episodes',
        author: 'Fredrickson, B. L., & Kahneman, D.',
        year: 1993,
        doi: '10.1037/0022-3514.65.1.45',
        description:
          'Comprehensive demonstration that retrospective evaluations of experiences are governed by peak intensity and ending, with duration playing virtually no role',
        type: 'foundational',
      },
      {
        title: 'Patients\' Memories of Painful Medical Treatments: Real-Time and Retrospective Evaluations of Two Minimally Invasive Procedures',
        author: 'Redelmeier, D. A., & Kahneman, D.',
        year: 1996,
        doi: '10.1016/S0304-3959(96)03205-6',
        description:
          'Clinical validation showing patients\' memories of colonoscopy pain were determined by peak and end, not duration, with implications for medical procedure design',
        type: 'advanced',
      },
      {
        title: 'Back to Bentham? Explorations of Experienced Utility',
        author: 'Kahneman, D., Wakker, P. P., & Sarin, R.',
        year: 1997,
        doi: '10.2307/2955001',
        description:
          'Theoretical framework distinguishing experienced utility (moment-to-moment) from remembered utility (retrospective), explaining why duration neglect occurs',
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
          'Chapter 35 ("Two Selves") covers duration neglect and the peak-end rule extensively, with the cold-water experiment and colonoscopy studies',
        type: 'foundational',
      },
      {
        title: 'The Power of Moments',
        author: 'Heath, Chip & Heath, Dan',
        year: 2017,
        isbn: '9781501147760',
        description:
          'Practical guide to designing peak moments in experiences, directly building on duration neglect research',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Explores how reward variability and peak experiences drive product engagement, closely related to duration neglect in UX',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Peak-End Rule: How Impressions Become Memories',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/peak-end-rule/',
        description:
          'UX-focused explanation of duration neglect and the peak-end rule with practical design recommendations',
        type: 'practical',
      },
      {
        title: 'Designing for the Peak-End Rule',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/design-for-peak-end-experiences',
        description:
          'Design patterns and strategies for creating peak moments and positive endings in digital products',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Daniel Kahneman: The Riddle of Experience vs. Memory',
        author: 'TED',
        url: 'https://www.ted.com/talks/daniel_kahneman_the_riddle_of_experience_vs_memory',
        description:
          'Kahneman himself explaining the experiencing self vs remembering self, duration neglect, and the peak-end rule',
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
      'peak-end-rule',       // Direct corollary -- peak-end rule is the mechanism behind duration neglect
      'recency-effect',      // Why endings are weighted so heavily in memory
      'serial-position',     // Primacy and recency effects in sequential experiences
      'zeigarnik-effect',    // Incomplete experiences are remembered differently; endings provide closure
    ],

    conflicts: [
      'sunk-cost-fallacy',   // Sunk cost makes people value duration; duration neglect says it doesn't matter for memory
      'time-perception',     // Actual duration perception conflicts with retrospective evaluation
    ],

    confusedWith: [
      'peak-end-rule',       // Duration neglect is a consequence of peak-end evaluation, not the same thing
      'recency-bias',        // Recency bias affects all judgments; duration neglect is specific to experience evaluation
      'attention-span',      // Short attention span is about engagement capacity; duration neglect is about retrospective memory
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'peak-end-rule',
        'experience-compression',
      ],
    },
  },
};
