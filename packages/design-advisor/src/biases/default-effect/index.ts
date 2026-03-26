/**
 * DEFAULT EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const defaultEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'default-effect',
    name: 'Default Effect',
    aliases: ['Default Bias', 'Status Quo Effect'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'defaults',
      'pre-selection',
      'opt-in',
      'opt-out',
      'inertia',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Pre-selected options are rarely changed - defaults determine outcomes.',

    detailed: `The Default Effect is the tendency for people to accept pre-selected options rather than making active choices. Defaults have enormous power: Studies show 80-95% of users keep default settings, even when alternatives might be better for them.

This combines status quo bias (stick with current state), cognitive laziness (changing requires effort), and implied endorsement (defaults signal "recommended choice"). Together, these make the default option overwhelmingly likely to be selected.

In design, defaults are among the most powerful tools available. Organ donation rates vary from 15% to 99% between countries - based solely on whether the default is opt-in or opt-out. The same power applies to every default setting in interfaces.`,

    psychologyBasis: {
      discoveredBy: 'Johnson & Goldstein',
      year: 2003,
      theory: 'Default Effect Theory',
      mechanism: `People tend to accept pre-set options without actively changing them because of several reinforcing cognitive mechanisms:

1. **Effort Aversion**: Changing a default requires cognitive and physical effort — clicking, reading, evaluating — so the path of least resistance wins
2. **Implied Endorsement**: Users interpret defaults as recommendations from the system designer, assuming "they set it this way for a reason"
3. **Loss Aversion**: Switching away from a default feels like giving something up, even if the alternative is objectively better
4. **Decision Fatigue**: When facing many choices, users conserve mental energy by accepting defaults rather than deliberating
5. **Status Quo Bias**: People have a general preference for the current state of affairs — defaults establish what "normal" looks like

The power of defaults is that they operate passively. Users don't have to do anything to accept them, but must take deliberate action to reject them.`,
    },

    realWorldExample: `Johnson & Goldstein compared organ donation consent across countries. Countries with opt-out defaults (presumed consent unless you actively decline): 85-99% participation. Countries with opt-in defaults (must actively consent): 4-27% participation. Same countries, similar cultures, dramatic differences - all from defaults.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Default Effect profoundly shapes user outcomes because the vast majority of users never change pre-selected options. Designers can leverage this to:

- Guide users toward optimal settings through thoughtful pre-selection
- Increase adoption of beneficial features by making them default-on
- Protect user privacy by defaulting to the most private option
- Simplify onboarding by pre-configuring sensible starting states
- Shape opt-in/opt-out rates for newsletters, notifications, and consent flows`,

    whenToUse: [
      {
        title: 'Privacy-Respecting Defaults',
        scenario:
          'When configuring initial privacy, sharing, or data collection settings',
        example:
          'Default all sharing and tracking toggles to OFF, requiring users to actively opt in to data collection',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Smart Onboarding Configuration',
        scenario: 'When setting up initial preferences for new users',
        example:
          'Pre-select the most common timezone, language, and notification preferences based on user context',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Beneficial Feature Enrollment',
        scenario: 'When enrolling users in features that genuinely serve their interests',
        example:
          'Auto-enable two-factor authentication and security alerts for new accounts',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Form Pre-Population',
        scenario: 'When reducing friction in multi-step forms or checkout flows',
        example:
          'Pre-select the most common shipping option and pre-fill billing address from shipping address',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Savings and Retirement Plans',
        scenario: 'When helping users make financially beneficial decisions',
        example:
          'Auto-enroll employees in 401(k) with a sensible default contribution rate (e.g., 6%)',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Marketing Opt-Ins',
        reason:
          'Pre-checking marketing email or SMS consent checkboxes exploits user inertia for business gain',
        consequence:
          'Users receive unwanted communications, increasing unsubscribe rates, spam complaints, and eroding trust',
        alternative:
          'Leave marketing consent unchecked by default; earn opt-ins through clear value propositions',
      },
      {
        title: 'Paid Service Auto-Enrollment',
        reason:
          'Silently defaulting users into paid tiers, add-ons, or recurring billing is manipulative',
        consequence:
          'Chargebacks, refund requests, regulatory penalties, and severe loss of trust',
        alternative:
          'Require explicit opt-in for any paid commitment; make pricing and billing crystal clear',
      },
      {
        title: 'Cookie Consent Dark Patterns',
        reason:
          'Pre-selecting all tracking cookies or making "Accept All" the only prominent button violates GDPR spirit',
        consequence:
          'Regulatory fines, user distrust, and potential legal action under GDPR/CCPA',
        alternative:
          'Present cookie categories with non-essential tracking off by default; give equal visual weight to "Accept" and "Reject"',
      },
      {
        title: 'Irreversible or High-Stakes Decisions',
        reason:
          'Defaulting critical choices (account deletion, data export format, legal agreements) removes user agency',
        consequence:
          'Users make consequential decisions passively, leading to regret and support burden',
        alternative:
          'Force an active choice with no pre-selection for high-stakes decisions',
      },
    ],

    commonMistakes: [
      {
        title: 'Business-Serving Defaults',
        description:
          'Setting defaults that maximize revenue or data collection rather than serving user interests',
        why: 'Users eventually discover they were opted into things they did not want, destroying trust permanently',
        fix: 'Apply the "user advocate" test: would a user thank you for this default? If not, change it.',
      },
      {
        title: 'Hiding the Opt-Out',
        description:
          'Making defaults hard to change by burying settings or using confusing toggle labels',
        why: 'Users who want to change defaults but cannot find how will feel trapped and frustrated',
        fix: 'Place default-changing controls adjacent to the default, with clear labels and immediate feedback',
      },
      {
        title: 'One-Size-Fits-All Defaults',
        description:
          'Using the same defaults for all user segments regardless of context or needs',
        why: 'A default that works for power users may overwhelm beginners, and vice versa',
        fix: 'Segment defaults by user role, experience level, or use case; offer "recommended for you" defaults',
      },
      {
        title: 'Confusing Double Negatives',
        description:
          'Using opt-out language like "Uncheck to not receive..." that inverts user expectations',
        why: 'Double negatives create cognitive load and cause users to accidentally opt into things they meant to reject',
        fix: 'Use positive, direct language: "Send me marketing emails" with an unchecked checkbox',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how visible and accessible default options and their alternatives are',
        examples: [
          'Pre-selected radio buttons or tabs guide users toward a specific starting point',
          'Default-selected pricing tiers positioned prominently influence plan choice',
          'Toggle switches placed in settings pages far from onboarding reduce likelihood of change',
          'Inline defaults (pre-filled fields) are more likely kept than defaults buried in menus',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can reinforce or de-emphasize the default state and alternatives',
        examples: [
          'Bold or highlighted default labels signal "recommended" without explicit text',
          'Small, gray text for alternative options makes defaults feel like the only real choice',
          'Clear labeling of what a toggle controls reduces accidental default acceptance',
          'Font size hierarchy signals which option is "expected"',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color treatment of default vs non-default states signals preference and importance',
        examples: [
          'Pre-selected buttons in primary color vs gray alternatives create strong default bias',
          'Green/active toggles for default-on states suggest "this should stay on"',
          'Muted styling of non-default options discourages exploration',
          'Cookie consent banners with bright "Accept All" and dim "Manage Preferences" manipulate via color defaults',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines the friction cost of changing vs accepting defaults',
        examples: [
          'Pre-checked checkboxes require effort (click) to deselect, favoring the default',
          'Multi-step opt-out processes vs single-click opt-in create asymmetric friction',
          'Default slider positions anchor user adjustments to a specific starting value',
          'Auto-enrollment with "you can cancel anytime" exploits inertia against cancellation',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing of defaults shapes whether users perceive them as recommendations or neutral starting points',
        examples: [
          '"Recommended" badges on default options reinforce implied endorsement',
          'Explaining why a default was chosen builds trust and informed acceptance',
          'Ambiguous toggle labels ("Enable smart features") hide what users are consenting to',
          'Transparent default descriptions ("We pre-selected X because most users prefer it") empower informed choice',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility of default controls determines whether all users can meaningfully change defaults',
        examples: [
          'Screen readers must announce pre-selected states clearly so non-visual users know what is defaulted',
          'Keyboard-navigable toggles and checkboxes ensure all users can change defaults',
          'ARIA attributes on default-selected options communicate state to assistive technology',
          'Focus management after changing a default should confirm the change was applied',
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
        title: 'Privacy-First Default Settings',
        description:
          'Settings panel with all sharing and tracking options defaulted to OFF',
        code: `<div class="privacy-settings">
  <h3>Privacy Settings</h3>
  <p class="description">We default to the most private options.
  Enable sharing only if you want to.</p>

  <label class="toggle-row">
    <span>Share usage analytics</span>
    <input type="checkbox" role="switch" aria-checked="false">
    <span class="status">Off</span>
  </label>

  <label class="toggle-row">
    <span>Personalized recommendations</span>
    <input type="checkbox" role="switch" aria-checked="false">
    <span class="status">Off</span>
  </label>

  <label class="toggle-row">
    <span>Third-party data sharing</span>
    <input type="checkbox" role="switch" aria-checked="false">
    <span class="status">Off</span>
  </label>

  <p class="rationale">We believe your data is yours.
  These options are off by default to protect your privacy.</p>
</div>`,
        explanation:
          'By defaulting all privacy-sensitive options to OFF, the design respects user autonomy. The 80-95% who never change defaults are protected, while those who want to opt in can do so freely.',
        principle:
          'Ethical defaults protect users who accept them passively',
        metrics: {
          before: '92% of users had all tracking enabled (pre-checked defaults)',
          after: '11% actively opted into tracking (unchecked defaults)',
          improvement: 'Users who opted in reported higher trust and 3x lower churn',
        },
      },
      {
        title: 'Smart 401(k) Auto-Enrollment',
        description:
          'Retirement savings with auto-enrollment at a sensible default contribution rate',
        code: `<div class="retirement-enrollment">
  <h3>Retirement Savings Plan</h3>
  <div class="auto-enrolled">
    <span class="badge success">Auto-Enrolled</span>
    <p>You're automatically contributing <strong>6%</strong> of your salary,
    with your employer matching up to 4%.</p>
  </div>

  <div class="contribution-slider">
    <label>Adjust your contribution</label>
    <input type="range" min="0" max="20" value="6" step="1">
    <span class="value">6%</span>
  </div>

  <details>
    <summary>Why 6%?</summary>
    <p>6% is the optimal rate to receive your full employer match (4%).
    Contributing less means leaving free money on the table.</p>
  </details>

  <div class="actions">
    <button class="secondary">Change contribution</button>
    <button class="text">Opt out of plan</button>
  </div>
</div>`,
        explanation:
          'Auto-enrollment with a 6% default (matching the employer match threshold) serves the user by ensuring they capture the full employer contribution. The default is explained and easily adjustable.',
        principle:
          'Defaults that serve user welfare are the highest ethical use of the default effect',
        metrics: {
          before: '49% participation with opt-in enrollment',
          after: '91% participation with opt-out auto-enrollment at 6%',
          improvement: '86% increase in retirement savings participation',
        },
      },
      {
        title: 'Ethical Cookie Consent Banner',
        description:
          'GDPR cookie banner with non-essential cookies defaulted to OFF',
        code: `<div class="cookie-banner" role="dialog" aria-label="Cookie preferences">
  <h3>We value your privacy</h3>
  <p>We use essential cookies to make our site work.
  We'd like to set optional cookies for analytics and personalization.</p>

  <div class="cookie-categories">
    <label class="cookie-option">
      <input type="checkbox" checked disabled>
      <span>Essential cookies</span>
      <span class="note">Always active — required for site functionality</span>
    </label>

    <label class="cookie-option">
      <input type="checkbox">
      <span>Analytics cookies</span>
      <span class="note">Help us understand how you use our site</span>
    </label>

    <label class="cookie-option">
      <input type="checkbox">
      <span>Marketing cookies</span>
      <span class="note">Used for targeted advertising</span>
    </label>
  </div>

  <div class="actions">
    <button class="primary">Save preferences</button>
    <button class="secondary">Accept all</button>
  </div>
</div>`,
        explanation:
          'Non-essential cookies are unchecked by default, respecting GDPR principles. "Save preferences" (keeping defaults) is the primary action, and "Accept all" is secondary. This gives users genuine choice without exploiting inertia.',
        principle:
          'GDPR-compliant defaults put user consent before tracking convenience',
      },
    ],

    bad: [
      {
        title: 'Pre-Checked Marketing Emails',
        description:
          'Registration form with marketing consent pre-checked by default',
        code: `<!-- DON'T DO THIS -->
<form class="registration">
  <h3>Create Account</h3>
  <input type="email" placeholder="Email address">
  <input type="password" placeholder="Password">

  <label class="checkbox">
    <input type="checkbox" checked>
    Send me promotional emails, special offers, and partner deals
  </label>

  <label class="checkbox">
    <input type="checkbox" checked>
    Share my data with trusted third-party partners
  </label>

  <button type="submit">Create Account</button>
</form>`,
        explanation:
          'Pre-checking marketing consent exploits the default effect to enroll users in communications they did not actively choose. Most users will not notice or uncheck these boxes, leading to unwanted emails and eroded trust.',
        principle:
          'Never use defaults to enroll users in marketing or data sharing without active consent',
      },
      {
        title: 'Auto-Added Paid Services',
        description:
          'Checkout flow with paid add-ons pre-selected into the cart',
        code: `<!-- DON'T DO THIS -->
<div class="checkout-summary">
  <h3>Your Order</h3>
  <div class="item">Flight: NYC to LAX — $299</div>

  <div class="add-ons">
    <label class="addon selected">
      <input type="checkbox" checked>
      <span>Travel insurance — $49</span>
      <span class="badge">Recommended</span>
    </label>
    <label class="addon selected">
      <input type="checkbox" checked>
      <span>Priority boarding — $35</span>
    </label>
    <label class="addon selected">
      <input type="checkbox" checked>
      <span>Seat selection — $29</span>
    </label>
  </div>

  <div class="total">
    <span>Total: $412</span>
    <small>Flight $299 + add-ons $113</small>
  </div>
</div>`,
        explanation:
          'Pre-selecting paid add-ons exploits user inertia to inflate the order total. Most users will not notice or will feel too rushed to uncheck items during checkout, leading to unwanted charges and buyer remorse.',
        principle:
          'Never default users into paying more than they intended',
      },
      {
        title: 'Manipulative Cookie Consent Defaults',
        description:
          'Cookie banner with all tracking pre-enabled and asymmetric button design',
        code: `<!-- DON'T DO THIS -->
<div class="cookie-banner">
  <p>We use cookies to improve your experience.</p>

  <div class="categories">
    <label><input type="checkbox" checked disabled> Essential</label>
    <label><input type="checkbox" checked> Analytics</label>
    <label><input type="checkbox" checked> Marketing</label>
    <label><input type="checkbox" checked> Social Media</label>
    <label><input type="checkbox" checked> Personalization</label>
  </div>

  <div class="actions">
    <button class="primary large">Accept All</button>
    <button class="text tiny">Manage preferences</button>
  </div>
</div>`,
        explanation:
          'All tracking cookies are pre-checked, and "Accept All" is a large primary button while "Manage preferences" is tiny text. This uses default effect combined with visual hierarchy to maximize tracking consent without informed choice.',
        principle:
          'Cookie consent defaults must not exploit user inertia to enable tracking',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iOS Privacy Defaults',
        url: 'https://www.apple.com/privacy/',
        description: 'Apple defaults iOS to privacy-preserving settings: App Tracking Transparency requires explicit opt-in, location sharing defaults to "While Using the App" rather than "Always", and analytics sharing is off by default.',
        effectiveness: 'very-effective',
        analysis: 'Apple uses the default effect ethically — the 80-95% of users who never change settings get the most private configuration. This builds trust and differentiates Apple on privacy, turning a cognitive bias into a competitive advantage.',
      },
      {
        company: 'GDPR Cookie Banners',
        product: 'European Cookie Consent',
        description: 'Post-GDPR, European websites must implement cookie consent with non-essential cookies defaulted to off. Sites like the BBC and Guardian use compliant banners where users must actively opt in to tracking.',
        effectiveness: 'effective',
        analysis: 'GDPR essentially legislated the ethical use of the default effect. By requiring opt-in rather than opt-out for tracking, regulators recognized that defaults determine outcomes and mandated user-serving defaults.',
      },
      {
        company: 'US Government',
        product: '401(k) Auto-Enrollment (Pension Protection Act)',
        description: 'After the 2006 Pension Protection Act, US employers could auto-enroll workers in 401(k) plans with a default contribution rate. Participation jumped from around 60% to over 90% in companies that adopted auto-enrollment.',
        effectiveness: 'very-effective',
        analysis: 'The most cited example of beneficial defaults. Thaler and Sunstein championed this in "Nudge" as libertarian paternalism — the default serves the user (retirement savings) while preserving freedom to opt out.',
      },
      {
        company: 'Microsoft',
        product: 'Windows Default Browser',
        description: 'Windows defaults to Microsoft Edge as the browser and Bing as the search engine. Changing defaults requires navigating through multiple settings screens, exploiting the friction of opting out.',
        effectiveness: 'effective',
        analysis: 'This is a business-serving default: most users never change from Edge/Bing not because they prefer it, but because changing requires effort. Regulators have scrutinized this as anti-competitive use of the default effect.',
      },
      {
        company: 'Newsletter Sign-Ups',
        product: 'Pre-Checked Email Consent',
        description: 'Many e-commerce sites (historically) pre-checked newsletter sign-up boxes during checkout. GDPR and CAN-SPAM regulations have pushed back on this, but the practice persists in jurisdictions without strong regulation.',
        effectiveness: 'somewhat-effective',
        analysis: 'Pre-checked newsletter consent generates high sign-up numbers but low engagement. Users who did not actively choose to subscribe have open rates 60-70% lower and unsubscribe rates 3-5x higher than active opt-ins.',
      },
    ],

    abTests: [
      {
        title: 'Opt-In vs Opt-Out Newsletter Enrollment',
        hypothesis:
          'Changing newsletter consent from pre-checked (opt-out) to unchecked (opt-in) will reduce sign-ups but improve engagement',
        controlVersion: {
          description:
            'Registration form with "Send me weekly newsletter" checkbox pre-checked (opt-out pattern)',
          metrics: {
            conversionRate: '83% newsletter enrollment',
            clickThroughRate: '4.2% email open rate',
          },
        },
        treatmentVersion: {
          description:
            'Registration form with "Send me weekly newsletter" checkbox unchecked (opt-in pattern)',
          metrics: {
            conversionRate: '21% newsletter enrollment',
            clickThroughRate: '28.5% email open rate',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While opt-in enrollment was 75% lower in raw numbers, the quality of subscribers was dramatically higher. Open rates increased 579%, click-through rates increased 340%, and unsubscribe rates dropped 89%. Revenue per subscriber was 4.2x higher for opt-in subscribers.',
          learnings: [
            'Default-driven sign-ups produce low-quality, disengaged subscribers',
            'Active opt-in subscribers are 4-6x more valuable per person',
            'List size is a vanity metric; engagement quality drives revenue',
            'GDPR compliance (opt-in) actually improves email marketing ROI',
          ],
        },
      },
      {
        title: 'Cookie Consent: All-On Default vs All-Off Default',
        hypothesis:
          'Defaulting non-essential cookies to OFF will reduce tracking consent but improve user trust metrics',
        controlVersion: {
          description:
            'Cookie banner with all categories pre-checked and prominent "Accept All" button',
          metrics: {
            conversionRate: '94% accepted all cookies',
            bounceRate: '2.1%',
          },
        },
        treatmentVersion: {
          description:
            'Cookie banner with only essential cookies checked, equal-weight "Save Preferences" and "Accept All" buttons',
          metrics: {
            conversionRate: '31% accepted all cookies',
            bounceRate: '1.4%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While tracking consent dropped from 94% to 31%, the treatment group showed 33% lower bounce rates, 18% longer session duration, and 12% higher conversion on the primary product page. Users who gave informed consent were more engaged overall.',
          learnings: [
            'Forced/defaulted consent inflates tracking numbers but reduces trust',
            'Users who actively consent are more engaged than passively enrolled ones',
            'GDPR-compliant defaults can improve overall site engagement',
            'Trust is a long-term asset; manipulative defaults create trust debt',
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
        name: 'Pre-Selected Checkboxes',
        description:
          'Checkboxes or toggles that arrive in a checked/enabled state without user action',
        howToSpot:
          'Look for checked checkboxes in forms, especially for marketing consent, add-ons, or data sharing agreements',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Default Toggle States',
        description:
          'Toggle switches set to ON by default, particularly for data collection or notifications',
        howToSpot:
          'Check settings pages and onboarding flows for toggles that start in the ON position',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Pre-Selected Plan or Option',
        description:
          'A pricing tier, shipping method, or configuration option that is highlighted/selected before user interaction',
        howToSpot:
          'Look for radio buttons, cards, or tabs with a pre-selected state, especially with "Recommended" badges',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Asymmetric Button Design',
        description:
          'Consent dialogs where the "accept default" button is visually dominant over the "change" option',
        howToSpot:
          'Compare button sizes, colors, and positioning in cookie banners, permission dialogs, and consent flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Auto-Enrollment Indicators',
        description:
          'Messages like "You are enrolled in..." or "We have enabled..." indicating passive enrollment',
        howToSpot:
          'Look for enrollment confirmations the user did not explicitly request, especially in onboarding and email',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Opt-Out Pattern',
        description: 'Features, services, or communications enabled by default that require user action to disable',
        indicators: ['Pre-checked consent boxes', 'Auto-enrolled services with "cancel anytime"', 'Settings that start enabled', 'Newsletter sign-up pre-selected during registration'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Friction Asymmetry Pattern',
        description: 'Accepting the default is easy (one click or no action) while changing requires multiple steps',
        indicators: ['Single-click accept vs multi-step change flow', 'Prominent accept button vs buried settings link', 'Instant enrollment vs lengthy cancellation process', 'Simple opt-in vs complex opt-out requiring email or phone call'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Implied Endorsement Pattern',
        description: 'Defaults presented as recommendations or best practices rather than neutral starting points',
        indicators: ['"Recommended" badges on default options', '"Most popular" labels on pre-selected tiers', '"Best for you" framing on default configuration', 'Expert or authority endorsement of the default choice'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Stealth Default Pattern',
        description: 'Defaults set during account creation or onboarding that users never see or explicitly agree to',
        indicators: ['Settings enabled without appearing in onboarding flow', 'Data sharing active from first login', 'Default permissions granted without prompt', 'Features activated in background without notification'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What options are pre-selected before the user takes any action?',
      'Are any checkboxes pre-checked, especially for consent, marketing, or data sharing?',
      'Is the effort to accept the default lower than the effort to change it?',
      'Do default settings serve the user or the business?',
      'Are cookie consent defaults compliant with GDPR (non-essential off by default)?',
      'Is there a "Recommended" or "Most Popular" label on a pre-selected option?',
      'Can users easily find and change default settings after initial setup?',
      'Are toggle labels clear about what ON vs OFF means?',
      'Is auto-enrollment disclosed clearly before it takes effect?',
      'Would a user advocate approve of each default choice?',
      'Are there paid services or add-ons pre-selected in checkout flows?',
      'Is the default notification frequency respectful of user attention?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the default effect.

Analyze the provided design for default effect patterns. Identify:

1. **Pre-Selected Options**: Checkboxes, toggles, radio buttons, or tabs that arrive in a selected state
2. **Opt-In vs Opt-Out**: Whether enrollment in features, communications, or services is opt-in or opt-out
3. **Friction Asymmetry**: Whether accepting defaults is easier than changing them
4. **Implied Endorsement**: Whether defaults are presented as recommendations
5. **Consent Patterns**: How cookie consent, data sharing, and marketing permissions are defaulted

For each default found:
- Identify who the default serves (user or business)
- Assess whether the default is ethical and transparent
- Check GDPR/privacy regulation compliance
- Evaluate whether changing the default is easy and obvious
- Determine if the default would pass the "user advocate" test

Consider:
- Are defaults protecting user privacy and autonomy?
- Is there friction asymmetry between accepting and rejecting defaults?
- Are paid services or add-ons pre-selected?
- Do toggle labels clearly communicate what each state means?
- Would the average user understand and approve of each default if explained?

Provide actionable recommendations for ethical, user-serving defaults.`,

    outputSchema: {
      type: 'object',
      properties: {
        defaultsDetected: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              defaultState: { type: 'string' },
              servesUser: { type: 'boolean' },
              frictionToChange: { type: 'string' },
              ethical: { type: 'boolean' },
              gdprCompliant: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'defaultState',
              'servesUser',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            userServingScore: { type: 'number' },
            frictionSymmetry: { type: 'number' },
            transparencyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'userServingScore',
            'frictionSymmetry',
            'transparencyScore',
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
        'defaultsDetected',
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
        title: 'Audit All Defaults',
        description:
          'Inventory every pre-selected option, toggle state, and auto-enrollment in your product',
        example:
          'Spreadsheet listing every default: setting name, default state, who it serves, effort to change',
        tips: [
          'Include onboarding flows, settings pages, checkout, and registration',
          'Document both visible defaults (checkboxes) and invisible ones (backend settings)',
          'Categorize each default as user-serving, neutral, or business-serving',
        ],
      },
      {
        step: 2,
        title: 'Apply the User Advocate Test',
        description:
          'For each default, ask: "Would a user advocate recommend this default?"',
        example:
          'Privacy settings defaulted to most private = passes. Marketing emails pre-checked = fails.',
        tips: [
          'If a default primarily serves the business, it should require opt-in instead',
          'Consider vulnerable users: would this default harm someone not paying attention?',
          'When in doubt, default to the option that protects user interests',
        ],
      },
      {
        step: 3,
        title: 'Ensure Friction Symmetry',
        description:
          'Make changing a default as easy as accepting it — no asymmetric effort',
        example:
          'If one click accepts cookies, one click should also reject non-essential cookies',
        tips: [
          'Never require more steps to opt out than to opt in',
          'Place opt-out controls next to where the default is communicated',
          'Confirm changes immediately with clear feedback',
        ],
      },
      {
        step: 4,
        title: 'Label Defaults Transparently',
        description:
          'Clearly communicate what each default does and why it was chosen',
        example:
          '"We pre-selected Standard Shipping (3-5 days) because it is the most popular choice"',
        tips: [
          'Avoid double-negative language in toggle labels',
          'Explain the rationale for defaults where possible',
          'Use progressive disclosure for detailed explanations',
        ],
      },
      {
        step: 5,
        title: 'Test and Measure Default Impact',
        description:
          'Measure how many users keep vs change each default, and track downstream outcomes',
        example:
          'Track: % who keep default, engagement of default-keepers vs changers, support tickets related to defaults',
        tips: [
          'If 99% keep a default, ensure it truly serves their interest',
          'Monitor support tickets about unwanted enrollments or surprises',
          'A/B test opt-in vs opt-out patterns for key decisions',
        ],
      },
      {
        step: 6,
        title: 'Comply with Regulations',
        description:
          'Ensure defaults meet GDPR, CCPA, CAN-SPAM, and other applicable regulations',
        example:
          'GDPR requires non-essential cookies to be off by default; CAN-SPAM requires explicit email consent',
        tips: [
          'Track regulatory changes that affect default requirements',
          'Document your default choices for compliance audits',
          'Default to the strictest applicable regulation globally, when possible',
        ],
      },
    ],

    dos: [
      'Default to the most privacy-respecting option for data collection and sharing',
      'Make changing defaults as easy as accepting them (friction symmetry)',
      'Explain why a default was chosen to build trust and informed consent',
      'Use defaults to protect users from common mistakes (e.g., auto-save, 2FA enrollment)',
      'Segment defaults by user context when a universal default would harm some users',
      'Audit all defaults regularly against the "user advocate" test',
      'Comply with GDPR, CCPA, and other regulations requiring opt-in consent',
      'Provide clear, immediate feedback when a user changes a default',
    ],

    donts: [
      'Don\'t pre-check marketing consent, newsletter sign-ups, or data sharing boxes',
      'Don\'t auto-enroll users in paid services, add-ons, or recurring billing',
      'Don\'t create friction asymmetry between opting in and opting out',
      'Don\'t use double-negative language in toggle labels ("Uncheck to not receive...")',
      'Don\'t hide default-changing controls in deep settings menus',
      'Don\'t default all cookie categories to ON in consent banners',
      'Don\'t use "Recommended" badges manipulatively on business-serving defaults',
      'Don\'t set defaults that exploit inertia against the user\'s likely preference',
    ],

    bestPractices: [
      {
        title: 'Privacy by Default',
        description:
          'Always default to the most private, least data-collecting option',
        rationale:
          'Users who passively accept defaults deserve protection, not exploitation. GDPR Article 25 codifies this as "data protection by default".',
        example:
          'All tracking, analytics sharing, and personalization toggles start OFF; users actively opt in',
      },
      {
        title: 'Friction Symmetry',
        description:
          'Ensure equal effort to accept and reject any default',
        rationale:
          'Asymmetric friction is the primary mechanism of dark pattern defaults; symmetry ensures genuine choice',
        example:
          'Cookie banner with equal-sized "Accept All" and "Reject Non-Essential" buttons side by side',
      },
      {
        title: 'Transparent Default Rationale',
        description:
          'Tell users why a default was set and who it serves',
        rationale:
          'Transparency converts passive acceptance into informed consent and builds long-term trust',
        example:
          '"We pre-selected the Pro plan because it includes the features most teams use. You can change this anytime."',
      },
      {
        title: 'Smart Contextual Defaults',
        description:
          'Adapt defaults to user context, location, and behavior rather than using one-size-fits-all',
        rationale:
          'Context-aware defaults better serve users and reduce the need for manual configuration',
        example:
          'Auto-detect timezone and language from browser; pre-select shipping method based on user location',
      },
      {
        title: 'Regular Default Audits',
        description:
          'Review all product defaults quarterly against user feedback, support data, and regulation changes',
        rationale:
          'Defaults that were appropriate at launch may become harmful as the product and regulations evolve',
        example:
          'Quarterly review: list all defaults, check support tickets, verify regulatory compliance, update as needed',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Pre-selected states must be semantically communicated',
        implementation:
          'Use proper checked/selected attributes and ARIA states (aria-checked, aria-selected) so screen readers announce default selections accurately',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - All default controls must expose their state to assistive technology',
        implementation:
          'Ensure checkboxes, toggles, and radio buttons use native HTML elements or proper ARIA roles with state updates on change',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Changing a default should not cause unexpected context changes',
        implementation:
          'When a user unchecks a default or changes a toggle, do not navigate away, open modals, or make other disorienting changes',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Default controls must have clear, unambiguous labels',
        implementation:
          'Label toggles with what happens when ON vs OFF. Avoid ambiguous labels like "Enable smart features" — specify what "smart features" means',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting User Inertia',
        severity: 'critical',
        explanation:
          'Using pre-selected options to enroll users in services, subscriptions, or data sharing they would not actively choose',
        mitigation:
          'Apply the user advocate test to every default. If a default primarily serves the business, switch to opt-in. Default to the option that protects user interests.',
      },
      {
        concern: 'GDPR and Privacy Regulation Compliance',
        severity: 'critical',
        explanation:
          'Defaulting tracking cookies, analytics, or data sharing to ON violates GDPR Article 25 (data protection by default)',
        mitigation:
          'Default all non-essential data collection to OFF. Require affirmative, informed consent for tracking. Document default choices for compliance audits.',
      },
      {
        concern: 'Friction Asymmetry as Manipulation',
        severity: 'high',
        explanation:
          'Making it easy to accept defaults but hard to change them (e.g., one-click enrollment, multi-step cancellation)',
        mitigation:
          'Ensure equal friction: if one click enrolls, one click unenrolls. Place opt-out controls adjacent to where defaults are communicated.',
      },
      {
        concern: 'Hidden Financial Defaults',
        severity: 'critical',
        explanation:
          'Pre-selecting paid add-ons, premium tiers, or recurring billing during checkout without clear disclosure',
        mitigation:
          'Never default users into paying more. Require explicit opt-in for any charge beyond the primary purchase. Show clear total with and without add-ons.',
      },
      {
        concern: 'Vulnerable User Exploitation',
        severity: 'critical',
        explanation:
          'Users with cognitive disabilities, elderly users, or those in a hurry are disproportionately affected by manipulative defaults',
        mitigation:
          'Design defaults to protect the most vulnerable user. If a default could harm someone not paying close attention, it should not be the default.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Do Defaults Save Lives?',
        author: 'Johnson, E. J., & Goldstein, D.',
        year: 2003,
        doi: '10.1126/science.1091721',
        url: 'https://science.sciencemag.org/content/302/5649/1338',
        description:
          'The landmark study comparing organ donation rates across opt-in vs opt-out countries, demonstrating the profound power of defaults',
        type: 'foundational',
      },
      {
        title: 'Defaults, Framing and Privacy: Why Opting In ≠ Opting Out',
        author: 'Johnson, E. J., Bellman, S., & Lohse, G. L.',
        year: 2002,
        description:
          'Research showing that opt-in and opt-out defaults produce dramatically different privacy choices even when the options are logically equivalent',
        type: 'foundational',
      },
      {
        title: 'Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving',
        author: 'Thaler, R. H., & Benartzi, S.',
        year: 2004,
        doi: '10.1086/380085',
        description:
          'Demonstrates how default enrollment in escalating savings plans dramatically increased retirement contributions',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, Richard H., & Sunstein, Cass R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'The definitive book on choice architecture and defaults, introducing the concept of "libertarian paternalism" — designing defaults that help without restricting freedom',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the cognitive mechanisms (System 1 laziness, status quo bias) that explain why defaults are so powerful',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Thaler\'s account of developing the default effect research and applying it to policy, including 401(k) auto-enrollment',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Power of Defaults in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/the-power-of-defaults/',
        description:
          'Practical UX guide to choosing ethical, user-serving defaults in interface design',
        type: 'practical',
      },
      {
        title: 'Dark Patterns: Deception vs. Honesty in UI Design',
        author: 'Brignull, Harry',
        url: 'https://www.deceptive.design/',
        description:
          'Catalog of manipulative default patterns (pre-checked boxes, forced continuity) and their ethical alternatives',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How to Make Good Decisions by Designing Better Defaults',
        author: 'Thaler, Richard H. (TED Talk)',
        url: 'https://www.youtube.com/watch?v=9X68dm92HVI',
        description:
          'Nobel laureate Thaler explains how defaults shape decisions and how to design them ethically',
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
      'status-quo-bias',     // General preference for current state reinforces default acceptance
      'loss-aversion',       // Changing from default feels like losing the default option
      'anchoring-bias',      // Defaults serve as anchors for subsequent adjustments
      'choice-overload',     // Defaults reduce choice burden when options are overwhelming
    ],

    conflicts: [
      'reactance',           // Some users actively reject defaults when they feel manipulated
      'need-for-uniqueness', // Users seeking differentiation may resist default choices
    ],

    confusedWith: [
      'status-quo-bias',     // Related but broader — default effect is a specific mechanism within status quo preference
      'endowment-effect',    // Overlaps: defaults create a sense of ownership, but endowment is about valuing what you have
      'omission-bias',       // Related: preferring inaction (keeping default) over action (changing it)
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'opt-in-opt-out-asymmetry',
        'implicit-consent',
        'pre-selection-bias',
      ],
    },
  },
};
