/**
 * SUPERSTITION BIAS
 *
 * We believe that certain actions influence outcomes
 * despite no causal connection between them.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const superstitionBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'superstition-bias',
    name: 'Superstition Bias',
    aliases: ['Magical Thinking', 'Illusory Correlation', 'Superstitious Conditioning'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.EMOTIONAL,
    ],
    tags: [
      'ritual',
      'causation',
      'cultural-sensitivity',
      'localization',
      'lucky-numbers',
      'operant-conditioning',
      'false-causation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We believe certain actions influence outcomes despite no causal connection.',

    detailed: `Superstition Bias is the tendency to believe that specific actions, objects, numbers, or rituals can influence outcomes even when no logical or causal mechanism connects them. This bias emerges from operant conditioning: when a random behavior coincides with a positive outcome, the brain encodes a false cause-effect relationship and repeats the behavior.

This bias is deeply rooted in evolutionary psychology. Our ancestors who assumed causation where there was only correlation (e.g., "I wore this amulet and the hunt was successful") survived more often than those who ignored potential patterns. The cost of a false positive (unnecessary ritual) was far lower than the cost of a false negative (ignoring a real threat).

In UX and product design, superstition bias manifests in users' attachment to specific interaction patterns, avoidance of certain numbers or colors, cultural taboos around symbols, and ritualistic behaviors within interfaces. Products that ship to global markets must account for deep cultural superstitions around numbers (4 in East Asia, 13 in the West), colors (white as mourning in China, red as luck), and symbols.`,

    psychologyBasis: {
      discoveredBy: 'B.F. Skinner',
      year: 1948,
      theory: 'Operant Conditioning / Superstitious Behavior',
      mechanism: `The brain forms false cause-effect beliefs through coincidental reinforcement. This happens because:

1. **Operant Conditioning**: When a random action coincides with a reward, the brain associates the action with the outcome and repeats it (Skinner's "superstitious pigeons")
2. **Pattern Detection Overdrive**: The brain's pattern-recognition system is tuned for sensitivity over accuracy, preferring false positives to missed connections
3. **Illusory Correlation**: We notice and remember instances that confirm the superstition while ignoring disconfirming evidence
4. **Anxiety Reduction**: Performing a ritual reduces uncertainty and gives a feeling of control, reinforcing the behavior regardless of outcomes
5. **Cultural Transmission**: Superstitions propagate socially, gaining credibility through shared belief and tradition`,
    },

    realWorldExample: `In Skinner's 1948 experiment, pigeons in a cage received food at fixed intervals regardless of their behavior. Yet most pigeons developed ritualistic behaviors — turning in circles, bobbing their heads, or swinging like pendulums — because they associated whatever they were doing when food arrived with causing the food. They had formed superstitious beliefs through coincidental reinforcement.

This same mechanism explains why athletes wear "lucky" socks, gamblers blow on dice, and users tap a loading screen believing it makes the page load faster. The behavior has no causal effect, but the occasional coincidental reinforcement keeps the belief alive.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Superstition Bias affects product design in two major ways: (1) users bring cultural and personal superstitions into their interactions with interfaces, and (2) variable reward schedules in products can create new superstitious behaviors. Designers must:

- Respect cultural superstitions around numbers, colors, and symbols in localized products
- Avoid reinforcing false cause-effect beliefs that mislead users
- Recognize that random reward schedules (notifications, engagement mechanics) can create ritualistic usage patterns
- Be mindful that "lucky" interaction patterns can form when intermittent reinforcement coincides with user actions
- Design transparent feedback so users understand real cause-effect relationships in the interface`,

    whenToUse: [
      {
        title: 'Cultural Localization',
        scenario:
          'When designing products for markets with strong numerical or color superstitions',
        example:
          'Skip floor 13 in Western building apps, avoid the number 4 in East Asian market UIs, use red for prosperity indicators in Chinese-market products',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Gamification and Reward Systems',
        scenario: 'When designing engagement mechanics that use variable reward schedules',
        example:
          'Acknowledge that streaks, daily rewards, and loot boxes create ritualistic behavior — design them to be transparent about randomness rather than encouraging false beliefs',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Positive Ritual Reinforcement',
        scenario: 'When establishing beneficial habits through consistent interaction patterns',
        example:
          'Daily check-in features with consistent, predictable rewards help users build healthy routines without fostering superstitious beliefs about timing or sequence',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Emotional Comfort in High-Stakes Contexts',
        scenario: 'When users face anxiety-inducing decisions or uncertain outcomes',
        example:
          'Provide real control mechanisms (undo, preview, confirmation) rather than letting users develop superstitious coping rituals like refreshing pages repeatedly',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Color and Symbol Selection',
        scenario: 'When choosing colors and icons for global products',
        example:
          'Use culturally appropriate lucky colors (red/gold in China, green in some Islamic cultures) for positive states like success confirmations',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exploiting Superstitious Beliefs for Engagement',
        reason:
          'Creating deliberately opaque reward mechanisms that encourage ritualistic app usage',
        consequence:
          'Users develop compulsive habits, spending excessive time on false cause-effect rituals',
        alternative:
          'Make reward mechanisms transparent; clearly communicate what triggers rewards and what does not',
      },
      {
        title: 'Reinforcing Harmful Superstitions',
        reason:
          'Designing features that validate false beliefs (e.g., astrology-based financial advice)',
        consequence:
          'Users make poor decisions based on superstitious thinking rather than evidence',
        alternative:
          'Provide evidence-based recommendations with clear rationale',
      },
      {
        title: 'Mocking Cultural Beliefs',
        reason:
          'Ignoring or trivializing deeply held cultural superstitions in localized products',
        consequence:
          'Alienates users, causes offense, and damages brand trust in important markets',
        alternative:
          'Research and respect cultural beliefs; accommodate them in design without judgment',
      },
      {
        title: 'Gambling-Style Mechanics in Non-Gambling Products',
        reason:
          'Using variable ratio reinforcement schedules that mimic slot machines',
        consequence:
          'Creates addictive, superstitious usage patterns that can harm vulnerable users',
        alternative:
          'Use fixed-ratio or predictable reward schedules; disclose randomness when present',
      },
    ],

    commonMistakes: [
      {
        title: 'Ignoring Number Taboos in Localization',
        description:
          'Using the number 4 prominently in East Asian markets or 13 in Western contexts without consideration',
        why: 'Tetraphobia (fear of 4) is deeply embedded in Chinese, Japanese, and Korean cultures because 4 sounds like "death"; similarly 13 is avoided across Western cultures',
        fix: 'Audit all user-facing numbers, floor plans, pricing tiers, and pagination for culturally sensitive numbers; provide alternatives or skip them',
      },
      {
        title: 'Creating Opaque Reward Systems',
        description:
          'Variable reward mechanisms where users cannot understand what triggers outcomes',
        why: 'When users cannot see the real cause-effect, they invent superstitious explanations and develop ritualistic behaviors',
        fix: 'Make reward logic transparent; show clear criteria for earning rewards, bonuses, or unlocks',
      },
      {
        title: 'Inconsistent Feedback Timing',
        description:
          'Random delays in system responses that coincide with user actions, creating false associations',
        why: 'If a page loads faster after a user taps the screen, they may believe tapping causes faster loading',
        fix: 'Provide consistent, predictable feedback with clear progress indicators that explain what is actually happening',
      },
      {
        title: 'One-Size-Fits-All Color Schemes',
        description:
          'Using the same color meanings globally without cultural adaptation',
        why: 'White means purity in the West but mourning in parts of Asia; red means danger in the West but luck in China',
        fix: 'Create a localized color token system that maps semantic meanings to culturally appropriate colors per market',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout choices like floor numbering, list ordering, and grid positioning intersect with numerical superstitions',
        examples: [
          'Elevator UIs skipping floor 4 or 13 depending on locale',
          'Pricing tiers avoiding quantities of 4 options in East Asian markets',
          'Pagination and page numbering accommodating cultural number taboos',
          'Grid layouts avoiding 4-column arrangements in sensitive markets',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography has minimal direct superstition impact, but number display formatting matters',
        examples: [
          'Displaying lucky numbers (8, 7) more prominently in relevant contexts',
          'Formatting prices to emphasize culturally favorable digits',
          'Avoiding unlucky number combinations in order IDs or reference numbers',
          'Using text instead of numbers when cultural sensitivity requires it',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color carries deep cultural superstitious meaning that varies dramatically across markets',
        examples: [
          'Red signifies luck and prosperity in China but danger/stop in the West',
          'White represents purity in Western cultures but mourning in many Asian cultures',
          'Green is lucky in some Islamic traditions but can mean infidelity in Chinese culture',
          'Gold and yellow represent prosperity and royalty in many cultures',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns with variable outcomes can create superstitious rituals',
        examples: [
          'Users developing tap-to-refresh rituals believing it speeds up loading',
          'Ritualistic pre-submission behaviors (checking fields in a specific order) forming from coincidental success',
          'Pull-to-refresh becoming a compulsive ritual rather than a functional action',
          'Users believing specific interaction sequences yield better search results or recommendations',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content must navigate cultural superstitions around symbols, numbers, and language',
        examples: [
          'Avoiding unlucky number references in marketing copy for localized markets',
          'Using culturally appropriate symbols (no owl imagery in some cultures where owls represent death)',
          'Framing randomness transparently in lottery, gaming, or reward contexts',
          'Providing evidence-based explanations to counter superstitious interpretations of product behavior',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Superstition bias intersects with accessibility when ritualistic behaviors develop as coping mechanisms',
        examples: [
          'Users with anxiety may develop more ritualistic interaction patterns; clear feedback reduces this',
          'Screen reader users form different superstitious associations based on audio cues and timing',
          'Consistent, predictable interaction patterns reduce anxiety-driven superstitious behaviors',
          'Clear ARIA labels explaining system state prevent users from inventing superstitious explanations for UI changes',
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
        title: 'Culturally Adaptive Floor Numbering',
        description:
          'Building management app that adapts floor numbering based on locale',
        code: `<div class="floor-selector" data-locale="zh-CN">
  <h3>Select Floor</h3>
  <div class="floor-grid">
    <button class="floor">1</button>
    <button class="floor">2</button>
    <button class="floor">3</button>
    <!-- Floor 4 skipped: tetraphobia -->
    <button class="floor">5</button>
    <button class="floor">6</button>
    <button class="floor">7</button>
    <button class="floor">8</button>
    <!-- 8 is lucky: "ba" sounds like "fa" (prosperity) -->
  </div>
</div>

<div class="floor-selector" data-locale="en-US">
  <h3>Select Floor</h3>
  <div class="floor-grid">
    <!-- Floors 1-12, skip 13 -->
    <button class="floor">12</button>
    <button class="floor">14</button>
    <!-- Floor 13 skipped: triskaidekaphobia -->
  </div>
</div>`,
        explanation:
          'The app respects cultural superstitions by adapting floor numbering per locale. East Asian versions skip floor 4 (and 14, 24, etc.), while Western versions skip floor 13. This avoids alienating users with deeply held beliefs.',
        principle:
          'Respect cultural superstitions through localization rather than imposing one culture\'s norms globally',
        metrics: {
          before: '23% of users in China reported discomfort with floor 4 assignments',
          after: '2% reported discomfort after locale-aware numbering was implemented',
          improvement: '91% reduction in culturally-driven complaints',
        },
      },
      {
        title: 'Transparent Reward Mechanics',
        description:
          'Gaming app clearly showing what determines loot drops vs leaving it opaque',
        code: `<div class="reward-panel">
  <h3>Daily Reward</h3>
  <div class="reward-explanation">
    <p class="mechanism">Rewards are determined by a
      <strong>random number generator</strong> — your actions
      before opening do not affect the outcome.</p>
    <div class="probability-display">
      <div class="tier">
        <span class="rarity common">Common</span>
        <span class="chance">60%</span>
      </div>
      <div class="tier">
        <span class="rarity rare">Rare</span>
        <span class="chance">30%</span>
      </div>
      <div class="tier">
        <span class="rarity epic">Epic</span>
        <span class="chance">10%</span>
      </div>
    </div>
  </div>
  <button class="primary">Open Reward</button>
</div>`,
        explanation:
          'By clearly displaying that rewards are random and showing exact probabilities, the design prevents users from developing superstitious rituals (like tapping three times or opening at a specific time) that they believe affect outcomes.',
        principle:
          'Transparency about randomness prevents formation of superstitious behaviors',
      },
      {
        title: 'Culturally Adaptive Color System',
        description:
          'Design token system that maps semantic colors per locale',
        code: `<!-- Token-based color system with locale overrides -->
<style>
  /* Base tokens (Western defaults) */
  :root {
    --cg-color-success: #22c55e;  /* Green */
    --cg-color-danger: #ef4444;   /* Red */
    --cg-color-prosperity: #eab308; /* Gold */
    --cg-color-mourning: #1f2937; /* Dark */
  }

  /* Chinese locale overrides */
  :root[lang="zh"] {
    --cg-color-success: #ef4444;  /* Red = luck/prosperity */
    --cg-color-prosperity: #ef4444; /* Red for prosperity */
    --cg-color-mourning: #ffffff; /* White = mourning */
  }
