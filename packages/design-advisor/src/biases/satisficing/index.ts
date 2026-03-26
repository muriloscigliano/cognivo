/**
 * SATISFICING
 *
 * We choose "good enough" rather than optimal
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const satisficing: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'satisficing',
    name: 'Satisficing',
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
    simple: 'We choose "good enough" rather than optimal',

    detailed: `Satisficing is a decision-making strategy where people accept the first option that meets an acceptable threshold rather than exhaustively searching for the optimal solution. The term, coined by Herbert Simon, blends "satisfy" and "suffice" to describe how humans cope with limited cognitive resources and bounded rationality.

In product and UX design, satisficing explains why users rarely compare every available option. Instead, they scan results, pick the first thing that looks adequate, and move on. This has profound implications for how we order search results, present recommendations, and structure navigation. Users who satisfice are not lazy—they are rationally conserving cognitive effort in a world of overwhelming choice.

Designers can work with satisficing by surfacing strong defaults, curating shortlists, and making the "good enough" option genuinely good. Conversely, designs that bury reasonable options or force exhaustive comparison exploit this tendency, leading to frustration, decision fatigue, and abandonment.`,

    psychologyBasis: {
      discoveredBy: 'Herbert A. Simon',
      year: 1956,
      theory: 'Bounded Rationality',
      mechanism: `The brain uses satisficing as an efficient strategy to cope with bounded rationality—the reality that we lack infinite time, information, and cognitive capacity. This happens because:

1. **Aspiration Threshold**: The decision-maker forms an internal "good enough" threshold based on prior experience and expectations
2. **Sequential Search**: Options are evaluated one at a time in the order encountered, not all at once
3. **First-Match Termination**: Search stops as soon as an option meets the aspiration threshold—remaining options are never evaluated
4. **Adaptive Threshold**: If no option meets the threshold after extended search, the threshold lowers; if options are found quickly, it may rise
5. **Cognitive Economy**: The brain conserves processing resources by avoiding exhaustive comparison, especially under time pressure or information overload

The strategy is ecologically rational—in most real-world environments with many adequate options, satisficing produces nearly optimal outcomes at a fraction of the cognitive cost.`,
    },

    realWorldExample: `When searching on Google, the vast majority of users click one of the first three results. Despite having dozens of pages of relevant results available, people satisfice: they assume the top results are "good enough" and rarely scroll further. Similarly, when choosing a restaurant on a food delivery app, most users pick from the first few options that meet their basic criteria (cuisine, price, rating) rather than scrolling through hundreds of listings to find the absolute best match.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Satisficing profoundly affects how users interact with search results, product listings, recommendations, and any interface that presents multiple options. Designers can leverage this to:

- Guide users toward strong choices by placing the best option first or labeling it "Recommended"
- Reduce decision paralysis by curating shortlists and "top picks" rather than overwhelming users with all options
- Improve conversion by surfacing "good enough" options prominently instead of burying them
- Shape behavior through default selections and featured/recommended badges
- Optimize search result ordering to put the most relevant results at the top, knowing most users will stop there`,

    whenToUse: [
      {
        title: 'Search Result Ordering',
        scenario:
          'When displaying search results or product listings where order determines what users actually see',
        example:
          'Place the most relevant, highest-quality results at the top of the list, knowing most users will pick from the first 3-5 items',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Recommended/Featured Options',
        scenario: 'When users face choice overload from too many similar options',
        example:
          'Add an "Amazon\'s Choice" or "Recommended for You" badge to the strongest option, giving satisficers a clear signal to stop searching',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Curated Shortlists',
        scenario: 'When helping users navigate large catalogs or complex decisions',
        example:
          'Show a "Top 5 Picks" or "Quick Picks" section above the full catalog, letting users satisfice efficiently',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Smart Defaults',
        scenario: 'When users need to configure settings or make selections during onboarding',
        example:
          'Pre-select the most common or recommended configuration, so users who satisfice get a good outcome without deliberation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Decision Paralysis Reduction',
        scenario: 'When too many options are causing users to abandon the flow entirely',
        example:
          'Reduce visible options from 20 to 5 with a "Show More" option, letting satisficers choose quickly while maximizers can still explore',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'High-Stakes Decisions',
        reason:
          'When the cost of a suboptimal choice is significant (medical, legal, financial), users should be encouraged to evaluate more options',
        consequence:
          'Users may accept an inadequate option and suffer real harm because the interface made it too easy to satisfice',
        alternative:
          'Present a structured comparison view and encourage review of multiple options before committing',
      },
      {
        title: 'Hiding Good Options to Force Browsing',
        reason:
          'Deliberately burying the "good enough" option to increase time-on-site or ad impressions is manipulative',
        consequence:
          'User frustration, abandonment, and loss of trust when they realize good options were intentionally hidden',
        alternative:
          'Surface the best options first and earn engagement through genuine value, not artificial friction',
      },
      {
        title: 'Personalization Without Transparency',
        reason:
          'Algorithmically choosing what users see first without disclosure can exploit satisficing for business gain',
        consequence:
          'Users may consistently choose options that benefit the platform (higher margin, sponsored) rather than themselves',
        alternative:
          'Clearly label sponsored or promoted results; default sort to user relevance, not revenue optimization',
      },
      {
        title: 'Educational or Exploratory Contexts',
        reason:
          'When the goal is learning, discovery, or creative exploration, satisficing limits exposure to new ideas',
        consequence:
          'Users miss valuable content because they stopped at the first adequate result',
        alternative:
          'Design for serendipity: use randomization, "you might also like" prompts, or diverse result sets',
      },
    ],

    commonMistakes: [
      {
        title: 'No Clear Recommendation',
        description:
          'Presenting many equivalent options without any signal about which is best, forcing users to evaluate everything',
        why: 'Satisficers need a signal to stop searching; without one, they either pick randomly or abandon the task',
        fix: 'Add a "Recommended", "Most Popular", or "Best Value" label to the strongest option',
      },
      {
        title: 'Poor Default Ordering',
        description:
          'Sorting results alphabetically, by recency, or randomly instead of by relevance or quality',
        why: 'Users satisfice by picking from the top; if top items are irrelevant, conversion drops and frustration rises',
        fix: 'Default to relevance-based sorting; use quality signals (ratings, popularity, match score) to order results',
      },
      {
        title: 'Too Many Options Without Filtering',
        description:
          'Showing 100+ options in a flat list without categories, filters, or curated subsets',
        why: 'Even satisficers are overwhelmed when no option clearly meets the threshold; choice overload leads to abandonment',
        fix: 'Provide filters, categories, and a curated "top picks" section to help users find their threshold match quickly',
      },
      {
        title: 'Exploiting Satisficing with Promoted Placements',
        description:
          'Placing sponsored or high-margin products in the top positions without clear disclosure',
        why: 'Users trust that top-positioned items are the most relevant; undisclosed promotion exploits this trust',
        fix: 'Clearly label promoted or sponsored content; separate organic results from paid placements',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout order directly determines which options satisficers encounter and select',
        examples: [
          'Top-positioned items in lists and grids receive the vast majority of clicks',
          'Featured or hero sections create an immediate "good enough" option',
          'Above-the-fold content is where most satisficing decisions happen',
          'Card layouts with a highlighted "recommended" card guide satisficers to the intended choice',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text hierarchy signals which options deserve attention and which can be skipped',
        examples: [
          'Bold product names and ratings help satisficers scan and decide quickly',
          'Summary text lets users assess fit without reading full descriptions',
          '"Best Seller" or "Top Rated" labels in prominent type halt the search',
          'Clear price typography allows instant threshold comparison',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color highlights and badges create visual stopping points for satisficers',
        examples: [
          'Colored "Recommended" badges draw the eye to the intended choice',
          'Highlighted rows or cards signal "this is the one to pick"',
          'Green checkmarks or star ratings provide quick quality signals',
          'Muted styling on less relevant options reduces cognitive load',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive patterns either support or hinder efficient satisficing',
        examples: [
          'Quick-add or "one-click buy" buttons let satisficers act on their choice immediately',
          'Infinite scroll discourages satisficing by removing a natural stopping point',
          'Filter and sort controls help users narrow to their threshold quickly',
          'Preview-on-hover lets users evaluate without committing to a click',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy determines whether users can quickly assess if an option meets their threshold',
        examples: [
          'Summary ratings (4.5 stars) provide instant quality signals for satisficers',
          '"Amazon\'s Choice" or "Editor\'s Pick" labels explicitly mark the satisficing target',
          'Comparison snippets ("Best for: beginners") help users match options to needs',
          'Review counts and social proof reinforce that the first adequate option is indeed good enough',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users satisfice differently and need equivalent quality signals',
        examples: [
          'Screen reader users encounter items in DOM order, making source order critical for satisficing',
          'ARIA labels on "Recommended" badges must convey the same signal as visual badges',
          'Keyboard users need efficient navigation to reach the best option without tabbing through everything',
          'Skip links and landmark roles help assistive tech users jump to curated recommendations',
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
        title: '"Recommended for You" Selection',
        description:
          'E-commerce product listing with a clearly labeled recommendation to help users satisfice confidently',
        code: `<section class="product-results">
  <h2>Wireless Headphones</h2>

  <div class="product-card recommended">
    <span class="badge recommended-badge">Recommended for You</span>
    <img src="headphones-a.jpg" alt="SoundMax Pro">
    <h3>SoundMax Pro</h3>
    <div class="rating">★★★★★ 4.7 (2,341 reviews)</div>
    <div class="price">$79.99</div>
    <p class="match-reason">Based on your preference for noise cancellation and long battery life</p>
    <button class="primary">Add to Cart</button>
  </div>

  <div class="product-card">
    <h3>AudioFlex 200</h3>
    <div class="rating">★★★★☆ 4.3 (1,892 reviews)</div>
    <div class="price">$59.99</div>
    <button class="secondary">View Details</button>
  </div>

  <button class="show-more">Show 47 More Results</button>
</section>`,
        explanation:
          'The "Recommended for You" badge with a personalized reason gives satisficers a clear, trustworthy signal to stop searching. The strong rating and prominent CTA make it easy to act immediately. Users who want to optimize can still browse more results.',
        principle:
          'A clear recommendation with a transparent rationale lets satisficers choose confidently without exhaustive search',
        metrics: {
          before: '23% clicked a product from the first page (no recommendation)',
          after: '41% clicked the recommended product',
          improvement: '78% increase in first-page engagement',
        },
      },
      {
        title: 'Curated "Quick Pick" Options',
        description:
          'Subscription plan selector with a highlighted "Most Popular" tier that serves as the obvious satisficing choice',
        code: `<div class="plan-selector">
  <h2>Choose Your Plan</h2>
  <p class="subtitle">Not sure? Most teams start with Pro.</p>

  <div class="plans">
    <div class="plan">
      <h3>Starter</h3>
      <div class="price">$9<span>/mo</span></div>
      <p>For individuals getting started</p>
      <button class="secondary">Select</button>
    </div>

    <div class="plan highlighted">
      <span class="badge">Most Popular</span>
      <h3>Pro</h3>
      <div class="price">$29<span>/mo</span></div>
      <p>For growing teams — everything you need</p>
      <button class="primary">Start Free Trial</button>
    </div>

    <div class="plan">
      <h3>Enterprise</h3>
      <div class="price">Custom</div>
      <p>For large organizations</p>
      <button class="secondary">Contact Sales</button>
    </div>
  </div>
</div>`,
        explanation:
          'The "Most Popular" badge and visual highlighting guide satisficers directly to the Pro plan. The supporting copy ("everything you need") reinforces that this option meets the threshold. Users who want more or less can still choose, but the satisficing path is clear.',
        principle:
          'Highlighting the most common choice reduces decision effort and leverages social proof to validate the satisficing threshold',
      },
      {
        title: '"Amazon\'s Choice" Pattern',
        description:
          'Search results with a single clearly marked "best match" item at the top of a long list',
        code: `<div class="search-results">
  <div class="result top-pick">
    <span class="badge choice-badge">Top Pick</span>
    <div class="result-content">
      <h3>Anker PowerCore 10000</h3>
      <div class="meta">
        <span class="rating">★★★★★ 4.8</span>
        <span class="reviews">(53,281 reviews)</span>
        <span class="prime">Free next-day delivery</span>
      </div>
      <div class="price">$25.99</div>
      <p class="reason">Highly rated, frequently purchased in this category</p>
    </div>
  </div>

  <div class="result">
    <h3>RAVPower Portable Charger</h3>
    <div class="meta">
      <span class="rating">★★★★☆ 4.4</span>
      <span class="reviews">(12,847 reviews)</span>
    </div>
    <div class="price">$22.99</div>
  </div>

  <!-- More results below -->
</div>`,
        explanation:
          'The "Top Pick" badge, combined with strong social proof (53K reviews, 4.8 stars), gives satisficers an authoritative signal. The transparent reason ("Highly rated, frequently purchased") builds trust that this is genuinely the best option, not just a promoted result.',
        principle:
          'Authoritative labels backed by transparent criteria let users satisfice with confidence in high-volume search results',
      },
    ],

    bad: [
      {
        title: 'Hiding the "Good Enough" Option to Force Browsing',
        description:
          'Deliberately placing the best-match product deep in results to increase page views and ad impressions',
        code: `<!-- DON'T DO THIS -->
<div class="search-results">
  <!-- Sponsored products first, not labeled as ads -->
  <div class="result">
    <h3>OverPriced Brand X</h3>
    <div class="rating">★★★☆☆ 3.2 (47 reviews)</div>
    <div class="price">$89.99</div>
  </div>
  <div class="result">
    <h3>Unknown Brand Y</h3>
    <div class="rating">★★★☆☆ 3.0 (12 reviews)</div>
    <div class="price">$79.99</div>
  </div>
  <!-- ... 15 more mediocre results ... -->
  <!-- The actually best-rated, best-priced product is buried on page 3 -->
</div>`,
        explanation:
          'By placing sponsored or lower-quality products at the top without disclosure, the design exploits satisficing behavior. Users will pick a mediocre option because it appeared first, never seeing the genuinely best product buried below. This erodes trust when users eventually discover the manipulation.',
        principle:
          'Never exploit satisficing by burying good options to serve business metrics over user needs',
      },
      {
        title: 'No Clear Recommendation in Overwhelming Choice',
        description:
          'Presenting 50+ equivalent options with no guidance, labels, or hierarchy',
        code: `<!-- DON'T DO THIS -->
<div class="plan-grid">
  <div class="plan">Plan A — $15/mo — 5GB, 100 emails</div>
  <div class="plan">Plan B — $17/mo — 7GB, 150 emails</div>
  <div class="plan">Plan C — $19/mo — 10GB, 200 emails</div>
  <div class="plan">Plan D — $21/mo — 12GB, 250 emails</div>
  <div class="plan">Plan E — $23/mo — 15GB, 300 emails</div>
  <div class="plan">Plan F — $25/mo — 20GB, 400 emails</div>
  <!-- ... 8 more nearly identical plans ... -->
</div>`,
        explanation:
          'With too many similar options and no recommendation, satisficers either pick randomly (often poorly) or abandon the page entirely. There is no signal to indicate which plan is "good enough" for a typical user, so the satisficing strategy fails to produce a good outcome.',
        principle:
          'Without a clear "good enough" signal, satisficers make poor choices or give up entirely',
      },
      {
        title: 'Algorithmic Satisficing Exploitation',
        description:
          'Using personalization to always surface high-margin items first without disclosure',
        code: `<!-- DON'T DO THIS -->
<div class="results">
  <h2>Best Results for You</h2>
  <!-- Sorted by platform profit margin, not user relevance -->
  <div class="result">
    <h3>Premium Widget Pro</h3>
    <!-- 60% margin for platform, mediocre reviews -->
    <div class="price">$149.99</div>
    <div class="rating">★★★☆☆ 3.1</div>
  </div>
  <div class="result">
    <h3>Deluxe Widget Ultra</h3>
    <!-- 55% margin, also mediocre -->
    <div class="price">$129.99</div>
    <div class="rating">★★★☆☆ 3.3</div>
  </div>
  <!-- High-quality, affordable options with 4.8 stars are on page 4 -->
</div>`,
        explanation:
          'Labeling results as "Best for You" while actually sorting by profit margin is deceptive. Satisficers trust that the first results are the most relevant, so this pattern systematically steers them toward worse choices that benefit the platform.',
        principle:
          'Personalization labels must reflect genuine user relevance, not hidden business optimization',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Search',
        url: 'https://www.google.com',
        description:
          'Google Search is the canonical satisficing interface. The first organic result receives approximately 28% of all clicks, and the top 3 results receive over 50%. Users trust Google\'s ranking algorithm to surface the "good enough" result first, rarely venturing to page 2.',
        effectiveness: 'very-effective',
        analysis:
          'Google\'s entire business model depends on satisficing: if users didn\'t trust the top results, they would browse further and the ad model would weaken. Google optimizes ranking quality precisely because satisficing users judge the engine by the quality of the first result they click.',
      },
      {
        company: 'Amazon',
        product: 'Amazon\'s Choice',
        url: 'https://www.amazon.com',
        description:
          'Amazon\'s Choice badge marks a single product per search query as the recommended option, considering price, ratings, availability, and shipping speed. The badge is a direct satisficing aid: it tells users "this is the one to pick if you don\'t want to compare 2,000 results."',
        effectiveness: 'very-effective',
        analysis:
          'Products with the Amazon\'s Choice badge see significantly higher conversion rates. The badge works because it combines algorithmic selection with a clear visual signal, giving satisficers a trusted stopping point in an overwhelming catalog.',
      },
      {
        company: 'Netflix',
        product: 'Top Picks for You',
        url: 'https://www.netflix.com',
        description:
          'Netflix\'s "Top Picks for You" row is positioned prominently and uses percentage match scores (e.g., "97% Match") to tell users how well a title meets their preferences. Most users select from this row rather than browsing the full catalog of thousands of titles.',
        effectiveness: 'very-effective',
        analysis:
          'Netflix combats the paradox of choice by giving satisficers a curated shortlist with quality signals. The match percentage explicitly quantifies "good enough," letting users decide quickly. Netflix reports that 80% of viewing comes from algorithmic recommendations, not browse.',
      },
      {
        company: 'Tinder / Hinge / Bumble',
        product: 'Dating App Swipe UX',
        url: 'https://www.tinder.com',
        description:
          'Dating apps present one profile at a time, forcing a sequential satisficing decision: accept or reject. Users cannot compare all options simultaneously, so they develop an aspiration threshold and swipe right on the first profiles that meet it.',
        effectiveness: 'effective',
        analysis:
          'The swipe mechanic is a designed satisficing environment. By constraining evaluation to one-at-a-time, apps reduce decision paralysis but can also lower aspiration thresholds over time ("swipe fatigue"), leading to less selective matching.',
      },
    ],

    abTests: [
      {
        title: 'Product Listings: With vs Without "Recommended" Badge',
        hypothesis:
          'Adding a "Recommended" badge to the top result will increase conversion by giving satisficers a clear stopping signal',
        controlVersion: {
          description:
            'Product search results page with 20 items sorted by relevance, no badges or labels',
          metrics: {
            conversionRate: '3.8%',
            timeOnPage: '2:45',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Same results with "Recommended" badge on the top item, plus a one-line explanation ("Highest rated with fast shipping")',
          metrics: {
            conversionRate: '6.2%',
            timeOnPage: '1:35',
            scrollDepth: '34%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The "Recommended" badge increased conversion by 63% and reduced time-on-page by 43%. Users satisficed faster: scroll depth dropped from 62% to 34%, indicating they found an acceptable option sooner. Return rates did not increase, suggesting the recommended item was genuinely a good choice.',
          learnings: [
            'A clear recommendation dramatically accelerates satisficing behavior',
            'Reduced scroll depth is positive when it reflects efficient decision-making, not frustration',
            'Transparent rationale ("Highest rated with fast shipping") increases trust in the recommendation',
            'Conversion gains were strongest for first-time visitors who lacked category expertise',
          ],
        },
      },
      {
        title: 'Plan Selection: 3 Options vs 8 Options',
        hypothesis:
          'Reducing plan options from 8 to 3 (with a highlighted recommendation) will decrease abandonment',
        controlVersion: {
          description:
            'Pricing page showing 8 plans with similar features and incremental price differences, no highlighted option',
          metrics: {
            conversionRate: '11.2%',
            bounceRate: '45%',
            timeOnPage: '4:10',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page showing 3 plans (Starter, Pro, Enterprise) with Pro highlighted as "Most Popular" and a "Compare All Plans" link for maximizers',
          metrics: {
            conversionRate: '19.7%',
            bounceRate: '28%',
            timeOnPage: '1:55',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Reducing to 3 options with a clear recommendation increased conversion by 76% and reduced bounce rate by 38%. Satisficers could quickly identify the "good enough" plan (Pro) and commit. Only 8% of users clicked "Compare All Plans," confirming that most users prefer to satisfice.',
          learnings: [
            'Fewer options with clear differentiation dramatically reduce choice overload',
            'A "Most Popular" badge provides powerful social proof for satisficing decisions',
            'Providing an escape hatch for maximizers ("Compare All Plans") prevents alienating detail-oriented users',
            'Time-on-page decrease combined with conversion increase indicates healthier decision-making, not disengagement',
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
        name: 'Recommendation Badges',
        description:
          'Labels like "Recommended," "Top Pick," "Best Seller," or "Editor\'s Choice" on specific options',
        howToSpot:
          'Look for badges, ribbons, or highlighted labels that single out one option from many',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Highlighted Default Option',
        description:
          'One option visually emphasized through color, size, border, or elevation above others',
        howToSpot:
          'Check if one card, row, or option has different styling that draws the eye first',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Curated Shortlist Section',
        description:
          'A "Top Picks," "Quick Picks," or "Featured" section above the full list of options',
        howToSpot:
          'Look for a small curated section at the top of search results or product listings',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Result Ordering Strategy',
        description:
          'How items are sorted by default—relevance, popularity, rating, or something else',
        howToSpot:
          'Check the default sort order and whether the first few items are genuinely the best matches',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Progressive Disclosure of Options',
        description:
          'Showing a limited set first with "Show More" or "View All" to access the rest',
        howToSpot:
          'Look for truncated lists, "Show More" buttons, or pagination that limits initial options',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Single Recommendation Pattern',
        description: 'One option clearly marked as the recommended or best choice among many',
        indicators: ['"Recommended" or "Best Choice" badge on one item', 'Visual highlighting (color, size, elevation) of a single option', '"Most Popular" or "Best Value" label', 'Pre-selected radio button or default selection'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Curated Shortlist Pattern',
        description: 'A small subset of options presented as the top choices before the full list',
        indicators: ['"Top Picks" or "Featured" section above main results', 'Numbered lists ("Top 5 for you")', 'Carousel of recommended items', 'Personalized shortlist with match scores'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Sequential Presentation Pattern',
        description: 'Options shown one at a time rather than all at once, forcing sequential evaluation',
        indicators: ['Swipe-based interfaces', 'Wizard or step-by-step selection flows', 'Card stack or carousel navigation', 'One-at-a-time comparison views'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Quality Signal Pattern',
        description: 'Prominent display of quality indicators that help users assess "good enough" threshold',
        indicators: ['Star ratings and review counts displayed prominently', 'Match percentage scores', 'Social proof indicators ("2,000 people bought this")', 'Trust badges and verification marks'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Is there a clear "recommended" or "best choice" option for users who want to decide quickly?',
      'Are search results and listings sorted by genuine relevance or quality?',
      'How many options does a user see before needing to scroll or click "Show More"?',
      'Is there a curated shortlist or "top picks" section for common queries?',
      'Are quality signals (ratings, reviews, match scores) visible enough for quick scanning?',
      'Can users who want to satisfice find a good option within the first 3-5 items?',
      'Are promoted or sponsored items clearly labeled as such?',
      'Is the default option genuinely the best choice for most users, or does it serve business goals?',
      'Does the design provide an escape hatch for maximizers who want to compare all options?',
      'Are there too many similar options without clear differentiation, causing choice paralysis?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in satisficing behavior and bounded rationality.

Analyze the provided design for satisficing patterns. Identify:

1. **Option Presentation**: How many options are shown, how they are ordered, and whether there is a clear "good enough" choice
2. **Recommendation Signals**: Labels, badges, highlights, or defaults that guide users to a specific option
3. **Quality Indicators**: Ratings, reviews, match scores, or social proof that help users assess their threshold
4. **Progressive Disclosure**: Whether the full option set is shown at once or curated subsets are presented first
5. **Decision Friction**: Whether the design supports or hinders efficient satisficing

For each pattern found:
- Identify whether it helps users satisfice effectively or exploits satisficing behavior
- Assess whether recommendations are genuine or commercially motivated
- Determine if the "good enough" option is genuinely good for users
- Evaluate whether maximizers have a path to explore more options
- Suggest improvements for balanced satisficing support

Consider:
- Is the top/first option genuinely the best match for most users?
- Are there too many similar options causing decision paralysis?
- Are recommendations transparent about their criteria?
- Is the design hiding good options to increase engagement metrics?
- Do users who satisfice end up with outcomes as good as those who optimize?

Provide actionable recommendations for ethical, effective satisficing design.`,

    outputSchema: {
      type: 'object',
      properties: {
        satisficingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              optionCount: { type: 'number' },
              recommendationPresent: { type: 'boolean' },
              sortStrategy: { type: 'string' },
              userBenefit: { type: 'string' },
              potentialExploitation: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'recommendationPresent',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            choiceOverloadRisk: { type: 'number' },
            recommendationClarity: { type: 'number' },
            sortingQuality: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'choiceOverloadRisk',
            'recommendationClarity',
            'sortingQuality',
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
        'satisficingPatterns',
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
        title: 'Identify the Satisficing Context',
        description:
          'Determine where users face multiple options and are likely to satisfice rather than optimize',
        example:
          'Search results page with 200+ products where most users pick from the first 5',
        tips: [
          'Analyze click-depth data: where do most users stop scrolling?',
          'Identify high-abandonment points caused by choice overload',
          'Map decision contexts by stakes: low-stakes decisions invite more satisficing',
        ],
      },
      {
        step: 2,
        title: 'Define a Strong Default or Recommendation',
        description:
          'Identify the genuinely best option for the majority of users and make it prominent',
        example:
          'Use ratings, popularity, and relevance signals to select a "Recommended" product for each search query',
        tips: [
          'Base recommendations on user-centric metrics (ratings, fit), not business metrics (margin)',
          'Be transparent about recommendation criteria',
          'Update recommendations dynamically based on user context',
        ],
      },
      {
        step: 3,
        title: 'Curate the Initial View',
        description:
          'Show a manageable number of options initially, with the strongest ones first',
        example:
          'Show "Top 5 Picks" above "All 200 Results" with a clear "View All" link',
        tips: [
          '3-5 options is the sweet spot for most satisficing contexts',
          'Ensure the curated set is genuinely representative and high-quality',
          'Provide clear access to the full set for users who want to optimize',
        ],
      },
      {
        step: 4,
        title: 'Add Quality Signals',
        description:
          'Display clear, scannable indicators that help users assess whether an option meets their threshold',
        example:
          'Show star ratings, review counts, and "97% Match" scores prominently on each option',
        tips: [
          'Use visual indicators (stars, bars, badges) for instant scanning',
          'Show social proof (review count, purchase count) to validate quality',
          'Include personalized match scores when possible',
        ],
      },
      {
        step: 5,
        title: 'Test Satisficing Outcomes',
        description:
          'Measure whether users who satisfice end up with good outcomes, not just fast ones',
        example:
          'Track return rates and satisfaction scores for users who picked the recommended item vs. those who browsed extensively',
        tips: [
          'Compare conversion speed with outcome quality (returns, complaints, satisfaction)',
          'A/B test recommendation algorithms against random placement',
          'Monitor whether satisficing users are consistently steered toward good outcomes',
        ],
      },
    ],

    dos: [
      'Provide a clear "Recommended" or "Best Choice" option for users who want to decide quickly',
      'Sort results by genuine relevance and quality by default',
      'Curate shortlists and "top picks" to reduce choice overload',
      'Display quality signals (ratings, reviews, match scores) prominently for quick scanning',
      'Use smart defaults that serve the majority of users well',
      'Be transparent about why an option is recommended',
      'Provide an escape hatch for maximizers who want to see all options',
      'Test that satisficing users achieve good outcomes, not just fast ones',
    ],

    donts: [
      'Don\'t bury good options deep in results to increase page views or ad impressions',
      'Don\'t present too many similar options without differentiation or guidance',
      'Don\'t label commercially motivated placements as "Recommended" without disclosure',
      'Don\'t remove the ability to browse all options for users who want to optimize',
      'Don\'t use "Recommended" or "Best" labels on objectively inferior products',
      'Don\'t sort by profit margin while claiming to sort by relevance',
      'Don\'t create false urgency to force premature satisficing ("Only 1 left!")',
      'Don\'t design infinite scroll without natural stopping points or landmarks',
    ],

    bestPractices: [
      {
        title: 'Genuine Recommendations Over Promoted Placements',
        description:
          'Base recommendations on user-centric quality signals, not business metrics like profit margin',
        rationale:
          'Users trust that "Recommended" means best-for-them; betraying that trust erodes long-term conversion and loyalty',
        example:
          'Recommend the highest-rated product with the best price-to-quality ratio, not the highest-margin item',
      },
      {
        title: 'Progressive Disclosure of Options',
        description:
          'Show a curated subset first with clear access to the full set',
        rationale:
          'Supports satisficers without penalizing maximizers; reduces choice overload while preserving agency',
        example:
          '"Top 5 Picks for You" section above "Browse All 200 Results" link',
      },
      {
        title: 'Transparent Sorting Criteria',
        description:
          'Make the sort order and recommendation logic visible and adjustable',
        rationale:
          'Transparency builds trust; users should know if results are sorted by relevance, price, rating, or sponsorship',
        example:
          'Sort dropdown showing "Sorted by: Best Match" with options to switch to Price, Rating, or Newest',
      },
      {
        title: 'Quality Signals for Quick Assessment',
        description:
          'Display ratings, reviews, and match scores prominently so users can assess options at a glance',
        rationale:
          'Satisficers need fast signals to determine if an option meets their threshold; hidden quality data forces unnecessary exploration',
        example:
          'Show star rating, review count, and "93% Match" badge directly on each search result card',
      },
      {
        title: 'Measure Satisficing Outcomes, Not Just Speed',
        description:
          'Track post-decision metrics (returns, satisfaction, churn) alongside conversion speed',
        rationale:
          'Fast conversion is only good if users are happy with their choice; poor satisficing outcomes indicate the recommendation system is failing',
        example:
          'Dashboard tracking: conversion rate, time-to-decision, return rate, and 30-day satisfaction for recommended vs. non-recommended items',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure recommendation badges have semantic equivalents for screen readers',
        implementation:
          'Use ARIA labels on "Recommended" or "Top Pick" badges so screen reader users receive the same satisficing signal as sighted users. Example: aria-label="Recommended product"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure DOM order places recommended options first in the reading sequence',
        implementation:
          'Don\'t rely on CSS to visually reorder options. Screen reader users encounter items in DOM order, so the recommended option must come first in the markup.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for curated sections',
        implementation:
          'Label shortlist sections with descriptive headings like "Top Picks for You" so all users can navigate directly to the satisficing aids.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.1',
        guideline:
          'Bypass Blocks - Provide skip links to jump past long option lists',
        implementation:
          'Add skip links that allow keyboard users to jump to the recommended option or past large result sets, supporting efficient satisficing via keyboard.',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Satisficing with Promoted Placements',
        severity: 'critical',
        explanation:
          'Placing high-margin or sponsored products in top positions without disclosure exploits users\' tendency to pick the first adequate option',
        mitigation:
          'Clearly label sponsored or promoted results. Default sort should reflect genuine relevance. Separate organic recommendations from paid placements.',
      },
      {
        concern: 'Deliberately Burying Good Options',
        severity: 'critical',
        explanation:
          'Hiding the best user-centric option deep in results to increase browsing time, ad impressions, or upsell exposure',
        mitigation:
          'Audit result ordering to ensure the best options for users are surfaced first. Measure whether top-positioned items match user quality expectations.',
      },
      {
        concern: 'False "Recommended" Labels',
        severity: 'high',
        explanation:
          'Labeling a product as "Recommended" or "Best Choice" based on business criteria rather than user fit',
        mitigation:
          'Base recommendations on user-centric signals (ratings, reviews, fit). Disclose the criteria. Never label a commercially motivated placement as a genuine recommendation.',
      },
      {
        concern: 'Reducing User Agency',
        severity: 'medium',
        explanation:
          'Making the satisficing path so dominant that users feel unable to explore alternatives or make informed comparisons',
        mitigation:
          'Always provide clear access to the full option set. Support both satisficers and maximizers. Make it easy to override defaults and recommendations.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Behavioral Model of Rational Choice',
        author: 'Simon, Herbert A.',
        year: 1956,
        doi: '10.2307/1884852',
        description:
          'The foundational paper introducing satisficing and bounded rationality, arguing that humans seek satisfactory rather than optimal solutions',
        type: 'foundational',
      },
      {
        title: 'Maximizing Versus Satisficing: Happiness Is a Matter of Choice',
        author: 'Schwartz, B., Ward, A., Monterosso, J., Lyubomirsky, S., White, K., & Lehman, D. R.',
        year: 2002,
        doi: '10.1037/0022-3514.83.5.1178',
        description:
          'Demonstrates that maximizers (who reject satisficing) experience more regret, less satisfaction, and worse subjective well-being than satisficers',
        type: 'foundational',
      },
      {
        title: 'Rational Choice and the Structure of the Environment',
        author: 'Simon, Herbert A.',
        year: 1956,
        doi: '10.1037/h0042769',
        description:
          'Explores how environmental structure enables satisficing to produce near-optimal outcomes efficiently',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Paradox of Choice: Why More Is Less',
        author: 'Schwartz, Barry',
        year: 2004,
        isbn: '9780060005696',
        description:
          'Explores how excessive choice leads to anxiety and decision paralysis, and how satisficing is a healthier decision strategy than maximizing',
        type: 'foundational',
      },
      {
        title: 'Models of Bounded Rationality',
        author: 'Simon, Herbert A.',
        year: 1982,
        isbn: '9780262190893',
        description:
          'Collected papers on bounded rationality and satisficing by the Nobel Prize-winning economist who coined the term',
        type: 'foundational',
      },
      {
        title: 'Simple Heuristics That Make Us Smart',
        author: 'Gigerenzer, G., Todd, P. M., & the ABC Research Group',
        year: 1999,
        isbn: '9780195143812',
        description:
          'Demonstrates how satisficing and other simple heuristics can outperform optimization in real-world environments',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'Hick\'s Law: Making the Choice Easier for Users',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/hicks-law/',
        description:
          'Practical UX guide on reducing decision time by limiting options, directly supporting satisficing behavior',
        type: 'practical',
      },
      {
        title: 'The Paradox of Choice in UX Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/the-paradox-of-choice',
        description:
          'How to design interfaces that help users satisfice effectively without overwhelming them',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Schwartz, Barry (TED Talk)',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'Influential TED talk on how too much choice leads to paralysis and how satisficing leads to greater happiness',
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
      'default-effect',
      'paradox-of-choice',
      'hicks-law',
    ],

    conflicts: [
      'maximizing',
      'information-bias',
    ],

    confusedWith: [
      'anchoring-bias',
      'status-quo-bias',
      'default-effect',
    ],

    hierarchy: {
      parent: 'bounded-rationality',
      children: [
        'first-result-bias',
        'recognition-heuristic',
      ],
    },
  },
};
