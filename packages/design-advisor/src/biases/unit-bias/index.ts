/**
 * UNIT BIAS
 *
 * We want to complete units even when units are arbitrary
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const unitBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'unit-bias',
    name: 'Unit Bias',
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
    simple: 'We want to complete units even when units are arbitrary',

    detailed: `Unit Bias is the tendency for people to want to complete a defined unit of something, regardless of that unit's actual size. When something is presented as "one" of anything — one serving, one page, one episode, one lesson — we feel a strong pull to finish it, even if the unit is arbitrarily large or small.

This bias operates because humans treat units as natural stopping points. A "single serving" of food feels like the right amount to eat, whether that serving is 200 calories or 800 calories. A "single page" of a form feels like one step, whether it contains 3 fields or 30. The unit itself becomes the anchor for how much we consume, complete, or engage with.

In UX and product design, unit bias profoundly affects how users interact with content, forms, tasks, and features. Designers who understand this pattern can chunk experiences into appropriately sized units that guide users through flows naturally — or, if careless, create units so large they overwhelm or so small they feel trivial.`,

    psychologyBasis: {
      discoveredBy: 'Andrew Geier, Paul Rozin, and Gheorghe Doros',
      year: 2006,
      theory: 'Unit Bias in Consumption and Portion Size Research',
      mechanism: `People tend to treat a single unit as the appropriate amount to consume or complete, regardless of the unit's actual size. This happens because:

1. **Completion Drive**: The brain has a strong desire to finish what it starts — an incomplete unit creates cognitive tension (related to the Zeigarnik Effect)
2. **Unit as Norm**: A "single serving" or "one item" is implicitly interpreted as the socially or contextually appropriate amount
3. **Reduced Decision Load**: Treating the unit as the right amount eliminates the need to decide how much to consume, simplifying choices
4. **Arbitrary Boundaries as Anchors**: The defined boundary of a unit acts as a reference point, even when the boundary is arbitrary or varies widely
5. **Mindless Completion**: Once engaged with a unit, people often continue on autopilot until the unit is finished, bypassing conscious evaluation of whether they should stop`,
    },

    realWorldExample: `In a classic study by Geier, Rozin, and Doros (2006), researchers placed free pretzels in an apartment building lobby. When whole pretzels were offered, people took one pretzel. When pretzels were cut in half, people still took one piece — meaning they took half as much food. The "unit" (one pretzel vs. one half-pretzel) determined consumption, not hunger or actual portion preference. The same pattern held for Tootsie Rolls: people took one regardless of whether the candies were regular or snack-sized.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Unit bias fundamentally affects how users perceive and complete tasks, consume content, and navigate experiences in interfaces. Designers can leverage this to:

- Chunk complex flows into digestible single-screen tasks so each feels completable
- Size content units (articles, lessons, steps) to match desired engagement depth
- Structure forms so each "page" or "section" feels like one natural unit of effort
- Frame pricing in per-unit terms that feel appropriate (per month, per seat, per project)
- Control consumption by defining what constitutes "one" of something (one episode, one lesson, one module)`,

    whenToUse: [
      {
        title: 'Single-Page Checkout',
        scenario:
          'When designing e-commerce checkout flows to maximize completion',
        example:
          'Present the entire checkout as one unit — one page with shipping, payment, and review — so users feel compelled to finish what they started',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding Steps',
        scenario: 'When introducing new users to a product',
        example:
          'Break onboarding into bite-sized steps like "Step 1 of 5" where each step is one screen with one task, making each feel quick to complete',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Chunking',
        scenario: 'When presenting educational or long-form content',
        example:
          'Split a long tutorial into individual lessons of 3-5 minutes each — users will complete "one lesson" even if the full course is hours long',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Pricing Per Unit',
        scenario: 'When structuring pricing to feel manageable',
        example:
          'Show "$9 per user/month" instead of "$900/month for 100 users" — the per-unit framing makes each unit feel small and appropriate',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Task Completion Flows',
        scenario: 'When designing multi-step workflows',
        example:
          'Frame each screen as "one task" — one screen for profile info, one for preferences, one for notifications — so users complete each unit before stopping',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Oversized Single Units',
        reason:
          'Cramming too much into one "unit" (one page, one form, one step) makes the unit feel overwhelming',
        consequence:
          'Users abandon the task because the single unit is too large, defeating the purpose of unit bias',
        alternative:
          'Break oversized units into smaller, genuinely completable chunks that respect cognitive load limits',
      },
      {
        title: 'Addictive Consumption Patterns',
        reason:
          'Exploiting unit bias to drive compulsive consumption (autoplay next episode, infinite scroll as "one feed") can harm users',
        consequence:
          'Users spend far more time than intended, leading to regret, fatigue, and erosion of trust',
        alternative:
          'Add natural stopping points, session time reminders, and opt-in continuation rather than autoplay',
      },
      {
        title: 'Misleading Unit Sizing',
        reason:
          'Defining a "unit" that hides the true scope of commitment (e.g., "one quick form" that takes 30 minutes)',
        consequence:
          'Users feel deceived when the unit is much larger than expected, increasing abandonment and distrust',
        alternative:
          'Set honest expectations about unit size — show time estimates, field counts, or progress indicators',
      },
      {
        title: 'Critical Decision Tasks',
        reason:
          'Unit bias can rush users through important decisions if they are bundled into a single unit',
        consequence:
          'Users make hasty choices on financial, medical, or legal decisions because they want to "finish the step"',
        alternative:
          'For high-stakes decisions, add deliberate friction: confirmation screens, cooling-off periods, or separate review steps',
      },
    ],

    commonMistakes: [
      {
        title: 'The Giant Single Page',
        description:
          'Putting an entire workflow on one long scrolling page and calling it "one step"',
        why: 'Unit bias only works when the unit feels completable. A 15-screen scroll is not perceived as one manageable unit.',
        fix: 'Break long pages into focused sections with clear visual separation, or paginate with progress indicators',
      },
      {
        title: 'Too Many Micro-Units',
        description:
          'Breaking a simple task into so many tiny steps that users feel patronized',
        why: 'Excessively small units create friction and fatigue — each "next" click adds overhead without value',
        fix: 'Size units to match task complexity. A name and email can be one step; a full profile needs more.',
      },
      {
        title: 'Units Without Progress Signals',
        description:
          'Defining units but not showing users how many remain or how far they have progressed',
        why: 'Without knowing the total, users cannot gauge effort and may abandon, not knowing they are almost done',
        fix: 'Always show "Step X of Y" indicators, progress bars, or completion percentages alongside units',
      },
      {
        title: 'Inconsistent Unit Sizing',
        description:
          'Making some units take 30 seconds and others take 10 minutes within the same flow',
        why: 'Users anchor to the first unit\'s effort level. If Step 1 took 30 seconds, a 10-minute Step 2 feels broken.',
        fix: 'Keep units roughly equal in effort. If a step must be longer, warn users or subdivide it.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout defines what users perceive as "one unit" of content or one task',
        examples: [
          'Single-screen layouts create a natural completion unit — users finish what fits on screen',
          'Card-based layouts frame each card as one unit to process',
          'Paginated forms make each page feel like one completable step',
          'Scroll length signals unit size — short pages feel quick, long pages feel daunting',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography signals unit boundaries through headings, sections, and visual breaks',
        examples: [
          'Clear section headings define where one unit ends and another begins',
          'Numbered lists frame each item as one unit to complete',
          'Reading time estimates ("3 min read") define the content as a single consumable unit',
          'Paragraph breaks signal sub-units within a larger content block',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color differentiates units and signals completion states',
        examples: [
          'Distinct background colors for each form section define unit boundaries',
          'Green checkmarks on completed steps reinforce "unit finished" satisfaction',
          'Progress bar color fill shows how much of the unit remains',
          'Dimmed vs active sections signal which unit is current',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions define when a unit starts and ends, driving completion behavior',
        examples: [
          '"Next" and "Submit" buttons create explicit unit boundaries',
          'Autoplay triggers the start of a new unit, exploiting the completion drive',
          'Swipe gestures on cards define each swipe as one unit of decision-making',
          'Modal dialogs create isolated units — users feel compelled to finish before dismissing',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content chunking and unit definition directly shape engagement and consumption',
        examples: [
          '"One lesson" or "one module" labels define how much content users commit to',
          'Article series ("Part 1 of 3") frames each article as a unit to complete',
          '"Daily challenge" framing creates one unit of engagement per day',
          'Notification digests bundle items into one unit ("5 new updates") vs individual pings',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Unit boundaries must be perceivable and navigable for all users',
        examples: [
          'Screen reader users need clear unit boundaries announced via ARIA landmarks and headings',
          'Keyboard users need to be able to navigate between units (skip to next section)',
          'Users with cognitive disabilities benefit from smaller, clearer units with explicit progress',
          'Timed units must accommodate users who need more time (WCAG 2.2.1)',
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
        title: 'Single-Page Checkout Flow',
        description:
          'E-commerce checkout presenting shipping, payment, and review as one completable unit',
        code: `<form class="checkout-unit">
  <h2>Complete Your Order</h2>
  <p class="estimate">Takes about 2 minutes</p>

  <section class="checkout-section">
    <h3>1. Shipping Address</h3>
    <input placeholder="Full name" />
    <input placeholder="Address" />
    <input placeholder="City, State, ZIP" />
  </section>

  <section class="checkout-section">
    <h3>2. Payment</h3>
    <input placeholder="Card number" />
    <div class="row">
      <input placeholder="MM/YY" />
      <input placeholder="CVC" />
    </div>
  </section>

  <section class="checkout-section">
    <h3>3. Review</h3>
    <div class="order-summary">
      <p>2 items - $47.98</p>
      <p>Shipping - Free</p>
      <p class="total"><strong>Total: $47.98</strong></p>
    </div>
  </section>

  <button class="primary" type="submit">Place Order</button>
</form>`,
        explanation:
          'The entire checkout is framed as one unit with a time estimate. Users who start feel compelled to finish because it is "one form." The sections within provide structure without breaking the single-unit feeling.',
        principle:
          'One page = one unit of commitment. Users complete what they start.',
        metrics: {
          before: '58% checkout completion with 4-page multi-step checkout',
          after: '71% checkout completion with single-page checkout',
          improvement: '22% increase in checkout completion rate',
        },
      },
      {
        title: 'Bite-Sized Onboarding Steps',
        description:
          'Product onboarding broken into small, individually completable steps',
        code: `<div class="onboarding">
  <div class="progress">
    <span class="step completed">1</span>
    <span class="step active">2</span>
    <span class="step">3</span>
    <span class="step">4</span>
  </div>
  <p class="progress-text">Step 2 of 4</p>

  <div class="step-content">
    <h2>Choose Your Workspace Theme</h2>
    <p>Pick a look that suits your style. You can change this later.</p>

    <div class="theme-options">
      <button class="theme-card selected">
        <div class="preview light"></div>
        <span>Light</span>
      </button>
      <button class="theme-card">
        <div class="preview dark"></div>
        <span>Dark</span>
      </button>
      <button class="theme-card">
        <div class="preview auto"></div>
        <span>Auto</span>
      </button>
    </div>
  </div>

  <div class="actions">
    <button class="secondary">Back</button>
    <button class="primary">Next Step</button>
  </div>
</div>`,
        explanation:
          'Each step is one screen with one decision. The "Step 2 of 4" indicator tells users exactly how many units remain. Each step is small enough to complete in seconds, making users feel productive and willing to continue.',
        principle:
          'Small units with clear progress indicators maximize completion through unit bias',
      },
      {
        title: 'One-Screen-One-Task Dashboard Widget',
        description:
          'Dashboard presenting each widget as a self-contained unit of insight',
        code: `<div class="dashboard-grid">
  <article class="widget-unit">
    <h3>Revenue This Week</h3>
    <div class="metric">$12,450</div>
    <p class="delta positive">+8% vs last week</p>
    <p class="insight">Tuesday was your strongest day</p>
  </article>

  <article class="widget-unit">
    <h3>Active Users</h3>
    <div class="metric">1,847</div>
    <p class="delta negative">-3% vs last week</p>
    <p class="insight">Mobile sessions dropped — check load times</p>
  </article>

  <article class="widget-unit">
    <h3>Support Queue</h3>
    <div class="metric">12 tickets</div>
    <p class="delta positive">4 resolved today</p>
    <p class="insight">Average response time: 2.1 hours</p>
  </article>
</div>`,
        explanation:
          'Each widget is a complete unit: one metric, one comparison, one insight. Users can "finish" each card quickly. The self-contained nature means processing one widget feels satisfying and complete.',
        principle:
          'Each card = one unit of understanding. Users process and complete them individually.',
      },
    ],

    bad: [
      {
        title: 'The Endless Single-Page Form',
        description:
          'A registration form that crams dozens of fields into one enormous page',
        code: `<!-- DON'T DO THIS -->
<form class="registration">
  <h2>Create Your Account</h2>
  <!-- 35 fields on one page -->
  <input placeholder="First name" />
  <input placeholder="Last name" />
  <input placeholder="Email" />
  <input placeholder="Password" />
  <input placeholder="Confirm password" />
  <input placeholder="Company name" />
  <input placeholder="Job title" />
  <input placeholder="Department" />
  <input placeholder="Phone" />
  <input placeholder="Address line 1" />
  <input placeholder="Address line 2" />
  <input placeholder="City" />
  <input placeholder="State" />
  <input placeholder="ZIP" />
  <input placeholder="Country" />
  <textarea placeholder="Tell us about your goals..."></textarea>
  <select><option>Industry</option></select>
  <select><option>Company size</option></select>
  <!-- ... 17 more fields ... -->
  <button type="submit">Submit</button>
</form>`,
        explanation:
          'This form is technically "one unit" but it is so large that unit bias works against it. Users see the enormous scroll length, feel overwhelmed, and abandon. The single-unit framing actually makes things worse because there is no progress signal or natural stopping point.',
        principle:
          'A unit that is too large becomes a barrier, not a motivator',
      },
      {
        title: 'Auto-Playing Next Episode Without Consent',
        description:
          'Video platform exploiting unit bias with aggressive autoplay',
        code: `<!-- DON'T DO THIS -->
<div class="video-player">
  <video src="episode-7.mp4" autoplay></video>
  <div class="autoplay-overlay">
    <p>Next Episode starting in 3... 2... 1...</p>
    <small class="cancel">Cancel</small>
    <!-- Cancel button is tiny and hard to find -->
  </div>
</div>`,
        explanation:
          'By automatically starting the next episode, the platform creates a new "unit" the user feels compelled to finish. The tiny cancel button makes it hard to opt out. This exploits unit bias for engagement at the cost of user wellbeing.',
        principle:
          'Do not auto-create new units users did not choose to start',
      },
      {
        title: 'Misleading "Quick" Unit That Takes Forever',
        description:
          'Survey labeled "1 minute" that actually takes 15 minutes',
        code: `<!-- DON'T DO THIS -->
<div class="survey-prompt">
  <h3>Quick 1-Minute Survey</h3>
  <p>Help us improve! Just a few questions.</p>
  <button class="primary">Start Survey</button>
</div>

<!-- Actual survey: 47 questions across 12 pages -->`,
        explanation:
          'Labeling the survey as "1 minute" creates a small-unit expectation. When users discover it is actually 47 questions, trust is destroyed. Users feel tricked into starting a unit they would never have begun if they knew its true size.',
        principle:
          'Never misrepresent the size of a unit — honesty preserves trust',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Episode Autoplay',
        url: 'https://www.netflix.com',
        description:
          'Netflix defines "one episode" as the natural unit of consumption. The autoplay feature starts the next episode automatically, creating a new unit that triggers the completion drive. This is the core mechanism behind binge-watching — each episode is a unit you feel compelled to finish.',
        effectiveness: 'very-effective',
        analysis:
          'Extremely effective at driving engagement. Netflix has added "Are you still watching?" prompts as an ethical counterbalance, acknowledging that auto-creating units can drive overconsumption. The episode-as-unit framing is one of the most powerful applications of unit bias in consumer products.',
      },
      {
        company: 'Duolingo',
        product: 'Lesson Units',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo defines "one lesson" as a 3-5 minute unit. Each lesson is a complete unit with a progress bar and a satisfying completion animation. The small unit size makes "just one more lesson" feel trivial, driving repeat engagement.',
        effectiveness: 'very-effective',
        analysis:
          'Duolingo masterfully sizes its units to be small enough to always feel completable ("I have 5 minutes, I can do one lesson") while large enough to create learning value. The completion animation and XP reward reinforce the unit-completion satisfaction loop.',
      },
      {
        company: 'Medium',
        product: 'Reading Time Estimates',
        url: 'https://medium.com',
        description:
          'Medium displays "X min read" on every article, framing the article as a single time-defined unit. A "7 min read" feels like one manageable unit of consumption, making users more likely to start and finish.',
        effectiveness: 'effective',
        analysis:
          'The time estimate converts an ambiguous-length article into a defined unit. Users can decide if they have "one unit" of time available. Articles with shorter read times have higher completion rates, confirming that smaller perceived units drive more completions.',
      },
      {
        company: 'Food Industry',
        product: 'Single-Serving Packaging',
        description:
          'Food companies package chips, cookies, and snacks in "single serving" bags. People eat one bag regardless of whether it contains 150 calories or 400 calories. The package is the unit, and the unit determines consumption.',
        effectiveness: 'very-effective',
        analysis:
          'This is the original domain where unit bias was studied (Geier et al., 2006). The 100-calorie snack pack industry was built entirely on unit bias — people eat one pack and stop, whereas with a large bag they eat until they consciously decide to stop, which is typically more.',
      },
    ],

    abTests: [
      {
        title: 'Multi-Step vs Single-Page Checkout',
        hypothesis:
          'A single-page checkout (one unit) will have higher completion than a 4-page checkout (four units)',
        controlVersion: {
          description:
            '4-page checkout: Page 1 (Shipping), Page 2 (Payment), Page 3 (Review), Page 4 (Confirm). Each page is a separate unit with its own submit button.',
          metrics: {
            conversionRate: '58%',
            timeToComplete: '4:12',
            dropOffRate: '18% at page 2, 12% at page 3',
          },
        },
        treatmentVersion: {
          description:
            'Single-page checkout with all fields visible as sections. One "Place Order" button at the bottom. Estimated time shown at top.',
          metrics: {
            conversionRate: '71%',
            timeToComplete: '3:08',
            dropOffRate: '29% total (but no mid-flow drops)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The single-page checkout increased completion by 22%. Users who started the one-unit checkout were far more likely to finish. The multi-step version gave users natural stopping points at each page transition where they could abandon.',
          learnings: [
            'Fewer units = fewer opportunities to abandon',
            'Single-unit framing creates stronger completion drive',
            'Time-to-complete dropped because users pushed through without pause',
            'Progress indicators within the single page helped users gauge remaining effort',
          ],
        },
      },
      {
        title: 'Lesson Length: 3-Minute vs 10-Minute Units',
        hypothesis:
          'Shorter lesson units (3 min) will drive more lessons completed per session than longer units (10 min)',
        controlVersion: {
          description:
            'Educational platform with 10-minute lessons. Each lesson covers one full topic with examples and practice.',
          metrics: {
            conversionRate: '67%',
            lessonsPerSession: '1.4',
            weeklyRetention: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Same content split into 3-minute micro-lessons. Each micro-lesson covers one concept with one practice exercise.',
          metrics: {
            conversionRate: '89%',
            lessonsPerSession: '3.2',
            weeklyRetention: '52%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Shorter units drove dramatically more engagement. Lesson completion rate jumped from 67% to 89%, and users completed 2.3x more lessons per session. The "just one more" effect was much stronger with 3-minute units. Weekly retention also improved because the low commitment of "one lesson" reduced the barrier to returning.',
          learnings: [
            'Smaller units feel more completable and drive higher completion rates',
            'The "just one more" effect is strongest when units feel trivially small',
            'Total content consumed was actually higher with smaller units despite each being shorter',
            'Retention improved because returning for "one quick lesson" felt easy',
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
        name: 'Single-Screen Framing',
        description:
          'Content or tasks sized to fit within one viewport, creating a natural unit boundary',
        howToSpot:
          'Check if pages, forms, or content blocks are designed to fit on one screen without scrolling',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Step Indicators',
        description:
          'Progress bars, step counters, or "X of Y" labels that define and track units',
        howToSpot:
          'Look for "Step 1 of 3", progress dots, numbered sections, or completion percentages',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Unit Labels',
        description:
          'Explicit naming of content as units: "1 lesson", "1 module", "1 episode", "1 article"',
        howToSpot:
          'Search for language that frames content as discrete, countable units with clear boundaries',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Time-Defined Units',
        description:
          'Content labeled with time estimates like "5 min read" or "3 min lesson" that frame the unit by duration',
        howToSpot:
          'Look for reading time estimates, lesson durations, or estimated completion times on tasks',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Completion Signals',
        description:
          'Checkmarks, animations, or progress fills that signal when a unit is finished',
        howToSpot:
          'Check for green checkmarks, celebration animations, "Done!" messages, or progress bars reaching 100%',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'One-Screen-One-Task Pattern',
        description: 'Each screen or view presents exactly one task or decision for the user to complete',
        indicators: ['Single primary action per screen', 'Minimal scrolling required', 'Clear "Next" or "Done" button', 'One question or input group per view'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Content Chunking Pattern',
        description: 'Long content broken into labeled, individually completable chunks',
        indicators: ['Numbered lessons or modules', 'Reading time estimates', 'Chapter or section dividers', 'Individual completion tracking per chunk'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Autoplay/Auto-Advance Pattern',
        description: 'System automatically starts the next unit to create a new completion drive',
        indicators: ['Autoplay countdowns between episodes or lessons', 'Auto-advancing to next step', 'Automatic loading of next content', '"Up Next" previews'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Single-Serving Packaging Pattern',
        description: 'Information, tasks, or content pre-portioned into fixed-size units',
        indicators: ['Daily digests or summaries', 'Fixed-length quizzes or exercises', '"Daily challenge" or "word of the day" framing', 'Bundled notifications as one unit'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What constitutes "one unit" in this experience? Is it a page, a step, a lesson, an episode?',
      'Is the unit size appropriate for the content and task complexity?',
      'Can users complete one unit in a reasonable, predictable amount of time?',
      'Are unit boundaries clear and visible (headings, dividers, step indicators)?',
      'Do users know how many units remain (progress indicators)?',
      'Are units roughly equal in effort, or do some take much longer than others?',
      'Does the design auto-create new units (autoplay, auto-advance) that users did not explicitly choose?',
      'Is the unit size honest? Does "one quick step" actually feel quick?',
      'Could the unit be broken into smaller, more completable sub-units?',
      'Are there natural stopping points, or does the design exploit completion drive indefinitely?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in unit bias.

Analyze the provided design for unit bias patterns. Identify:

1. **Unit Definition**: What constitutes "one unit" in this experience (one page, one step, one lesson, one card)?
2. **Unit Sizing**: Is each unit appropriately sized for its content and purpose?
3. **Completion Signals**: How does the design indicate when a unit is complete?
4. **Progress Framing**: How are multi-unit sequences framed (step indicators, progress bars)?
5. **Auto-Continuation**: Does the design auto-create new units (autoplay, auto-advance)?

For each unit bias pattern found:
- Identify what the defined unit is and where its boundaries are
- Assess whether the unit size is appropriate or if it is too large/too small
- Determine whether unit boundaries are clear and perceivable
- Evaluate whether auto-continuation patterns are ethical
- Suggest improvements for unit sizing and boundary clarity

Consider:
- Are oversized units creating abandonment?
- Are undersized units creating friction or patronizing users?
- Is the design exploiting completion drive through autoplay or auto-advance?
- Do time estimates or progress indicators honestly represent the unit size?
- Are unit boundaries accessible to all users (screen readers, keyboard nav)?

Provide actionable recommendations for ethical, effective unit design.`,

    outputSchema: {
      type: 'object',
      properties: {
        unitPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              unitType: { type: 'string' },
              location: { type: 'string' },
              unitSize: { type: 'string' },
              completionSignal: { type: 'string' },
              appropriateness: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'unitType',
              'location',
              'unitSize',
              'appropriateness',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            unitClarity: { type: 'number' },
            unitSizing: { type: 'number' },
            progressVisibility: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'unitClarity',
            'unitSizing',
            'progressVisibility',
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
        'unitPatterns',
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
        title: 'Identify Natural Units',
        description:
          'Determine what "one unit" should be for your experience — one task, one concept, one decision',
        example:
          'For an onboarding flow: one unit = one piece of profile information (name, role, preferences)',
        tips: [
          'Map out the full user journey and identify logical breakpoints',
          'Ask: where would a user naturally pause or feel "done with one thing"?',
          'Consider cognitive load — one unit should require one type of thinking',
        ],
      },
      {
        step: 2,
        title: 'Size Units Appropriately',
        description:
          'Ensure each unit is small enough to feel completable but large enough to be meaningful',
        example:
          'A lesson unit should take 3-5 minutes, not 30 seconds (too trivial) or 30 minutes (too daunting)',
        tips: [
          'Target units that take 1-5 minutes for tasks, 3-10 minutes for content',
          'Test with real users — if more than 20% abandon mid-unit, it is too large',
          'Keep units roughly equal in effort within the same flow',
        ],
      },
      {
        step: 3,
        title: 'Make Unit Boundaries Visible',
        description:
          'Clearly signal where one unit ends and another begins using visual and structural cues',
        example:
          'Use step indicators ("Step 2 of 5"), section dividers, or separate pages to mark boundaries',
        tips: [
          'Use headings, dividers, and whitespace to separate units visually',
          'Add progress indicators so users know how many units remain',
          'Provide completion signals (checkmarks, animations) when a unit is finished',
        ],
      },
      {
        step: 4,
        title: 'Set Honest Expectations',
        description:
          'Tell users how large each unit is before they commit to starting it',
        example:
          'Show "5 min read", "3 questions", or "Takes about 2 minutes" before the user begins',
        tips: [
          'Time estimates build trust and help users decide when to start',
          'Field counts or question counts set accurate scope expectations',
          'Never underestimate — overdelivering on speed builds confidence',
        ],
      },
      {
        step: 5,
        title: 'Add Ethical Stopping Points',
        description:
          'Provide clear, easy opportunities for users to stop between units rather than auto-continuing',
        example:
          'After each lesson, show a "Continue" button instead of auto-advancing. Include "Take a break" option.',
        tips: [
          'Require explicit opt-in to start the next unit, not just a countdown',
          'Show session duration reminders for binge-prone experiences',
          'Make stopping as easy as continuing — equal-weight buttons',
        ],
      },
    ],

    dos: [
      'Define clear, appropriately sized units for every multi-step experience',
      'Show progress indicators so users know how many units remain',
      'Keep unit sizes roughly consistent within the same flow',
      'Provide honest time or effort estimates before users start a unit',
      'Add completion signals (checkmarks, animations) when a unit is finished',
      'Use the "one screen, one task" principle for form and wizard design',
      'Frame content with unit labels ("Lesson 3", "Chapter 2", "Step 4 of 6")',
      'Test unit sizes with real users to find the optimal balance',
    ],

    donts: [
      'Don\'t cram too much into a single unit — oversized units cause abandonment',
      'Don\'t break simple tasks into excessively many micro-units — it creates friction',
      'Don\'t auto-advance to the next unit without user consent',
      'Don\'t misrepresent unit size ("quick survey" that takes 20 minutes)',
      'Don\'t have wildly inconsistent unit sizes in the same flow',
      'Don\'t hide the total number of units — transparency builds trust',
      'Don\'t exploit unit bias to drive compulsive consumption at the cost of user wellbeing',
      'Don\'t make stopping harder than continuing (tiny cancel buttons, autoplay countdowns)',
    ],

    bestPractices: [
      {
        title: 'One Screen, One Task',
        description:
          'Design each screen or view to contain exactly one completable task or decision',
        rationale:
          'Users perceive one screen as one unit of effort and are more likely to complete it than scroll past it',
        example:
          'Step 1: Enter your name. Step 2: Choose your role. Step 3: Set preferences. One thing per screen.',
      },
      {
        title: 'Bite-Sized Content Units',
        description:
          'Break long content into small, labeled units with individual completion tracking',
        rationale:
          'Users will complete many small units but abandon one large block. Total engagement is higher with small units.',
        example:
          'Instead of one 30-minute tutorial, create six 5-minute lessons with checkmarks for each.',
      },
      {
        title: 'Honest Unit Labeling',
        description:
          'Always communicate unit size accurately through time estimates, field counts, or effort descriptions',
        rationale:
          'Misrepresenting unit size destroys trust. Accurate labels help users plan and commit appropriately.',
        example:
          '"This form takes about 3 minutes (8 fields)" — honest and specific.',
      },
      {
        title: 'Completion Celebrations',
        description:
          'Reward unit completion with satisfying feedback: checkmarks, animations, progress fills',
        rationale:
          'Completion signals reinforce the satisfaction of finishing a unit, motivating users to start the next one',
        example:
          'Green checkmark animation + "Step 2 Complete! 3 more to go." message.',
      },
      {
        title: 'Ethical Continuation Design',
        description:
          'Require explicit user action to start the next unit. Never auto-continue.',
        rationale:
          'Auto-continuation exploits unit bias compulsively. Ethical design lets users choose when to engage.',
        example:
          '"Continue to next lesson" button (user clicks) instead of autoplay countdown.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Unit boundaries must be conveyed through structure, not just visuals',
        implementation:
          'Use semantic HTML (sections, headings, landmarks) and ARIA roles to define unit boundaries so screen readers can announce them.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - If units have time limits, users must be able to extend or disable them',
        implementation:
          'Autoplay countdowns and timed units must offer pause, extend, or disable options. Never force auto-continuation without user control.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Each unit should have a clear, descriptive heading',
        implementation:
          'Label every unit with a heading that describes its content or task. "Step 2: Choose Your Plan" is better than "Step 2" alone.',
      },
      {
        wcagLevel: 'A',
        criterion: '2.4.2',
        guideline:
          'Page Titled - Each unit (especially if on separate pages) must have a descriptive page title',
        implementation:
          'Update the page title for each step in a multi-page flow: "Checkout - Step 2: Payment | Store Name".',
      },
    ],

    ethics: [
      {
        concern: 'Compulsive Consumption',
        severity: 'critical',
        explanation:
          'Auto-creating new units (autoplay, auto-advance) exploits the completion drive and can lead to compulsive, regretful consumption',
        mitigation:
          'Require explicit user action to start each new unit. Provide session time reminders. Offer "take a break" prompts after extended use.',
      },
      {
        concern: 'Misleading Unit Size',
        severity: 'high',
        explanation:
          'Labeling a large task as "one quick step" or "a short survey" exploits trust by misrepresenting unit size',
        mitigation:
          'Always provide accurate time estimates and field counts. Test actual completion times and label accordingly.',
      },
      {
        concern: 'Dark Pattern Stopping Friction',
        severity: 'high',
        explanation:
          'Making it harder to stop than to continue (tiny cancel buttons, guilt-tripping copy) traps users in consumption loops',
        mitigation:
          'Give "Stop" and "Continue" options equal visual weight. Never use guilt-based copy ("Are you sure you want to quit learning?").',
      },
      {
        concern: 'Exploiting Vulnerable Users',
        severity: 'critical',
        explanation:
          'Children, users with addiction tendencies, and those with compulsive behaviors are especially susceptible to unit bias exploitation',
        mitigation:
          'Implement parental controls, daily limits, and mandatory breaks for products targeting vulnerable populations. Follow platform guidelines for minors.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Serving Size as a Determinant of Food Intake: The Unit Bias',
        author: 'Geier, A. B., Rozin, P., & Doros, G.',
        year: 2006,
        doi: '10.1037/0278-6133.25.4.549',
        description:
          'The foundational paper introducing unit bias, demonstrating that people consume one unit regardless of unit size across multiple food experiments',
        type: 'foundational',
      },
      {
        title: 'Mindless Eating: Why We Eat More Than We Think',
        author: 'Wansink, B.',
        year: 2006,
        description:
          'Research on how environmental cues including unit sizing affect consumption behavior, extending unit bias beyond single experiments',
        type: 'practical',
      },
      {
        title: 'The Zeigarnik Effect and Completion Drive',
        author: 'Zeigarnik, B.',
        year: 1927,
        description:
          'The classic study on how incomplete tasks create cognitive tension, forming the psychological basis for why people feel compelled to finish units',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Covers how product design leverages unit-based engagement loops, including unit sizing and completion rewards',
        type: 'practical',
      },
      {
        title: 'Mindless Eating: Why We Eat More Than We Think',
        author: 'Wansink, Brian',
        year: 2006,
        isbn: '9780553384482',
        description:
          'Extensive coverage of unit bias in food consumption, with direct implications for UX portion sizing',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Psychology of Chunking and Completeness in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/chunking/',
        description:
          'Practical guide to content chunking and unit design in user interfaces',
        type: 'practical',
      },
      {
        title: 'Unit Bias: Why Portion Size Matters in UX Design',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies/unit-bias',
        description:
          'Case study applying unit bias from food science to digital product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Unit Bias: How Serving Size Tricks Our Brains',
        author: 'Behavioral Science',
        url: 'https://www.youtube.com/watch?v=unit-bias-explained',
        description:
          'Animated explanation of unit bias with food and digital examples',
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
