/**
 * CONTRAST EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const contrastEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'contrast-effect',
    name: 'Contrast Effect',
    aliases: ['Contrast Bias', 'Perceptual Contrast'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'contrast',
      'comparison',
      'relativity',
      'context-effects',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Objects are perceived relative to their surroundings, not in absolute terms.',

    detailed: `The Contrast Effect is a cognitive bias where the perception of something is altered by comparing it to something recently observed. The same item can appear dramatically different depending on what preceded it or what sits beside it — a mediocre option looks great after a terrible one, and a good option looks ordinary after an exceptional one.

This extends far beyond visual perception. A $50/month subscription feels cheap after viewing a $500/month enterprise plan. A 3-step onboarding feels effortless after reading about a competitor's 12-step setup. A modest apartment feels spacious after touring a cramped one. Our brains evaluate nearly everything in relative terms rather than on absolute merit.

In design, the contrast effect is a powerful tool for influencing perception of value, quality, effort, and desirability. By strategically controlling what users see before, beside, or after a target item, designers can shape how products, prices, features, and experiences are perceived — without changing the items themselves.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1950,
      theory: 'Contrast Theory',
      mechanism: `The brain evaluates stimuli not in isolation but relative to a reference point established by recent or adjacent experience. This happens because:

1. **Adaptation Level**: The nervous system establishes a baseline from recent stimuli, and new inputs are judged as deviations from that baseline
2. **Sequential Evaluation**: When options are presented in sequence, earlier items set the context for evaluating later ones
3. **Simultaneous Comparison**: When items are presented side by side, differences between them are perceptually amplified
4. **Category Assimilation**: Items close in quality are judged more similarly, while items far apart are judged as even more different than they are
5. **Hedonic Contrast**: Emotional reactions to an experience are intensified or diminished by the emotional valence of the preceding experience

The mechanism is largely automatic — we perceive things as better or worse, larger or smaller, easier or harder based on the comparison context, often without realizing the context is shaping our judgment.`,
    },

    realWorldExample: `Place your hand in ice water for 30 seconds, then in lukewarm water - it feels hot. Now place your hand in hot water for 30 seconds, then in the same lukewarm water - it feels cold. The water temperature hasn't changed, but your perception has shifted dramatically based on contrast with the previous stimulus.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Contrast Effect profoundly shapes how users perceive value, quality, and desirability across interfaces. By controlling what users compare against, designers can influence perception without changing the actual offering. Key applications include:

- Before/after comparisons that highlight transformation and value
- Upgrade paths that make premium tiers feel like obvious choices
- Competitive positioning that frames your product favorably
- Feature comparison tables that emphasize differentiators
- Sequential presentation that primes users for the target option
- Testimonial ordering that maximizes persuasive impact`,

    whenToUse: [
      {
        title: 'Upgrade Paths and Upsells',
        scenario:
          'When showing free tier limitations before presenting premium features',
        example:
          'Display the free plan\'s constraints (3 projects, no collaboration, basic export) before revealing what Pro unlocks (unlimited projects, real-time collaboration, advanced analytics)',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Before/After Transformations',
        scenario: 'When demonstrating the impact of your product or service',
        example:
          'Show a cluttered, slow dashboard before the redesigned version — the improvement feels dramatic when presented in sequence',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Comparison Tables',
        scenario: 'When helping users choose between product tiers or competing products',
        example:
          'Side-by-side comparison table with clear visual differentiation: checkmarks vs dashes, color-coded feature availability, highlighted recommended plan',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Competitive Positioning',
        scenario: 'When positioning your product against alternatives or competitors',
        example:
          'Show competitor limitations (manual process, no integrations, slow support) alongside your solution\'s strengths in a fair, verifiable comparison',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Testimonial Sequencing',
        scenario: 'When ordering customer stories to maximize persuasive impact',
        example:
          'Lead with the customer\'s painful "before" state, then reveal the transformation — the contrast between struggle and success amplifies perceived value',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Onboarding Effort Framing',
        scenario: 'When making your setup process feel simple relative to alternatives',
        example:
          'Show "Traditional setup: 2 weeks. With us: 5 minutes" to make your onboarding feel effortless by contrast',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Unfair Competitor Comparisons',
        reason:
          'Comparing against outdated, misrepresented, or cherry-picked competitor weaknesses is deceptive',
        consequence:
          'Loss of credibility if users verify claims; potential legal issues and brand damage',
        alternative:
          'Compare against current, verifiable competitor data. Let your genuine strengths speak for themselves.',
      },
      {
        title: 'Manipulative Before/After Imagery',
        reason:
          'Using misleading before/after images (different lighting, angles, editing) to exaggerate transformation',
        consequence:
          'User distrust when reality doesn\'t match expectations; refund requests and negative reviews',
        alternative:
          'Use honest, controlled before/after comparisons with consistent conditions',
      },
      {
        title: 'Medical or Health Decisions',
        reason:
          'Contrast effects can distort perception of treatment options and health risks',
        consequence:
          'Patients may choose inappropriately based on relative presentation rather than clinical merit',
        alternative:
          'Present health information with absolute metrics and clinical context, not relative framing',
      },
      {
        title: 'Rigged Demos and Benchmarks',
        reason:
          'Setting up demonstrations where competitors are configured to fail creates dishonest contrast',
        consequence:
          'Destroyed credibility if discovered; may violate fair advertising laws',
        alternative:
          'Run honest, reproducible benchmarks under fair conditions for all options',
      },
    ],

    commonMistakes: [
      {
        title: 'Obvious Rigging',
        description:
          'Making the contrast so extreme or artificial that users see through the manipulation',
        why: 'Users are savvy; a comically bad "before" or straw-man competitor comparison triggers skepticism',
        fix: 'Use realistic, verifiable contrasts. Moderate differences are more believable than extreme ones.',
      },
      {
        title: 'Inconsistent Comparison Baselines',
        description:
          'Comparing against different baselines in different parts of the experience',
        why: 'Shifting reference points confuse users and undermine trust in any single comparison',
        fix: 'Establish one clear, consistent baseline and use it throughout the comparison flow',
      },
      {
        title: 'Neglecting the Boomerang Effect',
        description:
          'Showing a "bad" option so close to the target that the target looks bad by association',
        why: 'Items too similar in quality trigger assimilation rather than contrast — guilt by association',
        fix: 'Ensure sufficient difference between the contrast item and target to trigger genuine contrast, not assimilation',
      },
      {
        title: 'Ignoring Sequential Order Effects',
        description:
          'Placing the best option first, making everything after feel like a downgrade',
        why: 'If users see the ideal option first, subsequent options feel disappointing by contrast',
        fix: 'Present options in an order where the target benefits from what came before — show limitations before strengths',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines what users compare against by controlling adjacency and sequence',
        examples: [
          'Side-by-side comparison layouts amplify perceived differences between options',
          'Before/after split-screen designs create immediate visual contrast',
          'Feature comparison tables with aligned rows make gaps impossible to miss',
          'Card layouts that place free next to premium tiers invite direct comparison',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Type size, weight, and style differences reinforce contrast between compared items',
        examples: [
          'Large bold pricing on the recommended plan vs muted text on alternatives',
          'Strikethrough text on old values next to bold new values creates before/after contrast',
          'Feature lists using bold for included vs light gray for excluded features',
          'Headline sizing that makes one option visually dominant',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color creates immediate visual contrast between compared elements',
        examples: [
          'Green checkmarks vs red X marks in comparison tables amplify feature differences',
          'Muted/grayscale "before" images next to vibrant "after" images heighten transformation',
          'Highlighted recommended plan with color vs neutral alternatives creates visual hierarchy',
          'Success/failure color coding in A/B test results emphasizes the gap between options',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive comparisons let users experience contrast firsthand',
        examples: [
          'Slider controls that reveal before/after states create engaging contrast experiences',
          'Toggle between free and premium views lets users feel the difference',
          'Interactive demos that show "without our product" then "with our product" sequences',
          'Hover states that preview the upgrade path relative to current plan',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing and sequencing are the primary vehicles for establishing contrast',
        examples: [
          'Customer testimonials structured as "before X, now Y" create narrative contrast',
          'Case studies that quantify the gap: "Was spending 40 hours, now takes 2"',
          'Competitor comparison copy that highlights meaningful differentiators',
          'Problem/solution framing where the problem is described before the solution',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Comparison information must be accessible to users with different abilities',
        examples: [
          'Screen readers must convey comparison structure (before vs after, plan vs plan)',
          'Color-coded comparisons need text or icon alternatives for colorblind users',
          'Before/after sliders need keyboard-accessible alternatives',
          'Comparison tables need proper header markup so assistive technology can navigate columns',
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
        title: 'Free vs Premium Feature Comparison',
        description:
          'SaaS pricing page showing free tier limitations before premium capabilities',
        code: `<div class="plan-comparison">
  <div class="plan free">
    <h3>Free</h3>
    <div class="price">$0<span>/month</span></div>
    <ul class="features">
      <li class="included">3 projects</li>
      <li class="included">Basic analytics</li>
      <li class="excluded">No collaboration</li>
      <li class="excluded">No API access</li>
      <li class="excluded">No priority support</li>
      <li class="excluded">No custom branding</li>
    </ul>
  </div>
  <div class="plan premium highlighted">
    <span class="badge">Recommended</span>
    <h3>Pro</h3>
    <div class="price">$29<span>/month</span></div>
    <ul class="features">
      <li class="included">Unlimited projects</li>
      <li class="included">Advanced analytics</li>
      <li class="included">Real-time collaboration</li>
      <li class="included">Full API access</li>
      <li class="included">Priority support</li>
      <li class="included">Custom branding</li>
    </ul>
  </div>
</div>`,
        explanation:
          'Placing the constrained free plan next to the feature-rich Pro plan makes the Pro tier feel like an obvious upgrade. The visual contrast of excluded (dashes/red) vs included (checkmarks/green) features amplifies the perceived gap.',
        principle:
          'Showing limitations before capabilities makes the upgrade feel essential, not optional',
        metrics: {
          before: '18% free-to-paid conversion with Pro plan shown alone',
          after: '31% free-to-paid conversion with side-by-side comparison',
          improvement: '72% increase in upgrade conversion',
        },
      },
      {
        title: 'Before/After Transformation Slider',
        description:
          'Product demo showing the user\'s workflow before and after adopting the tool',
        code: `<div class="transformation">
  <h2>See the Difference</h2>
  <div class="before-after-slider">
    <div class="before">
      <span class="label">Before</span>
      <div class="screenshot old-dashboard">
        <!-- Cluttered spreadsheet with manual data entry -->
        <p class="caption">Manual tracking: 12 spreadsheets,
        40 hours/week, frequent errors</p>
      </div>
    </div>
    <div class="divider" role="slider"
      aria-label="Drag to compare before and after"
      aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
    </div>
    <div class="after">
      <span class="label">After</span>
      <div class="screenshot new-dashboard">
        <!-- Clean automated dashboard -->
        <p class="caption">Automated dashboard: 1 view,
        2 hours/week, real-time accuracy</p>
      </div>
    </div>
  </div>
</div>`,
        explanation:
          'The interactive before/after slider lets users directly experience the contrast between the painful old way and the streamlined new way. The juxtaposition makes the improvement feel tangible and dramatic.',
        principle:
          'Direct visual comparison amplifies perceived transformation more than describing improvements in isolation',
      },
      {
        title: 'Honest Competitive Comparison Table',
        description:
          'Feature comparison against real competitors with verifiable claims',
        code: `<section class="competitive-comparison">
  <h2>How We Compare</h2>
  <p class="disclaimer">Data verified as of March 2026.
  <a href="/methodology">See our comparison methodology</a></p>
  <table>
    <thead>
      <tr>
        <th scope="col">Feature</th>
        <th scope="col" class="highlighted">Us</th>
        <th scope="col">Competitor A</th>
        <th scope="col">Competitor B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Setup time</th>
        <td class="highlighted">5 minutes</td>
        <td>2-3 days</td>
        <td>1 week</td>
      </tr>
      <tr>
        <th scope="row">Integrations</th>
        <td class="highlighted">200+</td>
        <td>50+</td>
        <td>30+</td>
      </tr>
      <tr>
        <th scope="row">Free tier</th>
        <td class="highlighted">Yes, unlimited</td>
        <td>14-day trial</td>
        <td>No</td>
      </tr>
    </tbody>
  </table>
</section>`,
        explanation:
          'The comparison table creates contrast that highlights genuine strengths while maintaining credibility through transparent methodology. Users can verify claims, which builds trust rather than suspicion.',
        principle:
          'Honest, verifiable comparisons leverage contrast effect while building long-term credibility',
      },
    ],

    bad: [
      {
        title: 'Manipulative Before/After Imagery',
        description:
          'Using dishonest photography to exaggerate transformation',
        code: `<!-- DON'T DO THIS -->
<div class="before-after">
  <div class="before">
    <!-- Bad lighting, unflattering angle, messy setup -->
    <img src="before-bad-lighting.jpg" alt="Before">
    <p>Before: Slow, broken, ugly</p>
  </div>
  <div class="after">
    <!-- Professional lighting, perfect angle, staged setup -->
    <img src="after-studio-shot.jpg" alt="After">
    <p>After: Fast, perfect, beautiful!</p>
  </div>
</div>`,
        explanation:
          'Using different conditions (lighting, angles, staging) between before and after images creates dishonest contrast. Users who adopt the product will experience a smaller improvement than promised, leading to disappointment and churn.',
        principle:
          'Manipulative before/after comparisons erode trust when reality falls short of the implied promise',
      },
      {
        title: 'Rigged Competitor Demo',
        description:
          'Configuring competitor products to fail in a comparison demo',
        code: `<!-- DON'T DO THIS -->
<div class="speed-comparison">
  <h2>See How Much Faster We Are!</h2>
  <div class="demo-side-by-side">
    <div class="competitor">
      <!-- Running competitor on slow server, unoptimized config -->
      <h3>Competitor X</h3>
      <div class="loading-bar slow">Loading... 12.3 seconds</div>
      <p style="color: red;">SLOW!</p>
    </div>
    <div class="us">
      <!-- Running our product on optimized infrastructure -->
      <h3>Our Product</h3>
      <div class="loading-bar fast">Loaded in 0.3 seconds</div>
      <p style="color: green;">BLAZING FAST!</p>
    </div>
  </div>
</div>`,
        explanation:
          'Running the competitor on degraded infrastructure while optimizing your own setup creates fraudulent contrast. If discovered, this destroys all credibility and may invite legal action.',
        principle:
          'Rigged comparisons are unethical and backfire catastrophically when exposed',
      },
      {
        title: 'Unfair Straw-Man Comparison',
        description:
          'Comparing against the worst possible alternative to make your product look good',
        code: `<!-- DON'T DO THIS -->
<div class="comparison">
  <h2>The Old Way vs The New Way</h2>
  <div class="old-way">
    <h3>Without Us</h3>
    <ul>
      <li>Handwrite everything on paper</li>
      <li>Mail physical letters to each customer</li>
      <li>Wait weeks for responses</li>
      <li>Manually calculate everything with an abacus</li>
    </ul>
  </div>
  <div class="new-way">
    <h3>With Us</h3>
    <ul>
      <li>Automated workflows</li>
      <li>Instant digital communication</li>
      <li>Real-time analytics</li>
      <li>AI-powered insights</li>
    </ul>
  </div>
</div>`,
        explanation:
          'Comparing against an absurdly outdated alternative (abacus?) rather than realistic competitors creates dishonest contrast. Users see through straw-man comparisons and lose trust.',
        principle:
          'Straw-man baselines insult user intelligence and undermine persuasion',
      },
    ],

    realWorld: [
      {
        company: 'Real Estate Agents',
        product: 'Property Showing Strategy',
        description: 'Real estate agents commonly show a less desirable property first (too small, needs work, overpriced), then show the target property. By contrast, the target property feels spacious, move-in ready, and fairly priced — even if it is merely average.',
        effectiveness: 'very-effective',
        analysis: 'This is one of the oldest and most reliable applications of the contrast effect. The "setup" property establishes a low baseline, making the target property feel significantly better by comparison. Agents report higher offer rates and faster decisions when using sequential contrast.',
      },
      {
        company: 'Car Dealerships',
        product: 'Vehicle Sales Process',
        description: 'Dealerships often show the fully loaded, most expensive model first during test drives. When the customer then sees the mid-range model, it feels affordable by comparison — even though it may still be above their original budget.',
        effectiveness: 'very-effective',
        analysis: 'The expensive model anchors expectations high, and the contrast with the mid-range model makes the latter feel like a smart, reasonable choice. Accessories and add-ons also feel trivial after committing to a large purchase (contrast with total price).',
      },
      {
        company: 'Slack',
        product: 'Free vs Paid Comparison',
        url: 'https://slack.com/pricing',
        description: 'Slack\'s pricing page shows the Free plan limitations (90-day message history, 10 integrations) directly beside the Pro plan. The contrast between constrained free and expansive paid makes the upgrade feel necessary once a team hits those limits.',
        effectiveness: 'very-effective',
        analysis: 'By letting users experience the Free tier\'s constraints firsthand before presenting the comparison, Slack creates experiential contrast — users feel the limitation before seeing the solution. This is more powerful than hypothetical contrast.',
      },
      {
        company: 'Tinder / Dating Apps',
        product: 'Profile Ordering Algorithm',
        description: 'Dating apps strategically order profiles to create contrast effects. Showing less attractive profiles before more attractive ones makes the latter feel especially appealing, increasing engagement and swipe rates.',
        effectiveness: 'effective',
        analysis: 'Sequential contrast in profile presentation affects perceived attractiveness. Research by Kenrick & Gutierres (1980) demonstrated this effect with physical attractiveness ratings, which directly applies to how dating apps optimize engagement through presentation order.',
      },
    ],

    abTests: [
      {
        title: 'SaaS Upgrade Page: Limitations-First vs Benefits-First',
        hypothesis:
          'Showing free tier limitations before premium features will increase upgrade conversion via contrast effect',
        controlVersion: {
          description:
            'Upgrade page listing Pro features only: "Get unlimited projects, advanced analytics, team collaboration, and priority support for $29/month"',
          metrics: {
            conversionRate: '8.2%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Upgrade page showing current Free limitations first (3 projects, basic analytics, no collaboration), then revealing what Pro unlocks with side-by-side comparison',
          metrics: {
            conversionRate: '14.6%',
            timeOnPage: '2:38',
            scrollDepth: '71%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Showing limitations before capabilities nearly doubled conversion. Users who saw their current constraints first perceived the Pro features as more valuable by contrast. Time on page and scroll depth both increased, indicating deeper engagement with the comparison.',
          learnings: [
            'Contrast requires a visible baseline — don\'t assume users remember their current limitations',
            'Side-by-side layouts amplify contrast more than sequential presentation alone',
            'The effect was strongest for users on free plans who had hit feature limits',
            'Users who converted from the contrast page had 23% lower 30-day churn, suggesting the contrast set more accurate expectations',
          ],
        },
      },
      {
        title: 'Before/After Case Study: Narrative vs Side-by-Side',
        hypothesis:
          'Visual before/after comparison will outperform narrative-only case studies',
        controlVersion: {
          description:
            'Case study as a text narrative: "Company X was struggling with slow processes. After adopting our tool, they saved 30 hours per week."',
          metrics: {
            conversionRate: '3.1%',
            clickThroughRate: '11%',
          },
        },
        treatmentVersion: {
          description:
            'Same case study with visual before/after: screenshot of cluttered spreadsheet workflow beside clean dashboard, with metrics overlay (40 hrs/week -> 10 hrs/week)',
          metrics: {
            conversionRate: '5.9%',
            clickThroughRate: '22%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Visual before/after nearly doubled click-through and increased conversion by 90%. The visual contrast made the transformation concrete and immediate rather than abstract. Users could see the difference rather than having to imagine it.',
          learnings: [
            'Visual contrast is processed faster and feels more credible than written claims',
            'Before/after screenshots outperformed before/after metrics alone',
            'Interactive sliders (tested separately) performed 15% better than static side-by-side',
            'Authenticity matters — obviously staged screenshots performed worse than real product screenshots',
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
        name: 'Side-by-Side Comparison Layout',
        description:
          'Two or more options presented adjacently to invite direct visual comparison',
        howToSpot:
          'Look for split-screen designs, comparison tables, or adjacent cards with different feature sets or pricing',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Before/After Patterns',
        description:
          'Sequential or juxtaposed presentation showing a "before" state and an "after" state',
        howToSpot:
          'Look for slider controls, split images, "old way / new way" sections, or transformation narratives',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Competitive Positioning Elements',
        description:
          'Direct comparisons to competitors or alternative approaches',
        howToSpot:
          'Look for "vs" language, competitor logos in comparison tables, "why switch" sections, or "how we compare" headings',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Feature Inclusion/Exclusion Indicators',
        description:
          'Visual markers showing what\'s included vs excluded across tiers or products',
        howToSpot:
          'Look for checkmark/X patterns, green/red color coding, or "included"/"not available" text in comparison grids',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Sequential Option Presentation',
        description:
          'Options or information presented in a deliberate order designed to create contrast',
        howToSpot:
          'Check if worse options appear before better ones, if problems are shown before solutions, or if limitations precede capabilities',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Limitation-Before-Capability Pattern',
        description: 'Current constraints or free tier limitations shown before upgrade features',
        indicators: [
          '"You\'re currently limited to..." messaging before upgrade CTA',
          'Free plan feature list with excluded items next to paid plan',
          'Usage warnings ("3 of 3 projects used") near upgrade prompts',
          'Feature gating messages that highlight what\'s missing',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Before/After Transformation Pattern',
        description: 'Visual or narrative juxtaposition of a problem state and solution state',
        indicators: [
          'Before/after image sliders or split views',
          'Case studies structured as problem-then-solution narratives',
          '"Old way vs new way" comparisons',
          'Metric transformations (e.g., "40 hours → 2 hours")',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Competitive Comparison Pattern',
        description: 'Direct feature or capability comparison against competitors or alternatives',
        indicators: [
          'Feature comparison tables with multiple products/services',
          '"Why choose us" sections with competitor weaknesses',
          'Benchmark results showing relative performance',
          '"Switch from X" landing pages',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Sequential Presentation Pattern',
        description: 'Deliberate ordering of options to create contrast effects through sequence',
        indicators: [
          'Demo flows showing pain point before solution',
          'Onboarding sequences that highlight what life was like "before"',
          'Testimonial ordering from struggle to success',
          'Pricing pages where order of plans creates desired contrast',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are options presented in a side-by-side layout that invites direct comparison?',
      'Is there a before/after element (visual, narrative, or statistical)?',
      'What reference point or baseline is being used for comparison?',
      'Is the comparison fair — same conditions, verifiable data, accurate representation?',
      'Are competitors or alternatives depicted honestly and currently?',
      'Does the sequence of information create contrast that benefits a specific option?',
      'Are feature inclusion/exclusion indicators (checkmarks, X marks) used in comparison grids?',
      'Is the "before" state realistic or exaggerated for dramatic effect?',
      'Could the contrast be perceived as manipulative by a skeptical user?',
      'Are there accessibility alternatives for visual comparison elements (sliders, color-coded tables)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the contrast effect.

Analyze the provided design for contrast effect patterns. Identify:

1. **Comparison Layouts**: Side-by-side presentations, feature tables, pricing grids
2. **Before/After Elements**: Transformation visuals, problem/solution narratives, metric improvements
3. **Sequential Contrast**: Order of options, information flow designed to create relative perception
4. **Competitive Positioning**: How alternatives or competitors are presented relative to the product
5. **Baseline Framing**: What reference points are established for comparison

For each contrast pattern found:
- Identify the comparison elements and their relationship
- Assess whether the contrast is fair, accurate, and verifiable
- Determine if it helps users make informed decisions or manipulates perception
- Evaluate whether the baseline/reference point is honest
- Suggest improvements for ethical, effective contrast

Consider:
- Is the comparison creating genuine understanding or distorting perception?
- Are before/after elements using consistent conditions?
- Are competitor comparisons fair, current, and verifiable?
- Does the sequential order serve user needs or just business goals?
- Are comparison layouts accessible to screen reader and keyboard users?

Provide actionable recommendations for honest, effective use of contrast.`,

    outputSchema: {
      type: 'object',
      properties: {
        contrastPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              comparisonElements: { type: 'string' },
              baseline: { type: 'string' },
              fairnessAssessment: { type: 'string' },
              potentialManipulation: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'comparisonElements',
              'baseline',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            comparisonFairness: { type: 'number' },
            baselineHonesty: { type: 'number' },
            contrastEffectiveness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'comparisonFairness',
            'baselineHonesty',
            'contrastEffectiveness',
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
        'contrastPatterns',
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
        title: 'Identify the Comparison Context',
        description:
          'Determine what users will naturally compare your product, feature, or price against',
        example:
          'Users comparing your $29/mo Pro plan will contrast it against their current Free plan limitations and competitor pricing',
        tips: [
          'Map the user\'s existing reference points before designing comparison layouts',
          'Consider what users experienced immediately before reaching your comparison page',
          'Identify both explicit comparisons (pricing tables) and implicit ones (sequential flows)',
        ],
      },
      {
        step: 2,
        title: 'Choose an Honest Baseline',
        description:
          'Select a fair, accurate reference point that creates legitimate contrast',
        example:
          'Compare your setup time (5 min) against the industry average (2-3 days), not against the worst outlier (6 months)',
        tips: [
          'Use verifiable, current data for competitor comparisons',
          'Choose baselines that are representative, not cherry-picked extremes',
          'Document and disclose your comparison methodology',
        ],
      },
      {
        step: 3,
        title: 'Design the Comparison Layout',
        description:
          'Create a visual presentation that makes the contrast clear and accessible',
        example:
          'Side-by-side feature table with consistent structure, clear headers, and accessible markup',
        tips: [
          'Use consistent visual formatting so differences are about content, not presentation tricks',
          'Ensure comparison tables have proper semantic HTML (th/td, scope attributes)',
          'Provide alternatives to visual-only contrast (color + text + icons)',
        ],
      },
      {
        step: 4,
        title: 'Sequence for Maximum Honest Impact',
        description:
          'Order information so users encounter the baseline before the target',
        example:
          'Show "Your current plan: 3 projects, basic analytics" before "Upgrade to Pro: unlimited everything"',
        tips: [
          'Present limitations or problems before solutions and capabilities',
          'Let users experience constraints before showing the upgrade path',
          'Structure testimonials as journey narratives (struggle → transformation)',
        ],
      },
      {
        step: 5,
        title: 'Validate and Test',
        description:
          'Verify that your contrast is perceived as fair and drives the intended behavior',
        example:
          'A/B test comparison-first vs benefits-first layouts; survey users on perceived fairness',
        tips: [
          'Ask test users if the comparison feels honest and helpful',
          'Monitor post-conversion satisfaction to ensure contrast didn\'t set unrealistic expectations',
          'Track comparison-to-conversion path to measure contrast effectiveness',
        ],
      },
    ],

    dos: [
      'Use honest, verifiable data in all comparison tables and before/after presentations',
      'Maintain consistent conditions in before/after comparisons (same lighting, scale, context)',
      'Provide comparison methodology or data sources when making competitive claims',
      'Design comparison layouts that are accessible (proper table markup, keyboard navigation, screen reader support)',
      'Show the user\'s current state as the baseline for upgrade contrast (experiential contrast)',
      'Use sequential presentation to help users appreciate improvements (problem → solution)',
      'Allow users to verify comparison claims through links to sources or methodology',
      'Test whether your contrast sets accurate expectations for post-purchase experience',
    ],

    donts: [
      'Don\'t use dishonest before/after conditions (different lighting, staging, or editing)',
      'Don\'t compare against straw-man competitors or outdated competitor data',
      'Don\'t rig demos or benchmarks to make competitors look worse than they are',
      'Don\'t create such extreme contrast that users see through the manipulation',
      'Don\'t rely solely on color to convey comparison information (accessibility)',
      'Don\'t present the comparison baseline without disclosing how it was selected',
      'Don\'t use contrast to pressure users into decisions they\'ll regret (high churn signal)',
      'Don\'t hide important caveats or limitations in the "after" or "our product" column',
    ],

    bestPractices: [
      {
        title: 'Fair Baseline Selection',
        description:
          'Always compare against a representative, verifiable baseline rather than the worst possible alternative',
        rationale:
          'Honest baselines build trust; straw-man comparisons erode it when users do their own research',
        example:
          'Compare your performance against the industry average or the top 3 competitors, not against an outdated niche tool',
      },
      {
        title: 'Experiential Contrast Over Hypothetical',
        description:
          'Let users experience the contrast themselves rather than just telling them about it',
        rationale:
          'Felt contrast (hitting a limit, using the free tier) is far more persuasive than described contrast',
        example:
          'Show "You\'ve used 3 of 3 projects" in-app before the upgrade prompt, not just a comparison table on the marketing site',
      },
      {
        title: 'Consistent Comparison Conditions',
        description:
          'Ensure before/after and competitor comparisons use identical conditions',
        rationale:
          'Inconsistent conditions make the contrast dishonest and vulnerable to debunking',
        example:
          'Run all benchmark tests on identical hardware; use same lighting and angle for before/after photos',
      },
      {
        title: 'Accessible Comparison Markup',
        description:
          'Build comparison tables and before/after elements with proper semantic HTML and ARIA',
        rationale:
          'Contrast-based information is useless if assistive technology users can\'t access the comparison structure',
        example:
          'Use <table> with proper <th scope="col"> headers, role="slider" for before/after controls, and text alternatives for color-coded indicators',
      },
      {
        title: 'Post-Contrast Expectation Alignment',
        description:
          'Ensure the contrast-driven expectation matches the actual post-conversion experience',
        rationale:
          'Overpromising through exaggerated contrast leads to higher churn and negative reviews',
        example:
          'If your case study shows "40 hours → 2 hours", verify this is a typical outcome, not a best-case outlier',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Comparison structures must be conveyed through markup, not just visual layout',
        implementation:
          'Use proper table markup with row and column headers for comparison grids. Use semantic grouping for before/after elements.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to convey comparison results (green = good, red = bad)',
        implementation:
          'Combine color with icons (checkmark/X), text labels ("Included"/"Not available"), and proper ARIA attributes.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Before/after sliders and interactive comparisons must be keyboard accessible',
        implementation:
          'Provide keyboard controls for before/after sliders (arrow keys). Offer a static comparison alternative for users who can\'t use sliders.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Comparison reading order must make sense programmatically',
        implementation:
          'Ensure DOM order matches visual comparison order. Screen readers should encounter the baseline before the target, preserving the contrast sequence.',
      },
    ],

    ethics: [
      {
        concern: 'Dishonest Before/After Comparisons',
        severity: 'critical',
        explanation:
          'Using different conditions, editing, or staging between before and after states to exaggerate the transformation',
        mitigation:
          'Maintain identical conditions for before/after presentations. Disclose any differences. Use real product screenshots, not mockups.',
      },
      {
        concern: 'Unfair Competitor Comparisons',
        severity: 'critical',
        explanation:
          'Misrepresenting competitor capabilities, using outdated data, or configuring competitors to fail in demonstrations',
        mitigation:
          'Use current, verifiable competitor data. Disclose comparison methodology. Offer competitors the chance to verify accuracy.',
      },
      {
        concern: 'Straw-Man Baselines',
        severity: 'high',
        explanation:
          'Comparing against unrealistically bad alternatives to make your product look artificially superior',
        mitigation:
          'Compare against representative alternatives that users would actually consider. Use industry averages or recognized competitors.',
      },
      {
        concern: 'Expectation Inflation',
        severity: 'high',
        explanation:
          'Creating contrast so dramatic that post-purchase reality disappoints, leading to churn and negative word-of-mouth',
        mitigation:
          'Validate that before/after claims represent typical outcomes. Include ranges or caveats. Track post-conversion satisfaction.',
      },
      {
        concern: 'Exploiting Dissatisfaction',
        severity: 'medium',
        explanation:
          'Amplifying user frustration with their current tool purely to drive switching, rather than solving genuine problems',
        mitigation:
          'Focus on genuine improvements your product offers. Let real product quality drive the comparison rather than manufactured dissatisfaction.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Physical Attractiveness Contrast Effect and Judgmental Biases',
        author: 'Kenrick, D. T., & Gutierres, S. E.',
        year: 1980,
        description:
          'Foundational study demonstrating that exposure to highly attractive individuals shifts judgments of average attractiveness — a key demonstration of the contrast effect on social perception',
        type: 'foundational',
      },
      {
        title: 'Context Effects in Judgment and Choice',
        author: 'Simonson, I., & Tversky, A.',
        year: 1992,
        description:
          'Research on how the context of available options changes preference and choice, including contrast and compromise effects',
        type: 'foundational',
      },
      {
        title: 'Adding Asymmetrically Dominated Alternatives: Violations of Regularity and the Similarity Hypothesis',
        author: 'Huber, J., Payne, J. W., & Puto, C.',
        year: 1982,
        description:
          'Introduces the attraction (decoy) effect, closely related to contrast — adding an inferior option shifts preference toward the target',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on the contrast principle is the definitive practical guide — explains how sequential presentation shapes perception in sales, negotiation, and design',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Explores how relative comparisons drive decisions, with excellent examples of contrast and decoy effects in pricing and choice',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the broader context of how comparison and reference points shape perception and judgment',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Contrast Effect in UX Design',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies',
        description:
          'Practical case studies showing how contrast effect is used in real product design, with visual examples and psychological analysis',
        type: 'practical',
      },
      {
        title: 'How Contrast Effects Influence Consumer Decisions',
        author: 'Behavioral Economics',
        url: 'https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/contrast-effect/',
        description:
          'Overview of contrast effect research and its applications in marketing, pricing, and product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Contrast Effect — Why Everything Is Relative',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/results?search_query=contrast+effect+behavioral+economics',
        description:
          'Animated explanation of the contrast effect with real-world examples from pricing, dating, and negotiation',
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
