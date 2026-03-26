/**
 * GOOGLE EFFECT
 *
 * We forget information that's easily found online
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const googleEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'google-effect',
    name: 'Google Effect',
    aliases: ['Digital Amnesia', 'Google Amnesia'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory',
      'search',
      'information-retrieval',
      'external-memory',
      'digital-behavior',
      'knowledge-management',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We forget information that\'s easily found online',

    detailed: `The Google Effect (also called Digital Amnesia) is a cognitive bias where people are less likely to remember information that they believe can be easily retrieved from an external source, particularly the internet. Rather than encoding facts into long-term memory, the brain outsources storage to search engines, bookmarks, and digital tools.

This effect fundamentally changes how humans relate to knowledge. Instead of memorizing facts, people increasingly remember where and how to find information — treating the internet as a form of transactive memory, similar to how couples distribute memory tasks between partners.

In UX and product design, the Google Effect has profound implications for help systems, onboarding flows, documentation, tooltips, and any interface where users need to recall information. Designers must assume users will NOT remember instructions, and instead build systems that make information instantly findable when needed.`,

    psychologyBasis: {
      discoveredBy: 'Betsy Sparrow, Jenny Liu, and Daniel M. Wegner',
      year: 2011,
      theory: 'Transactive Memory Systems',
      mechanism: `The brain treats the internet as an external memory partner in a transactive memory system. This happens because:

1. **Encoding Offloading**: When people know information is searchable, the brain invests less effort encoding it into long-term memory
2. **Source Memory Shift**: People remember WHERE to find information (the search query, the website) rather than the information itself
3. **Cognitive Economy**: The brain conserves resources by not storing what can be cheaply retrieved — a rational adaptation to abundant external storage
4. **Retrieval Confidence**: High confidence in future retrieval (via search) reduces the perceived need for internal memorization
5. **Habitual Delegation**: Repeated offloading creates a feedback loop — the more we search, the more we default to searching over remembering

The mechanism is adaptive, not a failure. The brain is reallocating memory resources from storage to retrieval strategies, optimizing for an environment where external information is abundant and accessible.`,
    },

    realWorldExample: `In Sparrow, Liu & Wegner's 2011 experiments, participants who were told trivia facts would be saved to a computer remembered significantly fewer facts than those told the information would be erased. However, the "saved" group was better at remembering which folder the information was stored in. They remembered the location, not the content.

This mirrors everyday behavior: most people cannot recall phone numbers, addresses, or even close friends' birthdays — information they would have memorized a generation ago — because it is always a smartphone search away.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Google Effect fundamentally shapes how users interact with help systems, documentation, and information-dense interfaces. Since users outsource memory to search, designers must:

- Build robust, instantly accessible search and help systems
- Provide contextual tooltips and inline guidance rather than expecting recall
- Design for re-findability, not memorability
- Surface relevant information at the moment of need
- Reduce reliance on users remembering previous instructions or training`,

    whenToUse: [
      {
        title: 'Contextual Help Systems',
        scenario:
          'When users need to understand features or complete complex tasks',
        example:
          'Provide inline tooltips and "?" icons that surface help at the exact moment and location where the user needs it, rather than expecting them to remember a tutorial',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Searchable Knowledge Bases',
        scenario: 'When users need to find answers to questions about your product',
        example:
          'Build a robust search-first help center with autocomplete suggestions, so users can find answers as easily as they would Google a question',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Progressive Disclosure with Easy Retrieval',
        scenario: 'When introducing complex features over time',
        example:
          'Show a brief "Did you know?" nudge about an advanced feature, linking to full documentation that users can always re-find via search',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'In-App Guidance and Walkthroughs',
        scenario: 'When onboarding users to new features or workflows',
        example:
          'Offer re-triggerable walkthroughs that users can access anytime, not one-shot tutorials they must remember',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Smart Defaults and Autocomplete',
        scenario: 'When users need to input information they may not remember',
        example:
          'Auto-fill form fields with previously used values, recent selections, or intelligent suggestions so users do not need to recall exact inputs',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Safety-Critical Information',
        reason:
          'Users must internalize safety procedures that cannot rely on looking things up in an emergency',
        consequence:
          'Dangerous situations where users cannot recall critical safety steps because they assumed they could search later',
        alternative:
          'Use spaced repetition, quizzes, and confirmation checks to ensure safety knowledge is actually memorized',
      },
      {
        title: 'Offline or Low-Connectivity Contexts',
        reason:
          'If the search/help infrastructure is not available, users who depend on it are stranded',
        consequence:
          'Complete inability to complete tasks when external information sources are unavailable',
        alternative:
          'Provide offline-capable documentation and ensure critical information is embedded directly in the interface',
      },
      {
        title: 'Over-Reliance on Search as a Crutch',
        reason:
          'Making everything searchable can mask poor information architecture',
        consequence:
          'Users are forced to search for things that should be discoverable through clear navigation, increasing cognitive load',
        alternative:
          'Invest in clear information architecture and navigation first; search should supplement, not replace, good design',
      },
      {
        title: 'Security Credentials and Sensitive Data',
        reason:
          'Encouraging users to externalize passwords or sensitive information to searchable locations creates security risks',
        consequence:
          'Users store passwords in plain text notes, browser search history, or insecure locations',
        alternative:
          'Provide secure password managers, biometric authentication, and SSO to handle credential memory safely',
      },
    ],

    commonMistakes: [
      {
        title: 'One-Shot Tutorials with No Replay',
        description:
          'Showing an onboarding tutorial once and assuming users will remember every step',
        why: 'The Google Effect means users immediately forget instructions they believe they can re-find — but if there is no way to re-find them, the knowledge is simply lost',
        fix: 'Make all tutorials re-accessible from a help menu, and provide contextual reminders at the point of action',
      },
      {
        title: 'Burying Help Behind Complex Navigation',
        description:
          'Hiding documentation deep in a sitemap or behind multiple clicks',
        why: 'Users expect to find information as easily as a Google search. If your help system requires 5 clicks to reach, users will leave and search the web instead',
        fix: 'Implement global search with Cmd/Ctrl+K, contextual help links, and a flat help architecture',
      },
      {
        title: 'Assuming Users Read and Remember Documentation',
        description:
          'Writing comprehensive docs but expecting users to study them before using the product',
        why: 'Users do not read manuals. The Google Effect means they will try the interface first and search for help only when stuck',
        fix: 'Design interfaces that are self-explanatory, with inline help available at friction points',
      },
      {
        title: 'No Search in Help Centers',
        description:
          'Providing a knowledge base organized only by categories, without search functionality',
        why: 'Users conditioned by the Google Effect expect to type a question and get an answer. Category browsing feels slow and foreign',
        fix: 'Add full-text search with natural language support, autocomplete, and suggested articles',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how easily users can find and re-find information when they need it',
        examples: [
          'Persistent help icons and search bars in consistent locations reduce re-finding effort',
          'Contextual tooltip placement next to the element they describe enables just-in-time learning',
          'Sidebar documentation panels keep reference information visible during task execution',
          'Breadcrumbs and clear navigation help users retrace their steps to previously found information',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography affects scannability when users search for specific information',
        examples: [
          'Clear headings and subheadings make documentation scannable for quick re-finding',
          'Monospaced code blocks stand out as searchable, copyable reference material',
          'Bold keywords in help text enable rapid visual scanning for the relevant term',
          'Consistent label typography helps users recognize and locate controls they have used before',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding helps users locate types of information quickly',
        examples: [
          'Consistent color for help elements (e.g., blue for links, purple for tooltips) builds retrieval patterns',
          'Syntax highlighting in code examples makes documentation more scannable',
          'Warning colors (amber/red) on critical information signal "remember this, you cannot search for it later"',
          'Muted backgrounds on reference sections distinguish them from primary content',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users can retrieve information when they need it',
        examples: [
          'Cmd/Ctrl+K command palettes let users search for any action or help topic instantly',
          'Tooltip hover/focus interactions provide information without navigating away',
          'Expandable inline help keeps context while revealing detail',
          'Search-as-you-type with instant results mirrors the Google experience users expect',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy must account for the fact that users will not memorize instructions',
        examples: [
          'Short, self-contained help articles that answer one question each are more findable than monolithic docs',
          'FAQ formats match how users think about and search for information',
          'Step-by-step instructions at the point of action eliminate the need to remember sequences',
          'Searchable, tagged content ensures relevant articles surface for varied search queries',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible help systems ensure all users can leverage external memory equally',
        examples: [
          'Screen reader-compatible search and help systems allow non-visual users to re-find information',
          'Keyboard-navigable tooltips ensure keyboard users access the same contextual help as mouse users',
          'ARIA live regions announce search results and help content to assistive technology',
          'Clear focus management in help panels and modals ensures keyboard users can navigate help content',
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
        title: 'Searchable Help Center with Autocomplete',
        description:
          'Help center with prominent search bar, autocomplete suggestions, and instant results',
        code: `<div class="help-center">
  <h2>How can we help?</h2>
  <div class="search-wrapper">
    <input type="search" placeholder="Search for answers..."
           aria-label="Search help articles"
           autocomplete="off">
    <div class="autocomplete-suggestions" role="listbox">
      <div role="option" class="suggestion">
        <span class="icon">📄</span>
        <span class="title">How to reset your password</span>
        <span class="category">Account</span>
      </div>
      <div role="option" class="suggestion">
        <span class="icon">📄</span>
        <span class="title">How to export your data</span>
        <span class="category">Data</span>
      </div>
    </div>
  </div>
  <div class="popular-searches">
    <p>Popular: <a href="#">billing</a>, <a href="#">integrations</a>, <a href="#">API keys</a></p>
  </div>
</div>`,
        explanation:
          'This design embraces the Google Effect by making the help experience feel like a search engine. Users do not need to remember where information lives — they just type a question. Autocomplete reduces the effort further by predicting what they need.',
        principle:
          'Design for search-first information retrieval, not browse-first navigation',
        metrics: {
          before: '42% of users left the help center without finding an answer (browse-only)',
          after: '18% left without finding an answer (search + autocomplete)',
          improvement: '57% reduction in failed help center visits',
        },
      },
      {
        title: 'Contextual Tooltips at Point of Action',
        description:
          'Inline help tooltips that appear exactly where and when users need them',
        code: `<div class="form-field">
  <label for="api-key">API Key
    <button class="help-trigger" aria-label="What is an API key?"
            aria-describedby="api-help">
      <span class="icon">?</span>
    </button>
  </label>
  <input id="api-key" type="text" placeholder="sk-...">
  <div id="api-help" class="contextual-tooltip" role="tooltip">
    <p><strong>Your API key</strong> connects this app to your account.</p>
    <p>Find it in <a href="/settings/api">Settings → API</a>.</p>
    <p class="hint">Tip: Keys start with "sk-" and are 48 characters long.</p>
  </div>
</div>`,
        explanation:
          'Users do not need to remember what an API key is or where to find it. The tooltip provides the answer at the exact moment they encounter the field, eliminating the need to search externally.',
        principle:
          'Surface information at the moment of need, not the moment of learning',
      },
      {
        title: 'Re-Triggerable Onboarding Walkthrough',
        description:
          'Product tour that can be replayed anytime from a persistent help menu',
        code: `<nav class="help-menu" aria-label="Help and learning">
  <button class="help-button" aria-expanded="false" aria-controls="help-panel">
    <span class="icon">?</span>
    <span class="label">Help</span>
  </button>
  <div id="help-panel" class="help-panel" hidden>
    <div class="section">
      <h3>Getting Started</h3>
      <button class="tour-trigger" data-tour="dashboard">
        <span class="icon">▶</span> Dashboard walkthrough
      </button>
      <button class="tour-trigger" data-tour="reports">
        <span class="icon">▶</span> Creating your first report
      </button>
    </div>
    <div class="section">
      <h3>Quick Search</h3>
      <input type="search" placeholder="Search help...">
    </div>
    <p class="shortcut">Tip: Press <kbd>Ctrl</kbd>+<kbd>K</kbd> to search anytime</p>
  </div>
</nav>`,
        explanation:
          'Instead of showing a one-time tutorial that users immediately forget, this design provides a persistent help menu where walkthroughs can be replayed. Users can re-learn at their own pace, whenever they need to.',
        principle:
          'Make all learning materials permanently re-accessible, not ephemeral',
        metrics: {
          before: '23% of users completed key workflows after one-shot onboarding',
          after: '61% completed key workflows with re-triggerable guidance',
          improvement: '165% increase in successful task completion',
        },
      },
    ],

    bad: [
      {
        title: 'One-Shot Tutorial That Disappears Forever',
        description:
          'Onboarding tooltip sequence that cannot be replayed or re-found',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-overlay" data-show-once="true">
  <div class="tooltip" data-step="1">
    <p>Click here to create a new project.</p>
    <button class="next">Next (1/5)</button>
  </div>
  <div class="tooltip" data-step="5">
    <p>That's it! You're all set. Good luck!</p>
    <button class="dismiss">Got it!</button>
    <!-- No way to replay. No help menu. No documentation link. -->
  </div>
</div>`,
        explanation:
          'This tutorial fires once and disappears forever. The Google Effect guarantees users will forget these steps within minutes. Without a way to replay or search for this information, users are stranded when they need guidance later.',
        principle:
          'Never show information once and assume users will remember it',
      },
      {
        title: 'Help Center Without Search',
        description:
          'Documentation organized only by nested categories, with no search functionality',
        code: `<!-- DON'T DO THIS -->
<nav class="help-nav">
  <ul>
    <li>Getting Started
      <ul>
        <li>Account Setup
          <ul>
            <li>Email Verification</li>
            <li>Profile Configuration</li>
            <li>Team Invitations</li>
          </ul>
        </li>
        <li>First Steps
          <ul>
            <li>Creating a Project</li>
            <li>Adding Data Sources</li>
            <!-- 47 more nested items... -->
          </ul>
        </li>
      </ul>
    </li>
    <!-- No search bar anywhere -->
  </ul>
</nav>`,
        explanation:
          'Users conditioned by the Google Effect expect to type a question and get an answer. Forcing them to browse through deeply nested categories feels like using a library card catalog in the age of search engines. Most users will give up and search the web instead.',
        principle:
          'Category-only navigation ignores how modern users find information',
      },
      {
        title: 'Critical Instructions Shown Only During Setup',
        description:
          'Important configuration details displayed once during initial setup, never accessible again',
        code: `<!-- DON'T DO THIS -->
<div class="setup-wizard" data-step="3">
  <h3>Important: Save Your Recovery Key</h3>
  <code class="recovery-key">xK9m-2pLq-8vNf-4wRt</code>
  <p>Write this down! You'll need it if you lose access.</p>
  <p style="color: #999; font-size: 0.8rem;">
    This key will not be shown again for security reasons.
  </p>
  <button class="primary">I've saved it, continue</button>
</div>`,
        explanation:
          'Showing a critical recovery key once and never again fights against the Google Effect. Users will click "I\'ve saved it" without saving it, confident they can find it later — but they cannot. This leads to permanent account lockouts.',
        principle:
          'Do not assume users will preserve information just because you told them to',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Search',
        url: 'https://www.google.com',
        description:
          'Google Search is the canonical enabler of the Google Effect. Its instant, reliable retrieval has trained billions of users to outsource memory to search. The autocomplete, "People also ask" boxes, and featured snippets are all designed to make information retrieval faster than memory recall.',
        effectiveness: 'very-effective',
        analysis:
          'Google has made external information retrieval so effortless that it has literally changed how human memory works. The entire Google Effect is named after this product because it is the primary driver of the phenomenon.',
      },
      {
        company: 'Stack Overflow',
        product: 'Stack Overflow Q&A',
        url: 'https://stackoverflow.com',
        description:
          'Stack Overflow serves as external memory for developers worldwide. Rather than memorizing syntax, APIs, or algorithms, developers search Stack Overflow for answers they have found dozens of times before. The search-first, answer-ranked format makes re-finding trivial.',
        effectiveness: 'very-effective',
        analysis:
          'Stack Overflow embraces the Google Effect by design: questions are searchable, answers are ranked, and duplicate detection links related queries. Developers openly joke about "Stack Overflow-driven development" — a testament to how fully they have outsourced programming knowledge to search.',
      },
      {
        company: 'Notion',
        product: 'Notion Workspace',
        url: 'https://www.notion.so',
        description:
          'Notion functions as a searchable second brain for teams. Its universal search (Cmd+K), linked databases, and wiki structure let users externalize knowledge and retrieve it instantly, replacing the need to remember where information lives.',
        effectiveness: 'very-effective',
        analysis:
          'Notion succeeds by making information organization and retrieval frictionless. Users trust that anything stored in Notion is findable, which frees them from memorizing organizational details. The quick-search command palette is central to this experience.',
      },
      {
        company: 'Wikipedia',
        product: 'Wikipedia',
        url: 'https://www.wikipedia.org',
        description:
          'Wikipedia is one of the most common destinations for the Google Effect in action. Users look up the same facts repeatedly rather than memorizing them, relying on Wikipedia\'s consistent structure and search-engine discoverability.',
        effectiveness: 'effective',
        analysis:
          'Wikipedia\'s consistent page structure, cross-linking, and search engine prominence make it a reliable external memory store. Studies have shown that people remember "I can look this up on Wikipedia" more readily than the facts themselves.',
      },
    ],

    abTests: [
      {
        title: 'Help Center: Search-First vs Browse-First',
        hypothesis:
          'A prominent search bar will help users find answers faster than category-based browsing',
        controlVersion: {
          description:
            'Help center with category-based navigation: nested folders of articles organized by topic, no search bar visible on landing page',
          metrics: {
            conversionRate: '38%',
            timeOnPage: '4:12',
            bounceRate: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Help center with large search bar as primary interaction, autocomplete suggestions, and "Popular topics" below. Categories available but secondary.',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '1:48',
            bounceRate: '24%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Search-first help center nearly doubled the success rate of finding answers. Time on page dropped by 57%, indicating users found answers faster, not that they left sooner (bounce rate also dropped by 54%). Users behaved exactly as the Google Effect predicts: they wanted to type a question, not browse categories.',
          learnings: [
            'Users expect help centers to work like Google search',
            'Autocomplete suggestions significantly reduce time-to-answer',
            'Category navigation is useful as a secondary path but fails as primary',
            'Search query data reveals what users actually struggle with, enabling better content',
          ],
        },
      },
      {
        title: 'Onboarding: One-Shot Tutorial vs Re-Triggerable Guidance',
        hypothesis:
          'Allowing users to replay onboarding will improve feature adoption over one-time-only tutorials',
        controlVersion: {
          description:
            'Traditional tooltip-based onboarding tour shown once on first login, with "Don\'t show again" as default. No way to replay.',
          metrics: {
            conversionRate: '23%',
            timeOnPage: '2:30',
          },
        },
        treatmentVersion: {
          description:
            'Same tooltip tour on first login, but with a persistent "Help → Replay Tour" option in the main nav. Contextual "Learn more" links at each feature.',
          metrics: {
            conversionRate: '54%',
            timeOnPage: '5:45',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Re-triggerable guidance more than doubled feature adoption (23% to 54%). Users replayed the tour an average of 2.3 times in the first week. The increase in time on page reflected genuine learning engagement, not confusion.',
          learnings: [
            'Users forget onboarding content almost immediately (Google Effect in action)',
            'Providing replay options costs almost nothing but dramatically improves adoption',
            'Contextual "Learn more" links were used even more than the full replay',
            'Power users also used replay to discover features they skipped initially',
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
        name: 'Missing or Hidden Search',
        description:
          'Help content or documentation without a prominent search function',
        howToSpot:
          'Check if users can search for help content with a single action. If search is absent, buried, or requires navigating to a separate page, the Google Effect is not being accommodated.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'One-Shot Information Display',
        description:
          'Important information shown once (tooltips, modals, banners) with no way to retrieve it later',
        howToSpot:
          'Look for "Don\'t show again" checkboxes, dismissible banners with no history, or onboarding flows with no replay option.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Dense Instruction Blocks',
        description:
          'Large blocks of instructions that users are expected to read and remember',
        howToSpot:
          'Look for multi-paragraph instructions, setup guides without persistent reference, or modal dialogs with walls of text and a single "OK" button.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Contextual Help',
        description:
          'Complex forms or workflows without inline help, tooltips, or guidance',
        howToSpot:
          'Check if form fields, settings, or complex features have help icons, tooltips, or linked documentation. If users must leave the page to understand a feature, the design ignores the Google Effect.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Deeply Nested Documentation',
        description:
          'Help articles accessible only through multi-level category navigation',
        howToSpot:
          'Count the number of clicks required to reach a specific help article. More than 2 clicks without search indicates poor findability.',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Search Dependency Pattern',
        description: 'Users repeatedly searching for the same information, indicating they cannot or will not memorize it',
        indicators: ['Repeated identical search queries in analytics', 'High return rates to the same help articles', 'Bookmarked documentation pages', 'Users copying and pasting from help docs into their workflow'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'External Search Escape Pattern',
        description: 'Users leaving the product to search Google or Stack Overflow for answers that should be available in-app',
        indicators: ['Exit rates from settings or configuration pages', 'Support tickets referencing external sources', 'Forum posts asking basic questions covered in docs', 'Users pasting URLs from external searches into support chats'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Forgotten Onboarding Pattern',
        description: 'Users failing to use features they were taught during onboarding, as if they never saw the tutorial',
        indicators: ['Low adoption of features demonstrated in onboarding', 'Support tickets about features covered in initial tutorial', 'Users asking "how do I do X" for things they were shown', 'Feature discovery metrics flat despite onboarding completion'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Help Center Bounce Pattern',
        description: 'Users visiting the help center but leaving without finding answers due to poor search or navigation',
        indicators: ['High bounce rate on help center landing page', 'Zero-result searches', 'Users visiting multiple help articles in rapid succession', 'Low time-on-page for help articles (skimming, not finding)'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users search for any piece of information within the product?',
      'Is there a global search or command palette (Cmd/Ctrl+K)?',
      'Can onboarding tutorials and walkthroughs be replayed at any time?',
      'Are tooltips and contextual help available at every point of complexity?',
      'Is the help center search-first or browse-first?',
      'Are critical instructions available persistently, not just during setup?',
      'Can users find previously seen information without remembering where it was?',
      'Are form labels and field descriptions sufficient without external reference?',
      'Do users leave the product to search for answers externally?',
      'Are repeated help-seeking patterns tracked and addressed?',
      'Is documentation written in short, searchable articles rather than long manuals?',
      'Do error messages include actionable guidance or links to relevant help?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Google Effect (Digital Amnesia).

Analyze the provided design for Google Effect patterns. Identify:

1. **Search & Findability**: How easily can users search for and re-find information within the interface?
2. **Contextual Help**: Are tooltips, inline guidance, and help links available at points of complexity?
3. **Onboarding Persistence**: Can users replay tutorials and access learning materials after initial onboarding?
4. **Memory Burden**: Where does the design expect users to remember information that could be made searchable?
5. **Documentation Quality**: Is help content structured for search-first retrieval?

For each pattern found:
- Identify what information the design expects users to memorize
- Assess whether that expectation is realistic given the Google Effect
- Determine if information is re-findable when users inevitably forget
- Evaluate the search and help system quality
- Suggest improvements for reducing memory burden

Consider:
- Is the design fighting against the Google Effect by demanding memorization?
- Are help systems designed for how users actually search (like Google)?
- Can users re-find information they were shown once?
- Are critical instructions available persistently or shown once and lost?
- Does the interface minimize memory load through contextual information?

Provide actionable recommendations for designing with, not against, the Google Effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        googleEffectPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              memoryBurden: { type: 'string' },
              searchability: { type: 'string' },
              refindability: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'memoryBurden',
              'searchability',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            searchQuality: { type: 'number' },
            contextualHelpCoverage: { type: 'number' },
            onboardingPersistence: { type: 'number' },
            memoryBurdenScore: { type: 'number' },
          },
          required: [
            'searchQuality',
            'contextualHelpCoverage',
            'onboardingPersistence',
            'memoryBurdenScore',
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
        'googleEffectPatterns',
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
        title: 'Audit Memory Demands',
        description:
          'Identify every place in your product where users are expected to remember information',
        example:
          'Map all onboarding content, setup instructions, feature explanations, and configuration details that are shown once',
        tips: [
          'Walk through the product as a new user and note every instruction you receive',
          'Check if each piece of information can be re-found later',
          'Pay special attention to one-time modals, tooltips, and banners',
        ],
      },
      {
        step: 2,
        title: 'Build Search-First Help',
        description:
          'Implement robust search across all help content, documentation, and in-product guidance',
        example:
          'Add a global Cmd/Ctrl+K command palette that searches help articles, features, and settings simultaneously',
        tips: [
          'Use fuzzy matching and natural language processing in search',
          'Include autocomplete with popular queries and suggested articles',
          'Index all help content, tooltips, and feature descriptions for search',
        ],
      },
      {
        step: 3,
        title: 'Add Contextual Help at Points of Friction',
        description:
          'Place tooltips, help links, and inline guidance at every point where users might need information',
        example:
          'Add "?" icons next to complex form fields, with tooltips that explain the field and link to full documentation',
        tips: [
          'Use analytics to identify where users get stuck or abandon tasks',
          'Support ticket topics indicate where contextual help is missing',
          'Help should be visible but not intrusive — progressive disclosure',
        ],
      },
      {
        step: 4,
        title: 'Make Onboarding Persistent',
        description:
          'Ensure all onboarding and tutorial content can be replayed and referenced at any time',
        example:
          'Add a "Learning Center" in the help menu with all tutorials, walkthroughs, and getting-started guides',
        tips: [
          'Never use "show once" for educational content',
          'Provide both guided walkthroughs and written reference for different learning styles',
          'Track which tutorials users replay to identify areas of confusion',
        ],
      },
      {
        step: 5,
        title: 'Measure and Optimize Findability',
        description:
          'Track search success rates, help article effectiveness, and repeated lookup patterns',
        example:
          'Monitor zero-result searches, help center bounce rates, and repeated queries to identify gaps in searchable content',
        tips: [
          'Zero-result searches reveal missing content',
          'Repeated identical queries suggest information that should be surfaced contextually',
          'External search escapes (users leaving to Google) indicate in-product search failures',
        ],
      },
    ],

    dos: [
      'Design help systems that work like search engines, not like encyclopedias',
      'Provide contextual tooltips and inline guidance at every point of complexity',
      'Make all onboarding content permanently re-accessible from a help menu',
      'Implement global search (Cmd/Ctrl+K) across features, settings, and help content',
      'Write help articles as short, self-contained answers to specific questions',
      'Include search autocomplete with popular queries and suggested results',
      'Surface relevant help automatically based on user context and behavior',
      'Make error messages actionable with links to relevant help articles',
    ],

    donts: [
      'Don\'t show critical instructions once and expect users to remember them',
      'Don\'t build help centers without search functionality',
      'Don\'t bury documentation behind complex category navigation',
      'Don\'t assume users read, retain, or even see onboarding tutorials',
      'Don\'t require users to leave the product to find answers externally',
      'Don\'t use "Don\'t show again" as default for educational content',
      'Don\'t write monolithic documentation that cannot be found via search',
      'Don\'t rely on users memorizing keyboard shortcuts, feature locations, or workflow steps',
    ],

    bestPractices: [
      {
        title: 'Search-First Information Architecture',
        description:
          'Make search the primary way users interact with help and documentation, not browsing',
        rationale:
          'The Google Effect means users expect to type a question and get an answer. Category browsing feels unnatural to users trained by search engines.',
        example:
          'Prominent search bar on help center landing page with autocomplete, popular queries, and instant results',
      },
      {
        title: 'Contextual Information at Point of Need',
        description:
          'Deliver information where and when users need it, not in advance',
        rationale:
          'Users will not remember information given at the wrong time. Just-in-time help aligns with how memory actually works in a search-enabled world.',
        example:
          'Tooltip on a "Webhook URL" field explaining what it is and where to find it, rather than covering webhooks in onboarding',
      },
      {
        title: 'Persistent Learning Resources',
        description:
          'Ensure all educational content — tutorials, walkthroughs, guides — is permanently accessible and re-playable',
        rationale:
          'Users who know they can re-access information are paradoxically more likely to engage with it initially, because the pressure to memorize is removed.',
        example:
          'A "Learning Center" section in the app with all tutorials, filterable by topic, each re-triggerable as an in-app walkthrough',
      },
      {
        title: 'Smart Defaults Reduce Memory Load',
        description:
          'Use intelligent defaults, autocomplete, and recent selections to minimize what users need to recall',
        rationale:
          'Every input field where users must remember a value is a Google Effect friction point. Smart defaults eliminate that friction.',
        example:
          'Auto-filling the last-used project name, timezone, or export format in forms',
      },
      {
        title: 'Track and Fix Findability Failures',
        description:
          'Monitor search queries, zero-result rates, and external search escapes to continuously improve information retrieval',
        rationale:
          'Data-driven iteration reveals where the Google Effect is causing users to fail — and where adding searchable content can solve the problem.',
        example:
          'Weekly review of zero-result search queries, creating new help articles for the top unanswered questions',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide labels and instructions for user input',
        implementation:
          'Ensure all form fields have descriptive labels and contextual help text that can be accessed without memorizing prior instructions. Tooltips and help links must be accessible to screen readers.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.5',
        guideline:
          'Multiple Ways - Provide more than one way to locate content',
        implementation:
          'Offer both search and browse navigation for help content. Ensure keyboard users can access search, command palette, and contextual help equally.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.5',
        guideline:
          'Help - Context-sensitive help is available',
        implementation:
          'Provide contextual help mechanisms (tooltips, help links, inline guidance) at every point of complexity. Ensure these are announced to screen readers via ARIA attributes.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for searchable content',
        implementation:
          'Structure help content with descriptive headings that match how users search. This aids both visual scanning and screen reader navigation.',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Helplessness',
        severity: 'high',
        explanation:
          'Deliberately making information hard to find or remember so users depend on paid support, premium tiers, or external consultants',
        mitigation:
          'Make all essential information freely searchable. Do not gate help content behind paywalls. Complexity should never be a business model.',
      },
      {
        concern: 'Dark Pattern: Hidden Cancellation',
        severity: 'critical',
        explanation:
          'Exploiting the Google Effect by making cancellation or unsubscribe processes difficult to find and impossible to remember, relying on users forgetting how to cancel',
        mitigation:
          'Make cancellation, data export, and account deletion as findable as sign-up. These should appear in search results and be accessible from account settings.',
      },
      {
        concern: 'Information Overload as Manipulation',
        severity: 'medium',
        explanation:
          'Burying important terms, conditions, or limitations in dense documentation, knowing users will not memorize them and are unlikely to re-find the relevant clause',
        mitigation:
          'Surface critical terms and limitations contextually at the point of decision. Summarize key points in plain language alongside detailed legal text.',
      },
      {
        concern: 'Digital Dependency',
        severity: 'medium',
        explanation:
          'Designing systems that actively discourage memorization, creating unhealthy dependency on digital tools for basic tasks',
        mitigation:
          'For safety-critical information (emergency procedures, medical dosages), design for memorization through repetition and confirmation, not just searchability.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Google Effects on Memory: Cognitive Consequences of Having Information at Our Fingertips',
        author: 'Sparrow, B., Liu, J., & Wegner, D. M.',
        year: 2011,
        doi: '10.1126/science.1207745',
        url: 'https://science.sciencemag.org/content/333/6043/776',
        description:
          'The foundational paper that identified and named the Google Effect, demonstrating that people remember where to find information rather than the information itself',
        type: 'foundational',
      },
      {
        title: 'Transactive Memory: A Contemporary Analysis of the Group Mind',
        author: 'Wegner, D. M.',
        year: 1995,
        description:
          'The theoretical foundation for the Google Effect — transactive memory systems explain how people distribute memory across social and now digital networks',
        type: 'foundational',
      },
      {
        title: 'The Brain in Your Pocket: Evidence that Smartphones are Used to Supplant Thinking',
        author: 'Barr, N., Pennycook, G., Stolz, J. A., & Fugelsang, J. A.',
        year: 2015,
        doi: '10.1016/j.chb.2015.07.029',
        description:
          'Extends the Google Effect to smartphones, showing how mobile search actively reduces analytical thinking',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Shallows: What the Internet Is Doing to Our Brains',
        author: 'Carr, Nicholas',
        year: 2010,
        isbn: '9780393339758',
        description:
          'Explores how internet use, including the Google Effect, is reshaping human cognition and memory',
        type: 'foundational',
      },
      {
        title: 'Smarter Than You Think: How Technology is Changing Our Minds for the Better',
        author: 'Thompson, Clive',
        year: 2013,
        isbn: '9780143125617',
        description:
          'A more optimistic perspective on digital memory outsourcing, arguing it frees cognitive resources for higher-order thinking',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Digital Amnesia: Are Search Engines Ruining Your Memory?',
        author: 'Kaspersky Lab',
        url: 'https://www.kaspersky.com/blog/digital-amnesia/12474/',
        description:
          'Accessible overview of the Google Effect and its implications for daily life, based on a large survey study',
        type: 'practical',
      },
      {
        title: 'Designing for Forgetting: Disposable Spacetimes in HCI',
        author: 'Cheshire, C., & Antin, J.',
        url: 'https://doi.org/10.1145/2702123.2702547',
        description:
          'Research on how interface design should account for human forgetting, with practical UX implications',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'Is Google Ruining Your Memory?',
        author: 'AsapSCIENCE',
        url: 'https://www.youtube.com/watch?v=jQoTe1VPUvI',
        description:
          'Short, accessible video explaining the Google Effect and its implications for how we learn and remember',
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
      'cognitive-load', // Reducing memory burden aligns with reducing cognitive load
      'recognition-over-recall', // Both favor showing information over expecting recall
      'external-cognition', // Digital tools as extensions of cognition
      'progressive-disclosure', // Revealing information when needed, not all at once
    ],

    conflicts: [
      'testing-effect', // Deliberate recall practice strengthens memory, opposing the Google Effect
      'generation-effect', // Actively generating answers improves retention vs. looking them up
    ],

    confusedWith: [
      'availability-heuristic', // Both relate to information accessibility but are fundamentally different mechanisms
      'recency-effect', // Recency affects what is remembered; Google Effect affects whether things are remembered at all
      'source-monitoring-error', // Both involve source/location memory but in different ways
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'digital-amnesia',
        'search-dependency',
      ],
    },
  },
};
