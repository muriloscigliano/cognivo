/**
 * RECOGNITION HEURISTIC
 *
 * If one option is recognized and another is not,
 * the recognized one is judged as superior.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const recognitionHeuristic: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'recognition-heuristic',
    name: 'Recognition Heuristic',
    aliases: ['Recognition Principle', 'Name Recognition Effect', 'Familiarity Heuristic'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'familiarity',
      'brand-recognition',
      'judgment',
      'pattern-recognition',
      'trust',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'If one option is recognized and another is not, the recognized one is judged superior.',

    detailed: `The Recognition Heuristic is a cognitive shortcut where, when choosing between two options, people infer that the recognized option has greater value on the criterion in question. If you recognize one city's name but not the other, you will judge the recognized city as having a larger population. If you recognize one brand but not another, you will assume the recognized brand is higher quality.

This heuristic is remarkably effective in environments where recognition correlates with the criterion being judged — which it often does. Well-known cities tend to be larger; recognized brands tend to have wider adoption. The heuristic exploits the ecological structure of information: media coverage, word-of-mouth, and cultural prominence all track real-world importance to some degree.

In UX and product design, the recognition heuristic profoundly shapes how users evaluate interfaces, choose tools, and trust platforms. Users gravitate toward familiar UI patterns, recognized brand names, and known frameworks. Designers who understand this can build trust through familiarity while carefully introducing novel elements that improve the experience.`,

    psychologyBasis: {
      discoveredBy: 'Daniel G. Goldstein and Gerd Gigerenzer',
      year: 2002,
      theory: 'Fast and Frugal Heuristics / Ecological Rationality',
      mechanism: `The recognition heuristic operates as a one-cue decision strategy that exploits the correlation between recognition and real-world criteria. It works because:

1. **Binary Recognition Gateway**: The brain first checks a simple binary — "Do I recognize this?" — before engaging any deeper evaluation. If one option passes and the other doesn't, the recognized option wins immediately.
2. **Ecological Validity**: Recognition is not random. Objects appear in our environment (news, conversations, advertisements) roughly in proportion to their importance, size, or quality. The heuristic exploits this environmental regularity.
3. **Less-Is-More Effect**: In some domains, people with less knowledge (who recognize fewer options) actually make more accurate judgments than experts, because they can rely on recognition as a valid cue while experts must weigh conflicting information.
4. **Memory Trace Activation**: Recognition triggers a feeling of fluency — the recognized option is processed faster and feels more comfortable, which is then attributed to quality or correctness.
5. **Non-Compensatory Strategy**: Unlike other heuristics, recognition is not traded off against other information. When the heuristic fires, additional knowledge is ignored — recognition alone determines the judgment.`,
    },

    realWorldExample: `In Goldstein and Gigerenzer's classic 2002 study, American students were asked which of two German cities had a larger population. When they recognized one city but not the other, they correctly chose the recognized city about 90% of the time. Remarkably, German students — who recognized both cities and had more knowledge — performed worse because they could not rely on the simple recognition cue and instead had to weigh conflicting information. This "less-is-more" effect demonstrated that ignorance, paired with recognition, can paradoxically outperform knowledge.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Recognition Heuristic profoundly shapes how users evaluate and choose between options in digital interfaces. Users consistently prefer what they recognize — familiar brands, known UI patterns, established conventions — and treat unfamiliarity as a signal of lower quality or higher risk. Designers can leverage this to:

- Build immediate trust by using recognized UI conventions and familiar patterns
- Increase adoption by aligning with users' existing mental models from known products
- Reduce cognitive load by leveraging familiar navigation, icons, and interaction paradigms
- Strengthen brand credibility by associating with recognized partners, certifications, and integrations
- Guide feature discovery by anchoring new capabilities to recognized patterns`,

    whenToUse: [
      {
        title: 'Building Trust with New Users',
        scenario:
          'When onboarding users who have never interacted with your product before',
        example:
          'Use recognizable UI patterns (hamburger menu, search bar placement, card layouts) so users feel immediately at home',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Brand and Partner Associations',
        scenario: 'When establishing credibility for a lesser-known product or company',
        example:
          'Display logos of recognized clients, partners, or integrations ("Trusted by Google, Microsoft, Stripe") to transfer brand recognition',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Framework and Technology Choices',
        scenario: 'When presenting technology stack or integration options to developers',
        example:
          'Highlight recognized frameworks (React, Vue, Angular) prominently; place lesser-known alternatives secondary',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Navigation and Information Architecture',
        scenario: 'When designing navigation for complex applications',
        example:
          'Use standard navigation patterns (sidebar nav, breadcrumbs, tab bars) that users recognize from established products',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'E-commerce Product Listings',
        scenario: 'When displaying products from both known and unknown brands',
        example:
          'Feature recognized brand names prominently in search results and category pages to increase click-through rates',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Payment and Security Flows',
        scenario: 'When asking users to enter sensitive information',
        example:
          'Display recognized payment providers (Visa, Mastercard, PayPal) and security badges (SSL, Norton Secured) to trigger trust via recognition',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Innovation and Differentiation',
        reason:
          'Over-reliance on familiar patterns prevents you from introducing genuinely better solutions',
        consequence:
          'Product becomes a commodity clone that offers no unique value proposition',
        alternative:
          'Introduce novel interactions gradually, anchoring them to familiar elements. Use progressive disclosure to ease users into new patterns.',
      },
      {
        title: 'When Familiarity Masks Poor Quality',
        reason:
          'Leveraging brand recognition to sell inferior products is deceptive',
        consequence:
          'Users trust the recognized name, make poor choices, and lose trust permanently when they discover the quality gap',
        alternative:
          'Compete on genuine quality and let recognition build organically from positive experiences',
      },
      {
        title: 'Accessibility-Critical Contexts',
        reason:
          'Recognized patterns may not always be the most accessible patterns',
        consequence:
          'Following convention blindly can perpetuate inaccessible designs just because they are familiar',
        alternative:
          'Audit recognized patterns for accessibility. Improve them where needed, even if it means deviating from convention.',
      },
      {
        title: 'Diverse or Global Audiences',
        reason:
          'What is recognized varies enormously across cultures, regions, and demographics',
        consequence:
          'Assuming universal recognition leads to alienating users who do not share your cultural frame',
        alternative:
          'Research recognition patterns for each target audience. Localize familiar elements rather than assuming one-size-fits-all.',
      },
    ],

    commonMistakes: [
      {
        title: 'Cargo-Cult Design Patterns',
        description:
          'Copying recognizable patterns from major products without understanding why they work',
        why: 'Recognition only helps if the pattern actually solves the same problem in your context',
        fix: 'Understand the reasoning behind recognized patterns before adopting them. Adapt to your specific use case.',
      },
      {
        title: 'Ignoring Novel Value',
        description:
          'Refusing to introduce better solutions because users are accustomed to worse familiar ones',
        why: 'The recognition heuristic creates inertia, but better designs can overcome it with proper onboarding',
        fix: 'Use progressive disclosure: anchor new features to recognized patterns, then gradually reveal improvements',
      },
      {
        title: 'Assuming Universal Recognition',
        description:
          'Treating brand names, icons, or patterns as universally known when they are culture- or demographic-specific',
        why: 'Recognition is built from individual exposure history, which varies widely',
        fix: 'Test with diverse user groups. Provide text labels alongside icons. Do not rely solely on logos for trust.',
      },
      {
        title: 'Overloading with Logos',
        description:
          'Displaying dozens of partner or client logos to the point where none are memorable',
        why: 'Too many recognition signals dilute each other; users can only process a few at a time',
        fix: 'Curate 3-5 of the most recognized and relevant logos. Rotate them contextually if needed.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout conventions are deeply recognized; deviating from expected layouts triggers distrust',
        examples: [
          'Logo in top-left corner is instantly recognized as the home link',
          'Search bar in the header area matches user expectations from Google, Amazon, etc.',
          'Card-based layouts feel familiar from Pinterest, Trello, and social media feeds',
          'Footer placement of legal links and contact info follows recognized web conventions',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Recognized font choices and text conventions signal professionalism and category',
        examples: [
          'System fonts (San Francisco, Segoe UI) feel native and trustworthy on their respective platforms',
          'Serif fonts in editorial contexts signal recognized journalism conventions',
          'Monospace fonts in developer tools match recognized coding environment patterns',
          'Consistent heading hierarchies match recognized document structure conventions',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Recognized color associations create instant category and trust signals',
        examples: [
          'Blue for trust and technology (recognized from Facebook, LinkedIn, IBM)',
          'Green for success, go, and financial growth (recognized from banking and trading apps)',
          'Red for errors, stops, and urgency (universally recognized signal)',
          'Brand colors trigger instant recognition (Stripe purple, Shopify green, Figma rainbow)',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Users expect interactions to match patterns from products they already know',
        examples: [
          'Swipe-to-delete on mobile recognized from iOS Mail and other native apps',
          'Drag-and-drop card interfaces recognized from Trello, Jira, and Notion',
          'Double-click-to-edit recognized from spreadsheets and file systems',
          'Pull-to-refresh recognized from social media feeds and email clients',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Recognized terminology, labels, and content structures build immediate comprehension',
        examples: [
          'Standard button labels ("Sign Up", "Log In", "Add to Cart") are recognized instantly',
          'Recognized industry terminology reduces cognitive load for domain users',
          'Familiar error message patterns ("Something went wrong. Try again.") set correct expectations',
          'Recognized content structures (FAQs, pricing tables, feature comparisons) enable quick scanning',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Recognized ARIA patterns and semantic structures improve assistive technology compatibility',
        examples: [
          'Standard landmark roles (nav, main, aside) are recognized by screen readers and users alike',
          'Recognized form patterns (label + input + error) work predictably with assistive technology',
          'Familiar keyboard shortcuts (Tab, Enter, Escape) match recognized desktop conventions',
          'Standard focus order (top-to-bottom, left-to-right) matches recognized reading patterns',
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
        title: 'Trusted Integration Logos',
        description:
          'SaaS product page displaying recognized integration partners to build credibility',
        code: `<section class="integrations">
  <h2>Integrates With Tools You Already Know</h2>
  <div class="logo-grid">
    <div class="integration">
      <img src="slack-logo.svg" alt="Slack">
      <span>Slack</span>
    </div>
    <div class="integration">
      <img src="github-logo.svg" alt="GitHub">
      <span>GitHub</span>
    </div>
    <div class="integration">
      <img src="google-workspace-logo.svg" alt="Google Workspace">
      <span>Google Workspace</span>
    </div>
    <div class="integration">
      <img src="jira-logo.svg" alt="Jira">
      <span>Jira</span>
    </div>
  </div>
  <p class="subtext">Plus 200+ more integrations</p>
</section>`,
        explanation:
          'Displaying logos of widely recognized tools triggers the recognition heuristic. Users infer that a product integrating with Slack, GitHub, and Google must be legitimate and high-quality. The recognized names transfer their credibility.',
        principle:
          'Recognized brand associations transfer trust and perceived quality to lesser-known products',
        metrics: {
          before: '18% conversion rate with generic "integrates with popular tools" text',
          after: '29% conversion rate with specific recognized logos displayed',
          improvement: '61% increase in sign-up conversion from logo recognition',
        },
      },
      {
        title: 'Familiar UI Patterns for Onboarding',
        description:
          'Project management app using recognized card-based layout from Trello/Kanban',
        code: `<div class="board" role="region" aria-label="Project Board">
  <div class="column" aria-label="To Do">
    <h3 class="column-header">To Do</h3>
    <div class="card" draggable="true" role="listitem">
      <h4>Design homepage</h4>
      <div class="card-meta">
        <span class="assignee">
          <img src="avatar.jpg" alt=""> Sarah
        </span>
        <span class="due-date">Mar 25</span>
      </div>
    </div>
  </div>
  <div class="column" aria-label="In Progress">
    <h3 class="column-header">In Progress</h3>
    <!-- cards -->
  </div>
  <div class="column" aria-label="Done">
    <h3 class="column-header">Done</h3>
    <!-- cards -->
  </div>
</div>`,
        explanation:
          'The Kanban board layout is instantly recognized by anyone who has used Trello, Jira, Notion, or Asana. Users need zero instruction — they already know how to drag cards between columns. Recognition eliminates the onboarding burden entirely.',
        principle:
          'Recognized interaction patterns eliminate learning curves and build immediate confidence',
      },
      {
        title: 'Recognized Payment Security Signals',
        description:
          'Checkout page displaying recognized payment and security badges',
        code: `<div class="checkout-trust">
  <div class="payment-methods">
    <img src="visa.svg" alt="Visa">
    <img src="mastercard.svg" alt="Mastercard">
    <img src="amex.svg" alt="American Express">
    <img src="paypal.svg" alt="PayPal">
    <img src="apple-pay.svg" alt="Apple Pay">
  </div>
  <div class="security-badges">
    <img src="ssl-badge.svg" alt="SSL Secured">
    <span>256-bit SSL encryption</span>
  </div>
  <p class="guarantee">
    <strong>30-day money-back guarantee</strong>
    — no questions asked
  </p>
</div>`,
        explanation:
          'Users recognize Visa, PayPal, and SSL badges instantly. This recognition signals safety without requiring any deliberation. The recognized logos do more for trust than paragraphs of security policy text could.',
        principle:
          'Recognized security symbols bypass analytical evaluation and trigger automatic trust',
        metrics: {
          before: '62% checkout completion with text-only security info',
          after: '78% checkout completion with recognized payment and security logos',
          improvement: '26% reduction in cart abandonment at checkout',
        },
      },
    ],

    bad: [
      {
        title: 'Unknown Badges Pretending to Be Recognized',
        description:
          'Self-created trust badges that mimic recognized authority but have no actual standing',
        code: `<!-- DON'T DO THIS -->
<div class="trust-badges">
  <img src="certified-safe-badge.png" alt="Certified Safe">
  <img src="top-rated-2024.png" alt="Top Rated 2024">
  <img src="best-value-award.png" alt="Best Value Award">
  <p>Winner of the 2024 Excellence in Quality Award*</p>
  <small>*Awarded by our internal quality team</small>
</div>`,
        explanation:
          'Fabricated badges exploit the recognition heuristic deceptively. Users initially assume these are recognized third-party certifications. When they discover the badges are self-awarded, trust is destroyed. Fake recognition is worse than no recognition.',
        principle:
          'Never manufacture false recognition signals — they backfire catastrophically when discovered',
      },
      {
        title: 'Completely Novel Interface with No Familiar Anchors',
        description:
          'Application using entirely custom interaction patterns with no recognizable conventions',
        code: `<!-- DON'T DO THIS -->
<div class="custom-nav">
  <!-- Triangle icon for menu instead of hamburger -->
  <button class="triangle-menu">▲</button>
  <!-- Circular scrolling instead of vertical scroll -->
  <div class="radial-content-wheel">
    <!-- Content arranged in a circle -->
  </div>
  <!-- Shake gesture to go back instead of back button -->
  <p class="hint">Shake your device to navigate back</p>
</div>`,
        explanation:
          'Replacing every recognized pattern with a novel one forces users to learn everything from scratch. The triangle menu, radial content, and shake navigation are unrecognized and therefore judged as inferior — even if they were somehow better. Users will leave before they learn.',
        principle:
          'Unrecognized interaction patterns are automatically judged as worse, regardless of actual quality',
      },
      {
        title: 'Burying Recognized Brands Below Unknown Ones',
        description:
          'E-commerce search results prioritizing unknown brands over recognized ones',
        code: `<!-- DON'T DO THIS -->
<div class="search-results">
  <div class="product promoted">
    <span class="badge">Sponsored</span>
    <h3>XyloTech Pro Wireless Earbuds</h3>
    <p>$29.99</p>
  </div>
  <div class="product promoted">
    <span class="badge">Sponsored</span>
    <h3>ZenAudio UltraMax Pods</h3>
    <p>$24.99</p>
  </div>
  <!-- Recognized brands buried below the fold -->
  <div class="product">
    <h3>Sony WF-1000XM5</h3>
    <p>$279.99</p>
  </div>
</div>`,
        explanation:
          'Promoting unrecognized brands above recognized ones (Sony) for ad revenue undermines user trust in search quality. Users searching for earbuds expect to see recognized brands first. Burying them feels manipulative and reduces confidence in the platform.',
        principle:
          'Prioritizing unrecognized options over recognized ones erodes platform credibility',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Search Results',
        description: 'Google search results from recognized domains (Wikipedia, major news sites, government sites) receive dramatically higher click-through rates than identical content from unrecognized sources. Users treat domain recognition as a proxy for credibility and accuracy.',
        effectiveness: 'very-effective',
        analysis: 'Google leverages recognition at two levels: their own brand recognition as a trusted search engine, and the display of recognized source domains in results. Users click recognized sources first, creating a feedback loop that further strengthens those sources\' recognition.',
      },
      {
        company: 'Amazon',
        product: 'Brand Filtering in E-commerce',
        description: 'Amazon prominently features brand filters in product categories, allowing users to narrow results to recognized brands. Products from recognized brands show higher conversion rates even at higher price points, demonstrating recognition-based quality inference.',
        effectiveness: 'very-effective',
        analysis: 'Amazon understands that brand recognition is a primary purchase driver. By making brand filtering prominent, they allow the recognition heuristic to efficiently guide purchasing decisions, reducing decision fatigue and increasing conversion.',
      },
      {
        company: 'Figma',
        product: 'Familiar Design Tool Patterns',
        description: 'Figma adopted recognized interface patterns from Adobe Photoshop and Sketch (layers panel, toolbar positioning, keyboard shortcuts) to reduce switching costs. Designers could use Figma productively on day one because the interface was immediately recognizable.',
        effectiveness: 'very-effective',
        analysis: 'Figma strategically combined recognized patterns from established tools with novel collaborative features. The familiar foundation made the new features feel like natural extensions rather than disorienting changes, dramatically accelerating adoption.',
      },
      {
        company: 'Stripe',
        product: 'Developer Documentation',
        description: 'Stripe\'s documentation uses recognized code patterns, standard HTTP method names, and familiar RESTful conventions. Developers recognize the patterns from other APIs they\'ve used, enabling rapid integration without extensive documentation reading.',
        effectiveness: 'very-effective',
        analysis: 'By following recognized API conventions (REST, standard HTTP verbs, JSON responses), Stripe makes their API feel familiar before developers write a single line of code. Recognition of the pattern structure substitutes for deep documentation study.',
      },
    ],

    abTests: [
      {
        title: 'Recognized vs Unknown Brand Logos on Landing Page',
        hypothesis:
          'Displaying recognized client logos will increase sign-up conversion more than displaying real but lesser-known client names',
        controlVersion: {
          description:
            'Landing page showing "Trusted by 500+ companies including TechStartup Alpha, DataCorp Beta, and CloudBase Gamma" (real but unrecognized clients)',
          metrics: {
            conversionRate: '3.8%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page showing "Trusted by" with logos of Shopify, Stripe, Notion, and Linear (recognized brands, also real clients)',
          metrics: {
            conversionRate: '7.2%',
            timeOnPage: '2:10',
            scrollDepth: '68%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Recognized brand logos nearly doubled conversion rates. Eye-tracking data showed users fixated on the logos for an average of 2.3 seconds, and post-survey responses indicated "if Shopify and Stripe use it, it must be good" reasoning — a textbook recognition heuristic inference.',
          learnings: [
            'Brand recognition transfers trust far more effectively than client count',
            'Users infer product quality from the quality of recognized clients',
            'Four recognized logos outperformed a list of fifty unrecognized names',
            'The effect was strongest for users in the same industry as the recognized brands',
          ],
        },
      },
      {
        title: 'Familiar vs Novel Navigation Pattern',
        hypothesis:
          'Users will complete tasks faster and rate the experience higher with a recognized sidebar navigation pattern vs a novel radial menu',
        controlVersion: {
          description:
            'Application using novel circular/radial navigation menu with animated transitions and gesture-based sub-menus',
          metrics: {
            taskCompletionRate: '64%',
            averageTaskTime: '4:32',
            satisfactionScore: '5.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Application using standard left sidebar navigation with collapsible sections, matching patterns from VS Code, Slack, and Notion',
          metrics: {
            taskCompletionRate: '91%',
            averageTaskTime: '1:48',
            satisfactionScore: '8.1/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The recognized sidebar pattern yielded 42% higher task completion, 60% faster task times, and 56% higher satisfaction. Users described the novel radial menu as "confusing" and "gimmicky" despite it objectively offering faster access to deep menu items. Recognition dominated usability.',
          learnings: [
            'Users strongly prefer recognized navigation patterns even when novel alternatives are objectively faster',
            'Satisfaction ratings correlate with recognition more than with measurable efficiency',
            'Novel patterns require extensive onboarding to overcome the recognition disadvantage',
            'Hybrid approach (recognized structure + subtle innovations) performs best long-term',
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
        name: 'Brand Logo Displays',
        description:
          'Client logos, partner badges, or integration icons displayed prominently',
        howToSpot:
          'Look for logo grids, "Trusted by" sections, or partner carousels on landing pages and checkout flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Familiar UI Conventions',
        description:
          'Standard patterns users recognize from major products (hamburger menus, card layouts, tab bars)',
        howToSpot:
          'Compare navigation, layout, and interaction patterns to established products like Google, Apple, or industry leaders',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Recognized Terminology',
        description:
          'Standard labels, button text, and content structures that users expect from category conventions',
        howToSpot:
          'Check if labels match industry standards ("Add to Cart", "Dashboard", "Settings") or use unfamiliar terminology',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Security and Trust Badges',
        description:
          'Payment provider logos, SSL certificates, and compliance badges in transaction contexts',
        howToSpot:
          'Look for Visa/Mastercard logos, SSL badges, SOC 2 badges, or other recognized certification marks near forms and checkout',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Platform-Native Patterns',
        description:
          'UI patterns that match the user\'s operating system or platform conventions',
        howToSpot:
          'Check if mobile apps follow iOS Human Interface Guidelines or Material Design conventions users recognize from native apps',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Brand Transfer Pattern',
        description: 'Using recognized brand logos or names to transfer credibility to a lesser-known product',
        indicators: ['Logo grids of recognized clients or partners', '"As seen in" or "Trusted by" sections', 'Integration pages featuring recognized tool logos', 'Testimonials from recognized companies'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Convention Adoption Pattern',
        description: 'Deliberately adopting recognized UI conventions from established products',
        indicators: ['Navigation matching Slack, VS Code, or other dominant products', 'Interaction patterns borrowed from market leaders', 'Keyboard shortcuts matching recognized standards', 'Layout structures following established conventions'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Familiarity Preference Pattern',
        description: 'Prioritizing recognized options over potentially better but unknown alternatives',
        indicators: ['Search results favoring recognized brands', 'Default selections set to recognized options', 'Recognized brands shown first in lists or grids', 'Filter options prioritizing well-known categories'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Recognition-Trust Bridge Pattern',
        description: 'Using recognized security signals to establish trust in sensitive contexts',
        indicators: ['Payment logos at checkout', 'SSL or security certification badges', 'Recognized compliance certifications (GDPR, SOC 2, HIPAA)', '"Powered by [recognized company]" labels'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are recognized brand logos, partners, or certifications displayed prominently?',
      'Do the UI patterns match conventions users recognize from established products?',
      'Are navigation and interaction patterns familiar from popular tools in this category?',
      'Do security and payment flows display recognized trust signals?',
      'Is standard terminology used for buttons, labels, and navigation items?',
      'Are recognized options prioritized over unknown alternatives in listings?',
      'Has the design been tested with users who have different recognition backgrounds?',
      'Are any fabricated or self-awarded "recognition" badges being used deceptively?',
      'Does the design balance recognized conventions with genuine innovation where it matters?',
      'Are there cultural or demographic groups that would not recognize the assumed-familiar elements?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the recognition heuristic.

Analyze the provided design for recognition heuristic patterns. Identify:

1. **Brand Recognition**: Use of recognized logos, names, partnerships, or certifications
2. **Pattern Familiarity**: Adoption of recognized UI conventions from established products
3. **Terminology Recognition**: Use of standard vs novel labels, terms, and categories
4. **Trust Signals**: Recognized security, payment, or quality indicators
5. **Convention Compliance**: Alignment with platform and category conventions

For each pattern found:
- Identify which recognition signals are present and what they trigger
- Assess whether the recognized elements are genuine or fabricated
- Determine if recognition is helping users make informed decisions or creating false confidence
- Evaluate cultural and demographic breadth of recognition assumptions
- Suggest improvements for ethical and effective use of recognition

Consider:
- Are recognized patterns being used to build genuine trust or to mask deficiencies?
- Is the design assuming universal recognition that may not exist across user demographics?
- Are there opportunities to leverage recognition that are currently missed?
- Is novel interaction justified where it deviates from recognized conventions?
- Do recognized elements accurately represent the product's quality and reliability?

Provide actionable recommendations for authentic, effective use of recognition.`,

    outputSchema: {
      type: 'object',
      properties: {
        recognitionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              recognizedElement: { type: 'string' },
              recognitionStrength: { type: 'string' },
              isGenuine: { type: 'boolean' },
              trustTransfer: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'recognizedElement',
              'recognitionStrength',
              'isGenuine',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            brandRecognitionScore: { type: 'number' },
            patternFamiliarityScore: { type: 'number' },
            authenticityScore: { type: 'number' },
            culturalBreadthScore: { type: 'number' },
          },
          required: [
            'brandRecognitionScore',
            'patternFamiliarityScore',
            'authenticityScore',
            'culturalBreadthScore',
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
        'recognitionPatterns',
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
        title: 'Audit Recognition Signals',
        description:
          'Inventory which recognized elements (brands, patterns, conventions) are present in your design and which are missing',
        example:
          'Map every logo, UI pattern, label, and interaction to its recognition source: "Sidebar nav = Slack/VS Code pattern", "Payment logos = Visa, PayPal"',
        tips: [
          'Test recognition assumptions with real users from your target demographics',
          'Do not assume your team\'s recognition matches your users\' recognition',
          'Document which elements carry the most recognition weight',
        ],
      },
      {
        step: 2,
        title: 'Leverage Genuine Brand Associations',
        description:
          'Display real partnerships, integrations, and client logos that transfer trust through recognition',
        example:
          'Add "Trusted by" section with 4-5 most recognized client logos, prioritized by target audience recognition',
        tips: [
          'Curate for recognition strength, not quantity',
          'Get explicit permission to use client logos',
          'Choose logos your target audience will specifically recognize',
        ],
      },
      {
        step: 3,
        title: 'Adopt Recognized Conventions',
        description:
          'Align core navigation, interaction, and content patterns with established conventions your users recognize',
        example:
          'Use standard sidebar navigation, standard form patterns, and conventional button placements matching category leaders',
        tips: [
          'Study the dominant products your users already use',
          'Match keyboard shortcuts to recognized standards',
          'Follow platform conventions (iOS, Android, web) for native-feeling experiences',
        ],
      },
      {
        step: 4,
        title: 'Introduce Innovation Carefully',
        description:
          'When you have a genuinely better solution, introduce it gradually by anchoring to recognized patterns',
        example:
          'New collaboration feature: start with a recognized comments panel, then progressively reveal real-time presence and inline editing',
        tips: [
          'Anchor novel features to recognized UI paradigms',
          'Use progressive disclosure to avoid overwhelming with unfamiliarity',
          'Provide fallback to recognized patterns during the learning period',
        ],
      },
      {
        step: 5,
        title: 'Measure Recognition Impact',
        description:
          'Track how recognition signals affect user trust, conversion, and engagement',
        example:
          'A/B test recognized vs unrecognized brand logos. Survey users on trust factors. Track first-session task completion.',
        tips: [
          'Measure recognition-driven metrics: time-to-first-action, trust survey scores, conversion rates',
          'Compare new user performance (recognition matters most) vs experienced user performance',
          'Monitor if recognition-based trust persists or erodes after sustained use',
        ],
      },
    ],

    dos: [
      'Display genuine partner and client logos to transfer brand recognition',
      'Follow established UI conventions your users recognize from dominant products',
      'Use recognized payment and security badges in transaction flows',
      'Match platform conventions (iOS, Android, web) for native-feeling experiences',
      'Test recognition assumptions across diverse user demographics',
      'Anchor novel features to recognized patterns for smoother adoption',
      'Use standard terminology and labels that users expect from your category',
      'Curate recognition signals for quality and relevance, not quantity',
    ],

    donts: [
      'Don\'t fabricate trust badges, certifications, or awards that are not genuine',
      'Don\'t assume recognition is universal across cultures, ages, and demographics',
      'Don\'t blindly copy patterns without understanding why they work in their original context',
      'Don\'t sacrifice genuine innovation just because a worse but familiar pattern exists',
      'Don\'t overload pages with dozens of logos that dilute recognition impact',
      'Don\'t use recognized brand names or logos without permission',
      'Don\'t ignore that recognition signals can mask quality issues',
      'Don\'t assume your users recognize the same tools and brands your team does',
    ],

    bestPractices: [
      {
        title: 'Curate Recognition for Your Audience',
        description:
          'Select recognition signals specifically matched to your target users\' exposure history',
        rationale:
          'A developer audience recognizes GitHub and VS Code; a marketing audience recognizes HubSpot and Mailchimp. Wrong signals waste the heuristic.',
        example:
          'For a dev tools product, show GitHub, GitLab, and AWS logos. For a marketing tool, show Salesforce, HubSpot, and Google Ads.',
      },
      {
        title: 'Balance Familiarity and Innovation',
        description:
          'Use recognized patterns as a foundation, then layer genuine improvements on top',
        rationale:
          'Pure convention compliance creates commodity products; pure novelty creates unusable ones. The sweet spot is recognized structure with meaningful innovation.',
        example:
          'Figma used recognized Adobe/Sketch patterns but added real-time collaboration as a novel layer on a familiar foundation.',
      },
      {
        title: 'Authenticate All Recognition Signals',
        description:
          'Ensure every recognition signal (logo, badge, certification) is genuine and current',
        rationale:
          'Fabricated recognition signals cause catastrophic trust failure when discovered — far worse than having no signals at all',
        example:
          'Verify all client logos are approved for use. Display only current certifications. Remove expired partnerships promptly.',
      },
      {
        title: 'Test Cross-Cultural Recognition',
        description:
          'Validate that recognition signals work across your actual user demographics',
        rationale:
          'Recognition is built from exposure, which varies dramatically by geography, age, profession, and culture',
        example:
          'Test with users in different regions. Line, WeChat, and Kakao are recognized in Asia but not in the US; the reverse is true for Slack.',
      },
      {
        title: 'Progressive Familiarity for Novel Features',
        description:
          'Introduce unfamiliar features gradually, anchored to recognized elements',
        rationale:
          'The recognition heuristic means unfamiliar = lower quality in users\' minds. Gradual introduction lets users build recognition over time.',
        example:
          'Introduce a new AI assistant as a chat panel (recognized) before evolving it into a proactive agent (novel).',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure recognized visual signals have semantic equivalents',
        implementation:
          'Brand logos must have descriptive alt text. Trust badges need accessible labels. Recognized visual patterns should use semantic HTML so assistive technology users also benefit from structural familiarity.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on recognized brand colors for meaning',
        implementation:
          'Combine recognized color coding (green = success, red = error) with text labels and icons so the recognition signal works for all users, including those with color vision deficiency.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Recognized keyboard patterns must be maintained',
        implementation:
          'Support recognized keyboard shortcuts (Tab for navigation, Enter for activation, Escape for dismiss). Deviating from recognized keyboard patterns creates barriers for keyboard and screen reader users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Use recognized ARIA roles and patterns',
        implementation:
          'Apply standard ARIA roles, states, and properties that assistive technology recognizes. Custom widgets must implement recognized WAI-ARIA patterns so screen readers can present them familiarly.',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated Recognition Signals',
        severity: 'critical',
        explanation:
          'Creating fake trust badges, awards, or certifications that mimic recognized authorities',
        mitigation:
          'Only display genuine, verifiable certifications and partnerships. Self-awarded badges must be clearly labeled as internal distinctions, not third-party recognitions.',
      },
      {
        concern: 'Unauthorized Brand Association',
        severity: 'high',
        explanation:
          'Displaying client or partner logos without permission, or implying a partnership that does not exist',
        mitigation:
          'Obtain written permission for all logo usage. Accurately represent the nature of each relationship (client vs partner vs integration).',
      },
      {
        concern: 'Recognition-Based Monopoly Reinforcement',
        severity: 'high',
        explanation:
          'Systematically favoring recognized (large) brands over new entrants, creating an unfair marketplace',
        mitigation:
          'Provide mechanisms for lesser-known options to build recognition (reviews, trials, featured placements). Balance recognition signals with quality signals.',
      },
      {
        concern: 'Cultural Recognition Bias',
        severity: 'medium',
        explanation:
          'Designing exclusively for one cultural context\'s recognition patterns, excluding users from other backgrounds',
        mitigation:
          'Research recognition across all target demographics. Localize recognition signals. Provide universal indicators alongside culturally-specific ones.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Recognition-based judgments and decisions: A theory of the recognition heuristic',
        author: 'Goldstein, D. G., & Gigerenzer, G.',
        year: 2002,
        doi: '10.1037/0033-295X.109.1.75',
        description:
          'The foundational paper defining the recognition heuristic, demonstrating the less-is-more effect and ecological rationality of recognition-based judgment',
        type: 'foundational',
      },
      {
        title: 'Models of ecological rationality: The recognition heuristic',
        author: 'Goldstein, D. G., & Gigerenzer, G.',
        year: 2002,
        doi: '10.1037/0033-295X.109.1.75',
        description:
          'Extended analysis of when and why recognition is a valid cue for inference, and the environmental structures that support it',
        type: 'foundational',
      },
      {
        title: 'The recognition heuristic: A decade of research',
        author: 'Pachur, T., Todd, P. M., Gigerenzer, G., Schooler, L. J., & Goldstein, D. G.',
        year: 2011,
        description:
          'Comprehensive review of ten years of research on the recognition heuristic, covering extensions, boundary conditions, and applications',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Simple Heuristics That Make Us Smart',
        author: 'Gigerenzer, G., Todd, P. M., & the ABC Research Group',
        year: 1999,
        isbn: '9780195143812',
        description:
          'Comprehensive exploration of fast and frugal heuristics including the recognition heuristic, arguing that simple decision rules often outperform complex analysis',
        type: 'foundational',
      },
      {
        title: 'Gut Feelings: The Intelligence of the Unconscious',
        author: 'Gigerenzer, Gerd',
        year: 2007,
        isbn: '9780670038633',
        description:
          'Accessible overview of how heuristics like recognition guide everyday decisions, with real-world examples of their effectiveness',
        type: 'practical',
      },
      {
        title: 'Rationality for Mortals: How People Cope with Uncertainty',
        author: 'Gigerenzer, Gerd',
        year: 2008,
        isbn: '9780195329490',
        description:
          'Explores ecological rationality and how recognition-based strategies perform in real-world environments under uncertainty',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'The Role of Familiarity in User Interface Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/familiarity-vs-discovery/',
        description:
          'Practical guide to balancing familiar patterns with novel design in user interfaces',
        type: 'practical',
      },
      {
        title: 'Jakob\'s Law of Internet User Experience',
        author: 'Nielsen, Jakob',
        url: 'https://www.nngroup.com/articles/end-of-web-design/',
        description:
          'Users spend most of their time on other sites, so they prefer your site to work the same way — a direct application of the recognition heuristic',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Gerd Gigerenzer: Smart Heuristics',
        author: 'Gigerenzer, Gerd',
        url: 'https://www.youtube.com/watch?v=dDYFl_WEYJM',
        description:
          'Lecture by the co-discoverer of the recognition heuristic on fast and frugal decision-making',
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
      'mere-exposure-effect', // Repeated exposure builds recognition
      'social-proof', // Social validation reinforces recognition-based trust
      'status-quo-bias', // Preference for the known and familiar
      'familiarity-bias', // Direct overlap with preference for the familiar
    ],

    conflicts: [
      'novelty-bias', // Preference for new can override recognition
      'curiosity-effect', // Desire to explore unknown options
    ],

    confusedWith: [
      'availability-heuristic', // Availability is about recall ease; recognition is binary (known vs unknown)
      'mere-exposure-effect', // Exposure builds liking; recognition builds judgment of superiority
      'familiarity-bias', // Broader concept; recognition heuristic is the specific mechanism
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'brand-recognition-effect',
        'pattern-familiarity',
      ],
    },
  },
};
