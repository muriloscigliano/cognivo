/**
 * CHEERLEADER EFFECT
 *
 * Individuals appear more attractive in a group than in isolation.
 * Group context improves perception of individual items.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const cheerleaderEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'cheerleader-effect',
    name: 'Cheerleader Effect',
    aliases: ['Group Attractiveness Effect', 'Group Enhancement Effect'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'perception',
      'group-dynamics',
      'attractiveness',
      'layout',
      'grid',
      'collection',
      'gallery',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People perceive individuals as more attractive when seen in a group than when seen alone.',

    detailed: `The Cheerleader Effect is a cognitive bias in which individual items—faces, products, images—are perceived as more attractive or appealing when presented as part of a group than when viewed in isolation. The brain automatically averages the features of a group, and because this ensemble representation smooths out individual imperfections, each member benefits from the group's averaged appearance.

This bias has profound implications for visual design. Product grids, team pages, portfolio galleries, and photo collections all benefit from the cheerleader effect: each individual item looks better when surrounded by peers. The effect works because the visual system extracts summary statistics from groups, and individual items are then evaluated relative to this favorable ensemble average.

Designers can harness this by presenting items in curated collections and grid layouts rather than as isolated elements. However, the effect also means that a single weak item in a group can go unnoticed, and pulling an item out of its group context may reveal shortcomings that were masked by the collection.`,

    psychologyBasis: {
      discoveredBy: 'Drew Walker and Edward Vul',
      year: 2014,
      theory: 'Ensemble Coding and Hierarchical Perception',
      mechanism: `The brain processes groups of items by extracting ensemble statistics—an averaged representation of the group. This happens because:

1. **Ensemble Averaging**: The visual system computes an average representation of features across a group, smoothing out individual imperfections
2. **Hierarchical Encoding**: Individual items are encoded as part of the group first, then recalled in relation to the group average
3. **Regression to the Mean**: Individual features are pulled toward the more attractive group average, boosting perception of below-average members
4. **Gestalt Grouping**: The brain perceives collections as unified wholes before processing individual components
5. **Contextual Enhancement**: Surrounding items provide a richer visual context that fills in and enhances perception of each member`,
    },

    realWorldExample: `Walker and Vul (2014) showed participants photos of faces both in groups and in isolation. The same face was consistently rated as more attractive when it appeared within a group photo than when cropped and shown alone. This held true for groups of all sizes and for faces of varying attractiveness levels. The effect occurs because the visual system averages the group, and individuals are perceived as closer to this (typically more flattering) average.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Cheerleader Effect directly influences how users perceive products, people, and content presented in groups versus isolation. Designers can leverage this to:

- Make product catalogs more appealing through grid layouts and curated collections
- Enhance team pages by showing group photos alongside individual headshots
- Improve portfolio and gallery displays by presenting work in cohesive sets
- Boost perceived quality of content feeds by curating adjacent items
- Strengthen brand perception through visually harmonious product families`,

    whenToUse: [
      {
        title: 'Product Grid Layouts',
        scenario:
          'When displaying multiple products in an e-commerce catalog or collection',
        example:
          'Show products in a 3x3 or 4x4 grid with consistent styling, making each product benefit from the group context',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Team Pages',
        scenario:
          'When showcasing team members on an about or company page',
        example:
          'Display a group photo at the top of the page, then individual headshots below—the group context primes a more favorable perception of each person',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Portfolio and Gallery Displays',
        scenario:
          'When presenting creative work, photography, or design projects',
        example:
          'Show portfolio pieces in a curated grid or masonry layout rather than one at a time, so each piece benefits from the collection',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Showcases',
        scenario:
          'When presenting a set of product features or capabilities',
        example:
          'Display features in a card grid where each feature card is enhanced by the presence of its neighbors',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Content Collections',
        scenario:
          'When curating content feeds, playlists, or recommendation panels',
        example:
          'Group related articles, videos, or songs in themed collections so each item appears more appealing in context',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Hero Product Spotlights',
        reason:
          'When you need one item to stand out as exceptional, group context can dilute its distinctiveness',
        consequence:
          'The standout product blends into the group rather than commanding attention',
        alternative:
          'Isolate hero products with dedicated sections, then use group layouts for supporting items',
      },
      {
        title: 'Quality-Critical Assessments',
        reason:
          'The cheerleader effect can mask quality issues in individual items',
        consequence:
          'Users may not notice a poor-quality item within a group until they examine it alone',
        alternative:
          'Provide both group and individual views, especially for high-stakes purchases',
      },
      {
        title: 'Comparative Decision-Making',
        reason:
          'When users need to carefully compare items against each other, group averaging can hinder discrimination',
        consequence:
          'Users may struggle to identify meaningful differences between options',
        alternative:
          'Use comparison tables or side-by-side views with clear differentiators highlighted',
      },
      {
        title: 'Misleading Quality Representation',
        reason:
          'Using attractive items to mask poor-quality items in a group is deceptive',
        consequence:
          'User disappointment and loss of trust when the individual item fails to match group impression',
        alternative:
          'Ensure all items in a group meet a consistent quality standard',
      },
    ],

    commonMistakes: [
      {
        title: 'Inconsistent Visual Treatment',
        description:
          'Using different image sizes, aspect ratios, or styles within a grid breaks the ensemble effect',
        why: 'The cheerleader effect depends on the brain treating items as a unified group; inconsistency disrupts grouping',
        fix: 'Use consistent dimensions, aspect ratios, lighting, and styling across all items in a grid',
      },
      {
        title: 'Groups Too Small',
        description:
          'Showing only 2 items side by side provides minimal cheerleader effect',
        why: 'The ensemble averaging is stronger with larger groups (4+ items); pairs feel like comparisons, not collections',
        fix: 'Use grids of at least 3-4 items to trigger meaningful group perception',
      },
      {
        title: 'Mixing Unrelated Items',
        description:
          'Grouping visually or thematically unrelated items in the same grid',
        why: 'The brain must perceive items as belonging to a group for the effect to occur; mismatched items break grouping',
        fix: 'Curate collections of visually and thematically cohesive items',
      },
      {
        title: 'Ignoring Isolation Context',
        description:
          'Not accounting for how an item looks when removed from its group (detail page, cart, etc.)',
        why: 'Users who select an item from a grid will see it alone on the detail page, potentially feeling let down',
        fix: 'Ensure individual product pages maintain quality through styling, context, and supporting imagery',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout is the primary vehicle for the cheerleader effect—grids and collections are where it happens',
        examples: [
          'Grid layouts with uniform sizing create strong ensemble perception',
          'Masonry layouts maintain grouping while adding visual interest',
          'Card grids with consistent spacing and proportions enhance each item',
          'Carousel and horizontal scroll views maintain group context',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography plays a secondary role but contributes to visual cohesion within groups',
        examples: [
          'Consistent label and title treatment across grid items reinforces grouping',
          'Uniform text hierarchy across cards maintains ensemble cohesion',
          'Matched font sizes and weights prevent individual items from breaking the group',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color cohesion within groups strengthens the ensemble averaging effect',
        examples: [
          'Consistent background colors across grid items reinforce grouping',
          'Harmonious product photography color palettes enhance the collection',
          'Accent colors applied uniformly across items maintain visual unity',
          'White-space and border treatments that group items together',
        ],
      },
      interaction: {
        level: ImpactLevel.MEDIUM,
        description:
          'Interaction patterns affect whether users experience items in group or isolation context',
        examples: [
          'Hover states that preview items in-place maintain group context',
          'Lightbox modals that isolate items break the cheerleader effect',
          'Quick-view overlays that keep surrounding items visible preserve the effect',
          'Scroll-triggered reveals that build up grid content progressively',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content curation and grouping strategy directly controls the cheerleader effect',
        examples: [
          'Curated "collections" and "lookbooks" maximize group enhancement',
          'Themed product categories create cohesive ensembles',
          'Related items sections benefit from group perception',
          'Editorial picks presented as sets feel more premium than individual features',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'The cheerleader effect is primarily visual; accessible alternatives need separate consideration',
        examples: [
          'Screen reader users encounter items sequentially, missing the group context entirely',
          'Alt text should describe individual item qualities rather than relying on group impression',
          'Keyboard navigation through grids should maintain clear focus indicators per item',
          'Reduced motion preferences should not break visual grouping',
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
        title: 'Curated Product Grid',
        description:
          'E-commerce collection page showing products in a uniform grid with consistent photography',
        code: `<section class="product-collection">
  <h2>Summer Collection</h2>
  <div class="product-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
    <article class="product-card">
      <img src="dress-1.jpg" alt="Linen wrap dress" style="aspect-ratio: 3/4; object-fit: cover;">
      <h3>Linen Wrap Dress</h3>
      <p class="price">$89</p>
    </article>
    <article class="product-card">
      <img src="dress-2.jpg" alt="Cotton midi skirt" style="aspect-ratio: 3/4; object-fit: cover;">
      <h3>Cotton Midi Skirt</h3>
      <p class="price">$65</p>
    </article>
    <article class="product-card">
      <img src="top-1.jpg" alt="Silk blouse" style="aspect-ratio: 3/4; object-fit: cover;">
      <h3>Silk Blouse</h3>
      <p class="price">$95</p>
    </article>
    <article class="product-card">
      <img src="top-2.jpg" alt="Knit tank top" style="aspect-ratio: 3/4; object-fit: cover;">
      <h3>Knit Tank Top</h3>
      <p class="price">$45</p>
    </article>
  </div>
</section>`,
        explanation:
          'Uniform grid sizing, consistent aspect ratios, and cohesive photography style create a strong ensemble. Each item benefits from the group context—the $45 tank top looks more premium next to the silk blouse, and the collection as a whole feels curated and desirable.',
        principle:
          'Consistent visual treatment across grouped items enhances perceived quality of each individual item',
        metrics: {
          before: '2.3% click-through from single product featured items',
          after: '4.1% click-through from curated grid collections',
          improvement: '78% increase in product engagement when shown in grids',
        },
      },
      {
        title: 'Team Group Photo with Individual Profiles',
        description:
          'Company about page leading with a group photo before individual headshots',
        code: `<section class="our-team">
  <h2>Meet the Team</h2>
  <div class="team-group-photo">
    <img src="team-photo.jpg" alt="The full team gathered in the office">
  </div>
  <div class="team-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
    <div class="team-member">
      <img src="headshot-1.jpg" alt="Sarah Chen, CTO" style="aspect-ratio: 1; object-fit: cover; border-radius: 50%;">
      <h3>Sarah Chen</h3>
      <p>CTO</p>
    </div>
    <div class="team-member">
      <img src="headshot-2.jpg" alt="Marcus Rivera, Design Lead" style="aspect-ratio: 1; object-fit: cover; border-radius: 50%;">
      <h3>Marcus Rivera</h3>
      <p>Design Lead</p>
    </div>
    <div class="team-member">
      <img src="headshot-3.jpg" alt="Aisha Patel, Engineering" style="aspect-ratio: 1; object-fit: cover; border-radius: 50%;">
      <h3>Aisha Patel</h3>
      <p>Engineering</p>
    </div>
    <div class="team-member">
      <img src="headshot-4.jpg" alt="James Kim, Product" style="aspect-ratio: 1; object-fit: cover; border-radius: 50%;">
      <h3>James Kim</h3>
      <p>Product</p>
    </div>
  </div>
</section>`,
        explanation:
          'The group photo at the top primes the cheerleader effect—viewers perceive the team as more cohesive and each member as more appealing. The uniform headshot grid below maintains the ensemble effect at the individual level.',
        principle:
          'Group photo context enhances perception of individual team members shown afterward',
      },
      {
        title: 'Portfolio Masonry Gallery',
        description:
          'Design portfolio showing projects in a cohesive gallery layout',
        code: `<section class="portfolio-gallery">
  <h2>Selected Work</h2>
  <div class="masonry-grid" style="columns: 3; gap: 1rem;">
    <figure class="portfolio-item">
      <img src="project-1.jpg" alt="Brand identity for Meridian">
      <figcaption>Meridian — Brand Identity</figcaption>
    </figure>
    <figure class="portfolio-item">
      <img src="project-2.jpg" alt="Packaging design for Bloom">
      <figcaption>Bloom — Packaging</figcaption>
    </figure>
    <figure class="portfolio-item">
      <img src="project-3.jpg" alt="Website for Astra">
      <figcaption>Astra — Web Design</figcaption>
    </figure>
    <figure class="portfolio-item">
      <img src="project-4.jpg" alt="App design for Pulse">
      <figcaption>Pulse — App Design</figcaption>
    </figure>
    <figure class="portfolio-item">
      <img src="project-5.jpg" alt="Campaign for Horizon">
      <figcaption>Horizon — Campaign</figcaption>
    </figure>
    <figure class="portfolio-item">
      <img src="project-6.jpg" alt="Editorial for Scope">
      <figcaption>Scope — Editorial</figcaption>
    </figure>
  </div>
</section>`,
        explanation:
          'The masonry grid presents diverse projects as a cohesive body of work. Each piece benefits from the ensemble—a weaker project gains credibility from its neighbors, and the overall impression of skill is elevated beyond any single piece.',
        principle:
          'Gallery layouts create ensemble perception that elevates each individual portfolio piece',
      },
    ],

    bad: [
      {
        title: 'Inconsistent Product Grid',
        description:
          'Product listing with mismatched image sizes, styles, and backgrounds',
        code: `<!-- DON'T DO THIS -->
<div class="product-grid">
  <div class="product">
    <img src="product-1.jpg" style="width: 300px; height: 400px;">
    <h3>Premium Widget</h3>
  </div>
  <div class="product">
    <img src="product-2.png" style="width: 200px; height: 200px; background: #f0f0f0;">
    <h3>Basic Gadget</h3>
  </div>
  <div class="product">
    <img src="product-3.jpg" style="width: 250px; height: 350px;">
    <h3>Standard Tool</h3>
  </div>
</div>`,
        explanation:
          'Inconsistent image dimensions, different backgrounds, and varied aspect ratios prevent the brain from treating these as a group. Without ensemble averaging, each product is judged in isolation, and weaker items are more apparent.',
        principle:
          'Visual inconsistency breaks grouping and eliminates the cheerleader effect',
      },
      {
        title: 'Isolating Items Unnecessarily',
        description:
          'Showing products one at a time in a full-page carousel instead of a grid',
        code: `<!-- DON'T DO THIS -->
<div class="product-carousel">
  <div class="slide active">
    <img src="product-1.jpg" style="width: 100%; max-width: 600px;">
    <h2>Featured Product</h2>
    <p>View this product in detail</p>
    <button>Next Product →</button>
  </div>
  <!-- Only one product visible at a time -->
</div>`,
        explanation:
          'Showing one product at a time eliminates the cheerleader effect entirely. Users evaluate each item in isolation without the benefit of group context. The product must stand entirely on its own merits.',
        principle:
          'Single-item views deny the ensemble benefit and can reduce perceived appeal',
      },
      {
        title: 'Mixing Quality Levels to Deceive',
        description:
          'Intentionally placing low-quality items among high-quality ones to mask deficiencies',
        code: `<!-- DON'T DO THIS -->
<div class="featured-products">
  <div class="product premium">Professional Camera — $2,499</div>
  <div class="product budget" style="/* same styling as premium */">
    Knock-off Camera — $49
    <!-- Intentionally styled identically to hide quality gap -->
  </div>
  <div class="product premium">Pro Lens Kit — $1,899</div>
  <div class="product premium">Studio Lighting — $799</div>