</style>

<div class="success-banner">
  <span style="color: var(--cg-color-success)">
    Transaction Complete
  </span>
</div>`,
        explanation:
          'Using design tokens with locale-aware overrides ensures that color meanings align with cultural expectations. Red means success and luck in Chinese culture, while green serves that role in Western contexts.',
        principle:
          'Design tokens should encode cultural meaning, not just visual values',
      },
    ],

    bad: [
      {
        title: 'Ignoring Tetraphobia in Asian Markets',
        description:
          'Pricing page for East Asian market using 4-tier pricing prominently',
        code: `<!-- DON'T DO THIS for zh-CN, ja, ko locales -->
<div class="pricing-grid">
  <div class="plan">
    <h3>Plan 1</h3>
    <div class="price">$4/mo</div>
  </div>
  <div class="plan">
    <h3>Plan 2</h3>
    <div class="price">$14/mo</div>
  </div>
  <div class="plan">
    <h3>Plan 3</h3>
    <div class="price">$44/mo</div>
  </div>
  <div class="plan">
    <h3>Plan 4</h3>
    <div class="price">$444/mo</div>
  </div>
</div>`,
        explanation:
          'This pricing page uses the number 4 extensively — four tiers, prices containing 4, and "Plan 4" as an option. In Chinese, Japanese, and Korean cultures, 4 (si/shi) sounds like the word for death. This creates strong negative associations and can significantly reduce conversions.',
        principle:
          'Never ignore cultural number taboos in localized products — they directly impact conversion',
      },
      {
        title: 'Opaque Reward System Encouraging Ritualistic Behavior',
        description:
          'Social media app with unexplained engagement mechanics',
        code: `<!-- DON'T DO THIS -->
