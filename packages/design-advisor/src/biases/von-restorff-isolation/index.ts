/**
 * VON RESTORFF (ISOLATION) EFFECT
 *
 * An isolated item among homogeneous items is recalled
 * with greater accuracy due to attention capture through isolation.
 *
 * This variant focuses on the ISOLATION MECHANISM specifically,
 * distinct from the broader von-restorff-effect which covers
 * general distinctiveness.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const vonRestorffIsolation: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'von-restorff-isolation',
    name: 'Von Restorff (Isolation) Effect',
    aliases: ['Isolation Effect', 'Perceptual Isolation', 'Item Isolation Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'isolation',
      'whitespace',
      'attention-capture',
      'negative-space',
      'memory',
      'recall',
      'visual-hierarchy',
      'cta',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'An isolated item among homogeneous items is remembered better because isolation captures attention.',

    detailed: `The Von Restorff Isolation Effect describes the specific neural mechanism by which an item that is physically or contextually isolated from a set of otherwise homogeneous items is recalled with significantly greater accuracy. Unlike general distinctiveness (color, shape, size differences), the isolation mechanism operates through spatial separation and negative space.

When an element stands alone -- surrounded by whitespace, removed from a group, or placed as the sole item in a visual region -- the brain's attentional system treats it as a signal demanding processing. The surrounding emptiness acts as a frame, amplifying the isolated element's perceptual weight far beyond what its intrinsic properties would warrant.

In interface design, isolation is one of the most powerful tools for directing attention and ensuring memorability. A single CTA button surrounded by generous whitespace, a hero metric displayed alone on a dashboard, or a pull quote set apart from body text all leverage this mechanism. The key insight is that what you remove matters as much as what you add.`,

    psychologyBasis: {
      discoveredBy: 'Hedwig von Restorff',
      year: 1933,
      theory: 'Isolation Effect / Restorff Effect',
      mechanism: `The brain's attentional system prioritizes isolated items through a distinct neural pathway:

1. **Attentional Capture**: An item surrounded by empty space triggers an involuntary orientation response -- the brain treats isolation as a novelty signal
2. **Figure-Ground Separation**: Whitespace creates an unambiguous figure-ground relationship, making the isolated element the sole "figure" with maximum perceptual clarity
3. **Reduced Interference**: Homogeneous surrounding items compete for encoding resources; an isolated item faces no competition, leading to stronger memory traces
4. **Distinctiveness Encoding**: The encoding context (isolation) becomes part of the memory representation, providing an additional retrieval cue
5. **Serial Position Override**: Isolation overrides typical serial position effects -- an isolated item in the middle of a list is recalled as well as or better than first and last items

Hunt (1995) demonstrated that isolation effects operate at both the item level (individual distinctiveness) and the relational level (disruption of organizational structure), with the isolation mechanism producing the strongest recall advantages.`,
    },

    realWorldExample: `In Von Restorff's 1933 experiment, participants were shown a list of similar items (e.g., ten three-digit numbers) with one item that was isolated -- physically separated by blank space from the rest. The isolated item was recalled with dramatically higher accuracy, even when its intrinsic properties were identical to the other items. The isolation alone -- not color, size, or any other distinctive feature -- drove the memory advantage. This finding has been replicated hundreds of times and forms the basis for whitespace-driven design strategies used by Apple, Stripe, and other design-forward companies.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The isolation mechanism affects how users perceive importance, make decisions, and remember key interface elements. Designers can leverage isolation to:

- Direct attention to primary CTAs by surrounding them with generous whitespace
- Elevate key metrics or KPIs by displaying them as standalone hero elements
- Create visual breathing room that makes critical content unmissable
- Break monotonous lists to highlight breakout items
- Use negative space as a compositional tool to signal hierarchy and importance`,

    whenToUse: [
      {
        title: 'Primary Call-to-Action',
        scenario:
          'When a single action is the most important on the page',
        example:
          'Surround the primary CTA button with generous whitespace, removing competing elements from its visual neighborhood',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Hero Metrics on Dashboards',
        scenario: 'When one KPI or metric needs to dominate user attention',
        example:
          'Display a single revenue number or key metric in a large, isolated card with ample padding, separate from the metric grid below',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Breakout Elements in Lists',
        scenario: 'When one list item needs to stand out from a homogeneous set',
        example:
          'Add extra vertical spacing above and below the featured item, or pull it out of the list into its own visual region',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Pull Quotes and Testimonials',
        scenario: 'When a key quote or testimonial must be remembered',
        example:
          'Set the quote apart from body text with large margins, a distinct background region, and no adjacent competing content',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Pricing Plan Highlight',
        scenario: 'When directing users toward a recommended pricing tier',
        example:
          'Visually isolate the recommended plan with extra spacing, elevation, or vertical offset from adjacent plans',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Empty State or Onboarding Action',
        scenario: 'When guiding users to take a single first action in an empty interface',
        example:
          'Place the single action button centered in a large empty area, making it the only interactive element visible',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Equal-Weight Options',
        reason:
          'When all options are equally valid and the user should evaluate them impartially',
        consequence:
          'Isolating one option biases the decision toward it, potentially leading to suboptimal choices',
        alternative:
          'Present all options in a uniform grid with equal spacing and visual weight',
      },
      {
        title: 'Dense Data Interfaces',
        reason:
          'In data-heavy dashboards where screen real estate is precious, isolation wastes space',
        consequence:
          'Excessive whitespace reduces information density and forces scrolling',
        alternative:
          'Use subtle differentiation (borders, background tints) instead of spatial isolation',
      },
      {
        title: 'Accessibility-Critical Content',
        reason:
          'Spatial isolation may not translate to assistive technologies',
        consequence:
          'Screen reader users may not perceive the isolation-based emphasis',
        alternative:
          'Combine spatial isolation with semantic emphasis (headings, ARIA labels, role attributes)',
      },
      {
        title: 'Multiple Competing Priorities',
        reason:
          'Isolating more than one element negates the effect -- nothing feels special when everything is isolated',
        consequence:
          'Users experience no clear hierarchy; cognitive load increases',
        alternative:
          'Choose a single element to isolate and use secondary emphasis techniques for others',
      },
    ],

    commonMistakes: [
      {
        title: 'Isolating Too Many Elements',
        description:
          'Surrounding multiple elements with whitespace, diluting the isolation effect',
        why: 'Isolation works because it is rare; when everything is isolated, nothing is',
        fix: 'Limit spatial isolation to one or two elements per viewport. Use subtler methods for secondary emphasis.',
      },
      {
        title: 'Insufficient Whitespace',
        description:
          'Adding only marginally more space around the target element',
        why: 'The brain needs a meaningful contrast in spacing to register isolation -- small differences are ignored',
        fix: 'Use at least 2-3x the normal spacing around an isolated element to create a clear perceptual gap',
      },
      {
        title: 'Isolation Without Purpose',
        description:
          'Using whitespace isolation for decorative elements that do not warrant emphasis',
        why: 'Isolation signals importance; applying it to unimportant elements wastes attention and confuses hierarchy',
        fix: 'Reserve isolation for elements that drive the primary user action or convey the most critical information',
      },
      {
        title: 'Breaking Gestalt Grouping Unintentionally',
        description:
          'Isolating an element that logically belongs to a group, creating confusion about its relationship',
        why: 'Users rely on proximity to understand relationships; isolation breaks proximity grouping',
        fix: 'Ensure isolated elements are self-contained and do not need group context to be understood',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout is the primary vehicle for the isolation effect -- spatial arrangement determines what is perceived as isolated',
        examples: [
          'Single CTA button centered in a large whitespace region commands immediate attention',
          'Hero metrics displayed alone above a dashboard grid create clear hierarchy',
          'Pull quotes with generous margins break content flow and capture attention',
          'Isolated navigation items (e.g., a standalone "Create" button separate from toolbar) signal primary actions',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography reinforces isolation through scale contrast and spacing',
        examples: [
          'A single large number displayed alone is more memorable than the same number in a data table',
          'Isolated headings with large top/bottom margins create section anchors',
          'A single word or short phrase displayed in oversized type commands recall',
          'Generous line-height and letter-spacing amplify the isolation of text elements',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can complement isolation but is not the primary mechanism -- spatial separation is',
        examples: [
          'An isolated element on a contrasting background region reinforces its separation',
          'White (or neutral) space around a colored element amplifies its perceptual weight',
          'Consistent background color in the isolation zone prevents competing visual signals',
          'Subtle background tint changes can define isolation regions without hard borders',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Isolated interactive elements receive more clicks and faster responses',
        examples: [
          'Isolated CTA buttons have higher click-through rates than those in button groups',
          'A single form field displayed alone per step reduces errors and increases completion',
          'Isolated toggle switches for critical settings receive more deliberate interaction',
          'Hover and focus states on isolated elements are more noticeable',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content isolation determines what users remember and act upon',
        examples: [
          'A single key benefit displayed in isolation is recalled far better than a benefits list',
          'Isolated testimonials are perceived as more credible than those in a carousel',
          'One statistic displayed alone anchors perception more than a data table',
          'A single feature highlight per section drives deeper understanding than feature grids',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Spatial isolation must be paired with semantic emphasis for assistive technology users',
        examples: [
          'Use ARIA landmarks or roles to signal the importance of isolated content to screen readers',
          'Ensure isolated elements have appropriate heading levels reflecting their visual prominence',
          'Provide skip links to isolated CTAs so keyboard users can reach them efficiently',
          'Use aria-label or aria-describedby to convey the emphasis that sighted users perceive through isolation',
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
        title: 'Isolated CTA with Whitespace',
        description:
          'A single call-to-action button surrounded by generous negative space, making it the undeniable focal point',
        code: `<section class="hero">
  <h1>Ship faster with less friction</h1>
  <p class="subtitle">The deployment platform trusted by 10,000 teams.</p>

  <div class="cta-isolation-zone" style="padding: var(--cg-space-16) 0;">
    <button class="primary-cta">Start Free Trial</button>
  </div>

  <!-- No competing links, no secondary actions, no visual noise -->
</section>

<style>
.cta-isolation-zone {
  display: flex;
  justify-content: center;
  /* Generous vertical padding creates isolation */
  padding: var(--cg-space-16) 0;
}
.primary-cta {
  padding: var(--cg-space-4) var(--cg-space-8);
  font-size: var(--cg-font-size-lg);
  /* Button is sole element in its visual region */
}
</style>`,
        explanation:
          'The CTA button is the only element in its vertical band. The whitespace above and below acts as a perceptual frame, triggering the isolation effect. Users fixate on it involuntarily and recall it after leaving the page.',
        principle:
          'A single element surrounded by emptiness captures attention and memory through the isolation mechanism',
        metrics: {
          before: '3.2% click-through with CTA adjacent to navigation links',
          after: '7.1% click-through with CTA isolated in whitespace zone',
          improvement: '122% increase in CTA engagement through spatial isolation',
        },
      },
      {
        title: 'Hero Metric on Dashboard',
        description:
          'A single key metric displayed alone in a large card above a dense metrics grid',
        code: `<div class="dashboard">
  <!-- Isolated hero metric -->
  <div class="hero-metric">
    <span class="metric-label">Monthly Recurring Revenue</span>
    <span class="metric-value">$2.4M</span>
    <span class="metric-delta positive">+12.3%</span>
  </div>

  <!-- Dense grid of secondary metrics below -->
  <div class="metrics-grid">
    <div class="metric-card">Customers: 8,432</div>
    <div class="metric-card">Churn: 1.2%</div>
    <div class="metric-card">ARPU: $285</div>
    <div class="metric-card">NPS: 72</div>
  </div>
