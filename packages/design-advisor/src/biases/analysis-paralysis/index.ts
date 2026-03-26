/**
 * ANALYSIS PARALYSIS
 *
 * We overthink decisions to the point of inaction
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const analysisParalysis: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'analysis-paralysis',
    name: 'Analysis Paralysis',
    aliases: ['Overchoice', 'Choice Overload', 'Decision Fatigue', 'Paradox of Choice'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'decision-making',
      'choice-overload',
      'options',
      'simplification',
      'progressive-disclosure',
      'recommendation',
      'inaction',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We overthink decisions to the point of inaction',

    detailed: `Analysis paralysis occurs when an individual or group becomes so overwhelmed by the complexity of a decision, the number of available options, or the volume of information to process that they are unable to make a decision at all. The decision is either endlessly delayed, delegated, or avoided entirely.

This bias is particularly relevant in digital product design, where users are frequently confronted with feature-rich interfaces, extensive configuration options, and complex comparison matrices. When presented with too many choices without clear guidance, users experience cognitive overload, increased anxiety about making the "wrong" choice, and ultimately disengage.

Designers must actively combat analysis paralysis by structuring choices, providing smart defaults and recommendations, using progressive disclosure to manage complexity, and guiding users through decision flows step by step. The goal is to reduce cognitive load while preserving user autonomy and access to the full range of options when needed.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Analysis paralysis arises from the interaction of several cognitive mechanisms:

1. **Cognitive Overload**: Working memory has limited capacity (roughly 7 +/- 2 items). When options exceed this threshold, the brain struggles to evaluate trade-offs effectively
2. **Loss Aversion in Choice**: Each option considered introduces a potential "loss" of the benefits of unchosen alternatives, creating escalating regret anxiety
3. **Satisficing vs. Maximizing**: Maximizers who seek the "best" option are especially vulnerable, as more options make it harder to confirm any choice is optimal
4. **Evaluation Difficulty**: When options are similar or incomparable on key dimensions, the brain lacks a clear heuristic for deciding, leading to deferral
5. **Opportunity Cost Salience**: Awareness that choosing one option means forgoing others increases the perceived stakes of the decision, encouraging avoidance

The result is a paradox: more freedom of choice leads to less action, lower satisfaction, and greater decision anxiety.`,
    },

    realWorldExample: `In a famous 2000 study by Sheena Iyengar and Mark Lepper, a grocery store displayed either 6 or 24 varieties of jam. While the large display attracted more initial attention (60% vs 40% stopped), only 3% of those who saw 24 options purchased, compared to 30% of those who saw 6 options. The abundance of choice created paralysis: shoppers could not commit to a single jar when faced with too many alternatives.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Analysis paralysis directly impacts conversion, engagement, and user satisfaction in interfaces. When users face too many options, unclear paths, or complex comparisons without guidance, they freeze, abandon, or defer decisions. Designers can combat this by:

- Limiting visible choices and using progressive disclosure for additional options
- Providing clear recommendations, "best for you" labels, and smart defaults
- Using step-by-step wizards to break complex decisions into manageable stages
- Building focused comparison tools that highlight meaningful differences
- Offering clear, prominent calls-to-action that reduce ambiguity about next steps`,

    whenToUse: [
      {
        title: 'Product Selection Pages',
        scenario:
          'When users must choose between multiple products, plans, or configurations',
        example:
          'Show 3-4 curated plans with a "Recommended" badge on the best-fit option, with a "Compare all plans" link for those who want more detail',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding Flows',
        scenario: 'When new users must configure preferences or select features',
        example:
          'Use a step-by-step wizard with sensible defaults pre-selected, allowing users to accept defaults or customize one setting at a time',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Search and Filter Interfaces',
        scenario: 'When users browse large catalogs or datasets',
        example:
          'Show a curated "Top picks for you" section above full results, with progressive filter options that start simple and expand on demand',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Settings and Preferences',
        scenario: 'When users configure complex application settings',
        example:
          'Provide "Simple" and "Advanced" modes, with simple mode showing only the 5 most impactful settings and smart defaults for the rest',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Checkout and Conversion Flows',
        scenario: 'When users are about to commit to a purchase or sign-up',
        example:
          'Minimize distractions: single primary CTA, pre-filled defaults for shipping and payment, clear summary of what they are getting',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Expert Power-User Tools',
        reason:
          'Experts often need access to all options simultaneously and prefer control over simplification',
        consequence:
          'Oversimplifying interfaces for experts reduces efficiency and causes frustration',
        alternative:
          'Offer both streamlined and expert modes; let power users toggle full option visibility',
      },
      {
        title: 'High-Stakes Irreversible Decisions',
        reason:
          'Encouraging quick decisions on major life choices (medical, legal, financial) can cause harm',
        consequence:
          'Users may commit to suboptimal outcomes without adequate consideration',
        alternative:
          'Provide structured decision aids that organize complexity without rushing the choice',
      },
      {
        title: 'Exploration-Focused Experiences',
        reason:
          'Sometimes browsing and discovering options IS the experience (e.g., Pinterest, Netflix browsing)',
        consequence:
          'Prematurely narrowing options kills serendipity and exploration joy',
        alternative:
          'Balance guidance with room for discovery; use recommendations as starting points, not hard limits',
      },
      {
        title: 'Regulatory or Compliance Contexts',
        reason:
          'Hiding options that users are legally required to see can create liability',
        consequence:
          'Non-compliance with regulations or failure to obtain informed consent',
        alternative:
          'Present required options clearly but use visual hierarchy to guide attention to the most relevant ones',
      },
    ],

    commonMistakes: [
      {
        title: 'Displaying All Options at Once',
        description:
          'Showing every available option, feature, or configuration on a single screen with no hierarchy',
        why: 'Users cannot process large option sets effectively; cognitive overload triggers avoidance',
        fix: 'Use progressive disclosure: show top 3-5 options, with "Show more" or expandable sections for the rest',
      },
      {
        title: 'No Clear Recommendation',
        description:
          'Presenting options as equally valid without indicating which is best for common use cases',
        why: 'Without a recommendation anchor, users must evaluate every option themselves, increasing cognitive load',
        fix: 'Add "Recommended", "Most Popular", or "Best Value" labels to guide the majority of users',
      },
      {
        title: 'Overly Complex Comparison Matrices',
        description:
          'Feature comparison tables with 20+ rows and tiny checkmarks that all look similar',
        why: 'Dense comparison tables make differences hard to spot and increase evaluation effort',
        fix: 'Highlight only the key differentiators between options; let users expand to see full comparisons',
      },
      {
        title: 'Too Many Filters Without Guidance',
        description:
          'Exposing every possible filter dimension simultaneously without suggesting which to use first',
        why: 'Users do not know which filters matter most, leading to either ignoring filters or spending too long configuring them',
        fix: 'Show smart defaults and suggested filter combinations; reveal advanced filters progressively',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines how many options are visible simultaneously and how the decision flow is structured',
        examples: [
          'Grid layouts with too many equally-weighted cards create choice overload',
          'Single-column step-by-step layouts reduce visible options per screen',
          'Card-based layouts with a highlighted "recommended" card guide attention',
          'Collapsible sections and tabs manage option density effectively',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy helps users quickly identify key differences and recommendations',
        examples: [
          'Bold plan names and prices help users scan quickly across options',
          'De-emphasized fine print reduces noise in comparison views',
          'Clear headings for each step in a wizard reduce perceived complexity',
          'Consistent typography across options enables faster comparison',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color draws attention to recommended options and primary actions, reducing decision effort',
        examples: [
          'Highlighted borders or backgrounds on recommended plans guide selection',
          'Primary-color CTAs on the target option versus neutral on alternatives',
          'Muted colors on less relevant options reduce visual competition',
          'Status colors (green for recommended, gray for basic) create instant hierarchy',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how users navigate through options and commit to choices',
        examples: [
          'Step-by-step wizards break complex decisions into manageable stages',
          'Inline expansion ("Show more details") prevents upfront overload',
          'Hover/focus comparisons reduce need for side-by-side matrix views',
          'Auto-play or auto-select defaults reduce the number of active decisions required',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy determines how options are described, differentiated, and recommended',
        examples: [
          '"Best for teams" and "Best for individuals" labels simplify plan selection',
          'Concise feature descriptions (3-5 bullets) outperform exhaustive lists',
          'Persona-based recommendations ("If you are a developer...") reduce choice scope',
          'Clear value propositions per option help users self-select quickly',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible decision flows are especially important because assistive technology users experience choice overload more acutely',
        examples: [
          'Screen reader users must traverse all options linearly, so fewer visible options reduces fatigue',
          'ARIA landmarks and clear headings help users skip to relevant sections',
          'Keyboard-navigable wizards with clear focus indicators reduce decision friction',
          'Live regions announcing recommendations help assistive technology users find guided paths',
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
        title: 'Curated Plan Selection with Recommendation',
        description:
          'SaaS pricing page showing 3 plans with the middle plan highlighted as recommended',
        code: `<div class="pricing-grid">
  <div class="plan">
    <h3>Starter</h3>
    <div class="price">$9<span>/month</span></div>
    <ul>
      <li>5 projects</li>
      <li>1 user</li>
      <li>Basic analytics</li>
    </ul>
    <button class="secondary">Get Started</button>
  </div>

  <div class="plan recommended">
    <span class="badge">Recommended</span>
    <h3>Professional</h3>
    <div class="price">$29<span>/month</span></div>
    <ul>
      <li>Unlimited projects</li>
      <li>5 users</li>
      <li>Advanced analytics</li>
    </ul>
    <button class="primary">Start Free Trial</button>
  </div>

  <div class="plan">
    <h3>Enterprise</h3>
    <div class="price">Custom</div>
    <ul>
      <li>Everything in Pro</li>
      <li>Unlimited users</li>
      <li>Dedicated support</li>
    </ul>
    <button class="secondary">Contact Sales</button>
  </div>
</div>`,
        explanation:
          'Three options with a clear recommendation reduces the decision to a simple "accept the recommendation or consciously deviate." The recommended badge and primary button color provide a clear default path.',
        principle:
          'Limit visible options and provide a clear recommendation to reduce decision effort',
        metrics: {
          before: '23% conversion with 5 unlabeled plans',
          after: '41% conversion with 3 plans and recommendation badge',
          improvement: '78% increase in plan selection conversion',
        },
      },
      {
        title: 'Step-by-Step Configuration Wizard',
        description:
          'Multi-step onboarding that breaks complex setup into manageable stages',
        code: `<div class="wizard">
  <nav class="wizard-steps">
    <span class="step completed">1. Account</span>
    <span class="step active">2. Team Size</span>
    <span class="step upcoming">3. Features</span>
    <span class="step upcoming">4. Review</span>
  </nav>

  <div class="wizard-body">
    <h2>How large is your team?</h2>
    <p>We'll customize your workspace based on your answer.</p>

    <div class="options">
      <button class="option">Just me</button>
      <button class="option recommended">2-10 people</button>
      <button class="option">11-50 people</button>
      <button class="option">50+ people</button>
    </div>

    <div class="wizard-footer">
      <button class="back">Back</button>
      <button class="next primary">Continue</button>
    </div>
  </div>
</div>`,
        explanation:
          'Breaking a complex configuration into 4 simple steps means users only face one small decision at a time. Progress indicators reduce anxiety by showing how close they are to completion.',
        principle:
          'Decompose complex decisions into sequential single-choice steps',
      },
      {
        title: 'Smart Search with Top Picks',
        description:
          'Product catalog showing curated picks above full results',
        code: `<section class="search-results">
  <div class="top-picks">
    <h3>Top picks for you</h3>
    <div class="picks-row">
      <div class="pick-card highlighted">
        <span class="badge">Best Match</span>
        <h4>Product A</h4>
        <p class="match-reason">Based on your past purchases</p>
        <button class="primary">View Details</button>
      </div>
      <div class="pick-card">
        <h4>Product B</h4>
        <p class="match-reason">Popular with similar buyers</p>
        <button class="secondary">View Details</button>
      </div>
    </div>
  </div>

  <details class="all-results">
    <summary>Show all 247 results</summary>
    <!-- Full result grid loads on expand -->
  </details>
</section>`,
        explanation:
          'Showing 2 curated recommendations with clear reasoning ("Based on your past purchases") gives users a fast path to a good decision. The full 247 results remain accessible but are not displayed upfront.',
        principle:
          'Use smart recommendations to shortcut decision-making while preserving full access',
        metrics: {
          before: '12% click-through from search results (247 items displayed)',
          after: '34% click-through with top picks shown first',
          improvement: '183% increase in engagement with search results',
        },
      },
      {
        title: 'Focused Comparison Tool',
        description:
          'Side-by-side comparison that highlights only meaningful differences',
        code: `<div class="comparison">
  <h3>Key Differences</h3>
  <table class="diff-table">
    <thead>
      <tr>
        <th></th>
        <th>Starter</th>
        <th class="recommended">Pro <span class="badge">Best Value</span></th>
      </tr>
    </thead>
    <tbody>
      <tr class="differs">
        <td>Projects</td>
        <td>5</td>
        <td class="recommended">Unlimited</td>
      </tr>
      <tr class="differs">
        <td>Team members</td>
        <td>1</td>
        <td class="recommended">Up to 10</td>
      </tr>
      <tr class="differs">
        <td>Analytics</td>
        <td>Basic</td>
        <td class="recommended">Advanced + AI</td>
      </tr>
    </tbody>
  </table>
  <details>
    <summary>See all features (12 more)</summary>
    <!-- Full comparison table -->
  </details>
</div>`,
        explanation:
          'Instead of a 15-row feature comparison, this shows only the 3 features that actually differ between plans. Users can expand to see all features if needed, but the key decision factors are immediately clear.',
        principle:
          'Surface key differentiators rather than exhaustive feature lists',
      },
    ],

    bad: [
      {
        title: 'Overwhelming Feature Matrix',
        description:
          'Enterprise software comparison with dozens of rows and no hierarchy',
        code: `<!-- DON'T DO THIS -->
<div class="comparison-matrix">
  <h2>Compare All Plans</h2>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Free</th>
        <th>Basic</th>
        <th>Standard</th>
        <th>Professional</th>
        <th>Enterprise</th>
        <th>Enterprise Plus</th>
      </tr>
    </thead>
    <tbody>
      <!-- 35 rows of checkmarks and X marks -->
      <tr><td>Feature 1</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
      <tr><td>Feature 2</td><td>✗</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
      <tr><td>Feature 3</td><td>✗</td><td>✗</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
      <!-- ... 32 more rows -->
    </tbody>
  </table>
</div>`,
        explanation:
          'Six plans with 35 features creates a grid of 210 cells to evaluate. No recommendation, no hierarchy, no differentiation. Users cannot identify which plan is right for them without studying every row.',
        principle:
          'Too many options with too many dimensions guarantees decision paralysis',
      },
      {
        title: 'Filter Overload',
        description:
          'E-commerce sidebar with every possible filter exposed simultaneously',
        code: `<!-- DON'T DO THIS -->
<aside class="filters">
  <h3>Filter Results</h3>
  <div class="filter-group">
    <h4>Category (47)</h4>
    <!-- 47 checkboxes -->
  </div>
  <div class="filter-group">
    <h4>Brand (123)</h4>
    <!-- 123 checkboxes -->
  </div>
  <div class="filter-group">
    <h4>Price Range</h4>
    <!-- 8 ranges -->
  </div>
  <div class="filter-group">
    <h4>Color (24)</h4>
    <!-- 24 color swatches -->
  </div>
  <div class="filter-group">
    <h4>Size (18)</h4>
    <!-- 18 sizes -->
  </div>
  <div class="filter-group">
    <h4>Material (15)</h4>
    <!-- 15 options -->
  </div>
  <div class="filter-group">
    <h4>Rating</h4>
    <!-- 5 stars -->
  </div>
  <div class="filter-group">
    <h4>Availability</h4>
    <!-- 3 options -->
  </div>
</aside>`,
        explanation:
          'Exposing 8 filter groups with 240+ total options creates a meta-decision problem: users must first decide HOW to filter before they can decide WHAT to buy. Most users will skip filtering entirely or abandon.',
        principle:
          'Excessive filter options create a secondary layer of analysis paralysis',
      },
      {
        title: 'No Default or Recommendation',
        description:
          'Configuration screen with many options and no guidance',
        code: `<!-- DON'T DO THIS -->
<form class="settings">
  <h2>Configure Your Workspace</h2>
  <p>Set up your preferences</p>

  <div class="setting">
    <label>Theme</label>
    <select>
      <option value="">Choose a theme...</option>
      <option>Light</option>
      <option>Dark</option>
      <option>Solarized</option>
      <option>Monokai</option>
      <option>Nord</option>
      <option>Dracula</option>
      <option>One Dark</option>
      <!-- 12 more themes -->
    </select>
  </div>

  <div class="setting">
    <label>Language</label>
    <select><option value="">Choose...</option><!-- 40 options --></select>
  </div>

  <div class="setting">
    <label>Notification frequency</label>
    <select><option value="">Choose...</option><!-- 6 options --></select>
  </div>

  <!-- 8 more settings, all with "Choose..." -->

  <button class="primary" disabled>Save (complete all fields)</button>
</form>`,
        explanation:
          'Every field starts blank with no defaults, requiring 11 separate decisions before the user can proceed. The disabled save button adds pressure. Users will abandon or rush through with arbitrary selections.',
        principle:
          'Forcing explicit decisions on every setting without defaults maximizes cognitive load',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Auto-play and "Top Picks"',
        url: 'https://www.netflix.com',
        description:
          'Netflix combats the "what should I watch" paralysis by auto-playing a featured title and showing personalized "Top Picks For You" and "Because You Watched X" categories. Rather than browsing 15,000+ titles, users see curated rows tailored to their viewing patterns.',
        effectiveness: 'very-effective',
        analysis:
          'Netflix spends $1B+ annually on recommendation algorithms specifically to prevent analysis paralysis. The auto-play feature bypasses choice entirely for passive viewers. Personalized rows reduce the effective catalog from thousands to dozens of relevant titles.',
      },
      {
        company: 'Amazon',
        product: "Amazon's Choice Badge",
        url: 'https://www.amazon.com',
        description:
          'Amazon displays an "Amazon\'s Choice" badge on products that are highly rated, well-priced, and ready to ship. In categories with thousands of options, this badge provides an instant recommended path.',
        effectiveness: 'very-effective',
        analysis:
          'The badge transforms a complex multi-factor evaluation (price, reviews, shipping, quality) into a single trust signal. Users who might otherwise compare 50+ products can confidently select the badged option, dramatically reducing decision time and increasing conversion.',
      },
      {
        company: 'Spotify',
        product: 'Daily Mix and Discover Weekly',
        url: 'https://www.spotify.com',
        description:
          'Rather than asking users to browse 100M+ tracks, Spotify creates personalized Daily Mix playlists and Discover Weekly collections. Users hit play on a curated mix instead of choosing individual songs.',
        effectiveness: 'very-effective',
        analysis:
          'Spotify converts an impossible decision (choose from 100M songs) into a simple one (pick one of 6 Daily Mixes). Each mix is branded with recognizable artist imagery and genre labels, making even the meta-choice straightforward.',
      },
      {
        company: 'Airbnb',
        product: 'Top Picks and Smart Pricing',
        url: 'https://www.airbnb.com',
        description:
          'Airbnb shows "Guest favorites" badges and curates a "Top picks" section at the top of search results. Rather than evaluating hundreds of properties on price, location, reviews, and amenities, users see pre-vetted recommendations.',
        effectiveness: 'effective',
        analysis:
          'The "Guest favorites" badge and top picks reduce a multi-dimensional decision (location, price, amenities, host rating, photos) to a curated shortlist. Map-based search also lets users constrain geographically first, then choose from a smaller set.',
      },
    ],

    abTests: [
      {
        title: 'Plan Selection: 3 Plans vs 6 Plans',
        hypothesis:
          'Reducing visible plans from 6 to 3 with a recommendation will increase conversion',
        controlVersion: {
          description:
            'Pricing page with 6 plans displayed in a horizontal row, no recommendation badge, full feature comparison table below',
          metrics: {
            conversionRate: '14.2%',
            timeOnPage: '4:35',
            bounceRate: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page with 3 plans, "Recommended" badge on middle tier, key differentiators only, "Compare all features" expandable section',
          metrics: {
            conversionRate: '27.8%',
            timeOnPage: '1:52',
            bounceRate: '21%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Reducing options by 50% and adding a recommendation nearly doubled conversion rate. Time on page decreased by 59%, indicating faster decision-making rather than less engagement. Bounce rate dropped 45%.',
          learnings: [
            'Fewer visible options with clear guidance dramatically reduce decision friction',
            'Users who expanded "Compare all features" converted at the same rate as those who did not, suggesting the option provides confidence without causing paralysis',
            'The recommendation badge was the single biggest driver: removing it while keeping 3 plans only achieved 19% conversion',
            'Mobile users benefited even more from fewer options (3.2x improvement vs 1.8x on desktop)',
          ],
        },
      },
      {
        title: 'Onboarding: All-at-Once vs Step-by-Step Wizard',
        hypothesis:
          'Breaking configuration into a step-by-step wizard will increase completion rate',
        controlVersion: {
          description:
            'Single-page onboarding form with 12 settings to configure, all visible at once, "Complete Setup" button at bottom',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '6:20',
            bounceRate: '42%',
          },
        },
        treatmentVersion: {
          description:
            'Step-by-step wizard with 4 steps (3 settings each), progress bar, smart defaults pre-filled, "Skip for now" option per step',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '3:45',
            bounceRate: '15%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The wizard more than doubled completion rate. Despite 40% of users clicking "Skip for now" on at least one step, 89% of those returned to configure skipped settings within 7 days. Smart defaults meant skipped steps still had valid configurations.',
          learnings: [
            'Breaking 12 decisions into 4 groups of 3 dramatically reduces perceived complexity',
            'Progress bars reduce anxiety about how much remains',
            '"Skip for now" is critical: it gives users an escape valve that prevents paralysis without abandonment',
            'Smart defaults serve as implicit recommendations, reducing the decision burden',
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
          'More than 5-7 equally weighted options visible on screen without clear hierarchy or recommendation',
        howToSpot:
          'Count the number of plan cards, product tiles, or selectable options visible without scrolling. Check for recommendation badges or visual differentiation.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Dense Comparison Matrices',
        description:
          'Feature comparison tables with many rows and columns, heavy with checkmarks and crosses',
        howToSpot:
          'Look for tables comparing 4+ options across 10+ features, especially with small text and minimal visual hierarchy',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'No Clear Primary Action',
        description:
          'Multiple CTAs of equal visual weight competing for attention without clear priority',
        howToSpot:
          'Check if all buttons have the same color, size, and prominence. Look for missing "primary" vs "secondary" styling.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Exposed Filter Overload',
        description:
          'Filter sidebars or panels showing many filter groups and options simultaneously',
        howToSpot:
          'Count the total number of filter checkboxes, dropdowns, and sliders visible on the page. More than 15-20 filter options visible at once signals overload.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Defaults or Pre-Selection',
        description:
          'Forms, configurations, or selection interfaces where no option is pre-selected or recommended',
        howToSpot:
          'Look for empty dropdowns ("Choose..."), unselected radio groups, or configuration pages with no defaults filled in',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Unguided Option Grid Pattern',
        description: 'Multiple options displayed in a grid with no visual hierarchy, recommendation, or guidance on which to choose',
        indicators: ['Equal-weight cards in a grid', 'No "Recommended" or "Popular" badges', 'All CTAs have the same styling', 'No persona-based guidance ("Best for...")'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Information Overload Pattern',
        description: 'Too much information presented at once, requiring users to process everything before acting',
        indicators: ['Long feature comparison tables', 'Dense text blocks describing options', 'Many data points per option without summary', 'No progressive disclosure'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Multi-Decision Bottleneck Pattern',
        description: 'Multiple independent decisions required simultaneously before the user can proceed',
        indicators: ['Complex forms with many required fields', 'Configuration pages with no defaults', 'All settings on a single page', 'Disabled submit until all decisions made'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Recommendation Pattern',
        description: 'Options presented without any guidance, recommendation, or indication of what most users choose',
        indicators: ['No "Most Popular" or "Recommended" labels', 'No usage-based suggestions', 'Equal visual weight on all options', 'No social proof indicators'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many options are visible to the user at the point of decision?',
      'Is there a clear recommendation or "best for you" indication?',
      'Can users compare options without scrolling or opening new views?',
      'Are there smart defaults pre-selected for common use cases?',
      'Is progressive disclosure used to manage complexity?',
      'How many separate decisions must users make before proceeding?',
      'Is there a step-by-step flow for complex configurations?',
      'Are filter and sort options overwhelming or well-organized?',
      'Is there a single clear primary CTA, or do multiple buttons compete?',
      'Can users easily undo or change decisions to reduce commitment anxiety?',
      'Is there a "skip" or "decide later" option for non-critical choices?',
      'Are comparison tools focused on key differentiators or exhaustive feature lists?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in analysis paralysis and choice overload.

Analyze the provided design for analysis paralysis patterns. Identify:

1. **Option Density**: How many choices are presented simultaneously
2. **Decision Guidance**: Whether recommendations, defaults, or guidance are provided
3. **Information Architecture**: How decision-relevant information is organized and layered
4. **Progressive Disclosure**: Whether complexity is managed through staged revelation
5. **Comparison Support**: How users are helped to evaluate trade-offs between options

For each pattern found:
- Count the number of visible options at the decision point
- Assess whether clear guidance or recommendations are present
- Evaluate if progressive disclosure manages complexity appropriately
- Determine if defaults and pre-selections reduce decision burden
- Check for "escape valves" (skip, decide later, undo)

Consider:
- Is the number of visible options appropriate for the decision complexity?
- Are there clear recommendations or "most popular" indicators?
- Is the comparison focused on key differentiators or exhaustively detailed?
- Can users easily proceed with defaults and customize later?
- Are decisions staged sequentially or demanded all at once?
- Is there a clear primary action that resolves the decision?

Provide actionable recommendations for reducing decision friction while preserving user autonomy.`,

    outputSchema: {
      type: 'object',
      properties: {
        paralysisPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              optionCount: { type: 'number' },
              hasRecommendation: { type: 'boolean' },
              hasDefaults: { type: 'boolean' },
              hasProgressiveDisclosure: { type: 'boolean' },
              severityScore: { type: 'number' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'optionCount',
              'hasRecommendation',
              'severityScore',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            decisionComplexity: { type: 'number' },
            guidanceQuality: { type: 'number' },
            progressiveDisclosure: { type: 'number' },
            defaultsQuality: { type: 'number' },
          },
          required: [
            'decisionComplexity',
            'guidanceQuality',
            'progressiveDisclosure',
            'defaultsQuality',
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
        'paralysisPatterns',
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
        title: 'Audit Decision Points',
        description:
          'Map every point in the user flow where a choice is required. Count options, assess complexity, and identify bottlenecks.',
        example:
          'Pricing page: 6 plans visible, 35-row comparison table, no recommendation. Checkout: 4 shipping options, 3 payment methods, address form.',
        tips: [
          'Walk through the flow as a new user and count decisions',
          'Identify which decisions are critical vs. deferrable',
          'Note where users drop off in analytics (often decision points)',
        ],
      },
      {
        step: 2,
        title: 'Reduce Visible Options',
        description:
          'Limit simultaneously visible options to 3-5 at each decision point. Use progressive disclosure for additional choices.',
        example:
          'Reduce 6 pricing plans to 3 visible tiers with a "Compare all plans" expandable section for the rest',
        tips: [
          'The magic number is 3-4 for most selection interfaces',
          'Use "Show more" patterns to preserve access without overloading',
          'Group related options into categories to reduce perceived count',
        ],
      },
      {
        step: 3,
        title: 'Add Clear Recommendations',
        description:
          'Provide explicit guidance on which option is best for common use cases through badges, labels, and visual highlighting',
        example:
          'Add "Recommended" badge to the mid-tier plan, with "Best for teams of 2-10" subtext',
        tips: [
          'Use data to determine what most users actually choose',
          'Provide persona-based recommendations when possible',
          'Social proof ("Most Popular") is powerful recommendation signal',
        ],
      },
      {
        step: 4,
        title: 'Implement Smart Defaults',
        description:
          'Pre-select the most common or recommended option so users can accept the default without active deliberation',
        example:
          'Pre-select "Professional" plan, pre-fill settings with sensible defaults, pre-check the most common shipping option',
        tips: [
          'Defaults should serve the majority of users well',
          'Make it easy to change defaults for those who want to customize',
          'Track which defaults users change to optimize over time',
        ],
      },
      {
        step: 5,
        title: 'Design Sequential Decision Flows',
        description:
          'Break complex multi-decision processes into step-by-step wizards where each screen has only 1-3 choices',
        example:
          'Replace 12-field configuration page with a 4-step wizard: Account (3 fields) > Team (3 fields) > Features (3 toggles) > Review',
        tips: [
          'Show progress indicators to reduce anxiety',
          'Allow "Skip for now" on non-critical steps',
          'Provide a review/summary step before final commit',
        ],
      },
      {
        step: 6,
        title: 'Measure and Iterate',
        description:
          'Track decision metrics: time to decision, conversion rate, abandonment rate, and post-decision satisfaction',
        example:
          'A/B test 3-plan vs 5-plan layouts, measure conversion rate and time to selection. Survey post-purchase satisfaction.',
        tips: [
          'High time-on-page at decision points often signals paralysis',
          'High bounce rates on comparison pages indicate overload',
          'Post-decision satisfaction surveys detect regret and anxiety',
          'Funnel analytics show where users abandon multi-step flows',
        ],
      },
    ],

    dos: [
      'Limit visible choices to 3-5 options at each decision point',
      'Provide clear "Recommended" or "Most Popular" labels',
      'Use progressive disclosure to manage complexity ("Show more")',
      'Pre-select smart defaults for common use cases',
      'Break complex decisions into sequential steps with progress indicators',
      'Highlight key differentiators rather than exhaustive comparisons',
      'Include "Skip for now" or "Decide later" options for non-critical choices',
      'Use persona-based guidance ("Best for developers", "Best for teams")',
      'Offer undo/change capabilities to reduce commitment anxiety',
      'Test option count and layout with real users to find the optimal balance',
    ],

    donts: [
      'Don\'t display all available options simultaneously without hierarchy',
      'Don\'t present feature comparison tables with 10+ rows and no highlighting',
      'Don\'t require every setting to be configured before users can proceed',
      'Don\'t show equal visual weight on all options with no guidance',
      'Don\'t add more filter options without testing for filter paralysis',
      'Don\'t use "Choose..." empty dropdowns when a smart default would work',
      'Don\'t force users through irreversible choices without review steps',
      'Don\'t assume more options equals better user experience',
      'Don\'t hide the "simple path" behind a wall of advanced options',
      'Don\'t create decision chains where each choice reveals more choices',
    ],

    bestPractices: [
      {
        title: 'Progressive Disclosure for Options',
        description:
          'Show the most relevant 3-5 options prominently, with additional options accessible via "Show more" or expandable sections',
        rationale:
          'Preserves user autonomy and access to all choices while preventing initial overload',
        example:
          'Netflix shows 1 row of "Top Picks" (6 titles) above full browse; Amazon shows "Amazon\'s Choice" above full results',
      },
      {
        title: 'Recommendation as Default Path',
        description:
          'Always provide a clear recommendation with a visual badge and primary CTA styling',
        rationale:
          'Most users will follow the recommendation, converting what was a complex evaluation into a simple accept/reject decision',
        example:
          '"Recommended" badge + primary button color on the target plan; others get secondary button styling',
      },
      {
        title: 'Step-by-Step Over All-at-Once',
        description:
          'Break multi-decision processes into sequential single-focus steps with progress indicators',
        rationale:
          'Users can handle one decision at a time much more easily than five simultaneously',
        example:
          '4-step checkout (Cart > Shipping > Payment > Confirm) vs. single-page checkout with all fields',
      },
      {
        title: 'Key Differentiators Over Exhaustive Comparison',
        description:
          'In comparison views, highlight the 3-5 features that actually differ between options rather than listing every feature',
        rationale:
          'Users need to understand what makes options different, not what they share in common',
        example:
          'Show only differing features in the default comparison view; "See all features" expands the full table',
      },
      {
        title: 'Smart Defaults Reduce Decisions',
        description:
          'Pre-fill forms, pre-select options, and provide sensible default configurations',
        rationale:
          'Each pre-selected default is one fewer active decision the user must make',
        example:
          'Pre-select the most common shipping method, pre-fill country from IP geolocation, default notification settings to "recommended"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure recommendations and option groupings are conveyed semantically',
        implementation:
          'Use ARIA labels for recommendation badges ("Recommended plan"), proper table markup for comparisons, and role="group" for option sets',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clear headings for each decision step reduce cognitive load for all users',
        implementation:
          'Use proper heading hierarchy in wizards (h2 for step title, h3 for option groups). Label each step in multi-step flows.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for selection interfaces',
        implementation:
          'Add descriptive labels explaining what each option means and who it is best for. Use aria-describedby for additional context.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Ensure selecting an option does not cause unexpected context changes',
        implementation:
          'Do not auto-advance wizard steps on selection. Let users confirm their choice before proceeding. Announce changes via live regions.',
      },
    ],

    ethics: [
      {
        concern: 'Manipulating Through Artificial Scarcity of Options',
        severity: 'high',
        explanation:
          'Hiding genuinely useful options to drive users toward a specific choice that benefits the business but not the user',
        mitigation:
          'Ensure all options remain accessible. Progressive disclosure should hide less popular options, not options that would better serve certain users.',
      },
      {
        concern: 'Biased Recommendations',
        severity: 'high',
        explanation:
          'Labeling the highest-margin option as "Recommended" when it does not best serve most users',
        mitigation:
          'Base recommendations on actual user data, satisfaction scores, and fit. Disclose the criteria behind recommendations.',
      },
      {
        concern: 'Dark Defaults',
        severity: 'critical',
        explanation:
          'Pre-selecting options that benefit the company (expensive plan, auto-renew, data sharing) knowing users will accept defaults',
        mitigation:
          'Defaults should serve user interests first. Pre-select the option most users would choose if they carefully evaluated all options.',
      },
      {
        concern: 'Rushed Decision-Making',
        severity: 'medium',
        explanation:
          'Over-simplifying complex decisions to the point where users cannot make informed choices',
        mitigation:
          'Simplify the interface, not the information. Always allow access to full details for users who want them. Never remove relevant information.',
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
          'The foundational "jam study" demonstrating that extensive choice can reduce motivation to choose and post-choice satisfaction',
        type: 'foundational',
      },
      {
        title: 'Choice Overload: A Conceptual Review and Meta-Analysis',
        author: 'Chernev, A., Böckenholt, U., & Goodman, J.',
        year: 2015,
        doi: '10.1016/j.jcps.2014.08.002',
        description:
          'Comprehensive meta-analysis identifying four key preconditions for choice overload: decision task difficulty, choice set complexity, preference uncertainty, and decision goal',
        type: 'advanced',
      },
      {
        title: 'Doing Better but Feeling Worse: Looking for the "Best" Job Undermines Satisfaction',
        author: 'Iyengar, S. S., Wells, R. E., & Schwartz, B.',
        year: 2006,
        doi: '10.1111/j.1467-9280.2006.01677.x',
        description:
          'Demonstrates that maximizers who seek the best option experience more regret and less satisfaction despite objectively better outcomes',
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
          'The definitive book on how an abundance of choice leads to anxiety, decision fatigue, and reduced satisfaction',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers decision fatigue, cognitive load, and the limited capacity of System 2 deliberative thinking',
        type: 'foundational',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Practical UX guide advocating for simplicity and reduced cognitive load in web design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Hick\'s Law: Making the choice easier for users',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/hick-s-law-making-the-choice-easier-for-users',
        description:
          'Practical guide on applying Hick\'s Law (decision time increases with number of options) to interface design',
        type: 'practical',
      },
      {
        title: 'The Paradox of Choice in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/simplicity-vs-choice/',
        description:
          'UX-focused analysis of how to balance simplicity with adequate choice in digital interfaces',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Barry Schwartz (TED Talk)',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'Barry Schwartz\'s influential TED talk explaining why more choice leads to less happiness and more paralysis',
        type: 'foundational',
      },
      {
        title: 'How to Make Choosing Easier',
        author: 'Sheena Iyengar (TED Talk)',
        url: 'https://www.ted.com/talks/sheena_iyengar_how_to_make_choosing_easier',
        description:
          'Sheena Iyengar presents four techniques for mitigating choice overload: cut, concretize, categorize, condition for complexity',
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
      'paradox-of-choice',
      'decision-fatigue',
      'default-effect',
      'satisficing',
      'hicks-law',
    ],

    conflicts: [
      'autonomy-bias',
      'information-bias',
    ],

    confusedWith: [
      'choice-overload',
      'decision-fatigue',
      'information-overload',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'choice-overload',
        'overchoice',
        'decision-avoidance',
      ],
    },
  },
};
