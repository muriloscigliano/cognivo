/**
 * ATTRIBUTE SUBSTITUTION
 *
 * When facing a complex question, people unconsciously substitute
 * an easier related question and answer that instead.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const attributeSubstitution: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'attribute-substitution',
    name: 'Attribute Substitution',
    aliases: ['Substitution Heuristic', 'Target Attribute Replacement'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'decision-making',
      'judgment',
      'heuristic',
      'proxy-metric',
      'simplification',
      'evaluation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'When facing a complex question, people unconsciously substitute an easier related question and answer that instead.',

    detailed: `Attribute substitution is a cognitive bias in which a person must make a judgment about a complex, computationally difficult target attribute and instead unconsciously substitutes a more easily calculated heuristic attribute. The person is unaware that a substitution has occurred and believes they have answered the original, harder question.

For example, when asked "How happy are you with your life overall?" people often substitute the easier question "What is my mood right now?" The complex target attribute (life satisfaction) is replaced by a simpler heuristic attribute (current mood).

In UX and product design, attribute substitution is pervasive. Users routinely judge product quality by visual design, assess trustworthiness by page load speed, and evaluate feature completeness by interface polish. Designers who understand this bias can ensure that the proxy attributes users actually evaluate align with the real qualities they want to convey.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman and Shane Frederick',
      year: 2002,
      theory: 'Attribute Substitution Model (System 1 / System 2 Framework)',
      mechanism: `When System 2 (deliberate reasoning) faces a difficult target question, System 1 (intuitive thinking) automatically generates a candidate answer to a simpler, related heuristic question. This substitution happens because:

1. **Accessibility**: The heuristic attribute is more readily available in the mind than the target attribute
2. **Cross-Dimensional Mapping**: The brain maps one attribute's value onto another attribute's scale without conscious awareness
3. **Effort Reduction**: Evaluating the target attribute requires cognitive effort the brain is unwilling or unable to invest
4. **Affect Heuristic**: Emotional reactions to one attribute bleed into judgments about an unrelated attribute
5. **Unawareness**: The substitution is invisible to the person — they believe they answered the original question

The mechanism operates automatically: the simpler attribute comes to mind first, and unless System 2 detects and overrides the substitution, the heuristic answer becomes the final judgment.`,
    },

    realWorldExample: `Kahneman and Frederick (2002) demonstrated that when people are asked "How much would you pay to save migrating birds from drowning in oil ponds?" their answers correlate strongly with their emotional reaction to the image of a bird soaked in oil — not with the actual number of birds saved. The emotional response (heuristic attribute) substitutes for a rational cost-benefit analysis (target attribute). Participants felt they had carefully considered the question, unaware they had answered "How upset does this image make me?" instead.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Attribute substitution affects how users evaluate every aspect of a product. Users unconsciously replace difficult judgments (Is this product reliable? Is this service trustworthy?) with easier proxy judgments (Does it look professional? Does it load fast?). Designers can leverage this to:

- Ensure visual quality signals true product quality
- Align proxy metrics (speed, polish, aesthetics) with real value
- Simplify complex decisions by surfacing appropriate heuristic cues
- Reduce cognitive load by making the "right" proxy attributes salient
- Avoid misleading users when proxies don't reflect reality`,

    whenToUse: [
      {
        title: 'Simplifying Complex Decisions',
        scenario:
          'When users face multi-dimensional choices with many variables',
        example:
          'In a hosting provider comparison, surface a single "performance score" as a proxy for a complex mix of uptime, latency, throughput, and support quality',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Proxy Metrics in Dashboards',
        scenario:
          'When displaying complex system health or performance data',
        example:
          'Show a single "health score" badge (green/yellow/red) that substitutes for dozens of underlying metrics users cannot evaluate individually',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Satisfaction Surveys and Feedback',
        scenario:
          'When gathering user opinions on complex, multi-faceted experiences',
        example:
          'Break satisfaction surveys into specific attributes (speed, ease, design) rather than asking one overall question users will substitute with their most recent emotion',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Evaluation and Comparison',
        scenario:
          'When users need to compare products with many features',
        example:
          'Highlight the 2-3 attributes users actually evaluate (price, speed, design) and ensure they accurately represent overall value',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Trust and Credibility Signals',
        scenario:
          'When establishing trustworthiness for a product or service',
        example:
          'Invest in visual polish, fast load times, and professional typography — users substitute these for the harder question of "Is this company legitimate?"',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Safety-Critical Decisions',
        reason:
          'Allowing users to substitute a proxy for genuine safety evaluation can lead to harm',
        consequence:
          'Users might judge a medical app as trustworthy because it looks polished, ignoring actual clinical validation',
        alternative:
          'Force deliberate evaluation by surfacing credentials, certifications, and evidence prominently',
      },
      {
        title: 'Financial Product Selection',
        reason:
          'Users may judge investment quality by brand aesthetics instead of actual returns and risk',
        consequence:
          'Poor financial decisions driven by visual polish rather than fundamentals',
        alternative:
          'Present standardized comparison frameworks that force attention to key financial metrics',
      },
      {
        title: 'Hiding Genuine Quality Issues',
        reason:
          'Using strong proxy signals (beautiful UI) to mask real deficiencies (buggy functionality) is deceptive',
        consequence:
          'Short-term positive impressions collapse into distrust when reality surfaces',
        alternative:
          'Ensure proxy attributes genuinely correlate with underlying quality',
      },
      {
        title: 'Complex Technical Decisions',
        reason:
          'Experts need to evaluate target attributes directly, not through simplified proxies',
        consequence:
          'Engineers or developers may make poor technical choices based on surface-level impressions',
        alternative:
          'Provide detailed technical specifications alongside summary indicators for expert audiences',
      },
    ],

    commonMistakes: [
      {
        title: 'Polishing the Proxy, Neglecting the Product',
        description:
          'Investing heavily in visual design while core functionality is broken or unreliable',
        why: 'Beautiful UI creates positive first impressions, but users eventually discover the real product quality',
        fix: 'Ensure the proxy attributes you optimize (design, speed) actually correlate with real product quality',
      },
      {
        title: 'Assuming Users Evaluate What You Intend',
        description:
          'Designing detailed feature comparison tables when users actually judge by screenshots and speed',
        why: 'Users substitute the complex evaluation you designed with a simpler one you did not anticipate',
        fix: 'Research which proxy attributes your users actually rely on, then align your design accordingly',
      },
      {
        title: 'Ignoring Proxy Mismatch',
        description:
          'A fast-loading but low-quality product creates false trust; a slow-loading but excellent product creates false distrust',
        why: 'When proxy attributes diverge from real quality, users form inaccurate judgments',
        fix: 'Audit which proxies users rely on and ensure they track real quality as closely as possible',
      },
      {
        title: 'Over-Simplifying Complex Evaluations',
        description:
          'Reducing a multi-dimensional quality assessment to a single star rating without context',
        why: 'A single proxy may not capture the dimensions that matter most to each user',
        fix: 'Provide breakdown dimensions alongside summary scores so users can go deeper when needed',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines which attributes are most accessible for substitution',
        examples: [
          'Hero sections with polished visuals substitute for overall product quality judgment',
          'Above-the-fold content becomes the proxy for the entire page',
          'Visual density and whitespace serve as proxies for professionalism',
          'Layout quality is substituted for organizational competence',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography quality is frequently substituted for content quality and credibility',
        examples: [
          'Professional typefaces are used as proxy for content trustworthiness',
          'Poor kerning or inconsistent fonts signal low product quality',
          'Readable text is substituted for well-reasoned content',
          'Typography hierarchy signals organizational clarity',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color palette serves as a proxy for brand maturity and product category',
        examples: [
          'Blue tones substitute for trustworthiness and security',
          'Vibrant palettes substitute for innovation and energy',
          'Muted, neutral palettes substitute for luxury and sophistication',
          'Color consistency is used as proxy for attention to detail',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction quality is the dominant proxy for overall product quality',
        examples: [
          'Page load speed is substituted for product reliability and infrastructure quality',
          'Smooth animations substitute for engineering quality',
          'Responsive interactions substitute for product maturity',
          'Error handling quality substitutes for overall system robustness',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content quality and tone become proxies for product and company quality',
        examples: [
          'Clear, well-written copy substitutes for product reliability',
          'Typos and grammar errors substitute for carelessness across the product',
          'Documentation quality substitutes for engineering quality',
          'Tone of microcopy substitutes for company culture and values',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility quality serves as a proxy for how much a company cares about its users',
        examples: [
          'Screen reader support substitutes for overall product inclusivity',
          'Keyboard navigation quality substitutes for engineering thoughtfulness',
          'Alt text quality substitutes for content care and attention to detail',
          'Color contrast compliance substitutes for overall design rigor',
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
        title: 'Aligning Visual Quality with Product Quality',
        description:
          'SaaS dashboard that invests equally in visual polish and functional reliability',
        code: `<div class="dashboard-overview">
  <header class="dashboard-header">
    <h1>System Health</h1>
    <div class="health-indicator" aria-label="System health: excellent">
      <span class="health-dot green"></span>
      <span class="health-label">All Systems Operational</span>
    </div>
  </header>

  <div class="metrics-grid">
    <div class="metric-card">
      <span class="metric-value">99.97%</span>
      <span class="metric-label">Uptime (30 days)</span>
      <span class="metric-detail">Target: 99.9%</span>
    </div>
    <div class="metric-card">
      <span class="metric-value">142ms</span>
      <span class="metric-label">Avg Response Time</span>
      <span class="metric-detail">p95: 280ms</span>
    </div>
  </div>

  <details class="detailed-breakdown">
    <summary>View Detailed Metrics</summary>
    <!-- Full breakdown for users who want target attributes -->
  </details>
</div>`,
        explanation:
          'The health indicator and summary metrics serve as legitimate proxy attributes. The detailed breakdown is available for users who want to evaluate target attributes directly. Visual polish matches actual system quality.',
        principle:
          'Provide accurate proxy summaries with easy access to underlying target attributes',
        metrics: {
          before: '38% of users said they "trust" the system (text-only status page)',
          after: '71% of users said they "trust" the system (polished dashboard with detail access)',
          improvement: '87% increase in perceived trustworthiness with aligned proxies',
        },
      },
      {
        title: 'Multi-Attribute Satisfaction Survey',
        description:
          'Survey that prevents single-proxy substitution by breaking down evaluation dimensions',
        code: `<form class="satisfaction-survey">
  <h3>How was your experience?</h3>
  <p class="survey-intro">Rate each aspect separately:</p>

  <div class="rating-dimension">
    <label>Speed & Performance</label>
    <div class="star-rating" role="radiogroup" aria-label="Speed rating">
      <input type="radio" name="speed" value="1" aria-label="1 star">
      <input type="radio" name="speed" value="2" aria-label="2 stars">
      <input type="radio" name="speed" value="3" aria-label="3 stars">
      <input type="radio" name="speed" value="4" aria-label="4 stars">
      <input type="radio" name="speed" value="5" aria-label="5 stars">
    </div>
  </div>

  <div class="rating-dimension">
    <label>Ease of Use</label>
    <div class="star-rating" role="radiogroup" aria-label="Ease rating">
      <!-- star inputs -->
    </div>
  </div>

  <div class="rating-dimension">
    <label>Feature Completeness</label>
    <div class="star-rating" role="radiogroup" aria-label="Features rating">
      <!-- star inputs -->
    </div>
  </div>

  <div class="rating-dimension">
    <label>Visual Design</label>
    <div class="star-rating" role="radiogroup" aria-label="Design rating">
      <!-- star inputs -->
    </div>
  </div>
</form>`,
        explanation:
          'By breaking evaluation into distinct dimensions, the survey forces users to consider each attribute separately instead of substituting a single proxy (usually current mood or most recent interaction) for all of them.',
        principle:
          'Decompose complex evaluations to reduce unintended attribute substitution',
      },
      {
        title: 'Product Comparison with Proxy Awareness',
        description:
          'Comparison page that surfaces both proxy and target attributes',
        code: `<table class="product-comparison">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Product A</th>
      <th>Product B</th>
    </tr>
  </thead>
  <tbody>
    <tr class="proxy-row" aria-label="Quick comparison attribute">
      <td>Overall Score</td>
      <td><span class="score high">4.7/5</span></td>
      <td><span class="score medium">4.2/5</span></td>
    </tr>
    <tr class="detail-row">
      <td>Reliability (uptime %)</td>
      <td>99.5%</td>
      <td>99.9%</td>
    </tr>
    <tr class="detail-row">
      <td>Data Security (certifications)</td>
      <td>SOC 2</td>
      <td>SOC 2, ISO 27001, HIPAA</td>
    </tr>
    <tr class="detail-row">
      <td>Support Response Time</td>
      <td>2 hours</td>
      <td>15 minutes</td>
    </tr>
  </tbody>
</table>
<p class="comparison-note">
  Overall Score reflects user ratings, which may not capture
  all technical attributes. Review detailed metrics below.
</p>`,
        explanation:
          'The comparison acknowledges that the "Overall Score" is a proxy (user ratings) and surfaces the target attributes (reliability, security, support) so users can evaluate them directly if they choose.',
        principle:
          'Label proxies as proxies and provide access to underlying target attributes',
      },
    ],

    bad: [
      {
        title: 'Beautiful UI Masking Broken Functionality',
        description:
          'App with stunning visuals but unreliable core features',
        code: `<!-- DON'T DO THIS -->
<div class="gorgeous-dashboard">
  <div class="hero-animation">
    <!-- Lottie animation, parallax, gradient mesh -->
    <h1 class="fancy-title">Your AI-Powered Analytics</h1>
  </div>
  <div class="metrics-display">
    <!-- Beautiful charts that show stale data from 3 hours ago -->
    <div class="chart shimmer-effect">
      <p class="small-print">Data may be delayed</p>
    </div>
  </div>
  <!-- Gorgeous but: APIs timeout 30% of the time,
       exports fail silently, data is often wrong -->
</div>`,
        explanation:
          'Users substitute visual quality for product quality. The beautiful animations create a false sense of reliability, but the underlying data is stale and unreliable. When users eventually discover the truth, trust is destroyed.',
        principle:
          'Never use visual polish as a substitute for functional quality — align proxy and target',
      },
      {
        title: 'Star Ratings Without Context',
        description:
          'Using a single aggregate rating as the sole evaluation metric',
        code: `<!-- DON'T DO THIS -->
<div class="product-card">
  <h3>CloudSync Pro</h3>
  <div class="rating">
    <span class="stars">★★★★☆</span>
    <span class="count">(4.2 from 12,847 reviews)</span>
  </div>
  <button class="buy-now">Start Free Trial</button>
  <!-- No breakdown of what the 4.2 represents:
       Speed: 4.8, Reliability: 2.1, Support: 3.7, Features: 4.5
       The 2.1 reliability is hidden inside the aggregate -->
</div>`,
        explanation:
          'The single star rating becomes a proxy for overall quality, hiding critical weaknesses. Users substitute "4.2 stars" for a complex evaluation of speed, reliability, support, and features. The poor reliability score is invisible.',
        principle:
          'Aggregate scores hide critical attribute differences — always show breakdowns',
      },
      {
        title: 'Speed-Washing a Low-Quality Product',
        description:
          'Optimizing page speed to create false trust while content quality is poor',
        code: `<!-- DON'T DO THIS -->
<div class="landing-page">
  <!-- Sub-100ms load time, aggressive caching, skeleton screens -->
  <!-- But: content is AI-generated nonsense, links are broken,
       pricing is misleading, support email bounces -->
  <h1>Enterprise-Grade Solutions</h1>
  <p>Trusted by thousands of businesses worldwide</p>
  <!-- No actual enterprise customers -->
</div>`,
        explanation:
          'Fast load times create a strong proxy signal for "this is a well-run company." Users substitute page speed for organizational competence. The speed masks fundamental quality problems.',
        principle:
          'Fast loading creates trust — do not exploit this proxy to mask real deficiencies',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'App Store',
        description:
          'Users routinely judge app quality by icon design, screenshot polish, and app size rather than actual functionality. The App Store reinforces this by making visual elements the dominant first impression, with detailed descriptions and reviews requiring scrolling.',
        effectiveness: 'effective',
        analysis:
          'Apple leans into attribute substitution by enforcing strict visual guidelines for app listings. Well-designed icons and screenshots serve as legitimate proxies because Apple also enforces quality standards — aligning the proxy with the target attribute.',
      },
      {
        company: 'Google',
        product: 'PageSpeed as Ranking Factor',
        description:
          'Google uses page load speed as a ranking signal, codifying the common user substitution of "fast site = quality site." By making speed matter for SEO, Google incentivizes the proxy attribute and ensures it correlates more strongly with content quality.',
        effectiveness: 'very-effective',
        analysis:
          'By elevating page speed from an unconscious proxy to an explicit ranking factor, Google aligned incentives. Sites that invest in speed tend to invest in quality overall, making the substitution more accurate.',
      },
      {
        company: 'Twitter/X',
        product: 'Follower Count as Expertise Proxy',
        description:
          'Users substitute follower count for expertise, treating high-follower accounts as authoritative regardless of actual credentials. The platform amplifies this by prominently displaying follower count and using it for verification and reach.',
        effectiveness: 'effective',
        analysis:
          'Follower count is a poor proxy for expertise — many high-follower accounts lack domain knowledge, while genuine experts may have small followings. The substitution leads to misinformation spread when users trust popular accounts over qualified sources.',
      },
      {
        company: 'Airbnb',
        product: 'Listing Photography',
        description:
          'Airbnb offers professional photography for listings because users substitute photo quality for accommodation quality. Listings with professional photos receive dramatically more bookings even when the actual property is identical.',
        effectiveness: 'very-effective',
        analysis:
          'Airbnb recognized that photo quality was the dominant proxy attribute for booking decisions. By providing professional photography, they aligned the proxy with reality (ensuring photos are accurate) while leveraging the substitution effect.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard Design: Polished vs Functional-First',
        hypothesis:
          'A visually polished dashboard will receive higher user satisfaction ratings even with identical data accuracy',
        controlVersion: {
          description:
            'Functional dashboard with accurate data, basic styling, system fonts, minimal visual hierarchy',
          metrics: {
            conversionRate: '3.1%',
            timeOnPage: '2:15',
            scrollDepth: '40%',
          },
        },
        treatmentVersion: {
          description:
            'Same accurate data presented with custom typography, smooth transitions, refined color palette, and clear visual hierarchy',
          metrics: {
            conversionRate: '5.9%',
            timeOnPage: '4:42',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Users rated the polished version as "more accurate" and "more trustworthy" despite identical data. Visual quality substituted for data quality in user judgment. Satisfaction scores were 44% higher across all dimensions, including data reliability — which was objectively identical.',
          learnings: [
            'Visual quality is the dominant proxy attribute for product quality judgments',
            'Users rated identical data as "more accurate" when presented with better design',
            'The substitution effect persisted even when users were told data was the same',
            'Investment in visual design has outsized impact on perceived quality',
          ],
        },
      },
      {
        title: 'Product Ratings: Single Score vs Multi-Attribute Breakdown',
        hypothesis:
          'Multi-attribute rating breakdowns lead to more informed purchase decisions and fewer returns',
        controlVersion: {
          description:
            'Product page showing only aggregate 4.3-star rating and total review count',
          metrics: {
            conversionRate: '7.8%',
            clickThroughRate: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing aggregate rating plus breakdown: Performance (4.8), Reliability (3.1), Ease of Use (4.6), Value (4.5)',
          metrics: {
            conversionRate: '6.2%',
            clickThroughRate: '31%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While conversion rate dropped 20%, return rate dropped 45% and customer satisfaction increased 32%. Users who saw the reliability breakdown either accepted the trade-off or chose alternatives. The single aggregate score had been hiding a critical weakness.',
          learnings: [
            'Single aggregate scores enable attribute substitution that hides weaknesses',
            'Multi-attribute breakdowns reduce substitution and improve decision quality',
            'Lower conversion + lower returns = higher net value for business and user',
            'Transparency about proxy vs target attributes builds long-term trust',
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
        name: 'Visual-Quality-as-Proxy',
        description:
          'Disproportionate investment in visual polish relative to functional quality',
        howToSpot:
          'Compare time and resources spent on visual design vs core functionality, reliability, and performance',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single-Score Summaries',
        description:
          'Complex, multi-dimensional qualities collapsed into a single number or indicator',
        howToSpot:
          'Look for aggregate star ratings, health scores, or letter grades without accessible breakdowns',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Speed-as-Trust Signals',
        description:
          'Page load speed or animation smoothness positioned as indicators of overall product quality',
        howToSpot:
          'Check if fast interactions mask underlying issues like stale data, unreliable APIs, or poor support',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Social-Count-as-Authority',
        description:
          'Follower counts, download numbers, or review counts used as expertise or quality proxies',
        howToSpot:
          'Look for prominent display of social metrics without corresponding quality evidence',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Photo-Quality-as-Product-Quality',
        description:
          'Professional photography or video creating quality expectations that may not match reality',
        howToSpot:
          'Compare visual presentation quality to actual product or service experience',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Proxy Dominance Pattern',
        description:
          'A single easily-evaluated attribute dominates the interface, becoming the de facto evaluation criterion',
        indicators: [
          'Star ratings shown without breakdown',
          'Download or follower counts prominently displayed',
          'Speed or performance metrics as primary value proposition',
          'Visual design quality far exceeding functional quality',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Hidden Target Attribute Pattern',
        description:
          'The attributes users should evaluate are buried or require deliberate effort to access',
        indicators: [
          'Security certifications in footer only',
          'Reliability data behind "Learn More" links',
          'Support quality metrics not shown at all',
          'Data accuracy or freshness not surfaced',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Aesthetic Override Pattern',
        description:
          'Visual aesthetics are so dominant that they override rational evaluation of other attributes',
        indicators: [
          'Heavy animation and visual effects on landing pages',
          'Minimal substantive content alongside maximum visual impact',
          'User testimonials about how "beautiful" the product is rather than how well it works',
          'Design awards prominently displayed while reliability metrics are absent',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Metric Conflation Pattern',
        description:
          'Different quality dimensions are collapsed into a single number, obscuring trade-offs',
        indicators: [
          'Single "score" combining speed, reliability, features, and support',
          'NPS used as sole proxy for product quality',
          'App store rating as only quality signal',
          'Customer count as proxy for product value',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What attribute are users actually evaluating vs what they think they are evaluating?',
      'Which proxy attributes dominate first impressions of this design?',
      'Do the proxy attributes (speed, visual quality, social proof) accurately reflect target attributes (reliability, value, expertise)?',
      'Are complex quality dimensions collapsed into oversimplified single metrics?',
      'Can users access detailed breakdowns of aggregate scores or ratings?',
      'Is visual polish masking functional deficiencies?',
      'Are social metrics (follower counts, download numbers) used as quality proxies?',
      'Would a user who evaluated only the proxy attributes reach the same conclusion as one who evaluated target attributes?',
      'Have we tested which attributes users actually use when making decisions in this interface?',
      'Are there proxy-target mismatches that could mislead users?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in attribute substitution.

Analyze the provided design for attribute substitution patterns. Identify:

1. **Proxy Attributes**: What easily-evaluated attributes are present (visual quality, speed, social metrics)?
2. **Target Attributes**: What complex attributes should users be evaluating (reliability, security, value)?
3. **Substitution Points**: Where are users likely substituting proxy for target?
4. **Alignment**: Do proxy attributes accurately represent target attributes?
5. **Missing Targets**: Are important target attributes hidden or inaccessible?

For each substitution pattern found:
- Identify the proxy attribute and target attribute
- Assess whether the substitution leads to accurate or misleading judgments
- Determine if the design encourages or mitigates harmful substitution
- Evaluate whether users can access target attributes when needed
- Suggest improvements for proxy-target alignment

Consider:
- Is visual quality being substituted for functional quality?
- Are aggregate scores hiding important attribute breakdowns?
- Do speed and performance proxy for reliability accurately?
- Are social metrics being used as authority or quality signals?
- Can users easily switch from proxy to target evaluation?

Provide actionable recommendations for aligning proxy attributes with target attributes.`,

    outputSchema: {
      type: 'object',
      properties: {
        substitutionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              proxyAttribute: { type: 'string' },
              targetAttribute: { type: 'string' },
              location: { type: 'string' },
              alignmentScore: { type: 'number' },
              misleadingRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'proxyAttribute',
              'targetAttribute',
              'location',
              'alignmentScore',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            proxyTargetAlignment: { type: 'number' },
            targetAccessibility: { type: 'number' },
            misleadingRisk: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'proxyTargetAlignment',
            'targetAccessibility',
            'misleadingRisk',
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
        'substitutionPatterns',
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
        title: 'Map Proxy and Target Attributes',
        description:
          'Identify which attributes users actually evaluate (proxies) vs which attributes matter most (targets)',
        example:
          'Users judge your API product by documentation quality (proxy), but care most about reliability and uptime (targets)',
        tips: [
          'Interview users to discover which attributes drive their decisions',
          'Compare user-stated evaluation criteria with observed behavior',
          'List all proxy attributes visible in your interface',
        ],
      },
      {
        step: 2,
        title: 'Audit Proxy-Target Alignment',
        description:
          'Assess whether the proxy attributes users evaluate accurately represent the target attributes they care about',
        example:
          'If your docs are excellent but your API has 95% uptime, the proxy (docs quality) is misleading about the target (reliability)',
        tips: [
          'Rate alignment on a 1-10 scale for each proxy-target pair',
          'Identify dangerous misalignments where proxies hide weaknesses',
          'Prioritize fixing misalignments over adding new features',
        ],
      },
      {
        step: 3,
        title: 'Surface Target Attributes Appropriately',
        description:
          'Make the real quality attributes accessible without overwhelming users who prefer proxy evaluation',
        example:
          'Show a green health indicator (proxy) with an expandable panel showing uptime, latency, and error rates (targets)',
        tips: [
          'Use progressive disclosure: proxy first, details on demand',
          'Label proxy metrics as summaries, not definitive evaluations',
          'Ensure target attributes are no more than one click away',
        ],
      },
      {
        step: 4,
        title: 'Invest in Real Quality, Not Just Proxy Quality',
        description:
          'Ensure your product actually excels at target attributes, not just proxy ones',
        example:
          'Fix API reliability before redesigning the dashboard — align quality with the impression you create',
        tips: [
          'Allocate engineering resources to target attributes proportionally',
          'Track both proxy metrics (design quality) and target metrics (reliability)',
          'Set quality bars for target attributes, not just visual standards',
        ],
      },
      {
        step: 5,
        title: 'Test for Substitution Effects',
        description:
          'Measure whether users are making accurate judgments or being misled by proxy attributes',
        example:
          'Ask users to rate "reliability" before and after seeing detailed uptime data — large gaps indicate substitution',
        tips: [
          'Compare perceived quality ratings with objective quality metrics',
          'Track post-purchase satisfaction and return rates',
          'Monitor whether informed users make different decisions',
        ],
      },
    ],

    dos: [
      'Align proxy attributes (visual quality, speed) with target attributes (reliability, value)',
      'Provide multi-attribute breakdowns alongside aggregate scores',
      'Label summary metrics as proxies and link to detailed data',
      'Invest in both proxy quality and target quality proportionally',
      'Use progressive disclosure to surface target attributes on demand',
      'Test whether users\' proxy-based judgments match reality',
      'Design surveys that decompose complex evaluations into specific dimensions',
      'Acknowledge that users will substitute and design for it ethically',
    ],

    donts: [
      'Don\'t polish visual design to mask functional deficiencies',
      'Don\'t collapse complex quality dimensions into misleading single scores',
      'Don\'t exploit speed-as-trust when underlying quality is poor',
      'Don\'t use social metrics as authority proxies without verification',
      'Don\'t hide target attributes (reliability, security) behind proxy metrics',
      'Don\'t assume users evaluate what you intend — research actual substitution patterns',
      'Don\'t treat proxy investment as a substitute for target quality investment',
      'Don\'t design aggregate ratings without accessible breakdowns',
    ],

    bestPractices: [
      {
        title: 'Progressive Disclosure of Attributes',
        description:
          'Show proxy summaries first, with easy access to target attribute details',
        rationale:
          'Respects users who want quick evaluation while enabling informed decisions for those who want depth',
        example:
          'Health score badge (green) > click > uptime %, latency, error rate, incident history',
      },
      {
        title: 'Multi-Dimensional Ratings',
        description:
          'Break aggregate scores into constituent dimensions so users can evaluate specific attributes',
        rationale:
          'Single scores hide trade-offs; breakdowns reveal them and reduce harmful substitution',
        example:
          'Overall 4.3 stars > Speed: 4.8, Reliability: 3.1, Ease: 4.6, Value: 4.5',
      },
      {
        title: 'Proxy-Target Alignment Audit',
        description:
          'Regularly audit whether your most visible attributes accurately represent your most important ones',
        rationale:
          'Misalignment leads to initial trust followed by disappointment and churn',
        example:
          'Quarterly review: "Does our visual quality match our functional quality? Where are the gaps?"',
      },
      {
        title: 'Substitution-Aware Surveys',
        description:
          'Design feedback collection to prevent users from substituting current mood for overall evaluation',
        rationale:
          'Single-question satisfaction surveys are dominated by the most recent experience, not overall quality',
        example:
          'Ask about specific attributes in randomized order, then aggregate — don\'t ask one overall question',
      },
      {
        title: 'Honest Signal Design',
        description:
          'Ensure the signals you optimize are honest indicators of real quality',
        rationale:
          'Long-term trust requires that the proxies users rely on actually predict target quality',
        example:
          'If you highlight page speed, ensure your backend is equally fast and reliable — not just the initial paint',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure proxy and target attributes are semantically related',
        implementation:
          'Use proper heading levels, ARIA labels, and semantic structure so screen reader users can navigate from proxy summaries to detailed target attributes',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to convey proxy quality signals',
        implementation:
          'Combine color health indicators with text labels and icons (green dot + "Operational" text + checkmark icon)',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label proxy vs target information',
        implementation:
          'Use descriptive headings like "Quick Overview" for proxy sections and "Detailed Metrics" for target attribute sections',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Ensure interactive elements for accessing detailed attributes have clear labels',
        implementation:
          'Expandable details panels must have descriptive ARIA labels like "View detailed reliability metrics"',
      },
    ],

    ethics: [
      {
        concern: 'Proxy-Quality Deception',
        severity: 'critical',
        explanation:
          'Investing heavily in visual polish or speed while core product quality is poor, deliberately exploiting users\' tendency to substitute proxy for target',
        mitigation:
          'Ensure proxy quality investment is proportional to target quality investment. Track and close proxy-target gaps.',
      },
      {
        concern: 'Hidden Attribute Weakness',
        severity: 'high',
        explanation:
          'Collapsing multi-dimensional quality into a single score that hides critical weaknesses (e.g., 4.3 average hiding 2.1 reliability)',
        mitigation:
          'Always provide accessible breakdowns. Flag attributes that score significantly below the aggregate.',
      },
      {
        concern: 'Social Proof as Authority',
        severity: 'high',
        explanation:
          'Using follower counts, download numbers, or customer logos as proxies for quality or expertise without substantiation',
        mitigation:
          'Supplement social metrics with objective quality evidence. Don\'t present popularity as proof of quality.',
      },
      {
        concern: 'Aesthetic Manipulation',
        severity: 'medium',
        explanation:
          'Using beautiful design to create trust in contexts where visual quality has no relationship to product quality (e.g., financial products)',
        mitigation:
          'In high-stakes domains, surface objective quality metrics (certifications, audit results, track records) alongside aesthetic design.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Representativeness Revisited: Attribute Substitution in Intuitive Judgment',
        author: 'Kahneman, D., & Frederick, S.',
        year: 2002,
        description:
          'The foundational paper defining attribute substitution as a general mechanism underlying heuristic judgment',
        type: 'foundational',
      },
      {
        title: 'A Model of Heuristic Judgment',
        author: 'Kahneman, D., & Frederick, S.',
        year: 2005,
        description:
          'Extended framework for attribute substitution within the dual-process theory of reasoning',
        type: 'foundational',
      },
      {
        title: 'Maps of Bounded Rationality: Psychology for Behavioral Economics',
        author: 'Kahneman, D.',
        year: 2003,
        doi: '10.1257/000282803322655392',
        description:
          'Nobel Prize lecture covering attribute substitution and its role in bounded rationality',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive treatment of attribute substitution as a core mechanism of System 1 thinking (Chapters 8-9)',
        type: 'foundational',
      },
      {
        title: 'Heuristics and Biases: The Psychology of Intuitive Judgment',
        author: 'Gilovich, T., Griffin, D., & Kahneman, D.',
        year: 2002,
        isbn: '9780521796798',
        description:
          'Academic collection including the original attribute substitution paper by Kahneman and Frederick',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'The Aesthetic-Usability Effect',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/aesthetic-usability-effect/',
        description:
          'How visual aesthetics are substituted for usability judgments — a direct application of attribute substitution in UX',
        type: 'practical',
      },
      {
        title: 'Don\'t Let Users Confuse Ease and Quality',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/topics/aesthetic-usability-effect',
        description:
          'Practical guide to managing the substitution of aesthetics for quality in product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Attribute Substitution — Thinking Fast and Slow',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=Pn8gRSEbPsM',
        description:
          'Accessible explanation of attribute substitution with everyday examples',
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
      'availability-heuristic', // Available attributes are more likely to be substituted
      'affect-heuristic', // Emotional reactions often serve as the substituted attribute
      'halo-effect', // Positive impression in one attribute substitutes for others
      'aesthetic-usability-effect', // Visual quality substitutes for usability judgment
    ],

    conflicts: [
      'deliberate-thinking', // Careful analysis overrides automatic substitution
      'expertise-effect', // Domain experts are less prone to proxy substitution
    ],

    confusedWith: [
      'availability-heuristic', // Related but distinct: availability is about ease of recall, not attribute replacement
      'halo-effect', // Overlaps but halo is about positive spillover, substitution is about question replacement
      'representativeness-heuristic', // Substitution is the mechanism underlying representativeness
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'aesthetic-usability-effect',
        'affect-heuristic',
        'prototype-heuristic',
      ],
    },
  },
};
