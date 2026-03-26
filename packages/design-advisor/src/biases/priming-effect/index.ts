/**
 * PRIMING EFFECT
 *
 * Prior exposure to stimuli influences our responses
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const primingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'priming-effect',
    name: 'Priming Effect',
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
    simple: 'Prior exposure to stimuli influences our responses',

    detailed: `The Priming Effect is a cognitive phenomenon where exposure to one stimulus unconsciously influences the response to a subsequent stimulus. When we encounter an image, word, sound, or concept, it activates a network of associated ideas in memory, shaping how we interpret and respond to what comes next.

Priming operates below conscious awareness. A person shown images of sunny beaches before being asked to rate a vacation package will evaluate it more favorably than someone shown images of crowded airports first -- even if the package is identical. The prior stimulus sets a mental context that colors subsequent perception and judgment.

In UX and product design, priming is pervasive: the imagery on a landing page, the tone of onboarding copy, the color palette of a checkout flow, and even the loading screen animation all prime users before they reach key decision points. Designers who understand priming can craft experiences that set appropriate expectations, build trust, and guide users toward positive outcomes -- while those unaware of it may inadvertently prime negative associations.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Exposure to a stimulus activates associated concepts in memory through spreading activation, unconsciously influencing subsequent processing. This happens because:

1. **Spreading Activation**: When a concept is activated in the semantic network, activation spreads to related nodes, lowering their threshold for conscious recognition
2. **Semantic Priming**: Words or images activate related meanings (e.g., "doctor" primes "nurse"), making related concepts easier to process
3. **Affective Priming**: Emotional stimuli (warm colors, smiling faces) activate corresponding emotional states that color subsequent judgments
4. **Perceptual Priming**: Prior exposure to a stimulus form makes it easier to identify similar forms later, even without conscious memory of the original exposure
5. **Conceptual Priming**: Activating abstract concepts (e.g., "achievement", "cooperation") shifts behavior toward those concepts without awareness

The mechanism is automatic and pre-conscious -- people are not aware that their judgments and behaviors are being shaped by prior stimuli.`,
    },

    realWorldExample: `In Bargh, Chen, and Burrows' classic 1996 experiment, participants unscrambled sentences containing words associated with elderly stereotypes (e.g., "Florida", "wrinkle", "grey"). After the task, participants who had been primed with elderly-related words walked significantly more slowly down the hallway than the control group -- without any awareness that the words had influenced their behavior. This demonstrated that priming can affect not just thoughts and judgments, but physical behavior as well.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Priming Effect profoundly shapes how users perceive, feel about, and interact with digital interfaces. Every element a user encounters before a decision point acts as a prime -- imagery, copy, color, animation, and even micro-interactions set the mental context for what follows. Designers can leverage this to:

- Set quality and value expectations through onboarding imagery and first impressions
- Prime emotional states through color palettes, photography style, and illustration tone
- Guide user actions through copy tone and word choice before CTAs
- Build patience and positive anticipation through loading screen design
- Establish trust through professional visual language before sensitive interactions`,

    whenToUse: [
      {
        title: 'Onboarding Imagery',
        scenario:
          'When introducing new users to your product for the first time',
        example:
          'Show aspirational images of successful outcomes (organized dashboards, happy teams collaborating) before the signup form to prime achievement motivation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Pre-Purchase Priming',
        scenario: 'When guiding users toward a purchase or conversion decision',
        example:
          'Display high-quality product photography and lifestyle imagery showing the product in aspirational contexts before presenting the price',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Emotional Priming for Donations',
        scenario: 'When encouraging charitable giving or community contributions',
        example:
          'Show warm, empathetic imagery of people being helped before presenting the donation form, priming generosity and compassion',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Trust Priming for Sensitive Actions',
        scenario: 'When asking users to enter payment or personal information',
        example:
          'Display security badges, professional design, and calm blue tones in the steps leading up to the payment form',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Loading Screen Priming',
        scenario: 'When users must wait for content or processes to complete',
        example:
          'Show progress tips, interesting facts, or preview content during loading to prime patience and set positive expectations for the result',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Copy Tone Before CTAs',
        scenario: 'When crafting the copy that leads up to a call-to-action',
        example:
          'Use empowering, action-oriented language ("You are ready to...") in the paragraph before a "Get Started" button to prime decisiveness',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Negative Imagery Before Purchases',
        reason:
          'Negative or fear-inducing imagery before purchase decisions can prime anxiety and avoidance',
        consequence:
          'Users associate negative emotions with the purchase, leading to cart abandonment and reduced conversion',
        alternative:
          'Use neutral or positive imagery. If addressing problems, quickly transition to solution-focused framing',
      },
      {
        title: 'Fear Priming Before Optional Upgrades',
        reason:
          'Using fear-based priming to push users toward paid upgrades is manipulative and erodes trust',
        consequence:
          'Users feel coerced, leading to refund requests, negative reviews, and long-term trust damage',
        alternative:
          'Prime with positive outcomes and benefits of upgrading rather than consequences of not upgrading',
      },
      {
        title: 'Medical or Crisis Contexts',
        reason:
          'Priming can distort judgment in high-stakes situations where clear thinking is essential',
        consequence:
          'Users may make poor health or safety decisions based on primed emotional states rather than rational evaluation',
        alternative:
          'Present information neutrally and objectively, minimizing emotional priming in critical decision contexts',
      },
      {
        title: 'Subliminal or Deceptive Priming',
        reason:
          'Deliberately using subliminal techniques to influence users without any possibility of awareness is unethical',
        consequence:
          'Regulatory risk, loss of user trust, and potential legal liability',
        alternative:
          'Use transparent design that users can recognize as professional and well-crafted, not hidden manipulation',
      },
    ],

    commonMistakes: [
      {
        title: 'Contradictory Priming',
        description:
          'Using imagery or copy that primes one emotion while the subsequent content requires a different one',
        why: 'A playful, casual loading screen followed by a serious legal agreement creates cognitive dissonance and confusion',
        fix: 'Ensure visual and tonal consistency between priming elements and the content they precede',
      },
      {
        title: 'Negative Priming by Accident',
        description:
          'Unintentionally showing error states, empty states, or negative content before key decision points',
        why: 'Users who encounter errors or frustrating content are primed with negative affect that carries into subsequent interactions',
        fix: 'Audit the user journey to ensure positive or neutral priming precedes all critical decision points',
      },
      {
        title: 'Cultural Insensitivity in Visual Priming',
        description:
          'Using imagery or symbols that carry different connotations across cultures',
        why: 'Colors, gestures, and symbols prime different associations in different cultures (e.g., white = purity in the West, mourning in parts of Asia)',
        fix: 'Research cultural associations for your target audiences and localize priming elements accordingly',
      },
      {
        title: 'Over-Priming with Repetition',
        description:
          'Repeating the same priming stimulus so often that it loses effectiveness or becomes annoying',
        why: 'Habituation reduces the impact of repeated stimuli; excessive repetition can create negative associations',
        fix: 'Vary priming stimuli while maintaining consistent thematic direction. Rotate imagery and copy.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout sequence determines which stimuli users encounter first, establishing the priming context for everything that follows',
        examples: [
          'Hero images at the top of pages prime users before they read any content',
          'Sidebar imagery primes peripheral associations while users focus on main content',
          'Step-by-step wizards allow careful control of priming sequence between steps',
          'Above-the-fold content sets the emotional tone before scrolling reveals details',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Font choices and text styling prime perceptions of brand personality, professionalism, and trust',
        examples: [
          'Serif fonts prime associations of tradition, authority, and reliability',
          'Rounded sans-serif fonts prime friendliness, approachability, and modernity',
          'Handwritten fonts prime warmth, personality, and informality',
          'Monospace fonts prime technical competence and precision',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color is one of the most powerful priming tools, activating emotional associations before conscious processing',
        examples: [
          'Blue tones prime trust, calm, and professionalism before form interactions',
          'Warm oranges and yellows prime optimism and energy before CTAs',
          'Green primes growth, health, and safety before financial or health decisions',
          'Dark, saturated palettes prime luxury and exclusivity before premium offerings',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Micro-interactions and animations prime users with sensations of quality, speed, and responsiveness',
        examples: [
          'Smooth, fluid animations prime perceptions of polish and quality',
          'Haptic feedback on mobile primes tactile engagement and confirmation',
          'Skeleton loading screens prime content structure expectations',
          'Celebratory animations (confetti, checkmarks) prime positive associations with completion',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Copy, imagery, and media are primary vehicles for semantic and affective priming',
        examples: [
          'Success stories before signup forms prime achievement motivation',
          'Customer testimonials with photos prime social trust before purchase decisions',
          'Problem-framing copy before solution reveals primes appreciation for the product',
          'Aspirational lifestyle imagery primes desire and aspiration before pricing',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Priming must work across all sensory channels to be inclusive',
        examples: [
          'Alt text on priming images must convey the intended emotional tone for screen reader users',
          'Audio cues can serve as primes for visually impaired users (e.g., pleasant chimes before positive content)',
          'Color-based priming must have non-color equivalents for color-blind users',
          'Motion-based priming must respect prefers-reduced-motion settings',
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
        title: 'Warm Imagery Before Donation Ask',
        description:
          'Charity website showing empathetic imagery of people being helped before the donation form',
        code: `<section class="impact-story">
  <img src="child-smiling.jpg" alt="A child smiling while reading a new book"
       class="hero-image warm-tone">
  <h2>Your Generosity Changes Lives</h2>
  <p class="story">Last month, 200 children in rural Guatemala received
  their first books. Watch Maria's face light up as she reads her name
  for the very first time.</p>
</section>

<section class="donate-form">
  <h3>Continue the Story</h3>
  <p>Every gift puts a book in a child's hands.</p>
  <div class="amount-options">
    <button class="amount">$25 - One child</button>
    <button class="amount selected">$50 - A classroom</button>
    <button class="amount">$100 - A school</button>
  </div>
  <button class="primary-cta">Donate Now</button>
</section>`,
        explanation:
          'The warm, hopeful imagery of a smiling child primes compassion and generosity. By the time users reach the donation form, they are emotionally prepared to give. The copy reinforces the prime with concrete, positive outcomes.',
        principle:
          'Positive emotional priming before prosocial actions increases willingness to contribute',
        metrics: {
          before: '2.1% donation conversion with form-only page',
          after: '5.8% donation conversion with story-primed page',
          improvement: '176% increase in donation conversions',
        },
      },
      {
        title: 'Success Stories Before Signup',
        description:
          'SaaS product showing customer success narratives before the registration form',
        code: `<section class="success-showcase">
  <div class="customer-card">
    <img src="founder-portrait.jpg" alt="Lisa, startup founder">
    <blockquote>
      "We went from 3 hours of manual reporting to automated
      dashboards in one afternoon. Our investors were impressed
      at the next board meeting."
    </blockquote>
    <p class="attribution">Lisa Chen, CEO of GrowthMetrics</p>
    <div class="result-badges">
      <span class="badge">3hrs saved daily</span>
      <span class="badge">Setup in 1 day</span>
    </div>
  </div>
</section>

<section class="signup-section">
  <h2>Start Your Success Story</h2>
  <form class="signup-form">
    <input type="email" placeholder="Work email">
    <button type="submit" class="cta">Get Started Free</button>
    <p class="subtext">No credit card required</p>
  </form>
</section>`,
        explanation:
          'The success story primes the concept of achievement and competence. Users approaching the signup form have been primed to associate the product with professional success, making the commitment feel like a step toward their own success story.',
        principle:
          'Achievement priming before signup increases perceived value and conversion motivation',
        metrics: {
          before: '8.2% signup rate with feature-list page',
          after: '13.5% signup rate with success-story primed page',
          improvement: '65% increase in signup conversions',
        },
      },
      {
        title: 'Professional Imagery for B2B Trust',
        description:
          'Enterprise software landing page using professional photography and clean design to prime credibility',
        code: `<section class="hero" style="background: var(--cg-color-surface-elevated);">
  <div class="hero-content">
    <img src="enterprise-team.jpg"
         alt="Professional team collaborating in a modern office"
         class="hero-image">
    <h1>Enterprise-Grade Security for Modern Teams</h1>
    <p class="subtitle">Trusted by Fortune 500 companies to protect
    their most sensitive data.</p>
    <div class="trust-signals">
      <img src="soc2-badge.svg" alt="SOC 2 Certified">
      <img src="iso-badge.svg" alt="ISO 27001">
      <img src="gdpr-badge.svg" alt="GDPR Compliant">
    </div>
  </div>
</section>

<section class="demo-request">
  <h2>See It In Action</h2>
  <form class="demo-form">
    <input type="text" placeholder="Company name">
    <input type="email" placeholder="Work email">
    <button type="submit">Request Demo</button>
  </form>
</section>`,
        explanation:
          'Professional photography, trust badges, and enterprise language prime credibility and security consciousness. By the time users reach the demo request form, they have been primed to perceive the product as trustworthy and serious -- appropriate for handling sensitive enterprise data.',
        principle:
          'Professional visual priming establishes credibility context for B2B conversion',
      },
    ],

    bad: [
      {
        title: 'Negative Imagery Before Purchase',
        description:
          'E-commerce site showing warning imagery before the checkout flow',
        code: `<!-- DON'T DO THIS -->
<section class="pre-checkout">
  <div class="warning-banner">
    <img src="broken-product.jpg" alt="Damaged package">
    <h3>Worried About Quality?</h3>
    <p>Many online purchases arrive damaged or defective.
    That's why we offer our protection plan.</p>
  </div>
  <div class="upsell">
    <h4>Add Purchase Protection - $12.99</h4>
    <button class="add-protection">Protect My Order</button>
  </div>
</section>

<section class="checkout">
  <h2>Complete Your Purchase</h2>
  <button class="checkout-btn">Pay Now</button>
</section>`,
        explanation:
          'Showing images of damaged products and fear-inducing copy primes anxiety and doubt right before checkout. Even if the user declines the protection plan, the negative priming persists, making them less confident about their purchase and more likely to abandon the cart.',
        principle:
          'Never prime negative emotions before a conversion point -- the negative affect transfers to the purchase decision',
      },
      {
        title: 'Fear Priming for Optional Upgrades',
        description:
          'Software showing security threats to push users toward paid upgrades',
        code: `<!-- DON'T DO THIS -->
<div class="upgrade-prompt">
  <div class="threat-visualization">
    <img src="hacker-dark.jpg" alt="Shadowy figure at computer">
    <div class="threat-counter">
      <span class="big-number">2,847</span>
      <span class="label">attacks blocked this month</span>
    </div>
    <p class="warning-text">Your FREE plan has limited protection.
    Premium users get 10x more security coverage.</p>
  </div>
  <button class="upgrade-cta urgent">Upgrade to Stay Safe</button>
  <button class="dismiss small">I'll risk it</button>
</div>`,
        explanation:
          'Dark, threatening imagery and alarming statistics prime fear and vulnerability. The "I\'ll risk it" dismiss button further primes a sense of danger. This manipulates users through fear rather than demonstrating genuine value, eroding trust and creating resentment.',
        principle:
          'Fear-based priming for upsells is manipulative and damages long-term user trust',
      },
      {
        title: 'Mismatched Tonal Priming',
        description:
          'Playful, casual priming followed by a serious commitment',
        code: `<!-- DON'T DO THIS -->
<section class="onboarding">
  <div class="fun-intro">
    <img src="cartoon-mascot.gif" alt="Dancing cartoon character">
    <h2>Let's Have Some Fun! 🎉</h2>
    <p>Getting started is a breeze! Just a few quick steps!</p>
  </div>
</section>

<section class="contract-section">
  <h2>Annual Service Agreement</h2>
  <div class="legal-text" style="height: 400px; overflow: scroll;">
    <p>This legally binding agreement requires a 12-month commitment
    with a $500 early termination fee...</p>
  </div>
  <button>I Agree to Terms</button>
</section>`,
        explanation:
          'The playful mascot and casual tone prime a sense of fun and low-stakes interaction. When users are then presented with a serious legal commitment, the tonal mismatch creates distrust -- they feel the casual priming was designed to lower their guard before a significant obligation.',
        principle:
          'Tonal mismatch between priming and subsequent content erodes trust and feels deceptive',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: 'Product Detail Pages',
        description: 'Amazon uses high-quality product photography with white backgrounds and lifestyle images showing products in aspirational settings. These images prime quality perception before users encounter the price and reviews, making the product feel premium and desirable.',
        effectiveness: 'very-effective',
        analysis: 'The combination of clean photography, zoom capability, and lifestyle context images creates a multi-layered prime: quality (white background), desirability (lifestyle shots), and trust (multiple angles). This visual priming directly influences willingness to pay and perceived value.',
      },
      {
        company: 'Airbnb',
        product: 'Listing Pages',
        description: 'Airbnb leads every listing with professionally photographed, aspirational images of properties in their best light -- warm lighting, styled interiors, scenic views. Users are primed with vacation desire and lifestyle aspiration before seeing the nightly rate.',
        effectiveness: 'very-effective',
        analysis: 'Aspirational photography primes the concept of "experience" over "accommodation", shifting the value frame from price-per-night to life-enrichment. This priming strategy contributes to higher price acceptance compared to traditional hotel booking interfaces.',
      },
      {
        company: 'Apple',
        product: 'Product Pages and Retail Stores',
        description: 'Apple uses lifestyle imagery showing diverse people using products in creative, productive, and joyful contexts. The clean, minimal design with generous whitespace primes sophistication and simplicity before users encounter technical specs or pricing.',
        effectiveness: 'very-effective',
        analysis: 'Apple primes identity aspiration ("this is the kind of person who uses this product") rather than feature comparison. The minimalist aesthetic primes simplicity, making complex technology feel approachable and desirable.',
      },
      {
        company: 'Charity: Water',
        product: 'Donation Experience',
        description: 'Charity: Water uses powerful photography and personal stories of people affected by the water crisis, shown before the donation interface. Warm imagery of communities celebrating new wells primes hope and generosity rather than guilt.',
        effectiveness: 'very-effective',
        analysis: 'By priming with hope and positive impact rather than suffering and guilt, Charity: Water achieves higher donation rates and repeat giving. The positive emotional prime creates an association between donating and joy, rather than donating and obligation.',
      },
    ],

    abTests: [
      {
        title: 'Pre-CTA Imagery: Aspirational vs Neutral',
        hypothesis:
          'Aspirational lifestyle imagery before a signup CTA will increase conversions compared to neutral product screenshots',
        controlVersion: {
          description:
            'Landing page with product screenshots (dashboard UI, feature panels) above the signup form',
          metrics: {
            conversionRate: '5.1%',
            timeOnPage: '1:42',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with lifestyle photos of happy professionals using the product in real-world settings, followed by the same signup form',
          metrics: {
            conversionRate: '8.3%',
            timeOnPage: '2:28',
            scrollDepth: '71%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Aspirational imagery increased signups by 63%. Users primed with lifestyle context spent 45% more time on page and scrolled deeper. Post-signup surveys showed primed users had higher expectations of product value and reported stronger purchase intent.',
          learnings: [
            'Lifestyle imagery primes identity aspiration, which is more motivating than feature awareness',
            'Emotional priming increases engagement metrics across the board',
            'The priming effect persisted into onboarding -- primed users completed more setup steps',
            'Effect was strongest for new visitors with no prior brand awareness',
          ],
        },
      },
      {
        title: 'Color Priming: Warm vs Cool Palette Before Checkout',
        hypothesis:
          'A warm color palette in the pre-checkout flow will increase completion rate by priming positive emotions',
        controlVersion: {
          description:
            'Cart and review pages using cool grey/blue palette before the payment form',
          metrics: {
            conversionRate: '62.4%',
            cartAbandonmentRate: '37.6%',
          },
        },
        treatmentVersion: {
          description:
            'Cart and review pages using warm amber/cream tones with green confirmation accents before the same payment form',
          metrics: {
            conversionRate: '68.1%',
            cartAbandonmentRate: '31.9%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Warm tones reduced cart abandonment by 15%. The warm palette primed comfort and safety, reducing purchase anxiety at the critical checkout stage. Green accents on confirmation elements primed "go" associations.',
          learnings: [
            'Color priming significantly affects conversion at high-anxiety touchpoints',
            'Warm colors reduce perceived risk and prime trust in financial transactions',
            'Green accents on progress indicators prime forward momentum',
            'The effect was more pronounced for first-time buyers than returning customers',
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
        name: 'Pre-CTA Imagery',
        description:
          'Images, illustrations, or photography placed before calls-to-action or decision points',
        howToSpot:
          'Look for hero images, lifestyle photography, or emotional imagery positioned above or before buttons, forms, or pricing',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Color Mood Setting',
        description:
          'Color palettes that establish an emotional tone before key interactions',
        howToSpot:
          'Check if the color scheme shifts or intensifies before conversion points (e.g., warm tones before purchase, blue before trust-sensitive forms)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Copy Tone Escalation',
        description:
          'Shifts in language tone, word choice, or narrative voice leading up to decision points',
        howToSpot:
          'Read the copy in sequence: does the language become more empowering, urgent, or emotional before a CTA?',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Loading Screen Content',
        description:
          'Tips, facts, previews, or branded content shown during loading or processing states',
        howToSpot:
          'Check what users see during waits -- blank screens vs curated content that shapes expectations for the result',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Environmental Cues',
        description:
          'Background textures, ambient animations, or decorative elements that set mood without drawing direct attention',
        howToSpot:
          'Look for subtle design choices: background gradients, floating particles, ambient color, or texture patterns that create atmosphere',
        severity: ImpactLevel.LOW,
      },
    ],

    patterns: [
      {
        name: 'Emotional Image-Before-Action Pattern',
        description: 'Emotionally charged imagery placed immediately before a user action or decision',
        indicators: ['Lifestyle photos above signup forms', 'Empathetic imagery before donation asks', 'Success imagery before upgrade prompts', 'Professional photography before demo requests'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Tonal Ramp Pattern',
        description: 'Gradual escalation of emotional tone through copy and visuals leading to a conversion point',
        indicators: ['Copy moving from informational to emotional', 'Color saturation increasing toward CTA', 'Imagery becoming more aspirational through page scroll', 'Language shifting from features to outcomes'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Context-Setting Sequence Pattern',
        description: 'Multi-step flows where early steps establish mental context for later decisions',
        indicators: ['Onboarding steps that show capabilities before asking for commitment', 'Free trial experiences that showcase value before paywall', 'Walkthrough tours that prime feature expectations', 'Quiz or assessment flows that prime need-awareness before solution presentation'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Ambient Mood Pattern',
        description: 'Background design elements that set emotional context without drawing direct attention',
        indicators: ['Warm vs cool background color choices', 'Ambient animations or particles', 'Background photography or illustration style', 'Music or sound design in multimedia experiences'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What imagery do users see immediately before key decision points (signup, purchase, upgrade)?',
      'Does the color palette establish a specific emotional tone before conversion actions?',
      'How does the copy tone shift as users approach CTAs -- informational, emotional, urgent?',
      'What content do users encounter during loading or waiting states?',
      'Are there tonal inconsistencies between priming content and subsequent actions?',
      'Could any imagery or content accidentally prime negative associations?',
      'Is the priming consistent across the entire user journey or contradictory?',
      'Are priming elements accessible to users with visual, auditory, or motor impairments?',
      'Would the priming be perceived as helpful context-setting or manipulative if users became aware of it?',
      'Have cultural differences in color and imagery associations been considered for your audience?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the priming effect.

Analyze the provided design for priming effect patterns. Identify:

1. **Visual Priming**: Images, illustrations, and photography that set emotional context before decisions
2. **Color Priming**: Color palette choices that establish mood before key interactions
3. **Copy Priming**: Word choice, tone, and narrative that activate concepts before CTAs
4. **Interaction Priming**: Micro-interactions, animations, and loading states that shape expectations
5. **Contextual Priming**: Environmental design elements that create atmosphere

For each priming pattern found:
- Identify the priming stimulus and what concept/emotion it activates
- Determine what subsequent user action or decision it precedes
- Assess whether the priming is congruent with the user's genuine interests
- Evaluate whether it is ethical and transparent
- Suggest improvements for more effective or ethical priming

Consider:
- Is the priming setting helpful expectations or creating false impressions?
- Are there accidental negative primes in the user journey?
- Is the tonal consistency maintained between priming and subsequent content?
- Does the priming work across cultures and accessibility needs?
- Would the user feel respected or manipulated if they became aware of the priming?

Provide actionable recommendations for ethical, effective use of priming.`,

    outputSchema: {
      type: 'object',
      properties: {
        primingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              primingStimulus: { type: 'string' },
              activatedConcept: { type: 'string' },
              subsequentAction: { type: 'string' },
              congruence: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'primingStimulus',
              'activatedConcept',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            tonalConsistency: { type: 'number' },
            emotionalCongruence: { type: 'number' },
            culturalSensitivity: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'tonalConsistency',
            'emotionalCongruence',
            'culturalSensitivity',
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
        'primingPatterns',
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
        title: 'Map the Decision Journey',
        description:
          'Identify every decision point in your user flow where priming can set helpful context',
        example:
          'Map: Landing page hero -> feature section -> social proof -> pricing -> signup form. Each transition is a priming opportunity.',
        tips: [
          'Walk through the entire user journey and note every decision or action',
          'Identify what emotional state would best serve the user at each point',
          'Note any existing priming (intentional or accidental) already in the flow',
        ],
      },
      {
        step: 2,
        title: 'Choose Appropriate Priming Stimuli',
        description:
          'Select imagery, colors, copy, and interactions that will activate the desired concepts and emotions',
        example:
          'For a productivity tool signup: use imagery of organized workspaces and accomplished professionals, warm confident colors, and empowering copy tone',
        tips: [
          'Match priming to genuine product value -- do not overpromise',
          'Use multiple channels (visual, verbal, interactive) for reinforcement',
          'Research cultural associations for your target audience',
        ],
      },
      {
        step: 3,
        title: 'Ensure Tonal Consistency',
        description:
          'Verify that priming elements create a consistent emotional arc through the experience',
        example:
          'If priming warmth and trust before a payment form, ensure the form itself maintains that warmth rather than switching to cold, clinical design',
        tips: [
          'Create a "tonal map" showing intended emotion at each step',
          'Check for jarring transitions between sections',
          'Ensure error states and edge cases maintain tonal consistency',
        ],
      },
      {
        step: 4,
        title: 'Test Cross-Culturally and Accessibly',
        description:
          'Validate that priming works across your audience segments and accessibility needs',
        example:
          'Test priming imagery with users from different cultural backgrounds; verify alt text conveys intended emotional tone for screen reader users',
        tips: [
          'Colors carry different emotional associations across cultures',
          'Imagery preferences vary by demographic and geography',
          'Alt text and ARIA labels must convey priming intent for assistive technology users',
        ],
      },
      {
        step: 5,
        title: 'Measure and Iterate',
        description:
          'A/B test priming variations and measure impact on behavior and satisfaction',
        example:
          'Test: aspirational imagery vs product screenshots before signup. Measure conversion rate, onboarding completion, and 30-day retention.',
        tips: [
          'Measure both immediate conversion and downstream retention',
          'Monitor for negative effects (false expectations, disappointment)',
          'Iterate on priming stimuli based on quantitative and qualitative data',
        ],
      },
    ],

    dos: [
      'Use imagery that authentically represents the product experience and user outcomes',
      'Match the emotional tone of priming elements to the genuine value proposition',
      'Maintain tonal consistency between priming elements and subsequent content',
      'Consider cultural differences in color, imagery, and symbol associations',
      'Provide accessible priming through alt text, ARIA labels, and non-visual channels',
      'Prime with positive outcomes rather than fear of negative consequences',
      'Test priming effectiveness with real users from diverse backgrounds',
      'Document intentional priming decisions for team alignment and ethical review',
    ],

    donts: [
      'Don\'t use fear-inducing imagery or copy to manipulate users toward paid features',
      'Don\'t create tonal mismatches between priming and subsequent content',
      'Don\'t use subliminal techniques designed to bypass conscious awareness entirely',
      'Don\'t prime expectations that the product cannot deliver',
      'Don\'t ignore cultural differences in emotional associations with colors and imagery',
      'Don\'t rely solely on visual priming -- ensure the experience works for all users',
      'Don\'t use negative priming (error states, warnings) before conversion points',
      'Don\'t assume the same priming works for all user segments and contexts',
    ],

    bestPractices: [
      {
        title: 'Ethical Priming Standard',
        description:
          'Apply the "transparency test": would users feel respected or manipulated if they understood the priming intent?',
        rationale:
          'Priming that serves user interests (setting helpful context, reducing anxiety) passes this test; priming that exploits emotions fails it',
        example:
          'Showing professional imagery before a business tool signup = helpful context. Showing scary hacker images before a paid security upgrade = manipulation.',
      },
      {
        title: 'Conscious vs Subliminal Boundary',
        description:
          'Keep priming at the level of professional design craft, not hidden manipulation',
        rationale:
          'Good design naturally primes through quality aesthetics and thoughtful content sequencing. Subliminal techniques cross ethical lines.',
        example:
          'Using warm photography and professional copy is ethical design; embedding hidden messages or exploiting perception thresholds is not.',
      },
      {
        title: 'Cultural Sensitivity in Visual Priming',
        description:
          'Research and respect cultural differences in color, imagery, and symbol associations',
        rationale:
          'Colors, gestures, animals, and symbols carry vastly different meanings across cultures, potentially priming unintended associations',
        example:
          'Red primes luck and prosperity in China, danger and urgency in the US. Localize priming elements for each market.',
      },
      {
        title: 'Multi-Channel Priming Reinforcement',
        description:
          'Use visual, verbal, and interactive channels together for coherent priming',
        rationale:
          'Multiple consistent primes are more effective than a single channel, and ensure accessibility',
        example:
          'Combine warm imagery (visual) + empowering copy (verbal) + smooth animations (interactive) for a coherent trust prime.',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Priming images must have alt text conveying emotional intent',
        implementation:
          'Write alt text that captures the emotional tone, not just visual content. "A child smiling while reading" conveys warmth better than "photo of child".',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Color-based priming must not be the only channel',
        implementation:
          'Combine color priming with typography, copy tone, and imagery so users who cannot perceive color differences still receive the intended priming.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Animated priming elements must be safe',
        implementation:
          'Ensure animated priming elements (loading screens, ambient effects) do not flash more than 3 times per second. Respect prefers-reduced-motion.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Priming content sequence must be preserved in semantic structure',
        implementation:
          'Ensure the DOM order presents priming content before decision points, so screen reader users encounter the priming context before the action.',
      },
    ],

    ethics: [
      {
        concern: 'Subliminal Manipulation',
        severity: 'critical',
        explanation:
          'Using techniques designed to influence users below the threshold of conscious awareness (e.g., flash frames, hidden imagery, inaudible audio)',
        mitigation:
          'Keep all priming at the level of professional design craft. If a technique relies on users NOT being able to detect it, do not use it.',
      },
      {
        concern: 'Fear-Based Priming for Upsells',
        severity: 'critical',
        explanation:
          'Using threatening imagery or alarming language to prime fear before presenting paid protection or premium features',
        mitigation:
          'Prime with positive benefits of upgrading rather than negative consequences of not upgrading. Let the product value speak for itself.',
      },
      {
        concern: 'False Expectation Priming',
        severity: 'high',
        explanation:
          'Using aspirational imagery that creates expectations the product cannot deliver',
        mitigation:
          'Ensure priming imagery and copy accurately represent the real product experience. Show actual UI and real customer outcomes.',
      },
      {
        concern: 'Cultural Insensitivity',
        severity: 'high',
        explanation:
          'Using imagery, colors, or symbols that carry negative associations in certain cultures',
        mitigation:
          'Research cultural associations for all target markets. Localize priming elements and conduct cultural sensitivity reviews.',
      },
      {
        concern: 'Exploiting Emotional Vulnerability',
        severity: 'critical',
        explanation:
          'Priming strong emotions (grief, loneliness, inadequacy) to drive conversion in contexts where users are emotionally vulnerable',
        mitigation:
          'In sensitive contexts (health, finance, grief), use neutral, respectful design. Prioritize user wellbeing over conversion optimization.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Facilitation in Recognizing Pairs of Words: Evidence of a Dependence Between Retrieval Operations',
        author: 'Meyer, D. E., & Schvaneveldt, R. W.',
        year: 1971,
        doi: '10.1037/h0031564',
        description:
          'The foundational paper demonstrating semantic priming -- related words are recognized faster than unrelated words, establishing the spreading activation model',
        type: 'foundational',
      },
      {
        title: 'Automaticity of Social Behavior: Direct Effects of Trait Construct and Stereotype Activation on Action',
        author: 'Bargh, J. A., Chen, M., & Burrows, L.',
        year: 1996,
        doi: '10.1037/0022-3514.71.2.230',
        description:
          'Classic demonstration that priming with stereotype-related words influences physical behavior (walking speed), showing priming extends beyond judgment to action',
        type: 'foundational',
      },
      {
        title: 'Nonconscious Goal Pursuit: Acting in an Explanatory Vacuum',
        author: 'Bargh, J. A., & Chartrand, T. L.',
        year: 1999,
        description:
          'Research on how priming can activate goals and motivations without conscious awareness, affecting subsequent behavior and decision-making',
        type: 'advanced',
      },
      {
        title: 'Affective Priming: Findings and Theories',
        author: 'Klauer, K. C., & Musch, J.',
        year: 2003,
        description:
          'Comprehensive review of affective priming research, documenting how emotional stimuli influence subsequent evaluative judgments',
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
          'Extensive coverage of priming effects as part of System 1 (fast, automatic) thinking, with numerous experimental examples',
        type: 'foundational',
      },
      {
        title: 'Before You Know It: The Unconscious Reasons We Do What We Do',
        author: 'Bargh, John',
        year: 2017,
        isbn: '9781501101212',
        description:
          'Written by the leading priming researcher, covering decades of priming research and its implications for everyday behavior',
        type: 'foundational',
      },
      {
        title: 'Subliminal: How Your Unconscious Mind Rules Your Behavior',
        author: 'Mlodinow, Leonard',
        year: 2012,
        isbn: '9780307472250',
        description:
          'Accessible overview of unconscious influences on behavior, including priming, with implications for design and communication',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Role of Priming in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/priming/',
        description:
          'Practical guide to understanding and applying priming effects in user experience design',
        type: 'practical',
      },
      {
        title: 'How Color Priming Affects User Experience',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/color-priming',
        description:
          'Focused analysis of how color choices prime emotional states and influence user behavior in digital interfaces',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Priming (Cognitive Bias) Explained',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=kPI6VvXGgSA',
        description:
          'Clear animated explanation of the priming effect with classic experimental examples',
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
