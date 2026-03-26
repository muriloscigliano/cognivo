/**
 * SELF SERVING BIAS
 *
 * We take credit for success but blame circumstances for failure
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const selfServingBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'self-serving-bias',
    name: 'Self Serving Bias',
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
    simple: 'We take credit for success but blame circumstances for failure',

    detailed: `The Self Serving Bias is a well-documented cognitive bias that significantly impacts how we process information and make decisions.

We take credit for success but blame circumstances for failure. This bias affects how users perceive options, evaluate choices, and interact with digital interfaces. Understanding this pattern is crucial for designing better user experiences that work with human psychology rather than against it.

In UX and product design, this bias manifests in how users make decisions, form preferences, and navigate interfaces. Designers can leverage this understanding to create more intuitive experiences while being mindful of ethical implications.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain asymmetrically attributes outcomes depending on whether they are positive or negative. This happens because:

1. **Ego Protection**: The brain protects self-esteem by attributing successes to internal factors like skill, effort, and intelligence
2. **External Blame**: Failures are attributed to external factors like bad luck, unfair circumstances, or other people's mistakes
3. **Motivational Drive**: Maintaining a positive self-image is a core psychological need, so the brain selectively interprets causation
4. **Confirmation of Competence**: Positive outcomes are seen as evidence of one's abilities, reinforcing a sense of control
5. **Threat Minimization**: By externalizing failure, the brain avoids the emotional pain of perceived incompetence

The mechanism is largely automatic and unconscious — people genuinely believe they caused their successes and that external forces caused their failures.`,
    },

    realWorldExample: `In a classic study by Miller and Ross (1975), students who performed well on an exam attributed their success to their own study habits and intelligence. Students who performed poorly blamed the test for being unfair, the professor for poor teaching, or external distractions. Both groups genuinely believed their attributions were accurate, demonstrating how self-serving bias operates below conscious awareness.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Self-serving bias profoundly affects how users interpret success and failure within interfaces. Users will naturally take credit for positive outcomes and blame the system for negative ones. Designers can leverage this to:

- Reinforce positive self-attribution when users complete desired actions ("You did it!")
- Absorb blame gracefully when errors occur ("Something went wrong" rather than "You made an error")
- Design achievement systems that let users feel ownership of their accomplishments
- Create non-threatening error experiences that preserve user self-esteem
- Build performance dashboards that frame progress as user-driven`,

    whenToUse: [
      {
        title: 'Success and Achievement Messaging',
        scenario:
          'When users complete tasks, reach milestones, or achieve goals within the product',
        example:
          'Show "Great job completing the challenge!" or "You crushed your goal this week!" reinforcing internal attribution for desired behavior',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Error and Failure States',
        scenario: 'When things go wrong — form errors, failed uploads, broken flows',
        example:
          'Use neutral phrasing like "Something went wrong on our end" or "That didn\'t work — let\'s try again" instead of "You entered invalid data"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding Completion',
        scenario: 'When users finish setup or onboarding sequences',
        example:
          'Celebrate with "You\'re all set! You configured everything perfectly." to build confidence and positive associations',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Performance Dashboards',
        scenario: 'When displaying user metrics, progress, or analytics',
        example:
          'Frame improvements as user-driven: "Your engagement increased 15% this month" rather than "The algorithm boosted your engagement"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User Reviews and Feedback',
        scenario: 'When soliciting reviews after positive experiences',
        example:
          'Prompt reviews right after success moments when users feel ownership: "You just finished your 10th project — share your experience!"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine User Errors That Need Correction',
        reason:
          'Over-absorbing blame can mask real usability issues or user mistakes that need addressing',
        consequence:
          'Users may repeat dangerous mistakes because they never felt responsible for the error',
        alternative:
          'Use gentle, specific guidance: "The password needs at least 8 characters" — informative without blaming',
      },
      {
        title: 'Accountability-Critical Contexts',
        reason:
          'In medical, financial, or safety-critical contexts, users must understand their role in outcomes',
        consequence:
          'Users may take dangerous shortcuts if they believe failure is always the system\'s fault',
        alternative:
          'Present factual cause-and-effect clearly while maintaining respectful tone',
      },
      {
        title: 'Team and Collaborative Settings',
        reason:
          'Self-serving bias can poison team dynamics if the UI lets individuals claim group success or shift blame',
        consequence:
          'Resentment, conflict, and breakdown of collaboration',
        alternative:
          'Frame outcomes as shared: "The team completed the sprint" rather than attributing to individuals',
      },
      {
        title: 'Manipulative Flattery for Upsells',
        reason:
          'Artificially inflating user self-attribution to sell premium features is deceptive',
        consequence:
          'Users feel manipulated when they realize flattery was a sales tactic',
        alternative:
          'Be honest about value propositions; let the product speak for itself',
      },
    ],

    commonMistakes: [
      {
        title: 'Blaming the User in Error Messages',
        description:
          'Writing error states like "You failed to upload the file" or "Invalid input — try again"',
        why: 'Threatening users\' self-image triggers defensive reactions and disengagement',
        fix: 'Use system-absorbing language: "Upload didn\'t complete — let\'s try again" or "Please check the format"',
      },
      {
        title: 'Leaderboards That Only Show Losses',
        description:
          'Displaying rankings that emphasize how far behind a user is without celebrating progress',
        why: 'Users externalize blame to the system ("this ranking is unfair") and disengage',
        fix: 'Show personal progress alongside rankings: "You improved 12 spots this week"',
      },
      {
        title: 'Generic Success Messages',
        description:
          'Using bland confirmations like "Action completed" instead of reinforcing user agency',
        why: 'Misses the opportunity to build positive self-attribution and product affinity',
        fix: 'Celebrate user ownership: "Nice work! You just organized 50 files in record time"',
      },
      {
        title: 'Over-Attributing System Contributions',
        description:
          'Messaging like "Our AI found these results for you" when the user did the searching',
        why: 'Strips users of ownership, reducing satisfaction and perceived control',
        fix: 'Frame AI as a tool the user leveraged: "Your search surfaced 23 great matches"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines how success and failure states are presented and how prominent achievement elements are',
        examples: [
          'Success states positioned prominently at top reinforce positive self-attribution',
          'Error messages placed inline and subtly reduce perceived blame',
          'Achievement badges and progress bars in visible locations encourage ownership',
          'Leaderboard placement affects whether users feel proud or threatened',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Text tone, size, and emphasis shape whether users feel celebrated or blamed',
        examples: [
          'Bold, celebratory success text reinforces user agency',
          'Smaller, neutral error text reduces perceived personal failure',
          'Active voice ("You achieved...") vs passive voice ("It was completed...") changes attribution',
          'Exclamation marks and positive language amplify ownership of success',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals success or failure and shapes emotional attribution',
        examples: [
          'Green success states paired with user-attributing copy reinforce ownership',
          'Red error states can feel accusatory — softer amber or neutral tones reduce blame',
          'Achievement badges in gold or vibrant colors amplify pride and self-attribution',
          'Muted, non-threatening error palettes preserve user self-esteem',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'How the system responds to user actions directly shapes causal attribution',
        examples: [
          'Immediate celebration animations after task completion build ownership',
          'Smooth error recovery flows prevent users from feeling "punished"',
          'Confetti, haptic feedback, or sound on achievements amplifies positive attribution',
          'Retry flows that preserve user input show the system absorbing blame',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Copy and microcopy are the primary drivers of self-serving bias in interfaces',
        examples: [
          '"You completed 5 tasks today!" (internal attribution) vs "5 tasks were completed" (neutral)',
          '"Something went wrong" (system blame) vs "You made an error" (user blame)',
          '"Your strategy paid off" reinforces user ownership of positive outcomes',
          '"Let\'s fix this together" frames errors as collaborative rather than accusatory',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users receive attribution cues through different channels',
        examples: [
          'Screen reader announcements for success should use celebratory, user-attributing language',
          'Error announcements via ARIA live regions should use neutral, non-blaming tone',
          'Achievement notifications must be accessible to convey the same positive attribution',
          'Keyboard-only users should experience the same celebratory feedback as mouse users',
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
        title: 'Achievement Celebration with Internal Attribution',
        description:
          'Fitness app celebrating a user milestone with language that credits the user',
        code: `<div class="achievement-banner">
  <div class="celebration-icon" aria-hidden="true">
    <svg class="confetti-burst"><!-- animated confetti --></svg>
  </div>
  <h3>You crushed it!</h3>
  <p class="achievement-detail">
    <strong>10,000 steps</strong> — your dedication is paying off.
    That's 3 days in a row hitting your goal!
  </p>
  <div class="progress-context">
    <span class="stat">Your consistency: up 40% this month</span>
  </div>
  <button class="primary">Share Your Achievement</button>
</div>`,
        explanation:
          'The language explicitly credits the user — "your dedication", "you crushed it". This reinforces internal attribution for the desired behavior (staying active), making the user feel capable and motivated to continue.',
        principle:
          'Celebrate success with user-attributing language to reinforce desired behavior',
        metrics: {
          before: '45% of users continued daily activity after milestones with neutral messaging',
          after: '68% continued daily activity after milestones with self-attributing celebration',
          improvement: '51% increase in sustained engagement after achievement moments',
        },
      },
      {
        title: 'Non-Blaming Error Recovery',
        description:
          'File upload failure that absorbs blame and preserves user self-esteem',
        code: `<div class="error-state" role="alert">
  <div class="error-icon" aria-hidden="true">
    <svg><!-- subtle warning icon --></svg>
  </div>
  <h3>Upload didn't go through</h3>
  <p>The connection was interrupted. Your file is safe —
     we saved your progress.</p>
  <div class="recovery-actions">
    <button class="primary">Try Again</button>
    <button class="secondary">Choose a Different File</button>
  </div>
  <details class="technical-info">
    <summary>Technical details</summary>
    <p>Network timeout after 30s. File: report.pdf (2.4 MB)</p>
  </details>
</div>`,
        explanation:
          'The error message blames the connection, not the user. "Your file is safe" reassures without implying fault. Progress is preserved so the user doesn\'t feel punished. The tone is collaborative ("we saved your progress").',
        principle:
          'Absorb system blame for failures to preserve user confidence and reduce abandonment',
        metrics: {
          before: '34% of users retried after "Upload failed: invalid file" messaging',
          after: '71% of users retried after non-blaming error recovery messaging',
          improvement: '109% increase in error recovery completion',
        },
      },
      {
        title: 'Progress Dashboard with User Ownership',
        description:
          'Analytics dashboard framing improvements as user-driven',
        code: `<section class="performance-dashboard">
  <h2>Your Performance This Month</h2>

  <div class="kpi-grid">
    <div class="kpi-card positive">
      <span class="label">Tasks Completed</span>
      <span class="value">47</span>
      <span class="delta positive">+12 from last month</span>
      <span class="attribution">Your most productive month yet!</span>
    </div>
    <div class="kpi-card positive">
      <span class="label">Response Time</span>
      <span class="value">2.1 hrs</span>
      <span class="delta positive">-30% faster</span>
      <span class="attribution">Your efficiency is improving</span>
    </div>
    <div class="kpi-card neutral">
      <span class="label">Open Items</span>
      <span class="value">8</span>
      <span class="delta neutral">Same as last month</span>
      <span class="attribution">Steady workload management</span>
    </div>
  </div>
</section>`,
        explanation:
          'Every metric improvement is framed as the user\'s achievement ("Your most productive month", "Your efficiency is improving"). Even neutral metrics get positive framing ("Steady workload management"). This builds ownership and motivation.',
        principle:
          'Frame data improvements as user-driven to build ownership and sustained engagement',
      },
    ],

    bad: [
      {
        title: 'Accusatory Error Messages',
        description:
          'Form validation that directly blames the user for every mistake',
        code: `<!-- DON'T DO THIS -->
<form class="signup-form">
  <div class="field error">
    <label>Email</label>
    <input type="email" value="john@" class="invalid">
    <span class="error-message">You entered an invalid email address!</span>
  </div>
  <div class="field error">
    <label>Password</label>
    <input type="password" class="invalid">
    <span class="error-message">Your password is too weak. Try harder.</span>
  </div>
  <div class="error-summary">
    <h4>You made 2 errors</h4>
    <p>Fix your mistakes before continuing.</p>
  </div>
</form>`,
        explanation:
          'Every error message directly blames the user: "You entered", "Your password is too weak", "You made 2 errors", "Fix your mistakes". This threatens self-image, triggers defensive reactions, and increases form abandonment.',
        principle:
          'Never use accusatory language in error states — it triggers self-serving defensive reactions and abandonment',
      },
      {
        title: 'Leaderboard That Only Shows Failure',
        description:
          'Competitive ranking that emphasizes how far behind the user is',
        code: `<!-- DON'T DO THIS -->
<div class="leaderboard">
  <h3>Team Rankings</h3>
  <ol>
    <li class="rank-1">Alex — 2,450 pts</li>
    <li class="rank-2">Sarah — 2,100 pts</li>
    <li class="rank-3">Mike — 1,800 pts</li>
    <li class="rank-you last">You — 340 pts</li>
  </ol>
  <p class="gap-message">You're 1,460 points behind the next person.
     You need to work much harder.</p>
</div>`,
        explanation:
          'Showing only the gap and telling the user to "work much harder" threatens self-esteem. Users will externalize blame ("this system is unfair", "they had a head start") and disengage rather than improve.',
        principle:
          'Leaderboards that shame users trigger defensive externalization and disengagement',
      },
      {
        title: 'System Takes Credit for User Success',
        description:
          'AI-powered tool that claims responsibility for the user\'s good outcomes',
        code: `<!-- DON'T DO THIS -->
<div class="results-banner">
  <h3>Our AI Found Amazing Results!</h3>
  <p>Our proprietary algorithm identified 15 leads for you.</p>
  <p>Our technology increased your conversion rate by 23%.</p>
  <p class="cta">Upgrade to Premium so our AI can do even more.</p>
</div>`,
        explanation:
          'By attributing all positive outcomes to "our AI" and "our technology", the system strips users of ownership. Users feel like passengers rather than drivers, reducing satisfaction and perceived value of their own effort.',
        principle:
          'Never claim credit for outcomes the user worked to achieve — it reduces satisfaction and loyalty',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Apple Watch / Fitbit Activity Rings',
        description: 'Fitness trackers celebrate achievements with animations, badges, and messages like "You did it!" and "Your longest streak yet!" All positive outcomes are attributed to the user\'s effort. When goals aren\'t met, the messaging is gentle: "You can still close your rings" rather than "You failed to exercise."',
        effectiveness: 'very-effective',
        analysis: 'By attributing success to user effort ("You did it!") and framing failure as opportunity rather than shortcoming, fitness trackers sustain long-term engagement. Users feel they are getting healthier through their own discipline, creating strong product loyalty.',
      },
      {
        company: 'Riot Games',
        product: 'League of Legends / Online Gaming',
        description: 'Gamers commonly attribute wins to their own skill and losses to "lag", bad teammates, or unfair matchmaking. Game UIs that show personal stats after wins but show team stats after losses inadvertently reinforce this bias. The gaming community term "gg ez" (good game, easy) exemplifies self-serving attribution.',
        effectiveness: 'effective',
        analysis: 'Games that lean into self-serving bias (celebrating personal achievements, offering explanations for losses like "tough matchup") retain players longer than those that surface harsh individual performance metrics after losses.',
      },
      {
        company: 'LinkedIn',
        product: 'Endorsements and Skill Badges',
        description: 'LinkedIn\'s endorsement system lets users accumulate visible skill validations. The "Top Voice" and skill assessment badges frame professional competence as user-owned. When endorsements come in, the notification says "Someone endorsed you for Leadership" — attributing the recognition to the user\'s demonstrated ability.',
        effectiveness: 'very-effective',
        analysis: 'LinkedIn brilliantly leverages self-serving bias by making professional achievements feel personally earned. Users curate their profiles to reinforce self-image, driving engagement and premium subscriptions for features like "See who viewed your profile."',
      },
      {
        company: 'Strava',
        product: 'Personal Records and Kudos',
        description: 'Strava highlights personal records ("Your fastest 5K!"), segments where users outperform their own history, and kudos from the community. Poor performances are simply recorded without negative commentary. The "Year in Sport" summary focuses entirely on achievements.',
        effectiveness: 'very-effective',
        analysis: 'By celebrating personal bests and ignoring poor performances, Strava lets users maintain positive self-attribution for fitness progress. The social kudos system amplifies external validation of internally-attributed success.',
      },
    ],

    abTests: [
      {
        title: 'Error Messages: User-Blaming vs System-Absorbing',
        hypothesis:
          'Non-blaming error messages will increase form completion rates by preserving user self-esteem',
        controlVersion: {
          description:
            'Form errors with user-blaming language: "You entered an invalid email", "Your password doesn\'t meet requirements", "You made 3 errors"',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '4:10',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Form errors with system-absorbing language: "This doesn\'t look like a complete email", "The password needs a number", "3 fields need attention"',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '3:20',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Non-blaming error messages increased form completion by 37%. Users spent less time (less frustration), scrolled further (less abandonment), and were significantly less likely to rage-quit. Exit surveys showed users rated the non-blaming form as "easier to use" even though validation rules were identical.',
          learnings: [
            'User-blaming language triggers defensive abandonment',
            'System-absorbing errors feel like a collaborative experience',
            'Perceived difficulty is strongly influenced by attribution framing',
            'Non-blaming errors reduced support tickets by 28%',
          ],
        },
      },
      {
        title: 'Achievement Framing: User-Attributed vs Neutral',
        hypothesis:
          'Celebrating milestones with user-attributing language will increase retention',
        controlVersion: {
          description:
            'Neutral milestone messaging: "Milestone reached: 100 tasks completed. Streak: 7 days."',
          metrics: {
            conversionRate: '61%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'User-attributing milestone messaging: "You completed 100 tasks! Your 7-day streak shows real dedication. Keep it up!"',
          metrics: {
            conversionRate: '79%',
            clickThroughRate: '34%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'User-attributing achievement messages increased 7-day retention by 30% and sharing by 89%. Users who received self-attributing messages were twice as likely to set new goals. The emotional ownership of achievement drove stronger habit formation.',
          learnings: [
            'Personal attribution language significantly boosts retention',
            'Users share achievements more when they feel personal ownership',
            'Self-attributing success messages create stronger product affinity',
            'The effect compounds: each celebrated milestone increases the next retention window',
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
        name: 'Asymmetric Success/Failure Messaging',
        description:
          'Success messages use personal, celebratory language while error messages use neutral or system-blaming language',
        howToSpot:
          'Compare the tone and attribution in success states versus error states — look for "You did it!" vs "Something went wrong"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Achievement and Badge Systems',
        description:
          'Visual rewards like badges, trophies, streaks, and progress bars that frame accomplishments as user-driven',
        howToSpot:
          'Look for celebratory icons, confetti animations, badge collections, or streak counters with personal language',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Error State Tone',
        description:
          'Error messages that avoid "you" language and instead use passive or system-attributing phrasing',
        howToSpot:
          'Check error messages for "you failed/you entered/your mistake" vs "something went wrong/please check/let\'s try again"',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Performance Dashboard Framing',
        description:
          'Metrics dashboards that frame improvements as user achievements and downturns as external factors',
        howToSpot:
          'Look for phrases like "Your growth" for positive metrics vs "Market conditions" for negative ones',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Credit Attribution in AI/Automated Features',
        description:
          'Whether AI or automated results are presented as user-driven or system-driven',
        howToSpot:
          'Check if messaging says "You found 15 results" vs "Our AI found 15 results" — who gets the credit?',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Success Celebration Pattern',
        description: 'Explicit celebratory UI moments when users complete tasks or reach milestones',
        indicators: ['Confetti or animation on task completion', 'Personal language: "You did it!", "Great job!"', 'Achievement badges or visual rewards', 'Sharing prompts after positive outcomes'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Blame Absorption Pattern',
        description: 'Error states that systematically avoid attributing fault to the user',
        indicators: ['Passive or system-blaming error phrasing', 'Absence of "you" in error messages', '"Something went wrong" rather than "You made an error"', 'Recovery-focused language: "Let\'s try again"'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Asymmetric Attribution Pattern',
        description: 'Different attribution language for positive vs negative outcomes in the same interface',
        indicators: ['Positive metrics: "Your growth increased 15%"', 'Negative metrics: "Market conditions affected results"', 'Success: active voice, user as subject', 'Failure: passive voice, system or circumstances as subject'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Personal Record Emphasis Pattern',
        description: 'Highlighting personal bests and improvements while downplaying poor performances',
        indicators: ['Personal record badges or notifications', 'Historical best comparisons', 'Absence of "worst performance" tracking', 'Progress-focused rather than deficit-focused metrics'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do success messages attribute outcomes to the user\'s effort or skill?',
      'Do error messages avoid blaming the user directly?',
      'Is there asymmetry in how success and failure are framed?',
      'Does the achievement system reinforce internal attribution for positive outcomes?',
      'Are leaderboards or rankings presented in a way that protects self-esteem?',
      'When AI or automation produces results, who gets the credit — the user or the system?',
      'Do performance dashboards frame improvements as user-driven?',
      'Are failure states presented with recovery paths rather than blame?',
      'Does the copy use "you" language for success and neutral language for errors?',
      'Are there moments where the system takes credit for user accomplishments?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in self-serving bias.

Analyze the provided design for self-serving bias patterns. Identify:

1. **Success Attribution**: How positive outcomes are framed — does the user get credit?
2. **Failure Attribution**: How errors and negative outcomes are communicated — is the user blamed?
3. **Achievement Systems**: Badges, streaks, and celebrations — do they reinforce user ownership?
4. **Error UX**: Error messages, recovery flows — do they absorb blame or assign it?
5. **Performance Framing**: Dashboards and metrics — are improvements attributed to the user?

For each pattern found:
- Identify whether attribution is internal (user) or external (system/circumstances)
- Assess if the asymmetry is appropriate and ethical
- Determine if error states preserve user self-esteem without hiding necessary feedback
- Evaluate whether achievement systems are genuine or manipulatively flattering
- Suggest improvements for balanced, ethical attribution design

Consider:
- Is the design reinforcing positive self-image without being dishonest?
- Are error messages non-blaming while still being informative?
- Does the achievement system build genuine motivation or hollow flattery?
- Are there contexts where honest attribution is more important than ego protection?
- Is the design ethically leveraging self-serving bias or exploiting it?

Provide actionable recommendations for ethical, user-respecting attribution design.`,

    outputSchema: {
      type: 'object',
      properties: {
        attributionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              attributionDirection: { type: 'string' },
              context: { type: 'string' },
              appropriateness: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'attributionDirection',
              'context',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            successAttributionScore: { type: 'number' },
            failureHandlingScore: { type: 'number' },
            achievementDesignScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'successAttributionScore',
            'failureHandlingScore',
            'achievementDesignScore',
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
        'attributionPatterns',
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
        title: 'Audit Your Success and Failure Messaging',
        description:
          'Review all success states, error messages, and outcome notifications for attribution patterns',
        example:
          'List every error message and success notification in the product. Check: does the user get credit for success? Does the user get blamed for failure?',
        tips: [
          'Search your codebase for "you failed", "invalid", "error", "wrong"',
          'Check if success messages use personal, active language',
          'Identify any messages that might threaten user self-image',
        ],
      },
      {
        step: 2,
        title: 'Rewrite Error Messages to Absorb Blame',
        description:
          'Replace user-blaming error messages with system-absorbing, recovery-focused alternatives',
        example:
          'Change "You entered an invalid email" to "This doesn\'t look like a complete email address"',
        tips: [
          'Remove "you" from error messages where possible',
          'Focus on what needs to happen, not what went wrong',
          'Offer specific, actionable guidance for recovery',
        ],
      },
      {
        step: 3,
        title: 'Design Achievement Moments',
        description:
          'Create celebratory UI moments that reinforce user ownership of positive outcomes',
        example:
          'Add a confetti animation and personal message when users complete their first project',
        tips: [
          'Use "you" language in success states',
          'Celebrate effort and consistency, not just results',
          'Make achievement moments shareable to amplify ownership',
        ],
      },
      {
        step: 4,
        title: 'Frame Performance Data as User-Driven',
        description:
          'Present metrics and dashboards in a way that attributes improvements to user effort',
        example:
          'Show "Your response time improved 20%" rather than "Average response time decreased"',
        tips: [
          'Use personal possessives: "your growth", "your progress"',
          'Compare to user\'s own history, not just benchmarks',
          'Highlight personal records and milestones',
        ],
      },
      {
        step: 5,
        title: 'Test Attribution Impact on Engagement',
        description:
          'A/B test user-attributing vs neutral messaging to measure retention and satisfaction',
        example:
          'Test "You completed 10 tasks!" vs "10 tasks completed" on retention metrics',
        tips: [
          'Measure retry rates after errors for blame-absorbing messages',
          'Track achievement sharing rates for self-attributing celebrations',
          'Monitor support ticket volume as a proxy for frustration',
        ],
      },
    ],

    dos: [
      'Use personal, celebratory language for success states ("You did it!", "Great work!")',
      'Absorb blame in error messages — blame the system, connection, or circumstance, not the user',
      'Design achievement systems that reinforce user ownership of positive outcomes',
      'Frame performance improvements as user-driven in dashboards and reports',
      'Preserve user input and progress during error recovery so users don\'t feel punished',
      'Celebrate effort and consistency, not just outcomes',
      'Use "you" language in success states and neutral language in error states',
      'Provide recovery paths that feel collaborative, not punitive',
    ],

    donts: [
      'Don\'t use "you failed", "your error", or "you did this wrong" in error messages',
      'Don\'t create leaderboards that only show how far behind someone is',
      'Don\'t take credit for outcomes the user worked to achieve ("Our AI did this for you")',
      'Don\'t use self-serving bias to flatter users into upsells or premium purchases',
      'Don\'t hide necessary feedback behind excessive blame absorption — users still need clear guidance',
      'Don\'t create asymmetric attribution that is dishonest about actual causes',
      'Don\'t design achievement systems that feel hollow or patronizing',
      'Don\'t frame external failures as user failures in team or collaborative settings',
    ],

    bestPractices: [
      {
        title: 'The Attribution Asymmetry Rule',
        description:
          'Success messages should use active, personal language ("You achieved..."). Error messages should use passive or system-directed language ("Something went wrong...")',
        rationale:
          'Matching natural self-serving attribution patterns creates interfaces that feel intuitive and respectful',
        example:
          'Success: "You closed 12 deals this quarter!" / Error: "The sync didn\'t complete — we\'ll retry automatically"',
      },
      {
        title: 'Celebrate Effort, Not Just Outcomes',
        description:
          'Recognize streaks, consistency, and improvement — not just final results',
        rationale:
          'Effort-based attribution is more sustainable and honest than outcome-only celebration',
        example:
          '"5 days in a row! Your consistency is building real momentum" rather than only celebrating end goals',
      },
      {
        title: 'Non-Threatening Error Recovery',
        description:
          'Design error flows that preserve user progress, offer clear next steps, and never make users feel punished',
        rationale:
          'When errors threaten self-image, users disengage. Smooth recovery maintains engagement and trust.',
        example:
          'Auto-save form progress, pre-fill corrected fields, offer "Try again" as the primary action',
      },
      {
        title: 'Balanced Performance Dashboards',
        description:
          'Show personal improvement trends alongside absolute metrics to give users ownership of progress',
        rationale:
          'Users are more motivated by personal growth narratives than abstract benchmarks',
        example:
          'Show "Your best month yet: 47 tasks" alongside "Team average: 35 tasks" — user feels above average through their own effort',
      },
      {
        title: 'Ethical Achievement Design',
        description:
          'Build achievement systems that reflect genuine accomplishment, not manufactured flattery',
        rationale:
          'Hollow achievements ("Congrats on logging in!") feel patronizing and erode trust',
        example:
          'Celebrate meaningful milestones: first project completed, 30-day streak, personal record — not trivial actions',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Success and error messages must be programmatically accessible',
        implementation:
          'Use role="status" for success celebrations and role="alert" for errors so assistive technology users receive the same attribution framing',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Errors must be identified and described in text without blaming the user',
        implementation:
          'Describe what needs to change, not what the user did wrong. "Email needs an @ symbol" rather than "You forgot the @ symbol"',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - Provide constructive suggestions for fixing errors',
        implementation:
          'Offer specific recovery guidance focused on the solution, not the mistake: "Try a password with at least 8 characters"',
      },
    ],

    ethics: [
      {
        concern: 'Manipulative Flattery',
        severity: 'high',
        explanation:
          'Using self-attributing celebration to manipulate users into purchases, upgrades, or sharing',
        mitigation:
          'Ensure celebrations are genuine and proportionate to actual achievement. Never tie flattery directly to upsell prompts.',
      },
      {
        concern: 'Dishonest Attribution',
        severity: 'critical',
        explanation:
          'Claiming user success was self-earned when the system did most of the work, or blaming the system for genuine user errors that need correction',
        mitigation:
          'Be honest about what contributed to outcomes. Users need accurate feedback to improve, even when framed gently.',
      },
      {
        concern: 'Hiding Necessary Feedback',
        severity: 'high',
        explanation:
          'Over-absorbing blame to the point where users never learn from mistakes in safety-critical contexts',
        mitigation:
          'In medical, financial, and safety contexts, provide clear factual feedback about causes while maintaining respectful tone.',
      },
      {
        concern: 'Hollow Achievement Systems',
        severity: 'medium',
        explanation:
          'Creating achievements for trivial actions to artificially trigger self-serving attribution and engagement',
        mitigation:
          'Reserve celebrations for meaningful milestones. Let achievement feel earned, not manufactured.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Self-Serving Biases in the Attribution of Causality: Fact or Fiction?',
        author: 'Miller, D. T., & Ross, M.',
        year: 1975,
        doi: '10.1037/0033-2909.82.2.213',
        description:
          'The foundational review establishing self-serving bias as a robust phenomenon in causal attribution',
        type: 'foundational',
      },
      {
        title: 'Attribution of Success and Failure Revisited, or: The Motivational Bias is Alive and Well in Attribution Theory',
        author: 'Zuckerman, M.',
        year: 1979,
        doi: '10.1016/0022-1031(79)90064-7',
        description:
          'Landmark paper demonstrating the motivational component of self-serving attributions across diverse contexts',
        type: 'foundational',
      },
      {
        title: 'The Self-Serving Bias in Relational Context',
        author: 'Sedikides, C., Campbell, W. K., Reeder, G. D., & Elliot, A. J.',
        year: 1998,
        description:
          'Examines how self-serving bias operates in interpersonal and group contexts',
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
          'Comprehensive coverage of attribution biases including self-serving bias within the dual-process framework',
        type: 'foundational',
      },
      {
        title: 'Mistakes Were Made (But Not by Me)',
        author: 'Tavris, Carol & Aronson, Elliot',
        year: 2007,
        isbn: '9780156033909',
        description:
          'Explores self-justification and self-serving attribution in everyday life and major decisions',
        type: 'practical',
      },
      {
        title: 'The Social Animal',
        author: 'Aronson, Elliot',
        year: 2018,
        isbn: '9781464144189',
        description:
          'Classic social psychology text with detailed coverage of attribution theory and self-serving bias',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'How Self-Serving Bias Affects UX Writing',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/self-serving-bias/',
        description:
          'Practical guide to designing error messages and success states that work with self-serving bias',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Self-Serving Bias Explained',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/watch?v=2lnxs_DMGBg',
        description:
          'Accessible video explanation of self-serving bias with real-world examples',
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
