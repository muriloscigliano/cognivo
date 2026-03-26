/**
 * FLUENCY HEURISTIC
 *
 * We judge easy-to-process information as more true
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const fluencyHeuristic: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'fluency-heuristic',
    name: 'Fluency Heuristic',
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
    simple: 'We judge easy-to-process information as more true',

    detailed: `The Fluency Heuristic describes our tendency to perceive information that is easy to process — cognitively "fluent" — as more truthful, familiar, likeable, and trustworthy. When something is easy to read, see, or understand, we unconsciously interpret that ease as a signal of truth, safety, and quality.

This bias operates at a fundamental perceptual level. The subjective experience of processing ease (or difficulty) acts as a metacognitive cue that the brain uses to make rapid judgments about credibility, beauty, risk, and intelligence. A statement printed in a clear, high-contrast font literally feels more true than the same statement in a hard-to-read font.

In UX and product design, fluency is one of the most powerful and underappreciated forces shaping user trust. Clean typography, simple layouts, fast load times, clear language, and visual harmony all increase processing fluency — making products feel more credible, professional, and trustworthy. Conversely, visual clutter, poor typography, jargon, and slow performance reduce fluency and erode trust, even when the underlying content is identical.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain uses processing ease as a heuristic shortcut for truth, familiarity, and safety. This happens because:

1. **Processing Ease as Truth Signal**: When information is processed fluently (quickly, effortlessly), the brain interprets that ease as a sign the information is familiar, and therefore likely true
2. **Hedonic Marking**: Fluent processing generates a subtle positive affect — things that are easy to process literally feel better, leading to more favorable judgments
3. **Misattribution of Fluency**: People cannot distinguish between fluency caused by repeated exposure, visual clarity, or actual truth — all fluency "feels" the same
4. **Disfluency as Danger Signal**: When processing is difficult (hard-to-read text, complex layouts, slow loading), the brain interprets this friction as a warning signal, reducing trust and increasing skepticism
5. **Perceptual-Conceptual Transfer**: Visual fluency (clean design) transfers to conceptual fluency (content seems smarter, more credible)

The mechanism is automatic and unconscious — we are not aware that our judgments of truth, beauty, and trust are being shaped by processing ease.`,
    },

    realWorldExample: `In a landmark study by Reber and Schwarz (1999), participants read statements printed in either high-contrast (easy to read) or low-contrast (hard to read) fonts. The same statements were rated as significantly more true when they were easy to read. In another study, stocks with easy-to-pronounce ticker symbols (e.g., KAR) outperformed those with difficult names (e.g., RDO) in the short term — investors trusted "fluent" names more.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Fluency Heuristic profoundly affects how users perceive credibility, trustworthiness, and quality of digital interfaces. Processing ease directly translates to trust. Designers can leverage this to:

- Increase perceived credibility through clean, readable typography
- Build trust with simple, uncluttered layouts that reduce cognitive load
- Improve conversion by using clear, jargon-free language
- Enhance perceived quality through fast load times and smooth interactions
- Strengthen brand perception with visual harmony and consistent design systems`,

    whenToUse: [
      {
        title: 'Trust-Critical Pages',
        scenario:
          'When users must trust content to take action (checkout, sign-up, medical information)',
        example:
          'Use high-contrast typography, generous whitespace, and simple language on checkout pages to maximize processing fluency and trust',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding and First Impressions',
        scenario: 'When introducing users to a new product or feature for the first time',
        example:
          'Present a clean, minimal welcome screen with one clear CTA rather than overwhelming users with all features at once',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content-Heavy Pages',
        scenario: 'When presenting long-form content, documentation, or educational material',
        example:
          'Use optimal line length (50-75 characters), generous line height (1.5-1.6), and clear heading hierarchy to maximize reading fluency',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Form Design',
        scenario: 'When asking users to complete forms or input data',
        example:
          'Use single-column layouts, clear labels above fields, and progressive disclosure to make form completion feel effortless',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error and Empty States',
        scenario: 'When communicating errors or guiding users through recovery',
        example:
          'Use plain language, clear visual hierarchy, and obvious next steps so error recovery feels simple rather than intimidating',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Critical Warnings and Disclosures',
        reason:
          'Making dangerous actions too fluent can cause users to breeze past important warnings',
        consequence:
          'Users might confirm irreversible actions or skip critical safety information because everything feels smooth and easy',
        alternative:
          'Introduce deliberate disfluency (friction) for dangerous actions — use confirmation dialogs, require typing to confirm, or slow down the flow',
      },
      {
        title: 'Legal and Compliance Content',
        reason:
          'Over-simplifying legal terms to increase fluency can misrepresent obligations',
        consequence:
          'Users may agree to terms they don\'t understand because the simplified version feels trustworthy',
        alternative:
          'Provide both a fluent summary and the full legal text, clearly labeled',
      },
      {
        title: 'Complex Decision-Making',
        reason:
          'Too much fluency can make users overconfident in quick decisions that deserve careful thought',
        consequence:
          'Users might make poor financial, medical, or contractual decisions because the interface made it feel simple',
        alternative:
          'Use strategic disfluency — require users to slow down and review before committing to high-stakes decisions',
      },
      {
        title: 'Deceptive Simplicity',
        reason:
          'Making misleading content fluent to exploit trust is manipulative',
        consequence:
          'Users trust false or misleading claims because they are presented in a clean, professional format',
        alternative:
          'Ensure content accuracy matches presentation quality; never use fluency to disguise deception',
      },
    ],

    commonMistakes: [
      {
        title: 'Sacrificing Clarity for Aesthetics',
        description:
          'Using trendy but hard-to-read fonts, low-contrast text, or decorative layouts that reduce readability',
        why: 'Visual aesthetics and processing fluency are not the same thing — a "beautiful" design with 3:1 contrast ratio destroys fluency',
        fix: 'Prioritize readability metrics (contrast ratio, font size, line height) over aesthetic trends. Test with WCAG contrast checkers.',
      },
      {
        title: 'Information Overload',
        description:
          'Cramming too much content, too many options, or too many visual elements onto a single screen',
        why: 'Visual clutter dramatically reduces processing fluency, making everything seem less trustworthy and harder to use',
        fix: 'Ruthlessly reduce visual noise. Use progressive disclosure, whitespace, and clear hierarchy to present information gradually.',
      },
      {
        title: 'Inconsistent Design Patterns',
        description:
          'Using different button styles, navigation patterns, or layout structures across pages',
        why: 'Inconsistency forces users to re-learn the interface on each page, destroying the fluency built by familiarity',
        fix: 'Use a design system with consistent components, spacing, and interaction patterns across the entire product.',
      },
      {
        title: 'Ignoring Performance',
        description:
          'Accepting slow load times, janky animations, or laggy interactions',
        why: 'Performance is fluency. A 3-second delay breaks the user\'s flow state and reduces trust, regardless of how clean the design looks',
        fix: 'Treat performance as a design requirement. Target sub-second load times, 60fps animations, and instant feedback on interactions.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout directly determines how easily users can scan, find, and process information',
        examples: [
          'Clean, grid-based layouts with generous whitespace increase processing fluency',
          'Single-column content layouts are more fluent than multi-column for reading',
          'Consistent spacing and alignment create visual rhythm that aids processing',
          'Progressive disclosure reduces initial cognitive load, improving first-impression fluency',
        ],
      },
      typography: {
        level: ImpactLevel.CRITICAL,
        description:
          'Typography is the single most impactful factor in processing fluency — it directly controls how easily text is read and trusted',
        examples: [
          'High-contrast text (7:1+ ratio) is processed faster and judged more truthful',
          'Optimal font size (16px+ body) and line height (1.5-1.6) maximize reading fluency',
          'Clear heading hierarchy (size, weight, spacing) aids scanning and comprehension',
          'Familiar, well-designed typefaces are more fluent than novel or decorative ones',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color harmony and contrast directly affect visual fluency and emotional response',
        examples: [
          'Limited, harmonious color palettes feel more professional and trustworthy',
          'Sufficient contrast between text and background is essential for fluency',
          'Consistent semantic color usage (green = success, red = error) leverages learned fluency',
          'Too many colors create visual noise that reduces processing ease',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Smooth, predictable interactions create a sense of fluency and control',
        examples: [
          'Instant feedback on clicks/taps confirms user intent and maintains flow',
          'Smooth, eased animations feel more natural and fluent than jarring transitions',
          'Predictable navigation patterns leverage familiarity for processing ease',
          'Fast load times preserve the fluency of the user\'s mental flow state',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Language clarity and simplicity directly determine how fluently content is processed and whether it is believed',
        examples: [
          'Short, clear sentences are processed more fluently than complex, jargon-filled ones',
          'Concrete language ("save 2 hours") is more fluent than abstract ("improve efficiency")',
          'Familiar words and phrasings are processed faster and trusted more',
          'Well-structured content with clear headings enables fluent scanning',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Accessibility is fluency — removing processing barriers ensures all users can experience cognitive ease',
        examples: [
          'WCAG-compliant contrast ratios ensure fluency for low-vision users',
          'Clear focus indicators make keyboard navigation fluent',
          'Semantic HTML enables screen readers to present content in a fluent, logical order',
          'Captions and transcripts extend fluency to deaf and hard-of-hearing users',
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
        title: 'Clean Typography with High Contrast',
        description:
          'Landing page using optimized typography to maximize reading fluency and trust',
        code: `<section class="hero">
  <h1 style="
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    color: #111827;
    letter-spacing: -0.02em;
  ">Ship better products, faster</h1>

  <p style="
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1.25rem;
    line-height: 1.6;
    color: #374151;
    max-width: 42ch;
    margin-top: 1.5rem;
  ">The platform trusted by 10,000+ teams to streamline
  their development workflow and ship with confidence.</p>

  <button style="
    font-size: 1.125rem;
    font-weight: 600;
    padding: 0.875rem 2rem;
    background: #2563eb;
    color: #ffffff;
    border-radius: 0.5rem;
    margin-top: 2rem;
  ">Start Free Trial</button>
</section>`,
        explanation:
          'High-contrast text (>7:1 ratio), optimal line length (~42ch), generous line height (1.6), and a familiar sans-serif font maximize processing fluency. The content literally feels more true and trustworthy because it is easy to read.',
        principle:
          'Readable typography directly increases perceived truthfulness and trust',
        metrics: {
          before: '3.2% conversion with decorative serif font at 14px, 4.5:1 contrast',
          after: '5.1% conversion with clean sans-serif at 20px, 8:1 contrast',
          improvement: '59% increase in conversion from typography fluency alone',
        },
      },
      {
        title: 'Simple Form Layout with Clear Structure',
        description:
          'Checkout form designed for maximum processing fluency',
        code: `<form class="checkout-form" style="max-width: 480px;">
  <h2>Complete your order</h2>

  <div class="field">
    <label for="email">Email address</label>
    <input type="email" id="email" placeholder="you@example.com">
  </div>

  <div class="field">
    <label for="card">Card number</label>
    <input type="text" id="card" placeholder="1234 5678 9012 3456">
  </div>

  <div class="field-row">
    <div class="field">
      <label for="expiry">Expiry</label>
      <input type="text" id="expiry" placeholder="MM / YY">
    </div>
    <div class="field">
      <label for="cvc">CVC</label>
      <input type="text" id="cvc" placeholder="123">
    </div>
  </div>

  <button type="submit" class="primary">Pay $49.00</button>

  <p class="security-note">
    <svg class="lock-icon"><!-- lock icon --></svg>
    Secured with 256-bit encryption
  </p>
</form>`,
        explanation:
          'Single-column layout, labels above fields, minimal fields, and a clear CTA create maximum processing fluency. The form feels simple and safe, increasing willingness to complete the purchase.',
        principle:
          'Reducing visual complexity in forms increases trust and completion rate',
        metrics: {
          before: '62% completion rate with two-column form, inline labels, 8 fields',
          after: '81% completion rate with single-column, top labels, 4 fields',
          improvement: '31% increase in form completion from layout fluency',
        },
      },
      {
        title: 'Fast-Loading Page with Instant Feedback',
        description:
          'Product page optimized for performance fluency',
        code: `<!-- Skeleton loading for instant perceived performance -->
<div class="product-page">
  <!-- Critical content loads immediately -->
  <h1>Wireless Headphones Pro</h1>
  <p class="price">$79.99</p>
  <button class="add-to-cart">Add to Cart</button>

  <!-- Non-critical content loads progressively -->
  <div class="reviews-skeleton" aria-busy="true">
    <div class="skeleton-line" style="width: 60%"></div>
    <div class="skeleton-line" style="width: 80%"></div>
    <div class="skeleton-line" style="width: 40%"></div>
  </div>
</div>

<style>
.skeleton-line {
  height: 1rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
}
</style>`,
        explanation:
          'Skeleton screens and progressive loading maintain processing fluency even during load times. Critical content (name, price, CTA) appears instantly, preserving the user\'s flow state and trust.',
        principle:
          'Performance is fluency — fast, progressive loading maintains cognitive ease and trust',
      },
    ],

    bad: [
      {
        title: 'Hard-to-Read Typography Destroying Trust',
        description:
          'Landing page using decorative fonts and poor contrast that reduce fluency',
        code: `<!-- DON'T DO THIS -->
<section class="hero">
  <h1 style="
    font-family: 'Playfair Display', cursive;
    font-size: 2rem;
    font-weight: 400;
    color: #999999;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  ">REVOLUTIONIZE YOUR WORKFLOW</h1>

  <p style="
    font-family: 'Crimson Text', serif;
    font-size: 0.875rem;
    line-height: 1.3;
    color: #aaaaaa;
    max-width: 80ch;
  ">Our cutting-edge, paradigm-shifting, enterprise-grade
  synergistic platform leverages proprietary algorithms to
  facilitate cross-functional optimization of your team's
  deliverables and KPI achievement vectors.</p>
</section>`,
        explanation:
          'Low-contrast text (#999 on white = 2.8:1), decorative font, tiny size, narrow line height, excessively long lines, and jargon-filled content all destroy processing fluency. The content feels untrustworthy and hard to believe, even if the product is excellent.',
        principle:
          'Disfluent typography makes content feel less true, less professional, and less trustworthy',
      },
      {
        title: 'Cluttered Interface Reducing Credibility',
        description:
          'Dashboard cramming too much information into one screen',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard" style="padding: 0.25rem;">
  <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.25rem;">
    <div class="widget" style="font-size: 0.7rem;">Revenue: $12,345</div>
    <div class="widget" style="font-size: 0.7rem;">Users: 5,678</div>
    <div class="widget" style="font-size: 0.7rem;">Churn: 3.2%</div>
    <div class="widget" style="font-size: 0.7rem;">MRR: $98,765</div>
    <div class="widget" style="font-size: 0.7rem;">NPS: 72</div>
    <div class="widget" style="font-size: 0.7rem;">DAU: 2,345</div>
    <!-- 20 more widgets... -->
    <div class="chart" style="font-size: 0.6rem;"><!-- tiny chart --></div>
    <div class="chart" style="font-size: 0.6rem;"><!-- tiny chart --></div>
    <div class="table" style="font-size: 0.6rem;"><!-- cramped table --></div>
    <div class="alerts" style="font-size: 0.6rem; color: red;">
      17 alerts! 3 critical! 8 warnings!
    </div>
  </div>
</div>`,
        explanation:
          'Extreme information density, tiny text, minimal spacing, and visual noise create severe processing disfluency. Users cannot parse the data, reducing trust in the information and the product itself.',
        principle:
          'Visual clutter is the enemy of fluency — it makes everything feel less credible and harder to use',
      },
      {
        title: 'Slow Loading Breaking Flow State',
        description:
          'E-commerce page with heavy assets and no loading optimization',
        code: `<!-- DON'T DO THIS -->
<div class="product-page">
  <!-- 8MB uncompressed hero image blocks rendering -->
  <img src="hero-8mb.png" style="width: 100%;">

  <!-- No skeleton, no progressive loading -->
  <!-- User sees blank white screen for 4+ seconds -->

  <!-- All content loads at once after full page download -->
  <h1>Product Name</h1>
  <p>Description that appears 4 seconds after click...</p>
  <button>Add to Cart</button>

  <!-- Heavy third-party scripts block interaction -->
  <script src="analytics.js"></script>
  <script src="chat-widget.js"></script>
  <script src="ab-testing.js"></script>
</div>`,
        explanation:
          'A 4-second blank screen completely destroys processing fluency. By the time content appears, users have already lost confidence. 53% of mobile users abandon pages that take over 3 seconds to load.',
        principle:
          'Every second of delay is a second of disfluency that erodes trust and increases abandonment',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Apple.com Product Pages',
        url: 'https://www.apple.com',
        description:
          'Apple\'s product pages are a masterclass in processing fluency: massive whitespace, high-contrast typography, minimal text, short sentences, smooth scroll animations, and fast performance. Every element is optimized for cognitive ease.',
        effectiveness: 'very-effective',
        analysis:
          'Apple\'s design philosophy is essentially applied fluency heuristic. The extreme simplicity and visual clarity make products feel premium, trustworthy, and desirable. Users process Apple\'s messaging with minimal cognitive effort, which translates directly to higher perceived product quality.',
      },
      {
        company: 'Medium',
        product: 'Reading Experience',
        url: 'https://medium.com',
        description:
          'Medium\'s reading experience is optimized for typographic fluency: ~680px content width, 21px font size, 1.58 line height, high contrast, serif body text, and zero distractions. The reading experience itself builds trust in the content.',
        effectiveness: 'very-effective',
        analysis:
          'Medium proved that optimizing for processing fluency (via typography and layout) makes content feel more authoritative and trustworthy. Writers on Medium are perceived as more credible partly because the reading experience is so fluent.',
      },
      {
        company: 'Google',
        product: 'Google Search',
        url: 'https://www.google.com',
        description:
          'Google Search\'s homepage is the ultimate fluency example: one input field, one action, near-zero cognitive load. The results page uses clean typography, consistent formatting, and instant loading to maintain fluency throughout the search experience.',
        effectiveness: 'very-effective',
        analysis:
          'Google\'s radical simplicity creates maximum processing fluency. Users trust Google results partly because the interface itself feels effortless and authoritative. The clean design signals competence and reliability.',
      },
      {
        company: 'Stripe',
        product: 'Developer Documentation',
        url: 'https://stripe.com/docs',
        description:
          'Stripe\'s documentation uses clean typography, syntax-highlighted code blocks, clear navigation, and excellent information architecture. Complex API concepts feel approachable because the presentation is so fluent.',
        effectiveness: 'very-effective',
        analysis:
          'Stripe demonstrates that fluency applies to technical content too. Their documentation\'s visual clarity makes Stripe\'s APIs feel simpler and better-designed than competitors, even when the underlying complexity is similar. Developers trust and prefer Stripe partly because the docs are fluent.',
      },
    ],

    abTests: [
      {
        title: 'Typography Fluency: Optimized vs Default',
        hypothesis:
          'Optimizing typography for processing fluency will increase trust metrics and conversion',
        controlVersion: {
          description:
            'Landing page with default typography: 14px system font, 1.2 line height, 100ch line width, 4.5:1 contrast ratio',
          metrics: {
            conversionRate: '3.2%',
            timeOnPage: '1:45',
            trustScore: '6.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Same content with optimized typography: 18px Inter, 1.6 line height, 65ch max width, 8:1 contrast ratio, clear heading hierarchy',
          metrics: {
            conversionRate: '4.9%',
            timeOnPage: '2:30',
            trustScore: '8.1/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Optimized typography increased conversion by 53% and trust scores by 31%. Users spent 43% more time on page, indicating deeper engagement rather than confusion. Post-test surveys revealed users found the treatment version "more professional" and "more believable" — despite identical content.',
          learnings: [
            'Typography fluency directly impacts perceived credibility of content',
            'Users could not articulate why they trusted one version more — the effect is unconscious',
            'Line length optimization (65ch vs 100ch) was the single biggest factor',
            'Effect was strongest for first-time visitors with no prior brand familiarity',
          ],
        },
      },
      {
        title: 'Page Speed: Instant vs 3-Second Load',
        hypothesis:
          'Faster page load will increase trust and conversion due to maintained processing fluency',
        controlVersion: {
          description:
            'Product page with 3.2 second load time, no skeleton loading, content appears all at once after delay',
          metrics: {
            conversionRate: '2.1%',
            bounceRate: '47%',
            trustScore: '5.8/10',
          },
        },
        treatmentVersion: {
          description:
            'Same product page optimized to 0.8 second load with skeleton screens, progressive content loading, instant interactivity',
          metrics: {
            conversionRate: '3.8%',
            bounceRate: '28%',
            trustScore: '7.9/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The fast-loading version increased conversion by 81% and reduced bounce rate by 40%. Trust scores improved by 36%. Users explicitly commented that the fast version "felt more reliable" and "seemed like a bigger company." Performance fluency directly translated to brand perception.',
          learnings: [
            'Page speed is a fluency signal — users unconsciously equate performance with competence',
            'Skeleton screens maintain fluency even during loading, preventing the "blank screen" disfluency',
            'The trust impact of speed was stronger than the trust impact of adding testimonials',
            'Mobile users were 2x more sensitive to speed-based fluency than desktop users',
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
        name: 'Typography Readability',
        description:
          'Text that is difficult to read due to low contrast, small size, decorative fonts, or poor line spacing',
        howToSpot:
          'Check contrast ratios (aim for 7:1+), font size (16px+ body), line height (1.5+), and line length (50-75ch)',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Visual Clutter and Density',
        description:
          'Interfaces with excessive information density, minimal whitespace, or competing visual elements',
        howToSpot:
          'Look for cramped layouts, tiny margins, overlapping content, or more than 3-4 distinct content blocks visible at once',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Layout Consistency',
        description:
          'Inconsistent spacing, alignment, or component patterns that force users to re-learn the interface',
        howToSpot:
          'Check for irregular spacing values, misaligned elements, or different button styles on the same page',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Loading Performance',
        description:
          'Slow page loads, missing skeleton screens, or content that shifts after loading',
        howToSpot:
          'Measure time to first contentful paint, look for layout shifts (CLS), check for blank loading states',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Language Complexity',
        description:
          'Jargon, long sentences, passive voice, or abstract language that increases cognitive processing effort',
        howToSpot:
          'Run readability analysis (aim for grade 8 or lower), check sentence length (under 20 words), look for unnecessary jargon',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Typographic Disfluency Pattern',
        description: 'Typography choices that reduce processing ease and undermine trust',
        indicators: [
          'Body text below 16px or with contrast ratio under 4.5:1',
          'Line height below 1.4 or line length exceeding 80 characters',
          'Decorative or unusual fonts for body text',
          'Inconsistent font sizes or weights without clear hierarchy',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Visual Noise Pattern',
        description: 'Excessive visual elements competing for attention and reducing processing ease',
        indicators: [
          'More than 5 distinct visual elements competing for attention above the fold',
          'Inconsistent spacing or alignment across components',
          'Multiple animation or movement sources on screen simultaneously',
          'Color palette with more than 5-6 distinct hues',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Performance Disfluency Pattern',
        description: 'Slow or janky interactions that break cognitive flow and reduce trust',
        indicators: [
          'Time to interactive exceeding 3 seconds',
          'Visible layout shifts after initial paint',
          'No loading indicators or skeleton screens',
          'Animations below 30fps or with visible jank',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Content Complexity Pattern',
        description: 'Language and content structure that increases cognitive processing effort',
        indicators: [
          'Average sentence length exceeding 25 words',
          'Heavy use of technical jargon without definitions',
          'Passive voice used in CTAs or key messaging',
          'Abstract or vague language where concrete terms would work',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can all body text be read comfortably without squinting or zooming?',
      'Does the text-to-background contrast ratio meet or exceed 7:1?',
      'Is the body font size at least 16px with line height of 1.5 or greater?',
      'Are line lengths between 50-75 characters for body text?',
      'Is there sufficient whitespace between content sections?',
      'Does the page load and become interactive within 2 seconds?',
      'Are skeleton screens or loading indicators used during data fetching?',
      'Is the language clear, concrete, and free of unnecessary jargon?',
      'Are design patterns consistent across the entire interface?',
      'Would a first-time user understand the page purpose within 3 seconds?',
      'Are there any layout shifts after the page loads?',
      'Does the visual hierarchy guide the eye naturally without confusion?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the fluency heuristic and processing ease.

Analyze the provided design for processing fluency patterns. Identify:

1. **Typographic Fluency**: Font readability, contrast ratio, line length, line height, font choice
2. **Visual Fluency**: Layout clarity, whitespace usage, visual hierarchy, consistency
3. **Performance Fluency**: Load speed, skeleton loading, animation smoothness, responsiveness
4. **Content Fluency**: Language clarity, sentence length, jargon level, concreteness
5. **Interaction Fluency**: Feedback immediacy, navigation predictability, flow smoothness

For each area assessed:
- Rate the current processing fluency (1-10)
- Identify specific disfluency sources (what makes it hard to process)
- Assess impact on user trust and credibility perception
- Determine if disfluency is intentional (strategic friction) or unintentional
- Suggest specific improvements with expected fluency improvement

Consider:
- Is the design optimized for cognitive ease across all touchpoints?
- Are there areas where disfluency is appropriate (warnings, confirmations)?
- Does the typography meet readability best practices?
- Is the visual complexity appropriate for the content?
- Would reducing cognitive load increase user trust?

Provide actionable recommendations for maximizing beneficial processing fluency.`,

    outputSchema: {
      type: 'object',
      properties: {
        fluencyAssessment: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              area: { type: 'string' },
              score: { type: 'number' },
              disfluencySources: { type: 'array', items: { type: 'string' } },
              trustImpact: { type: 'string' },
              intentional: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'area',
              'score',
              'disfluencySources',
              'trustImpact',
              'intentional',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            typographicFluency: { type: 'number' },
            visualFluency: { type: 'number' },
            performanceFluency: { type: 'number' },
            contentFluency: { type: 'number' },
          },
          required: [
            'typographicFluency',
            'visualFluency',
            'performanceFluency',
            'contentFluency',
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
        'fluencyAssessment',
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
        title: 'Audit Typography for Readability',
        description:
          'Evaluate all text on the page for processing fluency: contrast, size, line height, line length, and font choice',
        example:
          'Run a contrast checker on all text. Ensure body text is 16px+, line height 1.5+, max width 65ch, contrast 7:1+',
        tips: [
          'Use tools like WebAIM Contrast Checker or axe DevTools',
          'Test at actual screen distance, not zoomed in',
          'Check both light and dark mode variants',
        ],
      },
      {
        step: 2,
        title: 'Reduce Visual Complexity',
        description:
          'Simplify layouts by removing unnecessary elements, increasing whitespace, and establishing clear visual hierarchy',
        example:
          'Remove decorative elements that don\'t serve content. Increase padding from 8px to 24px between sections. Limit above-the-fold content to 3 focal points.',
        tips: [
          'Apply the "squint test" — if you squint at the page, is the hierarchy clear?',
          'Remove any element that doesn\'t directly serve user goals',
          'When in doubt, add more whitespace',
        ],
      },
      {
        step: 3,
        title: 'Optimize Performance',
        description:
          'Ensure pages load fast with progressive rendering to maintain cognitive flow',
        example:
          'Implement skeleton screens, lazy-load images below the fold, inline critical CSS, target LCP under 1.5 seconds',
        tips: [
          'Measure with Lighthouse and Web Vitals',
          'Skeleton screens are better than spinners for maintaining fluency',
          'Prioritize above-the-fold content loading',
        ],
      },
      {
        step: 4,
        title: 'Simplify Language',
        description:
          'Rewrite all copy for maximum clarity and minimum cognitive load',
        example:
          'Replace "Leverage our paradigm-shifting solution" with "Get more done, faster." Aim for grade 8 reading level.',
        tips: [
          'Use the Hemingway Editor to check readability',
          'Prefer short sentences (under 20 words)',
          'Use concrete language and active voice',
        ],
      },
      {
        step: 5,
        title: 'Ensure Design Consistency',
        description:
          'Apply consistent patterns across the entire product so users build familiarity fluency',
        example:
          'Use a design system with defined spacing scale, consistent button styles, and predictable navigation patterns on every page',
        tips: [
          'Consistency builds familiarity, and familiarity is fluency',
          'Use design tokens to enforce consistent spacing and color',
          'Audit for pattern inconsistencies across pages quarterly',
        ],
      },
    ],

    dos: [
      'Use high-contrast, well-sized typography as the foundation of trust',
      'Maximize whitespace to give content room to breathe',
      'Optimize page load speed — every millisecond of delay is disfluency',
      'Write in clear, concrete, jargon-free language',
      'Use skeleton screens and progressive loading to maintain flow',
      'Maintain consistent design patterns across the entire product',
      'Test readability with real users, not just contrast checkers',
      'Use familiar layouts and navigation patterns that leverage learned fluency',
    ],

    donts: [
      'Don\'t use decorative or unusual fonts for body text',
      'Don\'t sacrifice readability for visual aesthetics',
      'Don\'t cram information — visual clutter destroys fluency and trust',
      'Don\'t accept slow load times as a design constraint — fix them',
      'Don\'t use jargon when plain language works',
      'Don\'t create inconsistent patterns across pages',
      'Don\'t use fluency to make dangerous actions feel too easy — add intentional friction where needed',
      'Don\'t rely on fluency to make misleading content seem credible',
    ],

    bestPractices: [
      {
        title: 'Optimize the Typography Trifecta',
        description:
          'Ensure optimal font size (16px+ body), line height (1.5-1.6), and line length (50-75ch) on every text block',
        rationale:
          'These three factors account for the majority of typographic fluency. Getting them right is the single highest-impact change.',
        example:
          'body { font-size: 1.125rem; line-height: 1.6; max-width: 65ch; }',
      },
      {
        title: 'Use the 3-Second Rule',
        description:
          'A new visitor should understand the page purpose within 3 seconds of landing',
        rationale:
          'If users can\'t quickly process what a page is about, disfluency triggers skepticism and abandonment',
        example:
          'Test with 5-second usability tests: show page for 3 seconds, ask what it does. If users can\'t answer, simplify.',
      },
      {
        title: 'Treat Performance as Design',
        description:
          'Include load time and interaction speed in your design specifications, not just visual specs',
        rationale:
          'A beautiful design that loads in 5 seconds is less fluent (and less trusted) than a simple design that loads in 0.5 seconds',
        example:
          'Add to design specs: "Hero section must be interactive within 1.5s. Use skeleton loading for all async content."',
      },
      {
        title: 'Apply Strategic Disfluency',
        description:
          'Deliberately introduce processing friction for irreversible or high-stakes actions',
        rationale:
          'Fluency should be the default, but some moments benefit from the user slowing down and thinking carefully',
        example:
          'Require users to type "DELETE" to confirm account deletion, rather than a simple button click',
      },
      {
        title: 'Build Fluency Through Familiarity',
        description:
          'Use established design conventions and consistent patterns to leverage users\' existing mental models',
        rationale:
          'Familiar patterns are processed more fluently because users don\'t need to learn new interactions',
        example:
          'Use standard navigation placement (top or left), standard icon meanings (hamburger = menu, X = close), and consistent CTA styling',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast (Minimum) - Text must have at least 4.5:1 contrast ratio, large text 3:1',
        implementation:
          'Use contrast checking tools for all text. Aim for 7:1+ for body text to maximize fluency for all users including those with low vision.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.12',
        guideline:
          'Text Spacing - Users must be able to adjust line height, letter spacing, word spacing, and paragraph spacing without loss of content',
        implementation:
          'Use relative units (rem, em) for typography. Don\'t clip content when users override spacing. This ensures fluency is achievable for users who need customized reading settings.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.4',
        guideline:
          'Resize Text - Text must be resizable up to 200% without loss of functionality',
        implementation:
          'Use responsive typography that scales with user zoom. Don\'t use fixed pixel sizes. Ensure layouts reflow cleanly at larger text sizes.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - No content flashes more than 3 times per second',
        implementation:
          'Ensure animations and transitions are smooth and subtle. Janky or flashing elements destroy processing fluency and can cause seizures.',
      },
    ],

    ethics: [
      {
        concern: 'Fluency-Washing Deception',
        severity: 'critical',
        explanation:
          'Using professional, fluent design to make false or misleading claims seem credible',
        mitigation:
          'Ensure content accuracy matches presentation quality. Clean design should present truthful information, not dress up deception.',
      },
      {
        concern: 'Excessive Ease for Harmful Actions',
        severity: 'high',
        explanation:
          'Making harmful or irreversible actions too fluent so users complete them without thinking',
        mitigation:
          'Introduce intentional friction (confirmation steps, typing to confirm) for high-stakes or irreversible actions. Fluency should serve users, not exploit them.',
      },
      {
        concern: 'Exploiting Trust Through Fluency',
        severity: 'high',
        explanation:
          'Using processing fluency to build unwarranted trust for low-quality products or services',
        mitigation:
          'Ensure that the product or service quality matches the trust signals created by fluent design. Don\'t use design quality as a substitute for product quality.',
      },
      {
        concern: 'Accessibility as Fluency Obligation',
        severity: 'critical',
        explanation:
          'If fluency drives trust, then inaccessible design systematically excludes disabled users from experiencing trust and credibility',
        mitigation:
          'Treat accessibility as a fluency requirement, not an afterthought. If your design is only fluent for sighted mouse users, you\'re creating a trust gap for everyone else.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Processing Fluency and Aesthetic Pleasure: Is Beauty in the Perceiver\'s Processing Experience?',
        author: 'Reber, R., Schwarz, N., & Winkielman, P.',
        year: 2004,
        doi: '10.1207/s15327957pspr0804_3',
        description:
          'Foundational paper establishing that processing fluency drives aesthetic judgments and perceived truth',
        type: 'foundational',
      },
      {
        title: 'Unraveling the Taste for the Unknown: A Meta-Analysis on the Effect of Processing Fluency on Preference',
        author: 'Alter, A. L., & Oppenheimer, D. M.',
        year: 2009,
        doi: '10.1037/a0014919',
        description:
          'Comprehensive meta-analysis of fluency effects across multiple domains including truth judgments, preference, and confidence',
        type: 'foundational',
      },
      {
        title: 'If It\'s Hard to Read, It\'s Hard to Do: Processing Fluency Affects Effort Prediction and Motivation',
        author: 'Song, H., & Schwarz, N.',
        year: 2008,
        doi: '10.1111/j.1467-9280.2008.02189.x',
        description:
          'Demonstrates that disfluent instructions make tasks seem harder and reduce motivation to attempt them',
        type: 'advanced',
      },
      {
        title: 'Metacognitive Experiences and the Intricacies of Setting People Straight',
        author: 'Schwarz, N., Sanna, L. J., Skurnik, I., & Yoon, C.',
        year: 2007,
        description:
          'Explores how fluency affects truth perception and the difficulty of correcting fluency-based misjudgments',
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
          'Chapter on cognitive ease covers fluency heuristic as a core mechanism of System 1 thinking',
        type: 'foundational',
      },
      {
        title: 'Drunk Tank Pink',
        author: 'Alter, Adam',
        year: 2013,
        isbn: '9780143124573',
        description:
          'Extensive coverage of how fluency and disfluency affect decision-making, including the stock ticker name study',
        type: 'practical',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'The classic UX book that is essentially an applied guide to processing fluency in web design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Role of Processing Fluency in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/fluency/',
        description:
          'Practical guide to applying fluency heuristic principles in user experience design',
        type: 'practical',
      },
      {
        title: 'The Aesthetics-Usability Effect',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/the-aesthetics-usability-effect',
        description:
          'Explores how visual fluency and aesthetics directly impact perceived usability',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Cognitive Fluency: How Design Affects Trust',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/processing-fluency',
        description:
          'Overview of how processing fluency shapes judgments of truth, trust, and preference',
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
