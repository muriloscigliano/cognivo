/**
 * AMBIGUITY EFFECT
 *
 * We avoid options with unknown probabilities
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const ambiguityEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'ambiguity-effect',
    name: 'Ambiguity Effect',
    aliases: ['Ambiguity Aversion', 'Ellsberg Paradox'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'uncertainty',
      'risk-aversion',
      'known-vs-unknown',
      'probability',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We avoid options with unknown probabilities',

    detailed: `The Ambiguity Effect is a cognitive bias where people prefer options with known probabilities over options with unknown or unclear probabilities, even when the uncertain option could yield a better outcome. This preference for the "known" over the "unknown" profoundly shapes how users interact with digital products.

When users encounter vague pricing, unclear feature limits, or ambiguous terms and conditions, they tend to abandon those options in favor of competitors who provide transparent, well-defined information. The bias is not about risk itself — people will accept known risks over unknown ones, even when the unknown option has higher expected value.

In UX and product design, the ambiguity effect means that clarity is conversion. Every unclear element — a "Contact Us for Pricing" button, an ambiguous feature description, an unspecified shipping cost — creates a decision barrier. Users don't just dislike ambiguity; they actively avoid it, often choosing inferior but well-defined alternatives.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Ellsberg',
      year: 1961,
      theory: 'Ambiguity Aversion Theory',
      mechanism: `The brain treats missing information as a signal of potential danger, triggering avoidance behavior. This happens because:

1. **Unknown Risk Assessment**: When probabilities are unknown, the brain cannot calculate expected value, so it defaults to worst-case assumptions
2. **Competence Hypothesis**: People feel less competent making decisions with incomplete information, triggering avoidance to protect self-image
3. **Information Gap Aversion**: The gap between what we know and what we need to know creates discomfort that motivates choosing the known option
4. **Loss Amplification**: Missing information amplifies perceived potential for loss — "if they're not telling me, it must be bad"
5. **Cognitive Load Penalty**: Ambiguous options require more mental effort to evaluate, and the brain prefers low-effort decisions

The mechanism is deeply tied to survival instincts — in evolutionary terms, unknown situations were genuinely dangerous, so avoiding ambiguity was adaptive.`,
    },

    realWorldExample: `In Ellsberg's classic 1961 experiment, participants were shown two urns. Urn A contained 50 red and 50 black balls (known distribution). Urn B contained 100 balls of red and black in an unknown ratio. When asked to bet on drawing a red ball, most people chose Urn A — even though Urn B could have had 99 red balls. The unknown probability, not the risk level, drove avoidance. This same pattern explains why consumers prefer a product with clear "30-day return policy" over one that says "flexible returns" — the vague promise could be better, but the uncertainty drives people to the defined option.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Ambiguity Effect directly impacts conversion, trust, and user confidence across every touchpoint. When information is missing, vague, or unclear, users interpret the gap as a reason to leave. Designers can leverage this to:

- Increase conversion by making pricing, features, and terms completely transparent
- Reduce cart abandonment by showing all costs (shipping, taxes, fees) upfront
- Build trust through explicit feature descriptions with clear limits and inclusions
- Improve CTA click-through by removing uncertainty about what happens next
- Decrease bounce rates by providing clear, specific value propositions`,

    whenToUse: [
      {
        title: 'Transparent Pricing Pages',
        scenario:
          'When displaying product or service pricing to prospective customers',
        example:
          'Show all costs upfront including taxes, shipping, and fees — no surprises at checkout',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Comparison Tables',
        scenario: 'When users need to compare plans, tiers, or products',
        example:
          'Use explicit limits ("10 projects", "50GB storage") instead of vague terms ("limited", "ample storage")',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Shipping and Delivery Estimates',
        scenario: 'When users need to know when they will receive a product',
        example:
          'Show specific delivery dates ("Arrives March 25-27") rather than vague ranges ("Ships in 3-10 business days")',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Call-to-Action Buttons',
        scenario: 'When guiding users toward the next step in a flow',
        example:
          'Use specific CTAs like "Start 14-day free trial — no credit card required" instead of just "Get Started"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and Sign-Up Forms',
        scenario: 'When asking users to commit time or information',
        example:
          'Tell users exactly what to expect: "This takes 2 minutes. We\'ll ask for your name, email, and team size."',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Return and Refund Policies',
        scenario: 'When users need reassurance before purchasing',
        example:
          'State explicit terms: "Full refund within 30 days, no questions asked" rather than "Satisfaction guaranteed"',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Intentional Exploration',
        reason:
          'Some products benefit from a sense of discovery and surprise (games, entertainment)',
        consequence:
          'Over-specifying can remove the joy of exploration and reduce engagement',
        alternative:
          'In entertainment contexts, use controlled ambiguity that creates curiosity without creating anxiety',
      },
      {
        title: 'Creative or Artistic Products',
        reason:
          'Artistic products may lose their appeal if over-specified',
        consequence:
          'Excessive transparency can commoditize creative or premium offerings',
        alternative:
          'Provide enough clarity on logistics (pricing, delivery) while preserving creative mystique on the product itself',
      },
      {
        title: 'Competitive Intelligence Concerns',
        reason:
          'Fully transparent pricing or features may give competitors an advantage',
        consequence:
          'Competitors can undercut or match your offering too easily',
        alternative:
          'Be transparent about value and general pricing structure while keeping enterprise-specific details for sales conversations',
      },
      {
        title: 'Highly Customized Services',
        reason:
          'Truly custom solutions cannot have fixed pricing without over-simplifying',
        consequence:
          'Fixed pricing may under-serve complex clients or over-charge simple ones',
        alternative:
          'Provide pricing ranges, example quotes, and a clear process for getting a custom estimate',
      },
    ],

    commonMistakes: [
      {
        title: 'Contact Us for Pricing',
        description:
          'Hiding pricing behind a sales conversation when users expect transparency',
        why: 'Users interpret hidden pricing as "expensive" or "complicated" and leave for competitors who show prices',
        fix: 'Show at least starting prices, pricing ranges, or example quotes to reduce ambiguity',
      },
      {
        title: 'Vague Feature Descriptions',
        description:
          'Using terms like "unlimited", "ample", or "generous" without specific numbers',
        why: 'Users cannot compare options or make informed decisions without concrete numbers',
        fix: 'Specify exact limits: "100 API calls/day" instead of "generous API access"',
      },
      {
        title: 'Mystery Checkout Costs',
        description:
          'Revealing shipping, taxes, or fees only at the final checkout step',
        why: 'Users feel deceived when the total is higher than expected, leading to cart abandonment',
        fix: 'Show estimated total cost including all fees as early as possible in the purchase flow',
      },
      {
        title: 'Ambiguous CTAs',
        description:
          'Using vague button labels like "Submit", "Continue", or "Learn More" without context',
        why: 'Users avoid clicking when they don\'t know what will happen next (will I be charged? will I be signed up?)',
        fix: 'Make CTAs specific: "Add to Cart — $49", "Start Free Trial", "Download PDF Report"',
      },
      {
        title: 'Unclear Cancellation Terms',
        description:
          'Not specifying how subscriptions can be cancelled or what happens when they are',
        why: 'Fear of being locked in or penalized prevents users from starting',
        fix: 'State cancellation terms explicitly: "Cancel anytime — no penalties, no questions asked"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines where key information is placed and whether users can find answers to their questions',
        examples: [
          'Pricing breakdowns placed prominently reduce perceived ambiguity',
          'FAQ sections near CTAs address common uncertainties at the decision point',
          '"What\'s included" sections adjacent to pricing tables eliminate feature confusion',
          'Cost calculators placed inline allow users to see exact pricing for their use case',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy signals what information is definitive vs supplementary',
        examples: [
          'Bold, clear pricing numbers in large type signal confidence and transparency',
          'Fine print triggers suspicion — important terms should use readable type sizes',
          'Specific numbers and dates in prominent type reduce perceived ambiguity',
          'Clear labeling of what is and isn\'t included prevents misunderstanding',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals clarity, trust, and completeness of information',
        examples: [
          'Green checkmarks on included features create clear yes/no signals',
          'Grey or muted text on important terms increases perceived ambiguity',
          'High contrast on pricing and key details signals transparency',
          'Trust-signaling colors (blues, greens) on guarantees reduce uncertainty',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements must clearly communicate what will happen when used',
        examples: [
          'Hover states on pricing tiers showing detailed breakdowns reduce ambiguity',
          'Tooltips explaining feature limits provide clarity without cluttering layout',
          'Interactive pricing calculators let users see exact costs for their situation',
          'Progress indicators showing next steps reduce uncertainty in multi-step flows',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content clarity is the primary defense against the ambiguity effect — every vague word is a conversion leak',
        examples: [
          'Specific numbers ("10 users", "$49/mo") outperform vague language ("multiple users", "affordable")',
          '"What\'s included" lists eliminate guesswork about feature availability',
          'Explicit shipping timelines ("Arrives March 25") outperform vague estimates ("3-5 days")',
          'FAQ sections addressing common uncertainties at the point of decision reduce abandonment',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Ambiguity is amplified for users with disabilities who may not have full access to visual cues or contextual information',
        examples: [
          'Screen reader users need explicit text — visual cues like green checkmarks must have text alternatives',
          'Cognitive disabilities amplify the ambiguity effect — simpler, clearer language is essential',
          'Users with low vision may miss fine print disclaimers, making clear primary text crucial',
          'ARIA descriptions on interactive pricing elements ensure all users can access detailed breakdowns',
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
        title: 'Transparent Pricing with Full Breakdown',
        description:
          'SaaS pricing page showing exact costs, included features, and limits for each tier',
        code: `<div class="pricing-grid">
  <div class="plan">
    <h3>Starter</h3>
    <div class="price">$29<span>/month</span></div>
    <p class="billing-note">Billed monthly. Cancel anytime.</p>
    <ul class="features">
      <li class="included">✓ 5 team members</li>
      <li class="included">✓ 10 projects</li>
      <li class="included">✓ 5GB storage</li>
      <li class="included">✓ Email support (24h response)</li>
      <li class="excluded">✗ API access</li>
      <li class="excluded">✗ Custom integrations</li>
    </ul>
    <button>Start 14-day free trial</button>
    <p class="guarantee">No credit card required</p>
  </div>
</div>`,
        explanation:
          'Every element eliminates ambiguity: exact price, billing frequency, cancellation terms, specific feature limits with numbers, explicit exclusions, and a CTA that tells you exactly what happens next.',
        principle:
          'Specificity at every level eliminates the ambiguity that drives users away',
        metrics: {
          before: '3.2% conversion with vague "Starting at $29" pricing',
          after: '5.8% conversion with full transparent breakdown',
          improvement: '81% increase in pricing page conversions',
        },
      },
      {
        title: 'Clear Feature Comparison Table',
        description:
          'Feature comparison with explicit limits and yes/no indicators',
        code: `<table class="feature-comparison">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Free</th>
      <th>Pro</th>
      <th>Business</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Projects</td>
      <td>3 projects</td>
      <td>25 projects</td>
      <td>Unlimited</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>1 GB</td>
      <td>50 GB</td>
      <td>500 GB</td>
    </tr>
    <tr>
      <td>Team members</td>
      <td>1 user</td>
      <td>Up to 10</td>
      <td>Up to 100</td>
    </tr>
    <tr>
      <td>Support</td>
      <td>Community forum</td>
      <td>Email (12h response)</td>
      <td>Priority chat (1h response)</td>
    </tr>
    <tr>
      <td>API access</td>
      <td>—</td>
      <td>1,000 calls/day</td>
      <td>50,000 calls/day</td>
    </tr>
  </tbody>
</table>`,
        explanation:
          'Every cell contains a specific number or clear indicator. Users can compare plans without guessing. "1,000 calls/day" is far more useful than "limited API access".',
        principle:
          'Explicit feature limits enable confident comparison and reduce decision paralysis',
      },
      {
        title: 'Upfront Shipping with Delivery Date',
        description:
          'E-commerce checkout showing total cost and specific delivery date before purchase',
        code: `<div class="order-summary">
  <h3>Order Summary</h3>
  <div class="line-item">
    <span>Wireless Headphones</span>
    <span>$79.99</span>
  </div>
  <div class="line-item">
    <span>Shipping (Standard)</span>
    <span>$4.99</span>
  </div>
  <div class="line-item">
    <span>Tax</span>
    <span>$6.80</span>
  </div>
  <div class="total">
    <span>Total</span>
    <span>$91.78</span>
  </div>
  <div class="delivery-estimate">
    <span class="icon">📦</span>
    <p><strong>Estimated delivery: March 25 – March 27</strong></p>
    <p class="detail">Free returns within 30 days</p>
  </div>
  <button class="primary">Place Order — $91.78</button>
</div>`,
        explanation:
          'Every cost is shown before the user commits. The delivery date is specific (not "3-5 business days"). The CTA includes the exact total. The return policy is explicit.',
        principle:
          'Showing all costs and timelines upfront eliminates the uncertainty that causes cart abandonment',
        metrics: {
          before: '68% cart abandonment with costs revealed at final step',
          after: '41% cart abandonment with upfront cost display',
          improvement: '40% reduction in cart abandonment rate',
        },
      },
      {
        title: 'What\'s Included Section',
        description:
          'Service page with explicit breakdown of what is and isn\'t included',
        code: `<section class="whats-included">
  <h2>What's Included in Your Plan</h2>
  <div class="included-list">
    <h4>✓ Included</h4>
    <ul>
      <li>Unlimited design revisions</li>
      <li>Source files (Figma, Sketch, AI)</li>
      <li>Commercial license for all deliverables</li>
      <li>2 rounds of feedback per milestone</li>
    </ul>
  </div>
  <div class="not-included-list">
    <h4>✗ Not Included</h4>
    <ul>
      <li>Stock photography (client provides or we bill separately)</li>
      <li>Copywriting (we design with provided copy)</li>
      <li>Development / coding</li>
    </ul>
  </div>
  <p class="note">Questions? <a href="/faq">See our FAQ</a>
  or <a href="/contact">ask us directly</a>.</p>
</section>`,
        explanation:
          'Explicitly listing both included and excluded items removes all ambiguity about what the user is paying for. This is far more effective than a vague "full-service design" description.',
        principle:
          'Explicit inclusions AND exclusions eliminate the information gaps that trigger ambiguity aversion',
      },
    ],

    bad: [
      {
        title: 'Hidden Pricing Behind Sales Wall',
        description:
          'Enterprise SaaS hiding all pricing behind a "Contact Sales" gate',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-section">
  <h2>Pricing</h2>
  <div class="plan">
    <h3>Enterprise</h3>
    <p class="price">Custom Pricing</p>
    <p>Tailored to your needs</p>
    <button>Contact Sales</button>
  </div>
  <div class="plan">
    <h3>Business</h3>
    <p class="price">Contact Us</p>
    <p>For growing teams</p>
    <button>Request Quote</button>
  </div>
  <div class="plan">
    <h3>Starter</h3>
    <p class="price">Contact Us</p>
    <p>For small teams</p>
    <button>Talk to Sales</button>
  </div>
</div>`,
        explanation:
          'Every plan requires contacting sales with no price indication. Users cannot evaluate or compare options, triggering maximum ambiguity aversion. Most will leave for a competitor with transparent pricing rather than commit to a sales call with unknown outcomes.',
        principle:
          'Hidden pricing is the most common and damaging application of ambiguity in SaaS',
      },
      {
        title: 'Vague Feature Limits',
        description:
          'Plan descriptions using imprecise language instead of specific numbers',
        code: `<!-- DON'T DO THIS -->
<div class="plan-features">
  <h3>Pro Plan — $49/mo</h3>
  <ul>
    <li>Generous storage allowance</li>
    <li>Ample API access</li>
    <li>Multiple team members supported</li>
    <li>Priority support</li>
    <li>Advanced features included</li>
  </ul>
</div>`,
        explanation:
          'Every feature description is vague. "Generous storage" could mean 5GB or 500GB. "Multiple team members" could mean 3 or 300. "Priority support" has no SLA. Users cannot make an informed decision and will prefer a competitor who specifies "50GB storage, 10 team members, 4-hour support response."',
        principle:
          'Vague feature descriptions create the exact ambiguity that drives users to competitors',
      },
      {
        title: 'Surprise Checkout Costs',
        description:
          'E-commerce site revealing additional costs only at the final checkout step',
        code: `<!-- DON'T DO THIS -->
<!-- Product page shows: -->
<div class="product">
  <h2>Premium Widget</h2>
  <span class="price">$49.99</span>
  <button>Add to Cart</button>
</div>

<!-- Final checkout reveals: -->
<div class="checkout-total">
  <div class="line">Product: $49.99</div>
  <div class="line">Shipping: $12.99</div>
  <div class="line">Handling fee: $3.99</div>
  <div class="line">Tax: $5.32</div>
  <div class="line total">Total: $72.29</div>
  <!-- 45% more than the displayed price! -->
</div>`,
        explanation:
          'The product page implies a $49.99 total, but actual cost is $72.29 — a 45% increase revealed only at checkout. This creates a trust-destroying surprise that is the #1 cause of cart abandonment. The ambiguity about "what will the real total be?" is never addressed until it\'s too late.',
        principle:
          'Hidden costs are the most damaging form of ambiguity in e-commerce',
      },
      {
        title: 'Ambiguous Terms and Conditions',
        description:
          'Sign-up flow with unclear commitments and cancellation terms',
        code: `<!-- DON'T DO THIS -->
<div class="signup-form">
  <h3>Start Your Trial</h3>
  <input type="email" placeholder="Enter email">
  <input type="text" placeholder="Credit card number">
  <label>
    <input type="checkbox">
    I agree to the <a href="/terms">terms and conditions</a>
  </label>
  <button>Start Trial</button>
  <small style="color: #ccc; font-size: 0.65rem;">
    Trial converts to paid subscription.
    See terms for cancellation policy.
  </small>
</div>`,
        explanation:
          'Users must provide a credit card for a "trial" with no clarity on when they\'ll be charged, how much, or how to cancel. The critical information is buried in near-invisible fine print and a link to a legal document. This maximizes ambiguity and anxiety.',
        principle:
          'Hiding commitment terms in fine print amplifies ambiguity aversion and erodes trust',
      },
    ],

    realWorld: [
      {
        company: 'Basecamp',
        product: 'Basecamp Pricing',
        url: 'https://basecamp.com/pricing',
        description:
          'Basecamp offers a single, transparent price ($99/month flat) with everything included. No per-user fees, no tiers, no hidden costs. The entire pricing page is designed to eliminate every possible ambiguity.',
        effectiveness: 'very-effective',
        analysis:
          'By removing all pricing ambiguity — one price, everything included, no surprises — Basecamp eliminates the ambiguity effect entirely. Users never wonder "what will this really cost?" which dramatically reduces purchase hesitation.',
      },
      {
        company: 'Amazon',
        product: 'Estimated Delivery Dates',
        url: 'https://www.amazon.com',
        description:
          'Amazon shows specific delivery dates ("Get it by Wednesday, March 25") on every product listing. Users see exactly when their order will arrive before adding to cart.',
        effectiveness: 'very-effective',
        analysis:
          'Replacing vague "ships in 3-5 business days" with specific calendar dates eliminates temporal ambiguity. Users know exactly when to expect their package, removing a key uncertainty that causes cart abandonment at competitors.',
      },
      {
        company: 'Uber',
        product: 'Upfront Pricing',
        url: 'https://www.uber.com',
        description:
          'Uber shows the exact fare before the ride begins. Users see "$23.50 to downtown" rather than a metered fare that could be anything. This replaced the ambiguity of traditional taxi meters.',
        effectiveness: 'very-effective',
        analysis:
          'Upfront pricing was a key differentiator vs traditional taxis where the final cost was unknown until arrival. By eliminating fare ambiguity, Uber reduced the anxiety of booking a ride and increased conversion dramatically.',
      },
      {
        company: 'Slack',
        product: 'Free Plan Limits',
        url: 'https://slack.com/pricing',
        description:
          'Slack\'s pricing page explicitly shows what the free plan includes and excludes: "90 days of message history", "10 app integrations", and clear limits on each tier with specific numbers.',
        effectiveness: 'effective',
        analysis:
          'By specifying exact limits (90 days, not "limited history"), users can evaluate whether the free plan meets their needs. The clarity about what they lose by not upgrading makes the upgrade decision informed rather than anxious.',
      },
      {
        company: 'Stripe',
        product: 'Pricing Page',
        url: 'https://stripe.com/pricing',
        description:
          'Stripe displays exact pricing per transaction (2.9% + 30 cents) with no monthly fees, no hidden costs, and an interactive calculator showing the exact cost for any transaction amount.',
        effectiveness: 'very-effective',
        analysis:
          'For a payment processor where costs directly impact business margins, eliminating pricing ambiguity is critical. The per-transaction breakdown and calculator let users know exactly what they will pay, which built trust in a category historically plagued by hidden fees.',
      },
    ],

    abTests: [
      {
        title: 'SaaS Pricing: Transparent vs Contact Sales',
        hypothesis:
          'Showing transparent pricing will convert better than gating pricing behind a sales conversation',
        controlVersion: {
          description:
            'Pricing page showing three tiers all labeled "Contact Sales" with feature lists but no prices',
          metrics: {
            conversionRate: '1.8%',
            timeOnPage: '0:45',
            bounceRate: '72%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page showing three tiers with explicit prices ($29, $99, $299/mo), annual discount, and "Start Free Trial" buttons',
          metrics: {
            conversionRate: '5.4%',
            timeOnPage: '2:30',
            bounceRate: '38%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Transparent pricing tripled conversions (1.8% to 5.4%) and cut bounce rate in half. Users spent 3x more time evaluating plans when they could actually see prices. The "Contact Sales" version triggered immediate ambiguity aversion — users assumed pricing was either too expensive or too complicated.',
          learnings: [
            'Hidden pricing triggers ambiguity aversion and immediate bounce',
            'Users spend significantly more time evaluating when information is clear',
            'Even showing price ranges is better than no pricing at all',
            'Self-serve conversion can exceed sales-gated conversion for SMB segments',
          ],
        },
      },
      {
        title: 'E-commerce: Upfront Total vs Progressive Disclosure of Costs',
        hypothesis:
          'Showing estimated total cost (including shipping and tax) on the product page will reduce cart abandonment',
        controlVersion: {
          description:
            'Product page showing only product price ($49.99). Shipping ($7.99) and tax ($4.64) revealed at checkout.',
          metrics: {
            conversionRate: '2.1%',
            cartAbandonmentRate: '71%',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing product price ($49.99) with "Estimated total: $62.62 (includes shipping and tax to your area)" below.',
          metrics: {
            conversionRate: '3.7%',
            cartAbandonmentRate: '48%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Showing estimated total on the product page increased conversion by 76% and reduced cart abandonment by 32%. Even though users saw a higher number sooner, the elimination of cost ambiguity outweighed the sticker shock. Users who reached checkout converted at much higher rates because there were no surprises.',
          learnings: [
            'Cost transparency early in the funnel reduces abandonment more than it reduces add-to-cart',
            'Users prefer knowing the real cost upfront even if it seems higher',
            'Surprise costs at checkout destroy trust and trigger ambiguity-based abandonment',
            'Estimated totals with clear "includes shipping and tax" labels are sufficient — exact pennies are not required',
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
        name: 'Hidden or Missing Pricing',
        description:
          'Pricing is absent, gated behind a form, or labeled "Contact Us" / "Custom Pricing"',
        howToSpot:
          'Look for "Contact Sales", "Request Quote", "Custom Pricing", or complete absence of pricing information',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Vague Feature Descriptions',
        description:
          'Features described with qualitative terms instead of specific numbers or limits',
        howToSpot:
          'Look for words like "generous", "ample", "unlimited*", "advanced", "premium" without concrete specifications',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Cost Components',
        description:
          'Base price shown without shipping, taxes, fees, or total cost estimates',
        howToSpot:
          'Check if the displayed price matches what users will actually pay at checkout',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Ambiguous CTAs',
        description:
          'Buttons or links that don\'t communicate what will happen when clicked',
        howToSpot:
          'Look for generic labels like "Submit", "Continue", "Learn More" without context about the action or outcome',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Fine Print Dependencies',
        description:
          'Critical information (cancellation terms, billing frequency, commitments) hidden in small text or linked documents',
        howToSpot:
          'Check for small, low-contrast text near pricing, CTAs, or sign-up forms that contains material terms',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Sales Gate Pattern',
        description: 'Pricing or key product information requires contacting a salesperson before it is revealed',
        indicators: ['Contact Sales buttons', 'Request a Quote forms', 'Book a Demo as the only path forward', 'No public pricing anywhere on the site'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Progressive Cost Revelation Pattern',
        description: 'Additional costs (shipping, fees, taxes) revealed incrementally through the checkout flow',
        indicators: ['Price changes between product page and cart', 'New line items appearing at checkout', 'Shipping cost calculated only after address entry', 'Tax not estimated until final step'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Vague Specification Pattern',
        description: 'Feature or service descriptions using qualitative rather than quantitative terms',
        indicators: ['Adjectives instead of numbers for limits', 'Asterisks with disclaimers', '"Up to" language without specifying typical', 'Missing SLAs or response time commitments'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Commitment Ambiguity Pattern',
        description: 'Unclear information about what the user is committing to and how to undo it',
        indicators: ['Trial-to-paid conversion without clear timeline', 'Cancellation process not described', 'Billing frequency unclear', 'Auto-renewal terms buried or absent'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Can users see exact pricing without contacting anyone?',
      'Are all costs (shipping, taxes, fees) shown before the user commits?',
      'Do feature descriptions use specific numbers rather than vague adjectives?',
      'Do CTAs clearly communicate what happens when clicked?',
      'Are cancellation and refund terms prominently displayed?',
      'Can users compare plans or products with concrete, specific information?',
      'Is billing frequency and commitment length clearly stated?',
      'Are there any "Contact Us for pricing" patterns that could be replaced with transparent pricing?',
      'Do delivery or service timelines use specific dates rather than vague ranges?',
      'Is any critical information hidden in fine print, tooltips, or linked documents?',
      'Would a first-time visitor understand exactly what they get and what they pay?',
      'Are there asterisks or disclaimers that undermine the clarity of primary claims?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the ambiguity effect (ambiguity aversion).

Analyze the provided design for ambiguity effect patterns. Identify:

1. **Pricing Clarity**: Whether pricing is transparent, partially hidden, or completely gated
2. **Feature Specification**: Whether features use specific numbers or vague qualitative terms
3. **Cost Transparency**: Whether all costs (shipping, fees, taxes) are shown upfront
4. **CTA Clarity**: Whether calls-to-action communicate what will happen next
5. **Commitment Terms**: Whether subscription, cancellation, and refund terms are clear

For each ambiguity pattern found:
- Identify the specific information gap
- Assess how much uncertainty it creates for the user
- Determine the likely behavioral impact (bounce, abandonment, hesitation)
- Evaluate whether the ambiguity is intentional or accidental
- Suggest a specific, concrete fix

Consider:
- Would a first-time visitor understand exactly what they're getting and paying?
- Are there any "Contact Us" patterns where transparent pricing would work better?
- Do feature descriptions use specific numbers or vague adjectives?
- Are there hidden costs that users will discover later in the flow?
- Is the cancellation/refund policy clear and prominent?

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
              informationGap: { type: 'string' },
              uncertaintyLevel: { type: 'string' },
              behavioralImpact: { type: 'string' },
              intentional: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'informationGap',
              'uncertaintyLevel',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            pricingClarity: { type: 'number' },
            featureSpecificity: { type: 'number' },
            costTransparency: { type: 'number' },
            ctaClarity: { type: 'number' },
            commitmentClarity: { type: 'number' },
          },
          required: [
            'pricingClarity',
            'featureSpecificity',
            'costTransparency',
            'ctaClarity',
            'commitmentClarity',
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
        title: 'Audit All Information Gaps',
        description:
          'Identify every point in the user journey where information is missing, vague, or requires extra effort to find',
        example:
          'Map the journey from landing page to purchase: pricing page has "Contact Sales", feature limits say "generous", shipping is revealed only at checkout',
        tips: [
          'Walk through the experience as a first-time visitor',
          'Note every question you have that isn\'t immediately answered',
          'Pay special attention to pricing, features, timelines, and commitments',
        ],
      },
      {
        step: 2,
        title: 'Quantify Everything Possible',
        description:
          'Replace every vague description with specific numbers, dates, and concrete terms',
        example:
          'Change "generous storage" to "50GB storage", "fast support" to "4-hour response time", "ships soon" to "Arrives March 25-27"',
        tips: [
          'If you can count it, show the number',
          'Use calendar dates instead of relative timeframes where possible',
          'Specify what "unlimited" actually means in practice',
        ],
      },
      {
        step: 3,
        title: 'Show All Costs Upfront',
        description:
          'Display the total cost including all fees, taxes, and shipping as early as possible in the flow',
        example:
          'Product page shows: "$49.99 + ~$7.99 shipping. Estimated total: $62.62 to your area"',
        tips: [
          'Use geolocation or zip code to estimate tax early',
          'Show shipping cost on the product page, not just at checkout',
          'If exact costs are unknown, show estimated ranges',
        ],
      },
      {
        step: 4,
        title: 'Make CTAs Specific and Predictable',
        description:
          'Ensure every button and link communicates exactly what will happen when clicked',
        example:
          'Change "Submit" to "Create Account — Free", change "Learn More" to "See All 24 Features"',
        tips: [
          'Include the outcome in the button label',
          'Specify if an action is free, reversible, or commits the user',
          'Add context below CTAs when the button text isn\'t enough',
        ],
      },
      {
        step: 5,
        title: 'Explicitly State Terms and Commitments',
        description:
          'Make cancellation, refund, billing, and commitment terms prominent — not hidden in fine print',
        example:
          'Below pricing: "Cancel anytime with one click. No cancellation fee. Unused time is refunded."',
        tips: [
          'Place commitment terms near the decision point, not in a separate FAQ',
          'Use normal-sized, readable text — not fine print',
          'State both what happens and how to do it (e.g., "Cancel in Settings > Billing")',
        ],
      },
    ],

    dos: [
      'Show exact pricing wherever possible, including all fees and taxes',
      'Use specific numbers for all feature limits (storage, users, API calls)',
      'Provide specific delivery dates rather than vague timeframes',
      'Make CTAs describe exactly what happens when clicked',
      'State cancellation and refund terms prominently near sign-up actions',
      'Include "What\'s Included" and "What\'s Not Included" sections',
      'Show pricing ranges or starting prices when exact pricing requires customization',
      'Use interactive calculators so users can see their specific cost',
      'Provide FAQ sections that address common uncertainties at the decision point',
      'Label free trials with clear terms: duration, what happens after, how to cancel',
    ],

    donts: [
      'Don\'t hide pricing behind "Contact Sales" when self-serve pricing is feasible',
      'Don\'t use vague feature descriptions like "generous", "ample", or "premium"',
      'Don\'t reveal shipping costs, taxes, or fees only at checkout',
      'Don\'t use generic CTAs like "Submit" or "Continue" without context',
      'Don\'t bury cancellation terms in legal documents or fine print',
      'Don\'t auto-enroll users in paid plans without clear, prominent notice',
      'Don\'t use asterisks and footnotes for material terms — state them directly',
      'Don\'t make users calculate totals themselves from component prices',
      'Don\'t describe timelines with relative terms ("soon", "quickly") when dates are available',
      'Don\'t assume users will read terms and conditions to find critical information',
    ],

    bestPractices: [
      {
        title: 'One Price, Everything Included',
        description:
          'Where possible, offer a single transparent price that includes all costs with no surprises',
        rationale:
          'The simplest way to eliminate ambiguity is to eliminate complexity — a single all-inclusive price removes every information gap',
        example:
          'Basecamp\'s "$99/month flat — everything included, unlimited users" eliminates all pricing ambiguity',
      },
      {
        title: 'Show the Math',
        description:
          'When pricing has components, show the calculation so users can verify the total',
        rationale:
          'Visible calculations build trust by demonstrating transparency and letting users verify fairness',
        example:
          '"5 users x $10/user = $50/mo + $4.25 tax = $54.25/mo total" is more trustworthy than just "$54.25/mo"',
      },
      {
        title: 'Anchor Clarity with Comparisons',
        description:
          'Use side-by-side comparisons with specific values to make differences between options concrete',
        rationale:
          'When users can see exact differences, they can make informed choices without uncertainty',
        example:
          'Feature tables with specific numbers in every cell, not checkmarks or vague labels',
      },
      {
        title: 'Address Objections Proactively',
        description:
          'Anticipate and answer user questions before they become barriers',
        rationale:
          'Every unasked question is an information gap that triggers ambiguity aversion',
        example:
          'Near the CTA: "No credit card required. Cancel anytime. Takes 30 seconds to sign up."',
      },
      {
        title: 'Use Delivery Dates, Not Timeframes',
        description:
          'Convert relative shipping estimates into specific calendar dates',
        rationale:
          '"3-5 business days" requires mental calculation and creates uncertainty; "March 25" is concrete and clear',
        example:
          'Amazon\'s "Get it by Wednesday" outperforms generic "Ships in 3-5 days"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Critical pricing, feature, and commitment information must be programmatically determinable',
        implementation:
          'Use proper table markup for feature comparisons, semantic HTML for pricing, and ARIA labels for interactive pricing calculators',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - All pricing, terms, and disclaimers must meet minimum contrast requirements',
        implementation:
          'Fine print, footnotes, and disclaimer text must meet 4.5:1 contrast ratio — not be rendered in light gray on white',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use descriptive headings to help users find pricing and feature information',
        implementation:
          'Label sections clearly: "Pricing", "What\'s Included", "Cancellation Policy" so all users can navigate to answers quickly',
      },
      {
        wcagLevel: 'A',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for forms that lead to commitments',
        implementation:
          'Before sign-up or purchase forms, clearly state what the user is committing to, what information is required, and what happens next',
      },
    ],

    ethics: [
      {
        concern: 'Intentional Ambiguity for Profit',
        severity: 'critical',
        explanation:
          'Deliberately hiding pricing, fees, or terms to get users past a commitment point before revealing the true cost',
        mitigation:
          'Show all costs and commitments upfront. If pricing requires a conversation, explain why and provide ranges or examples.',
      },
      {
        concern: 'Dark Pattern Subscriptions',
        severity: 'critical',
        explanation:
          'Using ambiguous trial terms to auto-enroll users in paid subscriptions they didn\'t clearly agree to',
        mitigation:
          'State trial duration, post-trial price, and cancellation process in plain language at normal text size. Send reminders before charging.',
      },
      {
        concern: 'Misleading "Unlimited" Claims',
        severity: 'high',
        explanation:
          'Advertising features as "unlimited" when fair use policies or throttling apply',
        mitigation:
          'If limits exist in practice, state them. Replace "unlimited*" with specific generous limits that reflect reality.',
      },
      {
        concern: 'Exploiting Information Asymmetry',
        severity: 'high',
        explanation:
          'Leveraging the fact that users don\'t know what to ask about to hide unfavorable terms',
        mitigation:
          'Proactively disclose all material terms. Use "What You Should Know" sections that address common concerns before users have to search.',
      },
      {
        concern: 'Competitive Disadvantage Rationalization',
        severity: 'medium',
        explanation:
          'Hiding pricing or terms because "competitors don\'t show theirs either" rather than leading with transparency',
        mitigation:
          'Transparency is a competitive advantage, not a disadvantage. Companies that lead with clarity build trust and convert better.',
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
        author: 'Ellsberg, D.',
        year: 1961,
        doi: '10.2307/1884324',
        description:
          'The foundational paper introducing the Ellsberg Paradox and demonstrating that people systematically avoid ambiguous probabilities',
        type: 'foundational',
      },
      {
        title: 'Ambiguity Aversion and Comparative Ignorance',
        author: 'Fox, C. R., & Tversky, A.',
        year: 1995,
        doi: '10.2307/2946693',
        description:
          'Demonstrates that ambiguity aversion increases when people can compare ambiguous options to unambiguous ones — the comparative ignorance hypothesis',
        type: 'foundational',
      },
      {
        title: 'A Smooth Model of Decision Making under Ambiguity',
        author: 'Klibanoff, P., Marinacci, M., & Mukerji, S.',
        year: 2005,
        doi: '10.1111/j.1468-0262.2005.00640.x',
        description:
          'Formal model of how ambiguity aversion affects economic decision-making',
        type: 'advanced',
      },
      {
        title: 'Ambiguity Attitudes in a Large Representative Sample',
        author: 'Dimmock, S. G., Kouwenberg, R., & Wakker, P. P.',
        year: 2016,
        doi: '10.1287/mnsc.2015.2198',
        description:
          'Large-scale study measuring ambiguity aversion across demographics, confirming its prevalence as a robust cognitive bias',
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
          'Covers ambiguity aversion as part of the broader framework of cognitive biases and heuristics in decision-making',
        type: 'foundational',
      },
      {
        title: 'Against the Gods: The Remarkable Story of Risk',
        author: 'Bernstein, Peter L.',
        year: 1996,
        isbn: '9780471295631',
        description:
          'Historical context for how humans understand and respond to uncertainty and ambiguity in decision-making',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Practical examples of how ambiguity and uncertainty affect consumer decisions in everyday contexts',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Reducing Uncertainty in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/uncertainty/',
        description:
          'Practical guide to identifying and reducing uncertainty in user interfaces, with examples and design patterns',
        type: 'practical',
      },
      {
        title: 'The Psychology Behind Why We Abandon Our Shopping Carts',
        author: 'Baymard Institute',
        url: 'https://baymard.com/lists/cart-abandonment-rate',
        description:
          'Research showing that unexpected costs (ambiguity in pricing) are the #1 reason for cart abandonment',
        type: 'case-study',
      },
    ],

    videos: [
      {
        title: 'The Ellsberg Paradox Explained',
        author: 'Decision Lab',
        url: 'https://thedecisionlab.com/biases/ambiguity-effect',
        description:
          'Clear explanation of the Ellsberg Paradox and its implications for decision-making',
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
      'loss-aversion', // Fear of unknown loss amplifies ambiguity aversion
      'status-quo-bias', // Preferring the known default over uncertain alternatives
      'certainty-effect', // Overweighting certain outcomes, avoiding ambiguous ones
      'framing-effect', // How options are framed affects perceived ambiguity
    ],

    conflicts: [
      'curiosity-gap', // Ambiguity can drive curiosity in some contexts
      'information-bias', // Wanting more information vs avoiding ambiguous situations
    ],

    confusedWith: [
      'risk-aversion', // Ambiguity aversion is about unknown probabilities, not known risks
      'loss-aversion', // Related but loss aversion is about magnitude, ambiguity about uncertainty
      'uncertainty-effect', // Similar but uncertainty effect specifically devalues uncertain outcomes
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'ellsberg-paradox',
        'competence-hypothesis',
      ],
    },
  },
};
