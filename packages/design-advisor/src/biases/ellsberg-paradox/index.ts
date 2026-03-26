/**
 * ELLSBERG PARADOX
 *
 * People prefer known probabilities over unknown ones,
 * even when the unknown option might yield a better outcome.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const ellsbergParadox: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'ellsberg-paradox',
    name: 'Ellsberg Paradox',
    aliases: ['Ambiguity Aversion', 'Uncertainty Aversion', 'Knightian Uncertainty Aversion'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'ambiguity',
      'uncertainty',
      'risk-perception',
      'pricing',
      'transparency',
      'decision-making',
      'probability',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People prefer known probabilities over unknown ones, even when the unknown option might be better.',

    detailed: `The Ellsberg Paradox describes a pattern in human decision-making where people strongly prefer options with known probabilities over options with unknown or ambiguous probabilities — even when the unknown option could offer equal or better expected value.

This is not simply risk aversion (preferring certainty over a gamble). It is ambiguity aversion: people will accept worse expected outcomes to avoid situations where the odds themselves are unclear. A 50% known chance feels safer than a chance that "might be anywhere from 20% to 80%," even though the average is the same.

In product design and UX, this manifests as users avoiding options, features, or offerings where information is vague, pricing is unclear, or outcomes are uncertain. "Contact us for pricing" triggers ambiguity aversion. "Ships in 3-5 days" beats "shipping time varies." Clear, transparent information — even when the numbers aren't ideal — outperforms vague promises.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Ellsberg',
      year: 1961,
      theory: 'Ambiguity Aversion in Decision Theory',
      mechanism: `The brain treats known and unknown risks differently, penalizing ambiguity beyond what pure probability theory would predict. This happens because:

1. **Competence Hypothesis**: People feel less competent evaluating unknown probabilities, and avoid situations that expose this feeling
2. **Worst-Case Weighting**: When probabilities are unknown, people mentally assign higher weight to the worst possible outcome
3. **Source Credibility**: Known probabilities feel more trustworthy because they imply someone has measured and validated the odds
4. **Comparative Ignorance**: Ambiguity aversion intensifies when a known-probability alternative is available for comparison
5. **Regret Anticipation**: Choosing an ambiguous option and losing feels worse than choosing a known-risk option and losing — "I should have gone with the sure thing"`,
    },

    realWorldExample: `In Ellsberg's original 1961 experiment, participants faced an urn with 30 red balls and 60 balls that were either black or yellow (exact split unknown). When offered a bet on drawing red (known 1/3 chance) vs black (unknown chance between 0 and 2/3), most chose red. But when offered a bet on "red or yellow" vs "black or yellow," most switched to "black or yellow." This violates expected utility theory — the preferences are logically inconsistent, revealing that people aren't calculating odds rationally but rather avoiding ambiguity itself.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Ellsberg Paradox profoundly affects how users evaluate products, services, and interfaces. Ambiguity in pricing, delivery, features, or outcomes creates a penalty that goes beyond the actual risk. Designers can leverage this to:

- Increase conversions by making pricing, timelines, and outcomes transparent and specific
- Reduce abandonment by eliminating vague or ambiguous language in critical flows
- Build trust by quantifying what users can expect, even when the numbers aren't perfect
- Improve feature adoption by clearly describing what features do and what results to expect
- Reduce anxiety in checkout, onboarding, and commitment flows by removing uncertainty`,

    whenToUse: [
      {
        title: 'Pricing Pages',
        scenario:
          'When displaying pricing for products or services',
        example:
          'Show clear "$49/month" pricing instead of "Contact us for a quote" — users will choose the known price even if the quote might be lower',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Shipping and Delivery',
        scenario: 'When communicating delivery timelines to users',
        example:
          'Display "Arrives March 25-27" instead of "Shipping time varies" — a concrete range, even if wide, beats ambiguity',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Descriptions',
        scenario: 'When explaining what a product or feature does',
        example:
          'Describe exactly what the AI assistant can and cannot do, rather than vague "powered by AI" messaging',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription and Commitment Flows',
        scenario: 'When asking users to commit to a plan or contract',
        example:
          'Clearly state "You can cancel anytime, no fees" instead of vague cancellation policies',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Risk Communication',
        scenario: 'When communicating potential risks or downsides',
        example:
          'State "2% of users experience delays of up to 48 hours" rather than "delays may occur"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Onboarding Time Estimates',
        scenario: 'When setting expectations for setup or learning curve',
        example:
          'Show "Setup takes 15 minutes" instead of "Quick and easy setup"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuinely Unpredictable Outcomes',
        reason:
          'Fabricating precise numbers for truly unpredictable events is dishonest',
        consequence:
          'Users will lose trust when stated probabilities prove inaccurate',
        alternative:
          'Provide honest ranges with clear explanation of why precision is impossible',
      },
      {
        title: 'Creative or Exploratory Contexts',
        reason:
          'Over-specifying outcomes can stifle exploration and serendipity',
        consequence:
          'Users might avoid open-ended features that are valuable precisely because outcomes are unknown',
        alternative:
          'Frame ambiguity as opportunity: "Discover what works for your unique situation"',
      },
      {
        title: 'Competitive Intelligence',
        reason:
          'Publishing exact pricing or capabilities can expose strategic information to competitors',
        consequence:
          'Competitors can undercut or position against your specific numbers',
        alternative:
          'Provide ranges or tiers that give users enough clarity without revealing exact strategy',
      },
      {
        title: 'Legally Sensitive Estimates',
        reason:
          'Overly precise claims about outcomes can create legal liability',
        consequence:
          'Users may sue or regulators may act if stated probabilities prove misleading',
        alternative:
          'Use qualified ranges with clear disclaimers: "Typical results range from X to Y"',
      },
    ],

    commonMistakes: [
      {
        title: '"Contact Us" as Default Pricing',
        description:
          'Hiding pricing behind a sales call for all tiers, not just enterprise',
        why: 'Users interpret hidden pricing as a signal that the price is either very high or unpredictable, triggering ambiguity aversion',
        fix: 'Show clear pricing for standard tiers. Reserve "Contact us" only for genuinely custom enterprise deals',
      },
      {
        title: 'Vague Feature Descriptions',
        description:
          'Describing features with marketing buzzwords instead of concrete capabilities',
        why: '"AI-powered insights" tells users nothing about what they will actually get, creating uncertainty about value',
        fix: 'Describe specific outcomes: "Automatically categorizes expenses into 12 predefined categories with 94% accuracy"',
      },
      {
        title: 'Ambiguous Timelines',
        description:
          'Using "soon," "varies," or "depends" instead of concrete time ranges',
        why: 'Users cannot plan around ambiguous timelines and will choose competitors who provide specifics',
        fix: 'Provide concrete ranges: "Processing takes 2-5 business days" even if the range is wide',
      },
      {
        title: 'Undefined Cancellation Terms',
        description:
          'Burying or obscuring how cancellation, refunds, or returns work',
        why: 'Unknown exit costs make the entire commitment feel ambiguous and risky',
        fix: 'State cancellation policy upfront: "Cancel anytime. No fees. Pro-rated refund within 30 days"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether key information (pricing, timelines, terms) is visible or hidden',
        examples: [
          'Pricing displayed prominently reduces ambiguity; hidden pricing increases it',
          'FAQ sections addressing common uncertainties reduce ambiguity aversion',
          'Progress indicators with clear steps reduce process ambiguity',
          'Comparison tables that show exactly what each tier includes eliminate feature ambiguity',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography clarity affects how confidently users interpret information',
        examples: [
          'Clear, specific headlines ("$49/mo for 5 users") beat vague ones ("Affordable team pricing")',
          'Concrete numbers in bold reduce perceived ambiguity',
          'Fine print creates ambiguity — important terms should be readable',
          'Specific language in labels reduces uncertainty about what fields require',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals certainty or uncertainty in information presentation',
        examples: [
          'Green checkmarks on feature lists signal confirmed inclusion',
          'Gray or muted text on terms creates perceived ambiguity',
          'Clear color coding for plan tiers reduces comparison ambiguity',
          'Consistent color for prices across the site builds familiarity and trust',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements either resolve or create ambiguity about what happens next',
        examples: [
          'Button labels like "Start Free Trial - No Card Required" resolve commitment ambiguity',
          'Hover tooltips that explain unclear terms reduce feature ambiguity',
          'Calculators that show exact costs for user inputs eliminate pricing ambiguity',
          'Preview modes that show results before committing reduce outcome ambiguity',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content specificity is the primary lever for reducing ambiguity aversion',
        examples: [
          'Specific pricing beats "starting at" or "contact us"',
          'Concrete delivery dates beat "shipping time varies"',
          'Exact feature lists beat "and much more"',
          'Clear SLAs and guarantees beat "best-effort support"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible information reduces ambiguity for users who rely on assistive technologies',
        examples: [
          'Screen reader users cannot scan visually — clear content structure is essential to reduce ambiguity',
          'Alt text on pricing graphics ensures pricing is not ambiguous for non-visual users',
          'ARIA labels on interactive pricing calculators clarify what inputs control',
          'Clear form labels and instructions reduce input ambiguity for all users',
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
        title: 'Transparent SaaS Pricing',
        description:
          'Pricing page with clear, specific pricing for every tier — no hidden costs',
        code: `<div class="pricing-grid">
  <div class="plan">
    <h3>Starter</h3>
    <div class="price">$19<span>/month</span></div>
    <p class="billing-note">Billed monthly. Cancel anytime.</p>
    <ul>
      <li><strong>3</strong> team members</li>
      <li><strong>10 GB</strong> storage</li>
      <li><strong>Email</strong> support (24h response)</li>
    </ul>
    <button class="cta">Start Free 14-Day Trial</button>
    <p class="trial-note">No credit card required</p>
  </div>
  <div class="plan popular">
    <span class="badge">Most Popular</span>
    <h3>Professional</h3>
    <div class="price">$49<span>/month</span></div>
    <p class="billing-note">Billed monthly. Cancel anytime.</p>
    <ul>
      <li><strong>15</strong> team members</li>
      <li><strong>100 GB</strong> storage</li>
      <li><strong>Priority</strong> support (4h response)</li>
      <li><strong>API access</strong> — 10,000 calls/month</li>
    </ul>
    <button class="cta primary">Start Free 14-Day Trial</button>
    <p class="trial-note">No credit card required</p>
  </div>
</div>`,
        explanation:
          'Every number is specific. Users know exactly what they get, what it costs, how billing works, and how to cancel. No ambiguity triggers — the known quantities make the decision comfortable.',
        principle:
          'Specific, quantified offerings eliminate ambiguity aversion and increase conversion confidence',
        metrics: {
          before: '2.1% conversion with "Contact us for pricing"',
          after: '8.4% conversion with transparent pricing',
          improvement: '300% increase in trial signups by eliminating pricing ambiguity',
        },
      },
      {
        title: 'Concrete Delivery Estimates',
        description:
          'E-commerce checkout showing specific delivery date ranges based on location',
        code: `<div class="shipping-options">
  <h3>Delivery Options</h3>
  <label class="shipping-option selected">
    <input type="radio" name="shipping" value="standard" checked>
    <div class="option-details">
      <span class="method">Standard Shipping</span>
      <span class="date">Arrives March 25–27</span>
      <span class="price">Free</span>
    </div>
  </label>
  <label class="shipping-option">
    <input type="radio" name="shipping" value="express">
    <div class="option-details">
      <span class="method">Express Shipping</span>
      <span class="date">Arrives March 22</span>
      <span class="price">$12.99</span>
    </div>
  </label>
  <p class="guarantee">
    Order within <strong>2 hours 14 minutes</strong> for on-time delivery.
    100% money-back guarantee if late.
  </p>
</div>`,
        explanation:
          'Specific dates ("March 25-27") eliminate delivery ambiguity. The money-back guarantee further reduces uncertainty about whether the promise will be kept. Users choose this over competitors showing "3-7 business days."',
        principle:
          'Concrete date ranges with guarantees convert ambiguous shipping into known risk',
      },
      {
        title: 'Clear Feature Capabilities',
        description:
          'AI product page describing exactly what the AI can and cannot do',
        code: `<section class="ai-capabilities">
  <h2>What Our AI Assistant Does</h2>
  <div class="capabilities">
    <div class="can-do">
      <h3>What It Does</h3>
      <ul>
        <li>Categorizes expenses into 12 categories (94% accuracy)</li>
        <li>Flags duplicate invoices (catches 98% of duplicates)</li>
        <li>Generates monthly reports in under 30 seconds</li>
        <li>Answers questions about your spending in plain English</li>
      </ul>
    </div>
    <div class="cannot-do">
      <h3>What It Doesn't Do</h3>
      <ul>
        <li>Does not make payments or authorize transactions</li>
        <li>Does not replace your accountant for tax filing</li>
        <li>Cannot access accounts outside your connected banks</li>
      </ul>
    </div>
  </div>
  <p class="accuracy-note">
    Accuracy based on 50,000+ categorizations.
    You can correct any miscategorization in one click.
  </p>
</section>`,
        explanation:
          'By specifying both what the AI does and does not do — with accuracy numbers — users can evaluate the offering without ambiguity. The "cannot do" list paradoxically increases trust by showing honesty.',
        principle:
          'Explicit capability boundaries with accuracy metrics eliminate feature ambiguity',
      },
    ],

    bad: [
      {
        title: '"Contact Us" Pricing Wall',
        description:
          'SaaS product hiding all pricing behind a sales form',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-page">
  <h2>Flexible Pricing for Every Team</h2>
  <p>Our pricing is tailored to your unique needs.</p>
  <div class="plans">
    <div class="plan">
      <h3>Starter</h3>
      <p>For small teams getting started</p>
      <button>Contact Sales</button>
    </div>
    <div class="plan">
      <h3>Professional</h3>
      <p>For growing businesses</p>
      <button>Contact Sales</button>
    </div>
    <div class="plan">
      <h3>Enterprise</h3>
      <p>For large organizations</p>
      <button>Contact Sales</button>
    </div>
  </div>
</div>`,
        explanation:
          'Every tier requires contacting sales, creating total pricing ambiguity. Users cannot evaluate whether the product is within their budget. Most will leave for a competitor with transparent pricing rather than face the unknown.',
        principle:
          'Hidden pricing is the strongest trigger for ambiguity aversion — users flee from unknown costs',
      },
      {
        title: 'Vague Shipping Promise',
        description:
          'E-commerce site with no specific delivery information',
        code: `<!-- DON'T DO THIS -->
<div class="shipping-info">
  <h3>Shipping</h3>
  <p>Shipping times vary based on your location and product availability.</p>
  <p>We'll do our best to get your order to you as quickly as possible!</p>
  <p class="note">Expedited shipping may be available for some items.</p>
</div>`,
        explanation:
          'No dates, no ranges, no guarantees. Users have no idea when their order will arrive. "May be available" compounds the ambiguity. Users will abandon checkout for a competitor who says "Arrives Thursday."',
        principle:
          'Vague promises create maximum ambiguity — users need specific commitments to act',
      },
      {
        title: 'Buzzword Feature Description',
        description:
          'Product page using vague marketing language instead of specifics',
        code: `<!-- DON'T DO THIS -->
<section class="features">
  <h2>Supercharge Your Workflow</h2>
  <div class="feature">
    <h3>AI-Powered Intelligence</h3>
    <p>Leverage cutting-edge AI to unlock powerful insights
    and drive transformative outcomes for your business.</p>
  </div>
  <div class="feature">
    <h3>Seamless Integration</h3>
    <p>Connect with all your favorite tools effortlessly
    and create a unified experience.</p>
  </div>
  <div class="feature">
    <h3>Enterprise-Grade Security</h3>
    <p>Rest easy knowing your data is protected by
    industry-leading security measures.</p>
  </div>
</section>`,
        explanation:
          'Not a single specific claim. What does "AI-powered intelligence" actually do? Which tools does it integrate with? What security certifications does it have? Every feature is ambiguous, giving users no basis for evaluation.',
        principle:
          'Marketing buzzwords without specifics create ambiguity that drives users to better-described alternatives',
      },
    ],

    realWorld: [
      {
        company: 'Stripe',
        product: 'Pricing Page',
        url: 'https://stripe.com/pricing',
        description:
          'Stripe displays exact transaction fees (2.9% + 30 cents per charge) on their homepage. No "contact us," no "starting at." Users know the exact cost before signing up, eliminating pricing ambiguity entirely.',
        effectiveness: 'very-effective',
        analysis:
          'Stripe\'s transparent pricing is a major competitive advantage. Developers and businesses choose Stripe over competitors partly because the cost is completely known. This is a textbook example of eliminating ambiguity aversion.',
      },
      {
        company: 'Amazon',
        product: 'Delivery Date Estimates',
        url: 'https://www.amazon.com',
        description:
          'Amazon shows exact delivery dates ("Get it Thursday, March 21") for every product based on user location. Prime members see even more specific same-day or next-day windows.',
        effectiveness: 'very-effective',
        analysis:
          'Specific delivery dates are a core reason users choose Amazon over competitors. The known arrival date eliminates shipping ambiguity that plagues other retailers. Users pay for Prime partly to get even more precise delivery windows.',
      },
      {
        company: 'Lemonade',
        product: 'Insurance Pricing',
        url: 'https://www.lemonade.com',
        description:
          'Lemonade shows instant insurance quotes with exact monthly premiums and clear coverage breakdowns. Traditional insurers require multi-step applications and agent calls before revealing any pricing.',
        effectiveness: 'very-effective',
        analysis:
          'Lemonade disrupted insurance by eliminating the ambiguity that traditional insurers create. Users get a known price in seconds rather than facing weeks of uncertainty. The transparent pricing directly addresses the Ellsberg Paradox.',
      },
      {
        company: 'Slack',
        product: 'Pricing Calculator',
        url: 'https://slack.com/pricing',
        description:
          'Slack provides an interactive pricing calculator where users input their team size and see the exact monthly cost. Users can toggle billing frequency and see the precise difference.',
        effectiveness: 'effective',
        analysis:
          'The calculator transforms potentially ambiguous per-user pricing into a concrete total. Users see exactly what they will pay, removing the mental math and uncertainty that can trigger ambiguity aversion.',
      },
      {
        company: 'Wise (TransferWise)',
        product: 'Transfer Fee Calculator',
        url: 'https://wise.com',
        description:
          'Wise shows the exact fee and exchange rate before users commit to a transfer. They compare their transparent fee against the hidden fees of traditional banks in real-time.',
        effectiveness: 'very-effective',
        analysis:
          'Wise explicitly contrasts known (their fee) vs unknown (bank fees) to leverage the Ellsberg Paradox in their favor. Users choose the known cost even when banks might occasionally charge less.',
      },
    ],

    abTests: [
      {
        title: 'Transparent Pricing vs Contact Sales',
        hypothesis:
          'Displaying clear pricing will increase signups compared to requiring users to contact sales',
        controlVersion: {
          description:
            'Pricing page with "Contact us for pricing" on all tiers, requiring a sales form submission',
          metrics: {
            conversionRate: '2.1%',
            timeOnPage: '0:42',
            scrollDepth: '35%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page with specific prices ($19/$49/$149), feature lists, and "Start Free Trial" buttons',
          metrics: {
            conversionRate: '8.4%',
            timeOnPage: '2:58',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Transparent pricing increased conversions by 300%. Users spent 4x longer evaluating options and scrolled much deeper, indicating genuine consideration rather than immediate abandonment. Sales-qualified leads actually increased because more users entered the funnel.',
          learnings: [
            'Pricing ambiguity is the single largest conversion killer for SaaS products',
            'Users who see clear pricing engage more deeply with the product',
            'Transparent pricing does not reduce enterprise deals — it increases overall pipeline',
            'The "contact us" approach loses users to competitors with visible pricing',
          ],
        },
      },
      {
        title: 'Specific vs Vague Delivery Estimates',
        hypothesis:
          'Specific delivery date ranges will reduce cart abandonment compared to vague shipping language',
        controlVersion: {
          description:
            'Checkout showing "Standard shipping: 3-7 business days" without specific dates',
          metrics: {
            conversionRate: '61%',
            cartAbandonmentRate: '39%',
          },
        },
        treatmentVersion: {
          description:
            'Checkout showing "Standard shipping: Arrives March 25-27" with specific calendar dates',
          metrics: {
            conversionRate: '74%',
            cartAbandonmentRate: '26%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Specific calendar dates reduced cart abandonment by 33%. Users found concrete dates easier to evaluate than abstract "business days" calculations. The improvement was strongest for gift purchases where arrival timing was critical.',
          learnings: [
            'Calendar dates are less ambiguous than "business days" ranges',
            'Users struggle to mentally calculate "3-7 business days" into actual dates',
            'Specific dates build confidence even when the range is the same width',
            'Gift and time-sensitive purchases show the strongest effect',
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
        name: 'Hidden Pricing',
        description:
          '"Contact us," "Request a quote," or "Custom pricing" where specific numbers could be shown',
        howToSpot:
          'Look for CTAs that lead to forms or calls instead of displaying prices directly',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Vague Timelines',
        description:
          '"Varies," "depends," "soon," or relative time references instead of specific dates or ranges',
        howToSpot:
          'Check shipping estimates, processing times, and delivery promises for specificity',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Buzzword Features',
        description:
          'Marketing language ("AI-powered," "seamless," "enterprise-grade") without specific capabilities or metrics',
        howToSpot:
          'Look for feature descriptions that lack numbers, specifics, or concrete examples of what the feature does',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Unclear Commitments',
        description:
          'Vague cancellation, refund, or contract terms that leave users unsure of their obligations',
        howToSpot:
          'Check for missing or buried cancellation policies, unclear billing terms, or ambiguous contract language',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unspecified Limits',
        description:
          '"Unlimited*," "generous limits," or "fair use" without defining actual thresholds',
        howToSpot:
          'Look for asterisks, footnotes, or qualifiers on usage limits and resource allocations',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Pricing Opacity Pattern',
        description: 'Pricing is hidden, gated, or described in vague terms rather than specific numbers',
        indicators: [
          '"Contact sales" or "Request a demo" as primary CTA on pricing page',
          '"Starting at" without showing what the actual starting configuration costs',
          '"Custom pricing" for standard use cases',
          'Per-unit pricing without a calculator to show total cost',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Ambiguous Outcome Pattern',
        description: 'Product outcomes or capabilities described in vague, non-measurable terms',
        indicators: [
          'Feature descriptions using only buzzwords',
          'No metrics, benchmarks, or accuracy numbers',
          'Vague claims like "improve efficiency" without quantification',
          '"And much more" as a feature list item',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Timeline Uncertainty Pattern',
        description: 'Delivery, processing, or response times are vague or relative rather than specific',
        indicators: [
          '"Ships soon" or "typically ships quickly"',
          '"Business days" without calendar date conversion',
          '"Response time varies" for support SLAs',
          'No estimated completion time for processes',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Commitment Ambiguity Pattern',
        description: 'Terms of engagement, cancellation, or exit are unclear or hidden',
        indicators: [
          'No visible cancellation policy before signup',
          'Vague refund terms ("subject to review")',
          'Unclear auto-renewal behavior',
          'Contract length not specified upfront',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Can users see exact pricing without contacting anyone?',
      'Are delivery or processing timelines expressed as specific dates or ranges?',
      'Do feature descriptions include concrete capabilities and measurable outcomes?',
      'Is the cancellation policy clearly stated before users commit?',
      'Are usage limits defined with specific numbers, not vague terms?',
      'Can users calculate their total cost before purchasing?',
      'Are SLAs and support response times quantified?',
      'Does every "and more" or "etc." get replaced with specifics?',
      'Are comparison tables complete, with no missing data points?',
      'Would a user know exactly what they get and what they pay without asking anyone?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Ellsberg Paradox and ambiguity aversion.

Analyze the provided design for ambiguity that could trigger the Ellsberg Paradox. Identify:

1. **Pricing Ambiguity**: Hidden prices, vague "starting at" language, "contact us" gates
2. **Outcome Ambiguity**: Vague feature descriptions, unquantified claims, buzzword-heavy copy
3. **Timeline Ambiguity**: Non-specific delivery, processing, or response times
4. **Commitment Ambiguity**: Unclear cancellation, refund, or contract terms
5. **Capability Ambiguity**: Undefined limits, unspecified integrations, vague "and more"

For each ambiguity found:
- Identify its type, location, and severity
- Assess how much it would deter a risk-aware user
- Determine if the ambiguity is avoidable or genuinely necessary
- Suggest a specific, concrete replacement

Consider:
- Would a user choose a competitor with clearer information?
- Can this ambiguity be resolved with specific numbers or ranges?
- Is there a legitimate reason for the ambiguity, or is it hiding bad news?
- Does the ambiguity disproportionately affect certain user groups?

Provide actionable recommendations ranked by impact on conversion and trust.`,

    outputSchema: {
      type: 'object',
      properties: {
        ambiguityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentText: { type: 'string' },
              ambiguityLevel: { type: 'string' },
              suggestedReplacement: { type: 'string' },
              conversionImpact: { type: 'string' },
              avoidable: { type: 'boolean' },
            },
            required: [
              'type',
              'location',
              'ambiguityLevel',
              'avoidable',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            pricingClarity: { type: 'number' },
            outcomeSpecificity: { type: 'number' },
            timelineClarity: { type: 'number' },
            commitmentTransparency: { type: 'number' },
          },
          required: [
            'pricingClarity',
            'outcomeSpecificity',
            'timelineClarity',
            'commitmentTransparency',
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
        'ambiguityPatterns',
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
        title: 'Audit for Ambiguity',
        description:
          'Systematically identify every point where users face unknown information in your product',
        example:
          'Map every "contact us," "varies," "depends," and "starting at" in your pricing and feature pages',
        tips: [
          'Walk through the entire user journey as a first-time visitor',
          'Flag any point where you cannot answer "what exactly do I get?"',
          'Check competitor sites — if they are more specific, you are losing users to ambiguity aversion',
        ],
      },
      {
        step: 2,
        title: 'Quantify Everything Possible',
        description:
          'Replace vague language with specific numbers, ranges, dates, and measurable outcomes',
        example:
          'Change "fast support" to "Average response time: 2 hours (business hours)"',
        tips: [
          'Even rough ranges are better than no information',
          'If you cannot be exact, provide a range with confidence level',
          'Use data from your actual operations to generate honest numbers',
        ],
      },
      {
        step: 3,
        title: 'Make Pricing Transparent',
        description:
          'Display clear pricing for every standard tier, with calculators for variable pricing',
        example:
          'Show "$49/month for up to 10 users, $5/additional user" with an interactive calculator',
        tips: [
          'Reserve "contact us" only for genuinely custom enterprise deals',
          'Include all fees — no surprises at checkout',
          'Show total cost, not just per-unit cost',
        ],
      },
      {
        step: 4,
        title: 'Specify Timelines Concretely',
        description:
          'Convert relative time references into specific calendar dates or precise ranges',
        example:
          'Instead of "3-5 business days," show "Arrives March 25-27"',
        tips: [
          'Calculate and display actual calendar dates based on user location',
          'Include processing time in delivery estimates',
          'Provide tracking so users can resolve remaining uncertainty themselves',
        ],
      },
      {
        step: 5,
        title: 'State Commitments and Exit Terms Clearly',
        description:
          'Make cancellation, refund, and contract terms visible before users commit',
        example:
          'Display "Cancel anytime from your settings page. No cancellation fees. Refund within 30 days." directly on the signup page',
        tips: [
          'Put cancellation policy near the signup button, not buried in ToS',
          'Use plain language, not legal jargon',
          'Offer guarantees to further reduce commitment ambiguity',
        ],
      },
    ],

    dos: [
      'Display specific pricing for all standard tiers',
      'Show delivery dates as calendar dates, not relative days',
      'Describe feature capabilities with measurable outcomes and accuracy numbers',
      'State cancellation and refund policies upfront, before commitment',
      'Provide interactive calculators for variable or usage-based pricing',
      'Specify support response times with concrete SLAs',
      'Define usage limits with exact numbers, not "fair use" policies',
      'Use comparison tables with complete data — no empty cells',
      'Offer money-back guarantees to reduce commitment risk',
      'Show both what your product does and does not do',
    ],

    donts: [
      'Don\'t hide pricing behind sales calls for standard offerings',
      'Don\'t use "varies," "depends," or "soon" when specifics are possible',
      'Don\'t describe features only with buzzwords and no measurable outcomes',
      'Don\'t bury cancellation or refund terms in lengthy Terms of Service',
      'Don\'t use "unlimited*" with a footnote that defines limits',
      'Don\'t show "starting at" pricing without showing what the starting configuration includes',
      'Don\'t leave comparison table cells empty or marked "contact us"',
      'Don\'t fabricate precise numbers for genuinely unpredictable outcomes',
      'Don\'t use vague timelines when your system can calculate specific dates',
      'Don\'t assume users will call sales to resolve pricing questions — they will go to a competitor instead',
    ],

    bestPractices: [
      {
        title: 'Transparency as Competitive Advantage',
        description:
          'Treat information transparency as a feature, not a risk — users choose known quantities over unknown ones',
        rationale:
          'The Ellsberg Paradox means users will pay more for a known price than risk an unknown one. Transparency is literally worth money.',
        example:
          'Stripe publishes exact fees (2.9% + 30c). Competitors hide pricing. Stripe wins on transparency.',
      },
      {
        title: 'Honest Ranges Over False Precision',
        description:
          'When exact numbers are impossible, provide honest ranges rather than fake precision or vague promises',
        rationale:
          'Users prefer a known range (known risk) over no information (ambiguity). Even wide ranges reduce ambiguity aversion.',
        example:
          '"Project typically costs $5,000-$15,000 depending on scope" beats "Contact us for a quote"',
      },
      {
        title: 'Boundary Specification',
        description:
          'Explicitly state what your product does NOT do or include, alongside what it does',
        rationale:
          'Unknown limitations create ambiguity. Stating limitations paradoxically increases trust by converting unknowns into knowns.',
        example:
          'AI tool page: "Categorizes expenses (94% accuracy). Does not file taxes or make payments."',
      },
      {
        title: 'Progressive Disclosure of Detail',
        description:
          'Show the most important specifics first, with the ability to drill into more detail',
        rationale:
          'Users need enough specifics to overcome ambiguity aversion, but too much detail creates cognitive overload',
        example:
          'Show "$49/mo" prominently, with expandable "What\'s included" and "Billing details" sections',
      },
      {
        title: 'Guarantees as Ambiguity Insurance',
        description:
          'Offer money-back guarantees, SLAs, and performance commitments to reduce residual uncertainty',
        rationale:
          'Even with transparent information, some ambiguity remains. Guarantees act as insurance against the unknown.',
        example:
          '"30-day money-back guarantee. 99.9% uptime SLA. If we miss our delivery date, your next order ships free."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure pricing and commitment information is semantically structured',
        implementation:
          'Use proper table markup for pricing comparisons, labeled form fields for calculators, and semantic headings for tier names so screen reader users can compare options without ambiguity.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use descriptive headings that reduce ambiguity about section content',
        implementation:
          'Use specific headings like "Pricing: $49/month Professional Plan" instead of just "Professional" — screen reader users scanning by headings need specifics.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for interactive pricing calculators',
        implementation:
          'Label calculator inputs clearly ("Number of team members") and ensure outputs are announced to screen readers when values change.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Ensure pricing graphics have text alternatives',
        implementation:
          'If pricing is displayed in images or charts, provide complete alt text with exact numbers so non-visual users have the same pricing clarity.',
      },
    ],

    ethics: [
      {
        concern: 'False Precision',
        severity: 'high',
        explanation:
          'Fabricating precise numbers to reduce ambiguity when genuine uncertainty exists',
        mitigation:
          'Use honest ranges with clear qualifiers. "Typically 2-5 days" is ethical. "Exactly 3 days" when it varies from 1-10 is not.',
      },
      {
        concern: 'Strategic Ambiguity',
        severity: 'critical',
        explanation:
          'Intentionally hiding pricing or terms to force users into sales conversations where they face pressure',
        mitigation:
          'Provide transparent information for all standard offerings. Use sales conversations for genuinely custom needs, not as a conversion tactic.',
      },
      {
        concern: 'Ambiguity Exploitation',
        severity: 'high',
        explanation:
          'Keeping competitors ambiguous information visible while showcasing your own transparency to create an unfair framing',
        mitigation:
          'Focus on your own transparency. If comparing to competitors, ensure comparisons are accurate and verifiable.',
      },
      {
        concern: 'Overwhelming Specificity',
        severity: 'medium',
        explanation:
          'Providing so much detail that users experience information overload and cannot make decisions',
        mitigation:
          'Use progressive disclosure. Show key specifics upfront with the option to drill into details. Do not dump everything on one page.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Risk, Ambiguity, and the Savage Axioms',
        author: 'Ellsberg, Daniel',
        year: 1961,
        doi: '10.2307/1884324',
        url: 'https://www.jstor.org/stable/1884324',
        description:
          'The foundational paper introducing the Ellsberg Paradox and demonstrating that people violate expected utility theory by avoiding ambiguous probabilities',
        type: 'foundational',
      },
      {
        title: 'A Smooth Model of Decision Making under Ambiguity',
        author: 'Klibanoff, P., Marinacci, M., & Mukerji, S.',
        year: 2005,
        doi: '10.1111/j.1468-0262.2005.00640.x',
        description:
          'Formal model of ambiguity aversion that separates risk attitudes from ambiguity attitudes',
        type: 'advanced',
      },
      {
        title: 'Ambiguity Aversion and Comparative Ignorance',
        author: 'Fox, C. R., & Tversky, A.',
        year: 1995,
        doi: '10.2307/2946693',
        description:
          'Shows that ambiguity aversion intensifies when a less ambiguous alternative is available for comparison',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Against the Gods: The Remarkable Story of Risk',
        author: 'Bernstein, Peter L.',
        year: 1996,
        isbn: '9780471295631',
        description:
          'Comprehensive history of risk and uncertainty, including the distinction between known and unknown probabilities central to the Ellsberg Paradox',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers decision-making under uncertainty including ambiguity aversion and how it differs from risk aversion',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393080148',
        description:
          'Discusses how ambiguity aversion and related biases affect real-world economic decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Role of Ambiguity in Decision Making',
        author: 'Behavioral Economics Guide',
        url: 'https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/ambiguity-aversion/',
        description:
          'Accessible overview of ambiguity aversion with practical examples',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Ellsberg Paradox Explained',
        author: 'Economics Explained',
        url: 'https://www.youtube.com/results?search_query=ellsberg+paradox+explained',
        description:
          'Video explanation of the Ellsberg Paradox with the original urn experiment and modern applications',
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
      'loss-aversion', // Ambiguity + potential loss amplifies avoidance
      'status-quo-bias', // Unknown alternatives reinforce sticking with the known
      'mere-exposure-effect', // Familiarity reduces perceived ambiguity
      'certainty-effect', // Preference for certain outcomes relates to preference for known probabilities
    ],

    conflicts: [
      'curiosity-gap', // Curiosity can motivate engagement with unknown
      'scarcity-bias', // Scarcity can override ambiguity aversion when desire is high enough
    ],

    confusedWith: [
      'risk-aversion', // Risk aversion is about known probabilities; Ellsberg is about unknown ones
      'loss-aversion', // Related but distinct — Ellsberg is about ambiguity, not loss magnitude
      'uncertainty-avoidance', // Broader concept; Ellsberg is specific to probability ambiguity
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'pricing-ambiguity-aversion',
        'timeline-ambiguity-aversion',
        'outcome-ambiguity-aversion',
      ],
    },
  },
};
