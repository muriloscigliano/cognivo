/**
 * INTENTION-ACTION GAP
 *
 * We fail to act on our stated intentions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const intentionActionGap: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'intention-action-gap',
    name: 'Intention-Action Gap',
    aliases: [],
    category: BiasCategory.DECISION_MAKING,
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
    simple: 'We fail to act on our stated intentions',

    detailed: `The intention-action gap describes the pervasive disconnect between what people intend to do and what they actually do. Good intentions do not automatically translate into behavior. People routinely plan to exercise, save money, eat healthily, respond to emails, or complete tasks -- yet fail to follow through. The gap between planning and doing is one of the most robust findings in behavioral science.

In product and UX design, this bias is critical because users frequently express interest, add items to wishlists, bookmark content, or begin sign-up flows without ever completing the intended action. The friction between intent and execution -- whether caused by complexity, distraction, forgetting, or effort -- is the primary enemy of conversion, retention, and engagement.

Designers who understand the intention-action gap focus on reducing friction, automating follow-through, providing timely reminders, and structuring defaults so that the path from intention to action requires minimal effort. The goal is to make doing the right thing the easiest thing.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain forms intentions easily but struggles to execute them reliably. This happens because:

1. **Planning Fallacy**: People overestimate their future motivation and underestimate the effort required to act
2. **Present Bias**: Immediate costs (effort, discomfort) are weighted more heavily than future benefits, so people defer action
3. **Friction Sensitivity**: Even small obstacles -- an extra click, a required field, a loading screen -- can derail follow-through
4. **Context Forgetting**: Intentions formed in one context are forgotten when the person returns to their daily environment
5. **Cognitive Overload**: When too many steps or decisions are required, executive function is depleted and people abandon the task

The gap is not caused by a lack of desire. People genuinely want to act. The failure occurs at the point of execution, where environmental friction, competing demands, and present-moment costs override the original intention.`,
    },

    realWorldExample: `A person resolves on January 1st to go to the gym three times per week. They purchase a membership, buy new workout clothes, and tell friends about their goal. By February, they are going once a week; by March, not at all. The intention was genuine and strongly held, but the daily friction of getting dressed, driving to the gym, and enduring discomfort consistently outweighed the distant reward of fitness. Studies show that roughly 80% of New Year's resolutions fail by mid-February -- not from lack of desire, but from the gap between intending and doing.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The intention-action gap is one of the most consequential biases in product design. Users who intend to sign up, purchase, complete a profile, or return tomorrow frequently fail to do so -- not because they changed their mind, but because friction, distraction, or forgetting intervened. Designers can bridge this gap by:

- Reducing the number of steps between intent and completion
- Setting smart defaults that execute the intended action automatically
- Providing timely reminders and nudges at the moment of action
- Pre-filling forms and simplifying workflows to minimize effort
- Offering "set it and forget it" patterns that automate follow-through
- Removing unnecessary decision points that cause abandonment`,

    whenToUse: [
      {
        title: 'Checkout and Purchase Flows',
        scenario:
          'When users have expressed intent to buy by adding items to cart',
        example:
          'Offer one-click purchase, saved payment methods, and auto-filled shipping to eliminate friction between "I want this" and "I bought this"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Habit Formation Features',
        scenario: 'When helping users build recurring behaviors like exercise, learning, or saving',
        example:
          'Auto-schedule recurring actions, send contextual reminders, and pre-load the next session so users don\'t have to plan each time',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and Profile Completion',
        scenario: 'When users start but abandon setup or configuration flows',
        example:
          'Break onboarding into micro-steps, save progress automatically, and send follow-up nudges with deep links to resume',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Renewals and Upgrades',
        scenario: 'When users intend to continue or upgrade but forget to act',
        example:
          'Default to auto-renewal, send pre-expiry reminders, and offer one-tap upgrade prompts at contextually relevant moments',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Saving and Follow-Up',
        scenario: 'When users bookmark, save, or "read later" content they never return to',
        example:
          'Send digest emails of saved items, surface saved content in-app, and provide estimated read times to lower the barrier',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Irrevocable or High-Stakes Actions',
        reason:
          'Reducing friction on destructive actions (account deletion, large purchases) removes protective deliberation',
        consequence:
          'Users may complete actions they later regret, leading to support burden and trust erosion',
        alternative:
          'Add deliberate confirmation steps for irreversible actions while keeping low-stakes flows frictionless',
      },
      {
        title: 'Dark Pattern Territory',
        reason:
          'Auto-enrolling users in subscriptions or purchases they didn\'t explicitly choose exploits the gap unethically',
        consequence:
          'Regulatory action, chargebacks, user distrust, and reputational damage',
        alternative:
          'Use clear opt-in with friction reduction, not opt-out with hidden commitments',
      },
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Auto-sharing, auto-posting, or auto-consenting on behalf of users removes informed choice',
        consequence:
          'Privacy violations, loss of user trust, potential legal liability',
        alternative:
          'Require explicit action for privacy-impacting decisions while simplifying the action itself',
      },
      {
        title: 'Financial Commitments',
        reason:
          'Making it too easy to spend money can harm users with impulsive tendencies or limited budgets',
        consequence:
          'Buyer\'s remorse, chargebacks, and ethical concerns around vulnerable populations',
        alternative:
          'Reduce friction for considered purchases while adding cooling-off periods for large amounts',
      },
    ],

    commonMistakes: [
      {
        title: 'Adding Unnecessary Steps',
        description:
          'Requiring account creation, email verification, or profile completion before allowing the core action',
        why: 'Every additional step between intention and action is a dropout point; users abandon when friction exceeds motivation',
        fix: 'Allow the core action first (guest checkout, immediate access), then request additional information afterward',
      },
      {
        title: 'Ignoring the Reminder Window',
        description:
          'Sending reminders at random times instead of at the moment when the user can act',
        why: 'A reminder at 3 AM or during a meeting creates awareness without opportunity, wasting the nudge',
        fix: 'Use behavioral data to identify optimal reminder timing based on when users typically engage',
      },
      {
        title: 'Not Saving Progress',
        description:
          'Losing user input when they navigate away or close the app mid-flow',
        why: 'Users who must restart from scratch after interruption rarely do so; the intention dies with the lost progress',
        fix: 'Auto-save all progress and provide easy resume paths with clear indicators of where they left off',
      },
      {
        title: 'Requiring Too Many Decisions',
        description:
          'Presenting multiple configuration options, plan choices, or customization steps before allowing action',
        why: 'Decision fatigue depletes the willpower needed to complete the action; users defer "until later" and never return',
        fix: 'Provide smart defaults and allow customization after the core action is complete',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines how many steps and how much scrolling separates intention from action',
        examples: [
          'Single-page checkout reduces abandonment vs multi-page flows',
          'Sticky CTAs keep the action button visible as users scroll',
          'Progressive disclosure reveals complexity only when needed',
          'Inline editing eliminates navigate-edit-save friction',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Clear, action-oriented text reduces cognitive effort and uncertainty',
        examples: [
          'Button labels that describe the outcome ("Start free trial") not the process ("Submit form")',
          'Microcopy that reassures ("No credit card required", "Takes 30 seconds")',
          'Progress indicators that show proximity to completion',
          'Clear next-step instructions that eliminate guesswork',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color directs attention to the action path and signals progress',
        examples: [
          'High-contrast primary CTAs stand out from surrounding content',
          'Progress bar colors indicate completion momentum',
          'Success colors after each micro-step reinforce forward motion',
          'Muted colors on secondary actions reduce decision paralysis',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines the effort required to bridge the gap from intent to action',
        examples: [
          'One-click actions eliminate multi-step friction (Amazon Buy Now)',
          'Swipe-to-complete gestures reduce effort on mobile',
          'Auto-fill and smart defaults minimize manual input',
          'Inline actions avoid context-switching and page navigation',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing can either motivate immediate action or defer it to a "later" that never comes',
        examples: [
          'Time-limited offers create urgency that bridges the gap',
          'Implementation intentions ("I will do X when Y happens") increase follow-through',
          'Concrete next steps ("Click here to start") outperform vague aspirations ("Learn more")',
          'Social proof ("1,247 people completed this today") normalizes the action',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility barriers create additional friction that widens the intention-action gap for disabled users',
        examples: [
          'Keyboard-navigable flows ensure action completion without a mouse',
          'Screen reader-friendly forms prevent invisible friction for blind users',
          'Touch targets large enough for motor-impaired users reduce interaction cost',
          'Reduced-motion alternatives prevent vestibular-triggered abandonment',
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
        title: 'One-Click Purchase',
        description:
          'E-commerce site offering instant purchase with saved payment and shipping details',
        code: `<div class="product-card">
  <h3>Wireless Headphones</h3>
  <div class="price">$79.99</div>
  <div class="shipping">Free delivery tomorrow</div>

  <button class="buy-now primary">
    Buy Now with 1-Click
  </button>
  <p class="saved-info">
    Ships to: Home address | Visa ending 4242
  </p>

  <button class="secondary">Add to Cart</button>
</div>`,
        explanation:
          'By saving payment and shipping information, the entire purchase flow collapses from intent to completion in a single click. The user\'s original intention to buy is not eroded by form-filling, page navigation, or decision fatigue.',
        principle:
          'Minimize steps between intention and completion to maximize follow-through',
        metrics: {
          before: '23% cart-to-purchase conversion with standard checkout',
          after: '65% cart-to-purchase conversion with one-click buy',
          improvement: '183% increase in purchase completion rate',
        },
      },
      {
        title: 'Pre-Scheduled Reminders with Auto-Action',
        description:
          'Health app that auto-schedules medication reminders and pre-loads the confirmation screen',
        code: `<div class="reminder-setup">
  <h3>Daily Medication Reminder</h3>

  <div class="schedule">
    <span class="time">8:00 AM</span>
    <span class="status active">Auto-scheduled</span>
  </div>

  <div class="notification-preview">
    <p>You'll see this at 8:00 AM:</p>
    <div class="mock-notification">
      <strong>Time to take Vitamin D</strong>
      <p>Tap to confirm | Snooze 15 min</p>
    </div>
  </div>

  <label class="toggle">
    <input type="checkbox" checked>
    <span>Auto-remind daily</span>
  </label>
  <p class="reassurance">We'll remind you so you don't have to remember</p>
</div>`,
        explanation:
          'The app bridges the intention-action gap by removing the burden of remembering. Auto-scheduling means the user sets up once and the system handles follow-through. The confirmation is a single tap, not a multi-step flow.',
        principle:
          '"Set it and forget it" patterns automate follow-through on recurring intentions',
        metrics: {
          before: '34% medication adherence with manual tracking',
          after: '78% medication adherence with auto-reminders',
          improvement: '129% increase in daily follow-through',
        },
      },
      {
        title: 'Auto-Save with Resume Flow',
        description:
          'Application form that saves progress automatically and provides a one-tap resume',
        code: `<div class="resume-banner">
  <div class="progress-info">
    <div class="progress-bar" style="width: 60%"></div>
    <p><strong>Your application is 60% complete</strong></p>
    <p class="last-saved">Auto-saved 2 minutes ago</p>
  </div>

  <button class="primary">Continue Where You Left Off</button>
  <p class="estimate">About 3 minutes remaining</p>
</div>`,
        explanation:
          'Users who abandon a form mid-way rarely return if they must start over. Auto-saving progress and surfacing a clear resume path with time estimate lowers the barrier to re-engage, turning a dropped intention into a completed action.',
        principle:
          'Preserve progress and minimize restart cost to recover abandoned intentions',
      },
    ],

    bad: [
      {
        title: 'Multi-Step Registration Before Core Action',
        description:
          'App requiring full registration, email verification, and profile setup before any value is delivered',
        code: `<!-- DON'T DO THIS -->
<div class="signup-wall">
  <h2>Create Your Account to Continue</h2>
  <form>
    <input type="text" placeholder="Full name" required>
    <input type="email" placeholder="Email" required>
    <input type="password" placeholder="Password (min 12 chars)" required>
    <input type="password" placeholder="Confirm password" required>
    <input type="tel" placeholder="Phone number" required>
    <select required>
      <option>Select your industry</option>
    </select>
    <select required>
      <option>How did you hear about us?</option>
    </select>
    <label><input type="checkbox" required> I agree to Terms</label>
    <label><input type="checkbox" required> I agree to Privacy Policy</label>
    <button type="submit">Create Account</button>
  </form>
  <p class="note">You'll need to verify your email before accessing the app.</p>
</div>`,
        explanation:
          'Users arrived with intent to use the product, but face 9+ required fields, two checkbox agreements, and an email verification step before seeing any value. Each field is a dropout point. The intention to try the product dies under friction.',
        principle:
          'Never place a wall of friction between the user\'s intention and their first moment of value',
      },
      {
        title: 'High-Friction CTA with No Follow-Through Support',
        description:
          'Fitness app that motivates users to commit but provides no execution support',
        code: `<!-- DON'T DO THIS -->
<div class="motivation-screen">
  <h2>Ready to Transform Your Life?</h2>
  <p>Set your fitness goals and start your journey!</p>

  <button class="primary">I'm Ready!</button>

  <!-- After clicking, user sees: -->
  <div class="empty-state">
    <h3>Great! Now plan your first workout.</h3>
    <p>Browse our library of 500+ exercises to build your routine.</p>
    <p>Select exercises, set reps, choose days, and configure rest periods.</p>
    <a href="/exercises">Browse Exercise Library</a>
  </div>
</div>`,
        explanation:
          'The app captures motivational intent with an exciting CTA but then dumps the user into an overwhelming exercise library with no guidance. The gap between "I\'m ready!" and actually completing a workout is enormous. Users leave and never return.',
        principle:
          'Capturing intent without supporting execution guarantees abandonment',
      },
      {
        title: 'Bookmark-and-Forget Pattern',
        description:
          'Content platform that lets users save articles but never surfaces them again',
        code: `<!-- DON'T DO THIS -->
<div class="article-card">
  <h3>10 Strategies for Better Sleep</h3>
  <button class="save-btn">
    <span class="icon">bookmark</span> Save for Later
  </button>
</div>

<!-- Saved items buried 4 levels deep -->
<!-- Profile > Settings > Library > Saved Items -->
<!-- No reminders, no resurfacing, no digest -->`,
        explanation:
          'The user intends to read the article later, but "later" never comes. The saved items are buried in a settings menu with no reminders, no resurfacing in the feed, and no email digest. The intention to read is captured but never converted to action.',
        principle:
          'Saving intent without follow-through mechanisms creates a graveyard of abandoned intentions',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Apple Pay',
        url: 'https://www.apple.com/apple-pay/',
        description: 'Apple Pay reduces payment friction to a single biometric authentication (Face ID or Touch ID). Users who intend to purchase no longer need to pull out a wallet, enter card numbers, or sign receipts. The entire intention-to-payment flow takes under 2 seconds.',
        effectiveness: 'very-effective',
        analysis: 'Apple Pay is a textbook example of bridging the intention-action gap through friction elimination. By storing payment credentials and using biometric auth, Apple removed every step between "I want to buy this" and "I bought this." Adoption data shows Apple Pay users complete purchases at significantly higher rates than traditional payment users.',
      },
      {
        company: 'Amazon',
        product: '1-Click Buy',
        url: 'https://www.amazon.com',
        description: 'Amazon\'s patented 1-Click ordering allows users to purchase instantly with pre-saved shipping and payment information. A single button press completes the entire transaction, eliminating cart, checkout, and confirmation screens.',
        effectiveness: 'very-effective',
        analysis: 'Amazon 1-Click is perhaps the most famous intention-action gap solution in e-commerce. By collapsing a multi-step checkout into a single action, Amazon converts impulse intent into completed purchases before friction can intervene. The feature was so valuable that Amazon patented it in 1999.',
      },
      {
        company: 'Google',
        product: 'Google Calendar Reminders',
        url: 'https://calendar.google.com',
        description: 'Google Calendar automatically sends reminders before events and tasks, with customizable timing. Users set an intention (attend a meeting, complete a task) and the system handles the remembering, delivering nudges at the right moment.',
        effectiveness: 'very-effective',
        analysis: 'Google Calendar bridges the gap by externalizing memory. Users don\'t need to remember their intentions -- the system remembers for them and nudges at the optimal moment. Multi-device sync ensures reminders reach users wherever they are.',
      },
      {
        company: 'Vote.org',
        product: 'Voter Registration Tools',
        url: 'https://www.vote.org',
        description: 'Vote.org simplifies voter registration from a complex multi-step government process into a streamlined digital flow with pre-filled fields, step-by-step guidance, and deadline reminders. They also send election day reminders with polling location information.',
        effectiveness: 'effective',
        analysis: 'Voter registration is a classic intention-action gap problem: most eligible non-voters say they intend to vote but never register. Vote.org bridges the gap by reducing friction (simplified forms), providing implementation support (where to go, what to bring), and sending timely reminders. Their tools have registered millions of voters.',
      },
    ],

    abTests: [
      {
        title: 'Checkout Flow: Multi-Step vs Single-Page',
        hypothesis:
          'Reducing checkout steps will increase purchase completion by bridging the intention-action gap',
        controlVersion: {
          description:
            'Traditional 4-step checkout: Cart review > Shipping info > Payment info > Confirmation. Each step is a separate page load.',
          metrics: {
            conversionRate: '28%',
            timeOnPage: '4:35',
            bounceRate: '47%',
          },
        },
        treatmentVersion: {
          description:
            'Single-page checkout with all fields visible, auto-fill enabled, saved payment methods, and inline validation. One "Complete Purchase" button.',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '2:12',
            bounceRate: '23%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Collapsing 4 pages into 1 increased purchase completion by 46%. Users spent less than half the time in checkout, and bounce rate nearly halved. The single-page format eliminated three page-load transitions where users previously dropped off.',
          learnings: [
            'Each additional page in a checkout flow loses 10-15% of users',
            'Auto-fill and saved payment methods had the single largest impact on completion',
            'Inline validation prevented errors that previously caused frustration and abandonment',
            'Mobile users benefited even more than desktop users from reduced steps',
          ],
        },
      },
      {
        title: 'Fitness App: Motivation-Only vs Implementation Support',
        hypothesis:
          'Providing concrete implementation support (scheduled workouts, reminders) will increase workout completion vs motivational content alone',
        controlVersion: {
          description:
            'App shows motivational quotes, progress photos, and goal-setting tools. Users must plan and initiate workouts themselves.',
          metrics: {
            conversionRate: '12%',
            clickThroughRate: '35%',
          },
        },
        treatmentVersion: {
          description:
            'App auto-schedules workouts based on user goals, sends reminders 30 minutes before, pre-loads the workout screen, and offers "Start Now" push notifications.',
          metrics: {
            conversionRate: '38%',
            clickThroughRate: '62%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Implementation support tripled workout completion rates. Motivational content alone strengthened intention but did nothing to bridge the gap to action. Auto-scheduling and timely reminders were the most impactful features.',
          learnings: [
            'Motivation without execution support increases the intention-action gap rather than closing it',
            'Pre-scheduled actions with reminders outperform user-initiated actions by 3x',
            'The "Start Now" push notification at the scheduled time was the single highest-converting touchpoint',
            'Users who used auto-scheduling retained at 2.4x the rate of manual planners after 30 days',
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
        name: 'Multi-Step Friction',
        description:
          'Long forms, multi-page flows, or sequences with many required fields between intent and action',
        howToSpot:
          'Count the number of clicks, pages, or required inputs between the user\'s first expression of intent and the completion of that action',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Progress Persistence',
        description:
          'Forms or flows that lose user input on navigation, refresh, or session timeout',
        howToSpot:
          'Navigate away mid-flow and return; check if progress is preserved or lost',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Follow-Through Mechanisms',
        description:
          'Save, bookmark, or wishlist features with no reminder, resurfacing, or digest system',
        howToSpot:
          'Look for "save for later" features and check if saved items are ever resurfaced proactively',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Registration Walls',
        description:
          'Account creation required before any value is delivered to the user',
        howToSpot:
          'Attempt to use the core feature without an account; check if a signup wall blocks access',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Motivation Without Implementation',
        description:
          'Inspirational content, goal-setting, or commitment prompts with no concrete next-step support',
        howToSpot:
          'Look for motivational messaging followed by vague "get started" links rather than specific, pre-loaded actions',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Friction Funnel Pattern',
        description: 'Multiple sequential steps required between expressed intent and completed action',
        indicators: ['Multi-page checkout or signup flows', 'Required fields exceeding what is necessary for the action', 'Email verification before access', 'Mandatory profile completion before core feature use'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Abandoned Intent Pattern',
        description: 'Features that capture user intent (save, bookmark, wishlist) without follow-through mechanisms',
        indicators: ['Save/bookmark buttons with no reminder system', 'Wishlists buried in navigation', 'No email digest of saved items', 'Cart abandonment with no recovery flow'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Automation Pattern',
        description: 'Recurring actions that require manual initiation each time instead of auto-scheduling',
        indicators: ['No auto-renewal or auto-scheduling options', 'Recurring tasks requiring manual re-entry', 'No "set it and forget it" configuration', 'Missing default actions for common intentions'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Deferred Action Without Support Pattern',
        description: 'Users are asked to "come back later" without any mechanism to ensure they do',
        indicators: ['"Come back tomorrow" messaging with no reminder', 'Scheduled features with no push notification', 'Future actions with no calendar integration', 'Deferred tasks with no follow-up email'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many steps are there between a user\'s intent and the completed action?',
      'Is user progress saved automatically if they leave mid-flow?',
      'Are there reminders or nudges to bring users back to incomplete actions?',
      'Can recurring intentions be automated (auto-renew, auto-schedule, auto-save)?',
      'Are saved or bookmarked items ever resurfaced proactively?',
      'Is account creation required before delivering any value?',
      'Do smart defaults reduce the number of decisions users must make?',
      'Are abandoned carts, forms, or flows recovered with follow-up nudges?',
      'Is the CTA specific and action-oriented ("Start free trial") rather than vague ("Learn more")?',
      'Does the design support implementation (concrete next steps) or only motivation (inspirational content)?',
      'Are there unnecessary friction points that could be removed without compromising safety?',
      'Does the mobile experience have the same low friction as desktop, or does it add steps?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the intention-action gap.

Analyze the provided design for intention-action gap patterns. Identify:

1. **Friction Points**: Steps, forms, pages, or decisions between user intent and completed action
2. **Follow-Through Mechanisms**: Reminders, auto-save, progress persistence, and recovery flows
3. **Automation Opportunities**: Recurring actions that could be automated or defaulted
4. **Abandonment Risk**: Points where users are likely to drop off between intention and action
5. **Implementation Support**: Whether the design provides concrete next steps or only motivation

For each pattern found:
- Identify the gap between what users intend and what the design requires
- Count the number of steps, clicks, or decisions required
- Assess whether friction is necessary (safety) or unnecessary (poor design)
- Determine if follow-through mechanisms exist
- Suggest specific friction-reduction improvements

Consider:
- Can any steps be eliminated, combined, or automated?
- Is progress saved when users leave mid-flow?
- Are there reminders for abandoned actions?
- Do smart defaults reduce decision burden?
- Are there "set it and forget it" options for recurring intentions?
- Is the design optimized for the moment of action, not just the moment of intent?

Provide actionable recommendations for bridging intention-action gaps.`,

    outputSchema: {
      type: 'object',
      properties: {
        frictionPoints: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location: { type: 'string' },
              stepsRequired: { type: 'number' },
              frictionType: { type: 'string' },
              necessary: { type: 'boolean' },
              dropoffRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'location',
              'stepsRequired',
              'frictionType',
              'necessary',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            frictionScore: { type: 'number' },
            automationScore: { type: 'number' },
            followThroughScore: { type: 'number' },
            overallGapSeverity: { type: 'number' },
          },
          required: [
            'frictionScore',
            'automationScore',
            'followThroughScore',
            'overallGapSeverity',
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
        'frictionPoints',
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
        title: 'Map the Intent-to-Action Path',
        description:
          'Identify every step, click, and decision between the user\'s first expression of intent and the completed action',
        example:
          'Map the checkout flow: Add to cart > View cart > Enter shipping > Enter payment > Review > Confirm = 6 steps',
        tips: [
          'Walk through the flow yourself and count every interaction',
          'Include page loads, modal dismissals, and form fields',
          'Note where users must make decisions (plan choice, shipping method)',
        ],
      },
      {
        step: 2,
        title: 'Eliminate Unnecessary Friction',
        description:
          'Remove every step that is not strictly required for the action to succeed',
        example:
          'Remove mandatory account creation for checkout; offer guest checkout with optional account creation after purchase',
        tips: [
          'Ask "what happens if we remove this step?" for every element',
          'Defer non-essential information collection to after the core action',
          'Combine steps where possible (shipping + billing on one page)',
        ],
      },
      {
        step: 3,
        title: 'Add Smart Defaults and Auto-Fill',
        description:
          'Pre-populate fields, pre-select common options, and use saved data to reduce manual effort',
        example:
          'Auto-fill shipping address from saved profile, default to standard shipping, pre-select saved payment method',
        tips: [
          'Use browser auto-fill capabilities',
          'Save and reuse previous choices',
          'Default to the most common option for each decision point',
        ],
      },
      {
        step: 4,
        title: 'Implement Progress Persistence',
        description:
          'Auto-save all progress so users can resume from where they left off',
        example:
          'Save form data to local storage on every field change; show "Resume your application" banner on return',
        tips: [
          'Save on every input change, not just on form submission',
          'Provide clear resume paths (email deep links, in-app banners)',
          'Show progress indicators and time-to-completion estimates',
        ],
      },
      {
        step: 5,
        title: 'Build Follow-Through Mechanisms',
        description:
          'Add reminders, nudges, and automation to ensure intentions are converted to actions',
        example:
          'Send cart abandonment email after 1 hour, push notification after 24 hours, with direct "Complete Purchase" link',
        tips: [
          'Time reminders to when users are most likely to act',
          'Include deep links that resume exactly where the user left off',
          'Offer "set it and forget it" automation for recurring actions',
          'Use implementation intentions: "When X happens, do Y"',
        ],
      },
    ],

    dos: [
      'Reduce the number of steps between intent and action to the absolute minimum',
      'Auto-save progress so users never lose work',
      'Provide smart defaults that execute the most common intention',
      'Send timely reminders for abandoned actions and deferred intentions',
      'Offer one-click or one-tap completion for common actions',
      'Surface saved and bookmarked items proactively',
      'Use implementation intentions ("When will you do X?") to increase follow-through',
      'Provide clear progress indicators and time-to-completion estimates',
    ],

    donts: [
      'Don\'t require account creation before delivering value',
      'Don\'t lose user progress when they navigate away or refresh',
      'Don\'t add unnecessary form fields or decision points to core flows',
      'Don\'t rely on motivation alone without providing execution support',
      'Don\'t bury saved items, wishlists, or bookmarks in deep navigation',
      'Don\'t send reminders at random times unconnected to action opportunity',
      'Don\'t use friction reduction to trick users into unintended actions',
      'Don\'t ignore mobile-specific friction (small inputs, complex forms, slow loading)',
    ],

    bestPractices: [
      {
        title: 'Collapse Multi-Step Flows',
        description:
          'Reduce multi-page flows to single-page or single-action experiences wherever possible',
        rationale:
          'Each additional step loses 10-25% of users; collapsing steps compounds these gains',
        example:
          'Replace 4-page checkout with single-page checkout using auto-fill and saved methods',
      },
      {
        title: 'Default to Action',
        description:
          'Set default states that execute the user\'s most likely intention without requiring additional input',
        rationale:
          'Defaults are powerful because they eliminate the decision cost of acting; users follow the path of least resistance',
        example:
          'Auto-renew subscriptions, auto-save drafts, default to recommended plan',
      },
      {
        title: 'Use Implementation Intentions',
        description:
          'Help users form "when-then" plans that link a specific context to the intended action',
        rationale:
          'Research by Gollwitzer (1999) shows implementation intentions nearly double follow-through rates vs simple goal intentions',
        example:
          '"When would you like to be reminded?" with specific time/context options, not just "Remind me later"',
      },
      {
        title: 'Recover Abandoned Intentions',
        description:
          'Actively follow up on incomplete actions with targeted recovery flows',
        rationale:
          'Users who began an action demonstrated intent; a well-timed nudge often converts them',
        example:
          'Cart abandonment email with saved cart, deep link, and "Complete in 1 click" button',
      },
      {
        title: 'Measure the Gap',
        description:
          'Track the ratio of expressed intent to completed action at every stage',
        rationale:
          'You cannot close a gap you do not measure; intent-to-action metrics reveal exactly where users fall off',
        example:
          'Dashboard showing: Add to cart (100%) > Begin checkout (62%) > Complete purchase (34%) with drop-off analysis at each step',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.5',
        guideline:
          'Help - Context-sensitive help is available to reduce user effort and prevent errors',
        implementation:
          'Provide inline help text, auto-fill suggestions, and clear error recovery so that cognitive and learning-disabled users can complete actions without friction-induced abandonment',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Allow users enough time to complete actions without losing progress',
        implementation:
          'Auto-save form progress, extend session timeouts with warning, and never lose user data on timeout. Disabled users often need more time to complete flows.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.7',
        guideline:
          'Redundant Entry - Do not require users to re-enter information they have already provided',
        implementation:
          'Use auto-fill, remember previous inputs, and carry data forward across steps. Re-entering information is a significant friction point for users with motor or cognitive disabilities.',
      },
    ],

    ethics: [
      {
        concern: 'Manipulative Friction Removal',
        severity: 'critical',
        explanation:
          'Removing friction to make it too easy to spend money, subscribe, or commit -- especially for vulnerable users or impulse decisions',
        mitigation:
          'Add appropriate friction for high-stakes or irrevocable actions. Provide cooling-off periods, easy cancellation, and clear commitment disclosures. Never exploit impulsivity.',
      },
      {
        concern: 'Dark Pattern Defaults',
        severity: 'critical',
        explanation:
          'Setting defaults that serve business interests at user expense, such as auto-enrolling in premium plans or opt-out data sharing',
        mitigation:
          'Defaults should reflect what a reasonable user would choose. Use opt-in for commitments and charges. Make defaults transparent and easy to change.',
      },
      {
        concern: 'Notification Fatigue',
        severity: 'high',
        explanation:
          'Sending excessive reminders and nudges that become spam-like and erode user trust',
        mitigation:
          'Limit reminder frequency, allow easy customization, and respect user preferences. Each reminder should provide clear value and an easy opt-out.',
      },
      {
        concern: 'Consent Erosion',
        severity: 'high',
        explanation:
          'Making actions so frictionless that users complete them without full awareness or informed consent',
        mitigation:
          'Ensure users understand what they are committing to even when the process is streamlined. Provide clear confirmation for financial and data-sharing actions.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Intention-Behavior Relations: A Conceptual and Empirical Review',
        author: 'Sheeran, P.',
        year: 2002,
        doi: '10.1002/0470013478.ch1',
        description:
          'Comprehensive meta-analytic review establishing the magnitude and moderators of the intention-behavior gap',
        type: 'foundational',
      },
      {
        title: 'Implementation Intentions: Strong Effects of Simple Plans',
        author: 'Gollwitzer, P. M.',
        year: 1999,
        doi: '10.1037/0003-066X.54.7.493',
        description:
          'Landmark paper showing that forming "when-then" plans nearly doubles the rate of intention follow-through',
        type: 'foundational',
      },
      {
        title: 'The Intention-Behaviour Gap',
        author: 'Sheeran, P., & Webb, T. L.',
        year: 2016,
        doi: '10.1111/spc3.12265',
        description:
          'Updated review of the gap between intentions and behavior, with analysis of moderators and intervention strategies',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Foundational work on choice architecture and defaults that bridge the intention-action gap',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Practical framework for designing products that convert user intentions into habitual actions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Intention-Action Gap in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/intention-action-gap/',
        description:
          'Practical guide to identifying and bridging intention-action gaps in user interfaces',
        type: 'practical',
      },
      {
        title: 'Reducing Friction in User Flows',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/reducing-friction',
        description:
          'Design-focused article on friction audit techniques and reduction strategies',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Gap Between Intention and Action',
        author: 'BJ Fogg, Stanford',
        url: 'https://www.youtube.com/watch?v=AdKUJxjn-R8',
        description:
          'BJ Fogg explains how tiny habits and friction reduction bridge the intention-action gap',
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
