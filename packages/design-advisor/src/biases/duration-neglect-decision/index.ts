/**
 * DURATION NEGLECT (DECISION)
 *
 * People ignore the duration of an experience when evaluating it,
 * relying instead on peak and end moments to guide future decisions.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const durationNeglectDecision: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'duration-neglect-decision',
    name: 'Duration Neglect (Decision)',
    aliases: ['Duration Insensitivity', 'Peak-End Decision Bias', 'Temporal Neglect'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'duration',
      'peak-end',
      'experience-evaluation',
      'time-perception',
      'memory',
      'trials',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'When deciding about future experiences, we ignore how long they lasted and judge them by their peak intensity and how they ended.',

    detailed: `Duration neglect in decision-making describes the systematic tendency to disregard the total duration of an experience when evaluating it retrospectively and when making decisions about future experiences. Instead, people rely on the peak (most intense moment) and end (final moments) of an experience to form their overall evaluation.

This means a short, intensely positive experience is consistently preferred over a longer but moderately positive one, even when the longer experience objectively delivers more total value. Conversely, a brief painful experience that ends well is evaluated more favorably than a longer painful experience, regardless of total suffering.

In product and UX design, duration neglect profoundly affects how users evaluate trials, demos, subscriptions, and any time-bounded experience. Designers who understand this bias can craft shorter, more impactful experiences that users rate higher than longer, diffuse ones. The key decision-making implication is that users choose future experiences based on remembered peaks and endings, not on actual duration or cumulative value.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman, Barbara Fredrickson, and colleagues',
      year: 1993,
      theory: 'Peak-End Rule and Duration Neglect',
      mechanism: `The brain evaluates past experiences using a snapshot model rather than integrating over time. This happens because:

1. **Peak Encoding**: The most emotionally intense moment of an experience is encoded with disproportionate weight in memory
2. **End-State Anchoring**: The final moments of an experience serve as the retrieval cue and anchor for overall evaluation
3. **Temporal Compression**: Memory compresses extended experiences into representative moments, discarding duration information
4. **Snapshot Averaging**: The brain averages key moments (peak + end) rather than summing total utility over time
5. **Decision by Recall**: Future decisions rely on recalled evaluations, not on objective duration data, perpetuating the neglect`,
    },

    realWorldExample: `In Kahneman's classic cold-pressor experiment (1993), participants immersed their hands in painfully cold water. Trial A lasted 60 seconds at 14°C. Trial B lasted 90 seconds: 60 seconds at 14°C followed by 30 additional seconds where the water was secretly warmed to 15°C. When asked which trial to repeat, most participants chose Trial B—the objectively longer and more painful experience—because it ended on a slightly less painful note. Duration was completely neglected; only the peak pain and the improved ending influenced their decision.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Duration neglect in decision-making affects how users evaluate and choose between experiences of different lengths. Designers can leverage this to:

- Craft shorter, higher-impact product demos that outperform longer, comprehensive ones
- Optimize trial periods for memorable peaks rather than extended access
- Structure onboarding to deliver intense value moments rather than gradual coverage
- Design subscription value communication around peak experiences, not cumulative hours
- End every user session on a high note to improve re-engagement decisions`,

    whenToUse: [
      {
        title: 'Product Demos and Walkthroughs',
        scenario:
          'When introducing a product to prospects or new users',
        example:
          'Create a 5-minute demo that showcases one transformative "wow" moment, rather than a 30-minute tour of all features',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Free Trial Design',
        scenario: 'When structuring trial periods and trial experiences',
        example:
          'Design a 7-day trial with a guided "peak moment" on day 1 and a compelling closing experience on day 7, rather than a passive 30-day trial',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Subscription Value Communication',
        scenario: 'When justifying ongoing subscription costs to users',
        example:
          'Highlight the single most impactful result achieved this month rather than listing cumulative hours of usage',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Conference and Event Design',
        scenario: 'When planning talks, workshops, or webinars',
        example:
          'A 15-minute talk with one powerful insight and a strong closing is rated higher than a 45-minute talk covering everything',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Session Endings',
        scenario: 'When designing how user sessions conclude',
        example:
          'Show a personalized achievement summary or positive progress update as the last thing users see before leaving',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Time-Based Pricing Justification',
        reason:
          'If your pricing is explicitly tied to duration (hourly billing, monthly seat costs), exploiting duration neglect undermines trust',
        consequence:
          'Users feel deceived when they realize they are paying for time but being evaluated on moments',
        alternative:
          'Be transparent about time-based costs while also highlighting peak value delivered',
      },
      {
        title: 'Safety-Critical Training',
        reason:
          'Shortening training for a better "peak" can leave users underprepared for critical tasks',
        consequence:
          'Users feel confident after a short, intense training but lack the depth needed for safety',
        alternative:
          'Maintain required training duration and use peak moments to reinforce key safety concepts within that timeframe',
      },
      {
        title: 'Complex Skill Development',
        reason:
          'Duration neglect can lead users to undervalue necessary practice time',
        consequence:
          'Users abandon long-form learning because short courses "felt" more valuable',
        alternative:
          'Structure long courses with multiple peak moments and satisfying intermediate endings',
      },
      {
        title: 'Medical or Therapeutic Contexts',
        reason:
          'Patients may choose shorter treatments that "felt better" over longer ones that are more effective',
        consequence:
          'Suboptimal health outcomes driven by peak-end memory rather than clinical efficacy',
        alternative:
          'Present treatment efficacy data alongside patient experience, clarifying that duration matters for outcomes',
      },
    ],

    commonMistakes: [
      {
        title: 'Extending Experiences Without Adding Peaks',
        description:
          'Making a demo, trial, or onboarding longer without adding any memorable high points',
        why: 'Longer durations without peaks dilute the overall evaluation; users remember a flat, unmemorable experience',
        fix: 'If you extend an experience, add a new peak moment. If you cannot add a peak, keep it shorter.',
      },
      {
        title: 'Neglecting the Ending',
        description:
          'Letting experiences trail off with administrative tasks, surveys, or loading screens',
        why: 'The end moment has outsized influence on overall evaluation and future decisions',
        fix: 'End every experience with a positive moment: a summary of progress, a reward, or an uplifting message',
      },
      {
        title: 'Equating More Time with More Value',
        description:
          'Assuming a 30-day trial is inherently better than a 7-day trial because it offers more time',
        why: 'Users do not sum value over time; a long, flat trial is evaluated lower than a short, intense one',
        fix: 'Design trials around peak experiences and satisfying endings, not around maximum duration',
      },
      {
        title: 'Spreading Value Too Thin',
        description:
          'Distributing impressive features evenly across a long experience instead of concentrating them',
        why: 'Evenly distributed value creates no peak, leading to a mediocre overall evaluation',
        fix: 'Concentrate your most impressive moments into clear peaks, even if other moments are simpler',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout structures the temporal sequence of experience, determining where peaks and endings occur',
        examples: [
          'Hero sections that deliver an immediate peak moment on arrival',
          'Page structures that build to a climactic feature reveal',
          'Footer or closing sections designed to leave a positive final impression',
          'Step-by-step flows where the last step is the most rewarding',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography can emphasize peak moments and create memorable high points',
        examples: [
          'Large, bold headings at key "peak" moments to increase emotional intensity',
          'Typographic crescendo that builds toward a climactic statement',
          'Summary text at experience endings that reinforces positive takeaways',
          'Pull quotes highlighting the single most impactful outcome',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can amplify the emotional intensity of peak moments and endings',
        examples: [
          'Vibrant accent colors reserved for peak value moments',
          'Gradient transitions that build visual intensity toward a climax',
          'Warm, positive colors in closing screens and session summaries',
          'Muted tones for routine content to create contrast with peak moments',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines the temporal structure of the experience and where peaks occur',
        examples: [
          'Onboarding flows that front-load the "aha" moment rather than burying it',
          'Session endings that present achievement summaries or progress celebrations',
          'Demo interactions designed around a single transformative action',
          'Trial experiences that orchestrate a peak moment early and a strong close',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy determines whether experiences have memorable peaks or flatten into uniformity',
        examples: [
          'Case studies that lead with the single most dramatic result rather than comprehensive timelines',
          'Newsletters that open or close with the most impactful insight',
          'Tutorial content structured around one breakthrough moment per session',
          'Value recaps at experience endings that highlight the peak achievement',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible experiences must ensure peak moments and satisfying endings are perceivable by all users',
        examples: [
          'Screen reader announcements at peak moments to ensure non-visual users experience the high point',
          'Haptic feedback or audio cues at peak and end moments for multi-modal reinforcement',
          'Ensuring progress summaries and closing messages are accessible and not purely visual',
          'Keyboard-navigable celebration or achievement moments at experience endings',
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
        title: 'High-Impact Short Demo Over Comprehensive Tour',
        description:
          'A SaaS product that replaced a 30-minute feature tour with a 5-minute guided "magic moment" demo',
        code: `<div class="demo-experience">
  <section class="demo-intro">
    <h2>See the magic in 5 minutes</h2>
    <p>We'll show you the one thing that changes everything.</p>
  </section>

  <section class="demo-peak">
    <h3>Your data, transformed</h3>
    <div class="before-after">
      <div class="before">
        <span class="label">Your messy spreadsheet</span>
        <img src="messy-data.png" alt="Unorganized spreadsheet data">
      </div>
      <div class="after highlight">
        <span class="label">One click later</span>
        <img src="clean-dashboard.png" alt="Beautiful interactive dashboard">
      </div>
    </div>
    <p class="result">That report that took 4 hours? Done in 10 seconds.</p>
  </section>

  <section class="demo-end">
    <h3>Ready to try it with your own data?</h3>
    <button class="primary">Start Your Free Trial</button>
    <p class="reassurance">No credit card needed. Your dashboard in 2 minutes.</p>
  </section>
</div>`,
        explanation:
          'The 5-minute demo creates one powerful peak (the before/after transformation) and ends on an empowering note (try it yourself). Users rate this far higher than a thorough 30-minute tour because they remember the peak and ending, not the duration.',
        principle:
          'A short experience with a clear peak and strong ending is evaluated higher than a longer, flatter experience',
        metrics: {
          before: '30-min tour: 18% trial conversion, 3.2/5 satisfaction',
          after: '5-min peak demo: 34% trial conversion, 4.6/5 satisfaction',
          improvement: '89% increase in trial conversion; satisfaction up 44%',
        },
      },
      {
        title: 'Quality-Concentrated Trial Period',
        description:
          'A productivity app that shortened its trial from 30 days to 7 days with orchestrated peak and closing experiences',
        code: `<div class="trial-journey">
  <!-- Day 1: Orchestrated Peak -->
  <div class="trial-day day-1 peak">
    <h3>Day 1: Your First Win</h3>
    <div class="guided-task">
      <p>Let's complete your first project in under 3 minutes.</p>
      <div class="progress-celebration">
        <span class="confetti-icon">&#127881;</span>
        <p><strong>You just did in 3 minutes what used to take 2 hours.</strong></p>
      </div>
    </div>
  </div>

  <!-- Days 2-6: Steady value -->
  <div class="trial-days middle">
    <p>Continue exploring at your own pace...</p>
  </div>

  <!-- Day 7: Strong ending -->
  <div class="trial-day day-7 ending">
    <h3>Your Trial in Review</h3>
    <div class="impact-summary">
      <div class="stat">
        <span class="number">4.2 hours</span>
        <span class="label">saved this week</span>
      </div>
      <div class="stat highlight">
        <span class="number">12 projects</span>
        <span class="label">completed</span>
      </div>
    </div>
    <p><strong>Keep this momentum going?</strong></p>
    <button class="primary">Subscribe Now</button>
  </div>
</div>`,
        explanation:
          'The 7-day trial creates a powerful peak on Day 1 (instant gratification) and a satisfying end on Day 7 (impact summary). Users evaluate this trial more favorably than a 30-day trial where they drift without guided peak moments.',
        principle:
          'Orchestrated peaks and endings in shorter trials outperform longer passive trials',
        metrics: {
          before: '30-day passive trial: 8% conversion to paid',
          after: '7-day guided trial: 22% conversion to paid',
          improvement: '175% increase in trial-to-paid conversion',
        },
      },
      {
        title: 'Session Ending with Achievement Summary',
        description:
          'An analytics platform that ends every session with a personalized value recap',
        code: `<div class="session-end-overlay">
  <h3>Great session!</h3>
  <div class="session-recap">
    <div class="peak-moment">
      <span class="label">Your biggest insight today</span>
      <p class="insight">"Churn risk dropped 12% after the onboarding change you identified."</p>
    </div>
    <div class="session-stats">
      <span>3 dashboards reviewed</span>
      <span>1 critical insight found</span>
      <span>2 actions taken</span>
    </div>
  </div>
  <p class="closing">See you next time. Your data will keep working while you're away.</p>
</div>`,
        explanation:
          'By ending every session with the peak insight and a positive summary, users remember each session favorably. This drives re-engagement because the decision to return is based on remembered peak and ending, not total session duration.',
        principle:
          'Positive endings drive re-engagement decisions regardless of session length',
      },
    ],

    bad: [
      {
        title: 'Long, Flat Demo with No Peak',
        description:
          'A 45-minute product demo that methodically covers every feature at equal depth',
        code: `<!-- DON'T DO THIS -->
<div class="demo-tour">
  <h2>Complete Product Tour (45 min)</h2>
  <ol class="feature-list">
    <li>Feature 1: User Management (5 min)</li>
    <li>Feature 2: Data Import (5 min)</li>
    <li>Feature 3: Report Builder (5 min)</li>
    <li>Feature 4: Dashboard Setup (5 min)</li>
    <li>Feature 5: Integrations (5 min)</li>
    <li>Feature 6: Settings (5 min)</li>
    <li>Feature 7: Billing (5 min)</li>
    <li>Feature 8: Support Options (5 min)</li>
    <li>Feature 9: Admin Panel (5 min)</li>
  </ol>
  <p>Thank you for watching. Any questions?</p>
</div>`,
        explanation:
          'Every feature gets equal time, creating no peak moment. The ending is flat and unmemorable. Users will evaluate this 45-minute investment as mediocre because there was no high point and no satisfying conclusion, despite covering far more material.',
        principle:
          'Equal distribution of value across time creates no peak, leading to poor overall evaluation',
      },
      {
        title: 'Extended Trial That Trails Off',
        description:
          'A 60-day trial with no guided experiences and a harsh expiration cutoff',
        code: `<!-- DON'T DO THIS -->
<div class="trial-expired">
  <h2>Your trial has expired</h2>
  <p>Your 60-day free trial ended today.
  All your data will be deleted in 30 days.</p>
  <p>Upgrade to keep access.</p>
  <button>View Pricing</button>
</div>`,
        explanation:
          'The 60-day trial had no orchestrated peak moments, and it ends with a threatening deletion notice. Users remember only the negative ending and the absence of standout moments, making them less likely to convert despite having 60 days of access.',
        principle:
          'Long trials without peaks and with negative endings are evaluated worse than short, well-designed ones',
      },
      {
        title: 'Quantity Over Quality Content Strategy',
        description:
          'An educational platform promoting "500 hours of content" as its key value proposition',
        code: `<!-- DON'T DO THIS -->
<div class="value-proposition">
  <h2>500+ Hours of Video Content!</h2>
  <p>Our library contains more content than any competitor.</p>
  <ul>
    <li>200 hours of beginner content</li>
    <li>180 hours of intermediate content</li>
    <li>120 hours of advanced content</li>
  </ul>
  <p>That's 62.5 full days of learning!</p>
  <button>Start Your Journey</button>
</div>`,
        explanation:
          'Leading with duration (500 hours) as the value proposition ignores how users actually evaluate learning experiences. Users remember their single best learning moment and how they felt when they last used the platform, not how many hours they could access.',
        principle:
          'Duration-based value propositions are ineffective because users evaluate experiences by peaks, not by total time',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Keynote Product Launches',
        description: 'Apple keynotes are precisely timed with one or two dramatic "one more thing" peak moments and a strong closing. Despite being shorter than competitor events, they are rated higher and drive more purchasing intent. The peak reveal and satisfying ending dominate user evaluations.',
        effectiveness: 'very-effective',
        analysis: 'Apple leverages duration neglect by concentrating emotional intensity into peak moments rather than extending event length. The "one more thing" is the peak; the product availability announcement is the satisfying ending.',
      },
      {
        company: 'Duolingo',
        product: 'Lesson Structure',
        description: 'Duolingo lessons are deliberately short (3-5 minutes) with a peak moment (streak celebration or XP reward) and a satisfying ending (progress bar completion, congratulatory animation). Users prefer these short, peaked lessons over longer study sessions.',
        effectiveness: 'very-effective',
        analysis: 'By keeping lessons short and concentrating celebration into peaks and endings, Duolingo ensures every session is remembered positively, driving the decision to return. A 5-minute peaked session drives more re-engagement than a 30-minute flat study session.',
      },
      {
        company: 'TED',
        product: 'TED Talks (18-Minute Format)',
        description: 'TED enforces an 18-minute maximum for talks, forcing speakers to create one powerful peak idea and deliver a memorable closing. Attendees consistently rate these short, intense talks higher than longer conference presentations covering more material.',
        effectiveness: 'very-effective',
        analysis: 'The 18-minute constraint forces peak concentration. Speakers must identify their single strongest moment and craft a strong ending. Duration neglect means the shorter format is evaluated more favorably than longer talks with more content but less intensity.',
      },
      {
        company: 'Peloton',
        product: 'Class Structure',
        description: 'Peloton offers 20-minute classes alongside 45-minute ones. The 20-minute classes have concentrated intensity peaks and celebratory endings. Despite being shorter, they often receive equal or higher satisfaction ratings.',
        effectiveness: 'effective',
        analysis: 'Peloton demonstrates that workout satisfaction is driven by peak effort moments and how the class ends (cool-down celebration, personal records) rather than total workout duration.',
      },
    ],

    abTests: [
      {
        title: 'Trial Length: 7-Day Peak vs 30-Day Passive',
        hypothesis:
          'A shorter trial with orchestrated peak and ending will convert better than a longer passive trial',
        controlVersion: {
          description:
            '30-day free trial with self-guided exploration, standard expiration email',
          metrics: {
            conversionRate: '8.2%',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            '7-day trial with Day 1 guided peak moment, daily tips, and Day 7 personalized impact summary',
          metrics: {
            conversionRate: '21.5%',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The 7-day trial with orchestrated peak (Day 1 guided "aha" moment) and strong ending (Day 7 value recap) converted 162% better than the 30-day passive trial. Post-trial surveys showed users of the short trial rated their experience 4.4/5 vs 3.1/5 for the long trial, despite having less access time.',
          learnings: [
            'Shorter trials with orchestrated peaks outperform longer passive ones',
            'Users do not factor total access time into their evaluation',
            'A strong ending (impact summary) is critical for the conversion decision',
            'Day 1 "aha" moment establishes the peak that dominates memory',
          ],
        },
      },
      {
        title: 'Demo Length: 5-Minute Peak vs 25-Minute Comprehensive',
        hypothesis:
          'A short demo with one dramatic reveal will generate more trials than a long comprehensive demo',
        controlVersion: {
          description:
            '25-minute recorded demo covering 8 features with equal depth, ending with a pricing slide',
          metrics: {
            conversionRate: '12.3%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            '5-minute demo focused on one transformative before/after moment, ending with "try it yourself" CTA',
          metrics: {
            conversionRate: '28.7%',
            clickThroughRate: '42%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The 5-minute peak demo more than doubled conversion. Users who watched the short demo could articulate what the product does more clearly than those who watched the 25-minute version. The single transformative moment created a stronger memory trace than 8 evenly-weighted features.',
          learnings: [
            'One powerful moment is more memorable than eight adequate ones',
            'Demo completion rates were dramatically higher for the short version (92% vs 34%)',
            'Users recalled the peak moment weeks later, driving delayed conversions',
            'Ending with empowerment ("try it yourself") outperformed ending with pricing',
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
        name: 'Duration-Based Value Claims',
        description:
          'Headlines or badges promoting total hours, days, or length as the primary value proposition',
        howToSpot:
          'Look for "500+ hours of content", "30-day trial", "3-hour masterclass" used as selling points without peak moments',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Flat Experience Timelines',
        description:
          'Step-by-step flows or timelines where every step has equal visual weight and no climax',
        howToSpot:
          'Check onboarding flows, demos, or tutorials for uniform step sizing with no highlighted peak moment',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Weak or Negative Endings',
        description:
          'Experiences that end with administrative tasks, surveys, error states, or abrupt cutoffs',
        howToSpot:
          'Look at the final screen of any flow: is it a positive moment or a form, warning, or dead end?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Peak Moments',
        description:
          'Flows where content is evenly distributed with no standout moment of delight or transformation',
        howToSpot:
          'Walk through the experience and ask: "What is the single most memorable moment?" If nothing stands out, there is no peak.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Cumulative Metrics Without Highlights',
        description:
          'Dashboards or summaries showing only totals (total time, total sessions) without peak achievements',
        howToSpot:
          'Check if activity summaries show "You spent 12 hours this month" vs "Your biggest win this month was..."',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Duration-as-Value Pattern',
        description: 'Using experience length as the primary selling point (e.g., "30-day trial", "100+ hours")',
        indicators: ['Trial length prominently displayed', 'Content hours as headline metric', 'Extended access as the main differentiator', 'Time-based comparison with competitors'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Flat Experience Pattern',
        description: 'Experiences designed with uniform intensity and no orchestrated peak moments',
        indicators: ['Equal time/space for all features in demos', 'Onboarding steps of identical weight', 'Even distribution of value across timeline', 'No "aha moment" designed into the flow'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Trailing-Off Ending Pattern',
        description: 'Experiences that end weakly with administrative tasks or negative messages',
        indicators: ['Trial expiration with deletion warnings', 'Sessions ending on settings or billing pages', 'Onboarding ending with a generic "you\'re done" message', 'Surveys or feedback forms as the last experience'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Peak-Buried Pattern',
        description: 'The most impressive or valuable moment is buried deep in a long experience instead of being highlighted',
        indicators: ['Best feature shown as item 7 of 12 in a demo', 'Key insight buried mid-article with no emphasis', 'Wow moment occurs after most users have dropped off', 'Strongest testimonial placed below the fold'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What is the single most memorable moment in this experience?',
      'How does this experience end? Is the ending positive and satisfying?',
      'Are we selling duration (hours, days) instead of peak value?',
      'If this experience were half as long, would users evaluate it the same or better?',
      'Is there a clear "aha moment" designed into the flow?',
      'Does the trial or demo have an orchestrated peak, or is value evenly distributed?',
      'What will users remember about this experience one week later?',
      'Is the ending administrative (survey, settings) or celebratory (achievement, insight)?',
      'Are we assuming more time = more value, which users actually do not perceive?',
      'Have we designed both the peak AND the ending intentionally?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in duration neglect and the peak-end rule in decision-making contexts.

Analyze the provided design for duration neglect patterns. Identify:

1. **Duration-Based Value Claims**: Where experience length is used as a selling point
2. **Peak Moments**: Whether the experience has a designed "aha" or high-intensity moment
3. **Ending Quality**: How the experience concludes and whether it leaves a positive final impression
4. **Temporal Structure**: Whether value is concentrated or evenly distributed over time
5. **Re-engagement Triggers**: What users will remember that drives return decisions

For each pattern found:
- Identify whether duration is being neglected by design or by accident
- Assess whether the experience has a clear peak moment
- Evaluate the quality of the ending experience
- Determine if the temporal structure optimizes for remembered utility
- Suggest improvements for peak-end optimization

Consider:
- Is the experience relying on duration as a value proposition?
- Would a shorter, more intense version be evaluated more favorably?
- Does the experience end on a high note or trail off?
- Are there peak moments, or is intensity flat throughout?
- How will the remembered experience influence future decisions?

Provide actionable recommendations for designing peaks, endings, and optimal duration.`,

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
              currentDuration: { type: 'string' },
              peakMoment: { type: 'string' },
              endingQuality: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'peakMoment',
              'endingQuality',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            peakIntensity: { type: 'number' },
            endingQuality: { type: 'number' },
            durationEfficiency: { type: 'number' },
            memorabilityScore: { type: 'number' },
          },
          required: [
            'peakIntensity',
            'endingQuality',
            'durationEfficiency',
            'memorabilityScore',
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
        title: 'Identify the Peak Moment',
        description:
          'Determine the single most impressive, transformative, or emotionally resonant moment your product can deliver',
        example:
          'For an analytics tool: the moment a user sees their messy data transformed into a beautiful, actionable dashboard',
        tips: [
          'Ask users what they remember most about your product',
          'Look for "aha moments" in user session recordings',
          'The peak should be emotionally resonant, not just functionally impressive',
        ],
      },
      {
        step: 2,
        title: 'Front-Load the Peak',
        description:
          'Move the peak moment as early in the experience as possible so more users encounter it',
        example:
          'Show the dashboard transformation in minute 2 of the demo, not minute 25',
        tips: [
          'Every user who drops off before the peak never experiences it',
          'Early peaks increase completion rates for the rest of the experience',
          'The peak sets expectations and motivation for continued engagement',
        ],
      },
      {
        step: 3,
        title: 'Design the Ending',
        description:
          'Craft a deliberately positive final experience that reinforces the peak and leaves users with a strong last impression',
        example:
          'End trials with a personalized impact summary: "This week you saved 4.2 hours and completed 12 projects"',
        tips: [
          'The ending is the last thing users remember before making re-engagement decisions',
          'Summarize achievements, not just actions taken',
          'End with empowerment ("you can do this") not obligation ("you must pay now")',
        ],
      },
      {
        step: 4,
        title: 'Compress, Do Not Extend',
        description:
          'When in doubt, make the experience shorter and more intense rather than longer and more comprehensive',
        example:
          'Replace a 30-minute all-features demo with a 5-minute focused transformation demo',
        tips: [
          'Users do not reward you for longer experiences; they reward you for peak intensity',
          'Shorter experiences have higher completion rates, increasing the chance users reach the ending',
          'Compression forces you to identify what truly matters',
        ],
      },
      {
        step: 5,
        title: 'Measure Remembered Experience',
        description:
          'Track what users remember and how they evaluate the experience, not just how long they spent',
        example:
          'Ask users 48 hours later: "What do you remember about the demo?" and "Would you choose to try it again?"',
        tips: [
          'Session duration is a poor proxy for experience quality',
          'Remembered experience predicts future decisions better than objective duration',
          'Compare short-peaked vs long-flat variants using post-experience surveys',
        ],
      },
    ],

    dos: [
      'Design one clear, emotionally resonant peak moment per experience',
      'End every experience on a positive note with progress or achievement summaries',
      'Keep demos, trials, and onboarding short with concentrated intensity',
      'Measure remembered experience, not just session duration',
      'Front-load the most impressive moment so more users encounter it',
      'Use peaks and endings to drive re-engagement decisions',
      'Communicate value through peak outcomes, not cumulative time',
      'Test shorter, more intense variants against longer, comprehensive ones',
    ],

    donts: [
      'Don\'t use duration as your primary value proposition ("500 hours of content")',
      'Don\'t distribute value evenly across time, creating a flat experience',
      'Don\'t end experiences with surveys, settings, billing, or administrative tasks',
      'Don\'t assume longer trials or demos are better than shorter ones',
      'Don\'t let your most impressive feature be buried deep in a long flow',
      'Don\'t measure success by time-on-page or session duration alone',
      'Don\'t neglect the ending of user sessions, trials, or onboarding flows',
      'Don\'t equate "comprehensive" with "effective" in demos or training',
    ],

    bestPractices: [
      {
        title: 'The 5-Minute Peak Demo',
        description:
          'Replace long product tours with short demos built around a single transformative "before/after" moment',
        rationale:
          'Users evaluate demos by their peak moment and ending, not by feature coverage. A 5-minute demo with a strong peak converts better than a 30-minute comprehensive tour.',
        example:
          'Show messy input data -> one click -> beautiful output. End with "try it with your own data."',
      },
      {
        title: 'Orchestrated Trial Journeys',
        description:
          'Design trial periods with an intentional peak moment (Day 1) and a satisfying closing experience (last day)',
        rationale:
          'Passive 30-day trials have low conversion because they create no peak and often end negatively (expiration warning). Shorter trials with guided peaks convert dramatically better.',
        example:
          'Day 1: Guided "first win" experience. Day 7: Personalized impact summary with conversion CTA.',
      },
      {
        title: 'Session Ending Rituals',
        description:
          'Design a positive closing experience for every user session, showing achievements and peak insights',
        rationale:
          'The decision to return tomorrow is based on how today\'s session is remembered. A positive ending creates a positive memory, driving re-engagement.',
        example:
          'Before logout: "Today you discovered that churn risk dropped 12%. Great work."',
      },
      {
        title: 'Quality Over Quantity in Content',
        description:
          'Promote one powerful result or insight rather than volume of content or hours of access',
        rationale:
          'Users do not sum value over time. One transformative insight is remembered more favorably than 100 hours of adequate content.',
        example:
          'Instead of "200 lessons available", say "The insight in Lesson 3 saved users an average of $12,000."',
      },
      {
        title: 'Temporal Intensity Mapping',
        description:
          'Map the emotional intensity of your experience over time and ensure there is a clear peak and strong ending',
        rationale:
          'Flat intensity curves create unmemorable experiences. Intentional intensity design ensures the right moments are encoded in memory.',
        example:
          'Chart your onboarding flow: identify the peak, ensure it is in the first third, verify the ending is positive.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure peak moments and achievements are semantically communicated',
        implementation:
          'Use ARIA live regions to announce peak moments and achievement summaries so screen reader users experience the same emotional high points as sighted users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Peak moments must not rely solely on color for emphasis',
        implementation:
          'Combine color with icons, animations, text emphasis, and semantic structure to ensure peak moments are perceivable by all users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Session endings and achievement summaries must be announced to assistive technologies',
        implementation:
          'Use role="status" or ARIA live regions for session-end summaries and achievement celebrations so all users experience the positive ending.',
      },
    ],

    ethics: [
      {
        concern: 'Artificially Shortened Experiences',
        severity: 'high',
        explanation:
          'Deliberately shortening trials or access to exploit duration neglect while charging the same price',
        mitigation:
          'Ensure shorter experiences genuinely deliver equivalent or better value. Do not reduce access purely to manipulate evaluation.',
      },
      {
        concern: 'Masking Poor Overall Quality',
        severity: 'critical',
        explanation:
          'Using a flashy peak moment and polished ending to disguise a product that delivers poor day-to-day value',
        mitigation:
          'Peaks and endings should be representative of actual product quality. Do not create demo moments that are unachievable in regular use.',
      },
      {
        concern: 'Ending Manipulation',
        severity: 'medium',
        explanation:
          'Using emotional manipulation at experience endings to prevent cancellation or force decisions',
        mitigation:
          'Positive endings should celebrate genuine user achievements, not manufacture urgency or guilt to prevent departure.',
      },
      {
        concern: 'Duration-Based Pricing Deception',
        severity: 'high',
        explanation:
          'Charging for time-based access (monthly subscription) while deliberately designing the product so users do not notice how little time they use it',
        mitigation:
          'Be transparent about usage patterns. If users only need 5 minutes per week, price accordingly or offer usage-based pricing.',
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
          'The foundational cold-pressor experiment demonstrating that people choose to repeat longer painful experiences if they end better, directly proving duration neglect in decision-making',
        type: 'foundational',
      },
      {
        title: 'Objective Happiness',
        author: 'Kahneman, D.',
        year: 1999,
        description:
          'Comprehensive theoretical framework distinguishing experienced utility from remembered utility, explaining why duration is neglected in retrospective evaluation',
        type: 'foundational',
      },
      {
        title: 'Duration Neglect in Retrospective Evaluations of Affective Episodes',
        author: 'Fredrickson, B. L., & Kahneman, D.',
        year: 1993,
        doi: '10.1037/0022-3514.65.1.45',
        description:
          'Demonstrates that retrospective evaluations of affective episodes are well predicted by peak and end intensity but are insensitive to duration',
        type: 'foundational',
      },
      {
        title: 'The Peak-End Rule and Its Implications for Customer Experience Design',
        author: 'Fredrickson, B. L.',
        year: 2000,
        description:
          'Extends duration neglect research to practical contexts including customer experience design and service encounters',
        type: 'practical',
      },
      {
        title: 'Patients\' Memories of Painful Medical Treatments: Real-time and Retrospective Evaluations of Two Minimally Invasive Procedures',
        author: 'Redelmeier, D. A., & Kahneman, D.',
        year: 1996,
        doi: '10.1016/0304-3959(96)03078-4',
        description:
          'Real-world medical evidence that patients\' decisions about future treatments are driven by peak and end pain, not total duration',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapters on duration neglect and the peak-end rule by the researcher who discovered them, with extensive discussion of decision-making implications',
        type: 'foundational',
      },
      {
        title: 'The Power of Moments',
        author: 'Heath, Chip & Heath, Dan',
        year: 2017,
        isbn: '9781501147760',
        description:
          'Practical guide to designing peak moments in experiences, directly applying duration neglect research to product and service design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Peak-End Rule: How Impressions Become Memories',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/peak-end-rule/',
        description:
          'UX-focused guide to applying the peak-end rule and duration neglect in digital product design',
        type: 'practical',
      },
      {
        title: 'Designing Moments That Matter',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/the-peak-end-rule',
        description:
          'Practical framework for identifying and designing peak moments in user experiences',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Riddle of Experience vs Memory',
        author: 'Kahneman, Daniel (TED Talk)',
        url: 'https://www.ted.com/talks/daniel_kahneman_the_riddle_of_experience_vs_memory',
        description:
          'Kahneman explains the difference between the experiencing self and the remembering self, and why duration is neglected in memory-based decisions',
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
      'peak-end-rule',       // Duration neglect is the decision-making manifestation of peak-end evaluation
      'recency-effect',      // End moments are both recent and final, reinforcing each other
      'loss-aversion',       // Negative endings are disproportionately weighted in decisions
      'serial-position',     // First and last items dominate memory, paralleling peak-end
    ],

    conflicts: [
      'sunk-cost-fallacy',   // Sunk cost makes people value duration; duration neglect ignores it
      'effort-justification', // People sometimes value experiences more when they took longer
    ],

    confusedWith: [
      'peak-end-rule',       // Duration neglect is specifically about ignoring duration; peak-end is about what replaces it
      'recency-bias',        // Recency affects all recent information; duration neglect specifically about temporal length
      'availability-heuristic', // Both affect memory-based decisions, but through different mechanisms
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'trial-duration-neglect',
        'session-duration-neglect',
        'content-duration-neglect',
      ],
    },
  },
};
