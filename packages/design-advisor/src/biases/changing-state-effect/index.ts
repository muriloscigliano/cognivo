/**
 * CHANGING STATE EFFECT
 *
 * Changing stimuli are more disruptive to memory than steady-state stimuli.
 * Variation in background conditions captures attention and interferes with cognitive processing.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const changingStateEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'changing-state-effect',
    name: 'Changing State Effect',
    aliases: ['Changing-State Irrelevant Sound Effect', 'Auditory Distraction Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory',
      'attention',
      'distraction',
      'focus',
      'cognitive-load',
      'notifications',
      'animation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'Changing stimuli disrupt memory and focus more than steady-state stimuli.',

    detailed: `The Changing State Effect describes how varying or fluctuating background stimuli are far more disruptive to short-term memory and cognitive performance than constant, unchanging stimuli. Originally observed in auditory research, the principle extends broadly to visual and interactive environments.

In UX design, this means that animations, notifications, layout shifts, and other dynamic changes in the interface capture involuntary attention and interfere with users' ability to encode, process, and retrieve information. A single persistent banner is far less disruptive than a stream of varied notifications, and a stable layout during data entry preserves cognitive resources far better than one with shifting elements.

Designers who understand this effect can reduce unnecessary variation during focused tasks, stabilize layouts during reading and data entry, and reserve dynamic changes for moments when capturing attention is genuinely beneficial.`,

    psychologyBasis: {
      discoveredBy: 'Dylan M. Jones et al.',
      year: 1992,
      theory: 'Changing State Hypothesis / Object-Oriented Episodic Record Model',
      mechanism: `Changing stimuli disrupt memory because the brain automatically processes transitions between successive states. This happens because:

1. **Obligatory Processing**: The auditory and visual systems involuntarily process changes in the environment, diverting resources from the primary task
2. **Order Disruption**: Changing-state stimuli interfere with the serial ordering mechanisms used in short-term memory, scrambling the sequence of items being held in working memory
3. **Attentional Capture**: Variation between successive stimuli triggers an orienting response, pulling attention away from focal processing
4. **Interference with Rehearsal**: Dynamic changes interrupt the subvocal rehearsal loop that maintains items in working memory
5. **Steady-State Habituation**: Constant stimuli allow habituation, freeing cognitive resources, while changing stimuli prevent habituation from occurring`,
    },

    realWorldExample: `In Jones et al.'s (1992) experiments, participants tried to remember sequences of digits while exposed to background sounds. When the sounds varied (e.g., changing tones or different spoken letters), serial recall performance dropped significantly compared to steady-state sounds (e.g., a single repeated tone) or silence. Crucially, the disruption was driven by acoustic variation between successive items, not by the loudness or meaningfulness of the sound.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Changing State Effect has direct implications for how dynamic elements in interfaces affect user focus and task performance. Designers must carefully manage visual and auditory variation to:

- Minimize animations and transitions during data entry and focused reading
- Stabilize layouts to prevent content shifting that disrupts comprehension
- Control notification frequency and variation to protect user focus
- Reserve dynamic UI changes for intentional attention capture
- Provide focus modes that suppress non-essential state changes`,

    whenToUse: [
      {
        title: 'Focus Mode Design',
        scenario:
          'When users need sustained concentration for complex tasks like writing, coding, or data analysis',
        example:
          'Suppress all non-critical notifications, animations, and UI changes during focus mode; show only a minimal, stable interface',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Data Entry Stability',
        scenario: 'When users are entering information into forms or spreadsheets',
        example:
          'Freeze layout, disable auto-suggestions that shift content, and suppress notification badges during active input',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Reading Experience',
        scenario: 'When users are reading long-form content or documentation',
        example:
          'Use reader modes that strip away sidebars, ads, and animated elements to create a steady-state visual environment',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Notification Consolidation',
        scenario: 'When multiple notifications arrive in sequence',
        example:
          'Batch notifications into a single summary rather than delivering them as a stream of varied individual alerts',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Intentional Attention Capture',
        scenario: 'When a genuinely critical event requires immediate user attention',
        example:
          'Use a single, clear state change (e.g., one animation or sound) for critical alerts, making it stand out precisely because the rest of the interface is stable',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Engagement-Driven Interfaces',
        reason:
          'Social feeds and discovery interfaces rely on changing content to sustain engagement',
        consequence:
          'Eliminating all variation in a browsing context can make the experience feel static and unresponsive',
        alternative:
          'Allow variation in browsing modes but provide a way to transition to a focused, stable mode when consuming specific content',
      },
      {
        title: 'Real-Time Monitoring',
        reason:
          'Dashboards for system health, trading, or operations need live-updating data',
        consequence:
          'Suppressing state changes could cause users to miss critical events',
        alternative:
          'Use smooth, predictable update patterns (e.g., in-place number transitions) rather than jarring layout shifts',
      },
      {
        title: 'Gamification and Rewards',
        reason:
          'Celebratory animations and feedback loops are intentional attention-grabbers',
        consequence:
          'Removing all dynamic feedback can make achievements feel unrewarding',
        alternative:
          'Use brief, contained celebrations that do not persist or interfere with subsequent tasks',
      },
    ],

    commonMistakes: [
      {
        title: 'Overusing Micro-Animations',
        description:
          'Adding subtle animations to every UI element (hover effects, loading shimmers, transition sweeps) during focused workflows',
        why: 'Each animation is a state change that the brain involuntarily processes, collectively fragmenting attention',
        fix: 'Reserve animations for meaningful state transitions; use instant or near-instant changes for routine interactions',
      },
      {
        title: 'Unconstrained Notification Streams',
        description:
          'Delivering every notification individually as it arrives, creating a constant stream of varied interruptions',
        why: 'Each new notification is a changing state that resets the disruption cycle, preventing habituation',
        fix: 'Batch notifications by priority and time window; present summaries rather than individual items',
      },
      {
        title: 'Layout Shifts During Reading',
        description:
          'Loading ads, images, or dynamic content that shifts text position while the user is reading',
        why: 'Content shifts force the user to relocate their reading position, disrupting comprehension and memory encoding',
        fix: 'Reserve space for dynamic content before it loads; use skeleton screens with fixed dimensions',
      },
      {
        title: 'Ignoring Cumulative Load',
        description:
          'Treating each individual animation or notification as harmless while ignoring their combined effect',
        why: 'The changing state effect is cumulative; many small state changes aggregate into significant disruption',
        fix: 'Audit the total number of state changes per screen per minute; set budgets for dynamic elements',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout stability is essential for preventing changing-state disruption during focused tasks',
        examples: [
          'Cumulative Layout Shift (CLS) directly measures this disruptive effect on reading',
          'Fixed-position sidebars and headers prevent content reflow that breaks focus',
          'Skeleton screens with accurate dimensions eliminate loading-triggered layout shifts',
          'Stable grid structures allow users to build reliable spatial memory of interface elements',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text stability supports uninterrupted reading and comprehension',
        examples: [
          'Font loading strategies (font-display: swap with matched fallbacks) prevent text reflow',
          'Fixed line heights and paragraph spacing prevent content jumps as fonts load',
          'Stable text containers prevent rewrapping that disrupts reading position',
          'Consistent text rendering avoids flicker between font weights during loading',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color changes are state changes that capture involuntary attention',
        examples: [
          'Flashing or pulsing color indicators create high-disruption changing states',
          'Notification badge color changes pull attention even in peripheral vision',
          'Smooth, gradual color transitions are less disruptive than abrupt switches',
          'Reducing color variation in non-critical elements helps maintain focus',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive feedback patterns determine the frequency and intensity of state changes users experience',
        examples: [
          'Auto-saving indicators that flash briefly are less disruptive than persistent animated spinners',
          'Hover effects that trigger layout changes (expanding cards, tooltip shifts) disrupt adjacent content reading',
          'Debounced search suggestions prevent rapid-fire UI changes during typing',
          'Progressive disclosure reduces the number of simultaneous state changes',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content loading and update patterns directly affect the volume of state changes users encounter',
        examples: [
          'Infinite scroll that inserts content above the viewport causes disorienting position shifts',
          'Auto-refreshing feeds create a stream of changing states that prevent deep reading',
          'Carousel auto-rotation produces continuous state changes in the user periphery',
          'Live counters and tickers create persistent changing-state distractions',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Users with attention disorders or cognitive disabilities are disproportionately affected by changing states',
        examples: [
          'WCAG 2.2.2 requires pause/stop/hide for auto-updating content to protect users from involuntary distraction',
          'prefers-reduced-motion media query allows users to opt out of animations system-wide',
          'Screen reader users experience state changes as announcement interruptions that break reading flow',
          'Users with ADHD are significantly more susceptible to involuntary attention capture from changing states',
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
        title: 'Distraction-Free Writing Mode',
        description:
          'Document editor that suppresses all UI variation during focused writing',
        code: `<div class="editor-focus-mode">
  <div class="toolbar" aria-hidden="true" style="opacity: 0; transition: opacity 200ms;">
    <!-- Toolbar fades away, no animations while hidden -->
  </div>
  <article class="content-area" role="main">
    <div class="writing-surface" contenteditable="true">
      <!-- Stable, full-width surface with no sidebars or dynamic elements -->
    </div>
  </article>
  <!-- Notifications queued silently, shown only on exit -->
  <div class="notification-queue" aria-live="off"></div>
</div>

<style>
.editor-focus-mode {
  /* No animations, no layout shifts, no distractions */
  background: var(--cg-color-surface);
}
.editor-focus-mode .writing-surface {
  max-width: 42rem;
  margin: 0 auto;
  line-height: var(--cg-line-height-relaxed);
}
</style>`,
        explanation:
          'By removing all dynamic elements, the interface creates a steady-state environment. The brain can habituate to the static surroundings and devote full processing capacity to writing.',
        principle:
          'Eliminating state changes during focused tasks preserves working memory for the primary activity',
        metrics: {
          before: 'Users reported losing train of thought 4.2 times per 30-minute session',
          after: 'Focus mode reduced interruptions to 1.1 times per 30-minute session',
          improvement: '74% reduction in self-reported focus interruptions',
        },
      },
      {
        title: 'Batched Notification Summary',
        description:
          'Messaging app that consolidates notifications instead of delivering them individually',
        code: `<div class="notification-summary" role="status" aria-live="polite">
  <h4>While you were focused (last 45 min)</h4>
  <ul class="summary-list">
    <li>
      <span class="count">3</span>
      <span class="source">messages from Design Team</span>
    </li>
    <li>
      <span class="count">1</span>
      <span class="source">comment on your pull request</span>
    </li>
    <li>
      <span class="count">2</span>
      <span class="source">calendar reminders</span>
    </li>
  </ul>
  <button class="review-btn">Review All</button>
