/**
 * MAGICAL THINKING
 *
 * We believe our thoughts, wishes, or rituals can influence unrelated outcomes.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const magicalThinking: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'magical-thinking',
    name: 'Magical Thinking',
    aliases: ['Superstitious Thinking', 'Illusory Causation', 'Ritual Behavior'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'superstition',
      'ritual',
      'illusion-of-control',
      'gamification',
      'random-reward',
      'engagement',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We believe our thoughts, wishes, or rituals can influence unrelated outcomes.',

    detailed: `Magical thinking is a cognitive bias in which people believe that their internal states -- thoughts, wishes, emotions, or ritualized behaviors -- can causally influence external events, even when no plausible mechanism connects them. It is the basis of superstition, lucky charms, and ritualized routines performed "just in case."

This bias is deeply rooted in associative learning: if an action is followed by a desired outcome, the brain encodes a causal link regardless of whether one truly exists. The pattern is reinforced by intermittent reinforcement schedules -- the same mechanism that makes slot machines compelling.

In UX and product design, magical thinking manifests whenever users develop personal rituals around apps, attribute success to lucky timing, or engage with random-reward mechanics that feel responsive to their behavior. Designers can harness this understanding to build engaging, habit-forming experiences, but must be careful not to exploit the tendency toward compulsive or superstitious behavior.`,

    psychologyBasis: {
      discoveredBy: 'Paul Rozin, Emily Pronin, and others',
      year: 1986,
      theory: 'Laws of Sympathetic Magic / Illusory Causation',
      mechanism: `Magical thinking arises from several overlapping cognitive mechanisms:

1. **Associative Learning**: The brain links co-occurring events as causal, even when the connection is coincidental -- one successful "pull to refresh" after a ritual embeds the ritual as causally relevant
2. **Illusion of Control**: People overestimate their personal influence over random or uncontrollable events, especially when they can perform an action (tap, swipe, blow) before the outcome
3. **Contagion Heuristic**: Objects or actions that have been in contact with a source retain properties of that source -- a "lucky" device, a specific login routine
4. **Pattern Completion**: The brain aggressively fills in causal narratives for random sequences, interpreting streaks, hot hands, or dry spells as meaningful signals
5. **Emotional Reasoning**: Wanting something strongly enough makes it feel more likely; wishing and hoping feel like they contribute to the outcome

These mechanisms are automatic, affect adults as well as children, and persist even when people intellectually acknowledge the irrationality.`,
    },

    realWorldExample: `In Rozin et al.'s (1986) classic studies, participants refused to eat fudge shaped like dog feces or drink juice that had touched a sterilized cockroach -- even though they knew the items were safe. The mere symbolic resemblance to something disgusting triggered avoidance, demonstrating that magical associations override rational knowledge. Pronin et al. (2006) showed that Harvard students who stuck pins in a voodoo doll of a confederate who had been rude to them genuinely believed, at a measurable level, that their action contributed to the confederate's subsequent headache.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Magical thinking affects how users perceive causation, control, and luck within digital interfaces. Designers can leverage this to:

- Build habit loops through ritual-like interaction patterns that feel personally meaningful
- Increase engagement with variable-ratio reward schedules (loot boxes, mystery drops)
- Foster a sense of personal control through interactive ceremonies (shake to shuffle, blow to cool)
- Create emotional attachment through "lucky" items, streaks, and personal totems
- Drive retention via superstitious routines users develop around the product`,

    whenToUse: [
      {
        title: 'Gamification and Reward Systems',
        scenario:
          'When designing engagement mechanics with intermittent rewards',
        example:
          'A "daily mystery box" that users open with a tap-and-hold gesture, giving them a sense of personal ritual around revealing their reward',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Streak and Ritual Reinforcement',
        scenario: 'When encouraging daily habits or consistent engagement',
        example:
          'A meditation app that shows a growing flame icon for consecutive days, making users feel their streak has a "life" they must protect',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Interactive Ceremonies',
        scenario: 'When a user action can precede a random or computed outcome',
        example:
          'Letting users "shake" their phone to shuffle a playlist, creating a physical ritual around the randomization',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Personalization Rituals',
        scenario: 'When users customize or configure their experience',
        example:
          'Allowing users to choose a "lucky color" or mascot during onboarding that appears throughout the product, creating personal attachment',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Delight Moments',
        scenario: 'When adding surprise and wonder to mundane interactions',
        example:
          'Easter eggs triggered by specific gesture sequences that make users feel they discovered something personal and secret',
        impact: ImpactLevel.LOW,
      },
    ],

    whenToAvoid: [
      {
        title: 'Financial and Gambling Contexts',
        reason:
          'Reinforcing magical thinking around money encourages reckless risk-taking',
        consequence:
          'Users develop superstitious betting patterns, leading to financial harm and potential addiction',
        alternative:
          'Present clear probability information and outcome statistics; never imply user actions influence random financial outcomes',
      },
      {
        title: 'Health and Medical Decisions',
        reason:
          'Users may believe rituals or wishes substitute for medical treatment',
        consequence:
          'Delayed treatment, non-adherence to medication, reliance on unproven remedies',
        alternative:
          'Present evidence-based information clearly; never frame medical outcomes as influenced by user rituals or beliefs',
      },
      {
        title: 'Children and Vulnerable Users',
        reason:
          'Children and cognitively vulnerable populations are more susceptible to magical thinking',
        consequence:
          'Compulsive engagement patterns, distorted understanding of causation, financial exploitation',
        alternative:
          'Use transparent reward systems with clear rules; avoid mystery mechanics targeting minors',
      },
      {
        title: 'A/B Test Interpretation',
        reason:
          'Teams may attribute test results to superstitious factors rather than statistical validity',
        consequence:
          'Poor product decisions based on ritual rather than data, cargo-cult experimentation',
        alternative:
          'Enforce statistical rigor, pre-registration, and proper sample sizes in experimentation frameworks',
      },
    ],

    commonMistakes: [
      {
        title: 'Creating Compulsive Loops',
        description:
          'Designing variable-reward rituals so compelling that users cannot disengage',
        why: 'Intermittent reinforcement combined with ritual gestures creates slot-machine-like compulsion',
        fix: 'Implement session limits, cool-down periods, and transparent odds disclosure',
      },
      {
        title: 'Implying User Control Over Random Outcomes',
        description:
          'UI elements that suggest user timing, gestures, or choices affect random results',
        why: 'Users develop false beliefs about their influence, leading to frustration and distorted expectations',
        fix: 'Clearly label random outcomes as random; separate user input from randomized results',
      },
      {
        title: 'Exploiting Loss of Streaks',
        description:
          'Making streak-breaking feel catastrophic to force daily engagement through fear',
        why: 'Users develop anxiety around maintaining streaks, turning a positive habit into a compulsive obligation',
        fix: 'Offer streak freezes, grace periods, or streak-recovery mechanics; celebrate progress, not perfection',
      },
      {
        title: 'Superstitious Feature Attribution',
        description:
          'Teams attributing product success to specific design rituals rather than systematic testing',
        why: 'Cargo-cult design decisions propagate through organizations when early successes are misattributed',
        fix: 'Ground all design decisions in user research and controlled experiments, not anecdotal correlations',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout can create spatial rituals and "lucky spots" in the interface',
        examples: [
          'Users develop habitual tap zones they believe yield better results',
          'Consistent placement of reward elements creates spatial rituals',
          'Hidden elements in specific locations encourage exploratory rituals',
          'Symmetrical or sacred-geometry layouts evoke a sense of order and meaning',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text framing can reinforce or counteract magical thinking',
        examples: [
          'Language like "Your lucky day" or "Destiny awaits" reinforces magical framing',
          'Statistical language ("random selection", "50% probability") counteracts magical thinking',
          'Personalized messages ("chosen just for you") imply destiny or fate',
          'Countdown text creates anticipation rituals around reveals',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color associations trigger culturally embedded magical associations',
        examples: [
          'Gold and sparkle effects signal "lucky" or "special" outcomes',
          'Red can signify luck (East Asian cultures) or danger (Western cultures)',
          'Rainbow or iridescent effects imply rarity and magical quality',
          'Glowing or pulsing colors suggest an item has "power" or "energy"',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Gestural rituals are the primary vehicle for magical thinking in digital products',
        examples: [
          'Shake-to-shuffle creates a physical ritual around randomization',
          'Long-press-to-reveal mimics "opening" or "unwrapping" ceremonies',
          'Swipe patterns become personal rituals users believe affect outcomes',
          'Tapping a specific number of times before an action becomes superstitious routine',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users interpret events as magical or mechanical',
        examples: [
          '"The universe has something special for you" frames random content as destined',
          '"Randomly selected from 10,000 items" frames the same content as mechanical',
          'Narrative arcs around rewards ("your quest", "your journey") invoke magical framing',
          'Personalized language implies the system "knows" the user in a mystical way',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Gesture-based rituals must have accessible equivalents that preserve the experience',
        examples: [
          'Shake gestures need button alternatives for users with motor disabilities',
          'Visual sparkle effects need non-visual equivalents for screen reader users',
          'Timing-based rituals must accommodate users who interact at different speeds',
          'Audio cues for "magical" moments need visual alternatives for deaf users',
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
        title: 'Daily Mystery Reward with Transparent Odds',
        description:
          'A fitness app offering a daily "mystery challenge" with a ritual open gesture and disclosed reward probabilities',
        code: `<div class="mystery-reward">
  <h3>Your Daily Mystery Challenge</h3>
  <div class="reward-card sealed" role="button" aria-label="Tap and hold to reveal today's challenge">
    <div class="shimmer-effect"></div>
    <p class="instruction">Tap & hold to reveal</p>
  </div>
  <details class="odds-disclosure">
    <summary>How are challenges selected?</summary>
    <p>Challenges are randomly assigned each day:</p>
    <ul>
      <li>60% - Standard challenge (100-200 bonus points)</li>
      <li>30% - Rare challenge (300-500 bonus points)</li>
      <li>10% - Epic challenge (1000 bonus points)</li>
    </ul>
    <p>Your actions do not affect which challenge appears.</p>
  </details>
</div>`,
        explanation:
          'The tap-and-hold ritual creates a satisfying ceremony around the reveal, engaging magical thinking for delight. The odds disclosure ensures users understand the randomness, preventing superstitious over-investment.',
        principle:
          'Use ritual interaction for delight while maintaining transparency about randomness',
        metrics: {
          before: '34% daily return rate with simple notification',
          after: '62% daily return rate with mystery ritual + odds disclosure',
          improvement: '82% increase in daily engagement without increased compulsive behavior reports',
        },
      },
      {
        title: 'Streak System with Grace Periods',
        description:
          'A language learning app with streak mechanics that prevent anxiety-driven magical thinking',
        code: `<div class="streak-display">
  <div class="flame-container">
    <div class="flame" aria-label="12-day streak">
      <span class="streak-count">12</span>
    </div>
  </div>
  <p class="streak-message">12 days of learning!</p>
  <div class="streak-protection">
    <span class="shield-icon" aria-hidden="true"></span>
    <p>You have <strong>2 streak freezes</strong> available.</p>
    <p class="reassurance">Missing a day won't erase your progress.</p>
  </div>
  <p class="encouragement">Your consistency builds real skill over time.</p>
</div>`,
        explanation:
          'The flame icon creates a ritual totem users want to protect, but streak freezes and reassuring messaging prevent the anxiety-driven magical thinking where users feel their entire progress depends on an unbroken chain.',
        principle:
          'Harness ritual attachment for motivation while preventing compulsive anxiety',
      },
      {
        title: 'Shuffle Ritual with Honest Framing',
        description:
          'A music app with a physical shake-to-shuffle gesture that honestly frames the randomization',
        code: `<div class="shuffle-container">
  <button class="shuffle-button"
          aria-label="Shuffle playlist randomly">
    <span class="shuffle-icon" aria-hidden="true"></span>
    Shake or tap to shuffle
  </button>
  <p class="shuffle-note">Songs are selected randomly from your library.
    Shaking is just for fun -- it doesn't affect the selection.</p>
</div>

<style>
.shuffle-button {
  background: var(--cg-color-surface-interactive);
  border-radius: var(--cg-radius-full);
  padding: var(--cg-space-3) var(--cg-space-5);
  transition: transform 0.15s ease;
}
.shuffle-button:active {
  transform: rotate(15deg) scale(0.95);
}
</style>`,
        explanation:
          'The shake gesture creates a fun, embodied ritual that users enjoy. The honest note clarifies that the gesture is for fun, not causal, preventing users from developing superstitious shuffle rituals.',
        principle:
          'Physical rituals increase engagement when honestly framed as experiential, not causal',
      },
    ],

    bad: [
      {
        title: 'Implying User Control Over Random Loot',
        description:
          'A game implying that timing or gesture affects loot box outcomes',
        code: `<!-- DON'T DO THIS -->
<div class="loot-box">
  <h3>Open Your Legendary Chest!</h3>
  <div class="chest-animation">
    <p class="hint">Hold at just the right moment for better loot...</p>
    <div class="timing-bar">
      <div class="sweet-spot"></div>
      <div class="cursor moving"></div>
    </div>
  </div>
  <button class="open-chest">OPEN NOW!</button>
</div>`,
        explanation:
          'The timing bar and "right moment" hint falsely imply that user skill or timing affects the random outcome. This creates superstitious behavior and can drive compulsive spending as users believe they can "master" the timing.',
        principle:
          'Never imply user actions influence predetermined random outcomes',
      },
      {
        title: 'Catastrophic Streak Loss',
        description:
          'An app that destroys all progress when a streak breaks, creating anxiety-driven magical thinking',
        code: `<!-- DON'T DO THIS -->
<div class="streak-broken">
  <div class="broken-flame" aria-hidden="true"></div>
  <h2 style="color: red;">YOUR 47-DAY STREAK IS GONE FOREVER!</h2>
  <p>You missed yesterday. Your streak is reset to 0.</p>
  <p>All streak bonuses have been removed.</p>
  <button class="buy-restore">Restore Streak for $4.99</button>
  <button class="dismiss" style="color: #999; font-size: 0.8em;">
    Start over from zero
  </button>
</div>`,
        explanation:
          'Catastrophic streak loss creates intense anxiety that drives users to develop superstitious behaviors around never missing a day. The paid restore option exploits this anxiety for monetization, which is manipulative.',
        principle:
          'Never weaponize magical attachment to streaks for monetization',
      },
      {
        title: 'Fake Personalization as Destiny',
        description:
          'A shopping app implying mystical connection between user and randomly selected products',
        code: `<!-- DON'T DO THIS -->
<div class="recommendation">
  <h2>The Universe Picked These Just for You</h2>
  <p class="mystical-text">Based on your cosmic energy today...</p>
  <div class="product-grid aura-glow">
    <div class="product destiny-match">
      <span class="badge">98% Soul Match</span>
      <img src="product.jpg" alt="Overpriced crystal">
      <p class="price">$89.99</p>
    </div>
  </div>
  <p class="urgency">This alignment won't last -- buy before midnight!</p>
</div>`,
        explanation:
          'Framing random product recommendations as cosmic destiny exploits magical thinking to sell products. The "Soul Match" percentage and urgency language create false causal beliefs that pressure purchases.',
        principle:
          'Never frame algorithmic recommendations as mystical or destined connections',
      },
    ],

    realWorld: [
      {
        company: 'Supercell',
        product: 'Clash Royale Chest Opening',
        description: 'Players tap to open chests with dramatic animations, creating a ritual around the reveal. The visual ceremony (glowing, shaking, bursting) makes the random reward feel personally significant, driving daily engagement.',
        effectiveness: 'very-effective',
        analysis: 'The chest-opening ritual leverages magical thinking through embodied interaction and dramatic reveal. Effective at driving engagement but raises ethical concerns around younger players developing compulsive opening patterns.',
      },
      {
        company: 'Duolingo',
        product: 'Streak Flame and Freeze',
        description: 'Duolingo\'s streak flame becomes a personal totem users feel protective of. The streak freeze mechanic prevents the worst compulsive effects while still leveraging the ritualistic attachment to an unbroken chain.',
        effectiveness: 'effective',
        analysis: 'Balances magical thinking engagement (the flame as living totem) with ethical safeguards (freezes, weekend amulets). Users develop healthy ritual attachment without overwhelming anxiety.',
      },
      {
        company: 'Apple',
        product: 'Shake to Undo / Shuffle',
        description: 'Apple\'s shake gesture for undo and shuffle creates a physical ritual that feels more meaningful than tapping a button. Users develop embodied routines around the gesture that feel personally connected to the outcome.',
        effectiveness: 'effective',
        analysis: 'The physical gesture triggers mild magical thinking -- users feel the shake "does something" beyond triggering a function. Effective for engagement without exploitation since the outcomes are transparent.',
      },
      {
        company: 'Various Sports Apps',
        product: 'Lucky Rituals in Fantasy Sports',
        description: 'Fantasy sports users develop elaborate pre-game rituals: checking lineups at specific times, using specific devices, or performing set-lineup gestures they believe influence outcomes. Apps sometimes reinforce this with "lucky" badges or pre-game rituals.',
        effectiveness: 'somewhat-effective',
        analysis: 'When apps reinforce superstitious behavior around betting or fantasy outcomes, it crosses ethical lines. Users who believe their rituals affect game outcomes may increase wagering, leading to financial harm.',
      },
    ],

    abTests: [
      {
        title: 'Reward Reveal: Ritual Gesture vs Instant Display',
        hypothesis:
          'A ritual gesture before reward reveal will increase perceived reward value and daily return rate',
        controlVersion: {
          description:
            'Daily reward displayed immediately upon login with a simple notification banner',
          metrics: {
            conversionRate: '31%',
            timeOnPage: '0:08',
            scrollDepth: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            'Daily reward hidden behind a tap-and-hold "unwrap" gesture with a 2-second reveal animation',
          metrics: {
            conversionRate: '31%',
            timeOnPage: '0:34',
            scrollDepth: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Actual reward values were identical, but users in the ritual group rated their rewards 28% higher in perceived value. Daily return rate increased by 41%. The ritual created a personal ceremony that made the same reward feel more special.',
          learnings: [
            'Ritual gestures increase perceived value of identical rewards',
            'Users spent 4x longer engaging with the reward moment',
            'Self-reported satisfaction was significantly higher with the ritual',
            'No increase in compulsive behavior when ritual was limited to once daily',
          ],
        },
      },
      {
        title: 'Streak Messaging: Magical vs Growth Framing',
        hypothesis:
          'Growth-oriented streak messaging will maintain engagement while reducing anxiety',
        controlVersion: {
          description:
            'Streak displayed with flame icon and messaging: "Don\'t let your flame die! Keep your streak alive!"',
          metrics: {
            conversionRate: '72%',
            clickThroughRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Streak displayed with growth icon and messaging: "12 days of real progress! Your skills are growing every session."',
          metrics: {
            conversionRate: '69%',
            clickThroughRate: '42%',
          },
        },
        results: {
          winner: 'control',
          analysis:
            'The magical "flame alive" framing drove slightly higher engagement (72% vs 69%), but the growth framing group showed 34% fewer reports of anxiety about missing days and 23% higher long-term retention at 90 days. The magical framing won short-term but lost long-term.',
          learnings: [
            'Magical framing drives stronger short-term engagement through superstitious attachment',
            'Growth framing produces healthier long-term retention patterns',
            'Combining both ("Your flame grows as your skills grow") showed promise in follow-up tests',
            'Anxiety-driven engagement eventually leads to burnout and churn',
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
        name: 'Ritual Interaction Patterns',
        description:
          'Gestures or multi-step interactions that precede outcomes (shake, hold, swipe patterns)',
        howToSpot:
          'Look for interactions where the user performs a ceremony before seeing a result -- especially when the gesture has no functional necessity',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Lucky / Mystical Visual Language',
        description:
          'Gold sparkles, glowing auras, mystical symbols, or "lucky" badges on UI elements',
        howToSpot:
          'Check for decorative elements that imply luck, fate, or cosmic significance around random outcomes',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Streak Totems',
        description:
          'Living icons (flames, plants, creatures) that represent user streaks and appear to "die" when broken',
        howToSpot:
          'Look for streak representations that anthropomorphize consistency into a living thing the user must protect',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Mystery and Concealment',
        description:
          'Hidden rewards, sealed containers, or obscured content requiring user action to reveal',
        howToSpot:
          'Check for content deliberately hidden behind user gestures when there is no informational reason for concealment',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Personalization as Destiny',
        description:
          'Recommendations framed as "meant for you," "your match," or "chosen by fate"',
        howToSpot:
          'Look for language implying mystical or destined connection between user and algorithmically selected content',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Variable-Ratio Reward Ritual',
        description: 'User performs a ritual gesture to receive a random reward with unpredictable value',
        indicators: [
          'Tap-and-hold, shake, or swipe gestures before reward reveal',
          'Dramatic reveal animations with uncertain outcomes',
          'Reward values that vary unpredictably',
          'Daily or session-limited access creating anticipation',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Streak Anxiety Pattern',
        description: 'Streak mechanics that create superstitious attachment and fear of breaking the chain',
        indicators: [
          'Living or animated streak icons',
          'Catastrophic language around streak breaks',
          'Paid streak restoration options',
          'No grace period or freeze mechanics',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Illusory Control Pattern',
        description: 'UI elements that imply user actions influence random or predetermined outcomes',
        indicators: [
          'Timing bars or "sweet spot" mechanics on random outcomes',
          '"Hold at the right moment" or skill-implies-luck language',
          'User choices that appear to affect outcomes but do not',
          'Feedback loops suggesting user technique matters',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Destiny Framing Pattern',
        description: 'Algorithmic recommendations presented as mystical or fated connections',
        indicators: [
          '"Meant for you," "soul match," or "cosmic" language',
          'Percentage match scores without methodology disclosure',
          'Urgency tied to mystical timing ("alignment ends tonight")',
          'Mystical visual effects on recommended items',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do any user gestures precede random outcomes in a way that implies causal connection?',
      'Are streak mechanics accompanied by grace periods and reassuring messaging?',
      'Is mystical or destiny language used to frame algorithmic recommendations?',
      'Are random reward odds disclosed and accessible to users?',
      'Do "reveal" animations imply user timing or technique affects the outcome?',
      'Are streak-break consequences proportionate, or are they catastrophically punitive?',
      'Is the distinction between user-influenced and random outcomes clearly communicated?',
      'Are ritual interactions enjoyable without being compulsive?',
      'Does the design exploit magical thinking for monetization (paid streak restores, loot boxes)?',
      'Are children or vulnerable users protected from compulsive magical-thinking mechanics?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in magical thinking and superstitious behavior patterns.

Analyze the provided design for magical thinking patterns. Identify:

1. **Ritual Interactions**: Gestures, sequences, or ceremonies users perform before outcomes
2. **Illusory Control**: UI elements implying user actions affect random results
3. **Streak Totems**: Living representations of consistency that create superstitious attachment
4. **Variable-Ratio Rewards**: Random reward systems wrapped in ritual reveal mechanics
5. **Destiny Framing**: Algorithmic results presented as mystical or fated connections

For each pattern found:
- Identify the magical thinking mechanism being activated
- Assess whether it enhances experience or exploits vulnerability
- Determine if randomness is transparently communicated
- Evaluate risk of compulsive behavior
- Suggest improvements for ethical engagement

Consider:
- Are users developing superstitious behaviors around the product?
- Is the illusion of control leading to over-investment (financial or emotional)?
- Are streak mechanics causing anxiety rather than motivation?
- Are random outcomes honestly labeled as random?
- Are children or vulnerable users protected?

Provide actionable recommendations for engaging but ethical use of magical thinking.`,

    outputSchema: {
      type: 'object',
      properties: {
        magicalThinkingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              mechanism: { type: 'string' },
              ritualDescription: { type: 'string' },
              compulsionRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'mechanism',
              'compulsionRisk',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            ritualEngagement: { type: 'number' },
            illusoryControlRisk: { type: 'number' },
            transparencyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'ritualEngagement',
            'illusoryControlRisk',
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
        'magicalThinkingPatterns',
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
        title: 'Identify Natural Ritual Points',
        description:
          'Find moments in the user journey where a brief ceremony would add delight without creating compulsion',
        example:
          'The moment before a daily reward reveal, the first login of the day, or a milestone celebration',
        tips: [
          'Choose moments that are already emotionally significant',
          'Limit rituals to 1-2 per session to avoid fatigue',
          'Ensure the ritual adds joy, not obligation',
        ],
      },
      {
        step: 2,
        title: 'Design the Ritual Gesture',
        description:
          'Create a physical or interactive gesture that feels satisfying and ceremonial',
        example:
          'A tap-and-hold to "unwrap" a reward, a swipe to "reveal," or a shake to "shuffle"',
        tips: [
          'Keep gestures simple and accessible',
          'Provide button alternatives for accessibility',
          'Add satisfying haptic and audio feedback',
        ],
      },
      {
        step: 3,
        title: 'Separate Ritual from Outcome',
        description:
          'Ensure the ritual is framed as experiential, not as causally affecting the outcome',
        example:
          'Add a note: "Rewards are randomly selected. The unwrap gesture is just for fun!"',
        tips: [
          'Never imply timing or technique affects random outcomes',
          'Disclose odds when variable rewards are involved',
          'Frame the ritual as a fun interaction, not a skill',
        ],
      },
      {
        step: 4,
        title: 'Build Streak Mechanics Ethically',
        description:
          'If using streaks, include safeguards against anxiety-driven magical thinking',
        example:
          'Offer streak freezes, grace periods, and messaging that celebrates progress over perfection',
        tips: [
          'Never monetize streak recovery as primary revenue',
          'Frame streaks as progress markers, not living things that die',
          'Provide easy re-engagement paths after breaks',
        ],
      },
      {
        step: 5,
        title: 'Test for Compulsive Behavior',
        description:
          'Monitor user behavior for signs of superstitious or compulsive patterns',
        example:
          'Track session frequency, time-of-day patterns, and user-reported anxiety through surveys',
        tips: [
          'Set up alerts for unusually frequent sessions',
          'Survey users about their emotional relationship with streaks and rituals',
          'Be willing to dial back mechanics that cause harm',
        ],
      },
    ],

    dos: [
      'Use ritual interactions to add delight and ceremony to meaningful moments',
      'Disclose odds and randomness transparently in all variable-reward systems',
      'Provide streak freezes and grace periods to prevent anxiety',
      'Frame rituals as fun and experiential, not as causally influential',
      'Offer accessible alternatives for gesture-based rituals',
      'Monitor for compulsive behavior and adjust mechanics accordingly',
      'Celebrate user progress with growth-oriented language',
      'Test the emotional impact of streak and ritual mechanics with real users',
    ],

    donts: [
      'Don\'t imply user timing, gestures, or skill affect random outcomes',
      'Don\'t monetize streak restoration as a primary revenue mechanism',
      'Don\'t use catastrophic language when streaks break',
      'Don\'t frame algorithmic recommendations as mystical destiny',
      'Don\'t hide reward odds or probabilities from users',
      'Don\'t design variable-reward rituals targeting children without safeguards',
      'Don\'t create rituals that feel obligatory rather than delightful',
      'Don\'t exploit magical thinking to increase spending on random outcomes',
    ],

    bestPractices: [
      {
        title: 'Transparent Randomness',
        description:
          'Always disclose when outcomes are random and show probability information',
        rationale:
          'Users should enjoy the ritual without developing false beliefs about their influence on outcomes',
        example:
          'A "Mystery Box" feature with a visible "View odds" link showing the probability distribution',
      },
      {
        title: 'Ethical Streak Design',
        description:
          'Build streak mechanics that motivate without creating superstitious obligation',
        rationale:
          'Healthy habits form through intrinsic motivation, not fear of losing a magical totem',
        example:
          'A streak system with freezes, recovery options, and messaging like "Welcome back! Your skills are still here."',
      },
      {
        title: 'Ritual as Delight, Not Dependency',
        description:
          'Design ritual interactions as joyful extras that enhance but don\'t define the core experience',
        rationale:
          'When rituals become obligations, they create compulsion rather than engagement',
        example:
          'A shake-to-shuffle that\'s fun but with a button alternative and no penalty for not shaking',
      },
      {
        title: 'Growth Over Magic Framing',
        description:
          'Frame user progress in terms of real growth and skill development, not luck or destiny',
        rationale:
          'Growth framing builds genuine self-efficacy; magical framing builds dependency on superstition',
        example:
          '"You\'ve completed 30 lessons and learned 450 words" vs "Your magic learning power is at level 12!"',
      },
      {
        title: 'Compulsion Safeguards',
        description:
          'Build in circuit-breakers that prevent magical-thinking mechanics from becoming addictive',
        rationale:
          'The same mechanisms that make slot machines addictive can emerge in any variable-reward ritual system',
        example:
          'Daily limits on mystery box opens, cool-down timers between attempts, and session-length warnings',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.5.4',
        guideline:
          'Motion Actuation - Provide alternatives for motion-triggered rituals',
        implementation:
          'For shake-to-shuffle or tilt-based rituals, always provide an equivalent button or tap alternative. Respect "Reduce Motion" system preferences.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color for ritual state communication',
        implementation:
          'Combine gold/sparkle effects with text labels and icons so streak status and reward rarity are accessible to color-blind users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Ensure timed rituals can be extended or paused',
        implementation:
          'If reveal animations have timing components, allow users to skip or extend them. Never make outcome quality depend on timing.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure ritual outcomes are semantically communicated',
        implementation:
          'Use ARIA live regions to announce reward results, streak status changes, and reveal outcomes for screen reader users.',
      },
    ],

    ethics: [
      {
        concern: 'Compulsive Engagement',
        severity: 'critical',
        explanation:
          'Variable-reward rituals can create slot-machine-like compulsion, especially in children and addiction-prone users',
        mitigation:
          'Implement daily limits, cool-down periods, session warnings, and parental controls. Regularly audit engagement data for compulsive patterns.',
      },
      {
        concern: 'Illusory Control Over Spending',
        severity: 'critical',
        explanation:
          'When users believe their rituals or timing affect random paid outcomes (loot boxes), they may overspend',
        mitigation:
          'Never imply user actions affect random outcomes. Disclose all odds. Implement spending limits and purchase history visibility.',
      },
      {
        concern: 'Streak Anxiety Exploitation',
        severity: 'high',
        explanation:
          'Monetizing streak recovery exploits the magical thinking attachment users develop to their streak',
        mitigation:
          'Provide free streak freezes. Never make paid restoration the only option. Frame streaks as progress markers, not fragile chains.',
      },
      {
        concern: 'False Personalization Claims',
        severity: 'high',
        explanation:
          'Framing algorithmic recommendations as destiny or cosmic connection creates false beliefs about product-user relationship',
        mitigation:
          'Describe recommendation systems honestly ("Based on your listening history" not "The stars aligned for you").',
      },
      {
        concern: 'Children and Vulnerable Populations',
        severity: 'critical',
        explanation:
          'Children, users with OCD, and addiction-prone individuals are especially susceptible to magical thinking mechanics',
        mitigation:
          'Age-gate ritual reward systems. Provide opt-out mechanisms. Consult with child psychologists when designing for minors.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Laws of Sympathetic Magic',
        author: 'Rozin, P., Millman, L., & Nemeroff, C.',
        year: 1986,
        doi: '10.1016/0022-1031(86)90029-0',
        description:
          'Foundational paper demonstrating that adults follow magical "laws" of contagion and similarity, even when they know better',
        type: 'foundational',
      },
      {
        title: 'Everyday Magical Powers: The Role of Apparent Mental Causation in the Overestimation of Personal Influence',
        author: 'Pronin, E., Wegner, D. M., McCarthy, K., & Rodriguez, S.',
        year: 2006,
        doi: '10.1037/0022-3514.91.2.218',
        description:
          'Demonstrates that people believe their thoughts and intentions can influence physical outcomes, even in controlled experimental settings',
        type: 'foundational',
      },
      {
        title: 'Superstition in the Machine: Fairness and Interpretability in Algorithmic Decision-Making',
        author: 'Various (AI/HCI research)',
        year: 2020,
        description:
          'Explores how magical thinking affects user interpretation of algorithmic outputs and AI-driven recommendations',
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
          'Covers illusion of control and pattern-seeking as foundations of magical thinking in decision-making',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Explores variable-reward mechanics and ritual triggers in product design, directly related to magical thinking patterns',
        type: 'practical',
      },
      {
        title: 'Addiction by Design: Machine Gambling in Las Vegas',
        author: 'Schull, Natasha Dow',
        year: 2012,
        isbn: '9780691160887',
        description:
          'Deep analysis of how slot machine design exploits magical thinking, illusion of control, and ritual behavior -- directly applicable to digital product design',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'The Psychology of Loot Boxes and Gacha Mechanics',
        author: 'Various UX Researchers',
        url: 'https://www.darkpatterns.org/types-of-dark-pattern',
        description:
          'Analysis of how game reward mechanics exploit magical thinking and illusory control',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Superstition and Magical Thinking in Design',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/results?search_query=magical+thinking+ux+design',
        description:
          'Overview of how magical thinking manifests in user behavior and product design',
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
      'illusion-of-control', // Core mechanism: believing actions influence outcomes
      'variable-ratio-reinforcement', // Intermittent rewards strengthen magical associations
      'loss-aversion', // Fear of losing streaks or lucky items drives magical behavior
      'endowment-effect', // Personal totems and lucky items feel more valuable
      'gambler-fallacy', // Belief that past events influence future random outcomes
    ],

    conflicts: [
      'base-rate-neglect', // Statistical thinking counteracts magical thinking
      'rational-choice', // Deliberate rational analysis undermines superstitious behavior
    ],

    confusedWith: [
      'illusion-of-control', // Overlapping but magical thinking is broader than just control
      'confirmation-bias', // Users notice when rituals "work" and ignore when they don't
      'superstition', // Superstition is a subset/manifestation of magical thinking
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'superstitious-behavior',
        'illusory-causation',
        'ritual-attachment',
      ],
    },
  },
};
