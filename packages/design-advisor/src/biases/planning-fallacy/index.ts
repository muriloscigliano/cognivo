/**
 * PLANNING FALLACY
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const planningFallacy: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'planning-fallacy',
    name: 'Planning Fallacy',
    aliases: ['Optimism Bias in Planning', 'Hofstadter\'s Law', 'Time Estimation Bias'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'decision-making',
      'time-estimation',
      'optimism',
      'project-management',
      'forecasting',
      'deadlines',
      'cost-estimation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We consistently underestimate how long tasks will take and how much they will cost, even when we have experience showing our estimates are usually wrong.',

    detailed: `The Planning Fallacy is the systematic tendency to underestimate the time, costs, and risks required to complete future tasks while overestimating the benefits—even when we know from experience that similar past tasks took longer and cost more than expected.

This is captured perfectly by Hofstadter's Law: "It always takes longer than you expect, even when you take into account Hofstadter's Law."

**Key Characteristics**:

1. **Systematic Underestimation**: Not random error—we consistently err in the direction of optimism, rarely overestimating duration.

2. **Persistence Despite Experience**: Even experienced professionals with decades of evidence that they underestimate continue to make optimistic predictions.

3. **Inside vs Outside View**:
   - **Inside View** (what we use): Focus on the specific task, imagine the plan working perfectly
   - **Outside View** (what's accurate): Look at how long similar tasks actually took

4. **Best-Case Planning**: We plan for the best-case scenario—everything going right—rather than the typical or worst-case scenarios that more often occur.

5. **Neglect of Obstacles**: We focus on the main task and forget about interruptions, dependencies, unexpected problems, learning curves, and coordination costs.

**Cognitive Mechanisms**:

- **Optimism Bias**: General tendency to expect positive outcomes
- **Scenario Imagination**: We imagine success scenarios more vividly than failure scenarios
- **Focalism**: We focus on the task itself and neglect contextual factors (meetings, emails, other projects, sick days)
- **Motivated Reasoning**: We're motivated to believe we can deliver quickly (to please others, win contracts, feel competent)
- **Memory Bias**: We remember our estimates but forget how wrong they were; we remember successes but forget the delays

**Real-World Impact**:

**In Software Development**:
- Projects routinely take 2-3x longer than estimated
- Technical debt from rushing to meet optimistic deadlines
- Scope creep when "quick additions" cascade
- Developer burnout from chronic overcommitment

**In Product Design**:
- Design sprints that were "just a day" take a week
- Prototypes that should be "quick" take months to get right
- User research that was "already scheduled" gets delayed repeatedly
- Launches that miss deadlines, disappointing stakeholders

**In Business**:
- Construction projects notoriously over budget and late
- Product launches delayed (see: any hardware startup)
- Marketing campaigns rushed because planning took longer than expected
- Budget overruns across industries

**In Daily Life**:
- "I'll just quickly..." becomes 45 minutes
- Morning routines that should take 20 minutes require 40
- "Quick errands" consume the afternoon
- Projects started "because I have a free weekend" remain unfinished months later

The fallacy isn't about being bad at estimation—it's a systematic cognitive bias that affects even experts in their own domains.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman and Amos Tversky',
      year: 1979,
      theory: 'Heuristics and Biases Research Program',
      mechanism: `The brain defaults to an "inside view" when estimating future task duration, focusing on the specific plan rather than historical base rates. This happens because:

1. **Inside View Dominance**: When imagining a task, the brain constructs a best-case narrative—each step going smoothly—rather than sampling from past outcomes
2. **Singularity Thinking**: We treat each new task as unique ("this time is different"), ignoring that similar tasks in the past also felt unique and still ran over
3. **Scenario Simulation**: The brain simulates the plan step by step, but only the "happy path"—it omits interruptions, dependencies, unexpected complexity, and coordination overhead
4. **Motivated Cognition**: We have incentives (social pressure, deadlines, competitiveness) to produce optimistic estimates, and the brain complies
5. **Memory Asymmetry**: We remember completing tasks but not how long they actually took; we recall the deliverable, not the delays

The mechanism is robust—even telling people about the planning fallacy doesn't eliminate it. Only forcing an "outside view" (reference class forecasting) consistently improves accuracy.`,
    },

    realWorldExample: `**Software Development Example**:

**Monday Morning Standup**:
Developer: "I'll finish the login feature today. Just need to wire up the API, should take 2-3 hours."

**What the Developer Is Forgetting**:
- 1 hour: Morning meetings and email
- 30 min: API documentation is incomplete, need to ask backend team
- 30 min: Waiting for backend team to respond
- 1 hour: Dealing with unexpected CORS issues
- 30 min: Lunch and context switching
- 1 hour: Realizing password reset flow also needs implementing
- 30 min: Fixing TypeScript errors
- 1 hour: Writing tests (oh right, tests)
- 30 min: Code review feedback addressing
- 30 min: Merge conflicts from other team's changes

**Friday Afternoon**:
Developer: "Sorry, the login feature isn't quite done. Should have it Monday."

**Why This Happens Every Week**:
- Inside view: "Wire up API" seems like a clear 2-3 hour task
- Outside view: Past 20 "2-3 hour" tasks averaged 12 hours
- But developer uses inside view again next Monday

**Project Management Example**:

**Sprint Planning**:
PM: "We can ship the new dashboard in this 2-week sprint. It's basically just reorganizing existing components."

**What's Actually Required**:
- Week 1-2: Design takes 2 weeks (planned for 2 days)
- Week 3: Engineering realizes data model doesn't support this layout
- Week 4: Backend changes to support new data shape
- Week 5-6: Frontend implementation (planned for 1 week)
- Week 7: Stakeholder sees it, wants changes
- Week 8: Design and implementation changes
- Week 9: QA finds critical bugs
- Week 10: Bug fixes and polish
- Week 11: Performance optimization (dashboard is slow)
- Week 12: Finally ships, 6x longer than estimated

**Daily Life Example**:

You: "I'll just quickly tidy the kitchen before we leave. Give me 10 minutes."

**Reality**:
- 2 min: Load dishwasher
- 3 min: Notice fridge shelf is sticky, clean it
- 5 min: Fridge cleaning reveals expired food, disposal and cleanup
- 2 min: Take out trash (now full)
- 2 min: Realize you're out of trash bags, add to shopping list
- 3 min: Wipe counters
- 4 min: Notice coffee pot needs deep cleaning
- 35 minutes later: Kitchen is clean but you're late

The pattern: focusing on the main task ("tidy kitchen," "wire up API," "reorganize components") while neglecting all the adjacent tasks, interruptions, and complications that inevitably arise.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Planning Fallacy affects how users and teams estimate time, effort, and cost in digital products. Designers must account for this bias in two directions:

- **In the product**: Time estimates, progress indicators, shipping dates, onboarding flows, and project management tools all trigger or mitigate planning fallacy
- **In the process**: Design sprints, development timelines, and launch dates are all vulnerable to this bias
- Help users make realistic commitments by surfacing historical data
- Prevent disappointment by padding time estimates and showing ranges instead of point estimates
- Build trust by delivering on realistic promises rather than missing optimistic ones`,

    whenToUse: [
      {
        title: 'Project Management Tools',
        scenario:
          'When helping users estimate task durations or sprint capacity',
        example:
          'Show historical velocity data: "Your team typically completes 65% of planned story points. Suggested capacity: 34 points instead of 52."',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Shipping and Delivery Estimates',
        scenario: 'When communicating expected delivery or completion times to users',
        example:
          'Show a range with buffer: "Estimated delivery: March 15-19" rather than a single optimistic date',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Duration',
        scenario: 'When setting expectations for how long setup or learning takes',
        example:
          'Show realistic time: "Most users complete setup in 15-25 minutes" rather than "Quick 5-minute setup!"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Download and Processing Indicators',
        scenario: 'When showing progress for file downloads, uploads, or data processing',
        example:
          'Use conservative time estimates that account for variable network conditions; update in real time rather than showing an optimistic initial estimate',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Goal Setting and Habit Tracking',
        scenario: 'When users set personal goals or create plans within the app',
        example:
          'Show completion rates for similar goals: "Users who set this goal typically achieve it in 6 weeks, not the 2 weeks most estimate"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Crowdfunding and Pre-Order Timelines',
        scenario: 'When creators set or users evaluate delivery timelines for crowdfunded products',
        example:
          'Display historical on-time delivery rate for the platform: "78% of projects on this platform deliver 2+ months late"',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Motivational Contexts',
        reason:
          'Showing pessimistic estimates can demotivate users who need encouragement to start',
        consequence:
          'Users may abandon tasks before beginning if estimates feel overwhelming',
        alternative:
          'Break large tasks into smaller milestones with realistic but encouraging sub-estimates; celebrate progress along the way',
      },
      {
        title: 'Simple, Well-Known Tasks',
        reason:
          'For genuinely quick, predictable tasks, padding estimates feels patronizing',
        consequence:
          'Users lose trust in your estimates if simple tasks consistently finish much earlier than predicted',
        alternative:
          'Reserve buffer padding for complex, multi-step, or novel tasks where uncertainty is genuinely high',
      },
      {
        title: 'Competitive Sales Contexts',
        reason:
          'Showing pessimistic timelines when competitors promise faster delivery can lose deals',
        consequence:
          'Lost conversions if users choose competitors with (false) faster promises',
        alternative:
          'Be transparent about realistic timelines while emphasizing reliability and quality: "We deliver on time, 97% of the time"',
      },
      {
        title: 'Emergency or Urgent Flows',
        reason:
          'In crisis situations, users need action, not lectures about estimation accuracy',
        consequence:
          'Delay and frustration when immediate response is critical',
        alternative:
          'Provide best available estimates and update frequently as the situation evolves',
      },
    ],

    commonMistakes: [
      {
        title: 'Promising "Quick" Setup',
        description:
          'Marketing claims like "5-minute setup" or "Get started in seconds" when real onboarding takes 20+ minutes',
        why: 'Creates immediate disappointment and distrust when reality doesn\'t match the promise; users feel deceived',
        fix: 'Use honest ranges ("Most users complete setup in 15-25 minutes") or milestone-based progress ("Step 2 of 5")',
      },
      {
        title: 'Single Point Estimates',
        description:
          'Showing one specific time ("Arrives Tuesday") instead of a range',
        why: 'Single estimates feel like promises; missing them erodes trust. Ranges set accurate expectations and feel honest.',
        fix: 'Show ranges: "Arrives Tuesday-Thursday" or confidence intervals: "90% chance by Friday"',
      },
      {
        title: 'Ignoring Historical Data',
        description:
          'Letting users set time estimates without showing how similar past tasks actually performed',
        why: 'Without reference class data, users default to optimistic inside-view estimates every time',
        fix: 'Surface historical comparisons: "Similar tasks in your project took an average of 3.2 days (you estimated 1 day)"',
      },
      {
        title: 'Progress Bars That Lie',
        description:
          'Progress indicators that move quickly at first then stall (fake progress), or that reach 90% and stay there',
        why: 'Non-linear progress bars train users to distrust all progress indicators; creates anxiety at the "stuck" phases',
        fix: 'Use honest progress indicators; if progress is unpredictable, show an indeterminate indicator with elapsed time rather than a fake percentage',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how time and progress information is presented, affecting estimation behavior',
        examples: [
          'Timeline views that show historical vs estimated completion dates side by side',
          'Dashboard layouts that prominently display velocity trends and estimation accuracy',
          'Sprint boards that show remaining capacity based on historical data',
          'Gantt charts that visually compare planned vs actual timelines',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text presentation affects how seriously users take time estimates and warnings',
        examples: [
          'Bold, prominent display of realistic time ranges rather than hiding them in fine print',
          'Clear labeling distinguishing "estimated" from "confirmed" dates',
          'Typography hierarchy that emphasizes deadline warnings when estimates are at risk',
          'Using size and weight to make historical accuracy metrics prominent',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding helps users quickly assess estimation accuracy and deadline risk',
        examples: [
          'Red/amber/green color coding for estimation confidence levels',
          'Color-coded timeline bars showing planned vs actual duration',
          'Warning colors when current estimates significantly exceed historical averages',
          'Graduated color scales showing probability of on-time completion',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements shape how users create, adjust, and respond to time estimates',
        examples: [
          'Slider inputs for estimates that default to historical average rather than zero',
          'Confirmation dialogs when user estimates are significantly below historical reference',
          'Interactive burndown charts that update in real time',
          'Drag-to-resize timeline blocks that snap to realistic minimums based on past data',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether estimates feel optimistic, realistic, or pessimistic',
        examples: [
          'Microcopy that nudges toward realism: "Tasks like this usually take 3x longer than estimated"',
          'Contextual tips showing estimation accuracy history for this user or team',
          'Delivery date copy that uses ranges: "Expected Mar 15-19" instead of single dates',
          'Historical comparison callouts: "Last sprint, 4 of 8 stories missed their estimates"',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Time-related information must be accessible to all users regardless of ability',
        examples: [
          'Screen reader announcements for deadline warnings and estimation alerts',
          'Non-color-dependent indicators for estimation confidence (icons, text labels)',
          'Keyboard-navigable timeline controls for adjusting estimates',
          'Clear, descriptive labels for progress indicators that convey actual status, not just percentage',
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
        title: 'Reference Class Forecasting in Sprint Planning',
        description:
          'Project management tool showing historical velocity alongside current sprint estimates',
        code: `<div class="sprint-planning">
  <h3>Sprint 24 - Capacity Planning</h3>

  <div class="velocity-reference">
    <h4>Historical Velocity (last 6 sprints)</h4>
    <div class="velocity-chart">
      <span class="sprint">S18: 28pts</span>
      <span class="sprint">S19: 31pts</span>
      <span class="sprint">S20: 25pts</span>
      <span class="sprint">S21: 33pts</span>
      <span class="sprint">S22: 27pts</span>
      <span class="sprint">S23: 30pts</span>
    </div>
    <p class="average">Average: <strong>29 points</strong></p>
    <p class="range">Range: 25-33 points (80% confidence)</p>
  </div>

  <div class="current-plan">
    <h4>Currently Planned: <span class="warning">47 points</span></h4>
    <p class="alert">This is 62% above your average velocity.
    Your team has completed this many points 0 out of 6 sprints.</p>
    <button class="secondary">Adjust to recommended: 29 points</button>
  </div>
</div>`,
        explanation:
          'By showing historical velocity data alongside the current plan, the tool forces an "outside view" comparison. The warning makes the overcommitment concrete and actionable rather than abstract.',
        principle:
          'Reference class forecasting counters inside-view optimism with historical base rates',
        metrics: {
          before: '23% of sprints completed all planned work',
          after: '61% of sprints completed all planned work after adopting velocity-based planning',
          improvement: '165% improvement in sprint completion rate',
        },
      },
      {
        title: 'Honest Delivery Date Ranges',
        description:
          'E-commerce checkout showing delivery as a range with confidence level',
        code: `<div class="delivery-estimate">
  <h4>Estimated Delivery</h4>
  <div class="date-range">
    <span class="range-dates">March 15 - March 19</span>
    <span class="confidence">95% of orders arrive in this window</span>
  </div>
  <div class="details">
    <p class="best-case">Earliest possible: March 14</p>
    <p class="typical">Most likely: March 17</p>
    <p class="buffer">Latest expected: March 19</p>
  </div>
  <p class="track">You'll get real-time tracking once shipped.</p>
</div>`,
        explanation:
          'Showing a range with confidence level sets honest expectations. Users who receive their order on March 16 feel pleasantly surprised rather than disappointed by a missed "March 14" promise.',
        principle:
          'Ranges with confidence levels build trust through honest communication',
      },
      {
        title: 'Task Estimation with Historical Comparison',
        description:
          'Task creation form that surfaces historical data when users enter time estimates',
        code: `<form class="task-form">
  <label for="estimate">Time Estimate</label>
  <input id="estimate" type="number" value="2" /> hours

  <div class="historical-context">
    <h5>How similar tasks actually performed:</h5>
    <ul>
      <li>Your estimate: <strong>2 hours</strong></li>
      <li>Average actual time for "API integration" tasks: <strong>6.4 hours</strong></li>
      <li>Your personal accuracy: You typically take <strong>2.8x</strong> your estimates</li>
    </ul>
    <p class="suggestion">Suggested estimate:
      <strong>5.6 hours</strong>
      <button class="link">Apply suggestion</button>
    </p>
  </div>
</form>`,
        explanation:
          'Showing the user their own historical accuracy makes the planning fallacy personal and undeniable. The suggested estimate based on their actual multiplier provides a concrete correction.',
        principle:
          'Personal historical data is more persuasive than generic warnings about optimism bias',
        metrics: {
          before: 'Average estimation error: 2.8x (tasks took 2.8x longer than estimated)',
          after: 'Average estimation error: 1.4x after 3 months of historical feedback',
          improvement: '50% reduction in estimation error',
        },
      },
    ],

    bad: [
      {
        title: 'False "Quick Setup" Promise',
        description:
          'SaaS product promising instant setup when real onboarding takes much longer',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-hero">
  <h1>Get Started in Just 2 Minutes!</h1>
  <p>Our lightning-fast setup means you'll be productive immediately.</p>
  <button class="primary">Start Now - It's Quick!</button>
</div>

<!-- Reality: Step 1 of 7, 25 minutes later... -->
<div class="onboarding-step">
  <p>Step 4 of 7: Configure your integrations</p>
  <p class="time-spent">Time spent so far: 18 minutes</p>
  <!-- User expected 2 minutes total -->
</div>`,
        explanation:
          'Promising "2 minutes" when setup actually takes 25 minutes exploits and reinforces the planning fallacy. Users feel deceived, start frustrated, and may abandon the process entirely. This damages trust from the very first interaction.',
        principle:
          'Never promise unrealistic timeframes; the disappointment compounds into distrust',
      },
      {
        title: 'Deceptive Progress Bar',
        description:
          'Progress bar that races to 90% then stalls, creating false time expectations',
        code: `<!-- DON'T DO THIS -->
<div class="upload-progress">
  <!-- Jumps to 90% in 3 seconds, then sits for 2 minutes -->
  <div class="progress-bar" style="width: 90%"></div>
  <p>90% complete - Almost done!</p>
  <!-- User has been staring at "90%" for 2 minutes -->
  <!-- Original estimate said "30 seconds remaining" -->
</div>`,
        explanation:
          'Non-linear progress bars that front-load visual progress create false time expectations. Users feel stuck and anxious when the bar stalls. The "30 seconds remaining" estimate that becomes 2+ minutes destroys credibility.',
        principle:
          'Progress indicators must honestly represent actual progress, not create false optimism',
      },
      {
        title: 'Crowdfunding Without Historical Context',
        description:
          'Project page showing optimistic delivery date with no reference to platform track record',
        code: `<!-- DON'T DO THIS -->
<div class="kickstarter-project">
  <h3>Estimated Delivery: June 2026</h3>
  <p>We've got everything planned out! Manufacturing is ready to go.</p>
  <div class="pledge-button">
    <button>Back This Project - Ships June!</button>
  </div>
  <!-- No mention that 78% of similar projects deliver 4+ months late -->
  <!-- No mention that this is the creator's first project -->
</div>`,
        explanation:
          'Presenting a single optimistic delivery date without historical context for similar projects enables the planning fallacy for both creators and backers. Backers make purchasing decisions based on unrealistic timelines.',
        principle:
          'Platforms have a responsibility to surface base-rate delivery data alongside creator estimates',
      },
    ],

    realWorld: [
      {
        company: 'Atlassian',
        product: 'Jira Velocity Charts',
        description: 'Jira tracks historical sprint velocity and displays it during sprint planning. Teams can see their average completed story points over past sprints, making overcommitment visible before the sprint starts.',
        effectiveness: 'effective',
        analysis: 'By surfacing historical velocity data at the point of planning, Jira applies reference class forecasting. Teams that use velocity charts consistently report more accurate sprint planning and fewer missed commitments.',
      },
      {
        company: 'Google',
        product: 'Google Maps ETA',
        description: 'Google Maps shows arrival time ranges during high-uncertainty conditions (traffic, weather) and continuously updates estimates in real time. The estimate accounts for historical traffic patterns on that route at that time of day.',
        effectiveness: 'very-effective',
        analysis: 'Google Maps is one of the best real-world applications of outside-view estimation. By using historical traffic data (reference class) rather than ideal conditions (inside view), estimates are remarkably accurate. Real-time updates further build trust.',
      },
      {
        company: 'Kickstarter',
        product: 'Estimated Delivery Dates',
        description: 'Kickstarter allows creators to set estimated delivery dates, but most projects deliver late. The platform has started showing "Risks and Challenges" sections and creator track records to help backers calibrate expectations.',
        effectiveness: 'somewhat-effective',
        analysis: 'Despite platform-level interventions, creator estimates remain systematically optimistic. The planning fallacy affects creators at the point of estimation, and backers at the point of evaluation. More prominent historical delivery data would help.',
      },
      {
        company: 'Amazon',
        product: 'Delivery Date Promises',
        description: 'Amazon shows delivery date ranges and uses conservative estimates that account for logistics variability. Prime delivery dates are backed by historical fulfillment data, and the company pads estimates to consistently deliver early.',
        effectiveness: 'very-effective',
        analysis: 'Amazon deliberately under-promises and over-delivers. By padding estimates with buffer time derived from historical data, packages often arrive earlier than shown. This builds trust and creates positive surprise rather than disappointment.',
      },
    ],

    abTests: [
      {
        title: 'Sprint Planning: Velocity-Based vs Gut-Feel Estimation',
        hypothesis:
          'Showing historical velocity data during sprint planning will reduce overcommitment and increase sprint completion rate',
        controlVersion: {
          description:
            'Sprint planning tool with manual story point entry, no historical velocity reference shown',
          metrics: {
            conversionRate: '23%',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            'Sprint planning tool showing 6-sprint velocity average, range, and a warning when planned points exceed 110% of average',
          metrics: {
            conversionRate: '61%',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Sprint completion rate (all planned stories done) increased from 23% to 61%. Teams planned fewer points per sprint but delivered more total value over a quarter because they avoided the waste of incomplete, carried-over work.',
          learnings: [
            'Historical velocity data is the single most effective planning fallacy countermeasure',
            'Teams initially resisted lower estimates but appreciated higher completion rates within 2 sprints',
            'Warning threshold at 110% of average was the sweet spot; 100% felt too restrictive',
            'Showing personal estimation accuracy (multiplier) was even more effective than team velocity',
          ],
        },
      },
      {
        title: 'Delivery Estimates: Single Date vs Range with Confidence',
        hypothesis:
          'Showing delivery date ranges will increase customer satisfaction despite appearing less precise',
        controlVersion: {
          description:
            'Single delivery date shown at checkout: "Arrives Tuesday, March 17"',
          metrics: {
            conversionRate: '72%',
            clickThroughRate: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            'Delivery range shown at checkout: "Arrives March 15-19 (95% confidence). Most likely: March 17"',
          metrics: {
            conversionRate: '70%',
            clickThroughRate: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Conversion rate was 2% lower with ranges, but post-delivery satisfaction was 34% higher and support tickets about "late" deliveries dropped 52%. Net effect on retention and LTV was strongly positive.',
          learnings: [
            'Honest ranges slightly reduce initial conversion but dramatically reduce post-purchase complaints',
            'Customers who received orders within the range rated the experience higher than those who received a single-date promise, even on the same delivery day',
            'Adding "Most likely" within the range maintained specificity while preserving honesty',
            'The 95% confidence framing made the range feel scientific rather than vague',
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
        name: 'Optimistic Time Promises',
        description:
          'Unrealistic time claims like "instant," "in seconds," "5-minute setup" for complex tasks',
        howToSpot:
          'Look for time claims in onboarding, checkout, or feature descriptions that seem too fast for the actual process',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single Point Estimates',
        description:
          'Delivery dates, completion times, or ETAs shown as single values rather than ranges',
        howToSpot:
          'Check shipping estimates, project timelines, and processing indicators for single-date commitments with no range or confidence level',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Historical Reference',
        description:
          'Estimation inputs that allow users to enter time estimates without any historical context or comparison',
        howToSpot:
          'Look for time/effort input fields in project management tools, goal-setting, or planning interfaces that provide no baseline data',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Deceptive Progress Indicators',
        description:
          'Progress bars that front-load visual progress or show time estimates that don\'t update accurately',
        howToSpot:
          'Watch for progress bars that race to 80-90% quickly then stall, or "time remaining" counters that increase rather than decrease',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No Buffer Communication',
        description:
          'Deadlines, milestones, or delivery promises with no built-in buffer or contingency acknowledgment',
        howToSpot:
          'Look for project timelines, sprint plans, or delivery commitments that assume everything goes perfectly with no slack time',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Optimistic Default Pattern',
        description: 'System defaults and suggested values that reflect best-case rather than typical-case scenarios',
        indicators: ['Default task durations set to minimum possible time', 'Sprint capacity defaulting to maximum rather than historical average', 'Onboarding time claims based on fastest users rather than median', 'Delivery estimates using best-case logistics rather than average'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Reference Class Pattern',
        description: 'Estimation interfaces that don\'t surface historical performance data for similar tasks',
        indicators: ['Empty time estimate fields with no suggested values', 'No historical velocity or throughput data visible during planning', 'Goal-setting without showing completion rates for similar goals', 'Budget estimation without historical cost data for comparable projects'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'False Precision Pattern',
        description: 'Showing exact times or dates when uncertainty is high, creating false confidence in estimates',
        indicators: ['Exact delivery dates for long-lead items', '"3 hours 22 minutes remaining" on unpredictable processes', 'Precise completion percentages for multi-step workflows with variable steps', 'Single-number project estimates without confidence intervals'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Buffer Erasure Pattern',
        description: 'Interfaces that remove or hide contingency time, encouraging users to plan without safety margins',
        indicators: ['Gantt charts with no slack time between dependent tasks', 'Sprint planning that fills 100% of available capacity', 'Calendar scheduling with back-to-back bookings and no transition time', 'Project timelines where every milestone is on the critical path'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are time estimates shown as single points or ranges with confidence levels?',
      'Does the interface surface historical data when users make time or effort estimates?',
      'Are onboarding or setup time claims based on median user experience or best-case?',
      'Do progress indicators honestly represent actual completion status?',
      'Is there buffer or contingency time built into timelines and deadlines?',
      'Are delivery estimates based on historical fulfillment data or optimistic projections?',
      'Does the tool show users their personal estimation accuracy over time?',
      'Are sprint/capacity plans compared against historical velocity?',
      'Do project management views differentiate between estimated and actual durations?',
      'Is there a mechanism to learn from past estimation errors and improve future estimates?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the planning fallacy.

Analyze the provided design for planning fallacy patterns. Identify:

1. **Time Estimates**: How time, duration, and deadlines are communicated to users
2. **Progress Indicators**: Whether progress bars, ETAs, and completion percentages are honest
3. **Historical References**: Whether users have access to base-rate data when making estimates
4. **Buffer Communication**: Whether timelines include contingency and uncertainty acknowledgment
5. **Estimation Interfaces**: How tools help or hinder realistic time estimation

For each pattern found:
- Identify whether the design enables or mitigates the planning fallacy
- Assess whether time estimates are based on inside view (optimistic) or outside view (historical)
- Determine if users have access to reference class data
- Evaluate whether progress indicators honestly represent actual status
- Suggest improvements for realistic time communication

Consider:
- Are time promises realistic based on historical data?
- Do estimation tools surface historical accuracy metrics?
- Are delivery estimates using ranges with confidence levels?
- Do progress indicators honestly represent completion status?
- Is there a feedback loop that helps users improve estimation accuracy over time?

Provide actionable recommendations for honest, trust-building time communication.`,

    outputSchema: {
      type: 'object',
      properties: {
        planningPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              estimationType: { type: 'string' },
              viewType: { type: 'string' },
              historicalReference: { type: 'boolean' },
              bufferIncluded: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'estimationType',
              'viewType',
              'historicalReference',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            estimationAccuracy: { type: 'number' },
            historicalDataUsage: { type: 'number' },
            bufferAdequacy: { type: 'number' },
            trustworthinessScore: { type: 'number' },
          },
          required: [
            'estimationAccuracy',
            'historicalDataUsage',
            'bufferAdequacy',
            'trustworthinessScore',
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
        'planningPatterns',
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
        title: 'Collect Historical Data',
        description:
          'Instrument your product to track actual task durations, delivery times, and completion rates alongside original estimates',
        example:
          'Log every task estimate alongside actual completion time; after 3 months you have a reliable estimation accuracy multiplier',
        tips: [
          'Track both user estimates and actual durations automatically',
          'Segment data by task type, complexity, and user for more accurate reference classes',
          'Store estimation history per user to calculate personal accuracy metrics',
        ],
      },
      {
        step: 2,
        title: 'Surface Reference Class Data',
        description:
          'Show historical performance data at the point where users make estimates, enabling outside-view thinking',
        example:
          'When a user enters "2 hours" for an API integration task, show: "Similar tasks averaged 6.4 hours. Your personal multiplier: 2.8x"',
        tips: [
          'Show data at the moment of estimation, not after the fact',
          'Use the user\'s own history when possible; it\'s more persuasive than generic averages',
          'Present data as helpful context, not a judgment of the user\'s abilities',
        ],
      },
      {
        step: 3,
        title: 'Use Ranges Instead of Point Estimates',
        description:
          'Replace single-value estimates with ranges that communicate uncertainty honestly',
        example:
          'Show "Delivery: March 15-19 (95% confidence)" instead of "Arrives March 16"',
        tips: [
          'Include a confidence level to make ranges feel precise rather than vague',
          'Show best case, most likely, and latest expected within the range',
          'Update ranges in real time as more information becomes available',
        ],
      },
      {
        step: 4,
        title: 'Build in Buffers Transparently',
        description:
          'Add appropriate buffer time to estimates and communicate why buffers exist',
        example:
          'Sprint planning tool: "Recommended capacity: 80% of historical velocity to account for interruptions, meetings, and unexpected issues"',
        tips: [
          'Make buffers visible rather than hidden so users understand the reasoning',
          'Base buffer size on historical variance, not arbitrary padding',
          'Allow users to adjust buffer size but show the risk of reducing it',
        ],
      },
      {
        step: 5,
        title: 'Create Feedback Loops',
        description:
          'After tasks complete, show users how their estimates compared to reality, building self-awareness over time',
        example:
          'Sprint retrospective view: "This sprint: 8 stories estimated at 34 points, completed in 52 points of effort. Your accuracy: 65%"',
        tips: [
          'Show estimation accuracy trends over time, not just per-task',
          'Celebrate improvement in accuracy, not just speed',
          'Make the feedback non-judgmental and focused on learning',
        ],
      },
    ],

    dos: [
      'Show historical performance data at the point of estimation',
      'Use date ranges with confidence levels instead of single-date promises',
      'Track and display users\' personal estimation accuracy over time',
      'Build buffer time into estimates based on historical variance',
      'Show team velocity during sprint planning to prevent overcommitment',
      'Use honest progress indicators that reflect actual completion status',
      'Communicate delivery estimates conservatively to enable positive surprises',
      'Create feedback loops that help users learn from estimation errors',
    ],

    donts: [
      'Don\'t promise "instant" or "quick" setup for complex processes',
      'Don\'t show single-point delivery dates when uncertainty is high',
      'Don\'t let users set time estimates without historical reference data',
      'Don\'t use progress bars that front-load visual progress deceptively',
      'Don\'t plan at 100% capacity; leave room for the unexpected',
      'Don\'t hide buffer time; be transparent about why estimates include padding',
      'Don\'t show "time remaining" counters that increase rather than decrease',
      'Don\'t penalize teams for realistic estimates by calling them "slow"',
    ],

    bestPractices: [
      {
        title: 'Reference Class Forecasting',
        description:
          'Always show how similar tasks, projects, or deliveries actually performed in the past',
        rationale:
          'The single most effective debiasing technique for planning fallacy is forcing an outside view through historical comparison',
        example:
          'Sprint planning: "Your team\'s average velocity is 29 points. You\'re planning 47. Historically, you\'ve never completed more than 33."',
      },
      {
        title: 'Under-Promise, Over-Deliver',
        description:
          'Set estimates at the conservative end of realistic ranges, creating positive surprise when things go well',
        rationale:
          'Delivering early builds more trust than promising fast and delivering late, even if the actual delivery date is the same',
        example:
          'Show "Arrives March 15-19" when you expect March 17. Delivering on March 16 feels like a win; missing March 14 (if promised) feels like failure.',
      },
      {
        title: 'Personal Accuracy Tracking',
        description:
          'Show each user their historical estimation accuracy multiplier and trend over time',
        rationale:
          'People are more likely to adjust behavior when confronted with their own data than with generic statistics',
        example:
          'Dashboard widget: "Your estimation accuracy this month: 1.4x (improving from 2.1x three months ago)"',
      },
      {
        title: 'Honest Progress Communication',
        description:
          'Use progress indicators that honestly represent completion status, even when progress is slow or unpredictable',
        rationale:
          'Deceptive progress indicators erode trust in all future estimates from your product',
        example:
          'For variable-time processes, show elapsed time + "typically takes 2-5 minutes" instead of a fake percentage bar',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure time estimates and progress information are programmatically determinable',
        implementation:
          'Use ARIA roles and properties to convey progress bar status, time estimates, and deadline warnings to assistive technologies',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to convey estimation confidence or deadline risk',
        implementation:
          'Combine color-coded timelines with text labels, icons, and patterns so color-blind users can distinguish estimation confidence levels',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Ensure progress updates and time estimate changes are announced to screen readers',
        implementation:
          'Use aria-live regions for dynamic progress updates and time estimate changes so screen reader users receive real-time feedback',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Optimism for Conversion',
        severity: 'critical',
        explanation:
          'Deliberately promising unrealistic timeframes ("5-minute setup," "ships tomorrow") to drive signups or purchases when historical data shows these claims are false',
        mitigation:
          'Base all time claims on actual user data (median, not best-case). Show ranges. If 5% of users finish in 5 minutes but the median is 25 minutes, say "15-30 minutes for most users."',
      },
      {
        concern: 'Deceptive Progress Indicators',
        severity: 'high',
        explanation:
          'Using progress bars that front-load visual progress to make waits feel shorter, training users to distrust all progress indicators',
        mitigation:
          'Make progress indicators proportional to actual progress. For unpredictable processes, use indeterminate indicators with elapsed time rather than fake percentages.',
      },
      {
        concern: 'Planning Pressure on Teams',
        severity: 'high',
        explanation:
          'Tools that default to optimistic estimates or make realistic estimates feel like underperformance, creating pressure to overcommit',
        mitigation:
          'Default capacity to historical average, not maximum. Celebrate estimation accuracy alongside delivery speed. Never penalize teams for honest estimates.',
      },
      {
        concern: 'Crowdfunding Timeline Manipulation',
        severity: 'critical',
        explanation:
          'Platforms allowing creators to set optimistic delivery dates without surfacing historical on-time delivery rates for similar projects',
        mitigation:
          'Require platforms to show historical delivery accuracy for the project category. Display creator track record. Show base-rate delivery data alongside creator estimates.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Intuitive Prediction: Biases and Corrective Procedures',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1979,
        description:
          'Foundational paper describing the planning fallacy and proposing reference class forecasting as a corrective',
        type: 'foundational',
      },
      {
        title: 'Exploring the "Planning Fallacy": Why People Underestimate Their Task Completion Times',
        author: 'Buehler, R., Griffin, D., & Ross, M.',
        year: 1994,
        doi: '10.1037/0022-3514.67.3.366',
        description:
          'Landmark empirical study demonstrating the planning fallacy across multiple domains, showing people focus on plan-based scenarios rather than past experiences',
        type: 'foundational',
      },
      {
        title: 'Inside the Planning Fallacy: The Causes and Consequences of Optimistic Time Predictions',
        author: 'Buehler, R., Griffin, D., & Ross, M.',
        year: 2002,
        description:
          'Comprehensive review of planning fallacy mechanisms including focalism, scenario thinking, and motivated reasoning',
        type: 'advanced',
      },
      {
        title: 'Reference Class Forecasting and Human Judgment',
        author: 'Flyvbjerg, B.',
        year: 2008,
        description:
          'Practical application of reference class forecasting to large infrastructure projects, demonstrating its effectiveness in correcting planning fallacy',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive treatment of the planning fallacy, including the inside view vs outside view framework and reference class forecasting',
        type: 'foundational',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136716',
        description:
          'How the best forecasters overcome planning fallacy and other biases through reference class thinking and calibrated uncertainty',
        type: 'practical',
      },
      {
        title: 'How Big Things Get Done',
        author: 'Flyvbjerg, Bent, & Gardner, Dan',
        year: 2023,
        isbn: '9780593239513',
        description:
          'Data-driven analysis of why projects go over budget and time, with practical strategies for reference class forecasting',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Planning Fallacy in UX: Why Projects Take Longer Than Expected',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/planning-fallacy/',
        description:
          'Practical guide to recognizing and mitigating planning fallacy in UX design projects and product timelines',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Planning Fallacy: Why We Underestimate How Long Things Take',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=EHIBmFNnFoA',
        description:
          'Accessible explanation of the planning fallacy with real-world examples and debiasing strategies',
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
      'optimism-bias',       // General optimism amplifies planning-specific optimism
      'anchoring-bias',      // Initial estimates anchor subsequent adjustments
      'sunk-cost-fallacy',   // Once invested in a timeline, reluctant to revise upward
      'commitment-bias',     // Public commitments to deadlines resist correction
    ],

    conflicts: [
      'pessimism-bias',      // Pessimists may overestimate, counteracting the fallacy
    ],

    confusedWith: [
      'optimism-bias',       // Planning fallacy is specifically about task estimation; optimism bias is broader
      'dunning-kruger-effect', // Overconfidence in abilities vs overconfidence in timelines
      'anchoring-bias',      // Initial estimates anchor, but planning fallacy is about systematic under-estimation specifically
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'scope-creep',
        'temporal-discounting',
      ],
    },
  },
};
