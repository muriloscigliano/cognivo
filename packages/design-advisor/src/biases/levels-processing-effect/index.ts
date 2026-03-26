/**
 * LEVELS OF PROCESSING EFFECT
 *
 * Deeper cognitive processing of information leads to better retention.
 * Semantic processing > phonetic processing > visual/structural processing.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const levelsProcessingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'levels-processing-effect',
    name: 'Levels of Processing Effect',
    aliases: ['Depth of Processing', 'Elaborative Encoding', 'Craik-Lockhart Framework'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'learning',
      'retention',
      'engagement',
      'depth-of-processing',
      'encoding',
      'comprehension',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We remember information better when we process it deeply and meaningfully, rather than superficially.',

    detailed: `The Levels of Processing Effect describes how the depth at which information is cognitively processed determines how well it is retained in memory. Shallow processing (focusing on surface features like font or color) produces weaker memories than deep processing (focusing on meaning, associations, and personal relevance).

There are three broadly recognized levels of encoding:
1. **Structural/Visual** (shallowest): Processing physical appearance — "Is this word in uppercase?"
2. **Phonetic/Acoustic**: Processing sound — "Does this word rhyme with 'train'?"
3. **Semantic** (deepest): Processing meaning — "Does this word fit in the sentence: 'The ___ sat on the mat'?"

In UX design, this effect has profound implications for onboarding, learning flows, help documentation, and any context where users need to retain information. Interfaces that encourage users to actively engage with content — through categorization, reflection, or application — produce dramatically better recall than passive reading or viewing.`,

    psychologyBasis: {
      discoveredBy: 'Fergus I. M. Craik and Robert S. Lockhart',
      year: 1972,
      theory: 'Levels of Processing Framework',
      mechanism: `Memory strength depends on the depth of cognitive processing at the time of encoding. This happens because:

1. **Semantic Elaboration**: When we process meaning, we create richer associative networks in memory, connecting new information to existing knowledge
2. **Distinctiveness**: Deep processing produces more distinctive memory traces that are easier to discriminate during retrieval
3. **Effort-Encoding Relationship**: Greater cognitive effort during encoding generally leads to stronger memory traces (the "desirable difficulty" principle)
4. **Self-Reference Effect**: Information processed in relation to oneself is encoded most deeply of all
5. **Generation Effect**: Actively generating information (rather than passively reading it) forces deeper processing and produces stronger retention

The framework predicts that asking "what does this mean?" produces better memory than asking "what does this look like?" — even when participants are not trying to memorize the material.`,
    },

    realWorldExample: `In Craik and Tulving's 1975 experiments, participants were shown words and asked questions requiring different processing depths. For structural processing: "Is this word in capital letters?" For phonetic: "Does this word rhyme with 'weight'?" For semantic: "Would this word fit in the sentence: 'He met a ___ in the street'?" In a surprise recall test, words processed semantically were remembered 2-3x better than structurally processed words — even though participants spent the same amount of time on each word.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Levels of Processing Effect determines how well users retain what they learn from your interface. Designers can leverage this to:

- Create onboarding that users actually remember by requiring meaningful engagement
- Design help content that teaches through application, not just explanation
- Build learning experiences that move users from passive reading to active comprehension
- Encourage deeper engagement with features through interactive exploration
- Improve form completion and data entry through meaningful contextualization`,

    whenToUse: [
      {
        title: 'Onboarding and Tutorials',
        scenario:
          'When teaching users how to use a product or feature for the first time',
        example:
          'Instead of a passive tour, have users complete a meaningful task: "Create your first project by naming it and adding one team member"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Learning Platforms',
        scenario: 'When building educational content or training materials',
        example:
          'After explaining a concept, prompt users with a semantic question: "Which of these real scenarios would benefit from this approach?"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Help Documentation',
        scenario: 'When designing in-app help, tooltips, or knowledge bases',
        example:
          'Include "Try it yourself" interactive examples alongside explanations, requiring users to apply concepts rather than just read them',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Settings and Configuration',
        scenario: 'When users need to understand and remember configuration choices',
        example:
          'Show the real-world impact of each setting choice: "This means your team will receive email notifications for every new comment"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Security Education',
        scenario: 'When helping users understand and remember security practices',
        example:
          'Ask users to categorize example passwords as weak, medium, or strong — rather than just listing password rules',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency or Time-Critical Flows',
        reason:
          'Deep processing requires time and cognitive effort that users cannot spare in urgent situations',
        consequence:
          'Users may abandon the task or miss critical information while trying to process deeply',
        alternative:
          'Use recognition-based patterns and clear, immediate instructions for urgent flows',
      },
      {
        title: 'Frequent Repetitive Tasks',
        reason:
          'Users performing the same task daily do not need deep encoding — they need efficiency',
        consequence:
          'Forcing deep processing on routine tasks increases frustration and slows workflows',
        alternative:
          'Optimize for speed and muscle memory; reserve deep processing for initial learning only',
      },
      {
        title: 'High Cognitive Load Contexts',
        reason:
          'When users are already processing complex information, additional depth requirements can overwhelm',
        consequence:
          'Cognitive overload, errors, and abandonment when too much depth is demanded simultaneously',
        alternative:
          'Chunk information and introduce deep processing gradually across multiple sessions',
      },
      {
        title: 'Casual Browsing Experiences',
        reason:
          'Users in exploratory mode may not have the motivation for deep engagement',
        consequence:
          'Friction that drives users away before they discover value',
        alternative:
          'Allow shallow engagement initially; introduce deeper processing once users are committed',
      },
    ],

    commonMistakes: [
      {
        title: 'Passive Video Walkthroughs',
        description:
          'Relying on video tutorials or animated tours that require no user interaction',
        why: 'Watching is shallow, visual-level processing — users forget most content within minutes',
        fix: 'Intersperse videos with interactive checkpoints: "Now you try — click the button to create a widget"',
      },
      {
        title: 'Information Dumps',
        description:
          'Presenting long blocks of text without requiring comprehension or engagement',
        why: 'Reading without active processing is shallow encoding; retention rates are below 20%',
        fix: 'Break content into small sections with reflection prompts: "How would you use this in your workflow?"',
      },
      {
        title: 'Checkbox Confirmations',
        description:
          'Using "I have read and understood" checkboxes as a proxy for comprehension',
        why: 'Clicking a checkbox is structural processing — users process the checkbox, not the content',
        fix: 'Replace with comprehension checks: "Which of these best describes what happens when you delete your account?"',
      },
      {
        title: 'Tooltip Overload',
        description:
          'Showing dozens of tooltips during onboarding that users dismiss without reading',
        why: 'Dismissing tooltips is motor action, not semantic processing — nothing is encoded meaningfully',
        fix: 'Show fewer tooltips tied to actual user actions, requiring the user to complete a related task',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout can encourage or discourage deep processing through information structure',
        examples: [
          'Progressive disclosure reveals information as users demonstrate understanding',
          'Side-by-side comparison layouts encourage analytical (deeper) processing',
          'Interactive workspaces invite manipulation and application of concepts',
          'Chunked layouts with clear sections support incremental deep processing',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography affects structural-level processing but has limited impact on depth',
        examples: [
          'Clear headings help users organize information semantically',
          'Readable body text removes friction to reach deeper processing',
          'Emphasis on key terms can prompt users to think about meaning',
          'Poor typography forces structural processing and blocks semantic engagement',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color operates at the structural processing level and has minimal direct impact on depth',
        examples: [
          'Semantic color coding (red=error, green=success) bridges structural and meaning levels',
          'Consistent color systems help users build mental models over time',
          'Color-coded categories encourage classification (a form of deep processing)',
          'Decorative color without meaning stays at the shallowest processing level',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements are the primary driver of processing depth in digital interfaces',
        examples: [
          'Interactive exercises force users to generate answers (generation effect)',
          'Drag-and-drop categorization requires semantic processing of items',
          'Fill-in-the-blank prompts require deeper processing than multiple choice',
          'Real task completion during onboarding produces strongest encoding',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content design determines whether users engage at structural, phonetic, or semantic levels',
        examples: [
          'Questions about meaning ("Why would you use this?") drive semantic processing',
          'Real-world examples connect new concepts to existing knowledge',
          'Analogies and metaphors force users to map meaning across domains',
          'Abstract descriptions without context stay at shallow processing levels',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must ensure deep processing opportunities are available to all users',
        examples: [
          'Interactive exercises must be keyboard-navigable for deep processing by all users',
          'Screen reader users need semantic HTML to access meaning, not just structure',
          'Alternative formats for interactive elements ensure equitable depth of processing',
          'Captions and transcripts allow deaf users to process video content semantically',
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
        title: 'Interactive Exercise Over Passive Reading',
        description:
          'Language learning app requiring users to construct sentences rather than read translations',
        code: `<div class="exercise-card">
  <h3>Translate this sentence</h3>
  <p class="source-sentence" lang="es">"El gato se sienta en la alfombra."</p>

  <div class="word-bank">
    <button class="word-chip" draggable="true">The</button>
    <button class="word-chip" draggable="true">cat</button>
    <button class="word-chip" draggable="true">sits</button>
    <button class="word-chip" draggable="true">on</button>
    <button class="word-chip" draggable="true">the</button>
    <button class="word-chip" draggable="true">rug</button>
    <button class="word-chip" draggable="true">dog</button>
  </div>

  <div class="answer-area" role="region" aria-label="Your answer">
    <!-- Drop zone for constructed sentence -->
  </div>

  <button class="check-btn" disabled>Check Answer</button>
</div>`,
        explanation:
          'Constructing sentences from word banks requires semantic processing — users must understand meaning to select and order words correctly. This produces 2-3x better retention than reading a translation.',
        principle:
          'Generation effect: producing answers requires deeper processing than recognizing them',
        metrics: {
          before: '23% vocabulary retention after 1 week with flashcard reading',
          after: '61% vocabulary retention after 1 week with sentence construction',
          improvement: '165% improvement in long-term retention',
        },
      },
      {
        title: 'Meaningful Categorization Task',
        description:
          'Project management onboarding that asks users to categorize their own work items',
        code: `<div class="onboarding-step">
  <h3>Organize your work</h3>
  <p>Drag each item into the category that fits best for your team:</p>

  <div class="categorization-area">
    <div class="source-items">
      <div class="item" draggable="true">Weekly team standup</div>
      <div class="item" draggable="true">Q3 product roadmap</div>
      <div class="item" draggable="true">Fix login page bug</div>
      <div class="item" draggable="true">Customer interview notes</div>
    </div>

    <div class="categories">
      <div class="category" data-type="task">
        <h4>Tasks</h4>
        <p class="hint">Individual action items</p>
      </div>
      <div class="category" data-type="project">
        <h4>Projects</h4>
        <p class="hint">Multi-step initiatives</p>
      </div>
      <div class="category" data-type="reference">
        <h4>Reference</h4>
        <p class="hint">Information to revisit</p>
      </div>
    </div>
  </div>

  <p class="explanation">
    This helps you understand how to organize work in [Product].
    You can always recategorize later.
  </p>
</div>`,
        explanation:
          'Categorizing items requires users to evaluate meaning and decide where each item belongs. This semantic processing teaches the product\'s organizational model far better than a tour pointing at empty categories.',
        principle:
          'Categorization forces semantic processing — users must evaluate meaning to classify',
        metrics: {
          before: '34% of users created projects correctly after video tutorial',
          after: '72% of users created projects correctly after categorization exercise',
          improvement: '112% increase in correct feature usage',
        },
      },
      {
        title: 'Reflection Prompts in Documentation',
        description:
          'Developer documentation with embedded comprehension prompts',
        code: `<article class="docs-page">
  <h2>Authentication Flow</h2>
  <p>When a user submits credentials, the server validates them against
  the stored hash, generates a JWT token with a 24-hour expiry, and
  returns it in the response body.</p>

  <div class="reflection-prompt" role="region" aria-label="Check your understanding">
    <h4>Check your understanding</h4>
    <p>If you needed to reduce the security risk of token theft,
    which part of this flow would you change, and why?</p>
    <details>
      <summary>See our recommendation</summary>
      <p>Reducing the JWT expiry time (e.g., to 1 hour) limits the
      window of vulnerability if a token is stolen. You could also
      implement refresh tokens for a better UX.</p>
    </details>
  </div>

  <h2>Implementing Refresh Tokens</h2>
  <!-- Content continues... -->
</article>`,
        explanation:
          'The reflection prompt forces readers to evaluate the information semantically — they must understand the flow well enough to identify a vulnerability and reason about solutions. This produces far stronger retention than passive reading.',
        principle:
          'Self-generated explanations require the deepest semantic processing',
      },
    ],

    bad: [
      {
        title: 'Passive Feature Tour',
        description:
          'Onboarding that walks users through features without requiring any engagement',
        code: `<!-- DON'T DO THIS -->
<div class="tour-overlay">
  <div class="tour-step">
    <div class="arrow" style="left: 200px; top: 50px;"></div>
    <div class="tooltip">
      <h4>Step 3 of 12</h4>
      <p>This is the Dashboard. Here you can see all your metrics
      and charts. Click Next to continue.</p>
      <button class="next-btn">Next</button>
      <button class="skip-btn">Skip Tour</button>
    </div>
  </div>
</div>`,
        explanation:
          'Clicking "Next" through 12 tooltip steps is purely structural processing — users process the button location, not the content meaning. Studies show less than 10% of tour content is retained after 24 hours.',
        principle:
          'Passive tours produce the shallowest processing level; users click through without encoding',
      },
      {
        title: 'Read-and-Acknowledge Pattern',
        description:
          'Forcing users to scroll through content and check a box without comprehension',
        code: `<!-- DON'T DO THIS -->
<div class="terms-container">
  <div class="scroll-area" style="height: 300px; overflow-y: scroll;">
    <h3>Terms of Service</h3>
    <p>Lorem ipsum dolor sit amet... (3,000 words)</p>
  </div>
  <label>
    <input type="checkbox" required>
    I have read and understood all terms above
  </label>
  <button class="submit-btn" disabled>Continue</button>
</div>`,
        explanation:
          'Scrolling and clicking a checkbox involves zero semantic processing of the actual content. Users develop a motor habit (scroll to bottom, check box) that bypasses all meaningful engagement.',
        principle:
          'Motor actions (scrolling, clicking) without meaning produce no lasting memory',
      },
      {
        title: 'Information Dump Help Page',
        description:
          'Dense documentation with no interactive elements or comprehension checks',
        code: `<!-- DON'T DO THIS -->
<div class="help-article">
  <h2>Understanding Permissions</h2>
  <p>There are four permission levels: Viewer, Editor, Admin, and Owner.
  Viewers can see content but not modify it. Editors can create and
  modify content but cannot manage users. Admins can manage users and
  content but cannot change billing. Owners have full access including
  billing and account deletion.</p>
  <p>To change a user's permission level, navigate to Settings > Team >
  Members, find the user, click the dropdown next to their name, and
  select the desired permission level. Changes take effect immediately.</p>
  <p>Permission inheritance works as follows...</p>
  <!-- 2,000 more words of unbroken text -->
</div>`,
        explanation:
          'Unbroken blocks of text with no active engagement produce shallow reading. Users scan for keywords rather than processing meaning. Retention of permission details will be near zero.',
        principle:
          'Passive reading of dense text stays at the structural level — users see words without processing meaning',
      },
    ],

    realWorld: [
      {
        company: 'Duolingo',
        product: 'Semantic Exercises',
        description: 'Duolingo requires users to construct sentences, match meanings, and translate contextually rather than simply memorizing vocabulary lists. Sentence construction forces semantic processing — users must understand word meaning and grammar to produce correct answers.',
        effectiveness: 'very-effective',
        analysis: 'By requiring generation (sentence building) rather than recognition (flashcard flipping), Duolingo leverages both the levels of processing effect and the generation effect. Research shows their active approach produces 2-3x better retention than passive study methods.',
      },
      {
        company: 'Codecademy',
        product: 'Interactive Code Challenges',
        description: 'Rather than showing code examples to read, Codecademy requires learners to write code in an embedded editor, run it, and debug errors. Each exercise requires understanding the concept well enough to produce working code.',
        effectiveness: 'very-effective',
        analysis: 'Writing code is one of the deepest forms of processing — it requires understanding syntax (structural), reading error messages (phonetic/semantic), and applying concepts to solve problems (deep semantic). This produces dramatically better skill retention than video tutorials.',
      },
      {
        company: 'Notion',
        product: 'Template Customization',
        description: 'Instead of showing users an empty workspace, Notion provides templates that users must customize for their own use case. Users rename sections, reorganize blocks, and fill in their own content, forcing them to understand the system\'s structure through meaningful modification.',
        effectiveness: 'effective',
        analysis: 'Customizing a template requires semantic processing — users must understand what each element does in order to adapt it to their needs. This is significantly deeper processing than viewing a demo or reading documentation, leading to better feature retention and adoption.',
      },
      {
        company: 'Khan Academy',
        product: 'Practice Problems with Hints',
        description: 'After each video lesson, Khan Academy presents practice problems that require applying the concept. Hints are available but progressively revealed, encouraging users to attempt deep processing before falling back to guidance.',
        effectiveness: 'very-effective',
        analysis: 'Practice problems after instruction leverage the testing effect (a close relative of levels of processing). Users who attempt problems — even incorrectly — retain material better than those who only re-read or re-watch. The hint system supports learning without eliminating the deep processing benefit.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Interactive Task vs Video Tour',
        hypothesis:
          'Users who complete an interactive onboarding task will retain product knowledge better than those who watch a video tour',
        controlVersion: {
          description:
            'Animated video tour showing key features: dashboard, project creation, team invites, and settings (2 minutes)',
          metrics: {
            conversionRate: '68%',
            timeOnPage: '2:15',
            scrollDepth: '100%',
          },
        },
        treatmentVersion: {
          description:
            'Interactive onboarding requiring users to: name a project, add a task, assign it to themselves, and mark it complete (3 minutes)',
          metrics: {
            conversionRate: '74%',
            timeOnPage: '3:42',
            scrollDepth: '100%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the interactive version took longer to complete, 7-day feature adoption was 89% higher. Users who completed interactive onboarding used 3.2 features in their first week vs 1.7 for video-tour users. The deeper processing during onboarding produced lasting product understanding.',
          learnings: [
            'Interactive tasks produce deeper encoding than passive viewing',
            'Slightly longer onboarding is worthwhile when it improves retention',
            'Users who completed real tasks had 42% higher Day-7 retention',
            'The generation effect (creating content) was stronger than the observation effect (watching demos)',
          ],
        },
      },
      {
        title: 'Help Docs: Passive Reading vs Embedded Comprehension Checks',
        hypothesis:
          'Documentation with embedded questions will produce better feature understanding than standard documentation',
        controlVersion: {
          description:
            'Standard help article explaining the permissions system with clear text, headings, and a table of permission levels',
          metrics: {
            conversionRate: '82%',
            timeOnPage: '1:45',
            scrollDepth: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Same content with 3 embedded questions: "Which role would you assign to a contractor?", "What happens if you downgrade an Admin to Viewer?", and "Set up the permissions for this scenario..."',
          metrics: {
            conversionRate: '79%',
            timeOnPage: '4:10',
            scrollDepth: '91%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Although slightly fewer users "completed" the article (79% vs 82%), those who did answered permissions-related support questions correctly 73% of the time vs 31% for the control group. Support tickets about permissions dropped 44% in the treatment group.',
          learnings: [
            'Comprehension checks dramatically improve retention of help content',
            'Users spend more time processing but need less re-reading later',
            'Scenario-based questions ("What would you do if...") produced the deepest processing',
            'Embedding questions reduced support tickets, justifying the slightly lower completion rate',
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
        name: 'Passive Content Presentation',
        description:
          'Long blocks of text, video tours, or slideshows with no interactive elements',
        howToSpot:
          'Look for "Next" buttons, auto-advancing content, or scroll-only text with no user input required',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Shallow Confirmation Patterns',
        description:
          'Checkboxes, "Got it" buttons, or dismissible tooltips used as proxy for comprehension',
        howToSpot:
          'Look for "I understand" checkboxes, single-click dismissals, or "Skip" buttons on educational content',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Interactive Exercises Present',
        description:
          'Drag-and-drop, fill-in-the-blank, categorization, or construction tasks embedded in content',
        howToSpot:
          'Look for input fields within tutorials, draggable elements, or "Try it yourself" sections',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Comprehension Prompts',
        description:
          'Questions that require users to evaluate meaning, apply concepts, or reflect on content',
        howToSpot:
          'Look for embedded questions, "Check your understanding" sections, or scenario-based prompts',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Real Task Integration',
        description:
          'Onboarding or learning flows that have users complete actual product tasks rather than simulated demos',
        howToSpot:
          'Check if onboarding creates real data (projects, documents, settings) vs throwaway tutorial content',
        severity: ImpactLevel.LOW,
      },
    ],

    patterns: [
      {
        name: 'Shallow Tour Pattern',
        description: 'Step-by-step walkthrough requiring only "Next" clicks with no meaningful interaction',
        indicators: ['Sequential tooltip overlay', '"Step X of Y" progress indicator', 'No user input beyond navigation', 'Skip button prominently displayed'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Active Learning Pattern',
        description: 'Educational content requiring users to produce, categorize, or apply information',
        indicators: ['Inline code editors or input fields', 'Drag-and-drop categorization', 'Fill-in-the-blank exercises', 'Scenario-based questions'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Progressive Mastery Pattern',
        description: 'Content that increases processing depth incrementally: read, then apply, then create',
        indicators: ['Concept explanation followed by exercise', 'Hint systems that encourage self-attempt first', 'Difficulty progression across tasks', 'Mastery checks before advancing'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Recognition-Only Pattern',
        description: 'Content that only requires recognition (selecting from options) rather than recall or generation',
        indicators: ['Multiple-choice without application context', 'Yes/No confirmations of understanding', 'Highlighting or selecting without explaining', 'Matching exercises without novel application'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the learning flow require users to generate content or just consume it?',
      'Are comprehension checks testing meaning (semantic) or just recognition (structural)?',
      'Do interactive elements require understanding or just clicking?',
      'Is the onboarding creating real user data or disposable tutorial content?',
      'Are users asked to categorize, compare, or apply — not just read and acknowledge?',
      'Does the help documentation include "try it yourself" sections?',
      'Are tooltips and tours passive (dismiss-only) or active (task-based)?',
      'Is there progressive depth — from viewing to understanding to applying?',
      'Do confirmation patterns verify actual comprehension or just consent?',
      'Are users given reflection prompts that connect new features to their own use cases?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the levels of processing effect and memory encoding.

Analyze the provided design for processing depth patterns. Identify:

1. **Processing Depth**: What level of cognitive processing does the interface demand? (structural, phonetic, or semantic)
2. **Active vs Passive**: Does the user generate, categorize, or apply — or just read, watch, and click?
3. **Encoding Quality**: Will the interaction produce durable memory traces or shallow, quickly-forgotten ones?
4. **Comprehension Checks**: Are there mechanisms to verify and deepen understanding?
5. **Real-Task Integration**: Does learning happen through actual product usage or simulated demos?

For each pattern found:
- Classify the processing level (structural/phonetic/semantic)
- Assess whether the depth is appropriate for the content's importance
- Identify opportunities to deepen processing without adding excessive friction
- Evaluate whether comprehension is tested or assumed
- Suggest specific interactions that would increase processing depth

Consider:
- Is onboarding producing lasting understanding or temporary familiarity?
- Are help materials teaching through application or just exposition?
- Do confirmation patterns verify real comprehension?
- Is there progressive depth for complex concepts?
- Are interactive elements accessible to all users?

Provide actionable recommendations for increasing processing depth where retention matters.`,

    outputSchema: {
      type: 'object',
      properties: {
        processingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              currentDepth: { type: 'string' },
              targetDepth: { type: 'string' },
              retentionImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'element',
              'currentDepth',
              'targetDepth',
              'retentionImpact',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            averageDepth: { type: 'number' },
            activeEngagement: { type: 'number' },
            comprehensionVerification: { type: 'number' },
            retentionForecast: { type: 'number' },
          },
          required: [
            'averageDepth',
            'activeEngagement',
            'comprehensionVerification',
            'retentionForecast',
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
        'processingPatterns',
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
        title: 'Identify What Users Must Retain',
        description:
          'Determine which information is critical for users to remember and which can be looked up later',
        example:
          'Goal: Users must understand the 4 permission levels well enough to assign them correctly without re-reading docs',
        tips: [
          'Focus deep processing on high-stakes, infrequently referenced information',
          'Allow shallow processing for information that can be easily re-accessed',
          'Map the retention requirements for each part of your user journey',
        ],
      },
      {
        step: 2,
        title: 'Design for Active Engagement',
        description:
          'Replace passive content consumption with interactions that require meaningful processing',
        example:
          'Instead of listing permission levels in a table, have users drag team members into the correct permission group for a given scenario',
        tips: [
          'Convert "read and acknowledge" into "apply and demonstrate"',
          'Use generation tasks (fill-in, construct, categorize) over recognition tasks (multiple-choice, true/false)',
          'Make the task feel useful, not like a quiz',
        ],
      },
      {
        step: 3,
        title: 'Connect to Existing Knowledge',
        description:
          'Help users relate new information to concepts they already understand',
        example:
          '"Permissions work like keys to rooms in a building — a Viewer has a window to look in, an Editor has a door key, and an Admin has the master key"',
        tips: [
          'Use analogies relevant to your user base',
          'Reference features users have already learned',
          'Encourage self-reference: "Think about how this applies to your team"',
        ],
      },
      {
        step: 4,
        title: 'Add Comprehension Checkpoints',
        description:
          'Embed questions or scenarios that verify understanding at the semantic level',
        example:
          '"Your contractor needs to view reports but not edit data. Which permission level would you assign?"',
        tips: [
          'Ask scenario-based questions, not definitional recall',
          'Provide feedback that reinforces the correct mental model',
          'Make checkpoints feel helpful, not punitive',
        ],
      },
      {
        step: 5,
        title: 'Measure Retention, Not Completion',
        description:
          'Track whether users retain and apply information, not just whether they finished the flow',
        example:
          'Measure: "% of users who correctly set permissions without help within 7 days" instead of "% who completed onboarding"',
        tips: [
          'Track feature usage accuracy, not just feature discovery',
          'Monitor support ticket topics to identify retention gaps',
          'Use delayed assessment (7-day, 30-day) to measure true retention',
        ],
      },
    ],

    dos: [
      'Require users to generate or produce content during learning, not just consume it',
      'Use categorization, comparison, and application tasks for important concepts',
      'Connect new features to concepts users already understand through analogies',
      'Embed scenario-based comprehension checks in documentation and onboarding',
      'Let users practice with real data and real tasks during onboarding',
      'Progressively increase processing depth: observe, try, apply, create',
      'Provide feedback that deepens understanding, not just confirms correctness',
      'Measure retention and application, not just task completion',
    ],

    donts: [
      'Don\'t rely on passive video tours or animated walkthroughs for critical learning',
      'Don\'t use "I understand" checkboxes as a substitute for comprehension verification',
      'Don\'t present information dumps without active engagement opportunities',
      'Don\'t test only recognition (multiple-choice) when you need recall (application)',
      'Don\'t force deep processing on trivial or easily re-accessible information',
      'Don\'t make comprehension checks feel punitive or gatekeeping',
      'Don\'t assume that exposure equals encoding — seeing is not learning',
      'Don\'t skip accessibility requirements for interactive learning elements',
    ],

    bestPractices: [
      {
        title: 'Use the Generation Effect',
        description:
          'Have users produce information (write, build, construct) rather than passively receive it',
        rationale:
          'Generating information requires the deepest semantic processing and produces the most durable memories',
        example:
          'Instead of showing a sample project, have users create their own project during onboarding',
      },
      {
        title: 'Employ Self-Reference',
        description:
          'Ask users to relate new information to their own context, goals, and experience',
        rationale:
          'The self-reference effect makes information encoded in relation to oneself the most memorable of all',
        example:
          '"How would your team use this feature?" prompts deeper processing than "Here is what this feature does"',
      },
      {
        title: 'Progressive Depth Model',
        description:
          'Structure learning to move from shallow to deep: see it, try it, apply it, teach it',
        rationale:
          'Gradual depth increase prevents cognitive overload while building toward strong retention',
        example:
          'Step 1: Watch a 30-second demo. Step 2: Complete a guided task. Step 3: Create something from scratch. Step 4: Share or explain to a teammate.',
      },
      {
        title: 'Desirable Difficulties',
        description:
          'Introduce productive challenges that require effort but are achievable',
        rationale:
          'Moderate difficulty during encoding increases processing depth and long-term retention (Bjork, 1994)',
        example:
          'Delay hints by 10 seconds so users attempt problems first; provide hints as scaffolding, not shortcuts',
      },
      {
        title: 'Spaced Retrieval Practice',
        description:
          'Revisit key concepts at increasing intervals after initial learning',
        rationale:
          'Retrieval practice at spaced intervals combines deep processing with the spacing effect for maximum retention',
        example:
          'Send a follow-up email 3 days after onboarding: "Quick check — do you remember how to invite a team member?"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard Accessible - All interactive learning elements must be operable via keyboard',
        implementation:
          'Ensure drag-and-drop exercises have keyboard alternatives (e.g., arrow keys to move, Enter to place). Categorization tasks should work with Tab + Enter.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Interactive exercises must convey structure and relationships programmatically',
        implementation:
          'Use ARIA roles (role="listbox", role="option") for categorization tasks. Label drop zones and draggable items semantically.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Provide feedback for interactive exercises without requiring focus change',
        implementation:
          'Use aria-live regions to announce exercise results ("Correct! The cat sits on the rug.") so screen reader users get feedback without losing context.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for interactive exercises',
        implementation:
          'Every exercise must have clear, visible instructions. Do not rely on visual layout alone to communicate what the user should do.',
      },
    ],

    ethics: [
      {
        concern: 'Forced Comprehension Gatekeeping',
        severity: 'medium',
        explanation:
          'Requiring users to pass comprehension checks before accessing features can be exclusionary and frustrating',
        mitigation:
          'Allow users to skip comprehension checks with a "I already know this" option. Use checks as aids, not gates.',
      },
      {
        concern: 'Cognitive Accessibility',
        severity: 'high',
        explanation:
          'Deep processing requirements can disadvantage users with cognitive disabilities, learning differences, or language barriers',
        mitigation:
          'Provide multiple paths to learning (video, text, interactive). Allow unlimited attempts on exercises. Offer simplified versions.',
      },
      {
        concern: 'Dark Pattern Disguise',
        severity: 'high',
        explanation:
          'Using deep processing techniques to make users internalize manipulative messaging (e.g., sunk cost framing during onboarding)',
        mitigation:
          'Only use deep processing to help users understand features accurately. Never use it to embed persuasion or manipulation into learning flows.',
      },
      {
        concern: 'Assessment Anxiety',
        severity: 'medium',
        explanation:
          'Comprehension checks can trigger test anxiety, especially in professional settings where users fear looking incompetent',
        mitigation:
          'Frame exercises as "practice" not "tests". Never share scores with managers. Make failure informative, not punitive.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Levels of Processing: A Framework for Memory Research',
        author: 'Craik, F. I. M., & Lockhart, R. S.',
        year: 1972,
        doi: '10.1016/S0022-5371(72)80001-X',
        description:
          'The foundational paper proposing that memory depends on depth of processing at encoding, not the type of memory store',
        type: 'foundational',
      },
      {
        title: 'Depth of Processing and the Retention of Words in Episodic Memory',
        author: 'Craik, F. I. M., & Tulving, E.',
        year: 1975,
        doi: '10.1037/0096-3445.104.3.268',
        description:
          'Classic experiments demonstrating that semantic processing produces dramatically better recall than structural or phonetic processing',
        type: 'foundational',
      },
      {
        title: 'Making Things Hard on Yourself, But in a Good Way: Creating Desirable Difficulties to Enhance Learning',
        author: 'Bjork, E. L., & Bjork, R. A.',
        year: 2011,
        description:
          'How introducing productive difficulty during encoding increases long-term retention — the "desirable difficulties" framework',
        type: 'advanced',
      },
      {
        title: 'The Testing Effect: The Role of Feedback and Collaboration in a Tertiary Classroom Setting',
        author: 'Karpicke, J. D., & Roediger, H. L.',
        year: 2008,
        doi: '10.1126/science.1152408',
        description:
          'Demonstrates that retrieval practice (testing) produces stronger retention than additional study — directly related to depth of processing during retrieval',
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
          'Practical guide to applying levels of processing, retrieval practice, and spaced repetition to learning design',
        type: 'practical',
      },
      {
        title: 'Why Don\'t Students Like School?',
        author: 'Willingham, Daniel T.',
        year: 2009,
        isbn: '9780470591963',
        description:
          'Cognitive science principles for designing learning experiences, including depth of processing and the role of meaning in memory',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Spacing Effect: How to Improve Learning and Maximize Retention',
        author: 'Ebbinghaus Research Foundation',
        url: 'https://www.learningscientists.org/spacing',
        description:
          'Practical overview of how to combine depth of processing with spaced repetition for maximum retention',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Levels of Processing - Study Smarter, Not Harder',
        author: 'Psych Explained',
        url: 'https://www.youtube.com/watch?v=levels-processing',
        description:
          'Clear explanation of Craik & Lockhart\'s framework with practical study examples',
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
      'spacing-effect',       // Spaced retrieval practice deepens processing over time
      'testing-effect',       // Testing is a form of deep retrieval processing
      'generation-effect',    // Generating information requires the deepest processing
      'self-reference-effect', // Relating info to self produces deepest encoding
    ],

    conflicts: [
      'cognitive-load',       // Deep processing requires cognitive resources; overload prevents it
      'hicks-law',            // Too many choices during learning can prevent deep processing
    ],

    confusedWith: [
      'mere-exposure-effect', // Repeated exposure is shallow; depth matters more than frequency
      'spacing-effect',       // Spacing is about when to process; levels is about how deeply
      'testing-effect',       // Testing drives deep processing but is a distinct mechanism
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'generation-effect',
        'self-reference-effect',
        'testing-effect',
      ],
    },
  },
};
