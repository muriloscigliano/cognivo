/**
 * LUCKY NUMBER BIAS
 *
 * We attribute significance to specific numbers based on
 * cultural or personal beliefs about luck.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const luckyNumberBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'lucky-number-bias',
    name: 'Lucky Number Bias',
    aliases: ['Numerological Bias', 'Number Superstition Effect', 'Cultural Number Preference'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'pricing',
      'numbers',
      'culture',
      'localization',
      'superstition',
      'perception',
      'decision-making',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We attribute significance to specific numbers based on cultural or personal beliefs about luck.',

    detailed: `Lucky Number Bias is a cognitive bias in which people assign positive or negative significance to certain numbers based on cultural traditions, personal superstitions, or learned associations. This bias causes individuals to prefer, avoid, or respond emotionally to specific numbers regardless of their objective value.

The bias is deeply rooted in cultural context. In Western cultures, 7 is considered lucky and 13 unlucky. In Chinese and East Asian cultures, 8 is auspicious (it sounds like "prosper") while 4 is avoided (it sounds like "death"). These associations extend far beyond superstition into real economic behavior: people pay premiums for phone numbers containing 8 in China, and buildings routinely skip the 13th floor in the West.

In UX and product design, lucky number bias affects pricing strategy, localization, product naming, quantity selection, and any interface where numbers are displayed or chosen. Designers who understand this bias can create pricing that feels right to users and avoid number-related friction in international markets.`,

    psychologyBasis: {
      discoveredBy: 'Various researchers (Ang, Simmons & Schindler)',
      year: 1997,
      theory: 'Cultural Cognition and Numerical Superstition',
      mechanism: `The brain attributes significance to specific numbers based on cultural or personal beliefs about luck. This happens because:

1. **Cultural Conditioning**: From childhood, people absorb associations between numbers and fortune from family, media, and social norms
2. **Pattern Matching**: The brain seeks meaningful patterns in random sequences, attaching significance to number repetitions (777, 888)
3. **Phonetic Association**: In tonal languages like Mandarin, numbers that sound like positive words acquire positive meaning (8 sounds like "prosper")
4. **Emotional Anchoring**: Past experiences with specific numbers (winning jersey number, lucky date) create persistent emotional associations
5. **Loss Aversion Transfer**: The fear of bad luck from "unlucky" numbers triggers avoidance even when people consciously dismiss superstition

The mechanism operates largely below conscious awareness—even self-described non-superstitious individuals show measurable preferences for culturally lucky numbers.`,
    },

    realWorldExample: `In a 2003 study by Simmons and Schindler, researchers found that prices ending in 8 performed significantly better in markets with Chinese consumers. The Sichuan Airlines purchased the phone number 8888-8888 for approximately $280,000. Meanwhile, buildings across East Asia routinely skip the 4th floor (and 14th, 24th, etc.), just as Western buildings often skip floor 13. In pricing psychology, products priced at $7.77 or $9.99 consistently outperform mathematically equivalent prices that lack these number associations.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Lucky Number Bias affects how users perceive prices, evaluate options, and respond to numerical displays in interfaces. Designers can leverage this to:

- Set prices ending in culturally lucky numbers to increase perceived value and purchase intent
- Avoid unlucky numbers in pricing, quantities, and navigation for culturally sensitive markets
- Localize number presentation for international products to respect cultural number preferences
- Use lucky number patterns in gamification, rewards, and engagement mechanics
- Make number-based UX decisions (e.g., "Top 7 Features" vs "Top 6 Features") that feel more natural`,

    whenToUse: [
      {
        title: 'Pricing Strategy',
        scenario:
          'When setting product or service prices for specific cultural markets',
        example:
          'Price at $8.88 for Chinese markets or $7.77 for Western markets to leverage positive number associations',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'International Localization',
        scenario: 'When adapting products for markets with strong number preferences',
        example:
          'Avoid the number 4 in product tiers, plan names, or version numbers for East Asian markets',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Gamification and Rewards',
        scenario: 'When designing reward systems, achievements, or loyalty programs',
        example:
          'Award bonuses at 7 or 8 milestones rather than arbitrary numbers to make rewards feel more special',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Product Naming and Versioning',
        scenario: 'When choosing version numbers, edition names, or product series numbers',
        example:
          'Consider skipping version 4 for East Asian markets or emphasizing version 7 or 8 in marketing',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Limited Editions and Quantities',
        scenario: 'When choosing quantities for limited runs, bundles, or collections',
        example:
          'Offer packs of 8 instead of 10 in Chinese markets, or "Lucky 7" bundles in Western markets',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Diverse Global Audiences',
        reason:
          'Lucky numbers differ across cultures; what is lucky in one is unlucky in another',
        consequence:
          'Alienating or offending users from cultures with opposite number associations',
        alternative:
          'Research the specific target market or use culturally neutral numbers',
      },
      {
        title: 'Data-Driven Displays',
        reason:
          'Altering actual data or statistics to match lucky numbers is deceptive',
        consequence:
          'Loss of trust if users discover numbers were manipulated for superstitious appeal',
        alternative:
          'Present accurate data and use lucky number strategies only in pricing and marketing, not analytics',
      },
      {
        title: 'Scientific or Technical Contexts',
        reason:
          'Using lucky numbers in technical, medical, or scientific interfaces can undermine credibility',
        consequence:
          'Users may perceive the product as unserious or superstition-driven rather than evidence-based',
        alternative:
          'Use precise, accurate numbers and let data speak for itself',
      },
      {
        title: 'Accessibility-Critical Interfaces',
        reason:
          'Skipping numbers (e.g., floor 4 or 13) in sequential interfaces creates confusion',
        consequence:
          'Users relying on sequential logic (screen readers, keyboard navigation) may become disoriented',
        alternative:
          'Maintain sequential numbering in navigation; apply lucky number strategies to marketing and pricing only',
      },
    ],

    commonMistakes: [
      {
        title: 'Assuming Universal Lucky Numbers',
        description:
          'Using the same "lucky" numbers across all markets without cultural research',
        why: '8 is lucky in China but has no special significance in Brazil; 13 is unlucky in the West but not in most Asian cultures',
        fix: 'Research number associations for each target market and localize number strategies accordingly',
      },
      {
        title: 'Over-Relying on Number Superstition',
        description:
          'Basing entire pricing strategy on lucky numbers while ignoring value proposition',
        why: 'Lucky numbers enhance perception but cannot compensate for poor value or product-market fit',
        fix: 'Use lucky numbers as a complement to solid pricing strategy, not a replacement',
      },
      {
        title: 'Breaking Sequential Logic',
        description:
          'Skipping numbers in interfaces where sequence matters (pagination, steps, floors)',
        why: 'Users expect sequential consistency in functional interfaces; gaps cause confusion',
        fix: 'Apply lucky number strategies to marketing, pricing, and branding, not to functional sequences',
      },
      {
        title: 'Ignoring Negative Number Associations',
        description:
          'Failing to avoid culturally unlucky numbers in sensitive markets',
        why: 'Unlucky number avoidance is often stronger than lucky number preference—loss aversion applies to superstition too',
        fix: 'Prioritize avoiding unlucky numbers over featuring lucky ones, especially in cautious markets',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout choices involving number quantities affect user perception',
        examples: [
          'Displaying 7 or 8 featured items instead of 6 or 10 leverages number associations',
          'Grid layouts with lucky-numbered columns or rows feel more natural in specific cultures',
          'Pagination showing lucky page numbers can subtly affect navigation behavior',
          'Floor or step numbering in multi-level interfaces should respect cultural sensitivity',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'How numbers are styled affects the strength of lucky number associations',
        examples: [
          'Emphasized lucky numbers in prices draw attention and positive associations',
          'Repeating digit patterns (777, 888) are more visually striking and memorable',
          'Number formatting (comma vs period separators) carries cultural weight',
          'Font choice for numbers affects perceived formality and trustworthiness',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color reinforces cultural number associations',
        examples: [
          'Red combined with 8 amplifies lucky associations in Chinese culture',
          'Gold or yellow paired with lucky numbers reinforces prosperity associations',
          'Avoid pairing unlucky numbers with negative colors (red 4 in East Asian contexts)',
          'Green with 7 reinforces luck associations in Western gambling contexts',
        ],
      },
      interaction: {
        level: ImpactLevel.MEDIUM,
        description:
          'Number-based interactions affect user comfort and engagement',
        examples: [
          'Default quantity selectors set to lucky numbers increase acceptance',
          'Countdown timers using lucky numbers feel more engaging',
          'Reward milestones at lucky numbers feel more satisfying',
          'Slider defaults at lucky number positions affect adjustment behavior',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Number choices in content headings, lists, and copy shape perception',
        examples: [
          '"7 Tips for Success" outperforms "6 Tips for Success" in Western markets',
          '"Top 8 Features" resonates more strongly in Chinese-speaking markets',
          'Avoiding "4 reasons" in East Asian content prevents negative associations',
          'Price displays ending in lucky digits increase perceived value',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Number-skipping patterns create accessibility challenges',
        examples: [
          'Skipped floor numbers confuse screen reader users navigating building directories',
          'Non-sequential step numbers break expected keyboard navigation patterns',
          'Lucky number pricing must still be clearly announced by screen readers',
          'Cultural number tooltips or ARIA labels can explain number significance',
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
        title: 'Culturally Localized Pricing',
        description:
          'E-commerce platform adjusting price endings for Chinese market',
        code: `<div class="product-price" lang="zh">
  <span class="price-main">¥888</span>
  <span class="price-badge">吉祥价</span> <!-- "Auspicious Price" -->
  <p class="price-note">Special lucky price for Spring Festival</p>
</div>

<style>
.price-main {
  font-size: 2.4rem;
  font-weight: bold;
  color: var(--cg-color-accent);
}
.price-badge {
  background: var(--cg-color-warning);
  color: var(--cg-color-on-warning);
  padding: 0.25rem 0.5rem;
  border-radius: var(--cg-radius-sm);
  font-size: 0.875rem;
}
</style>`,
        explanation:
          'Pricing at 888 leverages the triple-8 lucky association in Chinese culture. The "auspicious price" label makes the number significance explicit and celebratory, aligning with cultural expectations during festivals.',
        principle:
          'Culturally aligned pricing creates positive emotional associations and increases purchase intent',
        metrics: {
          before: '3.1% conversion with ¥890 pricing',
          after: '4.7% conversion with ¥888 pricing',
          improvement: '52% increase in conversion during Chinese New Year campaign',
        },
      },
      {
        title: 'Lucky 7 Bundle Pricing',
        description:
          'SaaS product using number 7 in Western market pricing',
        code: `<div class="pricing-card popular">
  <h3>Pro Plan</h3>
  <div class="price">
    <span class="amount">$77</span>
    <span class="period">/month</span>
  </div>
  <ul class="features">
    <li>7 team members included</li>
    <li>Unlimited projects</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
  </ul>
  <span class="badge">Lucky Deal</span>
  <button class="cta">Start Free Trial</button>
</div>`,
        explanation:
          'The $77 price point and 7 team members leverage Western lucky-7 associations. The price feels more appealing than $75 or $79 despite being mathematically similar, because 7 carries positive connotations of luck and completeness.',
        principle:
          'Lucky number pricing creates subconscious positive associations that boost purchase intent',
      },
      {
        title: 'Number-Sensitive Floor Navigation',
        description:
          'Building directory app respecting East Asian number conventions',
        code: `<nav class="floor-selector" aria-label="Floor Selection">
  <h3>Select Floor</h3>
  <div class="floor-grid">
    <button class="floor" aria-label="Floor 1">1F</button>
    <button class="floor" aria-label="Floor 2">2F</button>
    <button class="floor" aria-label="Floor 3">3F</button>
    <button class="floor" aria-label="Floor 3A (replaces 4)">3A</button>
    <button class="floor" aria-label="Floor 5">5F</button>
    <button class="floor" aria-label="Floor 6">6F</button>
    <button class="floor" aria-label="Floor 7">7F</button>
    <button class="floor featured" aria-label="Floor 8 - Lucky Floor">
      8F ★
    </button>
  </div>
  <p class="floor-note">Floor 8: Premium offices</p>
</nav>`,
        explanation:
          'The interface skips floor 4 (using 3A) to respect tetraphobia while maintaining navigability. Floor 8 is highlighted as premium, aligning with its lucky status. ARIA labels provide clear context for assistive technology users.',
        principle:
          'Respecting cultural number sensitivities removes friction and demonstrates cultural awareness',
      },
    ],

    bad: [
      {
        title: 'Culturally Insensitive Number Use',
        description:
          'Software marketed to East Asian users with prominent number 4',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-plans">
  <h2>Choose Your Plan</h2>
  <div class="plan">
    <h3>4-User Team Plan</h3>
    <span class="price">$44/month</span>
    <p>Perfect for small teams of 4</p>
  </div>
  <div class="plan">
    <h3>Version 4.4 — Now Available!</h3>
    <p>Our 4th major release with 4 new features</p>
  </div>
</div>`,
        explanation:
          'Repeatedly featuring the number 4 in a product marketed to East Asian users creates strong negative associations. In Mandarin, Cantonese, Japanese, and Korean, 4 sounds like "death." This pricing and versioning would significantly deter purchase in these markets.',
        principle:
          'Ignoring cultural number taboos alienates users and reduces conversion in sensitive markets',
      },
      {
        title: 'Manipulative Lucky Number Urgency',
        description:
          'Using lucky numbers to create false scarcity',
        code: `<!-- DON'T DO THIS -->
<div class="offer-banner">
  <h2>LUCKY 7 FLASH SALE!</h2>
  <p style="color: red; font-size: 2em;">Only 7 items left!</p>
  <p>Price drops to $7.77 for the next 7 minutes!</p>
  <div class="countdown">7:00 remaining</div>
  <p class="fine-print" style="font-size: 0.5em; color: #ccc;">
    *Stock replenished hourly. Timer resets on page refresh.
  </p>
</div>`,
        explanation:
          'Wrapping fake scarcity in lucky number packaging is doubly manipulative. The "only 7 left" and "7 minutes" create artificial urgency, and using the lucky number 7 exploits superstitious associations to pressure purchases.',
        principle:
          'Never weaponize cultural number beliefs to create false urgency or scarcity',
      },
      {
        title: 'Inconsistent Number Skipping',
        description:
          'Arbitrarily skipping unlucky numbers in functional interfaces',
        code: `<!-- DON'T DO THIS -->
<ol class="setup-wizard">
  <li>Step 1: Create Account</li>
  <li>Step 2: Set Preferences</li>
  <li>Step 3: Import Data</li>
  <!-- Skipped step 4 for luck -->
  <li>Step 5: Configure Dashboard</li>
  <li>Step 6: Invite Team</li>
  <li>Step 7: Launch!</li>
  <!-- Actually 6 steps labeled 1-7 minus 4 -->
</ol>`,
        explanation:
          'Skipping step 4 in a sequential wizard creates confusion. Users see they are on "Step 5 of 7" but there are only 6 actual steps. This breaks the mental model of sequential progress and confuses assistive technology.',
        principle:
          'Functional sequences must remain sequential; apply lucky number strategies to marketing, not workflows',
      },
    ],

    realWorld: [
      {
        company: 'Various Retailers',
        product: 'Charm Pricing ($9.99)',
        description: 'The near-universal practice of pricing at $9.99 instead of $10.00 combines left-digit anchoring with the lucky associations of the number 9 (which in Chinese culture sounds like "long-lasting"). This pricing psychology phenomenon, documented by Schindler & Kirby (1997), affects billions of transactions daily.',
        effectiveness: 'very-effective',
        analysis: '$9.99 pricing works through multiple mechanisms: left-digit effect (perceived as $9 not $10), and the repetition of 9 creates a sense of maximum value. Research shows 8% higher sales versus round-number pricing.',
      },
      {
        company: 'Chinese Real Estate Market',
        product: 'Apartment and Phone Number Pricing',
        description: 'Properties on the 8th floor command 8-10% price premiums in Hong Kong and mainland China. Phone numbers with multiple 8s sell for thousands of dollars. The number 8888-8888 sold for approximately $280,000 in Sichuan province.',
        effectiveness: 'very-effective',
        analysis: 'The lucky number premium is a measurable market force in Chinese-speaking economies. It demonstrates that number bias translates directly into willingness to pay, not just preference.',
      },
      {
        company: 'Global Hotel & Building Industry',
        product: 'Floor Numbering Systems',
        description: 'Over 85% of high-rise buildings in Hong Kong skip the 4th floor (and often 14th, 24th, etc.). In Western markets, many hotels and buildings skip the 13th floor. The Otis Elevator Company estimates 85% of buildings with Otis elevators lack a 13th floor button.',
        effectiveness: 'effective',
        analysis: 'Building developers accept the minor confusion of non-sequential floors because the commercial impact of unlucky numbers on occupancy rates and property values is well documented.',
      },
      {
        company: 'Boeing & OnePlus',
        product: 'Product Version Numbering',
        description: 'Boeing skipped the 717 designation for decades (using it only much later for a different aircraft). OnePlus skipped from OnePlus 3T directly to OnePlus 5 to avoid the number 4 in the Chinese market. Multiple software companies skip version 13.',
        effectiveness: 'effective',
        analysis: 'Major corporations adjust product numbering to avoid unlucky numbers, demonstrating that even in technical contexts, number superstition has measurable commercial impact.',
      },
    ],

    abTests: [
      {
        title: 'Price Ending: Lucky Number vs Round Number (Chinese Market)',
        hypothesis:
          'Prices ending in 8 will outperform round-number prices in Chinese-speaking markets',
        controlVersion: {
          description:
            'Product priced at ¥900 with standard pricing display',
          metrics: {
            conversionRate: '3.2%',
            averageOrderValue: '¥900',
            perceivedValue: '6.3/10',
          },
        },
        treatmentVersion: {
          description:
            'Product priced at ¥888 with "auspicious price" badge, using red and gold colors',
          metrics: {
            conversionRate: '4.9%',
            averageOrderValue: '¥888',
            perceivedValue: '7.8/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Despite being a lower absolute price, the ¥888 treatment generated more total revenue due to 53% higher conversion. Perceived value increased by 24%. The effect was strongest during Chinese New Year and mid-autumn festival periods.',
          learnings: [
            'Lucky number pricing can increase conversion enough to offset lower unit price',
            'Cultural context amplifies the effect (stronger during festivals)',
            'The visual presentation (red and gold) reinforced the lucky association',
            'Effect was strongest among consumers over 35; younger consumers were less influenced',
          ],
        },
      },
      {
        title: 'Content Listing: 7 Items vs 8 Items vs 10 Items (Western Market)',
        hypothesis:
          'Lists of 7 items will have higher engagement than 8 or 10 in Western markets',
        controlVersion: {
          description:
            'Blog post titled "10 Ways to Improve Your Workflow" with 10 items',
          metrics: {
            clickThroughRate: '2.8%',
            timeOnPage: '2:45',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Blog post titled "7 Ways to Improve Your Workflow" with 7 items',
          metrics: {
            clickThroughRate: '3.4%',
            timeOnPage: '3:12',
            scrollDepth: '81%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The "7 items" version had 21% higher CTR and 31% higher scroll depth. Users perceived the 7-item list as more curated and trustworthy. The number 7 also reduced decision fatigue compared to 10 items.',
          learnings: [
            '7 is perceived as a "magic number" for list length in Western cultures',
            'Shorter lists with lucky numbers outperform longer comprehensive lists',
            'The lucky number effect compounds with cognitive load reduction (fewer items)',
            'Effect diminished when the topic was highly technical or data-driven',
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
        name: 'Lucky Digit Pricing',
        description:
          'Prices ending in or repeating culturally lucky digits (7, 8, 9 in various cultures)',
        howToSpot:
          'Look for prices like $7.77, $88, ¥888, $9.99 or patterns of repeated digits',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Number Avoidance Gaps',
        description:
          'Missing numbers in sequences (no floor 4, no floor 13, skipped version numbers)',
        howToSpot:
          'Check floor directories, version histories, step wizards, and plan tier numbering for skipped numbers',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Culturally Coded Color-Number Pairing',
        description:
          'Numbers paired with culturally significant colors (red + 8 in Chinese contexts, green + 7 in Western contexts)',
        howToSpot:
          'Look for specific color treatments on lucky numbers that differ from surrounding number styling',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Lucky Number Marketing Language',
        description:
          'Copy that explicitly references luck, fortune, or auspiciousness alongside specific numbers',
        howToSpot:
          'Look for phrases like "Lucky 7 deal", "Auspicious pricing", "Fortune 8 bundle"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Quantity Defaults at Lucky Numbers',
        description:
          'Default quantities, team sizes, or item counts set to culturally lucky numbers',
        howToSpot:
          'Check default values in quantity selectors, bundle sizes, and "recommended" amounts',
        severity: ImpactLevel.LOW,
      },
    ],

    patterns: [
      {
        name: 'Lucky Price Point Pattern',
        description:
          'Pricing deliberately set at culturally lucky numbers rather than round numbers or standard charm prices',
        indicators: [
          'Prices ending in 7, 77, or 777 in Western markets',
          'Prices ending in 8, 88, or 888 in East Asian markets',
          'Avoidance of prices containing 4 in East Asian markets',
          'Avoidance of prices containing 13 in Western markets',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Sequential Number Skip Pattern',
        description:
          'Systematic omission of unlucky numbers from sequential displays',
        indicators: [
          'Building floors skipping 4, 13, or 14',
          'Product versions jumping past unlucky numbers',
          'Room or seat numbering with gaps',
          'Menu item numbering avoiding specific digits',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Cultural Localization Pattern',
        description:
          'Different number strategies deployed for different cultural markets',
        indicators: [
          'Regionalized pricing with different "charm" numbers',
          'Market-specific bundle quantities',
          'Localized number formatting and emphasis',
          'Cultural color-number pairings in regional variants',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are any prices set at culturally lucky numbers (7, 8, 9 patterns)?',
      'Are unlucky numbers (4, 13) avoided in pricing, navigation, or versioning?',
      'Does the product localize number strategies for different cultural markets?',
      'Are quantity defaults or bundle sizes set at lucky numbers?',
      'Do marketing materials explicitly reference luck or fortune alongside numbers?',
      'Are there sequential gaps caused by unlucky number avoidance?',
      'Is the lucky number strategy consistent across all touchpoints?',
      'Could number choices unintentionally offend or alienate any cultural group?',
      'Are lucky number strategies applied to marketing only, or do they break functional sequences?',
      'Have number preferences been validated with user research in each target market?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, cultural anthropology, and UX design, specializing in numerical cognition and lucky number bias.

Analyze the provided design for lucky number bias patterns. Identify:

1. **Price Point Numbers**: Whether prices use culturally lucky or unlucky numbers
2. **Sequential Numbering**: Whether floors, steps, versions, or lists skip unlucky numbers
3. **Cultural Sensitivity**: Whether number choices respect target market cultural associations
4. **Quantity Choices**: Whether default quantities, bundle sizes, or list lengths leverage lucky numbers
5. **Number-Color Pairing**: Whether numbers are paired with culturally appropriate colors

For each pattern found:
- Identify the specific number and its cultural significance
- Assess whether it is appropriate for the target audience
- Determine if it helps or potentially alienates users
- Evaluate cross-cultural implications
- Suggest improvements for culturally sensitive number usage

Consider:
- Does the design account for different cultural number associations?
- Are unlucky numbers appropriately avoided without breaking functionality?
- Is lucky number usage enhancing or manipulating the user experience?
- Are there accessibility implications of number-skipping strategies?
- Is the number strategy consistent across the entire experience?

Provide actionable recommendations for culturally informed, ethical number usage.`,

    outputSchema: {
      type: 'object',
      properties: {
        numberPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: { type: 'string' },
              context: { type: 'string' },
              culturalSignificance: { type: 'string' },
              targetMarketAlignment: { type: 'string' },
              potentialIssue: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'number',
              'context',
              'culturalSignificance',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            culturalSensitivity: { type: 'number' },
            consistencyScore: { type: 'number' },
            functionalIntegrity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'culturalSensitivity',
            'consistencyScore',
            'functionalIntegrity',
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
        'numberPatterns',
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
        title: 'Research Target Market Number Associations',
        description:
          'Identify which numbers carry positive, negative, or neutral associations in your target markets',
        example:
          'Chinese market: 8 (lucky, prosperity), 6 (smooth, flowing), 4 (death, avoid), 9 (long-lasting)',
        tips: [
          'Consult cultural advisors or local market experts',
          'Survey actual users about number preferences, not just published stereotypes',
          'Consider regional variations within countries (e.g., Cantonese vs Mandarin associations)',
        ],
      },
      {
        step: 2,
        title: 'Audit Current Number Usage',
        description:
          'Review all numbers in your product: prices, versions, quantities, steps, and labels',
        example:
          'Discovered: Product version 4.4 about to launch in Japanese market — flagged for review',
        tips: [
          'Check pricing across all tiers and currencies',
          'Review version numbers, build numbers, and release names',
          'Audit default quantities, bundle sizes, and list lengths',
        ],
      },
      {
        step: 3,
        title: 'Apply Lucky Number Pricing',
        description:
          'Adjust price points to incorporate culturally lucky endings where commercially feasible',
        example:
          'Changed $90/month to $88/month for Chinese market (2.2% price reduction, 15% conversion lift)',
        tips: [
          'Only adjust prices when the difference is commercially negligible',
          'A/B test lucky vs neutral pricing before full rollout',
          'Combine lucky pricing with culturally appropriate visual treatment',
        ],
      },
      {
        step: 4,
        title: 'Handle Unlucky Number Avoidance',
        description:
          'Develop strategies for avoiding unlucky numbers without breaking sequential logic',
        example:
          'Use "3A" instead of "4" for floors; skip version 4.0, release as 5.0 with a major feature set',
        tips: [
          'Only skip numbers in non-functional contexts (branding, marketing)',
          'Maintain sequential logic in functional interfaces (wizards, pagination)',
          'Document the reasoning for number skips to maintain internal consistency',
        ],
      },
      {
        step: 5,
        title: 'Test and Validate',
        description:
          'Measure the impact of number changes on conversion, sentiment, and engagement',
        example:
          'A/B test: ¥900 vs ¥888 pricing for Q1, track conversion rate and customer satisfaction',
        tips: [
          'Run tests during culturally significant periods (e.g., Chinese New Year) and normal periods separately',
          'Measure both conversion and sentiment — lucky numbers should feel good, not manipulative',
          'Test with diverse demographic groups within your target market',
        ],
      },
    ],

    dos: [
      'Research number associations specific to each target market',
      'Use lucky number pricing where it does not distort actual value',
      'Respect unlucky number avoidance in culturally sensitive markets',
      'Localize number strategies rather than applying one approach globally',
      'Combine lucky numbers with culturally appropriate visual design (colors, imagery)',
      'Test number strategies with real users from the target culture',
      'Maintain functional sequential numbering even when applying lucky number strategies to marketing',
      'Document your number strategy for consistency across teams and touchpoints',
    ],

    donts: [
      'Don\'t assume one culture\'s lucky numbers are universal',
      'Don\'t use lucky numbers to create false urgency or scarcity',
      'Don\'t break functional sequences (steps, pagination) to avoid unlucky numbers',
      'Don\'t alter actual data or statistics to match lucky numbers',
      'Don\'t over-index on number superstition at the expense of clear pricing',
      'Don\'t ignore unlucky number avoidance — it is often stronger than lucky number preference',
      'Don\'t apply Western number associations to Eastern markets or vice versa',
      'Don\'t use lucky numbers to mask poor value propositions',
    ],

    bestPractices: [
      {
        title: 'Market-Specific Number Localization',
        description:
          'Maintain different number strategies for each cultural market, like any other localization',
        rationale:
          'Number associations are as culturally specific as language, color, and imagery',
        example:
          'US: $77/month, China: ¥888/year, Japan: avoid 4 and 9, emphasize 7 and 8',
      },
      {
        title: 'Lucky Pricing as Enhancement, Not Strategy',
        description:
          'Use lucky numbers to enhance an already-solid pricing strategy, not as the core strategy',
        rationale:
          'Lucky numbers provide marginal conversion lift; product-market fit drives purchase decisions',
        example:
          'Price based on value, then adjust the last digits to lucky numbers if the difference is trivial',
      },
      {
        title: 'Functional vs Marketing Number Separation',
        description:
          'Apply lucky number strategies to marketing and pricing, keep functional interfaces sequential',
        rationale:
          'Users need predictable sequences in workflows; breaking them causes confusion and accessibility issues',
        example:
          'Market "Version 8" but keep internal build numbers sequential; skip floor 4 in directories but maintain sequential room numbers',
      },
      {
        title: 'Audit for Unintended Unlucky Numbers',
        description:
          'Proactively check all number displays for unintentional unlucky numbers in target markets',
        rationale:
          'Unlucky number avoidance creates stronger negative reactions than lucky numbers create positive ones',
        example:
          'Before launching in China, audit all prices, version numbers, and quantities for the digit 4',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Maintain logical structure when skipping numbers',
        implementation:
          'If floors or steps are non-sequential, use ARIA labels to clarify the actual position (e.g., aria-label="Floor 3A, fourth floor")',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure reading order remains logical despite number skips',
        implementation:
          'DOM order must reflect actual sequence. Screen readers should encounter items in logical order regardless of displayed numbering.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to convey lucky number significance',
        implementation:
          'If using red to highlight lucky 8 pricing, also use text labels, badges, or icons to convey the special status.',
      },
    ],

    ethics: [
      {
        concern: 'Cultural Appropriation',
        severity: 'high',
        explanation:
          'Using another culture\'s lucky number traditions purely for profit without genuine cultural understanding',
        mitigation:
          'Engage cultural consultants, hire local market experts, and ensure number strategies are respectful and authentic.',
      },
      {
        concern: 'Superstition Exploitation',
        severity: 'high',
        explanation:
          'Weaponizing number superstitions to pressure purchases through fear of bad luck or promises of good fortune',
        mitigation:
          'Use lucky numbers to enhance positive feelings, never to create fear or pressure. Avoid language like "unlucky if you miss this."',
      },
      {
        concern: 'Price Manipulation via Number Theater',
        severity: 'medium',
        explanation:
          'Charging more for products solely because the price contains lucky digits without added value',
        mitigation:
          'Lucky number pricing should adjust existing fair prices, not inflate them. The price must still reflect actual value.',
      },
      {
        concern: 'Exclusion of Non-Superstitious Users',
        severity: 'low',
        explanation:
          'Over-emphasizing number luck may alienate rational or non-superstitious users',
        mitigation:
          'Keep lucky number strategies subtle and complementary. Never make superstitious messaging the primary value proposition.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Chinese Consumers\' Price Perceptions of Lucky and Unlucky Numbers',
        author: 'Ang, S. H.',
        year: 1997,
        description:
          'Foundational research on how Chinese consumers respond to lucky and unlucky number pricing, demonstrating measurable purchase intent differences',
        type: 'foundational',
      },
      {
        title: 'Patterns of Right-Most Digits Used in Advertised Prices: Implications for Nine-Ending and Price-Level Effects',
        author: 'Simmons, L. C., & Schindler, R. M.',
        year: 2003,
        doi: '10.1016/S0148-2963(01)00242-1',
        description:
          'Analysis of price-ending digit patterns across cultures, demonstrating that culturally lucky digits appear more frequently in advertised prices',
        type: 'foundational',
      },
      {
        title: 'Superstition and Financial Decision Making',
        author: 'Hirshleifer, D.',
        year: 2001,
        description:
          'Explores how numerical superstitions affect financial markets, stock prices, and economic behavior at scale',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Explores irrational pricing behaviors including the role of arbitrary numbers in shaping value perception',
        type: 'practical',
      },
      {
        title: 'Priceless: The Myth of Fair Value',
        author: 'Poundstone, William',
        year: 2010,
        isbn: '9780809078813',
        description:
          'Comprehensive exploration of pricing psychology including the role of number preferences and cultural pricing patterns',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Psychology of Numbers in Marketing',
        author: 'Journal of Consumer Psychology',
        url: 'https://www.sciencedirect.com/journal/journal-of-consumer-psychology',
        description:
          'Research collection on how number perception, including lucky number effects, influences consumer behavior',
        type: 'practical',
      },
      {
        title: 'Why Buildings Skip the 13th Floor',
        author: 'CityLab / The Atlantic',
        url: 'https://www.bloomberg.com/news/articles/2015-08-13/why-buildings-skip-the-13th-floor',
        description:
          'Accessible overview of lucky and unlucky number effects in architecture and design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Science of Superstition: Lucky Numbers',
        author: 'Numberphile',
        url: 'https://www.youtube.com/numberphile',
        description:
          'Mathematical and psychological exploration of why certain numbers are considered lucky across cultures',
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
      'anchoring-bias',       // Lucky numbers create subtle anchors for price perception
      'framing-effect',       // How numbers are framed (lucky vs unlucky) affects decisions
      'cultural-bias',        // Lucky numbers are deeply rooted in cultural context
      'charm-pricing',        // $9.99 pricing overlaps with lucky number effects
    ],

    conflicts: [
      'rational-choice-theory',  // Lucky number preferences are inherently non-rational
      'base-rate-neglect',       // Lucky numbers distract from actual probability assessment
    ],

    confusedWith: [
      'anchoring-bias',    // Lucky numbers anchor, but the mechanism is superstition not first-value reliance
      'charm-pricing',     // $9.99 overlaps with lucky 9, but charm pricing is a separate left-digit effect
      'pattern-recognition', // Humans see patterns in numbers, but lucky numbers are culturally learned not perceptually detected
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'tetraphobia',           // Fear/avoidance of number 4
        'triskaidekaphobia',     // Fear/avoidance of number 13
      ],
    },
  },
};
