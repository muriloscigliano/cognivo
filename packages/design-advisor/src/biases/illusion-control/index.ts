/**
 * ILLUSION OF CONTROL
 *
 * We overestimate our control over events
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const illusionControl: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'illusion-control',
    name: 'Illusion of Control',
    aliases: [],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'judgment',
      'perception',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We overestimate our control over events',

    detailed: `The Illusion of Control is a cognitive bias where people believe they can influence outcomes that are actually determined by chance or external factors. First identified by Ellen Langer in 1975, this bias causes individuals to overestimate their personal ability to affect results, especially when elements of skill-based tasks are present (such as choice, competition, or familiarity).

In digital product design, the illusion of control manifests powerfully in how users interact with customization options, personalization settings, and interactive controls. Users strongly prefer interfaces that give them a sense of agency, even when the controls have minimal or no actual effect on outcomes.

Understanding this bias is essential for ethical design: providing genuine, meaningful controls improves user satisfaction and trust, while deploying placebo controls or fake agency erodes trust when discovered and can constitute a dark pattern.`,

    psychologyBasis: {
      discoveredBy: 'Ellen Langer',
      year: 1975,
      theory: 'Illusion of Control Theory',
      mechanism: `People overestimate their ability to control events, particularly random or externally determined outcomes. This occurs because:

1. **Skill Cue Transfer**: When elements associated with skill (choice, competition, familiarity, active involvement) are present in chance situations, people behave as if skill matters
2. **Personal Involvement**: Actively participating in an outcome (e.g., choosing lottery numbers) creates a feeling of influence even when participation has zero effect
3. **Sequence and Familiarity**: Practice or repeated exposure to a chance task increases perceived control, even when outcomes remain random
4. **Success Attribution**: People attribute successful outcomes to their own actions rather than chance, reinforcing the belief in personal control
5. **Need for Agency**: Humans have a deep psychological need to feel in control of their environment, which motivates biased perception of causal influence`,
    },

    realWorldExample: `In Langer's classic 1975 experiment, participants who chose their own lottery tickets valued them significantly more than those assigned tickets randomly. When asked to sell their tickets back, self-choosers demanded nearly four times the price of those with assigned tickets, despite the fact that choosing a number has zero effect on lottery outcomes. The mere act of choosing created a powerful illusion of control over a purely random result.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Illusion of Control profoundly affects how users interact with customization features, interactive elements, and personalization settings. Users derive satisfaction and engagement from feeling they can influence outcomes. Designers can leverage this to:

- Increase engagement through meaningful customization and personalization options
- Improve user satisfaction by providing genuine controls over interface behavior
- Build trust by making system behavior transparent and responsive to user input
- Enhance perceived value through user-directed configurations and settings
- Drive adoption by giving users agency in onboarding and setup flows`,

    whenToUse: [
      {
        title: 'Dashboard Customization',
        scenario:
          'When users need to monitor data or track metrics in personalized views',
        example:
          'Allow users to rearrange widgets, choose visible metrics, and configure refresh intervals on their dashboard',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Sort, Filter, and Search Controls',
        scenario: 'When users browse large datasets or product catalogs',
        example:
          'Provide robust filtering, sorting, and search tools that genuinely narrow results and help users find what they need',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Notification Preferences',
        scenario: 'When managing communication frequency and channels with users',
        example:
          'Give users granular control over which notifications they receive, through which channels, and at what frequency',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Personalization Settings',
        scenario: 'When users want to tailor the product experience to their workflow',
        example:
          'Allow users to set default views, preferred themes, keyboard shortcuts, and workspace layouts',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Interactive Data Exploration',
        scenario: 'When presenting analytics or reports that users need to interpret',
        example:
          'Enable drill-down, zoom, date range selection, and dimension toggling in charts and reports',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Placebo Controls',
        reason:
          'Fake controls that have no actual effect on the system violate user trust',
        consequence:
          'When users discover controls are non-functional, trust is severely damaged and the product feels deceptive',
        alternative:
          'Either make the control functional or remove it; be transparent about what users can and cannot influence',
      },
      {
        title: 'Random Outcome Interfaces',
        reason:
          'Implying user skill or choice affects purely random results is manipulative',
        consequence:
          'Users invest time and effort in "strategies" for random outcomes, leading to frustration and financial harm (e.g., gambling)',
        alternative:
          'Clearly communicate that outcomes are random; do not add choice elements that suggest skill matters',
      },
      {
        title: 'Overwhelming Customization',
        reason:
          'Too many control options can create decision paralysis and anxiety',
        consequence:
          'Users feel overwhelmed, make poor configurations, or abandon setup entirely',
        alternative:
          'Provide smart defaults with progressive disclosure of advanced options',
      },
      {
        title: 'Safety-Critical Systems',
        reason:
          'False sense of control in safety contexts can lead users to take dangerous risks',
        consequence:
          'Users may override safety systems or ignore warnings because they feel in control',
        alternative:
          'Make system limitations and automated overrides clearly visible; never fake user control over safety functions',
      },
    ],

    commonMistakes: [
      {
        title: 'Placebo Buttons',
        description:
          'Adding buttons or controls that do nothing but give users the feeling of influence',
        why: 'Erodes trust when discovered; constitutes a deceptive design pattern',
        fix: 'Ensure every control has a genuine, observable effect on the system. Remove non-functional controls.',
      },
      {
        title: 'Fake Progress Controls',
        description:
          'Letting users "speed up" or "prioritize" processes that run at fixed rates',
        why: 'Creates false expectations and frustration when the control has no real effect',
        fix: 'Show honest progress indicators. If users truly cannot affect speed, say so clearly.',
      },
      {
        title: 'Excessive Customization Without Defaults',
        description:
          'Requiring users to configure everything without providing sensible defaults',
        why: 'Overwhelms users and creates choice paralysis under the guise of giving control',
        fix: 'Provide intelligent defaults based on user segment, with optional customization for power users',
      },
      {
        title: 'Implying Skill in Random Outcomes',
        description:
          'Letting users pick lottery numbers, shuffle algorithms, or select random outcomes as if their choice matters',
        why: 'Exploits the illusion of control to encourage continued engagement with chance-based systems',
        fix: 'Clearly label random processes as random. Do not add choice mechanics to pure chance events.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout of controls and customization options signals how much agency users have',
        examples: [
          'Drag-and-drop widget layouts give strong sense of personal control',
          'Customizable grid and card arrangements increase perceived ownership',
          'Collapsible and resizable panels let users shape their workspace',
          'Fixed, immovable layouts feel restrictive and reduce sense of agency',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices have minimal direct impact on illusion of control',
        examples: [
          'Font size controls in reading apps provide genuine user agency',
          'Display density options (compact, comfortable, spacious) give typographic control',
          'User-selectable fonts for code editors or writing tools enhance perceived control',
          'Fixed typography with no user options feels less customizable',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color customization is a strong signal of user control and personalization',
        examples: [
          'Theme selection (light/dark/custom) provides visible, meaningful control',
          'Accent color pickers let users personalize their environment',
          'Color-coded categories that users can customize increase sense of ownership',
          'Status colors (red/yellow/green) that users define for their own thresholds feel empowering',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive controls are the primary vehicle for the illusion of control',
        examples: [
          'Sliders, toggles, and dials provide tactile sense of influence',
          'Real-time feedback on control changes reinforces perceived agency',
          'Undo/redo functionality makes users feel safe experimenting with controls',
          'Controls with no visible response undermine trust and perceived control',
        ],
      },
      content: {
        level: ImpactLevel.MEDIUM,
        description:
          'Content framing affects how much control users believe they have over outcomes',
        examples: [
          '"You chose this" language reinforces sense of personal agency',
          'Showing the effect of user settings on results confirms real control',
          'Transparency about what is user-controlled vs system-determined builds trust',
          'Vague language about how user choices affect outcomes creates false expectations',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible controls ensure all users experience genuine agency',
        examples: [
          'Keyboard-navigable customization ensures control for non-mouse users',
          'Screen reader announcements of control state changes confirm effect',
          'Touch targets sized for motor-impaired users preserve sense of agency',
          'ARIA live regions communicating control outcomes provide feedback to all users',
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
        title: 'Dashboard Widget Customization',
        description:
          'Analytics dashboard where users can rearrange, resize, and configure widgets',
        code: `<div class="dashboard-editor">
  <h3>Customize Your Dashboard</h3>
  <div class="widget-grid" role="grid" aria-label="Dashboard layout">
    <div class="widget" draggable="true" aria-grabbed="false">
      <div class="widget-header">
        <h4>Revenue</h4>
        <button class="configure" aria-label="Configure Revenue widget">
          <span class="icon">&#9881;</span>
        </button>
      </div>
      <div class="widget-body">
        <select aria-label="Date range">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option selected>Last 90 days</option>
        </select>
        <div class="chart" role="img" aria-label="Revenue chart for selected period">
          <!-- Chart renders based on user-selected date range -->
        </div>
      </div>
    </div>
    <div class="widget" draggable="true" aria-grabbed="false">
      <div class="widget-header">
        <h4>Active Users</h4>
        <button class="configure" aria-label="Configure Active Users widget">
          <span class="icon">&#9881;</span>
        </button>
      </div>
    </div>
  </div>
  <p class="hint">Drag widgets to rearrange. Click &#9881; to configure each widget.</p>
</div>`,
        explanation:
          'Every control has a genuine effect: dragging rearranges widgets, date range changes the data, and configuration buttons open real settings. Users have meaningful control over their analytics view.',
        principle:
          'Genuine controls that produce observable results build trust and engagement',
        metrics: {
          before: '42% daily active usage with fixed dashboard',
          after: '68% daily active usage with customizable dashboard',
          improvement: '62% increase in daily engagement when users could personalize layout',
        },
      },
      {
        title: 'Advanced Filter and Sort Controls',
        description:
          'E-commerce product listing with robust, functional filtering',
        code: `<aside class="filter-panel" aria-label="Product filters">
  <h3>Filter Products</h3>

  <fieldset>
    <legend>Price Range</legend>
    <div class="range-slider" role="group" aria-label="Price range selector">
      <input type="range" min="0" max="500" value="0" aria-label="Minimum price">
      <input type="range" min="0" max="500" value="500" aria-label="Maximum price">
      <output>$0 - $500</output>
    </div>
  </fieldset>

  <fieldset>
    <legend>Category</legend>
    <label><input type="checkbox" checked> Electronics (142)</label>
    <label><input type="checkbox"> Clothing (89)</label>
    <label><input type="checkbox"> Home (67)</label>
  </fieldset>

  <fieldset>
    <legend>Sort By</legend>
    <select aria-label="Sort order">
      <option>Relevance</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Newest First</option>
      <option>Top Rated</option>
    </select>
  </fieldset>

  <p class="results-count" aria-live="polite">Showing 142 of 298 products</p>
</aside>`,
        explanation:
          'Every filter genuinely narrows results. The live result count confirms user actions have real effects. Sort order visibly reorders products. Users have authentic control over what they see.',
        principle:
          'Controls that visibly change results confirm genuine user agency',
      },
      {
        title: 'Notification Preference Center',
        description:
          'Granular notification settings that actually control what users receive',
        code: `<section class="notification-preferences">
  <h3>Notification Preferences</h3>
  <p>Choose exactly what you want to hear about.</p>

  <div class="preference-group">
    <h4>Product Updates</h4>
    <label class="toggle-row">
      <span>New feature announcements</span>
      <input type="checkbox" role="switch" checked aria-label="New feature announcements">
    </label>
    <label class="toggle-row">
      <span>Weekly usage summary</span>
      <input type="checkbox" role="switch" aria-label="Weekly usage summary">
    </label>
  </div>

  <div class="preference-group">
    <h4>Delivery Channel</h4>
    <label><input type="radio" name="channel" checked> Email only</label>
    <label><input type="radio" name="channel"> Push only</label>
    <label><input type="radio" name="channel"> Both</label>
  </div>

  <div class="preference-group">
    <h4>Frequency</h4>
    <select aria-label="Notification frequency">
      <option>Real-time</option>
      <option selected>Daily digest</option>
      <option>Weekly digest</option>
    </select>
  </div>

  <p class="confirmation" aria-live="polite">Your preferences are saved automatically.</p>
</section>`,
        explanation:
          'Each toggle, radio button, and select genuinely changes notification behavior. Users see immediate confirmation. The system respects these choices, building trust through genuine control.',
        principle:
          'Granular, functional preferences reinforce that user choices matter',
      },
    ],

    bad: [
      {
        title: 'Placebo Close-Door Button',
        description:
          'Elevator-style close button that has no actual effect on behavior',
        code: `<!-- DON'T DO THIS -->
<div class="loading-overlay">
  <div class="spinner"></div>
  <p>Processing your request...</p>
  <button class="speed-up-btn" onclick="/* does nothing */">
    Speed Up
  </button>
  <p class="small">Click to prioritize your request</p>
