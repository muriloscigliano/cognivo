/**
 * PROJECTION BIAS
 *
 * We assume our current preferences will remain stable over time
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const projectionBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'projection-bias',
    name: 'Projection Bias',
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
    simple: 'We assume our current preferences will remain stable over time',

    detailed: `Projection Bias is the tendency for people to assume that their current preferences, emotions, and mental states will persist into the future. When we are in a particular emotional or physical state, we overestimate how much our future self will share those same feelings and desires.

This bias causes a systematic mismatch between predicted and actual future preferences. People who are currently hungry overestimate how hungry they will be later. People who are excited about a new hobby overestimate how long that excitement will last. People experiencing winter weather overestimate how much they will value warm-weather gear in summer.

In UX and product design, projection bias profoundly impacts subscription decisions, long-term commitments, preference settings, and any feature where users make choices today that bind their future selves. Understanding this pattern helps designers create experiences that protect users from over-committing based on transient states while still enabling meaningful engagement.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain projects its current internal state onto future scenarios, systematically underestimating how much preferences and feelings will change. This happens because:

1. **Empathy Gap**: People in a "hot" emotional state (hungry, excited, angry) cannot accurately predict how they will feel in a "cold" state, and vice versa
2. **State-Dependent Forecasting**: The brain uses the current state as the default baseline for imagining future states, then makes insufficient adjustments
3. **Temporal Discounting of Change**: People recognize that preferences can change in the abstract but underestimate the magnitude of change for their own future self
4. **Focalism**: When imagining the future, people focus on their current salient feelings and fail to account for adaptation, habituation, and shifting contexts
5. **Present-Self Dominance**: The vividness of present experience overshadows the abstract and uncertain nature of future experience`,
    },

    realWorldExample: `In a landmark study by Loewenstein, O'Donoghue, and Rabin (2003), researchers found that people shopping for groceries while hungry purchased significantly more food than they would actually consume. The hungry shoppers projected their current hunger onto their future selves, assuming they would want the same quantity and type of food later. Similarly, gym membership sign-ups spike dramatically every January when people are motivated by New Year's resolutions, yet attendance drops by 80% within five months as the initial motivation fades. The January self could not accurately predict what the June self would want.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Projection Bias affects how users make long-term commitments, set preferences, and engage with subscription-based products. Users in a current emotional state will make choices that don't match their future preferences. Designers can leverage this understanding to:

- Protect users from over-committing during moments of peak excitement or urgency
- Design flexible subscription models that accommodate changing preferences
- Build preference systems that evolve with users rather than locking them in
- Create "future-self" tools that help users anticipate preference changes
- Time commitment requests to align with sustainable rather than peak motivation`,

    whenToUse: [
      {
        title: 'Subscription Design',
        scenario:
          'When designing subscription tiers, trials, or commitment flows',
        example:
          'Offer a 1-month trial before annual commitment, letting users experience preference changes before locking in',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Preference Settings',
        scenario: 'When users configure notification, content, or feature preferences',
        example:
          'Prompt users to revisit preferences quarterly with "Still interested in these topics?" rather than assuming initial choices are permanent',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Long-Term Commitment Flows',
        scenario: 'When users are making decisions that bind their future selves (annual plans, contracts)',
        example:
          'Show a "cooling off" summary before finalizing annual plans: "You\'re committing to 12 months. Plans can change — are you sure?"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Seasonal Feature Design',
        scenario: 'When features or content have seasonal relevance that may not match year-round interest',
        example:
          'Design fitness apps to adapt content and goals seasonally rather than assuming January intensity will persist',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Future-Self Tools',
        scenario: 'When helping users plan or make commitments for their future selves',
        example:
          'Meal planning apps that ask "Are you currently hungry?" before letting users set weekly orders, with a note that hunger affects choices',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exploiting Peak Excitement',
        reason:
          'Using projection bias to lock users into commitments during emotional highs is manipulative',
        consequence:
          'High cancellation rates, negative reviews, and eroded trust when reality does not match the projected state',
        alternative:
          'Offer flexible commitments and easy downgrade paths that accommodate natural preference changes',
      },
      {
        title: 'Dark Pattern Upsells',
        reason:
          'Pushing annual plans during moments of peak engagement exploits projection bias',
        consequence:
          'Users feel trapped and resentful when their enthusiasm fades but the commitment remains',
        alternative:
          'Present annual options alongside monthly, with clear cost comparisons and easy switching',
      },
      {
        title: 'Hiding Cancellation Options',
        reason:
          'Making it hard to cancel capitalizes on projection bias at sign-up but creates hostility later',
        consequence:
          'Regulatory risk, brand damage, and forced retention that generates negative sentiment',
        alternative:
          'Make cancellation as easy as sign-up; retain users through value, not friction',
      },
      {
        title: 'Irreversible Preference Locks',
        reason:
          'Permanently locking users into preferences set during a single session ignores how people change',
        consequence:
          'Users outgrow their initial settings and disengage rather than reconfiguring',
        alternative:
          'Build adaptive preference systems that learn from behavior changes over time',
      },
    ],

    commonMistakes: [
      {
        title: 'Designing for the January Self',
        description:
          'Building onboarding and commitment flows that capitalize on peak motivation without accounting for the inevitable drop-off',
        why: 'Users sign up during high motivation but churn when reality diverges from their projected enthusiasm',
        fix: 'Design for the "average Tuesday in March" self, not the "New Year\'s Day" self. Build in re-engagement for when motivation naturally wanes.',
      },
      {
        title: 'Static Preference Assumptions',
        description:
          'Treating initial preference selections as permanent and never prompting users to update',
        why: 'Preferences set during onboarding reflect a momentary state, not enduring tastes',
        fix: 'Implement periodic preference check-ins and use behavioral signals to detect preference drift',
      },
      {
        title: 'One-Size-Fits-All Commitment Lengths',
        description:
          'Offering only annual plans with no flexibility for preference changes',
        why: 'Annual commitments assume 12 months of consistent interest, which projection bias makes users overestimate',
        fix: 'Offer tiered commitment lengths (monthly, quarterly, annual) with clear savings trade-offs',
      },
      {
        title: 'Ignoring Context of Decision',
        description:
          'Not considering the emotional or physical state users are in when making choices',
        why: 'A user ordering groceries while hungry, subscribing while excited, or configuring while stressed will make different choices than their baseline self',
        fix: 'Add gentle friction or reminders at decision points: "Tip: orders placed when hungry tend to be larger than needed"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects when and how commitment decisions are presented relative to peak-state moments',
        examples: [
          'Placing annual plan upsells immediately after a "wow" moment exploits projection bias',
          'Positioning preference settings during onboarding locks in transient states',
          'Commitment flows placed after success moments capture peak enthusiasm',
          'Flexible plan options shown alongside rigid ones help users self-correct',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text emphasis can frame commitments as permanent or flexible, affecting projection',
        examples: [
          'Emphasizing "12-month" vs "annual" creates different commitment perceptions',
          'Fine print on commitment terms is easily missed during excited states',
          'Clear, prominent cancellation policy text reduces projection-driven anxiety',
          'Future-oriented language ("You in 6 months") can prompt reflection on preference change',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color can reinforce urgency that amplifies projection bias or signal caution at commitment points',
        examples: [
          'Urgent red "Limited time!" badges amplify current-state decision-making',
          'Calm, neutral tones at commitment points reduce emotional projection',
          'Green "savings" highlights on annual plans reinforce the projected value',
          'Warning colors on irreversible actions can prompt future-self reflection',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users commit during peak states or after reflection',
        examples: [
          'One-click annual upgrades during peak moments exploit projection bias',
          'Cooling-off periods between selection and confirmation allow state changes',
          'Progressive commitment (trial -> monthly -> annual) respects preference evolution',
          'Undo and downgrade flows protect users from projection-driven over-commitment',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing shapes whether users consider their future self or only their current state',
        examples: [
          '"You\'ll love this forever!" messaging reinforces projection bias',
          '"Try it for a month first" messaging counters projection bias ethically',
          'Showing seasonal usage patterns helps users anticipate preference changes',
          'Testimonials from long-term users reveal how engagement naturally evolves',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible commitment flows must ensure all users can understand the long-term implications of projection-biased decisions',
        examples: [
          'Screen reader users need clear commitment terms read aloud, not hidden in visual fine print',
          'Cognitive accessibility requires simple, explicit language about what commitments entail',
          'Time-limited offers create pressure that amplifies projection bias for all users',
          'Easy-to-find cancellation paths are an accessibility concern for users who over-committed',
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
        title: 'Flexible Subscription with Trial Period',
        description:
          'Streaming service offering a free month before any commitment, with easy plan changes',
        code: `<div class="subscription-flow">
  <h3>Start with a free month</h3>
  <p class="subtitle">Your tastes may change — and that's okay.</p>

  <div class="plan-options">
    <div class="plan recommended">
      <h4>Monthly</h4>
      <div class="price">$12.99<span>/month</span></div>
      <p class="flexibility">Cancel or change anytime</p>
      <span class="badge">Most Flexible</span>
    </div>
    <div class="plan">
      <h4>Annual</h4>
      <div class="price">$8.99<span>/month</span></div>
      <p class="savings">Save $48/year</p>
      <p class="note">We recommend trying monthly first</p>
    </div>
  </div>

  <p class="reminder">
    💡 Tip: Most users find their viewing habits change
    over the first 3 months. Monthly lets you adapt.
  </p>
</div>`,
        explanation:
          'Instead of pushing the annual plan during sign-up excitement, this design recommends monthly first and transparently explains that preferences change. Users who still want annual can choose it, but they are making an informed decision.',
        principle:
          'Help users account for future preference changes instead of exploiting current-state enthusiasm',
        metrics: {
          before: '45% chose annual (but 38% cancelled within 4 months)',
          after: '30% chose annual (only 12% cancelled within 4 months)',
          improvement: '68% reduction in early annual cancellations, higher LTV',
        },
      },
      {
        title: 'Preference Check-In System',
        description:
          'Content platform that periodically asks users to review and update their preferences',
        code: `<div class="preference-checkin">
  <h3>Quick Check-In</h3>
  <p>You set these preferences 3 months ago. Still accurate?</p>

  <div class="preference-review">
    <div class="preference-item">
      <span class="topic">Cryptocurrency</span>
      <span class="engagement">Read 2 of last 20 articles</span>
      <div class="actions">
        <button class="keep">Keep</button>
        <button class="reduce">See Less</button>
        <button class="remove">Remove</button>
      </div>
    </div>
    <div class="preference-item">
      <span class="topic">AI & Machine Learning</span>
      <span class="engagement">Read 18 of last 20 articles</span>
      <div class="actions">
        <button class="keep selected">Keep</button>
        <button class="more">See More</button>
      </div>
    </div>
  </div>

  <p class="insight">Your reading patterns have shifted since
  you first set up. We've adjusted suggestions accordingly.</p>
</div>`,
        explanation:
          'This design acknowledges that the preferences users set during onboarding may no longer match their actual interests. By showing engagement data alongside original preferences, it helps users see how their interests have evolved.',
        principle:
          'Treat preferences as evolving, not fixed. Use behavioral data to surface preference drift.',
      },
      {
        title: 'Hungry-State Awareness in Food Ordering',
        description:
          'Grocery delivery app that gently flags potential over-ordering',
        code: `<div class="cart-review">
  <h3>Review Your Cart</h3>

  <div class="order-insight">
    <span class="icon">📊</span>
    <p><strong>Your cart is 40% larger than your usual order.</strong></p>
    <p class="detail">Orders placed between 11am-1pm and 5-7pm
    tend to be larger than what gets consumed. You're ordering
    at 12:15pm.</p>
    <button class="secondary">Review quantities</button>
  </div>

  <div class="cart-items">
    <div class="item flagged">
      <span>Family-size chips (x3)</span>
      <span class="note">You usually order 1</span>
    </div>
    <div class="item flagged">
      <span>Ice cream (x4 pints)</span>
      <span class="note">You usually order 1-2</span>
    </div>
  </div>

  <div class="actions">
    <button class="primary">Proceed with current cart</button>
    <button class="secondary">Adjust to usual quantities</button>
  </div>
</div>`,
        explanation:
          'The app uses behavioral data to detect when a user may be ordering under the influence of hunger (a classic projection bias trigger). It surfaces the pattern without blocking the user, letting them make an informed choice.',
        principle:
          'Use data to surface projection bias in real time without being paternalistic',
        metrics: {
          before: 'Average food waste from orders: 23%',
          after: 'Average food waste from orders: 14%',
          improvement: '39% reduction in food waste, higher customer satisfaction',
        },
      },
    ],

    bad: [
      {
        title: 'Exploiting New Year Motivation',
        description:
          'Fitness app pushing annual commitments during January sign-up surge',
        code: `<!-- DON'T DO THIS -->
<div class="new-year-signup">
  <h2>🎉 New Year, New You! Lock in Your Best Price!</h2>
  <p style="color: red; font-weight: bold;">
    LIMITED TIME: Annual plan only $199/year (save 60%!)
  </p>
  <p>You're SO motivated right now — don't let it slip away!</p>
  <button class="urgent">COMMIT TO YOUR GOALS — BUY ANNUAL NOW</button>
  <small style="color: #ccc; font-size: 0.6em;">
    No refunds. Monthly plan available at $29/mo.
  </small>
</div>`,
        explanation:
          'This design deliberately exploits projection bias by targeting users at peak motivation (January) and using urgency to prevent reflection. The messaging reinforces the assumption that current motivation will persist ("don\'t let it slip away") when data shows most users will lose interest within months.',
        principle:
          'Never exploit transient emotional states to lock users into long-term commitments',
      },
      {
        title: 'Irreversible Preference Lock-In',
        description:
          'Platform that makes initial preferences permanent with no easy way to change them',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-preferences">
  <h2>Choose Your Interests</h2>
  <p>Select topics you care about. Choose carefully!</p>
  <div class="topics">
    <button class="topic">Tech</button>
    <button class="topic">Crypto</button>
    <button class="topic">Sports</button>
    <button class="topic">Fashion</button>
  </div>
  <p style="font-size: 0.7em; color: #aaa;">
    Preferences cannot be changed after onboarding.
    Choose wisely.
  </p>
  <button class="primary">Confirm Forever</button>
</div>`,
        explanation:
          'Locking users into preferences set during a single onboarding session assumes their current interests are permanent. Users who were excited about crypto during a market boom may have zero interest six months later. Permanent preferences guarantee disengagement.',
        principle:
          'Never treat a momentary snapshot of preferences as permanent identity',
      },
      {
        title: 'Hunger-Exploiting Upsells',
        description:
          'Food delivery app maximizing order size during peak hunger',
        code: `<!-- DON'T DO THIS -->
<div class="upsell-hungry">
  <h2>🍕 Still Hungry? Add More!</h2>
  <div class="suggestion">
    <img src="pizza.jpg" alt="Delicious extra-large pizza">
    <p>Most people add an extra pizza. You look like you
    could use TWO more! 🤤</p>
    <button class="add">Add 2 More Pizzas (+$24)</button>
  </div>
  <div class="suggestion">
    <img src="dessert.jpg" alt="Giant chocolate cake">
    <p>Don't forget dessert! Order now while you're craving it!</p>
    <button class="add">Add Dessert Sampler (+$18)</button>
  </div>
</div>`,
        explanation:
          'This design deliberately amplifies projection bias by using food imagery and language designed to intensify current hunger, then pushing large additions. The user will likely not want this much food by the time it arrives.',
        principle:
          'Do not amplify the emotional state that drives projection bias for profit',
      },
    ],

    realWorld: [
      {
        company: 'Planet Fitness',
        product: 'Gym Memberships',
        description: 'Gym membership sign-ups spike 30-50% in January as motivated New Year\'s resolvers project their current enthusiasm onto their future selves. Planet Fitness builds its business model around this, keeping prices low because they know most members will stop attending but keep paying.',
        effectiveness: 'very-effective',
        analysis: 'Planet Fitness profits from projection bias by making cancellation inconvenient. While financially effective, this model relies on users failing to follow through on projected commitments. An ethical alternative would be usage-based pricing.',
      },
      {
        company: 'Amazon',
        product: 'Amazon Fresh / Grocery',
        description: 'Amazon grocery orders placed during meal times (11am-1pm, 5-7pm) are significantly larger than those placed at other times. Hungry shoppers project their current hunger state onto their future selves and over-order perishable goods.',
        effectiveness: 'effective',
        analysis: 'Amazon does not currently flag this pattern to users, which means projection bias drives larger orders but also more food waste. A "your cart is larger than usual" nudge would be a user-friendly improvement.',
      },
      {
        company: 'HelloFresh',
        product: 'Meal Kit Subscriptions',
        description: 'HelloFresh sees high sign-up rates when users are excited about cooking (often after watching cooking shows or during holidays). Many subscribers project this enthusiasm forward, then find meal prep burdensome within weeks and cancel.',
        effectiveness: 'effective',
        analysis: 'HelloFresh has improved retention by offering flexible skip-weeks and plan adjustments, partially counteracting projection bias. The ability to pause rather than cancel acknowledges that interest is cyclical.',
      },
      {
        company: 'Spotify',
        product: 'Annual Plan Pricing',
        description: 'Spotify offers a significant discount for annual plans vs monthly. Users who discover a burst of music they love often upgrade to annual, projecting their current listening enthusiasm. Spotify mitigates potential regret with easy plan management.',
        effectiveness: 'effective',
        analysis: 'Spotify balances leveraging projection bias (annual discount) with ethical design (easy cancellation, mid-plan refund policy). This approach captures willing commitment without trapping reluctant subscribers.',
      },
    ],

    abTests: [
      {
        title: 'Subscription Flow: Annual-First vs Monthly-First',
        hypothesis:
          'Recommending monthly plans first will reduce early cancellations and increase long-term retention',
        controlVersion: {
          description:
            'Subscription page featuring annual plan prominently with "Best Value" badge, monthly option shown smaller below',
          metrics: {
            conversionRate: '22%',
            annualPlanSelection: '58%',
            cancellationWithin3Months: '35%',
          },
        },
        treatmentVersion: {
          description:
            'Subscription page recommending monthly plan with "Most Flexible" badge, annual option available with note "Consider annual after your first month"',
          metrics: {
            conversionRate: '26%',
            annualPlanSelection: '31%',
            cancellationWithin3Months: '11%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While annual plan selection dropped by 47%, early cancellations dropped by 69%. Monthly-first users who later upgraded to annual had a 94% retention rate vs 65% for users who chose annual at sign-up. 12-month LTV was 18% higher in the treatment group.',
          learnings: [
            'Reducing projection bias at sign-up significantly improves long-term retention',
            'Users who self-select into annual after experiencing the product are far more committed',
            'Lower initial ARPU is offset by dramatically reduced churn',
            'Trust increases when the product does not push hard commitments upfront',
          ],
        },
      },
      {
        title: 'Grocery App: Hunger-Aware Cart Review vs Standard Checkout',
        hypothesis:
          'Surfacing projection bias indicators at checkout will reduce over-ordering without reducing revenue',
        controlVersion: {
          description:
            'Standard checkout flow with no context about ordering patterns or timing',
          metrics: {
            averageOrderSize: '$87',
            itemsPerOrder: '24',
            reportedFoodWaste: '26%',
          },
        },
        treatmentVersion: {
          description:
            'Checkout flow with gentle nudge: "Your cart is 35% larger than your usual order. Orders placed around mealtimes tend to be larger than needed." with one-click option to adjust to typical quantities.',
          metrics: {
            averageOrderSize: '$72',
            itemsPerOrder: '19',
            reportedFoodWaste: '15%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Average order size decreased 17%, but reorder frequency increased 23% as users ran out of food less often and wasted less. Net revenue was flat while customer satisfaction scores increased by 31%. Food waste reduction was a significant brand positive.',
          learnings: [
            'Helping users counteract projection bias builds trust and loyalty',
            'Reduced order size is offset by increased order frequency',
            'Users appreciate being told about their own patterns',
            'Sustainable ordering patterns drive higher lifetime value than exploitative ones',
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
        name: 'Commitment Urgency Signals',
        description: 'Time-limited offers or urgency language pushing long-term commitments during peak emotional states',
        howToSpot: 'Look for "limited time", countdown timers, or "lock in now" language near annual plan or commitment CTAs',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Annual Plan Dominance',
        description: 'Annual or long-term plans shown more prominently than flexible monthly options',
        howToSpot: 'Check if the annual plan is visually larger, positioned first, or labeled "Best Value" while monthly is de-emphasized',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Rigid Preference Settings',
        description: 'Onboarding flows that collect detailed preferences without any mechanism for updating them',
        howToSpot: 'Look for preference selection during onboarding with no visible path to change preferences later',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Emotional State Amplification',
        description: 'Design elements that intensify the user\'s current emotional state before a commitment decision',
        howToSpot: 'Check for excitement-building content (success stories, motivational language) immediately preceding sign-up or upgrade flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Hidden Cancellation Paths',
        description: 'Commitment flows that are easy to enter but difficult to exit',
        howToSpot: 'Compare the number of clicks to subscribe vs cancel. Look for buried settings, phone-only cancellation, or retention dark patterns',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Peak-State Commitment Pattern',
        description: 'Long-term commitment requests placed at moments of peak user enthusiasm or engagement',
        indicators: ['Annual plan upsell after first successful action', 'Upgrade prompts after positive experience', 'Commitment CTAs following motivational content', '"Don\'t lose momentum" messaging'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Static Preference Pattern',
        description: 'User preferences captured once during onboarding and never revisited',
        indicators: ['Onboarding preference wizard with no follow-up', 'No "update preferences" option in settings', 'Content recommendations that never change', 'No behavioral adaptation of suggestions'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Context-Blind Ordering Pattern',
        description: 'Purchase or ordering flows that ignore the user\'s current state (time, mood, hunger)',
        indicators: ['Food ordering with no cart review step', 'No comparison to historical order patterns', 'Upsells that amplify current cravings', 'No cooling-off period before large orders'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Seasonal Exploitation Pattern',
        description: 'Aggressive commitment marketing during seasonal motivation spikes',
        indicators: ['New Year\'s promotion for annual plans', 'Summer body campaigns with long-term commitment', 'Back-to-school annual subscriptions', 'Holiday-season gift subscriptions that auto-renew'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are long-term commitments offered at moments of peak user enthusiasm?',
      'Can users easily update preferences they set during onboarding?',
      'Is the cancellation flow as simple as the sign-up flow?',
      'Does the design amplify emotional states before commitment decisions?',
      'Are flexible (monthly, pausable) options given equal prominence to annual plans?',
      'Does the product account for seasonal or cyclical interest patterns?',
      'Is there a cooling-off mechanism before irreversible commitments?',
      'Does the interface surface data about users\' changing behavior patterns?',
      'Are users reminded that their preferences may change over time?',
      'Does the ordering flow consider the user\'s physical or emotional state (e.g., hunger, excitement)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in projection bias.

Analyze the provided design for projection bias patterns. Identify:

1. **Commitment Timing**: Are long-term commitments requested during peak emotional states?
2. **Preference Rigidity**: Are user preferences treated as fixed or evolving?
3. **State Awareness**: Does the design account for the user's current emotional or physical state?
4. **Flexibility Design**: Are there easy paths to change, downgrade, pause, or cancel?
5. **Future-Self Consideration**: Does the design help users think about how their preferences may change?

For each pattern found:
- Identify whether it exploits or mitigates projection bias
- Assess the commitment length relative to likely preference stability
- Determine if users have adequate escape routes from projection-biased decisions
- Evaluate ethical implications of the commitment design
- Suggest improvements for protecting users from over-commitment

Consider:
- Is the design profiting from users who will regret their decision?
- Are there seasonal or emotional patterns being exploited?
- Do preference systems adapt to behavioral changes over time?
- Is the cancellation flow proportionate to the sign-up flow?
- Are users given tools to think about their future self?

Provide actionable recommendations for ethical, user-centered commitment design.`,

    outputSchema: {
      type: 'object',
      properties: {
        projectionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              commitmentLength: { type: 'string' },
              emotionalState: { type: 'string' },
              exploitsOrMitigates: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'commitmentLength',
              'exploitsOrMitigates',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            commitmentFlexibility: { type: 'number' },
            preferenceAdaptability: { type: 'number' },
            stateAwareness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'commitmentFlexibility',
            'preferenceAdaptability',
            'stateAwareness',
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
        'projectionPatterns',
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
        title: 'Identify Projection-Vulnerable Decisions',
        description:
          'Map every point where users make commitments that bind their future selves (subscriptions, preferences, plans)',
        example:
          'Audit: annual plan sign-up, preference onboarding, meal plan selection, notification settings',
        tips: [
          'Focus on decisions with long time horizons (months, years)',
          'Look for decisions made during emotional peaks (excitement, hunger, frustration)',
          'Identify where current state most diverges from likely future state',
        ],
      },
      {
        step: 2,
        title: 'Design for Preference Change',
        description:
          'Build systems that assume preferences will change rather than remain stable',
        example:
          'Add quarterly preference check-ins that compare stated preferences to actual behavior',
        tips: [
          'Track behavioral signals that indicate preference drift',
          'Offer easy preference updates without requiring full reconfiguration',
          'Use machine learning to detect and adapt to changing patterns',
        ],
      },
      {
        step: 3,
        title: 'Add Cooling-Off Mechanisms',
        description:
          'Insert reflection points before irreversible or long-term commitments',
        example:
          'Before annual plan confirmation: "You\'re committing to 12 months. Would you like to try monthly first?"',
        tips: [
          'Keep cooling-off friction minimal — a single confirmation, not a barrier',
          'Provide relevant data (usage patterns, seasonal trends) to inform the decision',
          'Never make cooling-off feel like punishment or loss',
        ],
      },
      {
        step: 4,
        title: 'Surface Behavioral Data',
        description:
          'Show users their own patterns to help them make more accurate predictions about future behavior',
        example:
          'Grocery app: "Your average order is $65. This order is $95. Orders at lunchtime tend to be 30% larger."',
        tips: [
          'Frame data as helpful, not judgmental',
          'Compare current behavior to personal historical baselines',
          'Let users act on the data or dismiss it easily',
        ],
      },
      {
        step: 5,
        title: 'Build Flexible Exit Paths',
        description:
          'Ensure that users who made projection-biased decisions can easily correct course',
        example:
          'One-click plan downgrade, skip-week for subscriptions, easy preference reset',
        tips: [
          'Exit should be as easy as entry — no asymmetric friction',
          'Offer pause as an alternative to cancellation',
          'Provide prorated refunds for annual plan cancellations',
        ],
      },
    ],

    dos: [
      'Design subscription models that accommodate natural preference changes',
      'Offer trial periods before long-term commitments',
      'Build periodic preference check-ins based on behavioral data',
      'Surface patterns that indicate the user may be in a transient state',
      'Make cancellation and downgrade flows as simple as sign-up flows',
      'Provide flexible commitment options (monthly, quarterly, annual)',
      'Use data to help users see how their behavior has changed over time',
      'Design for the "average day" self, not the "peak motivation" self',
    ],

    donts: [
      'Don\'t push annual plans during moments of peak excitement or seasonal motivation',
      'Don\'t treat onboarding preferences as permanent',
      'Don\'t make cancellation harder than sign-up',
      'Don\'t use urgency tactics to prevent reflection before commitments',
      'Don\'t amplify emotional states (hunger, excitement) before commitment decisions',
      'Don\'t hide flexible options to push longer commitments',
      'Don\'t rely on projection bias for retention — retain through value',
      'Don\'t ignore seasonal patterns in user engagement and motivation',
    ],

    bestPractices: [
      {
        title: 'Progressive Commitment Ladder',
        description:
          'Guide users through increasing commitment levels: free trial -> monthly -> quarterly -> annual',
        rationale:
          'Each step lets users verify that their preferences are stable before committing further',
        example:
          'After 3 months on monthly plan, offer annual with message: "You\'ve been with us 3 months — ready to commit to a year?"',
      },
      {
        title: 'Behavioral Preference Adaptation',
        description:
          'Automatically adjust recommendations and settings based on observed behavior changes, not just stated preferences',
        rationale:
          'Stated preferences reflect a moment in time; behavioral data reflects evolving reality',
        example:
          'If a user stops reading crypto articles but reads more AI articles, auto-suggest preference update',
      },
      {
        title: 'State-Aware Decision Points',
        description:
          'Detect and surface when users may be making decisions influenced by transient states',
        rationale:
          'Users ordering while hungry, subscribing while excited, or configuring while stressed make predictably different choices',
        example:
          'Food app showing "You\'re ordering at lunchtime — your cart is 35% larger than usual" with one-click adjust option',
      },
      {
        title: 'Symmetrical Commitment Flows',
        description:
          'Make the effort to cancel or change a commitment proportional to the effort to create it',
        rationale:
          'Asymmetric flows (easy sign-up, hard cancellation) exploit projection bias and destroy trust',
        example:
          'If sign-up takes 2 clicks, cancellation should take 2 clicks — not a phone call',
      },
      {
        title: 'Seasonal Engagement Design',
        description:
          'Design features and engagement strategies that anticipate natural motivation cycles',
        rationale:
          'Fitness interest peaks in January, cooking interest peaks around holidays — design for the dip, not just the peak',
        example:
          'Fitness app with "maintenance mode" for low-motivation months instead of aggressive re-engagement',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For financial commitments, provide confirmation and review steps',
        implementation:
          'All subscription and commitment flows must include a clear review step showing total cost, duration, and cancellation terms before final confirmation',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Commitment terms must be clearly labeled and accessible',
        implementation:
          'Use clear headings like "12-Month Commitment" rather than just "$8.99/mo" so screen reader users understand the full obligation',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure commitment details are programmatically determinable',
        implementation:
          'Use semantic HTML and ARIA to make commitment length, cancellation terms, and total cost available to all assistive technologies',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Transient Motivation',
        severity: 'critical',
        explanation:
          'Deliberately timing commitment requests to coincide with peak emotional states (New Year\'s, post-achievement highs) to lock users into plans they will likely abandon',
        mitigation:
          'Offer flexible options prominently during high-motivation periods. Recommend monthly trials before annual commitments. Let the product\'s value, not the user\'s transient state, drive retention.',
      },
      {
        concern: 'Asymmetric Commitment Flows',
        severity: 'critical',
        explanation:
          'Making it easy to commit but deliberately difficult to cancel, profiting from users who over-committed due to projection bias',
        mitigation:
          'Implement symmetrical flows: if sign-up takes N steps, cancellation should take N steps. Offer self-service cancellation without requiring phone calls or chat.',
      },
      {
        concern: 'Hunger and State Exploitation',
        severity: 'high',
        explanation:
          'Food and delivery platforms maximizing order sizes by upselling during hunger states, knowing users will over-order',
        mitigation:
          'Surface ordering pattern data to users. Flag unusually large orders relative to historical baselines. Offer one-click adjustment to typical quantities.',
      },
      {
        concern: 'Preference Lock-In',
        severity: 'medium',
        explanation:
          'Treating initial preference selections as permanent, leading to degraded experiences as users outgrow their original choices',
        mitigation:
          'Build periodic preference review into the product. Use behavioral signals to detect preference drift. Make preference updates easy and low-friction.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Projection Bias in Predicting Future Utility',
        author: 'Loewenstein, G., O\'Donoghue, T., & Rabin, M.',
        year: 2003,
        doi: '10.1162/003355303322552784',
        description:
          'The foundational paper formalizing projection bias and demonstrating how people systematically exaggerate the degree to which their future tastes will resemble their current tastes',
        type: 'foundational',
      },
      {
        title: 'The Heat of the Moment: The Effect of Sexual Arousal on Sexual Decision Making',
        author: 'Ariely, D., & Loewenstein, G.',
        year: 2006,
        doi: '10.1016/j.jbef.2005.07.003',
        description:
          'Demonstrates projection bias in emotional decision-making, showing people cannot predict how arousal states affect their choices',
        type: 'advanced',
      },
      {
        title: 'Projection Bias in the Car and Housing Markets',
        author: 'Busse, M. R., Pope, D. G., Pope, J. C., & Silva-Risso, J.',
        year: 2015,
        description:
          'Real-world evidence of projection bias in major purchases: weather conditions at time of purchase predict convertible and 4WD purchases',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Comprehensive exploration of why humans are poor at predicting their future emotional states, directly relevant to projection bias',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393080148',
        description:
          'Covers projection bias and related phenomena in the context of behavioral economics and policy design',
        type: 'practical',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Practical examples of how current emotional states bias predictions about future preferences and decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Why We Buy Things We\'ll Never Use',
        author: 'Behavioral Scientist',
        url: 'https://behavioralscientist.org/',
        description:
          'Accessible overview of projection bias in consumer behavior, with practical implications for product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Daniel Gilbert: Why We Make Bad Decisions',
        author: 'TED',
        url: 'https://www.ted.com/talks/dan_gilbert_why_we_make_bad_decisions',
        description:
          'TED talk exploring how our inability to predict future preferences leads to systematic decision errors',
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
