/**
 * RECENCY EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const recencyEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'recency-effect',
    name: 'Recency Effect',
    aliases: ['Recency Bias'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'recent-information',
      'serial-position',
      'ordering',
      'recall',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Items presented last are better remembered and more influential in decisions.',

    detailed: `The Recency Effect is a cognitive bias where people tend to better remember and assign greater importance to information presented at the end of a sequence. This is the complement to the Primacy Effect - together they form the Serial Position Effect, creating a U-shaped memory curve where first and last items are remembered best, while middle items are often forgotten.

The recency effect occurs because the last items are still in working memory when recall is tested or decisions are made. They haven't yet been displaced by new information, giving them a temporary but powerful advantage.

In design, the recency effect influences which menu items users remember, which final impressions stick with them, which last-viewed products they consider, and which concluding statements shape their overall perception. Strategic placement of important information at the end can leverage this natural memory advantage.`,

    psychologyBasis: {
      discoveredBy: 'Hermann Ebbinghaus',
      year: 1885,
      theory: 'Serial Position Effect',
      mechanism: `The recency effect is driven by the persistence of recently encountered items in short-term (working) memory. This happens because:

1. **Working Memory Buffer**: The most recent items occupy active slots in working memory, making them immediately available for recall and judgment
2. **Temporal Proximity**: Items encountered last have had the least time to decay or be displaced by subsequent information
3. **Rehearsal Recency**: The last items are often still being actively rehearsed when a decision or recall is requested
4. **Interference Reduction**: Recent items suffer less retroactive interference because fewer items follow them
5. **Output Order**: People tend to recall the most recent items first, reinforcing their memory strength through early retrieval

The effect is strongest when recall occurs immediately after exposure, and diminishes with delay or distraction, unlike the primacy effect which persists over longer intervals.`,
    },

    realWorldExample: `When Ebbinghaus tested memory for lists of nonsense syllables, participants consistently recalled the last few items better than those in the middle - even when the syllables were equally meaningless. The recency effect was so strong that the final item was recalled as well as the first item (primacy effect), despite being encountered much later in the sequence.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Recency Effect profoundly shapes how users perceive, remember, and act on information in interfaces. The most recently presented items disproportionately influence decisions, evaluations, and recall. Designers can leverage this to:

- Place critical calls-to-action and key messages at the end of flows to maximize retention
- Design notification and feed ordering to highlight what matters most
- Shape user sentiment through carefully crafted final impressions
- Optimize "recently viewed" and "continue where you left off" patterns
- Structure onboarding and checkout flows so the last step reinforces commitment`,

    whenToUse: [
      {
        title: 'Recently Viewed Sections',
        scenario:
          'When helping users return to products or content they browsed recently',
        example:
          'Show a "Recently Viewed" carousel on the homepage so users can quickly resume their browsing journey',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Continue Watching / Reading',
        scenario: 'When users return to a content platform after a break',
        example:
          'Display the last-watched episode or last-read article prominently at the top of the home screen',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Recent Search Suggestions',
        scenario: 'When users tap the search bar and need quick access to prior queries',
        example:
          'Show recent search terms as chips below the search input, letting users repeat common searches with one tap',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Last-Edited Documents',
        scenario: 'When users open a productivity app and need to find their work',
        example:
          'Default the document list to "Recently Edited" sort order so users land on their most current work immediately',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Final Impression in Onboarding',
        scenario: 'When concluding an onboarding flow or setup wizard',
        example:
          'End the onboarding with a summary of value delivered and a clear, memorable next step that users will recall',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Balanced Review Displays',
        reason:
          'Showing only the most recent reviews can misrepresent overall product quality',
        consequence:
          'Users may form opinions based on a few recent reviews rather than the complete picture, leading to regret or distrust',
        alternative:
          'Show a mix of recent and top-rated reviews, with clear aggregate scores and date context',
      },
      {
        title: 'Analytics Dashboards',
        reason:
          'Defaulting to only the most recent time window can obscure long-term trends',
        consequence:
          'Users may overreact to short-term fluctuations, misinterpreting normal variance as a crisis or success',
        alternative:
          'Always show recent data alongside historical trends, averages, and benchmarks',
      },
      {
        title: 'Hiring and Evaluation Decisions',
        reason:
          'Recency bias causes evaluators to over-weight the last candidate or most recent performance',
        consequence:
          'Earlier candidates or consistent long-term performers are unfairly disadvantaged',
        alternative:
          'Use structured evaluation criteria, scoring rubrics, and deliberate review of all candidates before decisions',
      },
      {
        title: 'News and Information Feeds',
        reason:
          'Purely recency-ordered feeds can bury important ongoing stories under trivial new updates',
        consequence:
          'Users lose track of significant developments and form a fragmented understanding of events',
        alternative:
          'Blend recency with relevance, importance, and user interest signals in feed algorithms',
      },
    ],

    commonMistakes: [
      {
        title: 'Recency-Only Sorting Everywhere',
        description:
          'Defaulting every list, feed, and view to reverse-chronological order without considering relevance',
        why: 'Not all content is most useful when sorted by time; important items get buried as new ones arrive',
        fix: 'Offer sorting options and use smart defaults that balance recency with relevance and user behavior',
      },
      {
        title: 'Hiding Historical Context',
        description:
          'Showing only recent data points in dashboards and reports without trend lines or baselines',
        why: 'Recent data without historical context makes normal fluctuations seem like significant events',
        fix: 'Always pair recent metrics with historical averages, trend lines, and comparison periods',
      },
      {
        title: 'Over-Weighting Last Interaction',
        description:
          'Personalizing the entire experience based solely on the user\'s most recent action',
        why: 'A single recent action may not represent true preferences; it creates a filter bubble of recency',
        fix: 'Weight recent activity higher but blend with longer-term behavior patterns and stated preferences',
      },
      {
        title: 'Neglecting the Middle of Lists',
        description:
          'Placing important content in the middle of long lists where neither primacy nor recency helps recall',
        why: 'The serial position curve shows middle items are remembered least, creating a dead zone',
        fix: 'Place critical items at the beginning or end of sequences; chunk long lists to create multiple first/last positions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines which items appear last in the visual hierarchy, anchoring final impressions',
        examples: [
          'Bottom-of-page CTAs benefit from recency when users scroll through content',
          'Final items in card grids or carousels receive recency-boosted attention',
          'Footer navigation items are remembered better than mid-page links',
          'End-of-list items in dropdown menus are recalled more easily',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic emphasis on final or recent content amplifies the recency effect',
        examples: [
          'Bold timestamps ("Just now", "2 min ago") draw attention to recency',
          'Larger type on the most recent notification increases its salience',
          'Summary text at the end of articles reinforces final takeaways',
          'Date labels on recent items signal freshness and relevance',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding can visually distinguish recent items, strengthening recency-driven attention',
        examples: [
          'Blue "new" dots on recent notifications signal freshness',
          'Highlighted rows for recently updated table entries',
          'Fading older items to muted tones while keeping recent items vivid',
          'Color-coded timeline markers emphasizing the most recent period',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'The most recent interaction shapes the user\'s ongoing mental model and next action',
        examples: [
          'The last screen in a wizard determines overall impression of the flow',
          'Most recent error or success toast dominates the user\'s current mood',
          'Last-used feature becomes the mental default for "what this product does"',
          'Final step of checkout shapes post-purchase satisfaction or regret',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content ordering and recency signals shape which information users retain and act upon',
        examples: [
          '"Recently viewed" sections drive return visits and conversions',
          'Recent activity feeds anchor users to the latest state of a project',
          'Last paragraph of a product description often determines purchase intent',
          'Closing arguments in comparison pages sway final decisions',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen reader order and keyboard navigation sequence determine which items get recency advantage',
        examples: [
          'Screen reader users encounter items in DOM order; the last item read has the strongest recency effect',
          'Keyboard tab order places recency emphasis on the last focusable element',
          'ARIA live regions announcing recent updates create strong recency impressions',
          'Auto-scrolling to recent content may disorient users relying on assistive technology',
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
        title: 'Recently Viewed Products',
        description:
          'E-commerce site showing a carousel of recently browsed products on the homepage',
        code: `<section class="recently-viewed">
  <h2>Pick Up Where You Left Off</h2>
  <div class="product-carousel">
    <div class="product-card">
      <img src="headphones.jpg" alt="Wireless Headphones">
      <p class="name">Wireless Headphones</p>
      <p class="price">$79.99</p>
      <span class="viewed-time">Viewed 2 hours ago</span>
    </div>
    <div class="product-card">
      <img src="keyboard.jpg" alt="Mechanical Keyboard">
      <p class="name">Mechanical Keyboard</p>
      <p class="price">$129.99</p>
      <span class="viewed-time">Viewed yesterday</span>
    </div>
    <div class="product-card">
      <img src="monitor.jpg" alt="27-inch Monitor">
      <p class="name">27-inch Monitor</p>
      <p class="price">$349.99</p>
      <span class="viewed-time">Viewed 3 days ago</span>
    </div>
  </div>
</section>`,
        explanation:
          'Leverages the recency effect by surfacing items the user recently engaged with. These items are already in the user\'s consideration set and the recency cues ("2 hours ago") reinforce that these are relevant, active choices.',
        principle:
          'Recent interactions create mental shortcuts back to consideration and purchase intent',
        metrics: {
          before: '8% homepage-to-product conversion without recently viewed',
          after: '14% homepage-to-product conversion with recently viewed carousel',
          improvement: '75% increase in product page visits from homepage',
        },
      },
      {
        title: 'Recent Search Suggestions',
        description:
          'Search bar showing recent queries as quick-access suggestions',
        code: `<div class="search-container">
  <input type="search" placeholder="Search..." aria-label="Search">
  <div class="recent-searches" role="listbox" aria-label="Recent searches">
    <p class="section-label">Recent Searches</p>
    <button class="recent-query" role="option">
      <span class="icon">🕐</span>
      <span class="query">wireless headphones under $100</span>
    </button>
    <button class="recent-query" role="option">
      <span class="icon">🕐</span>
      <span class="query">mechanical keyboard cherry mx</span>
    </button>
    <button class="recent-query" role="option">
      <span class="icon">🕐</span>
      <span class="query">USB-C hub</span>
    </button>
    <a class="clear-link" href="#">Clear recent searches</a>
  </div>
</div>`,
        explanation:
          'Recent searches tap into the recency effect by showing queries the user is likely still thinking about. This reduces friction for repeat searches and acknowledges that recent intent is strong intent.',
        principle:
          'Recently expressed intent is the strongest predictor of current intent',
      },
      {
        title: 'Last-Edited Documents List',
        description:
          'Productivity app defaulting to recently edited documents on launch',
        code: `<section class="document-home">
  <h2>Recent Documents</h2>
  <div class="doc-list">
    <div class="doc-item active">
      <span class="doc-icon">📄</span>
      <div class="doc-info">
        <p class="doc-name">Q4 Marketing Strategy</p>
        <p class="doc-meta">Edited 5 minutes ago · You</p>
      </div>
      <span class="status-badge">In progress</span>
    </div>
    <div class="doc-item">
      <span class="doc-icon">📊</span>
      <div class="doc-info">
        <p class="doc-name">Revenue Dashboard</p>
        <p class="doc-meta">Edited 1 hour ago · Sarah</p>
      </div>
    </div>
    <div class="doc-item">
      <span class="doc-icon">📝</span>
      <div class="doc-info">
        <p class="doc-name">Sprint Retrospective Notes</p>
        <p class="doc-meta">Edited yesterday · Team</p>
      </div>
    </div>
  </div>
  <div class="sort-options">
    <button class="active">Recent</button>
    <button>Alphabetical</button>
    <button>Shared with me</button>
  </div>
</section>`,
        explanation:
          'Defaulting to recently edited documents matches the user\'s mental model: the document you need is almost always one you worked on recently. Relative timestamps reinforce recency and help users orient quickly.',
        principle:
          'Recent activity is the best default sort for productivity tools because current work is top-of-mind',
      },
    ],

    bad: [
      {
        title: 'Recency-Biased Reviews',
        description:
          'Product page showing only the most recent reviews, hiding older positive ones',
        code: `<!-- DON'T DO THIS -->
<section class="reviews">
  <h3>Customer Reviews</h3>
  <div class="review">
    <span class="stars">★★☆☆☆</span>
    <span class="date">2 days ago</span>
    <p>"Arrived with a scratch on the screen. Returning it."</p>
  </div>
  <div class="review">
    <span class="stars">★☆☆☆☆</span>
    <span class="date">3 days ago</span>
    <p>"Battery died after one week. Terrible quality."</p>
  </div>
  <div class="review">
    <span class="stars">★★★☆☆</span>
    <span class="date">5 days ago</span>
    <p>"It's okay but overpriced."</p>
  </div>
  <!-- 847 older 4-5 star reviews hidden below the fold -->
</section>`,
        explanation:
          'Showing only the most recent reviews creates a distorted picture. A product with 4.5 stars overall appears terrible because a few recent negative reviews dominate. Users make decisions based on recency, not the true distribution of opinions.',
        principle:
          'Recency-only sorting of reviews misrepresents overall quality and manipulates perception',
      },
      {
        title: 'Recency-Only Analytics Dashboard',
        description:
          'Dashboard showing only the last 24 hours with no historical context',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <h3>Performance Overview</h3>
  <div class="metric error">
    <span class="value">-23%</span>
    <span class="label">Revenue (last 24h)</span>
  </div>
  <div class="metric error">
    <span class="value">+340%</span>
    <span class="label">Error Rate (last 24h)</span>
  </div>
  <div class="metric warning">
    <span class="value">-15%</span>
    <span class="label">Active Users (last 24h)</span>
  </div>
  <p class="conclusion" style="color: red;">
    System performance is critically degraded!
  </p>
  <!-- No trend lines, no historical averages, no context -->
</div>`,
        explanation:
          'A 24-hour window without historical context exploits the recency effect to create panic. These numbers could be normal weekend variance, a holiday dip, or a one-time event. Without baselines and trends, users cannot distinguish anomalies from noise.',
        principle:
          'Recent data without historical context turns normal variance into false alarms',
      },
      {
        title: 'Personalization Based Only on Last Action',
        description:
          'Homepage completely reshaped by the user\'s single most recent click',
        code: `<!-- DON'T DO THIS -->
<!-- User clicked one cat video yesterday -->
<div class="homepage">
  <h2>Because You Love Cats!</h2>
  <div class="recommendations">
    <div class="card">Cat Compilation #47</div>
    <div class="card">Funny Cats 2024</div>
    <div class="card">Cat vs Cucumber</div>
    <div class="card">How to Train Your Cat</div>
    <div class="card">Cat Food Reviews</div>
    <div class="card">Cats Being Cats</div>
  </div>
  <!-- User's actual interests (cooking, coding, music) all gone -->
</div>`,
        explanation:
          'Over-weighting a single recent interaction to reshape the entire experience is a misuse of the recency effect. It creates a filter bubble, ignores the user\'s broader interests, and feels intrusive and inaccurate.',
        principle:
          'A single recent action does not define user identity; over-personalizing from recency destroys trust',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: 'Recently Viewed Items',
        url: 'https://www.amazon.com',
        description:
          'Amazon prominently displays a "Recently Viewed" carousel on the homepage and product pages, making it effortless for users to return to items they were considering. The section persists across sessions and devices.',
        effectiveness: 'very-effective',
        analysis:
          'Amazon leverages recency effect to reduce friction in the purchase funnel. Recently viewed items represent active purchase consideration, and surfacing them drives significant return-to-product and conversion rates.',
      },
      {
        company: 'Google',
        product: 'Recent Searches',
        url: 'https://www.google.com',
        description:
          'Google shows recent search queries as suggestions when users tap the search bar. Recent searches appear with a clock icon, distinct from trending or autocomplete suggestions.',
        effectiveness: 'very-effective',
        analysis:
          'Recent searches are among the highest-converting suggestions because they represent expressed intent. Google capitalizes on recency to reduce typing effort and accelerate repeat search behavior.',
      },
      {
        company: 'Netflix',
        product: 'Continue Watching',
        url: 'https://www.netflix.com',
        description:
          'Netflix places "Continue Watching" as the first or second row on the home screen, showing the exact episode and timestamp where the user left off. A progress bar shows how far through each title the user is.',
        effectiveness: 'very-effective',
        analysis:
          'Continue Watching exploits the recency effect and the Zeigarnik effect (unfinished tasks are remembered better). By making the most recent content the most accessible, Netflix maximizes session starts and content completion rates.',
      },
      {
        company: 'YouTube',
        product: 'Recent Videos in Recommendations',
        url: 'https://www.youtube.com',
        description:
          'YouTube weights recent watch history heavily in its recommendation algorithm. The home feed prominently features channels and topics the user engaged with most recently.',
        effectiveness: 'effective',
        analysis:
          'YouTube balances recency with broader interest signals. While recent views heavily influence recommendations, the algorithm also mixes in new discoveries to prevent filter bubbles. The "History" tab provides explicit recency-based access.',
      },
      {
        company: 'Spotify',
        product: 'Recently Played',
        url: 'https://www.spotify.com',
        description:
          'Spotify shows "Recently Played" as a prominent section on the home screen, displaying albums, playlists, and podcasts the user last listened to as quick-access cards.',
        effectiveness: 'very-effective',
        analysis:
          'Music listening is highly habitual and recency-driven. Spotify recognizes that users often want to resume or repeat recent listens, making "Recently Played" one of the most-tapped sections in the app.',
      },
    ],

    abTests: [
      {
        title: 'E-commerce Homepage - Recently Viewed vs No Recently Viewed',
        hypothesis:
          'Adding a recently viewed products section will increase return-to-product rate and conversions',
        controlVersion: {
          description:
            'Homepage showing only featured products, deals, and category navigation with no personalized recent history',
          metrics: {
            conversionRate: '2.1%',
            clickThroughRate: '18%',
            timeOnPage: '0:45',
          },
        },
        treatmentVersion: {
          description:
            'Homepage with "Recently Viewed" carousel as the second section, showing last 6 browsed products with timestamps and prices',
          metrics: {
            conversionRate: '3.4%',
            clickThroughRate: '31%',
            timeOnPage: '1:12',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The recently viewed section increased click-through by 72% and conversions by 62%. Users who engaged with the recently viewed section were 3x more likely to complete a purchase than those who browsed new products.',
          learnings: [
            'Recently viewed items represent the highest-intent product set on the homepage',
            'Relative timestamps ("2 hours ago") performed better than absolute dates',
            'Showing 4-6 recent items was optimal; more than 8 caused decision fatigue',
            'Including price in the recently viewed cards increased conversion vs image-only cards',
          ],
        },
      },
      {
        title: 'Review Sorting - Recent-First vs Relevance-Sorted',
        hypothesis:
          'Sorting reviews by relevance rather than recency will improve purchase confidence and reduce return rates',
        controlVersion: {
          description:
            'Product reviews sorted purely by date (most recent first), regardless of helpfulness or rating',
          metrics: {
            conversionRate: '5.8%',
            returnRate: '12%',
            reviewHelpfulVotes: '8%',
          },
        },
        treatmentVersion: {
          description:
            'Product reviews sorted by relevance (helpfulness votes, verified purchase, length) with a "Most Recent" tab available',
          metrics: {
            conversionRate: '7.2%',
            returnRate: '8%',
            reviewHelpfulVotes: '23%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Relevance-sorted reviews increased purchase confidence (24% higher conversion) and reduced returns by 33%. Users made better-informed decisions when they saw the most helpful reviews first rather than the most recent.',
          learnings: [
            'Recency-only review sorting over-weights recent outliers and misrepresents product quality',
            'Offering a "Most Recent" tab satisfied users who wanted freshness without making it the default',
            'Verified purchase badges on relevant reviews further boosted trust',
            'Combining recency signals within relevance sorting (showing review dates) gave users temporal context without recency bias dominating',
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
        name: 'Reverse-Chronological Ordering',
        description:
          'Content lists, feeds, or notifications sorted newest-first by default',
        howToSpot:
          'Check if the default sort order is by date (newest first) and whether alternative sort options are available',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Recency Labels and Timestamps',
        description:
          'Relative time labels such as "Just now", "2 min ago", "Recently updated" prominently displayed',
        howToSpot:
          'Look for time-relative language, clock icons, or "new" badges that emphasize how recently content appeared',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Recently Viewed / Accessed Sections',
        description:
          'Dedicated UI sections showing items the user recently interacted with',
        howToSpot:
          'Look for "Recently Viewed", "Continue Watching", "Recent Documents", or "Pick Up Where You Left Off" sections',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Last-Interaction Displays',
        description:
          'UI elements showing the user\'s most recent action, last visit, or last-used feature prominently',
        howToSpot:
          'Check for "Last edited by...", "Your last session", or auto-resuming to the last-visited page',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Real-Time Activity Feeds',
        description:
          'Live-updating streams of recent events, transactions, or notifications',
        howToSpot:
          'Look for auto-refreshing feeds, toast notifications, or streaming updates that push recent items to the top',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Recency-Default Sort Pattern',
        description: 'Lists and feeds default to reverse-chronological order, making the most recent items dominate attention',
        indicators: ['Default sort is "Newest first" or "Most recent"', 'No easy toggle to relevance or popularity sorting', 'Older but important items are pushed far down the list', 'Pagination or infinite scroll with no way to surface buried content'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Continue / Resume Pattern',
        description: 'UI prominently surfaces the user\'s last interaction point to encourage resumption',
        indicators: ['"Continue Watching" or "Continue Reading" sections', 'Progress bars on recently accessed items', 'Auto-navigation to the last-visited page on return', 'Draft or in-progress items shown before completed ones'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Recency-Weighted Recommendation Pattern',
        description: 'Recommendation algorithms heavily weight the most recent user actions over long-term preferences',
        indicators: ['Recommendations shift dramatically after a single interaction', 'Homepage completely changes based on last session', 'Suggestions closely mirror the most recent browse or search', 'Little diversity in recommendations after engaging with one topic'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Short Time Window Dashboard Pattern',
        description: 'Analytics or status dashboards default to very short time windows (24h, 7d) without historical comparison',
        indicators: ['Default view is "Last 24 hours" or "This week"', 'No trend lines, baselines, or historical averages shown', 'Metrics shown as absolute values without comparison periods', 'Alert thresholds based only on recent data'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Is the default sort order based on recency? Should it be?',
      'Are there "recently viewed" or "continue where you left off" sections?',
      'Do timestamps and recency labels draw disproportionate attention?',
      'Is historical context provided alongside recent data?',
      'Could the most recent items be misrepresenting the overall picture?',
      'Are recommendations over-indexed on the user\'s last interaction?',
      'Do dashboards show only recent windows without trend lines or baselines?',
      'Is there a way for users to switch between recency and relevance sorting?',
      'Are important items at risk of being buried by newer but less important content?',
      'Does the end of a flow or sequence place the most important message last for maximum retention?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the recency effect and serial position memory.

Analyze the provided design for recency effect patterns. Identify:

1. **Temporal Ordering**: How content is sorted - is recency the default? Is it appropriate?
2. **Recent Activity Surfaces**: "Recently viewed", "continue watching", "last edited" sections
3. **Time Labels and Signals**: Relative timestamps, "new" badges, freshness indicators
4. **Dashboard Time Windows**: Default time ranges for analytics and metrics
5. **Recommendation Recency**: How heavily recent behavior influences suggestions
6. **Sequence Endings**: What message or action appears last in flows, and is it the most important?

For each pattern found:
- Identify whether recency ordering serves or harms the user
- Assess if historical context is provided alongside recent data
- Determine if recency-biased displays could distort perception
- Evaluate whether users can override recency defaults
- Suggest improvements for balanced information presentation

Consider:
- Is recency-first sorting the best default for this context?
- Are users making decisions based on only the most recent information?
- Could important historical content be unfairly buried?
- Is the design exploiting recency bias or genuinely helping users?
- Are there accessibility concerns with auto-updating recent content?

Provide actionable recommendations for ethical, balanced use of recency.`,

    outputSchema: {
      type: 'object',
      properties: {
        recencyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              recencySignal: { type: 'string' },
              appropriateness: { type: 'string' },
              historicalContext: { type: 'boolean' },
              userOverride: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'recencySignal',
              'appropriateness',
              'historicalContext',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            recencyDominance: { type: 'number' },
            historicalBalance: { type: 'number' },
            sortingFlexibility: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'recencyDominance',
            'historicalBalance',
            'sortingFlexibility',
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
        'recencyPatterns',
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
        title: 'Audit Your Default Sort Orders',
        description:
          'Review every list, feed, and content display to determine whether recency is the appropriate default sorting method',
        example:
          'A product review section should default to "Most Helpful" not "Most Recent"; a document app should default to "Recently Edited"',
        tips: [
          'Recency is ideal for personal activity (recent docs, recent searches)',
          'Relevance is better for shared/social content (reviews, articles)',
          'Offer sort toggles so users can choose their preference',
        ],
      },
      {
        step: 2,
        title: 'Design "Recently Viewed" Sections Thoughtfully',
        description:
          'Create recently viewed or recently accessed sections that help users resume their journey without over-dominating the page',
        example:
          'Show 4-6 recently viewed products in a horizontal carousel with timestamps and prices, positioned after the hero section',
        tips: [
          'Limit to 4-8 recent items to avoid overwhelming the page',
          'Include relative timestamps to reinforce recency context',
          'Provide a "Clear history" option for user control',
        ],
      },
      {
        step: 3,
        title: 'Always Provide Historical Context',
        description:
          'When showing recent data or metrics, pair them with historical baselines, averages, and trend lines',
        example:
          'Dashboard shows "Revenue today: $12,400 (-23%)" alongside "30-day average: $13,200" and a trend line showing the week',
        tips: [
          'Show comparison periods (vs yesterday, vs last week, vs last month)',
          'Include trend lines alongside point-in-time metrics',
          'Mark when recent values are within normal variance',
        ],
      },
      {
        step: 4,
        title: 'Place Critical Messages at Sequence Ends',
        description:
          'Leverage the recency effect by placing the most important information at the end of flows, lists, and sequences',
        example:
          'End an onboarding flow with a memorable value statement and clear next action rather than a generic "You\'re all set!"',
        tips: [
          'The last screen of a wizard shapes overall impression of the experience',
          'Final confirmation messages should reinforce the value of the action taken',
          'Closing CTAs benefit from recency-boosted attention',
        ],
      },
      {
        step: 5,
        title: 'Balance Recency with Relevance in Algorithms',
        description:
          'Ensure recommendation and feed algorithms blend recency signals with broader relevance, popularity, and diversity',
        example:
          'Weight recent interactions at 40%, long-term preferences at 35%, and discovery/diversity at 25%',
        tips: [
          'Avoid reshaping the entire experience based on one recent click',
          'Mix familiar recent content with new discoveries',
          'Allow users to explicitly signal "not interested" to correct recency-driven recommendations',
        ],
      },
    ],

    dos: [
      'Use "recently viewed" sections to help users resume active consideration',
      'Provide relative timestamps to give users temporal context',
      'Pair recent data with historical baselines and trend lines in dashboards',
      'Place the most important message or CTA at the end of sequences',
      'Offer sorting options so users can choose between recency and relevance',
      'Design "continue where you left off" patterns for content and workflows',
      'Use recency signals (timestamps, new badges) to indicate freshness',
      'Chunk long lists to create multiple beginning and ending positions',
    ],

    donts: [
      'Don\'t default every list to recency sorting without considering if relevance is better',
      'Don\'t show only recent reviews while hiding the broader rating distribution',
      'Don\'t build dashboards that show only the last 24 hours without historical context',
      'Don\'t reshape the entire user experience based on a single recent interaction',
      'Don\'t bury important content in the middle of long sequences where it will be forgotten',
      'Don\'t use recency as the sole signal for recommendations or personalization',
      'Don\'t auto-refresh feeds so aggressively that users lose their place',
      'Don\'t exploit recency bias to create false urgency or panic from short-term data',
    ],

    bestPractices: [
      {
        title: 'Recency + Relevance Hybrid Sorting',
        description:
          'Blend recency with relevance signals for the default sort order in feeds, reviews, and recommendations',
        rationale:
          'Pure recency sorting surfaces noise; pure relevance ignores freshness. A hybrid approach serves users best.',
        example:
          'Sort reviews by a score combining helpfulness votes, recency, and verified-purchase status, with a "Most Recent" tab for users who want it',
      },
      {
        title: 'Historical Context for Every Metric',
        description:
          'Never show a recent metric in isolation; always include a comparison point and trend',
        rationale:
          'Isolated recent numbers trigger the recency effect, causing overreaction to normal variance',
        example:
          'Show "Error rate: 2.3% (last 24h) | 30-day avg: 2.1% | Status: Normal"',
      },
      {
        title: 'Leverage Sequence Endings',
        description:
          'Design the final step, final screen, or final message of any flow to carry the most important takeaway',
        rationale:
          'The recency effect ensures the last thing encountered is remembered best and shapes overall impression',
        example:
          'End a checkout flow with "You saved $47 today!" rather than a bland "Order confirmed"',
      },
      {
        title: 'Limit Recently Viewed to Actionable Items',
        description:
          'Show recently viewed items only when they drive a useful action (resume, purchase, continue)',
        rationale:
          'Recently viewed sections lose value when they show items the user already dismissed or completed',
        example:
          'Filter out purchased items and items explicitly dismissed from the recently viewed carousel',
      },
      {
        title: 'Respect User Agency Over Recency Defaults',
        description:
          'Always let users override recency-based sorting and recommendations with their preferred view',
        rationale:
          'Users who prefer alphabetical, relevance, or custom sorting should not be forced into recency-first views',
        example:
          'Remember the user\'s last-selected sort preference and apply it on return visits',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure that reverse-chronological DOM order matches the visual recency order',
        implementation:
          'Use proper DOM ordering so screen reader users encounter recent items first when that is the intended reading order. Do not rely on CSS alone to reorder visually.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Announce new items added to recent activity feeds without stealing focus',
        implementation:
          'Use ARIA live regions (aria-live="polite") to announce new recent items so screen reader users are informed without losing their place.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.2',
        guideline:
          'Pause, Stop, Hide - Allow users to pause auto-updating recent content feeds',
        implementation:
          'Provide a pause button for live-updating feeds and activity streams so users relying on assistive technology can read content without it changing.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label sections that use recency ordering',
        implementation:
          'Use descriptive headings like "Recently Viewed Products" or "Your Recent Searches" so all users understand the temporal ordering of content.',
      },
    ],

    ethics: [
      {
        concern: 'Recency-Distorted Reviews',
        severity: 'high',
        explanation:
          'Showing only recent reviews can misrepresent a product\'s overall quality, especially if a few recent negative reviews overshadow hundreds of positive ones',
        mitigation:
          'Default to relevance or helpfulness sorting for reviews. Show aggregate ratings prominently. Provide a "Most Recent" tab for freshness without making it the default.',
      },
      {
        concern: 'False Urgency from Short Time Windows',
        severity: 'high',
        explanation:
          'Dashboards showing only recent short-term data can create panic or false confidence by hiding broader trends',
        mitigation:
          'Always pair recent metrics with historical context, trend lines, and variance indicators. Label when fluctuations are within normal ranges.',
      },
      {
        concern: 'Recency-Driven Filter Bubbles',
        severity: 'medium',
        explanation:
          'Over-weighting recent interactions in recommendations creates filter bubbles where a single click reshapes the entire experience',
        mitigation:
          'Blend recency with long-term preferences and diversity signals. Let users easily correct misattributed interests.',
      },
      {
        concern: 'Exploitation of Last-Minute Decisions',
        severity: 'medium',
        explanation:
          'Placing manipulative upsells or dark patterns at the end of flows exploits the recency effect when users are most suggestible',
        mitigation:
          'Ensure end-of-flow messages are genuinely helpful (order summary, savings confirmation) rather than manipulative (surprise add-ons, guilt-based upsells).',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Serial Position Effect of Free Recall',
        author: 'Murdock, B. B.',
        year: 1962,
        doi: '10.1037/h0045106',
        description:
          'Foundational paper demonstrating the U-shaped serial position curve with both primacy and recency effects in free recall',
        type: 'foundational',
      },
      {
        title: 'Human Memory: A Proposed System and Its Control Processes',
        author: 'Atkinson, R. C., & Shiffrin, R. M.',
        year: 1968,
        description:
          'Landmark paper proposing the multi-store model of memory (sensory, short-term, long-term) that explains the recency effect through short-term memory buffer',
        type: 'foundational',
      },
      {
        title: 'Two Storage Mechanisms in Free Recall',
        author: 'Glanzer, M., & Cunitz, A. R.',
        year: 1966,
        doi: '10.1016/S0022-5371(66)80044-0',
        description:
          'Demonstrated that a delay with distraction eliminates the recency effect but not the primacy effect, supporting the dual-store memory model',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Memory: A Very Short Introduction',
        author: 'Baddeley, Alan',
        year: 2004,
        isbn: '9780192806758',
        description:
          'Accessible overview of memory research including detailed coverage of serial position effects and the recency effect',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers how recent information disproportionately influences judgment as part of System 1 thinking',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Practical guide to designing products that leverage recency and recent engagement to build habits',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Serial Position Effect and Its Impact on UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/serial-position-memory-effect/',
        description:
          'Practical guide to how primacy and recency effects influence navigation, menu design, and content ordering in interfaces',
        type: 'practical',
      },
      {
        title: 'The Serial Position Effect: Why ABC and XYZ Stand Out Most in a List',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/serial-position-effect',
        description:
          'Overview of serial position research with UX design applications for information architecture and content strategy',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Serial Position Effect Explained',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/watch?v=eU0FcYoRhEI',
        description:
          'Animated explanation of the serial position curve covering both primacy and recency effects with everyday examples',
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
      'primacy-effect',       // Together they form the serial position effect
      'availability-heuristic', // Recent items are more mentally available
      'peak-end-rule',        // The ending of an experience shapes overall evaluation
      'anchoring-bias',       // The last value seen can anchor subsequent judgments
    ],

    conflicts: [
      'primacy-effect',       // Primacy favors first items; recency favors last items
      'status-quo-bias',      // Preference for existing state resists recency-driven change
    ],

    confusedWith: [
      'availability-heuristic', // Both involve easily recalled info, but availability is about ease of recall broadly while recency is about temporal order
      'peak-end-rule',         // Related but peak-end weighs emotional peaks AND endings, not just the last item
      'primacy-effect',        // Opposite end of the serial position curve
    ],

    hierarchy: {
      parent: 'serial-position-effect',
      children: [
        'suffix-effect',       // Recency disruption by a final irrelevant item
      ],
    },
  },
};
