/**
 * TEMPORAL DISCOUNTING
 *
 * We discount future rewards hyperbolically
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const temporalDiscounting: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'temporal-discounting',
    name: 'Temporal Discounting',
    aliases: ['Hyperbolic Discounting', 'Present Bias', 'Delay Discounting'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.EMOTIONAL,
    ],
    tags: [
      'decision-making',
      'reward-timing',
      'delayed-gratification',
      'future-value',
      'impulsivity',
      'savings',
      'long-term-planning',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We discount future rewards hyperbolically',

    detailed: `Temporal discounting is the tendency for people to value immediate rewards more highly than future rewards, even when the future reward is objectively larger. The subjective value of a reward decreases as a function of the delay to its receipt, following a hyperbolic rather than exponential curve. This means small immediate rewards are often preferred over substantially larger delayed rewards.

This bias has profound implications for product and UX design. Users consistently undervalue future benefits—whether that's long-term health, financial growth, or skill development—in favor of immediate gratification. Interfaces that only communicate delayed payoffs struggle to motivate action, while those that bridge the temporal gap with immediate feedback, micro-rewards, and vivid future projections drive sustained engagement.

Designers must balance leveraging temporal discounting to motivate healthy behaviors (saving, exercising, learning) with the ethical obligation not to exploit present bias to push impulsive purchases, subscriptions, or addictive usage patterns.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain evaluates future rewards through a temporal lens that systematically devalues delayed outcomes. This happens because:

1. **Hyperbolic Decay**: Subjective value drops steeply for short delays but flattens for longer ones—waiting 1 day feels much worse than the difference between waiting 30 vs 31 days
2. **Uncertainty Weighting**: The brain treats future rewards as less certain; delay introduces perceived risk of non-delivery
3. **Visceral Influence**: Immediate rewards activate dopaminergic circuits in the limbic system, while future rewards engage the prefrontal cortex—emotion often wins over calculation
4. **Temporal Construal**: Near-future events are processed concretely (how), while distant events are processed abstractly (why), making immediate rewards feel more tangible
5. **Opportunity Cost Neglect**: People focus on what they gain now rather than what they forfeit later, because future losses feel abstract

The mechanism is pervasive and largely automatic—even when people intellectually understand that waiting yields a better outcome, the pull of immediacy often overrides rational calculation.`,
    },

    realWorldExample: `In the classic "marshmallow experiment" by Walter Mischel, children were offered one marshmallow now or two marshmallows if they waited 15 minutes. Most children struggled to wait, despite the reward being objectively doubled. Adults exhibit the same pattern: studies show people prefer $100 today over $120 in a month, even though that represents a 240% annualized return—far better than any investment. This is why retirement savings are chronically underfunded: the pleasure of spending today consistently outweighs the abstract security of a comfortable retirement decades away.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Temporal discounting profoundly affects how users evaluate products, commit to goals, and sustain engagement over time. Users systematically undervalue future benefits and overvalue immediate ones. Designers can leverage this to:

- Bridge the temporal gap by making future outcomes feel vivid and immediate
- Provide micro-rewards and instant feedback for long-term goal behaviors
- Visualize compound growth and future value projections to counteract discounting
- Structure reward timing to maintain motivation through delayed-payoff journeys
- Frame delayed benefits in present-tense language that reduces perceived distance`,

    whenToUse: [
      {
        title: 'Future Value Projection',
        scenario:
          'When communicating long-term benefits of savings, investments, or subscriptions',
        example:
          'Show "In 5 years, your $50/month becomes $3,600 + $420 in returns" with a visual growth chart',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Micro-Rewards for Long-Term Goals',
        scenario: 'When users are working toward goals that take weeks or months to achieve',
        example:
          'Award badges, streaks, and progress celebrations for daily exercise—making the immediate experience rewarding even though fitness gains take months',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Immediate Feedback Loops',
        scenario: 'When the primary benefit of an action is delayed',
        example:
          'After a user contributes to their retirement fund, immediately show an animation of their "future self" lifestyle improving',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Commitment Devices',
        scenario: 'When helping users stick to beneficial long-term decisions',
        example:
          'Allow users to pre-commit to savings increases or healthy choices before the temptation of immediate spending arrives',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Before/After Visualization',
        scenario: 'When the outcome of sustained effort is hard to imagine',
        example:
          'Fitness app showing AI-projected body composition after 3, 6, and 12 months of following the program',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Impulse Purchase Exploitation',
        reason:
          'Using present bias to pressure users into purchases they would regret later',
        consequence:
          'Buyer remorse, refund requests, lost trust, and potential regulatory issues',
        alternative:
          'Provide cooling-off periods, wishlists, and "save for later" options for significant purchases',
      },
      {
        title: 'Subscription Traps',
        reason:
          'Offering extreme immediate discounts that lock users into long-term commitments they will regret',
        consequence:
          'High churn, negative reviews, and customer service burden',
        alternative:
          'Clearly communicate total commitment cost and provide easy cancellation',
      },
      {
        title: 'Addictive Engagement Loops',
        reason:
          'Designing variable-ratio micro-rewards that exploit present bias to create compulsive usage',
        consequence:
          'User burnout, negative press, regulatory scrutiny, long-term brand damage',
        alternative:
          'Design reward schedules that support genuine user goals, with natural stopping points',
      },
      {
        title: 'Downplaying Future Costs',
        reason:
          'Hiding or minimizing future costs (interest, fees, penalties) behind immediate benefits',
        consequence:
          'Financial harm to users, legal liability, destroyed trust',
        alternative:
          'Present future costs as vividly as immediate benefits—use projections and calculators',
      },
    ],

    commonMistakes: [
      {
        title: 'Only Showing Long-Term Benefits',
        description:
          'Pitching a product or feature entirely on benefits that arrive weeks or months later',
        why: 'Users heavily discount distant rewards; a benefit "in 6 months" may as well not exist for motivational purposes',
        fix: 'Pair every long-term benefit with an immediate reward, feedback, or tangible progress marker',
      },
      {
        title: 'Abstract Future Promises',
        description:
          'Describing future value in vague terms like "you will feel healthier" or "your wealth will grow"',
        why: 'Abstract framing increases temporal distance, making the benefit feel even more discounted',
        fix: 'Use concrete numbers, vivid imagery, and personal projections: "You, 30 lbs lighter, running a 5K on June 15"',
      },
      {
        title: 'Front-Loading All Rewards',
        description:
          'Giving all rewards at signup and nothing during the sustained-effort phase',
        why: 'Once the initial reward is consumed, there is no immediate incentive to continue',
        fix: 'Distribute rewards across the entire journey: onboarding bonus, weekly milestones, monthly celebrations',
      },
      {
        title: 'Ignoring the Hyperbolic Curve',
        description:
          'Spacing rewards linearly when perceived value drops hyperbolically',
        why: 'The biggest motivational gap is in the early phase; linear spacing leaves users most unsupported when they need it most',
        fix: 'Front-weight reward frequency (daily early on, weekly later) to match the hyperbolic discounting curve',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether future value projections and progress indicators are visible and prominent',
        examples: [
          'Above-the-fold placement of future value projections increases engagement with long-term benefits',
          'Progress bars and milestone trackers keep delayed rewards visually present',
          'Side-by-side "now vs future" layouts bridge the temporal gap',
          'Persistent goal widgets remind users of long-term objectives during daily interactions',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis and sizing affect how immediate vs future benefits are perceived',
        examples: [
          'Large, bold future value numbers ("$47,000 in 10 years") make distant rewards feel tangible',
          'Present-tense language ("You are building wealth") reduces temporal distance',
          'Countdown timers and date formatting affect perceived waiting time',
          'Small print for future costs exploits present bias unethically',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals reward immediacy and creates emotional bridges to future outcomes',
        examples: [
          'Green growth indicators make future gains feel positive and achievable',
          'Warm colors for immediate rewards, cool colors for future milestones create temporal coding',
          'Progress fill colors that shift from red to green as goals approach completion',
          'Animated color transitions on deposits or contributions create instant positive feedback',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines how immediate and rewarding each step toward a long-term goal feels',
        examples: [
          'Micro-animations on savings contributions provide instant dopamine feedback',
          'Slider interactions that show real-time future value changes make projections tangible',
          'Streak mechanics give daily immediate rewards for long-term habit building',
          'Haptic feedback on goal-advancing actions creates sensory immediacy',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether future benefits feel abstract and distant or vivid and imminent',
        examples: [
          '"In 5 years, this will be worth $12,000" is more motivating than "long-term value"',
          'Personal future projections ("Your retirement at 65") beat generic statistics',
          'Storytelling about future selves bridges the empathy gap with future outcomes',
          'Concrete milestones ("By March, you will have...") beat open-ended promises',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design ensures that temporal motivation techniques work for all users',
        examples: [
          'Screen reader announcements for progress milestones provide non-visual micro-rewards',
          'Keyboard-accessible sliders for future value projections ensure everyone can explore',
          'Alt text on growth charts communicates future value to non-visual users',
          'Clear, non-metaphorical language about time and value helps users with cognitive disabilities',
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
        title: 'Future Value Projection with Compound Growth',
        description:
          'Savings app showing concrete future value of current contributions',
        code: `<div class="savings-projection">
  <h3>Your $200/month is building something big</h3>
  <div class="timeline">
    <div class="milestone now">
      <span class="date">Today</span>
      <span class="value">$200</span>
      <p>First deposit</p>
    </div>
    <div class="milestone">
      <span class="date">1 year</span>
      <span class="value">$2,460</span>
      <p>Emergency fund covered</p>
    </div>
    <div class="milestone">
      <span class="date">5 years</span>
      <span class="value highlight">$13,800</span>
      <p>Down payment ready</p>
    </div>
    <div class="milestone">
      <span class="date">10 years</span>
      <span class="value highlight-large">$31,200</span>
      <p>Financial freedom</p>
    </div>
  </div>
  <div class="growth-chart" role="img" aria-label="Compound growth curve showing $200/month reaching $31,200 in 10 years">
    <!-- SVG growth visualization -->
  </div>
  <p class="micro-reward">You just moved $200 closer to your dream home</p>
</div>`,
        explanation:
          'By showing concrete future values at specific milestones, the distant reward becomes vivid and tangible. The "micro-reward" message at the bottom provides immediate positive feedback for the deposit action, bridging the gap between now and the long-term payoff.',
        principle:
          'Make future value concrete and pair every long-term action with immediate feedback',
        metrics: {
          before: '23% completed monthly savings goals with generic "save for the future" messaging',
          after: '51% completed monthly savings goals with projected future value timeline',
          improvement: '122% increase in savings goal completion',
        },
      },
      {
        title: 'Micro-Rewards for Daily Health Actions',
        description:
          'Fitness app providing immediate rewards for behaviors with delayed health benefits',
        code: `<div class="daily-workout-complete">
  <div class="celebration-animation">
    <!-- Confetti burst animation -->
  </div>
  <h2>Workout complete!</h2>

  <div class="immediate-rewards">
    <div class="reward streak">
      <span class="icon">🔥</span>
      <span class="label">12-day streak!</span>
    </div>
    <div class="reward calories">
      <span class="icon">⚡</span>
      <span class="value">340 cal burned</span>
    </div>
    <div class="reward xp">
      <span class="icon">⭐</span>
      <span class="value">+50 XP — Level 7</span>
    </div>
  </div>

  <div class="future-projection">
    <h4>At this pace, by June 15:</h4>
    <div class="projection-stats">
      <span>Body fat: 22% → <strong>18%</strong></span>
      <span>Strength: +15% projected</span>
    </div>
    <img src="projected-progress.jpg" alt="Your projected physique in 3 months based on current training rate">
  </div>
</div>`,
        explanation:
          'The celebration, streak, XP, and calorie count all provide instant gratification. The future projection section bridges to the long-term benefit by making it personal and specific ("by June 15") rather than abstract ("eventually you will be fitter").',
        principle:
          'Layer immediate micro-rewards on top of vivid, personalized future projections',
      },
      {
        title: 'Retirement Calculator with Future Self',
        description:
          'Financial planning tool that makes retirement feel real and immediate',
        code: `<div class="retirement-planner">
  <h3>Meet Future You at 65</h3>

  <div class="future-self-card">
    <img src="aged-avatar.jpg" alt="AI-aged photo of you at 65">
    <div class="lifestyle-preview">
      <p class="scenario current">At current savings: <strong>$1,200/month income</strong></p>
      <p class="scenario projected">With +$100/month more: <strong>$2,100/month income</strong></p>
    </div>
  </div>

  <div class="slider-control">
    <label>Add to monthly savings:</label>
    <input type="range" min="0" max="500" value="100"
           aria-label="Additional monthly savings amount">
    <output>$100/month</output>
  </div>

  <div class="impact-immediate">
    <p>That's just <strong>$3.33/day</strong> — less than a coffee</p>
  </div>

  <button class="primary">Start Saving $100 More Today</button>
</div>`,
        explanation:
          'The AI-aged photo creates an emotional bridge to your future self, countering the tendency to treat "future you" as a stranger. The real-time slider shows immediate cause-and-effect. Reframing $100/month as $3.33/day makes the present cost feel trivial compared to the future gain.',
        principle:
          'Bridge the empathy gap with your future self through vivid personalization and present-cost minimization',
        metrics: {
          before: '8% increased retirement contributions after viewing standard projection tables',
          after: '31% increased contributions after interacting with future-self visualization',
          improvement: '287% increase in retirement savings action',
        },
      },
    ],

    bad: [
      {
        title: 'Distant Reward with No Immediate Payoff',
        description:
          'Savings app that only shows long-term benefits without any immediate feedback',
        code: `<!-- DON'T DO THIS -->
<div class="savings-pitch">
  <h2>Start Saving Today</h2>
  <p>Build wealth over time. Your future self will thank you.</p>
  <p>In 30 years, consistent saving can lead to a comfortable retirement.</p>
  <button>Open Savings Account</button>
</div>`,
        explanation:
          'This design relies entirely on abstract, distant benefits ("30 years," "comfortable retirement") with zero immediate reward or tangible feedback. The language is vague, the timeline is overwhelming, and there is nothing to counteract the strong pull of spending money today instead.',
        principle:
          'Never rely solely on distant, abstract benefits—the present bias will always win',
      },
      {
        title: 'Exploiting Present Bias for Impulse Purchases',
        description:
          'E-commerce site using countdown timers and urgency to override rational delay',
        code: `<!-- DON'T DO THIS -->
<div class="flash-sale">
  <h2 style="color: red;">FLASH SALE ENDING IN 00:03:47!</h2>
  <p style="font-size: 2em;">80% OFF — BUY NOW!</p>
  <p>You'll NEVER see this price again!</p>
  <p style="color: #999; font-size: 0.7em;">No returns. No refunds.</p>
  <button class="urgent pulse-animation">BUY NOW BEFORE IT'S GONE!</button>
</div>`,
        explanation:
          'This design weaponizes temporal discounting by creating artificial urgency. The countdown timer, irreversibility claim, and pulsing button all exploit the brain\'s bias toward immediate action. The no-refund policy buried in small text compounds the harm.',
        principle:
          'Never exploit present bias to pressure users into decisions they cannot reverse',
      },
      {
        title: 'Vague Future Promise with No Path',
        description:
          'Learning platform promising career transformation with no milestones',
        code: `<!-- DON'T DO THIS -->
<div class="course-landing">
  <h2>Transform Your Career</h2>
  <p>Our 12-month program will change your life forever.</p>
  <p>Graduates earn an average of $40,000 more per year.</p>
  <div class="price">
    <span class="monthly">$199/month</span>
    <span class="duration">for 12 months</span>
  </div>
  <button>Enroll Now</button>
</div>`,
        explanation:
          'The user is asked to pay $199/month now for a benefit that is 12 months away and described in purely abstract terms. There are no intermediate milestones, no early wins, no progress indicators, and no immediate value. The temporal distance makes the promise feel hollow.',
        principle:
          'Delayed benefits without intermediate rewards and concrete milestones will fail to motivate sustained engagement',
      },
    ],

    realWorld: [
      {
        company: 'Fidelity',
        product: 'Retirement Score & Future Self Tool',
        url: 'https://www.fidelity.com/planning-and-advice/tools/retirement-score',
        description: 'Fidelity uses an AI-aged photo tool that shows users what they will look like at retirement age, alongside projected income scenarios. By creating an emotional connection with your future self, the abstract concept of "retirement savings" becomes visceral and personal.',
        effectiveness: 'very-effective',
        analysis: 'Research by Hal Hershfield showed that seeing an aged version of yourself increases savings behavior by making the future self feel like a real person rather than a stranger. Fidelity adopted this finding to bridge the temporal discounting gap.',
      },
      {
        company: 'Peloton',
        product: 'Workout Milestones & Streaks',
        url: 'https://www.onepeloton.com',
        description: 'Peloton provides immediate celebratory animations, instructor shoutouts, streak badges, and leaderboard positions after every workout. These instant rewards keep users motivated even though the real fitness benefits take weeks or months to materialize.',
        effectiveness: 'very-effective',
        analysis: 'By layering multiple micro-reward systems (social recognition, streaks, badges, XP) on top of the delayed health benefit, Peloton effectively counteracts temporal discounting. Users feel rewarded immediately while building toward long-term fitness.',
      },
      {
        company: 'Acorns',
        product: 'Round-Ups & Potential Growth',
        url: 'https://www.acorns.com',
        description: 'Acorns rounds up everyday purchases and invests the spare change, then shows projected portfolio growth over 5, 10, and 20 years. The round-up mechanic makes saving feel painless (tiny present cost), while the growth projections make the future benefit feel concrete.',
        effectiveness: 'very-effective',
        analysis: 'Acorns addresses temporal discounting on both sides: it minimizes the perceived present cost (spare change feels insignificant) and maximizes the perceived future benefit (compound growth visualizations). The combination is highly effective for a demographic that typically undervalues long-term saving.',
      },
      {
        company: 'Duolingo',
        product: 'Streak & XP System',
        url: 'https://www.duolingo.com',
        description: 'Duolingo provides XP, streaks, league rankings, and celebratory animations after every lesson. Language fluency takes months or years, but every 5-minute session feels immediately rewarding through gamification.',
        effectiveness: 'effective',
        analysis: 'Duolingo is a textbook example of using micro-rewards to sustain engagement toward a heavily discounted future benefit (fluency). The streak mechanic adds loss aversion on top of temporal discounting, further motivating daily engagement.',
      },
    ],

    abTests: [
      {
        title: 'Savings App: Abstract vs Concrete Future Value',
        hypothesis:
          'Showing concrete future dollar amounts with personalized milestones will increase savings contributions compared to generic messaging',
        controlVersion: {
          description:
            'Savings screen with generic message: "Save for your future. Every dollar counts toward a better tomorrow."',
          metrics: {
            conversionRate: '14%',
            averageDeposit: '$85',
            retentionRate30d: '31%',
          },
        },
        treatmentVersion: {
          description:
            'Savings screen showing personalized timeline: "Your $85/month becomes $1,050 by December, $5,400 in 5 years. That\'s a family vacation + emergency fund."',
          metrics: {
            conversionRate: '28%',
            averageDeposit: '$112',
            retentionRate30d: '54%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Concrete future projections doubled the deposit conversion rate and increased average deposit by 32%. Most notably, 30-day retention improved by 74%, suggesting that vivid future value sustains motivation beyond the initial action.',
          learnings: [
            'Specific dollar amounts at specific dates dramatically reduce temporal discounting',
            'Translating savings into tangible outcomes (vacation, emergency fund) creates emotional bridges',
            'Personalized projections outperform generic encouragement by 2-3x',
            'The retention effect suggests concrete goals also reduce the "what am I even saving for" dropout',
          ],
        },
      },
      {
        title: 'Fitness App: Long-Term Promise vs Micro-Reward System',
        hypothesis:
          'Adding immediate micro-rewards (streaks, XP, badges) will improve workout consistency compared to showing only long-term health benefits',
        controlVersion: {
          description:
            'Post-workout screen showing: "Great workout! Keep it up and you will see results in 8-12 weeks."',
          metrics: {
            weeklyActiveRate: '34%',
            averageWorkoutsPerWeek: '1.8',
            retentionRate60d: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Post-workout screen with streak counter, XP bar leveling up, badge unlock animation, plus projected body composition at 3 months based on current pace.',
          metrics: {
            weeklyActiveRate: '61%',
            averageWorkoutsPerWeek: '3.4',
            retentionRate60d: '48%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Micro-rewards nearly doubled weekly active rate and workout frequency. 60-day retention more than doubled, confirming that immediate gratification layered on delayed benefits sustains long-term engagement far better than delayed benefits alone.',
          learnings: [
            'Micro-rewards are not a distraction from the real benefit—they are the bridge to it',
            'Streaks specifically leverage loss aversion on top of temporal discounting',
            'Combining immediate rewards with future projections is more effective than either alone',
            'Users who engaged with the future projection feature had even higher retention (+18% vs micro-rewards only)',
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
        name: 'Future Value Projections',
        description:
          'Charts, timelines, or numbers showing projected future value of current actions',
        howToSpot:
          'Look for growth curves, compound interest charts, projected outcomes, or "in X years" messaging',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Micro-Reward Systems',
        description:
          'Streaks, badges, XP, points, or celebratory animations for completing incremental actions',
        howToSpot:
          'Look for gamification elements, progress bars, level indicators, or achievement systems layered on top of long-term goal activities',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Countdown or Urgency Indicators',
        description:
          'Timers, scarcity messaging, or "limited time" labels designed to trigger immediate action',
        howToSpot:
          'Look for countdown clocks, flashing text, "only X left" badges, or pulsing CTA buttons',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Before/After Visualizations',
        description:
          'Side-by-side comparisons showing current state vs projected future state',
        howToSpot:
          'Look for slider comparisons, aged photos, projected body images, or portfolio growth scenarios',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Present-Cost Minimization',
        description:
          'Reframing costs into tiny daily amounts to make present sacrifice feel trivial',
        howToSpot:
          'Look for "just $X/day" or "less than a coffee" framing instead of monthly or annual totals',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Delayed Benefit Without Immediate Reward',
        description: 'Interface that asks for user effort or money now but only promises benefits in the distant future with no intermediate payoff',
        indicators: ['No progress indicators or milestones', 'Benefits described only in long timeframes', 'No celebration or feedback after actions', 'Abstract future language without concrete markers'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Temporal Bridging Pattern',
        description: 'Design that connects present actions to future outcomes through vivid visualization and immediate feedback',
        indicators: ['Future value calculators or projections', 'Real-time sliders showing outcome changes', 'Micro-rewards layered on long-term activities', 'Personal timeline with concrete milestones'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Urgency Exploitation Pattern',
        description: 'Using artificial time pressure to exploit present bias and override deliberate decision-making',
        indicators: ['Countdown timers on purchases', '"Act now" or "limited time" messaging', 'Disabling save-for-later options', 'Hiding cancellation or return policies'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Commitment Device Pattern',
        description: 'Helping users pre-commit to future beneficial actions before the temptation of immediate gratification arrives',
        indicators: ['Auto-escalation features for savings', 'Advance scheduling of healthy actions', 'Goal-setting with accountability', 'Pre-commitment pledges or contracts'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the design communicate both immediate and long-term benefits?',
      'Are future benefits presented with concrete numbers, dates, and personal relevance?',
      'Is there immediate positive feedback for actions with delayed payoffs?',
      'Are micro-rewards or progress markers present for long-term goal activities?',
      'Does the design exploit urgency or scarcity to override rational decision-making?',
      'Are future costs presented as vividly as future benefits?',
      'Is there a mechanism for users to pre-commit to beneficial future actions?',
      'Does the design help users bridge the empathy gap with their future selves?',
      'Are reward frequencies matched to the hyperbolic discounting curve (more frequent early on)?',
      'Is the design transparent about timelines and realistic about future outcomes?',
      'Does the design support both impulsive and deliberative decision-making appropriately?',
      'Are there ethical safeguards against exploiting present bias for harmful purchases?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in temporal discounting and present bias.

Analyze the provided design for temporal discounting patterns. Identify:

1. **Reward Timing**: How immediate vs delayed rewards are structured and communicated
2. **Future Value Communication**: Whether long-term benefits are made concrete and vivid or left abstract
3. **Micro-Reward Systems**: Whether immediate feedback bridges the gap to delayed outcomes
4. **Temporal Framing**: How time, cost, and benefit are framed (daily vs yearly, concrete vs abstract)
5. **Urgency Patterns**: Whether time pressure is used ethically to motivate or exploitatively to manipulate

For each pattern found:
- Identify whether it helps users overcome temporal discounting for beneficial goals
- Assess whether it exploits present bias for commercial gain at user expense
- Determine if the reward timing matches the hyperbolic discounting curve
- Evaluate whether future benefits are concrete enough to counteract discounting
- Suggest improvements for ethical, effective temporal design

Consider:
- Are long-term benefits only communicated abstractly?
- Is there immediate positive feedback for delayed-payoff actions?
- Does the design exploit urgency/scarcity to override deliberation?
- Are future costs as vivid as future benefits?
- Is the micro-reward system supporting genuine user goals?

Provide actionable recommendations for bridging the temporal gap ethically.`,

    outputSchema: {
      type: 'object',
      properties: {
        temporalPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              rewardTiming: { type: 'string' },
              futureValueClarity: { type: 'string' },
              immediacyBridge: { type: 'string' },
              potentialExploitation: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'rewardTiming',
              'futureValueClarity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            rewardTimingScore: { type: 'number' },
            futureValueConcreteness: { type: 'number' },
            microRewardEffectiveness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'rewardTimingScore',
            'futureValueConcreteness',
            'microRewardEffectiveness',
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
        'temporalPatterns',
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
        title: 'Map the Temporal Gap',
        description:
          'Identify where your product asks users to invest effort or money now for benefits that arrive later',
        example:
          'Savings app: user deposits $200 today, but the real payoff is financial security in 10+ years',
        tips: [
          'List every action where the reward is delayed by more than a few minutes',
          'Measure the temporal distance between action and primary benefit',
          'Identify where users currently drop off due to lack of immediate feedback',
        ],
      },
      {
        step: 2,
        title: 'Make Future Value Vivid and Concrete',
        description:
          'Transform abstract future benefits into specific, personalized projections with dates and numbers',
        example:
          'Instead of "save for retirement," show "By age 65, your $200/month becomes $142,000—enough for 8 years of travel"',
        tips: [
          'Use specific dollar amounts, dates, and personal milestones',
          'Visualize growth with interactive charts and sliders',
          'Connect future value to things the user cares about (travel, home, freedom)',
        ],
      },
      {
        step: 3,
        title: 'Layer Immediate Micro-Rewards',
        description:
          'Add instant positive feedback for every action that contributes to the long-term goal',
        example:
          'After a savings deposit: celebration animation + streak update + progress bar fill + "You are $200 closer to your dream home"',
        tips: [
          'Combine multiple reward signals (visual, numerical, social, emotional)',
          'Make rewards feel earned, not random',
          'Ensure micro-rewards reinforce the connection to the long-term goal',
        ],
      },
      {
        step: 4,
        title: 'Design Commitment Devices',
        description:
          'Help users pre-commit to beneficial future actions before the temptation to defect arrives',
        example:
          'Auto-escalation: "Increase your savings by $25/month every January" — committed in advance',
        tips: [
          'Offer opt-in auto-escalation for savings, contributions, or effort',
          'Allow users to set "future rules" they would agree to rationally but might break impulsively',
          'Provide social accountability (sharing goals with friends or coaches)',
        ],
      },
      {
        step: 5,
        title: 'Match Reward Frequency to the Discounting Curve',
        description:
          'Front-load reward frequency: more rewards early when discounting is steepest, tapering as habits form',
        example:
          'Week 1: daily celebration and tips. Week 2-4: every 3 days. Month 2+: weekly milestones',
        tips: [
          'The biggest motivational gap is in the first days—reward heavily',
          'Taper rewards as intrinsic motivation and habit strength increase',
          'Introduce new reward types over time to prevent habituation',
        ],
      },
    ],

    dos: [
      'Show concrete future value with specific numbers and dates',
      'Provide immediate positive feedback for every delayed-payoff action',
      'Use interactive projections (sliders, calculators) to make future outcomes tangible',
      'Personalize future scenarios to the individual user',
      'Frame present costs in small increments ("$3.33/day" vs "$100/month")',
      'Offer commitment devices and pre-commitment options',
      'Front-load reward frequency to match the steepest part of the discounting curve',
      'Connect micro-rewards explicitly to the long-term goal they support',
    ],

    donts: [
      'Don\'t rely solely on abstract, distant benefits to motivate action',
      'Don\'t exploit present bias with artificial urgency or scarcity for purchases',
      'Don\'t hide future costs behind immediate benefits',
      'Don\'t front-load all rewards at signup with nothing for sustained engagement',
      'Don\'t use countdown timers to override deliberate decision-making',
      'Don\'t promise unrealistic future outcomes to motivate present action',
      'Don\'t ignore the hyperbolic shape of discounting when spacing rewards linearly',
      'Don\'t design micro-rewards that feel manipulative or disconnected from real progress',
    ],

    bestPractices: [
      {
        title: 'Bridge the Empathy Gap with Future Self',
        description:
          'Help users feel emotional connection to their future selves through vivid visualization and personalization',
        rationale:
          'Research by Hershfield (2011) shows that people who feel connected to their future selves save more, exercise more, and make better long-term decisions',
        example:
          'AI-aged photo showing "you at 65" alongside retirement income scenarios based on current savings rate',
      },
      {
        title: 'Combine Immediate and Delayed Rewards',
        description:
          'Never present delayed benefits alone—always pair with an immediate reward signal',
        rationale:
          'Immediate rewards activate the limbic system, creating positive associations with the delayed-payoff behavior',
        example:
          'After a workout: celebration animation (immediate) + "At this pace, 5K-ready by April 12" (future projection)',
      },
      {
        title: 'Make Projections Interactive',
        description:
          'Let users manipulate variables and see future outcomes change in real time',
        rationale:
          'Interactive exploration creates agency and makes abstract projections feel concrete and personal',
        example:
          'Retirement slider: drag monthly contribution and watch projected income at 65 change instantly',
      },
      {
        title: 'Use Temporal Landmarks',
        description:
          'Anchor goals to meaningful dates (birthdays, new year, anniversaries) to create natural commitment points',
        rationale:
          'The "fresh start effect" (Dai et al., 2014) shows people are more motivated to pursue goals at temporal landmarks',
        example:
          '"Start your savings challenge on your birthday — 365 days to your first $5,000"',
      },
      {
        title: 'Front-Weight the Reward Schedule',
        description:
          'Provide more frequent rewards early and taper as habits solidify',
        rationale:
          'Hyperbolic discounting means the motivational gap is widest early on; heavy early reinforcement prevents dropout',
        example:
          'Day 1-7: daily rewards. Week 2-4: every 3 days. Month 2+: weekly milestones and monthly celebrations',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure progress, milestones, and micro-rewards are semantically communicated',
        implementation:
          'Use ARIA live regions for progress updates, proper heading structure for milestone sections, and semantic HTML for reward announcements so screen reader users receive micro-reward feedback',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to communicate progress or future value changes',
        implementation:
          'Combine color with text labels, icons, and numeric values for all progress indicators and growth visualizations',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Countdown timers and urgency indicators must be pausable or extendable',
        implementation:
          'If using time-limited offers, provide a mechanism to extend or pause the timer. Never use timing to prevent deliberate decision-making by users with disabilities.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Growth charts and future projections need comprehensive alt text',
        implementation:
          'Provide alt text that communicates the key data point (e.g., "Growth chart showing your $200/month reaching $31,200 in 10 years") rather than just "chart"',
      },
    ],

    ethics: [
      {
        concern: 'Urgency Exploitation',
        severity: 'critical',
        explanation:
          'Using artificial countdown timers and scarcity to exploit present bias, pressuring users into impulse purchases they would not make with deliberation',
        mitigation:
          'Only use urgency for genuinely time-limited events. Provide save-for-later options. Never combine urgency with no-refund policies.',
      },
      {
        concern: 'Addictive Micro-Reward Loops',
        severity: 'high',
        explanation:
          'Designing variable-ratio micro-reward schedules that create compulsive usage patterns, especially in vulnerable populations (children, people with addiction histories)',
        mitigation:
          'Ensure micro-rewards support genuine user goals. Include natural stopping points. Provide usage dashboards and optional limits.',
      },
      {
        concern: 'Unrealistic Future Projections',
        severity: 'high',
        explanation:
          'Showing overly optimistic future outcomes to motivate present action (e.g., unrealistic investment returns, exaggerated weight loss timelines)',
        mitigation:
          'Base all projections on realistic, evidence-based models. Show ranges rather than single-point estimates. Disclose assumptions clearly.',
      },
      {
        concern: 'Hiding Future Costs',
        severity: 'critical',
        explanation:
          'Emphasizing immediate benefits while burying future costs (interest, fees, penalties, commitment length) in fine print',
        mitigation:
          'Present future costs with equal visual prominence as immediate benefits. Use the same concrete, vivid framing for costs as for benefits.',
      },
      {
        concern: 'Subscription Lock-In',
        severity: 'medium',
        explanation:
          'Offering extreme introductory discounts that exploit present bias to lock users into long-term commitments they may regret',
        mitigation:
          'Clearly state the full-price commitment upfront. Provide easy cancellation. Send reminders before trial-to-paid transitions.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Note on Measurement of Utility',
        author: 'Samuelson, P. A.',
        year: 1937,
        description:
          'The foundational paper introducing the discounted utility model, which became the basis for all subsequent temporal discounting research',
        type: 'foundational',
      },
      {
        title: 'Time Discounting and Time Preference: A Critical Review',
        author: 'Frederick, S., Loewenstein, G., & O\'Donoghue, T.',
        year: 2002,
        doi: '10.1257/002205102320161311',
        description:
          'The definitive review of temporal discounting research, synthesizing decades of findings on how people devalue future outcomes',
        type: 'foundational',
      },
      {
        title: 'Increasing Saving Behavior Through Age-Progressed Renderings of the Future Self',
        author: 'Hershfield, H. E., Goldstein, D. G., Sharpe, W. F., et al.',
        year: 2011,
        doi: '10.1509/jmkr.48.SPL.S23',
        description:
          'Landmark study showing that interacting with aged versions of yourself increases retirement savings behavior',
        type: 'practical',
      },
      {
        title: 'The Fresh Start Effect: Temporal Landmarks Motivate Aspirational Behavior',
        author: 'Dai, H., Milkman, K. L., & Riis, J.',
        year: 2014,
        doi: '10.1287/mnsc.2014.1901',
        description:
          'Research on how temporal landmarks (new year, birthdays) create natural windows for overcoming temporal discounting and starting new goal pursuit',
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
          'Comprehensive coverage of dual-process theory and how the fast, intuitive system drives temporal discounting',
        type: 'foundational',
      },
      {
        title: 'The Marshmallow Test: Mastering Self-Control',
        author: 'Mischel, Walter',
        year: 2014,
        isbn: '9780316230872',
        description:
          'The researcher behind the famous marshmallow experiment explains decades of research on delayed gratification and self-control',
        type: 'foundational',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Practical framework for designing choice architectures that help people overcome temporal discounting for better long-term outcomes',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Don\'t Save for Retirement: The Psychology of Temporal Discounting in UX',
        author: 'Behavioral Scientist',
        url: 'https://behavioralscientist.org/',
        description:
          'Practical guide to applying temporal discounting research in product design for savings and health apps',
        type: 'practical',
      },
      {
        title: 'How to Design for Long-Term Behavior Change',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/',
        description:
          'UX-focused guide on designing micro-reward systems and future-self visualizations to counteract temporal discounting',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Battle Between Your Present and Future Self',
        author: 'Daniel Goldstein (TED)',
        url: 'https://www.ted.com/talks/daniel_goldstein_the_battle_between_your_present_and_future_self',
        description:
          'TED talk on temporal discounting and tools for helping people make better future-oriented decisions',
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
      'loss-aversion', // Framing delayed action as loss amplifies temporal motivation
      'social-proof', // Seeing others succeed with delayed rewards reduces discounting
      'commitment-bias', // Pre-commitment devices lock in future-oriented choices
      'endowment-effect', // Feeling ownership of future outcomes reduces discounting
    ],

    conflicts: [
      'hyperbolic-discounting', // Is essentially the mechanism, not a separate bias
      'optimism-bias', // Unrealistic optimism about the future can counteract discounting
    ],

    confusedWith: [
      'present-bias', // Often used synonymously, but present bias is a specific form of temporal discounting
      'impulsivity', // Impulsivity is a trait; temporal discounting is a cognitive mechanism
      'delay-of-gratification', // Related but delay-of-gratification is the ability to resist, not the bias itself
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'present-bias',
        'future-self-continuity',
      ],
    },
  },
};
