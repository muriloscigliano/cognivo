/**
 * GENERATION EFFECT
 *
 * Information self-generated is remembered better than information merely read.
 * This is the GOLD STANDARD for memory-enhanced learning and engagement design.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const generationEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'generation-effect',
    name: 'Generation Effect',
    aliases: ['Self-Generation Advantage', 'Production Effect', 'Generation-Recognition Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory',
      'learning',
      'engagement',
      'interactive',
      'co-creation',
      'retention',
      'self-generated',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We remember information better when we generate it ourselves rather than simply reading or receiving it passively.',

    detailed: `The Generation Effect is a robust memory phenomenon demonstrating that information actively produced by an individual is retained more effectively than information passively consumed. When users create, configure, complete, or transform content themselves, they encode it more deeply into long-term memory.

This effect arises because self-generation requires deeper cognitive processing: retrieving related knowledge, making associations, applying rules, and constructing meaning. Passive reading bypasses much of this elaborative processing, resulting in shallower encoding.

In UX design, the generation effect has profound implications for onboarding, learning flows, feature adoption, and user engagement. Interfaces that invite users to actively participate -- filling in blanks, configuring settings, building their own dashboards, writing responses -- produce stronger memory traces and higher engagement than interfaces that simply present information for passive consumption.`,

    psychologyBasis: {
      discoveredBy: 'Norman J. Slamecka and Peter Graf',
      year: 1978,
      theory: 'Levels of Processing Framework / Generation Effect Research',
      mechanism: `Self-generated information is encoded more deeply because the act of generation engages multiple cognitive processes simultaneously:

1. **Elaborative Processing**: Generating an answer requires connecting new information to existing knowledge, creating richer associative networks
2. **Effortful Retrieval**: The cognitive effort of producing information strengthens the memory trace more than passive exposure
3. **Semantic Activation**: Generation activates related concepts and meaning, creating multiple retrieval pathways
4. **Personal Relevance**: Self-generated content feels more personally meaningful, enhancing emotional encoding
5. **Active Construction**: Building or completing information engages motor, linguistic, and conceptual systems simultaneously

The effect is robust across modalities (verbal, visual, motor) and persists even when the generated content is simple, such as completing word fragments or solving easy anagrams.`,
    },

    realWorldExample: `In Slamecka and Graf's seminal 1978 experiments, participants either read complete word pairs (e.g., "KING - CROWN") or generated the second word from a rule and fragment (e.g., "KING - CRO__"). Despite identical exposure time, generated words were recalled significantly better than read words. This finding has been replicated hundreds of times across contexts -- from vocabulary learning to medical education to software training.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Generation Effect fundamentally shapes how users learn, remember, and engage with interfaces. Designers can leverage this by replacing passive content consumption with active participation:

- Transform passive tutorials into interactive exercises where users produce answers
- Replace pre-built configurations with guided customization experiences
- Use fill-in-the-blank and completion patterns instead of multiple choice
- Enable user-generated content and co-creation workflows
- Design configurable features that let users build their own experience`,

    whenToUse: [
      {
        title: 'Interactive Onboarding',
        scenario:
          'When teaching new users how to use your product',
        example:
          'Have users type their first command, create their first project, or configure their first setting instead of showing a video walkthrough',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Learning and Education Flows',
        scenario: 'When users need to learn and retain new information or skills',
        example:
          'Use fill-in-the-blank exercises, interactive code editors, or guided practice instead of passive reading',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Discovery and Adoption',
        scenario: 'When introducing new features or capabilities to existing users',
        example:
          'Let users configure the feature for their own use case rather than showing a generic feature tour',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Dashboard and Workspace Setup',
        scenario: 'When users need to set up their working environment',
        example:
          'Offer configurable dashboards where users choose and arrange widgets, rather than providing a fixed default layout',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Knowledge Retention Checkpoints',
        scenario: 'When users need to remember critical information for later use',
        example:
          'Ask users to summarize key points in their own words or complete short exercises after reading documentation',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'User-Generated Content',
        scenario: 'When building community engagement and content platforms',
        example:
          'Invite users to create templates, share configurations, or write guides rather than only consuming pre-made content',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Time-Critical Tasks',
        reason:
          'Generation requires more time and cognitive effort than passive consumption',
        consequence:
          'Users in a hurry may abandon flows that demand active generation when they just need a quick answer',
        alternative:
          'Provide direct answers for urgent tasks, with optional interactive deepening for later',
      },
      {
        title: 'High Cognitive Load Contexts',
        reason:
          'Users already under cognitive strain cannot afford the extra effort of generation',
        consequence:
          'Frustration, errors, and drop-offs when users are stressed or multitasking',
        alternative:
          'Reduce friction with pre-filled defaults and allow users to customize later when cognitive resources are available',
      },
      {
        title: 'Accessibility-Sensitive Flows',
        reason:
          'Some interactive generation tasks create barriers for users with motor, cognitive, or sensory disabilities',
        consequence:
          'Exclusion of users who cannot easily type, drag, or complete interactive tasks',
        alternative:
          'Always provide equivalent passive alternatives alongside interactive generation tasks',
      },
      {
        title: 'Expert Users Performing Routine Tasks',
        reason:
          'Experienced users already know the information and do not benefit from regenerating it',
        consequence:
          'Feeling patronized or slowed down by unnecessary interactive steps',
        alternative:
          'Allow experts to skip generation steps and access direct workflows',
      },
    ],

    commonMistakes: [
      {
        title: 'Making Generation Too Difficult',
        description:
          'Requiring users to generate complex answers without sufficient scaffolding or hints',
        why: 'The generation effect works best when the task is challenging but achievable; too-hard tasks cause frustration and abandonment',
        fix: 'Provide hints, partial completions, and graduated difficulty. Start with easy generation and increase complexity.',
      },
      {
        title: 'Forcing Generation When Users Want Speed',
        description:
          'Requiring interactive steps in workflows where users just want to get things done quickly',
        why: 'Not every interaction benefits from generation; sometimes efficiency matters more than retention',
        fix: 'Make generation optional. Offer "quick setup" alongside "guided setup" paths.',
      },
      {
        title: 'Passive Disguised as Active',
        description:
          'Creating clickable elements that feel interactive but do not require real generation (e.g., trivial multiple choice with obvious answers)',
        why: 'The memory benefit comes from genuine cognitive effort, not from clicking buttons',
        fix: 'Ensure generation tasks require actual thinking: open-ended responses, configuration choices with real trade-offs, or creative construction.',
      },
      {
        title: 'No Feedback on Generated Content',
        description:
          'Asking users to generate responses but not confirming, correcting, or building on them',
        why: 'Without feedback, users cannot verify their generation was correct, undermining learning',
        fix: 'Provide immediate, constructive feedback on user-generated content. Show how their input connects to the system.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether users encounter passive or active elements and how generation tasks are scaffolded',
        examples: [
          'Interactive input fields placed prominently encourage generation over passive reading',
          'Progressive disclosure reveals generation tasks at appropriate moments',
          'Workspace layouts with empty slots invite users to fill and configure',
          'Side-by-side layouts show user-generated content alongside reference material',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can signal where generation is expected vs where content is informational',
        examples: [
          'Placeholder text in inputs prompts users to generate their own content',
          'Blank underlines or fill-in-the-blank formatting signals generation tasks',
          'Differentiated type styles distinguish user-generated from system content',
          'Monospace fonts in code editors signal areas for user generation',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color differentiates areas for user generation from system-provided content',
        examples: [
          'Distinct background colors highlight editable/configurable regions',
          'User-generated content shown in a different color reinforces ownership',
          'Empty state colors invite completion and generation',
          'Progress indicators show generation completion status',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design is the primary mechanism for enabling generation',
        examples: [
          'Text inputs, code editors, and drawing tools enable direct content generation',
          'Drag-and-drop configuration lets users build their own layouts',
          'Interactive tutorials with hands-on exercises produce stronger learning',
          'Inline editing transforms passive content into generation opportunities',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy determines the balance between passive consumption and active generation',
        examples: [
          'Fill-in-the-blank exercises outperform passive reading for retention',
          'Open-ended prompts ("Describe your goal...") produce better recall than pre-defined options',
          'User-written summaries are remembered better than pre-written summaries',
          'Templates with intentional gaps for user customization leverage the generation effect',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Generation tasks must be accessible to users with diverse abilities',
        examples: [
          'Provide keyboard-accessible alternatives to drag-and-drop generation tasks',
          'Voice input as an alternative generation method for motor-impaired users',
          'Screen reader compatible form labels for fill-in-the-blank exercises',
          'Allow multiple modalities for generation: typing, speaking, selecting',
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
        title: 'Interactive Code Tutorial',
        description:
          'A coding education platform where users write and run code instead of reading examples',
        code: `<div class="interactive-lesson">
  <div class="instruction">
    <h3>Create a greeting function</h3>
    <p>Write a function that takes a name and returns a greeting.</p>
    <div class="hint">
      <span class="hint-label">Hint:</span>
      Use template literals to combine "Hello, " with the name parameter.
    </div>
  </div>

  <div class="code-editor">
    <pre class="editable" contenteditable="true">
function greet(name) {
  // Write your code here
  return ____;
}
    </pre>
    <button class="run-btn">Run Code</button>
  </div>

  <div class="output">
    <p class="result"></p>
    <p class="feedback"></p>
  </div>
</div>`,
        explanation:
          'Users write actual code rather than reading a solution. The act of constructing the function -- recalling syntax, forming the logic, typing it out -- produces far stronger memory traces than reading a pre-written example.',
        principle:
          'Active code generation produces deeper learning than passive code reading',
        metrics: {
          before: '23% concept retention after 1 week with passive tutorials',
          after: '68% concept retention after 1 week with interactive coding',
          improvement: '196% increase in knowledge retention',
        },
      },
      {
        title: 'Configurable Dashboard Setup',
        description:
          'Analytics tool where users build their own dashboard by choosing and arranging widgets',
        code: `<div class="dashboard-builder">
  <h3>Build Your Dashboard</h3>
  <p>Drag the metrics that matter most to you into your workspace.</p>

  <div class="widget-palette">
    <div class="widget-option" draggable="true" data-type="revenue">
      <span class="icon">📊</span> Revenue
    </div>
    <div class="widget-option" draggable="true" data-type="users">
      <span class="icon">👥</span> Active Users
    </div>
    <div class="widget-option" draggable="true" data-type="conversion">
      <span class="icon">🎯</span> Conversion Rate
    </div>
    <div class="widget-option" draggable="true" data-type="churn">
      <span class="icon">📉</span> Churn Rate
    </div>
  </div>

  <div class="dashboard-canvas" role="region" aria-label="Dashboard workspace">
    <div class="drop-zone" aria-label="Drop widget here">
      <p class="empty-state">Drag a metric here</p>
    </div>
    <div class="drop-zone" aria-label="Drop widget here">
      <p class="empty-state">Drag a metric here</p>
    </div>
  </div>
</div>`,
        explanation:
          'Instead of presenting a pre-built dashboard, users actively construct their own by selecting and arranging widgets. This generation process means users remember what each metric represents and where to find it, reducing later confusion.',
        principle:
          'User-configured layouts are remembered better than pre-built defaults',
        metrics: {
          before: '41% of users needed help finding metrics on pre-built dashboards',
          after: '12% of users needed help on self-configured dashboards',
          improvement: '71% reduction in support requests for dashboard navigation',
        },
      },
      {
        title: 'Fill-in-the-Blank Onboarding',
        description:
          'SaaS product onboarding that asks users to complete sentences about their goals',
        code: `<div class="onboarding-step">
  <h3>Tell us about your team</h3>

  <div class="fill-in-prompt">
    <p class="prompt-text">
      My team of
      <input type="text" class="inline-input" placeholder="number"
             aria-label="Team size" />
      people needs help with
      <input type="text" class="inline-input" placeholder="challenge"
             aria-label="Main challenge" />
      so we can
      <input type="text" class="inline-input" placeholder="goal"
             aria-label="Primary goal" />.
    </p>
  </div>

  <div class="personalization-preview">
    <h4>Your personalized workspace:</h4>
    <p class="preview-text">Based on your input, we'll set up...</p>
  </div>

  <button class="primary">Create My Workspace</button>
</div>`,
        explanation:
          'Users articulate their own goals and context rather than selecting from a pre-defined list. Writing their challenges in their own words creates stronger personal connection and better recall of why they chose the product.',
        principle:
          'Self-articulated goals produce stronger commitment and recall than selected options',
      },
    ],

    bad: [
      {
        title: 'Passive Video Walkthrough',
        description:
          'Onboarding that relies entirely on a video users watch without any interaction',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding">
  <h3>Welcome! Watch this 5-minute video to get started.</h3>
  <video src="tutorial.mp4" controls>
    <track kind="captions" src="captions.vtt" srclang="en">
  </video>
  <button class="skip">Skip Tutorial</button>
</div>`,
        explanation:
          'Passive video watching produces minimal retention. Users cannot practice, generate, or interact with the content. Most will skip or forget the content within minutes. No generation means no deep encoding.',
        principle:
          'Passive consumption produces shallow encoding and rapid forgetting',
      },
      {
        title: 'Trivial Multiple Choice',
        description:
          'Quiz that gives obvious answers, requiring no real generation or thought',
        code: `<!-- DON'T DO THIS -->
<div class="quiz">
  <h3>What does the Save button do?</h3>
  <label><input type="radio" name="q1" value="a"> Deletes your work</label>
  <label><input type="radio" name="q1" value="b"> Saves your work</label>
  <label><input type="radio" name="q1" value="c"> Prints your work</label>
</div>`,
        explanation:
          'Multiple choice with an obvious correct answer requires recognition, not generation. Users can guess without engaging in any meaningful cognitive processing. This produces almost no memory benefit over simply reading.',
        principle:
          'Recognition tasks without genuine effort do not produce the generation effect',
      },
      {
        title: 'Pre-Filled Everything',
        description:
          'Setup wizard that fills in all values automatically with no user input',
        code: `<!-- DON'T DO THIS -->
<div class="setup-wizard">
  <h3>Your workspace is ready!</h3>
  <p>We've set everything up for you automatically:</p>
  <ul>
    <li>Dashboard: Default Analytics View</li>
    <li>Notifications: All enabled</li>
    <li>Theme: System default</li>
    <li>Widgets: Standard layout</li>
  </ul>
  <button class="primary">Start Using</button>
</div>`,
        explanation:
          'When everything is pre-configured, users skip the generation process entirely. They have no memory of what was set up, why, or how to change it later. This leads to learned helplessness and support dependency.',
        principle:
          'Zero user generation means zero ownership and poor feature recall',
      },
    ],

    realWorld: [
      {
        company: 'Codecademy',
        product: 'Interactive Coding Lessons',
        description: 'Codecademy requires users to write actual code in an interactive editor rather than reading code examples. Each lesson presents a challenge and the user must generate the solution, producing significantly better retention of programming concepts.',
        effectiveness: 'very-effective',
        analysis: 'By forcing genuine code generation, Codecademy leverages the generation effect to achieve retention rates far higher than passive video courses. Users who complete interactive exercises retain syntax and concepts weeks later.',
      },
      {
        company: 'Notion',
        product: 'Template Customization',
        description: 'Notion provides starting templates that users then customize extensively -- adding properties, reorganizing views, writing content. The templates are scaffolds for generation, not finished products. Users remember their Notion setups because they built them.',
        effectiveness: 'very-effective',
        analysis: 'Notion templates hit the sweet spot of the generation effect: enough structure to prevent frustration, enough openness to require genuine user generation. Users develop deep familiarity with features through the construction process.',
      },
      {
        company: 'Canva',
        product: 'Design Editor',
        description: 'Canva provides templates and elements but requires users to actively compose designs -- choosing layouts, editing text, selecting colors, arranging elements. Even casual users generate their own designs rather than using unmodified templates.',
        effectiveness: 'very-effective',
        analysis: 'Canva democratizes design through guided generation. Users learn design principles through hands-on construction, retaining knowledge of tool capabilities because they actively used them rather than reading about them.',
      },
      {
        company: 'Duolingo',
        product: 'Language Exercises',
        description: 'Duolingo uses translation, fill-in-the-blank, and sentence construction exercises that require users to generate language rather than merely recognize it. Type-the-answer exercises produce stronger retention than tap-the-word exercises.',
        effectiveness: 'very-effective',
        analysis: 'Duolingo explicitly leverages the generation effect: harder generation tasks (typing translations) produce better learning than easier recognition tasks (tapping words). The difficulty is calibrated to maximize generation without causing frustration.',
      },
      {
        company: 'Figma',
        product: 'Interactive Tutorials',
        description: 'Figma onboarding asks new users to perform actual design tasks -- drawing shapes, applying styles, using auto layout -- in a guided sandbox rather than watching demonstrations.',
        effectiveness: 'effective',
        analysis: 'Hands-on generation in a safe sandbox environment lets users build muscle memory and conceptual understanding simultaneously. Users who complete the interactive tutorial navigate the tool confidently because they generated the knowledge through practice.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Interactive Setup vs Pre-Configured Defaults',
        hypothesis:
          'Users who actively configure their workspace will retain feature knowledge better and engage more deeply',
        controlVersion: {
          description:
            'Pre-configured workspace with all defaults set automatically. Users receive a "Your workspace is ready" message and start immediately.',
          metrics: {
            conversionRate: '78%',
            timeOnPage: '0:45',
            scrollDepth: '20%',
          },
        },
        treatmentVersion: {
          description:
            'Guided configuration wizard asking users to choose their metrics, arrange dashboard widgets, and set notification preferences through interactive steps.',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '4:30',
            scrollDepth: '95%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While initial completion rate was slightly lower (71% vs 78%), users who completed interactive setup showed 3.2x higher 30-day retention, 2.5x more feature adoption, and 60% fewer support tickets about finding features. The generation process produced lasting knowledge.',
          learnings: [
            'Initial friction from generation is offset by dramatically better long-term engagement',
            'Users who configured their own workspace used 4.7 features on average vs 2.1 for default users',
            'Support tickets about "where is X?" dropped 60% in the interactive group',
            'Offering a "quick start" fallback captured users who would otherwise abandon',
          ],
        },
      },
      {
        title: 'Documentation: Fill-in-the-Blank vs Passive Reading',
        hypothesis:
          'Fill-in-the-blank exercises after documentation will improve knowledge retention',
        controlVersion: {
          description:
            'Standard documentation page with text, code examples, and screenshots. Users read passively.',
          metrics: {
            conversionRate: '100%',
            timeOnPage: '2:10',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Same documentation with embedded fill-in-the-blank exercises: "To create a new component, use the ___ command" and interactive code snippets requiring user completion.',
          metrics: {
            conversionRate: '89%',
            timeOnPage: '5:40',
            scrollDepth: '88%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Knowledge retention tested 7 days later showed treatment group remembered 2.8x more concepts. While some users (11%) skipped the exercises, those who completed them needed 73% fewer return visits to the same documentation page.',
          learnings: [
            'Generation exercises nearly tripled 7-day knowledge retention',
            'Users returned to the documentation 73% less often, indicating better initial learning',
            'The exercises also surfaced misconceptions early, reducing downstream errors',
            'Best results came from exercises that required applying the concept, not just recalling terms',
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
        name: 'Empty Input Fields',
        description:
          'Text inputs, code editors, or blank areas inviting user-generated content',
        howToSpot:
          'Look for placeholder text, blank underlines, empty text areas, or "Type here" prompts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Configurable Layouts',
        description:
          'Drag-and-drop zones, widget palettes, or customizable grids',
        howToSpot:
          'Look for drag handles, "Add widget" buttons, empty slots, or rearrangeable elements',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Fill-in-the-Blank Patterns',
        description:
          'Inline inputs embedded within sentences or prompts requiring completion',
        howToSpot:
          'Look for sentences with gaps, underlines, or inline form fields within instructional text',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Interactive Exercise Sections',
        description:
          'Hands-on practice areas distinct from passive reading content',
        howToSpot:
          'Look for "Try it yourself" sections, sandboxes, code playgrounds, or practice areas',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Template Starting Points',
        description:
          'Pre-structured content with clear customization affordances',
        howToSpot:
          'Look for templates with editable fields, suggested content that invites modification, or "Make it yours" prompts',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Interactive Tutorial Pattern',
        description: 'Step-by-step learning that requires users to perform actions rather than read instructions',
        indicators: ['Hands-on exercises between instructional content', 'Code editors or input fields within tutorials', '"Now you try" prompts', 'Immediate feedback on user-generated responses'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Guided Configuration Pattern',
        description: 'Setup flows where users actively choose and arrange their environment',
        indicators: ['Widget or component selection palettes', 'Drag-and-drop workspace builders', 'Multi-step configuration wizards with user input', 'Preference selection with visible consequences'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Co-Creation Pattern',
        description: 'Features that blend system-provided structure with user-generated content',
        indicators: ['Templates with editable sections', 'AI-assisted content that users review and modify', 'Collaborative editing with personal contributions', 'User-created and shared configurations'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Active Recall Pattern',
        description: 'Knowledge checks that require generation rather than recognition',
        indicators: ['Open-ended questions after instructional content', 'Fill-in-the-blank over multiple choice', 'Writing or typing required for progression', 'Self-assessment prompts'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the interface require users to generate content or merely consume it?',
      'Are there interactive exercises that demand active participation?',
      'Can users configure and customize their environment, or is everything pre-set?',
      'Do learning flows use fill-in-the-blank or open-ended prompts instead of trivial multiple choice?',
      'Is there a balance between scaffolding (structure) and open generation (freedom)?',
      'Do generation tasks include immediate, constructive feedback?',
      'Are passive alternatives available for users who cannot engage in generation tasks?',
      'Is the difficulty of generation tasks calibrated -- challenging but achievable?',
      'Does the design allow users to see the results of their generation in context?',
      'Are expert users given the option to skip generation steps they no longer need?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the generation effect -- the finding that self-generated information is remembered better than passively received information.

Analyze the provided design for generation effect patterns. Identify:

1. **Active vs Passive Balance**: What proportion of the experience requires user generation vs passive consumption?
2. **Generation Quality**: Are generation tasks meaningful (requiring real thought) or trivial (obvious answers)?
3. **Scaffolding**: Is there appropriate structure to support generation without making it too easy?
4. **Feedback Loops**: Does user-generated content receive immediate, constructive feedback?
5. **Customization Depth**: Can users genuinely configure and create, or are options superficial?

For each pattern found:
- Identify whether it leverages or misses generation effect opportunities
- Assess the cognitive effort required (too easy = no benefit, too hard = frustration)
- Determine if accessible alternatives exist for users who cannot engage in generation
- Evaluate whether generation improves the user experience or adds unnecessary friction
- Suggest improvements for maximizing retention through appropriate generation

Consider:
- Are there missed opportunities to replace passive reading with active generation?
- Is the generation difficulty calibrated to the user's skill level?
- Do generation tasks connect to meaningful outcomes (not busywork)?
- Are expert users given shortcuts past generation they no longer need?
- Is the balance right between learning (generation helps) and productivity (generation slows)?

Provide actionable recommendations for ethical, effective use of the generation effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        generationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              generationType: { type: 'string' },
              cognitiveEffort: { type: 'string' },
              feedbackProvided: { type: 'boolean' },
              accessibleAlternative: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'generationType',
              'cognitiveEffort',
              'feedbackProvided',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            activeVsPassiveRatio: { type: 'number' },
            generationQuality: { type: 'number' },
            scaffoldingAdequacy: { type: 'number' },
            feedbackQuality: { type: 'number' },
          },
          required: [
            'activeVsPassiveRatio',
            'generationQuality',
            'scaffoldingAdequacy',
            'feedbackQuality',
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
        'generationPatterns',
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
        title: 'Identify Passive Content',
        description:
          'Audit your interface for content users passively consume that would benefit from active generation',
        example:
          'Identify onboarding slides, documentation pages, and feature tours that users read without interacting',
        tips: [
          'Focus on content users need to remember and apply later',
          'Prioritize high-value flows: onboarding, feature adoption, learning',
          'Map where users currently struggle to retain information',
        ],
      },
      {
        step: 2,
        title: 'Design Generation Tasks',
        description:
          'Transform passive content into active generation exercises at the right difficulty level',
        example:
          'Replace "Read about our API endpoints" with "Write a request to fetch user data using our API"',
        tips: [
          'Match difficulty to user skill level and context',
          'Start with easier generation tasks and increase complexity',
          'Provide hints and scaffolding for harder tasks',
        ],
      },
      {
        step: 3,
        title: 'Add Scaffolding and Hints',
        description:
          'Support generation with structure that prevents frustration without eliminating the challenge',
        example:
          'Provide a code template with blanks to fill in, rather than a completely empty editor',
        tips: [
          'Use fill-in-the-blank as a middle ground between passive and fully open generation',
          'Offer progressive hints that reveal more detail on request',
          'Include examples of completed tasks for reference',
        ],
      },
      {
        step: 4,
        title: 'Implement Immediate Feedback',
        description:
          'Give users constructive feedback on their generated content right away',
        example:
          'After user writes a function, immediately run it and show results alongside expected output',
        tips: [
          'Feedback should confirm correctness and explain why',
          'Show how user-generated content fits into the bigger picture',
          'Celebrate successful generation to reinforce the behavior',
        ],
      },
      {
        step: 5,
        title: 'Provide Accessible Alternatives',
        description:
          'Ensure all generation tasks have equivalent passive paths for users who need them',
        example:
          'Offer "Show me the answer" alongside fill-in-the-blank, with a note that trying first helps retention',
        tips: [
          'Never gate critical functionality behind generation-only paths',
          'Support multiple input modalities: typing, voice, selection',
          'Test generation tasks with assistive technologies',
        ],
      },
      {
        step: 6,
        title: 'Measure Retention Impact',
        description:
          'Track whether generation tasks actually improve long-term retention and engagement',
        example:
          'Compare 7-day and 30-day feature usage between users who completed generation tasks and those who skipped them',
        tips: [
          'Measure retention, not just completion rates',
          'Track support ticket reduction as a proxy for better learning',
          'Monitor whether generation tasks cause drop-offs at unacceptable rates',
        ],
      },
    ],

    dos: [
      'Replace passive reading with interactive exercises wherever retention matters',
      'Use fill-in-the-blank and open-ended prompts instead of trivial multiple choice',
      'Let users configure and customize their own workspaces and settings',
      'Provide immediate, constructive feedback on user-generated content',
      'Scaffold generation tasks with hints and progressive difficulty',
      'Offer templates as starting points for user customization, not finished products',
      'Calibrate generation difficulty to be challenging but achievable',
      'Allow expert users to skip generation steps they no longer need',
    ],

    donts: [
      'Don\'t rely solely on passive content delivery for information users need to retain',
      'Don\'t make generation tasks so hard that users give up in frustration',
      'Don\'t use trivial multiple choice as a substitute for genuine generation',
      'Don\'t force generation in time-critical or emergency workflows',
      'Don\'t pre-fill everything when user configuration would improve retention',
      'Don\'t skip feedback -- generation without validation produces incorrect learning',
      'Don\'t gate critical features behind mandatory generation tasks without alternatives',
      'Don\'t assume all users benefit equally from generation -- provide options',
    ],

    bestPractices: [
      {
        title: 'Guided Generation Over Blank Slate',
        description:
          'Provide structured templates with intentional gaps rather than completely empty starting points',
        rationale:
          'Blank slates overwhelm users; structured generation with gaps provides the right balance of challenge and support',
        example:
          'A project template with pre-set structure but blank fields for name, goals, and key metrics',
      },
      {
        title: 'Progressive Generation Difficulty',
        description:
          'Start with easier generation tasks (choosing from options) and progress to harder ones (open-ended creation)',
        rationale:
          'Graduated difficulty builds confidence and skills, preventing early frustration while deepening learning',
        example:
          'Step 1: Select a template. Step 2: Customize colors. Step 3: Write your own copy. Step 4: Build a custom layout.',
      },
      {
        title: 'Show Generation Impact',
        description:
          'Immediately show users how their generated content changes their experience',
        rationale:
          'Seeing the consequences of generation reinforces the memory and motivates continued engagement',
        example:
          'When a user configures dashboard widgets, immediately show the live dashboard updating in real time',
      },
      {
        title: 'Generation with Social Sharing',
        description:
          'Let users share their generated content with others, reinforcing ownership and recall',
        rationale:
          'Social sharing adds a retrieval and articulation step, further strengthening the memory trace',
        example:
          'Allow users to share their custom configurations, templates, or solutions with teammates',
      },
      {
        title: 'Spaced Generation Practice',
        description:
          'Revisit generation tasks at spaced intervals to reinforce long-term retention',
        rationale:
          'Combining the generation effect with spaced repetition produces the strongest possible retention',
        example:
          'After initial onboarding generation, prompt users to reconfigure or review their setup after 1 week',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Generation tasks must have proper semantic structure',
        implementation:
          'Use proper form labels, fieldsets, and ARIA attributes for fill-in-the-blank and interactive generation tasks so screen readers convey the task structure',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All generation tasks must be keyboard accessible',
        implementation:
          'Ensure drag-and-drop configuration has keyboard alternatives (arrow keys, Tab navigation). All interactive generation elements must be focusable and operable.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Generation tasks need clear instructions',
        implementation:
          'Provide visible labels, instructions, and expected formats for all generation inputs. Include examples and hints.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Feedback on generation must be announced',
        implementation:
          'Use ARIA live regions to announce feedback on user-generated content so screen reader users receive the same immediate response.',
      },
    ],

    ethics: [
      {
        concern: 'Forced Participation',
        severity: 'high',
        explanation:
          'Requiring generation for critical tasks without passive alternatives excludes users who cannot engage in active generation',
        mitigation:
          'Always provide equivalent passive paths. Make generation the recommended approach, not the only approach.',
      },
      {
        concern: 'Data Collection Through Generation',
        severity: 'high',
        explanation:
          'User-generated content creates data that could be used beyond the stated purpose of improving retention',
        mitigation:
          'Be transparent about how generated content is stored and used. Allow users to delete their generated content. Do not use generation as a covert data collection mechanism.',
      },
      {
        concern: 'Frustration and Exclusion',
        severity: 'medium',
        explanation:
          'Poorly calibrated generation tasks can frustrate users with different skill levels or cognitive abilities',
        mitigation:
          'Provide adjustable difficulty, hints, and skip options. Test with diverse user populations to ensure inclusive difficulty calibration.',
      },
      {
        concern: 'Manufactured Engagement',
        severity: 'medium',
        explanation:
          'Using generation as a dark pattern to increase time-on-site or engagement metrics without genuine user benefit',
        mitigation:
          'Generation tasks should serve user learning and retention, not engagement metrics. Measure retention impact, not just time spent.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Generation Effect: Delineation of a Phenomenon',
        author: 'Slamecka, N. J., & Graf, P.',
        year: 1978,
        doi: '10.1016/S0022-5371(78)90370-3',
        description:
          'The foundational paper demonstrating that self-generated items are remembered better than read items across multiple experiments',
        type: 'foundational',
      },
      {
        title: 'The Generation Effect: A Meta-Analytic Review',
        author: 'Bertsch, S., et al.',
        year: 2007,
        doi: '10.3758/BF03194070',
        description:
          'Comprehensive meta-analysis confirming the robustness of the generation effect across conditions and populations',
        type: 'advanced',
      },
      {
        title: 'Generation and Memory',
        author: 'Mulligan, N. W., & Lozito, J. P.',
        year: 2004,
        doi: '10.1111/j.1467-9280.2004.00426.x',
        description:
          'Explores the boundary conditions and mechanisms of the generation effect in different memory tasks',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Make It Stick: The Science of Successful Learning',
        author: 'Brown, P. C., Roediger, H. L., & McDaniel, M. A.',
        year: 2014,
        isbn: '9780674729018',
        description:
          'Practical application of generation effect and active recall principles to learning design',
        type: 'practical',
      },
      {
        title: 'How We Learn: The Surprising Truth About When, Where, and Why It Happens',
        author: 'Carey, Benedict',
        year: 2014,
        isbn: '9780812984293',
        description:
          'Accessible overview of learning science including the generation effect and its implications for education and training',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Testing Effect and the Generation Effect in Learning',
        author: 'Karpicke, J. D., & Zaromb, F. M.',
        url: 'https://journals.sagepub.com/doi/10.1177/0956797610395294',
        description:
          'Research connecting the generation effect to the testing effect, with practical implications for educational design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Active Recall and the Generation Effect',
        author: 'Ali Abdaal',
        url: 'https://www.youtube.com/watch?v=fDbxPVn02VU',
        description:
          'Practical explanation of how the generation effect enhances learning, with study technique examples',
        type: 'practical',
      },
    ],

    demos: [
      {
        title: 'Codecademy Interactive Lessons',
        author: 'Codecademy',
        url: 'https://www.codecademy.com',
        description:
          'Industry-leading example of the generation effect applied to programming education through interactive code exercises',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'testing-effect',       // Active recall strengthens generation-based learning
      'spacing-effect',       // Spaced generation produces strongest retention
      'ikea-effect',          // Users value what they helped create
      'endowment-effect',     // Self-generated content feels more valuable
      'commitment-consistency', // Generation creates commitment to choices made
    ],

    conflicts: [
      'cognitive-load',       // Generation adds cognitive effort that can overwhelm
      'default-effect',       // Pre-filled defaults reduce generation opportunities
    ],

    confusedWith: [
      'testing-effect',       // Related but distinct: testing retrieves, generation produces
      'production-effect',    // Overlapping concept focused on spoken/written production
      'ikea-effect',          // Overlaps in valuing self-made items, but IKEA effect is about valuation, not memory
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'production-effect',
        'self-reference-effect',
      ],
    },
  },
};
