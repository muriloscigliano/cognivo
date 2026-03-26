/**
 * FADING AFFECT BIAS
 *
 * Negative emotions associated with past events fade faster than positive emotions.
 * We remember the good more vividly than the bad.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const fadingAffectBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'fading-affect-bias',
    name: 'Fading Affect Bias',
    aliases: ['FAB', 'Positivity Bias in Memory', 'Affective Fading'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'emotion',
      'nostalgia',
      'retention',
      'feedback',
      'review-timing',
      're-engagement',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Negative emotions associated with past events fade faster than positive emotions — we remember the good more vividly.',

    detailed: `Fading Affect Bias (FAB) describes the robust psychological finding that the emotional intensity associated with negative autobiographical memories fades more rapidly over time than the intensity associated with positive memories. In other words, people tend to remember past experiences through a progressively rosier lens as time passes.

This asymmetric fading has significant implications for product design. Users who experienced frustration with a product may forget that frustration relatively quickly, while positive peak moments persist in memory. This creates strategic windows for re-engagement, feedback collection, and review solicitation.

Designers can leverage FAB ethically by timing interactions to capitalize on positive memory persistence — prompting reviews after positive peaks rather than during frustration, building nostalgia features that highlight good moments, and scheduling re-engagement campaigns when negative experiences have faded but positive associations remain strong.`,

    psychologyBasis: {
      discoveredBy: 'W. Richard Walker, John J. Skowronski, and Charles P. Thompson',
      year: 2003,
      theory: 'Fading Affect Bias in Autobiographical Memory',
      mechanism: `Negative emotions tied to past events fade faster than positive emotions through several mechanisms:

1. **Immune Neglect**: The psychological immune system works to neutralize negative experiences, reducing their emotional sting over time
2. **Cognitive Reappraisal**: People unconsciously reframe negative events in more positive or neutral terms as time passes
3. **Social Sharing**: Discussing negative events helps process and diminish their emotional impact, while sharing positive events reinforces and sustains their glow
4. **Mobilization-Minimization**: The brain is motivated to minimize negative affect to maintain psychological well-being and functional behavior
5. **Rehearsal Asymmetry**: People voluntarily recall positive memories more frequently, strengthening their emotional associations while negative memories receive less rehearsal

The result is a systematic positivity shift in autobiographical memory — the past genuinely feels better than it was.`,
    },

    realWorldExample: `Walker et al. (2003) asked participants to record daily events and rate their emotional intensity. When re-rating the same events weeks later, participants consistently showed that negative emotions had faded more than positive ones. A frustrating commute rated -4 might fade to -1, while a joyful dinner rated +4 might only fade to +3. This asymmetry was remarkably consistent across participants, event types, and time intervals.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Fading Affect Bias affects how users remember past interactions with products and services. Because negative emotions fade faster than positive ones, designers can strategically time interactions to:

- Prompt reviews and ratings after positive peak moments, not during frustration
- Collect feedback when users are most likely to provide balanced, constructive input
- Build nostalgia and memory features that highlight positive moments
- Time re-engagement campaigns when negative experiences have faded
- Design "year in review" features that naturally emphasize positive associations`,

    whenToUse: [
      {
        title: 'Review and Rating Prompts',
        scenario:
          'When soliciting user reviews or app store ratings',
        example:
          'Prompt for a review immediately after a positive milestone (completing a goal, receiving praise, achieving a streak) rather than after an error or frustrating task',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feedback Collection Timing',
        scenario: 'When gathering user satisfaction data or NPS scores',
        example:
          'Schedule satisfaction surveys a few days after a support interaction, allowing negative emotions from the problem to fade while the positive resolution remains vivid',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Nostalgia and Memory Features',
        scenario: 'When building features that surface past activity or achievements',
        example:
          'Create "On This Day" or "Year in Review" features that highlight accomplishments, milestones, and positive moments from the user\'s history',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Re-engagement Campaigns',
        scenario: 'When attempting to win back churned or dormant users',
        example:
          'Send re-engagement emails 2-4 weeks after churn, when frustration has faded but positive associations with the product remain accessible',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Renewal Timing',
        scenario: 'When reminding users about upcoming renewals or upsell opportunities',
        example:
          'Time renewal reminders to coincide with a period of positive usage, not immediately after billing-related friction',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Critical Bug or Service Failure Feedback',
        reason:
          'Waiting for negative emotions to fade before collecting feedback on serious issues means you miss accurate severity reports',
        consequence:
          'Underestimating the impact of critical problems because feedback was collected after emotions faded',
        alternative:
          'Collect incident feedback immediately for severity assessment, then follow up later for resolution satisfaction',
      },
      {
        title: 'Safety-Critical Systems',
        reason:
          'Users forgetting negative experiences with dangerous or unsafe features could lead to repeated harm',
        consequence:
          'Users re-engaging with features that previously caused data loss, financial harm, or safety issues',
        alternative:
          'Maintain persistent, clear warnings regardless of emotional fading; do not rely on memory of past negative events',
      },
      {
        title: 'Manipulating Genuine Dissatisfaction',
        reason:
          'Exploiting FAB to suppress legitimate negative feedback is unethical and counterproductive',
        consequence:
          'Real product problems go unaddressed; users feel unheard when their concerns are strategically avoided',
        alternative:
          'Collect feedback at multiple time points to get both raw emotional response and reflective assessment',
      },
      {
        title: 'Hiding Product Deterioration',
        reason:
          'Using FAB timing to obscure a declining product experience masks real issues',
        consequence:
          'Artificially inflated satisfaction metrics that don\'t reflect actual user experience',
        alternative:
          'Use FAB insights to understand memory dynamics, not to game satisfaction scores',
      },
    ],

    commonMistakes: [
      {
        title: 'Prompting Reviews During Frustration',
        description:
          'Asking for app store reviews or feedback immediately after errors, crashes, or failed tasks',
        why: 'Negative emotions are at peak intensity; users will rate harshly and associate the product with the frustration',
        fix: 'Detect positive moments (task completion, milestone, positive outcome) and prompt reviews then',
      },
      {
        title: 'Ignoring the Negative Experience Window',
        description:
          'Failing to collect any feedback during negative experiences, missing important improvement data',
        why: 'While FAB suggests timing reviews after positive peaks, understanding pain points requires immediate feedback',
        fix: 'Use in-context micro-feedback (thumbs up/down) during frustration moments for product improvement, but save formal reviews for positive moments',
      },
      {
        title: 'Generic Memory Features',
        description:
          'Building "memories" or "year in review" features that include negative events alongside positive ones without curation',
        why: 'Surfacing negative memories can re-activate faded emotions, creating an unpleasant experience',
        fix: 'Curate memory features to emphasize positive moments, achievements, and milestones; filter out frustrating or negative events',
      },
      {
        title: 'Re-engaging Too Early',
        description:
          'Sending win-back campaigns immediately after a user churns due to frustration',
        why: 'Negative emotions haven\'t had time to fade; the re-engagement feels tone-deaf and can deepen resentment',
        fix: 'Allow 2-4 weeks for negative affect to fade before re-engagement, then lead with what made the product valuable',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines how past activity and memories are surfaced to users',
        examples: [
          'Timeline layouts can emphasize positive milestones over negative events',
          'Dashboard "highlights" sections can curate positive memory cues',
          'Achievement walls and trophy cases reinforce positive associations',
          'Activity feeds can be filtered to prioritize uplifting content',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices can influence the emotional tone of memory-related features',
        examples: [
          'Warm, friendly typography in "Year in Review" features reinforces positivity',
          'Celebratory type treatments for milestone reminders',
          'Gentle, understated type for surfacing past activity avoids re-triggering negative memories',
          'Clear headings help users navigate memory features at their own pace',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color creates emotional context for memory and nostalgia features',
        examples: [
          'Warm, golden tones in memory features evoke nostalgia and positive affect',
          'Muted, soft palettes for "On This Day" features feel gentle and reflective',
          'Achievement colors (gold, green) reinforce positive memory associations',
          'Avoiding red or alarming colors in retrospective features prevents negative reactivation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction timing is the primary lever for leveraging Fading Affect Bias',
        examples: [
          'Review prompts triggered by positive events, not random timing',
          'Feedback collection timed to emotional state, not arbitrary schedules',
          'Re-engagement flows initiated after sufficient time for negative affect to fade',
          'Nostalgia features surfaced at moments of low engagement to rekindle positive associations',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content curation determines which memories are reinforced and which are allowed to fade',
        examples: [
          'Year-in-review content curated to highlight achievements and positive moments',
          'Memory notifications emphasizing milestones, connections, and accomplishments',
          'Win-back emails leading with the user\'s best moments and achievements',
          'Progress summaries focusing on growth rather than setbacks',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Memory and nostalgia features must be accessible to all users',
        examples: [
          'Screen reader users should receive the same curated positive memory experience',
          'Memory features should not rely solely on visual media (photos, videos)',
          'Alt text for achievement badges and milestone images conveys the positive context',
          'Keyboard-navigable memory galleries and timelines',
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
        title: 'Smart Review Prompt After Positive Peak',
        description:
          'App prompts for review after a user completes a meaningful achievement, not during frustration',
        code: `<div class="review-prompt">
  <h3>You just hit a 30-day streak!</h3>
  <p>You've completed 30 consecutive days of practice.
  That's amazing dedication.</p>
  <div class="achievement-glow">
    <span class="streak-badge">30</span>
    <span class="label">Day Streak</span>
  </div>
  <p class="prompt-text">Enjoying your progress? A review helps
  others discover what you've found.</p>
  <div class="actions">
    <button class="primary">Rate Us</button>
    <button class="secondary">Maybe Later</button>
  </div>
</div>`,
        explanation:
          'The review prompt appears at a moment of genuine positive emotion — completing a meaningful streak. The user associates the product with achievement, not frustration. Any past negative experiences have been overshadowed by this positive peak.',
        principle:
          'Prompt for reviews at emotional peaks when positive affect is strongest and past frustrations have faded',
        metrics: {
          before: '2.1 average rating when prompted randomly',
          after: '4.4 average rating when prompted after positive milestone',
          improvement: '110% improvement in average review score',
        },
      },
      {
        title: 'Curated Year-in-Review Feature',
        description:
          'Annual summary highlighting positive moments and achievements while letting negative experiences stay faded',
        code: `<section class="year-in-review">
  <h2>Your 2025 Highlights</h2>

  <div class="highlight-card">
    <span class="date">March 15</span>
    <h4>First 1,000 Subscribers</h4>
    <p>You crossed a major milestone. Your audience
    grew 340% this year.</p>
  </div>

  <div class="highlight-card">
    <span class="date">July 8</span>
    <h4>Most Popular Post</h4>
    <p>"Design Systems at Scale" reached 25,000 views
    and was shared 1,200 times.</p>
  </div>

  <div class="stats-summary">
    <div class="stat">
      <span class="number">156</span>
      <span class="label">Posts Published</span>
    </div>
    <div class="stat">
      <span class="number">89,000</span>
      <span class="label">Total Views</span>
    </div>
  </div>

  <p class="closing">Here's to an even better 2026.</p>
</section>`,
        explanation:
          'The year-in-review exclusively surfaces positive milestones and achievements. Failed posts, subscriber losses, and frustrating moments are naturally omitted, aligning with how FAB already shapes memory — the feature reinforces the user\'s naturally rosier recollection of their year.',
        principle:
          'Memory features should curate for positivity, aligning with how FAB naturally reshapes autobiographical memory',
      },
      {
        title: 'Timed Re-engagement After Churn',
        description:
          'Win-back email sent 3 weeks after churn, leading with the user\'s best moments',
        code: `<div class="reengagement-email">
  <h2>We miss your creativity, Sarah</h2>

  <div class="memory-highlight">
    <p>Remember when you designed this?</p>
    <img src="user-best-project.jpg"
      alt="Sarah's award-winning dashboard design">
    <p class="caption">Your dashboard design — your most-liked
    project with 234 reactions</p>
  </div>

  <div class="whats-new">
    <h3>While you were away, we've improved:</h3>
    <ul>
      <li>Faster export (3x speed improvement)</li>
      <li>New collaboration features</li>
      <li>Simplified sharing workflow</li>
    </ul>
  </div>

  <button class="primary">Pick Up Where You Left Off</button>
  <p class="no-pressure">No commitment. Your projects are
  waiting exactly as you left them.</p>
</div>`,
        explanation:
          'Sent 3 weeks after churn, negative emotions about product friction have substantially faded. The email leads with the user\'s proudest moment, reactivating positive associations. It also addresses likely pain points (speed, complexity) without dwelling on what went wrong.',
        principle:
          'Re-engage after negative affect has faded, leading with positive memory cues from the user\'s own history',
        metrics: {
          before: '4% reactivation rate with immediate win-back emails',
          after: '18% reactivation rate with 3-week delayed, memory-cued emails',
          improvement: '350% increase in churned user reactivation',
        },
      },
    ],

    bad: [
      {
        title: 'Review Prompt During Error State',
        description:
          'Asking for a review immediately after a crash or error',
        code: `<!-- DON'T DO THIS -->
<div class="error-screen">
  <h2>Something went wrong</h2>
  <p>We're sorry, your work could not be saved.</p>
  <p class="error-code">Error: SAVE_FAILED_TIMEOUT</p>

  <div class="review-prompt">
    <p>Enjoying the app? Leave us a review!</p>
    <div class="stars">★ ★ ★ ★ ★</div>
    <button>Rate on App Store</button>
  </div>
</div>`,
        explanation:
          'Prompting for a review during peak negative emotion guarantees poor ratings. The user just lost work and is experiencing frustration at maximum intensity — the opposite of when FAB would work in your favor.',
        principle:
          'Never solicit reviews when negative emotions are at peak intensity; wait for them to fade',
      },
      {
        title: 'Immediate Win-Back After Rage Quit',
        description:
          'Sending a re-engagement email within hours of a frustrated cancellation',
        code: `<!-- DON'T DO THIS -->
<div class="winback-email">
  <h2>Wait! Don't go!</h2>
  <p>We noticed you just cancelled your subscription.</p>
  <p>Are you sure? Here's 50% off if you come back RIGHT NOW!</p>
  <div class="countdown">
    <span class="timer">23:59:42</span>
    <p>This offer expires in 24 hours!</p>
  </div>
  <button class="urgent">RECLAIM YOUR DISCOUNT</button>
</div>`,
        explanation:
          'Contacting a user immediately after a frustrated cancellation catches them at peak negative emotion. The urgency tactics and pressure compound the negative experience. FAB hasn\'t had time to work — the user still vividly remembers every frustration that led to cancellation.',
        principle:
          'Immediate re-engagement during peak negative affect reinforces resentment rather than leveraging natural emotional fading',
      },
      {
        title: 'Uncurated Memory Feature Surfacing Negative Events',
        description:
          'A "memories" feature that surfaces negative or embarrassing past events',
        code: `<!-- DON'T DO THIS -->
<div class="memory-notification">
  <h3>On This Day, 1 Year Ago</h3>
  <div class="memory-card">
    <p>You had 3 failed deployments and
    your build was broken for 6 hours.</p>
    <div class="stats">
      <span class="negative">12 errors logged</span>
      <span class="negative">3 rollbacks</span>
    </div>
  </div>
  <p>Share this memory?</p>
</div>`,
        explanation:
          'Surfacing negative past events re-activates emotions that had naturally faded through FAB. The user had moved past this frustrating day, but the notification drags the negative memory back to full intensity, creating a net-negative experience with the product.',
        principle:
          'Never resurface negative memories that FAB has already faded — you undo the brain\'s natural healing process',
      },
    ],

    realWorld: [
      {
        company: 'Yelp',
        product: 'Review Timing',
        description: 'Yelp prompts users to leave reviews days after a restaurant visit rather than immediately. This allows minor frustrations (wait time, parking) to fade while the positive experience (food quality, atmosphere) remains vivid, resulting in more balanced and often more positive reviews.',
        effectiveness: 'effective',
        analysis: 'By delaying review prompts, Yelp leverages FAB to collect reviews that reflect the overall positive memory rather than momentary frustrations. This produces reviews that are more useful to future diners and fairer to businesses.',
      },
      {
        company: 'Apple',
        product: 'App Store Review Prompts',
        description: 'Apple\'s SKStoreReviewController API limits when apps can prompt for reviews and encourages developers to prompt after positive interactions. The API itself enforces good FAB-aligned timing by preventing developers from prompting during errors or frustration.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s system-level enforcement of smart review timing has measurably improved average app store ratings across the ecosystem. By architecturally preventing review prompts during negative moments, they leverage FAB at platform scale.',
      },
      {
        company: 'Spotify',
        product: 'Spotify Wrapped',
        description: 'Spotify Wrapped is a masterclass in FAB-aligned design. The annual feature exclusively highlights positive listening achievements — top songs, minutes listened, genre exploration. It never mentions songs skipped, playlists abandoned, or subscription complaints.',
        effectiveness: 'very-effective',
        analysis: 'Wrapped creates an overwhelmingly positive year-in-review that aligns perfectly with how FAB reshapes memory. Users share it widely on social media, reinforcing positive associations and generating organic marketing. Any frustrations with the service throughout the year are absent from the narrative.',
      },
      {
        company: 'Apple & Google',
        product: 'Photo Memories',
        description: 'Both Apple Photos and Google Photos create automated "memory" compilations that surface positive past moments — vacations, celebrations, milestones. These features use AI to detect smiling faces, beautiful scenes, and positive events while filtering out blurry, dark, or negative-context images.',
        effectiveness: 'very-effective',
        analysis: 'Photo memory features align perfectly with FAB by reinforcing positive autobiographical memories. Users experience a nostalgia boost that strengthens emotional attachment to the platform. The curation ensures negative memories (which have already faded) are not re-activated.',
      },
    ],

    abTests: [
      {
        title: 'Review Prompt Timing: Post-Error vs Post-Achievement',
        hypothesis:
          'Prompting for reviews after positive achievements will yield higher ratings than random or post-error timing',
        controlVersion: {
          description:
            'Review prompt shown at random intervals during normal app usage, regardless of user emotional state',
          metrics: {
            conversionRate: '3.2%',
            averageRating: '3.1 stars',
            dismissRate: '78%',
          },
        },
        treatmentVersion: {
          description:
            'Review prompt shown only after positive milestones: completing a goal, reaching a streak, receiving positive feedback from others',
          metrics: {
            conversionRate: '8.7%',
            averageRating: '4.6 stars',
            dismissRate: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Timing review prompts to positive peaks increased both the likelihood of leaving a review (172% increase) and the rating given (48% higher). Users at positive emotional peaks were more willing to engage and naturally recalled the product more favorably due to FAB.',
          learnings: [
            'Emotional state at the moment of prompting dramatically affects both response rate and sentiment',
            'Users prompted after achievements were more likely to write detailed, positive reviews',
            'The effect was strongest when the achievement was personally meaningful, not just routine',
            'Even a 10-minute delay after a frustrating event significantly improved ratings compared to immediate prompts',
          ],
        },
      },
      {
        title: 'Win-Back Email Timing: Immediate vs 3-Week Delay',
        hypothesis:
          'Delaying re-engagement emails by 3 weeks will increase reactivation rates as negative emotions fade',
        controlVersion: {
          description:
            'Win-back email sent within 24 hours of account cancellation or churn, offering a discount to return',
          metrics: {
            openRate: '45%',
            clickThroughRate: '6%',
            reactivationRate: '3.8%',
          },
        },
        treatmentVersion: {
          description:
            'Win-back email sent 3 weeks after churn, leading with the user\'s positive highlights and achievements, with improvements addressing common pain points',
          metrics: {
            openRate: '52%',
            clickThroughRate: '19%',
            reactivationRate: '14.2%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The 3-week delay allowed FAB to work naturally — negative emotions about the product had faded significantly while positive memories remained accessible. Leading with the user\'s own positive history reactivated those favorable associations.',
          learnings: [
            'Immediate win-back emails often reinforced the negative emotions that drove churn',
            'The 3-week delay hit a sweet spot: negative affect had faded but the user hadn\'t fully moved on',
            'Personalized memory cues (user\'s own achievements) were more effective than generic discounts',
            'Addressing the likely pain points (without dwelling on them) showed responsiveness without reactivating negativity',
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
        name: 'Review Prompt Timing',
        description:
          'Review or rating prompts that appear based on user emotional state or after positive events',
        howToSpot:
          'Check when review prompts are triggered — after achievements, completions, or positive feedback vs. random or post-error timing',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Curated Memory Features',
        description:
          'Year-in-review, "On This Day", or memory features that selectively surface positive moments',
        howToSpot:
          'Look for retrospective features that highlight achievements and milestones while omitting negative events',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Delayed Re-engagement',
        description:
          'Win-back campaigns or re-engagement flows that include intentional delays after churn',
        howToSpot:
          'Check the timing gap between user churn and first re-engagement contact; look for personalized positive memory cues',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Nostalgia-Oriented Content',
        description:
          'Content that evokes warm, positive memories of past interactions with the product',
        howToSpot:
          'Look for warm color palettes, achievement highlights, "remember when" language, and progress summaries',
        severity: ImpactLevel.LOW,
      },
      {
        name: 'Feedback Timing Patterns',
        description:
          'Satisfaction surveys or NPS prompts timed relative to specific user events',
        howToSpot:
          'Check if feedback collection is triggered by positive events or delayed after negative ones',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Positive Peak Prompting',
        description: 'Triggering review requests, feedback, or engagement prompts only during or immediately after positive user experiences',
        indicators: ['Review prompts after task completion', 'Rating requests after milestone achievements', 'Feedback surveys after positive outcomes', 'Upsell offers after successful feature use'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Memory Curation Pattern',
        description: 'Retrospective features that filter and curate past events to emphasize positive moments',
        indicators: ['Year-in-review with only positive highlights', 'Achievement timelines omitting setbacks', 'Photo memories using sentiment detection', 'Progress summaries focusing on growth'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Delayed Re-engagement Pattern',
        description: 'Intentional waiting period between negative events and follow-up contact',
        indicators: ['Multi-week delay before win-back emails', 'Gradual re-engagement sequences', 'Leading with positive memories in return messaging', 'Addressing pain points without dwelling on them'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Nostalgia Reinforcement Pattern',
        description: 'Using nostalgia and positive memory to strengthen product attachment and loyalty',
        indicators: ['Anniversary notifications of account creation', 'Progress comparison (then vs now)', 'Milestone celebration features', '"Remember your first" moments'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'When are review or rating prompts triggered — after positive events or randomly?',
      'Do memory or retrospective features curate for positive moments?',
      'How much time passes between user churn and re-engagement contact?',
      'Do win-back messages lead with the user\'s positive history?',
      'Are feedback surveys timed to capture constructive rather than reactionary responses?',
      'Do nostalgia features avoid resurfacing negative past events?',
      'Is there a mechanism to detect user emotional state before prompting?',
      'Are "year in review" or "highlights" features filtered for positivity?',
      'Does the re-engagement strategy account for natural emotional fading?',
      'Are we collecting both immediate and delayed feedback to get a complete picture?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Fading Affect Bias.

Analyze the provided design for Fading Affect Bias patterns. Identify:

1. **Review Timing**: When are users prompted for reviews, ratings, or feedback relative to their emotional state?
2. **Memory Curation**: Are retrospective features (year-in-review, memories, timelines) curated for positive affect?
3. **Re-engagement Timing**: Is there intentional delay between negative experiences and re-engagement attempts?
4. **Nostalgia Features**: Are there features that leverage positive memory persistence for engagement?
5. **Feedback Timing**: When is feedback collected — during frustration, after resolution, or at natural positive peaks?

For each pattern found:
- Identify whether it aligns with or works against FAB principles
- Assess whether the timing helps users or manipulates them
- Determine if negative experiences are being properly addressed (not just hidden)
- Evaluate ethical implications of the timing strategy
- Suggest improvements for FAB-aligned interaction timing

Consider:
- Is review timing optimized for genuine positive moments, not manipulative delay?
- Are memory features curating ethically, or suppressing legitimate concerns?
- Does re-engagement timing respect the user's decision to leave?
- Are both immediate and delayed feedback channels available?
- Is the design using FAB to improve user experience or to game metrics?

Provide actionable recommendations for ethical, effective use of Fading Affect Bias.`,

    outputSchema: {
      type: 'object',
      properties: {
        fadingAffectPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              timing: { type: 'string' },
              emotionalAlignment: { type: 'string' },
              effectOnUser: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'timing',
              'emotionalAlignment',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            reviewTimingScore: { type: 'number' },
            memoryCurationScore: { type: 'number' },
            reengagementTimingScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'reviewTimingScore',
            'memoryCurationScore',
            'reengagementTimingScore',
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
        'fadingAffectPatterns',
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
        title: 'Map Emotional Peaks and Valleys',
        description:
          'Identify the positive and negative emotional moments in your user journey',
        example:
          'Positive peaks: task completion, milestone reached, positive feedback received. Valleys: errors, failed saves, billing friction.',
        tips: [
          'Use analytics to identify where users succeed and where they struggle',
          'Map the emotional arc of key user flows',
          'Identify natural positive moments that occur regularly',
        ],
      },
      {
        step: 2,
        title: 'Design Positive-Peak Triggers',
        description:
          'Create trigger conditions for review prompts and feedback requests that fire during positive moments',
        example:
          'Trigger review prompt when: user completes 10th task, achieves a streak, receives praise from a collaborator',
        tips: [
          'Use multiple positive signals, not just one',
          'Ensure the trigger feels natural, not forced',
          'Don\'t interrupt the positive flow — complement it',
        ],
      },
      {
        step: 3,
        title: 'Build Curated Memory Features',
        description:
          'Create retrospective features that surface positive moments while letting negative ones stay faded',
        example:
          'Year-in-review showing: top achievements, growth metrics, favorite content, milestones reached',
        tips: [
          'Use sentiment analysis or event categorization to filter content',
          'Focus on user achievements, not product features',
          'Make memories shareable to amplify positive associations',
        ],
      },
      {
        step: 4,
        title: 'Implement Delayed Re-engagement',
        description:
          'Design re-engagement campaigns with intentional delays to allow negative emotions to fade',
        example:
          'Win-back sequence: 3-week delay, then email highlighting user\'s best moments + product improvements',
        tips: [
          'Test different delay periods (2-6 weeks) for your context',
          'Lead with the user\'s positive history, not discounts',
          'Address likely pain points subtly, showing improvements made',
        ],
      },
      {
        step: 5,
        title: 'Dual Feedback Collection',
        description:
          'Collect both immediate and delayed feedback to get a complete picture while leveraging FAB ethically',
        example:
          'Immediate: "Was this interaction resolved?" (for product improvement). Delayed: "How would you rate your overall experience?" (for satisfaction)',
        tips: [
          'Use micro-feedback (thumbs up/down) during pain points for product improvement',
          'Save formal reviews and NPS for positive moments',
          'Compare immediate vs. delayed feedback to understand FAB\'s effect in your context',
        ],
      },
    ],

    dos: [
      'Time review prompts to coincide with positive achievements and milestones',
      'Curate memory features to emphasize positive moments and growth',
      'Allow sufficient time for negative emotions to fade before re-engagement',
      'Lead win-back campaigns with the user\'s own positive history',
      'Collect both immediate and delayed feedback for a complete picture',
      'Use nostalgia features to strengthen positive product associations',
      'Make memory and retrospective features shareable',
      'Address product issues independently of FAB-timed interactions',
    ],

    donts: [
      'Don\'t prompt for reviews during error states or frustrating moments',
      'Don\'t send win-back emails immediately after frustrated cancellation',
      'Don\'t use FAB timing to suppress legitimate negative feedback',
      'Don\'t surface negative past events in memory or nostalgia features',
      'Don\'t delay critical safety feedback to wait for emotions to fade',
      'Don\'t game satisfaction scores by only collecting feedback after positive moments',
      'Don\'t ignore the actual product problems that cause negative experiences',
      'Don\'t rely solely on FAB timing — fix the root causes of user frustration',
    ],

    bestPractices: [
      {
        title: 'Emotional State Detection',
        description:
          'Use behavioral signals (task completion, error frequency, session duration) to infer user emotional state before prompting',
        rationale:
          'Accurate emotional state detection is the foundation of effective FAB-aligned interaction timing',
        example:
          'Track: successful saves, completed tasks, streak continuations, and positive social interactions as positive signals',
      },
      {
        title: 'Positive Memory Reinforcement',
        description:
          'Periodically surface users\' past achievements and positive moments to strengthen product attachment',
        rationale:
          'FAB naturally fades negative associations; reinforcing positive ones compounds the effect',
        example:
          'Monthly "Your Progress" emails highlighting achievements, growth metrics, and positive milestones',
      },
      {
        title: 'Fix Then Leverage',
        description:
          'Always address the root causes of negative experiences, then leverage FAB for the residual emotional management',
        rationale:
          'FAB should complement product improvement, not replace it; using it to mask real problems is unethical and unsustainable',
        example:
          'Fix the bug that causes frustration, THEN time the review prompt for after the fix is deployed and the user has a positive experience',
      },
      {
        title: 'Calibrated Delay Periods',
        description:
          'Test and calibrate the optimal delay period for re-engagement in your specific context',
        rationale:
          'The rate of affect fading varies by severity; minor annoyances fade in days, major frustrations take weeks',
        example:
          'A/B test win-back emails at 1, 2, 3, and 4 weeks post-churn to find the optimal window',
      },
      {
        title: 'Transparent Memory Curation',
        description:
          'When curating memory features, be transparent about the selection criteria',
        rationale:
          'Users appreciate knowing that highlights are curated, rather than thinking they represent a complete record',
        example:
          'Label year-in-review as "Your Highlights" rather than "Your Year" to signal curation',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Memory and nostalgia features must be semantically structured',
        implementation:
          'Use proper heading levels, landmarks, and semantic HTML so memory features are navigable by screen readers. Achievement badges need meaningful alt text.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Review prompts should not auto-dismiss',
        implementation:
          'Review prompts triggered at positive peaks should remain available for the user to act on at their pace, not disappear after a timeout.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Memory features relying on images need text alternatives',
        implementation:
          'Photo memories and visual retrospectives must include descriptive alt text so all users can experience the positive memory reinforcement.',
      },
    ],

    ethics: [
      {
        concern: 'Suppressing Legitimate Feedback',
        severity: 'critical',
        explanation:
          'Using FAB timing to avoid collecting negative feedback prevents real product problems from being identified and fixed',
        mitigation:
          'Always maintain immediate feedback channels for negative experiences (bug reports, support tickets). Use FAB timing only for formal reviews and satisfaction surveys, not for product improvement feedback.',
      },
      {
        concern: 'Manipulating Review Scores',
        severity: 'high',
        explanation:
          'Systematically only prompting for reviews at positive peaks artificially inflates ratings and misleads potential users',
        mitigation:
          'While timing reviews at positive moments is reasonable, also provide easy access to review at any time. Don\'t suppress or hide review options during negative experiences.',
      },
      {
        concern: 'Ignoring Root Causes',
        severity: 'high',
        explanation:
          'Relying on FAB to "erase" negative experiences instead of fixing the underlying product problems',
        mitigation:
          'Treat FAB as a timing optimization, not a substitute for product quality. Track and address all sources of user frustration regardless of whether they fade from memory.',
      },
      {
        concern: 'Predatory Re-engagement',
        severity: 'medium',
        explanation:
          'Using FAB timing to re-engage users who left for good reasons, exploiting their faded negative memories',
        mitigation:
          'Respect user decisions to leave. Re-engagement should offer genuine improvements, not just exploit memory fading. Honor unsubscribe and deletion requests immediately.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Fading Affect Bias in Autobiographical Memory',
        author: 'Walker, W. R., Skowronski, J. J., & Thompson, C. P.',
        year: 2003,
        doi: '10.1080/741938208',
        description:
          'The foundational paper establishing the Fading Affect Bias and demonstrating that negative emotions fade faster than positive ones in autobiographical memory',
        type: 'foundational',
      },
      {
        title: 'Why Do We Remember? The Communicative Function of Episodic Memory',
        author: 'Ritchie, T. D., Skowronski, J. J., Hartnett, J., Wells, B., & Walker, W. R.',
        year: 2006,
        description:
          'Extended FAB research showing how social sharing of memories contributes to asymmetric affect fading and the communicative role of emotional memory',
        type: 'advanced',
      },
      {
        title: 'Life Is Pleasant — and Memory Helps to Keep It That Way!',
        author: 'Walker, W. R., Skowronski, J. J., & Thompson, C. P.',
        year: 2003,
        doi: '10.1037/1089-2680.7.2.203',
        description:
          'Comprehensive review of the positivity bias in autobiographical memory, establishing FAB as a robust and universal phenomenon',
        type: 'foundational',
      },
      {
        title: 'The Fading Affect Bias: Effects of Social Disclosure to an Interactive vs. Non-Interactive Listener',
        author: 'Skowronski, J. J., Gibbons, J. A., Vogl, R. J., & Walker, W. R.',
        year: 2004,
        description:
          'Research on how social disclosure moderates the fading of negative affect, with implications for social features in product design',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores how people mispredict future emotions and misremember past ones, with extensive discussion of affective forecasting errors related to FAB',
        type: 'practical',
      },
      {
        title: 'The Power of Moments',
        author: 'Heath, Chip & Dan',
        year: 2017,
        isbn: '9781501147760',
        description:
          'Practical guide to creating peak positive moments that persist in memory — directly applicable to designing FAB-aligned user experiences',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'When to Ask for App Store Reviews',
        author: 'Apple Developer Documentation',
        url: 'https://developer.apple.com/documentation/storekit/requesting_app_store_reviews',
        description:
          'Apple\'s official guidance on timing review prompts, which implicitly leverages FAB principles by recommending prompts after positive interactions',
        type: 'practical',
      },
      {
        title: 'The Psychology of User Retention',
        author: 'Nir Eyal',
        url: 'https://www.nirandfar.com/',
        description:
          'Practical insights on user retention that align with FAB principles, including timing re-engagement and building positive memory associations',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We Remember Things as Better Than They Were',
        author: 'Psych2Go',
        url: 'https://www.youtube.com/results?search_query=fading+affect+bias',
        description:
          'Accessible explanation of the Fading Affect Bias and its role in shaping how we remember past experiences',
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
      'peak-end-rule',       // Peak moments persist; FAB fades the valleys
      'rosy-retrospection',  // Both create positivity bias in memory
      'nostalgia-effect',    // FAB enables nostalgia by fading negative associations
      'mere-exposure-effect', // Repeated positive exposure + FAB strengthens attachment
    ],

    conflicts: [
      'negativity-bias',     // Negativity bias makes negative events salient initially; FAB fades them over time
      'availability-heuristic', // Recent negative events are available before FAB has time to work
    ],

    confusedWith: [
      'rosy-retrospection',  // Related but distinct: rosy retrospection is the overall tendency; FAB is the mechanism
      'positivity-bias',     // FAB is specifically about fading, not initial encoding
      'nostalgia-effect',    // Nostalgia is an emotional response; FAB is the underlying memory process
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'rosy-retrospection',
        'nostalgia-effect',
      ],
    },
  },
};
