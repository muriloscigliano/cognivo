/**
 * TESTING EFFECT
 *
 * We remember information better after being tested on it
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const testingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'testing-effect',
    name: 'Testing Effect',
    aliases: ['Retrieval Practice Effect', 'Test-Enhanced Learning'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'learning',
      'memory',
      'retrieval-practice',
      'onboarding',
      'education',
      'retention',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We remember information better after being tested on it',

    detailed: `The testing effect (also called retrieval practice) is the well-established finding that actively retrieving information from memory strengthens long-term retention far more than passively re-studying the same material. When you quiz yourself or are quizzed, the act of retrieval itself rewires the memory trace, making it more durable and accessible in the future.

This effect has profound implications for UX and product design. Interfaces that prompt users to actively recall information — through quizzes, knowledge checks, interactive walkthroughs, or fill-in-the-blank exercises — produce dramatically better learning outcomes than those that rely on passive consumption like reading documentation or watching tutorials.

Designers can harness the testing effect in onboarding flows, educational products, help systems, and any context where users need to internalize new information. The key insight is that a little productive struggle during retrieval leads to much stronger memory than effortless re-reading.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Retrieving information from memory (testing yourself) strengthens that memory more than re-studying does. This happens because:

1. **Retrieval Strengthening**: The act of pulling information from memory strengthens the neural pathways used for retrieval, making future access faster and more reliable
2. **Elaborative Processing**: During retrieval, the brain activates related knowledge and creates richer associations, embedding the memory in a deeper network
3. **Transfer-Appropriate Processing**: Testing mimics the conditions under which you'll actually need the information, aligning encoding with future retrieval demands
4. **Error Correction**: Failed retrieval attempts followed by feedback highlight gaps in knowledge, directing attention to weak areas
5. **Desirable Difficulty**: The cognitive effort required for retrieval — even when it feels harder than re-reading — produces stronger and more lasting memory traces

The effect is robust across ages, materials, and contexts. Even unsuccessful retrieval attempts improve later learning when followed by corrective feedback.`,
    },

    realWorldExample: `In Roediger and Karpicke's landmark 2006 study, students read a prose passage and either re-studied it or took a recall test (no feedback). After 5 minutes, the re-study group performed slightly better. But after one week, the tested group remembered significantly more — about 50% more material than the re-study group. The brief act of retrieval produced far more durable memory than additional study time, demonstrating that testing is not merely an assessment tool but a powerful learning event in itself.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Testing Effect profoundly impacts how users learn and retain information presented in digital interfaces. Designers can leverage this to:

- Embed quizzes and knowledge checks into onboarding flows so users internalize key features
- Replace passive tutorials with interactive exercises that require active recall
- Use spaced retrieval practice to reinforce critical workflows over time
- Add "Did you know?" prompts that ask users to recall before revealing answers
- Design learning apps around retrieval-based activities rather than re-reading`,

    whenToUse: [
      {
        title: 'Onboarding Knowledge Checks',
        scenario:
          'When introducing new users to product features and workflows',
        example:
          'After a tutorial step explaining keyboard shortcuts, prompt: "Which shortcut opens the command palette?" before revealing the answer',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Educational Product Design',
        scenario: 'When building learning apps, courses, or training platforms',
        example:
          'Duolingo-style exercises that require active recall (translating, filling blanks) rather than passive reading of vocabulary lists',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Post-Tutorial Quizzes',
        scenario: 'When users complete a help article, video, or walkthrough',
        example:
          'After a setup guide, show a quick 3-question quiz: "What should you do if your API key expires?" to cement understanding',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Interactive Walkthroughs',
        scenario: 'When guiding users through complex multi-step processes',
        example:
          'Instead of showing all steps at once, have users recall and perform each step with hints available on demand',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Reinforcement',
        scenario: 'When users need to remember features they learned days or weeks ago',
        example:
          'Periodic "Do you remember how to...?" prompts that appear at spaced intervals after initial onboarding',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Time-Critical Workflows',
        reason:
          'Quizzes and recall prompts slow users down when they need to act quickly',
        consequence:
          'Frustrated users who abandon the task or disable the feature entirely',
        alternative:
          'Provide inline reference material (tooltips, cheat sheets) instead of testing during urgent tasks',
      },
      {
        title: 'Expert Users',
        reason:
          'Experienced users find knowledge checks patronizing and interruptive',
        consequence:
          'Decreased satisfaction and perceived respect for the user\'s expertise',
        alternative:
          'Gate quizzes behind a "new user" flag or allow users to skip/test out of known material',
      },
      {
        title: 'Anxiety-Prone Contexts',
        reason:
          'Testing can trigger test anxiety, especially in high-stakes or evaluative contexts',
        consequence:
          'Users freeze, disengage, or develop negative associations with the product',
        alternative:
          'Frame retrieval practice as "practice" not "tests." Remove scoring and time pressure where possible',
      },
      {
        title: 'Trivial or Ephemeral Information',
        reason:
          'Testing users on information they don\'t need to retain wastes their time',
        consequence:
          'Users learn to ignore all knowledge checks, undermining the ones that matter',
        alternative:
          'Reserve testing for genuinely important, retention-worthy information',
      },
    ],

    commonMistakes: [
      {
        title: 'Testing Without Feedback',
        description:
          'Asking quiz questions but not showing the correct answer afterward',
        why: 'Without feedback, incorrect retrieval attempts can reinforce wrong information rather than correct it',
        fix: 'Always provide immediate, clear feedback after each retrieval attempt — showing the right answer and a brief explanation',
      },
      {
        title: 'Overloading with Questions',
        description:
          'Asking too many questions at once, turning onboarding into an exam',
        why: 'Excessive testing feels punitive and exhausting, causing users to disengage entirely',
        fix: 'Keep quizzes short (2-4 questions), space them over time, and make them feel like a natural part of the flow',
      },
      {
        title: 'Testing Immediately After Teaching',
        description:
          'Quizzing users right after showing them the answer, which feels trivially easy',
        why: 'Immediate testing produces a false sense of mastery. The real benefit comes from testing after a delay',
        fix: 'Introduce a short delay or intervening activity between learning and testing to create beneficial difficulty',
      },
      {
        title: 'Using Only Recognition (Multiple Choice)',
        description:
          'Relying solely on multiple-choice questions instead of free recall',
        why: 'Recognition is much easier than recall and produces weaker memory strengthening',
        fix: 'Mix in free-recall prompts ("Type the shortcut..."), fill-in-the-blank, and active production tasks alongside recognition questions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines where and when retrieval prompts appear in the user flow',
        examples: [
          'Quiz sections placed after tutorial content create natural retrieval checkpoints',
          'Progressive disclosure with recall gates ("What did you learn?") before advancing',
          'Sidebar knowledge checks that appear contextually during task completion',
          'End-of-section summaries that ask users to fill in key points from memory',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can signal retrieval moments and differentiate questions from content',
        examples: [
          'Distinct question styling (italic, indented) signals "now you recall"',
          'Blank spaces or underlines in text prompt fill-in-the-blank retrieval',
          'Bold answer reveals after user attempts recall create clear feedback',
          'Smaller hint text available on demand supports productive struggle',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color differentiates learning, testing, and feedback states',
        examples: [
          'Neutral colors for learning content, accent color for quiz prompts',
          'Green for correct recall, amber for partially correct, red for incorrect',
          'Subtle background color shift signals transition from reading to retrieval mode',
          'Muted answer text that reveals on interaction reinforces the retrieval moment',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive retrieval is the core mechanism — the interaction IS the learning',
        examples: [
          'Click-to-reveal answers require active decision before seeing the answer',
          'Drag-and-drop exercises test procedural knowledge through action',
          'Type-to-complete inputs demand active recall rather than passive recognition',
          'Spaced repetition systems schedule retrieval at optimal intervals',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content structure must balance teaching with retrieval opportunities to maximize retention',
        examples: [
          'Tutorials structured as teach-practice-test cycles outperform read-only guides',
          'Questions embedded mid-content are more effective than end-of-chapter quizzes alone',
          'Scaffolded difficulty — easy recall first, harder application later — builds confidence',
          'Interleaving topics in retrieval practice strengthens discrimination between concepts',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Retrieval practice must be accessible across input methods and assistive technologies',
        examples: [
          'Quiz interactions must be fully keyboard-navigable with clear focus states',
          'Screen readers must announce questions, input expectations, and feedback clearly',
          'Timed retrieval exercises must offer extended time or untimed alternatives',
          'Visual fill-in-the-blank must have text-based alternatives for screen reader users',
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
        title: 'Post-Tutorial Knowledge Check',
        description:
          'SaaS onboarding that quizzes users after teaching a key feature',
        code: `<div class="onboarding-quiz">
  <h3>Quick Check: Do You Remember?</h3>
  <p class="context">You just learned about API key management.</p>

  <div class="question">
    <label for="q1">Where do you regenerate an expired API key?</label>
    <input type="text" id="q1" placeholder="Type your answer..."
           aria-describedby="q1-hint">
    <button class="reveal-btn" aria-expanded="false">Show Answer</button>
    <div id="q1-answer" class="answer hidden">
      <p class="correct">Settings > API Keys > Regenerate</p>
      <p class="explanation">You can always find this under your
      account settings. Bookmark it for quick access!</p>
    </div>
  </div>

  <div class="progress">
    <span>1 of 3 questions</span>
    <div class="progress-bar" style="width: 33%"></div>
  </div>
</div>`,
        explanation:
          'By asking users to type where to find the API key setting — rather than just showing them again — the act of retrieval strengthens the memory. Immediate feedback corrects any errors.',
        principle:
          'Active recall after instruction produces stronger retention than re-reading',
        metrics: {
          before: '23% of users remembered API key location after 7 days (read-only tutorial)',
          after: '61% of users remembered API key location after 7 days (with quiz)',
          improvement: '165% increase in feature knowledge retention',
        },
      },
      {
        title: 'Interactive Walkthrough with Recall Steps',
        description:
          'A guided setup wizard that asks users to perform steps from memory',
        code: `<div class="walkthrough">
  <div class="step completed">
    <h4>Step 1: Connect your repository</h4>
    <p class="status">Completed</p>
  </div>

  <div class="step active recall-step">
    <h4>Step 2: Now you try!</h4>
    <p>Without looking at the guide, create your first deployment pipeline.</p>
    <div class="hint-toggle">
      <button class="hint-btn" aria-expanded="false">
        Need a hint?
      </button>
      <div class="hint hidden">
        <p>Go to Pipelines > New Pipeline > Select your repo</p>
      </div>
    </div>
    <div class="actions">
      <button class="secondary">Show me again</button>
      <button class="primary">I did it!</button>
    </div>
  </div>
</div>`,
        explanation:
          'Instead of showing the user each step, the walkthrough demonstrates once and then asks the user to reproduce it from memory. Hints are available but hidden by default, creating beneficial retrieval difficulty.',
        principle:
          'Productive struggle during retrieval strengthens procedural memory',
      },
      {
        title: 'Spaced "Did You Know?" Knowledge Prompts',
        description:
          'Periodic retrieval prompts that appear days after initial learning',
        code: `<div class="spaced-retrieval-prompt" role="dialog" aria-label="Knowledge check">
  <div class="prompt-header">
    <span class="badge">Day 3 Check-in</span>
    <button class="close" aria-label="Dismiss">&times;</button>
  </div>

  <h4>Do you remember?</h4>
  <p class="question">What keyboard shortcut opens the search panel?</p>

  <div class="answer-area">
    <input type="text" placeholder="Type the shortcut..."
           aria-label="Your answer">
    <button class="check-btn">Check</button>
  </div>

  <div class="feedback hidden">
    <p class="result correct">
      Correct! <kbd>Cmd+K</kbd> opens search.
    </p>
    <p class="streak">3-day recall streak! Next check in 7 days.</p>
  </div>
</div>`,
        explanation:
          'Spaced retrieval at increasing intervals (day 1, day 3, day 7, day 14) leverages both the testing effect and spaced repetition. Each successful recall extends the interval, while failures shorten it.',
        principle:
          'Spaced retrieval practice produces the most durable long-term memory',
        metrics: {
          before: '18% of users used keyboard shortcuts after 30 days (tooltip-only)',
          after: '52% of users used keyboard shortcuts after 30 days (spaced retrieval)',
          improvement: '189% increase in shortcut adoption through spaced recall prompts',
        },
      },
    ],

    bad: [
      {
        title: 'Quiz Without Feedback',
        description:
          'Testing users but never showing the correct answer',
        code: `<!-- DON'T DO THIS -->
<div class="quiz">
  <h3>Quick Quiz!</h3>
  <p>Where do you find your billing settings?</p>
  <div class="options">
    <button>Profile</button>
    <button>Settings</button>
    <button>Dashboard</button>
  </div>
  <!-- User clicks wrong answer, nothing happens -->
  <p class="result">Wrong! Try again later.</p>
  <!-- No correct answer shown, no explanation -->
</div>`,
        explanation:
          'Testing without feedback can reinforce incorrect memories. When users guess wrong and never see the right answer, they may remember their wrong guess instead. Always provide corrective feedback immediately after retrieval attempts.',
        principle:
          'Retrieval without feedback can strengthen incorrect memories',
      },
      {
        title: 'Excessive Mandatory Quizzing',
        description:
          'Turning every interaction into a mandatory test',
        code: `<!-- DON'T DO THIS -->
<div class="mandatory-quiz-gate">
  <h2>Before you can continue, answer these 15 questions!</h2>
  <p>You must score 80% or higher to proceed.</p>
  <p class="timer">Time remaining: 4:32</p>

  <div class="question">Question 1 of 15</div>
  <div class="question">Question 2 of 15</div>
  <!-- ...13 more questions... -->

  <p class="warning">You cannot skip this assessment.</p>
  <button disabled>Continue (locked until quiz complete)</button>
</div>`,
        explanation:
          'Mandatory, long, timed quizzes create test anxiety and resentment. Users will game the system (random clicking) or abandon the flow entirely. The testing effect works best when retrieval feels low-stakes, brief, and helpful — not punitive.',
        principle:
          'High-stakes, high-volume testing triggers anxiety and avoidance, not learning',
      },
      {
        title: 'Immediate Testing Right After Showing Answer',
        description:
          'Quizzing users zero seconds after displaying the answer',
        code: `<!-- DON'T DO THIS -->
<div class="teach-then-test">
  <p>The export shortcut is <strong>Cmd+Shift+E</strong>.</p>

  <!-- Immediately, same screen: -->
  <div class="quiz">
    <p>What is the export shortcut?</p>
    <input type="text" value="Cmd+Shift+E">
    <!-- User just copies from above -->
    <p class="result">Correct! Great memory!</p>
  </div>
</div>`,
        explanation:
          'When the answer is visible on the same screen or tested immediately after display, users simply copy rather than retrieve from memory. This creates an illusion of learning without actual memory strengthening. Introduce a delay or intervening content before testing.',
        principle:
          'Immediate testing without delay produces false confidence, not real retention',
      },
    ],

    realWorld: [
      {
        company: 'Duolingo',
        product: 'Language Learning App',
        url: 'https://www.duolingo.com',
        description: 'Duolingo\'s entire learning model is built on retrieval practice. Users translate sentences, fill in blanks, and construct phrases from memory rather than re-reading vocabulary lists. Lessons progressively increase difficulty and revisit old material at spaced intervals.',
        effectiveness: 'very-effective',
        analysis: 'Duolingo is the gold standard for the testing effect in product design. Every exercise is a retrieval event. The app avoids passive review almost entirely, instead requiring users to produce answers. Combined with spaced repetition and gamification, this creates exceptional retention rates. Users who complete exercises retain vocabulary 3-4x longer than those who only review flashcards.',
      },
      {
        company: 'Quizlet',
        product: 'Flashcard Study Platform',
        url: 'https://www.quizlet.com',
        description: 'Quizlet\'s flashcard system is fundamentally a retrieval practice tool. Users see a prompt and must recall the answer before flipping the card. The "Learn" mode adaptively tests items the user gets wrong more frequently.',
        effectiveness: 'very-effective',
        analysis: 'Quizlet\'s adaptive algorithms prioritize testing over re-study. Items answered correctly are shown less often; missed items appear more. This creates an efficient retrieval loop that targets weak memories. The platform proves the testing effect at massive scale — over 60 million monthly users benefit from active recall over passive review.',
      },
      {
        company: 'Codecademy',
        product: 'Interactive Code Challenges',
        url: 'https://www.codecademy.com',
        description: 'Codecademy teaches programming by requiring users to write code (active retrieval) rather than just reading examples. After a brief explanation, users must produce working code in an embedded editor to proceed.',
        effectiveness: 'effective',
        analysis: 'The act of writing code from memory — rather than copy-pasting examples — leverages the testing effect for procedural knowledge. Codecademy\'s hints system provides scaffolded support, allowing productive struggle before revealing answers. Studies show interactive coding exercises produce 40-60% better skill retention than video-only courses.',
      },
      {
        company: 'Khan Academy',
        product: 'Practice Problems & Mastery System',
        url: 'https://www.khanacademy.org',
        description: 'Khan Academy pairs instructional videos with practice problem sets. The mastery system requires students to correctly answer multiple problems in a row before a concept is marked "mastered," ensuring genuine retrieval rather than lucky guessing.',
        effectiveness: 'very-effective',
        analysis: 'Khan Academy\'s mastery model explicitly applies the testing effect: learning is not complete until you can retrieve and apply the knowledge. The consecutive-correct-answers requirement ensures robust retrieval, not one-off recognition. Their data shows that students who complete practice problems retain concepts 2-3x longer than those who only watch videos.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Read-Only Tutorial vs Quiz-Enhanced Tutorial',
        hypothesis:
          'Adding retrieval quizzes to onboarding tutorials will improve feature adoption and retention',
        controlVersion: {
          description:
            'Standard onboarding: 5 screens explaining key features with text and screenshots. Users click "Next" to advance through each screen.',
          metrics: {
            conversionRate: '67% completion rate',
            featureRetention: '23% could perform key actions after 7 days',
            timeOnPage: '2:10 average',
          },
        },
        treatmentVersion: {
          description:
            'Quiz-enhanced onboarding: same 5 feature explanations, but each screen ends with a brief recall question (e.g., "Where would you find X?") with immediate feedback before advancing.',
          metrics: {
            conversionRate: '71% completion rate',
            featureRetention: '58% could perform key actions after 7 days',
            timeOnPage: '3:45 average',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Despite taking 75% longer, the quiz-enhanced onboarding produced 152% better feature retention after 7 days. Completion rate was slightly higher, suggesting the quizzes increased engagement rather than causing drop-off. Support tickets from quiz-group users were 34% lower in the first month.',
          learnings: [
            'Brief recall questions do not significantly reduce onboarding completion',
            'Retrieval practice during onboarding dramatically improves long-term feature adoption',
            'Users who answered incorrectly but received feedback performed nearly as well as those who answered correctly',
            'The increased time spent was productive — more time on task led to less time on support',
          ],
        },
      },
      {
        title: 'Help Center: Passive Article vs Interactive Knowledge Check',
        hypothesis:
          'Adding a post-article quiz will improve users\' ability to solve problems independently',
        controlVersion: {
          description:
            'Standard help article: 800-word guide explaining how to configure integrations, with screenshots and step-by-step instructions.',
          metrics: {
            conversionRate: '45% self-service resolution rate',
            clickThroughRate: '12% clicked related articles',
            returnRate: '38% returned to same article within 7 days',
          },
        },
        treatmentVersion: {
          description:
            'Same help article with a 3-question knowledge check at the bottom: "Can you recall the steps? Test yourself before you go." Questions used fill-in-the-blank and free recall with expandable answers.',
          metrics: {
            conversionRate: '62% self-service resolution rate',
            clickThroughRate: '21% clicked related articles',
            returnRate: '19% returned to same article within 7 days',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The post-article quiz increased self-service resolution by 38% and halved the return rate, indicating users retained the information better. Users who completed the quiz were also more likely to explore related content, suggesting the retrieval practice activated related knowledge.',
          learnings: [
            'A simple 3-question quiz at the end of help articles significantly reduces repeat visits',
            'Free recall questions outperformed multiple-choice for retention outcomes',
            'Users who attempted the quiz — even those who got answers wrong — resolved issues at higher rates than non-quiz users',
            'Quiz completion was 73%, indicating most users are willing to engage with brief, optional knowledge checks',
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
        name: 'Quiz or Knowledge Check Sections',
        description: 'Embedded question blocks, fill-in-the-blank fields, or recall prompts within learning content',
        howToSpot: 'Look for question marks, input fields, or "Test yourself" sections within tutorials or documentation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Click-to-Reveal Answer Patterns',
        description: 'Content that is hidden by default and requires user action to reveal, encouraging recall before viewing',
        howToSpot: 'Look for "Show Answer," "Reveal," or accordion/toggle elements within learning flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Progress and Mastery Indicators',
        description: 'Progress bars, streak counters, or mastery badges tied to retrieval performance',
        howToSpot: 'Look for completion percentages, mastery levels, or streak counts associated with quiz performance',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Spaced Review Prompts',
        description: 'Notifications or inline prompts that ask users to recall previously learned information at intervals',
        howToSpot: 'Look for "Do you remember?" prompts, scheduled review notifications, or returning quiz questions from earlier sessions',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Interactive Practice Areas',
        description: 'Embedded code editors, drag-and-drop exercises, or hands-on practice sections requiring active production',
        howToSpot: 'Look for inline editors, sandbox environments, or "Try it yourself" sections within learning content',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Teach-Then-Test Pattern',
        description: 'Content is presented first, followed by a retrieval exercise before the user can proceed',
        indicators: ['Quiz section after tutorial content', 'Knowledge gate before advancing', 'Recall prompt at end of onboarding step', 'Post-video practice questions'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Spaced Retrieval Pattern',
        description: 'Previously learned material is re-tested at increasing intervals over time',
        indicators: ['Returning questions from earlier sessions', 'Expanding review intervals (1 day, 3 days, 7 days)', 'Adaptive difficulty based on recall performance', 'Scheduled review notifications'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Active Production Pattern',
        description: 'Users must produce answers (type, write, build) rather than select from options',
        indicators: ['Free-text input fields for answers', 'Code editors requiring written solutions', 'Fill-in-the-blank exercises', 'Open-ended prompts before multiple choice'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Scaffolded Hint Pattern',
        description: 'Hints are available but hidden by default, encouraging retrieval attempt before seeking help',
        indicators: ['Collapsed hint sections', '"Need a hint?" toggles', 'Progressive hint reveal (hint 1, hint 2, full answer)', 'Optional "Show me" buttons'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the design include retrieval prompts (quizzes, questions) after teaching new information?',
      'Are users asked to recall information before it is revealed or repeated?',
      'Is there a delay between learning and testing, or is testing immediate (which reduces effectiveness)?',
      'Do quiz interactions provide immediate corrective feedback?',
      'Are retrieval exercises spaced over time, or only at the point of learning?',
      'Do retrieval prompts use free recall (typing, producing) or only recognition (multiple choice)?',
      'Are hints available but hidden by default to encourage attempted recall first?',
      'Is the testing optional or mandatory? Is the tone low-stakes and encouraging?',
      'Are quiz interactions accessible via keyboard and screen readers?',
      'Does the design balance testing with teaching — not too much, not too little?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the testing effect (retrieval practice).

Analyze the provided design for testing effect patterns. Identify:

1. **Retrieval Opportunities**: Where users are asked to recall information from memory
2. **Feedback Quality**: Whether retrieval attempts are followed by corrective feedback
3. **Spacing and Timing**: Whether retrieval is spaced over time or only immediate
4. **Retrieval Depth**: Whether exercises use free recall (production) or recognition (selection)
5. **Scaffolding**: Whether hints and support are available but encourage attempt-first behavior

For each pattern found:
- Identify the type of retrieval practice and where it occurs
- Assess whether timing and spacing are optimized for retention
- Determine if feedback is immediate and corrective
- Evaluate whether the difficulty level creates productive struggle (not too easy, not too hard)
- Suggest improvements for maximizing memory strengthening

Consider:
- Is the design relying on passive re-reading instead of active retrieval?
- Are quizzes placed immediately after content (less effective) or after a delay (more effective)?
- Does the design provide feedback, or does it test without correcting?
- Are retrieval exercises low-stakes and encouraging, or high-stakes and anxiety-inducing?
- Are the retrieval interactions accessible to all users?

Provide actionable recommendations for implementing retrieval practice effectively.`,

    outputSchema: {
      type: 'object',
      properties: {
        retrievalPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              retrievalDepth: { type: 'string' },
              feedbackQuality: { type: 'string' },
              spacingStrategy: { type: 'string' },
              effectivenessAssessment: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'retrievalDepth',
              'feedbackQuality',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            retrievalOpportunityScore: { type: 'number' },
            feedbackQualityScore: { type: 'number' },
            spacingEffectivenessScore: { type: 'number' },
            accessibilityScore: { type: 'number' },
          },
          required: [
            'retrievalOpportunityScore',
            'feedbackQualityScore',
            'spacingEffectivenessScore',
            'accessibilityScore',
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
        'retrievalPatterns',
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
        title: 'Identify Retention-Critical Information',
        description:
          'Determine which information users genuinely need to remember to use your product effectively',
        example:
          'Goal: Users should remember how to create a deployment pipeline without consulting docs after onboarding',
        tips: [
          'Focus on actions users will repeat — not one-time setup steps',
          'Prioritize information that reduces support tickets when retained',
          'Distinguish "need to remember" from "need to look up" — only test the former',
        ],
      },
      {
        step: 2,
        title: 'Design Retrieval Prompts',
        description:
          'Create questions and exercises that require users to actively recall the target information',
        example:
          'After showing the deployment flow, ask: "What are the three steps to create a pipeline?" with a text input',
        tips: [
          'Prefer free recall (typing, producing) over recognition (multiple choice) for stronger effects',
          'Frame as helpful practice, not evaluative testing — "Let\'s make sure this sticks"',
          'Keep prompts brief: 1-3 questions per learning unit',
        ],
      },
      {
        step: 3,
        title: 'Provide Immediate Corrective Feedback',
        description:
          'Show the correct answer and a brief explanation immediately after each retrieval attempt',
        example:
          'After user types their answer, reveal: "The three steps are: Select repo > Configure build > Set triggers. Here\'s why..."',
        tips: [
          'Show correct answer regardless of whether user was right or wrong',
          'For wrong answers, explain why the correct answer is correct (not just what it is)',
          'Use a supportive tone — "Almost! The correct answer is..." not "Wrong!"',
        ],
      },
      {
        step: 4,
        title: 'Introduce Spacing and Delay',
        description:
          'Schedule retrieval practice at increasing intervals after initial learning',
        example:
          'Quiz on Day 1 (after tutorial), Day 3, Day 7, Day 14. Extend intervals for correct answers, shorten for incorrect.',
        tips: [
          'Even a few minutes of delay between teaching and testing is better than zero delay',
          'Use the expanding retrieval schedule: 1 day, 3 days, 7 days, 14 days, 30 days',
          'Make spaced prompts optional — a gentle nudge, not a mandatory gate',
        ],
      },
      {
        step: 5,
        title: 'Measure Retention, Not Just Completion',
        description:
          'Track whether users can actually perform actions days or weeks later, not just quiz scores',
        example:
          'Measure: "% of users who perform key action unassisted 7 days after onboarding"',
        tips: [
          'Quiz scores at time of learning are a poor proxy for real retention',
          'Track support ticket rates, feature discovery rates, and unassisted task completion',
          'Compare retention metrics between quiz-enhanced and passive-only cohorts',
        ],
      },
    ],

    dos: [
      'Embed brief retrieval prompts into onboarding and learning flows',
      'Provide immediate, corrective feedback after every retrieval attempt',
      'Use free recall (typing, producing) alongside recognition (multiple choice)',
      'Space retrieval practice over increasing intervals for maximum retention',
      'Frame testing as helpful practice, not high-stakes evaluation',
      'Make quizzes short (2-4 questions) and contextually relevant',
      'Offer scaffolded hints that encourage attempt before reveal',
      'Track retention outcomes (7-day, 30-day recall) not just completion',
    ],

    donts: [
      'Don\'t test without providing corrective feedback afterward',
      'Don\'t quiz users immediately while the answer is still visible on screen',
      'Don\'t create mandatory, high-stakes, timed assessments for onboarding',
      'Don\'t overload users with too many questions at once',
      'Don\'t test on trivial information that users don\'t need to retain',
      'Don\'t assume multiple-choice alone is sufficient — mix in free recall',
      'Don\'t make retrieval feel punitive with harsh language or failure states',
      'Don\'t skip spacing — a single quiz at the point of learning has limited long-term benefit',
    ],

    bestPractices: [
      {
        title: 'Teach-Pause-Test',
        description:
          'Introduce information, allow a brief delay or intervening activity, then prompt retrieval',
        rationale:
          'Immediate testing is too easy and creates false confidence; a delay introduces beneficial difficulty',
        example:
          'Show feature tutorial on Step 1, explain a different feature on Step 2, then quiz on Step 1 content at Step 3',
      },
      {
        title: 'Scaffold with Progressive Hints',
        description:
          'Hide hints behind progressive reveals: attempt first, then Hint 1, then Hint 2, then full answer',
        rationale:
          'Maximum retrieval effort (within reason) produces maximum memory benefit. Hints available on demand prevent frustration.',
        example:
          '"What shortcut opens search?" > [Need a hint?] > "It starts with Cmd..." > [Still stuck?] > "Cmd+K"',
      },
      {
        title: 'Mix Retrieval Formats',
        description:
          'Combine free recall, cued recall, fill-in-the-blank, and recognition across different exercises',
        rationale:
          'Different retrieval formats activate different memory processes, creating more robust and flexible memories',
        example:
          'Q1: "Type the shortcut for..." (free recall), Q2: "Which menu contains...?" (recognition), Q3: "Complete the steps: 1. ___ 2. ___ 3. ___" (cued recall)',
      },
      {
        title: 'Adaptive Spacing Based on Performance',
        description:
          'Increase review intervals after correct recall, decrease after incorrect recall',
        rationale:
          'Well-known items need less frequent review; struggling items need more. This optimizes study time.',
        example:
          'Correct answer: next review in 7 days. Incorrect answer: next review in 1 day. Correct again: next review in 14 days.',
      },
      {
        title: 'Low-Stakes, Encouraging Tone',
        description:
          'Frame retrieval as practice and growth, never as pass/fail evaluation',
        rationale:
          'Test anxiety undermines the testing effect. A supportive tone keeps users engaged and willing to attempt recall.',
        example:
          '"Let\'s see what stuck!" instead of "QUIZ: You must score 80% to proceed"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard Accessible - All quiz interactions must be operable via keyboard',
        implementation:
          'Ensure quiz inputs, reveal buttons, hint toggles, and navigation are fully keyboard-accessible with visible focus indicators',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Quiz structure must be conveyed semantically',
        implementation:
          'Use proper form labels, fieldsets for grouped questions, ARIA live regions for feedback, and clear heading hierarchy for quiz sections',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Feedback after retrieval attempts must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" or role="status" for quiz feedback so screen readers announce correct/incorrect results without requiring focus change',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - If retrieval exercises are timed, users must be able to extend or disable the timer',
        implementation:
          'Provide an option to extend time limits or remove them entirely. Timed retrieval should always have an untimed alternative.',
      },
    ],

    ethics: [
      {
        concern: 'Test Anxiety and Psychological Safety',
        severity: 'high',
        explanation:
          'Poorly designed quizzes can trigger test anxiety, especially for users with learning disabilities or trauma around academic testing',
        mitigation:
          'Frame all retrieval as low-stakes practice. Never gate critical features behind quiz performance. Allow skipping. Use encouraging, non-judgmental language.',
      },
      {
        concern: 'Coerced Learning',
        severity: 'medium',
        explanation:
          'Mandatory quizzes that block access to features users have already paid for can feel coercive',
        mitigation:
          'Make retrieval exercises optional wherever possible. If mandatory (e.g., compliance training), keep them brief and provide unlimited attempts.',
      },
      {
        concern: 'Data Privacy of Performance',
        severity: 'high',
        explanation:
          'Quiz results reveal cognitive performance data that could be used for unwanted profiling or shared with employers',
        mitigation:
          'Clearly disclose what quiz data is stored and who can access it. Never share individual quiz performance with third parties without explicit consent.',
      },
      {
        concern: 'Exclusion Through Assessment Design',
        severity: 'critical',
        explanation:
          'Quiz formats that require typing speed, visual pattern matching, or timed responses can exclude users with motor, visual, or cognitive disabilities',
        mitigation:
          'Offer multiple response formats (typed, selected, spoken). Remove or extend time limits. Ensure all quiz interactions are fully accessible.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Power of Testing Memory: Basic Research and Implications for Educational Practice',
        author: 'Roediger, H. L., & Karpicke, J. D.',
        year: 2006,
        doi: '10.1111/j.1745-6916.2006.00012.x',
        description:
          'The landmark paper demonstrating that testing produces superior long-term retention compared to repeated study',
        type: 'foundational',
      },
      {
        title: 'Retrieval Practice Produces More Learning than Elaborative Studying with Concept Mapping',
        author: 'Karpicke, J. D., & Blunt, J. R.',
        year: 2011,
        doi: '10.1126/science.1199327',
        description:
          'Published in Science, this study showed retrieval practice outperformed even elaborative concept mapping for meaningful learning',
        type: 'foundational',
      },
      {
        title: 'Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention',
        author: 'Roediger, H. L., & Karpicke, J. D.',
        year: 2006,
        doi: '10.1111/j.1467-9280.2006.01693.x',
        description:
          'Demonstrated that a single test produces better retention than three additional study sessions',
        type: 'foundational',
      },
      {
        title: 'Metacognitive Strategies in Student Learning: Do Students Practice Retrieval When They Study on Their Own?',
        author: 'Karpicke, J. D., Butler, A. C., & Roediger, H. L.',
        year: 2009,
        doi: '10.1080/09658210802647009',
        description:
          'Reveals that most learners default to re-reading over self-testing, despite testing being more effective',
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
          'Accessible guide to retrieval practice, spaced repetition, and other evidence-based learning strategies',
        type: 'foundational',
      },
      {
        title: 'Powerful Teaching: Unleash the Science of Learning',
        author: 'Agarwal, P. K., & Bain, P. M.',
        year: 2019,
        isbn: '9781119521846',
        description:
          'Practical implementation guide for retrieval practice in educational and training contexts',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Retrieval Practice: The Most Powerful Learning Strategy You\'re Not Using',
        author: 'Retrieval Practice (retrievalpractice.org)',
        url: 'https://www.retrievalpractice.org/strategies',
        description:
          'Comprehensive resource hub for retrieval practice strategies and implementation guides',
        type: 'practical',
      },
      {
        title: 'How Tests Make Us Smarter',
        author: 'Roediger, H. L.',
        url: 'https://www.nytimes.com/2014/07/20/opinion/sunday/how-tests-make-us-smarter.html',
        description:
          'New York Times op-ed by the leading researcher explaining the testing effect for a general audience',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Testing Effect: How Retrieval Practice Boosts Learning',
        author: 'The Learning Scientists',
        url: 'https://www.youtube.com/watch?v=FJGbx30ybtE',
        description:
          'Clear animated explanation of the testing effect with practical examples for educators and designers',
        type: 'foundational',
      },
    ],

    demos: [
      {
        title: 'Retrieval Practice Challenge Generator',
        author: 'Retrieval Practice (retrievalpractice.org)',
        url: 'https://www.retrievalpractice.org/challengegenerator',
        description:
          'Interactive tool that generates retrieval practice activities, demonstrating the testing effect in action',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'spacing-effect',       // Spaced retrieval combines testing effect with spacing for maximum retention
      'generation-effect',    // Generating answers (retrieval) is more effective than reading them
      'desirable-difficulty',  // Testing introduces beneficial difficulty that strengthens learning
      'elaborative-interrogation', // Asking "why?" during retrieval deepens understanding
    ],

    conflicts: [
      'fluency-heuristic',   // Easy re-reading feels effective but is inferior to effortful testing
    ],

    confusedWith: [
      'spacing-effect',      // Related but distinct: spacing is about when to practice, testing is about how
      'generation-effect',   // Overlaps but generation focuses on producing material, not retrieving it
      'mere-exposure-effect', // Passive exposure increases familiarity but not recall
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'retrieval-practice',
        'active-recall',
      ],
    },
  },
};
