/**
 * GOOGLE EFFECT (DIGITAL AMNESIA)
 *
 * The tendency to forget information that is readily available
 * through digital devices, treating technology as an external
 * memory store rather than encoding information internally.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const googleEffectDigital: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'google-effect-digital',
    name: 'Google Effect (Digital Amnesia)',
    aliases: ['Digital Amnesia', 'Google Effect', 'Cognitive Offloading'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'memory',
      'digital-storage',
      'cognitive-offloading',
      'information-retrieval',
      'knowledge-management',
      'search',
      'bookmarks',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We forget information we know we can look up digitally, relying on devices as external memory instead of encoding it ourselves.',

    detailed: `The Google Effect (Digital Amnesia) describes the tendency to forget information that is stored in or easily retrievable from digital devices. When people know that information is saved on a phone, computer, or cloud service, they invest less cognitive effort in encoding it into long-term memory.

This is not mere laziness -- it reflects a genuine shift in how the brain allocates memory resources. The brain treats digital storage as a form of "transactive memory partner," much like remembering which friend knows about cars rather than memorizing car specs yourself. With digital devices, people remember *where* to find information rather than *what* the information is.

In UX and product design, this bias has profound implications: users will forget content, settings, and workflows they believe the system retains for them. Products that fail to provide robust retrieval mechanisms -- search, bookmarks, history, saved states -- punish users for a cognitive tendency they cannot override.`,

    psychologyBasis: {
      discoveredBy: 'Betsy Sparrow, Jenny Liu, and Daniel M. Wegner',
      year: 2011,
      theory: 'Transactive Memory and Cognitive Offloading',
      mechanism: `The brain reduces internal encoding effort for information it expects to remain externally accessible. This happens because:

1. **Cognitive Offloading**: The brain delegates storage to external devices, conserving mental resources for other tasks
2. **Source Monitoring Shift**: People encode the *location* of information (which app, which folder, which search terms) rather than the information itself
3. **Reduced Encoding Depth**: Knowing information is "saved" decreases elaborative rehearsal, the process that transfers data from working memory to long-term memory
4. **Transactive Memory Adaptation**: Humans naturally distribute memory across trusted partners; digital devices have become the most trusted and omnipresent partner
5. **Retrieval Confidence**: High confidence in future retrievability ("I can always Google it") actively suppresses the motivation to memorize

The effect is automatic -- even when people intend to remember, knowing the information is digitally stored reduces retention.`,
    },

    realWorldExample: `In Sparrow et al.'s landmark 2011 study, participants typed trivia facts into a computer. Half were told the facts would be saved; half were told they would be erased. Those who believed the information was saved had significantly worse recall. Critically, participants who were told where the file was saved remembered the *folder location* better than the *facts themselves*.

This mirrors everyday behavior: people photograph restaurant menus instead of reading them, screenshot directions instead of learning routes, and save articles to "read later" lists they never revisit. The act of saving feels like learning, but the information never reaches long-term memory.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Digital Amnesia means users will systematically forget information your product presents -- unless the product itself provides robust mechanisms for retrieval, resurfacing, and persistence. Designers must:

- Build powerful search so users can re-find anything they once saw
- Provide save, bookmark, and pin features for user-identified important content
- Maintain persistent state so users never lose context or progress
- Surface saved items proactively, since users forget they saved them
- Design knowledge management features that make stored information actionable, not just archived`,

    whenToUse: [
      {
        title: 'Searchable Archives',
        scenario:
          'When users encounter large volumes of content they cannot be expected to memorize',
        example:
          'Provide full-text search across all historical messages, documents, and settings so users can retrieve anything by keyword',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Bookmark and Save Features',
        scenario:
          'When users identify content as important but are not ready to act on it',
        example:
          'Offer one-click save-for-later with organized collections, tags, and reminders to revisit',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Persistent Application State',
        scenario:
          'When users leave and return to workflows, forms, or reading positions',
        example:
          'Auto-save drafts, scroll position, filter states, and tab configurations so users resume exactly where they left off',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Knowledge Base Accessibility',
        scenario:
          'When users need to reference previously learned procedures or configurations',
        example:
          'Provide contextual help, inline documentation, and searchable settings history so users do not need to memorize system behavior',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Proactive Resurfacing',
        scenario:
          'When saved or bookmarked content risks being forgotten entirely',
        example:
          'Send digest emails of saved articles, remind users of bookmarked items, or surface "On this day" memories from stored photos',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Safety-Critical Information',
        reason:
          'Users must internalize emergency procedures, not rely on device access during a crisis',
        consequence:
          'Users who offloaded safety knowledge to devices may be unable to act when the device is unavailable',
        alternative:
          'Use spaced repetition, quizzes, and active recall training for safety-critical knowledge',
      },
      {
        title: 'Password and Security Credentials',
        reason:
          'Encouraging users to "just save it" for sensitive credentials without proper security infrastructure creates risk',
        consequence:
          'Plaintext passwords in notes apps, screenshots of credentials, insecure storage',
        alternative:
          'Integrate with password managers, provide secure credential vaults, use biometric or passkey authentication',
      },
      {
        title: 'Learning and Education Contexts',
        reason:
          'Students who offload everything to notes never internalize the knowledge',
        consequence:
          'Shallow learning, inability to apply knowledge without device access',
        alternative:
          'Design for active recall: flashcards, quizzes, and retrieval practice alongside saved notes',
      },
      {
        title: 'Offline-First Scenarios',
        reason:
          'Users in low-connectivity environments cannot rely on cloud retrieval',
        consequence:
          'Complete loss of access to information when connectivity drops',
        alternative:
          'Cache critical information locally, provide offline access to saved items, sync when reconnected',
      },
    ],

    commonMistakes: [
      {
        title: 'No Search or Weak Search',
        description:
          'Providing no way to search through historical content, messages, or settings',
        why: 'Users rely on search as their primary retrieval mechanism; without it, saved information is effectively lost',
        fix: 'Implement full-text search across all user-generated and system-generated content with filters and facets',
      },
      {
        title: 'Save Without Organize',
        description:
          'Allowing users to save items but providing no way to categorize, tag, or sort them',
        why: 'Unsorted save lists grow into unusable dumps; users cannot find what they saved',
        fix: 'Provide folders, tags, collections, and smart filters for saved items',
      },
      {
        title: 'Silent State Loss',
        description:
          'Discarding drafts, form inputs, or session state without warning when users navigate away',
        why: 'Users assume the system remembers what they entered, because digital amnesia means they certainly will not',
        fix: 'Auto-save all user input, confirm before discarding, provide recovery mechanisms',
      },
      {
        title: 'Forgotten Bookmarks',
        description:
          'Providing a save/bookmark feature but never reminding users about what they saved',
        why: 'The same bias that causes users to forget information also causes them to forget they saved it',
        fix: 'Surface saved items proactively through notifications, digests, or contextual suggestions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout must provide persistent access to search, saved items, and navigation history',
        examples: [
          'Global search bar always visible in the header or accessible via keyboard shortcut',
          'Sidebar or tab for bookmarks, saved items, and recent history',
          'Breadcrumbs showing navigation path for easy backtracking',
          'Persistent reading progress indicators for long content',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can aid scannability for users who are re-finding rather than reading for the first time',
        examples: [
          'Clear headings and subheadings aid search result scanning',
          'Highlighted search terms in results help users confirm they found the right item',
          'Consistent title formatting makes saved item lists scannable',
          'Metadata typography (dates, tags) helps users identify items by context rather than content',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can signal save states, retrieval cues, and content status',
        examples: [
          'Bookmark icons change color when active to confirm save state',
          'Visited link colors distinguish previously seen content',
          'Highlight colors on search matches draw attention to relevant text',
          'Status colors differentiate read vs unread saved items',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users can reliably store and retrieve information',
        examples: [
          'One-click save/bookmark with undo rather than multi-step save flows',
          'Keyboard shortcuts for search (Cmd/Ctrl+K) reduce friction for retrieval',
          'Drag-and-drop organization for saved items',
          'Auto-complete in search using user history and saved item titles',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content must be structured for retrievability, not just initial readability',
        examples: [
          'Descriptive titles enable effective search and scanning of saved items',
          'Tags and metadata make content findable through multiple paths',
          'Summaries and previews help users identify saved items without opening each one',
          'Contextual links between related items support associative retrieval',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Search, bookmarks, and state persistence must be accessible to all users',
        examples: [
          'Search functionality fully operable via keyboard and screen reader',
          'Bookmark states announced by screen readers when toggled',
          'Saved item lists navigable with assistive technology',
          'Auto-save confirmation communicated through ARIA live regions',
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
        title: 'Robust Search with Context',
        description:
          'Messaging app providing full-text search across all conversations with date, sender, and attachment filters',
        code: `<div class="search-panel">
  <div class="search-bar">
    <input type="search" placeholder="Search messages, files, links..."
           aria-label="Search all conversations">
    <div class="search-filters">
      <select aria-label="Filter by sender">
        <option>All people</option>
      </select>
      <input type="date" aria-label="From date">
      <label><input type="checkbox"> Has attachments</label>
    </div>
  </div>

  <div class="search-results" role="list">
    <div class="result" role="listitem">
      <span class="sender">Sarah Chen</span>
      <span class="date">Mar 12, 2026</span>
      <p>...the API endpoint is <mark>https://api.example.com/v2</mark>
         and the key is in the shared vault...</p>
      <span class="context">in #engineering</span>
    </div>
  </div>
</div>`,
        explanation:
          'Users will not remember the API endpoint Sarah shared three months ago, but they vaguely remember she mentioned it. Full-text search with sender and date filters lets them retrieve it from a partial memory cue.',
        principle:
          'Design retrieval around partial memory cues, not exact recall',
        metrics: {
          before: 'Users asked teammates to re-share links 14 times/week on average',
          after: 'Reduced to 3 times/week after search improvements',
          improvement: '79% reduction in redundant information requests',
        },
      },
      {
        title: 'Save-for-Later with Proactive Resurfacing',
        description:
          'Reading app that saves articles and reminds users to revisit them',
        code: `<article class="saved-article">
  <div class="article-header">
    <h3>Understanding Distributed Systems</h3>
    <button class="bookmark active" aria-label="Saved to reading list"
            aria-pressed="true">
      <svg class="icon-bookmark-filled" aria-hidden="true"></svg>
    </button>
  </div>
  <p class="meta">Saved 2 weeks ago &middot; 12 min read &middot; 0% read</p>
  <p class="preview">A comprehensive guide to CAP theorem,
     eventual consistency, and partition tolerance...</p>
  <div class="actions">
    <button class="primary">Read Now</button>
    <button class="secondary">Remind Me Tomorrow</button>
  </div>
</article>

<section class="digest-prompt">
  <h3>Your Weekly Reading Digest</h3>
  <p>You have <strong>7 saved articles</strong> you haven't read yet.
     The oldest was saved 3 weeks ago.</p>
</section>`,
        explanation:
          'Users save articles intending to read them but forget they saved them. Proactive digests and read-status tracking surface forgotten saved items before they become stale.',
        principle:
          'Compensate for digital amnesia by resurfacing saved content users have forgotten about',
      },
      {
        title: 'Persistent State and Auto-Save',
        description:
          'Form that auto-saves progress and restores state on return',
        code: `<form class="application-form" data-autosave="true">
  <div class="save-status" role="status" aria-live="polite">
    <svg class="icon-check" aria-hidden="true"></svg>
    <span>Draft auto-saved 30 seconds ago</span>
  </div>

  <fieldset>
    <legend>Step 2 of 4: Work Experience</legend>
    <div class="field">
      <label for="company">Company Name</label>
      <input id="company" value="Acme Corp" data-restored="true">
      <span class="restored-hint">Restored from your draft</span>
    </div>
  </fieldset>

  <div class="progress-bar" role="progressbar"
       aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <span>50% complete</span>
  </div>
</form>`,
        explanation:
          'Users who leave a multi-step form will not remember what they entered. Auto-save with visible confirmation and clear restoration cues ensures no work is lost, respecting the reality that users will forget they started.',
        principle:
          'Never rely on users to remember their own input -- persist everything automatically',
      },
    ],

    bad: [
      {
        title: 'No Search in Content-Heavy App',
        description:
          'Note-taking app with hundreds of notes but no search functionality',
        code: `<!-- DON'T DO THIS -->
<div class="notes-list">
  <h2>All Notes (347)</h2>
  <div class="note">Untitled Note - Mar 15</div>
  <div class="note">Untitled Note - Mar 14</div>
  <div class="note">Meeting Notes - Mar 12</div>
  <!-- 344 more notes, no search, no tags, no filters -->
  <p class="empty-state">Scroll to find your note</p>
</div>`,
        explanation:
          'Without search, users must scroll through hundreds of notes to find one they vaguely remember. Since digital amnesia means they only remember they wrote it -- not the title or date -- this is effectively impossible.',
        principle:
          'Stored information without retrieval mechanisms is the same as lost information',
      },
      {
        title: 'Silent Draft Deletion',
        description:
          'Email client that silently discards drafts after 24 hours',
        code: `<!-- DON'T DO THIS -->
<div class="drafts-folder">
  <h3>Drafts (0)</h3>
  <p class="empty">No drafts</p>
  <!-- User's half-written email was silently deleted after 24 hours -->
  <!-- No notification, no trash, no recovery -->
</div>`,
        explanation:
          'Users expect drafts to persist indefinitely because they rely on the system to remember what they were writing. Silent deletion violates the transactive memory contract between user and device.',
        principle:
          'Never silently destroy information users expect the system to retain',
      },
      {
        title: 'Bookmark Graveyard',
        description:
          'Browser with thousands of unsorted bookmarks and no way to manage them',
        code: `<!-- DON'T DO THIS -->
<div class="bookmarks-bar">
  <a href="...">Bookmark 1</a>
  <a href="...">Bookmark 2</a>
  <!-- 2,000+ bookmarks in a flat, unsorted list -->
  <!-- No folders, no tags, no search, no date info -->
  <span class="overflow">+1,987 more</span>
</div>`,
        explanation:
          'Save features without organization turn into unusable archives. Users bookmark content to offload memory, but without tags, folders, or search, retrieval becomes impossible.',
        principle:
          'A save feature without an organize-and-retrieve feature is a trap',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Keep',
        description:
          'Google Keep provides color-coded notes, labels, reminders, and full-text search. Notes are pinnable and can surface as time or location-based reminders -- directly compensating for the tendency to forget saved information.',
        effectiveness: 'very-effective',
        analysis:
          'Keep succeeds because it treats note-taking as a retrieval problem, not just a storage problem. Labels, colors, and reminders create multiple retrieval paths for information users will forget they saved.',
      },
      {
        company: 'Mozilla / Google',
        product: 'Browser Bookmarks and History',
        description:
          'Modern browsers maintain full browsing history with search, auto-complete from history in the address bar, and synced bookmarks across devices. Users can re-find pages from partial URL or title fragments.',
        effectiveness: 'effective',
        analysis:
          'Address bar auto-complete from history is the killer feature -- users type a partial word and the browser surfaces the page they vaguely remember visiting. This is retrieval-from-partial-cues in action.',
      },
      {
        company: 'Pocket (Mozilla)',
        product: 'Pocket Save-for-Later',
        description:
          'Pocket lets users save articles from any browser or app with one click, then provides a curated reading list with tags, search, and recommendations. It also sends weekly digest emails highlighting unread saved items.',
        effectiveness: 'effective',
        analysis:
          'The weekly digest is critical: it compensates for the fact that users forget they saved articles. Without proactive resurfacing, save-for-later lists become graveyards.',
      },
      {
        company: 'Apple / Google',
        product: 'Cloud Photo Storage (iCloud Photos, Google Photos)',
        description:
          'Cloud photo libraries with AI-powered search (search "beach", "birthday", "dog"), face recognition, location grouping, and "On This Day" memories replace the need to remember when or where a photo was taken.',
        effectiveness: 'very-effective',
        analysis:
          'Users no longer remember individual photos -- they remember they took a photo "sometime last summer at the beach." Semantic search and auto-generated categories transform vague memory cues into precise retrieval.',
      },
    ],

    abTests: [
      {
        title: 'Search Visibility: Hidden Menu vs Persistent Search Bar',
        hypothesis:
          'Making search always visible will increase retrieval success and reduce support requests',
        controlVersion: {
          description:
            'Search hidden behind a magnifying glass icon in the navigation menu',
          metrics: {
            conversionRate: '12% of users used search per session',
            timeOnPage: '3:45 average time to find previously viewed content',
            scrollDepth: '67% gave up and asked support instead',
          },
        },
        treatmentVersion: {
          description:
            'Persistent search bar in header with placeholder text: "Search messages, files, settings..."',
          metrics: {
            conversionRate: '41% of users used search per session',
            timeOnPage: '0:52 average time to find previously viewed content',
            scrollDepth: '23% needed support assistance',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Making search persistent increased usage by 242%. Users found content 77% faster. Support tickets for "where is X" questions dropped by 66%. The persistent search bar served as a constant reminder that retrieval was available.',
          learnings: [
            'Users do not remember to search unless the affordance is visible',
            'Placeholder text suggesting searchable content types increased usage further',
            'Keyboard shortcut (Cmd+K) adoption increased 3x when paired with visible bar',
            'Search queries revealed what users forget most: settings, old messages, shared links',
          ],
        },
      },
      {
        title: 'Saved Items: Passive List vs Proactive Resurfacing',
        hypothesis:
          'Proactively reminding users of saved items will increase engagement with saved content',
        controlVersion: {
          description:
            'Standard bookmarks page accessible via sidebar link, showing saved articles in reverse chronological order',
          metrics: {
            conversionRate: '8% of saved articles were ever revisited',
            clickThroughRate: '2% clicked through to read saved articles per week',
          },
        },
        treatmentVersion: {
          description:
            'Weekly digest email of unread saved articles plus contextual "You saved this" badges when users visited related topics',
          metrics: {
            conversionRate: '34% of saved articles were revisited',
            clickThroughRate: '19% clicked through to read saved articles per week',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Proactive resurfacing increased revisit rate by 325%. Users reported they had "completely forgotten" about most saved items. The contextual badges were particularly effective -- surfacing a saved article when the user was already reading about a related topic.',
          learnings: [
            'Users forget they saved items at almost the same rate they forget the information itself',
            'Email digests work but contextual in-app reminders are more effective',
            'Recency matters: items saved more than 2 weeks ago were rarely revisited without a nudge',
            'Users appreciated the reminders and did not perceive them as annoying',
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
        name: 'Missing Search Affordance',
        description:
          'Content-heavy interface with no visible search bar or search icon',
        howToSpot:
          'Look for apps with extensive content (messages, notes, files) that lack a prominent search feature',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Absent Save/Bookmark Controls',
        description:
          'Valuable content (articles, settings, configurations) without any way to save or pin items for later',
        howToSpot:
          'Check whether users can mark content as important or save it for future reference',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'No State Persistence Indicators',
        description:
          'Forms, editors, or multi-step flows with no visible auto-save or draft indicators',
        howToSpot:
          'Look for forms without "Draft saved" messages, editors without save indicators, or flows without progress markers',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Flat Unsorted Archives',
        description:
          'Long chronological lists of saved items without categories, tags, or filters',
        howToSpot:
          'Check bookmark lists, saved items, or note archives for organization tools beyond chronological ordering',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No History or Recently Viewed',
        description:
          'Applications that do not track or display recently accessed items',
        howToSpot:
          'Look for missing "Recent" sections, no browsing history, or no "recently viewed" features',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Retrieval Failure Pattern',
        description: 'Users cannot find information they previously encountered in the product',
        indicators: [
          'Support tickets asking "where is the thing I saw earlier?"',
          'Users re-creating content they already saved',
          'Low revisit rate for bookmarked or saved items',
          'Users asking teammates to re-share links or information',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Cognitive Offloading Pattern',
        description: 'Users screenshot, copy-paste, or externally save content instead of using in-app features',
        indicators: [
          'High screenshot rates of app content',
          'Users pasting app content into personal notes',
          'External bookmark tools used instead of in-app save',
          'Users emailing content to themselves',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Abandoned Save Pattern',
        description: 'Users save content but never return to it',
        indicators: [
          'Large bookmark or save lists with very low revisit rates',
          'Read-later lists that grow but never shrink',
          'Saved searches that are never re-run',
          'Pinned items that remain pinned indefinitely without interaction',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'State Loss Frustration Pattern',
        description: 'Users lose work or context when navigating away and returning',
        indicators: [
          'Support tickets about lost form data or drafts',
          'Users refusing to navigate away from incomplete forms',
          'Tab hoarding to preserve state',
          'Angry feedback about lost progress',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Can users search across all content they have previously encountered?',
      'Is there a save or bookmark feature for content users might need later?',
      'Does the application auto-save drafts, form data, and session state?',
      'Are saved items organized with tags, folders, or smart categories?',
      'Does the product proactively resurface saved or forgotten content?',
      'Is browsing history tracked and searchable?',
      'Can users retrieve information from partial memory cues (partial titles, approximate dates)?',
      'Are there "recently viewed" or "recently used" sections?',
      'Does the search feature support fuzzy matching and filters?',
      'What happens when users navigate away from incomplete forms or workflows?',
      'Are there reminders or digests for content users saved but never revisited?',
      'Can users access saved content and history across devices?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Google Effect (Digital Amnesia).

Analyze the provided design for digital amnesia patterns. Identify:

1. **Retrieval Mechanisms**: How users can re-find information they previously encountered (search, history, bookmarks)
2. **State Persistence**: Whether the application preserves user context, drafts, and progress
3. **Save and Organize**: Quality of save, bookmark, and organizational features
4. **Proactive Resurfacing**: Whether the system reminds users about forgotten saved content
5. **Cognitive Offloading Support**: How the design accommodates users who rely on the system as external memory

For each area assessed:
- Identify gaps where users will lose information due to digital amnesia
- Assess retrieval path quality (can users find things from partial memory cues?)
- Evaluate state persistence (what is lost when users navigate away?)
- Determine if saved content is retrievable and organized
- Suggest improvements that respect the reality of cognitive offloading

Consider:
- Users will forget the content itself and remember only vague cues (who shared it, roughly when, the topic)
- Users will forget they saved something almost as fast as they forget the content
- Users expect the system to be a perfect memory partner
- Loss of digitally stored information feels like a betrayal of trust
- Different users have different retrieval strategies (search vs browse vs chronological)

Provide actionable recommendations for building a reliable external memory system.`,

    outputSchema: {
      type: 'object',
      properties: {
        retrievalAssessment: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              area: { type: 'string' },
              currentState: { type: 'string' },
              gapIdentified: { type: 'string' },
              userImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'area',
              'currentState',
              'gapIdentified',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            searchQuality: { type: 'number' },
            statePersistence: { type: 'number' },
            saveAndOrganize: { type: 'number' },
            resurfacingScore: { type: 'number' },
          },
          required: [
            'searchQuality',
            'statePersistence',
            'saveAndOrganize',
            'resurfacingScore',
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
        'retrievalAssessment',
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
        title: 'Audit Retrieval Paths',
        description:
          'Map every type of content users encounter and identify how (or if) they can retrieve it later',
        example:
          'Content audit: messages (searchable? yes), shared links (searchable? no), settings changes (history? no)',
        tips: [
          'List every content type in the product',
          'For each, answer: "Can a user who forgot the details find this again?"',
          'Identify the weakest retrieval paths as top priorities',
        ],
      },
      {
        step: 2,
        title: 'Build Robust Search',
        description:
          'Implement full-text search with filters, fuzzy matching, and highlighted results across all content',
        example:
          'Search covers messages, files, settings, help docs. Supports filters: date range, author, content type',
        tips: [
          'Search should match partial words and handle typos',
          'Highlight matching terms in results for quick scanning',
          'Include metadata (date, author, location) in results for context-based recognition',
        ],
      },
      {
        step: 3,
        title: 'Implement State Persistence',
        description:
          'Auto-save all user input, session state, and navigation context',
        example:
          'Form auto-saves every keystroke. Returning users see "Welcome back -- we saved your progress on Step 3"',
        tips: [
          'Save drafts automatically without requiring user action',
          'Show visible save-state indicators (last saved timestamp)',
          'Persist across sessions, devices, and browser tabs',
        ],
      },
      {
        step: 4,
        title: 'Design Save and Organize Features',
        description:
          'Provide one-click save with organizational tools: folders, tags, collections',
        example:
          'Bookmark button on every content card. Saved items panel with tags, search, and sort options',
        tips: [
          'Make saving frictionless (one click, not a modal)',
          'Offer both manual organization (folders) and automatic (smart tags)',
          'Show save count and recent saves for reassurance',
        ],
      },
      {
        step: 5,
        title: 'Add Proactive Resurfacing',
        description:
          'Remind users about content they saved, viewed, or interacted with but may have forgotten',
        example:
          'Weekly email: "5 saved articles you haven\'t read." In-app: "You viewed this topic last month"',
        tips: [
          'Respect user attention: resurface at natural moments, not intrusively',
          'Contextual reminders (related to current activity) outperform scheduled ones',
          'Let users control resurfacing frequency and channels',
        ],
      },
    ],

    dos: [
      'Provide full-text search across all user content with filters and fuzzy matching',
      'Auto-save all drafts, form inputs, and session state',
      'Offer one-click bookmarking with organizational tools (tags, folders)',
      'Show recently viewed, recently edited, and recently saved sections',
      'Proactively resurface forgotten saved content through digests or contextual reminders',
      'Support retrieval from partial cues: approximate dates, partial titles, topic keywords',
      'Persist state across sessions, devices, and browser tabs',
      'Show clear auto-save indicators so users trust the system is remembering for them',
    ],

    donts: [
      'Don\'t silently delete drafts, history, or saved items without user consent',
      'Don\'t rely on users to remember URLs, settings values, or navigation paths',
      'Don\'t provide save features without corresponding search and organize features',
      'Don\'t require exact recall for retrieval (exact titles, specific dates)',
      'Don\'t lose form data when users navigate away or refresh the page',
      'Don\'t assume users will remember what they saved or where they saved it',
      'Don\'t archive or hide old content without maintaining searchability',
      'Don\'t make search a secondary feature hidden behind menus or icons',
    ],

    bestPractices: [
      {
        title: 'Search as Primary Navigation',
        description:
          'Treat search as a first-class navigation mechanism, not an afterthought',
        rationale:
          'Users with digital amnesia rely on search as their primary retrieval strategy; it must be fast, visible, and comprehensive',
        example:
          'Cmd/Ctrl+K command palette searching across all content types: pages, settings, messages, files',
      },
      {
        title: 'Progressive History Depth',
        description:
          'Show recent items immediately, with deeper history available via search and filters',
        rationale:
          'Most retrieval needs are for recent items, but users occasionally need to find things from months ago',
        example:
          'Sidebar shows last 10 viewed items; full history accessible via "View all" with date filters',
      },
      {
        title: 'Contextual Retrieval Cues',
        description:
          'Surface related saved or previously viewed content when users are in a relevant context',
        rationale:
          'Users are most likely to need forgotten information when they encounter a related topic',
        example:
          'When reading about "API authentication," surface the saved article about "OAuth best practices" the user bookmarked last month',
      },
      {
        title: 'Multi-Signal Search Results',
        description:
          'Include title, preview, date, author, and source in search results so users can identify items from partial memory',
        rationale:
          'Users often remember who shared something or roughly when, but not what it was called',
        example:
          'Search result: "OAuth Best Practices - shared by Sarah Chen on Feb 14 - in #engineering - 12 min read"',
      },
      {
        title: 'Graceful State Recovery',
        description:
          'When state is lost (crash, timeout, accidental navigation), provide clear recovery options',
        rationale:
          'Users who lose work blame the system, not themselves, because they trusted it to remember',
        example:
          '"We recovered an unsaved draft from 2 hours ago. Would you like to restore it?"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial, Data) - Provide reversibility for user actions',
        implementation:
          'Auto-save form data, provide undo for deletions, and confirm before discarding drafts so users never lose information they expected the system to retain',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.5',
        guideline:
          'Multiple Ways - Provide more than one way to locate content',
        implementation:
          'Offer search, browsing, bookmarks, history, and contextual links so users with different retrieval strategies can all find previously encountered content',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure save states and search are semantically conveyed',
        implementation:
          'Use ARIA labels for bookmark toggle states, live regions for auto-save confirmations, and proper roles for search results lists',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Communicate save and retrieval status to assistive technology',
        implementation:
          'Use aria-live regions to announce "Draft saved," "Bookmark added," and search result counts without requiring focus change',
      },
    ],

    ethics: [
      {
        concern: 'Data Retention and Privacy',
        severity: 'critical',
        explanation:
          'Storing extensive user history, saved items, and browsing data for retrieval features creates privacy risks',
        mitigation:
          'Provide clear data retention policies, user-controlled deletion, and transparent data usage. Allow users to control what is stored and for how long.',
      },
      {
        concern: 'Dependency Creation',
        severity: 'high',
        explanation:
          'Making the product an indispensable external memory creates lock-in and dependency',
        mitigation:
          'Provide full data export, standard formats, and interoperability so users are not trapped by their reliance on the system as memory.',
      },
      {
        concern: 'Attention Manipulation via Resurfacing',
        severity: 'medium',
        explanation:
          'Proactive resurfacing of content can be used to drive engagement rather than serve user needs',
        mitigation:
          'Resurface content that genuinely serves the user (unread saved items) rather than content that serves business metrics (ads, upsells). Let users control frequency.',
      },
      {
        concern: 'Cognitive Atrophy',
        severity: 'medium',
        explanation:
          'Over-reliance on digital memory systems may further reduce internal memory capacity',
        mitigation:
          'In educational contexts, incorporate active recall features (quizzes, spaced repetition) alongside save-for-later features to support genuine learning.',
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
          'The foundational study demonstrating that people forget information they expect to be digitally available, while remembering where to find it',
        type: 'foundational',
      },
      {
        title: 'Brain Drain: The Mere Presence of One\'s Own Smartphone Reduces Available Cognitive Capacity',
        author: 'Ward, A. F., Duke, K., Gneezy, A., & Bos, M. W.',
        year: 2017,
        doi: '10.1086/691462',
        description:
          'Demonstrates that the mere presence of a smartphone reduces cognitive capacity, even when the phone is turned off, extending digital amnesia beyond active use',
        type: 'advanced',
      },
      {
        title: 'The Pen Is Mightier Than the Keyboard: Advantages of Longhand Over Laptop Note Taking',
        author: 'Mueller, P. A., & Oppenheimer, D. M.',
        year: 2014,
        doi: '10.1177/0956797614524581',
        description:
          'Shows that digital note-taking leads to shallower encoding compared to handwritten notes, related to cognitive offloading',
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
          'Explores how constant digital access is reshaping cognition, memory, and attention',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers transactive memory and cognitive heuristics that underpin the Google Effect',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Digital Amnesia: The Death of Memory in the Information Age',
        author: 'Kaspersky Lab',
        url: 'https://www.kaspersky.com/blog/digital-amnesia/',
        description:
          'Survey-based research on how smartphone reliance affects memory across demographics',
        type: 'practical',
      },
      {
        title: 'Designing for Cognitive Offloading',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/cognitive-offloading/',
        description:
          'Practical UX guidelines for designing products that serve as reliable external memory systems',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Is Google Making Us Stupid?',
        author: 'TED-Ed',
        url: 'https://www.youtube.com/watch?v=t6sQwOoLoag',
        description:
          'Accessible explanation of how search engines change our memory and cognition',
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
      'zeigarnik-effect',     // Incomplete tasks are remembered better; saved items feel "complete" and are forgotten
      'serial-position-effect', // Users remember first and last items; middle content needs save features most
      'mere-exposure-effect',   // Resurfacing saved content increases familiarity and engagement
      'status-quo-bias',        // Users expect persistent state; changes to saved state feel like losses
    ],

    conflicts: [
      'generation-effect',   // Actively generating information creates stronger memory than passively saving it
      'testing-effect',      // Active recall strengthens memory; save-for-later bypasses recall entirely
    ],

    confusedWith: [
      'google-effect',            // The broader Google Effect includes this variant
      'transactive-memory',       // Related concept but transactive memory is about distributed memory in groups
      'cognitive-load',           // Digital amnesia is about long-term memory, not working memory overload
    ],

    hierarchy: {
      parent: 'google-effect',
      children: [
        'photo-taking-impairment', // Photographing things reduces memory of them
        'save-for-later-effect',   // Saving articles reduces likelihood of reading them
      ],
    },
  },
};