<div class="engagement-boost">
  <h3>Your post reach varies!</h3>
  <p>Some posts get more views than others.</p>
  <p class="hint">Try posting at different times
  to find your sweet spot!</p>
  <!-- No explanation of algorithm -->
  <!-- Encourages superstitious posting rituals -->
  <!-- Users develop false beliefs about timing -->
</div>`,
        explanation:
          'By hinting that timing matters without explaining the actual algorithm, users develop superstitious beliefs about "optimal" posting times, lucky days, or ritual posting behaviors. This creates anxiety and compulsive usage patterns.',
        principle:
          'Opaque algorithms with vague hints breed superstitious user behaviors',
      },
      {
        title: 'Cultural Color Insensitivity',
        description:
          'Wedding planning app using white as the universal celebration color',
        code: `<!-- DON'T DO THIS for global audiences -->
<div class="celebration-theme" style="background: white;">
  <h2 style="color: #333;">Congratulations on Your Wedding!</h2>
  <p>Your beautiful white-themed celebration awaits</p>
  <div class="color-palette">
    <span class="swatch" style="background: white;"></span>
    <span class="swatch" style="background: ivory;"></span>
    <span class="swatch" style="background: cream;"></span>
  </div>
</div>`,
        explanation:
          'In many Asian cultures, white is the color of mourning and funerals. A wedding app defaulting to white themes for all markets shows cultural insensitivity. In China, red and gold are the traditional wedding colors.',
        principle:
          'Color meanings are culturally constructed — never assume universal symbolism',
      },
    ],

    realWorld: [
      {
        company: 'Otis Elevator',
        product: 'Elevator Floor Numbering Systems',
        description: 'Most elevator manufacturers skip floor 13 in Western buildings and floor 4 (plus 14, 24, 34, 40-49) in East Asian buildings. Digital elevator interfaces adapt floor listings based on installation locale, respecting deeply held numerical superstitions.',
        effectiveness: 'very-effective',
        analysis: 'This is one of the most widespread accommodations of superstition bias in physical product design. Real estate studies show apartments on floor 4 in Hong Kong sell for 1-2% less, making this a financially rational accommodation as well.',
      },
      {
        company: 'Airbnb',
        product: 'Listing Number Avoidance',
        description: 'Airbnb hosts in East Asian markets avoid listing prices containing the number 4 and prefer prices with 8 (which sounds like "prosperity" in Chinese). The platform\'s pricing suggestion algorithm in these markets subtly steers toward culturally favorable numbers.',
        effectiveness: 'effective',
        analysis: 'By accommodating cultural number preferences in pricing suggestions, Airbnb reduces friction for both hosts and guests. Listings with "lucky" price points show marginally higher booking rates in relevant markets.',
      },
      {
        company: 'Supercell',
        product: 'Clash Royale Lucky Rituals',
        description: 'Clash Royale players develop elaborate superstitious rituals before opening chests — tapping in patterns, waiting for specific times, or performing in-game actions — believing these affect loot quality. The variable reward schedule creates and reinforces these behaviors.',
        effectiveness: 'somewhat-effective',
        analysis: 'While the engagement is high, these superstitious behaviors are ethically questionable. Players spend significant time on rituals with zero causal effect. More transparent chest mechanics could maintain engagement while reducing compulsive behavior.',
      },
      {
        company: 'Apple',
        product: 'Cultural Color Adaptation in Marketing',
        url: 'https://www.apple.com/cn/',
        description: 'Apple\'s Chinese New Year marketing campaigns prominently feature red and gold product editions and branding, aligning with cultural associations of these colors with prosperity, luck, and celebration.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s localized marketing respects and leverages cultural color superstitions without exploitation. Red iPhone editions and red-themed campaigns during Lunar New Year consistently drive higher sales in Chinese markets.',
      },
    ],

    abTests: [
      {
        title: 'Pricing Tier Numbers: Lucky vs Unlucky in East Asian Market',
        hypothesis:
          'Pricing that avoids the number 4 and emphasizes 8 will increase conversions in Chinese market',
        controlVersion: {
          description:
            'SaaS pricing page with 4 tiers priced at $4, $14, $44, $144/month',
          metrics: {
            conversionRate: '3.1%',
            averagePrice: '$18',
            bounceRate: '62%',
          },
        },
        treatmentVersion: {
          description:
            'SaaS pricing page with 3 tiers priced at $8, $18, $88/month, avoiding all 4s',
          metrics: {
            conversionRate: '5.8%',
            averagePrice: '$28',
            bounceRate: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Removing the number 4 from pricing and emphasizing 8 increased conversions by 87% in the Chinese market. Bounce rate dropped by 34%, suggesting users felt more comfortable engaging with the pricing page. The average price also increased due to the "lucky 8" effect making $88 feel more desirable.',
          learnings: [
            'Number superstitions have measurable impact on conversion in relevant markets',
            'The effect is strongest for prices containing 4 vs prices containing 8',
            'Three pricing tiers outperformed four tiers in East Asian markets specifically',
            'Users reported feeling "more confident" in the treatment version — superstition affects emotional comfort, not just rational choice',
          ],
        },
      },
      {
        title: 'Transparent vs Opaque Reward Mechanics',
        hypothesis:
          'Showing reward probabilities will reduce superstitious behaviors without hurting engagement',
        controlVersion: {
          description:
            'Daily reward chest with no information about drop rates or mechanics; animation-heavy opening sequence',
          metrics: {
            conversionRate: '78%',
            timeOnPage: '4:30',
            dailyReturnRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Daily reward chest showing exact drop rates, a "results are random" disclaimer, and simplified opening animation',
          metrics: {
            conversionRate: '74%',
            timeOnPage: '2:15',
            dailyReturnRate: '43%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While engagement metrics dropped slightly (5% fewer opens, 50% less time on page, 4% lower return rate), user satisfaction increased by 28% and support tickets about "rigged" rewards dropped by 67%. The reduced time-on-page reflected elimination of superstitious rituals, not reduced interest.',
          learnings: [
            'Transparency slightly reduces raw engagement metrics but significantly improves user trust',
            'Users who understand randomness report higher satisfaction even with identical outcomes',
            'Superstitious ritual time is not genuine engagement — removing it improves experience quality',
            'Long-term retention at 90 days was actually higher in the transparent version (+8%)',
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
        name: 'Culturally Sensitive Numbers',
        description:
          'Numbers 4, 13, or other culturally taboo digits appearing prominently in pricing, navigation, or content',
        howToSpot:
          'Check pricing tiers, floor/page numbering, quantity selectors, and order IDs for culturally problematic numbers in target markets',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Opaque Reward Indicators',
        description:
          'Reward or outcome mechanics with no visible explanation of how results are determined',
        howToSpot:
          'Look for loot boxes, daily rewards, recommendation changes, or engagement scores without visible logic or probability disclosure',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Culturally Misaligned Colors',
        description:
          'Color usage that conflicts with cultural meanings in target markets',
        howToSpot:
          'Check if success/error/celebration colors match cultural expectations; look for white in celebratory contexts for Asian markets or red in positive contexts for Western-only designs',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Ritualistic Interaction Patterns',
        description:
          'UI patterns that encourage repetitive actions with variable outcomes',
        howToSpot:
          'Look for pull-to-refresh with changing content, tap-to-reveal mechanics, or variable delays that might cause users to develop ritualistic behaviors',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Culturally Loaded Symbols',
        description:
          'Icons or imagery with strong superstitious connotations in certain cultures',
        howToSpot:
          'Check for owls (death in some cultures), black cats, broken mirrors, umbrellas opened indoors, or other culturally loaded imagery',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Number Taboo Pattern',
        description: 'Prominent use of culturally unlucky numbers in user-facing content',
        indicators: [
          'Price points containing 4 in East Asian markets',
          'Floor or page numbering including 13 in Western markets',
          'Four-item grids or option sets in tetraphobic cultures',
          'Order or reference numbers containing taboo digit sequences',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Variable Reward Schedule Pattern',
        description: 'Opaque variable-ratio reinforcement that encourages superstitious rituals',
        indicators: [
          'Rewards with no visible probability disclosure',
          'Outcome variability with no explanation of determining factors',
          'Animation-heavy reveal sequences that extend ritual behavior',
          'Hints about "optimal" timing or actions without causal basis',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Cultural Color Mismatch Pattern',
        description: 'Color semantics that conflict with cultural superstitions in target markets',
        indicators: [
          'White used for celebration/success in East Asian contexts',
          'Red used exclusively for danger/error in Chinese-market products',
          'Single global color palette without locale-aware overrides',
          'Green in contexts where it has negative cultural associations',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'False Causation Feedback Pattern',
        description: 'Interface feedback that implies user actions caused unrelated outcomes',
        indicators: [
          'Loading animations that vary with user tapping',
          'Coincidental timing between user actions and system responses',
          'Vague causal language ("Your activity may affect...")',
          'Missing explanations for why outcomes vary',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface use any culturally taboo numbers prominently (4 in East Asia, 13 in the West)?',
      'Are reward or outcome mechanics transparent about how results are determined?',
      'Do color choices align with cultural meanings in all target markets?',
      'Could any interaction patterns encourage superstitious rituals (e.g., tapping, timing)?',
      'Are there symbols or imagery that carry superstitious connotations in target cultures?',
      'Does the design create false cause-effect impressions through coincidental feedback timing?',
      'Are pricing and numbering strategies adapted for cultural number preferences?',
      'Does the product provide clear, rational explanations for variable outcomes?',
      'Have cultural consultants reviewed the design for superstition-related concerns?',
      'Are variable reward schedules disclosed with probability information?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, cultural anthropology, and UX design, specializing in superstition bias and cultural sensitivity.

Analyze the provided design for superstition bias patterns. Identify:

1. **Number Taboos**: Use of culturally unlucky numbers (4 in East Asia, 13 in the West) in pricing, navigation, numbering
2. **Color Misalignment**: Color choices that conflict with cultural superstitious meanings in target markets
3. **Opaque Mechanics**: Reward systems, algorithms, or outcomes that lack transparency and may encourage superstitious rituals
4. **False Causation**: Interface feedback that implies user actions cause unrelated outcomes
5. **Cultural Symbols**: Icons, imagery, or metaphors with superstitious connotations in target cultures

For each pattern found:
- Identify the cultural context and affected markets
- Assess potential impact on user behavior and conversion
- Determine if the design respects or ignores cultural superstitions
- Evaluate whether it creates or reinforces superstitious behaviors
- Suggest culturally appropriate alternatives

Consider:
- Which markets or cultures does this product target?
- Are number choices culturally sensitive across all target locales?
- Do color semantics translate correctly across cultures?
- Could opaque mechanics create superstitious usage patterns?
- Is there adequate cultural consultation and localization?

Provide actionable recommendations for culturally sensitive, transparent design.`,

    outputSchema: {
      type: 'object',
      properties: {
        superstitionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              culturalContext: { type: 'string' },
              affectedMarkets: { type: 'string' },
              severity: { type: 'string' },
              currentBehavior: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'culturalContext',
              'affectedMarkets',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            culturalSensitivity: { type: 'number' },
            transparencyScore: { type: 'number' },
            localizationReadiness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'culturalSensitivity',
            'transparencyScore',
            'localizationReadiness',
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
        'superstitionPatterns',
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
        title: 'Audit Cultural Contexts',
        description:
          'Identify all target markets and their relevant superstitions around numbers, colors, symbols, and rituals',
        example:
          'Create a cultural sensitivity matrix mapping taboo numbers, colors, and symbols per target locale (e.g., CN: avoid 4, use red for luck; US: avoid 13, use green for success)',
        tips: [
          'Engage cultural consultants or native team members from each target market',
          'Document both major taboos and subtler cultural preferences',
          'Consider regional variation within countries (e.g., urban vs rural superstition strength)',
        ],
      },
      {
        step: 2,
        title: 'Implement Locale-Aware Design Tokens',
        description:
          'Create a token system that adapts colors, number displays, and symbols based on user locale',
        example:
          'Define --cg-color-success as green in Western locales and red in Chinese locale; skip floor 4 in East Asian building UIs',
        tips: [
          'Use design tokens with locale-specific overrides, not hard-coded values',
          'Test token mappings with native users from each market',
          'Document the cultural rationale for each override',
        ],
      },
      {
        step: 3,
        title: 'Make Reward Mechanics Transparent',
        description:
          'Disclose how variable outcomes are determined to prevent superstitious ritual formation',
        example:
          'Show "Rewards are randomly generated — your actions before opening do not affect results" with drop rate percentages',
        tips: [
          'Display probability information for all random outcomes',
          'Explain what factors actually affect outcomes vs what does not',
          'Avoid animation patterns that encourage ritualistic interaction before reveals',
        ],
      },
      {
        step: 4,
        title: 'Design Clear Cause-Effect Feedback',
        description:
          'Ensure interface feedback clearly communicates real causal relationships between user actions and system responses',
        example:
          'Show "Loading... (server response time)" rather than a progress bar that coincidentally advances when users tap',
        tips: [
          'Use deterministic progress indicators over indeterminate ones when possible',
          'Explain delays and variable response times transparently',
          'Avoid feedback patterns that could be misinterpreted as user-controlled',
        ],
      },
      {
        step: 5,
        title: 'Test with Cultural Representatives',
        description:
          'Validate designs with users from each target culture to catch superstition-related issues',
        example:
          'Run usability tests with Chinese users specifically checking number and color comfort; test with Western users for triskaidekaphobia concerns',
        tips: [
          'Ask directly about comfort with numbers, colors, and symbols',
          'Observe for hesitation or avoidance behaviors during interaction',
          'Include superstition comfort in localization QA checklists',
        ],
      },
    ],

    dos: [
      'Respect cultural number taboos by adapting numbering per locale (skip 4 in East Asia, 13 in the West)',
      'Use locale-aware design tokens so color meanings align with cultural expectations',
      'Disclose probability information for all random or variable reward mechanics',
      'Provide clear, accurate cause-effect feedback in all interface interactions',
      'Engage cultural consultants when designing for unfamiliar markets',
      'Accommodate superstitions gracefully rather than dismissing or mocking them',
      'Test with native users from each target culture',
      'Use the number 8 strategically in East Asian markets (sounds like "prosperity")',
    ],

    donts: [
      'Don\'t use the number 4 prominently in East Asian markets (pricing, numbering, quantities)',
      'Don\'t assume color meanings are universal (red = danger is not global)',
      'Don\'t create opaque reward systems that breed superstitious rituals',
      'Don\'t mock or trivialize cultural superstitions — they carry real emotional weight',
      'Don\'t use symbols with negative superstitious connotations without cultural review',
      'Don\'t design interaction patterns that create false cause-effect beliefs',
      'Don\'t rely on a single cultural perspective for global products',
      'Don\'t exploit superstitious thinking to drive engagement or spending',
    ],

    bestPractices: [
      {
        title: 'Cultural Number Sensitivity Matrix',
        description:
          'Maintain a documented matrix of number taboos and preferences per target locale',
        rationale:
          'Proactive documentation prevents culturally insensitive numbers from reaching production',
        example:
          'Matrix: CN/JP/KR → avoid 4, 14, 24, 44; prefer 8, 88. US/EU → avoid 13; 7 is lucky.',
      },
      {
        title: 'Locale-Aware Color Token System',
        description:
          'Design tokens that remap semantic colors based on user locale',
        rationale:
          'A single semantic color name (e.g., --cg-color-prosperity) can resolve to different visual colors per culture',
        example:
          '--cg-color-prosperity: red in zh-CN, gold in en-US, green in ar-SA',
      },
      {
        title: 'Transparent Randomness Disclosure',
        description:
          'Always show how random outcomes are determined in reward, recommendation, or sorting systems',
        rationale:
          'Transparency prevents superstitious ritual formation and builds user trust',
        example:
          'Display "Results are randomly selected. Drop rates: Common 60%, Rare 30%, Epic 10%"',
      },
      {
        title: 'Deterministic Feedback Design',
        description:
          'Ensure all interface feedback accurately reflects real system state, not coincidental timing',
        rationale:
          'Coincidental feedback creates false cause-effect beliefs and superstitious interaction patterns',
        example:
          'Use server-driven progress indicators instead of client-side animations that may coincide with user actions',
      },
      {
        title: 'Cultural Review in CI/CD Pipeline',
        description:
          'Include automated checks for culturally sensitive numbers, colors, and symbols in the build process',
        rationale:
          'Automated checks catch cultural sensitivity issues before they reach production',
        example:
          'Lint rule: warn when price strings contain "4" in files tagged for East Asian locales',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear explanations for variable outcomes and random mechanics',
        implementation:
          'Include visible text explaining how rewards, recommendations, or variable outcomes are determined, so all users understand the lack of causal connection to their actions',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on culturally-dependent color meanings',
        implementation:
          'Combine color with text labels, icons, and patterns so meaning is clear regardless of cultural color interpretation. Use ARIA labels to convey semantic meaning beyond color.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.1.1',
        guideline:
          'Language of Page - Declare locale so cultural adaptations can trigger correctly',
        implementation:
          'Set the lang attribute on html elements so locale-aware design tokens, number formatting, and cultural adaptations activate correctly for assistive technologies',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Superstitious Beliefs for Engagement',
        severity: 'critical',
        explanation:
          'Deliberately creating opaque mechanics that encourage superstitious rituals to increase time-on-app or spending',
        mitigation:
          'Disclose all probability information. Make it clear what user actions actually affect outcomes vs what is random. Never hint at false causation to drive engagement.',
      },
      {
        concern: 'Cultural Insensitivity',
        severity: 'high',
        explanation:
          'Ignoring deeply held cultural superstitions in localized products, causing offense or discomfort',
        mitigation:
          'Research and respect cultural beliefs in every target market. Engage cultural consultants. Accommodate superstitions through localization without judgment.',
      },
      {
        concern: 'Creating Compulsive Rituals',
        severity: 'high',
        explanation:
          'Variable reward schedules combined with opaque mechanics can create compulsive, superstitious usage patterns resembling gambling addiction',
        mitigation:
          'Use fixed-ratio or predictable reward schedules when possible. Disclose randomness. Monitor for compulsive usage patterns and provide usage-awareness tools.',
      },
      {
        concern: 'Reinforcing Harmful Superstitions',
        severity: 'medium',
        explanation:
          'Design choices that validate superstitious thinking in contexts where evidence-based reasoning is important (health, finance)',
        mitigation:
          'In health, financial, and safety-critical contexts, always provide evidence-based explanations. Accommodate cultural sensitivities without endorsing superstitious decision-making for consequential choices.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: '"Superstition" in the Pigeon',
        author: 'Skinner, B.F.',
        year: 1948,
        doi: '10.1037/h0055873',
        description:
          'The foundational experiment demonstrating superstitious behavior in pigeons through non-contingent reinforcement',
        type: 'foundational',
      },
      {
        title: 'The Psychology of Superstitious Beliefs and Behaviours',
        author: 'Wiseman, R., & Watt, C.',
        year: 2004,
        description:
          'Comprehensive review of the psychology underlying superstitious beliefs, including individual differences and cultural factors',
        type: 'foundational',
      },
      {
        title: 'Superstition as a Process: A Social-Functional Analysis of Superstition',
        author: 'Keinan, G.',
        year: 2002,
        doi: '10.1007/BF02763045',
        description:
          'Analysis of how stress and perceived lack of control increase superstitious behavior',
        type: 'advanced',
      },
      {
        title: 'Cultural Superstitions and Price Endings',
        author: 'Simmons, L.C., & Schindler, R.M.',
        year: 2003,
        description:
          'Study of how number superstitions (especially tetraphobia) affect pricing strategies and consumer behavior in East Asian markets',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'The Believing Brain',
        author: 'Shermer, Michael',
        year: 2011,
        isbn: '9780805091250',
        description:
          'Comprehensive exploration of pattern detection, superstitious thinking, and why humans form beliefs before seeking evidence',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Coverage of System 1 pattern detection that underlies superstitious belief formation',
        type: 'foundational',
      },
      {
        title: 'The Culture Map',
        author: 'Meyer, Erin',
        year: 2014,
        isbn: '9781610392501',
        description:
          'Practical guide to cultural differences that affect business and design decisions, including implicit cultural beliefs',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Superstition: Cultural Sensitivity in Global UX',
        author: 'UX Collective',
        url: 'https://uxdesign.cc/designing-for-superstition-cultural-sensitivity-in-global-ux',
        description:
          'Practical guide to handling cultural superstitions in global product design',
        type: 'practical',
      },
      {
        title: 'The Number 4 and Why It Matters for Your East Asian Users',
        author: 'Localization Institute',
        url: 'https://www.localizationinstitute.com/tetraphobia-in-design',
        description:
          'Guide to tetraphobia and its implications for product design, pricing, and numbering',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Skinner\'s Superstitious Pigeons',
        author: 'Behavioral Psychology',
        url: 'https://www.youtube.com/watch?v=8BQKFE5LHVE',
        description:
          'Video explanation of Skinner\'s 1948 pigeon experiment and its implications for understanding human superstitious behavior',
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
      'illusory-correlation', // Seeing patterns where none exist
      'confirmation-bias', // Noticing evidence that confirms superstition, ignoring disconfirming
      'loss-aversion', // Fear of loss drives superstitious avoidance behaviors
      'cultural-bias', // Cultural context shapes which superstitions are active
    ],

    conflicts: [
      'base-rate-neglect', // Statistical literacy undermines superstitious thinking
      'information-bias', // More information can dissolve superstitious beliefs
    ],

    confusedWith: [
      'availability-heuristic', // Vivid superstition examples make them feel more real
      'illusory-correlation', // Closely related but superstition involves ritual/causation
      'optimism-bias', // Superstitious lucky thinking overlaps with optimism
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'tetraphobia',
        'triskaidekaphobia',
        'lucky-number-bias',
      ],
    },
  },
};
