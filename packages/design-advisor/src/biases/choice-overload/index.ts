/**
 * CHOICE OVERLOAD
 *
 * Too many options leads to decision paralysis and dissatisfaction
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const choiceOverload: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'choice-overload',
    name: 'Choice Overload',
    aliases: ['Overchoice', 'Choice Paralysis', 'Paradox of Choice'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'too-many-options',
      'decision-fatigue',
      'paralysis',
      'simplicity',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Too many options leads to decision paralysis and dissatisfaction',

    detailed: `Choice overload occurs when the number of available options exceeds a person's cognitive capacity to evaluate them effectively. Rather than feeling empowered by abundance, people become overwhelmed, anxious, and less likely to make any choice at all. When they do choose, they report lower satisfaction because they imagine the unchosen alternatives might have been better.

This phenomenon was famously demonstrated in Iyengar and Lepper's 2000 jam study: shoppers confronted with 24 varieties of jam were far less likely to purchase than those shown only 6 options. The extensive display attracted more initial interest but converted at one-tenth the rate of the limited display.

In product and UX design, choice overload directly undermines conversion, satisfaction, and trust. Every additional option increases cognitive load, extends decision time, and raises the probability of choice avoidance. Effective design constrains options through curation, progressive disclosure, smart defaults, and filtering systems that let users narrow choices at their own pace.`,

    psychologyBasis: {
      discoveredBy: 'Iyengar & Lepper',
      year: 2000,
      theory: 'Choice Overload Theory',
      mechanism: `When faced with too many options, several cognitive processes break down simultaneously:

1. **Evaluation Difficulty**: The brain cannot effectively compare more than a handful of options at once. Each additional option increases the number of pairwise comparisons combinatorially, quickly exceeding working memory capacity (Miller's 7±2 items).
2. **Anticipated Regret**: More options mean more alternatives that were not chosen. People anticipate regretting their choice when they know many unexplored possibilities exist.
3. **Opportunity Cost Escalation**: With few options, opportunity cost is low. With many options, every choice means giving up dozens of potentially good alternatives, making each decision feel costly.
4. **Maximizer Trap**: People who want the "best" option (maximizers) are especially vulnerable. They feel compelled to evaluate every option before deciding, which becomes impossible at scale.
5. **Decision Fatigue**: Evaluating many options depletes cognitive resources. After extended comparison, people either make impulsive choices or abandon the decision entirely.

The result is a paradox: more options objectively increase the chance that a good option exists, but subjectively decrease the likelihood of choosing it or being satisfied with the choice.`,
    },

    realWorldExample: `In Iyengar and Lepper's landmark 2000 study at a Draeger's grocery store, a tasting booth displayed either 24 or 6 varieties of jam. The extensive display attracted 60% of passersby versus 40% for the limited display. However, only 3% of those who stopped at the 24-jam display made a purchase, compared to 30% at the 6-jam display — a ten-fold difference in conversion. The shoppers faced with fewer options were dramatically more likely to commit to a purchase.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Choice overload is one of the most damaging biases in UI/UX design because it directly causes users to abandon tasks, reduce engagement, and feel dissatisfied with outcomes. Designers must actively fight against the temptation to "offer everything." Strategic approaches include:

- Curating options to surface the most relevant subset
- Implementing progressive disclosure to reveal complexity gradually
- Providing smart defaults that work for the majority of users
- Building filtering and sorting systems that let users narrow options
- Using tiered structures (good/better/best) to simplify comparison
- Recommending specific options based on context or user behavior`,

    whenToUse: [
      {
        title: 'Navigation Simplification',
        scenario:
          'When designing site navigation with many sections or features',
        example:
          'Limit top-level navigation to 5-7 items; group related items under clear categories with mega-menus that reveal sub-items on demand',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Pricing Page Design',
        scenario: 'When presenting subscription plans or pricing options',
        example:
          'Offer 3 tiers (Starter, Pro, Enterprise) with a "Recommended" badge, instead of 6+ plans with overlapping features',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Product Catalog Filtering',
        scenario: 'When displaying large product inventories to users',
        example:
          'Provide smart filters, "Top Picks" sections, and curated collections instead of showing 500 products in an unfiltered grid',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Settings and Configuration',
        scenario: 'When users need to configure preferences or app settings',
        example:
          'Show essential settings upfront with an "Advanced" toggle for power users, rather than a single page with 50 options',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Flows',
        scenario: 'When new users need to set up their account or workspace',
        example:
          'Ask one question at a time in a step-by-step wizard rather than presenting a form with 15 fields simultaneously',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Recommendations',
        scenario: 'When suggesting content, products, or actions to users',
        example:
          'Show a "Top 10 for You" list instead of an algorithmically generated feed of 100+ items',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Expert/Power User Interfaces',
        reason:
          'Experts need access to the full range of options and resent artificial constraints',
        consequence:
          'Power users feel patronized, lose efficiency, and switch to more flexible tools',
        alternative:
          'Provide progressive disclosure: simple defaults for novices with easy access to full option sets for experts',
      },
      {
        title: 'High-Stakes, Considered Decisions',
        reason:
          'When consequences are significant, users need to see and compare all options to feel confident',
        consequence:
          'Hiding options in high-stakes contexts can lead to suboptimal decisions and liability',
        alternative:
          'Present all options but provide structured comparison tools, filtering, and decision aids',
      },
      {
        title: 'Exploratory Browsing',
        reason:
          'Some users genuinely enjoy browsing and discovering new options',
        consequence:
          'Over-constraining options removes the pleasure of exploration and serendipity',
        alternative:
          'Offer curated "starting points" but allow users to expand and explore freely',
      },
      {
        title: 'Regulatory or Compliance Contexts',
        reason:
          'Legal requirements may mandate that all options be presented clearly and equally',
        consequence:
          'Hiding options can violate disclosure requirements and create legal liability',
        alternative:
          'Present all required options in an organized, categorized layout with clear labels',
      },
    ],

    commonMistakes: [
      {
        title: 'Offering Every Feature as a Top-Level Option',
        description:
          'Putting every feature, setting, or action in the main navigation or dashboard simultaneously',
        why: 'Flat information architecture overwhelms users with choices before they understand the product',
        fix: 'Use progressive disclosure: surface the 5-7 most-used features prominently and nest the rest under clear categories',
      },
      {
        title: 'Providing Filters Without Defaults',
        description:
          'Showing a large catalog with filter options but no pre-applied defaults or recommendations',
        why: 'Users still face the full set initially; filters only help those who already know what they want',
        fix: 'Pre-apply intelligent defaults (e.g., "Most Popular", "Recommended for You") and let users adjust from there',
      },
      {
        title: 'Too Many Similar Options',
        description:
          'Listing options that are nearly identical with subtle differences (e.g., 12 pricing plans differing by one feature)',
        why: 'Subtle distinctions increase comparison difficulty without adding meaningful choice value',
        fix: 'Consolidate similar options into distinct tiers with clear, differentiated value propositions',
      },
      {
        title: 'Removing Options Instead of Organizing Them',
        description:
          'Aggressively cutting options to reduce overload, losing genuinely valuable choices',
        why: 'The goal is not fewer options but better-structured options; removing useful choices harms users',
        fix: 'Organize options hierarchically, use tabs or categories, and apply progressive disclosure rather than elimination',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines how many options are visible simultaneously and how they are grouped',
        examples: [
          'Grid layouts showing 50+ items create visual overwhelm; curated rows of 4-6 reduce it',
          'Card-based layouts with clear grouping help users process options in manageable chunks',
          'Sidebar filters + content area pattern lets users progressively narrow options',
          'Tab-based layouts hide option groups until requested, reducing cognitive load',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy helps users scan and triage options quickly',
        examples: [
          'Clear headings and category labels help users skip irrelevant option groups',
          'Bold recommended options draw attention to curated choices',
          'Consistent formatting across options enables faster comparison',
          'Small text on secondary details prevents information overload in comparison views',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color can highlight recommended options and create visual grouping to reduce perceived complexity',
        examples: [
          'Highlighting the "Recommended" plan with accent color draws the eye and simplifies choice',
          'Color-coded categories help users quickly identify relevant option groups',
          'Muted colors on less popular options reduce their visual weight and simplify scanning',
          'Consistent color for "selected" state provides clear feedback on current choice',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how users navigate, filter, and narrow down options',
        examples: [
          'Search-as-you-type reduces a large catalog to relevant results in real time',
          'Progressive disclosure reveals additional options only when users request them',
          'Smart defaults pre-select the most common option, reducing required decisions',
          'Comparison mode lets users evaluate 2-3 options side-by-side instead of scanning all',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy determines how options are described, differentiated, and recommended',
        examples: [
          '"Best for..." labels on options help users self-select without comparing everything',
          'Feature comparison tables with checkmarks simplify cross-option evaluation',
          'Curated "Staff Picks" or "Most Popular" sections reduce the effective option set',
          'Clear category names and descriptions help users skip irrelevant groups entirely',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Choice overload is amplified for users with cognitive disabilities, who may have reduced working memory',
        examples: [
          'Screen reader users navigating 50+ options in a flat list face severe cognitive load',
          'Proper ARIA landmarks and heading structure let assistive tech users jump between option groups',
          'Keyboard-navigable filter controls help users narrow options without mouse interaction',
          'Clear focus indicators and logical tab order reduce disorientation in large option sets',
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
        title: 'Netflix "Top 10" Curated Row',
        description:
          'Netflix surfaces a "Top 10 in Your Country" row that reduces thousands of titles to a manageable, ranked shortlist',
        code: `<section class="content-row">
  <h2>Top 10 in Your Country Today</h2>
  <div class="top-10-carousel">
    <div class="top-10-item">
      <span class="rank">1</span>
      <img src="show-1.jpg" alt="Breaking Point">
    </div>
    <div class="top-10-item">
      <span class="rank">2</span>
      <img src="show-2.jpg" alt="The Return">
    </div>
    <div class="top-10-item">
      <span class="rank">3</span>
      <img src="show-3.jpg" alt="Night Shift">
    </div>
    <!-- ... items 4-10 -->
  </div>
  <p class="subtext">Updated daily based on viewing activity</p>
</section>`,
        explanation:
          'By curating thousands of titles into a ranked Top 10, Netflix dramatically reduces choice overload. The ranking provides a clear decision heuristic (popularity), and the small set is easily scanned and compared.',
        principle:
          'Curation and ranking transform an overwhelming catalog into a manageable, actionable set',
        metrics: {
          before: '65% of users browsed for 10+ minutes before selecting a title',
          after: '40% of users selected from Top 10 within 2 minutes',
          improvement: '38% reduction in browse-to-play time',
        },
      },
      {
        title: 'Apple Limited Product Line',
        description:
          'Apple offers just 4 iPhone models (base, Plus, Pro, Pro Max) instead of dozens of SKUs',
        code: `<section class="product-lineup">
  <h2>iPhone Lineup</h2>
  <div class="product-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
    <div class="product-card">
      <img src="iphone-base.jpg" alt="iPhone 16">
      <h3>iPhone 16</h3>
      <p class="tagline">A great iPhone for everyone</p>
      <p class="price">From $799</p>
    </div>
    <div class="product-card">
      <img src="iphone-plus.jpg" alt="iPhone 16 Plus">
      <h3>iPhone 16 Plus</h3>
      <p class="tagline">More screen. More battery.</p>
      <p class="price">From $899</p>
    </div>
    <div class="product-card highlighted">
      <span class="badge">Most Popular</span>
      <img src="iphone-pro.jpg" alt="iPhone 16 Pro">
      <h3>iPhone 16 Pro</h3>
      <p class="tagline">The ultimate iPhone.</p>
      <p class="price">From $999</p>
    </div>
    <div class="product-card">
      <img src="iphone-promax.jpg" alt="iPhone 16 Pro Max">
      <h3>iPhone 16 Pro Max</h3>
      <p class="tagline">Our biggest and best.</p>
      <p class="price">From $1199</p>
    </div>
  </div>
</section>`,
        explanation:
          'Apple deliberately limits the iPhone lineup to 4 clearly differentiated models. Each has a distinct value proposition (size, capability) so users can self-select based on 1-2 criteria rather than comparing dozens of specs across many models.',
        principle:
          'Fewer, clearly differentiated options enable faster, more confident decisions',
      },
      {
        title: 'Basecamp Simple Pricing',
        description:
          'Basecamp offers one plan at one price, eliminating pricing comparison entirely',
        code: `<section class="pricing">
  <h2>One plan. One price. Everything included.</h2>
  <div class="pricing-card">
    <div class="price">
      <span class="amount">$99</span>
      <span class="period">/month, flat</span>
    </div>
    <ul class="features">
      <li>Unlimited users</li>
      <li>Unlimited projects</li>
      <li>500 GB storage</li>
      <li>All features included</li>
    </ul>
    <button class="primary">Start your free trial</button>
    <p class="note">No per-user fees. No feature gates. No surprises.</p>
  </div>
</section>`,
        explanation:
          'By offering a single plan, Basecamp completely eliminates pricing choice overload. Users never wonder which plan is right for them, never compare feature matrices, and never worry about outgrowing their tier.',
        principle:
          'The ultimate solution to choice overload is removing the choice entirely when one option serves all',
        metrics: {
          before: '(Industry avg) 3.2% pricing page conversion with multi-tier plans',
          after: '5.8% pricing page conversion with single-plan pricing',
          improvement: '81% higher conversion rate than industry average',
        },
      },
      {
        title: 'Amazon Filtered Search with Recommendations',
        description:
          'Amazon uses progressive filtering and "Amazon\'s Choice" badges to narrow millions of products',
        code: `<div class="search-results-layout">
  <aside class="filter-sidebar">
    <h3>Narrow Results</h3>
    <div class="filter-group">
      <h4>Customer Rating</h4>
      <label><input type="radio" name="rating" checked> 4 Stars & Up</label>
    </div>
    <div class="filter-group">
      <h4>Price</h4>
      <label><input type="radio" name="price"> Under $25</label>
      <label><input type="radio" name="price" checked> $25 to $50</label>
    </div>
    <div class="filter-group">
      <h4>Prime Eligible</h4>
      <label><input type="checkbox" checked> Free Shipping</label>
    </div>
  </aside>
  <main class="results">
    <div class="product featured">
      <span class="badge amazons-choice">Amazon's Choice</span>
      <h4>Wireless Bluetooth Headphones</h4>
      <div class="rating">4.5 stars (12,847 ratings)</div>
      <p class="price">$34.99</p>
    </div>
    <!-- Additional filtered results -->
  </main>
</div>`,
        explanation:
          'Amazon transforms millions of products into a manageable list through layered filtering, smart defaults (4+ stars, Prime eligible), and the "Amazon\'s Choice" badge that highlights one recommendation. Users narrow options progressively rather than facing the full catalog.',
        principle:
          'Progressive filtering with curated recommendations lets users control their own choice reduction',
      },
    ],

    bad: [
      {
        title: 'Mega-Menu with 100+ Items',
        description:
          'Navigation mega-menu displaying every page and feature in a single dropdown',
        code: `<!-- DON'T DO THIS -->
<nav class="mega-menu">
  <div class="menu-column">
    <h4>Products</h4>
    <a href="#">Product A</a>
    <a href="#">Product B</a>
    <a href="#">Product C</a>
    <a href="#">Product D</a>
    <a href="#">Product E</a>
    <a href="#">Product F</a>
    <a href="#">Product G</a>
    <a href="#">Product H</a>
    <!-- 15 more links -->
  </div>
  <div class="menu-column">
    <h4>Solutions</h4>
    <a href="#">By Industry</a>
    <a href="#">By Team Size</a>
    <a href="#">By Use Case</a>
    <!-- 12 more links -->
  </div>
  <div class="menu-column">
    <h4>Resources</h4>
    <!-- 20 more links -->
  </div>
  <div class="menu-column">
    <h4>Company</h4>
    <!-- 15 more links -->
  </div>
  <!-- 3 more columns -->
</nav>`,
        explanation:
          'Exposing 100+ navigation links simultaneously overwhelms users. Most will scan frantically, fail to find what they need, and either bounce or use search instead. The mega-menu defeats its own purpose of aiding navigation.',
        principle:
          'Navigation should reduce decisions, not present every possible destination at once',
      },
      {
        title: '20+ Pricing Plans',
        description:
          'SaaS pricing page with too many tiers that blur together',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-table">
  <div class="plan"><h3>Solo</h3><p>$5/mo</p></div>
  <div class="plan"><h3>Solo Plus</h3><p>$8/mo</p></div>
  <div class="plan"><h3>Starter</h3><p>$12/mo</p></div>
  <div class="plan"><h3>Starter Plus</h3><p>$15/mo</p></div>
  <div class="plan"><h3>Basic</h3><p>$19/mo</p></div>
  <div class="plan"><h3>Basic Plus</h3><p>$25/mo</p></div>
  <div class="plan"><h3>Standard</h3><p>$35/mo</p></div>
  <div class="plan"><h3>Standard Plus</h3><p>$45/mo</p></div>
  <div class="plan"><h3>Pro</h3><p>$59/mo</p></div>
  <div class="plan"><h3>Pro Plus</h3><p>$79/mo</p></div>
  <div class="plan"><h3>Business</h3><p>$99/mo</p></div>
  <div class="plan"><h3>Business Plus</h3><p>$149/mo</p></div>
  <!-- ...and more -->
</div>`,
        explanation:
          'With 12+ plans that differ only slightly, users cannot meaningfully compare options. The "Plus" variants suggest marginal differences that increase comparison difficulty without adding decision clarity. Most users will leave without choosing.',
        principle:
          'More pricing tiers does not mean more conversions — it means more confusion and abandonment',
      },
      {
        title: 'Unfiltered Product Catalog',
        description:
          'E-commerce page showing all products in an endless, unsorted grid with no filtering',
        code: `<!-- DON'T DO THIS -->
<div class="product-grid">
  <p class="results-count">Showing all 2,847 products</p>
  <!-- No filters, no sorting, no categories, no recommendations -->
  <div class="product">Widget A - $12.99</div>
  <div class="product">Widget B - $45.00</div>
  <div class="product">Widget C - $8.50</div>
  <div class="product">Widget D - $199.99</div>
  <!-- ... 2,843 more products in random order -->
  <button class="load-more">Load More Products</button>
</div>`,
        explanation:
          'Dumping 2,847 products into an unfiltered grid with no categories, sorting, or recommendations is the purest form of choice overload. Users have no way to narrow options, no heuristics to guide selection, and no reason to believe any specific product is right for them.',
        principle:
          'An unstructured catalog is not a feature — it is an abdication of design responsibility',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iPhone Product Line',
        url: 'https://www.apple.com/iphone/',
        description:
          'Apple deliberately limits iPhone options to 4 clearly differentiated models (base, Plus, Pro, Pro Max). Each has a distinct size and capability profile, making self-selection straightforward.',
        effectiveness: 'very-effective',
        analysis:
          'Apple\'s constrained lineup avoids the "paradox of choice" that plagues competitors with 20+ models. Users choose based on 1-2 clear dimensions (screen size, camera quality) rather than comparing pages of specs. This simplicity contributes to Apple\'s industry-leading conversion rates.',
      },
      {
        company: 'Netflix',
        product: 'Curated Content Rows',
        url: 'https://www.netflix.com',
        description:
          'Netflix organizes thousands of titles into themed rows of 6-10 items ("Trending Now", "Because You Watched...", "Top 10"). Users browse curated subsets rather than the full catalog.',
        effectiveness: 'very-effective',
        analysis:
          'Netflix transforms a library of 15,000+ titles into manageable browsing by using algorithmic curation and row-based progressive disclosure. Each row is a small, thematic choice set. This dramatically reduces browse time and increases engagement compared to grid-based catalogs.',
      },
      {
        company: 'Amazon',
        product: 'Search Filtering + Amazon\'s Choice',
        url: 'https://www.amazon.com',
        description:
          'Amazon combines layered filters (price, rating, Prime, brand) with editorial badges ("Amazon\'s Choice", "Best Seller") to help users narrow millions of products to a handful of strong candidates.',
        effectiveness: 'very-effective',
        analysis:
          'Amazon\'s approach acknowledges that large catalogs are inevitable but manageable through progressive filtering. The "Amazon\'s Choice" badge provides a powerful heuristic for users who just want a good option without extensive comparison. This dual strategy serves both browsers and decisive buyers.',
      },
      {
        company: 'Iyengar & Lepper (Research)',
        product: 'Draeger\'s Jam Study',
        description:
          'The landmark 2000 study at a grocery store showed that a display of 6 jams converted at 30% while a display of 24 jams converted at only 3%, despite the larger display attracting more initial attention.',
        effectiveness: 'very-effective',
        analysis:
          'This foundational research demonstrates that more options attract attention but fewer options drive action. The 10x conversion difference has been replicated across domains (retirement plans, chocolate, essay topics) and remains the most-cited evidence for choice overload in design.',
      },
    ],

    abTests: [
      {
        title: 'Pricing Tiers: 3 Plans vs 8 Plans',
        hypothesis:
          'Reducing pricing options from 8 tiers to 3 clearly differentiated tiers will increase conversions',
        controlVersion: {
          description:
            'Pricing page with 8 plans: Free, Solo, Starter, Basic, Pro, Business, Enterprise, Custom — each differing by 1-2 features',
          metrics: {
            conversionRate: '2.1%',
            timeOnPage: '4:32',
            bounceRate: '68%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page with 3 plans: Starter ($19), Pro ($49, "Most Popular"), Enterprise (Contact Us) — each with clear, distinct value propositions',
          metrics: {
            conversionRate: '5.7%',
            timeOnPage: '1:48',
            bounceRate: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Reducing from 8 to 3 plans increased conversions by 171%. Users spent 60% less time on the page (less deliberation) and bounced 40% less often. The "Most Popular" badge on the Pro plan captured 72% of signups, confirming that recommendation heuristics help resolve choice.',
          learnings: [
            'Fewer pricing tiers with clear differentiation dramatically outperform many similar tiers',
            'Time-on-page decreased because users made faster, more confident decisions',
            'A "Recommended" or "Most Popular" badge provides a powerful decision heuristic',
            'Revenue per visitor increased despite offering fewer options',
          ],
        },
      },
      {
        title: 'Product Catalog: Full Grid vs Curated + Filters',
        hypothesis:
          'Showing curated "Top Picks" with progressive filters will outperform showing all products in a flat grid',
        controlVersion: {
          description:
            'Category page showing all 450 products in an alphabetical grid with basic sort options',
          metrics: {
            conversionRate: '1.8%',
            timeOnPage: '6:15',
            scrollDepth: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Category page with "Staff Picks" (5 items) at top, followed by filtered product grid with smart defaults (highest-rated, in-stock)',
          metrics: {
            conversionRate: '4.3%',
            timeOnPage: '3:42',
            scrollDepth: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Curated recommendations with progressive filtering increased conversions by 139%. Users engaged more deeply (higher scroll depth) but spent less total time, indicating more efficient decision-making rather than aimless browsing.',
          learnings: [
            'A curated "top picks" section provides an anchor point that reduces overwhelm',
            'Pre-applied smart filters (highest rated, in stock) reduce the effective option set immediately',
            'Users scrolled further because the organized layout felt navigable rather than overwhelming',
            'The combination of curation + filtering serves both decisive and exploratory users',
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
        name: 'Excessive Option Count',
        description:
          'More than 7-9 options visible simultaneously at the same hierarchy level (plans, products, menu items)',
        howToSpot:
          'Count the number of options visible without scrolling at each decision point. Flag anything above Miller\'s 7±2 threshold.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Dense Navigation Menus',
        description:
          'Navigation dropdowns or mega-menus with 20+ links visible at once',
        howToSpot:
          'Open all navigation menus and count total visible links. Check if items are grouped with clear headings or presented as flat lists.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Recommendation Signals',
        description:
          'Large option sets with no "Recommended", "Popular", or "Best for..." labels to guide selection',
        howToSpot:
          'Look for the absence of badges, highlights, or editorial guidance among groups of similar options.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Absence of Filtering Controls',
        description:
          'Large catalogs or lists displayed without filter, sort, or search functionality',
        howToSpot:
          'Check if product grids, list views, or settings pages with 10+ items have filtering, sorting, or search controls available.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Undifferentiated Options',
        description:
          'Multiple options that look nearly identical in presentation, price, or features',
        howToSpot:
          'Compare adjacent options: if the difference between them is hard to articulate in one sentence, they are insufficiently differentiated.',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Flat Option List Pattern',
        description: 'Many options presented at the same hierarchy level without grouping or progressive disclosure',
        indicators: [
          'More than 10 items in a single-level list or grid',
          'No category headings or grouping',
          'No "show more" or pagination controls',
          'All options given equal visual weight',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Feature Matrix Overload Pattern',
        description: 'Comparison tables with so many rows and columns that meaningful comparison is impossible',
        indicators: [
          'Comparison tables with 5+ columns (plans/products)',
          'More than 15 feature rows in a comparison table',
          'Minimal visual differentiation between columns',
          'No clear "recommended" column',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Curation Pattern',
        description: 'Large content sets displayed without algorithmic or editorial curation',
        indicators: [
          'No "Top Picks", "Recommended", or "Popular" sections',
          'Default sort is alphabetical or random rather than relevance-based',
          'No personalization or contextual recommendations',
          'Equal prominence given to all items regardless of quality or relevance',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Deep Navigation Pattern',
        description: 'Navigation that requires many clicks through option-heavy menus to reach content',
        indicators: [
          'More than 3 levels of navigation depth',
          'Each level presents 10+ options',
          'No search or shortcut functionality',
          'Breadcrumbs needed for orientation',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many options are visible at each decision point without scrolling?',
      'Can a user identify the right option within 5 seconds, or do they need extended comparison?',
      'Are there "Recommended", "Most Popular", or "Best for..." labels to guide decisions?',
      'Do large option sets have filtering, sorting, or search functionality?',
      'Are options clearly differentiated, or do they blur together?',
      'Is progressive disclosure used to reveal complexity gradually?',
      'Are smart defaults provided that work for the majority of users?',
      'Does the navigation expose more than 7 top-level items?',
      'Are pricing plans limited to 3-4 clearly distinct tiers?',
      'Is there a curated or recommended section within large catalogs?',
      'Does the design consider how choice overload affects users with cognitive disabilities?',
      'Are options organized hierarchically rather than presented in a flat list?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in choice overload (the paradox of choice).

Analyze the provided design for choice overload patterns. Identify:

1. **Option Count**: How many options are presented at each decision point
2. **Differentiation**: How clearly options are distinguished from each other
3. **Curation**: Whether recommendations, defaults, or highlights guide users
4. **Progressive Disclosure**: Whether complexity is revealed gradually
5. **Filtering**: Whether tools exist for users to narrow options

For each pattern found:
- Count the visible options at the decision point
- Assess whether the number exceeds cognitive capacity (7±2)
- Determine if sufficient decision aids exist (recommendations, filters, defaults)
- Evaluate the differentiation between options
- Suggest specific improvements for reducing overload

Consider:
- Is the design presenting too many options simultaneously?
- Are options clearly differentiated or do they blur together?
- Are there smart defaults or recommendations to guide decisions?
- Do filtering and sorting tools help users narrow the option set?
- Is progressive disclosure used to manage complexity?
- Are users with cognitive disabilities especially impacted?

Provide actionable recommendations for reducing choice overload while preserving user autonomy.`,

    outputSchema: {
      type: 'object',
      properties: {
        choicePoints: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location: { type: 'string' },
              optionCount: { type: 'number' },
              exceedsThreshold: { type: 'boolean' },
              differentiation: { type: 'string' },
              hasCuration: { type: 'boolean' },
              hasFiltering: { type: 'boolean' },
              hasDefaults: { type: 'boolean' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'location',
              'optionCount',
              'exceedsThreshold',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            optionDensity: { type: 'number' },
            curationScore: { type: 'number' },
            filteringScore: { type: 'number' },
            progressiveDisclosureScore: { type: 'number' },
            overallOverloadRisk: { type: 'number' },
          },
          required: [
            'optionDensity',
            'curationScore',
            'filteringScore',
            'overallOverloadRisk',
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
        'choicePoints',
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
        title: 'Audit Option Counts at Every Decision Point',
        description:
          'Map every place in the interface where users must choose among options, and count the visible options at each point',
        example:
          'Navigation has 12 top-level items, pricing page has 6 plans, settings page has 45 options — all flagged as overloaded',
        tips: [
          'Walk through every user flow and note each decision point',
          'Count options visible without scrolling or expanding menus',
          'Flag any decision point with more than 7 options at the same level',
        ],
      },
      {
        step: 2,
        title: 'Apply Miller\'s 7±2 Threshold',
        description:
          'Reduce simultaneous options to 5-9 at each decision level, using grouping, hierarchy, or progressive disclosure for the rest',
        example:
          'Reduce 12 navigation items to 6 top-level categories, each containing 3-5 sub-items revealed on hover',
        tips: [
          'Group related options under clear category labels',
          'Use tabs, accordions, or "show more" to hide secondary options',
          'Aim for 3-5 options at critical decision points (pricing, plans)',
        ],
      },
      {
        step: 3,
        title: 'Add Smart Defaults and Recommendations',
        description:
          'Pre-select the most common or appropriate option, and highlight recommended choices with badges or visual emphasis',
        example:
          'Pre-select "Pro" plan with "Most Popular" badge; pre-apply "Highest Rated" sort on product catalog',
        tips: [
          'Use analytics data to identify the most commonly chosen option',
          'Add "Recommended", "Most Popular", or "Best Value" labels',
          'Set default values that work for 80% of users',
        ],
      },
      {
        step: 4,
        title: 'Implement Progressive Disclosure',
        description:
          'Show essential options first and reveal advanced or secondary options only when users request them',
        example:
          'Show 5 common settings on the main page; place 30 advanced settings behind an "Advanced Options" toggle',
        tips: [
          'Identify which options 80% of users need vs. which 20% of power users need',
          'Use expandable sections, "Advanced" toggles, or multi-step flows',
          'Never hide options that are required for a task — only optional or advanced ones',
        ],
      },
      {
        step: 5,
        title: 'Build Filtering and Sorting Systems',
        description:
          'For large catalogs, provide intuitive filter and sort controls so users can narrow options to a manageable set',
        example:
          'Sidebar filters for price range, rating, category, and availability; sort by relevance, price, or popularity',
        tips: [
          'Pre-apply smart filter defaults (e.g., in-stock, highest-rated)',
          'Show the number of results that match each filter option',
          'Allow users to combine multiple filters',
          'Include a search bar for users who know exactly what they want',
        ],
      },
      {
        step: 6,
        title: 'Differentiate Options Clearly',
        description:
          'Ensure each option has a distinct, easily articulated value proposition so users can quickly self-select',
        example:
          'Instead of "Basic" and "Basic Plus" (unclear difference), use "Solo" ($19, 1 user) and "Team" ($49, up to 10 users)',
        tips: [
          'Each option should be describable in one sentence',
          'Use "Best for..." labels to help users self-identify',
          'Eliminate options that differ only marginally',
          'Test with users: "Can you explain the difference between these options?"',
        ],
      },
    ],

    dos: [
      'Limit simultaneous options to 5-9 items at each decision level (Miller\'s 7±2)',
      'Provide "Recommended" or "Most Popular" labels to guide undecided users',
      'Use progressive disclosure to reveal advanced options only when needed',
      'Offer smart defaults that work for the majority of users',
      'Build filtering and sorting for large catalogs or option sets',
      'Differentiate options clearly with distinct names and value propositions',
      'Use "Best for..." labels to help users self-select',
      'Test with real users to verify that option counts feel manageable',
      'Provide a search function as an escape hatch for users who know what they want',
      'Group related options under clear category headings',
    ],

    donts: [
      'Don\'t expose more than 7-9 options at a single decision point without grouping',
      'Don\'t create pricing plans that differ by only one or two minor features',
      'Don\'t show an unfiltered, unsorted catalog of hundreds of items',
      'Don\'t treat mega-menus with 100+ links as effective navigation',
      'Don\'t assume more options is always better — measure conversion, not catalog size',
      'Don\'t remove genuinely useful options; organize them instead',
      'Don\'t force users to compare more than 3-4 options side-by-side',
      'Don\'t present all settings on a single page without grouping or prioritization',
      'Don\'t rely on users to discover filtering tools — make them prominent',
      'Don\'t give every option equal visual weight — highlight what matters most',
    ],

    bestPractices: [
      {
        title: 'The Rule of Three for Pricing',
        description:
          'Offer exactly 3 pricing tiers: entry, recommended, and premium',
        rationale:
          'Three options provide enough choice without overload. The middle "recommended" option benefits from the compromise effect (users prefer the middle of 3 options).',
        example:
          'Starter ($19), Pro ($49, "Most Popular"), Enterprise (custom pricing)',
      },
      {
        title: 'Curated Entry Points',
        description:
          'Always provide a curated subset (Top 10, Staff Picks, Recommended) as an entry point to large catalogs',
        rationale:
          'Curated lists give overwhelmed users a manageable starting point and a decision heuristic (expert recommendation)',
        example:
          'Netflix "Top 10 in Your Country", Amazon "Amazon\'s Choice", App Store "Editor\'s Choice"',
      },
      {
        title: 'Progressive Disclosure for Settings',
        description:
          'Show essential settings immediately; hide advanced options behind expandable sections',
        rationale:
          'Most users need only a handful of settings. Showing everything at once overwhelms novices without helping experts (who already know what to find).',
        example:
          'Gmail shows 5 common settings, with "See all settings" linking to the full 100+ options organized by category',
      },
      {
        title: 'Smart Defaults Everywhere',
        description:
          'Pre-select the most common or recommended option at every choice point',
        rationale:
          'Defaults reduce cognitive load to zero for the majority of users who are well-served by the common option. Those who need something different can change it.',
        example:
          'Shipping: "Standard (3-5 days)" pre-selected. Plan: "Pro" pre-selected with "Most Popular" badge.',
      },
      {
        title: 'Decision Simplification Through "Best For" Labels',
        description:
          'Add contextual labels that help users self-select without detailed comparison',
        rationale:
          'Users often know their needs ("I\'m a solo freelancer") but struggle to map needs to options. "Best for..." labels bridge this gap instantly.',
        example:
          '"Starter — Best for individuals", "Pro — Best for growing teams", "Enterprise — Best for 100+ employees"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.4.1',
        guideline:
          'Bypass Blocks — Provide mechanisms to skip repeated navigation with many options',
        implementation:
          'Add "Skip to main content" links so keyboard and screen reader users can bypass large navigation menus that would otherwise require tabbing through dozens of links.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Group related options with proper semantic structure',
        implementation:
          'Use fieldset/legend for option groups, proper heading hierarchy for categories, and ARIA landmarks to help assistive technology users navigate option sets efficiently.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Provide clear headings that help users understand and skip option groups',
        implementation:
          'Label each group of options with descriptive headings. Use aria-describedby to associate "Recommended" labels with the options they describe.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions — Provide guidance for complex choice sets',
        implementation:
          'When users face multiple options, provide clear instructions ("Choose the plan that best fits your team size") and contextual help for each option.',
      },
    ],

    ethics: [
      {
        concern: 'Artificial Limitation',
        severity: 'medium',
        explanation:
          'Deliberately hiding useful options to push users toward a specific (often more expensive) choice',
        mitigation:
          'Ensure all options remain accessible through navigation or search. Progressive disclosure should simplify, not restrict. Users must be able to find and select any option they need.',
      },
      {
        concern: 'Manipulative Defaults',
        severity: 'high',
        explanation:
          'Setting defaults to the most profitable option rather than the one that best serves the user',
        mitigation:
          'Choose defaults based on what is genuinely best for the majority of users, not what generates the most revenue. If the default is the most expensive plan, justify it transparently.',
      },
      {
        concern: 'Dark Pattern: Confirmshaming',
        severity: 'critical',
        explanation:
          'Making the option to decline or choose less manipulative ("No, I don\'t want to save money") to exploit choice overload fatigue',
        mitigation:
          'Present all options neutrally. Never use guilt, shame, or misleading language to steer fatigued users toward a specific choice.',
      },
      {
        concern: 'Vulnerable User Exploitation',
        severity: 'high',
        explanation:
          'Users with cognitive disabilities, elderly users, or stressed users are disproportionately affected by choice overload',
        mitigation:
          'Design for the most overloaded user first. If the interface works for someone with reduced cognitive capacity, it will work well for everyone.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'When Choice is Demotivating: Can One Desire Too Much of a Good Thing?',
        author: 'Iyengar, S. S., & Lepper, M. R.',
        year: 2000,
        doi: '10.1037/0022-3514.79.6.995',
        description:
          'The foundational "jam study" paper demonstrating that extensive choice can be demotivating, reducing purchase likelihood and satisfaction',
        type: 'foundational',
      },
      {
        title: 'Choice Overload: A Conceptual Review and Meta-Analysis',
        author: 'Chernev, A., Böckenholt, U., & Goodman, J.',
        year: 2015,
        doi: '10.1016/j.jcps.2014.08.002',
        description:
          'Meta-analysis identifying four key moderators of choice overload: choice set complexity, decision task difficulty, preference uncertainty, and decision goal',
        type: 'advanced',
      },
      {
        title: 'Can There Ever Be Too Many Options? A Meta-Analytic Review of Choice Overload',
        author: 'Scheibehenne, B., Greifeneder, R., & Todd, P. M.',
        year: 2010,
        doi: '10.1016/j.jcr.2010.05.004',
        description:
          'Critical meta-analysis finding that choice overload effects depend on moderating factors and are not universal',
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
          'The definitive popular treatment of choice overload, arguing that abundance of choice undermines well-being and decision quality',
        type: 'foundational',
      },
      {
        title: 'The Art of Choosing',
        author: 'Iyengar, Sheena',
        year: 2010,
        isbn: '9780446504102',
        description:
          'By the researcher who conducted the jam study: explores how culture, context, and design shape how we make choices',
        type: 'foundational',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Covers choice architecture and how defaults, option structure, and presentation can guide better decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Paradox of Choice in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/simplicity-vs-choice/',
        description:
          'Practical guide to managing choice overload in user interface design with real-world examples',
        type: 'practical',
      },
      {
        title: 'Hick\'s Law: Making the Choice Easier for Users',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/hick-s-law-making-the-choice-easier-for-users',
        description:
          'Explains the relationship between choice count and decision time, with design applications',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Barry Schwartz (TED Talk)',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'Barry Schwartz\'s influential TED talk on why more choice leads to less happiness and more paralysis',
        type: 'foundational',
      },
      {
        title: 'How to Make Choosing Easier',
        author: 'Sheena Iyengar (TED Talk)',
        url: 'https://www.ted.com/talks/sheena_iyengar_how_to_make_choosing_easier',
        description:
          'The jam study researcher presents four techniques for simplifying choice: cut, concretize, categorize, condition for complexity',
        type: 'practical',
      },
    ],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'social-proof',        // "Most Popular" labels help resolve choice overload
      'anchoring-bias',      // Anchoring to a recommended option reduces effective options
      'default-effect',      // Smart defaults bypass choice overload entirely
      'loss-aversion',       // Fear of choosing wrong amplifies paralysis
    ],

    conflicts: [
      'mere-exposure-effect', // Familiarity from browsing many options can counteract overload
    ],

    confusedWith: [
      'decision-fatigue',    // Related but distinct: fatigue from sequential decisions vs overload from simultaneous options
      'analysis-paralysis',  // Broader concept that includes but isn't limited to choice overload
      'information-overload', // Similar but about data volume, not option count
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'decision-fatigue',
        'satisficing',
      ],
    },
  },
};
