/**
 * COMMITMENT BIAS (Consistency Bias)
 *
 * Once we commit to something, we feel internal pressure to behave consistently with that commitment
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const commitmentBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'commitment-bias',
    name: 'Commitment Bias',
    aliases: ['Consistency Bias', 'Escalation of Commitment', 'Foot-in-the-Door Effect'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.SOCIAL,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'commitment',
      'consistency',
      'engagement',
      'onboarding',
      'retention',
      'progressive-disclosure',
      'loyalty',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Once we commit to something, we feel pressure to stay consistent with that commitment',

    detailed: `Commitment bias (also called consistency bias) describes the tendency for people to remain consistent with what they have previously said, done, or decided. Once a person makes a choice, takes a stand, or invests effort in something, they experience internal and social pressure to behave consistently with that commitment, even when the original rationale no longer holds.

This bias is rooted in the human desire for cognitive consistency. Inconsistency between our actions and beliefs creates psychological discomfort (cognitive dissonance), so we adjust our attitudes, beliefs, or behaviors to maintain alignment with prior commitments. The effect is amplified when the commitment is public, effortful, or freely chosen.

In product design, commitment bias is a powerful lever for engagement and retention. Progressive onboarding, streak mechanics, profile completion bars, and "foot-in-the-door" patterns all exploit the human drive toward consistency. Ethical designers use this to help users build beneficial habits, while dark patterns exploit it to trap users in escalating obligations they would not have agreed to upfront.`,

    psychologyBasis: {
      discoveredBy: 'Charles A. Kiesler, Leon Festinger, Robert Cialdini',
      year: 1957,
      theory: 'Cognitive Dissonance Theory / Consistency Principle',
      mechanism: `Once a commitment is made, several psychological mechanisms lock the person into consistent behavior:

1. **Cognitive Dissonance Reduction**: Acting inconsistently with a prior commitment creates uncomfortable tension, so the brain rationalizes staying the course
2. **Self-Perception Theory**: People infer their own attitudes from their behavior -- "I did X, so I must believe in X"
3. **Social Accountability**: Public commitments create external pressure to follow through, as inconsistency threatens social standing
4. **Sunk Cost Integration**: Prior investments of time, money, or effort make abandoning the commitment feel like a loss
5. **Identity Alignment**: Commitments become part of self-concept -- breaking them feels like betraying who we are

The effect is strongest when commitments are active (not passive), public (not private), effortful (not easy), and freely chosen (not coerced).`,
    },

    realWorldExample: `In Freedman and Fraser's classic 1966 experiment, researchers asked homeowners to place a small "Be a Safe Driver" sign in their window. Two weeks later, a different researcher asked those same homeowners (and a control group) to put up a large, ugly "Drive Carefully" billboard on their front lawn. Only 17% of the control group agreed, but 76% of those who had placed the small sign agreed to the billboard. The small initial commitment fundamentally changed how people saw themselves -- "I'm the kind of person who supports safe driving" -- making the larger request feel consistent with their identity.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Commitment bias profoundly affects user engagement, retention, and conversion in digital products. Once users take a small action -- creating an account, completing a step, making a public statement -- they feel drawn to continue on that path. Designers can leverage this to:

- Drive onboarding completion through progressive micro-commitments
- Increase conversion by using "foot-in-the-door" sequences (free trial to paid)
- Boost retention through streak mechanics and progress tracking
- Encourage feature adoption through incremental engagement steps
- Build loyalty through public goals, reviews, and community participation`,

    whenToUse: [
      {
        title: 'Progressive Onboarding',
        scenario:
          'When introducing new users to a product with many features',
        example:
          'Ask users to complete one small step at a time (set a name, then add a photo, then connect an account) rather than presenting all setup at once',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Free Trial to Paid Conversion',
        scenario: 'When converting free users to paying customers',
        example:
          'Let users invest time customizing their workspace, importing data, and building workflows during the trial -- the accumulated commitment makes switching costly',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Profile Completion',
        scenario: 'When encouraging users to provide more information or engage more deeply',
        example:
          'Show a profile completion bar starting at 20% (not 0%) so users feel they have already started and want to finish',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Goal Setting and Streaks',
        scenario: 'When building habit-forming products or learning platforms',
        example:
          'Let users publicly set a learning goal, then show their streak counter prominently to reinforce daily commitment',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Post-Purchase Engagement',
        scenario: 'When reducing buyer remorse and encouraging reviews',
        example:
          'After purchase, ask users to rate or share their choice, reinforcing the commitment and reducing regret',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Community Participation',
        scenario: 'When building active user communities',
        example:
          'Start with a simple "introduce yourself" prompt, then gradually encourage deeper contributions like answering questions or writing guides',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Trapping Users in Escalating Commitments',
        reason:
          'Using micro-commitments to lock users into obligations they would reject if presented upfront',
        consequence:
          'User resentment, churn, negative reviews, and potential regulatory issues',
        alternative:
          'Be transparent about the full journey upfront; let users see where the commitment path leads',
      },
      {
        title: 'Making It Hard to Change Course',
        reason:
          'Deliberately making cancellation, downgrading, or switching difficult to exploit sunk cost feelings',
        consequence:
          'Regulatory scrutiny (see FTC dark patterns enforcement), brand damage, and hostile users',
        alternative:
          'Make exit paths as clear as entry paths; easy cancellation builds trust and often improves retention',
      },
      {
        title: 'Guilt-Tripping for Breaking Commitments',
        reason:
          'Using emotional manipulation to shame users for unsubscribing, cancelling, or changing preferences',
        consequence:
          'Erodes trust, creates negative brand association, drives users away permanently',
        alternative:
          'Respect user autonomy; offer a graceful exit with option to return easily',
      },
      {
        title: 'High-Stakes or Irreversible Decisions',
        reason:
          'Exploiting commitment bias for financial, medical, or legal decisions where users need full autonomy',
        consequence:
          'Users make suboptimal decisions due to consistency pressure rather than rational evaluation',
        alternative:
          'Provide cooling-off periods, easy reversal, and explicit prompts to reconsider',
      },
    ],

    commonMistakes: [
      {
        title: 'Starting Too Big',
        description:
          'Asking for a large commitment upfront instead of building gradually',
        why: 'Users reject large initial asks; the power of commitment bias lies in small first steps',
        fix: 'Start with the smallest possible meaningful action, then escalate gradually',
      },
      {
        title: 'Invisible Progress',
        description:
          'Not showing users how far they have come or what they have already invested',
        why: 'Commitment bias requires awareness of prior investment to trigger consistency motivation',
        fix: 'Use progress bars, completion percentages, streak counters, and milestone celebrations',
      },
      {
        title: 'No Exit Path',
        description:
          'Removing or hiding options to cancel, undo, or change direction',
        why: 'Forced commitment breeds resentment; genuine commitment requires the freedom to leave',
        fix: 'Always provide clear exit paths; paradoxically, easy exits increase voluntary commitment',
      },
      {
        title: 'Commitment Without Value',
        description:
          'Asking for commitment steps that provide no value to the user',
        why: 'Users will not feel genuinely committed to arbitrary or meaningless actions',
        fix: 'Ensure each micro-commitment delivers immediate value or visible progress toward the user\'s own goal',
      },
      {
        title: 'Ignoring Commitment Fatigue',
        description:
          'Asking for too many commitments in too short a time',
        why: 'Rapid-fire commitment requests feel manipulative and trigger reactance',
        fix: 'Space commitment requests over time; respect natural engagement rhythms',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how commitment sequences unfold and how progress is visualized',
        examples: [
          'Multi-step wizards with progress bars leverage commitment at each step',
          'Profile completion widgets placed prominently remind users of unfinished commitments',
          'Streak counters and goal trackers positioned in navigation reinforce daily commitment',
          'Onboarding flows that reveal content progressively create natural commitment escalation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing shapes how commitments are perceived and remembered',
        examples: [
          'Bold milestone labels ("Step 3 of 5 complete!") reinforce progress commitment',
          'Personalized headings ("Your workspace is 80% ready") tie commitment to identity',
          'Action-oriented CTAs ("Continue building") frame next steps as consistent behavior',
          'Commitment language ("You chose...", "Your goal is...") reinforces prior decisions',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals progress, achievement, and the cost of breaking commitments',
        examples: [
          'Green progress fills visualize how much has been invested',
          'Achievement badges and gold accents celebrate commitment milestones',
          'Warm colors on streak counters create emotional attachment to consistency',
          'Muted or grey states for incomplete items highlight what is left to commit to',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns are the primary mechanism for building commitment sequences',
        examples: [
          'Each click, save, or customization deepens the user\'s investment',
          'Drag-and-drop personalization makes the workspace feel "mine"',
          'Typing a response or review creates stronger commitment than clicking a rating',
          'Progressive form completion (save as you go) accumulates micro-commitments',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether commitments feel voluntary and valuable or manipulative',
        examples: [
          '"You\'ve already completed 3 steps" reminds users of prior investment',
          '"Keep your streak alive" frames continuing as maintaining consistency',
          'Social proof ("Join 10,000 users who completed their profile") adds social commitment pressure',
          'Personalized recommendations based on prior choices reinforce consistency',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Commitment patterns must be equally clear and escapable for all users',
        examples: [
          'Progress indicators must be announced to screen readers, not just visual',
          'Multi-step flows need clear step indicators in tab order',
          'Exit and cancellation options must be keyboard accessible and clearly labeled',
          'Streak and goal information should not rely solely on color to communicate state',
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
        title: 'Progressive Profile Completion',
        description:
          'LinkedIn-style profile completion bar that starts at a non-zero value and guides users through small steps',
        code: `<div class="profile-completion">
  <div class="progress-header">
    <h3>Your Profile Strength</h3>
    <span class="percentage">65%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width: 65%"></div>
  </div>
  <div class="next-steps">
    <p>You're almost there! Complete these steps:</p>
    <ul class="steps-list">
      <li class="completed">Add your name</li>
      <li class="completed">Upload a photo</li>
      <li class="completed">Add your role</li>
      <li class="current">Write a short bio (5 min)</li>
      <li class="pending">Add 3 skills</li>
    </ul>
  </div>
  <button class="primary">Continue: Add Your Bio</button>
</div>`,
        explanation:
          'Starting at 65% (not 0%) leverages the endowed progress effect alongside commitment bias. Users see prior steps as investments already made, creating momentum to finish. Each completed step is visible, reinforcing the commitment already invested.',
        principle:
          'Small, visible prior commitments create momentum toward larger engagement',
        metrics: {
          before: '23% completed their profile with a single "Complete Profile" button',
          after: '68% completed their profile with progressive completion bar',
          improvement: '196% increase in profile completion rate',
        },
      },
      {
        title: 'Foot-in-the-Door Free Trial',
        description:
          'SaaS product that builds investment during trial before asking for payment',
        code: `<div class="trial-status">
  <div class="investment-summary">
    <h3>Your Workspace</h3>
    <div class="stats">
      <div class="stat">
        <span class="number">12</span>
        <span class="label">Projects created</span>
      </div>
      <div class="stat">
        <span class="number">47</span>
        <span class="label">Tasks completed</span>
      </div>
      <div class="stat">
        <span class="number">5</span>
        <span class="label">Team members</span>
      </div>
    </div>
  </div>
  <div class="trial-cta">
    <p>Your free trial ends in 3 days.</p>
    <p class="value-statement">Keep all 12 projects and your team's progress.</p>
    <button class="primary">Upgrade to Keep Your Work</button>
    <button class="secondary">Export Your Data</button>
  </div>
</div>`,
        explanation:
          'By showing users the investment they have made (projects, tasks, team members), the upgrade feels like preserving existing commitment rather than making a new purchase. The ethical touch: offering data export as an alternative.',
        principle:
          'Show accumulated investment to frame upgrading as consistency, not a new decision',
        metrics: {
          before: '8% trial-to-paid conversion with generic "Upgrade Now" prompt',
          after: '24% trial-to-paid conversion with investment summary',
          improvement: '200% increase in trial-to-paid conversion',
        },
      },
      {
        title: 'Public Goal Setting with Streaks',
        description:
          'Learning app that combines public commitment with streak mechanics',
        code: `<div class="goal-tracker">
  <div class="public-goal">
    <img src="avatar.jpg" alt="User avatar">
    <div class="goal-content">
      <p class="goal-text">
        <strong>You committed to:</strong>
        "Learn Spanish for 15 min every day"
      </p>
      <p class="shared-with">Shared with 3 friends</p>
    </div>
  </div>
  <div class="streak-display">
    <div class="streak-number">23</div>
    <div class="streak-label">Day Streak</div>
    <div class="streak-calendar">
      <!-- Last 7 days visualized -->
      <span class="day completed" title="Mon"></span>
      <span class="day completed" title="Tue"></span>
      <span class="day completed" title="Wed"></span>
      <span class="day completed" title="Thu"></span>
      <span class="day completed" title="Fri"></span>
      <span class="day completed" title="Sat"></span>
      <span class="day today" title="Sun">Today</span>
    </div>
  </div>
  <button class="primary">Start Today's Lesson</button>
</div>`,
        explanation:
          'Three commitment layers work together: the public goal (social accountability), the streak counter (consistency pressure), and sharing with friends (external accountability). The combination makes skipping a day feel like breaking a promise to oneself and others.',
        principle:
          'Public, visible, and social commitments are the strongest form of consistency pressure',
      },
    ],

    bad: [
      {
        title: 'Escalating Commitment Trap',
        description:
          'Service that uses small free actions to lock users into paid obligations',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-trap">
  <!-- Step 1: Innocent start -->
  <p>Create your free account! (No credit card needed)</p>

  <!-- Step 5: After hours of setup -->
  <p>Great! You've built 3 workflows and invited your team.</p>

  <!-- Step 6: The reveal -->
  <div class="paywall">
    <p>To keep your workflows running, upgrade to Pro.</p>
    <p class="small-print">Free tier limited to 1 workflow.
    Your 3 workflows will be paused in 24 hours.</p>
    <button class="primary">Upgrade - $99/mo</button>
    <!-- No export, no alternative -->
  </div>
</div>`,
        explanation:
          'This pattern deliberately conceals limitations until users are deeply invested. The "free" start was designed to accumulate sunk costs, making the surprise paywall feel inescapable. There is no graceful exit or data export option.',
        principle:
          'Never use hidden commitment escalation to trap users into paying for what they thought was free',
      },
      {
        title: 'Guilt-Trip Cancellation',
        description:
          'Subscription cancellation flow that shames users for leaving',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <img src="sad-puppy.jpg" alt="Sad puppy looking at you">
  <h2>Are you sure you want to abandon us?</h2>
  <p>You've been with us for 347 days. That's a lot of memories.</p>
  <p>Your 23-day streak will be destroyed forever.</p>
  <p class="guilt">Your friends Sarah and Mike will miss you in the group.</p>

  <button class="primary large">Stay! Don't Break Your Commitment!</button>
  <a href="#" class="tiny-link" style="color: #ccc; font-size: 0.7em;">
    I still want to leave (are you sure?)
  </a>
</div>`,
        explanation:
          'This pattern exploits commitment bias through emotional manipulation, social guilt, and dark UX patterns (tiny, low-contrast cancel link). It weaponizes the user\'s prior commitment and social connections against their autonomous choice.',
        principle:
          'Never use emotional manipulation or social guilt to prevent users from leaving',
      },
      {
        title: 'Forced Consistency After Changed Circumstances',
        description:
          'Platform that penalizes users for changing their mind after legitimate circumstance changes',
        code: `<!-- DON'T DO THIS -->
<div class="change-penalty">
  <h3>You selected the Annual Plan on Jan 15</h3>
  <p>Switching to monthly is not available until your annual
  term ends on Jan 14 next year.</p>
  <p class="penalty">Early cancellation fee: $150</p>
  <p class="small-print">By clicking "Subscribe" on Jan 15,
  you agreed to these terms (page 47, section 12.3).</p>
  <button disabled>Downgrade (Unavailable)</button>
</div>`,
        explanation:
          'Rigid enforcement of commitment when circumstances change creates hostility. The buried terms, penalty fees, and disabled UI elements exploit prior commitment rather than serving the user.',
        principle:
          'Allow users to change course gracefully; rigid commitment enforcement destroys trust',
      },
    ],

    realWorld: [
      {
        company: 'LinkedIn',
        product: 'Profile Completion Bar',
        url: 'https://www.linkedin.com',
        description:
          'LinkedIn displays a prominent profile strength meter that starts partially filled and guides users through progressive steps (add photo, headline, experience, skills). Each completed step makes users more invested, and the public nature of the profile adds social commitment pressure.',
        effectiveness: 'very-effective',
        analysis:
          'LinkedIn masterfully combines commitment bias with the endowed progress effect and social accountability. The profile is public, so each addition is a public commitment. The strength meter makes accumulated investment visible, driving completion rates significantly higher than a simple "edit profile" link.',
      },
      {
        company: 'Duolingo',
        product: 'Streak System',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo tracks consecutive days of practice as a "streak" and makes it highly visible with fire icons, streak counters, and notifications. Users can share streaks publicly and receive streak freeze power-ups, making the daily commitment feel consequential.',
        effectiveness: 'very-effective',
        analysis:
          'The streak is one of the most effective commitment mechanisms in consumer apps. Users report practicing specifically to avoid breaking their streak rather than because they want to learn that day. The public sharing amplifies social commitment, and streak freeze items monetize the anxiety of potentially losing accumulated commitment.',
      },
      {
        company: 'Kickstarter',
        product: 'Backing System',
        url: 'https://www.kickstarter.com',
        description:
          'Once a user backs a project, they receive updates, feel part of the community, and often increase their pledge or back additional projects by the same creator. The public backing is visible on their profile.',
        effectiveness: 'effective',
        analysis:
          'Kickstarter leverages public commitment (backing is visible), social commitment (community updates), and identity alignment ("I\'m a supporter of indie creators"). Backers often defend "their" projects in comments, demonstrating how commitment creates identity investment.',
      },
      {
        company: 'Peloton',
        product: 'Achievement and Milestone System',
        url: 'https://www.onepeloton.com',
        description:
          'Peloton tracks workout milestones (100 rides, 50 yoga sessions), displays badges on profiles, and has instructors give live shoutouts for milestone rides. The community celebrates consistency.',
        effectiveness: 'very-effective',
        analysis:
          'Peloton transforms private exercise into public commitment through leaderboards, badges, and social features. The hardware purchase itself is a major upfront commitment ($1,400+) that drives ongoing subscription retention -- users rationalize continued use to justify the initial investment.',
      },
      {
        company: 'GitHub',
        product: 'Contribution Graph',
        url: 'https://github.com',
        description:
          'GitHub displays a year-long contribution heatmap on every profile. Green squares represent days with contributions, making consistency visible and gaps conspicuous.',
        effectiveness: 'effective',
        analysis:
          'The contribution graph turns coding into a visible commitment streak. Developers report making commits specifically to "keep the graph green," even when the commits add minimal value. The public nature of the graph adds social accountability among peers.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Single Setup vs Progressive Micro-Commitments',
        hypothesis:
          'Breaking onboarding into small progressive steps will increase completion and 30-day retention',
        controlVersion: {
          description:
            'Single onboarding page with all fields: name, photo, bio, company, role, goals, integrations, team invites. One "Complete Setup" button at the bottom.',
          metrics: {
            conversionRate: '31%',
            timeOnPage: '4:12',
            thirtyDayRetention: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Five-step progressive onboarding: Step 1 (name + photo), Step 2 (role + company), Step 3 (first project), Step 4 (invite one teammate), Step 5 (set a weekly goal). Each step completable in under 60 seconds.',
          metrics: {
            conversionRate: '72%',
            timeOnPage: '6:45',
            thirtyDayRetention: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Progressive micro-commitments more than doubled completion rate. Each small step created investment that motivated the next. 30-day retention nearly doubled because users who completed onboarding had already built commitment through accumulated actions.',
          learnings: [
            'Small first steps are critical: Step 1 had 94% completion vs 31% for the single-page form',
            'Each completed step increased likelihood of completing the next by ~15%',
            'Users who completed all 5 steps had 3x higher 90-day retention than those who completed 1-2 steps',
            'The "invite a teammate" step was the strongest commitment driver for retention',
          ],
        },
      },
      {
        title: 'Trial Conversion: Generic CTA vs Investment Summary',
        hypothesis:
          'Showing users their accumulated investment will increase trial-to-paid conversion',
        controlVersion: {
          description:
            'Standard trial expiration banner: "Your free trial ends in 3 days. Upgrade to Pro for $29/mo"',
          metrics: {
            conversionRate: '7.3%',
            clickThroughRate: '14%',
          },
        },
        treatmentVersion: {
          description:
            'Personalized investment summary: "You\'ve created 8 projects, completed 34 tasks, and your team has logged 127 hours. Keep everything by upgrading to Pro for $29/mo"',
          metrics: {
            conversionRate: '18.6%',
            clickThroughRate: '31%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Making accumulated investment visible more than doubled conversion rate. Users who saw their specific usage data perceived the upgrade as protecting their existing investment rather than starting a new expense. The framing shifted from "buy something new" to "keep what you built."',
          learnings: [
            'Specific numbers (8 projects, 34 tasks) outperformed vague investment reminders',
            'Team usage data was the strongest motivator -- users felt responsible for team\'s investment too',
            'Users with higher investment converted at even higher rates (up to 34% for power users)',
            'Adding a data export option alongside upgrade paradoxically increased conversion by 8%',
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
          'Progress bars, completion percentages, or step indicators that show accumulated investment',
        howToSpot:
          'Look for progress bars, "X of Y complete" labels, profile strength meters, or step-by-step wizards',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Streak and Consistency Counters',
        description:
          'Consecutive-day counters, streak displays, or habit tracking visualizations',
        howToSpot:
          'Look for fire/flame icons, "X day streak" labels, calendar heatmaps, or daily check-in prompts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Escalating Engagement Steps',
        description:
          'Multi-step flows where each step asks for slightly more than the previous one',
        howToSpot:
          'Follow the user journey from signup through engagement: does each step ask for a bit more commitment?',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Investment Reminders',
        description:
          'Displays showing what the user has created, earned, or accumulated in the product',
        howToSpot:
          'Look for "You\'ve created X", "Your data", "Your team", or portfolio/collection displays near upgrade prompts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Public Commitment Displays',
        description:
          'Publicly visible goals, pledges, reviews, or profile information',
        howToSpot:
          'Check if user-generated content, goals, or commitments are shared publicly or with social connections',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Foot-in-the-Door Sequence',
        description: 'Small initial request followed by progressively larger asks',
        indicators: [
          'Free signup or trial with no credit card',
          'Small first task (name, photo) before larger setup',
          'Gradual feature unlocking as user engages more',
          'Progressive data collection spread across sessions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Streak Mechanics',
        description: 'Consecutive-use tracking that creates daily commitment pressure',
        indicators: [
          'Daily streak counters prominently displayed',
          'Notifications about maintaining streaks',
          'Streak freeze or protection mechanics (often paid)',
          'Social sharing of streak milestones',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Sunk Cost Surfacing',
        description: 'Displaying user investment data near decision points (upgrade, cancel, switch)',
        indicators: [
          'Usage statistics shown during cancellation flow',
          'Portfolio or collection size displayed near upgrade CTA',
          'Team or social connections highlighted when user considers leaving',
          '"You\'ll lose..." warnings at exit points',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Public Commitment Pattern',
        description: 'Making user actions, goals, or choices visible to others',
        indicators: [
          'Public profiles displaying activity or goals',
          'Social sharing prompts after commitments',
          'Community features that create accountability',
          'Leaderboards or achievement displays',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the onboarding flow use progressive micro-commitments?',
      'Are streak or consistency mechanics present?',
      'Is the user\'s accumulated investment (data, content, connections) visible near decision points?',
      'Are commitments made public or shared socially?',
      'Does the cancellation or exit flow reference prior investments or commitments?',
      'Are there escalating engagement steps that gradually increase what is asked of the user?',
      'Can users easily reverse, undo, or exit their commitments?',
      'Is the full commitment path transparent from the beginning?',
      'Are commitment reminders informative or guilt-inducing?',
      'Do streak mechanics include graceful recovery (freeze, skip) or are they punitive?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in commitment bias (consistency bias).

Analyze the provided design for commitment bias patterns. Identify:

1. **Micro-Commitment Sequences**: Progressive steps that build investment over time
2. **Streak/Consistency Mechanics**: Daily use tracking, streak counters, habit loops
3. **Sunk Cost Surfacing**: Displays of user investment near decision points
4. **Public Commitments**: Goals, reviews, or actions made visible to others
5. **Escalation Patterns**: Gradually increasing asks or obligations

For each pattern found:
- Identify the type of commitment being built (behavioral, social, financial, identity)
- Assess whether the commitment sequence is transparent and ethical
- Determine if users can easily exit or reverse commitments
- Evaluate whether the commitment serves the user's goals or primarily the business
- Suggest improvements for ethical, user-beneficial commitment design

Consider:
- Are initial commitments genuinely small and valuable?
- Is the full commitment path visible or deliberately hidden?
- Can users gracefully exit at any point?
- Are streak mechanics motivating or anxiety-inducing?
- Is investment data used to inform or to guilt?
- Are there dark patterns exploiting commitment (hidden escalation, guilt-trip cancellation)?

Provide actionable recommendations for ethical commitment design that genuinely helps users.`,

    outputSchema: {
      type: 'object',
      properties: {
        commitmentPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              commitmentType: { type: 'string' },
              escalationLevel: { type: 'string' },
              exitClarity: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'commitmentType',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            transparencyScore: { type: 'number' },
            exitEaseScore: { type: 'number' },
            userBenefitScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'transparencyScore',
            'exitEaseScore',
            'userBenefitScore',
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
        'commitmentPatterns',
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
        title: 'Identify the Desired Commitment Path',
        description:
          'Map the full journey from first interaction to deep engagement, identifying what genuine user commitment looks like',
        example:
          'Goal: Guide users from free signup to active daily use with a completed profile and team collaboration',
        tips: [
          'Define what "committed user" means in terms of user benefit, not just business metrics',
          'Map the natural progression users take when they genuinely find value',
          'Identify which commitments are most predictive of long-term satisfaction',
        ],
      },
      {
        step: 2,
        title: 'Design the Smallest First Step',
        description:
          'Create an initial action so small that virtually no one would refuse it',
        example:
          'First step: "What should we call you?" (just a name field, nothing else)',
        tips: [
          'The first step should take under 30 seconds',
          'It should deliver immediate value or visible progress',
          'Never ask for payment or sensitive information as a first step',
        ],
      },
      {
        step: 3,
        title: 'Build Progressive Escalation',
        description:
          'Design each subsequent step to be slightly larger, with each step delivering value',
        example:
          'Step 1: Name -> Step 2: First project -> Step 3: Invite teammate -> Step 4: Set weekly goal',
        tips: [
          'Each step should feel like a natural next action, not an arbitrary ask',
          'Deliver visible value at each step (show what they created, not just what is left)',
          'Allow skipping steps without penalty',
        ],
      },
      {
        step: 4,
        title: 'Make Investment Visible',
        description:
          'Show users what they have built, created, and accumulated at key moments',
        example:
          'Dashboard showing "12 projects, 47 tasks, 5 teammates" alongside the upgrade prompt',
        tips: [
          'Use specific numbers, not vague statements',
          'Show investment at decision points (upgrade, renewal, cancellation)',
          'Frame investment positively ("Look what you built") not negatively ("You\'ll lose this")',
        ],
      },
      {
        step: 5,
        title: 'Add Social Commitment Layers',
        description:
          'Create opportunities for public or social commitment that add accountability',
        example:
          'Allow users to share goals with friends, display achievements on profiles, celebrate milestones publicly',
        tips: [
          'Make social sharing optional, never forced',
          'Ensure public commitments can be made private later',
          'Use positive social reinforcement, not shame',
        ],
      },
      {
        step: 6,
        title: 'Ensure Ethical Exit Paths',
        description:
          'Design clear, accessible ways for users to reverse, pause, or exit commitments at any point',
        example:
          'One-click cancellation, data export, streak pause, downgrade options',
        tips: [
          'Exit paths should be as easy as entry paths',
          'Never guilt-trip or use dark patterns at exit points',
          'Offer graceful alternatives (pause, downgrade) alongside full cancellation',
          'Paradoxically, easy exits increase trust and reduce churn',
        ],
      },
    ],

    dos: [
      'Start with the smallest possible meaningful action',
      'Show accumulated progress and investment at key decision points',
      'Make each commitment step deliver immediate visible value',
      'Allow users to skip, pause, or reverse commitments easily',
      'Use positive framing ("Keep building") rather than negative ("Don\'t lose")',
      'Make the full commitment path transparent from the start',
      'Combine individual commitment with optional social accountability',
      'Celebrate milestones to reinforce the positive aspects of consistency',
      'Offer graceful exits with data portability',
      'Test commitment sequences with real users to ensure they feel helpful, not manipulative',
    ],

    donts: [
      'Don\'t hide the true scope of commitment behind small initial steps',
      'Don\'t make cancellation or exit harder than signup or entry',
      'Don\'t guilt-trip users for breaking commitments or changing their minds',
      'Don\'t use emotional manipulation (sad mascots, shame language) at exit points',
      'Don\'t penalize users for pausing or reducing their commitment level',
      'Don\'t surface sunk cost data specifically to prevent cancellation',
      'Don\'t make streaks punitive -- always offer recovery or freeze options',
      'Don\'t force public commitments that users might later want to retract',
      'Don\'t exploit commitment bias for decisions with serious consequences (financial, medical)',
      'Don\'t conflate user investment metrics with genuine user satisfaction',
    ],

    bestPractices: [
      {
        title: 'The Ethical Foot-in-the-Door',
        description:
          'Design micro-commitment sequences where every step genuinely benefits the user',
        rationale:
          'Ethical commitment design builds trust and creates sustainable engagement, while manipulative sequences create resentment and churn',
        example:
          'Each onboarding step unlocks a specific capability (add name -> personalized experience, add team -> collaboration features)',
      },
      {
        title: 'Transparent Commitment Paths',
        description:
          'Show users the full journey from the start so they can make informed decisions about their commitment',
        rationale:
          'Users who knowingly commit are more satisfied than those who feel tricked into escalating obligations',
        example:
          'Show all onboarding steps upfront: "5 quick steps to get started (about 3 minutes total)"',
      },
      {
        title: 'Graceful Streak Recovery',
        description:
          'Design streak mechanics with forgiveness: freeze days, recovery windows, and restart without shame',
        rationale:
          'Punitive streaks create anxiety; forgiving streaks create genuine habit formation',
        example:
          'Duolingo-style streak freeze, or "Welcome back! Pick up where you left off" instead of "You broke your streak!"',
      },
      {
        title: 'Investment-Aware Conversion',
        description:
          'Frame upgrades as protecting existing value rather than buying something new',
        rationale:
          'Users are more motivated by loss prevention (commitment consistency) than by new gains',
        example:
          '"Keep your 12 projects and team workspace" rather than "Get Pro features"',
      },
      {
        title: 'Exit with Dignity',
        description:
          'Make leaving as pleasant as joining, with data export and easy return',
        rationale:
          'Users who leave gracefully often return; users who feel trapped leave permanently and tell others',
        example:
          'One-click cancel, full data export, "Your account will be here if you come back" message',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Progress indicators must convey state programmatically',
        implementation:
          'Use ARIA roles (progressbar) and properties (aria-valuenow, aria-valuemin, aria-valuemax) for completion bars. Screen readers must announce step progress in multi-step flows.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All commitment actions and exit paths must be keyboard accessible',
        implementation:
          'Ensure cancel, skip, and back buttons are in the tab order and clearly focusable. Exit paths must not require mouse-only interactions.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to indicate commitment progress',
        implementation:
          'Combine color with text labels, icons, and patterns. Streak completion should use checkmarks or labels, not just green fills.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - Provide confirmation and reversal for significant commitments',
        implementation:
          'For financial commitments or data-affecting actions, provide clear confirmation dialogs with undo options. Make commitment consequences explicit before action.',
      },
    ],

    ethics: [
      {
        concern: 'Hidden Escalation',
        severity: 'critical',
        explanation:
          'Deliberately concealing the true scope of commitment behind innocent-seeming initial steps, so users find themselves locked in before they realize the full obligation',
        mitigation:
          'Always show the full commitment path upfront. Let users see where small steps lead before they take the first one.',
      },
      {
        concern: 'Dark Pattern Cancellation',
        severity: 'critical',
        explanation:
          'Making it deliberately difficult to cancel, unsubscribe, or exit a commitment (roach motel pattern), exploiting the investment users have already made',
        mitigation:
          'Make cancellation as easy as signup. One-click cancel, prominent cancel buttons, no phone-call-required cancellation. Follow FTC guidelines on negative option marketing.',
      },
      {
        concern: 'Guilt-Based Retention',
        severity: 'high',
        explanation:
          'Using emotional manipulation, social pressure, or shame to prevent users from breaking commitments ("Are you sure? Your friends will miss you")',
        mitigation:
          'Use informative language at exit points, not emotional manipulation. Offer genuine alternatives (pause, downgrade) without shame.',
      },
      {
        concern: 'Anxiety-Driven Streaks',
        severity: 'high',
        explanation:
          'Designing streak mechanics that create anxiety and compulsive behavior rather than genuine habit formation',
        mitigation:
          'Include streak freeze, recovery periods, and "welcome back" messaging. Never punish streak breaks with permanent loss.',
      },
      {
        concern: 'Sunk Cost Exploitation',
        severity: 'medium',
        explanation:
          'Surfacing accumulated investment data specifically to prevent rational decision-making at exit points',
        mitigation:
          'Show investment data in normal use (dashboard) not just at exit points. Offer data export so investment is portable.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Compliance Without Pressure: The Foot-in-the-Door Technique',
        author: 'Freedman, J. L., & Fraser, S. C.',
        year: 1966,
        doi: '10.1037/h0023552',
        description:
          'The foundational experiment demonstrating that small initial commitments dramatically increase compliance with larger subsequent requests',
        type: 'foundational',
      },
      {
        title: 'The Psychology of Commitment: Experiments Linking Behavior to Belief',
        author: 'Kiesler, C. A.',
        year: 1971,
        description:
          'Comprehensive framework for understanding how behavioral commitment shapes attitudes and subsequent behavior',
        type: 'foundational',
      },
      {
        title: 'A Theory of Cognitive Dissonance',
        author: 'Festinger, L.',
        year: 1957,
        description:
          'The theoretical foundation explaining why inconsistency between behavior and beliefs creates pressure for consistency',
        type: 'foundational',
      },
      {
        title: 'Escalation of Commitment to a Failing Course of Action',
        author: 'Staw, B. M.',
        year: 1976,
        doi: '10.2307/255629',
        description:
          'Research on how prior commitment leads to irrational escalation, even when evidence suggests changing course',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert B.',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on "Commitment and Consistency" is the definitive practical guide to how commitment bias operates in real-world persuasion',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Practical framework for designing investment and commitment loops in digital products',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers cognitive consistency and the psychological mechanisms underlying commitment bias',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Commitment & Consistency Bias in UX Design',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies/commitment-consistency-bias',
        description:
          'Visual case studies showing commitment bias patterns in popular apps with ethical analysis',
        type: 'practical',
      },
      {
        title: 'Progressive Engagement: Building Commitment Through Micro-Actions',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/progressive-engagement/',
        description:
          'Research-based guide to designing ethical commitment sequences in user onboarding',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Science of Persuasion: Commitment and Consistency',
        author: 'Cialdini, Robert B.',
        url: 'https://www.youtube.com/watch?v=cFdCzN7RYbw',
        description:
          'Robert Cialdini explaining the consistency principle with real-world examples',
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
      'sunk-cost-fallacy',     // Prior investment amplifies commitment pressure
      'endowment-effect',      // Ownership of created content increases commitment value
      'social-proof',          // Public commitments gain power from social visibility
      'loss-aversion',         // Fear of losing invested progress reinforces commitment
      'ikea-effect',           // Self-built features create stronger commitment
    ],

    conflicts: [
      'choice-overload',       // Too many commitment options can paralyze rather than engage
      'reactance',             // Forced commitment triggers resistance and opposition
    ],

    confusedWith: [
      'sunk-cost-fallacy',     // Related but distinct: sunk cost is about past investment, commitment is about consistency pressure
      'status-quo-bias',       // Overlaps but status quo is about preference for current state, commitment is about following through
      'endowment-effect',      // Ownership vs behavioral consistency are different mechanisms
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'foot-in-the-door',
        'escalation-of-commitment',
        'public-commitment-effect',
      ],
    },
  },
};
