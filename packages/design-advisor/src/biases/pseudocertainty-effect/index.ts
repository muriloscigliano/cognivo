/**
 * PSEUDOCERTAINTY EFFECT
 *
 * People make risk-averse choices in multi-stage gambles by treating
 * conditional probabilities as certain.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const pseudocertaintyEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'pseudocertainty-effect',
    name: 'Pseudocertainty Effect',
    aliases: ['Pseudo-Certainty Effect', 'Isolation Effect in Multi-Stage Gambles'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'risk-perception',
      'multi-stage-decisions',
      'conditional-probability',
      'pricing',
      'commitment',
      'framing',
      'prospect-theory',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People treat conditional outcomes as certain when decisions are broken into multiple stages, becoming risk-averse about gains they haven\'t actually secured.',

    detailed: `The Pseudocertainty Effect is a cognitive bias where people make risk-averse choices in multi-stage decision problems by treating conditional probabilities as if they were certain. When a decision is decomposed into sequential stages, people evaluate each stage in isolation, ignoring the probabilistic nature of reaching that stage in the first place.

For example, if a two-stage gamble offers a 25% chance to advance to stage 2, and then a choice between a sure $30 or an 80% chance of $45, most people choose the "sure" $30--even though the overall probability of receiving it is only 25% (not certain at all). They mentally collapse the conditional probability, treating "certain within stage 2" as genuinely certain.

In UX and product design, this bias is exploited whenever a process is broken into steps that make each stage feel like a guaranteed outcome: multi-step checkout flows, staged pricing reveals, progressive commitment sequences, and conditional discount structures all leverage pseudocertainty to increase conversion and reduce perceived risk.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman and Amos Tversky',
      year: 1984,
      theory: 'Prospect Theory / Cumulative Prospect Theory',
      mechanism: `People evaluate multi-stage decisions by isolating each stage and ignoring prior conditional probabilities. This occurs because:

1. **Stage Isolation**: The brain evaluates each decision stage independently rather than computing joint probabilities across stages
2. **Certainty Overweighting**: Prospect theory shows people overweight outcomes perceived as certain (the "certainty effect"); when a stage frames an outcome as "guaranteed," this overweighting kicks in
3. **Sequential Simplification**: Faced with compound probabilities, people simplify by treating each step as its own self-contained choice
4. **Framing Dependence**: The same overall probability distribution can produce different choices depending on whether it is presented as a single gamble or decomposed into sequential stages
5. **Loss Aversion at Each Gate**: At every stage, people treat what they "have" (conditional on reaching that stage) as an endowment, triggering loss aversion about giving it up for a risky option`,
    },

    realWorldExample: `Kahneman and Tversky (1984) presented participants with a two-stage game. In stage 1, there was a 75% chance of ending with nothing and a 25% chance of advancing to stage 2. In stage 2, participants chose between a sure gain of $30 or an 80% chance of $45. The majority chose the "sure" $30--even though the actual probability of getting $30 was only 25% (0.25 x 1.0 = 0.25), which is nearly identical to the expected probability of the risky option (0.25 x 0.80 = 0.20 chance of $45). When the same probabilities were presented as a single-stage gamble (25% chance of $30 vs 20% chance of $45), preferences reversed. The multi-stage framing created an illusion of certainty that did not actually exist.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Pseudocertainty Effect profoundly affects how users perceive risk, value, and commitment in multi-step interfaces. By decomposing a decision into sequential stages, designers can make each step feel safe and certain--even when the overall outcome remains probabilistic. This can be used ethically to reduce anxiety in legitimate processes, or unethically to obscure true costs and commitments. Key applications include:

- Multi-step checkout flows where each step feels like progress toward a guaranteed outcome
- Staged pricing reveals that make each tier feel like a locked-in deal
- Progressive commitment sequences where users invest incrementally
- Conditional discount structures ("If you buy X, you're guaranteed Y% off Z")
- Tiered loyalty programs where each level feels like a secured benefit`,

    whenToUse: [
      {
        title: 'Multi-Step Checkout Flows',
        scenario:
          'When guiding users through a complex purchase or sign-up process',
        example:
          'Break checkout into clear stages (cart -> shipping -> payment -> confirmation) so each completed step feels like secured progress',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Staged Pricing Reveals',
        scenario:
          'When presenting tiered or conditional pricing structures',
        example:
          'Show base price as "locked in" at step 1, then present add-ons as separate certain-feeling decisions at step 2',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Progressive Onboarding',
        scenario:
          'When onboarding users into a product with increasing commitment levels',
        example:
          'Free trial -> basic plan -> premium upgrade, where each transition feels like a guaranteed improvement rather than a gamble',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Conditional Guarantees',
        scenario:
          'When offering benefits contingent on user actions',
        example:
          '"Complete your profile and get a guaranteed 20% discount on your first order"--the discount feels certain even though completing the profile is a prerequisite',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Loyalty Program Tiers',
        scenario:
          'When designing tiered reward systems with progressive benefits',
        example:
          'Each tier (Silver -> Gold -> Platinum) frames its benefits as locked-in guarantees, masking the effort/spending required to maintain status',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Financial Product Decisions',
        reason:
          'Multi-stage framing can obscure actual investment risk and probability of returns',
        consequence:
          'Users may commit to financial products without understanding the true probability of outcomes, leading to financial harm',
        alternative:
          'Present overall probability distributions clearly; show joint probabilities, not just conditional ones',
      },
      {
        title: 'Insurance and Warranty Upsells',
        reason:
          'Staged presentation of insurance options can make coverage feel more certain than it is',
        consequence:
          'Users purchase unnecessary coverage because conditional benefits feel guaranteed',
        alternative:
          'Clearly state coverage conditions, exclusions, and the actual probability of needing the coverage',
      },
      {
        title: 'Health and Medical Decisions',
        reason:
          'Breaking treatment plans into stages can make each step feel certain when outcomes remain probabilistic',
        consequence:
          'Patients may not appreciate the cumulative uncertainty across treatment stages',
        alternative:
          'Present overall treatment success rates alongside stage-by-stage information',
      },
      {
        title: 'Subscription Traps',
        reason:
          'Multi-step sign-up flows can create pseudocertainty about cancellation ease or price locks',
        consequence:
          'Users feel locked in and resentful when "guaranteed" terms change',
        alternative:
          'Be transparent about renewal terms, price changes, and cancellation process from the start',
      },
    ],

    commonMistakes: [
      {
        title: 'Too Many Stages',
        description:
          'Breaking a simple decision into too many steps to artificially create pseudocertainty',
        why: 'Excessive stages create friction and fatigue, and savvy users recognize the manipulation',
        fix: 'Use only as many stages as the decision naturally requires; each stage should provide genuine value or information',
      },
      {
        title: 'Inconsistent Stage Framing',
        description:
          'Framing some stages as certain and others as probabilistic within the same flow',
        why: 'Inconsistency breaks the illusion and makes users question all stages',
        fix: 'Maintain consistent certainty framing across all stages, or be transparent about uncertainty throughout',
      },
      {
        title: 'Hiding Conditional Requirements',
        description:
          'Making benefits seem guaranteed without clearly communicating the conditions required to receive them',
        why: 'Users feel deceived when they discover their "guaranteed" benefit has undisclosed prerequisites',
        fix: 'Clearly state conditions upfront: "When you reach Gold status, you\'ll receive X" rather than "You\'ll receive X"',
      },
      {
        title: 'Ignoring Stage Dropout',
        description:
          'Failing to account for users who drop out between stages, leaving them with a false sense of what they secured',
        why: 'Users who abandon mid-flow may believe they locked in benefits from earlier stages',
        fix: 'Clearly communicate what happens if the process is not completed, and which commitments persist',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout and flow structure determine how stages are perceived and whether outcomes feel certain',
        examples: [
          'Progress bars create a sense of secured advancement through stages',
          'Step-by-step wizards isolate each decision, enhancing pseudocertainty',
          'Confirmation screens between stages reinforce the feeling of locked-in progress',
          'Visual separation between stages encourages isolated evaluation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing at each stage shapes perception of certainty vs conditionality',
        examples: [
          '"Your price is locked in" language creates certainty perception',
          'Conditional language ("if", "when", "upon") signals uncertainty if used prominently',
          'Bold confirmation text at each stage reinforces pseudocertainty',
          'Fine-print conditions undermine the certainty framing if noticed',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals reinforce certainty (green checkmarks) or uncertainty (amber warnings) at each stage',
        examples: [
          'Green checkmarks on completed stages signal secured outcomes',
          'Blue/neutral colors for current stage maintain calm decision-making',
          'Gray for future stages reduces anxiety about upcoming decisions',
          'Red/amber for expiring offers creates urgency within a certainty frame',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users evaluate stages in isolation or as a connected whole',
        examples: [
          'Click-to-advance interactions create deliberate stage transitions',
          'Auto-saving between stages reinforces the feeling of secured progress',
          'Back buttons that preserve earlier choices maintain pseudocertainty of prior stages',
          'Confirmation modals at each stage create "point of no return" certainty feelings',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content determines whether conditional probabilities are communicated accurately or collapsed into false certainties',
        examples: [
          '"You\'ve secured your spot" language before payment creates pseudocertainty',
          '"Guaranteed savings" for conditional discounts masks prerequisites',
          'Stage summaries showing "what you\'ve locked in" reinforce the effect',
          'Terms and conditions that clarify conditionality can counteract the effect',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen readers and keyboard navigation may present multi-stage flows differently, affecting pseudocertainty perception',
        examples: [
          'Screen reader users may encounter stage information linearly, reducing stage isolation',
          'Progress indicators must be accessible so all users perceive stage completion',
          'Conditional terms must be announced, not hidden in visual-only styling',
          'Keyboard navigation through stages should maintain consistent certainty framing',
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
        title: 'Transparent Multi-Step Checkout',
        description:
          'E-commerce checkout that uses stages to reduce complexity while maintaining transparency about what is and isn\'t confirmed',
        code: `<div class="checkout-flow">
  <div class="progress-bar">
    <div class="step completed">
      <span class="check">&#10003;</span>
      <span>Cart Reviewed</span>
    </div>
    <div class="step active">
      <span class="number">2</span>
      <span>Shipping</span>
    </div>
    <div class="step upcoming">
      <span class="number">3</span>
      <span>Payment</span>
    </div>
  </div>

  <div class="stage-content">
    <h3>Shipping Details</h3>
    <p class="reassurance">Your cart items are reserved for 15 minutes.</p>
    <form>
      <label>Address</label>
      <input type="text" />
      <p class="note">Shipping costs calculated after address entry.
      Final total shown before payment.</p>
    </form>
  </div>

  <div class="stage-summary">
    <h4>So far:</h4>
    <p>Subtotal: $89.99</p>
    <p class="conditional">Shipping: Calculated next</p>
    <p class="conditional">Tax: Calculated at payment</p>
    <p class="note">Nothing is charged until you confirm payment.</p>
  </div>
</div>`,
        explanation:
          'Each stage provides a sense of progress and security (items reserved, subtotal confirmed) while being transparent about what remains conditional (shipping costs, tax, final charge). This uses pseudocertainty ethically--stages reduce complexity without hiding uncertainty.',
        principle:
          'Break complex processes into stages that feel secure while remaining transparent about conditional elements',
        metrics: {
          before: '34% checkout completion with single-page checkout',
          after: '52% checkout completion with transparent multi-stage flow',
          improvement: '53% increase in checkout completion rate',
        },
      },
      {
        title: 'Staged Pricing with Clear Conditions',
        description:
          'SaaS pricing that uses tiered progression while clearly communicating what each tier guarantees',
        code: `<div class="pricing-progression">
  <div class="tier current">
    <h3>Free Tier</h3>
    <p class="status">&#10003; You have this</p>
    <ul>
      <li>5 projects</li>
      <li>1 GB storage</li>
      <li>Community support</li>
    </ul>
  </div>

  <div class="tier upgrade">
    <h3>Pro - $29/mo</h3>
    <p class="guarantee">Everything in Free, plus:</p>
    <ul>
      <li>Unlimited projects</li>
      <li>50 GB storage</li>
      <li>Priority support</li>
    </ul>
    <p class="condition">Billed monthly. Cancel anytime.
    Your Free tier features are always available.</p>
    <button class="primary">Upgrade to Pro</button>
  </div>

  <div class="tier premium">
    <h3>Enterprise - Custom</h3>
    <p class="guarantee">Everything in Pro, plus:</p>
    <ul>
      <li>SSO &amp; SAML</li>
      <li>Dedicated support</li>
      <li>Custom integrations</li>
    </ul>
    <p class="condition">Annual commitment required.
    Contact us for pricing.</p>
  </div>
</div>`,
        explanation:
          'Each tier builds on the previous one, creating a sense of secured progression ("Everything in Free, plus..."). The conditions for each tier are clearly stated (monthly billing, annual commitment), preventing deceptive pseudocertainty while still leveraging staged progression to reduce upgrade anxiety.',
        principle:
          'Use staged progression to reduce perceived risk of upgrading while being clear about conditions at each stage',
      },
      {
        title: 'Progressive Commitment with Honest Framing',
        description:
          'Onboarding flow that builds commitment gradually with clear expectations at each stage',
        code: `<div class="onboarding-flow">
  <div class="stage completed">
    <h4>&#10003; Account Created</h4>
    <p>Your free account is ready. No credit card needed.</p>
  </div>

  <div class="stage active">
    <h4>Step 2: Set Up Your Workspace</h4>
    <p>Customize your workspace to get the most out of your trial.</p>
    <div class="incentive">
      <p><strong>Complete setup to unlock:</strong></p>
      <ul>
        <li>14-day extended trial (vs standard 7-day)</li>
        <li>Access to templates library</li>
      </ul>
      <p class="clarification">These extras are available during
      your trial period. Keeping them requires a paid plan.</p>
    </div>
  </div>
</div>`,
        explanation:
          'The onboarding uses staged commitment (account -> workspace setup) with conditional incentives (extended trial, templates). Critically, it clarifies that the "unlocked" benefits are trial-period benefits, preventing users from assuming they are permanently secured.',
        principle:
          'Conditional incentives in multi-stage flows should clearly state their conditions and duration',
      },
    ],

    bad: [
      {
        title: 'Deceptive "Locked-In" Pricing',
        description:
          'Multi-step purchase flow that creates false certainty about price',
        code: `<!-- DON'T DO THIS -->
<div class="booking-flow">
  <div class="step-1">
    <h3>Great news! Your rate is locked in!</h3>
    <p class="price">$99/night</p>
    <p>This rate is guaranteed for you.</p>
    <button>Continue to Book</button>
  </div>

  <!-- After clicking Continue... -->
  <div class="step-2" hidden>
    <h3>Almost done! Just a few extras:</h3>
    <p>Resort fee: $45/night</p>
    <p>Cleaning fee: $75</p>
    <p>Service fee: $32</p>
    <p class="small">Total: $251/night</p>
  </div>
</div>`,
        explanation:
          'Step 1 creates pseudocertainty about the $99 rate being "locked in" and "guaranteed." Step 2 reveals mandatory fees that more than double the actual cost. Users feel deceived because the certainty framing in step 1 was designed to obscure the true total.',
        principle:
          'Never use staged reveals to hide mandatory costs behind a pseudocertain "locked-in" price',
      },
      {
        title: 'Conditional Discount Trap',
        description:
          'Discount that feels guaranteed but has hidden conditions',
        code: `<!-- DON'T DO THIS -->
<div class="promo-flow">
  <div class="banner">
    <h2>You've earned 30% off!</h2>
    <p>Your exclusive discount is secured.</p>
    <button>Claim Your Discount</button>
  </div>

  <!-- After clicking... -->
  <div class="conditions" hidden>
    <p>To use your 30% discount:</p>
    <ul>
      <li>Minimum purchase of $200</li>
      <li>Excludes sale items</li>
      <li>Must use within 24 hours</li>
      <li>Cannot combine with other offers</li>
      <li>First-time customers only</li>
    </ul>
  </div>
</div>`,
        explanation:
          'The banner creates pseudocertainty ("You\'ve earned", "secured") about a discount that is actually heavily conditional. Users who click expecting a straightforward 30% off encounter multiple restrictions, eroding trust.',
        principle:
          'Conditional benefits must disclose their conditions before creating certainty framing, not after',
      },
      {
        title: 'False Progress in Subscription Signup',
        description:
          'Subscription flow that makes cancellation feel guaranteed when it is not',
        code: `<!-- DON'T DO THIS -->
<div class="signup-flow">
  <div class="step completed">
    <p>&#10003; Free trial activated</p>
  </div>
  <div class="step completed">
    <p>&#10003; Cancel anytime - guaranteed</p>
  </div>
  <div class="step active">
    <p>Enter payment method to start</p>
    <input type="text" placeholder="Card number" />
    <p class="tiny">By entering payment, you agree to automatic
    renewal at $49.99/mo after trial. Cancellation requires
    calling support between 9am-5pm EST.</p>
  </div>
</div>`,
        explanation:
          'The progress indicators create pseudocertainty about easy cancellation ("Cancel anytime - guaranteed" shown as a completed step). The actual cancellation process, buried in fine print, requires calling support during limited hours--far from the "guaranteed anytime" framing.',
        principle:
          'Never frame conditional processes as completed certainties in progress indicators',
      },
    ],

    realWorld: [
      {
        company: 'Insurance Industry',
        product: 'Multi-Stage Policy Framing',
        description:
          'Insurance companies present policies in stages: "If you\'re in an accident (Stage 1), your deductible is $500 and we cover the rest (Stage 2)." This makes the coverage feel certain at the second stage, even though the overall expected value depends on the probability of Stage 1 occurring and various exclusions that may apply.',
        effectiveness: 'very-effective',
        analysis:
          'By isolating the coverage decision from the probability of needing it, insurers make policies feel more valuable than their expected value. Customers focus on "certain" coverage in Stage 2 rather than the probability of reaching Stage 2 and the conditional exclusions.',
      },
      {
        company: 'Airlines',
        product: 'Tiered Fare Booking',
        description:
          'Airlines break ticket purchases into stages: base fare (feels locked in), then seat selection, baggage, meals, and priority boarding as separate "guaranteed add-ons." Each stage feels like securing a certain benefit, even though the overall cost can double and some benefits are conditional on availability.',
        effectiveness: 'effective',
        analysis:
          'The staged reveal transforms what could be a single sticker-shock price into a series of smaller "certain" decisions. Each add-on feels like locking in a guarantee, leveraging pseudocertainty to increase ancillary revenue.',
      },
      {
        company: 'Investment Platforms',
        product: 'Multi-Stage Investment Products',
        description:
          'Structured investment products often frame returns in stages: "Your principal is protected (Stage 1), and if the market rises above X% (Stage 2), you receive a guaranteed 8% return." The "guaranteed return" in Stage 2 feels certain, masking that reaching Stage 2 itself is probabilistic.',
        effectiveness: 'effective',
        analysis:
          'Investors overweight the Stage 2 "guaranteed return" and underweight the probability of the market condition being met. This is a textbook pseudocertainty effect application that has drawn regulatory scrutiny in multiple jurisdictions.',
      },
      {
        company: 'E-commerce Platforms',
        product: 'Conditional Free Shipping',
        description:
          'Many retailers use staged cart experiences: "You\'re $15 away from FREE shipping!" Once the threshold is reached, the free shipping feels like a secured, guaranteed benefit--even though it is conditional on completing the purchase, using standard delivery, and shipping to eligible addresses.',
        effectiveness: 'very-effective',
        analysis:
          'The progress bar toward free shipping creates pseudocertainty that the benefit is "locked in" once the threshold is crossed. This drives average order value increases of 15-30% as users add items to "secure" the shipping benefit.',
      },
    ],

    abTests: [
      {
        title: 'Single-Stage vs Multi-Stage Upgrade Flow',
        hypothesis:
          'Breaking the upgrade decision into stages will increase conversion by creating pseudocertainty at each step',
        controlVersion: {
          description:
            'Single page showing all plan details, pricing, and commitment requirements at once: "Pro plan: $49/mo, annual billing, includes X, Y, Z features"',
          metrics: {
            conversionRate: '8.2%',
            timeOnPage: '2:45',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Multi-stage flow: Step 1 shows features ("Lock in Pro features"), Step 2 shows pricing ("Your Pro price: $49/mo"), Step 3 confirms billing ("Confirm your plan")',
          metrics: {
            conversionRate: '14.1%',
            timeOnPage: '4:10',
            scrollDepth: '89%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The multi-stage flow increased conversion by 72%. Users reported feeling "more confident" about each decision when it was isolated. Stage-by-stage completion created a sense of secured progress that reduced abandonment at each step.',
          learnings: [
            'Staged decisions feel less risky than all-at-once presentations',
            'Each completed stage creates sunk-cost momentum toward final conversion',
            'Users who completed Stage 1 (feature review) converted at 3x the rate of single-page viewers',
            'Transparency about conditions at each stage did not reduce the pseudocertainty benefit',
          ],
        },
      },
      {
        title: 'Conditional vs Unconditional Discount Framing',
        hypothesis:
          'Framing a discount as "secured" in a multi-stage flow will increase redemption vs stating all conditions upfront',
        controlVersion: {
          description:
            'Single banner: "Get 20% off orders over $100, excludes sale items, valid this week only"',
          metrics: {
            conversionRate: '6.1%',
            averageOrderValue: '$112',
            clickThroughRate: '15%',
          },
        },
        treatmentVersion: {
          description:
            'Stage 1: "You\'ve unlocked 20% off!" Stage 2 (on click): "Apply to your cart of $100+ (excluding sale items). Offer ends Sunday."',
          metrics: {
            conversionRate: '11.3%',
            averageOrderValue: '$134',
            clickThroughRate: '28%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The staged framing nearly doubled conversion (85% increase) and increased AOV by 20%. Users perceived the discount as more valuable when it was "unlocked" first and conditions revealed second, even though the same information was communicated.',
          learnings: [
            'Pseudocertainty of "unlocking" a benefit increases perceived value',
            'Conditions revealed after initial certainty framing are more accepted than conditions presented upfront',
            'AOV increased because users added items to meet the threshold after feeling the discount was "theirs"',
            'Long-term trust metrics showed no negative impact when conditions were reasonable and clearly stated at Stage 2',
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
        name: 'Progress Indicators',
        description:
          'Step-by-step progress bars or wizards that frame each stage as a completed, secured outcome',
        howToSpot:
          'Look for numbered steps, checkmarks on completed stages, and progress bars that imply locked-in achievement',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Certainty Language',
        description:
          'Words like "locked in," "secured," "guaranteed," or "confirmed" used for outcomes that are actually conditional',
        howToSpot:
          'Check if "guaranteed" benefits have undisclosed prerequisites, time limits, or conditions',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Staged Price Reveals',
        description:
          'Prices shown incrementally across multiple screens rather than as a clear total upfront',
        howToSpot:
          'Track whether the total cost is knowable at step 1, or if mandatory fees appear in later steps',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Conditional Benefits Framed as Earned',
        description:
          'Benefits described as "unlocked" or "earned" that require further action or conditions to actually receive',
        howToSpot:
          'Check whether "unlocked" rewards require additional purchases, time commitments, or specific conditions to claim',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Separated Conditions and Benefits',
        description:
          'Benefits displayed prominently while conditions are in fine print, separate screens, or collapsed sections',
        howToSpot:
          'Look for visual separation between what users "get" and what is required to actually receive it',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Multi-Stage Commitment Pattern',
        description:
          'Decisions decomposed into sequential stages where each stage creates a sense of irrevocable progress',
        indicators: [
          'Step-by-step wizards with "completion" indicators',
          'Auto-save between steps reinforcing permanence',
          '"You\'ve completed step X" confirmation messages',
          'Inability to easily return to or modify earlier stages',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Conditional Certainty Pattern',
        description:
          'Benefits presented as certain within one stage, even though reaching that stage was probabilistic or conditional',
        indicators: [
          '"Guaranteed" language for conditional outcomes',
          'Benefits shown without their prerequisites',
          '"If you X, you\'ll definitely get Y" framing',
          'Stage-specific certainty that ignores overall probability',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Drip Pricing Pattern',
        description:
          'Base price shown first as "your price," with mandatory fees and add-ons revealed in subsequent stages',
        indicators: [
          'Increasing totals across checkout stages',
          'Fees labeled as "required" appearing after initial price commitment',
          'Separate screens for base price vs taxes/fees/surcharges',
          '"Starting at" pricing that does not reflect actual minimum cost',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Progressive Lock-In Pattern',
        description:
          'Each stage increases user investment (time, data, customization) making abandonment feel like a loss',
        indicators: [
          'Extensive form-filling before price reveal',
          'Customization steps before commitment terms',
          'Time investment before conditions are shown',
          'Data entry that creates switching costs',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is a multi-stage process being used where a single-stage presentation would be more transparent?',
      'Are benefits described as "guaranteed" or "locked in" when they are actually conditional?',
      'Does the user know the full cost/commitment at the first stage, or are costs revealed incrementally?',
      'Are conditions for benefits shown at the same stage as the benefits themselves?',
      'Could a user reasonably believe they have secured something they haven\'t actually secured yet?',
      'Is the probability of reaching later stages communicated or ignored?',
      'Are progress indicators creating a false sense of irrevocable advancement?',
      'Would presenting the same information in a single stage change user decisions?',
      'Are conditional discounts or offers framed as "earned" before conditions are met?',
      'Is there a clear summary of all conditions and total commitment before final confirmation?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the pseudocertainty effect.

Analyze the provided design for pseudocertainty effect patterns. Identify:

1. **Stage Decomposition**: How decisions are broken into sequential stages
2. **Certainty Framing**: Where conditional outcomes are presented as certain or guaranteed
3. **Conditional Benefits**: Benefits that appear secured but require further action or conditions
4. **Drip Pricing**: Costs revealed incrementally across stages rather than upfront
5. **Progressive Lock-In**: How each stage increases user investment and switching costs

For each pattern found:
- Identify the stage structure and what feels "certain" at each stage
- Assess whether the certainty framing accurately represents the actual conditionality
- Determine if conditions and prerequisites are communicated transparently
- Evaluate whether users could make a different decision if shown all information at once
- Assess ethical implications

Consider:
- Is the multi-stage structure genuinely reducing complexity, or obscuring information?
- Are "guaranteed" outcomes actually conditional on later stages or actions?
- Do users understand the full commitment before reaching the point of no return?
- Are mandatory costs hidden behind earlier "locked-in" price framing?
- Would a single-stage presentation of the same information change user behavior?

Provide actionable recommendations for ethical use of staged decision architecture.`,

    outputSchema: {
      type: 'object',
      properties: {
        pseudocertaintyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              stageStructure: { type: 'string' },
              whatFeelsCertain: { type: 'string' },
              actualConditionality: { type: 'string' },
              transparencyLevel: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'whatFeelsCertain',
              'actualConditionality',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            stageComplexity: { type: 'number' },
            transparencyScore: { type: 'number' },
            conditionClarity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'stageComplexity',
            'transparencyScore',
            'conditionClarity',
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
        'pseudocertaintyPatterns',
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
        title: 'Identify Natural Decision Stages',
        description:
          'Map the decision process to find stages that genuinely reduce complexity rather than artificially decomposing a simple choice',
        example:
          'Checkout naturally has stages: review items, enter shipping, enter payment, confirm. Don\'t add artificial stages just to create pseudocertainty.',
        tips: [
          'Each stage should provide new, useful information to the user',
          'Stages should correspond to genuinely distinct decision points',
          'Avoid splitting a single decision into multiple stages to obscure totals',
        ],
      },
      {
        step: 2,
        title: 'Frame Each Stage Honestly',
        description:
          'At each stage, clearly communicate what is confirmed vs what remains conditional',
        example:
          'After shipping address: "Shipping method selected. Final total including tax will be shown before payment."',
        tips: [
          'Use "confirmed" only for genuinely irrevocable outcomes',
          'Show running totals that include known and estimated costs',
          'Clearly label which elements may change in later stages',
        ],
      },
      {
        step: 3,
        title: 'Show Full Commitment Before Final Action',
        description:
          'Before the final confirmation, present a complete summary of all costs, conditions, and commitments',
        example:
          'Order summary showing subtotal, shipping, tax, and total with clear billing terms before "Place Order" button',
        tips: [
          'Include all mandatory fees, not just the base price',
          'State renewal terms, cancellation policies, and conditions',
          'Make the summary scannable and prominent, not hidden in fine print',
        ],
      },
      {
        step: 4,
        title: 'Design Transparent Progress Indicators',
        description:
          'Progress indicators should show advancement without creating false certainty about incomplete stages',
        example:
          'Use "Step 2 of 4: Shipping" rather than "Shipping Confirmed!" for an in-progress stage',
        tips: [
          'Distinguish between "completed" and "in progress" clearly',
          'Don\'t mark a stage as "done" until its outcomes are genuinely finalized',
          'Allow users to return to and modify earlier stages easily',
        ],
      },
      {
        step: 5,
        title: 'Communicate Conditional Benefits Clearly',
        description:
          'When offering conditional benefits (discounts, rewards, guarantees), state the conditions alongside the benefit',
        example:
          '"Spend $100+ to get free shipping (standard delivery, contiguous US)" rather than "Free shipping unlocked!"',
        tips: [
          'Show conditions at the same visual hierarchy level as the benefit',
          'Avoid "earned" or "unlocked" language for benefits that still have conditions',
          'Make it easy for users to understand exactly what they need to do to receive the benefit',
        ],
      },
      {
        step: 6,
        title: 'Test Single-Stage vs Multi-Stage Presentations',
        description:
          'A/B test whether your multi-stage flow is genuinely better for users or just better for conversion through pseudocertainty manipulation',
        example:
          'Compare single-page checkout vs multi-step wizard, measuring both conversion AND post-purchase satisfaction/returns',
        tips: [
          'Measure long-term metrics (returns, cancellations, support tickets), not just conversion',
          'If multi-stage converts much higher but also has higher returns, pseudocertainty is misleading users',
          'Optimize for informed conversion, not just conversion volume',
        ],
      },
    ],

    dos: [
      'Use multi-stage flows when they genuinely reduce cognitive complexity',
      'Show full cost summaries before final commitment',
      'Clearly distinguish between confirmed and conditional outcomes',
      'Allow users to return to and modify earlier stages',
      'State conditions alongside benefits, not in separate fine print',
      'Use progress indicators that accurately reflect completion status',
      'Test whether staged flows improve informed decision-making, not just conversion',
      'Provide clear cancellation and reversal information at each stage',
    ],

    donts: [
      'Don\'t use "locked in" or "guaranteed" for conditional outcomes',
      'Don\'t reveal mandatory costs incrementally across stages (drip pricing)',
      'Don\'t create artificial stages to exploit pseudocertainty',
      'Don\'t mark stages as "completed" when outcomes are still conditional',
      'Don\'t separate benefits from their conditions across different stages',
      'Don\'t use progress bars to create sunk-cost pressure toward commitment',
      'Don\'t frame probabilistic outcomes as certain within any single stage',
      'Don\'t hide reversal difficulty behind easy-looking progress indicators',
    ],

    bestPractices: [
      {
        title: 'Honest Stage Summaries',
        description:
          'At each stage transition, provide a clear summary distinguishing what is confirmed from what remains conditional',
        rationale:
          'Transparent summaries let users benefit from reduced complexity without being misled by false certainty',
        example:
          '"Confirmed: Free tier account created. Next: Choose a plan (no charge until you select one)."',
      },
      {
        title: 'Running Total Transparency',
        description:
          'In pricing flows, show a running total that updates at each stage, including all known and estimated costs',
        rationale:
          'Prevents drip pricing by ensuring users always see the full picture, not just the current stage\'s cost',
        example:
          'Sidebar showing: Base $49 + Estimated tax $4.12 + Shipping TBD = Estimated total $53.12+',
      },
      {
        title: 'Reversible Stage Completion',
        description:
          'Allow users to go back and modify earlier stages without losing their progress',
        rationale:
          'True certainty means users can revisit decisions. Irreversible stages create false lock-in, not genuine certainty.',
        example:
          'Clickable completed stages that reopen for editing while preserving later-stage data',
      },
      {
        title: 'Condition-Benefit Pairing',
        description:
          'Always display conditions at the same visual prominence as the benefit they qualify',
        rationale:
          'Separating benefits from conditions is the core mechanism of deceptive pseudocertainty',
        example:
          '"20% off (orders over $100, excludes sale items)" in a single, readable line--not benefit in headline and conditions in footnote',
      },
      {
        title: 'Post-Decision Verification',
        description:
          'After the final stage, confirm what was actually secured and set clear expectations',
        rationale:
          'Reduces post-purchase dissonance and builds trust by confirming reality matches perception',
        example:
          'Confirmation email listing exactly what was purchased, total charged, renewal date, and cancellation instructions',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Stage progression must be conveyed in DOM order, not just visually',
        implementation:
          'Ensure screen readers encounter stages in logical order, with completed/active/upcoming status announced. Use ARIA steplist patterns or properly sequenced headings.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Each stage must clearly describe what is required and what will happen',
        implementation:
          'Provide clear instructions at each stage. Announce conditions and requirements, not just benefits. Use ARIA live regions for dynamic stage updates.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention (Legal, Financial) - Reversible, checked, and confirmed submissions for financial commitments',
        implementation:
          'For multi-stage financial flows, provide a review/confirmation stage showing all commitments before final submission. Allow users to go back and correct any stage.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely on color alone to indicate stage completion or certainty',
        implementation:
          'Combine green checkmarks with text labels ("Completed"), icons, and ARIA attributes so stage status is clear to all users.',
      },
    ],

    ethics: [
      {
        concern: 'Drip Pricing',
        severity: 'critical',
        explanation:
          'Revealing mandatory costs incrementally to create pseudocertainty about a lower base price, then adding unavoidable fees in later stages',
        mitigation:
          'Show total estimated cost from the first stage. If exact totals are unavailable, provide clear estimates and explain what may change.',
      },
      {
        concern: 'False Guarantees',
        severity: 'critical',
        explanation:
          'Using "guaranteed," "locked in," or "secured" for outcomes that are conditional on future stages, actions, or external factors',
        mitigation:
          'Reserve certainty language for genuinely unconditional outcomes. Use "eligible for" or "available when" for conditional benefits.',
      },
      {
        concern: 'Artificial Complexity',
        severity: 'high',
        explanation:
          'Adding unnecessary stages to exploit pseudocertainty and sunk-cost effects, increasing commitment pressure',
        mitigation:
          'Each stage should serve a clear user need. Test whether removing stages changes outcomes; if removal helps users, the stages were manipulative.',
      },
      {
        concern: 'Cancellation Asymmetry',
        severity: 'high',
        explanation:
          'Making sign-up a smooth multi-stage flow while making cancellation difficult, contradicting the "cancel anytime" pseudocertainty created during sign-up',
        mitigation:
          'Cancellation should be as simple as sign-up. If "cancel anytime" is promised, deliver on it with a one-click or one-page cancellation process.',
      },
      {
        concern: 'Informed Consent Erosion',
        severity: 'high',
        explanation:
          'Splitting terms and conditions across multiple stages so users never see the complete picture before committing',
        mitigation:
          'Provide a complete summary of all terms before final commitment. Link to full terms at every stage, not just the last one.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Choices, Values, and Frames',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1984,
        doi: '10.1037/0003-066X.39.4.341',
        url: 'https://doi.org/10.1037/0003-066X.39.4.341',
        description:
          'The foundational paper introducing the pseudocertainty effect, demonstrating how multi-stage gamble framing reverses risk preferences',
        type: 'foundational',
      },
      {
        title: 'Prospect Theory: An Analysis of Decision under Risk',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1979,
        doi: '10.2307/1914185',
        description:
          'The original prospect theory paper describing the certainty effect and isolation effect that underpin pseudocertainty',
        type: 'foundational',
      },
      {
        title: 'Advances in Prospect Theory: Cumulative Representation of Uncertainty',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1992,
        doi: '10.1007/BF00122574',
        description:
          'Extended prospect theory addressing how people weight probabilities in multi-stage decisions',
        type: 'advanced',
      },
      {
        title: 'The Pseudocertainty Effect and Systematic Violations of Expected Utility Theory',
        author: 'Moskowitz, H.',
        year: 1986,
        description:
          'Empirical analysis of pseudocertainty violations of expected utility theory across decision contexts',
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
          'Comprehensive coverage of prospect theory, the certainty effect, and pseudocertainty by the bias\'s discoverer',
        type: 'foundational',
      },
      {
        title: 'Choices, Values, and Frames',
        author: 'Kahneman, Daniel & Tversky, Amos (Eds.)',
        year: 2000,
        isbn: '9780521627498',
        description:
          'Collected papers on framing effects, including the original pseudocertainty research and subsequent developments',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Practical applications of prospect theory and framing effects in economic and design contexts',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Drip Pricing and the Pseudocertainty Effect',
        author: 'Competition and Markets Authority (UK)',
        url: 'https://www.gov.uk/government/publications/online-hotel-booking',
        description:
          'Regulatory analysis of how staged pricing exploits pseudocertainty in online booking',
        type: 'practical',
      },
      {
        title: 'The Dark Patterns of Pricing',
        author: 'Luguri, J., & Strahilevitz, L. J.',
        url: 'https://lawreview.uchicago.edu/publication/dark-patterns-pricing',
        description:
          'Legal and ethical analysis of multi-stage pricing patterns that exploit pseudocertainty',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Prospect Theory and the Certainty Effect',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=sM91d5I36Po',
        description:
          'Video explanation of the certainty effect and its relationship to pseudocertainty in multi-stage decisions',
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
      'framing-effect',       // Pseudocertainty is a specific framing manipulation
      'loss-aversion',        // Each stage creates endowment that triggers loss aversion
      'sunk-cost-fallacy',    // Completed stages create sunk-cost pressure to continue
      'commitment-bias',      // Progressive commitment through stages reinforces pseudocertainty
      'endowment-effect',     // Each stage creates a sense of ownership over conditional outcomes
    ],

    conflicts: [
      'information-bias',     // Full information presentation breaks pseudocertainty
      'ambiguity-aversion',   // If uncertainty is made salient, pseudocertainty collapses
    ],

    confusedWith: [
      'certainty-effect',     // Related but distinct: certainty effect is about overweighting sure outcomes; pseudocertainty is about misperceiving conditional outcomes as sure
      'framing-effect',       // Pseudocertainty is a specific type of framing, not framing in general
      'anchoring-bias',       // Staged pricing can involve anchoring, but the mechanism is different
    ],

    hierarchy: {
      parent: 'prospect-theory',
      children: [
        'drip-pricing',
        'staged-commitment',
      ],
    },
  },
};
