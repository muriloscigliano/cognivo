/**
 * INERTIA BIAS
 *
 * The tendency to continue current behavior due to resistance to change,
 * even when change would be beneficial.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const inertiaBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'inertia-bias',
    name: 'Inertia Bias',
    aliases: ['Behavioral Inertia', 'Resistance to Change', 'Persistence Bias'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'status-quo',
      'change-resistance',
      'defaults',
      'migration',
      'adoption',
      'habits',
      'upgrade',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People tend to continue their current behavior and resist change, even when switching would clearly benefit them.',

    detailed: `Inertia bias is the tendency to maintain one's current course of action, habits, or choices simply because changing requires effort, even when the cost of staying is objectively higher than the cost of switching. Unlike status quo bias (which is driven by a preference for the current state), inertia bias is primarily driven by friction, effort aversion, and the perceived activation energy required to initiate change.

This bias is deeply rooted in how the brain conserves cognitive resources. Evaluating alternatives, learning new workflows, and adapting to unfamiliar environments all consume mental energy. The brain defaults to existing patterns because they are automatic, requiring minimal conscious processing.

In product and UX design, inertia bias is the single largest barrier to feature adoption, platform migration, and version upgrades. Users stay on deprecated software, ignore better alternatives, and stick with suboptimal defaults not because they prefer them, but because switching feels harder than it actually is. Designers who understand inertia can reduce perceived switching costs and create gentle migration paths that respect users' cognitive budgets.`,

    psychologyBasis: {
      discoveredBy: 'Brigitte Madrian and Dennis Shea',
      year: 2001,
      theory: 'Behavioral Economics and Default Effects',
      mechanism: `Inertia operates through several reinforcing mechanisms:

1. **Effort Aversion**: The brain overestimates the effort required to change, making the current state feel "good enough"
2. **Loss Aversion Asymmetry**: Potential losses from switching feel larger than potential gains, even when gains objectively outweigh losses
3. **Habit Automaticity**: Repeated behaviors become automatic neural pathways that require no conscious effort, making alternatives feel cognitively expensive
4. **Ambiguity Aversion**: The known current state feels safer than the uncertain outcomes of change
5. **Sunk Cost Reinforcement**: Past investment in current behavior creates psychological commitment to continuing it

The mechanism is self-reinforcing: the longer someone maintains a behavior, the stronger inertia becomes, as habits deepen and switching costs accumulate.`,
    },

    realWorldExample: `Madrian and Shea's landmark 2001 study on 401(k) retirement plans demonstrated inertia bias dramatically. When enrollment was opt-in (requiring action to join), only 49% of employees enrolled after one year. When enrollment was automatic with opt-out (requiring action to leave), 86% remained enrolled. The default — not preference — determined behavior. Employees who were auto-enrolled also tended to stay at the default contribution rate and default fund allocation for years, even when better options were available and communicated clearly.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Inertia bias is the primary force that keeps users locked into existing behaviors, tools, and workflows. It directly affects feature adoption, platform migration, upgrade conversion, and change management UX. Designers can work with inertia to:

- Reduce perceived switching costs through progressive, low-friction transitions
- Design migration paths that feel incremental rather than disruptive
- Use smart defaults that leverage inertia for user benefit
- Create gentle nudges that lower the activation energy for beneficial changes
- Build upgrade flows that preserve familiarity while introducing improvements`,

    whenToUse: [
      {
        title: 'Feature Adoption and Migration',
        scenario:
          'When migrating users from a legacy feature to a new version',
        example:
          'Introduce the new editor alongside the old one, letting users toggle between them before fully switching',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Version Upgrades',
        scenario: 'When encouraging users to upgrade to a newer software version',
        example:
          'Show side-by-side comparison of old vs new with a one-click upgrade that preserves all settings and data',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Beneficial Default Settings',
        scenario: 'When setting defaults for new users or new features',
        example:
          'Auto-enable security features like 2FA, knowing inertia will keep most users enrolled',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Progressive Feature Introduction',
        scenario: 'When rolling out new capabilities to an existing user base',
        example:
          'Gradually surface new features within existing workflows rather than requiring users to navigate to a new section',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription and Plan Changes',
        scenario: 'When encouraging users to upgrade their plan or subscription',
        example:
          'Offer a free trial of the higher tier that activates in-place, requiring no setup changes',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Defaults',
        scenario: 'When configuring initial user environments',
        example:
          'Pre-configure workspaces with best-practice layouts and settings that most users will keep',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Forced Migrations',
        reason:
          'Exploiting inertia to force users into unwanted changes by making opt-out difficult',
        consequence:
          'User frustration, trust erosion, churn, and negative word-of-mouth',
        alternative:
          'Provide clear opt-out paths and respect user choice even when leveraging defaults',
      },
      {
        title: 'Dark Pattern Subscriptions',
        reason:
          'Using inertia to trap users in subscriptions by making cancellation difficult',
        consequence:
          'Regulatory penalties, class action lawsuits, brand damage, and user resentment',
        alternative:
          'Make cancellation as easy as sign-up; retain users through value, not friction',
      },
      {
        title: 'Safety-Critical Settings',
        reason:
          'Relying on inertia for settings where active user understanding is required',
        consequence:
          'Users may not understand critical security or privacy settings they never actively chose',
        alternative:
          'Require explicit confirmation for safety-critical configurations',
      },
      {
        title: 'Consent and Privacy',
        reason:
          'Using pre-checked consent boxes that rely on inertia to collect data',
        consequence:
          'GDPR and privacy law violations, user distrust, and legal liability',
        alternative:
          'Use opt-in consent mechanisms for data collection and privacy choices',
      },
    ],

    commonMistakes: [
      {
        title: 'Big Bang Migrations',
        description:
          'Forcing all users to switch to a new version simultaneously with no transition period',
        why: 'Inertia means users have built habits and workflows around the current version; abrupt change creates cognitive overload',
        fix: 'Offer parallel access periods, gradual rollouts, and reversible migration with a clear timeline',
      },
      {
        title: 'Underestimating Switching Costs',
        description:
          'Assuming users will switch because the new option is objectively better',
        why: 'Perceived switching cost includes learning time, workflow disruption, and uncertainty — not just feature comparison',
        fix: 'Map all switching costs (cognitive, procedural, relational) and design to minimize each one explicitly',
      },
      {
        title: 'Ignoring Habit Depth',
        description:
          'Treating long-time users and new users the same during changes',
        why: 'Users with years of muscle memory have much stronger inertia than recent adopters',
        fix: 'Segment users by tenure and usage patterns; provide more gradual transitions for power users',
      },
      {
        title: 'All-or-Nothing Upgrades',
        description:
          'Requiring users to adopt all changes at once instead of incrementally',
        why: 'The larger the perceived change, the stronger the inertia resistance',
        fix: 'Break changes into small, independent steps that users can adopt at their own pace',
      },
      {
        title: 'Removing Before Replacing',
        description:
          'Deprecating features before the replacement is fully ready and proven',
        why: 'Users lose trust when familiar tools disappear before adequate alternatives exist',
        fix: 'Run old and new in parallel until the new version has proven adoption and stability',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout changes are among the most disruptive because users build spatial memory and muscle memory for element positions',
        examples: [
          'Moving navigation elements triggers strong inertia resistance',
          'Gradual layout transitions (animations, highlights) ease spatial relearning',
          'Maintaining familiar landmarks while updating surrounding content reduces friction',
          'Progressive disclosure of new layout elements prevents overwhelming change',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography changes have lower inertia impact but still affect reading flow and content recognition',
        examples: [
          'Font changes can make familiar interfaces feel foreign',
          'Maintaining heading hierarchy during redesigns preserves scanning patterns',
          'Text size changes affect muscle memory for scrolling and reading pace',
          'Consistent label text prevents relearning of navigation and actions',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color scheme changes affect recognition speed and emotional association with interface elements',
        examples: [
          'Brand color changes can make a familiar product feel like a stranger',
          'Gradual color transitions (A/B with slow rollout) reduce shock',
          'Maintaining semantic color meanings (red=error, green=success) preserves understanding',
          'Dark/light mode transitions should be user-initiated to respect preference inertia',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction pattern changes face the strongest inertia because they disrupt procedural memory and muscle memory',
        examples: [
          'Changing keyboard shortcuts breaks deeply ingrained motor habits',
          'Moving from click to drag interactions requires conscious relearning',
          'Altering confirmation flows disrupts autopilot behavior',
          'Changing gesture patterns on mobile requires motor skill retraining',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content restructuring affects how users find information and complete learned workflows',
        examples: [
          'Reorganizing help documentation breaks bookmarked mental models',
          'Renaming features makes existing knowledge feel obsolete',
          'Moving settings to new locations forces users to relearn configuration paths',
          'Changing terminology in error messages disrupts learned troubleshooting patterns',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility users often have deeply ingrained navigation patterns and any change has amplified impact',
        examples: [
          'Screen reader users build strong mental models of page structure; changes are more disorienting',
          'Keyboard navigation order changes affect users with motor disabilities disproportionately',
          'Assistive technology configurations may need updating after interface changes',
          'Voice command users have memorized specific labels; renaming elements breaks their commands',
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
        title: 'Gentle Migration Path with Parallel Access',
        description:
          'Code editor offering new and classic interfaces side by side during migration',
        code: `<div class="editor-migration-banner">
  <div class="banner-content">
    <h3>Try the New Editor</h3>
    <p>We've rebuilt the editor for speed. Your files, settings, and
    shortcuts are all here — just a faster experience.</p>
    <div class="comparison">
      <span class="metric">2x faster file loading</span>
      <span class="metric">Native Git integration</span>
      <span class="metric">All your extensions work</span>
    </div>
  </div>
  <div class="banner-actions">
    <button class="primary">Try New Editor</button>
    <button class="secondary">Stay with Classic</button>
    <p class="reassurance">You can switch back anytime from Settings</p>
  </div>
</div>`,
        explanation:
          'The migration banner reduces inertia by emphasizing continuity ("your files, settings, and shortcuts are all here"), showing concrete benefits, and providing a safe escape hatch ("switch back anytime"). The user never feels trapped.',
        principle:
          'Lower perceived switching costs by emphasizing continuity and providing reversibility',
        metrics: {
          before: '12% voluntary adoption after 30 days with "upgrade now" prompt',
          after: '47% voluntary adoption after 30 days with parallel access',
          improvement: '292% increase in new editor adoption',
        },
      },
      {
        title: 'Progressive Feature Introduction',
        description:
          'Project management tool introducing AI features within existing workflows',
        code: `<div class="task-card">
  <h4>Design homepage mockup</h4>
  <div class="task-meta">
    <span class="assignee">Sarah</span>
    <span class="due">Due Tomorrow</span>
  </div>

  <!-- New feature surfaces within familiar context -->
  <div class="ai-suggestion subtle">
    <span class="ai-badge">AI</span>
    <p>Based on similar tasks, this typically takes 3-4 hours.
    Want to adjust the estimate?</p>
    <div class="actions">
      <button class="text-button">Set to 3.5 hours</button>
      <button class="text-button dismiss">Dismiss</button>
    </div>
  </div>
</div>`,
        explanation:
          'Instead of asking users to navigate to a new "AI Features" section, the AI suggestion appears within the existing task card workflow. Users encounter it naturally without changing their behavior. The dismiss option respects those not ready to adopt.',
        principle:
          'Introduce new capabilities within existing workflows to minimize perceived change',
        metrics: {
          before: '8% used AI features when placed in separate section',
          after: '34% used AI features when surfaced within existing workflows',
          improvement: '325% increase in AI feature engagement',
        },
      },
      {
        title: 'Low-Friction Upgrade with Settings Preservation',
        description:
          'SaaS platform offering one-click plan upgrade that preserves everything',
        code: `<div class="upgrade-prompt">
  <h3>Unlock Team Features</h3>
  <p>You've invited 3 collaborators this month. Upgrade to Team
  and everyone gets full access.</p>

  <div class="what-changes">
    <h4>What stays the same:</h4>
    <ul class="preserved">
      <li>All your projects and data</li>
      <li>Your workspace settings</li>
      <li>Your integrations and API keys</li>
      <li>Your custom templates</li>
    </ul>
    <h4>What you gain:</h4>
    <ul class="added">
      <li>Unlimited collaborators</li>
      <li>Shared workspaces</li>
      <li>Team analytics</li>
    </ul>
  </div>

  <button class="primary">Upgrade to Team — $29/mo</button>
  <p class="guarantee">Switch back to Individual anytime.
  We'll prorate your refund.</p>
</div>`,
        explanation:
          'The upgrade prompt directly addresses inertia by listing everything that stays the same first, reducing fear of disruption. The guarantee of easy reversal and prorated refund removes risk aversion that reinforces inertia.',
        principle:
          'Emphasize continuity and reversibility to overcome change resistance',
      },
    ],

    bad: [
      {
        title: 'Forced Migration with No Escape',
        description:
          'Software forcing immediate migration to new version with no rollback option',
        code: `<!-- DON'T DO THIS -->
<div class="forced-update">
  <h2>You Must Update Now</h2>
  <p>The classic editor has been discontinued.
  All your work has been migrated to the new editor.</p>
  <p>The new editor works differently. Please read the
  migration guide (47 pages) to learn the changes.</p>
  <button class="primary">Open New Editor</button>
  <!-- No option to use classic editor -->
  <!-- No gradual transition -->
  <!-- No way to revert -->
</div>`,
        explanation:
          'Forcing an abrupt, irreversible migration maximally triggers inertia resistance. Users feel ambushed, lose control, and face a massive cognitive load (47-page guide). This destroys trust and drives churn.',
        principle: 'Never force abrupt, irreversible changes on users with established habits',
      },
      {
        title: 'Hostile Subscription Cancellation',
        description:
          'Streaming service exploiting inertia by making cancellation deliberately difficult',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <!-- Step 1 of 7 -->
  <h3>Are you sure you want to cancel?</h3>
  <p>You'll lose access to 50,000+ shows!</p>
  <button class="primary large">Keep My Subscription</button>
  <a href="/cancel-step-2" class="tiny-link">Continue cancellation</a>

  <!-- Step 2: Survey -->
  <!-- Step 3: Special offer -->
  <!-- Step 4: Another survey -->
  <!-- Step 5: Confirmation warning -->
  <!-- Step 6: Final confirmation -->
  <!-- Step 7: Actual cancellation -->
</div>`,
        explanation:
          'A 7-step cancellation flow weaponizes inertia by making the cost of leaving artificially high. This is a dark pattern that exploits cognitive fatigue and loss aversion. Many jurisdictions now ban this practice.',
        principle: 'Never weaponize friction to trap users — cancellation must be as easy as sign-up',
      },
      {
        title: 'Disruptive Redesign Without Transition',
        description:
          'Social media platform completely changing its interface overnight',
        code: `<!-- DON'T DO THIS -->
<div class="redesign-announcement">
  <h2>Welcome to the All-New Experience!</h2>
  <p>We've completely redesigned everything!</p>
  <ul>
    <li>New navigation (moved from top to left)</li>
    <li>New messaging (merged with comments)</li>
    <li>New profile layout (everything reorganized)</li>
    <li>New settings (consolidated 12 pages into 3)</li>
  </ul>
  <button class="primary">Explore the New Design</button>
  <!-- No familiar elements preserved -->
  <!-- No gradual rollout -->
  <!-- No option to revert -->
</div>`,
        explanation:
          'Changing every element simultaneously overwhelms users with cognitive load. Even if every individual change is an improvement, the aggregate disruption triggers maximum inertia resistance and frustration.',
        principle: 'Simultaneous changes to every element create insurmountable inertia resistance',
      },
    ],

    realWorld: [
      {
        company: 'Microsoft',
        product: 'Windows Upgrade Prompts',
        description: 'Users resisted upgrading from Windows 7 to Windows 10 for years despite free upgrades and clear improvements. Microsoft eventually resorted to aggressive prompts, which backfired with user backlash. Windows 7 still held 20% market share three years after Windows 10 launched.',
        effectiveness: 'somewhat-effective',
        analysis: 'Demonstrates how strong inertia bias can be: even free, objectively superior alternatives fail to overcome behavioral inertia. Aggressive forcing tactics increased resistance rather than adoption.',
      },
      {
        company: 'Google',
        product: 'Chrome Browser Adoption',
        description: 'Chrome overcame Internet Explorer inertia by being pre-installed on Android, bundled with popular downloads, and offering a noticeably faster experience. Rather than asking users to actively switch, Chrome reduced the activation energy at every opportunity.',
        effectiveness: 'very-effective',
        analysis: 'Chrome succeeded by attacking inertia from multiple angles: reducing installation friction, leveraging platform defaults, and providing an immediately noticeable performance improvement that justified the switch cost.',
      },
      {
        company: 'Slack',
        product: 'Platform Migration from IRC/Email',
        description: 'Slack overcame workplace communication inertia by integrating with existing tools (email forwarding, calendar sync), supporting gradual team adoption (not requiring everyone to switch at once), and making the first experience frictionless with pre-populated channels.',
        effectiveness: 'very-effective',
        analysis: 'Slack understood that replacing entrenched communication habits requires reducing every possible friction point. Integration with existing tools meant users could adopt incrementally rather than making an all-or-nothing commitment.',
      },
      {
        company: 'Facebook',
        product: 'Social Network Loyalty',
        description: 'Despite privacy scandals and user dissatisfaction, Facebook retained users because switching costs include losing social connections, photo archives, group memberships, and event coordination. Competitors like Google+ failed despite technical superiority because they could not overcome network inertia.',
        effectiveness: 'effective',
        analysis: 'Social platforms benefit enormously from inertia bias compounded by network effects. The perceived cost of rebuilding social connections elsewhere far exceeds the dissatisfaction with the current platform, keeping users locked in.',
      },
    ],

    abTests: [
      {
        title: 'New Feature Adoption: Separate Section vs In-Context Introduction',
        hypothesis:
          'Introducing new features within existing workflows will drive higher adoption than directing users to a new section',
        controlVersion: {
          description:
            'Banner directing users to "Explore New AI Features" in a dedicated section with its own navigation',
          metrics: {
            conversionRate: '6%',
            timeOnPage: '0:45',
            scrollDepth: '30%',
          },
        },
        treatmentVersion: {
          description:
            'AI features surfaced as subtle suggestions within existing task workflows, requiring no navigation change',
          metrics: {
            conversionRate: '31%',
            timeOnPage: '2:10',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'In-context feature introduction overcame inertia by eliminating the need to change behavior. Users engaged 5x more when new features appeared within existing workflows rather than requiring navigation to a separate area.',
          learnings: [
            'Users will not seek out new features; features must come to users',
            'Maintaining existing workflow context dramatically reduces adoption friction',
            'Subtle, dismissible introductions build trust better than forced interruptions',
            'Power users adopted fastest when features appeared in their most-used workflows',
          ],
        },
      },
      {
        title: 'Migration Path: Abrupt Switch vs Parallel Access Period',
        hypothesis:
          'Offering a parallel access period with both old and new versions will increase migration completion',
        controlVersion: {
          description:
            'Deadline-driven migration: "Classic editor will be removed on March 1. Click here to switch now."',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '0:20',
            clickThroughRate: '15%',
          },
        },
        treatmentVersion: {
          description:
            'Parallel access: "Try the new editor anytime. Classic editor remains available. Switch back with one click."',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '1:45',
            clickThroughRate: '52%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Parallel access doubled migration completion. The option to revert gave users confidence to try the new editor, and 85% of those who tried it stayed. The deadline approach generated 3x more support tickets and negative feedback.',
          learnings: [
            'Reversibility dramatically reduces perceived switching cost',
            'Deadlines increase anxiety but not adoption; safe exploration increases both',
            'Users who voluntarily migrate are more satisfied than those who are forced',
            'Support costs were 60% lower with parallel access versus forced migration',
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
        name: 'Unchanged Default Settings',
        description:
          'Users have never modified settings from their initial defaults, even when their usage patterns suggest different preferences',
        howToSpot:
          'Check analytics for percentage of users still on default settings after 30+ days of active use',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Legacy Feature Persistence',
        description:
          'High usage of deprecated or legacy features despite available replacements',
        howToSpot:
          'Monitor usage metrics of old vs new feature versions; look for stagnant migration curves',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Version Fragmentation',
        description:
          'Significant portion of users on outdated software versions',
        howToSpot:
          'Check version distribution analytics; look for long tails of old versions with active users',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Low Feature Discovery',
        description:
          'New features have low adoption despite being well-promoted',
        howToSpot:
          'Compare feature awareness (seen promo) vs feature adoption (actually used) metrics',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Repetitive Workflows',
        description:
          'Users performing tasks manually when automation or shortcuts are available',
        howToSpot:
          'Track repeated manual actions that could be replaced by available but unused features',
        severity: ImpactLevel.LOW,
      },
    ],

    patterns: [
      {
        name: 'Default Persistence Pattern',
        description: 'Users keeping initial defaults unchanged over extended periods',
        indicators: [
          'Settings pages with near-zero modification rates',
          'Default notification preferences unchanged after months',
          'Default theme or layout never customized',
          'Pre-selected options in forms consistently unchanged',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Migration Resistance Pattern',
        description: 'Active resistance to version upgrades or platform changes',
        indicators: [
          'Users dismissing upgrade prompts repeatedly',
          'High support ticket volume around forced changes',
          'Workarounds to maintain old behavior after updates',
          'Community forums requesting "classic mode" or rollback',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Tool Lock-In Pattern',
        description: 'Users maintaining suboptimal tool choices despite better alternatives',
        indicators: [
          'Continued use of legacy integrations after modern replacements launch',
          'Manual processes persisting despite available automation',
          'Old file formats used when better options are supported',
          'External tools used for tasks the platform now handles natively',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Subscription Stagnation Pattern',
        description: 'Users staying on plans that no longer match their usage',
        indicators: [
          'Users on low tiers consistently hitting limits but not upgrading',
          'Users on high tiers with low utilization but not downgrading',
          'Free tier users eligible for better-fit paid plans',
          'Annual plan users not reviewing at renewal despite usage changes',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What percentage of users are still on default settings after 30 days?',
      'How long do users take to adopt new features after launch?',
      'What is the migration completion rate for version upgrades?',
      'Are there deprecated features still seeing significant usage?',
      'Do users perform manual tasks that available features could automate?',
      'How many steps does it take to switch from old to new workflows?',
      'Is there a clear escape hatch if users want to revert changes?',
      'Have we mapped all perceived switching costs (cognitive, procedural, emotional)?',
      'Are we introducing changes incrementally or all at once?',
      'Do power users and new users have different migration experiences?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in inertia bias and resistance to change.

Analyze the provided design for inertia bias patterns. Identify:

1. **Migration Friction**: How much effort is required to adopt new features or versions
2. **Default Power**: What defaults are set and how likely users are to change them
3. **Switching Costs**: Perceived and actual costs of changing behavior
4. **Change Communication**: How changes are introduced and communicated
5. **Reversibility**: Whether users can safely try new things and revert

For each pattern found:
- Identify where inertia creates barriers to beneficial user actions
- Assess the perceived vs actual switching cost
- Determine if the design reduces or increases change friction
- Evaluate whether defaults serve user interests or business interests
- Suggest improvements for smoother transitions

Consider:
- Are migration paths gradual and reversible?
- Do defaults align with user benefit, not just business metrics?
- Is there parallel access during transitions?
- Are power users given different migration experiences than new users?
- Is the interface leveraging inertia ethically (for good defaults) or exploiting it (trapping users)?

Provide actionable recommendations for reducing harmful inertia while leveraging beneficial inertia.`,

    outputSchema: {
      type: 'object',
      properties: {
        inertiaPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              perceivedSwitchingCost: { type: 'string' },
              actualSwitchingCost: { type: 'string' },
              userImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'perceivedSwitchingCost',
              'userImpact',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            migrationFriction: { type: 'number' },
            defaultQuality: { type: 'number' },
            reversibilityScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'migrationFriction',
            'defaultQuality',
            'reversibilityScore',
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
        'inertiaPatterns',
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
        title: 'Audit Current Inertia Points',
        description:
          'Map all places where users resist change: feature adoption, migrations, settings, upgrades',
        example:
          'Analytics show 78% of users on default settings after 6 months; only 23% adopted the new dashboard',
        tips: [
          'Use analytics to identify stale defaults and low-adoption features',
          'Survey users who haven\'t upgraded to understand their specific barriers',
          'Distinguish between users who prefer the old way and those who just haven\'t tried the new way',
        ],
      },
      {
        step: 2,
        title: 'Map Perceived Switching Costs',
        description:
          'For each inertia point, identify what users think the cost of change is versus the actual cost',
        example:
          'Users think migration takes 2 hours; actual migration takes 3 minutes with auto-import',
        tips: [
          'Interview users about what they think will happen if they switch',
          'Identify cognitive costs (learning), procedural costs (setup), and emotional costs (uncertainty)',
          'The gap between perceived and actual cost is your design opportunity',
        ],
      },
      {
        step: 3,
        title: 'Design Low-Friction Transition Paths',
        description:
          'Create migration experiences that minimize each identified switching cost',
        example:
          'One-click migration that auto-imports settings, shows a familiar layout, and offers a revert button',
        tips: [
          'Preserve everything possible: settings, data, customizations, shortcuts',
          'Show what stays the same before showing what changes',
          'Make the first experience with the new version as familiar as possible',
        ],
      },
      {
        step: 4,
        title: 'Provide Reversibility and Safety',
        description:
          'Ensure users can safely explore changes and revert if they choose',
        example:
          '"Try the new editor — switch back to classic anytime from the menu"',
        tips: [
          'Reversibility is the strongest antidote to change anxiety',
          'Even if few users revert, knowing they can reduces fear dramatically',
          'Track revert rates to identify pain points in the new experience',
        ],
      },
      {
        step: 5,
        title: 'Leverage Beneficial Defaults',
        description:
          'Set defaults that serve user interests, knowing inertia will maintain them',
        example:
          'Auto-enable automatic backups, security updates, and privacy protections',
        tips: [
          'Every default is an ethical decision — choose wisely',
          'Best defaults: beneficial for users, opt-out available, clearly communicated',
          'Worst defaults: beneficial for business at user expense, hidden opt-out',
        ],
      },
      {
        step: 6,
        title: 'Measure and Iterate',
        description:
          'Track adoption curves, revert rates, and satisfaction to refine migration paths',
        example:
          'Dashboard showing migration funnel: saw prompt → tried new version → stayed → reverted',
        tips: [
          'Track time-to-adoption, not just adoption rate',
          'Monitor support tickets around changes as a friction indicator',
          'Compare satisfaction between voluntary adopters and forced adopters',
        ],
      },
    ],

    dos: [
      'Design gradual migration paths with parallel access to old and new',
      'Emphasize what stays the same before introducing what changes',
      'Provide clear, easy revert options for any significant change',
      'Set defaults that serve user interests, not just business goals',
      'Surface new features within existing workflows rather than separate sections',
      'Segment migration experiences by user tenure and usage patterns',
      'Communicate changes with concrete benefits, not just "new and improved"',
      'Reduce perceived switching costs by showing the actual effort required',
      'Preserve user data, settings, and customizations during transitions',
      'Give users control over the pace of change in their experience',
    ],

    donts: [
      'Don\'t force abrupt, irreversible migrations on established users',
      'Don\'t remove features before replacements are proven and adopted',
      'Don\'t use the same migration approach for new and long-tenured users',
      'Don\'t assume objective superiority will overcome behavioral inertia',
      'Don\'t weaponize friction to trap users in subscriptions or plans',
      'Don\'t change keyboard shortcuts or gestures without opt-in',
      'Don\'t pre-check consent boxes and rely on inertia for compliance',
      'Don\'t ignore the emotional cost of change alongside the practical cost',
      'Don\'t treat low adoption as lack of awareness — it may be active resistance',
      'Don\'t redesign everything simultaneously; introduce changes incrementally',
    ],

    bestPractices: [
      {
        title: 'Parallel Access Periods',
        description:
          'Run old and new versions simultaneously, letting users toggle between them',
        rationale:
          'Removing risk of permanent commitment dramatically lowers perceived switching cost',
        example:
          'Gmail\'s classic-to-new interface transition allowed months of side-by-side access',
      },
      {
        title: 'Progressive Feature Introduction',
        description:
          'Introduce new capabilities within existing workflows rather than as separate destinations',
        rationale:
          'Users don\'t need to change their behavior to discover and adopt new features',
        example:
          'AI suggestions appearing within the text editor rather than requiring navigation to an AI panel',
      },
      {
        title: 'Continuity-First Communication',
        description:
          'When communicating changes, lead with what stays the same, then introduce what\'s new',
        rationale:
          'Users\' primary fear is losing their investment in learning the current system',
        example:
          '"Your projects, settings, and shortcuts are all here — plus these new capabilities"',
      },
      {
        title: 'Beneficial Default Leverage',
        description:
          'Set defaults that protect and help users, knowing most will keep them',
        rationale:
          'Inertia is a powerful force; use it to keep users in beneficial states',
        example:
          'Auto-enable 2FA, automatic backups, and privacy-preserving settings by default',
      },
      {
        title: 'Tenure-Aware Transitions',
        description:
          'Provide different migration experiences based on how long users have used the product',
        rationale:
          'Long-tenured users have deeper habits and higher perceived switching costs',
        example:
          'Power users get a detailed migration guide with shortcut mapping; new users get the new version directly',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Changing settings should not automatically cause unexpected changes of context',
        implementation:
          'When migrating users to new interfaces, never change context without explicit user action. Provide clear warnings before any change.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.1',
        guideline:
          'On Focus - Receiving focus should not trigger a change of context',
        implementation:
          'Migration prompts and upgrade nudges must not automatically switch the user\'s interface on focus or hover.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For actions that cause major changes, provide confirmation and reversibility',
        implementation:
          'All migration and upgrade actions must be confirmable and reversible. Provide clear undo mechanisms accessible to all users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.8',
        guideline:
          'Location - Users should always know where they are in the interface',
        implementation:
          'During transitions between old and new interfaces, clearly indicate which version the user is currently using and how to switch.',
      },
    ],

    ethics: [
      {
        concern: 'Subscription Trapping',
        severity: 'critical',
        explanation:
          'Making cancellation deliberately difficult to exploit user inertia and keep them paying',
        mitigation:
          'Cancellation must be as easy as sign-up (FTC "click-to-cancel" rule). Retain users through value, not friction.',
      },
      {
        concern: 'Dark Defaults',
        severity: 'critical',
        explanation:
          'Setting defaults that benefit the business at user expense, knowing most users won\'t change them',
        mitigation:
          'Defaults should serve user interests first. Pre-checked consent boxes and data-sharing defaults are unethical and often illegal.',
      },
      {
        concern: 'Forced Obsolescence',
        severity: 'high',
        explanation:
          'Deliberately degrading old versions to force migration rather than providing genuine value in the new version',
        mitigation:
          'Maintain reasonable functionality in old versions during transition periods. Earn migration through improvement, not deprecation.',
      },
      {
        concern: 'Exploiting Habit Dependence',
        severity: 'high',
        explanation:
          'Building features that create deep habits specifically to increase switching costs and lock users in',
        mitigation:
          'Build habits that serve users. Support data portability and interoperability so users stay by choice.',
      },
      {
        concern: 'Consent by Inertia',
        severity: 'critical',
        explanation:
          'Using pre-checked consent boxes for data collection, knowing inertia will prevent most users from unchecking',
        mitigation:
          'Use explicit opt-in for all consent. GDPR and many regulations require affirmative action for consent.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Power of Suggestion: Inertia in 401(k) Participation and Savings Behavior',
        author: 'Madrian, B. C., & Shea, D. F.',
        year: 2001,
        doi: '10.1162/00335530152466232',
        description:
          'Landmark study demonstrating how default enrollment dramatically affects retirement savings behavior through inertia',
        type: 'foundational',
      },
      {
        title: 'Status Quo Bias in Decision Making',
        author: 'Samuelson, W., & Zeckhauser, R.',
        year: 1988,
        doi: '10.1007/BF00055564',
        description:
          'Foundational work distinguishing status quo bias and inertia effects in decision-making',
        type: 'foundational',
      },
      {
        title: 'Defaults, Framing and Privacy: Why Opting In ≠ Opting Out',
        author: 'Johnson, E. J., Bellman, S., & Lohse, G. L.',
        year: 2002,
        doi: '10.1023/A:1015044207315',
        description:
          'Demonstrates that opt-in and opt-out produce dramatically different outcomes due to inertia',
        type: 'advanced',
      },
      {
        title: 'Saving More Tomorrow: Using Behavioral Economics to Increase Employee Saving',
        author: 'Thaler, R. H., & Benartzi, S.',
        year: 2004,
        doi: '10.1086/380085',
        description:
          'Shows how designing with inertia in mind can dramatically improve financial outcomes',
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
          'Comprehensive treatment of how defaults and inertia shape behavior, and how "choice architecture" can improve outcomes',
        type: 'foundational',
      },
      {
        title: 'The Power of Habit: Why We Do What We Do in Life and Business',
        author: 'Duhigg, Charles',
        year: 2012,
        isbn: '9780812981605',
        description:
          'Explores the neuroscience of habit formation and how behavioral inertia is built and broken',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the cognitive mechanisms behind inertia: System 1 automaticity and effort avoidance',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Default Effect: How to Leverage Defaults in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/the-default-effect/',
        description:
          'Practical UX guide on designing defaults that account for user inertia',
        type: 'practical',
      },
      {
        title: 'Overcoming Feature Resistance: Designing for Adoption',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/designing-for-adoption',
        description:
          'Strategies for overcoming user inertia when introducing new features',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice and Inertia',
        author: 'Barry Schwartz',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'TED talk covering how choice overload reinforces inertia and default behavior',
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
      'status-quo-bias',       // Preference for current state reinforces inertia
      'loss-aversion',         // Fear of losing what you have strengthens resistance to change
      'endowment-effect',      // Overvaluing what you already have increases switching costs
      'default-effect',        // Defaults persist due to inertia
      'sunk-cost-fallacy',     // Past investment reinforces commitment to current behavior
    ],

    conflicts: [
      'novelty-bias',          // Desire for new things can overcome inertia
      'curiosity-effect',      // Curiosity can motivate exploration past inertia
    ],

    confusedWith: [
      'status-quo-bias',       // Similar but status quo is preference; inertia is friction-driven
      'default-effect',        // Related but default effect is about initial settings specifically
      'habit-formation',       // Habits contribute to inertia but are a distinct mechanism
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'default-persistence',
        'migration-resistance',
        'tool-lock-in',
      ],
    },
  },
};
