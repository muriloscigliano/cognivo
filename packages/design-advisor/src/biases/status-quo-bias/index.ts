/**
 * STATUS QUO BIAS
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const statusQuoBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'status-quo-bias',
    name: 'Status Quo Bias',
    aliases: ['System Justification', 'Preference for Status Quo'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'inertia',
      'resistance-to-change',
      'defaults',
      'familiarity',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'People prefer things to stay as they are - change feels risky.',

    detailed: `Status Quo Bias is the tendency to prefer the current state of affairs. Change is perceived as risky and uncomfortable, so people stick with what they know even when alternatives might be better.

This bias combines loss aversion (changes feel like losses), cognitive laziness (change requires effort), and uncertainty aversion (current state is known, alternatives are uncertain). Together they create powerful resistance to change.

In design, this explains why users resist redesigns, prefer default settings, and struggle to adopt new features. It also creates opportunities: Once users adopt your product, status quo bias helps retain them. The key is managing the initial adoption carefully, then leveraging inertia for retention.`,

    psychologyBasis: {
      discoveredBy: 'Samuelson & Zeckhauser',
      year: 1988,
      theory: 'Status Quo Bias Theory',
      mechanism: `The brain treats the current state as a reference point, and any deviation is evaluated as a potential loss. This happens because:

1. **Loss Aversion**: Potential losses from changing loom larger than potential gains, making inaction feel safer than action
2. **Cognitive Effort**: Evaluating alternatives requires mental work; sticking with the current state requires none
3. **Uncertainty Aversion**: The current state is known and predictable; alternatives carry unknown risks
4. **Mere Exposure Effect**: Familiarity breeds preference — the more we experience something, the more we like it
5. **Omission Bias**: People feel less responsible for negative outcomes caused by inaction than by action

The mechanism is largely automatic — people rationalize staying with the current option even when objective analysis favors switching.`,
    },

    realWorldExample: `Study of employee benefit choices: Given option to switch healthcare plans, only 2% switched - even when new plans were objectively better and cheaper. Default plan had overwhelming stickiness despite no rational reason to keep it.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Status Quo Bias profoundly affects how users interact with defaults, settings, and changes in interfaces. Because users strongly prefer the current state, designers can leverage this to:

- Set smart defaults that serve users well from the start
- Use opt-out rather than opt-in for beneficial features
- Reduce friction for desirable actions by making them the default path
- Anticipate and mitigate resistance to redesigns and migrations
- Drive feature adoption by making new capabilities the default experience`,

    whenToUse: [
      {
        title: 'Default Settings and Preferences',
        scenario:
          'When configuring initial settings for new users',
        example:
          'Pre-select the most secure privacy settings, best notification preferences, and optimal display options so users benefit immediately without effort',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Opt-Out for Beneficial Programs',
        scenario: 'When enrolling users in programs that serve their interests',
        example:
          'Auto-enroll employees in 401(k) retirement plans with opt-out instead of opt-in, increasing participation from 49% to 86%',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Pre-Selected Best Options',
        scenario: 'When presenting choices where one option clearly benefits the user',
        example:
          'Pre-select the shipping option with best value, the plan that fits their usage, or the configuration most users prefer',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Gradual Feature Migration',
        scenario: 'When transitioning users to new features or interfaces',
        example:
          'Introduce new features alongside familiar ones, letting users opt into changes at their own pace rather than forcing abrupt switches',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Retention and Switching Costs',
        scenario: 'When building product stickiness through positive lock-in',
        example:
          'Invest user effort into personalizing their experience early, so the accumulated customization creates natural switching costs',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Dark Pattern Defaults',
        reason:
          'Pre-selecting options that benefit the business at the user\'s expense exploits status quo bias unethically',
        consequence:
          'Users unknowingly sign up for newsletters, extras, or data sharing they never intended',
        alternative:
          'Leave self-serving options unchecked; only pre-select options that genuinely benefit users',
      },
      {
        title: 'Trapping Users in Inferior States',
        reason:
          'Making it deliberately hard to change settings or cancel exploits inertia',
        consequence:
          'Users feel trapped, leading to resentment, negative reviews, and regulatory scrutiny',
        alternative:
          'Make changing settings, cancelling subscriptions, and switching options as easy as signing up',
      },
      {
        title: 'Blocking Critical Updates',
        reason:
          'Relying on status quo bias for security or safety updates can leave users vulnerable',
        consequence:
          'Users skip critical security patches or safety features because change feels risky',
        alternative:
          'Auto-apply security updates by default; clearly communicate why change is necessary',
      },
      {
        title: 'Preventing Informed Choice',
        reason:
          'Using defaults to prevent users from considering alternatives undermines autonomy',
        consequence:
          'Users miss better options because the default discourages exploration',
        alternative:
          'Provide clear, prominent information about alternatives alongside defaults',
      },
    ],

    commonMistakes: [
      {
        title: 'Setting Poor Defaults',
        description:
          'Choosing default values that serve the business rather than the user',
        why: 'Most users never change defaults, so bad defaults permanently harm user experience',
        fix: 'Research what settings truly benefit users and make those the defaults; test with real user data',
      },
      {
        title: 'Forcing Abrupt Changes',
        description:
          'Redesigning interfaces overnight without gradual transition or user preparation',
        why: 'Status quo bias causes intense backlash when familiar interfaces change suddenly',
        fix: 'Introduce changes gradually, offer transition periods, and let users preview new versions before switching',
      },
      {
        title: 'Making Change Harder Than Necessary',
        description:
          'Burying settings, requiring extra confirmation steps, or adding friction to switching',
        why: 'Artificial friction exploits inertia and creates resentment when users discover they were trapped',
        fix: 'Make all settings easily accessible and changeable; match the effort to change with the effort to set up',
      },
      {
        title: 'Ignoring Migration Resistance',
        description:
          'Expecting users to eagerly adopt new tools, platforms, or workflows',
        why: 'Even objectively better alternatives face resistance because the current system is familiar',
        fix: 'Plan migration carefully: show clear benefits, provide transition tools, and allow parallel use during switchover',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout changes trigger strong status quo resistance; familiar layouts feel correct',
        examples: [
          'Moving navigation elements causes disorientation and backlash',
          'Default view layouts (list vs grid) anchor user expectations',
          'Familiar page structures reduce cognitive load through learned patterns',
          'Dashboard rearrangements require careful transition to avoid rejection',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography changes are noticed subconsciously and can trigger unease without clear cause',
        examples: [
          'Font changes feel "off" to users even when objectively better',
          'Text size defaults affect reading comfort expectations',
          'Consistent typography builds familiarity that resists change',
          'Gradual typographic evolution is better tolerated than sudden shifts',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Brand color changes and theme defaults strongly affect user comfort',
        examples: [
          'Dark/light mode defaults shape user expectations for the experience',
          'Brand color changes can feel like losing a familiar identity',
          'Default color themes create baseline expectations',
          'Gradual color evolution (seasonal themes) normalizes change',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns and default behaviors are the primary domain of status quo bias',
        examples: [
          'Default selections on forms determine most users\' choices',
          'Pre-filled form values become the accepted answer',
          'Default sort order shapes how users perceive content',
          'Auto-enrolled features have dramatically higher adoption than opt-in features',
        ],
      },
      content: {
        level: ImpactLevel.MEDIUM,
        description:
          'Content framing can either reinforce status quo preference or motivate change',
        examples: [
          'Messaging that emphasizes what users will lose by not changing can overcome inertia',
          'Change messaging should address fear of loss, not just promise of gain',
          'Showing what peers have already switched to provides social permission to change',
          'Documentation of "what changed and why" reduces redesign resistance',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Default accessibility settings have outsized impact because users rarely change them',
        examples: [
          'Accessible defaults (sufficient contrast, readable fonts) protect users who never adjust settings',
          'Default text size affects all users who never customize',
          'Motion reduction defaults protect vestibular-disorder users who may not know the setting exists',
          'Keyboard navigation defaults must work well since most users never configure them',
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
        title: 'Smart Privacy Defaults',
        description:
          'App that pre-selects the most private settings, letting users opt out if they want less privacy',
        code: `<div class="privacy-settings">
  <h3>Your Privacy Settings</h3>
  <p class="intro">We've set your defaults to maximum privacy.
  You can adjust anytime.</p>

  <div class="setting">
    <label>
      <input type="checkbox" checked disabled aria-label="End-to-end encryption">
      <strong>End-to-end encryption</strong> (always on)
    </label>
  </div>

  <div class="setting">
    <label>
      <input type="checkbox" checked>
      <strong>Block third-party trackers</strong>
    </label>
    <p class="hint">Prevents advertisers from following you across sites</p>
  </div>

  <div class="setting">
    <label>
      <input type="checkbox" checked>
      <strong>Hide activity status</strong>
    </label>
    <p class="hint">Others won't see when you're online</p>
  </div>

  <div class="setting">
    <label>
      <input type="checkbox">
      <strong>Share usage analytics</strong>
    </label>
    <p class="hint">Help us improve (optional, off by default)</p>
  </div>
</div>`,
        explanation:
          'Privacy-protecting options are checked by default. The one option that serves the company (analytics) is unchecked. Most users will keep defaults, so this design protects them automatically.',
        principle:
          'Default to the option that most benefits the user, not the business',
        metrics: {
          before: '23% of users enabled privacy features when opt-in',
          after: '94% of users kept privacy features when opt-out',
          improvement: '309% increase in users with privacy protection',
        },
      },
      {
        title: 'Retirement Auto-Enrollment',
        description:
          'HR platform that auto-enrolls employees in retirement savings with smart defaults',
        code: `<div class="enrollment-card">
  <h3>You're enrolled in the 401(k) Plan</h3>
  <div class="status active">
    <span class="badge">Active</span>
    <p>Enrolled automatically on your start date</p>
  </div>

  <div class="defaults">
    <div class="default-setting">
      <span class="label">Contribution Rate</span>
      <span class="value">6% of salary</span>
      <span class="match">+ 3% employer match</span>
    </div>
    <div class="default-setting">
      <span class="label">Investment</span>
      <span class="value">Target Date Fund 2055</span>
      <span class="detail">Based on your age</span>
    </div>
  </div>

  <div class="actions">
    <button class="secondary">Adjust Settings</button>
    <button class="text-link">Opt Out</button>
  </div>

  <p class="note">These defaults are chosen to maximize your
  retirement savings. You can change them anytime.</p>
</div>`,
        explanation:
          'Auto-enrollment with smart defaults (6% contribution, age-appropriate fund) means most employees save for retirement without any effort. The opt-out option exists but is de-emphasized.',
        principle:
          'Auto-enroll in beneficial programs; let status quo bias work for the user',
        metrics: {
          before: '49% participation with opt-in enrollment',
          after: '86% participation with opt-out enrollment',
          improvement: '76% increase in retirement plan participation',
        },
      },
      {
        title: 'Gradual Redesign Transition',
        description:
          'Software that lets users preview and gradually adopt a new interface',
        code: `<div class="redesign-banner">
  <div class="preview-info">
    <h3>New interface available</h3>
    <p>We've redesigned your dashboard based on user feedback.
    Try it at your own pace.</p>
  </div>

  <div class="transition-options">
    <button class="primary">Preview New Design</button>
    <button class="secondary">Keep Current Design</button>
  </div>

  <div class="details">
    <p class="reassurance">You can switch back anytime during the
    30-day transition period.</p>
    <a href="/whats-changed">See what changed and why</a>
  </div>
</div>`,
        explanation:
          'Instead of forcing a redesign, users can preview the new interface and switch back. This respects status quo preference while encouraging adoption through low-risk exploration.',
        principle:
          'Reduce change resistance by making the transition reversible and gradual',
      },
    ],

    bad: [
      {
        title: 'Pre-Checked Marketing Consent',
        description:
          'Checkout form with newsletter and marketing options pre-checked',
        code: `<!-- DON'T DO THIS -->
<form class="checkout">
  <h3>Complete Your Order</h3>
  <!-- ... order fields ... -->

  <div class="marketing-options">
    <label>
      <input type="checkbox" checked>
      Sign me up for weekly promotional emails
    </label>
    <label>
      <input type="checkbox" checked>
      Share my data with partner companies for special offers
    </label>
    <label>
      <input type="checkbox" checked>
      Enable SMS marketing notifications
    </label>
  </div>

  <button type="submit">Place Order</button>
</form>`,
        explanation:
          'Pre-checking marketing options exploits status quo bias. Most users won\'t notice or bother to uncheck, resulting in unwanted emails and data sharing. This is a classic dark pattern.',
        principle:
          'Never pre-select options that serve the business at the user\'s expense',
      },
      {
        title: 'Impossible Cancellation Flow',
        description:
          'Subscription service that makes cancelling extremely difficult',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <h3>Are you sure you want to cancel?</h3>
  <p class="warning">You'll lose access to ALL your data!</p>

  <button class="primary large">Keep My Subscription</button>

  <a href="/cancel-step-2" class="tiny-link">Continue cancelling</a>
  <!-- Step 2: "Tell us why" survey (required) -->
  <!-- Step 3: "We have a special offer" upsell -->
  <!-- Step 4: "Talk to retention team" (phone only) -->
  <!-- Step 5: "Final confirmation" with confusing buttons -->
  <!-- Step 6: "Your cancellation will process in 30 days" -->
</div>`,
        explanation:
          'A multi-step cancellation gauntlet exploits status quo bias by making change so difficult that users give up. This creates resentment and is increasingly subject to regulation.',
        principle:
          'Changing or cancelling should be as easy as signing up',
      },
      {
        title: 'Sneaky Default Browser/Search',
        description:
          'Software installer that changes browser defaults without clear disclosure',
        code: `<!-- DON'T DO THIS -->
<div class="installer-step">
  <h3>Installation Options</h3>
  <label>
    <input type="checkbox" checked>
    Install recommended settings (Express)
  </label>
  <p class="fine-print" style="color: #ccc; font-size: 0.65em;">
    Express install will set OurBrowser as your default browser,
    change your homepage, and install the OurSearch toolbar.
  </p>
</div>`,
        explanation:
          'Bundling default-changing options under "recommended settings" exploits status quo bias twice: users accept the checked default, then status quo bias makes them keep the changed defaults.',
        principle:
          'Never hide consequential changes behind default selections',
      },
    ],

    realWorld: [
      {
        company: 'Microsoft',
        product: 'Windows Default Browser',
        description: 'Windows sets Edge as the default browser. Most users never change it, giving Edge significant market share purely through default status. The multi-step process to change defaults reinforces inertia.',
        effectiveness: 'very-effective',
        analysis: 'Status quo bias gives default software enormous advantage. Despite Chrome being more popular by preference, Edge retains users who never change defaults. The friction to switch (Settings > Apps > Default Apps > Browser) adds extra resistance.',
      },
      {
        company: 'US Government',
        product: 'Organ Donation Systems',
        description: 'Countries with opt-out organ donation (Austria, Spain) have 90%+ participation. Countries with opt-in (US, UK historically) have 15-30%. Same decision, dramatically different outcomes based solely on the default.',
        effectiveness: 'very-effective',
        analysis: 'The most powerful demonstration of status quo bias in public policy. Default framing of the same choice produces 3-6x difference in participation. Nudge theory directly applied.',
      },
      {
        company: 'Vanguard',
        product: '401(k) Auto-Enrollment',
        description: 'After the Pension Protection Act of 2006, companies using auto-enrollment for 401(k) saw participation jump from ~50% to ~90%. Default contribution rates also anchored savings behavior.',
        effectiveness: 'very-effective',
        analysis: 'Landmark example of beneficial status quo bias application. Auto-enrollment with escalating contribution defaults transformed retirement savings in the US, saving millions from inadequate retirement funds.',
      },
      {
        company: 'Google',
        product: 'Default Search Engine',
        description: 'Google pays Apple billions annually to remain the default search engine on Safari/iOS. The default position is worth more than any advertising because most users never change it.',
        effectiveness: 'very-effective',
        analysis: 'Google understands that status quo bias makes default position worth billions. Even users who know alternatives exist rarely switch because the current option works "well enough" and change requires effort.',
      },
    ],

    abTests: [
      {
        title: 'Opt-In vs Opt-Out for Feature Adoption',
        hypothesis:
          'Making a new feature opt-out instead of opt-in will increase adoption via status quo bias',
        controlVersion: {
          description:
            'New analytics dashboard feature presented as opt-in: "Try our new analytics dashboard" with Enable button',
          metrics: {
            conversionRate: '12%',
            timeOnPage: '0:45',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'New analytics dashboard enabled by default with banner: "We\'ve upgraded your dashboard. You can switch back anytime."',
          metrics: {
            conversionRate: '73%',
            timeOnPage: '3:20',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Opt-out adoption was 6x higher than opt-in. Users who experienced the new dashboard by default spent significantly more time exploring it. Only 8% reverted to the old version after trying the new one.',
          learnings: [
            'Status quo bias works powerfully for adoption when the new default is genuinely better',
            'Most users who tried the new version kept it, suggesting resistance was about effort, not preference',
            'Providing a clear "switch back" option reduced anxiety about the change',
            'The 8% revert rate was lower than the typical 15-20% seen with forced migrations',
          ],
        },
      },
      {
        title: 'Default Donation Amount: Pre-Selected vs Blank',
        hypothesis:
          'Pre-selecting a donation amount will increase average donations through status quo bias',
        controlVersion: {
          description:
            'Donation form with no pre-selected amount: four radio buttons ($25, $50, $100, $250) all unselected, plus custom field',
          metrics: {
            conversionRate: '34%',
            averageOrderValue: '$47',
          },
        },
        treatmentVersion: {
          description:
            'Donation form with $100 pre-selected: same four radio buttons but $100 is checked by default',
          metrics: {
            conversionRate: '31%',
            averageOrderValue: '$89',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Pre-selecting $100 nearly doubled average donation despite slightly lower conversion rate. Total revenue increased by 72%. Most donors accepted the default amount rather than changing it.',
          learnings: [
            'Default amounts powerfully anchor donations through status quo bias',
            'Slight conversion drop was more than offset by higher average amount',
            'The default should be aspirational but realistic for the audience',
            'Ethical consideration: default should be an amount donors would feel good about, not regret',
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
        name: 'Pre-Selected Options',
        description:
          'Radio buttons, checkboxes, or toggles that come with a value already selected',
        howToSpot:
          'Look for checked checkboxes, selected radio buttons, or active toggles in forms and settings',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Pre-Filled Form Values',
        description:
          'Input fields that already contain values the user did not enter',
        howToSpot:
          'Check text inputs, dropdowns, and sliders for default values that guide user decisions',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: '"Recommended" Labels',
        description:
          'Badges or labels marking certain options as recommended, suggested, or most popular',
        howToSpot:
          'Look for "Recommended", "Best Value", "Most Popular", or "Suggested" indicators near default selections',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Asymmetric Action Buttons',
        description:
          'Primary/prominent button for keeping current state, small/text link for changing it',
        howToSpot:
          'Compare the visual weight of "Keep" vs "Change" or "Stay" vs "Cancel" buttons',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Opt-Out Patterns',
        description:
          'Features or subscriptions enabled by default with option to disable rather than enable',
        howToSpot:
          'Look for active states on features the user never explicitly activated, especially in settings panels',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Default Selection Pattern',
        description:
          'One option is pre-selected in a set of choices, biasing users toward it',
        indicators: [
          'Pre-checked checkboxes in forms',
          'Default-selected plan or tier on pricing pages',
          'Pre-filled quantity or amount fields',
          'Default sort order or view mode',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Friction Asymmetry Pattern',
        description:
          'Signing up or opting in is easy; changing, cancelling, or opting out requires more steps',
        indicators: [
          'One-click signup but multi-step cancellation',
          'Easy enrollment but buried opt-out settings',
          'Simple default acceptance but complex customization',
          'Quick activation but slow deactivation processes',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Gradual Default Expansion Pattern',
        description:
          'New features or permissions added as defaults over time, expanding what users have opted into',
        indicators: [
          'New features auto-enabled after updates',
          'Expanded data collection after policy changes',
          'Additional notifications enabled by default',
          'Settings that reset to defaults after updates',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Change Deterrent Pattern',
        description:
          'Warnings, confirmation dialogs, or loss messaging when users attempt to change from current state',
        indicators: [
          '"Are you sure?" prompts before any change',
          'Warnings about what you\'ll lose by changing',
          'Multi-step confirmation for simple changes',
          'Countdown timers or cooling-off periods before changes take effect',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What options or settings come pre-selected for new users?',
      'Do defaults serve the user\'s interests or the business\'s?',
      'Is changing settings as easy as accepting defaults?',
      'Are there opt-out patterns where opt-in would be more ethical?',
      'Is cancellation or downgrading as simple as signup or upgrade?',
      'Are "recommended" defaults genuinely best for the user?',
      'Do form pre-fills guide users toward beneficial choices?',
      'Is there friction asymmetry between accepting and changing defaults?',
      'How are new features introduced — opt-in, opt-out, or forced?',
      'Are users informed clearly about what defaults they\'re accepting?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in status quo bias.

Analyze the provided design for status quo bias patterns. Identify:

1. **Default Selections**: Pre-selected options, pre-filled values, and default configurations
2. **Opt-In vs Opt-Out**: Whether features, subscriptions, or permissions use opt-in or opt-out framing
3. **Change Friction**: How easy or difficult it is to modify settings, cancel, or switch from defaults
4. **Migration Patterns**: How redesigns, updates, or new features are introduced to existing users
5. **Beneficial vs Exploitative Defaults**: Whether defaults serve user interests or business interests

For each pattern found:
- Identify whether the default genuinely benefits the user
- Assess friction asymmetry between accepting and changing defaults
- Determine if the pattern is ethical or exploitative
- Evaluate whether users are clearly informed about defaults
- Suggest improvements for user-serving default design

Consider:
- Do defaults protect user interests (privacy, security, finances)?
- Is cancellation or changing settings as easy as initial setup?
- Are opt-out patterns used ethically (beneficial programs) or exploitatively (marketing)?
- How does the design handle transitions and redesigns?
- Are vulnerable users protected by defaults (accessibility, privacy)?

Provide actionable recommendations for ethical, user-serving defaults.`,

    outputSchema: {
      type: 'object',
      properties: {
        defaultPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              defaultValue: { type: 'string' },
              servesUser: { type: 'boolean' },
              changeEase: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'servesUser',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            defaultQuality: { type: 'number' },
            frictionSymmetry: { type: 'number' },
            userBenefit: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'defaultQuality',
            'frictionSymmetry',
            'userBenefit',
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
        'defaultPatterns',
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
        title: 'Audit Existing Defaults',
        description:
          'Review all default settings, pre-selections, and opt-in/opt-out patterns in your product',
        example:
          'Catalog every checkbox, toggle, dropdown, and configuration that ships with a pre-set value',
        tips: [
          'Map each default to whether it serves the user or the business',
          'Identify friction asymmetries between accepting and changing defaults',
          'Check if defaults have been reviewed since they were first set',
        ],
      },
      {
        step: 2,
        title: 'Design User-Serving Defaults',
        description:
          'Set defaults based on what genuinely benefits the majority of users',
        example:
          'Default privacy settings to maximum protection; default notifications to essential-only',
        tips: [
          'Use analytics to determine what most users prefer and set that as default',
          'When in doubt, default to the option that protects the user',
          'Consider different defaults for different user segments if needs vary',
        ],
      },
      {
        step: 3,
        title: 'Apply Nudge Theory Ethically',
        description:
          'Use opt-out framing for options that genuinely benefit users; use opt-in for everything else',
        example:
          'Auto-enroll in security features (opt-out); leave marketing emails unchecked (opt-in)',
        tips: [
          'Apply the "would the user thank me for this default?" test',
          'Use Thaler & Sunstein\'s libertarian paternalism framework',
          'Ensure opt-out is always easy and prominently accessible',
        ],
      },
      {
        step: 4,
        title: 'Ensure Symmetric Friction',
        description:
          'Make changing settings exactly as easy as accepting defaults',
        example:
          'If signup is one click, cancellation should be one click. No multi-step retention gauntlets.',
        tips: [
          'Count clicks/steps to change vs accept — they should be equal',
          'Place change/cancel options at the same prominence level as signup/accept',
          'Test the change flow as rigorously as the setup flow',
        ],
      },
      {
        step: 5,
        title: 'Plan Transitions Carefully',
        description:
          'When redesigning or migrating, respect users\' attachment to the current state',
        example:
          'Offer a 30-day preview period where users can try the new design and switch back freely',
        tips: [
          'Communicate changes clearly before they happen',
          'Provide side-by-side comparison of old vs new',
          'Allow gradual transition rather than forced switchover',
          'Document what changed and why to reduce uncertainty',
        ],
      },
    ],

    dos: [
      'Set defaults to the option that most benefits users',
      'Use opt-out for genuinely beneficial features (security, savings, accessibility)',
      'Make changing settings as easy as accepting defaults',
      'Provide clear information about what defaults users are accepting',
      'Offer gradual transitions for redesigns and migrations',
      'Apply the Thaler & Sunstein nudge framework for ethical defaults',
      'Test defaults with real user data to ensure they serve user needs',
      'Allow users to preview changes before committing to them',
    ],

    donts: [
      'Don\'t pre-check marketing consent, data sharing, or upsell options',
      'Don\'t make cancellation harder than signup',
      'Don\'t hide settings or make them difficult to find and change',
      'Don\'t force sudden redesigns without transition periods',
      'Don\'t reset user preferences to defaults after updates',
      'Don\'t use confirmation dialogs to deter users from changing settings',
      'Don\'t exploit inertia to keep users in inferior or unwanted states',
      'Don\'t bundle consequential changes under "recommended settings"',
    ],

    bestPractices: [
      {
        title: 'The Thank-You Test',
        description:
          'For every default, ask: "Would the user thank me for setting this?" If no, don\'t default it.',
        rationale:
          'Ethical defaults serve user interests; exploitative defaults serve business interests at user expense',
        example:
          'User would thank you for defaulting to secure settings; user would NOT thank you for pre-checking newsletter signup',
      },
      {
        title: 'Friction Symmetry Audit',
        description:
          'Ensure every action has equal-effort reverse action',
        rationale:
          'Asymmetric friction (easy in, hard out) is the hallmark of dark patterns and erodes trust',
        example:
          'If "Enable notifications" is a single toggle, "Disable notifications" should be the same toggle, not a buried settings page',
      },
      {
        title: 'Progressive Disclosure for Changes',
        description:
          'Introduce changes gradually, letting users acclimate at their own pace',
        rationale:
          'Gradual change triggers less status quo resistance than abrupt change',
        example:
          'New feature: Week 1 = banner announcing it; Week 2 = guided tour; Week 3 = enabled with easy revert; Week 4+ = fully integrated',
      },
      {
        title: 'Default Personalization',
        description:
          'Use data to set smarter defaults tailored to user segments',
        rationale:
          'One-size-fits-all defaults serve some users poorly; personalized defaults serve more users well',
        example:
          'Default language based on browser locale; default plan based on team size; default view based on role',
      },
      {
        title: 'Transparent Defaults Communication',
        description:
          'Clearly tell users what defaults are set and why',
        rationale:
          'Transparency builds trust and helps users make informed decisions about whether to keep or change defaults',
        example:
          '"We\'ve set your privacy to maximum protection. Here\'s what that means and how to adjust it."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Default selections must be programmatically determinable',
        implementation:
          'Use proper checked/selected attributes on form controls. Screen readers must announce default state so users know what is pre-selected.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Changing defaults should not cause unexpected context changes',
        implementation:
          'Unchecking a default option should not trigger page navigation, form submission, or other unexpected behavior without warning.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Default options must be clearly labeled',
        implementation:
          'Use clear labels that describe what the default does, not just the feature name. "Block trackers (recommended, on by default)" is better than just "Trackers".',
      },
      {
        wcagLevel: 'AAA',
        criterion: '3.3.5',
        guideline:
          'Help - Provide context for why defaults are set as they are',
        implementation:
          'Add help text or tooltips explaining default choices, so users with cognitive disabilities can make informed decisions about changing them.',
      },
    ],

    ethics: [
      {
        concern: 'Dark Pattern Defaults',
        severity: 'critical',
        explanation:
          'Pre-selecting options that benefit the business at the user\'s expense (marketing consent, data sharing, add-ons)',
        mitigation:
          'Only pre-select options that genuinely benefit users. Leave self-serving options unchecked. Apply the "thank-you test".',
      },
      {
        concern: 'Roach Motel Pattern',
        severity: 'critical',
        explanation:
          'Making it easy to get in but deliberately hard to get out (subscribe easily, cancel with difficulty)',
        mitigation:
          'Ensure friction symmetry: cancellation should require the same number of steps as signup. FTC and EU regulators increasingly enforce this.',
      },
      {
        concern: 'Forced Continuity',
        severity: 'high',
        explanation:
          'Free trials that auto-convert to paid subscriptions, relying on users forgetting to cancel',
        mitigation:
          'Send clear reminders before trial ends. Make cancellation prominent and simple. Don\'t require calling to cancel.',
      },
      {
        concern: 'Privacy Erosion Through Defaults',
        severity: 'high',
        explanation:
          'Defaulting to maximum data collection and sharing, knowing most users won\'t change settings',
        mitigation:
          'Default to minimum data collection. Follow privacy-by-default principles (GDPR Article 25). Make privacy settings easy to find and understand.',
      },
      {
        concern: 'Manipulative Retention',
        severity: 'medium',
        explanation:
          'Using guilt, fear, or loss messaging when users try to change from the current state',
        mitigation:
          'Present change options neutrally. Avoid "Are you sure you want to lose everything?" messaging. Respect user autonomy.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Status Quo Bias in Decision Making',
        author: 'Samuelson, W., & Zeckhauser, R.',
        year: 1988,
        doi: '10.1007/BF00055564',
        description:
          'The foundational paper identifying and defining status quo bias through controlled experiments',
        type: 'foundational',
      },
      {
        title: 'Do Defaults Save Lives?',
        author: 'Johnson, E. J., & Goldstein, D.',
        year: 2003,
        doi: '10.1126/science.1091721',
        description:
          'Landmark study showing how default organ donation policies produce dramatically different participation rates',
        type: 'foundational',
      },
      {
        title: 'Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving',
        author: 'Thaler, R. H., & Benartzi, S.',
        year: 2004,
        doi: '10.1086/380085',
        description:
          'Demonstrates how default enrollment and escalation rates dramatically increase retirement savings',
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
          'The definitive guide to choice architecture and ethical defaults, built on status quo bias research',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers loss aversion and the psychological foundations underlying status quo bias',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'First-person account of developing nudge theory and applying defaults research to public policy',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Power of Defaults',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/the-power-of-defaults/',
        description:
          'Practical UX guide to designing effective defaults in digital interfaces',
        type: 'practical',
      },
      {
        title: 'Dark Patterns: Deception vs. Honesty in UI Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/dark-patterns/',
        description:
          'How status quo bias is exploited in dark patterns and how to design ethically instead',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How to Make Better Choices in Life and Work',
        author: 'Richard Thaler',
        url: 'https://www.youtube.com/watch?v=xoA8N6nJMRs',
        description:
          'Nobel laureate explains choice architecture and the power of defaults',
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
