/**
 * MAXIMIZING
 *
 * The compulsive need to find the absolute best option
 * rather than a "good enough" one, leading to decision
 * paralysis and lower satisfaction.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const maximizing: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'maximizing',
    name: 'Maximizing',
    aliases: ['Maximizer Tendency', 'Optimization Bias', 'Best-Option Seeking'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'decision-making',
      'choice-overload',
      'comparison',
      'satisfaction',
      'decision-paralysis',
      'optimization',
      'filtering',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People feel compelled to find the absolute best option rather than settling for one that is "good enough," leading to decision paralysis and lower satisfaction.',

    detailed: `Maximizing is a decision-making tendency in which individuals feel they must exhaustively evaluate every available option to ensure they select the objectively best one. Unlike "satisficers," who accept the first option that meets their criteria, maximizers continue searching and comparing even after finding acceptable choices.

This tendency leads to a paradox: maximizers often make objectively better choices but feel worse about them. The exhaustive comparison process increases regret, opportunity cost awareness, and counterfactual thinking ("What if the other option was better?"). As the number of available options grows, maximizers experience disproportionate stress and decision fatigue.

In product and UX design, maximizing profoundly affects how users interact with comparison features, sorting tools, recommendation engines, and purchase flows. Designers can reduce maximizing distress by curating options, providing confidence signals ("Best for you"), and limiting unnecessary comparisons while still respecting user autonomy.`,

    psychologyBasis: {
      discoveredBy: 'Barry Schwartz',
      year: 2002,
      theory: 'Paradox of Choice / Maximization Scale',
      mechanism: `Maximizers engage in an exhaustive search process that is cognitively costly and emotionally draining. This happens because:

1. **Exhaustive Comparison**: Maximizers feel compelled to evaluate every option before committing, consuming time and cognitive resources
2. **Upward Counterfactual Thinking**: After choosing, maximizers imagine how unchosen alternatives might have been better, generating regret
3. **Elevated Opportunity Cost**: Each rejected option represents a perceived loss, and maximizers weigh these foregone alternatives heavily
4. **Adaptation and Rising Standards**: As maximizers encounter better options, their reference point shifts upward, making it harder to feel satisfied
5. **Social Comparison**: Maximizers compare their choices to others' choices, amplifying regret when someone else appears to have chosen better`,
    },

    realWorldExample: `In Schwartz et al.'s 2002 research, participants scoring high on the Maximization Scale reported spending significantly more time comparing options when shopping, yet experienced less satisfaction with their purchases. In a related study by Iyengar, Wells, and Schwartz (2006), maximizers who landed better-paying jobs after college reported feeling worse about their outcomes than satisficers with lower-paying positions. The maximizers could not stop wondering whether an even better job existed.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Maximizing affects how users navigate comparison features, filtering tools, recommendation systems, and any interface with multiple options. Designers can help maximizers by:

- Providing clear "best for you" recommendations backed by transparent criteria
- Offering curated shortlists and expert picks that reduce the need to evaluate everything
- Displaying confidence indicators (ratings, awards, editor's choice) that signal when an option is objectively strong
- Designing sorting and filtering tools that narrow options efficiently
- Limiting visible options to reduce comparison fatigue while allowing deeper exploration on demand`,

    whenToUse: [
      {
        title: 'Product Comparison Pages',
        scenario:
          'When users need to choose between multiple products or plans',
        example:
          'Highlight a "Recommended" or "Best Value" option with a clear rationale, reducing the need to compare every detail',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Search Results and Listings',
        scenario: 'When displaying large catalogs of items to browse',
        example:
          'Show "Top Rated" and "Editor\'s Pick" badges on standout items so maximizers can trust a shortlist without evaluating everything',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Filtering and Sorting Tools',
        scenario: 'When helping users narrow down large option sets',
        example:
          'Provide smart filters ("Best for beginners," "Best performance") that collapse complex trade-offs into curated views',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Recommendation Engines',
        scenario: 'When suggesting products, content, or settings to users',
        example:
          'Display a confidence score or match percentage ("94% match for you") to help maximizers feel their choice is validated',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Checkout and Commitment Flows',
        scenario: 'When users are about to finalize a purchase or decision',
        example:
          'Show reassurance messaging ("Great choice -- rated 4.8/5 by 12,000 buyers") to reduce post-decision regret',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Oversimplified Critical Decisions',
        reason:
          'Hiding options to reduce maximizing can be harmful when users genuinely need to weigh trade-offs (e.g., medical treatments, financial products)',
        consequence:
          'Users may miss important alternatives and feel deceived when they discover hidden options',
        alternative:
          'Provide curated defaults with clear access to the full option set and transparent criteria',
      },
      {
        title: 'Forced Recommendations Without Transparency',
        reason:
          'Labeling an option as "Best" without explaining why can feel manipulative, especially if the recommendation is commercially motivated',
        consequence:
          'Erosion of trust if users perceive the recommendation as self-serving',
        alternative:
          'Explain recommendation criteria openly: "Recommended based on your usage, budget, and reviews"',
      },
      {
        title: 'Removing User Agency',
        reason:
          'Aggressively limiting options to "help" maximizers can frustrate power users who want full control',
        consequence:
          'Power users abandon the product for a competitor with more granular options',
        alternative:
          'Layer the interface: curated defaults for most users, advanced view for power users',
      },
      {
        title: 'High-Stakes Professional Contexts',
        reason:
          'In B2B procurement or enterprise decisions, maximizing is rational and expected',
        consequence:
          'Oversimplifying options may disqualify your product from evaluation',
        alternative:
          'Provide detailed comparison tools with exportable data for thorough evaluation',
      },
    ],

    commonMistakes: [
      {
        title: 'Providing Too Many Options Without Guidance',
        description:
          'Showing 50+ options with no curation, ranking, or recommendation',
        why: 'Maximizers will attempt to evaluate every option, leading to decision paralysis and abandonment',
        fix: 'Curate a shortlist of 3-5 recommended options, with the full catalog available on demand',
      },
      {
        title: 'Comparison Tables That Are Too Detailed',
        description:
          'Feature comparison tables with 30+ rows that highlight minor differences',
        why: 'Maximizers fixate on every difference, no matter how trivial, delaying decisions',
        fix: 'Show key differentiators by default, with an "expand all details" option for those who need it',
      },
      {
        title: 'No Clear Winner or Recommendation',
        description:
          'Presenting all options as equally valid without any guidance',
        why: 'Maximizers need a signal that one option is objectively strong to break their comparison loop',
        fix: 'Designate a "Best Overall," "Best Value," or "Most Popular" pick with clear justification',
      },
      {
        title: 'Encouraging Endless Browsing',
        description:
          'Infinite scroll, "you may also like" carousels, and related-item links that keep maximizers searching',
        why: 'Each new option reopens the comparison process and delays commitment',
        fix: 'Limit related suggestions, show them after purchase, or frame them as complementary rather than alternative',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines how many options are visible simultaneously and how comparison flows',
        examples: [
          'Side-by-side comparison layouts amplify maximizing by inviting exhaustive feature scanning',
          'Card grids with 3-4 highlighted picks reduce decision fatigue vs. long undifferentiated lists',
          'Progressive disclosure hides secondary options until the user actively expands',
          'Sticky recommendation bars keep the "best pick" visible during scroll exploration',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy signals which information matters most for deciding',
        examples: [
          'Bold recommendation labels ("Best Overall") guide maximizers toward confident choices',
          'De-emphasized secondary specs prevent fixation on trivial differences',
          'Clear rating displays (large star count) provide quick quality signals',
          'Summary headlines reduce the need to read every detail before comparing',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color draws attention to recommended options and signals quality tiers',
        examples: [
          'Gold or accent-colored "Top Pick" badges attract maximizers to pre-vetted options',
          'Muted backgrounds on non-recommended options subtly deprioritize them',
          'Green confidence indicators communicate strong match or high rating',
          'Color-coded tier labels (Basic, Pro, Enterprise) clarify positioning at a glance',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive sorting, filtering, and comparison tools are the primary battleground for maximizers',
        examples: [
          'Smart filters ("Best for...") reduce the option set to manageable shortlists',
          'Compare checkboxes that limit selection to 3-4 items prevent endless comparison',
          'Sort-by-rating defaults guide maximizers toward validated options first',
          'Saved comparisons let maximizers pause and return without losing progress',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users feel confident in their choice or compelled to keep searching',
        examples: [
          'Expert review summaries ("Wirecutter\'s Top Pick") give maximizers permission to stop searching',
          'Recommendation rationales ("Best for your use case because...") address why this option is right',
          'Post-purchase reassurance ("You chose the #1 rated option") reduces regret',
          'Review aggregation (overall score + summary) prevents maximizers from reading every individual review',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible comparison and recommendation features ensure all users benefit from maximizing-reduction strategies',
        examples: [
          'Screen reader users need programmatic access to "recommended" labels and ratings',
          'Keyboard-navigable comparison tools must support efficient option narrowing',
          'ARIA live regions should announce filter results and recommendation changes',
          'Focus management after filtering keeps assistive technology users oriented',
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
        title: 'Expert-Curated Best-Of List',
        description:
          'Product review site providing a clear top pick with transparent methodology',
        code: `<section class="best-picks">
  <h2>Best Wireless Headphones of 2026</h2>
  <p class="methodology">Tested 47 models over 6 months. Rated on sound quality,
  comfort, battery life, and value.</p>

  <article class="pick top-pick">
    <span class="badge">Our Top Pick</span>
    <h3>Sony WH-1000XM6</h3>
    <div class="rating">
      <span class="stars">4.8/5</span>
      <span class="reviews">(2,341 reviews)</span>
    </div>
    <p class="verdict">Best overall noise cancellation, comfort, and sound
    quality. The clear winner for most people.</p>
    <button class="primary">See Price</button>
  </article>

  <article class="pick budget-pick">
    <span class="badge secondary">Best Budget</span>
    <h3>Anker Soundcore Q45</h3>
    <div class="rating">
      <span class="stars">4.5/5</span>
    </div>
    <p class="verdict">90% of the top pick's quality at 40% of the price.</p>
  </article>

  <details>
    <summary>See all 47 tested models</summary>
    <!-- Full comparison table available on demand -->
  </details>
</section>`,
        explanation:
          'Maximizers get a clear, expert-backed recommendation with transparent criteria. The "Top Pick" label gives them permission to stop searching. The full list is available but hidden, preventing compulsive comparison.',
        principle:
          'Curated expert picks with transparent methodology reduce maximizing distress',
        metrics: {
          before: '23% completed purchase after browsing 12+ product pages',
          after: '41% completed purchase after viewing curated picks',
          improvement: '78% increase in purchase completion, 60% fewer pages viewed',
        },
      },
      {
        title: 'Confidence-Based Recommendation',
        description:
          'Streaming service matching content to user preferences with confidence scores',
        code: `<div class="recommendation">
  <h3>Recommended for You</h3>
  <div class="match-card">
    <img src="movie-poster.jpg" alt="The Brutalist">
    <div class="match-info">
      <span class="match-score">97% Match</span>
      <h4>The Brutalist</h4>
      <p>Based on your love of character-driven dramas and architectural themes</p>
      <div class="confidence-signals">
        <span class="signal">Critics: 94%</span>
        <span class="signal">Audience: 91%</span>
        <span class="signal">Friends who liked it: 4/5</span>
      </div>
    </div>
  </div>
  <p class="reassurance">Users with similar taste rated this 4.7/5</p>
</div>`,
        explanation:
          'The 97% match score and multiple confidence signals give maximizers evidence that this is the right choice for them specifically, reducing the urge to browse endlessly.',
        principle:
          'Personalized confidence scores help maximizers trust that a recommendation is optimal for them',
      },
      {
        title: 'Smart Filtering with Category Shortcuts',
        description:
          'E-commerce site with intent-based filters that collapse complex decisions',
        code: `<div class="smart-filters">
  <h3>Find Your Perfect Laptop</h3>
  <div class="intent-filters">
    <button class="filter-pill active">Best for Developers</button>
    <button class="filter-pill">Best for Creatives</button>
    <button class="filter-pill">Best for Students</button>
    <button class="filter-pill">Best for Gaming</button>
  </div>

  <div class="results-summary">
    <p>Showing <strong>5 top picks</strong> from 234 laptops</p>
    <button class="text-link">Show all 234 results</button>
  </div>

  <div class="curated-results">
    <div class="result top-result">
      <span class="badge">Best Overall for Developers</span>
      <h4>MacBook Pro 16" M4 Max</h4>
      <div class="key-specs">
        <span>Build speed: Fastest</span>
        <span>Battery: 18hr</span>
        <span>Display: Best-in-class</span>
      </div>
    </div>
    <!-- 4 more curated results -->
  </div>
</div>`,
        explanation:
          'Intent-based filters transform an overwhelming 234-item catalog into a focused 5-item shortlist, each labeled with clear positioning. Maximizers can trust the curation while retaining access to the full set.',
        principle:
          'Intent-based filtering narrows options to a manageable set aligned with user goals',
        metrics: {
          before: 'Average session: 34 min, 18 products viewed, 11% conversion',
          after: 'Average session: 12 min, 6 products viewed, 24% conversion',
          improvement: '118% increase in conversion, 65% reduction in session time',
        },
      },
    ],

    bad: [
      {
        title: 'Overwhelming Comparison Grid',
        description:
          'Feature comparison table with excessive detail and no guidance',
        code: `<!-- DON'T DO THIS -->
<table class="comparison">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Plan A</th>
      <th>Plan B</th>
      <th>Plan C</th>
      <th>Plan D</th>
      <th>Plan E</th>
    </tr>
  </thead>
  <tbody>
    <!-- 35 rows of features with checkmarks and X marks -->
    <tr><td>API Access</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>SSO</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Custom Domains</td><td>No</td><td>1</td><td>3</td><td>10</td><td>Unlimited</td></tr>
    <!-- ... 32 more rows ... -->
  </tbody>
</table>
<p>Choose the plan that's right for you!</p>`,
        explanation:
          'Five plans with 35 feature rows and no recommendation forces maximizers into exhaustive row-by-row comparison. The vague call-to-action offers no guidance, amplifying decision paralysis.',
        principle:
          'Excessive options without curation feed the maximizing loop instead of breaking it',
      },
      {
        title: 'Endless "You Might Also Like" Loop',
        description:
          'Product page with aggressive related-item suggestions that prevent commitment',
        code: `<!-- DON'T DO THIS -->
<div class="product-page">
  <h2>Running Shoes XR-500</h2>
  <button class="add-to-cart">Add to Cart</button>

  <section class="also-like">
    <h3>You Might Also Like (47 similar items)</h3>
    <div class="carousel"><!-- 12 shoes --></div>
  </section>

  <section class="compare">
    <h3>Compare With Similar Products</h3>
    <div class="carousel"><!-- 8 shoes --></div>
  </section>

  <section class="trending">
    <h3>Trending in Running Shoes</h3>
    <div class="carousel"><!-- 10 shoes --></div>
  </section>

  <section class="others-bought">
    <h3>Others Also Considered</h3>
    <div class="carousel"><!-- 15 shoes --></div>
  </section>
</div>`,
        explanation:
          'Four carousels showing 45+ alternative products on the same page reopen the comparison process just as the user is ready to commit. Each carousel gives the maximizer a reason to doubt their choice.',
        principle:
          'Surfacing alternatives at the point of commitment amplifies maximizing regret',
      },
      {
        title: 'No Ranking or Quality Signal',
        description:
          'Search results with no ratings, badges, or differentiation',
        code: `<!-- DON'T DO THIS -->
<div class="search-results">
  <h3>847 results for "wireless mouse"</h3>
  <div class="result"><h4>Mouse A</h4><p>$29.99</p></div>
  <div class="result"><h4>Mouse B</h4><p>$34.99</p></div>
  <div class="result"><h4>Mouse C</h4><p>$27.99</p></div>
  <div class="result"><h4>Mouse D</h4><p>$31.99</p></div>
  <!-- 843 more identical-looking results -->
  <nav class="pagination">Page 1 of 85</nav>
</div>`,
        explanation:
          'Displaying 847 undifferentiated results with no ratings, reviews, badges, or expert picks forces maximizers to evaluate each one individually. 85 pages of identical formatting provides no signal to stop searching.',
        principle:
          'Undifferentiated option sets with no quality signals make maximizing impossible to resolve',
      },
    ],

    realWorld: [
      {
        company: 'Wirecutter (NYT)',
        product: 'Best-Of Product Guides',
        url: 'https://www.nytimes.com/wirecutter/',
        description:
          'Wirecutter tests hundreds of products per category and declares a single "Top Pick" with runner-ups. Their transparent methodology (hours tested, criteria weighted) gives maximizers confidence to buy without further research.',
        effectiveness: 'very-effective',
        analysis:
          'Wirecutter directly addresses maximizing by doing the exhaustive research for the user. Their business model depends on maximizers trusting their curation, and their transparent methodology builds that trust. Affiliate revenue proves the model works.',
      },
      {
        company: 'Amazon',
        product: 'Sort by Rating and Amazon\'s Choice',
        url: 'https://www.amazon.com',
        description:
          'Amazon offers "Sort by Avg. Customer Review" and marks products with "Amazon\'s Choice" badges. These signals help maximizers quickly identify the community-validated best option without reading every listing.',
        effectiveness: 'effective',
        analysis:
          'The "Amazon\'s Choice" badge acts as a maximizing shortcut -- it tells the user "this is the one most people would pick." However, the badge criteria are opaque, which sophisticated maximizers may distrust.',
      },
      {
        company: 'TripAdvisor',
        product: 'Travellers\' Choice Rankings',
        url: 'https://www.tripadvisor.com',
        description:
          'TripAdvisor ranks hotels, restaurants, and attractions with "Travellers\' Choice" awards and numerical rankings ("#1 of 342 hotels in Paris"). This gives maximizers a clear hierarchy to follow.',
        effectiveness: 'effective',
        analysis:
          'Numerical rankings directly serve maximizers by establishing an objective ordering. The ranking methodology (review volume + score + recency) is partially transparent, building trust. The risk is that maximizers fixate on #1 vs #2 differences that may be statistically insignificant.',
      },
      {
        company: 'Netflix',
        product: 'Percentage Match Score',
        url: 'https://www.netflix.com',
        description:
          'Netflix shows a personalized "% Match" score on each title based on viewing history. A 97% match signals that this is likely the best option for this user, reducing the need to browse further.',
        effectiveness: 'effective',
        analysis:
          'The match score reframes maximizing from "find the objectively best movie" to "find the best movie for me," which is a more tractable problem. However, removing the star rating system in 2017 actually increased maximizing for some users who preferred the absolute quality signal.',
      },
    ],

    abTests: [
      {
        title: 'Curated Picks vs Full Catalog',
        hypothesis:
          'Showing a curated shortlist with "Top Pick" labels will increase conversion compared to showing the full unfiltered catalog',
        controlVersion: {
          description:
            'Category page showing all 200+ products in a grid with sorting and filtering tools, no recommendations or badges',
          metrics: {
            conversionRate: '8.3%',
            timeOnPage: '6:42',
            scrollDepth: '34%',
          },
        },
        treatmentVersion: {
          description:
            'Category page leading with "Our Top 5 Picks" section (with badges: Best Overall, Best Value, Best Premium, etc.) followed by "Browse All" accordion',
          metrics: {
            conversionRate: '15.1%',
            timeOnPage: '3:18',
            scrollDepth: '62%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Curated picks nearly doubled conversion while halving time on page. Users spent less time but engaged more deeply (higher scroll depth). Return rates were identical, indicating satisfaction was not compromised by faster decisions.',
          learnings: [
            'Expert curation breaks the maximizing loop without reducing satisfaction',
            'Users who expanded "Browse All" (18%) converted at the same rate as control, suggesting the option provides a safety valve',
            'Effect was strongest for first-time buyers; returning customers bypassed curation',
            'Badge labels ("Best Value") were more effective than generic "Recommended" labels',
          ],
        },
      },
      {
        title: 'Post-Purchase Reassurance Messaging',
        hypothesis:
          'Showing choice-validation messaging after purchase will reduce return rates and increase repeat purchases',
        controlVersion: {
          description:
            'Standard order confirmation: "Thank you for your order. Your item will arrive by Friday."',
          metrics: {
            conversionRate: 'N/A',
            clickThroughRate: '2.1%',
          },
        },
        treatmentVersion: {
          description:
            'Enhanced confirmation: "Great choice! The [Product] is rated 4.8/5 by 3,400 buyers. 92% of customers who bought this would buy it again."',
          metrics: {
            conversionRate: 'N/A',
            clickThroughRate: '4.7%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Post-purchase reassurance reduced returns by 18% and increased repeat purchase rate by 12%. Maximizers reported significantly less post-purchase regret in follow-up surveys.',
          learnings: [
            'Maximizing distress continues after purchase; post-decision reassurance is valuable',
            'Social proof (ratings, repurchase intent) is more effective than generic praise',
            'Users who received reassurance were less likely to search for the product on competitor sites post-purchase',
            'Effect was strongest for high-consideration purchases (electronics, furniture)',
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
        name: 'Extensive Comparison Tables',
        description:
          'Large feature comparison grids with many columns and rows inviting exhaustive evaluation',
        howToSpot:
          'Look for side-by-side product or plan comparisons with 10+ feature rows and no highlighted recommendation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: '"Best" and "Top Rated" Badges',
        description:
          'Labels indicating quality ranking or expert validation that help maximizers shortcut evaluation',
        howToSpot:
          'Look for "Top Pick," "Best Seller," "Editor\'s Choice," "Amazon\'s Choice," or star rating badges',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Sorting and Filtering Controls',
        description:
          'Tools that let users reorder and narrow options, which maximizers use heavily',
        howToSpot:
          'Look for sort dropdowns (by rating, price, relevance), filter panels, and refinement chips',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Recommendation Confidence Indicators',
        description:
          'Match scores, compatibility percentages, or "recommended for you" labels',
        howToSpot:
          'Look for percentage matches, compatibility scores, or personalized recommendation labels',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Large Undifferentiated Option Sets',
        description:
          'Many similar-looking options with no clear hierarchy or quality signal',
        howToSpot:
          'Look for long lists or grids of products with uniform styling, no badges, and only price differentiation',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Exhaustive Comparison Pattern',
        description: 'Interface designs that encourage evaluating every option before choosing',
        indicators: [
          'Feature comparison tables with many rows and columns',
          'Multiple "you might also like" carousels on product pages',
          'No clear recommendation or highlighted pick',
          'Pagination through hundreds of results with no shortlist',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Expert Curation Pattern',
        description: 'Curated shortlists with expert or algorithmic picks that reduce maximizing',
        indicators: [
          '"Top Pick" or "Best Overall" badges on select items',
          'Numbered rankings (e.g., "#1 of 50")',
          'Expert review summaries with verdicts',
          'Personalized match scores',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Infinite Browsing Pattern',
        description: 'Interface elements that keep users in a comparison loop instead of committing',
        indicators: [
          'Infinite scroll with no endpoint',
          'Multiple "related items" sections near the buy button',
          '"Compare" buttons that encourage side-by-side evaluation',
          'Persistent "keep browsing" prompts',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Post-Decision Reassurance Pattern',
        description: 'Messaging that validates user choices after commitment to reduce maximizing regret',
        indicators: [
          'Post-purchase confirmation with ratings or social proof',
          '"Great choice" or "popular option" messaging',
          'Satisfaction guarantees and easy return policies',
          'Review summaries on order confirmation pages',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many options are presented simultaneously without ranking or recommendation?',
      'Is there a clear "best pick" or recommended option with transparent criteria?',
      'Do comparison tools encourage exhaustive evaluation or efficient narrowing?',
      'Are there smart filters that collapse complex trade-offs into user-intent categories?',
      'How many alternative product suggestions appear near the commitment point (add to cart, subscribe)?',
      'Is there post-decision reassurance messaging to reduce buyer\'s regret?',
      'Can users save progress on comparisons to reduce decision fatigue?',
      'Are sorting defaults set to help users find the best option quickly (e.g., sort by rating)?',
      'Do recommendation confidence scores or match percentages help users feel their choice is validated?',
      'Is the full option set accessible but not forced on users who prefer curated guidance?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in maximizing tendencies and the paradox of choice.

Analyze the provided design for maximizing patterns. Identify:

1. **Option Volume**: How many options are presented and whether the set size triggers maximizing behavior
2. **Curation Signals**: Whether there are "best pick," recommendation, or ranking signals to help users shortcut evaluation
3. **Comparison Tools**: How filtering, sorting, and comparison features either reduce or amplify exhaustive evaluation
4. **Commitment Friction**: Whether alternative suggestions near the decision point reopen the comparison loop
5. **Post-Decision Support**: Whether the design includes reassurance messaging to reduce post-choice regret

For each pattern found:
- Identify whether it amplifies or reduces maximizing distress
- Assess the balance between user autonomy and guided curation
- Determine if recommendations are transparent and trustworthy
- Evaluate whether the design serves user goals or commercial goals
- Suggest improvements for reducing decision paralysis while preserving choice

Consider:
- Is the option set size appropriate, or does it overwhelm?
- Are recommendations backed by transparent, trustworthy criteria?
- Do comparison tools help users narrow efficiently or encourage endless browsing?
- Is there post-decision reassurance to reduce maximizing regret?
- Are power users still served by the design (access to full options)?

Provide actionable recommendations for helping maximizers decide with confidence.`,

    outputSchema: {
      type: 'object',
      properties: {
        maximizingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              effect: { type: 'string' },
              optionCount: { type: 'number' },
              hasCuration: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'effect',
              'hasCuration',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            optionOverload: { type: 'number' },
            curationQuality: { type: 'number' },
            comparisonEfficiency: { type: 'number' },
            commitmentSupport: { type: 'number' },
          },
          required: [
            'optionOverload',
            'curationQuality',
            'comparisonEfficiency',
            'commitmentSupport',
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
        'maximizingPatterns',
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
        title: 'Audit Your Option Set',
        description:
          'Count the number of options users must choose from and assess whether the set size triggers maximizing',
        example:
          'Product catalog has 340 items in a category with no curation -- likely triggers maximizing',
        tips: [
          'Research suggests 3-7 options is manageable; beyond 10 requires curation',
          'Count not just primary options but also related suggestions, variants, and add-ons',
          'Consider the decision stakes -- high-stakes decisions tolerate fewer options',
        ],
      },
      {
        step: 2,
        title: 'Create a Curated Shortlist',
        description:
          'Develop a "best of" shortlist with clear labels (Best Overall, Best Value, Best for X) backed by transparent criteria',
        example:
          'From 340 laptops, surface "5 Top Picks for Developers" with methodology link',
        tips: [
          'Use data (ratings, sales, returns) to justify picks objectively',
          'Label each pick with a clear positioning statement, not just "recommended"',
          'Update curation regularly to maintain trust',
        ],
      },
      {
        step: 3,
        title: 'Design Smart Filters',
        description:
          'Build intent-based filters that collapse complex trade-offs into simple questions',
        example:
          'Instead of 15 technical spec filters, offer "Best for Gaming / Work / School"',
        tips: [
          'Map user intents to filter presets',
          'Show the reduced count ("5 of 340") to signal progress',
          'Keep advanced filters accessible for power users',
        ],
      },
      {
        step: 4,
        title: 'Add Confidence Signals',
        description:
          'Display ratings, match scores, expert endorsements, and social proof to help users trust their choice',
        example:
          'Show "4.8/5 from 12,000 reviews" + "Wirecutter Top Pick" + "94% match for you"',
        tips: [
          'Layer multiple confidence signals for stronger effect',
          'Use specific numbers (not "highly rated" but "4.8 out of 5")',
          'Show repurchase intent or satisfaction data when available',
        ],
      },
      {
        step: 5,
        title: 'Reduce Alternatives at Commitment Point',
        description:
          'Minimize "you might also like" and comparison prompts near the purchase or signup button',
        example:
          'Remove related product carousels from the checkout flow; show them on the confirmation page instead',
        tips: [
          'Audit the number of alternative suggestions visible at the decision point',
          'Move "compare" and "similar items" to earlier in the journey',
          'Replace alternatives with reassurance at the commitment point',
        ],
      },
      {
        step: 6,
        title: 'Add Post-Decision Reassurance',
        description:
          'Validate the user\'s choice after they commit to reduce post-purchase maximizing regret',
        example:
          'Order confirmation: "Great choice! Rated 4.8/5. 92% of buyers would buy again."',
        tips: [
          'Use social proof (ratings, repurchase rate) rather than generic praise',
          'Avoid showing "better" alternatives after purchase',
          'Satisfaction guarantees reduce anticipated regret before purchase',
        ],
      },
    ],

    dos: [
      'Provide clear "Top Pick" or "Best Overall" recommendations with transparent criteria',
      'Offer curated shortlists (3-7 items) from large catalogs with access to the full set on demand',
      'Design intent-based filters that reduce options to relevant shortlists',
      'Display confidence signals: ratings, match scores, expert endorsements',
      'Include post-purchase reassurance messaging with social proof',
      'Show comparison tables that highlight key differentiators, not every feature',
      'Set default sort order to something useful (top rated, most popular)',
      'Allow users to save comparisons and return later without losing progress',
    ],

    donts: [
      'Don\'t present hundreds of undifferentiated options with no guidance',
      'Don\'t show multiple "you might also like" carousels near the buy button',
      'Don\'t create comparison tables with 30+ feature rows and no highlighted winner',
      'Don\'t label a recommendation as "Best" without explaining the criteria',
      'Don\'t use infinite scroll as the primary browsing pattern for decision-heavy categories',
      'Don\'t show "better" alternatives on the order confirmation page',
      'Don\'t force users through the full option set when they want guidance',
      'Don\'t remove all options -- power users need access to the complete set',
    ],

    bestPractices: [
      {
        title: 'Progressive Disclosure of Options',
        description:
          'Show a curated shortlist by default, with the full option set available behind an expand action',
        rationale:
          'Satisficers get a quick answer; maximizers can access everything but start from a manageable set',
        example:
          '"Our Top 5 Picks" section followed by "Browse All 340 Products" accordion',
      },
      {
        title: 'Transparent Recommendation Criteria',
        description:
          'Explain why an option is recommended using objective criteria users can verify',
        rationale:
          'Maximizers distrust opaque recommendations; transparency builds the confidence needed to stop searching',
        example:
          '"Top Pick based on: highest average review (4.8/5), lowest return rate (2%), and best value per feature"',
      },
      {
        title: 'Limit Comparison Scope',
        description:
          'Cap side-by-side comparison tools at 3-4 items and highlight key differentiators',
        rationale:
          'Comparing more than 3-4 items simultaneously exceeds working memory and amplifies maximizing',
        example:
          'Compare checkbox that greys out after 3 selections: "Compare up to 3 products"',
      },
      {
        title: 'Post-Decision Validation',
        description:
          'Reinforce the user\'s choice after commitment with ratings, social proof, and satisfaction data',
        rationale:
          'Maximizing regret peaks immediately after a decision; timely reassurance reduces returns and increases loyalty',
        example:
          'Confirmation screen: "You chose the #1 rated option. 94% of buyers recommend it."',
      },
      {
        title: 'Differentiate Between Satisficers and Maximizers',
        description:
          'Offer both a quick-pick path and a deep-dive path to serve both decision-making styles',
        rationale:
          'One-size-fits-all interfaces either overwhelm satisficers or frustrate maximizers',
        example:
          '"Quick Pick" button for instant recommendation + "Compare All" for detailed evaluation',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure recommendation labels and badges are programmatically associated',
        implementation:
          'Use ARIA labels or visually hidden text so screen readers announce "Top Pick" or "Best Value" badges alongside product names',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Provide clear headings for curated sections and comparison tools',
        implementation:
          'Use descriptive headings like "Our Top 5 Picks" and "Compare Selected Products" so all users can navigate to curation features',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Announce filter results and comparison updates to assistive technology',
        implementation:
          'Use ARIA live regions to announce "Showing 5 of 340 results" when filters are applied, so screen reader users know the option set has been narrowed',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Urgency to Force Premature Decisions',
        severity: 'high',
        explanation:
          'Using fake scarcity or countdown timers to pressure maximizers into choosing before they feel ready',
        mitigation:
          'Use genuine stock data and real deadlines. Let maximizers save items and return. Pressure tactics backfire with this group -- they abandon rather than commit under duress.',
      },
      {
        concern: 'Commercially Biased Recommendations',
        severity: 'high',
        explanation:
          'Labeling higher-margin products as "Best" or "Recommended" when they are not objectively the best option for the user',
        mitigation:
          'Base recommendations on objective criteria (ratings, reviews, return rates) and disclose any commercial relationships. Separating "Sponsored" picks from editorial picks maintains trust.',
      },
      {
        concern: 'Dark Pattern: Hidden Full Option Set',
        severity: 'medium',
        explanation:
          'Making the curated shortlist the only visible path and burying access to the full catalog to boost conversion on featured items',
        mitigation:
          'Always provide clear, prominent access to the full option set. Curation should guide, not restrict.',
      },
      {
        concern: 'Exploiting Decision Fatigue',
        severity: 'medium',
        explanation:
          'Deliberately presenting too many options to exhaust the user and then pushing a specific choice as the "easy" answer',
        mitigation:
          'Design with genuine intent to reduce cognitive load. Curate to help, not to manipulate through exhaustion.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Maximizing Versus Satisficing: Happiness Is a Matter of Choice',
        author: 'Schwartz, B., Ward, A., Monterosso, J., Lyubomirsky, S., White, K., & Lehman, D. R.',
        year: 2002,
        doi: '10.1037/0022-3514.83.5.1178',
        description:
          'The foundational paper introducing the Maximization Scale and demonstrating that maximizers experience less satisfaction despite making objectively better choices',
        type: 'foundational',
      },
      {
        title: 'Doing Better but Feeling Worse: Looking for the "Best" Job Undermines Satisfaction',
        author: 'Iyengar, S. S., Wells, R. E., & Schwartz, B.',
        year: 2006,
        doi: '10.1111/j.1467-9280.2006.01677.x',
        description:
          'Demonstrates that maximizers who secured higher-paying jobs felt worse about their outcomes than satisficers with lower-paying positions',
        type: 'foundational',
      },
      {
        title: 'When Choice Is Demotivating: Can One Desire Too Much of a Good Thing?',
        author: 'Iyengar, S. S., & Lepper, M. R.',
        year: 2000,
        doi: '10.1037/0022-3514.79.6.995',
        description:
          'The famous "jam study" showing that more options lead to less purchasing -- foundational evidence for the paradox of choice',
        type: 'foundational',
      },
      {
        title: 'The Maximization Inventory: A New Measure of Individual Differences in Maximizing',
        author: 'Turner, B. M., Rim, H. B., Betz, N. E., & Nygren, T. E.',
        year: 2012,
        doi: '10.1017/S1930297500004666',
        description:
          'Refined measurement of maximizing tendencies, distinguishing between strategy (how people search) and distress (how they feel)',
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
          'The definitive popular-science book on maximizing, choice overload, and how to design for better decisions',
        type: 'foundational',
      },
      {
        title: 'The Art of Choosing',
        author: 'Iyengar, Sheena',
        year: 2010,
        isbn: '9780446504119',
        description:
          'Comprehensive exploration of how people make choices, with practical implications for designers and product teams',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Broad coverage of decision-making heuristics and biases, including the cognitive foundations of maximizing behavior',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Paradox of Choice in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/simplicity-vs-choice/',
        description:
          'Practical UX guidance on managing choice overload and supporting both satisficers and maximizers',
        type: 'practical',
      },
      {
        title: 'Hick\'s Law: Making the Choice Easier for Users',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/hick-s-law-making-the-choice-easier-for-users',
        description:
          'How increasing the number of choices increases decision time, and practical strategies for reducing cognitive load',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Barry Schwartz (TED)',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'Barry Schwartz\'s influential TED talk on why more choice makes us less happy',
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
      'paradox-of-choice',
      'analysis-paralysis',
      'social-proof',
      'authority-bias',
    ],

    conflicts: [
      'satisficing',
      'default-effect',
    ],

    confusedWith: [
      'analysis-paralysis',
      'paradox-of-choice',
      'perfectionism',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'choice-overload',
        'buyers-remorse',
      ],
    },
  },
};