</div>`,
        explanation:
          'Instead of 6 separate notifications each causing a state change, one consolidated summary delivers all information in a single, predictable update. This preserves focus while ensuring nothing is missed.',
        principle:
          'One summary state change is far less disruptive than multiple varied individual changes',
      },
      {
        title: 'Stable Data Entry Form',
        description:
          'Form that prevents layout shifts during user input',
        code: `<form class="stable-form">
  <div class="field-group">
    <label for="email">Email</label>
    <input id="email" type="email" />
    <!-- Error space pre-allocated to prevent layout shift -->
    <div class="error-slot" aria-live="polite" style="min-height: 1.5rem;">
      <!-- Error message appears here without shifting content below -->
    </div>
  </div>

  <div class="field-group">
    <label for="password">Password</label>
    <input id="password" type="password" />
    <div class="error-slot" aria-live="polite" style="min-height: 1.5rem;"></div>
    <!-- Strength meter uses color fill, not layout change -->
    <div class="strength-meter" role="meter" aria-label="Password strength">
      <div class="strength-fill" style="width: 60%;"></div>
    </div>
  </div>
</form>`,
        explanation:
          'Pre-allocating space for validation messages and using in-place visual changes (color fills) instead of inserted elements prevents the layout shifts that disrupt form completion flow.',
        principle:
          'Stable layouts during data entry prevent working memory disruption from content shifts',
      },
    ],

    bad: [
      {
        title: 'Constant Notification Barrage',
        description:
          'Chat application delivering every message as an individual pop-up notification during focused work',
        code: `<!-- DON'T DO THIS -->
