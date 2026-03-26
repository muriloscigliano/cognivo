/**
 * PRIMACY EFFECT
 *
 * Items presented first in a sequence are remembered better
 * and have outsized influence on overall impression.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const primacyEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'primacy-effect',
    name: 'Primacy Effect',
    aliases: ['First Impression Effect', 'Order Effect', 'Serial Position Primacy'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'first-impression',
      'serial-position',
      'ordering',
      'recall',
      'sequence',
      'information-architecture',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Items presented first in a sequence are remembered better and carry more weight in forming overall impressions and decisions.',

    detailed: `The Primacy Effect is a cognitive bias where people tend to better remember and assign greater importance to information presented at the beginning of a sequence. When users encounter a list, menu, navigation, or series of options, the first items receive disproportionate attention, are more likely to be recalled, and exert outsized influence on the overall impression.

This effect operates through two reinforcing mechanisms: a memory advantage (first items are rehearsed more and transferred into long-term memory before cognitive load increases) and an attention advantage (users are most focused and least fatigued at the start of any sequence). Together, these create a powerful bias toward early-presented information.

In interface design, the primacy effect determines which navigation items get clicked, which features get adopted, which products get purchased, and which content shapes brand perception. The first screen of onboarding, the first feature shown, the first search result, and the opening hero section all benefit from primacy. Understanding this bias is essential for strategic information architecture, feature prioritization, and content sequencing.`,

    psychologyBasis: {
      discoveredBy: 'Solomon Asch',
      year: 1946,
      theory: 'Serial Position Effect',
      mechanism: `The brain processes and encodes early items in a sequence differently from later ones. This happens because:

1. **Rehearsal Advantage**: The first items in a list receive more rehearsal in working memory before subsequent items compete for attention, leading to stronger encoding into long-term memory
2. **Attention Peak**: Cognitive attention is highest at the beginning of any sequence and declines as more items are processed, giving early items a processing advantage
3. **Schema Formation**: The first items encountered establish the mental framework (schema) through which all subsequent items are interpreted and evaluated
4. **Impression Anchoring**: Initial items set expectations and create a reference point, biasing how later information is perceived and integrated
5. **Proactive Interference Absence**: Early items face no prior information competing for memory slots, while later items must compete with everything already encoded`,
    },

    realWorldExample: `In Asch's foundational 1946 experiments on impression formation, participants were given identical lists of personality traits describing a person, but in different orders. Those who heard "intelligent, industrious, impulsive, critical, stubborn, envious" formed significantly more favorable impressions than those who heard the same traits in reverse order ("envious, stubborn, critical, impulsive, industrious, intelligent"). The positive traits presented first created a favorable schema that colored interpretation of later negative traits, demonstrating that position alone—not content—drives the impression advantage.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Primacy Effect profoundly influences how users perceive products, navigate interfaces, and form lasting impressions. The first items in any sequence—whether navigation menus, feature lists, onboarding steps, or search results—receive disproportionate attention and memory encoding. Designers can leverage this to:

- Shape first impressions by leading with the strongest value proposition in hero sections
- Drive feature adoption by presenting key capabilities first in onboarding
- Influence navigation behavior by placing priority items at the start of menus
- Guide content consumption by sequencing the most important information first
- Establish brand perception through carefully crafted opening experiences`,

    whenToUse: [
      {
        title: 'Onboarding First Screen',
        scenario:
          'When introducing new users to your product for the first time',
        example:
          'Show the single most impressive and differentiating feature on the first onboarding screen, not a generic welcome message',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Prioritization',
        scenario: 'When listing product features or capabilities on a marketing page',
        example:
          'Lead with your strongest, most unique features first; place commodity features later in the list',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Navigation Menu Ordering',
        scenario: 'When organizing items in navigation bars, sidebars, or tab groups',
        example:
          'Place the most-used or highest-value navigation items at the beginning of the menu',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Search Results Ranking',
        scenario: 'When displaying search results or recommendation lists',
        example:
          'Ensure the most relevant and highest-quality results appear first, as they disproportionately shape satisfaction',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Hero Section Design',
        scenario: 'When designing the above-the-fold content of landing pages',
        example:
          'Present your core value proposition, strongest social proof, or most compelling visual in the hero section',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Email and Notification Content',
        scenario: 'When crafting emails, push notifications, or in-app messages',
        example:
          'Put the most important information or call-to-action in the subject line and first sentence',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Balanced Decision-Making',
        reason:
          'Primacy can bias users toward early options when all options should be weighed equally',
        consequence:
          'Users may choose the first option without properly evaluating alternatives',
        alternative:
          'Randomize option order or use visual strategies (grids, cards) that reduce sequential processing',
      },
      {
        title: 'Legal or Compliance Content',
        reason:
          'Burying important disclosures or terms after initial appealing content exploits primacy',
        consequence:
          'Users form positive impressions from early content and skip critical later disclosures',
        alternative:
          'Present important legal information prominently and early, not buried after marketing content',
      },
      {
        title: 'Objective Comparison Interfaces',
        reason:
          'When users need to make informed comparisons, primacy bias distorts evaluation',
        consequence:
          'First-listed products or options get unfair advantage regardless of actual merit',
        alternative:
          'Allow sorting, filtering, and provide comparison tools that reduce order dependence',
      },
      {
        title: 'Diverse Content Discovery',
        reason:
          'Always leading with the same content type reduces exploration of variety',
        consequence:
          'Users develop narrow mental models of what the product offers',
        alternative:
          'Rotate featured content and use personalization to surface different items first for different users',
      },
    ],

    commonMistakes: [
      {
        title: 'Wasting the First Position',
        description:
          'Placing generic, low-value content (welcome messages, filler text) in the first position instead of high-impact content',
        why: 'The first position has the strongest memory and impression advantage; wasting it on filler squanders the primacy effect',
        fix: 'Audit every sequence to ensure the first item is the strongest, most valuable, or most important',
      },
      {
        title: 'Ignoring Sequence Order in Lists',
        description:
          'Presenting features, benefits, or options in arbitrary or alphabetical order instead of strategic order',
        why: 'Users remember and favor early items; arbitrary ordering wastes the opportunity to highlight what matters most',
        fix: 'Order lists by strategic importance: strongest differentiator first, then supporting items',
      },
      {
        title: 'Overloading the First Screen',
        description:
          'Cramming too many items into the first view, diluting the primacy advantage',
        why: 'When everything competes for first position, nothing benefits from primacy',
        fix: 'Focus the first screen on one or two key items; use progressive disclosure for the rest',
      },
      {
        title: 'Inconsistent First Impressions',
        description:
          'Different entry points to the product show different first experiences',
        why: 'Users from different channels form different first impressions, creating inconsistent brand perception',
        fix: 'Ensure all entry points lead with a consistent core value proposition, adapted but aligned across channels',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines which content occupies the first visual position and shapes the sequence of information processing',
        examples: [
          'Hero sections create the first and strongest impression of the entire page',
          'F-pattern and Z-pattern reading behavior means top-left content is processed first',
          'Above-the-fold content benefits from primacy before users scroll',
          'Navigation items at the start of menus receive more clicks and better recall',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy reinforces which content is processed first and remembered',
        examples: [
          'Headings are read before body text, making headline copy critical for first impression',
          'Larger type draws the eye first, amplifying primacy for emphasized text',
          'The first sentence of any paragraph carries disproportionate weight',
          'Bold or highlighted opening phrases capture attention before supporting text',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color draws attention to specific items, influencing which elements are processed first',
        examples: [
          'High-contrast or brand-colored first elements attract initial attention',
          'Color-coded first items in lists establish category expectations',
          'Vibrant hero section colors create strong first visual impressions',
          'Muted colors on later items reinforce primacy of early, vivid items',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'The first interaction a user has with a product shapes their entire mental model',
        examples: [
          'First onboarding step sets expectations for product complexity and value',
          'First successful task completion anchors perceived product capability',
          'First error experience disproportionately affects trust and confidence',
          'Default selected options in the first position receive highest adoption',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content sequencing is the primary lever for the primacy effect—what users read first shapes interpretation of everything after',
        examples: [
          'First feature listed defines the product category in users\' minds',
          'Opening paragraph of any page sets the interpretive frame for the rest',
          'First testimonial shown shapes overall credibility perception',
          'First search result receives 30-40% of all clicks regardless of subsequent quality',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen reader and keyboard users experience content in DOM order, making source order a critical primacy factor',
        examples: [
          'Screen reader users encounter content in DOM order, not visual layout order',
          'Focus order determines which interactive elements keyboard users reach first',
          'ARIA landmarks and heading hierarchy establish priority for assistive technology users',
          'Skip navigation links change which content is experienced first',
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
        title: 'Strongest Feature First in Onboarding',
        description:
          'Product onboarding leading with the most differentiating feature rather than a generic welcome',
        code: `<div class="onboarding-step" data-step="1">
  <div class="feature-showcase">
    <h2>See your data come alive in seconds</h2>
    <p>Drop any CSV and watch instant visualizations appear—
    no configuration, no code, no waiting.</p>
    <div class="demo-preview">
      <video autoplay muted loop>
        <source src="instant-viz-demo.mp4" type="video/mp4">
      </video>
    </div>
    <button class="primary">Try it now with sample data</button>
  </div>
  <div class="step-indicator">
    <span class="current">1</span> of 4
  </div>
</div>`,
        explanation:
          'The first onboarding screen showcases the product\'s strongest differentiator—instant visualization—rather than a generic "Welcome to our app" message. This first impression anchors users\' perception of the product as fast and magical.',
        principle:
          'The first screen of onboarding disproportionately shapes product perception and retention',
        metrics: {
          before: '34% completed onboarding with generic welcome first',
          after: '58% completed onboarding with feature-first approach',
          improvement: '71% increase in onboarding completion rate',
        },
      },
      {
        title: 'Hero Section with Core Value Proposition',
        description:
          'Landing page hero leading with the single most compelling value proposition',
        code: `<section class="hero">
  <h1>Ship 10x faster with AI pair programming</h1>
  <p class="subtitle">
    Join 50,000+ developers who write production code
    in half the time. No learning curve.
  </p>
  <div class="social-proof">
    <div class="logos">
      <img src="google.svg" alt="Google">
      <img src="stripe.svg" alt="Stripe">
      <img src="shopify.svg" alt="Shopify">
    </div>
    <p class="stat">4.9/5 from 2,847 reviews</p>
  </div>
  <div class="cta-group">
    <button class="primary">Start free trial</button>
    <button class="secondary">Watch 2-min demo</button>
  </div>
</section>`,
        explanation:
          'The hero section leads with the strongest claim ("10x faster"), immediately backed by social proof (50,000 developers, major companies). This first impression creates a halo effect that colors perception of all subsequent page content.',
        principle:
          'First-position content in the hero sets the interpretive frame for the entire page',
      },
      {
        title: 'Strategic Navigation Menu Order',
        description:
          'Navigation bar ordered by user value and business priority, not alphabetically',
        code: `<nav class="main-nav" aria-label="Main navigation">
  <ul>
    <li><a href="/dashboard" class="active">Dashboard</a></li>
    <li><a href="/analytics">Analytics</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/team">Team</a></li>
    <li><a href="/integrations">Integrations</a></li>
    <li><a href="/settings">Settings</a></li>
  </ul>
</nav>`,
        explanation:
          'Dashboard and Analytics appear first because they are the highest-value, most-used features. Settings appears last because it is rarely accessed. This ordering leverages primacy to drive engagement with core product value.',
        principle:
          'Menu item position correlates with click-through rate; first items receive 2-3x more engagement',
      },
    ],

    bad: [
      {
        title: 'Generic Welcome Screen Wastes Primacy',
        description:
          'Onboarding starts with a generic welcome message instead of showing product value',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-step" data-step="1">
  <img src="mascot-waving.png" alt="Friendly mascot waving">
  <h2>Welcome to AppName! 👋</h2>
  <p>We're so glad you're here. Let's get you set up
  so you can start using all our amazing features.</p>
  <button class="primary">Let's go!</button>
</div>`,
        explanation:
          'The most valuable screen position is wasted on a generic welcome message that communicates nothing about the product. Users\' first impression is "another app with a mascot" instead of experiencing actual value.',
        principle:
          'Never waste the first position on filler content—use it for your strongest differentiator',
      },
      {
        title: 'Alphabetical Feature List',
        description:
          'Features listed alphabetically instead of by importance or impact',
        code: `<!-- DON'T DO THIS -->
<section class="features">
  <h2>Features</h2>
  <ul>
    <li>Accessibility compliance</li>
    <li>API access</li>
    <li>Automated backups</li>
    <li>Custom domains</li>
    <li>Data encryption</li>
    <li>Real-time collaboration</li>
    <li>Version history</li>
  </ul>
</section>`,
        explanation:
          'Alphabetical ordering places "Accessibility compliance" first—a useful but undifferentiating feature. The product\'s strongest feature, "Real-time collaboration", is buried near the bottom. Users will remember "accessibility" and "API" most, forming a weak impression of the product.',
        principle:
          'Alphabetical ordering ignores primacy entirely, letting arbitrary letter position determine what users remember',
      },
      {
        title: 'Burying Key Content Below the Fold',
        description:
          'Landing page leads with stock imagery instead of the value proposition',
        code: `<!-- DON'T DO THIS -->
<section class="hero">
  <img src="stock-photo-team.jpg" alt="Happy team at work"
       style="width: 100%; height: 600px; object-fit: cover;">
</section>
<section class="value-prop" style="margin-top: 40px;">
  <h1>The only analytics platform you'll ever need</h1>
  <p>Powerful insights, zero complexity.</p>
</section>`,
        explanation:
          'A generic stock photo occupies the entire first screen, pushing the actual value proposition below the fold. Users\' first impression is a meaningless image; many will leave before scrolling to the real content.',
        principle:
          'Above-the-fold content must carry the first impression; never waste it on decorative filler',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Search Results',
        description: 'The first organic search result receives approximately 31.7% of all clicks, the second receives 24.7%, and the third receives 18.7%. By position 10, click-through drops to 2.8%. Google leverages this by placing ads in the first position, and businesses invest heavily in SEO to rank first.',
        effectiveness: 'very-effective',
        analysis: 'Google Search is perhaps the most powerful real-world demonstration of the primacy effect. The first result\'s massive click advantage exists regardless of actual quality differences between results, proving that position alone drives disproportionate engagement.',
      },
      {
        company: 'Apple',
        product: 'App Store Screenshots',
        description: 'App Store listings show the first 2-3 screenshots without scrolling. Top-performing apps place their most compelling, feature-rich screenshots first. The first screenshot receives 10x more views than the fifth screenshot.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s App Store design amplifies the primacy effect by showing only the first few screenshots by default. Developers who place their strongest visual first see significantly higher conversion rates than those who lead with a splash screen or logo.',
      },
      {
        company: 'LinkedIn',
        product: 'Job Search Results',
        description: 'LinkedIn places the most relevant job listing first in search results. The first-listed job receives dramatically more applications than equally relevant jobs listed lower. LinkedIn\'s "Easy Apply" on the first result further amplifies the primacy advantage.',
        effectiveness: 'effective',
        analysis: 'The primacy effect combines with convenience bias here—users apply to the first job because it is both most memorable and requires the least effort (Easy Apply). Later listings suffer even when objectively better matches.',
      },
      {
        company: 'Spotify',
        product: 'Discover Weekly Playlist',
        description: 'Spotify places the songs most likely to engage users at the beginning of Discover Weekly playlists. The first 2-3 tracks set the impression of playlist quality and determine whether users continue listening or skip.',
        effectiveness: 'very-effective',
        analysis: 'Spotify uses algorithmic primacy optimization—placing the highest-confidence recommendations first. If the opening tracks miss, users abandon the playlist and satisfaction drops for the entire feature, regardless of later track quality.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Feature-First vs Welcome-First',
        hypothesis:
          'Leading onboarding with the core feature will improve completion and activation over a generic welcome screen',
        controlVersion: {
          description:
            'Onboarding starting with "Welcome to AppName! Let\'s get you set up" followed by feature tour',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '0:45',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Onboarding starting with interactive demo of the core feature, followed by setup steps',
          metrics: {
            conversionRate: '58%',
            timeOnPage: '2:10',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Leading with the core feature instead of a generic welcome increased onboarding completion by 71%. Users who experienced the feature first were 2.3x more likely to return on Day 2. The first screen created a lasting impression of product value that sustained engagement.',
          learnings: [
            'The first onboarding screen has outsized impact on activation and retention',
            'Interactive feature demos are more memorable than static welcome messages',
            'Users who see value first tolerate subsequent setup friction better',
            'First-screen impressions persist: Day 7 retention was 40% higher in treatment group',
          ],
        },
      },
      {
        title: 'Feature List: Strategic Order vs Alphabetical',
        hypothesis:
          'Ordering features by impact (strongest first) will improve perceived product value over alphabetical ordering',
        controlVersion: {
          description:
            'Marketing page with features listed alphabetically: API access, Backups, Custom domains, Encryption, Real-time collab, Version history',
          metrics: {
            conversionRate: '3.1%',
            timeOnPage: '1:15',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Marketing page with features ordered by impact: Real-time collaboration, AI-powered analytics, Version history, Custom domains, API access, Backups',
          metrics: {
            conversionRate: '5.4%',
            timeOnPage: '1:55',
            scrollDepth: '71%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Strategic ordering increased conversions by 74%. In recall tests, users remembered the first two features 4x better than later features, confirming the primacy memory advantage. Users in the treatment group also rated the product as "more innovative" and "more powerful."',
          learnings: [
            'Feature order significantly affects product perception and conversion',
            'Users recall the first 2-3 features in any list far better than later ones',
            'Leading with differentiating features creates stronger brand perception',
            'Alphabetical ordering actively harms products whose best features start with late letters',
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
        name: 'First-Position Content Quality',
        description:
          'Whether the first item in any sequence is the strongest or most valuable content',
        howToSpot:
          'Check hero sections, first menu items, first list entries, first onboarding screens—is the most compelling content first?',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Sequential Content Ordering',
        description:
          'Lists, menus, or options ordered strategically vs arbitrarily',
        howToSpot:
          'Look for alphabetical ordering, random ordering, or chronological ordering that ignores strategic importance',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Above-the-Fold Priority',
        description:
          'Whether high-value content occupies the first visible viewport',
        howToSpot:
          'Check if the most important content appears before the fold or if filler (stock images, generic text) wastes the first view',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Onboarding Opening',
        description:
          'Whether the first onboarding step delivers value or shows generic welcome content',
        howToSpot:
          'Look for "Welcome!" screens, mascots, or setup steps before any feature demonstration',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Navigation Item Placement',
        description:
          'Whether navigation menus place highest-value items in the first positions',
        howToSpot:
          'Check if menu order reflects user priorities and business goals, or if it is alphabetical or arbitrary',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Value-First Pattern',
        description: 'The most compelling content or feature is placed in the first position of any sequence',
        indicators: ['Hero sections with strong value propositions', 'Feature lists ordered by impact', 'Onboarding leading with core capability', 'Navigation prioritizing high-value items'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Wasted Primacy Pattern',
        description: 'First positions occupied by low-value, generic, or filler content',
        indicators: ['Generic "Welcome" onboarding screens', 'Stock imagery in hero sections', 'Alphabetically ordered feature lists', 'Navigation menus sorted by internal team names'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Strategic Sequence Pattern',
        description: 'Content deliberately ordered to shape progressive impression formation',
        indicators: ['Strongest testimonial shown first', 'Most impressive metric displayed first', 'Best case study featured at top', 'Most relevant search results ranked first'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'First-Click Dominance Pattern',
        description: 'First items in navigation or lists receiving disproportionate engagement',
        indicators: ['First menu item gets 3x+ clicks vs middle items', 'First search result gets 30%+ of clicks', 'First tab is selected by 60%+ of users', 'First card in a grid gets most interaction'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is the strongest value proposition in the first position users see?',
      'Does the hero section communicate core product value or waste space on decoration?',
      'Are features listed by strategic importance or by arbitrary order (alphabetical, chronological)?',
      'Does the first onboarding screen demonstrate product value or show a generic welcome?',
      'Are navigation items ordered by user priority and business value?',
      'Is the most compelling testimonial or social proof shown first?',
      'Does the first search result represent the best match for the query?',
      'Are email subject lines and first sentences carrying the most important message?',
      'Is above-the-fold content optimized for first impressions?',
      'Have you tested different orderings to measure primacy effect impact?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the primacy effect and serial position phenomena.

Analyze the provided design for primacy effect patterns. Identify:

1. **First-Position Content**: What appears first in each sequence (menus, lists, pages, flows)
2. **Information Architecture**: Whether content is ordered strategically or arbitrarily
3. **First Impressions**: What impression the opening content creates
4. **Onboarding Sequence**: Whether the first experience demonstrates value
5. **Navigation Priority**: Whether menu ordering reflects user and business priorities

For each pattern found:
- Identify what content occupies the first position
- Assess whether it is the strongest possible content for that position
- Determine if the ordering is strategic or arbitrary
- Evaluate the first impression created
- Suggest reordering improvements if needed

Consider:
- Is the most valuable content in the first position of each sequence?
- Are any first positions wasted on generic or filler content?
- Does the opening experience create the desired brand impression?
- Are lists and menus ordered to maximize the primacy advantage?
- Is the DOM/reading order consistent with the intended primacy?

Provide actionable recommendations for leveraging primacy effect strategically.`,

    outputSchema: {
      type: 'object',
      properties: {
        primacyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sequence: { type: 'string' },
              firstItem: { type: 'string' },
              isOptimal: { type: 'boolean' },
              impressionCreated: { type: 'string' },
              suggestedFirstItem: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'sequence',
              'firstItem',
              'isOptimal',
              'impressionCreated',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            firstImpressionScore: { type: 'number' },
            contentOrderingScore: { type: 'number' },
            onboardingPrimacyScore: { type: 'number' },
            navigationPriorityScore: { type: 'number' },
          },
          required: [
            'firstImpressionScore',
            'contentOrderingScore',
            'onboardingPrimacyScore',
            'navigationPriorityScore',
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
        'primacyPatterns',
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
        title: 'Audit Every First Position',
        description:
          'Identify every sequence in your product (menus, lists, onboarding, pages) and evaluate what currently occupies the first position',
        example:
          'Map all sequences: navigation menu, feature list, onboarding flow, search results, dashboard widgets',
        tips: [
          'Create an inventory of all ordered sequences in the product',
          'Note which first positions are strategic vs arbitrary',
          'Identify wasted first positions (generic welcomes, alphabetical ordering)',
        ],
      },
      {
        step: 2,
        title: 'Determine Optimal First Items',
        description:
          'For each sequence, determine what content would create the strongest first impression or drive the most value',
        example:
          'Onboarding first screen: interactive demo of core feature instead of welcome message',
        tips: [
          'Prioritize by impact: strongest differentiator, highest-value feature, most compelling proof',
          'Consider both user value and business objectives',
          'Different user segments may need different first items (personalization)',
        ],
      },
      {
        step: 3,
        title: 'Reorder Content Strategically',
        description:
          'Resequence lists, menus, and flows to place the strongest content first',
        example:
          'Reorder feature list: AI Analytics (differentiator) first, then Real-time Collaboration, then Data Import (commodity)',
        tips: [
          'Lead with differentiators, follow with supporting items',
          'Place commodity features and settings last',
          'Ensure DOM order matches intended visual priority for accessibility',
        ],
      },
      {
        step: 4,
        title: 'Optimize Above-the-Fold Content',
        description:
          'Ensure the first viewport communicates maximum value before any scrolling',
        example:
          'Hero: strong headline + social proof + CTA visible without scrolling',
        tips: [
          'Remove decorative elements that push value content below the fold',
          'Test on multiple screen sizes to ensure first-view content is strong',
          'Measure scroll depth to understand how many users see below-fold content',
        ],
      },
      {
        step: 5,
        title: 'Test and Measure Order Effects',
        description:
          'A/B test different orderings to quantify the primacy effect on your specific audience',
        example:
          'Test: Feature A first vs Feature B first on landing page; measure conversion and recall',
        tips: [
          'Measure both behavioral metrics (clicks, conversions) and recall metrics (surveys)',
          'Test with new users who have no prior exposure',
          'Track long-term metrics (retention, activation) not just immediate clicks',
        ],
      },
    ],

    dos: [
      'Place your strongest value proposition in the hero section and first onboarding screen',
      'Order feature lists by strategic importance, not alphabetically',
      'Put the most-used navigation items at the beginning of menus',
      'Lead with your most compelling testimonial or social proof',
      'Ensure the first search result is the highest-quality match',
      'Put the most important information in email subject lines and first sentences',
      'Test different orderings to measure primacy effect impact',
      'Ensure DOM order matches visual priority for screen reader users',
      'Use the first position to set the interpretive frame for subsequent content',
      'Audit all first positions regularly as product and priorities evolve',
    ],

    donts: [
      'Don\'t waste first positions on generic welcome messages or filler content',
      'Don\'t order features, menus, or lists alphabetically when strategic ordering is possible',
      'Don\'t let decorative images push value content below the fold',
      'Don\'t place your best content in the middle or end of sequences',
      'Don\'t assume users will scroll or read past the first few items',
      'Don\'t use the same first-position content for all user segments when personalization is possible',
      'Don\'t ignore DOM/reading order when designing for visual primacy',
      'Don\'t exploit primacy to bury important disclosures after appealing content',
    ],

    bestPractices: [
      {
        title: 'First Screen = Best Feature',
        description:
          'The first screen of any flow should demonstrate your product\'s most compelling capability',
        rationale:
          'Users form lasting impressions in the first 5-10 seconds; show value immediately',
        example:
          'Instead of "Welcome to AppName", show an interactive demo of the core feature with sample data',
      },
      {
        title: 'Strategic Menu Ordering',
        description:
          'Order navigation items by user priority and business value, not by team structure or alphabet',
        rationale:
          'First and last menu items receive the most attention (primacy + recency); middle items are often ignored',
        example:
          'Dashboard, Analytics, Projects, Team, Integrations, Settings (value-ordered, not alphabetical)',
      },
      {
        title: 'Lead with Differentiators',
        description:
          'In any feature list, place unique differentiating features before commodity features',
        rationale:
          'Users remember the first 2-3 features; those should define your product\'s identity',
        example:
          'Lead with "AI-Powered Insights" (unique) not "Data Export" (commodity every competitor has)',
      },
      {
        title: 'Optimize Email First Lines',
        description:
          'Place the most important information and CTA in the subject line and first sentence of emails',
        rationale:
          'Email previews show only subject + first line; primacy determines open and click rates',
        example:
          'Subject: "Your revenue grew 23% this week" not "Weekly Newsletter #47"',
      },
      {
        title: 'Personalize First Position',
        description:
          'Use personalization to show different first-position content to different user segments',
        rationale:
          'Different users have different priorities; the optimal first item varies by segment',
        example:
          'Show "Analytics" first for data-driven users; show "Templates" first for creative users',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - DOM order must match intended reading and priority order',
        implementation:
          'Ensure the DOM/source order places first-priority content first, not relying solely on CSS positioning or visual layout to create primacy',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.1',
        guideline:
          'Bypass Blocks - Skip navigation affects which content users encounter first',
        implementation:
          'Skip links change the effective first position for keyboard and screen reader users; ensure they skip to high-value content, not filler',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Heading hierarchy establishes content priority',
        implementation:
          'Use heading levels to reinforce primacy; the h1 should convey the most important message, not a generic page title',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.3',
        guideline:
          'Focus Order - Tab order determines primacy for keyboard users',
        implementation:
          'Ensure tab order places the most important interactive elements first so keyboard users encounter high-value content before low-value elements',
      },
    ],

    ethics: [
      {
        concern: 'Burying Critical Disclosures',
        severity: 'critical',
        explanation:
          'Exploiting primacy by placing appealing content first and burying important disclosures, terms, or warnings later in the sequence',
        mitigation:
          'Present important legal, safety, or financial disclosures prominently and early. Do not use primacy to distract from critical information.',
      },
      {
        concern: 'Manipulative Search Ranking',
        severity: 'high',
        explanation:
          'Placing paid or self-serving results first without disclosure, exploiting users\' primacy-driven tendency to click the first result',
        mitigation:
          'Clearly label sponsored or promoted results. Ensure organic first results are genuinely most relevant.',
      },
      {
        concern: 'Default Bias Exploitation',
        severity: 'high',
        explanation:
          'Placing the most profitable (but not necessarily best) option first, knowing primacy and default bias will drive selection',
        mitigation:
          'Place the option that best serves users in the first position, not the option that maximizes revenue at user expense.',
      },
      {
        concern: 'Suppressing Alternatives',
        severity: 'medium',
        explanation:
          'Using primacy to make one option dominant while making alternatives harder to discover',
        mitigation:
          'Ensure all viable options are accessible and that primacy advantage is used for the genuinely best option, not to suppress competition.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Forming Impressions of Personality',
        author: 'Asch, S. E.',
        year: 1946,
        description:
          'The foundational study demonstrating that trait order affects personality impressions—first traits shape interpretation of later traits',
        type: 'foundational',
      },
      {
        title: 'The Serial Position Effect of Free Recall',
        author: 'Murdock, B. B.',
        year: 1962,
        doi: '10.1037/h0045106',
        description:
          'Seminal paper documenting both primacy and recency effects in free recall, establishing the serial position curve',
        type: 'foundational',
      },
      {
        title: 'Primacy Effects in Personality Impression Formation',
        author: 'Anderson, N. H., & Barrios, A. A.',
        year: 1961,
        description:
          'Extended Asch\'s work showing primacy in impression formation across different personality trait combinations',
        type: 'advanced',
      },
      {
        title: 'Order Effects in Impression Formation',
        author: 'Jones, E. E., & Goethals, G. R.',
        year: 1972,
        description:
          'Comprehensive review of order effects including primacy and recency in social perception',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers serial position effects and their role in judgment and decision-making within the broader framework of cognitive biases',
        type: 'foundational',
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman, Don',
        year: 2013,
        isbn: '9780465050659',
        description:
          'Discusses how information ordering and first impressions shape usability and product perception',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Serial Position Effect: How First and Last Items Affect Memory',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/serial-position-effect/',
        description:
          'Practical UX guide to leveraging serial position effects in interface design',
        type: 'practical',
      },
      {
        title: 'The First Click: How Initial Navigation Choices Shape User Experience',
        author: 'Baymard Institute',
        url: 'https://baymard.com/blog/first-click-testing',
        description:
          'Research on how the first click in navigation determines task success rates',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Serial Position Effect',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/watch?v=K2CE0mN4rKA',
        description:
          'Visual explanation of primacy and recency effects with memory experiment demonstrations',
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
      'recency-effect',       // Together they form the serial position effect (U-shaped recall curve)
      'anchoring-bias',       // First items act as anchors for subsequent evaluation
      'halo-effect',          // Positive first impression creates a halo that colors later perception
      'peak-end-rule',        // Primacy (peak) and recency (end) together determine overall evaluation
    ],

    conflicts: [
      'recency-effect',       // Recency favors last items; primacy favors first—they compete for influence
      'serial-position-effect', // Primacy is a component of serial position, which also includes recency
    ],

    confusedWith: [
      'anchoring-bias',       // Anchoring uses first numbers; primacy is broader—first items in any sequence
      'halo-effect',          // Halo is about one trait coloring others; primacy is about position in a sequence
      'first-impression-bias', // Closely related but first impression is about initial encounters, primacy about sequential position
    ],

    hierarchy: {
      parent: 'serial-position-effect',
      children: [
        'first-impression-bias',
        'order-effect',
      ],
    },
  },
};