</div>

<style>
.hero-metric {
  text-align: center;
  padding: var(--cg-space-12) var(--cg-space-8);
  margin-bottom: var(--cg-space-8);
  /* Large padding + margin isolates from grid */
}
.hero-metric .metric-value {
  font-size: var(--cg-font-size-4xl);
  font-weight: var(--cg-font-weight-bold);
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--cg-space-4);
}
</style>`,
        explanation:
          'MRR is displayed alone with generous padding, creating a clear isolation zone. The dense grid below provides homogeneous context, making the isolated metric stand out through contrast in spatial treatment. Users immediately know which number matters most.',
        principle:
          'A single metric isolated above a group is recalled with higher accuracy and perceived as more important',
        metrics: {
          before: '45% of users correctly recalled the top metric when all metrics were in a uniform grid',
          after: '89% correct recall when the top metric was spatially isolated',
          improvement: '98% improvement in metric recall through isolation',
        },
      },
      {
        title: 'Breakout Element in a List',
        description:
          'A featured list item pulled out with extra spacing to break the homogeneous rhythm',
        code: `<ul class="feature-list">
  <li class="feature-item">Version control integration</li>
  <li class="feature-item">Automated testing pipeline</li>
  <li class="feature-item">Team permissions</li>

  <li class="feature-item featured">
    <span class="featured-badge">New</span>
    <span>AI-powered code review</span>
  </li>

  <li class="feature-item">Deployment rollbacks</li>
  <li class="feature-item">Audit logging</li>
  <li class="feature-item">SSO integration</li>
