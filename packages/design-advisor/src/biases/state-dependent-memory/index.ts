/**
 * STATE-DEPENDENT MEMORY
 *
 * Information learned in a particular state is best recalled
 * in that same state — physical, emotional, or chemical.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const stateDependentMemory: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'state-dependent-memory',
    name: 'State-Dependent Memory',
    aliases: ['State-Dependent Learning', 'Context-Dependent Memory', 'Encoding Specificity'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'context',
      'consistency',
      'session-continuity',
      'cross-device',
      'environment',
      'recall',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We recall information better when we are in the same state — physical, emotional, or environmental — as when we first learned it.',

    detailed: `State-dependent memory is the phenomenon whereby information encoded in a particular internal or external state is most effectively retrieved when the individual returns to that same state. The "state" can be physiological (caffeine, fatigue), emotional (happy, stressed), or environmental (location, device, UI layout).

In UX design, this bias has profound implications for cross-device experiences, session continuity, and interface consistency. When a user learns a workflow on desktop, switching to mobile with a radically different layout disrupts recall. When a user configures settings in one emotional context (calm onboarding) but needs them in another (urgent troubleshooting), retrieval suffers.

Designers who maintain consistent environments, preserve user context across sessions, and support "continue where you left off" patterns directly leverage state-dependent memory to reduce cognitive load and improve task completion.`,

    psychologyBasis: {
      discoveredBy: 'Donald Goodwin, Birte Powell, and colleagues',
      year: 1969,
      theory: 'Encoding Specificity Principle (Tulving & Thomson, 1973)',
      mechanism: `Memory encoding binds information to the internal and external context present at the time of learning. Retrieval is most efficient when the retrieval context matches the encoding context. This happens because:

1. **Encoding Specificity**: The brain stores contextual cues alongside the target information, creating a composite memory trace
2. **State as Retrieval Cue**: The physiological or emotional state at encoding becomes part of the retrieval key — matching states unlock matching memories
3. **Context Reinstatement**: Returning to the original environment (or a similar one) reactivates the neural pathways used during encoding
4. **Asymmetric Transfer**: Skills learned in State A transfer poorly to State B, even when the underlying knowledge is identical
5. **Mood Congruence**: Emotional states act as powerful filters — happy states facilitate recall of happy memories, stressed states recall stressful experiences`,
    },

    realWorldExample: `In Goodwin et al.'s 1969 study, participants who learned word lists while intoxicated recalled them significantly better when intoxicated again, compared to when sober — and vice versa. Eich (1980) extended this to mood states, showing that words learned in a happy mood were recalled better when happy again. In digital contexts, users who learn a dashboard layout on their work monitor often struggle to find the same features on a laptop screen or mobile device, because the spatial and environmental cues have changed.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `State-dependent memory affects how users recall learned workflows, find previously used features, and navigate familiar interfaces across different contexts. Designers can leverage this to:

- Maintain consistent UX environments so learned patterns transfer across sessions
- Preserve user context (scroll position, open panels, selected filters) between visits
- Support session continuity with "continue where you left off" patterns
- Ensure cross-device experiences share enough visual and structural similarity for recall
- Reduce re-learning costs by keeping layouts stable across updates`,

    whenToUse: [
      {
        title: 'Cross-Device Consistency',
        scenario:
          'When users switch between desktop, tablet, and mobile to complete the same tasks',
        example:
          'Maintain the same navigation structure, icon placement, and terminology across breakpoints so spatial memory transfers between devices',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Session Restoration',
        scenario:
          'When users return to an application after hours, days, or weeks away',
        example:
          'Restore open tabs, scroll positions, selected filters, and in-progress forms so users re-enter the same state they left',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Consistent Layout Across Updates',
        scenario:
          'When shipping redesigns or feature updates to an existing product',
        example:
          'Preserve the location of critical controls (save, undo, navigation) across versions so muscle memory and spatial recall still work',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding-to-Production Continuity',
        scenario:
          'When users transition from a guided onboarding flow into the full product',
        example:
          'Use the same interface during onboarding that users will see in production — avoid separate "tutorial mode" UIs that create encoding in a non-matching state',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Context Preservation in Multitasking',
        scenario:
          'When users switch between multiple tasks, tabs, or workspaces within an application',
        example:
          'Preserve the state of each workspace independently so users can return to exactly where they left off in each context',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Error Recovery in Familiar Context',
        scenario:
          'When users encounter errors and need to recall troubleshooting steps',
        example:
          'Present error resolution flows in the same UI context where the error occurred, rather than redirecting to a separate help center',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Necessary Layout Changes for Accessibility',
        reason:
          'Maintaining layout consistency should not override accessibility improvements',
        consequence:
          'Users with disabilities may be unable to use the interface if outdated layouts are preserved for consistency alone',
        alternative:
          'Introduce accessibility improvements with clear migration guidance and transitional cues',
      },
      {
        title: 'Security-Critical State Changes',
        reason:
          'Some state changes (re-authentication, session timeouts) are necessary for security',
        consequence:
          'Preserving state across security boundaries could expose sensitive data',
        alternative:
          'Clearly communicate state resets required for security, and restore non-sensitive context after re-authentication',
      },
      {
        title: 'Outdated or Harmful Patterns',
        reason:
          'Maintaining consistency with a poor original design perpetuates usability problems',
        consequence:
          'Users keep struggling with bad patterns because "that is how it has always been"',
        alternative:
          'Use phased migration with side-by-side comparison, progressive disclosure of changes, and explicit walkthroughs',
      },
    ],

    commonMistakes: [
      {
        title: 'Radically Different Mobile Layouts',
        description:
          'Restructuring navigation and information hierarchy completely between desktop and mobile',
        why: 'Users who learned the desktop layout cannot find features on mobile because spatial and structural cues no longer match',
        fix: 'Maintain consistent information architecture and navigation ordering across breakpoints, adapting presentation without reorganizing structure',
      },
      {
        title: 'Losing User Context on Return',
        description:
          'Resetting the application to a default state every time a user returns',
        why: 'Users expect to resume where they left off; a fresh state forces them to re-navigate and re-establish context',
        fix: 'Persist session state (scroll position, open panels, active filters, in-progress work) and restore it on return',
      },
      {
        title: 'Tutorial Environments That Do Not Match Production',
        description:
          'Using a simplified or separate UI for onboarding that differs from the real product',
        why: 'Skills encoded in the tutorial environment do not transfer to the production environment because the retrieval context is different',
        fix: 'Conduct onboarding within the actual product interface, using overlays or highlights rather than a separate tutorial mode',
      },
      {
        title: 'Moving Controls in Redesigns',
        description:
          'Relocating frequently used buttons, menus, or shortcuts during a UI refresh',
        why: 'Users have encoded the physical location of controls; changing positions breaks spatial and motor memory',
        fix: 'Keep critical controls in the same positions. If relocation is necessary, provide a transition period with both old and new placements or clear migration cues',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Spatial consistency is the primary vehicle for state-dependent recall in interfaces',
        examples: [
          'Consistent placement of navigation, search, and primary actions across pages',
          'Maintaining grid structure and content zones across breakpoints',
          'Preserving sidebar, header, and content area relationships across sessions',
          'Keeping critical controls in the same position after redesigns',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typographic consistency supports environmental familiarity but is a secondary cue',
        examples: [
          'Consistent heading hierarchy helps users orient within familiar content structures',
          'Maintaining font choices across platforms reinforces environmental similarity',
          'Label consistency helps users recognize controls across devices',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color schemes act as environmental context cues that support state matching',
        examples: [
          'Consistent color coding across devices helps users identify sections by color memory',
          'Theme consistency (light/dark) between sessions preserves environmental context',
          'Status colors (red=error, green=success) must remain consistent for recall',
          'Brand color consistency across platforms reinforces "same place" recognition',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns are deeply encoded as procedural memory tied to context',
        examples: [
          'Gesture patterns (swipe, pinch, long-press) must be consistent across views',
          'Keyboard shortcuts learned in one context should work in related contexts',
          'Drag-and-drop behaviors should remain consistent across sessions and devices',
          'Form submission flows should follow the same steps on every visit',
        ],
      },
      content: {
        level: ImpactLevel.MEDIUM,
        description:
          'Content structure and terminology serve as retrieval cues for learned workflows',
        examples: [
          'Consistent terminology across help docs, UI labels, and onboarding reduces state mismatch',
          'Menu item naming and ordering should remain stable across versions',
          'Error messages should use the same language used during onboarding',
          'Feature names should match across marketing, onboarding, and in-product usage',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users rely heavily on consistent structure for navigation recall',
        examples: [
          'Screen reader users encode page structure through heading order — changing it disrupts recall',
          'Keyboard navigation sequences become procedural memory — consistent tab order is essential',
          'ARIA landmarks provide structural cues that must remain stable across sessions',
          'Focus management patterns must be consistent so users can predict where focus will land',
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
        title: 'Continue Where You Left Off',
        description:
          'Application restoring the user\'s exact workspace state on return',
        code: `<div class="session-restore">
  <div class="welcome-back">
    <h3>Welcome back, Sarah</h3>
    <p>We saved your workspace from Tuesday at 3:42 PM</p>
  </div>
  <div class="restored-state">
    <div class="open-tabs">
      <span class="tab active">Q4 Report (editing)</span>
      <span class="tab">Team Dashboard</span>
      <span class="tab">Settings</span>
    </div>
    <div class="context-info">
      <p>3 filters applied &middot; Sorted by date &middot; Row 47 of 892</p>
    </div>
  </div>
  <div class="actions">
    <button class="primary">Resume Where I Left Off</button>
    <button class="secondary">Start Fresh</button>
  </div>
</div>`,
        explanation:
          'By restoring open tabs, scroll position, applied filters, and sort order, the user returns to the same cognitive state as their last session. The retrieval context matches the encoding context, enabling immediate productivity.',
        principle:
          'Matching retrieval context to encoding context maximizes recall and reduces re-orientation time',
        metrics: {
          before: 'Average 2.3 minutes to re-orient after returning to the app',
          after: 'Average 18 seconds to resume work with session restore',
          improvement: '87% reduction in re-orientation time',
        },
      },
      {
        title: 'Cross-Device Layout Consistency',
        description:
          'Dashboard maintaining the same structural layout across desktop and tablet',
        code: `<!-- Desktop Layout -->
<div class="dashboard desktop">
  <nav class="sidebar-left">
    <a href="/home">Home</a>
    <a href="/analytics">Analytics</a>
    <a href="/reports">Reports</a>
    <a href="/settings">Settings</a>
  </nav>
  <main class="content">
    <header class="top-bar">
      <input type="search" placeholder="Search...">
      <button class="profile">SC</button>
    </header>
    <section class="widgets"><!-- Dashboard content --></section>
  </main>
</div>

<!-- Tablet Layout — same structure, adapted presentation -->
<div class="dashboard tablet">
  <nav class="sidebar-left collapsed">
    <!-- Same order, same icons, collapsible -->
    <a href="/home" aria-label="Home"><svg>...</svg></a>
    <a href="/analytics" aria-label="Analytics"><svg>...</svg></a>
    <a href="/reports" aria-label="Reports"><svg>...</svg></a>
    <a href="/settings" aria-label="Settings"><svg>...</svg></a>
  </nav>
  <main class="content">
    <header class="top-bar">
      <input type="search" placeholder="Search...">
      <button class="profile">SC</button>
    </header>
    <section class="widgets"><!-- Same widget order --></section>
  </main>
</div>`,
        explanation:
          'The navigation stays on the left with the same ordering. The search bar and profile button remain in the top-right. Widget order is preserved. Users switching from desktop to tablet find everything where they expect it because the spatial cues match.',
        principle:
          'Structural consistency across devices preserves spatial memory and enables cross-context recall',
      },
      {
        title: 'In-Context Onboarding',
        description:
          'Teaching features within the production interface rather than a separate tutorial',
        code: `<div class="production-dashboard">
  <!-- Actual dashboard UI, not a tutorial simulation -->
  <div class="widget" data-onboarding-step="1">
    <div class="onboarding-highlight active">
      <div class="tooltip">
        <h4>Your Analytics Widget</h4>
        <p>Click any metric to drill down into details.
        This is your actual data — try it now.</p>
        <button class="primary">Got it</button>
      </div>
    </div>
    <h3>Page Views</h3>
    <span class="metric">12,847</span>
    <span class="trend up">+14%</span>
  </div>
</div>`,
        explanation:
          'Onboarding happens inside the real product interface with real data. Users encode feature locations and workflows in the exact context they will use them, ensuring strong state-dependent recall when they return independently.',
        principle:
          'Encoding in the production context ensures retrieval cues match when users work independently',
      },
    ],

    bad: [
      {
        title: 'Completely Reorganized Mobile Navigation',
        description:
          'Mobile app with entirely different navigation structure from desktop',
        code: `<!-- DON'T DO THIS -->
<!-- Desktop: sidebar navigation -->
<nav class="sidebar">
  <a href="/dashboard">Dashboard</a>
  <a href="/projects">Projects</a>
  <a href="/team">Team</a>
  <a href="/analytics">Analytics</a>
  <a href="/settings">Settings</a>
</nav>

<!-- Mobile: bottom tabs with different grouping and order -->
<nav class="bottom-tabs">
  <a href="/home">Home</a>       <!-- "Dashboard" renamed -->
  <a href="/activity">Activity</a> <!-- New category -->
  <a href="/search">Search</a>     <!-- Not in desktop nav -->
  <a href="/more">More</a>         <!-- Projects, Team, Analytics, Settings buried here -->
</nav>`,
        explanation:
          'The mobile navigation renames items, introduces new categories, and buries four desktop sections under "More". Users who learned the desktop layout cannot transfer that knowledge to mobile. The retrieval context is completely different from the encoding context.',
        principle:
          'Structural mismatches between devices break state-dependent retrieval of learned navigation patterns',
      },
      {
        title: 'Full State Reset on Every Visit',
        description:
          'Application that discards all user context between sessions',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <!-- Always starts at default view, ignoring user's last state -->
  <div class="default-view">
    <h2>Welcome to Your Dashboard</h2>
    <p>Select a project to get started</p>
    <!-- No memory of: last project, applied filters,
         scroll position, open panels, or in-progress work -->
  </div>
</div>`,
        explanation:
          'Forcing users to re-navigate to their working context every time they return wastes time and breaks the state-dependent link between where they were and what they were doing. The encoding context (mid-task, specific filters applied) cannot be reinstated.',
        principle:
          'Destroying session state forces users to re-establish context from scratch, negating state-dependent recall',
      },
      {
        title: 'Separate Tutorial Environment',
        description:
          'Onboarding in a sandboxed UI that looks nothing like the real product',
        code: `<!-- DON'T DO THIS -->
<!-- Tutorial mode: simplified, different layout -->
<div class="tutorial-sandbox">
  <div class="tutorial-sidebar">
    <h3>Step 3 of 7</h3>
    <p>Click the blue button to create a report</p>
  </div>
  <div class="simplified-ui">
    <button class="tutorial-create-btn blue large">
      Create Report
    </button>
  </div>
</div>

<!-- Real product: completely different layout and styling -->
<div class="real-product">
  <nav class="toolbar">
    <button class="small icon-btn" title="New Report">
      <svg><!-- small icon --></svg>
    </button>
  </nav>
</div>`,
        explanation:
          'Users learn to click a large blue button in a simplified layout, but the real product uses a small icon button in a toolbar. The tutorial context does not match the production context, so learned actions fail to transfer.',
        principle:
          'Skills encoded in a mismatched tutorial environment produce poor retrieval in the real product environment',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Drive / Docs Cross-Device Experience',
        description:
          'Google maintains consistent toolbar positioning, menu structure, and keyboard shortcuts across desktop web, mobile web, and native apps. Users switching devices find controls in familiar locations.',
        effectiveness: 'very-effective',
        analysis:
          'By preserving structural consistency across platforms, Google leverages state-dependent memory so users can transfer learned workflows between devices with minimal re-learning.',
      },
      {
        company: 'Apple',
        product: 'Handoff and Continuity',
        description:
          'Apple\'s Handoff feature lets users start a task on iPhone and continue on Mac (or vice versa) with the exact same document state, scroll position, and editing context preserved.',
        effectiveness: 'very-effective',
        analysis:
          'Handoff is a direct implementation of state-dependent memory principles: it reinstates the encoding context on a new device, enabling seamless recall and task continuation.',
      },
      {
        company: 'Figma',
        product: 'Browser Tab Session Persistence',
        description:
          'Figma preserves the exact canvas position, zoom level, selected layers, and open panels when users close and reopen a file. Users return to the same visual context they left.',
        effectiveness: 'effective',
        analysis:
          'By restoring the precise workspace state, Figma ensures the retrieval context matches the encoding context, letting designers resume complex spatial work without re-orientation.',
      },
      {
        company: 'VS Code',
        product: 'Workspace State Restoration',
        description:
          'VS Code restores open files, cursor positions, terminal state, split editor layouts, and even unsaved changes when reopening a workspace.',
        effectiveness: 'very-effective',
        analysis:
          'Developers build deep procedural memory around their workspace layout. By restoring the complete environmental context, VS Code minimizes the state-dependent recall gap between sessions.',
      },
    ],

    abTests: [
      {
        title: 'Session Restore vs Fresh Start',
        hypothesis:
          'Restoring previous session state will reduce time-to-productivity on return visits',
        controlVersion: {
          description:
            'Application starts at default dashboard view on every login, requiring users to navigate to their previous working context',
          metrics: {
            conversionRate: '62% task completion within 5 minutes',
            timeOnPage: '2:18 average re-orientation time',
            scrollDepth: '34% used advanced filters',
          },
        },
        treatmentVersion: {
          description:
            'Application restores previous session: open tabs, applied filters, scroll position, and active document. Shows "Resume where you left off" prompt.',
          metrics: {
            conversionRate: '89% task completion within 5 minutes',
            timeOnPage: '0:22 average re-orientation time',
            scrollDepth: '67% used advanced filters',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Session restore reduced re-orientation time by 84% and increased task completion by 44%. Advanced filter usage nearly doubled, suggesting users who had previously configured filters were discouraged from re-applying them in the control condition.',
          learnings: [
            'Users strongly prefer resuming context over starting fresh',
            'Re-orientation time is a significant hidden cost in productivity applications',
            'Preserved filter/sort state drives continued use of advanced features',
            'Offering both "Resume" and "Start Fresh" satisfied all user preferences',
          ],
        },
      },
      {
        title: 'Consistent vs Reorganized Mobile Navigation',
        hypothesis:
          'Mobile navigation that mirrors desktop structure will improve cross-device task completion',
        controlVersion: {
          description:
            'Mobile app with redesigned navigation: different ordering, renamed sections, and features regrouped into new categories',
          metrics: {
            conversionRate: '41% cross-device task completion',
            timeOnPage: '3:45 average time to find feature on mobile after learning on desktop',
          },
        },
        treatmentVersion: {
          description:
            'Mobile app with navigation mirroring desktop: same section names, same ordering, adapted visual presentation only',
          metrics: {
            conversionRate: '73% cross-device task completion',
            timeOnPage: '1:12 average time to find feature on mobile after learning on desktop',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Structurally consistent mobile navigation increased cross-device task completion by 78% and reduced feature-finding time by 68%. Users explicitly reported "knowing where things are" on mobile after using desktop.',
          learnings: [
            'Navigation structure is a primary retrieval cue for state-dependent memory',
            'Renaming sections between devices disrupts recall even when the underlying feature is identical',
            'Visual adaptation (collapsing, resizing) is far less disruptive than structural reorganization',
            'Consistency benefits compound over time as users build stronger cross-device mental models',
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
        name: 'Layout Inconsistency Across Breakpoints',
        description:
          'Navigation, content zones, or primary actions placed in different locations on different screen sizes',
        howToSpot:
          'Compare the desktop and mobile versions side by side — check if navigation ordering, feature grouping, and control placement are structurally consistent',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Session State Indicators',
        description:
          'No evidence that the application remembers the user\'s previous context (last page, filters, scroll position)',
        howToSpot:
          'Close the app, reopen it, and check whether you return to where you left off or to a default state',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Separate Tutorial UI',
        description:
          'Onboarding or tutorial flows that use a different layout, styling, or interaction model from the production interface',
        howToSpot:
          'Compare the onboarding screens to the actual product interface — look for structural, visual, or interaction differences',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Relocated Controls After Redesign',
        description:
          'Frequently used buttons, menus, or shortcuts moved to new positions in a UI update',
        howToSpot:
          'Compare before and after screenshots of a redesign — note any controls that changed position or hierarchy level',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Inconsistent Terminology',
        description:
          'Features or sections renamed between platforms, versions, or contexts (e.g., "Projects" on desktop, "Workspaces" on mobile)',
        howToSpot:
          'Audit labels across all platforms and entry points for the same feature — check for naming mismatches',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Context Preservation Pattern',
        description:
          'Application saves and restores user state across sessions and devices',
        indicators: [
          '"Continue where you left off" prompts',
          'Persisted scroll positions and open panels',
          'Restored filters, sorts, and view configurations',
          'Synced state across devices',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Structural Consistency Pattern',
        description:
          'Consistent information architecture and spatial layout across breakpoints and platforms',
        indicators: [
          'Same navigation ordering on desktop, tablet, and mobile',
          'Consistent placement of search, profile, and primary actions',
          'Matching feature grouping and hierarchy across devices',
          'Stable control positions across redesigns',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'In-Context Learning Pattern',
        description:
          'Onboarding and help delivered within the production interface rather than a separate environment',
        indicators: [
          'Overlay tooltips on actual UI elements',
          'Interactive walkthroughs using real data',
          'Contextual help panels adjacent to the relevant feature',
          'No separate "tutorial mode" or sandbox environment',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Environmental Continuity Pattern',
        description:
          'Visual and interactive consistency that maintains the "same place" feeling across sessions',
        indicators: [
          'Consistent color themes and branding across sessions',
          'Matching keyboard shortcuts and gesture patterns',
          'Stable typography and spacing systems',
          'Predictable animation and transition patterns',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the application restore previous session state when users return?',
      'Is the navigation structure consistent across desktop, tablet, and mobile?',
      'Are feature names and labels identical across all platforms and entry points?',
      'Do frequently used controls stay in the same position across redesigns?',
      'Does onboarding take place inside the production interface?',
      'Can users pick up tasks on a different device without re-learning the layout?',
      'Are keyboard shortcuts and gestures consistent across related views?',
      'Does the application persist user preferences (theme, filters, view mode) across sessions?',
      'Are there clear signals when state has been preserved vs reset?',
      'Has the design been tested for cross-device task continuation?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in state-dependent memory.

Analyze the provided design for state-dependent memory patterns. Identify:

1. **Context Preservation**: How well the application saves and restores user state across sessions
2. **Cross-Device Consistency**: Whether navigation, layout, and controls maintain structural similarity across breakpoints
3. **Onboarding-Production Match**: Whether learning environments match the production interface
4. **Redesign Stability**: Whether UI updates preserve the spatial location of frequently used controls
5. **Terminology Consistency**: Whether feature names and labels match across all contexts

For each pattern found:
- Assess how well the retrieval context matches the encoding context
- Identify state mismatches that could impair recall
- Determine the severity of any context discontinuity
- Suggest improvements for better state-dependent retrieval

Consider:
- Can users resume tasks without re-orientation after returning?
- Do cross-device transitions preserve enough structural similarity for recall?
- Does onboarding encode skills in the same context where they will be used?
- Have redesigns preserved spatial memory for critical controls?
- Are there environmental cues (color, layout, terminology) that reinforce "same place" recognition?

Provide actionable recommendations for maximizing context consistency and state-dependent recall.`,

    outputSchema: {
      type: 'object',
      properties: {
        statePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              encodingContext: { type: 'string' },
              retrievalContext: { type: 'string' },
              contextMatch: { type: 'string' },
              recallImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'encodingContext',
              'retrievalContext',
              'contextMatch',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            sessionContinuity: { type: 'number' },
            crossDeviceConsistency: { type: 'number' },
            onboardingMatch: { type: 'number' },
            redesignStability: { type: 'number' },
          },
          required: [
            'sessionContinuity',
            'crossDeviceConsistency',
            'onboardingMatch',
            'redesignStability',
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
        'statePatterns',
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
        title: 'Audit Context Consistency',
        description:
          'Map every surface where users interact with your product and identify structural, terminological, and visual inconsistencies',
        example:
          'Create a matrix of navigation items across desktop, mobile, and tablet — flag any reordering, renaming, or missing items',
        tips: [
          'Compare screenshots of the same feature across all breakpoints',
          'Check that feature names match exactly across platforms',
          'Verify that keyboard shortcuts are consistent across views',
        ],
      },
      {
        step: 2,
        title: 'Implement Session State Persistence',
        description:
          'Save the user\'s working context (open documents, scroll position, filters, view mode) and restore it on return',
        example:
          'Store last-active tab, applied filters, sort order, and scroll position in user preferences; restore on next login',
        tips: [
          'Persist state server-side so it works across devices',
          'Distinguish between temporary state (scroll position) and durable state (view preferences)',
          'Provide a "Start Fresh" option alongside "Resume"',
        ],
      },
      {
        step: 3,
        title: 'Unify Cross-Device Navigation',
        description:
          'Ensure the information architecture and navigation structure are consistent across all device sizes',
        example:
          'Use the same navigation ordering on mobile (in a hamburger or bottom nav) as on desktop (in a sidebar)',
        tips: [
          'Adapt presentation (collapse, resize) without reorganizing structure',
          'Keep feature groupings identical across breakpoints',
          'Maintain the same icon + label associations everywhere',
        ],
      },
      {
        step: 4,
        title: 'Conduct Onboarding In-Context',
        description:
          'Teach users within the production interface using overlays, tooltips, and guided actions on real UI elements',
        example:
          'Highlight the actual "Create Report" button with a tooltip, rather than simulating it in a sandbox',
        tips: [
          'Use real data during onboarding when possible',
          'Avoid separate tutorial modes or sandboxed environments',
          'Let users interact with real controls during learning',
        ],
      },
      {
        step: 5,
        title: 'Stabilize Critical Controls in Redesigns',
        description:
          'When updating the UI, preserve the spatial location of frequently used actions',
        example:
          'Keep "Save", "Undo", search, and navigation in the same positions even during a visual refresh',
        tips: [
          'Identify highest-frequency actions via analytics before redesigning',
          'If relocation is necessary, provide transitional cues (e.g., "This moved here")',
          'Phase changes gradually rather than shipping a complete restructure at once',
        ],
      },
      {
        step: 6,
        title: 'Test Cross-Context Task Completion',
        description:
          'Measure whether users can successfully complete tasks started in one context when continuing in another',
        example:
          'Have users learn a workflow on desktop, then attempt it on mobile — measure completion rate and time',
        tips: [
          'Test device switching, session resumption, and post-redesign workflows',
          'Measure time-to-productivity after context changes',
          'Survey users about their confidence finding features across contexts',
        ],
      },
    ],

    dos: [
      'Persist and restore user session state across visits',
      'Maintain consistent navigation structure across all breakpoints',
      'Keep feature names and labels identical across platforms',
      'Conduct onboarding within the production interface',
      'Preserve the spatial location of critical controls during redesigns',
      'Sync user preferences and state across devices',
      'Use the same icons, colors, and visual cues for the same features everywhere',
      'Provide clear signals when context has been preserved or restored',
      'Test cross-device and cross-session task continuation',
      'Phase redesign changes gradually to support adaptation',
    ],

    donts: [
      'Don\'t reorganize navigation structure between desktop and mobile',
      'Don\'t rename features across platforms or versions',
      'Don\'t reset user state to defaults on every login',
      'Don\'t create tutorial environments that differ from the production UI',
      'Don\'t move frequently used controls during redesigns without transition support',
      'Don\'t use different interaction patterns for the same action across devices',
      'Don\'t discard user context (filters, scroll position, selections) between sessions',
      'Don\'t change keyboard shortcuts between application versions',
    ],

    bestPractices: [
      {
        title: 'Treat Layout as a Retrieval Cue',
        description:
          'Spatial position is one of the strongest retrieval cues in interfaces. Treat it as a commitment, not a convenience.',
        rationale:
          'Users encode feature locations as spatial memory. Changing positions breaks retrieval without changing the underlying capability.',
        example:
          'Navigation on the left, search top-right, primary action bottom-right — and keep it that way across all breakpoints and versions',
      },
      {
        title: 'Build Session Continuity as a Core Feature',
        description:
          'Treat session state persistence as a product feature, not a nice-to-have',
        rationale:
          'Every state reset is a context switch that imposes cognitive load. Eliminating resets directly improves productivity.',
        example:
          'Implement a session state service that persists open tabs, filters, scroll positions, and in-progress edits, with server-side sync for cross-device access',
      },
      {
        title: 'Adapt Presentation, Not Structure',
        description:
          'When designing responsive layouts, change the visual presentation (size, spacing, collapse) without changing the information architecture',
        rationale:
          'Users navigate by structure, not by pixel position. Preserving structural relationships enables cross-device recall.',
        example:
          'Desktop sidebar becomes a collapsed icon rail on tablet and a bottom sheet on mobile — but the items, their order, and their grouping remain identical',
      },
      {
        title: 'Use Transitional Cues During Changes',
        description:
          'When layout changes are unavoidable, provide explicit cues that help users map old locations to new ones',
        rationale:
          'Transitional cues bridge the gap between the old encoding context and the new retrieval context',
        example:
          '"Settings has moved! It\'s now in the top-right menu" — shown once after a redesign, with a visual indicator pointing to the new location',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation - Navigation mechanisms that appear on multiple pages must occur in the same relative order each time',
        implementation:
          'Maintain identical navigation ordering across all pages, breakpoints, and sessions. Use semantic HTML and ARIA landmarks to reinforce structural consistency for assistive technologies.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Components with the same functionality must be identified consistently',
        implementation:
          'Use identical labels, icons, and ARIA descriptions for the same feature across all platforms and contexts. Never rename a feature between desktop and mobile.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.8',
        guideline:
          'Location - Provide information about the user\'s location within a set of pages',
        implementation:
          'Use breadcrumbs, active navigation states, and page titles consistently so users can orient themselves in the same way across sessions and devices.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.3',
        guideline:
          'Focus Order - Ensure consistent, meaningful focus order across views and sessions',
        implementation:
          'Maintain the same tab order for navigation and controls across pages and breakpoints. Screen reader and keyboard users build procedural memory from consistent focus sequences.',
      },
    ],

    ethics: [
      {
        concern: 'Forced Familiarity Lock-In',
        severity: 'medium',
        explanation:
          'Over-leveraging state-dependent memory to make switching to a competitor feel unnaturally difficult',
        mitigation:
          'Consistency should serve the user\'s productivity, not create artificial switching costs. Support data export and standard interaction patterns.',
      },
      {
        concern: 'Resistance to Necessary Change',
        severity: 'medium',
        explanation:
          'Using state-dependent memory as justification to avoid fixing known usability problems or accessibility issues',
        mitigation:
          'User familiarity is valuable but must be weighed against measurable improvements. Use phased transitions with clear migration support.',
      },
      {
        concern: 'False Continuity',
        severity: 'high',
        explanation:
          'Restoring an outdated or stale session state that no longer reflects current data, giving users a false sense of being up-to-date',
        mitigation:
          'Clearly indicate when restored state may be stale. Show timestamps, highlight data changes since last visit, and offer a refresh option.',
      },
      {
        concern: 'Privacy in State Persistence',
        severity: 'high',
        explanation:
          'Persisting session state that contains sensitive information (search queries, viewed content, form inputs) across shared devices',
        mitigation:
          'Respect privacy boundaries in session persistence. Do not restore sensitive state on shared or public devices. Tie state persistence to authenticated sessions only.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Alcohol and Recall: State-Dependent Effects in Man',
        author: 'Goodwin, D. W., Powell, B., Bremer, D., Hoine, H., & Stern, J.',
        year: 1969,
        doi: '10.1126/science.163.3873.1358',
        description:
          'The landmark study demonstrating state-dependent learning in humans using alcohol as the state variable',
        type: 'foundational',
      },
      {
        title: 'The Cue-Dependent Nature of State-Dependent Retrieval',
        author: 'Eich, J. E.',
        year: 1980,
        doi: '10.3758/BF03198239',
        description:
          'Extended state-dependent memory to mood and emotional states, demonstrating mood-congruent recall effects',
        type: 'foundational',
      },
      {
        title: 'Encoding Specificity and Retrieval Processes in Episodic Memory',
        author: 'Tulving, E., & Thomson, D. M.',
        year: 1973,
        doi: '10.1037/h0020071',
        description:
          'The theoretical framework (encoding specificity principle) that explains why state-dependent memory occurs',
        type: 'foundational',
      },
      {
        title: 'Context-Dependent Memory in Two Natural Environments: On Land and Underwater',
        author: 'Godden, D. R., & Baddeley, A. D.',
        year: 1975,
        doi: '10.1111/j.2044-8295.1975.tb01468.x',
        description:
          'Classic study showing divers recalled words better in the same environment (land or underwater) where they learned them',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Elements of Episodic Memory',
        author: 'Tulving, Endel',
        year: 1983,
        isbn: '9780198521259',
        description:
          'Comprehensive treatment of episodic memory including encoding specificity and context-dependent retrieval',
        type: 'foundational',
      },
      {
        title: 'Memory in Context: Context in Memory',
        author: 'Davies, G. M., & Thomson, D. M.',
        year: 1988,
        isbn: '9780471919827',
        description:
          'Edited volume covering context-dependent and state-dependent memory research and applications',
        type: 'advanced',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Practical UX guide emphasizing consistency, convention, and reducing cognitive load — directly applicable to state-dependent memory in interfaces',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Role of Consistency in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/consistency-and-standards/',
        description:
          'Practical guide to maintaining consistency across interfaces, supporting state-dependent recall of learned patterns',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Context-Dependent Memory',
        author: 'Psych Explained',
        url: 'https://www.youtube.com/watch?v=context-dependent-memory',
        description:
          'Explanation of state-dependent and context-dependent memory with classic study examples',
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
      'consistency-principle',  // Consistent UX reinforces state-dependent recall
      'recognition-over-recall', // Familiar layouts support recognition-based retrieval
      'cognitive-load',         // Context preservation reduces extraneous cognitive load
      'serial-position-effect', // First/last learned in a state are recalled best
    ],

    conflicts: [
      'novelty-effect',         // Novel interfaces disrupt state-dependent retrieval
      'progressive-disclosure', // Gradually revealing UI changes encoding context over time
    ],

    confusedWith: [
      'context-dependent-memory', // Overlapping concept — context is external environment, state is internal
      'mood-congruent-memory',    // Subset: emotional state specifically as the retrieval cue
      'transfer-appropriate-processing', // Related but focuses on processing type, not state
    ],

    hierarchy: {
      parent: 'encoding-specificity',
      children: [
        'mood-congruent-memory',
        'drug-dependent-memory',
        'environment-dependent-memory',
      ],
    },
  },
};
