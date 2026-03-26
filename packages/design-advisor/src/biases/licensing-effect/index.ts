/**
 * LICENSING EFFECT
 *
 * Making a virtuous choice in one domain licenses less virtuous behavior in another.
 * "I was good, so now I can be bad."
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const licensingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'licensing-effect',
    name: 'Licensing Effect',
    aliases: ['Moral Licensing', 'Self-Licensing', 'Moral Credentials Effect'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'decision-making',
      'moral-judgment',
      'self-regulation',
      'reward-systems',
      'sustainability',
      'health',
      'loyalty',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Making a virtuous choice in one domain licenses less virtuous behavior in another.',

    detailed: `The licensing effect (also called moral licensing or self-licensing) is a cognitive bias in which a person who performs an initial "good" act is subsequently more likely to engage in a "bad" act. The prior virtuous behavior establishes moral credentials that the person then feels free to spend, as if morality operated like a bank account with deposits and withdrawals.

This bias is pervasive in product and UX design. Reward systems, gamification, eco-friendly badges, health tracking, and loyalty programs can all inadvertently license users to undermine the very goals the product was designed to support. A fitness app that rewards a workout with a treat suggestion, a sustainability dashboard that shows carbon offset badges alongside increased consumption, or a loyalty program that encourages overuse all trigger the licensing effect.

Designers must recognize that celebrating virtuous behavior can paradoxically enable the opposite behavior. The challenge is to reinforce positive actions without creating a psychological permission slip for negative ones.`,

    psychologyBasis: {
      discoveredBy: 'Monin & Miller; Khan & Dhar',
      year: 2001,
      theory: 'Moral Self-Regulation / Moral Credentials Theory',
      mechanism: `The brain maintains an internal moral ledger. When a person accumulates "moral credits" through good behavior, the psychological cost of subsequent indulgence drops. This happens because:

1. **Moral Credentials**: Past good behavior establishes a positive self-concept, reducing the threat that a subsequent bad act poses to identity
2. **Goal Progress Illusion**: Completing a virtuous sub-goal creates a sense of progress that licenses relaxation of effort toward the overarching goal
3. **Compensatory Reasoning**: People unconsciously treat morality as a balance sheet — good acts create credits that offset future debits
4. **Identity Protection**: Having demonstrated virtue, a person feels less need to signal it again, freeing them to act on other desires
5. **Hedonic Entitlement**: "I earned this" thinking transforms indulgence from guilt-inducing to deserved

The mechanism is largely unconscious — people do not recognize that their prior good behavior is granting them permission to be less virtuous.`,
    },

    realWorldExample: `In a study by Khan & Dhar (2006), participants who first imagined performing a charitable act (volunteering) were subsequently more likely to choose a luxury item over a practical one. The imagined virtuous behavior licensed hedonic self-indulgence. Similarly, Sachdeva et al. (2009) found that people who wrote self-affirming stories about their positive traits donated less money to charity than those who wrote neutral stories — their moral self-concept was already "topped up."`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The licensing effect profoundly impacts how reward systems, sustainability features, health apps, and loyalty programs should be designed. When a product celebrates a user's good behavior, it risks creating psychological permission for the opposite behavior. Designers must:

- Avoid reward mechanics that frame virtuous behavior as "earning" indulgence
- Design sustainability features that sustain momentum rather than license excess consumption
- Build health app flows that don't suggest unhealthy rewards for healthy behavior
- Structure loyalty programs that reinforce continued positive engagement, not overuse
- Frame progress in ways that emphasize ongoing commitment rather than accumulated credit`,

    whenToUse: [
      {
        title: 'Reward System Design',
        scenario:
          'When designing gamification, achievements, or reward mechanics for products',
        example:
          'Frame rewards as milestones on a continuous journey ("Keep building your streak!") rather than earned credits ("You deserve a treat!")',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Sustainability Feature Design',
        scenario: 'When showing users their environmental impact or eco-friendly choices',
        example:
          'Show cumulative positive impact alongside remaining goals, not just an eco-badge that could license more consumption',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Health and Fitness App Design',
        scenario: 'When tracking exercise, diet, or wellness activities',
        example:
          'Celebrate workout completion without suggesting caloric rewards; frame the benefit as energy and mood, not "calories earned"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Loyalty Program Ethics',
        scenario: 'When designing loyalty tiers, points, or membership benefits',
        example:
          'Reward consistent moderate engagement rather than creating points systems that encourage binge purchasing',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Charitable and Social Good Features',
        scenario: 'When incorporating donation matching, volunteering, or CSR features',
        example:
          'Avoid positioning charitable acts as "done" — show ongoing need and continued impact opportunities',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine Achievement Celebration',
        reason:
          'Not all positive reinforcement triggers licensing; meaningful milestones deserve celebration',
        consequence:
          'Over-correcting by never celebrating progress can demotivate users entirely',
        alternative:
          'Celebrate achievements while framing them as motivation for the next goal, not as earned indulgence',
      },
      {
        title: 'Early Onboarding',
        reason:
          'New users need encouragement and positive feedback to build habits',
        consequence:
          'Withholding positive reinforcement during onboarding can reduce adoption and engagement',
        alternative:
          'Provide positive feedback that connects actions to long-term identity ("You are becoming a consistent runner") rather than short-term credits',
      },
      {
        title: 'Low-Stakes Contexts',
        reason:
          'In low-stakes entertainment or social contexts, licensing rarely causes real harm',
        consequence:
          'Over-engineering against licensing in casual contexts adds unnecessary friction',
        alternative:
          'Focus licensing-aware design on high-stakes domains: health, finance, sustainability',
      },
      {
        title: 'Intrinsic Motivation Contexts',
        reason:
          'Users driven by intrinsic motivation are less susceptible to licensing',
        consequence:
          'Excessive guardrails can undermine autonomy and intrinsic drive',
        alternative:
          'Support intrinsic motivation with mastery-oriented feedback rather than external reward framing',
      },
    ],

    commonMistakes: [
      {
        title: 'Calorie-Earn-and-Burn Framing',
        description:
          'Fitness apps showing "calories earned" or suggesting food rewards after exercise',
        why: 'Frames exercise as earning permission to eat more, undermining health goals through licensing',
        fix: 'Frame exercise benefits in terms of energy, mood, strength, or longevity — not calories to spend',
      },
      {
        title: 'Eco-Badge Complacency',
        description:
          'Awarding sustainability badges or carbon offset certificates without ongoing engagement',
        why: 'Users feel their environmental duty is "done" and may increase consumption elsewhere',
        fix: 'Show continuous environmental impact dashboards with evolving goals rather than one-time badges',
      },
      {
        title: 'Loyalty Point Bingeing',
        description:
          'Points systems that encourage users to buy more to earn rewards, then spend rewards on even more',
        why: 'The "I earned these points" mentality licenses spending beyond what users would otherwise do',
        fix: 'Cap reward accumulation, offer experience-based rewards, or tie rewards to sustained moderation',
      },
      {
        title: 'Virtue Signaling Without Follow-Through',
        description:
          'Letting users display charitable badges or social good participation without ensuring meaningful action',
        why: 'Displaying virtue signals satisfies the moral identity need without requiring actual ongoing behavior',
        fix: 'Tie visible badges to ongoing participation, with expiration or renewal requirements',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how progress, rewards, and achievements are displayed relative to ongoing goals',
        examples: [
          'Placing achievement badges prominently while burying remaining goals can trigger licensing',
          'Side-by-side layout of "done" vs "to do" maintains balanced perspective',
          'Progress bars that show remaining distance rather than just completed distance reduce licensing',
          'Goal-oriented layouts that always point forward sustain motivation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing of achievements and rewards directly affects licensing activation',
        examples: [
          '"You earned this!" language triggers licensing more than "Great progress!"',
          'Emphasizing ongoing commitment over past achievement in headings',
          'Small, celebratory text vs large, "mission accomplished" declarations',
          'Future-oriented language ("Next milestone: ...") reduces licensing risk',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color associations in reward and achievement systems affect how "done" or "earned" a goal feels',
        examples: [
          'Green checkmarks signal completion and can trigger "I am done" thinking',
          'Gold/premium achievement colors amplify the "I deserve this" effect',
          'Using cooler, calmer tones for progress indicators reduces the dopamine-reward association',
          'Color gradients showing ongoing progress rather than binary complete/incomplete states',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Reward interactions and celebration animations are the primary licensing triggers in interfaces',
        examples: [
          'Confetti animations and celebration screens create a "mission accomplished" sensation',
          'Unlock mechanics frame access as earned entitlement',
          'Auto-suggested rewards after virtuous actions directly license indulgence',
          'Streak mechanics can license "cheat days" or breaks',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing is the most direct lever for either triggering or preventing licensing',
        examples: [
          '"You deserve a treat" copy directly licenses indulgence after virtuous behavior',
          '"Your journey continues" copy maintains forward momentum without licensing',
          'Testimonials showing sustained commitment (not one-time heroics) model the right behavior',
          'Messaging that connects current action to future identity reduces licensing',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible reward and achievement designs must avoid licensing in all modalities',
        examples: [
          'Screen reader announcements of achievements should include next-step context',
          'Audio reward cues (dings, fanfares) should be brief, not celebratory climaxes',
          'Haptic feedback for achievements should signal "checkpoint" not "finish line"',
          'Alt text for achievement icons should describe ongoing progress, not finality',
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
        title: 'Journey-Framed Fitness Progress',
        description:
          'Fitness app that celebrates workouts by connecting them to long-term identity rather than earning indulgence',
        code: `<div class="workout-complete">
  <h3>Workout Complete!</h3>
  <div class="progress-journey">
    <div class="milestone reached">
      <span class="label">Today</span>
      <p>30-min run completed</p>
    </div>
    <div class="journey-line"></div>
    <div class="milestone next">
      <span class="label">Next milestone</span>
      <p>5 consecutive weeks of 3+ workouts</p>
    </div>
  </div>
  <p class="identity-message">
    <strong>You're building the habit of a runner.</strong>
    Consistency matters more than any single session.
  </p>
  <div class="benefits">
    <span class="benefit">+Energy</span>
    <span class="benefit">+Mood</span>
    <span class="benefit">+Sleep quality</span>
  </div>
</div>`,
        explanation:
          'Instead of "You burned 400 calories — enjoy a treat!", this frames the workout as part of an ongoing identity journey. Benefits are shown as intrinsic (energy, mood, sleep), not as earned credits to spend.',
        principle:
          'Identity-based framing sustains motivation without licensing indulgence',
        metrics: {
          before: '38% of users reported eating more after workouts (calorie-earned framing)',
          after: '14% reported eating more after workouts (journey framing)',
          improvement: '63% reduction in post-workout compensatory eating',
        },
      },
      {
        title: 'Continuous Sustainability Dashboard',
        description:
          'Eco-impact tracker that shows ongoing environmental footprint, not just offset badges',
        code: `<div class="eco-dashboard">
  <h3>Your Environmental Impact</h3>
  <div class="impact-continuous">
    <div class="metric">
      <span class="value">2.4 tons</span>
      <span class="label">CO2 offset this year</span>
    </div>
    <div class="metric remaining">
      <span class="value">8.1 tons</span>
      <span class="label">Remaining annual footprint</span>
    </div>
  </div>
  <div class="trend-chart">
    <!-- Line chart showing monthly footprint trend -->
    <p class="trend-note">Your footprint decreased 12% since January.
    Keep this pace to reach your annual goal.</p>
  </div>
  <div class="next-actions">
    <h4>Next impact opportunities</h4>
    <ul>
      <li>Switch to renewable energy provider (-1.8 tons/year)</li>
      <li>Reduce air travel by one trip (-0.9 tons)</li>
    </ul>
  </div>
</div>`,
        explanation:
          'Rather than awarding a "Carbon Neutral" badge (which licenses more consumption), this dashboard shows the full picture: offsets alongside remaining footprint, trends, and next actions. The user never feels "done."',
        principle:
          'Show ongoing gap between current state and goal to prevent premature satisfaction',
      },
      {
        title: 'Moderation-Oriented Loyalty Rewards',
        description:
          'Loyalty program that rewards consistency and moderation rather than volume',
        code: `<div class="loyalty-status">
  <h3>Your Membership</h3>
  <div class="consistency-badge">
    <span class="streak">12 weeks</span>
    <span class="label">of balanced engagement</span>
  </div>
  <div class="reward-options">
    <h4>This month's rewards</h4>
    <div class="reward experience">
      <span class="icon">&#x1f3b6;</span>
      <p><strong>Early access to new features</strong></p>
      <p class="note">Exclusive preview for consistent members</p>
    </div>
    <div class="reward experience">
      <span class="icon">&#x1f4da;</span>
      <p><strong>Expert workshop invitation</strong></p>
      <p class="note">Deepen your skills, not your spending</p>
    </div>
  </div>
  <p class="philosophy">Rewards for being a thoughtful member,
  not for spending more.</p>
</div>`,
        explanation:
          'This loyalty program rewards consistency and engagement quality, not purchase volume. Rewards are experiences and access rather than discounts on more purchases, avoiding the licensing loop of "spend to earn to spend more."',
        principle:
          'Experience-based rewards for consistent engagement avoid the earn-spend licensing cycle',
      },
    ],

    bad: [
      {
        title: 'Calorie-as-Currency Fitness App',
        description:
          'Fitness app that frames exercise as earning calories to spend on food',
        code: `<!-- DON'T DO THIS -->
<div class="workout-reward">
  <h2>Amazing Workout!</h2>
  <div class="calories-earned">
    <span class="big-number">487</span>
    <span class="label">calories burned!</span>
  </div>
  <div class="reward-suggestion">
    <p>You earned a treat! Here are some options:</p>
    <div class="treat">
      <img src="pizza.jpg" alt="Pizza slice">
      <p>Pizza slice (285 cal) — You can afford it!</p>
    </div>
    <div class="treat">
      <img src="icecream.jpg" alt="Ice cream">
      <p>Ice cream (320 cal) — You still have calories to spare!</p>
    </div>
  </div>
</div>`,
        explanation:
          'This directly licenses unhealthy eating by framing exercise calories as a currency to spend on junk food. Research shows this calorie-earn-burn framing leads to compensatory eating that can exceed the calories burned, completely undermining the fitness goal.',
        principle:
          'Never frame healthy behavior as earning credits for unhealthy behavior',
      },
      {
        title: 'One-Time Carbon Offset Badge',
        description:
          'Sustainability feature that awards a permanent eco-badge for a single carbon offset purchase',
        code: `<!-- DON'T DO THIS -->
<div class="eco-profile">
  <div class="badge-earned">
    <img src="green-hero-badge.png" alt="Green Hero">
    <h3>You're Carbon Neutral!</h3>
    <p>You offset 2 tons of CO2. The planet thanks you!</p>
  </div>
  <div class="profile-badge">
    <span class="permanent-badge">Eco-Champion</span>
    <p>This badge is displayed on your public profile forever.</p>
  </div>
</div>`,
        explanation:
          'A permanent "Carbon Neutral" badge for a one-time offset purchase signals the environmental job is done. Research on licensing shows this can lead to increased consumption elsewhere — users feel their eco-duty is fulfilled and stop considering their ongoing footprint.',
        principle:
          'Permanent virtue badges for one-time acts license ongoing unsustainable behavior',
      },
      {
        title: 'Volume-Based Loyalty Rewards',
        description:
          'Loyalty program that rewards spending more with discounts to spend even more',
        code: `<!-- DON'T DO THIS -->
<div class="loyalty-upsell">
  <h2>You're SO close to Gold Status!</h2>
  <div class="progress">
    <div class="bar" style="width: 85%"></div>
    <p>Spend just $127 more this month to unlock Gold!</p>
  </div>
  <div class="gold-perks">
    <h3>Gold Members get:</h3>
    <ul>
      <li>20% off all future purchases</li>
      <li>Free expedited shipping</li>
      <li>Exclusive flash sales</li>
    </ul>
  </div>
  <button class="cta">Shop Now to Reach Gold!</button>
</div>`,
        explanation:
          'This creates a double licensing loop: spend more to earn status, then use status to justify spending even more. The "You are SO close" framing pressures users into unnecessary purchases, and Gold perks (discounts, sales) license continued overspending.',
        principle:
          'Volume-based loyalty creates a licensing spiral of earning and spending',
      },
    ],

    realWorld: [
      {
        company: 'Carbon Offset Services',
        product: 'Flight Carbon Offsets',
        description: 'Airlines and travel platforms offer carbon offset purchases at checkout. Research shows that buying offsets can license travelers to fly more frequently, as the offset purchase alleviates environmental guilt without reducing actual emissions.',
        effectiveness: 'somewhat-effective',
        analysis: 'Carbon offsets create a textbook licensing effect: one virtuous act (paying for offsets) licenses the continuation or increase of the behavior the offset was meant to address (flying). Net environmental impact may be neutral or negative due to licensing.',
      },
      {
        company: 'Organic Food Retailers',
        product: 'Organic Labels and Branding',
        description: 'Research by Schuldt & Schwarz (2010) showed that consumers perceived organic cookies as lower-calorie than conventional cookies and felt licensed to eat more. The "organic" halo created moral credentials that licensed overconsumption.',
        effectiveness: 'somewhat-effective',
        analysis: 'The "organic" label triggers licensing by providing health/virtue credentials. Consumers feel their virtuous food choice (organic) allows them to consume more quantity, undermining health goals.',
      },
      {
        company: 'Starbucks',
        product: 'Starbucks Rewards',
        description: 'The Starbucks Rewards program gives stars for purchases, redeemable for free drinks. The "free" reward can license choosing more expensive, higher-calorie drinks than the customer would normally buy, since the reward feels "earned" and "free."',
        effectiveness: 'effective',
        analysis: 'While highly effective as a business strategy, the program exhibits licensing: earning a free drink through consistent spending licenses choosing a premium, indulgent option. The earned-credit framing is a textbook licensing trigger.',
      },
      {
        company: 'Various Fitness Apps',
        product: 'Post-Workout Reward Suggestions',
        description: 'Many fitness apps display calories burned prominently and some suggest food rewards. Studies show users of calorie-tracking apps that frame exercise as "earning" calories tend to compensate by eating more, reducing or eliminating the caloric deficit from exercise.',
        effectiveness: 'somewhat-effective',
        analysis: 'The calorie-as-currency model is one of the most studied examples of licensing in product design. Users treat burned calories as earned credits, licensing compensatory eating that can fully negate exercise benefits.',
      },
    ],

    abTests: [
      {
        title: 'Fitness App: Calorie-Earned vs Journey Framing',
        hypothesis:
          'Journey-framed workout completion will lead to less compensatory eating than calorie-earned framing',
        controlVersion: {
          description:
            'Post-workout screen showing "487 calories burned! You earned a treat!" with food suggestions',
          metrics: {
            conversionRate: 'N/A',
            compensatoryEating: '38% reported eating more after workout',
            weeklyConsistency: '2.1 workouts/week average',
          },
        },
        treatmentVersion: {
          description:
            'Post-workout screen showing "Great run! You are building the habit of a runner. Next milestone: 5 consecutive weeks." with energy/mood/sleep benefits',
          metrics: {
            conversionRate: 'N/A',
            compensatoryEating: '14% reported eating more after workout',
            weeklyConsistency: '3.4 workouts/week average',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Journey framing reduced compensatory eating by 63% and increased workout consistency by 62%. Users in the treatment group reported stronger identification as "someone who exercises regularly" rather than "someone who earned a treat."',
          learnings: [
            'Identity-based framing prevents licensing better than achievement-based framing',
            'Showing next milestones maintains forward momentum',
            'Intrinsic benefit framing (mood, energy) avoids the earn-spend mental model',
            'Long-term consistency improved because users did not feel "done" after each session',
          ],
        },
      },
      {
        title: 'Sustainability Dashboard: Badge vs Continuous Impact',
        hypothesis:
          'Continuous impact dashboards will sustain eco-friendly behavior better than one-time achievement badges',
        controlVersion: {
          description:
            'Eco-badge awarded after first carbon offset purchase: "You are Carbon Neutral!" displayed on profile permanently',
          metrics: {
            conversionRate: '23% purchased offset',
            sustainedEngagement: '8% took additional eco-actions in next 90 days',
            consumptionChange: '+7% increase in overall purchases',
          },
        },
        treatmentVersion: {
          description:
            'Continuous eco-impact dashboard showing offsets, remaining footprint, trend line, and next action suggestions — no permanent badge',
          metrics: {
            conversionRate: '19% purchased offset',
            sustainedEngagement: '34% took additional eco-actions in next 90 days',
            consumptionChange: '-3% decrease in overall purchases',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the badge variant had slightly higher initial offset purchases (badge desirability), the continuous dashboard produced 4x more sustained eco-actions and actually reduced overall consumption. The badge variant saw a 7% increase in purchases, suggesting licensing.',
          learnings: [
            'Permanent badges signal "done" and license subsequent indulgence',
            'Continuous dashboards maintain awareness of ongoing impact',
            'Showing remaining footprint prevents premature satisfaction',
            'Next-action suggestions channel motivation into continued behavior change',
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
        name: 'Earn-and-Spend Language',
        description:
          'Copy that frames virtuous behavior as "earning" credits, treats, or permissions',
        howToSpot:
          'Look for "You earned...", "You deserve...", "Treat yourself!", "You can afford..." language after positive actions',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Completion Badges',
        description:
          'Permanent achievement badges for one-time virtuous acts that signal the job is done',
        howToSpot:
          'Check for permanent badges, trophies, or status labels awarded for single actions without renewal requirements',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Reward Suggestions After Virtue',
        description:
          'Interface suggesting indulgent rewards immediately after a virtuous action',
        howToSpot:
          'Look for food suggestions after exercise, spending prompts after saving, or consumption prompts after eco-actions',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Credit-Based Progress Displays',
        description:
          'Progress systems that frame accumulated points or credits as a balance to spend',
        howToSpot:
          'Check for "balance", "credits", "points to spend", or "rewards available" framing in progress displays',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Mission-Accomplished Celebrations',
        description:
          'Excessive celebration animations that signal finality rather than ongoing progress',
        howToSpot:
          'Look for confetti, fireworks, "You did it!" screens, or triumphant animations without next-step context',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Virtue-Then-Indulgence Pattern',
        description: 'A virtuous action is immediately followed by a prompt for indulgent behavior',
        indicators: [
          'Workout completion followed by food reward suggestions',
          'Eco-action followed by shopping prompts',
          'Saving money followed by "treat yourself" messaging',
          'Charitable donation followed by premium product suggestions',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Moral Credit Accumulation Pattern',
        description: 'System tracks and displays virtue as a spendable currency',
        indicators: [
          'Points or credits earned for good behavior',
          '"Balance" language for moral or health accounts',
          'Progress bars that fill up and then "unlock" rewards',
          'Tier systems based on accumulated virtuous actions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'One-Time Virtue Badge Pattern',
        description: 'Permanent recognition for a single virtuous act, signaling completeness',
        indicators: [
          'Permanent profile badges for one-time actions',
          '"Carbon Neutral" or "Eco-Friendly" labels after single offsets',
          'Achievement trophies without expiration or renewal',
          '"Mission Complete" messaging for ongoing goals',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Compensatory Reward Pattern',
        description: 'Reward systems that offer the opposite of the virtuous behavior as a reward',
        indicators: [
          'Unhealthy food rewards for fitness achievements',
          'Spending rewards for saving milestones',
          'Consumption rewards for sustainability actions',
          'Indulgence as compensation for discipline',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the interface suggest indulgent behavior immediately after a virtuous action?',
      'Are rewards framed as "earned" credits to spend, rather than milestones on a journey?',
      'Do achievement badges signal finality ("done!") rather than ongoing commitment?',
      'Does the reward system create a cycle where earning leads to spending that requires more earning?',
      'Is virtuous behavior presented as a one-time act or an ongoing identity?',
      'Could the reward framing undermine the very goal the product is designed to support?',
      'Are celebration moments followed by next-step guidance or by indulgence suggestions?',
      'Does the loyalty program reward volume/spending or consistency/moderation?',
      'Do sustainability features show ongoing footprint or just one-time offsets?',
      'Is there evidence of compensatory behavior in user analytics after reward moments?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the licensing effect (moral licensing / self-licensing).

Analyze the provided design for licensing effect patterns. Identify:

1. **Virtue-Indulgence Sequences**: Places where a good action is followed by a prompt for indulgent behavior
2. **Earn-and-Spend Framing**: Language or mechanics that treat morality, health, or sustainability as a bank account
3. **Completion Signals**: Badges, celebrations, or messaging that signal "you're done" for ongoing goals
4. **Compensatory Reward Design**: Rewards that undermine the very goal the virtuous behavior was supposed to support
5. **Identity vs Credit Framing**: Whether the system builds lasting identity or temporary moral credits

For each pattern found:
- Identify the virtuous action and the licensed indulgence
- Assess the severity of the licensing risk
- Determine whether the reward framing undermines the product's core value proposition
- Evaluate the ethical implications
- Suggest alternative framing that sustains motivation without licensing

Consider:
- Does the celebration of good behavior create permission for bad behavior?
- Are rewards aligned with or contradictory to the product's goals?
- Is progress framed as ongoing identity or accumulated credits?
- Could users end up worse off because of the reward system?
- Are there feedback loops that amplify licensing (earn → spend → earn more → spend more)?

Provide actionable recommendations for reward systems that reinforce rather than undermine virtuous behavior.`,

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
              virtuousAction: { type: 'string' },
              licensedBehavior: { type: 'string' },
              severity: { type: 'string' },
              underminesGoal: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'virtuousAction',
              'licensedBehavior',
              'severity',
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
        title: 'Audit Existing Reward Flows',
        description:
          'Map every place where virtuous behavior is followed by a reward, celebration, or suggestion',
        example:
          'Identify: workout → "calories earned" → food suggestion as a licensing chain',
        tips: [
          'Trace the full user flow from virtuous action to next prompt',
          'Check what language follows achievement moments',
          'Look for earn-and-spend mechanics in gamification systems',
        ],
      },
      {
        step: 2,
        title: 'Reframe Rewards as Identity',
        description:
          'Shift reward language from "you earned this" (credit) to "you are becoming this" (identity)',
        example:
          'Change "487 calories burned — treat yourself!" to "You are building the habit of a runner"',
        tips: [
          'Use identity language: "You are a consistent exerciser"',
          'Connect actions to long-term self-concept',
          'Avoid transactional language (earn, spend, deserve, afford)',
        ],
      },
      {
        step: 3,
        title: 'Show Ongoing Progress, Not Completion',
        description:
          'Design progress indicators that always point forward, never signal "done"',
        example:
          'Replace "Goal Complete!" badge with "12 weeks of consistency — next milestone: 16 weeks"',
        tips: [
          'Always show the next milestone after celebrating the current one',
          'Use progress bars that extend rather than fill and stop',
          'Frame achievements as checkpoints, not finish lines',
        ],
      },
      {
        step: 4,
        title: 'Align Rewards with Goals',
        description:
          'Ensure rewards reinforce the same behavior they celebrate, not the opposite',
        example:
          'Reward healthy eating streaks with recipe access, not dessert coupons',
        tips: [
          'Test: "Does this reward encourage more of the virtuous behavior?"',
          'Choose experience rewards over consumption rewards',
          'Avoid compensatory rewards (unhealthy treats for healthy acts)',
        ],
      },
      {
        step: 5,
        title: 'Measure for Compensatory Behavior',
        description:
          'Track whether users exhibit licensing behavior after reward moments',
        example:
          'Monitor: Do users who earn eco-badges subsequently increase their carbon footprint?',
        tips: [
          'Compare behavior before and after reward moments',
          'Look for compensatory patterns in adjacent domains',
          'A/B test different reward framings against licensing metrics',
        ],
      },
    ],

    dos: [
      'Frame achievements as milestones on an ongoing journey, not as completed missions',
      'Use identity-based language ("You are becoming...") rather than credit-based ("You earned...")',
      'Always show the next goal alongside the current achievement',
      'Align rewards with the behavior being reinforced, not its opposite',
      'Design continuous progress indicators rather than binary complete/incomplete states',
      'Reward consistency and moderation rather than volume or intensity',
      'Measure for compensatory behavior after reward moments',
      'Make ongoing impact visible rather than awarding permanent completion badges',
    ],

    donts: [
      'Don\'t suggest indulgent rewards immediately after virtuous behavior',
      'Don\'t frame health, sustainability, or moral actions as credits to spend',
      'Don\'t award permanent badges for one-time virtuous acts on ongoing goals',
      'Don\'t create earn-and-spend loops that escalate consumption',
      'Don\'t use "You deserve this!" language after good behavior',
      'Don\'t design reward systems where the reward undermines the original goal',
      'Don\'t celebrate progress with finality — always point to what comes next',
      'Don\'t assume positive reinforcement is always good; it can license the opposite',
    ],

    bestPractices: [
      {
        title: 'Identity Over Credits',
        description:
          'Frame virtuous behavior as building a lasting identity, not accumulating spendable credits',
        rationale:
          'Identity-based motivation sustains behavior; credit-based motivation licenses its reversal',
        example:
          '"You are a consistent runner" instead of "You earned 487 calorie credits"',
      },
      {
        title: 'Aligned Rewards',
        description:
          'Ensure rewards reinforce the same type of behavior they celebrate',
        rationale:
          'Misaligned rewards (unhealthy treats for healthy acts) trigger licensing and undermine goals',
        example:
          'Reward a fitness streak with a free yoga class or workout playlist, not a pizza coupon',
      },
      {
        title: 'Continuous Impact Dashboards',
        description:
          'Show ongoing impact and remaining goals rather than one-time completion status',
        rationale:
          'Continuous visibility prevents the "I am done" sensation that licenses regression',
        example:
          'Eco-dashboard showing monthly footprint trend + remaining gap, not just a "Carbon Neutral" badge',
      },
      {
        title: 'Forward-Pointing Celebrations',
        description:
          'Every celebration moment should include the next milestone or goal',
        rationale:
          'Celebrations without forward direction create a psychological endpoint that licenses indulgence',
        example:
          '"Week 8 complete! Your next milestone: 12 weeks of consistency — only 4 to go!"',
      },
      {
        title: 'Expiring Virtue Signals',
        description:
          'If using badges, tie them to ongoing behavior with renewal requirements',
        rationale:
          'Permanent badges for one-time acts create lasting licensing; renewable badges sustain engagement',
        example:
          '"Active Eco-Member" badge that requires monthly eco-actions to maintain',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure reward and progress information is semantically structured',
        implementation:
          'Use proper ARIA roles for progress indicators, ensure reward notifications include next-step context for screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to signal completion or progress',
        implementation:
          'Combine green checkmarks with text labels and ARIA states. Use icons plus text for achievement status.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Announce achievement and progress updates accessibly',
        implementation:
          'Use ARIA live regions for achievement notifications that include both the celebration and the next-step context, preventing a "done" impression.',
      },
    ],

    ethics: [
      {
        concern: 'Undermining User Goals',
        severity: 'critical',
        explanation:
          'Reward systems that license behavior contradicting the product\'s stated purpose (e.g., fitness app licensing unhealthy eating)',
        mitigation:
          'Audit all reward flows to ensure rewards reinforce, not undermine, the user\'s goal. Remove compensatory reward suggestions.',
      },
      {
        concern: 'Eco-Washing Through Licensing',
        severity: 'high',
        explanation:
          'Sustainability features that make users feel "done" after minimal action, licensing increased consumption',
        mitigation:
          'Show continuous environmental impact, avoid permanent eco-badges for one-time offsets, always display remaining footprint alongside offsets.',
      },
      {
        concern: 'Loyalty Program Exploitation',
        severity: 'high',
        explanation:
          'Loyalty programs designed to create earn-spend cycles that escalate user spending beyond their intent',
        mitigation:
          'Reward consistency and moderation. Offer experience-based rewards. Cap point accumulation. Avoid "spend more to earn more" mechanics.',
      },
      {
        concern: 'Health App Licensing',
        severity: 'critical',
        explanation:
          'Health and fitness apps that license unhealthy compensatory behavior through calorie-as-currency or treat-yourself framing',
        mitigation:
          'Frame exercise benefits as intrinsic (energy, mood, strength). Never suggest food rewards. Use identity-based rather than credit-based progress framing.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Licensing Effect in Consumer Choice',
        author: 'Khan, U., & Dhar, R.',
        year: 2006,
        doi: '10.1509/jmkr.43.2.259',
        description:
          'Foundational paper showing that prior virtuous behavior (imagined charity) licenses hedonic consumer choices over utilitarian ones',
        type: 'foundational',
      },
      {
        title: 'Sinning Saints and Saintly Sinners: The Paradox of Moral Self-Regulation',
        author: 'Sachdeva, S., Iliev, R., & Medin, D. L.',
        year: 2009,
        doi: '10.1111/j.1467-9280.2009.02326.x',
        description:
          'Demonstrated that affirming one\'s moral identity reduces subsequent moral behavior (moral self-regulation as a balance sheet)',
        type: 'foundational',
      },
      {
        title: 'Moral Credentials and the Expression of Prejudice',
        author: 'Monin, B., & Miller, D. T.',
        year: 2001,
        doi: '10.1037/0022-3514.81.1.33',
        description:
          'Early research showing that establishing non-prejudiced credentials licenses subsequent prejudiced behavior',
        type: 'foundational',
      },
      {
        title: 'Do Green Products Make Us Better People?',
        author: 'Mazar, N., & Zhong, C.-B.',
        year: 2010,
        doi: '10.1177/0956797610363538',
        description:
          'Showed that purchasing green products can license subsequent less ethical behavior, including lying and stealing in experiments',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Willpower Instinct',
        author: 'McGonigal, Kelly',
        year: 2011,
        isbn: '9781583334386',
        description:
          'Extensive discussion of moral licensing in the context of self-control, with practical strategies for avoiding it',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of cognitive biases including the mechanisms underlying moral self-regulation',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Moral Licensing: When Being Good Frees Us to Be Bad',
        author: 'Merritt, A. C., Effron, D. A., & Monin, B.',
        url: 'https://doi.org/10.1177/1948550610385453',
        description:
          'Comprehensive review of moral licensing research with implications for behavioral design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Licensing Effect: Why Being Good Can Make You Bad',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=licensing-effect',
        description:
          'Accessible overview of the licensing effect with everyday examples',
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
      'goal-gradient-effect', // Approaching a goal can license slacking after reaching it
      'loss-aversion', // Loss framing can counteract licensing by showing what regression costs
      'self-serving-bias', // People interpret their licensing as rational, not biased
      'reward-substitution', // Rewards can redirect motivation toward the reward, away from the goal
    ],

    conflicts: [
      'consistency-principle', // Desire to be consistent can counteract licensing
      'identity-bias', // Strong identity commitment resists licensing
    ],

    confusedWith: [
      'ego-depletion', // Both involve self-regulation failure, but through different mechanisms
      'present-bias', // Both lead to indulgence, but licensing requires a prior virtuous act
      'halo-effect', // Both involve spillover from positive to negative, but halo is perceptual, licensing is behavioral
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'moral-licensing',
        'green-licensing',
        'health-licensing',
      ],
    },
  },
};
