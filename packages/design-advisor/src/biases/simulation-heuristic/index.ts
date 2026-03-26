/**
 * SIMULATION HEURISTIC
 *
 * We judge likelihood by how easily we can mentally simulate or imagine an event occurring.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const simulationHeuristic: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'simulation-heuristic',
    name: 'Simulation Heuristic',
    aliases: ['Mental Simulation', 'Imaginability Heuristic', 'Counterfactual Thinking'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'imagination',
      'mental-simulation',
      'scenario-visualization',
      'storytelling',
      'product-demos',
      'decision-making',
      'counterfactual',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We judge how likely something is by how easily we can mentally simulate or imagine it happening.',

    detailed: `The Simulation Heuristic describes our tendency to judge the probability of an event based on how easily we can construct a mental scenario of it occurring. When we can vividly picture ourselves using a product, achieving a goal, or experiencing an outcome, we perceive that outcome as more likely and more desirable.

This bias goes beyond simple recall (availability heuristic) — it involves actively constructing mental models of hypothetical scenarios. The easier it is to "run the simulation" in our minds, the more plausible the outcome feels. If someone can picture themselves living in a house after a virtual tour, they perceive ownership as more attainable.

In UX and product design, the simulation heuristic is a cornerstone of storytelling, product demonstrations, scenario-based onboarding, and aspirational marketing. Designers who help users mentally simulate using a product or achieving an outcome dramatically increase perceived value, purchase intent, and engagement.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman and Amos Tversky',
      year: 1982,
      theory: 'Judgment Under Uncertainty',
      mechanism: `The brain constructs mental models — miniature simulations — to evaluate the plausibility of events. This happens because:

1. **Scenario Construction**: The mind builds step-by-step narratives of how an event could unfold; the fewer "leaps" required, the more probable it feels
2. **Ease of Imagination**: Events that are easy to mentally simulate are judged as more likely than events that require complex or unfamiliar chains of causation
3. **Emotional Rehearsal**: When we imagine an outcome, we experience anticipatory emotions (excitement, relief, pride) that increase desire and perceived attainability
4. **Counterfactual Reasoning**: We evaluate "what could have been" by mentally undoing events; outcomes that are easy to undo feel more contingent and emotionally charged
5. **Self-Projection**: Placing ourselves into a scenario ("imagine yourself...") activates motor and sensory cortex, making the experience feel partially real`,
    },

    realWorldExample: `Kahneman and Tversky (1982) described a scenario where Mr. Crane and Mr. Tees both miss their flights — Crane by 30 minutes, Tees by just 5 minutes. Participants overwhelmingly judged that Tees would feel worse, even though both missed their flights equally. The reason: it is easy to mentally simulate a world where Tees catches his flight (one small change), making the "near miss" feel more painful. The ease of constructing the counterfactual drives the emotional response.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Simulation Heuristic affects how users perceive value, feasibility, and desirability of products and outcomes. Designers can leverage this to:

- Help users mentally rehearse using a product through interactive demos and previews
- Increase purchase intent by enabling scenario visualization (configurators, virtual try-ons)
- Guide onboarding with scenario-based walkthroughs that let users imagine their success
- Craft marketing copy that triggers vivid mental simulation ("Imagine yourself...")
- Present use cases as narratives that users can project themselves into`,

    whenToUse: [
      {
        title: 'Product Demonstrations',
        scenario:
          'When showcasing a product or service that users have not yet experienced',
        example:
          'Interactive product demos where users can manipulate the interface with sample data, simulating real ownership',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Scenario-Based Onboarding',
        scenario: 'When introducing new users to a complex product',
        example:
          'Walk users through a realistic scenario: "Imagine you have a team meeting in 10 minutes. Here is how you would prepare your notes..."',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Virtual Try-On and Configurators',
        scenario: 'When selling physical or customizable products online',
        example:
          'Car configurator that lets users build their dream car and see it from every angle, triggering ownership simulation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Aspirational Marketing Copy',
        scenario: 'When writing landing pages, emails, or ad copy',
        example:
          '"Imagine waking up to a dashboard that already has your insights ready" — triggers users to mentally simulate the experience',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Use Case Presentations',
        scenario: 'When explaining how a product solves specific problems',
        example:
          'Present use cases as mini-stories with a protagonist the user can identify with, showing the before and after',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Travel and Real Estate Previews',
        scenario: 'When users need to commit to experiences they cannot fully evaluate in advance',
        example:
          'Virtual tours of hotel rooms, 360-degree destination previews, or neighborhood walk-throughs that let users "experience" the location remotely',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Unrealistic Outcome Promises',
        reason:
          'Helping users simulate outcomes that are unlikely or atypical creates false expectations',
        consequence:
          'Post-purchase regret, negative reviews, refund requests, and eroded trust',
        alternative:
          'Ensure simulated scenarios represent typical outcomes, not best-case outliers',
      },
      {
        title: 'High-Stakes Financial Decisions',
        reason:
          'Vivid mental simulation of investment returns can override rational risk assessment',
        consequence:
          'Users may overcommit financially based on imagined gains rather than statistical probability',
        alternative:
          'Pair scenario visualization with clear risk disclosures, probability data, and worst-case scenarios',
      },
      {
        title: 'Medical Treatment Decisions',
        reason:
          'Simulating positive recovery outcomes can cause patients to underestimate real risks',
        consequence:
          'Uninformed consent, disappointment, or harm from underestimated side effects',
        alternative:
          'Present balanced information with both positive and negative outcome simulations',
      },
      {
        title: 'Manipulative Urgency',
        reason:
          'Using simulation to make users imagine missing out ("Picture yourself regretting not buying...") is coercive',
        consequence:
          'Anxiety-driven purchases, buyer remorse, loss of brand trust',
        alternative:
          'Focus on positive simulation of product use rather than negative simulation of missing out',
      },
    ],

    commonMistakes: [
      {
        title: 'Simulation Without Interaction',
        description:
          'Telling users to imagine something rather than letting them experience it interactively',
        why: 'Passive description is far weaker than active participation in building the mental model',
        fix: 'Provide interactive demos, configurators, or sandbox environments that let users drive the simulation',
      },
      {
        title: 'Too Many Steps in the Scenario',
        description:
          'Presenting complex, multi-step scenarios that are hard to mentally simulate',
        why: 'The simulation heuristic works best when the mental scenario is simple and vivid; complexity reduces ease of imagination',
        fix: 'Break complex scenarios into small, vivid steps. Each step should feel immediately imaginable.',
      },
      {
        title: 'Generic Rather Than Personal',
        description:
          'Using third-person scenarios ("A user could...") instead of second-person ("You would...")',
        why: 'Self-projection is key to simulation; third-person narratives create distance',
        fix: 'Use second-person language and personalized data to help users place themselves in the scenario',
      },
      {
        title: 'Neglecting Sensory Detail',
        description:
          'Presenting outcomes abstractly without concrete sensory or experiential details',
        why: 'Mental simulation is more powerful when it engages multiple senses and feels embodied',
        fix: 'Include visual previews, sounds, haptic feedback, or descriptive language that engages the senses',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether users can easily construct mental models from the information hierarchy',
        examples: [
          'Before/after layouts help users simulate transformation',
          'Step-by-step visual flows make processes easy to mentally walk through',
          'Hero sections with scenario imagery trigger immediate simulation',
          'Side-by-side comparisons enable quick mental modeling of alternatives',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text framing and language directly affect simulation vividness',
        examples: [
          'Second-person copy ("You will see...") triggers self-projection',
          'Present-tense descriptions make outcomes feel immediate',
          'Concrete nouns and active verbs produce stronger mental images',
          'Short, vivid sentences are easier to mentally simulate than long abstractions',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color establishes emotional tone that influences the quality of mental simulation',
        examples: [
          'Warm, inviting palettes make product scenarios feel approachable',
          'High-contrast before/after states make transformation vivid',
          'Environment-matched colors (ocean blue for travel) reinforce scenario context',
          'Desaturated "before" vs vibrant "after" amplifies simulated improvement',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements are the most powerful trigger for mental simulation — doing is believing',
        examples: [
          'Product configurators let users build and visualize their choices',
          'Interactive demos simulate real product usage without commitment',
          'Drag-and-drop interfaces trigger motor-based mental simulation',
          'Real-time previews show users the result of their actions instantly',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Narrative content is the primary vehicle for triggering mental simulation in users',
        examples: [
          '"Imagine yourself..." prompts directly invoke simulation',
          'Customer journey stories let users project themselves into success narratives',
          'Scenario-based feature descriptions show "a day in the life" with the product',
          'Video walkthroughs provide vivid raw material for mental models',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Simulation triggers must work across all modalities so every user can construct mental models',
        examples: [
          'Audio descriptions of visual demos enable simulation for screen reader users',
          'Alt text should describe scenarios, not just objects ("person using product to...")',
          'Keyboard-accessible interactive demos ensure all users can participate',
          'Transcripts of video walkthroughs preserve narrative simulation for deaf users',
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
        title: 'Interactive Product Demo with Sample Data',
        description:
          'SaaS tool letting prospects use the product with realistic sample data before signing up',
        code: `<section class="interactive-demo">
  <h2>Try It Yourself — No Sign-Up Required</h2>
  <p class="subtitle">We loaded a sample project so you can see exactly
  how your workflow would look.</p>

  <div class="demo-workspace">
    <div class="demo-sidebar">
      <h4>Your Projects</h4>
      <ul>
        <li class="active">Q4 Marketing Campaign</li>
        <li>Product Launch Plan</li>
        <li>Team Retrospective</li>
      </ul>
    </div>
    <div class="demo-main">
      <h3>Q4 Marketing Campaign</h3>
      <div class="task-board">
        <div class="column" data-status="todo">
          <h5>To Do</h5>
          <div class="task draggable">Draft email sequence</div>
          <div class="task draggable">Design landing page</div>
        </div>
        <div class="column" data-status="in-progress">
          <h5>In Progress</h5>
          <div class="task draggable">Social media calendar</div>
        </div>
        <div class="column" data-status="done">
          <h5>Done</h5>
          <div class="task draggable">Competitive analysis</div>
        </div>
      </div>
      <p class="demo-hint">Drag tasks between columns to see how
      it feels to manage your workflow.</p>
    </div>
  </div>

  <div class="demo-cta">
    <button class="primary">Start Your Own Project</button>
    <p class="reassurance">Free for 14 days. No credit card needed.</p>
  </div>
</section>`,
        explanation:
          'By letting users interact with a realistic workspace, they mentally simulate owning the product. Dragging tasks, seeing project names, and exploring the interface creates a vivid mental model of daily use.',
        principle:
          'Active interaction triggers stronger mental simulation than passive observation',
        metrics: {
          before: '8% free trial conversion from static screenshots',
          after: '22% free trial conversion from interactive demo',
          improvement: '175% increase in trial sign-ups through simulation',
        },
      },
      {
        title: 'Scenario-Based Onboarding',
        description:
          'Onboarding flow that walks users through a realistic "day one" scenario',
        code: `<div class="onboarding-scenario">
  <div class="scenario-header">
    <span class="step">Step 2 of 4</span>
    <h2>Imagine: It's Monday Morning</h2>
    <p>You have three meetings today and a report due by 5 PM.
    Here's how TaskFlow keeps you on track.</p>
  </div>

  <div class="scenario-timeline">
    <div class="event completed">
      <span class="time">8:00 AM</span>
      <div class="content">
        <h4>Your daily brief is ready</h4>
        <p>TaskFlow reviewed your calendar and surfaced
        the 3 tasks most critical for today.</p>
        <div class="preview">
          <span class="tag urgent">Due today: Q4 Report</span>
          <span class="tag meeting">Meeting prep: Design Review</span>
          <span class="tag followup">Follow up: Client feedback</span>
        </div>
      </div>
    </div>
    <div class="event current">
      <span class="time">9:30 AM</span>
      <div class="content">
        <h4>Meeting notes captured automatically</h4>
        <p>As your design review wraps up, TaskFlow creates
        action items from the discussion.</p>
      </div>
    </div>
  </div>

  <button class="primary">Set Up My Daily Brief</button>
</div>`,
        explanation:
          'Walking users through a specific day makes the product value tangible. Users mentally simulate their own Monday morning and picture TaskFlow fitting into their routine.',
        principle:
          'Temporal scenarios ("Imagine it is Monday...") anchor simulation to real life',
      },
      {
        title: '"Imagine Yourself" Marketing Copy',
        description:
          'Landing page copy that directly triggers mental simulation',
        code: `<section class="hero">
  <h1>Imagine Opening Your Laptop to a Dashboard
  That Already Knows What You Need</h1>

  <p class="subhead">No digging through emails.
  No checking three different tools.
  Just your priorities, organized and ready.</p>

  <div class="simulation-visual">
    <div class="before">
      <h4>Your morning now</h4>
      <ul class="pain-list">
        <li>27 unread emails</li>
        <li>3 Slack threads to catch up on</li>
        <li>Which tasks were urgent again?</li>
      </ul>
    </div>
    <div class="arrow">→</div>
    <div class="after">
      <h4>Your morning with Clarity</h4>
      <ul class="gain-list">
        <li>Top 3 priorities surfaced</li>
        <li>Meeting prep auto-generated</li>
        <li>Focus time blocked on your calendar</li>
      </ul>
    </div>
  </div>

  <button class="primary">Start Your Free Trial</button>
</section>`,
        explanation:
          'The "Imagine..." headline directly invokes mental simulation. The before/after comparison helps users construct a vivid contrast between their current frustration and the simulated better outcome.',
        principle:
          'Direct simulation prompts combined with contrast maximize imaginative engagement',
        metrics: {
          before: '3.1% conversion with feature-focused headline',
          after: '5.4% conversion with "Imagine..." simulation headline',
          improvement: '74% increase in conversion through simulation prompting',
        },
      },
    ],

    bad: [
      {
        title: 'Passive Feature List Without Simulation',
        description:
          'Landing page listing features without helping users imagine using them',
        code: `<!-- DON'T DO THIS -->
<section class="features">
  <h2>Features</h2>
  <ul>
    <li>Task management</li>
    <li>Calendar integration</li>
    <li>Team collaboration</li>
    <li>Reporting and analytics</li>
    <li>API access</li>
    <li>Custom workflows</li>
    <li>Role-based permissions</li>
    <li>Audit logging</li>
  </ul>
</section>`,
        explanation:
          'A flat feature list gives users nothing to mentally simulate. There is no scenario, no self-projection, no vivid outcome. Users cannot imagine what using this product feels like.',
        principle:
          'Feature lists describe capabilities; scenarios simulate experiences',
      },
      {
        title: 'Unrealistic Outcome Simulation',
        description:
          'Fitness app showing extreme transformation with simulation prompts',
        code: `<!-- DON'T DO THIS -->
<section class="transformation">
  <h2>Imagine Yourself in 30 Days</h2>
  <div class="before-after">
    <img src="overweight-sad.jpg" alt="Before">
    <img src="fitness-model.jpg" alt="After just 30 days!">
  </div>
  <p>"I lost 40 pounds in one month!" — Brad, 25</p>
  <button class="urgent">Start Your Transformation NOW</button>
</section>`,
        explanation:
          'Triggering simulation of unrealistic outcomes is manipulative. Users vividly imagine an impossible transformation, leading to disappointment, distrust, and potential harm from extreme dieting.',
        principle:
          'Mental simulation must be grounded in achievable, typical outcomes',
      },
      {
        title: 'Negative Simulation for Pressure',
        description:
          'Insurance company using fear-based mental simulation',
        code: `<!-- DON'T DO THIS -->
<div class="fear-scenario">
  <h2>Imagine Coming Home to Find Your House Flooded</h2>
  <p>Your furniture destroyed. Your family photos ruined forever.
  Your children crying. And no insurance to cover any of it.</p>
  <p class="urgent">This happens to 1 in 50 homeowners EVERY YEAR.</p>
  <button class="danger">Don't Let This Happen to You</button>
</div>`,
        explanation:
          'Using vivid negative simulation to create fear and anxiety is coercive. While the simulation heuristic is powerful, weaponizing it through catastrophic imagery manipulates rather than informs.',
        principle:
          'Never use mental simulation to terrorize users into purchasing',
      },
    ],

    realWorld: [
      {
        company: 'Zillow',
        product: '3D Home Tours',
        description: 'Zillow and real estate platforms offer interactive 3D virtual tours that let prospective buyers walk through homes room by room. Users mentally simulate living in the space — placing their furniture, imagining their morning routine — which dramatically increases emotional attachment and inquiry rates.',
        effectiveness: 'very-effective',
        analysis: 'Virtual tours convert the abstract idea of "buying a house" into a vivid mental simulation of living there. Listings with 3D tours receive 69% more views and significantly higher contact rates.',
      },
      {
        company: 'Warby Parker',
        product: 'Virtual Try-On',
        description: 'Warby Parker uses AR-powered virtual try-on to let users see how glasses look on their own face in real time. Users simulate wearing the glasses, checking different angles, and imagining themselves in daily life with the frames.',
        effectiveness: 'very-effective',
        analysis: 'AR try-on transforms an uncertain online purchase into a simulated in-store experience. Users who engage with virtual try-on are significantly more likely to purchase and less likely to return.',
      },
      {
        company: 'Tesla',
        product: 'Car Configurator',
        description: 'Tesla\'s online configurator lets users build their ideal car — choosing color, wheels, interior, and features — then view it in photorealistic 3D. Users mentally simulate driving their custom car, creating strong ownership feelings before purchase.',
        effectiveness: 'very-effective',
        analysis: 'The configurator triggers the endowment effect through simulation: users feel they already "own" the car they built. The step-by-step customization process makes each choice feel personal and real.',
      },
      {
        company: 'Airbnb',
        product: 'Experience Previews',
        description: 'Airbnb uses rich photography, host video tours, neighborhood guides, and "what you will do" itineraries to help travelers mentally simulate their trip. Users imagine themselves in the space, walking the streets, and participating in experiences.',
        effectiveness: 'effective',
        analysis: 'Multi-modal content (photos, video, narrative descriptions) provides rich raw material for mental simulation. The more vividly users can imagine the trip, the more confident and excited they feel about booking.',
      },
    ],

    abTests: [
      {
        title: 'Product Page: Static Screenshots vs Interactive Demo',
        hypothesis:
          'Interactive demos that enable mental simulation will outperform static screenshots',
        controlVersion: {
          description:
            'Product page with 5 static screenshots and feature descriptions in bullet points',
          metrics: {
            conversionRate: '4.1%',
            timeOnPage: '1:42',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Product page with an embedded interactive demo using sample data that users can click through and explore',
          metrics: {
            conversionRate: '9.3%',
            timeOnPage: '4:28',
            scrollDepth: '84%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Interactive demos more than doubled conversion rate. Users spent 163% more time on the page and scrolled 62% deeper. Post-trial surveys revealed that demo users could describe specific workflows they would use, while screenshot users recalled only general capabilities.',
          learnings: [
            'Active simulation (doing) is far more persuasive than passive observation (seeing)',
            'Users who interacted with the demo had 3x higher trial-to-paid conversion',
            'Demo engagement correlated strongly with purchase intent',
            'Even partial demo exploration (2+ interactions) significantly boosted conversion',
          ],
        },
      },
      {
        title: 'Landing Page: Feature Copy vs Scenario Copy',
        hypothesis:
          'Scenario-based copy that triggers mental simulation will convert better than feature-focused copy',
        controlVersion: {
          description:
            'Headline: "Powerful project management with AI-driven insights" followed by feature list',
          metrics: {
            conversionRate: '3.2%',
            clickThroughRate: '11%',
          },
        },
        treatmentVersion: {
          description:
            'Headline: "Imagine starting your week knowing exactly what to focus on" followed by a day-in-the-life scenario narrative',
          metrics: {
            conversionRate: '5.7%',
            clickThroughRate: '19%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Simulation-triggering copy increased conversions by 78% and click-through by 73%. Users reported feeling "like they already knew the product" even before signing up.',
          learnings: [
            'Second-person scenario copy outperforms third-person feature descriptions',
            '"Imagine..." headlines are among the highest-converting formats',
            'Temporal framing ("your Monday morning") makes simulation concrete',
            'Effect was strongest for users unfamiliar with the product category',
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
        name: 'Interactive Previews',
        description:
          'Product demos, configurators, virtual try-ons, or sandbox environments that let users simulate usage',
        howToSpot:
          'Look for embedded interactive elements, "Try it" buttons, or AR/VR features',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Scenario Narratives',
        description:
          'Story-driven content that walks users through hypothetical scenarios of product use',
        howToSpot:
          'Look for "Imagine...", "Picture yourself...", "Here is how your day would look..." language',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Before/After Comparisons',
        description:
          'Visual or textual contrasts between current state and simulated future state',
        howToSpot:
          'Look for split layouts, transformation imagery, or "without vs with" framing',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Visual Configurators',
        description:
          'Tools that let users customize and preview products in real time',
        howToSpot:
          'Look for color pickers, option selectors with live preview, or 3D model viewers',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Virtual Tours and 360 Views',
        description:
          'Immersive visual content that enables spatial mental simulation',
        howToSpot:
          'Look for 360-degree photos, walkthrough videos, or virtual reality embeds',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Self-Projection Pattern',
        description: 'Design elements that help users place themselves into a scenario',
        indicators: [
          'Second-person language ("you", "your")',
          'Personalized previews with user data or name',
          'AR try-on or avatar-based visualization',
          '"Imagine yourself..." prompts',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Progressive Scenario Pattern',
        description: 'Step-by-step narratives that unfold a usage scenario over time',
        indicators: [
          'Timeline-based onboarding flows',
          '"Day in the life" content structures',
          'Sequential before-during-after presentations',
          'Guided walkthrough with realistic context',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Interactive Simulation Pattern',
        description: 'Hands-on tools that let users experience a product or outcome before committing',
        indicators: [
          'Product demos with sample data',
          'Configurators with real-time preview',
          'Sandbox or playground environments',
          'Free trial with guided onboarding scenario',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Aspirational Visualization Pattern',
        description: 'Imagery and copy designed to help users envision a desirable future state',
        indicators: [
          'Lifestyle photography showing product in aspirational context',
          'Customer transformation stories with vivid detail',
          'Outcome-focused headlines over feature-focused ones',
          'Video testimonials showing the "after" state',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users interact with the product before purchasing or signing up?',
      'Does the copy use "imagine" or scenario-based language?',
      'Is there a before/after comparison that helps users visualize the transformation?',
      'Are product previews vivid enough to trigger mental simulation?',
      'Can users see themselves in the scenario (second-person, personalization)?',
      'Are the simulated outcomes realistic and achievable?',
      'Do interactive elements provide enough feedback to sustain the mental model?',
      'Is the scenario simple enough to mentally simulate in a few steps?',
      'Are multiple senses engaged (visual, textual, interactive)?',
      'Is the simulation helping users make informed decisions or pressuring them?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the simulation heuristic.

Analyze the provided design for simulation heuristic patterns. Identify:

1. **Mental Simulation Triggers**: Elements that help users imagine using the product or experiencing an outcome
2. **Scenario Construction**: How the design builds step-by-step narratives users can mentally walk through
3. **Self-Projection Cues**: Language, imagery, or interactions that help users place themselves in scenarios
4. **Interactive Simulation**: Demos, configurators, or previews that let users "experience before committing"
5. **Outcome Visualization**: How the design helps users picture the end result or transformation

For each pattern found:
- Identify what scenario the user is being prompted to simulate
- Assess whether the simulated outcome is realistic and achievable
- Determine if the simulation is helping informed decisions or creating false expectations
- Evaluate the vividness and ease of the mental simulation
- Suggest improvements for more effective and ethical simulation

Consider:
- Is the design making it easy for users to imagine themselves using the product?
- Are simulated outcomes representative of typical results?
- Does interactive simulation accurately reflect the real product experience?
- Is negative simulation (fear of missing out) being used manipulatively?
- Are all users (including assistive technology users) able to engage with simulation elements?

Provide actionable recommendations for ethical, effective use of mental simulation.`,

    outputSchema: {
      type: 'object',
      properties: {
        simulationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              scenarioSimulated: { type: 'string' },
              vividness: { type: 'string' },
              realism: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'scenarioSimulated',
              'vividness',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            simulationEffectiveness: { type: 'number' },
            interactivityScore: { type: 'number' },
            realismScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'simulationEffectiveness',
            'interactivityScore',
            'realismScore',
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
        'simulationPatterns',
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
        title: 'Identify the Scenario to Simulate',
        description:
          'Determine the key experience or outcome users need to mentally rehearse before committing',
        example:
          'Goal: Help users simulate their first week using the project management tool',
        tips: [
          'Focus on the outcome users care about, not just features',
          'Choose scenarios that match your users\' real-world context',
          'Prioritize the "aha moment" scenario that demonstrates core value',
        ],
      },
      {
        step: 2,
        title: 'Make the Simulation Interactive',
        description:
          'Build tools, demos, or experiences that let users actively participate rather than passively observe',
        example:
          'Create an interactive demo with sample data that users can manipulate',
        tips: [
          'Active participation creates stronger mental models than passive viewing',
          'Use realistic sample data that mirrors users\' actual use cases',
          'Let users make choices and see consequences in real time',
        ],
      },
      {
        step: 3,
        title: 'Use Self-Projection Language',
        description:
          'Craft copy that directly triggers self-projection into the scenario',
        example:
          '"Imagine opening your dashboard Monday morning to find your priorities already organized"',
        tips: [
          'Use second-person ("you", "your") consistently',
          'Anchor to specific times and contexts ("Monday morning", "your next meeting")',
          'Use present tense to make the scenario feel immediate',
        ],
      },
      {
        step: 4,
        title: 'Add Sensory and Emotional Detail',
        description:
          'Include vivid details that engage multiple senses and emotions to enrich the simulation',
        example:
          'Show not just the dashboard, but the feeling of relief, the time saved, the praise from your team',
        tips: [
          'Include visual previews, animations, or video alongside text',
          'Describe emotional outcomes (relief, confidence, pride) not just functional ones',
          'Use concrete numbers and specifics rather than vague claims',
        ],
      },
      {
        step: 5,
        title: 'Ground Simulations in Reality',
        description:
          'Ensure that all simulated outcomes are achievable and representative of typical results',
        example:
          'Show average user results alongside aspirational examples, with clear labeling',
        tips: [
          'Label extreme examples as atypical',
          'Include "typical results" data alongside success stories',
          'Let users simulate with their own data when possible',
        ],
      },
    ],

    dos: [
      'Provide interactive demos and previews that let users simulate real usage',
      'Use second-person language to trigger self-projection into scenarios',
      'Create before/after comparisons that help users visualize transformation',
      'Make scenarios vivid with concrete details, specific times, and sensory cues',
      'Ground all simulated outcomes in realistic, achievable results',
      'Use progressive disclosure to build simulation step by step',
      'Test whether users can easily imagine the scenario you are presenting',
      'Include multiple modalities (visual, textual, interactive) for richer simulation',
    ],

    donts: [
      'Don\'t show only extreme best-case outcomes as typical simulations',
      'Don\'t use fear-based simulation to pressure purchasing decisions',
      'Don\'t create simulations that misrepresent the actual product experience',
      'Don\'t rely on passive text alone — simulation needs visual or interactive support',
      'Don\'t make scenarios so complex that they are hard to mentally walk through',
      'Don\'t use third-person language when second-person would trigger stronger simulation',
      'Don\'t neglect accessibility — ensure simulation elements work for all users',
      'Don\'t trigger simulation of outcomes the product cannot actually deliver',
    ],

    bestPractices: [
      {
        title: 'Interactive Before Passive',
        description:
          'Prioritize interactive demos, configurators, and sandboxes over static imagery or text descriptions',
        rationale:
          'Active participation creates 2-3x stronger mental models than passive observation',
        example:
          'Replace product screenshots with an embedded interactive demo using sample data',
      },
      {
        title: 'Scenario Over Feature',
        description:
          'Present capabilities as scenarios users can simulate, not features they must evaluate',
        rationale:
          'Users buy outcomes, not features. Scenarios bridge the gap between capability and value.',
        example:
          'Instead of "AI-powered analytics", show "Imagine your weekly report writing itself"',
      },
      {
        title: 'Personalize the Simulation',
        description:
          'Use the user\'s own data, name, or context to make simulation personally relevant',
        rationale:
          'Personalized simulations feel more real and trigger stronger self-projection',
        example:
          'In onboarding, use the user\'s actual project name and team size in example scenarios',
      },
      {
        title: 'Progressive Simulation Depth',
        description:
          'Start with simple, broad simulation and let users go deeper as interest grows',
        rationale:
          'Overwhelming detail too early breaks the ease of imagination; progressive depth maintains it',
        example:
          'Hero: "Imagine..." headline -> Mid-page: interactive demo -> Bottom: detailed walkthrough video',
      },
      {
        title: 'Validate with Real Outcomes',
        description:
          'Always pair simulated scenarios with real customer outcomes and data',
        rationale:
          'Grounding simulation in evidence maintains credibility and manages expectations',
        example:
          'After an interactive demo, show: "Teams like yours save an average of 12 hours per week"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for all simulation elements',
        implementation:
          'Add descriptive alt text for configurator previews, demo screenshots, and before/after images. Describe the scenario being simulated, not just the visual content.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Make all interactive simulation elements keyboard accessible',
        implementation:
          'Ensure configurators, demos, and interactive walkthroughs can be fully operated via keyboard. Provide clear focus indicators on interactive elements.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.2.5',
        guideline:
          'Audio Description - Provide audio descriptions for video-based simulations',
        implementation:
          'Add audio descriptions to walkthrough videos and demo recordings so screen reader users can construct equivalent mental models.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Ensure simulation controls have proper ARIA labels',
        implementation:
          'Label configurator controls, demo interaction points, and preview elements with clear ARIA attributes that communicate their purpose.',
      },
    ],

    ethics: [
      {
        concern: 'Unrealistic Outcome Simulation',
        severity: 'critical',
        explanation:
          'Helping users vividly imagine outcomes that are atypical or unachievable creates false expectations',
        mitigation:
          'Always ground simulations in typical results. Label aspirational examples clearly. Show range of outcomes, not just best case.',
      },
      {
        concern: 'Fear-Based Simulation',
        severity: 'critical',
        explanation:
          'Using vivid negative scenarios to frighten users into purchasing is psychologically manipulative',
        mitigation:
          'Focus simulation on positive outcomes of action rather than catastrophic consequences of inaction. Provide factual risk data alongside any negative scenarios.',
      },
      {
        concern: 'Demo-to-Reality Gap',
        severity: 'high',
        explanation:
          'Interactive demos that are significantly better or simpler than the actual product create false expectations',
        mitigation:
          'Ensure demos accurately represent the real product experience. Use actual product interfaces, not idealized mockups.',
      },
      {
        concern: 'Pressure Through Imagination',
        severity: 'medium',
        explanation:
          'Once users have mentally simulated ownership, the endowment effect makes it psychologically costly to walk away',
        mitigation:
          'Provide easy exit points. Allow users to save configured products without pressure. Avoid countdown timers on configured items.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Simulation Heuristic',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1982,
        description:
          'The foundational paper introducing the simulation heuristic as a distinct judgment mechanism, published in "Judgment Under Uncertainty: Heuristics and Biases"',
        type: 'foundational',
      },
      {
        title: 'Counterfactual Thinking and the First Instinct Fallacy',
        author: 'Kruger, J., Wirtz, D., & Miller, D. T.',
        year: 2005,
        doi: '10.1037/0022-3514.88.5.725',
        description:
          'Research on how ease of mental simulation affects counterfactual reasoning and regret',
        type: 'advanced',
      },
      {
        title: 'Mental Simulation and Product Evaluation',
        author: 'Escalas, J. E.',
        year: 2004,
        doi: '10.1086/421161',
        description:
          'How narrative-based mental simulation affects product attitudes and purchase intent',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of the simulation heuristic and counterfactual thinking by its co-discoverer',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores how mental simulation of future experiences is systematically biased and what that means for decision-making',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Power of Mental Simulation in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/',
        description:
          'Practical guide to using mental simulation principles in user experience design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Mental Simulation Drives Decisions',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/results?search_query=simulation+heuristic+kahneman',
        description:
          'Video explanations of the simulation heuristic with real-world examples',
        type: 'foundational',
      },
    ],

    demos: [
      {
        title: 'Tesla Configurator',
        author: 'Tesla, Inc.',
        url: 'https://www.tesla.com/model3/design',
        description:
          'World-class example of product simulation through interactive configuration',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'endowment-effect', // Simulating ownership triggers endowment
      'loss-aversion', // Imagining losing simulated gains amplifies urgency
      'availability-heuristic', // Vivid simulations make outcomes feel more available
      'social-proof', // Seeing others in scenarios validates the simulation
      'framing-effect', // How scenarios are framed affects simulation quality
    ],

    conflicts: [
      'analysis-paralysis', // Too many simulation options can overwhelm
      'ambiguity-aversion', // Unclear simulations increase rather than reduce uncertainty
    ],

    confusedWith: [
      'availability-heuristic', // Availability is about recall ease; simulation is about imagination ease
      'representativeness-heuristic', // Representativeness judges by similarity; simulation judges by constructability
      'optimism-bias', // Optimism inflates expectations; simulation constructs scenarios
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'counterfactual-thinking',
        'mental-rehearsal',
        'scenario-planning',
      ],
    },
  },
};
