/**
 * SUFFIX EFFECT
 *
 * Adding an irrelevant item at the end of a list diminishes recall
 * of the final list items by disrupting the recency effect.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const suffixEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'suffix-effect',
    name: 'Suffix Effect',
    aliases: ['Stimulus Suffix Effect', 'End-of-List Interference'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'memory',
      'recall',
      'recency',
      'serial-position',
      'interference',
      'list-processing',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'Adding an irrelevant item at the end of a list diminishes recall of the final list items by disrupting the recency effect.',

    detailed: `The suffix effect is a memory phenomenon in which an irrelevant item appended to the end of a list significantly impairs recall of the last few items in that list. Normally, the most recently presented items enjoy a "recency advantage" — they are recalled more easily because they are still held in short-term (echoic or sensory) memory. A suffix disrupts this advantage by overwriting or interfering with the sensory trace of those final items.

The effect is remarkably robust: even when participants know the suffix is meaningless and should be ignored, it still degrades recall of end-of-list items. The suffix does not need to be related to the list content — a simple tone, a spoken word like "zero," or any extraneous stimulus is sufficient.

In UX design, the suffix effect has direct implications for how users process and remember sequences of information. Any distracting element placed after key content — a decorative animation after a CTA, a promotional banner after a confirmation message, or unnecessary footer clutter after critical instructions — can function as a cognitive suffix, eroding the user's memory of the most important preceding content.`,

    psychologyBasis: {
      discoveredBy: 'Robert G. Crowder',
      year: 1967,
      theory: 'Precategorical Acoustic Storage (PAS) Model',
      mechanism: `The suffix effect occurs because an irrelevant end-of-list item disrupts the sensory memory trace of preceding items. This happens through several mechanisms:

1. **Echoic Memory Overwrite**: The suffix replaces or degrades the sensory (echoic) trace of the last few list items in precategorical acoustic storage
2. **Recency Disruption**: Under normal conditions, the final items benefit from recency — they are still in sensory memory and easily retrieved. The suffix eliminates this advantage
3. **Grouping Interference**: The suffix is involuntarily grouped with the list items, even when participants know it is irrelevant, disrupting the boundary of the list
4. **Attentional Capture**: The suffix captures a small amount of attention, which is enough to interfere with the fragile sensory traces of the final items
5. **Modality Specificity**: The effect is strongest when the suffix shares the same modality (auditory-auditory), because it competes for the same sensory storage channel`,
    },

    realWorldExample: `In Crowder's classic 1967 experiments, participants heard lists of digits followed by either silence or a spoken "zero" (the suffix). When the suffix was present, recall of the last 2-3 digits dropped dramatically — by as much as 25-30% — even though participants were explicitly told to ignore the "zero." The suffix had virtually no effect on items earlier in the list, confirming that it specifically disrupts the recency component of serial recall.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The suffix effect reveals how easily the recency advantage in user memory can be disrupted by extraneous content placed after key information. Designers can apply this understanding to:

- Ensure nothing distracting follows critical calls-to-action
- Keep confirmation and thank-you screens clean and focused
- Avoid post-CTA noise that undermines the last message users received
- Design clean endings for multi-step flows so users retain final instructions
- Reduce cognitive interference in sequential content presentation`,

    whenToUse: [
      {
        title: 'Post-CTA Clarity',
        scenario:
          'When presenting a primary call-to-action that users need to remember and act on',
        example:
          'End the page with the CTA button and a brief reinforcing message — no promotional banners, social media widgets, or unrelated links below it',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Confirmation Screen Design',
        scenario: 'When showing order confirmations, submission receipts, or success states',
        example:
          'Display confirmation number, next steps, and essential details only — omit upsells, surveys, or decorative elements that could overwrite the confirmation from memory',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Flow Endings',
        scenario: 'When concluding a multi-step onboarding or tutorial sequence',
        example:
          'End onboarding with the single most important action the user should take next, without appending tips, promotions, or secondary options',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Instructional Content Sequences',
        scenario: 'When presenting sequential instructions that users must follow in order',
        example:
          'After the final step in a how-to guide, avoid appending "related articles" or "you might also like" sections that could displace the last instruction from memory',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Email and Notification Design',
        scenario: 'When composing emails or notifications with a clear intended action',
        example:
          'Place the key message and CTA prominently, and keep email signatures and footers minimal so they do not function as a cognitive suffix',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Content Discovery Pages',
        reason:
          'Pages designed for browsing and exploration benefit from related content at the end',
        consequence:
          'Removing all follow-on content may reduce engagement and time on site',
        alternative:
          'Use clear visual separation between primary content and discovery sections so they are perceived as distinct groups, not a suffix to the main list',
      },
      {
        title: 'Legal or Compliance Footers',
        reason:
          'Required disclosures and legal text must appear even if they act as a suffix',
        consequence:
          'Omitting required information creates legal risk',
        alternative:
          'Visually separate legal content from primary content using dividers, reduced prominence, or collapsible sections so it does not interfere with key messaging',
      },
      {
        title: 'Progressive Disclosure Flows',
        reason:
          'Some flows intentionally reveal additional context after the primary message',
        consequence:
          'Removing all post-primary content may reduce comprehension',
        alternative:
          'Use deliberate grouping and spacing to ensure additional context is perceived as supplementary, not as an interfering suffix',
      },
    ],

    commonMistakes: [
      {
        title: 'Post-CTA Clutter',
        description:
          'Adding promotional banners, social sharing buttons, or newsletter sign-ups directly below a primary CTA',
        why: 'These elements function as a cognitive suffix, diminishing the user\'s retention of the CTA\'s message and reducing conversion',
        fix: 'Remove or visually separate all non-essential elements below the primary CTA. Let the CTA be the last thing the user processes',
      },
      {
        title: 'Noisy Confirmation Pages',
        description:
          'Cluttering order confirmation or submission success pages with upsells, surveys, and cross-promotions',
        why: 'The additional content acts as a suffix, displacing the confirmation details (order number, next steps) from the user\'s short-term memory',
        fix: 'Present confirmation details prominently and cleanly. If upsells are necessary, place them in a clearly separated section below a strong visual divider',
      },
      {
        title: 'Decorative Animations After Key Content',
        description:
          'Playing celebratory animations, confetti effects, or transitions after presenting important information',
        why: 'Visual animations capture attention and can overwrite the sensory trace of the preceding information, functioning as a visual suffix',
        fix: 'If animations are used, trigger them before or simultaneously with the key content, not after it',
      },
      {
        title: 'Verbose Email Signatures',
        description:
          'Appending long email signatures with multiple links, logos, disclaimers, and social media icons after the message body',
        why: 'The signature acts as a suffix to the email\'s main message, reducing recall of the final paragraph — often the one containing the action item',
        fix: 'Keep email signatures minimal. Place the most important call-to-action early or mid-message rather than relying on the final paragraph',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines what appears after key content and whether it functions as a disruptive suffix',
        examples: [
          'Clean endings after CTAs preserve recency advantage for the action',
          'Footer clutter below primary content acts as an interfering suffix',
          'White space after key messages prevents suffix interference',
          'Visual dividers between primary and secondary content reduce grouping',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text after key content can disrupt recall if it competes for attention',
        examples: [
          'Small, muted text after primary content minimizes suffix interference',
          'Bold or large text after a CTA creates a strong suffix effect',
          'Typographic hierarchy signals where the "real" content ends',
          'Consistent font sizing avoids accidental emphasis on suffix content',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color contrast and salience of post-content elements affect suffix strength',
        examples: [
          'Muted, low-contrast post-CTA elements reduce suffix interference',
          'Bright colors on footer elements create a strong visual suffix',
          'Background color changes can separate primary content from suffix zones',
          'Consistent color treatment keeps focus on the primary message',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements after key content compete for attention and memory',
        examples: [
          'Auto-playing videos after key content create a strong suffix effect',
          'Pop-ups or tooltips triggered after completing a flow disrupt final-step recall',
          'Scroll-triggered animations below CTAs capture attention from the action',
          'Clean post-action states (no modals, no redirects) preserve user memory',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content placement relative to key information determines suffix interference',
        examples: [
          'Placing "related articles" immediately after instructions displaces the final steps',
          '"You might also like" sections after checkout confirmation disrupt order detail recall',
          'Promotional text after a thank-you message diminishes the gratitude sentiment',
          'Clean endings with no extraneous content preserve the last impression',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen reader users process content linearly, making suffix effects especially impactful',
        examples: [
          'Screen readers encounter all post-content elements sequentially, amplifying suffix interference',
          'ARIA live regions that announce post-content updates can overwrite key message recall',
          'Linear reading order means footer content always acts as a suffix for screen reader users',
          'Skip links allowing users to bypass suffix content can preserve recall of key information',
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
        title: 'Clean Checkout Confirmation',
        description:
          'Order confirmation page with only essential information and no distracting suffix elements',
        code: `<div class="confirmation-page">
  <div class="success-icon" aria-hidden="true">&#10003;</div>
  <h2>Order Confirmed</h2>
  <p class="order-number">Order #84291</p>
  <div class="next-steps">
    <p>You'll receive a confirmation email at <strong>you@email.com</strong></p>
    <p>Estimated delivery: <strong>March 25-27</strong></p>
  </div>
  <button class="primary">Track Your Order</button>
</div>

<!-- No upsells, no surveys, no cross-promotions below -->`,
        explanation:
          'The confirmation page ends cleanly after the essential information and primary action. No extraneous content acts as a suffix to displace the order number or delivery date from memory.',
        principle:
          'Eliminating post-confirmation noise preserves recall of critical order details',
        metrics: {
          before: '34% of users called support to re-confirm order details',
          after: '12% of users called support after clean confirmation redesign',
          improvement: '65% reduction in post-order support inquiries',
        },
      },
      {
        title: 'Focused CTA Ending',
        description:
          'Landing page ending with a clear CTA and no distracting elements below',
        code: `<section class="cta-section">
  <h2>Start Your Free Trial</h2>
  <p>No credit card required. Cancel anytime.</p>
  <button class="cta-primary">Get Started Free</button>
</section>

<footer class="minimal-footer">
  <p>&copy; 2026 Company Name</p>
</footer>`,
        explanation:
          'The page ends with the CTA as the last meaningful content. The footer is minimal — just a copyright line — so it does not function as a cognitive suffix that could diminish the CTA\'s impact.',
        principle:
          'A clean ending after the CTA ensures the action message is the last thing users encode',
      },
      {
        title: 'Clean Onboarding Completion',
        description:
          'Onboarding final step that ends with a single clear action',
        code: `<div class="onboarding-complete">
  <h2>You're All Set!</h2>
  <p>Your workspace is ready. Create your first project to get started.</p>
  <button class="primary">Create First Project</button>
</div>

<!-- No "tips", "did you know", or secondary CTAs appended -->`,
        explanation:
          'The onboarding concludes with one clear next action. No tips, feature highlights, or secondary options are appended, so the "Create First Project" instruction is retained in memory without suffix interference.',
        principle:
          'Single clear ending action avoids suffix-induced confusion about what to do next',
        metrics: {
          before: '41% completed first project within 10 minutes of onboarding',
          after: '63% completed first project after removing post-onboarding distractions',
          improvement: '54% increase in immediate first-project creation',
        },
      },
    ],

    bad: [
      {
        title: 'Cluttered Confirmation Page',
        description:
          'Order confirmation page buried under upsells and promotions',
        code: `<!-- DON'T DO THIS -->
<div class="confirmation-page">
  <h2>Order Confirmed - #84291</h2>
  <p>Delivery: March 25-27</p>

  <div class="upsell-banner">
    <h3>Customers Also Bought:</h3>
    <div class="product-grid">
      <!-- 8 product cards with images, prices, add-to-cart buttons -->
    </div>
  </div>

  <div class="survey-prompt">
    <h3>How was your experience?</h3>
    <div class="star-rating"><!-- 5 clickable stars --></div>
  </div>

  <div class="social-sharing">
    <p>Share your purchase!</p>
    <!-- 6 social media buttons -->
  </div>

  <div class="newsletter-signup">
    <h3>Get 10% off your next order!</h3>
    <input type="email" placeholder="Enter your email">
    <button>Subscribe</button>
  </div>
</div>`,
        explanation:
          'The order number and delivery date are followed by four distinct blocks of extraneous content. Each one acts as a suffix, progressively eroding the user\'s memory of the confirmation details. Users leave the page unable to recall their order number or delivery window.',
        principle:
          'Stacking multiple suffix elements after key information compounds recall loss',
      },
      {
        title: 'Distracting Post-CTA Elements',
        description:
          'Primary CTA followed by competing visual elements',
        code: `<!-- DON'T DO THIS -->
<section class="cta-section">
  <h2>Start Your Free Trial</h2>
  <button class="cta-primary">Get Started Free</button>
</section>

<div class="announcement-bar" style="background: #ff6b35; color: white;">
  <marquee>NEW: Check out our latest features! Limited time offer! Join our webinar!</marquee>
</div>

<div class="social-proof-ticker">
  <p>John from Texas just signed up!</p>
  <p>Sarah from London just signed up!</p>
  <p>Mike from Tokyo just signed up!</p>
</div>

<div class="partner-logos">
  <!-- 12 partner company logos -->
</div>`,
        explanation:
          'The animated announcement bar, social proof ticker, and partner logos all function as powerful suffixes. The user\'s memory of the CTA ("Get Started Free") is overwritten by these attention-grabbing elements.',
        principle:
          'High-salience elements after a CTA destroy the recency advantage of the action message',
      },
      {
        title: 'Noisy Email Ending',
        description:
          'Important email action buried before a massive signature block',
        code: `<!-- DON'T DO THIS -->
<p>Please review and approve the attached contract by Friday.</p>

<div class="signature">
  <img src="logo.png" width="200">
  <p><strong>Jane Smith</strong></p>
  <p>Senior Vice President of Operations</p>
  <p>Global Division, Enterprise Solutions Group</p>
  <p>Phone: +1 (555) 123-4567</p>
  <p>Mobile: +1 (555) 987-6543</p>
  <p>Fax: +1 (555) 111-2222</p>
  <p>Email: jane.smith@company.com</p>
  <p>Web: www.company.com</p>
  <div class="social-links">
    <a href="#">LinkedIn</a> | <a href="#">Twitter</a> | <a href="#">Facebook</a>
  </div>
  <p class="disclaimer" style="font-size: 8px;">
    This email is confidential... [200 words of legal disclaimer]
  </p>
</div>`,
        explanation:
          'The critical action ("approve the contract by Friday") appears just before a massive signature block with 15+ lines of contact info, social links, and legal disclaimers. This signature functions as a powerful suffix, displacing the action item from the reader\'s short-term memory.',
        principle:
          'Verbose signatures and footers act as suffixes that erode recall of the preceding message',
      },
    ],

    realWorld: [
      {
        company: 'Stripe',
        product: 'Payment Confirmation Pages',
        description:
          'Stripe\'s checkout confirmation screens are notably clean — showing payment confirmation, amount, and receipt link with minimal surrounding content. No upsells or distracting elements follow the confirmation, preserving the user\'s recall of transaction details.',
        effectiveness: 'very-effective',
        analysis:
          'By eliminating post-confirmation noise, Stripe ensures users leave with clear memory of the transaction outcome. This reduces "did it go through?" anxiety and support tickets.',
      },
      {
        company: 'Apple',
        product: 'Post-Purchase Confirmation Emails',
        description:
          'Apple\'s order confirmation emails lead with the order number, delivery date, and product summary, followed by a minimal footer. The signature and legal text are visually separated and muted, reducing their function as a cognitive suffix.',
        effectiveness: 'effective',
        analysis:
          'The clean hierarchy and visual separation prevent the footer content from interfering with recall of order details. Users can quickly scan and retain the key information.',
      },
      {
        company: 'Duolingo',
        product: 'Lesson Completion Screens',
        description:
          'After completing a lesson, Duolingo shows the XP earned and streak count on a clean screen with a single "Continue" button. No ads, no upsells, no secondary actions distract from the achievement message.',
        effectiveness: 'very-effective',
        analysis:
          'The clean ending reinforces the sense of accomplishment. The user leaves the lesson remembering the positive outcome (XP, streak) rather than a suffix of promotional content.',
      },
      {
        company: 'Slack',
        product: 'Post-Submission Feedback Screens',
        description:
          'When users submit feedback or complete workspace setup, Slack presents a clean confirmation with a single next action. No extraneous content follows the confirmation message.',
        effectiveness: 'effective',
        analysis:
          'Slack\'s minimal post-action screens ensure the user retains the confirmation and understands their next step without suffix-induced confusion.',
      },
    ],

    abTests: [
      {
        title: 'Checkout Confirmation: Clean vs Cluttered',
        hypothesis:
          'Removing post-confirmation upsells will reduce support inquiries about order details',
        controlVersion: {
          description:
            'Confirmation page with order details followed by 3 upsell product rows, a satisfaction survey, and a newsletter signup',
          metrics: {
            conversionRate: '100%',
            timeOnPage: '0:45',
            scrollDepth: '92%',
          },
        },
        treatmentVersion: {
          description:
            'Clean confirmation page with only order number, delivery estimate, tracking button, and minimal footer',
          metrics: {
            conversionRate: '100%',
            timeOnPage: '0:18',
            scrollDepth: '100%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Support inquiries about order details dropped 58% with the clean confirmation page. Users spent less time on the page but retained more information. Follow-up survey showed 89% could recall their order number vs 52% with the cluttered version.',
          learnings: [
            'Post-confirmation clutter functions as a cognitive suffix, degrading recall of order details',
            'Users retained order numbers and delivery dates significantly better without suffix elements',
            'Upsell revenue from the confirmation page was negligible ($0.12 per order) and not worth the support cost increase',
            'Clean confirmations also improved perceived trust and professionalism',
          ],
        },
      },
      {
        title: 'Landing Page CTA: With vs Without Post-CTA Content',
        hypothesis:
          'Removing content below the primary CTA will increase click-through rate',
        controlVersion: {
          description:
            'Landing page with CTA button followed by partner logos, social proof ticker, and a secondary promotional banner',
          metrics: {
            conversionRate: '3.2%',
            clickThroughRate: '5.8%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page ending with CTA button and minimal copyright footer only',
          metrics: {
            conversionRate: '4.7%',
            clickThroughRate: '8.1%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Removing post-CTA content increased click-through by 40% and conversion by 47%. Eye-tracking showed users in the control version shifted attention to the elements below the CTA, weakening their recall of the CTA message.',
          learnings: [
            'Elements below a CTA function as suffixes that diminish the CTA\'s impact',
            'Even "supportive" content like partner logos can act as an interfering suffix',
            'Users remembered the CTA text better in the clean version (78% vs 41% unprompted recall)',
            'The suffix effect was strongest on mobile where users scroll past the CTA to see footer content',
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
        name: 'Post-CTA Content',
        description:
          'Promotional banners, social widgets, or unrelated content placed directly below a primary call-to-action',
        howToSpot:
          'Scroll below CTAs and check if there are attention-grabbing elements that could displace the CTA from memory',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Cluttered Confirmation Screens',
        description:
          'Confirmation or success pages loaded with upsells, surveys, or promotional content after the key message',
        howToSpot:
          'Complete a purchase or form submission and observe how much extraneous content follows the confirmation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Verbose Email Signatures',
        description:
          'Long signature blocks with logos, social links, and legal text following the email\'s main message',
        howToSpot:
          'Check if the email signature occupies more vertical space than the message body and contains high-salience elements',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Post-Content Animations',
        description:
          'Decorative animations, confetti effects, or auto-playing media that trigger after key content is displayed',
        howToSpot:
          'Watch for movement or animation that starts after the user has seen the primary content',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Footer Overload',
        description:
          'Dense footers with many links, widgets, and visual elements that follow critical page content',
        howToSpot:
          'Evaluate footer density relative to the page\'s primary content — does the footer compete for attention?',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Post-Action Noise Pattern',
        description: 'Extraneous content or UI elements appearing after a user completes a key action',
        indicators: [
          'Upsell carousels on confirmation pages',
          'Survey prompts immediately after form submission',
          'Social sharing widgets after checkout',
          'Newsletter signup modals after purchase',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'CTA Burial Pattern',
        description: 'High-salience content placed below a primary CTA, drawing attention away from the action',
        indicators: [
          'Animated banners below CTA buttons',
          'Bright-colored promotional sections after primary actions',
          'Auto-scrolling content below the fold',
          'Social proof tickers that appear after the CTA',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Signature Suffix Pattern',
        description: 'Extensive email signature content that dominates the end of messages',
        indicators: [
          'Signature longer than 5 lines',
          'Images or logos in email signatures',
          'Multiple social media links in signatures',
          'Legal disclaimers appended to every message',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Sequential Content Interference',
        description: 'Related but non-essential content appended to instructional sequences',
        indicators: [
          '"Related articles" placed immediately after step-by-step instructions',
          '"You might also like" after tutorial completions',
          'Promotional content after onboarding steps',
          'Tips or trivia appended to how-to guides',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Is there any content or visual element placed after the primary CTA that could distract from it?',
      'Does the confirmation or success screen contain anything beyond essential information?',
      'Could the user easily recall the key message after viewing all post-content elements?',
      'Are email signatures proportionate to the message body?',
      'Do post-content elements (footers, related content, promotions) share the same modality and visual weight as the primary content?',
      'Is there sufficient visual separation between primary content and supplementary sections?',
      'Does the page or screen end cleanly, or is there noise after the key information?',
      'Could any decorative element (animation, illustration) after key content function as a suffix?',
      'Would removing the post-content elements improve recall of the primary message?',
      'Are there opportunities to move supplementary content to a separate page or collapsible section?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the suffix effect — the phenomenon where irrelevant items appended to the end of a sequence degrade recall of the final items.

Analyze the provided design for suffix effect patterns. Identify:

1. **Post-CTA Noise**: Any content, promotions, or visual elements placed after primary calls-to-action
2. **Confirmation Screen Clutter**: Extraneous content following confirmation or success messages
3. **End-of-Flow Interference**: Distracting elements at the conclusion of multi-step flows
4. **Signature/Footer Suffixes**: Verbose signatures or dense footers that could displace preceding content from memory
5. **Sequential Content Disruption**: Non-essential content appended to instructional or informational sequences

For each pattern found:
- Identify what key content is being displaced from memory
- Assess the severity of the suffix interference
- Determine if the suffix content is necessary or removable
- Evaluate whether visual separation could mitigate the effect
- Suggest specific improvements for preserving user recall of key information

Consider:
- Is the user's recency advantage being protected for the most important content?
- Do post-content elements share the same modality and visual weight as key content?
- Could supplementary content be moved to a separate context?
- Are clean endings preserved for critical moments (confirmations, CTAs, instructions)?
- How does the suffix effect interact with the user's linear reading/scrolling order?

Provide actionable recommendations for eliminating or mitigating suffix interference.`,

    outputSchema: {
      type: 'object',
      properties: {
        suffixPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              displacedContent: { type: 'string' },
              suffixElement: { type: 'string' },
              severity: { type: 'string' },
              removable: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'displacedContent',
              'suffixElement',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            endingCleanliness: { type: 'number' },
            recencyPreservation: { type: 'number' },
            suffixSeverity: { type: 'number' },
            contentFocus: { type: 'number' },
          },
          required: [
            'endingCleanliness',
            'recencyPreservation',
            'suffixSeverity',
            'contentFocus',
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
        'suffixPatterns',
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
        title: 'Identify Critical Endings',
        description:
          'Map all the key moments in your interface where the last piece of content matters most: CTAs, confirmations, final instructions, action prompts',
        example:
          'Audit: checkout confirmation, onboarding completion, email action requests, tutorial final steps',
        tips: [
          'Focus on moments where the user needs to remember or act on the final item',
          'Consider mobile and desktop endings separately — scroll behavior differs',
          'Include email and notification endings, not just page content',
        ],
      },
      {
        step: 2,
        title: 'Audit Post-Content Elements',
        description:
          'For each critical ending, catalog everything that appears after the key content',
        example:
          'Confirmation page audit: upsell carousel (suffix), survey prompt (suffix), social links (suffix), copyright line (acceptable)',
        tips: [
          'Screenshot and annotate the full page below the key content',
          'Classify each element as essential, helpful, or extraneous',
          'Measure the visual weight of post-content elements vs the key content',
        ],
      },
      {
        step: 3,
        title: 'Remove or Relocate Suffix Elements',
        description:
          'Eliminate extraneous post-content elements or move them to separate pages, collapsible sections, or follow-up emails',
        example:
          'Move confirmation page upsells to a follow-up email sent 24 hours later instead of showing them on the confirmation page',
        tips: [
          'Prioritize removal over relocation — fewer elements is usually better',
          'If content must stay, reduce its visual weight (smaller, muted, below a divider)',
          'Test whether relocated content performs as well in its new position',
        ],
      },
      {
        step: 4,
        title: 'Create Visual Separation',
        description:
          'Where suffix elements cannot be removed, use strong visual boundaries to prevent them from grouping with key content',
        example:
          'Add substantial whitespace, a horizontal rule, or a background color change between confirmation details and any remaining footer content',
        tips: [
          'Whitespace is the most effective separator — use generous margins',
          'Background color changes signal a new section, reducing grouping',
          'Collapsible sections prevent suffix content from being visible by default',
        ],
      },
      {
        step: 5,
        title: 'Test Recall and Comprehension',
        description:
          'Measure whether users can recall key information after viewing the complete page including any suffix elements',
        example:
          'Survey users 5 minutes after checkout: "What is your order number?" and "When is your estimated delivery?"',
        tips: [
          'Compare recall rates between clean and cluttered versions',
          'Test with both immediate and delayed recall',
          'Use eye-tracking to see if suffix elements draw attention from key content',
        ],
      },
    ],

    dos: [
      'End pages and screens cleanly after the primary content or CTA',
      'Keep confirmation and success screens focused on essential information only',
      'Use generous whitespace after key content to prevent suffix grouping',
      'Minimize email signatures to reduce their function as cognitive suffixes',
      'Move non-essential post-content (upsells, surveys) to follow-up communications',
      'Test whether users can recall key information after viewing the full page',
      'Use visual dividers to separate necessary footer content from primary content',
      'Design the last element on a page to be the most important one',
    ],

    donts: [
      'Don\'t place promotional content directly below primary CTAs',
      'Don\'t clutter confirmation pages with upsells, surveys, or social sharing',
      'Don\'t use decorative animations that trigger after key content is displayed',
      'Don\'t append unrelated content to the end of instructional sequences',
      'Don\'t let email signatures dominate the ending of messages',
      'Don\'t place high-salience elements (bright colors, movement) after key content',
      'Don\'t assume users will ignore suffix elements — the effect is automatic',
      'Don\'t sacrifice end-of-page cleanliness for marginal engagement metrics',
    ],

    bestPractices: [
      {
        title: 'The Clean Ending Principle',
        description:
          'The last meaningful element on a page should be the one you most want users to remember',
        rationale:
          'The recency effect gives a memory advantage to the last items processed — protect this advantage by keeping endings clean',
        example:
          'End a pricing page with the CTA button and a single reinforcing line, nothing else',
      },
      {
        title: 'Temporal Separation for Suffix Content',
        description:
          'Move post-action content (upsells, surveys) to a separate time — follow-up emails, next-session prompts, or delayed notifications',
        rationale:
          'Temporal separation prevents the content from functioning as an immediate suffix that displaces key information',
        example:
          'Send an upsell email 24 hours after purchase instead of showing it on the confirmation page',
      },
      {
        title: 'Modality Differentiation',
        description:
          'If suffix content is unavoidable, use a different modality (visual vs text) or style to reduce interference',
        rationale:
          'The suffix effect is strongest when the suffix matches the modality of the list items — differentiation reduces interference',
        example:
          'If key content is text-based, use a subtle icon-only footer rather than text-heavy navigation',
      },
      {
        title: 'Visual Grouping Boundaries',
        description:
          'Use strong visual boundaries (whitespace, color changes, dividers) to prevent suffix content from grouping with key content',
        rationale:
          'The suffix effect depends on perceptual grouping — breaking the group reduces interference',
        example:
          'Place a background color change and 80px of whitespace between order confirmation and any remaining page content',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Ensure structural separation between primary content and suffix elements',
        implementation:
          'Use semantic HTML sections, landmarks, and heading hierarchy to clearly delineate where key content ends and supplementary content begins',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.1',
        guideline:
          'Bypass Blocks — Allow users to skip past suffix content',
        implementation:
          'Provide skip links or landmarks that allow screen reader users to bypass footer content, signatures, and supplementary sections',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Use clear headings to separate content sections',
        implementation:
          'Label supplementary sections clearly ("Related Products", "Legal Information") so users can distinguish them from primary content',
      },
    ],

    ethics: [
      {
        concern: 'Intentional Information Displacement',
        severity: 'high',
        explanation:
          'Deliberately placing distracting content after important disclosures or terms to reduce the user\'s recall of unfavorable information',
        mitigation:
          'Never use the suffix effect to hide or diminish important disclosures. Ensure key terms and conditions are presented in a way that preserves recall.',
      },
      {
        concern: 'Manipulative Post-Action Content',
        severity: 'medium',
        explanation:
          'Using post-action content (upsells, urgency messages) to exploit the user\'s reduced cognitive clarity after completing a task',
        mitigation:
          'Allow users time to process their action before presenting additional offers. Use temporal separation rather than immediate post-action prompts.',
      },
      {
        concern: 'Obscuring Cancellation or Refund Information',
        severity: 'critical',
        explanation:
          'Placing cancellation instructions or refund policies after dense content that functions as a suffix, making the important information harder to recall',
        mitigation:
          'Present cancellation and refund information prominently and early, not buried at the end of long pages where suffix interference reduces recall.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Role of a Stimulus Suffix in Free Recall',
        author: 'Crowder, R. G.',
        year: 1967,
        description:
          'The foundational paper demonstrating that an irrelevant suffix item impairs recall of the final items in a list, establishing the suffix effect as a robust memory phenomenon',
        type: 'foundational',
      },
      {
        title: 'The Stimulus Suffix Effect as a Memory Coding Phenomenon',
        author: 'Dallett, K. M.',
        year: 1965,
        description:
          'Early research on how end-of-list stimuli affect memory encoding, contributing to the theoretical framework for the suffix effect',
        type: 'foundational',
      },
      {
        title: 'Precategorical Acoustic Storage (PAS)',
        author: 'Crowder, R. G., & Morton, J.',
        year: 1969,
        description:
          'Proposes the precategorical acoustic storage model that explains the suffix effect through sensory memory overwriting',
        type: 'foundational',
      },
      {
        title: 'Visual Suffix Effects in Short-Term Memory',
        author: 'Hitch, G. J.',
        year: 1975,
        description:
          'Extended suffix effect research to visual modality, showing that visual suffixes also impair recall of final list items',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Human Memory: Theory and Practice',
        author: 'Baddeley, Alan',
        year: 1997,
        isbn: '9780205147748',
        description:
          'Comprehensive coverage of short-term memory phenomena including the suffix effect, within the working memory framework',
        type: 'foundational',
      },
      {
        title: 'Memory: From Mind to Molecules',
        author: 'Squire, L. R., & Kandel, E. R.',
        year: 2009,
        isbn: '9780981519418',
        description:
          'Covers the neuroscience of memory including sensory memory systems relevant to understanding the suffix effect',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'The Serial Position Effect in UX Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/serial-position-effect',
        description:
          'Practical guide to serial position effects (including suffix effect) in user interface design',
        type: 'practical',
      },
    ],

    videos: [],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'recency-effect',       // The suffix effect directly disrupts the recency effect
      'serial-position-effect', // Suffix effect is a modulation of the serial position curve
      'von-restorff-effect',  // Distinctiveness can counter suffix interference
      'peak-end-rule',        // Clean endings align with the peak-end rule for experience memory
    ],

    conflicts: [
      'mere-exposure-effect', // Repeated suffix exposure does not build familiarity for the displaced items
      'availability-heuristic', // Suffix elements may become more "available" than the key content they displaced
    ],

    confusedWith: [
      'recency-effect',       // Suffix effect is often confused with a failure of recency, but it is specifically caused by suffix interference
      'primacy-effect',       // Both are serial position phenomena but operate through different mechanisms
      'attention-decay',      // Suffix effect is not simple decay — it is active interference
    ],

    hierarchy: {
      parent: 'serial-position-effect',
      children: [
        'auditory-suffix-effect',
        'visual-suffix-effect',
      ],
    },
  },
};
