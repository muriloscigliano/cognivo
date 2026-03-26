/**
 * TIP OF THE TONGUE PHENOMENON
 *
 * We feel we know something but can't retrieve it from memory.
 * Partial recall with blocked full retrieval.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const tipOfTongue: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'tip-of-tongue',
    name: 'Tip of the Tongue',
    aliases: ['TOT State', 'Feeling of Knowing', 'Retrieval Failure', 'Presque Vu'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'retrieval',
      'recall',
      'search',
      'autocomplete',
      'recognition',
      'partial-knowledge',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'The feeling of knowing something but being temporarily unable to retrieve it from memory — partial recall with blocked full retrieval.',

    detailed: `The Tip of the Tongue (TOT) phenomenon is a memory retrieval state where a person is confident they know a piece of information but cannot fully recall it at that moment. The person may remember fragments — the first letter, the number of syllables, related words, or the "shape" of the answer — but the complete retrieval is blocked.

This is not a failure of storage but a failure of retrieval. The information exists in long-term memory but the pathway to access it is temporarily obstructed, often by competing associations or incomplete cue matching.

In UX and product design, the TOT phenomenon is directly relevant to search experiences, navigation, password recovery, content re-finding, and any interface where users need to locate something they know exists but cannot precisely specify. Designs that bridge the gap between partial knowledge and full retrieval dramatically reduce friction and frustration.`,

    psychologyBasis: {
      discoveredBy: 'Roger Brown and David McNeill',
      year: 1966,
      theory: 'Retrieval Failure Theory / Feeling of Knowing',
      mechanism: `The brain has stored the target information but cannot complete the retrieval path. This happens because:

1. **Partial Activation**: Related information is activated in the semantic network, but the target node doesn't reach full activation threshold
2. **Blocking**: A similar but incorrect item (a "blocker") occupies the retrieval pathway, preventing access to the correct answer
3. **Incomplete Cue Matching**: The cues available don't match the encoding context closely enough to trigger full recall
4. **Phonological Fragmentation**: Partial sound-based features (first letter, stress pattern, syllable count) are retrieved while the full phonological form is not
5. **Transmission Deficit**: The connection between semantic knowledge (meaning) and phonological representation (the word itself) weakens, especially with infrequent access`,
    },

    realWorldExample: `You're trying to remember the name of a restaurant you loved last year. You know it was Italian, on a corner, had a red awning, and the name started with "T" — but you simply cannot produce the full name. You might think of "Trattoria? No... Toscano? No..." Eventually someone says "Tortellini's" and you immediately recognize it. The information was there the entire time; you just couldn't complete the retrieval without the right cue.

This happens constantly in digital contexts: searching for a file you know you saved, trying to recall a password, looking for a product you saw last week, or attempting to navigate to a page you've visited before.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Tip of the Tongue phenomenon directly affects how users search, navigate, and re-find content in interfaces. Users frequently know what they want but cannot specify it precisely. Designers can bridge this retrieval gap by:

- Providing autocomplete and type-ahead suggestions that match partial input
- Showing recently viewed items and browsing history for re-finding
- Offering fuzzy search that tolerates imprecise queries
- Displaying smart suggestions based on partial or related cues
- Surfacing saved favorites and bookmarks for quick retrieval`,

    whenToUse: [
      {
        title: 'Search Autocomplete',
        scenario:
          'When users type partial search queries and need help completing their intent',
        example:
          'As users type "how to re..." show suggestions like "how to reset password", "how to return an item", "how to reactivate account"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Password Recovery',
        scenario: 'When users cannot recall their exact password but know fragments',
        example:
          'Show password hints, offer "Did you use your Google account?", or display masked email addresses to trigger recognition',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Recently Viewed Items',
        scenario: 'When users return to find something they previously browsed',
        example:
          'Display a "Recently Viewed" section showing products, articles, or pages the user visited in the last 30 days',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Smart Suggestions',
        scenario: 'When users struggle to articulate what they are looking for',
        example:
          'Offer "Did you mean...?" corrections and related category suggestions when a search returns few results',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Fuzzy Search',
        scenario: 'When users know roughly what something is called but misspell or only partially recall the name',
        example:
          'Match "photshop tutrial" to "Photoshop Tutorial" using edit-distance and phonetic similarity',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Saved Favorites and Bookmarks',
        scenario: 'When users want to return to content they previously marked as important',
        example:
          'Provide a Favorites or Saved Items section that persists across sessions, with search and filtering within saved items',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Security-Sensitive Inputs',
        reason:
          'Autocomplete on passwords or security codes can expose sensitive information',
        consequence:
          'Shoulder-surfing attacks or shared device exposure of credentials',
        alternative:
          'Use masked hints or identity verification flows instead of revealing partial credentials',
      },
      {
        title: 'Exploratory Discovery',
        reason:
          'Over-aggressive autocomplete can lock users into past patterns and prevent discovery of new content',
        consequence:
          'Filter bubble effect where users only see what they have seen before',
        alternative:
          'Balance recall-assistance with discovery features like "You might also like" or trending content',
      },
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Showing browsing history or recently viewed items may reveal private activity to other users on shared devices',
        consequence:
          'Embarrassment, privacy violations, or safety risks for users in sensitive situations',
        alternative:
          'Offer incognito modes, easy history clearing, and private browsing defaults on shared devices',
      },
      {
        title: 'High-Precision Inputs',
        reason:
          'In contexts requiring exact input (medical codes, legal references), fuzzy matching could lead to dangerous substitutions',
        consequence:
          'Incorrect medication, wrong legal citation, or data integrity issues',
        alternative:
          'Use structured input with validation rather than fuzzy matching for high-precision fields',
      },
    ],

    commonMistakes: [
      {
        title: 'Ignoring Partial Input',
        description:
          'Requiring exact matches in search, failing to help users who can only recall fragments',
        why: 'Users in a TOT state know what they want but cannot specify it precisely; exact-match search returns nothing useful',
        fix: 'Implement fuzzy matching, prefix search, phonetic matching, and synonym expansion',
      },
      {
        title: 'No Browsing History',
        description:
          'Not providing a way to re-find previously viewed content',
        why: 'Re-finding is one of the most common user tasks; without history, users must rely entirely on recall',
        fix: 'Maintain and surface browsing history, recently viewed items, and recently used features',
      },
      {
        title: 'Autocomplete Overload',
        description:
          'Showing too many autocomplete suggestions, overwhelming users instead of helping them',
        why: 'Excessive options create choice paralysis and make it harder to spot the correct item',
        fix: 'Limit suggestions to 5-8 high-confidence results, ranked by relevance and recency',
      },
      {
        title: 'No Graceful Degradation for Empty Results',
        description:
          'Showing a blank "no results found" page with no recovery options',
        why: 'Users in a TOT state need alternative paths to find what they are looking for, not dead ends',
        fix: 'Offer spelling corrections, related searches, category browsing, and popular items on zero-result pages',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how easily users can locate retrieval aids like search, history, and suggestions',
        examples: [
          'Persistent search bar placement enables quick partial-query entry',
          'Recently viewed sections placed prominently on return visits',
          'Suggestion dropdowns positioned directly below search input',
          'Browsing history accessible from main navigation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text formatting helps users recognize partial matches and distinguish suggestions',
        examples: [
          'Bold matching characters in autocomplete results',
          'Highlighting the matched portion of search suggestions',
          'Clear typography differentiating between exact and fuzzy matches',
          'Readable font sizes in suggestion dropdowns for quick scanning',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding helps users distinguish match types and confidence levels',
        examples: [
          'Highlighting matched text in suggestion results',
          'Using subtle color to differentiate exact vs fuzzy matches',
          'Color-coded categories in search suggestions',
          'Visual indicators for recently viewed vs new results',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how effectively the system bridges the gap between partial knowledge and full retrieval',
        examples: [
          'Type-ahead suggestions updating in real time as user types',
          'Click-to-refine interactions narrowing results progressively',
          '"Did you mean...?" corrections appearing immediately on submit',
          'Voice search allowing users to describe what they cannot name',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy determines what retrieval aids are available and how effective they are',
        examples: [
          'Rich metadata enabling search by partial attributes (color, size, category)',
          'Synonym dictionaries expanding queries to match user vocabulary',
          'Descriptive titles and tags making items findable by partial recall',
          'Contextual cues (thumbnails, descriptions) triggering recognition',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible retrieval aids ensure all users can bridge the gap between partial and full recall',
        examples: [
          'Screen reader announces autocomplete suggestions as they appear',
          'Keyboard navigation through suggestion lists without losing focus',
          'ARIA live regions for dynamic search results updates',
          'Voice input as alternative for users who cannot type their partial recall',
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
        title: 'Search Autocomplete with Partial Matching',
        description:
          'Search bar that helps users complete queries from partial input, matching fragments and correcting typos',
        code: `<div class="search-container">
  <label for="search" class="sr-only">Search</label>
  <input
    id="search"
    type="search"
    placeholder="Search products, brands, categories..."
    aria-expanded="true"
    aria-controls="suggestions"
    aria-activedescendant="suggestion-2"
    autocomplete="off"
  />
  <ul id="suggestions" role="listbox" aria-label="Search suggestions">
    <li role="option" id="suggestion-1">
      <span class="match">wire</span>less headphones
      <span class="category">Electronics</span>
    </li>
    <li role="option" id="suggestion-2" aria-selected="true">
      <span class="match">wire</span>less keyboard
      <span class="category">Accessories</span>
    </li>
    <li role="option" id="suggestion-3">
      <span class="match">wire</span> organizer
      <span class="category">Office</span>
    </li>
  </ul>
</div>`,
        explanation:
          'The user types "wire" — a partial fragment from memory. The autocomplete immediately surfaces matching products, highlighting the matched portion. The user recognizes their target without needing full recall.',
        principle:
          'Bridge partial recall to full retrieval by surfacing matches in real time',
        metrics: {
          before: '38% of partial queries returned zero results with exact match',
          after: '94% of partial queries surfaced the target item in top 5 suggestions',
          improvement: '147% increase in successful search completions',
        },
      },
      {
        title: 'Recently Viewed Items for Re-Finding',
        description:
          'Persistent section showing items the user previously browsed, enabling recognition-based retrieval',
        code: `<section class="recently-viewed" aria-label="Recently viewed items">
  <h2>Recently Viewed</h2>
  <div class="items-grid">
    <article class="item-card">
      <img src="headphones.jpg" alt="Sony WH-1000XM5 headphones">
      <h3>Sony WH-1000XM5</h3>
      <p class="price">$348</p>
      <time datetime="2026-03-18">Viewed 2 days ago</time>
    </article>
    <article class="item-card">
      <img src="keyboard.jpg" alt="Keychron K8 mechanical keyboard">
      <h3>Keychron K8</h3>
      <p class="price">$89</p>
      <time datetime="2026-03-15">Viewed 5 days ago</time>
    </article>
    <article class="item-card">
      <img src="monitor.jpg" alt="LG 27-inch 4K monitor">
      <h3>LG 27UK850</h3>
      <p class="price">$449</p>
      <time datetime="2026-03-10">Viewed 10 days ago</time>
    </article>
  </div>
  <a href="/history" class="view-all">View full browsing history</a>
</section>`,
        explanation:
          'Users often return to a site knowing they saw something interesting but unable to recall the exact product name. Thumbnails, product names, and timestamps all serve as recognition cues that bypass the need for recall.',
        principle:
          'Recognition is easier than recall — show previously viewed items to shortcut retrieval',
        metrics: {
          before: '12% of returning visitors found the item they came back for',
          after: '67% of returning visitors clicked a recently viewed item',
          improvement: '458% improvement in re-finding success rate',
        },
      },
      {
        title: 'Fuzzy Search with "Did You Mean?" Correction',
        description:
          'Search engine that handles misspellings and partial recall gracefully',
        code: `<div class="search-results" role="region" aria-label="Search results">
  <div class="correction-banner" role="status">
    <p>Showing results for <strong>"bluetooth speaker"</strong></p>
    <p>Search instead for <a href="?q=bluetoth+speeker">"bluetoth speeker"</a></p>
  </div>

  <p class="result-count">247 results</p>

  <ul class="results-list" aria-label="Search results for bluetooth speaker">
    <li class="result-item">
      <img src="speaker-1.jpg" alt="JBL Flip 6 portable speaker">
      <div class="result-details">
        <h3><a href="/product/jbl-flip-6">JBL Flip 6</a></h3>
        <p>Portable <mark>Bluetooth speaker</mark> with 12-hour battery</p>
      </div>
    </li>
  </ul>

  <aside class="related-searches" aria-label="Related searches">
    <h3>Related searches</h3>
    <ul>
      <li><a href="?q=waterproof+bluetooth+speaker">waterproof bluetooth speaker</a></li>
      <li><a href="?q=bluetooth+speaker+with+bass">bluetooth speaker with bass</a></li>
      <li><a href="?q=portable+speaker">portable speaker</a></li>
    </ul>
  </aside>
</div>`,
        explanation:
          'The user typed "bluetoth speeker" from imperfect memory. The system automatically corrects to the likely intent, shows results, and offers related searches as additional retrieval pathways. No dead end, no frustration.',
        principle:
          'Tolerate imprecision — users in TOT states produce approximate, not exact, queries',
      },
    ],

    bad: [
      {
        title: 'Exact-Match-Only Search',
        description:
          'Search that requires precise input and returns nothing for partial or misspelled queries',
        code: `<!-- DON'T DO THIS -->
<div class="search-results">
  <div class="empty-state">
    <h3>No results found for "bluetoth speeker"</h3>
    <p>Try a different search term.</p>
  </div>
</div>`,
        explanation:
          'Users in a TOT state cannot produce exact queries. An exact-match-only search punishes users for normal human memory behavior, offering no recovery path.',
        principle:
          'Never require perfect recall — always offer paths from partial knowledge to the target',
      },
      {
        title: 'No Browsing History or Recently Viewed',
        description:
          'An e-commerce site with no way to re-find previously viewed products',
        code: `<!-- DON'T DO THIS -->
<div class="homepage">
  <h2>Welcome Back!</h2>
  <p>Browse our categories to find what you need.</p>
  <nav class="categories">
    <a href="/electronics">Electronics (4,287 items)</a>
    <a href="/clothing">Clothing (12,430 items)</a>
    <a href="/home">Home & Garden (8,901 items)</a>
  </nav>
  <!-- No recently viewed, no history, no personalization -->
</div>`,
        explanation:
          'A returning user who remembers "that blue thing I looked at last week" must manually search through thousands of items. Without history or recently viewed sections, the user has no recognition-based shortcut.',
        principle:
          'Forcing recall when recognition cues are available wastes user effort and causes abandonment',
      },
      {
        title: 'Autocomplete Showing Irrelevant Suggestions',
        description:
          'Search autocomplete that shows popular terms instead of matching the user\'s partial input',
        code: `<!-- DON'T DO THIS -->
<div class="search-container">
  <input type="search" value="wire" />
  <ul class="suggestions">
    <li>Best sellers this week</li>
    <li>New arrivals</li>
    <li>Summer sale items</li>
    <li>Gift cards</li>
  </ul>
</div>`,
        explanation:
          'The user typed "wire" expecting to see wireless headphones, wire organizers, etc. Instead, the autocomplete ignores their input and shows generic promotional items, breaking the retrieval-assistance contract.',
        principle:
          'Autocomplete must respond to user input, not override it with promotional content',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Search Autocomplete',
        url: 'https://www.google.com',
        description:
          'Google autocomplete predicts queries from partial input, corrects spelling, and shows "Did you mean..." suggestions. It handles partial recall, typos, and vague queries, bridging the gap between what users partially remember and what they are looking for.',
        effectiveness: 'very-effective',
        analysis:
          'Google autocomplete is the gold standard for TOT-state resolution. It processes partial input in real time, uses query popularity and personal history to rank suggestions, and shows corrections inline. This turns partial knowledge into successful retrieval millions of times per day.',
      },
      {
        company: 'Apple',
        product: 'Password Hint System / Keychain',
        url: 'https://support.apple.com/en-us/HT204085',
        description:
          'Apple Keychain stores credentials and auto-fills them, while password hints provide retrieval cues. When users cannot recall a password, the system offers recognition-based alternatives: Face ID, Touch ID, or masked email addresses for account recovery.',
        effectiveness: 'very-effective',
        analysis:
          'By shifting authentication from recall (type your password) to recognition (is this your face?), Apple bypasses the TOT problem entirely. When recall is needed, hints and partial cues reduce retrieval friction.',
      },
      {
        company: 'Google',
        product: 'Chrome Browser History and Omnibox',
        url: 'https://www.google.com/chrome/',
        description:
          'Chrome\'s address bar searches both URLs and page titles from browsing history. Typing a fragment like "recipe chicken" surfaces previously visited recipe pages, matching against titles, URLs, and content.',
        effectiveness: 'effective',
        analysis:
          'The omnibox treats browsing history as a searchable knowledge base. Users can re-find pages using any fragment they remember — a word from the title, part of the URL, or a topic — making partial recall sufficient for retrieval.',
      },
      {
        company: 'Spotify',
        product: 'Recently Played and Search',
        url: 'https://www.spotify.com',
        description:
          'Spotify\'s "Recently Played" section shows albums, playlists, and podcasts the user accessed recently. The search supports partial song titles, artist name fragments, and even lyrics, helping users find music they cannot fully name.',
        effectiveness: 'very-effective',
        analysis:
          'Music is especially prone to TOT states — users often remember a melody or a few lyrics but not the title. Spotify addresses this with multi-attribute search (title, artist, lyrics, album) and prominent recently-played history.',
      },
    ],

    abTests: [
      {
        title: 'Autocomplete On vs Off for Product Search',
        hypothesis:
          'Autocomplete suggestions will increase search success rate for partial queries',
        controlVersion: {
          description:
            'Standard search box with no autocomplete — users must type full query and press Enter',
          metrics: {
            conversionRate: '24%',
            timeOnPage: '0:45',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'Search box with real-time autocomplete showing top 5 matching products, categories, and recent searches',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '0:22',
            scrollDepth: '65%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Autocomplete increased successful search completions by 71%. Users found products in half the time. The biggest improvement was for partial queries (3-5 characters) where users were in a TOT state and autocomplete resolved their retrieval block.',
          learnings: [
            'Partial queries (under 5 characters) benefited most from autocomplete',
            'Including recent searches in suggestions doubled re-finding success',
            'Category suggestions helped users who remembered the product type but not the name',
            'Thumbnails in autocomplete results triggered visual recognition',
          ],
        },
      },
      {
        title: 'Recently Viewed Section: Present vs Absent on Return Visit',
        hypothesis:
          'A recently viewed section will reduce time-to-purchase for returning visitors',
        controlVersion: {
          description:
            'Homepage showing generic featured products and categories on return visit',
          metrics: {
            conversionRate: '3.1%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Homepage showing "Pick up where you left off" with the last 6 products viewed, plus featured products below',
          metrics: {
            conversionRate: '7.4%',
            clickThroughRate: '42%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Returning visitors were 139% more likely to convert when shown recently viewed items. Click-through on recently viewed items was 42% vs 18% for generic featured products. Users who clicked a recently viewed item purchased 3.2x faster than those who re-searched.',
          learnings: [
            'Returning visitors overwhelmingly come back for something specific they saw before',
            'Visual thumbnails were the strongest recognition cue, more than product names',
            'Timestamps ("Viewed 2 days ago") helped users distinguish between items',
            'Limiting to 6 items avoided choice overload while covering most re-finding needs',
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
        name: 'Search Input with Suggestions',
        description:
          'Search bar with dropdown autocomplete suggestions appearing as user types',
        howToSpot:
          'Look for input fields with dropdown menus, type-ahead behavior, or suggestion lists that update dynamically',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Recently Viewed Section',
        description:
          'A dedicated area showing products, pages, or content the user has previously visited',
        howToSpot:
          'Look for sections labeled "Recently Viewed", "Continue Browsing", "Pick Up Where You Left Off", or "Your History"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Spelling Corrections',
        description:
          'Inline corrections or "Did you mean...?" prompts after submitting imprecise queries',
        howToSpot:
          'Look for correction banners above search results, underlined suggestions, or auto-corrected query display',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Saved Items and Favorites',
        description:
          'Bookmarks, favorites, wishlists, or saved collections that persist across sessions',
        howToSpot:
          'Look for heart icons, bookmark buttons, "Save for Later" links, or dedicated wishlist pages',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Related Searches and Suggestions',
        description:
          'Alternative query suggestions on results pages, especially zero-result pages',
        howToSpot:
          'Look for "Related searches", "People also searched for", or "Try searching for..." sections',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Progressive Retrieval Pattern',
        description: 'System helps users progressively narrow from vague input to specific target through iterative refinement',
        indicators: [
          'Autocomplete suggestions update with each keystroke',
          'Faceted filters narrow results progressively',
          'Category suggestions alongside text results',
          'Refinement prompts like "Did you mean...?"',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Recognition Over Recall Pattern',
        description: 'Interface shows options for users to recognize rather than requiring them to recall from memory',
        indicators: [
          'Visual thumbnails in search results and history',
          'Recently viewed items with images and descriptions',
          'Browse-by-category as alternative to search',
          'Visual grids instead of text-only lists',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Fuzzy Matching Pattern',
        description: 'Search system tolerates misspellings, partial input, and approximate queries',
        indicators: [
          'Results returned for misspelled queries',
          'Phonetic matching (sounds-like search)',
          'Synonym expansion in search results',
          'Partial string matching on product names',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Retrieval Cue Pattern',
        description: 'System provides contextual cues that help trigger full memory retrieval',
        indicators: [
          'Password hints on login forms',
          'Masked email addresses for account identification',
          'Contextual reminders ("You viewed this on March 15")',
          'Related items shown alongside search results',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the search support partial queries and fuzzy matching?',
      'Are autocomplete suggestions relevant and responsive to user input?',
      'Is there a "Recently Viewed" or browsing history feature for returning users?',
      'Does the system offer spelling corrections or "Did you mean...?" suggestions?',
      'Are zero-result pages providing alternative paths (related searches, categories)?',
      'Can users save items for later retrieval (favorites, bookmarks, wishlists)?',
      'Are visual thumbnails used to support recognition over recall?',
      'Does the password recovery flow provide adequate retrieval cues?',
      'Are search results enriched with enough context (images, descriptions, categories) to trigger recognition?',
      'Is browsing history accessible and searchable for re-finding content?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Tip of the Tongue phenomenon and memory retrieval.

Analyze the provided design for TOT-related patterns. Identify:

1. **Search & Retrieval**: How the system handles partial, imprecise, or fuzzy queries
2. **Recognition Aids**: Visual cues, thumbnails, and context that help users recognize items without full recall
3. **History & Re-finding**: How previously viewed or used content is surfaced for returning users
4. **Error Recovery**: How the system handles failed searches, typos, and imprecise input
5. **Retrieval Cues**: Hints, suggestions, and contextual information that bridge partial to full recall

For each pattern found:
- Identify how it supports or fails users in TOT states
- Assess whether partial input is handled gracefully
- Determine if recognition is prioritized over recall
- Evaluate the quality of zero-result and error recovery experiences
- Suggest improvements for better retrieval assistance

Consider:
- Can users find what they want with only partial knowledge of the name?
- Is browsing history / recently viewed accessible and useful?
- Does search autocomplete respond meaningfully to partial input?
- Are there dead ends where imprecise input leads to no recovery path?
- Is the system accessible to users who rely on voice or screen readers?

Provide actionable recommendations for reducing retrieval friction.`,

    outputSchema: {
      type: 'object',
      properties: {
        retrievalPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              retrievalSupport: { type: 'string' },
              partialInputHandling: { type: 'string' },
              recognitionVsRecall: { type: 'string' },
              effectiveness: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'retrievalSupport',
              'effectiveness',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            searchQuality: { type: 'number' },
            fuzzyMatchingScore: { type: 'number' },
            historyAndRefinding: { type: 'number' },
            errorRecovery: { type: 'number' },
          },
          required: [
            'searchQuality',
            'fuzzyMatchingScore',
            'historyAndRefinding',
            'errorRecovery',
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
        'retrievalPatterns',
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
        title: 'Implement Fuzzy Search',
        description:
          'Build search that tolerates misspellings, partial input, and approximate queries using edit distance, phonetic matching, and n-gram indexing',
        example:
          'Match "bluetoth speekr" to "bluetooth speaker" using Levenshtein distance and Soundex',
        tips: [
          'Use a combination of edit distance, prefix matching, and phonetic algorithms',
          'Index content with n-grams for efficient partial matching',
          'Set appropriate similarity thresholds — too loose creates noise, too strict misses valid queries',
        ],
      },
      {
        step: 2,
        title: 'Add Real-Time Autocomplete',
        description:
          'Show relevant suggestions as users type, updating with each keystroke to help complete partial queries',
        example:
          'After typing "wire", show "wireless headphones", "wireless keyboard", "wire organizer"',
        tips: [
          'Begin showing suggestions after 2-3 characters',
          'Limit to 5-8 suggestions to avoid overwhelming users',
          'Rank by relevance, popularity, and user history',
          'Highlight the matched portion of each suggestion',
        ],
      },
      {
        step: 3,
        title: 'Surface Recently Viewed Items',
        description:
          'Track and display items, pages, or content users have previously accessed to enable recognition-based re-finding',
        example:
          'Show "Recently Viewed" grid with thumbnails on homepage for returning visitors',
        tips: [
          'Use visual thumbnails — recognition is stronger with images than text',
          'Include timestamps to help users distinguish between visits',
          'Limit to 6-10 items to avoid overwhelming while covering most re-finding needs',
          'Respect privacy: offer easy clearing and incognito modes',
        ],
      },
      {
        step: 4,
        title: 'Design Zero-Result Recovery',
        description:
          'When search returns no results, provide alternative paths: corrections, related searches, category browsing',
        example:
          'Show "Did you mean bluetooth speaker?" with related categories and popular items',
        tips: [
          'Never show a dead-end empty state',
          'Offer spelling corrections prominently',
          'Suggest related or popular searches',
          'Provide category browsing as a fallback',
        ],
      },
      {
        step: 5,
        title: 'Enable Saving for Later',
        description:
          'Let users bookmark, favorite, or save items they might want to retrieve later',
        example:
          'Heart icon on product cards that saves to a persistent wishlist accessible across devices',
        tips: [
          'Make the save action available on every item',
          'Sync saved items across devices and sessions',
          'Provide search and filtering within saved items',
          'Send reminders for abandoned saved items',
        ],
      },
    ],

    dos: [
      'Implement fuzzy search that tolerates misspellings and partial input',
      'Show autocomplete suggestions that respond to user input in real time',
      'Display recently viewed items prominently for returning users',
      'Provide "Did you mean...?" corrections for imprecise queries',
      'Use visual thumbnails to leverage recognition over recall',
      'Offer multiple retrieval paths: search, browse, history, favorites',
      'Design helpful zero-result pages with alternative suggestions',
      'Highlight matched portions of text in autocomplete suggestions',
      'Include synonym and related-term expansion in search',
      'Support voice search for users who can describe but not type what they seek',
    ],

    donts: [
      'Don\'t require exact-match search queries',
      'Don\'t show empty "No results found" pages without recovery options',
      'Don\'t ignore browsing history — it\'s a critical retrieval aid',
      'Don\'t show autocomplete suggestions unrelated to user input',
      'Don\'t overwhelm with too many suggestions (keep to 5-8)',
      'Don\'t expose sensitive information (passwords, private history) in autocomplete',
      'Don\'t force users to remember exact file names, IDs, or URLs',
      'Don\'t rely solely on text — use images and visual cues for recognition',
      'Don\'t delete browsing history without user consent',
      'Don\'t ignore typos and misspellings in search input',
    ],

    bestPractices: [
      {
        title: 'Recognition Over Recall',
        description:
          'Show items for users to recognize rather than requiring them to recall from memory',
        rationale:
          'Recognition requires much lower cognitive load than recall; users can identify the correct item from a list far more easily than producing its name from scratch',
        example:
          'Show product thumbnails in search results and browsing history instead of text-only lists',
      },
      {
        title: 'Progressive Retrieval',
        description:
          'Help users narrow from vague input to precise target through iterative refinement',
        rationale:
          'TOT states resolve through cue accumulation — each partial match provides a new cue that brings the user closer to full retrieval',
        example:
          'As user types "wire", show categories (Electronics > Accessories) alongside product suggestions',
      },
      {
        title: 'Multi-Attribute Search',
        description:
          'Allow search across multiple attributes: name, category, description, color, brand, and other metadata',
        rationale:
          'Users in TOT states often remember attributes (it was blue, it was a Sony) rather than exact names',
        example:
          'Searching "blue sony" matches "Sony WH-1000XM5 - Midnight Blue"',
      },
      {
        title: 'Contextual Retrieval Cues',
        description:
          'Provide context alongside items to help trigger full memory: timestamps, categories, related items',
        rationale:
          'The more cues available, the more likely one will trigger the association needed for full retrieval',
        example:
          'Recently viewed items showing "Viewed on March 15, while browsing Headphones"',
      },
      {
        title: 'Graceful Degradation',
        description:
          'As query precision decreases, expand results rather than returning nothing',
        rationale:
          'A broad result set that includes the target is infinitely better than an empty result page',
        example:
          'If exact match fails, show fuzzy matches; if fuzzy fails, show category results; never show nothing',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Autocomplete suggestions must be semantically connected to the input',
        implementation:
          'Use aria-controls, aria-expanded, aria-activedescendant, and role="listbox" on autocomplete dropdowns so screen readers can navigate suggestions',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Search results and suggestions must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" regions to announce suggestion count updates and "Did you mean..." corrections without moving focus',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All autocomplete and suggestion interactions must be keyboard accessible',
        implementation:
          'Support arrow keys for navigating suggestions, Enter for selection, Escape for dismissal, and Tab for moving past the suggestions',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Highlighted match text in suggestions must meet contrast requirements',
        implementation:
          'Ensure bold or highlighted matched characters maintain at least 4.5:1 contrast ratio against their background',
      },
    ],

    ethics: [
      {
        concern: 'Privacy in Browsing History',
        severity: 'high',
        explanation:
          'Displaying browsing history or recently viewed items can expose private activity to other users on shared devices or in public settings',
        mitigation:
          'Offer incognito modes, easy history clearing, and auto-clear on shared devices. Never expose browsing history without user consent.',
      },
      {
        concern: 'Autocomplete Bias',
        severity: 'medium',
        explanation:
          'Autocomplete suggestions can reinforce filter bubbles, promote certain products unfairly, or surface harmful content',
        mitigation:
          'Audit suggestion algorithms for bias. Ensure paid placements are labeled. Filter harmful or misleading suggestions.',
      },
      {
        concern: 'Password and Credential Exposure',
        severity: 'critical',
        explanation:
          'Autocomplete or hint systems for passwords can inadvertently reveal credentials through partial display',
        mitigation:
          'Never display full or partially unmasked passwords. Use biometric or token-based authentication where possible. Mask all credential hints.',
      },
      {
        concern: 'Manipulation Through Suggestion Ordering',
        severity: 'medium',
        explanation:
          'Ranking sponsored or high-margin products higher in autocomplete can mislead users who trust suggestions as objective matches',
        mitigation:
          'Clearly label sponsored suggestions. Prioritize relevance to user input over commercial goals in suggestion ranking.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Tip of the Tongue Phenomenon',
        author: 'Brown, R., & McNeill, D.',
        year: 1966,
        doi: '10.1016/S0022-5371(66)80040-3',
        description:
          'The foundational paper that first systematically studied the tip-of-the-tongue state, demonstrating that people can recall partial features of blocked words',
        type: 'foundational',
      },
      {
        title: 'Tip-of-the-Tongue States: Phenomenology, Mechanism, and Lexical Retrieval',
        author: 'Schwartz, B. L.',
        year: 2002,
        description:
          'Comprehensive review of TOT research covering phenomenology, metacognitive mechanisms, and implications for models of lexical retrieval',
        type: 'foundational',
      },
      {
        title: 'Tip-of-the-Tongue States and Partial Phonological Retrieval',
        author: 'Brown, A. S.',
        year: 1991,
        doi: '10.3758/BF03202767',
        description:
          'Meta-analysis examining the nature of partial information available during TOT states, confirming retrieval of first letters, syllable counts, and stress patterns',
        type: 'advanced',
      },
      {
        title: 'The Feeling of Knowing: Some Metatheoretical Implications for Consciousness and Control',
        author: 'Koriat, A.',
        year: 2000,
        description:
          'Explores the metacognitive dimensions of the feeling of knowing and its relationship to memory monitoring and control processes',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Tip-of-the-Tongue States: Phenomenology, Mechanism, and Lexical Retrieval',
        author: 'Schwartz, Bennett L.',
        year: 2002,
        isbn: '9780805833102',
        description:
          'The definitive book on the tip-of-the-tongue phenomenon, covering decades of research on retrieval failure and partial recall',
        type: 'foundational',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Classic UX book emphasizing recognition over recall as a core design principle — directly applicable to TOT-state mitigation in interfaces',
        type: 'practical',
      },
      {
        title: 'Designing with the Mind in Mind',
        author: 'Johnson, Jeff',
        year: 2020,
        isbn: '9780128182024',
        description:
          'Covers cognitive psychology principles in UI design, including memory limitations and the importance of recognition-based interfaces',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Recognition Over Recall in User Interfaces',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/recognition-and-recall/',
        description:
          'Practical UX guide on designing for recognition rather than forcing recall, directly addressing TOT-state challenges',
        type: 'practical',
      },
      {
        title: 'Autocomplete Design Best Practices',
        author: 'Baymard Institute',
        url: 'https://baymard.com/blog/autocomplete-design',
        description:
          'Research-backed guidelines for designing autocomplete that effectively bridges partial recall to successful search',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Tip of the Tongue: Why Can\'t I Remember?',
        author: 'SciShow Psych',
        url: 'https://www.youtube.com/watch?v=MkSyXQhOr1g',
        description:
          'Accessible explanation of the cognitive mechanisms behind tip-of-the-tongue states',
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
      'recognition-over-recall',
      'serial-position-effect',
      'mere-exposure-effect',
      'spacing-effect',
    ],

    conflicts: [
      'information-overload',
    ],

    confusedWith: [
      'availability-heuristic',
      'recency-bias',
      'mere-exposure-effect',
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'feeling-of-knowing',
        'retrieval-failure',
      ],
    },
  },
};