</div>`,
        explanation:
          'The "Speed Up" button does absolutely nothing. The process runs at a fixed rate regardless. This is a digital placebo button that exploits the illusion of control. When users realize it has no effect, trust is destroyed.',
        principle:
          'Placebo controls are deceptive and erode trust when discovered',
      },
      {
        title: 'Lottery Number Picker Implying Skill',
        description:
          'Gambling interface that implies choosing numbers gives players an advantage',
        code: `<!-- DON'T DO THIS -->
<div class="lottery-picker">
  <h2>Pick Your Lucky Numbers!</h2>
  <p class="tagline">Smart players choose strategically...</p>
  <div class="number-grid">
    <button class="number hot">7 <span class="badge">HOT!</span></button>
    <button class="number">12</button>
    <button class="number cold">23 <span class="badge">DUE!</span></button>
    <button class="number">31</button>
    <button class="number hot">42 <span class="badge">HOT!</span></button>
  </div>
  <p class="hint">Numbers marked HOT have appeared frequently.
  Numbers marked DUE haven't appeared in a while.</p>
  <div class="stats">
    <h4>Your Winning Strategy</h4>
    <p>Hot/Cold analysis based on the last 100 draws</p>
  </div>
</div>`,
        explanation:
          'Labeling numbers as "HOT" or "DUE" and framing number selection as a "strategy" implies skill in a purely random process. Each draw is independent; past results do not predict future outcomes. This exploits the illusion of control to encourage gambling.',
        principle:
          'Never imply skill or strategy in purely random outcomes',
      },
      {
        title: 'Fake Thermostat Controls',
        description:
          'Office temperature control that is not connected to the HVAC system',
        code: `<!-- DON'T DO THIS -->
