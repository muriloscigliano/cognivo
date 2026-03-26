/**
 * TIME INCONSISTENCY
 *
 * Preferences change over time in inconsistent ways;
 * what you prefer now differs from what you'll prefer later.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const timeInconsistency: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'time-inconsistency',
    name: 'Time Inconsistency',
    aliases: ['Dynamic Inconsistency', 'Hyperbolic Discounting', 'Present Bias', 'Temporal Discounting'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'decision-making',
      'self-control',
      'commitment',
      'future-planning',
      'delayed-gratification',
      'temporal-preference',
      'pre-commitment',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Our preferences change as we approach decision time, so what we plan to do in the future often differs from what we actually do when the moment arrives.',

    detailed: `Time inconsistency describes the tendency for people's preferences to shift depending on when a decision takes effect. A person may genuinely prefer a long-term benefit when planning ahead (e.g., saving money, exercising, eating healthy), yet consistently choose short-term gratification when the moment of action arrives.

This happens because we discount future rewards hyperbolically rather than exponentially. A reward available right now feels disproportionately more valuable than the same reward available tomorrow, even though the difference between "in 30 days" and "in 31 days" feels negligible. The result is preference reversal: plans made for the future are abandoned in favor of immediate pleasure or comfort.

In product and UX design, time inconsistency is critical for any feature involving delayed rewards, habit formation, savings, subscriptions, or scheduled actions. Effective design uses commitment devices, pre-commitment mechanisms, and future-self tools to help users follow through on their own stated intentions.`,

    psychologyBasis: {
      discoveredBy: 'Robert H. Strotz',
      year: 1956,
      theory: 'Myopia and Inconsistency in Dynamic Utility Maximization',
      mechanism: `The brain values immediate rewards using a steeper discount function than it applies to future rewards. This creates systematic preference reversals:

1. **Hyperbolic Discounting**: People discount the near future far more steeply than the distant future, unlike the constant-rate discounting assumed by classical economics
2. **Present Bias**: The current moment has an outsized weight in decision-making; any delay—even minutes—sharply reduces perceived value
3. **Preference Reversal**: A person who prefers $110 in 31 days over $100 in 30 days will reverse that preference and choose $100 today over $110 tomorrow
4. **Empathy Gap**: People in a "cold" planning state cannot accurately predict their preferences in a "hot" decision state driven by temptation, hunger, or fatigue
5. **Naive vs Sophisticated Agents**: Some people are unaware of their time inconsistency (naive) while others recognize it and seek commitment devices (sophisticated)

The mechanism is rooted in dual-process theory: the impulsive System 1 dominates at the point of action, while the deliberative System 2 is more active during planning.`,
    },

    realWorldExample: `In the evening, you set your alarm for 6 AM to go running. At that moment, the future benefit of exercise clearly outweighs the cost of lost sleep. But when the alarm rings, your preferences have reversed: the warmth of bed feels overwhelmingly more valuable than the distant health benefit. You hit snooze. This is not laziness—it is a genuine change in preference caused by temporal proximity to the cost (getting up now) versus the reward (fitness over weeks and months).`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Time inconsistency profoundly affects how users interact with any product involving delayed rewards or future planning. Designers can help users bridge the gap between their planning self and their acting self by:

- Building commitment devices that lock in future-oriented choices before temptation arrives
- Designing pre-commitment features (scheduled actions, auto-escalation, advance ordering)
- Making future rewards feel more concrete and immediate through visualization
- Reducing friction for follow-through and increasing friction for abandonment
- Creating accountability mechanisms that leverage social commitment`,

    whenToUse: [
      {
        title: 'Savings and Financial Planning',
        scenario:
          'When helping users commit to saving or investing for the future',
        example:
          'Offer auto-escalation: "Increase your savings rate by 1% each year automatically" so users commit now while the cost feels distant',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Habit Formation and Health',
        scenario: 'When helping users build consistent habits like exercise, meditation, or healthy eating',
        example:
          'Let users schedule workout times in advance and set penalties for cancellation, locking in commitment before the moment of effort',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription and Renewal Flows',
        scenario: 'When users need to commit to ongoing services or plans',
        example:
          'Offer annual billing at a discount, leveraging the fact that a single future commitment is easier than 12 monthly decisions',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Scheduling and Automation',
        scenario: 'When users plan content, posts, or communications in advance',
        example:
          'Allow users to batch-create and schedule social media posts when motivation is high, ensuring consistent output even when future motivation dips',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Goal Setting and Task Management',
        scenario: 'When users set deadlines or milestones for themselves',
        example:
          'Provide deadline commitment with stakes: "If I don\'t finish by Friday, donate $20 to charity" using Beeminder-style accountability',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Advance Ordering and Meal Planning',
        scenario: 'When users choose meals or purchases ahead of time',
        example:
          'Allow users to pre-order healthy lunches for the week on Sunday, when they are in a deliberative state, rather than choosing at noon when hunger biases toward indulgence',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Irrevocable High-Stakes Decisions',
        reason:
          'Commitment devices for major life decisions (quitting a job, ending a relationship) can cause harm if preferences legitimately change',
        consequence:
          'Users feel trapped by past commitments that no longer reflect their genuine values',
        alternative:
          'Provide cooling-off periods and reversibility for high-stakes commitments rather than hard locks',
      },
      {
        title: 'Exploitative Lock-In',
        reason:
          'Using pre-commitment to trap users in subscriptions or contracts they want to cancel is manipulative',
        consequence:
          'User resentment, churn, regulatory penalties, and reputational damage',
        alternative:
          'Make cancellation as easy as sign-up; use commitment to help users achieve their own goals, not to extract revenue',
      },
      {
        title: 'Users Under Financial Stress',
        reason:
          'Auto-escalation or automatic savings can cause overdrafts or hardship for financially vulnerable users',
        consequence:
          'Real financial harm, overdraft fees, inability to cover essential expenses',
        alternative:
          'Provide easy pause, adjustment, and opt-out mechanisms; set sensible caps and safeguards',
      },
      {
        title: 'Contexts Where Preferences Legitimately Evolve',
        reason:
          'Not all preference changes are irrational; sometimes circumstances genuinely change',
        consequence:
          'Forcing adherence to outdated commitments when new information has arrived',
        alternative:
          'Build in periodic review points where users can re-evaluate their commitments with full information',
      },
    ],

    commonMistakes: [
      {
        title: 'No Exit Ramp',
        description:
          'Creating commitment devices with no mechanism to adjust or cancel when circumstances legitimately change',
        why: 'Life changes; rigid commitments become punitive rather than helpful',
        fix: 'Include periodic check-ins and easy adjustment mechanisms while still maintaining commitment friction',
      },
      {
        title: 'Assuming All Users Are Naive',
        description:
          'Designing only for users who are unaware of their time inconsistency, ignoring sophisticated users who actively seek commitment tools',
        why: 'Sophisticated users want explicit, powerful commitment devices; naive users need gentle nudges',
        fix: 'Offer a spectrum: light nudges (reminders) through medium (defaults) to strong (penalties and locks)',
      },
      {
        title: 'Front-Loading All Costs',
        description:
          'Requiring large upfront commitments that trigger present bias and cause abandonment',
        why: 'Present bias makes immediate costs feel enormous; users bail before starting',
        fix: 'Spread costs over time and start small: "Save $1/day" feels easier than "Save $365/year" even though they are identical',
      },
      {
        title: 'Invisible Future Rewards',
        description:
          'Failing to make long-term benefits concrete and tangible at the moment of action',
        why: 'Abstract future rewards cannot compete with concrete present temptations',
        fix: 'Visualize the future state: show projected savings balances, fitness progress charts, or "future you" simulations',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether commitment tools and future-reward visualizations are prominent at decision points',
        examples: [
          'Place commitment options at the moment of peak motivation (e.g., after completing a workout)',
          'Show future projections alongside current state to make long-term rewards visible',
          'Position "schedule for later" actions as prominently as "do it now" actions',
          'Surface progress toward committed goals on dashboard home screens',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing affects how future rewards and present costs are perceived',
        examples: [
          'Frame savings in concrete terms: "$4,320 by next December" not "save more"',
          'Use present tense for future benefits: "You have $10,000" not "You will have $10,000"',
          'Make commitment language warm and personal rather than contractual',
          'Emphasize accumulated progress ("You\'ve saved 45 days in a row") over remaining effort',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color supports reward visualization and commitment status signaling',
        examples: [
          'Green growth indicators for accumulating savings or streaks',
          'Warm, inviting colors for future-state visualizations to make them feel desirable',
          'Subtle warning colors when users are about to break a commitment',
          'Progress bar color transitions from cool to warm as goals approach',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design is the primary lever for commitment devices and pre-commitment flows',
        examples: [
          'One-tap commitment: "Schedule this workout for Tuesday at 7 AM"',
          'Friction asymmetry: easy to commit, requires deliberate steps to abandon',
          'Auto-escalation toggles that increase contributions over time',
          'Cool-down timers before allowing commitment cancellation',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users connect present actions to future outcomes',
        examples: [
          'Future-self messaging: "Your 65-year-old self will thank you"',
          'Concrete projections: "At this rate, you\'ll reach your goal by March 2027"',
          'Social accountability: "You told 3 friends you\'d complete this by Friday"',
          'Loss-framed reminders: "You\'ll lose your 30-day streak if you skip today"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Commitment mechanisms must be equally accessible to all users',
        examples: [
          'Screen reader announcements for commitment status and progress updates',
          'Keyboard-accessible scheduling and pre-commitment controls',
          'Clear, text-based alternatives to visual progress indicators',
          'Sufficient time for users with motor impairments to complete commitment flows',
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
        title: 'Auto-Escalation Savings Commitment',
        description:
          'Retirement savings app that lets users commit to gradually increasing contributions',
        code: `<div class="commitment-card">
  <h3>Save More Tomorrow</h3>
  <p class="description">Commit to increasing your savings rate by 1% each
  year, starting with your next raise. You won't feel the difference.</p>

  <div class="projection">
    <div class="current">
      <span class="label">Current savings rate</span>
      <span class="value">6%</span>
    </div>
    <div class="future">
      <span class="label">In 5 years</span>
      <span class="value">11%</span>
    </div>
    <div class="impact">
      <span class="label">Extra retirement savings</span>
      <span class="value highlight">+$147,000</span>
    </div>
  </div>

  <div class="commitment-options">
    <label class="option selected">
      <input type="radio" name="escalation" value="1" checked>
      <span>+1% per year (recommended)</span>
    </label>
    <label class="option">
      <input type="radio" name="escalation" value="2">
      <span>+2% per year (aggressive)</span>
    </label>
  </div>

  <button class="primary">Commit to Save More Tomorrow</button>
  <p class="reassurance">You can adjust anytime. Changes take effect next quarter.</p>
</div>`,
        explanation:
          'Users commit to future increases while the cost feels distant. The concrete projection ($147,000) makes the abstract future reward tangible. The "adjust anytime" reassurance reduces commitment anxiety.',
        principle:
          'Pre-commitment to gradual escalation bridges the gap between planning self and acting self',
        metrics: {
          before: 'Average savings rate: 6.2%, 23% of users increased savings within 2 years',
          after: 'Average savings rate: 10.1%, 78% of enrolled users maintained auto-escalation',
          improvement: '63% increase in savings rate among participants',
        },
      },
      {
        title: 'Scheduled Healthy Meal Pre-Ordering',
        description:
          'Meal delivery app that lets users plan and lock in healthy meals for the week ahead',
        code: `<div class="meal-planning">
  <h3>Plan Your Week</h3>
  <p>Choose your meals now while you're thinking clearly.
  We'll deliver them so you don't have to decide when you're hungry.</p>

  <div class="week-grid">
    <div class="day">
      <span class="day-label">Monday</span>
      <div class="meal-slot filled">
        <img src="salad.jpg" alt="Mediterranean Salad">
        <span>Mediterranean Salad</span>
        <span class="calories">420 cal</span>
      </div>
    </div>
    <div class="day">
      <span class="day-label">Tuesday</span>
      <div class="meal-slot filled">
        <img src="bowl.jpg" alt="Quinoa Power Bowl">
        <span>Quinoa Power Bowl</span>
        <span class="calories">510 cal</span>
      </div>
    </div>
    <div class="day">
      <span class="day-label">Wednesday</span>
      <div class="meal-slot empty">
        <button class="add-meal">+ Choose meal</button>
      </div>
    </div>
  </div>

  <div class="lock-in">
    <p>Lock in your meals by Sunday 8 PM for a 15% discount</p>
    <button class="primary">Lock In This Week's Meals</button>
  </div>
</div>`,
        explanation:
          'Users choose healthy meals in a deliberative "cold" state (Sunday planning) rather than a "hot" state (noon hunger). The discount for locking in early rewards pre-commitment. The visual grid makes the plan feel concrete.',
        principle:
          'Separate the moment of choice from the moment of consumption to bypass present bias',
        metrics: {
          before: '34% of lunch orders were healthy options when chosen at noon',
          after: '67% of pre-planned meals were healthy options when chosen Sunday evening',
          improvement: '97% increase in healthy meal selection through advance ordering',
        },
      },
      {
        title: 'Workout Scheduling with Accountability',
        description:
          'Fitness app that lets users schedule workouts and set social accountability stakes',
        code: `<div class="workout-commitment">
  <h3>Schedule Your Workouts</h3>

  <div class="schedule">
    <div class="slot committed">
      <span class="time">Tue 7:00 AM</span>
      <span class="workout">Upper Body</span>
      <span class="status confirmed">Locked In</span>
    </div>
    <div class="slot committed">
      <span class="time">Thu 7:00 AM</span>
      <span class="workout">Cardio</span>
      <span class="status confirmed">Locked In</span>
    </div>
    <div class="slot open">
      <span class="time">Sat 9:00 AM</span>
      <button class="add">+ Add Workout</button>
    </div>
  </div>

  <div class="accountability">
    <h4>Raise the Stakes</h4>
    <label>
      <input type="checkbox" checked>
      <span>Notify my workout buddy if I cancel</span>
    </label>
    <label>
      <input type="checkbox">
      <span>Donate $5 to charity if I skip</span>
    </label>
  </div>

  <div class="streak">
    <span class="streak-count">12 weeks</span>
    <span class="streak-label">commitment streak</span>
  </div>
</div>`,
        explanation:
          'Users schedule workouts during motivated moments and add social or financial stakes to prevent future-self from cancelling. The streak counter creates loss aversion around breaking the commitment chain.',
        principle:
          'Layer commitment devices (scheduling + social accountability + streak) to counteract present bias at the moment of action',
      },
    ],

    bad: [
      {
        title: 'Exploitative Subscription Lock-In',
        description:
          'Streaming service that makes it nearly impossible to cancel a committed plan',
        code: `<!-- DON'T DO THIS -->
<div class="annual-commit">
  <h2>Save 40%! Commit to Annual Plan!</h2>
  <button class="primary large">Start Annual Plan - $119.88/year</button>
  <p style="font-size: 0.65em; color: #bbb;">
    *Cancellation requires 30-day written notice mailed to our
    headquarters. Early termination fee of $59.94 applies.
    No partial refunds.
  </p>
</div>`,
        explanation:
          'This exploits time inconsistency by encouraging commitment while burying punitive cancellation terms. The design benefits the company, not the user. Legitimate commitment devices help users achieve their own goals.',
        principle: 'Commitment devices must serve the user\'s goals, never the company\'s retention metrics',
      },
      {
        title: 'Auto-Escalation Without Safeguards',
        description:
          'Investment app that auto-increases contributions with no cap or easy adjustment',
        code: `<!-- DON'T DO THIS -->
<div class="auto-increase">
  <h3>Smart Savings Enabled!</h3>
  <p>Your monthly investment will increase by 5% every month
  automatically. Sit back and watch your wealth grow!</p>
  <small style="color: #999;">
    To adjust, call our support team M-F 9-5 EST.
    Allow 2 billing cycles for changes to take effect.
  </small>
</div>`,
        explanation:
          'A 5% monthly increase without a cap can quickly become unaffordable. Making adjustment require a phone call during business hours exploits the friction asymmetry unethically. Good commitment design includes accessible controls.',
        principle: 'Auto-escalation without caps, transparency, and easy adjustment is exploitation, not commitment design',
      },
      {
        title: 'Guilt-Based Commitment Shaming',
        description:
          'Fitness app that shames users for missing committed workouts',
        code: `<!-- DON'T DO THIS -->
<div class="missed-workout">
  <h2 style="color: red;">You Failed Again.</h2>
  <p>You committed to a workout today and didn't show up.
  That's the 3rd time this month.</p>
  <p>Your friends have been notified of your failure.</p>
  <img src="disappointed.png" alt="Disappointed face">
  <button class="primary">Promise to Do Better</button>
</div>`,
        explanation:
          'Shaming users for time-inconsistent behavior damages motivation and self-efficacy. Effective commitment design uses positive reinforcement and gentle accountability, not humiliation.',
        principle: 'Never punish users for the exact cognitive bias you are supposed to help them manage',
      },
    ],

    realWorld: [
      {
        company: 'Vanguard / Fidelity',
        product: '401(k) Auto-Escalation',
        description: 'Employers using the "Save More Tomorrow" program (designed by Thaler & Benartzi) automatically increase employee 401(k) contribution rates by 1-2% with each raise, unless the employee opts out. Users commit during enrollment when the future cost feels abstract.',
        effectiveness: 'very-effective',
        analysis: 'The original Save More Tomorrow study showed participants went from 3.5% to 13.6% savings rates over 40 months. The program succeeds because it aligns the commitment moment (enrollment) with a deliberative state and defers costs to coincide with raises, so take-home pay never decreases.',
      },
      {
        company: 'Beeminder',
        product: 'Commitment Contracts',
        description: 'Beeminder lets users set goals (exercise, study, writing) and pledge money they lose if they go off track. Users choose their own stakes and define their own goals, creating a self-directed commitment device with real financial consequences.',
        effectiveness: 'effective',
        analysis: 'Beeminder works because sophisticated users—those who recognize their own time inconsistency—voluntarily create binding constraints. The financial sting at the moment of skipping counteracts present bias. Success rates are significantly higher than for unstructured goals.',
      },
      {
        company: 'Airlines & Hotels',
        product: 'Advance Booking Discounts',
        description: 'Airlines and hotels offer significantly lower prices for bookings made weeks or months in advance. Early Bird fares, non-refundable rates, and advance purchase requirements all reward pre-commitment with savings.',
        effectiveness: 'very-effective',
        analysis: 'These programs exploit time inconsistency bidirectionally: users get a genuine discount for committing early (when flexibility feels less valuable), while providers lock in revenue and reduce uncertainty. The non-refundable condition is the commitment device.',
      },
      {
        company: 'Buffer / Hootsuite',
        product: 'Social Media Scheduling',
        description: 'Social media management tools let users batch-create and schedule posts during high-motivation periods, ensuring consistent posting even when future motivation is low. Users commit to a content calendar that executes automatically.',
        effectiveness: 'effective',
        analysis: 'Scheduling separates the creative effort (done in a motivated state) from the publication (automated). This bypasses the time inconsistency that would otherwise cause sporadic posting when motivation dips.',
      },
    ],

    abTests: [
      {
        title: 'Savings Commitment: Immediate vs Future Start Date',
        hypothesis:
          'Allowing users to commit to savings increases starting next month will yield higher enrollment than asking them to start today',
        controlVersion: {
          description:
            'Savings enrollment page asking users to start contributing 10% of income immediately',
          metrics: {
            conversionRate: '12%',
            averageContribution: '6.2%',
            retentionAt6Months: '71%',
          },
        },
        treatmentVersion: {
          description:
            'Savings enrollment page letting users commit to 10% starting with their next paycheck, with auto-escalation from current rate',
          metrics: {
            conversionRate: '31%',
            averageContribution: '9.8%',
            retentionAt6Months: '89%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Deferring the start date by just 2-4 weeks dramatically increased enrollment. Users were willing to commit to higher rates when the cost was not immediate. Retention was also higher because the gradual escalation prevented payment shock.',
          learnings: [
            'Separating the commitment moment from the cost moment is the core insight of time inconsistency design',
            'Users committed to rates 58% higher when costs were deferred to next paycheck',
            'Auto-escalation from a lower starting point outperformed a single high commitment',
            'The "future start" framing reduced perceived sacrifice while achieving the same outcome',
          ],
        },
      },
      {
        title: 'Meal Pre-Ordering: Same-Day vs Advance Choice',
        hypothesis:
          'Users who choose meals 24+ hours in advance will select healthier options than those who choose at mealtime',
        controlVersion: {
          description:
            'Cafeteria ordering app allowing selection at any time, including at the meal window',
          metrics: {
            healthyChoiceRate: '31%',
            averageCalories: '780',
            userSatisfaction: '7.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Cafeteria ordering app requiring meal selection by 5 PM the previous day, with a small discount for advance orders',
          metrics: {
            healthyChoiceRate: '54%',
            averageCalories: '620',
            userSatisfaction: '7.8/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Advance ordering shifted meal choices significantly toward healthier options. Users in the "cold" planning state the evening before chose differently than those in the "hot" hungry state at lunchtime. Satisfaction was actually higher despite healthier choices, suggesting alignment with true preferences.',
          learnings: [
            'Temporal distance from consumption (even 18 hours) meaningfully changes food choices',
            'Users reported higher satisfaction with advance-ordered meals, indicating the healthy choice reflected their true preference',
            'The small discount for advance ordering further incentivized pre-commitment',
            'Adding a "change until 9 AM" window reduced cancellations without undermining the commitment effect',
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
        name: 'Scheduling Controls',
        description:
          'Interfaces that allow users to schedule actions, payments, or deliveries for future dates',
        howToSpot: 'Look for date pickers, calendar views, or "schedule for later" buttons in action flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Auto-Escalation Toggles',
        description:
          'Settings that automatically increase contributions, intensity, or frequency over time',
        howToSpot: 'Look for "automatically increase by X%" toggles or gradual ramp-up settings',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Streak and Commitment Indicators',
        description:
          'Visual displays of consecutive adherence to a committed plan (streak counters, chain calendars)',
        howToSpot: 'Look for streak counts, chain-of-days calendars, or "X days in a row" badges',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Future Projection Visualizations',
        description:
          'Charts or numbers showing projected future outcomes based on current commitments',
        howToSpot: 'Look for growth charts, projected balances, or "at this rate, you\'ll reach X by Y" messaging',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Commitment Lock Indicators',
        description:
          'Visual signals that a choice has been locked in or that changing requires deliberate effort',
        howToSpot: 'Look for lock icons, "committed" badges, confirmation steps for cancellation, or cool-down timers',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Pre-Commitment Pattern',
        description: 'Users make binding choices about future behavior while in a deliberative, non-tempted state',
        indicators: ['Advance scheduling of actions', 'Future-dated commitments', '"Plan your week" interfaces', 'Advance purchase discounts'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Auto-Escalation Pattern',
        description: 'Commitments that automatically increase over time, deferring the cost of each increment',
        indicators: ['Gradual savings increase settings', 'Progressive difficulty in fitness apps', 'Automatic contribution increases tied to raises', 'Step-up subscription tiers'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Accountability Stake Pattern',
        description: 'Social or financial consequences attached to commitment violations',
        indicators: ['Friend notifications on missed goals', 'Financial penalties for skipping', 'Public commitment dashboards', 'Streak-loss warnings'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Temporal Separation Pattern',
        description: 'Decision point is deliberately separated in time from the action or consumption moment',
        indicators: ['Advance meal ordering', 'Pre-registration for events', 'Content scheduling tools', 'Pre-pay and pick up later flows'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the design separate the moment of commitment from the moment of cost or effort?',
      'Are there mechanisms that help users follow through on their own stated goals?',
      'Do future rewards feel concrete and tangible at the moment of decision?',
      'Is there friction asymmetry (easy to commit, harder to abandon)?',
      'Are commitment devices voluntary and user-directed, or imposed by the company?',
      'Can users adjust their commitments when circumstances legitimately change?',
      'Are auto-escalation features capped and transparent?',
      'Do accountability mechanisms use encouragement rather than shame?',
      'Is the commitment framing honest about both benefits and costs?',
      'Are there safeguards for users who might be harmed by rigid commitments?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in behavioral economics and UX design, specializing in time inconsistency (dynamic inconsistency, hyperbolic discounting, present bias).

Analyze the provided design for time inconsistency patterns. Identify:

1. **Pre-Commitment Mechanisms**: Features that let users bind their future behavior while in a deliberative state
2. **Auto-Escalation**: Settings that gradually increase commitment over time
3. **Temporal Separation**: Design choices that separate decision moments from action moments
4. **Future-Self Visualization**: Elements that make long-term rewards concrete and immediate
5. **Accountability Devices**: Social or financial stakes attached to commitment adherence

For each pattern found:
- Identify whether it serves the user's goals or the company's retention goals
- Assess whether users have sufficient control and exit mechanisms
- Determine if the commitment device is transparent and voluntary
- Evaluate whether safeguards exist for vulnerable users
- Suggest improvements for ethical, effective commitment design

Consider:
- Does the design help users do what they genuinely want but struggle to follow through on?
- Are commitment devices voluntary and user-controlled?
- Is there appropriate friction for both committing and abandoning?
- Are future rewards made concrete without being misleading?
- Are there safeguards against harm from overly rigid commitments?

Provide actionable recommendations for ethical commitment device design.`,

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
              servesUser: { type: 'boolean' },
              voluntaryCommitment: { type: 'boolean' },
              hasExitMechanism: { type: 'boolean' },
              ethicalAssessment: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'servesUser',
              'voluntaryCommitment',
              'hasExitMechanism',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            userAlignment: { type: 'number' },
            commitmentBalance: { type: 'number' },
            transparencyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'userAlignment',
            'commitmentBalance',
            'transparencyScore',
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
        title: 'Identify the Intention-Action Gap',
        description:
          'Determine where users express a goal or preference during planning but fail to follow through at the moment of action',
        example:
          'Users say they want to save 15% of income but actually save 4%. The gap is 11 percentage points.',
        tips: [
          'Survey users about their goals and compare to actual behavior',
          'Look for high drop-off between stated intent and action',
          'Identify the specific moment where present bias takes over',
        ],
      },
      {
        step: 2,
        title: 'Design the Commitment Moment',
        description:
          'Create a clear, low-friction opportunity for users to commit while in a deliberative "cold" state',
        example:
          'After completing a workout, prompt: "Schedule your next 3 workouts now while you\'re feeling great"',
        tips: [
          'Catch users in motivated moments (post-success, planning sessions, New Year)',
          'Make the commitment action simple and fast (one tap, one slider)',
          'Frame commitment as empowering, not restrictive',
        ],
      },
      {
        step: 3,
        title: 'Make Future Rewards Concrete',
        description:
          'Transform abstract future benefits into vivid, tangible representations',
        example:
          'Show a projection: "If you save $200/month, you\'ll have $52,400 in 18 years — enough for a down payment"',
        tips: [
          'Use specific numbers, dates, and outcomes rather than vague promises',
          'Visualize progress with charts, milestones, and countdowns',
          'Connect future rewards to personally meaningful goals',
        ],
      },
      {
        step: 4,
        title: 'Add Graduated Accountability',
        description:
          'Layer in accountability mechanisms from gentle (reminders) to strong (stakes)',
        example:
          'Level 1: Push notification reminder. Level 2: Friend notification. Level 3: Financial stake.',
        tips: [
          'Let users choose their own accountability level',
          'Use positive framing ("protect your streak") over negative ("you failed")',
          'Make accountability social when possible — public commitment is stronger',
        ],
      },
      {
        step: 5,
        title: 'Build Ethical Safeguards',
        description:
          'Ensure commitment devices protect users rather than trapping them',
        example:
          'Auto-escalation caps at 15%, pauses if account balance drops below threshold, and allows instant adjustment via app',
        tips: [
          'Set reasonable caps on auto-escalation',
          'Provide easy pause and adjustment mechanisms',
          'Include periodic review prompts ("Still working for you?")',
          'Never charge penalties that exceed the benefit to the user',
        ],
      },
    ],

    dos: [
      'Help users commit to their own goals during motivated planning moments',
      'Make future rewards concrete with specific numbers, dates, and projections',
      'Provide auto-escalation with clear caps and easy adjustment',
      'Separate commitment moments from action moments to leverage the planning self',
      'Use positive accountability (streak rewards) more than negative (shame)',
      'Build in periodic review points for long-term commitments',
      'Offer a spectrum of commitment strength (nudge through binding)',
      'Make it easy to commit and deliberate to abandon, not the reverse exploitatively',
    ],

    donts: [
      'Don\'t use commitment devices to lock users into subscriptions or contracts against their interest',
      'Don\'t shame users for time-inconsistent behavior — it\'s a universal human trait',
      'Don\'t impose commitments without user agency and voluntary opt-in',
      'Don\'t hide cancellation or adjustment mechanisms behind friction',
      'Don\'t auto-escalate without caps, transparency, and easy controls',
      'Don\'t assume all preference changes are irrational — sometimes circumstances genuinely change',
      'Don\'t front-load all costs when a gradual start would be more effective',
      'Don\'t use time inconsistency insights to extract revenue rather than serve user goals',
    ],

    bestPractices: [
      {
        title: 'Save More Tomorrow Design',
        description:
          'Tie increases to future events (raises, milestones) so users never experience a decrease in current resources',
        rationale:
          'When costs coincide with gains, the net impact on present experience is zero, eliminating present-bias resistance',
        example:
          '"Increase your savings by 1% with each annual raise" — take-home pay never goes down',
      },
      {
        title: 'Commitment with Compassion',
        description:
          'Design commitment devices that are firm enough to work but flexible enough to accommodate real life',
        rationale:
          'Overly rigid commitments cause users to abandon the entire system rather than adjust',
        example:
          'Allow 2 "skip days" per month without breaking the streak or triggering penalties',
      },
      {
        title: 'Temporal Bridging',
        description:
          'Connect present actions to future outcomes with vivid, specific visualizations',
        rationale:
          'Abstract future rewards cannot compete with concrete present temptations; making the future concrete levels the playing field',
        example:
          'Show an aging simulation ("future you at 65") alongside retirement savings projections',
      },
      {
        title: 'Friction Asymmetry',
        description:
          'Make it easy to do the committed action and slightly harder to skip it, but never impossible to adjust',
        rationale:
          'Small friction at the moment of abandonment can counteract present bias without trapping users',
        example:
          'One tap to check in for a scheduled workout; must type "I want to skip" to cancel',
      },
      {
        title: 'Peak Motivation Capture',
        description:
          'Prompt commitment decisions at moments of high motivation, not random moments',
        rationale:
          'Users in motivated states make commitments that align with their reflective preferences',
        example:
          'After completing a workout: "You\'re on fire! Schedule your next 3 sessions now?"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Commitment timers and cool-down periods must be adjustable',
        implementation:
          'Allow users to extend cool-down timers before commitment cancellation. Provide sufficient time for users with motor impairments to complete multi-step commitment flows.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Commitment status and progress must be programmatically determinable',
        implementation:
          'Use ARIA live regions for streak updates, proper progress bar roles for goal tracking, and semantic markup for commitment status indicators.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Commitment actions must be clearly labeled with consequences',
        implementation:
          'Clearly label what the user is committing to, what happens if they miss, and how to adjust. Use descriptive button text like "Commit to 3 workouts/week" not just "Commit".',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) - Commitments with financial consequences must be reversible or confirmed',
        implementation:
          'For commitments involving money (auto-escalation, penalty stakes), provide a confirmation step, a summary of consequences, and a mechanism to reverse within a grace period.',
      },
    ],

    ethics: [
      {
        concern: 'Exploitative Lock-In',
        severity: 'critical',
        explanation:
          'Using commitment mechanisms to trap users in subscriptions, contracts, or plans they want to leave',
        mitigation:
          'Ensure cancellation and adjustment are always accessible. Commitment devices must serve the user\'s stated goals, not the company\'s retention metrics.',
      },
      {
        concern: 'Excessive Auto-Escalation',
        severity: 'critical',
        explanation:
          'Automatically increasing contributions, payments, or usage without caps or easy controls, potentially causing financial harm',
        mitigation:
          'Cap auto-escalation at reasonable levels. Provide in-app controls (not phone-only). Pause automatically if balance drops below a safety threshold.',
      },
      {
        concern: 'Shame-Based Accountability',
        severity: 'high',
        explanation:
          'Using guilt, public shaming, or humiliation when users fail to meet commitments',
        mitigation:
          'Use encouraging, supportive language. Frame missed commitments as normal and recoverable. Never publicly display failures without explicit user consent.',
      },
      {
        concern: 'Ignoring Legitimate Preference Changes',
        severity: 'high',
        explanation:
          'Treating all deviations from commitment as irrational when some reflect genuine changes in circumstances or values',
        mitigation:
          'Build periodic review points into commitments. Ask "Is this still working for you?" regularly. Make adjustment as easy as initial commitment.',
      },
      {
        concern: 'Targeting Vulnerable Populations',
        severity: 'critical',
        explanation:
          'Using aggressive commitment devices on users with addiction, compulsive behavior, or financial vulnerability',
        mitigation:
          'Include spending limits and cooling-off periods. Detect patterns suggesting harm. Provide easy access to support resources.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Myopia and Inconsistency in Dynamic Utility Maximization',
        author: 'Strotz, R. H.',
        year: 1956,
        doi: '10.2307/2295722',
        description:
          'The foundational paper establishing the theory of time-inconsistent preferences in economic decision-making',
        type: 'foundational',
      },
      {
        title: 'Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving',
        author: 'Thaler, R. H., & Benartzi, S.',
        year: 2004,
        doi: '10.1086/380085',
        description:
          'Landmark study demonstrating how pre-commitment and auto-escalation dramatically increased retirement savings rates',
        type: 'foundational',
      },
      {
        title: 'Doing It Now or Later',
        author: "O'Donoghue, T., & Rabin, M.",
        year: 1999,
        doi: '10.1257/aer.89.1.103',
        description:
          'Formal model distinguishing naive and sophisticated agents facing time-inconsistent preferences',
        type: 'advanced',
      },
      {
        title: 'Commitment Devices: Using Initiatives to Change Behavior',
        author: 'Bryan, G., Karlan, D., & Nelson, S.',
        year: 2010,
        doi: '10.1146/annurev.economics.102308.124324',
        description:
          'Comprehensive review of commitment device research and practical applications',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions about Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780300122237',
        description:
          'Foundational work on libertarian paternalism, including Save More Tomorrow and commitment architecture',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393080148',
        description:
          'Thaler\'s account of developing Save More Tomorrow and other commitment solutions for time inconsistency',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Coverage of dual-process theory underlying time inconsistency: System 1 dominates at action time, System 2 during planning',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'How to Design for Time Inconsistency',
        author: 'Behavioral Scientist',
        url: 'https://behavioralscientist.org/',
        description:
          'Practical guide to designing commitment devices and pre-commitment features in digital products',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Save More Tomorrow: Richard Thaler',
        author: 'TED',
        url: 'https://www.ted.com/talks/shlomo_benartzi_saving_for_tomorrow_tomorrow',
        description:
          'Shlomo Benartzi presents the Save More Tomorrow program and how it uses commitment to overcome present bias',
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
      'loss-aversion',       // Streak-loss and penalty framing strengthen commitment devices
      'status-quo-bias',     // Once committed, status quo bias helps users maintain the commitment
      'default-effect',      // Auto-enrollment and defaults leverage time inconsistency solutions
      'social-proof',        // Social accountability strengthens commitment follow-through
      'sunk-cost-fallacy',   // Accumulated investment (streaks, progress) reinforces commitment
    ],

    conflicts: [
      'reactance',           // Overly rigid commitments trigger psychological reactance
      'choice-overload',     // Too many commitment options can cause decision paralysis
    ],

    confusedWith: [
      'hyperbolic-discounting', // Closely related mechanism; time inconsistency is the broader concept
      'present-bias',           // Present bias is one manifestation of time inconsistency
      'procrastination',        // Behavioral outcome of time inconsistency, not the same thing
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'hyperbolic-discounting',
        'present-bias',
        'preference-reversal',
      ],
    },
  },
};