<div class="notification-stream">
  <!-- Each notification slides in, animates, then slides out -->
  <div class="toast" style="animation: slideIn 300ms, fadeOut 300ms 4s;">
    <p>Sarah: "Hey, quick question..."</p>
  </div>
  <!-- 10 seconds later -->
  <div class="toast" style="animation: slideIn 300ms, fadeOut 300ms 4s;">
    <p>Mike: "Can you review this?"</p>
  </div>
  <!-- 15 seconds later -->
  <div class="toast" style="animation: slideIn 300ms, fadeOut 300ms 4s;">
    <p>System: "Deployment complete"</p>
  </div>
  <!-- Each is a changing state that resets disruption -->
</div>`,
        explanation:
          'Each notification is a distinct state change with its own animation cycle. The variation between successive notifications (different senders, content, timing) prevents habituation and maximizes cognitive disruption.',
        principle:
          'A stream of varied notifications is the worst-case scenario for the changing state effect',
      },
      {
        title: 'Auto-Rotating Carousel During Reading',
        description:
          'Content page with an auto-advancing image carousel next to article text',
        code: `<!-- DON'T DO THIS -->
<div class="content-layout">
  <article class="main-text">
    <p>Important content the user is trying to read...</p>
  </article>
  <aside class="carousel" style="animation: slide 5s infinite;">
    <!-- Automatically rotates every 5 seconds -->
    <img src="promo-1.jpg" alt="Sale banner" />
    <img src="promo-2.jpg" alt="New feature" />
    <img src="promo-3.jpg" alt="Event announcement" />
  </aside>