</div>`,
        explanation:
          'Deliberately hiding a low-quality item among premium products exploits the cheerleader effect deceptively. Users will perceive the knock-off as higher quality than it is, leading to disappointment and eroded trust.',
        principle:
          'Never exploit ensemble averaging to mask genuine quality differences',
      },
    ],

    realWorld: [
      {
        company: 'Instagram',
        product: 'Profile Grid',
        description:
          'Instagram displays user photos in a 3-column grid on profile pages. Individual photos that might look average alone appear much more compelling as part of a cohesive grid. Users curate their grids specifically to maximize this effect, choosing photos that work together as an ensemble.',
        effectiveness: 'very-effective',
        analysis:
          'The 3-column grid is one of the strongest applications of the cheerleader effect in consumer products. It drove an entire culture of "grid curation" where users plan posts to look good together, not just individually.',
      },
      {
        company: 'Airbnb',
        product: 'Photo Gallery Grids',
        description:
          'Airbnb listing search results display properties in a card grid with consistent photo treatment. Each property benefits from being surrounded by other attractive listings, making the overall marketplace feel higher quality.',
        effectiveness: 'effective',
        analysis:
          'The uniform card grid with consistent image aspect ratios and typography creates a strong ensemble effect. Individual listings that might seem mediocre alone benefit from the collection context.',
      },
      {
        company: 'Dribbble',
        product: 'Shot Grid',
        description:
          'Dribbble displays design work in a dense, uniform grid of shots. The ensemble effect makes each individual shot appear more polished and professional, contributing to the platform perception as a premium design community.',
        effectiveness: 'very-effective',
        analysis:
          'The tight grid with consistent dimensions and hover interactions creates a powerful cheerleader effect. Designers specifically create work sized for the grid context, knowing it will be viewed as part of a collection.',
      },
      {
        company: 'Apple',
        product: 'Product Family Pages',
        description:
          'Apple presents product families (iPhone lineup, Mac lineup) in unified grids with consistent photography angles, lighting, and backgrounds. Each model benefits from the family context, and even the base model appears premium.',
        effectiveness: 'very-effective',
        analysis:
          'Apple is masterful at using the cheerleader effect within product families. The consistent visual language across the lineup makes every product feel like it belongs to a premium collection.',
      },
    ],

    abTests: [
      {
        title: 'Product Display: Grid vs Single Item Carousel',
        hypothesis:
          'Products displayed in a grid will receive higher attractiveness ratings and click-through than products shown one at a time in a carousel',
        controlVersion: {
          description:
            'Product carousel showing one item at a time with previous/next navigation',
          metrics: {
            conversionRate: '2.1%',
            timeOnPage: '0:45',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'Product grid showing 12 items in a 4x3 layout with consistent image treatment and uniform card sizing',
          metrics: {
            conversionRate: '3.8%',
            timeOnPage: '1:52',
            scrollDepth: '68%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The grid layout increased product click-through by 81%. Users browsed longer and explored more products. Post-test surveys showed users rated individual products higher when they had been presented in the grid context.',
          learnings: [
            'Grid layouts trigger ensemble averaging, boosting perceived quality of each item',
            'Users engaged with 3.2x more products in grid vs carousel format',
            'The effect was strongest for mid-range products that benefited most from group context',
            'Consistent visual treatment across the grid was essential—inconsistent grids performed worse than carousels',
          ],
        },
      },
      {
        title: 'Team Page: Group Photo vs Individual Headshots Only',
        hypothesis:
          'Leading with a group photo before individual headshots will increase trust and perceived team competence',
        controlVersion: {
          description:
            'Team page with only individual headshots in a grid, no group photo',
          metrics: {
            conversionRate: '5.4%',
            trustScore: '6.8/10',
          },
        },
        treatmentVersion: {
          description:
            'Team page leading with a group photo of the whole team, followed by the same individual headshot grid',
          metrics: {
            conversionRate: '7.2%',
            trustScore: '8.1/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Adding a group photo increased trust scores by 19% and conversion by 33%. The group context primed visitors to view each team member more favorably.',
          learnings: [
            'Group photos create an ensemble context that enhances perception of individual members',
            'Trust and competence ratings increased for the same individuals when a group photo was present',
            'The effect was strongest when the group photo appeared natural and candid rather than staged',
            'Consistent headshot styling below the group photo maintained the ensemble effect',
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
        name: 'Uniform Grid Layout',
        description:
          'Multiple items displayed in a grid with consistent sizing and spacing',
        howToSpot:
          'Look for product grids, image galleries, or card layouts with uniform dimensions and equal spacing',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Consistent Visual Treatment',
        description:
          'All items in a group share the same photographic style, background, and aspect ratio',
        howToSpot:
          'Check if images use consistent lighting, backgrounds, angles, and cropping across the group',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Collection Framing',
        description:
          'Items presented as a curated set, collection, or family rather than individual listings',
        howToSpot:
          'Look for labels like "Collection", "Series", "Family", or themed groupings',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Group-to-Individual Flow',
        description:
          'Group view (grid) leads to individual view (detail page) where the cheerleader effect drops off',
        howToSpot:
          'Navigate from grid to detail page and notice if the item feels less appealing in isolation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Team or People Grids',
        description:
          'Staff, team, or contributor photos shown in uniform grid layouts',
        howToSpot:
          'Look for rows of headshots with consistent circular or square crops and matching styles',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Product Collection Grid',
        description:
          'Multiple products displayed in a uniform grid with consistent photography and card styling',
        indicators: [
          'Equal-sized product cards in rows and columns',
          'Consistent image aspect ratios and backgrounds',
          'Uniform typography and pricing layout',
          'Cohesive color palette across product images',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Portfolio Gallery Pattern',
        description:
          'Creative work displayed as a curated set in a masonry or grid layout',
        indicators: [
          'Multiple project thumbnails visible simultaneously',
          'Consistent styling across diverse project types',
          'Collection or category grouping labels',
          'Dense visual layout maximizing items visible at once',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Team Ensemble Pattern',
        description:
          'Team members shown in group context before or alongside individual profiles',
        indicators: [
          'Group photo preceding individual headshots',
          'Uniform headshot grid with consistent styling',
          'Matching photo treatment (backgrounds, crops, lighting)',
          'Team presented as a cohesive unit',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Content Feed Grid',
        description:
          'Content items (articles, videos, posts) displayed in a uniform grid or card layout',
        indicators: [
          'Thumbnail grids for content discovery',
          'Consistent card dimensions across content types',
          'Curated or themed content groupings',
          'Visual similarity in thumbnail style',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are items displayed in a grid or collection, or shown individually?',
      'Is the visual treatment (sizing, aspect ratio, backgrounds) consistent across items in the group?',
      'Would any individual item look notably worse if pulled out of the group context?',
      'Is the collection curated for visual cohesion or randomly assembled?',
      'Does the detail/isolation view maintain the quality perception established by the grid?',
      'Are there enough items in the group (4+) to trigger meaningful ensemble averaging?',
      'Are group and individual contexts visually connected (consistent branding, styling)?',
      'Is the cheerleader effect being used ethically, or to mask quality issues?',
      'How does the layout handle screen readers and non-visual users who experience items sequentially?',
      'Are mixed-quality items intentionally hidden among higher-quality items?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the cheerleader effect (group attractiveness effect).

Analyze the provided design for cheerleader effect patterns. Identify:

1. **Grid and Collection Layouts**: How items are grouped and presented together
2. **Visual Consistency**: Whether items share consistent styling, sizing, and treatment
3. **Group Size**: Whether groups are large enough to trigger ensemble averaging
4. **Isolation Transitions**: How items look when moving from group to individual context
5. **Curation Quality**: Whether groupings are cohesive or random

For each pattern found:
- Identify whether the group context enhances or diminishes individual item perception
- Assess visual consistency within the group
- Determine if the cheerleader effect is being used ethically
- Evaluate the group-to-individual transition experience
- Suggest improvements for maximizing beneficial ensemble effects

Consider:
- Are product grids using consistent photography and card styling?
- Do team pages leverage group context appropriately?
- Are portfolio/gallery layouts creating cohesive ensembles?
- Does the detail page maintain perceived quality from the grid view?
- Are there quality mismatches being masked by the group context?

Provide actionable recommendations for ethical, effective use of the cheerleader effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        groupPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              groupSize: { type: 'number' },
              visualConsistency: { type: 'string' },
              ensembleStrength: { type: 'string' },
              isolationRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'visualConsistency',
              'ensembleStrength',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            gridConsistency: { type: 'number' },
            ensembleEffectiveness: { type: 'number' },
            isolationGap: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'gridConsistency',
            'ensembleEffectiveness',
            'isolationGap',
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
        'groupPatterns',
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
        title: 'Choose Items for Grouping',
        description:
          'Select items that share visual or thematic qualities and will benefit from ensemble context',
        example:
          'Curate a "New Arrivals" collection of products with complementary colors and similar photography style',
        tips: [
          'Group items that share a visual language (color palette, style, subject)',
          'Aim for groups of 4-12 items for optimal ensemble effect',
          'Avoid mixing items with drastically different quality levels',
        ],
      },
      {
        step: 2,
        title: 'Establish Consistent Visual Treatment',
        description:
          'Ensure all items in the group share uniform dimensions, aspect ratios, backgrounds, and styling',
        example:
          'All product photos shot on white background with 3:4 aspect ratio and consistent lighting',
        tips: [
          'Define a photo style guide for grouped items',
          'Use CSS to enforce consistent card sizes and image crops',
          'Maintain consistent typography and spacing across cards',
        ],
      },
      {
        step: 3,
        title: 'Design the Grid Layout',
        description:
          'Create a layout that presents items as a cohesive group with uniform spacing and alignment',
        example:
          'CSS Grid with repeat(auto-fill, minmax(240px, 1fr)) and consistent gap spacing',
        tips: [
          'Use CSS Grid or Flexbox for uniform item sizing',
          'Maintain equal gutters between all items',
          'Ensure the grid works at all viewport sizes without breaking uniformity',
        ],
      },
      {
        step: 4,
        title: 'Bridge the Group-to-Individual Transition',
        description:
          'Design detail pages and isolation views to maintain quality perception from the grid',
        example:
          'Product detail page includes a "From this Collection" section showing the item in its group context',
        tips: [
          'Add "Related Items" or "From this Collection" sections on detail pages',
          'Use consistent styling between grid cards and detail pages',
          'Include multiple images on detail pages to create a mini-ensemble',
        ],
      },
      {
        step: 5,
        title: 'Test and Validate',
        description:
          'Measure whether the grid context is genuinely enhancing perceived quality without deception',
        example:
          'A/B test grid layout vs list layout and measure click-through and return rates',
        tips: [
          'Compare engagement metrics between grid and single-item presentations',
          'Monitor return rates to ensure group context is not masking real quality issues',
          'Survey users on perceived quality in group vs isolation contexts',
        ],
      },
    ],

    dos: [
      'Use consistent image dimensions, aspect ratios, and photography style across grid items',
      'Group items of similar visual quality and thematic coherence',
      'Design grids with uniform spacing, sizing, and card styling',
      'Maintain visual connection between grid view and detail view',
      'Use collections and curated sets to maximize ensemble perception',
      'Ensure groups are large enough (4+ items) for meaningful ensemble averaging',
      'Test both group and isolation contexts for quality perception',
      'Use the cheerleader effect to elevate genuinely good items, not to hide poor ones',
    ],

    donts: [
      'Don\'t mix dramatically different image sizes or styles within a grid',
      'Don\'t use the cheerleader effect to disguise low-quality items among high-quality ones',
      'Don\'t show items only in group context if the detail page will disappoint',
      'Don\'t create grids with fewer than 3 items—they feel like comparisons, not collections',
      'Don\'t break visual consistency with one-off styling on individual grid items',
      'Don\'t ignore the isolation context (detail pages, cart, checkout) where the effect drops off',
      'Don\'t assume the effect works without visual cohesion—random groupings do not help',
      'Don\'t neglect screen reader users who experience items sequentially without group context',
    ],

    bestPractices: [
      {
        title: 'Curate for Visual Cohesion',
        description:
          'Deliberately group items that share visual qualities—color palette, style, subject matter—to maximize ensemble averaging',
        rationale:
          'The cheerleader effect requires the brain to perceive items as a group; visual cohesion enables this',
        example:
          'Organize products by collection with matched photography rather than by arbitrary categories',
      },
      {
        title: 'Maintain Uniform Grid Dimensions',
        description:
          'Enforce consistent card sizes, image aspect ratios, and spacing across all items in a grid',
        rationale:
          'Dimensional inconsistency breaks grouping and eliminates the ensemble benefit',
        example:
          'Use CSS Grid with fixed aspect-ratio images and equal column widths',
      },
      {
        title: 'Bridge Group and Individual Contexts',
        description:
          'Design detail pages that maintain quality perception established in the grid view',
        rationale:
          'Users who click through from a grid lose the ensemble benefit on the detail page, potentially feeling let down',
        example:
          'Include a "More from this Collection" section on detail pages to restore group context',
      },
      {
        title: 'Use Group Context for Team Pages',
        description:
          'Lead team sections with a group photo before showing individual profiles',
        rationale:
          'Group photos prime favorable ensemble perception that carries over to individual headshots',
        example:
          'Hero group photo of the team, followed by a uniform headshot grid with consistent styling',
      },
      {
        title: 'Optimize Gallery Density',
        description:
          'Show enough items simultaneously to trigger ensemble averaging without overwhelming the viewer',
        rationale:
          'Too few items (1-2) feel like comparisons; too many (20+) cause cognitive overload',
        example:
          'Display 6-12 items in view at a time, with scroll to reveal more',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure grid structure is conveyed semantically',
        implementation:
          'Use proper list or grid ARIA roles so screen readers understand items are part of a collection. Provide collection-level labels.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Each item needs descriptive alt text independent of group context',
        implementation:
          'Write alt text that describes individual item qualities rather than relying on the visual group context for meaning.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Label collections and groups clearly',
        implementation:
          'Provide clear headings for collections (e.g., "Summer Collection", "Our Team") so all users understand the grouping context.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Maintain contrast in grid item labels and prices',
        implementation:
          'Ensure text on grid cards meets 4.5:1 contrast ratio, even when overlaying images or using subtle styling.',
      },
    ],

    ethics: [
      {
        concern: 'Quality Masking',
        severity: 'high',
        explanation:
          'Using the cheerleader effect to hide low-quality items among high-quality items, misleading users about individual item quality',
        mitigation:
          'Ensure all items in a group meet a consistent quality standard. Do not deliberately place inferior items among superior ones to disguise deficiencies.',
      },
      {
        concern: 'Isolation Disappointment',
        severity: 'medium',
        explanation:
          'Items that look great in a grid may disappoint when viewed alone on a detail page, leading to returns and lost trust',
        mitigation:
          'Design detail pages that maintain quality perception. Use multiple images and "related items" sections to provide supporting context.',
      },
      {
        concern: 'Misleading Photography',
        severity: 'high',
        explanation:
          'Using heavily edited or idealized group photography that does not represent reality',
        mitigation:
          'Use accurate product photography and authentic team photos. The cheerleader effect works with genuine visuals—enhancement through grouping, not deception.',
      },
      {
        concern: 'Accessibility Equity',
        severity: 'medium',
        explanation:
          'Screen reader users experience items sequentially and miss the group context entirely, creating an unequal experience',
        mitigation:
          'Provide collection-level descriptions and ensure individual item descriptions are complete enough to stand alone without visual group context.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Hierarchical Encoding Makes Individuals in a Group Seem More Attractive',
        author: 'Walker, D., & Vul, E.',
        year: 2014,
        doi: '10.1177/0956797613497969',
        description:
          'The foundational paper identifying and naming the cheerleader effect, demonstrating that faces are rated as more attractive in group photos than in isolation',
        type: 'foundational',
      },
      {
        title: 'Ensemble Perception of Faces: A Window to Visual Cognition',
        author: 'Haberman, J., & Whitney, D.',
        year: 2012,
        description:
          'Research on how the visual system computes ensemble statistics from groups of faces, the mechanism underlying the cheerleader effect',
        type: 'advanced',
      },
      {
        title: 'Summary Statistical Representation in Perception',
        author: 'Alvarez, G. A.',
        year: 2011,
        description:
          'Comprehensive review of ensemble coding in visual perception, explaining how groups are processed as statistical summaries',
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
          'Covers the dual-process theory underlying ensemble perception and heuristic judgments including the cheerleader effect',
        type: 'foundational',
      },
      {
        title: 'The Art of Thinking Clearly',
        author: 'Dobelli, Rolf',
        year: 2013,
        isbn: '9780062219688',
        description:
          'Accessible coverage of cognitive biases including group perception effects and their implications for decision-making',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Cheerleader Effect: Why People Are More Attractive in Groups',
        author: 'Psychology Today',
        url: 'https://www.psychologytoday.com/us/blog/the-attraction-doctor/201501/the-cheerleader-effect',
        description:
          'Accessible overview of the cheerleader effect with practical implications',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Cheerleader Effect — How I Met Your Mother',
        author: 'CBS',
        url: 'https://www.youtube.com/watch?v=gBU2vNs_9Cg',
        description:
          'The pop culture origin of the term "cheerleader effect" from the TV show that popularized the concept',
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
      'social-proof',        // Group context reinforces that items are popular and validated
      'aesthetic-usability', // Visual cohesion in grids enhances perceived usability
      'halo-effect',         // Positive group impression creates a halo for individual items
      'gestalt-principles',  // Grouping and proximity principles enable ensemble perception
    ],

    conflicts: [
      'von-restorff-effect', // Making one item stand out conflicts with ensemble averaging
      'distinction-bias',    // Close comparison in grids can highlight differences over similarities
    ],

    confusedWith: [
      'halo-effect',     // Related but different: halo is one trait influencing others; cheerleader is group enhancing individual
      'social-proof',    // Social proof is about behavior validation; cheerleader is about perceptual enhancement
      'bandwagon-effect', // Bandwagon is about adoption; cheerleader is about aesthetic perception
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'ensemble-coding',
        'group-averaging',
      ],
    },
  },
};
