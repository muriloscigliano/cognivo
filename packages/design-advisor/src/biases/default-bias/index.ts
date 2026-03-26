/**
 * DEFAULT BIAS
 *
 * Cognitive inertia around defaults — the tendency to leave settings,
 * configurations, and options in their initial state due to effort
 * avoidance and status quo preference.
 *
 * Distinct from DEFAULT EFFECT, which focuses on the power of pre-set
 * options to influence choice. Default Bias is about the user's
 * reluctance to change anything from the factory/initial state.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const defaultBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'default-bias',
    name: 'Default Bias',
    aliases: ['Default Inertia', 'Settings Inertia', 'Configuration Inertia'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'defaults',
      'inertia',
      'status-quo',
      'settings',
      'configuration',
      'effort-avoidance',
      'factory-defaults',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'People tend to leave settings and configurations in their default state, even when changing them would serve their interests better.',

    detailed: `Default bias describes the cognitive inertia that keeps people from modifying default settings, configurations, and initial states. Unlike the default effect (which concerns how pre-set options influence choice), default bias centers on the psychological resistance to change itself — the effort avoidance and status quo preference that prevent users from customizing their experience.

This resistance arises from multiple sources: the cognitive effort required to evaluate alternatives, uncertainty about consequences of change, loss aversion around the current state, and implicit trust that whoever set the defaults chose wisely. The result is that the vast majority of users never modify factory settings, even when those settings poorly match their needs or actively work against their interests.

In product design, default bias has profound implications. The initial configuration of privacy settings, notification preferences, accessibility options, and feature toggles effectively determines the experience for most users. Designers bear responsibility for choosing defaults that serve users well, because most users will never change them.`,

    psychologyBasis: {
      discoveredBy: 'William Samuelson and Richard Zeckhauser',
      year: 1988,
      theory: 'Status Quo Bias and Decision Inertia',
      mechanism: `The brain resists changing defaults through several reinforcing mechanisms:

1. **Effort Avoidance**: Evaluating alternatives requires cognitive work — comparing options, predicting outcomes, and accepting responsibility for the choice. Sticking with defaults requires zero effort.
2. **Status Quo Preference**: The current state feels safer because it is known. Change introduces uncertainty and potential regret.
3. **Loss Aversion**: Changing a default risks losing whatever benefit the current state provides. Losses loom larger than equivalent gains.
4. **Implied Endorsement**: Users assume defaults were chosen deliberately by experts. "If this is the default, it must be the right choice."
5. **Choice Overload**: When configuration options are numerous or complex, the cognitive cost of evaluating each one drives users to accept whatever was pre-set.

These mechanisms compound: the more settings available, the less likely any individual setting is to be changed.`,
    },

    realWorldExample: `Samuelson and Zeckhauser (1988) documented status quo bias across multiple domains, finding that when a new option was added to a set of choices, people disproportionately chose it only when it was designated as the default. In one study of Harvard benefit plans, newly hired employees overwhelmingly chose whichever plan was presented as the default, while longer-tenured employees rarely switched from their original enrollment — even when objectively better options became available.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Default bias determines the lived experience for the majority of users, because most will never change their settings. This gives designers enormous power — and responsibility — in areas like:

- Privacy configuration: whatever ships as default is what most users live with
- Notification preferences: default-on notifications will stay on for most users
- Accessibility settings: users who need accommodations may not know defaults exist to be changed
- Security posture: default password policies and 2FA settings define real-world security
- Feature discovery: features hidden behind non-default toggles may never be found`,

    whenToUse: [
      {
        title: 'Privacy-Protective Defaults',
        scenario:
          'When configuring initial privacy and data-sharing settings for new accounts',
        example:
          'Set all data-sharing and tracking options to off by default, requiring explicit opt-in for each',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Safe Notification Defaults',
        scenario: 'When establishing initial notification preferences',
        example:
          'Default to essential notifications only (security alerts, billing), with marketing and social notifications off until the user enables them',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Accessibility-Forward Defaults',
        scenario: 'When setting initial display, motion, and interaction preferences',
        example:
          'Default to reduced motion, sufficient contrast, and readable font sizes; let users opt into more dynamic experiences',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Security-First Defaults',
        scenario: 'When establishing account security configuration',
        example:
          'Default to strongest available security (session timeout, password complexity, login notifications enabled)',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Locale and Language Defaults',
        scenario: 'When initializing language, region, and format preferences',
        example:
          'Auto-detect locale from browser/OS settings rather than defaulting to en-US for all users',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Forcing Engagement Through Defaults',
        reason:
          'Defaulting all notifications and emails to on exploits inertia for engagement metrics',
        consequence:
          'Users feel spammed, trust erodes, and unsubscribe rates spike when users finally discover settings',
        alternative:
          'Default to minimal notifications and let users opt in to what they genuinely want',
      },
      {
        title: 'Privacy-Hostile Defaults',
        reason:
          'Defaulting data sharing, tracking, and public profiles to on serves the business, not the user',
        consequence:
          'Regulatory risk (GDPR, CCPA), user backlash, and reputational damage when defaults are exposed',
        alternative:
          'Default to private and let users choose to share; comply with privacy-by-default regulations',
      },
      {
        title: 'Hiding Reset or Restore Options',
        reason:
          'Making it difficult to return to factory defaults traps users in configurations they did not intend',
        consequence:
          'Users who accidentally change settings cannot recover, creating frustration and support burden',
        alternative:
          'Provide clear "Reset to defaults" options at both individual setting and global levels',
      },
      {
        title: 'One-Size-Fits-All Defaults',
        reason:
          'Using identical defaults for all user segments ignores meaningful differences in needs',
        consequence:
          'Power users get too-simple defaults; novice users get overwhelmed by advanced defaults',
        alternative:
          'Use onboarding questions or user role detection to set contextually appropriate defaults',
      },
    ],

    commonMistakes: [
      {
        title: 'Assuming Users Will Customize',
        description:
          'Designing settings with the expectation that users will explore and configure them',
        why: 'Research consistently shows that fewer than 5% of users ever modify default settings',
        fix: 'Treat defaults as the permanent experience for 95% of users and design accordingly',
      },
      {
        title: 'Burying Settings Too Deep',
        description:
          'Placing important configuration behind multiple navigation layers',
        why: 'Every additional click reduces the probability of a user reaching and changing a setting',
        fix: 'Surface critical settings during onboarding and make them accessible from context-relevant locations',
      },
      {
        title: 'Not Explaining Consequences',
        description:
          'Presenting settings as raw toggles without context on what they do',
        why: 'Users will not change settings when they cannot predict the outcome of the change',
        fix: 'Provide clear descriptions, previews, or before/after comparisons for each setting',
      },
      {
        title: 'Defaulting to Maximum Engagement',
        description:
          'Setting all notifications, emails, and sharing to on by default to boost metrics',
        why: 'Short-term engagement gains are offset by long-term trust erosion and churn',
        fix: 'Default to user-respectful settings; earn engagement through value, not inertia',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines how discoverable settings and configuration options are',
        examples: [
          'Settings pages buried in hamburger menus are rarely visited',
          'Inline configuration options near relevant features are more likely to be noticed',
          'Onboarding wizards can surface key defaults at the right moment',
          'Dashboard layouts that expose current settings state encourage review',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography plays a minor role in default bias, mainly through settings legibility',
        examples: [
          'Clear labels help users understand what a setting controls',
          'Description text beneath toggles explains consequences',
          'Distinct typography for current vs alternative values aids comprehension',
          'Readable settings names reduce cognitive effort of evaluation',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals the state and urgency of default settings',
        examples: [
          'Red or amber indicators on insecure defaults draw attention to needed changes',
          'Green checkmarks on well-configured settings provide reassurance',
          'Neutral colors on default states do not prompt action (by design or negligence)',
          'Highlighted "recommended" badges guide users toward better configurations',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines how much effort is required to change defaults',
        examples: [
          'Single-toggle settings are changed more often than multi-step configuration',
          'Preview of what will change reduces uncertainty about modifying a default',
          'Undo capability after changing a setting lowers the risk of experimentation',
          '"Reset to default" buttons reduce anxiety about making changes',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content determines whether users understand defaults well enough to evaluate them',
        examples: [
          'Contextual explanations of what each default setting does increase modification rates',
          '"Why this is the default" explanations build trust or prompt informed changes',
          'Before/after previews make consequences of change concrete',
          'Recommendations like "Most users change this" leverage social proof against inertia',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Default settings disproportionately affect users with accessibility needs',
        examples: [
          'Users who need larger text may not know a font size setting exists',
          'Reduced motion preferences should respect OS-level defaults (prefers-reduced-motion)',
          'Screen reader users may never discover visually obvious settings toggles',
          'Color contrast defaults must meet WCAG requirements without requiring user action',
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
        title: 'Privacy-First Default Configuration',
        description:
          'Account creation flow that defaults all privacy settings to maximum protection',
        code: `<section class="privacy-setup">
  <h3>Your Privacy Settings</h3>
  <p class="intro">We've set everything to maximum privacy.
  You can open up sharing anytime.</p>

  <div class="setting">
    <label>
      <input type="checkbox" checked disabled aria-label="Profile visibility">
      <span>Profile visible only to you</span>
    </label>
    <button class="change-link">Change</button>
  </div>

  <div class="setting">
    <label>
      <input type="checkbox" checked>
      <span>Block search engine indexing</span>
    </label>
  </div>

  <div class="setting">
    <label>
      <input type="checkbox" aria-checked="false">
      <span>Share usage data with third parties</span>
    </label>
    <span class="default-badge">Off by default</span>
  </div>

  <p class="reassurance">You can change these anytime in Settings > Privacy</p>
</section>`,
        explanation:
          'Because most users will never visit privacy settings, defaulting to maximum protection ensures their data is safe by default. The "Off by default" badge signals intentional design.',
        principle:
          'Default to the option that protects users, not the one that benefits the business',
        metrics: {
          before: '3% of users manually enabled privacy protections',
          after: '97% of users retained privacy-protective defaults',
          improvement: 'Privacy protection coverage increased from 3% to 97%',
        },
      },
      {
        title: 'Smart Notification Defaults with Easy Override',
        description:
          'Notification preferences that default to essential-only with clear upgrade path',
        code: `<section class="notification-preferences">
  <h3>Notification Preferences</h3>
  <p>We'll only notify you about things that matter.
  You can always add more.</p>

  <div class="category essential">
    <h4>Essential (always on)</h4>
    <ul>
      <li>Security alerts <span class="badge">Always on</span></li>
      <li>Billing notifications <span class="badge">Always on</span></li>
    </ul>
  </div>

  <div class="category optional">
    <h4>Optional</h4>
    <label class="notification-toggle">
      <input type="checkbox">
      <span>Weekly activity digest</span>
      <small>Summary of your team's work each Monday</small>
    </label>
    <label class="notification-toggle">
      <input type="checkbox">
      <span>Product updates</span>
      <small>New features and improvements (about 1/month)</small>
    </label>
    <label class="notification-toggle">
      <input type="checkbox">
      <span>Community highlights</span>
      <small>Top posts and discussions from the community</small>
    </label>
  </div>
</section>`,
        explanation:
          'Essential notifications cannot be disabled. Optional notifications default to off, respecting user attention. Each option explains frequency and content so users can make informed choices.',
        principle:
          'Respect attention by defaulting to minimal notifications; let users opt in deliberately',
      },
      {
        title: 'Onboarding That Surfaces Key Defaults',
        description:
          'First-run experience that presents the most impactful defaults for review',
        code: `<div class="onboarding-step defaults-review">
  <h2>Let's get your workspace set up</h2>
  <p>We picked defaults that work for most teams.
  Review the ones that matter most:</p>

  <div class="default-card">
    <h4>Language & Region</h4>
    <p class="current">English (US) · Pacific Time · MM/DD/YYYY</p>
    <p class="detected">Detected from your browser</p>
    <button class="secondary">Change</button>
  </div>

  <div class="default-card">
    <h4>Who can see your work</h4>
    <p class="current">Team members only</p>
    <p class="explanation">People outside your team cannot view or search your content</p>
    <button class="secondary">Change</button>
  </div>

  <div class="default-card">
    <h4>Theme & Display</h4>
    <p class="current">System preference (currently dark mode)</p>
    <button class="secondary">Change</button>
  </div>

  <div class="actions">
    <button class="primary">Looks good, continue</button>
    <button class="text">I'll review settings later</button>
  </div>
</div>`,
        explanation:
          'Rather than hoping users will find settings later, this onboarding step surfaces the three most impactful defaults at the moment of highest engagement. Users see what was auto-detected and can adjust before inertia sets in.',
        principle:
          'Present key defaults during onboarding when motivation and attention are highest',
      },
    ],

    bad: [
      {
        title: 'All Notifications On by Default',
        description:
          'Account creation that enables every notification channel and type',
        code: `<!-- DON'T DO THIS -->
<div class="notifications-default">
  <p style="font-size: 0.7em; color: #999;">
    By creating an account, you agree to receive:
  </p>
  <ul style="font-size: 0.65em; color: #aaa;">
    <li>Email notifications (all activity)</li>
    <li>Push notifications (all activity)</li>
    <li>SMS notifications (all activity)</li>
    <li>Weekly newsletter</li>
    <li>Partner offers</li>
    <li>Product announcements</li>
  </ul>
  <p style="font-size: 0.6em; color: #bbb;">
    Manage preferences in Settings > Notifications
  </p>
</div>`,
        explanation:
          'Defaulting every notification channel to on and burying the disclosure in tiny, low-contrast text exploits default bias. Most users will never find the settings page to turn these off.',
        principle:
          'Never exploit default inertia to spam users with unwanted communications',
      },
      {
        title: 'Public Profile by Default with Buried Privacy Settings',
        description:
          'Social platform that makes profiles fully public and hides privacy controls',
        code: `<!-- DON'T DO THIS -->
<div class="profile-setup">
  <h2>Welcome! Your profile is live!</h2>
  <p>Your profile, posts, and activity are visible to everyone on the internet.</p>
  <small>
    To change visibility:
    Settings > Account > Privacy > Profile Visibility > Public/Private
  </small>
</div>`,
        explanation:
          'Making profiles public by default and requiring five navigation levels to find the privacy toggle ensures almost no users will ever make their profile private. This exploits default bias for engagement at the cost of user privacy.',
        principle:
          'Do not use navigation depth to exploit default inertia against user interests',
      },
      {
        title: 'No Way to Reset to Factory Defaults',
        description:
          'Settings panel with many options but no reset capability',
        code: `<!-- DON'T DO THIS -->
<div class="settings-panel">
  <h3>Advanced Settings</h3>
  <!-- 47 individual toggles and dropdowns -->
  <div class="setting-row">
    <label>Cache refresh interval</label>
    <select>
      <option>1 min</option>
      <option>5 min</option>
      <option selected>15 min</option>
      <option>30 min</option>
      <option>1 hour</option>
    </select>
  </div>
  <!-- ...46 more settings... -->
  <!-- No "Reset to defaults" button anywhere -->
</div>`,
        explanation:
          'Without a reset option, users who experiment with settings and create problems have no safe way to return to a known-good state. This increases anxiety about changing any defaults, reinforcing inertia even when changes would be beneficial.',
        principle:
          'Always provide a clear path back to factory defaults to reduce fear of experimentation',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Chrome Browser',
        description: 'Chrome ships with Google as the default search engine, safe browsing on, and cookies allowed. Despite settings being easily accessible, the vast majority of users never change the default search engine — driving billions in search revenue through default inertia.',
        effectiveness: 'very-effective',
        analysis: 'Google pays billions annually (estimated $26B+ to Apple alone in 2023) to be the default search engine on various platforms, demonstrating the immense commercial value of default position. Users can change the setting in seconds but almost never do.',
      },
      {
        company: 'Apple',
        product: 'iPhone Factory Defaults',
        description: 'iOS defaults to sharing analytics with Apple, location services on per-app prompt, and screen time off. After App Tracking Transparency (ATT), Apple defaulted to blocking cross-app tracking — a privacy-protective default that decimated the advertising industry\'s tracking capabilities.',
        effectiveness: 'very-effective',
        analysis: 'ATT showed the power of default bias in action: when tracking required opt-in rather than opt-out, only ~25% of users allowed it. The default determined behavior for 75% of users who never actively chose.',
      },
      {
        company: 'Facebook (Meta)',
        product: 'Privacy Defaults',
        description: 'Facebook historically defaulted new accounts to public sharing, broad data collection, and facial recognition enabled. Users rarely changed these defaults, leading to widespread privacy exposure and eventually regulatory action (GDPR fines, FTC settlements).',
        effectiveness: 'effective',
        analysis: 'A cautionary example of exploiting default bias against user interests. Short-term data collection gains led to long-term regulatory, reputational, and trust damage. Demonstrates why privacy-protective defaults are both ethically right and strategically sound.',
      },
      {
        company: 'Microsoft',
        product: 'Windows Default Apps',
        description: 'Windows defaults to Edge as browser, Bing as search, and OneDrive for file storage. Despite offering settings to change these, Microsoft adds friction to the process — requiring multiple confirmation steps to switch defaults, which exploits default inertia further.',
        effectiveness: 'effective',
        analysis: 'Adding friction to default-changing (beyond mere inertia) is a dark pattern that compounds default bias. While effective at retaining defaults, it generates user frustration and regulatory scrutiny.',
      },
    ],

    abTests: [
      {
        title: 'Privacy Defaults: Opt-In vs Opt-Out Data Sharing',
        hypothesis:
          'Changing data sharing from opt-out to opt-in will dramatically reduce sharing rates due to default inertia',
        controlVersion: {
          description:
            'Data sharing enabled by default with opt-out checkbox at bottom of registration form',
          metrics: {
            conversionRate: '92%',
            optOutRate: '4%',
            supportTickets: '230/month about unwanted data sharing',
          },
        },
        treatmentVersion: {
          description:
            'Data sharing disabled by default with opt-in checkbox and clear explanation of benefits',
          metrics: {
            conversionRate: '91%',
            optInRate: '12%',
            supportTickets: '18/month about data sharing',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Switching to opt-in reduced data sharing from 96% to 12%, confirming that the vast majority of users simply accepted whatever the default was. Registration conversion barely changed (1% drop), but support tickets about data sharing dropped 92%.',
          learnings: [
            'Default position determines behavior for ~85-90% of users',
            'Opt-in vs opt-out framing is the single biggest lever for participation rates',
            'Users who actively opt in are more engaged and less likely to complain',
            'Minimal impact on registration conversion shows users do not care about the setting — they just accept the default',
          ],
        },
      },
      {
        title: 'Notification Defaults: Everything On vs Essential Only',
        hypothesis:
          'Defaulting to essential-only notifications will reduce unsubscribe rates and improve long-term retention',
        controlVersion: {
          description:
            'All notification types enabled by default (email, push, SMS, marketing, product updates)',
          metrics: {
            dayOneUnsubscribeRate: '0.3%',
            day30UnsubscribeRate: '34%',
            day90Retention: '41%',
          },
        },
        treatmentVersion: {
          description:
            'Only security and billing notifications enabled by default; optional categories presented with clear descriptions',
          metrics: {
            dayOneUnsubscribeRate: '0.1%',
            day30UnsubscribeRate: '8%',
            day90Retention: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Essential-only defaults reduced 30-day unsubscribe rates by 76% and improved 90-day retention by 41%. Users who chose to enable optional notifications had 3x higher engagement with that content than users who simply had it on by default.',
          learnings: [
            'Default-on notifications create resentment that compounds over time',
            'Users who opt in to notifications are far more engaged with them',
            'Respecting attention defaults builds trust and improves retention',
            'The short-term engagement loss from fewer defaults is more than offset by retention gains',
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
        name: 'Pre-Toggled Settings',
        description:
          'Toggle switches, checkboxes, or radio buttons that come pre-selected to a specific state',
        howToSpot:
          'Look for toggles in the "on" position, pre-checked checkboxes, or pre-selected radio buttons in settings panels and forms',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Buried Settings Navigation',
        description:
          'Configuration options hidden behind multiple levels of navigation',
        howToSpot:
          'Count the number of clicks required to reach privacy, notification, or accessibility settings from the main interface',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Reset Options',
        description:
          'Settings panels that lack "Reset to defaults" or "Restore factory settings" buttons',
        howToSpot:
          'Check for restore/reset controls at both individual setting and section levels',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Unexplained Defaults',
        description:
          'Settings that show a current value but provide no explanation of what it does or why it was chosen',
        howToSpot:
          'Look for bare toggles or dropdowns without descriptions, tooltips, or contextual help',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Friction on Default Changes',
        description:
          'Extra confirmation dialogs, warnings, or multi-step flows when a user tries to change a default',
        howToSpot:
          'Try changing a default setting and note any additional friction beyond the toggle itself (confirmation modals, "are you sure" prompts, required account verification)',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Privacy-Hostile Default Pattern',
        description: 'Privacy and data-sharing settings defaulted to maximum exposure',
        indicators: [
          'Data sharing enabled by default',
          'Profile set to public by default',
          'Location tracking on by default',
          'Cross-app tracking allowed by default',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Notification Overload Pattern',
        description: 'All notification channels and types enabled from the start',
        indicators: [
          'Email, push, and SMS all enabled by default',
          'Marketing and promotional notifications on by default',
          'Social activity notifications on by default',
          'No distinction between essential and optional notifications',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Configuration Burial Pattern',
        description: 'Important settings hidden deep in navigation hierarchies',
        indicators: [
          'More than 3 clicks to reach privacy settings',
          'Settings organized by technical categories rather than user goals',
          'No contextual settings access from relevant features',
          'No onboarding step for key configuration',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Reset Avoidance Pattern',
        description: 'No clear mechanism for returning to factory defaults',
        indicators: [
          'No "Reset to defaults" button on settings pages',
          'No per-section restore option',
          'No indication of which settings differ from defaults',
          'No settings export/import for backup before changes',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What are the default states for all privacy-related settings?',
      'How many clicks does it take to reach notification preferences from the main interface?',
      'Are there "Reset to defaults" options for individual settings and for all settings?',
      'Do settings include descriptions of what each default does and why?',
      'Are defaults different for different user segments or roles?',
      'Does the onboarding flow surface the most impactful defaults for review?',
      'Are any defaults exploiting inertia against user interests?',
      'Does the system respect OS-level defaults (dark mode, reduced motion, locale)?',
      'Is there added friction when users try to change certain defaults?',
      'What percentage of users have modified each default setting?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in default bias and cognitive inertia around default settings.

Analyze the provided design for default bias patterns. Identify:

1. **Default States**: What settings, configurations, and options are pre-set and to what values
2. **Discoverability**: How easy or hard it is for users to find and modify default settings
3. **Privacy Defaults**: Whether privacy and data-sharing defaults serve users or the business
4. **Notification Defaults**: Whether notification settings exploit inertia for engagement
5. **Reset Capability**: Whether users can easily return to factory defaults
6. **Onboarding Exposure**: Whether key defaults are surfaced during setup

For each default pattern found:
- Identify who the default serves (user vs business)
- Assess whether users are likely to discover and change it
- Determine if the default is the most protective/beneficial option for users
- Evaluate whether changing the default has unnecessary friction
- Suggest improvements for user-serving defaults

Consider:
- Would most users choose this setting if they were actively asked?
- Does the default respect the user's privacy, attention, and autonomy?
- Is there a "Reset to defaults" path available?
- Are OS-level preferences (dark mode, reduced motion, locale) being respected?
- Are accessibility-related defaults inclusive without requiring user action?

Provide actionable recommendations for ethical, user-serving default design.`,

    outputSchema: {
      type: 'object',
      properties: {
        defaultPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              setting: { type: 'string' },
              defaultValue: { type: 'string' },
              servesUser: { type: 'boolean' },
              discoverability: { type: 'string' },
              changeEffort: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'setting',
              'defaultValue',
              'servesUser',
              'discoverability',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            privacyScore: { type: 'number' },
            discoverabilityScore: { type: 'number' },
            userAlignmentScore: { type: 'number' },
            resetCapabilityScore: { type: 'number' },
          },
          required: [
            'privacyScore',
            'discoverabilityScore',
            'userAlignmentScore',
            'resetCapabilityScore',
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
        title: 'Audit Current Defaults',
        description:
          'Inventory every setting and configuration option in your product and document its current default value',
        example:
          'Create a spreadsheet: Setting Name | Default Value | Who It Serves (User/Business/Both) | % Users Who Changed It',
        tips: [
          'Include privacy, notification, accessibility, and display settings',
          'Check analytics to see which defaults are actually being changed',
          'Identify defaults that serve the business at the expense of users',
        ],
      },
      {
        step: 2,
        title: 'Apply the Active-Choice Test',
        description:
          'For each default, ask: "If we forced every user to actively choose, what would most people pick?"',
        example:
          'If only 12% of users would opt in to marketing emails when actively asked, the default should be off',
        tips: [
          'Run surveys or A/B tests to determine genuine user preference',
          'When in doubt, default to the option that protects user privacy, attention, and security',
          'Consider regulatory requirements (GDPR requires opt-in for data processing)',
        ],
      },
      {
        step: 3,
        title: 'Design for Discoverability',
        description:
          'Make important defaults visible and easy to change, especially during onboarding',
        example:
          'Include a "Review your settings" step in onboarding that surfaces the 3-5 most impactful defaults',
        tips: [
          'Keep critical settings within 2 clicks of the main interface',
          'Add contextual settings access near relevant features',
          'Use smart defaults based on detected context (locale, device, OS preferences)',
        ],
      },
      {
        step: 4,
        title: 'Provide Reset Capability',
        description:
          'Give users a clear way to return to factory defaults at individual and global levels',
        example:
          'Add "Reset to default" next to each setting and "Reset all settings" at the top of the settings page',
        tips: [
          'Show which settings differ from defaults (visual indicator)',
          'Confirm before resetting all settings',
          'Allow settings export/import for backup',
        ],
      },
      {
        step: 5,
        title: 'Respect System Defaults',
        description:
          'Honor OS-level and browser-level preferences as initial defaults',
        example:
          'If the OS is set to dark mode and reduced motion, initialize your app to match',
        tips: [
          'Use prefers-color-scheme for theme defaults',
          'Use prefers-reduced-motion to disable animations by default',
          'Use navigator.language for locale defaults',
          'Allow users to override system defaults if they choose',
        ],
      },
    ],

    dos: [
      'Default to maximum privacy and minimum notifications',
      'Surface key defaults during onboarding when engagement is highest',
      'Provide clear "Reset to defaults" at individual and global levels',
      'Explain what each default setting does and why it was chosen',
      'Respect OS-level preferences (dark mode, reduced motion, locale)',
      'Track what percentage of users change each default setting',
      'Use contextual auto-detection (locale, timezone) for sensible initial values',
      'Treat defaults as the permanent experience for 95% of users',
    ],

    donts: [
      'Don\'t default all notifications and marketing emails to on',
      'Don\'t bury privacy settings behind more than 2-3 clicks',
      'Don\'t add friction when users try to change defaults (confirmation dialogs, re-authentication)',
      'Don\'t assume users will explore and customize settings',
      'Don\'t use identical defaults for all user segments without consideration',
      'Don\'t remove the ability to reset to factory defaults',
      'Don\'t default data sharing, tracking, or public profiles to on',
      'Don\'t treat default inertia as implicit consent for data processing',
    ],

    bestPractices: [
      {
        title: 'Privacy by Default',
        description:
          'Default all privacy and data-sharing settings to the most protective option',
        rationale:
          'Users who want to share can opt in; users who do not want to share rarely find opt-out settings',
        example:
          'Data sharing off, profile private, search indexing blocked, analytics opt-in only',
      },
      {
        title: 'Progressive Disclosure of Settings',
        description:
          'Show the most impactful settings first, with advanced options available on demand',
        rationale:
          'Reduces cognitive overload while ensuring critical defaults are reviewed',
        example:
          'Settings page with "Common" tab (5 key settings) and "Advanced" tab (full configuration)',
      },
      {
        title: 'Context-Aware Defaults',
        description:
          'Use available signals (device, locale, OS preferences, user role) to set intelligent initial defaults',
        rationale:
          'Smart defaults reduce the need for manual configuration and serve users better',
        example:
          'Detect timezone from browser, respect OS dark mode, and set language from Accept-Language header',
      },
      {
        title: 'Default Deviation Indicators',
        description:
          'Visually indicate which settings have been changed from their defaults',
        rationale:
          'Helps users understand their configuration state and provides a path back to defaults',
        example:
          'Show a small dot or "Modified" label next to changed settings, with per-setting "Reset" link',
      },
      {
        title: 'Periodic Default Review Prompts',
        description:
          'Prompt users to review key defaults at meaningful intervals',
        rationale:
          'User needs change over time; settings that were once appropriate may no longer serve them',
        example:
          'Annual privacy checkup (like Google\'s) that walks users through their current settings',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast (Minimum) — Default color contrast must meet WCAG requirements without user action',
        implementation:
          'Ensure all default text/background color combinations meet 4.5:1 contrast ratio. Do not require users to change theme settings to achieve accessible contrast.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold — Default animation settings must not cause seizures',
        implementation:
          'Respect prefers-reduced-motion media query. Default to reduced motion when the OS preference is set, and avoid flashing content in any default state.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.4',
        guideline:
          'Resize Text — Default font sizes must be readable and scalable',
        implementation:
          'Use relative units (rem, em) for default font sizes. Ensure the default body text size is at least 16px equivalent and support browser zoom without layout breakage.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input — Changing default settings must not cause unexpected context changes',
        implementation:
          'When a user modifies a default setting, apply the change predictably. Do not navigate away, open new windows, or trigger unexpected side effects.',
      },
    ],

    ethics: [
      {
        concern: 'Privacy Exploitation',
        severity: 'critical',
        explanation:
          'Defaulting privacy settings to maximum exposure exploits user inertia for data collection',
        mitigation:
          'Default to maximum privacy protection. Treat default inertia as a reason to protect users, not exploit them. Comply with GDPR, CCPA, and emerging privacy regulations that require opt-in consent.',
      },
      {
        concern: 'Attention Exploitation',
        severity: 'high',
        explanation:
          'Defaulting all notifications to on uses inertia to capture user attention the user did not consent to give',
        mitigation:
          'Default to essential-only notifications. Let users opt in to additional channels. Track and report unsubscribe rates as a measure of default quality.',
      },
      {
        concern: 'Friction as Retention',
        severity: 'high',
        explanation:
          'Adding extra steps or confirmations when users try to change defaults (especially to less profitable options) is a dark pattern',
        mitigation:
          'Make changing defaults as easy as accepting them. Do not add confirmation dialogs, re-authentication, or multi-step flows to discourage changing settings.',
      },
      {
        concern: 'Inertia as Consent',
        severity: 'critical',
        explanation:
          'Treating the fact that users did not change a default as evidence they agree with it is a false assumption',
        mitigation:
          'Never use default acceptance as evidence of informed consent, especially for data processing, terms changes, or feature enrollment. Require affirmative action for meaningful choices.',
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
          'The foundational paper documenting status quo bias and default preference across multiple domains, establishing the theoretical basis for default bias research',
        type: 'foundational',
      },
      {
        title: 'Do Defaults Save Lives?',
        author: 'Johnson, E. J., & Goldstein, D.',
        year: 2003,
        doi: '10.1126/science.1091721',
        description:
          'Landmark study showing organ donation rates vary from 4% to 99.98% based solely on whether the form defaults to opt-in or opt-out',
        type: 'foundational',
      },
      {
        title: 'Defaults and Donation Decisions',
        author: 'Johnson, E. J., & Goldstein, D.',
        year: 2004,
        description:
          'Extended analysis of how default framing affects charitable donation behavior and enrollment decisions',
        type: 'practical',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        description:
          'Explores how default settings function as "nudges" and the ethics of choice architecture',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, Richard H., & Sunstein, Cass R.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'The definitive work on choice architecture and the power of defaults, with extensive examples from retirement savings, organ donation, and policy design',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the cognitive mechanisms (System 1/System 2) that underlie default bias, including effort avoidance and loss aversion',
        type: 'foundational',
      },
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Practical exploration of how defaults shape real-world behavior, from retirement savings to cafeteria food placement',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Power of Default Settings',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/the-power-of-defaults/',
        description:
          'UX-focused guide to default design in digital products, with practical recommendations for settings and configuration',
        type: 'practical',
      },
      {
        title: 'Default Effect: How to Leverage the Power of Defaults in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/default-effect',
        description:
          'Overview of default bias in interaction design with examples from major products',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Power of Defaults',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=XGg1y_6EF6Y',
        description:
          'Animated explanation of how default settings shape behavior, with organ donation and retirement savings examples',
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
      'status-quo-bias',    // Broader tendency to prefer the current state
      'loss-aversion',      // Fear of losing current state reinforces default sticking
      'choice-overload',    // Too many options drives users to accept defaults
      'effort-heuristic',   // Perceived effort of change prevents modification
    ],

    conflicts: [
      'curiosity-effect',   // Curiosity can motivate exploration of settings
      'personalization',    // Desire for customization counters default acceptance
    ],

    confusedWith: [
      'default-effect',     // Default effect is about pre-set options influencing choice; default bias is about inertia against change
      'status-quo-bias',    // Broader concept; default bias is specifically about configured defaults
      'omission-bias',      // Preference for inaction over action, related but distinct
    ],

    hierarchy: {
      parent: 'status-quo-bias',
      children: [
        'settings-inertia',
        'factory-default-persistence',
      ],
    },
  },
};
