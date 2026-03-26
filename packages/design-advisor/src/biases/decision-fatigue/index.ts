/**
 * DECISION FATIGUE
 *
 * Decision quality deteriorates after many decisions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const decisionFatigue: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'decision-fatigue',
    name: 'Decision Fatigue',
    aliases: ['Ego Depletion', 'Choice Fatigue', 'Decision Depletion'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
      BiasCategory.EMOTIONAL,
    ],
    tags: [
      'decision-making',
      'cognitive-load',
      'willpower',
      'defaults',
      'simplification',
      'forms',
      'checkout',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Decision quality deteriorates after many decisions',

    detailed: `Decision fatigue is the deteriorating quality of decisions made by an individual after a long session of decision-making. As the number of decisions a person must make increases, their ability to make thoughtful, well-reasoned choices progressively declines. The brain treats decision-making as a finite resource that depletes with use, much like a muscle that tires with exertion.

When users are fatigued from too many decisions, they resort to one of two coping strategies: they either make impulsive, poorly considered choices, or they avoid making any decision at all (decision avoidance). Both outcomes are harmful in product and UX contexts—impulsive choices lead to regret and returns, while avoidance leads to abandoned carts, incomplete onboarding, and drop-offs.

Designers who understand decision fatigue can dramatically improve user outcomes by reducing the number of decisions required, providing smart defaults, simplifying multi-step flows, and breaking complex processes into manageable sessions. The goal is to preserve the user's cognitive resources for the decisions that truly matter.`,

    psychologyBasis: {
      discoveredBy: 'Roy F. Baumeister',
      year: 1998,
      theory: 'Ego Depletion Theory',
      mechanism: `The brain's capacity for making decisions draws from a limited pool of cognitive resources (sometimes called "willpower" or "executive function"). This pool depletes with each decision made:

1. **Resource Depletion**: Each decision—no matter how trivial—consumes mental energy from the same finite pool used for self-control and complex reasoning
2. **Quality Degradation**: As resources deplete, the brain shifts from careful deliberation (System 2) to quick heuristics and impulse (System 1)
3. **Decision Avoidance**: When severely depleted, the brain defaults to the path of least resistance—choosing the default, deferring the decision, or abandoning the task entirely
4. **Cumulative Effect**: Fatigue accumulates across all decision types; choosing what to eat for lunch depletes resources for a work decision later
5. **Recovery Requirement**: Cognitive resources replenish with rest, glucose intake, and reduced cognitive load—but recovery takes time

The mechanism is physiological as well as psychological—brain glucose levels correlate with decision quality, as demonstrated in the famous study of Israeli judges granting parole.`,
    },

    realWorldExample: `In a landmark 2011 study by Danziger, Levav, and Avnaim-Pesso, researchers analyzed 1,112 parole decisions made by Israeli judges over a 10-month period. Judges granted parole approximately 65% of the time at the start of each session, but approval rates dropped to nearly 0% just before a break. After a food break, approval rates jumped back to 65%. The judges were making the "safe" default decision (deny parole) as their cognitive resources depleted—regardless of the merits of each case. Steve Jobs famously wore the same black turtleneck and jeans every day to eliminate one daily decision and preserve mental energy for Apple's product decisions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Decision fatigue profoundly affects how users navigate forms, complete purchases, configure settings, and move through multi-step flows. Every required choice—from selecting a shipping method to choosing a font size—depletes the user's cognitive resources. Designers can counteract this by:

- Reducing the total number of decisions required to complete a task
- Providing smart defaults that work for the majority of users
- Breaking long processes into smaller, session-aware chunks
- Automating decisions that users don't care about (auto-fill, recommendations)
- Placing the most important decisions early in the flow when cognitive resources are highest
- Offering "recommended" options that eliminate the need to compare`,

    whenToUse: [
      {
        title: 'Checkout Flows',
        scenario:
          'When users must complete a multi-step purchase process',
        example:
          'Implement one-click purchasing with saved payment and shipping defaults, reducing a 7-step checkout to a single confirmation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Form Design',
        scenario: 'When collecting information through long forms with many fields',
        example:
          'Use progressive disclosure to show only essential fields first, with optional fields hidden behind "Show more options"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Configuration and Settings',
        scenario: 'When users must configure a product, tool, or account',
        example:
          'Provide a "Recommended settings" one-click option alongside manual configuration, so most users skip the decision entirely',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Product Selection',
        scenario: 'When users must choose from many similar options',
        example:
          'Surface a "Recommended for you" option prominently, with "See all options" as a secondary path for power users',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Sequences',
        scenario: 'When new users must set up their account and preferences',
        example:
          'Let users skip optional preferences during onboarding with sensible defaults, offering customization later when they are invested',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Multi-Session Workflows',
        scenario: 'When tasks are too complex to complete in one sitting',
        example:
          'Auto-save progress and allow users to resume later with a clear "Continue where you left off" prompt',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'High-Stakes Irreversible Decisions',
        reason:
          'Over-simplifying critical decisions can lead to costly errors',
        consequence:
          'Users might accept defaults without understanding implications, leading to regret or financial loss',
        alternative:
          'For irreversible decisions (deleting data, legal agreements), require explicit confirmation even if it adds friction',
      },
      {
        title: 'Expert or Power User Workflows',
        reason:
          'Hiding options behind defaults can frustrate users who need fine-grained control',
        consequence:
          'Power users feel the interface is dumbed down and may switch to a competitor with more control',
        alternative:
          'Offer both a simplified "quick path" with defaults and an "advanced" mode with full control',
      },
      {
        title: 'Regulatory or Compliance Contexts',
        reason:
          'Auto-selecting defaults for legal, medical, or financial choices may violate regulations',
        consequence:
          'Legal liability if users claim they didn\'t actively consent to pre-selected options',
        alternative:
          'Present required decisions clearly without pre-selection, but minimize non-required decisions around them',
      },
      {
        title: 'Personalization-Critical Flows',
        reason:
          'Some products require user input to deliver value (e.g., dietary preferences, accessibility needs)',
        consequence:
          'Generic defaults may deliver a poor experience if the product relies on personalization',
        alternative:
          'Ask only the minimum questions needed for personalization, and learn the rest over time through behavior',
      },
    ],

    commonMistakes: [
      {
        title: 'Requiring Decisions That Don\'t Matter',
        description:
          'Forcing users to choose options that have minimal impact on their experience',
        why: 'Every unnecessary decision depletes cognitive resources that could be spent on decisions that actually matter',
        fix: 'Audit every required field and choice: if a sensible default exists, use it and make the choice optional',
      },
      {
        title: 'Front-Loading All Decisions',
        description:
          'Asking users to make all choices upfront before they can use the product',
        why: 'Users hit decision fatigue before they\'ve experienced any value, leading to high abandonment',
        fix: 'Spread decisions across the user journey—ask for preferences just-in-time when they become relevant',
      },
      {
        title: 'No Defaults on Complex Forms',
        description:
          'Presenting blank forms with no pre-selected values or suggestions',
        why: 'Blank fields require maximum cognitive effort; users must generate answers from scratch',
        fix: 'Pre-fill with intelligent defaults based on user data, common choices, or location; always offer a "recommended" path',
      },
      {
        title: 'Overwhelming Configuration Pages',
        description:
          'Showing every possible setting on a single page without hierarchy or grouping',
        why: 'The sheer volume of options triggers decision avoidance—users either skip everything or leave entirely',
        fix: 'Group settings into categories, show only the most common settings by default, and hide advanced options behind progressive disclosure',
      },
      {
        title: 'Not Saving Partial Progress',
        description:
          'Requiring users to complete long forms in a single session without auto-save',
        why: 'If users take a break to recover from fatigue, losing progress punishes them and discourages return',
        fix: 'Auto-save at every step, provide clear progress indicators, and allow resumption from any device',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines how many decisions are visible at once, directly affecting cognitive load',
        examples: [
          'Single-column forms reduce perceived decision density compared to multi-column layouts',
          'Progressive disclosure hides optional decisions, reducing visible choices',
          'Step-by-step wizards break decisions into digestible groups',
          'Card-based layouts with "Recommended" badges reduce comparison effort',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy helps users identify which decisions are important and which can be skipped',
        examples: [
          'Clear labels distinguish required from optional fields',
          'Helper text below form fields reduces decision uncertainty',
          'Bold section headers help users scan and skip irrelevant decision groups',
          'Smaller text for advanced options signals they are non-essential',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding helps users prioritize decisions and identify recommended paths',
        examples: [
          'Highlighted "Recommended" options in accent color reduce comparison effort',
          'Gray or muted styling for optional fields signals they can be skipped',
          'Progress bar colors indicate completion state and remaining decisions',
          'Green checkmarks on completed sections give a sense of momentum',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how many decisions users must actively make versus how many are automated',
        examples: [
          'Auto-fill from saved data eliminates repetitive decisions',
          'Smart defaults pre-select the most common choice',
          'One-click actions (buy, subscribe, accept) reduce multi-step decision chains',
          'Auto-save preserves progress so users can resume after cognitive recovery',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content clarity and conciseness directly affect the cognitive cost of each decision',
        examples: [
          'Clear, jargon-free option labels reduce the effort needed to understand each choice',
          'Comparison tables with feature highlights reduce evaluation effort',
          '"Most popular" and "Recommended for you" labels shortcut the evaluation process',
          'Concise descriptions prevent information overload at decision points',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Users with cognitive disabilities are disproportionately affected by decision fatigue',
        examples: [
          'Clear form structure with fieldsets and legends helps screen reader users track progress',
          'Keyboard shortcuts for common actions reduce physical and cognitive effort',
          'ARIA progress indicators help assistive technology users understand remaining decisions',
          'Simple language and clear labels benefit users with cognitive impairments',
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
        title: 'One-Click Purchase',
        description:
          'Amazon-style one-click buying that eliminates all checkout decisions',
        code: `<div class="product-page">
  <h2>Wireless Noise-Cancelling Headphones</h2>
  <div class="price">$249.99</div>

  <div class="purchase-options">
    <button class="one-click-buy primary">
      Buy Now with 1-Click
    </button>
    <p class="delivery-info">
      Delivers to your default address by Friday.
      Charged to Visa ending 4242.
    </p>
    <button class="secondary">Add to Cart</button>
  </div>
</div>`,
        explanation:
          'By using saved payment, shipping, and preference data, the entire checkout flow is compressed into a single decision: "Do I want this?" All other decisions (payment method, shipping address, shipping speed) are handled by smart defaults.',
        principle:
          'Reduce multi-decision flows to a single confirmation when possible',
        metrics: {
          before: '23% cart completion rate with 5-step checkout',
          after: '74% purchase rate with one-click buy',
          improvement: '222% increase in conversion by eliminating decision points',
        },
      },
      {
        title: 'Progressive Form with Smart Defaults',
        description:
          'Multi-step form that shows only essential fields and pre-fills intelligently',
        code: `<form class="progressive-form">
  <div class="step active" data-step="1">
    <h3>Step 1 of 3: Basic Info</h3>
    <div class="progress-bar" style="width: 33%"></div>

    <label>Full Name <span class="required">*</span></label>
    <input type="text" value="Jessica Chen" readonly>
    <span class="auto-filled">Auto-filled from your account</span>

    <label>Email <span class="required">*</span></label>
    <input type="email" value="jessica@company.com" readonly>
    <span class="auto-filled">Auto-filled from your account</span>

    <label>Company Size</label>
    <select>
      <option selected>51-200 employees (recommended)</option>
      <option>1-10 employees</option>
      <option>11-50 employees</option>
      <option>201-1000 employees</option>
      <option>1000+ employees</option>
    </select>
    <span class="default-note">Based on your LinkedIn profile</span>

    <button class="primary">Continue</button>
    <p class="save-note">Progress auto-saved. Resume anytime.</p>
  </div>
</form>`,
        explanation:
          'Auto-filling known fields and pre-selecting likely options reduces the number of active decisions from 6+ to just 1 (company size). Progress auto-save means users can return if fatigued.',
        principle:
          'Pre-fill everything you already know; ask only what you must',
        metrics: {
          before: '34% form completion with 12 blank required fields',
          after: '78% form completion with auto-fill and progressive steps',
          improvement: '129% increase in completion by reducing active decisions',
        },
      },
      {
        title: 'Recommended Configuration Path',
        description:
          'Settings page with a one-click recommended setup alongside manual options',
        code: `<div class="settings-page">
  <h2>Configure Your Workspace</h2>

  <div class="recommended-path">
    <div class="recommended-badge">Recommended</div>
    <h3>Quick Setup</h3>
    <p>Optimized settings based on your team size and industry.
       Used by 89% of similar teams.</p>
    <ul class="preview">
      <li>Notifications: Email digest (daily)</li>
      <li>Privacy: Team-visible</li>
      <li>Theme: System default</li>
      <li>Language: English (US)</li>
    </ul>
    <button class="primary">Apply Recommended Settings</button>
  </div>

  <details class="manual-config">
    <summary>Customize manually (23 options)</summary>
    <!-- Full settings form here -->
  </details>
</div>`,
        explanation:
          'The recommended path compresses 23 individual decisions into a single click. Users who want control can expand manual configuration, but the default path eliminates decision fatigue entirely.',
        principle:
          'Offer a curated default path and make customization optional, not required',
      },
      {
        title: 'Session-Aware Resume',
        description:
          'Application that detects returning users and offers to resume where they left off',
        code: `<div class="resume-prompt">
  <div class="progress-snapshot">
    <h3>Welcome back, Jessica</h3>
    <p>You were setting up your project last Tuesday.</p>
    <div class="progress-bar">
      <div class="filled" style="width: 60%"></div>
      <span>3 of 5 steps complete</span>
    </div>
    <p class="next-step">Next: Choose your integrations</p>
  </div>

  <div class="actions">
    <button class="primary">Continue Where You Left Off</button>
    <button class="secondary">Start Over</button>
  </div>
</div>`,
        explanation:
          'By saving state and offering a clear resume point, the design respects that users may have left due to decision fatigue. The progress indicator shows momentum, making continuation feel easier than starting over.',
        principle:
          'Preserve progress across sessions so fatigue-driven exits are not punished',
      },
    ],

    bad: [
      {
        title: 'Overwhelming Registration Form',
        description:
          'Sign-up form requiring dozens of decisions before the user can access the product',
        code: `<!-- DON'T DO THIS -->
<form class="registration-form">
  <h2>Create Your Account</h2>
  <p>Please fill in all required fields to get started.</p>

  <input type="text" placeholder="First Name *">
  <input type="text" placeholder="Last Name *">
  <input type="email" placeholder="Email *">
  <input type="password" placeholder="Password *">
  <input type="password" placeholder="Confirm Password *">
  <input type="text" placeholder="Company Name *">
  <input type="text" placeholder="Job Title *">
  <input type="tel" placeholder="Phone Number *">
  <input type="text" placeholder="Address Line 1 *">
  <input type="text" placeholder="Address Line 2">
  <input type="text" placeholder="City *">
  <select><option>Select State *</option></select>
  <input type="text" placeholder="ZIP Code *">
  <select><option>Select Country *</option></select>
  <select><option>Company Size *</option></select>
  <select><option>Industry *</option></select>
  <select><option>How did you hear about us? *</option></select>

  <div class="checkboxes">
    <label><input type="checkbox"> Subscribe to newsletter</label>
    <label><input type="checkbox"> Receive product updates</label>
    <label><input type="checkbox"> Share data with partners</label>
    <label><input type="checkbox"> Accept terms of service *</label>
  </div>

  <button>Create Account</button>
</form>`,
        explanation:
          'This form requires 20+ decisions before the user has experienced any product value. Most fields are unnecessary for initial access. Users face a wall of blank inputs with no defaults, no auto-fill, and no progressive disclosure. Abandonment will be extremely high.',
        principle:
          'Never front-load all decisions before delivering any value',
      },
      {
        title: 'No Defaults on Configuration Page',
        description:
          'Settings page with every option blank, requiring manual selection for each',
        code: `<!-- DON'T DO THIS -->
<div class="settings-page">
  <h2>Configure Your Account</h2>
  <p>You must configure all settings before proceeding.</p>

  <label>Notification Frequency</label>
  <select><option value="">-- Select --</option></select>

  <label>Email Format</label>
  <select><option value="">-- Select --</option></select>

  <label>Time Zone</label>
  <select><option value="">-- Select --</option></select>

  <label>Date Format</label>
  <select><option value="">-- Select --</option></select>

  <label>Language</label>
  <select><option value="">-- Select --</option></select>

  <label>Currency</label>
  <select><option value="">-- Select --</option></select>

  <label>Privacy Level</label>
  <select><option value="">-- Select --</option></select>

  <label>Theme</label>
  <select><option value="">-- Select --</option></select>

  <button disabled>Save (all fields required)</button>
</div>`,
        explanation:
          'Eight dropdown menus with no defaults means eight conscious decisions about settings most users don\'t care about. The "all fields required" constraint with a disabled button maximizes frustration. Time zone, language, and currency can all be auto-detected.',
        principle:
          'Blank forms with no defaults force maximum cognitive effort for minimum user benefit',
      },
      {
        title: 'Decision-Heavy Checkout Without Simplification',
        description:
          'Multi-page checkout asking users to decide on every detail',
        code: `<!-- DON'T DO THIS -->
<div class="checkout-flow">
  <h2>Step 4 of 7: Shipping Options</h2>

  <label>Shipping Speed</label>
  <select><option>-- Choose shipping --</option></select>

  <label>Package Insurance</label>
  <div class="radio-group">
    <label><input type="radio" name="ins"> No insurance</label>
    <label><input type="radio" name="ins"> Basic ($2.99)</label>
    <label><input type="radio" name="ins"> Premium ($7.99)</label>
  </div>

  <label>Gift Wrapping</label>
  <div class="radio-group">
    <label><input type="radio" name="gift"> None</label>
    <label><input type="radio" name="gift"> Standard ($3.99)</label>
    <label><input type="radio" name="gift"> Premium ($8.99)</label>
  </div>

  <label>Delivery Instructions</label>
  <textarea placeholder="Enter delivery instructions"></textarea>

  <label>Carbon Offset</label>
  <div class="radio-group">
    <label><input type="radio" name="carbon"> No offset</label>
    <label><input type="radio" name="carbon"> Offset ($1.50)</label>
  </div>

  <p>Step 5: Payment | Step 6: Review | Step 7: Confirm</p>
</div>`,
        explanation:
          'By step 4 of a 7-step checkout, the user has already made dozens of decisions. Asking about insurance, gift wrapping, carbon offsets, and delivery instructions without defaults maximizes fatigue. Most users just want their item delivered.',
        principle:
          'Every additional decision in a checkout flow increases abandonment probability',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: '1-Click Ordering',
        url: 'https://www.amazon.com',
        description:
          'Amazon\'s patented 1-Click ordering eliminates the entire checkout flow by using stored payment, shipping, and preference data. A single button press completes the purchase, reducing a multi-decision process to a single confirmation.',
        effectiveness: 'very-effective',
        analysis:
          'Amazon reports that 1-Click ordering significantly increases impulse purchases and overall conversion rates. By eliminating decision points (payment selection, address entry, shipping choice), users bypass the fatigue that causes cart abandonment. The patent on this feature (now expired) was considered one of the most valuable in e-commerce history.',
      },
      {
        company: 'Apple',
        product: 'Product Line Simplification',
        url: 'https://www.apple.com',
        description:
          'Apple deliberately limits product choices compared to competitors. Instead of 50 laptop configurations, Apple offers 3-4 clear models. Each product page presents a "Compare" view with a recommended model highlighted.',
        effectiveness: 'very-effective',
        analysis:
          'Apple\'s limited product line is a direct application of decision fatigue research. When Steve Jobs returned to Apple in 1997, he cut the product line from 350 products to 10. Fewer choices mean faster, more confident purchasing decisions. Apple\'s customer satisfaction scores reflect that users feel good about their choices rather than experiencing buyer\'s remorse.',
      },
      {
        company: 'Netflix',
        product: 'Auto-Play and Recommendations',
        url: 'https://www.netflix.com',
        description:
          'Netflix auto-plays the next episode, removing the decision of "should I keep watching?" It also surfaces a single "Top Pick for You" rather than requiring users to browse the entire catalog.',
        effectiveness: 'very-effective',
        analysis:
          'Auto-play converts the active decision "What should I watch next?" into a passive acceptance of the default. Netflix reports that personalized recommendations drive over 80% of content watched, meaning most viewing requires zero active browsing decisions. The "Continue Watching" row further eliminates decision-making by surfacing in-progress content.',
      },
      {
        company: 'Stripe',
        product: 'Checkout',
        url: 'https://stripe.com/checkout',
        description:
          'Stripe Checkout pre-fills customer information from browser auto-fill and saved payment methods, reducing a 15+ field checkout form to as few as 2 taps on mobile (email + confirm). Link remembers returning customers entirely.',
        effectiveness: 'very-effective',
        analysis:
          'Stripe\'s design philosophy explicitly targets decision fatigue. By remembering customer data across merchants (via Link), they eliminate repetitive decisions across the entire web. Merchants using Stripe Checkout report 10-15% higher conversion rates versus custom checkout forms.',
      },
    ],

    abTests: [
      {
        title: 'Checkout Steps: 5-Step vs 1-Page Simplified',
        hypothesis:
          'Reducing checkout decisions will increase completion rate',
        controlVersion: {
          description:
            '5-step checkout: Shipping info, Billing info, Shipping method, Payment method, Review & confirm. All fields blank, no defaults.',
          metrics: {
            conversionRate: '28%',
            timeOnPage: '6:42',
            bounceRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Single-page checkout with auto-filled address, pre-selected standard shipping, saved payment method, and inline review. Only 3 decisions required: confirm address, confirm payment, place order.',
          metrics: {
            conversionRate: '51%',
            timeOnPage: '1:58',
            bounceRate: '18%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Reducing active decisions from 15+ to 3 nearly doubled checkout completion. Time on page dropped by 70%, indicating users weren\'t spending more time deliberating—they were simply encountering fewer friction points. Bounce rate dropped by 60%.',
          learnings: [
            'Each eliminated decision point increased conversion by approximately 3-5%',
            'Auto-fill and smart defaults had the largest individual impact',
            'Users who completed the simplified checkout reported higher satisfaction',
            'Return rates did not increase, suggesting simplified decisions were not impulsive',
          ],
        },
      },
      {
        title: 'Configuration: All Settings vs Recommended Defaults',
        hypothesis:
          'Offering a "recommended" default path will increase setup completion',
        controlVersion: {
          description:
            'All 18 configuration options displayed on a single page, all blank, all required before activation',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '8:30',
            bounceRate: '35%',
          },
        },
        treatmentVersion: {
          description:
            '"Apply Recommended Settings" button at top (pre-configures 15 of 18 options), with only 3 truly personal choices required. Manual override available via expandable section.',
          metrics: {
            conversionRate: '82%',
            timeOnPage: '2:15',
            bounceRate: '8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The recommended path doubled setup completion. 73% of users chose the recommended settings without modification. Of the 27% who customized, most only changed 2-3 settings. Users spent 73% less time on configuration.',
          learnings: [
            'Most users are happy to accept defaults if they are sensible and transparent',
            'Offering a "recommended" label provides social proof that reduces decision anxiety',
            'Power users appreciated having manual override available but not required',
            'Setup completion was the strongest predictor of long-term retention',
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
        name: 'Long Form Fields',
        description:
          'Forms with many visible input fields, dropdowns, and radio groups requiring individual decisions',
        howToSpot:
          'Count the number of required inputs on a single screen. More than 5-7 visible required fields signals potential decision fatigue',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'No Default Selections',
        description:
          'Dropdowns, radio buttons, and toggles with no pre-selected values, requiring active choice for each',
        howToSpot:
          'Look for blank dropdowns ("-- Select --"), unselected radio groups, and empty toggle states',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Multi-Step Indicators',
        description:
          'Progress bars or step indicators showing many steps remaining in a flow',
        howToSpot:
          'Check step indicators: flows with 5+ steps or progress bars showing less than 50% complete late in the flow',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Dense Configuration Pages',
        description:
          'Settings or configuration pages showing all options at once without grouping or hierarchy',
        howToSpot:
          'Look for pages with 10+ settings visible simultaneously with no collapsible sections or "recommended" paths',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Auto-Fill Indicators',
        description:
          'Forms that don\'t auto-fill known information, requiring manual re-entry of previously provided data',
        howToSpot:
          'Check if returning users must re-enter information the system already knows (name, email, address, payment)',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Decision Density Pattern',
        description: 'High number of required decisions per screen or per step in a flow',
        indicators: [
          'More than 7 required form fields on a single screen',
          'Multiple required dropdown selections with no defaults',
          'Radio button groups without pre-selection',
          'Mandatory configuration before first use',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Defaults Pattern',
        description: 'Absence of smart defaults, pre-selections, or recommended options',
        indicators: [
          'All dropdowns show "-- Select --" as initial state',
          'No "Recommended" or "Most Popular" labels on options',
          'Blank forms without auto-fill from known user data',
          'No pre-selected shipping, payment, or preference options',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Long Flow Pattern',
        description: 'Multi-step processes that require sustained decision-making without breaks',
        indicators: [
          'Checkout or signup flows with 5+ steps',
          'No progress saving or resume capability',
          'Required completion in a single session',
          'No option to skip non-essential steps',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Choice Overload Pattern',
        description: 'Presenting too many options without curation, filtering, or recommendations',
        indicators: [
          'Product grids with 50+ items and no "Top picks" section',
          'Plan comparison with 5+ tiers',
          'Settings pages with 20+ uncategorized options',
          'Navigation with 10+ top-level categories',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many decisions must the user make to complete this flow?',
      'Which decisions could be eliminated with smart defaults?',
      'Are there pre-selected or recommended options for each choice?',
      'Can the user complete this task in a single session without fatigue?',
      'Is progress saved if the user leaves and returns?',
      'How many form fields are visible at once? Could progressive disclosure reduce this?',
      'Are required fields clearly distinguished from optional ones?',
      'Is known user data auto-filled to eliminate redundant decisions?',
      'Are the most important decisions placed early in the flow?',
      'Is there a "quick path" or "recommended setup" option?',
      'Could any of these decisions be deferred to a later, less critical moment?',
      'How does the decision count compare to competitors\' flows?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in decision fatigue and ego depletion.

Analyze the provided design for decision fatigue patterns. Identify:

1. **Decision Count**: Total number of decisions required to complete the flow
2. **Default Coverage**: How many decisions have smart defaults or pre-selections
3. **Progressive Disclosure**: Whether decisions are revealed gradually or all at once
4. **Auto-Fill Usage**: Whether known data is pre-populated to reduce manual entry
5. **Flow Length**: Number of steps and estimated time to complete
6. **Recovery Points**: Whether progress is saved for session resumption

For each issue found:
- Count the specific decisions required
- Assess whether each decision is truly necessary
- Identify which decisions could be eliminated or defaulted
- Evaluate whether the flow respects cognitive resource limits
- Suggest specific simplification strategies

Consider:
- Are users making more decisions than necessary?
- Could smart defaults eliminate low-value decisions?
- Is the flow structured to place important decisions early?
- Can users save progress and resume later?
- Are there "recommended" paths for users who don't want to decide?
- How does this flow affect users with cognitive disabilities?

Provide actionable recommendations for reducing decision fatigue.`,

    outputSchema: {
      type: 'object',
      properties: {
        decisionAudit: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              decision: { type: 'string' },
              location: { type: 'string' },
              required: { type: 'boolean' },
              hasDefault: { type: 'boolean' },
              couldBeEliminated: { type: 'boolean' },
              eliminationStrategy: { type: 'string' },
              fatigueImpact: { type: 'string' },
            },
            required: [
              'decision',
              'location',
              'required',
              'hasDefault',
              'couldBeEliminated',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            totalDecisions: { type: 'number' },
            requiredDecisions: { type: 'number' },
            decisionsWithDefaults: { type: 'number' },
            eliminableDecisions: { type: 'number' },
            fatigueRisk: { type: 'string' },
          },
          required: [
            'totalDecisions',
            'requiredDecisions',
            'decisionsWithDefaults',
            'eliminableDecisions',
            'fatigueRisk',
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
        'decisionAudit',
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
        title: 'Audit Decision Count',
        description:
          'Map every decision a user must make to complete the target flow, from start to finish',
        example:
          'Checkout flow audit: shipping address (5 fields), shipping speed (1), payment method (4 fields), billing address (5 fields), gift wrap (1), insurance (1) = 17 decisions',
        tips: [
          'Include every form field, dropdown, radio group, and toggle as a separate decision',
          'Count both required and optional decisions separately',
          'Map decisions across all steps, not just the current screen',
        ],
      },
      {
        step: 2,
        title: 'Classify and Prioritize Decisions',
        description:
          'Sort each decision into essential (must be made by user), defaultable (has a sensible default), or eliminable (can be removed entirely)',
        example:
          'Essential: payment confirmation. Defaultable: shipping speed (standard). Eliminable: newsletter signup during checkout.',
        tips: [
          'Challenge every "required" field—is it truly needed at this stage?',
          'Identify decisions that can be deferred to after the primary task',
          'Consider which decisions the system can make automatically (e.g., time zone from IP)',
        ],
      },
      {
        step: 3,
        title: 'Implement Smart Defaults',
        description:
          'Pre-select the most common or most appropriate option for every defaultable decision',
        example:
          'Pre-select standard shipping, default to saved payment method, auto-detect country and language from browser settings',
        tips: [
          'Use behavioral data to determine the most common choice for each decision',
          'Make defaults transparent—show what was selected and let users change it',
          'For new users, use population-level defaults; for returning users, use their personal history',
        ],
      },
      {
        step: 4,
        title: 'Design Progressive Disclosure',
        description:
          'Show only essential decisions upfront, revealing optional ones on demand',
        example:
          'Show 3 required fields by default, with "Show advanced options" expanding 8 more optional fields',
        tips: [
          'Place the most important decisions on the first screen',
          'Use collapsible sections, "More options" links, or separate tabs for secondary decisions',
          'Never hide required decisions—only optional ones',
        ],
      },
      {
        step: 5,
        title: 'Add Session Persistence',
        description:
          'Auto-save progress at every step so users can resume after a break',
        example:
          'Auto-save form data on every field blur. Show "Continue where you left off" for returning users with incomplete flows.',
        tips: [
          'Save progress server-side, not just in browser storage',
          'Show a clear progress indicator so users know what\'s complete',
          'Send a reminder email if users abandon mid-flow',
        ],
      },
      {
        step: 6,
        title: 'Measure and Iterate',
        description:
          'Track decision-related metrics and continuously reduce friction',
        example:
          'Monitor completion rate per step, time per step, and abandonment points to identify fatigue-causing decisions',
        tips: [
          'A/B test removing individual decisions to measure impact',
          'Track the correlation between decision count and completion rate',
          'Survey users who abandon flows to understand if fatigue was a factor',
          'Compare your decision count to competitors and industry benchmarks',
        ],
      },
    ],

    dos: [
      'Minimize the number of required decisions to complete any flow',
      'Provide smart defaults for every decision that has a common answer',
      'Auto-fill known user data to eliminate redundant decisions',
      'Use progressive disclosure to hide optional decisions',
      'Place the most important decisions early in the flow when cognitive resources are highest',
      'Save progress automatically so users can resume after a break',
      'Offer a "Recommended" or "Quick Setup" path that collapses many decisions into one',
      'Break long decision flows into manageable chunks with clear progress indicators',
      'Label optional fields clearly so users know they can skip them',
      'Let users change defaults later without restarting the flow',
    ],

    donts: [
      'Don\'t require decisions about things the system can auto-detect (time zone, language, currency)',
      'Don\'t front-load all decisions before delivering any product value',
      'Don\'t present configuration pages with 20+ options and no defaults',
      'Don\'t force users to complete long forms in a single session',
      'Don\'t ask for the same information twice across different steps',
      'Don\'t hide defaults so aggressively that users unknowingly accept bad options',
      'Don\'t add "nice to have" decision points to critical flows like checkout',
      'Don\'t use dark patterns that exploit fatigued users into accepting upsells or opt-ins',
      'Don\'t require account creation before users can experience the product',
      'Don\'t present identical-looking options without clear differentiation or recommendation',
    ],

    bestPractices: [
      {
        title: 'The 3-Decision Rule',
        description:
          'Limit each screen or step to a maximum of 3 meaningful decisions',
        rationale:
          'Research shows that after 3-4 decisions, quality begins to deteriorate. Keeping each step focused preserves cognitive resources for later decisions.',
        example:
          'Checkout step 1: Confirm address (1 decision). Step 2: Choose shipping (1 decision). Step 3: Confirm payment (1 decision).',
      },
      {
        title: 'Default to the Most Common Choice',
        description:
          'Pre-select the option that 70%+ of users would choose anyway',
        rationale:
          'Smart defaults eliminate a decision entirely for the majority while still allowing the minority to change it. This is the single highest-impact strategy against decision fatigue.',
        example:
          'Pre-select "Standard Shipping (Free, 5-7 days)" since 78% of users choose it. Show Express as an alternative.',
      },
      {
        title: 'Just-In-Time Decisions',
        description:
          'Ask for decisions at the moment they become relevant, not before',
        rationale:
          'Decisions made in context are faster and more accurate. Asking during onboarding about preferences that won\'t matter for weeks wastes cognitive resources.',
        example:
          'Don\'t ask notification preferences during signup. Wait until the user receives their first notification, then ask "Was this helpful? Adjust your preferences."',
      },
      {
        title: 'Decision Budgeting',
        description:
          'Treat user decisions as a finite budget and spend them wisely',
        rationale:
          'If your flow requires 20 decisions, every unnecessary decision steals resources from an important one. Audit ruthlessly.',
        example:
          'If checkout requires 5 unavoidable decisions, eliminate all other optional decisions from the checkout flow entirely.',
      },
      {
        title: 'Fatigue-Aware Sequencing',
        description:
          'Place the most important and complex decisions at the beginning of a flow',
        rationale:
          'Users have the most cognitive resources at the start. Trivial decisions (newsletter opt-in, feedback) should come last or be skipped entirely.',
        example:
          'Ask "Which plan do you want?" first (high-stakes). Ask "How did you hear about us?" last or not at all.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear labels that reduce cognitive effort for each decision',
        implementation:
          'Every form field must have a visible label (not just placeholder), with helper text explaining the decision when it is not obvious. Mark optional fields explicitly.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.5',
        guideline:
          'Help - Provide context-sensitive help to reduce the cognitive cost of complex decisions',
        implementation:
          'Add tooltips, inline help text, or "Learn more" links for decisions that require domain knowledge. Ensure help content is accessible to screen readers.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Use proper form structure so assistive technology can convey progress and grouping',
        implementation:
          'Group related form fields with fieldset/legend. Use ARIA progress indicators for multi-step flows. Announce step transitions to screen readers.',
      },
      {
        wcagLevel: 'A',
        criterion: '3.2.2',
        guideline:
          'On Input - Ensure defaults and auto-fill don\'t cause unexpected changes that confuse assistive technology users',
        implementation:
          'When auto-filling fields or applying defaults, announce changes via ARIA live regions so screen reader users know what was pre-selected.',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Fatigued Users',
        severity: 'critical',
        explanation:
          'Deliberately placing upsells, opt-ins, or unfavorable terms late in long flows when users are cognitively depleted',
        mitigation:
          'Place consent-requiring decisions (data sharing, subscriptions, add-ons) early in flows or in separate, clearly labeled steps. Never pre-check opt-ins that benefit the business at user expense.',
      },
      {
        concern: 'Dark Defaults',
        severity: 'critical',
        explanation:
          'Setting defaults that benefit the business rather than the user, knowing fatigued users will accept them',
        mitigation:
          'Defaults must serve the user\'s interest first. If the recommended option is also the most profitable, that\'s acceptable. If the default is only profitable and not in the user\'s interest, it is a dark pattern.',
      },
      {
        concern: 'Forced Decision Overload',
        severity: 'high',
        explanation:
          'Intentionally making cancellation or downgrade flows require many decisions to discourage completion',
        mitigation:
          'Cancellation and downgrade flows should be as simple as signup flows. "Roach motel" patterns that exploit decision fatigue to prevent churn are unethical.',
      },
      {
        concern: 'Hidden Opt-Outs',
        severity: 'high',
        explanation:
          'Burying opt-out choices among many other decisions, knowing fatigued users will miss them',
        mitigation:
          'Make opt-out decisions visually prominent and separate from other decisions. Never mix privacy or data-sharing choices with routine form fields.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Extraneous Factors in Judicial Decisions',
        author: 'Danziger, S., Levav, J., & Avnaim-Pesso, L.',
        year: 2011,
        doi: '10.1073/pnas.1018033108',
        description:
          'Landmark study showing Israeli judges\' parole decisions deteriorated from 65% approval to near 0% before breaks, demonstrating decision fatigue in high-stakes professional contexts',
        type: 'foundational',
      },
      {
        title: 'Ego Depletion: Is the Active Self a Limited Resource?',
        author: 'Baumeister, R. F., Bratslavsky, E., Muraven, M., & Tice, D. M.',
        year: 1998,
        doi: '10.1037/0022-3514.74.5.1252',
        description:
          'The foundational paper establishing that self-control and decision-making draw from a shared, limited resource',
        type: 'foundational',
      },
      {
        title: 'Decision Fatigue Exhausts Self-Regulatory Resources',
        author: 'Vohs, K. D., Baumeister, R. F., et al.',
        year: 2008,
        doi: '10.1037/0022-3514.94.5.883',
        description:
          'Demonstrated that making many choices depletes self-control resources, leading to poorer subsequent decisions',
        type: 'advanced',
      },
      {
        title: 'When Choice Is Demotivating: Can One Desire Too Much of a Good Thing?',
        author: 'Iyengar, S. S., & Lepper, M. R.',
        year: 2000,
        doi: '10.1037/0022-3514.79.6.995',
        description:
          'The famous "jam study" showing that more choices led to fewer purchases—24 jam options yielded 3% purchase rate vs 30% for 6 options',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Willpower: Rediscovering the Greatest Human Strength',
        author: 'Baumeister, Roy F. & Tierney, John',
        year: 2011,
        isbn: '9780143122234',
        description:
          'Comprehensive coverage of ego depletion and decision fatigue by the researcher who discovered the phenomenon',
        type: 'foundational',
      },
      {
        title: 'The Paradox of Choice: Why More Is Less',
        author: 'Schwartz, Barry',
        year: 2004,
        isbn: '9780060005696',
        description:
          'How excessive choice leads to anxiety, decision paralysis, and dissatisfaction—directly applicable to UI design',
        type: 'practical',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Classic UX book advocating for reducing cognitive effort and unnecessary decisions in web interfaces',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Do You Suffer From Decision Fatigue?',
        author: 'Tierney, John',
        url: 'https://www.nytimes.com/2011/08/21/magazine/do-you-suffer-from-decision-fatigue.html',
        description:
          'Influential New York Times article that popularized decision fatigue research, including the Israeli judge study',
        type: 'practical',
      },
      {
        title: 'Reducing Decision Fatigue in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/decision-fatigue/',
        description:
          'Practical guide to identifying and reducing decision fatigue in user interfaces',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Barry Schwartz - TED',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'TED talk on how eliminating choices can reduce anxiety and improve satisfaction',
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
      'choice-overload', // Too many options compounds decision fatigue
      'status-quo-bias', // Users stick with defaults when fatigued
      'default-effect', // Smart defaults directly counteract fatigue
      'loss-aversion', // Fatigued users become more loss-averse
    ],

    conflicts: [
      'autonomy-bias', // Users want control, but fatigue argues for fewer choices
      'ikea-effect', // Effort in customization creates ownership, but causes fatigue
    ],

    confusedWith: [
      'choice-overload', // Related but distinct: overload is about too many options, fatigue is about cumulative depletion
      'analysis-paralysis', // Paralysis is inability to choose; fatigue is degraded quality of choice
      'cognitive-load', // Broader concept; decision fatigue is a specific type of cognitive load
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'ego-depletion',
        'choice-overload',
        'default-effect',
      ],
    },
  },
};