</div>`,
        explanation:
          'The auto-rotating carousel creates periodic state changes in the user periphery. Each rotation triggers an involuntary orienting response that pulls attention away from the article text, fragmenting comprehension.',
        principle:
          'Peripheral state changes disrupt reading even when users try to ignore them',
      },
      {
        title: 'Aggressive Layout Shifts From Lazy Loading',
        description:
          'Page that shifts content position as images and ads load without reserved space',
        code: `<!-- DON'T DO THIS -->
<div class="article">
  <p>First paragraph of important content...</p>
  <!-- No dimensions specified; content below jumps when image loads -->
  <img src="large-photo.jpg" alt="Photo" />
  <p>User was reading this paragraph when it jumped down 400px...</p>
  <!-- Ad loads and pushes content further -->
  <div class="ad-slot"></div>
  <p>This paragraph shifted twice during reading...</p>
</div>`,
        explanation:
          'Each time an image or ad loads, all content below shifts position. These are high-impact state changes that force the user to relocate their reading position, breaking comprehension and memory encoding.',
        principle:
          'Layout shifts are among the most disruptive forms of changing state in reading interfaces',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Focus Mode (iOS/macOS)',
        description: 'Apple\'s Focus Mode suppresses notifications and dynamic content across the OS during designated focus periods. Only pre-approved contacts and apps can break through, dramatically reducing the stream of changing states that would otherwise disrupt concentration.',
        effectiveness: 'very-effective',
        analysis: 'By giving users system-level control over state changes, Apple addresses the changing state effect at the OS layer. Users report significantly improved focus during enabled periods.',
      },
      {
        company: 'Google',
        product: 'Chrome Reader Mode',
        description: 'Chrome\'s reader mode strips away sidebars, ads, navigation, animations, and other dynamic elements, presenting article text in a clean, stable layout. This eliminates the changing states that fragment reading comprehension.',
        effectiveness: 'effective',
        analysis: 'Reader mode creates a steady-state visual environment that allows habituation and full cognitive allocation to reading. Studies show improved comprehension and retention in distraction-free reading environments.',
      },
      {
        company: 'JetBrains',
        product: 'IDE Distraction Free Mode',
        description: 'JetBrains IDEs (IntelliJ, WebStorm, etc.) offer a Distraction Free Mode that hides all panels, toolbars, and UI chrome, presenting only the editor with the code. Notifications are suppressed and the interface becomes entirely static.',
        effectiveness: 'very-effective',
        analysis: 'By eliminating UI variation during coding, the mode reduces involuntary attention capture and supports the deep focus required for programming tasks.',
      },
      {
        company: 'Slack',
        product: 'Do Not Disturb / Notification Schedule',
        description: 'Slack allows users to pause notifications entirely or schedule quiet hours. During DND, messages are silently queued and delivered as a batch summary when the user is ready, converting a stream of changing states into a single predictable update.',
        effectiveness: 'effective',
        analysis: 'Batching notifications directly addresses the changing state effect by replacing varied individual interruptions with one consolidated summary, allowing habituation during focus periods.',
      },
    ],

    abTests: [
      {
        title: 'Notification Delivery: Individual vs Batched Summary',
        hypothesis:
          'Batching notifications into periodic summaries will improve task completion time and accuracy compared to real-time individual delivery',
        controlVersion: {
          description:
            'Real-time individual toast notifications for every message, each with slide-in animation and unique content',
          metrics: {
            conversionRate: '72% task completion accuracy',
            timeOnPage: '18:45 average task time',
            scrollDepth: '3.8 self-reported focus score (1-5)',
          },
        },
        treatmentVersion: {
          description:
            'Notifications silently queued during active tasks, delivered as a single grouped summary every 15 minutes or on task completion',
          metrics: {
            conversionRate: '89% task completion accuracy',
            timeOnPage: '14:20 average task time',
            scrollDepth: '4.4 self-reported focus score (1-5)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Batched notifications improved task accuracy by 24% and reduced completion time by 24%. Focus scores increased significantly, confirming that reducing the stream of changing states preserves cognitive resources for the primary task.',
          learnings: [
            'Individual varied notifications are the most disruptive form of changing state in productivity interfaces',
            'Users did not feel they missed important information with batched delivery',
            'The 15-minute batch window was preferred over 30-minute or 60-minute windows',
            'Critical alerts (system errors, urgent mentions) should still break through immediately',
          ],
        },
      },
      {
        title: 'Form Layout: Shifting vs Pre-Allocated Error Space',
        hypothesis:
          'Pre-allocating space for validation errors will reduce form completion errors by eliminating layout shifts',
        controlVersion: {
          description:
            'Validation errors inserted dynamically, pushing subsequent fields down each time an error appears',
          metrics: {
            conversionRate: '67% form completion rate',
            timeOnPage: '4:12 average completion time',
          },
        },
        treatmentVersion: {
          description:
            'Error space pre-allocated below each field; errors appear in-place without any layout shift',
          metrics: {
            conversionRate: '81% form completion rate',
            timeOnPage: '3:28 average completion time',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Eliminating layout shifts during form validation improved completion rate by 21% and reduced completion time by 17%. Users made fewer re-entry errors, suggesting that stable layouts preserved working memory for field values.',
          learnings: [
            'Layout shifts during validation are a significant source of form abandonment',
            'Pre-allocated error space has negligible impact on perceived form length',
            'Stable layouts reduce the cognitive cost of error recovery',
            'The effect is strongest for long forms with many required fields',
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
        name: 'Auto-Updating Content',
        description:
          'Elements that change content automatically without user initiation (live feeds, tickers, carousels)',
        howToSpot:
          'Watch the interface for 60 seconds without interacting; note anything that moves, changes, or updates on its own',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Notification Animations',
        description:
          'Toast messages, badge updates, or slide-in panels that appear during focused tasks',
        howToSpot:
          'Perform a focused task (reading, typing) and count the number of visual interruptions from notifications',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Layout Instability',
        description:
          'Content that shifts position as new elements load (images, ads, dynamic content)',
        howToSpot:
          'Scroll to mid-page content and wait; observe if text or elements jump as additional content loads above or alongside',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Peripheral Animations',
        description:
          'Looping animations, pulsing indicators, or blinking elements in the user periphery',
        howToSpot:
          'Focus on center content and use peripheral vision to detect motion elsewhere on screen',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Varied Micro-Interactions',
        description:
          'Different animation styles, timings, or effects for similar interactions across the interface',
        howToSpot:
          'Interact with multiple similar elements (buttons, cards, menus) and note if each has a unique animation pattern',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Notification Storm Pattern',
        description: 'Multiple varied notifications delivered individually in rapid succession',
        indicators: [
          'Toast notifications stacking or replacing each other',
          'Badge counts incrementing visibly',
          'Multiple notification sounds in sequence',
          'Different notification types interleaved (chat, system, calendar)',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Layout Shift Pattern',
        description: 'Content repositioning as dynamic elements load or appear',
        indicators: [
          'Text jumping down as images load without reserved dimensions',
          'Form fields shifting when validation messages appear',
          'Sidebar or panel toggling that reflows main content',
          'Ads or banners inserting into content flow',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Peripheral Motion Pattern',
        description: 'Continuous or recurring animations outside the user focal area',
        indicators: [
          'Auto-rotating carousels adjacent to reading content',
          'Animated advertisements or promotional banners',
          'Pulsing status indicators or progress animations',
          'Looping background video or motion graphics',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Feed Churn Pattern',
        description: 'Content stream with frequent, varied updates that prevent deep engagement',
        indicators: [
          'Auto-refreshing feeds that insert new items at the top',
          'Real-time counters or tickers with rapid updates',
          'Live activity streams with heterogeneous content types',
          'Infinite scroll with injected promotional content',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'How many elements on this screen change state without user initiation?',
      'Can users complete their primary task without any layout shifts occurring?',
      'Are notifications delivered individually or batched during focused tasks?',
      'Is there a focus mode or distraction-free option available?',
      'Do animations serve a functional purpose, or are they purely decorative?',
      'Are image and media dimensions specified to prevent content reflow?',
      'Is auto-rotating or auto-updating content pausable?',
      'How many distinct animation patterns exist on a single screen?',
      'Does the interface respect the prefers-reduced-motion user preference?',
      'What is the cumulative layout shift (CLS) score for key user flows?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the changing state effect and its impact on attention and memory.

Analyze the provided design for changing state disruption patterns. Identify:

1. **Dynamic Elements**: Auto-updating content, animations, transitions, and live feeds
2. **Layout Stability**: Content shifts, reflows, or repositioning during user tasks
3. **Notification Patterns**: How alerts, messages, and updates are delivered
4. **Peripheral Motion**: Animations or changes outside the user's focal area
5. **Focus Protection**: Whether the design provides modes to reduce state changes

For each pattern found:
- Identify the type and frequency of state changes
- Assess whether the change serves a necessary purpose
- Determine the impact on user focus and task performance
- Evaluate whether a steady-state alternative would be better
- Suggest improvements for reducing unnecessary disruption

Consider:
- Are state changes helping users or fragmenting their attention?
- Can varied notifications be batched into summaries?
- Are layout shifts preventable with dimension reservation?
- Does the interface respect prefers-reduced-motion?
- Are there focused task contexts where state changes should be suppressed?

Provide actionable recommendations for minimizing unnecessary changing-state disruption.`,

    outputSchema: {
      type: 'object',
      properties: {
        stateChangePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              frequency: { type: 'string' },
              purpose: { type: 'string' },
              disruptionLevel: { type: 'string' },
              necessary: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'frequency',
              'disruptionLevel',
              'necessary',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            stateChangeFrequency: { type: 'number' },
            layoutStability: { type: 'number' },
            focusProtection: { type: 'number' },
            motionReduction: { type: 'number' },
          },
          required: [
            'stateChangeFrequency',
            'layoutStability',
            'focusProtection',
            'motionReduction',
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
        'stateChangePatterns',
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
        title: 'Audit State Changes',
        description:
          'Inventory every element on the screen that changes state without user initiation',
        example:
          'Record: 3 auto-rotating carousels, 12 notification types, 2 live counters, 1 auto-save indicator',
        tips: [
          'Watch the interface passively for 2 minutes and note every change',
          'Use browser performance tools to measure Cumulative Layout Shift',
          'Categorize changes as necessary (system feedback) vs decorative (engagement animations)',
        ],
      },
      {
        step: 2,
        title: 'Identify Focused Task Contexts',
        description:
          'Map the user flows where sustained attention is critical and state changes are most harmful',
        example:
          'Critical focus contexts: form completion, document editing, code review, data analysis',
        tips: [
          'Prioritize flows with high error costs or cognitive complexity',
          'Interview users about where they feel most distracted',
          'Correlate task error rates with state change frequency',
        ],
      },
      {
        step: 3,
        title: 'Eliminate Unnecessary State Changes',
        description:
          'Remove or replace decorative animations and gratuitous dynamic elements in focused contexts',
        example:
          'Replace auto-rotating carousel with static featured item; remove pulsing notification badges during data entry',
        tips: [
          'Apply the test: would a static version convey the same information?',
          'Convert layout-shifting elements to in-place updates',
          'Set animation budgets: max N state changes per screen per minute',
        ],
      },
      {
        step: 4,
        title: 'Batch and Defer Non-Critical Updates',
        description:
          'Consolidate notifications and updates into periodic summaries during focused tasks',
        example:
          'Queue non-urgent notifications; deliver as a single summary on task completion or at timed intervals',
        tips: [
          'Define tiers: critical (immediate), important (next break), informational (daily summary)',
          'Let users configure batch intervals',
          'Show a subtle, non-animated indicator that queued items are waiting',
        ],
      },
      {
        step: 5,
        title: 'Stabilize Layouts',
        description:
          'Prevent content reflow by reserving space for dynamic elements before they load',
        example:
          'Set explicit width and height on images; pre-allocate space for validation messages and ads',
        tips: [
          'Use aspect-ratio CSS property for media elements',
          'Pre-render skeleton screens with accurate dimensions',
          'Test with throttled network to expose loading-triggered shifts',
        ],
      },
      {
        step: 6,
        title: 'Respect Motion Preferences',
        description:
          'Honor the prefers-reduced-motion media query and provide manual controls for animation',
        example:
          'Disable all non-essential animations when prefers-reduced-motion is set; provide a toggle in settings',
        tips: [
          'Test the entire interface with reduced motion enabled',
          'Ensure functionality is preserved without animation',
          'Document which animations are essential vs decorative',
        ],
      },
    ],

    dos: [
      'Minimize animations and dynamic content during focused tasks like reading, writing, and data entry',
      'Batch notifications into periodic summaries rather than delivering them individually',
      'Reserve space for dynamic content to prevent layout shifts',
      'Provide focus modes or distraction-free options for concentration-heavy workflows',
      'Respect the prefers-reduced-motion media query system-wide',
      'Use in-place updates (color changes, number transitions) instead of layout-shifting insertions',
      'Set animation budgets to limit the total number of state changes per screen',
      'Allow users to pause or stop auto-updating content',
    ],

    donts: [
      'Don\'t auto-rotate carousels adjacent to reading content',
      'Don\'t deliver every notification as an individual pop-up during focused tasks',
      'Don\'t allow images or ads to load without reserved dimensions',
      'Don\'t use looping or pulsing animations for non-critical status indicators',
      'Don\'t insert content above the user\'s current scroll position',
      'Don\'t use varied animation styles for similar interactions on the same screen',
      'Don\'t ignore the cumulative effect of many small state changes',
      'Don\'t assume users can voluntarily ignore peripheral motion',
    ],

    bestPractices: [
      {
        title: 'Adopt a State Change Budget',
        description:
          'Set a maximum number of non-user-initiated state changes allowed per screen per minute',
        rationale:
          'Cumulative state changes have an additive disruptive effect; budgeting forces prioritization',
        example:
          'Target: fewer than 2 non-initiated state changes per minute during focused tasks',
      },
      {
        title: 'Design for Steady-State First',
        description:
          'Start with a completely static interface and add dynamics only where they serve a clear purpose',
        rationale:
          'It is easier to justify adding motion than to remove it after it is entrenched',
        example:
          'Design the form with all error states visible as static placeholders; only then decide if any benefit from animation',
      },
      {
        title: 'Use Predictable Update Patterns',
        description:
          'When updates are necessary, make them predictable in timing and location so users can habituate',
        rationale:
          'Predictable changes allow partial habituation; unpredictable ones reset disruption each time',
        example:
          'Update dashboard metrics at fixed 30-second intervals in consistent locations rather than at random intervals',
      },
      {
        title: 'Separate Browsing and Focus Modes',
        description:
          'Provide distinct UI states for exploration (dynamic, rich) and deep work (minimal, stable)',
        rationale:
          'Different task types have different tolerance for state changes',
        example:
          'Email inbox: list view allows dynamic badges; reading view suppresses all notifications and animations',
      },
      {
        title: 'Measure Cumulative Layout Shift',
        description:
          'Track CLS as a core performance metric and set targets aligned with user task requirements',
        rationale:
          'CLS quantifies the layout instability that directly causes changing-state disruption',
        example:
          'Target CLS below 0.1 for all focused-task pages; below 0.05 for data entry forms',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.2.2',
        guideline:
          'Pause, Stop, Hide - Provide controls for auto-updating, moving, or blinking content',
        implementation:
          'All auto-rotating carousels, live feeds, and animated elements must have visible pause/stop controls. Auto-updating content must be pausable.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - No content flashes more than 3 times per second',
        implementation:
          'Ensure notification animations, loading indicators, and status changes do not flash rapidly. Use smooth transitions over abrupt changes.',
      },
      {
        wcagLevel: 'AAA',
        criterion: '2.2.4',
        guideline:
          'Interruptions - Allow users to postpone or suppress interruptions except emergencies',
        implementation:
          'Provide notification suppression during focused tasks. Only critical system alerts should break through user-set quiet modes.',
      },
      {
        wcagLevel: 'AAA',
        criterion: '2.3.3',
        guideline:
          'Animation from Interactions - Allow users to disable motion animation triggered by interaction',
        implementation:
          'Honor prefers-reduced-motion and provide a manual toggle. Ensure all functionality works without animation.',
      },
    ],

    ethics: [
      {
        concern: 'Attention Exploitation',
        severity: 'high',
        explanation:
          'Using frequent state changes (notifications, animations, feed refreshes) to hijack user attention for engagement metrics rather than user benefit',
        mitigation:
          'Audit whether each state change serves the user or the business. Provide focus modes that suppress engagement-driven dynamics.',
      },
      {
        concern: 'Cognitive Accessibility Harm',
        severity: 'critical',
        explanation:
          'Users with ADHD, anxiety disorders, or cognitive disabilities are disproportionately harmed by unnecessary state changes',
        mitigation:
          'Respect prefers-reduced-motion by default. Provide granular controls for notification frequency and animation intensity. Test with neurodiverse users.',
      },
      {
        concern: 'Dark Pattern Distraction',
        severity: 'high',
        explanation:
          'Using animations and state changes to draw attention away from important information (pricing details, terms, opt-out options)',
        mitigation:
          'Never use state changes to distract from disclosures or make important actions harder to find. Critical information should be in the most stable part of the interface.',
      },
      {
        concern: 'Notification Addiction',
        severity: 'medium',
        explanation:
          'Training users to check for state changes compulsively through intermittent variable-reward notification patterns',
        mitigation:
          'Use predictable notification schedules. Avoid randomized timing designed to create checking behavior. Provide usage awareness tools.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Disruption of short-term memory for speech by changing-state stimuli: A cross-modal extension',
        author: 'Jones, D. M., Madden, C., & Miles, C.',
        year: 1992,
        doi: '10.1037/0278-7393.18.1.183',
        description:
          'The foundational paper demonstrating that changing-state stimuli disrupt serial recall more than steady-state stimuli',
        type: 'foundational',
      },
      {
        title: 'The changing-state irrelevant sound effect and its implications for models of short-term memory',
        author: 'Hughes, R. W.',
        year: 2014,
        doi: '10.1016/B978-0-12-800090-8.00003-7',
        description:
          'Comprehensive review of the changing-state effect and its theoretical implications for models of working memory',
        type: 'foundational',
      },
      {
        title: 'Auditory distraction and short-term memory: Phenomena and practical implications',
        author: 'Hughes, R. W., & Marsh, J. E.',
        year: 2017,
        doi: '10.1177/2041669517722802',
        description:
          'Practical implications of auditory distraction research for workplace and interface design',
        type: 'practical',
      },
      {
        title: 'The irrelevant sound effect: What needs modelling and a tentative model',
        author: 'Jones, D. M., & Macken, W. J.',
        year: 1993,
        doi: '10.1037/0278-7393.19.3.534',
        description:
          'Theoretical model explaining why changing-state sounds are more disruptive than steady-state sounds',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Noise and Performance: The Fourth Decade',
        author: 'Jones, D. M., & Smith, A. P.',
        year: 1992,
        description:
          'Comprehensive review of noise and irrelevant sound effects on cognitive performance including the changing state hypothesis',
        type: 'foundational',
      },
      {
        title: 'Attention: Theory and Practice',
        author: 'Johnson, A., & Proctor, R. W.',
        year: 2004,
        isbn: '9780761927600',
        description:
          'Textbook covering attention and distraction mechanisms relevant to the changing state effect',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Designing for Focus: Reducing Distractions in Productive Interfaces',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/minimize-distractions/',
        description:
          'Practical UX guidelines for reducing interface distractions that map to changing-state disruption',
        type: 'practical',
      },
      {
        title: 'Cumulative Layout Shift (CLS)',
        author: 'web.dev (Google)',
        url: 'https://web.dev/articles/cls',
        description:
          'Technical guide to measuring and reducing layout shifts, a key source of visual changing-state disruption',
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
      'cognitive-load', // Changing states increase extraneous cognitive load
      'attentional-bias', // State changes exploit attentional capture mechanisms
      'serial-position-effect', // Changing states disrupt serial order encoding
      'von-restorff-effect', // Isolated state changes capture attention via distinctiveness
    ],

    conflicts: [
      'mere-exposure-effect', // Repeated exposure requires seeing content, but state changes disrupt processing
    ],

    confusedWith: [
      'irrelevant-sound-effect', // Related but broader; changing state is the specific mechanism within ISE
      'attentional-blink', // Different mechanism; brief attentional gap after processing a target
      'inattentional-blindness', // Opposite direction; failing to notice changes rather than being disrupted by them
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'irrelevant-sound-effect',
        'visual-distraction-effect',
      ],
    },
  },
};