</ul>

<style>
.feature-item {
  padding: var(--cg-space-3) 0;
  border-bottom: 1px solid var(--cg-color-border-subtle);
}
.feature-item.featured {
  /* Extra spacing isolates this item */
  margin: var(--cg-space-6) 0;
  padding: var(--cg-space-5) var(--cg-space-4);
  border: none;
  background: var(--cg-color-surface-elevated);
  border-radius: var(--cg-radius-md);
}
</style>`,
        explanation:
          'The "AI-powered code review" item is spatially isolated from the homogeneous list through extra margins and a distinct container. The surrounding uniform items amplify the isolation, making the featured item impossible to overlook.',
        principle:
          'Breaking a homogeneous sequence with spatial isolation directs attention to the breakout element',
      },
    ],

    bad: [
      {
        title: 'Everything Is Isolated',
        description:
          'Every element has massive whitespace, negating the isolation effect entirely',
        code: `<!-- DON'T DO THIS -->
<div style="padding: 80px 0;">
  <h2>Feature One</h2>
</div>
<div style="padding: 80px 0;">
  <h2>Feature Two</h2>
</div>
<div style="padding: 80px 0;">
  <h2>Feature Three</h2>
</div>
<div style="padding: 80px 0;">
  <button>Sign Up</button>
</div>`,
        explanation:
          'When every element has the same generous spacing, none of them benefit from isolation. The CTA has the same spatial treatment as headings, so it receives no preferential attention. Isolation requires contrast between the isolated element and its homogeneous context.',
        principle:
          'Isolation only works when it is the exception, not the rule',
      },
      {
        title: 'Insufficient Separation',
        description:
          'Attempting isolation with barely perceptible extra spacing',
        code: `<!-- DON'T DO THIS -->
