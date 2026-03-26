/**
 * REPRESENTATIVENESS HEURISTIC
 *
 * We judge probability by how much something resembles a stereotype
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const representativenessHeuristic: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'representativeness-heuristic',
    name: 'Representativeness Heuristic',
    aliases: [],
    category: BiasCategory.COGNITIVE,
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
    simple: 'We judge probability by how much something resembles a stereotype',

    detailed: `The Representativeness Heuristic is a cognitive shortcut where people estimate the likelihood of an event or categorize something based on how similar it is to a prototype or mental model, rather than using actual base-rate statistics or probability.

When we encounter something new, we instinctively ask "What does this look like?" rather than "What is statistically likely?" This leads us to ignore sample sizes, base rates, and prior probabilities in favor of surface-level similarity to a category or stereotype.

In UX and product design, this bias profoundly affects how users categorize content, interpret icons and labels, navigate information architectures, and form expectations about products and features. Users expect things that look alike to behave alike, and they judge quality, relevance, and trustworthiness based on pattern-matching to their mental prototypes.`,

    psychologyBasis: {
      discoveredBy: 'Amos Tversky and Daniel Kahneman',
      year: 1972,
      theory: 'Heuristics and Biases Research Program',
      mechanism: `The brain judges probability by similarity to a prototype rather than by statistical reasoning. This happens because:

1. **Prototype Matching**: The brain compares new items against stored mental prototypes and assumes similar-looking things belong to the same category
2. **Base-Rate Neglect**: Statistical base rates (how common something actually is) are ignored in favor of how well something matches a stereotype
3. **Conjunction Fallacy**: People judge specific, representative scenarios as more probable than general ones (the "Linda problem")
4. **Insensitivity to Sample Size**: Small samples that match a prototype feel as convincing as large ones
5. **Regression Neglect**: People fail to account for regression to the mean, expecting patterns to continue because they "look like" a trend

The mechanism is automatic and deeply ingrained—we categorize before we calculate, making similarity-based judgments feel more natural than statistical ones.`,
    },

    realWorldExample: `In Kahneman and Tversky's famous "Linda problem" (1983), participants were told Linda is 31, single, outspoken, and a philosophy major concerned with social justice. When asked which is more probable—(a) Linda is a bank teller, or (b) Linda is a bank teller AND active in the feminist movement—85% chose (b), even though a conjunction of two events can never be more probable than either event alone. Linda's description was "representative" of a feminist, so people judged the more specific (but less probable) option as more likely.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Representativeness Heuristic shapes how users categorize content, interpret visual cues, and form expectations about functionality. Designers can leverage this to:

- Create intuitive category structures that match users' mental prototypes
- Design icons and labels that align with user expectations through recognizable patterns
- Build navigation architectures where items "look like" they belong together
- Shape product perception through visual similarity to trusted categories
- Influence user persona design by understanding how users stereotype experiences`,

    whenToUse: [
      {
        title: 'Category Navigation Design',
        scenario:
          'When organizing content or products into browsable categories',
        example:
          'Group products using labels and icons that match users\' mental models—e.g., a leaf icon for organic foods, a gear icon for settings',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Icon and Label Design',
        scenario: 'When choosing visual representations for features or actions',
        example:
          'Use a magnifying glass for search, a house for home, a shopping cart for checkout—icons that match the prototype users expect',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Search Result Ranking',
        scenario: 'When displaying search results or recommendations',
        example:
          'Surface results that visually and contextually match user expectations for the query, reinforcing their mental model of relevance',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User Persona Matching',
        scenario: 'When personalizing experiences based on user segments',
        example:
          'Show product recommendations that match the "type" of user—e.g., showing developer tools to users whose profile resembles a developer prototype',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Product Categorization',
        scenario: 'When organizing a product catalog or feature set',
        example:
          'Place features where users expect them based on similarity to known patterns—e.g., "Billing" under "Account" rather than under "Settings"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Flow Design',
        scenario: 'When setting user expectations about what a product does',
        example:
          'Use familiar visual patterns from the product category (e.g., dashboard layouts for analytics tools) so users immediately recognize the product type',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Stereotype-Reinforcing Design',
        reason:
          'Using representativeness can reinforce harmful stereotypes about user groups',
        consequence:
          'Exclusion of users who don\'t match the prototype, biased recommendations, discrimination',
        alternative:
          'Use data-driven personalization rather than prototype-based assumptions about user demographics',
      },
      {
        title: 'Algorithmic Categorization',
        reason:
          'Similarity-based sorting can create filter bubbles and reinforce existing biases',
        consequence:
          'Users never encounter diverse content; recommendations become echo chambers',
        alternative:
          'Introduce serendipity and diversity in recommendations alongside similarity-based results',
      },
      {
        title: 'Hiring and Evaluation Platforms',
        reason:
          'Pattern-matching to "ideal candidate" prototypes perpetuates bias in hiring',
        consequence:
          'Qualified candidates rejected because they don\'t "look like" the prototype of success',
        alternative:
          'Use structured, criteria-based evaluation that measures skills objectively',
      },
      {
        title: 'Medical or Diagnostic Tools',
        reason:
          'Prototype-based categorization can miss atypical presentations of conditions',
        consequence:
          'Misdiagnosis or missed diagnoses for cases that don\'t match the "textbook" prototype',
        alternative:
          'Present statistical probability data alongside pattern-matching results',
      },
    ],

    commonMistakes: [
      {
        title: 'Icons That Don\'t Match Mental Models',
        description:
          'Using abstract or non-standard icons that don\'t resemble what users expect for a given function',
        why: 'Users rely on prototype matching to interpret icons—when the icon doesn\'t match the mental model, they can\'t find features',
        fix: 'Test icons with users to verify they match expected prototypes; use established icon conventions',
      },
      {
        title: 'Counterintuitive Category Groupings',
        description:
          'Placing items in categories that don\'t match users\' mental model of where they belong',
        why: 'Users look for items where they "should be" based on similarity—misplaced items become invisible',
        fix: 'Run card sorting studies to understand how users naturally group items',
      },
      {
        title: 'Assuming Users Share Your Prototype',
        description:
          'Designing categories and labels based on the team\'s internal mental model rather than users\' models',
        why: 'Domain experts have different prototypes than end users; what seems obvious to the team may confuse users',
        fix: 'Conduct user research to understand target users\' mental models and prototypes',
      },
      {
        title: 'Neglecting Cross-Cultural Differences',
        description:
          'Using icons, metaphors, or categorizations that only match one culture\'s prototypes',
        why: 'Mental prototypes vary by culture—a mailbox icon looks different in the US vs Japan vs Europe',
        fix: 'Research cultural variations in visual metaphors and test with diverse user groups',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how users categorize and group content based on visual similarity',
        examples: [
          'Items placed near each other are perceived as belonging to the same category',
          'Grid layouts imply items are comparable and of the same type',
          'Sidebar navigation structures create hierarchical category prototypes',
          'Card layouts suggest each card is an instance of the same category',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography style signals what category of content users are reading',
        examples: [
          'Serif fonts signal "traditional, trustworthy, editorial" content',
          'Monospace fonts signal "technical, code, developer" content',
          'Handwriting fonts signal "personal, casual, creative" content',
          'Typography consistency reinforces category membership across items',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color is a primary cue for prototype matching and categorization',
        examples: [
          'Green signals "go, success, natural, eco-friendly" across cultures',
          'Red signals "error, danger, urgent, stop" and triggers risk prototypes',
          'Blue signals "trust, technology, corporate" and matches professional prototypes',
          'Color consistency within categories reinforces grouping and classification',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns set expectations through prototype matching—similar-looking elements must behave similarly',
        examples: [
          'Elements that look like buttons must be clickable—violating this breaks the prototype',
          'Hover states signal interactivity and match the "link" or "button" prototype',
          'Drag-and-drop affordances must match the prototype of movable objects',
          'Swipe gestures must match mobile navigation prototypes or users get lost',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines which prototype users match the product or feature to',
        examples: [
          'Using industry-specific terminology signals "this product is for professionals like you"',
          'Casual language matches the prototype of consumer-friendly, approachable tools',
          'Feature descriptions that match competitor conventions signal same-category membership',
          'Content structure (listicles, tutorials, specs) triggers different content-type prototypes',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users rely on semantic structure to categorize content, not visual similarity',
        examples: [
          'Screen readers need semantic HTML to convey category relationships that visual users get from layout',
          'ARIA roles must accurately represent element prototypes (button, link, navigation)',
          'Consistent heading structure helps assistive tech users build mental category models',
          'Alt text must convey the prototype-relevant information that sighted users get from icons',
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
        title: 'Intuitive Category Icons Matching Mental Models',
        description:
          'E-commerce app using universally recognized icons that match user prototypes for each category',
        code: `<nav class="category-nav" aria-label="Product Categories">
  <a class="category" href="/electronics">
    <svg class="icon" aria-hidden="true"><!-- laptop/phone icon --></svg>
    <span>Electronics</span>
  </a>
  <a class="category" href="/clothing">
    <svg class="icon" aria-hidden="true"><!-- shirt/hanger icon --></svg>
    <span>Clothing</span>
  </a>
  <a class="category" href="/home-garden">
    <svg class="icon" aria-hidden="true"><!-- house/plant icon --></svg>
    <span>Home & Garden</span>
  </a>
  <a class="category" href="/sports">
    <svg class="icon" aria-hidden="true"><!-- running figure icon --></svg>
    <span>Sports & Outdoors</span>
  </a>
</nav>

<style>
.category-nav { display: flex; gap: var(--cg-space-4); }
.category {
  display: flex; flex-direction: column; align-items: center;
  padding: var(--cg-space-3); border-radius: var(--cg-radius-md);
  text-decoration: none; color: var(--cg-color-text);
}
.category:hover { background: var(--cg-color-surface-hover); }
.icon { width: 32px; height: 32px; }
</style>`,
        explanation:
          'Each category icon matches the user\'s mental prototype for that category. A laptop for electronics, a shirt for clothing, a house for home. Users can find what they need instantly because the icons match their expectations.',
        principle:
          'Icons that match mental prototypes enable instant recognition and reduce cognitive load',
        metrics: {
          before: '62% task completion when using abstract geometric icons',
          after: '94% task completion when using prototype-matching icons',
          improvement: '52% increase in category navigation success rate',
        },
      },
      {
        title: 'Navigation Labels Matching User Expectations',
        description:
          'SaaS application using navigation labels derived from card sorting studies with actual users',
        code: `<nav class="app-sidebar" aria-label="Main Navigation">
  <section>
    <h3 class="nav-group">Your Work</h3>
    <a href="/dashboard" class="nav-item active">
      <span class="icon">📊</span> Dashboard
    </a>
    <a href="/projects" class="nav-item">
      <span class="icon">📁</span> Projects
    </a>
    <a href="/tasks" class="nav-item">
      <span class="icon">✅</span> Tasks
    </a>
  </section>
  <section>
    <h3 class="nav-group">Team</h3>
    <a href="/members" class="nav-item">
      <span class="icon">👥</span> Members
    </a>
    <a href="/messages" class="nav-item">
      <span class="icon">💬</span> Messages
    </a>
  </section>
  <section>
    <h3 class="nav-group">Account</h3>
    <a href="/billing" class="nav-item">
      <span class="icon">💳</span> Billing
    </a>
    <a href="/settings" class="nav-item">
      <span class="icon">⚙️</span> Settings
    </a>
  </section>
</nav>`,
        explanation:
          'Navigation groups match how users mentally categorize features. "Billing" lives under "Account" (not "Settings") because users\' prototype of account management includes payment. Group labels use everyday language that matches user mental models.',
        principle:
          'Information architecture that mirrors user prototypes makes navigation intuitive',
      },
      {
        title: 'Search Results Matching Query Expectations',
        description:
          'Search interface that surfaces results matching the user\'s mental prototype for the query',
        code: `<div class="search-results" role="region" aria-label="Search Results">
  <p class="result-count">Showing results for "project management"</p>

  <div class="result-card featured">
    <span class="badge match-high">Best Match</span>
    <h3>Project Dashboard Template</h3>
    <p>Kanban boards, Gantt charts, and team workload views —
    everything you'd expect from a project management setup.</p>
    <div class="match-indicators">
      <span class="match-tag">✓ Kanban</span>
      <span class="match-tag">✓ Timeline</span>
      <span class="match-tag">✓ Team View</span>
    </div>
  </div>

  <div class="result-card">
    <h3>Agile Sprint Tracker</h3>
    <p>Sprint planning, velocity tracking, and retrospective tools.</p>
    <div class="match-indicators">
      <span class="match-tag">✓ Sprints</span>
      <span class="match-tag">✓ Backlog</span>
    </div>
  </div>
</div>`,
        explanation:
          'Results include "match indicators" showing features that align with the user\'s prototype of "project management" (Kanban, timeline, team views). Users instantly recognize these as relevant because they match their mental model.',
        principle:
          'Surfacing prototype-matching attributes in search results increases perceived relevance',
        metrics: {
          before: '38% click-through on search results without match indicators',
          after: '61% click-through on search results with prototype-matching tags',
          improvement: '61% increase in search result engagement',
        },
      },
    ],

    bad: [
      {
        title: 'Misleading Category Groupings',
        description:
          'App settings organized by internal system architecture rather than user mental models',
        code: `<!-- DON'T DO THIS -->
<nav class="settings-nav">
  <h3>System Configuration</h3>
  <a href="/settings/auth">Authentication Module</a>
  <a href="/settings/smtp">SMTP Configuration</a>
  <a href="/settings/db">Database Options</a>

  <h3>User Module</h3>
  <a href="/settings/profile">Profile Fields</a>
  <a href="/settings/roles">RBAC Permissions</a>
  <a href="/settings/notifications">Notification Dispatch</a>

  <h3>Financial Module</h3>
  <a href="/settings/stripe">Stripe Integration</a>
  <a href="/settings/invoicing">Invoice Engine</a>
</nav>`,
        explanation:
          'Users looking for "how do I change my password" won\'t look under "Authentication Module." Users looking for billing won\'t search for "Stripe Integration." These labels match the developer\'s mental model, not the user\'s. Users expect "Password" under "Account" and "Billing" under "Account" or "Payments."',
        principle:
          'Internal system categories don\'t match user prototypes—navigation must reflect user mental models, not architecture',
      },
      {
        title: 'Icons That Don\'t Match Their Function',
        description:
          'Custom icon set using abstract symbols that don\'t match user prototypes',
        code: `<!-- DON'T DO THIS -->
<nav class="toolbar">
  <!-- A diamond icon for "Save" ??? -->
  <button title="Save">
    <svg><!-- diamond shape --></svg>
  </button>

  <!-- A circle icon for "Delete" ??? -->
  <button title="Delete">
    <svg><!-- circle shape --></svg>
  </button>

  <!-- A triangle icon for "Share" ??? -->
  <button title="Share">
    <svg><!-- triangle shape --></svg>
  </button>

  <!-- A square icon for "Settings" ??? -->
  <button title="Settings">
    <svg><!-- square shape --></svg>
  </button>
</nav>`,
        explanation:
          'Abstract geometric shapes carry no prototype meaning. Users expect a floppy disk or checkmark for "Save," a trash can for "Delete," an arrow-out for "Share," and a gear for "Settings." These icons force users to learn arbitrary mappings instead of leveraging existing mental models.',
        principle:
          'Icons must match the universal prototype for their function—arbitrary symbols destroy usability',
      },
      {
        title: 'Counterintuitive Product Naming',
        description:
          'SaaS product using creative but non-representative names for standard features',
        code: `<!-- DON'T DO THIS -->
<nav class="main-nav">
  <a href="/launchpad">🚀 Launchpad</a>
  <!-- Users expect: "Dashboard" -->

  <a href="/brain">🧠 Brain</a>
  <!-- Users expect: "Analytics" or "Insights" -->

  <a href="/hive">🐝 Hive</a>
  <!-- Users expect: "Team" or "Collaboration" -->

  <a href="/vault">🔒 Vault</a>
  <!-- Users expect: "Files" or "Documents" -->

  <a href="/compass">🧭 Compass</a>
  <!-- Users expect: "Goals" or "Roadmap" -->
</nav>`,
        explanation:
          'Creative names like "Brain" and "Hive" don\'t match any established prototype. Users hunting for analytics won\'t think to click "Brain." The cognitive load of learning a custom vocabulary overwhelms any brand benefit.',
        principle:
          'Feature names must match user prototypes for the function—cleverness at the expense of recognition is a usability failure',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Search',
        url: 'https://www.google.com',
        description:
          'Google ranks and displays search results based on how well content matches the user\'s intent prototype. Featured snippets, knowledge panels, and result formats (images for "cute dogs", maps for "restaurant near me") all match what users expect for that query type.',
        effectiveness: 'very-effective',
        analysis:
          'Google\'s success is built on matching results to user prototypes of relevance. The varied result formats (maps, images, shopping, knowledge panels) activate different prototypes depending on query intent, making results feel intuitively right.',
      },
      {
        company: 'Amazon',
        product: 'Product Categorization',
        url: 'https://www.amazon.com',
        description:
          'Amazon\'s category tree and faceted navigation match how shoppers mentally categorize products. "Electronics > Computers > Laptops" follows the natural prototype hierarchy users expect. Product listing pages show attributes that match the category prototype (specs for electronics, sizes for clothing).',
        effectiveness: 'very-effective',
        analysis:
          'Amazon\'s information architecture leverages representativeness by mirroring how shoppers naturally think about product categories. Each category page shows the attributes most representative of that product type, helping users quickly evaluate whether items match their needs.',
      },
      {
        company: 'Tinder',
        product: 'Profile Matching',
        url: 'https://www.tinder.com',
        description:
          'Dating apps present profiles in a way that encourages rapid prototype-based judgment—photos, age, and a short bio trigger instant "type" matching. Users swipe based on how well a profile matches their mental prototype of an ideal match.',
        effectiveness: 'effective',
        analysis:
          'The swipe mechanic is essentially representativeness in action: users make rapid yes/no decisions based on surface-level prototype matching. While effective for engagement, it can reinforce narrow stereotypes about attractiveness and compatibility.',
      },
      {
        company: 'LinkedIn',
        product: 'Candidate Matching',
        url: 'https://www.linkedin.com',
        description:
          'LinkedIn\'s job recommendation and candidate search surfaces profiles that match the "prototype" of an ideal candidate—similar job titles, companies, education. The "People Also Viewed" feature leverages category similarity.',
        effectiveness: 'effective',
        analysis:
          'LinkedIn leverages representativeness by matching candidates to job prototypes (right school, right companies, right keywords). While effective for matching, this can perpetuate bias by over-weighting prototype similarity and under-weighting unconventional but qualified candidates.',
      },
    ],

    abTests: [
      {
        title: 'Icon Design: Prototype-Matching vs Abstract Icons',
        hypothesis:
          'Icons that match user prototypes will improve navigation task completion compared to abstract custom icons',
        controlVersion: {
          description:
            'Navigation toolbar using custom abstract geometric icons for standard functions (save, delete, share, settings)',
          metrics: {
            conversionRate: '67%',
            timeOnPage: '4:12',
            errorRate: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Navigation toolbar using universally recognized prototype-matching icons (floppy disk for save, trash for delete, arrow for share, gear for settings)',
          metrics: {
            conversionRate: '93%',
            timeOnPage: '2:08',
            errorRate: '4%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Prototype-matching icons improved task completion by 39% and reduced errors by 83%. Users spent half the time navigating because they could instantly recognize functions without learning the icon system.',
          learnings: [
            'Universally recognized icons outperform custom designs for standard functions',
            'Users rely on prototype matching even when tooltips are available',
            'Error rates drop dramatically when icons match mental models',
            'Time savings compound across sessions as users don\'t need to re-learn',
          ],
        },
      },
      {
        title: 'Category Labels: User Mental Model vs Internal Taxonomy',
        hypothesis:
          'Category labels derived from card sorting with users will improve findability compared to internal team labels',
        controlVersion: {
          description:
            'Settings page using developer-facing labels: "Auth Config", "SMTP", "RBAC", "Webhook Dispatch"',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '5:30',
            bounceRate: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Settings page using user-facing labels from card sorting: "Login & Security", "Email", "Permissions", "Notifications"',
          metrics: {
            conversionRate: '82%',
            timeOnPage: '2:15',
            bounceRate: '12%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'User-facing labels doubled findability and cut time-on-task by 59%. The card-sorted labels matched how users categorize settings in their mental model, eliminating the need to translate between developer jargon and user intent.',
          learnings: [
            'Internal taxonomy never matches user mental models—always test with real users',
            'Card sorting is the gold standard for aligning IA with user prototypes',
            'Jargon creates a translation burden that compounds across every interaction',
            'Bounce rate dropped 68%, suggesting users abandoned less when labels were recognizable',
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
        name: 'Category Prototypicality',
        description:
          'Icons, labels, and groupings that match (or fail to match) user prototypes for categories',
        howToSpot:
          'Check if icons and labels use universally recognized metaphors or arbitrary/internal terminology',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Visual Similarity Grouping',
        description:
          'Items visually styled the same are perceived as belonging to the same category',
        howToSpot:
          'Look for consistent card styles, colors, or layouts that group items—inconsistencies break category expectations',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Prototype-Driven Sorting',
        description:
          'Search results, recommendations, or lists ordered by similarity to a prototype rather than objective criteria',
        howToSpot:
          'Check if sorting reflects "most typical" items first rather than most relevant by user need',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Stereotype-Based Personalization',
        description:
          'User segmentation or recommendations based on demographic prototypes rather than individual behavior',
        howToSpot:
          'Look for recommendations that seem to assume user preferences based on age, gender, location, or profession stereotypes',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Interface Convention Adherence',
        description:
          'UI elements that follow (or break) platform conventions and established interaction prototypes',
        howToSpot:
          'Check if buttons, navigation, modals, and forms match platform-standard prototypes (e.g., close button in top-right corner)',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Category-Prototype Mismatch Pattern',
        description: 'Navigation or categorization labels that don\'t match user mental models',
        indicators: [
          'Internal jargon used as category labels',
          'Features placed in non-intuitive locations',
          'Users frequently use search instead of navigation',
          'High support ticket volume for "where do I find X?"',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Icon-Function Mismatch Pattern',
        description: 'Icons that don\'t match the universally recognized prototype for their function',
        indicators: [
          'Custom/abstract icons for standard functions',
          'Same icon used for different functions',
          'Users rely on tooltips rather than icons',
          'Icon meanings that require onboarding to learn',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Similarity-Based Recommendation Pattern',
        description: 'Recommendations driven purely by surface similarity to a prototype',
        indicators: [
          '"Similar items" based on visual or keyword matching',
          '"People like you" recommendations based on demographic prototypes',
          'Filter bubbles where only same-category content is surfaced',
          'Homogeneous results lacking diversity',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Stereotype Reinforcement Pattern',
        description: 'Interface design that reinforces or exploits user stereotypes',
        indicators: [
          'Gendered product categorization or color coding',
          'Demographic-based default assumptions',
          'Stock photography matching narrow stereotypes',
          'Language that assumes user identity or preferences',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do icons match the universally recognized prototype for their function?',
      'Are category labels based on user mental models or internal taxonomy?',
      'Does the information architecture reflect how users naturally group items?',
      'Are search results sorted by prototype similarity or actual relevance?',
      'Do visual similarities between elements accurately reflect functional similarities?',
      'Are recommendations based on individual behavior or demographic stereotypes?',
      'Do interaction patterns match platform conventions users expect?',
      'Could the design reinforce harmful stereotypes about user groups?',
      'Are there items placed in categories where users would not expect to find them?',
      'Have card sorting or tree testing studies validated the navigation structure?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the representativeness heuristic.

Analyze the provided design for representativeness heuristic patterns. Identify:

1. **Category-Prototype Alignment**: Do icons, labels, and groupings match user mental models?
2. **Navigation Intuitiveness**: Is the information architecture organized by user prototypes or internal taxonomy?
3. **Visual Similarity Signals**: Do visually similar elements behave similarly? Do they belong in the same category?
4. **Recommendation Bias**: Are recommendations based on prototype matching? Could they reinforce stereotypes?
5. **Convention Adherence**: Do interaction patterns match platform prototypes users expect?

For each pattern found:
- Identify whether it aligns with or violates user prototypes
- Assess whether prototype matching helps or misleads users
- Determine if it could reinforce harmful stereotypes
- Evaluate inclusivity implications
- Suggest improvements for better prototype alignment

Consider:
- Are category labels and icons universally recognizable or culturally specific?
- Does the IA match how real users categorize information (card sorting data)?
- Are there places where internal jargon replaces user-facing language?
- Could similarity-based sorting create filter bubbles or reinforce bias?
- Are diverse user prototypes represented, or only the majority?

Provide actionable recommendations for aligning design with user mental models while avoiding stereotypes.`,

    outputSchema: {
      type: 'object',
      properties: {
        representativenessPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              prototypeAlignment: { type: 'string' },
              userImpact: { type: 'string' },
              stereotypeRisk: { type: 'string' },
              inclusive: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'prototypeAlignment',
              'userImpact',
              'inclusive',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            prototypeAlignmentScore: { type: 'number' },
            navigationIntuitiveness: { type: 'number' },
            stereotypeRiskScore: { type: 'number' },
            inclusivityScore: { type: 'number' },
          },
          required: [
            'prototypeAlignmentScore',
            'navigationIntuitiveness',
            'stereotypeRiskScore',
            'inclusivityScore',
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
        'representativenessPatterns',
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
        title: 'Identify User Prototypes',
        description:
          'Research what mental models and prototypes your target users have for key categories, functions, and interactions',
        example:
          'Run card sorting studies: give users 40 feature cards and ask them to group and label them naturally',
        tips: [
          'Use open card sorting to discover user-generated categories',
          'Test with diverse user groups to avoid single-prototype bias',
          'Document the most common groupings and labels across participants',
        ],
      },
      {
        step: 2,
        title: 'Align Icons and Labels with Prototypes',
        description:
          'Choose icons and labels that match the prototypes identified in research',
        example:
          'If 80% of users grouped "billing" under "account," place it there—even if your team thinks it belongs under "settings"',
        tips: [
          'Use established icon conventions (gear for settings, magnifying glass for search)',
          'Prefer user-generated labels over internal team terminology',
          'Test icon recognition without labels to verify prototype matching',
        ],
      },
      {
        step: 3,
        title: 'Build Inclusive Category Structures',
        description:
          'Ensure categorization doesn\'t rely on stereotypes or exclude users who don\'t match the majority prototype',
        example:
          'Instead of gendered product categories ("Men\'s" / "Women\'s"), consider function-based categories ("Running Shoes" / "Dress Shoes")',
        tips: [
          'Avoid demographic-based categorization when function-based works',
          'Ensure stock photography represents diverse users',
          'Test with users from different cultural backgrounds',
        ],
      },
      {
        step: 4,
        title: 'Use Visual Consistency to Reinforce Categories',
        description:
          'Apply consistent visual styling within categories so items are easily recognized as belonging together',
        example:
          'All analytics features use the same icon color and style; all settings use a different consistent style',
        tips: [
          'Consistent card layouts within categories signal membership',
          'Color coding can reinforce category boundaries',
          'Visual inconsistency within a category creates confusion',
        ],
      },
      {
        step: 5,
        title: 'Validate with Tree Testing and Usability Testing',
        description:
          'Test whether users can find items where they expect them and whether the IA matches their mental models',
        example:
          'Tree test: "Where would you go to change your password?" Success rate should be >80%',
        tips: [
          'Use reverse card sorting to validate proposed structures',
          'Measure findability for the most common user tasks',
          'Iterate based on where users get lost or surprised',
        ],
      },
    ],

    dos: [
      'Use universally recognized icons for standard functions (search, settings, home, etc.)',
      'Derive category labels from user research, not internal team vocabulary',
      'Run card sorting studies to align IA with user mental models',
      'Ensure visually similar elements behave similarly throughout the interface',
      'Match platform conventions so interaction prototypes transfer from other apps',
      'Test icon and label recognition with diverse user groups',
      'Use visual consistency within categories to reinforce grouping',
      'Provide multiple paths to content so users with different prototypes can find it',
    ],

    donts: [
      'Don\'t use internal jargon or developer terminology as user-facing labels',
      'Don\'t use abstract or custom icons for standard functions without testing',
      'Don\'t rely on demographic stereotypes for personalization or recommendations',
      'Don\'t assume your team\'s mental model matches your users\' mental model',
      'Don\'t break platform conventions without strong justification and user testing',
      'Don\'t use creative feature names that sacrifice recognition for branding',
      'Don\'t create category structures based on system architecture',
      'Don\'t assume one culture\'s prototypes are universal—test cross-culturally',
    ],

    bestPractices: [
      {
        title: 'Card Sort Before You Build',
        description:
          'Always run card sorting studies before finalizing navigation and category structures',
        rationale:
          'User-generated categories match user prototypes; designer-generated categories often reflect internal models',
        example:
          'Open card sort with 30+ participants from your target audience before designing IA',
      },
      {
        title: 'Follow Convention, Then Innovate',
        description:
          'Start with established UI conventions and only deviate when you have evidence that innovation serves users better',
        rationale:
          'Users transfer prototype expectations from every other app they use—breaking conventions has a high cost',
        example:
          'Use a standard hamburger menu on mobile, standard tab bar, standard search placement before trying novel patterns',
      },
      {
        title: 'Audit for Stereotype Reinforcement',
        description:
          'Regularly review categorization, recommendations, and personalization for unintended stereotype reinforcement',
        rationale:
          'Prototype-based design can inadvertently exclude users who don\'t match the majority stereotype',
        example:
          'Review recommendation algorithm outputs across different user demographics for bias patterns',
      },
      {
        title: 'Multiple Discovery Paths',
        description:
          'Provide search, navigation, and contextual links so users with different mental models can all find content',
        rationale:
          'Not all users share the same prototype; multiple paths accommodate diverse mental models',
        example:
          'User can find "billing" via sidebar navigation, account dropdown, search, and contextual links within invoices',
      },
      {
        title: 'Test Across Cultures',
        description:
          'Validate icons, metaphors, and categorizations with users from different cultural backgrounds',
        rationale:
          'Visual metaphors and category prototypes vary significantly across cultures',
        example:
          'A "mailbox" icon looks different in the US, UK, and Japan—test with representative international users',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Semantic structure must convey the same category relationships that visual grouping communicates',
        implementation:
          'Use proper heading levels, landmark roles, and list structures so assistive technology users perceive the same categories sighted users see via visual grouping',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Icons that rely on prototype matching must have text alternatives',
        implementation:
          'Provide descriptive alt text and visible labels alongside icons; never rely solely on an icon to communicate function',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Elements with the same function must be identified consistently',
        implementation:
          'Use the same icon and label for the same function everywhere; inconsistency breaks prototype matching for all users, especially assistive technology users',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Category headings must be descriptive and match user mental models',
        implementation:
          'Use clear, user-tested category labels as headings; avoid jargon that only makes sense to sighted users scanning visual layout',
      },
    ],

    ethics: [
      {
        concern: 'Stereotype Reinforcement',
        severity: 'critical',
        explanation:
          'Prototype-based design can encode and amplify societal stereotypes, especially in recommendations, categorization, and personalization',
        mitigation:
          'Audit algorithms and category structures for bias. Use behavioral data over demographic assumptions. Test with diverse user groups and actively seek out edge cases.',
      },
      {
        concern: 'Exclusion Through Prototype Narrowing',
        severity: 'high',
        explanation:
          'Designing only for the majority prototype excludes users who don\'t fit the expected pattern',
        mitigation:
          'Design for the full range of users, not just the most "representative" user. Include diverse personas in testing. Provide multiple paths to content.',
      },
      {
        concern: 'Filter Bubble Creation',
        severity: 'high',
        explanation:
          'Similarity-based recommendations can trap users in echo chambers of same-type content',
        mitigation:
          'Introduce diversity and serendipity in recommendations. Allow users to broaden or adjust their preference signals. Show content from outside the matched prototype.',
      },
      {
        concern: 'Hiring and Evaluation Bias',
        severity: 'critical',
        explanation:
          'Matching candidates to a "successful employee" prototype perpetuates historical bias in who gets hired or promoted',
        mitigation:
          'Use structured criteria-based evaluation rather than prototype matching. Blind screening where possible. Actively measure and report on diversity of outcomes.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Subjective Probability: A Judgment of Representativeness',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1972,
        doi: '10.1016/0010-0285(72)90016-3',
        description:
          'The foundational paper introducing the representativeness heuristic',
        type: 'foundational',
      },
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        url: 'https://science.sciencemag.org/content/185/4157/1124',
        description:
          'The seminal Science paper covering representativeness, availability, and anchoring heuristics',
        type: 'foundational',
      },
      {
        title: 'Extensional Versus Intuitive Reasoning: The Conjunction Fallacy in Probability Judgment',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1983,
        doi: '10.1037/0033-295X.90.4.293',
        description:
          'The "Linda problem" paper demonstrating the conjunction fallacy as a consequence of representativeness',
        type: 'foundational',
      },
      {
        title: 'Representativeness Revisited: Attribute Substitution in Intuitive Judgment',
        author: 'Kahneman, D., & Frederick, S.',
        year: 2002,
        description:
          'Modern reanalysis of representativeness as attribute substitution in dual-process theory',
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
          'Comprehensive coverage of representativeness heuristic by its discoverer, including the Linda problem and base-rate neglect',
        type: 'foundational',
      },
      {
        title: 'Judgment in Managerial Decision Making',
        author: 'Bazerman, Max H., & Moore, Don A.',
        year: 2012,
        isbn: '9781118065709',
        description:
          'Practical coverage of representativeness heuristic in business and design decision-making contexts',
        type: 'practical',
      },
      {
        title: 'The Art of Thinking Clearly',
        author: 'Dobelli, Rolf',
        year: 2013,
        isbn: '9780062219695',
        description:
          'Accessible overview of representativeness and related biases with everyday examples',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Mental Models in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/mental-models/',
        description:
          'Practical guide to understanding and leveraging user mental models in interface design',
        type: 'practical',
      },
      {
        title: 'Card Sorting: Uncover Users\' Mental Models',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/card-sorting-definition/',
        description:
          'How to use card sorting to align information architecture with user prototypes',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Linda Problem - Representativeness Heuristic',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=cpwSGsb-rTs',
        description:
          'Accessible video explanation of the representativeness heuristic with the Linda problem',
        type: 'foundational',
      },
      {
        title: 'Heuristics and Biases - Representativeness',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=wSJKKsVVXj4',
        description:
          'Overview of representativeness heuristic with practical decision-making examples',
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
      'recency-effect',
      'von-restorff-effect',
      'loss-aversion',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'recency-bias',
      'salience-bias',
      'vividness-effect',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'recency-bias',
        'salience-bias',
      ],
    },
  },
};
