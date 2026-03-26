/**
 * PRIMACY-RECENCY EFFECT (Serial Position Effect)
 *
 * We remember first and last items better than middle ones
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const primacyRecencyEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'primacy-recency-effect',
    name: 'Primacy-Recency Effect',
    aliases: ['Serial Position Effect', 'Position Effect', 'First-Last Bias'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'memory',
      'ordering',
      'lists',
      'navigation',
      'content-sequencing',
      'serial-position',
      'recall',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We remember first and last items better than middle ones',

    detailed: `The Primacy-Recency Effect (also known as the Serial Position Effect) describes the tendency for people to best remember items at the beginning (primacy) and end (recency) of a sequence, while items in the middle are recalled least accurately. This creates a U-shaped recall curve when memory accuracy is plotted against list position.

The primacy effect occurs because early items receive more rehearsal and are encoded into long-term memory. The recency effect occurs because the most recent items are still active in short-term (working) memory. Items in the middle suffer from both insufficient rehearsal and displacement from working memory.

In UX design, this effect has profound implications for how information should be ordered in navigation menus, feature lists, onboarding flows, content sequences, and any interface where users encounter items in a series. Strategic placement of the most important elements at the beginning and end of sequences dramatically improves recall, engagement, and action rates.`,

    psychologyBasis: {
      discoveredBy: 'Hermann Ebbinghaus',
      year: 1885,
      theory: 'Serial Position Effect / Memory Curve Research',
      mechanism: `The brain processes items at different serial positions through distinct memory systems, creating predictable patterns in recall:

1. **Primacy Effect**: First items receive more rehearsal because working memory is not yet loaded. They transfer to long-term memory more effectively. First impressions also carry disproportionate weight in forming judgments.
2. **Recency Effect**: Last items remain active in short-term working memory (capacity ~7 items, duration ~20 seconds). They are immediately available for recall without requiring retrieval from long-term storage.
3. **Middle Decay**: Items in the middle compete with earlier items for rehearsal time and are displaced from working memory by later items. They fall into a recall "dead zone."
4. **Distinctiveness Bonus**: Items that break the pattern (via the Von Restorff effect) can overcome middle-position disadvantage, but by default the U-shaped curve dominates.
5. **Temporal Context**: The recency effect weakens with delay (filled with distraction), while the primacy effect is more durable because it relies on long-term memory encoding.`,
    },

    realWorldExample: `In Bennet Murdock's 1962 free-recall experiments, participants were presented with lists of 20-40 words at a rate of one per second. When asked to recall as many words as possible in any order, they consistently produced a U-shaped serial position curve: the first 3-4 words and last 3-4 words were recalled 80-90% of the time, while middle words dropped to 20-30% recall. This pattern held regardless of list length, word type, or participant demographics, establishing the serial position effect as one of the most robust findings in memory research.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Primacy-Recency Effect fundamentally shapes how users process and remember information in any ordered sequence. Designers can leverage this to:

- Place the most critical navigation items at the start and end of menus
- Position key features at the top and bottom of feature lists
- Structure onboarding flows so the first and last steps make the strongest impression
- Order content so the most important messages appear first and last
- Design carousels and sliders with strategic first/last slide content
- Sequence email and notification content for maximum retention`,

    whenToUse: [
      {
        title: 'Navigation Menus',
        scenario:
          'When designing primary navigation with multiple items',
        example:
          'Place "Home" and "Dashboard" (most-used) at the start, and "Account" or "Settings" at the end of the nav bar. Avoid burying critical items like "Help" in the middle.',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Lists and Pricing Pages',
        scenario: 'When presenting product features or plan comparisons',
        example:
          'Lead with your strongest differentiating feature and close with the most compelling benefit. Middle features should be supporting details.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Sequences',
        scenario: 'When guiding new users through a multi-step introduction',
        example:
          'Make the first onboarding step deliver an immediate "aha moment" and the last step end with a strong call-to-action or reward. Middle steps handle configuration.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content and Copywriting',
        scenario: 'When writing emails, landing pages, or product descriptions',
        example:
          'Open emails with the most compelling hook and close with a clear CTA. Avoid placing the key ask in the middle of a long paragraph.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Carousel and Slider Design',
        scenario: 'When presenting content in horizontal scrolling carousels',
        example:
          'Place the highest-value content in the first visible slide and the strongest CTA in the last slide. Users are least likely to engage with middle slides.',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Form and Survey Design',
        scenario: 'When designing multi-field forms or survey questionnaires',
        example:
          'Start with easy, engaging questions to build momentum and end with the most important question. Place less critical fields in the middle.',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Alphabetical or Logical Ordering Requirements',
        reason:
          'Some lists (country selectors, alphabetical directories) require standardized ordering for usability',
        consequence:
          'Users cannot find items if an expected ordering convention is broken for memorability optimization',
        alternative:
          'Use search, filtering, or visual emphasis (bold, color) on key items instead of reordering',
      },
      {
        title: 'Legal or Compliance Content',
        reason:
          'Terms of service, consent forms, and legal disclosures require all items to receive equal attention',
        consequence:
          'Burying critical legal information in low-recall positions could be manipulative or non-compliant',
        alternative:
          'Use equal visual weight, checkboxes, or forced scrolling to ensure all content is read',
      },
      {
        title: 'Accessibility-Sensitive Contexts',
        reason:
          'Screen reader users and keyboard navigators may process lists differently than visual scanners',
        consequence:
          'Position optimization for sighted users may not transfer to assistive technology users',
        alternative:
          'Combine position strategy with ARIA labels, semantic importance markers, and heading levels',
      },
      {
        title: 'Randomized or Fair Selection Interfaces',
        reason:
          'Candidate lists, voting ballots, or any context requiring fairness should not exploit position bias',
        consequence:
          'First and last candidates receive unfair advantage in recall and selection rates',
        alternative:
          'Randomize order per user session or use grid layouts that minimize serial position effects',
      },
    ],

    commonMistakes: [
      {
        title: 'Burying Key Actions in the Middle',
        description:
          'Placing the most important navigation item or CTA in the middle of a long list',
        why: 'Middle items fall into the recall dead zone and receive 30-60% less engagement than first/last items',
        fix: 'Audit your navigation and feature lists. Move high-priority items to first or last position.',
      },
      {
        title: 'Overly Long Lists Without Breaks',
        description:
          'Presenting 15+ items in a single unbroken list, creating a vast middle dead zone',
        why: 'The longer the list, the deeper the middle recall trough. Users remember only the first and last ~3 items.',
        fix: 'Break long lists into chunked groups of 5-7 items with clear headers. Each subgroup gets its own primacy/recency positions.',
      },
      {
        title: 'Ignoring Recency in Multi-Page Flows',
        description:
          'Ending a multi-step flow with a weak summary or generic confirmation page',
        why: 'The last screen is what users remember most vividly. A weak ending undermines the entire experience.',
        fix: 'End flows with a strong value reinforcement, celebration moment, or clear next action.',
      },
      {
        title: 'Weak Opening Impressions',
        description:
          'Starting a feature tour, onboarding, or landing page with generic or low-value content',
        why: 'The primacy effect means first impressions disproportionately shape overall perception and recall',
        fix: 'Lead with your most differentiating value proposition or most impressive capability.',
      },
      {
        title: 'Inconsistent Position Importance',
        description:
          'Placing important items first in one section but last in another, with no pattern',
        why: 'Users build mental models of where to find important items. Inconsistency breaks that model.',
        fix: 'Establish a consistent information architecture where importance-first ordering is predictable.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines the serial position of every element, directly controlling what users see first and last',
        examples: [
          'Top-of-page and bottom-of-page content receives disproportionate recall and engagement',
          'Left-to-right reading order creates primacy for leftmost items in horizontal layouts',
          'Navigation bars leverage position: first tab and last tab get the most clicks',
          'Grid layouts partially mitigate serial position effects compared to linear lists',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can reinforce or counteract position effects through visual emphasis',
        examples: [
          'Bold or larger text on middle items can partially overcome their recall disadvantage',
          'Consistent typography across list items preserves the natural serial position curve',
          'Heading hierarchy signals importance independent of position',
          'Typographic contrast (size, weight, color) creates a Von Restorff effect that breaks position patterns',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color emphasis can rescue middle-position items from the recall dead zone',
        examples: [
          'Highlighted or color-accented middle items get a distinctiveness boost',
          'Consistent color across items preserves the natural position curve',
          'Background color changes between groups create new primacy/recency boundaries',
          'Status colors (green/red/amber) add semantic emphasis independent of position',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive sequences create their own serial position curves with first and last interactions remembered best',
        examples: [
          'First interaction with a product sets the tone (primacy); last interaction shapes lasting impression (recency)',
          'Onboarding step 1 and the final step are recalled most clearly in user research',
          'The last action before closing an app persists as the dominant memory of that session',
          'Infinite scroll eliminates the recency anchor, making the last-seen item arbitrary',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content sequencing is the primary domain of the primacy-recency effect and determines what messages stick',
        examples: [
          'Opening and closing paragraphs of emails drive open-to-click rates',
          'First and last bullet points in a list are recalled at 2-3x the rate of middle items',
          'Product descriptions should lead and close with the strongest selling points',
          'Blog post introductions and conclusions shape reader takeaways more than body content',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen readers present content in strict linear order, making serial position even more impactful for non-visual users',
        examples: [
          'Screen reader users rely entirely on reading order; visual scanning cannot compensate for poor positioning',
          'Keyboard tab order creates its own serial position sequence for interactive elements',
          'Skip-to-content links let users jump to primary content, altering the effective starting position',
          'ARIA landmarks create section boundaries that reset the serial position curve for assistive technology',
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
        title: 'Strategic Navigation Ordering',
        description:
          'Primary navigation placing the most important items at first and last positions',
        code: `<nav class="main-nav" aria-label="Primary navigation">
  <ul>
    <!-- PRIMACY: Most important items first -->
    <li><a href="/dashboard" class="nav-item active">Dashboard</a></li>
    <li><a href="/projects" class="nav-item">Projects</a></li>

    <!-- MIDDLE: Supporting items -->
    <li><a href="/reports" class="nav-item">Reports</a></li>
    <li><a href="/team" class="nav-item">Team</a></li>
    <li><a href="/integrations" class="nav-item">Integrations</a></li>

    <!-- RECENCY: Key utility items last -->
    <li><a href="/help" class="nav-item">Help</a></li>
    <li><a href="/settings" class="nav-item">Settings</a></li>
  </ul>
</nav>`,
        explanation:
          'Dashboard (most-used) occupies the primacy position. Settings and Help (frequently needed, important for support) occupy recency positions. Middle items are useful but less critical for recall.',
        principle:
          'Place highest-priority navigation items at the first and last positions for maximum recall and discoverability',
        metrics: {
          before: '42% of users reported difficulty finding Help (buried in middle of 8-item nav)',
          after: '89% found Help immediately after moving it to last position',
          improvement: '112% improvement in Help page discovery rate',
        },
      },
      {
        title: 'Feature List with Strategic Ordering',
        description:
          'Product feature list leading and closing with the strongest differentiators',
        code: `<section class="features">
  <h2>Why Teams Choose Us</h2>
  <ul class="feature-list">
    <!-- PRIMACY: Lead with the "wow" feature -->
    <li class="feature-item">
      <h3>AI-Powered Insights</h3>
      <p>Get automatic analysis of your data with actionable recommendations</p>
    </li>

    <!-- MIDDLE: Supporting features -->
    <li class="feature-item">
      <h3>Custom Dashboards</h3>
      <p>Build personalized views with drag-and-drop widgets</p>
    </li>
    <li class="feature-item">
      <h3>Team Collaboration</h3>
      <p>Share, comment, and co-edit in real time</p>
    </li>
    <li class="feature-item">
      <h3>100+ Integrations</h3>
      <p>Connect with the tools you already use</p>
    </li>

    <!-- RECENCY: Close with trust/security (lasting impression) -->
    <li class="feature-item">
      <h3>Enterprise-Grade Security</h3>
      <p>SOC 2 Type II certified with end-to-end encryption</p>
    </li>
  </ul>
</section>`,
        explanation:
          'The AI feature (differentiator) anchors the primacy position, creating a strong first impression of innovation. Enterprise security (trust builder) closes the list, leaving a lasting impression of reliability. Supporting features fill the middle.',
        principle:
          'Lead with your differentiator, close with your trust builder, and fill the middle with supporting evidence',
      },
      {
        title: 'Email with Position-Optimized Content',
        description:
          'Marketing email placing key messages in first and last paragraphs',
        code: `<div class="email-body">
  <!-- PRIMACY: Hook with the strongest value prop -->
  <p class="opening">
    <strong>Your team just saved 47 hours this month</strong> with automated
    reporting — that's nearly a full work week back for strategic thinking.
  </p>

  <!-- MIDDLE: Supporting details -->
  <p>Here's a breakdown of your usage this month:</p>
  <ul>
    <li>Reports generated: 142</li>
    <li>Data sources connected: 8</li>
    <li>Team members active: 12</li>
  </ul>

  <!-- RECENCY: Close with clear CTA (what they'll remember) -->
  <p class="closing">
    <strong>Unlock even more time savings</strong> — upgrade to Pro and
    get AI-powered insights that write your reports for you.
  </p>
  <a href="/upgrade" class="cta-button">Upgrade to Pro</a>
</div>`,
        explanation:
          'The opening line delivers immediate value (47 hours saved) to hook attention via primacy. The closing line contains the CTA and upgrade pitch, leveraging recency for the action the sender most wants remembered.',
        principle:
          'Open emails with proven value, close with the desired action. Middle content supports but is recalled least.',
        metrics: {
          before: 'CTA in middle paragraph: 2.3% click-through rate',
          after: 'CTA in closing paragraph: 5.1% click-through rate',
          improvement: '122% increase in email click-through rate',
        },
      },
    ],

    bad: [
      {
        title: 'Critical Action Buried in Middle of Long Menu',
        description:
          'Important menu item lost in the middle of 10+ options',
        code: `<!-- DON'T DO THIS -->
<nav class="sidebar-nav">
  <a href="/home">Home</a>
  <a href="/feed">Feed</a>
  <a href="/explore">Explore</a>
  <a href="/saved">Saved</a>
  <a href="/messages">Messages</a>
  <!-- KEY ACTION BURIED IN MIDDLE -->
  <a href="/create">Create New Project</a>
  <a href="/analytics">Analytics</a>
  <a href="/archive">Archive</a>
  <a href="/trash">Trash</a>
  <a href="/settings">Settings</a>
</nav>`,
        explanation:
          '"Create New Project" is the primary action for this app, yet it sits at position 6 of 10 — deep in the recall dead zone. Users will remember Home, Feed (primacy) and Trash, Settings (recency) but struggle to recall or locate the Create action.',
        principle:
          'Never bury the primary user action in the middle of a long navigation list',
      },
      {
        title: 'Key Features Lost in Middle of Feature Grid',
        description:
          'Strongest differentiators placed in middle positions of a feature comparison',
        code: `<!-- DON'T DO THIS -->
<table class="feature-comparison">
  <tr><td>Basic Templates</td><td>✓</td><td>✓</td><td>✓</td></tr>
  <tr><td>File Storage</td><td>1GB</td><td>10GB</td><td>100GB</td></tr>
  <tr><td>Email Support</td><td>✓</td><td>✓</td><td>✓</td></tr>
  <!-- BEST FEATURES BURIED IN MIDDLE -->
  <tr><td>AI Recommendations</td><td>—</td><td>✓</td><td>✓</td></tr>
  <tr><td>Real-Time Collaboration</td><td>—</td><td>✓</td><td>✓</td></tr>
  <tr><td>Advanced Analytics</td><td>—</td><td>—</td><td>✓</td></tr>
  <!-- WEAK FEATURES AT END -->
  <tr><td>Custom Branding</td><td>—</td><td>✓</td><td>✓</td></tr>
  <tr><td>API Access</td><td>—</td><td>—</td><td>✓</td></tr>
</table>`,
        explanation:
          'The strongest differentiators (AI Recommendations, Real-Time Collaboration, Advanced Analytics) are sandwiched in the middle of the table. Users scanning the comparison will best remember the first rows (generic features) and last rows (niche features), missing the actual selling points.',
        principle:
          'Feature comparison tables should lead with differentiators and close with trust builders, not generic capabilities',
      },
      {
        title: 'Weak Onboarding Start and End',
        description:
          'Onboarding flow starting with terms acceptance and ending with a generic confirmation',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding">
  <!-- STEP 1: Weak primacy — boring legal requirement -->
  <div class="step active">
    <h2>Accept Terms of Service</h2>
    <p>Please read and accept our terms before continuing.</p>
    <textarea readonly>Lorem ipsum legal text...</textarea>
    <label><input type="checkbox"> I accept</label>
  </div>

  <!-- STEP 2-3: Setup (fine in middle) -->

  <!-- STEP 4: Weak recency — generic confirmation -->
  <div class="step">
    <h2>Setup Complete</h2>
    <p>Your account has been created successfully.</p>
    <button>Go to Dashboard</button>
  </div>
</div>`,
        explanation:
          'The onboarding starts with a friction-heavy legal step (terrible primacy — first impression is bureaucratic) and ends with a generic "Setup Complete" message (wasted recency — last impression is forgettable). Both the first and last touchpoints, which shape lasting memory, are squandered.',
        principle:
          'Never waste the primacy or recency positions on low-value content. First and last impressions define the remembered experience.',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Search Results',
        url: 'https://www.google.com',
        description:
          'Google search results heavily exploit position effects. The first result gets ~28% of all clicks, the second ~15%, and click rates drop steeply through the middle. Results at the bottom of page 1 see a slight uptick due to recency before the page break. Google places ads at position 1 (primacy) and sometimes at the bottom (recency) for maximum impact.',
        effectiveness: 'very-effective',
        analysis:
          'The entire SEO industry exists because of the serial position effect applied to search results. First-position organic results receive 10x the clicks of middle-position results. Google strategically places paid ads at both primacy and recency positions.',
      },
      {
        company: 'Netflix',
        product: 'Content Carousels',
        url: 'https://www.netflix.com',
        description:
          'Netflix places its strongest recommendations at the first position of each carousel row and uses the "hero" position (top of page) for its highest-confidence pick. The first visible title in each row receives disproportionate engagement. Last items before the scroll boundary also see elevated click rates.',
        effectiveness: 'very-effective',
        analysis:
          'Netflix optimizes for the serial position effect by placing algorithmically predicted best matches at position 1 in every row. Their A/B testing has confirmed that first-position placement drives 2-3x more engagement than middle carousel positions.',
      },
      {
        company: 'Amazon',
        product: 'Customer Reviews',
        url: 'https://www.amazon.com',
        description:
          'Amazon displays the "most helpful" review first on every product page, knowing this review disproportionately shapes purchase decisions. The first review a shopper reads anchors their perception of the product. Amazon also shows a "most recent" review, leveraging recency to demonstrate current relevance.',
        effectiveness: 'very-effective',
        analysis:
          'The first review seen has outsized influence on conversion. Amazon found that a negative first review reduces conversion by up to 50%, while a positive detailed first review can increase it by 30%. This is primacy effect in action.',
      },
      {
        company: 'Spotify',
        product: 'Playlist and Discover Weekly Ordering',
        url: 'https://www.spotify.com',
        description:
          'Spotify opens Discover Weekly playlists with songs most likely to match the user\'s taste (highest confidence picks), creating a strong first impression. The playlist closes with a slightly unexpected but high-quality track to leave a memorable ending that encourages return.',
        effectiveness: 'effective',
        analysis:
          'By front-loading the strongest matches and ending with a discovery moment, Spotify leverages both primacy (great first impression) and recency (memorable ending) to maximize user satisfaction and return rates for algorithmically generated playlists.',
      },
    ],

    abTests: [
      {
        title: 'Navigation Item Positioning - CTA at Middle vs End',
        hypothesis:
          'Moving the primary CTA from middle to last position in navigation will increase click-through rate',
        controlVersion: {
          description:
            'Navigation bar with "Create Project" at position 4 of 7: Home | Projects | Reports | Create Project | Team | Help | Settings',
          metrics: {
            clickThroughRate: '8.2%',
            timeToFind: '4.7 seconds',
            taskCompletionRate: '71%',
          },
        },
        treatmentVersion: {
          description:
            'Navigation bar with "Create Project" at last position: Home | Projects | Reports | Team | Help | Settings | Create Project',
          metrics: {
            clickThroughRate: '14.6%',
            timeToFind: '2.1 seconds',
            taskCompletionRate: '89%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Moving the primary CTA to the recency position (last in nav) increased click-through by 78%. Time-to-find was cut by more than half, and task completion improved by 25%. The recency position benefits from both the serial position effect and the conventional expectation of action items at the end.',
          learnings: [
            'Recency position is highly effective for primary actions in horizontal navigation',
            'Middle positions are the worst for discoverability of important items',
            'Time-to-find is a strong proxy metric for serial position recall effects',
            'Combining position with visual emphasis (button vs link) amplifies the effect',
          ],
        },
      },
      {
        title: 'Feature List Ordering - Strongest First/Last vs Random',
        hypothesis:
          'Placing the top differentiator first and trust builder last will improve recall and conversion',
        controlVersion: {
          description:
            'Feature list in alphabetical order: Analytics, Collaboration, Encryption, Import/Export, Real-Time Sync',
          metrics: {
            conversionRate: '3.4%',
            featureRecall: '2.1 features recalled on average',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Feature list optimized for serial position: Real-Time Sync (differentiator), Import/Export, Collaboration, Analytics, Encryption (trust builder)',
          metrics: {
            conversionRate: '5.1%',
            featureRecall: '3.4 features recalled on average',
            scrollDepth: '74%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Position-optimized ordering increased conversion by 50% and improved average feature recall by 62%. Users in follow-up surveys could name the first and last features at 3x the rate of middle features, confirming the serial position curve.',
          learnings: [
            'Strategic ordering outperforms alphabetical ordering for feature lists',
            'Users recalled an average of 1.3 more features with optimized ordering',
            'The primacy position had slightly stronger recall than recency for feature lists (long-term memory effect)',
            'Breaking features into 2 groups of 3 performed even better than a single list of 5',
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
        name: 'Long Unbroken Lists',
        description:
          'Lists, menus, or grids with 7+ items in a single uninterrupted sequence',
        howToSpot:
          'Count items in navigation bars, feature lists, dropdown menus, and sidebars. Lists over 7 items have a significant middle dead zone.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Middle-Position Primary Actions',
        description:
          'Primary CTAs, key features, or critical items placed at middle positions in a sequence',
        howToSpot:
          'Identify the 1-2 most important items in any list and check their position. If they are in the middle third, the serial position effect is working against them.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Weak Opening Content',
        description:
          'Pages, emails, or flows starting with low-value or generic content instead of the strongest hook',
        howToSpot:
          'Check the first visible element on a page or first step in a flow. Is it the most compelling content, or is it generic/administrative?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Forgettable Endings',
        description:
          'Flows, pages, or lists ending with low-impact content or generic confirmations',
        howToSpot:
          'Check the last item in lists, last step in flows, or bottom of pages. Is the ending memorable and actionable, or is it an afterthought?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Carousel or Slider Content',
        description:
          'Horizontal scrolling content where first and last visible items matter most',
        howToSpot:
          'Check carousels for strategic first-slide content. Is the first slide the strongest content? Are middle slides being seen at all?',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Navigation Serial Position Pattern',
        description: 'Navigation items ordered with strategic awareness of position-based recall',
        indicators: [
          'Most-used items at first and last nav positions',
          'Primary CTA at start or end of navigation',
          'Secondary/supporting items in middle positions',
          'Navigation groups of 5-7 items with clear separators',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Content Sequencing Pattern',
        description: 'Content ordered to maximize recall of key messages through position',
        indicators: [
          'Strongest value proposition in opening paragraph/section',
          'Clear CTA or key takeaway in closing position',
          'Supporting details and evidence in middle sections',
          'Email/page structure following hook-body-CTA format',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'List Chunking Pattern',
        description: 'Long lists broken into smaller groups to create multiple primacy/recency positions',
        indicators: [
          'Lists grouped under subheadings (3-5 items per group)',
          'Visual separators between list sections',
          'Category headers creating new serial position boundaries',
          'Accordions or collapsible sections for long content',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Flow Bookend Pattern',
        description: 'Multi-step flows with strong first and last steps framing the experience',
        indicators: [
          'Onboarding starting with value demonstration, not configuration',
          'Checkout flows ending with order confirmation + next steps',
          'Wizards closing with summary + celebration',
          'Tutorials ending with user accomplishment, not just "done"',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What is the first item users see in each list or navigation?',
      'What is the last item in each sequence? Is it memorable and actionable?',
      'Are primary actions or key features buried in the middle of lists?',
      'How many items are in each unbroken list? (More than 7 = significant dead zone)',
      'Are long lists chunked into groups with headers to create new position boundaries?',
      'Does the first step of onboarding deliver immediate value or an "aha moment"?',
      'Does the last step of any flow leave a strong lasting impression?',
      'In carousels, is the first slide the strongest content?',
      'Are emails opening with the key message and closing with the CTA?',
      'Have you tested recall of items at different positions in your critical lists?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Primacy-Recency Effect (Serial Position Effect).

Analyze the provided design for serial position patterns. Identify:

1. **List and Menu Ordering**: How items are sequenced in navigation, feature lists, and menus
2. **Content Positioning**: What information appears first and last in pages, emails, and flows
3. **Flow Bookends**: How multi-step flows begin and end (onboarding, checkout, wizards)
4. **Carousel Strategy**: Whether first/last carousel items are the strongest content
5. **List Length**: Whether lists are too long (7+ items) without chunking

For each pattern found:
- Identify what occupies the primacy (first) and recency (last) positions
- Assess whether the most important items are in optimal positions
- Check for items buried in the middle dead zone that should be elevated
- Evaluate list length and chunking strategy
- Suggest specific reordering improvements

Consider:
- Is the most important navigation item at position 1 or last?
- Are key features leading or closing feature lists?
- Do onboarding flows start strong and end memorably?
- Are long lists chunked to create multiple primacy/recency boundaries?
- Does the design account for screen reader linear order?
- Are there fairness concerns (e.g., voting, candidate selection) where position bias should be mitigated?

Provide actionable recommendations for optimizing content and navigation ordering.`,

    outputSchema: {
      type: 'object',
      properties: {
        positionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              primacyItem: { type: 'string' },
              recencyItem: { type: 'string' },
              buriedItems: { type: 'string' },
              listLength: { type: 'number' },
              isOptimized: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'primacyItem',
              'recencyItem',
              'isOptimized',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            positionOptimizationScore: { type: 'number' },
            listChunkingScore: { type: 'number' },
            flowBookendScore: { type: 'number' },
            contentSequencingScore: { type: 'number' },
          },
          required: [
            'positionOptimizationScore',
            'listChunkingScore',
            'flowBookendScore',
            'contentSequencingScore',
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
        'positionPatterns',
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
        title: 'Audit Existing Sequences',
        description:
          'Map every list, menu, navigation bar, and content sequence in your interface. Identify what currently occupies the first and last positions.',
        example:
          'Audit: Main nav has 8 items. "Dashboard" is first (good), but "Create" is at position 5 (bad — primary CTA buried in middle).',
        tips: [
          'Create a spreadsheet of every list with 4+ items',
          'Flag any list where the primary action or key content is in positions 3 through N-2',
          'Pay special attention to navigation, feature lists, and onboarding flows',
        ],
      },
      {
        step: 2,
        title: 'Identify Priority Items',
        description:
          'For each sequence, determine the 2 most important items that should occupy the primacy and recency positions',
        example:
          'Main nav priorities: "Dashboard" (primacy — most used) and "Create Project" (recency — primary action)',
        tips: [
          'Use analytics to identify most-clicked/most-used items',
          'Primacy position: best for the most frequently accessed or first-impression item',
          'Recency position: best for primary actions, CTAs, or lasting-impression items',
        ],
      },
      {
        step: 3,
        title: 'Reorder Strategically',
        description:
          'Move priority items to first and last positions. Fill middle positions with supporting items.',
        example:
          'Reordered nav: Dashboard | Projects | Reports | Team | Settings | Create Project',
        tips: [
          'Do not reorder if the list has a required convention (alphabetical, chronological)',
          'Keep related items adjacent even when optimizing for position',
          'Test that the new order does not break user expectations from existing mental models',
        ],
      },
      {
        step: 4,
        title: 'Chunk Long Lists',
        description:
          'Break lists with more than 7 items into groups of 3-5 items, each with a clear heading or separator',
        example:
          'Sidebar nav: [Main] Dashboard, Projects, Create | [Data] Reports, Analytics | [Account] Settings, Help',
        tips: [
          'Each chunk gets its own primacy and recency positions',
          'Use visual separators, headings, or whitespace to create clear group boundaries',
          'The most important item in each chunk should be first or last within that chunk',
        ],
      },
      {
        step: 5,
        title: 'Strengthen Bookends',
        description:
          'Ensure multi-step flows have strong, memorable first and last steps',
        example:
          'Onboarding: Step 1 = "See your data come alive" (immediate value demo). Last step = "You\'re all set! Here\'s what you can do next" (celebration + CTA).',
        tips: [
          'First step should deliver value or demonstrate capability, not ask for configuration',
          'Last step should celebrate, reinforce value, and provide a clear next action',
          'Middle steps can handle setup, configuration, and details',
        ],
      },
      {
        step: 6,
        title: 'Test and Measure Recall',
        description:
          'Run user tests to validate that the reordered sequences improve recall and task completion',
        example:
          'User test: "Close this tab and tell me which features you remember." Compare first/last recall rates.',
        tips: [
          'Free recall tests (list everything you remember) reveal the serial position curve directly',
          'Click-through rate by position is a strong quantitative proxy',
          'Compare recall rates before and after reordering',
        ],
      },
    ],

    dos: [
      'Place the most important items at the first and last positions of every list',
      'Start onboarding, emails, and pages with your strongest hook or value proposition',
      'End flows with memorable, actionable content (celebration, CTA, next steps)',
      'Chunk long lists (7+ items) into groups of 3-5 with clear separators',
      'Use the primacy position for most-used/most-important items',
      'Use the recency position for primary CTAs and lasting-impression content',
      'Test recall and engagement by position to validate your ordering strategy',
      'Consider screen reader linear order as a separate sequence to optimize',
    ],

    donts: [
      'Don\'t bury primary actions or key features in the middle of long lists',
      'Don\'t present lists of 10+ items without chunking or grouping',
      'Don\'t start onboarding with administrative tasks (terms, configuration)',
      'Don\'t end flows with generic confirmations that waste the recency position',
      'Don\'t assume alphabetical ordering is best for non-reference lists',
      'Don\'t exploit position bias in contexts requiring fairness (voting, candidate lists)',
      'Don\'t ignore that the recency effect weakens after a delay or distraction',
      'Don\'t reorder lists that have established user expectations without testing',
    ],

    bestPractices: [
      {
        title: 'The Bookend Principle',
        description:
          'Treat every sequence as having two "golden positions" — first and last — and invest your best content there',
        rationale:
          'Research consistently shows 2-3x recall rates for items at first and last positions compared to middle items',
        example:
          'Email template: [Hook with value/news] → [Supporting details] → [CTA with clear action]',
      },
      {
        title: 'Chunk for Multiple Peaks',
        description:
          'Break long sequences into groups of 3-5 items to create multiple primacy/recency positions',
        rationale:
          'Each chunk gets its own serial position curve, eliminating the deep middle dead zone of long lists',
        example:
          'Instead of a 12-item nav, create 3 groups of 4 with headers: Main, Tools, Account',
      },
      {
        title: 'Strongest-to-Middle Gradient',
        description:
          'Order items from strongest at the edges to weakest in the center of any list',
        rationale:
          'This maximizes the natural U-shaped recall curve by placing the least critical items where recall is lowest',
        example:
          'Feature list: [AI Insights, Real-Time Sync] → [Import, Collaboration] → [Encryption, SSO]',
      },
      {
        title: 'Recency-Safe Endings',
        description:
          'Design final touchpoints (last page, last email, last interaction) to be strongly positive',
        rationale:
          'The peak-end rule combines with the recency effect: the ending disproportionately shapes overall experience evaluation',
        example:
          'Checkout ending: "Order confirmed! You saved $47. Here\'s a 10% code for next time."',
      },
      {
        title: 'Position-Aware Accessibility',
        description:
          'Ensure that DOM/reading order matches the intended serial position strategy',
        rationale:
          'Screen reader users experience content in strict linear order, making serial position even more impactful',
        example:
          'Ensure CSS visual order matches DOM order so assistive technology encounters key items first and last',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - DOM order must match visual order so serial position strategy works for all users',
        implementation:
          'Ensure CSS layout does not reorder elements differently from DOM order. Screen reader users should encounter the same first and last items as sighted users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.1',
        guideline:
          'Bypass Blocks - Allow users to skip to key content regardless of position',
        implementation:
          'Provide skip links and ARIA landmarks so users can jump to primary content. This is especially important when key items cannot be at the first serial position.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use headings to create list boundaries that reset serial position curves',
        implementation:
          'When chunking long lists, use proper heading elements (h2, h3) for group labels so screen reader users can navigate between groups and benefit from per-group primacy effects.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Semantic structure should reinforce position-based importance',
        implementation:
          'Use ordered lists (<ol>) when sequence matters, landmark roles for major sections, and ARIA labels that convey priority for first/last items.',
      },
    ],

    ethics: [
      {
        concern: 'Ballot and Selection Fairness',
        severity: 'critical',
        explanation:
          'Placing candidates, options, or products at first/last positions gives them an unfair recall and selection advantage in contexts requiring fairness',
        mitigation:
          'Randomize order per session for voting interfaces, candidate lists, and any context where position bias could create unfair outcomes. Disclose randomization.',
      },
      {
        concern: 'Burying Important Disclosures',
        severity: 'high',
        explanation:
          'Intentionally placing terms, fees, or cancellation policies in middle positions where they will be recalled least',
        mitigation:
          'Place all material disclosures at primacy or recency positions, or use visual emphasis (bold, color) to overcome middle-position disadvantage.',
      },
      {
        concern: 'Manipulative Content Sequencing',
        severity: 'medium',
        explanation:
          'Ordering content to create misleading first impressions or last impressions that do not represent the actual product',
        mitigation:
          'Ensure first and last impressions are representative of the real product experience. Do not front-load unrepresentative best-case content.',
      },
      {
        concern: 'Exploiting Position in Reviews',
        severity: 'high',
        explanation:
          'Algorithmically placing only positive reviews at the first position to exploit the primacy effect',
        mitigation:
          'Show "most helpful" reviews (which may be critical) at position 1. Provide easy access to negative reviews. Disclose sorting methodology.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Memory: A Contribution to Experimental Psychology',
        author: 'Ebbinghaus, H.',
        year: 1885,
        description:
          'The foundational work on memory and the serial position effect, establishing the forgetting curve and position-dependent recall',
        type: 'foundational',
      },
      {
        title: 'The Serial Position Effect of Free Recall',
        author: 'Murdock, B. B.',
        year: 1962,
        doi: '10.1037/h0045106',
        description:
          'The definitive experimental demonstration of the serial position curve, showing the U-shaped recall function across varying list lengths',
        type: 'foundational',
      },
      {
        title: 'Two Storage Mechanisms in Free Recall',
        author: 'Glanzer, M., & Cunitz, A. R.',
        year: 1966,
        doi: '10.1016/S0022-5371(66)80044-0',
        description:
          'Demonstrated that the recency effect is eliminated by a distractor task (proving short-term memory involvement) while the primacy effect persists (proving long-term memory involvement)',
        type: 'advanced',
      },
      {
        title: 'Ballot Position Effects on Voter Choice',
        author: 'Meredith, M., & Salant, Y.',
        year: 2013,
        description:
          'Empirical evidence that candidate ballot position affects election outcomes due to the primacy effect',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers how memory biases including serial position effects influence judgment and decision-making',
        type: 'foundational',
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman, Donald',
        year: 2013,
        isbn: '9780465050659',
        description:
          'Discusses how information ordering and menu design interact with human memory limitations',
        type: 'practical',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Practical web usability guide with implications for navigation ordering and content prioritization',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Serial Position Effect in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/serial-position-effect',
        description:
          'Practical guide to applying the serial position effect in user interface design',
        type: 'practical',
      },
      {
        title: 'The Serial Position Effect: Why ABC and XYZ Are the Most Remembered',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/serial-position-effect/',
        description:
          'UX research on how serial position affects navigation, list design, and content recall in digital interfaces',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Serial Position Effect Explained',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=wA1kl6X_6Rg',
        description:
          'Animated explanation of the serial position effect with memory experiment demonstrations',
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
      'von-restorff-effect', // Distinctiveness can overcome middle-position disadvantage
      'peak-end-rule', // End of experience (recency) shapes overall evaluation
      'anchoring-bias', // First item (primacy) anchors subsequent judgments
      'chunking', // Breaking lists into groups creates new position boundaries
    ],

    conflicts: [
      'alphabetical-convention', // Alphabetical ordering overrides position optimization
      'recency-bias', // Pure recency bias overweights the last item at the expense of primacy
    ],

    confusedWith: [
      'anchoring-bias', // Anchoring is about first numbers/values; primacy is about first items in sequences
      'peak-end-rule', // Peak-end focuses on emotional peaks and endings; primacy-recency is about position in sequences
      'availability-heuristic', // Availability is about recall ease; serial position is about list-position-dependent recall
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'primacy-effect',
        'recency-effect',
      ],
    },
  },
};