<div class="metrics">
  <div class="metric" style="margin: 8px;">Revenue: $2.4M</div>
  <div class="metric" style="margin: 12px;">Users: 8,432</div>
  <div class="metric" style="margin: 8px;">Churn: 1.2%</div>
</div>`,
        explanation:
          'The "Users" metric has only 4px more margin than its siblings. This subtle difference is below the perceptual threshold for isolation -- users do not register it as distinct. Effective isolation requires a dramatic contrast in spacing (2-3x minimum).',
        principle:
          'The brain needs a clear perceptual gap, not a marginal spacing difference',
      },
      {
        title: 'Isolation of Decorative Elements',
        description:
          'Using whitespace isolation to emphasize a decorative illustration rather than the CTA',
        code: `<!-- DON'T DO THIS -->
<section class="hero">
  <div style="padding: 120px 0; text-align: center;">
    <img src="decorative-blob.svg" alt="" />
  </div>
  <h1>Deploy with confidence</h1>
  <button>Get Started</button>
  <a href="/pricing">See Pricing</a>
  <a href="/docs">Documentation</a>
</section>`,
        explanation:
          'The decorative illustration receives the isolation treatment while the CTA is crammed between links. Isolation signals importance -- applying it to a decorative element wastes the user\'s attentional resources and buries the actual action.',
        principle:
          'Never isolate decorative elements; reserve isolation for elements that drive action or convey critical information',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Product Pages',
        url: 'https://www.apple.com/iphone/',
        description:
          'Apple product pages isolate a single product image in a vast whitespace region. Each section shows one product angle or feature with nothing competing for attention. The "Buy" button appears alone in its own spatial zone, separated from specs and details.',
        effectiveness: 'very-effective',
        analysis:
          'Apple is the gold standard for isolation-driven design. Each viewport contains exactly one focal point surrounded by generous whitespace. This isolation elevates perceived product quality and ensures the purchase CTA is unmissable.',
      },
      {
        company: 'Stripe',
        product: 'Pricing Page',
        url: 'https://stripe.com/pricing',
        description:
          'Stripe highlights its recommended pricing tier by visually isolating it -- the highlighted plan has extra vertical offset, a distinct border, and more surrounding space than adjacent plans. The isolated plan draws immediate focus.',
        effectiveness: 'very-effective',
        analysis:
          'By spatially isolating the recommended plan from the homogeneous row of pricing cards, Stripe leverages the isolation effect to guide plan selection. Users fixate on the elevated card first and evaluate other options relative to it.',
      },
      {
        company: 'GitHub',
        product: 'Repository Page',
        url: 'https://github.com',
        description:
          'The Star button on GitHub repository pages is spatially separated from other action buttons (Fork, Watch). It occupies a distinct position with extra horizontal spacing, making it the most prominent repository-level action.',
        effectiveness: 'effective',
        analysis:
          'While GitHub uses multiple mechanisms (color, position), the spatial isolation of the Star button from the button group contributes to its high interaction rate. It feels like a distinct, standalone action rather than one of many.',
      },
      {
        company: 'Linear',
        product: 'Landing Page',
        url: 'https://linear.app',
        description:
          'Linear\'s homepage isolates a single tagline and CTA in the hero viewport. Below the fold, each feature section displays one concept per full-width section with no competing elements. The whitespace-to-content ratio is exceptionally high.',
        effectiveness: 'very-effective',
        analysis:
          'Linear demonstrates how isolation combined with animation creates memorable product storytelling. Each section has one idea, one visual, and generous negative space, resulting in high recall of key product differentiators.',
      },
    ],

    abTests: [
      {
        title: 'CTA Isolation: Standalone vs Button Group',
        hypothesis:
          'Spatially isolating the primary CTA will increase click-through rates compared to placing it in a button group',
        controlVersion: {
          description:
            'Primary CTA placed inline with secondary buttons in a horizontal button group with uniform 16px gaps',
          metrics: {
            conversionRate: '3.4%',
            timeToClick: '4.8s',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Primary CTA isolated in its own whitespace zone with 64px vertical padding, secondary buttons moved to a separate section below',
          metrics: {
            conversionRate: '6.9%',
            timeToClick: '2.1s',
            scrollDepth: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Isolating the CTA doubled click-through rate and halved time-to-click. Users scrolled slightly less (confirming they engaged sooner). Eye-tracking showed 94% of users fixated on the isolated CTA within 1.5 seconds vs 61% for the grouped version.',
          learnings: [
            'Spatial isolation is a stronger attention driver than color or size alone',
            'Removing competing actions from the CTA zone reduces decision paralysis',
            'Time-to-click is a strong proxy for isolation effectiveness',
            'Effect was consistent across desktop and mobile viewports',
          ],
        },
      },
      {
        title: 'Dashboard Metric: Isolated Hero vs Uniform Grid',
        hypothesis:
          'Isolating the primary metric from the grid will improve recall and perceived importance',
        controlVersion: {
          description:
            'All 5 metrics displayed in a uniform grid with identical card sizes and spacing',
          metrics: {
            conversionRate: '44%',
            timeOnPage: '2:45',
          },
        },
        treatmentVersion: {
          description:
            'Top metric displayed in a large isolated card above the grid; remaining 4 metrics in uniform grid below',
          metrics: {
            conversionRate: '87%',
            timeOnPage: '2:12',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Correct recall of the primary metric nearly doubled (44% to 87%). Users also spent less time on the page, indicating faster comprehension. Post-session surveys showed 91% of treatment users correctly identified the "most important metric" vs 53% of control users.',
          learnings: [
            'Isolation dramatically improves recall of the target element',
            'Faster comprehension suggests reduced cognitive load, not reduced engagement',
            'Users intuitively interpret spatial isolation as a signal of importance',
            'Effect was strongest for first-time users; returning users showed weaker but still significant improvement',
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
        name: 'Whitespace Isolation Zones',
        description:
          'Large areas of empty space surrounding a single element, creating a perceptual frame',
        howToSpot:
          'Look for elements with significantly more padding or margin than their siblings. Check for solo elements in otherwise empty viewport regions.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Breakout Elements',
        description:
          'An element that breaks the rhythm of a homogeneous list or grid through extra spacing',
        howToSpot:
          'Scan lists and grids for items with visually larger gaps above and below, or pulled out into their own container',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Standalone CTAs',
        description:
          'A single interactive element (button, link) placed alone with no adjacent competing actions',
        howToSpot:
          'Look for buttons that have no other buttons within their immediate visual neighborhood (within ~100px)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Hero Element Pattern',
        description:
          'A single metric, heading, or image occupying a full viewport width with minimal competing content',
        howToSpot:
          'Check for viewport-width sections containing only one focal element and generous negative space',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Elevated or Offset Cards',
        description:
          'A card in a row that has extra elevation, vertical offset, or distinct spacing compared to adjacent cards',
        howToSpot:
          'Look for cards with box-shadow, translateY offset, or extra margin compared to siblings in a pricing or feature grid',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Single-Element Viewport',
        description: 'A full viewport section containing only one focal element surrounded by negative space',
        indicators: [
          'One heading or metric per viewport-height section',
          'Content-to-whitespace ratio below 30%',
          'No navigation or secondary elements in the section',
          'Used on marketing pages and product landing pages',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Isolated CTA Pattern',
        description: 'A primary action button placed in its own whitespace zone, separate from any button group',
        indicators: [
          'CTA has 2-4x more vertical padding than adjacent content sections',
          'No secondary buttons within the same visual band',
          'Often centered horizontally with generous left/right margins',
          'Frequently used after hero copy or at the end of a content section',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Hero Metric Isolation',
        description: 'A single KPI or metric displayed in a prominent, isolated position above a denser data display',
        indicators: [
          'One metric in a large card above a grid of smaller metric cards',
          'Significantly larger font size than sibling metrics',
          'Extra vertical margin separating it from the grid below',
          'Used in analytics dashboards and admin panels',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'List Breakout Pattern',
        description: 'One item in a homogeneous list that receives extra spacing to break the visual rhythm',
        indicators: [
          'Extra margin-top and margin-bottom on one list item',
          'Distinct background or container for the breakout item',
          'Badge or label (e.g., "Featured", "New") on the isolated item',
          'Rest of list items have uniform, tighter spacing',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is the most important element on this page spatially isolated from its neighbors?',
      'Does the primary CTA have its own whitespace zone, or is it competing with other buttons?',
      'Is there a single hero metric or focal point, or are all elements treated with equal spacing?',
      'Does the isolation contrast with a homogeneous context (e.g., a uniform grid or list)?',
      'Is the whitespace around the isolated element at least 2-3x the normal spacing?',
      'Are we isolating only one element per viewport, or diluting the effect by isolating many?',
      'Is the isolated element the one that drives the primary user action?',
      'Does the isolation translate to assistive technologies (screen readers, keyboard navigation)?',
      'Would removing the isolation cause the element to blend into its surroundings?',
      'Is there anything in the isolation zone that competes for attention?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Von Restorff isolation effect.

Analyze the provided design for isolation-based attention patterns. Identify:

1. **Whitespace Isolation**: Elements surrounded by disproportionate negative space
2. **Standalone Elements**: Single elements in visual regions with no competing content
3. **Breakout Items**: Elements that break the rhythm of homogeneous lists or grids
4. **Hero Patterns**: Full-viewport sections with a single focal point
5. **CTA Isolation**: Primary actions separated from button groups or link clusters

For each isolation pattern found:
- Identify the isolated element and its purpose
- Assess whether it deserves the emphasis isolation provides
- Evaluate the contrast ratio between isolated spacing and contextual spacing
- Check if the isolation translates to assistive technologies
- Determine if the effect is diluted by too many isolated elements

Consider:
- Is the isolated element the most important action or information on the page?
- Does the surrounding homogeneous context amplify the isolation?
- Is the whitespace sufficient to cross the perceptual threshold?
- Are there competing focal points that dilute the isolation effect?
- Does the isolation serve the user's goals, not just the business's goals?

Provide actionable recommendations for strengthening or correcting isolation patterns.`,

    outputSchema: {
      type: 'object',
      properties: {
        isolationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              location: { type: 'string' },
              isolationType: { type: 'string' },
              whitespaceRatio: { type: 'string' },
              deservesEmphasis: { type: 'boolean' },
              accessibleToAT: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'element',
              'location',
              'isolationType',
              'deservesEmphasis',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            isolationClarity: { type: 'number' },
            whitespaceEffectiveness: { type: 'number' },
            hierarchyStrength: { type: 'number' },
            accessibilityScore: { type: 'number' },
          },
          required: [
            'isolationClarity',
            'whitespaceEffectiveness',
            'hierarchyStrength',
            'accessibilityScore',
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
        'isolationPatterns',
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
        title: 'Identify the Single Most Important Element',
        description:
          'Determine which element on the page most needs user attention and recall -- typically the primary CTA, a hero metric, or a key value proposition',
        example:
          'Goal: Ensure the "Start Free Trial" button is the most memorable element on the landing page',
        tips: [
          'There should be only one isolated element per viewport',
          'Choose the element that drives the primary conversion or comprehension goal',
          'If you cannot pick one, your page hierarchy needs work before applying isolation',
        ],
      },
      {
        step: 2,
        title: 'Create the Homogeneous Context',
        description:
          'Isolation only works against a backdrop of sameness. Ensure surrounding elements are visually uniform.',
        example:
          'Display features in a consistent list with identical spacing, typography, and styling before introducing the breakout element',
        tips: [
          'Uniform lists, grids, and content blocks create the "background" that makes isolation visible',
          'Consistency in spacing, font size, and color of non-isolated elements is critical',
          'The more homogeneous the context, the stronger the isolation effect',
        ],
      },
      {
        step: 3,
        title: 'Apply Generous Whitespace',
        description:
          'Surround the target element with at least 2-3x the spacing used between non-isolated elements',
        example:
          'If list items have 16px gaps, give the isolated item 48-64px of vertical margin on each side',
        tips: [
          'Use token-based spacing (e.g., --cg-space-12, --cg-space-16) for maintainability',
          'Vertical isolation is generally stronger than horizontal isolation on scrolling pages',
          'The whitespace should feel intentional, not accidental',
        ],
      },
      {
        step: 4,
        title: 'Remove Competing Elements',
        description:
          'Clear the visual neighborhood of the isolated element -- no secondary buttons, links, or dense content within the isolation zone',
        example:
          'Move "Learn More" and "See Pricing" links out of the CTA isolation zone and into a separate section below',
        tips: [
          'Secondary actions can go above or below the isolation zone, just not within it',
          'Even subtle elements (fine print, legal links) within the zone reduce isolation effectiveness',
          'Test by squinting -- the isolated element should be the only thing visible in its region',
        ],
      },
      {
        step: 5,
        title: 'Add Semantic Emphasis for Accessibility',
        description:
          'Pair spatial isolation with semantic HTML and ARIA attributes so screen readers convey the same emphasis',
        example:
          'Wrap the isolated CTA in a landmark region with role="complementary" and aria-label="Primary action"',
        tips: [
          'Use heading levels that reflect the visual hierarchy created by isolation',
          'Consider aria-live regions for dynamically isolated content',
          'Test with screen readers to verify the emphasis is perceived',
        ],
      },
      {
        step: 6,
        title: 'Validate with Eye-Tracking or Click Maps',
        description:
          'Measure whether users actually fixate on and interact with the isolated element first and most frequently',
        example:
          'Run a Hotjar click map to confirm the isolated CTA receives the majority of first clicks',
        tips: [
          'Compare time-to-first-fixation for isolated vs non-isolated versions',
          'Track recall in post-session surveys ("What was the main action on the page?")',
          'Monitor scroll depth -- effective isolation should reduce unnecessary scrolling',
        ],
      },
    ],

    dos: [
      'Isolate the single most important element per viewport',
      'Use at least 2-3x normal spacing to create perceptible isolation',
      'Maintain a homogeneous context around the isolated element to amplify contrast',
      'Remove competing elements from the isolation zone',
      'Pair spatial isolation with semantic HTML and ARIA for accessibility',
      'Reserve isolation for elements that drive primary user actions',
      'Test isolation effectiveness with click maps and recall surveys',
      'Use design tokens for isolation spacing to maintain consistency',
    ],

    donts: [
      'Don\'t isolate more than one element per viewport -- it negates the effect',
      'Don\'t apply minimal extra spacing and expect an isolation effect',
      'Don\'t isolate decorative or low-priority elements',
      'Don\'t rely on spatial isolation alone for accessibility -- add semantic emphasis',
      'Don\'t break logical groupings just to create isolation',
      'Don\'t use isolation for every section -- it becomes the new normal and loses impact',
      'Don\'t add competing content (links, buttons, text) within the isolation zone',
      'Don\'t confuse padding (internal space) with isolation (external negative space)',
    ],

    bestPractices: [
      {
        title: 'One Focal Point Per Viewport',
        description:
          'Each viewport-height section should contain exactly one isolated focal element',
        rationale:
          'Multiple isolated elements compete for attention and negate the isolation effect',
        example:
          'Hero section: isolated CTA. Feature section: isolated demo image. Pricing section: isolated recommended plan.',
      },
      {
        title: 'Contrast Is the Mechanism',
        description:
          'Isolation is defined by the contrast between the isolated element\'s spacing and the contextual spacing, not by absolute whitespace amount',
        rationale:
          'A 32px margin is isolating if surrounding items have 8px margins; it is not isolating if surrounding items also have 32px margins',
        example:
          'In a grid with 16px gaps, isolate the featured card with 48px+ margin',
      },
      {
        title: 'Isolation + Hierarchy = Clarity',
        description:
          'Combine isolation with other hierarchy tools (size, weight, color) for maximum effect',
        rationale:
          'Isolation captures attention; size and color reinforce the importance signal',
        example:
          'Isolated hero metric in large, bold type with a subtle accent background',
      },
      {
        title: 'Test the "Squint Test"',
        description:
          'Blur or squint at your design -- the isolated element should be the only clear focal point',
        rationale:
          'If you can identify the isolated element when the design is blurred, the isolation is effective',
        example:
          'Screenshot your page, apply Gaussian blur, and check if the isolated element is still the clear focal point',
      },
      {
        title: 'Responsive Isolation',
        description:
          'Ensure isolation zones scale appropriately on mobile -- reduce absolute spacing but maintain the ratio',
        rationale:
          'Mobile screens have less room for whitespace, but the ratio between isolated and normal spacing must be preserved',
        example:
          'Desktop: 64px isolation / 16px normal (4x). Mobile: 32px isolation / 8px normal (4x).',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Spatial isolation must have semantic equivalents',
        implementation:
          'Use appropriate heading levels, ARIA landmarks, or role attributes to convey the importance that sighted users perceive through whitespace isolation',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Isolated elements should be identifiable by heading or label',
        implementation:
          'Give isolated elements clear headings or aria-labels so screen reader users can identify them as primary content without relying on spatial cues',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.3',
        guideline:
          'Focus Order - Keyboard focus should reach isolated elements in a logical order reflecting their visual prominence',
        implementation:
          'Ensure tab order places isolated CTAs early in the focus sequence, matching the visual prominence conveyed by isolation',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Isolation zones should not rely on background color alone',
        implementation:
          'If using a background tint to define the isolation region, ensure the isolated element is also identifiable through spacing, size, and semantic emphasis',
      },
    ],

    ethics: [
      {
        concern: 'Manipulative Isolation of Upsell Actions',
        severity: 'high',
        explanation:
          'Isolating an upsell or add-on button to trick users into clicking it before they reach their intended action',
        mitigation:
          'Only isolate elements that serve the user\'s primary goal. If isolating an upsell, ensure the user\'s intended action is equally accessible.',
      },
      {
        concern: 'Hiding Options Through Non-Isolation',
        severity: 'high',
        explanation:
          'Deliberately crowding alternatives (e.g., "Cancel subscription") into dense layouts while isolating the business-preferred action',
        mitigation:
          'Ensure destructive or user-protective actions are accessible and clearly labeled, even if not spatially isolated.',
      },
      {
        concern: 'Misleading Importance Signals',
        severity: 'medium',
        explanation:
          'Isolating secondary information to make it seem more important than it is, distorting user priorities',
        mitigation:
          'Reserve isolation for genuinely important elements. Validate with user research that isolation aligns with user priorities.',
      },
      {
        concern: 'Accessibility Exclusion',
        severity: 'critical',
        explanation:
          'Relying entirely on spatial isolation for emphasis, excluding screen reader and keyboard users from the same experience',
        mitigation:
          'Always pair spatial isolation with semantic HTML, ARIA attributes, and logical focus order to ensure equivalent emphasis for all users.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Die Wirkung von Bereichsbildungen im Spurenfeld (The Effect of Field Formation in the Trace Field)',
        author: 'Von Restorff, H.',
        year: 1933,
        description:
          'The original paper describing the isolation effect, demonstrating that an isolated item in a homogeneous list is recalled with greater accuracy',
        type: 'foundational',
      },
      {
        title: 'The Subtlety of Distinctiveness: What Von Restorff Really Did',
        author: 'Hunt, R. R.',
        year: 1995,
        doi: '10.3758/BF03200939',
        description:
          'A critical reanalysis of Von Restorff\'s original work, distinguishing between item-level and relational-level distinctiveness, and clarifying the isolation mechanism',
        type: 'foundational',
      },
      {
        title: 'Isolation Effects in Serial Learning: The Role of Test Expectations',
        author: 'Schmidt, S. R.',
        year: 1991,
        doi: '10.1037/0278-7393.17.5.828',
        description:
          'Examines how isolation effects operate in serial learning and the role of encoding distinctiveness in free recall vs recognition tasks',
        type: 'advanced',
      },
      {
        title: 'The Von Restorff Effect in Visual Object Recognition Memory in Humans and Monkeys',
        author: 'Rangel-Gomez, M., & Meeter, M.',
        year: 2016,
        doi: '10.1098/rspb.2015.2000',
        description:
          'Cross-species evidence for the isolation effect, demonstrating its neural basis in attention capture mechanisms',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Laws of Simplicity',
        author: 'Maeda, John',
        year: 2006,
        isbn: '9780262134729',
        description:
          'Explores how reduction and negative space create clarity -- directly applicable to isolation-driven design',
        type: 'practical',
      },
      {
        title: 'White Space Is Not Your Enemy',
        author: 'Golombisky, K., & Hagen, R.',
        year: 2017,
        isbn: '9781138804647',
        description:
          'Practical guide to using whitespace and negative space as a design tool, covering the principles underlying spatial isolation',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the broader cognitive framework of attention and memory within which the isolation effect operates',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Von Restorff Effect in UX Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/the-von-restorff-effect',
        description:
          'Practical guide to applying the Von Restorff effect in interface design with examples',
        type: 'practical',
      },
      {
        title: 'How Whitespace Improves UI Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/whitespace/',
        description:
          'Research-backed analysis of how whitespace and isolation affect readability, comprehension, and user attention',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Von Restorff Effect and UX Design',
        author: 'NNgroup',
        url: 'https://www.youtube.com/watch?v=2RgjuLhRB7k',
        description:
          'Video explanation of how the Von Restorff effect applies to UX patterns including isolation, distinctiveness, and visual hierarchy',
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
      'von-restorff-effect', // Broader distinctiveness principle; isolation is a specific mechanism
      'serial-position-effect', // Isolation overrides serial position effects
      'anchoring-bias', // Isolated elements can act as visual anchors
      'attentional-bias', // Isolation is an attentional capture mechanism
    ],

    conflicts: [
      'paradox-of-choice', // Too many isolated elements recreates choice overload
      'information-overload', // Isolation reduces density, which can help or hurt
    ],

    confusedWith: [
      'von-restorff-effect', // Parent effect; isolation is one specific mechanism
      'figure-ground', // Related Gestalt principle, but isolation is memory-focused
      'salience-bias', // Salience is broader; isolation is one way to create it
    ],

    hierarchy: {
      parent: 'von-restorff-effect',
      children: [
        'whitespace-isolation',
        'spatial-separation',
      ],
    },
  },
};
