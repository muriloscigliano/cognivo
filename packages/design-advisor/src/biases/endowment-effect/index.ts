/**
 * ENDOWMENT EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const endowmentEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'endowment-effect',
    name: 'Endowment Effect',
    aliases: ['Ownership Effect', 'Divestiture Aversion'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'ownership',
      'value-perception',
      'loss-aversion',
      'possession',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We value things we own more than identical things we don\'t own',

    detailed: `The Endowment Effect is the tendency for people to value an object more once they own it. The same item is worth more to us after we possess it than before, even if nothing about the object has changed.

This isn't rational - a coffee mug is a coffee mug whether you own it or not. But ownership creates emotional attachment that inflates perceived value. People demand more to give up something they own than they'd pay to acquire it.

The effect is driven by loss aversion: Giving up something we own feels like a loss, and losses hurt more than equivalent gains feel good. Once we mentally claim ownership, parting with it becomes psychologically painful.

In design, creating feelings of ownership - through trials, personalization, or mental ownership - dramatically increases perceived value and reduces churn.`,

    psychologyBasis: {
      discoveredBy: 'Richard Thaler',
      year: 1980,
      theory: 'Endowment Effect',
      mechanism: `People value things more once they own them because ownership triggers loss aversion. The key mechanisms are:

1. **WTA/WTP Gap**: Willingness to Accept (selling price) consistently exceeds Willingness to Pay (buying price) for the same object, often by a factor of 2-3x
2. **Loss Aversion Activation**: Giving up a possession is coded as a loss, and losses are psychologically weighted ~2x more than equivalent gains
3. **Psychological Ownership**: Mere touch, customization, or mental imagination of ownership is enough to trigger the effect — actual legal ownership is not required
4. **Emotional Attachment**: Time invested, effort expended, and personalization deepen the sense of ownership and increase perceived value
5. **Status Quo Bias**: Once something is part of our "default" state, any change away from it feels like a loss

The effect is strongest for goods with emotional or identity significance and weakest for goods held purely for exchange (like money).`,
    },

    realWorldExample: `Classic study: Give half the participants coffee mugs, other half nothing. Ask mug owners to sell (median: $7). Ask non-owners to buy (median: $3). Same mug, different ownership status, 2-3x price difference. Ownership alone created value.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Endowment Effect profoundly affects how users perceive value, resist downgrading, and commit to products once they feel ownership. Designers can leverage this to:

- Increase trial-to-paid conversion by creating ownership feelings during free trials
- Reduce churn by deepening personalization and customization
- Use possessive language ("your dashboard", "my workspace") to trigger psychological ownership
- Design avatar creation, workspace setup, and onboarding that invest users in the product
- Frame downgrades and cancellations as losses rather than neutral choices`,

    whenToUse: [
      {
        title: 'Free Trial Onboarding',
        scenario:
          'When converting free trial users to paid subscribers',
        example:
          'Guide users to customize their workspace, upload data, and create content during trial so cancellation feels like losing "their" setup',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Personalization Features',
        scenario: 'When designing dashboards, profiles, or workspaces users can customize',
        example:
          'Let users choose themes, arrange widgets, set preferences — each customization deepens ownership',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Possessive Language in UI',
        scenario: 'When labeling sections, pages, or features throughout the product',
        example:
          'Use "Your Projects", "My Workspace", "Your Discover Weekly" instead of generic labels',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Avatar and Identity Creation',
        scenario: 'When onboarding users into social, gaming, or collaborative products',
        example:
          'Prompt users to create avatars, set display names, and build profiles early in the experience',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Content and Data Investment',
        scenario: 'When encouraging users to store data, create content, or build history',
        example:
          'Show users their accumulated data, saved items, and history to reinforce how much they\'ve built',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Upgrade Prompts',
        scenario: 'When encouraging users to move from free to paid tiers',
        example:
          'Show what the user has already built and frame the upgrade as protecting their investment',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Feature Removal or Downgrade Flows',
        reason:
          'Exploiting endowment effect to make cancellation excessively painful is manipulative',
        consequence:
          'Users feel trapped, leading to resentment, negative reviews, and regulatory scrutiny (dark patterns)',
        alternative:
          'Make cancellation straightforward while honestly showing what they\'ll lose. Offer pause or archive options.',
      },
      {
        title: 'Bait-and-Switch Trials',
        reason:
          'Giving premium features during trial then removing them creates a punishing loss experience',
        consequence:
          'Users feel deceived and lose trust; may trigger chargeback disputes or complaints',
        alternative:
          'Be transparent about what\'s included in each tier. Show trial features clearly labeled as "trial only".',
      },
      {
        title: 'Medical or Financial Products',
        reason:
          'Endowment-driven attachment to a financial product or health plan can prevent users from switching to objectively better options',
        consequence:
          'Users stay with suboptimal choices because switching feels like loss',
        alternative:
          'Present clear, objective comparisons and encourage informed decision-making over emotional attachment.',
      },
      {
        title: 'Subscription Traps',
        reason:
          'Making cancellation flows deliberately complex to exploit ownership attachment is unethical',
        consequence:
          'Regulatory penalties (FTC actions), class action lawsuits, brand damage',
        alternative:
          'Provide clear, simple cancellation with honest retention offers.',
      },
    ],

    commonMistakes: [
      {
        title: 'Empty Ownership',
        description:
          'Using possessive language ("Your dashboard") when the user hasn\'t actually customized or invested anything',
        why: 'Ownership language without real investment feels hollow and manipulative',
        fix: 'Earn ownership feelings through real user investment — customization, content creation, data import',
      },
      {
        title: 'Punishing Downgrades',
        description:
          'Making downgrade or cancellation flows excessively painful by emphasizing losses',
        why: 'While loss framing increases retention short-term, it breeds resentment and negative word-of-mouth',
        fix: 'Be honest about what changes, offer data export, and suggest pause options instead of deletion',
      },
      {
        title: 'Ignoring the Investment Curve',
        description:
          'Expecting endowment effect to work immediately without giving users time to invest',
        why: 'Ownership feelings build over time through repeated use, customization, and content creation',
        fix: 'Design progressive onboarding that gradually deepens investment over days and weeks, not minutes',
      },
      {
        title: 'Over-Personalizing Too Early',
        description:
          'Asking users to customize extensively before they understand the product\'s value',
        why: 'Premature customization feels like work, not ownership; users haven\'t decided the product is worth investing in',
        fix: 'Start with quick wins and demonstrate value before asking for deep personalization',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently user-owned content and customizations are displayed',
        examples: [
          'Dashboard layouts showing user-created content prominently reinforce ownership',
          'Personalized home screens with user-arranged widgets deepen attachment',
          '"Your activity" and "Your stats" sections placed above-the-fold increase ownership salience',
          'Before/after comparisons showing user progress reinforce investment',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Possessive language and personalized text reinforce ownership feelings',
        examples: [
          '"Your" and "My" prefixes on section headers trigger ownership',
          'Personalized greetings ("Welcome back, Sarah") reinforce belonging',
          'User-generated content displayed in prominent typography signals value',
          'Progress labels ("You\'ve completed 73%") emphasize user investment',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'User-chosen colors and themes deepen personalization and ownership',
        examples: [
          'Custom theme colors make the interface feel uniquely "theirs"',
          'Brand color applied to user avatar creates identity association',
          'Highlighting user-created content with distinct colors separates it from system content',
          'Progress indicators using vibrant colors reinforce achievement',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive customization and creation are the primary drivers of psychological ownership',
        examples: [
          'Drag-and-drop widget arrangement creates spatial ownership',
          'Saving, favoriting, and bookmarking actions trigger ownership of curated collections',
          'Creating and naming folders, playlists, or boards establishes ownership',
          'Data import and content creation are the strongest ownership triggers',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users feel ownership or detachment',
        examples: [
          '"Your Discover Weekly" vs "Weekly Recommendations" — possessive language matters',
          'Activity summaries ("You created 12 designs this month") reinforce investment',
          'Cancellation pages showing accumulated content trigger loss aversion',
          'Upgrade prompts referencing user-created content leverage endowment effect',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Personalization and ownership cues must be accessible to all users',
        examples: [
          'Screen readers must convey possessive language and personalized labels',
          'Custom color themes must maintain sufficient contrast ratios',
          'Keyboard users must be able to access all customization features equally',
          'Personalized content must have appropriate ARIA labels reflecting ownership',
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
        title: 'Trial-to-Paid Conversion with Ownership',
        description:
          'SaaS product showing users their accumulated work during upgrade prompt',
        code: `<div class="upgrade-prompt">
  <h3>Your workspace is ready to grow</h3>
  <div class="your-investment">
    <div class="stat">
      <span class="number">47</span>
      <span class="label">Projects you've created</span>
    </div>
    <div class="stat">
      <span class="number">312</span>
      <span class="label">Files in your library</span>
    </div>
    <div class="stat">
      <span class="number">8</span>
      <span class="label">Team members invited</span>
    </div>
  </div>
  <p class="message">Keep everything you've built. Upgrade to Pro.</p>
  <button class="primary">Upgrade to Pro — $12/mo</button>
  <button class="secondary">Export your data</button>
</div>`,
        explanation:
          'By showing users the work they\'ve already invested (projects, files, team), the upgrade feels like protecting what\'s theirs rather than buying something new. The possessive language ("you\'ve created", "your library") reinforces ownership.',
        principle:
          'Frame upgrades as preserving user investment, not purchasing a product',
        metrics: {
          before: '8% trial-to-paid conversion with generic upgrade prompt',
          after: '19% trial-to-paid conversion with ownership-framed prompt',
          improvement: '137% increase in trial conversion by leveraging endowment effect',
        },
      },
      {
        title: 'Personalized Dashboard',
        description:
          'Analytics dashboard with user-arranged widgets and custom naming',
        code: `<div class="dashboard">
  <header class="dashboard-header">
    <h1>Good morning, Sarah</h1>
    <p class="subtitle">Your custom dashboard · Last updated 2 min ago</p>
  </header>

  <div class="widget-grid" data-user-arranged="true">
    <div class="widget" data-user-named="true">
      <h3>My Revenue Tracker</h3>
      <div class="chart"><!-- user-configured chart --></div>
    </div>
    <div class="widget" data-user-named="true">
      <h3>Sarah's Team KPIs</h3>
      <div class="metrics"><!-- user-selected metrics --></div>
    </div>
    <div class="widget">
      <h3>Your Weekly Summary</h3>
      <p>You're up 23% from last week</p>
    </div>
  </div>

  <button class="add-widget">+ Add to your dashboard</button>
</div>`,
        explanation:
          'User-named widgets ("My Revenue Tracker"), personalized greetings, possessive labels ("Your Weekly Summary"), and user-arranged layouts all create deep psychological ownership. Users who customize dashboards are 3x less likely to churn.',
        principle:
          'Every customization deepens ownership and increases switching costs',
      },
      {
        title: 'Curated Collection Building',
        description:
          'Music or content platform encouraging users to build personal collections',
        code: `<section class="your-music">
  <h2>Your Library</h2>

  <div class="collection">
    <h3>Your Discover Weekly</h3>
    <p class="personalized">Made for you based on your listening</p>
    <div class="tracks"><!-- personalized tracks --></div>
    <button class="save">Save to Your Library</button>
  </div>

  <div class="collection">
    <h3>Your 2025 Wrapped</h3>
    <p class="stat">You listened to 4,723 songs this year</p>
    <p class="stat">Your top genre: Indie Folk</p>
    <button class="share">Share Your Wrapped</button>
  </div>

  <div class="playlists">
    <h3>Your Playlists (23)</h3>
    <p>You've curated 847 songs across 23 playlists</p>
  </div>
</section>`,
        explanation:
          'Every "Your" label, every accumulated statistic, and every curated playlist deepens ownership. "Your Discover Weekly" feels like a personal gift. "Your 2025 Wrapped" makes listening history feel like a personal possession. Switching platforms means abandoning all of this.',
        principle:
          'Accumulated personal data and curation create powerful ownership bonds',
      },
    ],

    bad: [
      {
        title: 'Punitive Cancellation Flow',
        description:
          'Subscription service making cancellation feel like catastrophic loss',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-warning" style="background: #fee; border: 3px solid red;">
  <h2 style="color: red;">WARNING: You will LOSE everything!</h2>
  <ul class="loss-list" style="color: red;">
    <li>Your 3 years of saved data — GONE FOREVER</li>
    <li>Your 1,247 contacts — PERMANENTLY DELETED</li>
    <li>Your custom workflows — DESTROYED</li>
    <li>Your team's shared files — INACCESSIBLE</li>
  </ul>
  <p style="font-weight: bold;">Are you SURE you want to throw away
  3 years of work?</p>
  <button class="tiny-gray">Yes, destroy everything</button>
  <button class="large-green">Keep my account</button>
</div>`,
        explanation:
          'While leveraging real endowment feelings, this design weaponizes loss aversion through fear and manipulation. The dramatic language, red warnings, asymmetric button sizing, and threatening tone create a hostile experience that traps users rather than retaining them through value.',
        principle:
          'Never weaponize ownership feelings to trap users in subscriptions',
      },
      {
        title: 'Bait-and-Switch Feature Access',
        description:
          'Giving premium features in trial then aggressively removing them',
        code: `<!-- DON'T DO THIS -->
<div class="trial-ended">
  <h2>Your trial has ended</h2>
  <div class="removed-features">
    <div class="feature locked">
      <span class="lock-icon">🔒</span>
      <p>Advanced Analytics — LOCKED</p>
      <p class="small">You used this 47 times during your trial</p>
    </div>
    <div class="feature locked">
      <span class="lock-icon">🔒</span>
      <p>Custom Reports — LOCKED</p>
      <p class="small">You created 12 reports that are now inaccessible</p>
    </div>
    <div class="feature locked">
      <span class="lock-icon">🔒</span>
      <p>API Access — LOCKED</p>
      <p class="small">Your 3 integrations are now broken</p>
    </div>
  </div>
  <button class="primary">Pay now to unlock YOUR features</button>
</div>`,
        explanation:
          'This deliberately creates ownership of premium features during trial, then exploits loss aversion by showing exactly what the user "lost." Emphasizing broken integrations and inaccessible reports is coercive, not persuasive.',
        principle:
          'Don\'t engineer ownership specifically to exploit loss aversion at conversion time',
      },
      {
        title: 'Guilt-Trip Downgrade',
        description:
          'Making users feel guilty for choosing a lower tier',
        code: `<!-- DON'T DO THIS -->
<div class="downgrade-confirm">
  <h2>Downgrading to Basic?</h2>
  <p>Your team will lose access to:</p>
  <div class="team-impact">
    <img src="teammate1.jpg" alt="Alex">
    <p><strong>Alex</strong> will lose their custom dashboard</p>
    <img src="teammate2.jpg" alt="Jordan">
    <p><strong>Jordan</strong> won't be able to finish their project</p>
    <img src="teammate3.jpg" alt="Casey">
    <p><strong>Casey</strong>'s API integrations will break</p>
  </div>
  <p>Are you sure you want to let your team down?</p>
</div>`,
        explanation:
          'Using team members\' faces and names to personalize the loss, and framing downgrade as "letting your team down," weaponizes both endowment effect and social pressure. This is manipulative guilt-tripping, not honest communication.',
        principle:
          'Never use social guilt alongside endowment effect to prevent legitimate downgrades',
      },
    ],

    realWorld: [
      {
        company: 'Spotify',
        product: 'Your Discover Weekly',
        description: 'Spotify creates deeply personal playlists labeled "Made for You" and "Your Discover Weekly." Users build listening history, save songs, and curate playlists that feel uniquely theirs. Switching to Apple Music means abandoning years of curation.',
        effectiveness: 'very-effective',
        analysis: 'Spotify masterfully combines possessive language, personalized content, and accumulated history to create strong ownership. The annual "Wrapped" feature turns listening data into a personal keepsake users share socially, deepening attachment.',
      },
      {
        company: 'Dropbox',
        product: 'Free Trial with Storage',
        description: 'Dropbox gives generous free storage, then users fill it with personal files. When storage runs low, upgrading feels like protecting your own files rather than buying a service. Leaving means migrating gigabytes of personal data.',
        effectiveness: 'very-effective',
        analysis: 'The endowment effect is extreme because users store irreplaceable personal files. The switching cost is not just monetary but emotional — these are your photos, documents, and memories.',
      },
      {
        company: 'Apple',
        product: 'Ecosystem Lock-In',
        description: 'Apple creates ownership through deep personalization: your iCloud library, your Health data, your iMessage history, your Apple Watch rings. Each device and service adds another layer of owned data that would be lost by switching.',
        effectiveness: 'very-effective',
        analysis: 'Apple leverages endowment effect at ecosystem scale. No single product locks you in, but the accumulated ownership across devices, services, and years of personal data creates an almost insurmountable switching barrier.',
      },
      {
        company: 'Canva',
        product: 'Saved Designs and Brand Kit',
        description: 'Canva encourages users to create designs, build brand kits, save templates, and establish a visual library. Free users build substantial collections before hitting the paywall on premium features.',
        effectiveness: 'effective',
        analysis: 'Users invest creative effort into Canva\'s platform. Their designs, brand colors, and templates exist only within Canva. Upgrading protects their creative investment; leaving means recreating everything from scratch.',
      },
      {
        company: 'Notion',
        product: 'Personal Knowledge Base',
        description: 'Notion\'s free tier is generous enough for users to build extensive personal wikis, project trackers, and knowledge bases. The workspace becomes a deeply personal "second brain" that users are reluctant to abandon.',
        effectiveness: 'very-effective',
        analysis: 'Notion benefits from the endowment effect because users invest significant intellectual effort organizing their thoughts and knowledge. The more they use it, the more it becomes indispensable — not because of features but because of personal investment.',
      },
    ],

    abTests: [
      {
        title: 'Trial Upgrade: Generic vs Ownership-Framed Prompt',
        hypothesis:
          'Showing users their accumulated investment will increase trial-to-paid conversion',
        controlVersion: {
          description:
            'Generic upgrade prompt: "Your free trial is ending. Upgrade to Pro for $12/mo to access premium features."',
          metrics: {
            conversionRate: '7.8%',
            timeOnPage: '0:18',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'Ownership-framed prompt showing user\'s created projects (47), uploaded files (312), and team members (8) with message: "Keep everything you\'ve built. Upgrade to Pro."',
          metrics: {
            conversionRate: '18.4%',
            timeOnPage: '1:45',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Ownership-framed prompts increased trial conversion by 136%. Users spent significantly more time reviewing their accumulated data before deciding. The specific numbers (47 projects, 312 files) made the investment feel concrete and valuable.',
          learnings: [
            'Specific investment metrics (project counts, file counts) are more persuasive than generic feature lists',
            'Users who had customized their workspace converted at 3x the rate of users who hadn\'t',
            'Possessive language ("you\'ve built", "your library") outperformed neutral language by 42%',
            'Offering data export alongside upgrade reduced perceived manipulation and actually increased conversion',
          ],
        },
      },
      {
        title: 'Cancellation Flow: Standard vs Ownership Reminder',
        hypothesis:
          'Reminding users of their accumulated content will reduce cancellation rate',
        controlVersion: {
          description:
            'Standard cancellation: "Are you sure you want to cancel? You can resubscribe anytime."',
          metrics: {
            cancellationRate: '78%',
            clickThroughRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Ownership reminder: Shows personalized summary of user\'s content, activity history, and offers pause/downgrade alternatives with data export option',
          metrics: {
            cancellationRate: '52%',
            clickThroughRate: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Ownership reminders reduced cancellation by 33%. Critically, including data export and pause options (not just loss framing) made the retention feel helpful rather than manipulative. NPS scores for the cancellation flow actually improved.',
          learnings: [
            'Showing accumulated content is effective but must be paired with ethical options (pause, export)',
            'Users who chose to pause instead of cancel returned at 62% rate within 30 days',
            'Pure loss framing without alternatives was perceived as a dark pattern in user surveys',
            'The most effective message referenced specific content the user had created, not generic statistics',
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
        name: 'Possessive Language',
        description:
          'Headers, labels, and copy using "Your", "My", or the user\'s name to frame content as owned',
        howToSpot:
          'Search for "Your", "My", user\'s name in headers, navigation labels, section titles, and CTAs',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Customization Entry Points',
        description:
          'Prominent settings, theme pickers, layout editors, and personalization options',
        howToSpot:
          'Look for edit icons on widgets, drag handles, color pickers, "customize" buttons, or rearrangeable layouts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Investment Counters',
        description:
          'Statistics showing user-created content, time spent, or accumulated data',
        howToSpot:
          'Look for "X projects created", "X files saved", streak counters, or activity summaries',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Loss-Framed Prompts',
        description:
          'Upgrade, cancellation, or downgrade messages emphasizing what the user will lose',
        howToSpot:
          'Check cancellation flows, trial expiry screens, and downgrade confirmations for loss language',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Avatar and Profile Prominence',
        description:
          'User avatars, profile photos, or identity elements displayed prominently throughout the interface',
        howToSpot:
          'Look for user photos in navigation, personalized welcome messages, or identity-linked content',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Trial-to-Paid Ownership Pattern',
        description: 'Free trial designed to maximize user investment before paywall',
        indicators: ['Onboarding that encourages content creation and customization', 'No restrictions on personalization during trial', 'Upgrade prompts referencing user-created content', 'Trial expiry showing accumulated data'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Progressive Personalization Pattern',
        description: 'Gradually deepening customization that increases ownership over time',
        indicators: ['Initial simple choices (name, avatar)', 'Later complex customization (dashboards, workflows)', 'Settings that accumulate over time', 'User-named items (folders, playlists, projects)'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Possessive Framing Pattern',
        description: 'Consistent use of ownership language throughout the interface',
        indicators: ['"Your" prefix on sections and features', '"My" prefix on navigation items', 'User\'s name in personalized greetings', '"Made for you" labels on algorithmically generated content'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Switching Cost Pattern',
        description: 'Design that makes accumulated data difficult to take elsewhere',
        indicators: ['No data export feature', 'Proprietary formats for user content', 'Network effects binding user to platform', 'History and analytics tied to the platform'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface use possessive language ("your", "my") for user content?',
      'Are there customization features that deepen user investment over time?',
      'Does the trial onboarding encourage content creation and personalization?',
      'Are upgrade prompts framed around preserving user investment?',
      'Do cancellation flows show accumulated content or data?',
      'Is there a data export option, or is user content locked to the platform?',
      'Are loss-framed messages used ethically or manipulatively?',
      'Does the product create genuine value from personalization, or just switching costs?',
      'Are users given honest alternatives (pause, downgrade) alongside cancellation?',
      'How would a new user perceive the same product versus a long-time user?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the endowment effect and psychological ownership.

Analyze the provided design for endowment effect patterns. Identify:

1. **Ownership Language**: Use of possessive pronouns ("your", "my"), personalized labels, and identity-linked content
2. **Customization Depth**: How deeply users can personalize the experience (themes, layouts, naming, configuration)
3. **Investment Accumulation**: How the product encourages and displays user-created content, data, and history
4. **Loss Framing**: How upgrades, downgrades, and cancellations reference what users stand to lose
5. **Switching Costs**: Whether accumulated ownership creates healthy engagement or manipulative lock-in

For each pattern found:
- Identify the ownership trigger and its strength
- Assess whether it creates genuine value or artificial lock-in
- Determine if loss framing is ethical or manipulative
- Evaluate whether users have fair exit options (data export, pause)
- Suggest improvements for ethical ownership design

Consider:
- Is personalization creating genuine user value or just switching costs?
- Are trial designs transparent about what happens post-trial?
- Do cancellation flows respect user autonomy while honestly communicating consequences?
- Is possessive language backed by real user investment?
- Are there data portability options so ownership doesn't become entrapment?

Provide actionable recommendations for ethical, effective use of the endowment effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        ownershipPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              ownershipTrigger: { type: 'string' },
              strength: { type: 'string' },
              ethicalAssessment: { type: 'string' },
              genuineValue: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'ownershipTrigger',
              'strength',
              'genuineValue',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            ownershipDepth: { type: 'number' },
            personalizationScore: { type: 'number' },
            ethicalScore: { type: 'number' },
            switchingCostFairness: { type: 'number' },
          },
          required: [
            'ownershipDepth',
            'personalizationScore',
            'ethicalScore',
            'switchingCostFairness',
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
        'ownershipPatterns',
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
        title: 'Design Early Ownership Moments',
        description:
          'Create onboarding steps that give users something to own within the first session',
        example:
          'Prompt users to name their workspace, choose a theme, or create their first project within 5 minutes',
        tips: [
          'Start with low-effort, high-reward customizations (name, avatar, theme)',
          'Make the first creation feel significant and personal',
          'Save and display user choices prominently to reinforce ownership',
        ],
      },
      {
        step: 2,
        title: 'Use Possessive Language Consistently',
        description:
          'Frame features, content, and data as belonging to the user throughout the interface',
        example:
          'Use "Your Projects", "My Dashboard", "Your Insights" instead of "Projects", "Dashboard", "Insights"',
        tips: [
          'Apply possessive language to navigation, headers, and empty states',
          'Use the user\'s name in personalized messages and greetings',
          'Ensure possessive framing is backed by real user investment',
        ],
      },
      {
        step: 3,
        title: 'Deepen Investment Progressively',
        description:
          'Design features that accumulate user investment over days and weeks',
        example:
          'Week 1: Create projects. Week 2: Invite teammates. Week 3: Build custom workflows. Week 4: View analytics on your data.',
        tips: [
          'Each week should add another layer of ownership',
          'Show users their growing investment (activity summaries, milestones)',
          'Make accumulated data visible and valuable',
        ],
      },
      {
        step: 4,
        title: 'Frame Upgrades Around Preservation',
        description:
          'Position paid tiers as protecting and enhancing what users have already built',
        example:
          '"Your 47 projects deserve unlimited storage. Upgrade to keep building."',
        tips: [
          'Reference specific user-created content in upgrade prompts',
          'Frame the upgrade as growth, not a gate',
          'Always offer data export as an alternative',
        ],
      },
      {
        step: 5,
        title: 'Design Ethical Exit Paths',
        description:
          'Ensure users can leave without feeling trapped, even while acknowledging what they\'ll lose',
        example:
          'Cancellation flow with data export, account pause, and honest summary of changes',
        tips: [
          'Offer pause or downgrade before full cancellation',
          'Provide comprehensive data export in standard formats',
          'Be honest about consequences without being threatening',
          'Make reactivation easy if users change their mind',
        ],
      },
    ],

    dos: [
      'Create genuine value through personalization that helps users work better',
      'Use possessive language backed by real user investment and customization',
      'Show users their accumulated data and progress to reinforce engagement',
      'Offer data export so ownership doesn\'t become entrapment',
      'Design trial experiences that deliver real value, not just create lock-in',
      'Frame upgrades as preserving user investment, not gatekeeping features',
      'Provide pause and downgrade options alongside cancellation',
      'Make onboarding feel like building something, not filling out forms',
      'Celebrate user milestones and accumulated investment',
      'Be transparent about what changes at each tier or upon cancellation',
    ],

    donts: [
      'Don\'t use threatening or fear-based language in cancellation flows',
      'Don\'t make cancellation deliberately difficult to exploit ownership attachment',
      'Don\'t give premium features in trial specifically to create painful loss at expiry',
      'Don\'t use possessive language when the user hasn\'t actually invested anything',
      'Don\'t lock user-created data to your platform without export options',
      'Don\'t use social guilt ("your team will lose access") to prevent legitimate downgrades',
      'Don\'t hide the true cost of ownership (storage limits, feature restrictions)',
      'Don\'t design dark patterns that exploit endowment effect for retention',
      'Don\'t frame every interaction as potential loss to create anxiety',
      'Don\'t use asymmetric button sizing to manipulate cancellation decisions',
    ],

    bestPractices: [
      {
        title: 'Earn Ownership, Don\'t Manufacture It',
        description:
          'Create real value through personalization and customization that genuinely helps users',
        rationale:
          'Manufactured ownership feelings without real value breed resentment; genuine value creates sustainable retention',
        example:
          'A dashboard that users genuinely find useful because they configured it, not because they\'re locked in',
      },
      {
        title: 'Transparent Trial Design',
        description:
          'Be clear about what\'s included in the trial and what happens when it ends',
        rationale:
          'Users who feel surprised by post-trial restrictions lose trust; transparency builds long-term loyalty',
        example:
          'Label trial-only features clearly: "Pro feature — available during your trial"',
      },
      {
        title: 'Ethical Cancellation Flows',
        description:
          'Show users what they\'ve built honestly, but always provide fair exit options',
        rationale:
          'Honest retention respects user autonomy; manipulative retention creates regulatory risk and brand damage',
        example:
          'Show content summary + offer data export + suggest pause + simple cancel button',
      },
      {
        title: 'Data Portability as Trust Signal',
        description:
          'Offer comprehensive data export to show confidence in your product\'s value',
        rationale:
          'Products that let users leave freely are products users choose to stay with; forced retention is fragile',
        example:
          'One-click export of all user data in standard formats (CSV, JSON, PDF)',
      },
      {
        title: 'Progressive Ownership Investment',
        description:
          'Design the product so ownership deepens naturally through use, not through artificial prompts',
        rationale:
          'Natural investment through genuine use is more durable than prompted customization',
        example:
          'Usage-based personalization that improves the product automatically (recommendations, shortcuts, preferences)',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Personalized labels and possessive language must be conveyed semantically',
        implementation:
          'Use proper heading levels and ARIA labels so screen readers convey ownership framing. "Your Dashboard" should be a semantic heading, not just styled text.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast — Custom themes and personalized color choices must maintain accessibility',
        implementation:
          'Validate that user-chosen theme colors meet 4.5:1 contrast ratio. Provide contrast warnings in theme customization.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard — All customization features must be keyboard accessible',
        implementation:
          'Drag-and-drop widget arrangement must have keyboard alternatives. Custom naming, theme selection, and layout editing must work without a mouse.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels — Personalized content sections need clear, descriptive headings',
        implementation:
          'Personalized sections ("Your Projects", "My Dashboard") must use proper heading hierarchy so all users can navigate to their content.',
      },
    ],

    ethics: [
      {
        concern: 'Manipulative Retention',
        severity: 'critical',
        explanation:
          'Using endowment effect to make cancellation deliberately painful or confusing, trapping users through guilt and loss aversion rather than genuine value',
        mitigation:
          'Provide straightforward cancellation with honest information. Offer pause, downgrade, and data export. Never use asymmetric button sizing or guilt-trip language.',
      },
      {
        concern: 'Bait-and-Switch Trials',
        severity: 'critical',
        explanation:
          'Designing trials to maximize ownership investment specifically to make the post-trial loss feel devastating',
        mitigation:
          'Be transparent about trial scope. Label trial-only features clearly. Provide a graceful transition path when the trial ends.',
      },
      {
        concern: 'Data Hostage',
        severity: 'high',
        explanation:
          'Locking user-created content to the platform with no export option, making ownership a trap rather than a benefit',
        mitigation:
          'Provide comprehensive data export in standard formats. Make migration straightforward. Your product should retain users through value, not data lock-in.',
      },
      {
        concern: 'False Personalization',
        severity: 'medium',
        explanation:
          'Using possessive language ("Your insights", "Made for you") when content is actually generic and not personalized',
        mitigation:
          'Only use ownership language when content is genuinely personalized to the user. Generic content should use neutral labels.',
      },
      {
        concern: 'Social Pressure Exploitation',
        severity: 'high',
        explanation:
          'Combining endowment effect with social guilt by showing team members who will be affected by cancellation or downgrade',
        mitigation:
          'Inform users of team impact factually without emotional manipulation. Never use teammate photos or names to guilt-trip users.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Toward a Positive Theory of Consumer Choice',
        author: 'Thaler, R. H.',
        year: 1980,
        doi: '10.1016/0167-2681(80)90051-7',
        description:
          'The foundational paper coining "endowment effect" and documenting the WTA/WTP gap',
        type: 'foundational',
      },
      {
        title: 'Experimental Tests of the Endowment Effect and the Coase Theorem',
        author: 'Kahneman, D., Knetsch, J. L., & Thaler, R. H.',
        year: 1990,
        doi: '10.1086/261737',
        description:
          'The classic coffee mug experiment demonstrating that ownership increases valuation by 2-3x',
        type: 'foundational',
      },
      {
        title: 'The Endowment Effect and Evidence of Nonreversible Indifference Curves',
        author: 'Knetsch, J. L.',
        year: 1989,
        doi: '10.2307/1831454',
        description:
          'Demonstrated that people prefer to keep what they have over trading for equivalent alternatives',
        type: 'advanced',
      },
      {
        title: 'Virtual Ownership, Happiness, and Willingness to Pay',
        author: 'Shu, S. B., & Peck, J.',
        year: 2011,
        description:
          'Research on how mental imagery and touch create psychological ownership before actual purchase',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard H.',
        year: 2015,
        isbn: '9780393080148',
        description:
          'Thaler\'s own account of discovering the endowment effect and its implications for economics',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapter on endowment effect and loss aversion by Nobel Prize winner who co-authored key studies',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Accessible exploration of ownership effects on valuation with practical examples',
        type: 'practical',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R. H., & Sunstein, C. R.',
        year: 2008,
        isbn: '9780300122237',
        description:
          'How endowment effect and status quo bias influence choice architecture',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Endowment Effect in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/endowment-effect/',
        description:
          'Practical guide to leveraging endowment effect ethically in user experience design',
        type: 'practical',
      },
      {
        title: 'How the Endowment Effect Drives Product Engagement',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies/endowment-effect',
        description:
          'Visual case studies of endowment effect in successful products',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Endowment Effect: Why We Overvalue What We Own',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/endowment-effect',
        description:
          'Clear explanation of endowment effect with real-world examples',
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
