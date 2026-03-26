/**
 * CONTEXT-DEPENDENT MEMORY
 *
 * Information is recalled more easily when the retrieval context
 * matches the encoding context.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const contextDependentMemory: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'context-dependent-memory',
    name: 'Context-Dependent Memory',
    aliases: ['Encoding Specificity', 'Environmental Context Effects', 'State-Dependent Learning'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'context',
      'learning',
      'recall',
      'environment',
      'onboarding',
      'navigation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We recall information better when the retrieval context matches the context in which we originally learned it.',

    detailed: `Context-dependent memory describes the phenomenon where information encoded in a particular environment, state, or setting is more easily retrieved when the same contextual cues are present during recall. The "context" can include physical environment, device, emotional state, surrounding UI elements, or even body posture.

In UX design, this means users who learn a workflow on desktop may struggle to reproduce it on mobile, or users who discover a feature through a specific navigation path may not find it when approaching from a different entry point. Consistent environments between learning and doing dramatically improve task completion and reduce cognitive load.

Designers can harness context-dependent memory by maintaining consistent layouts, placing help documentation in-context rather than in separate knowledge bases, using contextual tooltips over generic manuals, and ensuring that onboarding experiences mirror the actual usage environment as closely as possible.`,

    psychologyBasis: {
      discoveredBy: 'Duncan Godden and Alan Baddeley',
      year: 1975,
      theory: 'Encoding Specificity Principle (Tulving & Thomson, 1973)',
      mechanism: `Information is recalled more easily when the retrieval context matches the encoding context. This happens because:

1. **Contextual Encoding**: Memory traces are stored alongside environmental cues present during learning — sights, sounds, layout, and device form factor all become part of the memory
2. **Cue-Dependent Retrieval**: Recall is triggered by contextual cues that were associated with the original encoding; removing those cues weakens retrieval
3. **Reinstatement Effect**: Mentally or physically reinstating the original context improves recall, even when explicit memory fails
4. **Transfer-Appropriate Processing**: Memory performance improves when the cognitive processes at retrieval match those at encoding
5. **Environmental Overlap**: The greater the overlap between encoding and retrieval environments, the stronger the recall — explaining why in-situ help outperforms external documentation`,
    },

    realWorldExample: `In the classic 1975 underwater experiment, Godden and Baddeley had divers learn word lists either on dry land or underwater. Recall was approximately 50% better when the retrieval environment matched the learning environment — words learned underwater were recalled better underwater, and words learned on land were recalled better on land. The physical context acted as a powerful retrieval cue, even though the words themselves had nothing to do with the environment.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Context-dependent memory profoundly affects how users learn, remember, and perform tasks across interfaces. Designers can leverage this to:

- Maintain consistent UI environments between learning and usage phases
- Provide contextual help and documentation exactly where tasks are performed
- Support in-situ learning so users encode knowledge in the right context
- Use location-based and device-aware reminders tied to usage context
- Reduce cross-device friction by preserving contextual cues across platforms`,

    whenToUse: [
      {
        title: 'In-Context Help and Documentation',
        scenario:
          'When users need guidance while performing tasks',
        example:
          'Show tooltip walkthroughs and contextual hints directly within the feature, not in a separate help center',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding in the Real Environment',
        scenario: 'When teaching users how to use the product for the first time',
        example:
          'Run onboarding tours inside the actual interface with real data, not in a separate sandbox or static slideshow',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Consistent Layouts Across Flows',
        scenario: 'When users move between related tasks or sections',
        example:
          'Keep navigation, toolbar positions, and interaction patterns identical between the learning flow and the daily-use flow',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Location-Based Reminders',
        scenario: 'When actions are tied to physical or digital locations',
        example:
          'Trigger task reminders when the user returns to the same screen, tab, or physical location where the task was created',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Cross-Device Continuity',
        scenario: 'When users switch between mobile and desktop',
        example:
          'Preserve visual layout cues, color schemes, and navigation structure across devices so context carries over',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Recovery in Context',
        scenario: 'When users encounter errors and need to retry',
        example:
          'Return users to the exact screen and state where the error occurred, preserving all filled fields and selections',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Security-Sensitive Context Changes',
        reason:
          'Maintaining identical context can mask legitimate security warnings when the environment has actually changed',
        consequence:
          'Users may miss phishing indicators or security alerts because everything "looks the same"',
        alternative:
          'Deliberately break visual context for security-critical moments to force conscious attention',
      },
      {
        title: 'Redesigns and Migrations',
        reason:
          'Over-reliance on context-dependent memory means any layout change disrupts recall',
        consequence:
          'Users lose the ability to perform previously routine tasks after a UI update',
        alternative:
          'During redesigns, provide a transitional mode that maps old layouts to new ones',
      },
      {
        title: 'Over-Contextualizing Generic Knowledge',
        reason:
          'Some information should be recalled regardless of context (e.g., keyboard shortcuts, data formats)',
        consequence:
          'Users can only perform actions in one specific context, unable to generalize',
        alternative:
          'Teach transferable patterns through repetition across multiple contexts',
      },
      {
        title: 'Diverse User Environments',
        reason:
          'Users on assistive technologies, different screen sizes, or custom themes experience different contexts',
        consequence:
          'Context-dependent cues may not transfer to users in non-standard environments',
        alternative:
          'Provide multiple retrieval cues (visual, semantic, structural) so recall is robust across contexts',
      },
    ],

    commonMistakes: [
      {
        title: 'Teaching in a Sandbox, Using in Production',
        description:
          'Running onboarding in a demo environment that looks different from the real product',
        why: 'Skills learned in the sandbox context fail to transfer because retrieval cues are missing in production',
        fix: 'Run onboarding inside the actual product interface, using real (or realistic) user data',
      },
      {
        title: 'External Help Centers',
        description:
          'Routing users to a separate knowledge base or documentation site when they need help',
        why: 'Leaving the task context removes the environmental cues that support recall of the solution',
        fix: 'Embed help content inline — contextual tooltips, slide-out panels, or guided walkthroughs within the feature',
      },
      {
        title: 'Inconsistent Cross-Device Layouts',
        description:
          'Completely different navigation structures and visual hierarchies between mobile and desktop',
        why: 'Users who learn the desktop layout cannot leverage those context cues on mobile, and vice versa',
        fix: 'Maintain consistent information architecture, iconography, and interaction patterns across breakpoints',
      },
      {
        title: 'Drastic Redesigns Without Transition',
        description:
          'Launching a completely new UI overnight without contextual mapping to the old one',
        why: 'All previously encoded context cues become invalid, making expert users feel like beginners',
        fix: 'Provide guided transition overlays, "Where did X go?" helpers, or optional legacy layout modes',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout consistency is the strongest driver of context-dependent recall in interfaces',
        examples: [
          'Users recall features by their spatial position — moving a button breaks retrieval',
          'Consistent sidebar, header, and content area positions act as environmental context cues',
          'Grid layouts that stay stable between learning and usage improve task completion',
          'Modal and panel positions that match between onboarding and real use boost recall',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic consistency helps users recognize familiar contexts',
        examples: [
          'Consistent heading styles signal "same context" and support recall',
          'Typography changes between sections can unintentionally create context shifts',
          'Font pairing consistency between help docs and product UI aids transfer',
          'Label formatting that matches between learning and doing improves recognition',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color schemes serve as powerful environmental context cues for memory',
        examples: [
          'Consistent color coding between onboarding and usage reinforces context',
          'Section-specific accent colors help users orient and recall section-specific workflows',
          'Changing color themes between devices disrupts context-dependent recall',
          'Status colors (success/warning/error) act as context cues for appropriate actions',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns form the behavioral context for procedural memory',
        examples: [
          'Gestures learned in one view should work identically in similar views',
          'Keyboard shortcuts must be consistent across all sections of the app',
          'Drag-and-drop behaviors that change between contexts confuse procedural recall',
          'Click targets and interaction zones that shift between modes break muscle memory',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content placement and structure create the semantic context for recall',
        examples: [
          'Help text placed next to the relevant field is recalled better than help in a separate page',
          'Terminology consistency between docs and UI supports in-context retrieval',
          'Error messages shown in-place are more actionable than those in a toast',
          'Inline examples near input fields improve recall of expected formats',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users rely on structural and semantic context cues for recall',
        examples: [
          'Consistent ARIA landmark structure creates stable context for screen reader users',
          'Focus order consistency acts as a navigational context cue across sessions',
          'Screen reader users encode content by heading hierarchy — changes disrupt recall',
          'Keyboard navigation patterns that remain stable across views support procedural memory',
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
        title: 'In-Context Feature Walkthrough',
        description:
          'Onboarding tooltip that teaches a feature within the actual UI where it will be used',
        code: `<div class="report-builder">
  <div class="toolbar">
    <button class="btn" id="add-chart">
      <span class="icon">📊</span> Add Chart
    </button>
    <div class="contextual-tip" role="tooltip" aria-describedby="add-chart">
      <p><strong>Step 2 of 5:</strong> Click "Add Chart" to visualize your data.</p>
      <p class="hint">You'll use this button every time you build a report.</p>
      <div class="tip-actions">
        <button class="secondary">Skip Tour</button>
        <button class="primary">Got It</button>
      </div>
    </div>
  </div>
  <div class="canvas">
    <!-- Real report canvas, not a demo -->
  </div>
</div>`,
        explanation:
          'The tooltip teaches the feature in the exact location and context where the user will use it in the future. When they return to build a report, the same visual environment triggers recall of the learned workflow.',
        principle:
          'Learning in the usage context creates retrieval cues that persist into real tasks',
        metrics: {
          before: '38% of users completed their first report without help after sandbox onboarding',
          after: '67% completed their first report without help after in-context onboarding',
          improvement: '76% improvement in unassisted task completion',
        },
      },
      {
        title: 'Contextual Inline Help Panel',
        description:
          'Help documentation embedded as a slide-out panel within the feature, not a separate page',
        code: `<div class="settings-page">
  <div class="settings-form">
    <div class="field-group">
      <label for="api-key">API Key</label>
      <input type="text" id="api-key" />
      <button class="help-trigger" aria-expanded="false"
              aria-controls="api-help">
        Need help?
      </button>
    </div>
  </div>

  <aside id="api-help" class="contextual-help-panel" role="complementary">
    <h3>Setting Up Your API Key</h3>
    <ol>
      <li>Go to your provider dashboard</li>
      <li>Navigate to <strong>Settings → API Keys</strong></li>
      <li>Click <strong>Generate New Key</strong></li>
      <li>Paste the key in the field to the left</li>
    </ol>
    <p class="context-note">This key connects your account to the
    AI features you see in this settings panel.</p>
  </aside>
</div>`,
        explanation:
          'Help appears in-context, right next to the field it relates to. The user never leaves the settings page, so all environmental cues remain intact during learning and doing.',
        principle:
          'In-situ documentation preserves context cues, improving recall on subsequent visits',
      },
      {
        title: 'Cross-Device Layout Consistency',
        description:
          'Mobile and desktop versions maintain the same information architecture and visual structure',
        code: `<!-- Desktop -->
<div class="dashboard desktop">
  <nav class="sidebar">
    <a href="/projects" class="nav-item active">
      <span class="icon">📁</span> Projects
    </a>
    <a href="/analytics" class="nav-item">
      <span class="icon">📊</span> Analytics
    </a>
    <a href="/settings" class="nav-item">
      <span class="icon">⚙️</span> Settings
    </a>
  </nav>
  <main class="content"><!-- Content --></main>
</div>

<!-- Mobile: same order, same icons, same labels -->
<div class="dashboard mobile">
  <main class="content"><!-- Content --></main>
  <nav class="bottom-bar">
    <a href="/projects" class="nav-item active">
      <span class="icon">📁</span> Projects
    </a>
    <a href="/analytics" class="nav-item">
      <span class="icon">📊</span> Analytics
    </a>
    <a href="/settings" class="nav-item">
      <span class="icon">⚙️</span> Settings
    </a>
  </nav>
</div>`,
        explanation:
          'Same icons, same labels, same order across devices. A user who learns the navigation on desktop can leverage those cues on mobile because the semantic and visual context is preserved.',
        principle:
          'Consistent cues across contexts allow memory transfer between environments',
        metrics: {
          before: '52% task success on mobile for desktop-trained users (with different nav)',
          after: '84% task success on mobile for desktop-trained users (with consistent nav)',
          improvement: '62% improvement in cross-device task completion',
        },
      },
    ],

    bad: [
      {
        title: 'Sandbox Onboarding with Fake Data',
        description:
          'Teaching users in a demo environment that looks nothing like their real workspace',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-sandbox">
  <h2>Welcome! Let's learn the basics.</h2>
  <div class="demo-workspace" style="background: #f0f8ff;">
    <p class="demo-label">DEMO MODE - Not your real data</p>
    <div class="fake-sidebar">
      <a>Sample Project A</a>
      <a>Sample Project B</a>
    </div>
    <div class="fake-content">
      <p>Click the blue button to add a sample chart...</p>
      <button style="background: blue; color: white;">Add Sample Chart</button>
    </div>
  </div>
</div>`,
        explanation:
          'The demo environment has different colors, different data, different labels, and a different layout than the real product. Skills learned here will not transfer because all context cues are mismatched.',
        principle:
          'Mismatched encoding and retrieval contexts prevent memory transfer',
      },
      {
        title: 'Help Documentation on a Separate Site',
        description:
          'Linking users out to an external docs site when they need help mid-task',
        code: `<!-- DON'T DO THIS -->
<div class="form-field">
  <label>Configure Webhook URL</label>
  <input type="url" placeholder="https://..." />
  <a href="https://docs.example.com/webhooks"
     target="_blank"
     class="help-link">
    Read documentation ↗
  </a>
</div>`,
        explanation:
          'Opening documentation in a new tab removes all environmental context. The user reads instructions in one context (docs site) but must apply them in another (the product), breaking context-dependent retrieval.',
        principle:
          'Context switches between learning and doing impair recall and increase errors',
      },
      {
        title: 'Complete UI Overhaul Without Transition',
        description:
          'Launching a total redesign that changes every visual cue overnight',
        code: `<!-- DON'T DO THIS -->
<!-- Before: Users have learned this layout over months -->
<nav class="top-nav horizontal">
  <a>Dashboard</a> | <a>Reports</a> | <a>Settings</a>
</nav>

<!-- After: Everything moved, no transition help -->
<nav class="left-sidebar vertical">
  <a><icon>grid</icon> Overview</a>
  <a><icon>chart</icon> Analytics</a>
  <a><icon>gear</icon> Preferences</a>
</nav>
<!-- Labels renamed, position changed, orientation changed -->`,
        explanation:
          'Every context cue users relied on for recall has changed: position (top to left), orientation (horizontal to vertical), labels (Reports to Analytics, Settings to Preferences). Expert users are forced back to novice-level performance.',
        principle:
          'Destroying all encoded context cues forces users to relearn from scratch',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Gmail Contextual Compose',
        description: 'Gmail keeps the compose window within the inbox view, so users draft emails in the same context where they read them. Reply windows appear inline within the conversation thread, maintaining full environmental context during the response task.',
        effectiveness: 'very-effective',
        analysis: 'By keeping composition in the reading context, users can reference the original message and surrounding emails without a context switch, dramatically reducing errors and forgotten details in replies.',
      },
      {
        company: 'Figma',
        product: 'In-Canvas Comments',
        description: 'Figma places comments directly on the design canvas, pinned to the exact element being discussed. Feedback is encoded and retrieved in the same spatial context as the design work.',
        effectiveness: 'very-effective',
        analysis: 'Designers recall feedback more accurately because the comment appears in the exact visual location where the change needs to happen. The spatial context serves as a powerful retrieval cue.',
      },
      {
        company: 'Notion',
        product: 'Consistent Cross-Platform Layout',
        description: 'Notion maintains nearly identical sidebar navigation, page structure, and block layouts across web, desktop, and mobile apps. Users who learn the interface on one platform can transfer that knowledge seamlessly.',
        effectiveness: 'effective',
        analysis: 'Preserving visual and structural consistency across platforms allows context-dependent memory to transfer between devices, reducing the learning curve on each new platform to near zero.',
      },
      {
        company: 'Duolingo',
        product: 'Lesson-Context Practice',
        description: 'Duolingo teaches vocabulary within themed lesson contexts (restaurant, travel, workplace) and later tests recall within the same thematic framing, using matching illustrations and scenarios.',
        effectiveness: 'effective',
        analysis: 'By matching the thematic context between learning and testing, Duolingo leverages context-dependent memory to improve vocabulary recall. Users associate words with the visual and narrative context of the lesson.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: In-Context Walkthrough vs Separate Tutorial',
        hypothesis:
          'Users who complete onboarding within the real product UI will have higher task completion rates than those who learn in a separate tutorial',
        controlVersion: {
          description:
            'Separate tutorial page with screenshots and step-by-step instructions, opened in a new tab before the user enters the product',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '4:20',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'In-context tooltip walkthrough that guides users through their first task inside the actual product interface with their real data',
          metrics: {
            conversionRate: '68%',
            timeOnPage: '2:45',
            scrollDepth: '88%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'In-context onboarding increased first-task completion by 66%. Users spent less time overall but engaged more deeply. Seven-day retention was 34% higher for the in-context group, suggesting lasting context-dependent recall.',
          learnings: [
            'Learning in the usage context creates durable retrieval cues',
            'Users completed tasks faster because environmental cues triggered recall',
            'Separate tutorials created a context gap that hindered knowledge transfer',
            'In-context onboarding also reduced support ticket volume by 28%',
          ],
        },
      },
      {
        title: 'Help System: Inline Panel vs External Knowledge Base',
        hypothesis:
          'Contextual help shown in-panel will lead to faster problem resolution than linking to an external knowledge base',
        controlVersion: {
          description:
            'Help links that open the external documentation site in a new tab, where users search for their issue',
          metrics: {
            conversionRate: '53%',
            clickThroughRate: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Inline help panel that slides out within the current page, showing relevant documentation based on the user\'s current location and task',
          metrics: {
            conversionRate: '79%',
            clickThroughRate: '45%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Inline contextual help increased resolution rate by 49%. Users were twice as likely to click for help when it stayed in-context. Average resolution time dropped from 6.2 minutes to 2.8 minutes.',
          learnings: [
            'Preserving task context during help-seeking dramatically improves outcomes',
            'Users avoided external help links due to context-switch aversion',
            'In-context help was recalled and reused on subsequent sessions without needing help again',
            'The slide-out panel preserved all environmental cues for context-dependent recall',
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
        name: 'Context Mismatch Between Learning and Doing',
        description:
          'Onboarding or tutorial environments that look visually different from the production interface',
        howToSpot:
          'Compare the onboarding flow side-by-side with the real product — do colors, layouts, and labels match?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'External Help Links',
        description:
          'Help buttons or links that navigate users away from the current page to a separate documentation site',
        howToSpot:
          'Look for "Learn more" or "Read docs" links with target="_blank" or that navigate away from the current context',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Cross-Device Layout Inconsistency',
        description:
          'Navigation, icons, or information architecture that differs significantly between mobile and desktop',
        howToSpot:
          'Compare navigation order, icon usage, and labeling across breakpoints — are the same cues present?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Post-Redesign Disorientation Indicators',
        description:
          'Spikes in support tickets, search queries, or error rates after a UI update',
        howToSpot:
          'Monitor support channels after releases for "where did X go?" patterns and increased help-seeking behavior',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Decontextualized Error Messages',
        description:
          'Error messages displayed in global toasts or separate pages rather than inline near the source',
        howToSpot:
          'Check whether error feedback appears at the point of the problem or in a disconnected location',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Context Preservation Pattern',
        description: 'Design maintains consistent environmental cues between learning and usage phases',
        indicators: ['In-context onboarding within real UI', 'Inline help panels instead of external links', 'Consistent layout across related views', 'Error messages at point of occurrence'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Context Fragmentation Pattern',
        description: 'Design breaks environmental context during critical user tasks',
        indicators: ['Separate tutorial or sandbox environment', 'Help documentation on external site', 'Modal dialogs that obscure working context', 'Navigation changes between task steps'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Cross-Context Consistency Pattern',
        description: 'Design maintains retrieval cues across devices, themes, or modes',
        indicators: ['Matching navigation order on mobile and desktop', 'Consistent iconography across platforms', 'Stable information architecture across themes', 'Persistent spatial arrangements'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Contextual Cueing Pattern',
        description: 'Design uses environmental cues to trigger recall of previously learned behaviors',
        indicators: ['Location-based reminders or suggestions', 'Page-specific tips based on user history', 'Returning users to their last context on login', 'Visual markers at previously visited features'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the onboarding environment visually match the production interface?',
      'Is help content available inline, or does it require a context switch?',
      'Are navigation structure and labels consistent across devices and breakpoints?',
      'Do users return to the same context after interruptions (login, errors, notifications)?',
      'Are contextual cues (icons, colors, positions) stable across related views?',
      'After a redesign, is there a transition mechanism mapping old context to new?',
      'Do error messages appear in the context where the error occurred?',
      'Are tooltips and guides shown in-situ rather than in a separate walkthrough?',
      'Can users who learned on one device perform the same tasks on another?',
      'Does the design preserve task state when users navigate away and return?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in context-dependent memory.

Analyze the provided design for context-dependent memory patterns. Identify:

1. **Context Consistency**: How well learning and usage environments match
2. **In-Context Help**: Whether documentation and guidance appear within the task context
3. **Cross-Device Continuity**: How well contextual cues transfer across platforms
4. **Contextual Cueing**: Whether the design uses environmental cues to trigger recall
5. **Context Fragmentation**: Where context switches may disrupt user memory

For each pattern found:
- Identify the encoding context (where users learn)
- Identify the retrieval context (where users perform)
- Assess the overlap between encoding and retrieval environments
- Determine if context gaps may impair task completion
- Suggest improvements for better context alignment

Consider:
- Do onboarding and tutorials match the real product environment?
- Is help available in-situ, or does it require a context switch?
- Are layouts, labels, and cues consistent across devices?
- Do redesigns preserve enough context cues for existing users?
- Are there accessibility implications for context-dependent memory?

Provide actionable recommendations for strengthening context-dependent recall.`,

    outputSchema: {
      type: 'object',
      properties: {
        contextPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              encodingContext: { type: 'string' },
              retrievalContext: { type: 'string' },
              overlapScore: { type: 'number' },
              impactOnRecall: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'encodingContext',
              'retrievalContext',
              'overlapScore',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            contextConsistency: { type: 'number' },
            inSituHelp: { type: 'number' },
            crossDeviceContinuity: { type: 'number' },
            transitionSupport: { type: 'number' },
          },
          required: [
            'contextConsistency',
            'inSituHelp',
            'crossDeviceContinuity',
            'transitionSupport',
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
        'contextPatterns',
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
        title: 'Audit Context Alignment',
        description:
          'Map all learning contexts (onboarding, help, tutorials) against their corresponding usage contexts',
        example:
          'Compare screenshot of onboarding step 3 with the actual settings page — note every visual difference',
        tips: [
          'Check color schemes, layout positions, and label text',
          'Verify that demo data looks like real user data',
          'Ensure navigation paths match between learning and doing',
        ],
      },
      {
        step: 2,
        title: 'Move Help In-Context',
        description:
          'Replace external documentation links with inline, contextual help panels',
        example:
          'Convert "Read docs" link to a slide-out panel showing the same content within the current page',
        tips: [
          'Use progressive disclosure: summary first, details on demand',
          'Anchor help content to the specific field or feature it describes',
          'Preserve the user\'s form state and scroll position when help opens',
        ],
      },
      {
        step: 3,
        title: 'Standardize Cross-Device Cues',
        description:
          'Ensure navigation order, iconography, and labels are identical across breakpoints',
        example:
          'Same five nav items, same icons, same labels on desktop sidebar and mobile bottom bar',
        tips: [
          'Prioritize consistency over platform conventions when they conflict',
          'Use the same icon set across all platforms',
          'Maintain label text even if icon-only modes are available',
        ],
      },
      {
        step: 4,
        title: 'Design Transition Bridges for Redesigns',
        description:
          'When updating the UI, provide mapping from old context cues to new ones',
        example:
          'Show a "What\'s changed" overlay that highlights where familiar features moved',
        tips: [
          'Offer an optional "classic layout" toggle for a transition period',
          'Use guided tours that point from old locations to new ones',
          'Communicate changes before they happen with preview modes',
        ],
      },
      {
        step: 5,
        title: 'Preserve and Restore Context',
        description:
          'Save user context (scroll position, open panels, selected tabs) and restore it on return',
        example:
          'When a user logs back in, return them to the exact page, scroll position, and panel state they left',
        tips: [
          'Use session storage for ephemeral context, local storage for persistent context',
          'Restore context after errors, page refreshes, and session timeouts',
          'Show a "Welcome back" indicator confirming context restoration',
        ],
      },
    ],

    dos: [
      'Run onboarding inside the real product interface with real data',
      'Place help content inline, adjacent to the feature it supports',
      'Maintain consistent layouts, icons, and labels across all devices',
      'Restore user context (scroll, state, selection) when they return',
      'Provide transition guides when redesigning to map old cues to new ones',
      'Keep error messages at the point of failure, not in a disconnected toast',
      'Use the same terminology in documentation, UI labels, and onboarding',
      'Test cross-device task completion to verify context transfer',
    ],

    donts: [
      'Don\'t teach in a sandbox that looks different from the real product',
      'Don\'t link users to external documentation sites mid-task',
      'Don\'t use completely different layouts on mobile vs desktop',
      'Don\'t redesign everything at once without transition support',
      'Don\'t change navigation labels or icon meanings across sections',
      'Don\'t show error feedback in a location disconnected from the error source',
      'Don\'t reset user context on every login or page refresh',
      'Don\'t assume users can transfer knowledge between mismatched environments',
    ],

    bestPractices: [
      {
        title: 'In-Situ Learning Over Separate Tutorials',
        description:
          'Teach users within the exact interface where they will perform tasks',
        rationale:
          'Context-dependent memory ensures skills transfer when encoding and retrieval environments match',
        example:
          'Tooltip walkthrough inside the report builder, using the user\'s own data',
      },
      {
        title: 'Contextual Help Panels',
        description:
          'Embed documentation in slide-out panels within the feature, not external pages',
        rationale:
          'Preserving environmental context during help-seeking improves comprehension and recall',
        example:
          'A help panel that opens beside the API key field, showing steps without leaving the settings page',
      },
      {
        title: 'Cross-Platform Cue Consistency',
        description:
          'Maintain identical navigation order, icons, and labels across all platforms and devices',
        rationale:
          'Consistent cues allow context-dependent memory to transfer across environments',
        example:
          'Same five nav items in the same order with the same icons on web, iOS, and Android',
      },
      {
        title: 'Context Restoration on Return',
        description:
          'Save and restore the user\'s working context when they return to the app',
        rationale:
          'Matching the retrieval environment to the last encoding environment supports seamless recall',
        example:
          'Restoring the user\'s last-viewed project, scroll position, and open panels on login',
      },
      {
        title: 'Gradual Redesign Migration',
        description:
          'When updating UI, change incrementally and provide mapping from old to new',
        rationale:
          'Preserving some context cues during transitions prevents total recall failure',
        example:
          'A "What\'s new" overlay showing where each familiar feature moved in the redesign',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation - Navigation mechanisms repeated on multiple pages occur in the same relative order',
        implementation:
          'Maintain identical navigation order across all pages and breakpoints to support context-dependent recall for all users, including those using assistive technologies.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Components with the same functionality are identified consistently',
        implementation:
          'Use the same labels, icons, and ARIA attributes for identical functions across all contexts so screen reader users can leverage context-dependent recall.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.8',
        guideline:
          'Location - Information about the user\'s location within a set of pages is available',
        implementation:
          'Provide breadcrumbs, highlighted nav items, and page titles that reinforce context, helping users orient and triggering context-dependent recall.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - Provide error suggestions in context',
        implementation:
          'Display error messages and suggestions inline next to the field where the error occurred, maintaining context for recall of the correction.',
      },
    ],

    ethics: [
      {
        concern: 'Artificial Context Lock-In',
        severity: 'high',
        explanation:
          'Deliberately making interfaces context-dependent to prevent users from switching to competitors',
        mitigation:
          'Design for transferable patterns that use common conventions. Support data export and standard interaction patterns.',
      },
      {
        concern: 'Redesign-Induced Helplessness',
        severity: 'high',
        explanation:
          'Forcing drastic UI changes that destroy users\' encoded context, making them dependent on paid support',
        mitigation:
          'Provide free transition guides, legacy modes, and gradual migration paths for all users.',
      },
      {
        concern: 'Context-Dependent Dark Patterns',
        severity: 'critical',
        explanation:
          'Placing cancellation or downgrade flows in a completely different context from sign-up to hinder recall',
        mitigation:
          'Ensure account management flows use the same navigation, layout, and terminology as onboarding flows.',
      },
      {
        concern: 'Exclusion of Diverse Contexts',
        severity: 'medium',
        explanation:
          'Optimizing context cues only for the majority use case, leaving assistive technology users or mobile users without matching retrieval cues',
        mitigation:
          'Test context consistency across all supported devices, screen readers, and accessibility modes.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Context-Dependent Memory in Two Natural Environments: On Land and Underwater',
        author: 'Godden, D. R., & Baddeley, A. D.',
        year: 1975,
        doi: '10.1111/j.2044-8295.1975.tb01468.x',
        description:
          'The foundational underwater study demonstrating that recall is ~50% better when encoding and retrieval contexts match',
        type: 'foundational',
      },
      {
        title: 'Encoding Specificity and Retrieval Processes in Episodic Memory',
        author: 'Tulving, E., & Thomson, D. M.',
        year: 1973,
        doi: '10.1037/h0020071',
        description:
          'Introduced the encoding specificity principle: retrieval cues are effective only if they match information encoded during learning',
        type: 'foundational',
      },
      {
        title: 'Environmental Context-Dependent Memory: A Review and Meta-Analysis',
        author: 'Smith, S. M., & Vela, E.',
        year: 2001,
        doi: '10.3758/BF03196157',
        description:
          'Comprehensive meta-analysis of environmental context effects on memory, clarifying boundary conditions',
        type: 'advanced',
      },
      {
        title: 'Transfer-Appropriate Processing in Human Memory',
        author: 'Morris, C. D., Bransford, J. D., & Franks, J. J.',
        year: 1977,
        doi: '10.1016/S0022-5371(77)80016-9',
        description:
          'Demonstrates that memory is strongest when processing at retrieval matches processing at encoding',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Memory: From Mind to Molecules',
        author: 'Squire, L. R., & Kandel, E. R.',
        year: 2008,
        isbn: '9780981519418',
        description:
          'Comprehensive coverage of human memory systems including context-dependent effects',
        type: 'foundational',
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman, Don',
        year: 2013,
        isbn: '9780465050659',
        description:
          'Covers environmental cues, affordances, and consistent design that support context-dependent recall',
        type: 'practical',
      },
      {
        title: 'Designing with the Mind in Mind',
        author: 'Johnson, Jeff',
        year: 2020,
        isbn: '9780128182024',
        description:
          'Practical guide to cognitive psychology in UI design, including memory and context effects',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Recognition Over Recall in User Interfaces',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/recognition-and-recall/',
        description:
          'Practical guide to designing for human memory limitations, with context-aware design patterns',
        type: 'practical',
      },
      {
        title: 'The Role of Context in UX Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/context-in-ux-design',
        description:
          'How environmental and usage context shapes user experience and memory',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Context-Dependent Memory',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/watch?v=context-dependent-memory',
        description:
          'Accessible explanation of context-dependent memory with Godden and Baddeley study details',
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
      'state-dependent-memory', // Emotional state as context matches environmental context
      'encoding-specificity', // The theoretical framework underlying context-dependent memory
      'recognition-over-recall', // In-context cues support recognition, reducing recall burden
      'consistency-principle', // Consistent design directly supports context-dependent recall
    ],

    conflicts: [
      'novelty-effect', // Novel interfaces break context but attract attention
      'change-blindness', // Users may not notice context changes that affect recall
    ],

    confusedWith: [
      'state-dependent-memory', // State-dependent is internal (mood), context-dependent is external (environment)
      'priming', // Priming is activation by prior stimuli, not environmental context matching
      'mere-exposure-effect', // Familiarity from repetition, not context alignment
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'environmental-context-effects',
        'encoding-specificity',
        'transfer-appropriate-processing',
      ],
    },
  },
};