<div class="room-controls">
  <h3>Room Temperature</h3>
  <div class="thermostat">
    <button class="temp-down" aria-label="Decrease temperature">-</button>
    <span class="current-temp">72&deg;F</span>
    <button class="temp-up" aria-label="Increase temperature">+</button>
  </div>
  <p class="status">Adjusting... Your comfort is our priority.</p>
  <!-- In reality: buttons update the display number
       but are not connected to any HVAC system.
       The building runs on a centralized schedule. -->
</div>`,
        explanation:
          'The thermostat display changes when buttons are pressed, but it is not connected to the actual HVAC system. The temperature is controlled centrally on a fixed schedule. This is a well-documented real-world placebo control that, while reducing complaints short-term, destroys trust when exposed.',
        principle:
          'Placebo controls with fake feedback are fundamentally dishonest',
      },
    ],

    realWorld: [
      {
        company: 'Notion',
        product: 'Workspace Customization',
        description: 'Notion allows users to customize page layouts, create their own databases, choose icons and covers, and build personal wiki structures. Every customization genuinely changes how content is organized and displayed, providing authentic control over the workspace.',
        effectiveness: 'very-effective',
        analysis: 'Notion succeeds because every control is genuine. Users who customize their workspace show 3x higher retention. The sense of ownership and control drives daily engagement and converts free users to paid plans.',
      },
      {
        company: 'Spotify',
        product: 'Playlist Curation',
        description: 'Spotify lets users create, reorder, and curate personal playlists while also generating "Discover Weekly" algorithmic playlists. Users feel they control their music experience through curation, even though algorithmic recommendations drive most listening time.',
        effectiveness: 'effective',
        analysis: 'The balance works because both manual playlists and algorithmic suggestions produce real results. Users feel in control of their music identity through playlists, which makes them more receptive to algorithm-driven features.',
      },
      {
        company: 'Placebo Buttons',
        product: 'Elevator Close-Door Buttons',
        description: 'Many elevator close-door buttons in the US have been non-functional since the 1990 Americans with Disabilities Act required doors to stay open long enough for disabled individuals. The buttons give riders a sense of control over wait time, but most do nothing.',
        effectiveness: 'somewhat-effective',
        analysis: 'A classic real-world example of placebo controls. While they reduce perceived wait frustration short-term, they represent a systemic deception. In digital design, equivalent patterns (fake progress controls, non-functional preference toggles) carry similar ethical risks and erode trust when discovered.',
      },
      {
        company: 'Crosswalk Buttons',
        product: 'Pedestrian Signal Buttons',
        description: 'In many major cities (including New York City), the majority of pedestrian crosswalk buttons are non-functional. Traffic signals operate on fixed timers, but the buttons remain installed, giving pedestrians a sense of control over signal timing.',
        effectiveness: 'somewhat-effective',
        analysis: 'Another well-known placebo control. Pedestrians who press the button feel less frustrated while waiting, but the button has no effect. This pattern is instructive for digital designers: short-term satisfaction from fake controls is outweighed by long-term trust erosion when users discover the deception.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard Customization: Fixed vs User-Configurable Layout',
        hypothesis:
          'Allowing users to customize their dashboard layout will increase daily engagement and satisfaction',
        controlVersion: {
          description:
            'Fixed dashboard layout with predetermined widget arrangement. All users see the same view with the same metrics in the same positions.',
          metrics: {
            conversionRate: '42%',
            timeOnPage: '2:15',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Customizable dashboard where users can drag-and-drop widgets, resize panels, choose which metrics to display, and save their preferred layout.',
          metrics: {
            conversionRate: '68%',
            timeOnPage: '4:30',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Customizable dashboards increased daily active usage by 62%. Users spent twice as long on the page and explored more deeply. Satisfaction scores rose from 6.2 to 8.7 out of 10. Users who customized their layout in the first week had 40% higher 30-day retention.',
          learnings: [
            'Genuine control over layout significantly increases engagement and retention',
            'Users who customize early become power users faster',
            'Smart defaults are still essential; most users only adjust 2-3 widgets',
            'The act of customizing creates psychological ownership of the workspace',
          ],
        },
      },
      {
        title: 'Notification Control: Binary vs Granular Preferences',
        hypothesis:
          'Granular notification controls will reduce unsubscribes while maintaining engagement',
        controlVersion: {
          description:
            'Simple on/off toggle for all notifications. Users can either receive all notifications or none.',
          metrics: {
            conversionRate: '15%',
            clickThroughRate: '8%',
          },
        },
        treatmentVersion: {
          description:
            'Granular preference center with per-category toggles, frequency controls, and channel selection. Users choose exactly which notifications they want, how often, and through which channel.',
          metrics: {
            conversionRate: '34%',
            clickThroughRate: '22%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Granular controls more than doubled notification opt-in rates. Users who configured preferences had 175% higher click-through rates because they only received relevant notifications. Unsubscribe rate dropped from 12% to 3% per month.',
          learnings: [
            'Genuine control over notifications dramatically reduces unsubscribes',
            'Users who feel in control are more receptive to the messages they do receive',
            'Granular preferences serve as a proxy for user interest signals',
            'Even users who keep defaults feel better knowing they could change settings',
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
        name: 'Non-Functional Controls',
        description:
          'Buttons, sliders, or toggles that do not produce any observable change in the system',
        howToSpot:
          'Click every control and observe whether the system state actually changes. Test with network monitoring to verify server-side effects.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Choice Elements on Random Outcomes',
        description:
          'Selection interfaces for outcomes that are purely random or externally determined',
        howToSpot:
          'Look for number pickers, color selectors, or option choosers on lottery-style, shuffle, or random-assignment features',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Excessive Customization Options',
        description:
          'Overwhelming number of configuration options, many of which have negligible real impact',
        howToSpot:
          'Check if settings pages have dozens of toggles where most combinations produce identical experiences',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Fake Progress Acceleration',
        description:
          'Controls that claim to speed up, prioritize, or optimize processes running at fixed rates',
        howToSpot:
          'Look for "Speed Up", "Prioritize", or "Boost" buttons on loading screens or queue positions. Time the process with and without the control.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Simulated Feedback',
        description:
          'Visual or auditory feedback that mimics a response to user action but represents no real system change',
        howToSpot:
          'Check for animations, sound effects, or status messages triggered by controls that have no backend effect',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Placebo Control Pattern',
        description: 'Interactive elements that provide feedback but have no actual effect on system behavior',
        indicators: ['Buttons that trigger animations but no real action', 'Sliders that reset or have no measurable impact', 'Settings that are saved but never read by the system', 'Loading "speed up" buttons'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Random Outcome Choice Pattern',
        description: 'User selection mechanics applied to outcomes determined entirely by chance',
        indicators: ['Number pickers for random draws', '"Hot" and "cold" labels on random options', 'Strategy language for chance-based features', 'Historical data presented as predictive for independent events'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Overcustomization Pattern',
        description: 'Excessive configuration options that create the appearance of control without meaningful differentiation',
        indicators: ['Dozens of toggles with minimal observable differences', 'Settings pages longer than the features they configure', 'Options that require expert knowledge to understand', 'Configurations that are reset or overridden by the system'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Genuine Agency Pattern',
        description: 'Controls that produce real, observable, and meaningful changes to the user experience',
        indicators: ['Drag-and-drop with persistent layout changes', 'Filters that visibly change displayed results', 'Theme selections that transform the entire interface', 'Preferences that observably change system behavior'],
        severity: ImpactLevel.LOW,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does every interactive control produce a genuine, observable effect?',
      'Are there any buttons, toggles, or sliders that do nothing when activated?',
      'Do any choice interfaces apply to outcomes that are actually random?',
      'Is customization meaningful, or does it create the appearance of control without substance?',
      'Can users verify that their settings actually affect system behavior?',
      'Are there "speed up" or "prioritize" controls on fixed-rate processes?',
      'Do loading animations or progress bars respond to user input, or are they decorative?',
      'Is the system transparent about what users can and cannot influence?',
      'Are there settings that the system overrides without informing the user?',
      'Do controls provide real-time feedback that accurately reflects their effect?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the illusion of control.

Analyze the provided design for illusion of control patterns. Identify:

1. **Genuine Controls**: Interactive elements that produce real, meaningful changes to system behavior
2. **Placebo Controls**: Buttons, sliders, or toggles that provide feedback but have no actual effect
3. **Random Outcome Choices**: Selection interfaces applied to chance-based outcomes
4. **Customization Depth**: Whether configuration options provide real differentiation
5. **Feedback Authenticity**: Whether visual/auditory feedback accurately represents system changes

For each pattern found:
- Identify the control and its claimed function
- Assess whether the control has a genuine effect on the system
- Determine if the level of control implied matches reality
- Evaluate ethical implications
- Suggest improvements for authentic user agency

Consider:
- Are all interactive controls connected to real system behavior?
- Does the interface imply user skill or strategy where outcomes are random?
- Is customization meaningful or cosmetic?
- Are users informed about what they can and cannot control?
- Does the design build trust through genuine agency or exploit the illusion of control?

Provide actionable recommendations for ethical, trust-building control patterns.`,

    outputSchema: {
      type: 'object',
      properties: {
        controlPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              claimedEffect: { type: 'string' },
              actualEffect: { type: 'string' },
              isGenuine: { type: 'boolean' },
              trustImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'claimedEffect',
              'isGenuine',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            genuineControlScore: { type: 'number' },
            placeboRisk: { type: 'number' },
            customizationDepth: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'genuineControlScore',
            'placeboRisk',
            'customizationDepth',
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
        'controlPatterns',
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
        title: 'Audit Existing Controls',
        description:
          'Inventory every interactive element and verify whether it has a genuine effect on the system',
        example:
          'Map every button, toggle, slider, and setting to its backend effect. Flag any that have no real impact.',
        tips: [
          'Test each control in isolation and observe system behavior',
          'Check server logs to verify controls trigger real actions',
          'Ask engineering: "What happens when a user clicks this?"',
        ],
      },
      {
        step: 2,
        title: 'Remove or Replace Placebo Controls',
        description:
          'Eliminate controls that have no genuine effect, or connect them to real system behavior',
        example:
          'Remove a "Speed Up" button on a fixed-rate process, or replace it with a genuine priority queue',
        tips: [
          'If a control cannot be made functional, remove it honestly',
          'If users need the sense of progress, use accurate progress indicators instead',
          'Communicate system limitations transparently',
        ],
      },
      {
        step: 3,
        title: 'Provide Meaningful Customization',
        description:
          'Offer controls that genuinely change the user experience in observable ways',
        example:
          'Dashboard widget rearrangement, theme selection, notification frequency controls',
        tips: [
          'Focus on controls users actually value and use',
          'Provide smart defaults so customization is optional, not required',
          'Show immediate feedback when settings are changed',
        ],
      },
      {
        step: 4,
        title: 'Confirm Control Effects',
        description:
          'Provide clear feedback showing that user actions produced real changes',
        example:
          'After changing a filter, show updated result count with "Showing 42 of 298 items"',
        tips: [
          'Use aria-live regions for accessibility',
          'Show before/after comparisons for settings changes',
          'Timestamp when preferences were last saved and applied',
        ],
      },
      {
        step: 5,
        title: 'Be Transparent About Limitations',
        description:
          'Clearly communicate what users can and cannot control',
        example:
          'On an algorithmic feed: "Your preferences influence recommendations, but some results are promoted"',
        tips: [
          'Label automated vs user-controlled elements',
          'Explain when and why the system may override user preferences',
          'Provide documentation for how controls affect behavior',
        ],
      },
    ],

    dos: [
      'Ensure every interactive control has a genuine, observable effect',
      'Provide immediate, accurate feedback when users exercise control',
      'Offer meaningful customization with smart defaults',
      'Be transparent about what users can and cannot influence',
      'Give users real agency over their notification preferences',
      'Allow dashboard and workspace customization that persists',
      'Clearly label what is random vs what is user-influenced',
      'Use progressive disclosure to avoid overwhelming with options',
    ],

    donts: [
      'Don\'t add placebo buttons that have no real system effect',
      'Don\'t imply user skill or strategy where outcomes are random',
      'Don\'t provide fake "speed up" or "prioritize" controls on fixed processes',
      'Don\'t create excessive customization that overwhelms without real differentiation',
      'Don\'t override user preferences silently without notification',
      'Don\'t provide feedback that simulates a response where no real action occurred',
      'Don\'t use the illusion of control to encourage gambling or risk-taking behavior',
      'Don\'t let settings pages grow beyond what genuinely affects user experience',
    ],

    bestPractices: [
      {
        title: 'Genuine Agency Over Cosmetic Control',
        description:
          'Prioritize controls that meaningfully affect user outcomes over superficial customization',
        rationale:
          'Users derive lasting satisfaction from real control, not from the illusion of it',
        example:
          'Filter and sort controls that change visible results, rather than decorative theme options',
      },
      {
        title: 'Smart Defaults with Optional Depth',
        description:
          'Provide excellent defaults while allowing power users to customize deeply',
        rationale:
          'Most users benefit from good defaults; power users want granular control. Both feel agency.',
        example:
          'Dashboard ships with a sensible layout. An "Edit" mode reveals drag-and-drop and widget configuration.',
      },
      {
        title: 'Feedback Loops That Confirm Control',
        description:
          'Every user action should produce clear, immediate feedback demonstrating its effect',
        rationale:
          'Without feedback, users cannot distinguish genuine controls from placebo buttons',
        example:
          'Changing a notification toggle immediately shows "Email notifications: OFF. You will no longer receive weekly digests."',
      },
      {
        title: 'Transparent System Boundaries',
        description:
          'Clearly communicate the boundary between user-controlled and system-determined behavior',
        rationale:
          'Transparency builds trust; hidden overrides destroy it',
        example:
          '"Your sort preference is applied. Promoted items may appear at the top based on your activity."',
      },
      {
        title: 'Audit Controls Regularly',
        description:
          'Periodically verify that all controls still function and produce their intended effects',
        rationale:
          'Feature changes and system updates can silently disconnect controls from their backend effects',
        example:
          'Quarterly control audit: test every toggle, slider, and button for genuine system impact',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - All controls must have accessible names and communicate their state',
        implementation:
          'Use proper ARIA roles, labels, and state attributes so assistive technology users can identify and operate every control.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Changing a setting should not cause unexpected context changes',
        implementation:
          'When controls change system behavior, provide clear feedback without disorienting page reloads or focus changes.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Control effects must be communicated to assistive technology',
        implementation:
          'Use aria-live regions to announce the results of control actions (e.g., "Filter applied: showing 42 results").',
      },
    ],

    ethics: [
      {
        concern: 'Placebo Controls',
        severity: 'critical',
        explanation:
          'Adding buttons or controls that provide feedback but have no actual system effect is fundamentally deceptive',
        mitigation:
          'Audit all controls for genuine functionality. Remove or connect non-functional controls. Never deploy knowingly fake interactive elements.',
      },
      {
        concern: 'Gambling Exploitation',
        severity: 'critical',
        explanation:
          'Implying user skill or strategy in random outcomes (lottery, gambling, loot boxes) exploits the illusion of control to drive spending',
        mitigation:
          'Clearly label all random outcomes as random. Remove skill-implying language and choice mechanics from chance-based features.',
      },
      {
        concern: 'Silent Overrides',
        severity: 'high',
        explanation:
          'Allowing users to set preferences that the system silently ignores or overrides',
        mitigation:
          'If the system must override a user preference, notify the user and explain why. Never save settings that are not read by the system.',
      },
      {
        concern: 'Dark Pattern Customization',
        severity: 'high',
        explanation:
          'Offering extensive customization options to make opt-out from tracking or data collection harder to find',
        mitigation:
          'Ensure privacy and data controls are as prominent and accessible as feature customization. Never bury opt-out in complex settings.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Illusion of Control',
        author: 'Langer, E. J.',
        year: 1975,
        doi: '10.1037/0022-3514.32.2.311',
        description:
          'The foundational paper introducing the illusion of control, demonstrating how skill cues in chance situations create overestimation of personal influence',
        type: 'foundational',
      },
      {
        title: 'Perceived Control and the Experience of Pain',
        author: 'Thompson, S. C.',
        year: 1999,
        description:
          'Research on how perceived control affects subjective experience, demonstrating that even illusory control reduces stress and pain perception',
        type: 'advanced',
      },
      {
        title: 'Illusion of Control: A Meta-Analytic Review',
        author: 'Stefan, S., & David, D.',
        year: 2013,
        description:
          'Comprehensive meta-analysis of illusion of control research across contexts, confirming the robustness and universality of the effect',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Illusion of Conscious Will',
        author: 'Wegner, Daniel M.',
        year: 2002,
        isbn: '9780262731621',
        description:
          'Deep exploration of how the sense of agency and control is constructed by the brain, including implications for interface design',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Accessible discussion of control illusions and how they affect satisfaction, choice, and well-being',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Illusion of Control in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/illusion-of-control/',
        description:
          'Practical guide to recognizing and ethically applying illusion of control in user experience design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Illusion of Control',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=langer-illusion-control',
        description:
          'Video explanation of Langer\'s research and the illusion of control with real-world examples',
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
