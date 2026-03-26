/**
 * SUNK COST FALLACY
 *
 * We continue investing in something because we've already invested, not because it's valuable
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const sunkCostFallacy: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'sunk-cost-fallacy',
    name: 'Sunk Cost Fallacy',
    aliases: ['Sunk Cost Effect', 'Escalation of Commitment'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'past-investment',
      'irrational-commitment',
      'loss-aversion',
      'decision-making',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We continue investing in something because we\'ve already invested, not because it\'s valuable',

    detailed: `The Sunk Cost Fallacy is the tendency to continue an endeavor once an investment of money, effort, or time has been made, regardless of whether the current costs outweigh the benefits. People feel that abandoning something they've invested in means "wasting" what was already spent, even though that investment is irrecoverable.

This bias stems from loss aversion: the psychological pain of losing what we've already put in outweighs rational assessment of future value. The more we've invested, the harder it becomes to walk away, even when continuing is clearly the worse option.

In UX and product design, the sunk cost fallacy is leveraged through progress indicators, streaks, loyalty programs, onboarding completion flows, and cancellation friction. These patterns remind users of their accumulated investment to encourage continued engagement and reduce churn.`,

    psychologyBasis: {
      discoveredBy: 'Arkes & Blumer',
      year: 1985,
      theory: 'Sunk Cost Fallacy',
      mechanism: `The brain treats past investments as ongoing obligations rather than irrecoverable costs. This happens because:

1. **Loss Aversion**: Abandoning an investment feels like a loss, and losses are psychologically ~2x more painful than equivalent gains
2. **Waste Avoidance**: Humans have a deep aversion to perceived waste; quitting feels like "throwing away" prior effort
3. **Self-Justification**: Continuing validates the original decision to invest, protecting self-image as a rational decision-maker
4. **Emotional Attachment**: Time and effort create emotional bonds with projects, products, and routines
5. **Completion Desire**: The Zeigarnik effect means unfinished tasks create psychological tension that motivates continuation

The mechanism is largely emotional rather than rational -- we feel compelled to continue, even when we intellectually know we should stop.`,
    },

    realWorldExample: `In Arkes & Blumer's classic 1985 experiment, participants who paid full price for a theater season pass attended more shows than those who received a discount, even when neither group particularly enjoyed the performances. The higher sunk cost created stronger motivation to "get their money's worth."

Similarly, people continue watching a bad movie they paid $15 for rather than leaving, hold losing stocks far too long hoping to "break even," and stay in failing relationships because of "all the years we've put in." In each case, the irrecoverable past investment irrationally dominates the decision about what to do next.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Sunk Cost Fallacy profoundly affects user retention, engagement, and conversion in digital products. Designers can leverage past user investment to:

- Retain subscribers by reminding them of accumulated value, history, and progress
- Drive feature adoption by showing partial completion of setup or onboarding
- Maintain engagement through streaks, levels, and achievement systems
- Reduce churn by surfacing what users would lose if they leave
- Increase commitment through progressive investment (time, data, customization)`,

    whenToUse: [
      {
        title: 'Onboarding Completion',
        scenario:
          'When guiding users through a multi-step setup process',
        example:
          'Show "You\'ve completed 4 of 5 steps -- finish setup to unlock all features" with a progress bar',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Streak Maintenance',
        scenario: 'When encouraging daily or regular engagement with your product',
        example:
          'Display "You\'re on a 47-day streak! Don\'t break it now" with streak history visualization',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Retention',
        scenario: 'When users attempt to cancel or downgrade their subscription',
        example:
          'Show "You\'ve saved 847 files and created 23 projects over 14 months with us" during cancellation flow',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Profile Completion',
        scenario: 'When encouraging users to add more data or content to their profile',
        example:
          'Display "Your profile is 75% complete -- add a photo and bio to reach All-Star status" with progress ring',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Loyalty Programs',
        scenario: 'When rewarding continued patronage and encouraging repeat purchases',
        example:
          'Show "You\'re 200 points away from Gold status -- your next purchase gets you there"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Learning Progress',
        scenario: 'When motivating users to continue educational or training content',
        example:
          'Display "You\'ve completed 80% of this course -- only 3 lessons to your certificate"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Cancellation Dark Patterns',
        reason:
          'Using sunk cost guilt to prevent users from leaving when they genuinely want to',
        consequence:
          'User resentment, negative reviews, regulatory scrutiny, and damage to brand trust',
        alternative:
          'Offer a pause option, acknowledge their investment respectfully, and make cancellation straightforward',
      },
      {
        title: 'Harmful Habit Reinforcement',
        reason:
          'Streak mechanics can create anxiety and compulsive behavior patterns',
        consequence:
          'Users feel trapped and stressed rather than motivated; eventual burnout and abandonment',
        alternative:
          'Allow streak freezes, celebrate milestones without penalizing breaks, focus on cumulative progress',
      },
      {
        title: 'Financial Decisions',
        reason:
          'Encouraging users to continue spending because they\'ve already spent is manipulative',
        consequence:
          'Users overspend, feel exploited, and lose trust in the platform',
        alternative:
          'Present objective value assessment; help users make forward-looking decisions independent of past spend',
      },
      {
        title: 'Health and Wellbeing Contexts',
        reason:
          'Sunk cost pressure in fitness or health apps can promote unhealthy overexertion',
        consequence:
          'Users ignore physical signals to rest, leading to injury or burnout',
        alternative:
          'Celebrate rest days, emphasize sustainable habits over unbroken streaks',
      },
    ],

    commonMistakes: [
      {
        title: 'Guilt-Driven Retention',
        description:
          'Making users feel guilty about their investment rather than valued for it',
        why: 'Guilt creates negative associations with your product and accelerates eventual churn',
        fix: 'Frame past investment positively ("Look what you\'ve built!") rather than as a loss ("Don\'t waste everything!")',
      },
      {
        title: 'Streak Anxiety',
        description:
          'Creating streaks without recovery mechanisms, causing stress and eventual abandonment',
        why: 'Once a streak breaks, the sunk cost motivation vanishes and users often quit entirely',
        fix: 'Offer streak freezes, streak shields, or shift to cumulative progress metrics that survive interruptions',
      },
      {
        title: 'Invisible Investment',
        description:
          'Failing to surface users\' accumulated value, so they don\'t realize what they\'ve built',
        why: 'If users can\'t see their investment, sunk cost motivation doesn\'t activate',
        fix: 'Create dashboards, year-in-review summaries, and progress visualizations that surface accumulated value',
      },
      {
        title: 'Cancellation Hostage-Taking',
        description:
          'Making it extremely difficult to cancel while emphasizing sunk costs',
        why: 'Combines sunk cost with friction in ways that feel coercive and often violate regulations',
        fix: 'Show what users have built, offer alternatives (pause, downgrade), but keep cancellation simple and accessible',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how and where investment indicators appear in the user journey',
        examples: [
          'Progress bars at the top of onboarding flows show accumulated completion',
          'Dashboard summaries prominently display lifetime statistics and achievements',
          'Cancellation pages lead with investment summary before showing the cancel button',
          'Sidebar widgets showing streak counts and levels maintain ongoing visibility',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis on numbers and milestones reinforces perceived investment',
        examples: [
          'Large, bold numbers for streak counts and achievement milestones',
          'Emphasized statistics ("847 files saved") in cancellation flows',
          'Congratulatory typography for completion milestones creates emotional attachment',
          'Progress percentages displayed prominently to highlight how far users have come',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color reinforces progress, achievement, and potential loss',
        examples: [
          'Green progress bars filling up create satisfying visual momentum',
          'Gold or premium colors for loyalty tier status reinforce earned status',
          'Red or warning colors when streaks are at risk signal impending loss',
          'Muted, desaturated previews of "what you\'ll lose" create contrast with current state',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Every interaction deepens investment and makes leaving harder',
        examples: [
          'Each customization, file upload, or preference set increases switching cost',
          'Daily check-ins build streak investment that compounds over time',
          'Collaborative features (shared projects, team data) multiply sunk costs across users',
          'Confirmation dialogs listing accumulated data during deletion or cancellation',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy determines how past investment is framed and surfaced',
        examples: [
          '"You\'ve been with us for 2 years" creates temporal investment awareness',
          'Year-in-review emails surface forgotten accumulated value',
          'Milestone celebrations ("Your 1000th photo!") make investment tangible',
          'Cancellation copy that lists specific user-created content and data',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Progress and investment indicators must be perceivable by all users',
        examples: [
          'Progress bars need ARIA valuenow/valuemax for screen reader users',
          'Streak counts should be announced clearly, not just shown visually',
          'Achievement notifications need non-visual equivalents (not just animation)',
          'Cancellation warnings listing accumulated data should be fully accessible',
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
        title: 'Onboarding Progress with Value Preview',
        description:
          'Multi-step setup showing completion progress and what unlocks at each stage',
        code: `<div class="onboarding-progress">
  <div class="progress-header">
    <h3>Your Setup Progress</h3>
    <span class="completion">4 of 5 steps complete</span>
  </div>
  <div class="progress-bar">
    <div class="fill" style="width: 80%"></div>
  </div>
  <ul class="steps">
    <li class="complete">Create account</li>
    <li class="complete">Connect data source</li>
    <li class="complete">Customize dashboard</li>
    <li class="complete">Invite team members</li>
    <li class="current">Set up automated reports</li>
  </ul>
  <p class="encouragement">
    You're almost there! Complete this last step to unlock
    automated weekly reports.
  </p>
  <button class="primary">Finish Setup</button>
</div>`,
        explanation:
          'The progress bar and completed step list make the user\'s investment visible. At 80% completion, the sunk cost of 4 finished steps motivates completing the final one. The positive framing ("You\'re almost there!") avoids guilt.',
        principle:
          'Visible progress creates investment awareness that motivates completion',
        metrics: {
          before: '41% completed all 5 onboarding steps',
          after: '68% completed all 5 onboarding steps with progress indicator',
          improvement: '66% increase in full onboarding completion',
        },
      },
      {
        title: 'Streak with Recovery Mechanism',
        description:
          'Daily engagement streak that allows freezes to prevent anxiety',
        code: `<div class="streak-panel">
  <div class="streak-count">
    <span class="number">47</span>
    <span class="label">day streak</span>
  </div>
  <div class="streak-calendar">
    <!-- Visual calendar showing 47 green days -->
    <div class="week" role="row">
      <span class="day active" aria-label="Monday, completed"></span>
      <span class="day active" aria-label="Tuesday, completed"></span>
      <span class="day active" aria-label="Wednesday, completed"></span>
      <span class="day today" aria-label="Thursday, today"></span>
      <span class="day future"></span>
      <span class="day future"></span>
      <span class="day future"></span>
    </div>
  </div>
  <div class="streak-tools">
    <p>Life happens! You have <strong>2 streak freezes</strong> available.</p>
    <button class="secondary">Use Streak Freeze</button>
  </div>
  <p class="milestone">Next milestone: 50-day streak badge in 3 days!</p>
</div>`,
        explanation:
          'The 47-day streak creates strong sunk cost motivation to continue. The calendar visualization makes every day of investment visible. Crucially, streak freezes prevent anxiety and all-or-nothing abandonment.',
        principle:
          'Streak visibility with recovery mechanisms sustains engagement without creating harmful pressure',
        metrics: {
          before: '23% maintained 30+ day streaks (no freeze option)',
          after: '52% maintained 30+ day streaks (with freeze option)',
          improvement: '126% increase in long-term streak retention',
        },
      },
      {
        title: 'Respectful Cancellation Flow',
        description:
          'Subscription cancellation that acknowledges investment without guilt-tripping',
        code: `<div class="cancellation-flow">
  <h3>We're sorry to see you go</h3>

  <div class="your-history">
    <h4>Here's what you've built with us</h4>
    <div class="stats-grid">
      <div class="stat">
        <span class="value">847</span>
        <span class="label">files saved</span>
      </div>
      <div class="stat">
        <span class="value">23</span>
        <span class="label">projects created</span>
      </div>
      <div class="stat">
        <span class="value">14</span>
        <span class="label">months together</span>
      </div>
    </div>
  </div>

  <div class="alternatives">
    <h4>Before you go, would any of these help?</h4>
    <button class="option">Pause for 1 month (free)</button>
    <button class="option">Switch to free plan (keep your data)</button>
    <button class="option">Talk to support</button>
  </div>

  <button class="cancel-confirm">Cancel my subscription</button>
  <p class="data-note">Your data will be available for 30 days after cancellation.</p>
</div>`,
        explanation:
          'The history summary activates sunk cost awareness without guilt. Alternatives (pause, downgrade) honor the user\'s investment while providing options. The cancel button is clearly accessible -- no dark patterns.',
        principle:
          'Surface investment respectfully and offer alternatives, but never block the exit',
      },
    ],

    bad: [
      {
        title: 'Guilt-Trip Cancellation',
        description:
          'Cancellation flow that uses emotional manipulation and sunk cost guilt',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-page">
  <h2 style="color: red;">Are you sure you want to throw it all away?</h2>
  <img src="sad-puppy.jpg" alt="Sad puppy looking at you">
  <p>You've spent <strong>847 HOURS</strong> building your workspace.
  All that hard work will be GONE FOREVER.</p>
  <p>Your team will lose access to everything you built together.</p>
  <button class="primary large">No, I changed my mind!</button>
  <a href="#" style="color: #ccc; font-size: 0.7em;">
    Yes, destroy everything I've built
  </a>
</div>`,
        explanation:
          'This uses emotional manipulation (sad puppy), guilt language ("throw it all away"), exaggerated consequences ("GONE FOREVER"), and deceptive UI (tiny, low-contrast cancel link vs large stay button). This is a textbook dark pattern.',
        principle:
          'Never weaponize sunk cost to trap users through guilt and friction',
      },
      {
        title: 'Punitive Streak Loss',
        description:
          'Streak system that severely punishes any break without recovery options',
        code: `<!-- DON'T DO THIS -->
<div class="streak-lost">
  <h2>Your 147-Day Streak is GONE</h2>
  <div class="streak-animation">
    <!-- Dramatic animation of streak counter resetting to 0 -->
    <span class="counter">147 → 0</span>
  </div>
  <p>You missed yesterday. Your streak has been reset to zero.</p>
  <p>You also lost your Diamond League status and 2,340 XP bonus.</p>
  <p>Start over from scratch.</p>
</div>`,
        explanation:
          'Destroying 147 days of investment with no recovery option creates anxiety, resentment, and often causes users to quit entirely. The dramatic reset animation adds unnecessary emotional pain.',
        principle:
          'Punitive streak systems create anxiety and drive long-term abandonment',
      },
      {
        title: 'Manufactured Investment Pressure',
        description:
          'Artificially inflating perceived investment to create exit barriers',
        code: `<!-- DON'T DO THIS -->
<div class="upgrade-prompt">
  <h3>Don't waste the 4 hours you've already invested!</h3>
  <p>You've completed the free tier experience. To access
  the report you just built, upgrade to Premium.</p>
  <p>Your 4 hours of work will be deleted if you don't
  upgrade within 24 hours.</p>
  <button class="primary">Upgrade Now - $29/month</button>
  <small>Free trial work expires in 23:47:12</small>
</div>`,
        explanation:
          'Letting users invest hours of work and then holding it hostage behind a paywall is exploitative. The countdown timer compounds the sunk cost pressure with artificial urgency.',
        principle:
          'Never let users invest time in something you will take away unless they pay',
      },
    ],

    realWorld: [
      {
        company: 'Duolingo',
        product: 'Streak System',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo\'s streak counter is the defining example of sunk cost in product design. Users see their consecutive-day count prominently displayed, receive streak freeze power-ups, and get notifications warning of impending streak loss. The longer the streak, the stronger the daily motivation to continue.',
        effectiveness: 'very-effective',
        analysis:
          'Extremely effective at driving daily engagement. The addition of streak freezes (purchasable with in-app currency) shows evolved thinking: they monetize the sunk cost anxiety while reducing harmful all-or-nothing pressure. However, the system has drawn criticism for creating compulsive behavior.',
      },
      {
        company: 'LinkedIn',
        product: 'Profile Completion Meter',
        url: 'https://www.linkedin.com',
        description:
          'LinkedIn shows a profile strength meter (Beginner to All-Star) that encourages users to add more information. Each addition increases the bar, creating visible investment that motivates completing the next section.',
        effectiveness: 'very-effective',
        analysis:
          'The progress bar leverages sunk cost effectively: after adding work history, education, and skills, users feel compelled to add the remaining items. Each piece of data also increases switching costs, as recreating a complete profile elsewhere represents significant effort.',
      },
      {
        company: 'Netflix',
        product: 'Continue Watching',
        url: 'https://www.netflix.com',
        description:
          'Netflix prominently displays partially-watched shows and movies with progress bars showing how far into each title the user is. The "Continue Watching" row is typically the first or second row on the home screen.',
        effectiveness: 'effective',
        analysis:
          'The progress indicator on each title activates sunk cost: "I\'ve already watched 40 minutes, might as well finish." This is relatively gentle since it doesn\'t penalize not finishing, but it does leverage the completion desire triggered by visible partial investment.',
      },
      {
        company: 'Starbucks',
        product: 'Rewards Program',
        url: 'https://www.starbucks.com/rewards',
        description:
          'Starbucks Rewards shows stars accumulated toward the next reward tier. Users can see exactly how many stars they need for a free drink, creating visible progress toward a goal backed by prior purchases.',
        effectiveness: 'very-effective',
        analysis:
          'The star accumulation creates classic sunk cost: after earning 150 of the 200 stars needed for Gold status, switching to a competitor means "wasting" those 150 stars. The program also uses the endowed progress effect by giving bonus stars for signing up.',
      },
      {
        company: 'GitHub',
        product: 'Contribution Graph',
        url: 'https://github.com',
        description:
          'GitHub\'s contribution graph (green squares calendar) visualizes a user\'s daily coding activity over the past year. The filled squares create a visible record of consistent investment.',
        effectiveness: 'effective',
        analysis:
          'The visual nature of the graph creates a pattern users want to maintain. Empty squares feel like "gaps" in an otherwise consistent record, leveraging both sunk cost (all those filled squares) and loss aversion (not wanting to break the pattern).',
      },
    ],

    abTests: [
      {
        title: 'Cancellation Flow: Investment Summary vs Direct Cancel',
        hypothesis:
          'Showing users their accumulated investment will reduce cancellation rate',
        controlVersion: {
          description:
            'Direct cancellation page: "Are you sure you want to cancel?" with Yes/No buttons',
          metrics: {
            conversionRate: '67%',
            timeOnPage: '0:12',
          },
        },
        treatmentVersion: {
          description:
            'Cancellation page showing personalized stats (files created, time saved, projects completed) with pause/downgrade alternatives before cancel button',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '1:48',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Showing accumulated investment reduced cancellation completion by 39%. Users spent 9x longer on the page, suggesting genuine reconsideration rather than friction. 18% chose to pause instead of cancel.',
          learnings: [
            'Personalized investment data is more effective than generic "are you sure?" prompts',
            'Offering pause/downgrade alternatives converts users who would otherwise cancel',
            'The key is surfacing value, not creating guilt or friction',
            'Users who stayed after seeing the summary had higher 90-day retention than baseline',
          ],
        },
      },
      {
        title: 'Onboarding: Progress Bar vs No Progress Indicator',
        hypothesis:
          'Showing completion progress will increase onboarding finish rate',
        controlVersion: {
          description:
            'Multi-step onboarding with no progress indicator; users see each step independently',
          metrics: {
            conversionRate: '34%',
            averageStepsCompleted: '2.8',
          },
        },
        treatmentVersion: {
          description:
            'Same onboarding with prominent progress bar showing "Step 3 of 5 -- 60% complete" and checkmarks on finished steps',
          metrics: {
            conversionRate: '58%',
            averageStepsCompleted: '4.1',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The progress bar increased onboarding completion by 71%. Users who saw their accumulated progress were significantly more likely to complete remaining steps. The effect was strongest after step 3 (60% mark), consistent with sunk cost theory.',
          learnings: [
            'Visible progress creates sunk cost motivation to complete remaining steps',
            'The effect compounds: each completed step increases motivation for the next',
            'Users who completed onboarding had 3.2x higher 30-day retention',
            'Progress indicators work best when users can see both completed and remaining steps',
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
        name: 'Progress Indicators',
        description:
          'Progress bars, completion percentages, or step counters showing how far a user has come',
        howToSpot:
          'Look for progress bars, "X of Y complete" labels, percentage badges, or completion rings in onboarding, profiles, and setup flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Streak Counters',
        description:
          'Consecutive-day or consecutive-action counters prominently displayed',
        howToSpot:
          'Look for flame icons, streak numbers, calendar heat maps, or "X days in a row" messaging',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Investment Summaries',
        description:
          'Displays of accumulated user data, content, or activity history',
        howToSpot:
          'Look for "You\'ve created X files", lifetime statistics, activity timelines, or year-in-review features',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Cancellation Warnings',
        description:
          'Messages during cancellation or deletion that highlight what will be lost',
        howToSpot:
          'Look for lists of user-created content, accumulated points/status, or team member counts shown during exit flows',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Loyalty Tier Indicators',
        description:
          'Visual indicators of earned status, tier progress, or accumulated points',
        howToSpot:
          'Look for tier badges (Gold, Platinum), points-to-next-reward counters, or progress toward status milestones',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Progress-Toward-Goal Pattern',
        description: 'Showing users how close they are to completing a goal or reaching a milestone',
        indicators: ['Progress bars with percentage labels', 'Step indicators (3 of 5 complete)', 'Points-to-next-reward counters', '"Almost there!" encouragement messaging'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Streak Investment Pattern',
        description: 'Tracking consecutive actions and making the accumulated streak visible',
        indicators: ['Daily streak counters', 'Calendar heat maps showing activity', 'Streak-at-risk notifications', 'Streak milestone celebrations'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Exit-Cost Surfacing Pattern',
        description: 'Displaying accumulated value during cancellation, deletion, or switching flows',
        indicators: ['Personalized usage statistics in cancel flows', '"You will lose X" messaging', 'Data export prompts before deletion', 'Alternative options (pause, downgrade) before final cancel'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Endowed Progress Pattern',
        description: 'Giving users artificial head starts to create initial investment perception',
        indicators: ['Pre-filled progress bars ("You\'re already 20% done!")', 'Bonus starter points in loyalty programs', 'Pre-checked onboarding steps', 'Welcome credits or free tier benefits framed as earned'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface show users how much progress they\'ve already made?',
      'Are there streak counters, daily check-ins, or consecutive-action tracking?',
      'Does the cancellation flow surface accumulated user data or history?',
      'Are loyalty points, tiers, or earned status displayed prominently?',
      'Is onboarding completion tracked and shown to users?',
      'Do notifications reference past investment ("Your 30-day streak is at risk!")?',
      'Are there progress bars that would reset if the user stops?',
      'Does the product create switching costs through accumulated customization or data?',
      'Is there a "what you\'ll lose" section in cancellation or downgrade flows?',
      'Are recovery mechanisms (streak freezes, pause options) available to reduce harmful pressure?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the sunk cost fallacy.

Analyze the provided design for sunk cost fallacy patterns. Identify:

1. **Progress Investment**: How user progress, completion, and accumulated effort are displayed
2. **Streak Mechanics**: Consecutive-action tracking, streak counters, and daily engagement systems
3. **Exit Friction**: What users see when trying to cancel, delete, or switch away
4. **Investment Visibility**: How accumulated data, content, history, and customization are surfaced
5. **Loyalty Systems**: Points, tiers, status, and reward accumulation patterns

For each pattern found:
- Identify the type of sunk cost being leveraged (time, effort, data, money, social)
- Assess whether it helps users make better decisions or traps them
- Determine if recovery mechanisms exist (streak freezes, pause options, data export)
- Evaluate the ethical balance between retention and manipulation
- Suggest improvements for user-respecting design

Consider:
- Does the design create genuine value awareness or guilt-driven retention?
- Are there recovery mechanisms for streaks and progress?
- Is the cancellation flow respectful or hostile?
- Does progress tracking motivate or create anxiety?
- Are switching costs natural (accumulated data) or artificial (no data export)?

Provide actionable recommendations for ethical, user-respecting use of sunk cost patterns.`,

    outputSchema: {
      type: 'object',
      properties: {
        sunkCostPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              investmentType: { type: 'string' },
              intensity: { type: 'string' },
              hasRecoveryMechanism: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'investmentType',
              'intensity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            investmentVisibility: { type: 'number' },
            retentionPressure: { type: 'number' },
            recoveryOptions: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'investmentVisibility',
            'retentionPressure',
            'recoveryOptions',
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
        'sunkCostPatterns',
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
        title: 'Map User Investment Points',
        description:
          'Identify every way users invest time, effort, data, or money in your product',
        example:
          'Investment map: account setup (20 min), data import (1 hr), customization (30 min), content creation (ongoing), team invites (social investment)',
        tips: [
          'Consider time, effort, data, money, and social investments separately',
          'Map investment accumulation over the user lifecycle',
          'Identify which investments create the strongest attachment',
        ],
      },
      {
        step: 2,
        title: 'Make Investment Visible',
        description:
          'Create interfaces that surface accumulated investment at appropriate moments',
        example:
          'Dashboard showing: "847 files saved, 23 projects, 14 months, 12 team collaborators"',
        tips: [
          'Use progress bars, counters, and milestone markers',
          'Frame investment positively ("look what you\'ve built") not negatively ("don\'t waste this")',
          'Surface investment during key decision moments (upgrade, renewal, cancellation)',
        ],
      },
      {
        step: 3,
        title: 'Design Progress Systems',
        description:
          'Create streaks, completion meters, and milestone systems that motivate continued engagement',
        example:
          'Onboarding progress bar + daily streak counter + monthly milestone celebrations',
        tips: [
          'Always include recovery mechanisms (streak freezes, pause options)',
          'Celebrate milestones to reinforce positive associations',
          'Use cumulative progress (total completed) alongside consecutive progress (streaks)',
        ],
      },
      {
        step: 4,
        title: 'Build Ethical Exit Flows',
        description:
          'Design cancellation and exit experiences that respect user autonomy while surfacing investment',
        example:
          'Cancel flow: show personalized stats -> offer pause/downgrade -> easy cancel button -> data export option',
        tips: [
          'Show what users have built, but make cancel button clearly accessible',
          'Offer meaningful alternatives (pause, downgrade, data export)',
          'Never use guilt language or deceptive UI patterns',
          'Follow regulatory requirements for cancellation ease',
        ],
      },
      {
        step: 5,
        title: 'Measure and Iterate',
        description:
          'Track whether sunk cost patterns improve retention without creating negative experiences',
        example:
          'Monitor: retention rate, NPS, cancellation completion rate, streak anxiety reports, support tickets about streaks',
        tips: [
          'Track both retention and satisfaction metrics',
          'Monitor support tickets for streak anxiety or cancellation frustration',
          'A/B test sunk cost elements against controls',
          'Survey users about pressure and autonomy perceptions',
        ],
      },
    ],

    dos: [
      'Make user investment visible through progress bars, statistics, and milestones',
      'Include recovery mechanisms for streaks (freezes, shields, grace periods)',
      'Frame accumulated investment positively ("Look what you\'ve built!")',
      'Offer alternatives to cancellation (pause, downgrade, plan change)',
      'Celebrate milestones and achievements to create positive associations',
      'Provide data export so users don\'t feel trapped by their data',
      'Use completion indicators in onboarding to motivate finishing',
      'Surface personalized usage stats at renewal and upgrade moments',
    ],

    donts: [
      'Don\'t use guilt language ("You\'ll lose everything", "Don\'t throw it away")',
      'Don\'t make cancellation difficult or hidden to exploit sunk cost inertia',
      'Don\'t create streaks without recovery mechanisms',
      'Don\'t hold user data hostage (always allow export)',
      'Don\'t use sad imagery or emotional manipulation in exit flows',
      'Don\'t punish streak breaks with dramatic loss of status or points',
      'Don\'t let users invest significant time before revealing a paywall',
      'Don\'t artificially inflate investment metrics to exaggerate sunk costs',
    ],

    bestPractices: [
      {
        title: 'Progressive Investment Architecture',
        description:
          'Design the user journey so investment accumulates gradually, with value delivered at each stage',
        rationale:
          'Gradual investment creates natural sunk cost without manipulation; users feel they\'ve earned value at every step',
        example:
          'Free tier builds basic data -> paid tier adds analysis -> premium adds collaboration. Each tier builds on accumulated investment.',
      },
      {
        title: 'Streak Freezes and Grace Periods',
        description:
          'Always provide mechanisms to preserve streaks during unavoidable breaks',
        rationale:
          'Without recovery, one missed day destroys months of investment and often leads to permanent abandonment',
        example:
          'Duolingo-style streak freezes: earn or purchase protection against missed days. Cap at 2-3 to maintain meaning.',
      },
      {
        title: 'Value-First Retention',
        description:
          'Surface genuine accumulated value rather than manufactured guilt during retention moments',
        rationale:
          'Users who stay because they see real value are more engaged than users who stay out of guilt',
        example:
          'Cancel page shows: "Your automated reports have saved your team an estimated 47 hours this quarter" with offer to pause.',
      },
      {
        title: 'Ethical Exit Design',
        description:
          'Make leaving as easy as joining, while respectfully surfacing what users have built',
        rationale:
          'Easy exits paradoxically increase trust and reduce churn; users who feel free to leave are more likely to stay',
        example:
          'One-click cancel with optional "here\'s what you\'ll miss" summary. Offer data export and 30-day reactivation window.',
      },
      {
        title: 'Cumulative Over Consecutive Metrics',
        description:
          'Emphasize total progress (lifetime stats) alongside or instead of consecutive metrics (streaks)',
        rationale:
          'Cumulative metrics survive interruptions and don\'t create all-or-nothing anxiety',
        example:
          'Show "247 total lessons completed" alongside "12-day current streak" so a broken streak doesn\'t erase all progress.',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Progress indicators must convey meaning programmatically',
        implementation:
          'Use role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax. Ensure streak counts and milestone notifications are announced to screen readers.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to indicate progress or streak status',
        implementation:
          'Combine color fills with text labels, numbers, and icons. Streak status should include text ("47 days") not just a colored flame icon.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Progress changes and milestone achievements must be announced',
        implementation:
          'Use aria-live regions or role="status" for dynamic progress updates, streak changes, and milestone celebrations.',
      },
    ],

    ethics: [
      {
        concern: 'Cancellation Dark Patterns',
        severity: 'critical',
        explanation:
          'Using sunk cost guilt combined with UI friction to prevent users from cancelling subscriptions',
        mitigation:
          'Follow FTC guidelines: make cancellation as easy as sign-up. Show investment data respectfully, but keep the cancel button prominent and accessible. Offer pause and downgrade as genuine alternatives.',
      },
      {
        concern: 'Streak Anxiety',
        severity: 'high',
        explanation:
          'Streak systems without recovery mechanisms create compulsive behavior, anxiety, and eventual burnout',
        mitigation:
          'Always provide streak freezes or grace periods. Celebrate cumulative progress alongside streaks. Allow users to disable streak notifications. Never punish breaks with dramatic loss.',
      },
      {
        concern: 'Data Hostage-Taking',
        severity: 'critical',
        explanation:
          'Making it impossible to export user-created data, so accumulated content becomes an artificial exit barrier',
        mitigation:
          'Provide comprehensive data export in standard formats. Comply with GDPR data portability requirements. Make export easy to find and use.',
      },
      {
        concern: 'Manufactured Investment',
        severity: 'high',
        explanation:
          'Letting users invest significant time or effort before revealing that a paywall blocks their results',
        mitigation:
          'Be transparent about free tier limits upfront. Never let users complete work they can\'t access without paying. Offer previews of premium results before asking for investment.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Psychology of Sunk Cost',
        author: 'Arkes, H. R., & Blumer, C.',
        year: 1985,
        doi: '10.1016/0749-5978(85)90049-4',
        description:
          'The foundational paper demonstrating sunk cost effects in human decision-making, including the classic theater ticket experiment',
        type: 'foundational',
      },
      {
        title: 'Escalation of Commitment to a Failing Course of Action',
        author: 'Staw, B. M.',
        year: 1976,
        doi: '10.2307/2391666',
        description:
          'Early research on how prior investment leads to irrational escalation, particularly in organizational decision-making',
        type: 'foundational',
      },
      {
        title: 'The Sunk Cost and Concorde Effects: Are Humans Less Rational Than Lower Animals?',
        author: 'Arkes, H. R., & Ayton, P.',
        year: 1999,
        doi: '10.1037/0033-2909.125.5.591',
        description:
          'Examines whether sunk cost behavior is uniquely human and its evolutionary basis',
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
          'Covers sunk cost fallacy within the broader framework of loss aversion and prospect theory',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Accessible exploration of sunk costs and irrational commitment in everyday decisions',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Covers the Investment phase of the Hook Model, directly applying sunk cost principles to product design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Sunk Cost Fallacy in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/sunk-cost-fallacy/',
        description:
          'Practical guide to recognizing and applying sunk cost patterns in user experience design',
        type: 'practical',
      },
      {
        title: 'The Ethics of Persuasive Design',
        author: 'Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L.',
        url: 'https://doi.org/10.1145/3173574.3174108',
        description:
          'CHI 2018 paper examining dark patterns and ethical boundaries of persuasive design including sunk cost exploitation',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'The Sunk Cost Fallacy',
        author: 'TED-Ed',
        url: 'https://www.youtube.com/watch?v=vpnxd31y0Fo',
        description:
          'Animated explanation of sunk cost fallacy with clear real-world examples',
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
