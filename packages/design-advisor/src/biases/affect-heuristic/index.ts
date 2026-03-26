/**
 * AFFECT HEURISTIC
 *
 * Our emotions influence our judgments and decisions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const affectHeuristic: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'affect-heuristic',
    name: 'Affect Heuristic',
    aliases: ['Affect Heuristic', 'Emotional Heuristic'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'emotion',
      'judgment',
      'risk-perception',
      'gut-feeling',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Our emotions influence our judgments and decisions',

    detailed: `The Affect Heuristic describes how people make judgments and decisions based on their current emotions rather than through careful, objective analysis. Instead of weighing pros and cons rationally, people consult their feelings — asking "How do I feel about it?" rather than "What do I think about it?"

When we have a positive emotional association with something, we tend to perceive it as having high benefits and low risks. Conversely, negative feelings lead us to see low benefits and high risks. This emotional shortcut is fast and efficient but can lead to systematic errors when feelings don't align with objective reality.

In UX and product design, the affect heuristic is omnipresent. The emotional tone of an interface — its colors, imagery, micro-interactions, copy tone, and overall aesthetic — profoundly shapes how users evaluate trustworthiness, perceive value, and make decisions. Designers who understand this can craft experiences that reduce anxiety, build confidence, and guide users toward positive outcomes, while those who misuse it can manipulate through fear, false urgency, or manufactured delight.`,

    psychologyBasis: {
      discoveredBy: 'Slovic, Finucane, Peters, & MacGregor',
      year: 2002,
      theory: 'Affect Heuristic Theory',
      mechanism: `People use their current emotional state as information for making judgments about risk, benefit, and value. This happens because:

1. **Emotional Tagging**: Every stimulus in memory carries an affective tag (positive or negative) that is retrieved automatically before conscious analysis begins
2. **Inverse Risk-Benefit Relationship**: When feelings are positive, perceived benefits go up and perceived risks go down — and vice versa — even though objectively risk and benefit are often positively correlated
3. **Mood as Information**: Current mood (happy, anxious, calm) colors evaluation of unrelated options. A user who feels good is more likely to rate a product favorably
4. **Speed Over Accuracy**: The affect heuristic operates rapidly in System 1 thinking, delivering a "gut feeling" verdict before System 2 deliberation can engage
5. **Somatic Markers**: Damasio's somatic marker hypothesis shows that bodily feelings (tension, warmth, unease) guide decision-making, often without conscious awareness`,
    },

    realWorldExample: `After the September 11 attacks, many Americans drove long distances instead of flying, even though driving is statistically far more dangerous per mile. The intense fear and dread associated with air travel — the affect — overrode the objective risk data. Researchers estimated this fear-driven shift to driving led to approximately 1,600 additional road fatalities in the year following 9/11. The negative affect attached to flying made it "feel" dangerous despite being safer.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Affect Heuristic fundamentally shapes how users experience and evaluate interfaces. Emotional design is not decoration — it is a core driver of perceived usability, trust, and conversion. Designers can leverage this to:

- Build trust and reduce anxiety through warm, calming visual design
- Increase perceived value through delightful micro-interactions and polished aesthetics
- Guide decisions by creating positive emotional associations with desired actions
- Reduce perceived risk by crafting emotionally reassuring flows (onboarding, checkout, error recovery)
- Shape brand perception through consistent emotional tone across all touchpoints`,

    whenToUse: [
      {
        title: 'Anxiety-Inducing Flows',
        scenario:
          'When users face financially or emotionally sensitive tasks (payments, health data, account deletion)',
        example:
          'Use warm illustrations, friendly copy, and calming colors in a finance app to reduce anxiety during first-time investment setup',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding and First Impressions',
        scenario: 'When new users are forming their initial emotional impression of your product',
        example:
          'Welcome screens with friendly illustrations, celebratory animations on first success, and encouraging copy set a positive affective tone',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Recovery',
        scenario: 'When users encounter errors or failures that could trigger frustration',
        example:
          'Friendly error messages with helpful illustrations (like Slack\'s animal characters) reduce negative affect and keep users engaged',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Trust-Building Moments',
        scenario: 'When users must decide whether to share sensitive information or commit to a purchase',
        example:
          'Clean, polished UI with subtle animations and professional imagery signals competence and trustworthiness at checkout',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Celebration and Progress',
        scenario: 'When users complete milestones, achievements, or goals',
        example:
          'Confetti animations, encouraging messages, and streak celebrations create positive affect that reinforces continued engagement',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Empty States',
        scenario: 'When users see blank or empty screens that could feel discouraging',
        example:
          'Charming illustrations with encouraging copy ("Your inbox is all clear!") transform emptiness into a positive emotional moment',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Critical Decision Points',
        reason:
          'Positive affect can make users underestimate real risks in high-stakes decisions',
        consequence:
          'Users may skip important warnings or agree to unfavorable terms because the interface "feels" trustworthy',
        alternative:
          'Present critical information clearly and neutrally; use emotional design for context but not to overshadow important facts',
      },
      {
        title: 'Fear and Urgency Manipulation',
        reason:
          'Deliberately inducing negative emotions (fear, anxiety, shame) to drive conversions is manipulative',
        consequence:
          'Short-term conversions but long-term user distrust, anxiety, and brand damage',
        alternative:
          'Use honest, transparent communication. Convey urgency through factual information, not emotional manipulation',
      },
      {
        title: 'Masking Poor Quality',
        reason:
          'Using delightful UI to distract from a fundamentally broken or unethical product',
        consequence:
          'Users initially feel positive but develop resentment when they realize the emotional design masked real problems',
        alternative:
          'Fix the underlying product issues first; emotional design should enhance good products, not disguise bad ones',
      },
      {
        title: 'Gamified Manipulation',
        reason:
          'Using dopamine-driven emotional triggers to create compulsive usage patterns',
        consequence:
          'Addictive behaviors, user regret, regulatory scrutiny, and ethical violations',
        alternative:
          'Design for sustainable engagement and user wellbeing; celebrate genuine progress rather than manufactured streaks',
      },
    ],

    commonMistakes: [
      {
        title: 'Emotional Whiplash',
        description:
          'Mixing dramatically different emotional tones across the same flow (playful onboarding then cold, clinical payment page)',
        why: 'Inconsistent affect breaks trust. Users sense the emotional manipulation when tone shifts abruptly at conversion points.',
        fix: 'Maintain consistent emotional tone throughout the entire user journey. If your brand is warm and friendly, keep that through checkout.',
      },
      {
        title: 'Over-Gamification',
        description:
          'Adding celebration animations, badges, and streaks to everything, trivializing genuine achievement',
        why: 'When every action gets confetti, none feel meaningful. Emotional inflation devalues real milestones.',
        fix: 'Reserve strong positive affect for genuine achievements. Use subtle acknowledgments for routine actions.',
      },
      {
        title: 'Ignoring Negative Affect Signals',
        description:
          'Not designing for frustration, confusion, or anxiety states',
        why: 'Users in negative emotional states make worse decisions and are more likely to abandon. Ignoring these states means losing users at their most vulnerable.',
        fix: 'Audit your flows for frustration points. Design empathetic error states, provide clear recovery paths, and use calming design when users are likely stressed.',
      },
      {
        title: 'Cultural Emotional Blindness',
        description:
          'Assuming emotions triggered by colors, imagery, or copy are universal across cultures',
        why: 'Red means danger in Western cultures but luck in Chinese culture. Thumbs-up is positive in the US but offensive in parts of the Middle East.',
        fix: 'Research emotional associations for your target cultures. Test emotional design with diverse user groups.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout establishes the emotional first impression and affects perceived complexity',
        examples: [
          'Spacious, uncluttered layouts feel calm and premium; dense layouts feel overwhelming',
          'Rounded containers and soft edges feel friendly; sharp geometric layouts feel precise and corporate',
          'Asymmetric layouts feel creative and energetic; grid-based layouts feel stable and trustworthy',
          'White space creates breathing room that reduces cognitive-emotional load',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typeface choice and treatment carry strong emotional associations',
        examples: [
          'Rounded sans-serifs (e.g., Nunito) feel friendly and approachable',
          'Serif fonts (e.g., Georgia) feel trustworthy and established',
          'Handwritten or script fonts create warmth and personality',
          'Copy tone (encouraging vs neutral vs clinical) directly modulates user affect',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color is the most immediate emotional signal in any interface',
        examples: [
          'Warm colors (soft oranges, warm yellows) create comfort and optimism',
          'Cool blues convey trust, calm, and professionalism (used by banks, health apps)',
          'Saturated reds trigger alertness, urgency, and sometimes anxiety',
          'Muted, pastel palettes reduce emotional intensity and feel gentle',
          'Dark themes can feel sophisticated or oppressive depending on execution',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Micro-interactions and animations are the primary vehicles for emotional delight or frustration',
        examples: [
          'Smooth, springy animations create a sense of responsiveness and polish',
          'Celebration animations (confetti, checkmarks) create positive emotional peaks',
          'Laggy or janky interactions create frustration and erode trust',
          'Haptic feedback on mobile adds physical emotional reinforcement',
          'Loading states with personality (Slack messages, playful spinners) reduce frustration',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Copy tone, imagery, and narrative framing directly shape emotional experience',
        examples: [
          'Friendly error messages ("Oops! Let\'s fix that together") vs cold ones ("Error 404")',
          'Warm illustrations of people create empathy and connection',
          'Success messaging ("You did it!") creates emotional reward',
          'Fear-inducing copy ("Don\'t miss out! Only 2 left!") creates anxiety-driven action',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Emotional design must be perceivable and not exclusionary to users with different abilities',
        examples: [
          'Color-based emotional cues need non-color alternatives for color-blind users',
          'Animation-based delight needs reduced-motion alternatives',
          'Screen reader users need emotional context conveyed through text, not just visuals',
          'Celebratory sounds need visual alternatives for deaf/hard-of-hearing users',
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
        title: 'Warm Illustrations Reducing Finance Anxiety',
        description:
          'Investment app using friendly, warm illustrations to reduce anxiety during portfolio setup',
        code: `<div class="portfolio-setup">
  <div class="illustration">
    <img src="friendly-growth.svg" alt="A gentle upward path through a garden">
  </div>
  <h2>Let's grow your money together</h2>
  <p class="reassuring">No rush. You can change your choices anytime.
  We'll guide you through each step.</p>

  <div class="risk-selector">
    <label class="option calm">
      <span class="emoji">🌱</span>
      <span class="label">Steady Growth</span>
      <span class="detail">Lower risk, consistent returns</span>
    </label>
    <label class="option balanced">
      <span class="emoji">🌿</span>
      <span class="label">Balanced</span>
      <span class="detail">Mix of stability and growth</span>
    </label>
    <label class="option growth">
      <span class="emoji">🌳</span>
      <span class="label">Ambitious</span>
      <span class="detail">Higher potential, more volatility</span>
    </label>
  </div>

  <p class="footnote">89% of users stick with their initial choice
  and report feeling confident about it.</p>
</div>`,
        explanation:
          'Garden metaphors and growth imagery create positive affect around investing, replacing the cold, intimidating financial jargon. Reassuring copy ("No rush", "anytime") reduces anxiety. The emotional framing makes risk assessment feel like personal growth rather than a gamble.',
        principle:
          'Positive affect reduces perceived risk and increases willingness to engage with complex decisions',
        metrics: {
          before: '34% completed portfolio setup with clinical financial UI',
          after: '67% completed setup with warm illustrated version',
          improvement: '97% increase in onboarding completion',
        },
      },
      {
        title: 'Friendly Error Messages with Personality',
        description:
          'App using warm, empathetic error states that maintain positive affect during failures',
        code: `<div class="error-state friendly">
  <div class="illustration">
    <img src="confused-robot.svg" alt="A friendly robot scratching its head">
  </div>
  <h3>Hmm, that didn't work</h3>
  <p>Something went sideways, but it's probably not your fault.
  Here's what might help:</p>

  <ul class="recovery-steps">
    <li>Check your internet connection</li>
    <li>Try refreshing the page</li>
    <li>If it keeps happening, we're here to help</li>
  </ul>

  <div class="actions">
    <button class="primary">Try Again</button>
    <button class="secondary">Contact Support</button>
  </div>

  <p class="reassurance">Don't worry — your work is saved.</p>
</div>`,
        explanation:
          'The friendly robot illustration and conversational tone ("Something went sideways") maintain positive affect during a frustrating moment. "Probably not your fault" removes self-blame. "Your work is saved" addresses the primary anxiety. The overall emotional tone keeps users engaged rather than abandoning.',
        principle:
          'Maintaining positive affect during errors reduces abandonment and increases recovery rates',
      },
      {
        title: 'Celebration Micro-Interactions for Milestones',
        description:
          'Learning app using emotionally rewarding animations to reinforce progress',
        code: `<div class="milestone-celebration">
  <div class="animation-container">
    <!-- Confetti burst + character celebration animation -->
    <lottie-player
      src="celebration.json"
      autoplay
      aria-hidden="true">
    </lottie-player>
  </div>

  <h2>🎉 Amazing! 7-Day Streak!</h2>
  <p class="encouragement">You're building a real habit.
  Only 12% of learners reach a 7-day streak!</p>

  <div class="progress-visual">
    <div class="streak-dots">
      <span class="day completed">M</span>
      <span class="day completed">T</span>
      <span class="day completed">W</span>
      <span class="day completed">T</span>
      <span class="day completed">F</span>
      <span class="day completed">S</span>
      <span class="day completed today">S</span>
    </div>
  </div>

  <button class="primary">Keep the streak going!</button>
</div>`,
        explanation:
          'The confetti animation creates an emotional peak — a burst of positive affect tied to the accomplishment. The social comparison ("Only 12%") adds pride. The visual streak reinforces the desire not to break the chain. This emotional reward loop drives continued engagement through positive reinforcement.',
        principle:
          'Emotional celebration at milestones creates positive associations that drive habit formation',
        metrics: {
          before: '23% continued to day 8 with simple "Streak: 7" text',
          after: '41% continued to day 8 with celebration animation',
          improvement: '78% increase in next-day retention at streak milestone',
        },
      },
    ],

    bad: [
      {
        title: 'Fear-Driven Dark Pattern Urgency',
        description:
          'E-commerce site using anxiety and fear to manipulate purchase decisions',
        code: `<!-- DON'T DO THIS -->
<div class="product-urgency" style="background: #ff0000; color: white;">
  <h2>⚠️ SELLING OUT FAST!</h2>
  <p style="font-size: 1.5em; font-weight: bold;">
    Only 1 left! 23 people are looking at this RIGHT NOW!
  </p>
  <div class="countdown" style="color: yellow;">
    <p>Price goes up in: 00:04:32</p>
  </div>
  <p>😰 Don't miss out — you'll regret it!</p>
  <p style="color: #ffcccc;">Last person who waited paid $50 more!</p>
  <button class="buy-now pulsing">BUY NOW BEFORE IT'S GONE!</button>
</div>`,
        explanation:
          'This design deliberately induces negative affect (fear, anxiety, regret anticipation) to bypass rational decision-making. The fake urgency, manufactured scarcity, pulsing button, and regret-framing are all emotional manipulation tactics. Users who buy under this pressure often experience buyer\'s remorse.',
        principle:
          'Never weaponize negative affect to override rational decision-making',
      },
      {
        title: 'Guilt-Tripping Opt-Out Copy',
        description:
          'Newsletter popup using shame and guilt to prevent users from dismissing it',
        code: `<!-- DON'T DO THIS -->
<div class="newsletter-popup">
  <h3>Get 20% Off Your First Order!</h3>
  <input type="email" placeholder="Enter your email">
  <button class="subscribe">Yes, I love saving money!</button>
  <button class="dismiss">
    No thanks, I prefer paying full price 💸
  </button>
</div>`,
        explanation:
          'The dismiss option uses guilt and shame ("I prefer paying full price") to create negative affect around the opt-out choice. This confirmshaming technique manipulates emotions to pressure users into subscribing. It erodes trust and creates resentment even when users do subscribe.',
        principle:
          'Guilt and shame are unethical emotional manipulation tactics in UI copy',
      },
      {
        title: 'Emotionally Manipulative Gamification',
        description:
          'App using negative emotional punishment to force engagement',
        code: `<!-- DON'T DO THIS -->
<div class="streak-broken">
  <div class="sad-mascot">
    <img src="crying-owl.png" alt="Sad crying mascot">
  </div>
  <h2>You broke your streak 😢</h2>
  <p>Your 45-day streak is gone forever.</p>
  <p class="guilt">All that hard work... wasted.</p>
  <div class="comparison">
    <p>Your friends kept their streaks going:</p>
    <p>Sarah: 67 days | Mike: 89 days | Emma: 120 days</p>
  </div>
  <button class="primary">Pay $4.99 to Restore Streak</button>
  <button class="dismiss faded">Accept defeat</button>
</div>`,
        explanation:
          'This design stacks multiple negative emotional triggers: loss, guilt ("wasted"), social comparison shame, a crying mascot, and then monetizes the distress. The "Accept defeat" framing is confirmshaming. Users in this emotional state are more likely to make impulsive purchases they regret.',
        principle:
          'Never monetize negative emotions or use emotional punishment to drive purchases',
      },
    ],

    realWorld: [
      {
        company: 'Headspace',
        product: 'Meditation App',
        url: 'https://www.headspace.com',
        description:
          'Headspace uses soft, rounded illustrations, gentle animations, and warm color palettes to create a calming emotional environment. The entire UI communicates safety and peace, making users feel relaxed before they even start meditating.',
        effectiveness: 'very-effective',
        analysis:
          'By designing every element for calm — soft gradients, rounded shapes, gentle transitions, and warm conversational copy — Headspace uses positive affect to reduce the intimidation barrier of starting meditation. The emotional design is inseparable from the product value.',
      },
      {
        company: 'Robinhood',
        product: 'Trading App',
        url: 'https://robinhood.com',
        description:
          'Robinhood gamified stock trading with confetti celebrations on trades, simplified green/red indicators, and a clean, game-like interface. The positive affect made risky financial decisions feel fun and casual.',
        effectiveness: 'effective',
        analysis:
          'A cautionary example: the positive affect created by celebration animations on trades may have encouraged risky behavior. After regulatory scrutiny and user backlash, Robinhood removed confetti. Demonstrates how positive affect in the wrong context can cause real harm.',
      },
      {
        company: 'Apple',
        product: 'Product Experience',
        url: 'https://www.apple.com',
        description:
          'Apple designs for emotional delight at every touchpoint — the unboxing experience, the boot chime, smooth animations, haptic feedback, and the satisfying click of MagSafe. Each interaction creates a micro-moment of positive affect.',
        effectiveness: 'very-effective',
        analysis:
          'Apple\'s mastery of affect heuristic drives their premium perception. Users perceive Apple products as higher quality partly because every interaction feels polished and delightful. The emotional experience justifies the premium price — positive affect inflates perceived benefit and deflates perceived risk.',
      },
      {
        company: 'Duolingo',
        product: 'Language Learning App',
        url: 'https://www.duolingo.com',
        description:
          'Duolingo\'s owl mascot (Duo) uses emotional expressions — happy, sad, proud, concerned — to create an emotional relationship with users. The character\'s reactions to user behavior trigger genuine emotional responses that drive engagement.',
        effectiveness: 'very-effective',
        analysis:
          'The emotional mascot strategy is remarkably effective. Users report feeling genuine guilt when Duo looks sad (missed lessons) and genuine pride when Duo celebrates. This emotional bond drives retention far beyond what gamification mechanics alone could achieve.',
      },
    ],

    abTests: [
      {
        title: 'Checkout Flow: Clinical vs Warm Emotional Design',
        hypothesis:
          'A warm, emotionally reassuring checkout will reduce cart abandonment compared to a clinical, standard checkout',
        controlVersion: {
          description:
            'Standard e-commerce checkout with gray background, small form fields, minimal copy, and corporate blue buttons',
          metrics: {
            conversionRate: '3.2%',
            cartAbandonmentRate: '68%',
            timeOnPage: '2:15',
          },
        },
        treatmentVersion: {
          description:
            'Warm checkout with soft background colors, friendly security messaging ("Your info is safe with us"), progress illustrations, and a reassuring summary panel with a trust-building "100% satisfaction guarantee" badge',
          metrics: {
            conversionRate: '4.7%',
            cartAbandonmentRate: '54%',
            timeOnPage: '2:45',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The emotionally warm checkout increased conversions by 47% and reduced cart abandonment by 21%. Users spent slightly more time but converted at a much higher rate, suggesting the warm design reduced anxiety rather than adding friction.',
          learnings: [
            'Positive affect at checkout reduces the pain of paying',
            'Trust-building emotional cues ("safe with us") address anxiety directly',
            'Warm colors and friendly copy make financial commitment feel less threatening',
            'Illustration-based progress indicators create emotional momentum through the flow',
          ],
        },
      },
      {
        title: 'Error Messages: Technical vs Empathetic',
        hypothesis:
          'Empathetic, emotionally aware error messages will increase error recovery rates',
        controlVersion: {
          description:
            'Standard technical error: "Error 500: Internal Server Error. Please try again later."',
          metrics: {
            recoveryRate: '12%',
            bounceRate: '78%',
          },
        },
        treatmentVersion: {
          description:
            'Empathetic error with friendly illustration: "Oops, something unexpected happened on our end. We\'re looking into it. Here are some things you can try..." with clear recovery steps and a support link',
          metrics: {
            recoveryRate: '34%',
            bounceRate: '51%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Empathetic error messages nearly tripled recovery rate and reduced bounce by 35%. The friendly tone maintained positive affect during failure, keeping users engaged enough to attempt recovery rather than leaving.',
          learnings: [
            'Emotional tone during errors is more important than technical accuracy for retention',
            'Friendly illustrations humanize technical failures and reduce frustration',
            'Clear recovery steps channeled the remaining positive affect into action',
            'Users who recovered from empathetic errors reported higher overall satisfaction than those who never saw an error',
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
        name: 'Emotional Imagery',
        description:
          'Illustrations, photos, or icons chosen specifically for their emotional impact (warm, calming, exciting, fearful)',
        howToSpot:
          'Look for human faces showing emotions, character mascots with expressions, nature/warmth imagery, or fear-inducing visuals',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Color Mood Palette',
        description:
          'Color choices that establish a specific emotional atmosphere rather than pure information hierarchy',
        howToSpot:
          'Assess whether the color palette feels warm/cool/anxious/calm. Check for emotional gradients, background tints, and whether color goes beyond branding into mood-setting',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Micro-Interaction Affect',
        description:
          'Animations, transitions, and interactions designed to create emotional responses (delight, satisfaction, urgency)',
        howToSpot:
          'Look for celebration animations (confetti, sparkles), smooth spring physics, haptic feedback patterns, pulsing or shaking urgency cues',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Copy Tone and Voice',
        description:
          'Language that targets emotions rather than conveying neutral information',
        howToSpot:
          'Check for emotionally loaded words ("love", "amazing", "don\'t miss", "last chance"), conversational vs clinical tone, exclamation marks, emojis',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Mascot or Character Presence',
        description:
          'Anthropomorphic characters used to create emotional connection and guide behavior',
        howToSpot:
          'Look for brand mascots showing emotions, character reactions to user actions, or personified system states',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Emotional Design Consistency Pattern',
        description: 'Consistent emotional tone maintained across the entire user journey',
        indicators: ['Same illustration style throughout', 'Consistent color mood across pages', 'Copy tone matches visual emotions', 'Micro-interactions align with brand affect'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Anxiety-Reduction Pattern',
        description: 'Design elements specifically aimed at reducing user anxiety in high-stakes moments',
        indicators: ['Reassuring copy near payment forms', 'Trust badges and security indicators', 'Calming colors in sensitive flows', 'Friendly illustrations in complex processes'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Emotional Manipulation Pattern',
        description: 'Design elements that weaponize negative emotions to drive conversions',
        indicators: ['Countdown timers with aggressive styling', 'Fear-based copy or imagery', 'Guilt-tripping opt-out language', 'Shame-based social comparisons'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Reward Affect Pattern',
        description: 'Positive emotional reinforcement tied to specific user behaviors',
        indicators: ['Celebration animations on actions', 'Progress bars with emotional milestones', 'Encouraging copy after completion', 'Mascot reactions to user behavior'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What primary emotion does this interface evoke on first impression?',
      'Do the colors create a mood that supports or undermines the user\'s task?',
      'Is the illustration/imagery style emotionally appropriate for the context?',
      'Does the copy tone match the emotional needs of users at this point in their journey?',
      'Are micro-interactions creating delight, or are they creating anxiety or urgency?',
      'Is there emotional consistency across the entire flow, or does the tone shift at conversion points?',
      'Are negative emotions (fear, guilt, shame) being used to manipulate decisions?',
      'Do error states maintain empathy or switch to cold, technical language?',
      'Is emotional design accessible to users with different abilities?',
      'Would the emotional design still feel appropriate if the user is stressed, tired, or in a hurry?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the affect heuristic — how emotions influence judgments and decisions.

Analyze the provided design for affect heuristic patterns. Identify:

1. **Emotional Tone**: Overall emotional atmosphere created by color, imagery, typography, and layout
2. **Mood Alignment**: Whether the emotional design matches the user's task and emotional needs
3. **Emotional Triggers**: Specific elements designed to evoke emotions (positive or negative)
4. **Affect-Decision Connection**: How emotional design influences user choices and perceptions
5. **Ethical Assessment**: Whether emotions are being used to help or manipulate users

For each pattern found:
- Identify the target emotion and the design element creating it
- Assess whether the emotion serves the user or the business at the user's expense
- Determine if the emotional design is culturally appropriate
- Evaluate accessibility of emotional cues
- Suggest improvements for ethical, effective emotional design

Consider:
- Is the emotional design reducing anxiety or creating it?
- Are positive emotions used to obscure risks or genuinely support users?
- Do error states maintain empathy or abandon it?
- Is there emotional consistency across the journey?
- Are vulnerable users protected from emotional manipulation?

Provide actionable recommendations for ethical, effective emotional design.`,

    outputSchema: {
      type: 'object',
      properties: {
        affectPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              targetEmotion: { type: 'string' },
              designMechanism: { type: 'string' },
              userImpact: { type: 'string' },
              ethicalAssessment: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'element',
              'targetEmotion',
              'designMechanism',
              'userImpact',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            dominantEmotion: { type: 'string' },
            emotionalConsistency: { type: 'number' },
            anxietyLevel: { type: 'number' },
            delightLevel: { type: 'number' },
            manipulationRisk: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'dominantEmotion',
            'emotionalConsistency',
            'anxietyLevel',
            'delightLevel',
            'manipulationRisk',
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
        'affectPatterns',
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
        title: 'Map the Emotional Journey',
        description:
          'Identify the emotional state of users at each step of your key flows — what they feel, what they need to feel, and where the gaps are',
        example:
          'For a health app onboarding: Step 1 (curious but skeptical), Step 2 (slightly anxious about data sharing), Step 3 (hopeful about outcomes), Step 4 (committed and motivated)',
        tips: [
          'Interview users about their emotional states at each step',
          'Map emotional peaks and valleys in the current experience',
          'Identify moments where negative affect causes drop-offs',
        ],
      },
      {
        step: 2,
        title: 'Choose Your Emotional Palette',
        description:
          'Select colors, typography, illustration style, and animation qualities that match the desired emotional tone',
        example:
          'For a finance app targeting anxious first-time investors: soft blues and greens, rounded sans-serif, warm hand-drawn illustrations, gentle easing animations',
        tips: [
          'Test color palettes with users for emotional associations',
          'Ensure emotional palette works across cultures in your market',
          'Create a mood board before jumping to UI design',
        ],
      },
      {
        step: 3,
        title: 'Design for Emotional Transitions',
        description:
          'Craft smooth emotional transitions between steps, especially when moving from positive to sensitive moments',
        example:
          'When transitioning from feature discovery (excitement) to payment (anxiety), gradually introduce trust signals and maintain warm copy tone',
        tips: [
          'Never abruptly shift emotional tone at conversion points',
          'Use progressive disclosure to ease into anxiety-inducing steps',
          'Add reassurance precisely where anxiety peaks',
        ],
      },
      {
        step: 4,
        title: 'Build Empathetic Error States',
        description:
          'Design error, empty, and failure states with the same emotional care as success states',
        example:
          'Instead of "Error 403: Forbidden", use "Hmm, it looks like you don\'t have access to this yet. Here\'s how to get it:" with a friendly illustration',
        tips: [
          'Error states are when users most need emotional support',
          'Always provide a clear path forward from errors',
          'Use humor carefully — it can help or feel dismissive',
        ],
      },
      {
        step: 5,
        title: 'Test Emotional Impact',
        description:
          'Measure emotional responses through user testing, sentiment analysis, and behavioral metrics',
        example:
          'Run A/B tests comparing warm vs clinical checkout flows, measuring not just conversion but post-purchase satisfaction and return rates',
        tips: [
          'Use emotion tracking in user tests (self-reported affect scales)',
          'Track behavioral proxies: time on page, abandonment, return visits',
          'Ask users how the interface made them feel, not just what they did',
        ],
      },
    ],

    dos: [
      'Design for the emotional state users are actually in, not the state you wish they were in',
      'Use warm, calming design in anxiety-inducing flows (payments, health data, account management)',
      'Maintain emotional consistency across the entire user journey',
      'Create empathetic error states that maintain positive affect during failures',
      'Use celebration and delight for genuine milestones and achievements',
      'Choose imagery and illustrations that create appropriate emotional associations',
      'Test emotional design with diverse cultural groups',
      'Provide reduced-motion alternatives for emotional animations',
    ],

    donts: [
      'Don\'t use fear, guilt, or shame to drive conversions',
      'Don\'t gamify sensitive decisions (financial, health, legal) with celebratory affect',
      'Don\'t create emotional inconsistency (playful brand, cold checkout)',
      'Don\'t use manipulative urgency (fake countdowns, manufactured scarcity) to induce anxiety',
      'Don\'t use confirmshaming in opt-out copy',
      'Don\'t ignore the emotional needs of users in error or failure states',
      'Don\'t assume emotional associations are universal across cultures',
      'Don\'t use positive affect to mask genuinely risky decisions from users',
    ],

    bestPractices: [
      {
        title: 'Emotional Design Audit',
        description:
          'Regularly audit your interface for emotional tone, checking that every screen creates an appropriate emotional response',
        rationale:
          'Emotional inconsistencies erode trust; systematic auditing catches tone shifts before users do',
        example:
          'Screenshot every screen in a flow, lay them out in order, and ask: "Does the emotional journey feel consistent and supportive?"',
      },
      {
        title: 'Anxiety-First Design',
        description:
          'Identify the most anxiety-inducing moments in your product and design those first with extra emotional care',
        rationale:
          'Users are most likely to abandon at anxiety peaks. Emotional design has the highest ROI at these moments.',
        example:
          'For e-commerce: design the payment page, shipping cost reveal, and account creation with maximum emotional reassurance',
      },
      {
        title: 'Emotional Accessibility',
        description:
          'Ensure emotional design cues are perceivable through multiple channels (visual, textual, auditory)',
        rationale:
          'Color-blind users can\'t perceive warm orange tones. Screen reader users can\'t see friendly illustrations. Emotional design must be inclusive.',
        example:
          'Pair calming illustrations with calming copy. Add alt text that conveys emotional tone, not just content.',
      },
      {
        title: 'Affect-Appropriate Celebrations',
        description:
          'Scale emotional celebrations to match the significance of the achievement',
        rationale:
          'Over-celebrating trivial actions devalues genuine achievements and feels hollow',
        example:
          'Subtle checkmark for routine tasks, confetti for major milestones, personalized message for life achievements',
      },
      {
        title: 'Emotional Recovery Design',
        description:
          'Design dedicated recovery paths for users who have experienced negative affect',
        rationale:
          'Users who hit errors or frustrations need emotional repair before they can re-engage productively',
        example:
          'After a failed payment: acknowledge frustration, provide clear next steps, and offer an alternative path (phone support, chat)',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Emotional imagery must have text alternatives that convey emotional context',
        implementation:
          'Write alt text that includes emotional tone: "A friendly robot waving hello" not just "robot illustration". Ensure screen reader users receive the same emotional cues.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely on color alone for emotional communication',
        implementation:
          'Pair emotional color cues with icons, text labels, and semantic HTML. A warm orange "success" needs a checkmark icon and "Success!" text too.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.3',
        guideline:
          'Animation from Interactions - Respect reduced motion preferences for emotional animations',
        implementation:
          'Provide reduced-motion alternatives for celebration animations and emotional transitions. Use prefers-reduced-motion media query.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Emotional color palettes must still meet contrast requirements',
        implementation:
          'Soft, pastel, or warm color palettes often fail contrast checks. Verify all text on emotional backgrounds meets 4.5:1 ratio.',
      },
    ],

    ethics: [
      {
        concern: 'Emotional Manipulation',
        severity: 'critical',
        explanation:
          'Using fear, guilt, shame, or manufactured urgency to bypass rational decision-making and drive conversions',
        mitigation:
          'Audit all copy and design for manipulative emotional triggers. Use positive affect to support users, never to exploit them. Establish clear emotional design ethics guidelines for your team.',
      },
      {
        concern: 'Affect Masking Risk',
        severity: 'high',
        explanation:
          'Using positive emotional design to make genuinely risky decisions feel safe (e.g., gamified high-risk trading)',
        mitigation:
          'Ensure emotional design in high-stakes contexts (finance, health) includes clear, prominent risk information that emotional design does not diminish.',
      },
      {
        concern: 'Emotional Exploitation of Vulnerable Users',
        severity: 'critical',
        explanation:
          'Users in emotional distress (grief, anxiety, financial stress) are more susceptible to affect-driven manipulation',
        mitigation:
          'Identify vulnerable user contexts and reduce emotional manipulation in those flows. Provide calm, factual interfaces for high-stakes decisions.',
      },
      {
        concern: 'Addictive Emotional Loops',
        severity: 'high',
        explanation:
          'Using emotional reward cycles (celebration, loss, anticipation) to create compulsive usage patterns',
        mitigation:
          'Design for sustainable engagement. Add usage awareness features. Ensure emotional rewards correspond to genuine user value, not just engagement metrics.',
      },
      {
        concern: 'Cultural Emotional Insensitivity',
        severity: 'medium',
        explanation:
          'Emotional associations with colors, gestures, imagery, and symbols vary significantly across cultures',
        mitigation:
          'Research emotional associations in your target markets. Test with diverse user groups. Provide culturally adaptive emotional design when serving global audiences.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Affect Heuristic in Judgments of Risks and Benefits',
        author: 'Finucane, M. L., Alhakami, A., Slovic, P., & Johnson, S. M.',
        year: 2000,
        doi: '10.1002/(SICI)1099-0771(200001/03)13:1<1::AID-BDM333>3.0.CO;2-S',
        description:
          'Foundational empirical study demonstrating the inverse relationship between perceived risk and perceived benefit, driven by affect',
        type: 'foundational',
      },
      {
        title: 'The Affect Heuristic',
        author: 'Slovic, P., Finucane, M. L., Peters, E., & MacGregor, D. G.',
        year: 2002,
        description:
          'Comprehensive theoretical framework establishing the affect heuristic as a core judgment mechanism, published in Heuristics and Biases: The Psychology of Intuitive Judgment',
        type: 'foundational',
      },
      {
        title: 'Risk as Analysis and Risk as Feelings: Some Thoughts about Affect, Reason, Risk, and Rationality',
        author: 'Slovic, P., Peters, E., Finucane, M. L., & MacGregor, D. G.',
        year: 2004,
        doi: '10.1111/j.0272-4332.2004.00433.x',
        description:
          'Explores the dual-process model of risk perception — analytic vs affective — and how they interact in decision-making',
        type: 'advanced',
      },
      {
        title: 'Descartes\' Error: Emotion, Reason, and the Human Brain',
        author: 'Damasio, A. R.',
        year: 1994,
        description:
          'Landmark work on the somatic marker hypothesis, showing that emotions are essential to rational decision-making, not opposed to it',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Emotional Design: Why We Love (or Hate) Everyday Things',
        author: 'Norman, Donald A.',
        year: 2004,
        isbn: '9780465051366',
        description:
          'The seminal work on emotional design, establishing visceral, behavioral, and reflective levels of emotional response to products',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of System 1 (emotional, automatic) vs System 2 (rational, deliberate) thinking and how affect influences judgment',
        type: 'foundational',
      },
      {
        title: 'Designing for Emotion',
        author: 'Walter, Aarron',
        year: 2011,
        isbn: '9781937557003',
        description:
          'Practical UX guide to designing emotional interfaces, with frameworks for creating emotional engagement',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Emotion & Design: Attractive things work better',
        author: 'Norman, Donald A.',
        url: 'https://jnd.org/emotion_design_attractive_things_work_better/',
        description:
          'Don Norman explains how positive affect improves usability perception — attractive interfaces literally feel easier to use',
        type: 'practical',
      },
      {
        title: 'The Role of Affect and Emotion in Decision Making',
        author: 'Lerner, J. S., Li, Y., Valdesolo, P., & Kassam, K. S.',
        url: 'https://doi.org/10.1146/annurev-psych-010213-115043',
        description:
          'Annual Review of Psychology overview of how specific emotions (not just valence) influence specific types of decisions',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'Emotional Design — Why We Love (or Hate) Everyday Things',
        author: 'Don Norman',
        url: 'https://www.ted.com/talks/don_norman_on_design_and_emotion',
        description:
          'Don Norman\'s TED talk on the three levels of emotional design and why aesthetics matter for usability',
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
