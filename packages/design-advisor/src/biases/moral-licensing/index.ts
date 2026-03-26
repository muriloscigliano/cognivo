/**
 * MORAL LICENSING
 *
 * Good behavior licenses subsequent bad behavior
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const moralLicensing: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'moral-licensing',
    name: 'Moral Licensing',
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
    simple: 'Good behavior licenses subsequent bad behavior',

    detailed: `Moral licensing (also known as the self-licensing effect) is a cognitive bias where people who perform an initial virtuous or prosocial act subsequently feel "licensed" to behave in a morally questionable or self-indulgent way. Past good behavior creates a psychological credit or token that people unconsciously spend on later actions that contradict their original good intentions.

This bias is pervasive in everyday life: after exercising, people feel entitled to eat unhealthy food; after donating to charity, people feel justified in a luxury purchase; after making an environmentally friendly choice, people feel permitted to be less green elsewhere. The prior virtuous act creates an inflated self-concept that buffers against the guilt of subsequent indulgent or harmful behavior.

In product and UX design, moral licensing is especially relevant in reward systems, sustainability messaging, health and fitness apps, loyalty programs, and any context where users track "good" behavior. Designers must be careful not to create feedback loops where celebrating good behavior inadvertently undermines the very goals users are trying to achieve.`,

    psychologyBasis: {
      discoveredBy: 'Benoît Monin and Dale Miller',
      year: 2001,
      theory: 'Self-Licensing and Moral Credentials Theory',
      mechanism: `Past good behavior creates "moral credits" that the brain treats as a spendable resource. This happens because:

1. **Moral Credit Accumulation**: Virtuous acts deposit credits into an internal moral bank account. The person unconsciously tracks this balance.
2. **Credential Establishment**: Performing a good act establishes the person as "a good person" in their own self-concept, making subsequent lapses feel less threatening to identity.
3. **Goal Progress Illusion**: When people feel they have made progress toward a goal (e.g., health, sustainability), they relax effort because the goal feels less urgent.
4. **Licensing via Comparison**: Comparing current behavior to past good behavior makes indulgent choices feel justified ("I've earned this").
5. **Emotional Regulation**: The positive self-regard from good behavior reduces guilt about subsequent indulgence, lowering the psychological cost of inconsistency.

The mechanism is largely unconscious — people genuinely believe they are making independent choices, unaware that their prior virtuous act is influencing subsequent decisions.`,
    },

    realWorldExample: `In a landmark 2001 study by Monin and Miller, participants who were given the opportunity to disagree with blatantly sexist statements (thus establishing non-sexist credentials) were subsequently more likely to favor a male candidate for a stereotypically male job. Their prior demonstration of egalitarian views licensed them to make a discriminatory choice without feeling like a sexist person. The moral credential from the first task gave them psychological permission to act on bias in the second.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Moral licensing affects how users respond to reward systems, sustainability messaging, health tracking, and loyalty programs. After completing a "good" action, users feel entitled to indulge — and poorly designed interfaces can amplify this effect. Designers can either:

- Inadvertently undermine user goals by celebrating good behavior in ways that license bad behavior
- Ethically harness the bias by designing reward systems that reinforce progress without creating permission to backslide
- Structure messaging so that positive feedback motivates continued effort rather than triggering indulgence
- Build loyalty and engagement programs that avoid creating a "spend your virtue" dynamic
- Frame achievements in terms of identity ("you're becoming healthier") rather than transactions ("you've earned a treat")`,

    whenToUse: [
      {
        title: 'Goal-Aligned Reward Systems',
        scenario:
          'When designing rewards after users complete positive actions (exercise, saving, learning)',
        example:
          'After a user completes a workout, offer a recovery-focused reward (stretching routine, protein recipe) rather than an indulgent one',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Sustainability Messaging',
        scenario: 'When showing users their positive environmental impact',
        example:
          'Frame eco-achievements as building toward a larger goal ("You\'re 40% to your annual target") rather than as earned credits ("You saved enough to offset a flight")',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Financial Wellness Apps',
        scenario: 'When users have saved money or stayed within budget',
        example:
          'Show savings milestones that emphasize trajectory ("Your emergency fund is growing!") instead of suggesting spending ("You saved $200 — treat yourself!")',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Health and Fitness Tracking',
        scenario: 'When displaying exercise or nutrition accomplishments',
        example:
          'Celebrate consistency and streaks rather than single achievements that could license unhealthy compensation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Loyalty Program Design',
        scenario: 'When structuring earn-and-spend loyalty mechanics',
        example:
          'Design tier-based programs where rewards unlock more of the same positive behavior (premium features) rather than indulgent exceptions',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Post-Exercise Reward Prompts',
        reason:
          'Suggesting indulgent food or rest after exercise exploits moral licensing to undermine health goals',
        consequence:
          'Users consume more calories than they burned, negating the benefit of exercise and damaging long-term outcomes',
        alternative:
          'Offer recovery-aligned rewards: hydration reminders, healthy recipes, or rest day scheduling',
      },
      {
        title: 'Carbon Offset as Permission',
        reason:
          'Framing carbon offsets as "making up for" emissions licenses users to pollute more freely',
        consequence:
          'Users increase carbon-heavy behavior because they believe offsets neutralize it, leading to net-negative environmental outcomes',
        alternative:
          'Frame offsets as supplementary, not substitutive. Emphasize reduction first, offset second',
      },
      {
        title: 'Charity Donation Upselling',
        reason:
          'Prompting luxury purchases immediately after a charitable donation exploits the moral credit effect',
        consequence:
          'Users spend more on luxury items than they otherwise would, feeling justified by their donation',
        alternative:
          'Separate donation and purchase flows. Do not cross-sell luxury items in donation confirmation screens',
      },
      {
        title: 'Diet App Cheat Day Framing',
        reason:
          'Framing "cheat days" as earned rewards for good eating can trigger overconsumption',
        consequence:
          'Users binge-eat on cheat days, often consuming more than they saved during the week',
        alternative:
          'Frame flexible eating as part of a balanced approach, not as a reward for restriction',
      },
    ],

    commonMistakes: [
      {
        title: 'Calorie Offset Messaging',
        description:
          'Showing "You burned 500 calories — you can eat X!" directly links exercise to food indulgence',
        why: 'Creates an explicit moral licensing loop where exercise becomes permission to overeat, undermining health goals',
        fix: 'Decouple exercise metrics from food. Celebrate fitness achievements on their own terms (strength, endurance, consistency)',
      },
      {
        title: 'Virtue Points as Currency',
        description:
          'Designing point systems where good behavior earns points redeemable for contradictory rewards',
        why: 'Turns moral behavior into a transactional economy where virtue is "spent" on vice',
        fix: 'Make rewards aligned with the original goal. Eco-points unlock eco-features, not fast-fashion discounts',
      },
      {
        title: 'Celebratory Messaging That Signals Completion',
        description:
          'Using language like "You did it!" or "Mission accomplished!" after partial progress',
        why: 'Signals that the goal has been reached, licensing users to stop trying or to indulge',
        fix: 'Use progress-oriented language: "Great momentum — keep going!" Frame accomplishments as steps, not destinations',
      },
      {
        title: 'Ignoring the Licensing Window',
        description:
          'Placing indulgent options immediately after virtuous actions without a buffer',
        why: 'The licensing effect is strongest immediately after the good behavior; proximity amplifies it',
        fix: 'Add a temporal or contextual buffer between achievement display and any potentially undermining options',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines the proximity between achievement displays and indulgent options',
        examples: [
          'Placing "treat yourself" offers directly below exercise completion screens triggers licensing',
          'Separating achievement sections from purchase/reward sections reduces licensing',
          'Progress bars that show ongoing journey prevent premature "mission accomplished" feelings',
          'Card-based layouts can isolate achievements from contradictory calls to action',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing heavily influences whether achievements feel like permission or motivation',
        examples: [
          'Celebratory language ("You earned it!") triggers licensing more than neutral progress reports',
          'Identity-based text ("You\'re becoming healthier") reduces licensing vs transactional ("You banked 300 points")',
          'Large, bold reward amounts ("$50 to spend!") amplify the licensing effect',
          'Smaller, contextual progress text ("Day 12 of 30") maintains goal focus',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals reward, indulgence, and achievement in ways that can trigger licensing',
        examples: [
          'Gold/celebratory colors on achievement badges can signal "you\'re done" rather than "keep going"',
          'Green progress indicators maintain forward momentum without signaling completion',
          'Red sale tags near achievement displays create juxtaposition that licenses spending',
          'Neutral tones for progress keep the focus on trajectory rather than celebration',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction sequences determine when and how licensing is triggered',
        examples: [
          'Immediate reward prompts after good actions create the strongest licensing effect',
          'Confetti animations and celebration modals signal completion and license relaxation',
          'Gamification streaks can backfire if broken streaks feel like "wasted credits"',
          'Push notifications celebrating achievements right before meal times can license overeating',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing is the primary vehicle for either triggering or preventing moral licensing',
        examples: [
          '"You deserve this" messaging explicitly licenses indulgent behavior',
          '"Your journey continues" messaging maintains goal-directed momentum',
          'Comparison to peers ("You\'re ahead of 80%") can license coasting or complacency',
          'Forward-looking content ("Next milestone: ...") prevents licensing by keeping goals salient',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible messaging must avoid licensing triggers in all modalities',
        examples: [
          'Screen reader announcements of achievements should use progress framing, not reward framing',
          'Haptic feedback for milestones should be subtle, not celebratory, to avoid licensing',
          'Accessible alternatives to confetti animations should maintain the same balanced messaging',
          'Alt text for achievement badges should emphasize progress, not completion',
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
        title: 'Identity-Based Fitness Celebration',
        description:
          'Fitness app celebrating a workout with identity reinforcement instead of food rewards',
        code: `<div class="workout-complete">
  <h3>Workout Complete</h3>
  <div class="achievement">
    <div class="streak-badge">Day 12 of 30</div>
    <p class="identity-message">
      <strong>You're building a stronger version of yourself.</strong>
    </p>
    <p class="progress-note">
      Consistency matters more than any single session.
    </p>
  </div>
  <div class="next-steps">
    <h4>Keep the momentum going</h4>
    <button class="primary">Schedule Tomorrow's Workout</button>
    <button class="secondary">View Recovery Tips</button>
  </div>
</div>`,
        explanation:
          'Instead of "You burned 500 calories — treat yourself!", the message reinforces identity ("stronger version of yourself") and forward momentum ("schedule tomorrow"). The reward is more of the positive behavior, not an indulgent counteraction.',
        principle:
          'Identity-based messaging reduces licensing by making the achievement about who you are, not what you earned',
        metrics: {
          before: '34% of users logged unhealthy meals within 2 hours of workout (with "treat yourself" messaging)',
          after: '19% of users logged unhealthy meals within 2 hours of workout (with identity messaging)',
          improvement: '44% reduction in post-workout indulgent eating',
        },
      },
      {
        title: 'Sustainability Progress Without Offset Framing',
        description:
          'Eco-app showing environmental impact as ongoing journey, not earned credits',
        code: `<div class="eco-dashboard">
  <h3>Your Environmental Journey</h3>
  <div class="progress-tracker">
    <div class="progress-bar" style="width: 42%">
      <span>42% to your 2026 goal</span>
    </div>
  </div>
  <div class="impact-summary">
    <p>This month you reduced emissions by <strong>12 kg CO2</strong></p>
    <p class="context">That's meaningful — and there's more to do.</p>
  </div>
  <div class="next-action">
    <h4>Your next biggest impact</h4>
    <div class="suggestion">
      <span class="icon">🚲</span>
      <p>Bike to work twice this week to stay on track</p>
    </div>
  </div>
</div>`,
        explanation:
          'The design frames eco-progress as part of an ongoing journey with a clear remaining gap (42% of goal). It avoids "you saved enough to offset X" framing that would license polluting behavior. The next action keeps the user engaged rather than complacent.',
        principle:
          'Progress framing that emphasizes remaining distance prevents licensing complacency',
      },
      {
        title: 'Balanced Reward in Loyalty Program',
        description:
          'Loyalty program offering goal-aligned rewards instead of contradictory indulgences',
        code: `<div class="loyalty-reward">
  <h3>Gold Member Benefits Unlocked</h3>
  <p class="status">Your consistent healthy choices earned you Gold status</p>
  <div class="rewards">
    <div class="reward aligned">
      <h4>Free Nutrition Consultation</h4>
      <p>A 30-minute session with a certified nutritionist</p>
      <button class="primary">Claim Reward</button>
    </div>
    <div class="reward aligned">
      <h4>Premium Meal Plans</h4>
      <p>Access to chef-designed healthy meal plans</p>
      <button class="secondary">Explore Plans</button>
    </div>
  </div>
</div>`,
        explanation:
          'The loyalty reward reinforces the original goal (healthy eating) rather than undermining it. Instead of "You earned 1000 points — get a free dessert!", the reward is more of the positive behavior: nutrition help and healthy meal plans.',
        principle:
          'Goal-aligned rewards reinforce positive behavior rather than licensing contradictory indulgence',
      },
    ],

    bad: [
      {
        title: 'Exercise-to-Food Licensing Loop',
        description:
          'Fitness app explicitly encouraging indulgent eating after exercise',
        code: `<!-- DON'T DO THIS -->
<div class="workout-complete">
  <h2>Amazing Workout! You Burned 500 Calories!</h2>
  <div class="reward-prompt">
    <p>You've earned a treat! Here's what you can enjoy:</p>
    <div class="food-suggestions">
      <div class="food-card">
        <img src="burger.jpg" alt="Cheeseburger">
        <p>Cheeseburger (520 cal)</p>
        <span class="badge">You earned this!</span>
      </div>
      <div class="food-card">
        <img src="pizza.jpg" alt="Pizza slice">
        <p>Pizza Slice (285 cal)</p>
        <span class="badge">Go ahead!</span>
      </div>
    </div>
  </div>
</div>`,
        explanation:
          'This design creates an explicit moral licensing loop. By framing a 500-calorie workout as permission to eat a 520-calorie cheeseburger, it directly undermines the health goal. The "You earned this!" messaging transforms exercise into a transaction that licenses overeating.',
        principle:
          'Never frame healthy behavior as permission for unhealthy indulgence — it negates the benefit',
      },
      {
        title: 'Carbon Offset as Pollution Permission',
        description:
          'Travel booking site framing carbon offsets as a free pass to fly more',
        code: `<!-- DON'T DO THIS -->
<div class="booking-confirmation">
  <h2>Flight Booked!</h2>
  <div class="offset-prompt">
    <p>Your carbon footprint for this flight: 1.2 tonnes CO2</p>
    <button class="primary">Offset for just $12</button>
    <p class="reassurance">
      Once offset, this flight is carbon-neutral!
      Fly guilt-free knowing you've done your part.
    </p>
  </div>
  <div class="upsell">
    <h3>Why not extend your trip?</h3>
    <p>Add more destinations — you can always offset!</p>
  </div>
</div>`,
        explanation:
          'The "fly guilt-free" messaging and "you can always offset" upsell create a moral licensing cycle where paying $12 becomes permission to fly more. This undermines genuine environmental goals by framing carbon offsets as a get-out-of-jail-free card.',
        principle:
          'Carbon offsets should supplement reduction efforts, not license increased emissions',
      },
      {
        title: 'Charity Donation Licensing Luxury Spending',
        description:
          'E-commerce platform using charitable donations to license premium purchases',
        code: `<!-- DON'T DO THIS -->
<div class="donation-complete">
  <h2>Thank You for Your $50 Donation!</h2>
  <p>You're making a difference. Now make yourself happy too.</p>
  <div class="premium-upsell">
    <h3>You Deserve Something Special</h3>
    <div class="luxury-products">
      <div class="product">
        <img src="luxury-watch.jpg" alt="Premium Watch">
        <p>Luxury Watch - $899</p>
        <span class="badge">Treat yourself — you've earned it</span>
      </div>
    </div>
  </div>
</div>`,
        explanation:
          'Immediately following a charitable donation with luxury product suggestions and "you deserve" messaging explicitly exploits moral licensing. The donation creates a moral credit that the interface encourages spending on an $899 watch.',
        principle:
          'Never use charitable acts as a springboard for luxury upselling — it exploits moral credentials',
      },
    ],

    realWorld: [
      {
        company: 'MyFitnessPal',
        product: 'Calorie Balance Feature',
        description: 'MyFitnessPal shows "calories remaining" after exercise, which increases the daily food budget. Users who exercised frequently reported using the extra calories as permission to eat more, often exceeding the benefit of the exercise.',
        effectiveness: 'somewhat-effective',
        analysis: 'While accurate from a caloric standpoint, the feature creates a moral licensing loop. Users perceive exercise calories as "earned" food credits. More effective designs would decouple exercise tracking from food budgets or show separate goals.',
      },
      {
        company: 'Starbucks',
        product: 'Starbucks Rewards',
        description: 'Starbucks Rewards lets customers earn stars through purchases and redeem them for free drinks, including high-calorie indulgent options. Regular customers who "earn" rewards often choose more indulgent drinks than they normally would.',
        effectiveness: 'effective',
        analysis: 'The loyalty program leverages moral licensing: frequent purchases (virtuous spending) create credits redeemable for indulgent treats. This drives revenue but may not serve health-conscious customers well. The system works as intended for business goals.',
      },
      {
        company: 'Delta Airlines',
        product: 'Carbon Offset Program',
        description: 'Delta offers optional carbon offset purchases during booking. Research suggests that travelers who offset feel less guilty about flying and are more likely to book additional flights, partially negating the environmental benefit.',
        effectiveness: 'somewhat-effective',
        analysis: 'The offset feature demonstrates classic moral licensing in sustainability. While offsets have real environmental value, the framing can license increased flying. More effective designs would pair offsets with information about flight reduction strategies.',
      },
      {
        company: 'Peloton',
        product: 'Post-Ride Achievements',
        description: 'Peloton celebrates workout completions with badges, leaderboard positions, and milestone celebrations. The design focuses on fitness identity and community rather than calorie-based rewards, avoiding the licensing trap.',
        effectiveness: 'very-effective',
        analysis: 'Peloton\'s approach is a positive example. By anchoring rewards to fitness identity (achievements, streaks, community) rather than caloric permission, they maintain motivation without triggering licensing. Users see themselves as "athletes" rather than "calorie earners."',
      },
    ],

    abTests: [
      {
        title: 'Post-Workout Messaging: Identity vs Reward Framing',
        hypothesis:
          'Identity-based messaging after workouts will reduce post-exercise indulgent eating compared to reward-based messaging',
        controlVersion: {
          description:
            'Post-workout screen showing "You burned 450 calories! Treat yourself to something delicious!" with food reward suggestions',
          metrics: {
            conversionRate: '67%',
            indulgentMealRate: '34%',
            weeklyRetention: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Post-workout screen showing "Day 15 — you\'re building a healthier you" with next workout scheduling and recovery tips',
          metrics: {
            conversionRate: '71%',
            indulgentMealRate: '19%',
            weeklyRetention: '68%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Identity-based framing reduced post-workout indulgent eating by 44% and increased weekly retention by 31%. Users reported feeling more motivated to maintain healthy habits when framed as identity-building rather than calorie banking.',
          learnings: [
            'Reward framing creates licensing; identity framing creates commitment',
            'Users who see themselves as "becoming healthy" are less likely to license indulgence',
            'Decoupling exercise from calorie credits prevents the licensing loop',
            'Retention improved because users maintained consistent behavior instead of yo-yoing',
          ],
        },
      },
      {
        title: 'Carbon Offset Framing: Supplementary vs Neutralizing',
        hypothesis:
          'Framing carbon offsets as supplementary to reduction will result in less additional flying than framing them as neutralizing',
        controlVersion: {
          description:
            'Offset purchase screen reading "Make your flight carbon-neutral! Offset and fly guilt-free"',
          metrics: {
            offsetPurchaseRate: '23%',
            additionalFlightsBooked: '2.3 per quarter',
          },
        },
        treatmentVersion: {
          description:
            'Offset purchase screen reading "Offsets help, but reducing flights helps more. Offset this flight and see how to reduce future trips"',
          metrics: {
            offsetPurchaseRate: '19%',
            additionalFlightsBooked: '1.7 per quarter',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the supplementary framing slightly reduced offset purchases (-17%), it significantly reduced additional flight bookings (-26%). Net environmental impact was substantially better because avoided flights save far more carbon than offsets.',
          learnings: [
            'Guilt-free framing licenses more polluting behavior',
            'Honest framing about offset limitations reduces licensing',
            'Slight reduction in offset revenue is offset by genuine environmental improvement',
            'Users who understood offset limitations made more sustainable travel choices overall',
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
        name: 'Reward-After-Virtue Pattern',
        description: 'Indulgent rewards displayed immediately after virtuous action completion',
        howToSpot: 'Look for "treat yourself," "you earned it," or "you deserve this" messaging near achievement displays',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Calorie/Credit Banking Display',
        description: 'Visual systems that show earned credits or calories as spendable currency',
        howToSpot: 'Look for balance-sheet style displays showing "earned" vs "remaining" credits tied to good behavior',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Completion Celebration Excess',
        description: 'Over-the-top celebrations (confetti, badges, fireworks) for partial progress',
        howToSpot: 'Check if achievement animations signal "you\'re done" rather than "you\'re progressing"',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Contradictory Juxtaposition',
        description: 'Healthy achievement metrics placed directly next to indulgent product offers',
        howToSpot: 'Look for exercise stats near food ads, donation confirmations near luxury upsells, or eco-badges near high-emission products',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Offset-as-Permission Framing',
        description: 'Carbon offsets, donations, or other compensatory actions framed as complete absolution',
        howToSpot: 'Look for "guilt-free," "carbon-neutral," or "fully offset" language that implies the negative impact is erased',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Earn-and-Spend Virtue Loop',
        description: 'Systems where good behavior earns credits that are spent on contradictory indulgences',
        indicators: [
          'Point systems linking virtuous and indulgent behaviors',
          'Exercise-to-food calorie conversions',
          'Eco-action points redeemable for non-eco rewards',
          'Savings milestones triggering spending prompts',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Post-Achievement Upsell Pattern',
        description: 'Luxury or indulgent product suggestions appearing immediately after virtuous actions',
        indicators: [
          'Donation confirmation pages with luxury product ads',
          'Post-workout screens with food delivery promotions',
          'Savings achievement popups with spending suggestions',
          '"You deserve it" messaging after charitable or healthy actions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Premature Completion Signal',
        description: 'Celebratory UI elements that make partial progress feel like mission accomplished',
        indicators: [
          'Confetti animations for routine completions',
          '"Mission accomplished" language for partial goals',
          'Trophy or badge awards for minimal effort',
          'Leaderboard peaks displayed without long-term context',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Offset Absolution Pattern',
        description: 'Compensatory payments framed as full neutralization of negative impact',
        indicators: [
          '"Carbon-neutral" labels after offset purchase',
          '"Guilt-free" messaging post-offset',
          'Green checkmarks or badges after offset payment',
          '"You can always offset" promotional language',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the design place indulgent options immediately after virtuous action completion?',
      'Is good behavior framed as earning "credits" that can be "spent" on contradictory actions?',
      'Does achievement messaging signal completion rather than ongoing progress?',
      'Are calorie, carbon, or financial budgets presented as spendable currencies?',
      'Does "treat yourself" or "you deserve it" language appear near achievement displays?',
      'Are carbon offsets or charitable donations framed as full absolution?',
      'Do reward systems offer goal-contradicting rewards for goal-aligned behavior?',
      'Is there a temporal buffer between achievement display and potentially undermining options?',
      'Does the design reinforce user identity or create a transactional virtue economy?',
      'Could the reward or feedback loop undermine the very goal the user is working toward?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in moral licensing (self-licensing effect).

Analyze the provided design for moral licensing patterns. Identify:

1. **Virtue-to-Indulgence Loops**: Where good behavior is rewarded with contradictory indulgences
2. **Credit Accumulation Systems**: Point, calorie, or credit systems that treat virtue as spendable currency
3. **Completion Signaling**: Celebratory elements that signal "you're done" prematurely
4. **Offset Framing**: Whether compensatory actions are framed as permission or supplementary
5. **Reward Alignment**: Whether rewards reinforce or undermine the original positive behavior

For each pattern found:
- Identify the virtuous trigger and the licensed behavior
- Assess whether the design undermines user goals
- Determine if reward framing creates transactional virtue
- Evaluate whether identity-based or progress-based alternatives exist
- Suggest improvements that maintain motivation without licensing

Consider:
- Is the design creating a "moral credit" economy that licenses bad behavior?
- Are achievements framed as destinations or waypoints?
- Do rewards align with or contradict user goals?
- Is there temporal proximity between virtue and indulgence that amplifies licensing?
- Could the design be restructured to use identity-based rather than transactional framing?

Provide actionable recommendations for designs that celebrate progress without licensing regression.`,

    outputSchema: {
      type: 'object',
      properties: {
        licensingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              virtuousTrigger: { type: 'string' },
              licensedBehavior: { type: 'string' },
              severity: { type: 'string' },
              underminesGoal: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'virtuousTrigger',
              'licensedBehavior',
              'underminesGoal',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            licensingRisk: { type: 'number' },
            rewardAlignment: { type: 'number' },
            identityFraming: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'licensingRisk',
            'rewardAlignment',
            'identityFraming',
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
        'licensingPatterns',
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
        title: 'Identify Licensing Risks in Your Product',
        description:
          'Map all places where users complete "good" actions and what follows those actions in the experience',
        example:
          'Audit: After workout completion, user sees calorie count → food delivery ad → "reward yourself" push notification',
        tips: [
          'Look for virtue-indulgence adjacency in your user flows',
          'Map the temporal sequence between achievement and next action',
          'Identify any earn-and-spend credit systems',
        ],
      },
      {
        step: 2,
        title: 'Reframe Achievements as Identity, Not Transaction',
        description:
          'Replace transactional messaging ("you earned X") with identity messaging ("you are becoming X")',
        example:
          'Change "You burned 500 cal — treat yourself!" to "Day 15 — you\'re building consistency"',
        tips: [
          'Use "becoming" language rather than "earning" language',
          'Emphasize streaks and consistency over single achievements',
          'Frame the user as the kind of person who does this regularly',
        ],
      },
      {
        step: 3,
        title: 'Align Rewards with Goals',
        description:
          'Ensure that rewards for good behavior reinforce the same goal rather than contradicting it',
        example:
          'Reward regular exercisers with premium workout content, not fast-food coupons',
        tips: [
          'Ask: "Does this reward support or undermine the user\'s goal?"',
          'Offer more of the positive behavior as the reward',
          'Unlock advanced features or content in the same domain',
        ],
      },
      {
        step: 4,
        title: 'Show Remaining Distance, Not Just Progress',
        description:
          'Always display how far users still have to go alongside how far they have come',
        example:
          'Show "42% to your annual goal — 58% to go" rather than just "42% complete!"',
        tips: [
          'Use progress bars that emphasize the remaining portion',
          'Include next milestone information alongside current achievement',
          'Avoid "mission accomplished" language for partial progress',
        ],
      },
      {
        step: 5,
        title: 'Add Temporal Buffers',
        description:
          'Insert a gap between achievement celebrations and any potentially licensing options',
        example:
          'Show achievement → show next goal → wait 30 min → show optional reward (if any)',
        tips: [
          'The licensing effect is strongest immediately after the virtuous act',
          'Even a brief delay (new screen, new session) reduces licensing',
          'Never show contradictory options on the same screen as achievements',
        ],
      },
    ],

    dos: [
      'Frame achievements as steps in an ongoing journey, not completed transactions',
      'Align rewards with the same goal the user is pursuing',
      'Use identity-based messaging ("You\'re becoming healthier") over transactional ("You earned 500 points")',
      'Show remaining distance alongside progress to prevent premature satisfaction',
      'Separate achievement displays from indulgent options with temporal or contextual buffers',
      'Celebrate consistency and streaks rather than isolated actions',
      'Design offset programs that supplement reduction, not substitute for it',
      'Test whether your reward system creates licensing by measuring post-achievement behavior',
    ],

    donts: [
      'Don\'t frame exercise as earning food calories or "permission to eat"',
      'Don\'t place indulgent product offers immediately after virtuous action completion',
      'Don\'t use "you deserve it" or "treat yourself" messaging after good behavior',
      'Don\'t create point systems where virtue is spent on contradictory indulgences',
      'Don\'t frame carbon offsets as making harmful behavior "guilt-free" or "neutral"',
      'Don\'t signal completion with excessive celebrations for partial progress',
      'Don\'t cross-sell luxury items on charity donation confirmation pages',
      'Don\'t design earn-and-burn loyalty programs that reward healthy points with unhealthy options',
    ],

    bestPractices: [
      {
        title: 'Identity Over Transaction',
        description:
          'Frame all achievements as identity-building rather than credit-accumulating',
        rationale:
          'People who see themselves as "a healthy person" are less likely to license indulgence than those who see themselves as having "earned health credits"',
        example:
          '"You\'re on day 15 — athletes like you keep building" vs "You earned 1500 fitness points!"',
      },
      {
        title: 'Goal-Congruent Rewards Only',
        description:
          'Only offer rewards that reinforce the behavior being rewarded',
        rationale:
          'Contradictory rewards create licensing loops; aligned rewards create positive spirals',
        example:
          'Eco-actions unlock premium eco-content, not shopping discounts. Exercise unlocks advanced workouts, not dessert recipes.',
      },
      {
        title: 'Progress Framing with Distance Remaining',
        description:
          'Always pair progress with how far the user still has to go',
        rationale:
          'Showing only progress creates a "good enough" feeling that licenses complacency',
        example:
          '"42% to your goal — here\'s what closing the last 58% looks like" with next actions',
      },
      {
        title: 'Temporal Separation of Achievement and Reward',
        description:
          'Insert time or interaction steps between celebrating good behavior and offering any rewards',
        rationale:
          'Moral licensing effect peaks immediately after the virtuous act; delay weakens it',
        example:
          'Show workout complete → schedule next workout → recovery tips → (next session) optional reward',
      },
      {
        title: 'Measure Post-Achievement Behavior',
        description:
          'Track what users do in the hours after completing virtuous actions',
        rationale:
          'If users consistently undermine their goals after achievements, your reward design has a licensing problem',
        example:
          'Track calorie intake in the 4 hours after workout completion across messaging variants',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure achievement and reward messaging is semantically distinct',
        implementation:
          'Use proper heading levels and ARIA labels to distinguish between achievement feedback and any subsequent offers, so screen reader users can differentiate',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to distinguish progress from completion',
        implementation:
          'Use text labels, icons, and semantic HTML alongside color to indicate whether a milestone is partial progress or full completion',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label achievement and reward sections',
        implementation:
          'Give achievement sections clear, honest headings like "Your Progress" rather than "Your Rewards" to avoid licensing framing for all users',
      },
    ],

    ethics: [
      {
        concern: 'Goal Undermining',
        severity: 'critical',
        explanation:
          'Designing reward systems that systematically undermine the user\'s stated goals (health, sustainability, savings)',
        mitigation:
          'Audit all reward paths to ensure they reinforce rather than contradict user goals. Never offer indulgent rewards for virtuous behavior.',
      },
      {
        concern: 'Exploiting Virtue for Revenue',
        severity: 'critical',
        explanation:
          'Using charitable donations, eco-actions, or health achievements as springboards for luxury upselling',
        mitigation:
          'Separate virtuous action flows from commercial flows. Never cross-sell on donation or achievement confirmation screens.',
      },
      {
        concern: 'False Absolution',
        severity: 'high',
        explanation:
          'Framing carbon offsets, charitable donations, or other compensatory actions as fully neutralizing negative impact',
        mitigation:
          'Be honest about the limitations of offsets. Frame them as supplementary ("helps, doesn\'t erase") rather than absolving ("guilt-free").',
      },
      {
        concern: 'Manipulative Credit Systems',
        severity: 'high',
        explanation:
          'Creating point or credit systems that psychologically manipulate users into spending "virtue credits" on contradictory behaviors',
        mitigation:
          'Ensure point systems reward continued positive behavior, not indulgent spending. Make earned credits redeemable only for goal-aligned options.',
      },
      {
        concern: 'Premature Completion Signaling',
        severity: 'medium',
        explanation:
          'Over-celebrating partial progress in ways that reduce motivation to continue',
        mitigation:
          'Scale celebrations to actual progress. Reserve major celebrations for genuine milestones. Always show remaining distance.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Credentials and Cognition: How Moral Credentials and Cognitive Consistency Motivate Subsequent Behavior',
        author: 'Monin, B., & Miller, D. T.',
        year: 2001,
        doi: '10.1037/0022-3514.81.1.33',
        description:
          'The foundational paper introducing moral licensing, showing how establishing non-prejudiced credentials licenses subsequent discriminatory behavior',
        type: 'foundational',
      },
      {
        title: 'Moral Self-Licensing: When Being Good Frees Us to Be Bad',
        author: 'Merritt, A. C., Effron, D. A., & Monin, B.',
        year: 2010,
        doi: '10.1111/j.1751-9004.2010.00263.x',
        description:
          'Comprehensive review of moral licensing research, covering mechanisms, boundary conditions, and implications across domains',
        type: 'advanced',
      },
      {
        title: 'The Macroeconomics of Self-Control',
        author: 'Khan, U., & Dhar, R.',
        year: 2006,
        doi: '10.1509/jmkr.43.4.696',
        description:
          'Research on how making virtuous choices in one domain licenses indulgent choices in another, with marketing implications',
        type: 'practical',
      },
      {
        title: 'Moral Licensing and the Green Consumer',
        author: 'Mazar, N., & Zhong, C. B.',
        year: 2010,
        doi: '10.1177/0956797610363538',
        description:
          'Demonstrates how exposure to green products can license less ethical behavior through moral credential accumulation',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'The Willpower Instinct',
        author: 'McGonigal, Kelly',
        year: 2011,
        isbn: '9781583334386',
        description:
          'Covers moral licensing in the context of self-control, with practical strategies for avoiding the licensing trap',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Provides foundational context for understanding how cognitive biases like moral licensing operate in System 1 thinking',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Why "Treating Yourself" After a Good Deed Can Backfire',
        author: 'Harvard Business Review',
        url: 'https://hbr.org/2016/04/why-treating-yourself-after-a-good-deed-can-backfire',
        description:
          'Accessible overview of moral licensing research with implications for business and personal decision-making',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Moral Licensing Effect',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/moral-licensing',
        description:
          'Video explanation of moral licensing with real-world examples and practical applications',
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
      'goal-gradient-effect',
      'loss-aversion',
      'self-serving-bias',
      'licensing-effect',
    ],

    conflicts: [
      'cognitive-dissonance',
      'consistency-principle',
    ],

    confusedWith: [
      'self-serving-bias',
      'ego-depletion',
      'compensatory-behavior',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'green-licensing',
        'health-licensing',
      ],
    },
  },
};
