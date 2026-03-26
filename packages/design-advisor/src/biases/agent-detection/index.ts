/**
 * AGENT DETECTION (Hyperactive Agency Detection)
 *
 * The tendency to attribute intentional action, agency, or personality
 * to random events, inanimate objects, or automated systems.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const agentDetection: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'agent-detection',
    name: 'Agent Detection',
    aliases: ['Hyperactive Agency Detection', 'Agency Bias', 'Intentionality Bias', 'Anthropomorphism Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'anthropomorphism',
      'AI-personality',
      'chatbot',
      'agency',
      'intentionality',
      'error-attribution',
      'system-personality',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We attribute intentional action or personality to random events and inanimate objects.',

    detailed: `Agent Detection (also called Hyperactive Agency Detection) is a cognitive bias rooted in our evolutionary tendency to over-detect intentional agents in our environment. Humans are predisposed to interpret events, patterns, and behaviors as caused by purposeful beings rather than by chance, mechanical processes, or algorithms.

In digital product design, this bias manifests powerfully when users interact with AI systems, chatbots, automated workflows, and "smart" features. Users naturally attribute personality, emotions, intentions, and even moral qualities to software systems. They say "the app is being stubborn," "Siri doesn't like me," or "the algorithm is out to get me."

Understanding agent detection is critical for designing AI-powered interfaces, conversational UIs, error states, and system feedback. When leveraged thoughtfully, it builds trust and engagement. When ignored or exploited, it creates false expectations, misplaced blame, and anthropomorphic confusion.`,

    psychologyBasis: {
      discoveredBy: 'Justin Barrett, Stewart Guthrie',
      year: 1993,
      theory: 'Hyperactive Agency Detection Device (HADD)',
      mechanism: `The brain defaults to interpreting ambiguous stimuli as caused by intentional agents rather than mechanical or random processes. This happens because:

1. **Evolutionary Advantage**: Ancestors who over-detected predators (false positives) survived more often than those who under-detected them (false negatives)
2. **Theory of Mind Projection**: Humans automatically project mental states (beliefs, desires, intentions) onto entities that exhibit even minimal autonomous behavior
3. **Pattern Completion**: The brain fills in gaps by attributing agency when causes are unclear or complex
4. **Narrative Construction**: We naturally construct stories with actors and intentions rather than accepting randomness
5. **Behavioral Cues**: Movement, responsiveness, and apparent goal-directed behavior trigger agent detection even in clearly non-living systems`,
    },

    realWorldExample: `People routinely attribute personality and intention to voice assistants like Siri and Alexa. Users say "Alexa is being difficult today" or "Siri is ignoring me," treating algorithmic failures as intentional acts. Studies show users form social bonds with chatbots, feel guilty about being rude to virtual assistants, and attribute emotional states to robot vacuums that appear to "explore" their homes with curiosity.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Agent detection profoundly affects how users perceive and interact with AI systems, automated features, and conversational interfaces. Designers can leverage this to:

- Build trust and rapport through carefully designed system personality
- Create engaging conversational experiences that feel natural
- Set appropriate expectations for AI capabilities and limitations
- Design error states that account for users blaming "the system"
- Shape how users attribute responsibility for outcomes`,

    whenToUse: [
      {
        title: 'Conversational UI Personality',
        scenario:
          'When designing chatbots, voice assistants, or conversational interfaces',
        example:
          'Give your chatbot a consistent name, tone, and interaction style that sets realistic expectations about its capabilities',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'AI Feature Communication',
        scenario: 'When introducing or explaining AI-powered features to users',
        example:
          'Frame AI recommendations as "suggestions based on patterns" rather than "the AI thinks you should..." to avoid over-attribution of intelligence',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error State Design',
        scenario: 'When system errors or failures occur in automated workflows',
        example:
          'Design error messages that explain the mechanical cause rather than letting users attribute malicious intent to the system',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding for Smart Features',
        scenario: 'When introducing users to automated or "intelligent" behaviors',
        example:
          'Explain how the recommendation engine works mechanically, reducing false expectations of true understanding',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'System Feedback and Status',
        scenario: 'When communicating system state, progress, or processing',
        example:
          'Use thinking animations and status messages that suggest effort without implying consciousness',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Critical Decision Support',
        reason:
          'Users may over-trust AI recommendations if the system seems to have "intention" or "understanding"',
        consequence:
          'Blind trust in automated decisions, reduced critical thinking about AI outputs',
        alternative:
          'Present AI outputs as data-driven suggestions with confidence levels and explanations of methodology',
      },
      {
        title: 'Vulnerable User Contexts',
        reason:
          'Users in emotional distress may form unhealthy attachments to anthropomorphized systems',
        consequence:
          'Dependency on chatbot "relationships," misplaced emotional investment, delayed help-seeking',
        alternative:
          'Clearly identify the system as automated and provide pathways to human support',
      },
      {
        title: 'Deceptive Anthropomorphism',
        reason:
          'Making automated systems appear more intelligent or empathetic than they actually are',
        consequence:
          'User disappointment when limitations are revealed, erosion of trust in AI generally',
        alternative:
          'Be transparent about system capabilities and limitations while maintaining a friendly tone',
      },
      {
        title: 'Blame Deflection',
        reason:
          'Designing systems so users blame "the AI" for decisions actually made by the company',
        consequence:
          'Reduced accountability, user frustration directed at wrong target, ethical concerns',
        alternative:
          'Be transparent about who or what makes decisions and where responsibility lies',
      },
    ],

    commonMistakes: [
      {
        title: 'Uncanny Valley Personality',
        description:
          'Creating a chatbot personality that is too human-like, triggering discomfort when limitations appear',
        why: 'Users form high expectations from human-like cues, then feel deceived when the system fails to understand',
        fix: 'Design personality that is friendly and consistent but clearly non-human; set capability expectations early',
      },
      {
        title: 'Inconsistent System Personality',
        description:
          'AI assistant that alternates between warm conversational tone and robotic error messages',
        why: 'Inconsistency breaks the mental model users have formed about the "agent" they are interacting with',
        fix: 'Maintain consistent tone, vocabulary, and personality across all system states including errors',
      },
      {
        title: 'Ignoring Attribution in Errors',
        description:
          'Generic error messages that let users fill in intentional explanations for failures',
        why: 'Without clear mechanical explanations, users default to "the system chose not to help me"',
        fix: 'Explain what went wrong mechanically: "Could not connect to server" not just "Something went wrong"',
      },
      {
        title: 'Over-Promising Intelligence',
        description:
          'Marketing AI features as "understanding," "thinking," or "knowing" the user',
        why: 'Sets expectations of genuine comprehension that pattern-matching systems cannot deliver',
        fix: 'Use accurate language: "analyzes patterns," "finds similarities," "suggests based on your history"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout choices affect how much agency users perceive in the system',
        examples: [
          'Chat-style layouts trigger conversational expectations and agent perception',
          'Avatar placement and prominence increases perceived agency',
          'Dedicated AI sections suggest an autonomous entity within the product',
          'Side-panel assistants imply a persistent "helper" agent',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text style influences how "personal" or "mechanical" responses feel',
        examples: [
          'Handwriting-style fonts increase perceived personality',
          'Monospace fonts reduce perceived agency (feel more "computer-like")',
          'Conversational text style ("I found this for you") strengthens agent perception',
          'Technical language reduces anthropomorphism',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color choices signal warmth/personality vs mechanical/neutral processing',
        examples: [
          'Warm colors (friendly blues, soft greens) increase perceived personality',
          'Cool, neutral grays suggest mechanical processing',
          'Gradient or animated colors suggest "aliveness"',
          'Brand-colored AI elements distinguish the "agent" from the interface',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive behaviors are the strongest triggers of perceived agency',
        examples: [
          'Typing indicators ("AI is typing...") strongly imply a thinking agent',
          'Delayed responses feel more "thoughtful" than instant ones',
          'Proactive suggestions feel like the system "noticed" something',
          'Adaptive behavior (learning preferences) feels like the system "knows" the user',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Language and framing are the primary levers for controlling perceived agency',
        examples: [
          'First-person language ("I think...", "I found...") maximizes agent perception',
          'Passive voice ("Results were found") minimizes agent perception',
          'Emotional language ("I\'m happy to help!") triggers social bonding',
          'Hedging language ("Based on patterns, this might...") calibrates expectations',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must account for agent perception across modalities',
        examples: [
          'Screen reader users rely entirely on text cues for agent perception',
          'Voice interfaces trigger stronger agent detection than visual ones',
          'ARIA labels like "AI assistant" vs "search tool" shape mental models',
          'Alternative text for avatar images affects perceived personality',
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
        title: 'Transparent AI Assistant with Clear Boundaries',
        description:
          'A chatbot that establishes personality while being honest about its nature',
        code: `<div class="ai-chat-container">
  <div class="ai-identity">
    <div class="avatar" role="img" aria-label="AI assistant">
      <svg class="bot-icon"><!-- abstract shape, not human face --></svg>
    </div>
    <div class="intro">
      <h3>Atlas Assistant</h3>
      <p class="subtitle">AI-powered help, not a human</p>
    </div>
  </div>

  <div class="message ai">
    <p>Hi! I'm Atlas, an automated assistant. I can help with
    account questions, find information, and suggest solutions
    based on patterns in our knowledge base.</p>
    <p class="capability-note">For complex issues, I'll connect
    you with a human specialist.</p>
  </div>

  <div class="message ai">
    <p>Based on your recent activity, you might find our
    new export feature useful. <span class="attribution">
    (Suggested because you've exported data 12 times this month)</span></p>
  </div>
</div>`,
        explanation:
          'Atlas has a name and personality but uses a non-human avatar, clearly states it is automated, and explains the mechanical basis for its suggestions. This leverages agent detection for engagement while maintaining honesty.',
        principle:
          'Friendly personality with transparent capabilities builds trust without deception',
        metrics: {
          before: '45% of users asked "Are you a real person?" within first 3 messages',
          after: '8% asked after transparent introduction',
          improvement: '82% reduction in capability confusion, 23% increase in task completion',
        },
      },
      {
        title: 'Mechanical Error Attribution',
        description:
          'Error messages that explain causes rather than letting users blame "the system"',
        code: `<div class="error-state">
  <div class="error-icon">
    <svg><!-- connection/network icon --></svg>
  </div>
  <h3>Could not save your changes</h3>
  <p class="cause">Your internet connection dropped while
  saving. Your edits are stored locally and will sync
  automatically when the connection returns.</p>
  <div class="actions">
    <button class="primary">Retry Now</button>
    <button class="secondary">View Local Copy</button>
  </div>
  <p class="technical-detail">
    Error: Network timeout after 30s (ERR_CONNECTION_RESET)
  </p>
</div>`,
        explanation:
          'Instead of a vague "Something went wrong" that lets users think the system "refused" to save, this explains the mechanical cause, reassures that data is safe, and provides clear next steps.',
        principle:
          'Clear causal explanations prevent misattribution of intent to system failures',
      },
      {
        title: 'Calibrated AI Confidence Display',
        description:
          'AI recommendations that show how they were generated, not just what they recommend',
        code: `<div class="ai-recommendation">
  <div class="recommendation-header">
    <span class="badge">AI Suggestion</span>
    <span class="confidence">87% pattern match</span>
  </div>
  <h4>You might want to archive these 23 emails</h4>
  <div class="reasoning">
    <p>This suggestion is based on:</p>
    <ul>
      <li>You archived similar newsletters 94% of the time</li>
      <li>These senders match your "low priority" pattern</li>
      <li>None contain replies or action items</li>
    </ul>
  </div>
  <div class="actions">
    <button class="primary">Archive All</button>
    <button class="secondary">Review Individually</button>
    <button class="tertiary">Not Helpful</button>
  </div>
</div>`,
        explanation:
          'Shows the mechanical reasoning behind the recommendation rather than presenting it as the AI "knowing" what the user wants. Users understand the system is pattern-matching, not mind-reading.',
        principle:
          'Exposing reasoning mechanisms calibrates expectations and builds appropriate trust',
      },
    ],

    bad: [
      {
        title: 'Deceptive Human Impersonation',
        description:
          'A chatbot designed to pass as a human agent',
        code: `<!-- DON'T DO THIS -->
<div class="chat">
  <div class="agent-info">
    <img src="human-photo.jpg" alt="Sarah from Support">
    <span class="name">Sarah</span>
    <span class="status">Online</span>
  </div>
  <div class="message">
    <p>Hey there! I totally understand how frustrating that
    must be. I've been there myself! Let me look into this
    for you personally. 😊</p>
  </div>
</div>`,
        explanation:
          'Using a human photo, human name, emotional language ("I\'ve been there myself"), and no disclosure that this is automated. Users form a social bond with "Sarah" and feel betrayed when they discover the deception.',
        principle:
          'Never disguise automated systems as humans; it exploits agent detection and destroys trust',
      },
      {
        title: 'Anthropomorphic Blame Absorption',
        description:
          'Using AI personality to deflect blame from company decisions',
        code: `<!-- DON'T DO THIS -->
<div class="notification">
  <div class="ai-avatar">🤖</div>
  <p>Sorry, I decided your free trial can't be extended.
  I looked at your account and I just don't think it's
  the right fit. Maybe try again later!</p>
</div>`,
        explanation:
          'The AI "deciding" and "thinking" about the user\'s account masks that this is a company policy. Users blame the AI instead of holding the company accountable for its business decisions.',
        principle:
          'Never use anthropomorphic framing to obscure who is responsible for decisions affecting users',
      },
      {
        title: 'Over-Promising AI Understanding',
        description:
          'Marketing copy that implies genuine comprehension',
        code: `<!-- DON'T DO THIS -->
<section class="ai-feature">
  <h2>Our AI Truly Understands You</h2>
  <p>Our intelligent assistant knows what you need before
  you even ask. It feels your frustration, anticipates your
  desires, and deeply understands your unique situation.</p>
  <p>Talk to it like a friend. It gets you.</p>
</section>`,
        explanation:
          'Language like "truly understands," "feels your frustration," and "gets you" sets expectations of genuine empathy and comprehension that no current AI system can deliver. Users will be disappointed and lose trust.',
        principle:
          'Inflated anthropomorphic claims set unachievable expectations that inevitably disappoint',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Siri Voice Assistant',
        description: 'Siri has a distinct personality, humor, and voice. Users attribute emotions and preferences to Siri ("Siri is sassy today"). Apple designs Siri to deflect personal questions while maintaining personality, balancing engagement with honesty about its nature.',
        effectiveness: 'effective',
        analysis: 'Apple leverages agent detection for engagement but occasionally crosses into uncanny territory when Siri\'s conversational ability suggests more understanding than it has. The personality creates loyalty but also frustration when expectations exceed capability.',
      },
      {
        company: 'Amazon',
        product: 'Alexa Voice Assistant',
        description: 'Alexa has a warm, helpful personality that users anthropomorphize heavily. Many users say "please" and "thank you" to Alexa. Amazon has leaned into this with emotional responses and personality-driven interactions.',
        effectiveness: 'effective',
        analysis: 'Amazon successfully uses agent detection to create household integration and habitual use. However, studies show users sometimes over-trust Alexa for important decisions, and children may develop social interaction patterns based on commanding an always-compliant "agent."',
      },
      {
        company: 'iRobot',
        product: 'Roomba Robot Vacuum',
        description: 'Roomba owners frequently name their vacuums, attribute personality ("she\'s adventurous"), and feel guilt when the robot gets stuck. iRobot found 80% of owners name their Roombas. The autonomous movement pattern triggers strong agent detection.',
        effectiveness: 'effective',
        analysis: 'Roomba demonstrates agent detection without any intentional personality design. Autonomous movement alone triggers deep anthropomorphism. iRobot has leveraged this for brand loyalty, but also faces the challenge that users blame the "lazy" Roomba for missed spots rather than understanding sensor limitations.',
      },
      {
        company: 'Google',
        product: 'Google Maps Voice Navigation',
        description: 'GPS voice navigation creates a perceived "copilot" agent. Users talk back to the voice, express frustration when rerouted ("she\'s taking me the wrong way"), and attribute navigational decisions to the voice personality rather than the routing algorithm.',
        effectiveness: 'effective',
        analysis: 'The persistent voice presence and directive language ("Turn left in 200 meters") creates a strong sense of an intentional guide. Google has used multiple voice options to let users choose their "navigator," reinforcing agent perception while the actual routing is purely algorithmic.',
      },
    ],

    abTests: [
      {
        title: 'Chatbot Introduction: Human-Like vs Transparent',
        hypothesis:
          'A transparent introduction about being an AI will reduce confusion without reducing engagement',
        controlVersion: {
          description:
            'Chatbot with human name "Maya," human avatar photo, and no disclosure of being automated',
          metrics: {
            conversionRate: '62%',
            taskCompletion: '71%',
            satisfactionScore: '3.2/5',
          },
        },
        treatmentVersion: {
          description:
            'Chatbot with bot name "Atlas," abstract avatar, clear disclosure "I\'m an AI assistant," and explanation of capabilities',
          metrics: {
            conversionRate: '58%',
            taskCompletion: '79%',
            satisfactionScore: '4.1/5',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While initial engagement was slightly lower (-4%), transparent AI disclosure led to significantly higher task completion (+11%) and satisfaction (+28%). Users set appropriate expectations and were less frustrated by limitations. Trust scores were 45% higher.',
          learnings: [
            'Transparency about AI nature reduces initial engagement slightly but dramatically improves outcomes',
            'Users who know they are talking to an AI ask more direct, efficient questions',
            'Deceptive human impersonation leads to higher abandonment when limitations appear',
            'Long-term retention was 34% higher with transparent AI framing',
          ],
        },
      },
      {
        title: 'Error Messages: Vague vs Mechanically Explanatory',
        hypothesis:
          'Explaining the mechanical cause of errors will reduce user frustration and retry rates',
        controlVersion: {
          description:
            'Generic error message: "Oops! Something went wrong. Please try again later."',
          metrics: {
            retryRate: '23%',
            supportTickets: '18 per 1000 errors',
            satisfactionScore: '2.1/5',
          },
        },
        treatmentVersion: {
          description:
            'Causal error message: "Your file couldn\'t upload because it exceeds the 25MB limit. Try compressing it or splitting it into smaller files."',
          metrics: {
            retryRate: '67%',
            supportTickets: '4 per 1000 errors',
            satisfactionScore: '3.8/5',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Mechanically explanatory errors nearly tripled retry rates and reduced support tickets by 78%. Users stopped attributing intent ("the system rejected my file") and instead understood the constraint. Satisfaction nearly doubled.',
          learnings: [
            'Vague errors trigger agent detection: users attribute refusal or incompetence to the system',
            'Mechanical explanations reframe failures as solvable constraints',
            'Actionable error messages dramatically reduce support burden',
            'Users prefer knowing "why" even if the reason is a limitation',
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
        name: 'Anthropomorphic Avatars',
        description:
          'Human-like faces, expressive characters, or avatars representing automated systems',
        howToSpot:
          'Look for human photos, cartoon faces, or expressive icons used for AI/bot features',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'First-Person AI Language',
        description:
          'Automated system messages using "I," "me," "my," or expressing emotions',
        howToSpot:
          'Check system messages for personal pronouns and emotional language like "I think," "I feel," "I noticed"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Typing/Thinking Indicators',
        description:
          'Animated indicators suggesting the system is "thinking" or "composing" a response',
        howToSpot:
          'Look for bouncing dots, typing animations, or "AI is thinking..." messages',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Personality-Driven Naming',
        description:
          'Automated features given human names or character identities',
        howToSpot:
          'Check if AI features have names like "Maya," "Atlas," "Sophie" rather than functional labels',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Proactive Behavior Cues',
        description:
          'System initiating contact or making suggestions unprompted, implying awareness',
        howToSpot:
          'Look for unprompted recommendations, alerts that suggest the system "noticed" something, or proactive suggestions',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Conversational Agent Pattern',
        description: 'Chat-style interface that frames the system as a conversational partner with personality',
        indicators: ['Chat bubble UI with named AI participant', 'Conversational tone in system messages', 'Typing indicators and response delays', 'Personality-consistent responses across sessions'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Smart Feature Attribution Pattern',
        description: 'Automated features described with intentional language, implying the system "decides" or "chooses"',
        indicators: ['"The AI thinks..."', '"We recommend..." from automated system', 'Personalized suggestions without explanation of mechanism', 'Autonomous actions described as decisions'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Error Blame Pattern',
        description: 'System errors or limitations that users interpret as intentional refusal or incompetence',
        indicators: ['Vague error messages without causal explanation', '"Something went wrong" without mechanical detail', 'Rate limits presented without context', 'Automated denials without policy attribution'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Emotional AI Pattern',
        description: 'Automated system expressing emotions, empathy, or social responses',
        indicators: ['Chatbot saying "I\'m sorry you\'re frustrated"', 'AI using emojis or emotional language', 'System "celebrating" user achievements', 'Automated empathy in support flows'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface give the automated system a name, face, or personality?',
      'Does the system use first-person language ("I," "me," "my")?',
      'Are there typing indicators or "thinking" animations for automated responses?',
      'Could users mistake the system for a human agent?',
      'Do error messages explain mechanical causes or leave room for intentional attribution?',
      'Is the system described as "understanding," "knowing," or "deciding"?',
      'Are AI capabilities honestly represented, or inflated through anthropomorphic language?',
      'Do proactive features explain their trigger ("because you...") or just appear as if the system "noticed"?',
      'Is it clear when users are interacting with automation vs humans?',
      'Could vulnerable users form unhealthy attachments to anthropomorphized features?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in agent detection (hyperactive agency detection).

Analyze the provided design for agent detection patterns. Identify:

1. **Anthropomorphic Cues**: Avatars, names, personalities, and human-like features on automated systems
2. **Language Framing**: First-person pronouns, emotional language, intentional verbs used by the system
3. **Behavioral Triggers**: Typing indicators, proactive suggestions, adaptive behaviors that imply awareness
4. **Error Attribution**: How failures are presented and whether users might attribute intent to errors
5. **Transparency Level**: How clearly the system discloses its automated nature

For each pattern found:
- Identify the specific anthropomorphic or agency cue
- Assess whether it sets appropriate or inflated expectations
- Determine if users could be misled about the system's nature
- Evaluate ethical implications, especially for vulnerable users
- Suggest improvements for honest, effective agent design

Consider:
- Could users mistake the system for a human?
- Are AI capabilities honestly represented?
- Do error messages prevent false intentional attribution?
- Is the personality engaging without being deceptive?
- Are there accessibility implications for agent perception?

Provide actionable recommendations for ethical, transparent agent design.`,

    outputSchema: {
      type: 'object',
      properties: {
        agencyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              anthropomorphicLevel: { type: 'string' },
              expectationAccuracy: { type: 'string' },
              transparencyLevel: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'anthropomorphicLevel',
              'transparencyLevel',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            anthropomorphismLevel: { type: 'number' },
            transparencyScore: { type: 'number' },
            expectationAlignment: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'anthropomorphismLevel',
            'transparencyScore',
            'expectationAlignment',
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
        'agencyPatterns',
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
        title: 'Define System Identity',
        description:
          'Decide how much personality and agency your automated system should project',
        example:
          'Choose between functional tool ("Search assistant") vs character agent ("Atlas, your AI guide") based on context',
        tips: [
          'Higher-stakes domains (medical, financial) benefit from lower anthropomorphism',
          'Engagement-focused products (shopping, entertainment) can use more personality',
          'Always keep the personality within the system\'s actual capabilities',
        ],
      },
      {
        step: 2,
        title: 'Design Transparency Signals',
        description:
          'Create clear, consistent cues that communicate the system\'s automated nature',
        example:
          'Use an "AI" badge, abstract avatar, and introductory message explaining capabilities',
        tips: [
          'Avoid human photos for AI-powered features',
          'Use badges like "AI-powered" or "Automated" consistently',
          'Introduce capabilities and limitations early in the interaction',
        ],
      },
      {
        step: 3,
        title: 'Calibrate Language',
        description:
          'Choose language that is engaging but accurately represents system capabilities',
        example:
          'Say "Based on your purchase history, you might like..." instead of "I think you\'d love..."',
        tips: [
          'First-person is acceptable if the system is clearly identified as AI',
          'Avoid emotional claims the system cannot back up ("I understand your frustration")',
          'Explain the mechanical basis for recommendations and suggestions',
        ],
      },
      {
        step: 4,
        title: 'Design Error States for Attribution',
        description:
          'Create error messages that explain mechanical causes to prevent blame attribution',
        example:
          'Instead of "I couldn\'t do that," say "This action requires admin permissions. Contact your admin to enable it."',
        tips: [
          'Always explain the cause, not just the symptom',
          'Distinguish between system limitations and user-fixable issues',
          'Never let policy decisions appear as AI choices',
        ],
      },
      {
        step: 5,
        title: 'Test Agent Perception',
        description:
          'Validate that users have accurate mental models of the system\'s nature and capabilities',
        example:
          'Ask users: "Who or what do you think you were just talking to?" and "What can it do?"',
        tips: [
          'Test with diverse user populations including less tech-savvy users',
          'Watch for signs of over-trust or emotional attachment',
          'Iterate on transparency signals until perception matches reality',
        ],
      },
    ],

    dos: [
      'Give AI features consistent, honest personality within their actual capabilities',
      'Use abstract or clearly non-human avatars for automated systems',
      'Explain the mechanical basis for AI recommendations and suggestions',
      'Design error messages that explain causes rather than implying system refusal',
      'Clearly label automated interactions as AI-powered',
      'Provide easy pathways from AI to human support',
      'Set expectations about capabilities and limitations during onboarding',
      'Use agent personality to make interactions more engaging and natural',
    ],

    donts: [
      'Don\'t use human photos or names to represent automated systems',
      'Don\'t claim the AI "understands," "feels," or "knows" the user',
      'Don\'t use anthropomorphic framing to deflect blame from company decisions',
      'Don\'t let vague error messages encourage intentional attribution',
      'Don\'t design chatbots that could be mistaken for human agents',
      'Don\'t encourage emotional dependency on AI personalities',
      'Don\'t use different personality levels in marketing vs product experience',
      'Don\'t anthropomorphize AI in contexts where over-trust could cause harm',
    ],

    bestPractices: [
      {
        title: 'Honest Agent Design',
        description:
          'Create AI personality that is engaging and consistent but clearly non-human',
        rationale:
          'Users engage more with personality, but trust is maintained only through honesty',
        example:
          'Give the assistant a name and tone, but use an abstract avatar and disclose AI nature upfront',
      },
      {
        title: 'Mechanical Attribution in Errors',
        description:
          'Always explain the technical or policy cause of failures and limitations',
        rationale:
          'Without explanation, users attribute intent: "the system is punishing me" or "it doesn\'t want to help"',
        example:
          '"Upload failed: file exceeds 25MB limit" instead of "Sorry, I can\'t accept that file"',
      },
      {
        title: 'Capability Calibration',
        description:
          'Proactively communicate what the system can and cannot do',
        rationale:
          'Users extrapolate from demonstrated abilities; uncalibrated expectations lead to frustration',
        example:
          'During onboarding: "I can help with X, Y, and Z. For anything else, I\'ll connect you with our team."',
      },
      {
        title: 'Graduated Anthropomorphism',
        description:
          'Match the level of personality to the stakes and context of the interaction',
        rationale:
          'High-stakes decisions need less anthropomorphism to encourage critical thinking',
        example:
          'Shopping assistant: friendly personality. Medical information: clinical, data-focused tone.',
      },
      {
        title: 'Human Handoff Transparency',
        description:
          'Make transitions between AI and human support clearly visible',
        rationale:
          'Users need to know when they switch from automated to human interaction and vice versa',
        example:
          '"I\'m connecting you with Maria from our support team. She\'ll take it from here."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Identify AI vs human agents semantically',
        implementation:
          'Use ARIA labels and roles to distinguish AI-generated content from human content. Screen readers should announce "AI assistant says" vs "Support agent says."',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - AI interactive elements must have clear roles',
        implementation:
          'AI chat inputs, suggestion buttons, and interactive elements must have clear accessible names indicating they interact with an automated system.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - AI avatars must have descriptive alt text',
        implementation:
          'Avatar images should have alt text like "AI assistant icon" not "Sarah from support." Typing indicators need accessible status announcements.',
      },
    ],

    ethics: [
      {
        concern: 'Human Impersonation',
        severity: 'critical',
        explanation:
          'Designing automated systems to pass as human agents deceives users and exploits agent detection',
        mitigation:
          'Always disclose automated nature. Use non-human avatars and clear AI labeling. Many jurisdictions now require bot disclosure by law.',
      },
      {
        concern: 'Emotional Exploitation',
        severity: 'high',
        explanation:
          'Users can form emotional bonds with anthropomorphized systems, especially vulnerable populations (elderly, children, lonely individuals)',
        mitigation:
          'Monitor for signs of dependency. Provide regular reminders of the system\'s nature. Include pathways to human connection and support.',
      },
      {
        concern: 'Blame Deflection',
        severity: 'high',
        explanation:
          'Using AI personality to absorb blame for company policy decisions removes accountability',
        mitigation:
          'Clearly attribute decisions to company policy. Never frame business rules as AI choices. Maintain transparent decision-making chains.',
      },
      {
        concern: 'Capability Inflation',
        severity: 'high',
        explanation:
          'Anthropomorphic language makes AI capabilities seem greater than they are, leading to over-trust',
        mitigation:
          'Use accurate capability descriptions. Avoid words like "understands," "thinks," or "knows." Show confidence levels and explain reasoning.',
      },
      {
        concern: 'Children and Vulnerable Users',
        severity: 'critical',
        explanation:
          'Children and cognitively impaired users may not distinguish between AI agents and real people',
        mitigation:
          'Use extra-clear disclosure for products accessible to children. Design age-appropriate transparency. Avoid encouraging parasocial relationships.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Exploring the Natural Foundations of Religion',
        author: 'Barrett, J. L.',
        year: 2000,
        description:
          'Introduces the Hyperactive Agency Detection Device (HADD) concept, explaining why humans over-detect intentional agents in their environment',
        type: 'foundational',
      },
      {
        title: 'Faces in the Clouds: A New Theory of Religion',
        author: 'Guthrie, S. E.',
        year: 1993,
        description:
          'Foundational work on anthropomorphism and why humans attribute human characteristics to non-human entities',
        type: 'foundational',
      },
      {
        title: 'The Media Equation: How People Treat Computers, Television, and New Media Like Real People and Places',
        author: 'Reeves, B., & Nass, C.',
        year: 1996,
        description:
          'Landmark research showing humans apply social rules and expectations to computers and digital media',
        type: 'foundational',
      },
      {
        title: 'On the Social Nature of Nonsocial Perception: The Influence of Agent Identification on Object Detection',
        author: 'New, J., Cosmides, L., & Tooby, J.',
        year: 2007,
        description:
          'Evolutionary psychology perspective on why humans are biased toward detecting agents over objects',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Faces in the Clouds: A New Theory of Religion',
        author: 'Guthrie, Stewart Elliott',
        year: 1993,
        isbn: '9780195098914',
        description:
          'The foundational text on why humans see agency everywhere, from weather to machines',
        type: 'foundational',
      },
      {
        title: 'The Media Equation',
        author: 'Reeves, Byron & Nass, Clifford',
        year: 1996,
        isbn: '9781575860534',
        description:
          'How people unconsciously treat computers as social actors, with extensive experimental evidence',
        type: 'foundational',
      },
      {
        title: 'Wired for Culture: Origins of the Human Social Mind',
        author: 'Pagel, Mark',
        year: 2012,
        isbn: '9780393344202',
        description:
          'Explores the evolutionary origins of social cognition including agency detection',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Anthropomorphism in AI Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/anthropomorphism/',
        description:
          'Practical guide to anthropomorphism in AI and chatbot design with UX recommendations',
        type: 'practical',
      },
      {
        title: 'The Do\'s and Don\'ts of Chatbot Personality Design',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/chatbot-personality',
        description:
          'Design guidelines for creating effective and ethical chatbot personalities',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We See Faces Everywhere',
        author: 'Vsauce',
        url: 'https://www.youtube.com/watch?v=sHCHEykUxP4',
        description:
          'Accessible explanation of pareidolia and hyperactive agency detection',
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
      'anthropomorphism', // Direct expression of agent detection in design
      'social-proof', // Perceived agents are more persuasive
      'trust-bias', // Agent perception affects trust formation
      'narrative-bias', // Agency detection feeds into story construction
    ],

    conflicts: [
      'automation-bias', // Over-trusting perceived agents can reinforce automation bias
      'information-bias', // Transparency about mechanics can reduce unhelpful agent perception
    ],

    confusedWith: [
      'anthropomorphism', // Related but distinct: anthropomorphism is the attribution, agent detection is the mechanism
      'pareidolia', // Seeing faces in objects is a specific visual manifestation
      'intentionality-bias', // Overlaps but focuses specifically on attributing intent to actions
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'anthropomorphism',
        'pareidolia',
        'intentionality-bias',
      ],
    },
  },
};
