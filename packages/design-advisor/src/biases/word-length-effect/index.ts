/**
 * WORD LENGTH EFFECT
 *
 * Shorter words are remembered better than longer words because
 * they can be rehearsed more quickly in working memory.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const wordLengthEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'word-length-effect',
    name: 'Word Length Effect',
    aliases: ['Word Length Advantage', 'Short Word Superiority'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory',
      'working-memory',
      'rehearsal',
      'labels',
      'microcopy',
      'readability',
      'cognitive-load',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We remember shorter words better than longer ones because they can be rehearsed more quickly in working memory.',

    detailed: `The word length effect is a well-established memory phenomenon: lists of short words are recalled more accurately than lists of long words. This occurs because working memory relies on a phonological loop that rehearses information in real time. Shorter words cycle through this loop faster, allowing more items to be maintained before they decay.

In UX design, this effect has direct implications for any text users must scan, remember, or act on quickly. Labels, button text, navigation items, menu names, and microcopy all compete for limited working memory. When these elements use shorter words, users process them faster, remember them more reliably, and navigate with less cognitive effort.

Designers who respect the word length effect produce interfaces that feel lighter, faster, and more intuitive. Conversely, verbose labels, multi-word buttons, and long navigation items overload phonological rehearsal, leading to slower scanning, more errors, and higher abandonment rates.`,

    psychologyBasis: {
      discoveredBy: 'Baddeley, Thomson, and Buchanan',
      year: 1975,
      theory: 'Working Memory and the Phonological Loop',
      mechanism: `Working memory maintains verbal information through a phonological loop that rehearses items in real time. The loop has a finite duration (roughly 2 seconds), and items that take longer to articulate consume more of this window. This creates the word length effect through several mechanisms:

1. **Rehearsal Speed**: Shorter words can be subvocally rehearsed faster, allowing more items to be refreshed before they decay
2. **Phonological Store Decay**: Each word's memory trace decays over time; shorter words leave more time for other items
3. **Articulatory Duration**: The time it takes to mentally "speak" a word determines how much rehearsal bandwidth it consumes
4. **Span Limitation**: Memory span is roughly the number of items that can be spoken in 2 seconds, favoring shorter words
5. **Scanning Speed**: Shorter words are visually processed faster, accelerating initial encoding into working memory`,
    },

    realWorldExample: `In Baddeley et al.'s classic 1975 experiment, participants recalled lists of short words (e.g., "bat, sum, day, wit, pen") significantly better than lists of long words (e.g., "university, opportunity, immediately, representative, organization"). Recall accuracy dropped roughly 50% for long-word lists, even when the number of items was identical. The effect disappeared when participants were prevented from rehearsing (articulatory suppression), confirming the phonological loop mechanism.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The word length effect directly governs how well users can scan, remember, and act on interface text. Every label, button, menu item, and tooltip competes for limited phonological rehearsal time. Designers can leverage this to:

- Increase scanability by using concise labels and navigation items
- Improve recall of key actions by keeping CTAs short and punchy
- Reduce cognitive load in menus and navigation through brief naming
- Speed up task completion by minimizing reading time on interactive elements
- Enhance learnability by making feature names easy to rehearse and remember`,

    whenToUse: [
      {
        title: 'Call-to-Action Buttons',
        scenario:
          'When designing primary action buttons that users must notice and remember',
        example:
          'Use "Buy" or "Start" instead of "Purchase this item now" or "Begin your free trial today"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Navigation Labels',
        scenario: 'When naming navigation items, tabs, or menu entries',
        example:
          'Use "Home", "Shop", "Help" instead of "Return to Homepage", "Browse Products", "Customer Support"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Tooltip and Hint Text',
        scenario: 'When providing brief contextual help or guidance',
        example:
          'Use "Drag to sort" instead of "Click and drag this item to reorder the list"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Form Labels',
        scenario: 'When labeling input fields in forms',
        example:
          'Use "Name", "Email", "Phone" instead of "Your Full Name", "Email Address", "Phone Number"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Menu Items',
        scenario: 'When naming items in dropdown menus, context menus, or sidebars',
        example:
          'Use "Edit", "Copy", "Save" instead of "Edit this document", "Copy to clipboard", "Save changes"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Status and Badge Labels',
        scenario: 'When displaying status indicators, tags, or badges',
        example:
          'Use "New", "Sale", "Live" instead of "Recently Added", "On Sale Now", "Currently Live"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Complex Instructions',
        reason:
          'Brevity at the expense of clarity can cause user errors in multi-step or safety-critical flows',
        consequence:
          'Users misinterpret steps, make mistakes, or require additional support',
        alternative:
          'Use concise but complete instructions; prioritize clarity over brevity for critical tasks',
      },
      {
        title: 'Legal and Compliance Text',
        reason:
          'Shortening legal language can change meaning or create liability',
        consequence:
          'Legal exposure, regulatory violations, or user misunderstanding of terms',
        alternative:
          'Keep legal text precise; use progressive disclosure to manage length',
      },
      {
        title: 'Accessibility Descriptions',
        reason:
          'ARIA labels and alt text often require more words to convey meaning to assistive technology users',
        consequence:
          'Screen reader users miss important context, reducing accessibility',
        alternative:
          'Keep visual labels short but provide longer accessible descriptions via aria-label or sr-only text',
      },
      {
        title: 'Error Messages',
        reason:
          'Overly terse error messages leave users confused about what went wrong and how to fix it',
        consequence:
          'Users cannot recover from errors, increasing frustration and abandonment',
        alternative:
          'Balance brevity with enough context to guide recovery: short title + brief explanation',
      },
    ],

    commonMistakes: [
      {
        title: 'Abbreviating Beyond Recognition',
        description:
          'Shortening words so aggressively that users cannot understand them (e.g., "Cfg" for "Configuration")',
        why: 'Unrecognizable abbreviations require more cognitive effort than the long word they replace',
        fix: 'Use commonly understood short words or widely recognized abbreviations only',
      },
      {
        title: 'Inconsistent Label Length',
        description:
          'Mixing very short and very long labels in the same navigation or menu',
        why: 'Inconsistent lengths create uneven scanning rhythm and visual imbalance',
        fix: 'Aim for consistent word counts across related labels (e.g., all single-word nav items)',
      },
      {
        title: 'Sacrificing Meaning for Brevity',
        description:
          'Choosing a shorter word that does not accurately describe the action or content',
        why: 'Users must guess what the label means, adding cognitive load instead of reducing it',
        fix: 'Choose the shortest word that still conveys the correct meaning unambiguously',
      },
      {
        title: 'Ignoring Localization',
        description:
          'Designing for short English labels without considering translation length in other languages',
        why: 'Translated labels may be 2-3x longer, breaking layouts and violating the effect',
        fix: 'Design flexible layouts that accommodate longer translations; test with longest target language',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Label length directly affects layout density, alignment, and whitespace balance',
        examples: [
          'Short nav labels allow more items in horizontal navigation bars',
          'Brief button text enables consistent button sizing across the interface',
          'Concise column headers reduce table width and improve data density',
          'Short labels prevent text wrapping in responsive layouts',
        ],
      },
      typography: {
        level: ImpactLevel.CRITICAL,
        description:
          'Word length interacts with font size, weight, and line length to determine readability',
        examples: [
          'Short words at larger sizes create punchy, scannable headings',
          'Brief labels maintain readability at smaller font sizes',
          'Concise text allows bolder weights without visual heaviness',
          'Short words reduce the need for text truncation or ellipsis',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Word length has minimal direct interaction with color, but brevity supports badge and chip patterns',
        examples: [
          'Short status labels ("New", "Live") fit cleanly inside colored badges',
          'Brief tag text works well with background color fills',
          'Concise labels leave room for color-coded icons alongside text',
          'Short words in colored buttons maintain visual balance',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Shorter labels speed up target identification and reduce interaction time',
        examples: [
          'Brief menu items are scanned and selected faster in dropdowns',
          'Short button labels reduce decision time for action selection',
          'Concise tab names allow faster tab switching',
          'Brief command names speed up command palette and search usage',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Word length in microcopy, labels, and headings is the primary application of this effect',
        examples: [
          'One-word CTAs ("Buy", "Start", "Join") outperform verbose alternatives',
          'Short feature names are easier to remember across sessions',
          'Concise headings convey hierarchy without overwhelming working memory',
          'Brief placeholder text guides without cluttering input fields',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Short visible labels benefit sighted users, but accessible names may need more words',
        examples: [
          'Visual label "Save" paired with aria-label "Save current document" serves both needs',
          'Short visible nav labels reduce cognitive load for users with reading difficulties',
          'Brief labels are easier to process for users with cognitive disabilities',
          'Screen reader users benefit from concise but descriptive accessible names',
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
        title: 'Concise Call-to-Action Labels',
        description:
          'E-commerce product page using short, scannable CTA text',
        code: `<div class="product-actions">
  <button class="cta-primary">Buy</button>
  <button class="cta-secondary">Save</button>
  <button class="cta-tertiary">Share</button>
</div>

<style>
.cta-primary {
  font-size: var(--cg-font-size-lg);
  font-weight: var(--cg-font-weight-bold);
  padding: var(--cg-space-3) var(--cg-space-6);
}
</style>`,
        explanation:
          'Single-word CTAs ("Buy", "Save", "Share") are processed in milliseconds and recalled easily. Users instantly identify available actions without reading full sentences.',
        principle:
          'One-word action labels minimize rehearsal time and maximize recall',
        metrics: {
          before: '3.2% CTR with "Purchase this item now"',
          after: '5.1% CTR with "Buy"',
          improvement: '59% increase in CTA click-through rate',
        },
      },
      {
        title: 'Single-Word Navigation',
        description:
          'Main navigation using one-word labels for primary sections',
        code: `<nav class="main-nav" aria-label="Main navigation">
  <a href="/home">Home</a>
  <a href="/shop">Shop</a>
  <a href="/docs">Docs</a>
  <a href="/blog">Blog</a>
  <a href="/help">Help</a>
</nav>

<style>
.main-nav a {
  padding: var(--cg-space-2) var(--cg-space-4);
  font-weight: var(--cg-font-weight-medium);
}
</style>`,
        explanation:
          'Single-word navigation items create a scannable, memorable mental map of the site. Users can rehearse the entire nav structure in under 2 seconds.',
        principle:
          'Navigation labels within the phonological loop span are recalled across sessions',
      },
      {
        title: 'Brief Tooltip Guidance',
        description:
          'Short, punchy tooltips that users can process at a glance',
        code: `<div class="toolbar">
  <button aria-label="Undo last action" data-tooltip="Undo">
    <svg><!-- undo icon --></svg>
  </button>
  <button aria-label="Redo last action" data-tooltip="Redo">
    <svg><!-- redo icon --></svg>
  </button>
  <button aria-label="Zoom to fit canvas" data-tooltip="Fit">
    <svg><!-- fit icon --></svg>
  </button>
</div>

<style>
[data-tooltip]::after {
  content: attr(data-tooltip);
  font-size: var(--cg-font-size-sm);
  padding: var(--cg-space-1) var(--cg-space-2);
}
</style>`,
        explanation:
          'One-word tooltips ("Undo", "Redo", "Fit") are processed instantly. Longer aria-labels serve screen reader users who need more context. Visual users get the speed of brevity.',
        principle:
          'Separate short visible labels from longer accessible descriptions',
      },
    ],

    bad: [
      {
        title: 'Verbose Button Labels',
        description:
          'Action buttons with unnecessarily long, sentence-like text',
        code: `<!-- DON'T DO THIS -->
<div class="product-actions">
  <button class="cta-primary">
    Add This Item To Your Shopping Cart
  </button>
  <button class="cta-secondary">
    Save This Product To Your Wishlist For Later
  </button>
  <button class="cta-tertiary">
    Share This Product With Your Friends And Family
  </button>
</div>`,
        explanation:
          'Multi-word button labels overwhelm working memory. Users must read entire sentences to identify actions, slowing scanning speed by 3-4x compared to single-word labels.',
        principle:
          'Verbose labels exceed phonological loop capacity and slow action identification',
      },
      {
        title: 'Long Navigation Labels',
        description:
          'Navigation using phrases instead of concise labels',
        code: `<!-- DON'T DO THIS -->
<nav class="main-nav">
  <a href="/home">Return To The Homepage</a>
  <a href="/products">Browse Our Product Catalog</a>
  <a href="/docs">Read The Documentation</a>
  <a href="/blog">Visit Our Company Blog</a>
  <a href="/support">Contact Customer Support Team</a>
</nav>`,
        explanation:
          'Multi-word nav items cannot be rehearsed as a set. Users lose the ability to build a mental map of the site structure because the labels exceed working memory span.',
        principle:
          'Navigation labels should fit within the 2-second rehearsal window as a complete set',
      },
      {
        title: 'Wordy Menu Items',
        description:
          'Context menu with long descriptions instead of action verbs',
        code: `<!-- DON'T DO THIS -->
<ul class="context-menu">
  <li>Edit the contents of this document</li>
  <li>Make a copy of this document</li>
  <li>Move this document to another folder</li>
  <li>Permanently delete this document from your account</li>
  <li>Share this document with collaborators</li>
</ul>`,
        explanation:
          'Each menu item requires full sentence parsing. Users scanning a context menu need to identify actions in milliseconds. Verb-only labels ("Edit", "Copy", "Move", "Delete", "Share") would be 4-5x faster to process.',
        principle:
          'Menu items should be single verbs or minimal verb phrases for rapid scanning',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'macOS and iOS Interface Labels',
        description:
          'Apple consistently uses one-word labels throughout their interfaces: "Files", "Mail", "Maps", "Notes", "Music". Menu items follow the same pattern: "Edit", "Copy", "Paste", "Share". This creates an interface vocabulary that users can rehearse and recall effortlessly.',
        effectiveness: 'very-effective',
        analysis:
          'Apple\'s commitment to single-word naming extends from app names to menu items to button labels. This systematic brevity is a core reason their interfaces feel intuitive. Users can mentally rehearse the entire menu bar or dock contents within working memory limits.',
      },
      {
        company: 'Google',
        product: 'Material Design Label Guidelines',
        description:
          'Google Material Design guidelines explicitly recommend short button labels (1-2 words maximum) and concise navigation labels. Material buttons use "Save", "Cancel", "Delete" rather than verbose alternatives.',
        effectiveness: 'very-effective',
        analysis:
          'By codifying brevity in their design system, Google ensures consistency across all products. The guidelines acknowledge that shorter labels reduce cognitive load and improve scanning speed, directly applying the word length effect at scale.',
      },
      {
        company: 'Twitter/X',
        product: 'Character Limits and UI Labels',
        description:
          'Twitter\'s original 140-character limit forced concise communication. The interface itself uses minimal labels: "Post", "Reply", "Like", "Share". Navigation uses single words: "Home", "Search", "Alerts".',
        effectiveness: 'very-effective',
        analysis:
          'Twitter\'s entire design philosophy embraces brevity. Both user-generated content and interface labels are optimized for rapid processing. The constraint-driven approach produces interfaces where every word earns its place in working memory.',
      },
      {
        company: 'Slack',
        product: 'Channel Naming Conventions',
        description:
          'Slack encourages short channel names and uses brief labels throughout: "Threads", "DMs", "More". Channel name recommendations favor hyphenated short words over long descriptive names.',
        effectiveness: 'effective',
        analysis:
          'Short channel names allow users to scan the sidebar and maintain a mental map of their workspace. When teams use verbose channel names, the sidebar becomes unreadable and users rely on search instead of recognition.',
      },
    ],

    abTests: [
      {
        title: 'CTA Label Length: Short vs Verbose',
        hypothesis:
          'Single-word CTA labels will outperform multi-word labels on click-through rate',
        controlVersion: {
          description:
            'Product page with verbose CTA: "Add This Item To Your Shopping Cart"',
          metrics: {
            conversionRate: '3.2%',
            timeOnPage: '2:45',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Product page with concise CTA: "Buy"',
          metrics: {
            conversionRate: '5.1%',
            timeOnPage: '2:12',
            scrollDepth: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The single-word "Buy" CTA increased conversions by 59%. Time on page decreased because users identified and acted on the CTA faster. The short label reduced decision friction by eliminating unnecessary reading.',
          learnings: [
            'Single-word CTAs are identified 3-4x faster during visual scanning',
            'Verbose labels create micro-hesitations that compound into lower conversion',
            'Short labels work best when the action context is already clear from surrounding content',
            'The effect is strongest on mobile where screen space is limited',
          ],
        },
      },
      {
        title: 'Navigation Labels: One-Word vs Descriptive Phrases',
        hypothesis:
          'Single-word navigation labels will improve task completion speed and reduce navigation errors',
        controlVersion: {
          description:
            'Navigation bar with descriptive labels: "Our Products", "Help Center", "Company Blog", "Contact Us"',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '4.2s',
          },
        },
        treatmentVersion: {
          description:
            'Navigation bar with single-word labels: "Shop", "Help", "Blog", "Contact"',
          metrics: {
            conversionRate: '84%',
            timeOnPage: '2.8s',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Single-word nav labels improved task completion by 18% and reduced time to first navigation click by 33%. Users built stronger mental models of site structure and returned to correct sections more reliably in follow-up sessions.',
          learnings: [
            'Users can rehearse and recall single-word nav sets across sessions',
            'Descriptive phrases add no value when the section name is self-explanatory',
            'One-word labels create more uniform visual rhythm in navigation bars',
            'The improvement was most pronounced for returning users building familiarity',
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
        name: 'Long Button Labels',
        description:
          'Buttons or CTAs containing more than 2-3 words of text',
        howToSpot:
          'Scan for buttons with sentence-like text, multi-line button labels, or buttons that are significantly wider than others',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Verbose Navigation',
        description:
          'Navigation items using phrases instead of concise labels',
        howToSpot:
          'Check if nav items contain articles ("the", "our"), prepositions ("to", "for"), or descriptions instead of direct labels',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Long Menu Items',
        description:
          'Dropdown or context menu entries with sentence-length descriptions',
        howToSpot:
          'Look for menus where items wrap to multiple lines or vary dramatically in length',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Wordy Form Labels',
        description:
          'Form field labels using full phrases instead of minimal descriptors',
        howToSpot:
          'Check for labels like "Please enter your..." or "Your preferred..." instead of simple nouns',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Inconsistent Label Lengths',
        description:
          'Mix of very short and very long labels in the same group of elements',
        howToSpot:
          'Compare label lengths within nav bars, button groups, or tab sets; look for outliers that break visual rhythm',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Verbose CTA Pattern',
        description: 'Call-to-action buttons with more than 2 words',
        indicators: [
          'Button text containing articles or prepositions',
          'Multi-line button labels',
          'CTA buttons wider than 200px due to text length',
          'Sentence-case button text with 4+ words',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Phrase Navigation Pattern',
        description: 'Navigation using descriptive phrases instead of labels',
        indicators: [
          'Nav items containing "Our", "Your", "The"',
          'Navigation labels with 3+ words each',
          'Horizontal nav overflowing or wrapping due to text length',
          'Inconsistent nav item widths',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Long Microcopy Pattern',
        description: 'Tooltips, badges, or chips with unnecessarily verbose text',
        indicators: [
          'Tooltips requiring multiple lines',
          'Status badges with 3+ word labels',
          'Chip/tag text that truncates with ellipsis',
          'Placeholder text that reads like instructions',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can each navigation label be expressed in one word?',
      'Are CTA buttons limited to 1-2 words?',
      'Do menu items use single verbs (Edit, Copy, Delete) or full phrases?',
      'Can users rehearse all visible labels within 2 seconds?',
      'Are form labels minimal nouns or descriptive phrases?',
      'Do tooltips convey their message in 3 words or fewer?',
      'Are status badges and tags using concise labels?',
      'Is label length consistent within each group of related elements?',
      'Have verbose labels been tested against concise alternatives?',
      'Do longer accessible names complement short visible labels where needed?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the word length effect and working memory.

Analyze the provided design for word length effect patterns. Identify:

1. **Label Brevity**: How concise are button labels, navigation items, menu entries, and headings?
2. **Rehearsal Load**: Can users rehearse the visible labels within the 2-second phonological loop window?
3. **Scanning Speed**: How quickly can users identify and differentiate actions and sections?
4. **Consistency**: Are label lengths consistent within groups (nav bars, button sets, menus)?
5. **Clarity vs Brevity**: Are any labels too short to convey meaning, or too long for rapid processing?

For each issue found:
- Identify the verbose element and its location
- Suggest a shorter alternative that preserves meaning
- Assess the impact on scanning speed and memorability
- Consider accessibility implications (short visual label + longer aria-label)

Consider:
- Would a user remember this label after one exposure?
- Can the full navigation set be rehearsed in under 2 seconds?
- Are there unnecessary articles, prepositions, or filler words?
- Do translated versions remain concise?
- Is brevity sacrificing clarity in any safety-critical context?

Provide actionable recommendations for optimizing label length.`,

    outputSchema: {
      type: 'object',
      properties: {
        labelAnalysis: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              currentLabel: { type: 'string' },
              wordCount: { type: 'number' },
              suggestedLabel: { type: 'string' },
              rehearsalImpact: { type: 'string' },
              clarityPreserved: { type: 'boolean' },
            },
            required: [
              'element',
              'currentLabel',
              'wordCount',
              'suggestedLabel',
              'clarityPreserved',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            averageLabelLength: { type: 'number' },
            rehearsalFit: { type: 'number' },
            consistencyScore: { type: 'number' },
            brevityScore: { type: 'number' },
          },
          required: [
            'averageLabelLength',
            'rehearsalFit',
            'consistencyScore',
            'brevityScore',
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
        'labelAnalysis',
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
        title: 'Audit Existing Labels',
        description:
          'Inventory all interface labels: buttons, navigation, menus, form fields, tooltips, badges, and headings',
        example:
          'Create a spreadsheet listing every label, its word count, and its context',
        tips: [
          'Group labels by type (CTAs, nav, menus, forms)',
          'Flag any label with more than 2 words',
          'Note labels that wrap or truncate in the current layout',
        ],
      },
      {
        step: 2,
        title: 'Identify Shortening Opportunities',
        description:
          'For each verbose label, find the shortest word or phrase that preserves the intended meaning',
        example:
          '"Add This Item To Your Cart" becomes "Add" or "Buy"',
        tips: [
          'Remove articles (a, an, the), possessives (your, our), and filler words',
          'Prefer common single verbs for actions: Buy, Save, Edit, Copy, Share',
          'Prefer common single nouns for sections: Home, Shop, Docs, Help',
        ],
      },
      {
        step: 3,
        title: 'Test Comprehension',
        description:
          'Verify that shortened labels are still clear and unambiguous to users',
        example:
          'Run a quick card sort or first-click test with 5-10 users to validate understanding',
        tips: [
          'Watch for labels where brevity creates ambiguity',
          'Test with users unfamiliar with the product',
          'Check that shortened labels work in all supported languages',
        ],
      },
      {
        step: 4,
        title: 'Add Accessible Descriptions',
        description:
          'Where visual labels are very short, add longer aria-labels or sr-only text for screen reader users',
        example:
          'Button shows "Buy" visually, but aria-label reads "Buy Blue Widget, $29.99"',
        tips: [
          'Short visible labels serve sighted users; longer descriptions serve assistive tech',
          'Use aria-label, aria-describedby, or visually-hidden text',
          'Test with screen readers to confirm clarity',
        ],
      },
      {
        step: 5,
        title: 'Measure and Iterate',
        description:
          'Track scanning speed, task completion, and error rates before and after shortening labels',
        example:
          'A/B test verbose vs concise labels on key pages; measure CTR, task time, and nav errors',
        tips: [
          'Focus on high-traffic pages and primary CTAs first',
          'Monitor support tickets for confusion signals after shortening',
          'Iterate: some labels may need to be slightly longer for clarity',
        ],
      },
    ],

    dos: [
      'Use single-word labels for primary CTAs whenever possible',
      'Keep navigation items to 1-2 words maximum',
      'Use common verbs for action labels: Buy, Save, Edit, Copy, Share, Delete',
      'Maintain consistent label lengths within groups of related elements',
      'Pair short visible labels with longer accessible descriptions',
      'Test shortened labels for comprehension with real users',
      'Design layouts that accommodate brief labels without wasted space',
      'Apply the 2-second rule: users should be able to rehearse all visible labels in one group',
    ],

    donts: [
      'Don\'t abbreviate so aggressively that labels become cryptic or ambiguous',
      'Don\'t sacrifice clarity for brevity in safety-critical or legal contexts',
      'Don\'t mix dramatically different label lengths within the same element group',
      'Don\'t assume short English labels will remain short after translation',
      'Don\'t remove words that are necessary for disambiguation',
      'Don\'t use jargon or technical abbreviations to shorten labels for general audiences',
      'Don\'t truncate long labels with ellipsis as a substitute for writing shorter ones',
      'Don\'t ignore accessible descriptions when making visible labels very terse',
    ],

    bestPractices: [
      {
        title: 'One Word Per Action',
        description:
          'Express each action as a single verb: Buy, Save, Edit, Copy, Share, Delete, Send',
        rationale:
          'Single-verb actions are processed in a single phonological rehearsal cycle and are universally understood',
        example:
          '"Buy" instead of "Add to cart", "Save" instead of "Save changes"',
      },
      {
        title: 'One Word Per Section',
        description:
          'Name navigation sections with a single noun: Home, Shop, Docs, Blog, Help, Settings',
        rationale:
          'Users can rehearse a 5-7 item navigation set in under 2 seconds when each item is one word',
        example:
          '"Shop" instead of "Browse Our Products", "Help" instead of "Customer Support Center"',
      },
      {
        title: 'Short Labels + Long Descriptions',
        description:
          'Keep the visual label short for scanning speed; add longer text via tooltips, aria-labels, or help text',
        rationale:
          'This satisfies both the word length effect (fast scanning) and accessibility (full context)',
        example:
          'Button text: "Export" | Tooltip: "Export data as CSV" | aria-label: "Export report data as CSV file"',
      },
      {
        title: 'Consistent Length Within Groups',
        description:
          'All labels in a navigation bar, tab group, or button set should have similar word counts',
        rationale:
          'Consistent length creates visual rhythm and uniform scanning speed across the group',
        example:
          'Nav: "Home | Shop | Docs | Blog | Help" (all 1 word) rather than "Home | Browse Products | Documentation | Our Blog | Help Center"',
      },
      {
        title: 'Test With Translation',
        description:
          'Validate that short labels work across all target languages, accounting for translation expansion',
        rationale:
          'German, French, and other languages routinely produce labels 30-50% longer than English equivalents',
        example:
          'Design button width to accommodate 150% of English label length for i18n',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Labels must describe topic or purpose',
        implementation:
          'Short labels must still clearly describe their purpose. If a one-word label is ambiguous, add aria-label or aria-describedby with a more descriptive alternative.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure label-control relationships are programmatic',
        implementation:
          'Use proper <label> elements, aria-labelledby, or aria-label to connect short visible labels with their controls for assistive technology.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide labels when user input is required',
        implementation:
          'Short form labels ("Name", "Email") must still be present and visible. Do not remove labels entirely in pursuit of brevity; use concise labels instead.',
      },
      {
        wcagLevel: 'AAA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Components with same function have consistent labels',
        implementation:
          'Once you choose a short label (e.g., "Save"), use it consistently everywhere. Do not alternate between "Save", "Store", and "Keep" for the same action.',
      },
    ],

    ethics: [
      {
        concern: 'Oversimplification',
        severity: 'medium',
        explanation:
          'Shortening labels in complex domains (medical, legal, financial) can strip essential nuance from critical decisions',
        mitigation:
          'Use short labels for navigation and scanning, but provide full explanatory text in content areas, modals, and help documentation.',
      },
      {
        concern: 'Exclusion Through Jargon',
        severity: 'high',
        explanation:
          'Using domain-specific short words or abbreviations assumes expertise that not all users have',
        mitigation:
          'Choose universally understood words. Prefer "Buy" over "Procure", "Help" over "KB". Test with novice users.',
      },
      {
        concern: 'Accessibility Shortcutting',
        severity: 'high',
        explanation:
          'Optimizing only visible labels while neglecting accessible descriptions leaves assistive technology users with insufficient context',
        mitigation:
          'Always pair short visual labels with descriptive aria-labels, title attributes, or visually hidden text for screen readers.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Word Length and the Structure of Short-Term Memory',
        author: 'Baddeley, A. D., Thomson, N., & Buchanan, M.',
        year: 1975,
        doi: '10.1016/S0022-5371(75)80045-4',
        description:
          'The foundational paper establishing the word length effect and its link to the phonological loop in working memory',
        type: 'foundational',
      },
      {
        title: 'Working Memory',
        author: 'Baddeley, A. D., & Hitch, G.',
        year: 1974,
        description:
          'Introduces the multi-component model of working memory, including the phonological loop that underlies the word length effect',
        type: 'foundational',
      },
      {
        title: 'The Word Length Effect and Disyllabic Words',
        author: 'Cowan, N., Day, L., Saults, J. S., Keller, T. A., Johnson, T., & Flores, L.',
        year: 1992,
        description:
          'Extended research on word length effects with controlled syllable counts, refining the original findings',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Working Memory, Thought, and Action',
        author: 'Baddeley, Alan',
        year: 2007,
        isbn: '9780198528012',
        description:
          'Comprehensive treatment of working memory theory by its originator, including detailed coverage of the word length effect',
        type: 'foundational',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Practical UX guide advocating for concise labels and minimal cognitive load, directly applying word length principles',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Writing Microcopy',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/microcopy/',
        description:
          'Practical guidelines for writing concise, effective UI text including button labels and navigation',
        type: 'practical',
      },
      {
        title: 'Material Design: Writing Guidelines',
        author: 'Google',
        url: 'https://m3.material.io/foundations/content-design/style-guide/overview',
        description:
          'Google\'s guidelines for concise UI text, recommending short labels and clear action verbs',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Phonological Loop - Working Memory Model',
        author: 'Psych Explained',
        url: 'https://www.youtube.com/watch?v=9jnKGcPxZN4',
        description:
          'Visual explanation of the phonological loop mechanism underlying the word length effect',
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
      'serial-position-effect', // First and last items in short-word lists are recalled best
      'millers-law', // 7 +/- 2 items; shorter words allow more items in that span
      'cognitive-load', // Short labels reduce overall cognitive load
      'hicks-law', // Fewer words per option speeds decision time
    ],

    conflicts: [
      'ambiguity-aversion', // Overly short labels can create ambiguity users dislike
    ],

    confusedWith: [
      'chunking', // Both relate to working memory capacity but through different mechanisms
      'processing-fluency', // Related: shorter words are more fluent, but fluency is broader
    ],

    hierarchy: {
      parent: 'working-memory-limitations',
      children: [
        'label-brevity',
        'microcopy-optimization',
      ],
    },
  },
};
